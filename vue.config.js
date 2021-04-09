module.exports = {
    productionSourceMap: process.env.NODE_ENV === 'dev',

    configureWebpack: {
      resolve: {
        alias: {
          'components': '@/components',
          'content': 'components/content',
          'common': 'components/common',
          'assets': '@/assets',
          'network': '@/network',
          'views': '@/views',
        }
      },
      devtool: process.env.NODE_ENV === 'dev' ? 'source-map' : undefined
    },
    css: {
      loaderOptions: {
        stylus: {
          import: '~assets/css/mixin.styl'
        }
      }
    }
  }