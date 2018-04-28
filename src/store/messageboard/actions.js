import axios from 'axios'

export async function deleteComment ({commit, state}, index) {
  let username = localStorage.getItem('username')
  let { success } = await axios.delete(`user/${username}/comments/${index}`).then(res => res.data)
  if (success) {
    commit('deleteCommment', index)
  }
  return success
}

export async function submitComment ({commit, state}, {id, content}) {
  let username = localStorage.getItem('username')
  let { success } = await axios.post(`user/${id}/comments`, {username, content}).then(res => res.data)
  if (success) {
    commit('submitComment', content)
  }
  return success
}

// export async function agreeComment ({commit, state}, index) {
//   let success = await axios.put(`user/${state.username}/comments/${index}`)
//   if (success) {
//     commit('agreeComment', index)
//   } else {
//     commit('showErrMsg', 'update')
//   }
// }

export async function getComments ({commit}, id) {
  let {success, comments} = await axios.get(`user/${id}/comments`).then(res => res.data)
  if (success) {
    commit('setComments', comments)
  }
}
