/* ================= V419 : DEUX BANNIÈRES D'INVOCATION =================
   Une pour Rouge-Garance, une pour Orgemme. 50/50 puis garanti, comme les bannières événement,
   plus un ×10 qui garantit au moins un Épique. Elles reviennent toutes les 8 semaines
   au lieu de disparaître pour de bon. */
(function(){try{
if(typeof EVB==='undefined'||typeof BANS==='undefined'||typeof GAR==='undefined'||typeof ORG==='undefined')return;
const START='2026-11-11',CYCLE=56*864e5,OPEN=14*864e5;
const DEF={
 ev_garance:{h:GAR,ic:'⚔️',cls:'garban',n:'Le Dernier Duel',
   d:"Onze ans qu'elle n'était pas rentrée chez elle. Elle en est repartie avec deux doigts en moins, et la ville sans son Tribunal des Lames."},
 ev_orgemme:{h:ORG,ic:'🪟',cls:'orgban',n:'La Rose Brisée',
   d:"Quarante-trois ans debout à tenir un pan de ciel au-dessus de cent maisons. Le village est parti. Lui aussi."}};
for(const k in DEF){EVB[k]={h:DEF[k].h,n:DEF[k].n,d:DEF[k].d};BANS[k]={n:DEF[k].n,start:START}}

/* --- le calendrier : 2 semaines ouvertes, puis retour toutes les 8 semaines --- */
const t0=()=>new Date(START+'T00:00:00').getTime();
{const be=banEnd;banEnd=function(k){if(!DEF[k])return be.apply(this,arguments);
  const s=t0(),n=Math.max(0,Math.floor((Date.now()-s)/CYCLE));return s+n*CYCLE+OPEN}}
{const bo=banOpen;banOpen=function(k){if(!DEF[k])return bo.apply(this,arguments);
  const s=t0();if(Date.now()<s)return false;return((Date.now()-s)%CYCLE)<OPEN}}
const nextOpen=k=>{const s=t0(),n=Math.floor((Date.now()-s)/CYCLE)+1;return s+n*CYCLE};

/* --- le bonus maison : un ×10 garantit au moins un Épique --- */
{const px=pullX;pullX=function(n,o){o=o||{};const ban=o.ban||UI.ban||'wk';
  if(DEF[ban]&&n>=10&&o.minR==null)o=Object.assign({},o,{minR:3});
  return px.call(this,n,o)}}

/* --- l'habillage --- */
const deco=k=>{const D=DEF[k];
 if(D.cls==='garban')return`<div class="garbanfx"><b></b><b></b>${[...Array(11)].map((_,i)=>`<i style="--x:${(i*9.4+4)%96}%;--d:${(i*.9).toFixed(1)}s;--t:${(7+i%4*1.6).toFixed(1)}s"></i>`).join('')}</div>`;
 const C=['#1e4a92','#8e1e32','#c08a22','#1f6b54','#3f7fd0'];
 return`<div class="orgbanfx">${[...Array(9)].map((_,i)=>`<i style="--x:${(i*12+2)%92}%;--y:${(i*29)%78}%;--w:${34+i%3*16}px;--h:${26+i%4*12}px;--c:${C[i%5]};--d:${(i*.6).toFixed(1)}s;--t:${(4.5+i%3).toFixed(1)}s"></i>`).join('')}</div>`};
{const ps=pSummon;pSummon=function(){let h=ps.apply(this,arguments);
  try{
    for(const k in DEF){const D=DEF[k],F=HEROES[D.h];if(!F)continue;
      const first=esc(F.n.split(' ')[0]);
      h=h.split(`data-v="${k}">⏳ ${first} `).join(`data-v="${k}">${D.ic} ${esc(D.n)} `)}
    const k=UI.ban;
    if(DEF[k]&&banOpen(k)){const D=DEF[k];
      h=h.replace('<div class="banner evban">',`<div class="banner evban ${D.cls}">${deco(k)}`);
      h=h.replace('<p class="sub" style="margin:4px 0 12px">',`<p class="evflav">${esc(D.d)}</p><p class="sub" style="margin:4px 0 12px">`);
      h=h.replace('<div class="alpity">',`<div class="evperk">🎁 Sur cette bannière, un <b>×10 garantit au moins un Épique</b>.</div><div class="alpity">`)}
  }catch(e){}
  return h}}
/* quand elles sont fermées, on dit quand elles reviennent au lieu de faire comme si elles n'existaient pas */
{const ps=pSummon;pSummon=function(){let h=ps.apply(this,arguments);
  try{const shut=Object.keys(DEF).filter(k=>!banOpen(k));
    if(shut.length&&h.indexOf('class="card bansoon"')<0){
      const rows=shut.map(k=>{const D=DEF[k],F=HEROES[D.h];return`<div class="bsrow"><span>${D.ic}</span><div><b>${esc(D.n)}</b><small>${esc(F?F.n:'')} · revient dans ${dur(nextOpen(k)-Date.now())}</small></div></div>`}).join('');
      h=h.replace('<div class="card"><div class="h3">Taux',`<div class="card bansoon"><div class="h3" style="margin:0 0 6px">Bannières à venir</div>${rows}<p class="muted" style="font-size:12px;margin:8px 0 0">Les bannières de personnage durent 2 semaines et reviennent toutes les 8 semaines. En attendant, ces héros restent disponibles sur l'invocation standard.</p></div><div class="card"><div class="h3">Taux`)}
  }catch(e){}
  return h}}

const st=document.createElement('style');st.textContent=`
.banner.evban{position:relative;overflow:hidden}
.banner.evban .tx,.banner.evban .pt{position:relative;z-index:1}
.evflav{font-size:12.5px;opacity:.8;font-style:italic;margin:6px 0 0;line-height:1.35}
.evperk{font-size:12px;font-weight:800;background:rgba(255,255,255,.08);border:1px solid rgba(255,255,255,.14);border-radius:10px;padding:6px 9px;margin:0 0 8px}
.banner.garban{border-color:#e04a5c!important;background:radial-gradient(125% 95% at 80% 38%,#6e1a2c 0%,#2c0d17 46%,#120509 100%)}
.garbanfx{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit}
.garbanfx i{position:absolute;left:var(--x);top:-14px;width:11px;height:11px;background:linear-gradient(135deg,#ff8294,#a8203a);border-radius:60% 0 60% 0;opacity:.75;animation:garpet var(--t) var(--d) linear infinite}
@keyframes garpet{0%{transform:translateY(-16px) rotate(0deg)}100%{transform:translateY(260px) rotate(420deg)}}
.garbanfx b{position:absolute;right:4%;top:48%;width:190px;height:3px;border-radius:3px;background:linear-gradient(90deg,transparent,rgba(255,255,255,.35),transparent);transform:translateY(-50%) rotate(-30deg)}
.garbanfx b+b{transform:translateY(-50%) rotate(30deg)}
.banner.orgban{border-color:#f0c457!important;background:radial-gradient(125% 95% at 80% 38%,#25457f 0%,#151b32 46%,#080a14 100%)}
.orgbanfx{position:absolute;inset:0;overflow:hidden;pointer-events:none;border-radius:inherit}
.orgbanfx i{position:absolute;left:var(--x);top:var(--y);width:var(--w);height:var(--h);background:var(--c);opacity:.3;clip-path:polygon(14% 0,100% 9%,86% 100%,0 91%);animation:orgpane var(--t) var(--d) ease-in-out infinite;box-shadow:0 0 14px var(--c)}
@keyframes orgpane{50%{opacity:.62}}
.bansoon .bsrow{display:flex;align-items:center;gap:10px;padding:6px 0}
.bansoon .bsrow span{font-size:20px}
.bansoon .bsrow b{display:block;font-size:13.5px}
.bansoon .bsrow small{display:block;opacity:.75;font-size:11.5px}
html.scrl .garbanfx i,html.scrl .orgbanfx i{animation-play-state:paused}`;document.head.appendChild(st);

try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{
  if(Object.keys(DEF).some(k=>banOpen(k))&&!L.some(a=>a.k==='v53ban'))L.unshift({k:'v53ban',ac:'#e04a5c',tag:'INVOCATIONS',t:'Deux bannières ouvertes ⚔️🪟',
   x:"<b>⚔️ Le Dernier Duel</b> — Rouge-Garance la Duelliste en vedette.<br><b>🪟 La Rose Brisée</b> — Orgemme le Colosse de Vitrail en vedette.<br><br>Sur chacune : <b>50/50 puis garanti</b> — si la vedette ne sort pas au premier légendaire, le suivant est forcément elle. Et un <b>×10 garantit au moins un Épique</b>.<br><br>Elles restent <b>2 semaines</b>, puis reviennent toutes les 8 semaines. Entre-temps, les deux héros restent invocables sur la bannière standard.",
   art:()=>`<div class="skann v53ban">${typeof garBody==='function'?garBody(0):''}${typeof orgBody==='function'?orgBody(0):''}</div>`,
   go:'🎲 Aller aux invocations',fn:()=>{TAB='invoc';UI.iv='invoc';UI.ban='ev_garance';try{scrollTo(0,0)}catch(e){}}})}catch(e){}return L}}catch(e){}
const st2=document.createElement('style');st2.textContent=`.skann.v53ban{display:flex;justify-content:center;gap:4px}.skann.v53ban svg{height:150px;width:auto}`;document.head.appendChild(st2);
try{PATCH.unshift({v:'v54',d:Date.now(),t:'Bannières de Garance et d\'Orgemme',items:[
 "⚔️ <b>Le Dernier Duel</b> : bannière vedette de Rouge-Garance la Duelliste.",
 "🪟 <b>La Rose Brisée</b> : bannière vedette d'Orgemme le Colosse de Vitrail.",
 "Sur ces deux bannières : <b>50/50 puis garanti</b>, et un <b>×10 garantit au moins un Épique</b> (au lieu d'un Super Rare).",
 "Elles durent 2 semaines et <b>reviennent toutes les 8 semaines</b> — les bannières de personnage ne disparaissent plus définitivement."]})}catch(e){}
}catch(e){console.warn('bannières v419',e)}})();
