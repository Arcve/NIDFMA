import Vue from 'vue'
import Vuex from 'vuex'
import createAuthModule from './auth'
import createMessageBoardModule from './messageboard'
export const STORE_ID = Symbol('store')

export function createStore (VueInstance = Vue) {
  VueInstance.use(Vuex)
  return new Vuex.Store({
    namespace: true,
    modules: {
      auth: createAuthModule(),
      messageBoard: createMessageBoardModule()
    }
  })
}
