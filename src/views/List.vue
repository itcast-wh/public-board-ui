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
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getMore()"
      class="pb-5"
    >
      <van-row v-for="(item, index) in list" :key="'cell' + index" type="flex" align="center">
        <van-col span="3" v-show="index < 10" class="text-center">
          <span
            :class="index < 3 ? 'color-' + (index + 1): 'color-gray'"
          >{{('0' + (index + 1)).substr(-2)}}</span>
        </van-col>
        <van-col span="3" v-show="index >=10" class="text-center"></van-col>
        <van-col span="21" class="pad">
          <van-cell
            :title="item.title"
            :label="'点赞次数 ' + item.likes"
            is-link
            center
            :to="{name: 'detail', params: {id: item._id ? item._id : 0, handed: item.handed ? item.handed : 0}}"
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
      limit: 0,
      list: [
        // {
        //   text: '小程序',
        //   likes: 12032
        // },
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
  watch: {
    value (newval, oldval) {
      if (newval.trim() === '') {
        this.page = 0
        this.finished = false
        this._getList()
      }
    }
  },
  mounted () {
    this._getList()
  },
  methods: {
    getMore () {
      if (this.finished) {
        return
      }
      this.page++
      this._getList()
    },
    onSearch () {
      this.page = 0
      this.finished = false
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
          if (this.list.length === 0) {
            this.list = res.data
          } else {
            if (res.data.length < this.limit) {
              this.finished = true
            } else {
              this.list = this.list.concat(res.data)
            }
          }
        }
      }).catch((err) => {
        this.loading = false
        if (err) {

        }
      })
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
