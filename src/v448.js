
/* ================= V448 : BOUTON « SIGNALER UN BUG » + ESPACE CRÉATEUR =================
   Dans ⚙️ Paramètres (et le calendrier des Pionniers, et la barre de gauche sur PC) : un petit formulaire.
   Le signalement part dans Firestore (collection « bugs »), avec des infos techniques SANS donnée perso :
   version, écran, derniers écrans visités, appareil (type, système, navigateur, taille d'écran), dernières erreurs.
   5 signalements par jour et par joueur. Sans connexion : gardé et envoyé tout seul plus tard.
   Si la règle « bugs » n'est pas encore publiée : il part dans « reports » (déjà autorisé) sous une forme courte.
   Espace créateur (seulement sur un appareil où on a ouvert le jeu avec #createur) : connexion Google,
   lecture des signalements (bugs + joueurs signalés), « copier pour Claude », « réglé » (supprime). */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const MAXD=5;
const dk=()=>{const d=new Date();return d.getFullYear()*1e4+(d.getMonth()+1)*100+d.getDate()};
const lsg=k=>{try{return localStorage.getItem(k)}catch(e){return null}},lss=(k,v)=>{try{localStorage.setItem(k,v)}catch(e){}};
const cut=(s,n)=>{s=String(s==null?'':s);return s.length>n?s.slice(0,n-1)+'…':s};

/* ---------- 1. on retient les dernières erreurs (texte court, rien de perso) ---------- */
const ERR=[];
const pushErr=s=>{s=cut(String(s).replace(/\s+/g,' ').trim(),180);if(!s)return;if(ERR.length&&ERR[ERR.length-1].s===s){ERR[ERR.length-1].k++;return}ERR.push({s,t:Date.now(),k:1});if(ERR.length>10)ERR.shift()};
addEventListener('error',e=>{try{if(e&&e.target&&e.target!==window&&e.target.tagName)return;const f=String(e.filename||'').split('/').pop().split('?')[0];pushErr((e.message||'erreur')+(e.lineno?` @${f||'?'}:${e.lineno}`:''))}catch(x){}},true);
addEventListener('unhandledrejection',e=>{try{const r=e.reason;pushErr('promesse : '+(r&&(r.code||r.message)||r))}catch(x){}});
for(const m of ['error','warn']){const o=console[m];if(typeof o!=='function')continue;console[m]=function(){try{const a=[...arguments].map(x=>x&&x.stack?String(x.message||x):typeof x==='object'?(x&&(x.code||x.message))||'':String(x)).filter(Boolean).join(' ');if(a)pushErr((m==='warn'?'⚠ ':'✖ ')+a)}catch(x){}return o.apply(this,arguments)}}

/* ---------- 2. les derniers écrans visités ---------- */
const NAV=[];
const where=()=>{let s='';try{s=String(TAB||'?');const z=UI&&UI.lz&&UI.lz[TAB];if(z)s+='/'+z}catch(e){s='?'}
  try{if(document.body.classList.contains('inb'))s='⚔️ combat ('+s+')'}catch(e){}return s};
const navNote=()=>{const w=where();if(NAV[NAV.length-1]!==w){NAV.push(w);if(NAV.length>6)NAV.shift()}};
{const r0=render;render=function(){const x=r0.apply(this,arguments);try{navNote()}catch(e){}return x}}

/* ---------- 3. l'appareil (aucune donnée perso : pas d'adresse, pas d'e-mail, pas d'identifiant d'appareil) ---------- */
function devInfo(){const ua=navigator.userAgent||'';let os='?',br='?',m;
  if((m=ua.match(/Android ([\d.]+)/)))os='Android '+m[1].split('.')[0];else if(/iPhone|iPad|iPod/.test(ua)){m=ua.match(/OS (\d+)_/);os='iOS '+(m?m[1]:'')}
  else if(/Windows NT/.test(ua))os='Windows';else if(/CrOS/.test(ua))os='ChromeOS';else if(/Mac OS X/.test(ua))os=(navigator.maxTouchPoints>1?'iPadOS':'macOS');else if(/Linux/.test(ua))os='Linux';
  if((m=ua.match(/SamsungBrowser\/(\d+)/)))br='Samsung '+m[1];else if((m=ua.match(/Edg[A-Z]*\/(\d+)/)))br='Edge '+m[1];else if((m=ua.match(/OPR\/(\d+)/)))br='Opera '+m[1];
  else if((m=ua.match(/Firefox\/(\d+)/)))br='Firefox '+m[1];else if((m=ua.match(/CriOS\/(\d+)/)))br='Chrome '+m[1];else if((m=ua.match(/Chrome\/(\d+)/)))br='Chrome '+m[1];else if((m=ua.match(/Version\/(\d+)[.\d]* .*Safari/)))br='Safari '+m[1];
  let app='navigateur';try{if(window.RDE_AND)app='appli Android';else if(matchMedia('(display-mode: standalone)').matches||navigator.standalone)app='appli installée'}catch(e){}
  const ph=document.documentElement.classList.contains('rdphone')||matchMedia('(max-width:899px),(max-aspect-ratio:5/4)').matches;
  const x=[ph?'📱 téléphone':'💻 ordinateur',os,br,app,innerWidth+'×'+innerHeight+(devicePixelRatio&&devicePixelRatio!==1?' @'+(+devicePixelRatio.toFixed(2))+'x':'')];
  if(navigator.deviceMemory)x.push(navigator.deviceMemory+' Go');if(navigator.hardwareConcurrency)x.push(navigator.hardwareConcurrency+' cœurs');
  try{if(window.RDEFXL&&RDEFXL.on)x.push('mode léger')}catch(e){}
  return x.join(' · ')}
function progInfo(){try{const H=Object.keys(S.heroes||{}).length;return`étape ${S.max||0} · ${H} héros · ${S.pulls||0} invocations · puissance ${fmt(teamPower())}`}catch(e){return''}}
const verInfo=()=>{let pv='';try{pv=PATCH&&PATCH[0]&&PATCH[0].v||''}catch(e){}return{v:String(window.RDE_V||'web'),pv:String(pv)}};

/* ---------- 4. les catégories ---------- */
const CATS=[['combat','⚔️',T('Combat','Battle')],['affichage','🖼️',T('Affichage','Display')],['lent','🐢',T('Lenteur','Slow')],['sauv','💾',T('Sauvegarde / compte','Save / account')],['boutons','👆',T('Bouton qui ne marche pas','Broken button')],['idee','💡',T('Idée','Idea')],['autre','❓',T('Autre','Other')]];
const catOf=k=>CATS.find(c=>c[0]===k)||CATS[CATS.length-1];

/* ---------- 5. compteur du jour ---------- */
function quota(){S.bugs=S.bugs||{d:0,n:0};if(S.bugs.d!==dk()){S.bugs.d=dk();S.bugs.n=0}return S.bugs}
const left=()=>Math.max(0,MAXD-quota().n);

/* ---------- 6. envoi (avec file d'attente hors ligne) ---------- */
function toReport(d){return{by:(typeof NET!=='undefined'&&NET.pid)||d.by,byn:d.n||'',who:'BUG',n:'🐞',why:'🐞 Bug · '+catOf(d.cat)[2],tx:cut(d.tx,300),
  msgs:[`${d.pv} (${d.v}) · ${d.scr}`,d.dev,...(d.err||[]).slice(-3)].map(s=>cut(s,150)),t:d.t}}
async function sendOne(d){if(!(typeof NET!=='undefined'&&NET.on&&NET.db))throw{code:'offline'};
  try{await NET.db.collection('bugs').add(d);return'bugs'}
  catch(e){if(/permission|denied|insufficient/i.test(String(e&&(e.code||e.message)||'')))
    {await NET.db.collection('reports').add(toReport(d));return'reports'}throw e}}
const Q=()=>{try{return JSON.parse(lsg('rde-bugq')||'[]')}catch(e){return[]}};
async function flush(){const q=Q();if(!q.length||!(typeof NET!=='undefined'&&NET.on&&NET.db))return;const rest=[];
  for(const d of q){try{if(!d.by)d.by=NET.uid||'';await sendOne(d)}catch(e){rest.push(d)}}lss('rde-bugq',JSON.stringify(rest.slice(-5)));
  if(rest.length<q.length)try{toast(T('🐞 Ton signalement en attente est bien parti. Merci !','🐞 Your pending report was sent. Thanks!'))}catch(e){}}
setTimeout(flush,9000);setInterval(flush,120000);addEventListener('online',()=>setTimeout(flush,3000));

/* ---------- 7. le formulaire ---------- */
const BR={cat:'',tx:'',tech:true};
function techLines(){const V=verInfo();return[
  [T('Version','Version'),`${V.pv} · ${V.v}`],[T('Écran','Screen'),where()],[T('Juste avant','Just before'),NAV.slice(-5).join(' → ')||'—'],
  [T('Appareil','Device'),devInfo()],[T('Partie','Game'),progInfo()],[T('Erreurs récentes','Recent errors'),ERR.length?ERR.slice(-5).map(e=>e.s+(e.k>1?` (×${e.k})`:'')).join(' | '):T('aucune','none')]]}
function bugModal(){const n=left(),adm=lsg('rde-createur')==='1';
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button>
  <div class="bghd"><div class="bgbug" aria-hidden="true">🐞</div><div><div class="h">${T('Signaler un bug','Report a bug')}</div>
  <div class="bgsub">${T("Un bouton qui ne marche pas, une image qui manque, un combat bizarre ? Explique-le ici : ça part <b>directement au créateur du jeu</b>.","A broken button, a missing image, a weird battle? Explain it here: it goes <b>straight to the game's creator</b>.")}</div></div></div>
  ${n<=0?`<div class="bgfull">⏳ ${T("Tu as déjà envoyé 5 signalements aujourd'hui. Merci beaucoup ! Reviens demain si tu trouves autre chose.","You already sent 5 reports today. Thank you! Come back tomorrow if you find something else.")}</div>`:`
  <div class="bglbl">${T("C'est à propos de…",'It is about…')}</div>
  <div class="bgcats">${CATS.map(c=>`<button class="chip ${BR.cat===c[0]?'on':''}" data-a="bgcat" data-v="${c[0]}">${c[1].trim()} ${c[2]}</button>`).join('')}</div>
  <div class="bglbl">${T("Qu'est-ce qui s'est passé ?",'What happened?')} <span class="bgcnt" id="bgcnt">${BR.tx.length}/1000</span></div>
  <textarea class="tx bgtx" id="bgtx" rows="4" maxlength="1000" data-noi18n placeholder="${T("Ex. : en arène, quand je touche « Combattre », l'écran devient noir. Ça arrive à chaque fois depuis hier.","E.g.: in the arena, when I tap “Fight”, the screen goes black. It happens every time since yesterday.")}">${esc(BR.tx)}</textarea>
  <label class="setm bgtech"><input type="checkbox" id="bgtech" ${BR.tech?'checked':''}> <span>${T('Joindre les infos techniques (version, écran, appareil, erreurs). <b>Aucune donnée perso.</b>','Attach technical info (version, screen, device, errors). <b>No personal data.</b>')}</span></label>
  <details class="bgdet"><summary>${T('Voir exactement ce qui est envoyé','See exactly what is sent')}</summary><div class="bgtl">${techLines().map(([a,b])=>`<div><b>${a}</b><span>${esc(b)}</span></div>`).join('')}<div><b>${T('Pseudo','Name')}</b><span>${esc(S.name||'—')}</span></div></div></details>
  <button class="btn pro bggo" data-a="bgsend">🐞 ${T('Envoyer le signalement','Send the report')}</button>
  <div class="bgfoot">${T(`Encore ${n} signalement${n>1?'s':''} possible${n>1?'s':''} aujourd'hui.`,`${n} report${n>1?'s':''} left today.`)}</div>`}
  ${adm?`<button class="btn sm bgadm" data-a="bgadm">🔑 ${T('Espace créateur','Creator space')}</button>`:''}`);
  const m=document.querySelector('#ovl .modal');if(m)m.classList.add('bgmodal')}
function thanks(where){modal(`<div class="bgok"><div class="bgokc"><svg viewBox="0 0 52 52" aria-hidden="true"><circle cx="26" cy="26" r="23"/><path d="M15 27l7 7 15-16"/></svg></div>
  <div class="h" style="text-align:center">${T('Merci, bien reçu !','Thanks, received!')}</div>
  <p class="sub" style="text-align:center">${where==='q'?T("Pas de connexion pour l'instant : ton signalement partira tout seul dès que tu seras en ligne.","No connection right now: your report will be sent automatically once you're online."):T('Ton signalement est parti chez le créateur du jeu. Chaque retour aide à rendre le royaume meilleur 💜','Your report reached the game creator. Every report makes the realm better 💜')}</p>
  <button class="btn p" data-a="close" style="width:100%;margin-top:6px">${T('Retour au jeu','Back to the game')}</button></div>`);
  const m=document.querySelector('#ovl .modal');if(m)m.classList.add('bgmodal')}
async function doSend(b){const tx=String(($('#bgtx')||{}).value||'').trim();BR.tx=tx;BR.tech=!!($('#bgtech')||{}).checked;
  if(!BR.cat){toast(T("Choisis d'abord de quoi ça parle (Combat, Affichage…)",'First pick what it is about (Battle, Display…)'));const c=document.querySelector('.bgcats');if(c){c.classList.remove('bgshake');void c.offsetWidth;c.classList.add('bgshake')}return}
  if(tx.length<8){toast(T('Explique un peu plus ce qui se passe (quelques mots suffisent).','Explain a bit more (a few words are enough).'));const t=$('#bgtx');if(t)t.focus();return}
  if(left()<=0){bugModal();return}
  const V=verInfo();const d={by:(typeof NET!=='undefined'&&NET.uid)||'',pid:String((typeof NET!=='undefined'&&NET.pid)||''),n:cut(S.name||'',40),cat:BR.cat,tx:cut(tx,1000),v:V.v,pv:V.pv,
    scr:BR.tech?cut(where(),80):'',nav:BR.tech?NAV.slice(-5).map(s=>cut(s,60)):[],dev:BR.tech?cut(devInfo(),200):'',lang:String(typeof LANG!=='undefined'?LANG:'fr'),
    err:BR.tech?ERR.slice(-6).map(e=>cut(e.s+(e.k>1?` (×${e.k})`:''),200)):[],prog:BR.tech?cut(progInfo(),120):'',t:Date.now()};
  b.disabled=true;b.textContent='⏳ '+T('Envoi…','Sending…');let w='q';
  try{w=await sendOne(d)}catch(e){const q=Q();q.push(d);lss('rde-bugq',JSON.stringify(q.slice(-5)))}
  quota().n++;BR.tx='';BR.cat='';try{save()}catch(e){}thanks(w)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="bugrep"],[data-a="bgcat"],[data-a="bgsend"],[data-a="bgadm"],[data-a="bgcopy"],[data-a="bgdone"],[data-a="bgtab"],[data-a="bgcopyall"],[data-a="bgcopyid"],[data-a="bgout"]');if(!b)return;e.preventDefault();e.stopPropagation();const a=b.dataset.a;
  if(a==='bugrep'){bugModal();return}
  if(a==='bgcat'){BR.cat=b.dataset.v;BR.tx=String(($('#bgtx')||{}).value||BR.tx);document.querySelectorAll('[data-a="bgcat"]').forEach(x=>x.classList.toggle('on',x===b));return}
  if(a==='bgsend'){doSend(b);return}
  if(a==='bgadm'){admOpen();return}
  if(a==='bgtab'){ADM.tab=b.dataset.v;admRender();return}
  if(a==='bgcopy'){const L=ADM.tab==='rep'?ADM.rep:ADM.bugs;const d=L.find(x=>x.id===b.dataset.v);if(d)copy(ADM.tab==='rep'?repText(d):bugText(d));return}
  if(a==='bgcopyall'){const L=ADM.tab==='rep'?ADM.rep:ADM.bugs;copy(L.map(ADM.tab==='rep'?repText:bugText).join('\n\n———\n\n')||'—');return}
  if(a==='bgcopyid'){copy(ADM.uid||'');return}
  if(a==='bgdone'){admDel(b);return}
  if(a==='bgout'){try{ADM.api&&ADM.api.out()}catch(x){}ADM.api=null;ADM.uid='';closeModal();toast(T('Déconnecté de l’espace créateur.','Signed out of the creator space.'));return}
},true);
document.addEventListener('input',e=>{if(e.target&&e.target.id==='bgtx'){BR.tx=e.target.value;const c=$('#bgcnt');if(c)c.textContent=e.target.value.length+'/1000'}});

/* ---------- 8. où trouver le bouton ---------- */
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=bugrep]')){
  const h=`<button class="btn bgset" data-a="bugrep">🐞 ${T('Signaler un bug','Report a bug')}</button>`;const pn=m.querySelector('[data-a=pnotes]');if(pn)pn.insertAdjacentHTML('beforebegin',h);else m.insertAdjacentHTML('beforeend',h)}}catch(e){}}}

/* ---------- 9. espace créateur ---------- */
if(location.hash==='#createur'){lss('rde-createur','1');try{history.replaceState(null,'',location.pathname+location.search)}catch(e){}setTimeout(()=>{try{toast('🔑 Mode créateur activé sur cet appareil : ⚙️ → 🐞 Signaler un bug → Espace créateur')}catch(e){}},2500)}
const ADM={api:null,uid:'',tab:'bugs',bugs:[],rep:[],err:{}};
async function copy(t){let ok=false;try{await navigator.clipboard.writeText(t);ok=true}catch(e){try{const x=document.createElement('textarea');x.value=t;x.style.position='fixed';x.style.opacity='0';document.body.appendChild(x);x.select();ok=document.execCommand('copy');x.remove()}catch(y){}}
  toast(ok?T('📋 Copié ! Tu peux le coller à Claude.','📋 Copied!'):T('Copie impossible ici, sélectionne le texte à la main.','Could not copy.'))}
const dstr=t=>{try{return new Date(t).toLocaleString('fr-FR',{day:'2-digit',month:'2-digit',hour:'2-digit',minute:'2-digit'})}catch(e){return''}};
function bugText(d){const c=catOf(d.cat);return[`🐞 ${c[2]} — ${dstr(d.t)} — ${d.n||'?'}`,`« ${d.tx} »`,`Version : ${d.pv||'?'} (${d.v||'?'}) · écran : ${d.scr||'?'}`,d.nav&&d.nav.length?`Avant : ${d.nav.join(' → ')}`:'',d.dev?`Appareil : ${d.dev}`:'',d.prog?`Partie : ${d.prog}`:'',d.err&&d.err.length?`Erreurs : ${d.err.join(' | ')}`:'Erreurs : aucune'].filter(Boolean).join('\n')}
function repText(d){return[`⚠️ ${d.why||'?'} — ${dstr(d.t)}`,`Signalé : ${d.n||'?'} (${d.who||'?'}) · par ${d.byn||'?'}`,d.tx?`« ${d.tx} »`:'',d.msgs&&d.msgs.length?`Messages : ${d.msgs.join(' | ')}`:''].filter(Boolean).join('\n')}
async function admOpen(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 ${T('Espace créateur','Creator space')}</div><p class="sub">⏳ ${T('Connexion avec ton compte Google…','Signing in with your Google account…')}</p>`);
  const m0=document.querySelector('#ovl .modal');if(m0)m0.classList.add('bgmodal','bgadmm');
  try{if(!ADM.api){if(!window.RDEG||!RDEG.admin)throw{code:'noapp'};ADM.api=await RDEG.admin();ADM.uid=ADM.api.uid}}
  catch(e){ADM.api=null;const c=String(e&&(e.code||e.message)||e);modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 ${T('Espace créateur','Creator space')}</div><p class="sub">${/noapp/.test(c)?T("L'espace créateur marche seulement sur le site du jeu (pas dans la version de test).",'Only available on the game website.'):/popup|cancel|closed/i.test(c)?T('Connexion annulée.','Sign-in cancelled.'):T('La connexion Google n’a pas marché : ','Google sign-in failed: ')+esc(cut(c,80))}</p>`);return}
  await admLoad();admRender()}
async function admLoad(){ADM.err={};ADM.bugs=[];ADM.rep=[];
  try{ADM.bugs=await ADM.api.list('bugs')}catch(e){ADM.err.bugs=String(e&&(e.code||e.message)||e)}
  try{ADM.rep=await ADM.api.list('reports')}catch(e){ADM.err.rep=String(e&&(e.code||e.message)||e)}
  /* les bugs envoyés en secours dans « reports » rejoignent la liste des bugs */
  const fb=ADM.rep.filter(r=>r.who==='BUG');ADM.rep=ADM.rep.filter(r=>r.who!=='BUG');
  for(const r of fb){const m=(r.msgs||[]);ADM.bugs.push({id:r.id,_col:'reports',cat:(CATS.find(c=>String(r.why||'').endsWith(c[2]))||CATS[CATS.length-1])[0],tx:r.tx,n:r.byn,t:r.t,pv:'',v:'',scr:m[0]||'',dev:m[1]||'',err:m.slice(2),nav:[],prog:''})}
  ADM.bugs.sort((a,b)=>(b.t||0)-(a.t||0));ADM.rep.sort((a,b)=>(b.t||0)-(a.t||0))}
function admRender(){const denied=ADM.err.bugs&&/permission|denied|insufficient/i.test(ADM.err.bugs);
  const L=ADM.tab==='rep'?ADM.rep:ADM.bugs;
  const card=d=>ADM.tab==='rep'?`<div class="bgcard rep"><div class="bgch"><b>⚠️ ${esc(d.why||'?')}</b><small>${esc(ago(d.t||Date.now()))}</small></div>
      <div class="bgct">${T('Joueur signalé','Reported player')} : <b>${esc(d.n||'?')}</b> · ${T('par','by')} ${esc(d.byn||'?')}</div>${d.tx?`<div class="bgtxt">« ${esc(d.tx)} »</div>`:''}
      ${d.msgs&&d.msgs.length?`<details class="bgdet"><summary>${T('Ses derniers messages','Last messages')}</summary><div class="bgtl">${d.msgs.map(x=>`<div><span>${esc(x)}</span></div>`).join('')}</div></details>`:''}
      <div class="bgbtns"><button class="btn sm" data-a="bgcopy" data-v="${esc(d.id)}">📋 ${T('Copier','Copy')}</button><button class="btn sm g" data-a="bgdone" data-v="${esc(d.id)}" data-c="reports">✅ ${T('Traité','Done')}</button></div></div>`
    :`<div class="bgcard"><div class="bgch"><b>${catOf(d.cat)[1].trim()} ${esc(catOf(d.cat)[2])}</b><small>${esc(d.n||'?')} · ${esc(ago(d.t||Date.now()))}</small></div>
      <div class="bgtxt">« ${esc(d.tx||'')} »</div>
      <div class="bgmeta">${d.pv||d.v?`<span>🏷️ ${esc(d.pv||'')} ${esc(d.v||'')}</span>`:''}${d.scr?`<span>📍 ${esc(d.scr)}</span>`:''}${d.dev?`<span>${esc(d.dev)}</span>`:''}</div>
      ${(d.err&&d.err.length)||(d.nav&&d.nav.length)||d.prog?`<details class="bgdet"><summary>${d.err&&d.err.length?`🔴 ${d.err.length} ${T('erreur(s)','error(s)')}`:T('Détails','Details')}</summary><div class="bgtl">${d.nav&&d.nav.length?`<div><b>${T('Avant','Before')}</b><span>${esc(d.nav.join(' → '))}</span></div>`:''}${d.prog?`<div><b>${T('Partie','Game')}</b><span>${esc(d.prog)}</span></div>`:''}${(d.err||[]).map(x=>`<div><b>✖</b><span>${esc(x)}</span></div>`).join('')}</div></details>`:''}
      <div class="bgbtns"><button class="btn sm" data-a="bgcopy" data-v="${esc(d.id)}">📋 ${T('Copier pour Claude','Copy')}</button><button class="btn sm g" data-a="bgdone" data-v="${esc(d.id)}" data-c="${d._col||'bugs'}">✅ ${T('Réglé','Fixed')}</button></div></div>`;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🔑 ${T('Espace créateur','Creator space')}</div>
   ${denied?`<div class="bgsetup"><b>${T('Encore une étape !','One more step!')}</b><p>${T('Firebase ne te laisse pas encore lire les signalements. Copie ton identifiant créateur et colle-le dans la règle, à la place de <code>TON_ID_CREATEUR</code> (aux 2 endroits), puis « Publier ».','Paste your creator id in the Firebase rule instead of TON_ID_CREATEUR, then Publish.')}</p>
     <div class="bgid"><code>${esc(ADM.uid)}</code><button class="btn sm p" data-a="bgcopyid">📋 ${T('Copier','Copy')}</button></div></div>`:''}
   <div class="seg bgseg"><button class="${ADM.tab==='bugs'?'on':''}" data-a="bgtab" data-v="bugs">🐞 Bugs · ${ADM.bugs.length}</button><button class="${ADM.tab==='rep'?'on':''}" data-a="bgtab" data-v="rep">⚠️ ${T('Joueurs signalés','Reported players')} · ${ADM.rep.length}</button></div>
   ${L.length?`<button class="btn sm bgall" data-a="bgcopyall">📋 ${T('Tout copier pour Claude','Copy all')} (${L.length})</button>`:''}
   <div class="bglist">${L.length?L.map(card).join(''):`<div class="bgempty">${denied&&ADM.tab==='bugs'?'🔒 '+T('Pas encore accès.','No access yet.'):'✨ '+T('Rien à traiter. Le royaume va bien !','Nothing to handle. All good!')}</div>`}</div>
   <div class="bgfoot">${T('Connecté avec Google','Signed in with Google')} · <a href="#" data-a="bgout">${T('se déconnecter','sign out')}</a></div>`);
  const m=document.querySelector('#ovl .modal');if(m)m.classList.add('bgmodal','bgadmm')}
async function admDel(b){const id=b.dataset.v,c=b.dataset.c||'bugs';b.disabled=true;
  try{await ADM.api.del(c,id);if(ADM.tab==='rep')ADM.rep=ADM.rep.filter(x=>x.id!==id);else ADM.bugs=ADM.bugs.filter(x=>x.id!==id);admRender();toast('✅ '+T('Rangé !','Done!'))}
  catch(e){b.disabled=false;toast(T('Impossible de supprimer : ','Could not delete: ')+esc(cut(String(e&&(e.code||e.message)||e),60)))}}

const st=document.createElement('style');st.id='v448bug';st.textContent=`
#ovl .modal.bgmodal{max-width:520px}
.bghd{display:flex;gap:12px;align-items:center;margin:0 0 6px}
.bghd .h{margin:0 0 2px}
.bgbug{flex:0 0 56px;height:56px;border-radius:18px;display:grid;place-items:center;font-size:31px;background:linear-gradient(160deg,#33246a,#150d33);border:2px solid rgba(255,216,74,.55);box-shadow:0 0 18px rgba(255,216,74,.22),inset 0 1px 0 rgba(255,255,255,.18);animation:bgwig 1.1s ease-in-out 2}
@keyframes bgwig{0%,100%{transform:rotate(0)}25%{transform:rotate(-9deg)}75%{transform:rotate(9deg)}}
.bgsub{font-size:13px;line-height:1.42;opacity:.9}
.bglbl{font-weight:900;font-size:12.5px;margin:12px 0 6px;display:flex;justify-content:space-between;align-items:baseline;letter-spacing:.01em}
.bgcnt{font-weight:700;font-size:11px;opacity:.55}
.bgcats{display:flex;flex-wrap:wrap;gap:6px}
.bgcats .chip{font-size:12.5px;cursor:pointer}
.bgshake{animation:bgshk .42s}
@keyframes bgshk{0%,100%{transform:none}20%,60%{transform:translateX(-6px)}40%,80%{transform:translateX(6px)}}
#ovl .bgtx{width:100%;box-sizing:border-box;min-height:100px;resize:vertical;font:500 14px/1.42 inherit;font-family:inherit;padding:10px 12px}
.bgtech{margin-top:8px;font-size:12.5px;line-height:1.35}
.bgdet{margin-top:6px;font-size:12px}
.bgdet summary{cursor:pointer;opacity:.78;font-weight:800}
.bgtl{display:grid;gap:5px;margin-top:6px;padding:9px 11px;border-radius:11px;background:rgba(0,0,0,.3);border:1px solid rgba(255,255,255,.08)}
.bgtl div{display:grid;grid-template-columns:104px minmax(0,1fr);gap:8px;line-height:1.35}
.bgtl b{opacity:.66;font-weight:800}.bgtl span{word-break:break-word}
.bggo{width:100%;margin-top:12px;display:flex!important;justify-content:center}
.bgfoot{text-align:center;font-size:11.5px;opacity:.62;margin-top:9px}
.bgfoot a{color:inherit}
.bgfull{margin-top:10px;padding:14px;border-radius:12px;background:rgba(255,216,74,.08);border:1px solid rgba(255,216,74,.3);font-size:13.5px;line-height:1.45}
.bgadm{display:block!important;margin:10px auto 0;opacity:.85}
#ovl .btn.bgset{width:100%;margin-top:8px;border-color:rgba(255,140,120,.5)!important;background:linear-gradient(180deg,rgba(255,120,100,.2),rgba(255,120,100,.06))!important;color:#ffe2dc!important}
.bgok{padding:6px 2px 2px}
.bgokc{width:86px;height:86px;margin:6px auto 10px}
.bgokc svg{width:100%;height:100%;fill:none;stroke:#5ef0c0;stroke-width:3.6;stroke-linecap:round;stroke-linejoin:round;filter:drop-shadow(0 0 8px rgba(94,240,192,.5))}
.bgokc circle{stroke-dasharray:150;stroke-dashoffset:150;animation:bgdraw .6s ease-out forwards}
.bgokc path{stroke-dasharray:40;stroke-dashoffset:40;animation:bgdraw .4s .5s ease-out forwards}
@keyframes bgdraw{to{stroke-dashoffset:0}}
#ovl .modal.bgadmm{max-width:700px}
.bgsetup{padding:12px 13px;border-radius:12px;background:rgba(255,216,74,.08);border:1px solid rgba(255,216,74,.38);margin:6px 0 10px;font-size:13px}
.bgsetup p{margin:4px 0 9px;line-height:1.42}
.bgsetup code{background:rgba(0,0,0,.35);padding:1px 5px;border-radius:5px}
.bgid{display:flex;gap:8px;align-items:center}
.bgid code{flex:1;min-width:0;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:8px 10px!important;border-radius:8px;background:rgba(0,0,0,.42)!important;font-size:12.5px;user-select:all}
.bgseg{margin:6px 0 8px}
.bgall{margin:0 0 8px}
.bglist{display:grid;gap:8px}
.bgcard{padding:11px 13px;border-radius:14px;background:linear-gradient(180deg,rgba(255,255,255,.06),rgba(0,0,0,.2));border:1px solid rgba(255,255,255,.1)}
.bgcard.rep{border-color:rgba(255,160,90,.32)}
.bgch{display:flex;justify-content:space-between;gap:8px;align-items:baseline}
.bgch small{opacity:.65;font-size:11.5px;white-space:nowrap}
.bgtxt{margin:6px 0;font-size:13.5px;line-height:1.42;white-space:pre-wrap;word-break:break-word}
.bgmeta{display:flex;flex-wrap:wrap;gap:3px 12px;font-size:11.5px;opacity:.72}
.bgbtns{display:flex;gap:6px;justify-content:flex-end;margin-top:8px}
.bgempty{padding:24px;text-align:center;opacity:.72}
`;document.head.appendChild(st);
window.RDEbug={open:bugModal,err:()=>ERR.slice(),dev:devInfo,where,flush};
}catch(e){console.warn('v448 bug',e)}})();

/* ================= V448 (2) : UNE VRAIE INTERFACE POUR ORDINATEUR =================
   Seulement en format ordinateur (≥ 900 px de large et écran en largeur) : le téléphone ne change pas.
   • Barre de gauche plus large dès 1280 px : blason du jeu, onglets avec leur nom, bouton « Signaler un bug ».
   • Les quartiers (Caserne, Artisans, Combats, Fête foraine, Grand-Place) : le décor à gauche, la liste des lieux
     à droite, le tout tient dans l'écran ; survoler un lieu fait briller son bâtiment (et inversement).
   • Aventure : les Chroniques en haut, puis 2 colonnes (la campagne à gauche, les histoires et le coffre à droite).
   • Quêtes et guildes sur 2 colonnes, en-tête en verre, décor de fond discret sur les côtés. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const MQ=matchMedia('(min-width:900px) and (min-aspect-ratio:5/4)');
const dk=()=>MQ.matches;

/* ---------- barre de gauche : blason + pied ---------- */
const CREST=`<svg class="sbcrest" viewBox="0 0 48 48" aria-hidden="true"><defs><linearGradient id="sbcg1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff0b8"/><stop offset="1" stop-color="#d9962a"/></linearGradient><linearGradient id="sbcg2" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#8f6bff"/><stop offset="1" stop-color="#2a1468"/></linearGradient><linearGradient id="sbcg3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e9fdff"/><stop offset=".55" stop-color="#7fe6ff"/><stop offset="1" stop-color="#3aa0e0"/></linearGradient></defs>
<path d="M24 3.5L40.5 9.5V23c0 10.6-7.4 17.6-16.5 21.5C14.9 40.6 7.5 33.6 7.5 23V9.5z" fill="url(#sbcg2)" stroke="url(#sbcg1)" stroke-width="2.6" stroke-linejoin="round"/>
<path d="M24 8.5l12 4.4V23c0 8-5.3 13.6-12 16.8C17.3 36.6 12 31 12 23V12.9z" fill="none" stroke="rgba(255,240,184,.35)" stroke-width="1"/>
<path d="M24 13.5l8.2 9-8.2 12-8.2-12z" fill="url(#sbcg3)" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/>
<path d="M15.8 22.5h16.4M24 13.5l-3 9 3 12 3-12z" fill="none" stroke="rgba(255,255,255,.75)" stroke-width=".9" stroke-linejoin="round"/></svg>`;
function sbInit(){const nav=document.querySelector('nav.tabs');if(!nav||nav.querySelector('.sbbrand'))return;
  nav.insertAdjacentHTML('afterbegin',`<div class="sbbrand" aria-hidden="true">${CREST}<div class="sbname"><b>Royaumes</b><span>d'Éther</span></div></div>`);
  nav.insertAdjacentHTML('beforeend',`<div class="sbfoot"><button class="sbbug" data-a="bugrep">🐞 <span>${T('Signaler un bug','Report a bug')}</span></button><small class="sbver"></small></div>`)}
function sbVer(){const v=document.querySelector('nav.tabs .sbver');if(!v)return;let pv='';try{pv=PATCH[0].v}catch(e){}v.textContent=(pv?pv+' · ':'')+T('Fait avec 💜','Made with 💜')}

/* ---------- mise en page des pages ---------- */
function dkLayout(){document.body.dataset.tab=String(typeof TAB!=='undefined'?TAB:'');
  const st=document.querySelector('#main > .stack');if(!st)return;
  /* les quartiers */
  if(st.querySelector(':scope > .lobby')&&st.querySelector(':scope > .lplaces'))st.classList.add('dkhub');
  /* Aventure : 2 colonnes */
  let lz=null;try{lz=UI&&UI.lz&&UI.lz.adv}catch(e){}
  if(TAB==='adv'&&!lz&&dk()&&!st.classList.contains('dkadv')){const kids=[...st.children];
    const side=kids.filter(c=>c.matches('.gvcard,.sgcard')||(c.matches('.card.row')&&c.querySelector('[data-a="idle"]')));
    const camp=kids.filter(c=>c.matches('#diffsw,.worlds,.wbanner,.path')||(c.matches('.card')&&!c.matches('.hccard2')&&!side.includes(c)));
    if(camp.length>=3&&side.length){const cols=document.createElement('div');cols.className='dkcols';
      const A=document.createElement('div');A.className='stack dkcolA';const Bc=document.createElement('div');Bc.className='stack dkcolB';
      const first=camp[0];st.insertBefore(cols,first);camp.forEach(c=>A.appendChild(c));side.forEach(c=>Bc.appendChild(c));cols.appendChild(A);cols.appendChild(Bc);st.classList.add('dkadv')}}}
{const r0=render;render=function(){const x=r0.apply(this,arguments);try{dkLayout()}catch(e){console.warn('dkLayout',e)}return x}}
{const rt=renderTabs;renderTabs=function(){const x=rt.apply(this,arguments);try{sbInit();sbVer()}catch(e){}return x}}
MQ.addEventListener&&MQ.addEventListener('change',()=>{try{render()}catch(e){}});

/* ---------- survoler un lieu = son bâtiment brille (et inversement) ---------- */
let HOV=null;const hov=v=>{if(HOV===v)return;HOV=v;document.querySelectorAll('#main .dkhov').forEach(e=>e.classList.remove('dkhov'));
  if(v)document.querySelectorAll(`#main .dkhub .lbh[data-v="${CSS.escape(v)}"],#main .dkhub .lpl[data-v="${CSS.escape(v)}"]`).forEach(e=>e.classList.add('dkhov'))};
document.addEventListener('mouseover',e=>{if(!dk())return;const t=e.target.closest&&e.target.closest('#main .dkhub .lbh[data-v],#main .dkhub .lpl[data-v]');hov(t?t.dataset.v:null)},{passive:true});

/* ---------- styles ---------- */
const st=document.createElement('style');st.id='v448dk';st.textContent=`
nav.tabs .sbbrand,nav.tabs .sbfoot{display:none}
@media (min-width:900px) and (min-aspect-ratio:5/4){
 /* fond : deux aurores et une ligne de montagnes très discrètes sur les côtés */
 body::before{content:"";position:fixed;inset:0;z-index:-1;pointer-events:none;transform:translateZ(0);
  background:radial-gradient(42vw 60vh at 0% 30%,rgba(124,92,255,.13),transparent 70%),radial-gradient(40vw 55vh at 100% 75%,rgba(58,200,220,.08),transparent 70%),
   url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1600 220' preserveAspectRatio='none'%3E%3Cpath d='M0 220V150l90-48 70 30 110-80 90 62 60-30 120 86 100-70 80 40 130-96 110 78 70-34 120 70 90-52 110 64 90-40 90 48v72z' fill='%23140e33'/%3E%3Cpath d='M0 220v-38l120-34 90 26 140-52 120 44 100-24 150 40 130-50 120 36 110-22 150 40 120-30 150 34v30z' fill='%231b1342'/%3E%3C/svg%3E") bottom/100% 22vh no-repeat}
 /* en-tête en verre */
 #app>header.top{margin:0 -14px;padding:10px 14px!important;border-radius:0 0 18px 18px;background:linear-gradient(180deg,rgba(28,20,64,.94),rgba(18,12,42,.9))!important;
  border:1px solid rgba(255,255,255,.07);border-top:0;box-shadow:0 14px 30px -18px rgba(0,0,0,.9),inset 0 -1px 0 rgba(255,216,74,.12)}
 #app>header.top+#main{padding-top:14px}
 /* quartiers : décor à gauche, lieux à droite */
 #main .stack.dkhub{display:grid;grid-template-columns:minmax(0,calc((100vh - 200px) * 1.6667)) clamp(272px,27%,350px);justify-content:center;column-gap:18px;row-gap:12px;align-items:start}
 #main .stack.dkhub>*{grid-column:1/-1;min-width:0}
 #main .stack.dkhub>.lobby{grid-column:1;grid-row:2;max-width:none!important;width:100%;margin:0!important}
 #main .stack.dkhub>.lplaces{grid-column:2;grid-row:2;display:flex!important;flex-direction:column;gap:8px;padding:12px;border-radius:22px;
  background:linear-gradient(180deg,rgba(40,30,92,.55),rgba(16,11,38,.55));border:1px solid rgba(255,255,255,.08);box-shadow:inset 0 1px 0 rgba(255,255,255,.06),0 18px 40px -22px #000}
 #main .stack.dkhub>.lplaces::before{content:var(--dkpl,"Où aller ?");font:900 12px/1 var(--fb);letter-spacing:.12em;text-transform:uppercase;color:#cfc3ff;opacity:.8;padding:2px 4px 4px}
 #main .stack.dkhub .lpl{min-height:66px!important;grid-template-columns:46px minmax(0,1fr)!important;padding:10px 30px 10px 10px!important;transition:transform .14s ease-out,box-shadow .14s,filter .14s!important}
 #main .stack.dkhub .lpl .li{width:46px!important;height:46px!important}
 #main .stack.dkhub .lpl small{font-size:12px!important;line-height:1.3}
 #main .stack.dkhub .lpl:hover,#main .stack.dkhub .lpl.dkhov{transform:translateX(4px);filter:brightness(1.12);box-shadow:0 0 0 1.5px rgba(255,216,74,.55),0 10px 24px -12px #000,0 0 22px -6px color-mix(in srgb,var(--jw,#b48cff) 70%,transparent)!important}
 #main .lbh.dkhov{transform:translateY(-3px)}
 #main .lbh:hover::after,#main .lbh.dkhov::after{box-shadow:none!important;background:radial-gradient(50% 46% at 50% 58%,rgba(255,236,150,.34),rgba(255,236,150,.1) 55%,rgba(255,236,150,0) 75%)}
 #main .lbh.dkhov .lbl,#main .lbh:hover .lbl{transform:translateY(-55%) scale(1.12);box-shadow:0 0 0 2px rgba(255,216,74,.85),0 0 18px rgba(255,216,74,.55),0 4px 12px rgba(0,0,0,.6)!important}
 #main .lbh .lbl{transition:transform .14s ease-out,box-shadow .14s}
 #main .stack.dkhub>div:first-child .evh .h{font-size:30px}
 /* Aventure : 2 colonnes */
 #main .stack.dkadv>.dkcols{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:14px;align-items:start}
 #main .dkcols>.stack{min-width:0}
 #main .dkcolB{position:sticky;top:76px}
 #main .dkcolA .path{gap:14px 10px}
 /* Ménagerie : vitrine et couveuse côte à côte, boutique et « où trouver » côte à côte */
 #main .ptpage{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;align-items:stretch}
 #main .ptpage>*{grid-column:1/-1;min-width:0;margin:0!important}
 #main .ptpage>.ptshow{grid-column:1}
 #main .ptpage>.ptinc{grid-column:2}
 #main .ptpage>.card:has([data-a="ptbuyegg"],[data-a="ptbuyber"]){grid-column:1}
 #main .ptpage>.ptwhere{grid-column:2}
 /* quêtes et guildes sur 2 colonnes */
 body[data-tab="quetes"] #main>.stack>.list,body[data-tab="guilde"] #main>.stack>.list.glist{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px;align-items:stretch}
}
@media (min-width:900px) and (min-aspect-ratio:5/4) and (max-height:700px){
 #main .dkcolB{position:static}
}
/* barre de gauche large */
@media (min-width:1280px) and (min-aspect-ratio:5/4){
 body{padding-left:228px!important}
 #app{max-width:1340px!important}
 nav.tabs{width:228px!important;flex-direction:column!important;align-items:stretch!important;justify-content:space-between!important;padding:18px 0 14px!important;
  background:linear-gradient(180deg,#1f1648 0%,#130d2e 55%,#0e0a22 100%)!important;border-right:1px solid rgba(255,216,74,.16)!important;box-shadow:inset -1px 0 0 rgba(255,255,255,.04),10px 0 32px -10px rgba(0,0,0,.65)!important}
 nav.tabs .sbbrand{display:flex;align-items:center;gap:11px;padding:0 18px 16px;margin:0 14px 6px;border-bottom:1px solid rgba(255,216,74,.14)}
 nav.tabs .sbcrest{width:46px;height:46px;flex:0 0 46px;filter:drop-shadow(0 4px 10px rgba(0,0,0,.6)) drop-shadow(0 0 12px rgba(143,107,255,.35))}
 nav.tabs .sbname{display:flex;flex-direction:column;line-height:1}
 nav.tabs .sbname b{font:400 22px/1 "Lilita One",var(--fb);color:#ffd84a;letter-spacing:.01em;text-shadow:0 2px 0 #6a3a08,0 0 14px rgba(255,216,74,.25)}
 nav.tabs .sbname span{font:400 17px/1.1 "Lilita One",var(--fb);color:#e9e1ff;letter-spacing:.02em;margin-top:2px}
 nav.tabs .in{flex:1 1 auto;justify-content:flex-start!important;padding:6px 14px!important;gap:3px!important}
 nav.tabs .tab{flex-direction:row!important;justify-content:flex-start!important;align-items:center!important;gap:13px!important;margin:0!important;padding:10px 14px!important;font-size:14.5px!important;border-radius:14px!important;text-align:left}
 nav.tabs .tab svg,nav.tabs .tab img.lpt{width:23px!important;height:23px!important;flex:0 0 23px}
 nav.tabs .tab .lg{display:inline!important}nav.tabs .tab .sm{display:none!important}
 nav.tabs .tab .dot{position:static!important;margin-left:auto;flex:0 0 9px;left:auto!important;top:auto!important}
 nav.tabs .tab .tnew{inset:50% 14px auto auto!important;transform:translateY(-50%)!important}
 nav.tabs .tab .tlk{position:static!important;margin-left:auto}
 nav.tabs .tab.on::before{inset:20% auto 20% -14px!important;width:4px!important}
 nav.tabs .tab:hover{transform:translateX(2px)}
 nav.tabs .sbfoot{display:flex;flex-direction:column;gap:8px;padding:12px 14px 0;margin:6px 14px 0;border-top:1px solid rgba(255,216,74,.12)}
 nav.tabs .sbbug{display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:9px 10px;border-radius:12px;cursor:pointer;font:800 13px var(--fb);color:#ffe2dc;
  background:linear-gradient(180deg,rgba(255,120,100,.16),rgba(255,120,100,.05));border:1px solid rgba(255,140,120,.4);transition:filter .15s,transform .15s}
 nav.tabs .sbbug:hover{filter:brightness(1.2);transform:translateY(-1px)}
 nav.tabs .sbver{text-align:center;font-size:11px;color:#8f86b8}
 #app>header.top .logo .lgt{display:none}
 #app>header.top #pw{font-size:15px!important;font-weight:900!important;color:#fff6e4!important;text-transform:none!important;letter-spacing:0!important}
}
@media (min-width:1600px) and (min-aspect-ratio:5/4){
 #app{max-width:1420px!important}
}
@media (min-width:1280px) and (min-aspect-ratio:5/4) and (max-height:720px){
 nav.tabs .sbbrand{padding-bottom:10px}nav.tabs .sbcrest{width:38px;height:38px;flex-basis:38px}
 nav.tabs .tab{padding:7px 14px!important;font-size:13.5px!important}
}
`;document.head.appendChild(st);
try{document.documentElement.style.setProperty('--dkpl',JSON.stringify(T('Où aller ?','Where to?')))}catch(e){}
setTimeout(()=>{try{sbInit();sbVer();dkLayout()}catch(e){}},50);

/* ================= NOTES DE VERSION ================= */
try{const it=[
 "🐞 <b>Nouveau : « Signaler un bug »</b> dans ⚙️ Paramètres. Tu expliques ce qui s'est passé en quelques mots et ça part directement chez le créateur du jeu, avec les infos techniques utiles (version, écran, appareil). Aucune donnée perso.",
 "💻 <b>Une vraie interface pour ordinateur</b> : barre de gauche avec le blason du royaume, quartiers avec le décor à gauche et les lieux à droite (survole un lieu : son bâtiment s'illumine), Aventure sur 2 colonnes, quêtes et guildes sur 2 colonnes. Sur téléphone, rien ne change."];
 PATCH.unshift({v:'v73',d:Date.now(),t:'Signaler un bug · interface PC',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['Signaler un bug · interface PC']='Bug reports · PC interface';
  I18N_EN[it[0]]="🐞 <b>New: “Report a bug”</b> in ⚙️ Settings. Explain what happened in a few words and it goes straight to the game's creator, with useful technical info (version, screen, device). No personal data.";
  I18N_EN[it[1]]="💻 <b>A real computer interface</b>: left bar with the realm's crest, districts with the scenery on the left and places on the right (hover a place: its building lights up), Adventure in 2 columns, quests and guilds in 2 columns. Nothing changes on phones."}}catch(e){}
}catch(e){console.warn('v448 dk',e)}})();
