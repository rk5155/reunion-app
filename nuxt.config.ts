import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'firebase',
    compatibilityDate: '2025-06-11',
    firebase: {
      gen: 2
    }
  },
  css: [
    'vuetify/styles',
    '~/assets/styles/global.scss'
  ],
  build: {
    transpile: ['vuetify']
  },
  vite: {
    define: {
      'process.env.DEBUG': false
    },
    plugins: [vuetify()]
  },
  runtimeConfig: {
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY || '',
    FROM_EMAIL: process.env.FROM_EMAIL || '',
    stripeSecretKey: process.env.STRIPE_SECRET_KEY,
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID || '',
      stripePk: process.env.STRIPE_PUBLISHABLE_KEY || '',
    },
  },
  modules: ['@pinia/nuxt'],
})