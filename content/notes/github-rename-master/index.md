---
title: "How To: Safely Rename `master` Branch on GitHub ✊🏾"
date: 2020-06-28 09:28:52-0400
description: 'Some of the most popular open-source projects are renaming their default branch from "master" on GitHub. Here''s how to do so, and safely.'
tags:
  - How To
  - Tutorial
  - Git
  - GitHub
  - Open Source
  - Black Lives Matter
image: "images/github-default.png"
draft: false
---

{{< image src="images/blm-topic.png" alt="Black lives matter." />}}

In the midst of this year's long-overdue support of the [**Black Lives Matter**](https://blacklivesmatters.carrd.co/) movement and calls to action in the US and around the world, a [new spotlight](https://mail.gnome.org/archives/desktop-devel-list/2019-May/msg00066.html) has been placed on unchecked invocations of racially charged language in the computer science world, no matter how big or small — like the long-standing and, until recently, widely accepted terms ["master" and "slave"](https://tools.ietf.org/id/draft-knodel-terminology-00.html#master-slave) as an oppressive metaphor for ownership/importance.

When somebody pointed out the negative connotations of Git projects being created with a branch named `master` by default, and the possibility of this making minorities feel even more unwelcome in an industry already [lacking diversity](https://www.informationisbeautiful.net/visualizations/diversity-in-tech/), GitHub CEO [Nat Friedman](https://github.com/nat) quietly [announced a plan](https://twitter.com/natfriedman/status/1271253144442253312) to change this on Twitter (ignore the replies for your sanity):

{{< tweet "https://twitter.com/natfriedman/status/1271253144442253312" >}}

I think many people misunderstood this tweet to mean GitHub will forcefully rename the `master` branch of all existing projects, which would break _millions_ of programmers' workflows. If anything, it's more likely a name such as `main` will replace `master` as **the default when creating a new repository**, but that change hasn't been made yet. [GitLab is also discussing](https://gitlab.com/gitlab-org/gitlab/-/issues/221164) a similar switch to `main` as the default name. (Ideally, these changes would be made in tandem with the actual Git codebase, too. [~~But this doesn't seem likely.~~](https://lore.kernel.org/git/CAOAHyQwyXC1Z3v7BZAC+Bq6JBaM7FvBenA-1fcqeDV==apdWDg@mail.gmail.com/t/))

> **Update:** GitHub has [published more details about their plan](https://github.com/github/renaming) to move from `master` to `main` and it will indeed be voluntary and configurable. To my surprise, the Git maintainers have [also agreed to add](https://sfconservancy.org/news/2020/jun/23/gitbranchname/) a `init.defaultBranch` setting to customize the default branch for new repositories in Git 2.28.

But this means in the meantime, project owners are free to rename their branches as they please — and it's pretty simple to do so, usually with minimal disruption. [Some](https://github.com/desktop/desktop/issues/6478) [of](https://github.com/cli/cli/issues/929) [the](https://github.com/sindresorhus/awesome/issues/1793) [biggest](https://github.com/rust-lang/rustlings/issues/437) [OSS](https://github.com/twbs/bootstrap/pull/31050) [projects](https://github.com/ohmyzsh/ohmyzsh/issues/9015) have already voluntarily done so. Here's how to join them.

---

### 1. Move your `master` branch to `main`:

...or `development`, `unstable`, `trunk`, `live`, `original`; your choice!

We use `branch -m` to **move** the branch locally instead of creating a new one with `checkout -b` like you might be used to.

```bash {linenos=false}
git branch -m master main
```

### 2. Push the new branch to GitHub:

The first command is probably familiar. `-u` sets the new branch as the local default at the same time, and the second line ensures our local `HEAD` points to our new branch on GitHub.

```bash {linenos=false}
git push -u origin main
git remote set-head origin main
```

You can verify this worked by running `git branch -r`. You should see something like `origin/HEAD -> origin/main`.

### 3. Change the default branch in your repository's settings:

Setting the default branch remotely is the only step that can't be done on the command line (although you can technically [use the GitHub API](https://github.com/erbridge/github-branch-renamer)). Head to **Settings → Branches** on GitHub to [change the default branch](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/changing-the-base-branch-of-a-pull-request).

{{< image src="images/github-default.png" width="810" alt="Changing the default branch of a GitHub repository" />}}

### 4. Delete the old `master` branch on GitHub:

We used `-m` (move) to **rename** the `master` branch locally, but GitHub will still have two identical branches at this point (as you saw in the previous step). Deleting it can be a little nerve-racking, so poke around your repository on GitHub and make sure your new branch is there and the commit history is correct.

You can say good riddance to `master` [through the GitHub UI](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-and-deleting-branches-within-your-repository#deleting-a-branch) or with this command:

```bash {linenos=false}
git push origin --delete master
```

### 4. Scan your code, scripts, automation, etc. for references to `master`:

Do a quick search of your codebase for `master` to manually replace any dead references to it.

Pay attention to CI files — `.travis.yml`, `.github/workflows/`, `.circleci/config.yml`, etc. — and make sure there aren't any external services relying on `master` being there. For example, I almost forgot to change the branch [Netlify triggers auto-deploys](https://docs.netlify.com/site-deploys/overview/#branches-and-deploys) from to build this site:

{{< image src="images/netlify-deploy.png" width="720" alt="Netlify auto-deployment branch setting" />}}

~~Unfortunately, GitHub won't redirect links containing `master` to the new branch (as of now), so look for any [github.com](https://github.com/) URLs as well.~~

> **Update:** GitHub is now [redirecting deleted branches](https://github.blog/changelog/2020-07-17-links-to-deleted-branches-now-redirect-to-the-default-branch/) to the default branch!

### Bonus points:

None of this will work on a brand new repository with zero commits. But we can hack around this limitation pretty easily...

You can create a [Git alias](https://git-scm.com/book/en/v2/Git-Basics-Git-Aliases) in your local environment's `.gitconfig` to make `main` the default branch name for new repositories. Git doesn't let you override some native commands like `git init`, so we'll create our own `git new` command instead ([h/t @johnsyweb](https://twitter.com/johnsyweb/status/1269881549056438272)):

```bash {linenos=false}
git config --global alias.new '!git init && git symbolic-ref HEAD refs/heads/main'
```

---

This may be a small gesture, but anything we can do to make even one more volunteer feel more welcome in the OSS community will _always_ be worth the extra 10 to 15 minutes of inconvenience on my end. ✊🏾

And while we're at it, Nat... **It's time to finally [#DropICE](https://github.com/drop-ice/dear-github-2.0).** 🧊

---

### Further reading:

- [_Master/slave (technology)_ on Wikipedia](<https://en.wikipedia.org/wiki/Master/slave_(technology)>)
- [History of "master" in BitKeeper → Git](https://mail.gnome.org/archives/desktop-devel-list/2019-May/msg00066.html)
- [More great research into context of "master/slave" in BitKeeper](https://twitter.com/jpaulreed/status/1272038656799211521)
- [Proposal to change "master" default on Git mailing list](https://lore.kernel.org/git/CAOAHyQwyXC1Z3v7BZAC+Bq6JBaM7FvBenA-1fcqeDV==apdWDg@mail.gmail.com/t/) (it did **not** go well...)
- [Django removes "master/slave" terminology (2014)](https://github.com/django/django/pull/2692)
- [Black Tech for Black Lives](https://www.blacktechforblacklives.com/)
