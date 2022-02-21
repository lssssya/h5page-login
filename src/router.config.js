export default [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/error/:type',
    name: 'Error',
    component: 'Error' // 注意提供ErrorPage组件内的多语言翻译
  },
  {
    path: '/login',
    menuCode: '001',
    name: 'Login',
    component: 'login/index',
    title: '登录'
  }
]
