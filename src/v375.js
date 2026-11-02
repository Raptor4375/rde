
/* ================= SORËN, L'ŒIL DE LA TOUR : le guetteur de la guerre des cendres =================
   Tireur légendaire exclusif de l'événement « L'Éveil du Roi de Cendre » (chronique « Le Guetteur du Nord »).
   Passif « Œil de la Tour » : il agit toujours en premier au tour 1.
   Ultime « Marque du Guetteur » : un tir puissant sur l'ennemi qui a le plus d'énergie (celui qui va lancer son ultime) ;
   la cible perd 50 énergie et est marquée 2 tours : toute l'équipe lui fait +30 % de dégâts.
   Dessin sur mesure, léger (aucun filtre) : capuche verte, écharpe braise, arc long, carquois aux flèches de braise, longue-vue. */
const SOR=71;
(function(){try{
if(!(typeof ashOn==='function'&&ashOn())||HEROES[SOR]||HEROES.length!==SOR)return;
HEROES.push({i:SOR,n:"Sorën l'Œil de la Tour",c:'Tireur',r:4,ex:1,exd:"Termine la Chronique « Le Guetteur du Nord » (événement « L'Éveil du Roi de Cendre ») pour qu'il rejoigne ton équipe.",sk:{n:'Marque du Guetteur',tg:'one',fx:{dmg:260,mark:2,drainEn:50}}});
LOOKS[SOR]=['#e8bc94','#a8804a','#3a5a48','#e8742a','#ffd84a','#3fbf6b','bg:dawn back:cape hair:short eyes:normal mouth:smile body:tunic ear:human'];
try{UTH_H[SOR]={n:'Mille Feux',m:'#3a5a48',s:'#e8742a',a:'#ff9a3a',e:'#ffd84a',bg:'dawn',w:'wings-gold',hat:'halo',fx:'embers',c:'#ff9a3a',c2:'#ffd84a',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('soren',e)}})();

(function(){try{
if(!HEROES[SOR])return;
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
const SC={};
const defs=(q,u)=>`<radialGradient id="${q}bg" cx="50%" cy="30%" r="78%"><stop offset="0" stop-color="${u>=3?'#fff6d8':'#ffe6b0'}"/><stop offset=".18" stop-color="#ffb060"/><stop offset=".42" stop-color="#b8603a"/><stop offset=".7" stop-color="#2e3e5a"/><stop offset="1" stop-color="#0a1222"/></radialGradient>
<radialGradient id="${q}gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".9"/><stop offset=".5" stop-color="#ffd8a0" stop-opacity=".4"/><stop offset="1" stop-color="#ff9a3a" stop-opacity="0"/></radialGradient>
<linearGradient id="${q}au" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#ffd84a"/><stop offset="1" stop-color="#c8901a"/></linearGradient>
<linearGradient id="${q}hd" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u>=3?'#4e7a5e':'#46684f'}"/><stop offset=".6" stop-color="#2e4a38"/><stop offset="1" stop-color="#1a2a20"/></linearGradient>
<linearGradient id="${q}le" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9a6a3e"/><stop offset="1" stop-color="#5e3c20"/></linearGradient>
<linearGradient id="${q}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f2cca6"/><stop offset=".55" stop-color="#e2b08a"/><stop offset="1" stop-color="#c08a62"/></linearGradient>
<linearGradient id="${q}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#d8b070"/><stop offset="1" stop-color="#8a6434"/></linearGradient>
<linearGradient id="${q}sc" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ff9a4a"/><stop offset="1" stop-color="#c84a1a"/></linearGradient>
<linearGradient id="${q}bw" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${u>=3?'#fff0b0':'#c8945a'}"/><stop offset="1" stop-color="${u>=3?'#c8901a':'#6a4220'}"/></linearGradient>`;
const AU=q=>`url(#${q}au)`,HD=q=>`url(#${q}hd)`,LE=q=>`url(#${q}le)`,SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,SCF=q=>`url(#${q}sc)`,BW=q=>`url(#${q}bw)`;
const STARP=(x,y,r,c='#fff')=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,c,'opacity=".9"');
const EMB=(x,y,r,c)=>C_(x,y,r,c,'opacity=".9"');
/* ---------- la tête (100×100), capuche relevée ---------- */
function hoodBack(q){return P('M30 50Q27 24 50 16Q73 24 70 50Q72 64 76 78L24 78Q28 64 30 50Z',HD(q))+P('M34 48Q33 28 50 22Q67 28 66 48Q60 36 50 34Q40 36 34 48Z','#16241a','opacity=".55"')}
function face(q,u){
  let s=`<rect x="45" y="55" width="10" height="12" fill="${SK(q)}"/>`+P('M45 59.4Q50 62.6 55 59.4L55 64Q50 66 45 64Z','#a8784e','opacity=".55"');
  s+=P('M36.8 44.2Q36.8 30.6 50 30.6Q63.2 30.6 63.2 44.2Q63.2 53.4 59.8 58.8Q55.6 64.4 50 65Q44.4 64.4 40.2 58.8Q36.8 53.4 36.8 44.2Z',SK(q));
  s+=P('M58.6 46Q61.8 52 59.2 57.6Q56.8 61.2 53 63Q57.8 58.6 59.2 52.6Z','#b07a52','opacity=".42"');
  /* yeux ambrés, regard d'éclaireur */
  const ir=u>=3?'#ffd84a':'#e89a2a';
  const eye=x=>{const d=x<50?1:-1,ix=r1(x+.3*d);return P(`M${r1(x-3.3*d)} 47.4Q${x} 45 ${r1(x+3.4*d)} 46.6Q${r1(x+.4*d)} 49.2 ${r1(x-3.3*d)} 47.4Z`,'#fbf6ee')
    +C_(ix,47.1,1.65,ir)+C_(ix,47.2,.95,u>=3?'#c88a10':'#a85a10')+C_(ix,47.1,.62,'#1a0e06')+C_(r1(x-.35*d),46.4,.45,'#fff')
    +L_(`M${r1(x-3.6*d)} 47.3Q${x} 44.5 ${r1(x+3.6*d)} 46.4`,'#2a1a0e',1.05)+L_(`M${r1(x-2.6*d)} 49Q${x} 49.8 ${r1(x+2.6*d)} 48.7`,'#b07a52',.4,'opacity=".6"')};
  s+=eye(44)+eye(56)+MI(L_('M39.4 42.2Q43.4 40.2 47.8 41.8','#6a4a24',1.5));
  s+=L_('M50.6 48.4L49.6 53.2Q50.4 54.2 51.8 53.6','#b07a52',.7);
  /* petit sourire en coin et pansement sur la joue (trois jours de course) */
  s+=L_('M46.4 57.4Q50.4 59.6 54.2 56.6','#7a3a2a',.95)+L_('M53.6 56.2L54.8 55.6','#7a3a2a',.6);
  s+=`<g transform="rotate(-18 58.6 52.6)"><rect x="55.4" y="51.2" width="6.6" height="2.8" rx="1" fill="#f4e6cc" stroke="#c8b08a" stroke-width=".3"/><path d="M57.6 51.4V53.8M59.8 51.4V53.8" stroke="#d8c4a0" stroke-width=".3"/></g>`;
  s+=L_('M40.6 52.6L43.4 51.8','#c07a5a',.45,'opacity=".7"');
  /* mèches blondes en bataille sous la capuche */
  s+=P('M36.4 44Q35.6 32 44 27.6Q50 25 56.6 27.4Q64.6 31.4 63.6 44Q62 37.6 58.4 35Q57.4 38.6 54 39.6Q55.2 36.4 54.4 34.4Q50.6 38.2 45.6 38.8Q47.6 36.6 47.6 34.8Q43.4 38 39.4 38.4Q37.4 40.6 36.4 44Z',HR(q))
    +L_('M42 30.4Q46.4 28.4 51 29M52.6 29.2Q58 30.4 61.4 34.6M44.4 34.6Q48 32.2 50.8 31.6','#f0d090',.5,'opacity=".9"');
  return s}
/* la capuche devant (bord) et l'écharpe braise */
function hoodFront(q,u){return P('M31.6 52Q30 26 50 18.6Q70 26 68.4 52Q66.4 36 58.6 30.4Q50 26.6 41.4 30.4Q33.6 36 31.6 52Z',HD(q))+L_('M33 46Q33.6 31.6 44.6 25.6M55.4 25.6Q66.4 31.6 67 46','#6a8e72',.6,'opacity=".7"')
  +(u?L_('M31.8 51.4Q30.4 27 50 19.2Q69.6 27 68.2 51.4',AU(q),.6,`opacity="${.35+u*.15}"`):'')}
function scarf(q){return P('M38.6 62.4Q50 69.4 61.4 62.4L64.6 70.6Q50 78.6 35.4 70.6Z',SCF(q))+L_('M38.6 62.4Q50 69.4 61.4 62.4','#8a2a10',.6)+L_('M40.4 67.6Q50 72.6 59.6 67.6','#ffc08a',.5,'opacity=".7"')
  +P('M57 70.8L61.6 84.6L57.4 83.2L55 88L53.6 72Z',SCF(q))}
/* ---------- buste du portrait ---------- */
function bust(q,u){
  /* le haut de l'arc derrière l'épaule droite, les plumes des flèches derrière l'épaule gauche */
  let s=L_('M30 100Q12 76 22 48Q24 42 27 38',BW(q),2.6)+L_('M27 38L29.6 34.6','#3a2410',1.6)+L_('M27.6 37.2Q34 66 52 100','#f4ead8',.4,'opacity=".7"');
  const fl=(x,a,c)=>`<g transform="translate(${x} 70) rotate(${a})"><path d="M0 0V-16" stroke="#6a4a2a" stroke-width="1.1"/><path d="M0 -16L-2.8 -24L0 -21L2.8 -24Z" fill="${c}" stroke="#4a2a10" stroke-width=".3"/></g>`;
  s+=fl(70,14,'#ff8a3a')+fl(74.4,22,'#f4ead8')+fl(78,30,'#ff8a3a');
  /* cape à capuche et pourpoint de cuir */
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',HD(q))+P('M12 100Q14 85 26 77.6L30 100Z','#121e16','opacity=".5"')+P('M88 100Q86 85 74 77.6L70 100Z','#121e16','opacity=".5"');
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',LE(q))+L_('M50 74V100','#3a2410',.7)+L_('M40.6 80.4L43 100M59.4 80.4L57 100','#3a2410',.6,'opacity=".6"');
  /* la corde de l'arc et la sangle du carquois en travers de la poitrine */
  s+=L_('M30.8 76Q48 86 70 100','#3a2410',2.4)+L_('M31.2 75.8Q48 85.8 70.4 99.6','#7a5030',.8)+C_(40.6,81.4,1.6,AU(q))+C_(52,88.2,1.4,AU(q));
  s+=scarf(q);
  if(u)s+=L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8,`opacity="${.4+u*.15}"`);
  return s}
/* ---------- ailes de braise (ultra II et III) ---------- */
function feather(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),nx=-sn,ny=c,tx=R[0]+len*c,ty=R[1]+len*sn,mx=R[0]+len*.58*c,my=R[1]+len*.58*sn;
  return P(`M${r1(R[0]+nx*1.6)} ${r1(R[1]+ny*1.6)}Q${r1(mx+nx*wd)} ${r1(my+ny*wd)} ${r1(tx)} ${r1(ty)}Q${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)} ${r1(R[0]-nx*1.6)} ${r1(R[1]-ny*1.6)}Z`,fill,`stroke="${edge}" stroke-width="${ew}" stroke-linejoin="round"`)}
function wings(q,u){const R=[36,62];let w='';
  [[-176,44],[-158,51],[-139,55],[-120,51],[-102,44]].forEach(([a,l],k)=>{w+=feather(R,a,l,6,k%2?'#ffb060':'#ff8a3a','#a8401a',.5)});
  [[-166,29],[-147,33],[-127,32],[-108,26]].forEach(([a,l])=>{w+=feather(R,a,l,5.4,'#ffe2a0','#e88a2a',.4)});
  return `<g opacity="${u>=3?.95:.84}">${MI(w)}</g>`}
/* ---------- décor : la tour de guet et son feu d'alarme ---------- */
function tower(x,y,s,op){return`<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><path d="M-5 0L-4 -30H4L5 0Z" fill="#1a1e2e"/><path d="M-7 -30H7L5 -36H-5Z" fill="#141826"/><path d="M-2 -36L0 -43L2 -36Z" fill="#ffb03a"/><circle cx="0" cy="-38" r="5" fill="#ffb03a" opacity=".35"/></g>`}
function rays(cx,cy,n,len,op,col){let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+16)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,col,`opacity="${op}"`)}return s}
function frame(){const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17','#ffe08a',1,'opacity=".95"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4','#ff9a4a',.5,'opacity=".85"')+P('M1.4 1.4h3.2v3.2z','#fff6c8','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')}
const ROMN=['','I','II','III'];
function sorenPortrait(u){u=Math.max(0,Math.min(3,u|0));if(SC['p'+u])return SC['p'+u];const q='sp'+u+'_';
  const rc=(typeof RCOL!=='undefined'&&RCOL[4])||'#ffd84a',cc=(typeof CLS!=='undefined'&&CLS.Tireur&&CLS.Tireur.c)||'#3fbf6b',TC='#ffd84a';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sorën l'Œil de la Tour"><defs>${defs(q,u)}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  s+=rays(50,30,12,80,.07,'#ffffff')+C_(50,32,30+u*2,`url(#${q}gl)`)+P('M0 74L14 64L26 70L40 60L58 68L74 58L88 66L100 60V100H0Z','#1a2236','opacity=".75"')+tower(12,72,1,.9)+tower(88,66,.7,.7);
  [[22,20,.9],[78,16,.8],[86,38,.7],[14,40,.6],[66,10,.6]].forEach(([x,y,r],k)=>{s+=EMB(x,y,r,k%2?'#ffd890':'#ff9a3a')});
  if(u>=3)s+=C_(50,32,24.4,'none','stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity=".9"');
  if(u>=2)s+=wings(q,u);
  s+=hoodBack(q)+bust(q,u)+face(q,u)+hoodFront(q,u);
  if(u>=3)s+=E_(50,17,11,2.8,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(50,17,11,2.8,'none','stroke="#ffffff" stroke-width=".5"');
  s+=frame();
  if(u){[[16,30,2],[84,26,1.8],[20,58,1.3],[80,52,1.5],[50,5,1.1]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
    s+=`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
  s+=`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/><path d="M81 89L91.4 78.6M91.4 78.6L86.6 79.4M91.4 78.6L90.6 83.4" stroke="${cc}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M80.4 83.6Q86 76.6 91.6 84.6" stroke="${cc}" stroke-width="1.2" fill="none"/></svg>`;
  return SC['p'+u]=s}
/* ---------- corps entier (cadre 160×244) ---------- */
function sorenBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(SC[ck])return SC[ck];const q='sb'+u+(bare?'s':'')+'_';
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Sorën l'Œil de la Tour en pied"><defs>${defs(q,u)}<radialGradient id="${q}bb" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#ffcf90" stop-opacity="${.36+u*.08}"/><stop offset=".55" stop-color="#b8603a" stop-opacity=".26"/><stop offset="1" stop-color="#0a1222" stop-opacity="0"/></radialGradient></defs>`;
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,`url(#${q}gl)`,'opacity=".45"')}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,36,14,120,.05,'#ffffff')}${C_(80,36,42+u*3,`url(#${q}gl)`,'opacity=".75"')}`;
    if(u>=1)s+=C_(80,36,46+u*4,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    /* quelques braises qui montent (peu d'animations) */
    s+=[...Array(5)].map((_,k)=>{const x=28+k*26,d=3.6+(k%3)*.9;return`<circle r="${(.9+(k%3)*.4).toFixed(1)}" fill="${k%2?'#ffd890':'#ff8a3a'}" opacity=".9"><animateMotion dur="${d}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${x} 212q${k%2?7:-7} -70 ${k%2?-5:5} -160"/></circle>`}).join('')+`</g>`}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${wings(q,u)}</g>`;
  /* la cape à capuche qui flotte derrière lui */
  s+=P('M62 60Q46 110 40 206Q58 213 80 210Q102 213 120 206Q114 110 98 60Z',HD(q))+P('M62 62Q50 120 45 202L51 204Q56 128 67 68Z','#121e16','opacity=".5"')+P('M98 62Q110 120 115 202L109 204Q104 128 93 68Z','#121e16','opacity=".5"');
  if(u)s+=L_('M40 206Q58 213 80 210Q102 213 120 206',AU(q),1,`opacity="${.45+u*.15}"`);
  /* le carquois dans le dos : les flèches dépassent derrière l'épaule */
  const ar=(x,y,a,c)=>`<g transform="translate(${x} ${y}) rotate(${a})"><path d="M0 0V-30" stroke="#6a4a2a" stroke-width="1.3"/><path d="M0 -30L-3.2 -39L0 -35.6L3.2 -39Z" fill="${c}" stroke="#4a2a10" stroke-width=".35"/></g>`;
  s+=`<rect x="94" y="56" width="11" height="40" rx="3" transform="rotate(24 99.5 76)" fill="${LE(q)}" stroke="#3a2410" stroke-width=".6"/>`+ar(104,60,24,'#ff8a3a')+ar(107.6,62,30,'#f4ead8')+ar(110.6,65,36,'#ff8a3a');
  /* jambes : pantalon, bandes et bottes de marche */
  const leg=(x,f)=>P(`M${x} 128L${x+11} 128L${x+10} 196L${x+1} 196Z`,'#4a3a2c')+L_(`M${x+.6} 150L${x+10.4} 152M${x+.6} 158L${x+10.4} 160M${x+.8} 166L${x+10.2} 168`,'#8a7458',.9,'opacity=".8"')
    +P(`M${x-1} 190L${x+12} 190L${x+12.4} 206L${f?x+19:x-7} 208L${x-1.4} 206Z`,LE(q),'stroke="#3a2410" stroke-width=".5"');
  s+=leg(68,0)+leg(81,1);
  /* tunique verte, pourpoint de cuir, ceinture et longue-vue en laiton */
  s+=P('M63 64Q80 58.6 97 64L99 118Q80 124 61 118Z','#2e4a38')+P('M66 66Q80 61 94 66L95.6 112Q80 117.6 64.4 112Z',LE(q))+L_('M80 66V114','#3a2410',.7);
  s+=L_('M66.4 70Q80 96 98 116','#3a2410',2.2)+L_('M66.6 69.8Q80 95.6 98.2 115.6','#7a5030',.8)+C_(74,84,1.4,AU(q))+C_(86.4,103,1.3,AU(q));
  s+=P('M61.6 112Q80 119 98.4 112L98.4 117.6Q80 124.6 61.6 117.6Z','#3a2410')+`<rect x="76" y="113" width="8" height="6.4" rx="1.2" fill="${AU(q)}" stroke="#8a5a1a" stroke-width=".5"/>`;
  s+=`<g transform="rotate(-62 68 122)"><rect x="60" y="119.4" width="18" height="5.2" rx="1.4" fill="#c8a050" stroke="#7a5a20" stroke-width=".5"/><rect x="58.6" y="118.8" width="3.6" height="6.4" rx="1" fill="#e8c878"/><rect x="74" y="119" width="3" height="6" rx=".8" fill="#8a6a2a"/></g>`;
  /* écharpe braise */
  s+=P('M68 52Q80 59.4 92 52L95.4 61Q80 69.4 64.6 61Z',SCF(q))+L_('M68 52Q80 59.4 92 52','#8a2a10',.6)+P('M87 61L93 79L88 77L85 83L83.6 63Z',SCF(q));
  /* bras droit le long du corps, une flèche de braise à la main */
  s+=P('M60 66Q52 80 50 100L57.6 101Q59.4 84 65 72Z','#2e4a38')+P('M50 100Q48.6 112 49.4 120L56.4 120.4Q57.6 111 57.6 101Z',SK(q))+E_(52.8,122.4,3.8,3.4,SK(q));
  s+=`<g transform="rotate(8 52.8 122.4)"><path d="M52.8 96V156" stroke="#6a4a2a" stroke-width="1.4"/><path d="M52.8 156L49.6 164L52.8 160.4L56 164Z" fill="#f4ead8" stroke="#4a2a10" stroke-width=".35"/><path d="M52.8 96L50 89L52.8 91L55.6 89Z" fill="#ff8a3a"/>${C_(52.8,91.4,2.6,'#ffb03a','opacity=".45"')}</g>`;
  /* bras gauche : la main serre l'arc long, tenu debout à côté de lui */
  s+=P('M100 66Q110 80 112 98L104.6 100Q103 84 96 72Z','#2e4a38')+P('M104.6 100L112 98L117.6 116L111.4 118.6Z',SK(q));
  s+=P('M118 30Q140 120 118 212',`none`,`stroke="${BW(q)}" stroke-width="3.6" stroke-linecap="round"`)+L_('M118 30L114.6 25.6M118 212L114.6 216.4','#3a2410',2)+L_('M117.6 30.6V211.4','#f4ead8',.5,'opacity=".85"');
  if(u)s+=P('M118 30Q140 120 118 212','none',`stroke="#ffd84a" stroke-width="1.2" opacity="${.25+u*.15}"`);
  s+=`<rect x="125.6" y="110" width="6.4" height="16" rx="2" fill="#4a2c14" stroke="#2a1608" stroke-width=".5"/>`+E_(128.4,118,4.8,4.4,SK(q))+L_('M124.4 115.4L132 115.6M124.2 118.4L132.2 118.6M124.6 121.2L131.8 121.4','#b07a52',.5);
  /* la tête */
  s+=HG(hoodBack(q)+face(q,u)+hoodFront(q,u));
  if(u>=3)s+=E_(80,12.4,10,2.6,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(80,12.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
  if(u&&!bare)[[14,40,2],[146,56,1.8],[16,140,1.6],[144,150,1.8],[80,-4,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  s+='</svg>';return SC[ck]=s}

/* ---------- branchements ---------- */
window.sorenPortrait=sorenPortrait;window.sorenBody=sorenBody;
try{Object.defineProperty(PCACHE,SOR,{get:()=>sorenPortrait(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===SOR)return sorenPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===SOR)return sorenBody(u);return hb.apply(this,arguments)}}
try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+SOR+'(_|$)').test(k))delete C[k]}catch(e){}
}catch(e){console.warn('soren art',e)}})();

/* ---------- la mécanique : Œil de la Tour et Marque du Guetteur ---------- */
(function(){try{
if(!HEROES[SOR])return;
/* passif : il agit avant tout le monde au premier tour */
{const r0=run;run=async function(){const my=B;try{if(my&&my.round===0&&!my.sorPre){my.sorPre=1;for(const s of my.units.filter(x=>x.hid===SOR&&x.hp>0)){s.skipR1=1;log(`🔭 <b>${s.name}</b> a vu l'ennemi arriver le premier !`,'sk');float(s,'🔭 Premier !','info');
    try{if(!my.skip&&!REDUCED){fxSetup();const a=uc(s);glowPulse(a.x,a.y,'#ff9a3a',600,a.s*.6);ringFx(a.x,a.y,'#ffd84a',a.s*.8,600,4)}}catch(e){}
    await act(s);if(B!==my||my.done)return}}}catch(e){}return r0.apply(this,arguments)}}
{const a0=act;act=async function(u){if(u&&u.skipR1&&B&&B.round===1){u.skipR1=0;return}const r=await a0.apply(this,arguments);try{if(u&&u.markT>0){u.markT--;if(!u.markT&&B)refreshUnits()}}catch(e){}return r}}
/* l'ultime vise l'ennemi qui a le plus d'énergie (celui qui va lancer son ultime), sans tenir compte de la provocation */
{const sk2=skill;skill=function(u,sk,sc){if(!(B&&u&&sk&&sk.fx&&sk.fx.mark))return sk2.apply(this,arguments);const foes=alive(1-u.side);if(!foes.length)return sk2.apply(this,arguments);
  const mx=Math.max(...foes.map(t=>t.en||0)),cand=foes.filter(t=>(t.en||0)===mx),tg=cand[Math.floor(Math.random()*cand.length)];
  const pt=pickT;pickT=()=>tg;let r;try{r=sk2.apply(this,arguments)}finally{pickT=pt}
  try{B.sorTg=tg;if(tg.hp>0){const dr=sk.fx.drainEn||50;tg.en=Math.max(0,(tg.en||0)-dr);tg.markT=Math.max(tg.markT||0,sk.fx.mark);float(tg,'🎯 −'+dr,'crit');
    log(`🎯 <b>${u.name}</b> marque <b>${tg.name}</b> : il perd ${dr} énergie et subit +30 % de dégâts.`,'sk')}}catch(e){}return r}}
{const h3=hurt;hurt=function(t,d,c){try{if(t&&t.markT>0&&d>0&&t.hp>0)d=Math.round(d*1.3)}catch(e){}return h3.call(this,t,d,c)}}
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B)for(const u of B.units){const el=document.getElementById('u-'+u.key);if(!el)continue;const on=u.markT>0&&u.hp>0;el.classList.toggle('sormk',on);
  if(on){const sx=el.querySelector('.sx');if(sx)sx.insertAdjacentHTML('beforeend','<span style="color:#ff6a3a">MARQUÉ</span>')}}}catch(e){}return r}}
{const sd=skillDesc;skillDesc=function(sk,sc=1){try{if(sk&&sk.fx&&sk.fx.mark){const v=x=>Math.round(x*sc);return`Tire sur l'ennemi qui a le plus d'énergie (celui qui va lancer son ultime) : ${v(sk.fx.dmg)}% ATQ. Il perd ${sk.fx.drainEn||50} énergie et est marqué ${sk.fx.mark} tours : toute l'équipe lui inflige +30 % de dégâts.`}}catch(e){}return sd.apply(this,arguments)}}
const SO_PAS=`<div class="skill sopas"><div class="sn">🔭 Œil de la Tour</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.05em">PASSIF</div><div style="margin-top:4px">Sorën voit l'ennemi arriver avant tout le monde : il agit toujours <b>en premier</b> au tour 1.</div></div>`;
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===SOR){const m=$('#ovl .modal');const sk=m&&m.querySelector('.skill');if(sk&&!m.querySelector('.sopas'))sk.insertAdjacentHTML('afterend',SO_PAS)}}catch(e){}return r}}
/* ultra-évolution « Mille Feux » : une deuxième flèche sur le suivant */
try{ULX[SOR]={n:'Mille Feux',el:'fire',c:['#ff9a3a','#ffd84a'],ic:'🏹',logic(u,tg,sc,k){let t0=0;for(const t of tg)t0+=deal(u,t,40*k*sc,{sk:1,ub:1});
    const rest=alive(1-u.side).filter(t=>!tg.includes(t));if(rest.length){const t2=rest.reduce((a,b)=>(a.en||0)>=(b.en||0)?a:b);t0+=deal(u,t2,50*k*sc,{sk:1,ub:1});t2.en=Math.max(0,(t2.en||0)-Math.round(20*k));if(k>=1.8){t2.markT=Math.max(t2.markT||0,1)}float(t2,'🏹','crit')}return t0},
  async fx(u,tg,ux){const a=uc(u);vignette('#1a0a04',1000,.4);for(const t of alive(1-u.side).slice(0,4)){const b=uc(t);fxProjectile(a,b,'#ff9a3a',360,6);await fxWait(90)}await fxWait(300);for(const t of tg){const b=uc(t);ringFx(b.x,b.y,'#ffd84a',b.s*.8,600,5);glows(b.x,b.y,['#ff9a3a','#ffd84a','#ffffff'],24,6,6,40)}await fxWait(300)}}}catch(e){}
try{STL[SOR]=["Sorën était le plus jeune guetteur de la Tour du Nord. Son travail : regarder l'horizon toute la nuit, et allumer le feu d'alarme si quelque chose arrivait. Pendant trois ans, rien n'est jamais arrivé.",
 "Puis une nuit, une silhouette avec un cor aussi long qu'une lance est montée sur sa tour. Le Héraut des Mille Ans a sonné, et une armée grise a envahi la plaine. Sorën a couru trois jours et trois nuits pour prévenir la Garde d'Éther.",
 "Depuis, Aegis l'appelle « l'Œil de la Garde ». Sorën voit toujours l'ennemi arriver le premier… et il ne rate jamais celui qui s'apprête à frapper."]}catch(e){}
try{AFF.push({n:'Les Yeux de la Garde',ic:'🔭',ids:[SOR,AEG,44],need:2,fx:{crit:.06,spd:.06},d:'+6 % critique, +6 % vitesse',q:"Sorën : « Je vois l'ennemi, vous le retenez. » — Aegis : « Et personne ne passe. »"});const ae=AFF.find(a=>a.n==="Œil de l'aigle");if(ae&&!ae.ids.includes(SOR))ae.ids.push(SOR)}catch(e){}
/* ---------- l'animation signature : la Marque du Guetteur ---------- */
const ok=()=>B&&!B.skip&&FXS.ctx;
try{LEG2[SOR]=async X=>{const {u}=X;fxSetup();const a=uc(u),W=FXS.w,H=FXS.h,O='#ff9a3a',Y='#ffd84a',WH='#fff6e0',RD='#ff4a3a',fm=rowMid(1-u.side);
  const tg=(B.sorTg&&B.sorTg.hp!==undefined)?B.sorTg:(X.tg[0]||alive(1-u.side)[0]);if(!tg)return;const b=uc(tg);
  /* 1. l'œil du guetteur s'ouvre et balaie les ennemis */
  vignette('#060a12',3000,.7);
  fxItem(1200,(g,p)=>{const op=p<.3?p/.3:1,fade=p>.85?(1-p)/.15:1,cx=W/2,cy=fm.y,Rw=Math.min(W*.46,170),Rh=Rw*.42*Math.min(1,p*2.4);g.globalCompositeOperation='lighter';g.globalAlpha=.8*fade;
    g.strokeStyle=O;g.lineWidth=2.4;g.beginPath();g.moveTo(cx-Rw,cy);g.quadraticCurveTo(cx,cy-Rh*2,cx+Rw,cy);g.quadraticCurveTo(cx,cy+Rh*2,cx-Rw,cy);g.stroke();
    g.globalAlpha=.55*fade*op;g.drawImage(spr(O),cx-Rh*1.4,cy-Rh*1.4,Rh*2.8,Rh*2.8);g.globalAlpha=.9*fade;g.strokeStyle=Y;g.lineWidth=1.6;g.beginPath();g.arc(cx,cy,Rh*.9,0,7);g.stroke();
    const sw=(p*2)%1;g.globalAlpha=.5*fade;g.fillStyle='rgba(255,154,58,.5)';g.fillRect(cx-Rw+sw*Rw*2-3,cy-Rh*1.6,6,Rh*3.2)});
  alive(1-u.side).forEach((t,i)=>{const c=uc(t);fxWait(200+i*120).then(()=>{if(!ok())return;fxItem(500,(g,p)=>{const s=c.s*.62*(1.4-p*.4);g.globalCompositeOperation='lighter';g.globalAlpha=(p<.2?p/.2:1)*(t===tg?1:.6);g.strokeStyle=t===tg?RD:O;g.lineWidth=2;
    for(const [sx,sy] of [[-1,-1],[1,-1],[1,1],[-1,1]]){g.beginPath();g.moveTo(c.x+sx*s,c.y+sy*s*.6);g.lineTo(c.x+sx*s,c.y+sy*(s*.6-8));g.moveTo(c.x+sx*s,c.y+sy*s*.6);g.lineTo(c.x+sx*(s-8),c.y+sy*s*.6);g.stroke()}})})});
  await fxWait(900);if(!ok())return;
  /* 2. le viseur se verrouille sur la cible */
  fxItem(1300,(g,p)=>{const e=ease(Math.min(1,p/.45)),R=b.s*(1.6-e*.85),fade=p>.85?(1-p)/.15:1;g.globalCompositeOperation='lighter';g.globalAlpha=fade;g.translate(b.x,b.y);g.rotate((1-e)*2.4);g.strokeStyle=RD;g.lineWidth=2.6;
    g.beginPath();g.arc(0,0,R,0,7);g.stroke();g.lineWidth=1.2;g.beginPath();g.arc(0,0,R*.55,0,7);g.stroke();for(let i=0;i<4;i++){g.rotate(Math.PI/2);g.beginPath();g.moveTo(R*.35,0);g.lineTo(R*1.25,0);g.stroke()}
    if(e>=1){g.globalAlpha=fade*(.6+.4*Math.sin(p*40));g.fillStyle=RD;g.beginPath();g.arc(0,0,3,0,7);g.fill()}});
  textPop(W/2,Math.max(24,fm.y-fm.s*.8),LANG==='en'?'TARGET LOCKED':'CIBLE REPÉRÉE',RD,17,1100);
  chargeUp(a,[O,Y,WH],800,true);
  fxItem(900,(g,p)=>{g.globalCompositeOperation='lighter';g.globalAlpha=Math.sin(p*Math.PI)*.8;g.strokeStyle=O;g.lineWidth=1.4;g.setLineDash([6,7]);g.lineDashOffset=-p*60;g.beginPath();g.moveTo(a.x,a.y);g.lineTo(b.x,b.y);g.stroke()},200);
  await fxWait(1000);if(!ok())return;
  /* 3. le tir : une flèche de braise traverse l'écran */
  fxItem(300,(g,p)=>{const t=ease(p),x=a.x+(b.x-a.x)*t,y=a.y+(b.y-a.y)*t,an=Math.atan2(b.y-a.y,b.x-a.x);g.globalCompositeOperation='lighter';
    for(let k=0;k<12;k++){const q=Math.max(0,t-k*.03),xx=a.x+(b.x-a.x)*q,yy=a.y+(b.y-a.y)*q;g.globalAlpha=.8-k*.06;const z=12-k*.7;g.drawImage(spr(k<3?WH:O),xx-z,yy-z,z*2,z*2)}
    g.globalAlpha=1;g.translate(x,y);g.rotate(an);g.fillStyle=WH;g.beginPath();g.moveTo(10,0);g.lineTo(-6,-4);g.lineTo(-3,0);g.lineTo(-6,4);g.closePath();g.fill()});
  await fxWait(300);if(!ok())return;
  /* 4. l'impact : la marque et l'énergie qui s'échappe */
  flash(WH,200,.55);shake(3);camPunch(b,1.07,340);ringFx(b.x,b.y,RD,b.s*1.3,700,6,.6);ringFx(b.x,b.y,O,b.s*.9,600,4,.6,90);glows(b.x,b.y,[O,Y,WH],34,7,6,44);sparks(b.x,b.y,WH,22,9);hit(X,tg,1.6);
  for(let i=0;i<14;i++)emit(1,()=>{const an=Math.random()*6.283,v=rnd(2,5);return{x:b.x,y:b.y,vx:Math.cos(an)*v,vy:Math.sin(an)*v-1,drag:.95,life:rnd(30,50),max:50,s:rnd(2,3.4),c:'#8ad8ff'}});
  fxItem(1100,(g,p)=>{g.globalCompositeOperation='lighter';g.globalAlpha=(1-p)*.9;g.strokeStyle=RD;g.lineWidth=2;g.translate(b.x,b.y);g.beginPath();g.arc(0,0,b.s*.5,0,7);g.stroke();g.beginPath();g.moveTo(-b.s*.7,0);g.lineTo(b.s*.7,0);g.moveTo(0,-b.s*.7);g.lineTo(0,b.s*.7);g.stroke()});
  textPop(W/2,(fm.y+rowMid(u.side).y)/2,LANG==='en'?"WATCHER'S MARK":'MARQUE DU GUETTEUR',O,25,1300);
  await fxWait(700)}}catch(e){}
try{LEGS[SOR]=(d,dd,t)=>{nT(d,{t,fl:'bandpass',f:380,f2:900,q:3,a:.5,d:.15,v:.12});oT(d,{t:t+.62,f:2400,f2:900,d:.22,v:.05});nT(d,{t:t+.62,f:6000,f2:1500,q:1,d:.25,v:.18});SND.slash(d,t+.64,1.3);SND.boom(dd,t+.92,1.2);fmT(d,{t:t+.95,f:880,r:1.41,i:2,d:.9,v:.08})}}catch(e){}
try{if(window.SIGFX)SIGFX[SOR]=1}catch(e){}
const st=document.createElement('style');st.textContent=`.u.sormk .pt{box-shadow:0 0 0 2px #ff4a3a,0 0 12px -2px #ff4a3a}.sopas{border-color:rgba(255,154,58,.55)!important}`;document.head.appendChild(st);
}catch(e){console.warn('soren meca',e)}})();
