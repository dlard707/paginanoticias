//Importando o express
const express = require('express');

const app = express();

//Configurando o EJS
app.set('view engine', 'ejs');
//Definindo caminho da vies ejs
app.set('views', './app/views');
//Configuração os arquivos estáticos
app.use(express.static('./app/public'));

// Configuração Express Session
const session = require('express-session');
app.use(session({
    secret: '!Pcn83]}73LB7aTt', //chave de segurança
    resave: false, // otimiza para que a sessão não seja salva novamente a cada requisição
    saveUninitialized: false //otimiza o uso do armazenamento no server. eviotando armazenar sessões não inicializadas
}));

//Configuração do body-parser e jsonparser
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

module.exports = app;