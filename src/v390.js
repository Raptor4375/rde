
/* ================= LÉVIATHANE DES ABYSSES : nouveau style graphique =================
   Même reine des abysses : peau turquoise, couronne de corail d'or, nageoires d'oreilles, chevelure-tentacules, grands yeux lumineux, trident.
   Nouveau : visage détaillé (écailles sur les joues, sourire en coin), couronne de corail et de perles,
   épaulières-coquillages, armure d'écailles, robe à nageoires, orbe d'eau, tentacules et méduses, nageoires-ailes en ultra II/III. */
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
function hairBack(q,l=1){const y=k=>r1(46+k*l);let s=P(`M32 46Q28 26 41 20.4Q50 16.4 59 20.4Q72 26 68 46Q72 ${y(14)} 75 ${y(28)}Q78 ${y(42)} 72 ${y(54)}H28Q22 ${y(42)} 25 ${y(28)}Q28 ${y(14)} 32 46Z`,HR(q));
  /* mèches-tentacules qui ondulent */
  s+=L_(`M30 56Q24 66 28 ${y(28)}Q32 ${y(38)} 26 ${y(48)}M70 56Q76 66 72 ${y(28)}Q68 ${y(38)} 74 ${y(48)}`,HR(q),3.2)+L_(`M30 56Q24 66 28 ${y(28)}Q32 ${y(38)} 26 ${y(48)}M70 56Q76 66 72 ${y(28)}Q68 ${y(38)} 74 ${y(48)}`,'#6a9aff',.6,'opacity=".6"');
  return s+[[27,y(34)],[73,y(34)],[26.6,y(44)],[73.4,y(44)]].map(([x,yy])=>C_(x,yy,.7,'#9ad0ff','opacity=".8"')).join('')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#1a5a5a','opacity=".45"');
  /* nageoires d'oreilles */
  s+=MI(P('M37.6 42Q30 36 26.6 30Q28.6 36 27 40Q30 40 30.6 44Q32.6 43 37.4 47Z',FN(q),'stroke="#1a6a7a" stroke-width=".35"')+L_('M37 43L28 32M37 45L28.4 39M36.6 46.4L31 43.4','#e8fffa',.35,'opacity=".8"'));
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#1a5a5a','opacity=".35"');
  const io=u>=3?{ir:'#ffe08a',ir2:'#c8901a',glow:'#ffe08a'}:{ir:'#6affe0',ir2:'#0e8a7a',glow:'#9afff0'};
  s+=eye(44,Object.assign({lash:1,lid:'#06282c',irr:2.3,white:'#f0fffc'},io))+eye(56,Object.assign({lash:1,lid:'#06282c',irr:2.3,white:'#f0fffc'},io));
  s+=MI(L_('M40 41.2Q43.4 39.4 47.2 40.6','#0a2a5a',1.1));
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#1a5a5a',.65);
  /* un sourire en coin */
  s+=P('M46.6 57.2Q50.6 58.6 54 56.2Q52.8 59.6 50 59.8Q47.6 59.6 46.6 57.2Z','#1a4a6a')+L_('M46.4 57.2Q50.6 58.6 54.2 56','#06282c',.55)+L_('M53.6 56.2L55 55.4','#06282c',.5);
  /* écailles sur les joues */
  s+=MI([[40.4,52.4],[42.2,53.4],[40.6,54.6],[42.4,55.6]].map(([x,y])=>L_(`M${r1(x-.8)} ${y}Q${x} ${r1(y+.8)} ${r1(x+.8)} ${y}`,'#c8fff4',.35,'opacity=".9"')).join(''));
  /* frange bleu nuit */
  s+=P('M36.4 45Q35 30 44 25.2Q52 21.8 59.8 25.6Q66.2 29.6 64.4 45Q62.4 37 57.2 33.6Q54.2 37.4 48.8 38.6Q52 35.4 52.4 32.6Q46.6 37.2 39.6 39Q37.2 41.4 36.4 45Z',HR(q))
    +L_('M44 27Q49 25.4 54 26.4M40 32Q44 28.6 49 28.4M55.4 28.6Q60 30 62.4 34.6','#6a9aff',.5,'opacity=".85"');
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 80Q38.8 74 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 80Q61.2 74 60.2 62Q59.4 52 60.4 44Z',HR(q));
  /* collier de perles */
  s+=[44.6,46.4,48.2,50,51.8,53.6,55.4].map((x,k)=>pearl(q,x,r1(65+Math.sin(k/6*Math.PI)*1.6),.7)).join('');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',SC(q));
  /* armure d'écailles bordée d'or */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',SC(q))+L_('M33.8 78.2Q40 72.8 50 72.8Q60 72.8 66.2 78.2',AU(q),.8);
  let sc='';for(let r=0;r<5;r++){const y=80+r*4;for(let k=0;k<7;k++){const x=35+k*5+(r%2)*2.5;if(x>66)continue;sc+=`M${r1(x-2.4)} ${y}Q${x} ${r1(y+2.6)} ${r1(x+2.4)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".75"')+pearl(q,50,86,2.4)+C_(50,86,4,AU(q),'opacity=".0"')+C_(50,86,3.2,'none',`stroke="${AU(q)}" stroke-width=".8"`);
  /* épaulières-coquillages */
  s+=MI(shell(q,22,84,13,-20)+shell(q,15,92,9,-36));
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
  s+=HG(hairBack(q,1.3));
  /* la robe à écailles qui s'ouvre en nageoires */
  s+=P('M62 112Q54 160 48 200Q44 206 40 212Q54 210 62 206Q72 212 80 208Q88 212 98 206Q106 210 120 212Q116 206 112 200Q106 160 98 112Z',SC(q));
  let sc='';for(let r=0;r<9;r++){const y=122+r*9;for(let k=0;k<8;k++){const x=56+k*7+(r%2)*3.5;if(x<58-r||x>102+r)continue;sc+=`M${r1(x-3)} ${y}Q${x} ${r1(y+3.4)} ${r1(x+3)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".6"')+P('M40 212Q54 210 62 206Q72 212 80 208Q88 212 98 206Q106 210 120 212Q106 220 96 214Q88 222 80 216Q72 222 64 214Q54 220 40 212Z',FN(q))+L_('M40 212Q54 210 62 206Q72 212 80 208Q88 212 98 206Q106 210 120 212',AU(q),1);
  /* armure d'écailles et perles */
  s+=P('M63 64Q80 58.6 97 64L99 116Q80 122 61 116Z',SC(q))+L_('M66 66.4Q80 61.6 94 66.4',AU(q),.8);
  sc='';for(let r=0;r<6;r++){const y=70+r*7.4;for(let k=0;k<6;k++){const x=65+k*6+(r%2)*3;if(x>96)continue;sc+=`M${r1(x-2.8)} ${y}Q${x} ${r1(y+3)} ${r1(x+2.8)} ${y}`}}
  s+=L_(sc,'#9afff0',.45,'opacity=".75"')+pearl(q,80,84,3.2)+C_(80,84,4.2,'none',`stroke="${AU(q)}" stroke-width="1"`);
  s+=P('M61.4 110.6Q80 118 98.6 110.6L98.6 116Q80 123.4 61.4 116Z','#064a50')+L_('M61.6 111Q80 118.4 98.4 111',AU(q),.7)+[66,72,78,84,90,96].map(x=>pearl(q,x,r1(114+Math.abs(x-80)*-.06+1),.9)).join('');
  /* épaulières-coquillages */
  s+=MB(shell(q,60,68,11,-30)+shell(q,55,76,8,-48));
  /* bras droit : l'orbe d'eau */
  s+=P('M60 70Q52 84 50 100L57.6 101Q59.4 86 65 76Z',SK(q))+P('M50 100Q49 92 46 86L52 83Q55.6 90 57.6 101Z',SK(q))+L_('M51 92L56 91M50 96L56.4 95','#ffd84a',.7)+E_(47,83,4.4,3,SK(q),'transform="rotate(-20 47 83)"');
  s+=`<g>${C_(46,70,10,WO(q),'opacity=".95"')}${C_(46,70,6.4,'none','stroke="#e8fffa" stroke-width=".6"')}${L_('M41 70Q44 66 48 68Q51 70 50 73','#ffffff',.6,'opacity=".9"')}${C_(43.8,67.6,1.2,'#ffffff','opacity=".9"')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.8;0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
  /* bras gauche : le trident d'or */
  s+=P('M100 70Q108 84 110 100L102.4 101Q100.6 86 95 76Z',SK(q))+P('M102.4 101L110 100L116.6 114L110.4 116.6Z',SK(q))+L_('M104 106L110.6 104M105.6 110.6L112 108.6','#ffd84a',.7);
  s+=L_('M120 40L116 214',AU(q),2.2)+L_('M120.2 41L116.2 213','#fff6c0',.5,'opacity=".7"')+P('M112 42Q120 46 128 42L127 44.6Q120 48.6 113 44.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')
    +L_('M113 43Q112 34 112 26M127 43Q128 34 128 26M120 46L120.6 18',AU(q),1.6)+P('M110.6 26.6L112 20L113.6 26.6Z',AU(q))+P('M126.4 26.6L128 20L129.4 26.6Z',AU(q))+P('M119 19L120.6 10L122.2 19Z',AU(q))+C_(120.4,40,6,WO(q),'opacity=".7"')+pearl(q,120.4,44,1.4);
  s+=E_(115,117,4.6,4.2,SK(q));
  s+=HG(face(q,u)+crown(q,u));
  if(u>=3)s+=halo(80,3.2,9,2.2);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(LEV,lPortrait,lBody);
}catch(e){console.warn('leviathane art',e)}})();
