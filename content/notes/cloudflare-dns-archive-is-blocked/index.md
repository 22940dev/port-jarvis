---
title: "Does Cloudflare's 1.1.1.1 DNS Block Archive.is?"
date: 2019-05-04 09:35:12-0400
description: "Short answer: no. Quite the opposite, actually -- Archive.is is intentionally blocking 1.1.1.1 users. Here's why."
tags:
  - Cloudflare
  - DNS
  - Networking
  - Privacy
  - Temper Tantrums
image: "archive-is.png"
draft: false
---

**tl;dr:** No. Quite the opposite, actually -- [Archive.is](https://archive.is/)'s owner is intentionally blocking 1.1.1.1 users.

![](images/archive-is.png)

A [recent post on Hacker News](https://news.ycombinator.com/item?id=19828317) pointed out something I've noticed myself over the past year -- the [Archive.is](https://archive.is/) website archiving tool (aka [Archive.today](https://archive.today/) and a few other TLDs) appears unresponsive when I'm on my home network, where I use Cloudflare's fantastic public DNS service, [1.1.1.1](https://1.1.1.1/). I didn't connect the two variables until I read this post, where somebody noticed that the Archive.is domain resolves for [Google's 8.8.8.8](https://developers.google.com/speed/public-dns/) DNS, but not 1.1.1.1. An interesting and timeless debate on [privacy versus convenience](https://www.adweek.com/digital/why-consumers-are-increasingly-willing-to-trade-privacy-for-convenience/) ensued.

[Matthew Prince](https://twitter.com/eastdakota), the CEO and co-founder of [Cloudflare](https://www.cloudflare.com/) (who's also [very active](https://news.ycombinator.com/user?id=eastdakota) on Hacker News), responded to the observation [with a detailed explanation](https://news.ycombinator.com/item?id=19828702) of what's happening behind the scenes, revealing that Archive.is's owner is actively refusing to resolve their own website for 1.1.1.1 users because Cloudflare's DNS offers ***too much*** privacy. Excerpt below, emphasis mine:

> We don't block archive.is or any other domain via 1.1.1.1. [...] Archive.is's authoritative DNS servers **return bad results to 1.1.1.1 when we query them**. I've proposed we just fix it on our end but our team, quite rightly, said that too would violate the integrity of DNS and the privacy and security promises we made to our users when we launched the service. [...] The archive.is owner has explained that **he returns bad results to us because we don’t pass along the EDNS subnet information**. This information leaks information about a requester’s IP and, in turn, sacrifices the privacy of users.  [Read more &raquo;](https://news.ycombinator.com/item?id=19828702)

In other words, Archive.is's nameservers throw a hissy fit and return a bogus IP when Cloudflare **doesn't** leak your geolocation info to them via the optional [EDNS client subnet feature](https://tools.ietf.org/html/rfc7871). The owner of Archive.is has plainly admitted this with [a questionable claim](https://twitter.com/archiveis/status/1018691421182791680) (in my opinion) about the lack of EDNS information causing him "so many troubles." 

{{< tweet 1018691421182791680 >}}

He's even gone as far as [replying to support requests](https://community.cloudflare.com/t/archive-is-error-1001/18227/7) by telling people to switch to Google's DNS, which -- surprise! -- offers your location to nameservers [with pleasure](https://developers.google.com/speed/public-dns/docs/ecs).

I wrote the [following reply](https://news.ycombinator.com/item?id=19828898) to Matthew, praising his team's focus on the big picture:

> Honestly, Cloudflare choosing *not* to hastily slap a band-aid on a problem like this just makes me feel more compelled to continue using 1.1.1.1.
> 
> I hesitate to compare this to Apple calling themselves "courageous" when removing the headphone jack, but in this case, I think the word is appropriate. I'll happily stand behind you guys if you take some PR hits while forcing the rest of the industry to make DNS safer – since it is understandable, admittedly, for users to conclude that "Cloudflare is blocking websites, sound the alarms!" at first glance.

Sure, it's annoying that I'll need to use a VPN or change my DNS resolvers to use a pretty slick (and otherwise convenient) website archiver. But I'm more happy to see that Cloudflare is playing the privacy long-game, even at the risk of their users concluding that they're blocking websites accessible to everyone else on the internet.
