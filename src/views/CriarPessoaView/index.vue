<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <!-- <h1>{{busca}}</h1> -->
    <div class="form-area">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Nome</label>
        <input class="form-control" placeholder="Nome" v-model="nome" />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Referencia</label>
        <input
          class="form-control"
          placeholder="Alguma referencia para reconhecer a pessoa"
          v-model="referencia"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Pendencia</label>
        <input
          class="form-control"
          placeholder="Valor total das pendencia"
          v-model="pendencia"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="inputPassword4">Documento</label>
        <input
          class="form-control"
          placeholder="CPF ou CPNJ"
          v-model="documento"
        />
      </div>

      <button class="btn btn-primary" @click="cadastrarPessoa()">
        Cadastrar Pessoa
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
  name: "CriarPessoa",
  components: {
    Navbar,
  },
  data() {
    return {
      nome: "",
      busca: "",
      token: Vue.$cookies.get("token"),
      referencia: "",
      pendencia: "",
      documento: "",
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
    async cadastrarPessoa() {
      if (
        this.nome.length < 1 ||
        this.pendencia < 1 ||
        this.referencia < 1 ||
        this.documento < 1
      ) {
        window.alert("preencha todos os campos");
        return
      }

      const pessoaDates = {
        nome: this.nome,
        pendencia: this.pendencia,
        referencia: this.referencia,
        documento: this.documento,
      };

      await api
        .post("/pessoas", pessoaDates, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          router.back();
          window.alert(`pessoa ${this.nome} criada com sucesso`);
        })
        .catch((e) => {
          console.log(e?.response?.data);
        });
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
