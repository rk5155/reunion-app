import Stripe from 'stripe'
import { defineEventHandler } from 'h3'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2024-04-10',
})

export default defineEventHandler(async () => {
  try {
    const products = await stripe.products.list({
      expand: ['data.default_price'],
    })
    return products.data
  } catch (err: any) {
    return { error: err.message }
  }
})