import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price: body.productId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${body.origin}/success`,
      cancel_url: `${body.origin}/cancel`,
    })

    return { url: session.url }
  } catch (err: any) {
    return { error: err.message }
  }
})