# MERN CRUD

A simple records system using MongoDB, Express.js, React.js, and Node.js with real-time Create, Read, Update, and Delete operations using Socket.io. REST API was implemented on the back-end. Semantic UI React was used for the UI.

![Node Version](https://img.shields.io/badge/node-v6.11.0-yellowgreen.svg)
![NPM Version](https://img.shields.io/badge/npm-v3.10.10-blue.svg)
![MongoDB Version](https://img.shields.io/badge/mongodb-v3.4.2-blue.svg)
![Mongoose Version](https://img.shields.io/badge/mongoose-v4.10.8-blue.svg)
![Language: American English](https://img.shields.io/badge/language-american%20english-red.svg)


Demo: [https://mern-crud.herokuapp.com/](https://mern-crud.herokuapp.com/)

![MERN CRUD Screenshot](screenshot.png)

## Instructions

Fork, then download or clone the repo.
```bash
git clone https://github.com/<your-user-name>/mern-crud.git
```


*Make sure MongoDB service is running.*

The *config* folder contains a file named *db.js*. Before running locally, change the value of db as seen in the code below.
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

For the **back-end**, install the dependencies once via the terminal.
```bash
npm install
```

Run the *main server*. It listens on port 3000.
```bash
CORS=1 node server
```
View it on the browser.

<br>

If you want to configure the **front-end**, go to *react-src* folder via the terminal.

```bash
cd react-src
```

Install the dependencies required by React once.
```bash
npm install
```

Run the *development server* for React. It listens on port 4200.
```bash
REACT_APP_API_URL=http://localhost:3000 npm start
```

To make a production build, simply run on *react-src* folder via the terminal.
```bash
npm run build
```

It re-creates a folder named *public* on the root directory. This is where the production-ready front-end of the web application resides.

## Docker
```bash
docker-compose up
```
<br>

## Contributing
* [CONTRIBUTING](CONTRIBUTING.md)

## To Do

- [x] Create
- [x] Read
- [x] Update
- [x] Delete
- [x] Real-time broadcast using Socket.io
- [x] Deploy in Heroku
- [x] Front-end validation (HTML)

## License
* [MIT](LICENSE)
