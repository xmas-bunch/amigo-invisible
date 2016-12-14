const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const db = require('../db');
const models = require('../models');
const should = chai.should();

chai.use(chaiHttp);

describe('gifts controllers', function () {
    this.timeout(5000);

    before(function (done) {
        db.sync({force: true})
            .then(function () {
                return models.bootstrapDB();
            })
            .then(function () {
                done();
            })
            .catch(function (err) {
                console.log(err);
                done();
            });
    });

    it('should not find user with invalid id (GET)', function(done) {
        chai.request(server)
            .get('/users/456/gifts')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.error.should.equal('user not found');
                done();
            });
    });

    it('should not find user with invalid id (POST)', function(done) {
        chai.request(server)
            .post('/users/456/gifts')
            .end(function (err, res) {
                res.should.have.status(404);
                res.body.error.should.equal('user not found');
                done();
            });
    });

    it('should draw up to two gifts', function(done) {
        chai.request(server)
            .post('/users/1/gifts')
            .then(function (res) {
                // First draw, OK
                res.should.have.status(201);
                res.body.ok.should.equal('gift drawn');
                return chai.request(server).post('/users/1/gifts');
            })
            .then(function (res) {
                // Second draw, OK
                res.should.have.status(201);
                res.body.ok.should.equal('gift drawn');
                return chai.request(server).get('/users/1/gifts');
            })
            .then(function (res) {
                // Get user gifts, should be 2
                res.should.have.status(200);
                res.body.should.have.length(2);

                // Finally, try again, cannot
                chai.request(server)
                    .post('/users/1/gifts')
                    .end(function (err, res) {
                        res.should.have.status(400);
                        res.body.error.should.equal('gifts limit reached');
                        done();
                    });
            });
    });

    it('should not draw if there are no gifts unassigned', function (done) {
        // Set all gifts to a giver (not realistic but ideal testing scenario)
        models.Gift.update(
            {
                giverId: 1
            },
            {
                where: {giverId: null}
            }
        )
            .then(function () {
                // Try to draw for another user
                chai.request(server)
                    .post('/users/2/gifts')
                    .end(function (err, res) {
                        // Cannot because everything's assigned
                        res.should.have.status(500);
                        done();
                    });
            });
    });
});
