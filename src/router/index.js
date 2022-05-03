import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import PendenciasPessoaView from "../views/PendenciasPessoaView";
import LoginView from "../views/LoginView";
import NotFound from "../views/NotFoundView"
import CriarPessoa from "../views/CriarPessoaView"

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    // beforeEnter: (to, from, next) => {
    //   const token = Vue.$cookies.get("token");
    //   if (!token) {
    //     next("/logar");
    //   } else {
    //     console.log("token in routes: ", token);

    //     next();
    //   }
    // },
    component: HomeView,
  },
  {
    path: "/pessoa/:idPessoa/pendencias",
    name: "pendenciasPessoa",
    component: PendenciasPessoaView,
  },
  {
    path: "/logar",
    name: "login",
    component: LoginView,
  },{
    path: "/404",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "/pessoa/criar",
    name: "criarPessoa",
    component: CriarPessoa,
  },
  {
    path: "/:catchAll(.*)",
    redirect: "404",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Vue.$cookies.get("token");

  if (!token) {    
    next('/logar')
    return;
  }

  next();
});

export default router;
