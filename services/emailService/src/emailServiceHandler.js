var Emailer = require("./lib/emailer");
this.emailer = new Emailer();

module.exports.email = (event, context, callback) => {
  var params = JSON.parse(event.body);
  this.emailer.sendEmail(params.name,
    params.fromEmail,
    process.env.TO_EMAIL,
    params.content,
    function(error, info) {
      callback(null, {
        statusCode: error ? error.responseCode : 200,
				body: error ? JSON.stringify({error: error.response}) : "{}",
			  headers: {
			    "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
			    "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
			  }
			});
    }
  );
};
