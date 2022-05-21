<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <!-- <h1>{{busca}}</h1> -->
    <div class="form-area">
      <div class="form-group col-md-6">
        <label>Nome</label>
        <input class="form-control" placeholder="Nome" v-model="nome" />
      </div>
      <div class="form-group col-md-6">
        <label>Referencia</label>
        <input
          class="form-control"
          placeholder="Alguma referencia para reconhecer a pessoa"
          v-model="referencia"
        />
      </div>
      <div class="form-group col-md-6">
        <label>Pendencia</label>
        <input
          class="form-control"
          placeholder="this."
          v-model="pendencia"
        />
      </div>
      <div class="form-group col-md-6">
        <label >Documento</label>
        <input
          class="form-control"
          placeholder="CPF ou CPNJ"
          v-model="documento"
        />
      </div>

      <button class="btn btn-primary" @click="editarPessoa()">
        Editar Pessoa
      </button>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import api from "../../services/api";
import router from "@/router";
import Vue from "vue";

export default {
  name: "EditarPessoa",
  components: {
    Navbar,
  },
  data() {
    return {
      nome: "",
      busca: "",
      token: Vue.$cookies.get("accessToken"),
      referencia: "",
      pendencia: "",
      documento: "",
      id: this.$route.params.idPessoa,
    };
  },
  methods: {
    formatarData(data) {
      return moment(data).format("L");
    },
    setBusca(value) {
      this.busca = value;
    },
    // verificaString(textos) {
    //   textos.map((item) => {
    //     if (!n && n.length < 1) {
    //       window.alert("preencha todos os campos");
    //       return;
    //     }
    //   });
    // },
    async getPeopleDates() {
      await api
        .get(`pessoas/${this.id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          this.nome = e.data.nome
          this.referencia = e.data.referencia
          this.pendencia = e.data.pendencia
          this.documento = e.data.documento
        })
        .catch((e) => {
          console.log(e?.response?.data);
        });
    },
    async editarPessoa() {
      if (
        this.nome.length < 1 ||
        this.pendencia < 1 ||
        this.referencia < 1 ||
        this.documento < 1
      ) {
        window.alert("preencha todos os campos");
        return;
      }

      const pessoaDates = {
        nome: this.nome,
        pendencia: this.pendencia,
        referencia: this.referencia,
        documento: this.documento,
      };

      await api
        .put(`/pessoas/${this.id}`, pessoaDates, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          router.back();
          window.alert(`pessoa ${this.nome} editada com sucesso`);
        })
        .catch((e) => {
          console.log(e?.response?.data);
        });
    },
  },
  beforeMount() {
    this.getPeopleDates();
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
