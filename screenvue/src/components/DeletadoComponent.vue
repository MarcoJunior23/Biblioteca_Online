<template>
  <div>
    <header>
      <div class="logo-wrapper">
        <a href="index.html">
          <img src="@/assets/images/controleunilever.png" alt="Logo icon" />
        </a>
      </div>

      <nav class="nav-links">
        <router-link to="/ativos">Adicionar</router-link>
        <router-link to="/remover">Remover</router-link>
        <router-link to="/alterar">Alterar</router-link>
        <router-link to="/relatorio">Relatório</router-link>
        <router-link to="/help">Ajuda</router-link>
      </nav>
    </header>

    <section class="main-section">
      <div class="section-wrapper">
        <div class="login-container">
          <div class="text-wrapper">
            <h1>REMOVER</h1>
            <input v-model="id_ativo" type="text" placeholder="ID do Ativo" />
            <button @click="removerAtivo"><b>Remover</b></button>
          </div>
        </div>
      </div>
    </section>

    <footer>
      <p>Todos os direitos reservados © | ControleUnilever - 2024</p>
    </footer>
  </div>
</template>

<script>
import axios from 'axios';

// Criando uma instância do axios com o baseURL
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua pela URL correta do seu backend
});

export default {
  data() {
    return {
      id_ativo: "", // ID do ativo que será removido
    };
  },
  methods: {
    async removerAtivo() {
      if (this.id_ativo === "") {
        alert("Por favor, preencha o campo ID do Ativo.");
        return;
      }

      try {
        const response = await api.delete(`/produtos/${this.id_ativo}`);
        alert(response.data.message);
        this.id_ativo = "";
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Erro desconhecido';
        alert("Erro ao remover o ativo: " + errorMessage);
      }
    },
    toggleDarkMode() {
      document.body.classList.toggle("dark-mode");
    },
  },
};
</script>

<style src="../assets/css/global.css"></style>
<style src="../assets/css/reset.css"></style>
<style src="../assets/css/main.css"></style>
<style scoped src="../assets/css/header.css"></style>
<style scoped src="../assets/css/footer.css"></style>
