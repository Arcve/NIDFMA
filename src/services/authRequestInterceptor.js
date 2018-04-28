import container from '@/di'
import {STORE_ID} from '@/store'

export default function authRequestInterceptor (config) {
  let store = container.get(STORE_ID)
  if (store.state.auth.token) {
    config.headers.Authorization = `TOKEN: ${store.state.auth.token}`
  }
  return config
}
