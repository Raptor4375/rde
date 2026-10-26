
/* ================= Invocation standard + bannières d'événement (50/50 puis garanti) ================= */
/* Bannières :
   - « Héros de la semaine » (wk) : inchangée.
   - « Invocation standard » (std) : permanente, tous les légendaires à égalité, et les MYTHIQUES (0,5 %, garanti en 120).
   - Bannières d'événement / nouveau héros : 2 semaines max (BANS de v329), 50/50 puis garanti.
     Pour en ajouter une : EVB.ev_nom={h:<index du héros>,start:'AAAA-MM-JJ',n:'Titre',d:'Description'} */
const STD_MR=.5,STD_MP=120;
/* réparation : un compteur légendaire abîmé (bug du 26/10) revient dans les clous */
function pityFix(){try{if(!(S.pity>=0&&S.pity<60)){S.pity=S.pity<-1e8?Math.max(0,Math.min(59,Math.round(S.pity+1e9))):0;save()}if(S.stdm!=null&&!(S.stdm>=0&&S.stdm<120)){S.stdm=0;save()}}catch(e){}}
setTimeout(pityFix,1500);setInterval(pityFix,30000);
const EVB={};
for(const k in EVB)BANS[k]={n:EVB[k].n,start:EVB[k].start};
const evOpen=()=>Object.keys(EVB).filter(k=>banOpen(k));
function STDM(){if(S.stdm==null){S.stdm=0;try{if(S.myb&&S.myb.p)S.stdm=Math.min(STD_MP-1,S.myb.p|0)}catch(e){}}return S.stdm}
const SMYTHS=()=>HEROES.filter(h=>h.r===5);
const SLEGS=()=>HEROES.filter(h=>h.r===4);
function givePulled(h){const ow=S.heroes[h.i];if(!ow){S.heroes[h.i]={l:1,e:0,f:0};return{i:h.i,isNew:true}}ow.f+=3;return{i:h.i,note:h.n.split(' ')[0]+' : +3 fragments'}}
/* le tirage : on décide nous-mêmes des mythiques et des légendaires, le reste passe par l'invocation normale */
{const px=pullX;pullX=function(n,o={}){const ban=o.ban||UI.ban||'wk';const ev=EVB[ban]&&banOpen(ban);if(ban!=='std'&&!ev)return px.apply(this,arguments);
  ensureDaily();
  if(o.pay==='free'){if(!S.daily.free)return;S.daily.free=0}
  else if(o.pay==='pt'){if(INV().pt<n)return toast("Pas assez de tickets d'invocation.");INV().pt-=n}
  else if(o.pay==='gems'){if(S.gems<o.cost)return toast('Pas assez de gemmes. Termine des quêtes ou passe à la boutique !');S.gems-=o.cost}
  STDM();const slots=[];
  for(let k=0;k<n;k++){
    if(ban==='std'&&SMYTHS().length){S.stdm++;if(Math.random()*100<STD_MR||S.stdm>=STD_MP){S.stdm=0;slots.push(5);continue}}
    S.pity++;const r=o.leg?4:rollR();if(r===4||S.pity>=60){S.pity=0;slots.push(4)}else slots.push(-1)}
  const extra=slots.filter(x=>x>=4).length,rest=n-extra;
  const o2=Object.assign({},o,{pay:'none',ban:'wk',leg:false,minR:extra?0:(o.minR!=null?o.minR:(n===10?2:0))});
  const rr=rollR,p0=S.pity,before=UI.last;
  rollR=function(){let r,g=0;do{r=rr()}while(r>=4&&g++<50);return r>=4?3:r};S.pity=-1e9;
  let res;try{res=px.call(this,rest,o2)}finally{rollR=rr;S.pity=p0;save()}
  if(!extra){try{render()}catch(e){}}
  if(!extra)return res;
  if(UI.last===before||!Array.isArray(UI.last))UI.last=[];
  let leg=null,myth=null;
  for(const s of slots){if(s<4)continue;let h;
    if(s===5){h=pick(SMYTHS());myth=h}
    else if(ban==='std')h=pick(SLEGS());
    else{const F=HEROES[EVB[ban].h];if(S.evg||Math.random()<.5){h=F;S.evg=0}else{h=pick(SLEGS().filter(x=>x.i!==F.i));S.evg=1}}
    if(s===4)leg=h;const it=givePulled(h);UI.last.splice(Math.floor(Math.random()*(UI.last.length+1)),0,it)}
  S.pulls+=extra;try{q('pull',extra)}catch(e){}
  try{for(const x of UI.last){const h=HEROES[x.i];if(h&&h.r>=4&&x.note&&S.heroes[h.i]&&S.heroes[h.i].e>=3)x.note=h.n.split(' ')[0]+' : +3 fragments d\'éveil ◆'}}catch(e){}
  if(myth){toast('✦ Un héros MYTHIQUE répond à ton appel !');try{news(Date.now(),`${S.name||'Voyageur'} a invoqué ${myth.n}, un héros MYTHIQUE !`)}catch(e){}try{react('envy',{hero:myth.n},3)}catch(e){}}
  else if(leg){toast('Un héros LÉGENDAIRE répond à ton appel !');try{news(Date.now(),`${S.name||'Voyageur'} a invoqué ${leg.n} !`)}catch(e){}try{react('envy',{hero:leg.n},2)}catch(e){}}
  save();render();return res}}
/* --- l'écran d'invocation --- */
const stdChips=ban=>`<div class="chips"><button class="chip ${ban==='wk'?'on':''}" data-a="ban" data-v="wk">★ Héros de la semaine</button><button class="chip stdchip ${ban==='std'?'on':''}" data-a="ban" data-v="std">✦ Invocation standard</button>${evOpen().map(k=>`<button class="chip evchip ${ban===k?'on':''}" data-a="ban" data-v="${k}">⏳ ${esc(HEROES[EVB[k].h].n.split(' ')[0])} <span class="pdot">✦</span></button>`).join('')}</div>`;
const stdPullBtns=()=>{const I=INV();return`<div class="row">${S.daily.free?`<button class="btn g" data-a="pull" data-v="1" data-f="1">Invocation gratuite du jour</button>`:''}<button class="btn g" data-a="pull" data-v="1">×1 · ${GEM}100</button><button class="btn p" data-a="pull" data-v="10">×10 · ${GEM}900</button></div>
    ${I.pt?`<div class="row" style="margin-top:8px"><button class="btn" data-a="pullt" data-v="1">×1 · ${SIC.ticket}1</button><button class="btn" data-a="pullt" data-v="10" ${I.pt<10?'disabled':''}>×10 · ${SIC.ticket}10</button><span class="muted" style="font-size:12.5px">Tu as ${I.pt} ticket${I.pt>1?'s':''} d'invocation.</span></div>`:''}`};
const spct=x=>String(x).replace('.',',')+' %';
function stdRates(myth){const L=RATES[4]*legMul();return`<div class="card"><div class="h3">Taux d'apparition</div><div class="rates">${myth?`<div style="${rv(5)}"><b class="rc">${spct(STD_MR)}</b><span>Mythique</span></div>`:''}${RATES.map((r,k)=>`<div style="${rv(k)}"><b class="rc">${spct(k===4?L:r)}</b><span>${RAR[k].n}</span></div>`).join('')}</div>
  <p class="muted" style="margin:10px 0 0;font-size:12.5px">Doublons : les légendaires et mythiques donnent 3 fragments d'évolution, les autres raretés sont converties en or (300 à 2 500).</p></div>`}
function pSummonStd(){const M=SMYTHS(),L=SLEGS();STDM();const show=[L[(weekKey(Date.now())+3)%L.length],M[0]||L[0],L[(weekKey(Date.now())+7)%L.length]];
  return`${stdChips('std')}
  <div class="banner stdban"><div class="stdsky">${[...Array(14)].map((_,i)=>`<i style="--x:${(i*7.3+2)%100}%;--y:${(i*37)%90}%;--d:${(i*.4).toFixed(1)}s"></i>`).join('')}</div><div class="tx"><span class="tag stdtag">✦ BANNIÈRE PERMANENTE · TOUS LES HÉROS ✦</span>
    <div class="h">Invocation standard</div><p class="sub" style="margin:4px 0 12px"><b>Mythiques ${spct(STD_MR)}</b> · tous les légendaires à égalité, sans héros vedette.</p>
    ${stdPullBtns()}
    <div class="alpity"><div><b class="num">${STD_MP-S.stdm}</b><span>avant un mythique garanti</span></div><div><b class="num">${60-S.pity}</b><span>avant un légendaire garanti</span></div></div>
    <div class="muted" style="font-size:12px;margin-top:6px">Le compteur légendaire est commun à toutes les bannières. Le compteur mythique est propre à l'invocation standard.</div></div>
    <div class="pt stdpt">${show.map((h,i)=>`<div class="stdp p${i}${h.r===5?' my':''}">${portrait(h)}</div>`).join('')}</div></div>
  ${pullRes()}${stdRates(M.length)}`}
function pSummonEv(k){const e=EVB[k],F=HEROES[e.h],first=F.n.split(' ')[0],L=banLeft(k);
  return`${stdChips(k)}
  <div class="banner evban"><div class="tx"><span class="tag" style="${rv(F.r)}">⏳ ${L?esc(L)+' · ':''}BANNIÈRE ÉVÉNEMENT · ${F.r===5?'MYTHIQUE':'LÉGENDAIRE'}</span>
    <div class="h">${esc(e.n||F.n)}</div><p class="sub" style="margin:4px 0 12px"><b>50/50 puis garanti</b> : si ${esc(first)} ne sort pas, le prochain légendaire sera ${esc(first)}.</p>
    ${stdPullBtns()}
    <div class="alpity"><div><b class="num">${60-S.pity}</b><span>avant un légendaire garanti</span></div><div><b>${S.evg?'GARANTI':'50/50'}</b><span>${S.evg?`le prochain légendaire sera ${esc(first)}`:'pour le prochain légendaire'}</span></div></div></div><div class="pt">${portrait(F)}</div></div>
  ${pullRes()}${stdRates(0)}`}
{const ps=pSummon;pSummon=function(){STDM();
  if(UI.ban==='fo'||UI.ban==='al')UI.ban='std';
  if(EVB[UI.ban]&&!banOpen(UI.ban))UI.ban='std';
  if(UI.ban==='std')return pSummonStd();
  if(EVB[UI.ban])return pSummonEv(UI.ban);
  const b=UI.ban;UI.ban='wk';let h;try{h=ps.apply(this,arguments)}finally{UI.ban=b}
  return h.replace(/<div class="chips">[\s\S]*?<\/div>/,stdChips('wk'))}}
{const po=pOffers;pOffers=function(){const h=po.apply(this,arguments);const n=UI.ban==='std'?'Invocation standard':EVB[UI.ban]&&banOpen(UI.ban)?esc(EVB[UI.ban].n||HEROES[EVB[UI.ban].h].n):null;
  return n?h.replace(/(Elles utilisent la bannière choisie : <b>)[\s\S]*?(<\/b>)/,`$1${n}$2`):h}}
/* les anciens boutons « Table d'Aléa » mènent maintenant à l'invocation standard */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="algo"]');if(!t)return;e.preventDefault();e.stopImmediatePropagation();try{closeModal()}catch(_){}TAB='invoc';UI.iv='invoc';UI.ban='std';UI.last=null;render();window.scrollTo(0,0)},true);
{const ld=()=>{try{document.querySelectorAll('[data-a="algo"]').forEach(b=>{if(/Table d'Aléa/.test(b.textContent))b.innerHTML=b.innerHTML.replace(/Aller à la Table d'Aléa|Table d'Aléa/,'Invocation standard')})}catch(e){}};
  const mo=new MutationObserver(ld);try{mo.observe(document.body||document.documentElement,{childList:true,subtree:true})}catch(e){}}
try{PATCH.unshift({v:34,d:'26 octobre 2026',t:'Invocation standard',items:["✦ <b>Nouvelle bannière permanente : l'Invocation standard.</b> Pas de héros vedette : tous les légendaires ont la même chance de sortir.","🌟 <b>Les héros mythiques restent obtenables</b> dans l'invocation standard : <b>0,5 %</b> par invocation, et <b>garanti en 120 invocations</b>. Ton compteur de la Table d'Aléa a été transféré.","⏳ Les futures bannières de nouveaux héros dureront <b>2 semaines maximum</b> : quand un légendaire sort, 50 % de chances d'avoir le héros vedette, et s'il ne sort pas, <b>le prochain légendaire est garanti</b>.","★ Le Héros de la semaine ne change pas."]})}catch(e){}
