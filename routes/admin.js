const express = require('express');
const router = express.Router();
const { default: to } = require('await-to-js');
const db = require('../lib/database/db');
const utils=require('../data/utils');
const constant= require('../lib/constant');


//category
router.post('/category',async(req, res)=>{
    let payloadData=req.body
    let validations=await utils.validateCategory.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    let Name= payloadData.name.toUpperCase();
    let [err, result]=await to(db.categoryModel.findOrCreate({
        where:{
            name:Name
        },
        defaults:{
            id:constant.ID_INITIALIZATION,
            name:payloadData.name,
            description:payloadData.description
        }
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return res.json({data:null, error:'This category is already present'})
    }

    return res.json({data:'Category added successfully', error:null})
})


//product
router.post('/product',async(req, res)=>{
    let payloadData=req.body
    let validations=await utils.validatePoduct.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }


    let Name= payloadData.name.toUpperCase();
    let category=payloadData.category.toUpperCase();

    //validate category
    let [err, result]=await to(db.categoryModel.findAll({
        where:{
            name:category
        }
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:`There is no category with the name: ${productCategory}`})
    }
    let category_id=result[0]['dataValues'].id;

    //update product table
    [err, result]=await to(db.productModel.findOrCreate({
        where:{
            name:Name
        },
        defaults:{
            id:constant.ID_INITIALIZATION,
            name:Name,
            description:payloadData.description,
            price:payloadData.price
        }
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return res.json({data:null, error:'There is already a product with the given name'})
    }
    
    let pid=result[0]['dataValues'].id;
    //update location table
    [err, result]=await to(db.productLocationsModel.create({
        
        id:constant.ID_INITIALIZATION,
        productId:pid,
        productName:Name,
        categoryId:category_id,
        categoryName:payloadData.category
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    // console.log(result);
    // if(!result[0]['_options'].isNewRecord)
    // {
    //     return res.json({data:null, error:'something went wrong(locations)'})
    // }
    return res.json({data:'Product added successfully', error:null})
})




module.exports=router;