export function setToken (state, token) {
  state.token = token
  localStorage.setItem('token', token)
}

export function setUsername (state, username) {
  state.username = username
  localStorage.setItem('username', username)
}

export function resetToken (state) {
  state.token = null
  localStorage.removeItem('token')
}

export function resetUsername (state) {
  state.username = ''
  localStorage.removeItem('username')
}

export function setLoginFailedMsg (state) {
  state.loginFailed = true
}

export function resetLoginFailedMsg (state) {
  state.loginFailed = false
}
