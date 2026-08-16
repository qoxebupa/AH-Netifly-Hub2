// Individual program detail view.
// Reads ?slug= from the URL, loads /content/programs.json, finds the match
// (by a URL-friendly version of the "program" field), and renders it.
(function () {
  var DATA_URL = "/content/programs.json";

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function getParam(name) {
    return new URLSearchParams(window.location.search).get(name);
  }

  function slugify(name) {
    return String(name || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }

  // Turn a video URL (YouTube, direct .mp4, etc.) into embeddable markup.
  function videoEmbed(url) {
    if (!url) return "";
    var yt = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|live\/))([\w-]{6,})/);
    if (yt) {
      return (
        '<div class="program-detail-video"><iframe src="https://www.youtube.com/embed/' +
        yt[1] +
        '" title="Program video" allowfullscreen loading="lazy"></iframe></div>'
      );
    }
    if (/\.(mp4|webm|ogg)(\?|$)/i.test(url)) {
      return (
        '<div class="program-detail-video"><video controls preload="metadata" src="' +
        escapeHtml(url) +
        '"></video></div>'
      );
    }
    // Fallback: plain link for anything else (e.g. Facebook video links).
    return (
      '<p><a class="btn btn-secondary" href="' +
      escapeHtml(url) +
      '" target="_blank" rel="noopener">Watch the video &rarr;</a></p>'
    );
  }

  function render(program) {
    var root = document.querySelector("[data-program-detail]");
    document.title = (program.program || "Program") + " — Activity Haven";

    var badgeClass =
      program.type === "Instructional" ? "badge badge-coral" :
      /special/i.test(program.type || "") ? "badge badge-gold" : "badge";

    root.innerHTML =
      '<a class="back-link" href="/programs.html">&larr; Back to all programs</a>' +
      '<span class="' + badgeClass + '">' + escapeHtml(program.type || "Program") + "</span>" +
      "<h1>" + escapeHtml(program.program) + "</h1>" +
      (program.description ? "<p>" + escapeHtml(program.description) + "</p>" : "") +
      '<div class="detail-meta-grid">' +
      metaItem("Day", program.day) +
      metaItem("Time", program.time) +
      metaItem("Room", program.room) +
      metaItem("Status", program.status) +
      (program.leaders ? metaItem("Instructor/Leader", program.leaders) : "") +
      "</div>" +
      videoEmbed(program.video) +
      (program.notes ? "<p><strong>Notes:</strong> " + escapeHtml(program.notes) + "</p>" : "") +
      '<p class="section-header"><a class="btn btn-primary" href="/contact.html">Ask about this program &rarr;</a></p>';
  }

  function metaItem(label, value) {
    if (!value) return "";
    return (
      '<div class="item"><div class="label">' + escapeHtml(label) + '</div>' +
      '<div class="value">' + escapeHtml(value) + "</div></div>"
    );
  }

  function init() {
    var root = document.querySelector("[data-program-detail]");
    if (!root) return;
    var slug = getParam("slug");

    fetch(DATA_URL, { cache: "no-store" })
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var list = Array.isArray(data) ? data : (Array.isArray(data && data.programs) ? data.programs : []);
        var match = list.find(function (p) { return slugify(p.program) === slug; });
        if (!match) {
          root.innerHTML =
            '<a class="back-link" href="/programs.html">&larr; Back to all programs</a>' +
            "<h1>Program not found</h1><p>That program may have been renamed or removed. Please check the Program Hub for the current list.</p>";
          return;
        }
        render(match);
      })
      .catch(function () {
        root.innerHTML = "<p>Sorry, this program could not be loaded right now. Please call 705-876-1670.</p>";
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
