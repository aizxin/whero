const mix = require('laravel-mix')
const path = require('path')
const webpack = require('webpack')
require('laravel-mix-purgecss')

/**
 * webpack 配置
 */
console.log(process.env.NODE_ENV)
let resources
let statics
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
  resources = 'resources'
  statics = '/static/admin/'
} else if (process.env.NODE_ENV == 'dev-business' || process.env.NODE_ENV == 'prod-business') {
  resources = 'business'
  statics = '/static/business/'
}

mix.webpackConfig({
  output: {
    // 依据该路径进行编译以及异步加载
    publicPath: statics,
    // 注意开发期间不加 hash，以免自动刷新失败
    chunkFilename: `js/chunk[name].${mix.inProduction() ? '[chunkhash].' : ''}js`
  },
  plugins: [
    // 不打包 moment.js 的语言文件以减小体积
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, resources)
    }
  }
})
mix.setResourceRoot('' + statics)

/**
 * SPA 资源编译
 */

mix
  .setPublicPath(path.normalize('public/' + statics))
  .options({
    processCssUrls: false
  })
  .js(resources + '/main.js', 'js')
  .extract([
    'axios',
    'lodash',
    'vue',
    'vue-router',
    'vuex',
    'element-ui'
  ])
  .autoload({
    vue: ['Vue']
  })
  .purgeCss({
    enabled: true,
    extensions: ['html', 'js', 'css', 'vue'],
    // Other options are passed through to Purgecss
    whitelistPatterns: [/language/, /hljs/],
  })

/**
 * 发布时文件名打上 hash 以强制客户端更新
 */

if (mix.inProduction()) {
  mix.version()
} else {
  mix.disableNotifications()
    .sourceMaps()
}