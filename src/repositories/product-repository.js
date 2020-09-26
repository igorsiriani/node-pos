const Produto = require('../app/models/product');

exports.post = async(data) => {
    const produto = new Produto(data);
    await produto.save();
}

exports.getAll = async() => {
    const res = await Produto.find();
    return res;
}

exports.getById = async(id) => {
    const res = await Produto.findById(id);
    return res;
}

exports.put = async(id, data) => {
    await Produto.findByIdAndUpdate(id, {
        $set: {
            nome: data.nome,
            preco: data.preco,
            descricao: data.descricao
        }
    });
}

exports.delete = async(id) => {
    await Produto.findByIdAndDelete(id);
}