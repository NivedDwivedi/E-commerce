const { Sequelize } = require('sequelize');



const cartTable= {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    userEmail:{
      type:Sequelize.STRING,
      allowNull:false
    },
    productId:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    },
    price:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    },
    quantity:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    },
    status:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:true
    },
    orderId:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:true
    }
  };




module.exports={
    cartTable
}