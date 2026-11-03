
/* ================= APPARENCE LÉGENDAIRE · VALKYR, REINE DU GIVRE =================
   Un dessin refait : couronne de cristaux de glace, ailes de cristal à facettes, lance de givre,
   cheveux de platine, armure d'argent glacé, cape bleu nuit bordée de fourrure, aurore boréale et flocons. */
(function(){try{
if(!window.SKX||!SKX.def('va_givre')||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,rays,frame,eye,sigilRing,footRing,halo,pOpen,pClose,bOpen,bStars}=LK;
const defs=(q,u)=>rad(q+'bg',[[0,u>=3?'#e0f6ff':'#b8e4ff'],[.18,'#4a8ad0'],[.44,'#163a7a'],[.74,'#0a1638'],[1,'#040818']],'50%','34%','80%')
 +rad(q+'gl',[[0,'#ffffff',.75],[.5,'#a8e8ff',.3],[1,'#6ad8ff',0]])
 +lin(q+'au',[[0,'#f0faff'],[.5,'#94d0f2'],[1,'#2a64a4']],1,1)
 +lin(q+'ar',[[0,'#ffffff'],[.45,u>=3?'#e2f2ff':'#d0e2f4'],[1,'#6a88b0']])
 +lin(q+'rd',[[0,'#5ab8ff'],[.5,'#1e5aa8'],[1,'#0a1c48']])
 +lin(q+'sk',[[0,'#fbe9de'],[.55,'#f1d6c6'],[1,'#d2ac9a']],1,0)
 +lin(q+'hr',[[0,'#f4faff'],[.5,'#c4dcf4'],[1,'#6a8cc0']])
 +lin(q+'fu',[[0,'#ffffff'],[1,'#d8e6f2']])
 +rad(q+'gm',[[0,'#ffffff'],[.45,'#8ae8ff'],[1,'#1a5aa8']],'38%','34%','70%')
 +lin(q+'cr',[[0,'#f4fcff',.94],[.5,'#7acaff',.78],[1,'#2a64c0',.74]],1,1)+lin(q+'c2',[[0,'#f0faff',.96],[1,'#86ccff',.86]],1,1)
 +lin(q+'ab',[[0,'#7affd8',0],[.55,'#7affd8',.55],[1,'#9a8aff',0]],0,1)
 +lin(q+'ac',[[0,'#8ae8ff',0],[.6,'#8ae8ff',.5],[1,'#ff9ae8',0]],0,1);
const AU=q=>U(q,'au'),AR=q=>U(q,'ar'),RD=q=>U(q,'rd'),SK=q=>U(q,'sk'),HR=q=>U(q,'hr'),FU=q=>U(q,'fu'),GM=q=>U(q,'gm'),CR=q=>U(q,'cr');
const MI0=s=>s+`<g transform="scale(-1 1)">${s}</g>`;
/* un cristal de glace : losange allongé à facettes */
const xtal=(x,y,h,wd,rot,q,op=1)=>`<g transform="translate(${x} ${y}) rotate(${rot})" opacity="${op}">${P(`M0 ${r1(-h)}L${wd} ${r1(-h*.35)}L${r1(wd*.6)} 0L${r1(-wd*.6)} 0L${-wd} ${r1(-h*.35)}Z`,CR(q),'stroke="#e8fbff" stroke-width=".3"')}${L_(`M0 ${r1(-h)}V0M0 ${r1(-h)}L${r1(-wd*.5)} ${r1(-h*.3)}`,'#ffffff',.3,'opacity=".9"')}</g>`;
/* la gemme : un cristal facetté entre deux ailettes de glace */
const gem=(q,x,y,r)=>`<g transform="translate(${x} ${y})">${MI0(P(`M${r1(-r*1.1)} ${r1(-r*.3)}L${r1(-r*3.4)} ${r1(-r*1.2)}L${r1(-r*2.6)} ${r1(-r*.1)}L${r1(-r*3.1)} ${r1(r*.6)}L${r1(-r*1.1)} ${r1(r*.4)}Z`,CR(q),'stroke="#e8fbff" stroke-width=".25"'))}</g>`
  +P(`M${x} ${r1(y-r*1.5)}L${r1(x+r*1.1)} ${y}L${x} ${r1(y+r*1.5)}L${r1(x-r*1.1)} ${y}Z`,GM(q),'stroke="#ffffff" stroke-width=".3"')+L_(`M${x} ${r1(y-r*1.5)}V${r1(y+r*1.5)}M${r1(x-r*1.1)} ${y}H${r1(x+r*1.1)}`,'#ffffff',.2,'opacity=".7"')+C_(r1(x-r*.35),r1(y-r*.45),r1(r*.26),'#fff');
/* un flocon (petit glyphe pour les anneaux) */
const flk=(x,y,r)=>`M${x} ${r1(y-r)}V${r1(y+r)}M${r1(x-r*.87)} ${r1(y-r*.5)}L${r1(x+r*.87)} ${r1(y+r*.5)}M${r1(x-r*.87)} ${r1(y+r*.5)}L${r1(x+r*.87)} ${r1(y-r*.5)}`;
function sigil(q,cx,cy,R,u,op){op=op==null?.5+u*.12:op;let s=sigilRing(cx,cy,R,op,'#bff0ff','#ffffff',36);
  let d='';for(let k=1;k<12;k++){if(k===6)continue;const a=(k*30-90)*Math.PI/180;d+=flk(r1(cx+R*.925*Math.cos(a)),r1(cy+R*.925*Math.sin(a)),r1(R*.045))}
  s+=`<path d="${d}" stroke="#e8fbff" stroke-width="${r1(R*.016)}" fill="none" opacity="${r1(op)}"/>`;
  /* au sommet : un grand flocon de cristal */
  const y=r1(cy-R*.94),k=R/28;
  s+=`<g transform="translate(${cx} ${y}) scale(${r1(k)})">${[0,60,120].map(a=>`<g transform="rotate(${a})">${P('M0 -6.4L1.2 -1.6L0 0L-1.2 -1.6Z',CR(q),'stroke="#ffffff" stroke-width=".2"')}${P('M0 6.4L1.2 1.6L0 0L-1.2 1.6Z',CR(q),'stroke="#ffffff" stroke-width=".2"')}</g>`).join('')}${C_(0,0,1.1,'#ffffff')}</g>`;
  return s}
/* l'aurore boréale : deux rideaux de lumière qui ondulent */
function aurora(q,sc,op){return`<g opacity="${op}" transform="scale(${sc})">`+P('M-4 30Q14 18 30 26Q46 34 60 20Q76 8 104 18L104 4Q78 -4 60 8Q44 20 30 14Q14 6 -4 18Z',U(q,'ab'))
  +P('M-4 40Q20 30 36 36Q54 42 70 30Q86 20 104 28L104 18Q86 10 70 20Q52 32 36 26Q18 20 -4 30Z',U(q,'ac'),'opacity=".8"')
  +L_('M8 22V10M18 20V8M28 24V12M40 26V14M52 24V10M64 16V4M76 12V2M88 14V4',`#c8fff0`,.5,'opacity=".35"')+`</g>`}
/* ---------- la tête ---------- */
function hairBack(q,l=1){const y=k=>r1(46+k*l);return P(`M33.4 46Q30.4 28 41 22.4Q50 18.4 59 22.4Q69.6 28 66.6 46Q69 ${y(16)} 73 ${y(32)}Q75 ${y(44)} 71 ${y(54)}H29Q25 ${y(44)} 27 ${y(32)}Q31 ${y(16)} 33.4 46Z`,HR(q))
  +L_(`M36 52Q33 66 31 ${y(38)}M64 52Q67 66 69 ${y(38)}M40 60Q38 74 37 ${y(46)}M60 60Q62 74 63 ${y(46)}`,'#8ab2da',.7,'opacity=".55"')+L_(`M35 56Q32.6 70 32 ${y(34)}M65 56Q67.4 70 68 ${y(34)}`,'#ffffff',.5,'opacity=".7"')
  +[[31,y(36)],[69,y(40)],[36,y(48)]].map(([x,yy])=>C_(x,yy,.5,'#ffffff','opacity=".9"')).join('')}
function face(q,u){
  let s=`<rect x="45.4" y="55" width="9.2" height="13" fill="${SK(q)}"/>`+P('M45.4 59.4Q50 62.8 54.6 59.4L54.6 64Q50 66 45.4 64Z','#c49a8e','opacity=".5"');
  s+=P('M37 44.4Q37 30.4 50 30.4Q63 30.4 63 44.4Q63 53 59.8 58.4Q55.6 63.8 50 64.4Q44.4 63.8 40.2 58.4Q37 53 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#c8a4a0','opacity=".4"');
  const io={ir:'#8ae8ff',ir2:'#1a7ac8',lid:'#2a3450',glow:u>=2?'#bff4ff':null};
  s+=eye(44,Object.assign({fierce:1,lash:1},io))+eye(56,Object.assign({fierce:1,lash:1},io));
  s+=MI(L_('M39.4 42.6Q43.4 40 48 41.2','#8aa0c0',1.45));
  s+=L_('M50.4 48.8L49.6 53Q50.4 53.8 51.6 53.3','#c49a8e',.65);
  /* bouche : un sourire froid et sûr */
  s+=P('M46.4 57Q50 58.4 53.6 56.8Q52.8 59.8 50 60.1Q47.2 59.8 46.4 57Z','#b8667e')+L_('M46.2 56.9Q50 58.2 53.8 56.6','#7a3a52',.6)+P('M47.8 59.2Q50 60 52.2 59.2Q50 59.8 47.8 59.2Z','#e8a8c0','opacity=".7"');
  /* givre sur les pommettes : trois traits de glace */
  s+=MI(L_('M39.6 51.4L45 50.4','#bff4ff',1)+L_('M40.4 53.6L44.8 52.8','#bff4ff',.75)+L_('M39.6 51.4L45 50.4','#ffffff',.35,'opacity=".9"')+C_(38.8,51.6,.45,'#ffffff'));
  s+=MI(E_(41.4,54.6,3,1.4,'#a8d8ff','opacity=".22"'));
  /* mèches de platine sous la couronne */
  s+=P('M36.6 44.6Q36.4 38.6 39.6 36.4L60.4 36.4Q63.6 38.6 63.4 44.6Q61 39.6 56.6 38.6Q53.6 41.6 48.4 42Q51 40 51.2 38.6Q45 41.6 39.8 41.4Q37.6 42.6 36.6 44.6Z',HR(q))
    +P('M36.8 42Q34 52 35 62Q36 70 33 78Q38.8 72 39.8 62Q40.6 52 39.6 44Z',HR(q))+P('M63.2 42Q66 52 65 62Q64 70 67 78Q61.2 72 60.2 62Q59.4 52 60.4 44Z',HR(q))
    +L_('M37.6 46Q36 56 36.6 64M62.4 46Q64 56 63.4 64M42 39Q46 38.2 49 39.4','#ffffff',.5,'opacity=".9"');
  return s}
/* la couronne de givre : dôme d'argent, diadème, pics de cristal ; plus haute en ultra II et III */
function crown(q,u){const big=u>=2?1.18:1;
  /* deux ailettes de cristal sur les tempes */
  const wing=MI([[-150,12],[-166,10],[-133,11]].map(([a,l],k)=>{const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),R=[35.6,31.6],tx=R[0]+l*c,ty=R[1]+l*sn,mx=R[0]+l*.6*c,my=R[1]+l*.6*sn,nx=-sn,ny=c,wd=2.4;
    return P(`M${r1(R[0]+nx)} ${r1(R[1]+ny)}L${r1(mx+nx*wd)} ${r1(my+ny*wd)}L${r1(tx)} ${r1(ty)}L${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)}Z`,CR(q),'stroke="#e8fbff" stroke-width=".3"')}).join(''));
  let s=wing+P('M35.2 41Q34.4 22.4 50 20.4Q65.6 22.4 64.8 41Q60 34.6 50 34Q40 34.6 35.2 41Z',AR(q),'stroke="#5a7aa0" stroke-width=".4"')
    +L_('M38 34Q39 25 47 22.2','#ffffff',.8,'opacity=".9"')+L_('M35.6 40.4Q40.4 34.2 50 33.8Q59.6 34.2 64.4 40.4',AU(q),1.2)+L_('M36.4 37.2Q41 31.4 50 31Q59 31.4 63.6 37.2','#ffffff',.5,'stroke-dasharray=".1 1.8" opacity=".9"');
  /* les pics de glace */
  const sp=[[50,22,15,2.6,0],[43.6,23.6,10.6,2,-9],[56.4,23.6,10.6,2,9],[38.6,27.6,7.4,1.7,-20],[61.4,27.6,7.4,1.7,20]];
  s+=sp.map(([x,y,h,w,r])=>xtal(x,y,r1(h*big),w,r,q)).join('');
  if(u>=3)s+=xtal(46.6,22.6,r1(8*big),1.4,-4,q,.9)+xtal(53.4,22.6,r1(8*big),1.4,4,q,.9);
  s+=gem(q,50,29.6,1.3);
  if(u>=1)s+=C_(50,r1(22-15*big),1.1,'#ffffff')+C_(50,r1(22-15*big),2.6,'#bff4ff','opacity=".35"');
  return s}
/* ---------- le buste ---------- */
function bust(q,u){
  let s=P('M8 100Q11 80 24 73L76 73Q89 80 92 100Z',RD(q))+L_('M14 99Q16 86 26 78M86 99Q84 86 74 78','#0a1c48',.8,'opacity=".6"')+L_('M9 99.4Q11.4 81.4 24.4 73.8M91 99.4Q88.6 81.4 75.6 73.8',AU(q),.75);
  /* flocons brodés sur la cape */
  s+=[[16,92],[84,92],[22,84],[78,84]].map(([x,y])=>`<path d="${flk(x,y,1.3)}" stroke="#bfeaff" stroke-width=".35" opacity=".8"/>`).join('');
  s+=P('M27 100L30 83Q35 74.6 50 74Q65 74.6 70 83L73 100Z',AR(q),'stroke="#5a7aa0" stroke-width=".4"')+L_('M50 75V100','#9ab4d4',.8)+L_('M33 100Q36 90 44 86M67 100Q64 90 56 86','#ffffff',.7,'opacity=".8"')
    +L_('M30.4 82.6Q35.4 75 50 74.4Q64.6 75 69.6 82.6',AU(q),.8)+L_('M36 96Q50 90 64 96',AU(q),.6,'opacity=".8"')+`<path d="${flk(50,95.6,1.6)}" stroke="#ffffff" stroke-width=".3" opacity=".8"/>`+gem(q,50,88,2.1);
  /* le col de fourrure blanche */
  s+=P('M31.6 72.6Q50 80.6 68.4 72.6L71 77.6Q66.6 80.6 62.6 79.6Q58.6 82.8 54.4 81.2Q50 83.6 45.6 81.2Q41.4 82.8 37.4 79.6Q33.4 80.6 29 77.6Z',FU(q),'stroke="#b8c8d8" stroke-width=".35"')
    +L_('M34.4 78Q35.6 76.4 37 77.6M40 80.2Q41.4 78.4 43 79.8M47 81.6Q48.4 79.8 50 81.2M53 81Q54.6 79.4 56 80.8M60 79.6Q61.4 78 63 79.4M65.4 77.6Q66.6 76.2 68 77.4','#c8d8e8',.4,'opacity=".9"');
  /* épaulières de glace à trois lames, givre sur les bords */
  const lame=(d,rim,hi)=>P(d,AU(q),'stroke="#3a6a9a" stroke-width=".45"')+L_(rim,'#ffffff',.7,'opacity=".9"')+(hi?L_(hi,'#ffffff',.5,'opacity=".8"'):'');
  s+=MI(lame('M31.4 86.2Q23 83.4 13.8 87.6Q8.2 90.6 6 97.4Q11.6 99.6 17.4 97.6Q25 94.2 31.4 86.2Z','M6.3 97.2Q11.6 99.2 17.4 97.2Q24.8 93.8 31 86.6')
    +lame('M34.6 80.2Q25.6 76.6 15 80.6Q8.8 83.4 6.2 90.4Q12 93 18.4 90.8Q27 87.4 34.6 80.2Z','M6.5 90.2Q12 92.6 18.4 90.4Q26.8 87 34.2 80.6')
    +lame('M38.4 74.6Q27.6 68.4 16 72.4Q9.6 75 7 82.6Q12.8 85.6 19.6 84Q30.4 81 38.4 74.6Z','M7.3 82.4Q12.8 85.2 19.6 83.6Q30.2 80.6 38 75','M10.6 77.6Q14.6 73.2 21.4 72.2')
    +xtal(12,74.4,6,1.4,-38,q)+xtal(17,72.2,4.6,1.1,-22,q)
    +P('M21.4 76.2L23 78L21.4 79.8L19.8 78Z',GM(q),'stroke="#ffffff" stroke-width=".25"')+C_(11.4,80.6,.6,'#ffffff')+C_(31.6,77.4,.6,'#ffffff'));
  return s}
/* les ailes de cristal : des éclats de glace à facettes ; plus grandes en ultra II et III */
function shard(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),s=Math.sin(t),nx=-s,ny=c,tx=R[0]+len*c,ty=R[1]+len*s,mx=R[0]+len*.62*c,my=R[1]+len*.62*s,bx=R[0]+len*.14*c,by=R[1]+len*.14*s;
  return P(`M${r1(R[0]+nx*1.3)} ${r1(R[1]+ny*1.3)}L${r1(mx+nx*wd)} ${r1(my+ny*wd)}L${r1(tx)} ${r1(ty)}L${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)}L${r1(R[0]-nx*1.3)} ${r1(R[1]-ny*1.3)}Z`,fill,`stroke="${edge}" stroke-width="${ew}" stroke-linejoin="round"`)
    +L_(`M${r1(bx)} ${r1(by)}L${r1(tx-c*len*.1)} ${r1(ty-s*len*.1)}`,'#ffffff',r1(ew*1.1),'opacity=".75"')}
function wings(q,u){const R=[34,64],big=u>=2?1.12:1;let w='';
  [[-176,46],[-158,53],[-139,57],[-120,53],[-101,45]].forEach(([a,l],k)=>{w+=shard(R,a,l*big,5.6,CR(q),k%2?'#9ad8ff':'#e8fbff',.5)});
  [[-166,31],[-147,35],[-127,34],[-108,28]].forEach(([a,l])=>{w+=shard(R,a,l*big,4.6,U(q,'c2'),'#e8fbff',.45)});
  if(u>=3)[[-152,22],[-134,24],[-116,20]].forEach(([a,l])=>{w+=shard(R,a,l,3.4,'#bff4ff','#ffffff',.35)});
  return`<g opacity="${u>=3?.97:.92}">${MI(w)}</g>`}
/* la lance de givre, derrière l'épaule */
function spearP(q){return L_('M70 100L87 16','#7e9cc0',1.8)+L_('M70.4 99.6L87.2 16.6','#ffffff',.4,'opacity=".8"')+`<g transform="translate(87.6 14) rotate(11)">${P('M0 -13L3.2 -3L1.6 4L-1.6 4L-3.2 -3Z',CR(q),'stroke="#ffffff" stroke-width=".35"')}${L_('M0 -12V3M0 -12L-1.6 -3','#ffffff',.4)}${P('M-3 3.4H3V5.4H-3Z',AU(q))}${MI0(P('M-2.8 4L-8 1.6L-6.6 4.4L-8.6 6.4L-2.8 6Z',CR(q),'stroke="#e8fbff" stroke-width=".3"'))}</g>`}
/* ---------- portrait ---------- */
function gPortrait(u){const q='vgp'+u+'_';
  let s=pOpen(q,'Valkyr, Reine du Givre',defs(q,u));
  s+=aurora(q,1,.75+u*.06)+rays(50,34,12,80,.07,'#e8fbff')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,34,28,u);
  s+=[[12,40,1.4],[88,50,1.2],[18,64,1],[84,30,1],[8,20,.8],[92,14,.8]].map(([x,y,r])=>`<path d="${flk(x,y,r)}" stroke="#ffffff" stroke-width=".35" stroke-linecap="round" opacity=".85"/>`).join('');
  if(u>=1)s+=C_(50,34,32.4,'none',`stroke="#bff4ff" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  s+=wings(q,u)+spearP(q)+hairBack(q)+bust(q,u)+face(q,u)+crown(q,u);
  if(u>=3)s+=E_(50,r1(13.4-6),12,3,'none','stroke="#bff4ff" stroke-width="1.4"')+E_(50,r1(13.4-6),12,3,'none','stroke="#ffffff" stroke-width=".5"');
  s+=frame('#8ae8ff');
  return s+pClose('Guerrier',u,[[16,40,2],[84,40,1.8],[20,62,1.3],[80,60,1.5]])}
/* ---------- corps entier ---------- */
function gBody(u,bare){const q='vgb'+u+(bare?'s':'')+'_';
  let s=bOpen(q,'Valkyr, Reine du Givre',defs(q,u)+rad(q+'bb',[[0,'#c8f0ff',.36+u*.08],[.55,'#2a4a8a',.28],[1,'#050a1c',0]],'50%','40%','60%')+lin(q+'mt',[[0,'#e8f6ff',.55],[1,'#5a7aa8',.15]]));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,32,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}<g transform="translate(0 -6) scale(1.6)">${aurora(q,1,.6+u*.08)}</g>`
      +`<g><animate attributeName="opacity" values=".55;1;.55" dur="5s" repeatCount="indefinite"/>${P('M-6 60Q30 44 60 54Q96 66 120 46Q140 32 166 40L166 28Q140 20 120 34Q96 54 60 42Q30 32 -6 48Z',U(q,'ab'),'opacity=".5"')}</g>`
      +P('M-4 196L18 150L32 170L52 128L70 160L84 140L104 172L122 136L140 164L164 146V236H-4Z',U(q,'mt'),'opacity=".5"')+L_('M18 150L24 162M52 128L58 144M122 136L128 150','#ffffff',.8,'opacity=".6"')
      +rays(80,36,14,120,.045,'#e8fbff')+C_(80,36,42+u*3,U(q,'gl'),'opacity=".75"')+sigil(q,80,35,34,u);
    if(u>=1)s+=C_(80,35,47+u*3,'none','stroke="#bff4ff" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"');
    s+=`</g>`+footRing(80,212,50,10,.9,'#8ae8ff','#ffffff',(x,y)=>flk(x,y,1.1))}
  s+=E_(80,219,38,6,'#000','opacity=".38"');
  /* la brume de givre et les cristaux qui poussent au sol */
  if(!bare)s+=E_(80,214,58,9,'#e8fbff','opacity=".18"')+[[38,214,12,3,-14],[46,216,8,2.2,-4],[118,214,13,3.2,12],[110,217,7,2,4],[30,218,7,2,-26]].concat(u>=2?[[126,218,8,2.2,26],[56,219,5,1.6,-8]]:[]).map(([x,y,h,w,r])=>xtal(x,y,h,w,r,q,.95)).join('');
  s+=`<g transform="translate(12.5 -14) scale(1.35)">${wings(q,u)}</g>`;
  /* la cape bleu nuit, ourlet de fourrure et flocons brodés */
  s+=P('M62 62Q50 120 42 208Q61 214 80 212Q99 214 118 208Q110 120 98 62Z',RD(q))+P('M62 64Q53 120 47 204L53 206Q58 128 67 70Z','#0a1c48','opacity=".55"')+P('M98 64Q107 120 113 204L107 206Q102 128 93 70Z','#0a1c48','opacity=".55"')
    +P('M41.4 206Q61 213 80 211Q99 213 118.6 206L119.4 211Q99 218 80 216Q61 218 40.6 211Z',FU(q),'stroke="#b8c8d8" stroke-width=".4"')
    +[[50,196],[66,200],[94,200],[110,196],[58,182],[102,182]].map(([x,y])=>`<path d="${flk(x,y,2)}" stroke="#bfeaff" stroke-width=".5" stroke-linecap="round" opacity=".75"/>`).join('');
  s+=HG(hairBack(q,1.3));
  /* jambes : grèves d'argent glacé */
  const leg=P('M65.4 128L76.6 128L75.4 168L74.4 202L65.6 202L65 168Z',AR(q))+L_('M66.8 134L66.2 166M75 134L74.4 166','#9ab4d4',.6)
    +E_(70,166,6,4.6,AR(q),'stroke="#7e9cc0" stroke-width=".5"')+L_('M64.2 167Q70 171 75.8 167',AU(q),.8)+P('M70 163.6L71.4 165.6L70 167.6L68.6 165.6Z',GM(q))
    +P('M63.4 199L75.2 199L75.8 208.6Q66 211.6 55.6 212.4Q57.2 205 63.4 199Z',AR(q),'stroke="#7e9cc0" stroke-width=".5"')+L_('M56.4 211.8Q66 211 75.4 208.4',AU(q),.8)+L_('M62 203.6Q68 202.6 75 203.2','#9ab4d4',.5)+L_('M64 184L75 184',AU(q),.7);
  s+=MB(leg);
  /* jupe bleue fendue et tassettes de glace */
  s+=P('M63 114Q58 150 56 176L70 178L80 150L90 178L104 176Q102 150 97 114Z',RD(q))+L_('M56.4 175.4L70 177.4M90 177.4L103.6 175.4',AU(q),1)+L_('M70 177.6L80 150.4L90 177.6','#0a1c48',.8,'opacity=".7"');
  s+=P('M63.4 114Q80 120.6 96.6 114L99.4 134Q80 140.6 60.6 134Z',AU(q),'stroke="#3a6a9a" stroke-width=".5"')+L_('M61.8 124Q80 130.4 98.2 124','#3a6a9a',.6)+L_('M63.8 116.2Q80 122.6 96.2 116.2','#ffffff',.6,'opacity=".9"')+L_('M69 118.6L67.6 137.4M80 121L80 139.8M91 118.6L92.4 137.4','#3a6a9a',.6)+[66,74,86,94].map(x=>C_(x,x<80?127+(x-66)/8:129-(x-86)/8,.8,'#ffffff')).join('');
  /* plastron d'argent, filigrane de givre, gemme de cristal */
  s+=P('M61.6 64Q80 58.6 98.4 64L97 90Q95.4 100 93.2 106Q92.4 110 92.6 114L67.4 114Q67.6 110 66.8 106Q64.6 100 63 90Z',AR(q),'stroke="#5a7aa0" stroke-width=".4"')+L_('M80 66V113','#9ab4d4',.8)+L_('M64 70Q65.6 86 66 98','#ffffff',.9,'opacity=".8"')
    +L_('M64.6 76Q72 84 80 84Q88 84 95.4 76',AU(q),.8)+L_('M67.4 104Q80 108 92.6 104',AU(q),.7)+L_('M68 92Q74 88 80 92Q86 88 92 92','#9ab4d4',.6)
    +`<path d="${flk(71,98,2.2)}${flk(89,98,2.2)}" stroke="#ffffff" stroke-width=".4" opacity=".75"/>`+gem(q,80,84,2.6);
  s+=P('M65.6 110.6Q80 116 94.4 110.6L94.6 116Q80 121.6 65.4 116Z','#2a3a5a')+L_('M65.8 111Q80 116.4 94.2 111',AU(q),.6)+gem(q,80,115.4,1.8);
  /* fourrure blanche autour du cou */
  s+=P('M65.6 56.4Q80 64.4 94.4 56.4L97.6 62.6Q93.4 65.6 89.6 64.6Q86 67.6 82.4 66.2Q80 68.6 77.6 66.2Q74 67.6 70.4 64.6Q66.6 65.6 62.4 62.6Z',FU(q),'stroke="#b8c8d8" stroke-width=".35"')
    +L_('M66 62.6Q67 61.2 68.4 62.4M71.6 64.6Q72.8 63 74.2 64.2M78 66Q79.2 64.4 80.6 65.8M85 64.6Q86.2 63.2 87.6 64.4M90.6 62.8Q91.8 61.4 93 62.6','#c8d8e8',.4);
  /* bras droit : la lance de givre */
  s+=P('M58 70Q50 84 49 100L56.6 101.6Q58.6 87 64 76Z',AR(q),'stroke="#5a7aa0" stroke-width=".4"')+P('M49 100Q47.6 108 48.6 114L55.8 114.4Q56.8 108 56.6 101.6Z',AU(q),'stroke="#3a6a9a" stroke-width=".4"')+L_('M48.4 104L56.6 104.6M48.6 110L56 110.4','#3a6a9a',.5);
  s+=L_('M51 214L53.4 10','#7e9cc0',2.4)+L_('M51.4 213L53.8 11','#ffffff',.5,'opacity=".75"')+P('M51.2 150H55.4V153H51.2Z',AU(q))+P('M52.8 44H56.8V47H52.8Z',AU(q))
    +`<g transform="translate(53.6 8) rotate(1)">${C_(0,-8,9,'#bff4ff','opacity=".22"')}${P('M0 -21L4.4 -6L2.2 6L-2.2 6L-4.4 -6Z',CR(q),'stroke="#ffffff" stroke-width=".45"')}${L_('M0 -20V5M0 -20L-2.2 -6M0 -20L2.2 -6','#ffffff',.45,'opacity=".9"')}${P('M-3.6 5.4H3.6V7.8H-3.6Z',AU(q))}${MI0(P('M-3.4 6L-11 2.4L-9 6.6L-12 9.6L-3.4 9Z',CR(q),'stroke="#e8fbff" stroke-width=".35"'))}</g>`;
  s+=E_(52.4,116.6,4.2,3.6,SK(q))+L_('M49.4 115.4L55.6 115.6M49.4 117.6L55.4 117.8','#c49a8e',.45);
  /* bras gauche : la main sur la hanche */
  s+=P('M102 70Q110 84 110.4 96L103.4 98Q102.4 86 96 76Z',AR(q),'stroke="#5a7aa0" stroke-width=".4"')+P('M103.4 98L110.4 96Q108.6 106 101.6 113L97 109.6Q101.8 104 103.4 98Z',AU(q),'stroke="#3a6a9a" stroke-width=".4"')+E_(98.6,111.8,4,3.4,SK(q));
  /* épaulières à lames de glace */
  const pa=P('M45.6 90Q46.4 79 56.6 74.4Q64.6 72 69.6 76.6Q64.4 83.6 57.2 87Q50.8 89.8 45.6 90Z',AU(q),'stroke="#3a6a9a" stroke-width=".4"')
    +P('M47.8 82.6Q50.6 71.6 61 68.6Q69 67.8 72.2 73Q67 78 60.6 80.4Q54 82.8 47.8 82.6Z',AU(q),'stroke="#3a6a9a" stroke-width=".4"')
    +P('M50.6 74.4Q53.8 64 64.2 62.6Q71.6 62.6 74.4 67Q69.2 71.8 62.6 73.8Q56 75.6 50.6 74.4Z',AU(q),'stroke="#3a6a9a" stroke-width=".4"')+L_('M51.8 72Q55 64.8 64.2 63.6Q70.6 63.6 73.6 66.6','#ffffff',.6,'opacity=".95"')
    +xtal(53.4,66.4,7,1.6,-34,q)+xtal(58.6,63.8,5.4,1.3,-16,q)+P('M60.6 67.8L62 69.6L60.6 71.4L59.2 69.6Z',GM(q),'stroke="#ffffff" stroke-width=".25"');
  s+=MB(pa);
  s+=HG(face(q,u)+crown(q,u));
  if(u>=3)s+=E_(80,r1(9.4-5),10,2.6,'none','stroke="#bff4ff" stroke-width="1.4"')+E_(80,r1(9.4-5),10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
  /* les flocons qui tombent (une animation chacun ; image fixe : hors du cadre) */
  if(!bare)s+=[...Array(6+u)].map((_,k)=>{const x=r1(10+((k*.618+.13)%1)*140),d=r1(6+((k*.37+.2)%1)*4),r=[3.4,2.6,4.2][k%3];
    return`<g transform="translate(${x} -16)"><g opacity=".92"><animateMotion dur="${d}s" begin="${r1(-(k+.5)*d/(6+u))}s" repeatCount="indefinite" path="M0 0q${k%2?12:-12} 130 ${k%2?3:-3} 262"/><path d="${flk(0,0,r)}" stroke="#ffffff" stroke-width="${r1(r*.2)}" stroke-linecap="round" fill="none"/></g></g>`}).join('');
  s+=bStars(u,bare);
  return s+'</svg>'}
const C={};
SKX.art('va_givre',{p:u=>C['p'+u]||(C['p'+u]=gPortrait(u)),b:u=>C['b'+u]||(C['b'+u]=gBody(u,false))});
}catch(e){console.warn('valkyr givre',e)}})();
