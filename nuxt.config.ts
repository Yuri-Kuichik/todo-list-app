// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  srcDir: 'src/',
  // theme: {
  //   dark: true,
  //   colors: {
  //     primary: '#ff0000'
  //   }
  // },

  app: {
    head: {
      title: 'Todo list',
      htmlAttrs: {
        lang: 'en',
      },
      meta: [
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1, user-scalable=no',
        }
      ]
    },
  },

  css: [
    '~/assets/css/variables.scss',
    '~/assets/css/global.scss',
  ],

  modules: [
    '@pinia/nuxt', 
    '@element-plus/nuxt', 
    '@nuxt/image', 
    [
      '@nuxtjs/google-fonts', 
      {
        families: {
          Inter: '200..700',
        },
        display: 'swap',
        preload: true,
        download: true,
      }
    ], 
    'nuxt-vuefire', 
    '@nuxtjs/google-fonts',
  ],
  
  vuefire: {
    config: {
      apiKey: "AIzaSyCaTLWABm9c_hfJE8khv9cCHdK8Y_K9kK8",
      authDomain: "list-todo-b4c71.firebaseapp.com",
      projectId: "list-todo-b4c71",
      storageBucket: "list-todo-b4c71.appspot.com",
      messagingSenderId: "301560874592",
      appId: "1:301560874592:web:0bc611022953a1d31fe505"
    },
  },
})