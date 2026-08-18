// Program Hub: loads /content/programs.json (written by Decap CMS at /admin)
// and renders a filterable grid. No Google Sheets / gviz calls anywhere here.
(function () {
  var DATA_URL = "/content/programs.json";

  function slugify(name) {
    return String(name || "")
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
  }
  window.AH_slugify = slugify;

  function typeBadgeClass(type) {
    if (type === "Instructional") return "badge badge-coral";
    if (type === "Special Events" || type === "Special Event") return "badge badge-gold";
    return "badge";
  }

  function cardTemplate(p) {
    var slug = slugify(p.program);
    return (
      '<a class="program-row" data-type="' + escapeAttr(p.type) + '" data-day="' + escapeAttr(p.day) +
      '" href="/program.html?slug=' + encodeURIComponent(slug) + '" target="_top">' +
      '<span class="row-day">' + escapeHtml(p.day || "TBD") + "</span>" +
      '<span class="row-title">' + escapeHtml(p.program || "Untitled program") + "</span>" +
      '<span class="row-time">' + escapeHtml(p.time || "&ndash;") + "</span>" +
      '<span class="row-room">' + escapeHtml(p.room || "&ndash;") + "</span>" +
      '<span class="' + typeBadgeClass(p.type) + '">' + escapeHtml(p.type || "Program") + "</span>" +
      '<span class="row-cta btn btn-secondary">Details</span>' +
      "</a>"
    );
  }

  function escapeHtml(str) {
    return String(str || "").replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function escapeAttr(str) { return escapeHtml(str); }

  function populateSelect(select, values, allLabel) {
    if (!select) return;
    select.innerHTML = '<option value="">' + allLabel + "</option>";
    values.forEach(function (v) {
      var opt = document.createElement("option");
      opt.value = v;
      opt.textContent = v;
      select.appendChild(opt);
    });
  }

  function init() {
    var grid = document.querySelector("[data-program-grid]");
    if (!grid) return;

    var daySelect = document.querySelector("[data-filter-day]");
    var typeSelect = document.querySelector("[data-filter-type]");
    var searchInput = document.querySelector("[data-filter-search]");
    var countEl = document.querySelector("[data-results-count]");

    var allPrograms = [];

    function render() {
      var day = daySelect ? daySelect.value : "";
      var type = typeSelect ? typeSelect.value : "";
      var q = searchInput ? searchInput.value.trim().toLowerCase() : "";

      var filtered = allPrograms.filter(function (p) {
        if (day && p.day !== day) return false;
        if (type && p.type !== type) return false;
        if (q && (p.program || "").toLowerCase().indexOf(q) === -1) return false;
        return true;
      });

      if (countEl) {
        countEl.textContent = filtered.length + (filtered.length === 1 ? " program found" : " programs found");
      }

      if (filtered.length === 0) {
        grid.innerHTML = '<div class="empty-state">No programs match those filters yet. Try "All Days" / "All Types", or check back soon &mdash; staff update this list right from the CMS.</div>';
        return;
      }

      grid.innerHTML = filtered.map(cardTemplate).join("");
    }

    fetch(DATA_URL, { cache: "no-store" })
      .then(function (res) {
        if (!res.ok) throw new Error("Could not load programs.json (" + res.status + ")");
        return res.json();
      })
      .then(function (data) {
        // The CMS file is shaped as {"programs": [...]}, but tolerate a
        // bare array too in case that ever changes.
        allPrograms = Array.isArray(data) ? data : (Array.isArray(data && data.programs) ? data.programs : []);

        var days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"].filter(function (d) {
          return allPrograms.some(function (p) { return p.day === d; });
        });
        var types = Array.from(new Set(allPrograms.map(function (p) { return p.type; }).filter(Boolean)));

        populateSelect(daySelect, days, "All Days");
        populateSelect(typeSelect, types, "All Types");

        [daySelect, typeSelect].forEach(function (el) {
          if (el) el.addEventListener("change", render);
        });
        if (searchInput) searchInput.addEventListener("input", render);

        render();
      })
      .catch(function (err) {
        grid.innerHTML = '<div class="empty-state">Sorry — programs could not be loaded right now (' + escapeHtml(err.message) + "). Please refresh, or call 705-876-1670.</div>";
      });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
