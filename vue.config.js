module.exports = {
  publicPath: `/${process.env.VUE_APP_CONTEXT}`,
  assetsDir: process.env.VUE_APP_ASSETS,
  runtimeCompiler: true,
  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = process.env.VUE_APP_NAME
      return args
    })
  },
  devServer: {
    proxy: {
      '^/hik/': {
        target: 'http://10.192.201.80:8598',
        changeOrigin: true,
        pathRewrite: { '^/hik': '' }
      }
    }
  }
}
