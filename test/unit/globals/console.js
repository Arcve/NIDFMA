/* eslint-disable */
import sinon from 'sinon'
import chai from 'chai'
import sinonChai from 'sinon-chai'

chai.use(sinonChai)

beforeEach(function () {
  if (console.error.restore) {
    console.error.restore()
  }

  if (console.warn.restore) {
    console.warn.restore()
  }
  sinon.spy(console, 'warn')
  sinon.spy(console, 'error')
})

afterEach(function () {
  expect(console.error, `console.error() has been called ${console.error.callCount} times.`).not.be.called
})  
