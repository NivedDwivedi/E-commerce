const { Sequelize } = require('sequelize');
const {to}=require('await-to-js');
const constant = require('../constant');
const customerdb=require('../models/customermodel');
const categorydb=require('../models/categorymodel');
const productdb = require('../models/productmodel');
const productLocationdb = require('../models/productlocationmodel');
const reviewdb = require('../models/reviewmodel');
const cartdb = require('../models/cartmodel');
const orderdb = require ('../models/ordermodel');




const sequelize = new Sequelize(constant.DB_NAME, constant.DB_USER, constant.DB_PASSWORD, {
    host: 'localhost',
    dialect: 'mysql'
  });


  //Customer Table
  const customerModel= sequelize.define('customers',customerdb.customerTable);

  //Category Table
  const categoryModel=sequelize.define('categories',categorydb.categoryTable);

  //product Table
  const productModel=sequelize.define('products',productdb.productTable);

  //ProducT Category Table
  const productLocationsModel=sequelize.define('locations',productLocationdb.productLocationTable);

  //Review Table 
  const reviewModel=sequelize.define('reviews',reviewdb.reviewTable);


  //Cart Table
  const cartModel=sequelize.define('carts',cartdb.cartTable);

  //OrderTable
  const orderModel=sequelize.define('orders',orderdb.orderTable);


  //Database Connection
  const connectDB = async ()=>{
    let [err, result] = await to ( sequelize.sync( {alter:false} ) )
    if (err){
        console.log(`Error: ${err.message}`)
        return
    }
    
    console.log({data:`Successfully connected to Database`, error:null});
}

//Modules
module.exports={
    connectDB,
    customerModel,
    categoryModel,
    productModel,
    productLocationsModel,
    reviewModel,
    cartModel,
    orderModel
  }