<template>
  <div>
    <header>
      <div class="logo-wrapper">
        <a href="index.html">
          <img src="@/assets/images/controleunilever.png" alt="Logo icon">
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
            <h1>EDITAR ATIVOS</h1>
            <input v-model="id_ativo" type="text" placeholder="ID Ativo" />
            <button @click="carregarAtivo">Carregar Ativo</button> <!-- Alterado para clicar no botão -->
            <input v-model="nome" type="text" placeholder="Nome" />
            <input v-model="quantidade" type="number" placeholder="Quantidade" />
            <input v-model="lote" type="number" placeholder="Lote" />
            <input v-model="tipo" type="text" placeholder="Tipo" />
            <button @click="alterarAtivo"><b>Alterar</b></button>
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
export default {
  data() {
    return {
      id_ativo: '',
      nome: '',
      quantidade: '',
      lote: '',
      tipo: ''
    };
  },
  methods: {
    toggleDarkMode() {
      // Alterna entre modo claro e escuro
      document.body.classList.toggle('dark-mode');
    },

    // Método para carregar os dados do ativo com base no id_ativo
    carregarAtivo() {
      // Verifica se o id_ativo não está vazio
      if (!this.id_ativo) {
        alert("Por favor, insira um ID de ativo válido.");
        return;
      }

      console.log(`Tentando carregar o ativo com ID: ${this.id_ativo}`);
      
      // Realiza uma requisição GET para buscar os dados do ativo
      fetch(`http://localhost:5000/api/produtos/produtos/${this.id_ativo}`)
        .then(response => {
          console.log('Status da resposta:', response.status);
          if (!response.ok) {
            throw new Error(`Erro ao carregar ativo. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Dados retornados:', data); // Verifique os dados retornados
          
          // Preenche os campos com os dados do ativo
          this.nome = data.nome || '';
          this.quantidade = data.quantidade || '';
          this.lote = data.lote || '';
          this.tipo = data.tipo || '';
        })
        .catch(error => {
          console.error('Erro ao carregar o ativo:', error);
          alert("Erro ao carregar o ativo. Verifique se o ID está correto.");
        });
    },

    // Método para alterar o ativo
    alterarAtivo() {
      if (!this.id_ativo || !this.nome || !this.quantidade || !this.lote || !this.tipo) {
        alert("Todos os campos devem ser preenchidos!");
        return;
      }

      // Garantir que a quantidade seja um número
      const quantidadeNumber = parseFloat(this.quantidade);
      if (isNaN(quantidadeNumber)) {
        alert("Quantidade deve ser um número válido!");
        return;
      }

      const ativo = {
        nome: this.nome,
        quantidade: quantidadeNumber,
        lote: this.lote,
        tipo: this.tipo
      };

      fetch(`http://localhost:5000/api/produtos/${this.id_ativo}`, {
        method: 'put',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(ativo)
      })
        .then(response => {
          if (!response.ok) {
            console.log(response);
            
            throw new Error(`Erro ao alterar o ativo. Status: ${response.status}`);
          }
          return response.json();
        })
        .then(data => {
          console.log('Ativo alterado com sucesso:', data);
          alert("Ativo alterado com sucesso!");
        })
        .catch(error => {
          console.error('Erro ao alterar o ativo:', error);
          alert("Erro ao alterar o ativo: " + error.message);
        });
    }
  }
};
</script>

<style src="../assets/css/global.css"></style>
<style src="../assets/css/reset.css"></style>
<style scoped src="../assets/css/header.css"></style>
<style scoped src="../assets/css/main.css"></style>
<style scoped src="../assets/css/footer.css"></style>
