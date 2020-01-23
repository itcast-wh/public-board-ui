<template>
  <div>
    <van-nav-bar title="注册" left-arrow @click-left="onClickLeft" />
    <van-tabs v-model="active">
      <van-tab title="通过邮箱注册">
        <van-row>
          <van-cell-group class="mx-3">
            <van-field label="邮箱" v-model="email" placeholder="请输入邮箱" />
            <van-field label="密码" v-model="password" placeholder="请输入密码" />
            <van-field label="确认密码" v-model="repeat" placeholder="请再次输入密码" />
            <van-button class="mt-4" type="info" block>确定注册</van-button>
          </van-cell-group>
        </van-row>
      </van-tab>
      <van-tab title="通过手机号注册">
        <van-row>
          <van-cell-group class="mx-3">
            <van-field label="手机号" v-model="mobile" placeholder="请输入手机号" />
            <van-field v-model="sms" center clearable label="短信验证码" placeholder="请输入短信验证码">
              <van-button slot="button" size="small" type="info">发送验证码</van-button>
            </van-field>
            <van-button class="mt-4" type="info" block>确定注册</van-button>
          </van-cell-group>
        </van-row>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import {
  Field,
  Button,
  CellGroup,
  NavBar,
  Tab,
  Tabs
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
      email: '',
      password: '',
      repeat: '',
      mobile: '',
      sms: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
