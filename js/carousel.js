// Hero carousel: auto-rotating slides, works for <video> or <img> slides.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var dotsWrap = carousel.querySelector(".carousel-dots");
    var current = 0;
    var timer = null;
    var INTERVAL = 7000;

    function show(index) {
      slides.forEach(function (s, i) {
        var isActive = i === index;
        s.classList.toggle("active", isActive);
        var video = s.querySelector("video");
        if (video) {
          if (isActive) {
            video.currentTime = 0;
            video.play().catch(function () {});
          } else {
            video.pause();
          }
        }
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
          dot.classList.toggle("active", i === index);
        });
      }
      current = index;
    }

    function next() {
      show((current + 1) % slides.length);
    }

    function restartTimer() {
      if (timer) clearInterval(timer);
      timer = setInterval(next, INTERVAL);
    }

    if (dotsWrap) {
      slides.forEach(function (_, i) {
        var dot = document.createElement("button");
        dot.type = "button";
        dot.setAttribute("aria-label", "Show slide " + (i + 1));
        dot.addEventListener("click", function () {
          show(i);
          restartTimer();
        });
        dotsWrap.appendChild(dot);
      });
    }

    show(0);
    restartTimer();
  });
})();
