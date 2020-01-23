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
      <van-row v-for="(item, index) in list" :key="'cell' + index" type="flex" align="center">
        <van-col span="3" v-show="index < 10" class="text-center">
          <span
            :class="index < 3 ? 'color-' + (index + 1): 'color-gray'"
          >{{('0' + (index + 1)).substr(-2)}}</span>
        </van-col>
        <van-col span="3" v-show="index >=10" class="text-center"></van-col>
        <van-col span="21" class="pad">
          <van-cell
            :title="item.text"
            :label="'点赞次数 ' + item.hands"
            is-link
            center
            :to="{name: 'detail', params: {id: item.id ? item.id : 0}}"
          ></van-cell>
        </van-col>
      </van-row>
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
  name: 'list',
  data () {
    return {
      value: '',
      page: 0,
      list: [
        {
          text: '小程序',
          hands: 12032
        },
        {
          text: '电商',
          hands: 11023
        },
        {
          text: 'electron桌面端',
          hands: 10023
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        },
        {
          text: '前端与移动开发  基础班',
          hands: 9923
        }
      ],
      loading: false,
      finished: true
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
    this._getList()
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

<style lang="scss">
.pad {
  .van-cell {
    padding-left: 5px !important;
  }
}
</style>
