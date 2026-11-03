
/* ================= APPARENCE LÉGENDAIRE · SOLARIS, ASTRE NOIR =================
   Un dessin refait : le roi de l'éclipse. Soleil noir et couronne de lumière derrière la tête,
   armure d'obsidienne aux filets d'or, cheveux et barbe d'argent, yeux de lumière blanche,
   couronne d'éclipse, cape de feu violet, sceptre au soleil noir, braises violettes. */
(function(){try{
if(!window.SKX||!SKX.def('so_noir')||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,rays,frame,eye,sigilRing,footRing,wingPair,halo,pOpen,pClose,bOpen,bStars}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fff6e0':'#ffe8b0'],[.1,'#c070ff'],[.3,'#4a1a8a'],[.62,'#160830'],[1,'#05020c']],'50%','34%','78%')
 +rad(q+'gl',[[0,'#ffffff',.9],[.45,'#fff0c0',.5],[.75,'#c06aff',.25],[1,'#7a2aff',0]])
 +lin(q+'au',[[0,'#fff8dc'],[.5,'#ffd84a'],[1,'#b8801a']],1,1)
 +lin(q+'ag',[[0,u>=3?'#6a5888':'#4a3c60'],[.45,'#221830'],[1,'#0a0612']])
 +lin(q+'cp',[[0,'#c060ff'],[.55,'#5a10a8'],[1,'#1a0430']])
 +lin(q+'sk',[[0,'#f4dcc8'],[.55,'#e2c0a4'],[1,'#b08a72']],1,0)
 +lin(q+'hr',[[0,'#ffffff'],[.5,'#e2d6f8'],[1,'#8a74b8']])
 +rad(q+'dk',[[0,'#1a1026'],[.85,'#06030c'],[1,'#000000']])
 +rad(q+'sn',[[0,'#ffffff'],[.3,'#fff0c0'],[.7,'#c06aff'],[1,'#7a2aff',0]])
 +rad(q+'gm',[[0,'#f4dcff'],[.4,'#a040ff'],[1,'#3a0a6a']],'38%','34%','70%')
 +rad(q+'co',[[0,'#000000',0],[.7,'#000000',0],[.78,'#ffffff',.95],[.86,'#ffe08a',.7],[1,'#c06aff',0]]);
const AU=q=>U(q,'au'),AG=q=>U(q,'ag'),CP=q=>U(q,'cp'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),SN=q=>U(q,'sn'),GM=q=>U(q,'gm');
/* le soleil noir gravé : disque sombre, anneau de lumière et rayons d'or */
function eclMark(q,x,y,R,n=12){let d='';for(let k=0;k<n;k++){const a=(k*360/n-90)*Math.PI/180,b=a+Math.PI/n*.45,c=a-Math.PI/n*.45,L=k%2?R*1.55:R*1.9;
  d+=`M${r1(x+R*1.05*Math.cos(c))} ${r1(y+R*1.05*Math.sin(c))}L${r1(x+L*Math.cos(a))} ${r1(y+L*Math.sin(a))}L${r1(x+R*1.05*Math.cos(b))} ${r1(y+R*1.05*Math.sin(b))}Z`}
  return P(d,AU(q),'stroke="#6a4a10" stroke-width=".25"')+C_(x,y,R,'#fff6d0','stroke="#b8801a" stroke-width=".3"')+C_(x,y,r1(R*.8),'#0a0612')+C_(r1(x+R*.12),r1(y-R*.1),r1(R*.5),GM(q),'opacity=".55"')}
/* l'éclipse derrière la tête : soleil noir, couronne de lumière, longues flammèches */
function eclipse(q,cx,cy,R,u,op){op=op==null?.6+u*.1:op;
  let s=C_(cx,cy,r1(R*1.5),U(q,'co'),`opacity="${r1(Math.min(1,op+.25))}"`);
  let d='';for(let k=0;k<20;k++){const a=(k*18-90+(k%3)*4)*Math.PI/180,w=k%2?.035:.06,L=R*(k%4===0?1.9:k%2?1.3:1.55);d+=`M${r1(cx+R*.98*Math.cos(a-w))} ${r1(cy+R*.98*Math.sin(a-w))}L${r1(cx+L*Math.cos(a))} ${r1(cy+L*Math.sin(a))}L${r1(cx+R*.98*Math.cos(a+w))} ${r1(cy+R*.98*Math.sin(a+w))}Z`}
  s+=P(d,'#fff0c0',`opacity="${r1(op*.75)}"`)+P(d,'none',`stroke="#c06aff" stroke-width="${r1(R*.012)}" opacity="${r1(op*.6)}"`);
  s+=C_(cx,cy,R,`url(#${q}dk)`)+C_(cx,cy,R,'none',`stroke="#ffffff" stroke-width="${r1(R*.05)}" opacity="${r1(Math.min(1,op+.2))}"`)+C_(cx,cy,r1(R*1.04),'none',`stroke="#ffd84a" stroke-width="${r1(R*.03)}" opacity="${r1(op)}"`);
  s+=sigilRing(cx,cy,r1(R*1.22),op*.7,'#e0c0ff','#fff0c0',36);
  return s+eclMark(q,cx,r1(cy-R*1.22*.93),r1(R*.09))}
/* ---------- la tête ---------- */
const hairBack=q=>P('M34.4 46Q32.6 30.6 41.6 25.4Q50 21.2 58.4 25.4Q67.4 30.6 65.6 46Q66.4 54 69 62L31 62Q33.6 54 34.4 46Z',HR(q))+L_('M35 50Q33.6 56 32.6 61M65 50Q66.4 56 67.4 61','#8a74b8',.6,'opacity=".6"');
function face(q,u){
  let s=`<rect x="44.6" y="55" width="10.8" height="12" fill="${SK(q)}"/>`+P('M44.6 59.4Q50 63 55.4 59.4L55.4 64.6Q50 66.8 44.6 64.6Z','#9a7a68','opacity=".6"');
  s+=MI(P('M36 43.8Q32.2 43.4 32.6 47.8Q33.2 51.6 36.6 51.4Z','#dcb89e'));
  s+=P('M35.4 44Q35.4 29.6 50 29.6Q64.6 29.6 64.6 44Q64.6 53.4 61 59.2Q56.4 65.6 50 66.2Q43.6 65.6 39 59.2Q35.4 53.4 35.4 44Z',SK(q));
  s+=P('M58.8 46Q62.6 52 59.8 58.6Q57 62.6 53 64.6Q58.4 59.6 60 52.6Z','#9a7a68','opacity=".45"');
  /* des yeux de lumière blanche (violette en ultra III), un regard dur */
  const io=u>=3?{ir:'#ffffff',ir2:'#c06aff',glow:'#e0c0ff'}:{ir:'#ffffff',ir2:'#ffd84a',glow:'#fff6c0'};
  s+=MI(E_(44.2,47,5.2,3.6,io.glow,'opacity=".28"'));
  s+=eye(44,Object.assign({lid:'#1a1026',fierce:1},io))+eye(56,Object.assign({lid:'#1a1026',fierce:1},io));
  s+=MI(L_('M39 41.4Q43.2 40.4 47.8 42.2','#6a5a8a',1.9));
  s+=L_('M50.6 47.8L49.4 53.6Q50.4 54.6 52 53.8','#9a7a68',.75);
  /* barbe et moustache d'argent */
  s+=P('M36.8 50.4Q37.4 57.6 41 62.4Q45 67.6 50 68.8Q55 67.6 59 62.4Q62.6 57.6 63.2 50.4Q62 55.4 59.2 57.6Q56 59.4 53.6 59.2Q50 61.6 46.4 59.2Q44 59.4 40.8 57.6Q38 55.4 36.8 50.4Z',HR(q))
    +L_('M39.4 56.6Q42 61 46 63.6M60.6 56.6Q58 61 54 63.6M44.4 65Q47.4 67.2 50 67.6M42 59Q44 62.4 47 64.6','#8a74b8',.5,'opacity=".8"')+L_('M41 58Q43.6 61.6 46.6 63.2M59 58Q56.4 61.6 53.4 63.2','#ffffff',.4,'opacity=".8"');
  s+=P('M44.8 57.4Q47.6 55.4 50 56.6Q52.4 55.4 55.2 57.4Q52.6 58.8 50 58.1Q47.4 58.8 44.8 57.4Z',HR(q),'stroke="#8a74b8" stroke-width=".3"');
  s+=P('M47 60Q50 61.4 53 60Q51.8 61.6 50 61.8Q48.2 61.6 47 60Z','#7a4a5a');
  /* cheveux d'argent */
  s+=P('M36 41Q35.6 31.6 42.2 27.2Q50 23.6 57.8 27.2Q64.4 31.6 64 41Q62.4 35.4 58.4 33Q53.8 30.6 50 31.4Q45.4 30.6 41.8 33Q37.6 35.6 36 41Z',HR(q))+L_('M42 28.8Q46 27.2 50.6 27.6M48 27.4Q53.4 26.8 58 29.4','#ffffff',.5,'opacity=".9"');
  return s}
/* la couronne d'éclipse : bandeau d'obsidienne cerclé d'or, rayons d'or, soleil noir au front */
function crown(q,u){let d='';const n=u>=3?11:9;for(let k=0;k<n;k++){const a=(-160+k*140/(n-1))*Math.PI/180,L=(k%2?14:19)+(u>=2?2:0)+(u>=3?2:0),w=k%2?.06:.08;
    d+=`M${r1(50+13.4*Math.cos(a-w))} ${r1(45+13.4*Math.sin(a-w))}L${r1(50+L*Math.cos(a))} ${r1(45+L*Math.sin(a))}L${r1(50+13.4*Math.cos(a+w))} ${r1(45+13.4*Math.sin(a+w))}Z`}
  let s=P(d,'#0e0818','stroke="#ffd84a" stroke-width=".45"')+P('M37.4 36.4Q50 30.6 62.6 36.4L62 39.6Q50 34 38 39.6Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+L_('M38.4 37.8Q50 32.6 61.6 37.8','#fff0c0',.4,'stroke-dasharray=".1 1.6" opacity=".9"')+eclMark(q,50,34.2,1.6);
  if(u>=1)s+=[-1,1].map(k=>C_(r1(50+k*8.4),33.6,.55,GM(q))).join('');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q11 80 24 73L76 73Q89 80 92 100Z',CP(q))+L_('M14 99Q16 86 26 78M86 99Q84 86 74 78','#1a0430',.8,'opacity=".6"')+L_('M9 99.4Q11.4 81.4 24.4 73.8M91 99.4Q88.6 81.4 75.6 73.8',AU(q),.8)
    +L_('M10.4 96Q12.6 82 25 75M89.6 96Q87.4 82 75 75','#fff0c0',.5,'stroke-dasharray=".1 1.8" opacity=".9"');
  s+=MI(P('M34.4 75Q31 64 35.6 56.6L40.6 61.6Q38.4 67.4 40.4 74Z',CP(q),'stroke="#1a0430" stroke-width=".3"')+L_('M35.6 56.8L40.4 61.8Q38.4 67.6 40.2 73.6',AU(q),.6));
  s+=P('M27 100L30 83Q35 74.6 50 74Q65 74.6 70 83L73 100Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+L_('M33 100Q36 90 44 86M67 100Q64 90 56 86','#8a74b8',.6,'opacity=".7"')+L_('M30.4 82.6Q35.4 75 50 74.4Q64.6 75 69.6 82.6',AU(q),.7)+eclMark(q,50,89,3.4);
  const lame=(d,rim,hi)=>P(d,AG(q),'stroke="#ffd84a" stroke-width=".5"')+L_(rim,AU(q),.7,'opacity=".9"')+(hi?L_(hi,'#c8a8ff',.5,'opacity=".7"'):'');
  s+=MI(lame('M31.4 86.2Q23 83.4 13.8 87.6Q8.2 90.6 6 97.4Q11.6 99.6 17.4 97.6Q25 94.2 31.4 86.2Z','M6.3 97.2Q11.6 99.2 17.4 97.2Q24.8 93.8 31 86.6')
    +lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75','M10.6 77.6Q14.6 73.2 21.4 72.2')+eclMark(q,21.4,78,1.4));
  return s}
/* ultra II et III : des ailes de feu violet aux bords d'or */
const fwings=(q,u)=>wingPair([36,62],[{f:[[-176,44],[-157,51],[-138,55],[-119,51],[-100,44]],fill:['#3a0a6a','#5a10a8'],edge:'#ffd84a',wd:6.2},{f:[[-166,30],[-146,34],[-126,33],[-107,27]],fill:'#c060ff',edge:'#fff0c0',wd:5.4}],u>=3?.96:.88);
/* ---------- portrait ---------- */
function nPortrait(u){const q='snp'+u+'_';
  let s=pOpen(q,'Solaris, Astre Noir',defs(q,u));
  s+=rays(50,36,16,80,.07,'#e0c0ff')+eclipse(q,50,36,21,u);
  s+=[[12,20,.9],[86,16,.8],[90,44,.7],[10,48,.6],[70,6,.6],[28,8,.5]].map(([x,y,r],k)=>C_(x,y,r1(r*3),SN(q),'opacity=".45"')+STARP(x,y,r,k%2?'#fff0c0':'#e0c0ff')).join('');
  if(u>=1)s+=C_(50,36,33.4,'none',`stroke="#e0c0ff" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=fwings(q,u);
  s+=hairBack(q)+bust(q,u)+face(q,u)+crown(q,u);
  if(u>=3)s+=halo(50,r1(36-21*1.22-1.4),12,3);
  s+=frame('#c06aff');
  return s+pClose('Mage',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function nBody(u,bare){const q='snb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Solaris, Astre Noir',defs(q,u)+rad(q+'bb',[[0,'#e0c0ff',.36+u*.08],[.55,'#4a1a8a',.3],[1,'#05020c',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${eclipse(q,80,36,24,u,.45)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,18,130,.05,'#e0c0ff')}${C_(80,36,46+u*3,U(q,'gl'),'opacity=".55"')}${eclipse(q,80,36,25,u)}`;
    if(u>=1)s+=C_(80,36,48+u*3,'none','stroke="#e0c0ff" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=[[16,24],[146,30],[24,100],[140,104],[12,150],[150,160]].map(([x,y],k)=>STARP(x,y,k%2?.8:1,'#fff0c0')).join('');
    /* la couronne de lumière respire */
    s+=`<g>${C_(80,36,31,'none','stroke="#ffffff" stroke-width="1.2"')}<animate attributeName="opacity" values=".15;.8;.15" dur="4s" repeatCount="indefinite"/></g>`;
    s+=`</g>`+footRing(80,212,50,10,.9,'#ffd84a','#c06aff',(x,y)=>`M${r1(x-.8)} ${y}a.8 .8 0 1 0 1.6 0a.8 .8 0 1 0 -1.6 0M${x} ${r1(y-1.5)}V${r1(y-1.1)}M${x} ${r1(y+1.1)}V${r1(y+1.5)}M${r1(x-1.5)} ${y}H${r1(x-1.1)}M${r1(x+1.1)} ${y}H${r1(x+1.5)}`)}
  s+=E_(80,219,38,6,'#000','opacity=".45"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${fwings(q,u)}</g>`;
  /* la grande cape de feu violet, ourlet d'or et flammes */
  s+=P('M60 62Q46 120 38 208Q60 214 80 212Q100 214 122 208Q114 120 100 62Z',CP(q))+P('M62 64Q51 120 44 204L50 206Q56 128 67 70Z','#1a0430','opacity=".55"')+P('M98 64Q109 120 116 204L110 206Q104 128 93 70Z','#1a0430','opacity=".55"')
    +L_('M38 208Q60 214 80 212Q100 214 122 208',AU(q),1.4)+L_('M39.6 202.4Q60 208.4 80 206.4Q100 208.4 120.4 202.4','#fff0c0',.6,'stroke-dasharray=".1 2.4" opacity=".9"')
    +[44,58,72,88,102,116].map((x,k)=>P(`M${x-4} ${208+(k%2)}Q${x-3} ${200-k%3*2} ${x} ${194-k%2*4}Q${x+3} ${200-k%3*2} ${x+4} ${208+(k%2)}Z`,k%2?'#c060ff':'#8a3aff','opacity=".8"')).join('');
  s+=HG(hairBack(q));
  /* jambes d'obsidienne : cuissard, genouillère en éventail, grève à arête, soleret ; filets d'or */
  const G='stroke="#ffd84a" stroke-width=".45"';
  const leg=P('M65.2 128L77 128L76.2 200L66 200Z','#1a0430')
    +P('M64.6 140Q70.8 137.6 77.2 140L76.4 162Q70.8 164.2 65.2 162Z',AG(q),G)+L_('M66.4 142.4L66.8 160','#8a74b8',.6,'opacity=".75"')+L_('M65.4 161.6Q70.8 163.6 76.2 161.6',AU(q),.6)
    +P('M64.6 167Q61.6 164 62.2 160.6Q65 163 66.4 165.6Z',AG(q),G)+E_(70.8,166.8,5.6,4.4,AG(q),G)+L_('M66.2 164.6Q70.8 162.2 75.4 164.6','#8a74b8',.5,'opacity=".8"')+eclMark(q,70.8,166.8,1.2)
    +P('M65.6 170.6Q70.8 169 76 170.6L75.2 196Q70.8 197.6 66.4 196Z',AG(q),G)+L_('M70.8 171.4V195.4',AU(q),.6,'opacity=".85"')
    +P('M65.8 194.4H75.8V198.4H65.8Z',AU(q),'stroke="#6a4a10" stroke-width=".45"')+C_(70.8,196.4,.9,GM(q))
    +P('M65.4 198L76.2 198L77 203.4Q72 206.4 66 208.6Q60.6 210 56.4 210.4Q57.4 205.2 61.4 202.6Q64 201 65.4 198Z',AG(q),G)
    +L_('M57 210Q66 209 76.8 203.6',AU(q),.6,'opacity=".8"');
  s+=MB(leg);
  /* tunique violette et tassettes d'obsidienne */
  s+=P('M62 114Q58 140 57 160L70 162L80 146L90 162L103 160Q102 140 98 114Z',CP(q))+L_('M57.4 159.6L70 161.6L80 146.6L90 161.6L102.6 159.6',AU(q),.9)+L_('M58.6 156Q70 158 78 145.6M82 145.6Q90 158 101.4 156','#fff0c0',.45,'stroke-dasharray=".1 2" opacity=".9"');
  s+=P('M63.4 114.6Q80 120.6 96.6 114.6L99.4 134Q80 140.6 60.6 134Z',AG(q),'stroke="#ffd84a" stroke-width=".5"')+L_('M70.4 119.2L69 137.4M80 120.8V139.6M89.6 119.2L91 137.4',AU(q),.5)+L_('M63.8 116.6Q80 122.6 96.2 116.6','#8a74b8',.6,'opacity=".8"');
  /* plastron d'obsidienne au grand soleil noir */
  s+=P('M61.6 64Q80 58.6 98.4 64L97 98Q95.4 110 92.4 115L67.6 115Q64.6 110 63 98Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+L_('M64 70Q65.8 86 65.2 100','#8a74b8',.9,'opacity=".7"')
    +L_('M64.4 100.4H95.6M65.6 107H94.4',AU(q),.6)+L_('M64.6 101.6H95.4M65.8 108.2H94.2','#8a74b8',.4,'opacity=".6"')+C_(80,84,10,SN(q),'opacity=".4"')+eclMark(q,80,84,6);
  s+=P('M65.4 111Q80 116.6 94.6 111L94.8 116.4Q80 122 65.2 116.4Z','#1a0430')+L_('M65.6 111.4Q80 117 94.4 111.4',AU(q),.7)+eclMark(q,80,116,1.8);
  /* le gorgerin */
  s+=P('M71 50Q80 54.4 89 50L92.6 63.6Q80 69.6 67.4 63.6Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+L_('M68.4 60.6Q80 66.4 91.6 60.6',AU(q),.5)+L_('M69.4 56.6Q80 62 90.6 56.6',AU(q),.45)+eclMark(q,80,64.4,1.4);
  s+=MB(P('M66 64Q62 54 66.6 46.6L71 51Q69 57 70.6 63Z',CP(q),'stroke="#1a0430" stroke-width=".3"')+L_('M66.6 46.8L70.8 51.2Q69 57.2 70.4 62.6',AU(q),.6));
  /* bras droit : le poing sur le cœur */
  s+=P('M58 70Q50 84 51 98L58.4 99Q59 87 64 76Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+P('M51 98Q58 100 66 92L69.6 97.6Q61 106 52.4 103.4Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+E_(70,93.4,4.2,3.8,SK(q))+L_('M67.6 91.6Q70.4 90.4 72.6 92.4M67.4 94.4Q70.2 93.4 72.8 95','#9a7a68',.45);
  /* bras gauche : le sceptre au soleil noir */
  s+=P('M102 70Q110 84 110 98L103 100Q102.4 87 96 76Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+P('M103 100L110 98L116.6 114L110.4 116.6Z',AG(q),'stroke="#ffd84a" stroke-width=".45"');
  s+=L_('M118 38L116 214','#0e0818',2.6)+L_('M118.2 39L116.2 213',AU(q),.5,'opacity=".8"')+[60,90,150,180].map(y=>P(`M${r1(115.4+(214-y)*.0114)} ${y}h3.6v2.4h-3.6z`,AU(q))).join('')
    +C_(118,26,14,SN(q),'opacity=".8"')+C_(118,26,7.6,`url(#${q}dk)`)+C_(118,26,7.6,'none','stroke="#ffffff" stroke-width=".9"')+C_(118,26,8.4,'none','stroke="#ffd84a" stroke-width=".5"')
    +[0,1,2,3,4,5,6,7].map(k=>{const a=k*45*Math.PI/180;return L_(`M${r1(118+9.4*Math.cos(a))} ${r1(26+9.4*Math.sin(a))}L${r1(118+(k%2?12:14.6)*Math.cos(a))} ${r1(26+(k%2?12:14.6)*Math.sin(a))}`,'#fff0c0',.8,'opacity=".9"')}).join('')+E_(116,214,2,1.2,AU(q));
  s+=E_(115,117,4.6,4.2,SK(q))+L_('M111 114.6L118.6 115.2M110.8 117.4L118.8 118','#9a7a68',.5);
  /* épaulières d'obsidienne */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',AG(q),'stroke="#ffd84a" stroke-width=".45"')+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#c8a8ff',.6,'opacity=".9"')+eclMark(q,60.6,69.6,1.3);
  s+=MB(pa);
  s+=HG(face(q,u)+crown(q,u));
  if(u>=3)s+=halo(80,r1(-1+.84*(36-21*1.22-1.4)),10,2.6);
  /* les braises violettes qui montent (une animation chacune ; image fixe : hors du cadre) */
  if(!bare)s+=[...Array(6+u)].map((_,k)=>{const x=r1(14+((k*.618+.4)%1)*132),d=r1(3.8+((k*.37+.2)%1)*2.6),r=[2.3,1.8,2.9][k%3];
    return`<g transform="translate(${x} 250)"><g opacity=".95"><animateMotion dur="${d}s" begin="${r1(-(k+.5)*d/(6+u))}s" repeatCount="indefinite" path="M0 0q${k%2?9:-9} -134 ${k%2?3:-3} -268"/><path d="M0 ${-r}L${r1(r*.45)} 0L0 ${r}L${r1(-r*.45)} 0Z" fill="${['#e0c0ff','#c060ff','#fff0c0'][k%3]}"/></g></g>`}).join('');
  s+=bStars(u,bare);
  return s+'</svg>'}
const C={};
SKX.art('so_noir',{p:u=>C['p'+u]||(C['p'+u]=nPortrait(u)),b:u=>C['b'+u]||(C['b'+u]=nBody(u,false))});
}catch(e){console.warn('solaris astre noir',e)}})();
