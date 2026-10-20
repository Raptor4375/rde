
/* ================= V26.2 : tchats réunis, clavier qui ne revient plus tout seul, ultra des bots indépendantes ================= */
/* ---- clavier : on ne redonne le focus que si le joueur tapait il y a moins de 4 s ---- */
var LASTTYPE=0;
document.addEventListener('input',e=>{const t=e.target;if(t&&/^(INPUT|TEXTAREA)$/.test(t.tagName))LASTTYPE=Date.now()},true);
document.addEventListener('focusout',e=>{const t=e.target;if(t&&/^(INPUT|TEXTAREA)$/.test(t.tagName))LASTTYPE=0},true);
function recentType(){return Date.now()-(LASTTYPE||0)<4000}
function chatBusy(){const a=document.activeElement;if(a&&/^(INPUT|TEXTAREA)$/.test(a.tagName))return true;return TAB==='top'&&UI.lz&&(UI.lz.top==='mp'||UI.lz.top==='monde')}
/* ---- portraits : chaque joueur/bot a SES ultra-évolutions ---- */
const UROW=new Map();
function uOfRow(p,id){if(!p)return 0;if(p.me){const o=S.heroes[id];return o?Math.min(3,o.u||0):0}
  if(p.real){const t=(p.teamL||[]).find(x=>x&&x.id===id);return t&&t.u?Math.min(3,t.u):0}
  const k=(p.id||p.n)+'|'+(p.pw||0);let tm=UROW.get(k);if(!tm){try{tm=teamOfRow(p)}catch(e){tm=[]}if(UROW.size>800)UROW.clear();UROW.set(k,tm)}const t=tm.find(x=>x.id===id);return t&&t.u?Math.min(3,t.u):0}
function portraitAt(h,u){if(!h)return portrait(h);if(u>0&&h.r===4)return uImg(h,Math.min(3,u));const k='B'+h.i;return PIMG[k]||(PIMG[k]=svgToImg(P0(h)))}
function portraitFor(p,h,t){if(!h)return portrait(h);const u=t&&t.u!=null?t.u:uOfRow(p,h.i);return portraitAt(h,u)}
function rowOfBid(bid){bid=String(bid||'');const i=bid.indexOf(':');const b=i>0?bid.slice(i+1):bid;return[...botRows(),...freeRows()].find(r=>r.bid===b)||null}
/* les bots débloquent leurs ultra-évolutions eux-mêmes, selon leur puissance, sur n'importe quel légendaire */
function npcTeam(p){
  const R=rng(roseH(String(p.id||p.n))%100000+3),pw=p.pw||1000;
  const lg=Math.log(Math.max(1,pw/18000))/Math.log(2.3);
  const evs=(p.team||[]).map(id=>HEROES[id]&&HEROES[id].r===4?clamp(Math.floor(lg+R()),0,3):0);
  /* ultra-évolutions rares : un petit budget selon la puissance (0 pour la plupart, 1 à 3 pour les plus forts) */
  let bud=pw<70000?0:clamp(Math.floor(Math.log(pw/70000)/Math.log(1.9)+R()*.8),0,3);const R2=R();if(pw>=70000&&bud===0&&R2<.25)bud=1;
  const us=(p.team||[]).map(()=>0);(p.team||[]).forEach((id,j)=>{if(bud>0&&HEROES[id]&&HEROES[id].r===4&&evs[j]>=2){us[j]=1;evs[j]=3;bud--}});
  if(pw>260000)(p.team||[]).forEach((id,j)=>{if(us[j]===1&&bud>0){us[j]=2;bud--}});
  let lo=1,hi=100;
  for(let k=0;k<20;k++){const mid=(lo+hi)/2;const tot=(p.team||[]).reduce((a,id,j)=>a+basePow(HEROES[id],mid,evs[j])*(1+.35*us[j])*1.15,0);if(tot<pw)lo=mid;else hi=mid}
  return(p.team||[]).map((id,j)=>({id,l:clamp(Math.round(lo+(R()*6-3)),1,100),e:evs[j],u:us[j]}))}
/* ---- messages privés : rafraîchissement léger ---- */
{const dr=dmRefresh;let rq=0;dmRefresh=function(){if(rq)return;rq=requestAnimationFrame(()=>{rq=0;try{const th=$('#dmth');if(th&&UI.dmk&&!B&&!$('#ovl').innerHTML){const c=DMS()[UI.dmk];if(c)c.u=0;const near=th.scrollHeight-th.scrollTop-th.clientHeight<120;th.innerHTML=dmThreadHTML(UI.dmk);if(near)th.scrollTop=th.scrollHeight;chubRefresh();renderTabs();return}
    if(TAB==='top'&&$('.chub')){chubRefresh();renderTabs();return}dr()}catch(e){try{dr()}catch(_){}}})}}
/* ---- tchats réunis : Monde, Guilde, Messages privés côte à côte ---- */
UI.chat=UI.chat||'monde';
function chubTabs(){const D=DMS(),ks=Object.keys(D).sort((a,b)=>(D[b].lt||0)-(D[a].lt||0)).slice(0,12),cur=UI.chat;
  const gU=S.rgid&&NET.on?rUnread():(S.unread||0),dU=Object.values(D).reduce((a,c)=>a+(c.u||0),0);
  const b=(k,ic,lab,n,extra='')=>`<button class="chb ${cur===k?'on':''}" data-a="chub" data-v="${esc(k)}" role="tab" aria-selected="${cur===k}">${ic}<span>${lab}</span>${n?`<i class="pdot">${n>99?'99+':n}</i>`:''}${extra}</button>`;
  let h=b('monde','🌍','Monde',0)+b('guilde','🛡️','Guilde',gU)+b('mp','🕊️','Privés',dU)+'<span class="chsep"></span>';
  for(const k of ks){const c=D[k],p=dmWho(k);h+=`<button class="chb dm ${cur===k?'on':''}" data-a="chub" data-v="${esc(k)}" role="tab" aria-selected="${cur===k}"><span class="chav fav frm-${p?frameOf(p):'none'}">${avatarOf(p)}</span><span>${esc((p?p.n:c.n)||'?')}</span>${c.u?`<i class="pdot">${c.u}</i>`:''}</button>`}
  return h+`<button class="chb new" data-a="dmnew" aria-label="Nouveau message">✉️ +</button>`}
function chubGuild(){if(S.rgid&&NET.on){const g=myGuild();return`<div class="card chatcard"><div class="row" style="justify-content:space-between"><div class="h3" style="margin:0">🛡️ ${esc(g?g.n:'Ma guilde')}</div><span class="muted" style="font-size:12px">@pseudo pour mentionner</span></div>${chatBox('chat',NET.msgs,'say','Écris à ta guilde…')}</div>`}
  if(S.gid)return`<div class="card"><div class="h3" style="margin:0">🛡️ Ma guilde</div><p class="muted">Le tchat de cette guilde se trouve sur sa page.</p><button class="btn p" data-a="tab" data-v="guilde">Aller à ma guilde</button></div>`;
  return`<div class="card"><div class="h3" style="margin:0">🛡️ Pas encore de guilde</div><p class="muted">Rejoins une guilde pour discuter avec elle ici.</p><button class="btn p" data-a="tab" data-v="guilde">Trouver une guilde</button></div>`}
function pChatHub(){let cur=UI.chat||'monde';const D=DMS();if(!['monde','guilde','mp'].includes(cur)&&!D[cur])cur=UI.chat='monde';
  let body;if(cur==='monde'){UI.dmk=null;body=pWorld()}else if(cur==='guilde'){UI.dmk=null;body=chubGuild();S.rgSeen=Date.now();S.unread=0}else if(cur==='mp'){UI.dmk=null;body=pMP()}else{UI.dmk=cur;body=pMP()}
  return`<div class="chubw"><div class="chub" role="tablist" aria-label="Tchats">${chubTabs()}</div><div class="chbody">${body}</div></div>`}
function chubRefresh(){const el=$('.chub');if(el){const x=el.scrollLeft;el.innerHTML=chubTabs();el.scrollLeft=x}}
{const ps=pSocial;pSocial=function(){const z=UI.lz&&UI.lz.top;if(z==='mp')return`<div class="stack">${zoneBar('top','mp')}${pChatHub()}</div>`;
  if(z==='monde')return`<div class="stack">${zoneBar('top','monde')}${pChatHub()}</div>`;
  const h=ps.apply(this,arguments);return h}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="lzg"][data-t="top"]');if(!t)return;if(t.dataset.v==='monde')UI.chat='monde';else if(t.dataset.v==='mp'&&(UI.chat==='monde'||UI.chat==='guilde'))UI.chat='mp'},true);
function chubGo(k){UI.chat=k;if(k!=='monde'&&k!=='guilde'&&k!=='mp')UI.dmk=k;else UI.dmk=null;const y=window.scrollY;render();window.scrollTo(0,y);const th=$('#dmth');if(th)th.scrollTop=th.scrollHeight;const c=$('#chat');if(c)c.scrollTop=c.scrollHeight;const w=$('#wchat');if(w)w.scrollTop=w.scrollHeight;
  const on=$('.chub .chb.on');if(on)try{on.scrollIntoView({inline:'center',block:'nearest'})}catch(e){}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="chub"]');if(!t)return;e.preventDefault();e.stopPropagation();chubGo(t.dataset.v)},true);
/* ouvrir une conversation = l'onglet de la conversation, sans faire monter le clavier */
{const dop=dmOpen;dmOpen=function(key){UI.chat=key;dop.apply(this,arguments);try{const a=document.activeElement;if(a&&a.id==='dmsay')a.blur()}catch(e){}setTimeout(()=>{const a=document.activeElement;if(a&&a.id==='dmsay'&&!recentType())a.blur()},120)}}
/* retour depuis une conversation = liste des messages privés */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="dmback"]');if(t)UI.chat='mp'},true);
/* « tchat monde » depuis la guilde */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="gochat"]');if(t)UI.chat='monde'},true);
PATCH.unshift({v:26.2,d:'18 octobre 2026',t:'Tchats réunis et héros sublimés',items:[
 "💬 <b>Tous les tchats au même endroit</b> : Monde, Guilde, Messages privés et tes conversations récentes sont maintenant des onglets côte à côte (Fontaine ou Pigeonnier de la Grand-Place). Plus besoin de changer de page.",
 "⌨️ Messages privés : fini le clavier qui se rouvre tout seul quand tu le fermes, et rafraîchissement bien plus léger (moins de lag).",
 "✨ Les bots ont maintenant <b>leurs propres ultra-évolutions</b>, sur n'importe quel légendaire, selon leur puissance. Ils n'attendent plus les tiennes, et tes ultra-évolutions n'apparaissent plus chez eux.",
 "🎨 <b>Gros step up des héros</b> : bordures brodées, coutures, emblème de classe sur la poitrine, col et fermoirs, brassards gravés, genouillères, sangles et boucles de bottes, sacoches et breloques de ceinture, runes sur les lames, cercle magique au sol et particules selon la classe (braises, étincelles, feuilles, fumée).",
 "🛠️ Corrections diverses."]});
