// plugins/vuetify.ts
import { createVuetify } from 'vuetify'
import { defineNuxtPlugin } from '#app'
import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';



export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    icons: {
      defaultSet: 'mdi',
    },
  })
  nuxtApp.vueApp.use(vuetify)
})