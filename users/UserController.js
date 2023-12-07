const express = require('express');
const router = express.Router();
const User = require("./User");
const transporter = require("./nodemailer/nodemailer");
const bcrypt = require("bcryptjs");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/users/create",  (req,res)=>{
    res.render("admin/users/create");
})

router.post("/users/create", (req,res)=>{
    var {email,name,password}= req.body;
    var salt = bcrypt.genSaltSync(10); // NUMERO ALEATÓRIO PRA GERAR O SALT
    var hash= bcrypt.hashSync(password, salt);
    const mail = {
        from:'reservesystemlab@gmail.com',
        to: email,
        subject: 'Bem-vindo ao RSL',
        html: `${name}, agradeço imensamente pelo seu cadastro em nosso sistema. Caso haja alguma dúvida sobre o funcionamento deste, por favor encaminhe para o email filipeventuri@hotmail.com`
    };

    User.findOne({where:{email:email}}).then( user =>{
        if(user == undefined){
            
            transporter.sendMail(mail);

            User.create({
                email: email,
                name:name,
                password: hash
            }).then(()=>{
                res.redirect("/");
            }).catch(()=>{
                res.redirect("/");
            })
        }else{
            res.redirect("/admin/users/create");
        }
    }
    )

    //acima está a forma correta de armazenar a senha de um usuário no banco de dados
})

router.get("/admin/users", adminAuth,(req,res)=>{
    User.findAll().then((users)=>{
        res.render("admin/users/index", {users:users});  
    })

})

router.get("/users", (req,res)=>{
    User.findAll().then((users)=>{
        res.render("users", {users:users});  
    })

})

router.post("/users/delete", adminAuth, (req,res)=>{
    var id = req.body.id;
    if(id!=undefined && id!=NaN){
        User.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect("/admin/users")
        })
    }else{
        res.redirect("/");
    }
})

router.get("/admin/users/edit/:id", adminAuth,(req,res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/users");
    }
    //acima esse if serve para previnir que o id seja sempre um número
    User.findByPk(id).then((user)=>{
        if(user!=undefined){
            res.render("admin/users/edit", {user:user});
        }else{
            res.redirect("/admin/users");
        }
    }).catch(()=>{
        res.redirect("/admin/users");
    })
})

router.post("/users/update", adminAuth, (req,res)=>{
    var id = req.body.id;
    var password = req.body.password;


    var salt = bcrypt.genSaltSync(10); // NUMERO ALEATÓRIO PRA GERAR O SALT
    var hash= bcrypt.hashSync(password, salt);

    User.update({password:hash},{where:{id:id}}).then(()=>{
        res.redirect("/admin/users");
    })
})

router.get("/login", (req,res)=>{
    if(req.session.user == undefined){
        res.render("admin/users/login");
    }else{
        res.redirect("/admin/index");
    }
});

router.post("/authenticate", (req,res)=>{
    var email = req.body.email;
    var password = req.body.password;

    User.findOne({where:{email:email}}).then(user=>{
    
            if(user!=undefined){
                //validação de senha
                var correct = bcrypt.compareSync(password, user.password);
                //acima o bcrypt está fazendo hash no password e comparando com a senha do user que já está sobre hash
                if(correct){
                    req.session.user = {
                        id: user.id,
                        email: user.email
                    }
                    res.render("admin/index");
                }else{
                    res.redirect("/login")
                }
            }else{
                res.redirect("/login");
            }
            })

    

        
});

router.get("/logout", adminAuth, (req,res)=>{
    req.session.user = undefined;
    res.redirect("/");
})

module.exports = router;