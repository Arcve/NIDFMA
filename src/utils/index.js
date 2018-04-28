import axios from 'axios'
// import store from '../store'
axios.defaults.baseURL = 'https://www.easy-mock.com/mock/5ac4b82bbeea0b6835761c1e/engrave-time'

// axios.interceptors.request.use(config => {
//   if (store.state.token) {
//     config.headers.Authorization = store.state.token
//   }
//   return config
// }, err => {
//   return Promise.reject(err)
// })

// axios.interceptors.response.use(config => {
//   return config
// }, err => {
//   // if (err.response) {
//   //   switch (err.response.status) {
//   //     case 401:
//   //       store.commit('LOGOUT')
//   //   }
//   // }
//   return Promise.reject(err)
// })
export default {
  verifyLogin (data) {
    return axios.post('/login', data).then(res => res.data)
  }
}
