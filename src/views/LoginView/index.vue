<template>
  <div
    class="styled-container"
   
  >
    <div class="styled-main">
      <h2>Login</h2>
      <form @submit="submit()">
        <div class="form-group">
          <input
            v-model="username"
            type="email"
            class="form-control styled-input"
            id="exampleInputEmail1"
            placeholder="Digite seu email"
          />
        </div>
        <div class="form-group password-field">
          <input
            v-model="password"
            type="password"
            class="form-control styled-input"
            placeholder="Digite sua senha"
          />
          <!-- <small class="small-text">esqueci a senha</small> -->
        </div>
      </form>
      <button class="login-btn" type="submit" @click="submit" v-if="loading">
        Carregando...
      </button>
      <button class="login-btn" type="submit" @click="submit" v-else>
        Logar
      </button>
    </div>
  </div>
</template>

<script>
import api from "../../services/api";
import VueCookies from "vue-cookies";
// import Vue from "vue";
import router from "../../router/index";

export default {
  name: "loginScreen",
  data() {
    return {
      username: null,
      password: null,
      loading: false,
    };
  },
  methods: {
    async submit() {
      this.loading = true;
      await api
        .post("/login", {
          email: this.username,
          password: this.password,
        })
        .then((e) => {
          
          VueCookies.set("token", e.headers.authorization, "1h");
          router.push("/")
          console.log("token", e.headers.authorization);
          this.loading = false;
          console.log(Vue.$cookies.get('token'))
        });
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
