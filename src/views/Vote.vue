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
        <div slot="action" @click="onSearch">搜索</div>
      </van-search>
    </van-sticky>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
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
    </van-list>
    <it-footer></it-footer>
  </div>
</template>

<script>
// @ is an alias to /src
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
  Button
} from 'vant'
export default {
  name: 'vote',
  data () {
    return {
      value: '',
      page: 0,
      list: [
        {
          text: '小程序',
          handed: false
        },
        {
          text: '电商',
          handed: true
        },
        {
          text: 'electron桌面端',
          handed: true
        },
        {
          text: '前端与移动开发  基础班',
          handed: false
        }
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
    [Button.name]: Button,
    'it-footer': Footer
  },
  mounted () {
  },
  methods: {
    onSearch () {
      this.page = 0
      this._getList()
    },
    _getList () {
      this.loading = true
      getList({ text: this.value }).then((res) => {
        this.loading = false
        if (res.code === 200) {
          console.log('TCL: _getList -> res', res)
        }
      })
    },
    onLoad () {
      // 异步更新数据
      // setTimeout(() => {
      //   for (let i = 0; i < 10; i++) {
      //     this.list.push(this.list.length + 1)
      //   }
      //   // 加载状态结束
      //   this.loading = false

      //   // 数据全部加载完成
      //   if (this.list.length >= 40) {
      //     this.finished = true
      //   }
      // }, 500)
    }
  }
}
</script>
