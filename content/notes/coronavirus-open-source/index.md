---
title: "COVID-19 vs. the Open Source Community ⚔️"
date: 2020-03-23 15:17:09-0400
description: "The open source community is rallying together like no other to provide coronavirus information to the public in innovative ways."
tags:
  - Open Source
  - COVID-19
  - Coronavirus
  - Public Health
  - GitHub
image: "covid19dashboards.png"
draft: false
---

<style>
img.github {
  display: inline !important;
  vertical-align: text-bottom;
  width: 30px;
  height: 30px;
  margin: 0 !important;
}
h2 a {
  background-image: none !important;
  padding-bottom: 0 !important;
  margin-right: 8px !important;
}
</style>

We're all quickly learning that worldwide pandemics can bring out both [the best](https://www.vox.com/culture/2020/3/13/21179293/coronavirus-italy-covid19-music-balconies-sing) and [the worst](https://twitter.com/9NewsAUS/status/1236088663093608448) of humanity. But one thing has become readily apparent to me — outside of the large teams of medical professionals risking their lives right this minute, the open source community stands alone in its ability to rapidly organize in the midst of chaos to give back to the world and, in this case, make it safer for all of us.

These are just a few incredible open source projects that didn't exist a few months ago, but rapidly formed teams of dozens of contributors to fill both big needs and small niches in the fight to defeat the novel coronavirus, aka [**COVID-19**](https://www.cdc.gov/coronavirus/2019-nCoV/index.html).

## [The COVID Tracking Project](https://covidtracking.com/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/COVID19Tracking/website)

Now that Americans are *finally* starting to get tested for the coronavirus, information and statistics about testing results are being released state-by-state, which has led to a scattering of primary sources across the web. This project automatically collects as much information as possible from each health department's website and puts everything together in [easy-to-digest tables](https://covidtracking.com/data/), as well as [spreadsheets](https://docs.google.com/spreadsheets/u/2/d/e/2PACX-1vRwAqp96T9sYYq2-i7Tj0pvTf6XVHjDSMIKBdZHXiCGGdNC0ypEU9NbngS8mxea55JuCFuua1MUeOj5/pubhtml) and a [public API](https://covidtracking.com/api/).

{{< image src="images/covidtracking.png" width="680" alt="The COVID Tracking Project" />}}

## [#findthemasks](https://findthemasks.com/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/r-pop/findthemasks)

This one might be my favorite, simply because of how targeted the problem it's trying to solve is. The United States is [already running out](https://www.nytimes.com/2020/03/19/health/coronavirus-masks-shortage.html) of personal protective equipment (PPE) for the healthcare professionals on the front line of this crisis right now. [#findthemasks.com](https://findthemasks.com/) has gathered specific donation requests and personnel contacts from hospitals around the country in desperate need of basic supplies.

*Please* look up your local hospitals on [#findthemasks](https://findthemasks.com/#sites) and follow their instructions to donate anything you have hoarded — it's one of the most impactful things you can do right now. If you don't see your local hospital, or don't feel comfortable shipping equipment to any hospital listed, you can also visit [PPE Link](https://ppelink.org/ppe-donations/) and they will connect you with hospitals in your area.

{{< image src="images/findthemasks.png" width="600" alt="#findthemasks" />}}

## [#StayTheFuckHome](https://staythefuckhome.com/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/flore2003/staythefuckhome)

I figured I'd throw in this cheeky website broadcasting a simple but serious message: **STAY THE FUCK HOME!!!** If you're *still* not convinced of the importance of this "suggestion," give their ["Self-Quarantine Manifesto"](https://staythefuckhome.com/) a quick read. Now.

The [GitHub community](https://github.com/flore2003/staythefuckhome/pulls?q=is%3Apr) has translated the instructional essay into over a dozen different languages — including a [safe-for-work version](https://staythefuckhome.com/sfw/), if that helps — and they're [looking for more translators](https://github.com/flore2003/staythefuckhome#contributing) if you're multilingual and need something besides Netflix to fill your time with while you ***stay the fuck at home!*** 😉

{{< image src="images/staythefuckhome.png" width="600" alt="#StayTheFuckHome" />}}

## [COVID-19 Dashboards](https://covid19dashboards.com/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/github/covid19-dashboard)

This collection of various visualizations is fascinating (and sobering) to look at. If you're smarter than I am and have experience in data analysis, their team (led by a [GitHub engineer](https://github.com/hamelsmu)) would be more than happy to [add your contribution](https://github.com/github/covid19-dashboard/blob/master/CONTRIBUTING.md) to the site — they're using [Jupyter Notebooks](https://jupyter.org/) and [fastpages](https://github.com/fastai/fastpages).

{{< image src="images/covid19dashboards.png" width="580" alt="COVID-19 Dashboards" />}}

## [CoronaTracker](https://coronatracker.samabox.com/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/MhdHejazi/CoronaTracker)

CoronaTracker is a _beautiful_ cross-platform app for iOS and macOS with intuitive maps and charts fed by reputable live data. Apple is [being (justifiably) picky](https://developer.apple.com/news/?id=03142020a) about "non-official" Coronavirus apps in their App Store (and [so is Google](https://www.cnet.com/news/apple-google-amazon-block-nonofficial-coronavirus-apps-from-app-stores/)), but you can still [download the macOS app directly](https://coronatracker.samabox.com/) or [compile the iOS source code](https://github.com/MhdHejazi/CoronaTracker#1-ios-app) yourself using Xcode if you desire.

{{< image src="images/coronatracker.png" alt="CoronaTracker" />}}

## [Staying Home Club](https://stayinghome.club/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/phildini/stayinghomeclub)

A bit more family-friendly than [#StayTheFuckHome](https://staythefuckhome.com/), the [Staying Home Club](https://stayinghome.club/) is maintaining a running list of over a thousand companies and universities mandating that employees and students work from home, as well as events that have been canceled or moved online. Quarantining yourself might feel lonely, but here's solid proof that you're far from alone right now.

{{< image src="images/stayinghome.png" width="600" alt="Staying Home Club" />}}

## [Nextstrain for nCoV](https://nextstrain.org/ncov) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/nextstrain/ncov)

This one is a bit over my head, but apparently [Nextstrain](https://nextstrain.org/) is a pretty cool open-source service targeted at genome data analysis and visualization of different pathogens. Their [COVID-19 page](https://nextstrain.org/ncov) is still awe-inspiring to look at for a layman like me, but probably 100 times more so if you're an actual scientist — in which case, the [genome data they've open-sourced](https://github.com/nextstrain/ncov) might interest you.

{{< image src="images/nextstrain.png" alt="Nextstrain for nCOV" />}}

## [Johns Hopkins 2019-nCoV Data](https://systems.jhu.edu/research/public-health/ncov/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/CSSEGISandData/COVID-19)

Johns Hopkins University's [visual COVID-19 global dashboard](https://www.arcgis.com/apps/opsdashboard/index.html#/bda7594740fd40299423467b48e9ecf6) has been bookmarked as my go-to source of information since the beginning of this crisis. Now, JHU's [Center for Systems Science and Engineering](https://systems.jhu.edu/) has open-sourced [their data and analysis](https://github.com/CSSEGISandData/COVID-19) for anybody to use.

{{< image src="images/hopkins.png" alt="Johns Hopkins 2019-nCoV Data" />}}

## [COVID-19 Scenarios](https://neherlab.org/covid19/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/neherlab/covid19_scenarios)

COVID-19 Scenarios will probably hit everyone in a different way, depending on your levels of optimism and/or pessimism right now. It uses [advanced scientific models](https://neherlab.org/covid19/about) to predict the future of the virus based on past data and future variables and assumptions you can tinker with yourself.

The maintainers at the [Neher Lab in Basel, Switzerland](https://neherlab.org/) even have a [discussion thread](https://github.com/neherlab/covid19_scenarios/issues/18) and an [open chatroom](https://spectrum.chat/covid19-scenarios/general/questions-discussions~8d49f461-a890-4beb-84f7-2d6ed0ae503a) set up for both scientists and non-scientists to ask questions and post ideas, which I find really nice of them!

{{< image src="images/scenarios.png" width="740" alt="COVID-19 Scenarios" />}}

## [Corona Data Scraper](https://coronadatascraper.com/#home) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/lazd/coronadatascraper)

Similar to the [COVID Tracking Project](https://covidtracking.com/) above, the [Corona Data Scraper](https://coronadatascraper.com/#home) has set up an automated process to scrape verified data from across the web to form massive CSV spreadsheets and JSON objects. They even [rate the quality](https://github.com/lazd/coronadatascraper#source-rating) of each source to prioritize data accordingly.

{{< image src="images/coronadatascraper.png" width="750" alt="Corona Data Scraper" />}}

## [Folding@home](https://foldingathome.org/covid19/) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/FoldingAtHome/coronavirus)

[Folding@home](https://foldingathome.org/) has been around [*forever*](https://en.wikipedia.org/wiki/Folding@home). I remember installing it on my family's home computer as a curious kid and making my father infuriated over how slow it got. But they [switched gears this month](https://foldingathome.org/2020/03/15/coronavirus-what-were-doing-and-how-you-can-help-in-simple-terms/) from using our computers to crunch various proteins and molecules in the background, and all of their power is now going towards discovering unknown "folds" in the coronavirus, which might be able to lead scientists to find better cures and potential vaccines.

You can [download their software here](https://foldingathome.org/start-folding/) to donate some idle computing power to their efforts — they definitely know what they're doing by now, after pioneering en-masse distributed computing 20 years ago.

**Fun fact:** The team behind Folding@home has seen a [**huge** spike in computational power](https://www.reddit.com/r/pcmasterrace/comments/flgm7q/ama_with_the_team_behind_foldinghome_coronavirus/) this month after cryptominers started mining coronavirus proteins instead of boring, old Ethereum with their insanely overpowered GPUs! 👏

{{< youtube NTLU1anxe8c >}}

## [Coronavirus Tracker API](https://coronavirus-tracker-api.herokuapp.com/v2/locations) [<img class="github" src="images/github.svg" alt="View on GitHub" title="View on GitHub">](https://github.com/ExpDev07/coronavirus-tracker-api)

To wrap this list up, I thought I'd include [yet another API](https://github.com/ExpDev07/coronavirus-tracker-api) fed by multiple data sources that you can use to create your own open-source project if any of these inspired you. This one is incredibly flexible in terms of input parameters but returns simple JSON responses like we all know and love.

{{< image src="images/tracker-api.png" width="712" alt="Coronavirus Tracker API" />}}

### Stay safe (and [home](https://staythefuckhome.com/)), friends! ❤️
