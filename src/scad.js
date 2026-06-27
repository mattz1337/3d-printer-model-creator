export function scadSource(currentModel, values) {
  const stamp = new Date().toISOString().slice(0, 10);
  if (currentModel === "box") {
    const { width:w, depth:d, height:h, wall, bottom } = values;
    return `// Formwerk Gehäuse — ${stamp}\n// Maße in Millimetern\n\nwidth = ${w};\ndepth = ${d};\nheight = ${h};\nwall = ${wall};\nbottom = ${bottom};\n\nunion() {\n  cube([width, depth, bottom]);\n  translate([0, 0, bottom]) {\n    cube([width, wall, height-bottom]);\n    translate([0, depth-wall, 0]) cube([width, wall, height-bottom]);\n    cube([wall, depth, height-bottom]);\n    translate([width-wall, 0, 0]) cube([wall, depth, height-bottom]);\n  }\n}\n`;
  }
  if (currentModel === "cylinder") {
    const { diameter, height, wall, bottom } = values;
    if (wall <= 0) return `// Formwerk Zylinder — ${stamp}\n$fn = 128;\ndiameter = ${diameter};\nheight = ${height};\n\ncylinder(d=diameter, h=height);\n`;
    return `// Formwerk Hülse — ${stamp}\n$fn = 128;\ndiameter = ${diameter};\nheight = ${height};\nwall = ${wall};\nbottom = ${bottom};\n\ndifference() {\n  cylinder(d=diameter, h=height);\n  translate([0, 0, bottom]) cylinder(d=diameter-2*wall, h=height-bottom+0.01);\n}\n`;
  }
  if (currentModel === "bracket") {
    const { width:w, depth:d, height:h, thickness:t, hole } = values;
    return `// Formwerk Winkelhalter — ${stamp}\n$fn = 64;\nwidth = ${w};\ndepth = ${d};\nheight = ${h};\nthickness = ${t};\nhole = ${hole};\n\ndifference() {\n  union() {\n    cube([width, depth, thickness]);\n    cube([width, thickness, height]);\n  }\n  if (hole > 0) {\n    for (x = [width/4, width*3/4]) {\n      translate([x, depth/2, -0.01]) cylinder(d=hole, h=thickness+0.02);\n      translate([x, -0.01, height/2]) rotate([-90,0,0]) cylinder(d=hole, h=thickness+0.02);\n    }\n  }\n}\n`;
  }
  if (currentModel === "lid") {
    const { width, depth, thickness, lip, clearance } = values;
    return `// Formwerk Steckdeckel — ${stamp}\nwidth=${width}; depth=${depth}; thickness=${thickness}; lip=${lip}; clearance=${clearance}; wall=2.4;\n\nunion() {\n  translate([0,0,lip]) cube([width,depth,thickness]);\n  difference() {\n    cube([width-2*clearance,depth-2*clearance,lip]);\n    translate([wall,wall,-0.01]) cube([width-2*clearance-2*wall,depth-2*clearance-2*wall,lip+0.02]);\n  }\n}\n`;
  }
  if (currentModel === "spacer") {
    const { outer, inner, height, flange } = values;
    return `// Formwerk Abstandshalter — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height}; flange=${flange};\n\ndifference() {\n  union() { cylinder(d=outer,h=height); cylinder(d=outer+2*flange,h=2); }\n  translate([0,0,-0.01]) cylinder(d=inner,h=height+0.02);\n}\n`;
  }
  if (currentModel === "plate") {
    const { width, depth, thickness, hole, inset } = values;
    return `// Formwerk Montageplatte — ${stamp}\n$fn=64; width=${width}; depth=${depth}; thickness=${thickness}; hole=${hole}; inset=${inset};\n\ndifference() {\n  cube([width,depth,thickness]);\n  for (x=[inset,width-inset], y=[inset,depth-inset]) translate([x,y,-0.01]) cylinder(d=hole,h=thickness+0.02);\n}\n`;
  }
  if (currentModel === "knob") {
    const { diameter, height, shaft, ribs } = values;
    return `// Formwerk Drehknopf — ${stamp}\n$fn=128; diameter=${diameter}; height=${height}; shaft=${shaft}; ribs=${ribs};\n\ndifference() {\n  union() {\n    cylinder(d=diameter,h=height);\n    for (a=[0:360/ribs:359]) rotate([0,0,a]) translate([diameter/2,0,height/2]) cube([2,2,height*0.72],center=true);\n  }\n  translate([0,0,-0.01]) cylinder(d=shaft,h=height+0.02);\n}\n`;
  }
  if (currentModel === "wallmount") {
    const { width, height, thickness, rail, clearance } = values;
    return `// Formwerk zweiteiliger Wandhalter — ${stamp}\n$fn=64; width=${width}; height=${height}; thickness=${thickness}; rail=${rail}; clearance=${clearance};\n\n// Wandteil\ntranslate([0,0,0]) difference() {\n  union() {\n    cube([width,height,thickness]);\n    translate([(width-rail)/2,height*0.14,thickness]) cube([rail,height*0.72,rail/2]);\n  }\n  for(y=[height/3,height*2/3]) translate([width/2,y,-0.01]) cylinder(d=5,h=thickness+0.02);\n}\n// Geräteteil, separat drucken\ntranslate([width+15,0,0]) difference() {\n  cube([width,height*0.65,thickness+rail/2]);\n  translate([(width-rail-clearance*2)/2,height*0.08,thickness]) cube([rail+clearance*2,height*0.55,rail/2+0.1]);\n}\n`;
  }
  if (currentModel === "foot") {
    const { diameter, height, hole, recess } = values;
    return `// Formwerk Gerätefuß — ${stamp}\n$fn=96; diameter=${diameter}; height=${height}; hole=${hole}; recess=${recess};\n\ndifference() {\n  cylinder(d=diameter,h=height);\n  translate([0,0,-0.01]) cylinder(d=hole,h=height+0.02);\n  if (recess>0) translate([0,0,-0.01]) cylinder(d=diameter*0.68,h=recess);\n}\n`;
  }
  if (currentModel === "washer") {
    const { outer, inner, height } = values;
    return `// Formwerk Unterlegscheibe — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height};\n\ndifference(){ cylinder(d=outer,h=height); translate([0,0,-0.01]) cylinder(d=inner,h=height+0.02); }\n`;
  }
  if (currentModel === "hook") {
    const { width, height, reach, thickness } = values;
    return `// Formwerk Wandhaken — ${stamp}\nwidth=${width}; height=${height}; reach=${reach}; thickness=${thickness};\n\nunion(){ cube([width,thickness,height]); cube([width,reach,thickness]); translate([0,reach-thickness,0]) cube([width,thickness,thickness*3]); }\n`;
  }
  if (currentModel === "handle") {
    const { length, depth, width, thickness } = values;
    return `// Formwerk Möbelgriff — ${stamp}\nlength=${length}; depth=${depth}; width=${width}; thickness=${thickness};\n\nunion(){ translate([0,depth,0]) cube([length,thickness,width]); cube([thickness,depth,width]); translate([length-thickness,0,0]) cube([thickness,depth,width]); }\n`;
  }
  if (currentModel === "grommet") {
    const { outer, inner, height, flange } = values;
    return `// Formwerk Kabeldurchführung — ${stamp}\n$fn=96; outer=${outer}; inner=${inner}; height=${height}; flange=${flange};\n\ndifference(){ union(){ cylinder(d=outer,h=height); translate([0,0,height]) cylinder(d=outer+2*flange,h=2); } translate([0,0,-0.01]) cylinder(d=inner,h=height+2.02); }\n`;
  }
  if (currentModel === "funnel") {
    const { top, bottom, height, spout, wall } = values;
    return `// Formwerk Trichter — ${stamp}\n$fn=128; top=${top}; bottom=${bottom}; height=${height}; spout=${spout}; wall=${wall};\n\ndifference(){ union(){ cylinder(d1=bottom,d2=top,h=height); translate([0,0,-spout]) cylinder(d=bottom,h=spout); } translate([0,0,-spout-0.01]) cylinder(d=bottom-2*wall,h=spout+0.02); translate([0,0,0]) cylinder(d1=bottom-2*wall,d2=top-2*wall,h=height+0.01); }\n`;
  }
  if (currentModel === "phone") {
    const { width, height, depth, thickness, lip } = values;
    return `// Formwerk Handyhalter — ${stamp}\nwidth=${width}; height=${height}; depth=${depth}; thickness=${thickness}; lip=${lip};\n\nunion(){ cube([width,depth,thickness]); translate([0,depth*0.25,thickness]) rotate([70,0,0]) cube([width,height,thickness]); translate([0,depth-thickness,thickness]) cube([width,thickness,lip]); }\n`;
  }
  if (currentModel === "corner") {
    const { length, width, thickness, hole } = values;
    return `// Formwerk Eckverbinder — ${stamp}\nlength=${length}; width=${width}; thickness=${thickness}; hole=${hole};\n\nunion(){ cube([width,length,thickness]); cube([width,thickness,length]); }\n`;
  }
  if (currentModel === "shelf") {
    const { width, depth, height, thickness } = values;
    return `// Formwerk Regalbodenträger — ${stamp}\nwidth=${width}; depth=${depth}; height=${height}; thickness=${thickness};\n\nunion(){ translate([0,0,height-thickness]) cube([width,depth,thickness]); cube([width,thickness,height]); hull(){ translate([width*.15,thickness,height*.15]) cube([width*.7,thickness,thickness]); translate([width*.15,depth*.72,height*.82]) cube([width*.7,thickness,thickness]); } }\n`;
  }
  if (currentModel === "gridbin") {
    const { width, depth, height, wall, bottom } = values;
    return `// Formwerk Rasterbox — ${stamp}\nwidth=${width}; depth=${depth}; height=${height}; wall=${wall}; bottom=${bottom};\n\ndifference(){ union(){ cube([width,depth,height]); translate([2,2,-3]) cube([width-4,depth-4,3]); } translate([wall,wall,bottom]) cube([width-2*wall,depth-2*wall,height]); }\n`;
  }
  if (currentModel === "organizer") {
    const { width, depth, height, wall, dividers } = values;
    return `// Formwerk Fächerbox — ${stamp}\nwidth=${width}; depth=${depth}; height=${height}; wall=${wall}; dividers=${dividers};\n\nunion(){ difference(){ cube([width,depth,height]); translate([wall,wall,wall]) cube([width-2*wall,depth-2*wall,height]); } for(i=[1:dividers-1]) translate([i*width/dividers-wall/2,wall,wall]) cube([wall,depth-2*wall,height*.72]); }\n`;
  }
  if (currentModel === "cablecomb") {
    const { cables, diameter, spacing, thickness, depth } = values;
    return `// Formwerk Kabelkamm — ${stamp}\n$fn=64; cables=${cables}; diameter=${diameter}; spacing=${spacing}; thickness=${thickness}; depth=${depth}; total=cables*diameter+(cables+1)*spacing;\n\ndifference(){ cube([total,depth,diameter+thickness]); for(i=[0:cables-1]) translate([spacing+diameter/2+i*(diameter+spacing),-0.01,thickness+diameter/2]) rotate([-90,0,0]) cylinder(d=diameter,h=depth+0.02); }\n`;
  }
  if (currentModel === "adapter") {
    const { diameter1, diameter2, length, wall } = values;
    return `// Formwerk Schlauchadapter — ${stamp}\n$fn=128; diameter1=${diameter1}; diameter2=${diameter2}; length=${length}; wall=${wall};\n\ndifference(){ cylinder(d1=diameter1,d2=diameter2,h=length); translate([0,0,-0.01]) cylinder(d1=diameter1-2*wall,d2=diameter2-2*wall,h=length+0.02); }\n`;
  }
  if (currentModel === "pipeclamp") {
    const { diameter, width, wall, foot } = values;
    return `// Formwerk Rohrschelle — ${stamp}\n$fn=96; diameter=${diameter}; width=${width}; wall=${wall}; foot=${foot};\n\ndifference(){ union(){ rotate([-90,0,0]) cylinder(d=diameter+2*wall,h=width); translate([-diameter/2-foot/2,0,-wall]) cube([foot,width,wall]); translate([diameter/2-foot/2,0,-wall]) cube([foot,width,wall]); } translate([0,-0.01,0]) rotate([-90,0,0]) cylinder(d=diameter,h=width+0.02); translate([-wall,-0.01,0]) cube([2*wall,width+0.02,diameter]); }\n`;
  }
  if (currentModel === "bearing") {
    const { bearing, width, height, depth, base } = values;
    return `// Formwerk Lagerhalter — ${stamp}\n$fn=96; bearing=${bearing}; width=${width}; height=${height}; depth=${depth}; base=${base};\n\ndifference(){ cube([width,depth,height]); translate([width/2,-0.01,max(bearing/2+base,height*.58)]) rotate([-90,0,0]) cylinder(d=bearing,h=depth+0.02); }\n`;
  }
  if (currentModel === "servo") {
    const { width, depth, height, wall, flange } = values;
    return `// Formwerk Servo-Halter — ${stamp}\nwidth=${width}; depth=${depth}; height=${height}; wall=${wall}; flange=${flange};\n\nunion(){ cube([width+2*wall+2*flange,depth+2*wall,wall]); translate([flange,0,0]) cube([wall,depth+2*wall,height]); translate([flange+width+wall,0,0]) cube([wall,depth+2*wall,height]); }\n`;
  }
  if (currentModel === "drillguide") {
    const { holes, spacing, hole, width, thickness } = values;
    return `// Formwerk Bohrschablone — ${stamp}\n$fn=64; holes=${holes}; spacing=${spacing}; hole=${hole}; width=${width}; thickness=${thickness}; length=(holes-1)*spacing+width;\n\ndifference(){ cube([length,width,thickness]); for(i=[0:holes-1]) translate([width/2+i*spacing,width/2,-0.01]) cylinder(d=hole,h=thickness+0.02); }\n`;
  }
  if (currentModel === "labelholder") {
    const { width, height, base, thickness, slot } = values;
    return `// Formwerk Labelhalter — ${stamp}\nwidth=${width}; height=${height}; base=${base}; thickness=${thickness}; slot=${slot};\n\nunion(){ cube([width,base,thickness]); cube([width,thickness,height]); translate([0,thickness+slot,0]) cube([width,thickness,height*.35]); }\n`;
  }
  if (currentModel === "magnetcup") {
    const { magnet, height, wall, base, clearance } = values;
    return `// Formwerk Magnetaufnahme — ${stamp}\n$fn=96; magnet=${magnet}; height=${height}; wall=${wall}; base=${base}; clearance=${clearance};\n\ndifference(){ cylinder(d=magnet+clearance+2*wall,h=height+base); translate([0,0,base]) cylinder(d=magnet+clearance,h=height+0.01); }\n`;
  }
  if (currentModel === "kumiko") {
    const { size, height, frame, depth, cell, pattern, bottom, top } = values;
    const patternScad = pattern === "asanoha"
      ? `for(r=[0:rows-1],c=[0:cols-1]) let(x=frame+c*dx,y=frame+r*dy) { line2d([x,y],[x+dx,y+dy]); line2d([x+dx,y],[x,y+dy]); line2d([x+dx/2,y],[x+dx/2,y+dy]); line2d([x,y+dy/2],[x+dx,y+dy/2]); }`
      : pattern === "kikko"
        ? `for(r=[0:rows-1],c=[0:cols-1]) let(x=frame+dx/2+c*dx,y=frame+dy/2+r*dy,rad=min(dx,dy)*.38) { for(a=[0:60:300]) line2d([x+cos(a)*rad,y+sin(a)*rad],[x+cos(a+60)*rad,y+sin(a+60)*rad]); line2d([x-dx/2,y],[x+dx/2,y]); line2d([x,y-dy/2],[x,y+dy/2]); }`
        : pattern === "seigaiha"
          ? `for(r=[0:rows-1],c=[0:cols-1]) let(x=frame+c*dx,y=frame+(r+1)*dy) { line2d([x,y],[x+dx,y]); line2d([x+dx/2,y-dy],[x+dx/2,y]); translate([x+dx/2,y]) difference(){ circle(r=min(dx,dy)*.45,$fn=32); circle(r=min(dx,dy)*.45-bar,$fn=32); translate([-dx,-dy]) square([2*dx,dy]); } }`
          : `for(r=[0:rows-1],c=[0:cols-1]) let(x=frame+dx/2+c*dx,y=frame+dy/2+r*dy,rad=min(dx,dy)*.43) { translate([x,y]) difference(){ circle(r=rad,$fn=32); circle(r=rad-bar,$fn=32); } line2d([x-dx/2,y],[x+dx/2,y]); line2d([x,y-dy/2],[x,y+dy/2]); }`;
    return `// Formwerk Kumiko-Lampe — ${stamp}\n// Muster: ${pattern}\nsize=${size}; height=${height}; frame=${frame}; depth=${depth}; cell=${cell}; bar=max(1.2,frame*.32); bottom=${bottom}; top=${top};\n\nmodule line2d(p1,p2,w=bar){ hull(){ translate(p1) circle(d=w,$fn=12); translate(p2) circle(d=w,$fn=12); } }\nmodule pattern2d(){\n  cols=floor((size-2*frame)/cell); rows=floor((height-2*frame)/cell); dx=(size-2*frame)/cols; dy=(height-2*frame)/rows;\n  ${patternScad}\n}\nmodule panel(){ linear_extrude(depth) union(){ difference(){ square([size,height]); translate([frame,frame]) square([size-2*frame,height-2*frame]); } pattern2d(); } }\n\n// Vier Seitenteile flach angeordnet, anschließend zusammenkleben\nfor(i=[0:3]) translate([i*(size+10),0,0]) panel();\n// Ober- und Unterrahmen\ntranslate([0,height+10,0]) linear_extrude(frame) difference(){ square([size,size]); translate([frame,frame]) square([size-2*frame,size-2*frame]); }\ntranslate([size+10,height+10,0]) linear_extrude(frame) difference(){ square([size,size]); translate([frame,frame]) square([size-2*frame,size-2*frame]); }\nif(bottom) translate([2*(size+10),height+10,0]) cube([size-2*frame,size-2*frame,depth]);\nif(top) translate([3*(size+10),height+10,0]) cube([size-2*frame,size-2*frame,depth]);\n`;
  }
  if (currentModel === "gridinsert") {
    const { cols, rows, height, kind, holes } = values;
    const dia = kind === "bits" ? 7 : kind === "nozzles" ? 8.5 : 2.8;
    return `// Formwerk Gridfinity-Einsatz — ${stamp}\n$fn=48; cols=${cols}; rows=${rows}; height=${height}; holes=${holes}; dia=${dia}; kind="${kind}"; wall=2.2; w=cols*42; d=rows*42; pitch=${kind === "cards" ? 16 : 14}; margin=${kind === "cards" ? 13 : 14}; columns=floor((w-margin*2)/pitch)+1;\n\ndifference(){\n  difference(){ cube([w,d,height]); translate([wall,wall,3]) cube([w-2*wall,d-2*wall,height]); }\n  for(i=[0:holes-1]) let(x=margin+(i%columns)*pitch,y=margin+floor(i/columns)*pitch) if(x<=w-margin && y<=d-margin) translate([x,y,2.8]) ${kind === "cards" ? `cube([10,dia+2,6],center=true);` : `cylinder(d=dia,h=8);`}\n}\n`;
  }
  if (currentModel === "electronics") {
    const { width, depth, height, wall, vents, bosses } = values;
    return `// Formwerk Elektronikgehäuse — ${stamp}\n$fn=48; width=${width}; depth=${depth}; height=${height}; wall=${wall}; vents=${vents}; bosses=${bosses};\n\nunion(){ difference(){ cube([width,depth,height]); translate([wall,wall,wall]) cube([width-2*wall,depth-2*wall,height]); } if(bosses) for(x=[12,width-12],y=[12,depth-12]) translate([x,y,wall]) cylinder(d=7.6,h=height*.45); }\n`;
  }
  if (currentModel === "lamppanel") {
    const { width, height, frame, depth, pattern, density } = values;
    return `// Formwerk modulares Lampenpanel — ${stamp}\nwidth=${width}; height=${height}; frame=${frame}; depth=${depth}; density=${density}; pattern="${pattern}"; bar=max(1.6,frame*.35); cols=density; rows=round((height-2*frame)/((width-2*frame)/cols)); dx=(width-2*frame)/cols; dy=(height-2*frame)/rows;\n\nmodule line2d(p1,p2,w=bar){ hull(){ translate(p1) circle(d=w,$fn=12); translate(p2) circle(d=w,$fn=12); } }\nlinear_extrude(depth) union(){\n  difference(){ square([width,height]); translate([frame,frame]) square([width-2*frame,height-2*frame]); }\n  for(i=[1:cols-1]) line2d([frame+i*dx,frame],[frame+i*dx,height-frame]);\n  for(r=[1:rows-1]) line2d([frame,frame+r*dy],[width-frame,frame+r*dy]);\n  if(pattern=="holes") for(c=[0:cols-1],r=[0:rows-1]) translate([frame+dx/2+c*dx,frame+dy/2+r*dy]) difference(){ circle(r=min(dx,dy)*.22+bar/3,$fn=24); circle(r=min(dx,dy)*.22,$fn=24); }\n}\n`;
  }
  if (currentModel === "batteryholder") {
    const { cells, type, wall, height } = values;
    const dia = type === "aaa" ? 11 : type === "18650" ? 18.8 : 14.5;
    return `// Formwerk Batteriehalter — ${stamp}\n$fn=64; cells=${cells}; dia=${dia}; wall=${wall}; height=${height}; pitch=dia+wall;\n\ncube([cells*pitch+wall,dia+2*wall,wall]);\nfor(i=[0:cells-1]) translate([wall+dia/2+i*pitch,dia/2+wall,wall]) difference(){ cylinder(d=dia+wall,h=height); translate([0,0,-0.01]) cylinder(d=dia,h=height+0.02); }\n`;
  }
  if (currentModel === "hingebox") {
    const { width, depth, height, wall, lid, hinge } = values;
    return `// Formwerk Scharnierbox — ${stamp}\n$fn=32; width=${width}; depth=${depth}; height=${height}; wall=${wall}; lid=${lid}; hinge=${hinge};\n\n// Box-Unterteil\ndifference(){ cube([width,depth,height]); translate([wall,wall,wall]) cube([width-2*wall,depth-2*wall,height]); }\ntranslate([width*.36,depth,height*.72]) cube([width*.28,wall*1.8,wall*2]);\nfor(x=[width*.18,width*.68]) translate([x,-hinge/2,height]) rotate([0,90,0]) cylinder(d=hinge,h=width*.28);\n\n// Deckel separat dahinter, offen dargestellt\ntranslate([0,-depth-hinge*1.4,height]) union(){ cube([width,depth,lid]); translate([wall*2,wall*2,-wall]) cube([width-4*wall,depth-4*wall,wall]); translate([width*.39,depth,lid]) cube([width*.22,wall*1.8,wall*2]); translate([width*.33,depth+hinge*.9,0]) rotate([0,90,0]) cylinder(d=hinge,h=width*.34); }\n`;
  }
  const { cable, width, wall, opening, base } = values;
  return `// Formwerk Kabelclip — ${stamp}\n$fn=96; cable=${cable}; width=${width}; wall=${wall}; opening=${opening}; base=${base};\n\nunion() {\n  cube([base,width,wall]);\n  translate([base/2,width,wall+cable/2]) rotate([90,0,0])\n    difference() {\n      cylinder(d=cable+2*wall,h=width);\n      translate([0,0,-0.01]) cylinder(d=cable,h=width+0.02);\n      translate([0,-opening/2,-0.01]) cube([cable+2*wall,opening,width+0.02]);\n    }\n}\n`;
}
