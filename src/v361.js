
/* ================= V38.2 : Guerre des Guildes — guildes adverses agressives + journal de guerre ================= */
/* chaque guilde a son caractère : certaines attaquent beaucoup, d'autres visent la guilde en tête */
const gwAgg=g=>.6+hash01(g,'agg')*.9, gwRival=g=>hash01(g,'riv');
async function gwSim(){const s=gwSeason();if(!GW_ON(s)||!NET.on||!NET.canWrite||GWD.simB)return;const T=gwT(s),now=Math.min(Date.now(),T.e);if(now<T.a)return;GWD.simB=1;
  try{const l=await NET.db.doc(gdoc('sim')).acquire({holder:NET.pid||'x',ttlMs:60000});if(!l.acquired)return;const sd=await NET.db.doc(gdoc('sim')).get();const meta=sd&&sd.exists?sd.data():{h:-1};
    const log=Array.isArray(meta.log)?meta.log.slice(-60):[];
    const H=Math.floor((now-T.a)/36e5);if(H<=meta.h)return;await gwLoadAll();const M={};for(const t of [...GTER,GCAP]){M[t.k]=GWD.m[t.k]||{own:null,tr:{},bd:{}};M[t.k].tr=M[t.k].tr||{};M[t.k].bd=M[t.k].bd||{}}
    const pool=gwBotPool();const where=()=>{const o={};for(const k in M)for(const id in M[k].tr)o[id]=k;return o};
    for(let h=Math.max(meta.h+1,H-48);h<=H;h++){const t=T.a+h*36e5,ph=t<T.w?'prep':t<T.f?'war':'final',day=dayKey(t),R=rng(s*100000+h*7+3);
      if(ph==='final'&&!M.cap.fin){const C={};for(const x of GTER)if(M[x.k].own)C[M[x.k].own]=(C[M[x.k].own]||0)+1;M.cap.fin=Object.entries(C).sort((a,b)=>b[1]-a[1]).slice(0,2).map(x=>x[0])}
      let W=where();const byG={};for(const b of pool)(byG[b.g]=byG[b.g]||[]).push(b);
      const gs=Object.keys(byG).sort(()=>R()-.5);let nAtk=0;const failK=k=>log.some(e=>e.ty==='fail'&&e.g===e.g&&e.k===k&&dayKey(e.t)===day&&e.g===curG);let curG=null;
      for(const g of gs){const bots=byG[g],agg=gwAgg(g);
        /* 1) poser les bots libres */
        const fin=M.cap.fin||[];const okCap=ph==='final'&&fin.includes(g);
        let home=GTER.filter(x=>M[x.k].own===g&&Object.keys(M[x.k].tr).length<GW_MAXT).map(x=>x.k);if(okCap&&(!M.cap.own||M.cap.own===g))home.unshift('cap');
        if(!home.length){const free=GTER.filter(x=>!M[x.k].own);const pr=ph==='prep'?(free.length>3?.12:.04):.3;if(free.length&&R()<pr){const k=free[Math.floor(R()*free.length)].k;M[k].own=g;home=[k];log.push({t,g,k,ty:'claim'})}}
        for(const b of bots){if(W[b.id]||M_dead(M,b.id,day))continue;if(R()>b.act*.6)continue;const k=home.slice().sort((x,y)=>Object.keys(M[x].tr).length-Object.keys(M[y].tr).length)[0];if(!k||Object.keys(M[k].tr).length>=GW_MAXT)continue;M[k].tr[b.id]={n:b.n,g,bot:1,pw:b.pw,team:b.team,at:t};W[b.id]=k}
        /* 2) attaquer : bien plus souvent, et parfois en plusieurs vagues */
        curG=g;if(ph==='prep'||nAtk>=4)continue;const pA=(ph==='final'?.75:.5)*agg;if(R()>pA)continue;
        const waves=1+(R()<.35*agg?1:0);
        for(let wv=0;wv<waves;wv++){let tg;
          if(ph==='final'&&okCap&&M.cap.own&&M.cap.own!==g)tg='cap';
          else{const hasFree=bots.some(b=>!W[b.id]&&!M_dead(M,b.id,day));const opts=GTER.filter(x=>M[x.k].own&&M[x.k].own!==g&&(hasFree||Object.keys(M[x.k].tr).length)&&!failK(x.k));if(!opts.length)break;
            const C={};for(const x of GTER)if(M[x.k].own)C[M[x.k].own]=(C[M[x.k].own]||0)+1;const lead=Object.entries(C).filter(([x])=>x!==g).sort((a,b)=>b[1]-a[1])[0];
            const vs=lead&&R()<.25+gwRival(g)*.35?opts.filter(x=>M[x.k].own===lead[0]):[];const pool2=vs.length?vs:opts;
            pool2.sort((a,b)=>Object.keys(M[a.k].tr).length-Object.keys(M[b.k].tr).length);tg=pool2[Math.floor(R()*Math.min(3,pool2.length))].k}
          const free=bots.filter(b=>!W[b.id]&&!M_dead(M,b.id,day)).sort((a,b)=>b.pw-a.pw);const atk=free[wv]||free[0]||bots.slice().sort((a,b)=>b.pw-a.pw)[wv]||bots[0];if(!atk)break;
          const vic=M[tg].own;let st=atk.pw*(.8+R()*.45)*1.3,kills=0;const defs=Object.entries(M[tg].tr).sort((a,b)=>a[1].pw-b[1].pw);
          for(const [id,tr] of defs){const m=gwActMul(tr);if(m<=0){delete M[tg].tr[id];continue}const dp=tr.pw*m*(1+(gterOf(tg).bn[1]||0)/100);if(st>dp){delete M[tg].tr[id];kills++;if(tr.bot)M[tg].bd[id]=day;st-=dp*.8}else break}
          const took=!Object.keys(M[tg].tr).length;if(took){M[tg].own=g;M[tg].tk=t;/* les vainqueurs s'installent pour défendre le royaume pris */const gar=[atk,...free.filter(b=>b!==atk)].filter(b=>!W[b.id]&&!M_dead(M,b.id,day)).slice(0,2+Math.floor(R()*3));for(const b of gar){if(Object.keys(M[tg].tr).length>=GW_MAXT)break;M[tg].tr[b.id]={n:b.n,g,bot:1,pw:b.pw,team:b.team,at:t};W[b.id]=tg}}
          nAtk++;log.push({t:t+Math.floor(R()*50)*60000+wv*240000,g,v:vic,k:tg,n:atk.n,kl:kills,dn:defs.length,ty:took?(defs.length?'take':'grab'):kills?'hit':'fail'});
          W=where()}}}
    log.sort((a,b)=>a.t-b.t);
    for(const k in M){await NET.db.doc(gdoc(k)).set(Object.assign(M[k],{t:Date.now()}));GWD.m[k]=M[k]}await NET.db.doc(gdoc('sim')).set({h:H,t:Date.now(),log:log.slice(-60)});GWD.log=log.slice(-60);gwMineSync();gwLogNotify()}catch(e){console.warn('gwSim',e)}finally{GWD.simB=0}}
/* le journal est lu avec les royaumes */
{const la=gwLoadAll;gwLoadAll=async function(){const r=await la.apply(this,arguments);try{const sd=await NET.db.doc(gdoc('sim')).get();const d=sd&&sd.exists?sd.data():null;GWD.log=d&&Array.isArray(d.log)?d.log:[];gwLogNotify()}catch(e){}return r}}
function gwLogLine(e){const G=n=>`<b style="color:${gwColor(n)}">${esc(gwGuildName(n))}</b>`,K=`<b>${esc(gterOf(e.k).n)}</b>`;
  if(e.ty==='claim')return`🚩 ${G(e.g)} plante son drapeau sur ${K}`;
  if(e.ty==='grab')return`🏳️ ${G(e.g)} s'empare de ${K}, laissé sans défense par ${G(e.v)}`;
  if(e.ty==='take')return`🔥 ${G(e.g)} prend ${K} à ${G(e.v)}${e.kl?` (${e.kl} équipe${e.kl>1?'s':''} battue${e.kl>1?'s':''})`:''}`;
  if(e.ty==='hit')return`⚔️ ${G(e.g)} attaque ${K} (${G(e.v)}) : ${e.kl} équipe${e.kl>1?'s':''} battue${e.kl>1?'s':''}`;
  return`🛡️ ${G(e.v)} repousse l'attaque de ${G(e.g)} sur ${K}`}
function gwLogNotify(){try{const G=GWS();const L=(GWD.log||[]).filter(e=>e.t<=Date.now());const last=G.logT||0;const nw=L.filter(e=>e.t>last&&S.rgid&&e.v===S.rgid&&e.ty!=='claim');if(L.length)G.logT=Math.max(last,L[L.length-1].t);
  if(last&&nw.length){const e=nw[nw.length-1];toast((e.ty==='take'||e.ty==='grab')?`🔥 ${gwGuildName(e.g)} vient de prendre ${gterOf(e.k).n} à ta guilde !`:e.ty==='hit'?`⚔️ ${gwGuildName(e.g)} attaque ${gterOf(e.k).n} !`:`🛡️ Ta guilde a repoussé ${gwGuildName(e.g)} à ${gterOf(e.k).n} !`)}save()}catch(e){}}
{const gp=gwPage;gwPage=function(){let h=gp.apply(this,arguments);try{const L=(GWD.log||[]).filter(e=>e.t<=Date.now()).slice(-12).reverse();
  const card=`<div class="card"><div class="h3">📜 Journal de guerre</div>${L.length?`<div class="gwlog">${L.map(e=>`<div class="gwle ${S.rgid&&(e.v===S.rgid||e.g===S.rgid)?'me':''}"><span>${gwLogLine(e)}</span><time>${ago(e.t)}</time></div>`).join('')}</div>`:'<p class="muted" style="margin:0;font-size:13px">Aucun combat pour l\'instant. Les attaques commencent au jour 3.</p>'}</div>`;
  const i=h.indexOf('<div class="card"><div class="h3">🏆 Royaumes par guilde');if(i>0)h=h.slice(0,i)+card+h.slice(i)}catch(e){}return h}}
(function(){const st=document.createElement('style');st.textContent='.gwlog{display:flex;flex-direction:column;gap:6px}.gwle{display:flex;justify-content:space-between;gap:8px;align-items:baseline;font-size:13px;padding:6px 8px;border-radius:10px;background:rgba(255,255,255,.04)}.gwle.me{background:rgba(255,216,74,.1);box-shadow:inset 3px 0 0 #ffd84a}.gwle time{flex:none;font-size:11px;opacity:.6}';document.head.appendChild(st)})();
try{I18N_RULES.push(
 [/^🚩 (.+) plante son drapeau sur (.+)$/,m=>'🚩 '+m[1]+' plants its flag on '+tr(m[2])],
 [/^🏳️ (.+) s'empare de (.+), laissé sans défense par (.+)$/,m=>'🏳️ '+m[1]+' seizes '+tr(m[2])+', left undefended by '+m[3]],
 [/^🔥 (.+) prend (.+) à (.+?)( \((\d+) équipes? battues?\))?$/,m=>'🔥 '+m[1]+' takes '+tr(m[2])+' from '+m[3]+(m[5]?` (${m[5]} team${m[5]>1?'s':''} defeated)`:'')],
 [/^⚔️ (.+) attaque (.+) \((.+)\) : (\d+) équipes? battues?$/,m=>'⚔️ '+m[1]+' attacks '+tr(m[2])+' ('+m[3]+'): '+m[4]+' team'+(m[4]>1?'s':'')+' defeated'],
 [/^🛡️ (.+) repousse l'attaque de (.+) sur (.+)$/,m=>'🛡️ '+m[1]+' repels '+m[2]+"'s attack on "+tr(m[3])],
 [/^🔥 (.+) vient de prendre (.+) à ta guilde !$/,m=>'🔥 '+m[1]+' just took '+tr(m[2])+' from your guild!'],
 [/^⚔️ (.+) attaque (.+) !$/,m=>'⚔️ '+m[1]+' is attacking '+tr(m[2])+'!'],
 [/^🛡️ Ta guilde a repoussé (.+) à (.+) !$/,m=>'🛡️ Your guild repelled '+m[1]+' at '+tr(m[2])+'!']);
 Object.assign(I18N_EN,{"📜 Journal de guerre":"📜 War log","Aucun combat pour l'instant. Les attaques commencent au jour 3.":"No battles yet. Attacks start on day 3."})}catch(e){}
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("⚔️ Guerre des Guildes : les guildes adverses attaquent bien plus souvent (entre elles et contre vous), en plusieurs vagues, et un 📜 Journal de guerre montre tous les combats en direct.")}catch(e){}
