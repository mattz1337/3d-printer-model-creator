export const MODELS = {
  box: {
    title: "Case",
    defaults: { width: 80, depth: 60, height: 24, wall: 2.4, bottom: 2.4 },
    fields: [
      ["width", "Width", 20, 200, 1, "Outer size along the X axis"],
      ["depth", "Depth", 20, 200, 1, "Outer size along the Y axis"],
      ["height", "Height", 8, 120, 1, "Overall case height"],
      ["wall", "Wall thickness", 0.8, 8, 0.2, "Recommended: at least 2x nozzle diameter"],
      ["bottom", "Bottom thickness", 0.8, 8, 0.2, "Thickness of the closed underside"]
    ]
  },
  cylinder: {
    title: "Sleeve",
    defaults: { diameter: 50, height: 60, wall: 3, bottom: 2 },
    fields: [
      ["diameter", "Outer diameter", 10, 180, 1, "Diameter of the outside surface"],
      ["height", "Height", 5, 200, 1, "Overall sleeve height"],
      ["wall", "Wall thickness", 0, 20, 0.2, "0 mm creates a solid cylinder"],
      ["bottom", "Bottom thickness", 0, 15, 0.2, "0 mm creates an open tube"]
    ]
  },
  bracket: {
    title: "Angle bracket",
    defaults: { width: 70, depth: 50, height: 50, thickness: 5, hole: 6 },
    fields: [
      ["width", "Width", 20, 180, 1, "Bracket width"],
      ["depth", "Leg length", 15, 120, 1, "Depth of the horizontal leg"],
      ["height", "Leg height", 15, 120, 1, "Height of the vertical leg"],
      ["thickness", "Material thickness", 2, 15, 0.5, "Thickness of both legs"],
      ["hole", "Hole diameter", 0, 20, 0.5, "Diameter of the mounting holes"]
    ]
  },
  lid: {
    title: "Push-fit lid",
    defaults: { width: 80, depth: 60, thickness: 3, lip: 3, clearance: 0.4 },
    fields: [
      ["width", "Width", 20, 200, 1, "Outer lid width"],
      ["depth", "Depth", 20, 200, 1, "Outer lid depth"],
      ["thickness", "Lid thickness", 1, 10, 0.2, "Thickness of the top plate"],
      ["lip", "Fit lip", 1, 12, 0.2, "Height of the perimeter lip"],
      ["clearance", "Clearance", 0, 1.5, 0.1, "Extra clearance for the case wall"]
    ]
  },
  spacer: {
    title: "Spacer",
    defaults: { outer: 14, inner: 5, height: 20, flange: 2 },
    fields: [
      ["outer", "Outer diameter", 5, 50, 0.5, "Spacer outside diameter"],
      ["inner", "Screw hole", 1, 20, 0.5, "Through-hole diameter"],
      ["height", "Height", 2, 100, 1, "Distance between parts"],
      ["flange", "Foot overhang", 0, 8, 0.5, "Extra radius at the foot"]
    ]
  },
  plate: {
    title: "Mounting plate",
    defaults: { width: 100, depth: 70, thickness: 4, hole: 5, inset: 10 },
    fields: [
      ["width", "Width", 30, 250, 1, "Plate width"],
      ["depth", "Depth", 30, 200, 1, "Plate depth"],
      ["thickness", "Plate thickness", 1, 15, 0.5, "Material thickness"],
      ["hole", "Hole diameter", 0, 20, 0.5, "Diameter of the four holes"],
      ["inset", "Edge inset", 4, 35, 1, "Distance from each hole to the edge"]
    ]
  },
  knob: {
    title: "Knurled knob",
    defaults: { diameter: 36, height: 18, shaft: 6, ribs: 20 },
    fields: [
      ["diameter", "Diameter", 15, 80, 1, "Outer knob diameter"],
      ["height", "Height", 8, 50, 1, "Overall height"],
      ["shaft", "Shaft hole", 2, 20, 0.5, "Shaft socket diameter"],
      ["ribs", "Grip ribs", 8, 36, 1, "Number of grip ribs"]
    ]
  },
  clip: {
    title: "Cable clip",
    defaults: { cable: 8, width: 12, wall: 2.4, opening: 5, base: 18 },
    fields: [
      ["cable", "Cable diameter", 2, 30, 0.5, "Space for the cable"],
      ["width", "Clip width", 4, 30, 1, "Width along the cable"],
      ["wall", "Wall thickness", 1, 6, 0.2, "Clip material thickness"],
      ["opening", "Opening", 2, 20, 0.5, "Width of the cable entry"],
      ["base", "Foot length", 8, 40, 1, "Length of the mounting foot"]
    ]
  },
  wallmount: {
    title: "Wall mount, 2-part",
    defaults: { width: 55, height: 65, thickness: 5, rail: 10, clearance: 0.4 },
    fields: [
      ["width", "Width", 25, 140, 1, "Width of both mount parts"],
      ["height", "Height", 30, 160, 1, "Wall plate height"],
      ["thickness", "Plate thickness", 3, 12, 0.5, "Base plate thickness"],
      ["rail", "Rail width", 5, 25, 0.5, "Width of the slide rail"],
      ["clearance", "Clearance", 0.1, 1.2, 0.1, "Fit clearance between both parts"]
    ]
  },
  foot: {
    title: "Device foot",
    defaults: { diameter: 28, height: 12, hole: 5, recess: 2 },
    fields: [
      ["diameter", "Diameter", 10, 80, 1, "Outer foot diameter"],
      ["height", "Height", 3, 35, 1, "Overall height"],
      ["hole", "Screw hole", 0, 15, 0.5, "Mounting screw diameter"],
      ["recess", "Recess", 0, 6, 0.5, "Material relief on the underside"]
    ]
  },
  washer: {
    title: "Washer",
    defaults: { outer: 24, inner: 8, height: 2 },
    fields: [
      ["outer", "Outer diameter", 5, 80, 0.5, "Outside diameter"],
      ["inner", "Inner diameter", 1, 50, 0.5, "Through-hole diameter"],
      ["height", "Thickness", 0.4, 15, 0.2, "Washer thickness"]
    ]
  },
  hook: {
    title: "Wall hook",
    defaults: { width: 24, height: 50, reach: 42, thickness: 6 },
    fields: [
      ["width", "Width", 10, 60, 1, "Hook width"],
      ["height", "Plate height", 25, 120, 1, "Height on the wall"],
      ["reach", "Reach", 15, 100, 1, "Hook projection depth"],
      ["thickness", "Material thickness", 3, 15, 0.5, "Thickness of the hook and plate"]
    ]
  },
  handle: {
    title: "Furniture handle",
    defaults: { length: 110, depth: 28, width: 12, thickness: 8 },
    fields: [
      ["length", "Length", 50, 220, 1, "Overall handle length"],
      ["depth", "Offset", 15, 60, 1, "Distance from the front surface"],
      ["width", "Grip width", 6, 30, 1, "Width of the grip bar"],
      ["thickness", "Material thickness", 4, 18, 0.5, "Part thickness"]
    ]
  },
  grommet: {
    title: "Cable grommet",
    defaults: { outer: 60, inner: 45, height: 12, flange: 4 },
    fields: [
      ["outer", "Cutout size", 20, 120, 1, "Outer insert diameter"],
      ["inner", "Opening", 10, 100, 1, "Free cable opening"],
      ["height", "Insert depth", 4, 40, 1, "Depth inside the desk"],
      ["flange", "Rim width", 1, 12, 0.5, "Overhang on the desk surface"]
    ]
  },
  funnel: {
    title: "Funnel",
    defaults: { top: 80, bottom: 16, height: 55, spout: 35, wall: 2 },
    fields: [
      ["top", "Top opening", 30, 180, 1, "Top outside diameter"],
      ["bottom", "Spout diameter", 5, 50, 1, "Outside diameter of the tube"],
      ["height", "Funnel height", 20, 120, 1, "Cone height"],
      ["spout", "Spout length", 10, 100, 1, "Length of the lower tube"],
      ["wall", "Wall thickness", 0.8, 5, 0.2, "Material thickness"]
    ]
  },
  phone: {
    title: "Phone stand",
    defaults: { width: 75, height: 95, depth: 80, thickness: 5, lip: 12 },
    fields: [
      ["width", "Width", 45, 120, 1, "Stand width"],
      ["height", "Back height", 50, 160, 1, "Support height"],
      ["depth", "Base depth", 45, 140, 1, "Depth of the base plate"],
      ["thickness", "Material thickness", 3, 12, 0.5, "Plate thickness"],
      ["lip", "Front lip", 5, 30, 1, "Height of the retaining lip"]
    ]
  },
  corner: {
    title: "Corner connector",
    defaults: { length: 45, width: 24, thickness: 5, hole: 5 },
    fields: [
      ["length", "Leg length", 20, 100, 1, "Length of both legs"],
      ["width", "Width", 12, 60, 1, "Connector width"],
      ["thickness", "Material thickness", 3, 15, 0.5, "Plate thickness"],
      ["hole", "Hole diameter", 0, 15, 0.5, "Mounting hole"]
    ]
  },
  shelf: {
    title: "Shelf bracket",
    defaults: { width: 24, depth: 110, height: 90, thickness: 7 },
    fields: [
      ["width", "Width", 12, 60, 1, "Bracket width"],
      ["depth", "Support depth", 50, 250, 1, "Shelf support depth"],
      ["height", "Wall height", 40, 200, 1, "Height on the wall"],
      ["thickness", "Material thickness", 4, 18, 0.5, "Part thickness"]
    ]
  },
  gridbin: {
    title: "Grid box",
    defaults: { width: 84, depth: 84, height: 45, wall: 2, bottom: 3 },
    fields: [
      ["width", "Width", 42, 210, 42, "Grid size in 42 mm steps"],
      ["depth", "Depth", 42, 210, 42, "Grid size in 42 mm steps"],
      ["height", "Height", 20, 120, 5, "Overall box height"],
      ["wall", "Wall thickness", 1.2, 5, 0.2, "Side wall thickness"],
      ["bottom", "Bottom thickness", 1.2, 6, 0.2, "Base thickness"]
    ]
  },
  organizer: {
    title: "Compartment box",
    defaults: { width: 120, depth: 80, height: 35, wall: 2, dividers: 3 },
    fields: [
      ["width", "Width", 60, 240, 5, "Overall width"],
      ["depth", "Depth", 40, 180, 5, "Overall depth"],
      ["height", "Height", 15, 100, 5, "Overall height"],
      ["wall", "Wall thickness", 1.2, 5, 0.2, "Walls and dividers"],
      ["dividers", "Compartments", 2, 8, 1, "Number of equal compartments"]
    ]
  },
  cablecomb: {
    title: "Cable comb",
    defaults: { cables: 6, diameter: 5, spacing: 4, thickness: 4, depth: 10 },
    fields: [
      ["cables", "Cable count", 2, 16, 1, "Number of cable guides"],
      ["diameter", "Cable diameter", 2, 15, 0.5, "Diameter per cable"],
      ["spacing", "Spacing", 1, 10, 0.5, "Gap between cables"],
      ["thickness", "Base thickness", 2, 10, 0.5, "Material under the openings"],
      ["depth", "Depth", 5, 25, 1, "Comb depth"]
    ]
  },
  adapter: {
    title: "Hose adapter",
    defaults: { diameter1: 32, diameter2: 20, length: 60, wall: 2.4 },
    fields: [
      ["diameter1", "Diameter A", 8, 100, 1, "Larger connector side"],
      ["diameter2", "Diameter B", 5, 90, 1, "Smaller connector side"],
      ["length", "Length", 20, 150, 5, "Overall adapter length"],
      ["wall", "Wall thickness", 1, 6, 0.2, "Material thickness"]
    ]
  },
  pipeclamp: {
    title: "Pipe clamp",
    defaults: { diameter: 25, width: 15, wall: 3, foot: 18 },
    fields: [
      ["diameter", "Pipe diameter", 8, 80, 1, "Clamp inside diameter"],
      ["width", "Width", 6, 35, 1, "Width along the pipe"],
      ["wall", "Wall thickness", 1.5, 8, 0.5, "Clamp thickness"],
      ["foot", "Foot width", 8, 40, 1, "Width of the mounting feet"]
    ]
  },
  bearing: {
    title: "Bearing holder",
    defaults: { bearing: 22, width: 42, height: 38, depth: 12, base: 5 },
    fields: [
      ["bearing", "Bearing seat", 8, 60, 0.5, "Ball bearing diameter"],
      ["width", "Width", 25, 100, 1, "Overall width"],
      ["height", "Height", 20, 100, 1, "Socket height"],
      ["depth", "Depth", 6, 35, 1, "Holder depth"],
      ["base", "Base thickness", 3, 15, 0.5, "Mounting foot thickness"]
    ]
  },
  servo: {
    title: "Servo mount",
    defaults: { width: 42, depth: 24, height: 35, wall: 3, flange: 12 },
    fields: [
      ["width", "Inner width", 20, 80, 1, "Space for the servo"],
      ["depth", "Inner depth", 12, 60, 1, "Servo depth"],
      ["height", "Height", 20, 80, 1, "Side wall height"],
      ["wall", "Wall thickness", 2, 8, 0.5, "Material thickness"],
      ["flange", "Mounting flange", 5, 25, 1, "Mounting overhang"]
    ]
  },
  drillguide: {
    title: "Drill guide",
    defaults: { holes: 5, spacing: 32, hole: 5, width: 24, thickness: 5 },
    fields: [
      ["holes", "Holes", 2, 12, 1, "Number of holes"],
      ["spacing", "Hole spacing", 10, 64, 1, "Center-to-center distance"],
      ["hole", "Drill diameter", 2, 15, 0.5, "Guide diameter"],
      ["width", "Width", 15, 60, 1, "Guide width"],
      ["thickness", "Thickness", 3, 15, 0.5, "Drill guide length"]
    ]
  },
  labelholder: {
    title: "Label holder",
    defaults: { width: 90, height: 35, base: 35, thickness: 3, slot: 1.2 },
    fields: [
      ["width", "Width", 40, 180, 5, "Label width"],
      ["height", "Height", 20, 90, 5, "Back wall height"],
      ["base", "Base depth", 15, 80, 5, "Foot depth"],
      ["thickness", "Material thickness", 1.5, 8, 0.5, "Part thickness"],
      ["slot", "Slot width", 0.5, 5, 0.1, "Space for a card or sign"]
    ]
  },
  magnetcup: {
    title: "Magnet cup",
    defaults: { magnet: 10, height: 5, wall: 2, base: 2, clearance: 0.2 },
    fields: [
      ["magnet", "Magnet diameter", 3, 40, 0.5, "Round magnet diameter"],
      ["height", "Magnet height", 1, 15, 0.5, "Magnet height"],
      ["wall", "Rim thickness", 1, 6, 0.2, "Side material thickness"],
      ["base", "Bottom thickness", 0.8, 6, 0.2, "Material under the magnet"],
      ["clearance", "Press fit", -0.3, 0.8, 0.1, "Positive values make a looser fit"]
    ]
  },
  kumiko: {
    title: "Kumiko lamp",
    defaults: { size: 120, height: 190, frame: 5, depth: 3, cell: 28, pattern: "asanoha", bottom: true, top: false },
    fields: [
      ["size", "Width", 70, 240, 5, "Outer width of the square lamp"],
      ["height", "Height", 100, 360, 5, "Overall lantern height"],
      ["frame", "Frame width", 3, 12, 0.5, "Thickness of the visible frame bars"],
      ["depth", "Material depth", 1.5, 8, 0.5, "Depth of the four side panels"],
      ["cell", "Pattern size", 15, 60, 1, "Spacing of the pattern elements"],
      { key: "pattern", label: "Kumiko pattern", help: "Style of the four patterned sides", options: [
        ["asanoha", "Asanoha - star"],
        ["seigaiha", "Seigaiha - waves"],
        ["kikko", "Kikko - honeycomb"],
        ["shippo", "Shippo - circles"]
      ]},
      { key: "bottom", label: "Bottom plate", help: "Print a closed bottom plate", type: "toggle" },
      { key: "top", label: "Top plate", help: "Print a closed top plate", type: "toggle" }
    ]
  },
  gridinsert: {
    title: "Gridfinity insert",
    defaults: { cols: 2, rows: 2, height: 35, kind: "bits", holes: 8 },
    fields: [
      ["cols", "Grid width", 1, 5, 1, "Width in 42 mm cells"],
      ["rows", "Grid depth", 1, 4, 1, "Depth in 42 mm cells"],
      ["height", "Height", 18, 90, 5, "Overall insert height"],
      ["holes", "Slots", 2, 24, 1, "Number of holders"],
      { key: "kind", label: "Insert type", help: "Which holder layout is generated", options: [
        ["bits", "Bits - 1/4 inch"],
        ["nozzles", "Nozzles - M6"],
        ["cards", "SD cards"]
      ]}
    ]
  },
  electronics: {
    title: "Electronics case",
    defaults: { width: 90, depth: 60, height: 28, wall: 2.4, vents: true, bosses: true },
    fields: [
      ["width", "Width", 45, 180, 5, "Near-inner case width"],
      ["depth", "Depth", 35, 140, 5, "Near-inner case depth"],
      ["height", "Height", 14, 70, 2, "Case height"],
      ["wall", "Wall thickness", 1.2, 5, 0.2, "Material thickness"],
      { key: "vents", label: "Vents", help: "Add side ventilation slots", type: "toggle" },
      { key: "bosses", label: "Screw bosses", help: "Add four internal PCB bosses", type: "toggle" }
    ]
  },
  lamppanel: {
    title: "Lamp panel",
    defaults: { width: 120, height: 160, frame: 5, depth: 3, pattern: "holes", density: 7 },
    fields: [
      ["width", "Width", 60, 240, 5, "Panel width"],
      ["height", "Height", 80, 320, 5, "Panel height"],
      ["frame", "Frame", 3, 12, 0.5, "Frame width"],
      ["depth", "Depth", 1.5, 8, 0.5, "Material depth"],
      ["density", "Density", 3, 14, 1, "Number of pattern columns"],
      { key: "pattern", label: "Pattern", help: "Cutout pattern for the panel", options: [
        ["holes", "Hole grid"],
        ["waves", "Waves"],
        ["diagonal", "Diagonal ribs"]
      ]}
    ]
  },
  batteryholder: {
    title: "Battery holder",
    defaults: { cells: 6, type: "aa", wall: 2, height: 24 },
    fields: [
      ["cells", "Cells", 2, 12, 1, "Number of batteries"],
      ["wall", "Wall thickness", 1.2, 5, 0.2, "Material between cells"],
      ["height", "Height", 10, 60, 2, "Organizer height"],
      { key: "type", label: "Battery type", help: "Diameter of the holder pocket", options: [
        ["aaa", "AAA"],
        ["aa", "AA"],
        ["18650", "18650"]
      ]}
    ]
  },
  hingebox: {
    title: "Hinged box",
    defaults: { width: 85, depth: 55, height: 30, wall: 2, lid: 4, hinge: 8 },
    fields: [
      ["width", "Width", 40, 180, 5, "Outer width"],
      ["depth", "Depth", 30, 140, 5, "Outer depth"],
      ["height", "Box height", 18, 80, 2, "Height of the lower part"],
      ["wall", "Wall thickness", 1.2, 5, 0.2, "Material thickness"],
      ["lid", "Lid thickness", 2, 10, 0.5, "Lid thickness"],
      ["hinge", "Hinge barrel", 4, 16, 0.5, "Diameter of the hinge barrels"]
    ]
  }
};
