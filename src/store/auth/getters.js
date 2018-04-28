export function isAuthenticated (state) {
  return !!state.token
}

export function loginFailed (state) {
  return state.loginFailed
}
