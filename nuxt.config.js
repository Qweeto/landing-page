const pkg = require('./package')
const ampify = require('./plugins/ampify')

module.exports = {
  mode: 'universal',

  /*
   ** Headers of the page
   */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { hid: 'description', name: 'description', content: pkg.description },
      { name: 'title', content: 'goto Interactive Software' },
      { name: 'abstract', content: 'Edge future software' },
      {
        name: 'keywords',
        lang: 'en',
        content: 'gotois, goto Interactive, play, games, application'
      },
      {
        name: 'keywords',
        lang: 'ru',
        content: 'gotois, goto Interactive, приложения'
      },
      { name: 'generator', content: 'gotois' },
      {
        name: 'viewport',
        content:
          'initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, height=device-height, width=device-width, shrink-to-fit=no'
      },
      // FullScreen
      { name: 'full-screen', content: 'yes' },
      { name: 'x5-fullscreen', content: 'true' },
      { name: '360-fullscreen', content: 'true' },
      { name: 'apple-touch-fullscreen', content: 'yes' },
      // Translate
      { name: 'google', value: 'notranslate' },
      { name: 'google', content: 'notranslate' },
      { name: 'distribution', content: 'web' },
      { name: 'audience', content: 'all' },
      { name: 'expires', content: '0' },
      { name: 'revisit-after', content: '1 days' },
      { name: 'robots', content: 'index, follow' },
      { name: 'rating', content: 'general' },
      { name: 'author', content: 'goto Interactive Software' },
      { name: 'author-corporate', content: 'support@gotointeractive.com' },
      { name: 'designer', content: 'Denis Baskovsky' },
      { name: 'publisher', content: 'Denis Baskovsky' },
      { name: 'web_author', content: 'Denis Baskovsky' },
      {
        name: 'no-email-collection',
        content: 'http://www.unspam.com/noemailcollection/'
      },
      { name: 'copyright', content: 'goto Interactive Software' },
      { name: 'HandheldFriendly', content: 'true' },
      { name: 'MobileOptimized', content: '320' },
      { name: 'application-name', content: 'gotois' },
      { name: 'msapplication-tooltip', content: 'Channel 9 Podcasts' },
      { name: 'msapplication-starturl', content: './' },
      {
        name: 'msapplication-task',
        content: 'name=TASKNAME;action-uri=ONCLICK;icon-uri=ICON'
      },
      { name: 'date-creation-yyyymmdd', content: '2016-06-23' },
      { 'http-equiv': 'pragma', content: 'no-cache' },
      { 'http-equiv': 'cleartype', content: 'on' },
      { 'http-equiv': 'Cache-Control', content: 'no-cache' },
      { 'http-equiv': 'imagetoolbar', content: 'no' },
      {
        'http-equiv': 'X-UA-Compatible',
        content: 'IE=edge'
      },
      { 'http-equiv': 'content-type', content: 'text/html' },
      { 'http-equiv': 'Content-Style-Type', content: 'text/css' },
      { 'http-equiv': 'Content-Script-Type', content: 'text/javascript' },
      { name: 'msthemecompatible', content: 'no' },
      { name: 'format-detection', content: 'address=no;telephone=yes' },
      { name: 'googlebot', content: 'noarchive, noimageindex' },
      { name: 'slurp', content: 'index, follow' },
      { name: 'msnbot', content: 'index, follow' },
      { name: 'teoma', content: 'index, follow' },
      // Twitter
      { name: 'twitter:card', content: 'summary' },
      { name: 'twitter:site', content: '@tewstindie' },
      { name: 'twitter:creator', content: '@tewstindie' },
      { name: 'twitter:title', content: 'goto Interactive Software' },
      { name: 'twitter:description', content: 'Play Anywhere' },
      {
        name: 'twitter:image',
        content: 'images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      // Open Graph
      { property: 'og:title', content: 'goto Interactive' },
      { property: 'og:site_name', content: 'gotois' },
      { property: 'og:type', content: 'website' },
      { property: 'og:description', content: 'Play Anywhere' },
      { property: 'og:url', content: 'https://gotointeractive.com' },
      {
        property: 'og:image',
        content:
          'https://gotointeractive.com/images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      {
        property: 'og:image:secure_url',
        content:
          'https://gotointeractive.com/images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      { property: 'og:locale:locale', content: 'en_US' },
      { name: 'Resource-type', content: 'Document' },
      { name: 'mobile-web-app-capable', content: 'yes' },
      { name: 'hostname', content: 'gotointeractive.com' },
      { name: 'referrer', content: 'origin-when-crossorigin' },
      // Tile icon for Windows 8 (144x144 + tile color)
      {
        name: 'msapplication-TileImage',
        content: 'images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      { name: 'msapplication-TileColor', content: '#16161d' },
      { name: 'msapplication-tap-highlight', content: 'no' },
      // Fallback for Safari on iOS
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      {
        name: 'apple-mobile-web-app-status-bar-style',
        content: 'black-translucent'
      },
      { name: 'apple-mobile-web-app-title', content: 'gotois' },
      // Fallback color the status bar on mobile devices
      { name: 'theme-color', content: '#16161d' }
    ],
    link: [
      { rel: 'canonical', href: '/' },
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // Web Application Manifest
      { rel: 'manifest', href: 'manifest.json' },
      // Fallback application metadata for legacy browsers
      { rel: 'image_src', href: 'images/touch/chrome-touch-icon-192x192.png' },
      {
        rel: 'shortcut icon',
        href: 'images/touch/chrome-touch-icon-192x192.png'
      },
      {
        rel: 'icon',
        sizes: '192x192',
        type: 'image/png',
        href: 'images/touch/chrome-touch-icon-192x192.png'
      },
      {
        rel: 'fluid-icon',
        href:
          'https://gotointeractive.com/images/touch/chrome-touch-icon-192x192.png',
        title: 'gotois'
      },
      {
        rel: 'image_src',
        href:
          'https://gotointeractive.com/images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      {
        rel: 'search',
        type: 'application/opensearchdescription+xml',
        title: 'gotois',
        href: './opensearch.xml'
      },
      //todo??
      { rel: 'amphtml', href: 'https://gotointeractive.com/amp.html' },
      {
        rel: 'publisher',
        href: 'https://plus.google.com/115508272748009352854'
      },
      // Faster
      { rel: 'dns-prefetch', href: '//fonts.googleapis.com' },
      { rel: 'dns-prefetch', href: '//www.google-analytics.com' },
      { rel: 'preconnect', href: '//www.youtube.com' },
      { rel: 'preconnect', href: '//img.youtube.com' },
      {
        rel: 'preconnect',
        href: 'https://fonts.gstatic.com/',
        crossorigin: 'crossorigin'
      },
      // Homescreen icons. TODO: add 72x72, 96x96
      { rel: 'apple-touch-icon', href: 'images/touch/apple-touch-icon.png' },
      {
        rel: 'apple-touch-icon',
        sizes: '72x72',
        href: 'images/touch/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '96x96',
        href: 'images/touch/apple-touch-icon.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '144x144',
        href: 'images/touch/ms-touch-icon-144x144-precomposed.png'
      },
      {
        rel: 'apple-touch-icon',
        sizes: '192x192',
        href: 'images/touch/chrome-touch-icon-192x192.png'
      }
    ]
  },

  /*
   ** Customize the progress-bar color
   */
  loading: false, // Disable loading bar since AMP will not generate a dynamic page

  /*
   ** Disable resourceHints since we don't load any scripts for AMP
   */
  render: {
    resourceHints: false
  },

  /*
   ** Global CSS
   */
  css: [],

  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],

  /*
   ** Nuxt.js modules
   */
  modules: ['@nuxtjs/axios'],
  /*
   ** Axios module configuration
   */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  hooks: {
    // This hook is called before generatic static html files for SPA mode
    'generate:page': page => {
      // page.html = ampify(page.html) // todo: uncomment this for amp
    },
    // This hook is called before rendering the html to the browser
    'render:route': (url, page) => {
      // page.html = ampify(page.html) // todo: uncomment this for amp
    }
  },

  /*
   ** Build configuration
   */
  build: {
    vendor: ['axios'],
    /*
     ** You can extend webpack config here
     */
    extend(config, ctx) {
      // Run ESLint on save
      if (ctx.isDev && ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
