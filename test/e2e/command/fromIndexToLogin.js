exports.command = function (username, pwd) {
  var browser = this.page.etime()
  browser
    .navigate()
    .waitForElementVisible('@loginBtn', 5000)
    .click('@loginBtn')
    .waitForElementVisible('@usernameInput', 5000)
    .waitForElementVisible('@pwdInput', 5000)
    .waitForElementVisible('@submitBtn', 5000)
    .setValue('@usernameInput', username)
    .setValue('@pwdInput', pwd)
    .assert.elementPresent('@submitBtn')
    .click('@submitBtn')
    .assert.elementPresent('#app')
    .waitForElementVisible('@username', 5000)
    .assert.hidden('@logoutBtn')
    .click('@username')
    .waitForElementVisible('@logoutBtn', 5000)
    .assert.visible('@logoutBtn')
    .click('@logoutBtn')
  return this
}
