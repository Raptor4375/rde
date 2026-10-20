
/* ================= V26.4 : ultra-évolutions signature + animations de combat refaites ================= */
/* ---------- ultra-évolutions des bots : réalistes, selon leur assiduité et leur chance, pas leur puissance ---------- */
function npcTeam(p){
  const R=rng(roseH(String(p.id||p.n))%100000+3),pw=p.pw||1000;
  const lg=Math.log(Math.max(1,pw/18000))/Math.log(2.3);
  const evs=(p.team||[]).map(id=>HEROES[id]&&HEROES[id].r===4?clamp(Math.floor(lg+R()),0,3):0);
  const act=clamp(p.act!=null?p.act:.3,.05,1),luck=R();
  /* la plupart n'en ont aucune ; les plus assidus en ont 1 ou 2, très rarement 3 */
  const p0=1-(1-clamp(.86-.55*act,.35,.88))*Math.sqrt(Math.min(1,pw/25000));let n=luck<p0?0:luck<p0+(1-p0)*.62?1:luck<p0+(1-p0)*.9?2:3;
  const us=(p.team||[]).map(()=>0);const legs=(p.team||[]).map((id,j)=>j).filter(j=>HEROES[p.team[j]]&&HEROES[p.team[j]].r===4);
  for(const j of legs){if(n<=0)break;const r=R();us[j]=r<.05?3:r<.27?2:1;evs[j]=3;n--}
  let lo=1,hi=100;
  for(let k=0;k<20;k++){const mid=(lo+hi)/2;const tot=(p.team||[]).reduce((a,id,j)=>a+basePow(HEROES[id],mid,evs[j])*(1+.35*us[j])*1.15,0);if(tot<pw)lo=mid;else hi=mid}
  return(p.team||[]).map((id,j)=>({id,l:clamp(Math.round(lo+(R()*6-3)),1,100),e:evs[j],u:us[j]}))}
try{UROW.clear()}catch(e){}
/* ---------- signature de chaque légendaire ultra-évolué ---------- */
const UXK=[0,1,1.4,1.8];
const ULX={
 57:{n:'Éruption solaire',el:'fire',c:['#ffc21a','#ff6a1a'],ic:'☀️',logic(u,tg,sc,k){let t0=0;for(const t of tg){t0+=deal(u,t,35*k*sc,{sk:1,ub:1});if(t.hp>0)t.dot={v:u.atk*.12*k,t:2}}return t0},
   async fx(u,tg,ux){const s={x:FXS.w/2,y:FXS.h*.08};vignette('#ff6a1a',1400,.5);fxItem(1300,(c,p)=>{c.globalCompositeOperation='lighter';const r=40+30*Math.sin(p*Math.PI)+ux*8;c.globalAlpha=Math.sin(p*Math.PI);c.drawImage(spr('#ffc21a'),s.x-r*2,s.y-r*2,r*4,r*4);c.translate(s.x,s.y);c.rotate(p*2);c.strokeStyle='#fff6c0';c.lineWidth=3;for(let i=0;i<12;i++){c.rotate(Math.PI/6);c.beginPath();c.moveTo(r*.8,0);c.lineTo(r*1.6+Math.sin(p*20+i)*8,0);c.stroke()}});
     await fxWait(420);for(const t of tg){const b=uc(t);beamFx(s,b,'#ffc21a',14+ux*3,520);setTimeout(()=>{if(!B||!FXS.ctx)return;glowPulse(b.x,b.y,'#ff6a1a',420,40);glows(b.x,b.y,['#ff6a1a','#ffd36a','#fff'],26,5,6,40,-.04);smoke(b.x,b.y,5,'#3a1a10',18,60);ringFx(b.x,b.y,'#ffb04a',b.s*.8,420,5,.5)},220)}await fxWait(520);shake(2)}},
 58:{n:'Écho temporel',el:'storm',c:['#7ad0ff','#e8f8ff'],ic:'⏳',logic(u,tg,sc,k){let t0=0;for(const t of tg)t0+=deal(u,t,30*k*sc,{sk:1,ub:1});u.en=Math.min(100,u.en+12*k);return t0},
   async fx(u,tg,ux){const m=rowMid(1-u.side),R=Math.min(FXS.w*.42,m.s*2.4);fxTint('#0a1a3a',1400,.45);
     fxItem(1500,(c,p)=>{const a=p<.15?p/.15:p>.85?(1-p)/.15:1;c.globalAlpha=a*.9;c.translate(m.x,m.y);c.strokeStyle='#7ad0ff';c.lineWidth=3;c.beginPath();c.arc(0,0,R,0,7);c.stroke();c.lineWidth=1.2;c.beginPath();c.arc(0,0,R*.86,0,7);c.stroke();for(let i=0;i<12;i++){const q=i/12*6.283;c.beginPath();c.moveTo(Math.cos(q)*R*.88,Math.sin(q)*R*.88);c.lineTo(Math.cos(q)*R*.97,Math.sin(q)*R*.97);c.lineWidth=i%3?2:4;c.stroke()}
       const rw=-p*14;c.lineCap='round';c.strokeStyle='#e8f8ff';c.lineWidth=5;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(rw)*R*.55,Math.sin(rw)*R*.55);c.stroke();c.lineWidth=3;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(rw*6)*R*.8,Math.sin(rw*6)*R*.8);c.stroke();c.globalCompositeOperation='lighter';c.drawImage(spr('#7ad0ff'),-20,-20,40,40)});
     await fxWait(700);for(const t of tg){const b=uc(t);slashLine(b.x,b.y,b.s*1.1,-.7,['#7ad0ff','#ffffff'],260,8);slashLine(b.x,b.y,b.s*1.1,.7,['#7ad0ff','#ffffff'],260,8,140);setTimeout(()=>{if(!B||!FXS.ctx)return;shapes(b.x,b.y,'crystal',['#bfe8ff','#ffffff'],14,6,5,40,.2,{add:1})},320)}
     await fxWait(500);shapes(m.x,m.y,'crystal',['#7ad0ff','#ffffff'],30,9,6,50,.25,{add:1});flash('#e8f8ff',180,.45)}},
 59:{n:'Floraison primordiale',el:'nature',c:['#6ad04a','#ffd0e8'],ic:'🌸',logic(u,tg,sc,k){let t0=0;for(const t of tg)t0+=deal(u,t,25*k*sc,{sk:1,ub:1});for(const a of alive(u.side))heal(a,a.max*.09*k);const r=tg.filter(t=>t.hp>0);if(r.length&&Math.random()<.3){const t=pick(r);t.stun=1;float(t,'Enraciné','info')}return t0},
   async fx(u,tg,ux){vignette('#2a6a1a',1300,.4);for(const t of tg){const b=uc(t);crackFx(b.x,b.y+b.s*.45,'#6ad04a',9,b.s*1.2,1000);fxItem(900,(c,p)=>{c.globalAlpha=Math.sin(p*Math.PI);c.strokeStyle='#4a8a2a';c.lineWidth=5;c.lineCap='round';for(let i=0;i<4;i++){const x0=b.x+(i-1.5)*b.s*.22;c.beginPath();c.moveTo(x0,b.y+b.s*.6);c.quadraticCurveTo(x0+Math.sin(i)*20,b.y,x0+(i%2?12:-12),b.y+b.s*.6-ease(Math.min(1,p*2))*b.s*1.1);c.stroke()}})}
     await fxWait(450);for(const t of tg){const b=uc(t);shapes(b.x,b.y,'petal',['#ffd0e8','#ff8ac0','#ffffff'],18,5,5,60,.05,{add:0});shapes(b.x,b.y,'leaf',['#6ad04a','#b8f08a'],12,5,5,60,.08)}
     for(const a of alive(u.side)){const p=uc(a);rise(p.x,p.y,['#b8f08a','#ffd0e8','#ffffff'],16,p.s*.6);glowPulse(p.x,p.y,'#6ad04a',600,30)}await fxWait(500)}},
 60:{n:'Séisme du Mont-Vivant',el:'earth',c:['#c8a060','#6ae0ff'],ic:'⛰️',logic(u,tg,sc,k){let t0=0;for(const t of tg)t0+=deal(u,t,40*k*sc,{sk:1,ub:1});for(const a of alive(u.side)){a.sh=(a.sh||0)+Math.round(u.max*.06*k);if(B.track)B.track.sh.add(a)}return t0},
   async fx(u,tg,ux){const m=rowMid(1-u.side);shake(4);fxTint('#3a2a10',900,.35);for(const t of tg){const b=uc(t);crackFx(b.x,b.y+b.s*.4,'#6ae0ff',10,b.s*1.4,1200)}
     await fxWait(260);for(const t of tg){const b=uc(t);shapes(b.x,b.y+b.s*.3,'rock',['#8a7a6a','#c8b8a0','#5a4a3a'],16,8,7,60,.35);smoke(b.x,b.y+b.s*.4,6,'#6a5a4a',22,70);glowPulse(b.x,b.y,'#6ae0ff',400,34)}
     camPunch(m,1.09,420);await fxWait(380);for(const a of alive(u.side)){const p=uc(a);domeFx(p.x,p.y,'#6ae0ff',p.s*.55,900)}shake(3);await fxWait(400)}},
 61:{n:'Lances du Valhalla',el:'holy',c:['#ffe27a','#ffffff'],ic:'🗡️',logic(u,tg,sc,k){let t0=0;const f=alive(1-u.side);for(let i=0;i<3+Math.round(k);i++){const t=pick(f.filter(x=>x.hp>0));if(t)t0+=deal(u,t,18*k*sc,{sk:1,ub:1})}const lo=f.filter(x=>x.hp>0).sort((a,b)=>a.hp/a.max-b.hp/b.max)[0];if(lo)t0+=deal(u,lo,20*k*sc,{sk:1,ub:1});return t0},
   async fx(u,tg,ux){vignette('#ffe27a',1300,.35);const f=tg.length?tg:alive(1-u.side);for(let i=0;i<5+ux*2;i++){const t=f[i%f.length];if(!t)break;const b=uc(t),x=b.x+rnd(-20,20);
     fxItem(380,(c,p)=>{const y=lerp(-40,b.y,ease(p));c.globalCompositeOperation='lighter';c.strokeStyle='#fff6c0';c.lineWidth=4;c.beginPath();c.moveTo(x,y-70);c.lineTo(x,y);c.stroke();c.fillStyle='#ffe27a';c.beginPath();c.moveTo(x-6,y-8);c.lineTo(x,y+10);c.lineTo(x+6,y-8);c.fill();c.globalAlpha=.6;c.drawImage(spr('#ffe27a'),x-14,y-14,28,28)},i*110);
     setTimeout(()=>{if(!B||!FXS.ctx)return;ringFx(x,b.y,'#ffe27a',b.s*.6,360,4,.45);shapes(x,b.y,'feather',['#ffffff','#fff6c0'],6,4,5,50,.04);sparks(x,b.y,'#fff6c0',12,6)},(i*110+380)/S.speed)}await fxWait(500+ux*220);flash('#fff6c0',160,.4)}},
 62:{n:'Éclipse',el:'shadow',c:['#9a6aff','#2a0a4a'],ic:'🌑',logic(u,tg,sc,k){let t0=0;for(const t of tg){t0+=deal(u,t,25*k*sc,{sk:1,ub:1});if(t.hp>0&&t.hp/t.max<.4){t0+=deal(u,t,50*k*sc,{sk:1,ub:1});float(t,'Exécution','crit')}}return t0},
   async fx(u,tg,ux){const s={x:FXS.w/2,y:FXS.h*.12};fxItem(1400,(c,p)=>{const a=Math.sin(p*Math.PI);c.globalAlpha=a*.55;c.fillStyle='#05000c';c.fillRect(0,0,FXS.w,FXS.h);c.globalAlpha=a;c.globalCompositeOperation='lighter';c.drawImage(spr('#c8b8ff'),s.x-70,s.y-70,140,140);c.globalCompositeOperation='source-over';c.fillStyle='#05000c';c.beginPath();c.arc(s.x+lerp(-40,0,ease(Math.min(1,p*2))),s.y,30,0,7);c.fill()});
     await fxWait(500);for(const t of tg){const b=uc(t);crescent(b.x,b.y,b.s*.7,-.6,['#9a6aff','#ffffff'],300,12);crescent(b.x,b.y,b.s*.7,2.5,['#9a6aff','#ffffff'],300,12,2.2,-1);setTimeout(()=>{if(!B||!FXS.ctx)return;smoke(b.x,b.y,6,'#2a0a4a',20,60);glows(b.x,b.y,['#9a6aff','#2a0a4a','#ffffff'],20,4,5,36)},200)}await fxWait(600)}},
 63:{n:"Pluie d'étoiles",el:'astral',c:['#a8b8ff','#ffffff'],ic:'🌠',logic(u,tg,sc,k){let t0=0;const f=alive(1-u.side);for(let i=0;i<3+2*Math.round(k);i++){const t=pick(f.filter(x=>x.hp>0));if(t)t0+=deal(u,t,14*k*sc,{sk:1,ub:1})}return t0},
   async fx(u,tg,ux){fxTint('#0a0a3a',1500,.4);const f=tg.length?tg:alive(1-u.side);for(let i=0;i<8+ux*4;i++){const t=f[i%f.length];if(!t)break;const b=uc(t);const a={x:b.x+rnd(-160,160),y:-20};setTimeout(()=>{if(!B||!FXS.ctx)return;proj(a,{x:b.x+rnd(-10,10),y:b.y},{el:'astral',th:['#a8b8ff','#ffffff']},{dur:340,size:8,arc:0,lin:1}).then(()=>{if(!B||!FXS.ctx)return;shapes(b.x,b.y,'star',['#ffffff','#a8b8ff'],8,5,4,36,0,{add:1});ringFx(b.x,b.y,'#a8b8ff',b.s*.45,300,3)})},i*90/S.speed)}await fxWait(900+ux*300)}},
 64:{n:'Jugement des Six Ailes',el:'holy',c:['#fff6c0','#ffe27a'],ic:'🪽',logic(u,tg,sc,k){let t0=0;for(const t of tg)t0+=deal(u,t,25*k*sc,{sk:1,ub:1});for(const a of alive(u.side))heal(a,a.max*.08*k);return t0},
   async fx(u,tg,ux){const a=uc(u);vignette('#ffe27a',1500,.4);fxItem(1300,(c,p)=>{const al=Math.sin(p*Math.PI);c.globalCompositeOperation='lighter';c.globalAlpha=al*.8;c.translate(a.x,a.y);for(const d of [-1,1])for(let i=0;i<3;i++){c.save();c.scale(d,1);c.rotate(-.5+i*.38);const L=a.s*(1.2+i*.25)*ease(Math.min(1,p*2));const g=c.createLinearGradient(0,0,L,0);g.addColorStop(0,'rgba(255,246,192,.9)');g.addColorStop(1,'rgba(255,246,192,0)');c.fillStyle=g;c.beginPath();c.ellipse(L/2,0,L/2,a.s*.12,0,0,7);c.fill();c.restore()}});
     await fxWait(420);for(const t of tg){const b=uc(t);pillarFx(b.x,b.y,'#ffe27a',800,b.s*.7,FXS.h)}for(let k=0;k<26;k++)setTimeout(()=>{if(!B||!FXS.ctx)return;shapes(rnd(0,FXS.w),-10,'feather',['#ffffff','#fff6c0'],1,1.4,6,90,.05,{ang:Math.PI/2,spread:.4})},k*30);
     await fxWait(500);for(const x of alive(u.side)){const p=uc(x);rise(p.x,p.y,['#fff6c0','#ffffff'],14,p.s*.6)}await fxWait(300)}},
 65:{n:'Tempête du Wyrm',el:'storm',c:['#ffd84a','#ff6a1a'],ic:'⚡',logic(u,tg,sc,k){let t0=0;for(const t of tg){t0+=deal(u,t,45*k*sc,{sk:1,ub:1});if(t.hp>0)t.dot={v:u.atk*.1*k,t:2}}return t0},
   async fx(u,tg,ux){fxTint('#140a20',1200,.55);for(let r=0;r<2+ux;r++){for(const t of tg){const b=uc(t);boltFx({x:b.x+rnd(-60,60),y:-10},b,r%2?'#ff6a1a':'#ffd84a',360,5+ux)}flash('#fff6c0',120,.35);shake(2);await fxWait(220)}
     for(const t of tg){const b=uc(t);glows(b.x,b.y,['#ff6a1a','#ffd84a','#ffffff'],30,6,6,40,-.04);sparks(b.x,b.y,'#ffd84a',20,8);smoke(b.x,b.y,5,'#2a1210',20,60);crackFx(b.x,b.y+b.s*.4,'#ff6a1a',7,b.s,900)}await fxWait(400)}},
 66:{n:'Maelström abyssal',el:'water',c:['#2ae0d0','#a0fff0'],ic:'🌊',logic(u,tg,sc,k){let t0=0;for(const t of tg){t0+=deal(u,t,35*k*sc,{sk:1,ub:1});t.en=Math.max(0,t.en-15*Math.round(k*1.4))}return t0},
   async fx(u,tg,ux){const m=rowMid(1-u.side),R=Math.min(FXS.w*.45,m.s*2.6);vignette('#0a3a5a',1500,.5);fxItem(1500,(c,p)=>{const a=p<.15?p/.15:p>.8?(1-p)/.2:1;c.globalAlpha=a;c.translate(m.x,m.y);c.scale(1,.55);c.rotate(p*9);c.lineCap='round';for(let j=0;j<3;j++){c.strokeStyle=['#2ae0d0','#a0fff0','#1a7aa0'][j];c.lineWidth=6-j*1.5;c.beginPath();for(let i=0;i<=60;i++){const q=i/60*Math.PI*4+j*2.1,r=R*(1-i/60)*(.6+.4*ease(Math.min(1,p*2)));const x=Math.cos(q)*r,y=Math.sin(q)*r;i?c.lineTo(x,y):c.moveTo(x,y)}c.stroke()}});
     await fxWait(500);for(const t of tg){const b=uc(t);shapes(b.x,b.y,'drop',['#a0fff0','#2ae0d0'],14,6,4,40,.25);shapes(b.x,b.y,'bubble',['#c8f8ff'],8,2,4,60,-.05)}await fxWait(600);camPunch(m,1.06,340)}}};
/* logique : chaque légendaire ultra a son propre bonus (Fortuna a sa Roulette Céleste) */
{const sk0=skill;skill=function(u,sk,sc){const r=sk0.apply(this,arguments);try{const X=u&&u.ux>0&&ULX[u.hid];if(X&&B&&B.track){const tg=[...new Set(B.track.seq.filter(t=>t&&t.side!==u.side&&t.hp>0))];const tot=X.logic(u,tg.length?tg:alive(1-u.side).slice(0,1),sc||1,UXK[Math.min(3,u.ux)]);if(tot)log(`${X.ic} ${X.n} (${u.name}) : +${fmt(tot)} dégâts`,'sk')}}catch(e){}return r}}
/* animation finale : spécifique à chaque héros */
async function ultraFinisher(u,info){const X=ULX[u.hid],T=uxT(u),tg=[...new Set(info.seq.filter(t=>t.side!==u.side&&t))];if(!B||!FXS.ctx)return;
  if(X){try{await X.fx(u,tg,Math.min(3,u.ux||1))}catch(e){}if(!B)return;const m=rowMid(1-u.side);textPop(m.x,m.y-m.s*.35,X.n.toUpperCase(),X.c[0],30,1100);for(const t of tg)cardFlash(t,true);await fxWait(300);return}
  vignette(T.c,900,.5);for(const t of tg){const b=uc(t);ringFx(b.x,b.y,T.c,b.s*.6,500,5);glows(b.x,b.y,[T.c,T.c2,'#ffffff'],20,5,6,40)}await fxWait(400)}
/* préparation plus spectaculaire */
async function ultraPre(u){const T=uxT(u),a=uc(u),X=ULX[u.hid],c1=X?X.c[0]:T.c,c2=X?X.c[1]:T.c2;
  magicCircle(a.x,a.y+a.s*.5,[c1,c2],a.s*1.3,1400);chargeUp(a,[c1,c2,'#ffffff'],700,true);pillarFx(a.x,a.y,c1,900,a.s*.8,FXS.h*.9);glowPulse(a.x,a.y,c1,800,a.s*.7);vignette(c2,1200,.4);
  fxItem(900,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=Math.sin(p*Math.PI)*.8;c.translate(a.x,a.y);c.rotate(p*4);c.strokeStyle=c1;c.lineWidth=2;for(let i=0;i<3;i++){c.beginPath();c.ellipse(0,0,a.s*(.7+i*.15),a.s*(.25+i*.05),i*1.05,0,7);c.stroke()}});await fxWait(340)}
/* ---------- attaques normales : une vraie animation pour chaque classe ---------- */
function heroEl(u){try{const L=parseLook(LOOKS[u.hid]);return{el:ELEM[L.bg]||'neutral',th:THEME[L.bg]||[L.a||'#ffffff','#ffffff']}}catch(e){return{el:'neutral',th:['#ffffff','#ffd36a']}}}
function basicFx(s,t,crit){if(!B||B.skip||REDUCED||!t)return;fxSetup();if(!FXS.ctx)return;const a=uc(s),b=uc(t),k=crit?1.4:1;
  if(s.hid==null){const col=s.boss?'#ff3a5a':'#ff8a6a';for(let i=0;i<3;i++)slashLine(b.x+(i-1)*b.s*.14,b.y,b.s*.9*k,1.1,[col,'#ffffff'],200,5,i*40);sparks(b.x,b.y,col,10,5);return}
  const E=heroEl(s),th=E.th,cl=s.cls||(HEROES[s.hid]||{}).c;
  if(cl==='Tireur'){proj(a,b,{el:E.el,th},{dur:220,size:5,arc:6,lin:1}).then(()=>{if(!B||!FXS.ctx)return;sparks(b.x,b.y,th[0],12*k,6);ringFx(b.x,b.y,th[0],b.s*.35*k,260,3)})}
  else if(cl==='Mage'){glowPulse(a.x,a.y,th[0],260,a.s*.3);proj(a,b,{el:E.el,th},{dur:300,size:8*k,arc:26}).then(()=>{if(!B||!FXS.ctx)return;try{elp(E.el).imp(b.x,b.y,th,.7*k)}catch(e){glows(b.x,b.y,th,14,4,5,30)}})}
  else if(cl==='Soutien'){proj(a,b,{el:E.el,th},{dur:300,size:6,arc:30}).then(()=>{if(!B||!FXS.ctx)return;glows(b.x,b.y,[th[0],'#ffffff'],12,3.4,4,30);shapes(b.x,b.y,'plus',[th[0],'#ffffff'],4,3,4,30,0,{add:1})});glows(a.x,a.y,[th[0],'#ffffff'],6,1.5,3,30,-.04)}
  else if(cl==='Assassin'){fxItem(160,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=1-p;c.strokeStyle=th[0];c.lineWidth=3;c.beginPath();c.moveTo(a.x,a.y);c.lineTo(lerp(a.x,b.x,p),lerp(a.y,b.y,p));c.stroke()});slashLine(b.x,b.y,b.s*.95*k,-.75,[th[0],'#ffffff'],200,6,60);slashLine(b.x,b.y,b.s*.95*k,.75,[th[0],'#ffffff'],200,6,140);sparks(b.x,b.y,'#ffffff',10*k,6)}
  else{try{cardMove(s,(b.x-a.x)*.12,(b.y-a.y)*.12,200)}catch(e){}crescent(b.x,b.y,b.s*.62*k,cl==='Tank'?.2:-.7,[th[0],'#ffffff'],260,10*k);if(cl==='Tank'){glowPulse(b.x,b.y,th[0],300,b.s*.35);shapes(b.x,b.y,'rock',['#c8b8a0','#8a7a6a'],5,4,3,30,.3)}sparks(b.x,b.y,th[0],10*k,5)}
  if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#ffb04a',300,b.s*.4)}}
/* attaque normale d'un héros ultra : projectile signature + petit bonus propre à chaque légendaire */
function ultraBasic(s,t){if(!B||B.skip||REDUCED)return;fxSetup();if(!FXS.ctx)return;const X=ULX[s.hid],T=uxT(s),a=uc(s),b=uc(t),k=s.ux||1,c=X?X.c:[T.c,T.c2];
  glowPulse(a.x,a.y,c[0],300,a.s*.4);proj(a,b,{el:X?X.el:'astral',th:c},{dur:260,size:8+k*2,arc:18}).then(()=>{if(!B||!FXS.ctx)return;try{ultraHitSnd()}catch(e){}try{elp(X?X.el:'astral').imp(b.x,b.y,c,.8+k*.2)}catch(e){}ringFx(b.x,b.y,c[0],26+k*10,380,4);if(k>=2)slashLine(b.x,b.y,b.s*1.1,-.7,c,220,7);if(k>=3)glows(b.x,b.y,[c[0],c[1],'#ffffff'],20,5,5,36);camPunch(b,1.03,200)})}
{const d0=deal;deal=function(s,t,pct,o={}){const alive0=t&&t.hp>0;const r=d0.apply(this,arguments);try{if(B&&!o.sk&&!o.ub&&!B.track&&s&&t&&alive0){
    if(!(s.ux&&s.side===0))basicFx(s,t,AU&&AU.lh==='crit');
    const X=s.ux>0&&ULX[s.hid];if(X&&t.hp>0){const x=d0.call(this,s,t,[0,8,13,18][Math.min(3,s.ux)],{ub:1});if(x&&!B.skip)float(t,X.ic+' '+fmt(x),'crit')}}}catch(e){}return r}}
PATCH.unshift({v:26.4,d:'18 octobre 2026',t:'Signatures ultra',items:[
 "✨ <b>Chaque légendaire ultra-évolué a maintenant sa propre signature</b> (fini l'éclair pour tout le monde) : Éruption solaire de Solaris, Écho temporel de Kaïros, Floraison primordiale de Gaïa, Séisme de Titanor, Lances du Valhalla de Valkyr, Éclipse de Nyx, Pluie d'étoiles d'Orion, Jugement des Six Ailes de Séraphine, Tempête du Wyrm de Drakhar, Maelström de Léviathane, et la Roulette Céleste de Fortuna.",
 "💥 Chaque signature a son effet en jeu : dégâts bonus, brûlure, exécution des ennemis affaiblis, soins, boucliers, racines, énergie volée ou rendue… selon le héros.",
 "🎬 <b>Animations entièrement refaites</b> : préparation de l'ultime ultra (cercle magique, pilier de lumière, anneaux d'énergie) et une scène finale unique par héros : soleil, horloge géante, racines, séisme, lances célestes, éclipse, pluie d'étoiles, six ailes, orage, tourbillon.",
 "⚔️ Les attaques normales ont enfin leur animation, selon la classe et l'élément du héros : flèches pour les tireurs, orbes élémentaires pour les mages, entailles croisées pour les assassins, coups de lame pour les guerriers, impacts lourds pour les tanks, griffures pour les monstres. Les coups critiques secouent l'écran.",
 "🎲 Les ultra-évolutions des bots sont maintenant réalistes : elles dépendent de leur assiduité et de leur chance, pas d'un palier de puissance. La plupart n'en ont aucune, les plus assidus une ou deux, très rarement trois."]});
