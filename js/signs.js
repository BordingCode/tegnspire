/* Tegnspire — data + original SVG sign illustrations.
 *
 * The 12 signs and their how-to descriptions are based on the Danish baby-sign
 * set "Baby- og Børnetegn" af Vibeke Manniche (as published by Sct. Severin
 * Børnehuse, ssb.aula.dk/babytegn) and Danish Sign Language. The illustrations
 * below are drawn from scratch for Tegnspire — they are a learning aid; the
 * official reference is Ordbog over Dansk Tegnsprog (tegnsprog.dk).
 */
(function () {
  'use strict';

  /* ---------- drawing helpers (original artwork) ---------- */
  var SKIN = '#f7c5a0', LINE = '#cf9b78', HAIR = '#8a5a3b',
      INK = '#3f3a36', CHEEK = '#f3a48a', SHIRT = '#86bda9', ARR = '#e9806e';

  var FACE =
    '<ellipse cx="100" cy="172" rx="56" ry="34" fill="' + SHIRT + '"/>' +
    '<circle cx="100" cy="82" r="46" fill="' + SKIN + '"/>' +
    '<path d="M57 60 q5 -31 43 -29 q38 -2 43 29 q-21 -14 -43 -11 q-22 -3 -43 11 z" fill="' + HAIR + '"/>' +
    '<circle cx="84" cy="80" r="4.5" fill="' + INK + '"/>' +
    '<circle cx="116" cy="80" r="4.5" fill="' + INK + '"/>' +
    '<circle cx="73" cy="93" r="6.5" fill="' + CHEEK + '" opacity=".7"/>' +
    '<circle cx="127" cy="93" r="6.5" fill="' + CHEEK + '" opacity=".7"/>' +
    '<path d="M89 98 q11 9 22 0" stroke="' + INK + '" stroke-width="3" fill="none" stroke-linecap="round"/>';

  function g(x, y, rot, sc, inner) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + (rot || 0) +
      ') scale(' + (sc || 1) + ')">' + inner + '</g>';
  }
  function fist(x, y, rot, sc) {
    return g(x, y, rot, sc,
      '<rect x="-15" y="-13" width="30" height="26" rx="12" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<path d="M-9 -13 v6 M0 -13 v6 M9 -13 v6" stroke="' + LINE + '" stroke-width="2" stroke-linecap="round"/>' +
      '<rect x="-22" y="0" width="13" height="7" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2" transform="rotate(-22 -15 3)"/>');
  }
  function palm(x, y, rot, sc) {
    return g(x, y, rot, sc,
      '<rect x="-16" y="-6" width="32" height="26" rx="12" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<rect x="-15" y="-26" width="7" height="24" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<rect x="-6" y="-30" width="7" height="28" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<rect x="3" y="-28" width="7" height="26" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<rect x="11" y="-23" width="7" height="21" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2"/>' +
      '<rect x="-25" y="-2" width="14" height="7" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2" transform="rotate(-28 -18 1)"/>');
  }
  function point(x, y, rot, sc) {
    return g(x, y, rot, sc,
      '<rect x="-14" y="-4" width="28" height="24" rx="11" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<rect x="-5" y="-30" width="9" height="31" rx="4.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<rect x="-22" y="2" width="13" height="7" rx="3.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2" transform="rotate(-25 -15 5)"/>');
  }
  function thumb(x, y, rot, sc) {
    return g(x, y, rot, sc,
      '<rect x="-14" y="-4" width="28" height="24" rx="11" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<rect x="-21" y="-22" width="9" height="24" rx="4.5" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5" transform="rotate(-12 -16 -10)"/>');
  }
  function pinch(x, y, rot, sc) {
    return g(x, y, rot, sc,
      '<rect x="-12" y="0" width="24" height="20" rx="10" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5"/>' +
      '<path d="M-9 3 L0 -23 L9 3 Z" fill="' + SKIN + '" stroke="' + LINE + '" stroke-width="2.5" stroke-linejoin="round"/>');
  }
  function arr(d) {
    return '<path d="' + d + '" fill="none" stroke="' + ARR + '" stroke-width="4" stroke-linecap="round" marker-end="url(#ts-arrow)"/>';
  }
  function svg(inner) {
    return '<svg viewBox="0 0 200 212" class="signart" role="img" aria-hidden="true" preserveAspectRatio="xMidYMid meet">' + inner + '</svg>';
  }

  /* ---------- the 12 signs ---------- */
  var SIGNS = [
    { id: 'spise', word: 'Mad / spise', cat: 'mad',
      how: 'Saml fingerspidserne på den ene hånd og før dem op til læberne — som om du putter mad i munden.',
      tip: 'Vis det lige før og mens barnet spiser: "Skal du have MAD?"',
      art: svg(FACE + pinch(100, 116, 0, 1) + arr('M122 126 q10 -8 3 -18')) },

    { id: 'drikke', word: 'Drikke', cat: 'mad',
      how: 'Sæt tommelfingeren op til munden og vip hånden op — som når man drikker af et glas.',
      tip: 'Brug det ved kop, flaske og amning: "Vil du DRIKKE?"',
      art: svg(FACE + thumb(104, 120, 8, 1) + arr('M120 126 q14 -6 8 -22')) },

    { id: 'mere', word: 'Mere', cat: 'mad',
      how: 'Bank den ene hånds pegefinger ned på den modsatte håndflade et par gange.',
      tip: 'Et af de mest brugte tegn — perfekt ved måltidet, når der skal MERE mad eller leg.',
      art: svg(FACE + palm(84, 150, 90, 0.95) + point(120, 142, -28, 0.95) + arr('M120 158 q-6 6 -18 4')) },

    { id: 'sove', word: 'Sove', cat: 'sovetryg',
      how: 'Læg den ene håndflade fladt mod siden af hovedet og l/læn hovedet lidt — som en lille pude.',
      tip: 'Brug det fast ved putning: "Nu skal du SOVE."',
      art: svg(FACE + palm(54, 84, 96, 0.9) +
        '<text x="142" y="58" font-size="18" fill="' + ARR + '" font-weight="700">z</text>' +
        '<text x="156" y="46" font-size="13" fill="' + ARR + '" font-weight="700">z</text>') },

    { id: 'sut', word: 'Sut', cat: 'sovetryg',
      how: 'Peg med pegefingeren op mod munden.',
      tip: 'Hjælper barnet med selv at bede om SUT, før gråden tager over.',
      art: svg(FACE + point(100, 122, 0, 0.95) + arr('M124 120 q8 -6 2 -16')) },

    { id: 'stop', word: 'Stop', cat: 'sovetryg',
      how: 'Hold hånden strakt frem med håndfladen ud mod den anden — et roligt "stop".',
      tip: 'Godt til "nej tak / nok nu" uden konflikt: "Skal vi STOPPE?"',
      art: svg(FACE + palm(100, 118, 0, 1.12) +
        '<path d="M70 110 h-8 M68 122 h-9 M130 110 h8 M132 122 h9" stroke="' + ARR + '" stroke-width="3.5" stroke-linecap="round"/>') },

    { id: 'ble', word: 'Ren / tør ble', cat: 'pusle',
      how: 'Klap med den ene hånd på numsen.',
      tip: 'Spørg før skift: "Har du en våd BLE?" — og ros den tørre ble.',
      art: svg(FACE + palm(100, 156, 178, 0.85) +
        arr('M80 150 v12') + arr('M120 150 v12')) },

    { id: 'vaske', word: 'Vaske hænder', cat: 'pusle',
      how: 'Efterlign én der vasker hænder — gnid hænderne mod hinanden.',
      tip: 'Fast tegn før måltid og efter bleskift.',
      art: svg(FACE + fist(88, 150, -12, 0.9) + fist(112, 150, 12, 0.9) +
        arr('M76 138 q-8 12 4 22') + arr('M124 162 q8 -12 -4 -22')) },

    { id: 'toj-paa', word: 'Tage tøj på', cat: 'pusle',
      how: 'Knyt hænderne og træk dem op langs siden af kroppen — fra knæene op mod maven.',
      tip: 'Brug det ved af- og påklædning, så barnet ved hvad der skal ske.',
      art: svg(FACE + fist(66, 150, 0, 0.85) + fist(134, 150, 0, 0.85) +
        arr('M60 170 V128') + arr('M140 170 V128')) },

    { id: 'toj-af', word: 'Tage tøj af', cat: 'pusle',
      how: 'Knyt hænderne og skub dem ned langs siden af kroppen — fra maven ned mod knæene.',
      tip: 'Modsætningen til "tage tøj på" — vis dem gerne sammen.',
      art: svg(FACE + fist(66, 124, 0, 0.85) + fist(134, 124, 0, 0.85) +
        arr('M60 122 V166') + arr('M140 122 V166')) },

    { id: 'mor', word: 'Mor', cat: 'mennesker',
      how: 'Før pegefingeren hen over panden fra venstre mod højre.',
      tip: 'Et af de første "personer" barnet kender — sig "MOR" samtidig.',
      art: svg(FACE + point(86, 56, 74, 0.9) + arr('M76 53 H128')) },

    { id: 'far', word: 'Far', cat: 'mennesker',
      how: 'Før pegefingeren ned ad kinden — oppefra og ned.',
      tip: 'Brug det når far kommer/går: "Der er FAR!"',
      art: svg(FACE + point(126, 84, 8, 0.9) + arr('M128 66 V104')) }
  ];

  var CATEGORIES = [
    { id: 'mad', name: 'Mad & drikke', emoji: '' },
    { id: 'sovetryg', name: 'Søvn & tryghed' },
    { id: 'pusle', name: 'Bleskift & tøj' },
    { id: 'mennesker', name: 'Mennesker' }
  ];

  var LESSONS = [
    { id: 1, title: 'De allerførste tegn',
      intro: 'Start her. Disse fire tegn dækker de øjeblikke der fylder mest i en babyhverdag — mad og søvn. Vælg ét eller to ad gangen.',
      tip: 'Vis tegnet i selve situationen (ved tallerkenen, ved sengen) og sig ordet højt samtidig. Forvent ikke at barnet svarer med det samme — der går ofte uger.',
      signs: ['spise', 'mere', 'drikke', 'sove'] },
    { id: 2, title: 'Ved måltidet',
      intro: 'Måltidet er det nemmeste sted at øve, fordi det gentager sig hver dag. Her er tegnene der gør spisning til en lille samtale.',
      tip: 'Brug kun ét tegn pr. sætning: "Vil du have MERE?" — ikke flere tegn på én gang.',
      signs: ['spise', 'drikke', 'mere', 'stop'] },
    { id: 3, title: 'Ved puslebordet',
      intro: 'Puslebordet er et fast holdepunkt i dagen. Tegnene her gør skift og påklædning mere forudsigeligt og trygt for barnet.',
      tip: 'Sig hvad der skal ske, før du gør det — så føler barnet sig med på, hvad der foregår.',
      signs: ['ble', 'vaske', 'toj-af', 'toj-paa'] },
    { id: 4, title: 'Tryghed & mennesker',
      intro: 'De sidste fire: comfort og de vigtigste personer. Nu kan barnet selv bede om sut og fortælle hvem det tænker på.',
      tip: 'Få gerne partner, bedsteforældre og dagpleje/vuggestue til at bruge de samme tegn — så taler alle "samme sprog".',
      signs: ['sut', 'sove', 'mor', 'far'] }
  ];

  var CHEATS = [
    { id: 'maaltid', title: 'Måltid', sub: 'Køkkenbordet & højstolen',
      signs: ['spise', 'drikke', 'mere', 'stop', 'sut'] },
    { id: 'sovetid', title: 'Sovetid', sub: 'Putning & ro',
      signs: ['sove', 'sut', 'stop'] },
    { id: 'pusle', title: 'Bleskift & tøj', sub: 'Puslebordet',
      signs: ['ble', 'vaske', 'toj-af', 'toj-paa'] },
    { id: 'hverdag', title: 'Hverdag & mennesker', sub: 'Resten af dagen',
      signs: ['mor', 'far', 'mere', 'stop'] }
  ];

  var METHOD = [
    { t: 'Hvornår?', d: 'Babyer kan typisk lave de første tegn selv når de er 7–10 måneder. Du kan sagtens begynde at vise tegnene tidligere — barnet samler på dem længe før det svarer.' },
    { t: 'Hver dag', d: 'Brug tegnene så ofte du kan, hver dag. Gentagelse i de samme situationer er det der virker.' },
    { t: 'Ét tegn ad gangen', d: 'Brug kun ét tegn pr. sætning, så det er tydeligt hvilket ord tegnet hører til.' },
    { t: 'Sig ordet højt', d: 'Lav altid tegnet samtidig med at du siger ordet. Tegnet erstatter ikke talen — det støtter den.' },
    { t: 'Lad det komme naturligt', d: 'Øv ikke tegn som en lektie. Lad dem komme i situationen, og følg det dit barn viser interesse for.' },
    { t: 'Vær tålmodig', d: 'Der går som regel uger før barnet selv laver et tegn. Det er helt normalt — bliv ved.' }
  ];

  window.TS = {
    SIGNS: SIGNS, CATEGORIES: CATEGORIES, LESSONS: LESSONS,
    CHEATS: CHEATS, METHOD: METHOD,
    byId: function (id) { return SIGNS.filter(function (s) { return s.id === id; })[0]; }
  };
})();
