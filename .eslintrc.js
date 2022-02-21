module.exports = {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true
  },
  extends: [
    'plugin:vue/recommended', // 适用于 Vue.js 2.x，使用 recommended 规则。详见：https://eslint.vuejs.org/user-guide/#usage
  ],
  rules: {
    "vue/singleline-html-element-content-newline": 0, //单行元素换行符
    "no-console": "off",
    "no-debugger": "warn",
    "no-unused-vars": "warn",
    "template-curly-spacing": ['warn','always'], // 在花括号内需要一个或多个空间
    "quotes": ['error', 'single'], // 使用单引号
    "comma-dangle": ["error", "never"] // 不尾随逗号
  },
  parserOptions: {
    parser: 'babel-eslint'  // 用于解析检查项目中用到的非标准或实验性的语法，比如异步 import
  }
}
