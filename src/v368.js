
/* ================= AEGIS LE PALADIN JURÉ : commandant de la Garde d'Éther =================
   Tank légendaire exclusif de l'événement « L'Éveil du Roi de Cendre » (chronique de la Garde d'Éther).
   Compétence « Serment du Bouclier » : boucliers sur l'équipe, provocation, et pendant 2 tours
   il s'interpose devant tout coup qui achèverait un allié (il n'en encaisse que la moitié).
   Dessin sur mesure : armure blanche et or, cape azur, grand bouclier à l'étoile d'Éther. Léger (aucun filtre). */
const AEG=69;
(function(){try{
if(!(typeof ashOn==='function'&&ashOn())||HEROES[AEG]||HEROES.length!==AEG)return;
HEROES.push({i:AEG,n:'Aegis le Paladin Juré',c:'Tank',r:4,ex:1,exd:"Termine la Chronique de la Garde d'Éther (événement « L'Éveil du Roi de Cendre ») pour qu'il rejoigne ton équipe.",sk:{n:'Serment du Bouclier',tg:'self',fx:{shield:200,taunt:2,guard:2}}});
LOOKS[AEG]=['#f2cfb2','#4a3424','#e8ecf4','#2a6ad8','#ffd84a','#4f74b0','bg:holy back:cape hair:short eyes:normal mouth:neutral body:heavy ear:human'];
try{UTH_H[AEG]={n:"Rempart d'Éther",m:'#e8ecf4',s:'#ffd84a',a:'#3a86ff',e:'#ffd84a',bg:'holy',w:'wings-gold',hat:'halo',fx:'stars',c:'#ffd84a',c2:'#8ac8ff',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('aegis',e)}})();

(function(){try{
if(!HEROES[AEG])return;
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const MB=s=>s+`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
const GOLD='#ffd84a',EC={};
const star8=(cx,cy,R,r,rot=0)=>{let d='';for(let i=0;i<16;i++){const a=(i*22.5+rot-90)*Math.PI/180,k=i%2?r:R;d+=(i?'L':'M')+r1(cx+k*Math.cos(a))+' '+r1(cy+k*Math.sin(a))}return d+'Z'};
const defs=(q,u)=>`<radialGradient id="${q}bg" cx="50%" cy="34%" r="74%"><stop offset="0" stop-color="${u>=3?'#fffbe8':'#fff3c8'}"/><stop offset=".16" stop-color="#9ad0ff"/><stop offset=".42" stop-color="#3a6ad0"/><stop offset=".74" stop-color="#18286a"/><stop offset="1" stop-color="#0a1030"/></radialGradient>
<radialGradient id="${q}gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".5" stop-color="#ffe9a0" stop-opacity=".45"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient>
<radialGradient id="${q}g2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd84a" stop-opacity=".45"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient>
<linearGradient id="${q}pl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${u>=3?'#fffbea':'#ffffff'}"/><stop offset=".35" stop-color="${u>=3?'#f6ead0':'#e4e9f1'}"/><stop offset=".75" stop-color="${u>=3?'#d6c08a':'#b2bccc'}"/><stop offset="1" stop-color="${u>=3?'#a08648':'#7d899f'}"/></linearGradient>
<linearGradient id="${q}au" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".5" stop-color="#ffd84a"/><stop offset="1" stop-color="#c8901a"/></linearGradient>
<linearGradient id="${q}az" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a86ff"/><stop offset=".55" stop-color="#1e4fbf"/><stop offset="1" stop-color="#142c70"/></linearGradient>
<linearGradient id="${q}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#f6d6bc"/><stop offset=".55" stop-color="#eac4a6"/><stop offset="1" stop-color="#c99a7c"/></linearGradient>
<linearGradient id="${q}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5e4634"/><stop offset="1" stop-color="#36261c"/></linearGradient>
<linearGradient id="${q}bl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#dfe6f2"/><stop offset="1" stop-color="#97a3b8"/></linearGradient>`;
const AU=q=>`url(#${q}au)`,PL=q=>`url(#${q}pl)`,AZ=q=>`url(#${q}az)`;
const glow=(q,x,y,r,op=1)=>C_(x,y,r,`url(#${q}g2)`,`opacity="${op}"`);
const STARP=(x,y,r,c='#fff')=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,c,'opacity=".9"');
/* l'étoile d'Éther, emblème de la Garde */
const emblem=(q,x,y,R,u)=>(u?glow(q,x,y,R*2.2,.55+u*.12):'')+C_(x,y,R*1.25,'#16306e',`stroke="${AU(q)}" stroke-width="${r1(R*.16)}"`)+P(star8(x,y,R,R*.4),AU(q))+C_(x,y,R*.28,'#ffffff');

/* ---------- la tête (coordonnées du portrait 100×100) ---------- */
function hairBack(q){return P('M34.4 46Q32.6 30.6 41.6 25.4Q50 21.2 58.4 25.4Q67.4 30.6 65.6 46Q65.2 41 63 37.4L37 37.4Q34.8 41 34.4 46Z',`url(#${q}hr)`)}
function face(q,u){
  let s=`<rect x="44.6" y="55" width="10.8" height="12" fill="url(#${q}sk)"/>`+P('M44.6 59.4Q50 63 55.4 59.4L55.4 64.6Q50 66.8 44.6 64.6Z','#b88a6c','opacity=".7"');
  s+=MI(P('M36 43.8Q32.2 43.4 32.6 47.8Q33.2 51.6 36.6 51.4Z','#e2b294')+L_('M35.2 45.4Q33.8 46.8 34.8 49.2','#b0806a',.45));
  s+=P('M35.4 44Q35.4 29.6 50 29.6Q64.6 29.6 64.6 44Q64.6 53.4 61 59.2Q56.4 65.6 50 66.2Q43.6 65.6 39 59.2Q35.4 53.4 35.4 44Z',`url(#${q}sk)`);
  s+=P('M58.8 46Q62.6 52 59.8 58.6Q57 62.6 53 64.6Q58.4 59.6 60 52.6Z','#c08a6c','opacity=".45"');
  /* les yeux : normaux, gris-bleu, un regard calme */
  const eye=x=>{const d=x<50?1:-1,ix=r1(x+.2*d);return P(`M${r1(x-3.3*d)} 47.1Q${x} 44.9 ${r1(x+3.3*d)} 46.7Q${ix} 48.7 ${r1(x-3.3*d)} 47.1Z`,'#f8f4ee')
    +C_(ix,46.9,1.5,u>=3?'#c89a2a':'#4f74b0')+C_(ix,46.9,.65,'#12182a')+C_(r1(x-.3*d),46.4,.42,'#fff')
    +L_(`M${r1(x-3.5*d)} 46.9Q${x} 44.4 ${r1(x+3.5*d)} 46.5`,'#2a1c16',.95)+L_(`M${r1(x-2.6*d)} 48.7Q${x} 49.5 ${r1(x+2.6*d)} 48.5`,'#c08a6c',.4,'opacity=".6"')};
  s+=eye(44)+eye(56)+MI(L_('M39.4 41.8Q43.2 40.2 47.8 42.6','#3a2a20',1.75));
  s+=L_('M50.6 47.8L49.4 53.6Q50.4 54.6 52 53.8','#b88a6c',.75)+P('M48.8 53.8Q50.4 55.2 52.2 54Q50.6 54.8 48.8 53.8Z','#b0806a','opacity=".6"');
  /* barbe courte, moustache, mèche grise au menton */
  s+=P('M36.8 50.4Q37.4 57 41 61.4Q45 66.4 50 67.6Q55 66.4 59 61.4Q62.6 57 63.2 50.4Q62 55.4 59.2 57.6Q56 59.4 53.6 59.2Q50 61.6 46.4 59.2Q44 59.4 40.8 57.6Q38 55.4 36.8 50.4Z','#4a3628')
    +L_('M39.4 56.6Q42 60.6 46 63M60.6 56.6Q58 60.6 54 63M44.4 64.4Q47.4 66.2 50 66.4','#6a5040',.45,'opacity=".8"')
    +P('M48.2 63.4Q50 66.4 51.8 63.4L51.2 66.6Q50 67.4 48.8 66.6Z','#b0a49a','opacity=".85"');
  s+=P('M44.8 57.4Q47.6 55.6 50 56.6Q52.4 55.6 55.2 57.4Q52.6 58.6 50 58.1Q47.4 58.6 44.8 57.4Z','#4a3628');
  s+=L_('M47.2 60.2Q50 61.2 52.8 60.2','#8a5a4a',.8)+L_('M48.6 61.4Q50 61.9 51.4 61.4','#d8a890',.5,'opacity=".7"');
  /* la cicatrice du sourcil */
  s+=L_('M57.4 38.4L61 45.2','#b06a5a',1)+L_('M57.6 38.6L60.8 45','#eab0a0',.45);
  /* cheveux courts tirés en arrière, tempes grises */
  s+=MI(P('M35.6 46.6Q35.4 51 37.6 54.6L39 53Q37.4 50.2 37.2 46.8Z','#4a3628'));
  s+=P('M36 41Q35.6 31.6 42.2 27.2Q50 23.6 57.8 27.2Q64.4 31.6 64 41Q62.4 35.4 58.4 33Q53.8 30.6 50 31.4Q45.4 30.6 41.8 33Q37.6 35.6 36 41Z',`url(#${q}hr)`)
    +L_('M42 28.8Q46 27.2 50.6 27.6M48 27.4Q53.4 26.8 58 29.4M40.6 32.4Q44.6 30 49 30.2M52.4 30.4Q57 30.6 61 34','#7a6050',.5,'opacity=".9"');
  s+=MI(P('M35.8 40.4Q35.2 44 36.2 46.6Q37 43.6 38 41.2Z','#c8c0b8')+L_('M36.4 37.6Q37 35.4 38.4 34.2','#c8c0b8',.6));
  return s}
/* ---------- buste du portrait ---------- */
function bust(q,u){
  let s=P('M8 100Q10 82 22 74L78 74Q90 82 92 100Z',AZ(q))+P('M12 100Q14 86 24 78L28 100Z','#0f1f4f','opacity=".6"')+P('M88 100Q86 86 76 78L72 100Z','#0f1f4f','opacity=".6"');
  s+=P('M22 100L24.6 82Q29.6 72 41.6 69.4L58.4 69.4Q70.4 72 75.4 82L78 100Z',PL(q))+L_('M50 74V100','#8a96aa',.8)+L_('M31.6 80.4Q50 86.4 68.4 80.4',AU(q),.7,'opacity=".85"');
  s+=P('M43 76L57 76L58 100L42 100Z',AZ(q))+L_('M43 76L42 100M57 76L58 100',AU(q),.75)+emblem(q,50,87,5.8,u);
  s+=P('M40.6 62.6Q50 67.6 59.4 62.6L61.8 70.6Q50 76 38.2 70.6Z',PL(q))+L_('M40.6 62.6Q50 67.6 59.4 62.6',AU(q),.8)+L_('M38.2 70.6Q50 76 61.8 70.6',AU(q),.75)+C_(50,72.6,1.3,AU(q));
  const pl=P('M9 92Q11 79 24 74.4Q35 72 41 78Q34.6 85.6 25.6 89.2Q17 92.6 9 92Z',PL(q))+L_('M9.8 91.4Q18 91.6 25.6 88.6Q34 85 40.4 78.4',AU(q),.8)
    +P('M11.6 83.6Q14.6 71 27.4 67.6Q37.6 66.4 41.6 72.6Q35.6 79 27.6 82Q19.2 85 11.6 83.6Z',PL(q))+L_('M12.2 83.2Q19.8 84.2 27.6 81.6Q35.4 78.6 41 73',AU(q),.8)
    +P('M15 75.4Q18.8 63 31.2 61.4Q40.6 61.4 43.6 67Q37.6 72.6 29.6 75.2Q21.4 77.4 15 75.4Z',PL(q))+L_('M16.4 72.8Q20.4 64.2 31.2 62.4Q38.8 62.4 42.8 66.4','#ffffff',.6,'opacity=".9"')+L_('M15.6 75.2Q22.4 76.6 29.6 74.6Q37.4 71.8 43.2 67.4',AU(q),.8)
    +C_(25.4,69.4,.9,AU(q))+C_(31,67.8,.9,AU(q))+C_(36.4,67.6,.9,AU(q));
  return s+MI(pl)}
/* ---------- ailes de lumière (ultra II et III) ---------- */
function feather(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),nx=-sn,ny=c,tx=R[0]+len*c,ty=R[1]+len*sn,mx=R[0]+len*.58*c,my=R[1]+len*.58*sn;
  return P(`M${r1(R[0]+nx*1.6)} ${r1(R[1]+ny*1.6)}Q${r1(mx+nx*wd)} ${r1(my+ny*wd)} ${r1(tx)} ${r1(ty)}Q${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)} ${r1(R[0]-nx*1.6)} ${r1(R[1]-ny*1.6)}Z`,fill,`stroke="${edge}" stroke-width="${ew}" stroke-linejoin="round"`)}
function wings(q,u){const R=[36,62];let w='';
  [[-176,45],[-157,52],[-138,56],[-119,52],[-101,45]].forEach(([a,l],k)=>{w+=feather(R,a,l,6.2,k%2?'#fff6d8':'#ffe9a8','#c8901a',.5)});
  [[-166,30],[-146,34],[-126,33],[-107,27]].forEach(([a,l])=>{w+=feather(R,a,l,5.6,'#ffffff','#e0b040',.4)});
  return `<g opacity="${u>=3?.95:.82}">${MI(w)}</g>`}
/* ---------- décor ---------- */
function rays(cx,cy,n,len,op,col){let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+16)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,col,`opacity="${op}"`)}return s}
function frame(){const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17','#ffe08a',1,'opacity=".95"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4','#8ac8ff',.5,'opacity=".8"')+P('M1.4 1.4h3.2v3.2z','#fff6c8','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')}
const PART=[[11,20,.7],[88,16,.6],[18,46,.5],[83,47,.6],[7,64,.5],[94,60,.55],[28,10,.45],[72,8,.5],[14,33,.4],[90,34,.45],[24,56,.4]];
const ROMN=['','I','II','III'];
function aegisPortrait(u){u=Math.max(0,Math.min(3,u|0));if(EC['p'+u])return EC['p'+u];const q='ap'+u+'_';
  const rc=(typeof RCOL!=='undefined'&&RCOL[4])||GOLD,cc=(typeof CLS!=='undefined'&&CLS.Tank&&CLS.Tank.c)||'#4f7cff',TC='#ffd84a';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Aegis le Paladin Juré"><defs>${defs(q,u)}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  s+=rays(50,35,12,80,.08,'#ffffff')+C_(50,35,30+u*2,`url(#${q}gl)`)+P(star8(50,35,31,13,0),'none',`stroke="#ffe08a" stroke-width=".8" opacity="${.45+u*.1}"`)+C_(50,35,22.8,'none','stroke="#ffe9a0" stroke-width=".9" opacity=".75"');
  if(u>=3)s+=C_(50,35,26.4,'none','stroke="#ffffff" stroke-width=".6" stroke-dasharray="1.4 2.6" opacity=".85"');
  s+=PART.slice(0,7+u).map(([x,y,r],k)=>C_(x,y,r,k%2?'#fff6c8':'#bfe2ff','opacity=".9"')).join('');
  if(u>=2)s+=wings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u);
  if(u>=3)s+=E_(50,20.6,11,2.8,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(50,20.6,11,2.8,'none','stroke="#ffffff" stroke-width=".5"');
  s+=frame();
  if(u){[[16,30,2.2],[84,22,1.8],[22,70,1.4],[78,58,1.6],[50,6,1.2]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
    s+=`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
  s+=`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/><path d="M86 77L93 80Q93 88 86 92Q79 88 79 80Z" fill="${cc}"/></svg>`;
  return EC['p'+u]=s}
/* ---------- corps entier (cadre 160×244) ---------- */
function aegisBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(EC[ck])return EC[ck];const q='ab'+u+(bare?'s':'')+'_';
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Aegis le Paladin Juré en pied"><defs>${defs(q,u)}<radialGradient id="${q}bb" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#bfe2ff" stop-opacity="${.4+u*.08}"/><stop offset=".55" stop-color="#2a4aa0" stop-opacity=".3"/><stop offset="1" stop-color="#0a1030" stop-opacity="0"/></radialGradient></defs>`;
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,`url(#${q}gl)`,'opacity=".55"')}${P(star8(80,36,34,14),'none','stroke="#ffe08a" stroke-width="1" opacity=".5"')}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,36,14,120,.06,'#ffffff')}${C_(80,36,42+u*3,`url(#${q}gl)`,'opacity=".8"')}${P(star8(80,36,36,15),'none',`stroke="#ffe08a" stroke-width="1.1" opacity="${.5+u*.1}"`)}${C_(80,36,27.5,'none','stroke="#ffe9a0" stroke-width="1.2" opacity=".75"')}`;
    if(u>=1)s+=C_(80,36,46+u*4,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=[...Array(6)].map((_,k)=>{const x=24+k*22.4,d=3.6+(k%3)*.9;return`<circle r="${(.8+(k%3)*.4).toFixed(1)}" fill="${k%2?'#fff6c8':'#bfe2ff'}" opacity=".85"><animateMotion dur="${d}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${r1(x)} 214q${k%2?6:-6} -60 ${k%2?-4:4} -150"/></circle>`}).join('')+`</g>`}
  s+=E_(80,219,40,6,'#000','opacity=".45"');
  if(u>=2)s+=`<g transform="translate(12.5 -15) scale(1.35)">${wings(q,u)}</g>`;
  /* cape azur */
  s+=P('M62 62Q50 120 42 208Q61 214 80 212Q99 214 118 208Q110 120 98 62Z',AZ(q))+P('M62 64Q53 120 47 204L53 206Q58 128 67 70Z','#0f1f4f','opacity=".55"')+P('M98 64Q107 120 113 204L107 206Q102 128 93 70Z','#0f1f4f','opacity=".55"')
    +L_('M42 208Q61 214 80 212Q99 214 118 208',AU(q),1.1);
  s+=HG(hairBack(q));
  /* jambes en acier */
  const leg=P('M65.4 128L76.6 128L75.4 168L74.4 202L65.6 202L65 168Z',PL(q))+L_('M66.8 134L66.2 166M75 134L74.4 166','#8a96aa',.6)
    +E_(70,166,6,4.6,PL(q),'stroke="#7d899f" stroke-width=".5"')+L_('M64.2 167Q70 171 75.8 167',AU(q),.7)+C_(70,165.6,1.1,AU(q))
    +P('M63.4 200L75.2 200L75.6 209L57.4 211.4Q58.4 205.6 63.4 200Z','#c9d1de','stroke="#7d899f" stroke-width=".5"')+L_('M58 210.6L75.4 208.6',AU(q),.7);
  s+=MB(leg);
  /* tassettes, tabard azur à l'étoile */
  s+=P('M60 116Q80 123.6 100 116L102.4 134Q80 141.6 57.6 134Z',PL(q))+L_('M58.8 125Q80 132 101.2 125','#8a96aa',.7)+L_('M57.6 134Q80 141.6 102.4 134',AU(q),.85);
  s+=P('M72.4 118L87.6 118L89 190L80 196L71 190Z',AZ(q))+L_('M71 190L80 196L89 190M72.4 118L71 190M87.6 118L89 190',AU(q),.8)+P(star8(80,156,5,2),AU(q))+C_(80,156,1.2,'#fff');
  /* plastron */
  s+=P('M62 64Q80 58.6 98 64L99.6 96Q96.4 114 80 119Q63.6 114 60.4 96Z',PL(q))+L_('M80 66V117','#8a96aa',.8)+L_('M64.6 78Q80 84.4 95.4 78',AU(q),.75,'opacity=".9"')+L_('M66 101Q80 106.6 94 101','#8a96aa',.6)
    +L_('M63.4 70Q66 90 64 104','#ffffff',.9,'opacity=".7"')+emblem(q,80,90,7.2,u);
  s+=P('M61.4 110.6Q80 118 98.6 110.6L98.6 116Q80 123.4 61.4 116Z','#5a4630')+`<rect x="76" y="112.6" width="8" height="6.6" rx="1.4" fill="${AU(q)}" stroke="#8a5a1a" stroke-width=".6"/>`;
  s+=P('M68.6 51.6Q80 57.4 91.4 51.6L93.8 61.6Q80 68 66.2 61.6Z',PL(q))+L_('M68.6 51.6Q80 57.4 91.4 51.6',AU(q),.8)+L_('M66.2 61.6Q80 68 93.8 61.6',AU(q),.8);
  /* bras droit : la main sur l'épée plantée devant lui */
  s+=P('M54 76Q48.6 94 49.4 112L58.4 112.6Q59 95 62.6 80Z',PL(q))+L_('M50.8 92L59.6 93','#8a96aa',.6)+L_('M54 77Q50 93 50.6 110','#ffffff',.7,'opacity=".7"')
    +E_(53.8,113.6,5.8,4.4,'#c9d1de','stroke="#7d899f" stroke-width=".5"')+L_('M48.4 114.6Q53.8 118 59.2 114.6',AU(q),.6)
    +P('M49.6 116Q48.8 127 49.8 134L57.6 134.4Q58.2 126 58.6 116.6Z',PL(q))+L_('M50 124L58 124.4',AU(q),.6);
  s+=`<rect x="52.2" y="139.6" width="2.8" height="7.6" rx=".6" fill="#5a3a24"/>`+L_('M52.2 141.6L55 142.6M52.2 144L55 145','#8a6a4a',.5)
    +P('M44 147.4Q53.6 145.6 63.2 147.4L63.2 149.8Q53.6 148.6 44 149.8Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+C_(44,148.6,1.4,AU(q))+C_(63.2,148.6,1.4,AU(q))
    +P('M51.6 150.2L55.6 150.2L55.2 204L53.6 211L52 204Z',`url(#${q}bl)`,'stroke="#6a7488" stroke-width=".4"')+L_('M53.6 152V201','#8a96aa',.6)
    +(u?L_('M53.6 152V201','#ffe08a',.5,`opacity="${.3+u*.2}"`):'')
    +E_(53.6,136.8,5.6,5,'#d6dce6','stroke="#7d899f" stroke-width=".5"')+L_('M49.2 135.4Q53.6 133.4 58 135.4M49 138.4Q53.6 136.6 58.2 138.4','#8a96aa',.6)+C_(53.6,132.4,2.2,AU(q));
  /* bras gauche : derrière le grand bouclier */
  s+=P('M106 76Q111.4 94 110.6 112L101.6 112.6Q101 95 97.4 80Z',PL(q))+L_('M109.2 92L100.4 93','#8a96aa',.6)+E_(106.2,113.6,5.8,4.4,'#c9d1de','stroke="#7d899f" stroke-width=".5"');
  /* épaulières */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z',PL(q))+L_('M46.2 89.4Q52 89.2 57.2 86.4Q63.8 83 69.2 77',AU(q),.7)
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',PL(q))+L_('M48.4 82.2Q54.4 82.4 60.6 80Q66.8 77.4 71.8 73.4',AU(q),.7)
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',PL(q))+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#ffffff',.6,'opacity=".9"')+L_('M51.2 74.2Q56.6 75.2 62.6 73.4Q68.8 71.2 74 67.4',AU(q),.7)
    +C_(57.6,69.4,.8,AU(q))+C_(62.6,67.8,.8,AU(q))+C_(67.6,67.4,.8,AU(q));
  s+=MB(pa);
  /* le grand bouclier à l'étoile, planté devant lui */
  const so='M96 100Q114 93 132 100L131 174Q124 196 114 206Q104 196 97 174Z',si='M98.6 102.6Q114 96.4 129.4 102.6L128.6 172.6Q122.4 192.4 114 201.4Q105.6 192.4 99.4 172.6Z';
  s+=P(so,PL(q),'stroke="#4a556a" stroke-width=".7"')+P(si,AZ(q))+L_(si,AU(q),.9)+L_('M101 108L110.6 99.8','#ffffff',1.2,'opacity=".5"')
    +[[99.6,104.4],[128.4,104.4],[99.6,170],[128.4,170],[114,199]].map(([x,y])=>C_(x,y,.9,AU(q))).join('')+emblem(q,114,140,9,u)
    +(u>=1?L_('M114 112V126M114 154V176M100.6 140H104M124 140H127.4',AU(q),.8,`opacity="${.5+u*.15}"`):'');
  /* la tête */
  s+=HG(face(q,u));
  if(u>=3)s+=E_(80,15.4,10,2.6,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(80,15.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
  if(u&&!bare)[[10,40,2.2],[150,58,1.8],[14,140,1.6],[146,150,1.8],[80,-4,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  s+='</svg>';return EC[ck]=s}

/* ---------- branchements ---------- */
window.aegisPortrait=aegisPortrait;window.aegisBody=aegisBody;
try{Object.defineProperty(PCACHE,AEG,{get:()=>aegisPortrait(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===AEG)return aegisPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===AEG)return aegisBody(u);return hb.apply(this,arguments)}}
try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+AEG+'(_|$)').test(k))delete C[k]}catch(e){}
}catch(e){console.warn('aegis art',e)}})();

/* ---------- la mécanique : le Serment du Bouclier ---------- */
(function(){try{
if(!HEROES[AEG])return;
const GT="Pendant 2 tours, il s'interpose devant tout coup qui mettrait un allié K.O. : Aegis n'en encaisse que la moitié.";
{const sd=skillDesc;skillDesc=function(sk){const r=sd.apply(this,arguments);try{if(sk&&sk.fx&&sk.fx.guard)return r+' '+GT}catch(e){}return r}}
/* l'allié qui devrait tomber est protégé : Aegis prend la moitié du coup à sa place */
const guardOf=t=>B&&B.units.find(x=>x.hid===AEG&&x.side===t.side&&x!==t&&x.hp>0&&x.guard>0);
{const h2=hurt;hurt=function(t,d,c){try{if(B&&t&&t.hp>0&&d>0&&t.hid!==AEG){const eff=d-Math.min(t.sh>0?t.sh:0,d);if(t.hp-eff<=0){const A=guardOf(t);
  if(A){A.gsave=(A.gsave||0)+1;log(`🛡️ <b>${A.name}</b> s'interpose devant <b>${t.name}</b> et encaisse le coup à sa place !`,'cs');float(t,'🛡️ PROTÉGÉ','heal');if(!B.skip)try{guardFx(A,t)}catch(e){}
   return h2.call(this,A,Math.max(1,Math.round(d*.5)),c)}}}}catch(e){}return h2.apply(this,arguments)}}
{const sk1=skill;skill=function(u,sk,sc){const r=sk1.apply(this,arguments);try{if(B&&u&&sk&&sk.fx&&sk.fx.guard){u.guard=Math.max(u.guard||0,sk.fx.guard+1+((u.ux||0)>=3?1:0));float(u,'Serment !','info');
  log(`🛡️ <b>${u.name}</b> prête serment : tant qu'il est debout, aucun allié ne tombera.`,'sk')}}catch(e){}return r}}
{const a0=act;act=async function(u){const r=await a0.apply(this,arguments);try{if(u&&u.guard>0){u.guard--;if(!u.guard&&B)refreshUnits()}}catch(e){}return r}}
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B)for(const u of B.units){if(u.hid!==AEG)continue;const el=document.getElementById('u-'+u.key);if(!el)continue;const on=u.guard>0&&u.hp>0;
  el.classList.toggle('aegon',on);if(on){const sx=el.querySelector('.sx');if(sx)sx.insertAdjacentHTML('beforeend','<span style="color:#ffd84a">SERMENT</span>')}
  for(const a of B.units)if(a.side===u.side&&a!==u){const e2=document.getElementById('u-'+a.key);if(e2)e2.classList.toggle('aegg',on&&a.hp>0)}}}catch(e){}return r}}
function guardFx(A,t){if(typeof REDUCED!=='undefined'&&REDUCED)return;fxSetup();if(!FXS.ctx)return;const a=uc(A),b=uc(t);beamFx(a,b,'#ffd84a',6,480);ringFx(b.x,b.y,'#ffd84a',b.s*.62,520,4);glowPulse(a.x,a.y,'#8ac8ff',520,a.s*.6);textPop(b.x,b.y-b.s*.55,LANG==='en'?'OATH!':'SERMENT !','#ffd84a',18,850);
  const el=document.getElementById('u-'+t.key);if(el){el.classList.add('aegsave');setTimeout(()=>el.classList.remove('aegsave'),800)}}
window.guardFx=guardFx;
/* effets de la compétence (sans ultra-évolution) et ultra-évolution « Rempart d'Éther » */
try{ULXD[AEG]={pre(u,tg,ux){const a=uc(u);FXD.wings(a.x,a.y,a.s*1.1,'#ffd84a',1200);FXD.sigil(a.x,a.y+a.s*.5,a.s*1.2,'#ffd84a',1400);FXD.skyband(['rgba(138,200,255,.6)'],1300,.32)},
  post(u,tg,ux){for(const x of alive(u.side)){const b=uc(x);FXD.rings(b.x,b.y,'#ffd84a',2,b.s*.55)}FXD.streaks('#fff6c0',500,16)}}}catch(e){}
try{ULX[AEG]={n:"Rempart d'Éther",el:'holy',c:['#ffd84a','#8ac8ff'],ic:'🛡️',logic(u,tg,sc,k){for(const a of alive(u.side)){a.sh=(a.sh||0)+Math.round(u.max*.07*k);if(B.track)B.track.sh.add(a)}let t0=0;for(const t of tg)t0+=deal(u,t,30*k*sc,{sk:1,ub:1});return t0},
  async fx(u,tg,ux){const al=alive(u.side);vignette('#ffd84a',1100,.35);try{ULXD[AEG].pre(u,tg,ux)}catch(e){}for(const a of al){const b=uc(a);magicCircle(b.x,b.y+b.s*.4,['#ffd84a','#8ac8ff','#ffffff'],b.s*.9,1000);glowPulse(b.x,b.y,'#ffd84a',800,b.s*.7)}
   await fxWait(460);for(const t of tg){const b=uc(t);ringFx(b.x,b.y,'#ffd84a',b.s*.7,600,5);sparks(b.x,b.y,'#ffd84a',14+ux*4,7)}await fxWait(380)}}}catch(e){}
try{STL[AEG]=["Aegis est entré dans la Garde d'Éther à quinze ans, comme simple porteur de bouclier. C'était le plus lent de sa promotion… et le seul à n'avoir jamais reculé d'un pas.",
 "Devenu Commandant, il récite chaque matin le nom des mille chevaliers tombés. Il a longtemps cru qu'un bon bouclier devait tout encaisser seul, sans jamais rien demander.",
 "Quand les cendres ont envahi le royaume, il a enfin compris la dernière ligne du serment de son ordre : « …et je ne m'y tiendrai jamais seul. » Depuis, il se bat à côté du Porteur."]}catch(e){}
try{AFF.push({n:"La Garde d'Éther",ic:'⚜️',ids:[AEG,44,49],need:2,fx:{atk:.08,tm:.06},d:'+8 % ATQ, −6 % dégâts subis',q:"Aegis : « Bouclier contre bouclier. Personne ne tombe seul. »"},
 {n:'Le Serment et la Flamme',ic:'🔥',ids:[AEG,68],need:2,fx:{hp:.08},d:'+8 % PV',q:"Éryndel : « Mon premier chevalier n'a jamais su me dire non. » — Aegis : « Moi, je saurai. »"})}catch(e){}
const st=document.createElement('style');st.textContent=`.u.aegon .pt{box-shadow:0 0 0 2px #ffd84a,0 0 14px -2px #ffd84a}.u.aegg .pt{box-shadow:0 0 0 1.5px rgba(255,216,74,.55),0 0 10px -3px #ffd84a}
.u.aegsave .pt{animation:aegsv .8s ease-out}@keyframes aegsv{0%{filter:brightness(2.2) sepia(.6)}100%{filter:none}}`;document.head.appendChild(st);
}catch(e){console.warn('aegis guard',e)}})();
