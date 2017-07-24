# MERN CRUD

A simple records system using MongoDB, Express.js, React.js, and Node.js with real-time Create, Read, Update, and Delete operations using Socket.io. REST API was implemented on the back-end. Semantic UI React was used for the UI.

*Make sure MongoDB service is running.*

<br>

For the **back-end**, install the dependencies once.
```
npm install
```
Run the *main server*. It listens on port 3000.
```
node server
``` 

<br>

For the **front-end**, go to *react-src* folder via the terminal.

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

To make a production build, simply run on *react-src* folder.
```
npm run build
```

It creates a folder named *public* on the root directory. This is where the production-ready front-end of the web application resides. It can now be directly viewed through the *main server* without running the React development server.

## To Do

- [x] Create
- [x] Read
- [x] Update
- [x] Delete
- [x] Real-time broadcast using Socket.io

## Future Plans

* Search
* Front-end validation; Pure back-end validation is expensive
* Routing / redirecting / whatever
* Learn Redux
* Learn creating tests

## License
* [MIT](LICENSE)
