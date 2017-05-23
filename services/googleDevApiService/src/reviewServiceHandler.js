var GoogleDevApi = require('./lib/googleDevApiService');
this.api = new GoogleDevApi();

module.exports.reviews = (event, context, callback) => {
  this.api.getReviews(event.pathParameters.packageName, function(err, body) {
    const response = {
      statusCode: err ? 500 : 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(err ? err : body.reviews)
    };
    callback(null, response);
  });
};
