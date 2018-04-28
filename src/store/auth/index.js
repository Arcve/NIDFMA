import * as getters from './getters'
import * as mutations from './mutations'
import * as actions from './actions'

export default function createAuthModule () {
  return {
    namespace: true,
    state: {
      username: '' || localStorage.getItem('username'),
      token: null || localStorage.getItem('token'),
      loginFailed: false
    },
    getters,
    mutations,
    actions
  }
}
