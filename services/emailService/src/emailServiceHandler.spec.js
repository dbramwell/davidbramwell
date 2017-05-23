describe("emailServiceHandler", function() {
  const EmailServiceHandler = require("./emailServiceHandler");

  beforeEach(function() {
    params = {name: "David", fromEmail: "david@bramwell.co.uk", content: "This is my email content"};
    event = {
      body: JSON.stringify(params)
    };
    process.env.TO_EMAIL = "to@email.com";
  });

  it("should call emailer.sendEmail with correct args", function() {
    spyOn(EmailServiceHandler.emailer, "sendEmail");
    var cb = function(){};
    EmailServiceHandler.email(event, null, cb);
    expect(EmailServiceHandler.emailer.sendEmail).toHaveBeenCalledWith(
      params.name,
      params.fromEmail,
      process.env.TO_EMAIL,
      params.content,
      jasmine.any(Function)
    );
  });

  it("should return error message if sendEmail returns error", function(done) {
    const expectedResponse = {
      statusCode: 500,
      body: '{"error":"email not sent"}',
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      }
    };
    spyOn(EmailServiceHandler.emailer, "sendEmail").and.callFake(function(name, fromEmail, toEmail, content, cb) {
      cb({responseCode: 500, response: "email not sent"}, null);
    });
    EmailServiceHandler.email(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });

  it("should return success status if sendEmail returns success", function(done) {
    const expectedResponse = {
      statusCode: 200,
      body: "{}",
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      }
    };
    spyOn(EmailServiceHandler.emailer, "sendEmail").and.callFake(function(name, fromEmail, toEmail, content, cb) {
      cb(null, null);
    });
    EmailServiceHandler.email(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });
});
