let chai = require("chai");
let chaiHttp = require("chai-http");
var should = chai.should();
chai.use(chaiHttp);
let server = require(`../index`);
describe("E-Commerce", () => {
 describe("Categories", () => {
     it(`it should GET all the categories`, (done) => {
     chai.request(server)
       .get("/categories/")
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
  describe("Categories", () => {
      it(`it should GET name and description of the category`, (done) => {
      chai.request(server)
        .get("/categories/1")
        .end((err, res) => {
              (res).should.have.status(200);
              (res.body).should.be.a("object");
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
  describe("Categories", () => {
      it(`it should GET Category Id and Category Name the product`, (done) => {
      chai.request(server)
        .get("/categories/inProduct/1")
        .end((err, res) => {
              (res).should.have.status(200);
              (res.body).should.be.a("object");
              (res.body).should.have.property('data');
              (res.body.data).should.be.a('array');
              if( res.body.data.length > 0)
              {
                 
                (res.body.data[0]).should.have.property('categoryId');
                (res.body.data[0]).should.have.property('categoryName');
             }
              done();
           });
        });
   });
 
 })

