/**
 * 请求失败后的错误统一处理
 * @param {Number} status 请求失败的状态码
 */
// import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

const errorHandle = (errorInfo) => {
  // const { statusText, status, request: { responseURL } } = errorInfo
  // let info = {
  //   type: 'ajax',
  //   code: status,
  //   mes: statusText,
  //   url: responseURL
  // }
  // console.log('TCL: errorHandle -> info', info)
  // 处理用户错误日志
  // if (!responseURL.includes('save_error_logger')) {
  //   // store.dispatch('addErrorLog', info)
  // }
  if (errorInfo.status === 401) {
    Toast('用户登录已失效或未登录！')
    router.push({ name: 'login' })
  }
}

export default errorHandle
