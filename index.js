const express=require('express');
const app=express();





const customer=require('./routes/customer');
const categories=require('./routes/category');
const products=require('./routes/product');
const orders=require('./routes/orders');
const adminR=require('./admin/admin');
const database=require('./lib/database/db');
const logger = require('./lib/log/winston');
// const sentry = require('./lib/alert/sentry');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
database.connectDB();








// app.use(sentry);
app.use('/admin', adminR);
app.use('/customer/', customer);
app.use('/categories/', categories);
app.use('/products/', products);
app.use('/orders/', orders);


const port=3000;
app.listen(3000, (req, res)=>logger.info(`we are at port ${port}`));