const express=require('express');
const app=express();





const customer=require('./routes/customer');
const categories=require('./routes/category');
const products=require('./routes/product');
const orders=require('./routes/orders');
const adminR=require('./admin/admin');
const database=require('./lib/database/db');
const logger = require('./lib/logging/winston');
const sentry = require('./lib/alerting/sentry');




app.use(express.json());
app.use(express.urlencoded({ extended: false }));
database.connectDB();









app.use('/admin', adminR);
app.use('/customer/', customer);
app.use('/categories/', categories);
app.use('/products/', products);
app.use('/orders/', orders);
// app.use(sentry);

const port=3000;
app.listen(3000, (req, res)=>logger.info(`we are at port ${port}`));