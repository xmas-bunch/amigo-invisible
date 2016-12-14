const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const models = require('../models');
const should = chai.should();

chai.use(chaiHttp);

describe('users controllers', function () {

    before(function (done) {
        models.User.sync({force: true})
            .then(function () {
                return models.User.bulkCreate([
                    {username: 'peter', password: '123'},
                    {username: 'mike'}
                ]);
            })
            .then(function () {
                done();
            })
            .catch(function (err) {
                console.log(err);
                done();
            })
    });

    it('should return list of users', function (done) {
        chai.request(server)
            .get('/users')
            .end(function (err, res) {
                res.should.have.status(200);
                res.body[0].username.should.equal('peter');
                res.body[0].hasPassword.should.equal(true);
                res.body[1].username.should.equal('mike');
                res.body[1].hasPassword.should.equal(false);
                done();
            })
    });

    it('should not update user with missing data', function (done) {
        chai.request(server)
            .put('/users/2')
            .send({username: 'mary'})
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.info.should.equal('password missing');
                done();
            })
    });

    it('should not update user with mismatched passwords', function (done) {
        chai.request(server)
            .put('/users/2')
            .send({password1: '123', password2: '234'})
            .end(function (err, res) {
                res.should.have.status(400);
                res.body.info.should.equal('password mismatch');
                done();
            })
    });

    it('should not find user with invalid id', function (done) {
        chai.request(server)
            .put('/users/345')
            .send({username: 'mary', password1: '123', password2: '123'})
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.info.should.equal('user not found');
                done();
            })
    });

    it('should update user with valid data', function (done) {
        chai.request(server)
            .put('/users/2')
            .send({password1: '123', password2: '123'})
            .then(function (res) {
                res.should.have.status(200);
                res.body.info.should.equal('user updated');
                return chai.request(server).get('/users');
            })
            .then(function (res) {
                res.body[1].username.should.equal('mike');
                res.body[1].hasPassword.should.equal(true);
                done();
            })
            .catch(function (err) {
                console.log(err);
            });
    });
});
