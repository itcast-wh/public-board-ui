<template>
  <div>
    <van-nav-bar title="设置" left-arrow @click-left="onClickLeft" />
    <van-row>
      <van-cell-group>
        <van-cell title="账号" is-link value="liweiwh@itcast.cn" />
        <van-cell title="修改手机号" is-link value="153******15" />
        <van-cell title="修改密码" is-link />
      </van-cell-group>
    </van-row>
  </div>
</template>

<script>
import {
  Cell,
  CellGroup,
  Row,
  NavBar
} from 'vant'
export default {
  name: 'settings',
  components: {
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup,
    [Row.name]: Row,
    [NavBar.name]: NavBar
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
