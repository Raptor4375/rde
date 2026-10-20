
/* ================= ultimes normaux (sans ultra-évolution) : animations enrichies pour tous les héros ================= */
const ULTN={
 pre(u,E,cl){const a=uc(u),c=E.th;FXD.sigil(a.x,a.y+a.s*.5,a.s*1.05,c[0],1100,.38,cl==='Mage'?12:8);chargeUp(a,[c[0],c[1]||'#ffffff'],520,false);glowPulse(a.x,a.y,c[0],600,a.s*.5);
   if(HEROES[u.hid]&&HEROES[u.hid].r>=3){FXD.streaks(c[0],520,16);vignette(c[0],900,.28)}
   fxItem(700,(g,p)=>{g.globalCompositeOperation='lighter';g.globalAlpha=Math.sin(p*Math.PI)*.7;g.translate(a.x,a.y);g.rotate(p*3);g.strokeStyle=c[0];g.lineWidth=2;g.beginPath();g.ellipse(0,0,a.s*.75,a.s*.28,0,0,7);g.stroke();g.rotate(1.2);g.beginPath();g.ellipse(0,0,a.s*.7,a.s*.24,0,0,7);g.stroke()})},
 post(u,tg,E,cl){const c=E.th,col=c[0],c2=c[1]||'#ffffff';const m=tg.length?rowMid(tg[0].side):rowMid(u.side);
   if(cl==='Guerrier')for(const t of tg){const b=uc(t);slashLine(b.x,b.y,b.s*1.3,-.75,[col,'#ffffff'],260,9);slashLine(b.x,b.y,b.s*1.3,.75,[col,'#ffffff'],260,9,120);sparks(b.x,b.y,'#ffffff',14,7)}
   else if(cl==='Tank'){for(const t of tg){const b=uc(t);FXD.rings(b.x,b.y+b.s*.3,col,2,b.s*.5);shapes(b.x,b.y+b.s*.3,'rock',['#c8b8a0','#8a7a6a'],8,6,4,40,.3)}for(const a of alive(u.side)){const p=uc(a);domeFx(p.x,p.y,col,p.s*.5,700)}shake(2)}
   else if(cl==='Mage'){for(const t of tg){const b=uc(t);FXD.sigil(b.x,b.y+b.s*.45,b.s*.6,col,800,.4,8);try{elp(E.el).imp(b.x,b.y,c,1.1)}catch(e){glows(b.x,b.y,[col,c2],20,5,5,36)}}FXD.streaks(c2,500,14)}
   else if(cl==='Assassin')for(const t of tg){const b=uc(t);for(let i=0;i<3;i++)slashLine(b.x+rnd(-12,12),b.y+rnd(-12,12),b.s*1.1,rnd(-1.3,1.3),[col,'#ffffff'],180,5,i*80);smoke(b.x,b.y,4,'#2a1a3a',16,50)}
   else if(cl==='Tireur'){const f=tg.length?tg:alive(1-u.side);for(let i=0;i<8;i++){const t=f[i%f.length];if(!t)break;const b=uc(t);setTimeout(()=>{if(!B||!FXS.ctx)return;proj({x:b.x+rnd(-40,40),y:-10},{x:b.x+rnd(-10,10),y:b.y},{el:E.el,th:c},{dur:260,size:4,arc:0,lin:1}).then(()=>{if(B&&FXS.ctx)sparks(b.x,b.y,col,8,5)})},i*70/S.speed)}}
   else{for(const a of alive(u.side)){const p=uc(a);rise(p.x,p.y,[col,'#ffffff'],12,p.s*.6);glowPulse(p.x,p.y,col,500,p.s*.4)}for(const t of tg){const b=uc(t);pillarFx(b.x,b.y,col,600,b.s*.45,FXS.h*.5)}}
   for(const t of tg){const b=uc(t);ringFx(b.x,b.y,col,b.s*.55,420,4,.6);glows(b.x,b.y,[col,c2,'#ffffff'],14,4,5,34)}
   const h=HEROES[u.hid];if(h&&tg.length)textPop(m.x,m.y-m.s*.35,h.sk.n.toUpperCase(),col,h.r>=3?28:24,950);camPunch(m,1.04,300)}};
{const pf=playFx;playFx=async function(u,info){if(!u||u.hid==null||u.ux||!B||B.skip||REDUCED)return pf.apply(this,arguments);
  let E,cl;try{fxSetup();E=heroEl(u);cl=(HEROES[u.hid]||{}).c;ULTN.pre(u,E,cl);await fxWait(380)}catch(e){}
  await pf.apply(this,arguments);if(!B||B.skip||!E)return;
  try{const tg=[...new Set((info.seq||[]).filter(t=>t&&t.side!==u.side))];ULTN.post(u,tg,E,cl);await fxWait(420)}catch(e){}}}
/* légendaires sans ultra-évolution : leur propre prélude et leur propre final (Drakhar reste en feu orange) */
{const pf2=playFx;playFx=async function(u,info){const D=u&&!u.ux&&u.hid!=null&&u.hid!==65&&HEROES[u.hid]&&HEROES[u.hid].r===4&&typeof ULXD!=='undefined'&&ULXD[u.hid];
  if(!D||!B||B.skip||REDUCED)return pf2.apply(this,arguments);
  const tg0=alive(1-u.side);try{fxSetup();D.pre(u,tg0,1)}catch(e){}await fxWait(300);await pf2.apply(this,arguments);if(!B||B.skip)return;
  try{const tg=[...new Set((info.seq||[]).filter(t=>t&&t.side!==u.side))];D.post(u,tg.length?tg:tg0,1);await fxWait(350)}catch(e){}}}
