
/* ================= ÉVÉNEMENT « L'Éveil du Roi de Cendre » (préparé, caché jusqu'au lancement) =================
   ASH_GO : date de lancement dans la version publique (null = pas encore). La version de test /test/ l'a toujours. */
let ASH_GO=null;
const ASH_ID='ash1',ASH_DAYS=7,ASH_ATK=5;
const ashOn=()=>!!(window.RDE_SKTEST||(ASH_GO&&Date.now()>=ASH_GO));
function ASHS(){if(!S.ash||S.ash.id!==ASH_ID)S.ash={id:ASH_ID,b:0,ad:{d:'',n:0},buy:{},kA:0,lA:0,dl:0,dk:0,got:0,t0:0,tt:0,fr:0};return S.ash}
function ashStart(){if(ASH_GO&&!window.RDE_SKTEST)return ASH_GO;const A=ASHS();if(!A.t0){const d=new Date();d.setHours(0,0,0,0);A.t0=d.getTime();save()}return A.t0}
const ashDay=()=>Math.floor((Date.now()-ashStart())/864e5)+1;
const ashPhase=()=>{const d=ashDay();return d<1?'soon':d<=5?'lt':d<=ASH_DAYS?'king':d<=ASH_DAYS+3?'end':'off'};
const ASH_LT=[{n:'Chevalier de Cendre',h:15,s:"Le premier lieutenant. Son armure fume encore de la dernière guerre.",sk:{n:'Lame fumante',tg:'all',fx:{dmg:95,dot:20}}},
 {n:'Écho de Cendre',h:280,s:"Un souvenir brûlé qui prend forme. Il frappe avec la voix des morts.",sk:{n:'Cri des Mille Voix',tg:'all',fx:{dmg:90,weak:1}}},
 {n:'Dragon de Cendre',h:20,s:"Le dragon ancien, réveillé par la couronne. Son souffle transforme tout en poussière.",sk:{n:'Souffle de suie',tg:'all',fx:{dmg:110,dot:30}}},
 {n:'Éryndel, le Porteur Brûlé',h:25,s:"Ce qu'il reste du jeune Éryndel, avant qu'il ne devienne roi.",sk:{n:'Flamme volée',tg:'all',fx:{dmg:105,weak:1}}},
 {n:'Héraut des Mille Ans',h:35,s:"Il sonne le cor qui annonce le retour du Roi. Demain, il sera là.",sk:{n:'Cor du Requiem',tg:'all',fx:{dmg:100,dot:25,weak:1}}}];
const ASH_KING={n:'Éryndel, le Roi de Cendre',h:25,sk:{n:'Requiem des Mille Ans',tg:'all',fx:{dmg:130,dot:35,weak:1}}};
const ashBoss=()=>{const p=ashPhase();if(p==='lt')return ASH_LT[Math.min(4,ashDay()-1)];if(p==='king')return ASH_KING;return null};
/* --- Éryndel, héros exclusif (n'apparaît jamais dans les invocations) --- */
const ERY=68;
function eryRegister(){if(!ashOn()||HEROES[ERY])return;
  HEROES.push({i:ERY,n:'Éryndel le Roi de Cendre',c:'Guerrier',r:4,ex:1,sk:{n:'Requiem des Mille Ans',tg:'all',fx:{dmg:170,dot:40,weak:1}}});
  LOOKS[ERY]=['#b8aca4','#1a1210','#120c0c','#3a2a24','#ff6a1a','#ffb21a','bg:flame back:wings-black hb:long hair:side hat:ashcrown face:embers,lgery eyes:glow mouth:neutral body:heavy ear:human'];
  FX.lgery=L=>SL('M40 33L42.5 38L40.6 41.5M58 31.5L56 36.5','#ff6a1a',.8,'opacity=".9"')+MIR(SL('M38.6 51L44.4 52.4','#2a1a14',1.2,'opacity=".55"')+SL('M38.6 51L44.4 52.4','#ff6a1a',.35))+SL('M47 64L49 61.5L51.5 63.5L53.5 60.5','#ff8a2a',.6,'opacity=".8"');
  try{UTH_H[ERY]={n:'Roi des Cendres',m:'#0a0707',s:'#2a1c18',a:'#ff6a1a',e:'#ffd84a',bg:'flame',w:'wings-black',hat:'ashcrown',fx:'embers',c:'#ff6a1a',c2:'#c8bcb0',h3:'#ff4a10'}}catch(e){}
  try{LGB[ERY]=u=>dkcBG(u);LGA[ERY]=['ashaxe',80]}catch(e){}
  try{FHINT&&0}catch(e){}}
eryRegister();
/* --- totaux du serveur (vrais joueurs) + participation simulée des bots --- */
const ASHD={t:0,lt:{},kg:{}};const adoc='avwar/'+ASH_ID+'_tot';
async function ashLoad(){if(!NET.on||!NET.db)return;try{const s=await NET.db.doc(adoc).get();const d=s&&s.exists?s.data():{};ASHD.lt=d.lt||{};ASHD.kg=d.kg||{};ASHD.t=Date.now()}catch(e){}}
async function ashPush(kind,dmg){if(!NET.on||!NET.db||!NET.canWrite||!NET.pid)return;const r=NET.db.doc(adoc);try{let ok=false;for(let i=0;i<6&&!ok;i++){try{const l=await r.acquire({holder:NET.pid,ttlMs:8000});ok=l&&l.acquired}catch(e){}if(!ok)await wait(400)}
  const s=await r.get();const d=s&&s.exists?s.data():{};const M=d[kind]||{};const o=M[NET.pid]||{n:S.name||'Voyageur',d:0};o.d+=Math.round(dmg);o.n=S.name||o.n;M[NET.pid]=o;d[kind]=M;await r.set(d);ASHD.lt=d.lt||{};ASHD.kg=d.kg||{};try{await r.acquire({holder:NET.pid,ttlMs:1})}catch(e){}}catch(e){}}
const ashFight=pw=>pw*95;/* dégâts moyens d'un combat pour une puissance donnée */
function ashBots(){try{return botRows().filter(b=>b.pw>0).map(b=>({id:b.id,n:b.n,pw:b.pw,act:Math.max(.08,b.act||.2),g:b.gidr}))}catch(e){return[]}}
function ashBotDmg(b,kind){const st=ashStart(),t0=kind==='lt'?st:st+5*864e5,t1=kind==='lt'?st+5*864e5:st+ASH_DAYS*864e5;const h=Math.max(0,(Math.min(Date.now(),t1)-t0)/36e5);return ashFight(b.pw)*b.act*.5*h*(.85+hash01(b.id,'ash')*.3)}
function ashTotals(kind){const B=ashBots();const rate=B.reduce((a,b)=>a+ashFight(b.pw)*b.act*.5,0);const hours=kind==='lt'?120:48;const goal=Math.max(1,rate*hours/(kind==='lt'?.9:.86));
  const bots=B.reduce((a,b)=>a+ashBotDmg(b,kind),0);const P=kind==='lt'?ASHD.lt:ASHD.kg;const pl=Object.values(P).reduce((a,o)=>a+(o.d||0),0);return{goal,done:bots+pl,pct:Math.min(100,(bots+pl)/goal*100),players:Object.keys(P).length}}
function ashRank(){const L=Object.entries(ASHD.kg).map(([pid,o])=>({n:o.n,d:o.d,me:pid===NET.pid}));for(const b of ashBots())L.push({n:b.n,d:ashBotDmg(b,'kg'),bot:1});if(!L.some(x=>x.me)&&ASHS().dk)L.push({n:S.name||'Toi',d:ASHS().dk,me:true});return L.sort((a,b)=>b.d-a.d)}
const ashKingDown=()=>ashTotals('kg').pct>=100;
/* --- le combat --- */
let ASHBT=null;
{const tb=towerBattle;towerBattle=function(f){if(ASHBT)return ASHBT;return tb.apply(this,arguments)}}
function ashAttack(){const p=ashPhase(),bs=ashBoss();if(!bs)return;const A=ASHS(),d=today();if(A.ad.d!==d)A.ad={d,n:0};if(A.ad.n>=ASH_ATK)return toast(`Plus d'attaque aujourd'hui (${ASH_ATK} par jour). Reviens demain !`);
  A.ad.n++;save();const g=Math.pow(GROW,S.max);const king=p==='king';
  const foe=foeUnit(0,{name:bs.n,boss:1,raid:1,max:1e13,atk:Math.round((king?58:50)*g),def:40,spd:king?104:98,port:monArt(bs.n,bs.h,true),sk:bs.sk});
  ASHBT={foes:[foe],title:(king?'👑 ':'🔥 ')+bs.n,sub:king?'Boss mondial · 12 tours':`Lieutenant du jour ${ashDay()} · 12 tours`,maxR:12,wc:bs.h};
  try{startBattle('tower',80)}finally{ASHBT=null}if(B&&B.mode==='tower')B.ash={king}}
{const tf=towerFinish;towerFinish=function(win,rw){if(!(B&&B.ash))return tf.apply(this,arguments);const A=ASHS(),king=B.ash.king;const f=B.units.find(u=>u.side===1);const dmg=f?Math.max(0,f.max-f.hp):0;
  const tp=Math.max(1,B.pw||1);const br=Math.round((king?2:1)*(18+30*Math.min(1,dmg/(ashFight(tp)*1.2))));A.b+=br;if(king){A.dk+=dmg;A.kA++}else{A.dl+=dmg;A.lA++}save();
  try{passAdd(20)}catch(e){}ashPush(king?'kg':'lt',dmg);
  rw.push(`🔥 ${fmt(Math.round(dmg))} dégâts`,`✨ +${br} Braises éternelles`);return king?'Le Roi chancelle !':'Lieutenant repoussé !'}}
/* --- la boutique des Braises --- */
const ASH_SHOP=[
 {k:'frame',n:'Cadre « Couronne de Cendres »',ic:'🖼️',c:600,max:1,give:()=>{S.evFrames=S.evFrames||[];if(!S.evFrames.includes('ashcrown'))S.evFrames.push('ashcrown')}},
 {k:'title',n:'Titre « Pourfendeur de Cendres »',ic:'🏷️',c:400,max:1,give:()=>{ASHS().tt=1;try{ttCheck()}catch(e){}}},
 {k:'shards',n:'5 éclats légendaires',ic:'✦',c:150,max:6,give:()=>{S.shards=(S.shards||0)+5}},
 {k:'ush',n:"1 éclat d'ultra-évolution",ic:'🌟',c:250,max:3,give:()=>{S.ush=(S.ush||0)+1}},
 {k:'tix',n:"5 tickets d'invocation",ic:'🎟️',c:120,max:5,give:()=>{S.tickets=(S.tickets||0)+5}},
 {k:'gold',n:"1 M d'or",ic:'💰',c:60,max:10,give:()=>{S.gold+=1e6}},
 {k:'eryf',n:"3 fragments d'Éryndel",ic:'🔥',c:200,max:10,need:()=>!!S.heroes[ERY],give:()=>{const o=S.heroes[ERY];if(o)o.f=(o.f||0)+3}}];
function ashBuy(k){const it=ASH_SHOP.find(x=>x.k===k),A=ASHS();if(!it)return;const n=A.buy[k]||0;if(n>=it.max)return toast('Déjà acheté au maximum.');if(it.need&&!it.need())return toast("Il faut d'abord obtenir Éryndel.");if(A.b<it.c)return toast('Pas assez de Braises éternelles.');
  A.b-=it.c;A.buy[k]=n+1;it.give();save();toast(`${it.ic} ${it.n} !`);render()}
function ashClaim(){const A=ASHS();if(A.got||!ashKingDown()||!A.kA)return;S.heroes[ERY]=S.heroes[ERY]||{l:1,e:0,f:0};A.got=1;save();try{news(Date.now(),`${S.name||'Voyageur'} a obtenu Éryndel le Roi de Cendre !`)}catch(e){}try{uRev&&modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="urev" style="--uc:#ff6a1a"><div class="big">${portrait(HEROES[ERY])}<span class="holo"></span></div><div class="h">NOUVEAU HÉROS !</div><div style="font-weight:900">Éryndel le Roi de Cendre</div><p class="muted" style="font-size:13px">Le Premier Porteur a été vaincu… et il a choisi de se battre à tes côtés.</p><button class="btn pro" data-a="hero" data-v="${ERY}">Voir le héros</button></div>`)}catch(e){}render()}
/* --- la page --- */
function ashPage(){const p=ashPhase(),A=ASHS(),d=ashDay(),bs=ashBoss(),day=today(),left=A.ad.d===day?ASH_ATK-A.ad.n:ASH_ATK;if(Date.now()-ASHD.t>45000)ashLoad().then(()=>{if(TAB==='event'&&UI.lz&&UI.lz.event==='ash'&&!B&&!$('#ovl').innerHTML)render()});
  const end=ashStart()+ASH_DAYS*864e5,lbl={lt:'LA MARCHE DES CENDRES',king:'LE REQUIEM DES MILLE ANS',end:'ÉVÉNEMENT TERMINÉ',soon:'BIENTÔT'}[p]||'';
  const T=p==='king'||p==='end'?ashTotals('kg'):ashTotals('lt');const kd=ashKingDown();
  const bar=p==='lt'?`<div class="h3" style="margin:0 0 4px">🗺️ Royaume sauvé à ${T.pct.toFixed(1).replace('.',',')} %</div><div class="bar ashbar"><i style="width:${T.pct}%"></i></div><p class="muted" style="font-size:12px;margin:6px 0 0">Tout le serveur éteint les braises en combattant les lieutenants. ${T.players} joueur${T.players>1?'s':''} et tous les bots participent.</p>`
    :`<div class="h3" style="margin:0 0 4px">👑 Roi de Cendre : ${kd?'VAINCU !':`${(100-T.pct).toFixed(1).replace('.',',')} % de PV`}</div><div class="bar ashbar king"><i style="width:${100-T.pct}%"></i></div><p class="muted" style="font-size:12px;margin:6px 0 0">${kd?'Le serveur a terrassé le Roi ! Chaque joueur qui l\'a combattu au moins une fois reçoit Éryndel.':'Si le serveur le bat avant la fin, chaque joueur qui l\'a combattu reçoit <b>Éryndel en héros jouable</b>.'}</p>`;
  const bossC=bs?`<div class="card ashboss"><div class="ashpt">${monArt(bs.n,bs.h,true)}</div><div><span class="tag" style="--rc:#ff6a1a">${p==='king'?'BOSS MONDIAL':'LIEUTENANT · JOUR '+d}</span><div class="h3" style="margin:4px 0">${esc(bs.n)}</div><p class="muted" style="font-size:12.5px;margin:0 0 8px">${esc(bs.s||'Le Premier Porteur est revenu réclamer la Flamme volée. Tout le royaume se bat.')}</p>
    <button class="btn pro" data-a="ashatk" ${left>0?'':'disabled'}>⚔️ Attaquer · ${left}/${ASH_ATK}</button></div></div>`:'';
  const claim=(p==='king'||p==='end')&&kd&&A.kA&&!A.got?`<button class="btn pro" data-a="ashclaim" style="width:100%">🔥 Recevoir Éryndel le Roi de Cendre</button>`:A.got?`<div class="card" style="text-align:center">🔥 Éryndel a rejoint ton équipe !</div>`:'';
  const shop=`<div class="card"><div class="row" style="justify-content:space-between"><div class="h3" style="margin:0">🛒 Boutique des Braises</div><b class="num">✨ ${fmt(A.b)}</b></div><div class="ashshop">${ASH_SHOP.filter(it=>!it.need||it.need()).map(it=>{const n=A.buy[it.k]||0,full=n>=it.max;return`<button class="ashit" data-a="ashbuy" data-v="${it.k}" ${full||A.b<it.c?'disabled':''}><span class="ic">${it.ic}</span><b>${esc(it.n)}</b><small>${full?'Acheté':`✨ ${it.c} · ${n}/${it.max}`}</small></button>`}).join('')}</div></div>`;
  const rk=(p==='king'||p==='end')?(()=>{const L=ashRank(),mi=L.findIndex(x=>x.me);return`<div class="card"><div class="h3">🏆 Dégâts sur le Roi</div><div class="gwlist">${L.slice(0,10).map((x,i)=>`<div class="gwrow ${x.me?'me':''}"><span class="gwrk">${i+1}</span><b>${esc(x.n)}</b><span class="num">${fmt(Math.round(x.d))}</span></div>`).join('')}${mi>=10?`<div class="gwrow me"><span class="gwrk">${mi+1}</span><b>${esc(L[mi].n)}</b><span class="num">${fmt(Math.round(L[mi].d))}</span></div>`:''}</div></div>`})():'';
  const test=window.RDE_SKTEST?`<div class="card muted" style="font-size:12px">🧪 Test : jour ${d} · <button class="btn sm" data-a="ashday" data-v="-1">− 1 jour</button> <button class="btn sm" data-a="ashday" data-v="1">+ 1 jour</button> <button class="btn sm" data-a="ashday" data-v="b">+500 Braises</button></div>`:'';
  return`<div class="stack"><div class="card ashhd"><span class="tag" style="--rc:#ff6a1a">${lbl}</span><div class="h" style="margin:4px 0">🔥 L'Éveil du Roi de Cendre</div><div style="font-size:13px">${p==='lt'?`Jour <b>${d}</b>/5 · le Roi arrive dans <b>${dur(ashStart()+5*864e5-Date.now())}</b>`:p==='king'?`Fin de l'événement dans <b>${dur(end-Date.now())}</b>`:'Merci d\'avoir défendu le royaume !'}</div><p class="muted" style="font-size:12.5px;margin:6px 0 0">La couronne de cendres s'est rallumée. Éryndel, le Premier Porteur, revient réclamer la Flamme volée.</p></div>
   <div class="card">${bar}</div>${claim}${bossC}${rk}${shop}
   <div class="card"><div class="h3" style="margin:0 0 4px">📜 Règles</div><ol class="rules"><li><b>Jours 1 à 5</b> : un lieutenant du Roi par jour, ${ASH_ATK} attaques par jour. Chaque combat rapporte des <b>Braises éternelles</b> et éteint les feux du royaume.</li><li><b>Jours 6 et 7</b> : le <b>Roi de Cendre</b> en boss mondial, combats doublés en Braises.</li><li>Si tout le serveur bat le Roi avant la fin, chaque joueur qui l'a combattu reçoit <b>Éryndel</b>, un héros légendaire exclusif.</li></ol></div>${test}</div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="ashatk"],[data-a="ashbuy"],[data-a="ashclaim"],[data-a="ashday"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const a=b.dataset.a;
  if(a==='ashatk')return ashAttack();if(a==='ashbuy')return ashBuy(b.dataset.v);if(a==='ashclaim')return ashClaim();
  if(a==='ashday'&&window.RDE_SKTEST){const A=ASHS();if(b.dataset.v==='b')A.b+=500;else{A.t0-=(+b.dataset.v)*864e5;A.ad={d:'',n:0}}save();render()}},true);
{const pe=pEvents;pEvents=function(){if(ashOn()&&UI.lz&&UI.lz.event==='ash')return`<div class="stack">${zoneBar('event','ash')}${ashPage()}</div>`;return pe.apply(this,arguments)}}
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);try{if(ashOn()&&['lt','king','end'].includes(ashPhase())&&!P.some(p=>p.k==='ash')){const b=P[0]||{};P.push(Object.assign({},b,{k:'ash',ic:'🔥',n:"Éveil du Roi de Cendre",sn:'Roi de Cendre',d:'Repousse le Premier Porteur',x:b.x!=null?Math.min(92,(b.x||50)+8):50,y:b.y!=null?Math.max(8,(b.y||50)-6):50,badge:()=>{const A=ASHS();return['lt','king'].includes(ashPhase())&&(A.ad.d!==today()||A.ad.n<ASH_ATK)?'!':(ashKingDown()&&A.kA&&!A.got?'!':0)}}))}}catch(e){}return P}}
/* --- cadre et titre --- */
try{if(ashOn()){FRAMES.ashcrown='Couronne de Cendres';FHINT.ashcrown="Événement « L'Éveil du Roi de Cendre » : boutique des Braises";}
 const crown=`<path d="M32 18L30 4L40 11L50 0L60 11L70 4L68 18Z" fill="#2a1c18" stroke="#ff6a1a" stroke-width="1.6" stroke-linejoin="round"/><circle cx="50" cy="11" r="2.4" fill="#ffd84a"/>`+[24,50,76].map(x=>`<path d="M${x-5} 98Q${x-7} 89 ${x-1} 84Q${x} 91 ${x+3} 88Q${x+7} 93 ${x+5} 98Z" fill="#ff5a1a"/><path d="M${x-2} 98Q${x-2} 93 ${x} 91Q${x+2} 94 ${x+2} 98Z" fill="#ffd84a"/>`).join('');
 const st=document.createElement('style');st.textContent=`.fav.frm-ashcrown{--fd:#120806;--gc:#ff6a1a;animation:fflk 1.7s ease-in-out infinite;box-shadow:none}.fav.frm-ashcrown::before{background:linear-gradient(160deg,rgba(255,255,255,.3),transparent 42%,rgba(0,0,0,.35)),conic-gradient(from var(--fa),#2a1c18,#ff6a1a,#c8bcb0,#ff4a10,#2a1c18);animation:fspin 5s linear infinite}.fav.frm-ashcrown::after{content:'';background-color:transparent;font-size:0;background-image:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible">${crown}</svg>`)}")}
.ashbar{height:12px;background:rgba(255,255,255,.08)}.ashbar i{background:linear-gradient(90deg,#ff4a10,#ffd84a)}.ashbar.king i{background:linear-gradient(90deg,#8a0a0a,#ff4a10)}
.ashboss{display:grid;grid-template-columns:96px minmax(0,1fr);gap:12px;align-items:center;background:linear-gradient(135deg,#2a0a04,#120a14 70%)!important;border-color:rgba(255,106,26,.45)!important}.ashpt{width:96px;height:96px;border-radius:14px;overflow:hidden}.ashpt svg,.ashpt img{width:100%;height:100%;display:block}
.ashhd{background:radial-gradient(120% 140% at 80% 0%,rgba(255,106,26,.35),transparent 60%),var(--panel)!important}
.ashshop{display:grid;grid-template-columns:repeat(auto-fill,minmax(130px,1fr));gap:8px;margin-top:8px}.ashit{display:flex;flex-direction:column;align-items:center;gap:3px;padding:10px 6px;border-radius:12px;background:var(--panel2);border:1px solid rgba(255,106,26,.3);color:var(--fg);cursor:pointer;text-align:center}.ashit:disabled{opacity:.5;cursor:default}.ashit .ic{font-size:22px}.ashit b{font-size:12px}.ashit small{font-size:11px;opacity:.8}`;document.head.appendChild(st);
 if(ashOn())TITLES.push({k:'cendres',n:'Pourfendeur de Cendres',c:'#ff6a1a',d:"Événement « L'Éveil du Roi de Cendre »",ok:()=>!!(S.ash&&S.ash.tt)})}catch(e){}
try{Object.assign(I18N_EN,{"🔥 L'Éveil du Roi de Cendre":"🔥 Rise of the Ash King","Éveil du Roi de Cendre":"Rise of the Ash King","Roi de Cendre":"Ash King","LA MARCHE DES CENDRES":"THE ASH MARCH","LE REQUIEM DES MILLE ANS":"REQUIEM OF A THOUSAND YEARS","ÉVÉNEMENT TERMINÉ":"EVENT OVER","🛒 Boutique des Braises":"🛒 Ember Shop","🏆 Dégâts sur le Roi":"🏆 Damage on the King","BOSS MONDIAL":"WORLD BOSS","Éryndel le Roi de Cendre":"Éryndel the Ash King","Éryndel, le Roi de Cendre":"Éryndel, the Ash King","Cadre « Couronne de Cendres »":"\"Ash Crown\" frame","Titre « Pourfendeur de Cendres »":"\"Ashslayer\" title","Pourfendeur de Cendres":"Ashslayer","Couronne de Cendres":"Ash Crown","Braises éternelles":"Eternal Embers","Requiem des Mille Ans":"Requiem of a Thousand Years","Repousse le Premier Porteur":"Drive back the First Bearer"})}catch(e){}
