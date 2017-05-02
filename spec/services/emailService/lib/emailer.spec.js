var nodemailer = require('nodemailer');
var mockTransport = require('nodemailer-mock-transport');

describe("emailer", function() {
  var Emailer = require('../../../../src/services/emailService/lib/emailer');

  beforeEach(function() {
    emailer = new Emailer();
    name = "David";
    fromEmail = "david@bramwell.co.uk";
    toEmail = "to@email.com";
    content = "This is my email content";
    process.env.MAILGUN_EMAIL = "mailgun@email.com";
    process.env.MAILGUN_PASS = "mailgun_password";
  });

  it("should be able to generate correct email content", function() {
    const emailContent = emailer.generateContent(name, fromEmail, content);
    expect(emailContent).toEqual('<h2>Name:</h2>' +
      '<p>' + name + '</p><br>' +
      '<h2>Email:</h2>' +
      '<p>' + fromEmail + '</p><br>' +
      '<h2>Content:</h2>' +
      '<p>' + content + '</p>');
  });

  it("getMailOptions should return the correct map of mail options", function() {
    const options = emailer.getMailOptions(name, fromEmail, toEmail, content);
    expect(options).toEqual({
      from: fromEmail,
      to: toEmail,
      subject: 'Website contact from ' + fromEmail,
      html: emailer.generateContent(name, fromEmail, content)
    });
  });

  it("emailer is initialised with transporter of nodemailer transport for mailgun service", function() {
    expect(emailer.transporter.options.service).toEqual('Mailgun');
    expect(emailer.transporter.options.auth.user).toEqual(process.env.MAILGUN_EMAIL);
    expect(emailer.transporter.options.auth.pass).toEqual(process.env.MAILGUN_PASS);
  });

  it('sendEmail should send correct mail', function() {
    const transport = mockTransport();
    emailer.transporter = nodemailer.createTransport(transport);
    emailer.sendEmail(name, fromEmail, toEmail, content, function(){});
    expect(transport.sentMail.length).toEqual(1);
    expect(transport.sentMail[0].data.to).toEqual(toEmail);
    expect(transport.sentMail[0].data.from).toEqual(fromEmail);
    expect(transport.sentMail[0].message.content).toEqual(
      '<h2>Name:</h2>' +
      '<p>' + name + '</p><br>' + 
      '<h2>Email:</h2>' + 
      '<p>' + fromEmail + '</p><br>' +
      '<h2>Content:</h2><p>' + content + '</p>');
    expect(transport.sentMail[0].data.subject).toEqual('Website contact from ' + fromEmail);
  });

  it('sendEmail should return error if error occurs', function() {
    const transport = mockTransport();
    emailer.transporter = nodemailer.createTransport(transport);
    emailer.sendEmail(name, fromEmail, toEmail, content, function(){});
    expect(transport.sentMail.length).toEqual(1);
    expect(transport.sentMail[0].data.to).toEqual(toEmail);
    expect(transport.sentMail[0].data.from).toEqual(fromEmail);
    expect(transport.sentMail[0].message.content).toEqual(
      '<h2>Name:</h2>' +
      '<p>' + name + '</p><br>' + 
      '<h2>Email:</h2>' + 
      '<p>' + fromEmail + '</p><br>' +
      '<h2>Content:</h2><p>' + content + '</p>');
    expect(transport.sentMail[0].data.subject).toEqual('Website contact from ' + fromEmail);
  });
});