import axios from 'axios'
import { getToken } from '@/util/token'

axios.interceptors.request.use(
  config => {
    const token = getToken()
    if (token) {
      // Bearer是JWT的认证头部信息
      config.headers.common['Authorization'] = 'Bearer ' + token
    }
    return config
  },
  error => Promise.reject(error)
)

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error)
)

export default axios
