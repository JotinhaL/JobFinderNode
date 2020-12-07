//inicializando as variaveis
const express = require('express')
const exphbs = require('express-handlebars')
const path = require('path')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')
const Job = require('./models/Job')
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

//inicializando servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () =>{
    console.log('esta funcionando')
});

//body parser
app.use(bodyParser.urlencoded({extended : false}))

// handlebars
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname, 'public')));

//Db connection
db.authenticate().then(() =>{
    console.log('A conexão com o banco foi feita')
}).catch((err) => {
    console.log('A conexão nao funcionou', err)
})


//Routes
app.get('/', (req,res) =>{

    let search = req.query.job;
    let query = '%'+search+'%'; //PH -> PHP, Word -> Wordpress

    if(!search){
        Job.findAll({order: [
            ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index',{
                jobs
            })
        })
        .catch(err => console.log(err))
    } else{
        Job.findAll({
            where: {title: {[Op.like]: query}}, 
            order: [
                ['createdAt', 'DESC']
        ]})
        .then(jobs => {
            res.render('index',{
                jobs, search
            })
        })
        .catch(err => console.log(err))
    }


});

//jobs routes
app.use('/jobs' , require('./routes/jobs'))