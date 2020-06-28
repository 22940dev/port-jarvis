---
title: "How To: Automatically Backup a Linux VPS to a Separate Cloud Storage Service"
date: 2019-06-09 19:03:10-0400
description: "A walkthrough for backing up a Linux server to an external storage provider like Amazon S3 automatically."
tags:
  - How To
  - Tutorial
  - Servers
  - Backups
  - Linux
  - Restic
image: "images/apocalypse.png"
draft: false
---

{{< image src="images/apocalypse.png" >}}**The Cloud-pocalypse:** Coming soon(er than you think) to a server near you.{{< /image >}}

Last month, the founder of [a small startup](https://raisup.com/) got quite a bit of [attention on Twitter](https://twitter.com/w3Nicolas/status/1134529316904153089) (and [Hacker News](https://news.ycombinator.com/item?id=20064169)) when he called out [DigitalOcean](https://www.digitalocean.com/) who, in his words, "killed" his company. Long story short: DigitalOcean's automated abuse system flagged the startup's account after they spun up about ten powerful droplets for some CPU-intensive jobs and deleted them shortly after — which is literally **the biggest selling point** of a "servers by the hour" company like DigitalOcean, by the way — and, after replying to the support ticket, an unsympathetic customer support agent [declined to reactivate](https://twitter.com/w3Nicolas/status/1134529372172509184) the account without explanation. [Nicolas](https://twitter.com/w3Nicolas) had no way of even accessing his data, turning the inconvenient but trivial task of migrating servers into a potentially fatal situation for his company.

{{< tweet "https://twitter.com/w3Nicolas/status/1134529316904153089" >}}

Predictably, there were [a](https://twitter.com/kolaente/status/1134897543643615238) [lot](https://twitter.com/hwkfr/status/1135164281731911681) [of](https://twitter.com/joestarstuff/status/1135406188114276352) [Monday](https://twitter.com/FearbySoftware/status/1134717875351052288)-[morning](https://twitter.com/mkozak/status/1134557954785587200) [quarterbacks](https://twitter.com/MichMich/status/1134547174447026181) who weighed in, scolding him for not having backups ([he did](https://twitter.com/w3Nicolas/status/1134529374676500482), but they were also stored on DigitalOcean) and not paying a boatload of non-existent money for expensive load balancers pointing to multiple cloud providers. Hindsight is always 20/20, of course, but if we're talking about a small side project that exploded into a full-fledged startup with Fortune 500 clients seemingly overnight, I _completely_ understand Nicolas' thought process. _"Let's just take advantage of cloud computing's #1 selling point: press a few buttons to make our servers [harder, better, faster, stronger](https://www.youtube.com/watch?v=x84m3YyO2oU) and get back to coding!"_

Most of the popular one-click server providers (including [DigitalOcean](https://www.digitalocean.com/docs/images/backups/overview/), as well as [Linode](https://www.linode.com/backups), [Vultr](https://www.vultr.com/docs/vps-automatic-backups), and [OVH](https://www.ovh.com/world/vps/backup-vps.xml)) provide their own backup offerings for an additional monthly cost (usually proportional to your plan). But as Nicolas learned the hard way, any amount of backups are just more eggs in the same basket if everything is under one account with one credit card on one provider.

Luckily, crafting a DIY automated backup system using a second redundant storage provider isn't as daunting (nor as expensive) as it might sound. The following steps are how I backup my various VPSes to a totally separate cloud in the sky.

---

There are quite a few tools that have been around for decades that could accomplish this task — namely [`rsync`](https://en.wikipedia.org/wiki/Rsync) — but an [open-source](https://github.com/restic/restic) tool named [**Restic**](https://restic.net/) has won my heart for both its simplicity and the wide range of destinations it natively supports, including but not limited to:

- [Amazon AWS S3](https://aws.amazon.com/s3/)
- [Backblaze B2](https://www.backblaze.com/b2/cloud-storage.html)
- [Google Cloud Storage](https://cloud.google.com/storage/)
- [Azure Storage](https://azure.microsoft.com/en-us/services/storage/)
- ...and [literally anywhere](https://restic.readthedocs.io/en/stable/030_preparing_a_new_repo.html#sftp) you can SFTP (or SSH) into.

Backups are encrypted by default, too, which is a tasty cherry on top!

Setting up Restic is certainly easier than a low-level tool like `rsync`, but it can still be tricky. Follow these steps and you'll have a fully automated system making easily restorable backups of your important files in preparation for your own (likely inevitable) Cloud-pocalypse.

---

## 0. Sign up for a second cloud service

I host most of my projects on [Linode](https://www.linode.com/?r=0c5aeace9bd591be9fbf32f96f58470295f1ee05) (affiliate link) and chose [Amazon's S3](https://aws.amazon.com/s3/) as my backup destination. S3 is easily the gold-standard in random file storage and I'd highly recommend it — unless your servers are also on Amazon with EC2, of course. My second choice would be [Backblaze's B2](https://www.backblaze.com/b2/cloud-storage.html), which is comparable to S3 in semantics and price.

Writing steps to create an S3 bucket would be incredibly redundant, so here are Amazon's writeups on creating one (make sure the bucket is **_fully private;_** the other default settings are fine) as well as grabbing your account's "access keys" which will be used to authenticate Restic with S3.

- [How Do I Create an S3 Bucket?](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html)
- [Understanding and Getting Your Security Credentials](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html)

## 1. Install Restic

Restic might be included in your OS's default repositories (it is on Ubuntu) but it's better to opt for the releases on [Restic's GitHub page](https://github.com/restic/restic/releases). The binary you'll get from `apt` or `yum` will be several versions behind, and the GitHub flavor auto-updates itself anyways.

Find the latest version of Restic on their [GitHub releases page](https://github.com/restic/restic/releases/latest). Since I'm assuming this is a Linux server, we only want the file ending in `_linux_amd64.bz2`. (For a 32-bit Linux server, find `_linux_386.bz2`. Windows, macOS, and BSD binaries are also there.) Right-click and copy the direct URL for that file and head over to your server's command line to download it into your home directory:

```bash {linenos=false}
cd ~
wget https://github.com/restic/restic/releases/download/v0.9.5/restic_0.9.5_linux_amd64.bz2
```

Next, we'll unzip the download in place:

```bash {linenos=false}
bunzip2 restic_*
```

This should leave us with a single file: the Restic binary. In order to make Restic available system-wide and accessible with a simple `restic` command, we need to move it into the `/usr/local/bin` folder, which requires `sudo` access:

```bash {linenos=false}
sudo mv restic_* /usr/local/bin/restic
sudo chmod a+x /usr/local/bin/restic
```

Now's a good time to run `restic` to make sure we're good to move on. If you see the version number we downloaded, you're all set!

```bash {linenos=false}
restic version
```

## 2. Connect Restic to S3

This step is a _little_ different for each cloud provider. My walkthrough assumes S3, but [Restic's documentation](https://restic.readthedocs.io/en/latest/030_preparing_a_new_repo.html) lays out the variables you'll need to authenticate with different providers.

If you haven't already [created a new S3 bucket](https://docs.aws.amazon.com/quickstarts/latest/s3backup/step-1-create-bucket.html) and grabbed your [access key and secret](https://docs.aws.amazon.com/general/latest/gr/managing-aws-access-keys.html) from the AWS console, do so now.

We need to store these keys as environment variables named `AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY`. For now, we'll set these temporarily until we automate everything in the next step.

```bash {linenos=false}
export AWS_ACCESS_KEY_ID="your AWS access key"
export AWS_SECRET_ACCESS_KEY="your AWS secret"
```

We'll also need to tell Restic where the bucket is located and set a secure password to encrypt the backups. You can generate a super-secure 32-character password by running `openssl rand -base64 32` — just make sure you store it somewhere safe!

```bash {linenos=false}
export RESTIC_REPOSITORY="s3:s3.amazonaws.com/your-bucket-name"
export RESTIC_PASSWORD="passw0rd123-just-kidding"
```

## 3. Initialize the backup repository

Now we're ready to have Restic initialize the repository. This saves a `config` file in your S3 bucket and starts the encryption process right off the bat. You only need to run this once.

```bash {linenos=false}
restic init
```

If successful, you should see a message containing `created restic backend`. If not, make sure you set all four environment variables correctly and try again.

## 4. Make our first backup

Now that the hard parts are done, creating a backup (or "snapshot" in Restic terms) is as simple as a one-line command. All we need to specify is the directory you want to backup.

```bash {linenos=false}
restic backup /srv/important/data
```

Running `restic snapshots` will list every snapshot you've stored. You should see one listed at this point if everything went according to plan.

## 5. Automate backups using a cron job

All of this is fine and good, but doing this manually whenever you happen to remember to won't be very helpful if trouble strikes. Thankfully, Linux makes it incredibly easy to automate scripts using [cron jobs](https://en.wikipedia.org/wiki/Cron). So let's set one up for this.

Make a new file at a convenient location on your server and name it `backup.sh`. This is where we'll replicate everything we did above. Here's my full `.sh` file:

```bash
#!/bin/bash

export AWS_ACCESS_KEY_ID="xxxxxxxx"
export AWS_SECRET_ACCESS_KEY="xxxxxxxx"
export RESTIC_REPOSITORY="s3:s3.amazonaws.com/xxxxxxxx"
export RESTIC_PASSWORD="xxxxxxxx"

restic backup -q /srv/xxxxxxxx
```

(The `-q` flag silences the output, since we won't be able to see it anyways.)

I highly recommend adding one final command to the end of the file: Restic's `forget` feature. Constantly storing multiple snapshots a day to S3 without pruning them will rack up your bill more than you'd probably like. Using `forget`, we can specify how many snapshots we want to keep and from when.

This command keeps one snapshot from each of the last **six hours**, one snapshot from each of the last **seven days**, one snapshot from each of the last **four weeks**, and one snapshot from each of the last **twelve months**.

```bash {linenos=false}
restic forget -q --prune --keep-hourly 6 --keep-daily 7 --keep-weekly 4 --keep-monthly 12
```

Reading [the documentation](https://restic.readthedocs.io/en/latest/060_forget.html#removing-snapshots-according-to-a-policy) for different `forget` options can be helpful if you want to customize these.

Save the shell script and close the editor. Don't forget to make the script we just wrote actually executable:

```bash {linenos=false}
chmod +x backup.sh
```

Lastly, we need to set the actual cron job. To do this, run `sudo crontab -e` and add the following line to the end:

```bash {linenos=false}
0 * * * * /root/backup.sh
```

The first part specifies how often the script should run. `0 * * * *` runs it right at the top of every hour. Personally, I choose to run it at the 15th minute of every _other_ hour, so mine looks like `15 */2 * * *`. [crontab.guru](https://crontab.guru/#0_*_*_*_*) is a nifty "calculator" to help you customize this expression to your liking — it's definitely not the most intuitive syntax.

The second part specifies where the script we just wrote is located, of course, so set that to wherever you saved `backup.sh`.

## 6. Verifying and restoring snapshots

**Side note:** In order to use `restic` in future shell sessions, we need to make the four environment variables permanent by adding them to your `.bash_profile` or `.bashrc` file in your home directory. Simply copy and paste the four `export` lines from the `backup.sh` file we created above to the end of either dotfile.

Take note of the next time that your new cron job _should_ run, so we can check that it was automatically triggered. After that time — at the top of the next hour if you used my defaults in the last step — you can run `restic snapshots` like we did before to make sure there's an additional snapshot listed, and optionally take the IDs of each snapshot and run `restic diff ID_1 ID_2` to see what's changed between the two.

To restore a snapshot to a certain location, grab the ID from `restic snapshots` and use `restore` like so:

```bash {linenos=false}
restic restore 420x69abc --target ~/restored_files
```

You can also replace the ID with `latest` to restore the latest snapshot.

~~If~~ When trouble strikes and you're setting up a new server, just re-follow steps one, two, and six and you'll have all your files back before you know it!

There are a few other neat options for browsing and restoring snapshots, like `mount`ing a snapshot as a disk on your file system. Read more about that on the ["restoring from backup" docs](https://restic.readthedocs.io/en/latest/050_restore.html) page.

---

Again, [Restic's documentation](https://restic.readthedocs.io/en/latest/index.html) is really, really well written, so I definitely recommend skimming it to see what else is possible.

Literally every company's Doomsday protocols can _always_ be improved, and external backups are just one part of redundancy. But pat yourself on the back — this might have been a convoluted process, but hopefully you'll be able to sleep better at night knowing your startup or personal server now has a **far** better chance of surviving whatever the cloud rains down upon you!

If you have any questions, feel free to leave a comment or [get in touch with me](https://twitter.com/jakejarvis). Be safe out there!
