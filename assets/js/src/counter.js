import fetch from "cross-fetch";
import numeral from "numeral";

// don't continue if there isn't a span#meta-hits element on this page
const wrapper = document.getElementById("meta-hits");

if (wrapper) {
  // javascript is enabled so show the loading indicator
  wrapper.style.display = "inline-block";

  // deduce a consistent identifier for this page, no matter the URL
  const canonical = document.createElement("a");
  canonical.href = document.querySelector("link[rel='canonical']").href;

  // strip beginning and ending forward slash
  const slug = canonical.pathname.slice(1, -1);

  fetch(`/api/hits/?slug=${encodeURIComponent(slug)}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.hits) {
        // finally inject the hits and hide the loading spinner
        const spinner = document.getElementById("hit-spinner");
        const counter = document.getElementById("hit-counter");

        const hitsComma = numeral(data.hits).format("0,0");
        const hitsPlural = data.hits === 1 ? "hit" : "hits";

        if (spinner) {
          spinner.style.display = "none";
        }
        if (counter) {
          counter.appendChild(document.createTextNode(hitsComma));
        }
        wrapper.title = hitsComma + " " + hitsPlural;
      } else {
        // something went horribly wrong, initiate coverup
        wrapper.style.display = "none";
      }
    })
    .catch(() => {
      // something went horribly wrong, initiate coverup
      wrapper.style.display = "none";
    });
}
