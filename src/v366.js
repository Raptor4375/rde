
/* ================= MODE DIFFICILE : 100 nouvelles étapes après le mode Normal =================
   10 mondes inédits, 60 nouveaux monstres (dont 10 boss), débloqué en terminant le mode Normal. */
let HMODE=0;
const HMT=[[1,130000],[25,165000],[50,210000],[75,265000],[90,300000],[100,330000]];
let HK=1;/* réglage fin de la force des monstres (calibré sur de vrais combats) */
const hRecRaw=n=>lerpT(HMT,n);
function hRecD(n){return Math.round(hRecRaw(n)*(n%10===0?1.1:1)*1.25/1000)*1000}
/* calibré sur de vrais combats simulés : à la puissance conseillée, environ 3 victoires sur 4 (les boss sont un vrai mur) */
const hCf=s=>lerpT([[1,.95],[10,1],[25,1.15],[45,1.28],[80,1.35],[100,1.45]],s);
const hOpen=()=>(S.nmax||0)>=100;
function hInit(){if(S.hmax==null)S.hmax=0;S.hstage=Math.min(100,(S.hmax||0)+1)}
const HWORLDS=[
 {n:'Plaines de Sang',h:0,sc:1,rot:-95,sat:1.3,m:[['Gobelin Sanguinaire','Gobelin Pillard',{to:0,sat:1.3},['horns']],['Slime Écarlate','Slime Vert',{to:355,sat:1.4},['eye3']],['Loup Ensanglanté','Loup Galeux',{to:5,sat:1.2,light:.85},['eye3']],['Champignon Carnivore','Champignon Rageur',{to:340,sat:1.3},['horns']],['Bourreau Errant','Bandit Novice',{to:350,sat:.8,light:.7},['mask']]],b:['Grohm le Boucher','Roi Gobelin Grohm',{to:0,sat:1.3},['crown','horns']]},
 {n:'Forêt Pétrifiée',h:80,sc:2,rot:0,sat:.35,m:[['Ent de Pierre','Ent Tordu',{to:40,sat:.25,light:.9},['runes']],['Tisseuse de Granit','Araignée Sylvestre',{to:30,sat:.2},['crystal']],['Faune Pétrifié','Faune Sauvage',{to:35,sat:.25},['runes']],['Âme Figée','Feu Follet',{to:190,sat:.6},['spectral']],['Ourse de Basalte','Ourse Ronce',{to:20,sat:.2,light:.75},['armor']]],b:['Gorgone Sylphyra','Mère-Ronce Sylphyra',{to:100,sat:.6},['eye3','crown']]},
 {n:"Dunes d'Obsidienne",h:30,sc:3,rot:-20,sat:.9,m:[["Scorpion d'Obsidienne",'Scorpion Géant',{to:270,sat:.5,light:.55},['crystal']],['Momie Ardente','Momie Errante',{to:25,sat:1.5},['flame']],['Djinn Noir','Djinn Mineur',{to:270,sat:1.1,light:.7},['stars']],['Ver Dévoreur','Ver des Sables',{to:350,sat:1.2,light:.8},['eye3']],['Spectre du Désert','Pillard Nomade',{to:45,sat:.5,light:1.15},['spectral']]],b:['Ankhar, Dieu-Scarabée','Pharaon Ankhar',{to:48,sat:1.4},['crown','runes']]},
 {n:'Marécage Maudit',h:280,sc:4,rot:60,sat:1.2,m:[['Crapaud Pestilentiel','Crapaud Vénéneux',{to:95,sat:1.6},['eye3']],['Sorcière Pendue','Sorcière des Brumes',{to:285,sat:1.2},['spectral']],['Goule Vorace','Goule',{to:300,sat:1,light:.8},['horns']],['Hydre Pestilente','Hydre Juvénile',{to:280,sat:1.3},['eye3']],['Sangsue Titanesque','Sangsue Géante',{to:345,sat:1.3},['mask']]],b:['Hydre aux Mille Fléaux','Hydre Putride',{to:285,sat:1.4},['crown','eye3']]},
 {n:'Glacier Éternel',h:215,sc:5,rot:15,sat:1.3,m:[['Yéti Primordial','Yéti',{to:215,sat:1.3},['frost','horns']],['Loup du Blizzard','Loup de Givre',{to:200,sat:1.2},['frost','lightning']],['Sentinelle de Givre','Élémentaire de Glace',{to:225,sat:1.4},['crystal','frost']],['Harpie Polaire','Harpie des Cimes',{to:195,sat:1.2},['frost']],['Troll Ancestral','Troll des Neiges',{to:210,sat:1.2},['armor','frost']]],b:["Frimas, Roi de l'Hiver",'Jarl Frimas',{to:205,sat:1.5},['crown','frost']]},
 {n:'Abysses Noyées',h:175,sc:6,rot:-15,sat:1.2,m:[['Triton Abyssal','Triton Garde',{to:170,sat:1.2,light:.75},['coral','eye3']],['Kraken des Profondeurs','Kraken Juvénile',{to:185,sat:1.3,light:.7},['runes']],['Sirène Funeste','Sirène Hurlante',{to:160,sat:1.1},['spectral']],['Crabe Titan','Crabe Blindé',{to:175,sat:1.2},['armor','coral']],['Noyé Éternel','Spectre Noyé',{to:180,sat:.9,light:.8},['spectral']]],b:['Léviathan Ancestral','Kraken Ancestral',{to:175,sat:1.4},['crown','coral']]},
 {n:'Cœur du Volcan',h:8,sc:7,rot:-5,sat:1.4,m:[['Salamandre Infernale','Salamandre',{to:10,sat:1.5},['flame']],['Colosse de Lave','Golem de Magma',{to:15,sat:1.5},['flame','armor']],['Démon des Braises','Diablotin',{to:5,sat:1.4},['horns','flame']],['Phénix Cendré','Phénix Noir',{to:20,sat:1.3},['flame','stars']],['Cerbère Infernal','Cerbère',{to:0,sat:1.4},['flame','eye3']]],b:['Ignir, Cœur de Magma',"Ignir l'Obsidienne",{to:12,sat:1.6},['crown','flame']]},
 {n:'Sanctuaire Corrompu',h:290,sc:8,rot:200,sat:1.2,m:[['Gargouille Profanée','Gargouille',{to:290,sat:1.2},['runes','horns']],['Paladin Corrompu','Chevalier Déchu',{to:280,sat:.9,light:.85},['armor','eye3']],['Golem Profane','Golem Runique',{to:300,sat:1.2},['runes','crystal']],['Griffon Noir','Griffon Corrompu',{to:270,sat:.6,light:.6},['spectral']],['Séraphin Déchu','Archange Brisé',{to:300,sat:1.1},['stars','horns']]],b:['Sentinelle Profanée','Sentinelle Céleste',{to:295,sat:1.4},['crown','runes','eye3']]},
 {n:'Néant Primordial',h:260,sc:9,rot:-30,sat:1.3,m:[['Rôdeur Primordial','Rôdeur du Vide',{to:255,sat:1.3},['stars','eye3']],['Œil du Néant','Œil Abyssal',{to:265,sat:1.4},['stars']],['Archiliche','Liche',{to:250,sat:1.1},['crown','spectral']],['Démon du Néant','Démon Mineur',{to:270,sat:1.3},['horns','stars']],['Dévoreur Primordial','Ombre Vorace',{to:260,sat:1.2},['eye3','spectral']]],b:['Néant Incarné','Seigneur du Néant',{to:262,sat:1.5},['crown','stars','eye3']]},
 {n:"Trône de l'Apocalypse",h:340,sc:10,rot:20,sat:1.4,m:[['Héraut du Chaos','Champion du Chaos',{to:345,sat:1.3},['armor','flame']],['Chimère Apocalyptique','Chimère',{to:350,sat:1.3},['horns','flame']],['Archidémon Suprême','Archidémon',{to:340,sat:1.4},['crown','flame']],['Horreur Indicible','Horreur Rampante',{to:320,sat:1.2},['eye3','spectral']],["Dragon de l'Apocalypse","Dragon d'Ombre",{to:355,sat:1.4},['flame','horns']]],b:['Malgor, Fin des Temps','Empereur Malgor',{to:345,sat:1.6},['crown','flame','stars']]}];
HWORLDS.forEach((W,wi)=>{[...W.m,W.b].forEach((x,i)=>{NMAP[x[0]]={base:x[1],o:x[2],ov:x[3],boss:i===5,w:wi}})});
function hScene(w,n){const W=HWORLDS[w-1];return sceneHTML(W.sc,n).replace('class="bscene ',`style="filter:hue-rotate(${W.rot}deg) saturate(${W.sat}) brightness(.82) contrast(1.1)" class="bscene `)}
/* les monstres du mode Difficile : ceux du mode Normal, renommés, redessinés et bien plus forts */
{const sf=stageFoes;stageFoes=function(s){const f=sf(s);if(!HMODE)return f;const w=Math.ceil(s/10),N=NWORLDS[w-1],H=HWORLDS[w-1];
  const k=HK*hCf(s)*(s%10===0?.53:1)*hRecRaw(s)/lerpT(NMT,s);
  for(const u of f){let nn=null;if(u.boss){nn=H.b[0];u.sk={...u.sk,n:'Colère de '+nn.split(/[ ,]/)[0]}}else{const i=N.m.findIndex(x=>x[0]===u.name);if(i>=0)nn=H.m[i][0]}
    if(nn){u.name=nn;u.port=nmonArt(nn,H.h,!!u.boss)}
    u.max=Math.round(u.max*k);u.hp=u.max;u.atk=Math.round(u.atk*k);u.def=Math.round(u.def*k);u.spd=(u.spd||100)+6}
  return f}}
function hBattle(n){hInit();if(!hOpen())return toast('Termine les 100 étapes du mode Normal pour débloquer le mode Difficile.');if(n>S.hstage)return;
  NMODE=n;HMODE=n;try{startBattle('stage',n)}finally{NMODE=0;HMODE=0}
  if(B&&B.mode==='stage'){B.hard=n;try{const w=Math.ceil(n/10),H=HWORLDS[w-1];const t=$('#battle .bh .t');if(t&&t.firstChild)t.firstChild.textContent='💀 Difficile · Étape '+n+(n%10===0?' · Boss':'');
    const sm=$('#battle .bh .t small');if(sm)sm.innerHTML=sm.innerHTML.replace(WORLDS[w-1].n,H.n);const sc=$('#battle .bscene');if(sc)sc.outerHTML=hScene(w,12);const bt=$('#battle');if(bt)bt.classList.add('hmode')}catch(e){}}}
{const fi=finish;finish=function(res){if(!B||!B.hard||B.done)return fi.apply(this,arguments);const n=B.hard,m0=S.max,s0=S.stage;hInit();S.max=1e9;
  try{fi.apply(this,arguments)}finally{S.max=m0;S.stage=s0}
  const extra=[],w=Math.ceil(n/10),boss=n%10===0;
  if(res===true){const g=Math.round((4000+100*n)*(boss?3:1)*goldMul());S.gold+=g;extra.push(GOLD+fmt(g)+' or (bonus Difficile)');
    if(n>S.hmax){S.hmax=n;S.hstage=Math.min(100,n+1);const gm=boss?250:50;S.gems+=gm;extra.push(GEM+gm+' gemmes (1re victoire Difficile)');
      if(boss){S.shards+=3;S.ush=(S.ush||0)+1;extra.push(SHARD+'3 éclats légendaires',"🌟 1 éclat d'ultra-évolution");try{news(Date.now(),`${S.name||'Voyageur'} a vaincu ${HWORLDS[w-1].b[0]} en mode Difficile (étape ${n}).`);react('gg',{},2)}catch(e){}}}
    const it=dropItem(rollRarity(10,boss?3.2:1.8));extra.push(itemChip(it));
    if(n===100)extra.push("💀 Mode Difficile terminé ! Titre « Conquérant de l'Abîme » débloqué.")}
  else extra.push(`Puissance conseillée en Difficile : ${fmt(hRecD(n))}.`);
  save();try{ttCheck()}catch(e){}
  try{const rw=$('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend',extra.map(x=>`<span>${x}</span>`).join(''));const ns=$('#battle .result [data-a="nextstage"]');if(ns&&(res!==true||n>=100))ns.remove();const h=$('#battle .result .h');if(h)h.insertAdjacentHTML('beforeend','<small class="nmtag hmtag">MODE DIFFICILE</small>')}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||!B||!B.hard)return;const a=t.dataset.a;
  if(a==='nextstage'||a==='retry'){e.stopImmediatePropagation();e.preventDefault();const n=a==='retry'?B.hard:B.hard+1;closeBattle();hBattle(n)}},true);
/* le sélecteur de difficulté : Facile ‹ › Normal ‹ › Difficile */
const DIFFS=['e','n','h'],DLAB={e:'Facile',n:'Normal',h:'Difficile'},DIC={e:'🌱',n:'⚔️',h:'💀'},DCL={e:'te',n:'tn',h:'th'};
diffSw=function(d){if(!DIFFS.includes(d))d='e';const i=DIFFS.indexOf(d),p=DIFFS[(i+2)%3],nx=DIFFS[(i+1)%3];
  const sub=d==='e'?`Étape ${Math.min(100,S.stage)} / 100${nOpen()?' · Normal débloqué !':''}`:d==='n'?(!nOpen()?'🔒 Termine le mode Facile pour débloquer':`Étape ${Math.min(100,(S.nmax||0)+1)} / 100${hOpen()?' · Difficile débloqué !':' · monstres bien plus coriaces'}`):(!hOpen()?'🔒 Termine le mode Normal pour débloquer':`Étape ${Math.min(100,(S.hmax||0)+1)} / 100 · le défi ultime`);
  return`<div class="diffsw v2 d${d}" id="diffsw"><button class="navarr big nl ${DCL[p]}" data-a="diff" data-v="${p}" aria-label="Passer en mode ${DLAB[p]}">${CHEV_L}<small>${DLAB[p]}</small></button>
  <div class="dft"><span class="dfic">${DIC[d]}</span><b>Mode ${DLAB[d]}</b><small>${sub}</small><span class="dfd">${DIFFS.map(x=>`<i class="${x===d?'on '+x:''}"></i>`).join('')}</span></div>
  <button class="navarr big nr ${DCL[nx]}" data-a="diff" data-v="${nx}" aria-label="Passer en mode ${DLAB[nx]}">${CHEV_R}<small>${DLAB[nx]}</small></button></div>`};
/* la page du mode Difficile */
function pAdvH(sw){hInit();const lock=!hOpen();const cw=Math.max(1,Math.min(10,Math.ceil(S.hstage/10)));const w=Math.min(UI.hworld??cw,cw);const Wd=HWORLDS[w-1];
  let nodes='';for(let k=1;k<=10;k++){const s=(w-1)*10+k,done=s<=S.hmax,cur=s===S.hstage&&S.hmax<100,lk=lock||s>S.hstage;nodes+=`<button class="node ${done?'done':''} ${cur?'now':''} ${lk?'lock':''} ${k===10?'boss':''}" data-a="hstage" data-v="${s}" ${lk?'disabled':''} aria-label="Étape ${s} difficile">${s}</button>`}
  const tp=idsPower(teamIdsFor('pve')),rp=hRecD(S.hstage),fin=S.hmax>=100;
  return`<div class="stack nmpage hmpage">
  <div class="card row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Coffre d'expédition</div><div class="muted">Tes héros rapportent ${idleRate()} or/min, même hors ligne (8 h max).</div></div><button class="btn p" data-a="idle">${GOLD} Récolter ${fmt(idleGold())}</button></div>
  ${sw}
  <div class="worlds">${HWORLDS.map((x,i)=>`<button class="chip ${w===i+1?'on':''}" data-a="hworld" data-v="${i+1}" ${i+1>cw||lock?'disabled':''}>${i+1}. ${x.n}</button>`).join('')}</div>
  <div class="wbanner sc nmban hmban">${hScene(w,12)}<div class="wtx"><span class="nmbadge hmbadge">DIFFICILE · MONDE INÉDIT</span>
    <div class="h">Monde ${w} · ${Wd.n}</div>
    <p>Étapes ${(w-1)*10+1} à ${w*10} en Difficile. Boss du monde : <b>${Wd.b[0]}</b>. Puissance conseillée de ${fmt(hRecD((w-1)*10+1))} à ${fmt(hRecD(w*10))}.</p>
    <div class="bestiary">${[...Wd.m,Wd.b].map((x,i)=>`<span class="bst ${i===5?'boss':''}" title="${esc(x[0])}${i===5?' (boss)':''}">${nmonArt(x[0],Wd.h,i===5)}</span>`).join('')}</div></div>${lock?`<div class="nmlock"><b>🔒 Mode Difficile verrouillé</b><span>Termine les 100 étapes du mode Normal (tu es à l'étape ${Math.min(100,(S.nmax||0)+1)}).</span></div>`:''}</div>
  <div class="path">${nodes}</div>
  <div class="card stack"><div class="row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Ton équipe d'aventure</div><div class="muted">Puissance ${fmt(tp)}</div></div>${teamStrip(teamIdsFor('pve'))}</div>${teamPick('pve')}
  ${lock?'':fin?`<div class="muted">Les 100 étapes du mode Difficile sont terminées. Tu es une légende ! Rejoue-les pour l'équipement.</div>`:`<div class="row"><span class="${tp<rp*.85?'warn':'muted'}">Puissance conseillée : <b class="num">${fmt(rp)}</b>${tp<rp*.85?' · ton équipe est trop faible, renforce-la !':''}</span></div><button class="btn p big nmgo hmgo" data-a="hstage" data-v="${S.hstage}">💀 Combattre l'étape ${S.hstage} Difficile${S.hstage%10===0?' · BOSS':''}</button>`}
  <div class="muted" style="font-size:12.5px">Récompenses du mode Difficile : beaucoup d'or, 50 gemmes par 1re victoire (250 sur les boss), 3 éclats légendaires et 1 éclat d'ultra-évolution par boss, et le meilleur équipement du jeu.</div></div></div>`}
{const pa=pAdv;pAdv=function(){let d='e';try{d=localStorage.getItem('royaumes-diff')||'e'}catch(e){}UI.diff=UI.diff||d;if(UI.diff==='h')return pAdvH(diffSw('h'));return pa.apply(this,arguments)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='hstage')hBattle(+v);else if(a==='hworld'){UI.hworld=+v;render()}});
(function(){const st=document.createElement('style');st.textContent=`.diffsw.dh{background:linear-gradient(90deg,rgba(176,74,255,.22),var(--panel) 40%,var(--panel) 60%,rgba(176,74,255,.22));border-color:#5a2a8a}.diffsw.dh .dft b{color:#d4a0ff}
.navarr.th{--a1:#c88aff;--a2:#5a14a0;--ag:rgba(176,74,255,.5)}.dfd i.on.n{background:#ff8a96}.dfd i.on.h{background:#d4a0ff}
.nmbadge.hmbadge{background:linear-gradient(90deg,#5a14a0,#c03aff)}.hmban{box-shadow:inset 0 0 0 2px rgba(176,74,255,.6),0 0 24px rgba(176,74,255,.22)}
.btn.nmgo.hmgo,.btn.p.hmgo{background:linear-gradient(180deg,#b06aff,#5a14a0)!important;color:#fff!important}.hmpage .node.now{box-shadow:0 0 0 3px #c03aff,0 0 16px rgba(176,74,255,.5)}.hmtag{color:#d4a0ff}#battle.hmode .bh .t{color:#d4a0ff}`;document.head.appendChild(st)})();
try{TITLES.push({k:'abime',n:"Conquérant de l'Abîme",c:'#c03aff',d:'Terminer les 100 étapes du mode Difficile',ok:()=>(S.hmax||0)>=100})}catch(e){}
try{PATCH.unshift({v:38.6,d:'2 novembre 2026',t:'Le mode Difficile',items:["💀 <b>Nouveau : le mode Difficile</b>, débloqué en terminant les 100 étapes du mode Normal. 100 nouvelles étapes dans 10 mondes inédits : Plaines de Sang, Forêt Pétrifiée, Dunes d'Obsidienne, Marécage Maudit, Glacier Éternel, Abysses Noyées, Cœur du Volcan, Sanctuaire Corrompu, Néant Primordial et Trône de l'Apocalypse.","👹 <b>60 nouveaux monstres</b>, dont 10 boss, de Grohm le Boucher à Malgor, Fin des Temps.","🎁 Récompenses : beaucoup d'or, 50 gemmes par 1re victoire (250 sur les boss), 3 éclats légendaires et 1 éclat d'ultra-évolution par boss, le meilleur équipement, et le titre « Conquérant de l'Abîme » à l'étape 100.","⬅️➡️ Les flèches passent maintenant de Facile à Normal à Difficile."]})}catch(e){}

{const fi=finish;finish=function(res){const nm=B&&(B.hard||B.normal)&&!B.done;const r=fi.apply(this,arguments);if(nm&&res!==true)try{document.querySelectorAll('#battle .result .rw span').forEach(x=>{if(/^Puissance conseillée : /.test(x.textContent))x.remove()})}catch(e){}return r}}
/* ---- traductions anglaises (mode Difficile + libellés du mode Normal qui manquaient) ---- */
try{const HN={"Plaines de Sang":"Blood Plains","Forêt Pétrifiée":"Petrified Forest","Dunes d'Obsidienne":"Obsidian Dunes","Marécage Maudit":"Cursed Bog","Glacier Éternel":"Eternal Glacier","Abysses Noyées":"Drowned Abyss","Cœur du Volcan":"Heart of the Volcano","Sanctuaire Corrompu":"Corrupted Sanctuary","Néant Primordial":"Primordial Void","Trône de l'Apocalypse":"Throne of the Apocalypse",
 "Gobelin Sanguinaire":"Bloodthirsty Goblin","Slime Écarlate":"Scarlet Slime","Loup Ensanglanté":"Bloodied Wolf","Champignon Carnivore":"Carnivorous Mushroom","Bourreau Errant":"Wandering Executioner","Grohm le Boucher":"Grohm the Butcher",
 "Ent de Pierre":"Stone Ent","Tisseuse de Granit":"Granite Weaver","Faune Pétrifié":"Petrified Faun","Âme Figée":"Frozen Soul","Ourse de Basalte":"Basalt Bear","Gorgone Sylphyra":"Sylphyra the Gorgon",
 "Scorpion d'Obsidienne":"Obsidian Scorpion","Momie Ardente":"Blazing Mummy","Djinn Noir":"Black Djinn","Ver Dévoreur":"Devourer Worm","Spectre du Désert":"Desert Specter","Ankhar, Dieu-Scarabée":"Ankhar, Scarab God",
 "Crapaud Pestilentiel":"Pestilent Toad","Sorcière Pendue":"Hanged Witch","Goule Vorace":"Ravenous Ghoul","Hydre Pestilente":"Plague Hydra","Sangsue Titanesque":"Titanic Leech","Hydre aux Mille Fléaux":"Hydra of a Thousand Plagues",
 "Yéti Primordial":"Primordial Yeti","Loup du Blizzard":"Blizzard Wolf","Sentinelle de Givre":"Frost Sentinel","Harpie Polaire":"Polar Harpy","Troll Ancestral":"Ancestral Troll","Frimas, Roi de l'Hiver":"Frimas, King of Winter",
 "Triton Abyssal":"Abyssal Triton","Kraken des Profondeurs":"Kraken of the Deep","Sirène Funeste":"Baleful Siren","Crabe Titan":"Titan Crab","Noyé Éternel":"Eternal Drowned","Léviathan Ancestral":"Ancestral Leviathan",
 "Salamandre Infernale":"Infernal Salamander","Colosse de Lave":"Lava Colossus","Démon des Braises":"Ember Demon","Phénix Cendré":"Ashen Phoenix","Cerbère Infernal":"Infernal Cerberus","Ignir, Cœur de Magma":"Ignir, Heart of Magma",
 "Gargouille Profanée":"Desecrated Gargoyle","Paladin Corrompu":"Corrupted Paladin","Golem Profane":"Profane Golem","Griffon Noir":"Black Griffin","Séraphin Déchu":"Fallen Seraph","Sentinelle Profanée":"Desecrated Sentinel",
 "Rôdeur Primordial":"Primordial Stalker","Œil du Néant":"Eye of the Void","Archiliche":"Archlich","Démon du Néant":"Void Demon","Dévoreur Primordial":"Primordial Devourer","Néant Incarné":"Void Incarnate",
 "Héraut du Chaos":"Herald of Chaos","Chimère Apocalyptique":"Apocalyptic Chimera","Archidémon Suprême":"Supreme Archdemon","Horreur Indicible":"Unspeakable Horror","Dragon de l'Apocalypse":"Dragon of the Apocalypse","Malgor, Fin des Temps":"Malgor, End of Days"};
 const X=Object.assign({},HN,{"Difficile":"Hard","Mode Difficile":"Hard mode","Passer en mode Difficile":"Switch to Hard mode","Passer en mode Facile":"Switch to Easy mode","Passer en mode Normal":"Switch to Normal mode",
 "Étape # / # · le défi ultime":"Stage # / # · the ultimate challenge","Étape # / # · Difficile débloqué !":"Stage # / # · Hard unlocked!","DIFFICILE · MONDE INÉDIT":"HARD · NEW WORLD",
 "Étapes # à # en Difficile. Boss du monde :":"Stages # to # in Hard. World boss:","Étapes # à # en Normal. Boss du monde :":"Stages # to # in Normal. World boss:","· ton équipe est trop faible, renforce-la !":"· your team is too weak, make it stronger!",
 "💀 Combattre l'étape # Difficile":"💀 Fight Hard stage #","💀 Combattre l'étape # Difficile · BOSS":"💀 Fight Hard stage # · BOSS","Étape # difficile":"Hard stage #","Étape # normale":"Normal stage #",
 "💀 Difficile · Étape #":"💀 Hard · Stage #","💀 Difficile · Étape # · Boss":"💀 Hard · Stage # · Boss","MODE DIFFICILE":"HARD MODE",
 "Puissance conseillée en Difficile : # k.":"Recommended power in Hard: # k.","Puissance conseillée en Difficile : # M.":"Recommended power in Hard: # M.","Puissance conseillée en Difficile : #.":"Recommended power in Hard: #.",
 "🔒 Termine le mode Normal pour débloquer":"🔒 Finish Normal mode to unlock","🔒 Mode Difficile verrouillé":"🔒 Hard mode locked","Termine les # étapes du mode Normal (tu es à l'étape #).":"Finish the # stages of Normal mode (you're at stage #).",
 "Termine les # étapes du mode Normal pour débloquer le mode Difficile.":"Finish the # stages of Normal mode to unlock Hard mode.",
 "Les # étapes du mode Normal sont terminées, bravo ! Rejoue-les pour l'équipement.":"All # Normal stages cleared, well done! Replay them for gear.","Les # étapes du mode Difficile sont terminées. Tu es une légende ! Rejoue-les pour l'équipement.":"All # Hard stages cleared. You're a legend! Replay them for gear.",
 "Récompenses du mode Difficile : beaucoup d'or, # gemmes par #re victoire (# sur les boss), # éclats légendaires et # éclat d'ultra-évolution par boss, et le meilleur équipement du jeu.":"Hard mode rewards: lots of gold, # gems per first win (# on bosses), # legendary shards and # ultra-evolution shard per boss, and the best gear in the game.",
 "# k or (bonus Difficile)":"# k gold (Hard bonus)","# M or (bonus Difficile)":"# M gold (Hard bonus)","# or (bonus Difficile)":"# gold (Hard bonus)","# gemmes (1re victoire Difficile)":"# gems (first Hard win)","🌟 # éclat d'ultra-évolution":"🌟 # ultra-evolution shard",
 "💀 Mode Difficile terminé ! Titre « Conquérant de l'Abîme » débloqué.":"💀 Hard mode complete! \"Conqueror of the Abyss\" title unlocked.","Conquérant de l'Abîme":"Conqueror of the Abyss","Terminer les # étapes du mode Difficile":"Finish the # stages of Hard mode",
 "V# · Le mode Difficile":"V# · Hard mode","Le mode Difficile":"Hard mode","Nouveau : le mode Difficile":"New: Hard mode","# novembre #":"November #, #","# nouveaux monstres":"# new monsters",
 ", débloqué en terminant les # étapes du mode Normal. # nouvelles étapes dans # mondes inédits : Plaines de Sang, Forêt Pétrifiée, Dunes d'Obsidienne, Marécage Maudit, Glacier Éternel, Abysses Noyées, Cœur du Volcan, Sanctuaire Corrompu, Néant Primordial et Trône de l'Apocalypse.":", unlocked by finishing the # stages of Normal mode. # new stages across # brand-new worlds: Blood Plains, Petrified Forest, Obsidian Dunes, Cursed Bog, Eternal Glacier, Drowned Abyss, Heart of the Volcano, Corrupted Sanctuary, Primordial Void and Throne of the Apocalypse.",
 ", dont # boss, de Grohm le Boucher à Malgor, Fin des Temps.":", including # bosses, from Grohm the Butcher to Malgor, End of Days.",
 "🎁 Récompenses : beaucoup d'or, # gemmes par #re victoire (# sur les boss), # éclats légendaires et # éclat d'ultra-évolution par boss, le meilleur équipement, et le titre « Conquérant de l'Abîme » à l'étape #.":"🎁 Rewards: lots of gold, # gems per first win (# on bosses), # legendary shards and # ultra-evolution shard per boss, the best gear, and the \"Conqueror of the Abyss\" title at stage #.",
 "⬅️➡️ Les flèches passent maintenant de Facile à Normal à Difficile.":"⬅️➡️ The arrows now go from Easy to Normal to Hard.","🐉 Événement flash : Frénésie des raids pendant # h # !":"🐉 Flash event: Raid frenzy for # h #!"});
 const en=k=>X[k]||I18N_EN[k];
 for(const W of [...NWORLDS,...HWORLDS]){const w=en(W.n);if(w){X['#. '+W.n]='#. '+w;X['Monde # · '+W.n]='World # · '+w;X[W.n+' · Équipe principale ·']=w+' · Main team ·'}
   for(const m of [...W.m,W.b]){const e=en(m[0]);if(e){X[m[0]+' (boss)']=e+' (boss)';X[m[0]]=X[m[0]]||e}}
   const b=W.b[0],first=b.split(/[ ,]/)[0],eb=en(b);if(eb)X['Colère de '+first]='Wrath of '+eb.split(/[ ,]/)[0]}
 for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){console.warn('hard en',e)}
