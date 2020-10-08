const { Sequelize } = require('sequelize');



const orderTable = {
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    customerEmail:{
      type:Sequelize.STRING,
      allowNull:false
    }
  }




module.exports={
    orderTable
}