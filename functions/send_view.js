const axios = require("axios");

exports.handler = function (event, context, callback) {
  // if triggered as an image without JS (i.e. from AMP pages) set `?noscript=true`
  const noScript = event.queryStringParameters["noscript"] === "true";

  // https://docs.simpleanalytics.com/without-javascript
  const endpointPath = noScript ? "noscript.gif" : "simple.gif";
  const endpointUrl = "https://queue.simpleanalyticscdn.com/" + endpointPath;

  // pass these headers along to SA
  const reqHeaders = {
    referer: event.headers["referer"] || "",
    "user-agent": event.headers["user-agent"] || "",
  };

  // pass these URL parameters along to SA
  const reqQuery = event.queryStringParameters;
  reqQuery["ignore-dnt"] = "true"; // this isn't nefarious, we're not tracking in the first place!

  const reqConfig = {
    method: "GET",
    url: endpointUrl,
    headers: reqHeaders,
    params: reqQuery,
    timeout: 3000,
  };

  console.info(`Proxying ${reqQuery["type"]} to ${endpointPath} ...`);

  axios
    .request(reqConfig)
    .then(function (response) {
      console.info(response.status, response.headers["simple-analytics-feedback"]);

      // imitate the headers that would normally be sent back from SA's pixel
      const resHeaders = {
        "cache-control": "no-cache, no-store, must-revalidate",
        "content-type": response.headers["content-type"],
        "x-api-feedback": response.headers["simple-analytics-feedback"],
        "x-api-destination": response.headers["simple-analytics-location"],
      };

      callback(null, {
        statusCode: response.status,
        headers: resHeaders,
        body: response.body,
      });
    })
    .catch(function (error) {
      // this indicates a function error, NOT an error returned from SA
      console.log(error);

      callback(null, {
        statusCode: 500,
      });
    });
};
