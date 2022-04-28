<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <!-- <h1>{{busca}}</h1> -->
    <div class="list-area">
      <div
        v-for="pessoa in pessoas"
        :key="pessoa.id"
        class="styled-card"
        @click="goPendencias(pessoa.id)"
      >
        <div
          class="styled-card-area"
          v-if="
            pessoa.nome.toLowerCase().includes(busca.toLowerCase()) ||
            busca.lenght < 1
          "
        >
          <h3 class="card-id">{{ pessoa.id }}</h3>
          <h4>{{ pessoa.nome }}</h4>
          <p>{{ pessoa.referencia }}</p>
          <p>{{ formatarData(pessoa.createdAt) }}</p>
        </div>
      </div>
    </div>

    <div class="float-button">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="#fff"
        class="bi bi-pen"
        viewBox="0 0 16 16"
      >
        <path
          d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
        />
      </svg>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld";
import Navbar from "@/components/Navbar";
import api from "../../services/api";
import moment from "moment";
import router from "@/router";

export default {
  name: "HomeView",
  components: {
    HelloWorld,
    Navbar,
  },
  data() {
    return {
      pessoas: [],
      busca: "",
    };
  },
  methods: {
    async getPessoas() {
      api.get("/pessoas").then((v) => {
        // console.log(v.data);
        this.pessoas = v.data;
      });
    },
    formatarData(data) {
      return moment(data).format("L");
    },
    setBusca(value) {
      this.busca = value;
    },
    goPendencias(idPessoa) {
      router.push(`/pessoa/${idPessoa}/pendencias`);
    },
  },
  mounted() {
    this.getPessoas();
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
