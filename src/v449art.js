
/* ================= APPARENCE LÉGENDAIRE · ORION, CHASSEUR D'ÉCLIPSE (Pass Pro « L'Éclipse », palier 60) =================
   Un dessin refait dans le style maison, à partir du nouvel Orion :
   capuche et cape de nuit doublées d'or, cheveux d'argent, yeux d'or, croissant sur la joue,
   un anneau des phases de la lune derrière la tête, l'éclipse dans le ciel, des emblèmes de soleil noir (fermoirs,
   broche, ceinture, bottes), un carquois de flèches à pointe de croissant, un arc d'or,
   et en pied : une petite éclipse qui flotte au-dessus de sa main. */
(function(){try{
if(!window.SKX||!SKX.def('or_eclipse')||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,star8,rays,frame,eye,sigilRing,footRing,feather,risers,halo,pOpen,pClose,bOpen,bStars}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#3a2470':'#2a1656'],[.18,'#24104a'],[.45,'#160a33'],[.72,'#0a0520'],[1,'#030108']],'50%','32%','80%')
 +rad(q+'gl',[[0,'#fff6dc',.9],[.5,'#e0ccff',.36],[1,'#8a5aff',0]])
 +lin(q+'au',[[0,'#fff4c8'],[.5,'#ffcf4a'],[1,'#b07a14']],1,1)
 +lin(q+'ag',[[0,'#ffffff'],[.5,'#f2e8ff'],[1,'#9a88c8']],1,1)
 +lin(q+'hd',[[0,u>=3?'#4a2a8a':'#36196e'],[.55,'#1a0b3a'],[1,'#07030f']])
 +lin(q+'tu',[[0,'#26124e'],[1,'#0a0518']])
 +lin(q+'ln',[[0,'#ffe8a8'],[1,'#b88420']])
 +lin(q+'sk',[[0,'#f6dcc6'],[.55,'#eac6aa'],[1,'#c99c80']],1,0)
 +lin(q+'hr',[[0,'#ffffff'],[.5,'#e4d8ff'],[1,'#8a74c8']])
 +lin(q+'lb',[[0,'#ffffff'],[.5,'#ffe8b0'],[1,'#e0a83a']],1,0)
 +lin(q+'bt',[[0,'#6a5a9a'],[.5,'#2e2252'],[1,'#0c0820']],1,0)+lin(q+'sl',[[0,'#3c1e70'],[1,'#120828']])
 +rad(q+'sg',[[0,'#ffffff',1],[.35,'#ffe8b0',.75],[1,'#c890ff',0]])
 +rad(q+'co',[[0,'#000000',0],[.6,'#000000',0],[.68,'#ffffff',.95],[.8,'#ffe8b0',.6],[1,'#c890ff',0]])
 +rad(q+'mo',[[0,'#22143e'],[.8,'#0a0618'],[1,'#000000']],'40%','38%','70%');
const BT=q=>U(q,'bt'),SL=q=>U(q,'sl'),AU=q=>U(q,'au'),AG=q=>U(q,'ag'),HD=q=>U(q,'hd'),TU=q=>U(q,'tu'),LN=q=>U(q,'ln'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),LB=q=>U(q,'lb'),SG=q=>U(q,'sg');
const MI0=s=>s+`<g transform="scale(-1 1)">${s}</g>`;
/* l'emblème : un soleil noir cerclé d'or, aux rayons courts */
function oecl(q,x,y,R,n=8){let d='';for(let k=0;k<n;k++){const a=(k*360/n-90)*Math.PI/180,w=Math.PI/n*.42,L=R*(k%2?1.42:1.75);
    d+=`M${r1(x+R*.98*Math.cos(a-w))} ${r1(y+R*.98*Math.sin(a-w))}L${r1(x+L*Math.cos(a))} ${r1(y+L*Math.sin(a))}L${r1(x+R*.98*Math.cos(a+w))} ${r1(y+R*.98*Math.sin(a+w))}Z`}
  return P(d,AU(q),'stroke="#6a4a10" stroke-width=".2"')+C_(x,y,R,'#fff2c8','stroke="#b07a14" stroke-width=".25"')+C_(x,y,r1(R*.78),'#07040f')+C_(r1(x+R*.5),r1(y-R*.42),r1(R*.16),'#ffffff')}
/* un croissant de lune */
const cres=(x,y,r,rot,c,ex='')=>`<path transform="translate(${r1(x)} ${r1(y)}) rotate(${rot})" d="M0 ${r1(-r)}A${r} ${r} 0 1 0 0 ${r1(r)}A${r1(r*.76)} ${r1(r*.76)} 0 1 1 0 ${r1(-r)}Z" fill="${c}" ${ex}/>`;
/* l'éclipse dans le ciel : couronne de lumière, longues flammèches, disque noir, anneau de diamant */
function eclipse(q,cx,cy,R,u,op){op=op==null?.85:op;let s=`<g opacity="${op}">`+C_(cx,cy,r1(R*2.2),U(q,'co'));
  let d='',d2='';for(let k=0;k<22;k++){const a=(k*360/22-90+(k%3)*3)*Math.PI/180,w=k%2?.03:.055,L=R*(k%4===0?2.5+u*.12:k%2?1.45:1.9);
    const s1=`M${r1(cx+R*.98*Math.cos(a-w))} ${r1(cy+R*.98*Math.sin(a-w))}L${r1(cx+L*Math.cos(a))} ${r1(cy+L*Math.sin(a))}L${r1(cx+R*.98*Math.cos(a+w))} ${r1(cy+R*.98*Math.sin(a+w))}Z`;if(k%4===0)d+=s1;else d2+=s1}
  s+=P(d,'#fff4d8','opacity=".8"')+P(d2,'#e0ccff','opacity=".55"');
  s+=C_(cx,cy,R,U(q,'mo'))+C_(cx,cy,R,'none',`stroke="#fff2c8" stroke-width="${r1(R*.07)}"`)+C_(cx,cy,r1(R*1.08),'none',`stroke="#c890ff" stroke-width="${r1(R*.04)}" opacity=".7"`);
  const da=-38*Math.PI/180,dx=r1(cx+Math.cos(da)*R),dy=r1(cy+Math.sin(da)*R);
  s+=C_(dx,dy,r1(R*.45),'#ffffff','opacity=".35"')+P(`M${dx} ${r1(dy-R*.7)}Q${dx} ${dy} ${r1(dx+R*.7)} ${dy}Q${dx} ${dy} ${dx} ${r1(dy+R*.7)}Q${dx} ${dy} ${r1(dx-R*.7)} ${dy}Q${dx} ${dy} ${dx} ${r1(dy-R*.7)}Z`,'#ffffff')+C_(dx,dy,r1(R*.12),'#ffffff');
  return s+'</g>'}
/* l'anneau des phases de la lune, derrière la tête */
function phases(q,cx,cy,R,u,op){op=op==null?.55+u*.1:op;let s=sigilRing(cx,cy,R,op,'#ffe08a','#e0ccff',36);
  s+=C_(cx,cy,r1(R*1.12),'none',`stroke="#e0ccff" stroke-width="${r1(R*.012)}" stroke-dasharray="${r1(R*.04)} ${r1(R*.1)}" opacity="${r1(op*.8)}"`);
  for(let k=0;k<8;k++){const a=(k*45-90)*Math.PI/180,x=r1(cx+R*.925*Math.cos(a)),y=r1(cy+R*.925*Math.sin(a)),r=r1(R*.07);
    if(k===0){s+=C_(x,y,r1(R*.15),'#07040f',`stroke="#fff2c8" stroke-width="${r1(R*.025)}"`)+C_(x,y,r1(R*.2),'none',`stroke="#ffe8b0" stroke-width="${r1(R*.012)}" opacity=".8"`);continue}
    if(k===4){s+=C_(x,y,r,'#fff6dc',`opacity="${r1(Math.min(1,op+.2))}"`);continue}
    const f=k<4?k/4:(8-k)/4;s+=C_(x,y,r,'#fff6dc',`opacity="${r1(Math.min(1,op+.2))}"`)+C_(r1(+x+(k<4?-1:1)*r*f*1.6),y,r,'#160a33')}
  return s}
/* ---------- la tête ---------- */
function hoodBack(q){return P('M29.4 52Q26.4 22 50 13.6Q73.6 22 70.6 52Q72.6 66 76.6 80L23.4 80Q27.4 66 29.4 52Z',HD(q))+P('M34 48Q33 28 50 22Q67 28 66 48Q60 36 50 34Q40 36 34 48Z','#05020c','opacity=".65"')
  +L_('M26 72Q28.4 60 29.4 52Q26.4 22 50 13.6','#ffe8b0',.7,'opacity=".4"')
  +[[32,30],[36,22],[44,17],[63,19],[68,28],[70,40],[28,42],[73,56],[26,62]].map(([x,y],k)=>k%3?C_(x,y,.55,'#ffe8b0','opacity=".85"'):cres(x,y,1.1,-30,'#ffe8b0','opacity=".85"')).join('')}
function face(q,u){
  let s=`<rect x="44" y="55" width="12" height="12" fill="${SK(q)}"/>`+P('M44 59.4Q50 63.2 56 59.4L56 64.6Q50 67 44 64.6Z','#a87a64','opacity=".6"');
  s+=P('M36 44Q36 30.2 50 30.2Q64 30.2 64 44Q64 52 62.2 56.6Q59.8 62.4 54.8 64.8Q52.4 65.8 50 65.8Q47.6 65.8 45.2 64.8Q40.2 62.4 37.8 56.6Q36 52 36 44Z',SK(q));
  s+=P('M59.4 45Q62.8 51.6 60.6 57Q58.4 61.8 53.6 64.2Q58.6 59 59.8 52.6Z','#a87a64','opacity=".45"');
  s+=P('M38.4 54Q39.6 60.6 44.6 64Q47.4 65.6 50 65.6Q52.6 65.6 55.4 64Q60.4 60.6 61.6 54Q60.6 58.6 57.4 60.4Q54 61.6 50 61.2Q46 61.6 42.6 60.4Q39.4 58.6 38.4 54Z','#6a5a98','opacity=".24"')
    +P('M45.6 56.6Q50 55.4 54.4 56.6Q52.4 57.6 50 57.4Q47.6 57.6 45.6 56.6Z','#6a5a98','opacity=".28"');
  /* des yeux d'or, qui luisent dans la nuit */
  const io=u>=3?{ir:'#fff6dc',ir2:'#e0a83a',glow:'#fff2c8'}:{ir:'#ffe08a',ir2:'#c8901a',glow:'#ffe8b0'};
  s+=eye(44,Object.assign({lid:'#1a1030',open:.82,lw:1.3},io))+eye(56,Object.assign({lid:'#1a1030',open:.82,lw:1.3},io))+STARP(44.2,46.6,.42,'#ffffff')+STARP(55.8,46.6,.42,'#ffffff');
  s+=MI(P('M39 42Q43.4 40.6 48.2 42L48 43.4Q43.6 42.2 39.4 43.4Z','#8a74c8'));
  s+=L_('M50.6 47.6L49.4 53.4Q50.4 54.4 52 53.8','#a87a64',.8)+P('M48.6 53.8Q50.4 55 52.2 54Q50.6 54.8 48.6 53.8Z','#a87a64','opacity=".6"');
  s+=L_('M46.4 58.4Q50 59.6 53.8 58','#7a3a3a',.95)+L_('M53.4 58.2L54.6 57.4','#7a3a3a',.6);
  /* un croissant d'or sur la joue, et trois points d'éclipse */
  s+=cres(58.8,52.2,2.1,-28,'#ffe08a','opacity=".95"')+[[57.4,56.4],[59.4,57.6],[61.2,56.6]].map(([x,y],k)=>C_(x,y,k===1?.5:.38,'#fff6dc')).join('');
  /* cheveux d'argent en bataille, et favoris */
  s+=P('M36.2 45Q35.2 32 43.6 27.4Q50 24.6 57 27.2Q65 31.4 63.8 45Q62.6 38.8 59.6 36.4Q58.6 39.4 55.6 40.4Q56.4 37.6 55.6 35.6Q52.4 38.6 47.6 39.4Q49.2 37.2 49 35.4Q45 38.6 40.8 39Q38 40.6 36.2 45Z',HR(q))
    +MI(P('M36.4 44.2Q36 49 37 52.6L38.6 52.2Q38 48.6 38.4 44.6Z',HR(q)))
    +L_('M42 30.4Q46.4 28.4 51 29M52.6 29.2Q58 30.4 61.4 34.6M44.4 34.6Q48 32.2 50.8 31.6','#ffffff',.45,'opacity=".85"');
  return s}
function hoodFront(q,u){let s=P('M31.6 52Q30 26 50 18.6Q70 26 68.4 52Q66.4 36 58.6 30.4Q50 26.6 41.4 30.4Q33.6 36 31.6 52Z',HD(q));
  s+=P('M31.6 52Q33.6 36 41.4 30.4Q50 26.6 58.6 30.4Q66.4 36 68.4 52L66.9 52.4Q65.1 38.2 57.9 32.6Q50 29.2 42.1 32.6Q34.9 38.2 33.1 52.4Z',LN(q));
  s+=L_('M31.9 51.6Q33.9 36.2 41.6 30.7Q50 27 58.4 30.7Q66.1 36.2 68.1 51.6',AU(q),.85)+L_('M31.3 51.2Q29.7 26.2 50 18.9Q70.3 26.2 68.7 51.2',AU(q),.75)
    +L_('M32.3 47.4Q31.5 28.6 50 22.4Q68.5 28.6 67.7 47.4','#fff2c8',.6,'stroke-dasharray=".1 2.2" opacity=".95"');
  /* le diadème : un croissant d'or qui tient un soleil noir */
  s+=cres(50,22.6,4.4,90,AU(q),'stroke="#6a4a10" stroke-width=".25"')+oecl(q,50,21.4,2.1,8);
  if(u>=1)s+=L_('M35 40Q38 28.4 47 24.2','#fff2c8',.45,`opacity="${.3+u*.15}"`);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=L_('M30 100Q12 76 22 46Q24 40 27 36','#ffe8b0',4.2,'opacity=".3"')+L_('M30 100Q12 76 22 46Q24 40 27 36',LB(q),2.2)+L_('M27 36Q28.2 32.6 31 31.8Q33.4 31.4 32.9 33.8',AU(q),1.2)+C_(27,36,1,'#ffffff')+L_('M27.6 35.4Q34 66 52 100','#fff6dc',.4,'opacity=".8"');
  /* deux flèches à pointe de croissant derrière l'épaule droite */
  const fl=(x,a)=>`<g transform="translate(${x} 70) rotate(${a})">${C_(0,-20,4.4,SG(q),'opacity=".8"')}<path d="M0 0V-17" stroke="#ffe8b0" stroke-width="1"/>${cres(0,-20,2.6,180,'#ffffff')}</g>`;
  s+=fl(71,16)+fl(76,26);
  /* la cape de nuit doublée d'or */
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',HD(q))+P('M12 100Q14 85 26 77.6L30 100Z',LN(q))+P('M88 100Q86 85 74 77.6L70 100Z',LN(q))
    +L_('M12.4 99.6Q14.4 85.2 26 78.2M87.6 99.6Q85.6 85.2 74 78.2',AU(q),.7)+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8)
    +[[16,92],[20,84],[82,86],[86,94]].map(([x,y],k)=>k%2?STARP(x,y,.6,'#ffe9a0'):cres(x,y,1.3,-30,'#ffe9a0')).join('');
  /* tunique de minuit, galon d'or, broche de soleil noir */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',TU(q))+L_('M33.8 78.2Q40 72.8 50 72.8Q60 72.8 66.2 78.2',AU(q),.8)+L_('M50 74V100','#05020c',.8)
    +L_('M41 82Q45 86 50 86Q55 86 59 82',AU(q),.5,'opacity=".8"')+C_(50,88,8,SG(q),`opacity="${.3+u*.12}"`)+oecl(q,50,88,3.6,10);
  s+=L_('M34.6 77.6Q42 82 50 81.4Q58 82 65.4 77.6',AU(q),.45,'stroke-dasharray=".8 .8"')+oecl(q,34.6,77.6,1.7,8)+oecl(q,65.4,77.6,1.7,8);
  return s}
/* ultra II et III : une cape d'ombre aux bords d'or qui s'ouvre comme des ailes */
function nightCape(q,u){const R=[36,64];let w='';
  [[-174,44],[-156,50],[-137,53],[-118,48],[-100,40]].forEach(([a,l],k)=>{w+=feather(R,a,l,7.4,k%2?'#2a1458':'#1a0b3a',u>=3?'#fff2c8':'#ffd884',.7)});
  [[-165,30],[-146,33],[-126,32],[-108,26]].forEach(([a,l])=>{w+=feather(R,a,l,5.4,'#3c1e70','#e0ccff',.45)});
  const dots=[[-170,40],[-152,44],[-134,48],[-116,42],[-160,26],[-140,30],[-122,28]].map(([a,l])=>{const t=a*Math.PI/180;return C_(r1(R[0]+l*Math.cos(t)),r1(R[1]+l*Math.sin(t)),.6,'#fff2c8')}).join('');
  return`<g opacity="${u>=3?.97:.92}">${MI(w+dots)}</g>`}
/* ---------- portrait ---------- */
function ePortrait(u){const q='eop'+u+'_';
  let s=pOpen(q,"Orion, Chasseur d'Éclipse",defs(q,u));
  s+=rays(50,34,12,80,.06,'#ffe8b0')+eclipse(q,20,19,6.8+u*.5,u,.95)+L_('M66 12L73 16L80 20','#ffe8b0',.35,'opacity=".55" stroke-dasharray="1.6 1.6"')+[[66,12],[73,16],[80,20]].map(([x,y])=>STARP(x,y,.6,'#ffe8b0')).join('')
    +C_(50,34,30+u*2,U(q,'gl'),'opacity=".75"')+phases(q,50,34,28,u);
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=nightCape(q,u);
  s+=hoodBack(q)+bust(q,u)+face(q,u)+hoodFront(q,u);
  if(u>=3)s+=halo(50,14.6,11,2.8);
  s+=frame('#ffd884');
  return s+pClose('Tireur',u,[[16,40,2],[84,40,1.8],[20,62,1.3],[80,60,1.5]])}
/* ---------- corps entier ---------- */
function eBody(u,bare){const q='eob'+u+(bare?'s':'')+'_';
  let s=bOpen(q,"Orion, Chasseur d'Éclipse",defs(q,u)+rad(q+'bb',[[0,'#e0ccff',.3+u*.08],[.55,'#2a1458',.3],[1,'#030108',0]],'50%','40%','60%'));
  const con='M18 40L30 28L44 36L38 52Z M122 30L136 22L146 38L132 50Z M20 150L32 138L40 154 M128 140L142 132L150 150';
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${phases(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.045,'#ffe8b0')}${eclipse(q,32,34,14+u*1.2,u,.95)}${L_(con,'#ffe8b0',.45,'opacity=".45"')}${[[122,30],[136,22],[146,38],[132,50],[20,150],[32,138],[40,154],[128,140],[142,132],[150,150]].map(([x,y],k)=>C_(x,y,k%3?.8:1.2,'#fff6dc','opacity=".85"')).join('')}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".6"')}${phases(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#fff2c8','#e0ccff'],(c,k)=>k%2?`<path d="M0 -2L.6 -.6L2 0L.6 .6L0 2L-.6 .6L-2 0L-.6 -.6Z" fill="${c}" opacity=".9"/>`:`<path d="M0 -2.2A2.2 2.2 0 1 0 0 2.2A1.7 1.7 0 1 1 0 -2.2Z" fill="${c}" opacity=".9"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffe08a','#c890ff',(x,y,k)=>k%3?`M${x} ${r1(y-.9)}V${r1(y+.9)}M${r1(x-.9)} ${y}H${r1(x+.9)}`:`M${x} ${r1(y-1.2)}A1.2 1.2 0 1 0 ${x} ${r1(y+1.2)}A.9 .9 0 1 1 ${x} ${r1(y-1.2)}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".45"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${nightCape(q,u)}</g>`;
  /* la grande cape de nuit, doublée d'or, brodée de croissants */
  s+=P('M62 60Q46 110 40 206Q58 213 80 210Q102 213 120 206Q114 110 98 60Z',HD(q))+P('M62 62Q50 120 45 202L51 204Q56 128 67 68Z',LN(q))+P('M98 62Q110 120 115 202L109 204Q104 128 93 68Z',LN(q))
    +L_('M51 203.6Q56 128 66.6 68.6M109 203.6Q104 128 93.4 68.6',AU(q),.8)+L_('M40 206Q58 213 80 210Q102 213 120 206',AU(q),1.4)
    +[[48,170],[56,150],[46,130],[112,168],[104,146],[114,124],[60,190],[100,192]].map(([x,y],k)=>k%2?C_(x,y,.7,'#fff6dc','opacity=".85"'):cres(x,y,1.5,-30,'#ffe9a0')).join('')
    +[[44,206],[58,210.6],[80,209.4],[102,210.6],[116,206]].map(([x,y],k)=>cres(x,y,2.2,k%2?160:200,AU(q),'stroke="#6a4a10" stroke-width=".2"')).join('');
  /* le carquois de nuit au soleil noir, et ses flèches à pointe de croissant */
  s+=`<g transform="rotate(24 99.5 76)"><rect x="94" y="56" width="11" height="40" rx="3" fill="${TU(q)}" stroke="#05020c" stroke-width=".6"/><rect x="93.2" y="55.4" width="12.6" height="3" rx="1.2" fill="${AU(q)}"/><rect x="93.4" y="92.4" width="12.2" height="3.4" rx="1.4" fill="${AU(q)}"/>${oecl(q,99.5,76,2.8,8)}</g>`;
  [[104,60,24],[107.6,62,30],[110.6,65,36]].forEach(([x,y,a])=>{s+=`<g transform="translate(${x} ${y}) rotate(${a})">${C_(0,-34,5.6,SG(q),'opacity=".8"')}<path d="M0 0V-30" stroke="#ffe8b0" stroke-width="1.2"/>${cres(0,-34,3.2,180,'#ffffff')}</g>`});
  s+=HG(hoodBack(q));
  /* jambes : chausses de nuit, bottes d'obsidienne à boucle de soleil noir */
  const leg=(x,f)=>{const o=f?1:-1,tx=f?x+17.6:x-6.6,bx=f?x-1.4:x+12.4;
    return P(`M${x} 128L${x+11} 128L${x+10.4} 176L${x+.6} 176Z`,'#160a33')+L_(`M${x+.6} 150L${x+10.4} 151M${x+.6} 160L${x+10.4} 161`,'#3c1e70',.8,'opacity=".7"')
    +P(`M${x-.6} 174L${x+11.6} 174L${x+12} 203L${x-1} 203Z`,BT(q),'stroke="#1a1030" stroke-width=".5"')+L_(`M${x+1.4} 182L${x+2} 200`,'#e0ccff',.6,'opacity=".5"')
    +P(`M${f?x+12:x-1} 199L${bx} 199L${bx} 207.6Q${r1(x+5.5+o*1.5)} 210.2 ${tx} 209.4Q${r1(tx-o*.6)} 204.6 ${f?x+12:x-1} 202.6Z`,BT(q),'stroke="#1a1030" stroke-width=".5"')
    +P(`M${x-1.4} 171.4L${x+12.4} 171.4L${x+12.2} 178.6Q${x+5.5} 180.6 ${x-1.2} 178.6Z`,TU(q),'stroke="#05020c" stroke-width=".45"')+L_(`M${x-1} 178.4Q${x+5.5} 180.2 ${x+11.8} 178.4`,AU(q),.8)+oecl(q,x+5.5,191,1.7,8)};
  s+=leg(68,0)+leg(81,1);
  /* longue tunique de minuit fendue, galons d'or */
  s+=P('M63 64Q80 58.6 97 64L100 150L88 152L80 122L72 152L60 150Z',TU(q))+L_('M60.4 149.4L72 151.4L80 122.6L88 151.4L99.6 149.4',AU(q),.8)+L_('M66 66.4Q80 61.6 94 66.4',AU(q),.8);
  s+=L_('M70 72Q80 80 90 72',AU(q),.5,'opacity=".8"')+C_(80,84,10,SG(q),`opacity="${.3+u*.12}"`)+oecl(q,80,84,4.6,10);
  s+=P('M61.6 112Q80 119 98.4 112L98.4 117.6Q80 124.6 61.6 117.6Z','#07030f')+L_('M61.8 112.4Q80 119.4 98.2 112.4',AU(q),.6)+oecl(q,80,116,2.6,8);
  /* bras droit : la main levée, une petite éclipse qui flotte au-dessus de la paume */
  s+=P('M61 66Q50 74 44.6 86.6L51 90.4Q55 80.4 65.4 73Z',SL(q),'stroke="#05020c" stroke-width=".45"')+L_('M44.8 86.4L51 90.2','#ffe8b0',.8)
    +P('M44.6 87.6L50.8 90.2L47.6 73.6L41.8 73Z',BT(q),'stroke="#1a1030" stroke-width=".45"')+L_('M43 79.6L49 80.2M43.8 84.4L49.8 85.2',AU(q),.6)
    +E_(44.6,70.6,4,3,SK(q))+L_('M41.2 70.2Q44.6 68.6 48 70','#b08470',.45);
  s+=`<g>${C_(44.6,59.6,12,SG(q),'opacity=".85"')}${eclipse(q,44.6,59.6,4.2,u,1)}<animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="2.4s" repeatCount="indefinite"/></g>`;
  /* épaulières d'obsidienne au filet d'or */
  const lame=(d,rim)=>P(d,BT(q),'stroke="#1a1030" stroke-width=".4"')+L_(rim,AU(q),.75);
  s+=lame('M64.8 72.6Q59.4 70.4 54 73.4Q50.4 75.8 49.4 81Q53.2 83 57 81.6Q62 79 64.8 72.6Z','M49.6 80.8Q53.2 82.6 57 81.2Q61.8 78.6 64.4 73')
    +lame('M71 62Q63.8 57.4 56.8 60Q52.2 62.2 50.6 68Q54.8 70.6 59.6 69.4Q66 67.2 71 62Z','M50.8 67.8Q54.8 70.2 59.6 69Q65.8 66.8 70.6 62.4')+cres(60.2,64.6,2.2,-30,AU(q));
  /* bras gauche : il tient l'arc d'or */
  s+=P('M96 63Q109 72 113.4 95L105.4 98.6Q102 84 93.6 73Z',SL(q),'stroke="#05020c" stroke-width=".5"')+L_('M99 68Q107.6 76 110.6 92','#c890ff',.6,'opacity=".55"')
    +P('M105.2 96.4L113.4 93.2L127.4 112.4L121 118.4Z',BT(q),'stroke="#1a1030" stroke-width=".5"')+L_('M108.4 98L122.6 114.6','#e0ccff',.5,'opacity=".5"')+L_('M110.6 102.6L116.8 99.4M117.6 111.8L123.4 107.6',AU(q),.7)
    +P('M102.6 62.6Q97 61 93.4 64.6Q91.6 67.6 92.6 71Q96.6 71.4 99.6 69Q102.8 66.6 102.6 62.6Z',BT(q),'stroke="#1a1030" stroke-width=".4"');
  s+=P('M118 30Q140 120 118 212','none','stroke="#ffe8b0" stroke-width="7" stroke-linecap="round" opacity=".26"')+P('M118 30Q140 120 118 212','none',`stroke="${LB(q)}" stroke-width="3.4" stroke-linecap="round"`)+L_('M117.6 30.6V211.4','#fff6dc',.6,'opacity=".9"');
  s+=L_('M118 30Q115 25.4 117.4 22.4Q120 20 122 22.8',AU(q),1.6)+L_('M118 212Q115 216.6 117.4 219.6Q120 222 122 219.2',AU(q),1.6)+cres(118.2,29.6,2.6,0,'#ffffff')+cres(118.2,212.4,2.6,0,'#ffffff');
  /* la poignée de l'arc : un soleil noir */
  s+=oecl(q,129.6,120.6,2.6,8);
  if(u)s+=P('M118 30Q140 120 118 212','none',`stroke="#fff2c8" stroke-width="1" opacity="${.2+u*.15}"`);
  s+=E_(128.4,118,4.8,4.4,SK(q))+L_('M124.4 115.4L132 115.6M124.2 118.4L132.2 118.6M124.6 121.2L131.8 121.4','#b08470',.5);
  s+=HG(face(q,u)+hoodFront(q,u));
  if(u>=3)s+=halo(80,10.4,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
const C={};
SKX.art('or_eclipse',{p:u=>C['p'+u]||(C['p'+u]=ePortrait(u)),b:u=>C['b'+u]||(C['b'+u]=eBody(u,false))});
}catch(e){console.warn('orion eclipse art',e)}})();
