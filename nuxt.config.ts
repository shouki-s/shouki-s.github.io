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
      title: '坂本鐘期 Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'noindex,nofollow,noarchive' },
        { name: 'description', content: '坂本 鐘期のポートフォリオ' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
})
