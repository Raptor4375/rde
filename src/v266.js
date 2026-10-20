
/* ================= Guerre des Cieux : les vrais bots des guildes combattent + dégâts des joueurs partagés ================= */
const avDmgSimOld=avDmgSim;
const AVBD={t:-1,r:null};
function avHourAct(i){const hh=new Date(AV_START+i*36e5).getHours();return hh<7?.35:hh<12?.8:hh<19?1.1:1.35}
function avBotSim(){const t=avNow(),key=Math.floor(t/60000);if(AVBD.t===key&&AVBD.r)return AVBD.r;
  const a={},d={};let ca=0,cd=0;AVTER.forEach(T=>{a[T.k]=0;d[T.k]=0});const G={},P={};
  const hrs=t<AV_START?0:Math.min((Math.min(t,AV_END)-AV_START)/36e5,168),H=Math.ceil(hrs);
  const guilds=Object.entries(NET.guilds||{}).map(([gid,g])=>({gid,n:g.n,f:avGuildFac(gid),bots:(g.bots||[]).filter(b=>b&&b.id&&!(gid===CLAUDE_GID&&b.id==='claude'))})).filter(x=>x.f&&x.bots.length);
  for(let i=0;i<H;i++){const frac=i<Math.floor(hrs)?1:hrs-Math.floor(hrs);if(frac<=0)continue;const act=avHourAct(i);
    let na=0,nd=0;for(const T of AVTER){if(a[T.k]>d[T.k])na++;else if(d[T.k]>a[T.k])nd++}
    for(const g of guilds){const blk=Math.floor(i/6),foc=[AVTER[Math.floor(avH('fo'+g.gid+blk)*8)%8].k,AVTER[Math.floor(avH('fp'+g.gid+blk)*8)%8].k];const canCap=g.f==='ange'?na>=5:nd>=5;
      for(const b of g.bots){const p=Math.min(1,Math.max(.15,b.act||.3))*act*.12;const r=avH('at'+g.gid+b.id+i);if(r>=p*frac)continue;
        const dmg=Math.round((b.pw||1000)*(4+4*avH('dm'+b.id+i)));const rr=avH('tg'+b.id+i);
        const tgt=canCap&&rr<.3?'cap':rr<.55?foc[0]:rr<.8?foc[1]:AVTER[Math.floor(avH('rk'+b.id+i)*8)%8].k;
        if(tgt==='cap'){if(g.f==='ange')ca+=dmg;else cd+=dmg}else{if(g.f==='ange')a[tgt]+=dmg;else d[tgt]+=dmg}
        G[g.gid]=G[g.gid]||{n:g.n,f:g.f,dmg:0};G[g.gid].dmg+=dmg;const pk='b:'+g.gid+':'+b.id;P[pk]=P[pk]||{id:pk,n:b.n,g:g.gid,f:g.f,dmg:0};P[pk].dmg+=dmg}}}
  AVBD.t=key;AVBD.r={a,d,ca,cd,G,P};return AVBD.r}
/* dégâts des vrais joueurs, partagés dans la base (un document par joueur) */
const AVPD={t:0,docs:[]};
async function avPlayersLoad(){try{if(!NET.on||!NET.db)return;const s=await NET.db.collection('avdmg').get();AVPD.docs=s.docs.map(x=>({id:x.id,...x.data()})).filter(x=>x&&x.id!==NET.pid);AVPD.t=Date.now();AVBD.t=-1;AVD.t=-1}catch(e){}}
setTimeout(avPlayersLoad,5000);setInterval(()=>{if(avPhase&&avPhase()!=='vote')avPlayersLoad()},60000);
async function avPushMine(){try{if(!NET.on||!NET.canWrite||!NET.pid)return;const A=AVS(),f=avMyFac();if(!f)return;const dm=A.dm||{};if(!Object.keys(dm).length&&!A.dmc)return;
  await NET.db.doc('avdmg/'+NET.pid).set({n:S.name||'Voyageur',g:S.rgid||null,f,dm,dmc:A.dmc||0,t:Date.now()})}catch(e){}}
setTimeout(avPushMine,9000);
const avSharedOn=()=>!!(NET.on&&NET.guilds&&Object.keys(NET.guilds).length);
avDmgSim=function(){if(!avSharedOn())return avDmgSimOld.apply(this,arguments);const t=avNow(),key=Math.floor(t/60000);if(AVD.t===key&&AVD.r)return AVD.r;
  const B0=avBotSim(),a={...B0.a},d={...B0.d};let ca=B0.ca,cd=B0.cd;
  for(const p of AVPD.docs){const tgt=p.f==='ange'?a:p.f==='demon'?d:null;if(!tgt)continue;for(const k in(p.dm||{}))if(k in tgt)tgt[k]+=+p.dm[k]||0;if(p.f==='ange')ca+=+p.dmc||0;else cd+=+p.dmc||0}
  AVD.t=key;AVD.r={a,d,ca,cd};return AVD.r};
{const af=avFinish;avFinish=function(){const r=af.apply(this,arguments);try{if(B&&B.av&&B.av.k!=='lv')setTimeout(avPushMine,300)}catch(e){}return r}}
/* classement de la guerre */
function avLbCard(){if(!avSharedOn())return'';const B0=avBotSim();const G={};for(const k in B0.G)G[k]={...B0.G[k]};const P=Object.values(B0.P).map(x=>({...x}));
  const sum=p=>Object.values(p.dm||{}).reduce((x,y)=>x+(+y||0),0)+(+p.dmc||0);
  for(const p of AVPD.docs){const v=sum(p);if(!v)continue;P.push({id:'r:'+p.id,n:p.n||'Joueur',g:p.g,f:p.f,dmg:v,real:1});if(p.g&&NET.guilds[p.g]){G[p.g]=G[p.g]||{n:NET.guilds[p.g].n,f:p.f,dmg:0};G[p.g].dmg+=v}}
  const A=AVS(),mine=Object.values(A.dm||{}).reduce((x,y)=>x+y,0)+(A.dmc||0);if(mine){P.push({id:'me',n:S.name||'Toi',g:S.rgid,f:avMyFac(),dmg:mine,me:1});if(S.rgid&&G[S.rgid])G[S.rgid].dmg+=mine}
  const c=CLST.d;if(c){const v=sum(c);if(v){const f=clFac();P.push({id:'b:claude:claude',n:'Claude',g:CLAUDE_GID,f,dmg:v,cl:1});G[CLAUDE_GID]=G[CLAUDE_GID]||{n:"Les Gardiens d'Éther",f,dmg:0};G[CLAUDE_GID].dmg+=v}}
  const GL=avGuildDmgList(),seen=new Set(GL.map(g=>g.gid));for(const [gid,g] of Object.entries(NET.guilds||{}))if(!seen.has(gid)){const f=avGuildFac(gid);if(f)GL.push({gid,n:g.n,f,dmg:0})}const capG=avCapGuild();const gs=GL.map(g=>[g.gid,g]),ps=P.sort((x,y)=>y.dmg-x.dmg).slice(0,8);
  const myRank=mine?P.findIndex(x=>x.me)+1:0;
  const row=(i,ic,n,v,cls='')=>`<div class="avlr ${cls}"><b class="avlp">${i}</b><span class="avln">${ic} ${n}</span><span class="avlv">${fmt(v)}</span></div>`;
  return`<div class="card"><div class="h3" style="margin:0">🏆 Classement de la guerre</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Dégâts faits pour son camp depuis le début des combats. Tous les membres des guildes participent, bots compris.</p>
   <div class="avlt">Toutes les guildes</div>${gs.length?gs.map(([gid,g],i)=>row(i+1,AVF[g.f]?AVF[g.f].ic:'',esc(g.n||'Guilde')+(capG&&capG.gid===gid?' 👑':''),g.dmg,gid===S.rgid?'me':'')).join(''):'<p class="muted" style="font-size:12.5px">Pas encore de dégâts.</p>'}
   <div class="avlt">Combattants</div>${ps.length?ps.map((p,i)=>row(i+1,AVF[p.f]?AVF[p.f].ic:'',esc(p.n)+(p.cl?' <i class="cltag">🤖 IA</i>':p.real?' <i class="rtag">JOUEUR</i>':''),p.dmg,p.me?'me':'')).join(''):''}
   ${mine&&myRank>8?`<p class="muted" style="font-size:12.5px;margin:6px 0 0">Toi : ${myRank}e avec ${fmt(mine)} dégâts.</p>`:''}</div>`}
{const wc=avWarCards;avWarCards=function(){const h=wc.apply(this,arguments);const lb=avLbCard();if(!lb)return h;const i=h.indexOf('<div class="card"><div class="h3" style="margin:0">💥 Dégâts par royaume');if(i<0)return h+lb;const j=h.indexOf('<div class="card">',i+10);return j>0?h.slice(0,j)+lb+h.slice(j):h+lb}}
/* la guilde qui a fait le plus de dégâts prend la capitale */
function avGuildDmgList(){const B0=avBotSim();const G={};for(const k in B0.G)G[k]={...B0.G[k]};const sum=p=>Object.values(p.dm||{}).reduce((x,y)=>x+(+y||0),0)+(+p.dmc||0);
  for(const p of AVPD.docs){const v=sum(p);if(v&&p.g&&NET.guilds[p.g]){G[p.g]=G[p.g]||{n:NET.guilds[p.g].n,f:p.f,dmg:0};G[p.g].dmg+=v}}
  const A=AVS(),mine=Object.values(A.dm||{}).reduce((x,y)=>x+y,0)+(A.dmc||0);if(mine&&S.rgid&&NET.guilds[S.rgid]){G[S.rgid]=G[S.rgid]||{n:NET.guilds[S.rgid].n,f:avMyFac(),dmg:0};G[S.rgid].dmg+=mine}
  const c=CLST.d;if(c){const v=sum(c);if(v){G[CLAUDE_GID]=G[CLAUDE_GID]||{n:"Les Gardiens d'Éther",f:clFac(),dmg:0};G[CLAUDE_GID].dmg+=v}}
  return Object.entries(G).map(([gid,g])=>({gid,...g})).sort((x,y)=>y.dmg-x.dmg)}
function avLeadFac(){const T=avTotals();return T.ange===T.demon?null:T.ange>T.demon?'ange':'demon'}
function avCapGuild(){if(!avSharedOn())return null;const f=avLeadFac();if(!f)return null;const L=avGuildDmgList().filter(g=>g.f===f);return L.length&&L[0].dmg>0?L[0]:null}
{const aw=avWinner;avWinner=function(){if(!avSharedOn())return aw.apply(this,arguments);return avLeadFac()||aw.apply(this,arguments)}}
{const co=avCapOwner;avCapOwner=function(){if(!avSharedOn())return co.apply(this,arguments);const g=avCapGuild();return g?g.f:null}}
{const dc=avDmgCard;avDmgCard=function(){const h=dc.apply(this,arguments);const g=avCapGuild();if(!g)return h;return h.replace('Capitale d\'Éther</span>',`Capitale d'Éther</span>`).replace(/<\/div><\/div>$/,`<p class="avcapg">👑 La capitale appartient à <b>${esc(g.n)}</b> ${AVF[g.f]?AVF[g.f].ic:''}, la guilde n°1 en dégâts du camp qui a le plus de points. À la fin, le camp qui a le plus de points gagne et cette guilde garde la capitale !</p></div></div>`)}}
