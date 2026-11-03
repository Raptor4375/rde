
/* ================= DRAKHAR LE WYRM : nouveau style graphique =================
   Même dragon : tête de wyrm aux écailles rouges, grandes cornes, yeux de braise à pupille fendue, ailes de dragon, flammes, grande arme.
   Nouveau : tête de dragon détaillée (arcades, collerettes, crocs, rangées d'écailles), armure d'écailles d'obsidienne
   bordée d'or et cœur de braise, sceau aux griffes, queue de dragon, glaive de flammes. */
(function(){try{
const DRK=65;if(!HEROES[DRK]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register,rune}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#fff0c0'],[.15,'#ffa040'],[.4,'#d4301a'],[.7,'#5a0a08'],[1,'#180202']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#ffd8a0',.45],[1,'#ff6a1a',0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'sc',[[0,u>=3?'#e8502e':'#c8342a'],[.55,'#8a1a16'],[1,'#4a0806']])
 +lin(q+'sd',[[0,'#d84a34'],[1,'#7a1410']],1,0)
 +lin(q+'bl',[[0,'#ffcf7a'],[.55,'#e88a3a'],[1,'#a8501a']])
 +lin(q+'ob',[[0,'#3a1a1a'],[.55,'#1e0a0a'],[1,'#0a0202']])
 +lin(q+'hn',[[0,'#fffaf0'],[.55,'#e8d8b8'],[1,'#a8946a']],1,1)
 +lin(q+'mb',[[0,'#ffb04a'],[.55,'#e0501a'],[1,'#8a1a0a']])
 +rad(q+'ey',[[0,'#fff6c0'],[.5,'#ffc83a'],[1,'#e0700a']])
 +rad(q+'em',[[0,'#ffffff',1],[.3,'#ffd84a',.85],[1,'#ff4a0a',0]])
 +rad(q+'gm',[[0,'#fff0c0'],[.4,'#ff8a1a'],[1,'#8a1a04']],'38%','34%','70%');
const AU=q=>U(q,'au'),SC=q=>U(q,'sc'),SD=q=>U(q,'sd'),BL=q=>U(q,'bl'),OB=q=>U(q,'ob'),HN=q=>U(q,'hn'),MB_=q=>U(q,'mb'),EY=q=>U(q,'ey'),EM=q=>U(q,'em'),GM=q=>U(q,'gm');
const gem=(q,x,y,r)=>C_(x,y,r1(r*1.3),AU(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
/* le sceau : anneau griffu et flamme d'or au sommet */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=sigilRing(cx,cy,R,op,'#ffd84a','#ffe9a0',36);
  let d='';for(let k=0;k<12;k++){const a=(k*30-75)*Math.PI/180,c=Math.cos(a),sn=Math.sin(a);d+=`M${r1(cx+R*1.02*c)} ${r1(cy+R*1.02*sn)}Q${r1(cx+R*1.2*c+R*.06*sn)} ${r1(cy+R*1.2*sn-R*.06*c)} ${r1(cx+R*1.26*c)} ${r1(cy+R*1.26*sn)}`}
  s+=L_(d,'#ffd84a',r1(R*.03),`opacity="${r1(op*.8)}"`);
  const y=r1(cy-R*.93),k=r1(R/28);return s+`<g transform="translate(${cx} ${y}) scale(${k})">${P('M0 -6Q3.4 -2 2.4 1.4Q1.6 3.6 0 3.6Q-1.6 3.6 -2.4 1.4Q-3.4 -2 0 -6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')}${P('M0 -2.6Q1.4 -.6 .9 1.2Q.4 2.2 0 2.2Q-.4 2.2 -.9 1.2Q-1.4 -.6 0 -2.6Z','#fff6c0')}</g>`}
/* les ailes de dragon : bras d'os et membrane */
function dWings(q,u){const big=u>=2?1.12:1,ed=u>=2?'#ffd84a':'#5a0a08';
  const w=`<g transform="translate(36 62) scale(${big}) translate(-36 -62)"><path d="M36 62Q24 40 6 28Q8 36 4 42Q10 44 8 52Q14 52 14 60Q20 58 22 66Q28 62 34 68Z" fill="${MB_(q)}" stroke="${ed}" stroke-width=".7"/>${L_('M36 62Q24 40 6 28M30 58L4 42M28 60L8 52M28 62L14 60M30 64L22 66','#4a0806',.9)}${L_('M36 62Q24 40 6 28','#ffcf7a',.4,'opacity=".7"')}${P('M6 28L3 24L8 27Z','#e8d8b8')}</g>`;
  return`<g opacity="${u>=3?.98:.94}">${MI(w)}</g>`}
/* ---------- la tête de dragon (100×100) ---------- */
function head(q,u){
  /* cou écailleux et plaques ventrales */
  let s=P('M40 58Q38 68 36 80L64 80Q62 68 60 58Z',SC(q))+P('M45 60L55 60L56 80L44 80Z',BL(q))+L_('M44.6 64H55.4M44.4 68.4H55.6M44.2 72.8H55.8M44 77.2H56','#a8501a',.6);
  /* collerettes épineuses */
  s+=MI(P('M37.4 44Q28 42 22.4 35Q25.6 44 23.6 51Q28.6 49.6 31.6 54.6Q31 49.4 36.6 50.4Z',MB_(q),'stroke="#5a0a08" stroke-width=".4"')+L_('M37 45L24 38M36.6 47L25 49M36.4 49.4L31 53','#5a0a08',.5));
  /* les grandes cornes d'ivoire */
  s+=MI(P('M40.8 30Q34.6 20 31 6.4Q37.4 12.6 42.6 19.4Q44.6 23.4 45.6 27.6Z',HN(q),'stroke="#6a5a3a" stroke-width=".4"')+L_('M39 22L42.2 20.6M36.6 16L39.6 15M34.4 11L37 10.4','#8a7a5a',.45)+L_('M38.8 24Q35.6 16 33 9','#ffffff',.5,'opacity=".7"'));
  /* crête centrale */
  s+=P('M48.4 26L50 19.6L51.6 26Z',HN(q))+P('M48.8 22L50 17L51.2 22Z',HN(q),'opacity=".9"');
  /* le crâne en écu, qui s'affine vers le museau */
  s+=P('M35 40Q35 25.6 50 24Q65 25.6 65 40Q65 49 63 55Q60.4 62 55.4 66.4Q52.8 68.6 50 68.6Q47.2 68.6 44.6 66.4Q39.6 62 37 55Q35 49 35 40Z',SC(q),'stroke="#4a0806" stroke-width=".5"')
    +MI(P('M37.2 51.4L32.2 52.6L37 54.8Z',HN(q),'stroke="#6a5a3a" stroke-width=".25"')+P('M38.6 56.8L34.2 59.2L39.4 59.4Z',HN(q),'stroke="#6a5a3a" stroke-width=".25"'));
  s+=P('M58.4 34Q63 40 61.8 50Q60 58 54 64Q59 54 59.4 46Q59.6 40 58.4 34Z','#4a0806','opacity=".35"');
  /* rangées d'écailles */
  let sc='';for(let r=0;r<4;r++){const y=29+r*3.6,n=5-Math.floor(r/2);for(let k=0;k<n;k++){const x=50+(k-(n-1)/2)*4.4;sc+=`M${r1(x-2)} ${r1(y)}Q${r1(x)} ${r1(y+2)} ${r1(x+2)} ${r1(y)}`}}
  s+=L_(sc,'#ff8a5a',.4,'opacity=".7"');
  /* arcades sourcilières froncées en V et yeux de braise plissés de colère */
  s+=MI(P('M35.4 38.4Q42 39.2 49.2 44L48.4 46.8Q42 42.8 36.2 42.6Z','#5a0a08','stroke="#2a0202" stroke-width=".3"')+L_('M35.8 38.6Q42.2 39.4 48.8 44','#ff8a5a',.45,'opacity=".8"'));
  const ec=u>=3?'#ffffff':null;
  s+=MI(C_(43.2,46.6,4.4,EM(q),'opacity=".45"')+`<path d="M38.4 44.2L47.6 47.4Q43.4 50.4 38.4 44.2Z" fill="${ec||EY(q)}"/>`+E_(43.6,46.9,.55,1.6,'#1a0202','transform="rotate(-14 43.6 46.9)"')+C_(41.6,45.6,.36,'#ffffff')+L_('M38.2 44L47.8 47.4','#2a0202',.9));
  /* le museau plissé, naseaux dilatés où rougeoient des braises */
  s+=L_('M50 47V58','#ff8a5a',.5,'opacity=".6"')+MI(L_('M45.2 53Q47 54 46.6 56M44.2 55Q45.8 55.8 45.6 57.6','#4a0806',.55));
  s+=MI(P('M45.8 58.8Q47.2 57.2 48.8 58.4Q48 60.2 45.8 58.8Z','#2a0202')+C_(47.2,58.6,1.4,EM(q),'opacity=".4"'));
  /* la gueule ouverte qui gronde : crocs et feu au fond de la gorge */
  s+=P('M40.8 61.4Q45.6 63.6 50 63.8Q54.4 63.6 59.2 61.4Q58 66.8 50 67.6Q42 66.8 40.8 61.4Z','#2a0202')+E_(50,65.2,5.4,1.7,EM(q),'opacity=".95"')+E_(50,65.4,2.6,.8,'#fff6c0','opacity=".8"');
  s+=MI(P('M42.6 62.2L43.6 65.6L44.8 62.8Z','#fffaf0','stroke="#6a5a3a" stroke-width=".2"')+P('M45.6 63.2L46.4 65.4L47.4 63.6Z','#fffaf0','stroke="#6a5a3a" stroke-width=".2"')+P('M44 66.6L44.8 64.6L45.8 66.8Z','#fffaf0','stroke="#6a5a3a" stroke-width=".2"'));
  s+=L_('M40.4 61.2Q45.6 63.6 50 63.8Q54.4 63.6 59.6 61.2','#2a0202',.9);
  if(u>=3)s+=P('M41 26L43.4 19.6L46 24.6L48.4 17.4L50 22.8L51.6 17.4L54 24.6L56.6 19.6L59 26Q50 23.6 41 26Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+gem(q,50,22,1);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',OB(q))+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8);
  /* plastron d'écailles d'obsidienne et cœur de braise */
  s+=P('M30 100L33.6 80Q40 74 50 74Q60 74 66.4 80L70 100Z',OB(q))+L_('M33.8 80.2Q40 74.4 50 74.4Q60 74.4 66.2 80.2',AU(q),.8);
  let sc='';for(let r=0;r<4;r++){const y=82+r*4.4;for(let k=0;k<6;k++){const x=37+k*5.2+(r%2)*2.6;if(x>64)continue;sc+=`M${r1(x-2.4)} ${r1(y)}Q${r1(x)} ${r1(y+2.6)} ${r1(x+2.4)} ${r1(y)}`}}
  s+=L_(sc,'#8a2a1a',.6,'opacity=".9"')+C_(50,88,8,EM(q),`opacity="${.4+u*.1}"`)+gem(q,50,88,2.6);
  /* épaulières à pointes */
  const lame=(d,rim)=>P(d,OB(q),'stroke="#000" stroke-width=".4"')+L_(rim,AU(q),.8);
  s+=MI(lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75')
    +P('M14 72.6L9.6 64L17.6 70.6Z',HN(q))+P('M22 70.6L20.4 61.6L26 69.6Z',HN(q))+P('M30 71.4L30.6 63.6L33.6 71.4Z',HN(q))+gem(q,21.4,78,1.4));
  return s}
/* ---------- portrait ---------- */
function dPortrait(u){const q='dp'+u+'_';
  let s=pOpen(q,'Drakhar le Wyrm',defs(q,u));
  s+=rays(50,34,14,80,.08,'#fff6c0')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,27,u);
  s+=[[12,24,.9],[86,18,.8],[90,46,.7],[10,52,.6],[70,8,.6],[28,10,.5]].map(([x,y,r],k)=>C_(x,y,r1(r*3.4),EM(q),'opacity=".55"')+C_(x,y,r,k%2?'#fff0c0':'#ff8a2a')).join('');
  s+=P('M0 100L0 84Q6 76 10 82Q14 70 20 80Q24 74 28 84L28 100Z','#ff6a1a','opacity=".35"')+P('M100 100L100 84Q94 76 90 82Q86 70 80 80Q76 74 72 84L72 100Z','#ff6a1a','opacity=".35"');
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffd84a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=dWings(q,u)+bust(q,u)+head(q,u);
  if(u>=3)s+=halo(50,12.4,11,2.8);
  s+=frame('#ff8a2a');
  return s+pClose('Guerrier',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function dBody(u,bare){const q='db'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Drakhar le Wyrm',defs(q,u)+rad(q+'bb',[[0,'#ffb070',.38+u*.08],[.55,'#8a1a10',.3],[1,'#180202',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.06,'#fff6c0')}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffd84a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#ffd84a','#ff6a1a'])+`</g>`+footRing(80,212,50,10,.9,'#ffd84a','#ff6a1a',rune)}
  s+=E_(80,219,40,6,'#000','opacity=".45"');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${dWings(q,u)}</g>`;
  /* la queue de dragon qui s'enroule au sol */
  s+=P('M92 168Q112 178 122 196Q130 210 146 212Q138 216 126 212Q112 206 104 190Q98 180 88 176Z',SC(q),'stroke="#4a0806" stroke-width=".5"')+L_('M94 172Q110 182 118 196Q126 208 140 211','#ff8a5a',.5,'opacity=".6"')
    +[[106,180],[116,190],[124,202],[134,210]].map(([x,y])=>P(`M${x} ${y}L${x+2} ${y-5}L${x+4} ${y+1}Z`,HN(q))).join('');
  /* jambes écailleuses et pieds griffus */
  const leg=P('M65 126L77 126L75.6 170L74.4 200L65.6 200L65 170Z',SC(q),'stroke="#4a0806" stroke-width=".4"')+L_('M66 140Q70 142 74 140M66 152Q70 154 74 152M66 164Q70 166 74 164','#ff8a5a',.45,'opacity=".7"')
    +E_(70,170,6,4.6,OB(q),'stroke="#000" stroke-width=".4"')+L_('M64.2 171Q70 175 75.8 171',AU(q),.8)
    +P('M64 198L76 198L77 206L60 210Q60 203 64 198Z',SC(q),'stroke="#4a0806" stroke-width=".4"')+P('M60 210L57 213L62 210.4ZM64 209.4L62.6 213L66.4 209Z','#fffaf0');
  s+=MB(leg);
  /* tassettes d'obsidienne */
  s+=P('M60 114Q80 121.6 100 114L103 140Q80 147 57 140Z',OB(q),'stroke="#000" stroke-width=".5"')+L_('M57.4 139.6Q80 146.6 102.6 139.6',AU(q),1)+L_('M69 119L67 143M80 121.6V146M91 119L93 143','#5a2a1a',.6);
  /* torse : plaques ventrales et armure d'écailles bordée d'or */
  s+=P('M62 64Q80 58.6 98 64L99.6 96Q96.4 114 80 118Q63.6 114 60.4 96Z',OB(q),'stroke="#000" stroke-width=".4"');
  s+=P('M72 66L88 66L90 114Q80 118 70 114Z',BL(q))+L_('M71 74H89M70.8 82H89.2M70.6 90H89.4M70.4 98H89.6M70.4 106H89.6','#a8501a',.6);
  let sc='';for(let r=0;r<6;r++){const y=70+r*7;sc+=`M63 ${y}Q66 ${y+3} 69.6 ${y}M90.4 ${y}Q94 ${y+3} 97 ${y}`}
  s+=L_(sc,'#8a2a1a',.6)+L_('M64.6 76Q80 70 95.4 76',AU(q),.8)+C_(80,82,9,EM(q),`opacity="${.45+u*.1}"`)+gem(q,80,82,3.2);
  s+=P('M61.4 110.6Q80 118 98.6 110.6L98.6 116Q80 123.4 61.4 116Z','#2a0a0a')+L_('M61.6 111Q80 118.4 98.4 111',AU(q),.7)+gem(q,80,115.6,1.8);
  /* bras droit : poing griffu, une flamme */
  s+=P('M58 70Q50 84 49 100L56.6 101.6Q58.6 87 64 76Z',SC(q),'stroke="#4a0806" stroke-width=".4"')+P('M49 100Q47.6 108 48.6 114L55.8 114.4Q56.8 108 56.6 101.6Z',OB(q))+L_('M48.4 104L56.6 104.6',AU(q),.8)
    +E_(52.4,117,4.4,3.8,SC(q),'stroke="#4a0806" stroke-width=".4"')+P('M48.6 119L47.6 122.4L50 120Z M52 120.4L51.6 124L53.6 120.6Z M55.4 119.8L56 123.2L57 119.4Z','#fffaf0');
  s+=`<g>${C_(52,108,10,EM(q),'opacity=".7"')}${P('M52 96Q56 102 54.6 106Q53.4 109 52 109Q50.6 109 49.4 106Q48 102 52 96Z','#ffb030')}${P('M52 100Q53.8 103.4 53 105.6Q52.4 107 52 107Q51.6 107 51 105.6Q50.2 103.4 52 100Z','#fff6c0')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -1.4;0 0" dur="1.4s" repeatCount="indefinite"/></g>`;
  /* bras gauche : le glaive de flammes */
  s+=P('M102 70Q110 84 111 100L103.4 101.6Q101.4 87 96 76Z',SC(q),'stroke="#4a0806" stroke-width=".4"')+P('M103.4 101.6L111 100L116.6 114L110.4 116.6Z',OB(q));
  s+=L_('M122 30L116 214','#2a0a0a',2.6)+L_('M122.2 31L116.2 213',AU(q),.5,'opacity=".6"')+P('M121.6 34H124.6V37H121.6Z',AU(q))+P('M117 150H120V153H117Z',AU(q));
  s+=P('M123 34Q140 26 146 8Q138 14 132 12Q138 6 136 -2Q128 10 120 14Q118 24 123 34Z',BL(q),'stroke="#8a1a0a" stroke-width=".5"')+P('M123.6 30Q134 24 138 14Q132 18 127 18Q130 12 129 7Q124 15 121.6 18Q121 24 123.6 30Z','#fff0c0','opacity=".8"')+C_(124,26,10,EM(q),'opacity=".5"');
  s+=E_(115,117,4.6,4.2,SC(q),'stroke="#4a0806" stroke-width=".4"');
  /* épaulières à pointes */
  const pa=P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',OB(q),'stroke="#000" stroke-width=".4"')+L_('M48.4 82.2Q54.4 82.4 60.6 80Q66.8 77.4 71.8 73.4',AU(q),.8)
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',OB(q),'stroke="#000" stroke-width=".4"')+L_('M51.2 74.2Q56.6 75.2 62.6 73.4Q68.8 71.2 74 67.4',AU(q),.8)
    +P('M54 66L50 58L57.6 64.4Z',HN(q))+P('M61 63.4L60.4 55L64.6 63Z',HN(q))+gem(q,60.6,69.6,1.3);
  s+=MB(pa);
  s+=HG(head(q,u));
  if(u>=3)s+=halo(80,9,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(DRK,dPortrait,dBody);
}catch(e){console.warn('drakhar art',e)}})();
