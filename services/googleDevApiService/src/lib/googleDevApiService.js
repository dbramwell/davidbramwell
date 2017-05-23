var google = require("googleapis");

function GoogleDevApi() {}

GoogleDevApi.prototype.getClient = function() {
  return new google.auth.JWT(
    process.env.client_email,
    null,
    process.env.private_key,
    ["https://www.googleapis.com/auth/androidpublisher"]
  );
}

GoogleDevApi.prototype.requestReviews = function(packageName, client, callback) {
  google.androidpublisher("v2").reviews.list({
    packageName: packageName,
    auth: client
  }, callback);
}

GoogleDevApi.prototype.getReviews = function(packageName, callback) {
  var client = this.getClient();
  var that = this;
  client.authorize(function (err) {
    that.requestReviews(packageName, client, callback);
  });
}

module.exports = GoogleDevApi;
