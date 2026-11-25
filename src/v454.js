
/* ================= V454 : LE MODE CAUCHEMAR + LE VRAI CLASSEMENT « PROGRESSION » =================
   Après le mode Difficile : 100 étapes dans 10 mondes de cauchemar, 60 monstres (dont 10 boss, et 5 dessinés de zéro),
   une règle spéciale par monde, 10 nouveaux décors, et de nouvelles récompenses (cadre, fond de profil, titre, œufs).
   Le classement « Progression » compte maintenant Facile + Normal + Difficile + Cauchemar (tout le monde était bloqué à « Étape 100 »).
   Bonus : l'écran « Choisir ses héros » affichait la puissance conseillée du mauvais mode en Normal et en Difficile. */
(function(){try{
if(typeof HWORLDS==='undefined'||typeof NWORLDS==='undefined'||typeof hBattle!=='function'||typeof NMAP==='undefined'||typeof nmonArt!=='function')return;
const EN={};const tr=(fr,en)=>{if(en!=null)EN[fr]=en;return fr};
/* traductions d'un texte avec des balises : morceau par morceau, nombres remplacés par # */
const spl=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));
const put=(fr,en)=>{try{const f=spl(fr),g=spl(en);if(f.length!==g.length)return;f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})}catch(e){}};
let CMODE=0;

/* ---------- la courbe de puissance (après le mode Difficile : 454 k à l'étape 100) ---------- */
const CMT=[[1,385000],[25,430000],[50,480000],[75,540000],[90,580000],[100,610000]];
const cRecRaw=n=>lerpT(CMT,n);
function cRecD(n){return Math.round(cRecRaw(n)*(n%10===0?1.1:1)*1.25/1000)*1000}
/* réglage fin (calibré sur des combats simulés, comme le mode Difficile) */
const CT={k:1,cf:[[1,1.42],[50,1.5],[100,1.6]],wf:[.8,.76,.77,.82,.95,.95,.87,.72,.8,.8],wb:[.62,.68,.65,.79,.84,.85,.74,.65,.79,.78]};
const cCf=s=>lerpT(CT.cf,s);
const cOpen=()=>(S.hmax||0)>=100;
function cInit(){if(S.cmax==null)S.cmax=0;S.cstage=Math.min(100,(S.cmax||0)+1)}

/* ---------- les règles du cauchemar (une par monde) ---------- */
const RULES={
 rev:{ic:'🔁',n:tr('Ils reviennent','They come back'),d:tr('Chaque monstre se relève une fois, avec 30 % de ses PV.','Every monster gets back up once, with 30% of its HP.')},
 heal:{ic:'🥀',n:tr('Les murmures','The whispers'),d:tr('Tous les soins sont réduits de 40 %.','All healing is reduced by 40%.'),hm:.6},
 crit:{ic:'🎭',n:tr('Rires fous','Mad laughter'),d:tr('Les monstres ont +25 % de chances de coup critique.','Monsters have +25% critical hit chance.')},
 en:{ic:'⏰',n:tr('Heures folles','Mad hours'),d:tr('Les monstres commencent avec la moitié de leur énergie : leurs ultimes arrivent bien plus tôt.','Monsters start with half their energy: their ultimates come much sooner.')},
 shield:{ic:'🪞',n:tr('Reflets','Reflections'),d:tr("Les monstres commencent avec un bouclier de 25 % de leurs PV.",'Monsters start with a shield worth 25% of their HP.')},
 fear:{ic:'👻',n:tr('La peur','Fear'),d:tr('Tes héros font 15 % de dégâts en moins.','Your heroes deal 15% less damage.')},
 spd:{ic:'🎻',n:tr('Danse macabre','Danse macabre'),d:tr('Les monstres sont 30 % plus rapides.','Monsters are 30% faster.')},
 dmg:{ic:'🔥',n:tr('Le feu des peurs','Fire of fears'),d:tr('Tes héros subissent 20 % de dégâts en plus.','Your heroes take 20% more damage.')},
 ult:{ic:'🌌',n:tr('Ciel renversé','Upside-down sky'),d:tr('Les ultimes de tes héros font 25 % de dégâts en moins.',"Your heroes' ultimates deal 25% less damage.")},
 final:{ic:'🌙',n:tr('Le Grand Sommeil','The Great Sleep'),d:tr('Soins réduits de 30 %, et chaque monstre se relève une fois (30 % de PV).','Healing reduced by 30%, and every monster gets back up once (30% HP).'),hm:.7}};

/* ---------- les 10 mondes ---------- */
const CW=[
 {n:'La Chambre Sans Fin',en:'The Endless Bedroom',h:285,r:'rev',pf:9,m:[['Poupée Fêlée',0,0,0,'Cracked Doll'],['Ombre sous le Lit','Ombre Vorace',{to:285,sat:.7,light:.6},['nmeyes','nmsmoke'],'Shadow Under the Bed'],['Nounours Maudit','Ourse Ronce',{to:15,sat:.5,light:.8},['nmstitch','nmeyes'],'Cursed Teddy'],['Veilleuse Éteinte','Citrouille Maudite',{to:275,sat:.55,light:.7},['nmsmoke'],'Dead Night-Light'],['Araignée du Plafond','Araignée Sylvestre',{to:290,sat:.45,light:.55},['nmeyes'],'Ceiling Spider']],
  b:['Croque-Mitaine',0,0,0,'The Bogeyman'],bs:['Sous ton lit','Under Your Bed']},
 {n:'Le Bois des Murmures',en:'The Whispering Woods',h:160,r:'heal',pf:2,m:[['Arbre aux Visages','Ent Tordu',{to:150,sat:.5,light:.6},['nmeyes'],'Tree of Faces'],['Loup Sans Ombre','Loup Galeux',{to:200,sat:.3,light:.55},['spectral','nmsmoke'],'Shadowless Wolf'],['Corbeau Murmurant','Phénix Noir',{to:250,sat:.25,light:.5},['nmeyes'],'Whispering Crow'],['Feu Follet Menteur','Feu Follet',{to:140,sat:1.2},['eye3'],'Lying Will-o-Wisp'],['Faune Sans Sommeil','Faune Sauvage',{to:170,sat:.4,light:.6},['nmeyes','horns'],'Sleepless Faun']],
  b:['La Dame des Murmures','Sorcière des Brumes',{to:150,sat:.6,light:.7},['spectral','nmcrown'],'The Lady of Whispers'],bs:['Mille murmures','A Thousand Whispers']},
 {n:'Le Carnaval Brisé',en:'The Broken Carnival',h:340,r:'crit',pf:12,m:[['Masque Rieur',0,0,0,'Laughing Mask'],['Clown Triste','Arlequin du Néant',{to:220,sat:.5},['nmstitch'],'Sad Clown'],['Chapiteau Vivant','Champignon Rageur',{to:350,sat:1.1},['nmeyes'],'Living Big Top'],['Jongleur Fou','Diablotin',{to:320,sat:.9},['mask'],'Mad Juggler'],['Lion de Cirque Fou','Chimère',{to:330,sat:.6,light:.85},['nmstitch'],'Mad Circus Lion']],
  b:['La Reine des Rires','Reine de Pique',{to:330,sat:1.1},['nmcrown','nmeyes'],'The Queen of Laughter'],bs:['Dernier tour de piste','Final Lap of the Ring']},
 {n:"L'Horlogerie Folle",en:'The Mad Clockworks',h:38,r:'en',pf:8,m:[['Horloge Hurlante',0,0,0,'Howling Clock'],['Rouage Mordeur','Golem Runique',{metal:1},['gears','nmeyes'],'Biting Cog'],['Coucou Fou','Harpie des Cimes',{to:30,sat:.8},['gears'],'Mad Cuckoo'],['Pendule Pendu','Sangsue Géante',{to:40,sat:.7,light:1.1},['gears'],'Hanged Pendulum'],['Automate Brisé','Chevalier Déchu',{metal:1,light:.9},['gears','nmstitch'],'Broken Automaton']],
  b:['Le Maître des Heures Mortes','Sphinx des Sabliers',{to:30,sat:.9},['gears','nmcrown'],'The Master of Dead Hours'],bs:['Minuit éternel','Eternal Midnight']},
 {n:'Le Lac des Reflets',en:'The Lake of Reflections',h:195,r:'shield',pf:6,m:[['Noyé Souriant','Spectre Noyé',{to:190,sat:.6,light:.8},['nmeyes'],'Smiling Drowned'],['Reflet Trompeur','Ombre du Néant',{to:190,sat:.8},['spectral'],'Deceiving Reflection'],['Sirène Sans Voix','Sirène Hurlante',{to:200,sat:.4,light:.75},['nmstitch'],'Voiceless Siren'],['Kraken des Rêves Noyés','Kraken Juvénile',{to:220,sat:.5},['nmeyes'],'Kraken of Drowned Dreams'],['Crabe Miroir','Crabe Blindé',{to:195,sat:.4,light:1.1},['crystal'],'Mirror Crab']],
  b:['La Reine du Miroir Noir','Givrelle',{to:250,sat:.6,light:.6},['nmcrown','spectral'],'The Queen of the Black Mirror'],bs:['Reflet brisé','Shattered Reflection']},
 {n:'Le Manoir des Pas Perdus',en:'The Manor of Lost Steps',h:330,r:'fear',pf:7,m:[['Armure Vide','Vesperax',{to:330,sat:.4},['nmeyes'],'Empty Armor'],['Flamme de Chandelle','Djinn Mineur',{to:35,sat:1.2},['nmsmoke'],'Candle Flame'],['Majordome Squelette','Liche',{to:330,sat:.4},['nmstitch'],'Skeleton Butler'],["Fantôme de l'Escalier",'Écho de Cendre',{to:280,sat:.4,light:1.25},['spectral'],'Ghost of the Stairs'],['Gargouille du Perron','Gargouille',{to:320,sat:.4},['nmeyes'],'Porch Gargoyle']],
  b:['Le Comte Sans Reflet','Empereur Malgor',{to:330,sat:.8},['nmcrown'],'The Reflectionless Count'],bs:['Morsure du miroir','Mirror Bite']},
 {n:'Le Théâtre des Masques',en:'The Theatre of Masks',h:350,r:'spd',pf:8,m:[['Marionnette Sans Fil','Valet Masqué',{to:20,sat:.5},['nmstitch'],'Stringless Puppet'],['Souffleur Muet',"Héraut d'Umbra",{to:350,sat:.6},['nmstitch'],'Mute Prompter'],['Danseuse de Cendre','Archange Brisé',{to:20,sat:.4,light:.7},['nmsmoke'],'Ash Dancer'],['Rideau Vivant','Horreur Rampante',{to:350,sat:1.1},['nmeyes'],'Living Curtain'],['Spectateur Sans Visage','Goule',{to:300,sat:.3,light:.8},['mask'],'Faceless Spectator']],
  b:['La Prima Donna Fêlée','Sylphéa Reine des Ronces',{to:340,sat:.8},['nmcrown','mask'],'The Cracked Prima Donna'],bs:["L'aria du silence",'Aria of Silence']},
 {n:'La Forge des Peurs',en:'The Forge of Fears',h:10,r:'dmg',pf:7,m:[['Forgeron Sans Yeux','Golem de Magma',{to:0,sat:.6,light:.6},['nmchain'],'Eyeless Smith'],['Enclume Hurlante','Golem du Néant',{to:10,sat:.5,light:.7},['flame'],'Howling Anvil'],['Lame Vivante','Chevalier de Cendre',{to:0,sat:.9},['flame','nmeyes'],'Living Blade'],['Soufflet Cracheur','Salamandre',{to:0,sat:1.2,light:.6},['flame'],'Spitting Bellows'],['Chaîne Brûlante','Cerbère',{to:5,sat:1.2,light:.6},['nmchain','flame'],'Burning Chain']],
  b:['Le Forgeur de Peurs','Gorgath le Dévoreur',{to:0,sat:1.1,light:.7},['nmcrown','flame'],'The Forger of Fears'],bs:['Marteau des cauchemars','Hammer of Nightmares']},
 {n:'Le Ciel Renversé',en:'The Upside-down Sky',h:235,r:'ult',pf:5,m:[['Étoile Déchue','Élémentaire de Glace',{to:230,sat:.8},['stars'],'Fallen Star'],['Nuage Dévoreur','Slime Vert',{to:240,sat:.35,light:1.1},['nmeyes'],'Devouring Cloud'],['Comète Hurlante','Solarion',{to:220,sat:1},['stars'],'Howling Comet'],['Trou Noir Affamé','Rôdeur du Vide',{to:230,sat:.8},['stars'],'Hungry Black Hole'],['Ange Renversé','Sentinelle Céleste',{to:230,sat:.7},['nmeyes'],'Upside-down Angel']],
  b:['Le Gardien du Ciel Renversé',"Colosse d'Éther",{to:240,sat:.9},['nmcrown','stars'],'The Keeper of the Upside-down Sky'],bs:['Chute des étoiles','Starfall']},
 {n:'Le Trône de Somnar',en:"Somnar's Throne",h:265,r:'final',pf:9,m:[['Rêve Dévoré','Kraken Céleste',{to:270,sat:.6},['nmsmoke'],'Devoured Dream'],['Cauchemar Vivant','Seigneur du Néant',{to:270,sat:.8},['nmeyes'],'Living Nightmare'],['Garde de Somnar','Champion du Chaos',{to:265,sat:.7},['nmchain'],"Somnar's Guard"],['Œil Sans Sommeil','Œil Abyssal',{to:265,sat:1.1},['nmeyes'],'Sleepless Eye'],['Croque-Rêves',"Dragon d'Ombre",{to:270,sat:.9},['nmsmoke','horns'],'Dream Muncher']],
  b:['Somnar, le Dévoreur de Rêves',0,0,0,'Somnar, the Dream Devourer'],bs:['Le Grand Sommeil','The Great Sleep']}];
CW.forEach((W,wi)=>{[...W.m,W.b].forEach((x,i)=>{if(x[1])NMAP[x[0]]={base:x[1],o:x[2],ov:x[3],boss:i===5,w:wi}})});
const ruleOf=s=>RULES[CW[Math.max(0,Math.min(9,Math.ceil(s/10)-1))].r];
const cArt=(nm,h,b)=>nmonArt(nm,h,b);
/* le décor reste immobile (comme les autres décors : seules les petites particules bougent), c'est bien plus léger pour le téléphone */
const stillSvg=x=>String(x).replace(/<(animate|animateMotion|animateTransform|set)\b[^>]*\/>/g,'');
function cScene(w,n,anim){const W=CW[w-1]||CW[0];let svg='';try{svg=window.RDEcmScene?window.RDEcmScene(w):'';const lite=document.documentElement.classList.contains('rdphone')||(document.body&&document.body.classList.contains('rdlite'));if(!anim||lite)svg=stillSvg(svg)}catch(e){}
  if(!svg)return sceneHTML(9,n).replace('class="bscene ',`style="filter:hue-rotate(${W.h-270}deg) brightness(.7)" class="bscene `);
  let parts='';try{parts=sceneParts(W.pf,n)}catch(e){}return`<div class="bscene sc-cm cm${w}">${svg}${parts}</div>`}

/* ---------- les monstres en combat ---------- */
function ruleFoe(u,r){if(r==='rev'||r==='final')u.cRev=1;else if(r==='crit')u.crit=(u.crit||.06)+.25;else if(r==='en')u.en=50;else if(r==='shield')u.sh=Math.round(u.max*.25);else if(r==='spd')u.spd=Math.round((u.spd||100)*1.3)}
{const sf=stageFoes;stageFoes=function(s){
  /* l'aperçu de l'écran « Choisir ses héros » */
  try{const P=window.PKX;if(!CMODE&&!NMODE&&typeof PICK!=='undefined'&&PICK.on&&P&&P.ctx&&P.ctx.kind==='stage'&&P.ctx.mode==='c'&&P.ctx.s===s){CMODE=s;NMODE=s;try{return stageFoes(s)}finally{CMODE=0;NMODE=0}}}catch(e){}
  const f=sf.apply(this,arguments);if(!CMODE)return f;
  const w=Math.ceil(s/10),N=NWORLDS[w-1],C=CW[w-1],R=RULES[C.r],boss=s%10===0;
  const k=CT.k*cCf(s)*(boss?CT.wb[w-1]:CT.wf[w-1])*cRecRaw(s)/lerpT(NMT,s);
  for(const u of f){let nn=null,bs=false;if(u.boss){nn=C.b[0];bs=true;u.sk={...u.sk,n:C.bs[0]}}else{const i=N.m.findIndex(x=>x[0]===u.name);if(i>=0)nn=C.m[i][0]}
    if(nn){u.name=nn;u.port=cArt(nn,C.h,bs)}
    u.max=Math.round(u.max*k);u.hp=u.max;u.atk=Math.round(u.atk*k);u.def=Math.round(u.def*k);u.spd=(u.spd||100)+8;ruleFoe(u,C.r)}
  return f}}
/* les héros sous la règle du monde */
{const am=applyMeta;applyMeta=function(units,mk){const r=am.apply(this,arguments);try{if(CMODE){const k=CW[Math.max(0,Math.min(9,Math.ceil(CMODE/10)-1))].r;
  if(k==='fear'||k==='dmg'||k==='ult')for(const u of units)if(u.side===0&&u.hid!=null){if(k==='fear')u.dm=(u.dm||1)*.85;else if(k==='dmg')u.tm=(u.tm||1)*1.2;else if(k==='ult')u.skm=(u.skm||1)*.75}}}catch(e){}return r}}
/* le combat sait qu'il est en Cauchemar avant le premier coup */
{const r0=run;run=function(){try{if(CMODE&&typeof B!=='undefined'&&B&&B.mode==='stage'&&!B.cauch){B.cauch=CMODE;const R=ruleOf(CMODE);B.crule=CW[Math.ceil(CMODE/10)-1].r;if(R.hm)B.healMul=(B.healMul||1)*R.hm}}catch(e){}return r0.apply(this,arguments)}}
/* « Ils reviennent » : un monstre vaincu se relève une fois */
{const h0=hurt;hurt=function(t,d,c){const r=h0.apply(this,arguments);
  try{if(typeof B!=='undefined'&&B&&B.cauch&&t&&t.side===1&&t.hp<=0&&t.cRev===1){t.cRev=2;t.hp=Math.max(1,Math.round(t.max*.3));t.stun=0;t.dot=null;t.sh=0;
    log(`🌙 <b>${t.name}</b> se relève !`,'cs');float(t,'SE RELÈVE !','heal');
    if(!B.skip)try{const el=document.getElementById('u-'+t.key);if(el){el.classList.add('cmrise');setTimeout(()=>el.classList.remove('cmrise'),900)}}catch(e){}
    try{refreshOne(t)}catch(e){try{refreshUnits()}catch(e2){}}}}catch(e){}
  return r}}
/* la musique */
{const bt=battleTheme;battleTheme=function(){try{if(typeof B!=='undefined'&&B&&B.cauch&&!B.done)return B.cauch%10===0?(SONGS.umbra?'umbra':'boss'):(SONGS.spooky?'spooky':'battle')}catch(e){}return bt.apply(this,arguments)}}

function cBattle(n){cInit();if(!cOpen())return toast('Termine les 100 étapes du mode Difficile pour débloquer le mode Cauchemar.');if(n>S.cstage||n<1)return;
  NMODE=n;CMODE=n;try{startBattle('stage',n)}finally{NMODE=0;CMODE=0}
  if(typeof B!=='undefined'&&B&&B.cauch===n){try{const w=Math.ceil(n/10),C=CW[w-1],R=RULES[C.r];const t=$('#battle .bh .t');if(t&&t.firstChild)t.firstChild.textContent='🌙 Cauchemar · Étape '+n+(n%10===0?' · Boss':'');
    const sm=$('#battle .bh .t small');if(sm)sm.innerHTML=sm.innerHTML.replace(WORLDS[w-1].n,C.n+' · '+R.ic+' '+R.n);
    const sc=$('#battle .bscene');if(sc)sc.outerHTML=cScene(w,12);const bt=$('#battle');if(bt)bt.classList.add('cmode');
    try{log(`${R.ic} <b>${R.n}</b> — <span>${R.d}</span>`,'cs')}catch(e){}}catch(e){}}}
window.cBattle=cBattle;

/* ---------- les récompenses ---------- */
const egg=r=>{try{const p=window.RDEpetState();p.eggs.push({id:p.nid++,r});return true}catch(e){return false}};
{const fi=finish;finish=function(res){
  if(!B||B.done)return fi.apply(this,arguments);
  if(!B.cauch){const hd=B.hard,h0=S.hmax||0;const r=fi.apply(this,arguments);
    try{if(hd===100&&res===true&&h0<100&&(S.hmax||0)>=100){const rw=$('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend','<span class="cmunl">🌙 Le mode Cauchemar est débloqué ! (Aventure, flèche après Difficile)</span>')}}catch(e){}return r}
  const n=B.cauch,m0=S.max,s0=S.stage;cInit();S.max=1e9;
  try{fi.apply(this,arguments)}finally{S.max=m0;S.stage=s0}
  const extra=[],w=Math.ceil(n/10),boss=n%10===0,C=CW[w-1];
  if(res===true){const g=Math.round((6000+150*n)*(boss?3:1)*goldMul());S.gold+=g;extra.push(GOLD+fmt(g)+' or (bonus Cauchemar)');
    if(n>(S.cmax||0)){S.cmax=n;S.cstage=Math.min(100,n+1);const gm=boss?350:75;S.gems+=gm;extra.push(GEM+gm+' gemmes (1re victoire Cauchemar)');
      if(boss){S.shards+=4;S.ush=(S.ush||0)+2;extra.push(SHARD+'4 éclats légendaires',"🌟 2 éclats d'ultra-évolution");if(egg(2))extra.push('🥚 Un œuf épique pour ta Ménagerie');
        try{news(Date.now(),`${S.name||'Voyageur'} a vaincu ${C.b[0]} en mode Cauchemar (étape ${n}).`);react('gg',{},2)}catch(e){}}
      if(n===50){S.evFrames=S.evFrames||[];if(!S.evFrames.includes('cauch'))S.evFrames.push('cauch');extra.push('🖼️ Nouveau cadre : « Cauchemar » !')}
      if(n===100){try{cosGive('bg','cauchemar')}catch(e){S.pbgs=S.pbgs||[];if(!S.pbgs.includes('cauchemar'))S.pbgs.push('cauchemar')}egg(3);extra.push("🌙 Mode Cauchemar terminé ! Titre « Celui qui ne dort plus », fond « Cauchemar » et un œuf légendaire.")}}
    const it=dropItem(rollRarity(10,boss?3.6:2));extra.push(itemChip(it))}
  else extra.push(`Puissance conseillée en Cauchemar : ${fmt(cRecD(n))}.`);
  save();try{ttCheck()}catch(e){}
  try{if(res!==true)document.querySelectorAll('#battle .result .rw span').forEach(x=>{if(/^Puissance conseillée : /.test(x.textContent))x.remove()});
    const rw=$('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend',extra.map(x=>`<span>${x}</span>`).join(''));
    const ns=$('#battle .result [data-a="nextstage"]');if(ns&&(res!==true||n>=100))ns.remove();
    const h=$('#battle .result .h');if(h)h.insertAdjacentHTML('beforeend','<small class="nmtag cmtag">MODE CAUCHEMAR</small>')}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||typeof B==='undefined'||!B||!B.cauch)return;const a=t.dataset.a;
  if(a==='nextstage'||a==='retry'){e.stopImmediatePropagation();e.preventDefault();const n=a==='retry'?B.cauch:B.cauch+1;closeBattle();cBattle(n)}},true);

/* ---------- le sélecteur : Facile ‹ › Normal ‹ › Difficile ‹ › Cauchemar ---------- */
const DF=['e','n','h','c'],DL={e:'Facile',n:'Normal',h:'Difficile',c:'Cauchemar'},DI={e:'🌱',n:'⚔️',h:'💀',c:'🌙'},DC={e:'te',n:'tn',h:'th',c:'tc'};
diffSw=function(d){if(!DF.includes(d))d='e';const i=DF.indexOf(d),p=DF[(i+3)%4],nx=DF[(i+1)%4];
  /* un mode terminé : « Terminé · … » (plus court, ça ne passe plus sur deux lignes) */
  const sub=d==='e'?((S.max||0)>=100?(nOpen()?'Terminé · Normal débloqué !':'Terminé !'):`Étape ${Math.min(100,S.stage)} / 100${nOpen()?' · Normal débloqué !':''}`)
    :d==='n'?(!nOpen()?'🔒 Termine le mode Facile pour débloquer':(S.nmax||0)>=100?'Terminé · Difficile débloqué !':`Étape ${Math.min(100,(S.nmax||0)+1)} / 100${hOpen()?' · Difficile débloqué !':' · monstres bien plus coriaces'}`)
    :d==='h'?(!hOpen()?'🔒 Termine le mode Normal pour débloquer':(S.hmax||0)>=100?'Terminé · Cauchemar débloqué !':`Étape ${Math.min(100,(S.hmax||0)+1)} / 100 · le défi ultime`)
    :(!cOpen()?'🔒 Termine le mode Difficile pour débloquer':(S.cmax||0)>=100?'Terminé · tu ne dors plus jamais !':`Étape ${Math.min(100,(S.cmax||0)+1)} / 100 · la nuit sans fin`);
  /* les points : « dk » + le mode (la classe « h » toute seule était celle des titres du jeu : le point du Difficile était invisible) */
  const lab=x=>`<small${x==='c'?' class="lg"':''}>${DL[x]}</small>`;
  return`<div class="diffsw v2 d${d}" id="diffsw"><button class="navarr big nl ${DC[p]}" data-a="diff" data-v="${p}" aria-label="Passer en mode ${DL[p]}">${CHEV_L}${lab(p)}</button>
  <div class="dft"><span class="dfic">${DI[d]}</span><b>Mode ${DL[d]}</b><small>${sub}</small><span class="dfd">${DF.map(x=>`<i class="${x===d?'on dk'+x:''}"></i>`).join('')}</span></div>
  <button class="navarr big nr ${DC[nx]}" data-a="diff" data-v="${nx}" aria-label="Passer en mode ${DL[nx]}">${CHEV_R}${lab(nx)}</button></div>`};
/* glisser le doigt : on avance ou on recule d'un mode (avant, ça n'allait que de Facile à Normal) */
{let sx=null,sy=null,sw=null;
  window.addEventListener('touchstart',e=>{try{if(TAB!=='adv'||(typeof B!=='undefined'&&B)){sx=null;return}const el=e.target.closest&&e.target.closest('#diffsw,.wbanner');if(!el){sx=null;return}sx=e.touches[0].clientX;sy=e.touches[0].clientY}catch(er){sx=null}},{passive:true,capture:true});
  window.addEventListener('touchend',e=>{try{if(sx==null)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)sw={dir:dx<0?1:-1,t:Date.now()}}catch(er){}},{passive:true,capture:true});
  const sd=setDiff;setDiff=function(d){let dir=0;if(sw&&Date.now()-sw.t<400){const i=Math.max(0,DF.indexOf(UI.diff||'e'));dir=sw.dir;d=DF[(i+dir+4)%4];sw=null}
    else{const i=DF.indexOf(UI.diff||'e'),j=DF.indexOf(d);if(i>=0&&j>=0)dir=(j-i+4)%4===1?1:-1}
    const r=sd.call(this,d);try{const s=$('#diffsw');if(s&&dir){s.classList.remove('swl','swr');s.classList.add(dir>0?'swl':'swr')}}catch(e){}return r}}

/* ---------- la page du mode Cauchemar ---------- */
function myAvS(){try{return myAv()}catch(e){return''}}
function rewCard(){let pb='';try{pb=`<span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG.cauchemar.art()}</svg></span>`}catch(e){pb='<span>🌙</span>'}
  return`<div class="card cmrew"><div class="h3" style="margin:0">🎁 Récompenses du mode Cauchemar</div><div class="cmrl">
  <div class="cmri"><span>💰</span><p>Beaucoup d'or à chaque victoire, et le meilleur équipement du jeu.</p></div>
  <div class="cmri"><span>💎</span><p><b>75 gemmes</b> par 1re victoire, <b>350</b> sur les boss.</p></div>
  <div class="cmri"><span>👹</span><p>Chaque boss : <b>4 éclats légendaires</b>, <b>2 éclats d'ultra-évolution</b> et <b>un œuf épique</b>.</p></div>
  <div class="cmri ${(S.cmax||0)>=50?'ok':''}"><span class="av fav frm-cauch">${myAvS()}</span><p>Étape 50 : le cadre <b>« Cauchemar »</b>.</p></div>
  <div class="cmri ${(S.cmax||0)>=100?'ok':''}">${pb}<p>Étape 100 : le titre <b>« Celui qui ne dort plus »</b>, le fond <b>« Cauchemar »</b> et <b>un œuf légendaire</b>.</p></div></div></div>`}
function pAdvC(sw){cInit();const lock=!cOpen();const cw=Math.max(1,Math.min(10,Math.ceil(S.cstage/10)));const w=Math.max(1,Math.min(10,UI.cworld??cw));const Wd=CW[w-1],R=RULES[Wd.r];
  let nodes='';for(let k=1;k<=10;k++){const s=(w-1)*10+k,done=s<=S.cmax,cur=s===S.cstage&&S.cmax<100,lk=lock||s>S.cstage;nodes+=`<button class="node ${done?'done':''} ${cur?'now':''} ${lk?'lock':''} ${k===10?'boss':''}" data-a="cstage" data-v="${s}" ${lk?'disabled':''} aria-label="Étape ${s} cauchemar">${s}</button>`}
  const tp=idsPower(teamIdsFor('pve')),rp=cRecD(S.cstage),fin=S.cmax>=100;
  return`<div class="stack nmpage hmpage cmpage">
  <div class="card row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Coffre d'expédition</div><div class="muted">Tes héros rapportent ${idleRate()} or/min, même hors ligne (8 h max).</div></div><button class="btn p" data-a="idle">${GOLD} Récolter ${fmt(idleGold())}</button></div>
  ${sw}
  <div class="worlds">${CW.map((x,i)=>`<button class="chip ${w===i+1?'on':''}" data-a="cworld" data-v="${i+1}">${i+1}. ${x.n}</button>`).join('')}</div>
  <div class="wbanner sc nmban cmban">${cScene(w,10)}<div class="wtx"><span class="nmbadge cmbadge">CAUCHEMAR · MONDE INÉDIT</span>
    <div class="h">Monde ${w} · ${Wd.n}</div>
    <p>Étapes ${(w-1)*10+1} à ${w*10} en Cauchemar. Boss du monde : <b>${Wd.b[0]}</b>. Puissance conseillée de ${fmt(cRecD((w-1)*10+1))} à ${fmt(cRecD(w*10))}.</p>
    <div class="bestiary">${[...Wd.m,Wd.b].map((x,i)=>`<span class="bst ${i===5?'boss':''}" title="${esc(x[0])}${i===5?' (boss)':''}">${cArt(x[0],Wd.h,i===5)}</span>`).join('')}</div></div>${lock?`<div class="nmlock"><b>🔒 Mode Cauchemar verrouillé</b><span>Termine les 100 étapes du mode Difficile (tu es à l'étape ${Math.min(100,(S.hmax||0)+1)}).</span></div>`:''}</div>
  <div class="card cmrule"><span class="cmric">${R.ic}</span><div style="min-width:0"><small>RÈGLE DU MONDE ${w}</small><b>${R.n}</b><p>${R.d}</p></div></div>
  <div class="path">${nodes}</div>
  <div class="card stack"><div class="row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Ton équipe d'aventure</div><div class="muted">Puissance ${fmt(tp)}</div></div>${teamStrip(teamIdsFor('pve'))}</div>${teamPick('pve')}
  ${lock?'':fin?`<div class="muted">Les 100 étapes du mode Cauchemar sont terminées. Tu ne dors plus jamais ! Rejoue-les pour l'équipement.</div>`:`<div class="row"><span class="${tp<rp*.85?'warn':'muted'}">Puissance conseillée : <b class="num">${fmt(rp)}</b>${tp<rp*.85?' · ton équipe est trop faible, renforce-la !':''}</span></div><button class="btn p big nmgo cmgo" data-a="cstage" data-v="${S.cstage}">🌙 Combattre l'étape ${S.cstage} Cauchemar${S.cstage%10===0?' · BOSS':''}</button>`}</div>
  ${rewCard()}</div>`}
window.pAdvC=pAdvC;
{const pa=pAdv;pAdv=function(){let d='e';try{d=localStorage.getItem('royaumes-diff')||'e'}catch(e){}UI.diff=UI.diff||d;if(UI.diff!=='c')return pa.apply(this,arguments);
  /* on passe par le chemin du mode Difficile, pour garder tout ce qui habille la page (mode histoire, images allégées…) */
  const ph=pAdvH;pAdvH=()=>pAdvC(diffSw('c'));UI.diff='h';try{return pa.apply(this,arguments)}finally{pAdvH=ph;UI.diff='c'}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='cstage')cBattle(+v);else if(a==='cworld'){UI.cworld=+v;render()}});
/* l'écran « Choisir ses héros » : Cauchemar, et la bonne puissance conseillée en Normal et en Difficile */
window.addEventListener('click',e=>{try{const t=e.target&&e.target.closest&&e.target.closest('[data-a="cstage"],[data-a="nstage"],[data-a="hstage"]');if(!t||t.disabled||(typeof B!=='undefined'&&B)||!t.closest('#main')||typeof window.pkOpen!=='function')return;
  const a=t.dataset.a,s=+t.dataset.v;if(!s)return;if(a==='cstage'&&(!cOpen()||s>(cInit(),S.cstage)))return;e.preventDefault();e.stopImmediatePropagation();
  const mode=a==='cstage'?'c':a==='hstage'?'h':'n';let rec=0;try{rec=mode==='c'?cRecD(s):mode==='h'?hRecD(s):nRecD(s)}catch(er){}
  const title=(mode==='c'?'Mode Cauchemar · ':mode==='h'?'Mode Difficile · ':'Mode Normal · ')+'Étape '+s+(s%10===0?' · Boss':'');
  window.pkOpen({kind:'stage',mode,s,rec,trials:false,title,go:()=>{if(mode==='c')cBattle(s);else if(mode==='h')hBattle(s);else nBattle(s)}})}catch(er){console.warn('pk cauchemar',er)}},true);

/* ---------- les récompenses cosmétiques ---------- */
let PBI=0;
function nightArt(){const q='cmpb'+(PBI++);let st='';for(let i=0;i<46;i++)st+=`<circle cx="${(i*89)%400}" cy="${(i*37)%130}" r="${((i%3)*.45+.45).toFixed(2)}" fill="#e8dcff" opacity="${(.25+(i%5)*.13).toFixed(2)}"/>`;
  return`<defs><linearGradient id="${q}a" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#05020c"/><stop offset=".6" stop-color="#1c0a36"/><stop offset="1" stop-color="#3a0e3a"/></linearGradient><radialGradient id="${q}g" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#d8c4ff" stop-opacity=".8"/><stop offset=".5" stop-color="#8a5aff" stop-opacity=".2"/><stop offset="1" stop-color="#8a5aff" stop-opacity="0"/></radialGradient><radialGradient id="${q}b" cx=".35" cy=".35" r=".6"><stop offset="0" stop-color="#ffffff" stop-opacity=".7"/><stop offset=".5" stop-color="#9ad8ff" stop-opacity=".2"/><stop offset="1" stop-color="#c08aff" stop-opacity=".35"/></radialGradient>
  <mask id="${q}m"><rect width="400" height="200" fill="#000"/><circle cx="92" cy="66" r="40" fill="#fff"/><circle cx="110" cy="54" r="36" fill="#000"/></mask></defs>
  <rect width="400" height="200" fill="url(#${q}a)"/>${st}<circle cx="92" cy="66" r="80" fill="url(#${q}g)"/><circle cx="92" cy="66" r="40" fill="#f2ebff" mask="url(#${q}m)"/>
  <path d="M0 200V150Q60 132 120 146T240 140T400 144V200Z" fill="#12061e"/>
  <g fill="#07030e"><path d="M40 200V150L58 134L76 150V200Z"/><path d="M96 200V140L118 120L140 140V200Z"/><rect x="150" y="150" width="34" height="50"/><path d="M196 200V128L214 108L232 128V200Z"/><path d="M226 200V146L250 130L274 146V200Z"/><rect x="290" y="140" width="30" height="60"/><path d="M330 200V150L352 132L374 150V200Z"/></g>
  <rect x="207" y="140" width="8" height="10" fill="#ffd86a"/><rect x="110" y="152" width="7" height="9" fill="#ffd86a" opacity=".7"/>
  ${[[300,60,16],[350,96,11],[262,40,8],[170,84,10]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${q}b)" stroke="#e8f6ff" stroke-width=".8" opacity=".9"/>`).join('')}
  ${[[332,34],[380,70]].map(([x,y])=>`<g transform="translate(${x} ${y})"><circle r="9" fill="#ff2a5a" opacity=".15"/><path d="M-6 0Q-4 -2 -1.6 0Q-4 1.6 -6 0ZM1.6 0Q4 -2 6 0Q4 1.6 1.6 0Z" fill="#ff3a5a"/></g>`).join('')}`}
try{if(typeof PBG!=='undefined')PBG.cauchemar={n:'Fond « Cauchemar »',art:nightArt,how:'Mode Cauchemar : étape 100',fx:1}}catch(e){}
{const pf=pbgFx;pbgFx=function(k){if(k==='cauchemar'){let o='<div class="pbgfx cmbub" aria-hidden="true">';for(let i=0;i<7;i++)o+=`<i style="--x:${(6+i*14)%94}%;--s:${8+(i*5)%12}px;--t:${(7+i%3*2.2).toFixed(1)}s;--l:${(-i*1.7).toFixed(1)}s"></i>`;return o+'</div>'}return pf.apply(this,arguments)}}
try{FRAMES.cauch='Cauchemar';try{FHINT.cauch='Mode Cauchemar : étape 50'}catch(e){}}catch(e){}
try{TITLES.push({k:'nodorm',n:'Celui qui ne dort plus',c:'#ff5a8a',d:'Terminer les 100 étapes du mode Cauchemar',ok:()=>(S.cmax||0)>=100})}catch(e){}

/* ================= LE CLASSEMENT « PROGRESSION » =================
   Facile (1 à 100), puis Normal (101 à 200), Difficile (201 à 300) et Cauchemar (301 à 400). */
const pgMine=()=>Math.min(100,S.max||0)+Math.min(100,S.nmax||0)+Math.min(100,S.hmax||0)+Math.min(100,S.cmax||0);
let TH=null;const thr=()=>TH||(TH={n:[...Array(100)].map((_,i)=>nRecD(i+1)),h:[...Array(100)].map((_,i)=>hRecD(i+1)),c:[...Array(100)].map((_,i)=>cRecD(i+1))});
const BYC=new Map();
/* pour les bots : jusqu'où leur puissance les emmène après l'étape 100 du mode Facile */
/* le mode Cauchemar vient de sortir : les bots le découvrent petit à petit (3 étapes par jour au plus) */
const CM_REL=Date.UTC(2026,10,24,22);const cCap=()=>Math.max(0,Math.min(100,Math.floor((Date.now()-CM_REL)/864e5*3)));
function beyond(pw){const cap=cCap(),k=Math.round(pw/500)+'|'+cap;if(BYC.has(k))return BYC.get(k);const T=thr();let v=0;
  const run=a=>{let n=0;for(let i=0;i<100;i++){if(a[i]<=pw)n=i+1;else break}return n};
  const n=run(T.n);if(n<100)v=n;else{const h=run(T.h);if(h<100)v=100+h;else v=200+Math.min(cap,run(T.c))}
  if(BYC.size>4000)BYC.clear();BYC.set(k,v);return v}
function pgOf(p){if(!p)return 0;if(p.me)return pgMine();
  if(p.real){try{const d=NET.players&&NET.players[p.pid];if(d&&typeof d.pg==='number'&&isFinite(d.pg))return Math.max(0,Math.min(400,Math.round(d.pg)))}catch(e){}return Math.min(100,p.st||0)}
  const st=Math.min(100,p.st||0);return st<100?st:100+beyond(p.pw||0)}
function pgLabel(pg){pg=Math.max(0,Math.round(pg||0));if(pg<=100)return`🌱 Facile ${pg}`;if(pg<=200)return`⚔️ Normal ${pg-100}`;if(pg<=300)return`💀 Difficile ${pg-200}`;return`🌙 Cauchemar ${Math.min(100,pg-300)}`}
const pgCls=pg=>pg<=100?'e':pg<=200?'n':pg<=300?'h':'c';
window.RDEprog={mine:pgMine,of:pgOf,label:pgLabel};
RKV.st=p=>pgOf(p)*1e7+(p.pw||0);
{const pt=pTop;pTop=function(){if(UI.rk!=='st')return pt.apply(this,arguments);const rl=rankList,L={};let n=0;
  rankList=function(cat){const r=rl.apply(this,arguments);if(cat!=='st')return r;return r.map(p=>{const k='§'+(n++)+'§',g=pgOf(p);L[k]=`<span class="pgv pg-${pgCls(g)}">${pgLabel(g)}</span>`;return Object.assign({},p,{st:k})})};
  let h;try{h=pt.apply(this,arguments)}finally{rankList=rl}
  h=h.replace(/Étape (§\d+§)/g,(m,k)=>L[k]||m);
  const note=`<p class="muted pgnote">🏆 La progression compte toutes les difficultés : 🌱 Facile, puis ⚔️ Normal, 💀 Difficile et 🌙 Cauchemar.</p>`;
  const i=h.indexOf('<div class="list">');return i>=0?h.slice(0,i)+note+h.slice(i):h}}
/* le profil : « Progression » au lieu de « Étape max » */
{const pm=profileModal;profileModal=function(id){const r=pm.apply(this,arguments);try{const p=id==='me'?{me:1}:rowById(id);if(p){const g=pgOf(p);
  const st=[...document.querySelectorAll('#ovl .modal .stat')].find(x=>{const s=x.querySelector('span');return s&&/^(Étape max|Max stage)$/.test(s.textContent.trim())});
  if(st){st.querySelector('span').textContent='Progression';const b=st.querySelector('b');if(b){b.textContent=pgLabel(g);b.classList.add('pgb','pg-'+pgCls(g))}}}}catch(e){}return r}}
/* on envoie sa progression avec le reste (comme les autres petits champs du profil) */
{const pm=pushMe;pushMe=async function(){const db=NET&&NET.db;if(!db||typeof db.doc!=='function')return pm.apply(this,arguments);const g=pgMine();if(NET.pgSent!==g)NET.lastPush='';const od=db.doc;
  db.doc=function(p){const r=od.apply(db,arguments);try{if(p==='players/'+NET.pid&&r&&r.set){const os=r.set;r.set=o=>os.call(r,Object.assign({},o,{pg:g}))}}catch(e){}return r};
  const t0=NET.lastPushT;try{const res=await pm.apply(this,arguments);if(NET.lastPushT!==t0)NET.pgSent=g;return res}finally{db.doc=od}}}

/* ---------- pour les tests ---------- */
window.RDEcm={CW,RULES,CT,cRecD,cRecRaw,cOpen,cInit,cBattle,cScene,set mode(v){CMODE=v},get mode(){return CMODE}};

/* ---------- styles ---------- */
const st=document.createElement('style');st.id='v454css';st.textContent=`
.diffsw.dc{background:linear-gradient(90deg,rgba(255,40,100,.22),var(--panel) 40%,var(--panel) 60%,rgba(255,40,100,.22));border-color:#7a1a3a}.diffsw.dc .dft b{color:#ff8aa8}
.navarr.tc{--a1:#ff6a8a;--a2:#5a0a28;--ag:rgba(255,40,100,.5)}
.dfd i.on.dke{background:var(--good)}.dfd i.on.dkn{background:#ff8a96}.dfd i.on.dkh{background:#d4a0ff}.dfd i.on.dkc{background:#ff6a8a}
.diffsw.v2 .navarr.big{width:54px}.diffsw.v2 .navarr.big small.lg{font-size:7.6px;letter-spacing:0}
.nmbadge.cmbadge{background:linear-gradient(90deg,#3a0a2a,#c0144a)}.cmban{box-shadow:inset 0 0 0 2px rgba(255,60,110,.55),0 0 26px rgba(255,40,100,.22)}
.btn.nmgo.cmgo,.btn.p.cmgo{background:linear-gradient(180deg,#ff5a86,#6a0a2e)!important;color:#fff!important}.cmpage .node.now{box-shadow:0 0 0 3px #ff3a6a,0 0 16px rgba(255,40,100,.5)}
.cmtag{color:#ff8aa8!important}#battle.cmode .bh .t{color:#ff8aa8}
.cmrule{display:flex;gap:12px;align-items:center;border-color:#7a1a3a!important;background:linear-gradient(100deg,rgba(255,40,100,.16),var(--panel) 60%)!important}
.cmrule .cmric{font-size:30px;width:52px;height:52px;display:grid;place-items:center;border-radius:14px;background:rgba(0,0,0,.3);flex:none}
.cmrule small{display:block;font-size:11px;letter-spacing:.06em;color:#ff8aa8;font-weight:800}.cmrule b{display:block;font-size:16px}.cmrule p{margin:2px 0 0;font-size:12.5px}
.cmrl{display:grid;gap:8px;margin-top:8px}
.cmri{display:flex;gap:10px;align-items:center;padding:6px 8px;border-radius:12px;background:rgba(0,0,0,.18)}
.cmri>span:first-child{font-size:22px;width:44px;height:44px;display:grid;place-items:center;flex:none;border-radius:12px}
.cmri p{margin:0;font-size:12.5px;line-height:1.35}.cmri.ok{box-shadow:inset 0 0 0 1.5px #58e4a0}
.cmri>.pbgmini{width:64px!important;height:40px!important;border-radius:8px;overflow:hidden;display:block}.cmri .pbgmini svg{width:100%;height:100%;display:block}
.cmri>.av{width:44px;height:44px;border-radius:50%}.cmri>.av img,.cmri>.av svg{width:100%;height:100%;border-radius:50%}
.cmunl{color:#ff8aa8;font-weight:800}
.u.cmrise{animation:cmrise .9s ease-out}@keyframes cmrise{0%{filter:brightness(.2) saturate(0)}40%{filter:brightness(1.8) drop-shadow(0 0 10px #ff3a6a)}100%{filter:none}}
.bscene.sc-cm::after{background:linear-gradient(0deg,rgba(8,3,16,.94),rgba(8,3,16,.45) 60%,rgba(8,3,16,.15))}
.pgnote{font-size:12px;margin:0}
.pgv{white-space:nowrap;font-weight:800}.pgv.pg-e{color:#8ae08a}.pgv.pg-n{color:#ff9aa6}.pgv.pg-h{color:#d4a0ff}.pgv.pg-c{color:#ff6a96}
.pgb.pg-n{color:#ff9aa6}.pgb.pg-h{color:#d4a0ff}.pgb.pg-c{color:#ff6a96}
.fav.frm-cauch{--fd:#12040c;--gc:#ff3a6a}
.fav.frm-cauch::before{background:linear-gradient(160deg,rgba(255,255,255,.35),transparent 42%,rgba(0,0,0,.35)),repeating-conic-gradient(from var(--fa),#ff2a5a 0 9deg,#1a0612 9deg 20deg,#8a5aff 20deg 27deg,#1a0612 27deg 40deg);animation:fspin 7s linear infinite}
.pbgfx.cmbub i{position:absolute;left:var(--x);bottom:-20px;width:var(--s);height:var(--s);border-radius:50%;background:radial-gradient(circle at 35% 35%,rgba(255,255,255,.8),rgba(154,216,255,.15) 55%,rgba(192,138,255,.4));box-shadow:inset 0 0 0 1px rgba(232,246,255,.6);animation:cmbub var(--t) linear var(--l) infinite;will-change:transform,opacity}
@keyframes cmbub{0%{transform:translate3d(0,0,0);opacity:0}10%{opacity:.9}90%{opacity:.8}100%{transform:translate3d(10px,-240px,0);opacity:0}}
html.scrl .pbgfx.cmbub i,html.bgpause .pbgfx.cmbub i{animation-play-state:paused}
@media (prefers-reduced-motion:reduce){.pbgfx.cmbub i,.u.cmrise{animation:none}}`;document.head.appendChild(st);

/* ---------- notes de version ---------- */
try{const it=[
  "🌙 <b>Nouveau : le mode Cauchemar</b>, débloqué en terminant les 100 étapes du mode Difficile. 100 étapes dans 10 mondes de cauchemar, de la Chambre Sans Fin au Trône de Somnar, chacun avec son décor.",
  "👻 <b>60 nouveaux monstres</b>, dont 5 dessinés de zéro (la Poupée Fêlée, le Croque-Mitaine, l'Horloge Hurlante, le Masque Rieur et Somnar, le Dévoreur de Rêves), et <b>une règle spéciale par monde</b> : des monstres qui se relèvent, des soins réduits, des coups critiques, des boucliers…",
  "🎁 Récompenses : beaucoup d'or, 75 gemmes par 1re victoire (350 sur les boss), 4 éclats légendaires, 2 éclats d'ultra-évolution et un œuf épique par boss, le cadre « Cauchemar » à l'étape 50, et à l'étape 100 le titre « Celui qui ne dort plus », le fond « Cauchemar » et un œuf légendaire.",
  "🕯️ <b>Donjon des Échos 2.0</b> : une descente rapide (1 étage, 6 salles), un coffre à chaque gardien d'étage, une malédiction par semaine, et la <b>Boutique des Échos</b> avec le familier exclusif « Écho ».",
  "🏆 <b>Classement « Progression » corrigé</b> : il compte maintenant Facile, Normal, Difficile et Cauchemar (🌱 ⚔️ 💀 🌙), au lieu de s'arrêter à l'étape 100 pour tout le monde.",
  "🎯 L'écran « Choisir ses héros » affiche maintenant la bonne puissance conseillée en Normal et en Difficile."];
 PATCH.unshift({v:78,d:'25 novembre 2026',t:'Le mode Cauchemar',items:it});
 /* les notes depuis la v67 affichaient « Vv77 » et une date en chiffres : on remet le numéro et la vraie date */
 try{const PD={67:'16 novembre 2026',68:'16 novembre 2026',69:'16 novembre 2026',70:'17 novembre 2026',71:'18 novembre 2026',72:'19 novembre 2026',73:'23 novembre 2026',74:'24 novembre 2026',75:'24 novembre 2026',76:'24 novembre 2026',77:'24 novembre 2026'};
  for(const p of PATCH){if(typeof p.v==='string'&&/^v\d+$/.test(p.v))p.v=+p.v.slice(1);if(typeof p.d==='number')p.d=PD[p.v]||''}}catch(e){}
 Object.assign(I18N_EN,{'Le mode Cauchemar':'Nightmare mode',
  [it[0]]:"🌙 <b>New: Nightmare mode</b>, unlocked by finishing the 100 stages of Hard mode. 100 stages across 10 nightmare worlds, from the Endless Bedroom to Somnar's Throne, each with its own scenery.",
  [it[1]]:"👻 <b>60 new monsters</b>, including 5 drawn from scratch (the Cracked Doll, the Bogeyman, the Howling Clock, the Laughing Mask and Somnar, the Dream Devourer), and <b>a special rule in every world</b>: monsters that get back up, reduced healing, critical hits, shields…",
  [it[2]]:"🎁 Rewards: lots of gold, 75 gems per 1st win (350 on bosses), 4 legendary shards, 2 ultra-evolution shards and an epic egg per boss, the “Nightmare” frame at stage 50, and at stage 100 the “The One Who No Longer Sleeps” title, the “Nightmare” background and a legendary egg.",
  [it[3]]:"🕯️ <b>Echo Dungeon 2.0</b>: a quick descent (1 floor, 6 rooms), a chest at every floor guardian, a curse every week, and the <b>Echo Shop</b> with the exclusive “Echo” familiar.",
  [it[4]]:"🏆 <b>“Progress” leaderboard fixed</b>: it now counts Easy, Normal, Hard and Nightmare (🌱 ⚔️ 💀 🌙), instead of stopping at stage 100 for everyone.",
  [it[5]]:"🎯 The “Choose your heroes” screen now shows the right recommended power in Normal and Hard."});
 /* les notes avec du gras se traduisent morceau par morceau (les v75 à v78) */
 for(const p of PATCH.filter(x=>x.v>=75&&x.v<=78))for(const x of p.items)if(I18N_EN[x])put(x,I18N_EN[x])}catch(e){}

/* ---------- anglais ---------- */
try{const X={'Cauchemar':'Nightmare','Mode Cauchemar':'Nightmare mode','Passer en mode Cauchemar':'Switch to Nightmare mode','Passer en mode Difficile':'Switch to Hard mode',
 'Étape # / # · la nuit sans fin':'Stage # / # · the endless night','Étape # / # · Cauchemar débloqué !':'Stage # / # · Nightmare unlocked!','🔒 Termine le mode Difficile pour débloquer':'🔒 Finish Hard mode to unlock',
 'CAUCHEMAR · MONDE INÉDIT':'NIGHTMARE · NEW WORLD','Étapes # à # en Cauchemar. Boss du monde :':'Stages # to # in Nightmare. World boss:','RÈGLE DU MONDE #':'WORLD # RULE',
 '🔒 Mode Cauchemar verrouillé':'🔒 Nightmare mode locked',"Termine les # étapes du mode Difficile (tu es à l'étape #).":"Finish the # stages of Hard mode (you're at stage #).",
 'Termine les # étapes du mode Difficile pour débloquer le mode Cauchemar.':'Finish the # stages of Hard mode to unlock Nightmare mode.',
 "🌙 Combattre l'étape # Cauchemar":'🌙 Fight Nightmare stage #',"🌙 Combattre l'étape # Cauchemar · BOSS":'🌙 Fight Nightmare stage # · BOSS','Étape # cauchemar':'Nightmare stage #',
 "Les # étapes du mode Cauchemar sont terminées. Tu ne dors plus jamais ! Rejoue-les pour l'équipement.":"All # Nightmare stages cleared. You never sleep again! Replay them for gear.",
 '🌙 Cauchemar · Étape #':'🌙 Nightmare · Stage #','🌙 Cauchemar · Étape # · Boss':'🌙 Nightmare · Stage # · Boss','MODE CAUCHEMAR':'NIGHTMARE MODE',
 'Mode Cauchemar · Étape #':'Nightmare mode · Stage #','Mode Cauchemar · Étape # · Boss':'Nightmare mode · Stage # · Boss','Mode Difficile · Étape #':'Hard mode · Stage #','Mode Difficile · Étape # · Boss':'Hard mode · Stage # · Boss','Mode Normal · Étape #':'Normal mode · Stage #','Mode Normal · Étape # · Boss':'Normal mode · Stage # · Boss',
 '# k or (bonus Cauchemar)':'# k gold (Nightmare bonus)','# M or (bonus Cauchemar)':'# M gold (Nightmare bonus)','# or (bonus Cauchemar)':'# gold (Nightmare bonus)','# gemmes (1re victoire Cauchemar)':'# gems (first Nightmare win)',
 '# éclats légendaires':'# legendary shards',"🌟 # éclats d'ultra-évolution":'🌟 # ultra-evolution shards','🥚 Un œuf épique pour ta Ménagerie':'🥚 An epic egg for your Menagerie','🖼️ Nouveau cadre : « Cauchemar » !':'🖼️ New frame: “Nightmare”!',
 '🌙 Mode Cauchemar terminé ! Titre « Celui qui ne dort plus », fond « Cauchemar » et un œuf légendaire.':'🌙 Nightmare mode complete! “The One Who No Longer Sleeps” title, “Nightmare” background and a legendary egg.',
 'Puissance conseillée en Cauchemar : # k.':'Recommended power in Nightmare: # k.','Puissance conseillée en Cauchemar : # M.':'Recommended power in Nightmare: # M.','Puissance conseillée en Cauchemar : #.':'Recommended power in Nightmare: #.',
 '🌙 Le mode Cauchemar est débloqué ! (Aventure, flèche après Difficile)':'🌙 Nightmare mode is unlocked! (Adventure, arrow after Hard)',
 'se relève !':'gets back up!','SE RELÈVE !':'BACK UP!',
 '🎁 Récompenses du mode Cauchemar':'🎁 Nightmare mode rewards',"Beaucoup d'or à chaque victoire, et le meilleur équipement du jeu.":'Lots of gold for every win, and the best gear in the game.',
 '# gemmes':'# gems','par #re victoire,':'per first win,','sur les boss.':'on bosses.','Chaque boss :':'Every boss:',"# éclats d'ultra-évolution":'# ultra-evolution shards','et':'and','un œuf épique':'an epic egg',
 'Étape # : le cadre':'Stage #: the frame','« Cauchemar »':'“Nightmare”','Étape # : le titre':'Stage #: the title','« Celui qui ne dort plus »':'“The One Who No Longer Sleeps”',', le fond':', the background','un œuf légendaire':'a legendary egg',
 'Fond « Cauchemar »':'“Nightmare” background','Mode Cauchemar : étape #':'Nightmare mode: stage #','Celui qui ne dort plus':'The One Who No Longer Sleeps','Terminer les # étapes du mode Cauchemar':'Finish the # stages of Nightmare mode',
 '🌱 Facile #':'🌱 Easy #','⚔️ Normal #':'⚔️ Normal #','💀 Difficile #':'💀 Hard #','🌙 Cauchemar #':'🌙 Nightmare #',
 '🏆 La progression compte toutes les difficultés : 🌱 Facile, puis ⚔️ Normal, 💀 Difficile et 🌙 Cauchemar.':'🏆 Progress counts every difficulty: 🌱 Easy, then ⚔️ Normal, 💀 Hard and 🌙 Nightmare.',
 'Étape # / # · Difficile débloqué !':'Stage # / # · Hard unlocked!','Étape # / # · le défi ultime':'Stage # / # · the ultimate challenge',
 'Terminé · Normal débloqué !':'Done · Normal unlocked!','Terminé · Difficile débloqué !':'Done · Hard unlocked!','Terminé · Cauchemar débloqué !':'Done · Nightmare unlocked!','Terminé · tu ne dors plus jamais !':'Done · you never sleep again!','Terminé !':'Done!'};
 for(const W of CW){X[W.n]=W.en;X['#. '+W.n]='#. '+W.en;X['Monde # · '+W.n]='World # · '+W.en;X[W.n+' · Équipe principale ·']=W.en+' · Main team ·';
   for(const m of [...W.m,W.b]){X[m[0]]=m[4];X[m[0]+' (boss)']=m[4]+' (boss)'}X[W.bs[0]]=W.bs[1];
   const R=RULES[W.r];X[W.n+' · '+R.ic+' '+R.n]=W.en+' · '+R.ic+' '+EN[R.n];X[W.n+' · '+R.ic+' '+R.n+' · Équipe principale ·']=W.en+' · '+R.ic+' '+EN[R.n]+' · Main team ·'}
 for(const k in EN){const kk=k.replace(NUMRX,'#');if(!(kk in X))X[kk]=String(EN[k]).replace(NUMRX,'#')}
 X['# gemmes (#re victoire Difficile)']='# gems (first Hard win)';X['# gemmes (#re victoire Normal)']='# gems (first Normal win)';
 for(const k in X){const kk=k.replace(NUMRX,'#');if(!(kk in I18N_EN))I18N_EN[kk]=String(X[k]).replace(NUMRX,'#')}}catch(e){console.warn('cauchemar en',e)}
}catch(e){console.warn('cauchemar',e)}})();
