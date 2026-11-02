/* Antarmuka tanpa dependensi. Konten berada di data/content.js. */
(() => {
  'use strict';
  const data = window.MANDAILING_CONTENT;
  if (!data) return;
  const projectUpdatedDate = new Date(`${data.project.updatedOn}T00:00:00Z`);
  const projectUpdatedLabel = Number.isNaN(projectUpdatedDate.valueOf())
    ? data.project.updatedOn
    : new Intl.DateTimeFormat('id-ID', {day: 'numeric', month: 'long', year: 'numeric', timeZone: 'UTC'}).format(projectUpdatedDate);
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => [...scope.querySelectorAll(selector)];
  const escape = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const normalize = value => String(value).toLocaleLowerCase('id').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const icon = (name = 'arrow') => `<svg class="icon" aria-hidden="true"><use href="#i-${name}"/></svg>`;
  const safeUrl = value => /^https?:\/\//i.test(value || '') ? escape(value) : '#';
  const themeName = id => data.themes.find(t => t.id === id)?.name || id;
  const externalLink = (url, text, className = 'text-link') => `<a class="${className}" href="${safeUrl(url)}" target="_blank" rel="noopener noreferrer">${escape(text)} ${icon('up-right')}</a>`;
  const state = {query: '', category: 'all', showAll: false};
  const reading = $('#reading-dialog');
  const contribution = $('#contribution-dialog');
  let readingOpener = null;
  let contributionOpener = null;

  // Menu ponsel dan pengembalian fokus keyboard.
  const menuButton = $('.menu-toggle');
  const nav = $('#navigasi');
  function closeMenu(returnFocus = false) {
    menuButton.setAttribute('aria-expanded', 'false');
    nav.classList.remove('open');
    if (returnFocus) menuButton.focus();
  }
  menuButton.addEventListener('click', () => {
    const opening = menuButton.getAttribute('aria-expanded') !== 'true';
    menuButton.setAttribute('aria-expanded', String(opening));
    nav.classList.toggle('open', opening);
  });
  $$('.main-nav a').forEach(a => a.addEventListener('click', () => closeMenu()));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && nav.classList.contains('open')) closeMenu(true);
  });
  document.addEventListener('click', event => {
    if (!event.target.closest('.site-header')) closeMenu();
  });
  window.matchMedia('(min-width:761px)').addEventListener('change', event => {
    if (event.matches) closeMenu();
  });
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(records => {
      for (const record of records) {
        if (!record.isIntersecting) continue;
        $$('.main-nav a').forEach(a => {
          if (a.getAttribute('href') === '#' + record.target.id) a.setAttribute('aria-current', 'location');
          else a.removeAttribute('aria-current');
        });
      }
    }, {rootMargin: '-15% 0px -65% 0px'});
    $$('main section[id]').forEach(section => observer.observe(section));
  }

  // Tema dan inventaris marga dibentuk dari konten publik.
  $('#theme-grid').innerHTML = data.themes.map((theme, index) => {
    const count = data.entries.filter(e => e.category === theme.id).length;
    return `<button type="button" class="theme-item" data-theme="${escape(theme.id)}" aria-label="${escape(theme.name)} : ${count ? count + ' catatan awal' : 'rencana kajian'}"><span class="theme-number">${String(index + 1).padStart(2, '0')}</span>${icon('up-right')}<span class="theme-title">${escape(theme.name)}</span><span class="theme-description">${escape(theme.description)}</span><span class="theme-availability${count ? ' available' : ''}">${count ? `${count} catatan awal` : 'Rencana kajian'}</span></button>`;
  }).join('');
  $('#category-select').insertAdjacentHTML('beforeend', data.themes.map(t => `<option value="${escape(t.id)}">${escape(t.name)}</option>`).join(''));
  $('#marga-list').innerHTML = data.marga.map(name => `<button type="button" data-marga="${escape(name)}" aria-label="Lihat status inventaris marga ${escape(name)}">${escape(name)}</button>`).join('');

  function setRole(id, moveFocus = false) {
    const role = data.roles.find(r => r.id === id);
    if (!role) return;
    $$('.role-tabs [role="tab"]').forEach(tab => {
      const active = tab.dataset.role === id;
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
      if (active && moveFocus) tab.focus();
    });
    $('.role-kicker').textContent = role.kicker;
    $('#role-title').textContent = role.name;
    $('#role-description').textContent = role.description;
    $('#role-panel').setAttribute('aria-labelledby', 'tab-' + id);
  }
  $$('.role-tabs [role="tab"]').forEach((tab, index, tabs) => {
    tab.addEventListener('click', () => setRole(tab.dataset.role));
    tab.addEventListener('keydown', event => {
      let next = null;
      if (event.key === 'ArrowRight') next = (index + 1) % tabs.length;
      if (event.key === 'ArrowLeft') next = (index + tabs.length - 1) % tabs.length;
      if (event.key === 'Home') next = 0;
      if (event.key === 'End') next = tabs.length - 1;
      if (next !== null) {
        event.preventDefault();
        setRole(tabs[next].dataset.role, true);
      }
    });
  });

  function entryArt(entry) {
    if (entry.image) return `<div class="entry-art"><img src="${escape(entry.image)}" alt="${escape(entry.imageAlt)}" loading="lazy" decoding="async" width="640" height="427"></div>`;
    return `<div class="entry-art typographic ${escape(entry.art)}" aria-hidden="true"><span class="art-label">ENSIKLOPEDIA MANDAILING</span><span class="art-lines"></span><span class="art-large">${escape(entry.artText)}</span><span class="art-small">${escape(entry.artCaption)}</span></div>`;
  }
  function card(entry) {
    const source = data.sources[entry.sourceIds[0]];
    const sourceReadStatuses = [...new Set(entry.sourceIds.map(id => data.sources[id]?.readStatus).filter(Boolean))];
    const readStatus = sourceReadStatuses.length
      ? `<p class="entry-source-status">Status baca sumber: ${sourceReadStatuses.map(escape).join(' · ')}</p>`
      : '';
    const shortSource = source ? source.authors.split(';')[0] + ' · ' + source.year.replace('[menurut katalog]', '(katalog)').replace('[tahun volume]', '(volume)') : 'Nasution007 · Wikimedia Commons';
    const sourceControl = source ? `<button type="button" class="inline-button" data-open-source="${escape(source.id)}">Lihat sumber ↗</button>` : `<button type="button" class="inline-button" data-open-media="${escape(entry.mediaId)}">Kredit foto ↗</button>`;
    return `<article class="entry-card" aria-labelledby="title-${escape(entry.id)}">${entryArt(entry)}<div class="entry-card-body"><p class="entry-category">${escape(themeName(entry.category))}</p><h3 id="title-${escape(entry.id)}">${escape(entry.title)}</h3><p class="entry-summary">${escape(entry.summary)}</p><p class="entry-status">${escape(entry.status)}</p>${readStatus}<p class="entry-source">${escape(shortSource)}<br>${sourceControl}</p><button type="button" class="entry-open" data-open-entry="${escape(entry.id)}" aria-label="Baca catatan ${escape(entry.title)}">Baca catatan ${icon()}</button></div></article>`;
  }
  function renderEntries() {
    const q = normalize(state.query.trim());
    const filtered = data.entries.filter(entry => {
      if (state.category !== 'all' && entry.category !== state.category) return false;
      const searchable = [entry.title, entry.summary, themeName(entry.category), ...entry.tags, ...entry.sourceIds.map(id => data.sources[id]?.authors || '')].join(' ');
      return !q || normalize(searchable).includes(q);
    });
    const hasFilter = Boolean(q) || state.category !== 'all';
    const visible = hasFilter || state.showAll ? filtered : filtered.slice(0, 3);
    $('#entry-grid').innerHTML = visible.map(card).join('');
    $('#no-results').hidden = filtered.length !== 0;
    $('#entry-grid').hidden = filtered.length === 0;
    $('#reset-search').hidden = !hasFilter;
    $('#show-more').hidden = hasFilter || state.showAll || filtered.length <= 3;
    $('#results-count').textContent = hasFilter ? `${filtered.length} catatan${state.category !== 'all' ? ' · ' + themeName(state.category) : ''}${state.query.trim() ? ' · “' + state.query.trim() + '”' : ''}` : `${visible.length} dari ${data.entries.length} catatan awal`;
    if (!filtered.length) {
      const themeHasEntries = data.entries.some(entry => entry.category === state.category);
      const planning = state.category !== 'all' && !themeHasEntries;
      $('#empty-title').textContent = planning ? 'Tema ini masih dalam rencana kajian.' : 'Belum ada catatan yang cocok.';
      $('#empty-description').textContent = planning ? `Belum ada catatan ${themeName(state.category).toLocaleLowerCase('id')} yang ditampilkan. Lihat tema lain atau siapkan sumber untuk pengembangan berikutnya.` : 'Coba kata lain atau hapus filter untuk melihat semua catatan awal.';
    }
  }
  function resetSearch() {
    state.query = '';
    state.category = 'all';
    state.showAll = true;
    $('#entry-search').value = '';
    $('#category-select').value = 'all';
    renderEntries();
  }
  function applyCategory(id) {
    state.query = '';
    state.category = id;
    state.showAll = true;
    $('#entry-search').value = '';
    $('#category-select').value = id;
    renderEntries();
    $('#entri').scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion:reduce)').matches ? 'auto' : 'smooth'});
  }
  $('#search-form').addEventListener('submit', event => {
    event.preventDefault();
    state.query = $('#entry-search').value;
    state.category = $('#category-select').value;
    renderEntries();
  });
  $('#entry-search').addEventListener('input', event => {state.query = event.target.value; renderEntries();});
  $('#category-select').addEventListener('change', event => {state.category = event.target.value; renderEntries();});
  $('#reset-search').addEventListener('click', resetSearch);
  $('#empty-reset').addEventListener('click', resetSearch);
  $('#show-more').addEventListener('click', () => {state.showAll = true; renderEntries();});

  function sourceRecord(id, linkToRecord = false) {
    const source = data.sources[id];
    if (!source) return '';
    const locator = String(source.locator || '').trim();
    const locatorPunctuation = /[.!?…]$/.test(locator) ? '' : '.';
    const sourceLink = linkToRecord ? `<button type="button" class="inline-button" data-open-source="${escape(source.id)}">Buka rekam sumber ↗</button>` : '';
    return `<div class="source-record"><p class="source-label">${escape(source.id)} / ${escape(source.readStatus)}</p><p><strong>${escape(source.title)}</strong></p><p>${escape(source.authors)}. ${escape(source.year)}. ${escape(source.publisher)}.</p><p>Bagian yang diperiksa: ${escape(locator)}${locatorPunctuation}</p><p class="source-note">${escape(source.limit)}</p>${externalLink(source.url, 'Buka sumber asli')}${source.previewUrl ? ' ' + externalLink(source.previewUrl, 'Lihat cuplikan di JSTOR') : ''}${sourceLink ? `<p>${sourceLink}</p>` : ''}</div>`;
  }
  function mediaRecord(id) {
    const media = data.media[id];
    if (!media) return '';
    return `<div class="source-record"><p class="source-label">Kredit dokumentasi visual</p><p><strong>${escape(media.title)}</strong></p><p>${escape(media.author)} · ${escape(media.date)}</p><p>${escape(media.scope)}</p><p>${escape(media.changes)} Versi tampilan foto mengikuti lisensi yang sama, ${escape(media.license)}.</p>${externalLink(media.pageUrl, 'Lihat rekam foto')}<p style="margin-top:8px">${externalLink(media.licenseUrl, 'Ketentuan ' + media.license)}</p></div>`;
  }
  function showReading(title, kicker, html) {
    if (!reading.open) readingOpener = document.activeElement;
    $('#reading-kicker').textContent = kicker;
    $('#reading-content').innerHTML = `<h2 id="reading-title">${escape(title)}</h2>${html}`;
    if (!reading.open) reading.showModal();
    reading.scrollTop = 0;
    $('.close-dialog', reading).focus({preventScroll: true});
  }
  function openEntry(id, updateLocation = true) {
    const entry = data.entries.find(e => e.id === id);
    if (!entry) return;
    const body = entry.body.map(section => `<h3>${escape(section.heading)}</h3>${section.paragraphs.map(p => `<p>${escape(p)}</p>`).join('')}`).join('');
    showReading(entry.title, themeName(entry.category) + ' / Catatan awal', `<p class="reading-status">${escape(entry.status)} · Belum ditinjau komunitas.<br>${escape(entry.limit)}</p>${body}${entry.sourceIds.map(id => sourceRecord(id, true)).join('')}${entry.mediaId ? mediaRecord(entry.mediaId) : ''}<p class="source-note" style="margin-top:24px">Catatan editorial proyek · ${escape(projectUpdatedLabel)}. Koreksi dan sumber tambahan dapat disiapkan melalui bagian kontribusi.</p>`);
    if (updateLocation) {
      try {history.replaceState(null, '', '#catatan/' + entry.id);} catch (_) { /* file:// tetap dapat membaca catatan */ }
    }
  }
  function openSource(id, updateLocation = true) {
    const source = data.sources[id];
    if (!source) return;
    const relatedEntries = data.entries.filter(entry => entry.sourceIds.includes(id));
    const relatedLinks = relatedEntries.length
      ? `<h3>Catatan yang merujuk sumber ini</h3><ul>${relatedEntries.map(entry => `<li><button type="button" class="inline-button" data-open-entry="${escape(entry.id)}">${escape(entry.title)}</button></li>`).join('')}</ul>`
      : '<p class="source-note">Belum ada catatan awal yang merujuk rekam ini.</p>';
    showReading('Rekam sumber', 'Transparansi penelitian', sourceRecord(id) + relatedLinks + '<p class="source-note" style="margin-top:22px">Identifikasi sumber berbeda dari pemeriksaan seluruh isinya. Tingkat kepastian harus dinilai pada setiap klaim.</p>');
    if (updateLocation) {
      try {history.replaceState(null, '', '#sumber/' + encodeURIComponent(id));} catch (_) { /* file:// tetap dapat membaca sumber */ }
    }
  }
  function openMarga(name) {
    if (!data.marga.includes(name)) return;
    showReading(name, 'Marga / Inventaris awal', `<p class="reading-status">Nama tercatat pada judul katalog. Asal-usul, kampung terkait, dan silsilah belum diverifikasi.</p><p>${escape(name)} termasuk nama yang disebut dalam judul rujukan Z. Pangaduan Lubis. Penyebutannya menjadi titik awal penelitian, bukan penetapan hubungan keturunan atau kedudukan adat.</p><h3>Ruang penelitian berikutnya</h3><ul><li>Mencocokkan eksemplar, edisi, dan ejaan dalam sumber.</li><li>Mendokumentasikan versi asal-usul menurut pemilik pengetahuan.</li><li>Memeriksa kampung terkait dan hubungan keluarga tanpa mengisi generasi yang tidak diketahui.</li></ul>${sourceRecord('R004', true)}`);
  }
  function openMethod() {
    showReading('Membaca sumber dan status informasi', 'Pedoman editorial', '<p>Catatan awal dibangun dari sumber yang telah diidentifikasi pada cetak biru. Tidak ada klaim bahwa seluruh referensi telah dibaca penuh atau ditinjau komunitas.</p><h3>Jenis informasi</h3><ul><li><strong>Fakta terdokumentasi:</strong> pernyataan yang ditopang bukti tertentu dengan lokasi yang dapat diperiksa.</li><li><strong>Tradisi lisan:</strong> penuturan yang diatribusikan kepada sumber dan konteksnya, tanpa otomatis menyatakan isi cerita sebagai kejadian historis.</li><li><strong>Penafsiran:</strong> cara penulis atau peneliti menjelaskan bukti, yang dapat dibandingkan dengan tafsir lain.</li></ul><h3>Kedalaman pemeriksaan</h3><ul><li><strong>Inventaris sumber:</strong> metadata atau katalog telah diidentifikasi.</li><li><strong>Ringkasan terbatas:</strong> abstrak atau bagian tertentu diperiksa; batasnya dijelaskan.</li><li><strong>Tinjauan komunitas:</strong> belum dilakukan pada catatan halaman ini.</li></ul><p>Variasi antarlokasi, keluarga, dan generasi dicatat secara terbuka. Daftar marga tidak dinyatakan lengkap dan sumber yang saling menyalin tidak dihitung sebagai bukti independen.</p>' + '<p class="source-note">Dokumen kerja cetak biru belum dipublikasikan. Metode di halaman ini merangkum arah penelitian proyek.</p>');
  }
  $('#open-method').addEventListener('click', openMethod);
  $('#open-sources').addEventListener('click', () => {
    const sourceCount = Object.keys(data.sources).length;
    showReading('Daftar sumber', 'Transparansi penelitian', `<p>Inventaris saat ini memuat ${sourceCount} rekaman sumber. Status pembacaan menunjukkan cakupan yang tercatat, bukan jaminan kebenaran seluruh isinya.</p>` + Object.keys(data.sources).map(id => sourceRecord(id)).join(''));
  });
  $('#open-credits').addEventListener('click', () => {
    showReading('Kredit foto dan penggunaan konten', 'Atribusi & hak penggunaan', '<p>Foto digunakan berdasarkan keterangan dan lisensi yang tercantum pada rekam Wikimedia Commons milik fotografer. Penggunaannya tidak menyiratkan dukungan fotografer terhadap proyek.</p>' + Object.keys(data.media).map(mediaRecord).join('') + '<h3>Naskah dan sumber</h3><p>Naskah pengantar disusun untuk proyek Ensiklopedia Suku Mandailing. Lisensi publikasi naskah ensiklopedia belum ditetapkan. Sumber, foto, atau pengetahuan komunitas tetap mengikuti hak dan pembatasannya masing-masing. Tautan ke buku tidak memberi izin menyalin seluruh isinya.</p><p>Ilustrasi tipografis serta lambang buku adalah elemen antarmuka. Keduanya tidak dimaksudkan sebagai aksara, ornamen adat, atau rekonstruksi sejarah.</p>');
  });
  $('#open-privacy').addEventListener('click', () => {
    showReading('Privasi draf kontribusi', 'Penyimpanan di perangkat', '<p>Penyusun kontribusi belum terhubung dengan pengiriman daring. Saat Anda memilih Simpan draf di peramban, isi disimpan melalui penyimpanan lokal pada peramban yang Anda gunakan.</p><p>Draf tidak dikirim kepada pengelola. Orang lain yang menggunakan profil peramban yang sama mungkin dapat membukanya. Hindari data pribadi keluarga, kontak sensitif, lokasi objek rentan, serta bahan yang belum boleh dibagikan.</p><p>Anda dapat menghapus draf melalui tombol Hapus draf dari peramban. Pilihan Unduh draf membuat berkas teks; Anda menentukan sendiri penyimpanan dan pembagiannya.</p><p>Halaman ini tidak memuat analitik pengunjung atau permintaan jaringan pihak ketiga saat dibuka. Hosting pratinjau dapat memiliki mekanisme akses dan pencatatan layanan tersendiri. Tautan sumber membuka situs luar dengan kebijakan masing-masing.</p>');
  });
  document.addEventListener('click', event => {
    const button = event.target.closest('[data-theme],[data-category-link],[data-open-entry],[data-open-source],[data-marga],[data-open-media],[data-open-contribution]');
    if (!button) return;
    if (button.dataset.theme) applyCategory(button.dataset.theme);
    if (button.dataset.categoryLink) {event.preventDefault(); applyCategory(button.dataset.categoryLink);}
    if (button.dataset.openEntry) openEntry(button.dataset.openEntry);
    if (button.dataset.openSource) openSource(button.dataset.openSource);
    if (button.dataset.marga) openMarga(button.dataset.marga);
    if (button.dataset.openMedia) showReading('Rekam dokumentasi visual', 'Atribusi foto', mediaRecord(button.dataset.openMedia));
    if (button.hasAttribute('data-open-contribution')) openContribution();
  });
  [reading, contribution].forEach(dialog => {
    $('.close-dialog', dialog).addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', event => {
      if (event.target !== dialog) return;
      const box = dialog.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) dialog.close();
    });
  });
  reading.addEventListener('close', () => {
    if (location.hash.startsWith('#catatan/') || location.hash.startsWith('#sumber/')) {
      try {history.replaceState(null, '', '#entri');} catch (_) { /* optional location state */ }
    }
    if (readingOpener?.isConnected) readingOpener.focus({preventScroll: true});
  });

  // Draf lokal: tidak ada endpoint kirim, dan tidak ada pesan terkirim palsu.
  const STORAGE_KEY = 'mandailing.contribution.draft.v1';
  const form = $('#contribution-form');
  function setDraftStatus(message, error = false) {
    $('#draft-status').textContent = message;
    $('#draft-status').classList.toggle('error', error);
  }
  function readDraft() {
    try {
      const value = localStorage.getItem(STORAGE_KEY);
      if (!value) return null;
      const draft = JSON.parse(value);
      if (!draft || typeof draft.topic !== 'string' || typeof draft.note !== 'string') return null;
      return draft;
    } catch (_) { return null; }
  }
  function draftFromForm() {
    return {
      format: 'mandailing-contribution-draft-v1', type: form.elements.type.value,
      author: form.elements.author.value.trim(), topic: form.elements.topic.value.trim(),
      note: form.elements.note.value.trim(), source: form.elements.source.value.trim(),
      consent: form.elements.consent.checked, savedAt: new Date().toISOString(),
      deliveryStatus: 'LOCAL_DRAFT_NOT_SENT'
    };
  }
  function openContribution() {
    contributionOpener = document.activeElement;
    const draft = readDraft();
    if (draft) {
      for (const key of ['type', 'author', 'topic', 'note', 'source']) {
        if (typeof draft[key] === 'string' && form.elements[key]) form.elements[key].value = draft[key];
      }
      form.elements.consent.checked = draft.consent === true;
      setDraftStatus('Draf sebelumnya tersedia di peramban ini. Belum dikirim kepada pengelola.');
      $('#delete-draft').hidden = false;
    } else setDraftStatus('');
    contribution.showModal();
    contribution.scrollTop = 0;
    $('#contribution-type').focus({preventScroll: true});
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const draft = draftFromForm();
    try {
      const serialized = JSON.stringify(draft);
      localStorage.setItem(STORAGE_KEY, serialized);
      if (localStorage.getItem(STORAGE_KEY) !== serialized) throw new Error('Storage verification failed');
      setDraftStatus('Draf tersimpan di peramban ini. Belum dikirim kepada pengelola.');
      $('#delete-draft').hidden = false;
    } catch (_) {
      setDraftStatus('Draf belum tersimpan karena penyimpanan peramban tidak tersedia. Gunakan Unduh draf untuk membuat salinan.', true);
    }
  });
  $('#download-draft').addEventListener('click', () => {
    if (!form.reportValidity()) return;
    const draft = draftFromForm();
    const content = ['DRAF KONTRIBUSI ENSIKLOPEDIA SUKU MANDAILING', '', 'STATUS: DRAF LOKAL, BELUM DIKIRIM', '', `Jenis: ${draft.type}`, `Nama atribusi: ${draft.author || '(tidak diisi)'}`, `Topik: ${draft.topic}`, `Sumber: ${draft.source || '(lihat uraian)'}`, '', 'USULAN DAN KONTEKS', draft.note, '', 'CATATAN', 'Hindari data pribadi keluarga. Izin dan pembatasan bahan perlu dijelaskan.', '', `Dibuat: ${draft.savedAt}`].join('\n');
    const blob = new Blob([content], {type: 'text/plain;charset=utf-8'});
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Draf_Kontribusi_Mandailing.txt';
    document.body.append(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    setDraftStatus('Unduhan draf dimulai. Draf belum dikirim kepada pengelola.');
  });
  $('#delete-draft').addEventListener('click', () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      if (localStorage.getItem(STORAGE_KEY) !== null) throw new Error('Deletion failed');
      form.reset();
      $('#delete-draft').hidden = true;
      setDraftStatus('Draf telah dihapus dari peramban ini.');
    } catch (_) {setDraftStatus('Draf belum dapat dihapus dari penyimpanan peramban.', true);}
  });
  contribution.addEventListener('close', () => {
    if (contributionOpener?.isConnected) contributionOpener.focus({preventScroll: true});
  });

  function readLocation() {
    try {
      if (location.hash.startsWith('#catatan/')) {
        const id = decodeURIComponent(location.hash.slice('#catatan/'.length));
        openEntry(id, false);
      } else if (location.hash.startsWith('#sumber/')) {
        const id = decodeURIComponent(location.hash.slice('#sumber/'.length));
        openSource(id, false);
      }
    } catch (_) { /* Abaikan fragmen URL yang tidak sah. */ }
  }
  window.addEventListener('hashchange', readLocation);
  renderEntries();
  readLocation();
})();
