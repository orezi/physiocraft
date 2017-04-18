'use strict';
var request = require('supertest');
var mongoose = require('mongoose');
var app = require('../../server');
require('../../app/models/user.model');
var User = mongoose.model('User');

describe("User", function() {
  beforeEach(function(done) {
    var user = new User({
      firstname: 'john',
      lastname: 'doe',
      email: 'john@gmail.com',
      password: '1234567',
      admin: true,
      operation: true,
      verified: true
    });
    user.save(function(err, users) {
      done();
    });
  });

  afterEach(function(done) {
    User.remove({}, function() {
      done();
    });
  });

  describe("Routes", function() {
    it("should create a new user", function(done) {
      request(app)
        .post('/api/users')
        .set('Content-Type', 'application/json')
        .send({
          firstname: 'jason',
          lastname: 'mason',
          email: 'jason@gmail.com',
          password: '1234567',
          admin: false,
          operation: true,
          verified: true
        })
        .end(function(err, response) {
          expect(response.body.firstname).toBe('jason');
          expect(response.body.lastname).toBe('mason');
          done();
        });
    });

    it("should get all users", function(done) {
      request(app)
        .get('/api/users')
        .set('Content-Type', 'application/json')
        .end(function(err, response) {
          expect(response.body.length).toEqual(1);
          done();
        });
    });

    it("should log a user in", function(done) {
      request(app)
        .post('/api/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: '1234567'
        })
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            success: true,
            message: 'Enjoy your token'
          }));
          done();
        });
    });

    it("should get a specific physio", function(done) {
      request(app)
        .post('/api/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: '1234567'
        })
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            success: true,
            message: 'Enjoy your token',
          }));
          var userId = res.body.user._id;
          var userToken = res.body.token;
          request(app)
            .get('/api/physio/' + userId + '?token=' + userToken)
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
              expect(res.body.length).toEqual(1);
              expect(res.body[0].firstname).toBe('john');
              done();
            });
        });
    });
    //login before deleting a user
    it("should delete a specific physio", function(done) {
      request(app)
        .post('/api/authenticate')
        .set('Content-Type', 'application/json')
        .send({
          email: 'john@gmail.com',
          password: '1234567'
        })
        .end(function(err, res) {
          expect(res.body).toEqual(jasmine.objectContaining({
            success: true,
            message: 'Enjoy your token',
          }));
          var userId = res.body.user._id;
          var userToken = res.body.token;
          //attach userId and token to url before deleting user
          request(app)
            .delete('/api/physio/' + userId + '?token=' + userToken)
            .set('Content-Type', 'application/json')
            .end(function(err, res) {
              expect(res.body).toEqual(jasmine.objectContaining({
                success: true,
                message: 'physio has been deleted'
              }));
              done();
            });
        });
    });
  });
});


