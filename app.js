const app = require('./config/server');
const db = require('./config/dbConnection');

//Definindo a porta da apolicação
const port = process.env.PORT || 3000;

//Importação do Mockup
// const noticias  = require('./mockup')

//criando a rota home
app.get('/', async(req, res) => {
   
    //Consulta SQL
    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC LIMIT 3');

    //passando dados para o template
    res.render('home/index', {noticias: result.rows, title: 'Home'});
})

//rota Noticia 
app.get('/noticia', async(req, res) => {
    //Obtem id nocticia por get
    var id = req.query.id;

    let result = await db.query('SELECT * FROM noticias WHERE id_noticia = $1', [id]);

    res.render('noticias/noticia', {noticia: result.rows[0], title: 'Noticia'});
})



//criando a rota noticias
app.get('/noticias', async(req, res) => {

    var result = await db.query('SELECT * FROM noticias ORDER BY id_noticia DESC');

    res.render('noticias/noticias', {noticias: result.rows, title: 'Noticias'});
})

//Rota responsável pelo recurso Admin
app.get('/admin', (req, res) => {

    if(req.session.autorizado){
       res.render("admin/form_add_noticia", {title: "Admin", autorizado:req.session.autorizado});
    }else{
        res.render('admin/login', {title: "Login"});
    }  

})

//Rota responsável por salvar noticia
app.post('/admin/salvar-noticia', async(req, res) => {

    let {titulo, conteudo} = req.body;

    await db.query('INSERT INTO noticias (titulo, conteudo) VALUES ($1, $2)', [titulo, conteudo], (err, result) => {
        res.redirect('/noticias');
    });
})

//Rota responsável por autenticar o usuário
app.post('/admin/autenticar', (req, res) => {
    //recupera informações passadas por POST
    const {usuario, senha} = req.body;

    if(usuario == 'root' && senha == 'cellep1234'){
        req.session.autorizado = true;      
    }
    res.redirect('/admin');
})

//Rota responsável pela saída do usuário
app.get('/admin/sair', (req, res) => {
    req.session.destroy((err) => {});
    res.redirect('/admin');
})



//iniciando a server na porta 3000
app.listen(port, () => {
    console.log('Server rodando na porta 3000');
    console.log('Pressione CTRL + C para terminar')
});