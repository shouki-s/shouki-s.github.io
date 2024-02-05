// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  css: [
    'assets/stylesheets/bootstrap.scss',
    'animate.css',
    'assets/stylesheets/shouki-s.scss',
  ],

  runtimeConfig: {
    public: {
      contentfulSpaceId: '',
      contentfulEnvironment: '',
      contentfulApikey: '',
    },
  },
})
