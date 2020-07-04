---
title: "Fascinating & Frightening Shodan Search Queries (AKA: The Internet of Sh*t)"
date: 2019-09-19 09:56:10-0400
description: "I've collected some interesting and scary search queries for Shodan, the internet-of-things search engine. Some return fun results, while others return serious vulnerabilities."
tags:
  - Infosec
  - Pentesting
  - Shodan
  - Internet of Things
  - Dorking
image: "images/shodan.png"
css: |
  div#content h3 a:last-child, h4 a:last-child {
    background-image: none;
    padding-bottom: 0;
    margin-left: 6px;
    text-decoration: none;
  }
draft: false
---

{{< gh-buttons username="jakejarvis" repo="awesome-shodan-queries" >}}

Over time, I've collected an assortment of interesting, funny, and depressing search queries to plug into [Shodan](https://www.shodan.io/), the ([literal](https://www.vice.com/en_uk/article/9bvxmd/shodan-exposes-the-dark-side-of-the-net)) internet search engine. Some return facepalm-inducing results, while others return serious and/or ancient vulnerabilities in the wild.

{{< image src="images/shodan.png" link="https://account.shodan.io/register" >}}[**Most search filters require a Shodan account.**](https://account.shodan.io/register){{< /image >}}

You can assume these queries only return unsecured/open instances when possible. For your own legal benefit, do not attempt to login (even with default passwords) if they aren't! Narrow down results by adding filters like `country:US` or `org:"Harvard University"` or `hostname:"nasa.gov"` to the end.

The world and its devices are quickly becoming more connected through the shiny new [Internet of ~~Things~~ Sh\*t](https://motherboard.vice.com/en_us/topic/internet-of-shit) — and exponentially [more dangerous](https://blog.malwarebytes.com/101/2017/12/internet-things-iot-security-never/) as a result. To that end, I hope this list spreads awareness (and, quite frankly, pant-wetting fear) rather than harm.

**And as always, [discover and disclose responsibly](https://www.bugcrowd.com/resource/what-is-responsible-disclosure/)! 😊**

---

### **Table of Contents:**

- [Industrial Control Systems](#industrial-control-systems)
- [Remote Desktop](#remote-desktop)
- [Network Infrastructure](#network-infrastructure)
- [Network Attached Storage (NAS)](#network-attached-storage-nas)
- [Webcams](#webcams)
- [Printers & Copiers](#printers-copiers)
- [Home Devices](#home-devices)
- [Random Stuff](#random-stuff)

---

## Industrial Control Systems {#industrial-control-systems}

### Samsung Electronic Billboards [🔎 →](https://www.shodan.io/search?query=%22Server%3A+Prismview+Player%22)

```plaintext {linenos=false}
"Server: Prismview Player"
```

{{< image src="images/billboard3.png" width="450" alt="Example: Electronic Billboards" />}}

### Gas Station Pump Controllers [🔎 →](https://www.shodan.io/search?query=%22in-tank+inventory%22+port%3A10001)

```plaintext {linenos=false}
"in-tank inventory" port:10001
```

{{< image src="images/7-11.png" width="600" alt="Example: Gas Station Pump Inventories" />}}

### Automatic License Plate Readers [🔎 →](https://www.shodan.io/search?query=P372+%22ANPR+enabled%22)

```plaintext {linenos=false}
P372 "ANPR enabled"
```

{{< image src="images/plate-reader.png" width="680" alt="Example: Automatic License Plate Reader" />}}

### Traffic Light Controllers / Red Light Cameras [🔎 →](https://www.shodan.io/search?query=mikrotik+streetlight)

```plaintext {linenos=false}
mikrotik streetlight
```

### Voting Machines in the United States [🔎 →](https://www.shodan.io/search?query=%22voter+system+serial%22+country%3AUS)

```plaintext {linenos=false}
"voter system serial" country:US
```

### Telcos Running [Cisco Lawful Intercept](https://www.cisco.com/c/en/us/td/docs/switches/lan/catalyst6500/ios/12-2SX/lawful/intercept/book/65LIch1.html) Wiretaps [🔎 →](https://www.shodan.io/search?query=%22Cisco+IOS%22+%22ADVIPSERVICESK9_LI-M%22)

```plaintext {linenos=false}
"Cisco IOS" "ADVIPSERVICESK9_LI-M"
```

Wiretapping mechanism outlined by Cisco in [RFC 3924](https://tools.ietf.org/html/rfc3924):

> Lawful intercept is the lawfully authorized interception and monitoring of communications of an intercept subject. The term "intercept subject" [...] refers to the subscriber of a telecommunications service whose communications and/or intercept related information (IRI) has been lawfully authorized to be intercepted and delivered to some agency.

### Prison Pay Phones [🔎 →](https://www.shodan.io/search?query=%22%5B2J%5BH+Encartele+Confidential%22)

```plaintext {linenos=false}
"[2J[H Encartele Confidential"
```

### [Tesla PowerPack](https://www.tesla.com/powerpack) Charging Status [🔎 →](https://www.shodan.io/search?query=http.title%3A%22Tesla+PowerPack+System%22+http.component%3A%22d3%22+-ga3ca4f2)

```plaintext {linenos=false}
http.title:"Tesla PowerPack System" http.component:"d3" -ga3ca4f2
```

{{< image src="images/tesla.png" alt="Example: Tesla PowerPack Charging Status" />}}

### Electric Vehicle Chargers [🔎 →](https://www.shodan.io/search?query=%22Server%3A+gSOAP%2F2.8%22+%22Content-Length%3A+583%22)

```plaintext {linenos=false}
"Server: gSOAP/2.8" "Content-Length: 583"
```

### Maritime Satellites [🔎 →](https://www.shodan.io/search?query=%22Cobham+SATCOM%22+OR+%28%22Sailor%22+%22VSAT%22%29)

Shodan made a pretty sweet [Ship Tracker](https://shiptracker.shodan.io/) that maps ship locations in real time, too!

```plaintext {linenos=false}
"Cobham SATCOM" OR ("Sailor" "VSAT")
```

{{< image src="images/sailor-vsat.png" width="700" alt="Example: Maritime Satellites" />}}

### Submarine Mission Control Dashboards [🔎 →](https://www.shodan.io/search?query=title%3A%22Slocum+Fleet+Mission+Control%22)

```plaintext {linenos=false}
title:"Slocum Fleet Mission Control"
```

### [CAREL PlantVisor](https://www.carel.com/product/plantvisor) Refrigeration Units [🔎 →](https://www.shodan.io/search?query=%22Server%3A+CarelDataServer%22+%22200+Document+follows%22)

```plaintext {linenos=false}
"Server: CarelDataServer" "200 Document follows"
```

{{< image src="images/refrigeration.png" alt="Example: CAREL PlantVisor Refrigeration Units" />}}

### [Nordex Wind Turbine](https://www.nordex-online.com/en/products-services/wind-turbines.html) Farms [🔎 →](https://www.shodan.io/search?query=http.title%3A%22Nordex+Control%22+%22Windows+2000+5.0+x86%22+%22Jetty%2F3.1+%28JSP+1.1%3B+Servlet+2.2%3B+java+1.6.0_14%29%22)

```plaintext {linenos=false}
http.title:"Nordex Control" "Windows 2000 5.0 x86" "Jetty/3.1 (JSP 1.1; Servlet 2.2; java 1.6.0_14)"
```

### [C4 Max](https://www.mobile-devices.com/our-products/c4-max/) Commercial Vehicle GPS Trackers [🔎 →](https://www.shodan.io/search?query=%22%5B1m%5B35mWelcome+on+console%22)

```plaintext {linenos=false}
"[1m[35mWelcome on console"
```

{{< image src="images/c4max.png" alt="Example: C4 Max Vehicle GPS" />}}

### [DICOM](https://www.dicomstandard.org/about/) Medical X-Ray Machines [🔎 →](https://www.shodan.io/search?query=%22DICOM+Server+Response%22+port%3A104)

Secured by default, thankfully, but these 1,700+ machines still [have no business](https://documents.trendmicro.com/assets/rpt/rpt-securing-connected-hospitals.pdf) being on the internet.

```plaintext {linenos=false}
"DICOM Server Response" port:104
```

### [GaugeTech](https://electroind.com/all-products/) Electricity Meters [🔎 →](https://www.shodan.io/search?query=%22Server%3A+EIG+Embedded+Web+Server%22+%22200+Document+follows%22)

```plaintext {linenos=false}
"Server: EIG Embedded Web Server" "200 Document follows"
```

{{< image src="images/power-gaugetech.png" width="500" alt="Example: GaugeTech Electricity Meters" />}}

### Siemens Industrial Automation [🔎 →](https://www.shodan.io/search?query=%22Siemens%2C+SIMATIC%22+port%3A161)

```plaintext {linenos=false}
"Siemens, SIMATIC" port:161
```

### Siemens HVAC Controllers [🔎 →](https://www.shodan.io/search?query=%22Server%3A+Microsoft-WinCE%22+%22Content-Length%3A+12581%22)

```plaintext {linenos=false}
"Server: Microsoft-WinCE" "Content-Length: 12581"
```

### Door / Lock Access Controllers [🔎 →](https://www.shodan.io/search?query=%22HID+VertX%22+port%3A4070)

```plaintext {linenos=false}
"HID VertX" port:4070
```

### Railroad Management [🔎 →](https://www.shodan.io/search?query=%22log+off%22+%22select+the+appropriate%22)

```plaintext {linenos=false}
"log off" "select the appropriate"
```

---

## Remote Desktop {#remote-desktop}

### Unprotected VNC [🔎 →](https://www.shodan.io/search?query=%22authentication+disabled%22+%22RFB+003.008%22)

```plaintext {linenos=false}
"authentication disabled" "RFB 003.008"
```

[Shodan Images](https://images.shodan.io/) is a great supplementary tool to browse screenshots, by the way! [🔎 →](https://images.shodan.io/?query=%22authentication+disabled%22+%21screenshot.label%3Ablank)

{{< image src="images/vnc.png" width="500" alt="Example: Unprotected VNC" >}}The first result right now. 😞{{< /image >}}

### Windows RDP [🔎 →](https://www.shodan.io/search?query=%22%5Cx03%5Cx00%5Cx00%5Cx0b%5Cx06%5Cxd0%5Cx00%5Cx00%5Cx124%5Cx00%22)

99.99% are secured by a secondary Windows login screen.

```plaintext {linenos=false}
"\x03\x00\x00\x0b\x06\xd0\x00\x00\x124\x00"
```

---

## Network Infrastructure {#network-infrastructure}

### [Weave Scope](https://www.weave.works/oss/scope/) Dashboards [🔎 →](https://www.shodan.io/search?query=title%3A%22Weave+Scope%22+http.favicon.hash%3A567176827)

Command-line access inside Kubernetes pods and Docker containers, and real-time visualization/monitoring of the entire infrastructure.

```plaintext {linenos=false}
title:"Weave Scope" http.favicon.hash:567176827
```

{{< image src="images/weavescope.png" alt="Example: Weave Scope Dashboards" />}}

### MongoDB [🔎 →](https://www.shodan.io/search?query=product%3AMongoDB+-authentication)

Older versions were insecure by default. [Very scary.](https://krebsonsecurity.com/tag/mongodb/)

```plaintext {linenos=false}
"MongoDB Server Information" port:27017 -authentication
```

{{< image src="images/mongo.png" width="500" alt="Example: MongoDB" />}}

### [Mongo Express](https://github.com/mongo-express/mongo-express) Web GUI [🔎 →](https://www.shodan.io/search?query=%22Set-Cookie%3A+mongo-express%3D%22+%22200+OK%22)

Like the [infamous phpMyAdmin](https://www.cvedetails.com/vulnerability-list/vendor_id-784/Phpmyadmin.html) but for MongoDB.

```plaintext {linenos=false}
"Set-Cookie: mongo-express=" "200 OK"
```

{{< image src="images/mongo-express.png" width="700" alt="Example: Mongo Express GUI" />}}

### Jenkins CI [🔎 →](https://www.shodan.io/search?query=%22X-Jenkins%22+%22Set-Cookie%3A+JSESSIONID%22+http.title%3A%22Dashboard%22)

```plaintext {linenos=false}
"X-Jenkins" "Set-Cookie: JSESSIONID" http.title:"Dashboard"
```

{{< image src="images/jenkins.png" width="700" alt="Example: Jenkins CI" />}}

### Docker APIs [🔎 →](https://www.shodan.io/search?query=%22Docker+Containers%3A%22+port%3A2375)

```plaintext {linenos=false}
"Docker Containers:" port:2375
```

### Docker Private Registries [🔎 →](https://www.shodan.io/search?query=%22Docker-Distribution-Api-Version%3A+registry%22+%22200+OK%22+-gitlab)

```plaintext {linenos=false}
"Docker-Distribution-Api-Version: registry" "200 OK" -gitlab
```

### [Pi-hole](https://pi-hole.net/) Open DNS Servers [🔎 →](https://www.shodan.io/search?query=%22dnsmasq-pi-hole%22+%22Recursion%3A+enabled%22)

```plaintext {linenos=false}
"dnsmasq-pi-hole" "Recursion: enabled"
```

### Already Logged-In as `root` via Telnet [🔎 →](https://www.shodan.io/search?query=%22root%40%22+port%3A23+-login+-password+-name+-Session)

```plaintext {linenos=false}
"root@" port:23 -login -password -name -Session
```

### Android Root Bridges [🔎 →](https://www.shodan.io/search?query=%22Android+Debug+Bridge%22+%22Device%22+port%3A5555)

A tangential result of Google's dumb fractured update approach. 🙄 [More information here.](https://medium.com/p/root-bridge-how-thousands-of-internet-connected-android-devices-now-have-no-security-and-are-b46a68cb0f20)

```plaintext {linenos=false}
"Android Debug Bridge" "Device" port:5555
```

### Lantronix Serial-to-Ethernet Adapter [Leaking Telnet Passwords](https://www.bleepingcomputer.com/news/security/thousands-of-serial-to-ethernet-devices-leak-telnet-passwords/) [🔎 →](https://www.shodan.io/search?query=Lantronix+password+port%3A30718+-secured)

```plaintext {linenos=false}
Lantronix password port:30718 -secured
```

### Citrix Virtual Apps [🔎 →](https://www.shodan.io/search?query=%22Citrix+Applications%3A%22+port%3A1604)

```plaintext {linenos=false}
"Citrix Applications:" port:1604
```

{{< image src="images/citrix.png" width="700" alt="Example: Citrix Virtual Apps" />}}

### Cisco Smart Install [🔎 →](https://www.shodan.io/search?query=%22smart+install+client+active%22)

[Vulnerable](https://2016.zeronights.ru/wp-content/uploads/2016/12/CiscoSmartInstall.v3.pdf) (kind of "by design," but especially when exposed).

```plaintext {linenos=false}
"smart install client active"
```

### PBX IP Phone Gateways [🔎 →](https://www.shodan.io/search?query=PBX+%22gateway+console%22+-password+port%3A23)

```plaintext {linenos=false}
PBX "gateway console" -password port:23
```

### [Polycom](https://www.polycom.com/hd-video-conferencing.html) Video Conferencing [🔎 →](https://www.shodan.io/search?query=http.title%3A%22-+Polycom%22+%22Server%3A+lighttpd%22)

```plaintext {linenos=false}
http.title:"- Polycom" "Server: lighttpd"
```

Telnet Configuration: [🔎 →](https://www.shodan.io/search?query=%22Polycom+Command+Shell%22+-failed+port%3A23)

```plaintext {linenos=false}
"Polycom Command Shell" -failed port:23
```

{{< image src="images/polycom.png" width="550" alt="Example: Polycom Video Conferencing" />}}

### [Bomgar Help Desk](https://www.beyondtrust.com/remote-support/integrations) Portal [🔎 →](https://www.shodan.io/search?query=%22Server%3A+Bomgar%22+%22200+OK%22)

```plaintext {linenos=false}
"Server: Bomgar" "200 OK"
```

### Intel Active Management [CVE-2017-5689](https://www.exploit-db.com/exploits/43385) [🔎 →](https://www.shodan.io/search?query=%22Intel%28R%29+Active+Management+Technology%22+port%3A623%2C664%2C16992%2C16993%2C16994%2C16995)

```plaintext {linenos=false}
"Intel(R) Active Management Technology" port:623,664,16992,16993,16994,16995
```

### HP iLO 4 [CVE-2017-12542](https://nvd.nist.gov/vuln/detail/CVE-2017-12542) [🔎 →](https://www.shodan.io/search?query=HP-ILO-4+%21%22HP-ILO-4%2F2.53%22+%21%22HP-ILO-4%2F2.54%22+%21%22HP-ILO-4%2F2.55%22+%21%22HP-ILO-4%2F2.60%22+%21%22HP-ILO-4%2F2.61%22+%21%22HP-ILO-4%2F2.62%22+%21%22HP-iLO-4%2F2.70%22+port%3A1900)

```plaintext {linenos=false}
HP-ILO-4 !"HP-ILO-4/2.53" !"HP-ILO-4/2.54" !"HP-ILO-4/2.55" !"HP-ILO-4/2.60" !"HP-ILO-4/2.61" !"HP-ILO-4/2.62" !"HP-iLO-4/2.70" port:1900
```

### Outlook Web Access:

#### Exchange 2007 [🔎 →](https://www.shodan.io/search?query=%22x-owa-version%22+%22IE%3DEmulateIE7%22+%22Server%3A+Microsoft-IIS%2F7.0%22)

```plaintext {linenos=false}
"x-owa-version" "IE=EmulateIE7" "Server: Microsoft-IIS/7.0"
```

{{< image src="images/owa2007.png" width="450" alt="Example: OWA for Exchange 2007" />}}

#### Exchange 2010 [🔎 →](https://www.shodan.io/search?query=%22x-owa-version%22+%22IE%3DEmulateIE7%22+http.favicon.hash%3A442749392)

```plaintext {linenos=false}
"x-owa-version" "IE=EmulateIE7" http.favicon.hash:442749392
```

{{< image src="images/owa2010.png" width="450" alt="Example: OWA for Exchange 2010" />}}

#### Exchange 2013 / 2016 [🔎 →](https://www.shodan.io/search?query=%22X-AspNet-Version%22+http.title%3A%22Outlook%22+-%22x-owa-version%22)

```plaintext {linenos=false}
"X-AspNet-Version" http.title:"Outlook" -"x-owa-version"
```

{{< image src="images/owa2013.png" width="580" alt="Example: OWA for Exchange 2013/2016" />}}

### Lync / Skype for Business [🔎 →](https://www.shodan.io/search?query=%22X-MS-Server-Fqdn%22)

```plaintext {linenos=false}
"X-MS-Server-Fqdn"
```

---

## Network Attached Storage (NAS) {#network-attached-storage-nas}

### SMB (Samba) File Shares [🔎 →](https://www.shodan.io/search?query=%22Authentication%3A+disabled%22+port%3A445)

Produces ~500,000 results...narrow down by adding "Documents" or "Videos", etc.

```plaintext {linenos=false}
"Authentication: disabled" port:445
```

Specifically domain controllers: [🔎 →](https://www.shodan.io/search?query=%22Authentication%3A+disabled%22+NETLOGON+SYSVOL+-unix+port%3A445)

```plaintext {linenos=false}
"Authentication: disabled" NETLOGON SYSVOL -unix port:445
```

Concerning [default network shares of QuickBooks](https://quickbooks.intuit.com/learn-support/en-us/help-articles/set-up-folder-and-windows-access-permissions-to-share-company/01/201880) files: [🔎 →](https://www.shodan.io/search?query=%22Authentication%3A+disabled%22+%22Shared+this+folder+to+access+QuickBooks+files+OverNetwork%22+-unix+port%3A445)

```plaintext {linenos=false}
"Authentication: disabled" "Shared this folder to access QuickBooks files OverNetwork" -unix port:445
```

### FTP Servers with Anonymous Login [🔎 →](https://www.shodan.io/search?query=%22220%22+%22230+Login+successful.%22+port%3A21)

```plaintext {linenos=false}
"220" "230 Login successful." port:21
```

### Iomega / LenovoEMC NAS Drives [🔎 →](https://www.shodan.io/search?query=%22Set-Cookie%3A+iomega%3D%22+-%22manage%2Flogin.html%22+-http.title%3A%22Log+In%22)

```plaintext {linenos=false}
"Set-Cookie: iomega=" -"manage/login.html" -http.title:"Log In"
```

{{< image src="images/iomega.png" width="600" alt="Example: Iomega / LenovoEMC NAS Drives" />}}

### Buffalo TeraStation NAS Drives [🔎 →](https://www.shodan.io/search?query=Redirecting+sencha+port%3A9000)

```plaintext {linenos=false}
Redirecting sencha port:9000
```

{{< image src="images/buffalo.png" width="580" alt="Example: Buffalo TeraStation NAS Drives" />}}

### Logitech Media Servers [🔎 →](https://www.shodan.io/search?query=%22Server%3A+Logitech+Media+Server%22+%22200+OK%22)

```plaintext {linenos=false}
"Server: Logitech Media Server" "200 OK"
```

{{< image src="images/logitech.png" width="500" alt="Example: Logitech Media Servers" />}}

### [Plex](https://www.plex.tv/) Media Servers [🔎 →](https://www.shodan.io/search?query=%22X-Plex-Protocol%22+%22200+OK%22+port%3A32400)

```plaintext {linenos=false}
"X-Plex-Protocol" "200 OK" port:32400
```

### [Tautulli / PlexPy](https://github.com/Tautulli/Tautulli) Dashboards [🔎 →](https://www.shodan.io/search?query=%22CherryPy%2F5.1.0%22+%22%2Fhome%22)

```plaintext {linenos=false}
"CherryPy/5.1.0" "/home"
```

{{< image src="images/plexpy.png" width="560" alt="Example: PlexPy / Tautulli Dashboards" />}}

---

## Webcams {#webcams}

Example images not necessary. 🤦

### Yawcams [🔎 →](https://www.shodan.io/search?query=%22Server%3A+yawcam%22+%22Mime-Type%3A+text%2Fhtml%22)

```plaintext {linenos=false}
"Server: yawcam" "Mime-Type: text/html"
```

### webcamXP/webcam7 [🔎 →](https://www.shodan.io/search?query=%28%22webcam+7%22+OR+%22webcamXP%22%29+http.component%3A%22mootools%22+-401)

```plaintext {linenos=false}
("webcam 7" OR "webcamXP") http.component:"mootools" -401
```

### Android IP Webcam Server [🔎 →](https://www.shodan.io/search?query=%22Server%3A+IP+Webcam+Server%22+%22200+OK%22)

```plaintext {linenos=false}
"Server: IP Webcam Server" "200 OK"
```

### Security DVRs [🔎 →](https://www.shodan.io/search?query=html%3A%22DVR_H264+ActiveX%22)

```plaintext {linenos=false}
html:"DVR_H264 ActiveX"
```

---

## Printers & Copiers {#printers-copiers}

### HP Printers [🔎 →](https://www.shodan.io/search?query=%22Serial+Number%3A%22+%22Built%3A%22+%22Server%3A+HP+HTTP%22)

```plaintext {linenos=false}
"Serial Number:" "Built:" "Server: HP HTTP"
```

{{< image src="images/hp.png" width="700" alt="Example: HP Printers" />}}

### Xerox Copiers/Printers [🔎 →](https://www.shodan.io/search?query=ssl%3A%22Xerox+Generic+Root%22)

```plaintext {linenos=false}
ssl:"Xerox Generic Root"
```

{{< image src="images/xerox.png" width="620" alt="Example: Xerox Copiers/Printers" />}}

### Epson Printers [🔎 →](https://www.shodan.io/search?query=%22SERVER%3A+EPSON_Linux+UPnP%22+%22200+OK%22)

```plaintext {linenos=false}
"SERVER: EPSON_Linux UPnP" "200 OK"
```

```plaintext {linenos=false}
"Server: EPSON-HTTP" "200 OK"
```

{{< image src="images/epson.png" width="550" alt="Example: Epson Printers" />}}

### Canon Printers [🔎 →](https://www.shodan.io/search?query=%22Server%3A+KS_HTTP%22+%22200+OK%22)

```plaintext {linenos=false}
"Server: KS_HTTP" "200 OK"
```

```plaintext {linenos=false}
"Server: CANON HTTP Server"
```

{{< image src="images/canon.png" width="550" alt="Example: Canon Printers" />}}

---

## Home Devices {#home-devices}

### Yamaha Stereos [🔎 →](https://www.shodan.io/search?query=%22Server%3A+AV_Receiver%22+%22HTTP%2F1.1+406%22)

```plaintext {linenos=false}
"Server: AV_Receiver" "HTTP/1.1 406"
```

{{< image src="images/yamaha.png" width="550" alt="Example: Yamaha Stereos" />}}

### Apple AirPlay Receivers [🔎 →](https://www.shodan.io/search?query=%22%5Cx08_airplay%22+port%3A5353)

Apple TVs, HomePods, etc.

```plaintext {linenos=false}
"\x08_airplay" port:5353
```

### Chromecasts / Smart TVs [🔎 →](https://www.shodan.io/search?query=%22Chromecast%3A%22+port%3A8008)

```plaintext {linenos=false}
"Chromecast:" port:8008
```

### [Crestron Smart Home](https://www.crestron.com/Products/Market-Solutions/Residential-Solutions) Controllers [🔎 →](https://www.shodan.io/search?query=%22Model%3A+PYNG-HUB%22)

```plaintext {linenos=false}
"Model: PYNG-HUB"
```

---

## Random Stuff {#random-stuff}

### OctoPrint 3D Printer Controllers [🔎 →](https://www.shodan.io/search?query=title%3A%22OctoPrint%22+-title%3A%22Login%22+http.favicon.hash%3A1307375944)

```plaintext {linenos=false}
title:"OctoPrint" -title:"Login" http.favicon.hash:1307375944
```

{{< image src="images/octoprint.png" width="700" alt="Example: OctoPrint 3D Printers" />}}

### Etherium Miners [🔎 →](https://www.shodan.io/search?query=%22ETH+-+Total+speed%22)

```plaintext {linenos=false}
"ETH - Total speed"
```

{{< image src="images/eth.png" width="800" alt="Example: Etherium Miners" />}}

### Apache Directory Listings [🔎 →](https://www.shodan.io/search?query=http.title%3A%22Index+of+%2F%22+http.html%3A%22.pem%22)

Substitute `.pem` with any extension or a filename like `phpinfo.php`.

```plaintext {linenos=false}
http.title:"Index of /" http.html:".pem"
```

### Misconfigured WordPress [🔎 →](https://www.shodan.io/search?query=http.html%3A%22*+The+wp-config.php+creation+script+uses+this+file%22)

Exposed [`wp-config.php`](https://github.com/WordPress/WordPress/blob/master/wp-config-sample.php) files containing database credentials.

```plaintext {linenos=false}
http.html:"* The wp-config.php creation script uses this file"
```

### Too Many Minecraft Servers [🔎 →](https://www.shodan.io/search?query=%22Minecraft+Server%22+%22protocol+340%22+port%3A25565)

```plaintext {linenos=false}
"Minecraft Server" "protocol 340" port:25565
```

### Literally [Everything](https://www.vox.com/2014/12/22/7435625/north-korea-internet) in North Korea 🇰🇵 [🔎 →](https://www.shodan.io/search?query=net%3A175.45.176.0%2F22%2C210.52.109.0%2F24)

```plaintext {linenos=false}
net:175.45.176.0/22,210.52.109.0/24,77.94.35.0/24
```

### TCP Quote of the Day [🔎 →](https://www.shodan.io/search?query=port%3A17+product%3A%22Windows+qotd%22)

Port 17 ([RFC 865](https://tools.ietf.org/html/rfc865)) has a [bizarre history](https://en.wikipedia.org/wiki/QOTD)...

```plaintext {linenos=false}
port:17 product:"Windows qotd"
```

### Find a Job Doing This! 👩‍💼 [🔎 →](https://www.shodan.io/search?query=%22X-Recruiting%3A%22)

```plaintext {linenos=false}
"X-Recruiting:"
```

---

If you've found any other juicy Shodan gems, whether it's a search query or a specific example, [open an issue/PR on GitHub!](https://github.com/jakejarvis/awesome-shodan-queries)

Bon voyage, fellow penetrators! 😉
