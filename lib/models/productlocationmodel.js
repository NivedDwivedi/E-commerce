const { Sequelize } = require('sequelize');



const productLocationTable = {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      autoIncrement:true,
      allowNull:false.INTEGER,
      primaryKey:true
    },
    productId:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
    },
    productName:{
      type:Sequelize.STRING,
      allowNull:true
    },
    categoryId:{
      type:Sequelize.INTEGER,
      allowNull:false,
    },
    categoryName:{
      type:Sequelize.STRING,
      allowNull:false
    }
  };


  module.exports={
      productLocationTable
  }