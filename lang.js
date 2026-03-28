/* Language toggle for rozemarijnvandijk.eu
   Usage: add ?lang=nl to URL, or click the toggle buttons.
   Elements with class "en" are shown in English, class "nl" in Dutch. */
(function () {
  var lang = new URLSearchParams(window.location.search).get('lang') || 'en';

  function applyLang(l) {
    document.body.classList.remove('lang-en', 'lang-nl');
    document.body.classList.add('lang-' + l);
    document.querySelectorAll('[data-lang-btn]').forEach(function (btn) {
      btn.classList.toggle('active', btn.dataset.langBtn === l);
    });
    // Carry the lang param through all internal .html links
    document.querySelectorAll('a[href]').forEach(function (a) {
      var href = a.getAttribute('href');
      if (!href) return;
      if (href.startsWith('http') || href.startsWith('mailto') || href.startsWith('#')) return;
      var parts = href.split('?');
      var base = parts[0];
      var params = new URLSearchParams(parts[1] || '');
      params.set('lang', l);
      a.href = base + '?' + params.toString();
    });
  }

  window.switchLang = function (l) {
    lang = l;
    var url = new URL(window.location.href);
    url.searchParams.set('lang', l);
    history.replaceState({}, '', url);
    applyLang(l);
  };

  document.addEventListener('DOMContentLoaded', function () {
    applyLang(lang);
  });
})();
