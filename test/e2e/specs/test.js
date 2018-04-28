module.exports = {
  'Index->login->logout': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    // const devServer = browser.globals.devServerURL
    const username = 'wj'
    const pwd = '1234'
    browser
      .fromIndexToLogin(username, pwd)
      .end()
  }
}
