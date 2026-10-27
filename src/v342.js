
/* ================= GUERRE DES GUILDES · conquête des royaumes ================= */
/* À chaque saison du pass :
   J1-2  préparation : on pose ses équipes dans les royaumes libres (ou ceux de sa guilde)
   J3-4  conquête : on attaque les royaumes des autres guildes, combat en chaîne contre les équipes posées
   J5    finale : seules les 2 guildes qui tiennent le plus de royaumes peuvent prendre la Capitale
   ensuite la guilde gagnante tient la capitale jusqu'à la fin de la saison.
   Règles : une équipe posée ne bouge plus ; chaque héros ne peut être posé qu'une fois ; une équipe battue est retirée
   et ses héros sont blessés jusqu'au lendemain ; 3 attaques par jour ; un joueur inactif défend moins bien (-30 % après 24 h, retiré après 48 h). */
const GW_ON=s=>s>=2,GW_ATK=3,GW_MAXT=12;
const GTER=[0,1,2,3,4,5,6,7].map(i=>({k:'t'+i,i,n:WORLDS[i].n,h:WORLDS[i].h,bn:[['hp',8,'+8 % PV'],['def',8,'+8 % DÉF'],['atk',6,'+6 % ATQ'],['hp',10,'+10 % PV'],['spd',5,'+5 VIT'],['def',10,'+10 % DÉF'],['atk',8,'+8 % ATQ'],['hp',6,'+6 % PV, +3 VIT']][i]}));
const GCAP={k:'cap',n:"Capitale d'Éther",h:45,bn:['hp',12,'+12 % PV'],cap:1};
const gterOf=k=>k==='cap'?GCAP:GTER.find(t=>t.k===k);
function gwSeason(){return passIdx()}
function gwT(s=gwSeason()){const a=passStartAt(s);return{a,w:a+2*864e5,f:a+4*864e5,e:a+5*864e5,z:passEndAt(s)}}
function gwPhase(s=gwSeason()){if(!GW_ON(s))return'old';const T=gwT(s),t=Date.now();return t<T.w?'prep':t<T.f?'war':t<T.e?'final':'hold'}
const gwDay=()=>dayKey(Date.now());
function GWS(){const s=gwSeason();if(!S.gw||S.gw.s!==s||!S.gw.v2)S.gw={s,v2:1,ad:{d:'',n:0},mine:{},wd:{},kills:0,caps:0,rw:0,g:null};return S.gw}
const GWD={m:{},t:0,busy:0,fin:null,sim:null};
const gdoc=k=>'avwar/gw'+gwSeason()+'_'+k;
async function gwLock(k,on){const r=NET.db.doc(gdoc(k));for(let i=0;i<8;i++){try{const l=await r.acquire({holder:NET.pid||'x',ttlMs:on?9000:1});if(l&&l.acquired)return true}catch(e){}await wait(500+Math.random()*400)}return false}
async function gwRead(k){try{const s=await NET.db.doc(gdoc(k)).get();const d=s&&s.exists?s.data():null;return d&&typeof d==='object'?Object.assign({own:null,tr:{},bd:{}},d):{own:null,tr:{},bd:{}}}catch(e){return null}}
async function gwWrite(k,d){d.t=Date.now();await NET.db.doc(gdoc(k)).set(d);GWD.m[k]=d}
async function gwLoadAll(){if(!NET.on||!NET.db||GWD.busy)return;GWD.busy=1;try{const ks=[...GTER.map(t=>t.k),'cap'];const R=await Promise.all(ks.map(gwRead));ks.forEach((k,i)=>{if(R[i])GWD.m[k]=R[i]});GWD.t=Date.now();gwMineSync()}catch(e){}finally{GWD.busy=0}}
/* mes équipes disparues = battues : héros blessés jusqu'à demain */
function gwMineSync(){const G=GWS();let ch=false;for(const id in G.mine){const x=G.mine[id],d=GWD.m[x.k];if(!d)continue;if(!d.tr||!d.tr[id]){(G.wd[gwDay()]=G.wd[gwDay()]||[]).push(...x.ids);delete G.mine[id];ch=true;try{toast(`🛡️ Ton équipe de ${gterOf(x.k).n} a été battue : ses héros se reposent jusqu'à demain.`)}catch(e){}}}if(ch)save()}
const gwPosted=()=>{const G=GWS(),o=new Set();for(const id in G.mine)for(const h of G.mine[id].ids)o.add(h);return o};
const gwWounded=()=>new Set(GWS().wd[gwDay()]||[]);
/* --- activité d'un défenseur --- */
function gwActMul(tr){if(!tr||tr.bot)return 1;const P=NET.players&&NET.players[tr.p];const t=(P&&P.t)||tr.at||0;const h=(Date.now()-t)/36e5;return h>48?0:h>24?.7:1}
const gwAlive=(d)=>Object.entries((d&&d.tr)||{}).filter(([id,tr])=>gwActMul(tr)>0);
/* --- résumé par guilde --- */
function gwOwnerCount(){const C={};for(const t of GTER){const d=GWD.m[t.k];if(d&&d.own)C[d.own]=(C[d.own]||0)+1}return C}
function gwGuildName(g){return(NET.guilds[g]||{}).n||(g===S.rgid?'Ma guilde':'Guilde')}
function gwColor(g){if(!g)return'#5a5470';if(g===S.rgid)return'#ffd84a';const h=Math.floor(hash01(g,'col')*360);return`hsl(${h} 70% 58%)`}
function gwFinalists(){const fin=GWD.m.cap&&GWD.m.cap.fin;if(fin&&fin.length)return fin;const C=gwOwnerCount();return Object.entries(C).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0])}
/* --- les guildes de bots jouent aussi (simulation partagée, heure par heure) --- */
function gwBotPool(){const P=[];for(const r of botRows()){if(!r.gidr||!(r.team||[]).length)continue;let tm;try{tm=npcTeam(r)}catch(e){tm=[]}if(tm.length)P.push({id:'b'+r.bid,n:r.n,g:r.gidr,pw:r.pw,team:tm.map(x=>({id:x.id,l:x.l,e:x.e,u:x.u||0})),act:r.act||.2})}return P}
async function gwSim(){const s=gwSeason();if(!GW_ON(s)||!NET.on||!NET.canWrite||GWD.simB)return;const T=gwT(s),now=Math.min(Date.now(),T.e);if(now<T.a)return;GWD.simB=1;
  try{const l=await NET.db.doc(gdoc('sim')).acquire({holder:NET.pid||'x',ttlMs:60000});if(!l.acquired)return;const sd=await NET.db.doc(gdoc('sim')).get();const meta=sd&&sd.exists?sd.data():{h:-1};
    const H=Math.floor((now-T.a)/36e5);if(H<=meta.h)return;await gwLoadAll();const M={};for(const t of [...GTER,GCAP]){M[t.k]=GWD.m[t.k]||{own:null,tr:{},bd:{}};M[t.k].tr=M[t.k].tr||{};M[t.k].bd=M[t.k].bd||{}}
    const pool=gwBotPool();const where=()=>{const o={};for(const k in M)for(const id in M[k].tr)o[id]=k;return o};
    for(let h=Math.max(meta.h+1,H-48);h<=H;h++){const t=T.a+h*36e5,ph=t<T.w?'prep':t<T.f?'war':'final',day=dayKey(t),R=rng(s*100000+h*7+3);
      if(ph==='final'&&!M.cap.fin){const C={};for(const x of GTER)if(M[x.k].own)C[M[x.k].own]=(C[M[x.k].own]||0)+1;M.cap.fin=Object.entries(C).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0])}
      let W=where();const byG={};for(const b of pool)(byG[b.g]=byG[b.g]||[]).push(b);
      for(const g in byG){const bots=byG[g];
        /* 1) poser les bots libres */
        const fin=M.cap.fin||[];const okCap=ph==='final'&&fin.includes(g);
        let home=GTER.filter(x=>M[x.k].own===g&&Object.keys(M[x.k].tr).length<GW_MAXT).map(x=>x.k);if(okCap&&(!M.cap.own||M.cap.own===g))home.unshift('cap');
        if(!home.length){const free=GTER.filter(x=>!M[x.k].own);const pr=ph==='prep'?(free.length>4?.06:0):.2;if(free.length&&R()<pr){const k=free[Math.floor(R()*free.length)].k;M[k].own=g;home=[k]}}
        for(const b of bots){if(W[b.id]||M_dead(M,b.id,day))continue;if(R()>b.act*.5)continue;const k=home[Math.floor(R()*home.length)];if(!k||Object.keys(M[k].tr).length>=GW_MAXT)continue;M[k].tr[b.id]={n:b.n,g,bot:1,pw:b.pw,team:b.team,at:t};W[b.id]=k}
        /* 2) attaquer */
        if(ph==='prep')continue;if(R()>.22)continue;let tg;
        if(ph==='final'&&okCap&&M.cap.own&&M.cap.own!==g)tg='cap';else{const opts=GTER.filter(x=>M[x.k].own&&M[x.k].own!==g);if(!opts.length)continue;opts.sort((a,b)=>Object.keys(M[a.k].tr).length-Object.keys(M[b.k].tr).length);tg=opts[Math.floor(R()*Math.min(3,opts.length))].k}
        const atk=bots.filter(b=>!W[b.id]&&!M_dead(M,b.id,day)).sort((a,b)=>b.pw-a.pw)[0]||bots.sort((a,b)=>b.pw-a.pw)[0];if(!atk)continue;
        let st=atk.pw*(.85+R()*.4)*1.6;const defs=Object.entries(M[tg].tr).sort((a,b)=>a[1].pw-b[1].pw);
        for(const [id,tr] of defs){const m=gwActMul(tr);if(m<=0){delete M[tg].tr[id];continue}const dp=tr.pw*m*(1+(gterOf(tg).bn[1]||0)/100);if(st>dp){delete M[tg].tr[id];if(tr.bot)M[tg].bd[id]=day;st-=dp*.55}else break}
        if(!Object.keys(M[tg].tr).length){M[tg].own=g;M[tg].tk=t}
        W=where()}}
    for(const k in M){await NET.db.doc(gdoc(k)).set(Object.assign(M[k],{t:Date.now()}));GWD.m[k]=M[k]}await NET.db.doc(gdoc('sim')).set({h:H,t:Date.now()});gwMineSync()}catch(e){console.warn('gwSim',e)}finally{GWD.simB=0}}
function M_dead(M,id,day){for(const k in M)if(M[k].bd&&M[k].bd[id]===day)return true;return false}
setTimeout(()=>{if(GW_ON(gwSeason())){gwLoadAll();setTimeout(gwSim,4000)}},6000);setInterval(()=>{if(GW_ON(gwSeason())&&gwPhase()!=='hold'){gwSim()}},5*60000);
setInterval(()=>{if(GW_ON(gwSeason())&&TAB==='event'&&UI.lz&&UI.lz.event==='av'&&!B)gwLoadAll().then(()=>{if(!B&&!$('#ovl').innerHTML){const y=scrollY;render();scrollTo(0,y)}})},60000);
/* --- poser une équipe --- */
function gwCanPost(k){const ph=gwPhase();if(ph==='hold'||ph==='old'||!S.rgid)return false;const d=GWD.m[k];if(k==='cap'){if(ph!=='final')return false;if(!gwFinalists().includes(S.rgid))return false;return!d||!d.own||d.own===S.rgid}return!d||!d.own||d.own===S.rgid}
function gwPostModal(k){if(!gwCanPost(k))return toast(S.rgid?"Tu ne peux pas poser d'équipe ici.":'Rejoins une guilde pour participer.');const used=gwPosted(),wd=gwWounded();GWD.sel=[];
  const own=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]&&i<200).sort((a,b)=>power(heroStats(b))-power(heroStats(a)));
  const free=own.filter(i=>!used.has(i)&&!wd.has(i));
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🛡️ Poser une équipe</div><p class="sub">${esc(gterOf(k).n)} · bonus des défenseurs : <b>${gterOf(k).bn[2]}</b>. Choisis jusqu'à 5 héros. <b>Une fois posée, l'équipe ne bouge plus.</b></p>
   <div class="row" style="gap:6px;margin:4px 0 8px"><button class="btn sm" data-a="gwbest">⭐ Meilleure équipe dispo</button><span class="muted" style="font-size:12px" id="gwsel">0/5</span></div>
   <div class="grid gwpick">${own.map(i=>{const st=used.has(i)?'Déjà posé':wd.has(i)?'Blessé':'';return heroTile(HEROES[i],st?`<span class="new" style="background:#5a5470">${st}</span>`:'').replace('data-a="hero"',st?'data-a="none" disabled':'data-a="gwsel"')}).join('')}</div>
   <button class="btn p" data-a="gwpost" data-v="${k}" style="width:100%;margin-top:10px" disabled id="gwpostb">Poser l'équipe</button>`);GWD.free=free}
function gwSelPaint(){document.querySelectorAll('#ovl [data-a="gwsel"]').forEach(b=>b.classList.toggle('gwon',GWD.sel.includes(+b.dataset.v)));const s=$('#gwsel');if(s)s.textContent=GWD.sel.length+'/5';const p=$('#gwpostb');if(p)p.disabled=!GWD.sel.length}
async function gwPost(k){const ids=GWD.sel.slice(0,5);if(!ids.length||!gwCanPost(k))return;const used=gwPosted(),wd=gwWounded();if(ids.some(i=>used.has(i)||wd.has(i)))return toast('Un de ces héros est déjà posé ou blessé.');
  if(!NET.on||!NET.db||!NET.canWrite)return toast('Connexion nécessaire pour la guerre.');closeModal();toast('⏳ Déploiement…');
  if(!await gwLock(k,1))return toast('Le royaume est occupé, réessaie dans un instant.');
  try{const d=await gwRead(k);if(d.own&&d.own!==S.rgid){toast('Une autre guilde vient de prendre ce royaume !');return}if(Object.keys(d.tr).length>=GW_MAXT){toast('Ce royaume est plein (12 équipes).');return}
    const team=ids.map(i=>{const o=S.heroes[i];return{id:i,l:o.l,e:o.e||0,u:HEROES[i].r>=4?(o.u||0):0}}),pw=idsPower(ids);const id='p'+(NET.pid||'x').slice(-10)+'_'+Date.now().toString(36);
    d.own=d.own||S.rgid;d.tr[id]={p:NET.pid,n:S.name||'Voyageur',g:S.rgid,pw,team,at:Date.now()};await gwWrite(k,d);const G=GWS();G.mine[id]={k,ids};G.g=S.rgid;save();toast(`🛡️ Équipe posée dans ${gterOf(k).n} !`)}catch(e){toast('Erreur, réessaie.')}finally{gwLock(k,0)}render()}
/* --- attaquer : combat en chaîne --- */
let GWBT=null;const GCH={k:null,hp:null,done:0};
{const tb=towerBattle;towerBattle=function(f){if(GWBT){const o=GWBT;return o}return tb.apply(this,arguments)}}
function gwCanAtk(k){const ph=gwPhase();if(!S.rgid)return false;if(k==='cap')return ph==='final'&&gwFinalists().includes(S.rgid)&&(GWD.m.cap||{}).own&&GWD.m.cap.own!==S.rgid;if(ph!=='war'&&ph!=='final')return false;const d=GWD.m[k];return!!(d&&d.own&&d.own!==S.rgid)}
function gwAttack(k){const G=GWS(),day=gwDay();if(!gwCanAtk(k))return;if(G.ad.d!==day)G.ad={d:day,n:0};if(G.ad.n>=GW_ATK)return toast(`Plus d'attaque aujourd'hui (${GW_ATK} par jour). Reviens demain !`);
  G.ad.n++;G.g=S.rgid;save();GCH.k=k;GCH.hp=null;GCH.done=0;closeModal();gwNext()}
function gwNext(){const k=GCH.k,d=GWD.m[k];const L=gwAlive(d).sort((a,b)=>a[1].pw-b[1].pw);
  if(!L.length){gwCapture(k);return}
  const [id,tr]=L[0],T=gterOf(k),m=gwActMul(tr),bn=T.bn;const base=tr.team.reduce((a,t)=>a+basePow(HEROES[t.id],t.l,t.e),0)||1;const fx=clamp(tr.pw/base,.6,4)*m;
  const foes=tr.team.map((t,j)=>{const u=arenaUnit(t,j,fx);if(bn[0]==='hp'){u.max=Math.round(u.max*(1+bn[1]/100));u.hp=u.max}else if(bn[0]==='def')u.def=Math.round(u.def*(1+bn[1]/100));else if(bn[0]==='atk')u.atk=Math.round(u.atk*(1+bn[1]/100));else u.spd+=bn[1];return u});
  GWBT={foes,title:`⚔️ ${T.n} · défenseur ${GCH.done+1}/${GCH.done+L.length}`,sub:`${esc(tr.n)} (${esc(gwGuildName(tr.g))})${m<1?' · inactif −30 %':''}`,maxR:20,wc:T.h};
  try{startBattle('tower',80)}finally{GWBT=null}
  if(B&&B.mode==='tower'){B.gw={k,id};if(GCH.hp){for(const u of B.units)if(u.side===0&&GCH.hp[u.hid]!=null)u.hp=Math.min(u.max,GCH.hp[u.hid]);try{refreshUnits()}catch(e){}}}}
{const tf=towerFinish;towerFinish=function(win,rw){if(!(B&&B.gw))return tf.apply(this,arguments);const g=B.gw,G=GWS();GCH.hp={};for(const u of B.units)if(u.side===0)GCH.hp[u.hid]=Math.max(0,u.hp);
  if(win){GCH.done++;G.kills++;save();try{passAdd(30)}catch(e){}S.gold+=4000;rw.push(`🛡️ Défenseur battu (${GCH.done})`,GOLD+' 4 000 or');gwKill(g.k,g.id);const left=gwAlive(GWD.m[g.k]).filter(([id])=>id!==g.id).length;
    GCH.nx=left>0?'next':'cap';rw.push(left?`⚔️ Encore ${left} défenseur${left>1?'s':''} : continue avec les PV qu'il te reste !`:`🏴 Plus aucun défenseur : le royaume est à vous !`);return'Victoire !'}
  GCH.nx=null;rw.push('Ton équipe est tombée : l\'attaque s\'arrête ici.');return'Défaite…'}}
async function gwKill(k,id){try{const d=GWD.m[k];if(d&&d.tr)delete d.tr[id];if(!NET.on||!NET.canWrite)return;if(!await gwLock(k,1))return;try{const r=await gwRead(k);if(r.tr[id]){const tr=r.tr[id];delete r.tr[id];if(tr.bot)r.bd[id]=gwDay();await gwWrite(k,r)}else GWD.m[k]=r}finally{gwLock(k,0)}}catch(e){}}
async function gwCapture(k){const G=GWS();try{if(NET.on&&NET.canWrite&&await gwLock(k,1)){try{const r=await gwRead(k);if(!gwAlive(r).length&&r.own!==S.rgid){r.own=S.rgid;r.tr={};r.tk=Date.now();await gwWrite(k,r);G.caps++;save();try{news(Date.now(),`${S.name||'Voyageur'} a pris ${gterOf(k).n} pour ${gwGuildName(S.rgid)} !`)}catch(e){}
      modal(`<div class="h">🏴 ${esc(gterOf(k).n)} est à ta guilde !</div><p class="sub">Pose vite des équipes pour le défendre, sinon une autre guilde peut le reprendre sans combat.</p><button class="btn p" data-a="gwpostm" data-v="${k}" style="width:100%">🛡️ Poser une équipe</button><button class="btn" data-a="close" style="width:100%;margin-top:6px">Plus tard</button>`)}}finally{gwLock(k,0)}}}catch(e){}GCH.k=null;render()}
{const fi=finish;finish=function(res){const g=B&&B.gw;GCH.nx=null;fi.apply(this,arguments);const nx=GCH.nx;if(g)try{const b=$('#battle .result [data-a="twnext"]');if(b){if(nx==='next'){b.textContent='⚔️ Défenseur suivant';b.dataset.a='gwnext'}else if(nx==='cap'){b.textContent='🏴 Prendre le royaume';b.dataset.a='gwcap'}else{b.textContent='🗺️ Retour à la carte';b.dataset.a='gwback'}}}catch(e){}}}
/* --- résultat final --- */
async function gwFinal(){const s=gwSeason();if(gwPhase(s)!=='hold')return;try{if(GWD.fin&&GWD.fin.s===s)return;if(!NET.on||!NET.db)return;const ref=NET.db.doc('avwar/final_s'+s);const sn=await ref.get();if(sn.exists){GWD.fin={s,...sn.data()};return}
  await gwLoadAll();const C=gwOwnerCount();const capO=(GWD.m.cap||{}).own;let gid=capO||(Object.entries(C).sort((a,b)=>b[1]-a[1])[0]||[])[0];if(!gid||!NET.canWrite)return;
  const d={gid,n:gwGuildName(gid),fin:gwFinalists(),top:Object.entries(C).sort((a,b)=>b[1]-a[1]).slice(0,5).map(([g,n])=>({gid:g,n:gwGuildName(g),t:n})),t:Date.now()};const s2=await ref.get();if(!s2.exists){await ref.set(d);GWD.fin={s,...d}}else GWD.fin={s,...s2.data()}}catch(e){}}
setTimeout(gwFinal,12000);setInterval(gwFinal,120000);
{const co=capOwner;capOwner=function(){const s=gwSeason();if(!GW_ON(s))return co.apply(this,arguments);if(gwPhase(s)!=='hold')return null;if(GWD.fin&&GWD.fin.s===s&&GWD.fin.gid)return{gid:GWD.fin.gid,n:GWD.fin.n,f:null};const c=(GWD.m.cap||{}).own;return c?{gid:c,n:gwGuildName(c),f:null}:null}}
function gwReward(){const G=GWS(),o=capOwner();if(G.rw||gwPhase()!=='hold'||!o)return;const part=G.kills+G.caps+Object.keys(G.mine).length>0||(G.wd&&Object.keys(G.wd).length);if(!G.g||!part)return;const win=o.gid===G.g,fin=(GWD.fin&&GWD.fin.fin||[]).includes(G.g);
  G.rw=1;const bonus=G.caps*50;if(win){S.gems+=500+bonus;INV().pt+=3;S.ush=(S.ush||0)+2}else if(fin)S.gems+=300+bonus;else S.gems+=150+bonus;save();
  modal(`<div class="h">${win?'👑 Ta guilde a pris la capitale !':fin?'⚔️ Finalistes !':'⚔️ Fin de la guerre'}</div><p class="sub">${win?`<b>${esc(o.n)}</b> tient la Capitale d'Éther jusqu'à la fin de la saison : +25 % d'or et d'XP de pass pour toute la guilde.`:`Merci d'avoir combattu ! <b>${esc(o.n)}</b> a pris la capitale.`}</p><div class="xrw"><div>${GEM} ${win?500:fin?300:150}${bonus?` + ${bonus}`:''} gemmes</div>${win?`<div>${SIC.ticket} 3 tickets</div><div>${USH} 2 éclats d'ultra</div>`:''}</div><button class="btn p" data-a="close" style="width:100%;margin-top:10px">Super !</button>`)}
/* --- la carte --- */
const GPOS=[[200,52],[318,92],[350,170],[300,240],[200,262],[100,240],[50,170],[82,92]];
function gwMapSVG(){const ph=gwPhase();let o=`<defs><radialGradient id="gwbg" cx=".5" cy=".55" r=".7"><stop offset="0" stop-color="#3a2a14"/><stop offset=".6" stop-color="#1a1020"/><stop offset="1" stop-color="#0b0819"/></radialGradient></defs><rect width="400" height="300" fill="url(#gwbg)"/>`;
  const R=rng(gwSeason()*31+7);for(let i=0;i<40;i++)o+=`<circle cx="${(R()*400).toFixed(0)}" cy="${(R()*300).toFixed(0)}" r="${(R()*1.4+.4).toFixed(1)}" fill="${i%3?'#ffb21a':'#c8bcb0'}" opacity="${(R()*.5+.2).toFixed(2)}"/>`;
  GPOS.forEach(([x,y])=>{o+=`<path d="M200 160L${x} ${y}" stroke="#ffd84a" stroke-width="1.4" stroke-dasharray="3 5" opacity=".35"/>`});
  const node=(t,x,y,r)=>{const d=GWD.m[t.k]||{},own=d.own,c=gwColor(own),n=gwAlive(d).length,mine=own&&own===S.rgid;
    return`<g class="gwn" data-a="gwter" data-v="${t.k}" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="${r+6}" fill="${c}" opacity="${own?.22:.08}"/><circle cx="${x}" cy="${y}" r="${r}" fill="hsl(${t.h} 45% 26%)" stroke="${c}" stroke-width="${mine?4:2.5}"/>
     <text x="${x}" y="${y+4}" text-anchor="middle" font-size="${t.cap?18:13}" font-weight="900" fill="#fff">${t.cap?'🏰':n?'🛡️'+n:'·'}</text>
     <text x="${x}" y="${y+r+13}" text-anchor="middle" font-size="9.5" font-weight="800" fill="#f4e8c8" stroke="#0b0819" stroke-width="3" paint-order="stroke">${esc(t.n.length>16?t.n.slice(0,15)+'…':t.n)}</text>
     ${own?`<text x="${x}" y="${y+r+24}" text-anchor="middle" font-size="8.5" font-weight="800" fill="${c}" stroke="#0b0819" stroke-width="3" paint-order="stroke">${esc(gwGuildName(own).slice(0,18))}</text>`:''}</g>`};
  GTER.forEach((t,i)=>{o+=node(t,GPOS[i][0],GPOS[i][1],22)});o+=node(GCAP,200,160,30);
  return`<svg class="gwmap" viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">${o}</svg>`}
function gwTerModal(k){const t=gterOf(k),d=GWD.m[k]||{own:null,tr:{}},own=d.own,L=gwAlive(d).sort((a,b)=>b[1].pw-a[1].pw),G=GWS(),day=gwDay(),left=G.ad.d===day?GW_ATK-G.ad.n:GW_ATK;
  const fin=gwFinalists(),ph=gwPhase();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">${t.cap?'🏰':'🗺️'} ${esc(t.n)}</div><p class="sub">${own?`Tenu par <b style="color:${gwColor(own)}">${esc(gwGuildName(own))}</b>`:'Royaume libre'} · défenseurs : <b>${t.bn[2]}</b>${t.cap?`<br>${ph==='final'?'Finalistes : '+fin.map(g=>'<b>'+esc(gwGuildName(g))+'</b>').join(' contre '):'Ouvre le jour 5, pour les 2 guildes qui tiennent le plus de royaumes.'}`:''}</p>
   <div class="row" style="gap:6px;margin-bottom:8px">${gwCanAtk(k)?`<button class="btn p" data-a="gwatk" data-v="${k}" ${left>0?'':'disabled'}>⚔️ Attaquer (${left}/${GW_ATK})</button>`:''}${gwCanPost(k)?`<button class="btn" data-a="gwpostm" data-v="${k}">🛡️ Poser une équipe</button>`:''}</div>
   <div class="h3" style="margin:4px 0">Défenseurs · ${L.length}/${GW_MAXT}</div>
   <div class="gwtrs">${L.length?L.map(([id,tr])=>{const m=gwActMul(tr);return`<div class="gwtr ${tr.p===NET.pid?'me':''}"><div class="gwtt"><b>${esc(tr.n)}</b><small>${esc(gwGuildName(tr.g))} · ${fmt(tr.pw)}${m<1?' · <span style="color:#ff8a6a">inactif −30 %</span>':''}</small></div><div class="gwteam">${tr.team.map(x=>`<span>${portrait(HEROES[x.id])}<i>${x.l}</i></span>`).join('')}</div></div>`}).join(''):'<p class="muted" style="margin:0">Aucun défenseur.</p>'}</div>`)}
function gwPage(){const s=gwSeason(),ph=gwPhase(s),T=gwT(s),G=GWS(),o=capOwner(),mg=S.rgid,day=gwDay(),left=G.ad.d===day?GW_ATK-G.ad.n:GW_ATK;if(Date.now()-GWD.t>60000)gwLoadAll().then(()=>{if(TAB==='event'&&!B&&!$('#ovl').innerHTML)render()});if(ph==='hold')setTimeout(gwReward,300);
  const lbl={prep:'PRÉPARATION · POSEZ VOS ÉQUIPES',war:'CONQUÊTE DES ROYAUMES',final:'FINALE · ASSAUT SUR LA CAPITALE',hold:'CAPITALE CONQUISE'}[ph];
  const when=ph==='prep'?`Les attaques commencent dans <b>${dur(T.w-Date.now())}</b>`:ph==='war'?`Finale dans <b>${dur(T.f-Date.now())}</b>`:ph==='final'?`Fin de la guerre dans <b>${dur(T.e-Date.now())}</b>`:`Nouvelle guerre à la prochaine saison, dans <b>${dur(T.z-Date.now())}</b>`;
  const C=gwOwnerCount(),rank=Object.entries(C).sort((a,b)=>b[1]-a[1]);
  const mine=Object.entries(G.mine),wd=G.wd[day]||[];
  return`<div class="stack"><div class="card gwhd"><span class="tag" style="--rc:#ffd84a">SAISON ${s} · ${lbl}</span><div class="h" style="margin:4px 0">⚔️ Guerre des Guildes</div><div style="font-size:13px">${when}</div>${o?`<div class="gwown">👑 Capitale tenue par <b>${esc(o.n)}</b>${o.gid===mg?' · ta guilde : +25 % d\'or et d\'XP de pass':''}</div>`:''}${mg?'':'<div class="gwown">🔒 Rejoins une guilde pour participer.</div>'}</div>
   <div class="card gwmapc">${gwMapSVG()}<p class="muted" style="font-size:12px;margin:6px 0 0;text-align:center">Touche un royaume pour voir ses défenseurs, l'attaquer ou y poser une équipe.${ph==='war'||ph==='final'?` · <b>${left}</b> attaque${left>1?'s':''} restante${left>1?'s':''} aujourd'hui`:''}</p></div>
   <div class="card"><div class="h3">🛡️ Mes équipes posées</div>${mine.length?mine.map(([id,x])=>`<div class="gwmine"><b>${esc(gterOf(x.k).n)}</b><span>${x.ids.map(i=>`<i>${portrait(HEROES[i])}</i>`).join('')}</span></div>`).join(''):'<p class="muted" style="margin:0;font-size:13px">Aucune. Pose une équipe dans un royaume libre ou tenu par ta guilde.</p>'}${wd.length?`<p class="muted" style="font-size:12px;margin:6px 0 0">🩹 Blessés jusqu'à demain : ${wd.map(i=>esc(HEROES[i].n.split(' ')[0])).join(', ')}</p>`:''}</div>
   <div class="card"><div class="h3">🏆 Royaumes par guilde</div>${rank.length?`<div class="gwlist">${rank.slice(0,8).map(([g,n],i)=>`<div class="gwrow ${g===mg?'me':''}"><span class="gwrk" style="color:${gwColor(g)}">●</span><b>${esc(gwGuildName(g))}</b><span class="num">${n} royaume${n>1?'s':''}</span></div>`).join('')}</div>`:'<p class="muted" style="margin:0">Tous les royaumes sont libres.</p>'}</div>
   ${o?`<button class="btn" data-a="caphall" style="width:100%">👑 Salle du trône</button>`:''}
   <div class="card"><div class="h3" style="margin:0 0 4px">📜 Règles</div><ol class="rules"><li><b>Jours 1-2</b> : pose tes équipes dans les royaumes libres ou ceux de ta guilde. Une équipe posée ne bouge plus, et chaque héros ne peut être posé qu'une fois.</li><li><b>Jours 3-4</b> : ${GW_ATK} attaques par jour. Tu affrontes les équipes posées <b>les unes après les autres</b>, tant que ton équipe tient debout. Plus aucun défenseur : le royaume est à ta guilde.</li><li>Une équipe battue est retirée, ses héros sont <b>blessés jusqu'au lendemain</b>. Un joueur inactif depuis 24 h défend à −30 %, il est retiré après 48 h.</li><li><b>Jour 5, la finale</b> : seules les 2 guildes qui tiennent le plus de royaumes se battent pour la <b>Capitale</b>. Celle qui la tient à la fin gagne (sinon, celle qui a le plus de royaumes).</li><li>Gagnants : 500 💎, 3 tickets, 2 éclats d'ultra et la capitale jusqu'à la fin de la saison. Finalistes : 300 💎. Participants : 150 💎. +50 💎 par royaume pris.</li></ol></div></div>`}
{const pe=pEvents;pEvents=function(){if(GW_ON(gwSeason())&&UI.lz&&UI.lz.event==='av')return`<div class="stack">${zoneBar('event','av')}${gwPage()}</div>`;return pe.apply(this,arguments)}}
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);if(GW_ON(gwSeason())){const a=P.find(p=>p.k==='av');if(a){a.n='Guerre des Guildes';a.sn='Guerre';a.d='Conquiers les royaumes, puis la capitale';a.badge=()=>{try{const ph=gwPhase(),G=GWS();if(!S.rgid)return 0;if(ph==='prep'&&!Object.keys(G.mine).length)return'!';if((ph==='war'||ph==='final')&&(G.ad.d!==gwDay()||G.ad.n<GW_ATK))return'!';return 0}catch(e){return 0}}}}return P}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v;if(!['gwter','gwatk','gwpostm','gwsel','gwbest','gwpost','gwnext','gwcap','gwback'].includes(a))return;e.preventDefault();e.stopPropagation();
  if(a==='gwter')return gwTerModal(v);if(a==='gwatk')return gwAttack(v);if(a==='gwpostm'){closeModal();return gwPostModal(v)}
  if(a==='gwsel'){const i=+v,j=GWD.sel.indexOf(i);if(j>=0)GWD.sel.splice(j,1);else if(GWD.sel.length<5)GWD.sel.push(i);return gwSelPaint()}
  if(a==='gwbest'){GWD.sel=(GWD.free||[]).slice(0,5);return gwSelPaint()}
  if(a==='gwpost')return gwPost(v);
  if(a==='gwnext'){try{closeBattle()}catch(er){}return gwNext()}
  if(a==='gwcap'){try{closeBattle()}catch(er){}return gwCapture(GCH.k)}
  try{closeBattle()}catch(er){}TAB='event';UI.lz.event='av';render();scrollTo(0,0)},true);
try{PATCH.unshift({v:36.1,d:'27 octobre 2026',t:'La Guerre des Guildes',items:["⚔️ <b>Nouveau : la Guerre des Guildes</b>, à chaque saison du pass. Les guildes se battent pour les <b>8 royaumes</b>, puis pour la <b>Capitale d'Éther</b>.","🛡️ <b>Pose tes équipes</b> dans les royaumes (autant d'équipes que tu as de héros, chaque héros une seule fois). Une fois posée, une équipe ne bouge plus.","⚔️ <b>Combat en chaîne</b> : tu affrontes les équipes des autres joueurs posées dans un royaume, les unes après les autres, tant que ton équipe tient. Plus aucun défenseur : le royaume est à ta guilde.","🏰 <b>Jour 5, la finale</b> : les 2 guildes qui tiennent le plus de royaumes s'affrontent pour la capitale.","📅 Cette saison : pose tes équipes dès maintenant, attaques du <b>29 octobre 8h10</b> au 31, finale le 31 octobre."]})}catch(e){}
