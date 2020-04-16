---
title: "{{ replace .Name "-" " " | title }}"
date: {{ dateFormat "2006-01-02 15:04:05-0700" .Date }}
image: "thumb.png"
type: videos
layout: video
resources:
- src: "{{ .Name }}.mp4"
- src: "{{ .Name }}.webm"
- src: "subs.en.vtt"
- src: "thumb.png"
draft: true
---
