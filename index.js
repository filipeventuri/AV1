const express = require('express')
const connection = require('./database/database')
const bodyParser = require('body-parser');

const app = express()
connection.authenticate().then().catch((err)=>{
    console.log("err: " + err);
})
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(3000, ()=>{
    console.log("Server Online!")
})