const express = require('express');
const router = express.Router();
const { default: to } = require('await-to-js');
const db = require('../database/db')


//category
router.post('/category',async(req, res)=>{
    let categoryName=req.body.name;
    let categoryDescription=req.body.description;
    
    if(typeof categoryName!='string' || typeof categoryDescription!='string'  )
    {
        return res.json({data:null, error:'Invalid Entry'});
    }
    let Name= categoryName.toUpperCase();
    let [err, result]=await to(db.categoryModel.findOrCreate({
        where:{
            name:Name
        },
        defaults:{
            id:0,
            name:categoryName,
            description:categoryDescription
        }
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return res.json({data:null, error:'this category is already present'})
    }

    return res.json({data:'Category added successfully', error:null})
})


//product
router.post('/product',async(req, res)=>{
    let productName=req.body.name;
    let productDescription=req.body.description;
    let productPrice=req.body.price;
    let productCategory=req.body.category;
    
    if(typeof productName!='string' || typeof productDescription!='string' || typeof productPrice!='number' || typeof productCategory!='string' )
    {
        return res.json({data:null, error:'Invalid Entry'});
    }
    let Name= productName.toUpperCase();
    

    //validate category
    let [err, result]=await to(db.categoryModel.findAll({
        where:{
            name:productCategory
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
            id:0,
            name:Name,
            description:productDescription,
            price:productPrice
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
        
        id:0,
        productId:pid,
        productName:productName,
        categoryId:category_id,
        categoryName:productCategory
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