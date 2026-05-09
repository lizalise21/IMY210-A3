export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  pages: true,
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      strapiUrl: ''
    }
  }
})