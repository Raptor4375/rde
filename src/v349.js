
/* ================= V36.6 : les bots parlent de la Guerre des Guildes, et ton appel les fait poser leurs équipes ================= */
const GWRX=/(guerre|royaume|territoire|capitale|pos(ez|er|é)|mett?(ez|ais|é) (vos|les|ta|tes) (team|équipe)|vos (team|équipe)|défen[sd]|attaqu|event|évent|év[eè]nement|on prend|conqu)/i;
const gwActive=()=>{try{const s=gwSeason();return GW_ON(s)&&['prep','war','final'].includes(gwPhase(s))}catch(e){return false}};
const GWL={
  prep:["N'oubliez pas la Guerre des Guildes, posez vos équipes dans nos royaumes 🏰","J'ai posé ma team, à vous ! 🛡️","Il faut qu'on prenne un royaume avant que les attaques commencent","Qui pose dans quel royaume ? On s'organise ?","Mettez vos meilleures équipes en défense, les attaques arrivent bientôt ⚔️","Les royaumes libres partent vite, faut se dépêcher"],
  war:["Ils attaquent nos royaumes, renforcez les défenses ! 🛡️","Je viens de vider un royaume ennemi 😤","Pensez à vos 3 attaques du jour ⚔️","On tient bon, encore quelques équipes à poser","Qui vient avec moi sur leur royaume le plus faible ?","Nos défenses tiennent, bien joué la team 💪"],
  final:["C'est la finale pour la capitale !! 👑","Tout le monde sur la capitale, on lâche rien","Posez vos dernières équipes, c'est maintenant que ça se joue","La capitale va être à nous 🔥"]};
const GWW=["La Guerre des Guildes c'est trop bien, on a pris 2 royaumes 🏰","Quelle guilde tient la capitale cette saison ?","Ma guilde se fait attaquer de partout 😭","Les royaumes du sud sont imprenables","Posez vos équipes les gars, sinon on perd nos royaumes","J'ai enchaîné 3 défenseurs avec une seule team 😎"];
/* 1) ton appel dans le tchat de guilde */
const GWR_RE=["Message reçu, je pose ma team 🛡️","J'y vais tout de suite ⚔️","Ok chef, je mets mon équipe dans un royaume","Bien vu, j'avais oublié ! C'est fait 🏰","Je pose ma meilleure team en défense","On y va, on va leur montrer 💪"];
async function gwRally(){const gid=S.rgid;if(!gid||!gwActive()||!NET.on||!NET.canWrite)return;const d=today();if(S.gwRD===d)return;S.gwRD=d;save();
  const bots=((NET.guilds[gid]||{}).bots||[]).filter(b=>b&&b.n);if(!bots.length)return;
  const resp=bots.slice().sort(()=>Math.random()-.5).slice(0,Math.min(3,bots.length));
  resp.forEach((b,i)=>setTimeout(()=>{postBotMsg(gid,b,GWR_RE[(i+Math.floor(Math.random()*GWR_RE.length))%GWR_RE.length])},2200+i*3200+Math.random()*1800));
  setTimeout(()=>gwRallyPost(gid).catch(()=>{}),4000)}
async function gwRallyPost(gid){await gwLoadAll();const day=gwDay(),ph=gwPhase();const pool=gwBotPool().filter(b=>b.g===gid);if(!pool.length)return;
  const placed=new Set();for(const k in GWD.m){const m=GWD.m[k];if(m&&m.tr)for(const id in m.tr)placed.add(id)}
  const dead=id=>{for(const k in GWD.m){const m=GWD.m[k];if(m&&m.bd&&m.bd[id]===day)return true}return false};
  let homes=GTER.filter(t=>GWD.m[t.k]&&GWD.m[t.k].own===gid).map(t=>t.k);
  try{if(ph==='final'&&(gwFinalists()||[]).includes(gid)&&(!GWD.m.cap||!GWD.m.cap.own||GWD.m.cap.own===gid))homes.unshift('cap')}catch(e){}
  if(!homes.length){const free=GTER.filter(t=>!GWD.m[t.k]||!GWD.m[t.k].own);if(free.length)homes=[free[Math.floor(Math.random()*free.length)].k]}
  if(!homes.length)return;
  const todo=pool.filter(b=>!placed.has(b.id)&&!dead(b.id)).sort((a,b)=>b.pw-a.pw).slice(0,Math.max(2,Math.ceil(pool.length*.6)));let n=0;
  for(const k of homes){if(!todo.length)break;if(!await gwLock(k,1))continue;
    try{const d=await gwRead(k);if(!d||(d.own&&d.own!==gid))continue;d.tr=d.tr||{};
      while(todo.length&&Object.keys(d.tr).length<GW_MAXT){const b=todo.shift();d.tr[b.id]={n:b.n,g:gid,bot:1,pw:b.pw,team:b.team,at:Date.now()};n++}
      d.own=d.own||gid;await gwWrite(k,d);GWD.m[k]=d}catch(e){}finally{gwLock(k,0)}}
  if(n){toast(`🛡️ ${n} membre${n>1?'s':''} de ta guilde ${n>1?'ont':'a'} posé leur équipe !`);try{if(TAB==='event'&&!B&&!$('#ovl').innerHTML)render()}catch(e){}}}
{const pm=postMsg;postMsg=function(x,sys,gid=S.rgid){const r=pm.apply(this,arguments);try{if(!sys&&gid&&gid===S.rgid&&GWRX.test(String(x)))gwRally()}catch(e){}return r}}
/* 2) ils en parlent d'eux-mêmes pendant la guerre */
function gwChatTick(){try{if(!gwActive()||!NET.on||!NET.canWrite||document.hidden)return;const ph=gwPhase();
  const gid=S.rgid;if(gid&&Math.random()<.3){const bots=((NET.guilds[gid]||{}).bots||[]).filter(b=>b&&b.n);if(bots.length){const L=GWL[ph]||GWL.war;postBotMsg(gid,pick(bots),pick(L))}}
  if(Math.random()<.08){const pool=botRows().filter(b=>Date.now()-b.last<36e5*6);if(pool.length){const b=pick(pool);postBotMsg('world',{id:b.bid,n:b.n},pick(GWW))}}}catch(e){}}
setTimeout(()=>{gwChatTick();setInterval(gwChatTick,(7+Math.random()*5)*60000)},90000);
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("📣 Pendant la Guerre des Guildes, rappelle-la dans le tchat de guilde (« posez vos équipes dans les royaumes », « n'oubliez pas la guerre »…) : les membres répondent et vont poser leurs équipes. Une fois par jour.")}catch(e){}
