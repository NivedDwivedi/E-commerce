const express=require('express');
const jwt=require('jsonwebtoken');
const db=require('../database/db');
const { default: to } = require('await-to-js');




let salt='ThisIsMySalt';

const validateToken=async(req, res, next) => {
    let userdata;
    let token=req.headers.authorization;
    try {
        token=token.split('Bearer ')[1];
    } catch (err) {
        return res.json({data: null,error: 'Please add token'});
    }
    
    try 
    {
        userdata=jwt.verify(token, salt);
    } 
    catch(err) {
        return res.json({data: null,error:err.message});
    }
    // jwt.verify(token, salt,function(err, decode){
    //     if(err)
    //     {
    //         return res.json({data:null, error:err});
    //     }
    //     userdata=decode;
    // });

    if(userdata==undefined)
    {
        return res.json({data:null, error:"Something went wrong"});
    }
    // let userId=userdata.id;
    let userEmail=userdata.email
    let [errs, data]=await to (db.customerModel.findAll({where:{
        email:userEmail
    }}));
    if(errs)
    {
        return res.json({data:null, error:errs.message});
    }
    else{
        if(data.length==0)
        {
            return res.json({data: null,error: 'Invalid token'});
        }
        else{
            req.email=userdata.email;
            next();
        }
    }
    
};




module.exports={
    validateToken
};
