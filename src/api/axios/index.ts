import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { ElMessage } from 'element-plus'
import showCodeMessage from './code'

// 创建实例
const service: AxiosInstance = axios.create({
  // 前缀
  baseURL: window.SITE_CONFIG.movieConfig.apiBase,
  // 超时
  timeout: 1000 * 60 * 30,
  // 请求头
  headers: {
    'Content-Type': 'application/json',
  },
})

// 请求拦截器
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // TODO 在这里可以加上想要在请求发送前处理的逻辑
    // TODO 比如 loading 等
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status === 200) {
      return response
    }
    return response
  },
  (error: AxiosError) => {
    const { response } = error
    if (response) {
      ElMessage.error(showCodeMessage(response.status))
      return Promise.reject(response.data)
    }
    ElMessage.warning('网络连接异常,请稍后再试!')
    return Promise.reject(error)
  },
)

export default service
