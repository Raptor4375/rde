
/* ================= SOLARIS L'ASTRE-ROI : nouveau style graphique =================
   Même roi-soleil : barbe et cheveux d'or, couronne solaire, yeux de lumière, armure d'or, cape de feu, sceptre-soleil.
   Nouveau : visage détaillé, couronne à rayons et rubis, couronne solaire derrière la tête, épaulières à lames,
   soleil gravé sur le plastron, la main sur le cœur, ailes de flammes en ultra II/III. */
(function(){try{
const SOL=57;if(!HEROES[SOL]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#fff2c0'],[.14,'#ffc85a'],[.38,'#ff7a22'],[.68,'#a8260e'],[1,'#2a0804']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#fff0a0',.5],[1,'#ffb030',0]])
 +lin(q+'au',[[0,'#fff6c0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'ag',[[0,u>=3?'#fffbe0':'#fff0a0'],[.45,'#f2b830'],[1,'#a8680e']])
 +lin(q+'cp',[[0,'#ff7a2a'],[.55,'#d43a10'],[1,'#6a1004']])
 +lin(q+'sk',[[0,'#fadcbc'],[.55,'#eec29c'],[1,'#c8946a']],1,0)
 +lin(q+'hr',[[0,'#fff6c0'],[.5,'#ffd24a'],[1,'#c88a1a']])
 +rad(q+'dk',[[0,'#ffb040'],[.6,'#e8601e'],[1,'#a82a0a']])
 +rad(q+'sn',[[0,'#ffffff'],[.3,'#fff2a0'],[.7,'#ffb030'],[1,'#ff6a10',0]])
 +rad(q+'gm',[[0,'#ffe0c0'],[.4,'#ff5a2a'],[1,'#8a1a04']],'38%','34%','70%');
const AU=q=>U(q,'au'),AG=q=>U(q,'ag'),CP=q=>U(q,'cp'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),SN=q=>U(q,'sn'),GM=q=>U(q,'gm');
/* un soleil gravé : disque et rayons */
function sunMark(q,x,y,R,n=12){let d='';for(let k=0;k<n;k++){const a=(k*360/n-90)*Math.PI/180,b=a+Math.PI/n*.45,c=a-Math.PI/n*.45,L=k%2?R*1.55:R*1.9;
  d+=`M${r1(x+R*1.05*Math.cos(c))} ${r1(y+R*1.05*Math.sin(c))}L${r1(x+L*Math.cos(a))} ${r1(y+L*Math.sin(a))}L${r1(x+R*1.05*Math.cos(b))} ${r1(y+R*1.05*Math.sin(b))}Z`}
  return P(d,AU(q),'stroke="#8a5a1a" stroke-width=".25"')+C_(x,y,R,AU(q),'stroke="#8a5a1a" stroke-width=".3"')+C_(x,y,r1(R*.62),GM(q))+C_(r1(x-R*.22),r1(y-R*.22),r1(R*.18),'#fff')}
/* la couronne solaire derrière la tête */
function sigil(q,cx,cy,R,u,op){op=op==null?.55+u*.12:op;let s=C_(cx,cy,r1(R*.98),`url(#${q}dk)`,`opacity="${r1(.8+u*.05)}"`);
  let d='';for(let k=0;k<24;k++){const a=(k*15-90)*Math.PI/180,w=k%2?.05:.08,L=R*(k%2?1.18:1.36);d+=`M${r1(cx+R*.92*Math.cos(a-w))} ${r1(cy+R*.92*Math.sin(a-w))}L${r1(cx+L*Math.cos(a))} ${r1(cy+L*Math.sin(a))}L${r1(cx+R*.92*Math.cos(a+w))} ${r1(cy+R*.92*Math.sin(a+w))}Z`}
  s+=P(d,'#ffe9a0',`opacity="${r1(op*.8)}"`)+sigilRing(cx,cy,R,op,'#fff6c0','#ffffff',36);
  return s+sunMark(q,cx,r1(cy-R*.93),r1(R*.075))}
/* ---------- la tête ---------- */
const hairBack=q=>P('M34.4 46Q32.6 30.6 41.6 25.4Q50 21.2 58.4 25.4Q67.4 30.6 65.6 46Q66.4 54 69 62L31 62Q33.6 54 34.4 46Z',HR(q))+L_('M35 50Q33.6 56 32.6 61M65 50Q66.4 56 67.4 61','#c88a1a',.6,'opacity=".6"');
function face(q,u){
  let s=`<rect x="44.6" y="55" width="10.8" height="12" fill="${SK(q)}"/>`+P('M44.6 59.4Q50 63 55.4 59.4L55.4 64.6Q50 66.8 44.6 64.6Z','#b8845c','opacity=".6"');
  s+=MI(P('M36 43.8Q32.2 43.4 32.6 47.8Q33.2 51.6 36.6 51.4Z','#e8b890'));
  s+=P('M35.4 44Q35.4 29.6 50 29.6Q64.6 29.6 64.6 44Q64.6 53.4 61 59.2Q56.4 65.6 50 66.2Q43.6 65.6 39 59.2Q35.4 53.4 35.4 44Z',SK(q));
  s+=P('M58.8 46Q62.6 52 59.8 58.6Q57 62.6 53 64.6Q58.4 59.6 60 52.6Z','#c08a5c','opacity=".45"');
  const io=u>=3?{ir:'#ffffff',ir2:'#ffd84a',glow:'#fff6c0'}:{ir:'#ffcf4a',ir2:'#c8701a',glow:'#fff0a0'};
  s+=eye(44,Object.assign({lid:'#5a3010'},io))+eye(56,Object.assign({lid:'#5a3010'},io));
  s+=MI(L_('M39.2 41.8Q43.2 39.8 47.8 41.8','#c88a1a',1.9));
  s+=L_('M50.6 47.8L49.4 53.6Q50.4 54.6 52 53.8','#b8845c',.75);
  /* barbe d'or et moustache */
  s+=P('M36.8 50.4Q37.4 57.6 41 62.4Q45 67.6 50 68.8Q55 67.6 59 62.4Q62.6 57.6 63.2 50.4Q62 55.4 59.2 57.6Q56 59.4 53.6 59.2Q50 61.6 46.4 59.2Q44 59.4 40.8 57.6Q38 55.4 36.8 50.4Z',HR(q))
    +L_('M39.4 56.6Q42 61 46 63.6M60.6 56.6Q58 61 54 63.6M44.4 65Q47.4 67.2 50 67.6M42 59Q44 62.4 47 64.6','#c88a1a',.5,'opacity=".8"')+L_('M41 58Q43.6 61.6 46.6 63.2M59 58Q56.4 61.6 53.4 63.2','#fffbe0',.4,'opacity=".7"');
  s+=P('M44.8 57.4Q47.6 55.4 50 56.6Q52.4 55.4 55.2 57.4Q52.6 58.8 50 58.1Q47.4 58.8 44.8 57.4Z',HR(q),'stroke="#c88a1a" stroke-width=".3"');
  s+=P('M47 60Q50 61.8 53 60Q51.8 62 50 62.2Q48.2 62 47 60Z','#a84a3a');
  /* cheveux d'or */
  s+=P('M36 41Q35.6 31.6 42.2 27.2Q50 23.6 57.8 27.2Q64.4 31.6 64 41Q62.4 35.4 58.4 33Q53.8 30.6 50 31.4Q45.4 30.6 41.8 33Q37.6 35.6 36 41Z',HR(q))+L_('M42 28.8Q46 27.2 50.6 27.6M48 27.4Q53.4 26.8 58 29.4','#fffbe0',.5,'opacity=".9"');
  return s}
/* la couronne solaire : bandeau d'or, rayons, rubis-soleil */
function crown(q,u){let d='';const n=u>=3?11:9;for(let k=0;k<n;k++){const a=(-160+k*140/(n-1))*Math.PI/180,L=(k%2?14:19)+(u>=3?3:0),w=k%2?.07:.09;
    d+=`M${r1(50+13.4*Math.cos(a-w))} ${r1(45+13.4*Math.sin(a-w))}L${r1(50+L*Math.cos(a))} ${r1(45+L*Math.sin(a))}L${r1(50+13.4*Math.cos(a+w))} ${r1(45+13.4*Math.sin(a+w))}Z`}
  return P(d,AU(q),'stroke="#8a5a1a" stroke-width=".3"')+P('M37.4 36.4Q50 30.6 62.6 36.4L62 39.6Q50 34 38 39.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".35"')+L_('M38.4 37.8Q50 32.6 61.6 37.8','#fff6c0',.4,'stroke-dasharray=".1 1.6" opacity=".9"')+sunMark(q,50,34.2,1.5)}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q11 80 24 73L76 73Q89 80 92 100Z',CP(q))+L_('M14 99Q16 86 26 78M86 99Q84 86 74 78','#6a1004',.8,'opacity=".6"')+L_('M9 99.4Q11.4 81.4 24.4 73.8M91 99.4Q88.6 81.4 75.6 73.8',AU(q),.8)
    +L_('M10.4 96Q12.6 82 25 75M89.6 96Q87.4 82 75 75','#ffe9a0',.5,'stroke-dasharray=".1 1.8" opacity=".9"');
  /* haut col de la cape */
  s+=MI(P('M34.4 75Q31 64 35.6 56.6L40.6 61.6Q38.4 67.4 40.4 74Z',CP(q),'stroke="#6a1004" stroke-width=".3"')+L_('M35.6 56.8L40.4 61.8Q38.4 67.6 40.2 73.6',AU(q),.6));
  s+=P('M27 100L30 83Q35 74.6 50 74Q65 74.6 70 83L73 100Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M33 100Q36 90 44 86M67 100Q64 90 56 86','#fffbe0',.6,'opacity=".7"')+L_('M30.4 82.6Q35.4 75 50 74.4Q64.6 75 69.6 82.6','#fff6c0',.7)+sunMark(q,50,89,3.4);
  const lame=(d,rim,hi)=>P(d,AG(q),'stroke="#8a5a1a" stroke-width=".45"')+L_(rim,'#fff6c0',.7,'opacity=".8"')+(hi?L_(hi,'#ffffff',.5,'opacity=".7"'):'');
  s+=MI(lame('M31.4 86.2Q23 83.4 13.8 87.6Q8.2 90.6 6 97.4Q11.6 99.6 17.4 97.6Q25 94.2 31.4 86.2Z','M6.3 97.2Q11.6 99.2 17.4 97.2Q24.8 93.8 31 86.6')
    +lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75','M10.6 77.6Q14.6 73.2 21.4 72.2')+sunMark(q,21.4,78,1.4));
  return s}
/* ultra II et III : des ailes de flammes */
const fwings=(q,u)=>wingPair([36,62],[{f:[[-176,44],[-157,51],[-138,55],[-119,51],[-100,44]],fill:['#ff8a2a','#ffb030'],edge:'#a8260e',wd:6.2},{f:[[-166,30],[-146,34],[-126,33],[-107,27]],fill:'#ffe9a0',edge:'#ff8a2a',wd:5.4}],u>=3?.96:.86);
/* ---------- portrait ---------- */
function sPortrait(u){const q='sp'+u+'_s';
  let s=pOpen(q,"Solaris l'Astre-Roi",defs(q,u));
  s+=rays(50,36,16,80,.1,'#fff6c0')+C_(50,36,30+u*2,U(q,'gl'))+sigil(q,50,36,26,u);
  s+=[[12,20,.9],[86,16,.8],[90,44,.7],[10,48,.6],[70,8,.6]].map(([x,y,r],k)=>C_(x,y,r1(r*3.2),SN(q),'opacity=".5"')+C_(x,y,r,k%2?'#fff6c0':'#ffb030')).join('');
  if(u>=1)s+=C_(50,36,33.4,'none',`stroke="#fff6c0" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=fwings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+crown(q,u);
  s+=frame('#ff9a4a');
  return s+pClose('Mage',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function sBody(u,bare){const q='sb'+u+(bare?'s':'')+'_s';
  let s=bOpen(q,"Solaris l'Astre-Roi",defs(q,u)+rad(q+'bb',[[0,'#ffe9a0',.4+u*.08],[.55,'#d43a10',.3],[1,'#2a0804',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".5"')}${sigil(q,80,36,30,u,.45)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,18,130,.06,'#fff6c0')}${C_(80,36,44+u*3,U(q,'gl'),'opacity=".8"')}${sigil(q,80,36,31,u)}`;
    if(u>=1)s+=C_(80,36,48+u*3,'none','stroke="#fff6c0" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=risers(['#ffd84a','#ff8a2a'])+`</g>`+footRing(80,212,50,10,.9,'#ffd84a','#ff8a2a',(x,y)=>`M${r1(x-.8)} ${y}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0M${x} ${r1(y-1.5)}V${r1(y-1.1)}M${x} ${r1(y+1.1)}V${r1(y+1.5)}M${r1(x-1.5)} ${y}H${r1(x-1.1)}M${r1(x+1.1)} ${y}H${r1(x+1.5)}`)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${fwings(q,u)}</g>`;
  /* la grande cape de feu, ourlet brodé d'or */
  s+=P('M60 62Q46 120 38 208Q60 214 80 212Q100 214 122 208Q114 120 100 62Z',CP(q))+P('M62 64Q51 120 44 204L50 206Q56 128 67 70Z','#6a1004','opacity=".5"')+P('M98 64Q109 120 116 204L110 206Q104 128 93 70Z','#6a1004','opacity=".5"')
    +L_('M38 208Q60 214 80 212Q100 214 122 208',AU(q),1.4)+L_('M39.6 202.4Q60 208.4 80 206.4Q100 208.4 120.4 202.4','#ffe9a0',.6,'stroke-dasharray=".1 2.4" opacity=".9"');
  s+=HG(hairBack(q));
  /* jambes d'or : cuissard, genouillère en éventail, grève à arête, chevillère et soleret articulé */
  const G='stroke="#8a5a1a" stroke-width=".45"';
  const leg=P('M65.2 128L77 128L76.2 200L66 200Z','#6a1004')
    +P('M64.6 140Q70.8 137.6 77.2 140L76.4 162Q70.8 164.2 65.2 162Z',AG(q),G)+L_('M66.4 142.4L66.8 160','#fffbe0',.6,'opacity=".75"')+L_('M65.4 161.6Q70.8 163.6 76.2 161.6',AU(q),.6)
    +P('M64.6 167Q61.6 164 62.2 160.6Q65 163 66.4 165.6Z',AG(q),G)+E_(70.8,166.8,5.6,4.4,AG(q),G)+L_('M66.2 164.6Q70.8 162.2 75.4 164.6','#fffbe0',.5,'opacity=".8"')+sunMark(q,70.8,166.8,1.2)
    +P('M65.6 170.6Q70.8 169 76 170.6L75.2 196Q70.8 197.6 66.4 196Z',AG(q),G)+P('M72.6 171L75.8 170.8L75 195.8L72.6 196.4Z','#a8680e','opacity=".35"')+L_('M70.8 171.4V195.4','#fff6c0',.6,'opacity=".85"')
    +P('M65.8 194.4H75.8V198.4H65.8Z',AU(q),G)+C_(70.8,196.4,.9,GM(q))
    +P('M65.4 198L76.2 198L77 203.4Q72 206.4 66 208.6Q60.6 210 56.4 210.4Q57.4 205.2 61.4 202.6Q64 201 65.4 198Z',AG(q),G)
    +L_('M63.2 201.6Q68.6 200.6 76.4 200.6M60.6 204.6Q66.6 203.2 76.8 203',`#8a5a1a`,.45)+L_('M57 210Q66 209 76.8 203.6','#fff6c0',.6,'opacity=".8"');
  s+=MB(leg);
  /* tunique de feu et tassettes d'or */
  s+=P('M62 114Q58 140 57 160L70 162L80 146L90 162L103 160Q102 140 98 114Z',CP(q))+L_('M57.4 159.6L70 161.6L80 146.6L90 161.6L102.6 159.6',AU(q),.9)+L_('M58.6 156Q70 158 78 145.6M82 145.6Q90 158 101.4 156','#ffe9a0',.45,'stroke-dasharray=".1 2" opacity=".9"');
  s+=P('M63.4 114.6Q80 120.6 96.6 114.6L99.4 134Q80 140.6 60.6 134Z',AG(q),'stroke="#8a5a1a" stroke-width=".5"')+L_('M70.4 119.2L69 137.4M80 120.8V139.6M89.6 119.2L91 137.4','#8a5a1a',.6)+L_('M63.8 116.6Q80 122.6 96.2 116.6','#fffbe0',.6,'opacity=".8"');
  /* plastron d'or au grand soleil */
  s+=P('M61.6 64Q80 58.6 98.4 64L97 98Q95.4 110 92.4 115L67.6 115Q64.6 110 63 98Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M64 70Q65.8 86 65.2 100','#fffbe0',.9,'opacity=".7"')
    +L_('M64.4 100.4H95.6M65.6 107H94.4','#8a5a1a',.6)+L_('M64.6 101.6H95.4M65.8 108.2H94.2','#fffbe0',.4,'opacity=".6"')+sunMark(q,80,84,6);
  s+=P('M65.4 111Q80 116.6 94.6 111L94.8 116.4Q80 122 65.2 116.4Z','#6a1004')+L_('M65.6 111.4Q80 117 94.4 111.4',AU(q),.7)+sunMark(q,80,116,1.8);
  /* le gorgerin d'or qui relie la tête au plastron */
  s+=P('M71 50Q80 54.4 89 50L92.6 63.6Q80 69.6 67.4 63.6Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M68.4 60.6Q80 66.4 91.6 60.6','#8a5a1a',.5)+L_('M69.4 56.6Q80 62 90.6 56.6','#8a5a1a',.45)+L_('M71.6 51.4Q80 55.6 88.4 51.4','#fff6c0',.5,'opacity=".8"')+sunMark(q,80,64.4,1.4);
  /* haut col de la cape */
  s+=MB(P('M66 64Q62 54 66.6 46.6L71 51Q69 57 70.6 63Z',CP(q),'stroke="#6a1004" stroke-width=".3"')+L_('M66.6 46.8L70.8 51.2Q69 57.2 70.4 62.6',AU(q),.6));
  /* bras droit : le poing sur le cœur */
  s+=P('M58 70Q50 84 51 98L58.4 99Q59 87 64 76Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+P('M51 98Q58 100 66 92L69.6 97.6Q61 106 52.4 103.4Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+E_(70,93.4,4.2,3.8,SK(q))+L_('M67.6 91.6Q70.4 90.4 72.6 92.4M67.4 94.4Q70.2 93.4 72.8 95','#b8845c',.45);
  /* bras gauche : le sceptre-soleil */
  s+=P('M102 70Q110 84 110 98L103 100Q102.4 87 96 76Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+P('M103 100L110 98L116.6 114L110.4 116.6Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"');
  s+=L_('M118 38L116 214',AU(q),2.4)+L_('M118.2 39L116.2 213','#fff6c0',.6,'opacity=".7"')+C_(118,26,12,SN(q),'opacity=".9"')+sunMark(q,118,26,5)+E_(116,214,2,1.2,AU(q));
  s+=E_(115,117,4.6,4.2,SK(q))+L_('M111 114.6L118.6 115.2M110.8 117.4L118.8 118','#b8845c',.5);
  /* épaulières */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',AG(q),'stroke="#8a5a1a" stroke-width=".4"')+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#ffffff',.6,'opacity=".9"')+sunMark(q,60.6,69.6,1.3);
  s+=MB(pa);
  s+=HG(face(q,u)+crown(q,u));
  s+=bStars(u,bare);
  return s+'</svg>'}
register(SOL,sPortrait,sBody);
}catch(e){console.warn('solaris art',e)}})();
