import { useUserStoreHook } from '@/store/modules/user'

/** 全局权限判断函数，和指令 v-permission 功能类似 */
export const checkPermission = (permissionRoles: string[]): boolean => {
  if (permissionRoles && permissionRoles instanceof Array && permissionRoles.length > 0) {
    const roles = useUserStoreHook().roles
    return roles.some(role => permissionRoles.includes(role))
  } else {
    console.error("need roles! Like v-permission=\"['admin','editor']\"")
    return false
  }
}