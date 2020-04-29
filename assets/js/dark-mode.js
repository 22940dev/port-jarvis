/* jshint esversion: 6, indent: 2, browser: true, quotmark: single */

/*! Dark mode switcheroo | MIT License | jrvs.io/bWMz */

(function() {
  // improve variable mangling
  var win = window;
  var doc = win.document;
  var bod = doc.body;
  var cls = bod.classList;
  var sto = localStorage;

  // check for preset `dark_mode_pref` in localStorage
  var pref_key = 'dark_mode_pref';
  var pref = sto.getItem(pref_key);

  // keep track of current state (light by default)
  var dark = false;

  var activateDarkMode = function() {
    cls.remove('light');
    cls.add('dark');
    dark = true;
  };

  var activateLightMode = function() {
    cls.remove('dark');
    cls.add('light');
    dark = false;
  };

  // if user already explicitly toggled in the past, restore their preference.
  if (pref === 'true') activateDarkMode();
  if (pref === 'false') activateLightMode();

  // user has never clicked the button, so go by their OS preference until/if they do so
  if (!pref) {
    // check for OS dark mode setting and switch accordingly
    // https://gist.github.com/Gioni06/eb5b28343bcf5793a70f6703004cf333#file-darkmode-js-L47
    if (win.matchMedia('(prefers-color-scheme: dark)').matches)
      activateDarkMode();
    else
      activateLightMode();

    // real-time switching if supported by OS/browser
    // TODO: stop listening when the parent condition becomes false,
    //       right now these keep listening even if pref is set.
    win.matchMedia('(prefers-color-scheme: dark)').addListener(function(e) { if (e.matches) activateDarkMode(); });
    win.matchMedia('(prefers-color-scheme: light)').addListener(function(e) { if (e.matches) activateLightMode(); });
  }

  var toggle = doc.querySelector('.dark-mode-toggle');

  // don't freak out if page happens not to have a toggle button
  if (toggle) {
   // lightbulb toggle re-appears now that we know user has JS enabled
   toggle.style.visibility = 'visible';

    // handle lightbulb click
    toggle.addEventListener('click', function() {
      // switch to the opposite theme & save preference in local storage
      if (!dark) {
        activateDarkMode();
        sto.setItem(pref_key, 'true');
      } else {
        activateLightMode();
        sto.setItem(pref_key, 'false');
      }
    }, true);
  }
})();
