const express = require('express');
// Load environment variables from .env into process.env when present (CI and local dev)
try { require('dotenv').config(); } catch (e) { /* dotenv not installed */ }
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const socket = require('socket.io');

const config = require('./config/configs');

// Use Node's default promise instead of Mongoose's promise library
mongoose.Promise = global.Promise;

// Connect to the database
mongoose.connect(config.db, { maxPoolSize: 10 });

let db = mongoose.connection;

// Instantiate express (routes and middlewares will be registered when DB is ready)
const app = express();

// Don't enable trust proxy unless explicitly configured.
if (process.env.TRUST_PROXY === 'true') {
  app.enable('trust proxy');
} else {
  app.disable('trust proxy');
}

// Common middleware
app.use(express.static('public'));
app.use(bodyParser.json());
if (process.env.CORS) {
  app.use(cors());
}

// Error handler
app.use((err, req, res, next) => {
  if (res.headersSent) return next(err);
  res.status(400).json({ err: err });
});

// Function to register routes after DB is connected
function registerRoutes() {
  // Initialize routes middleware
  app.use('/api/users', require('./routes/users'));
}

// Start server after DB connection is established
const port = process.env.PORT || 3000;
let serverStarted = false;

function startServer() {
  if (serverStarted) return;
  serverStarted = true;

  registerRoutes();

  const server = app.listen(port, () => {
    console.log(`Listening on port ${port}`);
  });

  const io = socket(server,{
    cors:{
      origin: config.react_app_url,
    }
  });

  let online = 0;
  io.on('connection', (s) => {
    online++;
    console.log(`Socket ${s.id} connected.`);
    io.emit('visitor enters', online);

    s.on('add', data => s.broadcast.emit('add', data));
    s.on('update', data => s.broadcast.emit('update', data));
    s.on('delete', data => s.broadcast.emit('delete', data));

    s.on('disconnect', () => {
      online--;
      console.log(`Socket ${s.id} disconnected.`);
      io.emit('visitor exits', online);
    });
  });
}

// DB event handlers
let dbOpened = false;
db.on('open', () => {
  dbOpened = true;
  console.log('Connected to the database.');
  try { startServer(); } catch (e) { console.error('Error starting server after DB open', e); }
});

db.on('error', (err) => {
  console.log(`Database error: ${err}`);
});

// Fallback: if DB doesn't open within a configurable timeout in CI, start server anyway
const DB_WAIT_OVERRIDE = process.env.DB_WAIT_OVERRIDE || 'false';
if (DB_WAIT_OVERRIDE === 'true') {
  const WAIT_MS = parseInt(process.env.DB_WAIT_MS || '15000', 10);
  setTimeout(() => {
    if (!dbOpened) {
      console.warn(`DB did not open within ${WAIT_MS}ms, starting server anyway due to DB_WAIT_OVERRIDE`);
      startServer();
    }
  }, WAIT_MS);
}
