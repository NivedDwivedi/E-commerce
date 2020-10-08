const jwt=require('jsonwebtoken');
const { default: to } = require('await-to-js');
const db=require('../lib/database/db');






let salt=process.env.MY_SALT;

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
            // console.log(req.email);
            next();
        }
    }
    
};




module.exports={
    validateToken
};
