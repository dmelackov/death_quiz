// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  primevue: {
    options: {
      unstyled: true
    }
  },
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/tailwindcss',
    '@vueuse/nuxt',
    '@primevue/nuxt-module',
    'pinia-plugin-persistedstate/nuxt'
  ],
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true }
})
