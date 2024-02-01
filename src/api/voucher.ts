import { postRequestMall } from './request/request'

// 获取代金券列表
export const apiGetVoucherList = (params?: any) => postRequestMall('benefit/receiveList', params)

// 领取优惠券
export const apiGetVoucher = (params?: any) => postRequestMall('benefit/receive', params)

// 获取可用的代金券
export const apiGetUseVoucherList = (params?: any) => postRequestMall('benefit/useList', params)

// 获取banner 图
export const apiGetBanner = (params?: any) => postRequestMall('game/role/getBanner', params)
