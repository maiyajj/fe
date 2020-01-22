import Vue from 'vue'
import Router from 'vue-router'
import Home from '../App'

Vue.use(Router);

export default new Router({
  mode: 'hash',
  // 所有的路由配置
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    }
  ]
})
