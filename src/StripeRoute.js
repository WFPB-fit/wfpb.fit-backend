const stripe = require("stripe")(process.env.STRIPE_SERVER_SECRET_TEST);
const minDonationAmount = 0.5;

function isDonationInvalid(amount) {
  return isNaN(amount) || amount < minDonationAmount;
}

function StripeRoute(req, res) {
  // console.log(req.body);

  if (Object.keys(req.body).length === 0 && req.body.constructor === Object) {
    res.send("Request missing all parameters");
  } else {
    const parsedBody = JSON.parse(Object.keys(req.body)[0]);
    console.log(parsedBody);
    if (!parsedBody.chargeAmount || !parsedBody.stripeToken) {
      res.send("Request missing required parameter");
    } else if (isDonationInvalid(parsedBody.chargeAmount)) {
      res.send("Charge amount is invalid");
    } else {
      // const charge =
      stripe.charges
        .create({
          amount: parseFloat(parsedBody.chargeAmount),
          currency: "usd",
          description: "Donation to WFPB.fit SPC (not tax-deductible)",
          source: parsedBody.stripeToken
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
