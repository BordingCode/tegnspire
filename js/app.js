/* Tegnspire — app shell, router and rendering. Vanilla JS, no build. */
(function () {
  'use strict';
  var TS = window.TS, SIGNS = TS.SIGNS;
  var view = document.getElementById('view');
  var tabbar = document.getElementById('tabbar');
  var chip = document.getElementById('progresschip');

  /* ---------- tiny helpers ---------- */
  function el(html) { var t = document.createElement('template'); t.innerHTML = html.trim(); return t.content.firstChild; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (c) { return ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]; }); }
  // strip SMIL animation → a calm static frame (used for grid thumbnails & print)
  function staticArt(a) { return a.replace(/<animate[^>]*>/g, ''); }
  var ICON = {
    back: '<svg viewBox="0 0 24 24" fill="none"><path d="M15 5l-7 7 7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    next: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 5l7 7-7 7" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none"><path d="M5 13l4 4L19 7" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    plus: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 6v12M6 12h12" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg>',
    ext: '<svg viewBox="0 0 24 24" fill="none"><path d="M14 5h5v5M19 5l-8 8M11 5H7a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
    print: '<svg viewBox="0 0 24 24" fill="none"><path d="M7 9V4h10v5M7 18H5a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M7 14h10v6H7z" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" fill="none"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10c1 1 1.5 1.5 1.5 3h5c0-1.5.5-2 1.5-3a6 6 0 0 0-4-10z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>'
  };

  /* ---------- progress (localStorage) ---------- */
  var LEARN_KEY = 'ts_learned_v1', LESSON_KEY = 'ts_lessons_v1';
  function getSet(k) { try { return new Set(JSON.parse(localStorage.getItem(k) || '[]')); } catch (e) { return new Set(); } }
  function saveSet(k, s) { try { localStorage.setItem(k, JSON.stringify(Array.from(s))); } catch (e) {} }
  var learned = getSet(LEARN_KEY);
  var lessonsDone = getSet(LESSON_KEY);
  var ordbogMode = (function () { try { return localStorage.getItem('ts_ordbogmode') || 'situation'; } catch (e) { return 'situation'; } })();
  function isLearned(id) { return learned.has(id); }
  function toggleLearned(id) { if (learned.has(id)) learned.delete(id); else learned.add(id); saveSet(LEARN_KEY, learned); refreshChip(); }
  function refreshChip() { chip.textContent = learned.size + ' / ' + SIGNS.length + ' tegn lært'; }

  /* ---------- reusable bits ---------- */
  function signCard(s) {
    return '<div class="sign' + (isLearned(s.id) ? ' learned' : '') + '" data-go="#/tegn/' + s.id + '">' +
      '<div class="art">' + staticArt(s.art) + '</div>' +
      '<div class="w">' + esc(s.word) + '</div>' +
      '<div class="badge">' + ICON.check + ' Lært</div>' +
      '</div>';
  }
  var TEGNSPROG = 'https://tegnsprog.dk/';

  /* ---------- views ---------- */
  function groupedOrdbogHTML(mode) {
    var html = '';
    if (mode === 'alder') {
      TS.STAGES.forEach(function (st) {
        var inSt = SIGNS.filter(function (s) { return s.stage === st.id; });
        if (!inSt.length) return;
        html += '<div class="stage-h"><span class="stage-age">' + esc(st.label) + '</span><span class="stage-title">' + esc(st.title) + '</span></div>' +
          '<p class="stage-desc">' + esc(st.desc) + '</p>' +
          '<div class="grid">' + inSt.map(signCard).join('') + '</div>';
      });
    } else {
      TS.CATEGORIES.forEach(function (c) {
        var inCat = SIGNS.filter(function (s) { return s.cat === c.id; });
        if (!inCat.length) return;
        html += '<div class="cat-h">' + esc(c.name) + '</div><div class="grid">' + inCat.map(signCard).join('') + '</div>';
      });
    }
    return html;
  }
  function fillOrdbog(v) {
    var q = (v || '').trim().toLowerCase();
    var below = document.getElementById('below-search');
    if (!below) return;
    var seg = document.getElementById('seg');
    if (q) {
      if (seg) seg.style.display = 'none';
      var matches = SIGNS.filter(function (s) { return s.word.toLowerCase().indexOf(q) > -1; });
      below.innerHTML = matches.length ? '<div class="grid">' + matches.map(signCard).join('') + '</div>'
        : '<p class="empty">Ingen tegn matcher "' + esc(v) + '".</p>';
    } else {
      if (seg) seg.style.display = '';
      below.innerHTML = groupedOrdbogHTML(ordbogMode);
    }
    bindGo();
  }
  function vOrdbog(q) {
    q = (q || '').trim().toLowerCase();
    var html = '<h1 class="page-h">Ordbog</h1>' +
      '<p class="page-sub">' + SIGNS.length + ' danske babytegn. Tryk på et tegn for at se det stort.</p>' +
      '<div class="search"><svg viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="7" stroke="currentColor" stroke-width="2"/><path d="M20 20l-3-3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>' +
      '<input id="q" type="search" inputmode="search" placeholder="Søg efter et tegn…" value="' + esc(q) + '" autocomplete="off"></div>' +
      '<div class="segmented" id="seg">' +
        '<button data-mode="situation"' + (ordbogMode === 'situation' ? ' class="on"' : '') + '>Efter situation</button>' +
        '<button data-mode="alder"' + (ordbogMode === 'alder' ? ' class="on"' : '') + '>Efter alder</button>' +
      '</div>' +
      '<div id="below-search"></div>';
    render(html, 'ordbog');
    var input = document.getElementById('q');
    fillOrdbog(q);
    input.addEventListener('input', function () {
      var v = input.value;
      history.replaceState(null, '', v ? '#/ordbog?q=' + encodeURIComponent(v) : '#/ordbog');
      fillOrdbog(v);
    });
    Array.prototype.forEach.call(document.querySelectorAll('#seg button'), function (b) {
      b.addEventListener('click', function () {
        ordbogMode = b.getAttribute('data-mode');
        try { localStorage.setItem('ts_ordbogmode', ordbogMode); } catch (e) {}
        Array.prototype.forEach.call(document.querySelectorAll('#seg button'), function (x) { x.classList.toggle('on', x === b); });
        fillOrdbog(document.getElementById('q').value);
      });
    });
    if (q) { input.focus(); input.setSelectionRange(q.length, q.length); }
  }

  function vTegn(id) {
    var s = TS.byId(id);
    if (!s) { return vOrdbog(''); }
    var idx = SIGNS.indexOf(s);
    var prev = SIGNS[idx - 1], next = SIGNS[idx + 1];
    var done = isLearned(s.id);
    var html = '<div class="detail">' +
      '<a class="backlink" data-go="#/ordbog">' + ICON.back + ' Ordbog</a>' +
      '<div class="detail-art">' + s.art + '</div>' +
      '<h1>' + esc(s.word) + '</h1>' +
      (s.stage ? '<div class="agechip">Kan typisk læres ' + esc(TS.stage(s.stage).label) + '</div>' : '') +
      '<div class="howbox"><div class="label">Sådan gør du</div><p>' + esc(s.how) + '</p></div>' +
      '<div class="tipbox"><div class="label">Brug det når…</div><p>' + esc(s.tip) + '</p></div>' +
      '<div class="btnrow">' +
        '<button class="btn ' + (done ? 'btn-learned' : 'btn-primary') + '" id="learnbtn">' +
          (done ? ICON.check + ' Lært' : ICON.plus + ' Marker som lært') + '</button>' +
        '<a class="official" href="' + TEGNSPROG + '" target="_blank" rel="noopener">' +
          ICON.ext + ' Se det officielle tegn i Ordbog over Dansk Tegnsprog</a>' +
      '</div>' +
      '<div class="pager">' +
        (prev ? '<a class="prev" data-go="#/tegn/' + prev.id + '">' + ICON.back + ' ' + esc(prev.word) + '</a>' : '<a class="prev disabled"></a>') +
        (next ? '<a class="next" data-go="#/tegn/' + next.id + '">' + esc(next.word) + ' ' + ICON.next + '</a>' : '<a class="next disabled"></a>') +
      '</div></div>';
    render(html, 'ordbog');
    document.getElementById('learnbtn').addEventListener('click', function () {
      toggleLearned(s.id); vTegn(s.id);
    });
    window.scrollTo(0, 0);
  }

  function lessonProgress(lesson) {
    var have = lesson.signs.filter(isLearned).length;
    return { have: have, total: lesson.signs.length, pct: Math.round(have / lesson.signs.length * 100) };
  }
  function vLektioner() {
    var html = '<h1 class="page-h">Lektioner</h1>' +
      '<p class="page-sub">En rolig vej ind i babytegn — fire små lektioner, der tager hverdagens øjeblikke ét ad gangen.</p>';
    TS.LESSONS.forEach(function (l) {
      var p = lessonProgress(l);
      var done = lessonsDone.has(String(l.id));
      html += '<div class="lesson-card' + (done ? ' done' : '') + '" data-go="#/lektion/' + l.id + '">' +
        '<div class="lesson-num">' + (done ? ICON.check : l.id) + '</div>' +
        '<div class="lesson-meta"><h3>' + esc(l.title) + '</h3>' +
          '<div class="bar"><span style="width:' + p.pct + '%"></span></div>' +
          '<small>' + p.have + ' af ' + p.total + ' tegn lært</small></div>' +
        '<div class="chev">' + ICON.next + '</div></div>';
    });
    render(html, 'lektioner');
  }
  function vLektion(idStr) {
    var l = TS.LESSONS.filter(function (x) { return String(x.id) === String(idStr); })[0];
    if (!l) return vLektioner();
    var done = lessonsDone.has(String(l.id));
    var html = '<div class="detail">' +
      '<a class="backlink" data-go="#/lektioner">' + ICON.back + ' Lektioner</a>' +
      '<h1 class="page-h">' + l.id + '. ' + esc(l.title) + '</h1>' +
      '<div class="lesson-intro">' + esc(l.intro) + '</div>' +
      '<div class="coach">' + ICON.bulb + '<div><strong>Tip:</strong> ' + esc(l.tip) + '</div></div>' +
      '<div class="grid">' + l.signs.map(function (sid) { return signCard(TS.byId(sid)); }).join('') + '</div>' +
      '<div class="btnrow" style="margin-top:18px">' +
        '<button class="btn ' + (done ? 'btn-learned' : 'btn-primary') + '" id="lessonbtn">' +
          (done ? ICON.check + ' Lektion gennemført' : ICON.check + ' Marker lektion som gennemført') + '</button>' +
      '</div></div>';
    render(html, 'lektioner');
    document.getElementById('lessonbtn').addEventListener('click', function () {
      var k = String(l.id);
      if (lessonsDone.has(k)) lessonsDone.delete(k);
      else { lessonsDone.add(k); l.signs.forEach(function (sid) { learned.add(sid); }); saveSet(LEARN_KEY, learned); refreshChip(); }
      saveSet(LESSON_KEY, lessonsDone);
      vLektion(l.id);
    });
    window.scrollTo(0, 0);
  }

  function vHuskekort() {
    var html = '<h1 class="page-h">Huskekort</h1>' +
      '<p class="page-sub">Små oversigter til hverdagens øjeblikke. Tryk på "Print" for et kort du kan hænge på køleskabet eller give til bedsteforældre og dagpleje.</p>';
    TS.CHEATS.forEach(function (c) {
      html += '<div class="cheat" data-cheat="' + c.id + '">' +
        '<div class="cheat-head"><div><h3>' + esc(c.title) + '</h3><small>' + esc(c.sub) + '</small></div>' +
        '<button class="printbtn" data-print="' + c.id + '">' + ICON.print + ' Print</button></div>' +
        '<div class="cheat-grid">' +
          c.signs.map(function (sid) { var s = TS.byId(sid);
            return '<div class="cheat-item" data-go="#/tegn/' + s.id + '"><div class="art">' + staticArt(s.art) + '</div><div class="w">' + esc(s.word) + '</div></div>';
          }).join('') +
        '</div></div>';
    });
    render(html, 'huskekort');
    Array.prototype.forEach.call(document.querySelectorAll('[data-print]'), function (b) {
      b.addEventListener('click', function (e) {
        e.stopPropagation();
        var id = b.getAttribute('data-print');
        Array.prototype.forEach.call(document.querySelectorAll('.cheat'), function (c) {
          c.classList.toggle('printing', c.getAttribute('data-cheat') === id);
        });
        window.print();
      });
    });
  }

  function vOm() {
    var method = TS.METHOD.map(function (m) {
      return '<div class="method-item"><h4>' + esc(m.t) + '</h4><p>' + esc(m.d) + '</p></div>';
    }).join('');
    var html = '<div class="about">' +
      '<h1 class="page-h">Om babytegn</h1>' +
      '<p class="page-sub">Babytegn er enkle håndtegn, du bruger sammen med talen, så dit barn kan "sige" fx <em>mere</em>, <em>mælk</em> eller <em>sove</em>, før det kan tale. Det giver færre frustrationer — og forskning peger på at det styrker sprog­udviklingen.</p>' +
      '<div class="method">' + method + '</div>' +
      '<div class="source"><strong>Hvor kommer tegnene fra?</strong><br>' +
        'Tegnene i Tegnspire er danske babytegn fra dansk tegnsprog, krydstjekket mod to uafhængige danske dagtilbuds-materialer: ' +
        '<em>“Baby- og Børnetegn”</em> af Vibeke Manniche (Sct. Severin Børnehuse / Dagtilbud-Syd, Kerteminde) og ' +
        'Rikke Winckler’s babytegn-oversigt (rikkewinckler.dk, Vuggestuen Margrethevej). ' +
        'Illustrationerne er tegnet fra bunden til Tegnspire som en huskestøtte. Det officielle opslagsværk er ' +
        '<a href="' + TEGNSPROG + '" target="_blank" rel="noopener">Ordbog over Dansk Tegnsprog (tegnsprog.dk)</a> — slå et ord op der for at se en video af det rigtige tegn.</div>' +
      '<p class="disclaimer">Tegnspire er et lille hobbyprojekt lavet med kærlighed. Det erstatter ikke sundhedsplejerske eller fagperson.</p>' +
      '</div>';
    render(html, 'om');
  }

  /* ---------- render + router ---------- */
  function render(html, tab) {
    view.innerHTML = html;
    setActiveTab(tab);
    bindGo();
  }
  function bindGo() {
    Array.prototype.forEach.call(view.querySelectorAll('[data-go]'), function (n) {
      n.addEventListener('click', function (e) {
        if (e.target.closest('a[href^="http"],button')) return;
        location.hash = n.getAttribute('data-go');
      });
    });
  }
  function setActiveTab(tab) {
    Array.prototype.forEach.call(tabbar.querySelectorAll('a'), function (a) {
      a.classList.toggle('active', a.getAttribute('data-tab') === tab);
    });
  }

  function route() {
    var h = location.hash.replace(/^#/, '') || '/ordbog';
    var qpart = '', qi = h.indexOf('?');
    if (qi > -1) { qpart = h.slice(qi + 1); h = h.slice(0, qi); }
    var parts = h.split('/').filter(Boolean); // e.g. ['tegn','spise']
    refreshChip();
    if (parts[0] === 'tegn' && parts[1]) return vTegn(parts[1]);
    if (parts[0] === 'lektion' && parts[1]) return vLektion(parts[1]);
    if (parts[0] === 'lektioner') return vLektioner();
    if (parts[0] === 'huskekort') return vHuskekort();
    if (parts[0] === 'om') return vOm();
    // default: ordbog (optionally with ?q=)
    var q = '';
    if (qpart.indexOf('q=') > -1) q = decodeURIComponent(qpart.split('q=')[1].split('&')[0]);
    return vOrdbog(q);
  }

  window.addEventListener('hashchange', route);
  refreshChip();
  route();

  /* ---------- PWA ---------- */
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', function () {
      navigator.serviceWorker.register('sw.js').catch(function () {});
    });
  }
})();
