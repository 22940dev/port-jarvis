/*! Dark mode switcheroo | MIT License | jrvs.io/darkmode */

// check for preset `dark_mode_pref` preference in local storage
const prefKey = "dark_mode_pref";
const pref = localStorage.getItem(prefKey);

// use an element with class `dark-mode-toggle` to trigger swap when clicked
const toggle = document.querySelector(".dark-mode-toggle");

// change CSS via these <body> classes:
const dark = "dark";
const light = "light";

// which class is <body> set to initially?
const defaultTheme = light;

// keep track of current state no matter how we got there
let active = defaultTheme === dark;

// receives a class name and switches <body> to it
const activateTheme = function (theme) {
  document.body.classList.remove(dark, light);
  document.body.classList.add(theme);
  active = theme === dark;
};

// user has never clicked the button, so go by their OS preference until/if they do so
if (!pref) {
  // returns media query selector syntax
  const prefers = function (colorScheme) {
    // https://drafts.csswg.org/mediaqueries-5/#prefers-color-scheme
    return "(prefers-color-scheme: " + colorScheme + ")";
  };

  // check for OS dark/light mode preference and switch accordingly
  // default to `defaultTheme` set above if unsupported
  if (window.matchMedia(prefers("dark")).matches) {
    activateTheme(dark);
  } else if (window.matchMedia(prefers("light")).matches) {
    activateTheme(light);
  } else {
    activateTheme(defaultTheme);
  }

  // real-time switching if supported by OS/browser
  window.matchMedia(prefers("dark")).addEventListener("change", function (e) {
    if (e.matches) {
      activateTheme(dark);
    }
  });
  window.matchMedia(prefers("light")).addEventListener("change", function (e) {
    if (e.matches) {
      activateTheme(light);
    }
  });
} else if (pref === dark || pref === light) {
  // if user already explicitly toggled in the past, restore their preference
  activateTheme(pref);
} else {
  // fallback to default theme (this shouldn't happen)
  activateTheme(defaultTheme);
}

// don't freak out if page happens not to have a toggle
if (toggle) {
  // toggle re-appears now that we know user has JS enabled
  toggle.style.display = "block";

  // handle toggle click
  toggle.addEventListener("click", function () {
    // switch to the opposite theme & save preference in local storage
    if (active) {
      activateTheme(light);
      localStorage.setItem(prefKey, light);
    } else {
      activateTheme(dark);
      localStorage.setItem(prefKey, dark);
    }
  });
}
