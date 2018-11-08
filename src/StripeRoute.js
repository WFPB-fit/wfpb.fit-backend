const stripe = require('stripe')(process.env.STRIPE_SERVER_SECRET_TEST);

function isDonationInvalid(amount) {
  return isNaN(amount) || amount < minDonationAmount;
};

function StripeRoute(req, res) {
  const validationFailed = isDonationInvalid(req.body.chargeAmount);

  if (!validationFailed) {
    const charge = stripe.charges.create({
      amount: parseFloat(req.body.chargeAmount),
      currency: "usd",
      description: "Donation to WFPB.fit SPC (not tax-deductible)",
      source: req.body.stripeToken
    });
  }

  res.send(validationFailed);
}

module.exports = StripeRoute;