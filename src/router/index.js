import Vue from 'vue'
import VueRouter from 'vue-router'

const List = () => import(/* webpackChunkName: 'list' */ '../views/List.vue')
const Vote = () => import(/* webpackChunkName: 'vote' */ '../views/Vote.vue')
const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '../views/Detail.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '../views/Settings.vue')
const Reply = () => import(/* webpackChunkName: 'reply' */ '../components/Reply.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'list',
    component: List
  },
  {
    path: '/vote',
    name: 'vote',
    component: Vote
  },
  {
    path: '/login',
    name: 'login',
    component: Login
  },
  {
    path: '/reg',
    name: 'reg',
    component: Reg
  },
  {
    path: '/detail/:id',
    name: 'detail',
    props: true,
    component: Detail
  },
  {
    path: '/user/',
    name: 'user',
    component: User
  },
  {
    path: '/settings/',
    name: 'settings',
    component: Settings
  },
  {
    path: '/reply/',
    name: 'reply',
    component: Reply
  }
]

const router = new VueRouter({
  routes
})

export default router
