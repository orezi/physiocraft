"use strict";
var mongoose = require('mongoose');
require("../../app/models/user.model");
var User = mongoose.model("User");


describe("User Model", function(done) {
  beforeEach(function(done) {
    User.remove({}, function(err) {
      done();
    })

  });

  describe("validations", function() {

    it("should not accept entry without firstname", function(done) {
      var user = new User({
        firstname: "",
        lastname: "doe",
        email: "john@gmail.com",
        password: "1234567",
        admin: true,
        operation: false,
        verified: true
      });
      user.save(function(err) {
        expect(err).not.toBe(null);
        done();
      });
    });

    it("should not accept entry without lastname", function(done) {
      var user = new User({
        firstname: "john",
        lastname: "",
        email: "john@gmail.com",
        password: "1234567",
        admin: true,
        operation: false,
        verified: true
      });
      user.save(function(err) {
        expect(err).not.toBe(null);
        done();
      });
    });

    it("should not accept entry without email", function(done) {
      var user = new User({
        firstname: "john",
        lastname: "doe",
        email: "",
        password: "1234567",
        admin: true,
        operation: false,
        verified: true
      });
      user.save(function(err) {
        expect(err).not.toBe(null);
        done();
      });
    });

    it("should not accept entry without password", function(done) {
      var user = new User({
        firstname: "john",
        lastname: "doe",
        email: "john@gmail.com",
        password: "",
        admin: true,
        operation: false,
        verified: true
      });
      user.save(function(err) {
        expect(err).not.toBe(null);
        done();
      });
    });

    it("should accept entry when all fields are valid", function(done) {
      var user = new User({
        firstname: "john",
        lastname: "doe",
        email: "john@gmail.com",
        password: "1234567",
        admin: true,
        operation: false,
        verified: true
      });
      user.save(function(err) {
        expect(err).toBe(null);
        done();
      });
    });

  });
});
