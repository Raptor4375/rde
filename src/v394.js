
/* ================= APPARENCE LÉGENDAIRE · NYX, COMTESSE ÉCARLATE =================
   Un dessin refait : la comtesse vampire. Peau de porcelaine, yeux rouges, croc, cheveux de jais,
   diadème gothique aux ailes de chauve-souris, roses noires, haut col de velours, grandes ailes de chauve-souris,
   lune de sang, château gothique et pétales qui tombent. */
(function(){try{
if(!window.SKX||!SKX.def('ny_ecarlate')||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,rays,frame,sigilRing,footRing,halo,pOpen,pClose,bOpen,bStars}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#ffd8c8':'#ffa8a0'],[.15,'#c0203a'],[.4,'#4a0a1e'],[.7,'#1a040c'],[1,'#070205']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffd0c8',.85],[.5,'#ff5a6a',.35],[1,'#c0203a',0]])
 +lin(q+'ag',[[0,'#ffffff'],[.5,'#e2d2da'],[1,'#8a6a7a']],1,1)
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'cl',[[0,u>=3?'#5a0a20':'#3a0816'],[.55,'#1a040c'],[1,'#080206']])
 +lin(q+'cr',[[0,'#e02a44'],[.55,'#a00a24'],[1,'#4a0010']])
 +lin(q+'lt',[[0,'#2e0c18'],[1,'#12040a']])
 +lin(q+'sk',[[0,'#f6eaf0'],[.55,'#e6d2dc'],[1,'#bc9eae']],1,0)
 +lin(q+'hr',[[0,'#4a0c1e'],[.5,'#1e0610'],[1,'#08020a']])
 +lin(q+'mn',[[0,'#ffe0d0'],[.5,'#ff6a4a'],[1,'#a8101a']],1,1)
 +rad(q+'gm',[[0,'#ffd8e0'],[.4,'#ff2a4a'],[1,'#6a0014']],'38%','34%','70%')
 +lin(q+'wg',[[0,'#6a0a22'],[.6,'#2a0610'],[1,'#0e0206']],1,1);
const AG=q=>U(q,'ag'),AU=q=>U(q,'au'),CL=q=>U(q,'cl'),CR=q=>U(q,'cr'),LT=q=>U(q,'lt'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),MN=q=>U(q,'mn'),GM=q=>U(q,'gm'),WG=q=>U(q,'wg');
const gem=(q,x,y,r)=>C_(x,y,r1(r*1.3),AG(q),'stroke="#3a0a18" stroke-width=".3"')+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
const crescent=(x,y,R,f,rot=-30,e='',th=.78)=>`<path d="M0 ${-R}A${R} ${R} 0 1 0 0 ${R}A${r1(R*th)} ${r1(R*(th+.08))} 0 1 1 0 ${-R}Z" transform="translate(${x} ${y}) rotate(${rot})" fill="${f}" ${e}/>`;
const bat=(x,y,s,c='#0e0206')=>`<path d="M0 0Q-2 -2.4 -5 -1.6Q-4 -.6 -4.4 .6Q-2.6 -.4 -1.6 .8Q-.8 -.2 0 1Q.8 -.2 1.6 .8Q2.6 -.4 4.4 .6Q4 -.6 5 -1.6Q2 -2.4 0 0Z" transform="translate(${x} ${y}) scale(${s})" fill="${c}"/>`;
/* une rose : pétales en spirale, deux feuilles */
const rose=(x,y,r,f,e,lf='#2a0a10')=>`<g transform="translate(${x} ${y})">${P(`M${r1(-r*.2)} ${r1(r*.7)}Q${r1(-r*1.9)} ${r1(r*1.1)} ${r1(-r*1.6)} ${r1(r*.1)}Q${r1(-r*.9)} ${r1(r*.4)} ${r1(-r*.2)} ${r1(r*.7)}Z`,lf)}${P(`M${r1(r*.2)} ${r1(r*.7)}Q${r1(r*1.9)} ${r1(r*1.1)} ${r1(r*1.6)} ${r1(r*.1)}Q${r1(r*.9)} ${r1(r*.4)} ${r1(r*.2)} ${r1(r*.7)}Z`,lf)}`
  +C_(0,0,r,f,`stroke="${e}" stroke-width="${r1(r*.1)}"`)+L_(`M${r1(-r*.62)} ${r1(r*.2)}Q${r1(-r*.2)} ${r1(-r*.8)} ${r1(r*.55)} ${r1(-r*.1)}Q${r1(r*.3)} ${r1(r*.62)} ${r1(-r*.25)} ${r1(r*.38)}Q${r1(-r*.42)} ${r1(-r*.05)} ${r1(r*.05)} ${r1(-r*.25)}Q${r1(r*.25)} ${r1(r*.05)} 0 ${r1(r*.12)}`,e,r1(r*.13))+`</g>`;
/* le sceau : la lune de sang, un anneau et une rose au sommet */
function bloodMoon(q,cx,cy,R,u,op){op=op==null?.6+u*.1:op;const mx=r1(cx+R*.14),my=r1(cy-R*.08),mr=r1(R*1.04);
  let s=C_(mx,my,r1(mr*1.25),U(q,'gl'),`opacity="${r1(op*.8)}"`)+C_(mx,my,mr,MN(q),`opacity="${r1(Math.min(1,op+.2))}"`)
    +[[-.35,-.3,.16],[.3,-.1,.22],[-.1,.38,.14],[.42,.42,.1],[-.5,.15,.09]].map(([a,b,c])=>C_(r1(mx+a*mr),r1(my+b*mr),r1(c*mr),'#a8101a',`opacity="${r1(op*.35)}"`)).join('')
    +sigilRing(cx,cy,R,op*.7,'#ff8a8a','#ffd0c8',36);
  const y=r1(cy-R*.93);return s+rose(cx,y,r1(R*.075),CR(q),'#4a0010')}
/* le château gothique, au loin */
const castle=(sx,sy,sc,c,op)=>`<g transform="translate(${sx} ${sy}) scale(${sc})" opacity="${op}">${P('M0 60V30L4 30V18L8 4L12 18V30H18V24L22 14L26 24V40H34V10L38 -6L42 10V40H50V26L54 16L58 26V36H64V22L68 10L72 22V60Z',c)}${[[9,22],[38,18],[38,28],[68,30],[22,32]].map(([x,y])=>P(`M${x-.8} ${y}h1.6v2.6h-1.6z`,'#ff9a4a','opacity=".85"')).join('')}</g>`;
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q69 ${y(16)} 72 ${y(32)}Q74 ${y(44)} 70 ${y(54)}H30Q26 ${y(44)} 28 ${y(32)}Q31 ${y(16)} 33.4 46Z`,HR(q))
  +L_(`M36 52Q33 66 32 ${y(38)}M64 52Q67 66 68 ${y(38)}`,'#8a1a3a',.5,'opacity=".7"')}
/* le diadème gothique : pointes d'argent noirci, rubis, deux ailes de chauve-souris */
function tiara(q,u){const big=u>=2?1.15:1;
  const w=MI(P('M40.2 30.4Q35 24 30.6 23.6Q32.6 26 31.6 28.4Q33.8 27.8 35 29.6Q34.4 31.4 35 33Q37.4 31.6 40.6 32.6Z','#1a040c','stroke="#ff4a5a" stroke-width=".35"')+L_('M40 31L31.6 28.4M40 31.6L35 33','#6a0a22',.35));
  let s=w+P(`M38.6 33.2Q50 28.6 61.4 33.2L60.6 35.4Q50 31.4 39.4 35.4Z`,AG(q),'stroke="#3a0a18" stroke-width=".3"');
  s+=P(`M44 31.2L45.4 ${r1(31.2-5*big)}L46.8 30.4Z`,AG(q),'stroke="#3a0a18" stroke-width=".25"')+P(`M53.2 30.4L54.6 ${r1(31.2-5*big)}L56 31.2Z`,AG(q),'stroke="#3a0a18" stroke-width=".25"')
    +P(`M48 30.2L50 ${r1(29.6-8.6*big)}L52 30.2Z`,AG(q),'stroke="#3a0a18" stroke-width=".3"')+P(`M50 ${r1(29.6-8.6*big+2.2)}L51 30L50 30.6L49 30Z`,GM(q));
  s+=gem(q,50,31.6,1.25)+C_(45.4,r1(31.2-5*big),.5,'#ff2a4a')+C_(54.6,r1(31.2-5*big),.5,'#ff2a4a');
  if(u>=3)s+=P(`M40.6 32.6L42.6 ${r1(27-2*big)}L43.8 31.4ZM59.4 32.6L57.4 ${r1(27-2*big)}L56.2 31.4Z`,AU(q));
  return s}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#a8889a','opacity=".5"');
  s+=MI(P('M37.6 44Q31 40 28.6 34.6Q33 37.4 37.4 39.4Z',SK(q),'stroke="#a8889a" stroke-width=".3"')+C_(33.6,41.6,.55,GM(q)));
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#a8889a','opacity=".35"');
  const io=u>=3?{ir:'#ffd84a',ir2:'#c8501a',glow:'#ffb04a'}:{ir:'#ff2a3a',ir2:'#8a0010',glow:'#ff4a5a'};
  /* les yeux rouges mi-clos, fard sombre et trait d'eye-liner */
  const evil=x=>{const d=x<50?1:-1,ox=r1(x-4.2*d),ix=r1(x+3.8*d),cx=r1(x+.3*d);
    return P(`M${r1(x-4.4*d)} 45.2Q${x} 42.2 ${r1(x+4.4*d)} 46.8Q${x} 44 ${r1(x-4.4*d)} 45.2Z`,'#6a0a2a','opacity=".6"')
      +C_(cx,47.3,3.6,io.glow,'opacity=".4"')
      +P(`M${ox} 45.6Q${x} 45.2 ${ix} 47.6Q${x} 49.8 ${ox} 45.6Z`,'#fff4f4')
      +E_(cx,47.25,1.65,1.05,io.ir)+E_(cx,47.3,1,.8,io.ir2)+E_(cx,47.25,.3,.95,'#0a0204')+E_(cx,47.25,1.65,1.05,'none',`stroke="${io.glow}" stroke-width=".25" opacity=".9"`)+C_(r1(x-.5*d),46.8,.32,'#ffffff')
      +L_(`M${r1(ox-.3*d)} 45.4Q${x} 44.9 ${r1(ix+.3*d)} 47.7`,'#0a0204',1.5)+L_(`M${ox} 45.5L${r1(ox-2.4*d)} 43.8`,'#0a0204',.9)
      +L_(`M${r1(ox+.6*d)} 46.4Q${x} 49.6 ${r1(ix-.3*d)} 48.1`,'#8a5a6a',.35,'opacity=".6"')};
  s+=evil(44)+evil(56);
  s+=MI(P('M38.2 41.6Q42.2 38 48.2 42.6L47.8 43.6Q42.6 40 38.6 42.6Z','#14040a'));
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#b08898',.65);
  /* lèvres rouge sang, sourire en coin, deux crocs */
  s+=P('M46 57.6Q49.6 58.6 52.8 57.2Q54.4 56.4 55.4 54.8Q55.2 58.4 52.4 59.4Q49 60.2 46 57.6Z','#8a0a22')+P('M47.4 58.6Q50 59.4 52.6 58.4Q50.4 59.6 47.4 58.6Z','#e04a64','opacity=".8"')
    +L_('M45.8 57.6Q49.6 58.8 52.8 57.2Q54.4 56.4 55.6 54.6','#3a0010',.6)+P('M51.2 58.1L51.8 60.6L52.6 57.8Z','#ffffff','stroke="#a8889a" stroke-width=".15"')+P('M47.4 58.3L47.9 60.2L48.6 58.4Z','#ffffff','stroke="#a8889a" stroke-width=".15"');
  /* une larme de rubis et un grain de beauté */
  s+=P('M42.6 51.4Q43.4 53 42.6 53.8Q41.8 53 42.6 51.4Z',GM(q))+C_(57.4,55.6,.4,'#3a0a18');
  s+=MI(E_(41.4,54.4,3,1.3,'#ff6a8a','opacity=".16"'));
  /* le ras-du-cou de velours et sa goutte de rubis */
  s+=P('M45.4 64.4Q50 66.6 54.6 64.4L54.6 65.8Q50 68 45.4 65.8Z','#14040a','stroke="#e2d2da" stroke-width=".3"')+P('M50 66.6L51.2 68.6L50 70.6L48.8 68.6Z',GM(q),'stroke="#e2d2da" stroke-width=".2"');
  /* frange de jais et longues mèches, reflets rouges */
  s+=P('M36.4 45Q35 29 50 26.8Q65 29 63.6 45Q62.6 38.6 60.4 37.4L58.6 40.6L56.6 36.8L54.2 40.4L52 36.6L49.6 40.4L47.6 36.6L45.4 40.4L43.4 36.8L41.4 40.6L39.6 37.4Q37.4 38.6 36.4 45Z',HR(q))
    +L_('M42 30Q46.4 28.4 51 28.6M53 28.6Q57.6 29.4 60.4 32.4','#a8203a',.5,'opacity=".8"');
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 80Q38.8 74 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 80Q61.2 74 60.2 62Q59.4 52 60.4 44Z',HR(q))
    +L_('M37.6 48Q36.2 60 36 70M62.4 48Q63.8 60 64 70','#a8203a',.4,'opacity=".6"');
  /* une rose noire piquée dans les cheveux */
  s+=rose(37.2,37.4,2.6,'#1a040c','#c0203a');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  /* la poignée d'une dague par-dessus l'épaule */
  let s=L_('M74 72L82 50','#1a040c',2.2)+P('M79.6 52.6L85.6 50.6L85 49L79 51Z',AG(q))+C_(83.4,47.6,1.4,GM(q));
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',CL(q))+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',CR(q),.9);
  /* le haut col de velours : noir dehors, rouge dedans */
  s+=MI(P('M33.6 75Q26 62 28.4 48L39.6 59.6Q37 67 40 74Z',CR(q),'stroke="#14040a" stroke-width=".35"')+P('M33.6 75Q27.4 62 28.4 48L31.6 51.4Q30.4 63 35.8 74.4Z',CL(q))+L_('M28.6 48.4L39.4 59.8Q36.8 67 39.8 73.6',AG(q),.5));
  /* la robe de velours noir, laçage rouge */
  s+=P('M30 100L33.6 78Q40 72.4 50 72.4Q60 72.4 66.4 78L70 100Z',LT(q))+L_('M33.8 78.2Q40 72.8 50 72.8Q60 72.8 66.2 78.2',AG(q),.7)
    +P('M44.6 73Q50 86 55.4 73L53.6 100H46.4Z',CR(q),'opacity=".9"')+L_('M46.6 80L53.4 84M53.4 80L46.6 84M46.8 88L53.2 92M53.2 88L46.8 92M47 96L53 99','#ffd0d8',.35,'opacity=".8"');
  /* des roses sur l'épaule */
  s+=rose(22,76.6,2.8,CR(q),'#4a0010')+rose(16.6,82,2.2,'#1a040c','#c0203a')+rose(27,81,2,'#1a040c','#c0203a')+gem(q,21.4,88.4,1.2);
  return s}
/* les ailes de chauve-souris : membrane rouge sombre ; plus grandes en ultra II et III */
function batWings(q,u){const k=u>=2?1.16:1,ed=u>=3?'#ffd84a':'#ff4a5a';
  const w=`<g transform="translate(38 64) scale(${k}) translate(-38 -64)"><path d="M38 64Q22 38 2 30Q7 41 4 50Q11 48 15 55Q12 62 14 69Q21 64 27 71Q30 64 38 66Z" fill="${WG(q)}" stroke="${ed}" stroke-width=".6"/>${L_('M38 64L4 50M37 65L14 69M37 64L15 55M36 64Q20 42 2 30','#8a1a3a',.5)}${L_('M37.4 64Q22 40 2.6 30.6','#ff8a9a',.3,'opacity=".6"')}</g>`;
  return`<g opacity="${u>=3?.98:.95}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function cPortrait(u){const q='ncp'+u+'_';
  let s=pOpen(q,'Nyx, Comtesse Écarlate',defs(q,u));
  s+=rays(50,34,12,80,.05,'#ffd0c8')+bloodMoon(q,50,34,27,u);
  s+=castle(-2,78,.36,'#14040a',.9)+castle(76,80,.32,'#14040a',.85);
  s+=[[14,20],[88,14],[92,44],[8,48]].map(([x,y],k)=>STARP(x,y,.5+k%2*.3,'#ffd0c8')).join('')+bat(16,32,1.2)+bat(84,28,1)+bat(90,60,.9)+bat(10,62,.8)+(u>=2?bat(74,8,.9)+bat(26,10,.8):'');
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ff8a8a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=batWings(q,u)+hairBack(q)+bust(q,u)+face(q,u)+tiara(q,u);
  s+=[[12,74,1.4,30],[88,76,1.2,-40],[84,90,1,10]].map(([x,y,r,a])=>`<path transform="translate(${x} ${y}) rotate(${a})" d="M0 ${-r}Q${r1(r*.95)} ${r1(-r*.2)} 0 ${r}Q${r1(-r*.95)} ${r1(-r*.2)} 0 ${-r}Z" fill="#c0203a" opacity=".85"/>`).join('');
  if(u>=3)s+=halo(50,12.6,11,2.8);
  s+=frame('#ff4a5a');
  return s+pClose('Assassin',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function cBody(u,bare){const q='ncb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Nyx, Comtesse Écarlate',defs(q,u)+rad(q+'bb',[[0,'#ff8a8a',.36+u*.08],[.55,'#4a0a1e',.3],[1,'#070205',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${bloodMoon(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.035,'#ffd0c8')}${bloodMoon(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ff8a8a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=castle(-6,150,.95,'#12030a',.95)+castle(96,156,.9,'#12030a',.92)+castle(44,176,.5,'#1e0610',.7);
    s+=bat(20,40,1.9)+bat(140,56,1.7)+bat(30,120,1.4)+bat(136,110,1.5)+bat(112,22,1.2)+[[16,24],[146,30],[24,96],[140,90]].map(([x,y])=>STARP(x,y,.8,'#ffd0c8')).join('');
    /* deux chauves-souris qui volent autour de la lune */
    s+=[0,1].map(k=>`<g><animateMotion dur="${9+k*3}s" begin="${-k*4}s" repeatCount="indefinite" path="M80 ${30+k*8}m${46+k*8} 0a${46+k*8} ${20+k*6} 0 1 0 ${-(92+k*16)} 0a${46+k*8} ${20+k*6} 0 1 0 ${92+k*16} 0"/>${bat(0,0,1.5-k*.3,'#0a0204')}</g>`).join('')+`</g>`
      +footRing(80,212,50,10,.9,'#ff4a5a','#ffd0c8',(x,y)=>`M${x} ${r1(y-1)}A1 1 0 1 0 ${x} ${r1(y+1)}A.8 .9 0 1 1 ${x} ${r1(y-1)}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".45"');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${batWings(q,u)}</g>`;
  /* la grande cape noire doublée de rouge, ourlet déchiré */
  s+=P('M62 60Q44 110 36 206L46 199L52 208L61 199L70 208L80 201L90 208L99 199L108 208L114 199L124 206Q116 110 98 60Z',CR(q))
    +P('M62 60Q47 110 41 203L48 198L54 206L62 199L70 206L80 200L90 206L98 199L106 206L112 198L119 203Q113 110 98 60Z',CL(q))
    +L_('M61.6 61Q46.4 110 40.4 205.4','#ff6a7a',.8,'opacity=".5"')+L_('M98.4 61Q113.6 110 119.6 205.4','#ff6a7a',.6,'opacity=".35"');
  s+=HG(hairBack(q,1.3));
  /* jambes : bas sombres, bottes hautes à boucles d'argent */
  const leg=(x,f)=>{const tx=f?x+15:x-4,bx=f?x-1:x+11,o=f?1:-1;
    return P(`M${x} 124L${x+11} 124L${x+10.4} 160L${x+.6} 160Z`,LT(q))+P(`M${x-.6} 156L${x+11.6} 156L${x+11} 204L${x} 204Z`,'#16040c','stroke="#050102" stroke-width=".4"')
    +P(`M${x} 200L${x+11} 200L${x+11.2} 207Q${r1(x+5.5+o*2)} 210 ${tx} 209L${bx} 206Z`,'#16040c','stroke="#050102" stroke-width=".4"')+L_(`M${x-.4} 158L${x+11.4} 158`,CR(q),.9)+L_(`M${x} 176L${x+11} 176.6M${x} 186L${x+11} 186.6`,AG(q),.6)+P(`M${x+4} 174.4H${x+7}V178H${x+4}Z`,'none',`stroke="${AG(q)}" stroke-width=".5"`)};
  s+=leg(68,0)+leg(81,1);
  /* la robe de velours : corset lacé de rouge, jupe en pointes */
  s+=P('M63 112Q58 150 52 176L64 170L72 182L80 172L88 182L96 170L108 176Q102 150 97 112Z',LT(q))+L_('M52 176L64 170L72 182L80 172L88 182L96 170L108 176',CR(q),.9)+P('M70 118L80 168L90 118Z',CR(q),'opacity=".55"');
  s+=P('M63 64Q80 58.6 97 64L99 124Q80 130 61 124Z',LT(q))+L_('M66 66.4Q80 61.6 94 66.4',AG(q),.8)
    +P('M73 66Q80 88 87 66L84.4 124H75.6Z',CR(q))+L_('M75.4 74L84.6 79M84.6 74L75.4 79M75.8 86L84.2 91M84.2 86L75.8 91M76.2 98L83.8 103M83.8 98L76.2 103M76.6 110L83.4 115','#ffd0d8',.4,'opacity=".85"');
  s+=P('M61.6 116Q80 123 98.4 116L98.4 121.6Q80 128.6 61.6 121.6Z','#0e0206')+L_('M61.8 116.4Q80 123.4 98.2 116.4',AG(q),.6)+rose(80,119.6,2.4,CR(q),'#4a0010');
  /* le haut col */
  s+=MB(P('M66 66Q57 54 59 40L70 52Q68 58 70 64Z',CR(q),'stroke="#14040a" stroke-width=".35"')+P('M66 66Q58 54 59 40L62 43Q61.6 54 68 64Z',CL(q))+L_('M59.2 40.4L69.8 52.2Q67.8 58 69.8 63.6',AG(q),.5));
  s+=P('M66 58Q80 66 94 58L95.6 63Q80 71 64.4 63Z',CL(q))+L_('M64.6 62.8Q80 70.8 95.4 62.8',CR(q),.7);
  /* bras droit : la faux de la lune de sang */
  s+=P('M60 66Q52 80 50 100L57.6 101Q59.4 84 65 72Z',LT(q))+P('M50 100Q48.6 112 49.4 120L56.4 120.4Q57.6 111 57.6 101Z',SK(q))+P('M49.6 103Q49 110.6 49.5 117.4L56.7 117.8Q57.3 110.6 57.4 103.4Z','#16040c','stroke="#050102" stroke-width=".4"')+L_('M49.6 104.2Q53.6 105.2 57.4 104.6',CR(q),.9);
  s+=L_('M52.8 122L50 60','#1a040c',2)+`<g transform="translate(50 60)">${crescent(0,-12,14,MN(q),-140,'stroke="#6a0014" stroke-width=".5"',.66)}${C_(0,0,9,U(q,'gl'),'opacity=".4"')}</g>`+gem(q,50,61,1.2)+E_(52.8,122.4,3.8,3.4,SK(q));
  /* épaulière de roses et de velours */
  s+=P('M67.4 67.2Q61.4 64.4 55.4 67.2Q51.2 69.4 49.8 74.8Q54 77 58.2 75.6Q63.6 73.2 67.4 67.2Z','#1a040c','stroke="#050102" stroke-width=".4"')+L_('M50 74.6Q54 76.6 58.2 75.2Q63.4 72.8 67 67.6',CR(q),.8)
    +rose(60.6,66.8,2.6,CR(q),'#4a0010')+rose(54.6,70.4,1.9,'#1a040c','#c0203a');
  /* bras gauche : la dague de rubis tenue à l'envers */
  s+=P('M100 66Q110 80 112 98L104.6 100Q103 84 96 72Z',LT(q))+P('M104.6 100L112 98L117.6 116L111.4 118.6Z',SK(q))+P('M105.4 102.6L112.6 100.4L116.2 112.2L109.8 114.6Z','#16040c','stroke="#050102" stroke-width=".4"');
  s+=E_(115,118,4.4,4,SK(q))+P('M113.4 120.6H117.4V122.6H113.4Z',AG(q))+P('M113.8 122.6L118 122.6L116.6 152L115.8 152Z',CR(q),'stroke="#4a0010" stroke-width=".3"')+L_('M116.4 124L116.2 150','#ffb0b8',.35,'opacity=".8"');
  s+=HG(face(q,u)+tiara(q,u));
  if(u>=3)s+=halo(80,9.4,10,2.6);
  /* les pétales de rose qui tombent (une animation chacun ; image fixe : hors du cadre) */
  if(!bare)s+=[...Array(5+u)].map((_,k)=>{const x=r1(10+((k*.618+.21)%1)*140),d=r1(6.4+((k*.37+.2)%1)*4),r=[3.2,2.6,3.8][k%3];
    return`<g transform="translate(${x} -16)"><g opacity=".92"><animateMotion dur="${d}s" begin="${r1(-(k+.5)*d/(5+u))}s" repeatCount="indefinite" rotate="auto" path="M0 0q${k%2?16:-16} 130 ${k%2?4:-4} 262"/><path d="M0 ${-r}Q${r1(r*.95)} ${r1(-r*.2)} 0 ${r}Q${r1(-r*.95)} ${r1(-r*.2)} 0 ${-r}Z" fill="${k%2?'#c0203a':'#e02a44'}"/></g></g>`}).join('');
  s+=bStars(u,bare);
  return s+'</svg>'}
const C={};
SKX.art('ny_ecarlate',{p:u=>C['p'+u]||(C['p'+u]=cPortrait(u)),b:u=>C['b'+u]||(C['b'+u]=cBody(u,false))});
}catch(e){console.warn('nyx écarlate',e)}})();
