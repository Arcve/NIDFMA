import BasePageObj from './Base.po'
export default class MessageBoardViewPageObj extends BasePageObj {
  get commentInput () {
    return this.tid('commentInput')
  }
  get commentSubmitBtn () {
    return this.tid('commentSubmitBtn')
  }

  get deleteDialog () {
    return this.tid('deleteDialog')
  }

  get cancelDelete () {
    return this.tid('cancelDelete')
  }

  get confirmDelete () {
    return this.tid('confirmDelete')
  }

  get commentWarnMsg () {
    return '评论字数为3-10个字'
  }
  get commentSuccMsg () {
    return '评论成功'
  }
  get commentFailMsg () {
    return '评论失败'
  }
  get contentHasBeenDeleted () {
    return '此评论已被删除'
  }
  get deleteSuccMsg () {
    return '删除成功'
  }
  get deleteFailMsg () {
    return '删除失败'
  }

  get commentForm () {
    return this.tid('commentForm')
  }
  get loginBtn () {
    return this.tid('loginBtn')
  }
  login () {
    this.loginBtn.trigger('click')
  }

  getCommentDeleteBtnIndex (index) {
    return this.tid(`commentDeleteBtn${index}`)
  }

  getCommentIndex (index) {
    return this.tid(`comment${index}`)
  }

  findCommentsByName (name) {
    return this.tids(`commenter${name}`)
  }
  submitComment (content) {
    this.commentInput.element.value = content
    this.commentInput.trigger('input')
    this.commentSubmitBtn.trigger('click')
  }
}
