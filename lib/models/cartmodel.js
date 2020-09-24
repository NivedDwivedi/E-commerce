const { Sequelize } = require('sequelize');



const cartTable= {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      autoIncrement:true,
      allowNull:false,
      unique:true
    },
    cartName:{
      type:Sequelize.STRING,
      allowNull:false
    },
    userEmail:{
      type:Sequelize.STRING,
      allowNull:false
    },
    productId:{
      type:Sequelize.INTEGER.UNSIGNED,
      primaryKey:true,
      allowNull:false
    },
    price:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    },
    quantity:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false
    }
  };




module.exports={
    cartTable
}