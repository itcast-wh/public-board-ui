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
      <van-cell v-for="(item,index) in list" :key="'vote' + index" :title="item.text">
        <van-icon
          slot="right-icon"
          name="like-o"
          style="line-height: inherit;"
          size="20"
          v-if="item.handed"
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
import { getList } from '@/api/data'
import Footer from '@/components/Footer.vue'
import {
  Search,
  List,
  Cell,
  Sticky,
  Col,
  Row,
  Icon,
  Dialog
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
          if (this.page === 0 && this.list.length === 0) {
            this.finished = true
          }
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
