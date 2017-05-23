describe("reviewServiceHandler", function() {
  const ReviewServiceHandler = require('./reviewServiceHandler');

  beforeEach(function() {
    event = {
      "pathParameters":{
         "packageName":"com.bramrash.bidmasBodmas"
      }
    };
    process.env.client_email = "me@email.com";
    process.env.private_key = "private_key";
  });

  it('should call getReviews with correct args', function() {
    const api = {getReviews: function(packageName, callback){}};
    ReviewServiceHandler.api = api;
    spyOn(api, "getReviews");
    var cb = function(){};
    ReviewServiceHandler.reviews(event, null, cb);
    expect(api.getReviews).toHaveBeenCalledWith(event.pathParameters.packageName, jasmine.any(Function));
  });

  it('should call callback with correct response if no error', function(done) {
    const reviews = [{"authorName": "The Author"}];
    const api = {getReviews: function(packageName, callback) {
      callback(null, {reviews: reviews});
    }};
    ReviewServiceHandler.api = api;
    const expectedResponse = {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(reviews)
    };
    ReviewServiceHandler.reviews(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });

  it('should call callback with correct response if error', function(done) {
    const error = {errorMessage: "Some kind of error"};
    const api = {getReviews: function(packageName, callback) {
      callback(error, null);
    }};
    ReviewServiceHandler.api = api;
    const expectedResponse = {
      statusCode: 500,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(error)
    };
    ReviewServiceHandler.reviews(event, null, function(something, response) {
      expect(response).toEqual(expectedResponse);
      done();
    });
  });
});
