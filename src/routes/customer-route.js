const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customer-controller');

//Rotas para Produto
//Post=> localhost:3000/api/consumidor
router.post('/', customerController.post);

//GetAll=> localhost:3000/api/consumidor
router.get('/', customerController.getAll);

//GetById=> localhost:3000/api/consumidor/ID
router.get('/:customerId', customerController.getById);


//Put=> localhost:3000/api/consumidor/ID
router.put('/:customerId', customerController.put);

//Delete=> localhost:3000/api/consumidor/ID
router.delete('/:customerId', customerController.delete);

module.exports = router;