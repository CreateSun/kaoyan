
export default {
  /*
  ** Nuxt rendering mode
  ** See https://nuxtjs.org/api/configuration-mode
  */
  mode: 'universal',
  /*
  ** Nuxt target
  ** See https://nuxtjs.org/api/configuration-target
  */
  target: 'server',
  /*
  ** Headers of the page
  ** See https://nuxtjs.org/api/configuration-head
  */
  head: {
    title: "考研密码" || process.env.npm_package_name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS CSS按需加载,按名字引入对应的style库即可
  */
  css: [
    '~assets/css/main.css',
    'ant-design-vue/lib/button/style/css',
    'ant-design-vue/lib/message/style/css',
    'ant-design-vue/lib/notification/style/css',
    'ant-design-vue/lib/icon/style/css',
    'ant-design-vue/lib/grid/style/css',
    'ant-design-vue/lib/collapse/style/css',
    'ant-design-vue/lib/switch/style/css',
    'ant-design-vue/lib/card/style/css',
    'ant-design-vue/lib/calendar/style/css',
    'ant-design-vue/lib/timeline/style/css',
    'ant-design-vue/lib/tag/style/css',
    'ant-design-vue/lib/badge/style/css',
    'ant-design-vue/lib/back-top/style/css',
    'ant-design-vue/lib/modal/style/css',
  ],
  /*
  ** Plugins to load before mounting the App
  ** https://nuxtjs.org/guide/plugins
  */
  plugins: [
    '@/plugins/antd-ui',
  ],
  /*
  ** Auto import components
  ** See https://nuxtjs.org/api/configuration-components
  */
  components: true,
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  /*
  ** Build configuration
  ** See https://nuxtjs.org/api/configuration-build/
  */
  build: {
  },
  server: {
    port: 8000,
    host: '0.0.0.0'
  }
}
