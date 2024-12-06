<template>
  <div id="login-page">
    <header>
      <div class="logo-wrapper">
        <img src="@/assets/images/controleunilever.png" alt="Logo icon" />
      </div>
      <nav class="nav-links">
        <a href="help.html">Ajuda</a>
        <i class="fa-solid fa-moon" id="darkModeToggle" @click="toggleDarkMode" aria-label="Toggle Dark Mode"></i>
      </nav>
    </header>

    <section class="main-section">
      <div class="section-wrapper">
        <div class="login-container">
          <div class="text-wrapper">
            <h1>LOGIN</h1>
            <input v-model="username" type="text" placeholder="Username" required />
            <input v-model="password" type="password" placeholder="Password" required />
            <button @click="login"><b>Avançar</b></button>
            <p v-if="errorMessage">{{ errorMessage }}</p>
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
import axios from 'axios'; // Importa Axios

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua pela URL correta do seu backend
});

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
    };
  },
  methods: {
    toggleDarkMode() {
      // Lógica do modo escuro (adicione a implementação aqui)
    },
    async login() {
      try {
        const response = await api.post('/auth/login', {
          username: this.username,
          password: this.password,
        });

        console.log("Resposta do login:", response.data);

        // Verifica se a mensagem de sucesso está na resposta
        if (response.data.message === "Login realizado") {
          localStorage.setItem('token', response.data.token); // Armazena o token se houver
          this.$router.push('/Ativos'); // Redireciona para a página desejada
        } else {
          this.errorMessage = 'Login falhou. Verifique suas credenciais.';
        }
      } catch (error) {
        this.errorMessage = 'Erro no login. Tente novamente.';
        console.error('Erro no login:', error.response ? error.response.data : error.message);
      }
    },
  },
};
</script>

<style src="../assets/css/global.css"></style>
<style src="../assets/css/reset.css"></style>
<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/header.css"></style>
<style scoped src="../assets/css/footer.css"></style>
