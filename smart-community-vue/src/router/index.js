import VueRouter from 'vue-router'

import Index from '../pages/Index'
import Home from '../pages/Home'
import Emp from '../pages/Emp'
import EmpAdd from '../pages/EmpAdd'
import Login from '../pages/Login'


export default new VueRouter({
  routes: [
    {
      path: '/',
      redirect: '/index'
    },
    {
      path: '/index',
      component: Index,
      children: [{
          path: '/home',
          component: Home,
        },
        {
          path: '/emp',
          component: Emp,
        }, {
          path: '/empAdd',
          component: EmpAdd,
        }
      ]
    },
    {
      path: '/login',
      component: Login,
    },


  ]
})