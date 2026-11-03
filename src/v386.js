
/* ================= GAÏA MÈRE-RACINE : nouveau style graphique =================
   Même dryade : peau d'écorce dorée, chevelure de feuilles, bois de cerf fleuris, yeux verts lumineux, oreilles d'elfe, arbre et bâton fleuri.
   Nouveau : visage détaillé aux nervures lumineuses, couronne de ramures en fleurs, couronne de lierre derrière la tête,
   corset d'écorce et mousse, épaulières de feuilles, robe de feuilles et racines, pousse lumineuse au creux de la main. */
(function(){try{
const GAI=59;if(!HEROES[GAI]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#f8ffe0'],[.15,'#c8f08a'],[.4,'#4a9a4a'],[.7,'#1a4a2a'],[1,'#071a10']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#e8ffc0',.45],[1,'#a8e04a',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'sk',[[0,'#b08660'],[.55,'#946a46'],[1,'#6a4a2e']],1,0)
 +lin(q+'hr',[[0,u>=3?'#c8f07a':'#8ad04a'],[.5,'#3a8a2a'],[1,'#163a10']])
 +lin(q+'lf',[[0,'#a8e86a'],[1,'#3a8a2a']],1,1)
 +lin(q+'ld',[[0,'#5aa83a'],[1,'#1e4a16']],1,1)
 +lin(q+'bk',[[0,'#8a6440'],[.6,'#5a3e22'],[1,'#3a2614']])
 +lin(q+'wd',[[0,'#a07a4a'],[1,'#5a3a1a']],1,0)
 +rad(q+'fl',[[0,'#fff0f6'],[.5,'#ffaad0'],[1,'#ff5a9a']])
 +rad(q+'sd',[[0,'#ffffff',1],[.35,'#e0ff9a',.75],[1,'#a8e04a',0]]);
const AU=q=>U(q,'au'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),LF=q=>U(q,'lf'),LD=q=>U(q,'ld'),BK=q=>U(q,'bk'),WD=q=>U(q,'wd'),FL=q=>U(q,'fl'),SD=q=>U(q,'sd');
/* une feuille (pointe vers l'angle a) */
const leaf=(q,x,y,a,l,w=.42,f)=>{const t=a*Math.PI/180,c=Math.cos(t),s=Math.sin(t),nx=-s,ny=c,tx=x+l*c,ty=y+l*s,mx=x+l*.5*c,my=y+l*.5*s;
  return P(`M${r1(x)} ${r1(y)}Q${r1(mx+nx*l*w)} ${r1(my+ny*l*w)} ${r1(tx)} ${r1(ty)}Q${r1(mx-nx*l*w)} ${r1(my-ny*l*w)} ${r1(x)} ${r1(y)}Z`,f||LF(q),'stroke="#24501a" stroke-width=".25"')+L_(`M${r1(x)} ${r1(y)}L${r1(x+l*.85*c)} ${r1(y+l*.85*s)}`,'#d8ffa0',r1(Math.max(.2,l*.03)),'opacity=".8"')};
/* une fleur rose à cinq pétales */
const flower=(q,x,y,r)=>{let s='';for(let k=0;k<5;k++){const a=(k*72-90)*Math.PI/180;s+=E_(r1(x+r*.7*Math.cos(a)),r1(y+r*.7*Math.sin(a)),r1(r*.62),r1(r*.46),FL(q),`transform="rotate(${k*72} ${r1(x+r*.7*Math.cos(a))} ${r1(y+r*.7*Math.sin(a))})"`)}return s+C_(x,y,r1(r*.34),'#ffe08a')};
/* une petite branche de bois de cerf */
function antler(q,side){const m=side<0?'':'transform="matrix(-1 0 0 1 100 0)"';
  return`<g ${m}>${L_('M38.6 30Q34 22 32.6 12Q32 6 34.4 2M34 18Q28 16 25 10M33 12Q37 8 38 4M35.6 24Q30.4 24 27.6 21','#5a3a1a',1.7)}${L_('M38.6 30Q34 22 32.6 12Q32 6 34.4 2M34 18Q28 16 25 10','#a07a4a',.6,'opacity=".7"')}${leaf(q,25,10,-140,6)}${leaf(q,34.4,2,-80,5)}${leaf(q,38,4,-40,4.6)}${leaf(q,27.6,21,-170,5)}${flower(q,29.6,15.4,2)}${flower(q,36,7.6,1.6)}</g>`}
/* la couronne de lierre derrière la tête */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=sigilRing(cx,cy,R,op,'#e8ffc0','#ffffff',30);
  let l='';for(let k=0;k<20;k++){if(k===0)continue;const a=(k*18-90)*Math.PI/180,x=cx+R*Math.cos(a),y=cy+R*Math.sin(a);l+=leaf(q,r1(x),r1(y),k*18-90+(k%2?60:-60),r1(R*.16),.4,k%2?LF(q):LD(q))}
  s+=`<g opacity="${r1(Math.min(1,op+.25))}">${l}</g>`;
  [90,180,270].forEach(a=>{const t=(a-90)*Math.PI/180;s+=flower(q,r1(cx+R*Math.cos(t)),r1(cy+R*Math.sin(t)),r1(R*.07))});
  return s+flower(q,cx,r1(cy-R),r1(R*.1))}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);let s=P(`M32 46Q28 26 41 20.4Q50 16.4 59 20.4Q72 26 68 46Q72 ${y(14)} 76 ${y(28)}Q79 ${y(42)} 72 ${y(54)}H28Q21 ${y(42)} 24 ${y(28)}Q28 ${y(14)} 32 46Z`,HR(q))
  +L_(`M35 52Q31 66 29 ${y(38)}M65 52Q69 66 71 ${y(38)}M39 58Q36 72 36 ${y(48)}`,'#24501a',.7,'opacity=".55"');
  [[26,y(30),200],[74,y(30),-20],[29,y(44),210],[71,y(44),-30],[24,y(18),190],[76,y(18),-10]].forEach(([x,yy,a])=>{s+=leaf(q,x,yy,a,7)});
  return s}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#4a2e18','opacity=".45"');
  /* oreilles d'elfe */
  s+=MI(P('M37.6 44Q31 40 28.6 34.6Q33 37.4 37.4 39.4Z',SK(q),'stroke="#4a2e18" stroke-width=".3"'));
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#4a2e18','opacity=".35"');
  const io=u>=3?{ir:'#fff0a0',ir2:'#c8a01a',glow:'#fff0a0'}:{ir:'#c8ff6a',ir2:'#3a8a1a',glow:'#e0ff9a'};
  s+=eye(44,Object.assign({lash:1,lid:'#1a2a10',white:'#f8fff0'},io))+eye(56,Object.assign({lash:1,lid:'#1a2a10',white:'#f8fff0'},io));
  s+=MI(L_('M40 41.2Q43.4 39.4 47.2 40.6','#24501a',1.1));
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#5a3a22',.65);
  s+=P('M46.4 56.8Q50 58.4 53.6 56.8Q52.6 59.8 50 60.1Q47.4 59.8 46.4 56.8Z','#a8445a')+L_('M46.2 56.8Q50 58.2 53.8 56.8','#6a2234',.55)+P('M47.8 59Q50 59.8 52.2 59Q50 59.6 47.8 59Z','#ff9ab8','opacity=".7"');
  /* nervures lumineuses sur les joues */
  s+=MI(L_('M39 52.4Q41.6 51.6 43.6 53.2M41.4 51.8L41 49.8M41.8 52.4L43.2 50.8','#c8ff6a',.4,'opacity=".9"'));
  s+=MI(E_(41.4,54.4,3,1.4,'#ff8aa8','opacity=".2"'));
  /* frange de feuilles */
  s+=P('M36.4 45Q35 30 44 25.2Q52 21.8 59.8 25.6Q66.2 29.6 64.4 45Q62.4 37 57.2 33.6Q54.2 37.4 48.8 38.6Q52 35.4 52.4 32.6Q46.6 37.2 39.6 39Q37.2 41.4 36.4 45Z',HR(q))
    +leaf(q,44,30,-160,6)+leaf(q,56,29,-20,6)+leaf(q,50,26,-90,5);
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 78Q38.8 72 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 78Q61.2 72 60.2 62Q59.4 52 60.4 44Z',HR(q))+leaf(q,34,74,110,6)+leaf(q,66,74,70,6);
  return s}
function crown(q,u){let s=antler(q,-1)+antler(q,1);if(u>=3)s+=flower(q,42,26,2.2)+flower(q,58,26,2.2)+flower(q,50,23.4,2.6);return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',LD(q));
  /* corset d'écorce bordé de mousse, broche-fleur */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',BK(q))+L_('M40 80Q38 90 40 100M60 80Q62 90 60 100M50 74V100M44 77Q43 88 45 99M56 77Q57 88 55 99','#3a2614',.6,'opacity=".7"')
    +P('M33.2 78.6Q40 72.2 50 72.2Q60 72.2 66.8 78.6L66 80.8Q60 75.6 50 75.6Q40 75.6 34 80.8Z','#5a9a3a')+[36,40,44,48,52,56,60,64].map(x=>C_(x,r1(78-Math.abs(x-50)*-.06-2.6+Math.abs(x-50)*.12),1,'#7ac04a')).join('')+flower(q,50,82,3.2);
  /* épaulières de grandes feuilles */
  s+=MI(leaf(q,36,76,-170,24,.36,LD(q))+leaf(q,34,80,-156,22,.36,LF(q))+leaf(q,33,86,-142,20,.34,LD(q))+leaf(q,32,92,-128,16,.34,LF(q)));
  /* lierre qui grimpe */
  s+=L_('M66 100Q70 90 66 82Q62 76 66 72','#3a7a2a',.7)+leaf(q,67.6,90,-10,4)+leaf(q,64.6,80,200,3.6);
  return s}
/* ultra II et III : des ailes de feuilles */
function lwings(q,u){const R=[36,62];let w='';
  [[-176,44],[-157,51],[-138,55],[-119,51],[-100,44]].forEach(([a,l],k)=>{w+=leaf(q,R[0],R[1],a,l,.3,k%2?LF(q):LD(q))});
  [[-166,30],[-146,34],[-126,33],[-107,27]].forEach(([a,l])=>{w+=leaf(q,R[0],R[1],a,l,.3,'url(#'+q+'lf)')});
  w+=flower(q,8,34,2.4)+flower(q,14,18,2)+flower(q,24,10,1.8);
  return`<g opacity="${u>=3?.97:.9}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function gPortrait(u){const q='gp'+u+'_';
  let s=pOpen(q,'Gaïa Mère-Racine',defs(q,u));
  s+=rays(50,34,12,80,.08,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,36,27,u);
  s+=[[12,22],[86,18],[90,46],[10,50],[70,8],[30,8]].map(([x,y],k)=>k%2?C_(x,y,2.4,SD(q),'opacity=".7"')+C_(x,y,.7,'#ffffff'):E_(x,y,1.4,.8,FL(q),`transform="rotate(${k*40} ${x} ${y})"`)).join('');
  if(u>=1)s+=C_(50,36,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=lwings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+crown(q,u);
  if(u>=3)s+=halo(50,14,12,2.8);
  s+=frame('#a8e04a');
  return s+pClose('Soutien',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function gBody(u,bare){const q='gb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Gaïa Mère-Racine',defs(q,u)+rad(q+'bb',[[0,'#e8ffc0',.38+u*.08],[.55,'#2a6a2a',.28],[1,'#071a10',0]],'50%','40%','60%'));
  /* l'arbre-mère derrière elle */
  const tree=`<g opacity=".9">${P('M74 130Q76 96 72 70L88 70Q84 96 86 130Z',WD(q))}${C_(56,52,26,LD(q))}${C_(104,50,26,LD(q))}${C_(80,34,30,LD(q))}${C_(62,30,18,LF(q),'opacity=".55"')}${C_(98,28,18,LF(q),'opacity=".55"')}${[[46,40],[114,38],[70,14],[92,16],[52,66],[108,64]].map(([x,y])=>flower(q,x,y,3)).join('')}</g>`;
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.05,'#ffffff')}${C_(80,36,44+u*3,U(q,'gl'),'opacity=".7"')}${tree}${sigil(q,80,35,32,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#e0ff9a','#ffaad0'],(c,k)=>k%2?`<ellipse rx="1.6" ry=".9" fill="${c}"/>`:`<circle r="1.1" fill="${c}"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#a8e04a','#ffaad0',(x,y,k)=>`M${r1(x-1)} ${r1(y+.6)}Q${x} ${r1(y-1.4)} ${r1(x+1)} ${r1(y+.6)}Q${x} ${r1(y+.2)} ${r1(x-1)} ${r1(y+.6)}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${lwings(q,u)}</g>`;
  s+=HG(hairBack(q,1.3));
  /* la robe de feuilles, et les racines qui plongent dans le sol */
  s+=L_('M56 206Q48 212 40 214M64 208Q60 214 56 218M96 208Q100 214 104 218M104 206Q112 212 120 214M80 208V218','#5a3a1a',1.6)+L_('M56 206Q48 212 40 214M104 206Q112 212 120 214','#a07a4a',.5,'opacity=".7"');
  s+=P('M62 112Q52 160 50 208Q66 212 80 210Q94 212 110 208Q108 160 98 112Z',LD(q));
  [[54,200,95],[62,204,92],[70,206,90],[80,207,90],[90,206,90],[98,204,88],[106,200,85],[56,180,100],[66,184,94],[76,186,90],[86,186,90],[96,184,86],[104,180,80],[60,160,100],[70,164,94],[80,166,90],[90,164,86],[100,160,80],[64,140,98],[74,144,92],[86,144,88],[96,140,82]].forEach(([x,y,a],k)=>{s+=leaf(q,x,y-14,a,16,.36,k%2?LF(q):LD(q))});
  /* corset d'écorce et mousse */
  s+=P('M64 64Q80 58.6 96 64L98 116Q80 122 62 116Z',BK(q))+L_('M70 66Q68 90 70 114M90 66Q92 90 90 114M80 62V118M75 64Q74 90 76 116M85 64Q86 90 84 116','#3a2614',.6,'opacity=".7"');
  s+=P('M62 112Q80 119 98 112L98.4 117Q80 124 61.6 117Z','#5a9a3a')+[64,70,76,82,88,94].map(x=>C_(x,r1(116+Math.abs(x-80)*-.02),1.2,'#7ac04a')).join('')+flower(q,80,116.4,2.6);
  s+=P('M66 62Q80 70 94 62L95 66Q80 74 65 66Z','#5a9a3a')+flower(q,80,76,3.6)+C_(80,76,7,SD(q),`opacity="${.25+u*.1}"`);
  /* épaulières de feuilles */
  s+=MB(leaf(q,66,64,-170,22,.36,LD(q))+leaf(q,64,68,-156,20,.36,LF(q))+leaf(q,63,74,-140,18,.34,LD(q)));
  /* bras droit : une pousse lumineuse au creux de la main */
  s+=P('M60 70Q52 84 50 100L57.6 101Q59.4 86 65 76Z',SK(q))+P('M50 100Q49 92 46 86L52 83Q55.6 90 57.6 101Z',SK(q))+L_('M51 96Q54 92 53 88M50.6 90Q52.6 86 51.4 84','#3a7a2a',.6)+leaf(q,53,88,-40,3)+E_(47,83,4.4,3,SK(q),'transform="rotate(-20 47 83)"');
  s+=`<g>${C_(46,72,10,SD(q),'opacity=".9"')}${L_('M46 79V70','#5aa83a',1)}${leaf(q,46,72,-150,5.4)}${leaf(q,46,70,-30,5.4)}${leaf(q,46,68,-90,4)}<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.6;0 0" dur="2.6s" repeatCount="indefinite"/></g>`;
  /* bras gauche : le bâton de bois vivant, fleuri */
  s+=P('M100 70Q108 84 110 100L102.4 101Q100.6 86 95 76Z',SK(q))+P('M102.4 101L110 100L116.6 114L110.4 116.6Z',SK(q))+L_('M104 96Q108 92 106 86','#3a7a2a',.6)+leaf(q,106,86,-60,3);
  s+=L_('M118 30Q114 80 118 130Q121 170 116 214',WD(q),2.6)+L_('M118 30Q112 22 108 20M118 34Q124 26 128 26M117 60Q122 56 126 58','#5a3a1a',1.2)
    +leaf(q,108,20,-150,6)+leaf(q,128,26,-30,6)+leaf(q,126,58,10,5)+leaf(q,114,90,180,5)+C_(118,26,9,SD(q),'opacity=".9"')+flower(q,118,26,4)+flower(q,108,20,2)+flower(q,128,25,2);
  s+=E_(115,117,4.6,4.2,SK(q))+L_('M111 114.6L118.6 115.2M110.8 117.4L118.8 118','#5a3a22',.5);
  s+=HG(face(q,u)+crown(q,u));
  if(u>=3)s+=halo(80,10,11,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(GAI,gPortrait,gBody);
}catch(e){console.warn('gaia art',e)}})();
