
/* ================= V461 : OSSIAN LE JUGE AUX YEUX BANDÉS (mythique de l'événement de saison) =================
   Trente ans juge suprême du Tribunal des Lames. Il a fermé les yeux sur les duels truqués ;
   depuis la chute du Tribunal, il les garde bandés. Il note chaque faute, et il rend son verdict. */
const OSS=79;
(function(){try{
if(!HEROES[OSS]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG}=HA;
const GC={};
const defs=(q,u)=>HA.lin(q+'sk','#f2dac2','#dcbc9c','#ae8a6a')+HA.lin(q+'hr','#ffffff','#e4e2ea','#a8a6b4',1)
 +HA.lin(q+'ro','#3a2c40','#221a28','#0e0a12',1)+HA.lin(q+'cr',u>=2?'#c42a3c':'#a8202f','#7e1424','#4a0a14',1)
 +HA.lin(q+'au','#fff6c8','#ffd77a','#b8862a')+HA.lin(q+'iv','#ffffff','#f6efe2','#d8ccb6',1)
 +HA.lin(q+'wd','#8a5a34','#6a4224','#3e2614',1)+HA.rad(q+'bf',[[0,'#fff8d8',.95],[.5,'#ffd77a',.5],[1,'#ffd77a',0]]);
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,RO=q=>`url(#${q}ro)`,CR=q=>`url(#${q}cr)`,AU=q=>`url(#${q}au)`,IV=q=>`url(#${q}iv)`,WD=q=>`url(#${q}wd)`;
/* la balance (brisée : un plateau pend au bout d'une seule chaîne) */
function balance(q,x,y,s,tilt){const t=tilt||0;return`<g transform="translate(${x} ${y}) scale(${s})">`
  +L_('M0 -2V14',AU(q),1.2)+C_(0,-3,1.4,'none',`stroke="${AU(q)}" stroke-width=".8"`)
  +`<g transform="rotate(${t})">${L_('M-12 0H12',AU(q),1.3)+C_(-12,0,.9,AU(q))+C_(12,0,.9,AU(q))
   +L_('M-12 0L-15.4 9M-12 0L-8.6 9',AU(q),.4)+P('M-17 9H-7Q-8 12.6 -12 12.6Q-16 12.6 -17 9Z',AU(q))
   +L_('M12 0L15.4 10.4',AU(q),.4)+`<g transform="rotate(${-t-24} 15.4 10.4)">${P('M10.4 10.4H20.4Q19.4 14 15.4 14Q11.4 14 10.4 10.4Z',AU(q))}</g>`}</g>`+'</g>'}
function gavel(q,x,y,a,s){return`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s||1})">`
  +P('M-1.3 0H1.3V22H-1.3Z',WD(q))+P('M-7 -4.2H7Q8.4 -4.2 8.4 -2.8V2.8Q8.4 4.2 7 4.2H-7Q-8.4 4.2 -8.4 2.8V-2.8Q-8.4 -4.2 -7 -4.2Z',WD(q))
  +L_('M-6.4 -4.2V4.2M6.4 -4.2V4.2',AU(q),1)+L_('M-7 -2.6H7','#b88a5a',.4,'opacity=".8"')+'</g>'}
/* ---------- la tête ---------- */
function hairBack(q){return P('M33.6 46Q32 30 42 23.6Q50 19.6 58 23.6Q68 30 66.4 46Q68 60 66.6 73L60.4 71Q62.2 58 61 47L39 47Q37.8 58 39.6 71L33.4 73Q32 60 33.6 46Z',HR(q))}
function ribbons(q){return P('M64.4 45.6Q70 52 69 64L66.6 64.6Q67.4 54 63 48Z',IV(q))+P('M64.6 46.4Q72.6 50 74.4 60L72 61.4Q70 53 63.8 49Z',IV(q))+L_('M66.8 52Q68 58 67.6 63','#d8ccb6',.4)}
function face(q,u){
  let s=`<rect x="45.2" y="55" width="9.6" height="13" fill="${SK(q)}"/>`+P('M45.2 59.6Q50 63 54.8 59.6L54.8 64.6Q50 66.4 45.2 64.6Z','#a8805e','opacity=".55"');
  s+=MI(P('M36.8 44.6Q33.4 44.2 33.8 48.2Q34.4 51.8 37.4 51.4Z','#d4b090'));
  s+=P('M37 44.2Q37 30.6 50 30.6Q63 30.6 63 44.2Q63 53.4 60.2 58.6Q56.4 64.2 50 64.8Q43.6 64.2 39.8 58.6Q37 53.4 37 44.2Z',SK(q));
  s+=P('M58.4 46Q61.8 52.6 59.2 57.8Q56.6 61.6 52.6 63.4Q57.6 58.8 59 52.6Z','#a8805e','opacity=".4"');
  /* rides du front, plis du nez */
  s+=L_('M43 36.4Q50 35 57 36.4M44.4 38.6Q50 37.6 55.6 38.6','#b89070',.4,'opacity=".7"');
  s+=L_('M45.4 52.4Q44.4 55.4 45.6 57.6M54.6 52.4Q55.6 55.4 54.4 57.6','#a8805e',.45,'opacity=".7"');
  s+=L_('M50.4 47.6L49.3 53.2Q50.2 54.2 52 53.6','#a8805e',.75);
  /* la bouche, sévère, un peu tombante */
  s+=L_('M47.2 58.6Q50 58.1 52.8 58.6','#5a2e28',.8);
  /* la barbe blanche, courte et nette */
  s+=P('M39.8 53Q41 64.4 50 69Q59 64.4 60.2 53Q58.8 58.4 55.6 59.4Q53 59 50 59.4Q47 59 44.4 59.4Q41.2 58.4 39.8 53Z',HR(q));
  s+=P('M44.2 59.6Q45.6 56 50 56.4Q54.4 56 55.8 59.6Q54 57.6 50 57.8Q46 57.6 44.2 59.6Z',HR(q));
  s+=L_('M44 62.6Q47 65.6 50 66.4Q53 65.6 56 62.6','#c8c6d2',.45,'opacity=".8"');
  /* les sourcils blancs, broussailleux, au-dessus du bandeau */
  s+=L_('M40.6 41.2Q43.8 39.8 47.2 40.8','#e2e0ea',1.05)+L_('M52.8 40.8Q56.2 39.8 59.4 41.2','#e2e0ea',1.05);
  /* le bandeau sur les yeux */
  s+=P('M35.4 43.4Q50 41.4 64.6 43.4L64.4 50.4Q50 48.6 35.6 50.4Z',IV(q))+L_('M35.4 43.4Q50 41.4 64.6 43.4M35.6 50.4Q50 48.6 64.4 50.4',AU(q),.6);
  s+=L_('M40 46.6Q50 45 60 46.6','#d8ccb6',.4,'opacity=".8"');
  if(u>=1)s+=E_(44,46.4,3.6,1.6,`url(#${q}bf)`,`opacity="${.25+u*.18}"`)+E_(56,46.4,3.6,1.6,`url(#${q}bf)`,`opacity="${.25+u*.18}"`);
  s+=C_(64.6,46.8,1.8,IV(q))+C_(64.6,46.8,1.8,'none',`stroke="${AU(q)}" stroke-width=".4"`);
  /* cheveux blancs, raie au milieu, tombant sur les épaules */
  s+=P('M36.4 44Q35 30.4 43.4 25.4Q50 22 56.6 25.4Q65 30.4 63.6 44Q62.2 35.4 56.6 32Q53 30.6 50 31Q47 30.6 43.4 32Q37.8 35.4 36.4 44Z',HR(q));
  s+=P('M36.6 42Q34.6 52 36.8 62L40.2 60.4Q38.6 52 40 45Z',HR(q))+P('M63.4 42Q65.4 52 63.2 62L59.8 60.4Q61.4 52 60 45Z',HR(q));
  s+=L_('M50 25.4V31M45 27.6Q41 30 39.4 35M55 27.6Q59 30 60.6 35','#c8c6d2',.5,'opacity=".8"');
  /* la toque de juge */
  s+=P('M38.4 30.4Q37.6 19.6 50 18.4Q62.4 19.6 61.6 30.4Q56 27.6 50 27.6Q44 27.6 38.4 30.4Z',RO(q))+L_('M38.6 29.6Q50 25.6 61.4 29.6',AU(q),1.5)+L_('M43 22Q50 19.6 57 22','#5a4a64',.5,'opacity=".8"');
  return s}
/* ---------- buste ---------- */
function ermine(q,pts){let s='';for(const [x,y] of pts)s+=P(`M${x} ${y}L${r1(x-.7)} ${r1(y+2.4)}L${x} ${r1(y+1.8)}L${r1(x+.7)} ${r1(y+2.4)}Z`,'#141018');return s}
function bust(q,u){
  let s=P('M6 100Q8 82 20 74L80 74Q92 82 94 100Z',RO(q));
  /* l'étole cramoisie brodée d'or */
  s+=P('M30 74L42 72L44 100H30Z',CR(q))+P('M70 74L58 72L56 100H70Z',CR(q))+L_('M30 74L30 100M42 72L44 100M70 74L70 100M58 72L56 100',AU(q),.6,'opacity=".9"');
  s+=balance(q,36.4,84,.42,-8)+balance(q,63.6,84,.42,8);
  /* le col d'hermine */
  s+=P('M14 84Q22 70 40 66L50 69L60 66Q78 70 86 84Q76 78 64 77L50 79L36 77Q24 78 14 84Z',IV(q))+ermine(q,[[24,76],[32,72.4],[42,70.2],[58,70.2],[68,72.4],[76,76],[30,77.4],[70,77.4]]);
  /* le rabat blanc */
  s+=P('M45.6 68L49.6 69L49 82L45 81.4Z',IV(q))+P('M54.4 68L50.4 69L51 82L55 81.4Z',IV(q))+L_('M47.4 72L47 80M52.6 72L53 80','#d8ccb6',.35);
  /* la chaîne de l'ordre et sa médaille */
  s+=L_('M38 74Q50 92 62 74',AU(q),.9,'stroke-dasharray="1.6 .8"')+C_(50,88,3.6,AU(q))+C_(50,88,2.4,'#7e1424')+balance(q,50,86.4,.16,0);
  return s}
/* ---------- portrait ---------- */
const PO={name:'Ossian le Juge aux Yeux Bandés',cls:'Mage',r:5,TC:'#ffd77a',
  bg:['#fffaf0','#ffe8b8','#a8823a','#2a1e0c','#100a04'],glow:['#ffffff','#fff0c8','#ffd77a'],halo:'#fff2c0',halo2:'#ffe08a',
  frame:['#fff2c0','#ff8ae0'],parts:['#fff6d8','#ff8a9a'],rayCol:'#fff8e0'};
const cols=(xs,y0,y1,op,col)=>xs.map(([x,w,br],k)=>`<g opacity="${op}">${P(`M${x-w} ${y1}V${y0+br}L${x-w*.3} ${y0+br-3}L${x+w*.2} ${y0+br+2}L${x+w} ${y0+br-1}V${y1}Z`,col)}${L_(`M${x-w*.5} ${y1}V${y0+br+4}M${x+w*.4} ${y1}V${y0+br+4}`,'#00000033',.8)}</g>`).join('');
const papers=(pts,u)=>pts.slice(0,1+u).map(([x,y,a],k)=>`<g opacity=".9"><animateTransform attributeName="transform" type="translate" values="0 0;2 -6;0 0" dur="${(3.4+k*.5).toFixed(1)}s" repeatCount="indefinite"/><g transform="translate(${x} ${y}) rotate(${a})"><rect x="-3" y="-4" width="6" height="8" fill="#f4ead8"/><path d="M-1.8 -2H1.8M-1.8 0H1.8M-1.8 2H.8" stroke="#c42a3c" stroke-width=".5"/></g></g>`).join('');
function ossPortrait(u){u=Math.max(0,Math.min(3,u|0));if(GC['p'+u])return GC['p'+u];const q='osp'+u+'_';
  return GC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>cols([[10,5,30],[90,5,22]],10,100,.35,'#e8d4a0')+papers([[16,28,-15],[84,30,20],[18,58,10],[84,58,-10]],u)+(u>=2?balance(q,50,8,.9,-6):''),
    content:(q,u)=>hairBack(q)+ribbons(q)+bust(q,u)+face(q,u)}))}
/* ---------- corps entier ---------- */
function ossBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(GC[ck])return GC[ck];const q='osb'+u+(bare?'s':'')+'_';
  return GC[ck]=HA.body({u,q,bare,r:5,name:'Ossian le Juge aux Yeux Bandés',defs:defs(q,u),glow:['#ffffff','#fff0c8','#ffd77a'],bb:['#ffe8b8','#5a3a12','#100a04'],
   halo:'#fff2c0',halo2:'#ffe08a',parts:['#fff6d8','#ff8a9a'],ring:['#fff2c0','#ffd77a','#ff8a9a'],
   back:(q,u)=>cols([[18,7,40],[142,7,30],[36,5,80],[124,5,70]],20,206,.3,'#e8d4a0')+papers([[22,70,-15],[138,64,20],[28,130,10],[132,124,-10]],u)
     +(u>=2?`<g opacity=".45">${balance(q,80,2,2.2,-8)}</g>`:''),
   content:(q,u)=>{let s='';
    s+=HG(hairBack(q)+ribbons(q));
    /* la grande robe noire jusqu'au sol, évasée */
    s+=P('M60 64Q80 58.6 100 64L104 120Q110 170 116 206Q98 212 80 212Q62 212 44 206Q50 170 56 120Z',RO(q));
    s+=L_('M66 112Q62 160 56 204M94 112Q98 160 104 204M80 120V210','#3e3048',.6,'opacity=".7"');
    s+=P('M70 206Q75 202 80 206L79 211H71Z','#0a080c')+P('M90 206Q85 202 80 206L81 211H89Z','#0a080c');
    /* l'étole cramoisie, du cou jusqu'aux genoux */
    s+=P('M66 64L74 62L76 178L66 182Z',CR(q))+P('M94 64L86 62L84 178L94 182Z',CR(q))+L_('M66 64L66 182M74 62L76 178M94 64L94 182M86 62L84 178',AU(q),.6,'opacity=".9"');
    s+=P('M66 182L71 176L76 178Z',AU(q))+P('M94 182L89 176L84 178Z',AU(q));
    s+=[92,124,156].map(y=>balance(q,70.6,y,.34,-6)+balance(q,89.4,y,.34,6)).join('');
    /* la ceinture de soie */
    s+=P('M58 108Q80 114 102 108L102.6 115Q80 121 57.4 115Z',CR(q))+L_('M58 109.4Q80 115.4 102 109.4',AU(q),.5);
    /* le col d'hermine */
    s+=P('M50 84Q58 66 70 61.6L80 64L90 61.6Q102 66 110 84Q100 77 90 76L80 78L70 76Q60 77 50 84Z',IV(q))+ermine(q,[[58,74],[66,68.6],[74,66],[86,66],[94,68.6],[102,74],[63,76.4],[97,76.4]]);
    /* le rabat */
    s+=P('M76.4 64L79.6 65L79 77L75.8 76.4Z',IV(q))+P('M83.6 64L80.4 65L81 77L84.2 76.4Z',IV(q));
    s+=L_('M70 72Q80 88 90 72',AU(q),.9,'stroke-dasharray="1.6 .8"')+C_(80,84,3.4,AU(q))+C_(80,84,2.2,'#7e1424');
    /* bras droit : le marteau, tenu bas */
    s+=P('M52 80Q44 100 46 120L57 121Q56 102 61.6 84Z',RO(q))+P('M45 116L57.6 117L58 124L45 123Z',IV(q))+ermine(q,[[48,118],[54,118.6]]);
    s+=gavel(q,51.4,131,8,1.05)+E_(51.6,128,4.4,3.8,SK(q))+L_('M48.4 129.2Q51.6 131.2 54.8 129.2','#a8805e',.45);
    /* bras gauche : la balance brisée, tenue par l'anneau */
    s+=P('M104 78Q114 90 116 104L107 108Q104 96 98 86Z',RO(q))+P('M106 104L117 100L119.6 107L108.4 111Z',IV(q));
    s+=E_(114,112,4.2,3.6,SK(q))+balance(q,114,118,1.15,u>=3?0:-10);
    /* la tête */
    s+=HG(face(q,u));
    if(u>=3)s+=`<circle cx="80" cy="36" r="31" fill="none" stroke="#ffd77a" stroke-width=".8" stroke-dasharray="1.6 3.4" opacity=".85"/>`;
    return s}})}
window.ossPortrait=ossPortrait;window.ossBody=ossBody;
HA.install(OSS,ossPortrait,ossBody,{ossian:()=>ossBody(0,1)});
try{UTH_H[OSS]={n:'Le Juge Céleste',m:'#221a28',s:'#ffd77a',a:'#c42a3c',e:'#fff6c8',bg:'holy',w:'wings-gold',hat:'halo',fx:'stars',c:'#ffd77a',c2:'#ff6a7e',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('ossian art',e)}})();

/* ---------- Fautes, Témoignage, Grâce et Verdict ---------- */
(function(){try{
if(!HEROES[OSS])return;
const GD='#ffd77a',GD2='#fff6c8',RD='#ff3a4a',WH='#fffaf0';
const FMAX=5,FPCT=25,EXEC=25;
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const isO=u=>!!u&&u.hid===OSS;
const snd=(k,d,v)=>{try{if(typeof AU!=='undefined'&&AU&&AU.ctx&&cSnd.ok()&&SND[k])SND[k](AU.F.v,NOW(d||0),v||1)}catch(e){}};
const judge=side=>B&&B.units.find(x=>isO(x)&&x.side===side&&x.hp>0);
const addF=(t,n)=>{t.fau=Math.min(FMAX,(t.fau||0)+n)};
let CAST=null;
/* chaque coup porté à un allié du juge est une faute */
try{window.RDEonHit((s,t,d,o)=>{try{if(!B||!s||!t||s.side===t.side||s.hp<=0||!judge(t.side))return;addF(s,1)}catch(e){}})}catch(e){}
/* Témoignage : ses attaques normales notent aussi une faute ; le Verdict pèse les fautes */
{const d0=deal;deal=function(s,t,pct,o){o=o||{};let p=pct;
  try{if(CAST&&s===CAST&&o.sk&&t)p=pct*(1+FPCT/100*Math.min(FMAX,t.fau||0))}catch(e){}
  const d=d0.call(this,s,t,p,o);
  try{if(isO(s)&&t&&t.side!==s.side&&t.hp>0&&!o.sk&&!o.ct&&!o.ub&&('force' in o)&&pct===100)addF(t,1)}catch(e){}
  return d}}
/* Grâce : une fois par combat, le premier allié qui devrait tomber reste debout avec 1 PV */
{const h0=hurt;hurt=function(t,d,c){try{if(B&&t&&t.hp>0&&d>0&&!t.boss&&!(B.osGr&&B.osGr[t.side])){const J=judge(t.side);if(J){const eff=d-Math.min(t.sh>0?t.sh:0,d);
  if(t.hp-eff<=0){B.osGr=B.osGr||{};B.osGr[t.side]=1;d=Math.max(0,d-(eff-(t.hp-1)));
    log(`⚖️ <b>${J.name}</b> accorde sa <b>Grâce</b> : ${t.name} reste debout avec 1 PV.`,'cs');
    if(!B.skip){try{float(t,'⚖️ Grâce','heal');if(ok()){const b=uc(t);glowPulse(b.x,b.y,GD,520,b.s*.5);ringFx(b.x,b.y,GD,b.s*.7,520,3)}}catch(e){}}}}}}catch(e){}
  return h0.call(this,t,d,c)}}
{const sk0=skill;skill=function(u,sk,sc){if(!(isO(u)&&sk&&sk.fx&&sk.fx.verdict&&B))return sk0.apply(this,arguments);
  const F=new Map();for(const t of alive(1-u.side))F.set(t,Math.min(FMAX,t.fau||0));B.osF=F;
  CAST=u;let r;try{r=sk0.apply(this,arguments)}finally{CAST=null}
  const ex=[];try{for(const [t,n] of F){if(t.hp>0&&n>=FMAX&&!t.boss&&t.max<1e12&&t.hp/t.max<=EXEC/100){const v=t.hp;t.sh=0;hurt(t,v,'crit');if(t.hp<=0){u.dmg+=v;ex.push(t);if(B.track)B.track.seq.push(t)}}}}catch(e){}
  B.osEx=ex;
  try{const tot=[...F.values()].reduce((a,b)=>a+b,0);if(tot)log(`⚖️ <b>Verdict</b> : ${tot} faute${tot>1?'s':''} pesée${tot>1?'s':''} (+${FPCT} % de dégâts par faute).`,'sk');
    for(const t of ex)log(`⚖️ <b>${t.name}</b> est déclaré <b>COUPABLE</b>.`,'sk');for(const t of B.units)if(t.side!==u.side)t.fau=0}catch(e){}
  return r}}
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B){const any=B.units.some(isO);if(any)for(const u of B.units){const n=u.fau||0;if(!n||u.hp<=0)continue;const el=document.getElementById('u-'+u.key);if(!el)continue;
  const sx=el.querySelector('.sx');if(sx&&!sx.querySelector('.ostg'))sx.insertAdjacentHTML('beforeend',`<span class="ostg" style="color:${n>=FMAX?'#ff5a6a':'#ffd77a'}">⚖️${n}</span>`)}}}catch(e){}return r}}

/* ---------- l'ultime : Verdict ---------- */
function gavelC(c,x,y,s,a){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);c.fillStyle='#6a4224';c.fillRect(-1.4,0,2.8,24);c.fillStyle='#8a5a34';c.beginPath();c.moveTo(-8,-4.6);c.lineTo(8,-4.6);c.lineTo(8,4.6);c.lineTo(-8,4.6);c.closePath();c.fill();
  c.strokeStyle=GD;c.lineWidth=1.2;c.beginPath();c.moveTo(-6.6,-4.6);c.lineTo(-6.6,4.6);c.moveTo(6.6,-4.6);c.lineTo(6.6,4.6);c.stroke();c.restore()}
function balanceC(c,x,y,s,tilt,al){c.save();c.globalAlpha=al;c.translate(x,y);c.scale(s,s);c.strokeStyle=GD;c.fillStyle=GD;c.lineWidth=1.6;c.beginPath();c.moveTo(0,-4);c.lineTo(0,22);c.stroke();
  c.beginPath();c.moveTo(-6,22);c.lineTo(6,22);c.stroke();c.rotate(tilt);c.beginPath();c.moveTo(-20,0);c.lineTo(20,0);c.stroke();
  c.lineWidth=.7;c.beginPath();c.moveTo(-20,0);c.lineTo(-24,13);c.moveTo(-20,0);c.lineTo(-16,13);c.moveTo(20,0);c.lineTo(23,14);c.stroke();
  c.save();c.translate(-20,13);c.rotate(-tilt);c.beginPath();c.moveTo(-6,0);c.lineTo(6,0);c.quadraticCurveTo(0,6,-6,0);c.fill();c.restore();
  c.save();c.translate(23,14);c.rotate(-tilt+.5);c.beginPath();c.moveTo(-6,0);c.lineTo(6,0);c.quadraticCurveTo(0,6,-6,0);c.fill();c.restore();c.restore()}
LEG2[OSS]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,fm=rowMid(1-u.side),F=(B&&B.osF)||new Map(),EX=(B&&B.osEx)||[];
  const tot=[...F.values()].reduce((p,q)=>p+q,0),cx=W/2,cy=Math.min(a.y,fm.y)+Math.abs(a.y-fm.y)*.5;
  /* le coup de marteau : le temps ralentit */
  fxItem(520,(c,p)=>{const an=p<.5?-1.2+p*2.4:0;c.globalAlpha=p>.8?(1-p)/.2:1;gavelC(c,a.x+a.s*.35,a.y-a.s*.55,a.s*.06,an)});
  await fxWait(300);if(!B)return;
  snd('thud',0,1.3);flash('#fff6e0',200,.55);vignette('#1a1004',2200,.7);try{dimOn(.66)}catch(e){}
  /* le tribunal en ruine, la balance géante */
  fxItem(2000,(c,p)=>{const al=Math.min(1,p/.2)*(p>.85?(1-p)/.15:1)*.32;c.globalAlpha=al;c.fillStyle='#e8d4a0';for(let k=0;k<6;k++){const x=W*(k+.5)/6,h=H*(.5+((k*37)%30)/100),w=Math.max(10,W*.035);c.fillRect(x-w/2,H-h,w,h);c.fillRect(x-w*.8,H-h,w*1.6,6)}});
  let tilt=0;
  const BY=cy-Math.min(W,H)*.05,BS=Math.min(W,H)*.0085;
  fxItem(2000,(c,p)=>{const al=Math.min(1,p/.15)*(p>.88?(1-p)/.12:1);balanceC(c,cx,BY,BS,tilt,al*.92)});
  await fxWait(380);if(!B)return;
  /* les fautes s'envolent vers le plateau */
  const bx=cx-BS*20,by=BY+BS*13;let flown=0;
  for(const t of tg){const n=F.get(t)||0,b=uc(t);for(let k=0;k<n;k++){const d=(flown++)*60,r0=rnd(-.6,.6);
    fxItem(620,(c,p)=>{const e=ease(p);const x=b.x+(bx-b.x)*e,y=b.y+(by-b.y)*e-Math.sin(p*Math.PI)*40;c.globalAlpha=p>.9?(1-p)/.1:1;c.save();c.translate(x,y);c.rotate(r0+p*3);c.fillStyle='#f4ead8';c.fillRect(-4,-5,8,10);c.fillStyle=RD;c.fillRect(-2.4,-2.4,4.8,1);c.fillRect(-2.4,0,4.8,1);c.restore()},d)}}
  fxItem(Math.max(400,flown*60+620),(c,p)=>{tilt=-Math.min(.45,tot*.04)*ease(p)});
  if(flown)for(let k=0;k<Math.min(5,flown);k++)try{if(typeof AU!=='undefined'&&AU&&AU.ctx&&cSnd.ok())cSnd.card(k)}catch(e){}
  await fxWait(Math.min(1400,flown*60+640));if(!B)return;
  /* le marteau tombe */
  fxItem(360,(c,p)=>{const an=-1.4+ease(p)*1.4;c.globalAlpha=p>.85?(1-p)/.15:1;gavelC(c,cx,cy+20,Math.min(W,H)*.012,an)});
  await fxWait(300);if(!B)return;
  snd('boom',0,1);flash(GD2,220,.6);shake(2);camPunch({x:cx,y:cy},1.06,420);ringFx(cx,cy+20,GD,Math.min(W,H)*.35,620,6);
  /* des colonnes d'or, d'autant plus hautes que la faute est lourde */
  tg.forEach((t,i)=>{const n=F.get(t)||0,b=uc(t),h=b.s*(.9+n*.35);
    fxItem(700,(c,p)=>{const al=Math.sin(p*Math.PI);c.globalCompositeOperation='lighter';c.globalAlpha=al*.85;const g=c.createLinearGradient(0,b.y-h,0,b.y+b.s*.3);g.addColorStop(0,'rgba(255,215,122,0)');g.addColorStop(.4,'rgba(255,230,160,.85)');g.addColorStop(1,'rgba(255,246,200,.9)');c.fillStyle=g;const w=b.s*(.22+n*.05);c.fillRect(b.x-w/2,b.y-h,w,h+b.s*.3)},i*60);
    setTimeout(()=>{if(B)hit(X,t,1+n*.1)},(i*60+160)/S.speed)});
  await fxWait(520);if(!B)return;
  /* COUPABLE */
  for(const t of EX){const b=uc(t),sx=Math.max(b.s*.62,Math.min(W-b.s*.62,b.x));fxItem(900,(c,p)=>{const s=p<.15?1.6-p*4:1;c.globalAlpha=p>.75?(1-p)/.25:1;c.save();c.translate(sx,b.y-b.s*.2);c.rotate(-.18);c.scale(s,s);c.strokeStyle=RD;c.lineWidth=3;c.strokeRect(-b.s*.48,-b.s*.13,b.s*.96,b.s*.26);c.fillStyle=RD;c.font=`900 ${Math.round(b.s*.17)}px system-ui,sans-serif`;c.textAlign='center';c.textBaseline='middle';c.fillText('COUPABLE',0,1);c.restore()});snd('thud',0,1)}
  if(EX.length)await fxWait(520);if(!B)return;
  /* le bandeau glisse un instant */
  glowPulse(a.x-a.s*.1,a.y-a.s*.34,GD2,420,7);glowPulse(a.x+a.s*.1,a.y-a.s*.34,GD2,420,7);
  await fxWait(420)};

/* ---------- textes ---------- */
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.verdict)r+=` Chaque <b>faute</b> d'un ennemi ajoute <b>+${FPCT} %</b> de dégâts contre lui. Un ennemi à <b>5 fautes</b> qui finit sous <b>${EXEC} % de PV</b> est déclaré <b>coupable</b> et tombe (sauf les boss). Les fautes sont ensuite effacées.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill ospas"><div class="sn">⚖️ Le Juge</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px"><b>Fautes</b> : tant qu'il est debout, chaque coup porté à l'un de ses alliés donne une faute à celui qui frappe (5 au maximum). Ses attaques normales en notent une aussi. <b>Grâce</b> : une fois par combat, le premier allié qui devrait tomber reste debout avec <b>1 PV</b>.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===OSS){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk&&!mo.querySelector('.ospas'))sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`.skill.ospas{border-color:rgba(255,215,122,.5)!important;background:linear-gradient(135deg,rgba(255,215,122,.14),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{if(typeof STL!=='undefined')STL[OSS]=["Pendant trente ans, Ossian a été le juge suprême du Tribunal des Lames. Un différend, un duel : c'était la loi, et il la faisait respecter.",
  "Il savait que certains duels étaient truqués. Il a fermé les yeux, parce que les tricheurs payaient bien et que la loi restait la loi. Rouge-Garance a fait tomber son Tribunal en un seul combat.",
  "Depuis, il porte un bandeau, pour ne plus jamais juger sur ce qu'on lui montre. Il répare ses vieux verdicts un par un, poursuivi par les Juges Célestes. On lui a demandé de juger Lucan. Il n'a pas encore rendu sa décision."]}catch(e){}
try{if(typeof VOXD!=='undefined')VOXD[OSS]=['m','deep',["Ossian. J'ai les yeux bandés, mais je vois très bien ce que tu as fait.","Chaque coup que tu portes est noté.","Verdict !"]]}catch(e){}
try{const X={'Ossian le Juge aux Yeux Bandés':'Ossian the Blindfolded Judge','Verdict':'Verdict','VERDICT':'VERDICT','COUPABLE':'GUILTY','Le Juge Céleste':'The Celestial Judge','⚖️ Le Juge':'⚖️ The Judge','⚖️ Grâce':'⚖️ Grace',
  [`Chaque <b>faute</b> d'un ennemi ajoute <b>+${FPCT} %</b> de dégâts contre lui. Un ennemi à <b>5 fautes</b> qui finit sous <b>${EXEC} % de PV</b> est déclaré <b>coupable</b> et tombe (sauf les boss). Les fautes sont ensuite effacées.`]:`Each of an enemy's <b>faults</b> adds <b>+${FPCT} %</b> damage against them. An enemy with <b>5 faults</b> left under <b>${EXEC} % HP</b> is found <b>guilty</b> and falls (except bosses). Faults are then cleared.`,
  "<b>Fautes</b> : tant qu'il est debout, chaque coup porté à l'un de ses alliés donne une faute à celui qui frappe (5 au maximum). Ses attaques normales en notent une aussi. <b>Grâce</b> : une fois par combat, le premier allié qui devrait tomber reste debout avec <b>1 PV</b>.":"<b>Faults</b>: while he stands, every hit on one of his allies gives a fault to the attacker (5 at most). His normal attacks note one too. <b>Grace</b>: once per battle, the first ally who should fall stays up with <b>1 HP</b>.",
  "Pendant trente ans, Ossian a été le juge suprême du Tribunal des Lames. Un différend, un duel : c'était la loi, et il la faisait respecter.":"For thirty years, Ossian was the high judge of the Court of Blades. A dispute, a duel: that was the law, and he enforced it.",
  "Il savait que certains duels étaient truqués. Il a fermé les yeux, parce que les tricheurs payaient bien et que la loi restait la loi. Rouge-Garance a fait tomber son Tribunal en un seul combat.":"He knew some duels were rigged. He looked away, because cheaters paid well and the law was still the law. Rouge-Garance brought his Court down in a single fight.",
  "Depuis, il porte un bandeau, pour ne plus jamais juger sur ce qu'on lui montre. Il répare ses vieux verdicts un par un, poursuivi par les Juges Célestes. On lui a demandé de juger Lucan. Il n'a pas encore rendu sa décision.":"Since then he wears a blindfold, so he never again judges by what he is shown. He mends his old verdicts one by one, hunted by the Celestial Judges. He has been asked to judge Lucan. He has not yet given his ruling.",
  "Ossian. J'ai les yeux bandés, mais je vois très bien ce que tu as fait.":"Ossian. My eyes are bound, but I can see exactly what you did.","Chaque coup que tu portes est noté.":"Every blow you strike is noted.","Verdict !":"Verdict!"};Object.assign(I18N_EN,X);for(const k in X)if(k.includes('<')&&window.RDEput)RDEput(k,X[k])}catch(e){}
}catch(e){console.warn('ossian kit',e)}})();
