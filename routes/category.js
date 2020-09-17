const express = require('express');
const router = express.Router();

//Get categories
router.get('/', (req,res)=>{
    return res.json({data:'Get categories', error:null})
})

//Get category by ID
router.get('/:id', (req,res)=>{
    return res.json({data:'Get category by ID', error:null})
})

//Get Categories of a Product
router.get('/inProduct/:id', (req, res)=>{
    return res.json({data:'Get Categories of a Product', error:null})
})




module.exports=router;