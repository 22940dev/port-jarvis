import twemoji from "twemoji";

twemoji.parse(document.body, {
  callback: function (icon) {
    // simpler relative URIs
    return "/assets/emoji/" + icon + ".svg";
  },
});
