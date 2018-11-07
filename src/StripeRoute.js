import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SERVER_SECRET);

isDonationInvalid = amount => {
  return isNaN(amount) || amount < minDonationAmount;
};

export default function StripeRoute(req, res) {
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
