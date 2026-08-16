// Hero carousel: auto-rotating slides.
// Performance note: only the active slide (plus the next one, pre-loaded a
// moment before it's needed) ever has a real video src. Every other slide's
// <video> stays empty, so the browser isn't decoding 9 videos at once.
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var carousel = document.querySelector("[data-carousel]");
    if (!carousel) return;

    var slides = Array.prototype.slice.call(carousel.querySelectorAll(".carousel-slide"));
    var dotsWrap = carousel.querySelector(".carousel-dots");
    var current = 0;
    var timer = null;
    var preloadTimer = null;
    var INTERVAL = 7000;

    function videoOf(slide) {
      return slide.querySelector("video");
    }

    function load(slide) {
      var video = videoOf(slide);
      if (!video) return;
      var src = video.getAttribute("data-video");
      if (src && video.getAttribute("src") !== src) {
        video.setAttribute("src", src);
        video.load();
      }
    }

    function unload(slide) {
      var video = videoOf(slide);
      if (!video) return;
      video.pause();
      // Drop the src entirely so the browser frees the decoded video memory.
      video.removeAttribute("src");
      video.load();
    }

    function show(index) {
      slides.forEach(function (s, i) {
        var isActive = i === index;
        s.classList.toggle("active", isActive);
        if (isActive) {
          load(s);
          var video = videoOf(s);
          if (video) {
            video.muted = true; // required by browsers for autoplay to be allowed
            video.loop = true;
            video.currentTime = 0;
            video.play().catch(function () {});
          }
        } else if (i !== (index + 1) % slides.length) {
          // Keep the *next* slide's video around if it was already preloaded;
          // unload everything else.
          unload(s);
        } else {
          videoOf(s) && videoOf(s).pause();
        }
      });
      if (dotsWrap) {
        Array.prototype.forEach.call(dotsWrap.children, function (dot, i) {
          dot.classList.toggle("active", i === index);
        });
      }
      current = index;

      // Warm up the next slide's video a couple seconds before we need it,
      // so switching feels instant instead of buffering.
      if (preloadTimer) clearTimeout(preloadTimer);
      preloadTimer = setTimeout(function () {
        load(slides[(current + 1) % slides.length]);
      }, Math.max(INTERVAL - 2000, 1000));
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
