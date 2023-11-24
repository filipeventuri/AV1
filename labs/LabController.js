const express = require('express');
const router = express.Router();
const Lab = require("./Lab");
const adminAuth = require("../middlewares/adminAuth");

router.get("/admin/labs/create",(req,res)=>{
    res.render("admin/labs/create");
})

router.get("/labs/reserve",(req,res)=>{
    Lab.findAll({where:{status:"Disponível"}}).then(labs=>{
        res.render("reserve", {labs:labs} );
    })
    
})

router.post("/labs/reserve/action", (req,res)=>{
    var{id,tutor,status}=req.body;

    Lab.update({status:status,tutor:tutor},{where:{id:id}}).then(()=>{
        res.render("done");
    })
})

router.post("/labs/create", (req,res)=>{
    var{name,seats}=req.body

    Lab.findOne({where:{name:name,seats:seats}}).then( lab =>{
        if(lab == undefined){
           Lab.create({
                name: name,
                seats:seats,
                status: "Disponível"
            }).then(()=>{
                res.redirect("/admin/labs");
            }).catch(()=>{
                res.redirect("/admin/index");
            })
        }else{
            res.redirect("/admin/labs/create");
        }
    }
    )

})

router.post("/labs/delete", (req,res)=>{
    var id = req.body.id;
    if(id!=undefined && id!=NaN){
        Lab.destroy({
            where:{
                id:id
            }
        }).then(()=>{
            res.redirect("/admin/labs")
        })
    }else{
        res.redirect("/");
    }
})

router.get("/admin/labs", (req,res)=>{

    Lab.findAll().then(labs=>{
        res.render("admin/labs/index", {labs:labs})
    })

})

router.get("/labs", (req,res)=>{

    Lab.findAll().then(labs=>{
        res.render("lab", {labs:labs})
    })

})

router.post("/admin/labs/edit/:id",(req,res)=>{
    var id = req.params.id;

    if(isNaN(id)){
        res.redirect("/admin/labs");
    }
    //acima esse if serve para previnir que o id seja sempre um número
    Lab.findByPk(id).then((lab)=>{
        if(lab!=undefined){
            res.render("admin/labs/edit", {lab:lab});
        }else{
            res.redirect("/admin/labs");
        }
    }).catch(()=>{
        res.redirect("/admin/labs");
    })
})

router.post("/labs/reserve/release/:id",(req,res)=>{
    var id = req.params.id;
    var {tutor,status}=req.body;

    Lab.update({status:status, tutor:tutor},{where:{id:id}}).then(()=>{
        res.redirect("/admin/labs");
    })
    
})

router.post("/labs/update", (req,res)=>{
    var{id,name,seats}=req.body;

    Lab.update({name:name,seats:seats},{where:{id:id}}).then(()=>{
        res.redirect("/admin/labs");
    })
})

module.exports = router;