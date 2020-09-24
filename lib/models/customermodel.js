const { Sequelize } = require('sequelize');





const  customerTable={
  id:{
      type:Sequelize.INTEGER.UNSIGNED,
      autoIncrement:true,
      allowNull:true,
      primaryKey:true
  },
  name:{
      type:Sequelize.STRING,
      allowNull:false 
  },
  email:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true  
  },
  address:{
      type:Sequelize.STRING,
      allowNull:true
  },
  city:{
      type:Sequelize.STRING,
      allowNull:true
  },
  country:{
      type:Sequelize.STRING,
      allowNull:true
  },
  phone_number:{
      type:Sequelize.STRING,
      allowNull:false,
      unique:true
  },
  credit_card:{
      type:Sequelize.STRING,
      allowNull:true,
  },
  password:{
      type:Sequelize.STRING,
      allowNull:false,
  }
};


module.exports={
  customerTable
}