
/* ================= NYX OMBRE-LUNE : nouveau style graphique =================
   Même assassine : elfe de la nuit à la peau violette, cornes roses, yeux qui brillent, larmes d'étoiles, croissant de lune, dague.
   Nouveau : visage détaillé, cornes en dégradé, ras-du-cou au croissant, grand croissant de lune derrière la tête,
   cape à haut col bordée d'argent, épaulière d'ombre, faucille de lune et dague en pied, chauves-souris, ailes d'ombre en ultra II/III. */
(function(){try{
const NYX=62;if(!HEROES[NYX]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fff0fa':'#ead8ff'],[.15,'#9a6ae0'],[.4,'#3a1a6a'],[.7,'#140828'],[1,'#05020c']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.9],[.5,'#e0c8ff',.4],[1,'#b07aff',0]])
 +lin(q+'ag',[[0,'#ffffff'],[.5,'#d8d0f0'],[1,'#7a70a0']],1,1)
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'cl',[[0,u>=3?'#4a2a7a':'#3a2464'],[.55,'#1e1038'],[1,'#0a0418']])
 +lin(q+'lt',[[0,'#46385e'],[1,'#1c1430']])
 +lin(q+'sk',[[0,'#8a76c0'],[.55,'#6a58a0'],[1,'#4a3a7a']],1,0)
 +lin(q+'hr',[[0,'#3a2a5a'],[.5,'#1e1430'],[1,'#0a0612']])
 +lin(q+'hn',[[0,'#ffb0e0'],[.5,'#ff4aa8'],[1,'#8a1050']])
 +lin(q+'mn',[[0,'#ffffff'],[.6,'#f0e8ff'],[1,'#b8a8e8']],1,1)
 +rad(q+'gm',[[0,'#ffe0f0'],[.4,'#ff3a9a'],[1,'#7a0a3a']],'38%','34%','70%')
 +rad(q+'pg',[[0,'#ffffff',1],[.35,'#ffb0e0',.7],[1,'#ff4aa8',0]]);
const AG=q=>U(q,'ag'),AU=q=>U(q,'au'),CL=q=>U(q,'cl'),LT=q=>U(q,'lt'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),HN=q=>U(q,'hn'),MN=q=>U(q,'mn'),GM=q=>U(q,'gm'),PG=q=>U(q,'pg');
const gem=(q,x,y,r)=>C_(x,y,r1(r*1.3),AG(q),'stroke="#3a3060" stroke-width=".3"')+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
/* un croissant de lune (centre, rayon, orientation) */
const crescent=(x,y,R,f,rot=-30,e='',th=.78)=>`<path d="M0 ${-R}A${R} ${R} 0 1 0 0 ${R}A${r1(R*th)} ${r1(R*(th+.08))} 0 1 1 0 ${-R}Z" transform="translate(${x} ${y}) rotate(${rot})" fill="${f}" ${e}/>`;
/* une chauve-souris */
const bat=(x,y,s,c='#0a0418')=>`<path d="M0 0Q-2 -2.4 -5 -1.6Q-4 -.6 -4.4 .6Q-2.6 -.4 -1.6 .8Q-.8 -.2 0 1Q.8 -.2 1.6 .8Q2.6 -.4 4.4 .6Q4 -.6 5 -1.6Q2 -2.4 0 0Z" transform="translate(${x} ${y}) scale(${s})" fill="${c}"/>`;
/* le sceau : grand croissant de lune et anneau étoilé */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=C_(r1(cx+R*.2),r1(cy-R*.12),r1(R*1.22),U(q,'gl'),`opacity="${r1(op*.6)}"`)+crescent(r1(cx+R*.12),r1(cy-R*.06),r1(R*1.2),MN(q),-28,`opacity="${r1(Math.min(1,op+.15))}"`,.62)+sigilRing(cx,cy,R,op*.8,'#e0c8ff','#ffffff',36);
  let d='';for(let k=1;k<12;k++){if(k===6)continue;const a=(k*30-90)*Math.PI/180;d+=`M${r1(cx+R*.925*Math.cos(a))} ${r1(cy+R*.925*Math.sin(a)-R*.05)}L${r1(cx+R*.925*Math.cos(a)+R*.02)} ${r1(cy+R*.925*Math.sin(a))}L${r1(cx+R*.925*Math.cos(a))} ${r1(cy+R*.925*Math.sin(a)+R*.05)}L${r1(cx+R*.925*Math.cos(a)-R*.02)} ${r1(cy+R*.925*Math.sin(a))}Z`}
  s+=`<path d="${d}" fill="#ffffff" opacity="${r1(op)}"/>`;
  const y=r1(cy-R*.93);return s+crescent(cx,y,r1(R*.09),AG(q),-30)+gem(q,r1(cx+R*.02),y,r1(R*.035))}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q69 ${y(16)} 72 ${y(32)}Q74 ${y(44)} 70 ${y(54)}H30Q26 ${y(44)} 28 ${y(32)}Q31 ${y(16)} 33.4 46Z`,HR(q))
  +L_(`M36 52Q33 66 32 ${y(38)}M64 52Q67 66 68 ${y(38)}`,'#5a4a8a',.5,'opacity=".6"')}
function horns(q,u){const h=P('M40.6 31Q35 22 37 10Q38.6 4 43 2Q39.4 8 40.6 16Q41.6 22 45 27Z',HN(q),'stroke="#4a0a2a" stroke-width=".35"')+L_('M39.6 24Q38 16 40.4 8','#ffd0ee',.45,'opacity=".8"')+L_('M38.8 18L41.4 17.4M38.6 12.6L41.2 12.4','#8a1050',.4);
  return MI(h)+(u>=3?P('M40 25L43 19L45.4 24L48 17L50 23L52 17L54.6 24L57 19L60 25Q50 22.4 40 25Z','#140828','stroke="#ff4aa8" stroke-width=".4"')+gem(q,50,21,1):'')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#2a1e48','opacity=".5"');
  s+=MI(P('M37.6 44Q31 40 28.6 34.6Q33 37.4 37.4 39.4Z',SK(q),'stroke="#2a1e48" stroke-width=".3"')+C_(33.6,41.6,.55,AG(q)));
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#2a1e48','opacity=".35"');
  const io=u>=3?{ir:'#ffe08a',ir2:'#c8901a',glow:'#ffe08a'}:{ir:'#ff6ab8',ir2:'#a8106a',glow:'#ffb0e0'};
  s+=eye(44,Object.assign({lash:1,lid:'#0a0418',white:'#f4eeff',fierce:1},io))+eye(56,Object.assign({lash:1,lid:'#0a0418',white:'#f4eeff',fierce:1},io));
  s+=MI(L_('M39.8 41.8Q43.6 39.6 47.6 41','#140828',1.1));
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#3a2a64',.65);
  s+=P('M46.6 57Q50 58.2 53.4 57Q52.6 59.6 50 59.9Q47.4 59.6 46.6 57Z','#5a1a4a')+L_('M46.4 57Q50 58.2 53.6 56.8','#2a0a24',.55)+P('M47.8 58.8Q50 59.6 52.2 58.8Q50 59.4 47.8 58.8Z','#c86aa8','opacity=".7"');
  /* larmes d'étoiles sous les yeux */
  s+=MI(STARP(42,52.2,.5,'#ffffff')+C_(42.6,54.4,.35,'#e0d0ff')+C_(43,56,.25,'#e0d0ff'));
  /* ras-du-cou au croissant */
  s+=P('M45.4 64.4Q50 66.6 54.6 64.4L54.6 65.8Q50 68 45.4 65.8Z','#140828','stroke="#d8d0f0" stroke-width=".3"')+crescent(50,68.6,1.6,AG(q),-30);
  /* frange droite noire et longues mèches */
  s+=P('M36.4 45Q35 29 50 26.8Q65 29 63.6 45Q62.6 38.6 60.4 37.4L58.6 40.6L56.6 36.8L54.2 40.4L52 36.6L49.6 40.4L47.6 36.6L45.4 40.4L43.4 36.8L41.4 40.6L39.6 37.4Q37.4 38.6 36.4 45Z',HR(q))
    +L_('M42 30Q46.4 28.4 51 28.6M53 28.6Q57.6 29.4 60.4 32.4','#6a5aa0',.5,'opacity=".8"');
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 80Q38.8 74 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 80Q61.2 74 60.2 62Q59.4 52 60.4 44Z',HR(q));
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  /* la poignée d'une dague par-dessus l'épaule */
  let s=L_('M74 72L82 50','#2a2040',2.2)+P('M79.6 52.6L85.6 50.6L85 49L79 51Z',AG(q))+C_(83.4,47.6,1.4,GM(q));
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',CL(q))+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AG(q),.8);
  /* haut col de la cape, bordé d'argent */
  s+=MI(P('M33.6 75Q28 64 31 54L38.6 60.4Q37 67 40 74Z',CL(q),'stroke="#0a0418" stroke-width=".3"')+L_('M31.2 54.4L38.4 60.6Q36.8 67 39.8 73.6',AG(q),.6));
  /* tenue de cuir sombre, sangles d'argent */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',LT(q))+L_('M33.8 78.2Q40 72.8 50 72.8Q60 72.8 66.2 78.2',AG(q),.7)+L_('M50 74V100','#05020c',.7)
    +L_('M34 82Q50 94 68 98',AG(q),1.4)+L_('M34.2 81.8Q50 93.6 68.2 97.6','#05020c',.4)+P('M47.4 89.6H52.6V93.2H47.4Z','none',`stroke="${AG(q)}" stroke-width=".6"`);
  /* l'épaulière d'ombre à la gemme rose */
  const lame=(d,rim)=>P(d,'#2a2040','stroke="#05020c" stroke-width=".4"')+L_(rim,AG(q),.75);
  s+=lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75')+gem(q,21.4,78,1.5)+P('M14 72L12 66L17 70.6Z',AG(q))+P('M24 70.6L24 64.6L27.6 70.2Z',AG(q));
  return s}
/* ultra II et III : ailes d'ombre */
function batWings(q,u){const w=`<path d="M38 64Q22 40 4 34Q8 44 6 52Q12 50 16 56Q14 62 16 68Q22 64 28 70Q30 64 38 66Z" fill="#140828" stroke="${u>=3?'#ffd84a':'#ff4aa8'}" stroke-width=".6"/>${L_('M38 64L6 52M37 65L16 68M37 64L16 56M36 64Q20 44 4 34','#5a3a8a',.5)}`;
  return`<g opacity="${u>=3?.97:.92}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function nPortrait(u){const q='np'+u+'_';
  let s=pOpen(q,'Nyx Ombre-Lune',defs(q,u));
  s+=rays(50,34,12,80,.06,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,27,u);
  s+=[[14,20],[88,18],[90,46],[10,50],[72,8]].map(([x,y],k)=>STARP(x,y,.6+k%2*.3,'#ffffff')).join('')+bat(16,32,1.1)+bat(84,30,.9)+bat(88,62,.8);
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffb0e0" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=batWings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+horns(q,u);
  if(u>=3)s+=halo(50,12.6,11,2.8);
  s+=frame('#ff6ab8');
  return s+pClose('Assassin',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function nBody(u,bare){const q='nb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Nyx Ombre-Lune',defs(q,u)+rad(q+'bb',[[0,'#c8a8ff',.36+u*.08],[.55,'#3a1a6a',.3],[1,'#05020c',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.04,'#ffffff')}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".7"')}${C_(88,70,58,U(q,'gl'),'opacity=".35"')}${crescent(92,74,54,MN(q),-24,'opacity=".22"',.7)}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffb0e0" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=bat(20,40,1.8)+bat(140,56,1.6)+bat(30,150,1.4)+bat(136,140,1.5)+[[16,24],[146,30],[24,100],[140,104]].map(([x,y])=>STARP(x,y,.8,'#ffffff')).join('');
    s+=risers(['#ffb0e0','#e0c8ff'],(c,k)=>k%2?bat(0,0,.7,c):`<circle r="1" fill="${c}"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#b07aff','#ff6ab8',(x,y)=>`M${x} ${r1(y-1)}A1 1 0 1 0 ${x} ${r1(y+1)}A.8 .9 0 1 1 ${x} ${r1(y-1)}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${batWings(q,u)}</g>`;
  /* la cape d'ombre à l'ourlet déchiré */
  s+=P('M62 60Q46 110 40 206L48 200L54 208L62 200L70 208L80 202L90 208L98 200L106 208L112 200L120 206Q114 110 98 60Z',CL(q))+L_('M40 206L48 200L54 208L62 200L70 208L80 202L90 208L98 200L106 208L112 200L120 206',AG(q),.8,'opacity=".8"')+L_('M61.6 61Q46.4 110 40.4 205.4','#c8a8ff',1,'opacity=".55"')+L_('M98.4 61Q113.6 110 119.6 205.4','#ff8ac8',.7,'opacity=".4"');
  s+=HG(hairBack(q,1.3));
  /* jambes : collant sombre, cuissardes à boucles d'argent */
  const leg=(x,f)=>{const tx=f?x+15:x-4,bx=f?x-1:x+11,o=f?1:-1;
    return P(`M${x} 124L${x+11} 124L${x+10.4} 160L${x+.6} 160Z`,LT(q))+P(`M${x-.6} 156L${x+11.6} 156L${x+11} 204L${x} 204Z`,'#1a1228','stroke="#05020c" stroke-width=".4"')
    +P(`M${x} 200L${x+11} 200L${x+11.2} 207Q${r1(x+5.5+o*2)} 210 ${tx} 209L${bx} 206Z`,'#1a1228','stroke="#05020c" stroke-width=".4"')+L_(`M${x-.4} 158L${x+11.4} 158`,AG(q),.8)+L_(`M${x} 176L${x+11} 176.6M${x} 186L${x+11} 186.6`,AG(q),.6)+P(`M${x+4} 174.4H${x+7}V178H${x+4}Z`,'none',`stroke="${AG(q)}" stroke-width=".5"`)};
  s+=leg(68,0)+leg(81,1);
  /* tenue d'assassin : cuir sombre, sangles et ceinture de dagues */
  s+=P('M63 64Q80 58.6 97 64L99 124Q80 130 61 124Z',LT(q))+L_('M66 66.4Q80 61.6 94 66.4',AG(q),.8)+L_('M80 66V124','#05020c',.7);
  s+=L_('M66 72Q80 96 98 114',AG(q),1.6)+L_('M66.2 71.8Q80 95.6 98.2 113.6','#05020c',.4)+P('M77.4 90.6H82.6V94.2H77.4Z','none',`stroke="${AG(q)}" stroke-width=".6"`);
  s+=P('M61.6 116Q80 123 98.4 116L98.4 121.6Q80 128.6 61.6 121.6Z','#140c20')+L_('M61.8 116.4Q80 123.4 98.2 116.4',AG(q),.6)+crescent(80,120.4,2.4,AG(q),-30)+gem(q,80.6,120.4,1);
  s+=L_('M66 122L62 140M94 122L98 140',AG(q),1.4)+P('M60.8 140L63.6 140L62.6 148Z',AG(q))+P('M96.4 140L99.2 140L97.4 148Z',AG(q));
  s+=P('M66 58Q80 66 94 58L95.6 63Q80 71 64.4 63Z',CL(q))+L_('M64.6 62.8Q80 70.8 95.4 62.8',AG(q),.6);
  /* bras droit : la faucille de lune */
  s+=P('M60 66Q52 80 50 100L57.6 101Q59.4 84 65 72Z',LT(q))+P('M50 100Q48.6 112 49.4 120L56.4 120.4Q57.6 111 57.6 101Z',SK(q))+P('M49.6 103Q49 110.6 49.5 117.4L56.7 117.8Q57.3 110.6 57.4 103.4Z','#1a1228','stroke="#05020c" stroke-width=".4"')+L_('M49.6 104.2Q53.6 105.2 57.4 104.6',AG(q),.8);
  s+=L_('M52.8 122L50 60','#2a2040',2)+`<g transform="translate(50 60)">${crescent(0,-12,14,MN(q),-140,'stroke="#7a70a0" stroke-width=".5"',.66)}${C_(0,0,9,PG(q),'opacity=".35"')}</g>`+gem(q,50,61,1.2)+E_(52.8,122.4,3.8,3.4,SK(q));
  /* épaulière d'ombre */
  const lame=(d,rim)=>P(d,'#2a2040','stroke="#05020c" stroke-width=".4"')+L_(rim,AG(q),.75);
  s+=lame('M67.4 67.2Q61.4 64.4 55.4 67.2Q51.2 69.4 49.8 74.8Q54 77 58.2 75.6Q63.6 73.2 67.4 67.2Z','M50 74.6Q54 76.6 58.2 75.2Q63.4 72.8 67 67.6')
    +lame('M71 62Q63.8 57.4 56.8 60Q52.2 62.2 50.6 68Q54.8 70.6 59.6 69.4Q66 67.2 71 62Z','M50.8 67.8Q54.8 70.2 59.6 69Q65.8 66.8 70.6 62.4')+gem(q,60.2,64.4,1.4);
  /* bras gauche : la dague tenue à l'envers */
  s+=P('M100 66Q110 80 112 98L104.6 100Q103 84 96 72Z',LT(q))+P('M104.6 100L112 98L117.6 116L111.4 118.6Z',SK(q))+P('M105.4 102.6L112.6 100.4L116.2 112.2L109.8 114.6Z','#1a1228','stroke="#05020c" stroke-width=".4"');
  s+=E_(115,118,4.4,4,SK(q))+L_('M115 122L116 150','#2a2040',1.4)+P('M113.4 120.6H117.4V122.6H113.4Z',AG(q))+P('M114.8 114L115.6 100L117 114Z','none')+P('M113.8 122.6L118 122.6L116.6 152L115.8 152Z',MN(q),'stroke="#7a70a0" stroke-width=".3"');
  s+=HG(face(q,u)+horns(q,u));
  if(u>=3)s+=halo(80,9.4,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(NYX,nPortrait,nBody);
}catch(e){console.warn('nyx art',e)}})();
