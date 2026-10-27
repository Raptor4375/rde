
/* ================= GUERRE DES GUILDES : la capitale remise en jeu à chaque saison ================= */
/* Chaque saison du pass (14 jours) :
   J0 → J2  : préparation (la capitale est libre, les guildes se préparent)
   J2 → J5  : la guerre — 5 attaques par jour contre des joueurs d'autres guildes ; chaque victoire rapporte des points à TA guilde
   J5 → fin : la guilde avec le plus de points tient la capitale (+25 % d'or et d'XP de pass) jusqu'à la saison suivante. */
const GW_ON=s=>s>=2;
const GW_ATK=5;
function gwSeason(){return passIdx()}
function gwT(s=gwSeason()){const a=passStartAt(s);return{a,w:a+2*864e5,e:a+5*864e5,z:passEndAt(s)}}
function gwPhase(s=gwSeason()){if(!GW_ON(s))return'old';const T=gwT(s),t=Date.now();return t<T.w?'prep':t<T.e?'war':'hold'}
function GWS(){const s=gwSeason();if(!S.gw||S.gw.s!==s)S.gw={s,pts:0,n:0,w:0,ad:{d:'',n:0},rw:0,g:null};return S.gw}
/* --- scores partagés (collection avdmg, documents gw<saison>_<joueur>) --- */
const GWD={docs:[],t:0,fin:null,ft:0};
async function gwLoad(){try{if(!NET.on||!NET.db)return;const s=gwSeason();const q=await NET.db.collection('avdmg').get();GWD.docs=q.docs.filter(x=>String(x.id).startsWith('gw'+s+'_')).map(x=>({id:x.id,...x.data()}));GWD.t=Date.now()}catch(e){}}
async function gwPush(){try{if(!NET.on||!NET.canWrite||!NET.pid)return;const G=GWS();if(!G.pts)return;await NET.db.doc('avdmg/gw'+G.s+'_'+NET.pid).set({gw:G.s,n:S.name||'Voyageur',g:G.g||S.rgid||null,pts:Math.round(G.pts),at:G.n,t:Date.now()})}catch(e){}}
setTimeout(gwLoad,7000);setInterval(()=>{if(GW_ON(gwSeason())&&gwPhase()!=='prep')gwLoad()},90000);
/* --- les guildes de bots se battent aussi (simulation déterministe, heure par heure) --- */
const GWB={k:-1,r:null};
function gwBotSim(){const s=gwSeason(),T=gwT(s),t=Math.min(Date.now(),T.e),key=Math.floor(t/60000);if(GWB.k===key&&GWB.r)return GWB.r;const G={},P=[];
  const hrs=Math.max(0,(t-T.w)/36e5);
  for(const [gid,g] of Object.entries(NET.guilds||{})){const bots=(g.bots||[]).filter(b=>b&&b.id);if(!bots.length)continue;G[gid]={n:g.n,pts:0};
    for(const b of bots){const act=clamp(b.act||.2,.05,.6),u=hash01(b.n||b.id,'gw'+s);const perDay=Math.min(GW_ATK,GW_ATK*(.35+act*1.3)*(.7+u*.5));const win=clamp(.45+(u-.5)*.3,.25,.75);
      const avg=win*(150+u*90)+(1-win)*20;const pts=Math.round(perDay*avg*hrs/24);G[gid].pts+=pts;P.push({n:b.n,g:gid,pts})}}
  GWB.k=key;GWB.r={G,P};return GWB.r}
function gwList(){const B0=gwBotSim(),G={};for(const k in B0.G)G[k]={...B0.G[k]};
  for(const d of GWD.docs){if(!d.g||d.id==='gw'+gwSeason()+'_'+NET.pid)continue;G[d.g]=G[d.g]||{n:(NET.guilds[d.g]||{}).n||'Guilde',pts:0};G[d.g].pts+=+d.pts||0}
  const me=GWS();if(me.pts&&(me.g||S.rgid)){const g=me.g||S.rgid;G[g]=G[g]||{n:(NET.guilds[g]||{}).n||'Ma guilde',pts:0};G[g].pts+=me.pts}
  return Object.entries(G).map(([gid,g])=>({gid,...g})).filter(x=>x.pts>0).sort((a,b)=>b.pts-a.pts)}
function gwPlayers(){const B0=gwBotSim(),L=B0.P.map(p=>({...p}));for(const d of GWD.docs)if(d.id!=='gw'+gwSeason()+'_'+NET.pid)L.push({n:d.n,g:d.g,pts:+d.pts||0,real:1});const me=GWS();if(me.pts)L.push({n:S.name||'Toi',g:me.g||S.rgid,pts:me.pts,me:1});return L.sort((a,b)=>b.pts-a.pts)}
/* --- résultat figé et partagé à la fin de la guerre --- */
async function gwFinal(){const s=gwSeason();if(!GW_ON(s)||gwPhase()!=='hold')return;try{if(GWD.fin&&GWD.fin.s===s)return;if(!NET.on||!NET.db)return;const ref=NET.db.doc('avwar/final_s'+s);const sn=await ref.get();if(sn.exists){GWD.fin={s,...sn.data()};return}
  await gwLoad();const L=gwList();if(!L.length||!NET.canWrite)return;const d={gid:L[0].gid,n:L[0].n,pts:Math.round(L[0].pts),top:L.slice(0,5).map(g=>({gid:g.gid,n:g.n,pts:Math.round(g.pts)})),t:Date.now()};
  const s2=await ref.get();if(!s2.exists){await ref.set(d);GWD.fin={s,...d}}else GWD.fin={s,...s2.data()}}catch(e){}}
setTimeout(gwFinal,12000);setInterval(gwFinal,120000);
/* la capitale : à partir de la saison 2, c'est la guerre des guildes qui décide */
{const co=capOwner;capOwner=function(){const s=gwSeason();if(!GW_ON(s))return co.apply(this,arguments);if(gwPhase(s)!=='hold')return null;
  if(GWD.fin&&GWD.fin.s===s&&GWD.fin.gid)return{gid:GWD.fin.gid,n:GWD.fin.n,f:null};const L=gwList();return L.length?{gid:L[0].gid,n:L[0].n,f:null}:null}}
/* --- combat --- */
function gwOpp(){const me=teamPower(),mg=S.rgid;const others=rankList('pw').filter(p=>!p.me&&(p.team||[]).length&&(p.gidr||p.g)&&(p.gidr||String(p.g||'').replace(/^r:/,''))!==mg);
  const c=others.filter(p=>p.pw>me*.85&&p.pw<me*1.35);return c.length?pick(c.slice(0,30)):(others.length?others.sort((a,b)=>Math.abs(a.pw-me)-Math.abs(b.pw-me))[0]:null)}
let GWBT=null;
{const tb=towerBattle;towerBattle=function(f){if(GWBT){const o=GWBT;return o}return tb.apply(this,arguments)}}
{const tf=towerFinish;towerFinish=function(win,rw){if(B&&B.gw)return gwFinish(win,rw);return tf.apply(this,arguments)}}
function gwAttack(){const G=GWS();if(gwPhase()!=='war')return;if(!S.rgid)return toast("Rejoins une guilde pour participer à la guerre !");const d=today();if(G.ad.d!==d)G.ad={d,n:0};if(G.ad.n>=GW_ATK)return toast(`Plus d'attaque aujourd'hui (${GW_ATK} par jour). Reviens demain !`);
  const o=gwOpp();if(!o)return toast('Aucun adversaire à ta portée pour le moment.');const tm=teamOfRow(o);if(!tm.length)return toast('Adversaire indisponible, réessaie.');G.ad.n++;G.g=S.rgid;save();
  const base=tm.reduce((a,t)=>a+basePow(HEROES[t.id],t.l,t.e),0)||1,fx=clamp(o.pw/base*1.35,1,4.5);const foes=tm.map((t,k)=>arenaUnit(t,k,fx));const og=(NET.guilds[o.gidr]||{}).n||(o.g&&GU&&GU(o.g)||{}).n||'une guilde rivale';
  GWBT={foes,title:'⚔️ Guerre des Guildes',sub:`${esc(o.n)} défend pour ${esc(og)}`,maxR:20,wc:30};try{startBattle('tower',80)}finally{GWBT=null}
  if(B&&B.mode==='tower'){B.gw={opw:o.pw,on:o.n}}}
function gwFinish(win,rw){const G=GWS(),t=B.gw,tp=teamPower();const p=win?Math.round(120+Math.min(2.2,t.opw/Math.max(1,tp))*140):20;G.pts+=p;G.n++;if(win)G.w++;save();gwPush();
  rw.push(`⚔️ +${fmt(p)} points pour ta guilde`);if(win){S.gold+=8000;rw.push(GOLD+' 8 000 or')}try{passAdd(45)}catch(e){}return win?'Victoire !':'Défaite…'}
{const fi=finish;finish=function(res){const gw=B&&B.gw;fi.apply(this,arguments);if(gw)try{const b=$('#battle .result [data-a="twnext"]');if(b){b.textContent='⚔️ Retour à la guerre';b.dataset.a='gwback'}}catch(e){}}}
/* --- récompenses de fin de guerre --- */
function gwReward(){const G=GWS(),o=capOwner();if(G.rw||gwPhase()!=='hold')return;const win=!!(o&&G.g&&o.gid===G.g);if(!win&&!G.n)return;
  G.rw=1;if(win){S.gems+=500;INV().pt+=3;S.ush=(S.ush||0)+2}else{S.gems+=150}save();
  modal(`<div class="h">${win?'👑 Ta guilde a pris la capitale !':'⚔️ Fin de la guerre'}</div><p class="sub">${win?`Bravo ! <b>${esc(o.n)}</b> tient la Capitale d'Éther jusqu'à la fin de la saison : +25 % d'or et d'XP de pass pour toute la guilde.`:`Merci d'avoir combattu ! ${o?`<b>${esc(o.n)}</b> a pris la capitale.`:''}`}</p><div class="xrw">${win?`<div>${GEM} 500 gemmes</div><div>${SIC.ticket} 3 tickets</div><div>${USH} 2 éclats d'ultra</div>`:`<div>${GEM} 150 gemmes</div>`}</div><button class="btn p" data-a="close" style="width:100%;margin-top:10px">Super !</button>`)}
/* --- la page --- */
function gwPage(){const s=gwSeason(),ph=gwPhase(s),T=gwT(s),G=GWS(),o=capOwner(),L=gwList(),mg=S.rgid,d=today(),left=G.ad.d===d?GW_ATK-G.ad.n:GW_ATK;
  const when=ph==='prep'?`La guerre commence dans <b>${dur(T.w-Date.now())}</b>`:ph==='war'?`Fin de la guerre dans <b>${dur(T.e-Date.now())}</b>`:`Prochaine guerre : nouvelle saison dans <b>${dur(T.z-Date.now())}</b>`;
  const head=`<div class="card gwhd"><div class="gwsky">${typeof avSkyCapital==='function'?'':''}</div><span class="tag" style="--rc:#ffd84a">SAISON ${s} · ${ph==='prep'?'PRÉPARATION':ph==='war'?'GUERRE EN COURS':'CAPITALE CONQUISE'}</span><div class="h" style="margin:4px 0">⚔️ Guerre des Guildes</div>
   <p class="sub" style="margin:0 0 6px">Toutes les guildes se battent pour la <b>Capitale d'Éther</b>. Chaque victoire rapporte des points à ta guilde : la guilde qui en a le plus prend la capitale jusqu'à la fin de la saison.</p><div style="font-size:13px">${when}</div>
   ${o?`<div class="gwown">👑 Capitale tenue par <b>${esc(o.n)}</b>${o.gid===mg?' · <b>ta guilde</b> : +25 % d\'or et d\'XP de pass':''}</div>`:''}</div>`;
  let act='';
  if(ph==='prep')act=`<div class="card"><div class="h3" style="margin:0 0 4px">🛡️ Préparez-vous</div><p class="muted" style="font-size:13px;margin:0">${mg?'Ta guilde participera automatiquement.':'Rejoins une guilde pour participer !'} Pendant 3 jours, chaque membre a <b>${GW_ATK} attaques par jour</b> contre des joueurs d'autres guildes. Monte ton équipe d'arène !</p></div>`;
  else if(ph==='war')act=`<div class="card gwact"><div class="row" style="justify-content:space-between;gap:8px;flex-wrap:nowrap"><div><div class="h3" style="margin:0">⚔️ Attaquer</div><div class="muted" style="font-size:12.5px">${left} attaque${left>1?'s':''} restante${left>1?'s':''} aujourd'hui · victoire : 120 à 430 points</div></div><button class="btn p" data-a="gwatk" ${left>0&&mg?'':'disabled'}>Attaquer</button></div>
    <div class="gwme"><div><b class="num">${fmt(G.pts)}</b><span>tes points</span></div><div><b class="num">${G.w}/${G.n}</b><span>victoires</span></div></div>${mg?'':'<p class="muted" style="font-size:12px;margin:6px 0 0">🔒 Rejoins une guilde pour attaquer.</p>'}</div>`;
  else{gwReward();act=`<div class="card"><div class="h3" style="margin:0 0 4px">🏁 La guerre est finie</div><p class="muted" style="font-size:13px;margin:0">Ta participation : <b>${fmt(G.pts)}</b> points (${G.w} victoire${G.w>1?'s':''}). Rendez-vous à la prochaine saison pour reprendre la capitale !</p></div>`}
  const board=`<div class="card"><div class="h3">🏆 Classement des guildes</div>${L.length?`<div class="gwlist">${L.slice(0,10).map((g,i)=>`<div class="gwrow ${g.gid===mg?'me':''}"><span class="gwrk">${i===0?'👑':i+1}</span><b>${esc(g.n)}</b><span class="num">${fmt(g.pts)}</span></div>`).join('')}</div>`:`<p class="muted" style="margin:0">${ph==='prep'?'Le classement s\'ouvrira au début de la guerre.':'Aucun point pour le moment.'}</p>`}</div>`;
  const P=ph==='prep'?[]:gwPlayers().slice(0,8);const best=P.length?`<div class="card"><div class="h3">⭐ Meilleurs combattants</div><div class="gwlist">${P.map((p,i)=>`<div class="gwrow ${p.me?'me':''}"><span class="gwrk">${i+1}</span><b>${esc(p.n)}</b><small>${esc((NET.guilds[p.g]||{}).n||'')}</small><span class="num">${fmt(p.pts)}</span></div>`).join('')}</div></div>`:'';
  const rules=`<div class="card"><div class="h3" style="margin:0 0 4px">📜 Le calendrier de chaque saison</div><ol class="rules"><li><b>Jours 1-2</b> : préparation.</li><li><b>Jours 3-5</b> : la guerre (${GW_ATK} attaques par jour).</li><li><b>Jusqu'à la fin de la saison</b> : la guilde gagnante tient la capitale (+25 % d'or et d'XP de pass). Gagnants : 500 💎, 3 tickets et 2 éclats d'ultra. Participants : 150 💎.</li></ol></div>`;
  return`<div class="stack">${head}${act}${board}${best}${o?`<button class="btn" data-a="caphall" style="width:100%">👑 Salle du trône</button>`:''}${rules}</div>`}
{const pe=pEvents;pEvents=function(){if(GW_ON(gwSeason())&&UI.lz&&UI.lz.event==='av')return`<div class="stack">${zoneBar('event','av')}${gwPage()}</div>`;return pe.apply(this,arguments)}}
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);if(GW_ON(gwSeason())){const a=P.find(p=>p.k==='av');if(a){a.n='Guerre des Guildes';a.sn='Guerre';a.d='Les guildes se battent pour la capitale';const ph=gwPhase();a.badge=()=>{try{const G=GWS();return ph==='war'&&S.rgid&&(G.ad.d!==today()||G.ad.n<GW_ATK)?'!':0}catch(e){return 0}}}}return P}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="gwatk"],[data-a="gwback"]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.dataset.a==='gwatk')return gwAttack();try{closeBattle()}catch(er){}TAB='event';UI.lz.event='av';render();scrollTo(0,0)},true);
/* annonce dans les notes de mise à jour */
try{PATCH.unshift({v:36.1,d:'27 octobre 2026',t:'La Guerre des Guildes',items:["⚔️ <b>Nouveau : la Guerre des Guildes</b>, à chaque saison du pass. Plus d'Anges ni de Démons : les guildes se battent entre elles pour la Capitale d'Éther.","📅 <b>Jours 1-2</b> préparation, <b>jours 3-5</b> la guerre (5 attaques par jour contre des joueurs d'autres guildes), puis la guilde gagnante tient la capitale jusqu'à la fin de la saison.","👑 La capitale est <b>remise en jeu</b> : cette saison, elle est libre ! Guerre du 29 octobre 8h10 au 1er novembre 8h10."]})}catch(e){}
