import axios from '@/utils/axios'
import qs from 'qs'

const getList = (data) => axios.get('/public/list?' + qs.stringify(data))

export {
  getList
}
