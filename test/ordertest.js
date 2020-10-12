let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require(`../index`);


let token = process.env.TEST_TOKEN


//Add product in the cart
describe("E-Commerce", () => {
    describe("Order", () => {

        let customerPayload ={
            "productId":2,
            "quantity":1
        }

        it(`it should ADD item in the cart`, (done) => {
        chai.request(server)
          .post("/orders/")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                if(res.body.data==null)
                {
                    (res.body).should.have.property('error');
                    (res.body.error).should.be.a('string');
                    (res.body.error).should.be.eq(`No product exist with the given Id` || `Product is alredy added in the cart!`);
                }
                else
                {
                    (res.body).should.have.property('data');
                    (res.body.data).should.be.a('string');
                    (res.body.data).should.be.eq("Product added in cart");
                }
                
                done();
             });
          });
     });
   
   })

// //remove an item from the cart
// describe("E-Commerce", () => {
//     describe("Order", () => {

//         let customerPayload ={
//             "productId":2,
//             "quantity":1
//         }

//         it(`it should REMOVE the item from the cart`, (done) => {
//         chai.request(server)
//           .put("/orders/remove")
//           .set('Authorization', token)
//           .send(customerPayload)
//           .end((err, res) => {
//                 (res).should.have.status(200);
//                 (res.body).should.be.a("object");
//                 res.should.be.json;
//                 (res.body).should.have.property('data');
//                 (res.body.data).should.be.a('string');
//                 (res.body.data).should.be.eq("Product removed from the cart");
//                 done();
//              });
//           });
//      });
   
//    })

//get the all cartitems
describe("E-Commerce", () => {
    describe("Order", () => {
        it(`it should GET all items of the cart`, (done) => {
        chai.request(server)
          .get("/orders/cartItems")
          .set('Authorization', token)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                if(res.body.data==null)
                {
                    (res.body).should.have.property('error');
                    (res.body.error).should.be.a('string');
                    (res.body.error).should.be.eq(`Cart is empty`);
                }
                else
                {
                    if( res.body.data.length > 0)
                    {
                        (res.body.data[0]).should.have.property('productId');
                        (res.body.data[0]).should.have.property('price');
                        (res.body.data[0]).should.have.property('quantity');
                    }
                }
               
                done();
             });
          });
     });
   
})

//place a order from the cart
describe("E-Commerce", () => {
    describe("Order", () => {

        let customerPayload ={
           "status":1
        }

        it(`it should PLACE a order from the cart`, (done) => {
        chai.request(server)
          .post("/orders/cart/order")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                // (res.body.data).should.be.eq(`Order placed successfully! your order id is: ${orderid}`);
                done();
             });
          });
     });
   
   })

//buy without adding into cart
describe("E-Commerce", () => {
    describe("Order", () => {

        let customerPayload ={
            "productId":1,
            "quantity":1
        }

        it(`it should PLACE an direct order`, (done) => {
        chai.request(server)
          .post("/orders/placeorder")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                // (res.body.data).should.be.eq(`Order placed successfully! your order id is: ${orderid}`);
                done();
             });
          });
     });
   
   })

//Get details of an order
describe("E-Commerce", () => {
    describe("Order", () => {
        it(`it should GET details of an order`, (done) => {
        chai.request(server)
          .get("/orders/1")
          .set('Authorization', token)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('productId');
                    (res.body.data[0]).should.have.property('price');
                    (res.body.data[0]).should.have.property('Quantity');
                    (res.body.data[0]).should.have.property('orderId');
                }
                done();
             });
          });
     });
   
   })

//Get shortdetails of an order
describe("E-Commerce", () => {
    describe("Order", () => {
        it(`it should GET short detail of an order`, (done) => {
        chai.request(server)
          .get("/orders/1")
          .set('Authorization', token)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('productId');
                    (res.body.data[0]).should.have.property('quantity');
                }
                done();
             });
          });
     });
   
   })

//Post a Review 
 describe("E-Commerce", () => {
    describe("Order", () => {

        let customerPayload ={
            "productid":3,
            "review":"Value for money",
            "rating":5
        }

        it(`it should post a review`, (done) => {
        chai.request(server)
          .post("/orders/review")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                if(res.body.data==null)
                {
                    (res.body).should.have.property('error');
                    (res.body.error).should.be.a('string');
                    (res.body.error).should.be.eq(`Already posted a review for this product`);
                }
                else
                {
                    (res.body.data).should.be.a('string');
                    (res.body.data).should.be.eq(`Review posted successfully!`);
                }
                
                done();
             });
          });
     });
   
   })

