describe("emailServiceHandler", function() {
  const EmailServiceHandler = require('../../../src/services/emailService/emailServiceHandler');

  beforeEach(function() {
    params = {name: "David", fromEmail: "david@bramwell.co.uk", content: "This is my email content"};
    event = {
      body: JSON.stringify(params)
    };
    process.env.TO_EMAIL = "to@email.com";
  });

  it('should call emailer.sendEmail with correct args', function() {
    const emailer = {sendEmail: function(name, fromEmail, toEmail, content){}};
    EmailServiceHandler.emailer = emailer;
    spyOn(emailer, "sendEmail");
    var cb = function(){};
    EmailServiceHandler.email(event, null, cb);
    expect(emailer.sendEmail).toHaveBeenCalledWith(
      params.name,
      params.fromEmail,
      process.env.TO_EMAIL,
      params.content,
      cb
    );
  });

  it('should return error message if sendEmail returns error', function() {
    const emailer = {sendEmail: function(name, fromEmail, toEmail, content){}};
    EmailServiceHandler.emailer = emailer;
    const expectedResponse = {status: 500, error: "email not sent"};
    spyOn(emailer, "sendEmail").and.returnValue(expectedResponse);
    EmailServiceHandler.email(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
    });
  });

  it('should return success status if sendEmail returns success', function() {
    const emailer = {sendEmail: function(name, fromEmail, toEmail, content){}};
    EmailServiceHandler.emailer = emailer;
    const expectedResponse = {status: 200}
    spyOn(emailer, "sendEmail").and.returnValue(expectedResponse);
    EmailServiceHandler.email(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
    });
  });
});