const express=require('express');
const router=express.Router();
const { getProductService, 
    getProductbyIdService, 
    getProductlistService, 
    getProductdetailsService, 
    getProductreviewService} = require('../services/productservices');

//Get all products
router.get('/', async(req,res)=>{
    let resultData= await getProductService()
    return res.json({data:resultData.data, error:resultData.error})

})

//Get Product by ID
router.get('/:id', async(req, res)=>{
    let productId=req.params.id
    let resultData= await getProductbyIdService(productId)
    return res.json({data:resultData.data, error:resultData.error})
})

//Get list of product in categories
router.get('/category/:id', async(req,res)=>{
    let id=req.params.id
    let resultData= await getProductlistService(id)
    return res.json({data:resultData.data, error:resultData.error})
})

//Get details of a product
router.get('/:id/details', async(req,res)=>{
    let productId=req.params.id
    let resultData= await getProductdetailsService(productId)
    return res.json({data:resultData.data, error:resultData.error})
})

//Get reviews of a product
router.get('/:id/review', async(req, res)=>{
    let id=req.params.id
    let resultData= await getProductreviewService(id)
    return res.json({data:resultData.data, error:resultData.error})
})





module.exports=router;