const { default: to } = require('await-to-js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const db = require("../lib/database/db")
const logger = require('../lib/log/winston');



const customeUpdaterService = async(customerpayload, user_email)=>{

    let[err, data]=await to(db.customerModel.update({
        country:customerpayload.country,
        city:customerpayload.city,
        phone_number:customerpayload.phone},{
            where:{
                email:user_email
        }}))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
        
    }
    return {data:'Updated Information Sucessfully', error:null};
}

const getCustomerService= async(user_email)=>{
    let [err, data]=await to(db.customerModel.findAll({
        where:{
            email:user_email
        }}))
    if(err)
    {
        logger.error(err);
        return {data:'null', error:err.message};
    }
    if(data.length==0)
    {
        return {data:'null', error:'no customer with the given email id'};
    }
    let customer_data=data[0]['dataValues'];
    return {data:customer_data, error:null}

}

const customerSigninServices= async(customerpayload)=>{
    // console.log(customerpayload);

    const saltround = parseInt(process.env.MY_SALT_ROUND);
    let user_id=parseInt(process.env.ID_INITIALIZATION);
    let [err, encrypt]= await to(bcrypt.hash(customerpayload.password, saltround))
    if(err)
    {
        logger.error(err);
        return {data:null, error:'Error while generating password'}
    }
    let encryptedPassword=encrypt;
    [err, result]=await to(db.customerModel.findOrCreate({
        where:{
            email:customerpayload.email
        },
        defaults:{
            id:user_id,
            name:customerpayload.name,
            email:customerpayload.email,
            address:customerpayload.address,
            city:customerpayload.city,
            country:customerpayload.country,
            phone_number:customerpayload.phone,
            credit_card:customerpayload.card,
            password:encryptedPassword
        }
    }))

    if(err)
    {
        logger.error(err);
        return {data:'null', error:err.message};
    }
    
    else{
        if(!result[0]['_options'].isNewRecord)
        {
            return {data:'Already have an account please login', error:null}
        }
    let userID=result[0]['dataValues'].id;

    return {data:`Success!, Your UserId is: ${userID}`, error:null}
    }

}

const customerLoginServices= async(customerpayload)=>{

    let[err, data]=await to(db.customerModel.findAll({
        where:{
            email:customerpayload.email
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
    }
    
    if(data.length==0)
    {
        return {data:null, error:'Please create an account'};
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
            bcrypt.compare(customerpayload.password, userEncryptedPassword)
        );
        if(errs)
        {
            logger.error(errs);
            return {data:null, error:errs.message}
        }
        if(isValid)
        {
            let token= jwt.sign(user_Data, process.env.MY_SALT, { expiresIn:process.env.TOEKN_EXPIRY_TIME});
            return {data:token,error:null}
        }
        else
        {
            return {data:'null', error:'Password is Invalid!'}
        }
    }
}

const customerAddressService = async(customerpayload, user_email)=>{
    let[err, data]=await to (db.customerModel.update({address:customerpayload.address},{
        where:{
            email:user_email
        }
        
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    return {data:'Address Updated Sucessfully', error:null};

}


const customerCreditcardService  = async(customerpayload, user_email)=>{

    let[err, data]=await to (db.customerModel.update({credit_card:customerpayload.card},{
        where:{
            email:user_email
        }
        
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    return {data:'Credit Card Details Updated Sucessfully', error:null};
}

module.exports={
    customerSigninServices,
    customerLoginServices,
    customeUpdaterService,
    getCustomerService,
    customerAddressService,
    customerCreditcardService
}