
/* ================= MÉTA VIVANTE : nouvelles équipes, nouveaux héros pris en compte tout seuls ================= */
/* --- l'évaluation connaît les nouveaux kits (poker d'Aléa, passifs, affinités) --- */
{const so=skillOut;skillOut=function(h,mk){const fx=h.sk.fx;if(fx.poker)return mk==='pve'?3.9:mk==='pvp'?2.7:2.4;return so.apply(this,arguments)}}
{const mm=modeMult;modeMult=function(h,mk){let m=mm.apply(this,arguments);if(h.sk.fx.poker){m*=1.12;if(mk==='pvp')m*=1.06}return m}}
function affActive(ids){const out=[];try{for(const a of AFF){const n=a.ids.filter(i=>ids.includes(i)).length;if(n>=(a.need||2))out.push(a)}}catch(e){}return out}
function affGain(a){const f=a.fx||{};let g=0;for(const k in f){const v=+f[k]||0;g+=k==='energy'?v/300:v}return g}
{const ts=teamScore;teamScore=function(ids,mk,val){let s=ts.apply(this,arguments);if(!s)return s;for(const a of affActive(ids))s*=1+affGain(a)*.7;return s}}
for(const k in METAC)delete METAC[k];
/* --- équipes supplémentaires --- */
function bestTeamWith(pool,mk,val,must){must=must.filter(i=>pool.includes(i));const V=new Map(pool.map(i=>[i,val(i)]));const f=i=>V.get(i);
  let cur=[...must,...pool.filter(i=>!must.includes(i)).sort((a,b)=>f(b)-f(a))].slice(0,5);let best=teamScore(cur,mk,f);
  for(let pass=0;pass<4;pass++){let imp=false;for(let k=must.length;k<cur.length;k++)for(const c of pool){if(cur.includes(c))continue;const t=[...cur];t[k]=c;const sc=teamScore(t,mk,f);if(sc>best*1.0001){best=sc;cur=t;imp=true}}if(!imp)break}
  return cur.sort((a,b)=>CORD[HEROES[a].c]-CORD[HEROES[b].c]||HEROES[b].r-HEROES[a].r)}
const META_NEW=(()=>{const L=HEROES.filter(h=>h.r>=5).map(h=>h.i);return L.length?L:[HEROES.length-1]})();
function metaSets(mk){const k='sets'+mk;if(METAC[k])return METAC[k];const all=HEROES.map(h=>h.i),v=refVal(mk);
  const top=metaTeam(mk);const alt=bestTeam(all.filter(i=>!top.slice().sort((a,b)=>v(b)-v(a)).slice(0,2).includes(i)),mk,v);
  const F=featHero();const L=[
   {k:'top',ic:'👑',n:'Équipe méta du royaume',d:'La plus forte avec tous les héros du jeu.',ids:top},
   {k:'alt',ic:'🔁',n:'Alternative',d:'Sans les 2 héros les plus forts de la méta : la meilleure équipe de rechange.',ids:alt},
   {k:'new',ic:'🆕',n:`Autour de ${HEROES[META_NEW[META_NEW.length-1]].n.split(' ')[0]}`,d:'La meilleure équipe construite autour du dernier héros sorti.',ids:bestTeamWith(all,mk,v,[META_NEW[META_NEW.length-1]])},
   {k:'wk',ic:'⭐',n:`Autour de ${F.n.split(' ')[0]}`,d:'Construite autour du héros vedette de la semaine.',ids:bestTeamWith(all,mk,v,[F.i])},
   {k:'nl',ic:'💜',n:'Sans légendaire ni mythique',d:'Que des Épiques et moins.',ids:metaTeam(mk,1)},
   {k:'f2p',ic:'🆓',n:'Petit budget',d:'Uniquement des Communs, Rares et Super Rares.',ids:bestTeam(HEROES.filter(h=>h.r<=2).map(h=>h.i),mk,v)}];
  return METAC[k]=L}
/* --- la vraie méta des joueurs --- */
function playerMeta(){const out={rows:[],pick:[],n:0};try{const rows=rankList('pw').filter(p=>p.real||p.me);out.n=rows.length;const cnt={};
  for(const p of rows){const tm=teamOfRow(p)||[];const ids=tm.map(t=>t.id).filter(i=>HEROES[i]);ids.forEach(i=>cnt[i]=(cnt[i]||0)+1);out.rows.push({p,ids})}
  out.pick=Object.entries(cnt).map(([i,c])=>[+i,c]).sort((a,b)=>b[1]-a[1]).slice(0,10);out.rows=out.rows.slice(0,3)}catch(e){}return out}
function topMeta(){const out={pick:[],n:0};try{const rows=rankList('pw').slice(0,40);out.n=rows.length;const cnt={};for(const p of rows){const tm=teamOfRow(p)||[];tm.forEach(t=>{if(HEROES[t.id])cnt[t.id]=(cnt[t.id]||0)+1})}
  out.pick=Object.entries(cnt).map(([i,c])=>[+i,c]).sort((a,b)=>b[1]-a[1]).slice(0,8)}catch(e){}return out}
/* --- la page Méta, version complète --- */
{const pm=pMeta;pMeta=function(){const mk=UI.mm||'pve',M=MODES[mk];let h=pm.apply(this,arguments);try{
  const tiles=ids=>`<div class="grid mgrid">${ids.map(id=>heroTile(HEROES[id])).join('')}</div><div class="syns">${synBadges(ids)||''}${affActive(ids).map(a=>`<span class="syn aff">${a.ic} ${esc(a.n)}</span>`).join('')}</div>`;
  const sets=metaSets(mk),v=refVal(mk),sc=ids=>teamScore(ids,mk,v),best=sc(sets[0].ids)||1;const tab=UI.mset||'top',cur=sets.find(s=>s.k===tab)||sets[0];
  const setCard=`<div class="card mtcard"><div class="mthd"><div class="h3" style="margin:0">Équipes méta · ${M.ic} ${esc(M.n)}</div><span class="mtlive">● Méta à jour · ${HEROES.length} héros · V${GAME_V}</span></div>
   <p class="muted" style="margin:4px 0 8px;font-size:12.5px">Calculées automatiquement avec les vraies règles des combats, les synergies et les affinités. Chaque nouveau héros y entre tout seul dès sa sortie. Les héros que tu n'as pas sont grisés.</p>
   <div class="chips mtchips">${sets.map(s=>`<button class="chip ${s.k===cur.k?'on':''}" data-a="mset" data-v="${s.k}">${s.ic} ${esc(s.n)}</button>`).join('')}</div>
   <div class="mtsub"><b>${cur.ic} ${esc(cur.n)}</b><span>${esc(cur.d)}</span><em>${Math.round(sc(cur.ids)/best*100)} % de la méta</em></div>${tiles(cur.ids)}
   <button class="btn sm" data-a="mcopy" data-v="${cur.k}" ${cur.ids.every(i=>S.heroes[i])?'':'disabled'} style="margin-top:8px">${cur.ids.every(i=>S.heroes[i])?`📋 Utiliser cette équipe pour ${esc(M.n)}`:`🔒 Il te manque ${cur.ids.filter(i=>!S.heroes[i]).length} héros`}</button></div>`;
  const PM=playerMeta(),TM=topMeta();
  const pickRow=(arr,n)=>arr.map(([i,c])=>`<button class="trow mp" data-a="hero" data-v="${i}"><span class="tpt" style="${rv(HEROES[i].r)}">${portrait(HEROES[i])}</span><span class="tn">${esc(HEROES[i].n)}</span><span class="mpbar"><i style="width:${Math.round(c/n*100)}%"></i></span><b class="mppct">${Math.round(c/n*100)} %</b></button>`).join('');
  const realCard=`<div class="card"><div class="h3" style="margin:0">🌍 La vraie méta des joueurs</div><p class="muted" style="margin:4px 0 8px;font-size:12.5px">Ce que jouent vraiment les ${PM.n} vrais joueurs du royaume dans leur équipe d'arène, mis à jour en direct.</p>
   ${PM.pick.length?`<div class="tiers">${pickRow(PM.pick,PM.n||1)}</div>`:'<p class="muted">Pas encore assez de joueurs.</p>'}
   ${PM.rows.length?`<div class="h3 h4" style="margin-top:12px">Les équipes des 3 plus puissants</div>${PM.rows.map(r=>`<div class="mprow"><div class="mpn"><b>${esc(r.p.me?(S.name||'Toi'):(r.p.n||'?'))}</b><span class="muted">${fmt(r.p.pw||0)} de puissance</span></div><div class="mpt">${r.ids.map(i=>`<span class="tpt" style="${rv(HEROES[i].r)}">${portrait(HEROES[i])}</span>`).join('')}</div></div>`).join('')}`:''}
   ${TM.pick.length?`<details class="sgdet" style="margin-top:8px"><summary>Les plus joués dans le top ${TM.n} du classement</summary><div class="tiers">${pickRow(TM.pick,TM.n||1)}</div></details>`:''}</div>`;
  const tl=tierList(mk),tier=r=>r<6?'S':r<16?'A':r<32?'B':'C';
  const fullTier=`<details class="sgdet"><summary>Voir les ${tl.length} héros classés</summary><div class="tfull">${['S','A','B','C'].map(T=>`<div class="tfr"><b class="tier t${T}">${T}</b><div class="tfh">${tl.filter((id,r)=>tier(r)===T).map(id=>`<button class="tfp ${S.heroes[id]?'':'lk'}" data-a="hero" data-v="${id}" title="${esc(HEROES[id].n)}" style="${rv(HEROES[id].r)}">${portrait(HEROES[id])}${META_NEW.includes(id)?'<i>NEW</i>':''}</button>`).join('')}</div></div>`).join('')}</div></details>`;
  const newCard=`<div class="card mtnew"><div class="h3" style="margin:0">🆕 Les nouveautés dans la méta</div><div class="list" style="gap:4px;margin-top:6px">${META_NEW.map(i=>{const H2=HEROES[i];return`<button class="trow mn" data-a="hero" data-v="${i}"><span class="tpt" style="${rv(H2.r)}">${portrait(H2)}</span><span class="tn">${esc(H2.n)} <i class="muted">· ${RAR[H2.r].n}</i></span><span class="mtranks">${MODE_KEYS.map(m=>{const r=tierList(m).indexOf(i);return`<i title="${esc(MODES[m].n)}">${MODES[m].ic}<b class="tier t${tier(r)}">${tier(r)}</b></i>`}).join('')}</span></button>`}).join('')}</div></div>`;
  /* on remplace l'ancienne carte « Équipe méta » par la nouvelle, et on ajoute le reste */
  const a=h.indexOf('<div class="card"><div class="h3">Équipe méta du royaume');const b=a>=0?h.indexOf('<div class="card"><div class="h3">Ta meilleure équipe',a):-1;
  if(a>=0&&b>a)h=h.slice(0,a)+setCard+newCard+h.slice(b);
  const c=h.indexOf('<div class="card"><div class="h3">Les synergies de classe');if(c>=0){const e2=h.lastIndexOf('</div>',c);h=h.slice(0,e2)+fullTier+h.slice(e2,c)+realCard+h.slice(c)}
 }catch(e){console.warn('meta',e)}return h}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="mset"],[data-a="mcopy"]');if(!t)return;e.preventDefault();e.stopPropagation();const mk=UI.mm||'pve';
  if(t.dataset.a==='mset'){UI.mset=t.dataset.v;render();return}
  const s=metaSets(mk).find(x=>x.k===t.dataset.v);if(!s||!s.ids.every(i=>S.heroes[i]))return;tSync();const name=MODES[mk].n.replace('Raid · ','Raid ');let i=S.teams.findIndex(x=>x.n===name);
  if(i<0){if(S.teams.length>=TMAX){i=S.tfor[mk];toast(`6 équipes max : « ${S.teams[i].n} » est remplacée`)}else{S.teams.push({n:name,ids:[]});i=S.teams.length-1}}
  S.teams[i].ids=[...s.ids];S.tfor[mk]=i;if(i===S.tcur)S.team=[...s.ids];save();toast(`Équipe « ${esc(S.teams[i].n)} » prête pour ${MODES[mk].n}`);render()},true);
PATCH.unshift({v:29,d:'20 octobre 2026',t:"Poker, Astre Dévorant et méta vivante",items:[
 "🂡 <b>Poker d'Aléa</b> au Casino : vidéo-poker à 5 cartes avec Aléa comme croupier. Garde tes meilleures cartes, tire une fois, et vise la Quinte flush royale (×250 la mise) ! Nouveau défi : gagner 3 mains de poker.",
 "✨ <b>Livre II, combat final</b> : Umbra libère toutes les étoiles qu'elle a dévorées et devient <b>l'Astre Dévorant</b>, avec sa cinématique de transformation, sa musique et son attaque divine « Supernova Dévorante ».",
 "📚 <b>Méta vivante</b> (Héros › Méta) : 6 équipes par mode (méta, alternative, autour du dernier héros sorti, autour du héros de la semaine, sans légendaire, petit budget), un bouton pour les copier, et le classement complet S/A/B/C de tous les héros.",
 "🌍 <b>La vraie méta des joueurs</b> : les héros les plus joués par les vrais joueurs du royaume, en direct, et les équipes des 3 plus puissants.",
 "🧠 La méta est calculée automatiquement : chaque nouveau héros y entre dès sa sortie, et elle compte maintenant les affinités et les nouveaux kits (Aléa et son poker)."]});
