/* eslint-disable */
import '@/bootstrap'
import '../globals'
import AxiosMockAdapter from 'axios-mock-adapter'
import axios from 'axios'
import flushPromises from 'flush-promises'
import {mount, createLocalVue} from '@vue/test-utils'
import container, {GLOBAL_ID} from '@/di'
import { createStore, STORE_ID } from '@/store'
import { createRouter, ROUTER_ID} from '@/router'
import sinon from 'sinon'
import { expect } from 'chai'
import HeaderView from '@/views/common/Header'
import ElementUI from 'element-ui'

describe('Header.vue test', function(){
  beforeEach(function () {
    this.axios = new AxiosMockAdapter(axios)
    this.localVue = createLocalVue()
    this.localVue.use(ElementUI)
    this.store = createStore(this.localVue)
    container.bind(STORE_ID).toConstantValue(this.store)
    this.router = createRouter(this.localVue)
    container.bind(ROUTER_ID).toConstantValue(this.router)
    
    this.wrapper = mount(HeaderView, {localVue: this.localVue, store: this.store, router: this.router})

    return flushPromises()
  })

  afterEach(function(){
    this.axios.restore()
  })
  describe("when user has logined", function () {
    beforeEach(function(){
      this.username = 'wj'
      this.store.commit('setToken', 'random_token')
      this.store.commit('setUsername', this.username)
      this.logInOrOut = this.wrapper.find('[tid="loginInOrOut"]')
    })
    
    it('should show username', function () {
      expect(this.logInOrOut.html()).to.contain(this.username)
    })
    describe('when click  username', function (){
      it('should show logout button', function () {
        this.logInOrOut.trigger('click')
        this.logout = this.wrapper.find('[tid="logout"]')
        expect(logout.isVisible()).to.be.true

        describe('when click logout', function () {
          beforeEach(function(){
            this.logout.trigger('click')
            return flushPromises()
          })
          it('should logout',function(){
            this.axios.onPost('api/logout').replyOnce(200, {} )
            expect(this.store.auth.token).to.be.null
          })
  
          it('and go to Index', function(){
            expect(this.routerPushStub).calledWith({path:'/'})
          })
        })
      })
    })
    
  })

  describe("when user do not login", function () {

  })
})