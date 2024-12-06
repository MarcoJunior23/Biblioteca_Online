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
  
      <section class="main-section2">
        <div class="section-wrapper2">
          <div class="contact-container">
            <h1>Fale Conosco</h1>
            <p>
              Se você tiver alguma dúvida ou precisar de ajuda, <br />
              entre em contato conosco preenchendo o formulário abaixo:
            </p>
            <form action="mailto:suporte@controleunilever.com" method="post" enctype="text/plain">
              <label for="email">Seu Email:</label>
              <input type="email" id="email" name="email" required />
              <input type="submit" value="Enviar" />
            </form>
            <div class="comunicado">
              <h3>Comunicado Importante</h3>
              <p>
                Em situações que exigem atenção imediata e extrema, recomendamos
                que você entre em contato diretamente com o seu gestor. A
                comunicação eficaz é essencial para garantir que as questões
                urgentes sejam tratadas de maneira adequada e rápida.
              </p>
              <p>
                Ao envolver seu gestor, você facilita a coordenação com a equipe
                de atendimento do ControleUnilever, permitindo uma resposta mais
                eficiente e alinhada às necessidades da sua situação. Nossa equipe
                está sempre pronta para ajudar, mas, em casos críticos, a
                intervenção do gestor pode agilizar o processo e assegurar que sua
                solicitação receba a prioridade necessária.
              </p>
              <p>
                Agradecemos pela sua compreensão e colaboração. Juntos, podemos
                garantir que todas as suas preocupações sejam atendidas de forma
                eficaz.
              </p>
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
    methods: {
      toggleDarkMode() {
        document.body.classList.toggle("dark-mode");
      },
    },
  };
  </script>
  
  <style src="../assets/css/global.css"></style>
  <style src="../assets/css/reset.css"></style>
  <style scoped src="../assets/css/header.css"></style>
  <style scoped src="../assets/css/main.css"></style>
  <style scoped src="../assets/css/footer.css"></style>
  