
/* ================= LA FORGE D'ÉTHER : que faire des éclats légendaires quand tout est ★★★ =================
   Nouveau PNJ : Astrid Feu-d'Étoile, l'apprentie de Brann, qui forge l'éther.
   1) Échanges : éclats légendaires → éclats d'ultra, tickets d'invocation, coffre céleste, fragments d'un légendaire (pour l'Éveil ◆).
   2) Étoiles d'Éther ✦ (1 à 5) : au-delà de ★★★, payées en éclats légendaires, +5 % de PV/ATQ/DÉF chacune, aura à 5 étoiles. */
(function(){try{
const ES_MAX=5,ES_COST=[10,15,20,25,30],ES_PCT=.05,FR_RATE=2;
window.ES_MAX=ES_MAX;
const esOf=id=>Math.min(ES_MAX,(S.heroes[id]&&S.heroes[id].es)||0);
window.esOf=esOf;
const sh=()=>S.shards||0;
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG&&LANG!=='fr')?en:fr;
const SH=typeof SHARD!=='undefined'?SHARD:'✦';
const UICON=typeof USH!=='undefined'?USH:'🌟';

/* ---------- la PNJ : Astrid Feu-d'Étoile ---------- */
NPC.ether={n:"Astrid Feu-d'Étoile",t:"Forgeronne d'Éther",c:'#b48aff',lines:[
 "Mon maître Brann tape fort. Moi, je tape juste : l'éther n'aime pas les brutes.",
 "Un éclat légendaire, c'est un bout d'étoile tombé. Je lui apprends juste à briller pour toi.",
 "Des éclats qui dorment au fond de ton sac ? Donne, donne ! Ici, rien ne se perd.",
 "Cinq étoiles d'éther sur un même héros… je n'en ai vu qu'une fois. C'était beau à pleurer.",
 "Attention, ça chauffe ! Enfin… ça brille. L'éther ne chauffe pas, il chante.",
 "Brann trouve mes lunettes ridicules. Brann n'a plus de sourcils depuis mardi.",
 "Chaque étoile que je sertis garde un peu de la lumière du Cœur d'Éther."]};
function astridSVG(){const O='#140c24',S0='stroke="#140c24" stroke-width="1.6" stroke-linejoin="round"';const skin='#f2c39a',skin2='#d8a07a',HA='#b98cff',HB='#8a5ad8',HT='#ff9ad8',TU='#3a2a7a',GL='#c88a3a';
 const spark=(x,y,r,d)=>`<path d="M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y}L${x+r*.3} ${y+r*.3}L${x} ${y+r}L${x-r*.3} ${y+r*.3}L${x-r} ${y}L${x-r*.3} ${y-r*.3}Z" fill="#fff6c8"><animate attributeName="opacity" values="0;1;0" dur="${d}s" repeatCount="indefinite"/></path>`;
 let s=`<defs><linearGradient id="astX" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#e8fbff"/><stop offset=".45" stop-color="#9af0ff"/><stop offset="1" stop-color="#9a6aff"/></linearGradient><radialGradient id="astG" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c8" stop-opacity=".9"/><stop offset=".45" stop-color="#ffd84a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient><radialGradient id="astV" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#e8fbff" stop-opacity=".9"/><stop offset=".45" stop-color="#9a8aff" stop-opacity=".35"/><stop offset="1" stop-color="#9a6aff" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="60" cy="174" rx="36" ry="5" fill="#000" opacity=".25"/>
  <path d="M46 172V142H56V172ZM64 172V142H74V172Z" fill="#2a2440" ${S0}/><path d="M41 174Q41 164 51 164H57V174ZM63 174V164H71Q81 164 81 174Z" fill="#5a3a22" ${S0}/><path d="M45 167H55M65 167H75" stroke="#ffd84a" stroke-width="1.6"/>
  <path d="M33 150Q31 106 44 94Q60 86 76 94Q89 106 87 150Z" fill="${TU}" ${S0}/>${[[40,140],[80,134],[44,108]].map(([x,y])=>`<path d="M${x} ${y-2.4}l.8 1.6l1.8 .3l-1.3 1.2l.3 1.8l-1.6 -.9l-1.6 .9l.3 -1.8l-1.3 -1.2l1.8 -.3z" fill="#ffe9a0" opacity=".85"/>`).join('')}
  <path d="M42 154Q40 112 48 100H72Q80 112 78 154Q60 160 42 154Z" fill="#8a5a32" ${S0}/><path d="M48 100L52 88M72 100L68 88" stroke="#5a3a1a" stroke-width="3"/><path d="M43 150Q60 156 77 150" stroke="#ffd84a" stroke-width="1.6" fill="none"/>
  <path d="M60 106L64 115L73 117L64 120L60 129L56 120L47 117L56 115Z" fill="#ffd84a" ${S0}/><circle cx="60" cy="117" r="2.4" fill="#9af0ff" stroke="${O}" stroke-width=".8"/>
  <path d="M35 134H85" stroke="#3a2418" stroke-width="5"/><rect x="56" y="131" width="8" height="6" rx="1.5" fill="#ffd84a" ${S0}/><path d="M66 138H74V148H66Z" fill="#6a4426" ${S0}/><path d="M68 138V132M72 138V134" stroke="#c8c8d8" stroke-width="1.6" stroke-linecap="round"/>
  <path d="M40 100Q26 106 22 118" stroke="${TU}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M40 100Q26 106 22 118" stroke="${O}" stroke-width="1" fill="none" opacity=".35"/><path d="M24 112Q21 118 21 122" stroke="${skin}" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="21" cy="124" r="6" fill="${GL}" ${S0}/><path d="M16 122Q21 119 26 122" stroke="#8a5a1a" stroke-width="1" fill="none"/>
  <g><circle cx="21" cy="98" r="15" fill="url(#astG)"><animate attributeName="r" values="12;17;12" dur="2.2s" repeatCount="indefinite"/></circle><path d="M21 86L28 96L21 112L14 96Z" fill="#ffd84a" ${S0}/><path d="M21 86L28 96H14Z" fill="#fff3b0"/><path d="M21 96V112" stroke="#c8901a" stroke-width=".8"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.2s" repeatCount="indefinite"/></g>
  <g><path d="M80 100Q96 108 98 122" stroke="${TU}" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M80 100Q96 108 98 122" stroke="${O}" stroke-width="1" fill="none" opacity=".35"/>
   <path d="M98 126L110 70" stroke="#6a4a2a" stroke-width="4.6" stroke-linecap="round"/><path d="M99.4 119L103.6 99" stroke="#ffd84a" stroke-width="1.2"/><circle cx="110" cy="62" r="17" fill="url(#astV)"><animate attributeName="opacity" values=".55;1;.55" dur="1.8s" repeatCount="indefinite"/></circle>
   <path d="M99 60L104 52L118 55L122 64L117 72L103 69Z" fill="url(#astX)" ${S0}/><path d="M104 52L110 62L103 69M110 62L122 64M110 62L118 55" stroke="#fff" stroke-width=".9" fill="none" opacity=".75"/><path d="M108 70L112 70L111 74L109 74Z" fill="#ffd84a" ${S0}/>
   <circle cx="98" cy="124" r="6" fill="${GL}" ${S0}/><path d="M93 122Q98 119 103 122" stroke="#8a5a1a" stroke-width="1" fill="none"/>
   <animateTransform attributeName="transform" type="rotate" values="0 98 124;-5 98 124;0 98 124" dur="2.8s" repeatCount="indefinite"/></g>
  <circle cx="60" cy="34" r="11" fill="${HA}" ${S0}/><path d="M52 30Q60 25 68 30" stroke="${HB}" stroke-width="1.4" fill="none"/><path d="M66 22L76 18" stroke="#c8901a" stroke-width="2.4" stroke-linecap="round"/><circle cx="77" cy="17.6" r="2" fill="#9af0ff" stroke="${O}" stroke-width=".8"/>
  <ellipse cx="60" cy="64" rx="21" ry="21" fill="${skin}" ${S0}/>
  <path d="M38.6 60Q35 74 39 86Q41 76 43 70Z" fill="${HA}" ${S0}/><path d="M81.4 60Q85 74 81 86Q79 76 77 70Z" fill="${HA}" ${S0}/><path d="M39 86Q40 81 42 78L41.4 83Z" fill="${HT}"/><path d="M81 86Q80 81 78 78L78.6 83Z" fill="${HT}"/>
  <path d="M38 62Q35 40 60 38Q85 40 82 62Q78 52 70 51Q66 46 61 52Q53 47 46 52Q41 54 38 62Z" fill="${HA}" ${S0}/><path d="M46 44Q52 40 58 42M64 42Q71 41 76 46" stroke="${HB}" stroke-width="1.2" fill="none"/><path d="M61 52Q63 48 66 47" stroke="${HT}" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M39 50Q60 41 81 50" stroke="#3a3a4a" stroke-width="4" fill="none"/><circle cx="50" cy="46.4" r="5.4" fill="#5a3a9a" ${S0}/><circle cx="70" cy="46.4" r="5.4" fill="#5a3a9a" ${S0}/><circle cx="50" cy="46.4" r="3.4" fill="#c07aff"/><circle cx="70" cy="46.4" r="3.4" fill="#c07aff"/><path d="M48 44.4l2 -1M68 44.4l2 -1" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/>
  ${npcEyes(52,68,64,'#4a2a8a')}<path d="M47 58q4 -3 8 -.6M65 57.4q4 -2.4 8 .6" stroke="#8a7ab8" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M53 71Q60 79 67 71Q60 74 53 71Z" fill="#c83a5a" ${S0}/><path d="M55 72Q60 74 65 72" stroke="#fff" stroke-width="1.2" fill="none"/>
  <ellipse cx="46" cy="70" rx="4" ry="2.6" fill="#ff8aa0" opacity=".55"/><ellipse cx="74" cy="70" rx="4" ry="2.6" fill="#ff8aa0" opacity=".55"/><ellipse cx="73" cy="75" rx="4" ry="2" fill="#5a5a6a" opacity=".3"/>${[[44,67],[46,66],[48,67.4],[72,66],[74,67],[76,66]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".6" fill="#c88a6a"/>`).join('')}
  <path d="M58 66Q60 68 62 66" stroke="${skin2}" stroke-width="1.1" fill="none"/><circle cx="39.4" cy="68" r="1.8" fill="none" stroke="#ffd84a" stroke-width="1.2"/>
  ${spark(8,82,3,1.6)}${spark(34,92,2.2,2.1)}${spark(122,46,2.6,1.9)}${spark(92,44,2,2.4)}`;
 return`<svg viewBox="0 0 130 180" class="npcsvg" aria-hidden="true"><g class="npcbr">${s}</g></svg>`}
window.astridSVG=astridSVG;
{const ns=npcSVG;npcSVG=function(k){if(k==='ether')return astridSVG();return ns.apply(this,arguments)}}

/* ---------- le bâtiment : la Forge d'Éther, dôme violet et grand éclat qui flotte ---------- */
LB.etherforge=()=>{const o=LBO;let s='';
  s+=`<circle cx="0" cy="-104" r="22" fill="#ffd84a" opacity=".22"><animate attributeName="r" values="18;25;18" dur="2.6s" repeatCount="indefinite"/></circle>`;
  s+=`<rect x="-30" y="-40" width="60" height="40" fill="#8a84aa" stroke="${o}" stroke-width="1.6"/>${[[-30,-28,-14],[-14,-28,2],[2,-28,18],[18,-28,30],[-30,-14,-20],[-6,-14,10],[22,-14,30]].map(([a,y,b])=>`<path d="M${a} ${y}H${b}" stroke="#6a6488" stroke-width="1"/>`).join('')}`;
  s+=`<path d="M-35 -40Q-35 -76 0 -78Q35 -76 35 -40Z" fill="#5a3a9a" stroke="${o}" stroke-width="1.6"/><path d="M-18 -42Q-18 -70 0 -76M18 -42Q18 -70 0 -76M0 -42V-77" stroke="#ffd84a" stroke-width="1.4" fill="none" opacity=".9"/><path d="M-35 -40H35" stroke="#ffd84a" stroke-width="2"/>`;
  s+=`<path d="M-3 -77L0 -86L3 -77Z" fill="#ffd84a" stroke="${o}" stroke-width="1"/>`;
  s+=`<path d="M-9 0V-16Q-9 -25 0 -25Q9 -25 9 -16V0Z" fill="#2a1a4a" stroke="${o}" stroke-width="1.4"/><path d="M-6 0V-15Q-6 -21 0 -21Q6 -21 6 -15V0Z" fill="#c07aff" opacity=".55"><animate attributeName="opacity" values=".35;.75;.35" dur="2s" repeatCount="indefinite"/></path>`;
  s+=[-20,20].map(x=>`<circle cx="${x}" cy="-27" r="5.4" fill="#9af0ff" stroke="${o}" stroke-width="1.3"/><path d="M${x-5.4} -27H${x+5.4}M${x} -32.4V-21.6" stroke="${o}" stroke-width=".8"/>`).join('');
  s+=`<g><path d="M0 -122L10 -106L0 -86L-10 -106Z" fill="#ffd84a" stroke="${o}" stroke-width="1.4"/><path d="M0 -122L10 -106H-10Z" fill="#fff3b0"/><path d="M0 -106V-86" stroke="#c8901a" stroke-width="1"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="2.6s" repeatCount="indefinite"/></g>`;
  s+=`<g transform="translate(-44 0)"><path d="M-10 0L10 0L8 -6L4 -6L4 -10L12 -12L12 -16L-14 -16L-10 -10L-4 -10L-4 -6L-8 -6Z" fill="#4a4a5a" stroke="${o}" stroke-width="1.2"/><path d="M-4 -16L-1 -24L3 -21L5 -16Z" fill="#9af0ff" stroke="${o}" stroke-width="1"/><circle cx="0" cy="-20" r="8" fill="#9af0ff" opacity=".25"><animate attributeName="opacity" values=".1;.4;.1" dur="1.6s" repeatCount="indefinite"/></circle></g>`;
  s+=`<g transform="translate(40 0)"><path d="M-6 0L-4 -12L0 -16L3 -11L2 0Z" fill="#c07aff" stroke="${o}" stroke-width="1"/><path d="M1 0L4 -9L8 -12L10 -5L8 0Z" fill="#9af0ff" stroke="${o}" stroke-width="1"/><path d="M-9 0L-9 -6L-6 -8L-5 0Z" fill="#ffd84a" stroke="${o}" stroke-width="1"/></g>`;
  return s};

/* ---------- la place dans le Quartier des artisans ---------- */
function esReady(){try{return Object.keys(S.heroes).filter(i=>{const h=HEROES[i],o=S.heroes[i];if(!h||h.r<4||!o||o.e<3)return false;const e=esOf(+i);return e<ES_MAX&&sh()>=ES_COST[e]}).length}catch(e){return 0}}
{const lp=LOBS.equip.places;LOBS.equip.places=function(){const L=lp.apply(this,arguments);try{if(L.some(p=>p.k==='eth'))return L;
  const pos={inv:[52,.9],mk:[150,.84],nm:[348,.86]};for(const p of L)if(pos[p.k]){p.x=pos[p.k][0];p.s=pos[p.k][1]}
  L.splice(2,0,{k:'eth',ic:'✦',n:"Forge d'Éther",sn:'Éther',d:'Éclats légendaires : échanges et étoiles d\'éther',b:LB.etherforge,x:250,y:206,s:.84,bw:84,bh:146,badge:()=>esReady()||0})}catch(e){}return L}}

/* ---------- les échanges ---------- */
const EX=[
 {k:'ush',ic:()=>UICON,n:"2 éclats d'ultra-évolution",en:'2 ultra-evolution shards',d:'Pour les Ultra I, II et III.',c:1,steps:[1,10],give:n=>{S.ush=(S.ush||0)+2*n}},
 {k:'tk',ic:()=>(typeof SIC!=='undefined'&&SIC.ticket)||'🎟️',n:"Ticket d'invocation",en:'Summon ticket',d:'Une invocation gratuite.',c:5,steps:[1,5],give:n=>{INV().pt+=n}},
 {k:'ch',ic:()=>(typeof SIC!=='undefined'&&SIC.chest4)||'🎁',n:'Coffre céleste',en:'Celestial chest',d:'Un objet céleste au hasard.',c:15,steps:[1],give:n=>{for(let i=0;i<n;i++)dropItem(4)}}];
function frHeroes(){return Object.keys(S.heroes).map(Number).filter(i=>{const h=HEROES[i],o=S.heroes[i];return h&&h.r>=4&&o&&o.e>=3&&(o.aw||0)<(typeof AW_MAX!=='undefined'?AW_MAX:10)}).sort((a,b)=>(S.heroes[b].aw||0)-(S.heroes[a].aw||0)||HEROES[a].n.localeCompare(HEROES[b].n))}
function ethBuy(k,n){const x=EX.find(e=>e.k===k);if(!x)return;n=Math.max(1,n|0);const c=x.c*n;if(sh()<c)return toast(T("Pas assez d'éclats légendaires.",'Not enough legendary shards.'));
  S.shards-=c;x.give(n);save();try{UIS.evolve()}catch(e){}toast(T(`✦ Échange réussi : ${n>1?n+' × ':''}${x.n}`,`✦ Exchange done: ${n>1?n+' × ':''}${x.en}`));ethFx();render();renderTop()}
function ethFrag(id,n){const h=HEROES[id],o=S.heroes[id];if(!h||!o||h.r<4||o.e<3)return;n=Math.max(1,n|0);const c=FR_RATE*n;if(sh()<c)return toast(T("Pas assez d'éclats légendaires.",'Not enough legendary shards.'));
  S.shards-=c;o.f=(o.f||0)+n;save();try{UIS.evolve()}catch(e){}toast(T(`◆ +${n} fragment${n>1?'s':''} de ${h.n.split(' ')[0]} (pour l'Éveil)`,`◆ +${n} ${h.n.split(' ')[0]} fragment${n>1?'s':''} (for Awakening)`));ethFx();render();renderTop()}
/* ---------- les étoiles d'éther ---------- */
{const hs=heroStats;heroStats=function(id){const st=hs.apply(this,arguments);try{const e=esOf(id);if(e&&st){const m=1+ES_PCT*e;st.hp=Math.round(st.hp*m);st.atk=Math.round(st.atk*m);st.def=Math.round(st.def*m)}}catch(e){}return st}}
function esSet(id,from){const h=HEROES[id],o=S.heroes[id];if(!h||!o||h.r<4)return;if(o.e<3)return toast(T("Les étoiles d'éther se sertissent sur un légendaire ★★★.",'Ether stars can only be set on a ★★★ legendary.'));const e=esOf(id);if(e>=ES_MAX)return toast(T("Ce héros a déjà ses 5 étoiles d'éther.",'This hero already has all 5 ether stars.'));
  const c=ES_COST[e];if(sh()<c)return toast(T(`Il faut ${c} éclats légendaires.`,`You need ${c} legendary shards.`));S.shards-=c;o.es=e+1;try{TPX.t=0}catch(_){}save();
  try{news(Date.now(),`${S.name||'Voyageur'} a serti une étoile d'éther sur ${h.n} (${o.es}/${ES_MAX}) !`)}catch(_){}try{UIS.evolve()}catch(_){}
  toast(T(`✦ ${h.n} reçoit sa ${o.es===1?'1re':o.es+'e'} étoile d'éther (+${Math.round(ES_PCT*o.es*100)} % de stats)`,`✦ ${h.n} gains ether star ${o.es}/${ES_MAX} (+${Math.round(ES_PCT*o.es*100)}% stats)`));render();renderTop();if(from==='m')heroModal(id);esRev(id)}
function esStars(e,cls='esst'){return`<span class="${cls}">${[...Array(ES_MAX)].map((_,i)=>`<i class="${i<e?'on':''}">✦</i>`).join('')}</span>`}
function esRev(id){const h=HEROES[id],e=esOf(id);if(e<ES_MAX)return;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="urev esrev"><div class="big es5">${portrait(h)}<span class="holo"></span></div><div class="h">AURA D'ÉTHER !</div><div style="font-weight:900">${h.n}</div>${esStars(5)}<p class="muted" style="font-size:13px">Cinq étoiles d'éther : +${Math.round(ES_PCT*ES_MAX*100)} % de PV, ATQ et DÉF, et sa carte s'entoure de l'aura d'éther.</p><p style="font-size:13px;font-style:italic">« Je n'en avais vu qu'une seule… Et maintenant, deux. » — Astrid</p><button class="btn pro" data-a="close">Magnifique !</button></div>`)}
function ethFx(){try{const b=document.querySelector('.npccard .npcfig');if(b){b.classList.remove('hop');void b.offsetWidth;b.classList.add('hop')}}catch(e){}}

/* ---------- la page de la Forge d'Éther ---------- */
function ethPage(){if(!S.ethSeen){S.ethSeen=1;try{save()}catch(e){}}const L=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]&&HEROES[i].r>=4);
  const done=L.filter(i=>S.heroes[i].e>=3),todo=L.filter(i=>S.heroes[i].e<3);
  const miss=todo.reduce((t,i)=>{const o=S.heroes[i];let need=0;for(let e=o.e;e<3;e++)need+=5;return t+Math.max(0,need-(o.f||0))},0);
  let h=`<div class="card ethbal"><div class="ethbn">${SH}<b class="num">${fmt(sh())}</b><span>éclats légendaires</span></div><div class="muted" style="font-size:12.5px">Astrid transforme tes éclats légendaires en ce dont tu as besoin, et sertit des étoiles d'éther sur tes légendaires ★★★.</div>
   ${todo.length?`<div class="ethwarn">⚠️ ${todo.length} légendaire${todo.length>1?'s':''} pas encore ★★★ : il te manque environ <b>${miss}</b> fragment${miss>1?'s':''} (les éclats comptent comme des fragments). Garde des éclats pour eux si tu veux !</div>`:''}</div>`;
  /* étoiles d'éther */
  h+=`<div class="card"><div class="h3" style="margin:0 0 2px">✦ Étoiles d'éther</div><div class="muted" style="font-size:12.5px;margin-bottom:8px">Au-delà de ★★★ : chaque étoile donne <b>+${ES_PCT*100} % de PV, ATQ et DÉF</b>. À 5 étoiles, la carte du héros s'entoure de l'aura d'éther.</div><div class="escost">${ES_COST.map((c,i)=>`<span>✦${i+1} · ${SH}${c}</span>`).join('')}</div>`;
  if(!done.length)h+=`<div class="muted" style="font-size:13px">Aucun légendaire ★★★ pour l'instant. Fais évoluer un légendaire au maximum pour lui sertir des étoiles.</div>`;
  else h+=`<div class="eslist">${done.sort((a,b)=>esOf(a)-esOf(b)||heroPw(b)-heroPw(a)).map(i=>{const hh=HEROES[i],e=esOf(i),c=e<ES_MAX?ES_COST[e]:0,can=e<ES_MAX&&sh()>=c;
    return`<div class="esrow ${e>=ES_MAX?'max':''}"><button class="espt ${e>=ES_MAX?'es5':''}" data-a="hero" data-v="${i}" style="${rv(hh.r)}">${portrait(hh)}</button><div class="esinfo"><b>${esc(hh.n)}</b>${esStars(e)}<small>${e?`+${Math.round(ES_PCT*e*100)} % de stats`:'Aucune étoile'}</small></div>
     <button class="btn sm ${can?'p':''}" data-a="esset" data-v="${i}" ${can?'':'disabled'}>${e>=ES_MAX?'Aura ✦':`${SH} ${c}${can?gainTag(()=>{S.heroes[i].es=e+1},()=>{S.heroes[i].es=e},i):''}`}</button></div>`}).join('')}</div>`;
  h+=`</div>`;
  /* échanges */
  h+=`<div class="card"><div class="h3" style="margin:0 0 2px">⚒️ Échanges</div><div class="muted" style="font-size:12.5px;margin-bottom:8px">Sans limite : échange seulement ce dont tu n'as plus besoin.</div><div class="ethx">${EX.map(x=>`<div class="ethi"><div class="ethic">${x.ic()}</div><div class="ethin"><b>${x.n}</b><small>${x.d}</small></div><div class="ethbt">${x.steps.map(n=>`<button class="btn sm ${sh()>=x.c*n?'p':''}" data-a="ethx" data-v="${x.k}" data-n="${n}" ${sh()>=x.c*n?'':'disabled'}>${n>1?'×'+n+' · ':''}${SH} ${x.c*n}</button>`).join('')}</div></div>`).join('')}`;
  const F=frHeroes();
  if(F.length){const sel=F.includes(UI.ethfr)?UI.ethfr:F[0];UI.ethfr=sel;const o=S.heroes[sel];
    h+=`<div class="ethi fr"><div class="ethic">◆</div><div class="ethin"><b>Fragments d'un légendaire</b><small>Pour son Éveil ◆ : ${FR_RATE} éclats = 1 fragment.</small>
      <select class="ethsel" data-a="ethfrsel" aria-label="Héros">${F.map(i=>`<option value="${i}" ${i===sel?'selected':''}>${esc(T(HEROES[i].n,(typeof tr==='function'?tr(HEROES[i].n):HEROES[i].n)))} · ${T('Éveil','Awakening')} ${S.heroes[i].aw||0}/${typeof AW_MAX!=='undefined'?AW_MAX:10} · ${S.heroes[i].f||0} frag.</option>`).join('')}</select></div>
      <div class="ethbt">${[1,5].map(n=>`<button class="btn sm ${sh()>=FR_RATE*n?'p':''}" data-a="ethfr" data-n="${n}" ${sh()>=FR_RATE*n?'':'disabled'}>+${n} · ${SH} ${FR_RATE*n}</button>`).join('')}</div></div>`}
  h+=`</div></div>`;
  return h}
window.ethPage=ethPage;
{const pe=pEquip;pEquip=function(){if(UI.lz&&(UI.lz.equip==='eth'||(UI.eqv==='eth'&&UI.lz.equip))){UI.eqv='eth';UI.lz.equip='eth';return`<div class="stack">${zoneBar('equip','eth')}${npcCard('ether')}${ethPage()}</div>`}
  const h=pe.apply(this,arguments);try{return h.replace('🌙 Nocturne</button>','🌙 Nocturne</button><button role="tab" aria-selected="false" data-a="eqv" data-v="eth">✦ Éther</button>')}catch(e){return h}}}

/* ---------- la fiche du héros : les étoiles d'éther sous l'Éveil ---------- */
function esHTML(id){const h=HEROES[id],o=S.heroes[id];if(!h||!o||h.r<4)return'';const e=esOf(id);
  if(o.e<3)return`<div class="esk lock"><div class="sn">✦ Étoiles d'éther</div><div class="muted" style="font-size:12.5px">Se débloquent à l'évolution ★★★. Astrid, à la Forge d'Éther, les sertit avec tes éclats légendaires.</div></div>`;
  const c=e<ES_MAX?ES_COST[e]:0,can=e<ES_MAX&&sh()>=c;
  return`<div class="esk ${e>=ES_MAX?'max':''}"><div class="row" style="justify-content:space-between;align-items:center"><div class="sn">✦ Étoiles d'éther ${e}/${ES_MAX}</div>${esStars(e)}</div>
   <div style="font-size:13px;margin:4px 0 8px">Chaque étoile coûte des <b>éclats légendaires</b> et donne <b>+${ES_PCT*100} % de PV, ATQ et DÉF</b>. Bonus actuel : <b>+${Math.round(e*ES_PCT*100)} %</b>.${e>=ES_MAX?' Aura d\'éther active !':''}</div>
   <div class="row" style="gap:6px;flex-wrap:wrap">${e>=ES_MAX?'<button class="btn" disabled>Aura d\'éther ✦</button>':`<button class="btn p" data-a="esset" data-v="${id}" data-m="1" ${can?'':'disabled'}>✦ Sertir une étoile (${sh()}/${c})${can?gainTag(()=>{o.es=e+1},()=>{o.es=e},id):''}</button>`}<button class="btn sm" data-a="ethgo">⚒️ Forge d'Éther</button></div></div>`}
{const hm=heroModal;heroModal=function(id){hm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal'),h=HEROES[id];if(!m||!h||h.r<4||!S.heroes[id]||m.querySelector('.esk'))return;
  const html=esHTML(id),aw=m.querySelector('.awk');if(aw)aw.insertAdjacentHTML('afterend',html);else{const ux=m.querySelector('.uxb');if(ux)ux.insertAdjacentHTML('afterend',html)}
  const e=esOf(id);if(e){const hd=m.querySelector('.hd .pt');if(hd&&!hd.querySelector('.esb'))hd.insertAdjacentHTML('beforeend',`<span class="esb">✦${e}</span>`);if(e>=ES_MAX){const hdd=m.querySelector('.hd');if(hdd)hdd.classList.add('es5')}}}catch(e){}}}
/* les cartes de héros : petit badge ✦ et aura à 5 étoiles */
{const ht=heroTile;heroTile=function(h){let s=ht.apply(this,arguments);try{const e=h&&h.r>=4?esOf(h.i):0;if(e){s=s.replace('<button class="ht ','<button class="ht '+(e>=ES_MAX?'es5 ':'')).replace('<span class="pt">',`<span class="estag">✦${e}</span><span class="pt">`)}}catch(_){}return s}}

/* ---------- clics ---------- */
document.addEventListener('click',ev=>{const t=ev.target.closest('[data-a="esset"],[data-a="ethx"],[data-a="ethfr"],[data-a="ethgo"]');if(!t||t.disabled)return;ev.preventDefault();ev.stopPropagation();const a=t.dataset.a;
  if(a==='esset')return esSet(+t.dataset.v,t.dataset.m?'m':'');
  if(a==='ethx')return ethBuy(t.dataset.v,+t.dataset.n||1);
  if(a==='ethfr')return ethFrag(UI.ethfr,+t.dataset.n||1);
  if(a==='ethgo'){try{closeModal()}catch(e){}TAB='equip';UI.lz=UI.lz||{};UI.lz.equip='eth';UI.eqv='eth';render();window.scrollTo(0,0)}},true);
document.addEventListener('change',ev=>{const t=ev.target.closest('[data-a="ethfrsel"]');if(!t)return;UI.ethfr=+t.value;render()},true);

/* ---------- style ---------- */
const st=document.createElement('style');st.textContent=`
.ethbal{border-color:#b48aff;background:linear-gradient(135deg,rgba(180,138,255,.18),rgba(255,216,74,.08)),var(--surf,#1e1838)}
.ethbn{display:flex;align-items:center;gap:8px;font-size:15px;margin-bottom:4px}.ethbn .ic{width:26px;height:26px}.ethbn b{font-size:24px;color:#ffe08a}.ethbn span{color:#e0d0ff;font-weight:800}
.ethwarn{margin-top:8px;font-size:12.5px;padding:7px 9px;border-radius:10px;background:rgba(255,170,60,.12);border:1px solid rgba(255,170,60,.45)}
.eslist{display:flex;flex-direction:column;gap:8px}
.esrow{display:flex;align-items:center;gap:10px;padding:6px 8px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(180,138,255,.25)}
.esrow.max{border-color:#ffd84a;background:linear-gradient(90deg,rgba(255,216,74,.12),rgba(180,138,255,.1))}
.espt{width:48px;height:48px;flex:none;border-radius:10px;overflow:hidden;padding:0;border:2px solid var(--rc);background:none;cursor:pointer}.espt svg{width:100%;height:100%;display:block}
.esinfo{flex:1;min-width:0;display:flex;flex-direction:column;gap:1px}.esinfo b{font-size:13.5px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.esinfo small{font-size:11.5px;color:var(--mut,#b8b0d8)}
.esst{display:inline-flex;gap:1px;font-size:13px;line-height:1}.esst i{font-style:normal;color:rgba(255,255,255,.22)}.esst i.on{color:#ffe08a;text-shadow:0 0 6px #b48aff,0 0 2px #fff}
.ethx{display:flex;flex-direction:column;gap:8px}
.ethi{display:flex;align-items:center;gap:10px;padding:8px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid rgba(255,255,255,.1)}
.ethi.fr{flex-wrap:wrap}.ethi.fr .ethin{flex:1 1 60%}
.ethic{width:38px;height:38px;flex:none;display:grid;place-items:center;font-size:22px;border-radius:10px;background:rgba(180,138,255,.16)}.ethic .ic,.ethic svg{width:26px;height:26px}
.ethin{flex:1;min-width:0;display:flex;flex-direction:column}.ethin b{font-size:13.5px}.ethin small{font-size:11.5px;color:var(--mut,#b8b0d8)}
.ethbt{display:flex;gap:6px;flex-wrap:wrap;justify-content:flex-end}.ethbt .btn .ic{width:14px;height:14px;vertical-align:-2px}
.ethsel{margin-top:6px;width:100%;max-width:100%;font:inherit;font-size:12.5px;padding:6px 8px;border-radius:9px;background:#140c24;color:var(--fg,#fff);border:1px solid rgba(180,138,255,.5)}
.escost{display:flex;flex-wrap:wrap;gap:4px 10px;font-size:11.5px;font-weight:800;color:#e0d0ff;margin:-2px 0 8px}.escost .ic{width:12px;height:12px;vertical-align:-1px}
.esk{margin-top:12px;padding:10px 12px;border-radius:14px;border:1.5px solid #ffd84a;background:linear-gradient(135deg,rgba(255,216,74,.14),rgba(180,138,255,.12))}.esk .sn{font-weight:900;color:#ffe9a0}.esk.lock{opacity:.7;border-style:dashed}
.esk.max{box-shadow:0 0 18px -6px #ffd84a}
.esk .btn .ic,.esrow .btn .ic{width:14px;height:14px;vertical-align:-2px}
.ht .estag{position:absolute!important;top:24px;right:4px;z-index:8!important;font-size:10px;font-weight:900;color:#2a1a00;background:linear-gradient(90deg,#fff3b0,#ffd84a);border-radius:6px;padding:1px 5px;box-shadow:0 0 6px rgba(180,138,255,.8)}
.ht.es5,.espt.es5{box-shadow:0 0 0 2px #ffe08a,0 0 16px 2px rgba(180,138,255,.85),0 0 26px 4px rgba(255,216,74,.45)!important;animation:esaura 2.4s ease-in-out infinite!important}
@keyframes esaura{0%,100%{box-shadow:0 0 0 2px #ffe08a,0 0 12px 1px rgba(180,138,255,.7),0 0 20px 2px rgba(255,216,74,.35)}50%{box-shadow:0 0 0 2px #fff6c8,0 0 20px 4px rgba(180,138,255,.95),0 0 32px 6px rgba(255,216,74,.55)}}
.hd .pt .esb{position:absolute;bottom:4px;right:4px;z-index:4;font-size:11px;font-weight:900;color:#2a1a00;background:linear-gradient(90deg,#fff3b0,#ffd84a);border-radius:6px;padding:1px 6px}
.hd.es5 .pt{box-shadow:0 0 0 2px #ffe08a,0 0 18px 3px rgba(180,138,255,.85);animation:esaura 2.4s ease-in-out infinite}
.esrev .big{border-radius:16px}.esrev .esst{font-size:22px;margin:6px 0}
@media (prefers-reduced-motion:reduce){.ht.es5,.espt.es5,.hd.es5 .pt{animation:none!important}}`;
document.head.appendChild(st);

try{const X={"Forge d'Éther": "Ether Forge", "✦ Forge d'Éther": "✦ Ether Forge", "⚒️ Forge d'Éther": "⚒️ Ether Forge", "Éther": "Ether", "✦ Éther": "✦ Ether", "Éclats légendaires : échanges et étoiles d'éther": "Legendary shards: exchanges and ether stars", "Astrid Feu-d'Étoile": "Astrid Starfire", "Forgeronne d'Éther": "Ether Smith", "éclats légendaires": "legendary shards", "Astrid transforme tes éclats légendaires en ce dont tu as besoin, et sertit des étoiles d'éther sur tes légendaires ★★★.": "Astrid turns your legendary shards into whatever you need, and sets ether stars on your ★★★ legendaries.", "⚠️ # légendaire pas encore ★★★ : il te manque environ": "⚠️ # legendary not yet ★★★: you still need about", "⚠️ # légendaires pas encore ★★★ : il te manque environ": "⚠️ # legendaries not yet ★★★: you still need about", "fragments (les éclats comptent comme des fragments). Garde des éclats pour eux si tu veux !": "fragments (shards count as fragments). Keep some shards for them if you like!", "fragment (les éclats comptent comme des fragments). Garde des éclats pour eux si tu veux !": "fragment (shards count as fragments). Keep some shards for them if you like!", "✦ Étoiles d'éther": "✦ Ether stars", "Au-delà de ★★★ : chaque étoile donne": "Beyond ★★★: each star gives", "+# % de PV, ATQ et DÉF": "+#% HP, ATK and DEF", ". À # étoiles, la carte du héros s'entoure de l'aura d'éther.": ". At # stars, the hero's card is wrapped in the ether aura.", "Aucune étoile": "No star", "+# % de stats": "+#% stats", "Aucun légendaire ★★★ pour l'instant. Fais évoluer un légendaire au maximum pour lui sertir des étoiles.": "No ★★★ legendary yet. Fully evolve a legendary to set stars on it.", "⚒️ Échanges": "⚒️ Exchanges", "Sans limite : échange seulement ce dont tu n'as plus besoin.": "No limit: only trade what you no longer need.", "2 éclats d'ultra-évolution": "2 ultra-evolution shards", "Pour les Ultra I, II et III.": "For Ultra I, II and III.", "Ticket d'invocation": "Summon ticket", "Une invocation gratuite.": "One free summon.", "Coffre céleste": "Celestial chest", "Un objet céleste au hasard.": "A random celestial item.", "Fragments d'un légendaire": "Legendary fragments", "Pour son Éveil ◆ : # éclats = # fragment.": "For its Awakening ◆: # shards = # fragment.", "Aura ✦": "Aura ✦", "AURA D'ÉTHER !": "ETHER AURA!", "Magnifique !": "Magnificent!", "Cinq étoiles d'éther : +# % de PV, ATQ et DÉF, et sa carte s'entoure de l'aura d'éther.": "Five ether stars: +#% HP, ATK and DEF, and its card is wrapped in the ether aura.", "« Je n'en avais vu qu'une seule… Et maintenant, deux. » — Astrid": "“I'd only ever seen one… And now, two.” — Astrid", "✦ Étoiles d'éther #/#": "✦ Ether stars #/#", "Chaque étoile coûte des": "Each star costs", "et donne": "and gives", ". Bonus actuel :": ". Current bonus:", ". Aura d'éther active !": ". Ether aura active!", "Aura d'éther ✦": "Ether aura ✦", "✦ Sertir une étoile (#/#)": "✦ Set a star (#/#)", "Se débloquent à l'évolution ★★★. Astrid, à la Forge d'Éther, les sertit avec tes éclats légendaires.": "Unlocked at ★★★ evolution. Astrid, at the Ether Forge, sets them with your legendary shards.", "Les étoiles d'éther se sertissent sur un légendaire ★★★.": "Ether stars can only be set on a ★★★ legendary.", "La Forge d'Éther ✦": "The Ether Forge ✦", "⚒️ Aller à la Forge d'Éther": "⚒️ Go to the Ether Forge", "La Forge d'Éther": "The Ether Forge", "Mon maître Brann tape fort. Moi, je tape juste : l'éther n'aime pas les brutes.": "My master Brann hits hard. I hit right: ether doesn't like brutes.", "« Mon maître Brann tape fort. Moi, je tape juste : l'éther n'aime pas les brutes. »": "“My master Brann hits hard. I hit right: ether doesn't like brutes.”", "Un éclat légendaire, c'est un bout d'étoile tombé. Je lui apprends juste à briller pour toi.": "A legendary shard is a piece of a fallen star. I just teach it to shine for you.", "« Un éclat légendaire, c'est un bout d'étoile tombé. Je lui apprends juste à briller pour toi. »": "“A legendary shard is a piece of a fallen star. I just teach it to shine for you.”", "Des éclats qui dorment au fond de ton sac ? Donne, donne ! Ici, rien ne se perd.": "Shards sleeping at the bottom of your bag? Give, give! Nothing goes to waste here.", "« Des éclats qui dorment au fond de ton sac ? Donne, donne ! Ici, rien ne se perd. »": "“Shards sleeping at the bottom of your bag? Give, give! Nothing goes to waste here.”", "Cinq étoiles d'éther sur un même héros… je n'en ai vu qu'une fois. C'était beau à pleurer.": "Five ether stars on a single hero… I've only seen it once. It was beautiful enough to cry.", "« Cinq étoiles d'éther sur un même héros… je n'en ai vu qu'une fois. C'était beau à pleurer. »": "“Five ether stars on a single hero… I've only seen it once. It was beautiful enough to cry.”", "Attention, ça chauffe ! Enfin… ça brille. L'éther ne chauffe pas, il chante.": "Careful, it's hot! Well… it's shiny. Ether doesn't burn, it sings.", "« Attention, ça chauffe ! Enfin… ça brille. L'éther ne chauffe pas, il chante. »": "“Careful, it's hot! Well… it's shiny. Ether doesn't burn, it sings.”", "Brann trouve mes lunettes ridicules. Brann n'a plus de sourcils depuis mardi.": "Brann thinks my goggles are silly. Brann hasn't had eyebrows since Tuesday.", "« Brann trouve mes lunettes ridicules. Brann n'a plus de sourcils depuis mardi. »": "“Brann thinks my goggles are silly. Brann hasn't had eyebrows since Tuesday.”", "Chaque étoile que je sertis garde un peu de la lumière du Cœur d'Éther.": "Every star I set keeps a little of the Ether Heart's light.", "« Chaque étoile que je sertis garde un peu de la lumière du Cœur d'Éther. »": "“Every star I set keeps a little of the Ether Heart's light.”", "Tes éclats légendaires s'entassent ?": "Your legendary shards are piling up?"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
/* ---------- notes de mise à jour et annonce ---------- */
try{PATCH.unshift({v:40,d:'3 novembre 2026',t:"La Forge d'Éther",items:["⚒️ <b>Nouveau bâtiment : la Forge d'Éther</b>, dans le Quartier des artisans. Astrid Feu-d'Étoile, l'apprentie de Brann, s'occupe de tes éclats légendaires qui dormaient dans le sac.",
 "✦ <b>Étoiles d'éther</b> : au-delà de ★★★, sertis jusqu'à 5 étoiles sur chaque légendaire (10, 15, 20, 25 et 30 éclats). Chaque étoile donne +5 % de PV, ATQ et DÉF. À 5 étoiles, la carte du héros s'entoure de l'aura d'éther.",
 "🔁 <b>Échanges</b> : 1 éclat = 2 éclats d'ultra-évolution, 5 éclats = 1 ticket d'invocation, 15 éclats = 1 coffre céleste, et 2 éclats = 1 fragment d'un légendaire ★★★ au choix pour son Éveil ◆."]})}catch(e){}
{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(!S.ethSeen&&Date.now()<Date.parse('2026-11-11T00:00:00+01:00')&&!L.some(a=>a.k==='ether1')){L.splice(Math.min(1,L.length),0,{k:'ether1',ac:'#b48aff',tag:'NOUVEAU',t:"La Forge d'Éther ✦",x:"Tes éclats légendaires s'entassent ? <b>Astrid Feu-d'Étoile</b>, l'apprentie de Brann, ouvre sa forge dans le Quartier des artisans. Elle les échange contre des éclats d'ultra, des tickets ou des coffres célestes, et sertit des <b>étoiles d'éther</b> sur tes légendaires ★★★ : jusqu'à <b>+25 % de stats</b> et une aura sur leur carte !",art:()=>`<div class="ashann ethann">${astridSVG()}</div>`,go:"⚒️ Aller à la Forge d'Éther",fn:()=>{TAB='equip';UI.lz=UI.lz||{};UI.lz.equip='eth';UI.eqv='eth'}})}}catch(e){}return L}}
}catch(e){console.warn('ether forge',e)}})();
