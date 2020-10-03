const { default: to } = require('await-to-js');
const db = require("../lib/database/db")
const logger = require('../lib/log/winston');



const getCategoryService = async()=>{

    let [err,result]=await to(db.categoryModel.findAll({
        attributes:['name']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    return {data:result, error:null}

}



const getCategorybyIdService = async(categoryId)=>{
    let [err,result]=await to(db.categoryModel.findAll({
        where:{
            id:categoryId
        },
        attributes:['name', 'description']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message}
    }
    if(result.length==0)
    {
        return {data:null, error:`No category exist with the given Id:${categoryId}`}
    }
    return {data:result, error:null}
}

const getCategorybyproductService = async(productId)=>{

    let [err,result]=await to(db.productLocationsModel.findAll({
        where:{
            id:productId
        },
        attributes:['categoryId','categoryName']
    }))
    if(err)
    {
        logger.error(err);
        return {data:null, error:err.message};
    }
    if(result.length==0)
    {
        return {data:null, error:`No data found on productId:${productId}`}
    }
    return {data:result, error:null}
}


module.exports={
    getCategoryService,
    getCategorybyIdService,
    getCategorybyproductService
}