<template>
  <div class="bg-gray">
    <van-row class="p-4" type="flex" justify="start">
      <van-image
        class="round"
        width="4rem"
        height="4rem"
        fit="cover"
        src="https://img.yzcdn.cn/vant/cat.jpeg"
      />
      <van-row class="pl-3 flex-column" type="flex" justify="space-between">
        <van-row class="font16">用户昵称</van-row>
        <van-row class="font14 color-gray">liweiwh@itcast.com</van-row>
      </van-row>
    </van-row>
    <van-row>
      <van-row class="mb-2">
        <van-cell title="设置" is-link :to="{name: 'settings'}" />
      </van-row>
      <van-row class="mb-2">
        <van-cell title="武研前端" is-link />
        <van-cell title="关于itcast" is-link />
      </van-row>
      <van-row class="mx-3 mt-3">
        <van-button type="primary" block>退出登录</van-button>
      </van-row>
    </van-row>
    <it-footer></it-footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer.vue'
import {
  Cell,
  Row,
  Button,
  Image
} from 'vant'
export default {
  name: 'user',
  components: {
    [Cell.name]: Cell,
    [Row.name]: Row,
    [Button.name]: Button,
    [Image.name]: Image,
    'it-footer': Footer
  }
}
</script>

<style lang="scss" scoped>
.round {
  border-radius: 6px;
  overflow: hidden;
}
</style>
