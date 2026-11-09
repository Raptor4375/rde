
/* ================= COMPTE : synchronisation plus sûre entre appareils + connexion Google =================
   1) Avant d'envoyer sa partie en ligne, l'appareil vérifie qu'un autre appareil n'a pas avancé entre-temps
      (avant, un téléphone resté ouvert pouvait renvoyer une vieille partie par-dessus la nouvelle).
   2) « A-t-on joué ici ? » se décide sur la vraie progression (invocations, étapes, niveaux, héros…), plus sur
      l'or ou les gemmes qui bougent tout seuls : la partie la plus avancée arrive sans fenêtre de conflit.
   3) La partie part en ligne quelques secondes après chaque action, et l'appareil regarde toutes les 2 minutes
      si l'autre a avancé.
   4) Connexion Google (facultative) : relie ton code de compte à ton compte Google, pour retrouver ta partie
      sur n'importe quel appareil sans retenir le code. */
(function(){try{
if(!window.RDE_APP||typeof accPush!=='function')return;
const prog=S0=>{const H=(S0&&S0.heroes)||{};let lv=0,e=0;for(const k in H){const h=H[k]||{};lv+=h.l||0;e+=(h.e||0)+(h.u||0)*10+(h.es||0)}
  return[S0.pulls||0,S0.max||0,S0.nmax||0,Object.keys(H).length,lv,e,(S0.skins||[]).length,S0.stage||0]};
const ahead=(a,b)=>a.some((x,i)=>x>((b&&b[i])||0));
const markSync=(S0)=>{try{accLS('p',JSON.stringify(prog(S0||S)))}catch(e){}};
const synced=()=>{try{return JSON.parse(accLS('p')||'null')}catch(e){return null}};
const push0=accPush;
const pushMark=async f=>{await push0(f);if(!ACC.err)markSync()};
{const ap=accApply;accApply=function(id,r){try{markSync(r.S)}catch(e){}return ap.apply(this,arguments)}}
accPull=async function(){if(!window.RDE_APP||!S.acct)return;let r;try{r=await accFetch(S.acct)}catch(e){return}if(!r)return pushMark(true);
  const syncT=+accLS('t')||0;if(r.dev===accDev()||r.t<=syncT)return pushMark();
  const sp=synced();const localProg=sp?ahead(prog(S),sp):(accHash(S)!==accLS('h'));
  if(!localProg||!S.name)return accApply(S.acct,r,'🔄 Ta partie a avancé sur ton autre appareil : synchronisation…');
  /* les deux ont joué : si l'autre n'a rien de plus que celle-ci, on garde celle-ci sans rien demander */
  if(!ahead(prog(r.S),prog(S))){accLS('t',r.t);return pushMark(true)}
  if(!ahead(prog(S),prog(r.S)))return accApply(S.acct,r,'🔄 Ta partie a avancé sur ton autre appareil : synchronisation…');
  accConflict(r)};
accPush=async function(force){if(!window.RDE_APP||!S.acct||!S.name||ACC.busy)return;const h=accHash(S);if(!force&&h===accLS('h'))return;
  if(!ACC.chk||Date.now()-ACC.chk>15000){ACC.chk=Date.now();let r=null;try{r=await accFetch(S.acct)}catch(e){}
    if(r&&r.dev!==accDev()&&r.t>(+accLS('t')||0))return accPull()}
  return pushMark(force)};
/* la partie part en ligne 10 s après la dernière action */
{const sv=save;save=function(){const r=sv.apply(this,arguments);try{clearTimeout(ACC.dt);ACC.dt=setTimeout(()=>{try{if(!document.hidden&&!B)accPush()}catch(e){}},10000)}catch(e){}return r}}
/* et on regarde régulièrement si l'autre appareil a avancé (pas pendant un combat ni une fenêtre ouverte) */
setInterval(()=>{try{if(!document.hidden&&!B&&!document.querySelector('#ovl .modal')&&S.acct)accPull()}catch(e){}},120e3);
window.addEventListener('pagehide',()=>{try{accPush()}catch(e){}});

/* ---------- connexion Google ---------- */
const GOK=()=>!!window.RDEG&&/(^|\.)github\.io$|^localhost$/.test(location.hostname);
const gDoc=async key=>{const db=await accDB();return db?db.doc('xfer/GOO'+key):null};
async function gLink(){if(!GOK())return toast("La connexion Google n'est pas disponible ici.");let g;
  try{g=await RDEG.signIn()}catch(e){const c=String(e&&e.code||e);if(/popup-closed|cancelled/.test(c))return;return toast(/unauthorized-domain|operation-not-allowed/.test(c)?"⚠️ La connexion Google n'est pas encore activée sur le serveur du jeu.":"⚠️ Connexion Google impossible pour le moment.")}
  return gSave(g)}
async function gSave(g){if(!S.acct){S.acct=accNew();save()}
  try{const d=await gDoc(g.key);if(!d)throw 0;const o={c:S.acct,n:String(S.name||''),t:Date.now()};
    /* les règles n'autorisent pas la modification d'une fiche xfer : on l'efface puis on la recrée */
    try{await d.set(o)}catch(e){try{await d.delete()}catch(_){}await d.set(o)}S.gmail=g.email||'Google';save();await pushMark(true);toast(g.mail?'✅ Ta partie est sauvegardée avec ton e-mail':'✅ Ta partie est reliée à ton compte Google');try{closeModal();accModal()}catch(e){}}
  catch(e){toast('⚠️ Impossible de relier le compte pour le moment (connexion ?)')}}
async function gFind(){const m=$('#accmsg'),say=t=>{if(m)m.innerHTML=t};if(!GOK())return say("La connexion Google n'est pas disponible ici.");let g;
  try{g=await RDEG.signIn()}catch(e){const c=String(e&&e.code||e);if(/popup-closed|cancelled/.test(c))return;return say(/unauthorized-domain|operation-not-allowed/.test(c)?"⚠️ La connexion Google n'est pas encore activée sur le serveur du jeu.":"⚠️ Connexion Google impossible pour le moment.")}
  return gLoad(g,say)}
async function gLoad(g,say){say('⏳ Recherche de ta partie…');let d=null;try{const r=await (await gDoc(g.key)).get();d=r&&r.exists?r.data():null}catch(e){return say('❌ Impossible de chercher ta partie. Vérifie ta connexion internet.')}
  if(!d||!d.c)return say(`❌ Aucune partie n'est reliée à ${esc(g.email||'ce compte Google')}. Sur ton ancien appareil : ⚙️ Paramètres → « Sauvegarder ma partie ».`);
  if(d.c===S.acct)return say('✅ Cette partie est déjà celle de ce compte Google 🙂');
  const i=$('#accin');if(i)i.value=accFmt(d.c);return accGo()}
const emErr=c=>/email-already-in-use/.test(c)?'Cette adresse a déjà un compte.':/invalid-email/.test(c)?"❌ Cette adresse e-mail n'est pas valide.":/weak-password/.test(c)?'❌ Le mot de passe doit faire au moins 6 caractères.':/wrong-password|invalid-credential|invalid-login|user-not-found/.test(c)?'❌ E-mail ou mot de passe incorrect.':/too-many-requests/.test(c)?'⏳ Trop d\'essais : réessaie dans quelques minutes.':/operation-not-allowed/.test(c)?"⚠️ La connexion par e-mail n'est pas encore activée sur le serveur du jeu.":/network/.test(c)?'❌ Pas de connexion internet.':'⚠️ Impossible pour le moment, réessaie plus tard.';
function emModal(mode){const sv=mode==='save';modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">✉️ ${sv?'Sauvegarder avec un e-mail':'Retrouver avec mon e-mail'}</div>
  <p class="muted" style="font-size:13px;margin:4px 0 2px">${sv?"Choisis ton adresse e-mail et un mot de passe (6 caractères minimum). Sur un autre appareil : « Retrouver mon compte » → « Avec mon e-mail ». Ton adresse n'est jamais montrée aux autres joueurs.":"Tape l'adresse e-mail et le mot de passe choisis sur ton ancien appareil."}</p>
  <input id="emA" class="emin" type="email" inputmode="email" placeholder="ton.adresse@email.fr" autocomplete="email" autocapitalize="off" spellcheck="false">
  <input id="emP" class="emin" type="password" placeholder="Mot de passe" autocomplete="${sv?'new-password':'current-password'}">
  <button class="btn p" data-a="emgo" data-v="${mode}" style="width:100%;margin-top:10px">${sv?'💾 Sauvegarder ma partie':'🔎 Retrouver ma partie'}</button>
  <button class="btn sm emfg" data-a="emreset">Mot de passe oublié ?</button><input id="accin" type="hidden"><div id="accmsg" class="muted" style="font-size:12.5px;margin-top:8px;text-align:center"></div>`);setTimeout(()=>{const i=$('#emA');i&&i.focus()},100)}
async function emGo(mode){const m=$('#accmsg'),say=t=>{if(m)m.innerHTML=t};const mail=String(($('#emA')||{}).value||'').trim(),pw=String(($('#emP')||{}).value||'');
  if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail))return say("❌ Cette adresse e-mail n'est pas valide.");if(pw.length<6)return say('❌ Le mot de passe doit faire au moins 6 caractères.');
  say('⏳ Un instant…');let g;
  try{if(mode==='save'){try{g=await RDEG.email('new',mail,pw)}catch(e){if(/email-already-in-use/.test(String(e&&e.code)))g=await RDEG.email('in',mail,pw);else throw e}}else g=await RDEG.email('in',mail,pw)}
  catch(e){return say(emErr(String(e&&e.code||e)))}
  g.mail=1;if(mode==='save'){await gSave(g);return}return gLoad(g,say)}
async function emReset(){const m=$('#accmsg'),say=t=>{if(m)m.innerHTML=t};const mail=String(($('#emA')||{}).value||'').trim();if(!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(mail))return say("Tape d'abord ton adresse e-mail au-dessus, puis reclique ici.");
  try{await RDEG.reset(mail);say(`📩 Si un compte existe pour ${esc(mail)}, un e-mail pour changer de mot de passe vient d'être envoyé (regarde aussi les spams).`)}catch(e){say(emErr(String(e&&e.code||e)))}}
{const am=accModal;accModal=function(){const r=am.apply(this,arguments);try{if(!GOK())return r;const m=document.querySelector('#ovl .modal');if(!m||m.querySelector('.gacc'))return r;
  const html=S.gmail?`<div class="gacc card"><b>✅ Partie sauvegardée</b><span>${esc(S.gmail)}</span><small>Sur un nouvel appareil : « Retrouver mon compte » → Google ou e-mail.</small><div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn sm" data-a="glink">Changer (Google)</button><button class="btn sm" data-a="emsave">Changer (e-mail)</button></div></div>`
    :`<div class="gacc card"><b>🔗 Relier à mon compte Google</b><small>Pour retrouver ta partie sur n'importe quel appareil, même si tu perds ton code. Ton adresse n'est jamais montrée aux autres joueurs.</small><div class="row" style="gap:6px;flex-wrap:wrap"><button class="btn p" data-a="glink"><span class="gG">G</span> Relier à Google</button><button class="btn" data-a="emsave">✉️ Avec un e-mail</button></div></div>`;
  const c=m.querySelector('.accode');(c||m.lastElementChild).insertAdjacentHTML('afterend',html)}catch(e){}return r}}
{const af=accFindModal;accFindModal=function(){const r=af.apply(this,arguments);try{if(!GOK())return r;const m=document.querySelector('#ovl .modal');const s=m&&m.querySelector('.sub');
  if(s&&!m.querySelector('.gfind'))s.insertAdjacentHTML('afterend',`<button class="btn gfind" data-a="gfind"><span class="gG">G</span> Se connecter avec Google</button><button class="btn" data-a="emfind" style="width:100%;margin-top:6px">✉️ Avec mon e-mail</button><div class="gor">ou avec ton code</div>`)}catch(e){}return r}}
/* dans les paramètres : le bouton Google bien visible, juste sous « Mon compte » */
{const sm=settingsModal;settingsModal=function(){const r=sm.apply(this,arguments);try{if(!GOK())return r;const box=document.querySelector('#ovl .modal .accset');if(box&&!box.querySelector('.gset'))box.insertAdjacentHTML('afterbegin',S.gmail?`<div class="gset gok">✅ Partie sauvegardée<small>${esc(S.gmail)}</small></div>`:`<button class="btn gset gbtn" data-a="glink"><span class="gG">G</span> Sauvegarder ma partie avec Google</button><button class="btn gset" data-a="emsave">✉️ Sauvegarder ma partie avec un e-mail</button>`)}catch(e){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;if(!['glink','gfind','emsave','emfind','emgo','emreset'].includes(a))return;e.preventDefault();e.stopPropagation();
  if(a==='glink')gLink();else if(a==='gfind')gFind();else if(a==='emsave')emModal('save');else if(a==='emfind')emModal('find');else if(a==='emgo')emGo(b.dataset.v);else emReset()},true);
document.addEventListener('keydown',e=>{if(e.key==='Enter'&&e.target&&(e.target.id==='emP'||e.target.id==='emA')){const b=document.querySelector('#ovl [data-a=emgo]');if(b){e.preventDefault();b.click()}}});
const st=document.createElement('style');st.textContent=`.gacc{display:flex;flex-direction:column;gap:5px;margin:10px 0;text-align:left}.gacc small{color:var(--muted);font-size:12px}.gacc span{font-size:13px}.gacc .btn{align-self:flex-start}
.gfind{width:100%;margin:6px 0 2px;background:#fff!important;color:#1f1f1f!important;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px}
.gG{display:inline-grid;place-items:center;width:20px;height:20px;border-radius:50%;background:conic-gradient(#ea4335 0 25%,#fbbc05 0 50%,#34a853 0 75%,#4285f4 0);color:#fff;font-weight:900;font-size:12px}
.gbtn{width:100%;background:#fff!important;color:#1f1f1f!important;font-weight:800;display:flex;align-items:center;justify-content:center;gap:8px}.gok{display:flex;flex-direction:column;align-items:center;font-weight:800;color:#9ae09a;font-size:13.5px;padding:6px}.gok small{color:var(--muted);font-weight:600}
.emin{display:block;width:100%;box-sizing:border-box;margin-top:8px;padding:12px 14px;border-radius:12px;border:1px solid var(--line);background:rgba(0,0,0,.35);color:var(--fg);font:inherit;font-size:16px}.emfg{margin-top:8px;background:none!important;border:0!important;color:var(--muted)!important;text-decoration:underline}
.gor{text-align:center;color:var(--muted);font-size:12px;margin:6px 0}`;document.head.appendChild(st);
try{const X={"✅ Reliée à Google":"✅ Linked to Google","🔗 Relier à mon compte Google":"🔗 Link my Google account","Relier à Google":"Link to Google","Changer de compte Google":"Change Google account","Se connecter avec Google":"Sign in with Google","ou avec ton code":"or with your code","Sauvegarder ma partie avec Google":"Save my game with Google","✉️ Sauvegarder ma partie avec un e-mail":"✉️ Save my game with an email","✉️ Avec un e-mail":"✉️ With an email","✉️ Avec mon e-mail":"✉️ With my email","Sauvegarder avec un e-mail":"Save with an email","Retrouver avec mon e-mail":"Find with my email","💾 Sauvegarder ma partie":"💾 Save my game","🔎 Retrouver ma partie":"🔎 Find my game","Mot de passe oublié ?":"Forgot password?","Mot de passe":"Password","✅ Partie sauvegardée":"✅ Game saved","Changer (Google)":"Change (Google)","Changer (e-mail)":"Change (email)","✅ Partie sauvegardée sur ton compte Google":"✅ Game saved to your Google account",
  "Pour retrouver ta partie sur n'importe quel appareil, même si tu perds ton code. Ton adresse n'est jamais montrée aux autres joueurs.":"To get your game back on any device, even if you lose your code. Your address is never shown to other players.",
  "Sur un nouvel appareil : « Retrouver mon compte » → « Se connecter avec Google ».":"On a new device: “Find my account” → “Sign in with Google”.","✅ Ta partie est reliée à ton compte Google":"✅ Your game is linked to your Google account"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
try{const P=PATCH.find(x=>x.v===43);const I=["🔗 <b>Connexion Google</b> : dans ⚙️ Paramètres → 🔑 Mon compte, relie ta partie à ton compte Google pour la retrouver sur n'importe quel appareil.","🔄 <b>Synchronisation entre appareils corrigée</b> : un appareil resté ouvert ne peut plus renvoyer une vieille partie, et la partie la plus avancée arrive toute seule."];
  if(P)P.items.push(...I);I18N_EN[I[0]]="🔗 <b>Google sign-in</b>: in ⚙️ Settings → 🔑 My account, link your game to your Google account to get it back on any device.";I18N_EN[I[1]]="🔄 <b>Device sync fixed</b>: a device left open can no longer send back an old save, and the most advanced save arrives on its own."}catch(e){}
}catch(e){console.warn('compte google',e)}})();
