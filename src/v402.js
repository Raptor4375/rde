
/* ================= V402 : saison « Givre éternel » (10 → 24 novembre 2026) =================
   · bannière événement : Kaïros, « L'Hiver Immobile »
   · exclusivités du Pass Pro : fond (15), avatar (30), pseudo de givre (45), apparence Kaïros, l'Hiver Immobile (60)
   · animations de combat propres à l'apparence
   · tout le royaume passe en décor d'hiver pendant la saison (sans toucher au boss de saison)
   · écran de chargement de saison */
(function(){try{
const SK='ka_hiver',SEA='p_givre2',FN="Pass Pro « Givre éternel »";
const GIV=()=>{try{return passSeason().k===SEA}catch(e){return false}};
window.RDE_GIVRE=GIV;

/* ---------- bannière ---------- */
EVB.ev_givre={h:58,start:'2026-11-10',n:"L'Hiver Immobile",d:"Le temps lui-même a gelé. Kaïros en est le gardien."};
BANS.ev_givre={n:EVB.ev_givre.n,start:EVB.ev_givre.start};

/* ---------- exclusivités du Pass Pro ---------- */
try{
  NFX.givre={n:'Pseudo de givre',season:SEA,how:FN+' : palier 45'};
  PBG.givre={n:'Fond « Givre éternel »',season:SEA,art:()=>NART[SEA](),how:FN+' : palier 15'};
  if(typeof AVX!=='undefined')AVX.ka_hiver_av={n:"Kaïros, l'Hiver Immobile",how:FN+' : palier 30',art:()=>{try{return portraitU(vHero(SK),2)}catch(e){return''}},hide:()=>!skinOn()};
  SEASON_COS[SEA]={bg:[15,'givre'],av:[30,'ka_hiver_av'],nfx:[45,'givre'],skin:[60,SK]};
}catch(e){console.warn('givre cos',e)}

/* ---------- décor d'hiver pendant la saison ---------- */
let FORCE=0;
const asWinter=fn=>function(){if(!GIV()||window.SEASON_TEST)return fn.apply(this,arguments);window.SEASON_TEST='hiver';FORCE++;try{return fn.apply(this,arguments)}finally{FORCE--;try{delete window.SEASON_TEST}catch(e){window.SEASON_TEST=undefined}}};
/* le boss de saison reste celui de la vraie saison */
const realSeason=fn=>function(){if(!FORCE)return fn.apply(this,arguments);const v=window.SEASON_TEST;try{delete window.SEASON_TEST}catch(e){window.SEASON_TEST=undefined}try{return fn.apply(this,arguments)}finally{window.SEASON_TEST=v}};
try{SB=realSeason(SB);sbDef=realSeason(sbDef);sbBuilding=realSeason(sbBuilding);sbPage=realSeason(sbPage);sbAttempts=realSeason(sbAttempts);if(evB.sboss)evB.sboss.b=sbBuilding}catch(e){}
try{
  if(GIV()&&seasonNow()!=='hiver'){const P=SPAL.hiver;for(const t of Object.keys(LTH)){const base=LTH0[t]||LTH0.def;Object.assign(LTH[t],base);if(t==='top')Object.assign(LTH[t],{hill:P.all.hill,tree:P.all.tree,mtn:P.all.mtn||base.mtn});else Object.assign(LTH[t],P.all)}
    if(LTH.top)Object.assign(LTH.top,{g1:'#e4e8f0',g2:'#eef2f8',g3:'#b8c0d0'})}
  lbScene2=asWinter(lbScene2);lobbyBlock=asWinter(lobbyBlock);lobbyPage=asWinter(lobbyPage);
  if(typeof wxSim==='function')wxSim=asWinter(wxSim);
  try{LSC2.clear()}catch(e){}
}catch(e){console.warn('givre deco',e)}
/* flocons sur tout le jeu, givre sur les bords de l'écran et la barre d'onglets */
function snowLayer(){if(!GIV()||document.getElementById('gvsnow'))return;const d=document.createElement('div');d.id='gvsnow';d.setAttribute('aria-hidden','true');
  let h='';for(let k=0;k<12;k++){const x=((k*.618)%1*100).toFixed(1),dl=(-(k*1.37)%11).toFixed(1),du=(9+(k*.53)%6).toFixed(1),s=(4+(k*7)%6);h+=`<i style="left:${x}%;width:${s}px;height:${s}px;animation-duration:${du}s;animation-delay:${dl}s"></i>`}
  d.innerHTML=h;document.body.appendChild(d);document.documentElement.classList.add('givre')}
if(document.body)snowLayer();else document.addEventListener('DOMContentLoaded',snowLayer);
setInterval(()=>{if(!GIV()){const d=document.getElementById('gvsnow');if(d)d.remove();document.documentElement.classList.remove('givre')}},60000);

/* ---------- écran de chargement ---------- */
const skImgURI=(k,u)=>{try{return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStill(heroBody(k?vHero(k):HEROES[58],u)))}catch(e){return''}};
function btSceneGivre(){const R=rng(Date.now()%6067);const r=(a,b)=>a+R()*(b-a);
  let stars='';for(let k=0;k<16;k++)stars+=`<i style="left:${r(0,100).toFixed(1)}%;top:${r(0,34).toFixed(1)}%;animation-delay:${r(0,4).toFixed(1)}s;width:${r(1.5,3).toFixed(1)}px;height:${r(1.5,3).toFixed(1)}px"></i>`;
  let fall='';for(let k=0;k<8;k++)fall+=`<i class="fk" style="left:${r(2,96).toFixed(1)}%;animation-delay:${r(-9,0).toFixed(1)}s;animation-duration:${r(8,13).toFixed(1)}s;width:${r(4,8).toFixed(0)}px;height:${r(4,8).toFixed(0)}px"></i>`;
  const own=k=>{try{return!!SKINS[k]}catch(e){return false}};
  const T=[[own('sr_neiges')?'sr_neiges':null,71],[own('va_givre')?'va_givre':null,61],[own(SK)?SK:null,58],[null,66],[null,62]];
  const party=T.map(([k,id],i)=>{const src=k?skImgURI(k,0):btImg(id,0);return`<div class="b3h q${i}"><i class="b3glow"></i><img src="${src}" alt=""></div>`}).join('');
  const clock=`<svg class="gvclock" viewBox="-60 -60 120 120" aria-hidden="true"><defs><radialGradient id="gvcg"><stop offset="0" stop-color="#e8f8ff" stop-opacity=".85"/><stop offset="1" stop-color="#8ad8ff" stop-opacity="0"/></radialGradient></defs>
    <circle r="58" fill="url(#gvcg)"/><circle r="40" fill="rgba(10,40,80,.35)" stroke="#e8f8ff" stroke-width="2.4"/><circle r="34" fill="none" stroke="#bfe6ff" stroke-width=".8" stroke-dasharray="1 4.33"/>
    ${[...Array(12)].map((_,i)=>{const a=i*30*Math.PI/180;return`<path d="M${(Math.sin(a)*31).toFixed(1)} ${(-Math.cos(a)*31).toFixed(1)}L${(Math.sin(a)*37).toFixed(1)} ${(-Math.cos(a)*37).toFixed(1)}" stroke="#ffffff" stroke-width="${i%3?1:2.2}"/>`}).join('')}
    <path d="M0 0L-12 -18" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/><path d="M0 0L20 -24" stroke="#e8f8ff" stroke-width="1.8" stroke-linecap="round"/><circle r="3" fill="#ffffff"/>
    <path d="M-30 -12L-16 -6L-12 6L2 4" fill="none" stroke="#ffffff" stroke-width=".9" opacity=".9"/><path d="M26 18L14 10L8 22" fill="none" stroke="#ffffff" stroke-width=".9" opacity=".9"/>
    ${[0,1,2,3,4,5,6,7].map(i=>{const a=i*45;return`<g transform="rotate(${a}) translate(0 -46)"><path d="M0 -12L3.4 -3L2 3L-2 3L-3.4 -3Z" fill="#e8f8ff" stroke="#ffffff" stroke-width=".5"/><path d="M0 -12V3" stroke="#8ac8f0" stroke-width=".8"/></g>`}).join('')}</svg>`;
  const aur=`<svg class="gvaur" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><defs><linearGradient id="gva1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6affc8" stop-opacity="0"/><stop offset=".4" stop-color="#6affc8" stop-opacity=".45"/><stop offset="1" stop-color="#6affc8" stop-opacity="0"/></linearGradient><linearGradient id="gva2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b48aff" stop-opacity="0"/><stop offset=".5" stop-color="#b48aff" stop-opacity=".35"/><stop offset="1" stop-color="#b48aff" stop-opacity="0"/></linearGradient></defs>
    <path d="M0 40Q60 10 120 36T240 30T400 24V90Q300 70 220 84T80 80T0 96Z" fill="url(#gva1)"><animate attributeName="d" dur="9s" repeatCount="indefinite" values="M0 40Q60 10 120 36T240 30T400 24V90Q300 70 220 84T80 80T0 96Z;M0 30Q60 40 120 22T240 40T400 30V96Q300 80 220 74T80 90T0 84Z;M0 40Q60 10 120 36T240 30T400 24V90Q300 70 220 84T80 80T0 96Z"/></path>
    <path d="M0 60Q90 36 180 56T400 46V110Q300 92 200 104T0 110Z" fill="url(#gva2)"/></svg>`;
  const fr=(function(){try{return String(localStorage.getItem('rde-lang')||navigator.language||'fr').slice(0,2).toLowerCase()}catch(e){return'fr'}})()==='fr';
  return`<div class="b2 b3 bs bsg"><div class="bssky"></div><div class="bsstars">${stars}</div>${aur}${clock}
   <svg class="b3hills" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 110L60 64L110 96L170 40L230 92L290 56L350 88L400 60V200H0Z" fill="#8aa8d0"/><path d="M60 64L72 74L64 76L52 72ZM170 40L184 54L174 56L160 52ZM290 56L302 66L292 68L280 64Z" fill="#ffffff"/><path d="M0 124Q100 100 200 120T400 112V200H0Z" fill="#dfe8f4"/><path d="M0 160Q120 138 220 154T400 148V200H0Z" fill="#f4f8ff"/></svg>
   <div class="bsfall gvfall">${fall}</div><div class="b3party">${party}</div><div class="bsplume">${plumeSVG('happy')}</div>
   <div class="b2top"><div class="b2title">${fr?"Royaumes<span>d'Éther</span>":'Realms<span>of Ether</span>'}</div><div class="b3sub bsbook">❄️ ${fr?'Saison · Givre éternel':'Season · Eternal Frost'}</div><div class="bssub">${fr?"Un hiver sans fin fige le royaume…":'An endless winter freezes the realm…'}</div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">${fr?'Les horloges du royaume se figent…':'The clocks of the realm freeze…'}</div><div class="b2tap" id="b2tap" hidden>${fr?'Touche pour entrer dans le royaume':'Tap to enter the realm'}</div><div class="b2snd" id="b2snd">🔊 ${fr?"Touche l'écran pour le son":'Tap the screen for sound'}</div></div></div>`}
window.btSceneGivre=btSceneGivre;
{const s3=btSceneSaga3;btSceneSaga3=function(){if(GIV())try{return btSceneGivre()}catch(e){}return s3.apply(this,arguments)}}
{const sg=btSceneSaga;btSceneSaga=function(){if(GIV())try{return btSceneGivre()}catch(e){}return sg.apply(this,arguments)}}
(function(){try{if(BOOT.done||!GIV())return;const b=document.getElementById('boot');const rr=b&&b.querySelector('.b2');if(!rr)return;const st=rr.querySelector('#b2start'),bar=rr.querySelector('.bt-bar i'),w=bar?bar.style.width:'';
  const tmp=document.createElement('div');tmp.innerHTML=btSceneGivre();const n=tmp.firstElementChild;if(!n)return;if(st)n.appendChild(st);const nb=n.querySelector('.bt-bar i');if(nb&&w)nb.style.width=w;rr.replaceWith(n)}catch(e){console.warn('boot givre',e)}})();
try{if(GIV()&&typeof BTIPS!=='undefined'){BTIPS.length=0;["Les horloges du royaume se figent…","Un hiver sans fin s'installe sur les cimes…","Kaïros garde la seule horloge qui bat encore.","Astuce : la bannière « L'Hiver Immobile » dure toute la saison.","Astuce : le palier 60 du Pass Pro offre Kaïros, l'Hiver Immobile.","Plume : « Hou… j'ai les plumes gelées ! »"].forEach(t=>BTIPS.push(t))}}catch(e){}

/* ---------- animations de combat de l'apparence ---------- */
try{if(window.SKANIM){
  const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&FXS.ctx;
  const later=(ms,fn)=>setTimeout(()=>{if(!ok())return;try{fn()}catch(e){}},ms/(S.speed||1));
  function layer(X,draw){const it={t0:performance.now(),dur:60000,draw:null};it.draw=c=>{const now=performance.now(),sp=S.speed||1;let al=Math.min(1,(now-it.t0)/(200/sp));if(it.e)al*=Math.max(0,1-(now-it.e)/(340/sp));if(al<=0)return;draw(c,al,(now-it.t0)/1000*sp)};FXS.items.push(it);fxRun();(X.L=X.L||[]).push(it);return it}
  function endLayers(X){const now=performance.now(),sp=S.speed||1;for(const it of X.L||[])if(!it.e){it.e=now;it.dur=now-it.t0+360/sp}}
  /* la grande horloge : les aiguilles s'emballent puis se figent ; elle se fissure à l'impact */
  function bigClock(X,cx,cy,R,st){return layer(X,(c,al,t)=>{const g=ease(Math.min(1,t/.5)),r=R*g;if(r<2)return;c.translate(cx,cy);c.globalAlpha=al;
      c.globalCompositeOperation='lighter';c.drawImage(spr('#8ad8ff'),-r*1.9,-r*1.9,r*3.8,r*3.8);c.globalCompositeOperation='source-over';
      c.fillStyle='rgba(8,30,64,.55)';c.beginPath();c.arc(0,0,r,0,7);c.fill();c.strokeStyle='#e8f8ff';c.lineWidth=Math.max(2,r*.06);c.beginPath();c.arc(0,0,r,0,7);c.stroke();
      c.strokeStyle='#bfe6ff';c.lineWidth=1;c.beginPath();c.arc(0,0,r*.84,0,7);c.stroke();
      for(let i=0;i<12;i++){const a=i*Math.PI/6;c.strokeStyle='#ffffff';c.lineWidth=i%3?1.4:3;c.beginPath();c.moveTo(Math.sin(a)*r*.7,-Math.cos(a)*r*.7);c.lineTo(Math.sin(a)*r*.82,-Math.cos(a)*r*.82);c.stroke()}
      const sp=st.stop!=null?Math.min(t,st.stop):t,ha=sp*9,ma=sp*28;
      c.lineCap='round';c.strokeStyle='#ffffff';c.lineWidth=Math.max(2.4,r*.07);c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ha)*r*.45,-Math.cos(ha)*r*.45);c.stroke();
      c.strokeStyle='#d8f4ff';c.lineWidth=Math.max(1.6,r*.04);c.beginPath();c.moveTo(0,0);c.lineTo(Math.sin(ma)*r*.68,-Math.cos(ma)*r*.68);c.stroke();
      c.fillStyle='#ffffff';c.beginPath();c.arc(0,0,r*.06,0,7);c.fill();
      if(st.stop!=null&&t>st.stop){const f=Math.min(1,(t-st.stop)/.25);c.globalCompositeOperation='lighter';c.globalAlpha=al*(1-f)*.9;c.strokeStyle='#ffffff';c.lineWidth=4;c.beginPath();c.arc(0,0,r*(1+f*.5),0,7);c.stroke();c.globalCompositeOperation='source-over';c.globalAlpha=al}
      if(st.crack!=null&&t>st.crack){const f=Math.min(1,(t-st.crack)/.18);c.strokeStyle='#ffffff';c.lineWidth=1.6;c.lineJoin='round';
        for(const P of[[[-.95,-.25],[-.5,-.1],[-.32,.24],[0,.05]],[[.9,-.4],[.42,-.2],[.2,.12],[0,.05]],[[.15,.98],[.1,.52],[-.14,.36],[0,.05]],[[-.6,.78],[-.3,.45]]]){c.beginPath();P.forEach(([x,y],i)=>{const k=i/(P.length-1);if(k>f)return;i?c.lineTo(x*r,y*r):c.moveTo(x*r,y*r)});c.stroke()}}
      for(let i=0;i<10;i++){const a=i/10*6.283,h=r*(i%2?.18:.28);c.save();c.rotate(a);c.translate(0,-r*1.02);c.fillStyle='#e8f8ff';c.globalAlpha=al*.95;c.beginPath();c.moveTo(0,-h);c.lineTo(h*.28,-h*.25);c.lineTo(0,h*.12);c.lineTo(-h*.28,-h*.25);c.closePath();c.fill();c.restore()}})}
  /* un bloc de glace qui fige la cible, puis éclate */
  function iceBlock(t,hold,del){const b=uc(t);fxItem(hold+260,(c,p)=>{const T=(hold+260),ms=p*T,grow=Math.min(1,ms/260),br=ms>hold?(ms-hold)/260:0,al=br?1-br:1;
      const w=b.s*1.08,H0=b.s*1.78,h=H0*grow,x=b.x-w/2,y=b.y-b.s*.56+H0-h;c.globalAlpha=al*.95;
      const g=c.createLinearGradient(x,y,x+w,y+h);g.addColorStop(0,'rgba(232,248,255,.55)');g.addColorStop(.5,'rgba(138,216,255,.28)');g.addColorStop(1,'rgba(232,248,255,.5)');c.fillStyle=g;
      c.beginPath();c.moveTo(x+w*.08,y);c.lineTo(x+w*.92,y+h*.04);c.lineTo(x+w,y+h*.5);c.lineTo(x+w*.94,y+h);c.lineTo(x+w*.04,y+h*.97);c.lineTo(x,y+h*.42);c.closePath();c.fill();
      c.strokeStyle='rgba(255,255,255,.9)';c.lineWidth=1.6;c.stroke();c.lineWidth=1;c.strokeStyle='rgba(255,255,255,.55)';c.beginPath();c.moveTo(x+w*.08,y);c.lineTo(x+w*.4,y+h*.45);c.lineTo(x+w*.04,y+h*.97);c.moveTo(x+w*.4,y+h*.45);c.lineTo(x+w,y+h*.5);c.moveTo(x+w*.4,y+h*.45);c.lineTo(x+w*.7,y+h);c.stroke();
      c.globalCompositeOperation='lighter';c.globalAlpha=al*.5;c.fillStyle='#ffffff';c.fillRect(x+w*.14,y+h*.08,w*.08,h*.5)},del||0)}
  function freezeTint(X){layer(X,(c,al)=>{c.globalCompositeOperation='source-over';c.globalAlpha=al*.16;c.fillStyle='#bfe6ff';c.fillRect(0,0,FXS.w,FXS.h)})}
  function snowfall(n,dur){for(let k=0;k<n;k++)later(k*dur/n,()=>emit(1,()=>({k:'shape',sh:'snow',x:rnd(0,FXS.w),y:-10,vx:rnd(-.6,.2),vy:rnd(1.4,2.6),life:110,max:110,s:rnd(2.5,5),c:'#ffffff',rot:rnd(0,6),vr:rnd(-.05,.05),wob:rnd(0,6),fade:1.3,add:1})))}
  function tick(){try{if(!AU||!AU.ctx||!cSnd.ok())return;SND.wood(AU.F.v,NOW(),3200)}catch(e){}}
  function finTitle(X,col){const m=rowMid(1-X.u.side),t=String(X.A.fin);textPop(FXS.w/2,m.y-m.s*.35,t,col,Math.max(16,Math.min(28,FXS.w*.9/(t.length*.68))),1100);for(const t2 of X.tg)cardFlash(t2,true)}
  SKANIM.reg(SK,{th:['#8ad8ff','#ffffff'],el:'ice',cut:['#8ad8ff','#e8f8ff'],fin:'ÉTERNITÉ BLANCHE',
    aura(a){shapes(a.x,a.y,'snow',['#ffffff','#bff4ff'],8,2.4,4.5,50,-.02,{add:1,wob:1});ringFx(a.x,a.y,'#e8f8ff',a.s*.7,600,3,.5)},
    async ult(X){const {u,ux}=X,a=uc(u),W=FXS.w,H=FXS.h,m=rowMid(1-u.side),cx=W/2,cy=H*.24,R=Math.min(W,H)*.15,st={};
      layer(X,(c,al)=>{c.globalAlpha=al*.62;c.fillStyle='#03112a';c.fillRect(0,0,W,H)});snowfall(20+ux*6,1600);
      FXD.sigil(a.x,a.y+a.s*.5,a.s*1.15,'#8ad8ff',1400,.38,12);glowPulse(a.x,a.y,'#8ad8ff',700,a.s*.55);const CK=bigClock(X,cx,cy,R,st),ct=it=>(performance.now()-it.t0)/1000*(S.speed||1);
      for(let i=0;i<8;i++)later(140+i*85,tick);
      await fxWait(820);if(!ok())return;
      /* l'arrêt du temps : les aiguilles se figent, tout gèle */
      st.stop=ct(CK);flash('#e8f8ff',200,.55);freezeTint(X);ringFx(cx,cy,'#ffffff',W*.6,700,6,1,0);shake(2);
      const hold=900+X.tg.length*40;X.tg.forEach((t,i)=>{iceBlock(t,hold,i*55);later(i*55,()=>{const b=uc(t);shapes(b.x,b.y+b.s*.3,'crystal',['#bff4ff','#ffffff'],6,3,3,40,-.02,{add:1})})});
      await fxWait(hold-120);if(!ok())return;
      st.crack=ct(CK);
      await fxWait(160);if(!ok())return;
      flash('#ffffff',160,.6);camPunch(m,1.08,420);shake(3);
      X.tg.forEach((t,i)=>later(i*45,()=>{const b=uc(t);shapes(b.x,b.y,'crystal',['#bff4ff','#e8fbff','#8ae8ff','#ffffff'],16,7,4.2,48,.24,{glow:'#8ad8ff'});sparks(b.x,b.y,'#ffffff',12,7);ringFx(b.x,b.y,'#bff4ff',b.s*.6,420,4);hit(X,t,1.3)}));
      await fxWait(520);if(!ok())return;
      if(ux>0){const st2={},CK2=bigClock(X,cx,cy+R*.1,R*.8,st2);await fxWait(300);
        for(let r=0;r<1+ux;r++){if(!ok())return;X.tg.forEach((t,i)=>later(i*50,()=>{const b=uc(t);iceBlock(t,140,0);later(150,()=>{shapes(b.x,b.y,'crystal',['#bff4ff','#ffffff','#8ae8ff'],10,6,3.8,40,.22,{glow:'#8ad8ff'});ringFx(b.x,b.y,'#e8f8ff',b.s*.5,380,4);cardFlash(t,r===ux)})}));
          for(let k=0;k<3;k++)later(k*70,tick);try{ultraHitSnd()}catch(e){}await fxWait(330);if(!ok())return;shake(2)}
        st2.stop=ct(CK2);flash('#e8f8ff',220,.5);snowfall(16,600);finTitle(X,'#bfe6ff');await fxWait(520)}
      endLayers(X)},
    basic(s,t,crit,ux){const a=uc(s),b=uc(t),k=(crit?1.35:1)*(1+ux*.12);tick();
      fxItem(320,(c,p)=>{const r=b.s*.42*k,an=-1.6+ease(p)*3.6;c.translate(b.x,b.y);c.globalAlpha=1-p*.6;c.globalCompositeOperation='lighter';c.strokeStyle='#e8f8ff';c.lineWidth=2.4;c.beginPath();c.arc(0,0,r,0,7);c.stroke();
        c.strokeStyle='#ffffff';c.lineWidth=3.4;c.lineCap='round';c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(an)*r*.95,Math.sin(an)*r*.95);c.stroke();c.lineWidth=2;c.beginPath();c.moveTo(0,0);c.lineTo(Math.cos(an*2.4)*r*.6,Math.sin(an*2.4)*r*.6);c.stroke()});
      later(160,()=>{shapes(b.x,b.y,'crystal',['#bff4ff','#e8fbff','#8ae8ff'],Math.round(7*k),4.5,3.2,36,.18,{glow:'#8ad8ff'});sparks(b.x,b.y,'#e8fbff',8,5,1.6,18);if(ux||crit)iceBlock(t,160,0);if(crit){camPunch(b,1.04,220);glowPulse(b.x,b.y,'#8ad8ff',300,b.s*.42)}})}});
}}catch(e){console.warn('givre anim',e)}

/* ---------- annonce de saison ---------- */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(GIV()&&Date.now()<passEndAt())L.unshift({k:'givre1',ac:'#8ad8ff',tag:'NOUVELLE SAISON',t:'Givre éternel ❄️',
  x:`Un hiver sans fin fige le royaume : tout est recouvert de neige jusqu'au <b>24 novembre</b>. Nouvelle bannière <b>« L'Hiver Immobile »</b> avec Kaïros, et dans le <b>Pass Pro</b> : un fond, un avatar, un pseudo de givre et l'apparence légendaire <b>Kaïros, l'Hiver Immobile</b> au palier 60, avec ses propres animations de combat.`,
  art:()=>{try{return`<div class="skann">${heroBody(vHero(SK),3)}</div>`}catch(e){return''}},go:'❄️ Voir le pass',fn:()=>{TAB='event';UI.evt='pass';try{UI.lz=UI.lz||{};UI.lz.event='pass'}catch(e){}}})}catch(e){}return L}}catch(e){}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.nfx-givre{background:linear-gradient(90deg,#6ac8ff,#ffffff,#bfe6ff,#ffffff,#6ac8ff);background-size:220% 100%;-webkit-background-clip:text;background-clip:text;color:transparent!important;-webkit-text-fill-color:transparent;text-shadow:none;filter:drop-shadow(0 0 4px rgba(138,216,255,.85));animation:nfxc 3.2s linear infinite;font-weight:900}
#gvsnow{position:fixed;inset:0;pointer-events:none;z-index:40;overflow:hidden}
#gvsnow i{position:absolute;top:-12px;border-radius:50%;background:radial-gradient(circle,#fff 0 45%,rgba(255,255,255,0) 72%);opacity:.55;animation:gvfall linear infinite;will-change:transform}
@keyframes gvfall{0%{transform:translate3d(0,0,0)}50%{transform:translate3d(18px,52vh,0)}100%{transform:translate3d(-8px,104vh,0)}}
html.givre .tabbar,html.givre nav.tabs{box-shadow:inset 0 2px 0 rgba(232,248,255,.55),0 -6px 18px -8px rgba(138,216,255,.45)}
html.givre .tabbar::before,html.givre nav.tabs::before{content:"";position:absolute;left:0;right:0;top:-1px;height:9px;pointer-events:none;background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 60 9'%3E%3Cpath d='M0 0H60V2L56 2L54 8L52 2L44 2L43 5L42 2L34 2L31 9L28 2L20 2L19 5L18 2L10 2L8 7L6 2L0 2Z' fill='%23e8f8ff' opacity='.9'/%3E%3C/svg%3E") repeat-x;background-size:60px 9px;transform:translateY(-8px)}
html.givre .top,html.givre header.top{box-shadow:0 2px 0 rgba(232,248,255,.35),0 8px 22px -12px rgba(138,216,255,.55)}
html.givre .lobby{box-shadow:inset 0 0 40px rgba(220,240,255,.35)}
html.rdlite #gvsnow,html.bgpause #gvsnow,.rdmodal-open #gvsnow{display:none}
.bsg .bssky{background:linear-gradient(180deg,#020a1e 0%,#0a2a5a 34%,#2a6aaa 62%,#9ad6f6 84%,#e8f8ff 100%)}
.bsg .b2title{text-shadow:0 3px 0 #0a2a5a,0 0 26px rgba(138,216,255,.85)}
.bsg .bssub{color:#e8f8ff}.bsg .bsbook{color:#bfe6ff}
.bsg .b3glow{background:radial-gradient(ellipse,rgba(191,230,255,.6),transparent 70%)!important}
.gvaur{position:absolute;left:0;right:0;top:4%;width:100%;height:30%;pointer-events:none}
.gvclock{position:absolute;left:50%;top:1%;width:min(64vw,260px);opacity:.5;transform:translate(-50%,0);animation:b3float 6s ease-in-out infinite;filter:drop-shadow(0 0 12px rgba(138,216,255,.6))}
.gvfall i.fk{border-radius:50%;background:radial-gradient(circle,#fff 0 45%,rgba(255,255,255,0) 72%)}
@media(prefers-reduced-motion:reduce){#gvsnow{display:none}}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{Object.assign(I18N_EN,{"L'Hiver Immobile":'The Still Winter',"Kaïros, l'Hiver Immobile":'Kairos, the Still Winter','Pseudo de givre':'Frost name','Fond « Givre éternel »':'“Eternal Frost” background','ÉTERNITÉ BLANCHE':'WHITE ETERNITY',
  'Givre éternel ❄️':'Eternal Frost ❄️','NOUVELLE SAISON':'NEW SEASON','❄️ Voir le pass':'❄️ See the pass',"Heure Gelée":'Frozen Hour','Cadran de Cristal':'Crystal Dial','Éternité Blanche':'White Eternity'})}catch(e){}

/* ---------- notes de version ---------- */
try{const I=["❄️ <b>Nouvelle saison : Givre éternel</b>, jusqu'au 24 novembre. Tout le royaume passe sous la neige : villages, écran de chargement, flocons partout.",
  "⏳ <b>Bannière « L'Hiver Immobile »</b> : Kaïros, 50/50 puis garanti, pendant toute la saison.",
  "🎟️ <b>Exclusivités du Pass Pro</b> : fond « Givre éternel » (palier 15), avatar Kaïros (palier 30), pseudo de givre (palier 45) et l'apparence légendaire <b>Kaïros, l'Hiver Immobile</b> (palier 60) : couronne de glace, horloge gelée, et ses propres animations de combat. Son ultime fige le temps et enferme les ennemis dans la glace."];
 PATCH.unshift({v:46,d:'10 novembre 2026',t:'Saison Givre éternel',items:I});
 const E=["❄️ <b>New season: Eternal Frost</b>, until November 24. The whole realm is covered in snow: villages, loading screen, snowflakes everywhere.",
  "⏳ <b>“The Still Winter” banner</b>: Kairos, 50/50 then guaranteed, for the whole season.",
  "🎟️ <b>Pro Pass exclusives</b>: “Eternal Frost” background (tier 15), Kairos avatar (tier 30), frost name (tier 45) and the legendary look <b>Kairos, the Still Winter</b> (tier 60): ice crown, frozen clock, and its own battle animations. Its ultimate freezes time and traps enemies in ice."];
 I.forEach((x,i)=>{I18N_EN[x]=E[i]});I18N_EN['Saison Givre éternel']='Eternal Frost season'}catch(e){}
}catch(e){console.warn('saison givre',e)}})();
