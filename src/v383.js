
/* ================= FORTUNA LA CROUPIÈRE : nouveau style graphique =================
   Même croupière : cheveux roux, haut-de-forme et cartes, monocle d'or, smoking et nœud papillon rouge, dés, roulette.
   Nouveau : visage détaillé (grain de beauté en cœur, boucles d'oreilles dés), smoking à revers de satin et épaulettes d'or,
   roulette du destin derrière la tête et derrière elle, cartes et jetons qui volent, râteau de croupière et dés en main. */
(function(){try{
const FOR=56;if(!HEROES[FOR]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register,footRing}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#fff0c8'],[.15,'#ffa070'],[.4,'#c8243a'],[.7,'#5a0a1e'],[1,'#1a0408']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#ffe0b0',.42],[1,'#ff8a5a',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'bk',[[0,u>=3?'#3a2a34':'#2e242c'],[.6,'#16101a'],[1,'#08040a']])
 +lin(q+'sa',[[0,'#5a4a58'],[.5,'#2a2030'],[1,'#120a14']],1,1)
 +lin(q+'rd',[[0,'#f04a50'],[.55,'#c01c30'],[1,'#6a0a18']])
 +lin(q+'sk',[[0,'#fae0cc'],[.55,'#f0c8ae'],[1,'#d4a286']],1,0)
 +lin(q+'hr',[[0,u>=3?'#ff8a5a':'#e8503a'],[.5,'#b8281e'],[1,'#6a1410']])
 +lin(q+'wt',[[0,'#ffffff'],[1,'#dcd6e0']])
 +rad(q+'gm',[[0,'#ffd0d0'],[.4,'#ff3a4a'],[1,'#7a0a14']],'38%','34%','70%');
const AU=q=>U(q,'au'),BK=q=>U(q,'bk'),SA=q=>U(q,'sa'),RD=q=>U(q,'rd'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),WT=q=>U(q,'wt'),GM=q=>U(q,'gm');
const SUIT={h:'M0 1.6Q-2.6 -.4 -2.6 -1.8Q-2.6 -3 -1.4 -3Q-.4 -3 0 -2Q.4 -3 1.4 -3Q2.6 -3 2.6 -1.8Q2.6 -.4 0 1.6Z',d:'M0 -3L2 -.6L0 1.8L-2 -.6Z',
  s:'M0 -3Q-2.8 -.8 -2.6 .4Q-2.4 1.6 -1 1.4Q-.4 1.3 -.3 .8L-.8 2.4H.8L.3 .8Q.4 1.3 1 1.4Q2.4 1.6 2.6 .4Q2.8 -.8 0 -3Z',c:'M0 -3.2A1.2 1.2 0 1 1 -.1 -.9A1.2 1.2 0 1 1 -1.1 1A1.2 1.2 0 1 1 1.1 1A1.2 1.2 0 1 1 .1 -.9A1.2 1.2 0 1 1 0 -3.2ZM-.6 .8L-.9 2.6H.9L.6 .8Z'};
const suit=(k,x,y,sc,c)=>k==='c'?`<g transform="translate(${x} ${y}) scale(${sc})" fill="${c}"><circle cx="0" cy="-1.5" r="1.25"/><circle cx="-1.35" cy=".5" r="1.25"/><circle cx="1.35" cy=".5" r="1.25"/><path d="M-.35 .2L-.9 2.6H.9L.35 .2Z"/></g>`:`<path d="${SUIT[k]}" transform="translate(${x} ${y}) scale(${sc})" fill="${c}"/>`;
/* une carte à jouer */
const card=(x,y,a,k,sc=1)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${sc})"><rect x="-4.4" y="-6.2" width="8.8" height="12.4" rx="1.2" fill="#fffaf0" stroke="#3a2a2a" stroke-width=".35"/><rect x="-3.6" y="-5.4" width="7.2" height="10.8" rx=".8" fill="none" stroke="#c8a04a" stroke-width=".25"/>${suit(k,0,0,1,k==='h'||k==='d'?'#d1263b':'#1a1418')}</g>`;
/* un dé */
const die=(x,y,a,s=1)=>`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><rect x="-2.6" y="-2.6" width="5.2" height="5.2" rx="1.1" fill="#fffaf2" stroke="#3a2a2a" stroke-width=".35"/>${[[-1.2,-1.2],[1.2,1.2],[0,0],[1.2,-1.2],[-1.2,1.2]].map(([a,b])=>`<circle cx="${a}" cy="${b}" r=".5" fill="#d1263b"/>`).join('')}</g>`;
/* un jeton de casino */
const chip=(x,y,r,c)=>C_(x,y,r,c,'stroke="#fff" stroke-width=".5" stroke-dasharray=".9 .9"')+C_(x,y,r1(r*.55),'none','stroke="#ffffff" stroke-width=".35"');
/* la roue de la roulette (cases rouges et noires, case verte, rayons d'or) */
function wheel(q,cx,cy,R,op=1){let rd='',bk='';const n=37,a0=-90;for(let k=0;k<n;k++){const a=(a0+k*360/n)*Math.PI/180,b=(a0+(k+1)*360/n)*Math.PI/180,r1o=R,r1i=R*.8;
  const d=`M${r1(cx+r1i*Math.cos(a))} ${r1(cy+r1i*Math.sin(a))}L${r1(cx+r1o*Math.cos(a))} ${r1(cy+r1o*Math.sin(a))}L${r1(cx+r1o*Math.cos(b))} ${r1(cy+r1o*Math.sin(b))}L${r1(cx+r1i*Math.cos(b))} ${r1(cy+r1i*Math.sin(b))}Z`;if(k===0)continue;if(k%2)rd+=d;else bk+=d}
  const a=a0*Math.PI/180,b=(a0+360/n)*Math.PI/180;const gd=`M${r1(cx+R*.8*Math.cos(a))} ${r1(cy+R*.8*Math.sin(a))}L${r1(cx+R*Math.cos(a))} ${r1(cy+R*Math.sin(a))}L${r1(cx+R*Math.cos(b))} ${r1(cy+R*Math.sin(b))}L${r1(cx+R*.8*Math.cos(b))} ${r1(cy+R*.8*Math.sin(b))}Z`;
  let s=`<g opacity="${op}">`+C_(cx,cy,r1(R*1.08),'#5a2a14',`stroke="${AU(q)}" stroke-width="${r1(R*.05)}"`)+`<path d="${rd}" fill="#c8203a"/><path d="${bk}" fill="#1a1014"/><path d="${gd}" fill="#1a8a4a"/>`
    +C_(cx,cy,R,'none',`stroke="#ffd84a" stroke-width="${r1(R*.016)}"`)+C_(cx,cy,r1(R*.8),'none',`stroke="#ffd84a" stroke-width="${r1(R*.016)}"`)+C_(cx,cy,r1(R*.62),'#6a3418',`stroke="#c8901a" stroke-width="${r1(R*.02)}"`);
  let sp='';for(let k=0;k<8;k++){const t=k*45*Math.PI/180;sp+=`M${r1(cx+R*.12*Math.cos(t))} ${r1(cy+R*.12*Math.sin(t))}L${r1(cx+R*.6*Math.cos(t))} ${r1(cy+R*.6*Math.sin(t))}`}
  return s+`<path d="${sp}" stroke="${AU(q)}" stroke-width="${r1(R*.03)}" stroke-linecap="round"/>`+C_(cx,cy,r1(R*.14),AU(q))+C_(cx,cy,r1(R*.06),'#fff6c8')+C_(r1(cx+R*.7),r1(cy-R*.2),r1(R*.035),'#ffffff')+'</g>'}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33 46Q30 28 41 22.4Q50 18.4 59 22.4Q70 28 67 46Q70 ${y(14)} 74 ${y(28)}Q76 ${y(40)} 71 ${y(52)}H29Q24 ${y(40)} 26 ${y(28)}Q30 ${y(14)} 33 46Z`,HR(q))
  +L_(`M36 52Q32 64 31 ${y(36)}M64 52Q68 64 69 ${y(36)}M40 58Q37 72 38 ${y(46)}`,'#6a1410',.7,'opacity=".55"')+L_(`M35 54Q32 66 32.6 ${y(32)}M65 54Q68 66 67.4 ${y(32)}`,'#ff9a7a',.5,'opacity=".55"')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#c08a70','opacity=".55"');
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#d09878','opacity=".4"');
  const io=u>=3?{ir:'#ffd84a',ir2:'#a8701a',glow:'#ffe08a'}:{ir:'#3ac88a',ir2:'#14704a'};
  s+=eye(44,Object.assign({lash:1,lid:'#2a1010'},io))+eye(56,Object.assign({lash:1,lid:'#2a1010'},io));
  s+=L_('M39.8 42Q43.4 39.6 47.4 41','#7a2018',1.1)+L_('M52.6 40.4Q56.6 38.8 60.4 41.6','#7a2018',1.1);
  s+=L_('M50.4 48.8L49.7 52.8Q50.4 53.6 51.6 53.1','#c08a70',.65);
  /* un sourire malicieux, lèvres rouges, grain de beauté en cœur */
  s+=P('M46 56.8Q48.4 56 50 56.8Q51.6 56 54.4 56.2Q52.8 59.6 50 60Q47.2 59.6 46 56.8Z','#c8203a')+L_('M46 56.8Q50 58.2 54.4 56.2','#8a1020',.55)+P('M47.6 58.8Q50 59.6 52.4 58.6Q50 59.2 47.6 58.8Z','#ff8a8a','opacity=".8"');
  s+=`<path d="${SUIT.h}" transform="translate(41.6 52.8) scale(.34)" fill="#c8203a"/>`;
  s+=MI(E_(41.4,54.4,3,1.4,'#ff7a7a','opacity=".22"'));
  /* boucles d'oreilles : de petits dés d'or */
  s+=L_('M37.4 52.4V55','#ffd84a',.4)+die(37.4,56.8,12,.42);
  /* cheveux roux : frange de côté et grande boucle sur l'épaule */
  s+=P('M36.4 45Q35 30 44 25.2Q52 21.8 59.8 25.6Q66.2 29.6 64.4 45Q62.4 37 57.2 33.6Q54.2 37.4 48.8 38.6Q52 35.4 52.4 32.6Q46.6 37.2 39.6 39Q37.2 41.4 36.4 45Z',HR(q))
    +L_('M44 27Q49 25.4 54 26.4M40 32Q44 28.6 49 28.4M55.4 28.6Q60 30 62.4 34.6','#ff9a7a',.5,'opacity=".85"');
  s+=P('M37 43Q32 54 34 64Q36 72 31 82Q28 88 31.6 95Q35.6 88 38.4 82Q41.6 73 40.2 63Q39 53 40 45Z',HR(q))+L_('M36.6 48Q34 58 36 66Q37.2 74 33 84','#ff9a7a',.45,'opacity=".7"')
    +P('M63.2 42Q66 52 65 62Q64 68 66.4 74Q61.2 70 60.2 62Q59.4 52 60.4 44Z',HR(q));
  /* le monocle d'or et sa chaînette */
  s+=C_(56.2,47,4.4,'#fff6c8','opacity=".18"')+C_(56.2,47,4.4,'none','stroke="#ffd84a" stroke-width=".9"')+C_(56.2,47,4.4,'none','stroke="#8a5a1a" stroke-width=".25"')+L_('M59.6 49.6Q63 56 61 64Q60 70 64 74','#ffd84a',.4,'stroke-dasharray=".6 .5"');
  return s}
/* le haut-de-forme penché, son ruban rouge, une carte glissée dedans */
function hat(q,u){return`<g transform="rotate(-9 54 26)">`+E_(54,26,16,3.6,BK(q),'stroke="#000" stroke-width=".3"')+P('M44.6 25.4L45.6 6.4Q54 4.4 62.4 6.4L63.4 25.4Q54 27.6 44.6 25.4Z',BK(q),'stroke="#000" stroke-width=".3"')
  +E_(54,6.6,8.4,1.6,'#2e242c')+L_('M47 8L47.8 23.6','#5a4a58',.8,'opacity=".7"')+P('M45.2 19.6Q54 21.6 62.8 19.6L63 24Q54 26 45 24Z',RD(q))+P('M51.6 19.8H56.4V24.4H51.6Z','none',`stroke="${AU(q)}" stroke-width=".7"`)
  +card(60.4,15,16,'h',.72)+(u>=3?C_(54,12,1.2,'#ffd84a')+STARP(54,12,.7,'#fff'):'')+E_(54,26,16,3.6,'none',`stroke="${AU(q)}" stroke-width=".45" opacity=".8"`)+'</g>'}
/* ---------- le buste ---------- */
function bust(q,u){
  /* l'éventail de cartes derrière l'épaule */
  let s=card(18,66,-32,'s',1.5)+card(23,62,-14,'h',1.5)+card(28.6,60.6,4,'d',1.5);
  s+=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',BK(q));
  /* chemise blanche, nœud papillon rouge, revers de satin bordés d'or */
  s+=P('M39.6 73.6Q50 77.4 60.4 73.6L56 100H44Z',WT(q))+L_('M50 80V100','#c8c0cc',.5)+C_(50,86,.7,'#2a2030')+C_(50,92,.7,'#2a2030')+C_(50,98,.7,'#2a2030');
  s+=MI(P('M39.6 73.6L45.6 86L41.6 100H30L33 82Z',SA(q))+L_('M39.8 74L45.4 86L41.6 99.6',AU(q),.6)+L_('M33.4 82L36 76','#8a7a88',.6,'opacity=".7"'));
  s+=P('M45.4 70.6Q47.6 69.2 50 71.6Q52.4 69.2 54.6 70.6Q55.4 72.6 54.6 74.6Q52.4 76 50 73.6Q47.6 76 45.4 74.6Q44.6 72.6 45.4 70.6Z',RD(q),'stroke="#6a0a18" stroke-width=".3"')+C_(50,72.6,1.1,'#a8102a');
  /* épaulettes d'or à franges */
  s+=MI(E_(22,76,9,3.6,AU(q),'stroke="#8a5a1a" stroke-width=".4" transform="rotate(-16 22 76)"')+L_('M14 79.6L13 85M16.4 80.4L15.6 86M19 81L18.4 86.6M21.6 81.2L21.2 86.8M24.2 81L24 86.6M26.8 80.2L26.8 85.8M29.2 79L29.6 84.4','#ffd84a',.7)+C_(22,76,1.4,GM(q)));
  /* la chaîne d'or et le jeton porte-bonheur */
  s+=L_('M64 74Q60 84 58 90',AU(q),.4,'stroke-dasharray=".6 .5"')+chip(57.4,91.6,2.4,'#d1263b');
  return s}
/* ---------- portrait ---------- */
function fPortrait(u){const q='fp'+u+'_';
  let s=pOpen(q,'Fortuna la Croupière',defs(q,u));
  s+=rays(50,34,12,80,.08,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+wheel(q,50,36,27,.55+u*.1);
  s+=card(10,22,-20,'s')+card(88,30,18,'d')+card(14,56,10,'h',.9)+die(84,12,20,1.2)+chip(90,52,3,'#1a8a4a')+chip(8,40,2.6,'#ffd84a')+card(76,8,-12,'c',.85);
  if(u>=1)s+=C_(50,36,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=`<g opacity="${u>=3?.95:.85}">${MI(card(22,46,-40,'h',2.2)+card(16,58,-58,'s',2.2)+card(14,72,-76,'d',2)+card(28,36,-22,'c',2.1))}</g>`;
  s+=hairBack(q)+bust(q,u)+face(q,u)+hat(q,u);
  if(u>=3)s+=halo(52,5.4,10,2.4);
  s+=frame('#ff8a6a');
  return s+pClose('Mage',u,[[16,40,2],[84,44,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function fBody(u,bare){const q='fb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Fortuna la Croupière',defs(q,u)+rad(q+'bb',[[0,'#ffb08a',.36+u*.08],[.55,'#8a1028',.28],[1,'#1a0408',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${wheel(q,80,96,56,.35)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.05,'#ffffff')}${C_(80,40,42+u*3,U(q,'gl'),'opacity=".7"')}${wheel(q,80,96,58,.85)}`;
    if(u>=1)s+=C_(80,96,66+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=card(16,40,-18,'s',1.6)+card(146,56,16,'h',1.6)+card(18,150,12,'d',1.4)+card(142,160,-14,'c',1.4)+chip(136,30,3.4,'#1a8a4a')+chip(26,120,3,'#ffd84a');
    s+=risers(['#ffd84a','#ff6a6a'],(c,k)=>k%2?suit(['h','d','s','c'][k%4],0,0,.7,c):`<circle r="1.3" fill="${c}"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffd84a','#ff6a6a',(x,y,k)=>`M${x} ${r1(y-1)}L${r1(x+.9)} ${y}L${x} ${r1(y+1)}L${r1(x-.9)} ${y}Z`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g opacity="${u>=3?.95:.88}">${MB(card(40,74,-40,'h',3.2)+card(30,92,-58,'s',3.2)+card(26,112,-76,'d',3)+card(50,60,-22,'c',3))}</g>`;
  s+=HG(hairBack(q,1.25));
  /* les basques de la queue-de-pie, doublées de rouge */
  s+=P('M64 110Q58 150 56 186L70 182L74 120Z',RD(q))+P('M96 110Q102 150 104 186L90 182L86 120Z',RD(q))+P('M62 110Q55 150 52 190L68 184L72 118Z',BK(q))+P('M98 110Q105 150 108 190L92 184L88 118Z',BK(q))
    +L_('M52.4 189.4L68 183.6M107.6 189.4L92 183.6',AU(q),.9);
  /* jambes : pantalon noir à bande rouge, bottines à talon */
  const leg=(x,f)=>{const o=f?1:-1,tx=f?x+15:x-4,bx=f?x-1:x+11;
    return P(`M${x} 124L${x+11} 124L${x+10} 200L${x+1} 200Z`,BK(q))+L_(`M${f?x+9.6:x+1.4} 126L${f?x+8.8:x+2.2} 198`,'#c01c30',1.1)+L_(`M${f?x+3:x+8} 130L${f?x+3.4:x+7.6} 194`,'#6a5a70',.6,'opacity=".7"')
    +P(`M${x} 196L${x+11} 196L${x+11.2} 206Q${r1(x+5.5+o*2)} 210 ${tx} 208.6L${bx} 205Z`,'#16101a','stroke="#000" stroke-width=".4"')+P(`M${f?x+1:x+9} 205L${f?x+2.6:x+7.4} 205L${f?x+2.2:x+7.8} 212L${f?x+1.2:x+8.8} 212Z`,'#16101a')+L_(`M${x} 197.4L${x+11} 197.6`,AU(q),.8)+P(`M${f?x+1:x+9} 209L${f?x+2.6:x+7.4} 209L${f?x+2.2:x+7.8} 212L${f?x+1.2:x+8.8} 212Z`,AU(q))};
  s+=leg(68,0)+leg(81,1);
  /* gilet rouge, chemise, veste de smoking */
  s+=P('M64 66Q80 60 96 66L98 116Q80 122 62 116Z',BK(q));
  s+=P('M70 66Q80 70 90 66L92 114Q80 119 68 114Z',RD(q))+L_('M80 70V117','#6a0a18',.6)+[78,88,98,108].map(y=>C_(r1(80+((y-78)*.02)),y,1,AU(q))).join('')+L_('M68.4 113.6Q80 118.6 91.6 113.6',AU(q),.6);
  s+=P('M73.6 63.6Q80 68.4 86.4 63.6L84 80Q80 84 76 80Z',WT(q));
  s+=P('M74.6 61.4Q77 60 80 62.4Q83 60 85.4 61.4Q86.2 63.4 85.4 65.4Q83 66.8 80 64.4Q77 66.8 74.6 65.4Q73.8 63.4 74.6 61.4Z',RD(q),'stroke="#6a0a18" stroke-width=".3"')+C_(80,63.4,1.2,'#a8102a');
  s+=MB(P('M70 64L76.6 80L71 112L64 110L63 70Z',SA(q))+L_('M70.4 64.4L76.4 80L70.8 111.6',AU(q),.6));
  s+=L_('M88 92Q92 98 90 104',AU(q),.4,'stroke-dasharray=".6 .5"')+chip(89.6,105.6,2.4,'#d1263b');
  /* épaulettes d'or à franges */
  s+=MB(E_(62,68,8,3.4,AU(q),'stroke="#8a5a1a" stroke-width=".4" transform="rotate(-24 62 68)"')+L_('M55.6 71.4L54.4 77M58 72.6L57 78.2M60.6 73.2L60 78.8M63.2 73L62.8 78.6M65.8 72.2L65.6 77.8M68.2 70.8L68.4 76.2','#ffd84a',.7)+C_(62,68,1.3,GM(q)));
  /* bras droit : les dés lancés au-dessus de la main gantée */
  s+=P('M58 72Q50 84 49 98L56.6 99.6Q58.4 88 64 78Z',BK(q))+P('M49 98Q47 92 44 86L50 82.4Q54 89 56.6 99.6Z',BK(q))+P('M44 86L50 82.4L50.8 84.4L45 88.2Z',WT(q))+E_(46,82,4,3.2,WT(q),'transform="rotate(-20 46 82)"');
  s+=`<g>${C_(44,68,8,U(q,'gl'),'opacity=".7"')}${die(40.6,66,18,1.5)}${die(48,62,-14,1.3)}<animateTransform attributeName="transform" type="translate" values="0 0;0 -2.4;0 0" dur="2.2s" repeatCount="indefinite"/></g>`;
  /* bras gauche : le râteau de croupière d'or */
  s+=P('M102 72Q110 84 111 98L103.4 99.6Q101.6 88 96 78Z',BK(q))+P('M103.4 99.6L111 98L116.6 114L110.4 116.6Z',BK(q))+P('M109.4 113L116 110.6L117 113.4L110.4 115.8Z',WT(q));
  s+=L_('M120 24L116 214',AU(q),2)+L_('M120.2 25L116.2 213','#fff6c8',.5,'opacity=".7"')+P('M111 20.4L129 22.4L128.6 25.4L110.6 23.4Z',AU(q),'stroke="#8a5a1a" stroke-width=".4"')+C_(120,23,1.6,GM(q))+C_(116,214,1.4,AU(q));
  s+=E_(115,117,4.6,4.2,WT(q))+L_('M111 114.6L118.6 115.2M110.8 117.4L118.8 118','#c8c0cc',.5);
  s+=HG(face(q,u)+hat(q,u));
  if(u>=3)s+=halo(82,2.6,9,2.2);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(FOR,fPortrait,fBody);
}catch(e){console.warn('fortuna art',e)}})();
