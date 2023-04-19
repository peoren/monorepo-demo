import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { useUserStoreHook } from '@/store/modules/user'
import { ElMessage } from 'element-plus'
import { getToken } from './cache/cookies'

axios.defaults.headers['Content-Type'] = 'application/json'

// `data` 是作为请求主体被发送的数据
// 只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
// 在没有设置 `transformRequest` 时，必须是以下类型之一：
// - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
// - 浏览器专属：FormData, File, Blob
// - Node 专属： Stream
// 解决参考 https://blog.csdn.net/HermitSun/article/details/89889743

// 'responseType' 表示服务器响应的数据类型
// 选项有:'arraybuffer'， 'document'， 'json'， 'text'， 'stream'
// 只支持浏览器: 'blob'

/** 创建一个 Axios 实例 */
const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_BASE_API,
  timeout: 1000 * 30
})

/** 请求拦截 */
service.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 请求携带 token
    if (!config.headers.Authorization) {
      config.headers.Authorization = `${getToken()}`
    }
    // 上传文件取消超时
    if (config.headers['Content-Type'] === 'multipart/form-data') {
      config.timeout = 0
    }
    return config
  },
  // 发送失败
  (error: AxiosError) => Promise.reject(error)
)

/** 响应拦截 */
service.interceptors.response.use(
  (response: AxiosResponse) => {
    // apiData 是 API 返回的数据
    const apiData = response.data
    // 这个 Code 是和后端约定的业务 Code
    const { code, msg: message = '远程调用异常' } = apiData
    // 如果没有 Code, 代表这不是项目后端开发的 API
    if (code === undefined) {
      ElMessage.error('非本系统的接口')
      return Promise.reject(new Error('非本系统的接口'))
    } else {
      switch (code) {
        case '0000':
          return apiData
        default:
          // 不是正确的 Code
          ElMessage.error(message)
          return Promise.reject(new Error(message))
      }
    }
  },
  (error: AxiosError) => {
    // Status 是 HTTP 状态码
    const { status } = error.response as AxiosResponse
    switch (status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        // Token 过期时，直接退出登录并强制刷新页面（会重定向到登录页）
        useUserStoreHook().logout()
        location.reload()
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求地址出错'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP 版本不受支持'
        break
      default:
        break
    }
    ElMessage.error(error.message)
    return Promise.reject(error)
  }
)

export default service
