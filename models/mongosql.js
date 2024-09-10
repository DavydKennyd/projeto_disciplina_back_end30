const mongoose = require('mongoose')


const UserSchema = new mongoose.Schema({

    link: String,
    nome: String,
    descricao: String

}, {
    collection: 'Mercadoria'  // Adiciona o nome da coleção aqui
});

const Merc = mongoose.model('Mercadoria', UserSchema)

module.exports = Merc;
