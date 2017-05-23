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

Emailer.prototype.generateContent = function(name, email, content) {
	return '<h2>Name:</h2>' +
		'<p>' + name + '</p><br>' +
		'<h2>Email:</h2>' +
		'<p>' + email + '</p><br>' +
		'<h2>Content:</h2>' +
		'<p>' + content + '</p>'
}

Emailer.prototype.getMailOptions = function(name, fromEmail, toEmail, content) {
	return {
		from: fromEmail,
		to: toEmail,
		subject: 'Website contact from ' + fromEmail,
		html: this.generateContent(name, fromEmail, content)
	};
}

Emailer.prototype.sendEmail = function(name, fromEmail, toEmail, content, cb) {
	this.transporter.sendMail(this.getMailOptions(name, fromEmail, toEmail, content), cb);
};

module.exports = Emailer;
