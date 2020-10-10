let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require(`../index`);
describe("E-Commerce", () => {
 describe("Products", () => {
     it(`it should GET id and name of all the product`, (done) => {
     chai.request(server)
       .get("/products/")
       .end((err, res) => {
        (res).should.have.status(200);
             
        (res.body).should.be.a("object");
        
        res.should.be.json;
        
        (res.body).should.have.property('data');
        (res.body.data).should.be.a('array');
        if( res.body.data.length > 0)
        {
            (res.body.data[0]).should.have.property('id');
            (res.body.data[0]).should.have.property('name');
        
        }
             done();
          });
       });
  });

})


describe("E-Commerce", () => {
    describe("Products", () => {
        it(`it should GET name and description of the product`, (done) => {
        chai.request(server)
          .get("/products/2")
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
        
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('array');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('name');
                    (res.body.data[0]).should.have.property('description');
                
                }
                done();
             });
          });
     });

})



describe("E-Commerce", () => {
    describe("Products", () => {
        it(`it should GET name of all the products in the category`, (done) => {
        chai.request(server)
          .get("/products/category/2")
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
        
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('array');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('productId');
                    (res.body.data[0]).should.have.property('productName');
                
                }
                done();
             });
          });
     });

})



describe("E-Commerce", () => {
    describe("Products", () => {
        it(`it should GET all detail of the product`, (done) => {
        chai.request(server)
          .get("/products/2/details")
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
        
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('array');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('id');
                    (res.body.data[0]).should.have.property('name');
                    (res.body.data[0]).should.have.property('description');
                    (res.body.data[0]).should.have.property('price');
                
                }
                done();
             });
          });
     });

})




describe("E-Commerce", () => {
    describe("Products", () => {
        it(`it should GET name of all the category`, (done) => {
        chai.request(server)
          .get("/products/1/review")
          .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a("object");
                res.should.be.json;
        
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('array');
                if( res.body.data.length > 0)
                {
                    (res.body.data[0]).should.have.property('email');
                    (res.body.data[0]).should.have.property('review');
                    (res.body.data[0]).should.have.property('rating');
                    
                
                }
                done();
             });
          });
     });

})