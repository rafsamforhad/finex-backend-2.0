const morgan = require("morgan")
const express = require("express")
const cors = require("cors")

const middlewares = [morgan("dev"),express.json(),express.urlencoded({extended:true}),cors()]


module.exports = middlewares