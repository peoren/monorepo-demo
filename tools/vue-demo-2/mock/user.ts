// import mock from 'mockjs'
import { MockMethod, Recordable } from 'vite-plugin-mock'
interface OPT {
  url: Recordable
  body: Recordable
  query: Recordable
  headers: Recordable
}
const API = '/api'
type Tokens = {
  [key: string]: {
    token: string
  }
}
const tokens: Tokens = {
  admin: {
    token: 'admin-token'
  },
  editor: {
    token: 'editor-token'
  }
}
type Users = {
  [key: string]: {
    roles: string[]
    introduction: string
    avatar: string
    name: string
  }
}
const users: Users = {
  'admin-token': {
    roles: ['admin'],
    introduction: 'I am a super administrator',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Super Admin'
  },
  'editor-token': {
    roles: ['editor'],
    introduction: 'I am an editor',
    avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
    name: 'Normal Editor'
  }
}
export default [
  {
    url: `${API}/user-service/login`,
    method: 'post',
    response: (opt: OPT) => {
      const { username } = opt.body
      const token = tokens[username as keyof Tokens]
      // mock error
      if (!token) {
        return {
          code: 60204,
          message: 'Account and password are incorrect.'
        }
      }
      // 判断过程
      return {
        code: '0000',
        data: token
      }
    }
  },
  // get user info
  {
    url: `${API}/user-service/info`,
    method: 'get',
    response: (opt: OPT) => {
      const { token } = opt.query
      const info = users[token]
      // mock error
      if (!info) {
        return {
          code: 50008,
          message: 'Login failed, unable to get user details.'
        }
      }

      return {
        code: '0000',
        data: info
      }
    }
  }
  //
  // // user logout
  // {
  //   url: '/vue-admin-template/user/logout',
  //   method: 'post',
  //   response: _ => {
  //     return {
  //       code: 0o000,
  //       data: 'success'
  //     }
  //   }
  // }
] as MockMethod[]
