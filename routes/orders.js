const express=require('express');
const router=express.Router();
const { default: to } = require('await-to-js');
const db=require('../lib/database/db');
const utils = require('../data/utils')
const constant= require('../lib/constant');
const { validateToken } = require('../middlewares/auth');
const logger= require('../lib/logging/winston')



//Create orders
router.post('/',validateToken,async(req, res)=>{
    
    let email=req.email;
    let payloadData=req.body
    let validations=await utils.validateCreateOrder.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }

    let [err, result]=await to(db.productModel.findAll({
        where:{
            id:payloadData.productId
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message});
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'No product exist with the given Id'});
    }
    let product_price=result[0]['dataValues'].price;
    [err, result]=await to(db.cartModel.findOrCreate({
        where:{
            productId:payloadData.productId
        },
        defaults:{
            id:constant.ID_INITIALIZATION,
            cartName:payloadData.cartname,
            userEmail:email,
            productId:payloadData.productId,
            price:product_price,
            quantity:payloadData.quantity
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return res.json({data:'Product is alredy added in the cart!', error:null})
    } 
    [err, result]=await to(db.orderModel.findOrCreate({
        where:{
            customerEmail:email,
            cartName:payloadData.cartname
        },
        defaults:{
            customerEmail:email,
            cartName:payloadData.cartname
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    let order_id=result[0]['dataValues'].id
    return res.json({data:`Products added in the cart and your orderId is ${order_id}`, error:null})
})


//Get details of an order
router.get('/:id',validateToken ,async(req,res)=>{
    let order_id=req.params.id;
    let user=req.email
    let [err, result]=await to(db.orderModel.findAll({
        where:{
            id:order_id
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Invalid order Id'})
    }
    let cart_name=result[0]['dataValues'].cartName;
    
    [err, result]=await to(db.cartModel.findAll({
        where:{
            cartName:cart_name,
            userEmail:user
        },
        attributes:['productId','price','quantity']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    // console.log(result);
    let orderDetails=result[0]['dataValues']
    return res.json({data:orderDetails, error:null})
})

//Get orders of Customer
router.get('/inCustomer', validateToken,async(req,res)=>{
    return res.json({data:'Get orders of Customer', error:null})
})

//Get info about order
router.get('/shortDetails/:id', validateToken, async(req, res)=>{
    let order_id=req.params.id;
    let user=req.email;
    let [err, result]=await to(db.orderModel.findAll({
        where:{
            id:order_id
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Invalid order Id'})
    }
    let cart_name=result[0]['dataValues'].cartName;
    
    [err, result]=await to(db.cartModel.findAll({
        where:{
            cartName:cart_name,
            userEmail:user
        },
        attributes:['productId']
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    let orderDetails=result[0]['datavalues']
    return res.json({data:orderDetails, error:null})
})



module.exports=router;