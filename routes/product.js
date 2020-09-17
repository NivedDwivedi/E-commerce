const express=require('express');
const router=express.Router();

//Get all products
router.get('/', (req,res)=>{
    return res.json({data:'Get all products', error:null})
})

//Search products
router.get('/search', (req,res)=>{
    return res.json({data:'Search products', error:null})
})

//Get Product by ID
router.get('/:id', (req, res)=>{
    return res.json({data:'Get Product by ID', error:null})
})

//Get list of product in categories
router.get('/category/:id', (req,res)=>{
    return res.json({data:'Get list of product in categories', error:null})
})

//Get details of a product
router.get('/:id/details', (req,res)=>{
    return res.json({data:'Get details of a product', error:null})
})

//Get reviews of a product
router.get('/:id/review', (req, res)=>{
    return res.json({data:'Get reviews of a product', error:null})
})



module.exports=router;