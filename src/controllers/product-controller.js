const crypto = require('crypto');
const Produto = require('../app/models/product');
const repository = require('../repositories/product-repository');
const log = require('../repositories/log-repository');

exports.post = async (req, res) => {
    let result = 'true';
    let err = '';
    try {
        await repository.post({
            nome: req.body.nome,
            preco: req.body.preco,
            descricao: req.body.descricao
        });
        res.status(201).send({
            message: 'Produto cadastro com sucesso'
        });
    } catch (error) {
        
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error.toString()
        });
        result = 'false';
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '7',
        description: 'Insert new product',
        success: result,
        error: err.message ? err.message : '',
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.getAll = async(req, res) => {
    let result = 'true';
    let err = '';
    try {
        const data = await repository.getAll();
        const quantity = data.length;
        res.status(201).send({"total": quantity, "data": data});
    } catch (error) {
        
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error.toString()
        });
        result = 'false';
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '8',
        description: 'Get all products',
        success: result,
        error: err.message ? err.message : '',
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.getById = async(req, res) => {
    let result = 'true';
    let err = '';
    try {
        const id = req.params.productId;
        const data = await repository.getById(id);
        if (data) {
            res.status(200).send(data);
        } else {
            res.status(404).send({message: 'Produto não encontrado'});
        }
    } catch (error) {
        
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error.toString()
        });
        result = 'false';
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '9',
        description: 'Get product by id',
        success: result,
        error: err.message ? err.message : '',
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.put = async(req, res) => {
    let result = 'true';
    let err = '';
    try {
        const id = req.params.productId;
        const data = await repository.put(id, req.body);
        res.status(200).send({
            message: 'Produto atualizado com sucesso',
            data: data
        });
    } catch (error) {
        
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error.toString()
        });
        result = 'false';
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '10',
        description: 'Update a product',
        success: result,
        error: err.message ? err.message : '',
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.delete = async(req, res) => {
    let result = 'true';
    let err = '';
    try {
        await repository.delete(req.params.productId);
        res.status(200).send({
            message: 'Produto removido com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error.toString()
        });
        result = 'false';
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '11',
        description: 'Delete a product',
        success: result,
        error: err.message ? err.message : '',
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};