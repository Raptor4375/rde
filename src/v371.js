
/* ================= LYRA, LA VOIX DU ROYAUME : la barde de la guerre des cendres =================
   Soutien légendaire exclusif de l'événement « L'Éveil du Roi de Cendre » (chronique « La Voix du Royaume »).
   Compétence « Chant de l'Aube » : donne de l'énergie à toute l'équipe, soigne un peu, et son Contre-Chant
   retire de l'énergie aux ennemis. Passif « Refrain » : ses attaques normales donnent de l'énergie à l'allié le plus en retard.
   Dessin sur mesure, léger (aucun filtre) : cheveux cuivrés et tresse, cape turquoise, corset bordeaux, luth, notes de musique. */
const LYR=70;
(function(){try{
if(!(typeof ashOn==='function'&&ashOn())||HEROES[LYR]||HEROES.length!==LYR)return;
HEROES.push({i:LYR,n:'Lyra la Voix du Royaume',c:'Soutien',r:4,ex:1,exd:"Termine la Chronique « La Voix du Royaume » (événement « L'Éveil du Roi de Cendre ») pour qu'elle rejoigne ton équipe.",sk:{n:"Chant de l'Aube",tg:'team',fx:{energy:40,healall:110,mute:25}}});
LOOKS[LYR]=['#f6d8c2','#a8481e','#f4ead8','#1e9a8a','#ffd84a','#2aa88a','bg:holy back:cape hair:long eyes:normal mouth:smile body:tunic ear:human'];
try{UTH_H[LYR]={n:"Symphonie de l'Aube",m:'#f4ead8',s:'#1e9a8a',a:'#2ac0b0',e:'#ffd84a',bg:'holy',w:'wings-gold',hat:'halo',fx:'stars',c:'#5ad8c8',c2:'#ffd84a',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('lyra',e)}})();

(function(){try{
if(!HEROES[LYR])return;
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const MB=s=>s+`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
const LC={};
const defs=(q,u)=>`<radialGradient id="${q}bg" cx="50%" cy="34%" r="74%"><stop offset="0" stop-color="${u>=3?'#fffbe8':'#fff2d6'}"/><stop offset=".17" stop-color="#a8f0e0"/><stop offset=".42" stop-color="#26a496"/><stop offset=".74" stop-color="#0e4a56"/><stop offset="1" stop-color="#06202c"/></radialGradient>
<radialGradient id="${q}gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".5" stop-color="#d8fff4" stop-opacity=".42"/><stop offset="1" stop-color="#5ad8c8" stop-opacity="0"/></radialGradient>
<radialGradient id="${q}g2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd84a" stop-opacity=".42"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient>
<linearGradient id="${q}au" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#ffd84a"/><stop offset="1" stop-color="#c8901a"/></linearGradient>
<linearGradient id="${q}tl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u>=3?'#5ae8d8':'#34c8b8'}"/><stop offset=".55" stop-color="#16968a"/><stop offset="1" stop-color="#0a5450"/></linearGradient>
<linearGradient id="${q}cr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="#e2d4bc"/></linearGradient>
<linearGradient id="${q}bu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a8344a"/><stop offset="1" stop-color="#5e1a2a"/></linearGradient>
<linearGradient id="${q}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fae0cc"/><stop offset=".55" stop-color="#f0c8ae"/><stop offset="1" stop-color="#d4a286"/></linearGradient>
<linearGradient id="${q}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u>=3?'#e88a4a':'#d2703c'}"/><stop offset=".6" stop-color="#a8481e"/><stop offset="1" stop-color="#7a3014"/></linearGradient>
<linearGradient id="${q}wd" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0b878"/><stop offset=".55" stop-color="#c47a3a"/><stop offset="1" stop-color="#7a4218"/></linearGradient>
<radialGradient id="${q}tg" cx="38%" cy="34%" r="70%"><stop offset="0" stop-color="#e8fff8"/><stop offset=".42" stop-color="#3ad0c0"/><stop offset="1" stop-color="#0a5450"/></radialGradient>`;
const AU=q=>`url(#${q}au)`,TL=q=>`url(#${q}tl)`,CR=q=>`url(#${q}cr)`,BU=q=>`url(#${q}bu)`,HR=q=>`url(#${q}hr)`,SK=q=>`url(#${q}sk)`,WD=q=>`url(#${q}wd)`,TG=q=>`url(#${q}tg)`;
/* une note de musique (♪) et une double croche (♫) */
const NOTE=(x,y,s,c,op=1)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><ellipse rx="2.1" ry="1.5" transform="rotate(-24)" fill="${c}"/><path d="M1.8 -.5V-8.4Q5 -6.8 4.6 -3.2" fill="none" stroke="${c}" stroke-width=".95" stroke-linecap="round"/></g>`;
const NOTE2=(x,y,s,c,op=1)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}"><ellipse rx="2" ry="1.45" transform="rotate(-24)" fill="${c}"/><ellipse cx="6.4" cy="-1.2" rx="2" ry="1.45" transform="rotate(-24 6.4 -1.2)" fill="${c}"/><path d="M1.7 -.5V-8.6M8.1 -1.7V-9.8" stroke="${c}" stroke-width=".9" stroke-linecap="round"/><path d="M1.7 -8.6L8.1 -9.8L8.1 -8.2L1.7 -7Z" fill="${c}"/></g>`;
const STARP=(x,y,r,c='#fff')=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,c,'opacity=".9"');
/* une portée qui ondule, comme une mélodie dans le vent */
function staff(x0,x1,y,amp,col,op,w=.35){let s='';for(let i=0;i<5;i++){const yy=y+i*1.9;s+=L_(`M${x0} ${r1(yy)}Q${r1((x0*3+x1)/4)} ${r1(yy-amp)} ${r1((x0+x1)/2)} ${r1(yy)}T${x1} ${r1(yy)}`,col,w,`opacity="${op}"`)}return s}
/* la lyre d'or, emblème de Lyra (centrée en x,y ; haute d'environ 10×s) */
function lyreG(q,x,y,s){return`<g transform="translate(${x} ${y}) scale(${s})">`
  +P('M-4.4 -4.4Q-6 -.8 -3.6 2.8Q-1.9 4.6 0 4.8Q1.9 4.6 3.6 2.8Q6 -.8 4.4 -4.4Q3.4 -5.8 2.4 -4.8Q3.8 -1.6 2.4 1.2Q1.2 2.8 0 2.9Q-1.2 2.8 -2.4 1.2Q-3.8 -1.6 -2.4 -4.8Q-3.4 -5.8 -4.4 -4.4Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')
  +P('M-3.8 -3.9L3.8 -3.9L3.6 -3L-3.6 -3Z',AU(q),'stroke="#8a5a1a" stroke-width=".2"')+L_('M-1.2 -3V2.2M0 -3V2.6M1.2 -3V2.2','#fff6d8',.32)
  +C_(-4.4,-4.6,.75,AU(q))+C_(4.4,-4.6,.75,AU(q))+C_(0,4.2,1.15,TG(q),'stroke="#8a5a1a" stroke-width=".25"')+'</g>'}
/* la Rosace de la Voix derrière la tête : anneau perlé, rosace de pétales, ondes du chant, la lyre au sommet */
function rosace(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s='',d='';
  for(let k=0;k<8;k++){const a=(k*45-90+22.5)*Math.PI/180,c=Math.cos(a),sn=Math.sin(a),nx=-sn,ny=c,r0=R*1.03,rr=R*1.3,rm=(r0+rr)/2,w=R*.085;
    d+=`M${r1(cx+r0*c)} ${r1(cy+r0*sn)}Q${r1(cx+rm*c+nx*w)} ${r1(cy+rm*sn+ny*w)} ${r1(cx+rr*c)} ${r1(cy+rr*sn)}Q${r1(cx+rm*c-nx*w)} ${r1(cy+rm*sn-ny*w)} ${r1(cx+r0*c)} ${r1(cy+r0*sn)}Z`}
  s+=`<path d="${d}" fill="#ffe08a" fill-opacity="${r1(op*.22)}" stroke="#ffe08a" stroke-width="${r1(R*.02)}" opacity="${r1(op*.9)}"/>`;
  /* les ondes du chant, à gauche et à droite */
  [1.12,1.25,1.38].forEach((f,i)=>{const r=r1(R*f),t=18*Math.PI/180,ca=r1(r*Math.cos(t)),sa=r1(r*Math.sin(t));
    s+=L_(`M${r1(cx+ca)} ${r1(cy-sa)}A${r} ${r} 0 0 1 ${r1(cx+ca)} ${r1(cy+sa)}M${r1(cx-ca)} ${r1(cy+sa)}A${r} ${r} 0 0 1 ${r1(cx-ca)} ${r1(cy-sa)}`,'#fff2c0',r1(R*.032),`opacity="${r1(op*(1-i*.24))}"`)});
  s+=C_(cx,cy,R,'none',`stroke="#ffe08a" stroke-width="${r1(R*.036)}" opacity="${r1(op)}"`)+C_(cx,cy,r1(R*.85),'none',`stroke="#fff2c0" stroke-width="${r1(R*.018)}" opacity="${r1(op*.85)}"`);
  d='';for(let k=1;k<24;k++){const a=(k*15-90)*Math.PI/180,x=r1(cx+R*.925*Math.cos(a)),y=r1(cy+R*.925*Math.sin(a)),rb=r1(R*(k%2?.022:.036));d+=`M${r1(x-rb)} ${y}a${rb} ${rb} 0 1 0 ${r1(rb*2)} 0a${rb} ${rb} 0 1 0 ${r1(-rb*2)} 0`}
  s+=`<path d="${d}" fill="#ffe08a" opacity="${r1(op)}"/>`;
  const ly=r1(cy-R*.925);return s+C_(cx,ly,r1(R*.15),'#0e4a56','stroke="#ffe08a" stroke-width="'+r1(R*.025)+'" opacity=".95"')+lyreG(q,cx,ly,r1(R*.026))}
/* le cercle de portée sous ses pieds : une portée en anneau, avec ses notes */
function staffRing(q,cx,cy,rx,ry,op){
  let s=E_(cx,cy,r1(rx*1.08),r1(ry*1.14),'none',`stroke="#7ae8d8" stroke-width=".6" stroke-dasharray="1.4 3.2" opacity="${r1(op*.7)}"`)+E_(cx,cy,rx,ry,'none',`stroke="#ffd84a" stroke-width="1.2" opacity="${op}"`);
  for(let i=1;i<=3;i++)s+=E_(cx,cy,r1(rx-i*2.6),r1(ry-i*1.05),'none',`stroke="#bff6ec" stroke-width=".4" opacity="${r1(op*.8)}"`);
  s+=E_(cx,cy,r1(rx-12.4),r1(ry-4.6),'none',`stroke="#ffd84a" stroke-width=".7" opacity="${op}"`);
  for(let k=0;k<10;k++){const a=(k*36+18)*Math.PI/180,x=r1(cx+(rx-5.2)*Math.cos(a)),y=r1(cy+(ry-2.1)*Math.sin(a)+1);s+=k%2?NOTE2(x,y,.32,'#ffe08a',op):NOTE(x,y,.4,'#ffe08a',op)}
  return s}

/* ---------- la tête (coordonnées du portrait 100×100) ---------- */
function hairBack(q,long=1){return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q68.6 60 71.6 ${74*long}Q73.4 ${88*long} 69.4 ${100*long}H30.6Q26.6 ${88*long} 28.4 ${74*long}Q31.4 60 33.4 46Z`,HR(q))
  +L_(`M36 50Q33.6 64 32.6 ${78*long}M64 50Q66.4 64 67.4 ${78*long}`,'#7a3014',.8,'opacity=".5"')}
function feather(q,x,y,a,s){return`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">${P('M0 0Q-3.4 -6 -1.2 -14.6Q1.6 -8.4 2.6 -3Q2 -.6 0 0Z','#ffffff','stroke="#c8b8f0" stroke-width=".35"')}${P('M-1.2 -14.6Q-2.6 -11 -2.2 -8.2Q-.6 -11 0 -13Z','#b8a4ff')}${L_('M.4 .4Q-.4 -7 -1.1 -14','#9a84e0',.35)}</g>`}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#c08a70','opacity=".55"');
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#d09878','opacity=".4"');
  /* le ras-du-cou d'or et sa goutte turquoise */
  s+=P('M45.4 64.4Q50 66.6 54.6 64.4L54.6 65.8Q50 68 45.4 65.8Z',AU(q),'stroke="#8a5a1a" stroke-width=".2"')+C_(50,67.2,.75,AU(q))+P('M50 67.6Q51.7 69.6 50 72.2Q48.3 69.6 50 67.6Z',TG(q),'stroke="#8a5a1a" stroke-width=".25"')+C_(49.6,69.4,.3,'#fff','opacity=".9"');
  /* grands yeux verts, cils, regard doux */
  const ir=u>=3?'#d8a02a':'#2aa88a';
  const eye=x=>{const d=x<50?1:-1,ix=r1(x+.2*d);return P(`M${r1(x-3.6*d)} 47.2Q${x} 43.9 ${r1(x+3.6*d)} 46.6Q${r1(x+.4*d)} 49.8 ${r1(x-3.6*d)} 47.2Z`,'#fdfaf4')
    +C_(ix,47,1.95,ir)+C_(ix,47.3,1.2,u>=3?'#8a5a10':'#16705c')+C_(ix,47.1,.75,'#0e2420')+C_(r1(x-.5*d),46.1,.6,'#fff')+C_(r1(x+.6*d),47.9,.3,'#fff','opacity=".8"')
    +L_(`M${r1(x-3.9*d)} 47.3Q${x} 43.6 ${r1(x+3.8*d)} 46.4`,'#3a1a10',1.15)+L_(`M${r1(x-3.7*d)} 47.2Q${r1(x-4.9*d)} 46 ${r1(x-5.4*d)} 45.4`,'#3a1a10',.8)
    +L_(`M${r1(x-2.6*d)} 49Q${x} 49.9 ${r1(x+2.8*d)} 48.6`,'#c08a70',.4,'opacity=".6"')};
  s+=eye(44)+eye(56)+MI(L_('M40 41.2Q43.4 39.4 47.2 40.6','#8a3e1c',1.05));
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#c08a70',.65);
  /* bouche souriante, entrouverte : elle chante */
  s+=P('M46.4 56.6Q50 57.8 53.6 56.6Q52.9 60.2 50 60.6Q47.1 60.2 46.4 56.6Z','#8a2a36')+P('M47.3 57.2Q50 58 52.7 57.2L52.5 58Q50 58.6 47.5 58Z','#fff')
    +P('M47.6 59.6Q50 61 52.4 59.6Q50 60.4 47.6 59.6Z','#d06a72','opacity=".8"')+L_('M46 56.5Q50 57.9 54 56.5','#a03a44',.6);
  s+=MI(E_(41.4,53.2,3.1,1.5,'#ff7a7a','opacity=".26"'))+[[42.4,51.6],[43.8,52.6],[41.4,52.8],[57.6,51.6],[56.2,52.6],[58.6,52.8],[49.2,51.2],[51,51.4]].map(([x,y])=>C_(x,y,.3,'#b0644a','opacity=".7"')).join('');
  /* cheveux cuivrés : frange de côté et longues mèches */
  s+=P('M36.4 45Q35 30 44 25.2Q52 21.8 59.8 25.6Q66.2 29.6 64.4 45Q62.4 37 57.2 33.6Q54.2 37.4 48.8 38.6Q52 35.4 52.4 32.6Q46.6 37.2 39.6 39Q37.2 41.4 36.4 45Z',HR(q))
    +L_('M44 27Q49 25.4 54 26.4M40 32Q44 28.6 49 28.4M55.4 28.6Q60 30 62.4 34.6M46.6 34.4Q49.4 31.4 51.4 29.4','#f0a070',.5,'opacity=".85"');
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 78Q38.8 72 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 78Q61.2 72 60.2 62Q59.4 52 60.4 44Z',HR(q))
    +L_('M37.6 46Q36 56 36.6 64M62.4 46Q64 56 63.4 64','#f0a070',.4,'opacity=".7"');
  /* la plume (un clin d'œil à Plume) tenue par une barrette d'or à gemme turquoise */
  s+=feather(q,63.2,37,28,.95)+E_(63.3,37.6,2.3,1.4,AU(q),'transform="rotate(28 63.3 37.6)" stroke="#8a5a1a" stroke-width=".25"')+C_(63.3,37.6,.8,TG(q))+C_(63,37.3,.25,'#fff');
  /* le diadème : un fin bandeau d'or sur la frange, une note d'or au centre */
  s+=L_('M38.4 34.6Q44 28.8 50 28.2Q56 28.8 61.6 34.6',AU(q),.75,'opacity=".95"')+C_(50,28.3,1.15,TG(q),'stroke="#c8901a" stroke-width=".35"')+C_(44.2,30,.45,AU(q))+C_(55.8,30,.45,AU(q));
  return s}
/* la tresse qui tombe sur l'épaule, cerclée d'anneaux d'or, nouée d'or */
function braid(q,x,y,n,sc=1){let s='';for(let i=0;i<n;i++){const yy=y+i*4.2*sc,xx=x-i*.9*sc;s+=E_(r1(xx),r1(yy),r1(3.1*sc),r1(2.6*sc),HR(q),`stroke="#7a3014" stroke-width="${r1(.35*sc)}"`)+L_(`M${r1(xx-2.2*sc)} ${r1(yy-.6*sc)}Q${r1(xx)} ${r1(yy+1.4*sc)} ${r1(xx+2*sc)} ${r1(yy-1.2*sc)}`,'#f0a070',r1(.4*sc),'opacity=".7"')
    +(i%2&&i<n-1?L_(`M${r1(xx-2.7*sc)} ${r1(yy+1.8*sc)}Q${r1(xx-.4*sc)} ${r1(yy+3*sc)} ${r1(xx+2.5*sc)} ${r1(yy+1.6*sc)}`,AU(q),r1(.85*sc)):'')}
  const ey=y+n*4.2*sc,ex=x-n*.9*sc;return s+P(`M${r1(ex-1.6*sc)} ${r1(ey-1.6*sc)}L${r1(ex+1.6*sc)} ${r1(ey-1.6*sc)}L${r1(ex+2.4*sc)} ${r1(ey+1.4*sc)}L${r1(ex-2.4*sc)} ${r1(ey+1.4*sc)}Z`,AU(q),`stroke="#8a5a1a" stroke-width="${r1(.3*sc)}"`)
    +C_(r1(ex),r1(ey),r1(.8*sc),TG(q))+P(`M${r1(ex-1.6*sc)} ${r1(ey+1.4*sc)}Q${r1(ex)} ${r1(ey+7*sc)} ${r1(ex+1.4*sc)} ${r1(ey+1.4*sc)}Z`,HR(q))}
/* ---------- le luth, orné d'or ---------- */
function lute(q,u){/* le corps en poire, le filet d'or, la rosace dorée, le manche incrusté et le chevillier renversé (coordonnées du corps : 160×244) */
  let s=P('M38 150Q24 158 25.6 174Q28 190 43 192Q58 192 62.4 178Q66 163 55 153Q47 147 38 150Z',WD(q),'stroke="#5a2e10" stroke-width=".7"')
    +P('M40 153Q29 160 30.4 173Q32.4 186 43.4 187.6Q55 187.6 58.4 177Q61 165 52.4 157Q46.4 151.6 40 153Z','#e8b070','opacity=".55"')
    +P('M39.2 151.6Q26.6 159 28 173.6Q30.2 188.6 43.2 190Q56.6 190 60.4 177.6Q63.6 164 53.8 155Q46.8 149.4 39.2 151.6Z','none',`stroke="${AU(q)}" stroke-width=".9"`);
  /* la rosace : un soleil d'or ajouré */
  s+=C_(44,168,6.8,'none',`stroke="${AU(q)}" stroke-width=".6" stroke-dasharray="1 1"`)+C_(44,168,5.4,'#3a1e0c')+C_(44,168,5.4,'none',`stroke="${AU(q)}" stroke-width="1.1"`);
  let d='';for(let k=0;k<8;k++){const a=k*45*Math.PI/180,c=Math.cos(a),sn=Math.sin(a);d+=`M44 168Q${r1(44+2.6*c-1.1*sn)} ${r1(168+2.6*sn+1.1*c)} ${r1(44+4.6*c)} ${r1(168+4.6*sn)}Q${r1(44+2.6*c+1.1*sn)} ${r1(168+2.6*sn-1.1*c)} 44 168Z`}
  s+=`<path d="${d}" fill="none" stroke="#ffd84a" stroke-width=".4" opacity=".95"/>`+C_(44,168,1.1,AU(q));
  /* chevalet d'or et deux petites incrustations */
  s+=P('M49 185.6L55.6 183.2L56.4 185.4L49.8 187.8Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+P('M33.4 178.6L34.8 176.6L36.2 178.6L34.8 180.6Z',AU(q))+P('M52.4 158.2L53.8 156.2L55.2 158.2L53.8 160.2Z',AU(q));
  /* le manche vers l'épaule gauche, incrusté d'or, et ses cordes */
  s+=P('M50.6 160.4L96 116.4L99.6 120L54.4 164Z','#7a4218','stroke="#4a2408" stroke-width=".5"')+L_('M52.6 162.2L97.6 118.4',AU(q),.45,'opacity=".9"')+P('M96 116.4L104.6 104.4L109.6 107.4L99.6 120Z','#5a2e10','stroke="#3a1a06" stroke-width=".5"')+L_('M96.4 117.4L99 120.4',AU(q),.9);
  [[100.4,108.6],[102.6,105.6],[105.4,111],[107.6,108]].forEach(([x,y])=>{s+=C_(x,y,1.05,AU(q),'stroke="#8a5a1a" stroke-width=".3"')});
  /* un ruban turquoise noué au chevillier */
  s+=P('M98.4 117.8Q92 117 87.6 121.6Q93 120.6 96.6 121.4Z',TL(q))+P('M99 118.6Q97.6 124.6 99.8 130Q101.4 125 100.8 120.6Z',TL(q))+C_(98.8,118.4,1.4,TL(q),'stroke="#0a5450" stroke-width=".3"');
  s+=L_(`M51.6 186.4L97.6 118.2M53.2 186.8L98.6 119.2M54.8 187L99.6 120.2`,u?'#fff6c8':'#f4ead8',.3,`opacity="${u?.95:.8}"`);
  if(u)s+=L_('M51.6 186.4L97.6 118.2','#ffd84a',.8,`opacity="${.2+u*.12}"`);
  return s}
/* ---------- buste du portrait ---------- */
function bust(q,u){
  /* le luth porté dans le dos : on voit son manche incrusté d'or et son ruban au-dessus de l'épaule */
  let s=P('M15.4 100L22.6 64.6L26.4 65.4L20.6 100Z','#7a4218','stroke="#4a2408" stroke-width=".4"')+L_('M17.4 99.4L24.2 66',AU(q),.5,'opacity=".9"')
    +P('M22.6 64.6L18.6 55.6L22.4 54.4L26.4 65.4Z','#5a2e10')+[[19.6,58],[21.4,57.4],[20.6,61],[22.4,60.4]].map(([x,y])=>C_(x,y,.8,AU(q),'stroke="#8a5a1a" stroke-width=".2"')).join('')
    +L_('M21.6 100L24.6 66M23.2 100L25.6 66.2','#f4ead8',.25,'opacity=".8"')
    +P('M23 66.8Q17.6 67.6 14.4 73.4Q18 70.6 21.6 70.6Z',TL(q))+P('M23.8 67.4Q22.6 72.6 25.4 78Q26.2 73.2 25 69.2Z',TL(q))+C_(23.4,66.8,1.3,TL(q),'stroke="#0a5450" stroke-width=".3"');
  /* la cape courte, doublée de bordeaux et galonnée d'or */
  s+=P('M8 100Q10 82 23 75.4L77 75.4Q90 82 92 100Z',TL(q))+P('M12 100Q14 86 25 79L29 100Z',BU(q))+P('M88 100Q86 86 75 79L71 100Z',BU(q))
    +L_('M12.4 99.6Q14.4 86.4 25 79.6',AU(q),.7)+L_('M87.6 99.6Q85.6 86.4 75 79.6',AU(q),.7)
    +L_('M9 99.4Q11 83 23.6 76.2M91 99.4Q89 83 76.4 76.2',AU(q),.85)+L_('M11.2 99.2Q12.8 85.4 23.6 78.6M88.8 99.2Q87.2 85.4 76.4 78.6','#ffe9a0',.5,'stroke-dasharray=".1 1.8" opacity=".85"');
  /* le capuchon replié sur la nuque, ourlé d'or */
  s+=P('M35 66.4Q50 73.6 65 66.4L69.4 77Q50 84 30.6 77Z',TL(q))+L_('M35 66.4Q50 73.6 65 66.4','#0a5450',.6)+L_('M33 74.4Q50 80.6 67 74.4','#ffe9a0',.5,'stroke-dasharray=".1 1.9" opacity=".9"')+L_('M30.9 76.8Q50 83.6 69.1 76.8',AU(q),.8);
  /* chemise crème au col brodé, corset bordeaux lacé d'or, volutes d'or */
  s+=P('M37.4 77Q50 81 62.6 77L66 100H34Z',CR(q))+P('M45.2 76.6Q50 81.8 54.8 76.6L50 84.6Z',SK(q))+L_('M45.2 76.6Q50 81.8 54.8 76.6','#d4b896',.5)+L_('M45.4 77.4L50 84.2L54.6 77.4',AU(q),.4,'opacity=".85"');
  s+=P('M38.4 86.4Q50 90 61.6 86.4L63.4 100H36.6Z',BU(q))+L_('M38.4 86.4Q50 90 61.6 86.4',AU(q),.8)
    +L_('M47.4 90.6L52.6 94M52.6 90.6L47.4 94M47.4 95L52.6 98.4M52.6 95L47.4 98.4',AU(q),.55)+C_(47.4,90.6,.45,AU(q))+C_(52.6,90.6,.45,AU(q))
    +L_('M41 92.6Q42.6 90.4 44.2 92Q44.8 94.2 42.6 94.6Q41.2 94.4 41.6 93.2M59 92.6Q57.4 90.4 55.8 92Q55.2 94.2 57.4 94.6Q58.8 94.4 58.4 93.2',AU(q),.45,'opacity=".95"');
  /* la broche en forme de lyre d'or qui ferme la cape */
  s+=lyreG(q,39.4,76.6,.62);
  return s}
/* ---------- les ailes d'ultra : des portées de lumière ---------- */
function staffWings(q,u){let w='';for(let i=0;i<5;i++){const o=i*2.4;w+=L_(`M40 ${r1(68-o*.3)}Q22 ${r1(60-o)} 10 ${r1(36-o*1.4)}Q4 ${r1(24-o*1.2)} 8 ${r1(12-o*.8)}`,i===2?'#ffffff':'#fff2c0',i===2?.75:.5,`opacity="${u>=3?.95:.8}"`)}
  w+=NOTE(14,30,.9,'#ffe9a0')+NOTE2(20,44,.8,'#fff6c8')+NOTE(9,16,.7,'#ffffff');
  return`<g>${MI(w)}</g>`}
/* ---------- décor ---------- */
function rays(cx,cy,n,len,op,col){let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+16)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,col,`opacity="${op}"`)}return s}
function frame(){const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17','#ffe08a',1,'opacity=".95"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4','#7ae8d8',.5,'opacity=".85"')+P('M1.4 1.4h3.2v3.2z','#fff6c8','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')}
const ROMN=['','I','II','III'];
function lyraPortrait(u){u=Math.max(0,Math.min(3,u|0));if(LC['p'+u])return LC['p'+u];const q='lp'+u+'_';
  const rc=(typeof RCOL!=='undefined'&&RCOL[4])||'#ffd84a',cc=(typeof CLS!=='undefined'&&CLS.Soutien&&CLS.Soutien.c)||'#e8a93a',TC='#ffd84a';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lyra la Voix du Royaume"><defs>${defs(q,u)}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  s+=rays(50,36,12,80,.07,'#ffffff')+C_(50,38,30+u*2,`url(#${q}gl)`)+staff(-4,104,84,-5,'#d8fff4',.16)+rosace(q,50,38,27,u);
  s+=NOTE(12,24,1,'#fff6d8',.85)+NOTE2(80,18,.9,'#fff6d8',.8)+NOTE(90,60,.8,'#d8fff4',.7)+NOTE(9,60,.75,'#d8fff4',.6);
  if(u>=1)s+=NOTE(26,9,.8,'#ffd84a')+NOTE2(68,8,.75,'#ffd84a',.9)+C_(50,38,31.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=staffWings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+braid(q,36.2,62,6,1);
  if(u>=3)s+=E_(50,21.2,11,2.8,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(50,21.2,11,2.8,'none','stroke="#ffffff" stroke-width=".5"');
  s+=frame();
  if(u){[[16,34,2],[84,32,1.8],[20,72,1.3],[80,52,1.5]].slice(0,1+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
    s+=`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
  s+=`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/>${NOTE(84.6,88.6,1.25,cc)}</svg>`;
  return LC['p'+u]=s}
/* ---------- corps entier (cadre 160×244) ---------- */
function lyraBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(LC[ck])return LC[ck];const q='lb'+u+(bare?'s':'')+'_';
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Lyra la Voix du Royaume en pied"><defs>${defs(q,u)}<radialGradient id="${q}bb" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#a8f0e0" stop-opacity="${.38+u*.08}"/><stop offset=".55" stop-color="#16968a" stop-opacity=".28"/><stop offset="1" stop-color="#06202c" stop-opacity="0"/></radialGradient></defs>`;
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,`url(#${q}gl)`,'opacity=".5"')}${rosace(q,80,36,31,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,36,14,120,.05,'#ffffff')}${C_(80,36,42+u*3,`url(#${q}gl)`,'opacity=".8"')}${staff(0,160,30,8,'#fff6d8',.2,.5)}${rosace(q,80,36,33,u)}`;
    if(u>=1)s+=C_(80,36,49+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    /* quelques notes qui s'envolent (peu d'animations : léger sur téléphone) */
    s+=[...Array(5)].map((_,k)=>{const x=28+k*26,d=4+(k%3)*.9,c=k%2?'#fff6c8':'#d8fff4';return`<g opacity=".85"><animateMotion dur="${d}s" begin="${-k*.8}s" repeatCount="indefinite" path="M${x} 206q${k%2?7:-7} -70 ${k%2?-5:5} -160"/>${k%2?NOTE2(0,0,1.1,c):NOTE(0,0,1.2,c)}</g>`}).join('')+`</g>`+staffRing(q,80,212,50,10,.9)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${staffWings(q,u)}</g>`;
  /* cheveux longs dans le dos */
  s+=HG(hairBack(q,1.32));
  /* jambes et bottes à revers d'or (sous la jupe fendue) */
  s+=P('M70.6 176L77 176L76.4 204L69.8 204Z',SK(q))+P('M68.6 196L77.6 196L78 210L64 212Q64.4 203 68.6 196Z','#6a3a1e','stroke="#3a1e0c" stroke-width=".5"')+P('M68.2 194.4L77.8 194.4L77.9 198.4Q73 199.6 68 198.4Z','#8a5230','stroke="#3a1e0c" stroke-width=".4"')+L_('M68.2 198.2Q73 199.4 77.8 198.2',AU(q),.75)+C_(73,196.4,.8,TG(q),'stroke="#c8901a" stroke-width=".3"');
  s+=P('M83 176L89.4 176L90.2 204L83.6 204Z',SK(q))+P('M82.4 196L91.4 196L96 211.6L82 210Z','#6a3a1e','stroke="#3a1e0c" stroke-width=".5"')+P('M82.1 194.4L91.6 194.4L91.9 198.4Q87 199.6 82.2 198.4Z','#8a5230','stroke="#3a1e0c" stroke-width=".4"')+L_('M82.3 198.2Q87 199.4 91.7 198.2',AU(q),.75)+C_(87,196.4,.8,TG(q),'stroke="#c8901a" stroke-width=".3"');
  /* longue jupe turquoise, fendue devant, ourlet brodé d'or et de notes */
  s+=P('M62 116Q55 160 50 200Q62 205 70 200L74 150L80 120L86 150L90 200Q98 205 110 200Q105 160 98 116Z',TL(q))+P('M62 118Q57 160 53 198L58 199Q61 160 66 122Z','#0a4a46','opacity=".45"')+P('M98 118Q103 160 107 198L102 199Q99 160 94 122Z','#0a4a46','opacity=".45"')
    +P('M74 150L80 120L86 150Q80 154 74 150Z',CR(q),'opacity=".9"')+L_('M70.4 199.6L74.4 150.4L80 121.4M89.6 199.6L85.6 150.4L80 121.4',AU(q),.8)
    +L_('M50 200Q62 205 70 200M90 200Q98 205 110 200',AU(q),1.1)+L_('M51.2 194.4Q62 199 70.6 194.4M89.4 194.4Q98 199 108.8 194.4','#ffe08a',.6,'stroke-dasharray=".1 2.2" opacity=".95"')
    +NOTE(59.6,190.4,.42,'#ffe08a',.9)+NOTE2(97.4,189.4,.36,'#ffe08a',.9);
  /* chemise et corset bordeaux, galons et volutes d'or */
  s+=P('M64 66Q80 60 96 66L98.4 98Q96 112 80 116Q64 112 61.6 98Z',CR(q))+P('M74.6 64.4Q80 70.6 85.4 64.4L80 74Z',SK(q))+L_('M74.8 65.2L80 73.4L85.2 65.2',AU(q),.45,'opacity=".85"');
  s+=P('M65.2 84Q80 89 94.8 84L96.6 112Q80 119 63.4 112Z',BU(q))+L_('M65.2 84Q80 89 94.8 84',AU(q),.85)+L_('M63.4 112Q80 119 96.6 112',AU(q),.85)
    +L_('M76.6 89.6L83.4 94M83.4 89.6L76.6 94M76.6 96L83.4 100.4M83.4 96L76.6 100.4M76.6 102.4L83.4 106.8M83.4 102.4L76.6 106.8',AU(q),.6)
    +L_('M67.6 92.6Q70 89.6 72.2 91.8Q73 94.8 70.2 95.4Q68.4 95.2 68.8 93.6M92.4 92.6Q90 89.6 87.8 91.8Q87 94.8 89.8 95.4Q91.6 95.2 91.2 93.6M68.4 104.6Q70.8 101.6 73 103.8Q73.8 106.8 71 107.4M91.6 104.6Q89.2 101.6 87 103.8Q86.2 106.8 89 107.4',AU(q),.5,'opacity=".95"');
  s+=P('M62.4 112.6Q80 120 97.6 112.6L98 117Q80 124.6 62 117Z','#5a3a24')+L_('M62.6 113.2Q80 120.6 97.4 113.2',AU(q),.5,'opacity=".8"')
    +C_(80,118.6,3.2,AU(q),'stroke="#8a5a1a" stroke-width=".4"')+C_(80,118.6,1.9,TG(q))+C_(79.4,118,.45,'#fff');
  /* courte cape et capuchon sur les épaules, galonnés d'or */
  s+=P('M60 64Q48 76 46 104Q56 98 64 100L68 70Z',TL(q))+P('M100 64Q112 76 114 104Q104 98 96 100L92 70Z',TL(q))
    +L_('M46 104Q56 98 64 100M114 104Q104 98 96 100',AU(q),.9)+L_('M59.8 64.4Q48.4 76 46.4 103.4M100.2 64.4Q111.6 76 113.6 103.4',AU(q),.6,'opacity=".8"')
    +L_('M48.2 100.4Q56 95.8 63.4 97.4M111.8 100.4Q104 95.8 96.6 97.4','#ffe9a0',.5,'stroke-dasharray=".1 1.9" opacity=".9"');
  s+=P('M66 54.6Q80 62.6 94 54.6L98.6 66.6Q80 74.6 61.4 66.6Z',TL(q))+L_('M66 54.6Q80 62.6 94 54.6','#0a5450',.6)+L_('M61.8 66.4Q80 74.2 98.2 66.4',AU(q),.8)+L_('M63.8 63.4Q80 70.6 96.2 63.4','#ffe9a0',.45,'stroke-dasharray=".1 1.9" opacity=".9"')
    +lyreG(q,68.2,66.4,.58);
  /* bras : manches bouffantes cerclées d'or, une main sur les cordes, l'autre sur le manche */
  /* bras droit : l'épaule, puis le coude près de la hanche */
  s+=E_(57.6,82,7.4,9,CR(q),'stroke="#d4b896" stroke-width=".5"')+L_('M51.4 87Q57.4 91.6 63.2 87.4',AU(q),.8)+P('M53.6 88Q50.6 100 52 111L59.8 111.6Q60.6 100 61.2 91Z',SK(q))+L_('M53.4 92Q51.6 101 52.6 109','#d09878',.5,'opacity=".6"');
  /* bras gauche : levé, la main tient le manche du luth */
  s+=E_(102.4,81,7.2,8.6,CR(q),'stroke="#d4b896" stroke-width=".5"')+L_('M96.6 86.6Q102.4 90.8 108.2 86.2',AU(q),.8)+P('M103 86.6L109.6 84.4L116.6 98.6L110.2 101.8Z',SK(q))+P('M110.2 101.8L116.6 98.6L124.8 83.4L118.8 80.6Z',SK(q))
    +L_('M110.4 100.6L117.6 84.4','#d09878',.5,'opacity=".55"')+P('M117.6 86.4L123.8 89.6L124.8 87.8L118.6 84.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"');
  /* le luth, tenu devant elle */
  s+=`<g transform="translate(28 -40)">${lute(q,u)}</g>`;
  /* les doigts sur le manche, et l'avant-bras droit posé sur le luth, la main sur les cordes */
  s+=E_(121.6,79.6,3.6,3,SK(q),'transform="rotate(-30 121.6 79.6)"')+L_('M119.2 77.4L123.8 76.2M119 79.6L124.2 78.6M119.4 81.8L124 81','#d09878',.5);
  s+=P('M52.2 108.8Q62 122 73.4 133.6L78.6 129.4Q67.6 118 59.8 107.4Z',SK(q))+L_('M53.4 110.4Q63 122 73.6 132','#d09878',.5,'opacity=".55"')
    +E_(77.4,133.4,3.8,3.1,SK(q),'transform="rotate(35 77.4 133.4)"')+L_('M75.6 135.8L79.4 131.8M77.4 137L80.8 133.4','#d09878',.45)
    +P('M50.6 106.4Q56 103.6 61.4 106.6L61 110.4Q56 108.6 51 111Z',CR(q),'stroke="#d4b896" stroke-width=".4"')+L_('M51 110.6Q56 108.4 61 110.2',AU(q),.7);
  /* la tête et la tresse */
  s+=HG(face(q,u)+braid(q,36.2,62,8,1));
  if(u>=3)s+=E_(80,15.4,10,2.6,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(80,15.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
  if(u&&!bare)[[14,40,2],[146,56,1.8],[16,140,1.6],[144,150,1.8],[24,186,1.5]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  s+='</svg>';return LC[ck]=s}

/* ---------- branchements ---------- */
window.lyraPortrait=lyraPortrait;window.lyraBody=lyraBody;window.lyraNote=NOTE;
try{Object.defineProperty(PCACHE,LYR,{get:()=>lyraPortrait(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===LYR)return lyraPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===LYR)return lyraBody(u);return hb.apply(this,arguments)}}
try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+LYR+'(_|$)').test(k))delete C[k]}catch(e){}
}catch(e){console.warn('lyra art',e)}})();

/* ---------- la mécanique : Chant de l'Aube, Contre-Chant et Refrain ---------- */
(function(){try{
if(!HEROES[LYR])return;
try{SHAPES.note=(c,s,f)=>{c.fillStyle=f;c.strokeStyle=f;c.lineWidth=Math.max(1,s*.28);c.lineCap='round';c.beginPath();c.ellipse(0,s*.6,s*.62,s*.44,-.4,0,7);c.fill();c.beginPath();c.moveTo(s*.52,s*.5);c.lineTo(s*.52,-s*1.4);c.quadraticCurveTo(s*1.4,-s*.9,s*1.25,-s*.2);c.stroke()}}catch(e){}
const MT="Contre-Chant : retire # énergie à tous les ennemis.";
{const sd=skillDesc;skillDesc=function(sk){const r=sd.apply(this,arguments);try{if(sk&&sk.fx&&sk.fx.mute)return r+' '+MT.replace('#',sk.fx.mute)}catch(e){}return r}}
{const sk1=skill;skill=function(u,sk,sc){const r=sk1.apply(this,arguments);try{if(B&&u&&sk&&sk.fx&&sk.fx.mute){const m=sk.fx.mute;let n=0;for(const t of alive(1-u.side)){if(t.en>0){t.en=Math.max(0,t.en-m);n++}float(t,'♪ −'+m,'info')}
  log(`🎶 <b>${u.name}</b> entonne le Contre-Chant : les ennemis perdent ${m} énergie.`,'sk')}}catch(e){}return r}}
/* Refrain : chaque attaque normale donne 10 énergie à l'allié qui en a le moins */
{const a0=act;act=async function(u){const basic=!!(B&&u&&u.hid===LYR&&u.hp>0&&!(u.stun>0)&&!(u.en>=100&&u.sk));const r=await a0.apply(this,arguments);
  try{if(basic&&B&&!B.done&&u.hp>0){const al=alive(u.side).filter(a=>a!==u&&a.en<100);if(al.length){const t=al.reduce((a,b)=>a.en<=b.en?a:b);t.en=Math.min(100,t.en+10);float(t,'♪ +10','heal');if(!B.skip)refreshUnits()}}}catch(e){}return r}}
const LY_PAS=`<div class="skill lypas"><div class="sn">🎶 Refrain</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.05em">PASSIF</div><div style="margin-top:4px">Chaque attaque normale de Lyra donne <b>10 énergie</b> à l'allié qui en a le moins.</div></div>`;
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===LYR){const m=$('#ovl .modal');const sk=m&&m.querySelector('.skill');if(sk&&!m.querySelector('.lypas'))sk.insertAdjacentHTML('afterend',LY_PAS)}}catch(e){}return r}}
/* effets : prélude et final de la compétence, et l'ultra-évolution « Symphonie de l'Aube » */
try{ULXD[LYR]={pre(u,tg,ux){const a=uc(u);FXD.sigil(a.x,a.y+a.s*.5,a.s*1.2,'#5ad8c8',1400);FXD.skyband(['rgba(90,216,200,.55)'],1300,.3);shapes(a.x,a.y,'note',['#ffffff','#a8f0e0','#ffd84a'],14,5,6,70,-.03)},
  post(u,tg,ux){for(const x of alive(u.side)){const b=uc(x);FXD.rings(b.x,b.y,'#5ad8c8',2,b.s*.5);shapes(b.x,b.y-b.s*.3,'note',['#ffffff','#ffd84a'],4,2.4,5,60,-.05)}for(const t of tg){const b=uc(t);ringFx(b.x,b.y,'#2a6a8a',b.s*.6,500,3)}}}}catch(e){}
try{ULX[LYR]={n:"Symphonie de l'Aube",el:'holy',c:['#5ad8c8','#ffd84a'],ic:'🎶',logic(u,tg,sc,k){for(const a of alive(u.side)){heal(a,a.max*.05*k);if(a!==u)a.en=Math.min(100,a.en+Math.round(6*k))}let t0=0;for(const t of tg)t0+=deal(u,t,25*k*sc,{sk:1,ub:1});return t0},
  async fx(u,tg,ux){const a=uc(u);vignette('#0a4a4a',1100,.35);try{ULXD[LYR].pre(u,tg,ux)}catch(e){}FXD.rain('note',['#ffffff','#a8f0e0','#ffd84a'],22+ux*6,900,6,.12,{add:1});await fxWait(480);
   for(const x of alive(u.side)){const b=uc(x);magicCircle(b.x,b.y+b.s*.4,['#5ad8c8','#ffd84a','#ffffff'],b.s*.85,900);glowPulse(b.x,b.y,'#5ad8c8',700,b.s*.6)}for(const t of tg){const b=uc(t);ringFx(b.x,b.y,'#ffd84a',b.s*.7,600,5);shapes(b.x,b.y,'note',['#ffd84a','#ffffff'],10+ux*3,6,6,60,.05)}await fxWait(380)}}}catch(e){}
try{STL[LYR]=["Lyra voyage de village en village avec son luth. Elle n'a jamais tenu une épée. On raconte que quand elle chante, les blessés se relèvent et les enfants arrêtent d'avoir peur. Elle croyait que c'était une jolie légende.",
 "Quand les cendres ont éteint le cœur de son village, elle a joué pour ne pas devenir folle dans le silence… et la cendre a cessé de tomber. Sa mélodie vient de la Tour Blanche, il y a mille ans : c'est le contraire du cor du Héraut.",
 "Depuis, elle chante avec la Garde d'Éther. C'est elle qui a appris aux chevaliers la chanson du feu de camp, celle sur les murs, les serments… et la soupe ratée."]}catch(e){}
try{AFF.push({n:'La Voix et le Bouclier',ic:'🎶',ids:[LYR,AEG],need:2,fx:{en:20,hp:.05},d:'+20 énergie au départ, +5 % PV',q:"Lyra : « Tu tiens le mur, je tiens la note. » — Aegis : « Marché conclu. »"},
 {n:'Les Artistes',ic:'🎭',ids:[LYR,56,67],need:2,fx:{crit:.06,en:15},d:'+6 % critique, +15 énergie au départ',q:"Fortuna : « Une chanteuse à ma table ? Le public va adorer. »"})}catch(e){}
const st=document.createElement('style');st.textContent=`.lypas{border-color:rgba(90,216,200,.55)!important}`;document.head.appendChild(st);
}catch(e){console.warn('lyra meca',e)}})();
