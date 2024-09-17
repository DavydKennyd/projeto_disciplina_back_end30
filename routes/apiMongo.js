var express = require('express');
var router = express.Router();
const Users = require('../models/mongosql');
const axios = require('axios'); // biblioteca para fazer requisições HTTP

router.use(express.json());

/* GET users listing. */
router.get('/', async function(req, res, next) {
  
  try {

    const users = await Users.find()
    res.status(200).json(users)

  } catch (error) {
    res.status(500).json({error:error})
  }

});




router.post('/login', async function(req, res, next) {
  const {cpf,senha} = req.body


  try {

    const users = await Users.findOne({ CPF: cpf, Senha: senha })

    if (!users) {
      return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta' });
    }

   
    const tudo = { Nome: users.Nome };

    // Envia o nome do usuário para o servidor PostgreSQL na rota '/pesquisa'
    try {
      const resposta = await axios.post('http://localhost:3000/pesquisa', { Nome: users.Nome });

      // Caso a resposta seja bem-sucedida, renderiza a página de usuário com os dados recebidos
      res.render('usuario', { tudo: resposta.data });
    } catch (error) {
      console.error('Erro ao enviar nome para o servidor PostgreSQL:', error);
      res.status(500).json({ error: 'Falha ao comunicar com o servidor PostgreSQL' });
    }
  } catch (error) {
    res.status(500).json({error:error});
  }
});




router.post('/cadastro', async function(req, res, next) {
  
  const{
    Nome,
    CPF,
    Senha} = req.body

  var usuarior = {
    Nome, CPF,Senha
  };
  try {

    const users = await Users.create(usuarior);

    // console.log(users)
    res.status(200).json({ success: true, message: 'deu certo marquim' });
  
  } catch (error) {
    console.error('Erro ao criar usuário no MongoDB:', error);
    res.status(500).json({ success: false, message: 'Erro ao comunicar com MongoDB' });
  }

});

module.exports = router;
