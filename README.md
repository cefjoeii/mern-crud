# MERN CRUD Starter Kit

A Create, Read, Update, and Delete starter kit using MongoDB, Express.js, React.js, and Node.js. REST API was implemented on the back-end. Semantic UI React was used for the UI.

Make sure MongoDB service is running.

<br>

For the **back-end**, install the dependencies once.
```
npm install
```
Run the *main server*. It will listen on port 3000.
```
node server
``` 

<br>

For the **front-end**, go to *react-src* folder via the terminal.

```
cd react-src
```

Install the node packages required by React once.
```
npm install
```

Run the *development server* for React. It will listen on port 4200.
```
npm start
```

To make a production build, simply run on *react-src* folder.
```
npm run build
```

It will create a folder named *public* on the root directory. This is where the production-ready front-end of the web application will reside. It can now be directly viewed through the *main server* without running the React development server.

## To Do

- [x] Create
- [x] Read
- [x] Update
- [x] Delete

## Future Plans

* Search
* Front-end validation; Pure back-end validation is expensive
* Real-time broadcast using socket.io
* Routing / redirecting / whatever
