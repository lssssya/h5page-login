/*
 * API
 * dev: 开发环境    test: 测试环境    prod: 生产环境
 * */
const oDomains = {
  // 默认ajax地址
  base: {
    dev: '/' + process.env.VUE_APP_CONTEXT,
    test: '/' + process.env.VUE_APP_CONTEXT,
    prod: '/' + process.env.VUE_APP_CONTEXT
  },
  socket: {
    dev: '10.192.197.185:8078/' + process.env.VUE_APP_CONTEXT,
    test: location.host + '/' + process.env.VUE_APP_CONTEXT,
    prod: location.host + '/' + process.env.VUE_APP_CONTEXT
  }
}
let ENV_API = 'dev'
if (process.env.NODE_ENV === 'production') {
  ENV_API = 'prod'
}
// console.log('config.js env：', ENV_API)
// ajax default
const ajaxCtx = {}
for (const _key in oDomains) {
  ajaxCtx[_key] = oDomains[_key][ENV_API]
}
console.log('config.js ctx：', ajaxCtx)
export { ajaxCtx }
