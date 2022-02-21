<template>
  <div class="container">
    <div class="main-wrap panel">
      <van-form
        ref="formRef"
        class="login-form"
        show-error
        @submit="handleSubmit"
      >
        <div class="label">手机号码</div>
        <van-field
          v-model="form.phone"
          class="status-control"
          placeholder="请输入您的手机号码"
          name="phone"
          :rules="[{ required: true, message: '请填写手机号码' }]"
        >
          <template #button>
            <span
              v-if="!isCountDown"
              class="text get"
              @click="handleGetCode"
            >获取验证码</span>
            <span
              v-else
              class="text wait"
            >
              {{ current.seconds }}s后重新获取
            </span>
          </template>
        </van-field>
        <div class="label last">验证码</div>
        <van-field
          v-model="form.verificationCode"
          class="status-control"
          placeholder="请输入您的验证码"
          name="verificationCode"
          :rules="[{ required: true, message: '请填写验证码' }]"
        />
        <van-button
          class="reset-vant-button button"
          round
          block
          type="primary"
          native-type="submit"
        >
          提交
        </van-button>
      </van-form>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from 'vue'
import { useCountDown } from '@vant/use';

export default {
  name: 'Login',
  setup () {

    // 倒计时
    let isCountDown = ref(false)
    const countDown60s = useCountDown({
      // 倒计时 60s
      time: 5 * 1000,
      // time: 60 * 1000,
      onFinish: () => {
        isCountDown.value = false
      }
    })

    const form = reactive({
      phone: '',
      verificationCode: ''
    })

    // 校验
    const phoneValidator = (val) => /1\d{10}/.test(val)

    return {
      isCountDown,
      countDown60s,
      current: countDown60s.current,

      form,
      phoneValidator
    }
  },
  data () {
    return {}
  },
  mounted () { },
  methods: {
    handleSubmit (values) {
      console.log(values)
    },
    handleGetCode () {
      this.countDown60s.reset()
      this.countDown60s.start()
      this.isCountDown = true
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/assets/css/variable.scss';
.userinfo {
  font-size: 16px;
}

.main-wrap {
  box-sizing: border-box;
  margin: 120px auto 0;
  width: 355px;
  height: 400px;
  padding: 80px 8px 0;

  .label {
    padding: 0 16px;
    opacity: 0.9;
    font-family: PingFangSC-Medium;
    font-size: 18px;
    color: #000000;
    font-weight: 500;
    &.last {
      margin-top: 40px;
    }
  }

  .status-control.van-field--error::after {
    /* 2px 在移动端计算之后没感觉 扩展到2.5 */
    transition: 0.3s;
    transform: none;
    border-bottom: 2.5px solid #e72528;
  }

  .status-control:focus-within::after {
    /* 2px 在移动端计算之后没感觉 扩展到2.5 */
    transition: 0.3s;
    transform: none;
    border-bottom: 2.5px solid #2080f7;
  }

  .button {
    width: 320px;
    margin: 40px 8px 0;
  }

  .text {
    font-family: PingFangSC-Regular;
    font-size: 16px;
    letter-spacing: -0.26px;
    text-align: right;
    line-height: 16px;
    font-weight: 400;
    &.get {
      color: #2080f7;
    }
    &.wait {
      color: rgba(0, 0, 0, 0.4);
    }
  }

  // error message
  ::v-deep .login-form {
    .van-field__control--error::placeholder {
      color: #c8c9cc;
      -webkit-text-fill-color: #c8c9cc;
    }
    .van-field {
      overflow: unset;
    }
    .van-field__error-message {
      position: absolute;
      top: 40px;
      font-family: PingFangSC-Regular;
      font-size: 14px;
      color: #e72528;
      line-height: 14px;
      font-weight: 400;
    }
  }
}
</style>
