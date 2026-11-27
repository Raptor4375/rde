
/* ================= V462 : LES LIENS ENTRE LES HÉROS DE SAISON, ET LES HÉROS DES CHRONIQUES =================
   · Affinités : Lucan, Veyra et Ossian ont chacun des liens avec les héros de leur histoire
     (la Garde d'Éther, le Tribunal des Lames). Celles de Veyra et d'Ossian apparaissent à leur arrivée.
   · Marn et Perrin s'obtenaient avec les Chroniques des Héros (retirées en v81) : ils rejoignent l'Invocation standard.
   · Le héros de la semaine ne change pas en cours de semaine quand un héros rejoint les invocations. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG&&LANG!=='fr')?en:fr;
const NOWT=()=>window.__HEVNOW||Date.now();
const HD=window.RDEHEVD||{};
const has=v=>typeof v==='number'&&HEROES[v];
const add=(name,id)=>{try{const a=AFF.find(x=>x.n===name);if(a&&has(id)&&!a.ids.includes(id))a.ids.push(id)}catch(e){}};
const neu=a=>{try{if(a.ids.every(has)&&!AFF.some(x=>x.n===a.n))AFF.push(a)}catch(e){}};
const NEW=[
 {n:'La Garde brisée',ic:'⚜️',ids:[77,76,69],need:2,fx:{atk:.08,hp:.08},d:'+8 % PV et ATQ',q:"Perrin : « Je ne vous crois pas, capitaine. » — Lucan : « Alors ne me quitte pas des yeux. »"},
 {n:'Brume et Lune',ic:'🌙',ids:[77,62],need:2,fx:{crit:.08,atk:.06},d:'+8 % critique, +6 % ATQ',q:"Nyx : « Tes loups hurlent après ma lune. » — Lucan : « Ils hurlent pour qu'elle les voie. »"},
 {n:'Ceux qui ont ouvert',ic:'🚪',ids:[77,78],need:2,fx:{atk:.10,en:10},d:'+10 % ATQ, +10 énergie au départ',q:"Veyra : « Toi aussi, tu as ouvert une porte que tu devais garder. » — Lucan : « Et toi aussi, tu as cru quelqu'un. »"},
 {n:'Les Guetteurs',ic:'🔭',ids:[78,71],need:2,fx:{spd:.06,crit:.06},d:'+6 % vitesse, +6 % critique',q:"Sorën : « Il est passé par la porte nord, il y a une heure. » — Veyra : « Alors j'ai encore le temps. »"},
 {n:'Le Tribunal des Lames',ic:'⚖️',ids:[79,78,74],need:2,fx:{skm:.12,crit:.06},d:'+12 % puissance des ultimes, +6 % critique',q:"Garance : « Votre Tribunal est tombé, juge. » — Ossian : « Je sais. J'étais assis dedans. »"},
 {n:'Le Verdict et la Brume',ic:'🌫️',ids:[79,77],need:2,fx:{en:20,tm:.06},d:'+20 énergie au départ, −6 % dégâts subis',q:"Ossian : « On m'a demandé de te juger. » — Lucan : « Alors regarde-moi me battre d'abord. »"}];
const apply=()=>{for(const a of NEW)neu(Object.assign({},a,{ids:a.ids.slice(),fx:Object.assign({},a.fx)}))};
apply();
{const rd=render;render=function(){apply();return rd.apply(this,arguments)}}
{const sb=startBattle;startBattle=function(){apply();return sb.apply(this,arguments)}}
try{Object.assign(I18N_EN,{'La Garde brisée':'The Broken Guard','Brume et Lune':'Mist and Moon','Ceux qui ont ouvert':'Those Who Opened','Les Guetteurs':'The Watchers','Le Tribunal des Lames':'The Court of Blades','Le Verdict et la Brume':'The Verdict and the Mist',
 '+8 % PV et ATQ':'+8 % HP and ATK','+8 % critique, +6 % ATQ':'+8 % crit, +6 % ATK','+10 % ATQ, +10 énergie au départ':'+10 % ATK, +10 starting energy','+6 % vitesse, +6 % critique':'+6 % speed, +6 % crit',
 '+12 % puissance des ultimes, +6 % critique':'+12 % ultimate power, +6 % crit','+20 énergie au départ, −6 % dégâts subis':'+20 starting energy, −6 % damage taken',
 "Perrin : « Je ne vous crois pas, capitaine. » — Lucan : « Alors ne me quitte pas des yeux. »":"Perrin: “I don't believe you, captain.” — Lucan: “Then don't take your eyes off me.”",
 "Nyx : « Tes loups hurlent après ma lune. » — Lucan : « Ils hurlent pour qu'elle les voie. »":"Nyx: “Your wolves howl at my moon.” — Lucan: “They howl so she'll see them.”",
 "Veyra : « Toi aussi, tu as ouvert une porte que tu devais garder. » — Lucan : « Et toi aussi, tu as cru quelqu'un. »":"Veyra: “You too opened a door you were meant to guard.” — Lucan: “And you too believed someone.”",
 "Sorën : « Il est passé par la porte nord, il y a une heure. » — Veyra : « Alors j'ai encore le temps. »":"Sorën: “He went through the north gate an hour ago.” — Veyra: “Then I still have time.”",
 "Garance : « Votre Tribunal est tombé, juge. » — Ossian : « Je sais. J'étais assis dedans. »":"Garance: “Your Court has fallen, judge.” — Ossian: “I know. I was sitting in it.”",
 "Ossian : « On m'a demandé de te juger. » — Lucan : « Alors regarde-moi me battre d'abord. »":"Ossian: “I've been asked to judge you.” — Lucan: “Then watch me fight first.”"})}catch(e){}

/* ---------- Marn et Perrin rejoignent l'Invocation standard ---------- */
const JOINT=Date.UTC(2026,10,27,12,0);
for(const i of[73,76]){const h=HEROES[i];if(!h)continue;try{delete h.ex}catch(e){}try{delete h.exd}catch(e){}}
try{for(const k in METAC)delete METAC[k]}catch(e){}
/* ---------- le héros de la semaine ne bouge pas en cours de semaine ---------- */
const JOIN={73:JOINT,76:JOINT};for(const i of[77,78,79])if(HD[i])JOIN[i]=HD[i].e;
try{featHero=function(){const w=weekKey(Date.now());const L=HEROES.filter(h=>h.r===4&&!h.ex&&h.i!==FORTUNA&&!(JOIN[h.i]&&weekKey(JOIN[h.i])>=w));return L[((w%L.length)+L.length)%L.length]}}catch(e){}

/* ---------- la page Méta : recalée sur des simulations (comme en v433) ---------- */
/* Arène et Aventure : chaque nouveau héros a remplacé un héros de sa classe dans la même équipe (80 combats en miroir
   par duel, 60 combats à l'étape 100). Raids et boss de guilde : dégâts totaux de l'équipe. */
const COR2={77:{pve:1.33,pvp:1.04},78:{pve:1.05,pvp:1.03},79:{pve:.9,pvp:1.06}};
const RCOR2={77:{raid0:.85,raid1:.9,raid2:.85},78:{raid0:1.1,raid1:1.3,raid2:1.35,guild:1.2},79:{raid0:1.4,raid2:1.25,guild:1.25}};
try{const mm=modeMult;modeMult=function(h,mk){let m=mm.apply(this,arguments);try{if(h){const c=(mk==='guild'||/^raid\d$/.test(mk))?RCOR2[h.i]:COR2[h.i];if(c&&c[mk])m*=c[mk]}}catch(e){}return m}}catch(e){}
try{for(const k in METAC)delete METAC[k]}catch(e){}
/* « Autour du dernier héros sorti » et « Les nouveautés dans la méta » suivent les sorties */
try{const L=[74,75,76,77,78,79].filter(i=>HEROES[i]);if(L.length)META_NEW.splice(0,META_NEW.length,...L)}catch(e){}

/* l'ancienne annonce des Chroniques des Héros (retirées en v81) ne s'affiche plus */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{return L.filter(a=>a&&a.k!=='hchr')}catch(e){return L}}}catch(e){}

/* ---------- notes de version ---------- */
try{const it=[
 "🐺 <b>Nouveau héros : Lucan le Loup de Brume</b> (Assassin légendaire). L'ancien capitaine de la Garde d'Éther achève les blessés : <b>+30 % de dégâts</b> sur les ennemis sous 50 % de PV, la <b>brume</b> le protège du coup suivant quand il tue, et son ultime « <b>Hurlement</b> » le fait <b>rejouer</b> s'il achève sa cible.",
 "🎪 <b>Les événements de héros</b> remplacent les Chroniques : chaque saison, un nouveau héros arrive avec sa tente dans la <b>Fête foraine</b>, sa monnaie et sa boutique, où tu peux <b>l'obtenir gratuitement en jouant</b>. Sa bannière (50/50 puis garanti) est ouverte en même temps.",
 "🐾 Les <b>Crocs de Brume</b> : +40 chaque jour (à récupérer dans la tente), +5 par victoire (150 par jour) et +20 par expédition au Donjon des Échos. Boutique : Lucan, des tickets de sa bannière, le cadre « Brume des Loups », le titre « Loup de Brume », des éclats, des gemmes et de l'or. L'événement dure jusqu'au <b>8 décembre</b>, et ce qui reste à la fin est changé en or.",
 "🤝 Nouvelles affinités : <b>La Garde brisée</b> (Lucan + Perrin ou Aegis) et <b>Brume et Lune</b> (Lucan + Nyx). D'autres arriveront avec les prochains héros : leurs histoires se croisent.",
 "🛡️ <b>Marn</b> et <b>Perrin</b>, qu'on obtenait avec les Chroniques des Héros, rejoignent l'Invocation standard.",
 "🔒 Le prochain héros arrive le <b>8 décembre</b>, avec la nouvelle saison du pass."];
 PATCH.unshift({v:82,d:'27 novembre 2026',t:'Lucan et les événements de héros',items:it});
 const E=[
 "🐺 <b>New hero: Lucan the Mist Wolf</b> (legendary Assassin). The former captain of the Aether Guard finishes off the wounded: <b>+30 % damage</b> on enemies under 50 % HP, the <b>mist</b> shields him from the next hit when he kills, and his ultimate “<b>Howl</b>” lets him <b>act again</b> if he finishes off his target.",
 "🎪 <b>Hero events</b> replace the Chronicles: every season, a new hero arrives with a tent in the <b>Fair</b>, a currency and a shop where you can <b>get them for free by playing</b>. Their banner (50/50 then guaranteed) opens at the same time.",
 "🐾 The <b>Mist Fangs</b>: +40 every day (claim it in the tent), +5 per win (150 per day) and +20 per Echo Dungeon run. Shop: Lucan, tickets for his banner, the “Mist Wolves” frame, the “Mist Wolf” title, shards, gems and gold. The event lasts until <b>December 8</b>, and whatever is left at the end turns into gold.",
 "🤝 New affinities: <b>The Broken Guard</b> (Lucan + Perrin or Aegis) and <b>Mist and Moon</b> (Lucan + Nyx). More will come with the next heroes: their stories cross.",
 "🛡️ <b>Marn</b> and <b>Perrin</b>, who were earned through the Hero Chronicles, join the Standard Summon.",
 "🔒 The next hero arrives on <b>December 8</b>, with the new pass season."];
 it.forEach((x,i)=>{I18N_EN[x]=E[i];try{RDEput(x,E[i])}catch(e){}});
 Object.assign(I18N_EN,{'Lucan et les événements de héros':'Lucan and the hero events','# décembre #':'December #, #','# janvier #':'January #, #','# décembre':'December #','# janvier':'January #'});
 /* les arrivées suivantes s'annoncent toutes seules, à leur date */
 if(HEROES[78]&&NOWT()>=(HD[78]||{}).s){const it2=[
   "🗝️ <b>Nouvelle héroïne : Veyra aux Mille Clés</b> (Guerrière légendaire). La geôlière du Tribunal des Lames gagne une clé à chaque attaque ; à 5 clés, son <b>Cadenas</b> enchaîne l'ennemi. Son ultime « <b>Toutes les portes s'ouvrent</b> » <b>brise les boucliers, la provocation et le serment</b> de toute l'équipe adverse.",
   "🔑 Son événement est ouvert dans la Fête foraine jusqu'au <b>22 décembre</b> : les <b>Clés Rouillées</b> permettent de la recruter gratuitement en jouant.",
   "🤝 Nouvelles affinités : <b>Ceux qui ont ouvert</b> (Veyra + Lucan), <b>Les Guetteurs</b> (Veyra + Sorën) et <b>Le Tribunal des Lames</b> (Veyra + Rouge-Garance).",
   "🐺 <b>Lucan</b> rejoint l'Invocation standard."];
   PATCH.unshift({v:82.1,d:'8 décembre 2026',t:'Veyra aux Mille Clés',items:it2,nogem:1});
   const E2=["🗝️ <b>New hero: Veyra of the Thousand Keys</b> (legendary Warrior). The jailer of the Court of Blades gains a key with every attack; at 5 keys, her <b>Padlock</b> chains an enemy. Her ultimate “<b>Every Door Opens</b>” <b>breaks the shields, taunt and oath</b> of the whole enemy team.",
     "🔑 Her event is open in the Fair until <b>December 22</b>: the <b>Rusty Keys</b> let you recruit her for free by playing.",
     "🤝 New affinities: <b>Those Who Opened</b> (Veyra + Lucan), <b>The Watchers</b> (Veyra + Sorën) and <b>The Court of Blades</b> (Veyra + Rouge-Garance).",
     "🐺 <b>Lucan</b> joins the Standard Summon."];
   it2.forEach((x,i)=>{I18N_EN[x]=E2[i];try{RDEput(x,E2[i])}catch(e){}});I18N_EN['Veyra aux Mille Clés']='Veyra of the Thousand Keys'}
 if(HEROES[79]&&NOWT()>=(HD[79]||{}).s){const it3=[
   "⚖️ <b>Nouveau héros MYTHIQUE : Ossian le Juge aux Yeux Bandés</b> (Mage). Chaque coup porté à ses alliés donne <b>une faute</b> à celui qui frappe ; son ultime « <b>Verdict</b> » frappe toute l'équipe adverse, <b>+25 % par faute</b>, et qui en a cinq est déclaré <b>coupable</b>. Une fois par combat, sa <b>Grâce</b> garde un allié debout avec 1 PV.",
   "🔏 Son événement est ouvert dans la Fête foraine jusqu'au <b>5 janvier</b> : les <b>Sceaux du Tribunal</b> permettent de le recruter gratuitement en jouant.",
   "🤝 Nouvelles affinités : <b>Le Tribunal des Lames</b> (Ossian + Veyra / Rouge-Garance) et <b>Le Verdict et la Brume</b> (Ossian + Lucan).",
   "🗝️ <b>Veyra</b> rejoint l'Invocation standard."];
   PATCH.unshift({v:82.2,d:'22 décembre 2026',t:'Ossian, le Juge aux Yeux Bandés',items:it3,nogem:1});
   const E3=["⚖️ <b>New MYTHIC hero: Ossian the Blindfolded Judge</b> (Mage). Every hit on his allies gives <b>a fault</b> to the attacker; his ultimate “<b>Verdict</b>” strikes the whole enemy team, <b>+25 % per fault</b>, and anyone with five is found <b>guilty</b>. Once per battle, his <b>Grace</b> keeps an ally standing with 1 HP.",
     "🔏 His event is open in the Fair until <b>January 5</b>: the <b>Court Seals</b> let you recruit him for free by playing.",
     "🤝 New affinities: <b>The Court of Blades</b> (Ossian + Veyra / Rouge-Garance) and <b>The Verdict and the Mist</b> (Ossian + Lucan).",
     "🗝️ <b>Veyra</b> joins the Standard Summon."];
   it3.forEach((x,i)=>{I18N_EN[x]=E3[i];try{RDEput(x,E3[i])}catch(e){}});I18N_EN['Ossian, le Juge aux Yeux Bandés']='Ossian, the Blindfolded Judge'}
}catch(e){}
}catch(e){console.warn('v462',e)}})();
