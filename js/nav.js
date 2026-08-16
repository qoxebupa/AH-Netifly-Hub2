// Shared nav behaviour: mobile toggle + active-page highlighting.
// Include on every page: <script src="/js/nav.js" defer></script>
(function () {
  document.addEventListener("DOMContentLoaded", function () {
    var toggle = document.querySelector(".nav-toggle");
    var links = document.querySelector(".nav-links");
    if (toggle && links) {
      toggle.addEventListener("click", function () {
        links.classList.toggle("open");
      });
    }

    // Highlight the current page in the nav based on the file name.
    var path = window.location.pathname.replace(/\/index\.html$/, "/");
    var here = path === "/" || path === "" ? "index.html" : path.split("/").pop();

    document.querySelectorAll(".nav-links a").forEach(function (a) {
      var target = a.getAttribute("href").split("/").pop();
      if (target === here || (here === "index.html" && (target === "" || target === "/"))) {
        a.classList.add("active");
      }
    });
  });
})();
