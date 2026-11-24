
/* ================= Bannières de saison animées =================
   Les bannières de saison (Pass, Catalogue du Dressing, annonces) et les fonds de profil bougent :
   - « Givre éternel » : la neige tombe (3 couches, de la plus proche à la plus lointaine), l'aurore ondule, le grand flocon tourne, les sommets scintillent ;
   - « L'Éclipse » : la couronne tourne et respire, l'anneau de diamant s'allume, les étoiles clignotent, Orion tire une flèche d'or ;
   - « Cendres » : les braises montent ; « Lanternes » : les lanternes s'envolent sous la neige.
   Légèreté : les particules sont dessinées une fois dans des motifs qui se répètent, et ce sont des calques entiers qui glissent
   (transform/opacity, gérés par la carte graphique). Une trentaine d'animations pour tout le Catalogue, aucun redessin du SVG.
   Pause pendant le défilement, en arrière-plan, en mode allégé ; rien du tout si le téléphone demande moins d'animations. */
(function(){try{
if(typeof seasonArt!=='function'||typeof NART==='undefined')return;
const RG=s=>{let x=(s*9301+49297)%233280||1;return()=>(x=(x*9301+49297)%233280)/233280};
const f1=v=>(+v).toFixed(1);
const noMo=()=>{try{return matchMedia('(prefers-reduced-motion: reduce)').matches}catch(e){return false}};
const uri=s=>`url("data:image/svg+xml,${encodeURIComponent(s)}")`;
/* ---------- motifs (dessinés une seule fois) ---------- */
const flakeP=(x,y,s,op,c)=>`<g transform="translate(${f1(x)} ${f1(y)}) scale(${(s/10).toFixed(2)})" opacity="${op.toFixed(2)}" stroke="${c||'#fff'}" stroke-width="1.5" stroke-linecap="round" fill="none"><path d="M0 -8.6V8.6M-7.4 -4.3L7.4 4.3M-7.4 4.3L7.4 -4.3"/><path d="M-2 -6.6L0 -5L2 -6.6M-2 6.6L0 5L2 6.6M-6.7 -1.6L-4.3 -2.5L-4.7 -5M6.7 1.6L4.3 2.5L4.7 5M-6.7 1.6L-4.3 2.5L-4.7 5M6.7 -1.6L4.3 -2.5L4.7 -5"/></g>`;
/* un motif de points : W×H, n points de rayon r0..r1, marge pour que rien ne soit coupé au raccord */
function dots(W,H,n,seed,o){const r=RG(seed),m=o.m||8;let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><radialGradient id="g"><stop offset="0" stop-color="${o.c}"/><stop offset=".4" stop-color="${o.c}" stop-opacity="${o.soft?'.6':'1'}"/><stop offset="1" stop-color="${o.c}" stop-opacity="0"/></radialGradient>${o.c2?`<radialGradient id="h"><stop offset="0" stop-color="${o.c2}"/><stop offset="1" stop-color="${o.c2}" stop-opacity="0"/></radialGradient>`:''}</defs>`;
  for(let i=0;i<n;i++){const x=m+r()*(W-2*m),y=m+r()*(H-2*m),rr=o.r0+r()*(o.r1-o.r0),op=(o.op||1)*(.55+r()*.45);
    if(o.flk&&i%o.flk===0)s+=flakeP(x,y,rr*3.2,op);
    else if(o.c2&&i%3===0)s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${(rr*.8).toFixed(2)}" fill="url(#h)" opacity="${op.toFixed(2)}"/>`;
    else s+=`<circle cx="${f1(x)}" cy="${f1(y)}" r="${(rr*(o.halo||1)).toFixed(2)}" fill="url(#g)" opacity="${op.toFixed(2)}"/>`}
  return uri(s+'</svg>')}
/* les lanternes qui s'envolent */
function lantTile(W,H,seed){const r=RG(seed);let s=`<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}"><defs><radialGradient id="g"><stop offset="0" stop-color="#ffd86a" stop-opacity=".8"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient><linearGradient id="b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe08a"/><stop offset=".7" stop-color="#ff7a2a"/><stop offset="1" stop-color="#c8401a"/></linearGradient></defs>`;
  for(let i=0;i<3;i++){const x=30+r()*(W-60),y=30+r()*(H-60),k=.7+r()*.6;s+=`<g transform="translate(${f1(x)} ${f1(y)}) scale(${k.toFixed(2)})"><circle r="16" fill="url(#g)"/><path d="M-6 -8Q-8.4 0 -6 8H6Q8.4 0 6 -8Z" fill="url(#b)"/><path d="M-3 -8V8M0 -8V8M3 -8V8" stroke="#ffb84a" stroke-width=".6" opacity=".8"/><rect x="-4.4" y="-10" width="8.8" height="2.2" rx=".6" fill="#5a1a08"/><rect x="-4.4" y="7.8" width="8.8" height="2.2" rx=".6" fill="#5a1a08"/></g>`}
  return uri(s+'</svg>')}
const T={
 sn1:[220,220,dots(220,220,7,11,{c:'#fff',r0:2.2,r1:3.6,flk:3,soft:1,halo:1.25})],
 sn2:[180,180,dots(180,180,12,13,{c:'#f0fbff',r0:1.4,r1:2.4,soft:1,op:.9})],
 sn3:[150,150,dots(150,150,16,17,{c:'#d8f2ff',r0:.8,r1:1.5,op:.75})],
 em1:[170,170,dots(170,170,8,31,{c:'#ffb21a',c2:'#c8bcb0',r0:1.8,r1:3,halo:1.6,m:10})],
 em2:[140,140,dots(140,140,10,37,{c:'#ff7a1a',r0:1.2,r1:2,halo:1.5,op:.8})],
 la1:[240,260,lantTile(240,260,43)],
 ls1:[200,200,dots(200,200,8,47,{c:'#fff',r0:1.6,r1:2.8,soft:1,flk:4,op:.85})],
 ls2:[160,160,dots(160,160,12,53,{c:'#e8f0ff',r0:.9,r1:1.6,op:.7})],
 st1:[161,117,dots(161,117,4,23,{c:'#fff',r0:1,r1:1.8,halo:1.8,m:6})],
 st2:[199,143,dots(199,143,5,29,{c:'#fff6dc',r0:.9,r1:1.6,halo:1.8,m:6})],
 st3:[233,171,dots(233,171,5,61,{c:'#e8dcff',r0:.8,r1:1.5,halo:1.8,m:6})]};
/* une couche : motif k, durée t, sens (1 = tombe, -1 = monte), balancement sw px en st s */
const lay=(k,t,dir,sw,st,op)=>`<b class="lay" style="--sw:${sw||0}px;--st:${st||7}s"><i class="${dir<0?'up':''} t-${k}" style="--t:${t}s;--tw:${T[k][0]}px;--th:${T[k][1]}px${op?';opacity:'+op:''}"></i></b>`;
const twl=(k,t,d)=>`<b class="twl t-${k}" style="--t:${t}s;--d:${d}s;--tw:${T[k][0]}px;--th:${T[k][1]}px"></b>`;
/* un point du dessin (coordonnées 400×200), recalé exactement sur le dessin quel que soit le cadrage */
const pt=(px,py,sz,cls,inner,st)=>`<b class="sfp ${cls}" style="--px:${px};--py:${py};--sz:${sz}${st?';'+st:''}">${inner||'<i></i>'}</b>`;
/* les jets de lumière de la couronne */
const RAYS=(n,seed,id)=>{const r=RG(seed);let o=`<svg viewBox="-120 -120 240 240" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff6dc" stop-opacity=".95"/><stop offset=".45" stop-color="#ffe8b0" stop-opacity=".5"/><stop offset="1" stop-color="#c890ff" stop-opacity="0"/></linearGradient></defs>`;
  for(let i=0;i<n;i++){const a=i*360/n+r()*6,L=60+r()*44,w=.8+r()*1.8;o+=`<path transform="rotate(${f1(a)})" d="M${f1(-w)} -46Q0 -${f1(46+L*.4)} 0 -${f1(L+40)}Q0 -${f1(46+L*.4)} ${f1(w)} -46Z" fill="url(#${id})"/>`}
  return o+'</svg>'};
const RA=RAYS(22,5,'ecra'),RB=RAYS(14,9,'ecrb');
const FX={
 p_givre2:()=>`<div class="seafx sfx-gv" aria-hidden="true"><b class="sfaur"></b><b class="sfaur a2"></b>${lay('sn3',15,1,4,9)}${lay('sn2',10,1,7,7)}${[[110,70],[270,78],[40,96],[350,92]].map(([x,y],i)=>pt(x,y,18,'sfglint','','--d:'+f1(i*1.7)+'s')).join('')}${pt(300,42,48,'gvflk')}${lay('sn1',7.5,1,10,5.5)}</div>`,
 p_eclipse:()=>`<div class="seafx sfx-ec" aria-hidden="true">${twl('st1',3.4,0)}${twl('st2',4.6,-1.7)}${twl('st3',5.8,-3.1)}${pt(282,86,236,'ecr',RA)}${pt(282,86,236,'ecr r2',RB)}${pt(282,86,190,'ecg')}${pt(251,55,44,'ecd')}<b class="ecarr"></b></div>`,
 p_cendres:()=>`<div class="seafx sfx-ce" aria-hidden="true">${pt(288,88,130,'ceg')}${lay('em2',9,-1,6,6)}${lay('em1',6,-1,10,4.5)}</div>`,
 p_lanternes:()=>`<div class="seafx sfx-la" aria-hidden="true">${twl('st1',3.8,0)}${twl('st2',5.2,-2)}${lay('la1',26,-1,10,8,.95)}${lay('ls2',13,1,4,8)}${lay('ls1',8.5,1,8,6)}</div>`};
/* sur « Givre éternel », la neige fixe du dessin laisse la place à la neige qui tombe (et le grand flocon à celui qui tourne) */
const STRIP={p_givre2:h=>h.replace(/<circle cx="\d+" cy="\d+" r="[\d.]+" fill="#fff" opacity="[\d.]+"\/>/g,'').replace(/<g transform="translate\(300 42\)"[\s\S]*?<\/g>/,'')};
window.seaFx=k=>FX[k]?FX[k]():'';
{const sa=seasonArt;seasonArt=function(s){let h=sa.apply(this,arguments);try{if(s&&FX[s.k]&&!noMo()){if(STRIP[s.k])h=STRIP[s.k](h);h+=FX[s.k]()}}catch(e){}return h}}
/* fonds de profil : même chose (les Cendres gardent leurs braises d'origine) */
try{if(PBG.givre)PBG.givre.fx=1;if(PBG.eclipse)PBG.eclipse.fx=1}catch(e){}
{const pf=pbgFx;pbgFx=function(k){try{const P=PBG[k];if(P&&P.season&&P.season!=='p_cendres'&&FX[P.season]){return noMo()?'':FX[P.season]()}}catch(e){}return pf.apply(this,arguments)}}
{const pm=profileModal;profileModal=function(){const r=pm.apply(this,arguments);try{const pa=document.querySelector('#ovl .modal .pbgart');if(pa&&pa.querySelector('.sfx-gv')){pa.querySelectorAll('svg > circle[fill="#fff"]').forEach(c=>c.remove());const g=pa.querySelector('svg > g[transform="translate(300 42)"]');if(g)g.remove()}}catch(e){}return r}}

/* la bannière d'invocation de la saison (Orion, « La Nuit de Midi ») : ciel animé derrière, et un halo de saison autour du portrait */
const EVSEA={ev_eclipse:'p_eclipse',ev_givre:'p_givre2'};
const SBG={
 p_eclipse:{bg:()=>`<div class="seafx sfx-ec">${twl('st1',3.4,0)}${twl('st2',4.6,-1.7)}${twl('st3',5.8,-3.1)}<b class="ecarr"></b></div>`,
  halo:()=>`<b class="pthalo sfx-ec" aria-hidden="true"><b class="hx ecr">${RA}</b><b class="hx ecr r2">${RB}</b><b class="hx ecg2"><i></i></b><b class="ecd"><i></i></b></b>`},
 p_givre2:{bg:()=>`<div class="seafx sfx-gv"><b class="sfaur"></b><b class="sfaur a2"></b>${lay('sn3',15,1,4,9)}${lay('sn2',10,1,7,7)}${lay('sn1',7.5,1,10,5.5)}</div>`,
  halo:()=>`<b class="pthalo sfx-gv" aria-hidden="true"><b class="hx gvflk"><i></i></b><b class="hx gvring"><i></i></b></b>`}};
{const ps=pSummon;pSummon=function(){let h=ps.apply(this,arguments);try{const k=UI.ban,sk=EVSEA[k],B=SBG[sk];if(B&&EVB[k]&&banOpen(k)&&!noMo()){const i=h.indexOf('<div class="banner evban">');if(i>=0){const s=NSEAS.find(x=>x.k===sk)||{c:'#b48aff'};
  let t=h.slice(i).replace('<div class="banner evban">',`<div class="banner evban seaban sb-${sk}" style="--pc:${s.c}"><div class="evsea" aria-hidden="true">${B.bg()}</div>`);
  t=t.replace('<div class="pt">',`<div class="pt">${B.halo()}`);h=h.slice(0,i)+t}}}catch(e){}return h}}
/* notes de version */
try{const it=["❄️ <b>Les bannières de saison bougent</b> : la neige tombe enfin sur « Givre éternel », avec l'aurore qui ondule et le grand flocon qui tourne.",
  "🌑 « L'Éclipse » : la couronne tourne et respire, l'anneau de diamant s'allume, et de temps en temps Orion tire une flèche d'or. La bannière d'invocation « La Nuit de Midi » a aussi son ciel étoilé et son halo d'éclipse.",
  "🖼️ Partout : Pass, Catalogue du Dressing et fonds de profil. Les braises des « Cendres » et les lanternes de l'hiver bougent aussi. Tout se met en pause pendant le défilement, et rien ne bouge si ton téléphone demande moins d'animations."];
 PATCH.unshift({v:'v77',d:Date.now(),t:'Bannières animées',items:it});
 Object.assign(I18N_EN,{'Bannières animées':'Animated banners',[it[0]]:"❄️ <b>Season banners now move</b>: snow finally falls on “Eternal Frost”, with the rippling aurora and the big spinning snowflake.",
  [it[1]]:"🌑 “The Eclipse”: the corona turns and breathes, the diamond ring lights up, and every now and then Orion fires a golden arrow. The “Midnight at Noon” summon banner also gets its starry sky and eclipse halo.",
  [it[2]]:"🖼️ Everywhere: Pass, Dressing Catalogue and profile backgrounds. The “Ashes” embers and the winter lanterns move too. Everything pauses while you scroll, and nothing moves if your phone asks for fewer animations."})}catch(e){}
const BIGFLK=uri(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="-24 -24 48 48"><g stroke="#e8faff" stroke-width="2.2" stroke-linecap="round" fill="none">${[0,60,120].map(a=>`<path transform="rotate(${a})" d="M-18 0H18M-12 -5L-16 0L-12 5M12 -5L16 0L12 5"/>`).join('')}</g><circle r="2.2" fill="#fff"/></svg>`);
const st=document.createElement('style');st.id='v452css';st.textContent=`
.seafx{position:absolute;inset:0;overflow:hidden;pointer-events:none;container-type:size}
.pban>.seafx{z-index:-1}
.seafx i,.seafx b{display:block}
${Object.keys(T).map(k=>`.seafx .t-${k}{background-image:${T[k][2]}}`).join('\n')}
.seafx .lay{position:absolute;inset:0;animation:sfdrift var(--st) ease-in-out infinite alternate;will-change:transform}
.seafx .lay>i{position:absolute;left:calc(var(--sw)*-1 - 4px);right:calc(var(--sw)*-1 - 4px);top:calc(var(--th)*-1);bottom:0;background-repeat:repeat;background-size:var(--tw) var(--th);animation:sffall var(--t) linear infinite;will-change:transform}
.seafx .lay>i.up{top:0;bottom:calc(var(--th)*-1);animation-name:sfup}
@keyframes sffall{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,var(--th),0)}}
@keyframes sfup{from{transform:translate3d(0,0,0)}to{transform:translate3d(0,calc(var(--th)*-1),0)}}
@keyframes sfdrift{from{transform:translate3d(calc(var(--sw)*-1),0,0)}to{transform:translate3d(var(--sw),0,0)}}
.seafx .twl{position:absolute;inset:0;background-repeat:repeat;background-size:var(--tw) var(--th);opacity:.2;animation:sftwl var(--t) ease-in-out var(--d) infinite;will-change:opacity}
@keyframes sftwl{0%,100%{opacity:.15}50%{opacity:1}}
.seafx .sfp{position:absolute;left:calc(var(--px)*.25%);top:calc(var(--py)*.5%);width:calc(var(--sz)*.25%);aspect-ratio:1;translate:-50% -50%}
@supports (width:1cqw){.seafx .sfp{--k:max(calc(100cqw / 400),calc(100cqh / 200));left:calc(50% + (var(--px) - 200)*var(--k));top:calc(50% + (var(--py) - 100)*var(--k));width:calc(var(--sz)*var(--k))}}
.seafx .sfp>*{position:absolute;inset:0;width:100%;height:100%}
@keyframes sfspin{to{transform:rotate(360deg)}}
/* Givre éternel */
.sfx-gv .sfaur{position:absolute;left:-25%;top:3%;width:150%;height:34%;border-radius:50%;background:linear-gradient(90deg,transparent 6%,rgba(88,228,192,.55) 34%,rgba(138,106,255,.45) 64%,transparent 94%);filter:blur(10px);opacity:.5;animation:sfaur 9s ease-in-out infinite alternate;will-change:transform,opacity}
.sfx-gv .sfaur.a2{top:21%;height:22%;animation-duration:13s;animation-direction:alternate-reverse}
@keyframes sfaur{0%{transform:translate3d(-7%,0,0) skewY(-3deg) scaleY(.8);opacity:.3}50%{opacity:.75}100%{transform:translate3d(7%,8%,0) skewY(3deg) scaleY(1.15);opacity:.45}}
.sfx-gv .gvflk>i{background:${BIGFLK} center/contain no-repeat;filter:drop-shadow(0 0 6px rgba(190,236,255,.95));animation:sfspin 26s linear infinite;will-change:transform}
.sfx-gv .sfglint>i{border-radius:50%;background:radial-gradient(circle,#fff 0 9%,rgba(255,255,255,.5) 16%,transparent 34%),linear-gradient(90deg,transparent 47%,#fff 50%,transparent 53%),linear-gradient(0deg,transparent 47%,#fff 50%,transparent 53%);opacity:0;animation:sfgl 5.4s ease-in-out var(--d) infinite;will-change:transform,opacity}
@keyframes sfgl{0%,68%,100%{opacity:0;transform:scale(.2) rotate(0deg)}78%{opacity:1;transform:scale(1) rotate(45deg)}90%{opacity:0;transform:scale(.4) rotate(90deg)}}
/* L'Éclipse */
.sfx-ec .ecg>i{border-radius:50%;background:radial-gradient(circle,transparent 45%,rgba(255,246,220,.8) 47.5%,rgba(255,232,176,.38) 53%,rgba(200,144,255,.2) 62%,transparent 72%);animation:ecpulse 4.2s ease-in-out infinite;will-change:transform,opacity}
@keyframes ecpulse{0%,100%{transform:scale(.97);opacity:.6}50%{transform:scale(1.06);opacity:1}}
.sfx-ec .ecr>svg{animation:sfspin 80s linear infinite;will-change:transform;opacity:.8}
.sfx-ec .ecr.r2>svg{animation-duration:120s;animation-direction:reverse;opacity:.55}
.sfx-ec .ecd>i{border-radius:50%;background:radial-gradient(circle,#fff 0 9%,rgba(255,246,220,.9) 15%,rgba(255,232,176,.3) 32%,transparent 58%),linear-gradient(90deg,transparent 47.5%,rgba(255,255,255,.95) 50%,transparent 52.5%),linear-gradient(0deg,transparent 47.5%,rgba(255,255,255,.95) 50%,transparent 52.5%);opacity:0;animation:ecdia 6.5s ease-in-out 1s infinite;will-change:transform,opacity}
@keyframes ecdia{0%,60%,100%{opacity:0;transform:scale(.3) rotate(0deg)}70%{opacity:1;transform:scale(1.35) rotate(25deg)}82%{opacity:.9;transform:scale(1) rotate(45deg)}93%{opacity:0;transform:scale(.4) rotate(60deg)}}
.sfx-ec .ecarr{position:absolute;left:-110px;top:82%;width:96px;height:2px;border-radius:2px;background:linear-gradient(90deg,transparent,rgba(255,216,106,.85) 70%,#fffbe8);box-shadow:0 0 6px rgba(255,216,106,.9);opacity:0;--ax:640px;--ay:-172px;animation:ecarr 9s cubic-bezier(.45,0,.75,.6) 2.5s infinite;will-change:transform,opacity}
.sfx-ec .ecarr::after{content:"";position:absolute;right:-6px;top:-3px;border-left:8px solid #fffbe8;border-top:4px solid transparent;border-bottom:4px solid transparent}
.sfx-ec .ecarr::before{content:"";position:absolute;left:4px;top:-3px;width:10px;height:8px;background:linear-gradient(135deg,transparent 40%,#c8a8ff 42% 58%,transparent 60%),linear-gradient(45deg,transparent 40%,#c8a8ff 42% 58%,transparent 60%);opacity:.9}
@supports (width:1cqw){.sfx-ec .ecarr{--ax:calc(100cqw + 220px);--ay:calc((100cqw + 220px)*-.27)}}
@keyframes ecarr{0%{transform:translate3d(0,0,0) rotate(-15deg);opacity:0}3%{opacity:1}17%{transform:translate3d(var(--ax),var(--ay),0) rotate(-15deg);opacity:1}18%,100%{transform:translate3d(var(--ax),var(--ay),0) rotate(-15deg);opacity:0}}
.banner.seaban{border-color:var(--pc)!important}
.banner.sb-p_eclipse{background:radial-gradient(130% 70% at 50% 22%,#3a1a7a,#140a3a 52%,#05030f)!important}
.banner.sb-p_givre2{background:linear-gradient(#06142e,#14406e 62%,#2a6aaa)!important}
.banner.seaban .evsea{position:absolute;inset:0;z-index:0;pointer-events:none}
.banner.seaban .evsea .seafx{z-index:auto}
.banner.seaban .pt{position:relative;z-index:1}
.banner.seaban .pthalo{position:absolute;left:50%;top:50%;height:178%;width:auto;aspect-ratio:1;translate:-50% -50%;z-index:-1;pointer-events:none;display:block}
.banner.seaban .pt::before,.banner.seaban .pt::after{display:none!important}
.pthalo .hx{position:absolute;inset:0;display:block}
.pthalo .hx>svg,.pthalo .hx>i{position:absolute;inset:0;width:100%;height:100%;display:block}
.pthalo .ecg2>i{border-radius:50%;background:radial-gradient(circle closest-side,transparent 56%,rgba(255,246,220,.85) 60.5%,rgba(255,232,176,.4) 67%,rgba(200,144,255,.2) 80%,transparent 100%);animation:ecpulse 4.2s ease-in-out infinite;will-change:transform,opacity}
.pthalo .ecd{position:absolute;left:28.5%;top:28.5%;width:20%;aspect-ratio:1;translate:-50% -50%;display:block}
.pthalo .ecd>i{position:absolute;inset:0;display:block}
.pthalo.sfx-gv .gvflk{inset:6%;opacity:.55}
.pthalo .gvring>i{border-radius:50%;background:radial-gradient(circle closest-side,transparent 55%,rgba(220,246,255,.7) 60%,rgba(138,216,255,.3) 68%,transparent 86%);animation:ecpulse 5s ease-in-out infinite}
/* Cendres */
.sfx-ce .ceg>i{border-radius:50%;background:radial-gradient(circle,rgba(255,170,60,.5),rgba(255,90,20,0) 68%);animation:ecpulse 3.2s ease-in-out infinite;will-change:transform,opacity}
/* pauses : défilement, arrière-plan, mode allégé ; rien si le téléphone demande moins d'animations */
html.scrl .seafx *,html.bgpause .seafx *,html.rdlite .seafx *,body.rdlite .seafx *,html.scrl .seafx *::before,html.bgpause .seafx *::before{animation-play-state:paused!important}
@media (prefers-reduced-motion:reduce){.seafx{display:none}}`;document.head.appendChild(st);
}catch(e){console.warn('bannières animées',e)}})();
