/* Logika pencarian murni agar perilakunya dapat diperiksa tanpa browser. */
(() => {
  'use strict';

  const normalize = value => String(value ?? '').toLocaleLowerCase('id').normalize('NFD').replace(/[\u0300-\u036f]/g, '');

  window.MANDAILING_FILTER_ENTRIES = function (entries, filters = {}, sources = {}, themes = []) {
    const query = normalize(String(filters.query ?? '').trim());
    const category = filters.category ?? 'all';
    const status = filters.status ?? 'all';
    const themeNames = new Map(themes.map(theme => [theme.id, theme.name]));

    return entries.filter(entry => {
      if (category !== 'all' && entry.category !== category) return false;
      if (status !== 'all' && entry.status !== status) return false;

      const sourceSearchTerms = (entry.sourceIds || []).flatMap(id => {
        const source = sources[id];
        return source ? [source.id, source.title, source.authors, source.year, source.publisher, source.readStatus, source.locator] : [];
      });
      const searchable = [entry.title, entry.summary, themeNames.get(entry.category) || entry.category, ...(entry.tags || []), ...sourceSearchTerms].join(' ');
      return !query || normalize(searchable).includes(query);
    });
  };
})();
