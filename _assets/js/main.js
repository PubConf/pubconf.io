(function () {
  "use strict";
  if (!document.querySelector || !window.addEventListener) { return; }

  (function toggleNewsletterModal() {
    var toggleEls = document.querySelectorAll(".js-waitlist-toggle");
    var wrapEl = document.querySelector(".js-waitlist-wrap");
    var closeEl = document.querySelector(".js-modal-close");
    if (!toggleEls.length || !wrapEl || !closeEl) return;

    for(var i = 0; i < toggleEls.length; i++) {
      toggleEls[i].href = "javascript:void(0);";
      toggleEls[i].addEventListener("click", function () {
        wrapEl.classList.toggle("visible");
      });
    }

    window.addEventListener("keyup", function (evt) {
      if (evt.keyCode == 27) {
        wrapEl.classList.remove("visible");
      }
    });
    closeEl.addEventListener("click", function () {
      wrapEl.classList.remove("visible");
    });
  })();

})();
