
/* ================= village de guilde : améliorations des bâtiments ================= */
const GVB=[
 {k:'boss',n:'Château',ic:'🏰',max:5,fx:l=>l>1?`+${4*(l-1)} % dégâts contre le Golem`:'Niveau de base',nx:'+4 % dégâts contre le Golem',art:()=>LB.castle()},
 {k:'hall',n:'Grand hall',ic:'🏛️',max:5,fx:l=>l>1?`+${3*(l-1)} % réussite des expéditions${l>=5?' · +1 place':''}`:'Niveau de base',nx:'+3 % réussite des expéditions (Nv 5 : +1 place)',art:()=>LB.temple()},
 {k:'chat',n:'Taverne',ic:'🍺',max:5,fx:l=>l>1?`Trinquer : +${20+5*(l-1)} pièces · coffre +${10*(l-1)} %`:'Niveau de base',nx:'+5 pièces en trinquant, +10 % de points de coffre',art:()=>LB.house({wall:'#d8b888',roof:'#8a3a2a',w:70})},
 {k:'shop',n:'Boutique',ic:'🛒',max:5,fx:l=>l>1?`−${5*(l-1)} % sur les prix`:'Niveau de base',nx:'−5 % sur les prix de la boutique de guilde',art:()=>LB.house({sign:1,wall:'#f0d8a8',roof:'#2a8a7a'})},
 {k:'forge',n:'Forge de guilde',ic:'⚒️',max:5,start:0,fx:l=>l?`+${2*l} % ATQ et PV pour tous tes héros`:'Pas encore construite',nx:'+2 % ATQ et PV pour tous les héros des membres',art:()=>LB.forge?LB.forge():LB.house({wall:'#a8a0a0',roof:'#3a3a4a'})}];
const GV_COST=[0,600,1600,3600,7500,13000];
function gvGid(){return S.rgid||S.gid||null}
function gvData(){const g=gvGid();if(!g)return null;if(S.rgid){const d=NET.guilds[S.rgid]||{};const v=d.vil||{};return{lv:Object.assign({boss:1,hall:1,chat:1,shop:1,forge:0},v.lv||{}),tr:v.tr||0,bd:v.bd||'',real:1}}
  S.gvil=S.gvil||{};const v=S.gvil[g]=S.gvil[g]||{lv:{boss:1,hall:1,chat:1,shop:1,forge:0},tr:0,bd:''};return Object.assign({real:0},v)}
function gvLv(k){try{const d=gvData();return d?d.lv[k]||0:(k==='forge'?0:1)}catch(e){return k==='forge'?0:1}}
function gvTotal(){const d=gvData();if(!d)return 0;return Object.values(d.lv).reduce((a,b)=>a+b,0)}
function gvCanBuild(){if(!S.rgid)return true;try{const d=NET.guilds[S.rgid];return(ROLE_RANK[gRoleOf(d,NET.pid)]||0)>=2}catch(e){return false}}
async function gvWrite(fn){const g=gvGid();if(!g)return;if(S.rgid&&NET.on&&NET.canWrite){await realGuildUpdate(d=>{const v=d.vil||{};const cur={lv:Object.assign({boss:1,hall:1,chat:1,shop:1,forge:0},v.lv||{}),tr:v.tr||0,bd:v.bd||''};fn(cur);return{vil:cur}})}else{const v=S.gvil[g];fn(v);save()}}
/* les bots de la guilde apportent chaque jour leur part au trésor */
async function gvBotDaily(){const d=gvData();if(!d||d.bd===today())return;let n=0;try{n=S.rgid?((NET.guilds[S.rgid]||{}).bots||[]).length:gMembers(S.gid).length}catch(e){}
  try{await gvWrite(v=>{if(v.bd===today())return;v.bd=today();v.tr+=Math.round(n*45+20)})}catch(e){}}
setInterval(()=>{try{if(TAB==='guilde'&&gvGid())gvBotDaily()}catch(e){}},20000);
const GVD=[{k:'gold',ic:'💰',n:'Donner de l\'or',v:20,cost:()=>Math.round(20000*(1+(S.max||1)/10)),cur:'gold'},{k:'coins',ic:'🪙',n:'Donner des pièces',v:30,cost:()=>100,cur:'gcoins'},{k:'gems',ic:'💎',n:'Donner des gemmes',v:60,cost:()=>50,cur:'gems'}];
function gvDonLeft(){S.gvd=S.gvd&&S.gvd.d===today()?S.gvd:{d:today(),n:0};return 5-S.gvd.n}
async function gvDonate(k){const D=GVD.find(x=>x.k===k);if(!D||gvDonLeft()<=0)return;const c=D.cost();if((S[D.cur]||0)<c)return toast('Pas assez de ressources.');S[D.cur]-=c;S.gvd.n++;save();
  try{await gvWrite(v=>{v.tr+=D.v})}catch(e){S[D.cur]+=c;S.gvd.n--;save();return toast("Le don n'a pas pu être envoyé.")}
  try{gchAdd(4)}catch(e){}toast(`${D.ic} Merci ! +${D.v} au trésor du village`);try{if(S.rgid&&NET.on)postMsg(`${D.ic} ${S.name||'Un membre'} a fait un don au trésor du village (+${D.v}).`,true,S.rgid)}catch(e){}render()}
async function gvUpgrade(k){const B0=GVB.find(b=>b.k===k),d=gvData();if(!B0||!d)return;const l=d.lv[k]||0;if(l>=B0.max)return;const c=GV_COST[l+1]||GV_COST[l]||99999;if(d.tr<c)return toast('Le trésor du village est trop maigre.');if(!gvCanBuild())return toast('Seuls le chef et les sous-chefs peuvent lancer les travaux.');
  let ok=false;try{await gvWrite(v=>{const L=v.lv[k]||0;const C=GV_COST[L+1];if(v.tr>=C&&L<B0.max){v.tr-=C;v.lv[k]=L+1;ok=true}})}catch(e){}if(!ok)return toast("Les travaux n'ont pas pu commencer.");
  try{if(S.rgid&&NET.on)postMsg(`🏗️ ${B0.ic} ${B0.n} passe au niveau ${l+1} ! ${B0.nx}.`,true,S.rgid)}catch(e){}gvApplyShop();
  modal(`<div class="gvup"><div class="gvupsc"><svg viewBox="-80 -110 160 130">${B0.art()}${gvDecoFor(k,l+1)}</svg><i class="gvsp s1">✨</i><i class="gvsp s2">⭐</i><i class="gvsp s3">✨</i><i class="gvsp s4">🎉</i></div><div class="h">${B0.ic} ${B0.n} · niveau ${l+1} !</div><p class="sub">${B0.fx(l+1)}</p><button class="btn p" data-a="close" style="width:100%">Magnifique !</button></div>`);render()}
/* décorations qui apparaissent sur les bâtiments selon leur niveau */
function gvDecoFor(k,l){if(l<=1&&k!=='forge')return'';let s='';const fl=[[-30,-64],[30,-64],[0,-84],[-46,-40],[46,-40]];
  for(let i=0;i<Math.min(l-1,4);i++){const [x,y]=fl[i];s+=`<g transform="translate(${x} ${y})"><path d="M0 0V-16" stroke="#5a3a1a" stroke-width="1.6"/><path d="M0 -16L10 -13L0 -10Z" fill="${['#ffd84a','#58e4d3','#ff5d6c','#b77dff'][i]}" stroke="#140c24" stroke-width=".8"><animate attributeName="d" values="M0 -16L10 -13L0 -10Z;M0 -16Q5 -15 10 -14Q5 -11 0 -10Z;M0 -16L10 -13L0 -10Z" dur="1.6s" repeatCount="indefinite"/></path></g>`}
  if(l>=3)s+=`<path d="M-40 -6Q-20 4 0 -2Q20 4 40 -6" stroke="#5a3a1a" stroke-width="1" fill="none"/>${[-30,-15,0,15,30].map((x,i)=>`<circle cx="${x}" cy="${-2+Math.abs(x)/10}" r="2.6" fill="${i%2?'#ffd84a':'#ff8a3a'}"><animate attributeName="opacity" values="1;.4;1" dur="${1.2+i*.2}s" repeatCount="indefinite"/></circle>`).join('')}`;
  if(l>=5)s+=`<ellipse cx="0" cy="-40" rx="56" ry="50" fill="#ffd84a" opacity=".1"><animate attributeName="opacity" values=".05;.18;.05" dur="2.4s" repeatCount="indefinite"/></ellipse><text x="0" y="-96" text-anchor="middle" font-size="14">👑</text>`;
  return s}
function gvPips(l,max){return`<span class="gvpips">${[...Array(max)].map((_,i)=>`<i class="${i<l?'on':''}"></i>`).join('')}</span>`}
/* effets */
{const am=applyMeta;applyMeta=function(units,mk){const r=am.apply(this,arguments);try{if(!gvGid())return r;const hs=units.filter(u=>u.hid!=null&&u.side===0);if(!hs.length)return r;const f=gvLv('forge'),b=gvLv('boss');
  for(const u of hs){if(f){u.atk=Math.round(u.atk*(1+.02*f));const hp0=u.hp===u.max;u.max=Math.round(u.max*(1+.02*f));if(hp0)u.hp=u.max}if(mk==='guild'&&b>1)u.dm=(u.dm||1)*(1+.04*(b-1))}}catch(e){}return r}}
{const ec=expChance;expChance=function(m,ids){const c=ec.apply(this,arguments);if(!ids||!ids.length)return c;return Math.min(.99,c+.03*Math.max(0,gvLv('hall')-1))}}
{const es=expSlots;expSlots=function(){return es.apply(this,arguments)+(gvLv('hall')>=5?1:0)}}
{const ga=gchAdd;gchAdd=function(n){return ga.call(this,Math.round(n*(1+.1*Math.max(0,gvLv('chat')-1))))}}
{const gt=ghToast;ghToast=async function(){const was=ghToastDone();const r=await gt.apply(this,arguments);if(!was&&ghToastDone()){const x=5*Math.max(0,gvLv('chat')-1);if(x){S.gcoins+=x;save()}}return r}}
const SHOP_BASE=SHOP.map(x=>x.c);
function gvApplyShop(){const l=gvLv('shop');SHOP.forEach((x,i)=>{x.c=Math.max(1,Math.round(SHOP_BASE[i]*(1-.05*Math.max(0,l-1))))})}
/* la page du chantier */
function gvPage(){const d=gvData();if(!d)return`<div class="card"><p class="muted">Rejoins une guilde pour construire son village.</p></div>`;const can=gvCanBuild(),left=gvDonLeft(),tot=gvTotal();
  const next=GV_COST.slice(1).find(c=>c>d.tr)||GV_COST[GV_COST.length-1];
  const head=`<div class="card gvhead"><div class="gvsky">${gvSkyline(d)}</div><div class="row" style="justify-content:space-between;align-items:center;gap:8px;margin-top:8px"><div><div class="h" style="margin:0">🏗️ Chantier du village</div><div class="muted" style="font-size:12.5px">Niveau du village : <b>${tot}</b> / ${GVB.reduce((a,b)=>a+b.max,0)}</div></div><div class="gvtr">🏦 <b>${fmt(d.tr)}</b><small>trésor</small></div></div>
   <div class="bar gvbar"><i style="width:${Math.min(100,d.tr/next*100).toFixed(1)}%"></i></div><p class="muted" style="font-size:12px;margin:4px 0 0">${can?'Tu peux lancer les travaux.':'Seuls le chef et les sous-chefs lancent les travaux, mais tout le monde peut donner.'} Les bots de la guilde donnent un peu chaque jour.</p></div>`;
  const don=`<div class="card"><div class="h3" style="margin:0">🤝 Faire un don au trésor</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">${left} don${left>1?'s':''} restant${left>1?'s':''} aujourd'hui · chaque don ajoute aussi +4 au coffre de guilde.</p><div class="gvdon">${GVD.map(x=>{const c=x.cost(),cur=x.cur==='gold'?GOLD:x.cur==='gems'?GEM:COIN;return`<button class="gvd" data-a="gvdon" data-v="${x.k}" ${left>0&&(S[x.cur]||0)>=c?'':'disabled'}><span>${x.ic}</span><b>+${x.v}</b><small>${cur}${fmt(c)}</small></button>`}).join('')}</div></div>`;
  const cards=GVB.map(b=>{const l=d.lv[b.k]||0,mx=l>=b.max,c=GV_COST[l+1];return`<div class="gvb ${mx?'max':''}"><div class="gvart"><svg viewBox="-80 -110 160 130">${l||b.k!=='forge'?b.art():gvRuins()}${gvDecoFor(b.k,l)}</svg></div><div class="gvinfo"><div class="row" style="justify-content:space-between;align-items:center;gap:6px"><b>${b.ic} ${b.n}</b>${gvPips(l,b.max)}</div>
    <div class="gvfx">${b.fx(l)}</div>${mx?'<div class="gvmax">✨ Niveau maximum</div>':`<div class="gvnx">Niveau ${l+1} : ${b.nx}</div><button class="btn sm ${d.tr>=c&&can?'p':''}" data-a="gvup" data-v="${b.k}" ${d.tr>=c&&can?'':'disabled'}>${l?'⬆️ Améliorer':'🔨 Construire'} · 🏦 ${fmt(c)}</button>`}</div></div>`}).join('');
  return`<div class="stack">${head}${don}<div class="card"><div class="h3" style="margin:0 0 8px">🏘️ Les bâtiments</div><div class="gvlist">${cards}</div></div></div>`}
function gvRuins(){return`<path d="M-40 0V-20L-30 -34V0ZM-20 0V-44H-6V0ZM10 0V-26L22 -30V0ZM30 0V-14H42V0Z" fill="#8a8098" stroke="#140c24" stroke-width="1.4"/><path d="M-50 0H50" stroke="#140c24" stroke-width="2"/><path d="M-12 -60L-12 -46M-16 -56H-8" stroke="#ffd84a" stroke-width="2"/><text x="0" y="-70" text-anchor="middle" font-size="14">🚧</text>`}
function gvSkyline(d){const lv=d.lv;let s=`<svg viewBox="0 0 400 120" preserveAspectRatio="xMidYMax slice"><defs><linearGradient id="gvs" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a6a"/><stop offset="1" stop-color="#ff9a6a"/></linearGradient></defs><rect width="400" height="120" fill="url(#gvs)"/><circle cx="330" cy="40" r="16" fill="#ffe9a0" opacity=".9"/><path d="M0 96Q100 80 200 92T400 88V120H0Z" fill="#4a3a5a"/>`;
  const pos=[['shop',70,.5],['chat',330,.5],['hall',260,.42],['forge',140,.45],['boss',200,.62]];
  for(const [k,x,sc] of pos){const l=lv[k]||0;const b=GVB.find(z=>z.k===k);s+=`<g transform="translate(${x} 112) scale(${sc})">${l||k!=='forge'?b.art():gvRuins()}${gvDecoFor(k,l)}</g>`}
  const tot=Object.values(lv).reduce((a,b)=>a+b,0);for(let i=0;i<Math.min(12,tot-4);i++)s+=`<circle cx="${20+i*32}" cy="${100-((i*37)%14)}" r="2" fill="#ffd84a"><animate attributeName="opacity" values="1;.3;1" dur="${1.4+i%3*.4}s" repeatCount="indefinite"/></circle>`;
  return s+`<path d="M0 112H400V120H0Z" fill="#2a2040"/></svg>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="gvup"],[data-a="gvdon"]');if(!t)return;e.preventDefault();e.stopPropagation();if(t.dataset.a==='gvup')gvUpgrade(t.dataset.v);else gvDonate(t.dataset.v)},true);
{const pg=pGuilde;pGuilde=function(){if(UI.lz&&UI.lz.guilde==='vil'&&myGuild()){gvApplyShop();return`<div class="stack">${zoneBar('guilde','vil')}${gvPage()}</div>`}try{gvApplyShop()}catch(e){}return pg.apply(this,arguments)}}
/* le village change d'apparence : chantier, forge construite, drapeaux, guirlandes */
function gvCrane(){return`<path d="M-26 0V-52M-26 -52H30M-26 -40L-14 -52M30 -52V-36" stroke="#e8b83a" stroke-width="3" fill="none"/><path d="M-26 -52L-26 0" stroke="#140c24" stroke-width="1"/><g><path d="M30 -36V-24" stroke="#5a3a1a"/><rect x="24" y="-24" width="12" height="9" fill="#a87a4a" stroke="#140c24"/><animateTransform attributeName="transform" type="translate" values="0 0;0 8;0 0" dur="3s" repeatCount="indefinite"/></g>
 <path d="M-40 0V-22H6V0Z" fill="none" stroke="#a87a4a" stroke-width="2"/><path d="M-40 -11H6M-28 0V-22M-16 0V-22M-4 0V-22" stroke="#a87a4a" stroke-width="1.4"/><path d="M-36 0L-30 -10L-24 0Z" fill="#ff8a1a" stroke="#140c24" stroke-width=".8"/>`}
{const pl=LOBS.guilde.places;LOBS.guilde.places=function(){const P=pl.apply(this,arguments);if(!gvGid())return P;for(const p of P){const l=gvLv(p.k);if(l>1&&!p._gv){const ob=p.b;p.b=()=>ob()+gvDecoFor(p.k,l);p._gv=1;p.n=p.n+' · Nv '+l}}
  if(!P.some(p=>p.k==='vil'))P.push({k:'vil',ic:'🏗️',n:'Chantier du village',sn:'Chantier',d:'Améliore les bâtiments de la guilde',b:gvCrane,x:120,y:178,s:.7,bw:70,bh:58,badge:()=>{try{const d=gvData();return d&&gvCanBuild()&&GVB.some(b=>(d.lv[b.k]||0)<b.max&&d.tr>=GV_COST[(d.lv[b.k]||0)+1])?'!':0}catch(e){return 0}}});
  const f=gvLv('forge');if(f&&!P.some(p=>p.k==='forgeg'))P.push({k:'forgeg',ic:'⚒️',n:'Forge de guilde · Nv '+f,sn:'Forge',d:`+${2*f} % ATQ et PV pour tes héros`,b:()=>GVB[4].art()+gvDecoFor('forge',f),x:282,y:176,s:.6,bw:70,bh:60});return P}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="lzg"][data-t="guilde"][data-v="forgeg"]');if(!t)return;e.preventDefault();e.stopPropagation();UI.lz=UI.lz||{};UI.lz.guilde='vil';render();window.scrollTo(0,0)},true);
