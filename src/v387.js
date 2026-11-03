
/* ================= SÉRAPHINE AUX SIX AILES : nouveau style graphique =================
   Même séraphin : cheveux d'or pâle, bandeau d'or sur les yeux, auréole, six ailes blanches, robe blanche et étole rose, bâton d'or.
   Nouveau : visage détaillé (bandeau de dentelle d'or et ses rubans), six ailes en trois paires dorées sur les bords,
   sceau à l'étoile à six branches, robe brodée d'or, main levée qui bénit, bâton à l'anneau étoilé. */
(function(){try{
const SER=64;if(!HEROES[SER]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,'#ffffff'],[.15,'#ffe8f2'],[.4,'#f0a8cc'],[.7,'#8a5aa8'],[1,'#2a1440']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',1],[.5,'#fff0f8',.5],[1,'#ffb0d8',0]])
 +lin(q+'au',[[0,'#fff6c0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'rb',[[0,'#ffffff'],[.5,'#f2ecf8'],[1,'#c8b8dc']])
 +lin(q+'pk',[[0,'#ffb0d4'],[.55,'#ff6aa8'],[1,'#c8306e']])
 +lin(q+'sk',[[0,'#fff0e4'],[.55,'#f8dcca'],[1,'#e0b8a0']],1,0)
 +lin(q+'hr',[[0,'#fffbe8'],[.5,'#f4d880'],[1,'#c8a040']])
 +rad(q+'gm',[[0,'#ffe0f0'],[.4,'#ff5aa8'],[1,'#8a1a4a']],'38%','34%','70%')
 +rad(q+'hl',[[0,'#ffffff',1],[.35,'#fff6d0',.75],[1,'#ffd84a',0]]);
const AU=q=>U(q,'au'),RB=q=>U(q,'rb'),PK=q=>U(q,'pk'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),GM=q=>U(q,'gm'),HL=q=>U(q,'hl');
const MI0=s=>s+`<g transform="scale(-1 1)">${s}</g>`;
const gem=(q,x,y,r)=>C_(x,y,r1(r*1.3),AU(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(x,y,r,GM(q))+C_(r1(x-r*.35),r1(y-r*.35),r1(r*.28),'#fff');
/* le sceau : étoile à six branches, anneau, et une paire d'ailes d'or au sommet */
function sigil(q,cx,cy,R,u,op){op=op==null?.5+u*.12:op;let s=P(starN(cx,cy,6,R*1.3,R*.62),'none',`stroke="#ffe08a" stroke-width="${r1(R*.022)}" opacity="${r1(op*.8)}"`)
  +P(starN(cx,cy,6,R*1.3,R*.62,-60),'none',`stroke="#ffffff" stroke-width="${r1(R*.016)}" opacity="${r1(op*.6)}"`)+sigilRing(cx,cy,R,op,'#ffe08a','#ffffff',36);
  const y=r1(cy-R*.93),k=r1(R/28);
  return s+`<g transform="translate(${cx} ${y}) scale(${k})">${MI0(P('M-1.6 0Q-5.4 -3 -9 -1.6Q-6 -.4 -6.8 1.4Q-4 .8 -1.6 1.6Z','#ffffff','stroke="#c8a04a" stroke-width=".3"'))}${gem(q,0,.2,1.5)}</g>`}
/* les six ailes : trois paires */
function wings6(q,u){const ed=u>=2?'#e0a83a':'#d8c08a',f2=u>=2?'#ffe9a8':'#ffffff';
  const top=wingPair([41,44],[{f:[[-150,26],[-134,30],[-118,27],[-102,22]],fill:['#ffffff','#f6f0ff'],edge:ed,wd:4.6}],1);
  const mid=wingPair([36,62],[{f:[[-176,44],[-160,50],[-143,52],[-126,47]],fill:['#ffffff','#f6f0ff'],edge:ed,wd:6},{f:[[-168,30],[-150,33],[-132,31]],fill:f2,edge:ed,wd:5}],1);
  const low=wingPair([37,76],[{f:[[166,34],[178,38],[-170,36],[154,28]],fill:['#ffffff','#f6f0ff'],edge:ed,wd:5},{f:[[172,24],[160,22]],fill:f2,edge:ed,wd:4}],1);
  return`<g opacity="${u>=3?.98:.94}">${low}${mid}${top}</g>`}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q69 ${y(16)} 72 ${y(32)}Q74 ${y(44)} 70 ${y(54)}H30Q26 ${y(44)} 28 ${y(32)}Q31 ${y(16)} 33.4 46Z`,HR(q))
  +L_(`M36 52Q33 66 32 ${y(38)}M64 52Q67 66 68 ${y(38)}M40 60Q38 74 38 ${y(46)}M60 60Q62 74 62 ${y(46)}`,'#c8a040',.6,'opacity=".5"')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#d8a890','opacity=".5"');
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 52.8 59.6 58.2Q55.4 63.6 50 64.2Q44.6 63.6 40.4 58.2Q37 52.8 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#e0b0a0','opacity=".4"');
  s+=L_('M50.4 50.6L49.8 53.6Q50.4 54.2 51.4 53.9','#d8a890',.6);
  s+=P('M46.8 57.2Q50 58.6 53.2 57.2Q52.4 59.8 50 60Q47.6 59.8 46.8 57.2Z','#e07a94')+L_('M46.6 57.2Q50 58.4 53.4 57.2','#b84a64',.5)+P('M47.8 59Q50 59.8 52.2 59Q50 59.6 47.8 59Z','#ffc0d0','opacity=".8"');
  s+=MI(E_(41.4,54.4,3.2,1.5,'#ff8ab0','opacity=".28"'));
  /* le bandeau de dentelle d'or sur les yeux, ses rubans */
  s+=P('M36.2 43.2Q50 40 63.8 43.2L64 49.6Q50 46.4 36 49.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+L_('M37 45Q50 42 63 45M37 48Q50 45 63 48','#fff6c0',.35,'stroke-dasharray=".1 1.1" opacity=".95"')
    +[40,44,56,60].map(x=>C_(x,r1(46.4-(x<50?(x-36)*.08:(64-x)*.08)),.6,'#ffffff')).join('')+gem(q,50,45,1.5)
    +P('M63.6 44Q68 46 70 52Q68 51 66 50.6Z',PK(q))+P('M63.8 47Q67 52 67 58Q65.4 56 64.2 54Z',PK(q));
  /* frange d'or pâle */
  s+=P('M36.4 45Q35 30 44 25.2Q52 21.8 59.8 25.6Q66.2 29.6 64.4 45Q62.4 37 57.2 33.6Q54.2 37.4 48.8 38.6Q52 35.4 52.4 32.6Q46.6 37.2 39.6 39Q37.2 41.4 36.4 45Z',HR(q))
    +L_('M44 27Q49 25.4 54 26.4M40 32Q44 28.6 49 28.4M55.4 28.6Q60 30 62.4 34.6','#ffffff',.5,'opacity=".9"');
  s+=P('M36.8 42Q34 52 35 62Q36 70 33 80Q38.8 74 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 80Q61.2 74 60.2 62Q59.4 52 60.4 44Z',HR(q));
  return s}
const aureole=(q,cx,cy,rx,ry,u)=>C_(cx,cy,r1(rx*1.4),HL(q),'opacity=".5"')+E_(cx,cy,rx,ry,'none',`stroke="${AU(q)}" stroke-width="1.6"`)+E_(cx,cy,rx,ry,'none','stroke="#ffffff" stroke-width=".5"')
  +(u>=3?E_(cx,r1(cy-2.6),r1(rx*.8),r1(ry*.8),'none','stroke="#ffe08a" stroke-width=".9"')+[[-1,0],[1,0]].map(([d])=>STARP(r1(cx+d*rx*1.1),cy,.7)).join(''):'');
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',RB(q))+L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8)+L_('M11.2 96Q13 83 25 76.4M88.8 96Q87 83 75 76.4','#ffe9a0',.5,'stroke-dasharray=".1 1.8" opacity=".9"');
  /* l'étole rose en V, col d'or */
  s+=P('M36 74Q43 86 50 98Q57 86 64 74L60 74Q55 84 50 91Q45 84 40 74Z',PK(q))+L_('M36 74Q43 86 50 98Q57 86 64 74',AU(q),.6)+P('M40 74Q45 84 50 91Q55 84 60 74Q50 78 40 74Z',SK(q));
  s+=P('M38.6 72.6Q50 77.6 61.4 72.6L62.4 75.4Q50 80.6 37.6 75.4Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+gem(q,50,92.4,2);
  s+=MI(L_('M16 86Q22 80 30 82Q26 88 18 90','#ffe08a',.5,'opacity=".9"')+L_('M14 94Q20 90 26 92','#ffe08a',.45,'opacity=".8"'));
  return s}
/* ---------- portrait ---------- */
function sPortrait(u){const q='zp'+u+'_';
  let s=pOpen(q,'Séraphine aux Six Ailes',defs(q,u));
  s+=rays(50,34,12,80,.12,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,27,u);
  s+=[[12,22,1],[86,16,.9],[90,46,.7],[10,50,.6],[70,8,.6],[30,8,.5]].map(([x,y,r])=>C_(x,y,r1(r*3),U(q,'hl'),'opacity=".6"')+STARP(x,y,r,'#ffffff')).join('');
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=wings6(q,u)+hairBack(q)+bust(q,u)+face(q,u)+aureole(q,50,18,12,3,u);
  s+=frame('#ff9ac8');
  return s+pClose('Soutien',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function sBody(u,bare){const q='zb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Séraphine aux Six Ailes',defs(q,u)+rad(q+'bb',[[0,'#fff0f8',.42+u*.08],[.55,'#c86aa0',.28],[1,'#2a1440',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".5"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.07,'#ffffff')}${C_(80,36,44+u*3,U(q,'gl'),'opacity=".8"')}${sigil(q,80,35,34,u)}`;
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#ffffff','#ffe08a'],(c,k)=>`<path d="M0 -2.4Q1.4 -1 .4 2.2Q-1 0 0 -2.4Z" fill="${c}" opacity=".95"/>`)+`</g>`
      +footRing(80,212,50,10,.9,'#ffd84a','#ff9ac8',(x,y)=>`M${r1(x-1)} ${r1(y+.6)}Q${x} ${r1(y-1.2)} ${r1(x+1)} ${r1(y-.6)}`)}
  s+=E_(80,219,38,6,'#000','opacity=".38"');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${wings6(q,u)}</g>`;
  s+=HG(hairBack(q,1.3));
  /* la longue robe blanche, ourlet brodé d'or */
  s+=P('M62 62Q50 120 44 208Q62 214 80 212Q98 214 116 208Q110 120 98 62Z',RB(q))+L_('M66 80Q60 140 56 200M94 80Q100 140 104 200M80 120V210','#c8b8dc',.7,'opacity=".7"')
    +P('M62 62Q52 120 47 206L56 208Q58 130 67 70Z','#c8b8dc','opacity=".45"')+P('M98 62Q108 120 113 206L104 208Q102 130 93 70Z','#c8b8dc','opacity=".45"')+L_('M44 208Q62 214 80 212Q98 214 116 208',AU(q),1.3)+L_('M45.4 202.6Q62 208.4 80 206.4Q98 208.4 114.6 202.6','#ffe08a',.7,'stroke-dasharray=".1 2.4" opacity=".9"')
    +[54,64,74,86,96,106].map(x=>`<g transform="translate(${x} ${r1(205-Math.abs(80-x)*.04)})">${MI0(P('M-.6 0Q-2.6 -1.6 -4 -.6Q-2.6 0 -3 .8Q-1.8 .4 -.6 .8Z','#ffe08a'))}</g>`).join('');
  /* l'étole rose qui tombe devant */
  s+=P('M70 62Q66 120 68 200L74 200Q72 120 76 64Z',PK(q))+P('M90 62Q94 120 92 200L86 200Q88 120 84 64Z',PK(q))+L_('M68 200H74M86 200H92',AU(q),1)+L_('M70.4 64Q66.6 120 68.4 199M89.6 64Q93.4 120 91.6 199',AU(q),.5);
  /* ceinture d'or à gemme */
  s+=P('M62 108Q80 114 98 108L98.6 114Q80 120 61.4 114Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+gem(q,80,112,2.2);
  s+=P('M66 60Q80 66 94 60L95 64Q80 70 65 64Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+P('M74 62Q80 74 86 62Q80 66 74 62Z',SK(q))+gem(q,80,76,2.4);
  /* manches larges, main droite levée qui bénit, une lumière douce */
  s+=P('M60 66Q50 74 44 86L52 92Q56 80 66 74Z',RB(q),'stroke="#a898c4" stroke-width=".7"')+L_('M58 72Q52 78 48.6 86M62 72Q56 80 52.4 88','#c8b8dc',.6,'opacity=".9"')+P('M44 86L52 92L50 96L41 90Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+E_(44.6,80.4,3.6,4.6,SK(q),'transform="rotate(-24 44.6 80.4)"')+L_('M42 77.6L42.8 74.4M44 76.8L45 73.6M46 77.6L47.4 74.8','#d8a890',.5);
  s+=C_(42,72,10,HL(q),'opacity=".8"')+STARP(42,72,1.2,'#ffffff');
  /* main gauche : le bâton d'or à l'anneau étoilé */
  s+=P('M100 66Q112 84 116 110L104 112Q102 92 94 74Z',RB(q),'stroke="#a898c4" stroke-width=".7"')+L_('M100 74Q107 88 109.6 108M103.4 70Q111 84 113.4 106','#c8b8dc',.6,'opacity=".9"')+P('M116 110L104 112L105 116L117 114Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+E_(113,117,4.4,3.8,SK(q));
  s+=L_('M118 40L114 214',AU(q),2)+L_('M118.2 41L114.2 213','#fff6c0',.5,'opacity=".7"')+C_(118.4,30,10,HL(q),'opacity=".8"')+C_(118.4,30,7.4,'none',`stroke="${AU(q)}" stroke-width="1.6"`)
    +P(starN(118.4,30,6,5.4,2.6),'#ffffff','stroke="#c8a04a" stroke-width=".3"')+gem(q,118.4,30,1.4)+C_(114,214,1.4,AU(q));
  s+=HG(face(q,u)+aureole(q,50,18,12,3,u));
  s+=bStars(u,bare);
  return s+'</svg>'}
register(SER,sPortrait,sBody);
}catch(e){console.warn('seraphine art',e)}})();
