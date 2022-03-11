import axios from 'axios'
import store from '@/store'
import JSONBig from 'json-bigint'
import { transform } from 'lodash'

const request = axios.create({
  baseURL: 'http://toutiao.itheima.net',
  transformResponse: [data => {
    try {
      return JSONBig.parse(data)
    } catch (err) {
      return data
    }
  }]
})

export default request
