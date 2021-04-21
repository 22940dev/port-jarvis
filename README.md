# 🏡&nbsp;&nbsp;[jarv.is](https://jarv.is/)

[![Netlify](https://img.shields.io/netlify/a7403a53-fd9d-44c0-a708-a84d9fc1454d?logo=netlify&logoColor=white)](https://app.netlify.com/sites/jakejarvis/deploys)
[![GitHub Workflow Status (branch)](https://img.shields.io/github/workflow/status/jakejarvis/jarv.is/CI/main?label=build&logo=github&logoColor=white)](https://github.com/jakejarvis/jarv.is/actions?query=workflow%3ACI+branch%3Amain)
[![Hugo v0.82.1](https://img.shields.io/badge/hugo-0.82.1-ff4088?logo=hugo&logoColor=white)](https://github.com/gohugoio/hugo)
[![Licensed under CC-BY-4.0](https://img.shields.io/badge/license-CC--BY--4.0-fb7828?logo=creative-commons&logoColor=white)](LICENSE.md)
[![GitHub repo size](https://img.shields.io/github/repo-size/jakejarvis/jarv.is?color=009cdf&label=repo%20size&logo=git&logoColor=white)](https://github.com/jakejarvis/jarv.is)

Personal website of [@jakejarvis](https://github.com/jakejarvis), created and deployed using the following:

- [Hugo Extended](https://github.com/gohugoio/hugo)
- [Netlify](https://www.netlify.com/)
- [Fathom Analytics](https://usefathom.com/ref/ZEYG0O) (referral link)
  - 📈 My [stats are public](https://jarv.is/stats/), by the way!
- [...and more.](https://jarv.is/uses/)

I keep an ongoing list of [blog post ideas](https://github.com/jakejarvis/jarv.is/issues/1) and [coding to-dos](https://github.com/jakejarvis/jarv.is/issues/11) as issues in this repo.

## 💾&nbsp;&nbsp;Running a local testing server

### 🧶&nbsp;&nbsp;Using Yarn:

Run `yarn install` ([Yarn must be installed](https://yarnpkg.com/en/docs/install) first; NPM _should_ work at your own risk) and `yarn start`, then open [http://localhost:1337/](http://localhost:1337/). Pages will live-refresh when source files are changed.

### 🐳&nbsp;&nbsp;Using Docker:

To ensure consistency and compatibility, the [`Dockerfile`](Dockerfile) in this repository will download the correct version of the Hugo Extended binary and its dependencies, and start a live testing server in a temporary container.

Using Docker doesn't require Node or Yarn, but you can also use `yarn start:docker` which is simply an alias for:

```bash
docker run --rm -v $(pwd):/src -p 1337:1337 $(docker build --no-cache -q .)
```

Once built, these two methods act identically — simply open [http://localhost:1337/](http://localhost:1337/) as above.

### 🤯&nbsp;&nbsp;Why does this sound _way_ more complex than it needs to be?!

[Because it is.](https://www.jvt.me/talks/overengineering-your-personal-website/)

## 📜&nbsp;&nbsp;Licenses

![Creative Commons Attribution 4.0 International License](https://raw.githubusercontent.com/creativecommons/cc-cert-core/master/images/cc-by-88x31.png "CC BY")

Site content (everything in [`content/notes`](content/notes/)) is published under the [**Creative Commons Attribution 4.0 International License**](LICENSE.md) (CC-BY-4.0), which means that you can copy, redistribute, remix, transform, and build upon the content for any purpose as long as you give appropriate credit.

All original code in this repository (like my [Hugo theme](layouts/)) is published under the [**MIT License**](https://opensource.org/licenses/MIT).

External assets include:

- [**Twemoji**](https://twemoji.twitter.com/): Copyright (c) 2020 Twitter, Inc. and other contributors. [Licensed under CC-BY-4.0.](https://github.com/twitter/twemoji/blob/v13.0.1/LICENSE-GRAPHICS)
- [**Inter**](https://rsms.me/inter/): Copyright (c) 2016-2020 The Inter Project Authors. [Licensed under the SIL Open Font License, Version 1.1.](https://github.com/rsms/inter/blob/v3.15/LICENSE.txt)
- [**Roboto Mono**](https://fonts.google.com/specimen/Roboto+Mono): Copyright (c) 2015 The Roboto Mono Project Authors. [Licensed under the Apache License, Version 2.0.](https://github.com/google/fonts/blob/4df0b673c9b316ad5e8de8fa70b0768ab66c87d6/apache/robotomono/LICENSE.txt)
- [**Comic Neue**](http://comicneue.com/): Copyright (c) 2014 The Comic Neue Project Authors. [Licensed under the SIL Open Font License, Version 1.1.](https://github.com/crozynski/comicneue/blob/v2.5/OFL.txt)
