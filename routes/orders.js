const express=require('express');
const router=express.Router();
const config = require('../config/orderValidations')
const { validateToken } = require('../middlewares/auth');
const { placecOrderService, 
    removeProductService, 
    placeDirectOrderService, 
    reviewService,shortDetailsService,
    addProductService, 
    getCartProductService,
    orderDetailsService} = require('../services/orderservices');





//Add product in the cart
router.post('/',validateToken,async(req, res)=>{
    
    let email=req.email;
    let payloadData=req.body
    let validations=await config.validateCartItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    let resultData= await addProductService(payloadData,email)
    return res.json({data:resultData.data, error:resultData.error})
})

//remove an item from the cart
router.put('/remove', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await config.validateCartItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    let resultData= await removeProductService(payloadData,email)
    return res.json({data:resultData.data, error:resultData.error})
    
})

router.get('/cartItems', validateToken, async(req, res)=>{
    let user_email=req.email

    let resultData= await getCartProductService(user_email)

    return res.json({data:resultData.data, error:resultData.error})
})

//place a order from the cart
router.post('/cart/order', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await config.validateCartbuyItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }
    let resultData= await placecOrderService(payloadData,email)
    return res.json({data:resultData.data, error:resultData.error})
    
})

//buy without adding into cart
router.post('/placeOrder', validateToken, async(req,res)=>{
    let email=req.email;
    let payloadData=req.body
    let validations=await config.validateDirectbuyItem.validate(payloadData);

    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }

    let resultData= await placeDirectOrderService(payloadData,email)
    return res.json({data:resultData.data, error:resultData.error})
    
})

//Get details of an order
router.get('/:id',validateToken ,async(req,res)=>{
    let order_id=req.params.id;
    let user=req.email
    
    let resultData= await orderDetailsService(order_id,user)
    return res.json({data:resultData.data, error:resultData.error})
})

//Get orders of Customer
router.get('/inCustomer', validateToken,async(req,res)=>{
    return res.json({data:'Get orders of Customer', error:null})
})

//Get info about order
router.get('/shortDetails/:id', validateToken, async(req, res)=>{
    let order_id=req.params.id;
    let user=req.email;
    
    let resultData= await shortDetailsService(order_id,user)
    return res.json({data:resultData.data, error:resultData.error})
})

//Post a Review 
router.post('/review', validateToken, async(req, res)=>{
    let useremail=req.email;
    let payloadData=req.body;

    let validations= await config.validateReview.validate(payloadData);
    if(validations && validations.error)
    {
        return res.json({data:null, error:validations['error'].message})
    }

    let resultData= await reviewService(payloadData, useremail)
    return res.json({data:resultData.data, error:resultData.error})
    

})

module.exports=router;