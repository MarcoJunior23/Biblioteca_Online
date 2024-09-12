const express = require('express');
const bodyParser = require('body-parser'); // faz o parser das informaçoes quando realiza um post
const bookRoutes = require('./routes/bookRoutes');

const app = express(); // define o servidor como express
app.use(bodyParser.json()); // função para realizar o parse
app.use('/api', bookRoutes); // rota api

// Definir a porta do servidor
const PORT = process.env.PORT || 3000;

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});