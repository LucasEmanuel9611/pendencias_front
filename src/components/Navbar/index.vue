<template>
  <nav class="style-nav">
    <div class="name-area">
      <h1>Gerenciamento</h1>
      <p>Pendencias</p>
    </div>
    <div class="input-area">
      <input
        type="text"
        class="form-control"
        placeholder=""
        v-model="localBusca"
      />
      <div class="input-group-prepend">
        <button class="btn btn-outline-secondary" type="button">Buscar</button>
      </div>
    </div>
  </nav>
</template>

<script>
import Vue from "vue";

export default {
  name: "HomeView",
  props: {
    busca: "",
  },
  data() {
    return {
      localBusca: "",
    };
  },
  mounted() {
    // const refreshToken = Vue.$cookies.set("refreshToken", e.data, "1h");

    // while (true) {
    //   setTimeout(async () => {
    //     await api
    //       .post("/users/atualiza_token", refreshToken)
    //       .then((e) => {
    //         Vue.$cookies.set("token", e.headers.authorization, "1h");
    //         Vue.$cookies.set("refreshToken", e.data, "1h");
    //         router.push("/");

    //         this.loading = false;
    //       }, 15000);
    //   });
    // }
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
