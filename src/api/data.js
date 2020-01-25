import axios from '@/utils/axios'
import qs from 'qs'
import store from '@/store'

// 获取投票列表
const getList = (data) => {
  const headers = store.state.token === '' ? null : {
    'Authorization': 'Bearer ' + store.state.token
  }
  return axios.get('/public/list?' + qs.stringify(data), {
    headers
  })
}

// 添加投票
const addVote = (data) => axios.post('/content/add', data)

// 获取投票详情
const getDetail = (data) => {
  const headers = store.state.token === '' ? null : {
    'Authorization': 'Bearer ' + store.state.token
  }
  return axios.get('/public/detail?' + qs.stringify(data), {
    headers
  })
}

// 获取评论列表
const getComments = (data) => {
  const headers = store.state.token === '' ? null : {
    'Authorization': 'Bearer ' + store.state.token
  }
  return axios.get('/public/comments?' + qs.stringify(data), {
    headers
  })
}

// 添加评论列表
const addComments = (data) => axios.post('/content/add-comments', data)

// 文章点赞
const handsVote = (data) => axios.get('/content/vote-like?' + qs.stringify(data))

// 评论点赞
const handsComment = (data) => axios.get('/content/comment-like?' + qs.stringify(data))

export {
  getList,
  addVote,
  getDetail,
  getComments,
  addComments,
  handsVote,
  handsComment
}
