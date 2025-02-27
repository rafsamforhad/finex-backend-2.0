const express = require("express")
const middlewares = require("./middlewares")
const router = require("./router")
const app = express()

app.use(middlewares)
app.use(router)

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

module.exports = app