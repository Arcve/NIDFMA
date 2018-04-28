import axios from 'axios'
import { Register } from '@/di'

export const USER_ID = Symbol('userId')

@Register(USER_ID)
export default class User {
  getUserInfo (id) {
    return axios.get(`user/${id}`).then(res => res.data)
  }
}
