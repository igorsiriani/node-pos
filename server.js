//Importando pacotes
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

//Configurar o app para usar o body-parser e transformar as req em JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Persistência
//Mongo
const connectionString = "mongodb+srv://mainAdmin:mainAdmin@cluster0.juma3.gcp.mongodb.net/bdpos?retryWrites=true&w=majority";
mongoose.connect(connectionString,  {useNewUrlParser:true, useUnifiedTopology: true, useFindAndModify: false});

//Definir porta onde o server vai responder
const port = process.env.PORT || 3000;

//Definindo as Rotas
const router = express.Router();//intercepta todas as rotas
const productRoute = require('./src/routes/product-route');
const customerRoute = require('./src/routes/customer-route');
const indexRoute = require('./src/routes/index-route');
const loginRoute = require('./src/routes/login-route');

//Vincular a aplicação (app) com o motor de rotas 
// '/api' é o caminho padrão para as APIs REST 
//rota principal
app.use('/api', indexRoute);
//rota para produto
app.use('/api/produtos/', productRoute);
//rota para consumidor
app.use('/api/consumidor/', customerRoute);
//rota para login
app.use('/api/login/', loginRoute);

app.listen(port, () => {
    console.log("server is up and running...on port ", port);
});