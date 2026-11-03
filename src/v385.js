
/* ================= KAÏROS MAÎTRE DU TEMPS : nouveau style graphique =================
   Même maître du temps : capuche violette, longs cheveux blancs, monocle-horloge, marque « XII », sablier, cadran d'horloge.
   Nouveau : visage détaillé (un œil turquoise, l'autre derrière le monocle-horloge), capuche brodée de rouages,
   col d'horlogerie, pendentif-sablier, grand cadran aux chiffres romains, montre à gousset qui se balance,
   sceptre en aiguille d'horloge, ailes d'aiguilles et de rouages en ultra II/III. */
(function(){try{
const KAI=58;if(!HEROES[KAI]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,eye,sigilRing,footRing,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#fffbe8':'#f2eaff'],[.15,'#b89aff'],[.4,'#5a3aa8'],[.7,'#241048'],[1,'#0c0418']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,'#d8c8ff',.42],[1,'#8a5aff',0]])
 +lin(q+'au',[[0,'#fff0b8'],[.5,'#e0b850'],[1,'#9a7020']],1,1)
 +lin(q+'hd',[[0,u>=3?'#7a5ad0':'#5e3ea8'],[.55,'#36206a'],[1,'#180a30']])
 +lin(q+'rb',[[0,'#4a2e88'],[1,'#1e0e3a']])
 +lin(q+'ln',[[0,'#b8a0e8'],[1,'#6a4aa8']])
 +lin(q+'sk',[[0,'#f2e6dc'],[.55,'#e2d0c2'],[1,'#bea898']],1,0)
 +lin(q+'hr',[[0,'#ffffff'],[.55,'#e8e4f4'],[1,'#a8a0c8']])
 +lin(q+'tq',[[0,'#bffff2'],[.5,'#3ae0c8'],[1,'#108a7a']])
 +rad(q+'tg',[[0,'#ffffff',1],[.35,'#9afff0',.7],[1,'#3ae0c8',0]]);
const AU=q=>U(q,'au'),HD=q=>U(q,'hd'),RB=q=>U(q,'rb'),LN=q=>U(q,'ln'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),TQ=q=>U(q,'tq'),TG=q=>U(q,'tg');
const ROM=['XII','I','II','III','IIII','V','VI','VII','VIII','IX','X','XI'];
/* un rouage */
function gear(x,y,R,c,op=1,n=8){let d='';for(let k=0;k<n*2;k++){const a=(k*180/n)*Math.PI/180,rr=k%2?R*.78:R,b=a+Math.PI/n;d+=(k?'L':'M')+r1(x+rr*Math.cos(a))+' '+r1(y+rr*Math.sin(a))+'L'+r1(x+rr*Math.cos(b))+' '+r1(y+rr*Math.sin(b))}
  return`<g opacity="${op}">${P(d+'Z',c)}${C_(x,y,r1(R*.36),'#140820')}${C_(x,y,r1(R*.16),c)}</g>`}
/* un cadran : chiffres romains, graduations, deux aiguilles */
function dial(q,cx,cy,R,op,hands=1,fs=1){let s=sigilRing(cx,cy,R,op,'#e0b850','#f0e0ff',60);
  s+=ROM.map((t,k)=>{const a=(k*30-90)*Math.PI/180;return`<text x="${r1(cx+R*.74*Math.cos(a))}" y="${r1(cy+R*.74*Math.sin(a)+R*.035*fs)}" text-anchor="middle" font-size="${r1(R*.1*fs)}" font-weight="700" font-family="Georgia,serif" fill="#f0e0ff" opacity="${r1(op)}">${t}</text>`}).join('');
  if(hands)s+=L_(`M${cx} ${cy}L${r1(cx-R*.42)} ${r1(cy-R*.34)}`,AU(q),r1(R*.045),`opacity="${r1(op)}"`)+L_(`M${cx} ${cy}L${r1(cx+R*.5)} ${r1(cy-R*.52)}`,AU(q),r1(R*.03),`opacity="${r1(op)}"`)+C_(cx,cy,r1(R*.05),AU(q),`opacity="${r1(op)}"`);
  return s}
/* une petite horloge d'or (monocle, montre, fermoir) */
function clockFace(q,x,y,R,t=0){return C_(x,y,R,'#fff8ec','stroke="#9a7020" stroke-width=".3"')+C_(x,y,R,'none',`stroke="${AU(q)}" stroke-width="${r1(R*.2)}"`)
  +[0,1,2,3,4,5,6,7,8,9,10,11].map(k=>{const a=(k*30-90)*Math.PI/180;return C_(r1(x+R*.74*Math.cos(a)),r1(y+R*.74*Math.sin(a)),r1(R*(k%3?.05:.09)),'#5a3a2a')}).join('')
  +L_(`M${x} ${y}L${r1(x-R*.36)} ${r1(y-R*.36)}`,'#3a2418',r1(R*.12))+L_(`M${x} ${y}L${r1(x+R*.18)} ${r1(y-R*.6)}`,'#3a2418',r1(R*.08))+C_(x,y,r1(R*.1),AU(q))}
/* le sablier */
function hourglass(q,x,y,s){return`<g transform="translate(${x} ${y}) scale(${s})">${P('M-3.6 -6H3.6V-5H-3.6ZM-3.6 5H3.6V6H-3.6Z',AU(q))}${P('M-2.8 -5Q-2.8 -1.4 0 0Q2.8 -1.4 2.8 -5ZM-2.8 5Q-2.8 1.4 0 0Q2.8 1.4 2.8 5Z','#e8f8ff','opacity=".55" stroke="#9a7020" stroke-width=".25"')}${P('M-1.8 -3.4Q0 -1.2 1.8 -3.4Z',TQ(q))}${P('M-2.4 4.6Q0 2 2.4 4.6Z',TQ(q))}${L_('M0 -.6V3.6','#6afff0',.3)}${L_('M-3.2 -5V5M3.2 -5V5','#9a7020',.4)}</g>`}
/* ---------- la tête ---------- */
function hoodBack(q){return P('M29 52Q26 22 50 13.4Q74 22 71 52Q73 66 77 80L23 80Q27 66 29 52Z',HD(q))+P('M34 48Q33 28 50 22Q67 28 66 48Q60 36 50 34Q40 36 34 48Z','#0c0418','opacity=".6"')
  +L_('M26 72Q28.4 60 29 52Q26 22 50 13.4','#d8c8ff',.7,'opacity=".4"')
  /* longs cheveux blancs qui sortent de la capuche */
  +P('M33.6 46Q30 62 29 80Q32 90 37 96L41 70Q40 58 38 48Z',HR(q))+P('M66.4 46Q70 62 71 80Q68 90 63 96L59 70Q60 58 62 48Z',HR(q))
  +L_('M33 56Q31 70 32 84M67 56Q69 70 68 84','#a8a0c8',.5,'opacity=".7"')}
function face(q,u){
  let s=`<rect x="45" y="55" width="10" height="12" fill="${SK(q)}"/>`+P('M45 59.4Q50 62.6 55 59.4L55 64Q50 66 45 64Z','#a8907e','opacity=".55"');
  s+=P('M36.6 44.2Q36.6 30.4 50 30.4Q63.4 30.4 63.4 44.2Q63.4 53.4 60 58.8Q55.8 64.6 50 65.2Q44.2 64.6 40 58.8Q36.6 53.4 36.6 44.2Z',SK(q));
  s+=P('M58.6 46Q61.8 52 59.2 57.6Q56.8 61.2 53 63Q57.8 58.6 59.2 52.6Z','#a8907e','opacity=".4"');
  const io=u>=3?{ir:'#ffe08a',ir2:'#c8901a',glow:'#ffe08a'}:{ir:'#6afff0',ir2:'#0e8a7a',glow:'#9afff0'};
  s+=eye(44,Object.assign({lid:'#2a1a3a'},io))+L_('M40.6 49.6Q44 50.8 47.4 49.4','#a8907e',.35,'opacity=".7"');
  s+=L_('M39.6 42.2Q43.6 40.4 47.8 41.6','#c8c0d8',1.2)+L_('M52.4 41.4Q56.4 40.2 60.4 42.2','#c8c0d8',1.2);
  /* le monocle-horloge sur l'œil droit, sa chaîne d'or */
  s+=C_(56.2,47,5.4,TG(q),`opacity="${.35+u*.1}"`)+clockFace(q,56.2,47,4.4)+L_('M60.4 49.8Q63.4 56 61 64Q60 70 63.6 75','#e0b850',.4,'stroke-dasharray=".6 .5"');
  s+=L_('M50.6 48.4L49.6 53.2Q50.4 54.2 51.8 53.6','#a8907e',.7);
  s+=L_('M46.4 57.4Q50.2 59.4 54 57.2','#6a4a5a',.85)+L_('M52.6 56.8L54.2 56.2','#6a4a5a',.6);
  /* la marque « XII » sous l'œil */
  s+=`<text x="42" y="54.6" text-anchor="middle" font-size="2.6" font-weight="700" font-family="Georgia,serif" fill="#e0b850">XII</text>`;
  /* mèches blanches sur le front */
  s+=P('M36.4 44Q35.6 32 44 27.6Q50 25 56.6 27.4Q64.6 31.4 63.6 44Q62 37.6 58.4 35Q56.6 38.2 52.6 39.4Q54.4 36.4 53.8 34.4Q49.6 38.4 44.6 38.8Q46.6 36.6 46.6 34.8Q42.6 38 39.4 38.4Q37.4 40.6 36.4 44Z',HR(q))
    +L_('M42 30.4Q46.4 28.4 51 29M52.6 29.2Q58 30.4 61.4 34.6','#ffffff',.5,'opacity=".9"');
  return s}
function hoodFront(q,u){let s=P('M31.6 52Q30 26 50 18.6Q70 26 68.4 52Q66.4 36 58.6 30.4Q50 26.6 41.4 30.4Q33.6 36 31.6 52Z',HD(q));
  s+=P('M31.6 52Q33.6 36 41.4 30.4Q50 26.6 58.6 30.4Q66.4 36 68.4 52L66.9 52.4Q65.1 38.2 57.9 32.6Q50 29.2 42.1 32.6Q34.9 38.2 33.1 52.4Z',LN(q));
  s+=L_('M31.9 51.6Q33.9 36.2 41.6 30.7Q50 27 58.4 30.7Q66.1 36.2 68.1 51.6',AU(q),.85)+L_('M31.3 51.2Q29.7 26.2 50 18.9Q70.3 26.2 68.7 51.2',AU(q),.75)
    +L_('M32.3 47.4Q31.5 28.6 50 22.4Q68.5 28.6 67.7 47.4','#f0e0ff',.55,'stroke-dasharray=".1 2" opacity=".9"');
  s+=clockFace(q,50,22.8,2.6);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 80 24 73.6L76 73.6Q90 80 92 100Z',RB(q))+P('M12 100Q14 85 26 77.6L30 100Z',LN(q),'opacity=".55"')+P('M88 100Q86 85 74 77.6L70 100Z',LN(q),'opacity=".55"')
    +L_('M9 99.4Q11 81 24.6 74.4M91 99.4Q89 81 75.4 74.4',AU(q),.8)+L_('M12.4 99.6Q14.4 85.2 26 78.2M87.6 99.6Q85.6 85.2 74 78.2',AU(q),.6);
  /* le col d'horlogerie : un demi-rouage d'or */
  s+=P('M33.6 74Q50 82 66.4 74L68 79Q50 87 32 79Z',AU(q),'stroke="#6a4a10" stroke-width=".35"')+[36,41,46,50,54,59,64].map(x=>P(`M${x-1.2} ${r1(80.4+Math.abs(x-50)*-.08)}L${x} ${r1(83+Math.abs(x-50)*-.12)}L${x+1.2} ${r1(80.4+Math.abs(x-50)*-.08)}Z`,AU(q))).join('');
  s+=P('M38 84Q50 88 62 84L66 100H34Z','#2a1650')+L_('M50 86V100','#140820',.8)+L_('M38.4 84.2Q50 88.4 61.6 84.2',AU(q),.5);
  /* le pendentif-sablier */
  s+=L_('M44 80Q47 88 50 90Q53 88 56 80',AU(q),.4,'stroke-dasharray=".6 .5"')+C_(50,94,6,TG(q),`opacity="${.3+u*.1}"`)+hourglass(q,50,94,.72);
  s+=gear(20,90,5,'#e0b850',.55,10)+gear(82,92,3.6,'#e0b850',.4,8);
  return s}
/* ultra II et III : des ailes d'aiguilles d'horloge */
function hwings(q,u){const R=[36,62];let w='';
  [[-176,44],[-157,51],[-138,55],[-119,51],[-100,44]].forEach(([a,l])=>{w+=feather(R,a,l,3.2,'#e0b850','#7a5010',.4)});
  [[-166,30],[-146,34],[-126,33],[-107,27]].forEach(([a,l])=>{w+=feather(R,a,l,2.6,'#9afff0','#3ae0c8',.35)});
  w+=gear(10,40,4,'#e0b850',.9)+gear(18,24,3,'#e0b850',.8);
  return`<g opacity="${u>=3?.96:.86}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function kPortrait(u){const q='kp'+u+'_';
  let s=pOpen(q,'Kaïros Maître du Temps',defs(q,u));
  s+=rays(50,34,12,80,.07,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+dial(q,50,34,28,.6+u*.1);
  s+=gear(12,20,4,'#e0b850',.5)+gear(88,18,3.2,'#e0b850',.45)+gear(90,46,2.6,'#e0b850',.4)+gear(10,50,2.4,'#e0b850',.35);
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#ffe08a" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=hwings(q,u);
  s+=hoodBack(q)+bust(q,u)+face(q,u)+hoodFront(q,u);
  if(u>=3)s+=halo(50,14.6,11,2.8);
  s+=frame('#b89aff');
  return s+pClose('Assassin',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function kBody(u,bare){const q='kb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Kaïros Maître du Temps',defs(q,u)+rad(q+'bb',[[0,'#d8c8ff',.36+u*.08],[.55,'#4a2e88',.28],[1,'#0c0418',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,40,44,U(q,'gl'),'opacity=".45"')}${dial(q,80,50,40,.4,1,1)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,40,14,120,.05,'#ffffff')}${C_(80,40,44+u*3,U(q,'gl'),'opacity=".7"')}${dial(q,80,50,42,.75+u*.05)}`;
    if(u>=1)s+=C_(80,50,48+u*3,'none','stroke="#ffe08a" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=gear(18,40,6,'#e0b850',.45)+gear(144,58,5,'#e0b850',.4)+gear(22,150,4.4,'#e0b850',.35)+gear(140,160,5.4,'#e0b850',.35);
    s+=risers(['#9afff0','#e0b850'])+`</g>`+footRing(80,212,50,10,.9,'#e0b850','#9afff0',(x,y,k)=>k%3?`M${x} ${r1(y-.8)}V${r1(y+.8)}`:`M${r1(x-.5)} ${r1(y-1)}V${r1(y+1)}M${r1(x+.5)} ${r1(y-1)}V${r1(y+1)}`,24)}
  s+=E_(80,219,38,6,'#000','opacity=".42"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${hwings(q,u)}</g>`;
  /* la longue robe violette, ourlet aux chiffres romains */
  s+=P('M62 60Q46 112 40 208Q60 214 80 212Q100 214 120 208Q114 112 98 60Z',RB(q))+P('M62 62Q50 120 45 204L51 206Q56 128 67 68Z',LN(q),'opacity=".5"')+P('M98 62Q110 120 115 204L109 206Q104 128 93 68Z',LN(q),'opacity=".5"')
    +L_('M40 208Q60 214 80 212Q100 214 120 208',AU(q),1.3)+L_('M41.6 202Q60 208 80 206Q100 208 118.4 202',AU(q),.6);
  s+=HG(hoodBack(q));
  /* robe intérieure, ceinture turquoise au rouage */
  s+=P('M63 64Q80 58.6 97 64L102 206Q80 210 58 206Z',U(q,'rb'))+P('M70 64Q80 70 90 64L94 206Q80 209 66 206Z','#2a1650')+L_('M70.4 64.4L66.4 205.4M89.6 64.4L93.6 205.4',AU(q),.7);
  s+=['XII','III','VI','IX','XII','III'].map((t,k)=>`<text x="${48+k*13}" y="${r1(206.6-Math.abs(2.5-k)*.8)}" text-anchor="middle" font-size="3.4" font-weight="700" font-family="Georgia,serif" fill="#e0b850">${t}</text>`).join('');
  s+=P('M62 108Q80 114 98 108L98.6 116Q80 122 61.4 116Z',TQ(q))+L_('M62 108.4Q80 114.4 98 108.4','#ffffff',.5,'opacity=".6"')+gear(80,113,5,'#e0b850',1,10)+L_('M76 118L74 140M84 118L86 136',TQ(q),2.2)+C_(74,141,1.2,AU(q))+C_(86,137,1.2,AU(q));
  /* col d'horlogerie et pendentif */
  s+=P('M66 58Q80 66 94 58L95.6 63Q80 71 64.4 63Z',AU(q),'stroke="#6a4a10" stroke-width=".35"')+[68,73,77.4,80,82.6,87,92].map(x=>P(`M${x-1.1} 64.2L${x} 66.6L${x+1.1} 64.2Z`,AU(q))).join('');
  s+=C_(80,84,8,TG(q),`opacity="${.3+u*.1}"`)+hourglass(q,80,84,.95)+L_('M74 66Q77 76 80 77.6Q83 76 86 66',AU(q),.4,'stroke-dasharray=".6 .5"');
  /* manches larges */
  s+=P('M60 66Q48 84 44 112L58 114Q60 92 66 74Z',RB(q))+P('M44 112L58 114L57 118L43 116Z',AU(q))+L_('M60.4 66.4Q48.6 84 44.4 111.6','#b8a0e8',.6,'opacity=".7"');
  s+=P('M100 66Q112 84 116 112L102 114Q100 92 94 74Z',RB(q))+P('M116 112L102 114L103 118L117 116Z',AU(q))+L_('M99.6 66.4Q111.4 84 115.6 111.6','#b8a0e8',.6,'opacity=".7"');
  /* main droite : la montre à gousset qui se balance au bout de sa chaîne */
  s+=E_(50,119.6,4,3.4,SK(q))+`<g><animateTransform attributeName="transform" type="rotate" values="-14 50 120;14 50 120;-14 50 120" dur="2.6s" repeatCount="indefinite"/>${L_('M50 120V136','#e0b850',.5,'stroke-dasharray=".7 .5"')}${C_(50,141,7,TG(q),'opacity=".6"')}${clockFace(q,50,141,5)}${P('M48.8 135.4H51.2V136.6H48.8Z',AU(q))}</g>`;
  /* main gauche : le sceptre en aiguille d'horloge */
  s+=E_(110,119.6,4,3.4,SK(q))+L_('M112 30L108 214',AU(q),2)+L_('M112.2 31L108.2 213','#fff0b8',.5,'opacity=".7"')
    +P('M112.6 6L117 24L112.4 30L107.8 23.6Z',AU(q),'stroke="#6a4a10" stroke-width=".4"')+C_(112.4,32,4.4,'#140820',`stroke="${AU(q)}" stroke-width="1"`)+clockFace(q,112.4,32,3.2)+C_(108,214,1.4,AU(q));
  s+=HG(face(q,u)+hoodFront(q,u));
  if(u>=3)s+=halo(80,10.4,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(KAI,kPortrait,kBody);
}catch(e){console.warn('kairos art',e)}})();
