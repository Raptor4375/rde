
/* ================= V401 : animations de combat propres à chaque skin légendaire =================
   RÈGLE DU JEU : chaque skin légendaire a ses propres animations de combat, en lien avec son thème
   (entrée de l'ultime, ultime, final de l'ultra-évolution, attaque normale, couleurs des impacts).
   Pour un NOUVEAU skin légendaire, ajouter ici :  SKANIM.reg('cle_du_skin',{th,el,cut,fin,aura,ult,basic})
     th   : [couleur principale, couleur secondaire]      el  : élément des impacts (fire, ice, shadow, blood, astral…)
     cut  : couleurs du bandeau d'ultime                   fin : nom affiché au final ultra
     aura : (a,u)=>…  petit effet autour du héros pendant le bandeau
     ult  : async X=>…  l'ultime complet (X.ux = niveau d'ultra-évolution 0 à 3 ; appeler hit(X,t,k) pour chaque cible)
     basic: (s,t,crit,ux)=>…  l'attaque normale
   Sans skin porté (ou skin non enregistré), le héros garde ses animations d'origine. */
(function(){try{
if(typeof SKINS==='undefined'||typeof playFx!=='function'||typeof FXS==='undefined')return;
const REG={};
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&FXS.ctx;
const later=(ms,fn)=>setTimeout(()=>{if(!ok())return;try{fn()}catch(e){}},ms/(S.speed||1));
const fade=(p,i=.15,o=.2)=>p<i?p/i:p>1-o?(1-p)/o:1;
const special=u=>{try{return!!(u.boss||/^Corvin|^Umbra, Astre/.test(u.name||'')||(typeof isRoi==='function'&&isRoi(u)))}catch(e){return true}};
function animOf(u){try{if(!u||u.hid==null)return null;const k=skEq(u.hid);if(!k||!REG[k])return null;if(u.side===1&&special(u))return null;return REG[k]}catch(e){return null}}
window.SKANIM={reg(k,A){REG[k]=A},has:k=>!!REG[k],of:animOf};

/* ---------- formes ---------- */
SHAPES.snow=(c,s,f)=>{c.strokeStyle=f;c.lineWidth=Math.max(1,s*.26);c.lineCap='round';for(let i=0;i<3;i++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(-s,0);c.lineTo(s,0);c.moveTo(s*.5,0);c.lineTo(s*.8,s*.28);c.moveTo(s*.5,0);c.lineTo(s*.8,-s*.28);c.moveTo(-s*.5,0);c.lineTo(-s*.8,s*.28);c.moveTo(-s*.5,0);c.lineTo(-s*.8,-s*.28);c.stroke()}};
SHAPES.ash=(c,s,f)=>{c.fillStyle=f;c.beginPath();c.moveTo(-s,-s*.2);c.lineTo(-s*.2,-s*.7);c.lineTo(s*.9,-s*.3);c.lineTo(s*.5,s*.6);c.lineTo(-s*.6,s*.5);c.fill()};

/* ---------- briques communes ---------- */
function veil(col,dur,max=.6){fxItem(dur,(c,p)=>{c.globalCompositeOperation='source-over';c.globalAlpha=fade(p,.12,.18)*max;c.fillStyle=col;c.fillRect(0,0,FXS.w,FXS.h)})}
function finTitle(X,col){const m=rowMid(1-X.u.side);textPop(m.x,m.y-m.s*.35,X.A.fin,col,28,1100);for(const t of X.tg)cardFlash(t,true)}

/* ================= VALKYR, REINE DU GIVRE : nuit polaire, aurore, pics de glace ================= */
function aurora(dur,k=1){const R=[{c:'#6affc8',y:.05,a:16,f:.07,s:5,ph:rnd(0,6)},{c:'#8ae8ff',y:.1,a:20,f:.05,s:-4,ph:rnd(0,6)},{c:'#ff9ae8',y:.15,a:14,f:.08,s:6,ph:rnd(0,6)}];
  fxItem(dur,(c,p)=>{const al=fade(p,.2,.25),W=FXS.w,H=FXS.h;c.globalCompositeOperation='lighter';
    for(const r of R){const y0=H*r.y,hh=H*.2*k,g=c.createLinearGradient(0,y0-r.a,0,y0+hh+r.a);g.addColorStop(0,hexA(r.c,0));g.addColorStop(.2,hexA(r.c,.5));g.addColorStop(1,hexA(r.c,0));c.fillStyle=g;c.globalAlpha=al*.85;
      c.beginPath();for(let x=0;x<=W+16;x+=16){const y=y0+Math.sin(x*r.f+r.ph+p*r.s)*r.a;x?c.lineTo(x,y):c.moveTo(x,y)}for(let x=W+16;x>=0;x-=16)c.lineTo(x,y0+hh+Math.sin(x*r.f*.7+r.ph*2+p*r.s)*r.a*1.5);c.closePath();c.fill();
      c.globalAlpha=al*.22;c.strokeStyle=r.c;c.lineWidth=2;for(let x=8;x<W;x+=24){const yy=y0+Math.sin(x*r.f+r.ph+p*r.s)*r.a;c.beginPath();c.moveTo(x,yy);c.lineTo(x,yy+hh*(.45+.4*Math.sin(x*.7+p*9+r.ph)));c.stroke()}}})}
function snowfall(n,dur){for(let k=0;k<n;k++)later(k*dur/n,()=>emit(1,()=>({k:'shape',sh:'snow',x:rnd(0,FXS.w),y:-10,vx:rnd(-.6,.2),vy:rnd(1.4,2.6),life:110,max:110,s:rnd(2.5,5),c:'#ffffff',rot:rnd(0,6),vr:rnd(-.05,.05),wob:rnd(0,6),fade:1.3,add:1})))}
function frostSigil(x,y,r,dur){FXD.sigil(x,y,r,'#8ae8ff',dur,.38,6);fxItem(dur,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=fade(p)*.9;c.translate(x,y);c.scale(1,.38);c.rotate(p*1.2);c.strokeStyle='#e8fbff';c.lineWidth=2.2;const R=r*.78*ease(Math.min(1,p*2.5));
    for(let i=0;i<6;i++){c.rotate(Math.PI/3);c.beginPath();c.moveTo(0,0);c.lineTo(R,0);c.moveTo(R*.55,0);c.lineTo(R*.76,R*.2);c.moveTo(R*.55,0);c.lineTo(R*.76,-R*.2);c.stroke()}})}
function iceWings(x,y,s,dur){fxItem(dur,(c,p)=>{const o=ease(Math.min(1,p*2.2)),al=fade(p,.1,.25);c.globalCompositeOperation='lighter';c.translate(x,y);
    for(const d of[-1,1])for(let k=0;k<6;k++){c.save();c.scale(d,1);c.rotate((-.2-k*.25)*o+Math.sin(p*9+k)*.03);const L=s*(1.3-k*.11)*o,w=s*.13,g=c.createLinearGradient(0,0,L,0);g.addColorStop(0,'rgba(138,232,255,.12)');g.addColorStop(.6,'rgba(191,244,255,.7)');g.addColorStop(1,'rgba(255,255,255,.95)');
      c.globalAlpha=al*.8;c.fillStyle=g;c.beginPath();c.moveTo(0,0);c.lineTo(L*.55,-w);c.lineTo(L,0);c.lineTo(L*.55,w*.6);c.closePath();c.fill();c.globalAlpha=al*.9;c.strokeStyle='#ffffff';c.lineWidth=1;c.beginPath();c.moveTo(0,0);c.lineTo(L,0);c.stroke();c.restore()}})}
function blizzard(y,s,dir,dur){fxItem(dur,(c,p)=>{const W=FXS.w,x=lerp(dir>0?-W*.3:W*1.3,dir>0?W*1.5:-W*.5,p),al=Math.sin(p*Math.PI);c.globalCompositeOperation='lighter';
    const g=c.createLinearGradient(x-dir*W*.5,0,x,0);g.addColorStop(0,'rgba(191,244,255,0)');g.addColorStop(1,'rgba(232,251,255,.55)');c.fillStyle=g;c.globalAlpha=al;c.fillRect(Math.min(x,x-dir*W*.5),y-s*.6,W*.5,s*1.2);
    c.strokeStyle='#ffffff';c.lineWidth=1.6;c.globalAlpha=al*.7;for(let i=0;i<14;i++){const yy=y-s*.55+((i*37+p*260)%(s*1.1)),xx=x-dir*((i*53)%(W*.45));c.beginPath();c.moveTo(xx,yy);c.lineTo(xx-dir*(30+i%4*10),yy);c.stroke()}});
  for(let i=0;i<14;i++)later(i*dur/16,()=>emit(2,()=>({k:'shape',sh:'snow',x:dir>0?-10:FXS.w+10,y:y+rnd(-s*.55,s*.55),vx:dir*rnd(9,14),vy:rnd(-.5,.5),life:50,max:50,s:rnd(2.5,4.5),c:'#ffffff',rot:rnd(0,6),vr:.2,add:1,fade:1.5})))}
function iceSpike(b,dur){fxItem(dur,(c,p)=>{const g=Math.sin(Math.min(1,p*3.2)*Math.PI/2),al=p>.72?(1-p)/.28:1,base=b.y+b.s*.52;c.globalAlpha=al;
    for(const [dx,w,hh,tilt] of[[-b.s*.3,b.s*.13,.62,-.22],[b.s*.27,b.s*.12,.55,.2],[-b.s*.08,b.s*.1,.8,-.06],[b.s*.07,b.s*.17,1,.05]]){const h=b.s*1.25*hh*g;c.save();c.translate(b.x+dx,base);c.rotate(tilt);
      const gr=c.createLinearGradient(-w,0,w,0);gr.addColorStop(0,'rgba(90,200,255,.85)');gr.addColorStop(.45,'rgba(232,251,255,.95)');gr.addColorStop(1,'rgba(58,138,208,.85)');c.fillStyle=gr;
      c.beginPath();c.moveTo(-w,0);c.lineTo(-w*.35,-h*.82);c.lineTo(0,-h);c.lineTo(w*.5,-h*.7);c.lineTo(w,0);c.closePath();c.fill();c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=1.2;c.beginPath();c.moveTo(-w*.35,-h*.82);c.lineTo(-w*.1,0);c.moveTo(0,-h);c.lineTo(w*.3,0);c.stroke();c.restore()}
    c.globalCompositeOperation='lighter';c.globalAlpha=al*.5*g;c.drawImage(spr('#8ae8ff'),b.x-b.s*.6,base-b.s*.5,b.s*1.2,b.s*.7)});
  later(dur*.72,()=>shapes(b.x,b.y+b.s*.2,'crystal',['#bff4ff','#ffffff'],8,4,3,40,.25,{add:1}))}
function iceLance(f,t,dur){fxItem(dur,(c,p)=>{const q=p*p,x=lerp(f.x,t.x,q),y=lerp(f.y,t.y,q),an=Math.atan2(t.y-f.y,t.x-f.x);c.globalCompositeOperation='lighter';c.translate(x,y);c.rotate(an);
    const g=c.createLinearGradient(-90,0,14,0);g.addColorStop(0,'rgba(138,232,255,0)');g.addColorStop(1,'rgba(232,251,255,.95)');c.fillStyle=g;c.beginPath();c.moveTo(-90,-3);c.lineTo(4,-6);c.lineTo(18,0);c.lineTo(4,6);c.lineTo(-90,3);c.closePath();c.fill();c.drawImage(spr('#8ae8ff'),-8,-16,32,32)})}
REG.va_givre={th:['#8ae8ff','#ffffff'],el:'ice',cut:['#8ae8ff','#e8fbff'],fin:"LANCES DE L'AURORE",
  aura(a){shapes(a.x,a.y,'snow',['#ffffff','#bff4ff'],8,2.4,4.5,50,-.02,{add:1,wob:1});shapes(a.x,a.y,'crystal',['#bff4ff'],5,2.5,3,44,-.03,{add:1})},
  async ult(X){const {u,ux}=X,a=uc(u),m=rowMid(1-u.side),dir=u.side?-1:1,T=2300+ux*500;
    veil('#04102a',T,.6);aurora(T);snowfall(24+ux*6,1700);
    frostSigil(a.x,a.y+a.s*.5,a.s*1.15,1500);iceWings(a.x,a.y-a.s*.12,a.s*.95,1300);glowPulse(a.x,a.y,'#8ae8ff',700,a.s*.55);shapes(a.x,a.y,'crystal',['#bff4ff','#ffffff'],10,3,3,50,-.03,{add:1});
    await fxWait(620);if(!ok())return;
    cardMove(u,(m.x-a.x)*.18,(m.y-a.y)*.3,420);blizzard(m.y,m.s,dir,620);await fxWait(300);if(!ok())return;
    X.tg.forEach((t,i)=>later(i*70,()=>{const b=uc(t);iceSpike(b,900);later(140,()=>{hit(X,t,1.35);shapes(b.x,b.y+b.s*.2,'crystal',['#bff4ff','#e8fbff','#8ae8ff'],10,5,4,44,.2,{glow:'#8ae8ff'});shapes(b.x,b.y,'snow',['#ffffff','#bff4ff'],5,3,5,50,.03,{add:1,wob:1});ringFx(b.x,b.y+b.s*.4,'#bff4ff',b.s*.6,460,4,.35)})}));
    await fxWait(240+X.tg.length*70);if(!ok())return;shake(2);camPunch(m,1.06,340);flash('#e8fbff',180,.4);await fxWait(440);if(!ok())return;
    if(ux>0){aurora(1300+ux*250,1.3);
      for(let r=0;r<1+ux;r++){X.tg.forEach((t,i)=>later(i*60,()=>{const b=uc(t);iceLance({x:b.x+rnd(-50,50)-dir*50,y:-30},b,250);later(250,()=>{ringFx(b.x,b.y,'#8ae8ff',b.s*.5,400,4);shapes(b.x,b.y,'crystal',['#bff4ff','#ffffff','#8ae8ff'],8,5,3.5,40,.2,{glow:'#8ae8ff'});sparks(b.x,b.y,'#ffffff',10,6);cardFlash(t,r===ux)})}));
        try{ultraHitSnd()}catch(e){}await fxWait(310);if(!ok())return;shake(2)}
      flash('#bff4ff',200,.5);snowfall(18,600);finTitle(X,'#8ae8ff');await fxWait(520)}},
  basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.35:1)*(1+ux*.12);try{cardMove(s,(b.x-a.x)*.12,(b.y-a.y)*.12,200)}catch(e){}
    crescent(b.x,b.y,b.s*.64*k,-.7,['#8ae8ff','#ffffff'],260,10*k);shapes(b.x,b.y,'crystal',['#bff4ff','#e8fbff','#8ae8ff'],Math.round(7*k),4.5,3.2,36,.18,{glow:'#8ae8ff'});sparks(b.x,b.y,'#e8fbff',8,5,1.6,18);ringFx(b.x,b.y+b.s*.3,'#bff4ff',b.s*.38*k,320,3,.4);
    if(ux)shapes(b.x,b.y,'snow',['#ffffff'],2+ux,2.5,4.5,44,.02,{add:1,wob:1});
    if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#8ae8ff',300,b.s*.42);shapes(b.x,b.y,'snow',['#ffffff','#bff4ff'],5,3,5,46,.03,{add:1,wob:1})}}};

/* ================= NYX, COMTESSE ÉCARLATE : lune de sang, chauves-souris, griffes et roses ================= */
function drawBat(c,x,y,s,flap,al){c.save();c.translate(x,y);c.globalAlpha=al;c.fillStyle='#2a0610';c.strokeStyle='rgba(255,74,90,.85)';c.lineWidth=1;const wy=flap*s*.7;
  for(const d of[-1,1]){c.beginPath();c.moveTo(0,-s*.1);c.quadraticCurveTo(d*s*.9,-s*.9-wy,d*s*1.9,-wy);c.quadraticCurveTo(d*s*1.5,s*.1-wy*.4,d*s*1.25,s*.45-wy*.5);c.quadraticCurveTo(d*s,0,d*s*.7,s*.4-wy*.3);c.quadraticCurveTo(d*s*.45,0,0,s*.35);c.closePath();c.fill();c.stroke()}
  c.beginPath();c.ellipse(0,0,s*.28,s*.42,0,0,7);c.fill();c.beginPath();c.moveTo(-s*.22,-s*.3);c.lineTo(-s*.12,-s*.7);c.lineTo(0,-s*.35);c.lineTo(s*.12,-s*.7);c.lineTo(s*.22,-s*.3);c.fill();
  c.fillStyle='#ff4a5a';c.fillRect(-s*.15,-s*.22,s*.1,s*.1);c.fillRect(s*.05,-s*.22,s*.1,s*.1);c.restore()}
function batSwarm(f,t,n,dur,delay=0){const L=[...Array(n)].map(()=>({o:rnd(0,.35),dy:rnd(-40,40),dx:rnd(-30,30),s:rnd(7,12),ph:rnd(0,6),w:rnd(14,22)}));
  fxItem(dur,(c,p)=>{c.globalCompositeOperation='source-over';for(const b of L){const q=(p-b.o)/.65;if(q<=0||q>=1)continue;drawBat(c,lerp(f.x,t.x,q)+b.dx,lerp(f.y,t.y,q)+b.dy+Math.sin(q*9+b.ph)*14,b.s,Math.sin(q*b.w*3+b.ph),Math.min(1,Math.min(q,1-q)*8))}},delay)}
function batBurst(x,y,n,s,dur=700){const L=[...Array(n)].map((_,i)=>({a:i/n*6.283+rnd(-.3,.3),r:rnd(.9,1.8),s:rnd(6,10),ph:rnd(0,6)}));
  fxItem(dur,(c,p)=>{c.globalCompositeOperation='source-over';const e=ease(p);for(const b of L)drawBat(c,x+Math.cos(b.a)*s*b.r*e,y+Math.sin(b.a)*s*b.r*e*.7-e*s*.3,b.s,Math.sin(p*26+b.ph),Math.min(1,(1-p)*3))})}
function bloodMoon(cx,cy,R,dur,ecl){fxItem(dur,(c,p)=>{const al=fade(p,.14,.16),y=cy+(1-ease(Math.min(1,p*2.4)))*R*1.4;c.globalAlpha=al;c.globalCompositeOperation='lighter';c.drawImage(spr('#ff2a4a'),cx-R*3,y-R*3,R*6,R*6);c.globalCompositeOperation='source-over';
    const g=c.createRadialGradient(cx-R*.3,y-R*.3,R*.1,cx,y,R);g.addColorStop(0,'#ff8a7a');g.addColorStop(.55,'#d01a3a');g.addColorStop(1,'#6a0614');c.fillStyle=g;c.beginPath();c.arc(cx,y,R,0,7);c.fill();
    c.fillStyle='rgba(90,4,18,.45)';for(const [dx,dy,r] of[[-.35,-.2,.2],[.3,.25,.26],[.1,-.45,.12],[-.2,.45,.14],[.5,-.25,.1]]){c.beginPath();c.arc(cx+dx*R,y+dy*R,r*R,0,7);c.fill()}
    if(ecl){const e=Math.max(0,Math.min(1,(p-ecl)/.2));if(e>0){c.fillStyle='#0a0004';c.beginPath();c.arc(cx-R*2.2*(1-e),y,R*.96,0,7);c.fill();c.globalCompositeOperation='lighter';c.globalAlpha=al*e;c.strokeStyle='#ff4a5a';c.lineWidth=3;c.beginPath();c.arc(cx,y,R*1.03,0,7);c.stroke();c.drawImage(spr('#ff2a4a'),cx-R*2.2,y-R*2.2,R*4.4,R*4.4)}}})}
function claws(b,ang,k=1){const nx=Math.cos(ang+1.57),ny=Math.sin(ang+1.57);for(let i=-1;i<=1;i++)slashLine(b.x+nx*i*b.s*.2,b.y+ny*i*b.s*.2,b.s*1.4*k,ang,['#ff2a4a','#ffd0c8'],240,6,(i+1)*35)}
function fangs(b){fxItem(460,(c,p)=>{const d=ease(Math.min(1,p*2.5)),al=p>.6?(1-p)/.4:1;c.globalAlpha=al;c.fillStyle='#fff0ee';c.strokeStyle='#c0203a';c.lineWidth=1.2;
    for(const sx of[-1,1]){const x=b.x+sx*b.s*.13,y=b.y-b.s*.45+d*b.s*.3;c.beginPath();c.moveTo(x-b.s*.06,y-b.s*.2);c.lineTo(x+b.s*.06,y-b.s*.2);c.lineTo(x,y+b.s*.08);c.closePath();c.fill();c.stroke()}
    if(p>.4){c.globalCompositeOperation='lighter';c.globalAlpha=al*.9;for(const sx of[-1,1])c.drawImage(spr('#ff2a4a'),b.x+sx*b.s*.13-9,b.y-b.s*.1-9,18,18)}})}
function rose(x,y,r,dur,delay=0){fxItem(dur,(c,p)=>{const s=ease(Math.min(1,p*2.2)),al=p>.75?(1-p)/.25:1;c.globalAlpha=al;c.translate(x,y);
    for(let L=0;L<3;L++){const rr=r*(1-L*.3)*s;c.rotate(.6+p*.4);c.fillStyle=['#8a0a1a','#c0203a','#ff4a5a'][L];for(let i=0;i<5;i++){c.rotate(6.283/5);c.beginPath();c.ellipse(rr*.5,0,rr*.5,rr*.34,0,0,7);c.fill()}}c.fillStyle='#3a0a18';c.beginPath();c.arc(0,0,r*.12*s,0,7);c.fill()},delay)}
REG.ny_ecarlate={th:['#ff2a4a','#ffb0b8'],el:'blood',cut:['#ff2a4a','#ffd0c8'],fin:'ÉCLIPSE DE SANG',
  aura(a){batBurst(a.x,a.y,6,a.s*.8,800);shapes(a.x,a.y,'petal',['#8a0a1a','#c0203a'],8,2.4,4,56,.03,{wob:1})},
  async ult(X){const {u,ux}=X,a=uc(u),W=FXS.w,H=FXS.h,cx=W/2,cy=H*.2,R=Math.min(W,H)*.11,T=2400+ux*650;
    veil('#12000a',T,.72);bloodMoon(cx,cy,R,T,ux>0?1900/T:0);
    batSwarm({x:-30,y:H*.3},{x:W+30,y:H*.12},9,1300);batSwarm({x:W+30,y:H*.42},{x:-30,y:H*.2},7,1400,200);
    FXD.rain('petal',['#8a0a1a','#c0203a','#3a0a18'],18,1500,4.5,.05);glowPulse(a.x,a.y,'#ff2a4a',600,a.s*.5);
    await fxWait(640);if(!ok())return;
    batBurst(a.x,a.y,10,a.s);smoke(a.x,a.y,6,'#1a040c',18,50);
    for(const t of X.seq.slice(0,4)){if(!ok())return;const b=uc(t);await lungeTo(u,t,.7,260);if(!ok())return;
      claws(b,-.5);later(110,()=>claws(b,Math.PI+.5));flash('#ff2a4a',160,.35);shapes(b.x,b.y,'drop',['#d01a3a','#ff2a4a','#8a0a1a'],18,6,3.2,44,.3);fangs(b);
      hit(X,t,1.7);camPunch(b,1.1,420);shake(3);await fxWait(300)}
    await fxWait(180);if(!ok())return;
    if(ux>0){for(const t of X.tg){const b=uc(t);FXD.tendrils(b.x,b.y+b.s*.5,'#5a0a18',6,b.s*1.1,1100);rose(b.x-b.s*.34,b.y+b.s*.34,b.s*.3,1100,120);rose(b.x+b.s*.32,b.y+b.s*.4,b.s*.24,1000,240);rose(b.x,b.y-b.s*.42,b.s*.2,900,340)}
      await fxWait(260);
      for(let r=0;r<1+ux;r++){if(!ok())return;for(const t of X.tg){const b=uc(t),an=rnd(-1.1,-.3)*(r%2?-1:1);claws(b,an,1.05);shapes(b.x,b.y,'drop',['#d01a3a','#ff2a4a'],10,6,3,40,.3);cardFlash(t,r===ux)}
        try{ultraHitSnd()}catch(e){}batBurst(cx,cy,5,R*2.2,600);shake(2);await fxWait(230)}
      flash('#ff2a4a',200,.45);FXD.rain('petal',['#c0203a','#8a0a1a','#ff4a5a'],20,700,4.5,.07);finTitle(X,'#ff4a5a');await fxWait(520)}},
  basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.3:1)*(1+ux*.1);
    fxItem(160,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=1-p;c.strokeStyle='#ff2a4a';c.lineWidth=3;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(lerp(a.x,b.x,p),lerp(a.y,b.y,p));c.stroke()});
    later(60,()=>{claws(b,-.75,.72*k);if(ux>1||crit)later(90,()=>claws(b,Math.PI+.75,.72*k));shapes(b.x,b.y,'drop',['#d01a3a','#ff2a4a','#8a0a1a'],Math.round(8*k),5,2.8,36,.3);sparks(b.x,b.y,'#ffd0c8',8,5,1.6,16);batBurst(b.x,b.y,2+ux,b.s*.5,520);
      if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#ff2a4a',300,b.s*.42);fangs(b)}})}};

/* ================= SOLARIS, ASTRE NOIR : éclipse totale, soleil noir, couronne d'or et de violet ================= */
function blackSun(f,t,R,dur,o={}){const rays=[...Array(22)].map((_,i)=>({a:i/22*6.283+rnd(-.08,.08),l:rnd(.5,1.3),w:rnd(.05,.11),ph:rnd(0,6)}));
  fxItem(dur,(c,p)=>{const q=o.fall?p*p:0,x=lerp(f.x,t.x,q),y=lerp(f.y,t.y,q),r=R*(o.grow?ease(Math.min(1,p*1.6)):1),al=o.hold?fade(p,.12,.2):o.fall?1:Math.min(1,p*4);c.translate(x,y);c.globalAlpha=al;c.globalCompositeOperation='lighter';
    c.drawImage(spr('#c06aff'),-r*3.4,-r*3.4,r*6.8,r*6.8);c.drawImage(spr('#ffd84a'),-r*2,-r*2,r*4,r*4);
    for(const ry of rays){const L=r*(1.25+ry.l*(.55+.35*Math.sin(p*14+ry.ph)));c.save();c.rotate(ry.a+p*.5);const gr=c.createLinearGradient(r*.9,0,L,0);gr.addColorStop(0,'rgba(255,216,74,.95)');gr.addColorStop(.5,'rgba(192,106,255,.6)');gr.addColorStop(1,'rgba(192,106,255,0)');c.fillStyle=gr;c.beginPath();c.moveTo(r*.9,-r*ry.w*2);c.lineTo(L,0);c.lineTo(r*.9,r*ry.w*2);c.closePath();c.fill();c.restore()}
    c.globalCompositeOperation='source-over';c.fillStyle='#05000a';c.beginPath();c.arc(0,0,r,0,7);c.fill();c.strokeStyle='#ffd84a';c.lineWidth=Math.max(1.5,r*.07);c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.strokeStyle='rgba(255,240,192,.9)';c.lineWidth=1;c.beginPath();c.arc(0,0,r*1.07,-.9+p*2,.4+p*2);c.stroke();
    if(o.fall&&Math.random()<.8)glows(x,y,['#c06aff','#ffd84a'],1,1.5,6,26)})}
function accrete(x,y,R,n,dur){for(let k=0;k<n;k++)later(k*dur/n,()=>emit(1,()=>{const an=Math.random()*6.283,d=R*rnd(3,5),L=rnd(22,34);return{x:x+Math.cos(an)*d,y:y+Math.sin(an)*d,vx:-Math.cos(an)*d/L,vy:-Math.sin(an)*d/L,life:L,max:L,s:rnd(2,4),c:k%2?'#ffd84a':'#c06aff',fade:3}}))}
function starfield(n,dur){for(let k=0;k<n;k++)later(k*dur/n,()=>shapes(rnd(0,FXS.w),rnd(0,FXS.h*.5),'star',['#ffffff','#e0c0ff'],1,.2,rnd(1.5,3),40,0,{add:1}))}
function implode(x,y,R0,dur){fxItem(dur,(c,p)=>{c.globalCompositeOperation='lighter';c.translate(x,y);c.scale(1,.45);c.globalAlpha=Math.min(1,p*3);c.strokeStyle='#ffd84a';c.lineWidth=6;c.beginPath();c.arc(0,0,Math.max(1,R0*(1-ease(p))),0,7);c.stroke();c.strokeStyle='#c06aff';c.lineWidth=3;c.beginPath();c.arc(0,0,Math.max(1,R0*1.25*(1-ease(p))),0,7);c.stroke()})}
function prominence(f,t,dur,bend,delay=0){const mx=(f.x+t.x)/2,my=(f.y+t.y)/2,dx=t.x-f.x,dy=t.y-f.y,L=Math.hypot(dx,dy)||1,qx=mx-dy/L*bend,qy=my+dx/L*bend;
  fxItem(dur,(c,p)=>{const g=Math.min(1,p*1.8),al=p>.7?(1-p)/.3:1,N=22;c.globalCompositeOperation='lighter';c.lineCap='round';
    const path=()=>{c.beginPath();for(let k=0;k<=N*g;k++){const s=k/N,x=(1-s)*(1-s)*f.x+2*(1-s)*s*qx+s*s*t.x,y=(1-s)*(1-s)*f.y+2*(1-s)*s*qy+s*s*t.y;k?c.lineTo(x,y):c.moveTo(x,y)}};
    c.globalAlpha=al*.45;c.strokeStyle='#c06aff';c.lineWidth=13;path();c.stroke();c.globalAlpha=al*.9;c.strokeStyle='#ffd84a';c.lineWidth=6;path();c.stroke();c.strokeStyle='#fff6d8';c.lineWidth=2;path();c.stroke()},delay)}
REG.so_noir={th:['#c06aff','#ffd84a'],el:'shadow',cut:['#c06aff','#ffd84a'],fin:'ÉRUPTION NOIRE',
  aura(a){accrete(a.x,a.y,a.s*.25,16,500);shapes(a.x,a.y,'star',['#ffd84a','#e0c0ff'],6,2.4,3,44,0,{add:1})},
  async ult(X){const {u,ux}=X,a=uc(u),m=rowMid(1-u.side),W=FXS.w,H=FXS.h,sun={x:W/2,y:H*.16},R=Math.min(W,H)*.1,T=2500+ux*520;
    veil('#06000f',T,.75);FXD.sigil(a.x,a.y+a.s*.5,a.s*1.2,'#ffd84a',1500);glowPulse(a.x,a.y,'#c06aff',700,a.s*.6);
    blackSun(sun,sun,R,930,{grow:1});accrete(sun.x,sun.y,R,30,850);starfield(22,1500);
    await fxWait(900);if(!ok())return;
    blackSun(sun,m,R,520,{fall:1});await fxWait(500);if(!ok())return;implode(m.x,m.y,W*.5,300);await fxWait(250);if(!ok())return;
    flash('#fff0c0',240,.75);shake(3);camPunch(m,1.09,420);ringFx(m.x,m.y,'#ffd84a',W*.55,700,9,.45);ringFx(m.x,m.y,'#c06aff',W*.42,700,6,.45,90);crackFx(m.x,m.y+m.s*.4,'#c06aff',11,W*.3);
    glows(m.x,m.y,['#c06aff','#ffd84a','#ffffff'],60,9,7,50,-.02);shapes(m.x,m.y,'star',['#ffd84a','#fff0c0'],16,7,4,46,.05,{add:1});smoke(m.x,m.y,12,'#12041e',26,80);
    X.tg.forEach((t,i)=>later(i*60,()=>{const b=uc(t);pillarFx(b.x,b.y,'#c06aff',700,b.s*.6,200);pillarFx(b.x,b.y,'#ffd84a',600,b.s*.22,220);hit(X,t,1.4)}));
    await fxWait(580);if(!ok())return;
    if(ux>0){const top={x:W/2,y:H*.14};blackSun(top,top,R*.85,900+ux*330,{hold:1});await fxWait(260);
      for(let r=0;r<1+ux;r++){if(!ok())return;X.tg.forEach((t,i)=>{const b=uc(t);prominence(top,b,520,(i%2?1:-1)*(r%2?-1:1)*rnd(40,90),i*40);later(280+i*40,()=>{glows(b.x,b.y,['#ffd84a','#c06aff','#ffffff'],16,5,5,36);ringFx(b.x,b.y,'#ffd84a',b.s*.5,400,4);pillarFx(b.x,b.y,'#ffd84a',500,b.s*.3,160);cardFlash(t,r===ux)})});
        try{ultraHitSnd()}catch(e){}await fxWait(330);shake(2)}
      flash('#ffd84a',200,.45);FXD.rain('star',['#ffd84a','#c06aff','#ffffff'],20+ux*5,800,4,.18,{add:1});finTitle(X,'#ffd84a');await fxWait(520)}},
  basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.35:1)*(1+ux*.12);glowPulse(a.x,a.y,'#c06aff',260,a.s*.3);
    proj(a,b,{el:'shadow',th:['#c06aff','#ffd84a']},{dur:300,size:8*k,arc:26}).then(()=>{if(!ok())return;
      fxItem(380,(c,p)=>{const r=b.s*.2*k*(.6+p*.8);c.translate(b.x,b.y);c.globalAlpha=1-p;c.fillStyle='#05000a';c.beginPath();c.arc(0,0,r,0,7);c.fill();c.globalCompositeOperation='lighter';c.strokeStyle='#ffd84a';c.lineWidth=3*(1-p)+1;c.beginPath();c.arc(0,0,r*1.08,0,7);c.stroke();c.drawImage(spr('#c06aff'),-r*2.4,-r*2.4,r*4.8,r*4.8)});
      shapes(b.x,b.y,'star',['#ffd84a','#ffffff','#e0c0ff'],Math.round(7*k),4,3.2,34,0,{add:1});glows(b.x,b.y,['#c06aff','#ffd84a'],Math.round(12*k),4,5,30);
      if(ux)ringFx(b.x,b.y,'#ffd84a',26+ux*10,380,4);if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#ffd84a',300,b.s*.42)}})}};

/* ================= DRAKHAR DES CENDRES : obsidienne, braises, pluie de cendres et lave ================= */
function ashfall(n,dur){for(let k=0;k<n;k++)later(k*dur/n,()=>emit(1,i=>({k:'shape',sh:'ash',x:rnd(0,FXS.w),y:-8,vx:rnd(-.4,.4),vy:rnd(.9,1.8),life:120,max:120,s:rnd(1.6,3),c:['#8a8480','#5a5450','#b0a8a0'][k%3],rot:rnd(0,6),vr:rnd(-.08,.08),wob:rnd(0,6),fade:1.2})))}
function emberRise(x,y,n,w){emit(n,i=>({x:x+rnd(-w/2,w/2),y:y+rnd(-6,10),vx:rnd(-.4,.4),vy:-rnd(1.2,3),drag:.99,life:rnd(36,64),max:64,s:rnd(1.6,3.2),c:['#ff6a1a','#ffb21a','#ff3a1a'][i%3],wob:rnd(0,6)}))}
function lavaCracks(y,dur){FXD.cracks(y,'#ff6a1a',dur);FXD.cracks(y+7,'#ffb21a',dur);fxItem(dur,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=Math.sin(p*Math.PI)*.5;const g=c.createLinearGradient(0,y-34,0,y+24);g.addColorStop(0,'rgba(255,106,26,0)');g.addColorStop(.7,'rgba(255,106,26,.8)');g.addColorStop(1,'rgba(255,178,26,0)');c.fillStyle=g;c.fillRect(0,y-34,FXS.w,58)})}
function wyrmHead(u,a,dur){fxItem(dur,(c,p)=>{const al=fade(p,.15,.2),o=ease(Math.min(1,p*2.5)),s=a.s*.95*o,pu=.6+.4*Math.sin(p*20);c.globalAlpha=al;c.translate(a.x,a.y-a.s*.15);c.scale(u.side?-1:1,u.side?-1:1);
    c.globalCompositeOperation='lighter';c.globalAlpha=al*.45;c.drawImage(spr('#ff3a1a'),-s*1.3,-s*1.5,s*2.6,s*2.6);c.globalCompositeOperation='source-over';c.globalAlpha=al;
    c.fillStyle='#141012';c.strokeStyle='#ff6a1a';c.lineWidth=2.4;c.lineJoin='round';
    c.beginPath();c.moveTo(-s*.5,s*.3);c.quadraticCurveTo(-s*.6,-s*.5,0,-s*.9);c.quadraticCurveTo(s*.4,-s*.7,s*.5,-s*.3);c.lineTo(s*.2,-s*.15);c.lineTo(s*.45,0);c.quadraticCurveTo(0,s*.1,-s*.1,s*.4);c.closePath();c.fill();c.stroke();
    c.fillStyle='#2a2422';c.beginPath();c.moveTo(-s*.2,-s*.85);c.lineTo(-s*.5,-s*1.3);c.lineTo(-s*.05,-s*.95);c.moveTo(s*.1,-s*.8);c.lineTo(s*.2,-s*1.25);c.lineTo(s*.25,-s*.72);c.fill();c.stroke();
    c.globalCompositeOperation='lighter';c.globalAlpha=al*pu;c.strokeStyle='#ffb21a';c.lineWidth=1.6;c.beginPath();c.moveTo(-s*.42,s*.1);c.lineTo(-s*.3,-s*.2);c.lineTo(-s*.38,-s*.42);c.moveTo(-s*.12,-s*.7);c.lineTo(-s*.02,-s*.42);c.lineTo(s*.14,-s*.5);c.moveTo(-s*.2,s*.2);c.lineTo(-s*.05,-s*.05);c.lineTo(s*.12,-s*.1);c.stroke();
    c.globalAlpha=al;c.drawImage(spr('#ff6a1a'),-s*.05-11,-s*.6-11,22,22);c.drawImage(spr('#fff0c0'),-s*.05-4,-s*.6-4,8,8)})}
REG.dk_cendres={th:['#ff6a1a','#ffb21a'],el:'fire',cut:['#ff6a1a','#ffb21a'],fin:'TEMPÊTE DE CENDRES',
  aura(a){emberRise(a.x,a.y+a.s*.3,18,a.s*1.2);smoke(a.x,a.y+a.s*.3,4,'#1a1414',16,60)},
  async ult(X){const {u,ux}=X,a=uc(u),m=rowMid(1-u.side),W=FXS.w,H=FXS.h,T=2300+ux*600;
    FXD.skyband(['rgba(30,22,20,.95)'],T,.5);veil('#0c0808',T,.42);ashfall(28+ux*8,1900);for(let i=0;i<6;i++)smoke(rnd(0,W),rnd(0,H*.1),2,'#1a1414',40,100,.2);
    emberRise(a.x,a.y+a.s*.4,16,a.s*1.4);FXD.sigil(a.x,a.y+a.s*.5,a.s*1.25,'#ff6a1a',1500,.38,10);wyrmHead(u,a,1500);
    await fxWait(480);if(!ok())return;
    const mouth={x:a.x,y:a.y-a.s*.4};let n=0;const iv=setInterval(()=>{if(!ok()||n++>36){clearInterval(iv);return}
      for(let k=0;k<4;k++){const tx=m.x+rnd(-W*.36,W*.36),ty=m.y+rnd(-20,20),d=Math.hypot(tx-mouth.x,ty-mouth.y)/rnd(10,14);FXS.parts.push({x:mouth.x,y:mouth.y,vx:(tx-mouth.x)/d,vy:(ty-mouth.y)/d,life:d,max:d,s:rnd(4,9),s2:rnd(12,20),c:['#ff6a1a','#ffb21a','#ff3a1a','#fff0c0'][k],fade:2})}
      {const tx=m.x+rnd(-W*.36,W*.36),ty=m.y+rnd(-16,16),d=Math.hypot(tx-mouth.x,ty-mouth.y)/rnd(7,10);FXS.parts.push({k:'smoke',x:mouth.x,y:mouth.y,vx:(tx-mouth.x)/d,vy:(ty-mouth.y)/d,life:d*1.3,max:d*1.3,s:8,s2:26,c:'#1a1414',op:.6,fade:1})}
      if(n%3===0){const tx=m.x+rnd(-W*.36,W*.36),ty=m.y+rnd(-16,16),d=Math.hypot(tx-mouth.x,ty-mouth.y)/rnd(9,12);FXS.parts.push({k:'shape',sh:'ash',x:mouth.x,y:mouth.y,vx:(tx-mouth.x)/d,vy:(ty-mouth.y)/d,life:d*1.2,max:d*1.2,s:rnd(2.5,4.5),c:'#3a3330',rot:rnd(0,6),vr:rnd(-.3,.3),fade:2})}
      fxRun()},28/(S.speed||1));
    await fxWait(420);if(!ok())return;lavaCracks(m.y+m.s*.45,1400);await fxWait(160);if(!ok())return;shake(2);
    X.tg.forEach((t,i)=>later(i*70,()=>{const b=uc(t);smoke(b.x,b.y+b.s*.2,5,'#2a2220',20,70);emberRise(b.x,b.y+b.s*.4,10,b.s*.8);glowPulse(b.x,b.y+b.s*.3,'#ff6a1a',420,b.s*.5);shapes(b.x,b.y+b.s*.3,'ash',['#1a1414','#3a3330','#5a5450'],7,5,3.5,44,.3,{ang:-Math.PI/2,spread:1.1});hit(X,t,1.3)}));
    await fxWait(660);if(!ok())return;
    if(ux>0){for(let r=0;r<1+ux;r++){if(!ok())return;X.tg.forEach((t,i)=>later(i*55,()=>{const b=uc(t);proj({x:b.x+rnd(-90,90),y:-30},b,{el:'fire',th:['#ff6a1a','#ffb21a']},{dur:290,size:11,kind:'meteor',arc:0,lin:1}).then(()=>{if(!ok())return;pillarFx(b.x,b.y,'#ff6a1a',600,b.s*.5,H*.5);glows(b.x,b.y,['#ff6a1a','#ffb21a','#ffffff'],18,6,6,40,-.04);smoke(b.x,b.y,4,'#1a1414',20,70);crackFx(b.x,b.y+b.s*.4,'#ff6a1a',6,b.s*.9,800);cardFlash(t,r===ux)})}));
        if(r%2===0){const b=uc(X.tg[(r/2|0)%Math.max(1,X.tg.length)]||u);boltFx({x:b.x+rnd(-70,70),y:-10},b,'#ff8a3a',340,4)}
        try{ultraHitSnd()}catch(e){}await fxWait(340);if(!ok())return;flash('#ffb21a',110,.3);shake(2)}
      smoke(m.x,m.y+m.s*.3,14,'#1a1414',30,90);FXD.rings(m.x,m.y+m.s*.4,'#ff6a1a',3,m.s);ashfall(16,500);finTitle(X,'#ff8a3a');await fxWait(520)}},
  basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.35:1)*(1+ux*.12);try{cardMove(s,(b.x-a.x)*.12,(b.y-a.y)*.12,200)}catch(e){}
    crescent(b.x,b.y,b.s*.62*k,-.7,['#ff6a1a','#ffb21a'],260,10*k);smoke(b.x,b.y,3,'#1a1414',14,44);emberRise(b.x,b.y,Math.round(8*k),b.s*.5);shapes(b.x,b.y,'ash',['#3a3330','#5a5450'],4,4,3,34,.25);sparks(b.x,b.y,'#ffb21a',8,5,1.6,18);
    if(ux)ringFx(b.x,b.y+b.s*.3,'#ff6a1a',b.s*.3+ux*8,360,3,.4);
    if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#ff6a1a',300,b.s*.42);crackFx(b.x,b.y+b.s*.35,'#ff6a1a',5,b.s*.7,700)}}};

/* ================= branchement sur le combat ================= */
/* l'ultime : le skin joue sa propre scène, de l'entrée au final */
{const pf=playFx;playFx=async function(u,info){const A=animOf(u);if(!A||!A.ult||!info||!B||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return pf.apply(this,arguments);
  try{fxSetup()}catch(e){}if(!FXS.ctx)return pf.apply(this,arguments);
  try{ultFx(u)}catch(e){}
  const seq=(info.seq||[]).filter(t=>t&&t.side!==u.side),tg=[...new Set(seq)],h=HEROES[u.hid];focusU(tg,u);
  const X={u,h,th:A.th,el:A.el,seq,tg,info,sk:h.sk,ux:Math.min(3,u.ux||0),A};
  try{await A.ult(X)}catch(e){console.warn('skanim',e)}
  if(!B)return;for(const t of tg)if(!X.hitDone||!X.hitDone.has(t))hit(X,t,1);
  try{await supportFx(X)}catch(e){}}}
/* le bandeau d'ultime prend les couleurs et le nom du skin */
{const ci=cutIn;cutIn=async function(u){const A=animOf(u);if(!A||!B||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return ci.apply(this,arguments);
  const host=document.querySelector('#battle .bw');if(!host)return;let k,h;try{fxSetup();k=skEq(u.hid);h=HEROES[u.hid]}catch(e){}if(!k||!h||!FXS.ctx)return ci.apply(this,arguments);
  const th=A.cut||A.th,foe=u.side===1;
  try{dimOn(.62);focusU([],u);const a=uc(u);chargeUp(a,th,560,true);try{A.aura&&A.aura(a,u)}catch(e){}cardMove(u,0,foe?8:-10,520)}catch(e){}
  await fxWait(380);if(!B)return;
  const d=document.createElement('div');d.className='ci2 leg skci'+(foe?' foe':'');d.style.cssText=`--c1:${th[0]};--c2:${th[1]||'#fff'};--rc:${RCOL[h.r]};--d:${(.26/S.speed)}s;--d2:${(1.6/S.speed)}s`;
  d.innerHTML=`<div class="ci2-rays"></div><div class="ci2-band"><div class="ci2-lines"></div><div class="ci2-tx"><i>★★★ ULTIME LÉGENDAIRE</i><b>${esc(h.sk.n)}</b><span>${esc(SKINS[k].n)}</span></div><div class="ci2-pt">${u.port||''}</div></div><div class="ci2-flash"></div>`;
  host.appendChild(d);await fxWait(1000);d.classList.add('out');await fxWait(260);d.remove();try{if(B&&!B.skip)flash(th[1]||'#fff',200,.45)}catch(e){}}}
/* attaques normales (avec ou sans ultra-évolution) */
{const b0=basicFx;basicFx=function(s,t,crit){const A=animOf(s);if(!A||!A.basic||!t||!B||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return b0.apply(this,arguments);try{fxSetup();if(!FXS.ctx)return;A.basic(s,t,!!crit,0)}catch(e){}}}
{const u0=ultraBasic;ultraBasic=function(s,t){const A=animOf(s);if(!A||!A.basic||!t||!B||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return u0.apply(this,arguments);try{fxSetup();if(!FXS.ctx)return;try{ultraHitSnd()}catch(e){}A.basic(s,t,!!(AU&&AU.lh==='crit'),Math.min(3,s.ux||1))}catch(e){}}}
/* couleurs et élément du héros partout ailleurs */
{const he=heroEl;heroEl=function(u){const A=animOf(u);return A?{el:A.el,th:A.th}:he.apply(this,arguments)}}

/* ---------- la fiche du skin annonce ses animations ---------- */
const NOTE='🎬 <b>Animations de combat exclusives</b> : son ultime, son attaque et son bandeau d\'entrée changent pour coller à son thème.';
document.addEventListener('click',()=>setTimeout(()=>{try{const o=document.getElementById('ovl');if(!o||!UI.skvk||!REG[UI.skvk])return;const b=o.querySelector('.skpvb');if(!b||o.querySelector('.skanote'))return;b.insertAdjacentHTML('afterend',`<div class="skanote">${NOTE}</div>`)}catch(e){}},30));
const st=document.createElement('style');st.textContent=`.skanote{margin:8px 0 0;padding:8px 10px;border-radius:10px;font-size:12.5px;line-height:1.4;background:linear-gradient(135deg,rgba(255,216,74,.14),rgba(192,106,255,.12));border:1px solid rgba(255,216,74,.45)}`;document.head.appendChild(st);

/* ---------- anglais + notes de version ---------- */
try{I18N_EN[NOTE]="🎬 <b>Exclusive battle animations</b>: its ultimate, its attack and its entrance banner change to match its theme.";
  Object.assign(I18N_EN,{"LANCES DE L'AURORE":"AURORA LANCES","ÉCLIPSE DE SANG":"BLOOD ECLIPSE","ÉRUPTION NOIRE":"BLACK ERUPTION","TEMPÊTE DE CENDRES":"ASH STORM"})}catch(e){}
try{const I=["🎬 <b>Les skins légendaires ont maintenant leurs propres animations de combat</b>, en lien avec leur thème : l'ultime, le final de l'ultra-évolution, l'attaque normale et le bandeau d'entrée.",
  "❄️ <b>Valkyr, Reine du Givre</b> : nuit polaire, aurore boréale, ailes de glace, blizzard et pics de glace. En ultra : les Lances de l'Aurore.",
  "🩸 <b>Nyx, Comtesse Écarlate</b> : lune de sang, nuée de chauves-souris, griffes écarlates et morsure. En ultra : l'Éclipse de sang, avec ses ronces et ses roses.",
  "🌑 <b>Solaris, Astre Noir</b> : un soleil noir à la couronne d'or se forme, s'écrase et implose. En ultra : l'Éruption noire.",
  "🌋 <b>Drakhar des Cendres</b> : tête d'obsidienne, souffle de braise, pluie de cendres et sol qui se fend en lave. En ultra : la Tempête de cendres.",
  "✨ Chaque futur skin légendaire aura lui aussi ses animations. Sans skin porté, les héros gardent leurs animations d'origine."];
 PATCH.unshift({v:45,d:'10 novembre 2026',t:'Animations des skins légendaires',items:I});
 const E=["🎬 <b>Legendary skins now have their own battle animations</b>, matching their theme: the ultimate, the ultra-evolution finale, the basic attack and the entrance banner.",
  "❄️ <b>Valkyr, Frost Queen</b>: polar night, northern lights, ice wings, blizzard and ice spikes. In ultra: the Aurora Lances.",
  "🩸 <b>Nyx, Scarlet Countess</b>: blood moon, swarm of bats, scarlet claws and a bite. In ultra: the Blood Eclipse, with its thorns and roses.",
  "🌑 <b>Solaris, Black Star</b>: a black sun with a golden corona forms, crashes down and implodes. In ultra: the Black Eruption.",
  "🌋 <b>Drakhar of the Ashes</b>: obsidian head, ember breath, falling ash and ground splitting into lava. In ultra: the Ash Storm.",
  "✨ Every future legendary skin will get its own animations too. Without a skin equipped, heroes keep their original animations."];
 I.forEach((x,i)=>{I18N_EN[x]=E[i]});I18N_EN['Animations des skins légendaires']='Legendary skin animations'}catch(e){}
}catch(e){console.warn('skanim init',e)}})();
