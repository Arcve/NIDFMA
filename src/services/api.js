import axios from 'axios'
import authRequestInterceptor from './authRequestInterceptor'
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ac4b82bbeea0b6835761c1e/engrave-time'
axios.interceptors.request.use(authRequestInterceptor)
