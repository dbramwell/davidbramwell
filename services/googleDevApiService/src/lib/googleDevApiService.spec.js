describe("googleDevApiService", function() {
  const Api = require("./googleDevApiService");
  const google = require("googleapis");

  beforeEach(function() {
    process.env.client_email = "me@email.com";
    process.env.private_key = "private_key";
    api = new Api();
    expectedClient = new google.auth.JWT(
      process.env.client_email,
      null,
      process.env.private_key,
      ["https://www.googleapis.com/auth/androidpublisher"]
    );
  });

  it("getClient should create correct client", function() {
    expect(api.getClient()).toEqual(expectedClient);
  });

  it("requestReviews calls androidpublisher reviews.list with correct args", function() {
    const reviewsObject = {list: function(map, callback) {}};
    spyOn(google, "androidpublisher").and.returnValue({reviews: reviewsObject});
    spyOn(reviewsObject, "list");
    const cb = function(){}
    api.requestReviews("name.of.package", expectedClient, cb);
    expect(reviewsObject.list).toHaveBeenCalledWith({
      packageName: "name.of.package",
      auth: expectedClient
    }, cb);
  });

  it("getReviews authorizes the client and calls requestReviews", function() {
    const cb = function() {};
    spyOn(expectedClient, "authorize").and.callThrough();
    spyOn(api, "getClient").and.returnValue(expectedClient);
    spyOn(api, "requestReviews");
    api.getReviews("test", cb);
    expect(api.getClient).toHaveBeenCalled();
    expect(expectedClient.authorize).toHaveBeenCalledWith(jasmine.any(Function));
    expect(api.requestReviews).toHaveBeenCalledWith("test", expectedClient, cb);
  });
});
