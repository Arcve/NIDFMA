import Vue from 'vue'
import VueRouter from 'vue-router'
import container from '@/di'
import { STORE_ID } from '@/store'

const Login = () => import('@/views/Login')
const Index = () => import('@/views/Index')
const NotFound = () => import('@/views/NotFound')
const ProblemSet = () => import('@/views/ProblemSet')
const User = () => import('../views/User')
const Explore = () => import('../views/Explore')
const Home = () => import('../views/Home')
const Comments = () => import('../views/MessageBoard')
export const ROUTER_ID = Symbol('router')

export function createRouter (VueInstance = Vue, store = container.get(STORE_ID)) {
  VueInstance.use(VueRouter)
  return new VueRouter({
    routes: [
      {
        path: '/login',
        name: 'login',
        component: Login,
        beforeEnter (to, from, next) {
          if (store.state.auth.token) {
            next({path: '/'})
          } else {
            next()
          }
        }
      },
      {
        path: '/',
        component: Index,
        children: [
          {
            path: '/',
            name: 'home',
            component: Home
          },
          {
            path: 'problemSet',
            name: 'ProblemSet',
            component: ProblemSet
          },
          {
            path: 'explore',
            name: 'explore',
            component: Explore
          },
          {
            path: ':id',
            name: 'user',
            component: User,
            props: true,
            children: [
              {
                path: 'comments',
                name: 'comments',
                component: Comments
              }
            ]
          }
        ]
      },
      {
        path: '*',
        name: 'NotFound',
        component: NotFound
      }
    ]
  })
}
