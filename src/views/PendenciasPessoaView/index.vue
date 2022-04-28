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
          <p>{{ formatarData(pendencia.createdAt) }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import api from "../../services/api";
import moment from "moment";

export default {
  name: "PendenciasPessoaView",
  data() {
    return {
      idPessoa: this.$route.params.idPessoa,
      pendencias: [],
      busca: "",
      pessoaDates: {},
    };
  },
  components: {
    Navbar,
  },
  methods: {
    async getPessoas() {
      api.get(`/pendencias/pessoa/${this.$route.params.idPessoa}`).then((v) => {
        this.pendencias = v.data;
      });
    },
    async getPessoaDates() {
      api.get(`/pessoas/${this.$route.params.idPessoa}`).then((v) => {
        console.log("pessoaDates: ", v.data);
        this.pessoaDates = v.data;
      });
    },
    formatarData(data) {
      return moment(data).format("L");
    },
    setBusca(value) {
      this.busca = value;
    },
  },
  mounted() {
    this.getPessoas();
    this.getPessoaDates();
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
