const view = document.getElementById('view');
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');
const fab = document.getElementById('fab');

let cycleHandle = null;

const HOME_PREVIEWS = [
  "You have a furnace — want to add a thermostat?",
  "10 items in your catalog. Keep going!",
  "Try organizing your items into 'spaces'",
  "Spring is around the corner — gutters and outdoor faucets are due"
];

const NOTE_SETS = [
  ["Replaced gasket — drip stopped", "Spotted some corrosion at the base", "First time noting this"],
  ["Cleaned out, looking good", "Heard a rattle — keep an eye on it", "Picked up the model number"],
  ["Filter changed today", "Bill jumped this month, may be related", "Brand: Trane, captured on photo"]
];

function esc(s) {
  return String(s).replace(/[&<>"']/g, c => (
    {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[c]);
}

function clearCycle() {
  if (cycleHandle) { clearInterval(cycleHandle); cycleHandle = null; }
}

function startCycle(elId, lines, intervalMs = 3500) {
  clearCycle();
  let i = 0;
  cycleHandle = setInterval(() => {
    i = (i + 1) % lines.length;
    const el = document.getElementById(elId);
    if (el) el.textContent = lines[i];
    else clearCycle();
  }, intervalMs);
}

function fmtDate(d) {
  return d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
}

function renderCatalog() {
  const cards = CATALOG.map(item => `
    <div class="card" data-id="${esc(item.id)}">
      <div class="placeholder-art">${esc(item.name)}</div>
      <div class="name">${esc(item.name)}</div>
      <div class="summary">${esc(item.summary || '')}</div>
    </div>
  `).join('');

  view.innerHTML = `
    <div class="catalog-grid">${cards}</div>
    <div style="height:16px"></div>
    <div class="suggestions" id="suggestions">
      <div class="suggestions-header">
        <span class="suggestions-label">Suggestions</span>
        <span class="suggestions-toggle" id="suggToggle">▾</span>
      </div>
      <div class="suggestions-preview" id="cyclingPreview">${esc(HOME_PREVIEWS[0])}</div>
      <div class="suggestions-body" id="suggBody" hidden>
        <h4>Items you may have but haven't catalogued</h4>
        <ul>
          <li>Thermostat <small>— inferred from your furnace</small></li>
          <li>Downspout <small>— inferred from your gutter</small></li>
          <li>CO detector <small>— commonly paired with smoke detectors</small></li>
        </ul>
        <h4>Try this</h4>
        <ul>
          <li>Add the spaces you spend time in (basement, kitchen, yard…)</li>
          <li>Spot-check 5 common items most properties have</li>
        </ul>
      </div>
    </div>
  `;

  view.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => renderItem(card.dataset.id));
  });
  document.getElementById('suggestions').addEventListener('click', toggleSuggestions);
  startCycle('cyclingPreview', HOME_PREVIEWS);
}

function renderItem(id) {
  const item = CATALOG.find(c => c.id === id);
  if (!item) return;

  const noteSet = NOTE_SETS[id.length % NOTE_SETS.length];
  const today = Date.now();
  const noteDates = [
    new Date(today - 5 * 86400000),
    new Date(today - 30 * 86400000),
    new Date(today - 60 * 86400000)
  ];

  const photos = item.suggested_photos || [];
  const questions = item.questions || [];
  const maintenance = item.maintenance || [];
  const related = item.related_types || [];

  const previewLine =
    `${photos.length} photo prompt${photos.length === 1 ? '' : 's'} · ` +
    `${questions.length} question${questions.length === 1 ? '' : 's'} · ` +
    `${maintenance.length} maintenance suggestion${maintenance.length === 1 ? '' : 's'}`;

  view.innerHTML = `
    <div class="item-header">
      <button class="back" id="back">← Catalog</button>
    </div>
    <div class="item-name">${esc(item.name)}</div>
    <div class="tags">
      <span class="chip">Basement</span>
      <span class="chip">${esc(item.category)}</span>
    </div>
    <div class="photos">
      <div class="photo-placeholder">Photo 1</div>
      <div class="photo-placeholder">Photo 2</div>
      <div class="photo-placeholder">Photo 3</div>
      <div class="photo-placeholder add">+ Add</div>
    </div>

    <div class="section">
      <h3>Notes</h3>
      ${noteSet.map((text, i) => `
        <div class="note">
          <div class="date">${fmtDate(noteDates[i])}</div>
          ${esc(text)}
        </div>
      `).join('')}
      <button class="add-note-btn">+ Add note</button>
    </div>

    <div class="compact-row">
      <span>1 reminder</span><span class="sep">·</span>
      <span>0 to-dos</span><span class="sep">·</span>
      <span>last activity 5 days ago</span>
    </div>

    <div class="suggestions" id="suggestions">
      <div class="suggestions-header">
        <span class="suggestions-label">Suggestions</span>
        <span class="suggestions-toggle" id="suggToggle">▾</span>
      </div>
      <div class="suggestions-preview">${esc(previewLine)}</div>
      <div class="suggestions-body" id="suggBody" hidden>
        ${item.education ? `<h4>Why this matters</h4><p>${esc(item.education)}</p>` : ''}

        ${photos.length ? `
          <h4>Photo checklist</h4>
          <ul>${photos.map(p => `<li>${esc(p.prompt)}</li>`).join('')}</ul>
        ` : ''}

        ${questions.length ? `
          <h4>Quick questions</h4>
          <ul>${questions.map(q => `<li>${esc(q.prompt)}</li>`).join('')}</ul>
        ` : ''}

        ${maintenance.length ? `
          <h4>Suggested maintenance</h4>
          <ul>${maintenance.map(m => `
            <li><strong>${esc(m.action)}</strong> — ${esc(m.cadence_text)}<br>
            <small>${esc(m.why)}</small></li>
          `).join('')}</ul>
        ` : ''}

        ${related.length ? `
          <h4>Related items you might own</h4>
          <div class="related-chips">
            ${related.map(r => `<span class="related-chip">${esc(r.replace(/-/g, ' '))}</span>`).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;

  document.getElementById('back').addEventListener('click', () => {
    setTab('catalog');
    renderCatalog();
  });
  document.getElementById('suggestions').addEventListener('click', toggleSuggestions);
  clearCycle();
}

function toggleSuggestions() {
  const body = document.getElementById('suggBody');
  const toggle = document.getElementById('suggToggle');
  if (!body) return;
  if (body.hasAttribute('hidden')) {
    body.removeAttribute('hidden');
    toggle.textContent = '▴';
  } else {
    body.setAttribute('hidden', '');
    toggle.textContent = '▾';
  }
}

function renderPlaceholder(label) {
  view.innerHTML = `
    <div class="placeholder-view">
      <strong>${esc(label)} view</strong><br>
      Not wired up in this prototype.<br><br>
      Comes after we react to the catalog flow.
    </div>
  `;
  clearCycle();
}

function setTab(name) {
  document.querySelectorAll('.tab').forEach(t => {
    t.classList.toggle('active', t.dataset.view === name);
  });
}

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    setTab(tab.dataset.view);
    if (tab.dataset.view === 'catalog') renderCatalog();
    else if (tab.dataset.view === 'todo') renderPlaceholder('To-do');
    else renderPlaceholder('Timeline');
  });
});

fab.addEventListener('click', () => {
  modalContent.innerHTML = `
    <button class="modal-option" data-opt="note"><strong>Note</strong><small>Quick text or photo entry</small></button>
    <button class="modal-option" data-opt="item"><strong>Item</strong><small>Start a new item</small></button>
    <button class="modal-option" data-opt="task"><strong>Task</strong><small>To-do, optionally tied to an item</small></button>
    <button class="modal-option" data-opt="quick"><strong>Quick capture</strong><small>Photo + text — decide later</small></button>
    <button class="modal-option" data-opt="prop"><strong>Property or Space</strong><small>Manage where things live</small></button>
  `;
  modal.removeAttribute('hidden');
  modalContent.querySelectorAll('.modal-option').forEach(b => {
    b.addEventListener('click', () => modal.setAttribute('hidden', ''));
  });
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) modal.setAttribute('hidden', '');
});

renderCatalog();
