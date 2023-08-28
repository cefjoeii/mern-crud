# MERN CRUD

A simple records system using MongoDB, Express.js, React.js, and Node.js with real-time Create, Read, Update, and Delete operations using Socket.io.

REST API was implemented on the back-end. Semantic UI React was used for the UI in the front-end.

![Node Version](https://img.shields.io/badge/node-v20+-green.svg)
![NPM Version](https://img.shields.io/badge/npm-v9+-blue.svg)
![MongoDB Version](https://img.shields.io/badge/mongodb-v7+-yellowgreen.svg)
![Mongoose Version](https://img.shields.io/badge/mongoose-v7+-red.svg)

Demo: [https://mern-crud-mpfr.onrender.com](https://mern-crud-mpfr.onrender.com)

![MERN CRUD Screenshot](screenshot.png)

## Support
[![Follow on GitHub](https://img.shields.io/github/followers/cefjoeii.svg?style=social&label=Follow)](https://github.com/cefjoeii)
[![GitHub Stars](https://img.shields.io/github/stars/cefjoeii/mern-crud.svg?style=social&label=Star)](https://github.com/cefjoeii/mern-crud)
[![GitHub Forks](https://img.shields.io/github/forks/cefjoeii/mern-crud.svg?style=social&label=Fork)](https://github.com/cefjoeii/mern-crud/fork)
[![GitHub Watchers](https://img.shields.io/github/watchers/cefjoeii/mern-crud.svg?style=social&label=Watch)](https://github.com/cefjoeii/mern-crud)

## Instructions

Fork, then download or clone the repo.
```bash
git clone https://github.com/<your-user-name>/mern-crud.git
```

The *config* folder contains a file named *db.js*. Before running locally, change the value of `db` as seen in the code below. *Make sure MongoDB service is running.*
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

## Back-end
Install the dependencies via the terminal.
```bash
npm install
```

Run the *main server*.
```bash
CORS=1 node server
```
View [http://localhost:3000](http://localhost:3000) on the browser.

## Front-end
If you want to modify the front-end, go to *react-src* folder via the terminal.

```bash
cd react-src
```

Install the dependencies required by React.
```bash
npm install
```

Run the *development server* for React.
```bash
REACT_APP_API_URL=http://localhost:3000 npm start
```

View [http://localhost:4200](http://localhost:4200) on the browser.

To make a production build, simply run on *react-src* folder via the terminal.
```bash
npm run build
```

It re-creates a folder named *public* on the root directory. This is where the production-ready front-end of the web application resides.

## Docker
```bash
docker-compose up
```

## Contribute
Feel free to help out as I may have other work/life commitments. See [CONTRIBUTING.md](CONTRIBUTING.md).

## To Do

- [x] Create
- [x] Read
- [x] Update
- [x] Delete
- [x] Real-time broadcast using Socket.io
- [x] Deploy in Heroku
- [x] Front-end validation (HTML)

## License
**MERN CRUD** is available under the **MIT** license. See the [LICENSE](LICENSE) file for more info.