/* eslint-disable no-console */
import store from '@/store'
import axios from 'axios'
import errorHandle from './errorHandle'
import publicConfig from '@/config'
const CancelToken = axios.CancelToken

const pending = {}
const baseUrl = process.env.NODE_ENV === 'development' ? publicConfig.baseUrl.dev : publicConfig.baseUrl.pro

const removePending = (key, isRequest = false) => {
  if (pending[key] && isRequest) {
    pending[key]('取消重复请求')
  }
  delete pending[key]
}

const instance = axios.create({
  baseURL: baseUrl,
  timeout: 10000
})

instance.interceptors.request.use((config) => {
  // Do something before request is sent
  let isPublic = false
  publicConfig.publicPath.map((path) => {
    isPublic = isPublic || path.test(config.url)
  })
  const token = store.state.token
  if (!isPublic && token) {
    config.headers.Authorization = 'Bearer ' + token
  }
  let key = config.url + '&' + config.method
  removePending(key, true)
  config.cancelToken = new CancelToken((c) => {
    pending[key] = c
  })
  return config
})

// 响应拦截器
instance.interceptors.response.use(
  res => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    const key = res.config.url + '&' + res.config.method
    removePending(key)
    if (res.status === 200) {
      // 设置未授权的信息
      if (res.data.code === 401) {
        localStorage.removeItem('token')
        store.commit('SET_TOKEN', '')
      }
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    const { response } = error
    if (response) {
      errorHandle(response)
      return Promise.reject(response)
    } else {
      if (!window.navigator.onLine) {
        console.log('Your network is offline')
      } else {
        return Promise.reject(error)
      }
    }
  }
)

export default instance
