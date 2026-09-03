// Use the configured database in production and the local database by default.

module.exports = {
  db: process.env.DB || 'mongodb://localhost/mern-crud',
  react_app_url: "http://localhost:4200"
};
