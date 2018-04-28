import container from '@/di'
import { AUTH_SERVICE_ID } from '@/services/auth'
import {ROUTER_ID} from '@/router'
export async function login ({commit}, {username, pwd}) {
  let authSerive = container.get(AUTH_SERVICE_ID)
  let {token, success} = await authSerive.login(username, pwd)
  if (success) {
    commit('setToken', token)
    commit('setUsername', username)
    commit('resetLoginFailedMsg')
    let router = container.get(ROUTER_ID)
    router.push({path: '/'})
  } else {
    commit('setLoginFailedMsg')
  }
}

export async function logout ({commit}) {
  let authSerive = container.get(AUTH_SERVICE_ID)
  await authSerive.logout().finally(() => {
    commit('resetToken')
    commit('resetUsername')
    let router = container.get(ROUTER_ID)
    router.push({path: '/'})
  })
}
