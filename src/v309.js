
/* ================= OUVERTURE AU PUBLIC : sécurité du chat, invitations, parrainage ================= */
/* --- filtre anti-insultes --- */
const BADW=['connard','connards','connasse','conne','connes','salope','salopes','salaud','pute','putes','putain','enculé','enculés','encule','enculer','fdp','ntm','nique','niquer','nik','batard','bâtard','bâtards','batards','merde','merdique','pd','pédé','pede','tg','ta gueule','abruti','abrutie','débile','gogol','mongol','chienne','bouffon','couille','couilles','bite','chatte','nègre','negre','negro','bougnoule','youpin','tapette','gouine','pétasse','petasse','grognasse','enflure','raclure','fils de pute','va te faire','suce','sucer','cul'];
const BADRX=new RegExp('(^|[^a-zà-ÿ0-9])('+BADW.map(w=>w.replace(/[.*+?^${}()|[\]\\]/g,'\\$&').replace(/ /g,'\\s+')).join('|')+')(?=$|[^a-zà-ÿ0-9])','gi');
function chatClean(x){return String(x==null?'':x).replace(BADRX,(m,a,w)=>a+w[0]+'★'.repeat(Math.max(1,w.length-1)))}
function BLK(){if(!Array.isArray(S.blocked))S.blocked=[];return S.blocked}
{const pm=postMsg;postMsg=function(x,sys,gid){if(!sys)arguments[0]=chatClean(x);return pm.apply(this,arguments)}}
{const ds=dmSend;dmSend=function(key,x){return ds.call(this,key,chatClean(x))}}
for(const nm of ['rmsgHTML','msgHTML']){try{const f=window[nm];if(typeof f!=='function')continue;window[nm]=function(m){if(m&&m.w&&BLK().includes(m.w))return'';if(m&&m.x&&m.w!=='sys')m=Object.assign({},m,{x:chatClean(m.x)});return f.call(this,m)}}catch(e){}}
try{rmsgHTML=window.rmsgHTML;msgHTML=window.msgHTML}catch(e){}
{const dp=dmPush;dmPush=function(key,msg,n){if(String(key).startsWith('real:')&&BLK().includes(key.slice(5))&&msg&&!msg.m)return null;if(msg&&msg.x)msg=Object.assign({},msg,{x:chatClean(msg.x)});return dp.call(this,key,msg,n)}}
/* --- bloquer / signaler un vrai joueur depuis son profil --- */
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{if(!String(id).startsWith('r:'))return;const pid=String(id).slice(2);const m=$('#ovl .modal');if(!m||m.querySelector('.modrow'))return;const bl=BLK().includes(pid);
  m.insertAdjacentHTML('beforeend',`<div class="row modrow" style="gap:8px;margin-top:10px"><button class="btn sm" data-a="pblock" data-v="${esc(pid)}" style="flex:1">${bl?'✅ Débloquer':'🚫 Bloquer'}</button><button class="btn sm" data-a="preport" data-v="${esc(pid)}" style="flex:1">⚠️ Signaler</button></div>`)}catch(e){}}}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="pblock"],[data-a="preport"],[data-a="prsend"]');if(!b)return;e.preventDefault();e.stopPropagation();const pid=b.dataset.v,a=b.dataset.a;
  if(a==='pblock'){const L=BLK(),i=L.indexOf(pid);if(i>=0){L.splice(i,1);toast('Joueur débloqué.')}else{L.push(pid);toast('Joueur bloqué : tu ne verras plus ses messages.')}save();closeModal();render();return}
  if(a==='preport'){const d=NET.players&&NET.players[pid];modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">⚠️ Signaler ${esc(d&&d.n||'ce joueur')}</div><p class="sub">Dis-nous ce qui ne va pas. Le créateur du jeu verra ton signalement.</p>
     <div class="list" style="gap:6px">${['Insultes ou harcèlement','Contenu choquant','Triche','Pseudo inapproprié','Autre'].map((r,i)=>`<label class="setm"><input type="radio" name="prr" value="${esc(r)}" ${i?'':'checked'}> <span>${r}</span></label>`).join('')}</div>
     <textarea class="tx" id="prtx" rows="2" maxlength="300" placeholder="Détails (facultatif)" style="width:100%;margin-top:8px;box-sizing:border-box"></textarea><button class="btn p" data-a="prsend" data-v="${esc(pid)}" style="width:100%;margin-top:8px">Envoyer le signalement</button>`);return}
  if(a==='prsend'){const r=(document.querySelector('input[name=prr]:checked')||{}).value||'Autre',tx=($('#prtx')||{}).value||'';try{if(NET.on&&NET.db){const d=NET.players&&NET.players[pid];const recent=(NET.wmsgs||[]).filter(m=>m.w===pid).slice(-5).map(m=>m.x);
      await NET.db.collection('reports').add({by:NET.pid,byn:S.name||'',who:pid,n:d&&d.n||'',why:r,tx:String(tx).slice(0,300),msgs:recent,t:Date.now()})}toast('Merci, ton signalement a bien été envoyé.')}catch(er){toast("Le signalement n'a pas pu partir, réessaie plus tard.")}
    if(!BLK().includes(pid)&&confirm('Veux-tu aussi bloquer ce joueur ?')){BLK().push(pid);save()}closeModal();render()}},true);
/* --- inviter un ami + parrainage --- */
const RDE_LINK=(typeof RDE_URL!=='undefined'?RDE_URL:'https://raptor4375.github.io/rde/');
const REF_GIFT=300,REF_MAX=20;
function inviteLink(){return RDE_LINK+(NET.pid?'?ref='+encodeURIComponent(NET.pid):'')}
async function inviteShare(){const url=inviteLink();const text=`Viens jouer à Royaumes d'Éther avec moi ! Invoque des héros, affronte des boss et rejoins ma guilde. Avec mon lien, on gagne ${REF_GIFT} gemmes chacun 💎`;
  try{if(navigator.share){await navigator.share({title:"Royaumes d'Éther",text,url});return}}catch(e){if(e&&e.name==='AbortError')return}
  try{await navigator.clipboard.writeText(text+' '+url);toast('Lien d\'invitation copié ! Colle-le à tes amis.')}catch(e){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📤 Inviter un ami</div><p class="sub">Copie ce lien et envoie-le :</p><textarea class="tx xfcode" readonly rows="3">${esc(url)}</textarea>`)}}
function inviteModal(){const n=S.refN||0;modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📤 Inviter des amis</div>
  <p class="sub">Envoie ton lien à tes amis. Quand un ami commence à jouer avec, <b>vous gagnez ${REF_GIFT} gemmes chacun</b> 💎 (jusqu'à ${REF_MAX} amis).</p>
  <div class="invbox"><b class="num">${n}</b><span>ami${n>1?'s':''} invité${n>1?'s':''}</span></div>
  <button class="btn pro" data-a="invgo" style="width:100%">📤 Partager mon lien</button>
  <textarea class="tx xfcode" readonly rows="2" style="margin-top:8px">${esc(inviteLink())}</textarea>`)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="invite"],[data-a="invgo"]');if(!b)return;e.preventDefault();e.stopPropagation();if(b.dataset.a==='invite')inviteModal();else inviteShare()},true);
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&window.RDE_APP&&!m.querySelector('[data-a=invite]'))m.insertAdjacentHTML('afterbegin','<button class="btn pro" data-a="invite" style="width:100%;margin:0 0 10px">📤 Inviter des amis · +'+REF_GIFT+' 💎</button>')}catch(e){}}}
if(window.RDE_APP){
  /* on note qui a invité, si on arrive tout neuf avec ?ref= */
  try{const r=new URLSearchParams(location.search).get('ref');if(r&&!S.name&&!S.max&&!localStorage.getItem(KEY+'-ref'))localStorage.setItem(KEY+'-ref',r);if(r)history.replaceState(null,'',location.pathname+location.hash)}catch(e){}
  const refTick=async()=>{try{if(!NET.on||!NET.db||!NET.pid||!S.name)return;
    const by=localStorage.getItem(KEY+'-ref');if(by&&!S.refDone&&by!==NET.pid&&!S.xferAt){S.refDone=1;save();try{await NET.db.doc('refs/'+NET.pid).set({by,n:S.name,t:Date.now(),c:false});mail({x:`🎁 Bienvenue ! Un ami t'a invité dans Royaumes d'Éther : voici ${REF_GIFT} gemmes pour bien démarrer.`,gems:REF_GIFT});save();toast('🎁 Cadeau de parrainage dans ta boîte aux lettres !')}catch(e){}}
    if((S.refN||0)>=REF_MAX)return;const sn=await NET.db.collection('refs').where('by','==',NET.pid).get();
    for(const d of sn.docs){const x=d.data();if(x.c||(S.refN||0)>=REF_MAX)continue;try{await NET.db.doc('refs/'+d.id).update({c:true});S.refN=(S.refN||0)+1;mail({x:`🤝 ${x.n||'Un ami'} a rejoint le royaume grâce à toi ! Merci : voici ${REF_GIFT} gemmes.`,gems:REF_GIFT});save();toast(`🤝 ${x.n||'Un ami'} a rejoint grâce à toi : +${REF_GIFT} gemmes en courrier !`);try{renderTop()}catch(e){}}catch(e){}}}catch(e){}};
  setTimeout(refTick,12000);setInterval(refTick,600000)}
