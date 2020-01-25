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
      <van-button type="info" block @click="submit()">确认回复</van-button>
    </van-row>
  </div>
</template>

<script>
import { addComments } from '@/api/data'
import {
  Button,
  NavBar,
  Field,
  Row,
  Toast
} from 'vant'
export default {
  name: 'reply',
  props: ['id', 'uid'],
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Row.name]: Row,
    [Field.name]: Field
  },
  mounted () {
    console.log(this.id)
    console.log(this.uid)
  },
  data () {
    return {
      message: ''
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    submit () {
      if (this.message.trim() === '') {
        Toast('评论内容为空！请检查')
        return
      }
      addComments({
        vid: this.id,
        tuid: this.uid,
        content: this.message
      }).then((res) => {
        if (res.code === 200) {
          Toast('评论成功！')
          this.$router.go(-1)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
</style>
