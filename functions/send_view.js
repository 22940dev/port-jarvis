const axios = require("axios");

exports.handler = function (event, context, callback) {
  try {
    // if triggered as an image without JS (i.e. from AMP pages) set `?noscript=true`
    const noScript = event.queryStringParameters["noscript"] === "true";

    // https://docs.simpleanalytics.com/without-javascript
    const endpointHost = "queue.simpleanalyticscdn.com";
    const endpointPath = noScript ? "noscript.gif" : "simple.gif";
    const endpointUrl = "https://" + endpointHost + "/" + endpointPath;

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
      responseType: "arraybuffer",
      timeout: 2000,
    };

    console.info(`Proxying ${reqQuery["type"]} to ${endpointPath} ...`);

    axios
      .request(reqConfig)
      .then(function (response) {
        // parse the feedback message from SA
        const apiFeedback = response.headers["simple-analytics-feedback"] || "No feedback from Simple Analytics.";
        const shortFeedback = apiFeedback.toLowerCase().includes("thanks for sending") ? "OK" : `ERROR: ${apiFeedback}`;

        console.info(response.status, apiFeedback);

        // imitate the headers that would normally be sent back from SA's pixel
        const resHeaders = {
          "Content-Type": "image/gif",
          "Cache-Control": "private, no-cache, no-store, must-revalidate",
          Expires: "0",
          Pragma: "no-cache",
          "X-API-Response": shortFeedback,
          "X-API-Endpoint": endpointHost,
        };

        // reasoning for base64 encoding:
        // https://community.netlify.com/t/debugging-a-function-returns-502/429/12
        callback(null, {
          statusCode: response.status,
          headers: resHeaders,
          body: response.data.toString("base64"),
          isBase64Encoded: true,
        });
      })
      .catch(function (error) {
        // this indicates a function error, NOT an error returned from SA
        throw error;
      });
  } catch (error) {
    // something went VERY wrong...
    console.log(error.message);

    callback(null, {
      statusCode: 500,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        error: error.message,
      }),
    });
  }
};
