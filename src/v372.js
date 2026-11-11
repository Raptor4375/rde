
/* ================= CHOISIR SES HÉROS AVANT LE COMBAT (+ héros exclusifs à l'essai dans le mode histoire) =================
   Avant un chapitre du mode histoire (Livres et chroniques) et avant une étape de l'Aventure, un écran
   « Choisir ses héros » : le champ de bataille avec ton équipe et les ennemis, ta puissance contre la leur,
   les affinités actives, et la liste de tes héros à cocher. Dans le mode histoire, les héros exclusifs
   que tu n'as pas encore (Éryndel, Aegis, Lyra) sont prêtés gratuitement pour les essayer. */
const PICK={on:false,ids:null,trial:{}};window.PICK=PICK;
(function(){try{
{const tf=teamIdsFor;teamIdsFor=function(mk){if(PICK.on&&PICK.ids&&(mk==='pve'||mk==null))return PICK.ids.slice();return tf.apply(this,arguments)}}
{const hs=heroStats;heroStats=function(id){const tr=PICK.on&&PICK.trial[id];if(tr&&!S.heroes[id]){S.heroes[id]=tr;try{return hs.apply(this,arguments)}finally{delete S.heroes[id]}}return hs.apply(this,arguments)}}
{const hu=heroUnit;heroUnit=function(id,k){const tr=PICK.on&&PICK.trial[id];if(tr&&!S.heroes[id]){S.heroes[id]=tr;try{const u=hu.apply(this,arguments);u.trial=1;return u}finally{delete S.heroes[id]}}return hu.apply(this,arguments)}}
window.pkPow=ids=>{const was=PICK.on;PICK.on=true;try{return ids.reduce((a,id)=>a+((S.heroes[id]||PICK.trial[id])?power(heroStats(id)):0),0)}finally{PICK.on=was}};
const PK={ctx:null,sel:[],cls:'all',pw:{},bypass:false,lastTrial:[]};window.PKX=PK;
const MAXT=5;
/* les héros prêtés : au niveau moyen de tes 5 meilleurs héros */
function trialRec(){const own=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]);const best=own.map(i=>[i,power(heroStats(i))]).sort((a,b)=>b[1]-a[1]).slice(0,5).map(x=>S.heroes[x[0]]);
  const n=Math.max(1,best.length),l=Math.max(1,Math.round(best.reduce((a,o)=>a+(o.l||1),0)/n)),e=Math.min(3,Math.round(best.reduce((a,o)=>a+(o.e||0),0)/n));return{l,e,f:0,u:0,trial:1}}
const trialIds=()=>{const L=HEROES.filter(h=>h.ex&&!S.heroes[h.i]).map(h=>h.i);
  /* les nouveaux héros (v427) : prêtés aussi tant qu'on ne les a pas */
  try{if(typeof window.RDEtrialMore==='function')for(const i of window.RDEtrialMore())if(HEROES[i]&&!S.heroes[i]&&!L.includes(i))L.push(i)}catch(e){}
  return L};
const isTrial=id=>!S.heroes[id]&&!!PICK.trial[id];
const BODYI={};
const still=x=>String(x||'').replace(/<(animate|animateMotion|animateTransform|set)\b[^>]*\/>/g,'').replace(/<(animate|animateMotion|animateTransform)\b[^>]*>[\s\S]*?<\/(animate|animateMotion|animateTransform)>/g,'');
function bodyImg(id){const o=S.heroes[id]||PICK.trial[id]||{},u=HEROES[id].r>=4?Math.min(3,o.u||0):0,k=id+'_'+u;if(BODYI[k])return BODYI[k];
  let src='';try{src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(still(heroBody(HEROES[id],u)))}catch(e){}return BODYI[k]=src}
/* les ennemis du combat, pour l'aperçu (sans rien lancer) */
function pkFoes(){const c=PK.ctx;if(!c)return[];let f=[];PICK.on=true;PICK.ids=PK.sel.slice();
  try{if(c.kind==='story'){SGX.ch=c.c;SGX.go=true;try{const r=evBattle();f=(r&&r.foes)||[]}finally{SGX.go=false;SGX.active=false}}
    else if(c.kind==='stage'){if(c.mode==='h'){NMODE=c.s;HMODE=c.s}else if(c.mode==='n')NMODE=c.s;try{f=stageFoes(c.s)}finally{NMODE=0;HMODE=0}}}
  catch(e){console.warn('aperçu',e)}finally{PICK.on=false}return f}
const fpow=u=>power({hp:u.max,atk:u.atk,def:u.def,spd:u.spd||100});
function pkOpen(ctx){PK.ctx=ctx;PK.cls='all';PICK.trial={};
  if(ctx.trials){const rec=trialRec();for(const id of trialIds())PICK.trial[id]=Object.assign({},rec)}
  const base=teamIdsFor('pve').filter(i=>S.heroes[i]);PK.sel=base.slice(0,MAXT);
  if(ctx.trials)for(const id of PK.lastTrial)if(PICK.trial[id]&&PK.sel.length<MAXT&&!PK.sel.includes(id))PK.sel.push(id);
  PK.pw={};for(const id of Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]))PK.pw[id]=power(heroStats(id));
  PICK.on=true;try{for(const id of Object.keys(PICK.trial))PK.pw[id]=power(heroStats(+id))}finally{PICK.on=false}
  /* dans la chronique d'un héros qu'on n'a pas encore, il est déjà placé dans l'équipe */
  try{const fav=ctx.trials&&typeof window.RDEtrialFav==='function'?window.RDEtrialFav(ctx):null;
    if(fav!=null&&PICK.trial[fav]&&!S.heroes[fav]&&!PK.sel.includes(fav)){
      if(PK.sel.length<MAXT)PK.sel.push(fav);
      else{let w=0;for(let k=1;k<PK.sel.length;k++)if((PK.pw[PK.sel[k]]||0)<(PK.pw[PK.sel[w]]||0))w=k;PK.sel[w]=fav}}}catch(e){}
  let o=document.getElementById('pkov');if(!o){o=document.createElement('div');o.id='pkov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');document.body.appendChild(o);o.addEventListener('click',pkClick)}
  document.body.classList.add('pkon');pkRender();try{if(UIS.tap&&AU.ok)UIS.tap()}catch(e){}}
function pkClose(){const o=document.getElementById('pkov');if(o)o.remove();document.body.classList.remove('pkon');PK.ctx=null}
function pkRender(){const o=document.getElementById('pkov');if(!o||!PK.ctx)return;const c=PK.ctx,sel=PK.sel;
  const foes=pkFoes(),myP=window.pkPow(sel),foP=Math.round(foes.reduce((a,u)=>a+fpow(u),0)*.55);
  const slots=[0,1,2,3,4].map(i=>{const id=sel[i],x=[1,20,39,58,77][i],dy=[10,2,12,4,10][i];if(id==null)return`<div class="pkslot e" style="left:${x}%;bottom:${dy}px"><span>+</span></div>`;
    return`<button class="pkslot" data-pk="rm" data-v="${id}" style="left:${x}%;bottom:${dy}px" aria-label="${esc(HEROES[id].n)}"><img alt="" src="${bodyImg(id)}">${isTrial(id)?'<span class="pktr">ESSAI</span>':''}</button>`}).join('');
  const fz=foes.slice(0,6).map(u=>`<span class="pkfoe ${u.boss?'b':''}">${u.port||''}</span>`).join('');
  const all=[...Object.keys(PICK.trial).map(Number),...Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]&&!PICK.trial[i])];
  const list=all.filter(i=>PK.cls==='all'||HEROES[i].c===PK.cls).sort((a,b)=>(isTrial(b)-isTrial(a))||((PK.pw[b]||0)-(PK.pw[a]||0)));
  const tiles=list.map(id=>{const h=HEROES[id],o2=S.heroes[id]||PICK.trial[id]||{},on=sel.includes(id),tr=isTrial(id);
    return`<button class="pkh ${on?'on':''} ${tr?'tr':''}" style="${rv(h.r)}" data-pk="h" data-v="${id}" aria-pressed="${on}" aria-label="${esc(h.n)}">${portrait(h)}<span class="pklv">Nv ${o2.l||1}</span>${tr?'<span class="pktr">ESSAI</span>':''}${on?`<span class="pkck">✓</span>`:''}</button>`}).join('');
  const cls=[['all','Tous'],['Tank','🛡️'],['Guerrier','⚔️'],['Assassin','🗡️'],['Mage','🔮'],['Tireur','🏹'],['Soutien','✚']].map(([k,l])=>`<button class="chip ${PK.cls===k?'on':''}" data-pk="cls" data-v="${k}" aria-label="${k==='all'?'Tous':k}">${l}</button>`).join('');
  const nT=sel.filter(isTrial).length;
  o.innerHTML=`<div class="pkhd"><button class="btn sm pkback" data-pk="back" aria-label="Retour">←</button><div class="pkt"><b>Choisir ses héros</b><small>${esc(c.title||'')}</small></div><span class="pkn">${sel.length}/${MAXT}</span></div>
   <div class="pkvs"><span class="me">⚔️ ${fmt(myP)}</span><i>VS</i><span class="them">☠️ ${fmt(foP)}</span>${c.rec?`<small>Conseillé : ${fmt(c.rec)}</small>`:''}</div>
   <div class="pkfield"><div class="pksky"></div><div class="pkfoes">${fz}</div><div class="pkteam">${slots}</div></div>
   <div class="pkaff">${affTeamHTML(sel)||'<small class="muted">Astuce : touche un héros sur le terrain pour le retirer.</small>'}</div>
   ${c.trials&&Object.keys(PICK.trial).length?`<div class="pkinfo">🎁 <b>Essai gratuit</b> : dans le mode histoire, les nouveaux héros que tu n'as pas encore te sont prêtés pour les essayer${nT?` (${nT} dans l'équipe)`:''}.</div>`:''}
   <div class="pkfil chips">${cls}</div><div class="pklist">${tiles||'<small class="muted">Aucun héros de cette classe.</small>'}</div>
   <button class="btn p pkgo" data-pk="go" ${sel.length?'':'disabled'}>⚔️ Combattre</button>`;
  try{i18nPass&&LANG!=='fr'&&i18nPass(o)}catch(e){}}
function pkClick(e){const b=e.target.closest('[data-pk]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.pk,v=b.dataset.v;
  if(a==='back'){pkClose();return}
  if(a==='cls'){PK.cls=v;pkRender();return}
  if(a==='rm'){PK.sel=PK.sel.filter(x=>x!==+v);pkRender();return}
  if(a==='h'){const id=+v;if(PK.sel.includes(id))PK.sel=PK.sel.filter(x=>x!==id);else{if(PK.sel.length>=MAXT){toast(`${MAXT} héros maximum : retire d'abord un héros.`);return}PK.sel.push(id)}pkRender();return}
  if(a==='go'){if(!PK.sel.length)return;const ctx=PK.ctx,sel=PK.sel.slice();
    /* l'équipe est gardée (sans les héros prêtés) */
    const own=sel.filter(i=>S.heroes[i]),nT=sel.length-own.length,prev=teamIdsFor('pve').filter(i=>S.heroes[i]);
    /* un héros prêté ne prend pas la place d'un de tes héros dans l'équipe gardée */
    const keep=own.slice();if(nT)for(const i of prev)if(keep.length<Math.min(MAXT,own.length+nT)&&!keep.includes(i))keep.push(i);
    if(keep.length){try{tInit();const ti=S.tfor.pve;S.teams[ti].ids=keep.slice();if(ti===S.tcur)S.team=keep.slice()}catch(er){}}
    PK.lastTrial=sel.filter(isTrial);pkClose();save();
    PICK.ids=sel;PICK.on=true;try{ctx.go()}finally{PICK.on=false}
    try{if(B)for(const u of B.units)if(u.trial){const el=document.getElementById('u-'+u.key);if(el&&!el.querySelector('.pktag'))el.insertAdjacentHTML('beforeend','<span class="pktag">ESSAI</span>')}}catch(er){}
    if(!B)PICK.trial={};return}}
/* les héros prêtés ne restent jamais dans la sauvegarde */
{const cb=closeBattle;closeBattle=function(){const r=cb.apply(this,arguments);try{for(const id of Object.keys(PICK.trial))if(S.heroes[id]&&S.heroes[id].trial)delete S.heroes[id]}catch(e){}return r}}
/* mode histoire : l'écran s'ouvre juste avant le combat du chapitre */
{const sbt=sagaBattle;sagaBattle=function(c){if(PK.bypass||B||!SAGA[c])return sbt.apply(this,arguments);const cfg=SAGA[c];
  pkOpen({kind:'story',c,trials:true,title:`${cfg.ic||'📖'} ${typeof trS==='function'?trS(cfg.t):cfg.t}`,go:()=>{PK.bypass=true;try{sbt.call(this,c)}finally{PK.bypass=false}}})}}
/* Aventure : avant une étape (facile, normal, difficile). « Étape suivante » et « Réessayer » lancent directement. */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="stage"],[data-a="nstage"],[data-a="hstage"]');if(!t||t.disabled||B||!t.closest('#main'))return;
  const a=t.dataset.a,s=+t.dataset.v;if(!s||(a==='stage'&&(S.max||1)<5))return;e.preventDefault();e.stopImmediatePropagation();
  const mode=a==='hstage'?'h':a==='nstage'?'n':'e';let rec=0;try{rec=mode==='h'?nRecD(s):mode==='n'?nRec(s):recPow(s)}catch(er){}
  const title=(mode==='h'?'Mode Difficile · ':mode==='n'?'Mode Normal · ':'')+'Étape '+s+(s%10===0?' · Boss':'');
  pkOpen({kind:'stage',mode,s,rec,trials:false,title,go:()=>{if(mode==='h')hBattle(s);else if(mode==='n')nBattle(s);else startBattle('stage',s)}})},true);
const st=document.createElement('style');st.textContent=`#pkov{position:fixed;inset:0;z-index:59;display:flex;flex-direction:column;gap:8px;padding:calc(10px + env(safe-area-inset-top,0px)) 12px calc(10px + env(safe-area-inset-bottom,0px));background:radial-gradient(130% 70% at 50% 0%,#2e2364,#0b0819 72%),#0b0819;color:var(--fg,#fff);overflow:hidden}
body.pkon #app,body.pkon nav.tabs{visibility:hidden}
.pkhd{display:flex;align-items:center;gap:8px}.pkt{flex:1;min-width:0}.pkt b{display:block;font-size:18px;line-height:1.1}.pkt small{display:block;opacity:.75;font-size:12px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.pkn{font-weight:900;color:#ffd84a}
.pkvs{display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;font-weight:900;font-size:15px;padding:6px 10px;border-radius:12px;background:rgba(0,0,0,.35);border:1px solid rgba(255,255,255,.08)}.pkvs .me{color:#8ad8ff}.pkvs i{color:#ffd84a}.pkvs .them{color:#ff9a8a}.pkvs small{font-weight:700;opacity:.75;font-size:11.5px}
.pkfield{position:relative;flex:1 1 auto;min-height:190px;border-radius:16px;overflow:hidden;border:1px solid rgba(255,255,255,.1);background:linear-gradient(180deg,#4a3a8a 0%,#26205a 46%,#3a2a1e 47%,#1e160e 100%)}
.pksky{position:absolute;inset:0;background:radial-gradient(60% 40% at 50% 46%,rgba(255,216,120,.18),transparent 70%),repeating-linear-gradient(90deg,transparent 0 38px,rgba(255,255,255,.025) 38px 40px)}
.pkfoes{position:absolute;top:8px;left:8px;right:8px;display:flex;justify-content:center;gap:6px;flex-wrap:wrap}.pkfoe{width:50px;height:50px;border-radius:10px;overflow:hidden;border:2px solid #ff6a5a;background:#140c24;box-shadow:0 4px 10px rgba(0,0,0,.4)}.pkfoe.b{width:62px;height:62px;border-color:#ffd84a}.pkfoe img,.pkfoe svg{width:100%;height:100%;display:block}
.pkteam{position:absolute;left:0;right:0;bottom:0;height:64%}.pkslot{position:absolute;width:22%;height:100%;padding:0;border:0;background:none;display:flex;align-items:flex-end;justify-content:center;cursor:pointer}.pkslot img{height:100%;width:auto;max-width:150%;object-fit:contain}
.pkslot.e span{width:70%;height:42%;border:2px dashed rgba(255,255,255,.28);border-radius:14px;display:grid;place-items:center;font-size:24px;color:rgba(255,255,255,.4);margin-bottom:10%}
.pkslot .pktr{position:absolute;top:6%;left:50%;transform:translateX(-50%)}
.pkaff .affrow{margin:0}.pkaff small{font-size:12px}.pkinfo{font-size:12px;padding:6px 10px;border-radius:10px;background:rgba(255,216,74,.12);border:1px solid rgba(255,216,74,.35)}
.pkfil{flex-wrap:nowrap;overflow-x:auto;margin:0}.pkfil .chip{flex:none}
.pklist{display:flex;gap:8px;overflow-x:auto;padding:2px 2px 6px;min-height:72px;scrollbar-width:none}.pklist::-webkit-scrollbar{display:none}
.pkh{position:relative;flex:none;width:66px;height:66px;border-radius:12px;padding:0;border:2px solid var(--rc,#666);background:#140c24;overflow:hidden;cursor:pointer}.pkh img,.pkh svg{width:100%;height:100%;display:block}.pkh.on{box-shadow:0 0 0 3px #58e4a0}
.pkck{position:absolute;inset:0;display:grid;place-items:center;background:rgba(0,0,0,.42);font-size:30px;font-weight:900;color:#58e4a0}.pklv{position:absolute;left:2px;bottom:2px;font-size:9px;font-weight:900;background:rgba(0,0,0,.65);border-radius:6px;padding:0 4px;color:#fff}
.pktr{position:absolute;top:2px;right:2px;font-size:8.5px;font-weight:900;color:#140c24;background:#ffd84a;border-radius:6px;padding:0 4px;letter-spacing:.03em}.pkh.tr{border-color:#ffd84a}
.pkgo{width:100%;font-size:17px;padding:12px}.u .pktag{position:absolute;top:2px;left:50%;transform:translateX(-50%);font-size:8px;font-weight:900;color:#140c24;background:#ffd84a;border-radius:6px;padding:0 4px;z-index:3}`;
document.head.appendChild(st);
window.pkOpen=pkOpen;window.pkClose=pkClose;
}catch(e){console.warn('choix des héros',e)}})();
