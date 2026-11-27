
/* ================= V463 : GUERRE DES GUILDES — ta guilde t'écoute vraiment =================
   Demandé par Raptor : quand il écrivait « attaquez » dans le tchat de guilde, les membres répondaient « j'y vais »
   mais n'attaquaient pas (le message ne faisait que poser des équipes), et ils disaient « c'est bon » même quand
   ils n'avaient rien pu poser.
   · « attaquez / on y va / à l'attaque / tous sur la capitale… » : les membres lancent VRAIMENT un assaut, tout de suite,
     avec leurs attaques du jour (mêmes règles que les attaques de chaque heure), et racontent le vrai résultat.
   · « posez vos équipes / défendez… » : ils posent, et disent la vérité s'ils ne peuvent pas (blessés, plus de royaume…).
   · Sur la page de la guerre : une carte « Les membres de ta guilde » (qui est posé, qui est blessé, attaques restantes)
     et deux boutons pour donner l'ordre sans écrire. */
(function(){try{
if(typeof gwPhase!=='function'||typeof gwSim!=='function')return;
const ATK_RX=/(attaqu|\batk\b|on prend|reprend|conqu|on y va|\bgo+\b|assaut|\bfonce|\bcharge[zr]?\b|à l'attaque|a l'attaque|on tape|\btape[zr]?\b|prenez|on fonce|tous sur|tout le monde sur)/i;
const DEF_RX=/(\bpos(e|es|ez|er|é|ée|ons|ez-les)\b|mett?(ez|ais|é|re|ons)? ?(vos|les|ta|tes|nos|des)? ?(team|équipe|def)|vos (team|équipe)|défen[sd]|\bdef\b|renfor|protég|gard(ez|er) )/i;
const CAP_RX=/capitale/i;
const CD=3*60000,MAXA=6;
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG&&LANG!=='fr')?en:fr;
const pk=a=>a[Math.floor(Math.random()*a.length)];
const kfmt=v=>{try{return fmt(Math.round(v))}catch(e){return String(Math.round(v))}};
const tn=k=>{try{return gterOf(k).n}catch(e){return k}};
const isFin=gid=>{try{return gwPhase()==='final'&&(gwFinalists()||[]).includes(gid)}catch(e){return false}};
const gBotsOf=gid=>((NET.guilds&&NET.guilds[gid]||{}).bots||[]).filter(b=>b&&b.n);
const gbOf=(gid,pid)=>gBotsOf(gid).find(b=>'b'+b.id===pid)||null;
const deadIn=(M,id,day)=>{for(const k in M){const m=M[k];if(m&&m.bd&&m.bd[id]===day)return true}return false};
const placedIn=M=>{const o={};for(const k in M){const m=M[k];if(m&&m.tr)for(const id in m.tr)o[id]=k}return o};
const dpOf=(tr,k)=>{const m=gwActMul(tr);return m<=0?0:tr.pw*m*(1+((gterOf(k).bn||[])[1]||0)/100)};
const aliveDefs=(d,k)=>Object.entries((d&&d.tr)||{}).filter(([id,tr])=>tr&&gwActMul(tr)>0).sort((a,b)=>dpOf(a[1],k)-dpOf(b[1],k));
/* les attaques du jour de chaque membre, partagées avec la simulation de chaque heure */
GWD.ac=GWD.ac||{};
{const la=gwLoadAll;gwLoadAll=async function(){const r=await la.apply(this,arguments);try{if(NET.on&&NET.db){const sd=await NET.db.doc(gdoc('sim')).get();const d=sd&&sd.exists?sd.data():null;GWD.ac=d&&d.ac&&typeof d.ac==='object'?d.ac:{}}}catch(e){}return r}}
const atkUsed=(id,day)=>((GWD.ac||{})[day]||{})[id]||0;

async function readAll(){const ks=[...GTER.map(t=>t.k),'cap'];const R=await Promise.all(ks.map(gwRead));const M={};ks.forEach((k,i)=>{M[k]=R[i]||{own:null,tr:{},bd:{}};M[k].tr=M[k].tr||{};M[k].bd=M[k].bd||{}});return M}
async function simLock(on){const ref=NET.db.doc(gdoc('sim'));if(!on){try{await ref.acquire({holder:NET.pid||'x',ttlMs:1})}catch(e){}return true}
  for(let i=0;i<8;i++){try{const l=await ref.acquire({holder:NET.pid||'x',ttlMs:25000});if(l&&l.acquired)return true}catch(e){}await wait(600+Math.random()*500)}return false}

/* ---------- l'assaut lancé par le chef ---------- */
async function gwAssault(gid){const ph=gwPhase(),day=gwDay();if(ph!=='war'&&ph!=='final')return{why:'phase'};
  if(!await simLock(1))return{why:'busy'};
  try{const ref=NET.db.doc(gdoc('sim'));const sd=await ref.get();const meta=sd&&sd.exists?sd.data():{h:-1};
    const log=Array.isArray(meta.log)?meta.log.slice(-60):[];const AC=(meta.ac&&typeof meta.ac==='object')?meta.ac:{};const ac=AC[day]=AC[day]||{};
    const M=await readAll();const W=placedIn(M);
    const pool=gwBotPool().filter(b=>b.g===gid);if(!pool.length)return{why:'nobots'};
    const ready=pool.filter(b=>!deadIn(M,b.id,day)&&GW_ATK-(ac[b.id]||0)>0).sort((a,b)=>b.pw-a.pw);
    if(!ready.length)return{why:pool.every(b=>deadIn(M,b.id,day))?'wounded':'noatk'};
    /* la cible : la capitale en finale si l'autre finaliste la tient, sinon le royaume ennemi le plus facile */
    let tg=null;
    if(ph==='final'&&isFin(gid)&&M.cap.own&&M.cap.own!==gid)tg='cap';
    else{const opts=GTER.filter(x=>M[x.k].own&&M[x.k].own!==gid).map(x=>{const D=aliveDefs(M[x.k],x.k);return{k:x.k,n:D.length,min:D.length?dpOf(D[0][1],x.k):0,sum:D.reduce((a,[,tr])=>a+dpOf(tr,x.k),0)}});
      if(!opts.length)return{why:'notarget'};
      const best=ready[0].pw*1.3;const ok=opts.filter(o=>!o.n||o.min<best*1.15);const L=(ok.length?ok:opts).sort((a,b)=>(a.n?1:0)-(b.n?1:0)||a.sum-b.sum);tg=L[0].k;
      if(!ok.length){const o=L.sort((a,b)=>a.min-b.min)[0];return{why:'tooStrong',k:o.k,min:o.min,top:ready[0].pw,topN:ready[0].n}}}
    if(!await gwLock(tg,1))return{why:'busy'};
    const steps=[];let took=false,vic=null,first=0;
    try{const d=await gwRead(tg);if(!d)return{why:'busy'};d.tr=d.tr||{};d.bd=d.bd||{};vic=d.own;
      if(!vic||vic===gid)return{why:'notarget'};
      first=aliveDefs(d,tg).length;
      for(const a of ready.slice(0,MAXA)){const defs=aliveDefs(d,tg);if(!defs.length)break;
        let st=a.pw*(.8+Math.random()*.45)*1.3,kills=0;const minDp=dpOf(defs[0][1],tg);
        for(const [id,tr] of Object.entries(d.tr))if(gwActMul(tr)<=0)delete d.tr[id];
        for(const [id,tr] of defs){const dp=dpOf(tr,tg);if(st>dp){delete d.tr[id];kills++;if(tr.bot)d.bd[id]=day;st-=dp*.8}else break}
        ac[a.id]=(ac[a.id]||0)+1;const left=aliveDefs(d,tg).length;took=!left;
        steps.push({a,kills,minDp,left,took});
        log.push({t:Date.now()+steps.length,g:gid,v:vic,k:tg,n:a.n,kl:kills,dn:defs.length,ty:took?'take':kills?'hit':'fail'});
        if(took)break;
        if(!kills&&steps.filter(s=>!s.kills).length>=2)break}
      if(took){d.own=gid;d.tk=Date.now();d.tr={};const gar=pool.filter(b=>!W[b.id]&&!deadIn(Object.assign({},M,{[tg]:d}),b.id,day)).sort((a,b)=>b.pw-a.pw).slice(0,4);
        for(const b of gar)d.tr[b.id]={n:b.n,g:gid,bot:1,pw:b.pw,team:b.team,at:Date.now()}}
      await gwWrite(tg,d)}finally{gwLock(tg,0)}
    log.sort((a,b)=>a.t-b.t);
    await ref.set(Object.assign({},meta,{log:log.slice(-60),ac:AC,t:Date.now()}));GWD.log=log.slice(-60);GWD.ac=AC;
    try{gwLogNotify()}catch(e){}
    return{tg,steps,took,vic,first}}
  finally{simLock(0)}}

/* ---------- poser les défenses (avec la vraie raison si personne ne peut) ---------- */
async function gwPlace(gid){const day=gwDay(),ph=gwPhase();if(!['prep','war','final'].includes(ph))return{n:0,why:'phase'};
  const M=await readAll();for(const k in M)GWD.m[k]=M[k];
  const pool=gwBotPool().filter(b=>b.g===gid);if(!pool.length)return{n:0,why:'nobots'};
  const W=placedIn(M),dead=pool.filter(b=>!W[b.id]&&deadIn(M,b.id,day)),todo=pool.filter(b=>!W[b.id]&&!deadIn(M,b.id,day)).sort((a,b)=>b.pw-a.pw);
  if(!todo.length)return{n:0,why:dead.length?'wounded':'allPlaced',dead:dead.length,placed:pool.length-dead.length};
  let homes=GTER.filter(t=>M[t.k].own===gid&&Object.keys(M[t.k].tr).length<GW_MAXT).map(t=>t.k);
  if(isFin(gid)&&(!M.cap.own||M.cap.own===gid))homes.unshift('cap');
  if(!homes.length){const free=GTER.filter(t=>!M[t.k].own);if(free.length&&ph!=='final')homes=[pk(free).k]}
  if(!homes.length)return{n:0,why:'noHome',free:todo.length,dead:dead.length};
  let n=0;const where={};
  for(const k of homes){if(!todo.length)break;if(!await gwLock(k,1))continue;
    try{const d=await gwRead(k);if(!d||(d.own&&d.own!==gid))continue;d.tr=d.tr||{};
      let per=k==='cap'?GW_MAXT:Math.max(2,Math.ceil(todo.length/Math.max(1,homes.length-homes.indexOf(k))));
      while(todo.length&&per-->0&&Object.keys(d.tr).length<GW_MAXT){const b=todo.shift();d.tr[b.id]={n:b.n,g:gid,bot:1,pw:b.pw,team:b.team,at:Date.now()};n++;where[k]=(where[k]||0)+1}
      if(!d.own){d.own=gid;d.tk=Date.now()}await gwWrite(k,d)}catch(e){}finally{gwLock(k,0)}}
  return{n,where,dead:dead.length,left:todo.length,why:n?'':'full'}}

/* ---------- les réponses dans le tchat : toujours la vérité ---------- */
let BUSY=false;
async function gwCmd(kind,silentCd){const gid=S.rgid;if(!gid||!NET.on||!NET.canWrite)return;let ph;try{ph=gwPhase()}catch(e){return}if(!['prep','war','final'].includes(ph))return;
  const gb=gBotsOf(gid);if(!gb.length||BUSY)return;
  if(Date.now()-(S.gwRT||0)<CD){if(!silentCd)try{toast(T('⏳ Tes membres viennent de recevoir un ordre, attends un peu.','⏳ Your members just got an order, wait a little.'))}catch(e){}return}
  S.gwRT=Date.now();save();BUSY=true;
  const say=(b,x,ms)=>new Promise(r=>setTimeout(()=>{try{postBotMsg(gid,b,x)}catch(e){}r()},ms));
  const any=()=>pk(gb);
  try{
    if(kind==='atk'&&ph==='prep'){await say(any(),pk(["Les attaques commencent au jour 3 chef, en attendant on pose nos défenses 🛡️","Pas encore d'attaque possible (jour 3), on se met en défense d'abord 🛡️"]),1500);kind='def'}
    if(kind==='atk'){
      await say(any(),pk(["On y va ⚔️","Je prends ma meilleure team, go ⚔️","À l'attaque ! 🔥","Tout le monde avec moi ⚔️"]),1300);
      let R;try{R=await gwAssault(gid)}catch(e){console.warn('gwAssault',e);R={why:'busy'}}
      if(R.why){const msg={phase:"La guerre n'est pas en phase d'attaque en ce moment",busy:"La carte bouge trop, je réessaie dans un instant 🙏",nobots:"",
          wounded:"On est tous blessés jusqu'à demain 🤕 Demain on y retourne",noatk:"On a déjà utilisé toutes nos attaques aujourd'hui 😅 Demain on remet ça",
          notarget:"Il n'y a aucun royaume ennemi à attaquer pour l'instant 🤔",
          tooStrong:R.k?`Trop forts pour nous à ${tn(R.k)} 😓 Leur plus faible : ${kfmt(R.min)}, notre meilleure : ${kfmt(R.top)}. On garde nos attaques.`:''}[R.why];
        if(msg)await say(any(),msg,1800);if(R.why==='busy')S.gwRT=0;return}
      const ter=tn(R.tg),shown=R.steps.slice(0,4);
      for(const s of shown){const b=gbOf(gid,s.a.id)||any();let x;
        if(s.took)x=pk([`${ter} est à nous !! 🔥 Je reste le défendre 🛡️`,`On a pris ${ter} 🏴 Je m'installe en défense`]);
        else if(s.kills)x=pk([`J'ai battu ${s.kills} équipe${s.kills>1?'s':''} à ${ter} 💪 Il en reste ${s.left}`,`${s.kills} défenseur${s.kills>1?'s':''} en moins à ${ter} ⚔️ (encore ${s.left})`]);
        else x=pk([`Je suis tombé sur plus fort que moi à ${ter} 😓 (${kfmt(s.minDp)} contre ${kfmt(s.a.pw)})`,`Repoussé à ${ter}… leur plus faible fait ${kfmt(s.minDp)}, moi ${kfmt(s.a.pw)} 😤`]);
        await say(b,x,1700)}
      if(!R.took){const k=R.steps.reduce((a,s)=>a+s.kills,0);const last=R.steps[R.steps.length-1];
        await say(any(),k?`Bilan : ${k} défenseur${k>1?'s':''} battu${k>1?'s':''} à ${ter}, il en reste ${last?last.left:'?'}. Tu peux finir le travail chef ⚔️`:`On n'a pas réussi à percer à ${ter}, leurs équipes sont plus fortes que les nôtres 😓`,2000)}
      try{if(TAB==='event'&&!B&&!$('#ovl').innerHTML)render()}catch(e){}
      return}
    /* défense */
    await say(any(),pk(["Message reçu, on se met en défense 🛡️","Ok chef, je regarde où poser ma team","J'y vais 🛡️"]),1300);
    let R;try{R=await gwPlace(gid)}catch(e){console.warn('gwPlace',e);R={n:0,why:'busy'}}
    let x;
    if(R.n){const w=Object.entries(R.where||{}).map(([k,n])=>`${n} à ${tn(k)}`).join(', ');x=`C'est bon : ${R.n} équipe${R.n>1?'s':''} posée${R.n>1?'s':''} (${w}) 🛡️`+(R.dead?` · ${R.dead} blessé${R.dead>1?'s':''} jusqu'à demain`:'')}
    else x={phase:"La guerre n'est pas ouverte en ce moment",busy:"La carte bouge trop, je réessaie dans un instant 🙏",nobots:'',
      wounded:`Ceux qui ne sont pas posés sont blessés jusqu'à demain 🤕 (${R.dead})`,allPlaced:`On est déjà tous en défense chef (${R.placed||0} équipe${(R.placed||0)>1?'s':''}) 🛡️`,
      noHome:`On n'a plus aucun royaume où se poser 😬 Il faut d'abord en reprendre un : dis « attaquez » !`,full:"Nos royaumes sont pleins (12 équipes chacun) 🛡️"}[R.why]||'';
    if(x)await say(any(),x,1800);if(R.why==='busy')S.gwRT=0;
    if(R.n){try{toast(`🛡️ ${R.n} membre${R.n>1?'s':''} de ta guilde ${R.n>1?'ont':'a'} posé leur équipe !`)}catch(e){}try{if(TAB==='event'&&!B&&!$('#ovl').innerHTML)render()}catch(e){}}
  }finally{BUSY=false}}
window.gwCmd=gwCmd;
/* le tchat : on comprend l'ordre donné */
let LASTK=null;
const kindOf=x=>{x=String(x||'');const a=ATK_RX.test(x),d=DEF_RX.test(x);
  if(CAP_RX.test(x)&&!a&&!d){try{const c=GWD.m.cap;if(gwPhase()==='final'&&isFin(S.rgid))return c&&c.own&&c.own!==S.rgid?'atk':'def'}catch(e){}return'def'}
  return a?'atk':d?'def':null};
gwRally=async function(){const k=LASTK||'def';LASTK=null;return gwCmd(k,true)};
{const pm=postMsg;postMsg=function(x,sys,gid=S.rgid){let k=null;try{if(!sys&&gid&&gid===S.rgid)k=kindOf(x)}catch(e){}LASTK=k;const r=pm.apply(this,arguments);
  try{if(k&&LASTK){LASTK=null;gwCmd(k,true)}}catch(e){}return r}}

/* ---------- sur la page de la guerre : les membres, et les ordres en un bouton ---------- */
function membersCard(){const gid=S.rgid;if(!gid)return'';const ph=gwPhase();if(!['prep','war','final'].includes(ph))return'';
  const day=gwDay(),pool=gwBotPool().filter(b=>b.g===gid).sort((a,b)=>b.pw-a.pw);if(!pool.length)return'';
  const W=placedIn(GWD.m),dead=id=>deadIn(GWD.m,id,day);
  let nP=0,nD=0,nA=0;const rows=pool.map(b=>{const k=W[b.id],dd=!k&&dead(b.id),al=Math.max(0,GW_ATK-atkUsed(b.id,day));if(k)nP++;if(dd)nD++;if(!dd)nA+=al;
    const st=k?`🛡️ ${esc(tn(k))}`:dd?'🤕 blessé':'💤 libre';return`<div class="gwmr ${k?'on':dd?'hurt':''}"><b>${esc(b.n)}</b><span class="num">${kfmt(b.pw)}</span><span class="gwms">${st}</span><span class="gwma">${dd?'':al?`⚔️ ${al} attaque${al>1?'s':''}`:'plus d\'attaque'}</span></div>`}).join('');
  let hint='';try{let mn=Infinity,mk=null;for(const t of GTER){const d=GWD.m[t.k];if(!d||!d.own||d.own===gid)continue;const D=aliveDefs(d,t.k);if(!D.length){mn=0;mk=t.k;break}const v=dpOf(D[0][1],t.k);if(v<mn){mn=v;mk=t.k}}
    if(mk!=null&&pool[0]&&(ph==='war'||ph==='final'))hint=mn===0?`🏳️ <b>${esc(tn(mk))}</b> n'a plus de défenseur : il suffit d'y aller !`:`Notre plus forte équipe : <b>${kfmt(pool[0].pw)}</b> · le défenseur ennemi le plus faible : <b>${kfmt(mn)}</b> (${esc(tn(mk))})`}catch(e){}
  const wait=Math.max(0,CD-(Date.now()-(S.gwRT||0)));
  return`<div class="card gwmc"><div class="h3">👥 Les membres de ta guilde</div>
   <p class="muted" style="margin:0 0 8px;font-size:12.5px">${nP} en défense · ${nD} blessé${nD>1?'s':''} · ${nA} attaque${nA>1?'s':''} restante${nA>1?'s':''} aujourd'hui</p>
   <div class="gwml">${rows}</div>
   ${hint?`<p class="muted" style="margin:8px 0 0;font-size:12.5px">${hint}</p>`:''}
   <div class="row" style="gap:6px;margin-top:10px">${ph!=='prep'?`<button class="btn p sm" data-a="gwcall" data-v="atk" ${wait?'disabled':''}>⚔️ Lancer un assaut</button>`:''}<button class="btn sm" data-a="gwcall" data-v="def" ${wait?'disabled':''}>🛡️ Poser les défenses</button></div>
   ${wait?`<p class="muted" style="margin:6px 0 0;font-size:12px">Prochain ordre possible dans ${Math.ceil(wait/60000)} min.</p>`:''}</div>`}
{const gp=gwPage;gwPage=function(){let h=gp.apply(this,arguments);try{const c=membersCard();if(c){const i=h.indexOf('<div class="card"><div class="h3">📜 Journal de guerre');const j=i>0?i:h.indexOf('<div class="card"><div class="h3">🏆 Royaumes par guilde');if(j>0)h=h.slice(0,j)+c+h.slice(j)}}catch(e){}return h}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="gwcall"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
  const k=b.dataset.v;if(Date.now()-(S.gwRT||0)<CD)return toast(T('⏳ Tes membres viennent de recevoir un ordre, attends un peu.','⏳ Your members just got an order, wait a little.'));
  const x=k==='atk'?(isFin(S.rgid)&&GWD.m.cap&&GWD.m.cap.own&&GWD.m.cap.own!==S.rgid?'⚔️ Tout le monde à l\'attaque de la capitale !':'⚔️ À l\'attaque, on prend un royaume !'):'🛡️ Posez vos équipes en défense dans nos royaumes !';
  try{postMsg(x)}catch(er){gwCmd(k)}toast(k==='atk'?'⚔️ Ordre d\'assaut envoyé à ta guilde':'🛡️ Ordre de défense envoyé à ta guilde');setTimeout(()=>{try{if(TAB==='event'&&!B&&!$('#ovl').innerHTML)render()}catch(er){}},400)},true);
const st=document.createElement('style');st.textContent=`
.gwml{display:flex;flex-direction:column;gap:4px;max-height:260px;overflow:auto}
.gwmr{display:grid;grid-template-columns:1fr auto;grid-template-areas:"n p" "s a";gap:0 8px;padding:6px 9px;border-radius:10px;background:rgba(255,255,255,.04);font-size:13px}
.gwmr b{grid-area:n;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.gwmr .num{grid-area:p;font-weight:800}.gwmr .gwms{grid-area:s;font-size:12px;opacity:.85}.gwmr .gwma{grid-area:a;font-size:11px;text-align:right}
.gwmr.on{box-shadow:inset 3px 0 0 #ffd84a}.gwmr.hurt{opacity:.6}`;document.head.appendChild(st);
try{const it=["⚔️ <b>Guerre des Guildes</b> : quand tu écris « attaquez » (ou « à l'attaque », « on y va »…) dans le tchat de guilde, tes membres lancent <b>vraiment un assaut</b> avec leurs attaques du jour, et racontent le vrai résultat.",
  "🛡️ Quand tu écris « posez vos équipes », ils posent leurs défenses. Et s'ils ne peuvent pas (blessés jusqu'à demain, plus de royaume…), ils te le disent au lieu de répondre « c'est bon ».",
  "👥 Sur la page de la guerre, une nouvelle carte montre <b>les membres de ta guilde</b> : qui est posé, qui est blessé, leurs attaques restantes, et deux boutons pour donner l'ordre sans écrire."];
 const en=["⚔️ <b>Guild War</b>: when you write “attack” (or “charge”, “let's go”…) in the guild chat, your members <b>really launch an assault</b> with their attacks of the day, and report the real result.",
  "🛡️ When you write “place your teams”, they set up their defenses. And if they can't (wounded until tomorrow, no kingdom left…), they tell you instead of answering “done”.",
  "👥 On the war page, a new card shows <b>your guild members</b>: who is posted, who is wounded, their attacks left, and two buttons to give orders without typing."];
 PATCH.unshift({v:83,d:'27 novembre 2026',t:'Ta guilde t\'écoute vraiment',items:it});it.forEach((x,i)=>{I18N_EN[x]=en[i];try{RDEput(x,en[i])}catch(e){}});I18N_EN["Ta guilde t'écoute vraiment"]='Your guild really listens'}catch(e){}
try{Object.assign(I18N_EN,{'👥 Les membres de ta guilde':'👥 Your guild members','⚔️ Lancer un assaut':'⚔️ Launch an assault','🛡️ Poser les défenses':'🛡️ Set up defenses','💤 libre':'💤 free','🤕 blessé':'🤕 wounded'})}catch(e){}
}catch(e){console.warn('v463',e)}})();
