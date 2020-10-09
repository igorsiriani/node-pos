const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const consumidorSchema = new Schema({
    nome: String,
    email: String,
    senha: String
});

consumidorSchema.methods.generateHash = (password) => {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8, null))
}

consumidorSchema.methods.validPassword = (password) => {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('Consumidores', consumidorSchema);