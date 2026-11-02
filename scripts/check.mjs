// Pemeriksaan integritas rilis; tidak memverifikasi kebenaran ilmiah sumber.
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import fs from 'node:fs';
import path from 'node:path';
import vm from 'node:vm';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = root;
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const html = read('index.html');
const css = read('styles.css');
const context = vm.createContext({ window: {} });
vm.runInContext(read('data/content.js'), context, { timeout: 1000 });
const data = JSON.parse(JSON.stringify(context.window.MANDAILING_CONTENT));
const inventory = JSON.parse(read('docs/reference-inventory.json'));
let checks = 0;
function check(condition, message) { assert.ok(condition, message); checks++; }
const projectDate = data.project?.updatedOn;
const projectDateValue = new Date(String(projectDate) + 'T00:00:00Z');
check(typeof projectDate === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(projectDate) && !Number.isNaN(projectDateValue.valueOf()) && projectDateValue.toISOString().slice(0, 10) === projectDate, 'Tanggal project.updatedOn harus berupa tanggal kalender ISO yang valid');
const appSourceForDate = read('app.js');
check(appSourceForDate.includes('new Date(`${data.project.updatedOn}T00:00:00Z`)'), 'Tanggal editorial harus berasal dari project.updatedOn');
check(appSourceForDate.includes("new Intl.DateTimeFormat('id-ID'") && appSourceForDate.includes("timeZone: 'UTC'"), 'Tanggal editorial harus memakai format lokal dan zona waktu UTC');
check(appSourceForDate.includes('escape(projectUpdatedLabel)'), 'Label tanggal metadata proyek harus ditampilkan pada catatan');
check(appSourceForDate.includes('const sourceCount = Object.keys(data.sources).length;'), 'Dialog sumber harus menghitung inventaris saat runtime');
check(appSourceForDate.includes('Inventaris saat ini memuat ${sourceCount} rekaman sumber.'), 'Dialog sumber harus menampilkan jumlah inventaris terbaru');
check(!appSourceForDate.includes('Berikut 19 rekaman referensi awal'), 'Dialog sumber tidak boleh mengunci jumlah sumber lama');
check(appSourceForDate.includes('sourceRecord(id, linkToRecord = false)') && appSourceForDate.includes('data-open-source="${escape(source.id)}"'), 'Catatan harus menyediakan tautan internal ke rekam sumber');
check(appSourceForDate.includes('data.entries.filter(entry => entry.sourceIds.includes(id))'), 'Rekam sumber harus menemukan catatan yang merujuknya dari data aktif');
check(appSourceForDate.includes("history.replaceState(null, '', '#sumber/' + encodeURIComponent(id))"), 'Rekam sumber harus memiliki fragmen URL langsung');
check(appSourceForDate.includes("location.hash.startsWith('#sumber/')") && appSourceForDate.includes("location.hash.startsWith('#catatan/') || location.hash.startsWith('#sumber/')"), 'Fragmen sumber harus membuka rekam dan kembali ke bagian catatan saat dialog ditutup');
const contentHash = createHash('sha256').update(read('data/content.js')).digest('hex').slice(0, 12);
const contentScriptVersion = html.match(/<script defer src="data\/content\.js\?v=([a-f0-9]{12})"><\/script>/);
check(contentScriptVersion?.[1] === contentHash, 'URL konten harus memakai hash berkas hasil generator');
const appHash = createHash('sha256').update(read('app.js')).digest('hex').slice(0, 12);
const appScriptVersion = html.match(/<script defer src="app\.js\?v=([a-f0-9]{12})"><\/script>/);
check(appScriptVersion?.[1] === appHash, 'URL app.js harus memakai hash berkas antarmuka');
const languageHash = createHash('sha256').update(read('landing-language.js')).digest('hex').slice(0, 12);
const languageScriptVersion = html.match(/<script defer src="landing-language\.js\?v=([a-f0-9]{12})"><\/script>/);
check(languageScriptVersion?.[1] === languageHash, 'URL landing-language.js harus memakai hash berkas terjemahan');
function hasText(value) { return typeof value === 'string' && value.trim().length > 0; }
function webUrl(value) { try { return ['https:', 'http:'].includes(new URL(value).protocol); } catch { return false; } }
function localFile(relative) {
  const assetPath = relative.split(/[?#]/, 1)[0];
  const target = path.resolve(dist, assetPath);
  check(target.startsWith(dist + path.sep), `Aset keluar dari dist: ${relative}`);
  check(fs.existsSync(target) && fs.statSync(target).size > 0, `Aset hilang: ${relative}`);
}

check(data.entries.length > 0, 'Catatan harus tersedia');
for (const [name, values] of [['tema', data.themes.map(x => x.id)], ['catatan', data.entries.map(x => x.id)], ['marga', data.marga]]) {
  check(new Set(values).size === values.length, `ID/nama ${name} duplikat`);
}
check(inventory.length === Object.keys(data.sources).length, 'Jumlah sumber generator tidak konsisten');
const referenceCounts = [...html.matchAll(/<\w+\b[^>]*\bdata-reference-count\b[^>]*>(\d+)<\/\w+>/g)].map(match => Number(match[1]));
check(referenceCounts.length === 2 && referenceCounts.every(count => count === inventory.length), 'Jumlah referensi publik harus cocok dengan inventaris');
const themeIds = new Set(data.themes.map(x => x.id));
const inventoryIds = new Set(inventory.map(x => x.id));
const sourceReadStatuses = new Set(['Metadata dan katalog', 'Abstrak atau cuplikan', 'Bagian tertentu', 'Teks penuh']);
const editorialStatuses = new Set(['Ringkasan terbatas', 'Inventaris sumber', 'Dokumentasi visual beratribusi']);
const linkedSourceIds = new Set(data.entries.flatMap(entry => Array.isArray(entry.sourceIds) ? entry.sourceIds : []));
const unlinkedSourceIds = [...inventoryIds].filter(id => !linkedSourceIds.has(id));
const sourceLinkExceptions = new Map([['R019', 'pedoman metode internal']]);
const coverageAudit = read('docs/CONTENT_COVERAGE.md');
check(unlinkedSourceIds.every(id => sourceLinkExceptions.has(id)), `Sumber tanpa tautan catatan harus memiliki pengecualian terdokumentasi: ${unlinkedSourceIds.join(', ')}`);
for (const [id, reason] of sourceLinkExceptions) {
  check(inventoryIds.has(id) && !linkedSourceIds.has(id) && hasText(reason) && coverageAudit.includes(`\`${id}\``) && coverageAudit.includes(reason), `Pengecualian tautan sumber harus sesuai inventaris dan audit cakupan: ${id}`);
}
for (const [id, source] of Object.entries(data.sources)) {
  check(id === source.id && inventoryIds.has(id), `ID sumber tidak cocok: ${id}`);
  for (const field of ['title', 'authors', 'year', 'publisher', 'readStatus', 'locator', 'limit']) check(hasText(source[field]), `Rekam ${id} tanpa ${field}`);
  check(sourceReadStatuses.has(source.readStatus), `Status pembacaan sumber tidak dikenal: ${id}`);
  check(webUrl(source.url), `URL sumber tidak valid: ${id}`);
  if (source.previewUrl) check(webUrl(source.previewUrl), `URL cuplikan tidak valid: ${id}`);
}
for (const entry of data.entries) {
  check(/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(entry.id), `Slug tidak valid: ${entry.id}`);
  check(themeIds.has(entry.category), `Tema tidak dikenal: ${entry.id}`);
  for (const field of ['title', 'summary', 'status', 'limit']) check(hasText(entry[field]), `Catatan ${entry.id} tanpa ${field}`);
  check(editorialStatuses.has(entry.status), `Status editorial tidak dikenal: ${entry.id}`);
  check(Array.isArray(entry.sourceIds), `sourceIds harus daftar: ${entry.id}`);
  check(entry.sourceIds.length > 0 || Boolean(data.media[entry.mediaId]), `Catatan tanpa sumber/media: ${entry.id}`);
  for (const id of entry.sourceIds) check(Boolean(data.sources[id]), `Sumber ${id} tidak ditemukan`);
  if (entry.status === 'Ringkasan terbatas') {
    const evidenceStatuses = new Set(['Bagian tertentu', 'Abstrak atau cuplikan']);
    check(entry.sourceIds.length > 0 && entry.sourceIds.every(id => evidenceStatuses.has(data.sources[id]?.readStatus)), `Ringkasan terbatas harus merujuk sumber yang dibaca sebagian atau cuplikannya: ${entry.id}`);
  }
  check(entry.body.length > 0 && entry.body.every(x => hasText(x.heading) && x.paragraphs.length > 0 && x.paragraphs.every(hasText)), `Isi catatan belum lengkap: ${entry.id}`);
  if (entry.image) {
    localFile(entry.image);
    check(hasText(entry.imageAlt), `Foto tanpa alt: ${entry.id}`);
    check(Boolean(data.media[entry.mediaId]), `Foto tanpa kredit: ${entry.id}`);
  }
}
for (const role of data.roles) {
  check(hasText(role.description), `Peran tanpa penjelasan: ${role.id}`);
  check(role.sourceIds.length > 0 && role.sourceIds.every(id => data.sources[id]), `Peran tanpa rujukan: ${role.id}`);
}
for (const [id, media] of Object.entries(data.media)) {
  for (const field of ['author', 'title', 'license', 'changes']) check(hasText(media[field]), `Media ${id} tanpa ${field}`);
  check(webUrl(media.pageUrl) && webUrl(media.licenseUrl), `Media ${id} tanpa tautan rekam/lisensi`);
}

const htmlIds = [...html.matchAll(/\bid="([^"]+)"/g)].map(x => x[1]);
check(new Set(htmlIds).size === htmlIds.length, 'ID HTML duplikat');
for (const [, id] of html.matchAll(/\bhref="#([^"]+)"/g)) check(htmlIds.includes(id), `Target fragmen hilang: #${id}`);
for (const [, relative] of html.matchAll(/\b(?:src|href)="((?:assets|data)\/[^"#]+|app\.js|styles\.css)"/g)) localFile(relative);
for (const [, set] of html.matchAll(/\bsrcset="([^"]+)"/g)) for (const item of set.split(',')) localFile(item.trim().split(/\s+/)[0]);
for (const [, tag] of html.matchAll(/(<img\b[^>]*>)/g)) {
  check(/\balt="[^"]+"/.test(tag), 'Gambar tanpa teks alternatif');
  check(/\bwidth="\d+"/.test(tag) && /\bheight="\d+"/.test(tag), 'Gambar tanpa dimensi');
}
check(html.includes('href="kontributor.html"') && fs.existsSync(path.join(root,'kontributor.html')), 'Halaman kontributor tidak tersedia');
check(read('kontributor.html').includes('pengiriman daring belum aktif') && read('kontributor.html').includes('id="community-form"'), 'Batas pengiriman draf kontributor tidak jelas');
check(html.includes('id="landing-language"') && html.includes('landing-language.js'), 'Pilihan bahasa landing page tidak tersedia');
check(fs.existsSync(path.join(root,'landing-language.js')), 'Berkas penerjemahan landing page hilang');
check(html.includes('<html lang="id">') && html.includes('<main id="utama">'), 'Bahasa atau landmark utama hilang');
check(html.includes('name="description"') && html.includes('rel="canonical"'), 'Metadata SEO belum lengkap');
check(html.includes('https://ensiklopediamandailing.github.io/') && !html.includes('chatgpt.site'), 'Canonical dan OG harus memakai alamat GitHub Pages');
check(html.includes('name="robots" content="index,follow"'), 'Landing page publik harus dapat diindeks');
for (const file of ['index.html', 'app.js', 'data/content.js', 'scripts/prepare-content.py', 'README.md', 'docs/reference-inventory.json', 'assets/CREDITS.md']) {
  check(!/https?:\/\/(?:drive|docs)\.google\.com\//i.test(read(file)), `Tautan dokumen kerja belum boleh diterbitkan: ${file}`);
}
check(!/<form[^>]+action="https?:/i.test(html), 'Rilis draf lokal tidak boleh mengirim form eksternal');
check(data.project.contributionEndpoint === null && data.project.contactEmail === null, 'Integrasi/kontak awal harus tetap berstatus belum ditetapkan');
check(!data.project.communityReviewCompleted && !data.project.fullSourceReadingCompleted, 'Status penelitian awal tidak cocok');
check(!fs.existsSync(path.join(dist, 'qa-responsive.html')), 'Harness pengujian tidak boleh terpublikasi');
check(css.includes('prefers-reduced-motion') && css.includes(':focus-visible'), 'Dukungan gerak/fokus hilang');

function luminance(hex) {
  const channels = hex.replace('#', '').match(/../g).map(c => parseInt(c, 16) / 255).map(x => x <= .04045 ? x / 12.92 : ((x + .055) / 1.055) ** 2.4);
  return .2126 * channels[0] + .7152 * channels[1] + .0722 * channels[2];
}
const contrast = [];
for (const [label, foreground, background, minimum] of [
  ['Teks utama / gading', '#302824', '#faf7f0', 4.5],
  ['Teks pendamping / gading', '#6d625b', '#faf7f0', 4.5],
  ['Marun / gading', '#641e2b', '#faf7f0', 4.5],
  ['Tombol terang / marun', '#fffdf8', '#641e2b', 4.5],
  ['Aksen judul / marun', '#dfc5a4', '#641e2b', 4.5],
  ['Status hijau / kertas', '#526545', '#fffdf8', 4.5],
  ['Fokus emas / gading', '#a9824c', '#faf7f0', 3]
]) {
  const a = luminance(foreground), b = luminance(background);
  const ratio = (Math.max(a, b) + .05) / (Math.min(a, b) + .05);
  check(ratio >= minimum, `Kontras ${label} kurang dari ${minimum}: ${ratio}`);
  contrast.push(`${label}: ${ratio.toFixed(2)}:1`);
}
for (const file of ['app.js', 'landing-language.js', 'kontributor.js', 'data/content.js']) execFileSync(process.execPath, ['--check', path.join(root, file)], { stdio: 'pipe' });
console.log(`Lulus ${checks} pemeriksaan integritas; ${data.entries.length} catatan, ${data.themes.length} tema, ${Object.keys(data.sources).length} sumber.`);
console.log(contrast.join('\n'));
