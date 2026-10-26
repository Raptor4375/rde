
/* ================= Compte RDE : un code pour jouer sur PC ET téléphone ================= */
/* Chaque joueur a un code de compte (8 caractères). La partie est sauvegardée en ligne sous ce code,
   et se synchronise toute seule entre les appareils qui l'utilisent.
   Sur un nouvel appareil : Paramètres → « Retrouver mon compte » → taper le code. */
const ACC_AL='ABCDEFGHJKMNPQRSTUVWXYZ23456789';
function accNew(){const a=new Uint32Array(8);try{crypto.getRandomValues(a)}catch(e){for(let i=0;i<8;i++)a[i]=Math.floor(Math.random()*1e9)}let s='';for(const x of a)s+=ACC_AL[x%ACC_AL.length];return s}
const accFmt=c=>String(c||'').slice(0,4)+'-'+String(c||'').slice(4);
const accNorm=c=>String(c||'').toUpperCase().replace(/[^A-Z0-9]/g,'');
const ACC={busy:0,last:0,lastH:'',err:''};
const accLS=(k,v)=>{try{if(v===undefined)return localStorage.getItem(KEY+'-acc-'+k);localStorage.setItem(KEY+'-acc-'+k,String(v))}catch(e){return null}};
function accDev(){let d=accLS('dev');if(!d){d=accNew()+accNew();accLS('dev',d)}return d}
/* empreinte de la progression (sans ce qui bouge tout seul) */
const ACC_K=['heroes','gems','gold','shards','ush','items','stage','max','nmax','pulls','pity','stdm','inv','saga','frame','rgid','gid','name'];
function accHash(S0){try{const s=JSON.stringify(ACC_K.map(k=>S0[k]));let h=5381;for(let i=0;i<s.length;i++)h=((h<<5)+h+s.charCodeAt(i))|0;return String(h>>>0)+':'+s.length}catch(e){return''}}
function accSum(S0){const H=Object.keys(S0.heroes||{}).length;
  return{n:S0.name||'?',h:H,st:S0.stage||0,nm:S0.nmax||0,g:S0.gems||0,p:S0.pulls||0}}
async function accDB(){try{return window.RDE_APP?await window.claude.use('db'):null}catch(e){return null}}
async function accWrite(db,id,o){const r=db.doc('xfer/ACC'+id);try{await r.set(o)}catch(e){try{await r.delete()}catch(_){}await r.set(o)}}
async function accPush(force){if(!window.RDE_APP||!S.acct||!S.name||ACC.busy)return;const h=accHash(S);if(!force&&h===accLS('h'))return;
  ACC.busy=1;try{const db=await accDB();if(!db)return;const t=Date.now();
    await accWrite(db,S.acct,{d:await accPack(t),t,n:String(S.name||'')});
    accLS('t',t);accLS('h',h);ACC.last=t;ACC.err=''}catch(e){ACC.err=String(e&&e.code||e)}finally{ACC.busy=0}}
async function accPack(t){const js=JSON.stringify({v:2,pid:(typeof NET!=='undefined'&&NET.pid)||S.opid||null,t,n:S.name||'',dev:accDev(),S:xferSlim(S),g:null});
  let body;try{const st=new Blob([js]).stream().pipeThrough(new CompressionStream('deflate-raw'));body='Z'+xB64(await new Response(st).arrayBuffer())}catch(e){body='J'+btoa(unescape(encodeURIComponent(js)))}return'RDE2-'+body.length+'-'+body}
async function accFetch(id){const db=await accDB();if(!db)throw new Error('offline');const s=await db.doc('xfer/ACC'+id).get();if(!s||!s.exists)return null;const d=s.data();let o=null;try{o=await xferRead(d.d)}catch(e){}return o&&o.S?{t:+d.t||+o.t||0,dev:o.dev,pid:o.pid||null,n:o.n,S:o.S}:null}
function accApply(id,r,msg){const N=Object.assign(fresh(),r.S);try{if(N.world&&(!N.world.players||!N.world.players.length))N.world.players=genWorld().players}catch(e){}
  N.acct=id;if(r.pid&&r.pid!==((typeof NET!=='undefined'&&NET.pid)||null))N.opid=r.pid;N.xferAsk=1;N.ts=Date.now();
  try{const P=new Set([...(Array.isArray(N.pids)?N.pids:[]),...(Array.isArray(S.pids)?S.pids:[])]);N.pids=[...P].slice(-12)}catch(e){}
  S=N;save();accLS('t',r.t);accLS('h',accHash(N));try{localStorage.setItem(KEY+'-xfer','1')}catch(e){}
  try{toast(msg||'✅ Compte récupéré ! Le jeu redémarre…')}catch(e){}setTimeout(()=>location.reload(),1100)}
/* au démarrage et au retour sur l'appli : on récupère la partie si elle a avancé sur un autre appareil */
async function accPull(){if(!window.RDE_APP||!S.acct)return;let r;try{r=await accFetch(S.acct)}catch(e){return}if(!r)return accPush(true);
  const syncT=+accLS('t')||0;if(r.dev===accDev()||r.t<=syncT)return accPush();
  const localChanged=accHash(S)!==accLS('h');
  if(!localChanged||!S.name)return accApply(S.acct,r,'🔄 Ta partie a avancé sur ton autre appareil : synchronisation…');
  accConflict(r)}
function accConflict(r){const a=accSum(S),b=accSum(r.S);const row=(x,lbl,tag)=>`<button class="card acpick" data-a="accpick" data-v="${tag}"><b>${lbl}</b><span>${esc(x.n)} · ${x.h} héros · étape ${x.st} · ${(x.g||0).toLocaleString('fr-FR')} gemmes · ${fmt(x.p)} invocations</span></button>`;
  ACC.pend=r;modal(`<div class="h">🔄 Deux parties différentes</div><p class="sub">Tu as joué sur cet appareil <b>et</b> sur un autre depuis la dernière synchronisation. Laquelle veux-tu garder ? L'autre sera remplacée.</p>
   ${row(b,'📱 La partie de ton autre appareil','remote')}${row(a,'💻 La partie de cet appareil','local')}`)}
/* --- les fenêtres --- */
function accModal(){if(!S.acct){S.acct=accNew();save();accPush(true)}const t=+accLS('t')||0;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 Mon compte</div>
   <p class="sub">Ton code de compte te permet de jouer avec <b>la même partie</b> sur ton téléphone et ton ordinateur. Garde-le précieusement et ne le donne à personne.</p>
   <div class="accode">${accFmt(S.acct)}</div>
   <div class="row" style="justify-content:center;gap:8px"><button class="btn p" data-a="acccopy">📋 Copier le code</button><button class="btn" data-a="accsync">🔄 Synchroniser</button></div>
   <ol class="xfol"><li>Sur ton autre appareil, ouvre <b>${typeof RDE_URL!=='undefined'?RDE_URL.replace('https://',''):'le jeu'}</b>.</li><li>Va dans <b>⚙️ Paramètres → 🔑 Retrouver mon compte</b> (ou « J'ai déjà un compte » au premier lancement).</li><li>Tape ce code : ta partie arrive, et ensuite elle se synchronise toute seule.</li></ol>
   <div class="muted" style="font-size:12px;text-align:center">${ACC.err?'⚠️ Synchronisation impossible pour le moment (connexion ?)':t?'✅ Dernière sauvegarde en ligne : '+new Date(t).toLocaleString('fr-FR',{day:'numeric',month:'short',hour:'2-digit',minute:'2-digit'}):'⏳ Première sauvegarde en ligne en cours…'}</div>
   <button class="btn" data-a="accfind" style="width:100%;margin-top:10px">🔑 Utiliser un autre code (retrouver mon compte)</button>`)}
function accFindModal(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 Retrouver mon compte</div>
   <p class="sub">Sur ton autre appareil, va dans <b>⚙️ Paramètres → 🔑 Mon compte</b> et tape ici le code à 8 caractères.</p>
   <input id="accin" class="accin" maxlength="9" placeholder="XXXX-XXXX" autocomplete="off" autocapitalize="characters" spellcheck="false">
   <button class="btn p" data-a="accgo" style="width:100%;margin-top:10px">Retrouver ma partie</button><div id="accmsg" class="muted" style="font-size:12.5px;margin-top:8px;text-align:center"></div>`);setTimeout(()=>{const i=$('#accin');i&&i.focus()},100)}
async function accGo(){const i=$('#accin'),m=$('#accmsg'),say=t=>{if(m)m.innerHTML=t};const c=accNorm(i&&i.value);
  if(c.length!==8){say('❌ Le code fait 8 caractères (par exemple K7M2-QX9P).');return}
  if(c===S.acct){say('C\'est déjà le code de cet appareil 🙂 Tape celui de ton autre appareil.');return}
  say('⏳ Recherche de ta partie…');let r;try{r=await accFetch(c)}catch(e){say('❌ Impossible de vérifier le code. Vérifie ta connexion internet.');return}
  if(!r){say('❌ Code introuvable. Vérifie les caractères, et ouvre le jeu une fois sur ton autre appareil après la mise à jour.');return}
  const b=accSum(r.S),a=accSum(S);ACC.pend=Object.assign(r,{id:c});
  say(`<div class="card" style="text-align:left;margin-top:6px"><b>${esc(b.n)}</b><br>${b.h} héros · étape ${b.st} · ${(b.g||0).toLocaleString('fr-FR')} gemmes · ${fmt(b.p)} invocations</div>
    ${S.name&&a.h>4?`<div style="margin:8px 0;color:#ffb05a">⚠️ La partie de cet appareil (${esc(a.n)}, ${a.h} héros) sera remplacée.</div>`:''}<button class="btn pro" data-a="accok" style="width:100%;margin-top:6px">✅ Oui, jouer avec cette partie</button>`)}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a;
  if(!['accopen','accfind','accgo','accok','acccopy','accsync','accpick'].includes(a))return;e.preventDefault();e.stopPropagation();
  if(a==='accopen')return accModal();if(a==='accfind')return accFindModal();if(a==='accgo')return accGo();
  if(a==='accok'){const r=ACC.pend;if(r&&r.id)accApply(r.id,r);return}
  if(a==='acccopy'){let ok=false;try{await navigator.clipboard.writeText(accFmt(S.acct));ok=true}catch(er){}toast(ok?'📋 Code copié !':'Code : '+accFmt(S.acct));return}
  if(a==='accsync'){toast('🔄 Synchronisation…');await accPull();await accPush(true);if(!ACC.err)toast('✅ Partie sauvegardée en ligne');else toast('⚠️ Pas de connexion, réessaie plus tard');try{closeModal();accModal()}catch(er){}return}
  if(a==='accpick'){const r=ACC.pend;closeModal();if(!r)return;if(b.dataset.v==='remote')accApply(S.acct,r,'🔄 Partie de ton autre appareil récupérée !');else{accLS('t',r.t);await accPush(true);toast('✅ On garde la partie de cet appareil')}}},true);
/* les boutons dans les paramètres et au premier lancement */
{const sm=settingsModal;settingsModal=function(){const r=sm.apply(this,arguments);try{if(window.RDE_APP){const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=accopen]')){
  const hh=m.querySelector('.h');(hh||m).insertAdjacentHTML(hh?'afterend':'beforeend',`<div class="accset"><button class="btn pro" data-a="accopen">🔑 Mon compte (PC + téléphone)</button><button class="btn" data-a="accfind">🔑 Retrouver mon compte</button></div>`)}}}catch(e){}return r}}
{const nm=nameModal;nameModal=function(){const r=nm.apply(this,arguments);try{if(window.RDE_APP){const m=document.querySelector('#ovl .modal .xfwel');if(m&&!m.querySelector('[data-a=accfind]'))m.querySelector('[data-a=xfimp]').insertAdjacentHTML('beforebegin','<button class="btn p" data-a="accfind" style="width:100%;margin-bottom:8px">🔑 J\'ai un code de compte (autre appareil)</button>')}}catch(e){}return r}}
/* le code de transfert accepte aussi un code de compte */
{const xi=xferImport;xferImport=async function(){const ta=$('#xfin');const c=accNorm(ta&&ta.value);if(c.length===8&&!/^RDE/.test(c)){closeModal();accFindModal();const i=$('#accin');if(i)i.value=accFmt(c);return accGo()}return xi.apply(this,arguments)}}
/* démarrage + synchronisation automatique */
if(window.RDE_APP){
  setTimeout(async()=>{try{if(S.name&&!S.acct){S.acct=accNew();save();accLS('h','');await accPush(true);if(!S.accIntro){S.accIntro=1;save();setTimeout(()=>{try{if(!document.querySelector('#ovl .modal')&&!B)accIntro()}catch(e){}},4000)}}else await accPull()}catch(e){}},5000);
  setInterval(()=>{try{if(!document.hidden)accPush()}catch(e){}},90e3);
  document.addEventListener('visibilitychange',()=>{try{if(document.hidden)accPush();else if(Date.now()-(ACC.vis||0)>20e3){ACC.vis=Date.now();if(!B)accPull()}}catch(e){}});
}
function accIntro(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 Nouveau : ton code de compte</div><p class="sub">Tu peux maintenant jouer avec <b>la même partie</b> sur ton téléphone et ton ordinateur. Ton code :</p><div class="accode">${accFmt(S.acct)}</div><p class="muted" style="font-size:12.5px">Sur l'autre appareil : ⚙️ Paramètres → 🔑 Retrouver mon compte. Tu retrouveras ce code à tout moment dans les paramètres.</p><button class="btn p" data-a="close" style="width:100%">Compris !</button>`)}
try{PATCH.unshift({v:35,d:'26 octobre 2026',t:'Un compte pour PC et téléphone',items:["🔑 <b>Ton code de compte</b> : dans ⚙️ Paramètres → 🔑 Mon compte. Avec ce code, tu joues avec <b>la même partie</b> sur ton téléphone et ton ordinateur.","📱💻 Sur un autre appareil : ⚙️ Paramètres → <b>🔑 Retrouver mon compte</b>, tape ton code, et ta partie arrive. Ensuite elle se <b>synchronise toute seule</b> entre tes appareils.","🔄 Si tu as joué des deux côtés sans connexion, le jeu te demande quelle partie garder.","💻 <b>Format ordinateur</b> : sur un grand écran, le menu passe à gauche, les décors tiennent dans l'écran et le journal de combat est à droite."]})}catch(e){}
