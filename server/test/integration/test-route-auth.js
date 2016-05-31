var request = require('supertest')
  , app = require('../../index');

  describe('GET /api/v1/auth/login', function () {
    it ('responds with a 403 Forbidden status code', function (done) {
      request(app)
        .get('/api/v1/auth/login')
        .expect(403, done);
    });
  });

  describe('POST /api/v1/auth/login', function () {
    it ('responds with a 401 unauthorized status code for an incorrect password', function (done) {
      request(app)
        .post('/api/v1/auth/login')
        .field('username', 'test')
        .field('password', 'incorrect_password')
        .expect(401, done);
    });
  });
