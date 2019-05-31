const express = require('express');
const logger = (req, res, next) => {
    console.log(`A ${req.method} request to '${req.url}' `);
    next();
}

module.exports = function(server) {
    server.use(express.json(), logger());
}