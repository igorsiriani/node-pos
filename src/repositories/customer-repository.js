const Consumidor = require('../app/models/customer');

exports.post = async(data) => {
    const produto = new Consumidor(data);
    await produto.save();
}

exports.getAll = async() => {
    const res = await Consumidor.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Consumidor.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Consumidor.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            email: data.email,
            senha: data.senha
        }
    });
}

exports.delete = async(id) => {
    await Consumidor.findByIdAndDelete(id);
}

exports.register = async(name, email, pass) => {
    const result = await Consumidor.find({email: email});
    if (result.length > 0) {
        throw {
            status: 400,
            message: "Usuário já existente"
        }
    }
    let customer = new Consumidor();
    customer.nome = name;
    customer.email = email;
    customer.senha = customer.generateHash(pass);

    customer.save((err, res) => {
        if(result.length > 0){
            throw{
                status: 400,
                message: "Usuário já existente"
            };
        }
    });
    return {custom: customer};
}