let stripeKey = 'sk_test_tGx1hKqVLh3o3kInOAAk5VLs'; //test key
if (process.env.NODE_ENV == "production") {
  stripeKey = process.env.STRIP_SERVER_KEY;
}
const stripe = require("stripe")(stripeKey);

const minDonationAmount = 0.5;

function isDonationInvalid(amount) {
  return isNaN(amount) || amount < minDonationAmount;
}

function StripeRoute(req, res) {
  console.log(req.body);

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.send("Request missing all parameters");
  } else {
    if (!req.body.chargeAmount || !req.body.stripeToken) {
      res.send("Request missing required parameter");
    } else if (isDonationInvalid(req.body.chargeAmount)) {
      res.send("Charge amount is invalid");
    } else {
      // const charge =
      stripe.charges
        .create({
          amount: parseFloat(req.body.chargeAmount),
          currency: "usd",
          description: "Donation to WFPB.fit SPC (not tax-deductible)",
          source: req.body.stripeToken
        })
        .then(stripeResponse => {
          res.send("Payment processed. Thank you for your donation!");
        })
        .catch(err => {
          console.log(err);
          res.send("Stripe could not process payment");
        });
    }
  }
}

module.exports = StripeRoute;
