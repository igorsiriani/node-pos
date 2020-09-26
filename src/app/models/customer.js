const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const consumidorSchema = new Schema({
    nome: String,
    email: String,
    senha: String
});

module.exports = mongoose.model('Consumidores', consumidorSchema);