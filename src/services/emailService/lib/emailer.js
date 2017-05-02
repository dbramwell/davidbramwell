var nodemailer = require('nodemailer');

function Emailer() {
	this.transporter = nodemailer.createTransport({
		service: 'Mailgun',
		auth: {
			user: process.env.MAILGUN_EMAIL,
			pass: process.env.MAILGUN_PASS
		}
	});
}

function generateContent(name, email, content) {
	return '<h2>Name:</h2>' +
		'<p>' + name + '</p><br>' +
		'<h2>Email:</h2>' +
		'<p>' + email + '</p><br>' +
		'<h2>Content:</h2>' +
		'<p>' + content + '</p>'
}

function getMailOptions(name, fromEmail, toEmail, content) {
	return {
		from: fromEmail,
		to: toEmail,
		subject: 'Website contact from ' + fromEmail,
		html: generateContent(name, fromEmail, content)
	};
}

Emailer.prototype.sendEmail = function(name, fromEmail, toEmail, content, cb) {
	this.transporter.sendMail(getMailOptions(name, fromEmail, toEmail, content), function(error, info) {
		if (error) {
			cb(null, {statusCode: error.responseCode,
				body: JSON.stringify({error: error.response}),
			    headers: {
			        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
			        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
			    }
			});
		} else {
			cb(null, {statusCode: 200,
				headers: {
			        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
			        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS 
			    }
			});
		}
	});
};

if (process.env.ENVIRONMENT === "test") {
	Emailer.prototype.generateContent = generateContent;
	Emailer.prototype.getMailOptions = getMailOptions;
}

module.exports = Emailer;