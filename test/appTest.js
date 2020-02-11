const chai = require("chai");
const chaiHttp = require("chai-http");
const { expect } = chai;
chai.use(chaiHttp);

const helpers = require("../helpers");
//const app = require("../app");

//auth module tests

describe("Testing Task Scheduling Backend", function() {
  // Test Helpers
  it("check that generateJwtToken returns non-numeric", function() {
    chai.assert.isNotNumber(helpers.generateJwtTest, "string");
  });

  it.skip("should successfully login on /api/personnel/login POST", done => {
    chai
      .request(app)
      .post("/personnel/login")
      .send({ phone: "0722222222", password: "123456" })
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.have.property("accessToken");
        done();
      });
  });
});
