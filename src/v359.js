
/* ================= V38.0 : supprimer son compte (Paramètres) ================= */
function delAccModal(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🗑️ Supprimer mon compte</div>
  <p class="muted" style="font-size:13.5px;line-height:1.45;margin:4px 0 8px">Tout sera effacé <b>pour de bon</b> : ta progression, tes héros, ta place dans les classements, ton profil public, ta sauvegarde en ligne et ton code de compte. Tu quittes aussi ta guilde.</p>
  <p class="muted" style="font-size:13.5px;line-height:1.45;margin:0 0 10px">Cette action est <b>définitive</b>, on ne pourra pas récupérer ta partie.</p>
  <label class="vh" for="delconf">Confirmation</label><input id="delconf" class="tx" data-noi18n autocomplete="off" autocapitalize="characters" spellcheck="false" placeholder="${LANG==='fr'?'SUPPRIMER':'DELETE'}" style="width:100%;box-sizing:border-box;text-transform:uppercase">
  <p class="muted" style="font-size:12px;margin:6px 0 0">Tape <b data-noi18n>${LANG==='fr'?'SUPPRIMER':'DELETE'}</b> pour confirmer.</p>
  <div class="row" style="gap:8px;margin-top:12px"><button class="btn" data-a="close" style="flex:1">Annuler</button><button class="btn" data-a="delaccgo" style="flex:1;background:#d1263b;color:#fff;border-color:#d1263b">Supprimer définitivement</button></div>`)}
async function delAccount(){const pid=NET.pid,uid=NET.uid,acct=S.acct;
  if(NET.on&&NET.db){
    try{if(S.rgid)await leaveRealGuild()}catch(e){}
    const del=async p=>{try{await NET.db.doc(p).delete()}catch(e){}};
    if(pid){await del('players/'+pid);await del('arena/'+pid);await del('refs/'+pid)}
    if(uid)await del('data/users/'+uid+'/save');
    try{if(pid){const s=await NET.db.collection('msgs').where('w','==',pid).limit(300).get();for(const d of s.docs)await del('msgs/'+d.id)}}catch(e){}
  }
  try{if(acct){const db=await accDB();if(db)await db.doc('xfer/ACC'+acct).delete()}}catch(e){}
  try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(sdk&&sdk.data){try{sdk.data.removeItem('rde-save')}catch(e){}}}catch(e){}
  try{const keep=new Set(['rde-lang']);const ks=[];for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&!keep.has(k)&&(k.startsWith(KEY)||k.startsWith('royaumes-')||k.startsWith('rde-')))ks.push(k)}ks.forEach(k=>localStorage.removeItem(k))}catch(e){}
  try{sessionStorage.clear()}catch(e){}
  window.__rdeDeleted=true;try{save=function(){}}catch(e){}try{const ls=localStorage.setItem.bind(localStorage);localStorage.setItem=function(k,v){if(k==='rde-lang')return ls(k,v)}}catch(e){}try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(sdk&&sdk.data)sdk.data.setItem=function(){}}catch(e){}
  location.reload()}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="delacc"],[data-a="delaccgo"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
  if(b.dataset.a==='delacc')return delAccModal();
  const v=String(($('#delconf')||{}).value||'').trim().toUpperCase();if(v!=='SUPPRIMER'&&v!=='DELETE'){toast(LANG==='fr'?'Tape SUPPRIMER pour confirmer.':'Type DELETE to confirm.');return}
  b.disabled=true;b.textContent='⏳ …';try{await delAccount()}catch(er){location.reload()}},true);
{const sm=settingsModal;settingsModal=function(){const r=sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=delacc]'))m.insertAdjacentHTML('beforeend','<button class="btn sm" data-a="delacc" style="width:100%;margin-top:14px;color:#ff8a9a;border-color:rgba(255,90,110,.45);background:transparent">🗑️ Supprimer mon compte</button>')}catch(e){}return r}}
try{Object.assign(I18N_EN,{"🗑️ Supprimer mon compte":"🗑️ Delete my account","Supprimer définitivement":"Delete permanently","Annuler":"Cancel","Confirmation":"Confirmation","Tape":"Type","pour confirmer.":"to confirm.","Tape SUPPRIMER pour confirmer.":"Type DELETE to confirm.",
 "Tout sera effacé":"Everything will be erased","pour de bon":"for good",": ta progression, tes héros, ta place dans les classements, ton profil public, ta sauvegarde en ligne et ton code de compte. Tu quittes aussi ta guilde.":": your progress, your heroes, your place in the rankings, your public profile, your online save and your account code. You also leave your guild.",
 "Cette action est":"This action is","définitive":"permanent",", on ne pourra pas récupérer ta partie.":", your game cannot be recovered."})}catch(e){}
