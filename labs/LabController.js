const express = require('express');
const router = express.Router();
const Lab = require("./Lab");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/labs/create",(req,res)=>{
    res.render("admin/labs/create");
})

router.post("/labs/create", (req,res)=>{
    var{name,seats}=req.body

    Lab.findOne({where:{name:name,seats:seats}}).then( lab =>{
        if(lab == undefined){
           Lab.create({
                name: name,
                seats:seats
            }).then(()=>{
                res.redirect("/");
            }).catch(()=>{
                res.redirect("/");
            })
        }else{
            res.redirect("/admin/labs/create");
        }
    }
    )

    //acima está a forma correta de armazenar a senha de um usuário no banco de dados
})

module.exports = router;