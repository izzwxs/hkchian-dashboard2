import axios from 'axios'
import { Message } from 'element-ui'

const instance = axios.create({
  baseURL: 'https://dcd.huxleymedical.tech/dj/api/v1.0',
  // baseURL: process.env.VUE_APP_HTTP_URL,
  timeout: 60000
})

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  if (response.status === 200) {
    return response.data
  }
  // 对响应数据做点什么
  return response
}, function (error) {
  console.log(error.msg)
  // 对响应错误做点什么
  Message.error('请求错误，请联系管理员！' + error.message)
  return Promise.reject(error)
})

export const get = (url, config) => instance.get(url, config)
