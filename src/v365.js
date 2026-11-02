
/* ================= ÉRYNDEL, LE ROI DE CENDRE : design sur mesure =================
   Portrait, 3 formes ultra et corps entier dessinés à la main (plus de rendu générique).
   Couronne de fer noir aux pointes en fusion, éclipse de feu derrière la tête, cheveux d'argent,
   armure d'obsidienne veinée de braises, cœur de la Flamme dans la poitrine,
   grande hache de cendre, cape au bord qui se consume.
   + le jeune Éryndel (« le Porteur Brûlé », lieutenant du jour 4) : un tout autre dessin.
   Léger : aucun filtre de flou, très peu d'animations (le jeu doit rester fluide sur téléphone). */
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
<radialGradient id="${q}g2" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd27a" stop-opacity=".9"/><stop offset=".4" stop-color="#ff6a1a" stop-opacity=".5"/><stop offset="1" stop-color="#ff3a0a" stop-opacity="0"/></radialGradient>
<linearGradient id="${q}ar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#40363b"/><stop offset=".5" stop-color="#221b1f"/><stop offset="1" stop-color="#0d0a0c"/></linearGradient>
<linearGradient id="${q}hr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#f6f2ec"/><stop offset=".42" stop-color="#d2c9c1"/><stop offset=".78" stop-color="#8b8179"/><stop offset="1" stop-color="${u>=3?'#ff7a2a':'#4a403a'}"/></linearGradient>
<linearGradient id="${q}sk" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ebe1d8"/><stop offset=".55" stop-color="#d9cdc3"/><stop offset="1" stop-color="#b2a398"/></linearGradient>
<radialGradient id="${q}gm" cx="42%" cy="38%" r="62%"><stop offset="0" stop-color="#fffbe0"/><stop offset=".38" stop-color="#ffd04a"/><stop offset="1" stop-color="#ff4a10"/></radialGradient>
<linearGradient id="${q}fi" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff2b0"/><stop offset=".45" stop-color="#ffa21a"/><stop offset="1" stop-color="#ff3a0a"/></linearGradient>
<linearGradient id="${q}cp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2e2629"/><stop offset="1" stop-color="#100d0f"/></linearGradient>
<linearGradient id="${q}ln" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a140c"/><stop offset="1" stop-color="#2a0505"/></linearGradient>
<linearGradient id="${q}st" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#5a5258"/><stop offset=".5" stop-color="#2a2428"/><stop offset="1" stop-color="#121014"/></linearGradient>
<linearGradient id="${q}tp" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b0"/><stop offset=".5" stop-color="#ffb24a"/><stop offset="1" stop-color="#ff5a14"/></linearGradient>`;
/* lueurs sans filtre : un trait large et transparent sous le trait lumineux, ou un dégradé radial */
const seam=(q,u,d,w=.6)=>L_(d,EMB,w*2.8,`opacity="${.14+u*.04}"`)+L_(d,u>=3?'#ffb04a':'#ff7a2a',w,'opacity=".92"');
const crack=(q,d)=>L_(d,EMB,1.5,'opacity=".22"')+L_(d,'#ff8a3a',.45,'opacity=".95"');
const glow=(q,x,y,r,op=1)=>C_(x,y,r,`url(#${q}g2)`,`opacity="${op}"`);

/* ---------- la tête (coordonnées du portrait 100×100) ---------- */
function headBack(q,u){
  const coll=P('M39.4 66L31 58.2Q24.6 51.6 19.6 43.2Q26.6 48.6 32.6 50Q29.6 44.6 27.8 36.4Q35.6 45.6 41.8 52.6Z',`url(#${q}ar)`)
    +P('M39.2 64.4L32.6 57.6Q28 52.6 24.8 47.6Q29.6 50.8 34.4 52Q32.2 47.6 31.2 42.6Q36.6 49.4 41.2 54.4Z',`url(#${q}ln)`)
    +L_('M19.6 43.2Q24.6 51.6 31 58.2L39.4 66M27.8 36.4Q29.6 44.6 32.6 50',EMB,.55,'opacity=".8"');
  const hair=P('M33.2 44Q31.4 30.4 40.4 25.4Q50 20.6 59.6 25.4Q68.6 30.4 66.8 44Q67.6 60 72.4 77Q66.4 82.6 60.4 80.4Q58.2 70.6 57.4 62L42.6 62Q41.8 70.6 39.6 80.4Q33.6 82.6 27.6 77Q32.4 60 33.2 44Z',`url(#${q}hr)`)
    +L_('M34.6 52Q33.4 64 30.2 75M37.8 58Q37.4 69 35.6 79M65.4 52Q66.6 64 69.8 75M62.2 58Q62.6 69 64.4 79','#7d736c',.55,'opacity=".7"')
    +L_('M31.4 71Q30.4 74.6 29.2 76.6M68.6 71Q69.6 74.6 70.8 76.6',u>=3?'#ffd27a':'#ff8a3a',.5,'opacity=".8"');
  return MI(coll)+hair}
/* le visage (commun au roi et au jeune Éryndel) */
function face(q,u,young){
  let s=`<rect x="44.4" y="55" width="11.2" height="13" fill="url(#${q}sk)"/>`+P('M44.4 59.6Q50 63.6 55.6 59.6L55.6 65Q50 67.4 44.4 65Z','#8e8078','opacity=".75"');
  s+=MI(P('M36.2 43.6Q32.4 43.4 32.9 47.6Q33.5 51.4 36.8 51.2Z','#c9bcb1')+L_('M35.4 45.4Q34 46.6 35 49','#9a8a80',.45));
  s+=P('M35.6 44Q35.6 29.5 50 29.5Q64.4 29.5 64.4 44Q64.4 54 59.5 60Q55 65.4 50 66Q45 65.4 40.5 60Q35.6 54 35.6 44Z',`url(#${q}sk)`);
  if(!young)s+=P('M58.6 45.6Q62.6 52 59.4 59Q56.4 63.2 52.2 65.2Q57.8 60 59.8 52.4Z','#a6968a','opacity=".5"')+L_('M41 60.4Q46 65 50 65.6Q54 65 59 60.4','#9a8a80',.5,'opacity=".55"')+L_('M63.9 41Q64.3 52 59.7 59.7','#ff9a4a',.75,'opacity=".55"');
  const eye=x=>{const d=x<50?1:-1,ix=r1(x+.2*d);return E_(ix,46.8,3,2.2,'#ff8a2a',`opacity="${young?.3:.16+u*.07}"`)
    +P(`M${r1(x-3.4*d)} 47Q${x} 44.6 ${r1(x+3.4*d)} 46.6Q${ix} 48.8 ${r1(x-3.4*d)} 47Z`,'#f2e8de')
    +C_(ix,46.85,1.55,`url(#${q}gm)`)+C_(ix,46.85,.62,'#1a0806')+C_(r1(x-.3*d),46.35,.4,'#fff')
    +L_(`M${r1(x-3.6*d)} 46.9Q${x} 44.3 ${r1(x+3.6*d)} 46.4`,'#2a1812',.95)};
  s+=eye(44)+eye(56);
  s+=young?MI(L_('M39.6 42.4Q43.4 41.4 47.4 42.2','#3a2c2a',1.2)):MI(L_('M39.2 41.8Q43.6 40.2 47.8 43','#9c928a',1.55)+L_('M39.6 42.6Q43.6 41.4 47.4 43.6','#4a403c',.5,'opacity=".6"'));
  s+=L_('M50.5 48L49.2 53.4Q50.3 54.3 51.8 53.6','#9a8a80',.7)+P('M48.6 53.6Q50.2 55 52 53.8Q50.4 54.6 48.6 53.6Z','#8e7e74','opacity=".6"');
  s+=young?L_('M47 58.6Q50 59.4 53 58.4','#6a4642',.95):L_('M46.6 58.5Q50 58 53.4 58.5','#6a4642',1)+L_('M48.2 60.1Q50 60.7 51.8 60.1','#b39b90',.6,'opacity=".7"');
  return s}
function headFront(q,u){
  let s=face(q,u,false);
  s+=crack(q,'M58.8 50.2L60.4 53.4L59.4 56M60.4 53.4L62.3 54.2')+crack(q,'M38.4 37.6L39.9 40.2');
  if(u>=2)s+=crack(q,'M61.6 39.4L63 43.4L62.4 46');
  const fh=P('M50 29.4Q42 29.6 38.4 35.6Q36.8 40.6 37.2 46.4Q35.2 40 36 34.4Q38.4 27.6 50 27.4Z',`url(#${q}hr)`)
    +P('M37.4 39.4Q34.6 52 36 64Q37 72.4 35.2 80.6Q40 72.4 40.2 63Q40.6 51.6 39.6 43.6Z',`url(#${q}hr)`)
    +L_('M37.8 46Q37 56 38.4 64','#8b8179',.45,'opacity=".7"');
  s+=MI(fh)+L_('M48.8 30Q45.6 33.6 44.6 38.6','#f2ece6',.8,'opacity=".85"')+L_('M51.4 30.2Q53.6 33.4 54.2 36.8','#d8d0c8',.6,'opacity=".7"');
  return s}
const CX=[40.4,45.1,50,54.9,59.6],CT=[18.2,14.4,9.6,14.4,18.2],CW=[2.6,3,3.5,3,2.6];
const bandTop=x=>27.2-(1-Math.pow((x-50)/12.4,2))*4.2;
const flame=(q,x,t,k)=>P(`M${r1(x)} ${r1(t-5.4*k)}Q${r1(x+2.2*k)} ${r1(t-2.4*k)} ${r1(x+k)} ${r1(t+.6)}Q${r1(x)} ${r1(t+1.2)} ${r1(x-k)} ${r1(t+.6)}Q${r1(x-2*k)} ${r1(t-2*k)} ${r1(x)} ${r1(t-5.4*k)}Z`,`url(#${q}fi)`)
  +P(`M${r1(x)} ${r1(t-2.6*k)}Q${r1(x+.9*k)} ${r1(t-k)} ${r1(x)} ${r1(t+.6)}Q${r1(x-.9*k)} ${r1(t-k)} ${r1(x)} ${r1(t-2.6*k)}Z`,'#fff4c0','opacity=".9"');
function crown(q,u){let s='';const up=u>=3?1.6:0;
  [42.8,47.6,52.4,57.2].forEach(x=>{const yb=bandTop(x)+.8;s+=P(`M${r1(x-1.3)} ${r1(yb)}L${x} ${r1(yb-4.2)}L${r1(x+1.3)} ${r1(yb)}Z`,'#241b1e','stroke="#0d0a0c" stroke-width=".3"')+C_(x,r1(yb-4.4),.45,'#ffb24a')});
  CX.forEach((x,i)=>{const yb=bandTop(x)+1,t=CT[i]-up,w=CW[i],h=yb-t,tp=t+h*.27;
    s+=P(`M${r1(x-w)} ${r1(yb)}L${x} ${r1(t)}L${x} ${r1(yb)}Z`,'#3c3033')+P(`M${x} ${r1(yb)}L${x} ${r1(t)}L${r1(x+w)} ${r1(yb)}Z`,'#151113')
      +P(`M${r1(x-w*.27)} ${r1(tp)}L${x} ${r1(t)}L${r1(x+w*.27)} ${r1(tp)}Z`,`url(#${q}tp)`)
      +P(`M${r1(x-w)} ${r1(yb)}L${x} ${r1(t)}L${r1(x+w)} ${r1(yb)}Z`,'none','stroke="#0b0809" stroke-width=".35" stroke-linejoin="round"')
      +L_(`M${r1(x-w*.62)} ${r1(yb-h*.36)}L${r1(x-w*.2)} ${r1(yb-h*.5)}`,EMB,.35,'opacity=".7"')});
  s+=P('M36.8 32.2Q50 27.8 63.2 32.2L62.4 26.8Q50 22.4 37.6 26.8Z','#1c1416')+P('M37.4 29.6Q50 25.2 62.6 29.6L62.4 26.8Q50 22.4 37.6 26.8Z','#2e2427')
    +L_('M37.6 26.8Q50 22.4 62.4 26.8','#ffb24a',.7,'opacity=".95"')+L_('M36.8 32.2Q50 27.8 63.2 32.2','#c8742a',.55);
  s+=glow(q,50,27.4,5,.7)+P('M50 24.4L52.6 27.4L50 30.4L47.4 27.4Z',`url(#${q}gm)`,'stroke="#6a3a14" stroke-width=".35"')+P('M50 25.2L51 26.6L49.2 27Z','#fff','opacity=".85"')
    +[42.6,57.4].map(x=>C_(x,r1(bandTop(x)+3),.95,`url(#${q}gm)`)).join('');
  CX.forEach((x,i)=>{if((u===0&&i!==2)||(u===1&&(i===0||i===4)))return;const k=(i===2?1.15:.8)*(1+u*.13);s+=flame(q,x,CT[i]-up,k)});
  return s}

/* ---------- le buste du portrait ---------- */
function bust(q,u){
  let s=P('M20 100L23 81Q29 70.5 41.6 67.4L58.4 67.4Q71 70.5 77 81L80 100Z',`url(#${q}ar)`);
  s+=L_('M50 74L50 100','#4c4046',.8)+seam(q,u,'M35 79Q50 85 65 79')+seam(q,u,'M37.5 91Q50 95.5 62.5 91',.5);
  s+=glow(q,50,86.4,9,.55+u*.1)+P('M50 79.6L55.6 86.4L50 93.2L44.4 86.4Z','#1a1214','stroke="#6a5a5e" stroke-width=".6"')+P('M50 81.8L53.6 86.4L50 91L46.4 86.4Z',`url(#${q}gm)`)+P('M50 82.6L51.4 84.6L49 85.4Z','#fff','opacity=".8"')+seam(q,u,'M44.4 86.4L40.6 84.8M55.6 86.4L59.4 88M50 93.2L49.2 97',.4);
  s+=P('M39.4 64Q50 69.6 60.6 64L62.4 70.4Q50 76 37.6 70.4Z','#2a2226')+L_('M39.4 64Q50 69.6 60.6 64','#6a5e64',.6)+seam(q,u,'M38.4 70.8Q50 76.2 61.6 70.8',.5);
  const pl=P('M9 93Q11 80.4 23.6 76Q34 73.6 40.4 79Q34.4 86.4 26 90.2Q17.6 93.4 9 93Z','#141012')+seam(q,u,'M9.8 92.4Q18 92.6 26 89.6Q34 86 40 79.4',.5)
    +P('M11.4 85Q14.4 72.4 27 69Q37.4 67.8 41.4 74Q35.4 80.4 27.4 83.4Q19 86.4 11.4 85Z','#1d171a')+seam(q,u,'M12 84.6Q19.6 85.6 27.4 83Q35.2 80 41 74.4',.5)
    +P('M14.6 76.6Q18.4 64 31 62.4Q40.4 62.4 43.4 68Q37.4 73.6 29.4 76.2Q21 78.4 14.6 76.6Z',`url(#${q}ar)`)+L_('M16 74Q20 65 31 63.4Q39 63.2 42.6 67.4','#74686e',.6,'opacity=".8"')+seam(q,u,'M15.4 76.4Q22 77.8 29.4 75.8Q37 73 43 68.4',.5);
  return s+MI(pl)}

/* ---------- ailes de cendre (formes ultra II et III) : plumes brûlées en deux rangs ---------- */
function feather(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),nx=-sn,ny=c,tx=R[0]+len*c,ty=R[1]+len*sn,mx=R[0]+len*.58*c,my=R[1]+len*.58*sn,nk=R[0]+len*.86*c,nky=R[1]+len*.86*sn;
  const d=`M${r1(R[0]+nx*1.6)} ${r1(R[1]+ny*1.6)}Q${r1(mx+nx*wd)} ${r1(my+ny*wd)} ${r1(nk+nx*wd*.5)} ${r1(nky+ny*wd*.5)}L${r1(nk+nx*wd*.1)} ${r1(nky+ny*wd*.1)}L${r1(tx)} ${r1(ty)}Q${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)} ${r1(R[0]-nx*1.6)} ${r1(R[1]-ny*1.6)}Z`;
  return P(d,fill,`stroke="${edge}" stroke-width="${ew}" stroke-opacity=".9" stroke-linejoin="round"`)+L_(`M${r1(R[0]+len*.3*c)} ${r1(R[1]+len*.3*sn)}L${r1(R[0]+len*.78*c)} ${r1(R[1]+len*.78*sn)}`,'#3a2c2f',.4,'opacity=".7"')}
function wings(q,u){const R=[36,62],ed=u>=3?'#ff9a3a':EMB,ew=u>=3?.7:.5;let w='';
  [[-176,45],[-157,52],[-138,56],[-119,52],[-101,45]].forEach(([a,l],k)=>{w+=feather(R,a,l,6.2,k%2?'#151012':'#1b1417',ed,ew);if(u>=3){const t=a*Math.PI/180,x=r1(R[0]+l*Math.cos(t)),y=r1(R[1]+l*Math.sin(t));w+=glow(q,x,y,3.4,.8)+C_(x,y,.9,'#ffd27a')}});
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
function eryPortrait(u,v){u=Math.max(0,Math.min(3,u|0));v=v||'hero';if(v==='young')return eryYoung();const ck='p'+u+v;if(EC[ck])return EC[ck];const q='ep'+u+v[0]+'_',HERO=v==='hero';
  const rc=(typeof RCOL!=='undefined'&&RCOL[4])||'#ffd84a',cc=(typeof CLS!=='undefined'&&CLS.Guerrier&&CLS.Guerrier.c)||'#ff5a4a';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Éryndel le Roi de Cendre"><defs>${defs(q,u)}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  s+=rays(50,35,12,80,.07)+C_(50,35,31+u*2,`url(#${q}gl)`)+C_(50,35,24.6,'none','stroke="#ff5a14" stroke-width="3.4" opacity=".28"')+C_(50,35,22,'#140607')+C_(50,35,22.6,'none','stroke="#ffc062" stroke-width="1.1" opacity=".95"');
  if(u>=3)s+=C_(50,35,26.5,'none','stroke="#ffd27a" stroke-width=".6" stroke-dasharray="1.4 2.6" opacity=".8"');
  s+=PART.slice(0,8+u).map(([x,y,r],k)=>k%3===2?flake(x,y,r):C_(x,y,r,k%2?'#ffb21a':EMB,'opacity=".9"')).join('');
  if(u>=2)s+=wings(q,u);
  s+=headBack(q,u)+bust(q,u)+headFront(q,u)+crown(q,u)+frame();
  if(!HERO)return EC[ck]=s+'</svg>';
  if(u){[[16,30,2.2],[84,22,1.8],[22,70,1.4],[78,58,1.6],[50,6,1.2]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
    s+=`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
  s+=`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/><path d="M86 75L88 86L86 88L84 86Z M81 86L91 86L91 87.6L81 87.6Z M85.2 88h1.6v4h-1.6z" fill="${cc}"/></svg>`;
  return EC[ck]=s}

/* ---------- le jeune Éryndel, « le Porteur Brûlé » : avant la couronne ----------
   cheveux courts couleur charbon qui rougeoient, vêtements simples roussis, la moitié du visage brûlée,
   la flamme du Cœur qui brûle à travers sa tunique, et la tour en feu derrière lui. */
function eryYoung(){if(EC.young)return EC.young;const q='ey_';
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Éryndel, le Porteur Brûlé"><defs>${defs(q,0)}
<linearGradient id="${q}sy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14081c"/><stop offset=".55" stop-color="#3c0c14"/><stop offset="1" stop-color="#a8340c"/></linearGradient>
<linearGradient id="${q}cl" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4638"/><stop offset="1" stop-color="#261a14"/></linearGradient>
<linearGradient id="${q}hy" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e3436"/><stop offset=".7" stop-color="#1c1617"/><stop offset="1" stop-color="#2a1610"/></linearGradient></defs>`;
  /* ciel de nuit rougi, la tour qui brûle, la fumée */
  s+=`<rect width="100" height="100" fill="url(#${q}sy)"/>`+glow(q,16,34,30,.55)+glow(q,84,96,26,.4);
  s+=P('M0 86Q14 78 30 82Q48 74 66 80Q84 74 100 80V100H0Z','#1c0a0e');
  s+=P('M7 100L9.6 48L7.4 46L13.6 31L22.4 31L28.6 46L26.4 48L29 100Z','#0e0709')+P('M13.6 31L18 22L22.4 31Z','#0e0709')
    +[[15.4,52],[20.4,64],[14.6,76],[21,86]].map(([x,y])=>`<rect x="${x}" y="${y}" width="2.4" height="4" rx="1.2" fill="#ff8a2a"/>`).join('')
    +flame(q,12.6,32,1.5)+flame(q,18,27,2.1)+flame(q,23.2,32,1.4)+flame(q,9,47,1)+flame(q,27.4,47,1.1);
  s+=E_(30,14,9,5,'#4a3846','opacity=".45"')+E_(42,8,11,5.4,'#4a3846','opacity=".35"')+E_(58,5,12,5,'#4a3846','opacity=".25"');
  s+=[[34,22,.6],[74,30,.7],[88,14,.5],[66,12,.45],[46,30,.4],[92,44,.5],[8,18,.45],[80,58,.4]].map(([x,y,r],k)=>C_(x,y,r,k%2?'#ffb21a':EMB,'opacity=".9"')).join('');
  /* capuche rabattue et tunique roussie */
  s+=P('M30 100Q28 77 34 67Q38.6 59 44.6 57L55.4 57Q61.4 59 66 67Q72 77 70 100Z','#2a1e1a');
  s+=P('M16 100Q19 84 30 77Q39 72.4 50 72.4Q61 72.4 70 77Q81 84 84 100Z',`url(#${q}cl)`);
  s+=P('M44 72.4L50 79.4L56 72.4Z','#1e1614')+L_('M43 72.4L50 80.4L57 72.4','#6a5240',1);
  const cl=P('M14 100Q16 82 30 75Q38 71.6 45.6 71.4L44 76.4L41.4 75.2L40 80.8L36.4 78.6L34.6 84.2L31.8 83.4L29.6 89.4L26.4 87.6L24.6 94.4L21 92.6L18 100Z','#2e221d')
    +L_('M45.6 71.4L44 76.4L41.4 75.2L40 80.8L36.4 78.6L34.6 84.2L31.8 83.4L29.6 89.4L26.4 87.6L24.6 94.4L21 92.6L18 100',EMB,1.8,'opacity=".25"')+L_('M45.6 71.4L44 76.4L41.4 75.2L40 80.8L36.4 78.6L34.6 84.2L31.8 83.4L29.6 89.4L26.4 87.6L24.6 94.4L21 92.6L18 100','#ff8a3a',.55,'opacity=".9"');
  s+=MI(cl);
  s+=L_('M31 79L64 100','#3a2414',3.6)+L_('M31 79L64 100','#6a4428',2.2)+`<rect x="43.6" y="84.6" width="4.6" height="3.6" rx=".6" fill="#c8a060" transform="rotate(32 45.9 86.4)"/>`;
  /* la flamme du Cœur qui brûle à travers la tunique */
  s+=glow(q,57.4,86.4,9,.9)+P('M53 82Q57 79.6 60.6 82.6Q62.4 86.6 59.4 90Q55 91.6 53 88.4Q51.6 85 53 82Z','#1a0806')+L_('M53 82Q57 79.6 60.6 82.6Q62.4 86.6 59.4 90Q55 91.6 53 88.4Q51.6 85 53 82Z','#ff8a3a',.6)+flame(q,57,89.6,1.25);
  /* cheveux de derrière, visage, moitié brûlée, mèches en bataille */
  s+=P('M34 46Q32 30 42 24.6Q50 21 58 24.6Q68 30 66 46Q66 54 62.4 58L37.6 58Q34 54 34 46Z',`url(#${q}hy)`);
  s+=face(q,0,true);
  s+=P('M51 30Q58 30.4 61.4 34Q64.6 40 64.4 45.6Q64.2 54 59.4 60Q55.8 64 51.8 65.6L52.8 62L55 60.4L54 57L56.6 54.6L55.2 50.6L57.6 48.6L55.6 44.6L58.4 41.6L56 38.4L57.4 34.6Z','#6a5c56','opacity=".55"');
  s+=crack(q,'M57.6 36L59.6 40.4L58.6 44.6M59.6 40.4L62.4 41.6')+crack(q,'M58.6 49.4L61.4 53.8L60 57.6M61.4 53.8L63.4 53.4')+crack(q,'M56.6 59.4L58.4 62.2');
  /* mèches en bataille, balayées sur le côté, pointes qui rougeoient */
  s+=P('M35 45Q33.4 30.4 42.4 25.2Q50.6 21.2 58.6 25Q66.8 29.6 65.2 44.6Q64.4 39.4 62.2 36.6L63 41.4L59.2 35.4L58.6 39.6L55 34.2Q51.4 36.6 46.6 37.6Q42.4 38.6 40.4 42.2Q41.6 37.6 44.6 35.4Q40.6 36.4 37.6 40.6Q38.4 37.6 40.2 35.8Q37 38 35 45Z',`url(#${q}hy)`)
    +L_('M44.6 35.4Q48.8 32.8 54.4 31.6M40.2 35.8Q44 32.6 48.6 31.4M58.4 30Q61.4 32.6 62.6 36.4','#4e4446',.5,'opacity=".8"');
  s+=L_('M63 41.4L62.6 40M58.6 39.6L58.4 38.2M40.4 42.2L40.8 40.8M37.6 40.6L38.2 39.4','#ff9a3a',1,'opacity=".95"');
  s+=MI(P('M35 44Q34 49.6 35.8 53Q36.2 48 37.8 44.4Z',`url(#${q}hy)`));
  return EC.young=s+'</svg>'}

/* ---------- le corps entier (cadre 160×244, comme les autres héros) ---------- */
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
function eryKingBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(EC[ck])return EC[ck];const q='eb'+u+(bare?'s':'')+'_',A=`url(#${q}ar)`;
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Éryndel le Roi de Cendre en pied"><defs>${defs(q,u)}<radialGradient id="${q}bb" cx="50%" cy="40%" r="60%"><stop offset="0" stop-color="#ff7a2a" stop-opacity="${.38+u*.08}"/><stop offset=".55" stop-color="#5a0e04" stop-opacity=".32"/><stop offset="1" stop-color="#0a0202" stop-opacity="0"/></radialGradient></defs>`;
  /* décor : lueur, éclipse, quelques braises qui montent (peu d'animations) */
  s+=bare?`<g class="lgbk">${C_(80,36,40,`url(#${q}gl)`,'opacity=".6"')}${C_(80,36,31.4,'none','stroke="#ff5a14" stroke-width="4" opacity=".26"')}${C_(80,36,28.5,'#140607')}${C_(80,36,29.2,'none','stroke="#ffc062" stroke-width="1.3" opacity=".95"')}</g>`:`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,36,14,120,.05)}${C_(80,36,42+u*3,`url(#${q}gl)`,'opacity=".75"')}${C_(80,36,31.4,'none','stroke="#ff5a14" stroke-width="4" opacity=".26"')}${C_(80,36,28.5,'#140607')}${C_(80,36,29.2,'none','stroke="#ffc062" stroke-width="1.3" opacity=".95"')}`;
  if(!bare){if(u>=1)s+=C_(80,36,46+u*4,'none',`stroke="${EMB}" stroke-width="1.2" stroke-dasharray="2 6" opacity=".55"`);
  s+=[...Array(6)].map((_,k)=>{const x=24+k*22.4,d=3.4+(k%3)*.9;return`<circle r="${(.8+(k%3)*.4).toFixed(1)}" fill="${k%2?'#ffb21a':'#c8bcb0'}" opacity=".8"><animateMotion dur="${d}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${r1(x)} 214q${k%2?6:-6} -60 ${k%2?-4:4} -150"/></circle>`}).join('');
  s+=`</g>`}
  s+=E_(80,219,42,6,'#000','opacity=".5"')+L_('M80 219L58 223M80 219L102 224M80 219L70 226M80 219L95 213',EMB,.8,'opacity=".55"');
  if(u>=2)s+=`<g transform="translate(12.5 -15) scale(1.35)">${wings(q,u)}</g>`;
  /* cape qui se consume (plus étroite) */
  const hem='M38 208L45 203L50 212L57 205L64 213L72 206L80 214L88 206L96 213L103 205L110 212L115 203L122 208';
  s+=P(`M63 64Q48 120 ${hem.slice(1)}Q112 120 97 64Z`,`url(#${q}cp)`)
    +P('M63 66Q51 120 43 202L50 199Q55 130 66 70Z',`url(#${q}ln)`,'opacity=".9"')+P('M97 66Q109 120 117 202L110 199Q105 130 94 70Z',`url(#${q}ln)`,'opacity=".9"')
    +L_(hem,EMB,3,'opacity=".3"')+L_(hem,u>=3?'#ffd27a':'#ff8a3a',1,'opacity=".95"');
  s+=[[50,212],[64,213],[80,214],[96,213],[110,212]].map(([x,y])=>flame(q,x,y-1,.9+u*.12)).join('');
  s+=HG(headBack(q,u));
  /* jambes (plus fines) */
  const leg=P('M65.4 124L76.4 124L75 166L73.8 204L64.6 204L64 166Z',A)+L_('M66.6 130L65.8 166M75 130L74.4 166','#4a3e44',.6)
    +E_(69.5,165,5.6,4.4,'#1d171a')+seam(q,u,'M64.2 167Q69.5 170.6 74.8 167',.5)+C_(69.5,164.4,1.2,'#ff8a2a')
    +P('M62.6 202L74.6 202L75 210L56.4 212.4Q57.4 206.6 62.6 202Z','#161214')+seam(q,u,'M57.2 211.6L75 209.4',.5);
  s+=MB(leg);
  /* tabard et tassettes */
  s+=P('M73.4 118L86.6 118L88.6 188L80 194L71.4 188Z',`url(#${q}ln)`)+L_('M71.4 188L80 194L88.6 188','#ffb24a',.8,'opacity=".85"')
    +P('M75 146L76.8 140.4L78.6 144L80 138.6L81.4 144L83.2 140.4L85 146Z','#ffb24a','opacity=".85"')+P('M75 147.2H85V149H75Z','#ffb24a','opacity=".85"');
  s+=P('M60 114Q80 121.6 100 114L102 130Q80 137.6 58 130Z',A)+seam(q,u,'M58.8 129.2Q80 136.8 101.2 129.2',.55)+L_('M60.4 121.6Q80 128.4 99.6 121.6','#4a3e44',.7);
  /* torse et cœur de flamme */
  s+=P('M62 66Q80 60.6 98 66L99.6 97Q96.4 115 80 120.4Q63.6 115 60.4 97Z',A)+L_('M80 68L80 118','#4c4046',.9)
    +seam(q,u,'M65 80Q80 86.4 95 80')+seam(q,u,'M66.4 101Q80 106.6 93.6 101',.5);
  s+=glow(q,80,90,12,.6+u*.1)+P('M80 82.4L86 90L80 97.6L74 90Z','#1a1214','stroke="#6a5a5e" stroke-width=".7"')+P('M80 84.8L84 90L80 95.2L76 90Z',`url(#${q}gm)`)+P('M80 85.8L81.6 88.2L78.8 89Z','#fff','opacity=".8"')
    +seam(q,u,'M74 90L69.2 87.8M86 90L90.8 92.4M80 97.6L79.2 103.4M76.6 85.6L73.4 81.4',.45);
  s+=P('M61.4 111Q80 118.6 98.6 111L98.6 116.4Q80 124 61.4 116.4Z','#1a1214')+`<rect x="76" y="113.6" width="8" height="6.4" rx="1.4" fill="#2a2024" stroke="#ffb24a" stroke-width=".7"/>`+C_(80,116.8,1.4,'#ff8a2a');
  s+=P('M69 52Q80 57.4 91 52L93 61.6Q80 68 67 61.6Z','#2a2226')+L_('M69 52Q80 57.4 91 52','#6a5e64',.7)+seam(q,u,'M67.4 62.2Q80 68.6 92.6 62.2',.55);
  /* bras droit (côté gauche de l'image), long, qui descend tenir la hache */
  s+=P('M51 76Q46.6 96 47.4 114L57 114.6Q57.6 96 61 80Z',A)+L_('M49.4 92L58.4 93','#4a3e44',.6)
    +P('M47.4 117Q46 131 47 144L55.6 144.6Q56.4 131 57.2 117.6Z',A)+L_('M47.4 130L56.2 130.6','#4a3e44',.6)+seam(q,u,'M47.2 141.4Q51.4 143 55.8 141.8',.45)
    +L_('M51 76Q46.6 96 47.4 114M47.4 117Q46 131 47 144','#7a6e74',.8,'opacity=".85"')+L_('M61 80Q57.6 96 57 114.6M57.2 117.6Q56.4 131 55.6 144.6','#0a0809',.7,'opacity=".9"')
    +E_(52.2,115.4,6,4.6,'#1d171a')+seam(q,u,'M46.6 116.8Q52.2 120.2 57.8 116.8',.5)+C_(52.2,114.8,1.2,'#ff8a2a');
  /* bras gauche, long : la Flamme volée levée dans sa paume */
  s+=P('M99.6 79Q105 95 105.4 113L115 112Q113.4 94 108.6 75.4Z',A)+L_('M101.8 94L111 93','#4a3e44',.6)
    +P('M106.6 113.6Q114 101 119.6 89L127.2 93.4Q121 106 113.8 117Z',A)+L_('M113.6 101.4L120.8 105.2','#4a3e44',.6)+seam(q,u,'M118.4 92.4L125.2 96.2',.45)
    +L_('M108.6 75.4Q113.4 94 115 112M113.8 117Q121 106 127.2 93.4','#7a6e74',.8,'opacity=".85"')+L_('M99.6 79Q105 95 105.4 113M106.6 113.6Q114 101 119.6 89','#0a0809',.7,'opacity=".9"')
    +E_(110.2,112.6,6,4.6,'#1d171a')+seam(q,u,'M104.6 114Q110.2 117.4 115.8 114',.5)+C_(110.2,112,1.2,'#ff8a2a')
    +E_(124.4,89.6,6,4.4,'#1d171a','transform="rotate(-24 124.4 89.6)"')+L_('M119.4 89.6Q124 86.4 129.4 88.4','#4a3e44',.8);
  /* épaulières (plus petites) */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z','#141012')+seam(q,u,'M46.2 89.4Q52 89.2 57.2 86.4Q63.8 83 69.2 77',.5)
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z','#1d171a')+seam(q,u,'M48.4 82.2Q54.4 82.4 60.6 80Q66.8 77.4 71.8 73.4',.5)
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',A)+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#74686e',.6,'opacity=".8"')+seam(q,u,'M51.2 74.2Q56.6 75.2 62.6 73.4Q68.8 71.2 74 67.4',.5);
  s+=MB(pa);
  /* la grande hache de cendre, tenue DEVANT lui */
  s+=L_('M50.8 214L50.8 24','#140f12',4.6)+L_('M50.8 214L50.8 24','#3a2c26',3)+[58,100,170,196].map(y=>`<rect x="48.2" y="${y}" width="5.2" height="3" rx=".8" fill="#5a4a40" stroke="#1a1214" stroke-width=".5"/>`).join('')
    +P('M47.8 212L53.8 212L52.8 219L48.8 219Z','#2a2024')
    +P('M50.8 30Q36 21 22 16Q12 38 22 62Q36 54 50.8 51Z',`url(#${q}st)`,'stroke="#0d0a0c" stroke-width=".8"')
    +L_('M22 16Q12 38 22 62',EMB,3.6,'opacity=".32"')+L_('M22.6 17.4Q13.6 38 22.6 60.6',u>=3?'#ffd27a':'#ff9a3a',1.3)
    +C_(37.6,39.4,4,'#0d0a0c','stroke="#4a3e44" stroke-width=".8"')+glow(q,37.6,39.4,3.6,.9)+L_('M29.4 26.6L26.4 31.4L29.6 33.6L26.6 37.8M29.2 46L26.4 50.4L29.4 52.8',EMB,.6,'opacity=".8"')+C_(45.4,40.6,1.5,`url(#${q}gm)`)
    +P('M50.8 33L62 39.6L50.8 46.2Z',`url(#${q}st)`,'stroke="#0d0a0c" stroke-width=".6"')+L_('M61 39.6L51.8 39.6',EMB,.5,'opacity=".7"')
    +P('M49.2 30L50.8 12L52.4 30Z','#2a2428','stroke="#0d0a0c" stroke-width=".5"')+C_(50.8,30.6,2.4,'#1a1214','stroke="#9a6a32" stroke-width=".6"');
  /* le gantelet serre le manche */
  s+=E_(51.4,148.6,5.6,5.4,'#1d171a')+L_('M46.6 146.6Q51.4 144.6 56.2 146.6M46.2 150.4Q51.4 148.4 56.6 150.4','#4a3e44',.8)+seam(q,u,'M46.4 143.8Q51.4 145.4 56.4 144',.4);
  /* la tête */
  s+=HG(headFront(q,u)+crown(q,u));
  /* la Flamme volée (une seule animation légère) */
  s+=glow(q,125,76,14,.75)+`<g>${flame(q,125,87.6,3.5+u*.3)}<animate attributeName="opacity" values="1;.82;1;.9;1" dur="1.6s" repeatCount="indefinite"/></g>`;
  if(u)[[10,40,2.2],[150,58,1.8],[14,140,1.6],[146,150,1.8],[80,-4,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  s+='</svg>';return EC[ck]=s}

/* ---------- le jeune Éryndel du mode histoire (Livre III), avant le vol de la flamme ----------
   vivant et chaleureux : peau dorée, cheveux châtains, tunique de voyage, aucune arme (« ni épée, ni château »),
   la flamme dorée du Cœur dans sa paume. Rien à voir avec le Roi de Cendre. */
function eryYoungBody(){if(EC.yb)return EC.yb;const q='ys_';
  const D=defs(q,0).replace('#ebe1d8','#f8dec8').replace('#d9cdc3','#eecaae').replace('#b2a398','#cc9e80');
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Éryndel, le Premier Porteur"><defs>${D}
<linearGradient id="${q}tu" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#a24a32"/><stop offset="1" stop-color="#5c2418"/></linearGradient>
<linearGradient id="${q}ck" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a6474"/><stop offset="1" stop-color="#2a303c"/></linearGradient>
<linearGradient id="${q}pt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3c3646"/><stop offset="1" stop-color="#211d28"/></linearGradient>
<linearGradient id="${q}hb" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7a5640"/><stop offset=".6" stop-color="#43291c"/><stop offset="1" stop-color="#2a1810"/></linearGradient>
<linearGradient id="${q}gf" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#ffffff"/><stop offset=".45" stop-color="#fff0a0"/><stop offset="1" stop-color="#ffb84a"/></linearGradient>
<radialGradient id="${q}gg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd84a" stop-opacity=".38"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient></defs>`;
  s+=E_(80,219,34,5.5,'#000','opacity=".4"');
  /* cape de voyage et capuche rabattue */
  s+=P('M62 62Q54 110 50 176Q65 182 80 180Q95 182 110 176Q106 110 98 62Z',`url(#${q}ck)`)+P('M62 64Q56 112 53 172L58 174Q60 116 66 68Z','#1e232c','opacity=".7"')+P('M98 64Q104 112 107 172L102 174Q100 116 94 68Z','#1e232c','opacity=".7"')
    +L_('M50 176Q65 182 80 180Q95 182 110 176','#8a96a8',.8,'opacity=".6"');
  s+=P('M66 55Q80 49 94 55Q96.6 63 92.4 68Q80 72.6 67.6 68Q63.4 63 66 55Z','#3a4250');
  s+=HG(P('M34 46Q32 30 42 24.6Q50 21 58 24.6Q68 30 66 46Q66 54 62.4 58L37.6 58Q34 54 34 46Z',`url(#${q}hb)`));
  /* jambes et bottes */
  const leg=P('M67.4 138L78.6 138L77.4 176L76.6 200L68.4 200L67.6 176Z',`url(#${q}pt)`)+P('M66.6 196L77.2 196L77.6 208L60.6 210.6Q61.4 204 66.6 196Z','#4a2e1e')+L_('M66.4 197.4L77.4 197.4','#6a4a32',1);
  s+=MB(leg);
  /* tunique, ceinture, sacoche */
  s+=P('M64 64Q80 59.6 96 64L97.6 96Q98.6 120 100.6 146Q80 152 59.4 146Q61.4 120 62.4 96Z',`url(#${q}tu)`)+P('M90 66Q96 100 100.6 146L96 147.4Q92 104 86 66Z','#000','opacity=".14"')
    +L_('M59.4 146Q80 152 100.6 146','#d8b070',.9,'opacity=".8"')+L_('M80 68L80 86','#3a140c',.8)+L_('M77.6 72L82.4 74M77.6 76.6L82.4 78.6M77.6 81.2L82.4 83.2','#d8b070',.6,'opacity=".8"')
    +P('M75 61L80 70L85 61Z',`url(#${q}sk)`)+L_('M74.4 61L80 70.6L85.6 61','#5a2418',1);
  s+=P('M61.6 114Q80 119 98.4 114L98.6 119.6Q80 124.6 61.4 119.6Z','#5a3a24')+`<rect x="76.4" y="115.4" width="7.2" height="6" rx="1.2" fill="#d8b070" stroke="#8a5a2a" stroke-width=".7"/>`;
  s+=L_('M66 64L97 126','#3a2414',3.4)+L_('M66 64L97 126','#6a4428',2)+`<rect x="94" y="124" width="10" height="9" rx="2.4" fill="#6a4630" stroke="#3a2414" stroke-width=".7"/>`+C_(99,128.4,1,'#d8b070');
  /* bras droit au repos, bras gauche levé : la flamme dorée du Cœur */
  s+=P('M62.4 64.6Q57.6 84 58.4 104L66.6 104.6Q67 86 69.6 70Z',`url(#${q}tu)`)+P('M58.4 106Q57.4 120 58.6 134L65.8 134.4Q66.4 120 66.6 106.6Z','#6a4630')+L_('M58.6 112L66.2 112.6M58.4 120L66.2 120.4M58.6 128L66 128.4','#3a2414',.6)
    +E_(62.2,138.8,4.2,4.8,`url(#${q}sk)`)+L_('M59 140Q61 143.4 64.6 142','#b48a72',.6);
  s+=P('M93.6 68Q99.6 86 100.4 104L108.4 103.2Q106.8 85 100.6 64.6Z',`url(#${q}tu)`)+P('M101 105.4Q107.4 94.4 112.6 83.4L119 87Q113.6 98.4 107.6 109Z','#6a4630')+L_('M104 101.4L110.2 104.8M107.4 95L113.4 98.2','#3a2414',.6)
    +E_(116.4,83.2,4.8,3.6,`url(#${q}sk)`,'transform="rotate(-24 116.4 83.2)"')+L_('M112.4 83.6Q116.6 80.6 121 82.6','#b48a72',.6);
  /* la tête */
  const fc=face(q,0,true).replace(/#c9bcb1/g,'#e4bea2').replace(/#8e8078/g,'#b98c74').replace(/#9a8a80/g,'#b48a72').replace(/#8e7e74/g,'#b08670').replace("M47 58.6Q50 59.4 53 58.4","M46.8 58Q50 60.4 53.2 58").replace(/#3a2c2a/g,'#4a2c1e');
  s+=HG(fc+P('M35 45Q33.4 30.4 42.4 25.2Q50.6 21.2 58.6 25Q66.8 29.6 65.2 44.6Q64.4 39.4 62.2 36.6L63 41.4L59.2 35.4L58.6 39.6L55 34.2Q51.4 36.6 46.6 37.6Q42.4 38.6 40.4 42.2Q41.6 37.6 44.6 35.4Q40.6 36.4 37.6 40.6Q38.4 37.6 40.2 35.8Q37 38 35 45Z',`url(#${q}hb)`)
    +L_('M44.6 35.4Q48.8 32.8 54.4 31.6M40.2 35.8Q44 32.6 48.6 31.4M58.4 30Q61.4 32.6 62.6 36.4','#9a7458',.5,'opacity=".8"')+MI(P('M35 44Q34 49.6 35.8 53Q36.2 48 37.8 44.4Z',`url(#${q}hb)`)));
  /* la flamme du Cœur (une seule animation légère) */
  s+=C_(117,70,15,`url(#${q}gg)`)+`<g>${P('M117 61.6Q125.4 71.6 121.2 79.2Q119.4 82 117 82.2Q114.6 82 112.8 79.2Q108.6 71.6 117 61.6Z',`url(#${q}gf)`)+P('M117 69.4Q120.6 74.4 118.6 78.4Q117.8 79.6 117 79.6Q116.2 79.6 115.4 78.4Q113.4 74.4 117 69.4Z','#ffffff','opacity=".9"')}<animate attributeName="opacity" values="1;.85;1;.92;1" dur="1.8s" repeatCount="indefinite"/></g>`
    +[[108,62,1],[126,58,.8],[124,72,.7],[110,74,.6]].map(([x,y,r])=>STARP(x,y,r)).join('');
  return EC.yb=s+'</svg>'}
/* le mode histoire : le jeune Éryndel et le Roi de Cendre avec ces nouveaux dessins */
try{const se=window.eryBody;if(typeof se==='function')window.eryBody=function(k){try{if(k==='roi')return eryKingBody(0,true);if(k==='eryndel')return eryYoungBody()}catch(e){}return se.apply(this,arguments)}}catch(e){}

/* ---------- son histoire, fidèle au Livre III (« L'Écho du Premier Porteur ») ---------- */
try{STL[ERY]=["Éryndel n'avait ni épée ni château, seulement l'envie de protéger ceux qu'il aimait. C'est pour cela que le Cœur l'a choisi : il fut le tout premier Porteur de sa flamme.",
 "Les années ont passé, ses cheveux sont devenus gris, et la peur d'être oublié l'a rongé. Une nuit, il a volé la flamme du Cœur. La tour a brûlé, et le feu l'a gardé en vie mille ans dans les Cendres de l'Aube, jusqu'à faire de lui le Roi de Cendre.",
 "Vaincu par tout le royaume, Éryndel a enfin compris ce qu'il refusait d'entendre : une flamme ne se garde pas, elle se transmet. Il se bat désormais à tes côtés, pour qu'on se souvienne de lui comme d'un protecteur, et non comme d'un roi."]}catch(e){}
try{const X={"Éryndel n'avait ni épée ni château, seulement l'envie de protéger ceux qu'il aimait. C'est pour cela que le Cœur l'a choisi : il fut le tout premier Porteur de sa flamme.":"Éryndel had no sword and no castle, only the wish to protect the people he loved. That is why the Heart chose him: he was the very first Bearer of its flame.",
 "Les années ont passé, ses cheveux sont devenus gris, et la peur d'être oublié l'a rongé. Une nuit, il a volé la flamme du Cœur. La tour a brûlé, et le feu l'a gardé en vie mille ans dans les Cendres de l'Aube, jusqu'à faire de lui le Roi de Cendre.":"Years went by, his hair turned grey, and the fear of being forgotten ate away at him. One night, he stole the Heart's flame. The tower burned, and the fire kept him alive for a thousand years in the Ashes of Dawn, until it made him the Ash King.",
 "Vaincu par tout le royaume, Éryndel a enfin compris ce qu'il refusait d'entendre : une flamme ne se garde pas, elle se transmet. Il se bat désormais à tes côtés, pour qu'on se souvienne de lui comme d'un protecteur, et non comme d'un roi.":"Defeated by the whole kingdom, Éryndel finally understood what he had refused to hear: a flame is not kept, it is passed on. He now fights by your side, so that he will be remembered as a protector, not as a king.",
 "Éryndel, le Porteur Brûlé":"Éryndel, the Burnt Bearer"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}

/* ---------- branchements ---------- */
/* le boss de l'événement et le lieutenant du jour 4 utilisent ces dessins */
{const ma=monArt;monArt=function(n,hh,bs){try{if(n==='Éryndel, le Roi de Cendre'){const k='ERYboss';return PIMG[k]||(PIMG[k]=svgToImg(eryPortrait(3,'boss')))}if(n==='Éryndel, le Porteur Brûlé'){const k='ERYyoung';return PIMG[k]||(PIMG[k]=svgToImg(eryYoung()))}}catch(e){}return ma.apply(this,arguments)}}
try{Object.defineProperty(PCACHE,ERY,{get:()=>eryPortrait(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===ERY)return eryPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===ERY)return eryKingBody(u);return hb.apply(this,arguments)}}
try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+ERY+'(_|$)').test(k))delete C[k]}catch(e){}
}catch(e){console.warn('ery art',e)}})();

/* ================= mode histoire : la musique ne repasse plus sur celle du menu, et le jeu reste fluide =================
   Avant : chaque rafraîchissement de l'écran (et toutes les 20 s) remettait la musique de l'accueil pendant les dialogues. */
(function(){try{
 {const mw=musicWant;musicWant=function(k){try{if(typeof SGP!=='undefined'&&SGP.on&&document.getElementById('sgov'))SGP.mus=k}catch(e){}return mw.apply(this,arguments)}}
 {const pt=pageTheme;pageTheme=function(){try{if(!B&&typeof SGP!=='undefined'&&SGP.on&&SGP.mus!==undefined&&document.getElementById('sgov'))return SGP.mus}catch(e){}return pt.apply(this,arguments)}}
 /* pendant une scène, le jeu caché derrière ne se dessine plus (gros gain sur téléphone) */
 const st=document.createElement('style');st.textContent='body.sgon #app,body.sgon nav.tabs{visibility:hidden;content-visibility:hidden}';document.head.appendChild(st);
 const sync=()=>{try{document.body.classList.toggle('sgon',!!document.getElementById('sgov'))}catch(e){}};
 {const so=sagaOpen;sagaOpen=function(){const r=so.apply(this,arguments);sync();return r}}
 {const sc=sagaClose;sagaClose=function(){const r=sc.apply(this,arguments);sync();return r}}
 {const rr=render;render=function(){const r=rr.apply(this,arguments);sync();return r}}
 setInterval(sync,1500);
 /* les héros qui parlent : image fixe (sans animation), bien plus légère */
 const STILL={},still=x=>String(x||'').replace(/<(animate|animateMotion|animateTransform|set)\b[^>]*\/>/g,'').replace(/<(animate|animateMotion|animateTransform)\b[^>]*>[\s\S]*?<\/(animate|animateMotion|animateTransform)>/g,'');
 {const sf=sagaFig;sagaFig=function(w){try{if(typeof w==='number'&&HEROES[w]){const src=STILL[w]||(STILL[w]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(still(heroBody(HEROES[w],0))));return`<div class="sgfig"><img alt="" src="${src}"></div>`}}catch(e){}return sf.apply(this,arguments)}}
}catch(e){console.warn('saga fix',e)}})();
