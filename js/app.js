
paste-3-app_js.txt

Page
1
/
1
100%
async function loadPrograms() {
  const res = await fetch('/content/programs.json', { cache: 'no-store' });
  const data = await res.json();
  return data.programs || [];
}

function badgeType(type) {
  return type.replace(/\s+/g, ' ').trim();
}

function renderPrograms(programs) {
  const container = document.getElementById('program-hub');
  container.innerHTML = '';

  if (programs.length === 0) {
    container.innerHTML = '<div class="empty-state">No programs match your search.</div>';
    return;
  }

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
  let rendered = 0;

  days.forEach(day => {
    const dayPrograms = programs.filter(p => p.day === day);
    if (dayPrograms.length === 0) return;
    rendered += dayPrograms.length;

    const section = document.createElement('div');
    section.className = 'day-group';
    section.innerHTML = `<h3>${day}</h3><div class="card-grid"></div>`;
    const grid = section.querySelector('.card-grid');

    dayPrograms.forEach(p => {
      const card = document.createElement('div');
      card.className = `card type-${badgeType(p.type).replace(/\s/g, '-')}`;
      card.setAttribute('data-type', p.type);
      card.innerHTML = `
        <span class="badge" data-badge="${p.type}">${p.type}</span>
        <h4>${p.program}</h4>
        <div class="meta">${p.time} &middot; ${p.room}</div>
        <p>${p.description || ''}</p>
      `;
      grid.appendChild(card);
    });

    container.appendChild(section);
  });

  const specialEvents = programs.filter(p => p.day === 'Special Events' && p.status !== 'Cancelled');
  if (specialEvents.length > 0) {
    rendered += specialEvents.length;
    const section = document.createElement('div');
    section.className = 'day-group special-events-group';
    section.innerHTML = `<h3>Special Events</h3><div class="poster-grid"></div>`;
    const grid = section.querySelector('.poster-grid');

    specialEvents.forEach(p => {
      const card = document.createElement('div');
      card.className = 'poster-card';
      const imgHtml = p.image
        ? `<div class="poster-image" style="background-image:url('${p.image}')"></div>`
        : `<div class="poster-image poster-image-placeholder"></div>`;
      card.innerHTML = `
        ${imgHtml}
        <div class="poster-body">
          <div class="poster-date">${p.date || ''}</div>
          <h4>${p.program}</h4>
          <div class="meta">${p.time}${p.room ? ' &middot; ' + p.room : ''}</div>
          <p>${p.description || ''}</p>
          ${p.leaders ? `<div class="poster-leaders">${p.leaders}</div>` : ''}
          ${p.notes ? `<div class="poster-notes">${p.notes}</div>` : ''}
        </div>
      `;
      grid.appendChild(card);
    });

    container.appendChild(section);
  }

  if (rendered === 0) {
    container.innerHTML = '<div class="empty-state">No programs match your search.</div>';
  }
}

(async function init() {
  const all = await loadPrograms();
  renderPrograms(all);

  const search = document.getElementById('search');
  const typeFilter = document.getElementById('type-filter');

  function applyFilters() {
    const term = search.value.toLowerCase();
    const type = typeFilter.value;
    const filtered = all.filter(p => {
      const matchesTerm = p.program.toLowerCase().includes(term) ||
                           (p.description || '').toLowerCase().includes(term);
      const matchesType = !type || p.type === type;
      return matchesTerm && matchesType;
    });
    renderPrograms(filtered);
  }

  search.addEventListener('input', applyFilters);
  typeFilter.addEventListener('change', applyFilters);
})();
Displaying paste-3-app_js.txt.
