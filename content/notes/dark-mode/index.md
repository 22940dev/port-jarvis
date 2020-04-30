---
title: "How To: Add Dark Mode to a Website 🌓"
date: 2020-04-29 12:14:09-0400
description: "Simple dark mode switching using local storage, OS preference detection, and minimal JavaScript."
tags:
  - CSS
  - JavaScript
  - Dark Mode
  - How To
  - Tutorial
css: |
  div#content div.embed iframe {
    height: 200px;
    width: 100%;
    max-width: 650px;
    display: block;
    box-sizing: border-box;
    margin: 0 auto;
    border: 2px solid #cccccc;
  }
---

Love it or hate it, it seems that the [dark mode fad](https://en.wikipedia.org/wiki/Light-on-dark_color_scheme) is here to stay, especially now that more and more devices have [OLED screens](https://www.macrumors.com/2019/10/21/ios-13-dark-mode-extends-iphone-battery-life/) that display true blacks... which means that these trendsetters might go blind from your site's insanely white background if you're behind the curve and don't offer your own dark mode.

It _is_ possible to use [pure CSS3 media queries to do this](https://css-tricks.com/dark-modes-with-css/) by reading a user's system and/or browser preference, which might be enough if you're okay with **only** supporting the [latest, cutting-edge browsers](https://caniuse.com/#feat=prefers-color-scheme) and OSes. But if you want your own button on your website that switches back and forth between the two modes, there's no avoiding getting your hands a little dirty with some JavaScript.

I've written a simple implementation below, which...

- Defaults to a user's system preference, until they press your toggle to set it themselves
- Listens for clicks on any element of your choosing --- just set the class to `dark-mode-toggle`. For example:

```html {linenos=false}
<button class="dark-mode-toggle">💡 Switch Themes</button>
```

- Remembers the visitor's preference between visits using the [local storage](https://www.w3schools.com/html/html5_webstorage.asp) of the their browser (not cookies, please don't use cookies!)
- Switches your `<body>`'s class between `light` and `dark`...

...meaning that any CSS selectors beginning with `body.dark` or `body.light` will only apply when the respective mode is active. A good place to start is by separating any color rules --- your background, text, links, etc. --- into a different section of your CSS. Using [SASS or SCSS](https://sass-lang.com/) makes this a whole lot [easier with nesting](https://sass-lang.com/guide#topic-3) but is not required; this was written with a [KISS](https://getyarn.io/yarn-clip/embed/eed08f4f-d1c9-4cc0-b041-f280a5dbf0a5?autoplay=false) mentality.

{{< iframe src="https://jakejarvis.github.io/dark-mode-example/" width="650" height="200" >}}

A _very_ barebones example is embedded above ([view the source here](https://github.com/jakejarvis/dark-mode-example)) or you can try it out on this site by clicking the 💡 lightbulb in the upper right corner of this page. You'll notice that the dark theme sticks when refreshing this page, navigating between other pages, or if you were to return to this example weeks from now.

---

### Minified JS: (392 bytes gzipped 📦)

```js
/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */
(function(){var e=window,t=e.document,i=t.body.classList,a=localStorage,c="dark_mode_pref",d=a.getItem(c),r="dark",o="light",s=t.querySelector(".dark-mode-toggle"),n=!1,m=function(e){i.remove(r,o);i.add(e);n=e===r};d===r&&m(r);d===o&&m(o);if(!d){var l="(prefers-color-scheme: dark)",f="(prefers-color-scheme: light)";e.matchMedia(l).matches?m(r):m(o);e.matchMedia(l).addListener((function(e){e.matches&&m(r)}));e.matchMedia(f).addListener((function(e){e.matches&&m(o)}))}if(s){s.style.visibility="visible";s.addEventListener("click",(function(){if(n){m(o);a.setItem(c,o)}else{m(r);a.setItem(c,r)}}),!0)}})();
```

### Full JS:

```js
/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */

(function() {
  // improve variable mangling when minifying
  var win = window;
  var doc = win.document;
  var bod = doc.body;
  var cls = bod.classList;
  var sto = localStorage;

  // check for preset `dark_mode_pref` preference in localStorage
  var pref_key = 'dark_mode_pref';
  var pref = sto.getItem(pref_key);

  // change CSS via these <body> classes:
  var dark = 'dark';
  var light = 'light';

  // use an element with class `dark-mode-toggle` to trigger swap when clicked
  var toggle = doc.querySelector('.dark-mode-toggle');

  // keep track of current state (light by default) no matter how we got there
  var active = false;

  // receives a class name and switches <body> to it
  var activateTheme = function(theme) {
    cls.remove(dark, light);
    cls.add(theme);
    active = (theme === dark);
  };

  // if user already explicitly toggled in the past, restore their preference
  if (pref === dark) activateTheme(dark);
  if (pref === light) activateTheme(light);

  // user has never clicked the button, so go by their OS preference until/if they do so
  if (!pref) {
    // check for OS dark mode setting and switch accordingly
    var prefers_dark = '(prefers-color-scheme: dark)';
    var prefers_light = '(prefers-color-scheme: light)';

    if (win.matchMedia(prefers_dark).matches)
      activateTheme(dark);
    else
      activateTheme(light);

    // real-time switching if supported by OS/browser
    win.matchMedia(prefers_dark).addListener(function(e) { if (e.matches) activateTheme(dark); });
    win.matchMedia(prefers_light).addListener(function(e) { if (e.matches) activateTheme(light); });
  }

  // don't freak out if page happens not to have a toggle
  if (toggle) {
    // toggle re-appears now that we know user has JS enabled
    toggle.style.visibility = 'visible';

    // handle toggle click
    toggle.addEventListener('click', function() {
      // switch to the opposite theme & save preference in local storage
      if (!active) {
        activateTheme(dark);
        sto.setItem(pref_key, dark);
      } else {
        activateTheme(light);
        sto.setItem(pref_key, light);
      }
    }, true);
  }
})();
```

### HTML & CSS Example:

```html
<!doctype html>
<head>
  <style>
    /* rules that apply globally */
    body {
      font-family: system-ui, -apple-system, sans-serif;
      text-align: center;
    }
    a {
      text-decoration: none;
    }
    .dark-mode-toggle {
      cursor: pointer;
      padding: 1em;

      /* hide toggle until we're sure user has JS enabled */
      visibility: hidden;
    }

    /* theme-specific rules -- you probably only want color-related stuff here */
    /* SCSS makes this a whole lot easier by allowing nesting, but is not required */
    body.light {
      background-color: #fff;
      color: #222;
    }
    body.light a {
      color: #06f;
    }
    body.dark {
      background-color: #222;
      color: #fff;
    }
    body.dark a {
      color: #fe0;
    }
  </style>
</head>
<body class="light">
  <h1>Welcome to the dark side 🌓</h1>
  <p><a href="https://github.com/jakejarvis/dark-mode-example">View the source code.</a></p>

  <button class="dark-mode-toggle">💡 You know you want to click this...</button>

  <script async defer src="dark-mode.min.js"></script>
</body>
</html>
```

---

### Further reading:

- [The Dark (Mode) Web Rises](https://charlesrt.uk/blog/the-dark-web-rises/)
- [Dark Mode vs. Light Mode: Which Is Better?](https://www.nngroup.com/articles/dark-mode/)
- [The dawn of Dark Mode](https://uxdesign.cc/the-dawn-of-dark-mode-9636d1c9bcf0)
- [Redesigning your product and website for dark mode](https://stuffandnonsense.co.uk/blog/redesigning-your-product-and-website-for-dark-mode)
- [Dark theme in a day](https://medium.com/@mwichary/dark-theme-in-a-day-3518dde2955a)
