---
title: "I Made A Thing, Powered by Windows Me™"
date: 2020-06-06 10:05:23-0400
description: "Introducing Y2K Land: fully featured, fully isolated, on-demand Windows Millennium Edition® virtual machines."
tags:
  - Projects
  - Nostalgia
  - Windows
  - Virtual Machines
image: "images/screenshot.png"
draft: false
---

{{< gh-buttons username="jakejarvis" repo="y2k" >}}

A few months ago, I stumbled upon [my first website ever](/y2k/) on an old floppy disk. Despite the instant cringing, I uploaded it to GitHub, [collected other iterations](/previously/), and made an [#awesome-list](https://github.com/jakejarvis/awesome-first-code) of others who were brave and/or shameless enough to do the same. But why not take that ~~one~~ 1,000 steps further?

Introducing [**y2k.land**](https://y2k.land/) — with fully-featured, fully-isolated, on-demand [**Windows Millennium Edition®**](https://www.youtube.com/watch?v=CaNDeyYP98A) virtual machines, simply to experience my first website in its natural Internet Explorer 5 habitat. And maybe play some [3D Pinball: Space Cadet](https://en.wikipedia.org/wiki/Full_Tilt!_Pinball#3D_Pinball_for_Windows_%E2%80%93_Space_Cadet). Oh, and [Microsoft Bob](https://en.wikipedia.org/wiki/Microsoft_Bob) is there too if you want to say hello and catch up. 🤓

{{< image src="images/screenshot.png" link="https://y2k.land/" >}}[**Enter Y2K Land, at your own risk.**](https://y2k.land/){{< /image >}}

The backend is powered by [**QEMU**](https://www.qemu.org/) (as a Pentium III emulator), [**websocketd**](https://github.com/joewalnes/websocketd) (an **_awesome_** lightweight WebSockets server written in Go), [**Cloudflare Tunnels**](https://www.cloudflare.com/products/argo-tunnel/) (for some protection), and embarrassingly messy Ruby and shell scripts. I'll push those up to GitHub [next to the frontend code](https://github.com/jakejarvis/y2k) — which is based on [**noVNC**](https://github.com/novnc/noVNC), a JavaScript VNC client — once I have a chance to untangle the spaghetti code. 🍝

I must give credit to both [charlie.bz](https://charlie.bz/) and [benjojo.co.uk](https://benjojo.co.uk/), similar websites I was enamored with when they were posted on Hacker News a few years ago. Think we'll see some websites like these with Windows 29 in a decade?

{{< image src="images/windows-me.png" width="320" >}}**@microsoft** Please don't sue me.{{</ image >}}

Feel free to [open an issue on GitHub](https://github.com/jakejarvis/y2k/issues) if you run into connection glitches or have any inspiration for nostalgic stuff you think would be cool to install persistently on the OS image. I certainly can't help with any actual Windows Me crashes, though — it was beyond help a long, long time ago. Like, [the day it came out](https://books.google.com/books?id=Jbft8HXJZwQC&lpg=PP1&pg=PA76#v=onepage&q&f=false). But it will always have a soft spot in my heart.

Anyways... quarantine boredom is a crazy thing, am I right? 😷
