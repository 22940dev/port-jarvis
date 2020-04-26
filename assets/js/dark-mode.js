/* jshint esversion: 6, indent: 2, browser: true, quotmark: single */

// inspired by https://codepen.io/kevinpowell/pen/EMdjOV

// lightbulb toggle re-appears now that we know user has JS enabled
const toggle = document.querySelector('button#dark-mode-toggle');
toggle.style.visibility = 'visible';

// check for preset `dark_mode_pref` in localStorage
let pref = localStorage.getItem('dark_mode_pref');

// keep track of current state (light by default)
let activated = false;

// dynamically switch utteranc.es's theme
let utterancesInit = false;
const setUtterances = function() {
  let theme = activated ? 'github-dark' : 'github-light';
  const container = document.querySelector('div#comments');

  // don't do any of this if we're not on a page with comments enabled
  if (container) {
    if (!utterancesInit) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.defer = true;
      script.src = 'https://utteranc.es/client.js';
      script.crossorigin = true;
      script.setAttribute('data-repo', '{{ .Site.Params.github | safeJS }}');
      script.setAttribute('data-issue-term', 'og:title');
      script.setAttribute('data-theme', theme);
      script.setAttribute('data-label', 'comments');
      container.appendChild(script);

      utterancesInit = true;
    } else {
      const frame = document.querySelector('.utterances-frame');

      // be extra sure frame exists
      if (frame) {
        // https://github.com/utterance/utterances/blob/4d9823c6c4f9a58365f06e2aa76c51b8cf5d5478/src/configuration-component.ts#L160
        frame.contentWindow.postMessage({
          type: 'set-theme',
          theme: theme
        }, '*');
      }
    }
  }
};

const activateDarkMode = function() {
  document.body.classList.remove('light');
  document.body.classList.add('dark');

  activated = true;

  setUtterances();
};

const activateLightMode = function() {
  document.body.classList.remove('dark');
  document.body.classList.add('light');

  activated = false;

  setUtterances();
};

// if user already explicitly toggled in the past, restore their preference.
if (pref === 'true') activateDarkMode();
if (pref === 'false') activateLightMode();

// user has never clicked the button, so go by their OS preference until/if they do so
if (!pref) {
  // check for OS dark mode setting and switch accordingly
  // https://gist.github.com/Gioni06/eb5b28343bcf5793a70f6703004cf333#file-darkmode-js-L47
  if (window.matchMedia('(prefers-color-scheme: dark)').matches)
    activateDarkMode();
  else
    activateLightMode();

  // real-time switching if supported by OS/browser
  // TODO: stop listening when the parent condition becomes false,
  //       right now these keep listening even if pref is set.
  window.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) { if (e.matches) activateDarkMode(); });
  window.matchMedia('(prefers-color-scheme: light)').addListener(function(e) { if (e.matches) activateLightMode(); });
}

// handle lightbulb click
toggle.addEventListener('click', function() {
  // switch to the opposite theme & save preference in local storage
  if (!activated) {
    activateDarkMode();
    localStorage.setItem('dark_mode_pref', 'true');
  } else {
    activateLightMode();
    localStorage.setItem('dark_mode_pref', 'false');
  }
}, true);
