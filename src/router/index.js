import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView'
import PendenciasPessoaView from '../views/PendenciasPessoaView'
import LoginView from '../views/LoginView'

Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: function (to, from, next) {
      const token = Vue.$cookies.get('token')

      if (!token) {
        next('/logar')
      } else {
        next()
      }
    },
    component: HomeView,
  },
  {
    path: '/pessoa/:idPessoa/pendencias',
    name: 'pendenciaspessoa',
    component: PendenciasPessoaView

  },
  {
    path: '/logar',
    name:'login',
    component: LoginView
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
