/* eslint-disable */
import '@/bootstrap'
import '../globals'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import flushPromises from 'flush-promises'
import {mount, createLocalVue} from '@vue/test-utils'
import LoginViewPageObj from '../page/Login.vue.po'
import container, {GLOBAL_ID} from '@/di'
import { createStore, STORE_ID } from '@/store'
import { createRouter, ROUTER_ID} from '@/router'
import sinon from 'sinon'
import { expect } from 'chai'
import LoginView from '@/views/Login'
import ElementUI from 'element-ui'


describe('Login.vue test', () => {
  beforeEach( function () {
    this.axios = new AxiosMockAdapter(axios)
    this.localVue = createLocalVue()

    this.localVue.use(ElementUI)

    this.store = createStore(this.localVue)
    container.bind(STORE_ID).toConstantValue(this.store)

    this.router = createRouter(this.localVue)
    container.bind(ROUTER_ID).toConstantValue(this.router)

    this.mountLoginView = function (options) {
      let wrapper = mount(LoginView, {localVue: this.localVue, store: this.store, router: this.router,...options })
      return new LoginViewPageObj(wrapper)
    }

    this.router.push({name: 'login'})
    return flushPromises()
  })

  afterEach(function () {
    this.axios.restore()
  })

  it('should enter route', function () {
    expect(this.router.currentRoute.name).to.equal('login')
  })
  it('should mount without any errors', function () {
    this.mountLoginView()
    expect(console.error).not.to.have.been.called
  })

  // it('should render ElementUI properly', function () {

  // })

  describe('should render properly', function () {
    beforeEach(function(){
      this.loginView = this.mountLoginView()
    })
    
    it('should show submitButton', function () {
      expect(this.loginView.submitBtn.isVisible(), 'submitBtn is isVisible').to.be.true
    })
    
    it("shouldn't show loginFailedMsg", function () {
      expect(this.loginView.loginFailedMsg.isVisible(), 'loginFailedMsg do not exist').to.be.false
    })

    it('username and pwd Input should be empty', function () {
      expect(this.loginView.usernameInput.element.value, 'username should be initialized with empty value').to.equal('')
      expect(this.loginView.pwdInput.element.value, 'pwd should be initialized with empty value').to.equal('')
    })
  })

  describe('when user enter login in router', function(){
    describe("and when user has already logined", function () {
      beforeEach(function(){
        this.store.commit('setToken', 'random_token')
        this.store.commit('setUsername', 'wj')
      })

      afterEach(function(){
        this.store.commit('resetToken')
        this.store.commit('resetUsername')
      })
      it("should go to Index Page", function () {
        
        this.mountLoginView()
        this.router.push({path:'login'})
        return flushPromises()
        expect(this.router.currentRoute.name).to.equal('/')
      })
    })

    describe("and when user hasn't logined", function () {
      it("should go to Login Page", function () {
        this.mountLoginView()
        this.router.push({path:'login'})
        return flushPromises()
        expect(this.router.currentRoute.name).to.equal('login')
      })
    })
  })

  describe("and when user does't input username", function () {
    it('should show msg: username is required', async function(){
      let loginView = this.mountLoginView()
      loginView.login('', 'pwd')
      await flushPromises()
      expect(console.warn).to.be.calledWith('async-validator:', ['username is required'])
      // expect(loginView.vm.$refs.validateUsername.validateMessage).to.equal("请输入用户名")
    })
  })

  // describe("when username or pwd is invaild ", f)
  describe("and when user does't input pwd" , function (){
    it('should show msg: pwd is required', async function () {
      let loginView = this.mountLoginView()
      loginView.login('user', '')
      await flushPromises()
      expect(console.warn).to.be.calledWith('async-validator:', ['pwd is required'])
      // expect(loginView.vm.$refs.validatePwd.validateMessage).to.equal("请输入密码")
    })
  })
  
  describe("and when user input both username and pwd", function(){
    beforeEach(function(){
      this.loginView = this.mountLoginView()
    })
    it('pwd input should be masked', function () {
      expect(this.loginView.pwdInput.attributes().type).to.equal('password')
    })

    describe('and when username and pwd are vaild', function(){
      describe('and when login success', function(){
        beforeEach(function () {
          let username = 'wj'
          let pwd = '1234'

          this.axios.onPost('api/login', {username, pwd}).replyOnce(200, 'random_token')
          this.router.push = this.routerPushStub = sinon.stub();

          this.loginView.login(username, pwd)
          return flushPromises()
        })

        afterEach(function(){
          this.store.commit('resetToken')
          this.store.commit('resetUsername')
        })
        it('shoule show no login fail msg', function () {
          expect(this.loginView.loginFailedMsg.isVisible()).to.be.false
        })
          
        it('should take user to Index Page', function (){
          expect(this.routerPushStub).calledWith({path:'/'})
        })
      })

      describe("and when login fail", function () {
        beforeEach(async function(){
          let username = 'testu'
          let pwd = 'testp'
          this.router.push = this.routerPushStub = sinon.stub();
          this.axios.onPost('api/login', {username, pwd}).replyOnce(500, null)
          this.loginView = this.mountLoginView()
          this.loginView.login(username, pwd)
          await flushPromises()  
        })

        afterEach(function(){
          this.axios.reset()
        })
        it('should show login fail msg', function() {
          expect(this.loginView.loginFailedMsg.isVisible()).to.be.true
        })

        it("shouldn't change router", function(){
          expect(this.routerPushStub).not.to.be.called
        })
      })
      
    })})


    describe("and when username and pwd are not empty", function(){
      describe("and when username are invaild", function(){
        it("shoule show msg: username must be vaild", async function (){
          let loginView = this.mountLoginView()
          loginView.login('Github', 'pwd')
          await flushPromises()
          expect(console.warn).to.be.calledWith('async-validator:', ['username must be between 2 and 5 characters'])
          // expect(loginView.vm.$refs.validateUsername.validateMessage).to.equal("长度在 2 到 5 个字符")
        })
      })
     
      describe("and when pwd are invaild", function () {
        it("shoule show msg: pwd must be vaild ", async function(){
          let loginView = this.mountLoginView()
          loginView.login('Gith', 'Github')
          await flushPromises()
          expect(console.warn).to.be.calledWith('async-validator:', ['pwd must be between 3 and 5 characters'])
          // expect(loginView.vm.$refs.validatePwd.validateMessage).to.equal("长度在 3 到 5 个字符")
        })
      })  
    })
})
