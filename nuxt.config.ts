// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  plugins: [{ src: '~/plugins/bootstrap.ts', mode: 'client' }],

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

  app: {
    head: {
      meta: [{ name: 'robots', content: 'noindex,nofollow,noarchive' }],
    },
  },
})
