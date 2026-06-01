/* Tegnspire — data.
 *
 * No illustrations: each sign shows a verified written how-to plus a button that
 * opens REAL video of the sign (YouTube "babytegn <ord>" + the official Ordbog
 * over Dansk Tegnsprog, tegnsprog.dk). Descriptions are cross-checked across
 * three Danish daycare sources: "Baby- og Børnetegn" af Vibeke Manniche (Sct.
 * Severin / Kerteminde Dagtilbud-Syd), Rikke Winckler (Vuggestuen Margrethevej)
 * and alt.dk/Vores Børn.
 *
 * Each sign: { id, word, cat, stage, how, tip, vq }  (vq = video-søgeord)
 */
(function () {
  'use strict';

  var SIGNS = [
    /* === STAGE 1 — de første behov === */
    { id: 'spise', word: 'Mad / spise', cat: 'mad', stage: 1, vq: 'spise',
      how: 'Saml fingerspidserne på den ene hånd og før dem op til læberne — som om du putter mad i munden.',
      tip: 'Vis det lige før og mens barnet spiser: "Skal du have MAD?"' },
    { id: 'drikke', word: 'Drikke', cat: 'mad', stage: 1, vq: 'drikke',
      how: 'Form hånden som om du holder om et glas, før den op til munden og vip — en lille drikkebevægelse.',
      tip: 'Brug det ved kop, flaske og amning: "Vil du DRIKKE?"' },
    { id: 'mere', word: 'Mere', cat: 'mad', stage: 1, vq: 'mere',
      how: 'Bank den ene hånds pegefinger ned på den modsatte, flade håndflade et par gange.',
      tip: 'Et af de mest brugte tegn — perfekt ved måltidet, når der skal MERE mad eller leg.' },
    { id: 'sove', word: 'Sove', cat: 'sovn', stage: 1, vq: 'sove',
      how: 'Læg den flade håndflade mod siden af kinden og læn hovedet lidt — som en lille pude.',
      tip: 'Brug det fast ved putning: "Nu skal du SOVE."' },
    { id: 'sut', word: 'Sut', cat: 'sovn', stage: 1, vq: 'sut',
      how: 'Peg med pegefingeren ind mod munden.',
      tip: 'Hjælper barnet med selv at bede om SUT, før gråden tager over.' },
    { id: 'ble', word: 'Ren / tør ble', cat: 'pusle', stage: 1, vq: 'ble',
      how: 'Klap med den flade hånd på numsen et par gange.',
      tip: 'Spørg før skift: "Har du en våd BLE?" — og ros den tørre ble.' },

    /* === STAGE 2 — hverdag & mennesker === */
    { id: 'faerdig', word: 'Færdig', cat: 'mad', stage: 2, vq: 'færdig',
      how: 'Stryg den ene hånd hen over den anden, flade håndflade — en lille "fejende" bevægelse.',
      tip: 'Markerer at noget er slut: "Nu er vi FÆRDIGE." Modsætningen til "mere".' },
    { id: 'vaske', word: 'Vaske hænder', cat: 'pusle', stage: 2, vq: 'vaske hænder',
      how: 'Gnid hænderne mod hinanden — som når man vasker hænder.',
      tip: 'Fast tegn før måltid og efter bleskift.' },
    { id: 'toj-paa', word: 'Tage tøj på', cat: 'pusle', stage: 2, vq: 'tage tøj på',
      how: 'Knyt hænderne og træk dem op langs siden af kroppen — fra knæene op mod maven.',
      tip: 'Brug det ved af- og påklædning, så barnet ved hvad der skal ske.' },
    { id: 'toj-af', word: 'Tage tøj af', cat: 'pusle', stage: 2, vq: 'tage tøj af',
      how: 'Knyt hænderne og skub dem ned langs siden af kroppen — fra maven ned mod knæene.',
      tip: 'Modsætningen til "tage tøj på" — vis dem gerne sammen.' },
    { id: 'mor', word: 'Mor', cat: 'mennesker', stage: 2, vq: 'mor',
      how: 'Før pegefingeren hen over panden fra venstre mod højre.',
      tip: 'Et af de første "personer" barnet kender — sig "MOR" samtidig.' },
    { id: 'far', word: 'Far', cat: 'mennesker', stage: 2, vq: 'far',
      how: 'Før pegefingeren ned ad kinden — oppefra og ned.',
      tip: 'Brug det når far kommer/går: "Der er FAR!"' },
    { id: 'hjaelp', word: 'Hjælp', cat: 'behov', stage: 2, vq: 'hjælp',
      how: 'Klap to gange med begge flade håndflader op mod brystet.',
      tip: 'Lær barnet at bede om HJÆLP i stedet for at blive frustreret.' },
    { id: 'av', word: 'Av / gør ondt', cat: 'behov', stage: 2, vq: 'av gør ondt',
      how: 'Sæt tommelfingeren under hagen og før den udad.',
      tip: 'Brug det når noget gør ondt: "Av, slog du dig?"' },
    { id: 'stop', word: 'Stop', cat: 'behov', stage: 2, vq: 'stop',
      how: 'Hold hånden strakt frem med håndfladen ud mod den anden — et roligt "stop".',
      tip: 'Godt til "nej tak / nok nu" uden konflikt: "Skal vi STOPPE?"' },
    { id: 'barnevogn', word: 'Barnevogn', cat: 'sovn', stage: 2, vq: 'barnevogn',
      how: 'Knyt hænderne som om du holder om barnevognen, og vug dem op og ned.',
      tip: 'Varsl en tur ude: "Skal vi i BARNEVOGNEN?"' },

    /* === STAGE 3 — følelser, dyr & leg === */
    { id: 'ked', word: 'Ked af det', cat: 'folelser', stage: 3, vq: 'ked af det',
      how: 'Lad pegefingrene løbe ned ad kinderne — som tårer der triller.',
      tip: 'Sæt ord på følelsen: "Er du KED af det?" Det hjælper barnet at føle sig forstået.' },
    { id: 'soed', word: 'Sød / kærlig', cat: 'folelser', stage: 3, vq: 'sød',
      how: 'Knyt hånden let og "ae" dig blidt på kinden.',
      tip: 'Vis varme og ros: "Hvor er du SØD."' },
    { id: 'bange', word: 'Bange', cat: 'folelser', stage: 3, vq: 'bange',
      how: 'Lad de flade hænder mødes hen over brystet — lidt sammenkrøbet.',
      tip: 'Anerkend følelsen: "Blev du BANGE?"' },
    { id: 'vred', word: 'Vred', cat: 'folelser', stage: 3, vq: 'vred',
      how: 'Knyt næven og hold den fast — gerne med rynket pande.',
      tip: 'Giv vreden et sprog: "Er du VRED lige nu?" Følelser må gerne sættes ord på.' },
    { id: 'hvor', word: 'Hvor er den?', cat: 'behov', stage: 3, vq: 'hvor',
      how: 'Slå ud til siderne med begge hænder, håndfladerne opad — et lille "hvor er den?".',
      tip: 'Sjovt i leg: "HVOR er bamse henne?"' },
    { id: 'kat', word: 'Kat', cat: 'dyr', stage: 3, vq: 'kat',
      how: 'Hold fingrene ud fra kinderne som kattens knurhår.',
      tip: 'Et af de sjoveste dyretegn — perfekt til billedbøger og "miav".' },
    { id: 'fugl', word: 'Fugl', cat: 'dyr', stage: 3, vq: 'fugl',
      how: 'Tryk tommel- og pegefinger sammen foran munden og luk/åbn dem som et lille næb.',
      tip: 'Pip med, når I ser FUGLE ude: "Se en FUGL!"' },
    { id: 'ko', word: 'Ko', cat: 'dyr', stage: 3, vq: 'ko',
      how: 'Sæt pegefingrene op ved siderne af hovedet som koens horn.',
      tip: 'Sig "muh" og lav tegnet — dyrelyde elsker små børn.' },
    { id: 'hund', word: 'Hund', cat: 'dyr', stage: 3, vq: 'hund',
      how: 'Knyt begge hænder og bank dem let sammen to gange foran brystet.',
      tip: 'Brug det når I møder en HUND på gåturen: "Se, en HUND — vov!"' },
    { id: 'bog', word: 'Bog / læse', cat: 'leg', stage: 3, vq: 'bog læse',
      how: 'Hold håndfladerne samlet og åbn dem som en bog der slås op.',
      tip: 'Fast tegn ved højtlæsning: "Skal vi læse en BOG?"' },
    { id: 'musik', word: 'Musik / sang', cat: 'leg', stage: 3, vq: 'musik sang',
      how: 'Løft pegefingrene og før dem frem og tilbage, som en lille dirigent.',
      tip: 'Lav tegnet når I synger eller hører MUSIK.' },
    { id: 'cykle', word: 'Cykle', cat: 'leg', stage: 3, vq: 'cykle',
      how: 'Hold hænderne knyttet og drej dem i cirkler — som to hjul der triller.',
      tip: 'Brug det før en tur: "Skal vi CYKLE en tur?"' },
    { id: 'lege', word: 'Lege', cat: 'leg', stage: 3, vq: 'lege',
      how: 'Knyt hænderne og lad dem dreje rundt om hinanden.',
      tip: 'Inviter til samvær: "Skal vi LEGE?"' }
  ];

  // category → display name + soft tile colour + accent
  var CATEGORIES = [
    { id: 'mad', name: 'Mad & drikke', bg: '#ffe7cf', ac: '#e08a36' },
    { id: 'sovn', name: 'Søvn & tryghed', bg: '#dbe8ff', ac: '#5b86c9' },
    { id: 'pusle', name: 'Bleskift & tøj', bg: '#d6efe1', ac: '#3f9e73' },
    { id: 'folelser', name: 'Følelser', bg: '#ffdbe6', ac: '#dd5f8a' },
    { id: 'behov', name: 'Behov & hverdag', bg: '#fdeecb', ac: '#cf9f2b' },
    { id: 'mennesker', name: 'Mennesker', bg: '#e7e0ff', ac: '#8268cf' },
    { id: 'dyr', name: 'Dyr', bg: '#d4efec', ac: '#349a8f' },
    { id: 'leg', name: 'Leg & verden', bg: '#ffe1d3', ac: '#e2754d' }
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
    stage: function (n) { return STAGES.filter(function (s) { return s.id === n; })[0]; },
    cat: function (id) { return CATEGORIES.filter(function (c) { return c.id === id; })[0]; }
  };
})();
