var express = require('express');
const bodyParser = require('body-parser');
// const {Pool} = require('pg')
var router = express.Router();
const pool = require('../database/postgresql')

// const pool = new Pool({
//   user: 'postgresql',
//   host:'localhost',
//   database:'sistema_exames',
//   password: '12345',
//   port: 5432,
// });

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));


// Define o uso de arquivos estáticos
router.use(express.static('public'));

// Definindo o view engine como EJS
//router.set('view engine', 'ejs');

// Rota para a página de login
router.get('/', function(req, res) {
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
router.post('/cadastrar', async (req, res) => {
  const { nome_completo, endereco, contato, tipo_exame, data_entrada, previsao_exame } = req.body;

  try {
    const result = await pool.query(
       'INSERT INTO usuarios (nome_completo, endereco, contato, tipo_exame, data_entrada, previsao_exame) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [nome_completo, endereco, contato, tipo_exame, data_entrada, previsao_exame]
    );
    console.log(result.rows[0]);
    res.send('Usuário cadastrado com sucesso!');

    // Se der erro é provavel que o problema esteja aqui
    alert('Usuário cadastrado com sucesso!');
    res.alert('Usuário cadastrado com sucesso!')
    
  } catch (error) {
    console.error('Erro ao inserir dados:', error);
    res.send('Erro ao cadastrar usuário.'); }
});

module.exports = router;
