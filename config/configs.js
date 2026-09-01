// Set the connection string based from the config vars of the production server
// To run locally use 'mongodb://localhost/mern-crud' instead of process.env.DB

module.exports = {
  // Use environment variable DB when provided, otherwise default to local MongoDB.
  // Local default uses loopback IP to avoid potential DNS resolution issues.
  db: process.env.DB || "mongodb://127.0.0.1:27017/mern-crud",
  react_app_url: "http://localhost:4200"
};
