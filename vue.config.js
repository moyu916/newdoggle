module.exports = {
    // publicPath: process.env.NODE_ENV === 'production' ? '/superMall/' : '/',
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
      }
    },
    css: {
      loaderOptions: {
        stylus: {
          import: '~assets/css/mixin.styl'
        }
      }
    }
  }