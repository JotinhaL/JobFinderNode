//inicializando as variaveis
const express = require('express')
const app = express()
const db = require('./db/connection')
const bodyParser = require('body-parser')

//inicializando servidor na porta 8080
const PORT = 8080;
app.listen(PORT, () =>{
    console.log('esta funcionando')
});

//body parser
app.use(bodyParser.urlencoded({extended : false}))


//Db connection
db.authenticate().then(() =>{
    console.log('A conexão com o banco foi feita')
}).catch((err) => {
    console.log('A conexão nao funcionou', err)
})


//Routes
app.get('/', (req,res) =>{
    res.send('ta funfano')
})

//jobs routes
app.use('/jobs' , require('./routes/jobs'))