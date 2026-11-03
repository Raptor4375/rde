
/* ================= VALKYR LA WALKYRIE : nouveau style graphique =================
   Même héroïne : casque ailé, cheveux d'or, peintures de guerre bleues, armure d'or et d'argent, grandes ailes blanches, lance.
   Nouveau : visage détaillé, dégradés, manteau de fourrure, épaulières à lames, sceau runique, ciel d'orage, cercle de runes. */
(function(){try{
const VAL=61;if(!HEROES[VAL]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,star8,rays,frame,eye,sigilRing,footRing,rune,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#fff2cc'],[.15,'#ffd890'],[.4,'#7a8cc8'],[.7,'#2e3a6a'],[1,'#10142a']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#fff0b0',.42],[1,'#ffd84a',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'ar',[[0,u>=3?'#fffbea':'#ffffff'],[.4,u>=3?'#f2e6c4':'#dde3ee'],[1,u>=3?'#b89a52':'#8e98ae']])
 +lin(q+'rd',[[0,'#ee4a50'],[.55,'#b81c2a'],[1,'#640a14']])
 +lin(q+'sk',[[0,'#f8dcc4'],[.55,'#eec6a6'],[1,'#cf9c7c']],1,0)
 +lin(q+'hr',[[0,u>=3?'#fffbe0':'#fff0b0'],[.5,'#f0c850'],[1,'#b8801e']])
 +lin(q+'fu',[[0,'#ffffff'],[1,'#ddd6cc']])
 +rad(q+'gm',[[0,'#ffd0d0'],[.4,'#ff3a4a'],[1,'#7a0a14']],'38%','34%','70%');
const AU=q=>U(q,'au'),AR=q=>U(q,'ar'),RD=q=>U(q,'rd'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),FU=q=>U(q,'fu'),GM=q=>U(q,'gm');
const MI0=s=>s+`<g transform="scale(-1 1)">${s}</g>`;
/* la gemme rouge sertie d'or, entre deux petites ailes */
const gem=(q,x,y,r)=>`<g transform="translate(${x} ${y})">${MI0(P(`M${r1(-r*1.1)} ${r1(-r*.2)}Q${r1(-r*2.4)} ${r1(-r*1.4)} ${r1(-r*3.4)} ${r1(-r*.6)}Q${r1(-r*2.6)} ${r1(-r*.2)} ${r1(-r*3)} ${r1(r*.5)}Q${r1(-r*2)} ${r1(r*.2)} ${r1(-r*1.1)} ${r1(r*.5)}Z`,AU(q),'stroke="#8a5a1a" stroke-width=".25"'))}</g>`+C_(x,y,r1(r*1.25),AU(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
/* le sceau : anneau runique, et au sommet une pointe de lance ailée */
function sigil(q,cx,cy,R,u,op){op=op==null?.5+u*.12:op;let s=sigilRing(cx,cy,R,op,'#ffe08a','#fff2c0',36);
  let d='';for(let k=1;k<24;k++){if(k===12)continue;const a=(k*15-90)*Math.PI/180;d+=rune(r1(cx+R*.925*Math.cos(a)),r1(cy+R*.925*Math.sin(a)),k)}
  s+=`<path d="${d}" stroke="#ffe08a" stroke-width="${r1(R*.016)}" fill="none" opacity="${r1(op)}"/>`;
  const y=r1(cy-R*.94),k=R/28;
  s+=`<g transform="translate(${cx} ${y}) scale(${r1(k)})">${P('M0 -6L2.4 -1L0 3.4L-2.4 -1Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')}${MI0(P('M-1.6 1.6Q-5.4 -1.4 -8.6 .4Q-5.6 1.2 -6.4 3Q-3.8 2.2 -1.6 3.2Z','#ffffff','stroke="#c8a04a" stroke-width=".3"'))}</g>`;
  return s}
/* ciel d'orage : nuages et éclairs dorés */
function storm(op){return P('M0 24Q6 16 15 19Q20 9 32 14Q27 23 17 25Q8 29 0 28Z','#2a3456',`opacity="${op}"`)+P('M100 20Q94 13 86 16Q80 7 69 12Q74 21 84 23Q93 27 100 26Z','#2a3456',`opacity="${op}"`)
  +L_('M22 6L18 15L21.6 16.2L16.4 27','#ffe08a',.8,'opacity=".55"')+L_('M79 4L82.6 12.4L79.6 13.6L84 23','#ffe08a',.7,'opacity=".45"')}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q69 ${y(16)} 73 ${y(32)}Q75 ${y(44)} 71 ${y(54)}H29Q25 ${y(44)} 27 ${y(32)}Q31 ${y(16)} 33.4 46Z`,HR(q))
  +L_(`M36 52Q33 66 31 ${y(38)}M64 52Q67 66 69 ${y(38)}M40 60Q38 74 37 ${y(46)}M60 60Q62 74 63 ${y(46)}`,'#b8801e',.7,'opacity=".55"')+L_(`M35 56Q32.6 70 32 ${y(34)}M65 56Q67.4 70 68 ${y(34)}`,'#fffbe0',.5,'opacity=".6"')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#c08a70','opacity=".55"');
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 53 59.8 58.4Q55.6 63.8 50 64.4Q44.4 63.8 40.2 58.4Q37 53 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#d09878','opacity=".4"');
  const io=u>=3?{ir:'#ffd84a',ir2:'#a8701a',glow:'#ffe08a'}:{ir:'#5aa8ff',ir2:'#1a4aa8'};
  s+=eye(44,Object.assign({fierce:1,lash:1},io))+eye(56,Object.assign({fierce:1,lash:1},io));
  s+=MI(L_('M39.4 42.6Q43.4 40 48 41.2','#a8782a',1.45));
  s+=L_('M50.4 48.8L49.6 53Q50.4 53.8 51.6 53.3','#c08a70',.65);
  /* bouche : un sourire sûr d'elle */
  s+=P('M46.4 57Q50 58.4 53.6 56.8Q52.8 59.8 50 60.1Q47.2 59.8 46.4 57Z','#b8464a')+L_('M46.2 56.9Q50 58.2 53.8 56.6','#8a2a30',.6)+P('M47.8 59.2Q50 60 52.2 59.2Q50 59.8 47.8 59.2Z','#e88a8a','opacity=".7"');
  /* peintures de guerre bleues et la cicatrice du sourcil */
  s+=MI(L_('M39.6 51.4L45 50.4','#2a6aff',1)+L_('M40.4 53.6L44.8 52.8','#2a6aff',.75)+L_('M39.6 51.4L45 50.4','#bfe0ff',.3,'opacity=".7"'));
  s+=L_('M57.6 38.4L60.6 44.6','#b06a5a',.95)+L_('M57.8 38.6L60.4 44.4','#f0b8a8',.4);
  s+=MI(E_(41.4,54.6,3,1.4,'#ff7a7a','opacity=".18"'));
  /* mèches d'or sous le casque */
  s+=P('M36.6 44.6Q36.4 38.6 39.6 36.4L60.4 36.4Q63.6 38.6 63.4 44.6Q61 39.6 56.6 38.6Q53.6 41.6 48.4 42Q51 40 51.2 38.6Q45 41.6 39.8 41.4Q37.6 42.6 36.6 44.6Z',HR(q))
    +P('M36.8 42Q34 52 35 62Q36 70 33 78Q38.8 72 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 78Q61.2 72 60.2 62Q59.4 52 60.4 44Z',HR(q))
    +L_('M37.6 46Q36 56 36.6 64M62.4 46Q64 56 63.4 64M42 39Q46 38.2 49 39.4','#fffbe0',.45,'opacity=".8"');
  return s}
/* le casque ailé : dôme d'argent, galon et crête d'or, gemme rouge, deux ailes blanches */
function helm(q,u){const wing=MI(['-150,13','-168,11','-132,12','-115,9'].map((v,k)=>{const[a,l]=v.split(',').map(Number);return feather([35.6,31.6],a,l,3.4,k%2?'#f4f2ff':'#ffffff','#c8a04a',.35)}).join(''));
  let s=wing+P('M35.2 41Q34.4 22.4 50 20.4Q65.6 22.4 64.8 41Q60 34.6 50 34Q40 34.6 35.2 41Z',AR(q),'stroke="#5a6478" stroke-width=".4"')
    +L_('M38 34Q39 25 47 22.2','#ffffff',.8,'opacity=".8"')+L_('M35.6 40.4Q40.4 34.2 50 33.8Q59.6 34.2 64.4 40.4',AU(q),1.2)+L_('M36.4 37.2Q41 31.4 50 31Q59 31.4 63.6 37.2','#ffe9a0',.5,'stroke-dasharray=".1 1.8" opacity=".9"')
    +P('M48.8 20.8L51.2 20.8L51.8 33.6L48.2 33.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".25"')+gem(q,50,29.6,1.3);
  if(u>=3)s+=P('M41 22.6L43 16.6L45.2 21.4L47.6 14.6L50 20.4L52.4 14.6L54.8 21.4L57 16.6L59 22.6Q50 19.6 41 22.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(50,16.4,.9,'#ff5a5a');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q11 80 24 73L76 73Q89 80 92 100Z',RD(q))+L_('M14 99Q16 86 26 78M86 99Q84 86 74 78','#640a14',.8,'opacity=".6"')+L_('M9 99.4Q11.4 81.4 24.4 73.8M91 99.4Q88.6 81.4 75.6 73.8',AU(q),.75);
  s+=P('M27 100L30 83Q35 74.6 50 74Q65 74.6 70 83L73 100Z',AR(q),'stroke="#5a6478" stroke-width=".4"')+L_('M50 75V100','#8a96aa',.8)+L_('M33 100Q36 90 44 86M67 100Q64 90 56 86','#ffffff',.7,'opacity=".7"')
    +L_('M30.4 82.6Q35.4 75 50 74.4Q64.6 75 69.6 82.6',AU(q),.8)+L_('M36 96Q50 90 64 96',AU(q),.6,'opacity=".8"')+gem(q,50,88,2.1);
  /* manteau de fourrure blanche sur les épaules */
  s+=P('M31.6 72.6Q50 80.6 68.4 72.6L71 77.6Q66.6 80.6 62.6 79.6Q58.6 82.8 54.4 81.2Q50 83.6 45.6 81.2Q41.4 82.8 37.4 79.6Q33.4 80.6 29 77.6Z',FU(q),'stroke="#b8b0a4" stroke-width=".35"')
    +L_('M34.4 78Q35.6 76.4 37 77.6M40 80.2Q41.4 78.4 43 79.8M47 81.6Q48.4 79.8 50 81.2M53 81Q54.6 79.4 56 80.8M60 79.6Q61.4 78 63 79.4M65.4 77.6Q66.6 76.2 68 77.4','#c8c0b4',.4,'opacity=".9"');
  /* épaulières d'or à trois lames, gemmes rouges */
  const lame=(d,rim,hi)=>P(d,AU(q),'stroke="#8a5a1a" stroke-width=".45"')+L_(rim,'#fff2b0',.7,'opacity=".8"')+(hi?L_(hi,'#ffffff',.5,'opacity=".7"'):'');
  s+=MI(lame('M31.4 86.2Q23 83.4 13.8 87.6Q8.2 90.6 6 97.4Q11.6 99.6 17.4 97.6Q25 94.2 31.4 86.2Z','M6.3 97.2Q11.6 99.2 17.4 97.2Q24.8 93.8 31 86.6')
    +lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75','M10.6 77.6Q14.6 73.2 21.4 72.2')
    +C_(21.4,78,1.7,GM(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(11.4,80.6,.6,'#fff2b0')+C_(31.6,77.4,.6,'#fff2b0'));
  return s}
/* les ailes : blanches et or ; plus grandes et dorées en ultra II et III */
function wings(q,u){const R=[34,64],big=u>=2?1.12:1;
  return wingPair(R,[{f:[[-176,46],[-158,53],[-139,57],[-120,53],[-101,45]].map(([a,l])=>[a,l*big]),fill:['#ffffff','#f2f0ff'],edge:'#c8b07a',wd:6.4},
    {f:[[-166,31],[-147,35],[-127,34],[-108,28]].map(([a,l])=>[a,l*big]),fill:u>=2?'#ffe9a8':'#ffffff',edge:u>=2?'#e0a83a':'#d8d0ec',wd:5.6}],u>=3?.97:.9)}
/* la lance ailée, derrière l'épaule */
function spearP(q){return L_('M70 100L87 16','#7a5030',1.8)+L_('M70.4 99.6L87.2 16.6',AU(q),.4,'opacity=".7"')+`<g transform="translate(87.6 14) rotate(11)">${P('M0 -9L2.8 -1L0 4L-2.8 -1Z','#eef2fa','stroke="#5a6478" stroke-width=".35"')}${L_('M0 -8V3','#ffffff',.4)}${P('M-3 3.4H3V5.4H-3Z',AU(q))}${MI0(P('M-2.8 4Q-7 1 -10 3Q-7 4 -7.6 6Q-5 5 -2.8 6Z','#ffffff','stroke="#c8a04a" stroke-width=".3"'))}</g>`}
/* ---------- portrait ---------- */
function vPortrait(u){const q='vp'+u+'_';
  let s=pOpen(q,'Valkyr la Walkyrie',defs(q,u));
  s+=rays(50,34,12,80,.08,'#ffffff')+storm(.55)+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,28,u);
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=wings(q,u)+spearP(q)+hairBack(q)+bust(q,u)+face(q,u)+helm(q,u);
  if(u>=3)s+=halo(50,13.4,11,2.8);
  s+=frame('#8ac8ff');
  return s+pClose('Guerrier',u,[[16,40,2],[84,40,1.8],[20,62,1.3],[80,60,1.5]])}
/* ---------- corps entier ---------- */
function vBody(u,bare){const q='vb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Valkyr la Walkyrie',defs(q,u)+rad(q+'bb',[[0,'#ffe9b0',.36+u*.08],[.55,'#3a4a8a',.28],[1,'#10142a',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.05,'#ffffff')}<g transform="translate(0 0) scale(1.6)">${storm(.45)}</g>${C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#ffe08a','#ffffff'],(c,k)=>k%2?`<path d="M0 -2L1.2 1H-1.2Z" fill="${c}" opacity=".9"/>`:`<circle r="${(.9+(k%3)*.4).toFixed(1)}" fill="${c}" opacity=".9"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffd84a','#ff6a6a',rune)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${wings(q,u)}</g>`;
  /* cape rouge, ourlet d'or */
  s+=P('M62 62Q50 120 42 208Q61 214 80 212Q99 214 118 208Q110 120 98 62Z',RD(q))+P('M62 64Q53 120 47 204L53 206Q58 128 67 70Z','#640a14','opacity=".55"')+P('M98 64Q107 120 113 204L107 206Q102 128 93 70Z','#640a14','opacity=".55"')
    +L_('M42 208Q61 214 80 212Q99 214 118 208',AU(q),1.2)+L_('M43.4 202.6Q61 208.4 80 206.4Q99 208.4 116.6 202.6','#ffe08a',.6,'stroke-dasharray=".1 2.4" opacity=".9"');
  s+=HG(hairBack(q,1.3));
  /* jambes : grèves d'argent, genouillères d'or */
  const leg=P('M65.4 128L76.6 128L75.4 168L74.4 202L65.6 202L65 168Z',AR(q))+L_('M66.8 134L66.2 166M75 134L74.4 166','#8a96aa',.6)
    +E_(70,166,6,4.6,AR(q),'stroke="#7d899f" stroke-width=".5"')+L_('M64.2 167Q70 171 75.8 167',AU(q),.8)+C_(70,165.6,1.2,GM(q))
    +P('M63.4 199L75.2 199L75.8 208.6Q66 211.6 55.6 212.4Q57.2 205 63.4 199Z',AR(q),'stroke="#7d899f" stroke-width=".5"')+L_('M56.4 211.8Q66 211 75.4 208.4',AU(q),.8)+L_('M62 203.6Q68 202.6 75 203.2','#8a96aa',.5)+L_('M64 184L75 184',AU(q),.7);
  s+=MB(leg);
  /* jupe rouge fendue et tassettes d'or */
  s+=P('M61 114Q56 150 54 176L70 178L80 150L90 178L106 176Q104 150 99 114Z',RD(q))+L_('M54.4 175.4L70 177.4M90 177.4L105.6 175.4',AU(q),1)+L_('M70 177.6L80 150.4L90 177.6','#640a14',.8,'opacity=".7"');
  s+=P('M60 114Q80 121.6 100 114L102.4 134Q80 141.6 57.6 134Z',AU(q),'stroke="#8a5a1a" stroke-width=".5"')+L_('M58.8 124Q80 131 101.2 124','#8a5a1a',.6)+L_('M60.4 116.4Q80 123.6 99.6 116.4','#fff6c8',.6,'opacity=".8"')+L_('M69 118.6L67.6 137.4M80 121L80 139.8M91 118.6L92.4 137.4','#8a5a1a',.6)+[66,74,86,94].map(x=>C_(x,x<80?127+(x-66)/8:129-(x-86)/8,.8,'#fff2b0')).join('');
  /* plastron d'argent, filigrane d'or, gemme ailée */
  s+=P('M62 64Q80 58.6 98 64L99.6 96Q96.4 114 80 117Q63.6 114 60.4 96Z',AR(q),'stroke="#5a6478" stroke-width=".4"')+L_('M80 66V115','#8a96aa',.8)+L_('M63.4 70Q66 90 64 104','#ffffff',.9,'opacity=".7"')
    +L_('M64.6 76Q72 84 80 84Q88 84 95.4 76',AU(q),.8)+L_('M66 101Q80 106.6 94 101',AU(q),.7)+L_('M68 92Q74 88 80 92Q86 88 92 92','#8a96aa',.6)+gem(q,80,84,2.6);
  s+=P('M61.4 110.6Q80 118 98.6 110.6L98.6 116Q80 123.4 61.4 116Z','#5a3a24')+L_('M61.6 111Q80 118.4 98.4 111',AU(q),.6)+gem(q,80,115.6,1.8);
  /* fourrure blanche autour du cou */
  s+=P('M65.6 56.4Q80 64.4 94.4 56.4L97.6 62.6Q93.4 65.6 89.6 64.6Q86 67.6 82.4 66.2Q80 68.6 77.6 66.2Q74 67.6 70.4 64.6Q66.6 65.6 62.4 62.6Z',FU(q),'stroke="#b8b0a4" stroke-width=".35"')
    +L_('M66 62.6Q67 61.2 68.4 62.4M71.6 64.6Q72.8 63 74.2 64.2M78 66Q79.2 64.4 80.6 65.8M85 64.6Q86.2 63.2 87.6 64.4M90.6 62.8Q91.8 61.4 93 62.6','#c8c0b4',.4);
  /* bras droit : il tient la lance */
  s+=P('M58 70Q50 84 49 100L56.6 101.6Q58.6 87 64 76Z',AR(q),'stroke="#5a6478" stroke-width=".4"')+P('M49 100Q47.6 108 48.6 114L55.8 114.4Q56.8 108 56.6 101.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M48.4 104L56.6 104.6M48.6 110L56 110.4','#8a5a1a',.5);
  s+=L_('M51 214L53.4 10','#7a5030',2.4)+L_('M51.4 213L53.8 11',AU(q),.5,'opacity=".6"')+P('M51.2 150H55.4V153H51.2Z',AU(q))+P('M52.8 44H56.8V47H52.8Z',AU(q))
    +`<g transform="translate(53.6 8) rotate(1)">${P('M0 -10L3.4 -1L0 6L-3.4 -1Z','#eef2fa','stroke="#5a6478" stroke-width=".4"')}${L_('M0 -9V5','#ffffff',.5)}${P('M-3.6 5.4H3.6V7.8H-3.6Z',AU(q))}${MI0(P('M-3.4 6Q-9 2 -13 4.4Q-9 6 -9.8 8.4Q-6.4 7.2 -3.4 8.4Z','#ffffff','stroke="#c8a04a" stroke-width=".35"'))}</g>`;
  s+=E_(52.4,116.6,4.2,3.6,SK(q))+L_('M49.4 115.4L55.6 115.6M49.4 117.6L55.4 117.8','#c08a70',.45);
  /* bras gauche : la main sur la hanche */
  s+=P('M102 70Q110 84 110.4 96L103.4 98Q102.4 86 96 76Z',AR(q),'stroke="#5a6478" stroke-width=".4"')+P('M103.4 98L110.4 96Q108.6 106 101.6 113L97 109.6Q101.8 104 103.4 98Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+E_(98.6,111.8,4,3.4,SK(q));
  /* épaulières à lames */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#ffffff',.6,'opacity=".9"')+C_(60.6,69.6,1.4,GM(q),'stroke="#8a5a1a" stroke-width=".25"');
  s+=MB(pa);
  s+=HG(face(q,u)+helm(q,u));
  if(u>=3)s+=halo(80,9.4,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(VAL,vPortrait,vBody);
}catch(e){console.warn('valkyr art',e)}})();
