const express = require('express');
const router = express.Router();
const { default: to } = require('await-to-js');
const db = require('../database/db')

//Get categories
router.get('/', async(req,res)=>{
    let [err,result]=await to(db.categoryModel.findAll({
        attributes:['name']
    }))
    if(err)
    {
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
})

//Get category by ID
router.get('/:id', async(req,res)=>{
    let categoryId=req.params.id;
    let [err,result]=await to(db.categoryModel.findAll({
        where:{
            id:categoryId
        },
        attributes:['name', 'description']
    }))
    if(err)
    {
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
})

//Get Categories of a Product
router.get('/inProduct/:id', async(req, res)=>{
    let productId=req.params.id;
    let [err,result]=await to(db.productLocationsModel.findAll({
        where:{
            id:productId
        },
        attributes:['categoryId','caegoryName']
    }))
    if(err)
    {
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
    
})


module.exports=router;