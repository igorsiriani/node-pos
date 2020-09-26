const Consumidor = require('../app/models/customer');
const { post } = require('../routes/index-route');

exports.post = function (req, res){
    const consumidor = new Consumidor();
    consumidor.nome = req.body.nome;
    consumidor.email = req.body.email;
    consumidor.senha = req.body.senha;

    // console.log(req.body);

    consumidor.save(function(error){
        if(error)
            res.send("Erro ao tentar salvar um novo consumidor ", error);
        
        res.status(201).json({message: 'consumidor inserido com sucesso'});
    });
};

exports.getAll = function(req, res){
    Consumidor.find(function(err, cust){
        if(err)
            res.send(err);

        res.status(200).json({
            message: "retorno ok de todos os consumidores",
            allcustomers: cust
        });
    });
};

exports.getById = function(req, res){
    const id = req.params.customerId;
    Consumidor.findById(id, function(err, consumidor){
        if (err){
            res.status(500).json({
                message: "Erro ao tentar encontrar consumidor; ID mal formado"
            });
        }else if(consumidor == null){
            res.status(400).json({
                message: "consumidor não encontrado para o id passado"
            });
        }else{
            res.status(200).json({
                message: "consumidor encontrado",
                consumidor: consumidor
            });
        }
    });
};

exports.put = function(req, res){
    const id = req.params.customerId;
    console.log(id)
    Consumidor.findById(id, function(err, consumidor){
        if(err){
            res.status(500).json({
                message:"Erro ao tentar encontrar consumidor; Id mal formado"
            });
        }else if(consumidor == null){
            res.status(400).json({
                message: "consumidor não encontrado para o Id passado"
            });
        }else{
            consumidor.nome = req.body.nome;
            consumidor.email = req.body.email;
            consumidor.senha = req.body.senha;

            consumidor.save(function(error){
                if(error)
                    res.send("Erro ao tentar atualizar o consumidor", error);
                
                    res.status(200).json({
                        message: "consumidor atualizado com sucesso"
                    });
            });
        }
    });
};

exports.delete = function(req, res){
    Consumidor.findByIdAndRemove(req.params.customerId, (err, consumidor) => {
        if(err) 
            res.status(500).send("Erro ao deletar ", err)

        const response ={
            message: "Consumidor removido com sucesso",
            id: consumidor.id
        };
        return res.status(200).send(response);
    });
};