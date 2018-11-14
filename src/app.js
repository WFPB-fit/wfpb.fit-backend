//configure env variables
require("dotenv").config();

//import packages
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
const sls = require("serverless-http");

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
      // /^http:\/\/localhost.*/
      /^https:\/\/wfpb\.fit.*/
    ]
  })
);
app.options("*", cors()); // include before other routes

//Connect functions to API routes
app.post("/charge", StripeRoute);

//export app for local testing or lambda serverless running
//more info:
// https://dev.to/adnanrahic/how-to-deploy-a-nodejs-application-to-aws-lambda-using-serverless-2nc7
// https://github.com/serverless/serverless
module.exports = app;

module.exports.server = sls(app);
