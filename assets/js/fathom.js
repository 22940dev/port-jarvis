/*! Fathom - beautiful, simple website analytics. https://usefathom.com/ref/ZEYG0O */

window.fathom = (function () {
  var siteId = "PPSQZUDY";
  var trackerUrl = "https://jarv.is/api/count_view";
  var honorDNT = false;
  var auto = true;
  var canonical = true;
  var excludedDomains = [];
  var allowedDomains = ["jarv.is"];

  function encodeParameters(params) {
    return (
      "?" +
      Object.keys(params)
        .map(function (k) {
          return encodeURIComponent(k) + "=" + encodeURIComponent(params[k]);
        })
        .join("&")
    );
  }

  function trackingEnabled() {
    var fathomIsBlocked = false;

    try {
      fathomIsBlocked = window.localStorage && window.localStorage.getItem("blockFathomTracking");
    } catch (err) {}

    var prerender = "visibilityState" in document && "prerender" === document.visibilityState;
    var clientSideBot = /bot|google|baidu|bing|msn|duckduckbot|teoma|slurp|yandex/i.test(navigator.userAgent);
    var isExcludedDomain = -1 < excludedDomains.indexOf(window.location.hostname); // eslint-disable-line compat/compat
    var isAllowedDomain = !(0 < allowedDomains.length) || -1 < allowedDomains.indexOf(window.location.hostname); // eslint-disable-line compat/compat

    return !(fathomIsBlocked || prerender || clientSideBot || honorDNT || isExcludedDomain) && isAllowedDomain;
  }

  return (
    auto &&
      setTimeout(function () {
        window.fathom.trackPageview();
      }),
    {
      send: function (params) {
        var img;

        if (trackingEnabled()) {
          img = document.createElement("img");
          img.setAttribute("alt", "");
          img.setAttribute("aria-hidden", "true");
          img.style.position = "absolute";
          img.src = trackerUrl + encodeParameters(params);
          img.addEventListener("load", function () {
            img.parentNode.removeChild(img);
          });
          document.body.appendChild(img);
        }
      },
      beacon: function (params) {
        if (trackingEnabled()) {
          navigator.sendBeacon(trackerUrl + encodeParameters(params));
        }
      },
      trackPageview: function (params) {
        if (params === undefined) params = {};

        var hostname;
        var location = window.location;

        if (params.url === undefined) {
          if (canonical && document.querySelector('link[rel="canonical"][href]')) {
            (hostname = document.createElement("a")).href = document.querySelector('link[rel="canonical"][href]').href;
            location = hostname;
          }
        } else {
          (location = document.createElement("a")).href = params.url;
          if ("" !== location.host) {
            hostname = location.protocol + "//" + location.hostname;
          }
        }

        this.send({
          p: location.pathname + location.search || "/",
          h: hostname,
          r: params.referrer || (document.referrer.indexOf(hostname) < 0 ? document.referrer : ""),
          sid: siteId,
        });
      },
      trackGoal: function (code, cents) {
        this.beacon({
          gcode: code,
          gval: cents,
        });
      },
      /* blockTrackingForMe: function () {
        if (window.localStorage) {
          window.localStorage.setItem("blockFathomTracking", !0);
          alert("You have blocked Fathom for yourself on this website");
        } else {
          alert("Your browser doesn't support localStorage.");
        }
      },
      enableTrackingForMe: function () {
        if (window.localStorage) {
          window.localStorage.removeItem("blockFathomTracking");
          alert("Fathom has been enabled for your device");
        }
      }, */
    }
  );
})();
