
/* ================= TRANSFERT DE PROGRESSION (vers la nouvelle appli RDE) ================= */
const RDE_URL='https://raptor4375.github.io/rde/';
function xB64(buf){const u=new Uint8Array(buf);let s='';for(let i=0;i<u.length;i+=0x8000)s+=String.fromCharCode.apply(null,u.subarray(i,i+0x8000));return btoa(s)}
function xUnB64(s){const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u}
async function xferMake(){let g=null;try{if(S.rgid&&NET.guilds&&NET.guilds[S.rgid])g={id:S.rgid,d:NET.guilds[S.rgid]}}catch(e){}
  const js=JSON.stringify({v:2,pid:NET.pid||null,t:Date.now(),n:S.name||'',S:xferSlim(S),g});
  let body;try{const st=new Blob([js]).stream().pipeThrough(new CompressionStream('deflate-raw'));body='Z'+xB64(await new Response(st).arrayBuffer())}catch(e){body='J'+btoa(unescape(encodeURIComponent(js)))}
  return'RDE2-'+body.length+'-'+body}
/* on retire ce qui se recrée tout seul (joueurs PNJ, vieilles lettres déjà lues) pour un code bien plus court */
function xferSlim(S0){const o=JSON.parse(JSON.stringify(S0));try{if(o.world){o.world.players=[];o.world.news=(o.world.news||[]).slice(-8)}}catch(e){}
  try{if(Array.isArray(o.letters))o.letters=o.letters.filter(x=>!x.claimed).slice(-5)}catch(e){}try{if(Array.isArray(o.mail))o.mail=o.mail.slice(-30)}catch(e){}return o}
async function xferRead(code){code=String(code||'').replace(/\s+/g,'');
  const m2=/^RDE2-(\d+)-(.*)$/.exec(code);if(m2){const n=+m2[1],body=m2[2];if(body.length<n){const er=new Error('court');er.got=body.length;er.need=n;throw er}const B2=body.slice(0,n);
    if(B2[0]==='Z'){const u=xUnB64(B2.slice(1));const st=new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return JSON.parse(await new Response(st).text())}return JSON.parse(decodeURIComponent(escape(atob(B2.slice(1)))))}
  if(code.startsWith('RDE1-')){const u=xUnB64(code.slice(5));const st=new Blob([u]).stream().pipeThrough(new DecompressionStream('deflate-raw'));return JSON.parse(await new Response(st).text())}
  if(code.startsWith('RDE0-'))return JSON.parse(decodeURIComponent(escape(atob(code.slice(5)))));throw new Error('format')}
const xferPow=o=>{try{return Object.entries(o.S.heroes||{}).length}catch(e){return 0}};
/* --- dans la version actuelle : récupérer son code --- */
const XFK="AIzaSyAFIM0mUyMwFDouGVVODghOfZhT13rxrAg",XFP="royaume-d-ether",XFA='ABCDEFGHJKMNPQRSTUVWXYZ23456789';
/* code court : on dépose le code long dans la base de la nouvelle appli, sous un petit code de 6 lettres */
async function xferShort(code){const ctl=new AbortController();const to=setTimeout(()=>ctl.abort(),9000);
  try{const r=await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+XFK,{method:'POST',headers:{'Content-Type':'application/json'},body:'{"returnSecureToken":true}',signal:ctl.signal});const j=await r.json();if(!j.idToken)return null;
    for(let k=0;k<3;k++){let c='';const R=crypto.getRandomValues(new Uint32Array(6));for(let i=0;i<6;i++)c+=XFA[R[i]%XFA.length];
      const w=await fetch(`https://firestore.googleapis.com/v1/projects/${XFP}/databases/(default)/documents/xfer?documentId=${c}`,{method:'POST',headers:{'Content-Type':'application/json',Authorization:'Bearer '+j.idToken},body:JSON.stringify({fields:{d:{stringValue:code},t:{integerValue:String(Date.now())},n:{stringValue:String(S.name||'')}}}),signal:ctl.signal});
      if(w.ok)return c.slice(0,3)+'-'+c.slice(3)}return null}catch(e){return null}finally{clearTimeout(to)}}
async function xferExportModal(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📦 Transférer ma progression</div><p class="sub">⏳ Préparation de ton code…</p>`);
  let code='';try{code=await xferMake()}catch(e){toast('Impossible de créer le code, réessaie.');return}
  XF.code=code;const sh=await xferShort(code);XF.short=sh;
  const long=`<textarea class="tx xfcode" id="xfcode" readonly rows="4" aria-label="Ton code de transfert">${esc(code)}</textarea>
   <div class="row" style="gap:8px;margin-top:8px"><button class="btn ${sh?'':'p'}" data-a="xfcopy" style="flex:1">📋 Copier le code long</button>${window.RDE_APP?'<button class="btn" data-a="xfdl">💾 Fichier</button>':''}</div>
   ${code.length>3000?`<div class="xfparts"><div class="muted" style="font-size:12px">Si le code ne passe pas en entier, copie-le en plusieurs morceaux et colle-les <b>à la suite</b> dans la nouvelle appli :</div><div class="row" style="gap:6px;flex-wrap:wrap;margin-top:4px">${xferParts(code).map((_,i,a)=>`<button class="btn sm" data-a="xfpart" data-v="${i}">📋 Morceau ${i+1}/${a.length}</button>`).join('')}</div></div>`:''}`;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📦 Transférer ma progression</div>
   <p class="sub">Ton code contient <b>tout ton compte</b> : héros, niveaux, gemmes, équipement, guilde, histoire, titres… Ne le donne à personne.</p>
   ${window.RDE_APP?'':`<a class="btn pro xf1clic" href="${RDE_URL}#rde=${encodeURIComponent(code)}" target="_blank" rel="noopener">🚀 Transférer en un clic</a><p class="muted" style="font-size:12px;margin:4px 0 10px;text-align:center">Ouvre la nouvelle appli et récupère ton compte tout seul. Si rien ne se passe, utilise le code ci-dessous.</p>`}
   <ol class="xfol"><li>Ouvre la nouvelle appli : <b>${RDE_URL.replace('https://','')}</b></li><li>Choisis <b>« J'ai déjà un compte »</b>.</li><li>${sh?'Tape ce code':'Colle le code'} et valide.</li></ol>
   ${sh?`<div class="xfshort" aria-label="Ton code : ${sh}">${sh}</div><button class="btn p" data-a="xfcopys" style="width:100%">📋 Copier le code</button>
     <p class="muted" style="font-size:12px;margin:6px 0 0;text-align:center">Valable 24 heures et une seule fois. Refais-en un si besoin.</p>
     <details class="sgdet" style="margin-top:8px"><summary>Le code court ne marche pas ? Utilise le code long</summary>${long}</details>`
   :`${long}<p class="muted" style="font-size:12px;margin:8px 0 0">Le code est long, c'est normal (${fmt(code.length)} caractères). Refais-en un juste avant de transférer pour avoir ta progression la plus récente.</p>`}`)}
const XF={code:'',short:null};
const xferParts=c=>{const n=Math.ceil(c.length/4000),L=[];for(let i=0;i<n;i++)L.push(c.slice(i*4000,(i+1)*4000));return L};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="xfpart"]');if(!b)return;e.preventDefault();e.stopPropagation();const i=+b.dataset.v,P=xferParts(XF.code);const t=P[i]||'';let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(er){try{const x=document.createElement('textarea');x.value=t;x.style.position='fixed';x.style.opacity='0';document.body.appendChild(x);x.focus();x.select();ok=document.execCommand('copy');x.remove()}catch(y){}}toast(ok?`Morceau ${i+1}/${P.length} copié ! Colle-le dans la nouvelle appli${i<P.length-1?', puis reviens copier le suivant':''}.`:'Copie impossible ici : sélectionne le code à la main.');b.classList.add('done')},true);
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="xfexp"],[data-a="xfcopy"],[data-a="xfdl"],[data-a="xfimp"],[data-a="xfgo"],[data-a="xfnew"],[data-a="xfcopys"]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.a;
  if(a==='xfexp')return xferExportModal();
  if(a==='xfcopys'){try{await navigator.clipboard.writeText(XF.short);toast('Code copié : '+XF.short)}catch(er){toast('Ton code : '+XF.short+' (recopie-le à la main)')}return}
  if(a==='xfcopy'){try{await navigator.clipboard.writeText(XF.code);toast('Code copié ! Colle-le dans la nouvelle appli.')}catch(er){const t=$('#xfcode');if(t){t.focus();t.select();try{document.execCommand('copy');toast('Code copié !')}catch(x){toast('Sélectionne le code et copie-le à la main.')}}}return}
  if(a==='xfdl'){try{const bl=new Blob([XF.code],{type:'text/plain'});const u=URL.createObjectURL(bl);const l=document.createElement('a');l.href=u;l.download='rde-transfert-'+(S.name||'compte').replace(/[^\w-]/g,'')+'.txt';document.body.appendChild(l);l.click();l.remove();setTimeout(()=>URL.revokeObjectURL(u),4000)}catch(er){toast('Téléchargement impossible ici : utilise « Copier le code ».')}return}
  if(a==='xfimp')return xferImportModal();
  if(a==='xfnew'){S.xferAsk=1;save();closeModal();try{nameModal0()}catch(er){}return}
  if(a==='xfgo')return xferImport()},true);
/* --- dans la nouvelle appli : coller son code --- */
function xferImportModal(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📦 J'ai déjà un compte</div>
  <p class="sub">Dans l'ancienne version du jeu, va dans <b>⚙️ Paramètres → 📦 Transférer ma progression</b>, puis tape ici le code à 6 lettres (ou colle le code long).</p>
  <textarea class="tx xfcode" id="xfin" rows="3" placeholder="ABC-123" aria-label="Ton code de transfert" autocapitalize="characters" autocomplete="off" spellcheck="false"></textarea>
  <label class="btn sm xffile" style="margin-top:6px">📄 Ou choisir le fichier<input type="file" accept=".txt,text/plain" id="xffile" hidden></label>
  <button class="btn p" data-a="xfgo" style="width:100%;margin-top:10px">Récupérer mon compte</button><div class="muted" id="xfmsg" style="font-size:12.5px;margin-top:6px"></div>`);
  setTimeout(()=>{const f=$('#xffile');if(f)f.onchange=async()=>{try{const t=await f.files[0].text();$('#xfin').value=t.trim()}catch(e){}}},50)}
async function xferImport(){const ta=$('#xfin'),msg=$('#xfmsg');const say=t=>{if(msg)msg.textContent=t};let o,raw=ta&&ta.value||'',shortId=null;
  const sc=String(raw).toUpperCase().replace(/[^A-Z0-9]/g,'');
  if(sc.length===6&&!/^RDE/.test(sc)){say('⏳ Recherche de ton code…');try{const db=await window.claude.use('db');const sn=db?await db.doc('xfer/'+sc).get():null;
      if(!sn||!sn.exists){say("❌ Code introuvable. Vérifie les lettres, ou crée un nouveau code dans l'ancienne version (il ne sert qu'une fois).");return}
      const d=sn.data();if(Date.now()-(+d.t||0)>864e5){say('❌ Ce code a expiré. Crée-en un nouveau dans l\'ancienne version.');return}raw=d.d;shortId=sc}catch(e){say('❌ Impossible de vérifier le code. Vérifie ta connexion internet et réessaie.');return}}
  try{o=await xferRead(raw)}catch(e){if(e&&e.need){say(`❌ Code incomplet : ${e.got.toLocaleString("fr-FR")} caractères reçus sur ${e.need.toLocaleString("fr-FR")}. Il manque la fin : recopie-le (ou colle la partie suivante à la suite).`);return}say("❌ Ce code n'est pas valide. Vérifie que tu l'as copié en entier.");return}
  if(!o||!o.S||!o.S.heroes){say('❌ Code vide ou abîmé.');return}
  if(S.name&&S.name!==o.n&&Object.keys(S.heroes).length>4&&!confirm(`Remplacer ta partie actuelle (${S.name}) par celle de ${o.n||'ce code'} ?`))return;
  say('⏳ Récupération en cours…');
  const N=Object.assign(fresh(),o.S);try{if(N.world&&(!N.world.players||!N.world.players.length))N.world.players=genWorld().players}catch(e){}N.opid=o.pid||null;N.xferAt=Date.now();N.xferAsk=1;N.ts=Date.now();
  try{const db=await window.claude.use('db');const u=await window.claude.use('user');const uid=u?await u.id():null;
    if(db&&uid&&N.opid){try{await db.doc('pidmap/'+N.opid).set({uid,t:Date.now()})}catch(e){say('⚠️ Ce compte a déjà été récupéré sur un autre appareil. On garde ta progression, avec une nouvelle identité en ligne.');N.opid=null}}
    if(db&&o.g&&o.g.id){try{const s=await db.doc('guilds/'+o.g.id).get();if(!s.exists)await db.doc('guilds/'+o.g.id).set(o.g.d)}catch(e){}}
    if(db&&uid){try{await db.doc('data/users/'+uid+'/save').set({json:JSON.stringify(N),ts:N.ts})}catch(e){}}
  }catch(e){}
  if(shortId){try{const db=await window.claude.use('db');if(db)await db.doc('xfer/'+shortId).delete()}catch(e){}}
  S=N;save();try{localStorage.setItem(KEY+'-xfer','1')}catch(e){}
  say('✅ Compte récupéré ! Le jeu redémarre…');setTimeout(()=>location.reload(),1200)}
/* le bouton dans les paramètres */
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=xfexp],[data-a=xfimp]'))m.insertAdjacentHTML('beforeend',window.RDE_APP?'<button class="btn" data-a="xfimp" style="width:100%;margin-top:8px">📦 Importer un code de transfert</button>':(XFER_ON()?'<button class="btn pro" data-a="xfexp" style="width:100%;margin-top:8px">📦 Transférer ma progression</button>':''))}catch(e){}}}
function XFER_ON(){return true}
/* au premier lancement de la nouvelle appli : nouveau joueur ou compte existant ? */
const nameModal0=nameModal;
nameModal=function(){if(window.RDE_APP&&!S.xferAsk){modal(`<div class="xfwel"><div class="xfwi">${(typeof plumeSVG==='function')?plumeSVG('happy'):'🦉'}</div><div class="h">Bienvenue dans RDE !</div><p class="sub">La nouvelle appli de Royaumes d'Éther. Tu jouais déjà à l'ancienne version ?</p>
  <button class="btn pro" data-a="xfimp" style="width:100%">📦 J'ai déjà un compte</button><button class="btn" data-a="xfnew" style="width:100%;margin-top:8px">🆕 Je suis nouveau</button></div>`);return}return nameModal0.apply(this,arguments)};
/* --- le grand déménagement : annonce importante dans la version Claude --- */
function mvArt(){return`<svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><radialGradient id="mvb" cx="50%" cy="40%" r="80%"><stop offset="0" stop-color="#7c4cff"/><stop offset=".6" stop-color="#2a1260"/><stop offset="1" stop-color="#0b0819"/></radialGradient><radialGradient id="mvg"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#ff9ae8"/><stop offset="1" stop-color="#7c5cff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="200" fill="url(#mvb)"/>
 ${[...Array(18)].map((_,i)=>`<circle cx="${(i*53)%400}" cy="${(i*37)%200}" r="1.4" fill="#fff6dc"><animate attributeName="opacity" values=".2;1;.2" dur="${2+i%4}s" repeatCount="indefinite"/></circle>`).join('')}
 <g transform="translate(92 100)" opacity=".75"><rect x="-34" y="-58" width="68" height="116" rx="10" fill="#1a1030" stroke="#8a7ab8" stroke-width="3"/><text y="6" text-anchor="middle" font-size="26">🦉</text><text y="40" text-anchor="middle" font-size="11" fill="#c8b8e8" font-weight="900">ANCIENNE</text></g>
 <g><path d="M140 100H250" stroke="#ffd84a" stroke-width="6" stroke-dasharray="10 8"><animate attributeName="stroke-dashoffset" values="36;0" dur="1s" repeatCount="indefinite"/></path><path d="M246 86L266 100L246 114Z" fill="#ffd84a"/><text x="200" y="88" text-anchor="middle" font-size="22">📦</text></g>
 <g transform="translate(312 100)"><circle r="70" fill="url(#mvg)" opacity=".55"><animate attributeName="r" values="60;74;60" dur="3s" repeatCount="indefinite"/></circle><rect x="-38" y="-64" width="76" height="128" rx="12" fill="#0b0819" stroke="#ffd84a" stroke-width="3.5"/>
  <path d="M0 6C-20 -8 -22 -22 -11 -28C-5 -31 -1 -28 0 -24C1 -28 5 -31 11 -28C22 -22 20 -8 0 6Z" fill="#ffd6f4" stroke="#fff" stroke-width="1.6"/><text y="38" text-anchor="middle" font-family="Arial Black,Arial,sans-serif" font-weight="900" font-size="22" fill="#ffd84a" stroke="#2a0a4a" stroke-width="3" paint-order="stroke">RDE</text></g></svg>`}
const MV_ANN=()=>({k:'move'+Math.floor(Date.now()/36e5),ac:'#ff4a6a',tag:'⚠️ TRÈS IMPORTANT',t:"Royaumes d'Éther devient une vraie appli !",
 x:`Le jeu déménage dans sa propre application : <b>RDE</b>. Tu pourras l'<b>installer sur ton téléphone</b>, en plein écran, et y jouer <b>sans compte Claude</b>.<br><br>
 <b>🔴 Ce que tu dois faire, c'est obligatoire :</b><ol class="xfol"><li>Touche <b>📦 Transférer ma progression</b> ci-dessous et copie ton code.</li><li>Ouvre la nouvelle appli : <b>${RDE_URL.replace('https://','')}</b></li><li>Choisis <b>« J'ai déjà un compte »</b> et colle ton code.</li></ol>
 ✅ Tu retrouves <b>tout</b> : héros, niveaux, ultra-évolutions, gemmes, équipement, guilde, histoire, titres…<br><br>
 <b>⚠️ Attention :</b> cette version-ci <b>ne sera bientôt plus mise à jour</b>. Plus de nouveaux héros, d'événements ni de cadeaux, et tes amis ne te verront plus dans le chat. <b>Si tu ne transfères pas ta progression, tu restes bloqué sur l'ancienne version.</b><br><br>
 🎁 Un <b>cadeau de bienvenue</b> (500 gemmes et 3 éclats légendaires) t'attend dans la nouvelle appli quand tu transfères ton compte !`,
 art:mvArt,go:'📦 Transférer ma progression',fn:()=>setTimeout(xferExportModal,80),go2:'📲 Ouvrir la nouvelle appli',fn2:()=>{try{window.open(RDE_URL,'_blank','noopener')}catch(e){}}});
if(!window.RDE_APP){
 {const al=annList;annList=function(all){const L=al(all);try{L.unshift(MV_ANN())}catch(e){}return L}}
 {const rr=render;render=function(){const r=rr.apply(this,arguments);try{const m=document.getElementById('main');if(m&&!m.querySelector('.mvban'))m.insertAdjacentHTML('afterbegin','<button class="mvban" data-a="xfexp">⚠️ <b>Le jeu déménage dans l\'appli RDE</b> · touche ici pour transférer ta progression</button>')}catch(e){}return r}}
 try{PATCH.unshift({v:29.1,d:'20 octobre 2026',t:"Le jeu devient une vraie appli",items:["📲 <b>Royaumes d'Éther devient une vraie appli : RDE</b>, à installer sur ton téléphone, sans compte Claude : <b>"+RDE_URL.replace('https://','')+"</b>","📦 Nouveau bouton <b>⚙️ Paramètres → Transférer ma progression</b> : copie ton code et colle-le dans la nouvelle appli pour tout retrouver.","⚠️ Cette version-ci ne sera bientôt plus mise à jour : pense à transférer ton compte !"]})}catch(e){}
}
/* --- dans l'appli : le cadeau de bienvenue après un transfert --- */
if(window.RDE_APP)setTimeout(()=>{try{if(S.xferAt&&!S.xferGift){S.xferGift=1;mail({x:'🎁 Bienvenue dans RDE ! Merci d\'avoir transféré ton compte.',gems:500,shards:3});save();try{renderTop()}catch(e){}toast('🎁 Un cadeau de bienvenue t\'attend dans ta boîte aux lettres !')}}catch(e){}},5000);

/* --- dans l'appli : transfert en un clic (le code arrive dans l'adresse, après le #, jamais envoyé au serveur) --- */
if(window.RDE_APP){const H=location.hash||'';if(H.startsWith('#rde=')){const c=decodeURIComponent(H.slice(5));try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}
  const go=()=>{if(!BOOT.done||B){setTimeout(go,600);return}try{closeModal()}catch(e){}xferImportModal();setTimeout(()=>{const t=$('#xfin');if(t){t.value=c;const m=$('#xfmsg');if(m)m.textContent='📦 Code reçu !';xferImport()}},150)};
  S.xferAsk=1;setTimeout(go,800)}}
