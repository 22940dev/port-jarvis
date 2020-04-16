---
title: "Netlify Analytics Review"
date: 2019-11-13T08:21:22-05:00
description: "Netlify has released Netlify Analytics, a tracking tool that's the only one of its kind, prioritizing privacy and speed."
tags:
- Review
- Analytics
- Data
- Netlify
- Privacy
- JAMStack
image: "images/overview.png"
draft: false
---


I've been trying out [Netlify Analytics](https://www.netlify.com/products/analytics/) on this site for over a month now and have some quick thoughts about this unique offering in a world full of bloated and invasive tracking scripts.

{{< image src="images/pageviews-2.png" alt="Pageview charts on Netlify Analytics" />}}


## 👍&nbsp; Pros {#pros}

Pretty much all of the benefits of Netlify Analytics stem from the fact that it's **purely server-side software**. This is what singularly sets it apart from [Google Analytics](https://analytics.google.com/analytics/web/) — by _far_ the [status quo](https://trends.builtwith.com/analytics/Google-Analytics) — and even self-hosted, open-source applications I've tried like [Matomo](https://github.com/matomo-org/matomo) and [Fathom](https://github.com/usefathom/fathom).

### ⚡&nbsp; Speed {#speed}

To start using Netlify Analytics, you press a few buttons on the Netlify dashboard and voilà. No need to copy and paste some obfuscated JavaScript snippet into the `<head>` of each page, which is a painful task for those of us who care about speed and efficiency on the web.

On top of sending yet another DNS request to one of Google's domains — and more HTTP payloads for each outgoing click, file downloaded, etc. — Google's `analytics.js` script is currently 43 KB. For a site like [nytimes.com](https://www.nytimes.com/), which transfers **nearly 20 MB** on its homepage, this is negligible. But for simple sites like mine, which I've [painstakingly optimized](https://gtmetrix.com/reports/jarv.is/uOzCBKlv) (mostly for fun, don't judge), that doubles the size of my homepage. Matomo's script, weighing in at 65 KB, made it even worse.

### 🕵️‍♂️&nbsp; Privacy {#privacy}

This is the big one.

In the age of GDPR (the [General Data Protection Regulation](https://en.wikipedia.org/wiki/General_Data_Protection_Regulation) in Europe), when using analytics tools and trackers without popping up a [cookie consent prompt](https://www.freeprivacypolicy.com/blog/cookie-consent-examples/) on each new visit can get you fined millions of euros, Netlify Analytics stands alone. Netlify promises its product is [fully GDPR compliant](https://docs.netlify.com/monitor-sites/analytics/). CEO Matt Biilmann [explains](https://thenewstack.io/the-netlify-web-platform-adds-server-side-analytics-aimed-at-privacy/):

> "One of the things that has come out of GDPR is that a lot of large companies do intensive tracking of individual users — running scripts across a lot of different sites that capture a lot of detailed information from the browser. That puts you in the position where you have a ton of data on all kinds of people."

And even outside of Europe, scrapping the tracking scripts on your site just makes you a courteous netizen (God, I hate that word). Not only does Google Analytics provide _you_ with detailed information on your visitors; by default, you're also sharing that data with Google itself, to the point where they can pinpoint your [age, gender, and even your interests](https://support.google.com/analytics/answer/2799357?hl=en) by cross-referencing data with your Google account and your behavior on other sites using Google Analytics.

Instead, Netlify Analytics pulls and compiles data from server logs on each of their CDN edge nodes, rather than having the visitor's browser push data about itself back up to a third-party's endpoint.

Netlify does store some short-term data, like IP addresses, as any normal hosting provider does. But for the purposes of analytics, the data is anonymized and only used to determine things like unique visitors vs. individual page views — and not shown to the customer. [Netlify's DPA](https://www.netlify.com/gdpr/) (Data Processing Agreement) is one of the most conservative I've seen on the web.

### 🛑&nbsp; AdBlock Immunity {#adblock-immunity}

Ad blocking is becoming commonplace on the World Wide Web with [over 25% of users](https://www.statista.com/statistics/804008/ad-blocking-reach-usage-us/) reportedly installing extensions to do so as soon as their new browser touches the net. And for good reason, since most of them also [block cross-site tracking scripts](https://moz.com/blog/analytics-black-holes) like Google's by default.

That's a _huge_ chunk of visitors missing that Netlify Analytics gains back for you — and probably far more if your audience is tech-savvy like those reading this post likely are. (Some might even [block JavaScript completely](https://www.gnu.org/philosophy/javascript-trap.en.html) using extensions like [NoScript](https://addons.mozilla.org/en-US/firefox/addon/noscript/).)

{{< image src="images/pages.png" alt="Pageview and 404 tracking on Netlify Analytics" />}}

Another tangential benefit you simply don't get from JavaScript-based tools like Google Analytics is the "Resources Not Found" box, which separates out URLs that resulted in a 404 Not Found error. Because of the 404 tracking, I discovered how many people were still subscribed to my posts via RSS from when I used WordPress _years_ ago, and I was able to redirect `/feed` and `/rss` to the new location.

_Side note: This section has also become cluttered with requests from script kiddies who are scanning the internet for files like `login.php` and `/wp-admin` and `AspCms_Config.asp` (huh?) — but that's a whole separate problem for another day._


## 👎&nbsp; Cons {#cons}

### 💰&nbsp; Price {#price}

Netlify is one of the most awesome free-as-in-beer services on the web today, providing a fast CDN and instant deployments at zero cost (up to a pretty insane amount, of course). But if you want to add Netlify Analytics, your bill suddenly jumps to [$9 a month](https://www.netlify.com/pricing/#analytics). **Nine dollars!** That's over **$100 per year!** If you have more than 250,000 visitors per month, the cost can be even higher (to the point where you'll need to contact Netlify's sales team).

It makes sense that Netlify needs to subsidize the cost of providing free enterprise-grade web hosting for the rest of its non-enterprise users to stay alive. But when Google Analytics is free, this is a pretty tough ask for any hobbyist — even if Google is [getting more from them](https://support.google.com/analytics/answer/1011397?hl=en) than they are from Google. 😬

### 📈&nbsp; Accuracy {#accuracy}

{{< image src="images/sources-bandwidth.png" alt="Referrer and bandwidth tracking on Netlify Analytics" />}}

Clearly, as much as I wish they did, 60,000+ visitors didn't type my website directly into the URL bar in the past month. Some of my articles have been circulating on Hacker News, Reddit, Twitter, etc. — none of which have even made a blip on the dashboard.

There are various possible reasons that referrers aren't being sent, mostly relating to HTTP headers and [increasingly sensible](https://blog.mozilla.org/blog/2019/06/04/firefox-now-available-with-enhanced-tracking-protection-by-default/) browser defaults, that aren't Netlify's fault. But this section is the most obvious example of important data you can miss out on by not tracking incoming visitors via JavaScript.

Another benefit of using Google's own analytics service becomes glaringly apparent here: I have **no idea** which search terms were used to reach which page. Netlify could mitigate this a bit by separating out referrers for each individual page, though, so at least I'd know which pages were having the most organic success on search engines.

One more note: since Netlify doesn't process IP addresses or user agents, bots crawling your site (like [Googlebot](https://support.google.com/webmasters/answer/182072?hl=en) and [Bingbot](https://www.bing.com/webmaster/help/which-crawlers-does-bing-use-8c184ec0)) get counted towards your stats, possibly overinflating your ego a little more than it should.

### ⏱️&nbsp; Historical Data {#historical-data}

{{< image src="images/overview.png" alt="Overview of Netlify Analytics stats" />}}

Trying out Netlify Analytics meant switching this site from [GitHub Pages](https://pages.github.com/) to Netlify — something I still have mixed feelings about. But if I had been on Netlify the entire time, I would have gotten thirty days of historical stats backfilled right off the bat, from before I even started paying for Analytics.

Sure, this is a cool bonus. However, "thirty days" has another meaning on Netlify Analytics: it's the **absolute maximum amount of data** you can access. Period, full stop. On your Analytics dashboard, you can see a window of the past month on your site — and that's all. Day 31 is gone, seemingly forever.

I hope Netlify proves me wrong in Version 2, since analyzing trends over the course of a year (or two, or five) is an **integral reason** to track visitor behavior in the first place. Otherwise, it's nearly impossible to tell which piece of content or which new feature caused your website to explode in popularity, unless you're meticulously watching it happen in real time.

---

I'm _super_ happy to see an investment in privacy-minded solutions for analytics, and [the Netlify team should be proud](https://www.youtube.com/watch?v=jMo0oQwTVak) of what they've built. And for the time being, I'm willing to continue forking over the nine bucks per month to give Netlify a chance to keep building upon this awesome (and, dare I say, [courageous](https://www.theverge.com/2016/9/7/12838024/apple-iphone-7-plus-headphone-jack-removal-courage)) concept. But only time will tell if others are willing to do the same — and if they are, how long they're willing to wait before resorting back to injecting bloated JavaScript snippets and hoarding invasive amounts of our data to share with the [behemoths of the internet](https://www.google.com/).

Hopefully it happens within a window of 30 days, though, or else Netlify will be none the wiser! 😉
