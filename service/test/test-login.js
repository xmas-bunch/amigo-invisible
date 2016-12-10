const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const models = require('../models');
const should = chai.should();

chai.use(chaiHttp);

describe('login controller', function() {
  this.timeout(10000);

  before(function (done) {
    models.User.sync({force: true})
    .then(function () {
      return models.User.create({
        username: 'potato',
        password: 'irish'
      })
    })
    .then(function () {
      done();
    })
    .catch(function (err) {
      done();
    });
  });

  it('should fail without username', function (done) {
    chai.request(server)
    .post('/session')
    .send({username: '', password: '123'})
    .end(function (err, res) {
      res.should.have.status(400);
      done();
    })
  });

  it('should fail without password', function (done) {
    chai.request(server)
    .post('/session')
    .send({username: 'peter', password: ''})
    .end(function (err, res) {
      res.should.have.status(400);
      done();
    })
  });

  it('should fail with invalid credentials', function (done) {
    chai.request(server)
    .post('/session')
    .send({username: 'potato', password: 'french'})
    .end(function (err, res) {
      res.should.have.status(403);
      done();
    })
  });

  it('should succeed with valid credentials', function (done) {
    chai.request(server)
    .post('/session')
    .send({username: 'potato', password: 'irish'})
    .end(function (err, res) {
      res.should.have.status(200);
      res.body.username.should.equal('potato');
      res.body.hasPassword.should.equal(true);
      done();
    });
  });
});
