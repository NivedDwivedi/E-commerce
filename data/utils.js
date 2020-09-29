const Joi = require('joi');



const validateSignup = Joi.object().keys({
    name:Joi.string().required(),
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','edu','hotmail'] } }),
    address:Joi.string().allow(''),
    city:Joi.string().allow(''),
    country:Joi.string().allow(''),
    phone:Joi.number().integer().min(7000000000).max(9999999999).required(),
    card:Joi.string().allow(''),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})

const validateLogin = Joi.object().keys({
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','edu','hotmail'] } }),
    password:Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required()
})


const validateAddress = Joi.object().keys({
    address:Joi.string().required(),
})

const validateCard = Joi.object().keys({
    card:Joi.string().required()
})


const validateEmail = Joi.object().keys({
    
    email:Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','edu','hotmail'] } }),
    
})



const validateUpdation = Joi.object().keys({
    city:Joi.string().required(),
    country:Joi.string().required(),
    phone:Joi.number().integer().min(7000000000).max(9999999999).required(),
})


const validateCartItem = Joi.object().keys({
    productId:Joi.number().integer().positive().required(),
    quantity:Joi.number().integer().positive().min(1).required(),

})

const validateCartbuyItem = Joi.object().keys({
    status:Joi.number().integer().min(0).max(1).required()
})

const validateDirectbuyItem = Joi.object().keys({
    productId:Joi.number().integer().positive().required(),
    quantity:Joi.number().integer().positive().min(1).required(),

})

const validateReview= Joi.object().keys({
    productid:Joi.number().integer().positive().required(),
    review:Joi.string().required(),
    rating:Joi.number().integer().positive().min(1).max(5).required()
})


// admin payload validation start
const validatePoduct= Joi.object().keys({
    name:Joi.string().required(),
    description:Joi.string().required(),
    price:Joi.number().integer().positive(),
    category:Joi.string().required()
})


const validateCategory= Joi.object().keys({
    name:Joi.string().required(),
    description:Joi.string().required()
})
// admin payload validation end




module.exports={
    validateSignup,
    validateLogin,
    validateAddress,
    validateCard,
    validateEmail,
    validateUpdation,
    validateCartItem,
    validatePoduct,
    validateCategory,
    validateReview,
    validateCartbuyItem,
    validateDirectbuyItem
}