<template>
  <div>
    <van-nav-bar title="登录" class="login-nav" />
    <van-form ref="loginForm">
      <van-field
        v-model="user.mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="userFormRules.mobile"
      >
        <i slot="left-icon" class="toutiao toutiao-shouji"></i>
      </van-field>
      <van-field
        v-model="user.code"
        type="number"
        name="code"
        placeholder="请输入验证码"
        :rules="userFormRules.code"
      >
        <i slot="left-icon" class="toutiao toutiao-yanzhengma"></i>
        <van-count-down
          :time="1000 * 5"
          slot="button"
          format="ss s"
          v-if="isCountDownShow"
          @finish="isCountDownShow = false"
        />
        <van-button
          v-else
          slot="button"
          round
          size="small"
          type="default"
          class="send-msg"
          @click="onSendSms"
          native-type="button"
          >获取验证码
        </van-button>
      </van-field>
      <div style="margin-top: 16px">
        <van-button block type="info" native-type="submit" @click="send"
          >登录</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { login, getSmsCode } from '../../api/user'
export default {
  data () {
    return {
      user: {
        mobile: '',
        code: ''
      },
      isCountDownShow: false,
      userFormRules: {
        mobile: [
          {
            required: true,
            message: '手机号不能为空'
          },
          {
            pattern: /^1[3|5|7|8]\d{9}$/,
            message: '手机号格式错误'
          }
        ],
        code: [
          {
            required: true,
            message: '验证码不能为空'
          },
          {
            pattern: /^\d{6}$/,
            message: '验证码格式错误'
          }
        ]
      }
    }
  },
  methods: {
    async send () {
      this.$toast.loading({
        duration: 0,
        message: '登录中...',
        forbidClick: true
      })
      try {
        const res = await login(this.user)
        console.log(res)
        this.$store.commit('setUser', res.data.data)
        this.$toast.success('登录成功', res)
        this.$router.push('/my')
      } catch (err) {
        if (err.response.status === 400) {
          this.$toast.fail('手机号或验证码错误')
        } else {
          this.$toast.fail('登录失败,请稍后重试')
        }
      }
    },
    async onSendSms () {
      try {
        await this.$refs.loginForm.validate('mobile')
      } catch (err) {
        return console.log('验证失败', err)
      }

      this.isCountDownShow = true

      try {
        await getSmsCode(this.user.mobile)
        this.$toast('发送成功')
      } catch (err) {
        this.isCountDownShow = false
        if (err.response.status == 429) {
          this.$toast('发送太频繁了')
        } else {
          this.$toast('发送失败 ')
        }
      }
    }
  }
}
</script>

<style scoped lang="less">
.send-msg {
  background-color: #ededed;
  color: #666;
}
.toutiao {
  font-size: 18px;
}
</style>
