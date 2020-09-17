const express=require('express');
const router=express.Router();

//Create orders
router.post('/', (req, res)=>{
    return res.json({data:'create orders', error:null})
})


//Get details of an order
router.get('/:id', (req,res)=>{
    return res.json({data:'Get details of an order', error:null})
})

//Get orders of Customer
router.get('/inCustomer', (req,res)=>{
    return res.json({data:'Get orders of Customer', error:null})
})

//Get info about order
router.get('/shortDetails/:id', (req, res)=>{
    return res.json({data:'Get info about order', error:null})
})



module.exports=router;