const { Sequelize } = require('sequelize');
const {to}=require('await-to-js');


const sequelize = new Sequelize('ecommerce', 'root', 'nived@99#', {
    host: 'localhost',
    dialect: 'mysql'
  });

  const customerModel= sequelize.define('customers',{
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
        //   validate:{
        //       isEmail:true
        //   }     
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
        //   validate:{
        //       len:[10]
        //   }
          
      },
      credit_card:{
          type:Sequelize.STRING,
          allowNull:true,
        //   validate:{
        //     isCreditCard:true  
        //   }
      },
      password:{
          type:Sequelize.STRING,
          allowNull:false,
        //   validate:{
        //       len:[5,10]
        //   }
      }
  });

  const connectDB = async ()=>{
    let [err, result] = await to ( sequelize.sync( {alter:false} ) )
    if (err){
        console.log(`Error: ${err.message}`)
        return
    }
    
    console.log({data:`Successfully connected to Database`, error:null});
}


module.exports={
    connectDB,
    customerModel
  }