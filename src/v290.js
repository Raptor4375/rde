
/* ================= MODE HISTOIRE : « Les Fragments d'Éther », racontée par Plume ================= */
/* --- le lore ---
 Au commencement brillait la Première Étoile. En s'éteignant, elle laissa tomber son cœur sur le monde : le Cœur d'Éther.
 Autour de lui naquirent la Capitale et les 8 royaumes, et l'Éther coula partout comme une rivière invisible.
 Les Gardiens-Hiboux veillaient sur le Cœur. Les deux derniers étaient Plume et son frère aîné, Corvin.
 Corvin voulut garder l'Éther pour lui seul. Il ouvrit une porte vers le Néant, le lieu où vont les choses oubliées,
 et le Néant le dévora à moitié : il devint le Roi Sans Visage. Le Cœur d'Éther éclata en 7 Fragments.
 Plume, trop faible pour le réparer seule, attend depuis mille ans un « Porteur d'Éther ». C'est toi. */
const SAGA_WHO={plume:{n:'Plume',c:'#b8a4ff'},corvin:{n:'Corvin, le Roi Sans Visage',c:'#ff5a8a'},vesperax:{n:'Vesperax',c:'#c070ff'},masque:{n:'Le Joueur Masqué',c:'#ff5a8a'},brann:{n:'Brann Enclume-Rouge',c:'#ff9a3a'},narr:{n:'',c:'#ffe9a0'},moi:{n:'Toi',c:'#ffd84a'}};
const SAGA=[
 {t:'Le Réveil',ic:'🌅',req:1,bg:['#ffb88a','#7a5ab8','#3a2a6a'],place:"Prairies de l'Éveil",frag:1,
  intro:[['narr',"Il y a mille ans, le Cœur d'Éther a volé en éclats. Depuis, le Néant grignote le monde, un peu plus chaque nuit…"],
   ['plume',"Hou hou ! Enfin, tu ouvres les yeux ! N'aie pas peur, je suis Plume, la dernière Gardienne-Hibou du royaume."],
   ['plume',"Tu sens ce picotement dans tes mains ? C'est l'Éther. Il t'a choisi. Tu es un Porteur d'Éther, le premier depuis mille ans !"],
   [0,"Plume ! Les ombres du Néant attaquent le village ! Elles sont sorties de la vieille faille près du moulin !"],
   [1,"Bram et moi, on ne tiendra pas longtemps. Qui est ton ami, Plume ? Il sait se battre ?"],
   ['plume',"Il ne le sait pas encore… mais il va l'apprendre très vite !"],
   {ch:[["🏡 Mettre d'abord les villageois à l'abri",'cmp',"Les familles d'abord ! Lysa, guide-les vers le moulin."],["⚔️ Foncer droit sur les ombres",'brv',"On les arrête avant qu'elles touchent une seule maison !"]]},
   [0,"Alors on y va ! Bouclier levé !"]],
  boss:{n:'Ombre du Néant',h:270,st:3},
  outro:[['plume',"Tu as vu ça ? Quand tu as frappé l'ombre, un éclat de lumière est tombé de son cœur…"],
   ['plume',"C'est un Fragment d'Éther ! Le premier des sept. Si on les rassemble tous, on pourra reconstruire le Cœur et refermer le Néant."],
   [1,"Alors on part avec vous. Les Frères d'armes n'abandonnent jamais une quête !"],
   [0,"…Et puis on n'a plus de moulin. Autant voyager."],
   ['plume',"Prochaine étape : la Forêt d'Argent. La Mère-Racine sait peut-être où se cache le deuxième fragment."]]},
 {t:'La Forêt qui murmure',ic:'🌲',req:6,bg:['#7ad08a','#2a6a4a','#0a2a1a'],place:"Forêt d'Argent",frag:2,
  intro:[['narr',"La Forêt d'Argent est d'habitude pleine de chants d'oiseaux. Aujourd'hui, elle est silencieuse."],
   [10,"Chut ! Les arbres ont peur. Quelque chose ronge leurs racines…"],
   [14,"Le plus vieux d'entre eux, Sylvaroc, s'est réveillé en colère. Le Néant s'est glissé dans sa sève."],
   [54,"Je suis Oberon, gardien des Sylves. Si vous voulez aider, il faudra le calmer, pas le détruire."],
   ['plume',"Un arbre de mille ans contaminé… Le fragment doit être planté en lui. Le Néant s'en nourrit."],
   {ch:[["🌿 Essayer de lui parler d'abord",'cmp',"Sylvaroc ! Écoute-nous, on vient te soigner !"],["🪓 Viser directement le cœur de bois",'brv',"Pas le temps de discuter, le fragment est là, au centre !"]]},
   [10,"Attention, il nous a sentis !"]],
  boss:{n:'Ent corrompu',h:110,st:8},
  outro:[[59,"Doucement, mes enfants… Sylvaroc dort à nouveau. Le Néant a quitté sa sève."],
   [59,"Je suis Gaïa, la Mère-Racine. Ce fragment chantait dans ses racines comme un oiseau en cage. Prends-le, Porteur."],
   [59,"Mais méfie-toi : celui qui a planté le Néant ici n'était pas un monstre. Il portait un masque… et il riait."],
   ['plume',"Un masque… Non. Ce n'est pas possible."],
   [54,"Tu sembles savoir de qui il s'agit, petite chouette."],
   ['plume',"…Je vous le dirai quand j'en serai sûre. Allons voir Fortuna. Elle connaît tous les tricheurs du royaume."]]},
 {t:'Le Casino des Destins',ic:'🎰',req:12,bg:['#ffd84a','#a0287a','#2a0a2a'],place:'Casino de Fortuna',frag:3,
  intro:[[56,"Bienvenue dans mon casino ! Ici, la chance obéit à une seule personne : moi."],
   ['plume',"Fortuna, on cherche un joueur masqué. Il a semé le Néant dans la Forêt d'Argent."],
   [56,"…Le Joueur Masqué. Il y a cent ans, il est venu ici. C'est le seul à m'avoir battue, en trichant avec le Néant lui-même."],
   [56,"Ce soir-là, il a misé un éclat de lumière… et il l'a oublié sur ma table en partant. Je le garde depuis."],
   ['masque',"Oublié ? Moi ? Je n'oublie jamais rien, Fortuna. Je l'ai laissé… pour le reprendre au bon moment."],
   ['plume',"Cette voix… Corvin ?!"],
   ['masque',"Bonsoir, petite sœur. Toujours à jouer les héroïnes avec des enfants ? Mes cartes vont s'occuper d'eux."],
   {ch:[["🃏 Proposer à Fortuna de jouer en équipe",'cmp',"Fortuna, on gagne ensemble ou on perd ensemble !"],["💥 Retourner la table et attaquer",'brv',"Fini de jouer, Masqué !"]]},
   [56,"Ha ! Celui-là, je l'aime bien. Mes cartes sont avec toi, Porteur !"]],
  boss:{n:'Valet Masqué',h:330,st:14},
  outro:[['plume',"Il s'est enfui dans un nuage de cartes… mais le fragment est resté."],
   [56,"Prends-le. Et dis-moi, Plume… ce Corvin, c'est vraiment ton frère ?"],
   ['plume',"Oui. Le dernier Gardien-Hibou, avec moi. Il a voulu garder l'Éther pour lui… et il a ouvert la porte du Néant. C'est à cause de lui que le Cœur s'est brisé."],
   ['plume',"Depuis, il n'a plus de visage. Le Néant l'a à moitié dévoré. On l'appelle le Roi Sans Visage."],
   [56,"Alors je mise tout sur vous. Et Fortuna ne perd jamais deux fois."]]},
 {t:'Les Forges englouties',ic:'🔥',req:20,bg:['#ff9a3a','#8a2a10','#2a0a08'],place:'Forges englouties',frag:4,
  intro:[['brann',"Halte ! Personne n'entre dans mes forges sans… Oh. Une Gardienne-Hibou ? Ça faisait longtemps."],
   ['plume',"Brann Enclume-Rouge ! Le meilleur forgeron des huit royaumes. On cherche un fragment d'Éther."],
   ['brann',"Il est sous la montagne, dans le nid du vieux Drakhar. Le Néant a réveillé les golems de lave, ils gardent l'entrée."],
   [47,"Des golems ? Laissez-moi faire. Tout brûlera. Joliment."],
   [31,"Ashka, on a dit qu'on ne faisait PAS fondre les gentils ce coup-ci."],
   {ch:[["🛡️ Protéger les apprentis forgerons",'cmp',"Brann, fais sortir tes apprentis, on couvre la retraite !"],["🔨 Forger une arme avec Brann d'abord",'brv',"Brann, donne-nous ta meilleure lame. On fonce !"]]},
   ['brann',"Par ma barbe ! Ils arrivent !"]],
  boss:{n:'Golem de magma',h:18,st:22},
  outro:[[65,"…Qui ose troubler mon sommeil ? Ah. Un Porteur d'Éther. Ça faisait mille ans."],
   [65,"Le fragment me tenait chaud. Mais ce maudit Néant me donnait des cauchemars. Prends-le."],
   [65,"Et quand tu affronteras le Roi Sans Visage… appelle-moi. J'ai un vieux compte à régler avec lui."],
   ['brann',"Et moi je te forgerai de quoi le frapper. Repasse à l'atelier quand tu veux, gamin !"],
   ['plume',"Quatre fragments… On est à mi-chemin. Mais Corvin va forcément réagir."]]},
 {t:'La Bibliothèque du Temps',ic:'⏳',req:30,bg:['#8ad8ff','#3a3a8a','#0a0a2a'],place:'Bibliothèque du Temps',frag:5,
  intro:[[45,"Les étoiles m'avaient annoncé votre venue. Et aussi que vous seriez en retard de trois minutes."],
   [58,"Trois minutes et douze secondes. Bonjour, Plume. Bonjour, Porteur."],
   ['plume',"Kaïros ! Tu as vu tous les futurs. Dis-nous : peut-on encore sauver le Cœur d'Éther ?"],
   [58,"Dans la plupart des futurs, non. Mais il en existe un… où le Porteur fait un choix que personne n'attend."],
   [58,"Je ne peux pas te dire lequel. Si je le dis, il disparaît."],
   ['corvin',"Kaïros, toujours aussi mystérieux. Moi aussi j'ai vu ce futur. Et je vais l'effacer."],
   ['plume',"Corvin ! Arrête ! Tu peux encore revenir, tu le sais !"],
   ['corvin',"Revenir ? Il n'y a plus rien à quoi revenir, petite sœur. Mes ombres vont dévorer cette bibliothèque, page par page."],
   {ch:[["📚 Sauver les livres et les archives",'cmp',"Calix, aide-moi à protéger les archives !"],["⏳ Poursuivre Corvin à travers le temps",'brv',"Kaïros, ouvre-moi un passage, je le suis !"]]}],
  boss:{n:'Ombre du Néant',h:250,st:32},
  outro:[[58,"Tu l'as repoussé. Le fragment était caché dans l'horloge centrale… depuis toujours."],
   [45,"Les étoiles bougent. Elles dessinent une nouvelle constellation : une chouette et un corbeau, côte à côte."],
   ['plume',"Côte à côte… Kaïros, est-ce que ça veut dire que…"],
   [58,"Je ne dirai rien. Mais garde ton cœur ouvert, Plume. Toi aussi, Porteur."]]},
 {t:'Les Abysses',ic:'🌊',req:40,bg:['#5ab8e8','#1a3a8a','#020a2a'],place:'Abysses',frag:6,
  intro:[['narr',"Plus bas que la mer, plus bas que la lumière, s'étendent les Abysses."],
   [19,"Un navire a coulé cette nuit. Des marins sont encore prisonniers dans les profondeurs."],
   [66,"Je les ai entendus. Le Néant a réveillé le Kraken des Abysses, et il garde le sixième fragment."],
   [66,"Je suis Léviathane. On dit que je n'ai pas de cœur. On dit beaucoup de bêtises, là-haut."],
   {ch:[["⚓ Libérer les marins en premier",'cmp',"Les marins d'abord ! Le Kraken peut attendre."],["🔱 Attirer le Kraken loin d'eux",'brv',"Je fais diversion. Léviathane, sauve-les pendant ce temps !"]]},
   [66,"Courageux ET gentil. Les gens d'en haut ne sont pas tous inutiles, finalement."]],
  boss:{n:'Kraken des Abysses',h:210,st:42},
  outro:[[19,"Tous les marins sont remontés à la surface. Ils chantent ton nom sur le port !"],
   [66,"Voici le sixième fragment. Il ne t'en reste qu'un."],
   [66,"Le dernier est dans le ciel. Là où la Guerre des Cieux a eu lieu… et ce n'était pas un hasard."],
   ['plume',"La guerre entre Anges et Démons… c'était Corvin ? Il voulait nous affaiblir pendant qu'il cherchait le dernier fragment !"]]},
 {t:'Les Cieux brisés',ic:'☁️',req:55,bg:['#fff6dc','#8ac8ff','#3a4a9a'],place:'Cieux brisés',frag:7,
  intro:[[64,"Bienvenue dans ce qui reste des Cieux. La guerre a laissé des trous dans les nuages."],
   [61,"Les Anges et les Démons se sont battus pendant trois jours. Et pendant ce temps, quelqu'un fouillait les ruines."],
   ['vesperax',"Quelqu'un ? Moi. Vesperax, chevalier du Roi Sans Visage. Et j'ai trouvé ce que je cherchais."],
   ['vesperax',"Le septième fragment. Mon roi le recevra avant que la lune se lève."],
   [57,"Pas si le soleil se lève avant toi, chevalier."],
   [62,"…Et la lune est de notre côté aussi."],
   {ch:[["🕊️ Proposer à Vesperax de changer de camp",'cmp',"Vesperax, tu n'es pas obligé de le servir !"],["⚔️ Le défier en duel",'brv',"Vesperax ! Toi et moi, maintenant !"]]},
   ['vesperax',"Assez de discours. Mon épée répondra pour moi !"]],
  boss:{n:'Vesperax',h:285,st:57},
  outro:[['vesperax',"…Tu es plus fort que mon roi ne le croyait. Prends le fragment."],
   ['vesperax',"Il n'a pas toujours été comme ça, tu sais. Avant le Néant, Corvin riait. Il chantait même… faux."],
   ['plume',"Il chantait horriblement faux. C'était mon frère préféré. Mon seul frère."],
   [64,"Sept fragments. Le Cœur d'Éther peut renaître. Mais Corvin vous attend sur le Trône du Néant."],
   ['plume',"Alors allons-y. C'est la fin de l'histoire… ou le début d'une autre."]]},
 {t:'Le Trône du Néant',ic:'🌌',req:70,bg:['#c03aff','#2a0a4a','#05020a'],place:'Trône du Néant',frag:7,final:1,
  intro:[['narr',"Au bout du monde, là où même les souvenirs s'effacent, se dresse le Trône du Néant."],
   ['corvin',"Sept fragments. Bravo, petite sœur. Tu m'as apporté tout ce qu'il me fallait."],
   ['plume',"Corvin, regarde-toi. Le Néant te dévore. Il ne te reste presque plus rien."],
   ['corvin',"Il me reste ma volonté. Avec le Cœur d'Éther, je ne serai plus jamais oublié. Plus personne ne sera oublié !"],
   ['plume',"C'est ça que tu voulais ? Ne pas être oublié ? Je ne t'ai jamais oublié, moi. Pas un seul jour en mille ans."],
   ['corvin',"…Tais-toi. TAIS-TOI ! Porteur, viens me prendre ces fragments, si tu en es capable !"],
   [65,"Tu m'as appelé, Porteur ? J'arrive. Personne ne touche à mes cauchemars."],
   {ch:[["🤝 Tendre la main à Corvin pendant le combat",'cmp',"Corvin ! Plume t'attend. Il n'est pas trop tard !"],["⚡ Tout donner pour briser le Néant",'brv',"Tous ensemble, brisons ce trône !"]]}],
  boss:{n:'Corvin',h:300,st:72},
  outroA:[['corvin',"…Pourquoi… pourquoi tu me tends la main ? Après tout ce que j'ai fait ?"],
   ['plume',"Parce que tu es mon frère. Et parce que le Porteur m'a appris que tout le monde mérite une deuxième chance."],
   ['narr',"Les sept fragments s'élèvent. Ils tournent, de plus en plus vite… et le Cœur d'Éther renaît dans un éclair de lumière."],
   ['narr',"Le masque de Corvin se fissure. Dessous, il y a un vieux hibou fatigué, aux plumes grises, qui pleure."],
   ['corvin',"Plume… je suis désolé. J'avais tellement peur d'être oublié."],
   ['plume',"Alors reste. On te rappellera tous les jours à quel point tu chantes faux. Hou hou !"],
   ['plume',"Porteur… merci. Le royaume est sauvé, et j'ai retrouvé mon frère. Tu es le plus grand héros que j'aie connu."]],
  outroB:[['corvin',"Non… NON ! Le Néant… il m'abandonne…"],
   ['narr',"Les sept fragments s'élèvent. Le Cœur d'Éther renaît, et sa lumière repousse le Néant au-delà du monde."],
   ['narr',"Corvin disparaît avec lui. Dans le silence, une seule plume grise tombe doucement sur le trône vide."],
   ['plume',"…Adieu, grand frère. Un jour, peut-être, la lumière ira te chercher là-bas."],
   ['plume',"Porteur… le royaume est sauvé. Grâce à toi. Je garderai cette plume. Et je garderai ton nom, pour toujours."]]}];
const SAGA_MONS={'Ent corrompu':'Sylvaroc','Golem de magma':"Colosse d'Éther",'Kraken des Abysses':'Kraken Céleste'};
for(const [a,b] of Object.entries(SAGA_MONS))MONS[a]=()=>MONS[b]();
MONS['Ombre du Néant']=()=>{const O='#170f2a';return`<ellipse cx="50" cy="56" rx="34" ry="40" fill="#1a0a2a" opacity=".55"/><path d="M22 100Q16 60 30 40Q40 20 50 18Q60 20 70 40Q84 60 78 100Q72 90 66 100Q60 88 54 100Q48 88 42 100Q36 90 30 100Z" fill="#2a1240" stroke="${O}" stroke-width="1.8"/><path d="M30 40Q24 30 14 34Q20 44 30 46M70 40Q76 30 86 34Q80 44 70 46" fill="#3a1a5a" stroke="${O}" stroke-width="1.4"/><ellipse cx="41" cy="44" rx="6" ry="4" fill="#ff3a8a"/><ellipse cx="59" cy="44" rx="6" ry="4" fill="#ff3a8a"/><circle cx="41" cy="44" r="1.6" fill="#fff"/><circle cx="59" cy="44" r="1.6" fill="#fff"/><path d="M40 60Q50 68 60 60" stroke="#ff3a8a" stroke-width="2" fill="none"/>${[0,1,2,3,4].map(i=>`<circle cx="${30+i*10}" cy="${80+(i%2)*6}" r="1.6" fill="#c070ff" opacity=".8"/>`).join('')}`};
MONS['Valet Masqué']=()=>{const O='#170f2a';return`<path d="M24 100L30 60Q50 50 70 60L76 100Z" fill="#2a1a4a" stroke="${O}" stroke-width="1.8"/><path d="M30 60L50 100L70 60" fill="#d1263b" stroke="${O}" stroke-width="1.4"/><ellipse cx="50" cy="40" rx="16" ry="19" fill="#f4ecf8" stroke="${O}" stroke-width="1.8"/><path d="M34 38Q50 30 66 38L64 46Q50 42 36 46Z" fill="#140c24"/><circle cx="43" cy="41" r="2.4" fill="#ff3a8a"/><circle cx="57" cy="41" r="2.4" fill="#ff3a8a"/><path d="M42 52Q50 58 58 52" stroke="${O}" stroke-width="1.6" fill="none"/><path d="M30 24L50 8L70 24L64 26L50 16L36 26Z" fill="#ffd84a" stroke="${O}" stroke-width="1.4"/>${[[12,30,-20],[84,36,20],[18,70,-10]].map(([x,y,r])=>`<g transform="translate(${x} ${y}) rotate(${r})"><rect x="-6" y="-9" width="12" height="18" rx="2" fill="#fff" stroke="${O}"/><text y="4" text-anchor="middle" font-size="9" fill="#d1263b">♥</text></g>`).join('')}`};
MONS['Vesperax']=()=>{const O='#170f2a';return`<path d="M18 100L26 58Q50 46 74 58L82 100Z" fill="#2a2240" stroke="${O}" stroke-width="1.8"/><path d="M26 58Q8 70 10 96L22 92Z M74 58Q92 70 90 96L78 92Z" fill="#3a2a5a" stroke="${O}" stroke-width="1.6"/><path d="M36 60L50 96L64 60" fill="#5a3a8a" stroke="${O}" stroke-width="1.2"/><path d="M34 44Q34 18 50 16Q66 18 66 44L60 52H40Z" fill="#4a4060" stroke="${O}" stroke-width="1.8"/><path d="M38 36H62V40H38Z" fill="#140c24"/><path d="M40 37h7M53 37h7" stroke="#c070ff" stroke-width="2"/><path d="M50 16V4M44 8l6 -4l6 4" stroke="#c070ff" stroke-width="2" fill="none"/><path d="M80 20L70 90" stroke="#b8b0d0" stroke-width="4"/><path d="M80 20L70 90" stroke="${O}" stroke-width="1"/><path d="M66 62L80 66" stroke="#ffd84a" stroke-width="3"/>`};
MONS['Corvin']=()=>{const O='#170f2a';return`<circle cx="50" cy="44" r="44" fill="#c03aff" opacity=".12"/><path d="M14 100Q12 62 30 50Q50 40 70 50Q88 62 86 100Z" fill="#1a1028" stroke="${O}" stroke-width="1.8"/><path d="M30 52Q4 56 2 86Q14 76 22 80Q14 64 30 60M70 52Q96 56 98 86Q86 76 78 80Q86 64 70 60" fill="#2a1a3a" stroke="${O}" stroke-width="1.6"/><ellipse cx="50" cy="40" rx="22" ry="22" fill="#3a3048" stroke="${O}" stroke-width="1.8"/><path d="M30 34Q50 18 70 34Q66 52 50 56Q34 52 30 34Z" fill="#f4ecf8" stroke="${O}" stroke-width="1.6"/><path d="M50 22L52 56M40 30l-2 16" stroke="#8a7aa8" stroke-width="1"/><ellipse cx="41" cy="38" rx="5" ry="4" fill="#140c24"/><ellipse cx="59" cy="38" rx="5" ry="4" fill="#140c24"/><circle cx="41" cy="38" r="1.8" fill="#ff3a8a"/><circle cx="59" cy="38" r="1.8" fill="#ff3a8a"/><path d="M47 46L50 52L53 46Z" fill="#8a7aa8"/><path d="M30 22L36 6L42 18L50 2L58 18L64 6L70 22Z" fill="#5a2a8a" stroke="${O}" stroke-width="1.4"/><circle cx="50" cy="12" r="2.6" fill="#ff3a8a"/>`};
/* --- portraits des personnages de l'histoire --- */
function sagaFig(w){try{if(w==='plume')return`<div class="sgfig plumef">${plumeSVG(SGP.mood||'happy')}</div>`;if(typeof w==='number'&&HEROES[w])return`<div class="sgfig"><img alt="" src="${btImg(w,0)}"></div>`;
  if(w==='brann'&&typeof npcSVG==='function')return`<div class="sgfig npc">${npcSVG('forgeron')}</div>`;if(w==='corvin'||w==='masque')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS['Corvin']()}</svg></div>`;if(w==='vesperax')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS['Vesperax']()}</svg></div>`}catch(e){}return''}
function sagaName(w){if(typeof w==='number')return HEROES[w]?HEROES[w].n:'?';return(SAGA_WHO[w]||{}).n||''}
function sagaColor(w){if(typeof w==='number'){try{return CLS[HEROES[w].c].c}catch(e){return'#fff'}}return(SAGA_WHO[w]||{}).c||'#fff'}
function SG(){if(!S.saga||typeof S.saga!=='object')S.saga={done:{},cmp:0,brv:0,ch:{}};return S.saga}
function sagaUnlocked(i){return(S.max||1)>=SAGA[i].req&&(i===0||SG().done[i-1])}
function sagaNext(){for(let i=0;i<SAGA.length;i++)if(!SG().done[i])return i;return-1}
/* --- le lecteur de dialogues --- */
const SGP={on:false,ch:0,part:'intro',i:0,mood:'happy',lines:null,typing:null};
function sagaBgSVG(c){const cfg=SAGA[c];const [a,b,d]=cfg.bg;let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sgb${c}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient></defs><rect width="400" height="700" fill="url(#sgb${c})"/>`;
  const R=rng(c*77+5);if(c===1)for(let i=0;i<9;i++){const x=R()*400;s+=`<path d="M${x} 560V300" stroke="#1a3a2a" stroke-width="${8+R()*10}"/><circle cx="${x}" cy="${290+R()*30}" r="${40+R()*30}" fill="#2a5a3a" opacity=".8"/>`}
  else if(c===2)for(let i=0;i<14;i++)s+=`<circle cx="${R()*400}" cy="${R()*400}" r="${2+R()*3}" fill="#ffd84a" opacity=".7"><animate attributeName="opacity" values=".2;1;.2" dur="${1+R()*2}s" repeatCount="indefinite"/></circle>`;
  else if(c===3)for(let i=0;i<10;i++){const x=R()*400;s+=`<circle cx="${x}" cy="${600-R()*200}" r="2" fill="#ffb03a"><animate attributeName="cy" values="620;300" dur="${3+R()*3}s" repeatCount="indefinite"/></circle>`}
  else if(c===4)for(let i=0;i<6;i++){const x=40+i*60;s+=`<rect x="${x}" y="${250+R()*80}" width="36" height="300" fill="#1a1a4a" opacity=".6"/><circle cx="${x+18}" cy="240" r="16" fill="none" stroke="#8ad8ff" stroke-width="2" opacity=".5"/>`}
  else if(c===5)for(let i=0;i<14;i++)s+=`<circle cx="${R()*400}" cy="700" r="${2+R()*4}" fill="#cfefff" opacity=".6"><animate attributeName="cy" values="700;200" dur="${4+R()*4}s" begin="${R()*4}s" repeatCount="indefinite"/></circle>`;
  else if(c===6)for(let i=0;i<5;i++)s+=`<ellipse cx="${R()*400}" cy="${100+R()*400}" rx="${50+R()*40}" ry="18" fill="#fff" opacity=".5"><animate attributeName="cx" values="-80;480" dur="${30+R()*20}s" repeatCount="indefinite"/></ellipse>`;
  else if(c===7)for(let i=0;i<20;i++)s+=`<circle cx="${R()*400}" cy="${R()*700}" r="1.4" fill="#e0b0ff"><animate attributeName="opacity" values="0;1;0" dur="${2+R()*3}s" repeatCount="indefinite"/></circle>`;
  else{s+=`<path d="M0 560Q100 500 200 540T400 520V700H0Z" fill="#3a2a5a" opacity=".7"/>`;for(let i=0;i<4;i++)s+=`<path d="M${60+i*90} 560Q${70+i*90} 520 ${90+i*90} 540" fill="#5a8a4a"/>`}
  return s+`<rect y="460" width="400" height="240" fill="#000" opacity=".25"/></svg>`}
function sagaOpen(c,part){const cfg=SAGA[c];SGP.on=true;SGP.ch=c;SGP.part=part||'intro';SGP.i=0;let L=cfg[SGP.part];if(SGP.part==='outro'&&cfg.final)L=SG().cmp>=SG().brv?cfg.outroA:cfg.outroB;SGP.lines=L||[];
  let o=document.getElementById('sgov');if(!o){o=document.createElement('div');o.id='sgov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');document.body.appendChild(o)}
  o.innerHTML=`${sagaBgSVG(c)}<div class="sgtop"><span class="sgchip">${cfg.ic} Chapitre ${c+1} · ${esc(cfg.t)}</span><button class="btn sm" data-sg="skip">Passer ⏭</button></div><div class="sgstage"><div class="sgl"></div><div class="sgr"></div></div><div class="sgbox"><div class="sgname"></div><div class="sgtext"></div><div class="sgchoices"></div><div class="sgnext">Touche pour continuer ▸</div></div>`;
  try{musicWant(c>=6?'dungeon':'menu')}catch(e){}sagaShow()}
function sagaShow(){const o=document.getElementById('sgov');if(!o)return;const L=SGP.lines[SGP.i];if(!L)return sagaPartEnd();
  const box=o.querySelector('.sgbox'),ch=o.querySelector('.sgchoices'),nm=o.querySelector('.sgname'),tx=o.querySelector('.sgtext');ch.innerHTML='';
  if(L.ch){nm.textContent='Que fais-tu ?';nm.style.color='#ffd84a';tx.textContent='';box.classList.add('choice');ch.innerHTML=L.ch.map((c,k)=>`<button class="sgc" data-sg="pick" data-v="${k}">${esc(c[0])}</button>`).join('');return}
  box.classList.remove('choice');const [w,t]=L;const left=w==='plume'||w==='moi'||(typeof w==='number'&&[0,1,10,14,31,19,57,62,61].includes(w));
  SGP.mood=/[?!…]$/.test(t)&&/Non|NON|pas possible|Arrête|désolé|Adieu/.test(t)?'think':'happy';
  const fig=sagaFig(w);if(w!=='narr'){const side=o.querySelector(left?'.sgl':'.sgr');if(side.dataset.w!==String(w)){side.dataset.w=String(w);side.innerHTML=fig}o.querySelector('.sgl').classList.toggle('dim',!left);o.querySelector('.sgr').classList.toggle('dim',left)}else{o.querySelector('.sgl').classList.add('dim');o.querySelector('.sgr').classList.add('dim')}
  nm.textContent=sagaName(w);nm.style.color=sagaColor(w);box.classList.toggle('narr',w==='narr');
  clearInterval(SGP.typing);let k=0;tx.textContent='';SGP.full=t;SGP.typing=setInterval(()=>{k+=2;tx.textContent=t.slice(0,k);if(k>=t.length){clearInterval(SGP.typing);SGP.typing=null}},18)}
function sagaAdvance(){if(SGP.typing){clearInterval(SGP.typing);SGP.typing=null;const tx=document.querySelector('#sgov .sgtext');if(tx)tx.textContent=SGP.full;return}const L=SGP.lines[SGP.i];if(L&&L.ch)return;SGP.i++;sagaShow()}
function sagaPick(k){const L=SGP.lines[SGP.i];if(!L||!L.ch)return;const c=L.ch[k];const G=SG();G[c[1]]=(G[c[1]]||0)+1;G.ch[SGP.ch]=c[1];save();SGP.lines.splice(SGP.i+1,0,['moi',c[2]]);SGP.i++;sagaShow()}
function sagaClose(){SGP.on=false;clearInterval(SGP.typing);const o=document.getElementById('sgov');if(o)o.remove();try{musicWant(pageTheme())}catch(e){}}
function sagaPartEnd(){const c=SGP.ch;if(SGP.part==='intro'){sagaClose();sagaBattle(c)}else{sagaClose();sagaReward(c)}}
/* --- combat de chapitre --- */
const SGX={go:false,active:false,ch:-1,pend:null};
function sagaBattle(c){SGX.ch=c;SGX.go=true;SGX.active=false;try{startBattle('event')}finally{SGX.go=false}if(!B)toast("Ajoute des héros à ton équipe Aventure !")}
{const eb=evBattle;evBattle=function(){if(!SGX.go)return eb.apply(this,arguments);SGX.go=false;const c=SGX.ch,cfg=SAGA[c],st=cfg.boss.st;const g=Math.pow(GROW,st-1)*(1+1.1*(st-1)/99);
  let minions=[];try{minions=stageFoes(st%10===0?st-1:st).slice(0,2)}catch(e){}
  const boss=foeUnit(9,{name:cfg.boss.n,boss:1,max:Math.round(380*g*(4.2+c*.15)),atk:Math.round(42*g*1.5),def:Math.round(18*g*1.3),spd:106,port:monArt(cfg.boss.n,cfg.boss.h,true),sk:{n:c===7?'Éclipse du Néant':'Vague du Néant',tg:'all',fx:{dmg:120+c*4,weak:1}}});
  SGX.active=true;return{foes:[...minions,boss],title:`${cfg.ic} ${cfg.t}`,sub:`Mode histoire · chapitre ${c+1}`,maxR:30,wc:cfg.boss.h}}}
{const ef=evFinish;evFinish=function(dmg,rw){if(!SGX.active)return ef.apply(this,arguments);SGX.active=false;const win=!B.units.some(u=>u.side===1&&u.hp>0);
  if(win){SGX.pend={ch:SGX.ch,part:'outro'};rw.push('📖 La suite de l\'histoire t\'attend…');return'Victoire !'}rw.push('🦉 Plume : « Pas grave ! Monte un peu tes héros et on retente, je suis avec toi. »');return'Défaite…'}}
setInterval(()=>{try{if(SGX.pend&&!B&&!document.querySelector('.result')&&!$('#ovl').innerHTML){const p=SGX.pend;SGX.pend=null;sagaOpen(p.ch,p.part)}}catch(e){}},500);
const SAGA_RW=[[100,0],[120,0],[150,1],[150,0],[180,1],[200,0],[220,1],[500,3]];
function sagaReward(c){const G=SG();if(G.done[c]){render();return}G.done[c]=Date.now();const [gm,sh]=SAGA_RW[c];S.gems+=gm;S.shards+=sh;save();const cfg=SAGA[c],fin=!!cfg.final;
  modal(`<div class="sgrw"><div class="sgfrag">${fin?'💖':'✦'}</div><div class="h">${fin?'Le Cœur d\'Éther renaît !':'Fragment d\'Éther '+cfg.frag+' / 7'}</div><p class="sub">${fin?(G.cmp>=G.brv?'Fin de la Lumière : Corvin est sauvé.':'Fin du Courage : le Néant est banni.'):'Chapitre '+(c+1)+' terminé : « '+esc(cfg.t)+' ».'}</p>
   <div class="sgfrags">${[1,2,3,4,5,6,7].map(i=>`<i class="${i<=cfg.frag?'on':''}">✦</i>`).join('')}</div><div class="xrw"><div>${GEM}${gm} gemmes</div>${sh?`<div>${SHARD}${sh} éclat${sh>1?'s':''} légendaire${sh>1?'s':''}</div>`:''}${fin?'<div>🏷️ Titre « Porteur d\'Éther »</div>':''}</div>
   <button class="btn p" data-a="close" style="width:100%;margin-top:10px">${fin?'Merci, Plume 🦉':'Continuer l\'aventure'}</button></div>`);render()}
document.addEventListener('click',e=>{const o=document.getElementById('sgov');if(!o||!o.contains(e.target))return;e.preventDefault();e.stopPropagation();const b=e.target.closest('[data-sg]');
  if(b){const a=b.dataset.sg;if(a==='pick')return sagaPick(+b.dataset.v);if(a==='skip'){const L=SGP.lines;for(let i=SGP.i;i<L.length;i++)if(L[i].ch){SGP.i=i;return sagaShow()}SGP.i=L.length;return sagaShow()}}sagaAdvance()},true);
/* --- le Livre de l'Histoire (dans l'Aventure) --- */
function sagaCard(){const G=SG(),n=sagaNext();const done=Object.keys(G.done).length;
  const items=SAGA.map((c,i)=>{const ok=!!G.done[i],un=sagaUnlocked(i);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="sgplay" data-v="${i}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${i+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Étape ${c.req} requise`}</small></button>`}).join('');
  return`<div class="card sgcard"><div class="sghd"><div class="sgpl">${plumeSVG('happy')}</div><div style="min-width:0;flex:1"><div class="h3" style="margin:0">📖 Les Fragments d'Éther</div><div class="muted" style="font-size:12.5px">Mode histoire avec Plume · ${done}/8 chapitres · ${G.cmp+G.brv?`💗 ${G.cmp} · ⚔️ ${G.brv}`:'tes choix comptent'}</div>
   <div class="sgfrags sm">${[1,2,3,4,5,6,7].map(i=>`<i class="${done>=i?'on':''}">✦</i>`).join('')}</div></div></div>
   ${n>=0&&sagaUnlocked(n)?`<button class="btn p sgbig" data-a="sgplay" data-v="${n}">▶️ ${SAGA[n].ic} Chapitre ${n+1} : ${esc(SAGA[n].t)}</button>`:n>=0?`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Prochain chapitre à l'étape ${SAGA[n].req} de l'Aventure.</p>`:'<p style="margin:8px 0 0;font-size:13px">💖 Tu as sauvé le Cœur d\'Éther. Merci, Porteur !</p>'}
   <details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${items}</div></details></div>`}
{const pa=pAdv;pAdv=function(){const h=pa.apply(this,arguments);try{const i=h.indexOf('<div class="card');if(i>=0)return h.slice(0,i)+sagaCard()+h.slice(i)}catch(e){}return h}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="sgplay"]');if(!t)return;e.preventDefault();e.stopPropagation();const i=+t.dataset.v;if(!sagaUnlocked(i)&&!SG().done[i])return;sagaOpen(i,'intro')},true);
/* --- Plume plus présente : elle se pose dans chaque lieu et donne un conseil --- */
const PLUME_TIPS=[()=>{const n=sagaNext();return n>=0&&sagaUnlocked(n)?`Le chapitre ${n+1} de notre histoire t'attend dans l'Aventure ! Hou hou !`:null},()=>expReadyN()?`${expReadyN()} expédition(s) sont rentrées au Grand hall de ta guilde !`:null,()=>{try{return DG().keys>0?"Il te reste des clés pour le Donjon des Échos. Tu oses descendre ?":null}catch(e){return null}},()=>{try{return WBS().at>0?"Le boss mondial du jour attend tes coups. Tout le royaume compte sur toi !":null}catch(e){return null}},()=>storyPending()?"Un de tes héros a un nouveau chapitre d'histoire à lire !":null,
 ()=>"Astuce : les affinités entre héros donnent de gros bonus. Regarde la fiche de tes héros !",()=>"Astuce : les doublons servent à faire évoluer tes héros. Ne les jette jamais !",()=>"Astuce : un équipement amélioré à la forge vaut souvent mieux qu'un nouveau héros.",()=>"Le saviez-vous ? Mon frère Corvin chantait horriblement faux. Hou hou…"];
function plumeTip(){for(const f of PLUME_TIPS.slice(0,5)){try{const t=f();if(t)return t}catch(e){}}const L=PLUME_TIPS.slice(5);return L[Math.floor(Math.random()*L.length)]()}
{const lp=lobbyPage;lobbyPage=function(){const h=lp.apply(this,arguments);return h.replace('<div class="h">','<div class="h"><button class="plumeb" data-a="plumetip" aria-label="Plume">'+plumeSVG('happy')+'</button>')}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="plumetip"]');if(!t)return;e.preventDefault();e.stopPropagation();const tip=plumeTip();modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="plumetip"><div class="plumetipm">${plumeSVG('happy')}</div><div class="tubub"><div class="tut">Plume</div><div class="tux">${esc(tip)}</div></div></div><div class="row" style="gap:8px;margin-top:10px"><button class="btn p" data-a="sgopenbook" style="flex:1">📖 Mode histoire</button><button class="btn" data-a="tuto">📖 Tuto</button></div>`)},true);
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="sgopenbook"]');if(!t)return;e.preventDefault();e.stopPropagation();closeModal();TAB='adv';render();window.scrollTo(0,0)},true);
