/* ================= V446 : LA MÉNAGERIE ET LES FAMILIERS =================
   Un nouveau lieu dans la Caserne des héros. Des œufs (coffre du jour, boss d'étape, raids, coffre d'expédition, boutique)
   à mettre dans la couveuse ; à l'éclosion, un familier parmi 9 (4 raretés). On le nourrit de baies pour le monter
   (niveau 30, 3 stades d'évolution aux niveaux 10 et 20), les doublons lui donnent des étoiles (5 max).
   En combat, le familier actif accompagne ton équipe : tous les 2 tours (1er, 3e, 5e…), il fait son action.
   Mêmes règles pour l'adversaire : bots et vrais joueurs ont aussi leur familier en arène, tournoi, guerres. */
(function(){try{
if(!window.RDEPETART)return;
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const {PETART,eggArt}=window.RDEPETART;
const now=()=>Date.now();
const snd=k=>{try{if(typeof AU!=='undefined'&&AU&&AU.ok&&typeof UIS!=='undefined'&&UIS[k])UIS[k]()}catch(e){}};
const BER='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5Q13 2 16 2Q15 5 12 6Z" fill="#5fd38a"/><circle cx="8.5" cy="14" r="5.5" fill="#5a63e8"/><circle cx="15.5" cy="13" r="5.2" fill="#7a5af0"/><circle cx="12" cy="18.5" r="4.6" fill="#4a4fd0"/><circle cx="7" cy="12.5" r="1.4" fill="#fff" opacity=".6"/><circle cx="14" cy="11.4" r="1.3" fill="#fff" opacity=".6"/></svg>';
const EGG='<svg class="ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C17 2 20 9 20 14C20 19 16.5 22 12 22C7.5 22 4 19 4 14C4 9 7 2 12 2Z" fill="#fff4dc" stroke="#7a5a2a" stroke-width="1.4"/><circle cx="9" cy="11" r="1.6" fill="#9bc46a"/><circle cx="14.5" cy="15" r="2" fill="#9bc46a"/></svg>';
window.RDEBER=BER;window.RDEEGG=EGG;

/* ---------- données ---------- */
const RR=[{n:'Commun',en:'Common',c:'#b7c2cb',f:.85,h:30},{n:'Rare',en:'Rare',c:'#4da3ff',f:1,h:120},{n:'Épique',en:'Epic',c:'#ff8f3f',f:1.1,h:240},{n:'Légendaire',en:'Legendary',c:'#ffd84a',f:1.25,h:480}];
const rn=r=>T(RR[r].n,RR[r].en);
const PETS={
 pepite:{r:0,ic:'🦎',col:'#ffd84a',n:['Pépite','Pépite Vive',"Salamandre d'Or"],en:['Nugget','Lively Nugget','Golden Salamander'],sp:['salamandre dorée','golden salamander'],sk:["Étincelle d'or",'Golden Spark']},
 mousse:{r:0,ic:'🐢',col:'#7fe36a',n:['Mousse','Mousse Fleurie','Tortue-Bosquet'],en:['Moss','Blooming Moss','Grove Tortoise'],sp:['tortue-jardin','garden tortoise'],sk:['Rosée du bosquet','Grove Dew']},
 braise:{r:1,ic:'🦊',col:'#ff8a2a',n:['Braise','Braise Ardente','Kitsune des Braises'],en:['Ember','Blazing Ember','Ember Kitsune'],sp:['renardeau de feu','fire fox cub'],sk:['Flammèche','Fire Flick']},
 givrelle:{r:1,ic:'🐰',col:'#8fe9ff',n:['Givrelle','Givrelle Cristal','Lièvre du Givre'],en:['Frostling','Crystal Frostling','Frost Hare'],sp:['lapin des neiges','snow bunny'],sk:['Flocon protecteur','Guardian Flake']},
 lumi:{r:2,ic:'✨',col:'#7cf2ff',n:['Lumi','Lumi Lanterne',"Phare d'Éther"],en:['Lumi','Lantern Lumi','Aether Beacon'],sp:["luciole d'éther",'aether firefly'],sk:["Lueur d'éther",'Aether Glow']},
 jeton:{r:2,ic:'🐱',col:'#ff5fb4',n:['Jeton','Jeton Fripon','Chat du Destin'],en:['Token','Rascal Token','Cat of Fate'],sp:["chat d'Aléa","Aléa's cat"],sk:['Pile ou face','Heads or Tails']},
 plumet:{r:2,ic:'🦉',col:'#5fe0d6',n:['Plumet','Plumet Étoilé','Duc des Constellations'],en:['Plumet','Starry Plumet','Constellation Duke'],sp:["petit-duc d'éther",'aether scops owl'],sk:['Œil de nuit','Night Eye'],owl:1},
 fumerolle:{r:3,ic:'🐉',col:'#ff6a4a',n:['Fumerolle','Fumerolle Cendrée','Dragon des Braises'],en:['Smokelet','Ashen Smokelet','Ember Dragon'],sp:['bébé dragon','baby dragon'],sk:['Souffle de braises','Ember Breath']},
 grandduc:{r:3,ic:'🦉',col:'#bfe8ff',n:['Grand-Duc des Neiges','Grand-Duc Givré','Grand-Duc Blizzard'],en:['Snow Eagle-Owl','Frosted Eagle-Owl','Blizzard Eagle-Owl'],sp:['chouette des neiges','snowy owl'],sk:['Blizzard','Blizzard'],owl:1}};
const KEYS=Object.keys(PETS);
window.RDEPETS=PETS;
const pn=(k,st)=>{const P=PETS[k];return T(P.n[st-1],P.en[st-1])};
const stOf=l=>l>=20?3:l>=10?2:1;
const xpNeed=l=>10+6*(l-1);
const MAXL=30,MAXS=5;
const powOf=(k,l,s)=>(1+.022*(l-1))*(1+.06*s)*[1,1.15,1.35][stOf(l)-1]*RR[PETS[k].r].f;

/* ---------- état ---------- */
function PS(){S.pets=S.pets||{};const p=S.pets;p.own=p.own||{};p.eggs=p.eggs||[];if(!Array.isArray(p.inc))p.inc=[null,null];p.b=p.b||0;p.nid=p.nid||1;p.shop=p.shop||{};
  if(!p.wel){p.wel=1;p.eggs.push({id:p.nid++,r:1,w:1})}
  if(p.act&&!p.own[p.act])p.act=null;return p}
window.RDEpetState=PS;
const today=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
function addEgg(r){const p=PS();const e={id:p.nid++,r};p.eggs.push(e);return e}
function roll(w){let x=Math.random()*w.reduce((a,b)=>a+b,0);for(let i=0;i<w.length;i++){if((x-=w[i])<0)return i}return 0}
const incDur=e=>e.w?60e3:RR[e.r].h*60e3;
const incLeft=s=>s?Math.max(0,s.t0+s.d-now()):0;
const readyN=()=>{try{const p=PS();return p.inc.filter(s=>s&&incLeft(s)<=0).length}catch(e){return 0}};
const fmtLeft=ms=>{const m=Math.ceil(ms/60000);if(m<=1&&ms<60000)return Math.ceil(ms/1000)+' s';if(m<60)return m+' min';const h=Math.floor(m/60),mm=m%60;return h+' h'+(mm?' '+String(mm).padStart(2,'0'):'')};
const fastCost=s=>Math.max(10,Math.ceil(incLeft(s)/1800000)*15);

/* ---------- images (SVG fixes, mises en cache) ---------- */
const IMC=new Map();
function petImg(k,st){const key=k+st;let u=IMC.get(key);if(u)return u;
  u='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${PETART[k](st)}</svg>`);IMC.set(key,u);return u}
function eggImg(r,crack){const key='e'+r+(crack?'c':'');let u=IMC.get(key);if(u)return u;
  u='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">${eggArt(r,crack)}</svg>`);IMC.set(key,u);return u}
window.RDEpetImg=petImg;
const stars=s=>`<span class="ptst" aria-label="${s} ★">${'★'.repeat(s)}<i>${'★'.repeat(MAXS-s)}</i></span>`;

/* ---------- effets (texte affiché au joueur, avec les vrais chiffres) ---------- */
const pc=v=>Math.round(v)+' %';
function effNums(k,l,s){const P=powOf(k,l,s),st=stOf(l);
  switch(k){
   case 'pepite':return{hit:42*P,gold:[5,10,15][st-1]};
   case 'mousse':return{heal:2*P};
   case 'braise':return{hit:22*P,burn:10*P,n:st===3?2:1};
   case 'givrelle':return{sh:4.5*P,n:st===3?2:1};
   case 'lumi':return{en:Math.round(8*(1+.5*(P-1)))};
   case 'jeton':return{hit:62*P,tail:st>=2?5:0};
   case 'plumet':return{hit:18*P,mk:st===3?2:1};
   case 'fumerolle':return{hit:6.2*P};
   case 'grandduc':return{hit:4.6*P,en:15,n:st===3?2:1}}
  return{}}
function effText(k,l,s){const E=effNums(k,l,s);const A=T("de l'ATQ moyenne de ton équipe","of your team's average ATK");
  switch(k){
   case 'pepite':return T(`Frappe l'ennemi le plus affaibli (${pc(E.hit)} ${A}). Et +${E.gold} % d'or sur les victoires d'étape.`,`Strikes the weakest enemy (${pc(E.hit)} ${A}). Plus +${E.gold} % gold on stage victories.`);
   case 'mousse':return T(`Soigne toute l'équipe : ${pc(E.heal)} des PV max de chaque héros.`,`Heals the whole team: ${pc(E.heal)} of each hero's max HP.`);
   case 'braise':return T(`Frappe ${E.n>1?'2 ennemis':'un ennemi'} (${pc(E.hit)} ${A}) et ${E.n>1?'les brûle':'le brûle'} : ${pc(E.burn)} par tour pendant 2 tours.`,`Hits ${E.n>1?'2 enemies':'an enemy'} (${pc(E.hit)} ${A}) and burns ${E.n>1?'them':'it'}: ${pc(E.burn)} per turn for 2 turns.`);
   case 'givrelle':return T(`Bouclier sur ${E.n>1?'les 2 héros les plus blessés':'le héros le plus blessé'} : ${pc(E.sh)} de ses PV max.`,`Shields ${E.n>1?'the 2 most wounded heroes':'the most wounded hero'}: ${pc(E.sh)} of max HP.`);
   case 'lumi':return T(`Donne +${E.en} d'énergie au héros le plus proche de son ultime.`,`Gives +${E.en} energy to the hero closest to their ultimate.`);
   case 'jeton':return T(`Lance une pièce. Face : grosse frappe (${pc(E.hit)} ${A}). Pile : ${E.tail?`+${E.tail} d'énergie pour toute l'équipe`:'rien… (au stade 2 : de l\'énergie)'}.`,`Flips a coin. Heads: big hit (${pc(E.hit)} ${A}). Tails: ${E.tail?`+${E.tail} energy for the whole team`:'nothing… (stage 2: energy)'}.`);
   case 'plumet':return T(`Marque l'ennemi le plus affaibli jusqu'à ${E.mk>1?'ses 2 prochains tours':'son prochain tour'} : il subit +30 % de dégâts et ton équipe le vise plus souvent. Petit coup de bec (${pc(E.hit)}).`,`Marks the weakest enemy until ${E.mk>1?'its next 2 turns':'its next turn'}: it takes +30 % damage and your team targets it more often. Small peck (${pc(E.hit)}).`);
   case 'fumerolle':return T(`Souffle sur tous les ennemis : ${pc(E.hit)} ${A} chacun.`,`Breathes on all enemies: ${pc(E.hit)} ${A} each.`);
   case 'grandduc':return T(`Givre sur tous les ennemis (${pc(E.hit)} chacun) et ralentit ${E.n>1?'les 2 ennemis les plus chargés':"l'ennemi le plus chargé"} : −${E.en} d'énergie, il joue en dernier au tour suivant.`,`Frost on all enemies (${pc(E.hit)} each) and slows ${E.n>1?'the 2 most charged enemies':'the most charged enemy'}: −${E.en} energy, acts last next turn.`)}
  return''}
const owlNote=()=>T(" Lien de plumes : avec Corvin dans l'équipe, Corvin gagne +10 % d'ATQ."," Feather bond: with Corvin in the team, Corvin gains +10 % ATK.");

/* ---------- actions de la Ménagerie ---------- */
function gainXP(k,n){const p=PS(),o=p.own[k];if(!o)return{up:0,evo:0};let up=0,evo=0;const st0=stOf(o.l);o.x+=n;
  while(o.l<MAXL&&o.x>=xpNeed(o.l)){o.x-=xpNeed(o.l);o.l++;up++}
  if(o.l>=MAXL){o.l=MAXL;o.x=0}
  if(stOf(o.l)>st0)evo=stOf(o.l);return{up,evo}}
function hatchSlot(i){const p=PS(),s=p.inc[i];if(!s||incLeft(s)>0)return null;p.inc[i]=null;
  const pool=KEYS.filter(k=>PETS[k].r===s.r);let k=pool[Math.floor(Math.random()*pool.length)];
  let res;
  if(!p.own[k]){p.own[k]={l:1,x:0,s:0};res={k,kind:'new'}}
  else if(p.own[k].s<MAXS){p.own[k].s++;res={k,kind:'star',s:p.own[k].s}}
  else{const b=[10,20,40,80][s.r];p.b+=b;res={k,kind:'ber',b}}
  if(!p.act)p.act=k;
  p.hatched=(p.hatched||0)+1;save();return Object.assign(res,{r:s.r})}

/* ---------- la page ---------- */
UI.ptSel=UI.ptSel||null;
function petsPage(){const p=PS();const own=Object.keys(p.own);const sel=UI.ptSel&&PETS[UI.ptSel]?UI.ptSel:(p.act||own[0]||null);
  let show='';
  if(!sel){const e=p.eggs[0]||null,inc=p.inc.find(s=>s);
    show=`<div class="card ptshow ptnone" style="--pc:${RR[1].c}"><div class="ptstage"><div class="ptrays"></div><img class="ptbimg" src="${eggImg(inc?inc.r:e?e.r:1)}" alt=""></div>
      <div class="ptinfo"><div class="ptname">${T('Ton premier familier','Your first familiar')}</div><p class="ptdesc">${inc?T("Ton œuf est dans la couveuse. Reviens quand il est prêt à éclore !","Your egg is in the incubator. Come back when it's ready to hatch!"):T("Un œuf rare t'attend. Mets-le dans la couveuse : il éclot en 1 minute.","A rare egg is waiting. Put it in the incubator: it hatches in 1 minute.")}</p>
      ${e&&!inc?`<button class="btn p" data-a="ptinc" data-v="${e.id}">🪺 ${T('Mettre à couver','Incubate')}</button>`:''}</div></div>`}
  else{const P=PETS[sel],o=p.own[sel],has=!!o,l=has?o.l:1,s=has?o.s:0,st=stOf(l),act=p.act===sel;
    const need=xpNeed(l),pct=l>=MAXL?100:Math.round(100*(has?o.x:0)/need);
    const evoAt=l<10?10:l<20?20:0;
    show=`<div class="card ptshow ${has?'':'ptlock'}" style="--pc:${RR[P.r].c};--pk:${P.col}">
      <div class="ptstage"><div class="ptrays"></div><button class="ptbig" data-a="ptpat" data-v="${sel}" ${has?'':'disabled'} aria-label="${T('Caresser','Pet')}"><img class="ptbimg" src="${petImg(sel,st)}" alt="${esc(pn(sel,st))}"></button>${act?`<span class="ptactb">🐾 ${T('En combat','In battle')}</span>`:''}</div>
      <div class="ptinfo">
        <div class="ptname">${has?esc(pn(sel,st)):'???'} <span class="ptrar" style="--rc:${RR[P.r].c}">${rn(P.r).toUpperCase()}</span></div>
        <div class="ptsub">${T(P.sp[0],P.sp[1])} · ${T('stade','stage')} ${st}/3 ${has?stars(s):''}</div>
        ${has?`<div class="ptlvl"><b>${T('Niv.','Lv.')} ${l}</b><div class="bar"><i style="width:${pct}%"></i></div><small>${l>=MAXL?T('Niveau maximum','Max level'):`${o.x} / ${need} XP${evoAt?` · ${T('évolue au niv.','evolves at lv.')} ${evoAt}`:''}`}</small></div>`:''}
        <div class="pteff"><b>${P.ic} ${T(P.sk[0],P.sk[1])}</b> <small>· ${T('tous les 2 tours','every 2 turns')}</small><br>${effText(sel,l,s)}${P.owl?owlNote():''}</div>
        ${has?`<div class="row ptbtns"><button class="btn p" data-a="ptfeed" data-v="${sel}" ${p.b<1||l>=MAXL?'disabled':''}>${BER} ${T('Nourrir','Feed')}</button><button class="btn" data-a="ptfeedall" data-v="${sel}" ${p.b<1||l>=MAXL?'disabled':''}>${T('Tout donner','Feed all')} (${p.b})</button></div>
          ${act?'':`<button class="btn g ptgo" data-a="ptact" data-v="${sel}">🐾 ${T('Emmener au combat','Take into battle')}</button>`}
          <p class="muted ptpat">${p.pat===today()?T('💕 Déjà câliné aujourd\'hui.','💕 Already cuddled today.'):T('👆 Touche-le pour le caresser : +2 baies une fois par jour.','👆 Tap to pet it: +2 berries once a day.')}</p>`
        :`<p class="muted" style="margin:6px 0 0">🔒 ${T('Pas encore obtenu : il peut sortir d\'un œuf','Not obtained yet: it can hatch from an egg')} ${rn(P.r).toLowerCase()}.</p>`}
      </div></div>`}
  /* couveuse */
  const nest=(s,i)=>{if(!s)return`<div class="ptnest empty"><div class="ptnimg">🪺</div><small>${T('Libre','Empty')}</small></div>`;
    const left=incLeft(s),pr=Math.min(1,1-left/s.d);
    return`<div class="ptnest ${left<=0?'ready':''}" style="--rc:${RR[s.r].c}"><img class="ptnimg ${left<=0?'wob':''}" src="${eggImg(s.r,left<=0)}" alt=""><small>${rn(s.r)}</small>
      ${left<=0?`<button class="btn p sm" data-a="pthatch" data-v="${i}">✨ ${T('Éclore !','Hatch!')}</button>`:`<div class="bar"><i style="width:${Math.round(pr*100)}%"></i></div><small class="ptleft" data-t="${s.t0+s.d}">${fmtLeft(left)}</small><button class="btn sm" data-a="ptfast" data-v="${i}">⚡ ${fastCost(s)} ${GEM}</button>`}</div>`};
  const inc=`<div class="card ptinc"><div class="h3">🪺 ${T('Couveuse','Incubator')}</div><div class="ptnests">${p.inc.map(nest).join('')}</div></div>`;
  /* œufs */
  const free=p.inc.some(s=>!s);
  const eggs=p.eggs.length?`<div class="card"><div class="h3">${EGG} ${T('Tes œufs','Your eggs')} (${p.eggs.length})</div><div class="pteggs">${p.eggs.map(e=>`<div class="ptegg" style="--rc:${RR[e.r].c}"><img src="${eggImg(e.r)}" alt=""><small>${e.w?T('Bienvenue','Welcome'):rn(e.r)}</small><small class="muted">${e.w?'1 min':fmtLeft(RR[e.r].h*60e3)}</small><button class="btn sm ${free?'p':''}" data-a="ptinc" data-v="${e.id}" ${free?'':'disabled'}>${T('Couver','Incubate')}</button></div>`).join('')}</div>${free?'':`<p class="muted" style="margin:6px 0 0;font-size:12px">${T('La couveuse est pleine : fais éclore un œuf pour libérer une place.','The incubator is full: hatch an egg to free a spot.')}</p>`}</div>`:'';
  /* collection */
  const tiles=KEYS.map(k=>{const P=PETS[k],o=p.own[k];const st=o?stOf(o.l):1;
    return`<button class="pttile ${o?'':'off'} ${k===sel?'on':''}" data-a="ptsel" data-v="${k}" style="--rc:${RR[P.r].c}"><img src="${petImg(k,st)}" alt=""><b>${o?esc(pn(k,st)):'???'}</b><small>${o?`${T('Niv.','Lv.')} ${o.l}${o.s?' · '+'★'.repeat(o.s):''}`:rn(P.r)}</small>${p.act===k?'<span class="ptpaw">🐾</span>':''}</button>`}).join('');
  const col=`<div class="card"><div class="h3">📖 ${T('Collection','Collection')} (${Object.keys(p.own).length}/${KEYS.length})</div><div class="pttiles">${tiles}</div></div>`;
  /* boutique */
  const sh=p.shop.d===today()?p.shop:{d:today(),e:0,b:0};
  const bp=basketPrice();
  const shop=`<div class="card"><div class="h3">🛒 ${T('Boutique de la Ménagerie','Menagerie shop')}</div>
    <div class="ptbuy"><img src="${eggImg(2)}" alt=""><div><b>${T('Œuf mystère','Mystery egg')}</b><small>${T('Commun 50 % · Rare 32 % · Épique 14 % · Légendaire 4 %','Common 50 % · Rare 32 % · Epic 14 % · Legendary 4 %')}</small><small class="muted">${T('Encore','Left today:')} ${2-sh.e}/2 ${T("aujourd'hui",'')}</small></div><button class="btn p sm" data-a="ptbuyegg" ${sh.e>=2?'disabled':''}>250 ${GEM}</button></div>
    <div class="ptbuy"><span class="ptbig2">${BER}</span><div><b>${T('Panier de 10 baies','Basket of 10 berries')}</b><small>${T('Pour nourrir tes familiers','To feed your familiars')}</small><small class="muted">${T('Encore','Left today:')} ${3-sh.b}/3 ${T("aujourd'hui",'')}</small></div><button class="btn sm" data-a="ptbuyber" ${sh.b>=3?'disabled':''}>${fmt(bp)} ${GOLD}</button></div></div>`;
  const where=`<div class="card ptwhere"><div class="h3">🗺️ ${T('Où trouver œufs et baies','Where to find eggs and berries')}</div><ul>
    <li>${EGG} ${T('<b>Coffre du jour</b> (5 quêtes) : 1 œuf et 5 baies','<b>Daily chest</b> (5 quests): 1 egg and 5 berries')}</li>
    <li>${EGG} ${T("<b>Boss d'étape</b> (1re victoire) : 1 œuf",'<b>Stage bosses</b> (first win): 1 egg')}</li>
    <li>${BER} ${T("<b>Coffre d'expédition</b> : 1 baie par heure (et parfois un œuf après 4 h)",'<b>Expedition chest</b>: 1 berry per hour (and sometimes an egg after 4 h)')}</li>
    <li>${BER} ${T('<b>Raids</b> (rang B à S), <b>arène</b>, <b>tour</b> et victoires','<b>Raids</b> (rank B to S), <b>arena</b>, <b>tower</b> and victories')}</li></ul>
    <p class="muted" style="margin:6px 0 0;font-size:12px">⚖️ ${T("En arène, en tournoi et dans les guerres, l'adversaire a aussi son familier : mêmes règles pour tout le monde.","In the arena, tournaments and wars, your opponent has a familiar too: same rules for everyone.")}</p></div>`;
  return`<div class="ptpage">${show}${inc}${eggs}${col}${shop}${where}<p class="muted ptber">${BER} ${T('Baies','Berries')} : <b>${p.b}</b></p></div>`}
function basketPrice(){let r=600;try{r=idleRate()}catch(e){}return Math.max(2000,Math.round(r*60/100)*100)}

/* ---------- branchement dans la Caserne ---------- */
LB.menag=()=>{const o=LBO;return`<path d="M-30 0L-30 -26Q0 -36 30 -26L30 0Z" fill="#e3b678" stroke="${o}" stroke-width="1.6"/><path d="M-30 -14L30 -14M-30 -7L30 -7" stroke="#b88a4a" stroke-width="1"/>`+
  `<path d="M-40 -24Q-28 -66 0 -68Q28 -66 40 -24Q24 -34 0 -34Q-24 -34 -40 -24Z" fill="#58a85a" stroke="${o}" stroke-width="1.6"/><path d="M-30 -36Q-20 -54 -6 -60M8 -60Q22 -54 30 -38M-12 -40Q0 -48 12 -40" fill="none" stroke="#3a7a3c" stroke-width="1.4"/>`+
  `<path d="M-10 0L-10 -12Q0 -24 10 -12L10 0Z" fill="#5a3218" stroke="${o}" stroke-width="1.4"/><circle cx="6" cy="-7" r="1.3" fill="#ffd84a"/>`+
  `<g transform="translate(-20 -20)"><rect x="-7" y="-6" width="14" height="11" rx="2" fill="#f4e2b0" stroke="${o}" stroke-width="1.2"/><circle cx="0" cy="1" r="2.3" fill="#a0522d"/><circle cx="-2.8" cy="-2.6" r="1.1" fill="#a0522d"/><circle cx="0" cy="-3.6" r="1.1" fill="#a0522d"/><circle cx="2.8" cy="-2.6" r="1.1" fill="#a0522d"/></g>`+
  `${lbWin(14,-24,9,9)}`+
  `<ellipse cx="0" cy="-69" rx="12" ry="4.5" fill="#a87436" stroke="${o}" stroke-width="1.4"/><path d="M-6 -70Q-6 -84 0 -84Q6 -84 6 -70Z" fill="#fff4d6" stroke="${o}" stroke-width="1.3"/><circle cx="-2" cy="-77" r="1.2" fill="#9bc46a"/><circle cx="2.4" cy="-73" r="1.4" fill="#9bc46a"/>`+
  `<path d="M34 0L34 -12M44 0L44 -12M30 -8L48 -8M30 -3L48 -3" stroke="#8a5a2a" stroke-width="2"/>`};
{const pl=LOBS.heros.places;LOBS.heros.places=function(){const P=pl.apply(this,arguments);try{
  const pos={col:[48,206,.74],teams:[128,202,.8],dress:[284,208,.76],meta:[362,206,.64]};for(const p of P)if(pos[p.k]){[p.x,p.y,p.s]=pos[p.k]}
  const i=P.findIndex(p=>p.k==='dress');
  P.splice(i<0?2:i,0,{k:'pets',ic:'🐾',n:T('Ménagerie','Menagerie'),sn:T('Ménagerie','Menagerie'),d:T('Familiers, œufs et couveuse','Familiars, eggs and incubator'),b:()=>LB.menag(),x:206,y:206,s:.84,bw:84,bh:90,
    badge:()=>{try{const p=PS();const r=readyN();if(r)return r;if(!Object.keys(p.own).length)return'!';if(p.eggs.length&&p.inc.some(s=>!s))return p.eggs.length;return 0}catch(e){return 0}}})}catch(e){}return P}}
{const ph=pHeros;pHeros=function(){try{if(inZone('heros')&&UI.lz.heros==='pets')return`<div class="stack">${zoneBar('heros','pets')}${petsPage()}</div>`}catch(e){console.warn('v446 page',e)}return ph.apply(this,arguments)}}

/* ---------- fenêtres : éclosion, évolution ---------- */
function hatchModal(res){const P=PETS[res.k],o=PS().own[res.k],st=stOf(o?o.l:1),c=RR[res.r].c;
  const title=res.kind==='new'?T('Nouveau familier !','New familiar!'):res.kind==='star'?T('Doublon : une étoile de plus !','Duplicate: one more star!'):T('Déjà au maximum !','Already maxed!');
  const sub=res.kind==='new'?`${T(P.sp[0],P.sp[1])} · ${rn(P.r)}`:res.kind==='star'?`${esc(pn(res.k,st))} : ${stars(res.s)}`:`+${res.b} ${T('baies','berries')} ${BER}`;
  modal(`<div class="pthatch" style="--rc:${c};--pk:${P.col}" data-a="ptskip"><div class="ptrays big"></div><div class="ptflash"></div>
    <img class="pthegg" src="${eggImg(res.r)}" alt=""><img class="pthpet" src="${petImg(res.k,st)}" alt="">
    <div class="ptconf">${Array.from({length:14},(_,i)=>`<i style="--a:${i*25.7}deg;--d:${70+(i%3)*22}px;--c:${['#ffd84a','#fff',c,'#ff8ab8'][i%4]}"></i>`).join('')}</div>
    <div class="pthtx"><div class="h">${title}</div><div class="ptname">${esc(pn(res.k,st))}</div><p class="sub">${sub}</p>
    <p class="pteff2">${P.ic} <b>${T(P.sk[0],P.sk[1])}</b> · ${effText(res.k,o?o.l:1,o?o.s:0)}</p>
    <div class="row" style="justify-content:center;gap:8px">${PS().act!==res.k?`<button class="btn g" data-a="ptact" data-v="${res.k}" data-close="1">🐾 ${T('Emmener au combat','Take into battle')}</button>`:''}<button class="btn p" data-a="close">${T('Génial !','Awesome!')}</button></div></div></div>`);
  const m=document.querySelector('#ovl .pthatch');if(!m)return;
  const step=(c2,ms)=>setTimeout(()=>{if(m.isConnected)m.classList.add(c2)},ms);
  step('s1',60);setTimeout(()=>{const e=m.querySelector('.pthegg');if(e&&m.isConnected)e.src=eggImg(res.r,true)},900);step('s2',1300);step('s3',1500);
  setTimeout(()=>{if(m.isConnected)res.r>=2?snd('ach'):snd('coin')},1500);snd('summon')}
function evoModal(k,st){const P=PETS[k];
  modal(`<div class="pthatch evo s1" style="--rc:${P.col};--pk:${P.col}" data-a="ptskip"><div class="ptrays big"></div><div class="ptflash"></div>
    <img class="pthegg" src="${petImg(k,st-1)}" alt=""><img class="pthpet" src="${petImg(k,st)}" alt="">
    <div class="ptconf">${Array.from({length:14},(_,i)=>`<i style="--a:${i*25.7}deg;--d:${70+(i%3)*22}px;--c:${['#ffd84a','#fff',P.col][i%3]}"></i>`).join('')}</div>
    <div class="pthtx"><div class="h">${T('Évolution !','Evolution!')}</div><div class="ptname">${esc(pn(k,st-1))} → ${esc(pn(k,st))}</div>
    <p class="pteff2">${P.ic} <b>${T(P.sk[0],P.sk[1])}</b> · ${effText(k,PS().own[k].l,PS().own[k].s)}</p>
    <div class="row" style="justify-content:center"><button class="btn p" data-a="close">${T('Trop beau !','So cool!')}</button></div></div></div>`);
  const m=document.querySelector('#ovl .pthatch');if(!m)return;
  setTimeout(()=>{if(m.isConnected)m.classList.add('s2')},900);setTimeout(()=>{if(m.isConnected)m.classList.add('s3')},1100);snd('evolve')}

/* ---------- petits effets sur la page ---------- */
function popAt(el,html,cls){if(!el)return;const r=el.getBoundingClientRect();const d=document.createElement('div');d.className='ptpop '+(cls||'');d.innerHTML=html;
  d.style.left=(r.left+r.width/2+(Math.random()*40-20))+'px';d.style.top=(r.top+r.height*.35)+'px';document.body.appendChild(d);setTimeout(()=>d.remove(),1100)}
function bounce(el){if(!el)return;el.classList.remove('hop');void el.offsetWidth;el.classList.add('hop')}

/* ---------- clics ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a;if(!/^pt/.test(a))return;
  if(t.disabled)return;const p=PS(),v=t.dataset.v;
  if(a==='ptskip'){const m=t.closest('.pthatch');if(m&&!e.target.closest('button')){m.classList.add('s1','s2','s3')}return}
  e.preventDefault();
  if(a==='ptsel'){UI.ptSel=v;render();const s=document.querySelector('#main .ptshow');if(s)s.scrollIntoView({block:'nearest',behavior:'smooth'});return}
  if(a==='ptact'){if(!p.own[v])return;p.act=v;save();petPushSoon();if(t.dataset.close)closeModal();toast(`🐾 ${esc(pn(v,stOf(p.own[v].l)))} ${T("t'accompagne maintenant au combat",'now joins you in battle')}`);render();return}
  if(a==='ptinc'){const i=p.inc.findIndex(s=>!s);const ei=p.eggs.findIndex(x=>String(x.id)===String(v));if(i<0||ei<0)return;const eg=p.eggs.splice(ei,1)[0];
    p.inc[i]={id:eg.id,r:eg.r,t0:now(),d:incDur(eg),w:eg.w||0};save();snd('equip');render();return}
  if(a==='pthatch'){const res=hatchSlot(+v);if(!res)return;render();hatchModal(res);petPushSoon();return}
  if(a==='ptfast'){const s=p.inc[+v];if(!s)return;const c=fastCost(s);if(S.gems<c)return toast(T('Pas assez de gemmes.','Not enough gems.'));S.gems-=c;s.d=Math.max(0,now()-s.t0);save();snd('buy');render();return}
  if(a==='ptbuyegg'){const sh=p.shop.d===today()?p.shop:(p.shop={d:today(),e:0,b:0});if(sh.e>=2)return;if(S.gems<250)return toast(T('Pas assez de gemmes.','Not enough gems.'));
    S.gems-=250;sh.e++;const eg=addEgg(roll([50,32,14,4]));save();snd('buy');toast(`${EGG} ${T('Œuf','Egg')} ${rn(eg.r).toLowerCase()} !`);render();return}
  if(a==='ptbuyber'){const sh=p.shop.d===today()?p.shop:(p.shop={d:today(),e:0,b:0});if(sh.b>=3)return;const c=basketPrice();if(S.gold<c)return toast(T("Pas assez d'or.",'Not enough gold.'));
    S.gold-=c;sh.b++;p.b+=10;save();snd('buy');toast(`${BER} +10 ${T('baies','berries')}`);render();return}
  if(a==='ptpat'){const o=p.own[v];if(!o)return;const img=t.querySelector('img');bounce(t);for(let i=0;i<3;i++)setTimeout(()=>popAt(t,'💕','heart'),i*140);snd('heart');
    if(p.pat!==today()){p.pat=today();p.b+=2;save();setTimeout(()=>{toast(`💕 ${esc(pn(v,stOf(o.l)))} ${T('est tout content : +2 baies','is so happy: +2 berries')} ${BER}`);render()},700)}return}
  if(a==='ptfeed'||a==='ptfeedall'){const o=p.own[v];if(!o||p.b<1||o.l>=MAXL)return;
    let n=1;if(a==='ptfeedall'){let need=0,l=o.l,x=o.x;while(l<MAXL){need+=xpNeed(l)-x;x=0;l++}n=Math.min(p.b,Math.ceil(need/10))}
    p.b-=n;const st0=stOf(o.l),l0=o.l;const r=gainXP(v,n*10);save();
    const big=document.querySelector('#main .ptbig');bounce(big);popAt(big,`+${n*10} XP`,'xp');
    if(r.up){snd('lvl');setTimeout(()=>popAt(big,`${T('Niv.','Lv.')} ${o.l} !`,'lv'),220)}else snd('tick');
    petPushSoon();
    if(r.evo){setTimeout(()=>{render();evoModal(v,r.evo)},500)}else setTimeout(render,r.up?560:420);
    return}
});
/* compte à rebours de la couveuse */
setInterval(()=>{try{const els=document.querySelectorAll('#main .ptleft');if(!els.length)return;let re=0;els.forEach(el=>{const l=+el.dataset.t-now();if(l<=0)re=1;else el.textContent=fmtLeft(l)});if(re)render()}catch(e){}},5000);

/* ================= EN COMBAT ================= */
const LAUNCH=Date.UTC(2026,10,18);
function hashStr(s){let h=2166136261>>>0;for(const ch of String(s)){h^=ch.charCodeAt(0);h=Math.imul(h,16777619)>>>0}return h}
function botPet(row){let h=hashStr('pet:'+(row.id||row.n||'x'));const R=()=>{h=(Math.imul(h,1664525)+1013904223)>>>0;return h/4294967296};
  const rr=(()=>{let x=R()*100,i=0;const w=[34,30,24,12];while(i<3&&(x-=w[i])>0)i++;return i})();
  const pool=KEYS.filter(k=>PETS[k].r===rr);const k=pool[Math.floor(R()*pool.length)];
  const days=Math.max(0,(now()-LAUNCH)/864e5);const act=typeof row.act==='number'?Math.max(0,Math.min(1,row.act)):R();
  const l=Math.max(1,Math.min(MAXL,Math.floor(1+days*(.9+1.7*act)+R()*3)));const s=Math.min(MAXS,Math.floor(days/9*(.5+R())));
  return{k,l,s}}
function petOfRow(row){try{if(!row)return null;if(row.me)return myPet();
  if(row.real||row.pid){const d=typeof NET!=='undefined'&&NET.players&&NET.players[row.pid||String(row.id||'').replace(/^r:/,'')];const q=d&&d.pet;
    if(q&&PETS[q.k])return{k:q.k,l:Math.max(1,Math.min(MAXL,+q.l||1)),s:Math.max(0,Math.min(MAXS,+q.s||0))};return null}
  return botPet(row)}catch(e){return null}}
function myPet(){try{const p=PS();if(p.act&&p.own[p.act]){const o=p.own[p.act];return{k:p.act,l:o.l,s:o.s}}}catch(e){}return null}
window.RDEpetOfRow=petOfRow;
const isHero=u=>u&&u.hid!=null&&!u.boss&&!u.raid;
function foeRow(){try{const F=B.units.filter(u=>u.side===1);if(!F.length||!F.every(u=>u.fq&&isHero(u)))return null;
  for(const u of F)if(u.fq.row)return u.fq.row;
  if(typeof gwDefender==='function'){const tr=gwDefender();if(tr)return{real:1,pid:tr.p,n:tr.n,id:tr.p}}
  /* équipe de héros sans fiche connue (tournoi…) : un familier tiré de sa composition, comme un bot */
  return{id:'t:'+F.map(u=>u.hid+'.'+(u.fq.l||1)).join('-'),n:'?'}}catch(e){}return null}

function mkPet(side,q){const U=B.units.filter(u=>u.side===side);const atk=U.reduce((a,u)=>a+(u.atk||0)*(u.dm||1),0)/Math.max(1,U.length);
  return{side,k:q.k,l:q.l,s:q.s,st:stOf(q.l),P:powOf(q.k,q.l,q.s),atk:Math.max(1,atk),dmg:0,nm:pn(q.k,stOf(q.l))}}
function medHTML(P){const c=RR[PETS[P.k].r].c;return`<div class="ptmed" id="ptm${P.side}" style="--rc:${c};--pk:${PETS[P.k].col}" title="${esc(P.nm)} · ${T('niv.','lv.')} ${P.l}"><img src="${petImg(P.k,P.st)}" alt=""><b>${P.l}</b></div><span class="ptmn">🐾 ${esc(P.nm)}</span>`}
function petSetup(){if(!B||B.pets!==undefined)return;B.pets=null;
  const mine=myPet();const row=foeRow();const theirs=row?petOfRow(row):null;
  if(!mine&&!theirs)return;B.pets=[mine?mkPet(0,mine):null,theirs?mkPet(1,theirs):null];
  for(const P of B.pets){if(!P)continue;
    if(PETS[P.k].owl&&typeof CRV!=='undefined'){const c=B.units.find(u=>u.side===P.side&&u.hid===CRV);if(c){c.atk=Math.round(c.atk*1.1);P.owlB=1}}
    const sideEl=document.querySelector(P.side===0?'#battle .side:not(.foe)':'#battle .side.foe');
    if(sideEl&&!B.skip){sideEl.classList.add('haspet');sideEl.insertAdjacentHTML('beforeend',medHTML(P))}
    const who=P.side===0?T('Ton familier','Your familiar'):T("Le familier de l'adversaire","Your opponent's familiar");
    log(`🐾 ${who} : <b>${esc(P.nm)}</b> (${T('niv.','lv.')} ${P.l}${P.s?' · '+'★'.repeat(P.s):''}) — ${T(PETS[P.k].sk[0],PETS[P.k].sk[1])}, ${T('tous les 2 tours','every 2 turns')}${P.owlB?' · 🪶 '+T('Lien de plumes : Corvin +10 % ATQ','Feather bond: Corvin +10 % ATK'):''}`,'pet')}}
{const ml=metaLog;metaLog=function(){const r=ml.apply(this,arguments);try{petSetup()}catch(e){console.warn('v446 setup',e)}return r}}

/* dégâts d'un familier : même formule qu'une attaque, avec l'ATQ moyenne de son équipe */
function petHit(P,t,pct){if(!t||t.hp<=0)return 0;const A=P.atk,D=(t.def||0)*(t.weak>0?.6:1);
  /* Fureur de l'arène (v440) : les familiers montent aussi */
  try{if(B.fury){const n=Math.max(0,(B.round||0)-6+1);if(n>0)pct*=1+.2*n}}catch(e){}
  let d=A*pct/100*(A/(A+D))*(.9+Math.random()*.2);d=Math.max(1,Math.round(d*(t.tm||1)));
  hurt(t,d,'dmg');t.en=Math.min(100,(t.en||0)+5);P.dmg+=d;
  const carrier=B.units.find(u=>u.side===P.side);if(carrier)carrier.dmg=(carrier.dmg||0)+d;return d}
const aliveS=s=>B.units.filter(u=>u.side===s&&u.hp>0);
const weakest=L=>L.slice().sort((a,b)=>a.hp/a.max-b.hp/b.max)[0];
const nm=u=>`<b>${u.name}</b>`;
const EFF={
 pepite(P,E){const t=weakest(aliveS(1-P.side));if(!t)return null;return{tg:[t],kind:'hit',ap:()=>{const d=petHit(P,t,E.hit);return`${nm(t)} −${fmt(d)}`}}},
 mousse(P,E){const L=aliveS(P.side);if(!L.length)return null;return{tg:L,kind:'heal',ap:()=>{let s=0;for(const u of L){const h0=u.hp;heal(u,u.max*E.heal/100);s+=Math.max(0,u.hp-h0)}return T(`toute l'équipe +${fmt(s)} PV`,`whole team +${fmt(s)} HP`)}}},
 braise(P,E){const L=aliveS(1-P.side);if(!L.length)return null;const tg=L.slice().sort(()=>Math.random()-.5).slice(0,E.n);return{tg,kind:'hit',ap:()=>tg.map(t=>{const d=petHit(P,t,E.hit);if(t.hp>0){const v=P.atk*E.burn/100;if(!t.dot||t.dot.v<v)t.dot={v,t:2};float(t,'🔥','dot')}return`${nm(t)} −${fmt(d)} 🔥`}).join(', ')}},
 givrelle(P,E){const L=aliveS(P.side).sort((a,b)=>a.hp/a.max-b.hp/b.max).slice(0,E.n);if(!L.length)return null;return{tg:L,kind:'heal',ap:()=>L.map(u=>{const v=Math.round(u.max*E.sh/100);u.sh=(u.sh||0)+v;float(u,'🛡 +'+fmt(v),'heal');return`${nm(u)} 🛡 ${fmt(v)}`}).join(', ')}},
 lumi(P,E){const L=aliveS(P.side);if(!L.length)return null;const nf=L.filter(u=>(u.en||0)<100&&u.sk);const t=(nf.length?nf:L).sort((a,b)=>(b.en||0)-(a.en||0))[0];
  return{tg:[t],kind:'heal',ap:()=>{t.en=Math.min(100,(t.en||0)+E.en);float(t,'⚡+'+E.en,'heal');return`${nm(t)} ⚡ +${E.en}`}}},
 jeton(P,E){const heads=Math.random()<.5;if(heads){const L=aliveS(1-P.side);if(!L.length)return null;const t=pick(L);return{tg:[t],kind:'hit',tag:T('🪙 Face !','🪙 Heads!'),ap:()=>{const d=petHit(P,t,E.hit);return`${T('Face','Heads')} : ${nm(t)} −${fmt(d)}`}}}
  if(!E.tail)return{tg:[],kind:'none',tag:T('🪙 Pile…','🪙 Tails…'),ap:()=>T('Pile… rien cette fois !','Tails… nothing this time!')};
  const L=aliveS(P.side);return{tg:L,kind:'heal',tag:T('🪙 Pile','🪙 Tails'),ap:()=>{for(const u of L)u.en=Math.min(100,(u.en||0)+E.tail);return T(`Pile : toute l'équipe ⚡ +${E.tail}`,`Tails: whole team ⚡ +${E.tail}`)}}},
 plumet(P,E){const t=weakest(aliveS(1-P.side));if(!t)return null;return{tg:[t],kind:'hit',ap:()=>{const d=petHit(P,t,E.hit);if(t.hp>0){t.markT=Math.max(t.markT||0,E.mk);P.focus=t;float(t,'🎯','crit')}return`${nm(t)} ${T('marqué','marked')} 🎯 −${fmt(d)}`}}},
 fumerolle(P,E){const L=aliveS(1-P.side);if(!L.length)return null;return{tg:L,kind:'hit',ap:()=>{let s=0;for(const t of L)s+=petHit(P,t,E.hit);return T(`tous les ennemis, −${fmt(s)} au total`,`all enemies, −${fmt(s)} total`)}}},
 grandduc(P,E){const L=aliveS(1-P.side);if(!L.length)return null;const sl=L.slice().sort((a,b)=>(b.en||0)-(a.en||0)).slice(0,E.n);
  return{tg:L,kind:'hit',ap:()=>{let s=0;for(const t of L)s+=petHit(P,t,E.hit);
   for(const t of sl){if(t.hp<=0)continue;t.en=Math.max(0,(t.en||0)-E.en);if(!t.ptSlow){t.ptSpd=t.spd;t.spd=Math.round(t.spd*.3)}t.ptSlow=B.round+1;float(t,'❄️','info')}
   return T(`tous les ennemis −${fmt(s)} · ❄️ ${sl.map(nm).join(', ')} ralenti${sl.length>1?'s':''}`,`all enemies −${fmt(s)} · ❄️ ${sl.map(nm).join(', ')} slowed`)}}}};

/* le vol du familier vers ses cibles (canvas des effets, une seule fois par action) */
function medPos(P){const el=document.getElementById('ptm'+P.side);if(!el||!FXS.box)return null;const r=el.getBoundingClientRect();return{x:r.left-FXS.box.left+r.width/2,y:r.top-FXS.box.top+r.height/2}}
async function fly(P,e){if(!e.tg.length)return;try{fxSetup()}catch(er){return}const a=medPos(P);if(!a)return;const col=PETS[P.k].col;
  for(const t of e.tg){const b=uc(t);const dl=Math.random()*60;
    fxItem(330+dl,(c,p)=>{p=Math.max(0,(p*(330+dl)-dl)/330);if(p<=0)return;const q=ease(p),x=lerp(a.x,b.x,q),y=lerp(a.y,b.y,q)-Math.sin(q*Math.PI)*36;
      c.globalCompositeOperation='lighter';for(let k=0;k<6;k++){const qq=Math.max(0,q-k*.05),xx=lerp(a.x,b.x,qq),yy=lerp(a.y,b.y,qq)-Math.sin(qq*Math.PI)*36;c.globalAlpha=(1-k/6)*.55;c.fillStyle=col;c.beginPath();c.arc(xx,yy,7-k,0,6.283);c.fill()}
      c.globalAlpha=1;c.fillStyle='#fff';c.beginPath();c.arc(x,y,3.4,0,6.283);c.fill()})}
  await fxWait(360)}
function bubble(P,txt){const el=document.getElementById('ptm'+P.side);if(!el)return;el.classList.remove('go');void el.offsetWidth;el.classList.add('go');
  const b=document.createElement('div');b.className='ptbub';b.textContent=txt;el.parentElement.appendChild(b);setTimeout(()=>b.remove(),1300)}
async function petAct(P){const E=effNums(P.k,P.l,P.s);const e=EFF[P.k](P,E);if(!e)return;
  const name=T(PETS[P.k].sk[0],PETS[P.k].sk[1]);const fast=B.skip||REDUCED;
  if(!fast){bubble(P,e.tag||(PETS[P.k].ic+' '+name));await wait(180);if(!B||B.done)return;await fly(P,e);if(!B||B.done)return}
  const txt=e.ap();if(!fast&&e.kind==='heal')try{for(const u of e.tg){const p=uc(u);sparks(p.x,p.y,PETS[P.k].col,6,3,1.6,18)}}catch(er){}
  log(`🐾 <b>${esc(P.nm)}</b> · ${name} : ${txt}`,'pet');refreshUnits();if(!fast)await wait(240)}
async function petRound(){
  /* fin des ralentissements du tour précédent */
  for(const u of B.units)if(u.ptSlow&&u.ptSlow<=B.round){if(u.ptSpd!=null)u.spd=u.ptSpd;u.ptSlow=0;u.ptSpd=null}
  if(B.round%2!==1)return;
  for(const P of B.pets){if(!P||!B||B.done)continue;if(!aliveS(P.side).length||!aliveS(1-P.side).length)break;await petAct(P)}}
{const a0=act;act=async function(u){
  try{if(B&&B.pets&&B.round!==B.petR){B.petR=B.round;await petRound();if(!B||B.done)return;if(u&&u.hp<=0){refreshUnits();return}}}catch(e){console.warn('v446 round',e)}
  return a0.apply(this,arguments)}}
/* Œil de nuit : ton équipe vise la cible marquée en priorité */
{const pt=pickT;pickT=function(u){const t=pt.apply(this,arguments);
  try{const P=B&&B.pets&&B.pets[u.side];const m=P&&P.focus;
    if(m&&m.hp>0&&m.markT>0&&m.side!==u.side&&t&&t!==m&&!(t.taunt>0)&&!(typeof CRV!=='undefined'&&m.hid===CRV&&(B.round||1)<=2)&&!(B.duel&&B.duel.until>=B.round)&&Math.random()<.3)return m}catch(e){}
  return t}}

/* ================= RÉCOMPENSES ================= */
function petRewards(c,b){const p=PS();const rw=[];let ber=0,egg=null;
  if(c.mode==='stage'&&c.win){const boss=c.arg%10===0;ber+=boss?3:(Math.random()<.12?1:0);
    if(boss&&c.arg>c.max0){egg=addEgg(roll([40,35,19,6]))}
    const mp=myPet();if(mp&&mp.k==='pepite'){const g=S.gold-c.gold0;const bonus=Math.round(Math.max(0,g)*[5,10,15][stOf(mp.l)-1]/100);if(bonus>0){S.gold+=bonus;rw.push(`🦎 ${esc(pn('pepite',stOf(mp.l)))} : ${GOLD}+${fmt(bonus)} ${T('or','gold')}`)}}}
  else if(c.mode==='arena'&&c.win)ber+=1;
  else if(c.mode==='tower'&&c.win)ber+=1;
  else if(c.mode==='raid'){const ratio=c.dmg/Math.max(1,c.pw);let t=0;[1.2,2.2,3.2,4.2].forEach(x=>{if(ratio>=x)t++});ber+=[0,1,2,3,5][t];if(t===4&&Math.random()<.25)egg=addEgg(roll([30,40,22,8]))}
  else if(c.mode==='event')ber+=1;
  if(ber>0){p.b+=ber;rw.push(`${BER} +${ber} ${T(ber>1?'baies':'baie',ber>1?'berries':'berry')}`)}
  if(egg)rw.push(`${EGG} ${T('Œuf','Egg')} ${rn(egg.r).toLowerCase()} !`);
  if(rw.length){save();setTimeout(()=>{const box=document.querySelector('#battle .result .rw');if(box)box.insertAdjacentHTML('beforeend',rw.map(x=>`<span class="ptrw">${x}</span>`).join(''))},30)}}
{const f0=finish;finish=function(res){const b=B;if(!b||b.done)return f0.apply(this,arguments);
  const c={mode:b.mode,arg:b.arg,max0:S.max,gold0:S.gold,pw:b.pw};
  const r=f0.apply(this,arguments);
  try{c.win=b.res===1||res===true;c.dmg=b.units.filter(u=>u.side===0).reduce((a,u)=>a+(u.dmg||0),0);petRewards(c,b)}catch(e){console.warn('v446 rw',e)}
  return r}}
/* coffre d'expédition et coffre du jour */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="idle"],[data-a="bonus"]');if(!t||t.disabled)return;
  const a=t.dataset.a,idle0=S.idle,bon0=S.daily&&S.daily.bonus;
  setTimeout(()=>{try{const p=PS();
    if(a==='idle'&&S.idle!==idle0){const h=Math.min(8,Math.max(0,(S.idle-idle0)/36e5));const ber=Math.floor(h);let egg=null;if(h>=4&&Math.random()<.15)egg=addEgg(roll([55,30,12,3]));
      if(ber||egg){p.b+=ber;save();setTimeout(()=>toast(`${ber?`${BER} +${ber} ${T(ber>1?'baies':'baie',ber>1?'berries':'berry')}`:''}${ber&&egg?' · ':''}${egg?`${EGG} ${T('Œuf','Egg')} ${rn(egg.r).toLowerCase()} !`:''} — ${T('Ménagerie','Menagerie')}`),1300)}}
    if(a==='bonus'&&S.daily&&S.daily.bonus&&!bon0){p.b+=5;const eg=addEgg(roll([55,30,12,3]));save();setTimeout(()=>toast(`${EGG} ${T('Œuf','Egg')} ${rn(eg.r).toLowerCase()} · ${BER} +5 ${T('baies','berries')} — ${T('Ménagerie','Menagerie')}`),1300)}
  }catch(er){}},0)},true);
/* la carte du coffre du jour annonce aussi l'œuf */
{const r0=render;render=function(){const x=r0.apply(this,arguments);try{const c=document.querySelector('#main .card.q [data-a="bonus"]');const r=c&&c.closest('.card').querySelector('.r');if(r&&!r.querySelector('.ptq'))r.insertAdjacentHTML('beforeend',`<span class="ptq"> · ${EGG}+1 · ${BER}+5</span>`)}catch(e){}
  /* arène : le familier de chaque adversaire, à côté de son équipe */
  try{document.querySelectorAll('#main .card.opp').forEach(c=>{const ot=c.querySelector('.oteam'),bt=c.querySelector('[data-a="arena"]');if(!ot||!bt||ot.querySelector('.ptopp'))return;
    const row=rowById(bt.dataset.v);const q=row&&petOfRow(row);if(!q)return;const st=stOf(q.l);
    ot.insertAdjacentHTML('beforeend',`<span class="ptopp" style="--rc:${RR[PETS[q.k].r].c}" title="${esc(pn(q.k,st))} · ${T('niv.','lv.')} ${q.l}"><img src="${petImg(q.k,st)}" alt=""><i>${q.l}</i></span>`)})}catch(e){}
  return x}}

/* ================= PARTAGE (vrais joueurs) ================= */
let pushK='',pushT=0;
function petPushSoon(){pushT=now()}
setInterval(()=>{try{if(typeof NET==='undefined'||!NET.on||!NET.canWrite||!NET.pid||!S.name)return;const m=myPet();const pet=m?{k:m.k,l:m.l,s:m.s}:null;const k=JSON.stringify(pet);if(k===pushK)return;pushK=k;
  NET.db.doc('players/'+NET.pid).update({pet}).catch(()=>{pushK=''})}catch(e){}},20000);

/* ================= STYLE ================= */
const st=document.createElement('style');st.id='v446css';st.textContent=`
.lpl[data-v="pets"],.lbh[data-v="pets"],body[data-lz="pets"] #main .lzbar{--jw:#7fe36a}
.ptpage{display:flex;flex-direction:column;gap:12px}
.ptshow{--pk:#7c5cff;position:relative;overflow:hidden;display:grid;grid-template-columns:minmax(0,1fr);padding:0!important;
 background:radial-gradient(120% 70% at 50% 18%,rgba(255,255,255,.08),transparent 60%),linear-gradient(180deg,#2c2165,#1a1440)!important}
@supports (color:color-mix(in srgb,red,blue)){.ptshow{background:radial-gradient(120% 64% at 50% 20%,color-mix(in srgb,var(--pk) 30%,transparent),transparent 66%),linear-gradient(180deg,#2c2165,#1a1440)!important}}
.ptstage{position:relative;height:210px;display:grid;place-items:center;isolation:isolate}
.ptrays{position:absolute;left:50%;top:50%;width:520px;height:520px;margin:-260px 0 0 -260px;z-index:-1;pointer-events:none;
 background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 10deg,rgba(255,255,255,.07) 10deg 14deg);
 -webkit-mask-image:radial-gradient(closest-side,#000 14%,rgba(0,0,0,.5) 40%,transparent 68%);mask-image:radial-gradient(closest-side,#000 14%,rgba(0,0,0,.5) 40%,transparent 68%);animation:ptrays 80s linear infinite}
.ptstage::after{content:'';position:absolute;left:50%;bottom:18px;width:150px;height:22px;margin-left:-75px;border-radius:50%;z-index:-1;background:radial-gradient(closest-side,rgba(0,0,0,.45),transparent)}
.ptbig{background:none;border:0;padding:0;cursor:pointer;border-radius:50%;-webkit-tap-highlight-color:transparent}
.ptbig:disabled{cursor:default}
.ptbimg{width:190px;height:190px;display:block;animation:ptbob 3.2s ease-in-out infinite;transform-origin:50% 92%}
.ptlock .ptbimg{filter:brightness(0) opacity(.42);animation:none}
.ptbig.hop .ptbimg{animation:pthop .45s ease-out}
.ptactb{position:absolute;top:12px;left:12px;font:900 10.5px var(--fb);letter-spacing:.04em;color:#0e2a14;background:linear-gradient(180deg,#a8ffb0,#5fd36a);border-radius:99px;padding:4px 10px;box-shadow:0 2px 0 rgba(0,0,0,.25)}
.ptinfo{padding:4px 16px 16px;text-align:center}
.ptname{font-family:var(--fd,inherit);font-size:24px;line-height:1.1;color:#fff6e4;text-shadow:0 2px 0 rgba(22,10,48,.95),0 0 1.5px rgba(22,10,48,.95)}
.ptrar{display:inline-block;vertical-align:5px;margin-left:4px;font:900 10px var(--fb);letter-spacing:.06em;padding:3px 8px;border-radius:99px;color:#160c2a;background:var(--rc);text-shadow:none}
.ptsub{margin:4px 0 10px;color:#c9bfe8;font-size:13px}
.ptst{color:#ffd84a;letter-spacing:1px;margin-left:4px}.ptst i{font-style:normal;color:rgba(255,255,255,.18)}
.ptlvl{display:grid;grid-template-columns:auto minmax(0,1fr);align-items:center;gap:4px 10px;text-align:left;margin:0 0 10px}
.ptlvl b{font-size:15px;color:#fff}.ptlvl .bar{height:10px}.ptlvl small{grid-column:1/-1;color:#bdb1e3;font-size:12px}
.ptlvl .bar>i{background:linear-gradient(90deg,#a8ffb0,#4fd38a)!important}
.pteff,.pteff2{text-align:left;font-size:13px;line-height:1.45;color:#e8e2ff;background:rgba(255,255,255,.06);border:1px solid rgba(255,255,255,.1);border-radius:12px;padding:9px 11px;margin:0 0 10px}
.pteff b,.pteff2 b{color:#fff}
.ptbtns{gap:8px;justify-content:center}.ptbtns .btn{flex:1 1 0;min-width:0}
.ptgo{width:100%;margin-top:8px}
.ptpat{font-size:12px;margin:8px 0 0}
.ptdesc{color:#d8d0f4;margin:6px 0 12px}
.ptnone .ptbimg{animation:ptwob 2.6s ease-in-out infinite}
.ptnests{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.ptnest{display:flex;flex-direction:column;align-items:center;gap:4px;padding:10px 8px;border-radius:14px;background:rgba(255,255,255,.05);border:1px solid rgba(255,255,255,.1);min-height:150px;justify-content:center}
.ptnest.ready{border-color:var(--rc);box-shadow:0 0 18px -6px var(--rc),inset 0 0 0 1px var(--rc)}
.ptnest.empty{opacity:.6}
.ptnimg{width:72px;height:72px;font-size:42px;display:grid;place-items:center}
.ptnimg.wob{animation:ptwob 1.6s ease-in-out infinite}
.ptnest .bar{width:100%;height:7px}.ptnest .bar>i{background:var(--rc)!important}
.ptnest small{font-size:11.5px;color:#cfc6ec}
.pteggs{display:flex;flex-wrap:wrap;gap:8px}
.ptegg{flex:0 0 calc(33.33% - 6px);display:flex;flex-direction:column;align-items:center;gap:2px;padding:8px 4px;border-radius:12px;background:rgba(255,255,255,.04);border:1px solid color-mix(in srgb,var(--rc) 40%,transparent)}
.ptegg img{width:54px;height:54px}.ptegg small{font-size:11px}
.ptegg .btn{margin-top:4px;width:100%}
.pttiles{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}
.pttile{position:relative;display:flex;flex-direction:column;align-items:center;gap:1px;padding:8px 4px 7px;border-radius:14px;cursor:pointer;color:#fff;
 background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(255,255,255,.02));border:1px solid rgba(255,255,255,.12);box-shadow:inset 0 -3px 0 var(--rc)}
.pttile img{width:70px;height:70px}
.pttile b{font-size:11.5px;line-height:1.15;text-align:center;max-width:100%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.pttile small{font-size:10.5px;color:#bdb1e3}
.pttile.off img{filter:brightness(0) opacity(.38)}.pttile.off b{color:#9d92c4}
.pttile.on{border-color:#ffd84a;box-shadow:inset 0 -3px 0 var(--rc),0 0 0 2px rgba(255,216,74,.55)}
.ptpaw{position:absolute;top:4px;right:6px;font-size:13px}
.ptbuy{display:grid;grid-template-columns:52px minmax(0,1fr) auto;align-items:center;gap:10px;padding:8px 0;border-top:1px solid rgba(255,255,255,.08)}
.ptbuy:first-of-type{border-top:0}
.ptbuy img{width:52px;height:52px}.ptbuy b{display:block;font-size:14px}.ptbuy small{display:block;font-size:11.5px;color:#cfc6ec}
.ptbig2{display:grid;place-items:center;width:52px;height:52px}.ptbig2 .ic{width:40px;height:40px}
.ptwhere ul{margin:4px 0 0;padding:0;list-style:none;display:flex;flex-direction:column;gap:6px;font-size:13px;color:#e2dbff}
.ptwhere li .ic{vertical-align:-3px;margin-right:4px}
.ptber{text-align:center;font-size:13px;margin:0}
.ptpop{position:fixed;z-index:100004;pointer-events:none;font:900 15px var(--fb);color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.5);transform:translate(-50%,0);animation:ptpop 1.1s ease-out forwards}
.ptpop.xp{color:#a8ffb0}.ptpop.lv{color:#ffd84a;font-size:18px}.ptpop.heart{font-size:22px}
.ptrw{color:#c8ffd8}
/* combat */
#battle .side.haspet{padding-top:48px!important}
#battle .ptmed{position:absolute;right:8px;top:-16px;width:44px;height:44px;border-radius:50%;z-index:4;pointer-events:none;
 background:radial-gradient(circle at 50% 35%,#4a3a8e,#1a1240);box-shadow:0 0 0 2px var(--rc),0 0 0 4px #140c24,0 6px 14px rgba(0,0,0,.5)}
#battle .ptmed img{position:absolute;left:50%;bottom:-2px;width:56px;height:56px;margin-left:-28px}
#battle .ptmed b{position:absolute;left:-6px;bottom:-4px;min-width:18px;height:18px;padding:0 4px;border-radius:9px;font:900 10.5px/18px var(--fb);text-align:center;color:#160c2a;background:var(--rc);box-shadow:0 0 0 2px #140c24}
#battle .ptmed.go{animation:pthop .5s ease-out}
#battle .ptmn{position:absolute;right:60px;top:8px;z-index:4;font:800 10.5px var(--fb);color:#e8e0ff;opacity:.9;white-space:nowrap;max-width:46%;overflow:hidden;text-overflow:ellipsis;pointer-events:none}
#battle .ptbub{position:absolute;right:58px;top:-18px;z-index:5;pointer-events:none;font:900 12px var(--fb);color:#fff;white-space:nowrap;padding:4px 10px;border-radius:99px;
 background:linear-gradient(180deg,rgba(40,28,92,.96),rgba(16,10,40,.96));border:1.5px solid var(--rc,#ffd84a);box-shadow:0 4px 12px rgba(0,0,0,.5);animation:ptbub 1.3s ease-out forwards}
#battle .log>.pet{color:#c8ffd8}
#main .oteam .ptopp{position:relative;display:inline-grid;place-items:center;width:36px;height:36px;border-radius:50%;margin:1px 0 0 4px;overflow:visible;border:0;vertical-align:middle;background:radial-gradient(circle at 50% 35%,#4a3a8e,#1a1240);box-shadow:0 0 0 2px var(--rc),0 0 0 3.5px #140c24;--rc:#aab3bb}
#main .oteam .ptopp img{width:40px;height:40px;margin-top:-8px}
#main .oteam .ptopp i{position:absolute;right:-5px;left:auto;bottom:-4px;font:900 9.5px/15px var(--fb);font-style:normal;min-width:15px;height:15px;padding:0 3px;border-radius:8px;color:#160c2a;background:var(--rc);box-shadow:0 0 0 1.5px #140c24}
/* éclosion */
.pthatch{position:relative;min-height:420px;display:flex;flex-direction:column;align-items:center;justify-content:flex-start;padding-top:26px;isolation:isolate;overflow:hidden;cursor:pointer}
.pthatch .ptrays.big{width:700px;height:700px;margin:-350px 0 0 -350px;top:150px;opacity:.5;transition:opacity .4s}
@supports (color:color-mix(in srgb,red,blue)){.pthatch .ptrays.big{background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 9deg,color-mix(in srgb,var(--rc) 45%,transparent) 9deg 13deg)}}
.pthatch.s3 .ptrays.big{opacity:1}
.pthatch .pthegg,.pthatch .pthpet{position:absolute;top:50px;left:50%;width:200px;height:200px;margin-left:-100px}
.pthatch .pthegg{animation:ptwob .5s ease-in-out infinite}
.pthatch.s2 .pthegg{animation:none;opacity:0;transform:scale(1.4);transition:opacity .2s,transform .2s}
.pthatch .pthpet{opacity:0;transform:scale(.3)}
.pthatch.s3 .pthpet{opacity:1;transform:none;transition:transform .5s cubic-bezier(.3,1.6,.5,1),opacity .2s}
.pthatch .ptflash{position:absolute;left:50%;top:150px;width:20px;height:20px;margin:-10px 0 0 -10px;border-radius:50%;background:#fff;opacity:0;pointer-events:none;z-index:3}
.pthatch.s2 .ptflash{animation:ptflash .6s ease-out}
.pthatch .ptconf{position:absolute;left:50%;top:150px;width:0;height:0;z-index:2}
.pthatch .ptconf i{position:absolute;width:8px;height:8px;margin:-4px;border-radius:2px;background:var(--c);opacity:0}
.pthatch.s3 .ptconf i{animation:ptconf .9s ease-out forwards}
.pthatch .pthtx{margin-top:250px;text-align:center;opacity:0;transform:translateY(10px);padding:0 6px}
.pthatch.s3 .pthtx{opacity:1;transform:none;transition:opacity .35s .25s,transform .35s .25s}
.pthatch .pthtx .h{color:#ffd84a;margin-bottom:2px}
.pthatch .pteff2{margin:8px 0 12px}
.pthatch.evo .pthegg{animation:none}
@keyframes ptrays{to{transform:rotate(360deg)}}
@keyframes ptbob{0%,100%{transform:translateY(0)}50%{transform:translateY(-6px)}}
@keyframes pthop{0%{transform:none}35%{transform:translateY(-10px) scale(1.12,.94)}70%{transform:translateY(0) scale(.94,1.06)}100%{transform:none}}
@keyframes ptwob{0%,100%{transform:rotate(0)}25%{transform:rotate(-7deg)}75%{transform:rotate(7deg)}}
@keyframes ptpop{0%{opacity:0;transform:translate(-50%,6px) scale(.7)}20%{opacity:1;transform:translate(-50%,-6px) scale(1.1)}100%{opacity:0;transform:translate(-50%,-48px) scale(1)}}
@keyframes ptbub{0%{opacity:0;transform:translateY(6px) scale(.8)}15%{opacity:1;transform:none}75%{opacity:1}100%{opacity:0;transform:translateY(-6px)}}
@keyframes ptflash{0%{opacity:.95;transform:scale(1)}100%{opacity:0;transform:scale(28)}}
@keyframes ptconf{0%{opacity:1;transform:rotate(var(--a)) translateY(0)}100%{opacity:0;transform:rotate(var(--a)) translateY(calc(-1*var(--d))) rotate(200deg)}}
@media (prefers-reduced-motion:reduce){.ptrays,.ptbimg,.ptnimg.wob,.ptnone .ptbimg{animation:none!important}}
body.rdlite .ptrays,body.rdlite .ptbimg{animation:none!important}
@media (min-width:900px) and (min-aspect-ratio:5/4){
 .ptshow{grid-template-columns:300px minmax(0,1fr)}.ptstage{height:auto;min-height:280px}.ptbimg{width:230px;height:230px}
 .ptinfo{text-align:left;padding:18px 20px}.pttiles{grid-template-columns:repeat(9,minmax(0,1fr))}
}`;
document.head.appendChild(st);

/* ================= NOTES DE VERSION ================= */
try{const it=[
 "🐾 <b>Nouveau : la Ménagerie !</b> Dans la Caserne des héros, fais éclore des œufs et adopte des <b>familiers</b> : 9 compagnons, de la salamandre dorée au bébé dragon, avec deux hiboux 🦉. Un œuf rare de bienvenue t'attend (il éclot en 1 minute).",
 "⚔️ En combat, ton familier accompagne ton équipe et agit <b>tous les 2 tours</b> : souffle de flammes, bouclier de givre, soins, énergie pour l'ultime, pile ou face… Dans l'arène, l'adversaire a aussi le sien : mêmes règles pour tout le monde.",
 "🫐 Nourris-le de <b>baies</b> pour le monter jusqu'au niveau 30 : il <b>évolue</b> aux niveaux 10 et 20, avec un nouveau dessin à chaque stade. Les doublons lui donnent des étoiles. Caresse-le chaque jour : +2 baies.",
 "🥚 Œufs et baies : coffre du jour, boss d'étape, coffre d'expédition, raids, arène, tour, et la boutique de la Ménagerie."];
 PATCH.unshift({v:'v71',d:now(),t:'La Ménagerie',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['La Ménagerie']='The Menagerie';
  I18N_EN[it[0]]="🐾 <b>New: the Menagerie!</b> In the Heroes' Barracks, hatch eggs and adopt <b>familiars</b>: 9 companions, from the golden salamander to the baby dragon, with two owls 🦉. A rare welcome egg is waiting for you (it hatches in 1 minute).";
  I18N_EN[it[1]]="⚔️ In battle, your familiar joins your team and acts <b>every 2 turns</b>: fire breath, frost shield, heals, energy for the ultimate, heads or tails… In the arena your opponent has one too: same rules for everyone.";
  I18N_EN[it[2]]="🫐 Feed it <b>berries</b> to raise it to level 30: it <b>evolves</b> at levels 10 and 20, with a new look at each stage. Duplicates give it stars. Pet it every day: +2 berries.";
  I18N_EN[it[3]]="🥚 Eggs and berries: daily chest, stage bosses, expedition chest, raids, arena, tower, and the Menagerie shop."}}catch(e){}
}catch(e){console.warn('v446',e)}})();
