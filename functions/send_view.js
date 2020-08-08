const request = require("request");

exports.handler = function (event, context, callback) {
  // if triggered as an image without JS (i.e. from AMP pages) set `?noscript=true`
  const noScript = event.queryStringParameters["noscript"] === "true";

  // https://docs.simpleanalytics.com/without-javascript
  const endpointPath = noScript ? "noscript.gif" : "simple.gif";
  const endpointUrl = "https://queue.simpleanalyticscdn.com/" + endpointPath;

  // pass these headers along to SA
  const reqHeaders = {
    referer: event.headers["referer"],
    "user-agent": event.headers["user-agent"],
  };

  // pass these URL parameters along to SA
  const reqQuery = event.queryStringParameters;
  reqQuery["ignore-dnt"] = "true"; // this isn't nefarious, we're not tracking in the first place!

  const reqOptions = {
    method: "GET",
    url: endpointUrl,
    headers: reqHeaders,
    qs: reqQuery,
  };

  request(reqOptions, (error, response, body) => {
    console.info(`Proxying ${event.queryStringParameters["type"]} to ${endpointPath} ...`);

    if (error) {
      // this indicates a function error, NOT an error returned from SA
      console.error(error);

      callback(null, {
        statusCode: 500,
      });
    } else {
      console.info(response.statusCode, response.headers["simple-analytics-feedback"]);

      // imitate the headers that would normally be sent back from SA's pixel
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
