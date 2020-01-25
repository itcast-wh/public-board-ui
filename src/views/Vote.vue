<template>
  <div>
    <van-sticky>
      <van-search
        v-model="value"
        placeholder="请输入搜索关键词"
        show-action
        shape="round"
        @search="onSearch"
      >
        <div slot="action" @click="add">添加</div>
      </van-search>
    </van-sticky>
    <van-list v-model="loading" :finished="finished">
      <van-cell
        v-for="(item,index) in list"
        :key="'vote' + index"
        :title="item.title"
        @click="setHands(item, index)"
      >
        <van-icon
          slot="right-icon"
          name="like-o"
          style="line-height: inherit;"
          size="20"
          v-if="item.handed !== 1"
        />
        <van-icon
          slot="right-icon"
          name="like"
          color="#ff4949"
          style="line-height: inherit;"
          size="20"
          v-else
        />
      </van-cell>
      <div class="van-list__finished-text" v-show="finished">
        <span class="mr-2">没有更多了</span>
        <span class="link" @click="add">想添加一条?</span>
      </div>
    </van-list>
    <it-footer></it-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapMutations } from 'vuex'
import { getList, handsVote } from '@/api/data'
import Footer from '@/components/Footer.vue'
import {
  Search,
  List,
  Cell,
  Sticky,
  Col,
  Row,
  Icon,
  Dialog,
  Toast
} from 'vant'
export default {
  name: 'vote',
  data () {
    return {
      value: '',
      page: 0,
      limit: 10,
      list: [
        // {
        //   text: '小程序',
        //   handed: false
        // }
      ],
      loading: false,
      finished: false
    }
  },
  components: {
    [Search.name]: Search,
    [List.name]: List,
    [Cell.name]: Cell,
    [Sticky.name]: Sticky,
    [Row.name]: Row,
    [Col.name]: Col,
    [Icon.name]: Icon,
    'it-footer': Footer
  },
  mounted () {
    this._getList()
  },
  methods: {
    ...mapMutations(['setLast']),
    add () {
      const isLogin = this.$store.state.isLogin
      if (isLogin) {
        this.$router.push({ name: 'add' })
      } else {
        Dialog.confirm({
          title: '未登录',
          message: '请先登录后，再进行添加！'
        }).then(() => {
          this.setLast('vote')
          this.$router.push({ name: 'login' })
        }).catch(() => {

        })
      }
    },
    onSearch () {
      this.page = 0
      this._getList()
    },
    _getList () {
      this.loading = true
      getList({
        text: this.value,
        page: this.page,
        limit: this.limit
      }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          this.list = res.data
          if (this.page === 0 && this.list.length < this.limit) {
            this.finished = true
          }
        }
      })
    },
    // 投票点赞
    setHands (item, index) {
      let handed = 0
      if (!item.handed) {
        handed = 1
      }
      item.handed = handed
      // this.$set(this.list, index, item)
      handsVote({
        id: item._id,
        handed
      }).then((res) => {
        if (res.code === 200) {
          Toast(handed ? '点赞成功' : '取消点赞')
        }
      })
    }
  }
}
</script>
<style lang="scss">
.van-search__action {
  padding: 0 10px;
  color: #1989fa;
}
</style>
