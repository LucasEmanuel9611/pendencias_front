<template>
  <div class="main-container">
    <Navbar :busca="busca" @buscaUpdate="setBusca" />
    <!-- <h1>{{busca}}</h1> -->
    <div class="form-area">
      <div class="form-group col-md-6">
        <label for="inputEmail4">Descrição</label>
        <input class="form-control" placeholder="Descreva o produto da pendencia" v-model="descricao" />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Valor</label>
        <input
          class="form-control"
          type="number"
          placeholder="Valor da pendência"
          v-model="valor"
        />
      </div>
      <div class="form-group col-md-6">
        <label for="inputEmail4">Observação</label>
        <input
          class="form-control"
          placeholder="Adicione alguma observação"
          v-model="observacao"
        />
      </div>

      <button class="btn btn-primary" @click="cadastrarPendencia()">
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
  name: "CriarPendencia",
  components: {
    Navbar,
  },
  data() {
    return {
      descricao: "",
      valor: "",
      observacao: "",
      token: Vue.$cookies.get("accessToken"),
      idPessoa: this.$route.params.idPessoa,
      busca:""
    };
  },
  methods: {
    formatarData(data) {
      return moment(data).format("L");
    },
    setBusca(value) {
      this.busca = value;
    },
    async cadastrarPendencia() {
      if (
        this.descricao.length < 1 ||
        this.valor < 1 ||
        this.observacao < 1 
      ) {
        window.alert("preencha todos os campos");
        return
      }

      const pendenciaDates = {
        descricao: this.descricao,
        valor: this.valor,
        observacao: this.observacao,
        cliente_id: this.idPessoa
      };

      await api
        .post("/pendencias", pendenciaDates, {
          headers: { Authorization: `Bearer ${this.token}` },
        })
        .then((e) => {
          router.back();
          window.alert(`pendencia criada com sucesso!`);
        })
        .catch((e) => {
          console.log(e?.response?.data);
        });
    },
  },
};
</script>

<style src="./styles.scss" lang="scss" scoped />
