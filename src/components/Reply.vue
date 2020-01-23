<template>
  <div>
    <van-nav-bar title="评论回复" left-arrow @click-left="onClickLeft" />
    <van-field
      v-model="message"
      rows="2"
      autosize
      type="textarea"
      maxlength="50"
      placeholder="请输入留言"
      show-word-limit
    />
    <van-row class="mx-3 mt-4">
      <van-button type="info" block>确认回复</van-button>
    </van-row>
  </div>
</template>

<script>
import {
  Button,
  NavBar,
  Field,
  Row
} from 'vant'
export default {
  name: 'reply',
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Field.name]: Field
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.push({ name: 'list' })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
