import axios from 'axios'
import { Register } from '@/di'

export const AUTH_SERVICE_ID = Symbol('authService')

@Register(AUTH_SERVICE_ID)
export default class AuthService {
  // constructor () {}
  login (username, pwd) {
    return axios.post('api/login', {username, pwd}).then(res => res.data)
  }

  logout () {
    return axios.post('api/logout').then(res => res.data)
  }
}
