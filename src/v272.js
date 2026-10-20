
/* ================= V26.6 : éveil des légendaires, aperçu des gains, comparateur, amélioration d'équipe, connexion 7 jours ================= */
/* ---------- éveil : les doublons légendaires en trop deviennent de la puissance ---------- */
const AW_MAX=10,AW_COST=5,AW_PCT=.05;
const awOf=id=>Math.min(AW_MAX,(S.heroes[id]&&S.heroes[id].aw)||0);
{const hs=heroStats;heroStats=function(id){const st=hs.apply(this,arguments);const a=awOf(id);if(a){const m=1+AW_PCT*a;st.hp=Math.round(st.hp*m);st.atk=Math.round(st.atk*m);st.def=Math.round(st.def*m)}return st}}
function awaken(id){const o=S.heroes[id];if(!o||HEROES[id].r!==4||o.e<3)return;if((o.aw||0)>=AW_MAX)return toast('Éveil maximal atteint.');if(o.f<AW_COST)return toast(`Il faut ${AW_COST} fragments de ${HEROES[id].n.split(' ')[0]}.`);
  o.f-=AW_COST;o.aw=(o.aw||0)+1;save();toast(`◆ ${HEROES[id].n} s'éveille : niveau ${o.aw} (+${Math.round(AW_PCT*o.aw*100)} % de stats)`);try{UIS.evolve()}catch(e){}render();heroModal(id)}
function awHTML(id){const o=S.heroes[id];if(!o||HEROES[id].r!==4)return'';const a=o.aw||0;
  if(o.e<3)return`<div class="awk lock"><div class="sn">◆ Éveil</div><div class="muted" style="font-size:12.5px">Se débloque à l'évolution ★★★. Ensuite, chaque doublon de ${esc(HEROES[id].n.split(' ')[0])} servira à l'éveiller.</div></div>`;
  return`<div class="awk"><div class="row" style="justify-content:space-between;align-items:center"><div class="sn">◆ Éveil ${a}/${AW_MAX}</div><div class="awd">${[...Array(AW_MAX)].map((_,i)=>`<i class="${i<a?'on':''}"></i>`).join('')}</div></div>
   <div style="font-size:13px;margin:4px 0 8px">Les doublons ne servent plus à rien une fois ★★★ ? Chaque éveil coûte <b>${AW_COST} fragments</b> de ce héros (3 par doublon) et donne <b>+${AW_PCT*100} % de PV, ATQ et DÉF</b>. Bonus actuel : <b>+${Math.round(a*AW_PCT*100)} %</b>.</div>
   <div class="bar" style="margin:0 0 8px"><i style="width:${Math.min(100,o.f/AW_COST*100)}%;background:linear-gradient(90deg,#c8a0ff,#ffd84a)"></i></div>
   <button class="btn p" data-a="awaken" data-v="${id}" ${a>=AW_MAX||o.f<AW_COST?'disabled':''}>${a>=AW_MAX?'Éveil maximal':`◆ Éveiller (${o.f}/${AW_COST} fragments)${gainTag(()=>{o.aw=a+1},()=>{o.aw=a},id)}`}</button></div>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="awaken"]');if(!t)return;e.preventDefault();e.stopPropagation();awaken(+t.dataset.v)},true);
/* doublons de légendaires déjà ★★★ : le message dit que ça part en éveil */
{const px=pullX;pullX=function(n,o){const r=px.apply(this,arguments);try{for(const x of UI.last||[]){const h=HEROES[x.i];if(h&&h.r===4&&x.note&&S.heroes[h.i]&&S.heroes[h.i].e>=3)x.note=h.n.split(' ')[0]+' : +3 fragments d\'éveil ◆'}}catch(e){}return r}}
/* ---------- aperçu du gain de puissance ---------- */
function heroPw(id){try{return power(heroStats(id))}catch(e){return 0}}
function gainTag(apply,undo,id){try{const p0=heroPw(id);apply();const p1=heroPw(id);undo();const d=p1-p0;return d>0?` <small class="pgain">⚡+${fmt(d)}</small>`:''}catch(e){try{undo()}catch(_){}return''}}
{const hm=heroModal;heroModal=function(id){hm.apply(this,arguments);try{const m=$('#ovl .modal'),o=S.heroes[id];if(!m||!o)return;
  m.querySelectorAll('[data-a="lvl"]').forEach(b=>{if(b.querySelector('.pgain'))return;const n=+b.dataset.n||1,l0=o.l;b.insertAdjacentHTML('beforeend',gainTag(()=>{o.l=Math.min(100,l0+n)},()=>{o.l=l0},id))});
  m.querySelectorAll('[data-a="hfup"]').forEach(b=>{if(b.querySelector('.pgain')||b.dataset.v==='all')return;const it=S.items.find(x=>x.id==b.dataset.v);if(!it)return;const n=+b.dataset.n||1,l0=it.l;b.insertAdjacentHTML('beforeend',gainTag(()=>{it.l=Math.min(itemMax(it),l0+n)},()=>{it.l=l0},id))});
  if(HEROES[id].r===4&&!m.querySelector('.awk')){const ev=[...m.querySelectorAll('[data-a="evolve"]')].pop();const box=ev&&ev.closest('.skill');const html=awHTML(id);if(box)box.insertAdjacentHTML('afterend',html);else{const sl=m.querySelector('.slots');if(sl)sl.insertAdjacentHTML('beforebegin',html)}}}catch(e){}}}
/* ---------- comparateur d'objets ---------- */
const STN2={hp:'PV',atk:'ATQ',def:'DÉF',spd:'VIT'};
function itemDiffHTML(it,cur){const a=itemStats(it),b=cur?itemStats(cur):{};const ks=['hp','atk','def','spd'].filter(k=>(a[k]||0)||(b[k]||0));let pw=0;
  const parts=ks.map(k=>{const d=(a[k]||0)-(b[k]||0);pw+=k==='hp'?d/8:k==='atk'?d*2.2:k==='def'?d*1.6:d;return d?`<span class="${d>0?'up':'dn'}">${STN2[k]} ${d>0?'+':''}${fmt(d)}</span>`:''}).filter(Boolean).join(' ');
  pw=Math.round(pw);return`<span class="icmp">${cur&&cur.id===it.id?'<span class="eqd">Équipé</span>':parts||'<span class="muted">Identique</span>'}${cur&&cur.id===it.id?'':`<b class="${pw>=0?'up':'dn'}">⚡${pw>=0?'+':''}${fmt(pw)}</b>`}</span>`}
{const sp=slotPicker;slotPicker=function(hid,k){sp.apply(this,arguments);try{const m=$('#ovl .modal');if(!m)return;const cur=S.items.find(x=>x.eq===hid&&x.s===k);
  m.querySelectorAll('[data-a="equipto"]').forEach(b=>{const it=S.items.find(x=>x.id==b.dataset.v);if(it&&!b.querySelector('.icmp'))b.insertAdjacentHTML('beforeend',itemDiffHTML(it,cur))});
  if(cur){const p=m.querySelector('.sub');if(p)p.insertAdjacentHTML('afterend',`<p class="muted" style="font-size:12px;margin:-4px 0 8px">Comparé à l'objet porté : ${esc(itemName(cur))} (Nv ${cur.l}). <span class="up">Vert</span> = mieux, <span class="dn">rouge</span> = moins bien.</p>`)}}catch(e){}}}
/* ---------- améliorer toute l'équipe d'un coup ---------- */
function teamUpPlan(budget,ids){let g=0,n=0;const steps=[];const cand=()=>{const c=[];for(const id of ids){const o=S.heroes[id];if(!o)continue;if(o.l<100){const cost=lvlCost(o.l);const p0=heroPw(id);o.l++;const d=heroPw(id)-p0;o.l--;c.push({k:'h',id,cost,d})}
    for(const it of S.items.filter(x=>x.eq===id)){if(it.l>=itemMax(it))continue;const cost=upCost(it);const p0=heroPw(id);it.l++;const d=heroPw(id)-p0;it.l--;c.push({k:'i',it,id,cost,d})}}return c};
  for(let guard=0;guard<3000;guard++){const c=cand().filter(x=>x.cost<=budget-g&&x.cost<=S.gold);if(!c.length)break;c.sort((a,b)=>b.d/b.cost-a.d/a.cost);const x=c[0];S.gold-=x.cost;g+=x.cost;if(x.k==='h')S.heroes[x.id].l++;else x.it.l++;n++}
  return{g,n}}
function teamUpModal(){const ids=(S.team||[]).filter(i=>S.heroes[i]);const pw=idsPower(ids);
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h" style="margin-top:0">⚡ Améliorer toute l'équipe</div><p class="sub">Je répartis ton or entre les niveaux des héros de « ${esc(curTeamName())} » et leur équipement, en commençant par ce qui donne le plus de puissance pour le prix.</p>
   <div class="tuph">${ids.map(i=>`<span class="tupp" style="${rv(HEROES[i].r)}">${portrait(HEROES[i])}<i>Nv ${S.heroes[i].l}</i></span>`).join('')}</div>
   <p style="margin:8px 0">Puissance actuelle : <b>${fmt(pw)}</b> · Or disponible : <b>${GOLD}${fmt(S.gold)}</b></p>
   <div class="tupb">${[[.25,'25 %'],[.5,'50 %'],[1,'Tout']].map(([f,l])=>`<button class="btn ${f===1?'g':'p'}" data-a="teamup" data-v="${f}" ${S.gold<1000?'disabled':''}>${l}<small>${GOLD}${fmt(Math.floor(S.gold*f))}</small></button>`).join('')}</div>`)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="teamupm"],[data-a="teamup"]');if(!t)return;e.preventDefault();e.stopPropagation();if(t.dataset.a==='teamupm')return teamUpModal();
  const ids=(S.team||[]).filter(i=>S.heroes[i]);const p0=idsPower(ids);const r=teamUpPlan(Math.floor(S.gold*(+t.dataset.v||1)),ids);const p1=idsPower(ids);save();render();
  if(!r.n){teamUpModal();return toast("Pas assez d'or pour la moindre amélioration.")}try{UIS.buy()}catch(e){}
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h" style="margin-top:0">⚡ Équipe améliorée !</div><p style="font-size:15px">${r.n} amélioration${r.n>1?'s':''} pour ${GOLD}${fmt(r.g)}</p><p style="font-size:18px;font-weight:900">${fmt(p0)} → <span class="up">${fmt(p1)}</span> <small class="pgain">⚡+${fmt(p1-p0)}</small></p><button class="btn p" data-a="close" style="width:100%">Super !</button>`)},true);
{const pc=pColl;pColl=function(){const h=pc.apply(this,arguments);const i=h.indexOf('</p></div>');const btn=`<button class="btn g tupbtn" data-a="teamupm">⚡ Améliorer toute l'équipe en un clic</button>`;return i>0?h.slice(0,i+10)+btn+h.slice(i+10):btn+h}}
/* ---------- récompenses de connexion sur 7 jours ---------- */
const L7=[{t:'20 000 or',ic:'🪙',g:()=>{S.gold+=20000}},{t:'50 gemmes',ic:'💎',g:()=>{S.gems+=50}},{t:"2 tickets d'invocation",ic:'🎟️',g:()=>{INV().pt+=2}},{t:'60 000 or',ic:'💰',g:()=>{S.gold+=60000}},{t:'2 éclats légendaires',ic:'🔶',g:()=>{S.shards+=2}},{t:'120 gemmes',ic:'💎',g:()=>{S.gems+=120}},{t:"1 éclat d'ultra + 200 gemmes",ic:'✦',g:()=>{S.ush=(S.ush||0)+1;S.gems+=200},big:1}];
function L7S(){if(!S.l7||typeof S.l7!=='object')S.l7={n:0,d:''};return S.l7}
function l7Due(){const L=L7S();return!!S.name&&L.d!==today()}
function l7Modal(){const L=L7S(),due=l7Due(),cur=L.n%7;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h" style="margin-top:0">📅 Connexion du jour</div><p class="sub">Connecte-toi chaque jour pour avancer d'une case. Le 7e jour, gros lot ! Si tu rates un jour, tu reprends là où tu en étais.</p>
   <div class="l7">${L7.map((r,i)=>{const kk=due?cur:(L.n?((L.n-1)%7)+1:0),done=i<kk;const now=due&&i===cur;return`<div class="l7d ${done?'done':''} ${now?'now':''} ${r.big?'big':''}"><small>Jour ${i+1}</small><span>${r.ic}</span><b>${r.t}</b>${done?'<i>✓</i>':''}</div>`}).join('')}</div>
   ${due?`<button class="btn p" data-a="l7claim" style="width:100%;margin-top:10px">Récupérer : ${L7[cur].t}</button>`:`<p class="muted" style="text-align:center;margin-top:10px">Déjà récupéré aujourd'hui · reviens demain pour le jour ${((L.n)%7)+1} !</p>`}`)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="l7claim"],[data-a="l7open"]');if(!t)return;e.preventDefault();e.stopPropagation();if(t.dataset.a==='l7open')return l7Modal();
  if(!l7Due())return;const L=L7S(),r=L7[L.n%7];r.g();L.n++;L.d=today();save();renderTop();try{UIS.coin(true)}catch(e){}toast(`📅 Jour ${((L.n-1)%7)+1} : ${r.t} !`);l7Modal()},true);
(function l7Try(){setTimeout(()=>{try{if(!BOOT.done||B||$('#ovl').innerHTML||!S.name){l7Try();return}if(l7Due())l7Modal()}catch(e){}},4000)})();
{const rt=renderTop;renderTop=function(){rt.apply(this,arguments);try{const b=document.getElementById('mailb');if(b&&!document.getElementById('l7b')){b.insertAdjacentHTML('beforebegin',`<button class="gear l7b" id="l7b" data-a="l7open" aria-label="Connexion du jour">📅${l7Due()?'<i class="pdot">!</i>':''}</button>`)}else{const x=document.getElementById('l7b');if(x){const has=!!x.querySelector('.pdot');if(has!==l7Due())x.innerHTML='📅'+(l7Due()?'<i class="pdot">!</i>':'')}}}catch(e){}}}
/* au chargement : prévenir des fragments qui peuvent éveiller un héros */
setTimeout(()=>{try{const L=Object.entries(S.heroes).filter(([i,o])=>HEROES[i]&&HEROES[i].r===4&&o.e>=3&&o.f>=AW_COST&&(o.aw||0)<AW_MAX);if(L.length)toast(`◆ Nouveau : tes fragments en trop peuvent éveiller ${L.map(([i])=>HEROES[i].n.split(' ')[0]).join(', ')} !`)}catch(e){}},9000);
PATCH.unshift({v:26.6,d:'18 octobre 2026',t:"L'Éveil des légendaires",items:[
 "◆ <b>Éveil des légendaires</b> : une fois un légendaire à ★★★, ses doublons ne servent plus à rien… c'est fini ! Chaque éveil coûte 5 fragments du héros (3 par doublon) et donne +5 % de PV, ATQ et DÉF, jusqu'à 10 niveaux (+50 %). Les fragments que tu avais déjà accumulés comptent : tu peux les utiliser tout de suite.",
 "⚡ <b>Aperçu du gain</b> : les boutons d'amélioration (niveau, équipement, éveil) montrent la puissance gagnée avant de cliquer.",
 "🔍 <b>Comparateur d'objets</b> : en choisissant un objet pour une case, chaque stat est en vert si elle est meilleure et en rouge si elle est moins bonne que l'objet porté, avec le gain de puissance total.",
 "🚀 <b>Améliorer toute l'équipe en un clic</b> (onglet Héros) : choisis 25 %, 50 % ou tout ton or et le jeu le répartit entre les niveaux et l'équipement de ton équipe, là où ça rapporte le plus de puissance.",
 "📅 <b>Connexion du jour</b> : 7 récompenses à récupérer jour après jour (or, gemmes, tickets, éclats), avec un éclat d'ultra-évolution et 200 gemmes au 7e jour. Le bouton 📅 est en haut de l'écran."]});
