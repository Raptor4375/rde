
/* ================= V453 : LE DONJON DES ÉCHOS 2.0 =================
   Pourquoi personne n'y allait : 18 salles d'un coup, et tout se gagnait seulement à la toute fin.
   - Deux descentes : complète (3 étages, 18 salles) ou rapide (1 étage, 6 salles). Chacune coûte une clé.
   - Un coffre à chaque gardien d'étage (gemmes + échos gardés), même si l'expédition s'arrête après.
   - La moitié des échos qui restent à la sortie est gardée pour la Boutique des Échos (en plus des gemmes et de l'or habituels).
   - La Boutique des Échos : le familier exclusif « Écho », un cadre, un titre, un fond de profil, et des objets utiles.
   - Une malédiction par semaine : une règle spéciale, avec un bonus. */
(function(){try{
if(typeof DG!=='function'||typeof dgEnd!=='function'||typeof dgPage!=='function')return;
const EN={};
/* les traductions : texte par texte (sans les balises), nombres remplacés par #, enregistrées tout de suite */
const sp=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));
const put=(fr,en)=>{try{const f=sp(fr),g=sp(en);if(f.length!==g.length)return;f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})}catch(e){}};
const tr=(fr,en)=>{if(en&&!(fr in EN)){EN[fr]=en;put(fr,en)}return fr};
const nfmt=n=>(+n).toLocaleString('fr-FR');

/* ---------- la malédiction de la semaine ---------- */
const DGC=[
 {k:'faim',ic:'🍖',n:tr('Ombres affamées','Starving Shadows'),d:tr("Les ennemis ont +20 % d'ATQ. Échos +35 %.",'Enemies have +20% ATK. Echoes +35%.'),atk:.2,echo:.35},
 {k:'sang',ic:'🩸',n:tr('Écho sanglant','Bloody Echo'),d:tr('Tes héros perdent 6 % de PV après chaque combat. Échos +50 %.','Your heroes lose 6% HP after each fight. Echoes +50%.'),drain:.06,echo:.5},
 {k:'riche',ic:'💰',n:tr('Marchand généreux','Generous Merchant'),d:tr('Le marchand des ombres fait −35 %. Les élites ont +30 % de PV.','The shadow merchant gives −35%. Elites have +30% HP.'),shop:.65,elite:.3},
 {k:'colere',ic:'💀',n:tr('Gardiens en colère','Angry Guardians'),d:tr("Les gardiens d'étage ont +25 % de PV et d'ATQ, mais leurs coffres valent double.",'Floor guardians have +25% HP and ATK, but their chests are worth double.'),boss:.25,chest:2},
 {k:'vif',ic:'⚡',n:tr('Vitesse folle','Mad Speed'),d:tr('Tout le monde a +20 % de vitesse. Échos +25 %.','Everyone has +20% speed. Echoes +25%.'),spd:.2,echo:.25},
 {k:'reliq',ic:'🔮',n:tr('Reliques capricieuses','Fickle Relics'),d:tr('Les reliques rares et légendaires sortent bien plus souvent, mais les ennemis ont +15 % de PV.','Rare and legendary relics show up much more often, but enemies have +15% HP.'),rel:1,hp:.15}];
const curse=()=>{const w=weekKey(Date.now());return DGC[((w%DGC.length)+DGC.length)%DGC.length]};
const curseLeft=()=>{const wk=weekKey(Date.now());let t=Date.now();while(weekKey(t)===wk)t+=36e5;return t-Date.now()};
window.dgCurse=curse;
function XB(){const X=DG();if(X.bank==null)X.bank=0;X.own=X.own||{};X.sw=X.sw||{};X.sd=X.sd||{};const wk=weekKey(Date.now()),d=today();if(X.sw.wk!==wk)X.sw={wk,n:{}};if(X.sd.d!==d)X.sd={d,n:{}};return X}

/* les monstres et les héros sous la malédiction */
{const eb=evBattle;evBattle=function(){const go=DGX.go;const r=eb.apply(this,arguments);try{if(go&&DGX.active&&r&&r.foes){const C=curse(),R=dgRun(),nd=DGX.node,t=R.maps[R.fl][nd[0]][nd[1]].t;
  for(const f of r.foes){let hp=1+(C.hp||0),atk=1+(C.atk||0);if(C.elite&&t==='elite')hp*=1+C.elite;if(C.boss&&t==='boss'){hp*=1+C.boss;atk*=1+C.boss}
   if(C.spd)f.spd=Math.round((f.spd||100)*(1+C.spd));f.max=Math.round(f.max*hp);f.hp=f.max;f.atk=Math.round(f.atk*atk)}
  r.sub=(r.sub||'')+(R.quick?' · ⚡ '+tr('rapide','quick'):'')}}catch(e){}return r}}
{const am=applyMeta;applyMeta=function(units,mk){const r=am.apply(this,arguments);try{const C=curse();if(DGX.active&&C.spd)for(const u of units)if(u.side===0&&u.hid!=null)u.spd=Math.round(u.spd*(1+C.spd))}catch(e){}return r}}
{const de=dgEcho;dgEcho=function(n){const C=curse();return de.call(this,Math.round(n*(1+(C.echo||0))))}}
{const ds=dgShop;dgShop=function(){try{const R=dgRun(),C=curse();if(R&&R.shop&&C.shop)for(const x of R.shop)if(!x.cz){x.c=Math.round(x.c*C.shop);x.cz=1}}catch(e){}return ds.apply(this,arguments)}}
{const rc=dgRelChoices;dgRelChoices=function(minR=0){const C=curse();if(!C.rel)return rc.apply(this,arguments);const R=dgRun();const n=dgHas('carte')?4:3;const P=RELICS.filter(r=>!R.rel.includes(r.k)&&r.r>=Math.min(minR,2)-1);const out=[];
  while(out.length<n&&P.length){const w=P.map(r=>[2,4,4][r.r]+(r.r>=minR?2:0));const t=w.reduce((a,b)=>a+b,0);let x=Math.random()*t,j=0;for(;j<P.length;j++){x-=w[j];if(x<=0)break}out.push(P.splice(Math.min(j,P.length-1),1)[0].k)}return out}}

/* ---------- coffres d'étage, descente rapide, échos gardés ---------- */
const CHEST=[[40,15],[70,25],[110,40]];
function quickEnd(rw){const X=DG(),R=X.run;if(!R)return rw;rw=rw.filter(x=>!/^⬇️/.test(String(x)));const n0=news;news=function(){};let out=rw;try{out=dgEnd(false,rw)||rw}finally{news=n0}
  const g=60;S.gems+=g;out.push(`⚡ ${tr('Bonus de descente rapide','Quick descent bonus')} : ${GEM}${g} ${tr('gemmes','gems')}`);X.qwins=(X.qwins||0)+1;if(X.last){X.last.quick=1}save();
  try{news(Date.now(),`${S.name||'Voyageur'} a réussi une descente rapide dans le Donjon des Échos.`)}catch(e){}return out}
{const ef=evFinish;evFinish=function(dmg,rw){if(!DGX.active)return ef.apply(this,arguments);
  const R0=dgRun(),nd=DGX.node;let t=null,fl0=0,quick=false;try{t=R0.maps[R0.fl][nd[0]][nd[1]].t;fl0=R0.fl;quick=!!R0.quick}catch(e){}
  let res=ef.apply(this,arguments);
  try{const win=res!=='Défaite dans le donjon',C=curse(),X=XB();
   if(win&&t==='boss'){const k=C.chest||1,[g,e]=CHEST[fl0]||CHEST[0];S.gems+=g*k;X.bank+=e*k;X.earned=(X.earned||0)+e*k;
     rw.push(`🎁 ${tr("Coffre de l'étage",'Floor chest')} ${fl0+1} : ${GEM}${g*k} ${tr('gemmes','gems')} · 🔮 ${e*k} ${tr('échos gardés','echoes kept')}`);
     if(quick&&fl0===0&&dgRun()){const out=quickEnd(rw);rw.length=0;out.forEach(x=>rw.push(x));res=tr('Descente rapide réussie !','Quick descent cleared!')}}
   else if(win&&C.drain&&dgRun()){dgHurtAll(C.drain);rw.push(`${C.ic} −${Math.round(C.drain*100)} % ${tr('PV pour tes héros (malédiction)','HP for your heroes (curse)')}`)}
   save()}catch(e){console.warn('donjon 2',e)}
  return res}}
{const de=dgEnd;dgEnd=function(win,rw){const X=XB(),R=X.run;const e=R?R.echo:0;const out=de.apply(this,arguments);
  try{if(R){const keep=Math.round(e*.5);X.bank+=keep;X.earned=(X.earned||0)+keep;if(keep>0)(out||rw||[]).push(`🔮 ${keep} ${tr('échos gardés pour la Boutique des Échos','echoes kept for the Echo Shop')}`);save()}}catch(er){}return out}}
function startRun(quick){const X=DG();if(X.run)return;dgStart();const R=dgRun();if(R&&quick){R.quick=1;save();render();toast(tr('⚡ Descente rapide : un seul étage, 6 salles !','⚡ Quick descent: one floor, 6 rooms!'))}}

/* ---------- la Boutique des Échos ---------- */
const PET=()=>{try{return window.RDEpetState().own.echo||null}catch(e){return null}};
const SHOP=[
 {k:'pet',ic:'🦇',n:tr('Familier « Écho »','“Echo” familiar'),d:tr("Familier légendaire exclusif : il fond sur l'ennemi le plus affaibli et soigne ton héros le plus blessé.",'Exclusive legendary familiar: swoops on the weakest enemy and heals your most wounded hero.'),c:6000,ok:()=>!PET(),done:()=>!!PET()},
 {k:'star',ic:'⭐',n:tr("Étoile d'Écho",'Echo Star'),d:tr('+1 étoile pour ton familier Écho (5 au maximum).','+1 star for your Echo familiar (5 max).'),c:2500,ok:()=>{const p=PET();return!!p&&p.s<5},need:()=>PET()?'':tr('Il faut d\'abord le familier Écho','You need the Echo familiar first')},
 {k:'pbg',ic:'🌌',n:tr('Fond « Donjon des Échos »','“Echo Dungeon” background'),d:tr('Un fond de profil animé : la porte du donjon et ses chauves-souris.','An animated profile background: the dungeon gate and its bats.'),c:2500,once:1},
 {k:'frame',ic:'🖼️',n:tr('Cadre « Écho du Donjon »','“Dungeon Echo” frame'),d:tr('Un cadre de profil violet et argent, avec des ondes qui tournent.','A violet and silver profile frame with turning waves.'),c:2000,once:1},
 {k:'title',ic:'🏷️',n:tr('Titre « Seigneur des Échos »','“Lord of Echoes” title'),d:tr('À afficher sous ton pseudo.','To show under your name.'),c:1500,once:1},
 {k:'key',ic:'🗝️',n:tr('Clé du donjon','Dungeon key'),d:tr("Une descente de plus aujourd'hui (1 par jour).",'One more descent today (1 per day).'),c:300,day:1},
 {k:'ush',ic:'🌟',n:tr("Éclat d'ultra-évolution",'Ultra-evolution shard'),d:tr('3 par semaine.','3 per week.'),c:700,week:3},
 {k:'shards',ic:'💎',n:tr('3 éclats légendaires','3 legendary shards'),d:tr('3 fois par semaine.','3 times per week.'),c:500,week:3},
 {k:'egg',ic:'🥚',n:tr('Œuf épique','Epic egg'),d:tr('2 par semaine.','2 per week.'),c:900,week:2},
 {k:'ber',ic:'🫐',n:tr('40 baies','40 berries'),d:tr('Pour nourrir tes familiers (5 fois par semaine).','To feed your familiars (5 times per week).'),c:250,week:5}];
const owned=k=>!!XB().own[k];
function canBuy(it){const X=XB();if(it.once&&owned(it.k))return false;if(it.ok&&!it.ok())return false;if(it.week&&(X.sw.n[it.k]||0)>=it.week)return false;if(it.day&&(X.sd.n[it.k]||0)>=it.day)return false;return true}
function stateTxt(it){const X=XB();if(it.done&&it.done())return tr('✔ Obtenu','✔ Owned');if(it.once&&owned(it.k))return tr('✔ Obtenu','✔ Owned');if(it.need&&it.need())return it.need();
  if(it.week)return`${it.week-(X.sw.n[it.k]||0)}/${it.week} ${tr('cette semaine','this week')}`;if(it.day)return`${it.day-(X.sd.n[it.k]||0)}/${it.day} ${tr("aujourd'hui",'today')}`;if(it.k==='star'){const p=PET();return p?`★ ${p.s}/5`:''}return''}
function give(it){const X=XB();
  if(it.k==='pet'||it.k==='star'){const r=window.RDEpetGive&&window.RDEpetGive('echo');return r?(r.kind==='new'?tr('🦇 Écho rejoint ta Ménagerie !','🦇 Echo joins your Menagerie!'):r.kind==='star'?`⭐ Écho : ${r.s} ★`:`🫐 +${r.b}`):''}
  if(it.k==='pbg'){X.own.pbg=1;try{cosGive('bg','donjon')}catch(e){S.pbgs=S.pbgs||[];if(!S.pbgs.includes('donjon'))S.pbgs.push('donjon')}return tr('🌌 Nouveau fond de profil !','🌌 New profile background!')}
  if(it.k==='frame'){X.own.frame=1;S.evFrames=S.evFrames||[];if(!S.evFrames.includes('echodg'))S.evFrames.push('echodg');return tr('🖼️ Nouveau cadre : « Écho du Donjon » !','🖼️ New frame: “Dungeon Echo”!')}
  if(it.k==='title'){X.own.title=1;try{ttCheck()}catch(e){}return tr('🏷️ Titre « Seigneur des Échos » débloqué !','🏷️ “Lord of Echoes” title unlocked!')}
  if(it.k==='key'){X.keys=(X.keys||0)+1;return tr('🗝️ +1 clé du donjon','🗝️ +1 dungeon key')}
  if(it.k==='ush'){S.ush=(S.ush||0)+1;return tr("🌟 +1 éclat d'ultra-évolution",'🌟 +1 ultra-evolution shard')}
  if(it.k==='shards'){S.shards+=3;return tr('💎 +3 éclats légendaires','💎 +3 legendary shards')}
  if(it.k==='egg'){try{const p=window.RDEpetState();p.eggs.push({id:p.nid++,r:2})}catch(e){}return tr('🥚 Un œuf épique est dans ta Ménagerie !','🥚 An epic egg is in your Menagerie!')}
  if(it.k==='ber'){try{window.RDEpetState().b+=40}catch(e){}return tr('🫐 +40 baies','🫐 +40 berries')}return''}
function buy(k,ok){const it=SHOP.find(x=>x.k===k),X=XB();if(!it||!canBuy(it))return;if(X.bank<it.c)return toast(tr("Pas assez d'échos… Descends dans le donjon pour en gagner !",'Not enough echoes… Go down into the dungeon to earn some!'));
  if(it.c>=1500&&!ok)return modal(`<div class="dgroom shop"><div class="dgri big">${it.ic}</div><div class="h">${esc(it.n)}</div><p class="sub">${esc(it.d)}</p><p class="sub"><span>${tr('Prix','Price')}</span> <b>🔮 ${nfmt(it.c)}</b> · <span>${tr('tu as','you have')}</span> <b>🔮 ${nfmt(X.bank)}</b></p><div class="row" style="gap:8px"><button class="btn" data-a="close">${tr('Annuler','Cancel')}</button><button class="btn p" data-a="dgsbuyok" data-v="${k}">${tr('Acheter','Buy')}</button></div></div>`);
  X.bank-=it.c;if(it.week)X.sw.n[k]=(X.sw.n[k]||0)+1;if(it.day)X.sd.n[k]=(X.sd.n[k]||0)+1;const msg=give(it);save();try{closeModal()}catch(e){}render();toast(msg||tr('Acheté !','Bought!'))}
function shopCard(){const X=XB();const img=k=>{try{return window.RDEpetImg('echo',1)}catch(e){return''}};
  const tiles=SHOP.map(it=>{const can=canBuy(it),aff=X.bank>=it.c,st=stateTxt(it),own=(it.done&&it.done())||(it.once&&owned(it.k));
    return`<button class="dgsi ${it.k==='pet'?'big':''} ${own?'own':''}" data-a="dgsbuy" data-v="${it.k}" ${can&&aff?'':'aria-disabled="true"'} ${can?'':'disabled'}>${it.k==='pet'?`<img class="dgspet" src="${img()}" alt="">`:`<span class="dgsic">${it.ic}</span>`}<b>${esc(it.n)}</b><small>${esc(it.d)}</small><span class="dgsp ${aff||own?'':'no'}">${own?st:`🔮 ${nfmt(it.c)}`}</span>${!own&&st?`<em>${esc(st)}</em>`:''}</button>`}).join('');
  return`<div class="card dgshop"><div class="row" style="justify-content:space-between;align-items:center"><div class="h3" style="margin:0">🛒 <span>${tr('Boutique des Échos','Echo Shop')}</span></div><b class="dgbank">🔮 ${nfmt(X.bank)}</b></div>
   <p class="muted" style="font-size:12.5px;margin:4px 0 8px">${tr("Tu gardes des échos à chaque coffre d'étage, et la moitié de ceux qui te restent à la sortie.",'You keep echoes from every floor chest, plus half of what you still have when you leave.')}</p><div class="dgsgrid">${tiles}</div></div>`}
function curseCard(){const C=curse();return`<div class="card dgcurse"><div class="dgcic">${C.ic}</div><div style="min-width:0"><small>${tr('MALÉDICTION DE LA SEMAINE','CURSE OF THE WEEK')}</small><b>${esc(C.n)}</b><p>${esc(C.d)}</p><small class="muted"><span>${tr('Change dans','Changes in')}</span> <span>${dur(curseLeft())}</span></small></div></div>`}

/* ---------- la page ---------- */
{const dp=dgPage;dgPage=function(){let h=dp.apply(this,arguments);try{const X=XB(),R=X.run,C=curse();
  if(!R){h=h.replace('data-a="dgrules"','data-a="dgrules2"');h=h.replace(/<button class="btn p" data-a="dgstart"([^>]*)>[^<]*<\/button>/,(m,attrs)=>`<button class="btn p" data-a="dgmode"${attrs}>🕯️ ${tr('Descendre dans le donjon','Go down into the dungeon')}</button>`);
    h=h.replace('<div class="dgstats">',`<div class="dgstats"><div><b>🔮 ${nfmt(X.bank)}</b><small>${tr('échos gardés','echoes kept')}</small></div>`);
    if(X.last&&X.last.quick)h=h.replace(/Dernière expédition : [^·]*·/,`Dernière expédition : ⚡ ${tr('descente rapide réussie','quick descent cleared')} ·`);
    h=h.replace(/<div class="card"><div class="h3" style="margin:0">💎 Récompenses<\/div>[\s\S]*?<\/p><\/div>/,`<div class="card"><div class="h3" style="margin:0">💎 ${tr('Récompenses','Rewards')}</div><p class="muted" style="font-size:12.5px;margin:4px 0 0">${tr("Un <b>coffre à chaque gardien d'étage</b> (gemmes + échos gardés), même si tu tombes ensuite. À la sortie, tes échos deviennent des gemmes et de l'or, et tu en gardes la moitié pour la Boutique des Échos. Conquérir le Trône du Néant donne en plus <b>2 éclats légendaires</b>, <b>150 gemmes</b> et un équipement légendaire.",'A <b>chest at every floor guardian</b> (gems + kept echoes), even if you fall later. When you leave, your echoes turn into gems and gold, and you keep half of them for the Echo Shop. Conquering the Throne of the Void also gives <b>2 legendary shards</b>, <b>150 gems</b> and a legendary item.')}</p></div>`);
    const i=h.indexOf('<div class="card"><div class="h3" style="margin:0">💎');h=i>=0?h.slice(0,i)+curseCard()+h.slice(i)+shopCard():h+curseCard()+shopCard()}
  else{h=h.replace(/(<b>🔮 \d+ échos<\/b>)/,`$1<span class="dgtag">${R.quick?'⚡':'🕯️'} <span>${R.quick?tr('Rapide','Quick'):tr('Complète','Full')}</span></span><span class="dgtag cu" title="${esc(C.d)}">${C.ic} <span>${esc(C.n)}</span></span>`)}}catch(e){console.warn('donjon page',e)}return h}}
function modeModal(){const X=DG(),C=curse();if(X.keys<=0)return toast(tr("Plus de clé aujourd'hui. Elles reviennent à minuit.",'No keys left today. They come back at midnight.'));
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🕯️ <span>${tr('Quelle descente ?','Which descent?')}</span></div><p class="sub"><span>${tr('Chaque descente utilise une clé','Each descent uses a key')}</span> <b>(${X.keys}/${DG_KEYS})</b><br><span>${tr('Malédiction de la semaine','Curse of the week')}</span> ${C.ic} <b>${esc(C.n)}</b></p>
   <div class="dgmodes"><button class="dgmode" data-a="dgstartm" data-v="quick"><span class="dgri">⚡</span><b>${tr('Descente rapide','Quick descent')}</b><small>${tr("1 étage, 6 salles, environ 5 minutes. Coffre d'étage + 60 gemmes de bonus.",'1 floor, 6 rooms, about 5 minutes. Floor chest + 60 bonus gems.')}</small></button>
   <button class="dgmode full" data-a="dgstartm" data-v="full"><span class="dgri">🕯️</span><b>${tr('Descente complète','Full descent')}</b><small>${tr("3 étages, 18 salles. 3 coffres d'étage, et la conquête du Trône du Néant.",'3 floors, 18 rooms. 3 floor chests, and the conquest of the Throne of the Void.')}</small></button></div>`)}
function rulesModal(){const C=curse();modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📜 ${tr('Règles du donjon','Dungeon rules')}</div><ul class="dgul">
  <li>${tr('<b>Descente rapide</b> : 1 étage de 6 salles. <b>Descente complète</b> : 3 étages de 6 salles. Chacune coûte une clé (2 par jour).','<b>Quick descent</b>: 1 floor of 6 rooms. <b>Full descent</b>: 3 floors of 6 rooms. Each costs a key (2 per day).')}</li>
  <li>${tr('Tu choisis ton chemin : combats, élites, trésors, feux de camp, marchands et salles mystère.','You choose your path: fights, elites, treasures, campfires, merchants and mystery rooms.')}</li>
  <li>${tr('Les PV de tes héros <b>ne remontent pas</b> entre les combats : soigne-les aux feux de camp.','Your heroes\' HP <b>does not refill</b> between fights: heal them at campfires.')}</li>
  <li>${tr("Chaque gardien d'étage vaincu ouvre un <b>coffre</b> que tu gardes quoi qu'il arrive.",'Every floor guardian you beat opens a <b>chest</b> that you keep no matter what.')}</li>
  <li>${tr('Les <b>reliques</b> te rendent plus fort jusqu\'à la fin de l\'expédition.','The <b>relics</b> make you stronger until the end of the expedition.')}</li>
  <li>${tr('À la sortie, tes échos deviennent des gemmes et de l\'or, et tu en gardes la moitié pour la <b>Boutique des Échos</b>.','When you leave, your echoes turn into gems and gold, and you keep half of them for the <b>Echo Shop</b>.')}</li>
  <li>${C.ic} <b>${esc(C.n)}</b><br><span>${esc(C.d)}</span></li></ul>`)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,v=t.dataset.v;
  if(!['dgmode','dgstartm','dgsbuy','dgsbuyok','dgrules2'].includes(a))return;e.preventDefault();e.stopImmediatePropagation();
  if(a==='dgmode')modeModal();else if(a==='dgstartm'){try{closeModal()}catch(er){}startRun(v==='quick')}
  else if(a==='dgsbuy'){if(t.disabled)return;buy(v,false)}else if(a==='dgsbuyok')buy(v,true);else if(a==='dgrules2')rulesModal()},true);

/* ---------- les récompenses cosmétiques ---------- */
function gateArt(){return`<defs><radialGradient id="dgpb1" cx="50%" cy="72%" r="60%"><stop offset="0" stop-color="#9a4aff" stop-opacity=".9"/><stop offset=".6" stop-color="#3a0a6a" stop-opacity=".55"/><stop offset="1" stop-color="#07040f" stop-opacity="0"/></radialGradient><linearGradient id="dgpb2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#140c26"/><stop offset="1" stop-color="#05030c"/></linearGradient></defs>
  <rect width="400" height="200" fill="url(#dgpb2)"/>${[...Array(40)].map((_,i)=>`<circle cx="${(i*97)%400}" cy="${(i*53)%120}" r="${(i%3)*.4+.5}" fill="#d8c8ff" opacity="${(.2+(i%5)*.12).toFixed(2)}"/>`).join('')}
  <path d="M0 200V128Q70 70 140 98T260 78T400 116V200Z" fill="#1c1430"/><path d="M128 200V104Q128 42 200 38Q272 42 272 104V200Z" fill="#3a3050" stroke="#140c24" stroke-width="3"/>
  <path d="M148 200V110Q148 64 200 62Q252 64 252 110V200Z" fill="#05030a"/><ellipse cx="200" cy="152" rx="74" ry="62" fill="url(#dgpb1)"/>${[0,1,2,3,4].map(i=>`<path d="M${154+i*4} ${200-i*10}H${246-i*4}" stroke="#2a2040" stroke-width="7"/>`).join('')}
  ${[[110,100],[290,100]].map(([x,y])=>`<g transform="translate(${x} ${y})"><circle r="26" fill="#ffb03a" opacity=".22"/><path d="M-3 0h6v26h-6z" fill="#5a3a1a"/><path d="M0 0Q-8 -10 0 -24Q8 -10 0 0Z" fill="#ffb03a"/></g>`).join('')}
  ${[[60,46,1],[330,38,-1],[250,24,1],[96,22,-1]].map(([x,y,s])=>`<path transform="translate(${x} ${y}) scale(${s} 1)" d="M0 0Q-6 -7 -14 -5Q-10 -2 -11 2Q-6 0 -3 4Q-1 1 0 3Q1 1 3 4Q6 0 11 2Q10 -2 14 -5Q6 -7 0 0Z" fill="#0a0614" stroke="#6a4aa8" stroke-width=".8"/>`).join('')}
  ${[0,1,2,3,4,5].map(i=>`<text x="${142+i*24}" y="${80+Math.abs(2.5-i)*6}" font-size="11" fill="#c070ff" opacity=".85">ᚱ</text>`).join('')}`}
try{if(typeof PBG!=='undefined'){PBG.donjon={n:tr('Fond « Donjon des Échos »','“Echo Dungeon” background'),art:gateArt,how:tr('Boutique des Échos (Donjon des Échos)','Echo Shop (Echo Dungeon)'),fx:1}}}catch(e){}
try{FRAMES.echodg=tr('Écho du Donjon','Dungeon Echo');try{FHINT.echodg=tr('Boutique des Échos (Donjon des Échos)','Echo Shop (Echo Dungeon)')}catch(e){}
  {const fl=frameList;frameList=function(){const L=fl.apply(this,arguments).filter(f=>f!=='echodg'||frameUnlocked(f));if(!L.includes('echodg')&&frameUnlocked('echodg'))L.push('echodg');return L}}}catch(e){}
try{TITLES.push({k:'dgseig',n:tr('Seigneur des Échos','Lord of Echoes'),c:'#b48aff',d:tr('Boutique des Échos','Echo Shop'),ok:()=>!!(S.dg&&S.dg.own&&S.dg.own.title)})}catch(e){}
/* le fond animé (chauves-souris) dans le profil */
{const pf=pbgFx;pbgFx=function(k){if(k==='donjon'){let o='<div class="pbgfx dgbats" aria-hidden="true">';for(let i=0;i<7;i++)o+=`<i style="--x:${(8+i*13)%92}%;--y:${10+(i*17)%50}%;--t:${(5+i%3*1.7).toFixed(1)}s;--l:${(-i*1.3).toFixed(1)}s"></i>`;return o+'</div>'}return pf.apply(this,arguments)}}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.dghero .dgstats{grid-template-columns:repeat(4,minmax(0,1fr))}.dghero .dgstats small{text-align:center;line-height:1.15}
.dgcurse{display:flex;gap:12px;align-items:center;border-color:#6a3aa8!important;background:linear-gradient(100deg,rgba(138,58,255,.18),var(--panel) 55%)!important}
.dgcurse .dgcic{font-size:34px;width:54px;height:54px;display:grid;place-items:center;border-radius:14px;background:rgba(0,0,0,.25);flex:none}
.dgcurse small{display:block;font-size:11px;letter-spacing:.06em;color:#c8a8ff;font-weight:800}.dgcurse b{display:block;font-size:16px}.dgcurse p{margin:2px 0;font-size:12.5px}
.dgcurse small.muted{font-weight:600;letter-spacing:0;color:var(--muted)}
.dgtag{display:inline-block;margin-left:6px;padding:2px 8px;border-radius:999px;background:rgba(138,58,255,.25);font-size:11.5px;font-weight:800;vertical-align:middle}
.dgtag.cu{background:rgba(255,90,90,.18)}
.dgmodes{display:grid;gap:10px;margin-top:10px}
.dgmode{display:grid;grid-template-columns:auto 1fr;gap:2px 12px;align-items:center;text-align:left;padding:12px 14px;border-radius:16px;border:2px solid #6a4aa8;background:linear-gradient(135deg,#2a1a4a,#140c26);color:#fff;cursor:pointer}
.dgmode .dgri{grid-row:span 2;font-size:30px}.dgmode b{font-size:16px}.dgmode small{color:#d8c8ff;font-size:12.5px}
.dgmode.full{border-color:#c03aff;background:linear-gradient(135deg,#3a1a5a,#140c26)}
.dgmode:active{transform:scale(.98)}
.dgshop .dgbank{font-size:16px;padding:3px 10px;border-radius:999px;background:rgba(138,58,255,.25)}
.dgsgrid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
.dgsi{position:relative;display:flex;flex-direction:column;align-items:center;text-align:center;gap:2px;padding:10px 8px 8px;border-radius:14px;border:1.5px solid rgba(180,138,255,.4);background:linear-gradient(180deg,rgba(138,58,255,.16),rgba(0,0,0,.15));color:inherit;cursor:pointer;min-width:0}
.dgsi.big{grid-column:1/-1;border-color:#ffd84a;background:radial-gradient(120% 120% at 50% 0%,rgba(180,138,255,.35),rgba(20,12,38,.6))}
.dgsi .dgsic{font-size:28px;line-height:1.1}.dgsi .dgspet{width:96px;height:96px;filter:drop-shadow(0 4px 10px rgba(180,138,255,.6))}
.dgsi b{font-size:13px;line-height:1.2}.dgsi small{font-size:11px;color:var(--muted);line-height:1.25}
.dgsi .dgsp{margin-top:4px;font-weight:900;font-size:13px;padding:2px 10px;border-radius:999px;background:rgba(0,0,0,.3)}.dgsi .dgsp.no{color:#ff8a8a}
.dgsi em{font-style:normal;font-size:10.5px;color:#c8b8ff}
.dgsi[disabled]{opacity:.55;cursor:default}.dgsi.own{opacity:.75;border-style:dashed}
.pbgfx.dgbats i{position:absolute;left:var(--x);top:var(--y);width:16px;height:8px;animation:dgbat var(--t) ease-in-out var(--l) infinite;will-change:transform}
.pbgfx.dgbats i::before,.pbgfx.dgbats i::after{content:"";position:absolute;top:0;width:8px;height:7px;background:#0a0614;border-radius:80% 10% 60% 20%;animation:dgflap .35s ease-in-out infinite alternate}
.pbgfx.dgbats i::before{left:0;transform-origin:100% 60%}.pbgfx.dgbats i::after{right:0;transform-origin:0 60%;border-radius:10% 80% 20% 60%}
@keyframes dgbat{0%{transform:translate3d(0,0,0)}25%{transform:translate3d(40px,-10px,0)}50%{transform:translate3d(10px,12px,0)}75%{transform:translate3d(-30px,-6px,0)}100%{transform:translate3d(0,0,0)}}
@keyframes dgflap{from{transform:scaleY(1)}to{transform:scaleY(.35)}}
.fav.frm-echodg{--fd:#140c26;--gc:#b48aff}
.fav.frm-echodg::before{background:linear-gradient(160deg,rgba(255,255,255,.45),transparent 42%,rgba(0,0,0,.3)),repeating-conic-gradient(from var(--fa),#b48aff 0 12deg,#3a1a6a 12deg 24deg,#e8e0ff 24deg 30deg,#3a1a6a 30deg 42deg);animation:fspin 9s linear infinite}
html.scrl .pbgfx.dgbats i,html.bgpause .pbgfx.dgbats i{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.pbgfx.dgbats i{animation:none}}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{Object.assign(EN,{'Donjon des Échos':'Echo Dungeon','Descente rapide réussie !':'Quick descent cleared!','⚡ Bonus de descente rapide : # gemmes':'⚡ Quick descent bonus: # gems',
  '#/# cette semaine':'#/# this week',"#/# aujourd'hui":'#/# today','🔮 # échos':'🔮 # echoes','Salles franchies : #':'Rooms cleared: #','🚪 Sortir':'🚪 Leave','📜 Règles':'📜 Rules','📜 JOURNAL DU COMBAT':'📜 BATTLE LOG',
  '🔮 +# échos':'🔮 +# echoes','🎁 Coffre de l\'étage # :':'🎁 Floor # chest:','# gemmes · 🔮 # échos gardés':'# gems · 🔮 # echoes kept','🔮 # échos gardés pour la Boutique des Échos':'🔮 # echoes kept for the Echo Shop',
  '⚡ Bonus de descente rapide :':'⚡ Quick descent bonus:','# gemmes':'# gems',
  'Prix':'Price','tu as':'you have','Dernière expédition : ⚡ descente rapide réussie ·':'Last expedition: ⚡ quick descent cleared ·','clés aujourd\'hui':'keys today','record /#':'best /#','conquêtes':'conquests',
  '🕯️ Descendre dans le donjon':'🕯️ Go down into the dungeon'});
 for(const F of (typeof DG_FLOORS!=='undefined'?DG_FLOORS:[])){const fe={'Cryptes oubliées':'Forgotten Crypts','Forges englouties':'Sunken Forges','Trône du Néant':'Throne of the Void'}[F.n];if(fe){EN[F.ic+' Étage # · '+F.n]=F.ic+' Floor # · '+fe;EN[F.n]=fe}}
 for(const C of DGC){EN[C.ic+' '+C.n]=C.ic+' '+EN[C.n]}
 for(const k in EN)put(k,EN[k])}catch(e){}
}catch(e){console.warn('donjon 2',e)}})();
