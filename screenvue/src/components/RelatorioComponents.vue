<template>
    <div>
      <!-- Cabeçalho -->
      <header>
        <div class="logo-wrapper">
          <a href="/">
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
  
      <!-- Seção Principal -->
      <section class="main-section">
        <div class="section-wrapper">
          <div class="login-container">
            <div class="text-wrapper">
              <h1>RELATÓRIO</h1>
              <input v-model="dataInicial" type="date" placeholder="Data Inicial" />
              <input v-model="dataFinal" type="date" placeholder="Data Final" />
              <button @click="gerarRelatorio"><b>Gerar Relatório</b></button>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Rodapé -->
      <footer>
        <p>Todos os direitos reservados © | ControleUnilever - 2024</p>
      </footer>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import * as XLSX from 'xlsx';
  
  export default {
    data() {
      return {
        dataInicial: "", // Data Inicial
        dataFinal: "",   // Data Final
      };
    },
    methods: {
      toggleDarkMode() {
        // Alterna entre o modo claro e o modo escuro
        document.body.classList.toggle("dark-mode");
      },
  
      async gerarRelatorio() {
        // Valida os campos de entrada antes de enviar a requisição
        if (!this.dataInicial || !this.dataFinal) {
          alert("Por favor, selecione as datas inicial e final.");
          return;
        }
  
        // Envia os parâmetros para o backend
        try {
          const response = await axios.get('http://localhost:5000/api/produtos/produtos', { // Corrigido o endpoint para "/api/produtos"
            params: {
              dataInicial: this.dataInicial,
              dataFinal: this.dataFinal,
            }
          });
  
          const data = response.data; // Dados do relatório retornados pela API
  
          if (data && data.length > 0) {
            // Chama a função para gerar o arquivo Excel
            this.gerarExcel(data);
          } else {
            alert("Nenhum dado encontrado para o relatório.");
          }
        } catch (error) {
          // Captura erro de forma mais detalhada
          console.error("Erro ao gerar relatório:", error.response || error);
          alert("Erro ao gerar o relatório: " + (error.response ? error.response.data.message : error.message));
        }
      },
  
      gerarExcel(data) {
        // Converte os dados para uma planilha Excel
        const ws = XLSX.utils.json_to_sheet(data); // Converte dados JSON para a planilha
        const wb = XLSX.utils.book_new();          // Cria um novo livro de planilhas
        XLSX.utils.book_append_sheet(wb, ws, "Relatório"); // Adiciona a planilha ao livro
  
        // Gera o arquivo Excel
        XLSX.writeFile(wb, "relatorio.xlsx"); // Salva o arquivo Excel com o nome "relatorio.xlsx"
      },
    },
  };
  </script>
  
  <style src="../assets/css/global.css"></style>
  <style src="../assets/css/reset.css"></style>
  <style scoped src="../assets/css/main.css"></style>
  <style scoped src="../assets/css/header.css"></style>
  <style scoped src="../assets/css/footer.css"></style>
  