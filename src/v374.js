
/* ================= ANIMATIONS SIGNATURES : Éryndel, Aegis et Lyra =================
   Avant : leurs ultimes utilisaient l'animation de base de leur classe (comme un héros épique).
   - Éryndel (héros) : la même cinématique que le Roi de Cendre en boss (le Requiem des Mille Ans), tournée vers les ennemis.
   - Aegis : il lève son bouclier, l'étoile d'Éther se dessine dans le ciel, un dôme de lumière se pose sur l'équipe,
     et des chaînes de lumière attirent les ennemis vers lui.
   - Lyra : un projecteur sur elle, une immense portée de musique traverse le champ de bataille, les notes tombent
     sur l'équipe, l'énergie des ennemis s'échappe vers elle, puis l'accord final. */
(function(){try{
const SIG={};
const ok=()=>B&&!B.skip&&FXS.ctx;
/* ---------- Éryndel : la cinématique du boss, côté joueur ---------- */
let eryFx=null;
try{if(typeof roiUltFx==='function'){const src=roiUltFx.toString().replace(/rowMid\(0\)/g,'rowMid(1-u.side)').replace(/alive\(0\)/g,'alive(1-u.side)').replace('const hov=H*.34','const hov=Math.min(H*.34,m.y-m.s*.95)');eryFx=(0,eval)('('+src+')')}}catch(e){console.warn('ery fx',e)}
if(typeof ERY!=='undefined'&&HEROES[ERY]&&eryFx){SIG[ERY]=1;
  LEG2[ERY]=async X=>{await eryFx(X.u)};
  try{LEGS[ERY]=()=>{}}catch(e){}
  {const ci=cutIn;cutIn=async function(u){if(u&&u.hid===ERY&&u.side===0&&!(B&&B.skip)&&!REDUCED)return;return ci.apply(this,arguments)}}}
/* ---------- Aegis : le Serment du Bouclier ---------- */
if(typeof AEG!=='undefined'&&HEROES[AEG]){SIG[AEG]=1;
  LEG2[AEG]=async X=>{const {u}=X;fxSetup();const a=uc(u),W=FXS.w,H=FXS.h,G='#ffd84a',BL='#8ac8ff',WH='#fff6d8',m=rowMid(u.side),fm=rowMid(1-u.side),cy=(m.y+fm.y)/2,gap=Math.max(60,Math.abs(m.y-fm.y));
    /* 1. il lève le bouclier : la lumière se rassemble sur lui */
    vignette('#081232',3000,.62);magicCircle(a.x,a.y+a.s*.5,[G,BL,WH],a.s*1.35,1700,.4);chargeUp(a,[G,BL,WH],700,true);try{FXD.wings(a.x,a.y,a.s*1.25,G,1700)}catch(e){}
    fxItem(850,(g,p)=>{g.globalCompositeOperation='lighter';for(let i=0;i<40;i++){const q=i*.47+p*4.2,r=(1-p)*Math.max(W,H)*.5*(.45+((i*37)%55)/100),x=a.x+Math.cos(q)*r,y=a.y+Math.sin(q)*r*.7,z=5+(i%3)*2;g.globalAlpha=.85*Math.min(1,p*3);g.drawImage(spr(i%3?G:BL),x-z,y-z,z*2,z*2)}});
    await fxWait(850);if(!ok())return;
    /* 2. l'étoile d'Éther géante se dessine au-dessus de l'équipe */
    const sx=W/2,sy=cy,R=Math.min(W*.44,gap*1.05);
    fxItem(1900,(g,p)=>{const e=Math.min(1,p/.35),fade=p>.8?(1-p)/.2:1;g.translate(sx,sy);g.globalCompositeOperation='lighter';
      g.globalAlpha=fade*.5;g.drawImage(spr(G),-R*1.15,-R*1.15,R*2.3,R*2.3);g.rotate(p*.5);g.globalAlpha=fade;
      const n=16,lim=Math.floor(n*e),pt=i=>{const an=(i/n)*Math.PI*2-Math.PI/2,rr=i%2?R*.42:R;return[Math.cos(an)*rr,Math.sin(an)*rr]};
      if(e>=1){const gr=g.createRadialGradient(0,0,0,0,0,R);gr.addColorStop(0,'rgba(255,246,216,.55)');gr.addColorStop(.6,'rgba(255,216,74,.28)');gr.addColorStop(1,'rgba(138,200,255,.12)');g.fillStyle=gr;g.beginPath();for(let i=0;i<=n;i++){const [x,y]=pt(i);i?g.lineTo(x,y):g.moveTo(x,y)}g.closePath();g.fill()}
      for(const [w,c] of [[9,'rgba(255,216,74,.35)'],[4,G],[1.6,'#ffffff']]){g.strokeStyle=c;g.lineWidth=w;g.lineJoin='round';g.beginPath();for(let i=0;i<=lim;i++){const [x,y]=pt(i);i?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}
      g.strokeStyle=WH;g.lineWidth=1.4;g.beginPath();g.arc(0,0,R*.3,0,Math.PI*2*e);g.stroke();g.globalAlpha=fade*.8*e;g.fillStyle='rgba(255,246,216,.85)';g.beginPath();g.arc(0,0,R*.12,0,7);g.fill()});
    textPop(W/2,Math.max(24,fm.y-fm.s*.75),LANG==='en'?'I WILL STAND BETWEEN THE KINGDOM…':'JE ME TIENDRAI ENTRE LE ROYAUME…',WH,15,1500);
    await fxWait(750);if(!ok())return;
    /* 3. le dôme de lumière se pose sur toute l'équipe */
    const dw=Math.min(W*.49,m.s*2.9),dh=m.s*1.65,dy=m.y+m.s*.55;
    fxItem(1600,(g,p)=>{const e=ease(Math.min(1,p/.4)),fade=p>.75?(1-p)/.25:1;g.globalCompositeOperation='lighter';
      const gr=g.createRadialGradient(m.x,dy,0,m.x,dy,dw);gr.addColorStop(0,'rgba(255,246,216,0)');gr.addColorStop(.72,'rgba(138,200,255,.3)');gr.addColorStop(1,'rgba(255,216,74,.75)');
      g.globalAlpha=.42*fade;g.fillStyle=gr;g.beginPath();g.ellipse(m.x,dy,dw*e,dh*e,0,Math.PI,0);g.closePath();g.fill();
      g.globalAlpha=.95*fade;g.strokeStyle=G;g.lineWidth=3;g.beginPath();g.ellipse(m.x,dy,dw*e,dh*e,0,Math.PI,0);g.stroke();
      g.lineWidth=1;g.strokeStyle=WH;g.globalAlpha=.45*fade;for(let k=1;k<6;k++){g.beginPath();g.ellipse(m.x,dy,dw*e*(k/6),dh*e,0,Math.PI,0);g.stroke()}
      for(let k=1;k<4;k++){const f2=k/4;g.beginPath();g.ellipse(m.x,dy-dh*e*f2,dw*e*Math.sqrt(1-f2*f2),dh*e*.1,0,0,7);g.stroke()}
      const sh=(p*1.6)%1;g.globalAlpha=.6*fade;g.strokeStyle='#ffffff';g.lineWidth=2.4;g.beginPath();g.ellipse(m.x,dy,dw*e,dh*e,0,Math.PI+sh*Math.PI*.8,Math.PI+sh*Math.PI*.8+.35);g.stroke()});
    alive(u.side).forEach((t,i)=>{const b=uc(t);fxWait(160+i*90).then(()=>{if(!ok())return;pillarFx(b.x,b.y,G,850,b.s*.55,H*.55);ringFx(b.x,b.y+b.s*.35,G,b.s*.72,620,4,.35);glows(b.x,b.y,[G,WH,BL],14,3,5,40,-.03);cardFlash(t,false)})});
    flash(WH,240,.45,260);await fxWait(700);if(!ok())return;
    /* 4. le serment : des chaînes de lumière tirent les ennemis vers Aegis, onde de choc */
    alive(1-u.side).forEach((t,i)=>{const b=uc(t);fxWait(i*60).then(()=>{if(!ok())return;beamFx(b,a,G,3,560);ringFx(b.x,b.y,BL,b.s*.62,520,3);sparks(b.x,b.y,G,8,4)})});
    ringFx(a.x,a.y,G,W*.72,850,8,.5);ringFx(a.x,a.y,BL,W*.46,750,5,.5,130);shake(3);camPunch(a,1.06,380);sparks(a.x,a.y,WH,30,9);glowPulse(a.x,a.y,G,700,a.s*.9);
    textPop(W/2,cy,LANG==='en'?'OATH OF THE SHIELD':'SERMENT DU BOUCLIER',G,24,1400);
    await fxWait(720)};
  try{LEGS[AEG]=(d,dd,t)=>{[55,60,64,67].forEach(n=>INS.choir(d,t,n,1.9,.5));SND.chimes(d,t+.2,6);fmT(d,{t:t+.85,f:740,r:1.41,i:2.5,d:1.3,v:.13});SND.boom(dd,t+1.6,1.3);fmT(d,{t:t+1.6,f:523,r:2,i:1.4,d:1.6,v:.1})}}catch(e){}
  try{delete ULXD[AEG]}catch(e){}}
/* ---------- Lyra : le Chant de l'Aube ---------- */
if(typeof LYR!=='undefined'&&HEROES[LYR]){SIG[LYR]=1;
  LEG2[LYR]=async X=>{const {u}=X;fxSetup();const a=uc(u),W=FXS.w,H=FXS.h,T='#5ad8c8',G='#ffd84a',WH='#fff6e0',m=rowMid(u.side),fm=rowMid(1-u.side),cy=(m.y+fm.y)/2;
    /* 1. un projecteur sur Lyra, les premières notes */
    vignette('#03141a',3200,.66);
    fxItem(3000,(g,p)=>{const fade=p<.12?p/.12:p>.86?(1-p)/.14:1;g.globalCompositeOperation='lighter';g.globalAlpha=.42*fade;const gr=g.createLinearGradient(a.x,0,a.x,a.y+a.s*.6);gr.addColorStop(0,'rgba(255,246,224,0)');gr.addColorStop(1,'rgba(168,240,224,.8)');g.fillStyle=gr;
      g.beginPath();g.moveTo(a.x-a.s*.22,0);g.lineTo(a.x+a.s*.22,0);g.lineTo(a.x+a.s*.95,a.y+a.s*.6);g.lineTo(a.x-a.s*.95,a.y+a.s*.6);g.closePath();g.fill()});
    magicCircle(a.x,a.y+a.s*.5,[T,G,WH],a.s*1.2,1500,.4);for(let k=0;k<3;k++)ringFx(a.x,a.y,k%2?G:T,a.s*(1+k*.55),760,3,.55,k*230);
    shapes(a.x,a.y,'note',[WH,T,G],16,5,6,70,-.04);
    await fxWait(700);if(!ok())return;
    /* 2. une immense portée traverse le champ de bataille, les notes voyagent dessus */
    const y0=(m.y+fm.y)/2,amp=Math.min(30,H*.035);
    const wave=(x,L,p)=>y0+(L-2)*9+Math.sin(x*.016+p*9)*amp*(.6+.4*Math.sin(p*3));
    fxItem(2000,(g,p)=>{const fade=p<.12?p/.12:p>.8?(1-p)/.2:1,rev=Math.min(1,p/.35);g.globalCompositeOperation='lighter';
      for(let L=0;L<5;L++){g.globalAlpha=fade*(L===2?.95:.6);g.strokeStyle=L===2?WH:(L%2?T:G);g.lineWidth=L===2?2.6:1.6;g.beginPath();const xe=-20+(W+40)*rev;for(let x=-20;x<=xe;x+=12){const y=wave(x,L,p);x>-20?g.lineTo(x,y):g.moveTo(x,y)}g.stroke()}
      for(let n=0;n<12;n++){const t=(p*1.4+n/12)%1,x=-20+(W+40)*t;if(x>-20+(W+40)*rev)continue;const L=n%5,y=wave(x,L,p);g.globalAlpha=fade;g.save();g.translate(x,y-7);g.rotate(-.2);SHAPES.note(g,7.5,n%3?WH:G);g.restore()}});
    try{FXD.skyband(['rgba(255,216,120,.5)','rgba(90,216,200,.45)'],1900,.3)}catch(e){}
    await fxWait(850);if(!ok())return;
    /* 3. les notes tombent sur l'équipe : soin et énergie */
    alive(u.side).forEach((t,i)=>{const b=uc(t);fxWait(i*100).then(()=>{if(!ok())return;shapes(b.x,b.y-b.s*1.3,'note',[WH,T,G],8,2.6,6,62,.12,{ang:Math.PI/2,spread:.5});pillarFx(b.x,b.y,T,850,b.s*.5,H*.45);
      glows(b.x,b.y+b.s*.3,[T,'#ffffff'],12,1.6,4,40,-.08);ringFx(b.x,b.y+b.s*.4,G,b.s*.62,620,3,.35);cardFlash(t,false);if(t!==u)textPop(b.x,b.y-b.s*.55,LANG==='en'?'+ENERGY':'+ÉNERGIE',G,13,850)})});
    await fxWait(650);if(!ok())return;
    /* 4. le Contre-Chant : l'énergie des ennemis s'échappe en notes violettes vers Lyra */
    alive(1-u.side).forEach((t,i)=>{const b=uc(t);fxWait(i*70).then(()=>{if(!ok())return;ringFx(b.x,b.y,'#7a5ab0',b.s*.7,540,4);shapes(b.x,b.y,'note',['#b89aff','#6a4a9a'],6,3,5,50,.02);
      for(let k=0;k<3;k++)fxWait(k*90).then(()=>{if(ok())fxProjectile({x:b.x+rnd(-14,14),y:b.y},a,'#a88aff',540,5)})})});
    await fxWait(620);if(!ok())return;
    /* 5. l'accord final */
    flash(WH,260,.55);ringFx(a.x,a.y,G,W*.78,880,8,.45);ringFx(a.x,a.y,T,W*.52,780,5,.45,120);camPunch(m,1.05,360);try{FXD.rain('note',[WH,T,G],26,900,6,.1,{add:1})}catch(e){}
    textPop(W/2,cy,LANG==='en'?'SONG OF DAWN':"CHANT DE L'AUBE",T,26,1400);
    await fxWait(700)};
  try{LEGS[LYR]=(d,dd,t)=>{[67,71,74,79,83,86].forEach((n,i)=>fmT(d,{t:t+i*.09,f:mtof(n),r:2,i:.9,d:.9,v:.06}));[55,62,67,71].forEach(n=>INS.choir(d,t+.55,n,1.6,.45));SND.chimes(d,t+1.1,8);fmT(d,{t:t+1.7,f:mtof(79),r:3,i:.6,d:1.4,v:.07})}}catch(e){}
  try{delete ULXD[LYR]}catch(e){}}
/* les préludes et finals génériques de classe ne s'ajoutent plus par-dessus ces trois animations */
{const p0=ULTN.pre;ULTN.pre=function(u){if(u&&SIG[u.hid])throw 0;return p0.apply(this,arguments)}}
{const p1=ULTN.post;ULTN.post=function(u){if(u&&SIG[u.hid])throw 0;return p1.apply(this,arguments)}}
window.SIGFX=SIG;
try{PATCH.unshift({v:38.9,d:'2 novembre 2026',t:'Des ultimes dignes de leur rang',items:["🎬 <b>Éryndel</b> utilise maintenant la même cinématique que le Roi de Cendre en boss : souvenir d'il y a mille ans, horloge de flammes, épée de feu et Requiem des Mille Ans, cette fois contre tes ennemis.","🛡️ <b>Aegis</b> : nouvelle animation du Serment du Bouclier (étoile d'Éther géante, dôme de lumière sur l'équipe, chaînes de lumière qui attirent les ennemis).","🎶 <b>Lyra</b> : nouvelle animation du Chant de l'Aube (projecteur, immense portée de musique sur le champ de bataille, pluie de notes, Contre-Chant)."]})}catch(e){}
try{const X={"Des ultimes dignes de leur rang":"Ultimates worthy of their rank","utilise maintenant la même cinématique que le Roi de Cendre en boss : souvenir d'il y a mille ans, horloge de flammes, épée de feu et Requiem des Mille Ans, cette fois contre tes ennemis.":"now uses the same cinematic as the Ash King boss: a memory from a thousand years ago, a clock of flames, a sword of fire and the Requiem of a Thousand Years, this time against your enemies.",
 ": nouvelle animation du Serment du Bouclier (étoile d'Éther géante, dôme de lumière sur l'équipe, chaînes de lumière qui attirent les ennemis).":": new Oath of the Shield animation (giant Ether star, dome of light over the team, chains of light pulling the enemies in).",
 ": nouvelle animation du Chant de l'Aube (projecteur, immense portée de musique sur le champ de bataille, pluie de notes, Contre-Chant).":": new Song of Dawn animation (spotlight, a huge musical staff across the battlefield, a rain of notes, Counter-Song).",
 "Éryndel":"Éryndel"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
}catch(e){console.warn('animations signatures',e)}})();
