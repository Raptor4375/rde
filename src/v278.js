/* ================= guilde : réintégrer les joueurs exclus ================= */
function kickedCard(){if(!S.rgid||!NET.on)return'';const d=NET.guilds[S.rgid];if(!d)return'';const rk=ROLE_RANK[gRoleOf(d,NET.pid)]||0;const L=(Array.isArray(d.kicked)?d.kicked:[]).filter(Boolean);if(!L.length||rk<2)return'';
  return`<div class="card kickc"><div class="h3" style="margin:0">🚫 Joueurs exclus · ${L.length}</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Réintègre un joueur pour qu'il puisse de nouveau rejoindre la guilde. Il reçoit un message privé pour le prévenir.</p>
   <div class="list" style="gap:6px">${L.map(pid=>{const p=NET.players[pid];const n=(p&&p.n)||nameOfKey(pid,S.rgid)||'Joueur';return`<div class="row" style="justify-content:space-between;align-items:center;gap:8px"><span style="min-width:0"><b>${esc(n)}</b> <i class="rtag">JOUEUR</i></span><button class="btn sm g" data-a="unkick" data-v="${esc(pid)}">↩️ Réintégrer</button></div>`}).join('')}</div></div>`}
async function unkick(pid){const gid=S.rgid;if(!gid)return;try{await realGuildUpdate(d=>({kicked:(Array.isArray(d.kicked)?d.kicked:[]).filter(x=>x!==pid)}));const n=(NET.players[pid]&&NET.players[pid].n)||'Un joueur';
  await postMsg(`${n} a été réintégré : il peut de nouveau rejoindre la guilde.`,true,gid);try{await NET.db.collection('dms').add({to:pid,from:NET.pid,n:S.name||'Voyageur',x:`Bonne nouvelle ! Tu peux de nouveau rejoindre la guilde ${(NET.guilds[gid]||{}).n||''} 😊 Va dans l'onglet Guilde pour revenir.`,t:Date.now()})}catch(e){}
  toast(`↩️ ${n} est réintégré.`);onNet();render()}catch(e){toast("La réintégration n'a pas marché.")}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="unkick"]');if(!t)return;e.preventDefault();e.stopPropagation();unkick(t.dataset.v)},true);
{const pg=pGuilde;pGuilde=function(){const h=pg.apply(this,arguments);try{const z=UI.lz&&UI.lz.guilde;if(S.rgid&&(!z||z==='hall')){const c=kickedCard();if(c){const i=h.lastIndexOf('</div>');if(i>0)return h.slice(0,i)+c+h.slice(i)}}}catch(e){}return h}}
/* correctif : en revenant sur Social, le tchat monde ne s'incruste plus dans la Grand-Place */
{const ps=pSocial;pSocial=function(){if(!inZone('top'))return lobbyPage('top');return ps.apply(this,arguments)}}
/* aller au tchat monde = ouvrir la zone tchat (et plus l'injecter dans le hall) */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="gochat"]');if(!t)return;e.preventDefault();e.stopPropagation();closeModal();TAB='top';UI.lz=UI.lz||{};UI.lz.top='monde';UI.soc='monde';UI.chat='monde';try{LZ.prev.top='monde'}catch(er){}render();window.scrollTo(0,0)},true);
/* tchats : bouton « ⬇ récents » quand on a remonté dans l'historique */
function chatJumpUpd(c){if(!c||!c.parentElement)return;let b=c.parentElement.querySelector(':scope>.cjump');const far=c.scrollHeight-c.scrollTop-c.clientHeight>160;
  if(far&&!b){b=document.createElement('button');b.className='cjump';b.type='button';b.textContent='⬇ Messages récents';b.onclick=ev=>{ev.preventDefault();ev.stopPropagation();c.scrollTo({top:c.scrollHeight,behavior:'smooth'})};const ps=getComputedStyle(c.parentElement).position;if(ps==='static')c.parentElement.style.position='relative';c.parentElement.appendChild(b)}
  else if(!far&&b)b.remove()}
document.addEventListener('scroll',e=>{const c=e.target;if(c&&c.id&&['chat','wchat','dmth'].includes(c.id))chatJumpUpd(c)},true);
