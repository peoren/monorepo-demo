<template>
  <el-config-provider :locale="locale">
    <router-view />
  </el-config-provider>
</template>

<script lang="ts" setup>
import zhCn from 'element-plus/lib/locale/lang/zh-cn'
import '/mock/index'
// import { loginApi } from '@/api/user-service-api'
defineOptions({
  name: 'App'
})

/** 将 Element Plus 的语言设置为中文 */
const locale = zhCn

//mock
// const login = () => {
//   return new Promise(resolve => {
//     const params = {
//       username: 'admin',
//       password: '123'
//     }
//     loginApi(params).then(res => {
//       console.log(res)
//       resolve(res)
//     })
//   })
// }

onMounted(() => {
  // login()
})
</script>
