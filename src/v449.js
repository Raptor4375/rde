
/* ================= V449 : saison « L'Éclipse » (24 novembre → 8 décembre 2026) =================
   · bannière événement : Orion, « La Nuit de Midi »
   · exclusivités du Pass Pro : fond (15), avatar (30), pseudo d'éclipse (45), apparence Orion, Chasseur d'Éclipse (60)
   · animations de combat propres à l'apparence : l'ultime éteint le soleil, allume la couronne et en fait pleuvoir les flèches
   · pendant la saison, le soleil du royaume est éclipsé en plein jour (ciel violet, étoiles à midi, lanternes allumées)
   · écran de chargement de saison */
(function(){try{
const SK='or_eclipse',SEA='p_eclipse',FN="Pass Pro « L'Éclipse »";
const ECL=()=>{try{return passSeason().k===SEA}catch(e){return false}};
window.RDE_ECLIPSE=ECL;

/* ---------- bannière ---------- */
EVB.ev_eclipse={h:63,start:'2026-11-24',n:"La Nuit de Midi",d:"Le soleil s'est éteint en plein jour. Orion, lui, a levé son arc."};
BANS.ev_eclipse={n:EVB.ev_eclipse.n,start:EVB.ev_eclipse.start};

/* ---------- exclusivités du Pass Pro ---------- */
try{
  NFX.eclipse={n:"Pseudo d'éclipse",season:SEA,how:FN+' : palier 45'};
  PBG.eclipse={n:"Fond « L'Éclipse »",season:SEA,art:()=>NART[SEA](),how:FN+' : palier 15'};
  if(typeof AVX!=='undefined')AVX.or_eclipse_av={n:"Orion, Chasseur d'Éclipse",how:FN+' : palier 30',art:()=>{try{return portraitU(vHero(SK),2)}catch(e){return''}},hide:()=>!skinOn()};
  SEASON_COS[SEA]={bg:[15,'eclipse'],av:[30,'or_eclipse_av'],nfx:[45,'eclipse'],skin:[60,SK]};
  setTimeout(()=>{try{cosRetro()}catch(e){}},2500);
}catch(e){console.warn('eclipse cos',e)}

/* ---------- le soleil éclipsé, en plein jour, dans tout le royaume ---------- */
const f1=n=>(+n).toFixed(1);
function eclSun(x,y){const R=14;let s=`<circle cx="${x}" cy="${y}" r="50" fill="#c890ff" opacity=".14"/><circle cx="${x}" cy="${y}" r="31" fill="#ffe8b0" opacity=".2"/><circle cx="${x}" cy="${y}" r="19" fill="#fff6dc" opacity=".55"/>`;
  for(let k=0;k<16;k++){const a=(k*22.5-90+(k%2?6:0))*Math.PI/180,L=R*(k%4===0?2.7:k%2?1.6:2.1),w=k%4===0?2.2:1.3,ca=Math.cos(a),sa=Math.sin(a);
    s+=`<path d="M${f1(x+ca*R*.95-sa*w)} ${f1(y+sa*R*.95+ca*w)}L${f1(x+ca*L)} ${f1(y+sa*L)}L${f1(x+ca*R*.95+sa*w)} ${f1(y+sa*R*.95-ca*w)}Z" fill="${k%4===0?'#fff4d8':'#e8d8ff'}" opacity="${k%4===0?.8:.5}"/>`}
  s+=`<circle cx="${x}" cy="${y}" r="${R}" fill="#07040f"/><circle cx="${x}" cy="${y}" r="${R}" fill="none" stroke="#fff2c8" stroke-width="1.4"/><circle cx="${x}" cy="${y}" r="${R+1.6}" fill="none" stroke="#c890ff" stroke-width=".8" opacity=".6"/>`;
  const dx=x+Math.cos(-.66)*R,dy=y+Math.sin(-.66)*R;
  s+=`<g><animate attributeName="opacity" values=".5;1;.5" dur="3s" repeatCount="indefinite"/><circle cx="${f1(dx)}" cy="${f1(dy)}" r="5" fill="#ffffff" opacity=".35"/><path d="M${f1(dx)} ${f1(dy-9)}Q${f1(dx)} ${f1(dy)} ${f1(dx+9)} ${f1(dy)}Q${f1(dx)} ${f1(dy)} ${f1(dx)} ${f1(dy+9)}Q${f1(dx)} ${f1(dy)} ${f1(dx-9)} ${f1(dy)}Q${f1(dx)} ${f1(dy)} ${f1(dx)} ${f1(dy-9)}Z" fill="#ffffff"/></g>`;
  return s}
window.RDEeclSun=eclSun;
try{const l2=lbScene2;lbScene2=function(tab,places,E){if(!ECL()||!E||!(E.m>=405&&E.m<1155))return l2.apply(this,arguments);
  const E2=Object.assign({},E,{dark:Math.max(E.dark||0,.62),warm:0,top:'#0b0726',bot:'#4a3486'});
  let v=l2.call(this,tab,places,E2);
  v=v.replace(/<circle cx="(-?\d+)" cy="(-?\d+)" r="40" fill="url\(#zsun\)"\/><circle cx="-?\d+" cy="-?\d+" r="15" fill="#fff3b0"\/>/,(m,x,y)=>eclSun(+x,+y));
  return v};try{LSC2.clear()}catch(e){}}catch(e){console.warn('eclipse deco',e)}
function eclHtml(){document.documentElement.classList.toggle('eclipse',ECL())}
if(document.body)eclHtml();else document.addEventListener('DOMContentLoaded',eclHtml);
setInterval(eclHtml,60000);

/* ---------- écran de chargement ---------- */
const skImgURI=(k,u)=>{try{return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStill(heroBody(vHero(k),u)))}catch(e){return''}};
function btSceneEclipse(){const R=rng(Date.now()%7919);const r=(a,b)=>a+R()*(b-a);
  let stars='';for(let k=0;k<26;k++)stars+=`<i style="left:${r(0,100).toFixed(1)}%;top:${r(0,46).toFixed(1)}%;animation-delay:${r(0,4).toFixed(1)}s;width:${r(1.4,3).toFixed(1)}px;height:${r(1.4,3).toFixed(1)}px"></i>`;
  let motes='';for(let k=0;k<9;k++)motes+=`<i class="fk" style="left:${r(2,96).toFixed(1)}%;animation-delay:${r(-10,0).toFixed(1)}s;animation-duration:${r(9,14).toFixed(1)}s;width:${r(3,6).toFixed(0)}px;height:${r(3,6).toFixed(0)}px"></i>`;
  const own=k=>{try{return!!SKINS[k]&&skOwned(k)}catch(e){return false}};
  const T=[[own('so_noir')?'so_noir':null,57],[null,62],[own(SK)?SK:null,63],[null,64],[null,70]];
  const party=T.map(([k,id],i)=>{const src=k?skImgURI(k,0):btImg(id,0);return`<div class="b3h q${i}"><i class="b3glow"></i><img src="${src}" alt=""></div>`}).join('');
  let ray='';for(let i=0;i<24;i++){const a=i*15,L=i%3===0?118:i%2?74:92,w=i%3===0?5:3;ray+=`<path transform="rotate(${a})" d="M${-w} -46L0 -${L}L${w} -46Z" fill="${i%3===0?'#fff4d8':'#e0ccff'}" opacity="${i%3===0?.8:.5}"/>`}
  const sun=`<svg class="eclsun" viewBox="-130 -130 260 260" aria-hidden="true"><defs><radialGradient id="eclg"><stop offset="0" stop-color="#fff6dc" stop-opacity=".95"/><stop offset=".32" stop-color="#ffe8b0" stop-opacity=".55"/><stop offset=".6" stop-color="#c890ff" stop-opacity=".22"/><stop offset="1" stop-color="#c890ff" stop-opacity="0"/></radialGradient></defs>
    <circle r="128" fill="url(#eclg)"/><g class="eclrays">${ray}</g><circle r="47" fill="#07040f"/><circle r="47" fill="none" stroke="#fff2c8" stroke-width="3"/><circle r="51" fill="none" stroke="#c890ff" stroke-width="1.4" opacity=".7"/>
    <g class="ecldia" transform="translate(36 -30)"><circle r="11" fill="#ffffff" opacity=".35"/><path d="M0 -20Q0 0 20 0Q0 0 0 20Q0 0 -20 0Q0 0 0 -20Z" fill="#ffffff"/><circle r="3.4" fill="#ffffff"/></g></svg>`;
  const fr=(function(){try{return String(localStorage.getItem('rde-lang')||navigator.language||'fr').slice(0,2).toLowerCase()}catch(e){return'fr'}})()==='fr';
  return`<div class="b2 b3 bs bse"><div class="bssky"></div><div class="bsstars">${stars}</div>${sun}
   <svg class="b3hills" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 112L52 70L96 98L150 46L206 96L262 58L318 92L366 66L400 84V200H0Z" fill="#2a1a5a"/><path d="M150 46L162 58L152 60L140 56ZM262 58L274 70L264 72L252 68Z" fill="#c8b0ff" opacity=".5"/><path d="M0 128Q100 104 200 124T400 116V200H0Z" fill="#1c1240"/><path d="M0 164Q120 142 220 158T400 152V200H0Z" fill="#110a2a"/>
    <g fill="#ffd884" opacity=".85">${[[48,142],[64,146],[300,150],[318,146],[336,152]].map(([x,y])=>`<rect x="${x}" y="${y}" width="3" height="4" rx=".8"/>`).join('')}</g></svg>
   <div class="bsfall eclfall">${motes}</div><div class="b3party">${party}</div><div class="bsplume">${plumeSVG('happy')}</div>
   <div class="b2top"><div class="b2title">${fr?"Royaumes<span>d'Éther</span>":'Realms<span>of Ether</span>'}</div><div class="b3sub bsbook">🌑 ${fr?"Saison · L'Éclipse":'Season · The Eclipse'}</div><div class="bssub">${fr?'Le soleil s\'éteint en plein jour…':'The sun goes out at noon…'}</div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">${fr?'Le soleil s\'éteint en plein jour…':'The sun goes out at noon…'}</div><div class="b2tap" id="b2tap" hidden>${fr?'Touche pour entrer dans le royaume':'Tap to enter the realm'}</div><div class="b2snd" id="b2snd">🔊 ${fr?"Touche l'écran pour le son":'Tap the screen for sound'}</div></div></div>`}
window.btSceneEclipse=btSceneEclipse;
{const s3=btSceneSaga3;btSceneSaga3=function(){if(ECL())try{return btSceneEclipse()}catch(e){}return s3.apply(this,arguments)}}
{const sg=btSceneSaga;btSceneSaga=function(){if(ECL())try{return btSceneEclipse()}catch(e){}return sg.apply(this,arguments)}}
(function(){try{if(BOOT.done||!ECL())return;const b=document.getElementById('boot');const rr=b&&b.querySelector('.b2');if(!rr)return;const st=rr.querySelector('#b2start'),bar=rr.querySelector('.bt-bar i'),w=bar?bar.style.width:'';
  const tmp=document.createElement('div');tmp.innerHTML=btSceneEclipse();const n=tmp.firstElementChild;if(!n)return;if(st)n.appendChild(st);const nb=n.querySelector('.bt-bar i');if(nb&&w)nb.style.width=w;rr.replaceWith(n)}catch(e){console.warn('boot eclipse',e)}})();
try{if(ECL()&&typeof BTIPS!=='undefined'){BTIPS.length=0;["Le soleil s'éteint en plein jour…","Les étoiles se lèvent à midi…","Orion tend son arc vers le ciel noir.","Astuce : la bannière « La Nuit de Midi » dure toute la saison.","Astuce : le palier 60 du Pass Pro offre Orion, Chasseur d'Éclipse.","Plume : « Hou… il fait nuit, je peux dormir ? »"].forEach(t=>BTIPS.push(t))}}catch(e){}

/* ---------- animations de combat de l'apparence ---------- */
try{if(window.SKANIM){
  const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&FXS.ctx;
  const later=(ms,fn)=>setTimeout(()=>{if(!ok())return;try{fn()}catch(e){}},ms/(S.speed||1));
  const snd=(n,k)=>{try{if(!AU||!AU.ctx||!cSnd.ok())return;SND[n](AU.F.v,NOW(),k||1)}catch(e){}};
  function layer(X,draw){const it={t0:performance.now(),dur:60000,draw:null};it.draw=c=>{const now=performance.now(),sp=S.speed||1;let al=Math.min(1,(now-it.t0)/(200/sp));if(it.e)al*=Math.max(0,1-(now-it.e)/(340/sp));if(al<=0)return;draw(c,al,(now-it.t0)/1000*sp)};FXS.items.push(it);fxRun();(X.L=X.L||[]).push(it);return it}
  function endLayers(X){const now=performance.now(),sp=S.speed||1;for(const it of X.L||[])if(!it.e){it.e=now;it.dur=now-it.t0+360/sp}for(const v of X.V||[])try{v.end()}catch(e){}X.V=[]}
  function domVeil(X,col,max){try{const v=window.RDEveil&&RDEveil(col,max);if(v){(X.V=X.V||[]).push(v);return}}catch(e){}layer(X,(c,al)=>{c.globalAlpha=al*max;c.fillStyle=col;c.fillRect(0,0,FXS.w,FXS.h)})}
  function finTitle(X,col){const m=rowMid(1-X.u.side),t=String(X.A.fin);textPop(FXS.w/2,m.y-m.s*.35,t,col,Math.max(16,Math.min(28,FXS.w*.9/(t.length*.68))),1100);for(const t2 of X.tg)cardFlash(t2,true)}
  /* l'éclipse dans le ciel : le soleil, puis la lune qui glisse dessus ; la couronne s'allume à la totalité.
     st.leave (secondes) : la lune repart ; st.burst : le soleil revient d'un coup */
  function skyEclipse(X,cx,cy,R,st){return layer(X,(c,al,t)=>{const cov=Math.min(1,t/.85),e=ease(cov),out=st.leave!=null&&t>st.leave?Math.min(1,(t-st.leave)/.5):0;
      const mx=cx-R*2.4*(1-e)+R*2.6*ease(out),my=cy+R*.3*(1-e)-R*.2*out,tot=e*(1-out);
      c.globalCompositeOperation='lighter';
      const g=R*(3+1.2*out);c.globalAlpha=al*(1-.6*tot);c.drawImage(spr('#ffd884'),cx-g,cy-g,g*2,g*2);
      if(tot>.45){const ca=Math.min(1,(tot-.45)/.45);c.globalAlpha=al*ca*.85;c.save();c.translate(cx,cy);
        for(let i=0;i<20;i++){const a=i/20*6.283+t*.1+(i%2?.08:0),L=R*(i%4===0?2.7:i%2?1.55:2.05)*(1+.07*Math.sin(t*2.4+i)),w=i%4===0?.07:.045;
          c.fillStyle=i%4===0?'#fff4d8':i%3?'#e0ccff':'#c890ff';c.beginPath();c.moveTo(Math.cos(a-w)*R*.96,Math.sin(a-w)*R*.96);c.lineTo(Math.cos(a)*L,Math.sin(a)*L);c.lineTo(Math.cos(a+w)*R*.96,Math.sin(a+w)*R*.96);c.closePath();c.fill()}
        c.globalAlpha=al*ca*.7;c.drawImage(spr('#c890ff'),-R*2.2,-R*2.2,R*4.4,R*4.4);c.restore()}
      c.globalAlpha=al;c.fillStyle='#fff6c8';c.beginPath();c.arc(cx,cy,R,0,7);c.fill();
      c.globalCompositeOperation='source-over';c.globalAlpha=al;c.fillStyle='#07040f';c.beginPath();c.arc(mx,my,R*1.03,0,7);c.fill();
      if(tot>.9){c.globalCompositeOperation='lighter';c.globalAlpha=al*(tot-.9)*10;c.strokeStyle='#fff2c8';c.lineWidth=Math.max(1.6,R*.07);c.beginPath();c.arc(cx,cy,R*1.03,0,7);c.stroke()}
      if(st.ring!=null&&t>st.ring&&t<st.ring+.7){const f=(t-st.ring)/.7,a=-.7,dx=cx+Math.cos(a)*R,dy=cy+Math.sin(a)*R,z=R*(1.1+1.4*Math.sin(Math.min(1,f*2)*Math.PI/2))*(1-f*.5);
        c.globalCompositeOperation='lighter';c.globalAlpha=al*(1-f);c.drawImage(spr('#ffffff'),dx-z*1.6,dy-z*1.6,z*3.2,z*3.2);c.strokeStyle='#ffffff';c.lineWidth=2;c.beginPath();c.moveTo(dx-z*2.4,dy);c.lineTo(dx+z*2.4,dy);c.moveTo(dx,dy-z*2.4);c.lineTo(dx,dy+z*2.4);c.stroke()}})}
  /* une flèche de lumière : trait doré, traîne violette, pointe en croissant */
  function arrowFx(f,t,dur,k=1,col='#ffe8b0',tail='#c890ff'){fxItem(dur,(c,p)=>{const q=p<1?1-Math.pow(1-p,2):1,x=lerp(f.x,t.x,q),y=lerp(f.y,t.y,q),an=Math.atan2(t.y-f.y,t.x-f.x),L=Math.min(150,Math.hypot(t.x-f.x,t.y-f.y)*.45)*k;
      c.globalCompositeOperation='lighter';c.translate(x,y);c.rotate(an);const g=c.createLinearGradient(-L,0,6,0);g.addColorStop(0,hexA(tail,0));g.addColorStop(.6,hexA(tail,.55));g.addColorStop(1,hexA(col,.95));
      c.fillStyle=g;c.beginPath();c.moveTo(-L,-1.6*k);c.lineTo(2,-3*k);c.lineTo(2,3*k);c.lineTo(-L,1.6*k);c.closePath();c.fill();
      c.fillStyle='#ffffff';c.beginPath();c.moveTo(14*k,0);c.quadraticCurveTo(2*k,-3*k,-2*k,-9*k);c.quadraticCurveTo(5*k,-2*k,4*k,0);c.quadraticCurveTo(5*k,2*k,-2*k,9*k);c.quadraticCurveTo(2*k,3*k,14*k,0);c.fill();
      c.drawImage(spr(col),-14*k,-14*k,28*k,28*k)})}
  /* petite éclipse à l'impact : un disque noir bordé d'or qui s'ouvre et s'éteint */
  function eclRing(b,k=1,dur=380){fxItem(dur,(c,p)=>{const r=b.s*.3*k*(.55+.45*ease(p));c.translate(b.x,b.y);c.globalCompositeOperation='source-over';c.globalAlpha=(1-p)*.55;c.fillStyle='#07040f';c.beginPath();c.arc(0,0,r,0,7);c.fill();
      c.globalCompositeOperation='lighter';c.globalAlpha=1-p;c.strokeStyle='#fff2c8';c.lineWidth=2.4;c.beginPath();c.arc(0,0,r,0,7);c.stroke();c.strokeStyle='#c890ff';c.lineWidth=1.2;c.beginPath();c.arc(0,0,r*1.18,0,7);c.stroke()})}
  /* l'anneau de diamant : un éclat blanc en croix */
  function diamond(x,y,s,dur=300){fxItem(dur,(c,p)=>{const z=s*(.4+.8*Math.sin(Math.min(1,p*2)*Math.PI/2))*(1-p*.4);c.globalCompositeOperation='lighter';c.globalAlpha=1-p;c.drawImage(spr('#ffffff'),x-z,y-z,z*2,z*2);
      c.strokeStyle='#ffffff';c.lineWidth=1.8;c.beginPath();c.moveTo(x-z*1.6,y);c.lineTo(x+z*1.6,y);c.moveTo(x,y-z*1.6);c.lineTo(x,y+z*1.6);c.stroke()})}
  function bowDraw(a,s,dir,dur){fxItem(dur,(c,p)=>{const o=ease(Math.min(1,p*2.2)),al=p>.75?(1-p)/.25:1;c.globalCompositeOperation='lighter';c.translate(a.x,a.y-s*.1);c.rotate(-1.05*dir);c.globalAlpha=al;
      c.strokeStyle='#ffe8b0';c.lineWidth=3;c.beginPath();c.arc(0,0,s*.75,-1.15,1.15);c.stroke();c.strokeStyle='#ffffff';c.lineWidth=1.2;const pull=s*.32*o;
      const x1=Math.cos(-1.15)*s*.75,y1=Math.sin(-1.15)*s*.75;c.beginPath();c.moveTo(x1,y1);c.lineTo(x1-pull,0);c.lineTo(x1,-y1);c.stroke();
      c.drawImage(spr('#ffe8b0'),x1-pull-14,-14,28,28)})}
  const motes=(n,dur)=>{for(let k=0;k<n;k++)later(k*dur/n,()=>emit(1,()=>({k:'shape',sh:'star',x:rnd(0,FXS.w),y:-10,vx:rnd(-.4,.4),vy:rnd(.9,1.8),life:120,max:120,s:rnd(2,4),c:k%2?'#ffe8b0':'#e0ccff',rot:rnd(0,6),vr:rnd(-.04,.04),fade:1.4,add:1})))};
  SKANIM.reg(SK,{th:['#c890ff','#ffe8b0'],el:'astral',cut:['#2a1458','#ffe8b0'],fin:'ÉCLIPSE TOTALE',
    aura(a){shapes(a.x,a.y,'star',['#ffe8b0','#e0ccff'],8,2.4,3.6,50,-.02,{add:1});ringFx(a.x,a.y,'#c890ff',a.s*.7,600,3,.5)},
    async ult(X){const {u,ux}=X,a=uc(u),W=FXS.w,H=FXS.h,m=rowMid(1-u.side),dir=u.side?-1:1,cx=W/2,cy=H*.2,R=Math.min(W,H)*.085,st={},ct=it=>(performance.now()-it.t0)/1000*(S.speed||1);
      domVeil(X,'#05030f',.64);motes(18+ux*4,1800);
      FXD.sigil(a.x,a.y+a.s*.5,a.s*1.1,'#c890ff',1500,.38,12);glowPulse(a.x,a.y,'#ffe8b0',700,a.s*.5);
      const SKY=skyEclipse(X,cx,cy,R,st);
      try{FXD.constellation([[cx-W*.32,cy+R*.4],[cx-W*.22,cy-R*.6],[cx-W*.12,cy+R*.2],[cx+W*.12,cy-R*.3],[cx+W*.24,cy+R*.5],[cx+W*.33,cy-R*.2]],'#e0ccff',1600)}catch(e){}
      await fxWait(900);if(!ok())return;
      /* totalité : Orion tend son arc vers l'astre éteint */
      snd('chime');flash('#c890ff',160,.25);bowDraw(a,a.s,dir,700);await fxWait(420);if(!ok())return;
      snd('arrow',1.3);arrowFx(a,{x:cx+Math.cos(-.7)*R,y:cy+Math.sin(-.7)*R},240,1.3);await fxWait(230);if(!ok())return;
      st.ring=ct(SKY);flash('#ffffff',200,.55);shake(2);snd('zap',1.2);ringFx(cx,cy,'#fff2c8',R*3.2,700,5,1);
      await fxWait(260);if(!ok())return;
      /* la couronne se brise en flèches : une par coup de l'ultime */
      const seq=X.seq.length?X.seq:X.tg;
      seq.forEach((t,i)=>later(i*105,()=>{const b=uc(t),an=-Math.PI/2+rnd(-1.1,1.1),o={x:cx+Math.cos(an)*R*1.9,y:cy+Math.sin(an)*R*1.9};snd('arrow');arrowFx(o,b,230,1.05);
        later(225,()=>{hit(X,t,1.15);eclRing(b,1);crescent(b.x,b.y,b.s*.55,-.7,['#c890ff','#ffe8b0'],260,9);sparks(b.x,b.y,'#ffe8b0',9,5,1.6,18);ringFx(b.x,b.y+b.s*.3,'#c890ff',b.s*.4,340,3,.4)})}));
      await fxWait(240+seq.length*105);if(!ok())return;shake(2);camPunch(m,1.06,340);await fxWait(420);if(!ok())return;
      if(ux>0){for(let r=0;r<1+ux;r++){if(!ok())return;st.ring=ct(SKY);diamond(cx+Math.cos(-.7)*R,cy+Math.sin(-.7)*R,R*.9,320);
          X.tg.forEach((t,i)=>later(i*60,()=>{const b=uc(t),o={x:cx+rnd(-R*1.6,R*1.6),y:cy+R*1.4};arrowFx(o,b,200,1.15);later(200,()=>{eclRing(b,1.2);diamond(b.x+b.s*.2,b.y-b.s*.2,b.s*.35,260);sparks(b.x,b.y,'#fff2c8',10,6);cardFlash(t,r===ux)})}));
          try{ultraHitSnd()}catch(e){}await fxWait(330);if(!ok())return;shake(2)}
        finTitle(X,'#ffe8b0');await fxWait(520);if(!ok())return}
      /* le soleil revient */
      st.leave=ct(SKY);await fxWait(320);if(!ok())return;flash('#fff4d8',260,.5);glowPulse(cx,cy,'#ffd884',500,R*2.2);await fxWait(260);
      endLayers(X)},
    basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.3:1)*(1+ux*.12);try{cardMove(s,(b.x-a.x)*.1,(b.y-a.y)*.1,200)}catch(e){}
      snd('arrow');arrowFx({x:a.x,y:a.y-a.s*.1},b,220,k);
      later(210,()=>{eclRing(b,k);crescent(b.x,b.y,b.s*.52*k,-.7,['#c890ff','#ffe8b0'],240,9*k);sparks(b.x,b.y,'#ffe8b0',8,5,1.6,18);ringFx(b.x,b.y+b.s*.3,'#c890ff',b.s*.34*k,300,3,.4);
        if(ux)shapes(b.x,b.y,'star',['#ffe8b0','#e0ccff'],2+ux,2.5,3.5,44,.02,{add:1});
        if(crit){camPunch(b,1.04,220);diamond(b.x+b.s*.22,b.y-b.s*.22,b.s*.4,280);glowPulse(b.x,b.y,'#ffe8b0',300,b.s*.42)}})}});
}}catch(e){console.warn('eclipse anim',e)}

/* ---------- annonce de saison ---------- */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(ECL()&&Date.now()<passEndAt()&&!L.some(a=>a.k==='eclipse1'))L.unshift({k:'eclipse1',ac:'#c890ff',tag:'NOUVELLE SAISON',t:"L'Éclipse 🌑",
  x:`À midi, le soleil s'est éteint : jusqu'au <b>8 décembre</b>, le royaume vit une nuit en plein jour. Nouvelle bannière <b>« La Nuit de Midi »</b> avec Orion, et dans le <b>Pass Pro</b> : un fond, un avatar, un pseudo d'éclipse et l'apparence légendaire <b>Orion, Chasseur d'Éclipse</b> au palier 60, avec ses propres animations de combat.`,
  art:()=>{try{return`<div class="skann">${heroBody(vHero(SK),3)}</div>`}catch(e){return''}},go:'🌑 Voir le pass',fn:()=>{TAB='event';UI.evt='pass';try{UI.lz=UI.lz||{};UI.lz.event='pass'}catch(e){}}})}catch(e){}return L}}catch(e){}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.nfx-eclipse{background:linear-gradient(90deg,#ffe8b0 0%,#fff6dc 22%,#c890ff 48%,#8a5aff 62%,#ffe8b0 100%);-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:none;filter:drop-shadow(0 0 3px rgba(200,144,255,.75));font-weight:900}
html.eclipse .tabbar,html.eclipse nav.tabs{box-shadow:inset 0 2px 0 rgba(255,232,176,.4),0 -6px 18px -8px rgba(200,144,255,.5)}
html.eclipse .top,html.eclipse header.top{box-shadow:0 2px 0 rgba(255,232,176,.25),0 8px 22px -12px rgba(200,144,255,.6)}
html.eclipse .lobby{box-shadow:inset 0 0 40px rgba(200,144,255,.25)}
.gvcard{display:none}
.bse .bssky{background:radial-gradient(70% 45% at 50% 20%,rgba(200,144,255,.28),transparent 70%),linear-gradient(180deg,#05030f 0%,#140a33 40%,#2a1a5a 70%,#3a2a6a 100%)}
.bse .b2title{text-shadow:0 3px 0 #1a0a3a,0 0 26px rgba(255,232,176,.7)}
.bse .bssub{color:#efe6ff}.bse .bsbook{color:#ffe8b0}
.bse .b3glow{background:radial-gradient(ellipse,rgba(200,144,255,.55),transparent 70%)!important}
.eclsun{position:absolute;left:50%;top:2%;width:min(62vw,250px);transform:translate(-50%,0);pointer-events:none;filter:drop-shadow(0 0 16px rgba(255,232,176,.45))}
.eclsun .eclrays{transform-origin:0 0;animation:eclspin 60s linear infinite}
.eclsun .ecldia{animation:ecldia 3.2s ease-in-out infinite}
@keyframes eclspin{to{transform:rotate(360deg)}}
@keyframes ecldia{0%,100%{opacity:.55}50%{opacity:1}}
.eclfall i.fk{border-radius:50%;background:radial-gradient(circle,#fff6dc 0 40%,rgba(255,232,176,0) 72%)}
@media(prefers-reduced-motion:reduce){.eclsun .eclrays,.eclsun .ecldia{animation:none}}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{Object.assign(I18N_EN,{"La Nuit de Midi":'The Noon Night',"Orion, Chasseur d'Éclipse":'Orion, Eclipse Hunter',"Pseudo d'éclipse":'Eclipse name',"Fond « L'Éclipse »":'“The Eclipse” background','ÉCLIPSE TOTALE':'TOTAL ECLIPSE',
  "L'Éclipse 🌑":'The Eclipse 🌑','🌑 Voir le pass':'🌑 See the pass','Couronne Noire':'Black Corona','Anneau de Diamant':'Diamond Ring','Totalité':'Totality',"Chasseur d'Éclipse":'Eclipse Hunter',
  "Le soleil s'est éteint en plein jour. Orion, lui, a levé son arc.":'The sun went out at noon. Orion raised his bow.',
  "À midi, le soleil s'est éteint. Tout le royaume a levé les yeux vers le ciel noir… sauf Orion, qui a levé son arc. Ses flèches sont taillées dans la couronne de lumière qui brille encore autour de l'astre éteint.":"At noon, the sun went out. The whole realm looked up at the black sky… except Orion, who raised his bow. His arrows are cut from the crown of light still shining around the dead star."})}catch(e){}

/* ---------- notes de version ---------- */
try{const I=["🌑 <b>Nouvelle saison : L'Éclipse</b>, jusqu'au 8 décembre. À midi, le soleil s'éteint : en journée, tout le royaume passe sous un ciel violet, avec une éclipse à la place du soleil et des étoiles en plein jour. Nouvel écran de chargement.",
  "🏹 <b>Bannière « La Nuit de Midi »</b> : Orion, 50/50 puis garanti, pendant toute la saison.",
  "🎟️ <b>Exclusivités du Pass Pro</b> : fond « L'Éclipse » (palier 15), avatar Orion (palier 30), pseudo d'éclipse (palier 45) et l'apparence légendaire <b>Orion, Chasseur d'Éclipse</b> (palier 60) : cape noire doublée d'or, arc de lumière, éclipse et constellations. Son ultime éteint le soleil, allume sa couronne et en fait pleuvoir les flèches sur les ennemis."];
 PATCH.unshift({v:'v74',d:Date.now(),t:"Saison L'Éclipse",items:I});
 const E=["🌑 <b>New season: The Eclipse</b>, until December 8. At noon the sun goes out: during the day, the whole realm sits under a violet sky, with an eclipse instead of the sun and stars in broad daylight. New loading screen.",
  "🏹 <b>“The Noon Night” banner</b>: Orion, 50/50 then guaranteed, for the whole season.",
  "🎟️ <b>Pro Pass exclusives</b>: “The Eclipse” background (tier 15), Orion avatar (tier 30), eclipse name (tier 45) and the legendary look <b>Orion, Eclipse Hunter</b> (tier 60): black cloak lined with gold, bow of light, eclipse and constellations. His ultimate puts out the sun, lights its corona and rains its arrows down on the enemies."];
 I.forEach((x,i)=>{I18N_EN[x]=E[i]});I18N_EN["Saison L'Éclipse"]='The Eclipse season'}catch(e){}
}catch(e){console.warn('saison eclipse',e)}})();
