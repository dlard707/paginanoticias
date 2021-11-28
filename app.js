//Importando o express
const express = require('express');

const app = express();

//Configurando o EJS
app.set('view engine', 'ejs');
//Definindo caminho da vies ejs
app.set('views', './app/views');
//Configuração os arquivos estáticos
app.use(express.static('./app/public'));

//Importação do Mockup
const noticias  = require('./mockup')

//criando a rota home
app.get('/', (req, res) => {
    //Obtem 3 noticias do Mockup
    res.render('home/index', {noticias: noticias.slice(0,3)});
})

//rota Noticia 
app.get('/noticia', (req, res) => {
    //Obtem id nocticia por get
    var id = req.query.id;

    res.render('noticias/noticia', {noticia: noticias[id]});
})



//criando a rota noticias
app.get('/noticias', (req, res) => {
    res.render('noticias/noticias', {noticias: noticias});
})



//iniciando a server na porta 3000
app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
    console.log('Pressione CTRL + C para terminar')
});