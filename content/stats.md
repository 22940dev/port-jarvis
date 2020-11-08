---
title: "📈 Analytics"
description: "Public visitor stats for this website."
url: /stats
layout: etc
amp: false
css: |
  div#content iframe {
    display: block;
    margin: 0 auto;
    height: 327px;
    width: 100%;
    max-width: 654px;
    border: 0;
    overflow: hidden;
  }
---

This website uses [**Simple Analytics**](https://simpleanalytics.com/?ref=jarv.is) to tally pageviews without tracking you.

Cookies and fingerprinting are never used and your IP address is hidden behind [a serverless function](https://github.com/jakejarvis/jarv.is/blob/main/functions/send_view.js) when your ping is anonymously proxied to Simple Analytics' API on your behalf. Refer to the [**Privacy Policy**](/privacy/) for a complete list of information sent.

In that case, why not share them? 😊 Pageviews for the past month are graphed below and more information (top pages, referrers, etc.) can be found [on a publicly-accessible dashboard.](https://simpleanalytics.com/jarv.is?utm_source=jarv.is&utm_content=badge)

<!-- markdownlint-disable MD033 -->
<p class="center"><a class="no-underline" href="https://simpleanalytics.com/jarv.is?utm_source=jarv.is&amp;utm_content=badge" target="_blank" rel="noopener"><img src="/stats/badge.svg" width="210" height="50" alt="Powered by Simple Analytics"></a></p>
<!-- markdownlint-enable MD033 -->

{{< iframe src="https://simpleanalytics.com/jarv.is?color=FF4F64&embed=true" title="Simple Analytics graph" width="654" height="327" sandbox="allow-same-origin allow-scripts allow-popups" >}}
