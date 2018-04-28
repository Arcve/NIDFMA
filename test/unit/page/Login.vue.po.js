import BasePageObj from './Base.po'
export default class LoginViewPageObj extends BasePageObj {
  get form () {
    return this.tid('login_form')
  }
  get usernameInput () {
    return this.tid('login_username')
  }
  get pwdInput () {
    return this.tid('login_pwd')
  }

  get submitBtn () {
    return this.tid('login_submit')
  }

  get loginUsernameMsg () {
    return this.tid('login_username_msg')
  }

  get loginPwdMsg () {
    return this.tid('login_pwd_msg')
  }
  get loginFailedMsg () {
    return this.tid('login_failed_msg')
  }
  get validateMsg () {
    return this.wrapper.find('.el-form-item__error').element.value
  }
  submit () {
    this.submitBtn.trigger('click')
  }

  login (username, pwd) {
    this.usernameInput.element.value = username
    this.usernameInput.trigger('input')

    this.pwdInput.element.value = pwd
    this.pwdInput.trigger('input')
    this.submit()
  }
}
