const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('coffee controllers', function () {

  it('should not know how to make coffee', function(done) {
    chai.request(server)
    .post('/coffee')
    .end(function (err, res) {
      res.should.have.status(418);
      done();
    });
  });
});
