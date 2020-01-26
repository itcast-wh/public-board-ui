<template>
  <div>
    <van-sticky>
      <van-nav-bar title="投票详情" left-arrow @click-left="onClickLeft" />
    </van-sticky>
    <div class="container p-3">
      <div class="title font16">{{info.title}}</div>
      <div class="content pt-2 font14" v-html="replaceContent"></div>
    </div>
    <van-divider class="px-2">评论</van-divider>
    <van-list
      class="comments pb-5"
      finished-text="没有更多了"
      :finished="finished"
      :load="loading"
      :offset="50"
      @load="getMore()"
    >
      <van-cell v-for="(item,index) in comments" :key="'comments' + index">
        <van-row class="comments-item py-2 px-3">
          <van-col span="3">
            <van-image
              round
              fit="cover"
              width="2rem"
              height="2rem"
              :src="item.uid.pic ? item.uid.pic : 'https://img.yzcdn.cn/vant/cat.jpeg'"
            />
          </van-col>
          <van-col span="21">
            <van-row
              class="user font14 color-gray"
              type="flex"
              align="center"
              justify="space-between"
            >
              <van-col>{{item.uid.name}}</van-col>
              <van-col>{{item.created | moment}}</van-col>
            </van-row>
            <van-row class="font14 pt-2" v-html="item.content"></van-row>
            <van-row type="flex" justify="end" @click="setHands(item,index)">
              <van-icon
                name="good-job-o"
                size="1.2rem"
                class="color-gray mr-1"
                v-if="item.handed !== 1"
              ></van-icon>
              <van-icon
                name="good-job"
                size="1.2rem"
                class="color-gray mr-1"
                color="#ff4949"
                v-else
              ></van-icon>
              <span class="font14 color-gray">{{item.likes}}</span>
            </van-row>
          </van-col>
        </van-row>
      </van-cell>
      <!-- <van-cell v-show="comments.length === 0">
        <van-row class="comments-item py-2 px-3">目前还没有评论，来添加一条吧</van-row>
      </van-cell>-->
    </van-list>
    <div class="fixed">
      <van-row type="flex" justify="space-between" align="center" class="px-2 flex-height">
        <div @click="reply(0)" class="reply-outer mr-2 font14 color-gray text-center">
          点击回复
          <!-- <input type="text" placeholder="请输入回复内容" class="reply pl-2" /> -->
        </div>
        <van-icon name="comment-o" class="mx-1 color-gray" size="1.2rem"></van-icon>
        <span class="color-gray font12 mr-2">{{this.comments.length}}</span>
        <van-row type="flex" align="center" @click="setVoteHands(info)">
          <van-icon name="like-o" class="mx-1 color-gray" size="1.2rem" v-if="isHand !== 1"></van-icon>
          <van-icon name="like" class="mx-1 color-gray" size="1.2rem" color="#ff4949" v-else></van-icon>
          <span class="color-gray font12">{{likes}}</span>
        </van-row>
      </van-row>
    </div>
  </div>
</template>

<script>
// import _ from 'lodash'
import { getDetail, getComments, handsComment, handsVote } from '@/api/data'
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
  Cell,
  Toast,
  Dialog
} from 'vant'

export default {
  name: 'detail',
  props: ['id', 'handed'],
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
      finished: false,
      loading: false,
      page: 0,
      limit: 10,
      info: {
        title: '',
        content: ''
      },
      comments: [],
      newOnes: []
    }
  },
  mounted () {
    if (this.handed) {
      this.info.handed = this.handed
    }
    const key = 'comment-' + this.id
    const str = localStorage.getItem(key)
    if (str && str !== '') {
      const obj = JSON.parse(str)
      this.comments = obj.comments
      this.page = obj.page
      this.limit = obj.limit
    }
    this.getVoteDetail()
    this.loading = true
    this.getCommentsList()
  },
  methods: {
    onClickLeft () {
      this.$router.push({ name: 'list' })
    },
    // 获取下一页评论
    getMore () {
      if (this.loading) {
        return
      }
      this.page++
      this.getCommentsList()
    },
    // 获取文章详情
    getVoteDetail () {
      this.loading = true
      getDetail({ id: this.id }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.info = res.data
          if (this.info.length === 0) {
            this.finished = true
          }
        }
      }).catch((err) => {
        if (err) {
          this.loading = false
        }
      })
    },
    // 获取评论列表
    getCommentsList () {
      if (this.finished) {
        return
      }
      this.loading = true
      getComments({ id: this.id, page: this.page, limit: this.limit }).then((res) => {
        this.loading = false
        this.newOnes = res.data
        if (res.code === 200) {
          if (this.comments.length === 0) {
            this.comments = res.data
            this.finished = true
          } else {
            if (res.data.length > 0) {
              // const old = this.comments.map((item) => item._id)
              // const newArr = res.data.map((item) => item._id).filter(o => old.indexOf(o) === -1)
              // const addArr = res.data.filter(o => newArr.indexOf(o._id) !== -1)
              const oldStr = JSON.stringify(this.comments)
              const newStr = res.data.filter((item) => {
                return oldStr.indexOf(JSON.stringify(item)) === -1
              })

              // const arr = _.filter(res.data, (item) => {
              //   return _.findIndex(this.comments, item) === -1
              // })
              this.comments = this.comments.concat(newStr)
            } else {
              this.finished = true
            }
          }
        }
      }).catch((err) => {
        if (err) {
          this.loading = true
        }
      })
    },
    // 添加回复
    reply (id) {
      const isLogin = this.$store.state.isLogin
      if (!isLogin) {
        Dialog.confirm({
          title: '未登录',
          message: '您还未登录，请登录后评论',
          cancelButtonText: '取消',
          confirmButtonText: '登录'
        }).then(() => {
          this.$router.push({ name: 'login' })
        })
        return
      }
      if (!id) {
        if (this.newOnes.length === 0 && this.page > 0) {
          this.page--
        }
        const key = 'comment-' + this.id
        localStorage.setItem(key, JSON.stringify({ page: this.page, comments: this.comments, limit: this.limit }))
        this.$router.push({ name: 'reply', params: { id: this.id, uid: 0 } })
      }
    },
    // 评论点赞
    setHands (item, index) {
      let handed = 0
      if (!item.handed) {
        handed = 1
      }
      item.handed = handed
      item.likes += handed ? 1 : -1
      handsComment({
        id: item._id,
        handed
      }).then((res) => {
        if (res.code === 200) {
          Toast(handed ? '点赞成功' : '取消点赞')
        }
      })
    },
    // 文章点赞
    setVoteHands (info) {
      let handed = 0
      if (!info.handed) {
        handed = 1
      }
      this.info.likes += handed ? 1 : -1
      this.$set(this.info, 'handed', handed)
      this.$set(this.info, 'likes', this.info.likes)
      handsVote({
        id: info._id,
        handed
      }).then((res) => {
        if (res.code === 200) {
          Toast(handed ? '点赞成功' : '取消点赞')
        }
      })
    }
  },
  computed: {
    isHand () {
      return this.info ? this.info.handed : this.handed
    },
    likes () {
      let result = 0
      let leave = 2
      let num = this.info.likes ? this.info.likes : 0
      if (num > 10000) {
        result = (num / 10000).toFixed(leave)
        return result + 'w'
      } else {
        result = num
      }
      return result
    },
    replaceContent () {
      return this.info.content.replace(/\n/g, '<br/>')
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
