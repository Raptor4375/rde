/* ================= V84 : TCHAT FLUIDE — il ne remonte plus tout seul, et il ne rame plus =================
   Ce qui se passait : chaque message des autres reçoit un petit bouton 🌐 (traduire), ajouté APRÈS qu'on a collé
   le tchat en bas. Le bouton prenait une ligne de plus sous chaque message : 60 messages × 21 px = le tchat
   remontait d'environ 1000 px, à chaque nouveau message, à chaque envoi et à chaque mise à jour de la page.
   Et chaque nouveau message refaisait les 60 messages (avec leurs portraits), en recopiant ~800 bots du royaume
   deux fois par message : 150 à 300 ms de calcul sur téléphone, pendant lesquelles le clavier ne répondait plus.
   1. 🌐 rangé en haut à droite du message : plus de ligne en plus, plus de saut.
   2. Le tchat reste collé en bas tant que tu y es ; si tu remontes lire, il ne bouge plus sous tes yeux.
   3. Un nouveau message = on ajoute seulement ce message (les autres restent en place, portraits compris).
   4. Fabriquer un message ne recopie plus la liste des bots.
   5. Dans les tchats, les mises à jour des autres joueurs ne redessinent plus toute la page.
   6. Guerre des Guildes : les membres ne disent plus « nos défenses tiennent » quand tout est tombé. */
(function(){try{
const IDS=['chat','wchat','dmth'],SEL='#chat,#wchat,#dmth',NEAR=90;
const now=()=>performance.now();

/* ---------- 1. le bouton 🌐 ne rallonge plus les messages ---------- */
{const st=document.createElement('style');st.textContent=`.msg{position:relative}
.msg>div>.trbtn{position:absolute;top:-3px;right:-3px;margin:0;padding:3px 4px;font-size:12px;line-height:1}
.msg:not(.me):not(.sys)>div:last-child{padding-right:22px}`;document.head.appendChild(st)}

/* ---------- 4. fabriquer un message ne recopie plus les ~800 lignes de bots ---------- */
let RO=0;
/* pour dessiner un message, une liste de bots vieille de quelques secondes suffit (avant : recalculée à chaque changement du royaume) */
const roCache=f=>{if(typeof f!=='function')return f;let c=null,t=0,g=null,p=null,fr=null;
  return function(){if(RO>0){const n=Date.now();if(!c||n-t>8000||((g!==NET.guilds||p!==NET.players||fr!==NET.free)&&n-t>2500)){c=f.apply(this,arguments);g=NET.guilds;p=NET.players;fr=NET.free;t=n}return c}return f.apply(this,arguments)}};
try{botRows=roCache(botRows)}catch(e){}try{freeRows=roCache(freeRows)}catch(e){}try{realRows=roCache(realRows)}catch(e){}

/* chaque message porte sa clé (data-k) et une empreinte (data-h) : on sait lesquels sont nouveaux ou ont changé */
const KEYOF=m=>String(m.t||0)+'.'+String(m.w||'').replace(/[^\w:.-]/g,'').slice(-28)+'.'+String(m.x==null?'':m.x).length;
const sig=h=>{let a=2166136261;const n=h.length,H=Math.min(700,n),T=Math.max(H,n-900);for(let i=0;i<H;i++){a^=h.charCodeAt(i);a=Math.imul(a,16777619)}for(let i=T;i<n;i++){a^=h.charCodeAt(i);a=Math.imul(a,16777619)}return(a>>>0).toString(36)+n.toString(36)};
const TL=m=>{try{return String(hm(m.t)).replace(/["<>&]/g,'')}catch(e){return''}};
{const f=rmsgHTML;rmsgHTML=function(m){RO++;let h;try{h=f.apply(this,arguments)}finally{RO--}
  try{if(m&&typeof h==='string'&&h.startsWith('<div ')&&h.indexOf(' data-k="')<0)h='<div data-k="'+KEYOF(m)+'" data-h="'+sig(h)+'" data-tl="'+TL(m)+'" '+h.slice(5)}catch(e){}return h}}

/* ---------- 2. collé en bas tant qu'on y est ---------- */
const PIN={};const ST=id=>PIN[id]||(PIN[id]={pin:true,ug:0});
const gap=c=>c.scrollHeight-c.scrollTop-c.clientHeight;
const toBottom=c=>{if(gap(c)>1)c.scrollTop=c.scrollHeight};
/* seul un geste du joueur (doigt, molette, clic dans la liste) peut décoller le tchat du bas */
['touchstart','touchmove','wheel','pointerdown','keydown'].forEach(t=>document.addEventListener(t,e=>{try{const c=e.target&&e.target.closest&&e.target.closest(SEL);if(c)ST(c.id).ug=now()}catch(er){}},{capture:true,passive:true}));
document.addEventListener('scroll',e=>{const c=e.target;if(!c||!c.id||IDS.indexOf(c.id)<0)return;const s=ST(c.id),g=gap(c);
  if(g<NEAR)s.pin=true;else if(now()-s.ug<1500)s.pin=false;else if(s.pin)c.scrollTop=c.scrollHeight},{capture:true,passive:true});
/* tout ce qui change dans un tchat (boutons ajoutés, traductions, images…) le garde en bas s'il y était */
const MO=new MutationObserver(ms=>{let set=null;for(const m of ms){let t=m.target;if(t&&t.nodeType!==1)t=t.parentElement;if(!t||!t.closest)continue;const c=t.closest(SEL);if(c)(set||(set=new Set())).add(c)}
  if(set)for(const c of set){if(ST(c.id).pin)toBottom(c);try{chatJumpUpd(c)}catch(e){}}});
MO.observe(document.body,{childList:true,subtree:true,characterData:true});
/* clavier qui s'ouvre, écran qui tourne */
const onRs=()=>{for(const id of IDS){const c=document.getElementById(id);if(c&&ST(id).pin)toBottom(c)}};
addEventListener('resize',onRs,{passive:true});try{if(window.visualViewport)visualViewport.addEventListener('resize',onRs,{passive:true})}catch(e){}
/* quand tu envoies un message, on redescend toujours pour le voir arriver */
const pinNow=id=>{const s=ST(id);s.pin=true;s.ug=0;const c=document.getElementById(id);if(c)toBottom(c)};
window.addEventListener('submit',e=>{const f=e.target;const id=f&&f.dataset&&({say:'chat',wsay:'wchat',dmsay:'dmth'})[f.dataset.f];if(id)pinNow(id)},true);
document.addEventListener('click',e=>{const t=e.target&&e.target.closest&&e.target.closest('[data-a="quick"],[data-a="stk"]');if(!t)return;pinNow(t.dataset.f==='wsay'?'wchat':'chat')},true);

/* repère de lecture : le premier message visible et sa position (pour ne pas bouger sous les yeux) */
function anchorOf(c){try{const top=c.getBoundingClientRect().top;for(const e of c.children){const r=e.getBoundingClientRect();if(r.bottom>top+1)return e.dataset&&e.dataset.k?{k:e.dataset.k,d:r.top-top}:null}}catch(e){}return null}
function restore(c,a){if(!a)return;try{const e=c.querySelector('[data-k="'+(window.CSS&&CSS.escape?CSS.escape(a.k):a.k)+'"]');if(!e)return;const d=e.getBoundingClientRect().top-c.getBoundingClientRect().top;if(Math.abs(d-a.d)>1)c.scrollTop+=d-a.d}catch(e){}}
function fixChat(c,anc){try{if(typeof i18nMsgBtns==='function')i18nMsgBtns(c)}catch(e){}
  if(ST(c.id).pin)toBottom(c);else restore(c,anc);try{chatJumpUpd(c)}catch(e){}}

/* ---------- 3. un nouveau message = on ajoute seulement ce message ---------- */
function keyedOK(src){let n=0;for(const e of src.children){if(!e.dataset||!e.dataset.k)return false;n++}return n>0}
/* met les messages dans l'ordre voulu en touchant le moins possible : d'abord on retire ce qui part
   (le plus vieux message en haut), ainsi les autres n'ont pas à bouger, puis on ajoute les nouveaux */
function place(c,nodes){const set=new Set(nodes);for(const e of [...c.childNodes])if(!set.has(e))e.remove();
  let prev=null;for(const e of nodes){const want=prev?prev.nextSibling:c.firstChild;if(e!==want){if(prev)prev.after(e);else c.prepend(e)}prev=e}}
function reconcile(c,src){const old=new Map();for(const e of c.children){const k=e.dataset&&e.dataset.k;if(k&&!old.has(k))old.set(k,e)}
  const used=new Set(),nodes=[];
  for(const ne of [...src.children]){let e=old.get(ne.dataset.k);if(!e||used.has(e)||e.dataset.h!==ne.dataset.h)e=ne;used.add(e);nodes.push(e)}
  place(c,nodes)}
/* nouveau message : on ne fabrique QUE les messages qui ne sont pas déjà affichés */
function fastSync(c,msgs){const f=c&&c.firstElementChild;if(!f||!f.dataset||!f.dataset.k||!Array.isArray(msgs))return false;
  const have=new Map();for(const e of c.children){const k=e.dataset&&e.dataset.k;if(k&&!have.has(k))have.set(k,e)}
  const anc=ST(c.id).pin?null:anchorOf(c);const nodes=[],slots=[];let fresh='';
  for(const m of msgs){if(!m)continue;const e=have.get(KEYOF(m));
    if(e&&e.dataset.tl===TL(m)){have.delete(KEYOF(m));nodes.push(e);continue}
    const h=rmsgHTML(m);if(!h)continue;slots.push(nodes.length);nodes.push(null);fresh+=h}
  if(slots.length){let html=fresh;try{if(window.RDElight)html=RDElight(html,1)}catch(e){}
    const t=document.createElement('template');PD.set.call(t,html);const kids=[...t.content.children];
    if(kids.length!==slots.length)return false;slots.forEach((i,j)=>{nodes[i]=kids[j]})}
  if(!nodes.length)return false;
  place(c,nodes);fixChat(c,anc);return true}
/* rendu complet de la page (morph) : le tchat garde ses messages */
const PEND=new Map();
window.RDEkeyed=function(a,b){if(!a.isConnected||!a.firstElementChild||!keyedOK(b))return false;PEND.set(a,ST(a.id).pin?null:anchorOf(a));reconcile(a,b);return true};
/* code qui remplace tout le tchat (nouveau message, tchat monde…) : même chose */
const PD=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
function hookChat(el){if(!el||el.__kh||el.id==='dmth'||!PD||!PD.set)return;el.__kh=1;
  Object.defineProperty(el,'innerHTML',{configurable:true,get(){return PD.get.call(this)},set(v){setChat(this,v)}})}
function setChat(el,v){let html=v==null?'':String(v);
  try{if(html.length>20000&&window.RDElight)html=RDElight(html)}catch(e){}
  const anc=ST(el.id).pin?null:anchorOf(el);
  if(!el.isConnected||!el.firstElementChild||html.indexOf(' data-k="')<0){PD.set.call(el,html);fixChat(el,anc);return}
  const t=document.createElement('template');PD.set.call(t,html);
  if(!keyedOK(t.content)){PD.set.call(el,html);fixChat(el,anc);return}
  try{reconcile(el,t.content)}catch(e){PD.set.call(el,html)}fixChat(el,anc)}
/* tchat de guilde : un nouveau message n'oblige plus à refaire les 60 */
{const om=onMsgs;onMsgs=function(){try{if(!B){const g=TAB==='guilde'&&!!S.rgid;const c=g?document.getElementById('chat'):document.querySelector('#main #chat');
    if(c&&fastSync(c,NET.msgs)){NET.firstMsgs=1;if(g){S.rgSeen=Date.now();return}renderTabs();return}}}catch(e){}
  return om.apply(this,arguments)}}
/* tchat monde : pareil */
try{const sw0=subWorld;subWorld=function(){if(!NET.on||NET.wunsub||!NET.db)return sw0.apply(this,arguments);
  NET.wunsub=NET.db.collection('msgs').where('g','==','world').orderBy('t','desc').limit(60).onSnapshot(s=>{NET.wmsgs=s.docs.map(d=>d.data()).reverse();const c=$('#wchat');
    if(c&&TAB==='top'&&UI.soc==='monde'&&!B){try{if(fastSync(c,NET.wmsgs)){NET.wfirst=1;return}}catch(e){}
      const near=c.scrollHeight-c.scrollTop-c.clientHeight<80;c.innerHTML=NET.wmsgs.map(rmsgHTML).join('');if(near||!NET.wfirst)c.scrollTop=c.scrollHeight;NET.wfirst=1}},e=>console.warn('world',e.code))}}catch(e){}

/* à chaque rendu : on garde la position de lecture, et un tchat qu'on vient d'ouvrir commence en bas */
let RG={rgid:S.rgid,gid:S.gid};
{const r=render;render=function(){const pre={};
  for(const id of IDS){const c=document.getElementById(id);pre[id]=c?{el:c,anc:ST(id).pin?null:anchorOf(c)}:null}
  const out=r.apply(this,arguments);
  try{RG={rgid:S.rgid,gid:S.gid};
    for(const id of IDS){const c=document.getElementById(id);const p=pre[id];
      if(!c){continue}
      if(!p)ST(id).pin=true;
      hookChat(c);let anc=p?p.anc:null;if(PEND.has(c)){anc=PEND.get(c)||anc;PEND.delete(c)}fixChat(c,anc)}
    PEND.clear()}catch(e){}
  return out}}
/* le bouton « ⬇ Messages récents » se place en bas de la liste (et plus par-dessus la zone de saisie) */
try{const cj=chatJumpUpd;chatJumpUpd=function(c){cj.apply(this,arguments);try{const b=c&&c.parentElement&&c.parentElement.querySelector(':scope>.cjump');if(b){b.style.top=Math.max(0,c.offsetTop+c.offsetHeight-44)+'px';b.style.bottom='auto';
    if(!b.__pin){b.__pin=1;b.addEventListener('click',()=>{ST(c.id).pin=true},true)}}}catch(e){}}}catch(e){}

/* ---------- 5. dans un tchat, les mises à jour des autres joueurs ne redessinent plus toute la page ---------- */
function chatZoneLite(){try{if(B||$('#ovl').innerHTML)return false;if(S.rgid!==RG.rgid||S.gid!==RG.gid)return false;const z=UI.lz||{};
  if(TAB==='guilde')return z.guilde==='chat'&&!!document.getElementById('chat');
  if(TAB==='top')return(z.top==='monde'||z.top==='mp')&&!!document.querySelector('#main .chub')}catch(e){}return false}
{const on=onNet;onNet=function(){const r=on.apply(this,arguments);try{if(chatZoneLite()){clearTimeout(netRT);netRT=setTimeout(()=>{try{renderTop();renderTabs();if(TAB==='top'&&typeof chubRefresh==='function')chubRefresh()}catch(e){}},350)}}catch(e){}return r}}

/* ---------- 7. deux règles de style « :has() » faisaient recalculer le style de TOUTE la page (~900 éléments)
   à chaque petit changement (un message, un bouton…). Elles utilisent maintenant des classes posées par le jeu. ---------- */
const hasLb=root=>{try{for(const s of root.querySelectorAll('.stack')){const w=!!s.querySelector(':scope>.lobby');if(s.classList.contains('haslb')!==w)s.classList.toggle('haslb',w)}}catch(e){}};
window.RDEprepDom=hasLb;
{const main=document.getElementById('main');let q=false;
 if(main){new MutationObserver(()=>{if(!q){q=true;queueMicrotask(()=>{q=false;hasLb(main)})}}).observe(main,{childList:true,subtree:true,attributes:true,attributeFilter:['class']});hasLb(main)}}
{const ovl=document.getElementById('ovl');const upd=()=>{try{const o=!!(ovl&&ovl.querySelector('.modal'));const h=document.documentElement;if(h.classList.contains('mdlo')!==o)h.classList.toggle('mdlo',o)}catch(e){}};
 if(ovl){new MutationObserver(upd).observe(ovl,{childList:true,subtree:true});upd()}}

/* ---------- 8. pendant que tu écris, les animations décoratives se mettent en pause (comme pendant le défilement) :
   le téléphone garde toute sa force pour le clavier ---------- */
{const st=document.createElement('style');st.textContent=`html.chatty #app *,html.chatty #app *::before,html.chatty #app *::after{animation-play-state:paused!important}
html.chatty #app .cjump{animation-play-state:running!important}`;document.head.appendChild(st);
 const PS=new Set(),H=document.documentElement;
 const on=()=>{if(H.classList.contains('chatty'))return;H.classList.add('chatty');try{document.querySelectorAll('#main svg').forEach(s=>{if(s.pauseAnimations&&s.animationsPaused&&!s.animationsPaused()&&s.querySelector('animate,animateTransform,animateMotion')){s.pauseAnimations();PS.add(s)}})}catch(e){}};
 const off=()=>{H.classList.remove('chatty');PS.forEach(s=>{try{if(s.isConnected)s.unpauseAnimations()}catch(e){}});PS.clear()};
 const isC=el=>{try{return typeof chatIn==='function'&&chatIn(el)}catch(e){return false}};
 document.addEventListener('focusin',e=>{if(isC(e.target))on()},true);
 document.addEventListener('focusout',e=>{if(isC(e.target))setTimeout(()=>{if(!isC(document.activeElement))off()},60)},true);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden&&!isC(document.activeElement))off()})}

/* ---------- 6. Guerre des Guildes : ce que disent les membres correspond à ce qui se passe vraiment ---------- */
function gwSay(gid,ph){
  const M=(typeof GWD!=='undefined'&&GWD.m)||{},day=gwDay(),ATK=typeof GW_ATK!=='undefined'?GW_ATK:3;
  const nm=k=>{try{return gterOf(k).n}catch(e){return k==='cap'?"la capitale":'un royaume'}};
  const gn=g=>{try{return gwGuildName(g)}catch(e){return'Les ennemis'}};
  let pool=[];try{pool=gwBotPool().filter(b=>b.g===gid)}catch(e){}
  if(!Object.keys(M).length||!pool.length)return pick(["Pensez à la Guerre des Guildes ⚔️","Quelqu'un a regardé la carte de la guerre ? 🗺️"]);
  const hurt=id=>Object.values(M).some(m=>m&&m.bd&&m.bd[id]===day);
  const used=id=>(((GWD.ac||{})[day]||{})[id])||0;
  const wounded=pool.filter(b=>hurt(b.id)).length;
  const left=pool.filter(b=>!hurt(b.id)).reduce((a,b)=>a+Math.max(0,ATK-used(b.id)),0);
  const own=Object.keys(M).filter(k=>M[k]&&M[k].own===gid);
  const t0=Date.now()-3*36e5,L=(GWD.log||[]).filter(e=>e&&e.t<=Date.now()&&e.t>t0);
  const last=f=>{const x=L.filter(f);return x[x.length-1]};
  const took=last(e=>e.g===gid&&(e.ty==='take'||e.ty==='grab')),lost=last(e=>e.v===gid&&(e.ty==='take'||e.ty==='grab'));
  const held=last(e=>e.v===gid&&e.ty==='fail'),hit=last(e=>e.v===gid&&e.ty==='hit');
  const out=[];
  if(ph==='prep'){if(!own.length)out.push("Il faut qu'on prenne un royaume avant que les attaques commencent","Les royaumes libres partent vite, faut se dépêcher");
    else out.push("Mettez vos meilleures équipes en défense, les attaques arrivent bientôt ⚔️","Qui pose dans quel royaume ? On s'organise ?");return pick(out)}
  if(took)out.push(`On a pris ${nm(took.k)} ! 🏰🔥`,`${took.n} a pris ${nm(took.k)}, trop fort 😎`);
  if(held)out.push(`Nos défenses ont tenu à ${nm(held.k)} 💪`,`La guilde ${gn(held.g)} s'est cassé les dents sur ${nm(held.k)} 🛡️`);
  if(lost)out.push(`Ils nous ont pris ${nm(lost.k)} 😤 On le reprend quand tu veux : dis « attaquez »`);
  else if(hit)out.push(`${gn(hit.g)} attaque ${nm(hit.k)}, ça chauffe ⚔️`);
  if(wounded&&wounded>=Math.ceil(pool.length*.6))out.push("On est presque tous blessés jusqu'à demain 🤕","Grosse journée… presque toute l'équipe est KO jusqu'à demain 😮‍💨");
  if(!own.length)out.push("On n'a plus aucun royaume 😬 Il faut en reprendre un : dis « attaquez » !");
  if(left>0)out.push(`Il nous reste ${left} attaque${left>1?'s':''} aujourd'hui ⚔️ Dis « attaquez » quand tu veux`,"Qui vient avec moi sur leur royaume le plus faible ?");
  if(ph==='final'){let fin=[];try{fin=gwFinalists()||[]}catch(e){}
    if(fin.includes(gid))out.push("C'est la finale pour la capitale !! 👑","Tout le monde sur la capitale, on lâche rien");
    else out.push("La finale se joue sans nous cette fois… la prochaine sera pour nous 😤")}
  if(!out.length)out.push("On garde nos forces pour demain 💤","Demain on repart à l'assaut ⚔️");
  return pick(out)}
try{gwChatTick=function(){try{if(!gwActive()||!NET.on||!NET.canWrite||document.hidden)return;const ph=gwPhase(),gid=S.rgid;
    if(gid&&Math.random()<.3){const bots=((NET.guilds[gid]||{}).bots||[]).filter(b=>b&&b.n);
      if(bots.length)Promise.resolve(typeof gwLoadAll==='function'?gwLoadAll():0).catch(()=>{}).then(()=>{try{if(S.rgid!==gid)return;const x=gwSay(gid,ph);if(x)postBotMsg(gid,pick(bots),x)}catch(e){}})}
    if(Math.random()<.08){const pool=botRows().filter(b=>Date.now()-b.last<36e5*6);if(pool.length){const b=pick(pool);postBotMsg('world',{id:b.bid,n:b.n},pick(GWW))}}}catch(e){}}}catch(e){}
window.RDEgwSay=gwSay;

/* ---------- notes de version ---------- */
try{const it=["💬 <b>Tchat</b> : il ne remonte plus tout seul quand tu envoies ou reçois un message. Il reste collé en bas tant que tu y es, et si tu remontes lire les anciens messages, il ne bouge plus sous tes yeux.",
  "⚡ Le tchat ne rame plus : un nouveau message s'ajoute sans refaire tous les autres, et pendant que tu écris, la page n'est plus redessinée à chaque mise à jour des autres joueurs (les animations décoratives font aussi une pause). Le petit 🌐 (traduire) est rangé en haut à droite de chaque message : plus de place pour les messages.",
  "🚀 Tout le jeu est plus fluide : chaque petit changement à l'écran (un message, un bouton, une récompense…) faisait recalculer le style de toute la page. Maintenant, seulement ce qui change.",
  "⚔️ Guerre des Guildes : tes membres parlent de ce qui se passe vraiment (royaume pris ou perdu, défense qui a tenu, blessés, attaques qui restent) au lieu de phrases au hasard."];
 const en=["💬 <b>Chat</b> — it no longer jumps up when you send or receive a message. It stays at the bottom while you are there, and if you scroll up to read older messages, it no longer moves under your eyes.",
  "⚡ The chat no longer lags: a new message is added without rebuilding all the others, and while you type, the page is no longer redrawn at every update from other players (decorative animations also take a break). The small 🌐 (translate) now sits at the top right of each message: more room for messages.",
  "🚀 The whole game is smoother: every small change on screen (a message, a button, a reward…) used to recompute the style of the entire page. Now only what changes.",
  "⚔️ Guild War: your members talk about what really happens (kingdom taken or lost, a defense that held, wounded members, attacks left) instead of random lines."];
 PATCH.unshift({v:84,d:'27 novembre 2026',t:'Un tchat qui ne bouge plus',items:it});it.forEach((x,i)=>{I18N_EN[x]=en[i];try{RDEput(x,en[i])}catch(e){}});I18N_EN['Un tchat qui ne bouge plus']='A chat that stays put'}catch(e){}
}catch(e){console.warn('v464',e)}})();
