export const MODELS = {
  box: {
    title: "Gehäuse",
    defaults: { width: 80, depth: 60, height: 24, wall: 2.4, bottom: 2.4 },
    fields: [
      ["width", "Breite", 20, 200, 1, "Außenmaß entlang der X-Achse"],
      ["depth", "Tiefe", 20, 200, 1, "Außenmaß entlang der Y-Achse"],
      ["height", "Höhe", 8, 120, 1, "Gesamthöhe des Gehäuses"],
      ["wall", "Wandstärke", 0.8, 8, 0.2, "Empfohlen: mindestens 2 × Düsendurchmesser"],
      ["bottom", "Bodenstärke", 0.8, 8, 0.2, "Stärke der geschlossenen Unterseite"]
    ]
  },
  cylinder: {
    title: "Hülse",
    defaults: { diameter: 50, height: 60, wall: 3, bottom: 2 },
    fields: [
      ["diameter", "Außendurchmesser", 10, 180, 1, "Durchmesser der äußeren Mantelfläche"],
      ["height", "Höhe", 5, 200, 1, "Gesamthöhe der Hülse"],
      ["wall", "Wandstärke", 0, 20, 0.2, "0 mm erzeugt einen massiven Zylinder"],
      ["bottom", "Bodenstärke", 0, 15, 0.2, "0 mm erzeugt ein offenes Rohr"]
    ]
  },
  bracket: {
    title: "Winkelhalter",
    defaults: { width: 70, depth: 50, height: 50, thickness: 5, hole: 6 },
    fields: [
      ["width", "Breite", 20, 180, 1, "Breite des Winkelhalters"],
      ["depth", "Schenkellänge", 15, 120, 1, "Tiefe der horizontalen Fläche"],
      ["height", "Schenkelhöhe", 15, 120, 1, "Höhe der vertikalen Fläche"],
      ["thickness", "Materialstärke", 2, 15, 0.5, "Stärke beider Schenkel"],
      ["hole", "Bohrung", 0, 20, 0.5, "Durchmesser der Befestigungsbohrungen"]
    ]
  },
  lid: {
    title: "Steckdeckel",
    defaults: { width: 80, depth: 60, thickness: 3, lip: 3, clearance: 0.4 },
    fields: [
      ["width", "Breite", 20, 200, 1, "Außenmaß des Deckels"],
      ["depth", "Tiefe", 20, 200, 1, "Außenmaß des Deckels"],
      ["thickness", "Deckelstärke", 1, 10, 0.2, "Stärke der oberen Platte"],
      ["lip", "Steckrand", 1, 12, 0.2, "Höhe des umlaufenden Randes"],
      ["clearance", "Spiel", 0, 1.5, 0.1, "Zusätzliches Spiel zur Gehäusewand"]
    ]
  },
  spacer: {
    title: "Abstandshalter",
    defaults: { outer: 14, inner: 5, height: 20, flange: 2 },
    fields: [
      ["outer", "Außendurchmesser", 5, 50, 0.5, "Durchmesser des Abstandshalters"],
      ["inner", "Schraubenloch", 1, 20, 0.5, "Durchmesser der Durchführung"],
      ["height", "Höhe", 2, 100, 1, "Abstand zwischen den Bauteilen"],
      ["flange", "Fußüberstand", 0, 8, 0.5, "Zusätzlicher Radius am Fuß"]
    ]
  },
  plate: {
    title: "Montageplatte",
    defaults: { width: 100, depth: 70, thickness: 4, hole: 5, inset: 10 },
    fields: [
      ["width", "Breite", 30, 250, 1, "Breite der Platte"],
      ["depth", "Tiefe", 30, 200, 1, "Tiefe der Platte"],
      ["thickness", "Plattenstärke", 1, 15, 0.5, "Materialstärke"],
      ["hole", "Bohrung", 0, 20, 0.5, "Durchmesser der vier Löcher"],
      ["inset", "Randabstand", 4, 35, 1, "Abstand der Löcher vom Rand"]
    ]
  },
  knob: {
    title: "Drehknopf",
    defaults: { diameter: 36, height: 18, shaft: 6, ribs: 20 },
    fields: [
      ["diameter", "Durchmesser", 15, 80, 1, "Außendurchmesser des Knopfs"],
      ["height", "Höhe", 8, 50, 1, "Gesamthöhe"],
      ["shaft", "Achsenbohrung", 2, 20, 0.5, "Durchmesser der Aufnahme"],
      ["ribs", "Rändelung", 8, 36, 1, "Anzahl der Griffrippen"]
    ]
  },
  clip: {
    title: "Kabelclip",
    defaults: { cable: 8, width: 12, wall: 2.4, opening: 5, base: 18 },
    fields: [
      ["cable", "Kabeldurchmesser", 2, 30, 0.5, "Platz für das Kabel"],
      ["width", "Clipbreite", 4, 30, 1, "Breite entlang des Kabels"],
      ["wall", "Wandstärke", 1, 6, 0.2, "Materialstärke des Clips"],
      ["opening", "Öffnung", 2, 20, 0.5, "Breite der Einführöffnung"],
      ["base", "Fußlänge", 8, 40, 1, "Länge der Montagefläche"]
    ]
  },
  wallmount: {
    title: "Wandhalter, 2-teilig",
    defaults: { width: 55, height: 65, thickness: 5, rail: 10, clearance: 0.4 },
    fields: [
      ["width", "Breite", 25, 140, 1, "Breite beider Halterteile"],
      ["height", "Höhe", 30, 160, 1, "Höhe der Wandplatte"],
      ["thickness", "Plattenstärke", 3, 12, 0.5, "Stärke der Grundplatten"],
      ["rail", "Schienenbreite", 5, 25, 0.5, "Breite der Steckschiene"],
      ["clearance", "Spiel", 0.1, 1.2, 0.1, "Spiel zwischen beiden Teilen"]
    ]
  },
  foot: {
    title: "Gerätefuß",
    defaults: { diameter: 28, height: 12, hole: 5, recess: 2 },
    fields: [
      ["diameter", "Durchmesser", 10, 80, 1, "Außendurchmesser des Fußes"],
      ["height", "Höhe", 3, 35, 1, "Gesamthöhe"],
      ["hole", "Schraubenloch", 0, 15, 0.5, "Durchmesser der Befestigung"],
      ["recess", "Vertiefung", 0, 6, 0.5, "Unterseitige Materialaussparung"]
    ]
  },
  washer: {
    title: "Unterlegscheibe",
    defaults: { outer: 24, inner: 8, height: 2 },
    fields: [
      ["outer", "Außendurchmesser", 5, 80, 0.5, "Außendurchmesser"],
      ["inner", "Innendurchmesser", 1, 50, 0.5, "Durchgangsloch"],
      ["height", "Stärke", 0.4, 15, 0.2, "Scheibenstärke"]
    ]
  },
  hook: {
    title: "Wandhaken",
    defaults: { width: 24, height: 50, reach: 42, thickness: 6 },
    fields: [
      ["width", "Breite", 10, 60, 1, "Breite des Hakens"],
      ["height", "Plattenhöhe", 25, 120, 1, "Höhe an der Wand"],
      ["reach", "Ausladung", 15, 100, 1, "Tiefe des Hakens"],
      ["thickness", "Materialstärke", 3, 15, 0.5, "Stärke von Haken und Platte"]
    ]
  },
  handle: {
    title: "Möbelgriff",
    defaults: { length: 110, depth: 28, width: 12, thickness: 8 },
    fields: [
      ["length", "Länge", 50, 220, 1, "Gesamtlänge des Griffs"],
      ["depth", "Abstand", 15, 60, 1, "Abstand zur Front"],
      ["width", "Griffbreite", 6, 30, 1, "Breite der Griffstange"],
      ["thickness", "Materialstärke", 4, 18, 0.5, "Stärke der Konstruktion"]
    ]
  },
  grommet: {
    title: "Kabeldurchführung",
    defaults: { outer: 60, inner: 45, height: 12, flange: 4 },
    fields: [
      ["outer", "Bohrungsmaß", 20, 120, 1, "Außendurchmesser des Einsatzes"],
      ["inner", "Öffnung", 10, 100, 1, "Freier Kabeldurchlass"],
      ["height", "Einstecktiefe", 4, 40, 1, "Tiefe im Tisch"],
      ["flange", "Randbreite", 1, 12, 0.5, "Überstand auf der Tischfläche"]
    ]
  },
  funnel: {
    title: "Trichter",
    defaults: { top: 80, bottom: 16, height: 55, spout: 35, wall: 2 },
    fields: [
      ["top", "Öffnung oben", 30, 180, 1, "Oberer Außendurchmesser"],
      ["bottom", "Auslauf", 5, 50, 1, "Außendurchmesser des Rohrs"],
      ["height", "Trichterhöhe", 20, 120, 1, "Höhe des Konus"],
      ["spout", "Auslauflänge", 10, 100, 1, "Länge des unteren Rohrs"],
      ["wall", "Wandstärke", 0.8, 5, 0.2, "Materialstärke"]
    ]
  },
  phone: {
    title: "Handyhalter",
    defaults: { width: 75, height: 95, depth: 80, thickness: 5, lip: 12 },
    fields: [
      ["width", "Breite", 45, 120, 1, "Breite des Ständers"],
      ["height", "Rückenhöhe", 50, 160, 1, "Auflagehöhe"],
      ["depth", "Standtiefe", 45, 140, 1, "Tiefe der Bodenplatte"],
      ["thickness", "Materialstärke", 3, 12, 0.5, "Stärke der Platten"],
      ["lip", "Vorderkante", 5, 30, 1, "Höhe der Haltekante"]
    ]
  },
  corner: {
    title: "Eckverbinder",
    defaults: { length: 45, width: 24, thickness: 5, hole: 5 },
    fields: [
      ["length", "Schenkellänge", 20, 100, 1, "Länge beider Schenkel"],
      ["width", "Breite", 12, 60, 1, "Breite des Verbinders"],
      ["thickness", "Materialstärke", 3, 15, 0.5, "Stärke der Platten"],
      ["hole", "Bohrung", 0, 15, 0.5, "Befestigungsbohrung"]
    ]
  },
  shelf: {
    title: "Regalbodenträger",
    defaults: { width: 24, depth: 110, height: 90, thickness: 7 },
    fields: [
      ["width", "Breite", 12, 60, 1, "Breite des Trägers"],
      ["depth", "Auflage", 50, 250, 1, "Tiefe der Regalauflage"],
      ["height", "Wandhöhe", 40, 200, 1, "Höhe an der Wand"],
      ["thickness", "Materialstärke", 4, 18, 0.5, "Stärke der Konstruktion"]
    ]
  },
  gridbin: {
    title: "Rasterbox",
    defaults: { width: 84, depth: 84, height: 45, wall: 2, bottom: 3 },
    fields: [
      ["width", "Breite", 42, 210, 42, "Rastermaß in 42-mm-Schritten"],
      ["depth", "Tiefe", 42, 210, 42, "Rastermaß in 42-mm-Schritten"],
      ["height", "Höhe", 20, 120, 5, "Gesamthöhe der Box"],
      ["wall", "Wandstärke", 1.2, 5, 0.2, "Stärke der Seitenwände"],
      ["bottom", "Bodenstärke", 1.2, 6, 0.2, "Stärke des Bodens"]
    ]
  },
  organizer: {
    title: "Fächerbox",
    defaults: { width: 120, depth: 80, height: 35, wall: 2, dividers: 3 },
    fields: [
      ["width", "Breite", 60, 240, 5, "Gesamtbreite"],
      ["depth", "Tiefe", 40, 180, 5, "Gesamttiefe"],
      ["height", "Höhe", 15, 100, 5, "Gesamthöhe"],
      ["wall", "Wandstärke", 1.2, 5, 0.2, "Wände und Trennstege"],
      ["dividers", "Fächer", 2, 8, 1, "Anzahl gleich großer Fächer"]
    ]
  },
  cablecomb: {
    title: "Kabelkamm",
    defaults: { cables: 6, diameter: 5, spacing: 4, thickness: 4, depth: 10 },
    fields: [
      ["cables", "Kabelanzahl", 2, 16, 1, "Anzahl der Kabelführungen"],
      ["diameter", "Kabeldurchmesser", 2, 15, 0.5, "Durchmesser je Kabel"],
      ["spacing", "Zwischenraum", 1, 10, 0.5, "Abstand zwischen Kabeln"],
      ["thickness", "Bodenstärke", 2, 10, 0.5, "Stärke unter den Öffnungen"],
      ["depth", "Tiefe", 5, 25, 1, "Tiefe des Kamms"]
    ]
  },
  adapter: {
    title: "Schlauchadapter",
    defaults: { diameter1: 32, diameter2: 20, length: 60, wall: 2.4 },
    fields: [
      ["diameter1", "Durchmesser A", 8, 100, 1, "Größere Anschlussseite"],
      ["diameter2", "Durchmesser B", 5, 90, 1, "Kleinere Anschlussseite"],
      ["length", "Länge", 20, 150, 5, "Gesamtlänge des Adapters"],
      ["wall", "Wandstärke", 1, 6, 0.2, "Materialstärke"]
    ]
  },
  pipeclamp: {
    title: "Rohrschelle",
    defaults: { diameter: 25, width: 15, wall: 3, foot: 18 },
    fields: [
      ["diameter", "Rohrdurchmesser", 8, 80, 1, "Innendurchmesser der Schelle"],
      ["width", "Breite", 6, 35, 1, "Breite entlang des Rohres"],
      ["wall", "Wandstärke", 1.5, 8, 0.5, "Stärke der Schelle"],
      ["foot", "Fußbreite", 8, 40, 1, "Breite der Montagefüße"]
    ]
  },
  bearing: {
    title: "Lagerhalter",
    defaults: { bearing: 22, width: 42, height: 38, depth: 12, base: 5 },
    fields: [
      ["bearing", "Lagersitz", 8, 60, 0.5, "Durchmesser des Kugellagers"],
      ["width", "Breite", 25, 100, 1, "Gesamtbreite"],
      ["height", "Höhe", 20, 100, 1, "Höhe der Aufnahme"],
      ["depth", "Tiefe", 6, 35, 1, "Tiefe des Halters"],
      ["base", "Bodenstärke", 3, 15, 0.5, "Montagefuß"]
    ]
  },
  servo: {
    title: "Servo-Halter",
    defaults: { width: 42, depth: 24, height: 35, wall: 3, flange: 12 },
    fields: [
      ["width", "Innenbreite", 20, 80, 1, "Platz für den Servo"],
      ["depth", "Innentiefe", 12, 60, 1, "Tiefe des Servos"],
      ["height", "Höhe", 20, 80, 1, "Höhe der Seitenwände"],
      ["wall", "Wandstärke", 2, 8, 0.5, "Materialstärke"],
      ["flange", "Montageflansch", 5, 25, 1, "Überstand der Befestigung"]
    ]
  },
  drillguide: {
    title: "Bohrschablone",
    defaults: { holes: 5, spacing: 32, hole: 5, width: 24, thickness: 5 },
    fields: [
      ["holes", "Bohrungen", 2, 12, 1, "Anzahl der Bohrungen"],
      ["spacing", "Lochabstand", 10, 64, 1, "Abstand von Mitte zu Mitte"],
      ["hole", "Bohrdurchmesser", 2, 15, 0.5, "Durchmesser der Führung"],
      ["width", "Breite", 15, 60, 1, "Breite der Schablone"],
      ["thickness", "Stärke", 3, 15, 0.5, "Führungslänge des Bohrers"]
    ]
  },
  labelholder: {
    title: "Labelhalter",
    defaults: { width: 90, height: 35, base: 35, thickness: 3, slot: 1.2 },
    fields: [
      ["width", "Breite", 40, 180, 5, "Breite des Schilds"],
      ["height", "Höhe", 20, 90, 5, "Höhe der Rückwand"],
      ["base", "Standtiefe", 15, 80, 5, "Tiefe des Fußes"],
      ["thickness", "Materialstärke", 1.5, 8, 0.5, "Stärke der Konstruktion"],
      ["slot", "Schlitzbreite", 0.5, 5, 0.1, "Platz für Karte oder Schild"]
    ]
  },
  magnetcup: {
    title: "Magnetaufnahme",
    defaults: { magnet: 10, height: 5, wall: 2, base: 2, clearance: 0.2 },
    fields: [
      ["magnet", "Magnetdurchmesser", 3, 40, 0.5, "Durchmesser des Rundmagneten"],
      ["height", "Magnethöhe", 1, 15, 0.5, "Höhe des Magneten"],
      ["wall", "Randstärke", 1, 6, 0.2, "Seitliche Materialstärke"],
      ["base", "Bodenstärke", 0.8, 6, 0.2, "Material unter dem Magneten"],
      ["clearance", "Pressspiel", -0.3, 0.8, 0.1, "Positiv für lockeren Sitz"]
    ]
  },
  kumiko: {
    title: "Kumiko-Lampe",
    defaults: { size: 120, height: 190, frame: 5, depth: 3, cell: 28, pattern: "asanoha", bottom: true, top: false },
    fields: [
      ["size", "Breite", 70, 240, 5, "Außenbreite der quadratischen Lampe"],
      ["height", "Höhe", 100, 360, 5, "Gesamthöhe der Laterne"],
      ["frame", "Rahmenbreite", 3, 12, 0.5, "Stärke der sichtbaren Rahmenleisten"],
      ["depth", "Materialtiefe", 1.5, 8, 0.5, "Tiefe der vier Seitenteile"],
      ["cell", "Mustergröße", 15, 60, 1, "Abstand der Musterelemente"],
      { key: "pattern", label: "Kumiko-Muster", help: "Stil der vier gemusterten Seiten", options: [
        ["asanoha", "Asanoha · Stern"],
        ["seigaiha", "Seigaiha · Wellen"],
        ["kikko", "Kikko · Waben"],
        ["shippo", "Shippo · Kreise"]
      ]},
      { key: "bottom", label: "Boden", help: "Geschlossene Bodenplatte mitdrucken", type: "toggle" },
      { key: "top", label: "Deckel", help: "Geschlossene Deckelplatte mitdrucken", type: "toggle" }
    ]
  },
  gridinsert: {
    title: "Gridfinity-Einsatz",
    defaults: { cols: 2, rows: 2, height: 35, kind: "bits", holes: 8 },
    fields: [
      ["cols", "Rasterbreite", 1, 5, 1, "Breite in 42-mm-Zellen"],
      ["rows", "Rastertiefe", 1, 4, 1, "Tiefe in 42-mm-Zellen"],
      ["height", "Höhe", 18, 90, 5, "Gesamthöhe des Einsatzes"],
      ["holes", "Plätze", 2, 24, 1, "Anzahl der Aufnahmen"],
      { key: "kind", label: "Einsatztyp", help: "Welche Aufnahme erzeugt wird", options: [
        ["bits", "Bits · 1/4 Zoll"],
        ["nozzles", "Düsen · M6"],
        ["cards", "SD-Karten"]
      ]}
    ]
  },
  electronics: {
    title: "Elektronikgehäuse",
    defaults: { width: 90, depth: 60, height: 28, wall: 2.4, vents: true, bosses: true },
    fields: [
      ["width", "Breite", 45, 180, 5, "Innennahe Gehäusebreite"],
      ["depth", "Tiefe", 35, 140, 5, "Innennahe Gehäusetiefe"],
      ["height", "Höhe", 14, 70, 2, "Gehäusehöhe"],
      ["wall", "Wandstärke", 1.2, 5, 0.2, "Materialstärke"],
      { key: "vents", label: "Lüftung", help: "Seitliche Lüftungsschlitze einfügen", type: "toggle" },
      { key: "bosses", label: "Schraubdome", help: "Vier Innen-Dome für Platinen", type: "toggle" }
    ]
  },
  lamppanel: {
    title: "Lampenpanel",
    defaults: { width: 120, height: 160, frame: 5, depth: 3, pattern: "holes", density: 7 },
    fields: [
      ["width", "Breite", 60, 240, 5, "Panelbreite"],
      ["height", "Höhe", 80, 320, 5, "Panelhöhe"],
      ["frame", "Rahmen", 3, 12, 0.5, "Rahmenbreite"],
      ["depth", "Tiefe", 1.5, 8, 0.5, "Materialtiefe"],
      ["density", "Dichte", 3, 14, 1, "Anzahl der Musterspalten"],
      { key: "pattern", label: "Muster", help: "Durchbruchmuster des Panels", options: [
        ["holes", "Lochfeld"],
        ["waves", "Wellen"],
        ["diagonal", "Diagonalrippen"]
      ]}
    ]
  },
  batteryholder: {
    title: "Batteriehalter",
    defaults: { cells: 6, type: "aa", wall: 2, height: 24 },
    fields: [
      ["cells", "Zellen", 2, 12, 1, "Anzahl der Batterien"],
      ["wall", "Wandstärke", 1.2, 5, 0.2, "Material zwischen den Zellen"],
      ["height", "Höhe", 10, 60, 2, "Höhe des Organizers"],
      { key: "type", label: "Batterietyp", help: "Durchmesser der Aufnahme", options: [
        ["aaa", "AAA"],
        ["aa", "AA"],
        ["18650", "18650"]
      ]}
    ]
  },
  hingebox: {
    title: "Scharnierbox",
    defaults: { width: 85, depth: 55, height: 30, wall: 2, lid: 4, hinge: 8 },
    fields: [
      ["width", "Breite", 40, 180, 5, "Außenbreite"],
      ["depth", "Tiefe", 30, 140, 5, "Außentiefe"],
      ["height", "Boxhöhe", 18, 80, 2, "Höhe des Unterteils"],
      ["wall", "Wandstärke", 1.2, 5, 0.2, "Materialstärke"],
      ["lid", "Deckelstärke", 2, 10, 0.5, "Stärke des Deckels"],
      ["hinge", "Scharnierrolle", 4, 16, 0.5, "Durchmesser der Scharnierrollen"]
    ]
  }
};
