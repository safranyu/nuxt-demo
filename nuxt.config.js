const pkg = require('./package')

module.exports = {
  mode: 'universal',

  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },
      // { name="viewport", content="width=device-width, initial-scale=1, maximum-scale=1, minimum-scale=1, user-scalable=no"}
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      { src: '/flexible/js/index.js', type: 'text/javascript', charset: 'utf-8' }
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },

  /*
  ** Global CSS
  */
  css: [
    'element-ui/lib/theme-chalk/index.css',
    '~/assets/css/main.css',
    '~/assets/css/index.scss',
    {
      src: '@/assets/fonts/iconfont.css',
      ssr: false
    }

  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    '@/plugins/element-ui',
    {
      src: '@/plugins/vant',
      ssr: true
    },
    {
      src: "~/plugins/axios",
      ssr: false
    },
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
    '@nuxtjs/axios',// 不需要加入@nuxtjs/proxy,
  ],
  /**
   * 配置跨域
   */
  axios: {
    proxy: true,
    // prefix: '/BwwdMoblie.php/Recognize', // baseURL
    // credentials: true,
  },
  proxy: [
    [
      '/api/',
      {
        target: 'http://bwwd.cs', // api主机
        changeOrigin: true,
        pathRewrite: { '^/api/': '' }
      }
    ]
  ],
  /*
  ** Build configuration
  */
  build: {
    vendor: ['axios'], // 防止重复打包
    transpile: [/^element-ui/],
    postcss: [
      require('postcss-pxtorem')({
        rootValue: 75.0,
        unitPrecision: 3, // 最小精度，小数点位数
        propList: ['*'], // ['!font*'] !不匹配属性（这里是字体相关属性不转换）
        minPixelValue: 2 // 替换的最小像素值
      })
    ],
    loaders: [
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: "url-loader",
        query: {
          limit: 7631,
          name: 'img/[name].[hash:8].[ext]'
        }
      }

    ],
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    },
  }
}
