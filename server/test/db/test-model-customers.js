'use strict';
var config = require('../../config/settings')
  , util = require('util')
  , mongoose = require('mongoose')
  , should = require('should')
  , Customer = require('../../models/customer')
  , Organisation = require('../../models/organisation');

/* connect to a test database */
mongoose.connect('mongodb://localhost/security_app_test');
process.env.NODE_ENV = 'test';

var currentCustomer = null;
var _customer = {name: 'test customer', company: 'test company'};
var _user = {domain: '57583497342d58072b6342dd'};

beforeEach(function (done) {
  Customer.create(_user, _customer.name, _customer.company, function (err, doc) {
    currentCustomer = doc;
    done();
  });
});

afterEach(function (done) {
  Customer.model.remove({}, function () {
    done();
  });
});

describe('Customers: models', function () {
  it('should create a new Customer', function (done) {
    _customer.name += '2';
    var customer = Customer.create(_user, _customer, function (err, cust) {
      should.not.exist(err);
      should.exist(cust);
      cust.name.should.equal(_customer.name+'2');
      _user.domain.should.equal(util.inspect(cust.organisation));
      cust.company.should.equal(_customer.company);
      done();
    });
  });

  it('should find a customer by name', function (done) {
    Customer.findByName(_user, _customer.name, function (err, cust) {
      should.not.exist(err);
      should.exist(cust);
      cust[0].name.should.equal(_customer.name);
      done();
    });
  });
});
