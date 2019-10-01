---
title: "My First Code: Jake's Bulletin Board"
date: 2019-10-01 08:34:25-0400
description: "My first full coding project ever – a PHP bulletin board creatively titled Jake's Bulletin Board, circa 2003."
tags:
  - Hello World
  - Baby's First PHP
  - Nostalgia
  - Vintage Code
  - Awesome List
image: "jbb-screen1.png"
draft: false
---


{{< image src="images/netscape.png" alt="Awesome First Code on GitHub" >}}

{{< image src="images/badges.png" width="537" alt="Code Quality: A for effort" >}}


I recently published my terrible, horrible, no good, very bad [first HTML site](https://jarv.is/y2k) and [first PHP project](https://github.com/jakejarvis/jbb#readme) ever and developed a new addiction to Web 1.0 nostalgia, fed by others who were brave enough to do the same.

So, I started compiling an [awesome-list of other "first code" on GitHub](https://github.com/jakejarvis/awesome-first-code). It was originally aimed towards those of us who grew up in the Geocities and FrontPage and Macromedia Flash era, but coders of all ages are welcome to dust off that floppy disk or 256MB USB thumb drive (or the [Wayback Machine](https://archive.org/web/), if you can remember your first screen name 😬) and commit your first project unmodified to GitHub for posterity — and proudly [link to it](https://github.com/jakejarvis/awesome-first-code/edit/master/readme.md) on the list! (I'm trying very hard to make this a cool trend, if you couldn't tell.)

Hopefully we can all look back at our first projects and be proud of how far we've come since then — no embarrassment allowed! Okay, maybe a little is fine...


---


{{< image src="images/jbb-logo.png" width="640" alt="Jake's Bulletin Board" caption="Jake's Bulletin Board" >}}


Aside from my [first HTML creation](https://jarv.is/y2k) (circa 2001), my first real coding project was in 2003: a PHP 4 masterpiece creatively titled **Jake's Bulletin Board**. I've published the [source code in full on GitHub](https://github.com/jakejarvis/jbb) for your viewing pleasure and highlighted the best/worst parts below.

## Usage

If you're bored on a rainy day, potential activities could include:

- Easiest code review you'll do in your entire career. (Or hardest, depending on your attitude.)
- Hacking speed-runs to boost your infosec self-esteem.
- Beating the [world record for longest laugh](http://goldenbookofrecords.com/longest-laughter/), currently held by Mr. Belachew Girma of Ethiopia with 3 hours and 6 minutes.
- Actually getting this to run in 2019.


## Embarrassing Highlights

Who cares if somebody wants to delete a post with the ID "`*`" no matter the author? ([delete_reply_submit.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/delete_reply_submit.php#L9))

```php
<?php
  $query2 = "DELETE FROM jbb_replies
WHERE replyID ='$replyID'";
$result2 = mysql_query ($query2)
        or die ($query2); 
?>
```

Sessions based on storing an auto-incremented user ID in a cookie. ([login_submit.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/login_submit.php#L28))

```php
<?php
session_id($user->userID);
session_start();
$_SESSION["ck_userID"] = $user->userID;
$_SESSION["ck_username"] = $user->username;
$_SESSION["ck_groupID"] = $user->groupID;
?>
```

Viewing a "private" message based solely on a sequential message ID. ([pm_view.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/pm_view.php#L13))

```php
<?php
$query1 = "SELECT * FROM jbb_pm WHERE pmID = '$pmID'";
?>
```

Incredibly ambitious emoticon and [BBCode](https://en.wikipedia.org/wiki/BBCode) support. I honestly can't begin to explain this logic. ([functions.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/functions.php#L18))

```php
<?php
$replacement = '<IMG SRC=images/emoticons/smile.gif>';
$replacement2 = '<IMG SRC=images/emoticons/bigsmile.gif>';
$replacement3 = '<IMG SRC=images/emoticons/frown.gif>';
$replacement4 = '<IMG SRC=images/emoticons/crying.gif>';
$replacement5 = '<IMG SRC=images/emoticons/blush.gif>';
// ... yada yada yada ...
$replacement21 = '<a href="';
$replacement22 = '">';
$replacement23 = '</a>';
$replacement24 = '<FONT COLOR="';
$replacement25 = '</FONT>';
$replacement26 = '<FONT SIZE="';
$replacement27 = '<BR>';

$topicval = str_replace(':)', $replacement, $topicval);
$topicval = str_replace(':D', $replacement2, $topicval);
$topicval = str_replace(':(', $replacement3, $topicval);
$topicval = str_replace(':crying:', $replacement4, $topicval);
$topicval = str_replace(':blush:', $replacement5, $topicval);
// you get the point...
$topicval = str_replace('[URL=', $replacement21, $topicval);
$topicval = str_replace(':]', $replacement22, $topicval);
$topicval = str_replace('[/URL]', $replacement23, $topicval);
$topicval = str_replace('[FONT COLOR=', $replacement24, $topicval);
$topicval = str_replace('[/FONT]', $replacement25, $topicval);
$topicval = str_replace('[FONT SIZE=', $replacement26, $topicval);
$topicval = str_replace('
', $replacement27, $topicval);

// repeated five more times throught the code...
?>
```

Saving new passwords as plaintext — probably the least problematic problem. ([register_submit.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/register_submit.php#L10))

```php
<?php
$query = "INSERT INTO jbb_users (username, password, email, avatar) VALUES ('$username','$password','$email','images/avatars/noavatar.gif')";
?>
```

I guess I gave up on counting `$query`s by ones...  ([functions.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/functions.php#L231))

```php
<?php
while ($topic = mysql_fetch_object($result30)) {
    $query40 = "SELECT * FROM jbb_users WHERE userID = '$topic->userID'";
    $result20 = mysql_query($query40)
        or die ($query40);
		
    $query50 = "SELECT * FROM jbb_replies WHERE replyID = '$replyID'";
    $result50 = mysql_query($query50)
        or die ($query50);

    $reply = mysql_fetch_object($result50);

    $query60 = "SELECT * FROM jbb_users WHERE userID = '$reply->userID'";
    $result60 = mysql_query($query60)
        or die ($query60);

    $user = mysql_fetch_object($result60);

    $query7 = "SELECT * FROM jbb_topics WHERE userID = '$reply->userID'";
    $result7 = mysql_query($query7)
        or die ($query7);

    $query8 = "SELECT * FROM jbb_replies WHERE userID = '$reply->userID'";
    $result8 = mysql_query($query8)
        or die ($query8);

    $usertopics = mysql_numrows($result7);

    $userreplies = mysql_numrows($result8);
}
?>
```

The installation "wizard" (that's the joke, I presume...) ([sql_submit.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/setup/sql_submit.php))

{{< image src="images/jbb-screen1.png" alt="JBB Installation Wizard" >}}

And finally, JBB's actual interface... or literally as much of it as I could get to function in 2019. ([index.php](https://github.com/jakejarvis/jbb/blob/87b606797414b2fe563af85e269566fc5e076cc5/index.php))

{{< image src="images/jbb-screen3.png" alt="JBB Homepage" >}}

{{< image src="images/jbb-screen4.png" alt="JBB Post" >}}
