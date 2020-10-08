const { default: to } = require('await-to-js');
const db = require("../lib/database/db")
const logger = require('../lib/log/winston');


const getProductService=async()=>{
    let [err,result]=await to(db.productModel.findAll({
        attributes:['id','name']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    return {data:result, error:null}
}


const getProductbyIdService=async(productId)=>{
    let [err,result]=await to(db.productModel.findAll({
        where:{
            id:productId
        },
        attributes:['name' ,'description']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:'No product with the given id'}
    }
    return {data:result, error:null}

}


const getProductlistService=async(id)=>{
    let [err,result]=await to(db.productLocationsModel.findAll({
        where:{
            categoryId:id
        },
        attributes:['productId', 'productName']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
    }
    if(result.length==0)
    {
        return {data:null, error:'No product are this category'};
    }
    return {data:result, error:null}

}


const getProductdetailsService=async(productId)=>{
    let [err,result]=await to(db.productModel.findAll({
        where:{
            id:productId
        }
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    return {data:result, error:null}

}


const getProductreviewService=async(id)=>{

    let [err,result]=await to(db.reviewModel.findAll({
        where:{
            productID:id
        },
        attributes:['email','review','rating']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
    }
    return {data:result, error:null}
}




module.exports={
    getProductService,
    getProductbyIdService,
    getProductlistService,
    getProductdetailsService,
    getProductreviewService
}