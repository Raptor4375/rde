
/* ================= le chef retrouve sa couronne ================= */
/* Quand un joueur change d'identité en ligne (nouvelle appli, transfert, autre navigateur), la guilde gardait
   l'ancienne identité comme chef : le vrai chef n'avait plus ses droits. On reconnaît maintenant ses anciennes
   identités et on lui rend la place de chef tout seul. */
function myPids(){const L=new Set([NET.pid,NET.uid,S.opid,...(Array.isArray(S.pids)?S.pids:[])].filter(Boolean));return[...L]}
function pidsRemember(){try{if(!NET.pid)return;S.pids=Array.isArray(S.pids)?S.pids:[];let ch=false;for(const p of [NET.pid,NET.uid,S.opid])if(p&&!S.pids.includes(p)){S.pids.push(p);ch=true}if(S.pids.length>12)S.pids=S.pids.slice(-12);if(ch)save()}catch(e){}}
let CHEF_FIX=0;
async function chefRepair(){try{if(!NET.on||!NET.db||!NET.pid||!S.rgid)return;const gid=S.rgid,d=NET.guilds&&NET.guilds[gid];if(!d||d.npc)return;
  const L=String(d.leader||'');if(!L||L===NET.pid||L.startsWith('bot:'))return;if(Date.now()-CHEF_FIX<60000)return;CHEF_FIX=Date.now();
  let mine=myPids().includes(L);
  if(!mine){try{const s=await NET.db.doc('pidmap/'+L).get();if(s.exists&&s.data().uid&&s.data().uid===NET.uid)mine=true}catch(e){}}
  if(!mine){const lp=NET.players&&NET.players[L];const me=String(S.name||'').trim().toLowerCase();
    if(lp&&me&&String(lp.n||'').trim().toLowerCase()===me&&Date.now()-(+lp.last||+lp.t||0)>6*3600e3)mine=true;
    else if(!lp){/* l'ancien chef n'existe plus du tout : le sous-chef, sinon le plus puissant des vrais membres, reprend la guilde */
      const sc=(Array.isArray(d.roles)?d.roles:[]).find(x=>x.r==='sc'&&NET.players[x.k]);const best=realMembers(gid).sort((a,b)=>b.pw-a.pw)[0];
      if(sc?sc.k===NET.pid:(!best||teamPower()>=best.pw))mine=true}}
  if(!mine)return;
  await realGuildUpdate(x=>({leader:NET.pid,roles:(Array.isArray(x.roles)?x.roles:[]).filter(r=>r.k!==NET.pid&&r.k!==L)}));
  try{await postMsg(`👑 ${S.name||'Voyageur'} reprend sa place de chef de la guilde.`,true,gid)}catch(e){}
  toast('👑 Tu es de nouveau chef de ta guilde !');onNet()}catch(e){console.warn('chefRepair',e)}}
setTimeout(()=>{pidsRemember();chefRepair()},12000);setInterval(()=>{pidsRemember();chefRepair()},90000);
