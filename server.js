
const express = require('express');
const server = express();
const configureMiddleware = require('./config/middleware.js');
const actionsDB = require("./routers/actions");
const projectsDB = require("./routers/projects")

configureMiddleware(server);

server.get('/', (req, res) => {
    res.send(`<h2>Up and running!</h2>`)
  });  

server.use("/api/actions", actionsDB);
server.use("/api/projects", projectsDB);



module.exports = server;
