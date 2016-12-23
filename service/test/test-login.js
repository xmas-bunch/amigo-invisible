const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const models = require('../models');
const should = chai.should();

chai.use(chaiHttp);

describe('login controller', function() {
    // Increase timeout for model creation
    this.timeout(3000);

    before(done => {
        models.User.sync({force: true})
            .then(() => {
                return models.User.create({
                    username: 'potato',
                    password: 'irish'
                })
            })
            .then(() => {
                done();
            })
            .catch(err => {
                console.log(err);
                done();
            });
    });

    it('should fail without username', done => {
        chai.request(server)
            .post('/session')
            .send({username: '', password: '123'})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    });

    it('should fail without password', done => {
        chai.request(server)
            .post('/session')
            .send({username: 'peter', password: ''})
            .end((err, res) => {
                res.should.have.status(400);
                done();
            })
    });

    it('should fail with invalid credentials', done => {
        chai.request(server)
            .post('/session')
            .send({username: 'potato', password: 'french'})
            .end((err, res) => {
                res.should.have.status(403);
                done();
            })
    });

    it('should succeed with valid credentials', done => {
        chai.request(server)
            .post('/session')
            .send({username: 'potato', password: 'irish'})
            .end((err, res) => {
                res.should.have.status(200);
                res.body.username.should.equal('potato');
                res.body.hasPassword.should.equal(true);
                done();
            });
    });
});
