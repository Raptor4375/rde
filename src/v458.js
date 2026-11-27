
/* ================= V458 : LES ÉVÉNEMENTS DE HÉROS — un nouveau héros à chaque saison, tout seul =================
   Demandé par Raptor : plus de « Chroniques des Héros » ; chaque nouveau héros arrive avec un événement limité
   (une monnaie et une boutique exclusives, sa bannière 50/50), et ça se déclenche tout seul à la date prévue.
   · La réserve (HEV) : un héros par saison du pass. Avant sa date, le héros n'existe pas dans le jeu ;
     pendant son événement il est « exclusif » (bannière + boutique) ; après, il rejoint l'invocation standard.
   · La monnaie : +40 par jour (à réclamer), +5 par victoire (150 par jour), +20 par expédition au Donjon des Échos.
     En jouant chaque jour, la boutique suffit pour avoir le héros gratuitement.
   · À la fin : les tickets restants et la monnaie se changent en or.
   · L'Espace créateur prévient quand la réserve est presque vide. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG&&LANG!=='fr')?en:fr;
const NOW=()=>window.__HEVNOW||Date.now();
/* traduction des textes riches : chaque morceau entre deux balises a sa traduction */
window.RDEput=window.RDEput||((fr,en)=>{try{I18N_EN[fr]=en;const sp=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));const f=sp(fr),g=sp(en);if(f.length!==g.length){console.warn('i18n',f.length,g.length,String(fr).slice(0,60));return}f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})}catch(e){}});
const HD=window.RDEHEVD||{77:{s:Date.UTC(2026,10,26,20,0),e:Date.UTC(2026,11,8,7,10)},78:{s:Date.UTC(2026,11,8,7,10),e:Date.UTC(2026,11,22,7,10)},79:{s:Date.UTC(2026,11,22,7,10),e:Date.UTC(2027,0,5,7,10)}};
/* ---------- la réserve ---------- */
const HEV=[
 {k:'lucan',hid:77,ban:'ev_lucan',sn:'Lucan',ic:'🐺',col:'#9fb0d8',col2:'#2a2f48',start:HD[77].s,end:HD[77].e,price:1000,
  cur:'Crocs de Brume',curEn:'Mist Fangs',cic:'🐾',
  ttl:{k:'ev_lucan',n:'Loup de Brume',nEn:'Mist Wolf',d:"Boutique de l'événement de Lucan",dEn:"Lucan's event shop"},frm:{k:'brume',n:'Brume des Loups',nEn:'Mist Wolves'},
  bn:'Le Loup de la Garde',bnEn:'The Wolf of the Guard',bd:"Il a ouvert la porte qu'il devait garder. Depuis, il vit dans la brume, avec les loups.",bdEn:'He opened the gate he was meant to guard. Since then he has lived in the mist, with the wolves.',
  lore:"Il était le capitaine de la <b>Garde d'Éther</b>. Une nuit, il a ouvert la porte qu'il devait garder, et la Garde est tombée. Depuis, il vit dans la brume, avec les loups. Il dit qu'il veut réparer ce qu'il a fait. <b>Perrin</b>, le Dernier de la Garde, ne l'a jamais cru.",
  loreEn:"He was the captain of the <b>Aether Guard</b>. One night he opened the door he was sworn to guard, and the Guard fell. Since then he has lived in the mist, with the wolves. He says he wants to make amends. <b>Perrin</b>, the Last of the Guard, never believed him."},
 {k:'veyra',hid:78,f:1,ban:'ev_veyra',sn:'Veyra',ic:'🗝️',col:'#7fd8ff',col2:'#1a2a40',start:HD[78].s,end:HD[78].e,price:1150,
  cur:'Clés Rouillées',curEn:'Rusty Keys',cic:'🔑',
  ttl:{k:'ev_veyra',n:'Porte-Clés',nEn:'Keybearer',d:"Boutique de l'événement de Veyra",dEn:"Veyra's event shop"},frm:{k:'milcles',n:'Mille Clés',nEn:'Thousand Keys'},
  bn:'Les Mille Clés',bnEn:'The Thousand Keys',bd:"Le soir où le Tribunal est tombé, elle a ouvert toutes les cellules. Elle ramène les évadés un par un.",bdEn:'The night the Court fell, she opened every cell. She brings the escapees back one by one.',
  lore:"Geôlière de la prison du <b>Tribunal des Lames</b>, elle a ouvert toutes les cellules le soir où le Tribunal est tombé. Innocents et monstres sont partis ensemble dans la nuit. Depuis, elle les ramène un par un, avec la clé de chaque cellule à sa ceinture. Le dernier évadé a l'air si innocent…",
  loreEn:"Jailer of the <b>Court of Blades</b> prison, she opened every cell the night the Court fell. Innocents and monsters fled together into the night. Since then she has been bringing them back one by one, with the key to each cell on her belt. The last escapee looks so innocent…"},
 {k:'ossian',hid:79,ban:'ev_ossian',sn:'Ossian',ic:'⚖️',col:'#ffd77a',col2:'#2a2010',start:HD[79].s,end:HD[79].e,price:1500,
  cur:'Sceaux du Tribunal',curEn:'Court Seals',cic:'🔏',
  ttl:{k:'ev_ossian',n:'Juge Suprême',nEn:'High Judge',d:"Boutique de l'événement d'Ossian",dEn:"Ossian's event shop"},frm:{k:'balance',n:'Balance Brisée',nEn:'Broken Scales'},
  bn:'Le Verdict',bnEn:'The Verdict',bd:"Trente ans juge suprême. Il a fermé les yeux une fois de trop ; maintenant il porte un bandeau.",bdEn:'Thirty years as high judge. He closed his eyes once too often; now he wears a blindfold.',
  lore:"Pendant trente ans, il a été le juge suprême du <b>Tribunal des Lames</b>. Il a fermé les yeux sur les duels truqués, et <b>Rouge-Garance</b> a fait tomber son Tribunal. Depuis, il porte un bandeau et répare ses verdicts un à un, poursuivi par les Juges Célestes. On lui demande maintenant de juger <b>Lucan</b>…",
  loreEn:"For thirty years he was the high judge of the <b>Court of Blades</b>. He turned a blind eye to rigged duels, and <b>Rouge-Garance</b> brought his Court down. Since then he wears a blindfold and mends his verdicts one by one, hunted by the Celestial Judges. Now he is asked to judge <b>Lucan</b>…"}];
window.RDEhevList=HEV;
const curE=()=>HEV.find(e=>NOW()>=e.start&&NOW()<e.end&&HEROES[e.hid])||null;
window.RDEhevCur=curE;
const ST=e=>{S.hev=S.hev||{};const o=S.hev[e.k]||(S.hev[e.k]={c:0,b:{},t:0});o.b=o.b||{};return o};
const cn=e=>e?(LANG==='fr'||!LANG?e.cur:e.curEn):'';
const deN=e=>(/^[AEIOUYÉÈÊaeiouyéèê]/.test(e.sn)?"d'":'de ')+e.sn;
const his=e=>e&&e.f?'her':'his',him=e=>e&&e.f?'her':'him',HER=e=>e&&e.f?'Her':'His',NEWH=e=>e&&HEROES[e.hid]&&HEROES[e.hid].r>=5?T('HÉROS MYTHIQUE','MYTHIC HERO'):e&&e.f?T('NOUVELLE HÉROÏNE','NEW HEROINE'):T('NOUVEAU HÉROS','NEW HERO');
const dk=()=>{try{return String(today())}catch(e){const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()}};
const fdate=t=>{try{return new Date(t).toLocaleDateString(LANG==='fr'||!LANG?'fr-FR':'en-GB',{day:'numeric',month:'long'})}catch(e){return''}};

/* ---------- avant, pendant, après ---------- */
function gate(){for(const e of HEV){const h=HEROES[e.hid];if(!h)continue;
  if(NOW()<e.end){h.ex=1;h.exd=T(`${e.f?'Héroïne':'Héros'} de l'événement « ${e.bn} » (jusqu'au ${fdate(e.end)}) : sa bannière et la boutique de l'événement, dans la Fête foraine.`,`Event ${e.f?'heroine':'hero'} “${e.bnEn}” (until ${fdate(e.end)}): ${his(e)} banner and the event shop, in the Fair.`)}
  else{delete h.ex;delete h.exd}}}
gate();
/* fin d'un événement : tickets et monnaie restants → or */
setTimeout(()=>{try{if(!S||!S.hev)return;let g=0;const L=[];for(const e of HEV){const o=S.hev[e.k];if(!o||o.done||NOW()<e.end)continue;
  const n=(o.c|0)+(o.t|0)*90;if(n>0){const v=n*800;g+=v;L.push(`${e.cic} ${n}`)}o.c=0;o.t=0;o.done=1}
  if(g){S.gold+=g;save();toast(T(`🎪 Fin de l'événement : ${L.join(', ')} changés en ${fmt(g)} or.`,`🎪 Event over: ${L.join(', ')} turned into ${fmt(g)} gold.`))}}catch(e){}},4000);

/* ---------- la bannière ---------- */
for(const e of HEV){if(!HEROES[e.hid])continue;const d=new Date(Math.max(e.start,Date.UTC(2026,10,27)));
  EVB[e.ban]={h:e.hid,start:d.toISOString().slice(0,10),n:e.bn,d:e.bd};BANS[e.ban]={n:e.bn,start:EVB[e.ban].start}}
{const bo=banOpen;banOpen=function(k){const e=HEV.find(x=>x.ban===k);if(e)return!!HEROES[e.hid]&&NOW()>=e.start&&NOW()<e.end;return bo.apply(this,arguments)}}
{const be=banEnd;banEnd=function(k){const e=HEV.find(x=>x.ban===k);if(e)return e.end;return be.apply(this,arguments)}}

/* ---------- gagner la monnaie ---------- */
const WCAP=150,WIN=5,DGV=20,DAY=40;
function earn(e,n,capped){const o=ST(e);if(capped){const d=dk();if(!o.w||o.w.d!==d)o.w={d,n:0};n=Math.min(n,WCAP-o.w.n);if(n<=0)return 0;o.w.n+=n}o.c=(o.c|0)+n;return n}
{const fi=finish;finish=function(res){let live=false;try{live=typeof B!=='undefined'&&B&&!B.done&&!B.skipEv}catch(e){}
  const r=fi.apply(this,arguments);
  try{const e=curE();if(e&&live&&res===true){const n=earn(e,WIN,true);if(n){save();const rw=document.querySelector('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend',`<span class="hevrw">${e.cic} ${n} ${esc(cn(e))}</span>`)}}}catch(e){}
  return r}}
if(typeof dgEnd==='function'){const de=dgEnd;dgEnd=function(win,rw){let had=false;try{had=!!DG().run}catch(e){}const out=de.apply(this,arguments);
  try{const e=curE();if(e&&had){const n=earn(e,DGV,false);if(n){save();const t=`${e.cic} ${n} ${cn(e)}`;if(Array.isArray(out))out.push(t)}}}catch(e){}return out}}

/* ---------- la boutique ---------- */
const own=e=>!!(S.heroes&&S.heroes[e.hid]);
function items(e){const o=ST(e),h=HEROES[e.hid],nm=h?h.n.split(/[ ,]/)[0]:e.sn;
  const L=[];
  if(!own(e))L.push({k:'hero',ic:'✨',n:T(`${nm} rejoint ton équipe`,`${nm} joins your team`),d:T(e.f?"L'héroïne complète, niveau 1.":'Le héros complet, niveau 1.',e.f?'The full heroine, level 1.':'The full hero, level 1.'),c:e.price,lim:1,big:1,
    give:()=>{S.heroes[e.hid]={l:1,e:0,f:0};try{news(Date.now(),`${S.name||'Voyageur'} a été rejoint par ${h.n}.`)}catch(er){}return T(`✨ ${h.n} rejoint ton équipe !`,`✨ ${h.n} joins your team!`)}});
  else L.push({k:'frag',ic:'🧩',n:T(`15 fragments de ${nm}`,`15 ${nm} fragments`),d:T("Pour ses étoiles et son éveil.",`For ${his(e)} stars and awakening.`),c:220,lim:4,
    give:()=>{S.heroes[e.hid].f=(S.heroes[e.hid].f||0)+15;return T(`🧩 +15 fragments de ${nm}`,`🧩 +15 ${nm} fragments`)}});
  L.push({k:'tix',ic:'🎟️',n:T('Ticket de sa bannière','Banner ticket'),d:T('Une invocation gratuite sur sa bannière.','One free pull on his banner.'),c:90,lim:10,give:()=>{o.t=(o.t|0)+1;return T('🎟️ +1 ticket de bannière','🎟️ +1 banner ticket')}});
  L.push({k:'frame',ic:'🖼️',n:T(`Cadre « ${e.frm.n} »`,`Frame “${e.frm.nEn}”`),d:T('Pour ta photo de profil.','For your profile picture.'),c:300,lim:1,
    give:()=>{S.evFrames=S.evFrames||[];if(!S.evFrames.includes(e.frm.k))S.evFrames.push(e.frm.k);return T(`🖼️ Nouveau cadre : « ${e.frm.n} »`,`🖼️ New frame: “${e.frm.nEn}”`)}});
  L.push({k:'title',ic:'🏷️',n:T(`Titre « ${e.ttl.n} »`,`Title “${e.ttl.nEn}”`),d:T('À afficher sur ton profil.','To show on your profile.'),c:250,lim:1,give:()=>{o.b.title=1;S.titles=S.titles||[];if(!S.titles.includes(e.ttl.k))S.titles.push(e.ttl.k);return T(`🏷️ Nouveau titre : « ${e.ttl.n} » (à choisir sur ton profil)`,`🏷️ New title: “${e.ttl.nEn}” (pick it on your profile)`)}});
  L.push({k:'shard',ic:'💠',n:T('1 éclat légendaire','1 legendary shard'),d:'',c:130,lim:3,give:()=>{S.shards=(S.shards||0)+1;return'💠 +1'}});
  L.push({k:'gems',ic:'💎',n:T('60 gemmes','60 gems'),d:'',c:70,lim:6,give:()=>{S.gems+=60;return'💎 +60'}});
  L.push({k:'gold',ic:'🪙',n:T('150 000 or','150,000 gold'),d:'',c:40,lim:10,give:()=>{S.gold+=150000;return'🪙 +150 k'}});
  return L}
for(const e of HEV){try{TITLES.push({k:e.ttl.k,n:e.ttl.n,c:e.col,d:e.ttl.d,ok:()=>!!(S.hev&&S.hev[e.k]&&S.hev[e.k].b&&S.hev[e.k].b.title)})}catch(er){}
  try{FRAMES[e.frm.k]=e.frm.n;FHINT[e.frm.k]=T(`Boutique de l'événement ${deN(e)}`,`${e.sn}'s event shop`)}catch(er){}
  try{Object.assign(I18N_EN,{[e.frm.n]:e.frm.nEn,[e.ttl.n]:e.ttl.nEn,[e.ttl.d]:e.ttl.dEn,[e.bn]:e.bnEn,[e.bd]:e.bdEn,[e.cur]:e.curEn})}catch(er){}}

/* ---------- la page ---------- */
const scene=e=>{try{return heroBody(HEROES[e.hid],0)}catch(er){return''}};
function hevPage(){const e=curE();if(!e)return`<div class="card"><p class="muted">${T("Pas d'événement de héros en ce moment.",'No hero event right now.')}</p></div>`;
  const o=ST(e),h=HEROES[e.hid],left=e.end-NOW(),dOk=o.d!==dk(),w=(o.w&&o.w.d===dk())?o.w.n:0;
  const nx=HEV.find(x=>x.start>=e.end);
  const shop=items(e).map(it=>{const n=o.b[it.k]|0,rest=it.lim-n,can=rest>0&&(o.c|0)>=it.c;
    return`<div class="hevit${it.big?' big':''}${rest<=0?' done':''}"><span class="hic">${it.ic}</span><div class="hin"><b>${esc(it.n)}</b>${it.d?`<small>${esc(it.d)}</small>`:''}<small class="hlim">${rest>0?T(`Encore ${rest}`,`${rest} left`):T('Épuisé','Sold out')}</small></div>
      <button class="btn ${it.big?'p':'g'} sm" data-a="hevbuy" data-v="${it.k}" ${can?'':'disabled'}>${e.cic} ${fmt(it.c)}</button></div>`}).join('');
  return`<div class="stack hevp" style="--hc:${e.col};--hc2:${e.col2}">
  <div class="card hevhero"><div class="hevfig">${scene(e)}</div><div class="hevtx"><span class="hevtag">${e.ic} ${NEWH(e)} · ${T('ÉVÉNEMENT LIMITÉ','LIMITED EVENT')}</span>
    <div class="h">${esc(h.n)}</div><p class="hevlore">${LANG==='fr'||!LANG?e.lore:e.loreEn}</p>
    <p class="hevend">⏳ ${T('Se termine dans','Ends in')} <b>${dur(left)}</b> · ${T('le','on')} ${fdate(e.end)}</p></div></div>
  <div class="card hevcur"><div class="hevamt"><span>${e.cic}</span><b class="num">${fmt(o.c|0)}</b><small>${esc(cn(e))}</small></div>
    <div class="hevways"><button class="btn ${dOk?'p':''} sm" data-a="hevday" ${dOk?'':'disabled'}>${dOk?`🎁 +${DAY} ${T("aujourd'hui",'today')}`:T('✓ Récupéré aujourd\'hui','✓ Claimed today')}</button>
      <span>⚔️ +${WIN} ${T('par victoire','per win')} (${w}/${WCAP} ${T("aujourd'hui",'today')})</span><span>🏰 +${DGV} ${T('par expédition au Donjon des Échos','per Echo Dungeon run')}</span></div></div>
  <div class="card"><div class="h3">🛒 ${T('Boutique de l\'événement','Event shop')}</div><p class="muted" style="margin:2px 0 8px">${T(`En jouant chaque jour, tu peux t'offrir ${esc(h.n.split(/[ ,]/)[0])} gratuitement.`,`Play every day and you can get ${esc(h.n.split(/[ ,]/)[0])} for free.`)}</p><div class="hevshop">${shop}</div></div>
  <div class="card hevban"><div><div class="h3" style="margin:0">✨ ${T('Sa bannière',HER(e)+' banner')} : « ${esc(T(e.bn,e.bnEn))} »</div><p class="muted">${T('50/50 puis garanti, jusqu\'à la fin de l\'événement.','50/50 then guaranteed, until the event ends.')}${o.t?` ${T('Tu as','You have')} <b>${o.t}</b> 🎟️.`:''}</p></div>
    <div class="row">${o.t?`<button class="btn g sm" data-a="hevtix" data-v="1">🎟️ ×1</button>${o.t>=10?`<button class="btn g sm" data-a="hevtix" data-v="10">🎟️ ×10</button>`:''}`:''}<button class="btn sm" data-a="hevgo">${T('Voir la bannière','See the banner')} →</button></div></div>
  ${nx?`<div class="card hevnext"><span>🔒</span><p>${T('Prochain héros','Next hero')} : <b>${T('le','on')} ${fdate(nx.start)}</b>. ${T('Une nouvelle histoire commence à chaque saison.','A new story begins every season.')}</p></div>`:''}
  </div>`}
window.hevPage=hevPage;
function intro(e){const o=ST(e);if(o.seen)return;o.seen=1;save();const h=HEROES[e.hid];
  try{modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="hevintro" style="--hc:${e.col};--hc2:${e.col2}"><div class="hevfig big">${scene(e)}</div>
    <span class="hevtag">${e.ic} ${NEWH(e)}</span><div class="h">${esc(h.n)}</div><p class="hevlore">${LANG==='fr'||!LANG?e.lore:e.loreEn}</p>
    <p class="muted" style="font-size:12.5px">${T(`Jusqu'au ${fdate(e.end)} : gagne des ${cn(e)} ${e.cic} pour l'obtenir gratuitement dans la boutique, ou tente sa bannière.`,`Until ${fdate(e.end)}: earn ${cn(e)} ${e.cic} to get ${him(e)} for free in the shop, or try ${his(e)} banner.`)}</p>
    <button class="btn p" data-a="close" style="width:100%">${T("Découvrir l'événement",'Discover the event')}</button></div>`)}catch(er){}}

/* ---------- dans la Fête foraine ---------- */
const bld=()=>{const e=curE();const c=e?e.col:'#9fb0d8',c2=e?e.col2:'#2a2f48',ic=e?e.ic:'✨';
  return`<g><path d="M-40 0V-44L0 -80L40 -44V0Z" fill="${c2}" stroke="${typeof LBO!=='undefined'?LBO:'#140c24'}" stroke-width="1.6"/><path d="M-40 -44L0 -80L40 -44" fill="none" stroke="${c}" stroke-width="2.4"/>
   <path d="M-18 0V-30Q0 -46 18 -30V0Z" fill="${c}" opacity=".35"><animate attributeName="opacity" values=".25;.55;.25" dur="2.6s" repeatCount="indefinite"/></path>
   <text x="0" y="-52" text-anchor="middle" font-size="20">${ic}</text><path d="M0 -80V-96" stroke="${c}" stroke-width="1.6"/><path d="M0 -96L14 -91L0 -86Z" fill="${c}"/></g>`};
try{evB.hev={b:bld,sn:'Nouveau héros',ic:'✨',n:'Tente du nouveau héros',d:'Événement limité',bh:100}}catch(e){}
{const et=evTabs;evTabs=function(){const a=et.apply(this,arguments);try{const e=curE();if(e&&!a.some(x=>x[0]==='hev')){
  const o=ST(e),b=o.d!==dk()?'!':0;try{evB.hev.ic=e.ic;evB.hev.sn=e.sn;evB.hev.n=T(`L'événement ${deN(e)}`,`${e.sn}'s event`);evB.hev.d=T(e.f?'Nouvelle héroïne · boutique et bannière':'Nouveau héros · boutique et bannière',e.f?'New heroine · shop and banner':'New hero · shop and banner')}catch(er){}
  a.splice(Math.min(1,a.length),0,['hev',`${e.ic} ${e.sn}`,b])}}catch(e){}return a}}
{const pe=pEvents;pEvents=function(){try{const e=curE();if(e&&UI.lz&&UI.lz.event==='hev'){setTimeout(()=>{try{intro(e)}catch(er){}},250);
  return`<div class="stack">${zoneBar('event','hev')}${hevPage()}</div>`}}catch(er){}return pe.apply(this,arguments)}}

/* ---------- les boutons ---------- */
document.addEventListener('click',ev=>{const b=ev.target.closest&&ev.target.closest('[data-a^="hev"]');if(!b)return;const a=b.dataset.a;
  if(!['hevbuy','hevday','hevtix','hevgo'].includes(a))return;ev.preventDefault();ev.stopImmediatePropagation();
  const e=curE();if(!e)return;const o=ST(e);
  if(a==='hevday'){if(o.d===dk())return;o.d=dk();o.c=(o.c|0)+DAY;save();toast(`${e.cic} +${DAY} ${cn(e)}`);render();return}
  if(a==='hevgo'){TAB='invoc';UI.iv='invoc';UI.ban=e.ban;try{render();scrollTo(0,0)}catch(er){}return}
  if(a==='hevtix'){const n=+b.dataset.v;if((o.t|0)<n||!banOpen(e.ban))return;o.t-=n;save();TAB='invoc';UI.iv='invoc';UI.ban=e.ban;try{scrollTo(0,0)}catch(er){}try{pullX(n,{pay:'evt',ban:e.ban})}catch(er){console.warn(er)}
    try{render()}catch(er){}return}
  if(a==='hevbuy'){const it=items(e).find(x=>x.k===b.dataset.v);if(!it)return;const n=o.b[it.k]|0;if(n>=it.lim||(o.c|0)<it.c)return;
    o.c-=it.c;o.b[it.k]=n+1;const msg=it.give();save();try{ttCheck()}catch(er){}toast(msg);try{TPX={t:0,v:0}}catch(er){}render()}},true);

/* ---------- l'annonce ---------- */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{const e=curE();if(e&&!L.some(a=>a.k==='hev_'+e.k))L.splice(Math.min(1,L.length),0,{k:'hev_'+e.k,ac:e.col,tag:NEWH(e),t:`${e.ic} ${HEROES[e.hid].n}`,
  x:(LANG==='fr'||!LANG?e.lore:e.loreEn)+'<br><br>'+T(`Son événement est ouvert jusqu'au <b>${fdate(e.end)}</b> dans la Fête foraine : une boutique pour l'avoir gratuitement en jouant, et sa bannière.`,`${HER(e)} event is open until <b>${fdate(e.end)}</b> in the Fair: a shop to get ${him(e)} for free by playing, and ${his(e)} banner.`),
  art:()=>`<div class="skann">${scene(e)}</div>`,go:T("🎪 Voir l'événement",'🎪 See the event'),fn:()=>{TAB='event';try{UI.lz=UI.lz||{};UI.lz.event='hev'}catch(er){}UI.evt='hev'}})}catch(e){}return L}}catch(e){}

/* ---------- l'Espace créateur : la réserve ---------- */
function resNote(){const fut=HEV.filter(e=>e.start>NOW()),last=HEV[HEV.length-1];
  if(fut.length>1)return'';
  const txt=fut.length?`⚠️ Plus qu'<b>un héros en réserve</b> (${esc(fut[0].sn)}, le ${fdate(fut[0].start)}). Demande la suite à Claude pour qu'une saison ne reste pas sans nouveau héros.`
    :`⚠️ <b>Plus aucun héros en réserve</b> après le ${fdate(last.end)}. Demande à Claude de préparer les prochains.`;
  return`<div class="hevres">${txt}</div>`}
try{const ovl=document.getElementById('ovl');if(ovl)new MutationObserver(()=>{try{const m=ovl.querySelector('.modal');if(!m||m.querySelector('.hevres'))return;const h=m.querySelector('.h');
  if(h&&/Espace créateur|Creator space/.test(h.textContent)){const n=resNote();if(n)h.insertAdjacentHTML('afterend',n)}}catch(e){}}).observe(ovl,{childList:true,subtree:true})}catch(e){}

/* ---------- styles ---------- */
const fr=(k,c1,c2,c3)=>`.fav.frm-${k}{--fd:#0a0c18;--gc:${c1}}
.fav.frm-${k}::before{background:linear-gradient(160deg,rgba(255,255,255,.4),transparent 42%,rgba(0,0,0,.32)),repeating-conic-gradient(from var(--fa),${c1} 0 10deg,${c2} 10deg 22deg,${c3} 22deg 28deg,${c2} 28deg 40deg);animation:fspin 8s linear infinite}`;
try{const st=document.createElement('style');st.id='v458css';st.textContent=`
.hevp .hevhero{display:flex;gap:12px;align-items:center;border-color:var(--hc)!important;background:radial-gradient(130% 120% at 0% 0%,color-mix(in srgb,var(--hc) 22%,transparent),transparent 60%),var(--panel)!important}
.hevfig{flex:0 0 112px;height:170px;display:flex;align-items:flex-end;justify-content:center}.hevfig svg{height:100%;width:auto}
.hevfig.big{height:220px;margin:0 auto 6px;flex:none}
.hevtx{min-width:0}.hevtag{display:inline-block;font-size:10.5px;font-weight:900;letter-spacing:.6px;padding:3px 8px;border-radius:999px;background:var(--hc);color:#140c24}
.hevtx .h,.hevintro .h{margin:6px 0 4px}.hevlore{font-size:13px;line-height:1.45;margin:0 0 6px}.hevend{font-size:12.5px;color:var(--muted);margin:0}
.hevcur{display:flex;gap:12px;align-items:center;flex-wrap:wrap}.hevamt{display:flex;flex-direction:column;align-items:center;min-width:86px}
.hevamt span{font-size:26px}.hevamt b{font-size:22px}.hevamt small{font-size:11px;color:var(--muted);text-align:center}
.hevways{display:flex;flex-direction:column;gap:5px;flex:1;min-width:180px;font-size:12.5px;color:var(--muted)}.hevways .btn{align-self:flex-start}
.hevshop{display:grid;grid-template-columns:repeat(auto-fill,minmax(230px,1fr));gap:8px}
.hevit{display:flex;gap:8px;align-items:center;padding:8px 10px;border-radius:12px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1)}
.hevit.big{grid-column:1/-1;border-color:var(--hc);background:color-mix(in srgb,var(--hc) 14%,transparent)}.hevit.done{opacity:.5}
.hevit .hic{font-size:24px}.hevit .hin{flex:1;min-width:0;display:flex;flex-direction:column}.hevit .hin small{font-size:11.5px;color:var(--muted)}.hevit .hlim{opacity:.8}
.hevban{display:flex;flex-wrap:wrap;gap:8px;align-items:center;justify-content:space-between}.hevban .muted{margin:2px 0 0;font-size:12.5px}
.hevnext{display:flex;gap:10px;align-items:center;opacity:.85}.hevnext span{font-size:22px}.hevnext p{margin:0;font-size:13px}
.hevintro{text-align:center}.hevintro .hevlore{text-align:left}
.hevres{margin:6px 0 10px;padding:9px 11px;border-radius:12px;background:rgba(255,200,80,.12);border:1px solid rgba(255,200,80,.4);font-size:13px}
.hevrw{color:#ffe7a8}
${fr('brume','#c8d2f4','#262c48','#ffe07a')}
${fr('milcles','#7fd8ff','#14243a','#c8a24a')}
${fr('balance','#ffd77a','#2a1a0a','#c83a4a')}
`;document.head.appendChild(st)}catch(e){}
}catch(e){console.warn('v458',e)}})();
