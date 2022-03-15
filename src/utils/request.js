import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import { transform } from 'lodash'

const request = axios.create({
  baseURL: 'http://localhost:8000',
  // baseURL: "http://toutiao.itheima.net",
  transformResponse: [data => {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }],
})

request.interceptors.request.use(function (config) {
  // 请求发起会经过这里
  // config：本次请求的请求配置对象
  const { user } = store.state
  if (user && user.token) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // 注意：这里务必要返回 config 配置对象，否则请求就停在这里出不去了
  return config
}, function (error) {
  // 如果请求出错了（还没有发出去）会进入这里
  return Promise.reject(error)
})



export default request
