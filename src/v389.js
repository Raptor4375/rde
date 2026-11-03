
/* ================= DRAKHAR LE WYRM : nouveau style graphique, et son apparence « Drakhar des Cendres » =================
   Même dragon : tête de wyrm aux écailles rouges, grandes cornes, yeux de braise à pupille fendue, ailes de dragon, flammes, grande arme.
   Nouveau : tête de dragon détaillée et en colère (arcades froncées, gueule ouverte, crocs, feu au fond de la gorge),
   armure d'écailles d'obsidienne bordée d'or et cœur de braise, sceau aux griffes, queue de dragon, glaive de flammes.
   Torse en V (épaules larges, taille fine) : plus élancé, moins trapu.
   L'apparence « Drakhar des Cendres » (Pass Pro) est dessinée dans le même style : écailles d'obsidienne,
   veines de lave, cornes de charbon aux pointes de braise, grande hache de cendre ; ultra II « Couronne de Cendre »,
   ultra III « Inferno Ancestral ». Quand elle est équipée, elle remplace vraiment le dessin partout. */
(function(){try{
const DRK=65,VID=400,SKK='dk_cendres';if(!HEROES[DRK]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register,rune}=LK;
const defsBase=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#fff0c0'],[.15,'#ffa040'],[.4,'#d4301a'],[.7,'#5a0a08'],[1,'#180202']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#ffd8a0',.45],[1,'#ff6a1a',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'sc',[[0,u>=3?'#e8502e':'#c8342a'],[.55,'#8a1a16'],[1,'#4a0806']])
 +lin(q+'bl',[[0,'#ffcf7a'],[.55,'#e88a3a'],[1,'#a8501a']])
 +lin(q+'ob',[[0,'#3a1a1a'],[.55,'#1e0a0a'],[1,'#0a0202']])
 +lin(q+'hn',[[0,'#fffaf0'],[.55,'#e8d8b8'],[1,'#a8946a']],1,1)
 +lin(q+'mb',[[0,'#ffb04a'],[.55,'#e0501a'],[1,'#8a1a0a']])
 +rad(q+'ey',[[0,'#fff6c0'],[.5,'#ffc83a'],[1,'#e0700a']])
 +rad(q+'em',[[0,'#ffffff',1],[.3,'#ffd84a',.85],[1,'#ff4a0a',0]])
 +rad(q+'gm',[[0,'#fff0c0'],[.4,'#ff8a1a'],[1,'#8a1a04']],'38%','34%','70%');
/* « des Cendres » : obsidienne, cendre et braise */
const defsAsh=(q,u)=>rad(q+'bg',[[0,u>=3?'#ffd8a0':'#ff9a50'],[.15,'#c8401a'],[.4,'#5a1208'],[.7,'#1e0806'],[1,'#070202']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#fff0d0',.9],[.5,'#ff8a3a',.42],[1,'#ff4a0a',0]])
 +lin(q+'au',[[0,'#ffd890'],[.5,'#ff7a1a'],[1,'#a82e0a']],1,1)
 +lin(q+'sc',[[0,u>=3?'#5e5450':'#4c4440'],[.55,'#262020'],[1,'#0c0a0a']])
 +lin(q+'bl',[[0,'#6e625c'],[.55,'#4a403c'],[1,'#262020']])
 +lin(q+'ob',[[0,'#2a2422'],[.55,'#141010'],[1,'#060404']])
 +lin(q+'hn',[[0,'#7a706a'],[.55,'#3e3634'],[1,'#141010']],1,1)
 +lin(q+'mb',[[0,'#5e2a18'],[.55,'#2e1410'],[1,'#120606']])
 +rad(q+'ey',[[0,'#ffffff'],[.5,'#ffe08a'],[1,'#ff8a1a']])
 +rad(q+'em',[[0,'#ffffff',1],[.3,'#ffb04a',.85],[1,'#ff3a0a',0]])
 +rad(q+'gm',[[0,'#fff0c0'],[.4,'#ff6a1a'],[1,'#5a0e04']],'38%','34%','70%');
const TH={
 base:{nm:'Drakhar le Wyrm',defs:defsBase,ash:0,dk:'#4a0806',dk2:'#5a0a08',mo:'#2a0202',scl:'#ff8a5a',sclOp:.7,pl:'#a8501a',arm:'#8a2a1a',tas:'#5a2a1a',belt:'#2a0a0a',
   claw:'#e8d8b8',bone:'#ffcf7a',gs:'#8a5a1a',hs:'#6a5a3a',hr:'#8a7a5a',hh:'#ffffff',sig:'#ffd84a',sig2:'#ffe9a0',frm:'#ff8a2a',ray:'#fff6c0',p:['#fff0c0','#ff8a2a'],ring:['#ffd84a','#ff6a1a'],
   bb:['#ffb070','#8a1a10','#180202'],wed:u=>u>=2?'#ffd84a':'#5a0a08'},
 ash:{nm:'Drakhar des Cendres',defs:defsAsh,ash:1,dk:'#0a0606',dk2:'#1a1210',mo:'#1a0402',scl:'#ff6a1a',sclOp:.85,pl:'#ff6a1a',arm:'#ff5a14',tas:'#ff5a14',belt:'#120c0a',
   claw:'#8a807a',bone:'#ff8a4a',gs:'#3a2a24',hs:'#0a0808',hr:'#ff6a1a',hh:'#ff9a5a',sig:'#ff6a1a',sig2:'#ffb04a',frm:'#ff6a1a',ray:'#ff9a5a',p:['#c8bcb0','#ff6a1a'],ring:['#ff6a1a','#c8bcb0'],
   bb:['#ff7a2a','#3a0a04','#070202'],wed:u=>u>=2?'#ff8a2a':'#3a1a10'}};
let K=TH.base;
const AU=q=>U(q,'au'),SC=q=>U(q,'sc'),BL=q=>U(q,'bl'),OB=q=>U(q,'ob'),HN=q=>U(q,'hn'),MB_=q=>U(q,'mb'),EY=q=>U(q,'ey'),EM=q=>U(q,'em'),GM=q=>U(q,'gm');
const gem=(q,x,y,r)=>C_(x,y,r1(r*1.3),AU(q),`stroke="${K.gs}" stroke-width=".3"`)+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
/* des veines de lave (apparence des Cendres) : un trait de braise et son cœur clair */
const lava=(d,w=.7)=>L_(d,'#ff6a1a',w,'opacity=".95"')+L_(d,'#ffd84a',r1(w*.38),'opacity=".9"');
/* le sceau : anneau griffu et flamme au sommet */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=sigilRing(cx,cy,R,op,K.sig,K.sig2,36);
  let d='';for(let k=0;k<12;k++){const a=(k*30-75)*Math.PI/180,c=Math.cos(a),sn=Math.sin(a);d+=`M${r1(cx+R*1.02*c)} ${r1(cy+R*1.02*sn)}Q${r1(cx+R*1.2*c+R*.06*sn)} ${r1(cy+R*1.2*sn-R*.06*c)} ${r1(cx+R*1.26*c)} ${r1(cy+R*1.26*sn)}`}
  s+=L_(d,K.sig,r1(R*.03),`opacity="${r1(op*.8)}"`);
  if(K.ash){/* la couronne de cendre craquelée de braise */let c='';for(let k=0;k<8;k++){const a=(k*45-90+22.5)*Math.PI/180;c+=`M${r1(cx+R*.86*Math.cos(a))} ${r1(cy+R*.86*Math.sin(a))}L${r1(cx+R*.98*Math.cos(a+.05))} ${r1(cy+R*.98*Math.sin(a+.05))}`}s+=L_(c,'#ffb04a',r1(R*.03),`opacity="${r1(op)}"`)}
  const y=r1(cy-R*.93),k=r1(R/28);return s+`<g transform="translate(${cx} ${y}) scale(${k})">${P('M0 -6Q3.4 -2 2.4 1.4Q1.6 3.6 0 3.6Q-1.6 3.6 -2.4 1.4Q-3.4 -2 0 -6Z',AU(q),`stroke="${K.gs}" stroke-width=".3"`)}${P('M0 -2.6Q1.4 -.6 .9 1.2Q.4 2.2 0 2.2Q-.4 2.2 -.9 1.2Q-1.4 -.6 0 -2.6Z','#fff6c0')}</g>`}
/* les ailes de dragon : bras d'os et membrane */
function dWings(q,u){const big=u>=2?1.12:1,ed=K.wed(u);
  let w=`<path d="M36 62Q24 40 6 28Q8 36 4 42Q10 44 8 52Q14 52 14 60Q20 58 22 66Q28 62 34 68Z" fill="${MB_(q)}" stroke="${ed}" stroke-width=".7"/>${L_('M36 62Q24 40 6 28M30 58L4 42M28 60L8 52M28 62L14 60M30 64L22 66',K.dk,.9)}${L_('M36 62Q24 40 6 28',K.bone,.4,'opacity=".7"')}${P('M6 28L3 24L8 27Z',K.claw)}`;
  if(K.ash)w+=lava('M30 58L8 44M28 61L10 52M28 63L16 60',.45)+(u>=3?P('M4 42Q1 38 3 34Q5 38 7 40ZM8 52Q4 50 4 46Q7 49 10 50ZM14 60Q10 59 9.6 55Q12.4 58 15 58Z','#ff8a2a','opacity=".9"'):'');
  return`<g opacity="${u>=3?.98:.94}">${MI(`<g transform="translate(36 62) scale(${big}) translate(-36 -62)">${w}</g>`)}</g>`}
/* ---------- la tête de dragon (100×100) ---------- */
function head(q,u){
  /* cou écailleux et plaques ventrales */
  let s=P('M40 58Q38 68 36 80L64 80Q62 68 60 58Z',SC(q))+P('M45 60L55 60L56 80L44 80Z',BL(q))+L_('M44.6 64H55.4M44.4 68.4H55.6M44.2 72.8H55.8M44 77.2H56',K.pl,.6);
  /* collerettes épineuses */
  s+=MI(P('M37.4 44Q28 42 22.4 35Q25.6 44 23.6 51Q28.6 49.6 31.6 54.6Q31 49.4 36.6 50.4Z',MB_(q),`stroke="${K.dk2}" stroke-width=".4"`)+L_('M37 45L24 38M36.6 47L25 49M36.4 49.4L31 53',K.dk2,.5));
  /* les grandes cornes */
  s+=MI(P('M40.8 30Q34.6 20 31 6.4Q37.4 12.6 42.6 19.4Q44.6 23.4 45.6 27.6Z',HN(q),`stroke="${K.hs}" stroke-width=".4"`)+L_('M39 22L42.2 20.6M36.6 16L39.6 15M34.4 11L37 10.4',K.hr,.45)+L_('M38.8 24Q35.6 16 33 9',K.hh,.5,'opacity=".7"')
    +(K.ash?C_(31.6,7.4,1.7,EM(q),'opacity=".9"')+P('M31 6.4L32.6 9.4L33.8 8.2Z','#ffd84a'):''));
  /* crête centrale */
  s+=P('M48.4 26L50 19.6L51.6 26Z',HN(q))+P('M48.8 22L50 17L51.2 22Z',HN(q),'opacity=".9"');
  /* le crâne en écu, qui s'affine vers le museau */
  s+=P('M35 40Q35 25.6 50 24Q65 25.6 65 40Q65 49 63 55Q60.4 62 55.4 66.4Q52.8 68.6 50 68.6Q47.2 68.6 44.6 66.4Q39.6 62 37 55Q35 49 35 40Z',SC(q),`stroke="${K.dk}" stroke-width=".5"`)
    +MI(P('M37.2 51.4L32.2 52.6L37 54.8Z',HN(q),`stroke="${K.hs}" stroke-width=".25"`)+P('M38.6 56.8L34.2 59.2L39.4 59.4Z',HN(q),`stroke="${K.hs}" stroke-width=".25"`));
  s+=P('M58.4 34Q63 40 61.8 50Q60 58 54 64Q59 54 59.4 46Q59.6 40 58.4 34Z',K.dk,'opacity=".35"');
  /* rangées d'écailles */
  let sc='';for(let r=0;r<4;r++){const y=29+r*3.6,n=5-Math.floor(r/2);for(let k=0;k<n;k++){const x=50+(k-(n-1)/2)*4.4;sc+=`M${r1(x-2)} ${r1(y)}Q${r1(x)} ${r1(y+2)} ${r1(x+2)} ${r1(y)}`}}
  s+=L_(sc,K.scl,.4,`opacity="${K.sclOp}"`);
  /* l'obsidienne fendue de lave */
  if(K.ash)s+=lava('M43.6 27.4L45.4 31L43.8 34.4M56.4 27.4L54.6 31.4L56.6 35M61.6 42L59.6 46.4L61 50.6M38.4 42L40.4 46.4L39 50.6',.55);
  /* arcades sourcilières froncées en V et yeux de braise plissés de colère */
  s+=MI(P('M35.4 38.4Q42 39.2 49.2 44L48.4 46.8Q42 42.8 36.2 42.6Z',K.dk2,`stroke="${K.mo}" stroke-width=".3"`)+L_('M35.8 38.6Q42.2 39.4 48.8 44',K.scl,.45,'opacity=".8"'));
  const ec=u>=3?'#ffffff':null;
  s+=MI(C_(43.2,46.6,4.4,EM(q),`opacity="${K.ash?.6:.45}"`)+`<path d="M38.4 44.2L47.6 47.4Q43.4 50.4 38.4 44.2Z" fill="${ec||EY(q)}"/>`+E_(43.6,46.9,.55,1.6,'#1a0202','transform="rotate(-14 43.6 46.9)"')+C_(41.6,45.6,.36,'#ffffff')+L_('M38.2 44L47.8 47.4',K.mo,.9));
  /* le museau plissé, naseaux dilatés où rougeoient des braises */
  s+=L_('M50 47V58',K.scl,.5,'opacity=".6"')+MI(L_('M45.2 53Q47 54 46.6 56M44.2 55Q45.8 55.8 45.6 57.6',K.dk,.55));
  s+=MI(P('M45.8 58.8Q47.2 57.2 48.8 58.4Q48 60.2 45.8 58.8Z',K.mo)+C_(47.2,58.6,1.4,EM(q),'opacity=".4"'));
  /* la gueule ouverte qui gronde : crocs et feu au fond de la gorge */
  s+=P('M40.8 61.4Q45.6 63.6 50 63.8Q54.4 63.6 59.2 61.4Q58 66.8 50 67.6Q42 66.8 40.8 61.4Z',K.mo)+E_(50,65.2,5.4,1.7,EM(q),'opacity=".95"')+E_(50,65.4,2.6,.8,'#fff6c0','opacity=".8"');
  s+=MI(P('M42.6 62.2L43.6 65.6L44.8 62.8Z','#fffaf0',`stroke="${K.hs}" stroke-width=".2"`)+P('M45.6 63.2L46.4 65.4L47.4 63.6Z','#fffaf0',`stroke="${K.hs}" stroke-width=".2"`)+P('M44 66.6L44.8 64.6L45.8 66.8Z','#fffaf0',`stroke="${K.hs}" stroke-width=".2"`));
  s+=L_('M40.4 61.2Q45.6 63.6 50 63.8Q54.4 63.6 59.6 61.2',K.mo,.9);
  /* couronnes d'ultra : d'or (Drakhar) ; de cendre dès l'ultra II (« Couronne de Cendre ») */
  if(K.ash){if(u>=2)s+=P('M40.6 27L42.6 18.6L45.6 24.4L48 15.6L50 22.6L52 15.6L54.4 24.4L57.4 18.6L59.4 27Q50 24.4 40.6 27Z','#141010','stroke="#ff6a1a" stroke-width=".45"')+lava('M44.2 23.6L45.4 25.6M50 20.6V24.2M55.8 23.6L54.6 25.6',.4)+gem(q,50,23.2,1.05)}
  else if(u>=3)s+=P('M41 26L43.4 19.6L46 24.6L48.4 17.4L50 22.8L51.6 17.4L54 24.6L56.6 19.6L59 26Q50 23.6 41 26Z',AU(q),`stroke="${K.gs}" stroke-width=".3"`)+gem(q,50,22,1);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',OB(q))+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8);
  /* plastron d'écailles d'obsidienne et cœur de braise */
  s+=P('M30 100L33.6 80Q40 74 50 74Q60 74 66.4 80L70 100Z',OB(q))+L_('M33.8 80.2Q40 74.4 50 74.4Q60 74.4 66.2 80.2',AU(q),.8);
  let sc='';for(let r=0;r<4;r++){const y=82+r*4.4;for(let k=0;k<6;k++){const x=37+k*5.2+(r%2)*2.6;if(x>64)continue;sc+=`M${r1(x-2.4)} ${r1(y)}Q${r1(x)} ${r1(y+2.6)} ${r1(x+2.4)} ${r1(y)}`}}
  s+=L_(sc,K.arm,.6,'opacity=".9"')+(K.ash?lava('M42 80L44 86L41.6 92M58 80L56 86L58.4 92',.5):'')+C_(50,88,8,EM(q),`opacity="${.4+u*.1}"`)+gem(q,50,88,2.6);
  /* épaulières à pointes */
  const lame=(d,rim)=>P(d,OB(q),'stroke="#000" stroke-width=".4"')+L_(rim,AU(q),.8);
  s+=MI(lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75')
    +P('M14 72.6L9.6 64L17.6 70.6Z',HN(q))+P('M22 70.6L20.4 61.6L26 69.6Z',HN(q))+P('M30 71.4L30.6 63.6L33.6 71.4Z',HN(q))+gem(q,21.4,78,1.4));
  return s}
/* ---------- portrait ---------- */
function dPortrait(u){const q=(K.ash?'xp':'dp')+u+'_';
  let s=pOpen(q,K.nm,K.defs(q,u));
  s+=rays(50,34,14,80,.08,K.ray)+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,27,u);
  s+=[[12,24,.9],[86,18,.8],[90,46,.7],[10,52,.6],[70,8,.6],[28,10,.5]].map(([x,y,r],k)=>C_(x,y,r1(r*3.4),EM(q),`opacity="${K.ash&&k%2?.25:.55}"`)+C_(x,y,r,K.p[k%2])).join('');
  s+=P('M0 100L0 84Q6 76 10 82Q14 70 20 80Q24 74 28 84L28 100Z','#ff6a1a','opacity=".35"')+P('M100 100L100 84Q94 76 90 82Q86 70 80 80Q76 74 72 84L72 100Z','#ff6a1a','opacity=".35"');
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="${K.sig}" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=dWings(q,u)+bust(q,u)+head(q,u);
  if(u>=3)s+=K.ash?E_(50,12.4,11,2.8,'none','stroke="#ff6a1a" stroke-width="1.6"')+E_(50,12.4,11,2.8,'none','stroke="#ffd84a" stroke-width=".5"'):halo(50,12.4,11,2.8);
  s+=frame(K.frm);
  return s+pClose('Guerrier',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function dBody(u,bare){const q=(K.ash?'xb':'db')+u+(bare?'s':'')+'_';
  let s=bOpen(q,K.nm,K.defs(q,u)+rad(q+'bb',[[0,K.bb[0],.38+u*.08],[.55,K.bb[1],.3],[1,K.bb[2],0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.06,K.ray)}`;
    /* des Cendres : le crâne du dragon ancien, en cendre, derrière lui */
    if(K.ash)s+=`<g opacity="${r1(.3+u*.08)}">${P('M8 92Q18 52 56 46Q80 30 104 46Q142 52 152 92Q132 80 118 84Q110 104 80 108Q50 104 42 84Q28 80 8 92Z','#1a0806','stroke="#5a1a0a" stroke-width="1.2"')}${P('M54 66Q62 60 70 66Q62 70 54 66ZM106 66Q98 60 90 66Q98 70 106 66Z','#ff6a1a')}</g>`;
    s+=`${C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none',`stroke="${K.sig}" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"`);
    s+=risers(K.ring)+`</g>`+footRing(80,212,50,10,.9,K.ring[0],K.ring[1],rune)}
  s+=E_(80,219,40,6,'#000','opacity=".45"');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${dWings(q,u)}</g>`;
  /* la queue de dragon qui s'enroule au sol */
  s+=P('M92 168Q112 178 122 196Q130 210 146 212Q138 216 126 212Q112 206 104 190Q98 180 88 176Z',SC(q),`stroke="${K.dk}" stroke-width=".5"`)+L_('M94 172Q110 182 118 196Q126 208 140 211',K.scl,.5,'opacity=".6"')
    +[[106,180],[116,190],[124,202],[134,210]].map(([x,y])=>P(`M${x} ${y}L${x+2} ${y-5}L${x+4} ${y+1}Z`,HN(q))).join('')+(K.ash?lava('M100 184L106 190L104 196M120 202L126 206',.5):'');
  /* jambes écailleuses et pieds griffus (un peu plus fines) */
  const leg=P('M66 126L77 126L75.8 170L74.6 200L66.2 200L65.8 170Z',SC(q),`stroke="${K.dk}" stroke-width=".4"`)+L_('M66.6 140Q70.6 142 74.6 140M66.6 152Q70.6 154 74.6 152M66.6 164Q70.6 166 74.6 164',K.scl,.45,'opacity=".7"')
    +(K.ash?lava('M70 144L72 150L69.6 156M71 176L73 182L70.6 188',.5):'')
    +E_(70.6,170,5.6,4.4,OB(q),'stroke="#000" stroke-width=".4"')+L_('M65.2 171Q70.6 175 76 171',AU(q),.8)
    +P('M64.6 198L76.4 198L77.2 206L60.6 210Q60.6 203 64.6 198Z',SC(q),`stroke="${K.dk}" stroke-width=".4"`)+P('M60.6 210L57.6 213L62.6 210.4ZM64.6 209.4L63.2 213L67 209Z','#fffaf0');
  s+=MB(leg);
  /* tassettes d'obsidienne (plus étroites) */
  s+=P('M63.6 115Q80 121 96.4 115L99.4 140Q80 146 60.6 140Z',OB(q),'stroke="#000" stroke-width=".5"')+L_('M61 139.6Q80 145.6 99 139.6',AU(q),1)+L_('M70.4 119.6L68.8 142.6M80 121.6V145M89.6 119.6L91.2 142.6',K.tas,.6);
  /* torse en V : épaules larges, taille fine ; plaques ventrales et armure d'écailles bordée */
  const ex=y=>y<=96?61.6+(y-64)/32*1.4:63+(y-96)/20*4.4;
  s+=P('M61.6 64Q80 58.6 98.4 64L97 96Q95.4 110 92.6 116L67.4 116Q64.6 110 63 96Z',OB(q),'stroke="#000" stroke-width=".4"');
  s+=P('M72.6 66L87.4 66L88.4 113.6Q80 116.6 71.6 113.6Z',BL(q))+L_('M72.4 74H87.6M72.2 82H87.8M72 90H88M71.8 98H88.2M71.8 106H88.2',K.pl,.6);
  let sc='';for(let r=0;r<6;r++){const y=70+r*7,l=r1(ex(y)+1.4),rr=r1(160-ex(y)-1.4);sc+=`M${l} ${y}Q${r1((l+71.4)/2)} ${y+3} 71.4 ${y}M88.6 ${y}Q${r1((rr+88.6)/2)} ${y+3} ${rr} ${y}`}
  s+=L_(sc,K.arm,.6)+L_('M64.6 76Q80 70 95.4 76',AU(q),.8)+(K.ash?lava('M70 76L72.6 86L68.6 96L71.6 108M90 76L87.4 86L91.4 96L88.4 108M80 88V104',.7):'')+C_(80,82,9,EM(q),`opacity="${.45+u*.1}"`)+gem(q,80,82,3.2);
  s+=P('M65.6 111.6Q80 117.2 94.4 111.6L94.6 117Q80 122.6 65.4 117Z',K.belt)+L_('M65.8 112Q80 117.6 94.2 112',AU(q),.7)+gem(q,80,116.4,1.8);
  /* bras droit : poing griffu, une flamme */
  s+=P('M59 70Q51 84 50 100L57.6 101.6Q59.6 87 65 76Z',SC(q),`stroke="${K.dk}" stroke-width=".4"`)+P('M50 100Q48.6 108 49.6 114L56.8 114.4Q57.8 108 57.6 101.6Z',OB(q))+L_('M49.4 104L57.6 104.6',AU(q),.8)
    +E_(53.4,117,4.2,3.6,SC(q),`stroke="${K.dk}" stroke-width=".4"`)+P('M49.8 119L48.8 122.4L51.2 120Z M53 120.4L52.6 124L54.6 120.6Z M56.4 119.8L57 123.2L58 119.4Z','#fffaf0');
  s+=`<g>${C_(53,108,10,EM(q),'opacity=".7"')}${P('M53 96Q57 102 55.6 106Q54.4 109 53 109Q51.6 109 50.4 106Q49 102 53 96Z','#ffb030')}${P('M53 100Q54.8 103.4 54 105.6Q53.4 107 53 107Q52.6 107 52 105.6Q51.2 103.4 53 100Z','#fff6c0')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.4;0 0" dur="1.4s" repeatCount="indefinite"/></g>`;
  /* bras gauche */
  s+=P('M101 70Q109 84 110 100L102.4 101.6Q100.4 87 95 76Z',SC(q),`stroke="${K.dk}" stroke-width=".4"`)+P('M102.4 101.6L110 100L115.6 114L109.4 116.6Z',OB(q));
  if(K.ash){/* la grande hache de cendre, au tranchant de lave */
    s+=L_('M121 22L116 214','#120c0a',2.8)+L_('M121.2 23L116.2 213','#3a2a24',.6)+[60,96,132,168].map(y=>P(`M${r1(121-(y-22)/192*5-1.6)} ${y}h3.4v2.2h-3.4z`,'#ff6a1a','opacity=".85"')).join('');
    s+=C_(140,30,15,EM(q),'opacity=".3"')+P('M121.2 15Q130 10.6 138 6.6Q154 13.6 156 30Q154.4 44.4 142.4 53.4Q131.4 42.4 121 36.4Z','#1a1210','stroke="#3a2a24" stroke-width=".6" stroke-linejoin="round"')
      +L_('M138 6.6Q154 13.6 156 30Q154.4 44.4 142.4 53.4','#ff6a1a',1.6)+L_('M138.6 8Q153 14.6 154.8 30Q153.4 43.4 142.6 51.8','#ffd84a',.55,'opacity=".95"')
      +L_('M124 18Q131 15 137 12.4M124 33.6Q132 39.6 139 47.6','#3a2a24',.5)+lava('M134 20L139 26L135.6 32L140 38',.6)+C_(130,26,2.4,'none','stroke="#ff6a1a" stroke-width=".7"')
      +P('M120.8 20L110.6 16.6L113.2 23.4L110.4 30L120.4 30.6Z','#1a1210','stroke="#ff6a1a" stroke-width=".8" stroke-linejoin="round"')+C_(121,25.6,2.2,GM(q));
  }else{/* le glaive de flammes */
    s+=L_('M122 30L116 214','#2a0a0a',2.6)+L_('M122.2 31L116.2 213',AU(q),.5,'opacity=".6"')+P('M121.6 34H124.6V37H121.6Z',AU(q))+P('M117 150H120V153H117Z',AU(q));
    s+=P('M123 34Q140 26 146 8Q138 14 132 12Q138 6 136 -2Q128 10 120 14Q118 24 123 34Z',BL(q),'stroke="#8a1a0a" stroke-width=".5"')+P('M123.6 30Q134 24 138 14Q132 18 127 18Q130 12 129 7Q124 15 121.6 18Q121 24 123.6 30Z','#fff0c0','opacity=".8"')+C_(124,26,10,EM(q),'opacity=".5"')}
  s+=E_(114,117,4.6,4.2,SC(q),`stroke="${K.dk}" stroke-width=".4"`);
  /* épaulières à pointes (un peu plus petites) */
  const pa=P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',OB(q),'stroke="#000" stroke-width=".4"')+L_('M48.4 82.2Q54.4 82.4 60.6 80Q66.8 77.4 71.8 73.4',AU(q),.8)
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',OB(q),'stroke="#000" stroke-width=".4"')+L_('M51.2 74.2Q56.6 75.2 62.6 73.4Q68.8 71.2 74 67.4',AU(q),.8)
    +P('M54 66L50 58L57.6 64.4Z',HN(q))+P('M61 63.4L60.4 55L64.6 63Z',HN(q))+gem(q,60.6,69.6,1.3);
  s+=MB(`<g transform="translate(63 72) scale(.9) translate(-63 -72)">${pa}</g>`);
  s+=HG(head(q,u));
  if(u>=3)s+=K.ash?E_(80,9,10,2.6,'none','stroke="#ff6a1a" stroke-width="1.6"')+E_(80,9,10,2.6,'none','stroke="#ffd84a" stroke-width=".5"'):halo(80,9,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
/* les deux dessins : Drakhar et son apparence des Cendres */
const drawAs=(t,f)=>(...a)=>{const k0=K;K=TH[t];try{return f(...a)}finally{K=k0}};
const R0=register(DRK,drawAs('base',dPortrait),drawAs('base',dBody));
const SC0={},sp=u=>{u=Math.max(0,Math.min(3,u|0));return SC0['p'+u]||(SC0['p'+u]=drawAs('ash',dPortrait)(u))},sb=(u,bare)=>{u=Math.max(0,Math.min(3,u|0));const k='b'+u+(bare?'s':'');return SC0[k]||(SC0[k]=drawAs('ash',dBody)(u,!!bare))};
const worn=()=>{try{return typeof skEq==='function'&&skEq(DRK)===SKK}catch(e){return false}};
try{Object.defineProperty(PCACHE,DRK,{get:()=>worn()?sp(0):R0.p(0),set(){},configurable:true,enumerable:false})}catch(e){}
try{Object.defineProperty(PCACHE,VID,{get:()=>sp(0),set(){},configurable:true,enumerable:false})}catch(e){}
{const pu=portraitU;portraitU=function(h,u){if(h&&(h.i===VID||(h.i===DRK&&worn())))return sp(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&(h.i===VID||(h.i===DRK&&worn())))return sb(u);return hb.apply(this,arguments)}}
/* changer d'apparence vide aussi les images déjà prêtes (combat, cartes) */
const clr=()=>{try{for(const C of [typeof UPI!=='undefined'?UPI:null,typeof PIMG!=='undefined'?PIMG:null,window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)for(const k of Object.keys(C))if(/(^|[^0-9])(65|400)(_|$)/.test(k))delete C[k];if(typeof BTIC!=='undefined')for(const k of [...BTIC.keys()])if(/^(65|400)_/.test(k))BTIC.delete(k)}catch(e){}};
clr();
try{if(typeof skRefresh==='function'){const sr=skRefresh;skRefresh=function(hid){const r=sr.apply(this,arguments);if(hid===DRK)clr();return r}}}catch(e){}
}catch(e){console.warn('drakhar art',e)}})();
