import Stripe from "stripe";
const stripe = Stripe(process.env.STRIPE_SERVER_SECRET);

export default function StripeRoute(req, res) {
//   req.body.token;
//   req.body.amt;

  const charge = stripe.charges.create({
    amount: parseFloat(req.body.charge),
    currency: "usd",
    description: "Donation to WFPB.fit SPC (not tax-deductible)",
    source: req.body.token
  });
}
