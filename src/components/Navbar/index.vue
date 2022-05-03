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
        <button class="btn btn-outline-secondary" type="button">
          Buscar
        </button>
      </div>
    </div>
  </nav>
</template>

<script>
// @ is an alias to /src


export default {
  name: "HomeView",
  props: {
    busca: "",
  },
  data(){
    return{
      localBusca: ""
    }
  },

  watch: {
    localBusca(newValue){
      this.$emit('buscaUpdate', newValue)
    }
  }

  // onChange={OnChange}

  // OnChange={(v) => set(v)}
};
</script>

<style src="./styles.scss" lang="scss" scoped />
