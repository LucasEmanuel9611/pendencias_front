<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <div class="pessoa-area">
      <div>
        <h3>{{ pessoaDates.nome }}</h3>
        <h4>{{ pessoaDates.referencia }}</h4>
      </div>
      <div class="pendencias-pessoa">
        <div>
          <h5>Pendências:</h5>
          <p>{{ pendencias.count }}</p>
        </div>
        <div>
          <h5>Pendencia Total:</h5>
          <p>R$ {{ pendencias.count }}00,00</p>
        </div>
      </div>
    </div>
    <div class="list-area">
      <div
        v-for="pendencia in pendencias.rows"
        :key="pendencia.id"
        class="styled-card"
      >
        <div
          class="styled-card-area"
          v-if="pendencia.descricao.includes(busca) || busca.lenght < 1"
        >
          <h3 class="card-id">{{ pendencia.id }}</h3>
          <h4>{{ pendencia.descricao }}</h4>
          <p>{{ pendencia.observacao }}</p>
          <h5>R$ {{ pendencia.valor }}</h5>
          <div>
            <p>{{ formatarData(pendencia.createdAt) }}</p>
            <button class="btn" @click=" deletaPendencia(pendencia.id)">
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
          </div>
        </div>
      </div>
    </div>
    <div class="float-button" @click="goCreatePendencias()">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="35"
        height="35"
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
import Navbar from "@/components/Navbar";
import api from "../../services/api";
import moment from "moment";
import router from "@/router";
import Vue from "vue";

export default {
  name: "PendenciasPessoaView",
  data() {
    return {
      idPessoa: this.$route.params.idPessoa,
      pendencias: [],
      busca: "",
      pessoaDates: {},
      token: Vue.$cookies.get("token"),
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async getPessoas() {
      api
        .get(`/pendencias/pessoa/${this.$route.params.idPessoa}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((v) => {
          this.pendencias = v.data;
          console.log("pendencias: ", this.pendencias.rows);
        });
    },
    async getPessoaDates() {
      api
        .get(`/pessoas/${this.$route.params.idPessoa}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((v) => {
          // console.log("pessoaDates: ", v.data);
          this.pessoaDates = v.data;
        });
    },
    formatarData(data) {
      return moment(data).format("L");
    },
    setBusca(value) {
      this.busca = value;
    },
    goCreatePendencias() {
      router.push(`/pessoa/${this.idPessoa}/pendencia/criar`);
    },
    deletaPendencia(id) {
      if (!window.confirm("deseja deletar a pendencia?")) {
        return;
      }

      api
        .delete(`/pendencias/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          window.alert(`Pessoa ${id} deletada`);
          console.log(e.response.data);
          // this.pessoas = v.data;
        });
        this.getPessoas()
    }
  },
  mounted() {
    this.getPessoas();
    this.getPessoaDates();
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
