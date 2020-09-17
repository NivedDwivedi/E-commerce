const { default: to } = require('await-to-js');
const express=require('express');
const router=express.Router();
const db=require('../database/db')
const bcrypt=require('bcrypt');
const jwt=require('jsonwebtoken');
const {validateToken}=require('./auth')


//Password Encryption
const encrypt=async(password, req, res)=>{
    const saltround=10;
    const[err, encrypt]=await to(bcrypt.hash(password, saltround))
    if(err)
    {
        // return res.json({data:'null', error:'something went wrong'});
        // return res.send("Encryption failed!");
        console.log(err);
    }
    return encrypt;
}


let salt='ThisIsMySalt';
const generatetoken=(userData)=>{
    let token= jwt.sign(userData, salt, { expiresIn:`60m`});
    return token;
}

//Update a customer
router.put('/', validateToken, (req,res)=>{
    return res.json({data:'update a customer', error:null});
})


//Get a customer by id. The customer is fetched by token
router.get('/', validateToken, async(req,res)=>{
    let user_email=req.body.email
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
// router.post('/', (req,res)=>
// {
//     return res.json({data:'register a customer', error:null})
// })


router.post('/signup', async(req,res)=>{
    let user_id=0;
    let user_name=req.body.name;
    let user_email=req.body.email;
    let user_address=req.body.address;
    let user_city=req.body.city;
    let user_country=req.body.country;
    let user_phone_num=req.body.phone;
    let user_credit_card=req.body.card;
    let user_password=req.body.password;

    if(typeof user_name!='string' || user_name.length==0)
    {
        return res.json({data:'name is not a string'});
    }

    if(typeof user_email!='string' || user_email.length==0)
    {
        return res.json({data:'email is not a string'});
    }

    if(typeof user_address!='string')
    {
        return res.json({data:'address is not a string'});
    }

    if(typeof user_city!='string')
    {
        return res.json({data:'city is not a string'});
    }

    if(typeof user_country!='string')
    {
        return res.json({data:'country is not a string'});
    } 
    
    if(typeof user_phone_num!="string")
    {
        return res.json({data:'Phone no. is not valid'});
    }

    if(typeof user_credit_card!='string')
    {
        return res.json({data:'name is not a string'});
    }

    let encryptedPassword=await encrypt(user_password);

    let[err, result]=await to(db.customerModel.findOrCreate({
        where:{
            email:user_email
        },
        defaults:{
            id:user_id,
            name:user_name,
            email:user_email,
            address:user_address,
            city:user_city,
            country:user_country,
            phone_number:user_phone_num,
            credit_card:user_credit_card,
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

        return res.json({data:'success', error:null})
    }
    
    
})


//Sign in to the app
router.post('/login', async(req,res)=>
{
    let user_email=req.body.email;
    let user_password=req.body.password;

    let[err, data]=await to(db.customerModel.findAll({
        where:{
            email:user_email
        }
    }))
    if(err)
    {
        return res.json({data:'null', error:err.message});
    }
    
    if(data.length==0)
    {
        return res.json({data:'null', error:'Please create an account'});
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
            bcrypt.compare(user_password, userEncryptedPassword)
        );
        if(errs)
        {
            return res.json({data:'null', error:errs.message})
        }
        if(isValid)
        {
            return res.json({data: {Token:generatetoken(user_Data)},error:null})
        }
        else
        {
            return res.json({data:'null', error:'password is invalid'})
        }
    }
    
})


//Update the address for the customer
router.put('/address', (req, res)=>
{
    return res.json({data:'update the customer address', error:null});
})

//Updates the credit card of a customer
router.put('/creditCard', (req,res)=>{
    return res.json({data:'update the credit card of a customer', error:null});
})



module.exports=router;