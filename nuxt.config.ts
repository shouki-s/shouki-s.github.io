// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: ['nuxt-gtag', '@vueuse/nuxt'],

  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // Bootstrap 5.3 still uses @import; silence deprecation noise from node_modules
          quietDeps: true,
        },
      },
    },
  },

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
      htmlAttrs: { lang: 'ja' },
      title: '坂本鐘期 Portfolio',
      meta: [
        { charset: 'utf-8' },
        { name: 'robots', content: 'noindex,nofollow,noarchive' },
        { name: 'description', content: '坂本 鐘期のポートフォリオ' },
      ],
      link: [{ rel: 'icon', type: 'image/png', href: '/favicon.png' }],
    },
  },
})
