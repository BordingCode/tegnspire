/* Tegnspire — data + original, ANIMATED SVG sign illustrations.
 *
 * Each sign loops a small animation that performs the actual movement (a baby
 * sign IS a movement), so arrows are no longer needed. The grid shows a calm
 * static frame; the sign's own page plays the animation.
 *
 * All signs + how-to descriptions are based on published Danish daycare babytegn
 * material, cross-checked across three independent sources: "Baby- og Børnetegn"
 * af Vibeke Manniche (Sct. Severin Børnehuse + Kerteminde Dagtilbud-Syd), Rikke
 * Winckler's oversigt (Vuggestuen Margrethevej) and alt.dk/Vores Børn. The
 * drawings are original; the official reference is tegnsprog.dk.
 */
(function () {
  'use strict';

  /* ---------- palette ---------- */
  var SKIN = '#f6c39c', SK2 = '#eab488', LINE = '#c98f66', HAIR = '#8a5a3b',
      INK = '#3f3a36', CHEEK = '#f3a48a', SHIRT = '#86bda9',
      ARR = '#e9806e', TEAR = '#6cb6e6', NAIL = '#fde2cb';

  /* ---------- face ---------- */
  function face(expr) {
    var brows = '', mouth = '';
    if (expr === 'angry') {
      brows = '<path d="M76 71 L93 77" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>' +
              '<path d="M124 71 L107 77" stroke="' + INK + '" stroke-width="3" stroke-linecap="round"/>';
      mouth = '<path d="M89 103 q11 -5 22 0" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === 'sad') {
      brows = '<path d="M79 73 q7 -4 13 -1" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>' +
              '<path d="M108 72 q7 -3 13 1" stroke="' + INK + '" stroke-width="2.6" fill="none" stroke-linecap="round"/>';
      mouth = '<path d="M89 103 q11 -8 22 0" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === 'neutral') {
      mouth = '<path d="M90 100 h20" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    } else if (expr === 'ouch') {
      mouth = '<ellipse cx="100" cy="101" rx="5.5" ry="6.5" fill="' + INK + '"/>';
    } else {
      mouth = '<path d="M89 98 q11 9 22 0" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';
    }
    return '<ellipse cx="100" cy="174" rx="58" ry="34" fill="' + SHIRT + '"/>' +
      '<circle cx="100" cy="82" r="46" fill="' + SKIN + '"/>' +
      '<path d="M57 60 q5 -31 43 -29 q38 -2 43 29 q-21 -14 -43 -11 q-22 -3 -43 11 z" fill="' + HAIR + '"/>' +
      '<circle cx="84" cy="80" r="4.5" fill="' + INK + '"/>' +
      '<circle cx="116" cy="80" r="4.5" fill="' + INK + '"/>' +
      '<circle cx="73" cy="93" r="6.5" fill="' + CHEEK + '" opacity=".7"/>' +
      '<circle cx="127" cy="93" r="6.5" fill="' + CHEEK + '" opacity=".7"/>' +
      brows + mouth;
  }

  /* ---------- hands (drawn pointing up, positioned by wrap) ---------- */
  function wrap(x, y, rot, sc, flip, inner) {
    sc = sc || 1; flip = flip || 1;
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) + ') scale(' + (flip * sc) + ' ' + sc + ')">' + inner + '</g>';
  }
  function nail(cx, cy) { return '<ellipse cx="' + cx + '" cy="' + cy + '" rx="3" ry="4" fill="' + NAIL + '"/>'; }
  function forearm() { return '<rect x="-12" y="12" width="24" height="32" rx="11" fill="' + SK2 + '" stroke="' + LINE + '" stroke-width="2.5"/>'; }
  function S(w) { return ' fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="' + (w || 2.4) + '"'; }
  function finger(cx, len, splay) {
    var top = -18 - len;
    return '<g transform="rotate(' + (splay || 0) + ' ' + cx + ' -16)">' +
      '<rect x="' + (cx - 4.5) + '" y="' + top + '" width="9" height="' + (len + 12) + '" rx="4.5"' + S(2.3) + '/>' +
      nail(cx, top + 5) + '</g>';
  }
  function palm(x, y, rot, sc, flip) {
    var f = forearm() +
      '<rect x="-17" y="-20" width="34" height="38" rx="14"' + S(2.5) + '/>' +
      finger(-12, 28, -9) + finger(-1.5, 34, -2) + finger(9, 30, 7) + finger(18.5, 23, 16) +
      '<g transform="rotate(-42 -15 6)"><rect x="-31" y="-2" width="11" height="25" rx="5.5"' + S(2.3) + '/>' + nail(-25.5, 1) + '</g>';
    return wrap(x, y, rot, sc, flip, f);
  }
  function fist(x, y, rot, sc, flip) {
    var k = [-13, -4, 5, 14], bumps = '';
    for (var i = 0; i < 4; i++) bumps += '<rect x="' + (k[i] - 4.7) + '" y="-27" width="9.4" height="19" rx="4.7"' + S(2.2) + '/>';
    var f = forearm() + bumps +
      '<rect x="-17" y="-15" width="34" height="31" rx="13"' + S(2.5) + '/>' +
      '<path d="M-15 -10 H15" stroke="' + LINE + '" stroke-width="1.7" opacity=".4"/>' +
      '<g transform="rotate(16 -8 6)"><rect x="-17" y="0" width="23" height="12" rx="6"' + S(2.3) + '/></g>';
    return wrap(x, y, rot, sc, flip, f);
  }
  function point(x, y, rot, sc, flip) {
    var k = [-4, 5, 14], bumps = '';
    for (var i = 0; i < 3; i++) bumps += '<rect x="' + (k[i] - 4.7) + '" y="-25" width="9.4" height="17" rx="4.7"' + S(2.2) + '/>';
    var f = forearm() + bumps +
      '<rect x="-17" y="-15" width="34" height="31" rx="13"' + S(2.5) + '/>' +
      '<rect x="-16.5" y="-52" width="9" height="42" rx="4.5"' + S(2.4) + '/>' + nail(-12, -47) +
      '<g transform="rotate(16 -8 6)"><rect x="-17" y="0" width="21" height="12" rx="6"' + S(2.3) + '/></g>';
    return wrap(x, y, rot, sc, flip, f);
  }
  function thumb(x, y, rot, sc, flip) {
    var k = [-13, -4, 5, 14], bumps = '';
    for (var i = 0; i < 4; i++) bumps += '<rect x="' + (k[i] - 4.7) + '" y="-23" width="9.4" height="16" rx="4.7"' + S(2.2) + '/>';
    var f = forearm() + bumps +
      '<rect x="-17" y="-15" width="34" height="31" rx="13"' + S(2.5) + '/>' +
      '<path d="M-15 -10 H15" stroke="' + LINE + '" stroke-width="1.7" opacity=".4"/>' +
      '<g transform="rotate(-20 -14 -6)"><rect x="-21" y="-36" width="11" height="32" rx="5.5"' + S(2.3) + '/>' + nail(-15.5, -31) + '</g>';
    return wrap(x, y, rot, sc, flip, f);
  }
  function pinch(x, y, rot, sc, flip) {
    var f = forearm() +
      '<rect x="-2" y="-3" width="8.2" height="15" rx="4.1"' + S(2) + '/>' +
      '<rect x="6" y="-2" width="7.6" height="13" rx="3.8"' + S(2) + '/>' +
      '<rect x="-13" y="0" width="27" height="20" rx="10"' + S(2.5) + '/>' +
      '<rect x="-7.5" y="-30" width="8.4" height="34" rx="4.2"' + S(2.3) + ' transform="rotate(12 -3.3 3)"/>' +
      '<rect x="-1.3" y="-30" width="8.4" height="34" rx="4.2"' + S(2.3) + ' transform="rotate(-15 2.9 3)"/>' +
      '<circle cx="-0.5" cy="-29" r="4" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2"/>';
    return wrap(x, y, rot, sc, flip, f);
  }

  /* ---------- animation helpers (SMIL, loop forever) ---------- */
  function osc(inner, type, vals, dur) {
    return '<g>' + inner + '<animateTransform attributeName="transform" type="' + type + '" values="' + vals + '" dur="' + dur + 's" repeatCount="indefinite" calcMode="spline" keyTimes="0;0.5;1" keySplines="0.4 0 0.6 1;0.4 0 0.6 1"/></g>';
  }
  function tap(inner, type, vals, dur) { // quick double-beat then rest
    return '<g>' + inner + '<animateTransform attributeName="transform" type="' + type + '" values="' + vals + '" keyTimes="0;0.12;0.24;0.36;1" dur="' + dur + 's" repeatCount="indefinite"/></g>';
  }
  function spin(inner, cx, cy, dur, dir) {
    var v = dir < 0 ? '360 ' + cx + ' ' + cy + ';0 ' + cx + ' ' + cy : '0 ' + cx + ' ' + cy + ';360 ' + cx + ' ' + cy;
    return '<g>' + inner + '<animateTransform attributeName="transform" type="rotate" values="' + v + '" dur="' + dur + 's" repeatCount="indefinite"/></g>';
  }
  function tear(cx, cy, dur, begin) {
    return '<circle cx="' + cx + '" cy="' + cy + '" r="2.8" fill="' + TEAR + '">' +
      '<animate attributeName="cy" values="' + cy + ';' + (cy + 28) + '" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/>' +
      '<animate attributeName="opacity" values="1;1;0" dur="' + dur + 's" begin="' + begin + 's" repeatCount="indefinite"/></circle>';
  }
  // animate the head/upper body so the WHOLE figure performs the sign
  function head(inner, vals, dur, type) {
    type = type || 'rotate';
    return '<g>' + inner + '<animateTransform attributeName="transform" type="' + type + '" values="' + vals + '" dur="' + dur + 's" repeatCount="indefinite"/></g>';
  }
  function svg(inner) {
    // gentle whole-body "alive" bob wrapping every sign
    return '<svg viewBox="0 0 200 212" class="signart" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">' +
      '<g>' + inner + '<animateTransform attributeName="transform" type="translate" values="0 0;0 1.6;0 0" dur="3.4s" repeatCount="indefinite"/></g></svg>';
  }

  /* ---------- the signs ---------- */
  var SIGNS = [
    /* === STAGE 1 — de første behov === */
    { id: 'spise', word: 'Mad / spise', cat: 'mad', stage: 1,
      how: 'Saml fingerspidserne på den ene hånd og før dem op til læberne — som om du putter mad i munden.',
      tip: 'Vis det lige før og mens barnet spiser: "Skal du have MAD?"',
      art: svg(head(face(), '0 0;0 3;0 0', 1.4, 'translate') + osc(pinch(110, 150, -20, 0.96), 'translate', '0 7;0 -3;0 7', 1.4)) },
    { id: 'drikke', word: 'Drikke', cat: 'mad', stage: 1,
      how: 'Form hånden som om du holder om et glas, før den op til munden og vip — en lille drikkebevægelse.',
      tip: 'Brug det ved kop, flaske og amning: "Vil du DRIKKE?"',
      art: svg(head(face(), '0 100 152;7 100 152;0 100 152', 1.6) + osc(thumb(112, 150, 12, 0.9), 'rotate', '0 110 118;-22 110 118;0 110 118', 1.6)) },
    { id: 'mere', word: 'Mere', cat: 'mad', stage: 1,
      how: 'Bank den ene hånds pegefinger ned på den modsatte, flade håndflade et par gange.',
      tip: 'Et af de mest brugte tegn — perfekt ved måltidet, når der skal MERE mad eller leg.',
      art: svg(face() + palm(80, 156, 84, 0.78) + tap(point(124, 132, -118, 0.74), 'translate', '0 0;-4 7;0 0;-4 7;0 0', 1.5)) },
    { id: 'sove', word: 'Sove', cat: 'sovn', stage: 1,
      how: 'Læg den flade håndflade mod siden af kinden og læn hovedet lidt — som en lille pude.',
      tip: 'Brug det fast ved putning: "Nu skal du SOVE."',
      art: svg(head(face(), '0 100 152;-13 100 152;0 100 152', 2.6) + palm(50, 96, 108, 0.82) +
        '<g fill="' + ARR + '" font-weight="700"><animateTransform attributeName="transform" type="translate" values="0 6;0 -10" dur="2.4s" repeatCount="indefinite"/><animate attributeName="opacity" values="0;1;0" dur="2.4s" repeatCount="indefinite"/><text x="138" y="58" font-size="18">z</text><text x="152" y="46" font-size="13">z</text></g>') },
    { id: 'sut', word: 'Sut', cat: 'sovn', stage: 1,
      how: 'Peg med pegefingeren ind mod munden.',
      tip: 'Hjælper barnet med selv at bede om SUT, før gråden tager over.',
      art: svg(face() + osc(point(108, 168, -8, 0.82), 'translate', '0 0;0 -6;0 0', 1.3)) },
    { id: 'ble', word: 'Ren / tør ble', cat: 'pusle', stage: 1,
      how: 'Klap med den flade hånd på numsen et par gange.',
      tip: 'Spørg før skift: "Har du en våd BLE?" — og ros den tørre ble.',
      art: svg(face() + tap(palm(100, 150, 180, 0.78), 'translate', '0 0;0 7;0 0;0 7;0 0', 1.4)) },

    /* === STAGE 2 — hverdag & mennesker === */
    { id: 'faerdig', word: 'Færdig', cat: 'mad', stage: 2,
      how: 'Stryg den ene hånd hen over den anden, flade håndflade — en lille "fejende" bevægelse.',
      tip: 'Markerer at noget er slut: "Nu er vi FÆRDIGE." Modsætningen til "mere".',
      art: svg(face() + palm(78, 158, 84, 0.74) + osc(palm(108, 150, 60, 0.7), 'translate', '-14 4;22 -4;-14 4', 1.8)) },
    { id: 'vaske', word: 'Vaske hænder', cat: 'pusle', stage: 2,
      how: 'Gnid hænderne mod hinanden — som når man vasker hænder.',
      tip: 'Fast tegn før måltid og efter bleskift.',
      art: svg(face() + osc(fist(86, 152, -14, 0.82), 'rotate', '0 86 152;18 86 152;0 86 152', 0.7) +
        osc(fist(114, 152, 14, 0.82), 'rotate', '0 114 152;-18 114 152;0 114 152', 0.7)) },
    { id: 'toj-paa', word: 'Tage tøj på', cat: 'pusle', stage: 2,
      how: 'Knyt hænderne og træk dem op langs siden af kroppen — fra knæene op mod maven.',
      tip: 'Brug det ved af- og påklædning, så barnet ved hvad der skal ske.',
      art: svg(face() + osc(fist(64, 152, 0, 0.78), 'translate', '0 16;0 -16;0 16', 1.7) +
        osc(fist(136, 152, 0, 0.78), 'translate', '0 16;0 -16;0 16', 1.7)) },
    { id: 'toj-af', word: 'Tage tøj af', cat: 'pusle', stage: 2,
      how: 'Knyt hænderne og skub dem ned langs siden af kroppen — fra maven ned mod knæene.',
      tip: 'Modsætningen til "tage tøj på" — vis dem gerne sammen.',
      art: svg(face() + osc(fist(64, 138, 0, 0.78), 'translate', '0 -16;0 16;0 -16', 1.7) +
        osc(fist(136, 138, 0, 0.78), 'translate', '0 -16;0 16;0 -16', 1.7)) },
    { id: 'mor', word: 'Mor', cat: 'mennesker', stage: 2,
      how: 'Før pegefingeren hen over panden fra venstre mod højre.',
      tip: 'Et af de første "personer" barnet kender — sig "MOR" samtidig.',
      art: svg(face() + osc(point(82, 118, 96, 0.78), 'translate', '0 0;32 0;0 0', 1.7)) },
    { id: 'far', word: 'Far', cat: 'mennesker', stage: 2,
      how: 'Før pegefingeren ned ad kinden — oppefra og ned.',
      tip: 'Brug det når far kommer/går: "Der er FAR!"',
      art: svg(face() + osc(point(150, 104, 26, 0.78), 'translate', '0 -16;0 20;0 -16', 1.6)) },
    { id: 'hjaelp', word: 'Hjælp', cat: 'behov', stage: 2,
      how: 'Klap to gange med begge flade håndflader op mod brystet.',
      tip: 'Lær barnet at bede om HJÆLP i stedet for at blive frustreret.',
      art: svg(face('neutral') + tap(palm(80, 162, 12, 0.7), 'translate', '0 0;0 -9;0 0;0 -9;0 0', 1.6) +
        tap(palm(120, 162, -12, 0.7), 'translate', '0 0;0 -9;0 0;0 -9;0 0', 1.6)) },
    { id: 'av', word: 'Av / gør ondt', cat: 'behov', stage: 2,
      how: 'Sæt tommelfingeren under hagen og før den udad.',
      tip: 'Brug det når noget gør ondt: "Av, slog du dig?"',
      art: svg(head(face('ouch'), '0 100 150;6 100 150;0 100 150;-4 100 150;0 100 150', 1.4) + osc(thumb(104, 150, -22, 0.8), 'translate', '0 0;-11 7;0 0', 1.4)) },
    { id: 'stop', word: 'Stop', cat: 'behov', stage: 2,
      how: 'Hold hånden strakt frem med håndfladen ud mod den anden — et roligt "stop".',
      tip: 'Godt til "nej tak / nok nu" uden konflikt: "Skal vi STOPPE?"',
      art: svg(face() + osc(palm(100, 150, 0, 0.96), 'translate', '0 5;0 -3;0 5', 1.1)) },
    { id: 'barnevogn', word: 'Barnevogn', cat: 'sovn', stage: 2,
      how: 'Knyt hænderne som om du holder om barnevognen, og vug dem op og ned.',
      tip: 'Varsl en tur ude: "Skal vi i BARNEVOGNEN?"',
      art: svg(face() + osc(fist(78, 152, 0, 0.8), 'translate', '0 -6;0 7;0 -6', 1.0) +
        osc(fist(122, 152, 0, 0.8), 'translate', '0 -6;0 7;0 -6', 1.0)) },

    /* === STAGE 3 — følelser, dyr & leg === */
    { id: 'ked', word: 'Ked af det', cat: 'folelser', stage: 3,
      how: 'Lad pegefingrene løbe ned ad kinderne — som tårer der triller.',
      tip: 'Sæt ord på følelsen: "Er du KED af det?" Det hjælper barnet at føle sig forstået.',
      art: svg(head(face('sad'), '0 0;0 5;0 0', 1.7, 'translate') + osc(point(74, 76, 178, 0.56), 'translate', '0 -6;0 10;0 -6', 1.7) +
        osc(point(126, 76, 178, 0.56, -1), 'translate', '0 -6;0 10;0 -6', 1.7) +
        tear(70, 100, 1.7, 0) + tear(130, 100, 1.7, 0.85)) },
    { id: 'soed', word: 'Sød / kærlig', cat: 'folelser', stage: 3,
      how: 'Knyt hånden let og "ae" dig blidt på kinden.',
      tip: 'Vis varme og ros: "Hvor er du SØD."',
      art: svg(face() + osc(fist(150, 104, 18, 0.78), 'translate', '0 -6;0 6;0 -6', 1.4)) },
    { id: 'bange', word: 'Bange', cat: 'folelser', stage: 3,
      how: 'Lad de flade hænder mødes hen over brystet — lidt sammenkrøbet.',
      tip: 'Anerkend følelsen: "Blev du BANGE?"',
      art: svg(head(face('sad'), '0 0;0 4;0 0', 1.5, 'translate') + osc(palm(88, 150, 128, 0.7), 'translate', '0 0;9 0;0 0', 1.5) +
        osc(palm(112, 150, -128, 0.7, -1), 'translate', '0 0;-9 0;0 0', 1.5)) },
    { id: 'vred', word: 'Vred', cat: 'folelser', stage: 3,
      how: 'Knyt næven og hold den fast — gerne med rynket pande.',
      tip: 'Giv vreden et sprog: "Er du VRED lige nu?" Følelser må gerne sættes ord på.',
      art: svg(head(face('angry'), '-2 100 152;2 100 152;-2 100 152', 0.45) + osc(fist(100, 152, 0, 0.92), 'rotate', '-6 100 152;6 100 152;-6 100 152', 0.45)) },
    { id: 'hvor', word: 'Hvor er den?', cat: 'behov', stage: 3,
      how: 'Slå ud til siderne med begge hænder, håndfladerne opad — et lille "hvor er den?".',
      tip: 'Sjovt i leg: "HVOR er bamse henne?"',
      art: svg(face('neutral') + osc(palm(66, 150, -118, 0.7), 'translate', '0 0;-11 0;0 0', 1.6) +
        osc(palm(134, 150, 118, 0.7, -1), 'translate', '0 0;11 0;0 0', 1.6)) },
    { id: 'kat', word: 'Kat', cat: 'dyr', stage: 3,
      how: 'Hold fingrene ud fra kinderne som kattens knurhår.',
      tip: 'Et af de sjoveste dyretegn — perfekt til billedbøger og "miav".',
      art: svg(face() + osc(pinch(60, 118, 84, 0.6), 'translate', '0 0;-4 0;0 0', 1.6) +
        osc(pinch(140, 118, -84, 0.6, -1), 'translate', '0 0;4 0;0 0', 1.6) +
        '<path d="M86 99 H64 M86 105 H64 M114 99 H136 M114 105 H136" stroke="' + ARR + '" stroke-width="2.6" stroke-linecap="round"/>') },
    { id: 'fugl', word: 'Fugl', cat: 'dyr', stage: 3,
      how: 'Tryk tommel- og pegefinger sammen foran munden og luk/åbn dem som et lille næb.',
      tip: 'Pip med, når I ser FUGLE ude: "Se en FUGL!"',
      art: svg(face() + osc(pinch(118, 142, -66, 0.82), 'rotate', '0 118 142;-14 118 142;0 118 142', 0.7)) },
    { id: 'ko', word: 'Ko', cat: 'dyr', stage: 3,
      how: 'Sæt pegefingrene op ved siderne af hovedet som koens horn.',
      tip: 'Sig "muh" og lav tegnet — dyrelyde elsker små børn.',
      art: svg(head(face(), '0 0;0 4;0 0', 1.2, 'translate') + osc(point(58, 78, -26, 0.74), 'translate', '0 0;0 -5;0 0', 1.2) +
        osc(point(142, 78, 26, 0.74, -1), 'translate', '0 0;0 -5;0 0', 1.2)) },
    { id: 'hund', word: 'Hund', cat: 'dyr', stage: 3,
      how: 'Knyt begge hænder og bank dem let sammen to gange foran brystet.',
      tip: 'Brug det når I møder en HUND på gåturen: "Se, en HUND — vov!"',
      art: svg(head(face(), '0 0;0 3;0 0', 0.7, 'translate') + tap(fist(82, 152, 0, 0.8), 'translate', '0 0;9 0;0 0;9 0;0 0', 1.4) +
        tap(fist(118, 152, 0, 0.8), 'translate', '0 0;-9 0;0 0;-9 0;0 0', 1.4)) },
    { id: 'bog', word: 'Bog / læse', cat: 'leg', stage: 3,
      how: 'Hold håndfladerne samlet og åbn dem som en bog der slås op.',
      tip: 'Fast tegn ved højtlæsning: "Skal vi læse en BOG?"',
      art: svg(face() + osc(palm(80, 150, 150, 0.72), 'rotate', '0 100 152;-24 100 152;0 100 152', 1.8) +
        osc(palm(120, 150, -150, 0.72, -1), 'rotate', '0 100 152;24 100 152;0 100 152', 1.8)) },
    { id: 'musik', word: 'Musik / sang', cat: 'leg', stage: 3,
      how: 'Løft pegefingrene og før dem frem og tilbage, som en lille dirigent.',
      tip: 'Lav tegnet når I synger eller hører MUSIK.',
      art: svg(head(face(), '-3 100 152;3 100 152;-3 100 152', 1.1) + osc(point(80, 146, -18, 0.74), 'translate', '-7 0;7 0;-7 0', 1.1) +
        osc(point(120, 146, 18, 0.74, -1), 'translate', '7 0;-7 0;7 0', 1.1)) },
    { id: 'cykle', word: 'Cykle', cat: 'leg', stage: 3,
      how: 'Hold hænderne knyttet og drej dem i cirkler — som to hjul der triller.',
      tip: 'Brug det før en tur: "Skal vi CYKLE en tur?"',
      art: svg(face() + spin(fist(80, 152, 0, 0.74), 80, 152, 1.3, 1) + spin(fist(120, 152, 0, 0.74), 120, 152, 1.3, 1)) },
    { id: 'lege', word: 'Lege', cat: 'leg', stage: 3,
      how: 'Knyt hænderne og lad dem dreje rundt om hinanden.',
      tip: 'Inviter til samvær: "Skal vi LEGE?"',
      art: svg(face() + spin(fist(86, 151, 0, 0.72) + fist(114, 151, 0, 0.72), 100, 151, 2.0, 1)) }
  ];

  var CATEGORIES = [
    { id: 'mad', name: 'Mad & drikke' },
    { id: 'sovn', name: 'Søvn & tryghed' },
    { id: 'pusle', name: 'Bleskift & tøj' },
    { id: 'folelser', name: 'Følelser' },
    { id: 'behov', name: 'Behov & hverdag' },
    { id: 'mennesker', name: 'Mennesker' },
    { id: 'dyr', name: 'Dyr' },
    { id: 'leg', name: 'Leg & verden' }
  ];

  var STAGES = [
    { id: 1, label: 'ca. 6–9 mdr.', title: 'De første behov',
      desc: 'Begynd her. De helt konkrete øjeblikke barnet møder mange gange hver dag — mad, søvn, sut og ble. Iconiske tegn der ligner det de betyder, så de er nemmest at forstå først.' },
    { id: 2, label: 'ca. 9–12 mdr.', title: 'Hverdag & mennesker',
      desc: 'Barnet forstår nu meget mere. Tilføj rutiner, de første "jeg vil gerne"-tegn (hjælp, stop, av) og de vigtigste personer (mor, far).' },
    { id: 3, label: 'ca. 12–18 mdr.', title: 'Følelser, dyr & leg',
      desc: 'Med mere sprog og forståelse kommer de lidt mere abstrakte tegn: følelser, dyr og leg. Sjove tegn med masser af anledninger i bøger, sange og på tur.' }
  ];

  var LESSONS = [
    { id: 1, title: 'De allerførste tegn',
      intro: 'Start her. Disse fire tegn dækker de øjeblikke der fylder mest i en babyhverdag — mad og søvn. Vælg ét eller to ad gangen.',
      tip: 'Vis tegnet i selve situationen (ved tallerkenen, ved sengen) og sig ordet højt samtidig. Forvent ikke at barnet svarer med det samme — der går ofte uger.',
      signs: ['spise', 'mere', 'drikke', 'sove'] },
    { id: 2, title: 'Ved måltidet',
      intro: 'Måltidet er det nemmeste sted at øve, fordi det gentager sig hver dag. Her er tegnene der gør spisning til en lille samtale.',
      tip: 'Brug kun ét tegn pr. sætning: "Vil du have MERE?" — ikke flere tegn på én gang.',
      signs: ['spise', 'drikke', 'mere', 'faerdig', 'sut'] },
    { id: 3, title: 'Ved puslebordet',
      intro: 'Puslebordet er et fast holdepunkt i dagen. Tegnene her gør skift og påklædning mere forudsigeligt og trygt for barnet.',
      tip: 'Sig hvad der skal ske, før du gør det — så føler barnet sig med på, hvad der foregår.',
      signs: ['ble', 'vaske', 'toj-af', 'toj-paa'] },
    { id: 4, title: 'Følelser',
      intro: 'Babytegn er ikke kun praktiske — de giver barnet et sprog for følelser, længe før ordene kommer. At blive forstået dæmper frustration.',
      tip: 'Anerkend følelsen i stedet for at fjerne den: "Jeg kan godt se, du er KED af det." Det er nok i sig selv.',
      signs: ['ked', 'soed', 'bange', 'vred'] },
    { id: 5, title: 'Behov & de vigtigste mennesker',
      intro: 'Nu kan barnet bede om hjælp, sige av og fortælle hvem det tænker på. De helt centrale "jeg vil gerne"-tegn.',
      tip: 'Få gerne partner, bedsteforældre og dagpleje/vuggestue til at bruge de samme tegn — så taler alle "samme sprog".',
      signs: ['hjaelp', 'av', 'hvor', 'stop', 'mor', 'far'] },
    { id: 6, title: 'Dyr',
      intro: 'Dyretegn er sjove og motiverende — de dukker op i billedbøger, sange og på gåturen, så der er masser af anledninger.',
      tip: 'Kombiner tegnet med dyrelyden ("vov", "muh", "miav"). Lyd + tegn + ord fanger barnet bedst.',
      signs: ['hund', 'kat', 'fugl', 'ko'] },
    { id: 7, title: 'Leg & verden',
      intro: 'De sidste tegn handler om det sjove: bøger, musik, cykelture og leg. Hverdagens gode stunder får deres eget tegn.',
      tip: 'Brug tegnene som invitationer: "Skal vi LEGE?", "Skal vi læse en BOG?" — så bliver de en del af rutinerne.',
      signs: ['bog', 'musik', 'cykle', 'lege', 'barnevogn'] }
  ];

  var CHEATS = [
    { id: 'maaltid', title: 'Måltid', sub: 'Køkkenbordet & højstolen', signs: ['spise', 'drikke', 'mere', 'faerdig', 'stop'] },
    { id: 'sovetid', title: 'Sovetid', sub: 'Putning & ro', signs: ['sove', 'sut', 'barnevogn', 'stop'] },
    { id: 'pusle', title: 'Bleskift & tøj', sub: 'Puslebordet', signs: ['ble', 'vaske', 'toj-af', 'toj-paa'] },
    { id: 'folelser', title: 'Følelser', sub: 'Når det er svært', signs: ['ked', 'soed', 'bange', 'vred', 'av'] },
    { id: 'dyr', title: 'Dyr', sub: 'Bøger & gåtur', signs: ['hund', 'kat', 'fugl', 'ko'] },
    { id: 'leg', title: 'Leg & mennesker', sub: 'Resten af dagen', signs: ['bog', 'musik', 'cykle', 'lege', 'hjaelp', 'hvor', 'mor', 'far'] }
  ];

  var METHOD = [
    { t: 'Hvornår?', d: 'Babyer kan typisk lave de første tegn selv når de er 6–10 måneder. Du kan sagtens begynde at vise tegnene tidligere — barnet samler på dem længe før det svarer. Se "Efter alder" i ordbogen.' },
    { t: 'Start med få', d: 'Begynd med 5–6 tegn for overskuelighedens skyld, og øg gradvist i det tempo, du selv kan følge med i.' },
    { t: 'Hver dag', d: 'Brug tegnene så ofte du kan, hver dag. Gentagelse i de samme situationer er det der virker.' },
    { t: 'Ét tegn ad gangen', d: 'Brug kun ét tegn pr. sætning, så det er tydeligt hvilket ord tegnet hører til.' },
    { t: 'Sig ordet højt', d: 'Lav altid tegnet samtidig med at du siger ordet. Tegnet erstatter ikke talen — det støtter den.' },
    { t: 'Lad det komme naturligt', d: 'Øv ikke tegn som en lektie. Lad dem komme i situationen, og følg det dit barn viser interesse for.' },
    { t: 'Vær tålmodig', d: 'Der går som regel 1–2 måneder før barnet selv laver et tegn. Det er helt normalt — bliv ved. Alle børn er forskellige.' }
  ];

  window.TS = {
    SIGNS: SIGNS, CATEGORIES: CATEGORIES, STAGES: STAGES, LESSONS: LESSONS,
    CHEATS: CHEATS, METHOD: METHOD,
    byId: function (id) { return SIGNS.filter(function (s) { return s.id === id; })[0]; },
    stage: function (n) { return STAGES.filter(function (s) { return s.id === n; })[0]; }
  };
})();
