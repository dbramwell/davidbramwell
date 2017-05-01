describe("emailer", function() {
  var Emailer = require('../../../../src/services/emailService/lib/emailer');

  beforeEach(function() {
    emailer = new Emailer();
    process.env.EMAIL = 'test@test.com';
  });

  it("should be able to generate correct email content", function() {
    const name = "David";
    const email = "david@bramwell.co.uk";
    const content = "This is my email content";
    const emailContent = emailer.generateContent(name, email, content);
    expect(emailContent).toEqual('<h2>Name:</h2>' +
    '<p>' + name + '</p><br>' +
    '<h2>Email:</h2>' +
    '<p>' + email + '</p><br>' +
    '<h2>Content:</h2>' +
    '<p>' + content + '</p>');
  });
});