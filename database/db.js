const { Sequelize } = require('sequelize');
const {to}=require('await-to-js');


const sequelize = new Sequelize('ecommerce', 'root', 'nived@99#', {
    host: 'localhost',
    dialect: 'mysql'
  });


  //Customer Table
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

  //Category Table
  const categoryModel=sequelize.define('categories',{
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
  })

  //product Table
  const productModel=sequelize.define('products',{
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
  })

  //ProducT Category Table
  const productLocationsModel=sequelize.define('locations',{
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
  })

  //Review Table 
  const reviewModel=sequelize.define('reviews',{
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
    name:{
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
  })

  //Cart Table
  const cartModel=sequelize.define('carts',{
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
  })

  //OrderTable
  const orderModel=sequelize.define('orders',{
    id:{
      type:Sequelize.INTEGER.UNSIGNED,
      allowNull:false,
      primaryKey:true,
      autoIncrement:true
    },
    customerEmail:{
      type:Sequelize.STRING,
      allowNull:false
    },
    cartName:{
      type:Sequelize.STRING,
      allowNull:false
    }
  })


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