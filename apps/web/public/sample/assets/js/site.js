/* Neighborhood Bookings sample, shared site behavior (nav toggle, copy buttons) */
(function () {
  "use strict";

  function initNavToggle() {
    var toggle = document.querySelector(".nav-toggle");
    var nav = document.querySelector(".main-nav");
    if (!toggle || !nav) return;

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  function initCopyButtons() {
    var buttons = document.querySelectorAll(".copy-btn");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var targetId = btn.getAttribute("data-copy-target");
        var target = targetId ? document.getElementById(targetId) : null;
        if (!target) return;

        var text = target.innerText || target.textContent || "";

        var markCopied = function () {
          var original = btn.textContent;
          btn.textContent = "Copied!";
          btn.setAttribute("data-copied", "true");
          window.setTimeout(function () {
            btn.textContent = original;
            btn.setAttribute("data-copied", "false");
          }, 1800);
        };

        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text.trim()).then(markCopied, function () {
            fallbackCopy(text, markCopied);
          });
        } else {
          fallbackCopy(text, markCopied);
        }
      });
    });
  }

  function fallbackCopy(text, onDone) {
    var temp = document.createElement("textarea");
    temp.value = text.trim();
    temp.setAttribute("readonly", "");
    temp.style.position = "absolute";
    temp.style.left = "-9999px";
    document.body.appendChild(temp);
    temp.select();
    try {
      document.execCommand("copy");
    } catch (err) {
      /* Clipboard unavailable; user can still select and copy manually. */
    }
    document.body.removeChild(temp);
    if (onDone) onDone();
  }

  function initSampleBanner() {
    var bannerLink = document.querySelector(".sample-banner a[href='/']");
    if (!bannerLink) return;

    bannerLink.addEventListener("click", function (event) {
      if (window.self === window.top) return;

      event.preventDefault();
      window.parent.postMessage({ type: "demore-sample-close" }, window.location.origin);
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    initNavToggle();
    initCopyButtons();
    initSampleBanner();
  });
})();
