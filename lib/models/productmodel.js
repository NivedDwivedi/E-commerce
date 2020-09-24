const { Sequelize } = require('sequelize');



const productTable = {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      autoIncrement:true,
      allowNull:false,
      primaryKey:true
    },
    name:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    description:{
      type:Sequelize.STRING,
      allowNull:false,
    },
    price:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    }
  };






module.exports={
    productTable
}