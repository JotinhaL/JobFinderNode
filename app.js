const express = require('express')
const app = express()

const PORT = 8080;

app.listen(PORT, () =>{
    console.log('esta funcionando')
})

app.get('/', (req,res) =>{
    res.send('ta funfano')
})