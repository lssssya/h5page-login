import axios from 'axios'
import { Toast } from 'vant'
import { REQUEST_SUCCESS, REFRESH_BY_HEADER } from '@/constant'
import { ajaxCtx } from '@/api/config.js'

const http = axios.create({
  timeout: 20000,
  withCredentials: true,
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

http.interceptors.response.use(function (response) {
  
  // 根据响应数据判断是否登录过期
  if (response.data.errorCode === REFRESH_BY_HEADER) {
    let refreshUrl = response.headers['refresh-url'].split('?')[0]
    refreshUrl = refreshUrl + '?service=' + location.protocol + '//' + location.host + location.pathname + encodeURIComponent(location.search)
    location.href = refreshUrl
    return
  }
  // 对错误进行统一处理
  if (response.data.code !== REQUEST_SUCCESS) {
    if (!response.config.noMsg && response.data.msg) {
      Toast.fail(response.data.msg)
    }
    return Promise.reject(response)
  } else if (response.data.code === REQUEST_SUCCESS && response.config.successNotify && response.data.msg) {
    // 弹出成功提示
    Toast.success(response.data.msg)
  }
  return Promise.resolve({
    code: response.data.code,
    msg: response.data.msg,
    data: response.data.data
  })
}, function (error) {
  if (error.message.indexOf('timeout') > -1) {
    Toast.fail('请求超时，请重试！')
  }

  return Promise.reject(error)
})

// 请求拦截器
http.interceptors.request.use(function (config) {
  // 模式，微服务
  if (config.mode && ajaxCtx[config.mode]) {
    config.baseURL = ajaxCtx[config.mode]
  }
  // 所有搜索框可输入元素，都不需要去掉前后空格，只有仅输入空格时，将其替换成空字符串
  // return trimOnlySpace(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

export default http
