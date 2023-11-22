const express = require('express')
const connection = require('./database/database')
const bodyParser = require('body-parser');
const LabController = require("./labs/LabController");
const UserController = require("./users/UserController");
const session = require("express-session");

const app = express()

connection.authenticate().then().catch((err)=>{
    console.log("err: " + err);
})

app.set("view engine", "ejs");
app.use(express.static("public"));

app.use(session({
    secret:"uguturhqwndpqowijdh", // o secret é como se fosse o salt do crypt
    cookie: {
        maxAge: 7200000 //o tempo para destruir os cookies automaticamente 30000 milisegundos
    }

}))

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use("/", UserController);
app.use("/", LabController);


app.get('/', (req,res)=>{
    res.render('index');
})

app.listen(5000, ()=>{
    console.log("Server Online!")
})