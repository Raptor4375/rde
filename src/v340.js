/* ================= Profil : choisir son fond + fond des Cendres animé · maintenance programmée ================= */
PBG.cendres.fx=1;
function pbgFx(k){if(!PBG[k]||!PBG[k].fx)return'';return`<div class="pbgfx">${[...Array(12)].map((_,i)=>`<i style="left:${(i*8.3+3).toFixed(1)}%;--d:${(2.6+(i%4)*.7).toFixed(1)}s;--l:${(-(i*.53)).toFixed(2)}s;--s:${(.6+(i%3)*.35).toFixed(2)}"></i>`).join('')}<b class="pbgglow"></b></div>`}
{const pm=profileModal;profileModal=function(id){const r=pm.apply(this,arguments);try{if(!skinOn())return r;const m=document.querySelector('#ovl .modal');if(!m)return r;
  const pa=m.querySelector('.pbgart');if(pa&&!pa.querySelector('.pbgfx')){const k=id==='me'?S.pbg:((NET.players&&NET.players[String(id).replace(/^r:/,'')])||{}).pbg;pa.insertAdjacentHTML('beforeend',pbgFx(k))}
  if(id==='me'&&!m.querySelector('.pbgpick')){const own=(S.pbgs||[]).filter(k=>PBG[k]);const cur=own.includes(S.pbg)?S.pbg:'';
    const html=`<div class="pbgpick"><span class="pbgl">🖼️ Fond</span><button class="pbgc ${!cur?'on':''}" data-a="pbgme" data-v=""><span class="pbgmini base"></span><small>De base</small></button>${own.map(k=>`<button class="pbgc ${cur===k?'on':''}" data-a="pbgme" data-v="${k}"><span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG[k].art()}</svg></span><small>${esc(PBG[k].n.replace(/^Fond « |»$/g,''))}</small></button>`).join('')}${own.length?'':'<small class="muted" style="font-size:11.5px">Les fonds exclusifs s\'obtiennent dans le Pass Pro.</small>'}</div>`;
    const anchor=m.querySelector('.row')||m.querySelector('.h')||m.firstElementChild;anchor.insertAdjacentHTML('afterend',html)}}catch(e){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="pbgme"]');if(!b)return;e.preventDefault();e.stopPropagation();S.pbg=b.dataset.v||'';save();NET.lastPush='';try{schedulePush()}catch(er){}closeModal();profileModal('me')},true);
/* ---- maintenance programmée : 27/10 de 7h30 à 8h10 (heure de Paris) ---- */
const MNT=[{a:Date.UTC(2026,9,27,6,30),b:Date.UTC(2026,9,27,7,10),msg:"🔥 <b>La saison des Cendres arrive !</b><br>On prépare le nouveau Pass de combat, le Dressing et les apparences exclusives.<br><br>Retour à <b>8h10</b> pile. Ta progression est sauvegardée, à tout de suite !"}];
const mntNow=()=>{const t=Date.now();return MNT.find(m=>t>=m.a&&t<m.b)||null};
if(window.RDE_APP&&!window.RDE_SKTEST){let was=false;
  const rm0=rdeMaint;rdeMaint=function(on,msg){const m=mntNow();if(m&&!on)return;return rm0.apply(this,arguments)};
  const tick=()=>{const m=mntNow();if(m){if(!was){try{save()}catch(e){}}was=true;rm0(true,m.msg);const o=document.getElementById('rdemaint');if(o){const left=Math.max(0,m.b-Date.now());const n=o.querySelector('.rmn');if(n)n.innerHTML=`Retour dans <b>${Math.floor(left/60000)} min ${String(Math.floor(left/1000)%60).padStart(2,'0')} s</b> · ta progression est sauvegardée.`;const bt=o.querySelector('#rmretry');if(bt)bt.style.display='none'}}
    else if(was){was=false;rm0(false);setTimeout(()=>location.reload(),800)}};
  tick();setInterval(tick,1000);
  /* pendant la maintenance : on ne sauvegarde plus rien en ligne */
  {const cs=typeof cloudSave==='function'?cloudSave:null;if(cs)cloudSave=async function(){if(mntNow())return;return cs.apply(this,arguments)}}
  {const pm=pushMe;pushMe=async function(){if(mntNow())return;return pm.apply(this,arguments)}}}
