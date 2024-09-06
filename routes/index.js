var express = require('express');
var router = express.Router();

// Define o uso de arquivos estáticos
router.use(express.static('public'));

// Definindo o view engine como EJS
//router.set('view engine', 'ejs');

// Rota para a página de login
router.get('/login', function(req, res) {
  res.render('login', { title: 'SUE - Login' });
});

// Rota para a página de cadastro
router.get('/cadastro', function(req, res) {
  res.render('cadastro', { title: 'Cadastro de Exame' });
});

// Rota para a página do usuário com dados de exemplo
router.get('/usuario', function(req, res) {
  const usuario = {
      nome: "João Silva",
      endereco: "Rua dos Exames, 123",
      contato: "(11) 98765-4321",
      tipoExame: "Exame de Sangue",
      dataEntrada: "2024-09-05",
      previsaoExame: "2024-09-10"
  };

  res.render('usuario', { usuario });
});

// Rota para processar o login (POST)
router.post('/login', (req, res) => {
  const { cpf, senha } = req.body;
  res.send(`CPF: ${cpf}, Senha: ${senha}`);
});

// Rota para processar o cadastro (POST)
router.post('/cadastro', (req, res) => {
  const { nome, endereco, contato, tipoExame, dataEntrada, previsaoExame } = req.body;

  res.send(`
    Nome: ${nome}, 
    Endereço: ${endereco}, 
    Contato: ${contato}, 
    Tipo de Exame: ${tipoExame}, 
    Data de Entrada: ${dataEntrada}, 
    Previsão de Exame: ${previsaoExame}`);
});

module.exports = router;
