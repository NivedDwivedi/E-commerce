const { default: to } = require('await-to-js');
const express=require('express');
const router=express.Router();
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const db=require('../lib/database/db');
const constant=require('../lib/constant');
const utils = require('../data/utils');
const {validateToken}=require('../middlewares/auth');


//Password Encryption
const encrypt=async(password)=>{
    const saltround=constant.MY_SALT_ROUND;
    const[err, encrypt]=await to(bcrypt.hash(password, saltround))
    if(err)
    {
        // return res.json({data:'null', error:'something went wrong'});
        // return res.send("Encryption failed!");
        console.log(err);
    }
    return encrypt;
}


//Token 
const generatetoken=(userData)=>{
    let token= jwt.sign(userData, constant.MY_SALT, { expiresIn:constant.TOEKN_EXPIRY_TIME});
    return token;
}

//Update a customer
router.put('/', validateToken, async(req,res)=>{
   
    let payloadData=req.body;
    let validation = await utils.validateUpdation.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }

    //let encryptedPassword=await encrypt(user_password);
    let user_email=req.email;
    let[err, data]=await to(db.customerModel.update({
        country:payloadData.country,
        city:payloadData.city,
        phone_number:payloadData.phone},{
            where:{
                email:user_email
        }}))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    return res.json({data:'Updated Information Sucessfully', error:null});
})

	

//Get a customer by id. The customer is fetched by token
router.get('/', validateToken, async(req,res)=>{
    // let payloadData=req.body;
    // let validation = await utils.validateEmail.validate(payloadData);

    // if(validation && validation.error)
    // {
    //     return res.json({data:null, error:validation['error'].message});
    // }

    // if(payloadData.email!=req.email)
    // {
    //     return res.json({data:null, error:"You can not access others details"})
    // }
    let user_email=req.email
    let [err, data]=await to(db.customerModel.findAll({
        where:{
            email:user_email
        }}))
    if(err)
    {
        return res.json({data:'null', error:err.message});
    }
    if(data.length==0)
    {
        return res.json({data:'null', error:'no customer with the given email id'});
    }
    let customer_data=data[0]['dataValues'];
    return res.json({data:customer_data, error:null})
})





// //Registers a customer
router.post('/signup', async(req,res)=>{
    let user_id=constant.ID_INITIALIZATION;
    let payloadData=req.body;
    let validation = await utils.validateSignup.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }

    let encryptedPassword=await encrypt(payloadData.password);

    let[err, result]=await to(db.customerModel.findOrCreate({
        where:{
            email:payloadData.email
        },
        defaults:{
            id:user_id,
            name:payloadData.name,
            email:payloadData.email,
            address:payloadData.address,
            city:payloadData.city,
            country:payloadData.country,
            phone_number:payloadData.phone,
            credit_card:payloadData.card,
            password:encryptedPassword
        }
    }))
    
    // console.log(result.length);
    if(err)
    {
        return res.json({data:'null', error:err.message});
    }
    
    else{
        if(!result[0]['_options'].isNewRecord)
        {
            return res.json({data:'Already have an account please login', error:null})
        }
    let userID=result[0]['dataValues'].id;
        return res.json({data:`Success!, Your UserId is: ${userID}`, error:null})
    }
    
    
})




//Sign in to the app
router.post('/login', async(req,res)=>
{
   

    let payloadData=req.body;
    let validation = await utils.validateLogin.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    
    let[err, data]=await to(db.customerModel.findAll({
        where:{
            email:payloadData.email
        }
    }))
    if(err)
    {
        return res.json({data:null, error:err.message});
    }
    
    if(data.length==0)
    {
        return res.json({data:null, error:'Please create an account'});
    }
    else{

        let userEncryptedPassword=data[0]['dataValues'].password;
        console.log(data[0]['dataValues'].password);

        let user_Data={
            "id":data[0]['dataValues'].id,
            "email":data[0]['dataValues'].email,
            "country":data[0]['dataValues'].country
        }

        
        let [errs, isValid] = await to(
            bcrypt.compare(payloadData.password, userEncryptedPassword)
        );
        if(errs)
        {
            return res.json({data:null, error:errs.message})
        }
        if(isValid)
        {
            return res.json({data: {Token:generatetoken(user_Data)},error:null})
        }
        else
        {
            return res.json({data:'null', error:'Password is Invalid!'})
        }
    }
    
})


//Update the address for the customer
router.put('/address', validateToken, async(req, res)=>
{
    

    let payloadData=req.body;
    let validation = await utils.validateAddress.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    
    let user_email=req.email;
    let[err, data]=await to (db.customerModel.update({address:payloadData.address},{
        where:{
            email:user_email
        }
        
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    return res.json({data:'Address Updated Sucessfully', error:null});
})




//Updates the credit card of a customer
router.put('/creditCard', validateToken,async(req,res)=>{
    let payloadData=req.body;
    let validation = await utils.validateCard.validate(payloadData);

    if(validation && validation.error)
    {
        return res.json({data:null, error:validation['error'].message});
    }
    let user_email=req.email;
    let[err, data]=await to (db.customerModel.update({credit_card:payloadData.card},{
        where:{
            email:user_email
        }
        
    }))
    if(err)
    {
        return res.json({data:null, error:err.message})
    }
    return res.json({data:'Credit Card Details Updated Sucessfully', error:null});
})



module.exports=router;