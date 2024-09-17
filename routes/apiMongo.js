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

router.get('/usuario', async function(req, res) {  // isso aqui é so uma amostra de colocar na pagina pos pesquisa

  var usuario = {};
  var users;
  try {

     users = await Users.findOne()

    usuario = {
      nome: users.Nome
    }

  
  } catch (error) {
    res.status(500).json({error:error})
  }


  // const usuario = {
  //     nome: "João Silva",
  //     endereco: "Rua dos Exames, 123",
  //     contato: "(11) 98765-4321",
  //     tipoExame: "Exame de Sangue",
  //     dataEntrada: "2024-09-05",
  //     previsaoExame: "2024-09-10"
  // };

  res.render('usuario', { usuario });
});

router.post('/login', async function(req, res, next) {
  const {cpf,senha} = req.body

  var usuario = {};;
  var users;
  try {

    users = await Users.findOne({ CPF: cpf, Senha: senha })

    if (!users) {
      return res.status(404).json({ error: 'Usuário não encontrado ou senha incorreta' });
    }

    usuario = {
      nome: users.Nome
    }

    console.log(users)

  
  } catch (error) {
    res.status(500).json({error:error})
  }
  res.render('usuario', { usuario });
});




router.post('/cadastro', async function(req, res, next) {
  const {Nome,cpf,Senha} = req.body

  var usuario = {
    Nome, cpf,Senha
  };
  try {

    const users = await Users.create(usuario);

    console.log(users)
  
  } catch (error) {
    res.status(500).json({error:error})
  }
});

module.exports = router;
