const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    CPF: String,
    Nome: String,
    Senha: String

}, {
    collection: 'Usuario'  // Adiciona o nome da coleção aqui
});

const Use = mongoose.model('Usuario', UserSchema)

module.exports = Use;
