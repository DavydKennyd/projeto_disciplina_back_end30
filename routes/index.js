var express = require('express');
const bodyParser = require('body-parser');
// const {Pool} = require('pg')
const axios = require('axios');
var router = express.Router();
const pool = require('../database/postgresql')
const cors = require('cors');




const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Adicionar para tratar requisições com JSON

app.use(cors());
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


// Rota para processar o cadastro (POST)
router.post('/cadastrar', async (req, res) => {
  const { Nome, 
    Cpf , 
    endereco, 
    contato, 
    tipo_exame, 
    data_entrada, 
    previsao_exame,
    senha } = req.body;

  try {
    const result = await pool.query(
       'INSERT INTO usuarios (nome_completo, endereco, contato, tipo_exame, data_entrada, previsao_exame) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [Nome, endereco, contato, tipo_exame, data_entrada, previsao_exame]
    );
    console.log(result.rows[0]);

    const resposta = await axios.post('http://localhost:3001/api/cadastro', {
      Nome,
      CPF: Cpf,
      Senha: senha
  });
 
  res.json({ success: true, message: 'cadastrado.' });

  } catch (error) {
      // console.error('Erro ao inserir dados:', error);
      res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
  }
});





// Rota para processar o cadastro (POST)
router.post('/pesquisa', async (req, res) => {
  const {Nome} = req.body;

  try {
    const result = await pool.query(
      "SELECT * FROM usuarios WHERE nome_completo = $1", [Nome]
   );
   if (result.rows.length === 0) {
    return res.status(404).json({ error: 'Usuário não encontrado no PostgreSQL' });
  }

    const tudo = {
      Nome: result.rows[0].nome_completo, 
      endereco: result.rows[0].endereco, 
      contato: result.rows[0].contato, 
      tipoExame: result.rows[0].tipo_exame, 
      confirma: result.rows[0].confirm || "Indefirido",
      dataEntrada: result.rows[0].data_entrada, 
      previsaoExame: result.rows[0].previsao_exame,
    }

    res.json(tudo);
  
  } catch (error) {
      // console.error('Erro ao inserir dados:', error);
      res.json({ success: false, message: 'Erro ao cadastrar usuário.' });
  }
});

module.exports = router;
