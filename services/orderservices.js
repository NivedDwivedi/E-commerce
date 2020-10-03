const { default: to } = require('await-to-js');
const db = require("../lib/database/db")
const logger = require('../lib/log/winston');


const addProductService = async(payloadData, email)=>{

    let [err, result]=await to(db.productModel.findAll({
        where:{
            id:payloadData.productId
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'No product exist with the given Id'}
    }
    let product_price=result[0]['dataValues'].price;
    let id = parseInt(process.env.ID_INITIALIZATION)
    [err, result]=await to(db.cartModel.findOrCreate({
        where:{
            productId:payloadData.productId,
            userEmail:email,
            status:0
        },
        defaults:{
            id:id,
            userEmail:email,
            productId:payloadData.productId,
            price:product_price,
            quantity:payloadData.quantity,
            status:0
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return {data:null, error:'Product is alredy added in the cart!'}
    } 
    
    return {data:`Product added in cart`, error:null}
}

const removeProductService = async(payloadData,email)=>{

    let [err, result]=await to(db.cartModel.findAll({
        where:{
            productId:payloadData.productId,
            userEmail:email
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'Please add this product before removing it'}
    } 
    let currentQuantity=result[0]['dataValues'].quantity;
    if(payloadData.quantity>currentQuantity || payloadData.quantity<currentQuantity)
    {
        return {data:null, error:`quantity of current item is: ${currentQuantity}, please enter valid quantity number`}
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
        return {data:null, error:err.message}
    }


    return {data:`Product removed from the cart`, error:null}
    
}

const getCartProductService = async(user_email)=>{

    let[err, result]= await to(db.cartModel.findAll({
        where:{
            userEmail:user_email,
            status:0
        },
        attributes:['productId', 'price', 'quantity']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'Cart is empty'}
    }
    return {data:result, error:null}
}

const placecOrderService = async(payloadData, email)=>{

    let [err, result]=await to(db.cartModel.findAll({
        where:{
            status:0,
            userEmail:email
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'Add a product in cart to place order'}
    }
    let id = parseInt(process.env.ID_INITIALIZATION)
    if(payloadData.status==1)
    {
        [err, result]=await to(db.orderModel.create({
            id:id,
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
            return {data:null, error:err.message}
        }

        return {data:`Order placed successfully! your order id is: ${orderid}`, error:null}
    }
    else{
        return {data:'No order is placed', error:null}
    }
    
}


const placeDirectOrderService = async(payloadData, email)=>{

    let [err, result]=await to(db.productModel.findAll({
        where:{
            id:payloadData.productId
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
    }
    if(result.length==0)
    {
        return {data:null, error:'No product exist with the given Id'}
    }
    let product_price=result[0]['dataValues'].price;
   
    let id = parseInt(process.env.ID_INITIALIZATION)
    [err, result]=await to(db.orderModel.create({
            id:id,
            customerEmail:email
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    let orderid= result['dataValues'].id;

    [err, result]=await to(db.cartModel.create({
        id:id,
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
        return {data:null, error:err.message}
    }

    return {data:`Order placed successfully! your order id is: ${orderid}`, error:null}
    
}


const orderDetailsService = async(order_id, user)=>{
    let [err, result]=await to(db.orderModel.findAll({
        where:{
            id:order_id,
            customerEmail:user
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'Invalid order Id or This order Id does not belongs to you'}
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
        return {data:null, error:err.message}
    }
    
    return {data:result, error:null}
    
}


const shortDetailsService = async(order_id, user)=>{

    let [err, result]=await to(db.orderModel.findAll({
        where:{
            id:order_id,
            customerEmail:user
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'Invalid order Id or you cant access others details'}
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
        return {data:null, error:err.message}
    }
    // console.log(result);
    
    return {data:result, error:null}
    
}


const reviewService = async(payloadData, useremail)=>{

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
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'You can not post a review for this product'}
    }
    let id = parseInt(process.env.ID_INITIALIZATION)
    [err, result]=await to(db.reviewModel.findOrCreate({
        where:{
            email:useremail,
            productId:payloadData.productid
        },
        defaults:{
            id:id,
            productId:payloadData.productid,
            email:useremail,
            review:payloadData.review,
            rating:payloadData.rating
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(!result[0]['_options'].isNewRecord)
    {
        return {data:null, error:'Already posted a review for this product'}
    } 

    return {data:'Review posted successfully!', error:null}
    
}





module.exports={
    addProductService,
    removeProductService,
    placecOrderService,
    placeDirectOrderService,
    orderDetailsService,
    shortDetailsService,
    reviewService,
    getCartProductService

}
