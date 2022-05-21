import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView";
import PendenciasPessoaView from "../views/PendenciasPessoaView";
import LoginView from "../views/LoginView";
import NotFound from "../views/NotFoundView";
import CriarPessoa from "../views/CriarPessoaView";
import EditarPessoa from "../views/EditarPessoaView";
import CriarPendencia from "../views/CriarPendenciaView";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    beforeEnter: (to, from, next) => {
      const token = Vue.$cookies.get("accessToken");
      if (!token) {
        next("/logar");
      } else {
        next();
      }
    },
    component: HomeView,
  },
  {
    path: "/pessoa/:idPessoa/pendencias",
    name: "editPendenciasPessoa",
    component: PendenciasPessoaView,
  },
  {
    path: "/pessoa/edit/:idPessoa",
    name: "pendenciasPessoa",
    component: EditarPessoa,
  },
  {
    path:"/pessoa/:idPessoa/pendencia/criar",
    name: "criarPendencia",
    component: CriarPendencia
  },
  {
    path: "/logar",
    name: "login",
    component: LoginView,
  },
  {
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


export default router;
