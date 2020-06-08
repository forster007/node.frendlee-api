import stripe from 'stripe';

stripe('sk_test_7PfaWB0jUhqz2FbM5HyNizhF00UK36N7ps');

class PeriodController {
  async store(req, res) {
    const tok = await stripe.tokens.retrieve(req.body.token);

    const paymentIntentsCreate = await stripe.paymentIntents.create({
      amount: 100,
      currency: 'usd',
      payment_method_types: ['card'],
    });

    const paymentMethodsCreate = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: tok.id,
      },
    });

    const paymentIntentsConfirm = await stripe.paymentIntents.confirm(paymentIntentsCreate.id, {
      payment_method: paymentMethodsCreate.id,
    });

    console.log(tok);
    console.log(paymentMethodsCreate);
    console.log(paymentIntentsConfirm);

    // stripe.paymentIntents.confirm(paymentIntent.id, {}, (err, pay) => {
    //   console.log('A: ', err);
    //   console.log('B: ', pay);
    // });

    return res.json({ data: true });
  }
}

export default new PeriodController();
