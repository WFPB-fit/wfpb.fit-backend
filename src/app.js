//configure env variables
require('dotenv').config()

//import packages
var express = require('express')

//import route functions
const StripeRoute = require('./StripeRoute');

//setup app
const app = express();
const port = process.env.PORT || 5000;

//setup database connection
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

//Connect functions to API routes
app.post("/charge", StripeRoute);

//export app for local testing or lambda serverless running
//more info: 
// https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35
// https://claudiajs.com/tutorials/installing.html
// https://console.aws.amazon.com/iam/home?#security_credential
module.exports = app;
