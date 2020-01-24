<template>
  <div>
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab title="通过邮箱注册">
        <van-row>
          <van-cell-group class="mx-3">
            <van-field label="邮箱" v-model="email" placeholder="请输入邮箱" />
            <van-field label="昵称" v-model="name" placeholder="请输入昵称" />
            <van-field label="密码" type="password" v-model="password" placeholder="请输入密码" />
            <van-field label="确认密码" type="password" v-model="repeat" placeholder="请再次输入密码" />
            <van-button class="mt-4" type="info" block @click="regNew()">确定注册</van-button>
          </van-cell-group>
        </van-row>
      </van-tab>
      <van-tab title="通过手机号注册">
        <van-row>
          <van-cell-group class="mx-3">
            <van-field label="昵称" v-model="name" placeholder="请输入昵称" />
            <van-field label="手机号" v-model="mobile" placeholder="请输入手机号" />
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
              <van-button slot="button" size="small" type="info" @click="sendCode()">发送验证码</van-button>
            </van-field>
            <van-button class="mt-4" type="info" block @click="regNew()">确定注册</van-button>
          </van-cell-group>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import { reg } from '@/api/login'
import {
  Field,
  Button,
  CellGroup,
  NavBar,
  Tab,
  Tabs,
  Toast,
  Dialog
} from 'vant'

export default {
  name: 'reg',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar,
    [Tab.name]: Tab,
    [Tabs.name]: Tabs
  },
  data () {
    return {
      name: '',
      email: '',
      password: '',
      repeat: '',
      mobile: '',
      sms: '',
      isLock: false
    }
  },
  computed: {
    ...mapState({
      last: 'lastPage'
    })
  },
  methods: {
    ...mapMutations(['setLogin', 'setToken', 'setUser']),
    onClickLeft () {
      this.$router.go(-1)
    },
    sendCode () {
      Dialog.alert({
        title: '功能未开放！',
        message: '短信功能还在开发中，请耐心等待！'
      })
    },
    regNew () {
      // 自锁
      if (this.isLock) return
      // 表单校验
      const name = /[a-zA-Z\u4e00-\u9fa5][a-zA-Z0-9\u4e00-\u9fa5]+/
      if (this.name.trim() === '' || !name.test(this.name)) {
        Toast('昵称只能由中文、字母或数字组成！')
        return
      }
      const email = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      if (!email.test(this.email)) {
        Toast('请输入正确的邮箱')
        return
      }
      const mobile = /^0?1[3|4|5|7|8][0-9]\d{8}$/
      if (this.mobile.trim() !== '') {
        if (!mobile.test(this.mobile)) {
          Toast('请输入正确的手机号')
          return
        }
      }
      if (this.password.trim() === '' || this.password !== this.repeat || this.password.length < 6 || this.repeat.length < 6) {
        Toast('请检查密码的输入！至少6位，并且与确认密码一致！')
        return
      }
      this.isLock = true
      // 注册请求
      reg({
        username: this.email,
        password: this.password,
        name: this.name
      }).then((res) => {
        this.isLock = false
        if (res.code === 200) {
          this.setLogin(true)
          this.setToken(res.token)
          this.setUser(res.data)
          const toast = Toast({
            duration: 0, // 持续展示 toast
            forbidClick: true,
            message: `注册成功，马上跳转！2s`
          })
          let second = 2
          const timer = setInterval(() => {
            second--
            if (second) {
              toast.message = `注册成功，马上跳转！${second}s`
            } else {
              clearInterval(timer)
              // 手动清除 Toast
              Toast.clear()
              this.$router.push({ name: this.last })
            }
          }, 1000)
        } else {
          Toast(res.msg)
        }
      }).catch((err) => {
        this.isLock = false
        Toast(`请求状态：${err.status}, 错误原因：${err.statusText}`)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
