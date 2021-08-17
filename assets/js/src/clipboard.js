import ClipboardJS from "clipboard";
import trimNewlines from "trim-newlines";

// the default text of the copy button:
const defaultTerm = "Copy";
const successTerm = "Copied!";

// immediately give up if not supported
if (ClipboardJS.isSupported()) {
  // loop through each code fence on page (if any)
  document.querySelectorAll("div.highlight").forEach((highlightDiv) => {
    const wrapperDiv = document.createElement("div");
    wrapperDiv.className = "highlight-clipboard-enabled";

    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerText = defaultTerm;

    // insert button as a sibling to Hugo's code fence
    highlightDiv.parentNode.insertBefore(wrapperDiv, highlightDiv);
    wrapperDiv.appendChild(highlightDiv);
    wrapperDiv.insertBefore(button, wrapperDiv.firstChild);
  });

  new ClipboardJS("button.copy-button", {
    // actual code element will (should) have class "language-*", even if plaintext
    // eslint-disable-next-line quotes
    text: (trigger) => trimNewlines(trigger.parentElement.querySelector('code[class^="language-"]').innerText),
  }).on("success", (e) => {
    // show a subtle indication of success
    e.trigger.innerText = successTerm;

    // reset button to original text after 2 seconds
    setTimeout(() => {
      e.trigger.innerText = defaultTerm;
    }, 2000);

    // text needed to be auto-selected to copy, unselect immediately
    e.clearSelection();
  });
}
