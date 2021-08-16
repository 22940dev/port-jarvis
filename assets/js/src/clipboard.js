import ClipboardJS from "clipboard";
import trimNewlines from "trim-newlines";

// the default text of the copy button:
const copyTerm = "Copy";

// immediately give up if not supported
if (ClipboardJS.isSupported()) {
  // loop through each code fence on page (if any)
  document.querySelectorAll("div.highlight").forEach((highlightDiv) => {
    const button = document.createElement("button");
    button.className = "copy-button";
    button.innerText = copyTerm;

    // insert button as a sibling to Hugo's code fence
    highlightDiv.insertBefore(button, highlightDiv.firstChild);

    new ClipboardJS(button, {
      text: (trigger) => {
        // actual code element will (should) have class "language-*", even if plaintext
        const fenceElement = trigger.parentElement.querySelector('code[class^="language-"]'); // eslint-disable-line quotes

        return fenceElement ? trimNewlines(fenceElement.innerText) : false;
      },
    }).on("success", (e) => {
      // show a subtle indication of success
      e.trigger.innerText = "✓";

      // reset button to original text after 2 seconds
      setTimeout(() => {
        e.trigger.innerText = copyTerm;
      }, 2000);

      // text needed to be auto-selected to copy, unselect immediately
      e.clearSelection();
    });
  });
}
