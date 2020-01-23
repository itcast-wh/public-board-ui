<template>
  <div>
    <van-nav-bar title="登录" left-arrow @click-left="onClickLeft" />
    <div class="container mx-3">
      <van-row class="text-center mt-4 mb-2">
        <van-image round fit="cover" width="10rem" height="10rem" :src="logo" />
      </van-row>
      <van-cell-group>
        <van-field v-model="username" label="用户名" type="text" placeholder="请输入用户名"></van-field>
        <van-field v-model="password" label="密码" type="password" placeholder="请输入密码"></van-field>
        <van-button class="mt-4" type="info" block>登录</van-button>
      </van-cell-group>
      <van-row class="mt-1 mx-1 font14" type="flex" justify="space-between" align="center">
        <van-col class="text-main">忘记密码</van-col>
        <van-col>
          <router-link class="text-main" to="/reg">注册</router-link>
        </van-col>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Field,
  Col,
  Row,
  Button,
  Image,
  CellGroup,
  NavBar
} from 'vant'

import logo from '../assets/img/logo1.png'

export default {
  name: 'login',
  components: {
    [Image.name]: Image,
    [Field.name]: Field,
    [Row.name]: Row,
    [Col.name]: Col,
    [Button.name]: Button,
    [CellGroup.name]: CellGroup,
    [NavBar.name]: NavBar
  },
  data () {
    return {
      logo: logo,
      username: '',
      password: ''
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
.wrap {
  padding: 15px;
}
</style>
