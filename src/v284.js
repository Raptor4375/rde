
/* ================= boss mondial coopératif + coffre de guilde partagé ================= */
const WBOSS=[
 {n:'Kraken Céleste',h:200,ic:'🦑',sk:{n:'Tentacules du Ciel',tg:'all',fx:{dmg:105,stun:15}},d:"Un kraken géant qui nage entre les nuages. Ses tentacules s'abattent sur tout le royaume."},
 {n:"Colosse d'Éther",h:265,ic:'🗿',sk:{n:'Poing de Cristal',tg:'all',fx:{dmg:115,weak:1}},d:"Un géant de cristal réveillé par trop de magie. Chaque coup fait trembler la terre."},
 {n:'Hydre du Néant',h:285,ic:'🐲',sk:{n:'Trois Souffles',tg:'all',fx:{dmg:95,dot:25}},d:"Une hydre aux trois têtes venue d'une autre dimension. Son souffle empoisonne tout."}];
const WB_AT=3;
function wbHpCalc(){let m=0;try{m=teamPower()}catch(e){}try{for(const r of realRows())m=Math.max(m,r.pw||0)}catch(e){}let b=S.wbBest||0;try{const X=S.wb;if(X&&X.dmg&&X.at<WB_AT)b=Math.max(b,X.dmg/(WB_AT-X.at))}catch(e){}try{for(const r of WBN.docs)b=Math.max(b,r.best||0)}catch(e){}return Math.max(12e6,Math.round(Math.max(m*45,b*12)/1e6)*1e6)}
function wbHp(){const X=WBS();if(!X.hp)X.hp=wbHpCalc();return X.hp}
function wbDay(){return today()}
function wbIdx(d){d=d||wbDay();let h=0;for(const c of d)h=(h*31+c.charCodeAt(0))%997;return h%WBOSS.length}
function wbDef(d){return WBOSS[wbIdx(d)]}
function WBS(){const d=wbDay();if(!S.wb||typeof S.wb!=='object')S.wb={d,at:WB_AT,dmg:0,hist:{}};const X=S.wb;X.hist=X.hist||{};if(X.d!==d){if(X.dmg>0){let tot=X.dmg;try{tot+=(X.hp||12e6)*.62;if(WBN.d===X.d)tot+=WBN.docs.reduce((a,b)=>a+(b.dmg||0),0)}catch(e){}X.hist[X.d]={dmg:X.dmg,dead:tot>=(X.hp||12e6),cl:0}}for(const k of Object.keys(X.hist))if(k<d&&Object.keys(X.hist).length>4)delete X.hist[k];X.d=d;X.at=WB_AT;X.dmg=0;X.hp=0;X.cl=0}return X}
const WBN={docs:[],t:0,d:''};
async function wbLoad(force){try{if(!NET.on||!NET.db)return;const d=wbDay();if(!force&&WBN.d===d&&Date.now()-WBN.t<45000)return;let docs=[];
  try{const s=await NET.db.collection('wboss').where('d','==',d).get();docs=s.docs.map(x=>({id:x.id,...x.data()}))}catch(e){const s=await NET.db.collection('wboss').get();docs=s.docs.map(x=>({id:x.id,...x.data()})).filter(x=>x.d===d)}
  const meta=docs.find(x=>x.id==='meta_'+d);const X=WBS();if(meta&&meta.hp)X.hp=meta.hp;else if(NET.canWrite){try{await NET.db.doc('wboss/meta_'+d).set({d,hp:wbHp(),meta:1,t:Date.now()})}catch(e){}}
  WBN.docs=docs.filter(x=>x&&x.pid!==NET.pid&&!x.meta);WBN.t=Date.now();WBN.d=d;if(TAB==='boss'&&UI.lz&&UI.lz.boss==='wb'&&!B&&!$('#ovl').innerHTML)render()}catch(e){}}
async function wbPush(){try{if(!NET.on||!NET.canWrite||!NET.pid)return;const X=WBS();if(!X.dmg)return;await NET.db.doc('wboss/'+X.d+'_'+NET.pid).set({d:X.d,pid:NET.pid,n:S.name||'Voyageur',g:S.rgid||S.gid||null,dmg:X.dmg,best:S.wbBest||0,t:Date.now()})}catch(e){}}
setTimeout(()=>wbLoad(true),6000);setInterval(()=>{if(TAB==='boss')wbLoad()},50000);
/* les bots du royaume tapent aussi, petit à petit pendant la journée */
function wbBots(d){d=d||wbDay();const now=new Date();const st=new Date(now.getFullYear(),now.getMonth(),now.getDate()).getTime();const p=d===wbDay()?Math.min(1,(Date.now()-st)/864e5):1;
  const R=rng(wbIdx(d)*7919+d.length);let names=[];try{names=(S.world&&S.world.players||[]).map(x=>x.n).filter(Boolean)}catch(e){}if(names.length<8)names=names.concat(['Kiwi','Malo_92','Sushi','Pandaroux','Titou','Krabbe','Valou','Nounours','Drogo92','Mina']);
  const out=[];let tot=0;for(let i=0;i<14;i++){const w=.4+R()*1.6;out.push({n:names[Math.floor(R()*names.length)]+'',w,bot:1})}const sw=out.reduce((a,b)=>a+b.w,0);
  const share=wbHp()*.62*Math.pow(p,.85);for(const o of out){o.dmg=Math.round(share*o.w/sw);tot+=o.dmg}return{list:out,tot}}
function wbTotals(){const X=WBS(),B2=wbBots();const reals=WBN.d===X.d?WBN.docs:[];const rows=[...B2.list.map(b=>({n:b.n,dmg:b.dmg,bot:1})),...reals.map(r=>({n:r.n,dmg:r.dmg||0,real:1}))];if(X.dmg)rows.push({n:S.name||'Toi',dmg:X.dmg,me:1});
  const seen=new Map();for(const r of rows){const k=r.n+(r.me?'#me':'');if(!seen.has(k)||seen.get(k).dmg<r.dmg)seen.set(k,r)}const L=[...seen.values()].sort((a,b)=>b.dmg-a.dmg);const tot=L.reduce((a,b)=>a+b.dmg,0);return{rows:L,tot,dead:tot>=wbHp()}}
const WBX={go:false,active:false};
{const eb=evBattle;evBattle=function(){if(!WBX.go)return eb.apply(this,arguments);WBX.go=false;const X=WBS(),s=wbDef();if(X.at<=0){toast("Plus d'attaque contre le boss mondial aujourd'hui (3 par jour).");return null}if(wbTotals().dead){toast('Le boss mondial est déjà vaincu aujourd\'hui ! Récupère ta récompense.');return null}
  X.at--;WBX.active=true;const g=Math.pow(GROW,S.max);const f=[foeUnit(0,{name:s.n,boss:1,raid:1,max:1e13,atk:Math.round(72*g),def:46,spd:99,port:monArt(s.n,s.h,true),sk:s.sk})];
  return{foes:f,title:s.n,sub:'Boss mondial · 12 tours',maxR:12,wc:s.h}}}
{const ef=evFinish;evFinish=function(dmg,rw){if(!WBX.active)return ef.apply(this,arguments);WBX.active=false;const X=WBS();X.dmg+=dmg;S.wbBest=Math.max(S.wbBest||0,dmg);q('boss');
  const g=Math.round(Math.min(dmg/4,16000*(1+(S.max||1)/10))*goldMul());S.gold+=g;rw.push(GOLD+fmt(g)+' or');const T=wbTotals();
  rw.push(`🌍 Le royaume a infligé ${fmt(Math.min(T.tot,wbHp()))} / ${fmt(wbHp())} dégâts`);if(T.dead)rw.push('💀 Le boss mondial est vaincu ! Va chercher ta récompense.');
  setTimeout(wbPush,300);return'Attaque terminée'}}
function wbReward(top){const m=Math.max(1,S.max||1);return{gems:80+(top?60:0),gold:Math.round(30000*(1+m/8)),shard:top?1:0}}
function wbClaimable(){const X=WBS(),T=wbTotals();if(X.dmg>0&&T.dead&&!X.cl)return'today';for(const [d,h] of Object.entries(X.hist||{}))if(!h.cl&&h.dmg>0&&h.dead)return d;return null}
function wbClaim(){const X=WBS(),k=wbClaimable();if(!k)return;let top=false,dead=true;if(k==='today'){const T=wbTotals();const i=T.rows.findIndex(r=>r.me);top=i>=0&&i<10;X.cl=1}else{const h=X.hist[k];h.cl=1}
  const r=wbReward(top);const half=false;const gm=half?Math.round(r.gems/2):r.gems,go=half?Math.round(r.gold/2):r.gold;S.gems+=gm;S.gold+=go;if(r.shard)S.shards+=r.shard;
  const it=dropItem(Math.max(2,rollRarity(Math.ceil(m10())||1,2)));save();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="xres ok"><div class="xresi">🌍</div><div class="h">Victoire du royaume !</div><p class="sub">Tous ensemble, vous avez abattu le boss mondial.${top?' Tu fais partie du <b>top 10</b> des dégâts !':''}</p><div class="xrw"><div>${GEM}${gm} gemmes</div><div>${GOLD}${fmt(go)} or</div>${r.shard?`<div>${SHARD}1 éclat légendaire</div>`:''}<div>${itemChip(it)}</div></div><button class="btn p" data-a="close" style="margin-top:10px;width:100%">Génial !</button></div>`);render()}
function m10(){return Math.ceil((S.max||1)/10)}
function wbPage(){const X=WBS(),s=wbDef(),T=wbTotals(),p=Math.min(100,T.tot/wbHp()*100),cl=wbClaimable();
  const me=T.rows.findIndex(r=>r.me);
  const rk=T.rows.slice(0,10).map((r,i)=>`<div class="wbr ${r.me?'me':''}"><b class="num">${['🥇','🥈','🥉'][i]||i+1}</b><span>${esc(r.n)}${r.me?' (toi)':''}${r.real&&!r.me?' <i class="wbreal">JOUEUR</i>':''}</span><span class="num">${fmt(r.dmg)}</span></div>`).join('');
  const now=new Date(),mid=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1).getTime();
  return`<div class="card wbcard"><div class="wbart">${monArt(s.n,s.h,true)}${T.dead?'<div class="wbdead">VAINCU</div>':''}</div><div style="text-align:center"><div class="h" style="margin:0">${s.ic} ${esc(s.n)}</div><div class="muted" style="font-size:12.5px">Boss mondial du jour · tout le royaume contre lui · nouveau boss dans ${expLeft(mid-Date.now())}</div></div>
   <p style="font-size:13.5px;margin:8px 0">${esc(s.d)}</p>
   <div class="bar wbhp"><i style="width:${(100-p).toFixed(1)}%"></i></div><div class="row" style="justify-content:space-between;font-size:12px;margin-top:3px"><span class="muted">${fmt(Math.max(0,wbHp()-T.tot))} PV restants</span><b>${p.toFixed(1)} % vaincu</b></div>
   ${cl?`<button class="btn g" data-a="wbclaim" style="width:100%;margin-top:10px">🎁 Récupérer ta récompense</button>`:''}
   <div class="row" style="margin-top:10px;gap:8px;align-items:center"><button class="btn p" data-a="wbgo" ${X.at>0&&!T.dead?'':'disabled'}>⚔️ Attaquer (${X.at}/${WB_AT})</button><span class="muted" style="font-size:12px">Tes dégâts : <b>${fmt(X.dmg)}</b>${me>=0?` · ${me+1}e`:''}</span></div></div>
   <div class="card"><div class="h3" style="margin:0">🏆 Top 10 des dégâts</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Si le boss tombe avant minuit, tous ceux qui l'ont attaqué gagnent ${GEM}80, de l'or et un équipement. Le top 10 gagne en plus ${GEM}60 et ${SHARD}1 éclat légendaire.</p><div class="wbrk">${rk||'<p class="muted">Personne n\'a encore attaqué.</p>'}</div></div>`}
{const pc=pCombat;pCombat=function(){if(UI.lz&&UI.lz.boss==='wb')return`<div class="stack">${zoneBar('boss','wb')}${wbPage()}</div>`;return pc.apply(this,arguments)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="wbgo"],[data-a="wbclaim"]');if(!t)return;e.preventDefault();e.stopPropagation();if(t.dataset.a==='wbclaim')return wbClaim();WBX.go=true;WBX.active=false;try{startBattle('event')}finally{WBX.go=false}},true);
function wbBuilding(){const O='stroke="#140c24" stroke-width="1.4"';return`<path d="M-34 0L-26 -30L-30 -54L-14 -48L-8 -74L4 -56L16 -70L20 -46L34 -52L28 -26L36 0Z" fill="#5a4a7a" ${O}/><path d="M-20 0Q-22 -40 0 -46Q22 -40 20 0Z" fill="#2a0a4a" ${O}/>
 <g><ellipse cx="0" cy="-22" rx="14" ry="20" fill="#8a3aff" opacity=".85"><animate attributeName="rx" values="14;16;14" dur="2s" repeatCount="indefinite"/></ellipse><ellipse cx="0" cy="-22" rx="8" ry="13" fill="#e0b0ff"><animate attributeName="opacity" values=".6;1;.6" dur="1.4s" repeatCount="indefinite"/></ellipse></g>
 <path d="M-4 -28l-3 -6M4 -28l3 -6" stroke="#fff" stroke-width="1.6"/><circle cx="-4" cy="-24" r="1.8" fill="#ff3a5a"><animate attributeName="opacity" values="1;1;0;1" dur="3s" repeatCount="indefinite"/></circle><circle cx="4" cy="-24" r="1.8" fill="#ff3a5a"><animate attributeName="opacity" values="1;1;0;1" dur="3s" repeatCount="indefinite"/></circle>
 ${[-26,26].map(x=>`<path d="M${x} -6l-4 -18l4 -10l4 10z" fill="#b8a0ff" ${O}/>`).join('')}`}
{const pl=LOBS.boss.places;LOBS.boss.places=function(){const P=pl.apply(this,arguments);if(P.some(p=>p.k==='wb'))return P;const X=(()=>{try{return WBS()}catch(e){return{at:0}}})();
  const pos={arena:[58,.82],raid:[160,.82],tower:[352,.85]};for(const p of P)if(pos[p.k]){p.x=pos[p.k][0];p.s=pos[p.k][1]}
  P.push({k:'wb',ic:'🌍',n:'Faille du boss mondial',sn:'Monde',d:'Tout le royaume contre un boss géant',b:wbBuilding,x:262,y:210,s:.95,bw:76,bh:76,badge:()=>wbClaimable()?'!':(X.at||0)});return P}}
/* illustrations */
MONS['Kraken Céleste']=()=>{const O='#170f2a';return`<circle cx="50" cy="40" r="42" fill="#8ad8ff" opacity=".12"/>${[[-1,20],[1,20],[-1,36],[1,36]].map(([s,y])=>`<path d="M50 60Q${50+s*30} ${y+40} ${50+s*42} ${y+60}Q${50+s*46} ${y+66} ${50+s*40} ${y+64}Q${50+s*26} ${y+50} 50 66Z" fill="#7a5ad8" stroke="${O}" stroke-width="1.6"/>`).join('')}<ellipse cx="50" cy="40" rx="24" ry="28" fill="#9a7aff" stroke="${O}" stroke-width="1.8"/><ellipse cx="44" cy="28" rx="8" ry="6" fill="#c8b8ff" opacity=".7"/><circle cx="41" cy="46" r="6" fill="#fff6a0" stroke="${O}" stroke-width="1.4"/><circle cx="59" cy="46" r="6" fill="#fff6a0" stroke="${O}" stroke-width="1.4"/><path d="M39 46h4M57 46h4" stroke="${O}" stroke-width="2.4"/><path d="M44 58Q50 62 56 58" stroke="${O}" stroke-width="1.6" fill="none"/>${[[14,20],[86,16],[20,70]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="3.5" fill="#fff" opacity=".8"/>`).join('')}`};
MONS["Colosse d'Éther"]=()=>{const O='#170f2a';return`<path d="M22 100L28 62L72 62L78 100Z" fill="#6a8ad8" stroke="${O}" stroke-width="1.8"/><path d="M28 62L8 72L12 94L24 90Z M72 62L92 72L88 94L76 90Z" fill="#8aa8f0" stroke="${O}" stroke-width="1.6"/><path d="M32 64L50 30L68 64Z" fill="#b8d8ff" stroke="${O}" stroke-width="1.8"/><path d="M50 30L42 18L50 4L58 18Z" fill="#e0f0ff" stroke="${O}" stroke-width="1.6"/><path d="M42 48l6 3l-6 3zM58 48l-6 3l6 3z" fill="#ff5a8a"/><path d="M36 80L64 80M40 90L60 90" stroke="#3a5ab0" stroke-width="2"/><path d="M50 64V100" stroke="#3a5ab0" stroke-width="1.4"/>${[[18,40],[82,36],[50,90]].map(([x,y])=>`<path d="M${x} ${y-4}l2 4l-2 4l-2 -4z" fill="#fff"/>`).join('')}`};
MONS['Hydre du Néant']=()=>{const O='#170f2a';const head=(x,y,r)=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-10 0Q-12 -14 0 -16Q12 -14 10 0Q6 8 0 8Q-6 8 -10 0Z" fill="#3a2a6a" stroke="${O}" stroke-width="1.6"/><circle cx="-4" cy="-6" r="2.2" fill="#7aff8a"/><circle cx="4" cy="-6" r="2.2" fill="#7aff8a"/><path d="M-5 4l2 3l2 -3l2 3l2 -3" stroke="#fff" stroke-width="1" fill="none"/><path d="M-6 -14l-4 -8M6 -14l4 -8" stroke="${O}" stroke-width="2"/></g>`;return`<path d="M20 100Q22 70 50 66Q78 70 80 100Z" fill="#2a1a4a" stroke="${O}" stroke-width="1.8"/><path d="M40 70Q24 50 26 32M50 66V26M60 70Q76 50 74 32" stroke="#3a2a6a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M40 70Q24 50 26 32M50 66V26M60 70Q76 50 74 32" stroke="${O}" stroke-width="1" fill="none" opacity=".5"/>${head(26,30,-15)}${head(50,24,0)}${head(74,30,15)}<circle cx="50" cy="86" r="6" fill="#7aff8a" opacity=".5"/>`};

/* ---------- coffre de guilde partagé ---------- */
const GCH_T=[[120,'Coffre en bois','🧰'],[300,'Coffre en argent','🪙'],[600,"Coffre en or",'💰'],[1000,'Coffre légendaire','👑']];
function gchWeek(){const d=new Date();const day=(d.getDay()+6)%7;const m=new Date(d.getFullYear(),d.getMonth(),d.getDate()-day);return m.getFullYear()+'-'+(m.getMonth()+1)+'-'+m.getDate()}
function gchGid(){return S.rgid||S.gid||null}
function gchBotPts(){const g=gchGid();if(!g)return 0;let n=0;try{if(S.rgid)n=((NET.guilds[S.rgid]||{}).bots||[]).length;else n=gMembers(S.gid).length}catch(e){}const d=new Date();const day=(d.getDay()+6)%7;const p=(day+(d.getHours()*60+d.getMinutes())/1440)/7;return Math.round(n*130*p)}
function gchState(){S.gch=S.gch&&S.gch.w===gchWeek()&&S.gch.g===gchGid()?S.gch:{w:gchWeek(),g:gchGid(),mine:0,cl:[]};return S.gch}
function gchShared(){try{if(S.rgid){const c=(NET.guilds[S.rgid]||{}).chest;if(c&&c.w===gchWeek())return c.p||0;return 0}}catch(e){}return gchState().mine}
function gchTotal(){return gchShared()+gchBotPts()}
async function gchAdd(n){const g=gchGid();if(!g||!n)return;const X=gchState();X.mine+=n;save();if(S.rgid&&NET.on&&NET.canWrite){try{const w=gchWeek();await realGuildUpdate(d=>{const c=d.chest&&d.chest.w===w?d.chest:{w,p:0};return{chest:{w,p:(c.p||0)+n}}})}catch(e){}}}
function gchClaimN(){const X=gchState(),t=gchTotal();return GCH_T.filter((c,i)=>t>=c[0]&&!X.cl.includes(i)).length}
function gchRew(i){const m=Math.max(1,S.max||1);return{gems:[30,60,100,180][i],gold:Math.round([15000,30000,60000,100000][i]*(1+m/10)),coins:[40,80,120,200][i],shard:i===3?1:0}}
function gchClaim(i){const X=gchState();if(X.cl.includes(i)||gchTotal()<GCH_T[i][0])return;X.cl.push(i);const r=gchRew(i);S.gems+=r.gems;S.gold+=r.gold;S.gcoins=(S.gcoins||0)+r.coins;if(r.shard)S.shards+=r.shard;save();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="xres ok"><div class="xresi">${GCH_T[i][2]}</div><div class="h">${GCH_T[i][1]} ouvert !</div><p class="sub">Merci à toute la guilde pour ses efforts de la semaine.</p><div class="xrw"><div>${GEM}${r.gems} gemmes</div><div>${GOLD}${fmt(r.gold)} or</div><div>${COIN}${r.coins} pièces de guilde</div>${r.shard?`<div>${SHARD}1 éclat légendaire</div>`:''}</div><button class="btn p" data-a="close" style="margin-top:10px;width:100%">Super !</button></div>`);render()}
function gchCard(){if(!gchGid())return'';const X=gchState(),t=gchTotal(),max=GCH_T[GCH_T.length-1][0],p=Math.min(100,t/max*100);
  const nodes=GCH_T.map(([v,n,ic],i)=>{const ok=t>=v,got=X.cl.includes(i);return`<button class="gchn ${ok?'ok':''} ${got?'got':''}" style="left:${v/max*100}%" data-a="gchopen" data-v="${i}" ${ok&&!got?'':'disabled'} aria-label="${n}"><span>${got?'✅':ic}</span><small>${v}</small></button>`}).join('');
  return`<div class="card gchcard"><div class="row" style="justify-content:space-between;align-items:center;gap:8px"><div class="h3" style="margin:0">🎁 Coffre de guilde</div><span class="muted" style="font-size:12px">Remis à zéro chaque lundi</span></div>
   <p class="muted" style="font-size:12.5px;margin:4px 0 10px">Tout le monde remplit la jauge ensemble : expédition réussie <b>+10</b>, ratée <b>+4</b>, trinquer <b>+5</b>, attaque du golem, du boss de saison ou du boss mondial <b>+3</b>. Chaque coffre atteint peut être ouvert par tous les membres.</p>
   <div class="gchbar"><i style="width:${p.toFixed(1)}%"></i>${nodes}</div><div class="row" style="justify-content:space-between;font-size:12px;margin-top:22px"><span><b>${fmt(t)}</b> points cette semaine</span><span class="muted">dont ${fmt(X.mine)} grâce à toi</span></div></div>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="gchopen"]');if(!t)return;e.preventDefault();e.stopPropagation();gchClaim(+t.dataset.v)},true);
/* les contributions */
{const ec=expClaim;expClaim=function(i){const a=EXPS().act[i];const ok=a&&a.t1<=Date.now();ec.apply(this,arguments);if(ok)try{gchAdd(a.ok?10:4)}catch(e){}}}
{const gt=ghToast;ghToast=async function(){const was=ghToastDone();const r=await gt.apply(this,arguments);if(!was&&ghToastDone())try{gchAdd(5)}catch(e){}return r}}
{const ea=evAfter;evAfter=function(win,rw){try{if(B&&(B.mode==='guild'||(B.mode==='event'&&/Boss (mondial|de saison)/.test(B.sub||''))))gchAdd(3)}catch(e){}return ea.apply(this,arguments)}}
/* dans le Grand hall, juste sous la salle des banquets */
{const gs=ghScene;ghScene=function(){return gs.apply(this,arguments)+gchCard()}}
{const pl=LOBS.guilde.places;LOBS.guilde.places=function(){const P=pl.apply(this,arguments);const a=P.find(p=>p.k==='hall');if(a){const ob=a.badge;a.badge=()=>gchClaimN()||(ob?ob():0)}return P}}
PATCH.unshift({v:26.8,d:'19 octobre 2026',t:'Tous ensemble !',items:[
 "🌍 <b>Boss mondial</b> : un boss géant chaque jour, dans la Faille du Quartier des combats. Tout le royaume tape dessus ensemble (3 attaques par jour). S'il tombe avant minuit, tous les participants sont récompensés, et le top 10 gagne un éclat légendaire.",
 "🎁 <b>Coffre de guilde</b> dans le Grand hall : expéditions, toasts et attaques de boss remplissent une jauge commune. 4 coffres à ouvrir chaque semaine pour tous les membres.",
 "📖 <b>Histoires des héros</b> : chaque héros a son histoire en 3 chapitres, débloqués aux niveaux 5, 20 et 40. Des gemmes et un éclat légendaire à la clé. Les légendaires ont leur propre histoire.",
 "💞 <b>Affinités</b> : 16 groupes de héros qui se connaissent (Frères d'armes, Feu et Glace, Soleil et Lune…) deviennent plus forts dans la même équipe, avec une réplique en début de combat."]});
