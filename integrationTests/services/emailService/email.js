'use strict';

// tests for email
// Generated by serverless-mocha-plugin

const mod = require('../../../src/services/emailService/emailServiceHandler.js');
const mochaPlugin = require('serverless-mocha-plugin');

const lambdaWrapper = mochaPlugin.lambdaWrapper;
const expect = mochaPlugin.chai.expect;
const wrapped = lambdaWrapper.wrap(mod, { handler: 'email' });

describe('email', () => {
  before((done) => {
//  lambdaWrapper.init(liveFunction); // Run the deployed lambda

    done();
  });

  it('returns correct error when nodemailler env vars not set', () => {
    return wrapped.run({body: '{"name": "David", "fromEmail": "david@bramwell.co.uk", "content": "This is my email content"}'}).then((response) => {
      expect(response.status).to.equal(535);
      expect(response.error).to.equal('535 5.7.0 Mailgun is not loving your login or password');
    });
  });
});