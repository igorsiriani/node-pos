const crypto = require('crypto');
const repository = require('../repositories/customer-repository');
const log = require('../repositories/log-repository');

exports.post = async (req, res) => {
    let result = true;
    let err = '';
    try {
        await repository.post({
            nome: req.body.nome,
            email: req.body.email,
            senha: req.body.senha
        });
        res.status(201).send({
            message: 'Consumidor cadastro com sucesso'
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error
        });
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '1',
        description: 'Insert new customer',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.getAll = async(req, res) => {
    let result = true;
    let err = '';
    try {
        const data = await repository.getAll();
        res.status(201).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error
        });
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '2',
        description: 'Get all customers',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.getById = async(req, res) => {
    let result = true;
    let err = '';
    try {
        const id = req.params.customerId;
        const data = await repository.getById(id);
        res.status(200).send(data);
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error
        });
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '3',
        description: 'Get customer by id',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.put = async(req, res) => {
    let result = true;
    let err = '';
    try {
        const id = req.params.customerId;
        const data = await repository.put(id, req.body);
        res.status(200).send({
            message: 'Consumidor atualizado com sucesso',
            data: data
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error
        });
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '4',
        description: 'Update a customer',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.delete = async(req, res) => {
    let result = true;
    let err = '';
    try {
        await repository.delete(req.params.customerId);
        res.status(200).send({
            message: 'Consumidor removido com sucesso'
        });
    } catch (error) {
        res.status(500).send({
            message: 'Falha ao processar requisição',
            erro: error
        });
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '5',
        description: 'Delete a customer',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
};

exports.customerRegister = async(req, res) => {
    let result = true;
    let err = '';
    try {
        await repository.register(req.body.nome, req.body.email, req.body.senha);
        res.status(201).json({message: "Usuário registrado com sucesso"});
    } catch (error) {
        res.status(500).json({message: "Não foi possível registrar usuário", erro: error});
        result = false;
        err = error;
    }

    var id = crypto.randomBytes(20).toString('hex');
    var extract = {
        code: '6',
        description: 'Register a customer',
        success: result,
        error: err,
        date: (new Date()).valueOf().toString()
    };

    log.post({key: {"id": id}, data: extract});
}