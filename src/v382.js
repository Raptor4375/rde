
/* ================= ORION CHASSE-ÉTOILES : nouveau style graphique =================
   Même chasseur : capuche étoilée bleu nuit, cheveux bleu glacier, yeux d'étoile, marques de constellation, arc de lumière.
   Nouveau : visage détaillé, capuche brodée d'étoiles et bordée d'argent, broche-étoile d'or, astrolabe derrière la tête,
   ciel de constellations, cape d'étoiles en ultra II/III, et en pied : une étoile cueillie dans sa main. */
(function(){try{
const ORI=63;if(!HEROES[ORI]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,star8,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#eef2ff'],[.15,'#9ab0ff'],[.4,'#3a4aa8'],[.7,'#141c4a'],[1,'#070a1e']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#cfe0ff',.42],[1,'#8aa0ff',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'ag',[[0,'#ffffff'],[.5,'#dfe8ff'],[1,'#8a9ac8']],1,1)
 +lin(q+'hd',[[0,u>=3?'#4a5ac8':'#33449a'],[.55,'#1e2a6a'],[1,'#0e1436']])
 +lin(q+'tu',[[0,'#2a3a8a'],[1,'#121a48']])
 +lin(q+'ln',[[0,'#9ab0f0'],[1,'#4a5aa8']])
 +lin(q+'sk',[[0,'#f6dcc6'],[.55,'#eac6aa'],[1,'#c99c80']],1,0)
 +lin(q+'hr',[[0,'#e8f6ff'],[.5,'#a8d0ff'],[1,'#5a7ac8']])
 +lin(q+'lb',[[0,'#ffffff'],[.5,'#cfe4ff'],[1,'#8ab0ff']],1,0)
 +lin(q+'bt',[[0,'#dfe6fa'],[.5,'#a8b6e0'],[1,'#5a6aa8']],1,0)+lin(q+'sl',[[0,'#5060c8'],[1,'#26347e']])
 +rad(q+'sg',[[0,'#ffffff',1],[.35,'#cfe8ff',.75],[1,'#8ab0ff',0]]);
const BT=q=>U(q,'bt'),SL=q=>U(q,'sl'),AU=q=>U(q,'au'),AG=q=>U(q,'ag'),HD=q=>U(q,'hd'),TU=q=>U(q,'tu'),LN=q=>U(q,'ln'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),LB=q=>U(q,'lb'),SG=q=>U(q,'sg');
const MI0=s=>s+`<g transform="scale(-1 1)">${s}</g>`;
/* l'étoile d'Orion : étoile à huit branches d'or au cœur blanc */
const ostar=(q,x,y,R)=>P(star8(x,y,R,R*.62,R*.3),AU(q),'stroke="#8a5a1a" stroke-width=".25"')+C_(x,y,r1(R*.3),'#ffffff')+C_(x,y,r1(R*.16),'#cfe4ff');
/* un ciel de constellations (portrait) */
function sky(op){const S=[[12,22],[20,14],[28,24],[18,34],[82,14],[90,24],[78,30],[88,40],[10,50],[92,56]];let s=L_('M12 22L20 14L28 24L18 34Z M82 14L90 24L78 30M90 24L88 40','#cfe0ff',.35,`opacity="${op*.7}"`);
  for(const[x,y]of S)s+=C_(x,y,.7,'#ffffff',`opacity="${op}"`);return s+STARP(20,14,.9)+STARP(90,24,.8)}
/* l'astrolabe derrière la tête */
function sigil(q,cx,cy,R,u,op){op=op==null?.5+u*.12:op;let s=sigilRing(cx,cy,R,op,'#ffe08a','#dfe8ff',36);
  s+=C_(cx,cy,r1(R*1.12),'none',`stroke="#cfe0ff" stroke-width="${r1(R*.012)}" stroke-dasharray="${r1(R*.04)} ${r1(R*.1)}" opacity="${r1(op*.8)}"`);
  let d='';for(let k=1;k<12;k++){if(k===6)continue;const a=(k*30-90)*Math.PI/180;const x=r1(cx+R*.925*Math.cos(a)),y=r1(cy+R*.925*Math.sin(a)),g=R*.05;d+=`M${x} ${r1(y-g)}L${r1(x+g*.35)} ${r1(y-g*.35)}L${r1(x+g)} ${y}L${r1(x+g*.35)} ${r1(y+g*.35)}L${x} ${r1(y+g)}L${r1(x-g*.35)} ${r1(y+g*.35)}L${r1(x-g)} ${y}L${r1(x-g*.35)} ${r1(y-g*.35)}Z`}
  s+=`<path d="${d}" fill="#ffffff" opacity="${r1(Math.min(1,op+.15))}"/>`;
  const y=r1(cy-R*.925);return s+C_(cx,y,r1(R*.14),'#141c4a',`stroke="#ffe08a" stroke-width="${r1(R*.022)}" opacity=".95"`)+ostar(q,cx,y,r1(R*.11))}
/* ---------- la tête ---------- */
function hoodBack(q){return P('M29.4 52Q26.4 22 50 13.6Q73.6 22 70.6 52Q72.6 66 76.6 80L23.4 80Q27.4 66 29.4 52Z',HD(q))+P('M34 48Q33 28 50 22Q67 28 66 48Q60 36 50 34Q40 36 34 48Z','#0a0e2a','opacity=".6"')
  +L_('M26 72Q28.4 60 29.4 52Q26.4 22 50 13.6','#cfe0ff',.7,'opacity=".45"')
  +[[32,30],[36,22],[44,17],[63,19],[68,28],[70,40],[28,42],[73,56],[26,62]].map(([x,y])=>C_(x,y,.55,'#ffffff','opacity=".8"')).join('')}
function face(q,u){
  /* un cou plus large */
  let s=`<rect x="44" y="55" width="12" height="12" fill="${SK(q)}"/>`+P('M44 59.4Q50 63.2 56 59.4L56 64.6Q50 67 44 64.6Z','#a87a64','opacity=".6"');
  /* un visage d'homme : mâchoire carrée, menton marqué */
  s+=P('M36 44Q36 30.2 50 30.2Q64 30.2 64 44Q64 52 62.2 56.6Q59.8 62.4 54.8 64.8Q52.4 65.8 50 65.8Q47.6 65.8 45.2 64.8Q40.2 62.4 37.8 56.6Q36 52 36 44Z',SK(q));
  s+=P('M59.4 45Q62.8 51.6 60.6 57Q58.4 61.8 53.6 64.2Q58.6 59 59.8 52.6Z','#a87a64','opacity=".45"');
  /* une barbe de trois jours */
  s+=P('M38.4 54Q39.6 60.6 44.6 64Q47.4 65.6 50 65.6Q52.6 65.6 55.4 64Q60.4 60.6 61.6 54Q60.6 58.6 57.4 60.4Q54 61.6 50 61.2Q46 61.6 42.6 60.4Q39.4 58.6 38.4 54Z','#4a5a98','opacity=".28"')
    +P('M45.6 56.6Q50 55.4 54.4 56.6Q52.4 57.6 50 57.4Q47.6 57.6 45.6 56.6Z','#4a5a98','opacity=".3"');
  const io=u>=3?{ir:'#ffe9a0',ir2:'#c8901a',glow:'#ffe08a'}:{ir:'#8ac8ff',ir2:'#2a5ad8',glow:'#bfe0ff'};
  s+=eye(44,Object.assign({lid:'#1a2040',open:.82,lw:1.3},io))+eye(56,Object.assign({lid:'#1a2040',open:.82,lw:1.3},io))+STARP(44.2,46.6,.42,'#ffffff')+STARP(55.8,46.6,.42,'#ffffff');
  /* sourcils épais et droits */
  s+=MI(P('M39 42Q43.4 40.6 48.2 42L48 43.4Q43.6 42.2 39.4 43.4Z','#3a5aa8'));
  s+=L_('M50.6 47.6L49.4 53.4Q50.4 54.4 52 53.8','#a87a64',.8)+P('M48.6 53.8Q50.4 55 52.2 54Q50.6 54.8 48.6 53.8Z','#a87a64','opacity=".6"');
  /* bouche ferme, un léger sourire en coin */
  s+=L_('M46.4 58.4Q50 59.6 53.8 58','#7a3a3a',.95)+L_('M53.4 58.2L54.6 57.4','#7a3a3a',.6);
  /* les marques de constellation sur la joue */
  s+=L_('M57.2 50.6L59.6 52.8L57.8 55.4L60.4 57','#bfe0ff',.35,'opacity=".9"')+[[57.2,50.6],[59.6,52.8],[57.8,55.4],[60.4,57]].map(([x,y],k)=>C_(x,y,k===1?.6:.42,'#ffffff')).join('');
  /* cheveux courts bleu glacier, en bataille, et favoris */
  s+=P('M36.2 45Q35.2 32 43.6 27.4Q50 24.6 57 27.2Q65 31.4 63.8 45Q62.6 38.8 59.6 36.4Q58.6 39.4 55.6 40.4Q56.4 37.6 55.6 35.6Q52.4 38.6 47.6 39.4Q49.2 37.2 49 35.4Q45 38.6 40.8 39Q38 40.6 36.2 45Z',HR(q))
    +MI(P('M36.4 44.2Q36 49 37 52.6L38.6 52.2Q38 48.6 38.4 44.6Z',HR(q)))
    +L_('M42 30.4Q46.4 28.4 51 29M52.6 29.2Q58 30.4 61.4 34.6M44.4 34.6Q48 32.2 50.8 31.6','#ffffff',.45,'opacity=".8"');
  return s}
function hoodFront(q,u){let s=P('M31.6 52Q30 26 50 18.6Q70 26 68.4 52Q66.4 36 58.6 30.4Q50 26.6 41.4 30.4Q33.6 36 31.6 52Z',HD(q));
  s+=P('M31.6 52Q33.6 36 41.4 30.4Q50 26.6 58.6 30.4Q66.4 36 68.4 52L66.9 52.4Q65.1 38.2 57.9 32.6Q50 29.2 42.1 32.6Q34.9 38.2 33.1 52.4Z',LN(q));
  s+=L_('M31.9 51.6Q33.9 36.2 41.6 30.7Q50 27 58.4 30.7Q66.1 36.2 68.1 51.6',AG(q),.85)+L_('M31.3 51.2Q29.7 26.2 50 18.9Q70.3 26.2 68.7 51.2',AG(q),.75)
    +L_('M32.3 47.4Q31.5 28.6 50 22.4Q68.5 28.6 67.7 47.4','#ffe08a',.6,'stroke-dasharray=".1 2.2" opacity=".95"');
  s+=ostar(q,50,22.8,2.6);
  if(u>=1)s+=L_('M35 40Q38 28.4 47 24.2','#ffffff',.45,`opacity="${.3+u*.15}"`);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  /* l'arc de lumière derrière l'épaule gauche */
  let s=L_('M30 100Q12 76 22 46Q24 40 27 36','#bfe0ff',4.2,'opacity=".3"')+L_('M30 100Q12 76 22 46Q24 40 27 36',LB(q),2.2)+L_('M27 36Q28.2 32.6 31 31.8Q33.4 31.4 32.9 33.8',u>=3?'#ffe08a':AG(q),1.2)+C_(27,36,1,'#ffffff')+L_('M27.6 35.4Q34 66 52 100','#ffffff',.4,'opacity=".8"');
  /* deux flèches de lumière derrière l'épaule droite */
  const fl=(x,a)=>`<g transform="translate(${x} 70) rotate(${a})">${C_(0,-20,4.4,SG(q),'opacity=".8"')}<path d="M0 0V-17" stroke="#dfe8ff" stroke-width="1"/>${P(star8(0,-20,2.8,1.6,.9),'#ffffff')}</g>`;
  s+=fl(71,16)+fl(76,26);
  /* la cape bleu nuit brodée d'étoiles, doublée d'argent */
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',HD(q))+P('M12 100Q14 85 26 77.6L30 100Z',LN(q))+P('M88 100Q86 85 74 77.6L70 100Z',LN(q))
    +L_('M12.4 99.6Q14.4 85.2 26 78.2M87.6 99.6Q85.6 85.2 74 78.2',AG(q),.7)+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8)
    +[[16,92],[20,84],[82,86],[86,94]].map(([x,y])=>STARP(x,y,.6,'#ffe9a0')).join('');
  /* tunique de minuit, galon d'argent, broche-étoile */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',TU(q))+L_('M33.8 78.2Q40 72.8 50 72.8Q60 72.8 66.2 78.2',AG(q),.8)+L_('M50 74V100','#0a1030',.8)
    +L_('M41 82Q45 86 50 86Q55 86 59 82',AU(q),.5,'opacity=".8"')+ostar(q,50,88,4.2)+C_(50,88,7,SG(q),`opacity="${.25+u*.12}"`);
  /* les fermoirs de la cape : deux étoiles d'argent et une chaînette d'or */
  s+=L_('M34.6 77.6Q42 82 50 81.4Q58 82 65.4 77.6',AU(q),.45,'stroke-dasharray=".8 .8"')+P(star8(34.6,77.6,2.4,1.5,.8),AG(q))+P(star8(65.4,77.6,2.4,1.5,.8),AG(q));
  return s}
/* ultra II et III : une cape d'étoiles qui s'ouvre comme des ailes */
function starCape(q,u){const R=[36,64];let w='';
  [[-174,44],[-156,50],[-137,53],[-118,48],[-100,40]].forEach(([a,l],k)=>{w+=feather(R,a,l,7.4,k%2?'#2a3a8a':'#1e2a6a',u>=3?'#ffe08a':'#9ab0f0',.6)});
  [[-165,30],[-146,33],[-126,32],[-108,26]].forEach(([a,l])=>{w+=feather(R,a,l,5.4,'#3a4ab0','#cfe0ff',.4)});
  const dots=[[-170,40],[-152,44],[-134,48],[-116,42],[-160,26],[-140,30],[-122,28]].map(([a,l])=>{const t=a*Math.PI/180;return C_(r1(R[0]+l*Math.cos(t)),r1(R[1]+l*Math.sin(t)),.6,'#ffffff')}).join('');
  return`<g opacity="${u>=3?.97:.9}">${MI(w+dots)}</g>`}
/* ---------- portrait ---------- */
function oPortrait(u){const q='op'+u+'_';
  let s=pOpen(q,'Orion Chasse-Étoiles',defs(q,u));
  s+=rays(50,34,12,80,.07,'#ffffff')+sky(.9)+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,28,u);
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=starCape(q,u);
  s+=hoodBack(q)+bust(q,u)+face(q,u)+hoodFront(q,u);
  if(u>=3)s+=halo(50,14.6,11,2.8);
  s+=frame('#8ac8ff');
  return s+pClose('Tireur',u,[[16,40,2],[84,40,1.8],[20,62,1.3],[80,60,1.5]])}
/* ---------- corps entier ---------- */
function oBody(u,bare){const q='ob'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Orion Chasse-Étoiles',defs(q,u)+rad(q+'bb',[[0,'#bfd0ff',.36+u*.08],[.55,'#2a3a8a',.28],[1,'#070a1e',0]],'50%','40%','60%'));
  const con='M18 40L30 28L44 36L38 52Z M122 30L136 22L146 38L132 50Z M20 150L32 138L40 154 M128 140L142 132L150 150';
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.05,'#ffffff')}${L_(con,'#cfe0ff',.45,'opacity=".5"')}${[[18,40],[30,28],[44,36],[38,52],[122,30],[136,22],[146,38],[132,50],[20,150],[32,138],[40,154],[128,140],[142,132],[150,150]].map(([x,y],k)=>C_(x,y,k%3?.8:1.2,'#ffffff','opacity=".85"')).join('')}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#ffffff','#cfe0ff'],(c,k)=>`<path d="M0 -2L.6 -.6L2 0L.6 .6L0 2L-.6 .6L-2 0L-.6 -.6Z" fill="${c}" opacity=".9"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffe08a','#9ab0ff',(x,y,k)=>k%3?`M${x} ${r1(y-.9)}V${r1(y+.9)}M${r1(x-.9)} ${y}H${r1(x+.9)}`:`M${x} ${r1(y-1.2)}L${r1(x+.4)} ${r1(y-.4)}L${r1(x+1.2)} ${y}L${r1(x+.4)} ${r1(y+.4)}L${x} ${r1(y+1.2)}L${r1(x-.4)} ${r1(y+.4)}L${r1(x-1.2)} ${y}L${r1(x-.4)} ${r1(y-.4)}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${starCape(q,u)}</g>`;
  /* la grande cape étoilée */
  s+=P('M62 60Q46 110 40 206Q58 213 80 210Q102 213 120 206Q114 110 98 60Z',HD(q))+P('M62 62Q50 120 45 202L51 204Q56 128 67 68Z',LN(q))+P('M98 62Q110 120 115 202L109 204Q104 128 93 68Z',LN(q))
    +L_('M51 203.6Q56 128 66.6 68.6M109 203.6Q104 128 93.4 68.6',AG(q),.8)+L_('M40 206Q58 213 80 210Q102 213 120 206',AU(q),1.3)
    +[[48,170],[56,150],[46,130],[112,168],[104,146],[114,124],[60,190],[100,192]].map(([x,y],k)=>k%2?C_(x,y,.7,'#ffffff','opacity=".85"'):STARP(x,y,.8,'#ffe9a0')).join('');
  /* le carquois de lumière */
  s+=`<g transform="rotate(24 99.5 76)"><rect x="94" y="56" width="11" height="40" rx="3" fill="${TU(q)}" stroke="#0a1030" stroke-width=".6"/><rect x="93.2" y="55.4" width="12.6" height="3" rx="1.2" fill="${AG(q)}"/><rect x="93.4" y="92.4" width="12.2" height="3.4" rx="1.4" fill="${AG(q)}"/>${P(star8(99.5,76,3,1.8,1),AU(q))}</g>`;
  [[104,60,24],[107.6,62,30],[110.6,65,36]].forEach(([x,y,a])=>{s+=`<g transform="translate(${x} ${y}) rotate(${a})">${C_(0,-34,5.6,SG(q),'opacity=".8"')}<path d="M0 0V-30" stroke="#dfe8ff" stroke-width="1.2"/>${P(star8(0,-34,3.4,2,1.1),'#ffffff')}</g>`});
  /* l'arrière de la capuche tombe derrière les épaules */
  s+=HG(hoodBack(q));
  /* jambes : chausses bleu nuit, bottes d'argent à boucle-étoile */
  const leg=(x,f)=>{const o=f?1:-1,tx=f?x+17.6:x-6.6,bx=f?x-1.4:x+12.4;
    return P(`M${x} 128L${x+11} 128L${x+10.4} 176L${x+.6} 176Z`,'#1a2458')+L_(`M${x+.6} 150L${x+10.4} 151M${x+.6} 160L${x+10.4} 161`,'#3a4aa8',.8,'opacity=".7"')
    +P(`M${x-.6} 174L${x+11.6} 174L${x+12} 203L${x-1} 203Z`,BT(q),'stroke="#3a4478" stroke-width=".5"')+L_(`M${x+1.4} 182L${x+2} 200`,'#ffffff',.6,'opacity=".6"')
    +P(`M${f?x+12:x-1} 199L${bx} 199L${bx} 207.6Q${r1(x+5.5+o*1.5)} 210.2 ${tx} 209.4Q${r1(tx-o*.6)} 204.6 ${f?x+12:x-1} 202.6Z`,BT(q),'stroke="#3a4478" stroke-width=".5"')
    +P(`M${x-1.4} 171.4L${x+12.4} 171.4L${x+12.2} 178.6Q${x+5.5} 180.6 ${x-1.2} 178.6Z`,TU(q),'stroke="#0a1030" stroke-width=".45"')+L_(`M${x-1} 178.4Q${x+5.5} 180.2 ${x+11.8} 178.4`,AU(q),.8)+P(star8(x+5.5,191,2.2,1.3,.7),AU(q))};
  s+=leg(68,0)+leg(81,1);
  /* longue tunique de minuit fendue, galons d'argent */
  s+=P('M63 64Q80 58.6 97 64L100 150L88 152L80 122L72 152L60 150Z',TU(q))+L_('M60.4 149.4L72 151.4L80 122.6L88 151.4L99.6 149.4',AG(q),.8)+L_('M66 66.4Q80 61.6 94 66.4',AG(q),.8);
  s+=L_('M70 72Q80 80 90 72',AU(q),.5,'opacity=".8"')+ostar(q,80,84,5.4)+C_(80,84,9,SG(q),`opacity="${.25+u*.12}"`);
  s+=P('M61.6 112Q80 119 98.4 112L98.4 117.6Q80 124.6 61.6 117.6Z','#0e1436')+L_('M61.8 112.4Q80 119.4 98.2 112.4',AG(q),.6)+ostar(q,80,116,3.2);
  /* bras droit : la main levée, une étoile cueillie au-dessus de la paume */
  s+=P('M61 66Q50 74 44.6 86.6L51 90.4Q55 80.4 65.4 73Z',SL(q),'stroke="#0a1030" stroke-width=".45"')+L_('M44.8 86.4L51 90.2','#dfe8ff',.8)
    +P('M44.6 87.6L50.8 90.2L47.6 73.6L41.8 73Z',BT(q),'stroke="#3a4478" stroke-width=".45"')+L_('M43 79.6L49 80.2M43.8 84.4L49.8 85.2',AU(q),.6)
    +E_(44.6,70.6,4,3,SK(q))+L_('M41.2 70.2Q44.6 68.6 48 70','#b08470',.45);
  s+=`<g>${C_(44.6,60.4,11,SG(q),'opacity=".9"')}${P(star8(44.6,60.4,5.4,3.2,1.6),'#ffffff')}${C_(44.6,60.4,1.6,'#fff6c8')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
  /* épaulière d'argent à l'étoile */
  const lame=(d,rim)=>P(d,AG(q),'stroke="#5a6488" stroke-width=".4"')+L_(rim,AU(q),.75);
  s+=lame('M64.8 72.6Q59.4 70.4 54 73.4Q50.4 75.8 49.4 81Q53.2 83 57 81.6Q62 79 64.8 72.6Z','M49.6 80.8Q53.2 82.6 57 81.2Q61.8 78.6 64.4 73')
    +lame('M71 62Q63.8 57.4 56.8 60Q52.2 62.2 50.6 68Q54.8 70.6 59.6 69.4Q66 67.2 71 62Z','M50.8 67.8Q54.8 70.2 59.6 69Q65.8 66.8 70.6 62.4')+P(star8(60.2,64.6,2.4,1.4,.7),AU(q));
  /* bras gauche : il tient l'arc de lumière */
  s+=P('M100 66Q110 80 112 98L104.6 100Q103 84 96 72Z',TU(q))+P('M104.6 100L112 98L117.6 116L111.4 118.6Z',AG(q),'stroke="#5a6488" stroke-width=".4"');
  s+=P('M118 30Q140 120 118 212','none','stroke="#bfe0ff" stroke-width="7" stroke-linecap="round" opacity=".28"')+P('M118 30Q140 120 118 212','none',`stroke="${LB(q)}" stroke-width="3.4" stroke-linecap="round"`)+L_('M117.6 30.6V211.4','#ffffff',.6,'opacity=".9"');
  s+=L_('M118 30Q115 25.4 117.4 22.4Q120 20 122 22.8',u>=3?'#ffe08a':AG(q),1.6)+L_('M118 212Q115 216.6 117.4 219.6Q120 222 122 219.2',u>=3?'#ffe08a':AG(q),1.6)+P(star8(118.2,29.6,2.6,1.5,.8),'#ffffff')+P(star8(118.2,212.4,2.6,1.5,.8),'#ffffff');
  if(u)s+=P('M118 30Q140 120 118 212','none',`stroke="#ffe08a" stroke-width="1" opacity="${.2+u*.15}"`);
  s+=`<rect x="125.6" y="110" width="6.4" height="16" rx="2" fill="#1a2458" stroke="#0a1030" stroke-width=".5"/>`+E_(128.4,118,4.8,4.4,SK(q))+L_('M124.4 115.4L132 115.6M124.2 118.4L132.2 118.6M124.6 121.2L131.8 121.4','#b08470',.5);
  s+=HG(face(q,u)+hoodFront(q,u));
  if(u>=3)s+=halo(80,10.4,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(ORI,oPortrait,oBody);
}catch(e){console.warn('orion art',e)}})();
