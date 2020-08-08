const request = require("request");

exports.handler = function (event, context, callback) {
  const reqHeaders = {
    referer: event.headers["referer"],
    "user-agent": event.headers["user-agent"],
  };

  const reqQuery = event.queryStringParameters;
  reqQuery["ignore-dnt"] = true; // this isn't nefarious, we're not tracking in the first place!

  const reqOptions = {
    method: "GET",
    url: "https://queue.simpleanalyticscdn.com/simple.gif",
    headers: reqHeaders,
    qs: reqQuery,
  };

  request(reqOptions, (error, response, body) => {
    if (error) {
      console.error(error);

      callback(null, {
        statusCode: 500,
      });
    } else {
      console.info(response.statusCode, response.headers["simple-analytics-feedback"]);

      const resHeaders = {
        "content-type": response.headers["content-type"],
        "cache-control": "no-cache, no-store, must-revalidate",
        expires: "0",
        pragma: "no-cache",
        "x-api-feedback": response.headers["simple-analytics-feedback"],
        "x-api-destination": response.headers["simple-analytics-location"],
      };

      callback(null, {
        statusCode: response.statusCode,
        headers: resHeaders,
        body: body,
      });
    }
  });
};
