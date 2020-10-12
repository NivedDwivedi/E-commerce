let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require(`../index`);


let token = process.env.TEST_TOKEN
//update  a customer
describe("E-Commerce", () => {
    describe("Customers", () => {

        let customerPayload ={
            "city":"Meerut",
            "country":"India",
            "phone":9457395378
        }

        it(`it should UPDATE the details of the customer`, (done) => {
        chai.request(server)
          .put("/customer/")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Updated Information Sucessfully");
                done();
             });
          });
     });
   
   })

//Get a customer by id. The customer is fetched by token
describe("E-Commerce", () => {
 describe("Customers", () => {
     it(`it should GET details of the customer`, (done) => {
     chai.request(server)
       .get("/customer/")
       .set('Authorization', token)
       .end((err, res) => {
            (res).should.have.status(200);
             
            (res.body).should.be.a("object");
             
            res.should.be.json;
             
            (res.body).should.have.property('data');
            (res.body.data).should.be.a('object');

            (res.body.data).should.have.property('id');
            (res.body.data).should.have.property('name');
            (res.body.data).should.have.property('email');
            (res.body.data).should.have.property('phone_number');
            (res.body.data).should.have.property('credit_card');
            (res.body.data).should.have.property('address');
            (res.body.data).should.have.property('city');
            (res.body.data).should.have.property('country');

             done();
          });
       });
  });

})

// //Registers a customer
// describe("E-Commerce", () => {
//     describe("Customers", () => {

//         let customerPayload ={
//             "name":"Nived",
//             "email":"nived@gmail.com",
//             "address":"",
//             "city":"",
//             "country":"",
//             "phone":9457395385,
//             "card":"",
//             "password":"12345"
//         }

//         it(`it should Signupthe customer`, (done) => {
//         chai.request(server)
//           .post("/Customers/signup")
//           .set('Authorization', token)
//           .send(customerPayload)
//           .end((err, res) => {
//                 (res).should.have.status(200);
//                 (res.body).should.be.a("object");
//                 res.should.be.json;
//                 (res.body).should.have.property('data');
//                 (res.body.data).should.be.a('string');
//                 (res.body.data).should.be.eq(`Success!, Your UserId is: ${userID}`);
//                 done();
//              });
//           });
//      });
   
//    })

//Sign in to the app
describe("E-Commerce", () => {
    describe("Customers", () => {

        let customerPayload ={
            "email":"nived@gmail.com",
            "password":"12345"
        }

        it(`it should login the customer`, (done) => {
        chai.request(server)
          .post("/customer/login")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                done();
             });
          });
     });
   
   })

//Update the address for the customer
describe("E-Commerce", () => {
    describe("Customers", () => {

        let customerPayload ={
            "address":"Meerut Cantt"
        }

        it(`it should UPDATE the address of the customer`, (done) => {
        chai.request(server)
          .put("/customer/address")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Address Updated Sucessfully");
                done();
             });
          });
     });
   
   })


//Updates the credit card of a customer
describe("E-Commerce", () => {
    describe("Customers", () => {

        let customerPayload ={
            "card":"ahiuafahfgwfgslf"
        }

        it(`it should UPDATE the credit card details of the customer`, (done) => {
        chai.request(server)
          .put("/customer/creditcard")
          .set('Authorization', token)
          .send(customerPayload)
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Credit Card Details Updated Sucessfully");
                done();
             });
          });
     });
   
   })

