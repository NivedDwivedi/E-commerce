const express=require('express');
const router=express.Router();
const { default: to } = require('await-to-js');
const db=require('../lib/database/db');
const utils = require('../data/utils')
const constant= require('../lib/constant');
const { validateToken } = require('../middlewares/auth');
const logger= require('../lib/log/winston');





//Add product in the cart
router.post('/',validateToken,async(req, res)=>{
    
    let email=req.email;
    let payloadData=req.body
    let validations=await utils.validateCartItem.validate(payloadData);

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
            productId:payloadData.productId,
            userEmail:email
        },
        defaults:{
            id:constant.ID_INITIALIZATION,
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
        return res.json({data:null, error:'Product is alredy added in the cart!'})
    } 
    
    return res.json({data:`Product added in cart`, error:null})
})


//remove an item from the cart
router.put('/remove', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await utils.validateCartItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    [err, result]=await to(db.cartModel.findAll({
        where:{
            productId:payloadData.productId,
            userEmail:email
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Please add this product before removing it'})
    } 
    let currentQuantity=result[0]['dataValues'].quantity;
    if(payloadData.quantity>currentQuantity || payloadData.quantity<currentQuantity)
    {
        return res.json({data:null, error:`quantity of current item is: ${currentQuantity}, please enter valid quantity number`})
    }

    [err, result]=await to(db.cartModel.destroy({
        where:{
            productId:payloadData.productId,
            userEmail:email
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }


    return res.json({data:`Product removed from the cart`, error:null})
})

//place a order from the cart
router.post('/cart/order', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await utils.validateCartbuyItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    let [err, result]=await to(db.cartModel.findAll({
        where:{
            status:null,
            userEmail:email
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Add a product in cart to place order'})
    }
    if(payloadData.status==1)
    {
        [err, result]=await to(db.orderModel.create({
            id:constant.ID_INITIALIZATION,
            customerEmail:email
        }))
        if(err)
        {
            logger.error(err);
            return res.json({data:null, error:err.message})
        }
        // console.log(result);
        let orderid= result['dataValues'].id;

        [err, result]=await to(db.cartModel.update({
            status:1,
            orderId:orderid
        },
        {
            where:{
                userEmail:email
            }
        }))
        if(err)
        {
            logger.error(err)
            return res.json({data:null, error:err.message})
        }

        return res.json({data:`Order placed successfully! your order id is: ${orderid}`, error:null})
    }
    else{
        return res.json({data:'No order is placed', error:null})
    }
    
})

//buy without adding into cart
router.post('/placeOrder', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await utils.validateDirectbuyItem.validate(payloadData);

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
   
    
    [err, result]=await to(db.orderModel.create({
            id:constant.ID_INITIALIZATION,
            customerEmail:email
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    let orderid= result['dataValues'].id;

    [err, result]=await to(db.cartModel.create({
        id:constant.ID_INITIALIZATION,
        userEmail:email,
        productId:payloadData.productId,
        price:product_price,
        quantity:payloadData.quantity,
        status:1,
        orderId:orderid
        
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }

    return res.json({data:`Order placed successfully! your order id is: ${orderid}`, error:null})
})

//Get details of an order
router.get('/:id',validateToken ,async(req,res)=>{
    let order_id=req.params.id;
    let user=req.email
    let [err, result]=await to(db.orderModel.findAll({
        where:{
            id:order_id,
            customerEmail:user
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Invalid order Id or you can access others details'})
    }

    [err, result]=await to(db.cartModel.findAll({
        where:{
            orderId:order_id,
            userEmail:user,
            status:1
        },
        attributes:['productId','price','quantity','orderId']
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
            id:order_id,
            customerEmail:user
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'Invalid order Id or you cant access others details'})
    }
    
    
    [err, result]=await to(db.cartModel.findAll({
        where:{
            orderId:order_id,
            userEmail:user,
            status:1
        },
        attributes:['productId','quantity']
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


//Post a Review 
router.post('/review', validateToken, async(req, res)=>{
    let useremail=req.email;
    let payloadData=req.body;

    let validations= await utils.validateReview.validate(payloadData);
    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }

    let [err, result]=await to(db.cartModel.findAll({
        where:{
            userEmail:useremail,
            productId:payloadData.productid,
            status:1
        }
    }))
    if(err)
    {
        logger.log(err);
        return res.json({data:null, error:err.message})
    }
    if(result.length==0)
    {
        return res.json({data:null, error:'You can not post a review for this product'})
    }
    
    [err, result]=await to(db.reviewModel.findOrCreate({
        where:{
            email:useremail,
            productId:payloadData.productid
        },
        defaults:{
            id:constant.ID_INITIALIZATION,
            productId:payloadData.productid,
            email:useremail,
            review:payloadData.review,
            rating:payloadData.rating
        }
    }))
    if(err)
    {
        logger.error(err);
        return res.json({data:null, error:err.message})
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return res.json({data:null, error:'Already posted a review for this product'});
    } 

    return res.json({data:'Review posted successfully!', error:null});

})

module.exports=router;