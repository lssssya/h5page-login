import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from '@/store'

import '@/assets/css/common.scss'
// import * as utils from '@/utils/util.js'
import vantInit from './vant.config.js'

import Empty from '@/components/Empty.vue'

// 权限信息获取
store.dispatch('setUserInfo')

const app = createApp(App)
// 全局方法配置
// app.config.globalProperties.$utils = utils
// vant按需引入初始化
vantInit(app)

// 路由 vuex 组件等注入
app
  .use(router)
  .use(store)
  .component('Empty', Empty)

app.mount('#app')
