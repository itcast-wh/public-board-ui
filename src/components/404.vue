<template>
  <div>
    <van-nav-bar title="页面走丢了" left-arrow @click-left="onClickLeft" />
    <van-row class="flex-column" type="flex" justify="center" align="center">
      <van-image class="mb-3" width="10rem" height="6rem" fit="contain" :src="img" />
      <van-button type="default" to="/">返回首页</van-button>
    </van-row>
  </div>
</template>

<script>
import img404 from '@/assets/img/icon-404.png'
import {
  NavBar,
  Button,
  Image,
  Row
} from 'vant'
export default {
  name: 'nofound',
  data () {
    return {
      img: img404
    }
  },
  components: {
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Image.name]: Image,
    [Button.name]: Button
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-column {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
</style>
