const express=require('express');
const router=express.Router();
const { default: to } = require('await-to-js');
const db= require('../lib/database/db')
const logger= require('../lib/log/winston')

//Get all products
router.get('/', async(req,res)=>{
    let [err,result]=await to(db.productModel.findAll({
        attributes:['name']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
})

//Get Product by ID
router.get('/:id', async(req, res)=>{
    let productId=req.params.id
    let [err,result]=await to(db.productModel.findAll({
        where:{
            id:productId
        },
        attributes:['name' ,'description']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'No product with the given id'});
    }
    return res.json({data:result, error:null})
})

//Get list of product in categories
router.get('/category/:id', async(req,res)=>{
    let id=req.params.id
    let [err,result]=await to(db.productLocationsModel.findAll({
        where:{
            categoryId:id
        },
        attributes:['productId', 'productName']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'No product are this category'});
    }
    return res.json({data:result, error:null})
})

//Get details of a product
router.get('/:id/details', async(req,res)=>{
    let productId=req.params.id
    let [err,result]=await to(db.productModel.findAll({
        where:{
            id:productId
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
})

//Get reviews of a product
router.get('/:id/review', async(req, res)=>{
    let id=req.params.id
    let [err,result]=await to(db.reviewModel.findAll({
        where:{
            productID:id
        },
        attributes:['name','review','rating']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    return res.json({data:result, error:null})
})





module.exports=router;