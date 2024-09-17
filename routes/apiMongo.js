var express = require('express');
var router = express.Router();
const Users = require('../models/mongosql');
const { route } = require('.');



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

  var users;
  try {

    users = await Users.findOne({ CPF: cpf, Senha: senha })

    if (!users) {
      return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta' });
    }

    tudo = {
      Nome: users.Nome,
    }
    // const resposta = await axios.get('http://localhost:3000/pesquisa', {Nome});
    
    console.log(users)
    res.render('usuario', { tudo });

  
  } catch (error) {
    res.status(500).json({error:error})
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

    console.log(users)
    res.status(200).json({ success: True, message: 'deu certo marquim' });
  
  } catch (error) {
    res.status(500).json({ success: false, message: 'Erro ao comunicar com MongoDB' });
    res.status(500).json({error:error})
  }

});

module.exports = router;
