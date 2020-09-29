const { Sequelize } = require('sequelize');



const reviewTable = {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    productId:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
    },
    email:{
      type:Sequelize.STRING,
      allowNull:false
    },
    review:{
      type:Sequelize.STRING,
      allowNull:true
    },
    rating:{
      type:Sequelize.INTEGER,
      allowNull:false
    }
  };




module.exports={
    reviewTable
}