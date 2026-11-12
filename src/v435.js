/* ================= V435 : KAÏROS, L'HIVER IMMOBILE — un vrai dessin de légendaire =================
   Avant, l'apparence n'était qu'un Kaïros recoloré en bleu avec quelques flocons. Maintenant : un dessin complet
   dans le style maison (comme Aegis, Lyra, Garance) — manteau de givre bordé d'or, barbe givrée, couronne de glace,
   monocle-horloge gelé, grand cadran figé derrière lui et bâton-sablier pris dans la glace.
   Les animations de combat de l'apparence ne changent pas. */
(function(){try{
if(!window.HA||!window.SKSHOP||!SKSHOP.SK2||!SKSHOP.SK2.ka_hiver)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP,ROMN}=HA;
const KC={};
const defs=(q,u)=>HA.lin(q+'sk','#f8e6dc','#ecd2c4','#c8a494')+HA.lin(q+'wh','#ffffff','#e6f2fc','#a8c6e2',1)
 +HA.lin(q+'nv','#2e66a8','#1a3e78','#0a1c44',1)+HA.lin(q+'ic','#ffffff','#bfe8ff','#5aa8e6')+HA.lin(q+'au','#fff4c0','#ffd84a','#c08a1a')
 +HA.lin(q+'br','#ffffff','#f0f6fc','#c4d6ea',1)+HA.lin(q+'st','#eaf6ff','#9ac4e6','#4a78a8')
 +HA.rad(q+'gem',[[0,'#ffffff'],[.45,'#9ae8ff'],[1,'#2a7ac8']]);
const SK=q=>`url(#${q}sk)`,WH=q=>`url(#${q}wh)`,NV=q=>`url(#${q}nv)`,IC=q=>`url(#${q}ic)`,AU=q=>`url(#${q}au)`,BR=q=>`url(#${q}br)`,ST=q=>`url(#${q}st)`,GEM=q=>`url(#${q}gem)`;
const ROM=['XII','I','II','III','IV','V','VI','VII','VIII','IX','X','XI'];
/* le grand cadran gelé, fêlé, aiguilles arrêtées */
function dial(cx,cy,R,op,u,big){let s=`<g opacity="${op}">`;
  s+=C_(cx,cy,R,'rgba(200,236,255,.10)',`stroke="#dff4ff" stroke-width="${big?1.2:.9}"`)+C_(cx,cy,R*.86,'none',`stroke="#9fd6ff" stroke-width="${big?.6:.45}" stroke-dasharray="1 ${big?2.2:1.8}"`);
  for(let k=0;k<12;k++){const a=(k*30-90)*Math.PI/180,x1=cx+R*.9*Math.cos(a),y1=cy+R*.9*Math.sin(a),x2=cx+R*Math.cos(a),y2=cy+R*Math.sin(a);
    s+=L_(`M${r1(x1)} ${r1(y1)}L${r1(x2)} ${r1(y2)}`,'#ffffff',k%3?.5:1);
    if(big||k%3===0)s+=`<text x="${r1(cx+R*.74*Math.cos(a))}" y="${r1(cy+R*.74*Math.sin(a)+R*.05)}" text-anchor="middle" font-size="${r1(R*(big?.12:.15))}" font-family="Georgia,serif" fill="#e8f6ff" opacity=".9">${ROM[k]}</text>`}
  /* aiguilles figées à minuit moins une */
  s+=L_(`M${cx} ${cy}L${cx} ${r1(cy-R*.62)}`,'#ffffff',big?1.4:1)+L_(`M${cx} ${cy}L${r1(cx-R*.12)} ${r1(cy-R*.78)}`,'#bfe8ff',big?.9:.7)+C_(cx,cy,big?1.8:1.3,'#ffffff');
  /* les fêlures de la glace */
  s+=L_(`M${r1(cx+R*.18)} ${r1(cy-R*.1)}L${r1(cx+R*.5)} ${r1(cy+R*.12)}L${r1(cx+R*.62)} ${r1(cy+R*.04)}M${r1(cx+R*.5)} ${r1(cy+R*.12)}L${r1(cx+R*.58)} ${r1(cy+R*.42)}M${r1(cx-R*.2)} ${r1(cy+R*.15)}L${r1(cx-R*.46)} ${r1(cy+R*.4)}L${r1(cx-R*.7)} ${r1(cy+R*.3)}`,'#ffffff',.5,'opacity=".75"');
  /* pointes de givre autour du cadran */
  const n=12+u*2;for(let k=0;k<n;k++){const a=(k*360/n+7)*Math.PI/180,l=R*(k%2?.12:.2)*(1+u*.12);s+=P(`M${r1(cx+(R-1)*Math.cos(a-.05))} ${r1(cy+(R-1)*Math.sin(a-.05))}L${r1(cx+(R+l)*Math.cos(a))} ${r1(cy+(R+l)*Math.sin(a))}L${r1(cx+(R-1)*Math.cos(a+.05))} ${r1(cy+(R-1)*Math.sin(a+.05))}Z`,'#e6f6ff','opacity=".85"')}
  return s+'</g>'}
/* une roue dentée de glace */
function gear(cx,cy,r,op,spin){let d='';const n=10;for(let k=0;k<n*2;k++){const a=(k*180/n)*Math.PI/180,rr=k%2?r:r*1.22;d+=(k?'L':'M')+r1(cx+rr*Math.cos(a))+' '+r1(cy+rr*Math.sin(a))}
  return`<g opacity="${op}">${spin?`<animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="${spin>0?360:-360} ${cx} ${cy}" dur="${Math.abs(spin)}s" repeatCount="indefinite"/>`:''}<path d="${d}Z" fill="rgba(210,240,255,.35)" stroke="#e8f8ff" stroke-width=".5"/>${C_(cx,cy,r*.45,'none','stroke="#e8f8ff" stroke-width=".5"')}</g>`}
/* un flocon */
const flake=(x,y,r,c='#ffffff',op=.9)=>`<g opacity="${op}" stroke="${c}" stroke-width="${r1(r*.18)}" stroke-linecap="round">${[0,60,120].map(a=>{const t=a*Math.PI/180,dx=r*Math.cos(t),dy=r*Math.sin(t);return`<path d="M${r1(x-dx)} ${r1(y-dy)}L${r1(x+dx)} ${r1(y+dy)}"/>`}).join('')}</g>`;
/* la couronne de glace (pics de cristal + gemme-horloge) */
function crown(q,x,y,s,u){let o='';const sp=[[-12,7],[-8,10.5],[-4,14],[0,18+u*1.5],[4,14],[8,10.5],[12,7]];
  sp.forEach(([dx,h],k)=>{const w=k===3?2.6:1.9;o+=P(`M${r1(x+(dx-w)*s)} ${r1(y)}L${r1(x+dx*s)} ${r1(y-h*s)}L${r1(x+(dx+w)*s)} ${r1(y)}Z`,IC(q),'stroke="#ffffff" stroke-width=".3"')+L_(`M${r1(x+dx*s)} ${r1(y-h*s+1)}L${r1(x+(dx+.6)*s)} ${r1(y-1)}`,'#ffffff',.35,'opacity=".9"')});
  o+=P(`M${r1(x-14*s)} ${r1(y+.5*s)}Q${x} ${r1(y-2.4*s)} ${r1(x+14*s)} ${r1(y+.5*s)}L${r1(x+13*s)} ${r1(y+2.8*s)}Q${x} ${r1(y)} ${r1(x-13*s)} ${r1(y+2.8*s)}Z`,AU(q),'stroke="#8a5a10" stroke-width=".25"');
  o+=C_(x,r1(y-.4*s),r1(2.6*s),GEM(q),'stroke="#fff4c0" stroke-width=".5"')+L_(`M${x} ${r1(y-.4*s)}V${r1(y-2.2*s)}M${x} ${r1(y-.4*s)}L${r1(x+1.2*s)} ${r1(y+.2*s)}`,'#0a3a6a',.35);
  return o}
/* ---------- la tête ---------- */
function hoodBack(q){return P('M29 62Q25 34 38 21Q50 9 62 21Q75 34 71 62Z',WH(q))+L_('M29 62Q25 34 38 21Q50 9 62 21Q75 34 71 62','#ffd84a',.6,'opacity=".8"')
  +P('M35 60Q32.6 37 41.4 27.6Q50 20.6 58.6 27.6Q67.4 37 65 60Z',NV(q))+P('M37 58Q35.4 40 42.6 31Q50 25.4 57.4 31Q64.6 40 63 58Z','#081634','opacity=".55"')}
/* fourrure en festons */
function furArc(cx,cy,rx,ry,a0,a1,n,r){let d='';for(let k=0;k<=n;k++){const t=a0+(a1-a0)*k/n,x=cx+rx*Math.cos(t),y=cy-ry*Math.sin(t);d+=k?`A${r} ${r} 0 0 1 ${r1(x)} ${r1(y)}`:`M${r1(x)} ${r1(y)}`}return d}
function face(q,u){
  let s='';
  /* visage âgé */
  s+=P('M38.4 44Q38.4 31.6 50 31.6Q61.6 31.6 61.6 44Q61.6 52 58.6 57Q55 62.4 50 62.8Q45 62.4 41.4 57Q38.4 52 38.4 44Z',SK(q));
  s+=P('M57.6 46Q60.6 51.6 58.2 56.2Q56 59.6 52.8 61Q56.8 57.4 58 52Z','#c09a88','opacity=".4"');
  /* rides du front et des yeux */
  s+=L_('M43 36.4Q50 34.8 57 36.4M44.4 38.8Q50 37.6 55.6 38.8','#c8a090',.4,'opacity=".7"')+L_('M39.8 47.4L38.8 46.6M60.2 47.4L61.2 46.6','#c8a090',.4,'opacity=".7"');
  /* yeux de glace, qui luisent */
  const eo={w:3.2,h:1.9,iris:'#5ad0ff',iris2:'#1a7ac8',pupil:'#0a2a4a',lid:'#6a7a8a',lidW:.9,ir:1.5,glow:'#9ae8ff',lidHalf:1,lidCol:'#ead0c2'};
  s+=HA.eye(44.4,46.4,eo)+HA.eye(55.6,46.4,eo);
  /* le monocle-horloge, gelé */
  s+=C_(55.6,46.4,4.4,'rgba(170,230,255,.28)',`stroke="url(#${q}au)" stroke-width="1"`)+L_('M55.6 46.4V43.2M55.6 46.4L57.6 47.4','#ffffff',.4)
    +L_('M53.4 43.4L57.4 49.2','#ffffff',.35,'opacity=".8"')+L_('M60 47Q63 52 61.4 60','#ffd84a',.35,'opacity=".8"');
  /* sourcils broussailleux givrés */
  s+=P('M39.6 42.6Q42.6 39.2 47.6 41.2Q44 40.6 40.6 43.6Z',BR(q))+P('M60.4 42.6Q57.4 39.2 52.4 41.2Q56 40.6 59.4 43.6Z',BR(q))
    +L_('M40.4 42.4L39 43.6M59.6 42.4L61 43.6','#ffffff',.5);
  s+=L_('M50.4 47.6L49.6 52.4Q50.4 53.4 51.8 52.8','#b89080',.6);
  /* moustache et longue barbe, pointes de givre */
  s+=P('M50 53.4Q45 53 41.6 56.4Q39 59.6 37.6 58.2Q39.6 61.8 44 60.2Q48 58.8 50 56.4Q52 58.8 56 60.2Q60.4 61.8 62.4 58.2Q61 59.6 58.4 56.4Q55 53 50 53.4Z',BR(q));
  s+=P('M40.4 57Q40 66 43 74Q46 82 50 88Q54 82 57 74Q60 66 59.6 57Q55.6 61.6 50 61.8Q44.4 61.6 40.4 57Z',BR(q));
  s+=L_('M44 63Q45 72 48.4 80M50 63V85M56 63Q55 72 51.6 80M42 61Q42.4 67 44.6 72M58 61Q57.6 67 55.4 72','#c4d6ea',.45,'opacity=".9"');
  s+=P('M47.6 84Q50 90 52.4 84L50 92.4Z',IC(q))+P('M43.4 75.6L42 80.6L45.2 77.4Z',IC(q))+P('M56.6 75.6L58 80.6L54.8 77.4Z',IC(q));
  /* capuche de givre bordée de fourrure, qui encadre le visage */
  s+=P('M35.4 58Q32.6 36 41 27.4Q50 20.4 59 27.4Q67.4 36 64.6 58Q63.4 44 59.6 36.6Q55 31 50 31Q45 31 40.4 36.6Q36.6 44 35.4 58Z',WH(q),'stroke="#a8c6e2" stroke-width=".3"');
  s+=L_(furArc(50,42,15.2,13.6,Math.PI*1.08,-Math.PI*.08,10,2.4),'#ffffff',3.2)+L_(furArc(50,42,15.2,13.6,Math.PI*1.08,-Math.PI*.08,10,2.4),'#d6e6f4',.4,'transform="translate(0 1.2)" opacity=".8"');
  s+=L_('M38 50Q36.6 44 38.6 38M62 50Q63.4 44 61.4 38','#ffd84a',.45,'opacity=".9"');
  s+=crown(q,50,28.2,1.02,u);
  return s}
/* ---------- buste ---------- */
function bust(q,u){
  /* manteau de givre, col de fourrure, robe nuit, pendentif-sablier */
  let s=P('M6 100Q8 80 22 72L78 72Q92 80 94 100Z',WH(q));
  s+=P('M38 70Q50 76 62 70L60 100H40Z',NV(q))+L_('M38 70L40 100M62 70L60 100',AU(q),.9);
  /* filigrane d'or sur le manteau */
  s+=MI(L_('M14 92Q20 82 30 77M18 98Q24 88 32 84','#ffd84a',.6,'opacity=".75"')+P('M27 79.6l1.6 1.6-1.6 1.6-1.6-1.6z','#ffd84a'));
  /* épaulières de cristal */
  s+=MI(P('M12 80L17 66L21 77L25 62L28 76L33 68L32 79Z',IC(q),'stroke="#ffffff" stroke-width=".3"'));
  /* col de fourrure */
  s+=P('M22 74Q50 62 78 74Q78 80 72 79Q66 82 60 78Q55 82 50 78Q45 82 40 78Q34 82 28 79Q22 80 22 74Z','#ffffff','stroke="#d6e6f4" stroke-width=".4"')+L_('M28 76Q34 78 40 76M46 76Q50 78 54 76M60 76Q66 78 72 76','#d6e6f4',.4);
  /* sablier pendu sous la barbe */
  s+=L_('M44.6 74L50 90L55.4 74','#ffd84a',.45,'opacity=".8"');
  s+=`<g transform="translate(50 93)">`+P('M-3.6 -4.4H3.6M-3.6 4.4H3.6','none','stroke="url(#'+q+'au)" stroke-width="1.2"')+P('M-3 -4Q0 -.4 -.6 0Q0 .4 -3 4H3Q0 .4 .6 0Q0 -.4 3 -4Z','rgba(200,240,255,.55)','stroke="#ffffff" stroke-width=".3"')+P('M-2 2.8Q0 1 2 2.8V3.6H-2Z','#ffffff')+'</g>';
  if(u>=2)s+=C_(50,93,7,'none','stroke="#9ae8ff" stroke-width=".5" opacity=".7"');
  return s}
/* ---------- portrait ---------- */
const PO={name:"Kaïros, l'Hiver Immobile",cls:'Assassin',r:4,TC:'#9ae8ff',
  bg:['#ffffff','#c8ecff','#3a86c8','#0e2a5a','#040c1e'],glow:['#ffffff','#d0f2ff','#6ac8ff'],halo:'#e8f8ff',halo2:'#ffd84a',
  frame:['#ffe08a','#bfe8ff'],parts:['#ffffff','#bfe8ff'],rayCol:'#e8f8ff',rayOp:.1};
function kaiP(u){u=Math.max(0,Math.min(3,u|0));if(KC['p'+u])return KC['p'+u];const q='khp'+u+'_';
  return KC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>dial(50,36,33,.55+u*.08,u,1)+(u>=1?gear(13,70,6,.6,u>=2?14:0)+gear(87,72,5,.6,u>=2?-11:0):'')+[[12,18,2.6],[88,16,2.2],[8,50,1.8],[92,46,2],[20,86,1.6],[80,88,1.8]].slice(0,3+u).map(([x,y,r])=>flake(x,y,r)).join(''),
    content:(q,u)=>hoodBack(q)+bust(q,u)+face(q,u)+(u>=3?E_(50,13,12,2.8,'none','stroke="#ffd84a" stroke-width="1.2"')+E_(50,13,12,2.8,'none','stroke="#ffffff" stroke-width=".4"'):'')}))}
/* ---------- corps entier ---------- */
function staff(q,u){/* le bâton-sablier pris dans la glace, tenu à droite */
  let s=P('M121.6 40L124.4 40L123.8 210L122.2 210Z',ST(q))+L_('M122.8 44V206','#ffffff',.35,'opacity=".7"');
  for(const y of [70,110,150])s+=P(`M120.6 ${y}h5v2.4h-5z`,AU(q));
  s+=C_(123,30,11.5,'rgba(190,236,255,.18)','stroke="url(#'+q+'au)" stroke-width="1.3"')+C_(123,30,9.4,'none','stroke="#e8f8ff" stroke-width=".4" stroke-dasharray=".8 1.6"');
  for(let k=0;k<12;k++){const a=(k*30-90)*Math.PI/180;s+=L_(`M${r1(123+9.6*Math.cos(a))} ${r1(30+9.6*Math.sin(a))}L${r1(123+11.4*Math.cos(a))} ${r1(30+11.4*Math.sin(a))}`,'#ffffff',k%3?.35:.7)}
  s+=`<g transform="translate(123 30)">`+P('M-4.6 -6.4H4.6M-4.6 6.4H4.6','none',`stroke="url(#${q}au)" stroke-width="1.4"`)+P('M-3.8 -6Q0 -.6 -.8 0Q0 .6 -3.8 6H3.8Q0 .6 .8 0Q0 -.6 3.8 -6Z','rgba(210,244,255,.7)','stroke="#ffffff" stroke-width=".35"')+P('M-2.6 4.4Q0 1.6 2.6 4.4V5.4H-2.6Z','#ffffff')+P('M-2.4 -5.4H2.4Q0 -3.6 -2.4 -5.4Z','#ffffff')+'</g>';
  /* cristaux pris sur le haut du bâton */
  s+=P('M117 18L119.4 6L121 19Z',IC(q))+P('M125 19L127.8 4.6L129.6 20Z',IC(q))+P('M112.6 32L104.6 26L113.4 29Z',IC(q))+P('M133.4 29L142 24L134 32.6Z',IC(q));
  if(u>=1)s+=C_(123,30,15+u*1.5,'none',`stroke="#9ae8ff" stroke-width=".6" stroke-dasharray="2 3" opacity=".7"`);
  return s}
function kaiB(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(KC[ck])return KC[ck];const q='khb'+u+(bare?'s':'')+'_';
  return KC[ck]=HA.body({u,q,bare,r:4,name:"Kaïros, l'Hiver Immobile",defs:defs(q,u),glow:['#ffffff','#d0f2ff','#6ac8ff'],bb:['#d8f2ff','#1e4a8a','#040c1e'],
   halo:'#e8f8ff',halo2:'#ffd84a',parts:['#ffffff','#bfe8ff'],ring:['#e8f8ff','#6ac8ff','#ffd84a'],rayCol:'#e8f8ff',
   back:(q,u)=>dial(80,40,40,.5+u*.08,u,1)+(u>=1?gear(26,92,8,.55,16)+gear(136,104,6.5,.55,-12):'')+(u>=2?gear(30,150,5,.5,-10)+gear(132,160,7,.5,13):'')
     +(u>=2?[...Array(5)].map((_,k)=>{const a=-160+k*35;return`<path transform="translate(80 70) rotate(${a})" d="M0 0L${30+k%2*8} -3L${44+k%2*10} 0L${30+k%2*8} 3Z" fill="rgba(220,246,255,.55)" stroke="#ffffff" stroke-width=".4"/>`+`<path transform="translate(80 70) scale(-1 1) rotate(${a})" d="M0 0L${30+k%2*8} -3L${44+k%2*10} 0L${30+k%2*8} 3Z" fill="rgba(220,246,255,.55)" stroke="#ffffff" stroke-width=".4"/>`}).join(''):'')
     +(u>=3?`<path d="M14 40Q40 20 80 30Q120 20 146 40" fill="none" stroke="#9affd8" stroke-width="3" opacity=".25"><animate attributeName="d" dur="6s" repeatCount="indefinite" values="M14 40Q40 20 80 30Q120 20 146 40;M14 36Q40 28 80 24Q120 30 146 36;M14 40Q40 20 80 30Q120 20 146 40"/></path>`:'')
     +[...Array(3+u)].map((_,k)=>`<g><animateMotion dur="${(6+k*1.1).toFixed(1)}s" begin="${-k*1.7}s" repeatCount="indefinite" path="M${20+k*30} -8q${k%2?12:-12} 110 ${k%2?-8:8} 214"/>${flake(0,0,2.2+(k%2)*.6)}</g>`).join(''),
   content:(q,u)=>{let s='';
    /* capuche dans le dos */
    s+=HG(hoodBack(q));
    /* le manteau de givre, longue traîne bordée d'or et de glaçons */
    s+=P('M58 66Q40 92 36 140Q32 184 38 208L122 208Q128 184 124 140Q120 92 102 66Z',WH(q));
    s+=L_('M38 208L122 208',AU(q),1.4);
    let ic='';for(let k=0;k<10;k++){const x=42+k*8.6;ic+=P(`M${r1(x-2.2)} 208L${r1(x)} ${214+(k%3)*2}L${r1(x+2.2)} 208Z`,IC(q))}s+=ic;
    /* robe nuit au centre, ourlet de chiffres */
    s+=P('M66 70Q60 110 58 150Q56 186 58 206L102 206Q104 186 102 150Q100 110 94 70Z',NV(q));
    s+=P('M58 192L102 192L102 206L58 206Z','#0a1c44')+L_('M58 192H102','#ffd84a',.8);
    s+=['XII','III','VI','IX'].map((t,k)=>`<text x="${r1(65+k*10)}" y="201.6" text-anchor="middle" font-size="4.4" font-family="Georgia,serif" fill="#bfe8ff" opacity=".9">${t}</text>`).join('')+[70,80,90].map(x=>C_(x,200,.6,'#ffd84a')).join('');
    s+=L_('M66 70Q60 110 58 150Q56 186 58 206M94 70Q100 110 102 150Q104 186 102 206',AU(q),.9);
    /* filigrane d'or sur le manteau */
    s+=MB(L_('M44 120Q40 150 42 190M50 98Q44 130 46 170','#ffd84a',.5,'opacity=".6"')+P('M43.4 150l2 2-2 2-2-2z','#ffd84a')+P('M46 126l1.6 1.6-1.6 1.6-1.6-1.6z','#ffd84a'));
    /* ceinture d'or à boucle-horloge */
    s+=P('M64 108Q80 112 96 108L97 115Q80 119 63 115Z',AU(q))+C_(80,113,4.2,GEM(q),'stroke="#fff4c0" stroke-width=".7"')+L_('M80 113V110.4M80 113L81.8 114','#0a3a6a',.4);
    /* buste, col de fourrure, épaulières de cristal */
    s+=P('M62 64Q80 58 98 64L99 100Q80 106 61 100Z',WH(q));
    s+=P('M72 64Q80 70 88 64L86 104Q80 106 74 104Z',NV(q))+L_('M72 64L74 104M88 64L86 104',AU(q),.6);
    s+=P('M60 66Q80 56 100 66Q100 71 95 70.4Q90 73 85 70Q80 73 75 70Q70 73 65 70.4Q60 71 60 66Z','#ffffff','stroke="#d6e6f4" stroke-width=".4"');
    s+=MB(P('M50 76L55 60L59 72L63 56L66 70L71 62L70 75Z',IC(q),'stroke="#ffffff" stroke-width=".3"')+P('M52 78Q56 70 64 68L70 74Q60 76 54 82Z',WH(q)));
    /* bras gauche (côté spectateur) : grande manche, la main ouverte où tourne un flocon */
    s+=P('M58 72Q46 96 44 120L56 124Q58 102 66 82Z',WH(q))+P('M42 116Q48 112 58 118L56 128Q48 128 42 124Z','#ffffff','stroke="#d6e6f4" stroke-width=".3"');
    s+=E_(48,129,4,3.6,SK(q))+(u>=1?flake(48,121,3.4,'#bfe8ff',.95):'');
    /* bras droit : tient le bâton */
    s+=staff(q,u);
    s+=P('M102 72Q114 86 118 104L108 108Q104 94 96 84Z',WH(q))+P('M114 100Q120 98 124 104L118 112Q112 112 110 106Z','#ffffff','stroke="#d6e6f4" stroke-width=".3"');
    s+=E_(122.6,106,3.6,4.2,SK(q));
    /* la tête */
    s+=HG(face(q,u));
    if(u>=3)s+=E_(80,9.4,10,2.4,'none','stroke="#ffd84a" stroke-width="1.2"')+E_(80,9.4,10,2.4,'none','stroke="#ffffff" stroke-width=".4"');
    return s}})}
window.kaiHiverP=kaiP;window.kaiHiverB=kaiB;
SKSHOP.SK2.ka_hiver.art={p:u=>kaiP(u),b:u=>kaiB(u)};
try{if(SKSHOP.SKC)for(const k of Object.keys(SKSHOP.SKC))if(k.startsWith('ka_hiver'))delete SKSHOP.SKC[k]}catch(e){}
try{PATCH.unshift({v:'v60',d:Date.now(),t:"Forge d'Éther et Kaïros d'hiver",items:[
 "⚒️ <b>Forge d'Éther</b> : correction d'un bug — après un achat de fragments, la liste des héros ne se mettait plus à jour.",
 "◆ Nouvel écran pour choisir le légendaire à qui donner des fragments : portraits à faire défiler, barre d'Éveil, fragments en réserve, et un bouton <b>« Éveiller maintenant »</b> dès qu'il en a 5.",
 "❄️ <b>Kaïros, l'Hiver Immobile</b> entièrement redessiné : manteau de givre bordé d'or, couronne de glace, monocle-horloge gelé, grand cadran figé et bâton-sablier pris dans la glace. Ses animations de combat ne changent pas."]})}catch(e){}
}catch(e){console.warn('kaïros hiver',e)}})();
