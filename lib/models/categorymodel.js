const { Sequelize } = require('sequelize');

const categoryTable = {
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
    }
  };


  module.exports={
      categoryTable
  }

  