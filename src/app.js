//configure env variables
require("dotenv").config();

//import packages
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//import route functions
const StripeRoute = require("./StripeRoute");

//setup app
const app = express();
const port = process.env.PORT || 5000;

//setup bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors({
    origin: [
      /^http:\/\/localhost.*/
      // /^https:\/\/wfpb/.fit.*/
    ]
  })
);
app.options("*", cors()); // include before other routes

//Connect functions to API routes
app.post("/charge", StripeRoute);

//export app for local testing or lambda serverless running
//more info:
// https://medium.freecodecamp.org/express-js-and-aws-lambda-a-serverless-love-story-7c77ba0eaa35
// https://claudiajs.com/tutorials/installing.html
// https://console.aws.amazon.com/iam/home?#security_credential
module.exports = app;
