import axios, { AxiosInstance, AxiosResponse } from 'axios'
import { ElMessage } from 'element-plus'
import { RequestConfigType, ResponseType } from './types'

console.log('process.env.VUE_APP_API_BASE_URL', process.env.VUE_APP_API_BASE_URL)
// 创建axios实例
const instance: AxiosInstance = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL,
  timeout: 120 * 1000, // 超时
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求错误处理
const onError = (error: any) => {
  if (error.message.includes('timeout')) {
    ElMessage({
      message: 'request timeout',
      type: 'error'
    })
  }
  return error
}

// 请求拦截
instance.interceptors.request.use((config: any) => {
  return {
    ...config
  }
}, onError)

// 响应拦截
instance.interceptors.response.use((response: AxiosResponse) => {
  if (response && response.data) {
    return Promise.resolve(response)
  }
  return Promise.reject(new Error('response error'))
}, onError)

const request = async <T>(config: RequestConfigType): Promise<ResponseType<T>> => {
  try {
    const { data } = await instance.request<ResponseType<T>>(config)
    if (data.code === 0) {
      if (config.successToast) {
        ElMessage({
          message: data.msg || 'success',
          type: 'success'
        })
      }
      return data
    }
    if (config.errorToast) {
      ElMessage({
        message: data.msg,
        type: 'info'
      })
    }
    return data
  } catch (err: any) {
    return {
      code: -1,
      msg: err.message || 'request error',
      data: null as any
    }
  }
}

/**
 *
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const getRequest = <T>(
  url: string,
  params: object = {},
  successToast = false,
  errorToast = true
): Promise<ResponseType<T>> => {
  return request<T>({
    url,
    method: 'get',
    params,
    successToast,
    errorToast
  })
}

/**
 *  post接口默认提示成功和失败
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const postRequest = <T>(
  url: string,
  params: object,
  successToast = false,
  errorToast = true,
  headers = {}
): Promise<ResponseType<T>> => {
  return request<T>({
    url,
    method: 'post',
    data: params,
    headers: headers || {},
    successToast,
    errorToast
  })
}

/**
 *  post商城接口默认提示成功和失败，统一添加lang,access_token
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const postRequestMall = <T>(
  url: string,
  params: any,
  successToast = false,
  errorToast = true,
  headers = {}
): Promise<ResponseType<T>> => {
  return request<T>({
    url,
    method: 'post',
    data: {
      data: params,
      access_token: localStorage.getItem('accessToken') || ''
    },
    headers: headers || {},
    successToast,
    errorToast
  })
}

/**
 *  post接口默认提示成功和失败
 * @param url
 * @param params
 * @param successToast
 * @param errorToast
 */
export const deleteRequest = <T>(
  url: string,
  params: object = {},
  successToast = true,
  errorToast = true
): Promise<ResponseType<T>> => {
  return request<T>({
    url,
    method: 'delete',
    data: params,
    successToast,
    errorToast
  })
}
