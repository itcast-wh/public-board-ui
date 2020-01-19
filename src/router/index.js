import Vue from 'vue'
import VueRouter from 'vue-router'

const List = () => import(/* webpackChunkName: 'list' */ '../views/List.vue')
const Vote = () => import(/* webpackChunkName: 'vote' */ '../views/Vote.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: List
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote
  }
]

const router = new VueRouter({
  routes
})

export default router
