const { Router } = require('express');
const router = Router();
const { Instrument } = require('../db');
const { Category } = require('../db');
const {Op} = require('sequelize')


router.post("/", (req,res)=>{
 res.send("Hola")
});

router.post("/", (req,res)=>{
    let name=req.query.name
    if(name){
        let instrumentos=await Instrument.findAll({
            where:{name:{[Op.like]:`%${name}%`}},
            include:{model:Category}
        })
        if(instrumentos.length) return res.status(200).send(instrumentos)
        else return res.status(400).send("no existe ese instrumento:"+name)
    }else{
        let instrumentos=await Instrument.findAll({
            include:{model:Category}
           }) 
        if(instrumentos.length) return res.status(200).send(instrumentos)
        else return res.status(400).send("no existen instrumentos")
    }
});

module.exports = router;
