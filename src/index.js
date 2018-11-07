//configure env variables
require('dotenv').config()

//import packages
import express from 'express';

//import route functions
import StripeRoute from './StripeRoute';

//setup app
const app = express();
const port = process.env.PORT || 5000;

//Connect functions to API routes
app.post("/api/login", StripeRoute);

//start app
app.listen(port, () => console.log(`Listening on port ${port}`));
