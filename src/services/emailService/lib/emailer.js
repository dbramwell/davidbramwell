function Emailer() {}

function generateContent(name, email, content) {
	return '<h2>Name:</h2>' +
		'<p>' + name + '</p><br>' +
		'<h2>Email:</h2>' +
		'<p>' + email + '</p><br>' +
		'<h2>Content:</h2>' +
		'<p>' + content + '</p>'
}

if (process.env.ENVIRONMENT === "test") {
	Emailer.prototype.generateContent = generateContent
}

module.exports = Emailer;