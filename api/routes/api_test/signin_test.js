'use strict';

const app = require('../../../server');
const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');

chai.use(chaiHttp);

describe('API Integration Tests', () => {
  describe('#POST / signin', () => { 
    it('should sign in', done => { 
      chai.request(app)
        .post('/api/signin')
        .set('content-type', 'application/x-www-form-urlencoded')
        .send({
          username: 'Michael10',
          password: '123'
        })
        .end((err, res) => {
          if (err) done(err);
          else {
            const { success, user } = res.body;
            expect(success).to.equal(true); 
            expect(user.email).to.equal('a@aa.aa'); 
            done();             
          }
        }); 
    });
  });
});