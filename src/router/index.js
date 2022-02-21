import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'

import routes from '../router.config.js'


const createRoute = (routes) => {
  return routes.reduce((processedRoutes, currentRoute) => {
    processedRoutes.push(processRouteObj(currentRoute))
    return processedRoutes
  }, [])
}

const processRouteObj = ({ menuCode, breadcrumb, children, component, title, ...args }) => {
  return Object.assign({
    meta: {
      menuCode,
      title
    },
    props: {
      breadcrumbObj: {
        content: breadcrumb,
        menuCode: menuCode
      }
    },
    component: () => import(/* webpackInclude: /\.(js|vue)$/ */`@/pages/${component}`),
    children: children ? createRoute(children) : []
  }, args)
}
const router = createRouter({
  // history: createWebHashHistory(), // 带#号 hash模式
  history: createWebHistory(process.env.VUE_APP_CONTEXT), // 不带#号  history模式
  base: process.env.BASE_URL,
  routes: createRoute(routes)
})

router.beforeEach(async (to, form, next) => {
  const { userInfo: { code } } = store.state
  // 防止死循环跳出
  if (to.path.indexOf('error') > -1) {
    next()
    return
  }

  if (code.includes(`${process.env.VUE_APP_CONTEXT}_${to.meta.menuCode}`)) {
    document.title = to.meta.title || process.env.VUE_APP_NAME;
    next() 
  } else if (to.meta.menuCode) {
    // 真实菜单，但无权限
    next({ path: '/error/403' })
  } else {
    // 不属于系统的url，跳转到404页面
    next({ path: '/error/404' })
  }
})

export default router
