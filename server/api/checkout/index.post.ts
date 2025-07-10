import Stripe from 'stripe'
import { defineEventHandler, readBody } from 'h3'
import { useRuntimeConfig } from '#imports' 

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const stripeSecretKey = config.stripeSecretKey

  if (!stripeSecretKey) {
    throw new Error('Missing Stripe Secret Key')
  }

  const stripe = new Stripe(stripeSecretKey, {
    apiVersion: '2025-06-30.basil',
  })

  const body = await readBody(event)

  try {
    const successUrl = body.successUrl || ''
    const customerEmail = body.email || ''
    const cancelUrl = body.cancelUrl || ''

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: 'jpy',
            product_data: {
              name: body.name,
            },
            unit_amount: body.amount,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: successUrl,
      cancel_url: cancelUrl,
    })

    return { url: session.url }
  } catch (err: any) {
    console.error('Stripe checkout session creation failed:', err)
    return { error: err.message }
  }
})