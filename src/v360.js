
/* ================= V38.1 : Guerre des Guildes — un héros ne peut être posé que dans UN royaume ================= */
const gwMyIds=()=>new Set([NET.pid,S.opid,...(Array.isArray(S.pids)?S.pids:[])].filter(Boolean));
/* on se fie aussi aux royaumes en ligne (et plus seulement à la mémoire de l'appareil, qui pouvait se perdre lors d'une synchro) */
function gwServerMine(){const me=gwMyIds(),o={};for(const k in GWD.m){const d=GWD.m[k];if(!d||!d.tr)continue;for(const id in d.tr){const t=d.tr[id];if(t&&!t.bot&&me.has(t.p)&&Array.isArray(t.team))o[id]={k,ids:t.team.map(x=>+(x&&x.id!=null?x.id:x))}}}return o}
{const ms=gwMineSync;gwMineSync=function(){const r=ms.apply(this,arguments);try{const G=GWS(),sv=gwServerMine();let ch=false;for(const id in sv)if(!G.mine[id]){G.mine[id]=sv[id];ch=true}if(ch)save()}catch(e){}return r}}
try{gwPosted=function(){const G=GWS(),o=new Set();for(const id in G.mine)for(const h of G.mine[id].ids)o.add(+h);try{const sv=gwServerMine();for(const id in sv)for(const h of sv[id].ids)o.add(+h)}catch(e){}return o}}catch(e){}
/* juste avant de poser : on relit tous les royaumes, puis on revérifie */
{const gp=gwPost;let busy=false;gwPost=async function(k){if(busy)return;busy=true;try{try{GWD.busy=0;await gwLoadAll()}catch(e){}
  const ids=(GWD.sel||[]).slice(0,5),used=gwPosted();if(ids.some(i=>used.has(+i))){closeModal();toast(LANG==='fr'?'Un de ces héros est déjà posé dans un autre royaume.':'One of these heroes is already posted in another kingdom.');try{render()}catch(e){}return}
  return await gp.apply(this,arguments)}finally{busy=false}}}
try{Object.assign(I18N_EN,{"Un de ces héros est déjà posé dans un autre royaume.":"One of these heroes is already posted in another kingdom."})}catch(e){}
