
export function deleteCommment (state, index) {
  state.comments[index].content = '此评论已被删除'
  state.comments[index].isDelete = true
}

export function submitComment (state, content) {
  let time = (new Date()).toUTCString()
  let user = localStorage.getItem('username')
  state.comments.push({
    user,
    time,
    isDelete: false,
    content
  })
}

export function setComments (state, comments) {
  state.comments = comments
}
