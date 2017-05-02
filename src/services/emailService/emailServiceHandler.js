'use strict';

var Emailer = require("./lib/emailer");
this.emailer = new Emailer();

module.exports.email = (event, context, callback) => {
  var params = JSON.parse(event.body);
  this.emailer.sendEmail(params.name,
    params.fromEmail,
    process.env.TO_EMAIL,
    params.content,
    callback);
};