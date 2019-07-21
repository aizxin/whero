const mix = require('laravel-mix')
const path = require('path')
const webpack = require('webpack')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin')
require('laravel-mix-purgecss')
require('laravel-mix-auto-extract');

/**
 * webpack 配置
 */
let resources
let statics
if (process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'production') {
  resources = 'resources'
  statics = '/static/admin/'
} else if (process.env.NODE_ENV == 'dev-business' || process.env.NODE_ENV == 'prod-business') {
  resources = 'business'
  statics = '/static/business/'
}

Mix.listen('configReady', (webpackConfig) => {
  // Exclude 'svg' folder from font loader
  let fontLoaderConfig = webpackConfig.module.rules.find(rule => String(rule.test) === String(/(\.(png|jpe?g|gif)$|^((?!font).)*\.svg$)/));
  fontLoaderConfig.exclude = /(resources\/icons)/;
});


mix.webpackConfig({
  plugins: [
    new UglifyJsPlugin({
      uglifyOptions: {
        compress: false,
        mangle: {
          keep_classnames: true
        },
        output: {
          comments: false,
          beautify: false,
        }
      }
    }),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        discardComments: {
          removeAll: true
        }
      }
    })
  ],
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
  },
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, 'resources/icons/svg')],
        options: {
          symbolId: 'icon-[name]'
        }
      }
    ],
  }
})

mix.setResourceRoot('' + statics)

/**
 * SPA 资源编译
 */



mix
  .setPublicPath(path.normalize('public/' + statics))
  .options({
    processCssUrls: false,
    uglify: {
      uglifyOptions: {
        sourceMap: false, // 关闭资源映射
        compress: {
          warnings: false,
          drop_console: true // 去除控制台输出代码
        },
        output: {
          comments: false // 去除所有注释
        }
      }
    },
    extractVueStyles: true
  })
  .js(resources + '/main.js', 'js')
  .sass(resources + '/styles/index.scss', 'css')
  .autoExtract({
    vendorPath: 'js/vendor', // Don't suffix paths with `.js`
    manifestPath: 'js/manifest',
    excludeRegExp: /^.*\.(css|scss|sass|less|styl)$/,
    generateManifest: true,
  })
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