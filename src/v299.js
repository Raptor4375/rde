/* ================= les ultra-évolutions des vrais joueurs sont partagées (profils, arène, tournoi) ================= */
{const pm=pushMe;let lastU='';pushMe=async function(){const r=await pm.apply(this,arguments);try{if(!NET.on||!NET.canWrite||!NET.pid||!S.name)return r;
  const team=teamIdsFor('pvp').filter(i=>S.heroes[i]).map(i=>({id:i,l:S.heroes[i].l,e:S.heroes[i].e,u:Math.min(3,S.heroes[i].u||0)}));const k=JSON.stringify(team)+'|'+NET.lastPushT;
  if(k!==lastU&&team.some(t=>t.u)){lastU=k;await NET.db.doc('players/'+NET.pid).update({team})}}catch(e){}return r}}
setTimeout(()=>{try{NET.lastPush='';pushMe()}catch(e){}},12000);
