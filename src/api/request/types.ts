import { AxiosRequestConfig } from 'axios'

// 分页
export interface MetaPaginationType {
  limit: number
  page_no: number
  page_total: number
  total: number
}

export interface MetaType {
  pagination?: MetaPaginationType
}

// 接口返回数据接口类型
export interface ResponseType<T> {
  code: number
  status?: number
  msg: string
  data: T
  meta?: MetaType
}

// 扩展请求参数接口
export interface RequestConfigType extends AxiosRequestConfig {
  successToast?: boolean
  errorToast?: boolean
}
