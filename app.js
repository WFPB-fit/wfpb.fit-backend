//import packages
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");

//import route functions
const StripeRoute = require("./src/StripeRoute");

//setup app
const app = express();

//setup bodyparser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(
  cors(
  //   {
  //   origin: [
  //     // /^http:\/\/localhost.*/
  //     /^https:\/\/wfpb\.fit.*/
  //   ]
  // }
  )
);
app.options("*", cors()); // include before other routes

//Connect functions to API routes
app.post("/charge", StripeRoute);

//export app for local testing or lambda serverless running
//more info:
// https://dev.to/adnanrahic/how-to-deploy-a-nodejs-application-to-aws-lambda-using-serverless-2nc7
// https://github.com/serverless/serverless

// - https://aws.amazon.com/blogs/compute/going-serverless-migrating-an-express-application-to-amazon-api-gateway-and-aws-lambda/
module.exports = app;