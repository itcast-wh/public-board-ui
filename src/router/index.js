import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

const List = () => import(/* webpackChunkName: 'list' */ '../views/List.vue')
const Vote = () => import(/* webpackChunkName: 'vote' */ '../views/Vote.vue')
const Login = () => import(/* webpackChunkName: 'login' */ '../views/Login.vue')
const Reg = () => import(/* webpackChunkName: 'reg' */ '../views/Reg.vue')
const Detail = () => import(/* webpackChunkName: 'detail' */ '../views/Detail.vue')
const User = () => import(/* webpackChunkName: 'user' */ '../views/User.vue')
const Settings = () => import(/* webpackChunkName: 'settings' */ '../views/Settings.vue')
const Reply = () => import(/* webpackChunkName: 'reply' */ '../components/Reply.vue')
const NoFound = () => import(/* webpackChunkName: '404' */ '../components/404.vue')
const Add = () => import(/* webpackChunkName: 'add' */ '../views/Add.vue')

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
    path: '/add',
    name: 'add',
    component: Add
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
    props: true,
    component: Reply
  },
  {
    path: '*',
    name: '404',
    component: NoFound
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (typeof store.state.user.name === 'undefined') {
    const user = localStorage.getItem('it-user')
    const token = localStorage.getItem('it-token')
    if (user && token) {
      store.commit('setToken', token)
      store.commit('setUser', JSON.parse(user))
      store.commit('setLogin', true)
    }
  }
  next()
})

export default router
