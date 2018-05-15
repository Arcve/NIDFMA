import container from '@/di'
import { AUTH_SERVICE_ID } from '@/services/auth'

export async function login ({commit}, {username, pwd}) {
  let authSerive = container.get(AUTH_SERVICE_ID)
  let token = await authSerive.login(username, pwd)

  commit('setToken', token)
  commit('setUsername', token ? username : null)
}

export async function logout ({commit}) {
  let authSerive = container.get(AUTH_SERVICE_ID)
  await authSerive.logout().finally(() => {
    commit('resetToken')
    commit('resetUsername')
  })
}
