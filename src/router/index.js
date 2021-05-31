/*
 * @Descripttion: 
 * @version: 
 * @Author: wsz
 * @Date: 2021-05-25 22:41:48
 * @LastEditors: wsz
 * @LastEditTime: 2021-05-30 22:55:57
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/Users.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login },
    { 
      path: '/home', 
      component: Home, 
      redirect: '/welcome',
      children:[
        {path: '/welcome',component:Welcome},
        {path: '/users',component: Users}
      ]
    }
  ]
})

export default router
