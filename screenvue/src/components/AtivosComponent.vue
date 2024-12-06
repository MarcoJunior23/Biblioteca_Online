<template>
  <div id="ativos-page">
    <header>
      <div class="logo-wrapper">
        <router-link to="/">
          <img src="@/assets/images/controleunilever.png" alt="Logo icon" />
        </router-link>
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
            <h1>ATIVOS</h1>
            <input type="text" placeholder="Nome" v-model="nome" />
            <input type="number" placeholder="Quantidade" v-model="quantidade" />
            <input type="number" placeholder="Lote" v-model="lote" />
            <input type="text" placeholder="Tipo" v-model="tipo" />
            <input type="text" placeholder="id_ativo" v-model="id_ativo" />
            
            <button @click="adicionarAtivo"><b>Adicionar</b></button>
            <p v-if="mensagem" :class="{'success': sucesso, 'error': !sucesso}">{{ mensagem }}</p>
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

const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Substitua pela URL correta do seu backend
});

export default {
  data() {
    return {
      nome: '',
      quantidade: '', // Usando 0 como valor padrão
      lote: '',       // Usando 0 como valor padrão
      tipo: '',
      id_ativo: '',
      mensagem: '',  // Para feedback ao usuário
      sucesso: false, // Para indicar se a operação foi bem-sucedida
    };
  },
  methods: {
    async adicionarAtivo() {
      // Verificar se todos os campos estão preenchidos
      if (!this.nome || !this.quantidade || !this.tipo || !this.lote||!this.id_ativo) {
        this.sucesso = false;
        this.mensagem = 'Todos os campos são obrigatórios!';
        return;
      }

      // Garantir que quantidade e lote sejam números
      const novoAtivo = {
        nome: this.nome,
        quantidade: Number(this.quantidade), // Garantir que é um número
        lote: Number(this.lote),             // Garantir que é um número
        tipo: this.tipo,
        id_ativo:this.id_ativo
      };
      
      console.log('Dados enviados para o backend:', novoAtivo); // Verifique no console se os dados estão corretos
      try {
        // Enviar os dados para a API
        const response = await api.post('/produtos', novoAtivo);

        // Verifique a resposta do servidor
        if (response.status === 201) {
          this.sucesso = true;
          this.mensagem = 'Ativo adicionado com sucesso!';
          this.limparCampos();
        } else {
          this.sucesso = false;
          this.mensagem = 'Erro ao adicionar ativo: ' + (response.data.message || 'Erro desconhecido');
        }
      } catch (error) {
        this.sucesso = false;
        // Verifique se o erro tem uma resposta específica
        this.mensagem = 'Erro na requisição: ' + (error.response ? error.response.data.message : error.message);
      }
    },
    limparCampos() {
      this.nome = '';
      this.quantidade = 0;
      this.lote = 0;
      this.tipo = '';
      this.id_ativo = '';
    }
  },
};
</script>

<style src="../assets/css/global.css"></style>
<style src="../assets/css/reset.css"></style>
<style scoped src="../assets/css/header.css"></style>
<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/footer.css"></style>
