---
title: "Why I'm Dropping Dropbox"
date: 2019-11-20 17:22:43-0400
description: "I'm finally canceling my Dropbox Pro account and moving to iCloud Drive for synchronized cloud storage."
tags:
  - Cloud Storage
  - Dropbox
  - Apple
  - iCloud Drive
  - Betrayal
image: "images/email.png"
draft: false
---

I've been a loyal Dropbox user since its inception as a [Y Combinator startup](https://www.ycombinator.com/apply/dropbox/) ten years ago. Having a folder on all of my devices that instantly synchronized with each other was a game-changer for me, and I grew dependent on it more and more as they gave out free storage like candy — 48 GB for having a Samsung Chromebook, 1 GB for "Posting <3 to Twitter," and so on — until I needed to upgrade to Dropbox Pro. But this month I canceled my Pro subscription after a few too many strikes.

{{< image src="images/email.png" width="504" >}}Deleting 401,907 files from Dropbox... 😬{{< /image >}}

## Five strikes, you're out...

Decisions made by the top folks at Dropbox gave me an increasingly sour taste in my mouth over the past few years. The biggest red flags were:

- Removing my long-standing 48 GB promotion for Samsung Chromebooks from 2014 with little notice, offering a free 3 GB instead and preventing me from adding new files until I forked over \$11.99/month for Dropbox Pro.
- Adding a [3-device limit](https://help.dropbox.com/account/computer-limit) for free accounts, triggering another hostage negotiation resulting in me upgrading to Pro.
- Continuously forcing [bloated updates](https://www.theverge.com/2019/6/11/18661673/new-dropbox-desktop-app-google-docs-slack-atlassian) to their once-simple macOS app down users' throats, to the point where ["the new Dropbox"](https://blog.dropbox.com/topics/product-tips/new-dropbox) was consistently eating up _over a gigabyte of RAM_ and a non-negligible chunk of CPU usage thanks to an entire web browser being embedded into it:

{{< tweet "https://twitter.com/sandofsky/status/1138686582859239425" >}}

- Explicitly [dropping support for symlinking](https://news.ycombinator.com/item?id=20844363) (aka making aliases to) files outside of the literal `~/Dropbox` folder, which was incredibly helpful for nerds — once their main audience and biggest cheerleaders — with things like [dotfiles](https://github.com/jakejarvis/dotfiles) and Git repositories.
- ...and as a bonus, making the process of canceling Dropbox Pro incredibly convoluted, annoying, and sketchy. Here's a video demonstration via [Justin Dunham](https://twitter.com/jwyattd):

{{< video mp4="images/cancel.mp4" webm="images/cancel.webm" width="800" height="450" poster="images/cancel.png" >}}

## Seeking an alternative...

The infamous [Apple Ecosystem™](https://medium.com/swlh/the-irresistible-lure-of-the-apple-ecosystem-81bf8d66294a) has held me firmly in its grasp for over a decade now, and the main requirement of a replacement cloud storage service for me was smooth interoperability between my MacBook, iPhone, and iPad.

{{< image src="images/icloud-storage.png" alt="iCloud Drive storage" />}}

I've never been a proponent of leaving all your eggs in one basket. But it's hard to ignore the convenience of Apple's streamlined (and [finally](https://www.imore.com/developers-encounter-major-icloud-issues-ios-13-beta) reliable) [**iCloud Drive**](https://www.apple.com/icloud/), which is already installed on all of my devices (and actually cheaper than Dropbox gigabyte-for-gigabyte, at \$9.99/month for 2 TB). In fact, it's nearly invisible on macOS: I can simply save files in my Documents or Desktop folders as I always have and they're uploaded in the background. Git repositories now sync just fine and my files reappeared without a hitch after I recently formatted my Mac.

{{< image src="images/icloud-drive.png" width="680" alt="iCloud Drive" />}}

I still use (and highly recommend) [**Backblaze**](https://www.backblaze.com/) ([referral link](https://secure.backblaze.com/r/00x84e)) to backup my home folder and add a second layer of redundancy to storing all of my most important files on ["someone else's computer."](https://www.zdnet.com/article/stop-saying-the-cloud-is-just-someone-elses-computer-because-its-not/) And as long as I remember to plug in my external SSD every so often, they're also backed up locally via [Time Machine](https://support.apple.com/en-us/HT201250).

---

There are already a few Dropbox features I'm beginning to miss, like [selective sync](https://help.dropbox.com/installs-integrations/sync-uploads/selective-sync-overview), third-party integration, easier sharing, and an Android app (a man can dream, right?). But hopefully Apple continues to iterate on iCloud Drive, and it serves me well enough to not want to seek out another service for another ten years.

Thank you, Dropbox, for a fine relationship and for pioneering the consumer cloud storage industry. But for now, it's just not going to work between us. 💔
