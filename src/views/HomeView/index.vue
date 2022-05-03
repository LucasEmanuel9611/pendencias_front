<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <!-- <h1>{{busca}}</h1> -->
    <div class="list-area">
      <div v-for="pessoa in pessoas" :key="pessoa.id" class="styled-card">
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
          <div class="button-area">
            <button class="btn" @click="deletaPessoa(pessoa.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                class="bi bi-trash-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"
                />
              </svg>
            </button>
            <button class="btn">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="#fff"
                class="bi bi-pen"
                viewBox="0 0 16 16"
              >
                <path
                  d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001zm-.644.766a.5.5 0 0 0-.707 0L1.95 11.756l-.764 3.057 3.057-.764L14.44 3.854a.5.5 0 0 0 0-.708l-1.585-1.585z"
                />
              </svg>
            </button>
            <button class="btn" @click="goPendencias(pessoa.id)">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                fill="currentColor"
                class="bi bi-caret-right-fill"
                viewBox="0 0 16 16"
              >
                <path
                  d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <div class="float-button" @click="goCreateScreen()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        class="bi bi-plus"
        viewBox="0 0 16 16"
      >
        <path
          d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"
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
import Vue from "vue";

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
      token: Vue.$cookies.get("token"),
    };
  },
  methods: {
    async getPessoas() {
      api
        .get("/pessoas", { headers: { Authorization: `Bearer ${this.token}` } })
        .then((v) => {
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
    goCreateScreen() {
      router.push(`/pessoa/criar`);
    },
    deletaPessoa(id) {
      
      if (!window.confirm("deseja deletar a pessoa?")) {
        return;
      }

      api
        .delete(`/pessoas/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          window.alert(`Pessoa ${id} deletada`);
          console.log(e.response.data);
          // this.pessoas = v.data;
        });
    },
  },
  mounted() {
    this.getPessoas();
    console.log(api.defaults.headers.common["Authorization"]);
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
