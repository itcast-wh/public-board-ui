<template>
  <div>
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" :to="{name: 'home'}">榜单</van-tabbar-item>
      <van-tabbar-item icon="bar-chart-o" dot to="/vote">投票</van-tabbar-item>
      <!-- <van-tabbar-item icon="friends-o" info="5">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" info="20">标签</van-tabbar-item>-->
    </van-tabbar>
  </div>
</template>

<script>
import {
  Tabbar,
  TabbarItem
} from 'vant'
export default {
  name: 'Footer',
  components: {
    [Tabbar.name]: Tabbar,
    [TabbarItem.name]: TabbarItem
  }
}
</script>

<style lang="scss" scoped>
</style>
