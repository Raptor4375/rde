
/* ================= correctifs : amis « introuvables », messages privés, donjon ================= */
/* 1) Un ami qui a changé d'identité en ligne (nouvelle appli, itch, autre téléphone…) n'était plus retrouvé :
      on le retrouve par son pseudo et on met l'ami à jour tout seul. */
function realByName(n){n=String(n||'').trim().toLowerCase();if(!n)return null;try{return realRows().find(r=>String(r.n||'').trim().toLowerCase()===n)||null}catch(e){return null}}
{const fr=frResolve;frResolve=function(k){const r=fr.apply(this,arguments);if(r||!String(k).startsWith('real:'))return r;
  try{const id=k.slice(5);const raw=NET.players&&NET.players[id];let n=raw&&raw.n;if(!n){const f=(S.friends||[]).find(x=>x.k===k);n=f&&f.n}if(!n){const c=DMS()[k];n=c&&c.n}return realByName(n)}catch(e){return null}}}
function frMigrate(){try{let ch=false;const L=S.friends||[];for(const f of L){if(!String(f.k).startsWith('real:'))continue;const id=f.k.slice(5);if(realRows().some(r=>r.pid===id))continue;
    const r=frResolve(f.k);if(r&&r.pid&&r.pid!==id){const nk='real:'+r.pid;if(L.some(x=>x.k===nk)){f.dead=1}else{f.k=nk;f.n=r.n}ch=true}}
  if(ch){S.friends=L.filter(f=>!f.dead);save()}}catch(e){}}
setTimeout(frMigrate,9000);setInterval(frMigrate,120000);
{const rb=rowById;rowById=function(id){const r=rb.apply(this,arguments);if(r||!String(id).startsWith('r:'))return r;return frResolve('real:'+String(id).slice(2))}}
/* les messages privés partent vers la bonne identité de l'ami */
{const ds=dmSend;dmSend=function(key,x){try{if(String(key).startsWith('real:')){const id=key.slice(5),r=frResolve(key);if(r&&r.pid&&r.pid!==id){const D=DMS(),nk='real:'+r.pid;if(D[key]){if(!D[nk])D[nk]=D[key];else{D[nk].msgs=(D[nk].msgs||[]).concat(D[key].msgs||[]).sort((a,b)=>a.t-b.t)}delete D[key]}if(UI.dmk===key)UI.dmk=nk;key=nk}}}catch(e){}return ds.call(this,key,x)}}
/* 2) Les réponses rapides (« Salut ! », « Ça va ? »…) servent à parler aux bots : avec un vrai joueur on les cache,
      sinon ses messages ressemblaient à ceux d'un bot. */
{const pm=pMP;pMP=function(){const h=pm.apply(this,arguments);try{if(UI.dmk&&String(UI.dmk).startsWith('real:'))return h.replace(/<div class="chips" style="margin:8px 0">[\s\S]*?<\/div>/,'')}catch(e){}return h}}
/* 3) Donjon : si le combat s'arrête parce que le temps est écoulé (tes héros sont encore debout),
      l'expédition n'est plus perdue. L'équipe se replie et tu peux retenter la salle. */
{const ef=evFinish;evFinish=function(dmg,rw){if(!DGX.active)return ef.apply(this,arguments);try{const R=dgRun();const heroes=B.units.some(u=>u.side===0&&u.hp>0),foes=B.units.some(u=>u.side===1&&u.hp>0);
   if(R&&heroes&&foes){DGX.active=false;for(const u of B.units)if(u.side===0&&u.hid!=null)R.hp[u.hid]=Math.max(0,u.hp/u.max);R.cleared=false;save();
     rw.push("⏳ Temps écoulé ! Ton équipe se replie, l'expédition continue.");rw.push('▶️ Touche « Reprendre » pour retenter la salle (tes PV restent ceux de la fin du combat).');return'Repli !'}}catch(e){}
  return ef.apply(this,arguments)}}
