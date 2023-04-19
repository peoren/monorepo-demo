import request from '@/utils/request'

/** 用户管理模块 **/
const baseUrl = '/user-service'

/** 登录并返回 Token */
export interface ILoginRequestData {
  username: string // 账号
  password: string // 密码
}
type LoginResponseData = IApiResponseData<{ token: string }>
export const loginApi = (data: ILoginRequestData): Promise<LoginResponseData> => request.post(`${baseUrl}/login`, data)

/** 获取用户详情 */
type UserInfoResponseData = IApiResponseData<{ username: string; roles: string[] }>
export const getUserInfoApi = (): Promise<UserInfoResponseData> => request.get(`${baseUrl}/info`)
