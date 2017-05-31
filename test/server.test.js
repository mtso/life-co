const app = require('../build/server')
const request = require('supertest')
const expect = require('chai').expect

describe('/api/checkin', function() {
  describe('POST', function() {
    it('should succeed for the first time', function(done) {
      request(app)
        .post('/api/checkin')
        .send({ business: 'test-business-id' })
        .then((resp) => {
          expect(resp.body).to.be.defined
          done()
        })
        .catch((err) => done(err))
    })

    it('should fail for the second time', function(done) {
      done()
    })
  })
})
