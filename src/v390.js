
/* ================= LÉVIATHANE DES ABYSSES : nouveau style graphique =================
   Le roi des abysses : peau turquoise, couronne de corail d'or, nageoires d'oreilles, chevelure-tentacules, yeux lumineux, trident.
   C'est un homme (demande du joueur, 3 novembre 2026) : mâchoire large, barbe de roi des mers aux boucles de vague, carrure de guerrier,
   armure d'écailles, kilt à nageoires, cape-nageoire, épaulières-coquillages, orbe d'eau, nageoires-ailes en ultra II/III.
   Ses textes passent au masculin (« il », « Roi des Abysses »). */
(function(){try{
const LEV=66;if(!HEROES[LEV]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#e4fff8'],[.15,'#6ae0d0'],[.4,'#128a8a'],[.7,'#063a4a'],[1,'#021018']],'50%','30%','80%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#c8fff4',.45],[1,'#2ad0b0',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'sk',[[0,'#7ad0c8'],[.55,'#4aa8a4'],[1,'#2a7a7a']],1,0)
 +lin(q+'hr',[[0,u>=3?'#3a6ac8':'#2a4a9a'],[.5,'#162a6a'],[1,'#0a1438']])
 +lin(q+'sc',[[0,'#3ad0b8'],[.55,'#128a8a'],[1,'#064a50']])
 +lin(q+'fn',[[0,'#c8fff4',.9],[.5,'#6ae0d0',.7],[1,'#2a6ac8',.6]],1,1)
 +lin(q+'sh',[[0,'#fff6e0'],[.5,'#ffd8a8'],[1,'#e08a6a']],0,1)
 +rad(q+'pl',[[0,'#ffffff'],[.6,'#f0f4ff'],[1,'#b8c4e0']],'35%','35%','70%')
 +rad(q+'wo',[[0,'#ffffff',.95],[.4,'#9afff0',.6],[1,'#2ad0b0',0]])
 +rad(q+'ey',[[0,'#e8fffa'],[.45,'#6affe0'],[1,'#0e8a7a']]);
const AU=q=>U(q,'au'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),SC=q=>U(q,'sc'),FN=q=>U(q,'fn'),SH=q=>U(q,'sh'),PL=q=>U(q,'pl'),WO=q=>U(q,'wo'),EY=q=>U(q,'ey');
const pearl=(q,x,y,r)=>C_(x,y,r,PL(q),'stroke="#8a94b0" stroke-width=".2"');
/* une coquille Saint-Jacques */
function shell(q,x,y,R,a=0){let d='';for(let k=0;k<7;k++){const t=(-160+k*20)*Math.PI/180;d+=`M0 0L${r1(R*Math.cos(t))} ${r1(R*Math.sin(t))}`}
  return`<g transform="translate(${x} ${y}) rotate(${a})">${P(`M0 0L${r1(-R*.94)} ${r1(-R*.34)}Q${r1(-R*.7)} ${r1(-R*1.08)} 0 ${r1(-R*1.1)}Q${r1(R*.7)} ${r1(-R*1.08)} ${r1(R*.94)} ${r1(-R*.34)}Z`,SH(q),'stroke="#a8604a" stroke-width=".35"')}${L_(d,'#c8806a',.35)}${P(`M${r1(-R*.24)} 0L${r1(R*.24)} 0L${r1(R*.16)} ${r1(R*.24)}L${r1(-R*.16)} ${r1(R*.24)}Z`,SH(q))}</g>`}
/* la couronne de corail d'or et ses perles */
function crown(q,u){const br=MI(L_('M42 30Q40 22 36 18M40 24Q36 22 34 24M38.6 20Q38 14 40 10M46 28Q46 20 44 14M45 20Q42 18 42 14','#ffd84a',1.4)+L_('M42 30Q40 22 36 18M46 28Q46 20 44 14','#fff6c0',.4,'opacity=".8"'));
  return br+L_('M48.6 28Q50 18 50 10M50 16Q52 12 54 12','#ffd84a',1.4)+pearl(q,50,9.6,1.4)+MI(pearl(q,36,17.6,1.1)+pearl(q,44,13.6,1.1)+pearl(q,40,9.8,1))+(u>=3?MI(L_('M40 10Q38 6 40 2','#ffd84a',1.2)+pearl(q,40,2,1.1)):'')}
/* le sceau : vague en anneau, perles, coquillage au sommet */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=sigilRing(cx,cy,R,op,'#ffe08a','#c8fff4',36);
  let d='';const n=16;for(let k=0;k<n;k++){const a=(k*360/n-90)*Math.PI/180,b=((k+.5)*360/n-90)*Math.PI/180,c=((k+1)*360/n-90)*Math.PI/180;
    d+=`M${r1(cx+R*1.1*Math.cos(a))} ${r1(cy+R*1.1*Math.sin(a))}Q${r1(cx+R*1.22*Math.cos(b))} ${r1(cy+R*1.22*Math.sin(b))} ${r1(cx+R*1.1*Math.cos(c))} ${r1(cy+R*1.1*Math.sin(c))}`}
  s+=L_(d,'#c8fff4',r1(R*.024),`opacity="${r1(op*.8)}"`);
  [90,180,270].forEach(a=>{const t=(a-90)*Math.PI/180;s+=pearl(q,r1(cx+R*.925*Math.cos(t)),r1(cy+R*.925*Math.sin(t)),r1(R*.05))});
  return s+shell(q,cx,r1(cy-R*.86),r1(R*.13))}
/* une méduse */
const jelly=(x,y,s,op)=>`<g transform="translate(${x} ${y}) scale(${s})" opacity="${op}">${P('M-4 0Q-4 -5 0 -5Q4 -5 4 0Q2 -1 0 0Q-2 -1 -4 0Z','#c8fff4')}${L_('M-2.6 0Q-3.4 3 -2.2 6M0 0Q-.6 4 .4 7M2.6 0Q3.2 3 2.2 6','#c8fff4',.5)}</g>`;
/* une bulle */
const bub=(x,y,r)=>C_(x,y,r,'none','stroke="#e8fffa" stroke-width=".4" opacity=".8"')+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.25),'#ffffff','opacity=".8"');
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);let s=P(`M31.4 46Q28 26 41 20.4Q50 16.4 59 20.4Q72 26 68.6 46Q71 ${y(10)} 73 ${y(20)}Q74 ${y(28)} 70 ${y(32)}H30Q26 ${y(28)} 27 ${y(20)}Q29 ${y(10)} 31.4 46Z`,HR(q));
  /* mèches-tentacules qui ondulent dans le dos */
  s+=L_(`M31 54Q25 62 28 ${y(22)}Q31 ${y(30)} 26.6 ${y(38)}M69 54Q75 62 72 ${y(22)}Q69 ${y(30)} 73.4 ${y(38)}`,HR(q),3.4)+L_(`M31 54Q25 62 28 ${y(22)}Q31 ${y(30)} 26.6 ${y(38)}M69 54Q75 62 72 ${y(22)}Q69 ${y(30)} 73.4 ${y(38)}`,'#6a9aff',.6,'opacity=".6"');
  return s+[[27.4,y(26)],[72.6,y(26)],[27,y(34)],[73,y(34)]].map(([x,yy])=>C_(x,yy,.7,'#9ad0ff','opacity=".8"')).join('')}
/* l'emblème du trident (or) */
const tridentMark=(q,x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})">${L_('M0 -5V5M-3 -4Q-3.2 -1 0 -.4Q3.2 -1 3 -4','#ffd84a',.9)}${P('M-.8 -5L0 -7L.8 -5Z','#ffd84a')}${P('M-3.8 -3.6L-3 -5.6L-2.2 -3.6Z','#ffd84a')}${P('M2.2 -3.6L3 -5.6L3.8 -3.6Z','#ffd84a')}</g>`;
function face(q,u){
  let s=`<rect x="44" y="55" width="12" height="12" fill="${SK(q)}"/>`+P('M44 59.4Q50 63.2 56 59.4L56 64.6Q50 67 44 64.6Z','#1a5a5a','opacity=".5"');
  /* nageoires d'oreilles */
  s+=MI(P('M37.2 42Q29.6 36 26.2 30Q28.2 36 26.6 40Q29.6 40 30.2 44Q32.2 43 37 47Z',FN(q),'stroke="#1a6a7a" stroke-width=".35"')+L_('M36.6 43L27.6 32M36.6 45L28 39M36.2 46.4L30.6 43.4','#e8fffa',.35,'opacity=".8"'));
  /* visage d'homme : mâchoire large et carrée */
  s+=P('M36 44Q36 30.2 50 30.2Q64 30.2 64 44Q64 52 62.2 56.6Q59.8 62.4 54.8 64.8Q52.4 65.8 50 65.8Q47.6 65.8 45.2 64.8Q40.2 62.4 37.8 56.6Q36 52 36 44Z',SK(q));
  s+=P('M59.4 45Q62.8 51.6 60.6 57Q58.4 61.8 53.6 64.2Q58.6 59 59.8 52.6Z','#1a5a5a','opacity=".38"');
  const io=u>=3?{ir:'#ffe08a',ir2:'#c8901a',glow:'#ffe08a'}:{ir:'#6affe0',ir2:'#0e8a7a',glow:'#9afff0'};
  s+=eye(44,Object.assign({lid:'#06282c',irr:2.1,white:'#f0fffc',open:.84,lw:1.35,fierce:1},io))+eye(56,Object.assign({lid:'#06282c',irr:2.1,white:'#f0fffc',open:.84,lw:1.35,fierce:1},io));
  /* sourcils épais */
  s+=MI(P('M38.4 41.4Q43.4 39.6 48.6 42.6L48.2 44.2Q43.4 41.6 39 42.8Z','#0a1a4a'));
  s+=L_('M50.6 47.6L49.4 53.4Q50.4 54.4 52 53.8','#1a5a5a',.8);
  /* écailles sur les pommettes */
  s+=MI([[39.8,51.4],[41.6,52.2],[39.8,53.4]].map(([x,y])=>L_(`M${r1(x-.8)} ${y}Q${x} ${r1(y+.8)} ${r1(x+.8)} ${y}`,'#c8fff4',.35,'opacity=".9"')).join(''));
  /* la barbe du roi des mers, aux boucles de vague, et son anneau d'or */
  s+=P('M37.2 50Q37.4 58.8 41.2 64Q45.2 70 50 73.2Q54.8 70 58.8 64Q62.6 58.8 62.8 50Q61.6 56.2 58.2 58.4Q54.4 60.2 50 59.8Q45.6 60.2 41.8 58.4Q38.4 56.2 37.2 50Z',HR(q),'stroke="#06123a" stroke-width=".3"')
    +L_('M40.4 58.6Q42.6 64.6 46.6 69M59.6 58.6Q57.4 64.6 53.4 69M44.4 60.6Q46 65.6 48.6 69.4M55.6 60.6Q54 65.6 51.4 69.4','#4a7ad8',.45,'opacity=".8"')
    +MI(L_('M40.6 63.4Q39 64.6 39.8 66Q41 66.6 41.4 65.4','#4a7ad8',.5)+L_('M44 68.2Q42.6 69.6 43.6 70.8Q44.8 71.2 45.2 70','#4a7ad8',.5))
    +P('M48.6 70.4H51.4V72.6H48.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".2"');
  s+=P('M46.6 59.4Q50 60.8 53.4 59.4Q51.8 61.2 50 61.2Q48.2 61.2 46.6 59.4Z','#06282c');
  s+=P('M44.2 56.4Q47.4 54.6 50 55.8Q52.6 54.6 55.8 56.4Q58.2 58.4 59.2 61Q56 58.4 52.8 58.8Q51.2 58.4 50 59Q48.8 58.4 47.2 58.8Q44 58.4 40.8 61Q41.8 58.4 44.2 56.4Z',HR(q),'stroke="#06123a" stroke-width=".3"');
  /* cheveux plaqués en arrière, front dégagé */
  s+=P('M36.2 43Q35.4 30 44 26Q50 23.8 56 26Q64.6 30 63.8 43Q62.6 36.6 58.6 33.6Q54.4 31.6 51.2 32.4L50 34.4L48.8 32.4Q45.6 31.6 41.4 33.6Q37.4 36.6 36.2 43Z',HR(q))
    +L_('M41 30Q45.4 27.6 49.6 28.4M50.4 28.4Q54.6 27.6 59 30M39.4 34.4Q43 31 47.6 30.6M52.4 30.6Q57 31 60.6 34.4','#6a9aff',.5,'opacity=".85"');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M4 100Q6 78 22 71L78 71Q94 78 96 100Z',SC(q))+L_('M5 99.4Q7 79.6 22.6 71.8M95 99.4Q93 79.6 77.4 71.8',AU(q),.8);
  /* armure d'écailles bordée d'or */
  s+=P('M27 100L30 79Q38 71.4 50 71.2Q62 71.4 70 79L73 100Z',SC(q))+L_('M30.2 79.2Q38 71.8 50 71.6Q62 71.8 69.8 79.2',AU(q),.8);
  let sc='';for(let r=0;r<5;r++){const y=82+r*4;for(let k=0;k<8;k++){const x=32+k*5+(r%2)*2.5;if(x>69)continue;sc+=`M${r1(x-2.4)} ${y}Q${x} ${r1(y+2.6)} ${r1(x+2.4)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".75"');
  /* gorgerin d'or en forme de vague */
  s+=P('M36 72Q50 79 64 72L66 76Q58 78 56 82Q50 80 44 82Q42 78 34 76Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+L_('M38 75Q42 74 44 77M62 75Q58 74 56 77','#fff6c0',.4);
  s+=C_(50,89,4.6,'#064a50','stroke="#ffd84a" stroke-width="1"')+tridentMark(q,50,89.4,.62);
  /* épaulières-coquillages */
  s+=MI(shell(q,20,84,15,-20)+shell(q,12,93,10,-36));
  return s}
/* ultra II et III : de grandes nageoires translucides */
function finWings(q,u){const w=`<path d="M38 64Q20 44 4 40Q10 48 6 56Q14 56 12 64Q20 62 22 70Q30 66 38 68Z" fill="${FN(q)}" stroke="${u>=3?'#ffd84a':'#c8fff4'}" stroke-width=".6"/>${L_('M38 64Q22 50 6 44M38 65L8 56M37 66L14 64M37 67L22 70','#e8fffa',.4,'opacity=".8"')}`;
  return`<g opacity="${u>=3?.95:.88}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function lPortrait(u){const q='vp'+u+'_l';
  let s=pOpen(q,'Léviathane des Abysses',defs(q,u));
  s+=rays(50,0,10,110,.07,'#e8fffa')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,36,27,u);
  s+=bub(12,24,1.6)+bub(16,16,1)+bub(88,30,1.4)+bub(84,20,.9)+bub(90,52,1.2)+jelly(14,48,1,.55)+jelly(86,44,.8,.45);
  if(u>=1)s+=C_(50,36,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=finWings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+crown(q,u);
  if(u>=3)s+=halo(50,6,10,2.4);
  s+=frame('#6ae0d0');
  return s+pClose('Mage',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function lBody(u,bare){const q='vb'+u+(bare?'s':'')+'_l';
  let s=bOpen(q,'Léviathane des Abysses',defs(q,u)+rad(q+'bb',[[0,'#9afff0',.36+u*.08],[.55,'#0e6a6a',.3],[1,'#021018',0]],'50%','40%','60%'));
  const tent=`<g opacity=".55">${L_('M10 236Q2 180 22 150Q38 126 28 96','#063a4a',8)}${L_('M150 236Q158 180 138 150Q122 126 132 96','#063a4a',8)}${L_('M10 236Q2 180 22 150Q38 126 28 96M150 236Q158 180 138 150Q122 126 132 96','#128a8a',1.2,'opacity=".6"')}${[[20,170],[26,140],[140,170],[134,140]].map(([x,y])=>C_(x,y,1.6,'#9afff0','opacity=".6"')).join('')}</g>`;
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,-8,10,200,.06,'#e8fffa')}${tent}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=jelly(24,50,1.6,.5)+jelly(138,70,1.3,.45)+bub(30,110,2)+bub(132,120,1.6)+bub(36,180,1.4);
    s+=risers(['#e8fffa','#9afff0'],(c,k)=>`<circle r="${1+k%2*.6}" fill="none" stroke="${c}" stroke-width=".4"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffd84a','#6ae0d0',(x,y)=>`M${r1(x-1.2)} ${y}Q${r1(x-.6)} ${r1(y-1)} ${x} ${y}Q${r1(x+.6)} ${r1(y+1)} ${r1(x+1.2)} ${y}`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${finWings(q,u)}</g>`;
  /* la cape-nageoire qui flotte derrière lui */
  s+=P('M58 60Q44 112 38 206L46 200L52 208L60 199L68 207L80 201L92 207L100 199L108 208L114 200L122 206Q116 112 102 60Z',FN(q),'stroke="#1a6a7a" stroke-width=".5"')
    +L_('M64 70Q54 130 50 200M96 70Q106 130 110 200M80 64V202','#e8fffa',.4,'opacity=".45"');
  s+=HG(hairBack(q,1.2));
  /* jambes : chausses d'écailles et grèves d'or */
  const leg=P('M65 126L77 126L76 170L75 200L66 200L65.4 170Z',SC(q),'stroke="#064a50" stroke-width=".4"')+L_('M66 140Q71 142 76 140M66 152Q71 154 76 152','#9afff0',.4,'opacity=".7"')
    +P('M64.4 168L76.6 168L76 198L65 198Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M65.6 176H75.6M65.4 186H75.8','#8a5a1a',.5)+C_(70.6,172,1.2,PL(q))
    +P('M63.6 198L76.4 198L77 206L59 210Q59.6 202.4 63.6 198Z',SC(q),'stroke="#064a50" stroke-width=".4"')+P('M59 210L56 212L61.6 210.4Z',FN(q));
  s+=MB(leg);
  /* kilt d'écailles à nageoires, bordé d'or */
  s+=P('M60 112Q56 140 54 162L68 168L80 152L92 168L106 162Q104 140 100 112Z',SC(q))+L_('M54.4 161.4L68 167.4L80 152.6L92 167.4L105.6 161.4',AU(q),1);
  let sc='';for(let r=0;r<5;r++){const y=122+r*8;for(let k=0;k<7;k++){const x=60+k*7+(r%2)*3.5;if(x>101)continue;sc+=`M${r1(x-3)} ${y}Q${x} ${r1(y+3.2)} ${r1(x+3)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".6"');
  /* torse de guerrier : armure d'écailles, emblème du trident */
  s+=P('M58 62Q80 55 102 62L103 98Q98 116 80 118Q62 116 57 98Z',SC(q),'stroke="#064a50" stroke-width=".4"')+L_('M60.4 64.4Q80 58 99.6 64.4',AU(q),.8)+L_('M66 88Q72 92 80 90Q88 92 94 88M80 66V116','#064a50',.6);
  sc='';for(let r=0;r<6;r++){const y=70+r*7.4;for(let k=0;k<7;k++){const x=62+k*6+(r%2)*3;if(x>99)continue;sc+=`M${r1(x-2.8)} ${y}Q${x} ${r1(y+3)} ${r1(x+2.8)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".75"')+C_(80,82,6.2,'#064a50','stroke="#ffd84a" stroke-width="1.2"')+tridentMark(q,80,82.6,.85);
  /* gorgerin d'or et ceinture à boucle-coquillage */
  s+=P('M66 58Q80 66 94 58L96 63Q88 65 86 69Q80 67 74 69Q72 65 64 63Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"');
  s+=P('M59.4 110.6Q80 118 100.6 110.6L100.6 116Q80 123.4 59.4 116Z','#064a50')+L_('M59.6 111Q80 118.4 100.4 111',AU(q),.7)+shell(q,80,119.4,5.2,0);
  /* bras forts à la peau turquoise, brassards d'or */
  s+=P('M58 66Q47 82 46 100L55 101.6Q57 86 64 74Z',SK(q),'stroke="#0a2a30" stroke-width=".7"')+P('M46 100Q45 92 43 84L50.6 80.6Q53.6 89 55 101.6Z',SK(q),'stroke="#0a2a30" stroke-width=".7"')
    +P('M44.2 90.6L52.4 88L54 96L46 98.2Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+L_('M44.8 93.2L52.8 90.8','#8a5a1a',.5)+E_(45.4,80.6,4.8,3.4,SK(q),'transform="rotate(-20 45.4 80.6)"');
  s+=`<g>${C_(44,67,10.4,WO(q),'opacity=".95"')}${C_(44,67,6.6,'none','stroke="#e8fffa" stroke-width=".6"')}${L_('M38.8 67Q42 62.8 46 65Q49 67 48 70','#ffffff',.6,'opacity=".9"')}${C_(41.6,64.4,1.2,'#ffffff','opacity=".9"')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.8;0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
  s+=P('M102 66Q113 82 114 100L105 101.6Q103 86 96 74Z',SK(q),'stroke="#0a2a30" stroke-width=".7"')+P('M105 101.6L114 100L119 116L111.4 118.6Z',SK(q),'stroke="#0a2a30" stroke-width=".7"')
    +P('M106.4 104.6L114.6 102.6L116.6 110.4L108.4 112.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')
    +L_('M60 72Q52 84 50.6 98M100 72Q108 84 109.4 98M48 88Q49.6 94 51 100M107.6 104Q111.4 110 114.6 116','#2a7a7a',.7,'opacity=".7"');
  /* le trident d'or */
  s+=L_('M120 40L116 214',AU(q),2.4)+L_('M120.2 41L116.2 213','#fff6c0',.5,'opacity=".7"')+P('M112 42Q120 46 128 42L127 44.6Q120 48.6 113 44.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')
    +L_('M113 43Q112 34 112 26M127 43Q128 34 128 26M120 46L120.6 18',AU(q),1.7)+P('M110.6 26.6L112 20L113.6 26.6Z',AU(q))+P('M126.4 26.6L128 20L129.4 26.6Z',AU(q))+P('M119 19L120.6 10L122.2 19Z',AU(q))+C_(120.4,40,6,WO(q),'opacity=".7"')+pearl(q,120.4,44,1.4);
  s+=E_(115.6,118,5,4.4,SK(q),'stroke="#0a2a30" stroke-width=".7"')+L_('M111 115.6L119.6 116.2M110.8 118.4L119.8 119','#1a5a5a',.5);
  /* épaulières-coquillages */
  s+=MB(shell(q,58,68,13,-30)+shell(q,52,77,9,-48));
  s+=HG(face(q,u)+crown(q,u));
  if(u>=3)s+=halo(80,3.2,9,2.2);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(LEV,lPortrait,lBody);
/* ---------- textes : Léviathane est un homme ---------- */
try{if(typeof STL!=='undefined'&&STL[LEV]&&STL[LEV][1])STL[LEV][1]="Quand un navire a sombré avec des centaines de marins, il les a portés jusqu'au rivage. Personne ne l'a cru capable de bonté."}catch(e){}
try{if(typeof UTH_H!=='undefined'&&UTH_H[LEV])UTH_H[LEV].n='Roi des Abysses'}catch(e){}
try{if(typeof VOXD!=='undefined'&&VOXD[LEV]){VOXD[LEV][0]='m';VOXD[LEV][1]='deep'}}catch(e){}
try{Object.assign(I18N_EN,{"Quand un navire a sombré avec des centaines de marins, il les a portés jusqu'au rivage. Personne ne l'a cru capable de bonté.":"When a ship sank with hundreds of sailors, he carried them to the shore. No one believed him capable of kindness.",
  "Léviathane a quitté les profondeurs pour découvrir le monde d'en haut. Ton équipe est sa première vraie famille.":"Léviathane left the depths to discover the world above. Your team is his first real family.",
  "Roi des Abysses":"King of the Abyss"})}catch(e){}
}catch(e){console.warn('leviathane art',e)}})();
