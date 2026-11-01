
/* ================= ÉRYNDEL, LE ROI DE CENDRE : design sur mesure =================
   Portrait, 3 formes ultra et corps entier dessinés à la main (plus de rendu générique).
   Couronne de fer noir aux pointes en fusion, éclipse de feu derrière la tête, cheveux d'argent,
   armure d'obsidienne veinée de braises, cœur de la Flamme volée dans la poitrine,
   grande hache de cendre, cape au bord qui se consume. */
(function(){try{
if(typeof ERY==='undefined'||!HEROES[ERY])return;
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const MB=s=>s+`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const EMB='#ff6a1a';
const EC={};
const defs=(q,u)=>`<radialGradient id="${q}bg" cx="50%" cy="34%" r="74%"><stop offset="0" stop-color="${u>=3?'#ffd27a':'#ff9a3a'}"/><stop offset=".13" stop-color="#e0501a"/><stop offset=".36" stop-color="#6a1608"/><stop offset=".72" stop-color="#1c0607"/><stop offset="1" stop-color="#0a0305"/></radialGradient>
<radialGradient id="${q}gl" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffcf6a" stop-opacity=".95"/><stop offset=".55" stop-color="#ff5a14" stop-opacity=".4"/><stop offset="1" stop-color="#ff3a0a" stop-opacity="0"/></radialGradient>
<linearGradient id="${q}ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#40363b"/><stop offset=".5" stop-color="#221b1f"/><stop offset="1" stop-color="#0d0a0c"/></linearGradient>
<linearGradient id="${q}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f2ec"/><stop offset=".42" stop-color="#d2c9c1"/><stop offset=".78" stop-color="#8b8179"/><stop offset="1" stop-color="${u>=3?'#ff7a2a':'#4a403a'}"/></linearGradient>
<linearGradient id="${q}hy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a5054"/><stop offset=".45" stop-color="#2c2427"/><stop offset=".8" stop-color="#1a1416"/><stop offset="1" stop-color="#ff6a1a"/></linearGradient><linearGradient id="${q}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ebe1d8"/><stop offset=".55" stop-color="#d9cdc3"/><stop offset="1" stop-color="#b2a398"/></linearGradient>
<radialGradient id="${q}gm" cx="42%" cy="38%" r="62%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".38" stop-color="#ffd04a"/><stop offset="1" stop-color="#ff4a10"/></radialGradient>
<linearGradient id="${q}fi" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff2b0"/><stop offset=".45" stop-color="#ffa21a"/><stop offset="1" stop-color="#ff3a0a"/></linearGradient>
<linearGradient id="${q}cp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e2629"/><stop offset="1" stop-color="#100d0f"/></linearGradient>
<linearGradient id="${q}ln" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a140c"/><stop offset="1" stop-color="#2a0505"/></linearGradient>
<linearGradient id="${q}st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a5258"/><stop offset=".5" stop-color="#2a2428"/><stop offset="1" stop-color="#121014"/></linearGradient>
<linearGradient id="${q}tp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#ffb24a"/><stop offset="1" stop-color="#ff5a14"/></linearGradient><filter id="${q}bl" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="1.1"/></filter>`;
/* une ligne de braise (veine lumineuse) */
const seam=(q,u,d,w=.6)=>L_(d,EMB,w*2.6,`opacity="${.16+u*.05}" filter="url(#${q}bl)"`)+L_(d,u>=3?'#ffb04a':'#ff7a2a',w,'opacity=".92"');
const crack=(q,d)=>L_(d,EMB,1.5,`opacity=".22" filter="url(#${q}bl)"`)+L_(d,'#ff8a3a',.45,'opacity=".95"');

/* ---------- la tête (coordonnées du portrait 100×100) ---------- */
function headBack(q,u,v){const HR=v==='young'?`url(#${q}hy)`:`url(#${q}hr)`;
  const coll=P('M39.4 66L31 58.2Q24.6 51.6 19.6 43.2Q26.6 48.6 32.6 50Q29.6 44.6 27.8 36.4Q35.6 45.6 41.8 52.6Z',`url(#${q}ar)`)
    +P('M39.2 64.4L32.6 57.6Q28 52.6 24.8 47.6Q29.6 50.8 34.4 52Q32.2 47.6 31.2 42.6Q36.6 49.4 41.2 54.4Z',`url(#${q}ln)`)
    +L_('M19.6 43.2Q24.6 51.6 31 58.2L39.4 66M27.8 36.4Q29.6 44.6 32.6 50',EMB,.55,'opacity=".8"');
  const hair=P('M33.2 44Q31.4 30.4 40.4 25.4Q50 20.6 59.6 25.4Q68.6 30.4 66.8 44Q67.6 60 72.4 77Q66.4 82.6 60.4 80.4Q58.2 70.6 57.4 62L42.6 62Q41.8 70.6 39.6 80.4Q33.6 82.6 27.6 77Q32.4 60 33.2 44Z',HR)
    +L_('M34.6 52Q33.4 64 30.2 75M37.8 58Q37.4 69 35.6 79M65.4 52Q66.6 64 69.8 75M62.2 58Q62.6 69 64.4 79','#7d736c',.55,'opacity=".7"')
    +L_('M31.4 71Q30.4 74.6 29.2 76.6M68.6 71Q69.6 74.6 70.8 76.6',u>=3?'#ffd27a':'#ff8a3a',.5,'opacity=".8"');
  return(v==='young'?'':MI(coll))+hair}
function headFront(q,u,v){const Y=v==='young',HR=Y?`url(#${q}hy)`:`url(#${q}hr)`;
  let s=`<rect x="44.4" y="55" width="11.2" height="13" fill="url(#${q}sk)"/>`+P('M44.4 59.6Q50 63.6 55.6 59.6L55.6 65Q50 67.4 44.4 65Z','#8e8078','opacity=".75"');
  s+=MI(P('M36.2 43.6Q32.4 43.4 32.9 47.6Q33.5 51.4 36.8 51.2Z','#c9bcb1')+L_('M35.4 45.4Q34 46.6 35 49','#9a8a80',.45));
  s+=P('M35.6 44Q35.6 29.5 50 29.5Q64.4 29.5 64.4 44Q64.4 54 59.5 60Q55 65.4 50 66Q45 65.4 40.5 60Q35.6 54 35.6 44Z',`url(#${q}sk)`);
  s+=P('M58.6 45.6Q62.6 52 59.4 59Q56.4 63.2 52.2 65.2Q57.8 60 59.8 52.4Z','#a6968a','opacity=".5"');
  s+=L_('M41 60.4Q46 65 50 65.6Q54 65 59 60.4','#9a8a80',.5,'opacity=".55"');
  s+=L_('M63.9 41Q64.3 52 59.7 59.7','#ff9a4a',.75,'opacity=".55"');
  const eye=x=>{const d=x<50?1:-1,ix=r1(x+.2*d);return E_(ix,46.8,3,2.2,'#ff8a2a',`opacity="${Y?.45:.16+u*.07}"`)
    +P(`M${r1(x-3.4*d)} 47Q${x} 44.6 ${r1(x+3.4*d)} 46.6Q${ix} 48.8 ${r1(x-3.4*d)} 47Z`,'#f2e8de')
    +C_(ix,46.85,1.55,`url(#${q}gm)`)+C_(ix,46.85,.62,'#1a0806')+C_(r1(x-.3*d),46.35,.4,'#fff')
    +L_(`M${r1(x-3.6*d)} 46.9Q${x} 44.3 ${r1(x+3.6*d)} 46.4`,'#2a1812',.95)};
  s+=eye(44)+eye(56)+MI(L_('M39.2 41.8Q43.6 40.2 47.8 43','#9c928a',1.55)+L_('M39.6 42.6Q43.6 41.4 47.4 43.6','#4a403c',.5,'opacity=".6"'));
  s+=crack(q,'M58.8 50.2L60.4 53.4L59.4 56M60.4 53.4L62.3 54.2')+crack(q,'M38.4 37.6L39.9 40.2');
  if(u>=2||Y)s+=crack(q,'M61.6 39.4L63 43.4L62.4 46');
  if(Y)s+=crack(q,'M42 33.6L44.2 36.4L43.4 38.6M44.2 36.4L46.6 36.8')+crack(q,'M40.6 56.4L42.8 59.4L42.2 61.6')+crack(q,'M55.4 61.6L57.6 59.8');
  s+=L_('M50.5 48L49.2 53.4Q50.3 54.3 51.8 53.6','#9a8a80',.7)+P('M48.6 53.6Q50.2 55 52 53.8Q50.4 54.6 48.6 53.6Z','#8e7e74','opacity=".6"');
  s+=L_('M46.6 58.5Q50 58 53.4 58.5','#6a4642',1)+L_('M48.2 60.1Q50 60.7 51.8 60.1','#b39b90',.6,'opacity=".7"');
  const fh=P('M50 29.4Q42 29.6 38.4 35.6Q36.8 40.6 37.2 46.4Q35.2 40 36 34.4Q38.4 27.6 50 27.4Z',HR)
    +P('M37.4 39.4Q34.6 52 36 64Q37 72.4 35.2 80.6Q40 72.4 40.2 63Q40.6 51.6 39.6 43.6Z',HR)
    +L_('M37.8 46Q37 56 38.4 64','#8b8179',.45,'opacity=".7"');
  s+=MI(fh)+L_('M48.8 30Q45.6 33.6 44.6 38.6',Y?'#6a5e62':'#f2ece6',.8,'opacity=".85"')+L_('M51.4 30.2Q53.6 33.4 54.2 36.8',Y?'#4a4044':'#d8d0c8',.6,'opacity=".7"');
  return s}
const CX=[40.4,45.1,50,54.9,59.6],CT=[18.2,14.4,9.6,14.4,18.2],CW=[2.6,3,3.5,3,2.6];
const bandTop=x=>27.2-(1-Math.pow((x-50)/12.4,2))*4.2;
const flame=(q,x,t,k)=>P(`M${r1(x)} ${r1(t-5.4*k)}Q${r1(x+2.2*k)} ${r1(t-2.4*k)} ${r1(x+k)} ${r1(t+.6)}Q${r1(x)} ${r1(t+1.2)} ${r1(x-k)} ${r1(t+.6)}Q${r1(x-2*k)} ${r1(t-2*k)} ${r1(x)} ${r1(t-5.4*k)}Z`,`url(#${q}fi)`)
  +P(`M${r1(x)} ${r1(t-2.6*k)}Q${r1(x+.9*k)} ${r1(t-k)} ${r1(x)} ${r1(t+.6)}Q${r1(x-.9*k)} ${r1(t-k)} ${r1(x)} ${r1(t-2.6*k)}Z`,'#fff4c0','opacity=".9"');
function crown(q,u){let s='';const up=u>=3?1.6:0;
  /* petites pointes intermédiaires */
  [42.8,47.6,52.4,57.2].forEach(x=>{const yb=bandTop(x)+.8;s+=P(`M${r1(x-1.3)} ${r1(yb)}L${x} ${r1(yb-4.2)}L${r1(x+1.3)} ${r1(yb)}Z`,'#241b1e','stroke="#0d0a0c" stroke-width=".3"')+C_(x,r1(yb-4.4),.45,'#ffb24a')});
  CX.forEach((x,i)=>{const yb=bandTop(x)+1,t=CT[i]-up,w=CW[i],h=yb-t,tp=t+h*.27;
    s+=P(`M${r1(x-w)} ${r1(yb)}L${x} ${r1(t)}L${x} ${r1(yb)}Z`,'#3c3033')+P(`M${x} ${r1(yb)}L${x} ${r1(t)}L${r1(x+w)} ${r1(yb)}Z`,'#151113')
      +P(`M${r1(x-w*.27)} ${r1(tp)}L${x} ${r1(t)}L${r1(x+w*.27)} ${r1(tp)}Z`,`url(#${q}tp)`)
      +P(`M${r1(x-w)} ${r1(yb)}L${x} ${r1(t)}L${r1(x+w)} ${r1(yb)}Z`,'none','stroke="#0b0809" stroke-width=".35" stroke-linejoin="round"')
      +L_(`M${r1(x-w*.62)} ${r1(yb-h*.36)}L${r1(x-w*.2)} ${r1(yb-h*.5)}`,EMB,.35,'opacity=".7"')});
  s+=P('M36.8 32.2Q50 27.8 63.2 32.2L62.4 26.8Q50 22.4 37.6 26.8Z','#1c1416')+P('M37.4 29.6Q50 25.2 62.6 29.6L62.4 26.8Q50 22.4 37.6 26.8Z','#2e2427')
    +L_('M37.6 26.8Q50 22.4 62.4 26.8','#ffb24a',.7,'opacity=".95"')+L_('M36.8 32.2Q50 27.8 63.2 32.2','#c8742a',.55);
  s+=C_(50,27.4,4,'#ffb04a',`opacity=".4" filter="url(#${q}bl)"`)+P('M50 24.4L52.6 27.4L50 30.4L47.4 27.4Z',`url(#${q}gm)`,'stroke="#6a3a14" stroke-width=".35"')+P('M50 25.2L51 26.6L49.2 27Z','#fff','opacity=".85"')
    +[42.6,57.4].map(x=>C_(x,r1(bandTop(x)+3),.95,`url(#${q}gm)`)).join('');
  CX.forEach((x,i)=>{if((u===0&&i!==2)||(u===1&&(i===0||i===4)))return;const k=(i===2?1.15:.8)*(1+u*.13);s+=flame(q,x,CT[i]-up,k)});
  return s}

function circlet(q){return L_('M37.6 31.4Q50 27.4 62.4 31.4','#0d0a0c',2.2)+L_('M37.6 31.4Q50 27.4 62.4 31.4','#3a2e31',1.3)+L_('M37.8 30.8Q50 26.9 62.2 30.8','#c8742a',.4,'opacity=".8"')
  +P('M48.6 28.6L50 23.6L51.4 28.6Z','#2a2124','stroke="#0d0a0c" stroke-width=".3"')+P('M55.6 29.4L57 26.6L57.8 29.8Z','#2a2124')+C_(50,29.2,1.5,`url(#${q}gm)`)+C_(50,29.2,3,EMB,`opacity=".35" filter="url(#${q}bl)"`)}
/* ---------- le buste du portrait ---------- */
function bust(q,u){
  let s=P('M20 100L23 81Q29 70.5 41.6 67.4L58.4 67.4Q71 70.5 77 81L80 100Z',`url(#${q}ar)`);
  s+=L_('M50 74L50 100','#4c4046',.8)+seam(q,u,'M35 79Q50 85 65 79')+seam(q,u,'M37.5 91Q50 95.5 62.5 91',.5);
  s+=C_(50,86.4,6.4,EMB,`opacity="${.3+u*.08}" filter="url(#${q}bl)"`)+P('M50 79.6L55.6 86.4L50 93.2L44.4 86.4Z','#1a1214','stroke="#6a5a5e" stroke-width=".6"')+P('M50 81.8L53.6 86.4L50 91L46.4 86.4Z',`url(#${q}gm)`)+P('M50 82.6L51.4 84.6L49 85.4Z','#fff','opacity=".8"')+seam(q,u,'M44.4 86.4L40.6 84.8M55.6 86.4L59.4 88M50 93.2L49.2 97',.4);
  s+=P('M39.4 64Q50 69.6 60.6 64L62.4 70.4Q50 76 37.6 70.4Z','#2a2226')+L_('M39.4 64Q50 69.6 60.6 64','#6a5e64',.6)+seam(q,u,'M38.4 70.8Q50 76.2 61.6 70.8',.5);
  const pl=P('M9 93Q11 80.4 23.6 76Q34 73.6 40.4 79Q34.4 86.4 26 90.2Q17.6 93.4 9 93Z','#141012')+seam(q,u,'M9.8 92.4Q18 92.6 26 89.6Q34 86 40 79.4',.5)
    +P('M11.4 85Q14.4 72.4 27 69Q37.4 67.8 41.4 74Q35.4 80.4 27.4 83.4Q19 86.4 11.4 85Z','#1d171a')+seam(q,u,'M12 84.6Q19.6 85.6 27.4 83Q35.2 80 41 74.4',.5)
    +P('M14.6 76.6Q18.4 64 31 62.4Q40.4 62.4 43.4 68Q37.4 73.6 29.4 76.2Q21 78.4 14.6 76.6Z',`url(#${q}ar)`)+L_('M16 74Q20 65 31 63.4Q39 63.2 42.6 67.4','#74686e',.6,'opacity=".8"')+seam(q,u,'M15.4 76.4Q22 77.8 29.4 75.8Q37 73 43 68.4',.5)
      ;return s+MI(pl)}

/* ---------- ailes de cendre (formes ultra II et III) : plumes brûlées en deux rangs ---------- */
function feather(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),nx=-sn,ny=c,tx=R[0]+len*c,ty=R[1]+len*sn,mx=R[0]+len*.58*c,my=R[1]+len*.58*sn,nk=R[0]+len*.86*c,nky=R[1]+len*.86*sn;
  const d=`M${r1(R[0]+nx*1.6)} ${r1(R[1]+ny*1.6)}Q${r1(mx+nx*wd)} ${r1(my+ny*wd)} ${r1(nk+nx*wd*.5)} ${r1(nky+ny*wd*.5)}L${r1(nk+nx*wd*.1)} ${r1(nky+ny*wd*.1)}L${r1(tx)} ${r1(ty)}Q${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)} ${r1(R[0]-nx*1.6)} ${r1(R[1]-ny*1.6)}Z`;
  return P(d,fill,`stroke="${edge}" stroke-width="${ew}" stroke-opacity=".9" stroke-linejoin="round"`)+L_(`M${r1(R[0]+len*.3*c)} ${r1(R[1]+len*.3*sn)}L${r1(R[0]+len*.78*c)} ${r1(R[1]+len*.78*sn)}`,'#3a2c2f',.4,'opacity=".7"')}
function wings(q,u){const R=[36,62],ed=u>=3?'#ff9a3a':EMB,ew=u>=3?.7:.5;let w='';
  [[-176,45],[-157,52],[-138,56],[-119,52],[-101,45]].forEach(([a,l],k)=>{w+=feather(R,a,l,6.2,k%2?'#151012':'#1b1417',ed,ew);if(u>=3){const t=a*Math.PI/180,x=r1(R[0]+l*Math.cos(t)),y=r1(R[1]+l*Math.sin(t));w+=C_(x,y,2.4,EMB,`opacity=".55" filter="url(#${q}bl)"`)+C_(x,y,.9,'#ffd27a')}});
  [[-166,28],[-146,32],[-126,31],[-107,26]].forEach(([a,l])=>{w+=feather(R,a,l,5.6,'#241b1f','#4a2216',.4)});
  return MI(w)}

/* ---------- décor du portrait ---------- */
function rays(cx,cy,n,len,op){let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+17)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,'#ff7a2a',`opacity="${op}"`)}return s}
const PART=[[11,20,.7],[88,16,.6],[18,46,.5],[83,47,.6],[7,64,.5],[94,60,.55],[28,10,.45],[72,8,.5],[14,33,.4],[90,34,.45],[24,56,.4],[76,26,.4]];
const flake=(x,y,r)=>P(`M${x} ${y}l${r1(r*1.6)} ${r1(r*.6)}l${r1(-r*.4)} ${r1(r*1.4)}z`,'#9a908a','opacity=".55"');
function frame(){const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17','#e8a050',1,'opacity=".9"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4',EMB,.5,'opacity=".75"')+P('M1.4 1.4h3.2v3.2z','#ffd27a','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')}
const ROMN=['','I','II','III'],TC='#ff6a1a';
const STARP=(x,y,r)=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,'#fff','opacity=".9"');
function eryPortrait(u,v){u=Math.max(0,Math.min(3,u|0));v=v||'hero';const ck='p'+u+v;if(EC[ck])return EC[ck];const q='ep'+u+v[0]+'_',Y=v==='young',HERO=v==='hero';
  const rc=(typeof RCOL!=='undefined'&&RCOL[4])||'#ffd84a',cc=(typeof CLS!=='undefined'&&CLS.Guerrier&&CLS.Guerrier.c)||'#ff5a4a';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${Y?'Éryndel, le Porteur Brûlé':'Éryndel le Roi de Cendre'}"><defs>${defs(q,u)}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  s+=rays(50,35,12,80,.07)+C_(50,35,31+u*2,`url(#${q}gl)`)+C_(50,35,22,'#140607')+C_(50,35,22.6,'none','stroke="#ffc062" stroke-width="1.1" opacity=".95"')+C_(50,35,24.4,'none',`stroke="#ff5a14" stroke-width="2.6" opacity=".4" filter="url(#${q}bl)"`);
  if(u>=3)s+=C_(50,35,26.5,'none','stroke="#ffd27a" stroke-width=".6" stroke-dasharray="1.4 2.6" opacity=".8"');
  s+=PART.slice(0,8+u).map(([x,y,r],k)=>k%3===2?flake(x,y,r):C_(x,y,r,k%2?'#ffb21a':EMB,'opacity=".9"')).join('');
  if(u>=2)s+=wings(q,u);
  s+=headBack(q,u,v)+bust(q,u)+headFront(q,u,v)+(Y?circlet(q):crown(q,u))+frame();
  if(!HERO)return EC[ck]=s+'</svg>';
  if(u){[[16,30,2.2],[84,22,1.8],[22,70,1.4],[78,58,1.6],[50,6,1.2]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
    s+=`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
  s+=`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/><path d="M86 75L88 86L86 88L84 86Z M81 86L91 86L91 87.6L81 87.6Z M85.2 88h1.6v4h-1.6z" fill="${cc}"/></svg>`;
  return EC[ck]=s}

/* ---------- le corps entier (cadre 160×244, comme les autres héros) ---------- */
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
function eryBody(u){u=Math.max(0,Math.min(3,u|0));if(EC['b'+u])return EC['b'+u];const q='eb'+u+'_',A=`url(#${q}ar)`;
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Éryndel le Roi de Cendre en pied"><defs>${defs(q,u)}<radialGradient id="${q}bb" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#ff7a2a" stop-opacity="${.38+u*.08}"/><stop offset=".55" stop-color="#5a0e04" stop-opacity=".32"/><stop offset="1" stop-color="#0a0202" stop-opacity="0"/></radialGradient></defs>`;
  /* décor : lueur, éclipse, braises qui montent */
  s+=`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,36,14,120,.05)}${C_(80,36,42+u*3,`url(#${q}gl)`,'opacity=".75"')}${C_(80,36,28.5,'#140607')}${C_(80,36,29.2,'none','stroke="#ffc062" stroke-width="1.3" opacity=".95"')}${C_(80,36,31.6,'none',`stroke="#ff5a14" stroke-width="3" opacity=".4" filter="url(#${q}bl)"`)}`;
  if(u>=1)s+=`<circle cx="80" cy="36" r="${46+u*4}" fill="none" stroke="${EMB}" stroke-width="1.2" stroke-dasharray="2 6" opacity=".6"><animateTransform attributeName="transform" type="rotate" from="0 80 36" to="360 80 36" dur="30s" repeatCount="indefinite"/></circle>`;
  s+=[...Array(14+u*5)].map((_,k)=>{const x=20+((k*37)%120),d=3+(k%5)*.7;return`<circle r="${(.7+(k%3)*.45).toFixed(1)}" fill="${k%3?'#ffb21a':'#c8bcb0'}" opacity=".85"><animateMotion dur="${d}s" begin="${-k*.55}s" repeatCount="indefinite" path="M${x} 214q${k%2?6:-6} -60 ${k%2?-4:4} -150"/><animate attributeName="opacity" values="0;.9;0" dur="${d}s" begin="${-k*.55}s" repeatCount="indefinite"/></circle>`}).join('');
  s+=`</g>`+E_(80,219,48,6.5,'#000','opacity=".5"')+L_('M80 219L56 223M80 219L104 224M80 219L70 226M80 219L95 213',EMB,.8,'opacity=".55"');
  if(u>=2)s+=`<g transform="translate(12.5 -15) scale(1.35)">${wings(q,u)}</g>`;
  /* cape qui se consume */
  const hem='M30 210L38 205L44 214L52 207L60 215L70 208L80 216L90 208L100 215L108 207L116 214L122 205L130 210';
  s+=P(`M58 64Q40 120 30 210L38 205L44 214L52 207L60 215L70 208L80 216L90 208L100 215L108 207L116 214L122 205L130 210Q120 120 102 64Z`,`url(#${q}cp)`)
    +P('M58 66Q44 120 36 204L44 200Q50 130 62 70Z',`url(#${q}ln)`,'opacity=".9"')+P('M102 66Q116 120 124 204L116 200Q110 130 98 70Z',`url(#${q}ln)`,'opacity=".9"')
    +L_(hem,EMB,2.6,`opacity=".35" filter="url(#${q}bl)"`)+L_(hem,u>=3?'#ffd27a':'#ff8a3a',1,'opacity=".95"');
  s+=[[44,214],[60,215],[80,216],[100,215],[116,214]].map(([x,y],k)=>`<g>${flame(q,x,y-1,.9+u*.12)}<animate attributeName="opacity" values=".55;1;.55" dur="${1.1+k*.23}s" repeatCount="indefinite"/></g>`).join('');
  s+=HG(headBack(q,u));
  /* jambes */
  const leg=P('M63 126L77 126L75.4 168L73.6 205L62.4 205L61.6 168Z',A)+L_('M64.4 132L63.4 168M74.2 132L73.6 168','#4a3e44',.7)
    +E_(68.6,167,6.6,5,'#1d171a')+seam(q,u,'M62.6 169Q68.6 173 74.6 169',.55)+C_(68.6,166.4,1.3,'#ff8a2a')
    +P('M60 203L75 203L75.6 211L52 213.6Q53 207 60 203Z','#161214')+seam(q,u,'M53 212.6L75.4 210.4',.5);
  s+=MB(leg);
  /* tabard et tassettes */
  s+=P('M71 120L89 120L91.4 190L80 197L68.6 190Z',`url(#${q}ln)`)+L_('M68.6 190L80 197L91.4 190','#ffb24a',.8,'opacity=".85"')
    +P('M74 146L76 140L78.2 144L80 138L81.8 144L84 140L86 146Z','#ffb24a','opacity=".85"')+P('M74 147.4H86V149.4H74Z','#ffb24a','opacity=".85"');
  s+=P('M56 116Q80 124 104 116L106.4 134Q80 142 53.6 134Z',A)+seam(q,u,'M54.4 133Q80 141 105.6 133',.55)+L_('M56.4 124Q80 131 103.6 124','#4a3e44',.7);
  /* torse et cœur de flamme */
  s+=P('M57 68Q80 61 103 68L105 98Q101 117 80 123Q59 117 55 98Z',A)+L_('M80 70L80 120','#4c4046',.9)
    +seam(q,u,'M62 82Q80 89 98 82')+seam(q,u,'M64 104Q80 110 96 104',.5);
  s+=C_(80,92,9,EMB,`opacity="${.32+u*.08}" filter="url(#${q}bl)"`)+P('M80 83L87 92L80 101L73 92Z','#1a1214','stroke="#6a5a5e" stroke-width=".7"')
    +`<path d="M80 85.6L84.6 92L80 98.4L75.4 92Z" fill="url(#${q}gm)"><animate attributeName="opacity" values=".8;1;.8" dur="1.8s" repeatCount="indefinite"/></path>`+P('M80 86.8L81.8 89.4L78.8 90.4Z','#fff','opacity=".8"')
    +seam(q,u,'M73 92L67.6 89.6M87 92L92.4 94.6M80 101L79 107.4M76.4 87.4L72.6 82.4',.45);
  s+=P('M57 113Q80 121 103 113L103 118.6Q80 126.6 57 118.6Z','#1a1214')+`<rect x="76" y="115.4" width="8" height="7" rx="1.4" fill="#2a2024" stroke="#ffb24a" stroke-width=".7"/>`+C_(80,119,1.5,'#ff8a2a');
  s+=P('M68 52Q80 58 92 52L94.4 62Q80 69 65.6 62Z','#2a2226')+L_('M68 52Q80 58 92 52','#6a5e64',.7)+seam(q,u,'M66 62.6Q80 69.6 94 62.6',.55);
  /* bras droit (côté gauche de l'image) qui tient la hache */
  const armR=P('M50 74Q44 88 44.6 104L54.6 105Q55 90 60 78Z',A)+E_(49.6,104.4,6,4.6,'#1d171a')+seam(q,u,'M43.8 105.6Q49.6 109 55.4 105.6',.5)
    +P('M44.4 106Q42.6 116 43.6 124L53 124.4Q53.6 115 54.8 107Z',A)+L_('M45 112L53.6 112.6','#4a3e44',.6);
  /* la grande hache de cendre */
  const axe=L_('M47.6 214L47.6 26','#140f12',4.6)+L_('M47.6 214L47.6 26','#3a2c26',3)+[60,96,150,190].map(y=>`<rect x="45" y="${y}" width="5.2" height="3" rx=".8" fill="#5a4a40" stroke="#1a1214" stroke-width=".5"/>`).join('')
    +P('M44.6 212L50.6 212L49.6 219L45.6 219Z','#2a2024')
    +P('M47.6 34Q33 25 19 20Q9 42 19 66Q33 58 47.6 55Z',`url(#${q}st)`,'stroke="#0d0a0c" stroke-width=".8"')
    +L_('M19 20Q9 42 19 66',EMB,3.2,`opacity=".45" filter="url(#${q}bl)"`)+L_('M19.6 21.4Q10.6 42 19.6 64.6',u>=3?'#ffd27a':'#ff9a3a',1.3)
    +C_(34.6,43.4,4,'#0d0a0c','stroke="#4a3e44" stroke-width=".8"')+C_(34.6,43.4,2.2,EMB,`opacity=".55" filter="url(#${q}bl)"`)+L_('M26.4 30.6L23.4 35.4L26.6 37.6L23.6 41.8M26.2 50L23.4 54.4L26.4 56.8',EMB,.6,'opacity=".8"')+C_(42.2,44.6,1.5,`url(#${q}gm)`)
    +P('M47.6 37L59 43.6L47.6 50.2Z',`url(#${q}st)`,'stroke="#0d0a0c" stroke-width=".6"')+L_('M58 43.6L48.6 43.6',EMB,.5,'opacity=".7"')
    +P('M46 34L47.6 16L49.2 34Z','#2a2428','stroke="#0d0a0c" stroke-width=".5"')+C_(47.6,34.6,2.4,'#1a1214','stroke="#9a6a32" stroke-width=".6"');
  s+=axe+armR+E_(48.4,126.6,5.6,5.2,'#1d171a')+L_('M44.4 124.6Q48.4 122.8 52.6 124.6M44 128.4Q48.4 126.6 52.8 128.4','#4a3e44',.8)+seam(q,u,'M43.6 131Q48.4 133 53 131',.4);
  /* bras gauche : la Flamme volée au creux de la main */
  const fx=118,fy=94;
  s+=P('M110 74Q116 88 115.4 102L105.4 103Q105 90 100 78Z',A)+E_(110.6,102.4,6,4.6,'#1d171a')+seam(q,u,'M104.8 103.6Q110.6 107 116.4 103.6',.5)
    +P('M106 104Q112 101 120 96L123.6 102.6Q116 108 109.6 110.4Z',A)+E_(fx+3,fy+5,5.2,4,'#1d171a')+L_(`M${fx-1} ${fy+3}Q${fx+3} ${fy+1} ${fx+7.4} ${fy+3.4}`,'#4a3e44',.8);
  s+=C_(fx+3,fy-7,8+u,EMB,`opacity=".32" filter="url(#${q}bl)"`)+C_(fx+3,fy-4.6,3.2,'#fff4c0',`opacity=".55" filter="url(#${q}bl)"`)+`<g>${flame(q,fx+3,fy+1.2,3.5+u*.3)}<animateTransform attributeName="transform" type="scale" values="1 1;1.04 .94;.97 1.06;1 1" dur="1.3s" additive="sum" repeatCount="indefinite"/></g>`
    +`<circle cx="${fx+3}" cy="${fy-14}" r=".9" fill="#ffd27a"><animate attributeName="cy" values="${fy-6};${fy-26}" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="1.6s" repeatCount="indefinite"/></circle>`;
  /* épaulières */
  const pa=P('M38 94Q38.6 80 51.6 74Q62 71 68 77Q61.6 86 52.6 90.2Q44.6 93.6 38 94Z','#141012')+seam(q,u,'M38.6 93.4Q46 93.2 52.6 89.6Q61 85.6 67.6 77.4',.55)
    +P('M41 85Q44.6 71.6 57.6 68Q67.6 67 71.4 73.4Q65 79.6 57 82.4Q48.6 85.4 41 85Z','#1d171a')+seam(q,u,'M41.6 84.6Q49 85 57 82Q65 79 71 73.8',.55)
    +P('M44.6 75.6Q48.6 62.6 61.6 61Q71 61 74 66.6Q67.6 72.4 59.6 75Q51.4 77.4 44.6 75.6Z',A)+L_('M46 73Q50 63.6 61.6 62Q69.6 62 73.2 66','#74686e',.7,'opacity=".8"')+seam(q,u,'M45.4 75.4Q52 76.8 59.6 74.6Q67.4 71.8 73.6 67',.55)
  ;s+=MB(pa);
  /* la tête */
  s+=HG(headFront(q,u)+crown(q,u));
  if(u)[[10,40,2.2],[150,58,1.8],[14,140,1.6],[146,150,1.8],[80,-4,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  s+='</svg>';return EC['b'+u]=s}

/* ---------- branchements ---------- */
/* son histoire, fidèle au Livre III (« L'Écho du Premier Porteur ») */
try{STL[ERY]=["Éryndel n'avait ni épée ni château, seulement l'envie de protéger ceux qu'il aimait. C'est pour cela que le Cœur l'a choisi : il fut le tout premier Porteur de sa flamme.",
 "Les années ont passé, ses cheveux sont devenus gris, et la peur d'être oublié l'a rongé. Une nuit, il a volé la flamme du Cœur. La tour a brûlé, et le feu l'a gardé en vie mille ans dans les Cendres de l'Aube, jusqu'à faire de lui le Roi de Cendre.",
 "Vaincu par tout le royaume, Éryndel a enfin compris ce qu'il refusait d'entendre : une flamme ne se garde pas, elle se transmet. Il se bat désormais à tes côtés, pour qu'on se souvienne de lui comme d'un protecteur, et non comme d'un roi."]}catch(e){}
try{const X={"Éryndel n'avait ni épée ni château, seulement l'envie de protéger ceux qu'il aimait. C'est pour cela que le Cœur l'a choisi : il fut le tout premier Porteur de sa flamme.":"Éryndel had no sword and no castle, only the wish to protect the people he loved. That is why the Heart chose him: he was the very first Bearer of its flame.",
 "Les années ont passé, ses cheveux sont devenus gris, et la peur d'être oublié l'a rongé. Une nuit, il a volé la flamme du Cœur. La tour a brûlé, et le feu l'a gardé en vie mille ans dans les Cendres de l'Aube, jusqu'à faire de lui le Roi de Cendre.":"Years went by, his hair turned grey, and the fear of being forgotten ate away at him. One night, he stole the Heart's flame. The tower burned, and the fire kept him alive for a thousand years in the Ashes of Dawn, until it made him the Ash King.",
 "Vaincu par tout le royaume, Éryndel a enfin compris ce qu'il refusait d'entendre : une flamme ne se garde pas, elle se transmet. Il se bat désormais à tes côtés, pour qu'on se souvienne de lui comme d'un protecteur, et non comme d'un roi.":"Defeated by the whole kingdom, Éryndel finally understood what he had refused to hear: a flame is not kept, it is passed on. He now fights by your side, so that he will be remembered as a protector, not as a king.",
 "Éryndel, le Porteur Brûlé":"Éryndel, the Burnt Bearer"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
window.eryPortrait=eryPortrait;window.eryBody=eryBody;
{const ma=monArt;monArt=function(n,hh,bs){try{if(n==='Éryndel, le Roi de Cendre'){const k='ERYboss';return PIMG[k]||(PIMG[k]=svgToImg(eryPortrait(3,'boss')))}if(n==='Éryndel, le Porteur Brûlé'){const k='ERYyoung';return PIMG[k]||(PIMG[k]=svgToImg(eryPortrait(0,'young')))}}catch(e){}return ma.apply(this,arguments)}}
try{Object.defineProperty(PCACHE,ERY,{get:()=>eryPortrait(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===ERY)return eryPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===ERY)return eryBody(u);return hb.apply(this,arguments)}}
try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+ERY+'(_|$)').test(k))delete C[k]}catch(e){}
}catch(e){console.warn('ery art',e)}})();
