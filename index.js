const express=require('express');
const app=express();
const {to}=require('await-to-js');
const db=require('./database/db');
const jwt=require('jsonwebtoken');
const bcrypt=require('bcrypt');



const customer=require('./routes/customer');
const categories=require('./routes/category');
const products=require('./routes/product');
const orders=require('./routes/orders');
const database=require('./database/db');
const signup=require('./routes/auth')




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
database.connectDB();










app.use('/customer/', customer);
app.use('/categories/', categories);
app.use('/products/', products);
app.use('/orders/', orders);

const port=process.env.port || 3000;
app.listen(3000, (req, res)=>console.log(`we are at port ${port}`));