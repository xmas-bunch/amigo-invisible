const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const db = require('../db');
const models = require('../models');
const should = chai.should();

chai.use(chaiHttp);

describe('gifts controllers', function() {
    // Increase timeout because of bootstrap
    this.timeout(5000);

    before(done => {
        db.sync({force: true})
            .then(() => {
                return models.bootstrapDB();
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });

    it('should not find user with invalid id (GET)', done => {
        chai.request(server)
            .get('/users/456/gifts')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.info.should.equal('user not found');
                done();
            });
    });

    it('should not find user with invalid id (POST)', done => {
        chai.request(server)
            .post('/users/456/gifts')
            .end((err, res) => {
                res.should.have.status(404);
                res.body.info.should.equal('user not found');
                done();
            });
    });

    it('should draw up to two gifts', done => {
        chai.request(server)
            .post('/users/1/gifts')
            .then(res => {
                // First draw, OK
                res.should.have.status(201);
                res.body.info.should.equal('gift drawn');
                return chai.request(server).post('/users/1/gifts');
            })
            .then(res => {
                // Second draw, OK
                res.should.have.status(201);
                res.body.info.should.equal('gift drawn');
                return chai.request(server).get('/users/1/gifts');
            })
            .then(res => {
                // Get user gifts, should be 2
                res.should.have.status(200);
                res.body.should.have.length(2);

                // Finally, try again, cannot
                chai.request(server).post('/users/1/gifts')
                    .end((err, res) => {
                        res.should.have.status(400);
                        res.body.info.should.equal('gifts limit reached');
                        done();
                    });
            });
    });

    it('should not draw if there are no gifts unassigned', done => {
        // Set all gifts to a giver (not realistic but ideal testing scenario)
        models.Gift.update(
            {
                giverId: 1
            },
            {
                where: {giverId: null}
            }
        )
            .then(() => {
                // Try to draw for another user
                chai.request(server)
                    .post('/users/2/gifts')
                    .end((err, res) => {
                        // Cannot because everything's assigned
                        res.should.have.status(500);
                        done();
                    });
            });
    });
});
