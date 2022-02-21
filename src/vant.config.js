import {
  Button,
  Icon,
  Toast,
  Field,
  Form
} from 'vant'

const vantInit = app => {
  app
    .use(Button)
    .use(Icon)
    .use(Field)
    .use(Form)
  app.config.globalProperties.$toast = Toast
}

export default vantInit
