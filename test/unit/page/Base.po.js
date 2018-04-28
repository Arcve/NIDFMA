export default class BasePageObj {
  constructor (wrapper) {
    if (!wrapper) {
      throw new Error('wrapper is not exist')
    }
    this.wrapper = wrapper
  }
  get vm () {
    return this.wrapper.vm
  }

  exists () {
    return this.wrapper.exists()
  }

  isVisible () {
    return this.wrapper.isVisible()
  }

  text () {
    return this.wrapper.text()
  }

  attributes () {
    return this.wrapper.attributes()
  }

  destroy () {
    return this.wrapper.destroy()
  }
  tid (sel) {
    return this.wrapper.find(`[tid="${sel}"]`)
  }

  tids (sel) {
    return this.wrapper.findAll(`[tid="${sel}"]`)
  }
  trigger (...args) {
    return this.wrapper.trigger(...args)
  }
}
