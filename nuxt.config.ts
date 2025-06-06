import vuetify from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  ssr: true,
  nitro: {
    preset: 'firebase'
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
  }
})