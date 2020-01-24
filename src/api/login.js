import axios from '@/utils/axios'

const getCode = (key) => {
  return axios.get('/public/captcha?sid=' + key)
}

const login = (userInfo) => {
  return axios.post('/public/login', {
    ...userInfo
  })
}

const reg = (userInfo) => {
  return axios.post('/public/reg', {
    ...userInfo
  })
}

export {
  getCode,
  reg,
  login
}
