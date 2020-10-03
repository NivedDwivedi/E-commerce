const express = require('express');
const router = express.Router();
const { getCategoryService, 
    getCategorybyIdService, 
    getCategorybyproductService} = require('../services/categoryservices');

//Get categories
router.get('/', async(req,res)=>{
    let resultData= await getCategoryService()
    return res.json({data:resultData.data, error:resultData.error})
})

//Get category by ID
router.get('/:id', async(req,res)=>{
    let categoryId=req.params.id;
    let resultData= await getCategorybyIdService(categoryId)
    return res.json({data:resultData.data, error:resultData.error})
})

//Get Category of a Product by product id
router.get('/inProduct/:id', async(req, res)=>{
    let productId=req.params.id;
    
    let resultData= await getCategorybyproductService(productId)
    return res.json({data:resultData.data, error:resultData.error})
})


module.exports=router;