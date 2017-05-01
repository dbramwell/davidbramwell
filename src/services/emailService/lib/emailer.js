var nodemailer = require('nodemailer');

function Emailer() {}

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

function getTransporter() {
	return nodemailer.createTransport({
		service: 'Mailgun',
		auth: {
			user: process.env.MAILGUN_EMAIL,
			pass: process.env.MAILGUN_PASS
		}
	});
}

Emailer.prototype.sendEmail = function(name, fromEmail, toEmail, content) {
	this.getTransporter().sendMail(getMailOptions(name, fromEmail, toEmail, content));
};

if (process.env.ENVIRONMENT === "test") {
	Emailer.prototype.generateContent = generateContent;
	Emailer.prototype.getMailOptions = getMailOptions;
	Emailer.prototype.getTransporter = getTransporter;
}

module.exports = Emailer;