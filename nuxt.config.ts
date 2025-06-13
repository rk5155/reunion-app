import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'firebase',
    compatibilityDate: '2025-06-11'
  },
  css: ['vuetify/styles'],
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
    public: {
      firebaseApiKey: process.env.NUXT_FIREBASE_API_KEY || '',
      firebaseAuthDomain: process.env.NUXT_FIREBASE_AUTH_DOMAIN || '',
      firebaseProjectId: process.env.NUXT_FIREBASE_PROJECT_ID || '',
      firebaseStorageBucket: process.env.NUXT_FIREBASE_STORAGE_BUCKET || '',
      firebaseMessagingSenderId: process.env.NUXT_FIREBASE_MESSAGING_SENDER_ID || '',
      firebaseAppId: process.env.NUXT_FIREBASE_APP_ID || '',
      firebaseMeasurementId: process.env.NUXT_FIREBASE_MEASUREMENT_ID || '',
    },
  },
  modules: ['@pinia/nuxt'],
})