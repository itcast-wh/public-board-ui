<template>
  <div>
    <van-sticky>
      <van-nav-bar title left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="container p-3">
      <div class="title font16">这里是标题.....</div>
      <div class="content pt-2 font14">
        这里是内容
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" width="100%" alt />
      </div>
    </div>
    <van-divider class="px-2">评论</van-divider>
    <vant-list class="comments" finished-text="没有更多了" :finished="finished">
      <van-cell>
        <van-row class="comments-item py-2 px-3">
          <van-col span="3">
            <van-image
              round
              fit="cover"
              width="2rem"
              height="2rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="21">
            <van-row
              class="user font14 color-gray"
              type="flex"
              align="center"
              justify="space-between"
            >
              <van-col>用户名</van-col>
              <van-col>1天前</van-col>
            </van-row>
            <van-row class="font14 pt-2">这里的评论内容</van-row>
            <van-row type="flex" justify="end">
              <van-icon name="good-job-o" size="1.2rem" class="color-gray mr-1"></van-icon>
              <span class="font14 color-gray">14</span>
            </van-row>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell>
        <van-row class="comments-item py-2 px-3">
          <van-col span="3">
            <van-image
              round
              fit="cover"
              width="2rem"
              height="2rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="21">
            <van-row
              class="user font14 color-gray"
              type="flex"
              align="center"
              justify="space-between"
            >
              <van-col>用户名</van-col>
              <van-col>1天前</van-col>
            </van-row>
            <van-row class="font14 pt-2">这里的评论内容</van-row>
            <van-row type="flex" justify="end">
              <van-icon name="good-job-o" size="1.2rem" class="color-gray mr-1"></van-icon>
              <span class="font14 color-gray">14</span>
            </van-row>
          </van-col>
        </van-row>
      </van-cell>
      <van-cell class="mb-5">
        <van-row class="comments-item py-2 px-3">
          <van-col span="3">
            <van-image
              round
              fit="cover"
              width="2rem"
              height="2rem"
              src="https://img.yzcdn.cn/vant/cat.jpeg"
            />
          </van-col>
          <van-col span="21">
            <van-row
              class="user font14 color-gray"
              type="flex"
              align="center"
              justify="space-between"
            >
              <van-col>用户名</van-col>
              <van-col>1天前</van-col>
            </van-row>
            <van-row class="font14 pt-2">这里的评论内容</van-row>
            <van-row type="flex" justify="end">
              <van-icon name="good-job-o" size="1.2rem" class="color-gray mr-1"></van-icon>
              <span class="font14 color-gray">14</span>
            </van-row>
          </van-col>
        </van-row>
      </van-cell>
    </vant-list>
    <div class="fixed">
      <van-row type="flex" justify="space-between" align="center" class="px-2 flex-height">
        <router-link :to="{name: 'reply'}" class="reply-outer mr-2 font14 color-gray text-center">
          点击回复
          <!-- <input type="text" placeholder="请输入回复内容" class="reply pl-2" /> -->
        </router-link>
        <van-icon name="comment-o" class="mx-1 color-gray" size="1.2rem"></van-icon>
        <span class="color-gray font12 mr-2">10</span>
        <van-icon name="like-o" class="mx-1 color-gray" size="1.2rem"></van-icon>
        <span class="color-gray font12">10</span>
      </van-row>
    </div>
  </div>
</template>

<script>
import {
  Button,
  NavBar,
  Divider,
  Image,
  Col,
  Row,
  Icon,
  Field,
  Sticky,
  List,
  Cell
} from 'vant'

export default {
  name: 'detail',
  props: ['id'],
  components: {
    [Button.name]: Button,
    [NavBar.name]: NavBar,
    [Divider.name]: Divider,
    [Row.name]: Row,
    [Col.name]: Col,
    [Image.name]: Image,
    [Icon.name]: Icon,
    [Field.name]: Field,
    [Sticky.name]: Sticky,
    [List.name]: List,
    [Cell.name]: Cell
  },
  data () {
    return {
      message: '',
      finished: true
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
.border {
  &:after {
    content: "";
    display: block;
    width: 100%;
    padding-top: 0.5rem;
    border-bottom: 1px solid #ebedf0;
    transform: scaleY(0.5);
  }
}
.reply-outer {
  background-color: #1989fa;
  // background-color: #f7f8fa;
  color: #fff;
  padding: 5px 8px 5px 0;
  border-radius: 17px;
  flex: 1;
}
.reply {
  font-size: 14px;
  line-height: 24px;
  appearance: none;
  margin: 0;
  width: 100%;
  color: #323233;
  background-color: transparent;
  border: 0;
  resize: none;
}

.fixed {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background: #fff;
  z-index: 1000;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.05);
}
.flex-height {
  height: 100%;
}
</style>
