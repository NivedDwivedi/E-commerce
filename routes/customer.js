const express=require('express');
const router=express.Router();
const config =  require('../config/customerValidations')
const {validateToken}=require('../middlewares/auth');
const { getCustomerService,
    customerSigninServices, 
    customerLoginServices, 
    customeUpdaterService, 
    customerAddressService,
    customerCreditcardService} = require('../services/customerservices');

    

//Update a customer
router.put('/', validateToken, async(req,res)=>{
   
    let payloadData=req.body;
    let validation = await config.validateUpdation.validate(payloadData);
    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    let user_email=req.email;
    let resultData= await customeUpdaterService(payloadData, user_email)

    return res.json({data:resultData.data, error:resultData.error})

})

//Get a customer by id. The customer is fetched by token
router.get('/', validateToken, async(req,res)=>{
    let user_id= req.email
    let resultData= await getCustomerService(user_id)

    return res.json({data:resultData.data, error:resultData.error})
})

//Registers a customer
router.post('/signup', async(req,res)=>{
    
    let payloadData=req.body;
    let validation = await config.validateSignup.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    
    let resultData= await customerSigninServices(payloadData)

    return res.json({data:resultData.data, error:resultData.error})
    
})
 
//Sign in to the app
router.post('/login', async(req,res)=>
{
    let payloadData=req.body;
    let validation = await config.validateLogin.validate(payloadData);
    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }

    let resultData= await customerLoginServices(payloadData)

    return res.json({data:resultData.data, error:resultData.error})
    
})

//Update the address for the customer
router.put('/address', validateToken, async(req, res)=>
{
    let payloadData=req.body;
    let validation = await config.validateAddress.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    
    let user_email=req.email;
    let resultData= await customerAddressService(payloadData, user_email)

    return res.json({data:resultData.data, error:resultData.error})
    
})

//Updates the credit card of a customer
router.put('/creditCard', validateToken,async(req,res)=>{
    let payloadData=req.body;
    let validation = await config.validateCard.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    let user_email=req.email;
    let resultData= await customerCreditcardService(payloadData, user_email)
    return res.json({data:resultData.data, error:resultData.error})
})



module.exports=router;