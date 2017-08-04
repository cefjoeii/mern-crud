# MERN CRUD

A simple records system using MongoDB, Express.js, React.js, and Node.js with real-time Create, Read, Update, and Delete operations using Socket.io. REST API was implemented on the back-end. Semantic UI React was used for the UI.

![Node Version](https://img.shields.io/badge/node-v6.11.0-yellowgreen.svg)
![NPM Version](https://img.shields.io/badge/npm-v3.10.10-blue.svg)
![Language: American English](https://img.shields.io/badge/language-american%20english-red.svg)


Demo: [https://mern-crud.herokuapp.com/](https://mern-crud.herokuapp.com/)

![MERN CRUD Screenshot](screenshot.png)

## Instructions

Download or clone.
```
git clone https://github.com/cefjoeii/mern-crud.git
```


*Make sure MongoDB service is running.*

The *config* folder contains a file named *db.js*. Before running locally, change the value of db as seen in the code below.
```js
module.exports = {
  db: 'mongodb://localhost/mern-crud'
};
```

For the **back-end**, install the dependencies once via the terminal.
```
npm install
```

Run the *main server*. It listens on port 3000.
```
node server
```
View it on the browser.

<br>

If you want to configure the **front-end**, go to *react-src* folder via the terminal.

```
cd react-src
```

Install the dependencies required by React once.
```
npm install
```

Run the *development server* for React. It listens on port 4200.
```
npm start
```
Since it's running on a different port, we need to enable CORS. Locate the file called *server.js* on the root directory. Find and uncomment this line of code. Remember to comment it back out when deploying.
```js
// app.use(cors());
```

To make a production build, simply run on *react-src* folder via the terminal.
```
npm run build
```

It re-creates a folder named *public* on the root directory. This is where the production-ready front-end of the web application resides.

<br>

## To Do

- [x] Create
- [x] Read
- [x] Update
- [x] Delete
- [x] Real-time broadcast using Socket.io
- [x] Deploy in Heroku
- [x] Front-end validation (HTML)

## Future Plans

* Search
* Front-end validation (JS); Pure back-end validation is expensive
* Routing / redirecting / whatever
* Learn Redux
* Learn creating tests

## License
* [MIT](LICENSE)
