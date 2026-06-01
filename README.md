# Tegnspire 🌱

Et lille, hyggeligt website der hjælper danske forældre med at lære **babytegn** —
enkle håndtegn man bruger sammen med talen, så barnet kan "sige" fx *mere*, *mælk*
eller *sove*, før det kan tale.

Privat hobbyprojekt. Bygget som en statisk PWA (virker offline, kan installeres på
telefonen). Ingen build, ingen afhængigheder — bare HTML, CSS og vanilla JavaScript.

## Indhold
- **Ordbog** — 12 danske babytegn sorteret efter hverdagens situationer, med egne
  håndtegnede illustrationer (SVG) og en kort "sådan gør du".
- **Lektioner** — fire små trin der tager de vigtigste tegn ét ad gangen, med
  fremgang gemt lokalt på telefonen.
- **Huskekort** — printbare oversigter til køleskabet (måltid, sovetid, bleskift…).
- **Om** — metoden bag babytegn + kilder.

## Kilder & troværdighed
Tegnene er danske babytegn baseret på **“Baby- og Børnetegn” af Vibeke Manniche**
(som udgivet af Sct. Severin Børnehuse) og dansk tegnsprog. Illustrationerne er
tegnet fra bunden til Tegnspire som en huskestøtte — det officielle opslagsværk er
[Ordbog over Dansk Tegnsprog (tegnsprog.dk)](https://tegnsprog.dk/).

Tegnspire erstatter ikke sundhedsplejerske eller fagperson.

## Kør lokalt
```bash
python3 -m http.server 8731
# åbn http://localhost:8731
```

## Filer
- `index.html` — app-skal + navigation
- `css/styles.css` — design (varmt, roligt, mobil-først) + print-styles til huskekort
- `js/signs.js` — alle tegn, kategorier, lektioner, huskekort + SVG-illustrationer
- `js/app.js` — router, visninger og fremgang (localStorage)
- `sw.js` + `manifest.webmanifest` — offline / installerbar app

## Tilføj flere tegn
Hvert tegn ligger i `SIGNS`-listen i `js/signs.js`. Tilføj et objekt med `id`,
`word`, `cat`, `how`, `tip` og `art` (SVG bygget af hjælpe­funktionerne i toppen af
filen). Verificér altid et nyt tegn mod tegnsprog.dk før det tilføjes.
