
/* ================= LIVRE IV : « La Dernière Page » =================
   6 chapitres (21 à 26), après le Livre III, débloqués avec le mode Normal (étapes 80, 84, 88, 92, 96 et 100).
   L'œuf trouvé sous la statue d'Aldric éclot : Lumen. Sa première chanson peut écrire dans le Livre de l'Histoire,
   et le Scribe sans Nom la veut pour réécrire le royaume avec lui pour héros. Il efface les souvenirs, à commencer par ceux de Plume.
   Le Scribe est vaincu pour de bon ; mais pour rendre à Plume ses souvenirs, Corvin donne sa propre page et disparaît de toutes les mémoires… sauf celle du Porteur.
   La progression est rangée à part (S.sg4), indépendante de la position des chapitres dans SAGA. */
(function(){try{
if(typeof SAGA==='undefined'||typeof sagaOpen!=='function')return;
const L40=SAGA.length;window.L40=L40;
Object.assign(SAGA_WHO,{lumen:{n:'Lumen',c:'#ffd86a'},scribe:{n:'Le Scribe sans Nom',c:'#b8a8ff'},elio:{n:'Un jeune scribe',c:'#e8d8b0'},elio2:{n:'Élio',c:'#e8d8b0'}});
try{Object.assign(NMAP,{"Oiseau d'Encre":{base:'Harpie des Cimes',o:{to:258,sat:.28,light:.48},ov:['spectral','runes']},"Corbeau d'Encre":{base:'Griffon Corrompu',o:{to:258,sat:.3,light:.42},ov:['runes','eye3','spectral']},
  'Page Errante':{base:'Feu Follet',o:{to:44,sat:.4,light:1.2},ov:['runes']},'Gardien des Archives':{base:'Golem Runique',o:{to:40,sat:.5,light:.85},ov:['runes','crown']},
  "Scribe d'Encre":{base:'Liche',o:{to:258,sat:.22,light:.5},ov:['runes','spectral']},'Effaceur':{base:'Chevalier Déchu',o:{to:258,sat:.25,light:.45},ov:['runes','mask','spectral']},
  "Larme d'Encre":{base:'Slime Vert',o:{to:262,sat:.3,light:.42},ov:['eye3']},"Léviathan d'Encre":{base:'Kraken Ancestral',o:{to:262,sat:.3,light:.4},ov:['runes','eye3']},
  'Plume Tranchante':{base:'Harpie des Cimes',o:{to:42,sat:.3,light:1.25},ov:['runes']},'Chevalier de Papier':{base:'Chevalier Déchu',o:{to:42,sat:.35,light:1.3},ov:['runes','armor']}})}catch(e){}

/* ---------- le Scribe sans Nom ---------- */
MONS['Le Scribe sans Nom']=()=>{const O='#0a0618',s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`,A=(v,d)=>`<animate attributeName="opacity" values="${v}" dur="${d}s" repeatCount="indefinite"/>`;
 const lt=['A','é','L','r','?','m','o','N'].map((c,i)=>`<text font-size="${6+i%3}" font-family="serif" font-style="italic" fill="#c8b8ff" opacity=".7"><animateMotion dur="${7+i}s" begin="${-i*1.1}s" repeatCount="indefinite" path="M50 44m-36 0a36 30 0 1 0 72 0a36 30 0 1 0 -72 0"/>${c}</text>`).join('');
 return`<circle cx="50" cy="44" r="40" fill="#8a6aff" opacity=".1"/>${lt}
 <path d="M16 100L24 60Q34 46 50 44Q66 46 76 60L84 100Z" fill="#141028" ${s}/><path d="M30 100L36 66Q50 58 64 66L70 100Z" fill="#2a2050" opacity=".7"/>
 ${[22,31,40,49,58,67,76].map((x,i)=>`<path d="M${x} 99Q${x+1.4} ${104+i%3*2} ${x+2.8} 99" fill="#141028"/><circle cx="${x+1.4}" cy="${(104+i%3*3).toFixed(0)}" r="1.2" fill="#141028">${A('1;0;1',2+i*.3)}</circle>`).join('')}
 <path d="M70 62Q84 54 92 40L96 42Q90 60 74 70Z" fill="#141028" ${s}/><circle cx="92" cy="40" r="3" fill="#e8dcc0" ${s}/>
 <path d="M93 41L66 8Q78 10 88 22Q96 32 96 40Z" fill="#f4ecd8" ${s}/><path d="M93 41L74 16M86 24L78 20M90 30L82 27M92 36L86 34" stroke="#b8a888" stroke-width=".7"/><path d="M93 41L98 50" stroke="#141028" stroke-width="2.2" stroke-linecap="round"/><circle cx="98.4" cy="51" r="1.6" fill="#6a4aff">${A('.4;1;.4',1.4)}</circle>
 <path d="M30 62Q16 62 8 72L12 76Q20 70 32 70Z" fill="#141028" ${s}/>
 <g transform="translate(14 76) rotate(-12)"><path d="M-12 0Q-6 -4 0 0Q6 -4 12 0V12Q6 8 0 12Q-6 8 -12 12Z" fill="#f4ecd8" ${s}/><path d="M0 0V12" stroke="${O}" stroke-width=".8"/><path d="M-9 3H-3M-9 6H-3M3 3H9M3 6H8M-9 9H-4" stroke="#6a5a8a" stroke-width=".6"/>
  <path d="M0 0Q4 -10 10 -14Q4 -8 0 0" fill="#f4ecd8" stroke="${O}" stroke-width=".6"><animateTransform attributeName="transform" type="rotate" values="0 0 0;-30 0 0;0 0 0" dur="2.4s" repeatCount="indefinite"/></path></g>
 <path d="M30 46Q30 14 50 10Q70 14 70 46Q64 56 50 58Q36 56 30 46Z" fill="#100c22" ${s}/>
 <ellipse cx="50" cy="34" rx="12.5" ry="15" fill="#efe6d0" ${s}/>
 <path d="M41 26H59M42 30L58 31M41.6 39H58M43 43H56" stroke="#3a2a5a" stroke-width=".9" opacity=".7"/><path d="M40 24L60 28M41 41L59 37" stroke="#3a2a5a" stroke-width="1.1" opacity=".75"/>
 <path d="M44 32.4Q45.6 29 47.2 32.4Q45.6 37 44 32.4ZM52.8 32.4Q54.4 29 56 32.4Q54.4 37 52.8 32.4Z" fill="#140a30"/><circle cx="45.6" cy="32.6" r="1.1" fill="#b89aff">${A('.5;1;.5',2)}</circle><circle cx="54.4" cy="32.6" r="1.1" fill="#b89aff">${A('.5;1;.5',2)}</circle>
 <path d="M45.6 36Q45 41 46 46M54.4 36Q55 40 54 44" stroke="#140a30" stroke-width="1.2" fill="none" stroke-linecap="round" opacity=".8"/>`};

/* ---------- Lumen (le bébé chouette) et le jeune scribe ---------- */
const eggCap=`<svg class="eggcap" viewBox="0 0 40 20" aria-hidden="true"><path d="M2 18Q2 4 20 2Q38 4 38 18L33 13L28 18L23 12L18 18L13 12L8 18Z" fill="#fff8ea" stroke="#3a2a14" stroke-width="1.2" stroke-linejoin="round"/><circle cx="12" cy="9" r="1.6" fill="#e8d8b8"/><circle cx="26" cy="7" r="1.2" fill="#e8d8b8"/></svg>`;
let ELC='';
function elioBody(){if(ELC)return ELC;const O='stroke="#2a1a10" stroke-width="1.3" stroke-linejoin="round"',sk='#f2cfaa';
 return ELC=`<svg class="loresvg hb" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Élio"><ellipse cx="80" cy="212" rx="30" ry="5" fill="#000" opacity=".35"/>
  <path d="M71 176V204M89 176V204" stroke="#4a3a2a" stroke-width="7.5" stroke-linecap="round"/><path d="M64 200Q64 210.6 70 210.6H77Q78 204 76 198.6Z" fill="#5a3a20" ${O}/><path d="M96 200Q96 210.6 90 210.6H83Q82 204 84 198.6Z" fill="#5a3a20" ${O}/>
  <path d="M63 72Q80 64 97 72L102 120Q106 160 108 184Q80 192 52 184Q54 160 58 120Z" fill="#8a6a3a" ${O}/><path d="M80 76V184" stroke="#6a4a24" stroke-width="1.2"/><path d="M58 120Q80 128 102 120L103 127Q80 135 57 127Z" fill="#4a2e18" ${O}/>
  <path d="M100 120L110 112L114 140L104 146Z" fill="#6a4426" ${O}/><path d="M104 118L108 115M105 124L110 121" stroke="#e8c060" stroke-width="1"/>
  <path d="M63 74Q52 92 58 108Q66 112 72 106L70 98Q64 98 65 90Z" fill="#8a6a3a" ${O}/><path d="M97 74Q110 88 106 104Q100 110 94 104L96 96Q100 94 98 88Z" fill="#8a6a3a" ${O}/>
  <circle cx="71" cy="104" r="4" fill="${sk}" ${O}/><circle cx="96" cy="102" r="4" fill="${sk}" ${O}/>
  <g transform="translate(70 104) rotate(-20)"><path d="M0 0L-6 -40Q4 -34 6 -22Q6 -10 0 0Z" fill="#fffaf0" ${O}/><path d="M0 0L-4 -32" stroke="#c8b8a0" stroke-width=".7"/></g>
  <path d="M84 98Q96 92 108 100L106 116Q96 110 86 114Z" fill="#f4ecd8" ${O}/><path d="M89 102L102 100M89 106L101 104" stroke="#8a7a5a" stroke-width=".7"/>
  <path d="M76 58H84V67H76Z" fill="#e0b48c"/><path d="M68 66Q80 72 92 66L94 72Q80 79 66 72Z" fill="#e8dcc0" ${O}/>
  <ellipse cx="80" cy="44" rx="14.6" ry="16" fill="${sk}" ${O}/>
  <path d="M65 46Q62 26 80 23Q99 26 95 46Q93 38 88 34Q86 39 80 35Q76 40 71 35Q68 40 65 46Z" fill="#6a4426" ${O}/><path d="M78 23Q80 16 86 18Q82 20 82 24Z" fill="#6a4426" ${O}/>
  <ellipse cx="74.4" cy="46.4" rx="2" ry="2.6" fill="#3a2a1a"/><ellipse cx="85.6" cy="46.4" rx="2" ry="2.6" fill="#3a2a1a"/><circle cx="75" cy="45.4" r=".7" fill="#fff"/><circle cx="86.2" cy="45.4" r=".7" fill="#fff"/>
  <path d="M71 41.6Q74 40.4 77 41.8M83 41.8Q86 40.4 89 41.6" stroke="#5a3a20" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M77.4 53.6Q80 55.4 82.6 53.6" stroke="#8a3a3a" stroke-width="1" fill="none" stroke-linecap="round"/>
  <circle cx="70.6" cy="50" r=".5" fill="#a8704a"/><circle cx="72" cy="51.4" r=".5" fill="#a8704a"/><circle cx="88" cy="50.4" r=".5" fill="#a8704a"/><path d="M96 26Q102 18 110 22Q103 23 100 30Z" fill="#2a1a10" opacity=".5"/></svg>`}
window.elioBody=elioBody;

/* ---------- les chapitres ---------- */
const L4=[
 {t:"L'Œuf qui chante",ic:'🥚',req:80,place:'Bibliothèque des Hiboux',bg:['#f4e2b8','#6a4a2a','#160e06'],mus:'dungeon',
  mins:["Oiseau d'Encre","Oiseau d'Encre"],boss:"Corbeau d'Encre",bh:258,bsk:"Nuée d'encre",
  intro:[['narr',"Depuis la fin du troisième livre, Plume n'a pas quitté la Bibliothèque des Hiboux. Elle a construit un nid dans les ruines, avec des pages et des plumes, et elle couve l'œuf jour et nuit."],
   ['plume',"Chut, Porteur ! Écoute… Il chante. L'œuf chante, la nuit. Tout doucement."],
   ['corvin2',"Hou… Il chante aussi faux que moi. C'est bon signe : c'est un vrai hibou."],
   ['plume',"Corvin ! Ne dis pas ça devant le bébé !"],
   ['narr',"Crac. Une fissure. Puis deux. Et un tout petit bec doré sort de la coquille."],
   ['lumen',"Hou ?"],
   ['plume',"Elle est née ! Porteur, c'est une fille ! Ses plumes brillent comme une bougie !"],
   ['corvin2',"Et on l'appelle comment, cette petite lumière ?"],
   ['plume',"Lumen. Parce qu'elle vient d'allumer toute la bibliothèque."],
   ['narr',"Mais au même moment, sur le grand pupitre, le Livre de l'Histoire s'ouvre tout seul. Une encre noire coule sur ses pages et efface des mots, un par un."],
   ['corvin2',"Mon nom… Regarde, Plume. Dans le premier livre. Mon nom est en train de disparaître."],
   ['narr',"Par les fenêtres brisées entrent des oiseaux faits d'encre. Ils plongent droit vers le nid."],
   {ch:[["💗 Protéger le nid de Lumen",'cmp',"Personne ne touche à Lumen ! Plume, reste avec elle !"],["⚔️ Chasser les oiseaux d'encre",'brv',"Dehors, les gribouillis !"]]}],
  outro:[['narr',"Le dernier oiseau d'encre éclate en une grosse tache sur le sol. Dans la tache, des mots apparaissent, écrits à l'envers."],
   ['plume',"« Rendez-moi la première chanson. » Qu'est-ce que ça veut dire ?"],
   ['corvin2',"Les vieux hiboux racontaient que la première chanson d'un Gardien-Hibou peut écrire dans le Livre de l'Histoire. Une seule fois. Et tout ce qu'elle écrit devient vrai."],
   ['plume',"Alors quelqu'un veut la chanson de Lumen… pour réécrire l'histoire."],
   ['lumen',"Hou… hou ?"],
   ['narr',"Dans le livre, une nouvelle phrase s'écrit toute seule, d'une écriture fine et penchée : « Il était une fois un scribe dont personne ne connaissait le nom. »"]]},
 {t:'Le Scribe sans Nom',ic:'✒️',req:84,place:'Les archives oubliées',bg:['#c8b8e8','#3a2a5a','#0a0618'],mus:'dungeon',
  mins:['Page Errante','Page Errante'],boss:'Gardien des Archives',bh:40,bsk:'Avalanche de livres',
  intro:[['narr',"Sous la bibliothèque, il y a des archives que même Plume n'a jamais visitées. Des kilomètres d'étagères, et des livres sans titre."],
   ['corvin2',"Ici, on rangeait les histoires que personne ne lisait. Les histoires oubliées."],
   ['plume',"Comme toi, autrefois. Comme la Seconde Étoile. Comme Éryndel. Le royaume oublie beaucoup de monde…"],
   ['narr',"Tout au fond, une silhouette écrit à la lumière d'une bougie noire. Sa plume grince sur le papier. Elle ne lève pas la tête."],
   ['scribe',"Je vous attendais. Enfin, non. Je vous ai écrits. Ce n'est pas pareil."],
   {fb:1,t:'Il y a mille ans…'},
   ['narr',"Dans la tour blanche, un jeune garçon range des parchemins. Les hiboux le croisent tous les jours. Pourtant, aucun ne se souvient de son prénom."],
   ['aldric',"Merci, euh… mon garçon. Pose ça là. Et note bien l'histoire d'Éryndel, elle est importante."],
   ['elio',"J'ai écrit toutes les histoires du royaume, Maître Aldric. Toutes. Mais personne n'a jamais écrit la mienne."],
   ['aldric',"Ton histoire ? Mais… quelle histoire, mon garçon ?"],
   {fb:0},
   ['scribe',"Mille ans à écrire les héros des autres. Ce soir, j'écris le mien. Avec la première chanson de votre petite chouette, j'écrirai un nouveau Livre de l'Histoire. Et dans ce livre-là, le héros, ce sera moi."],
   ['plume',"Et nous ? Et le Porteur ?"],
   ['scribe',"Vous ? Vous serez des notes en bas de page. Ou rien du tout."],
   ['narr',"Il souffle sur sa page. Les étagères grondent, et un géant fait de livres se dresse entre vous et lui."],
   {ch:[["💗 Rester devant Plume et Lumen",'cmp',"Plume, garde Lumen contre toi. Je m'occupe du géant."],["⚔️ Foncer vers le Scribe",'brv',"Pose cette plume, tout de suite !"]]}],
  outro:[['narr',"Le géant s'effondre en une pluie de pages. Mais le Scribe a disparu. Sur son bureau, il ne reste qu'une seule feuille."],
   ['plume',"C'est… une liste. Des noms. Corvin. Aléa. Astrée. Éryndel… et… et le tien, Porteur."],
   ['corvin2',"Il y a une petite case à côté de chaque nom. Comme une liste de courses."],
   ['narr',"Une seule case est déjà cochée. Celle de Corvin."]]},
 {t:"Ceux qu'on efface",ic:'🖋️',req:88,place:"Capitale d'Éther",bg:['#e8e0f0','#7a6a9a','#140e24'],mus:'umbra',
  mins:["Scribe d'Encre","Scribe d'Encre"],boss:'Effaceur',bh:258,bsk:'Grand coup de gomme',
  intro:[['narr',"Le lendemain, la Capitale a changé. Sur la grande place, la statue du Porteur n'a plus de visage. Juste une pierre lisse."],
   [57,"Les gens passent devant nous sans nous saluer. Comme s'ils ne nous avaient jamais vus de leur vie."],
   ['narr',"Dans les rues marchent des scribes d'encre, armés de grandes plumes. Partout où ils écrivent, quelque chose s'efface : une enseigne, une chanson, un souvenir."],
   ['plume',"Porteur, il faut… il faut… Pardon. Qu'est-ce qu'on faisait, déjà ?"],
   ['corvin2',"Plume ?"],
   ['plume',"Je sais que c'était important. Je le sais. Mais je ne sais plus pourquoi on est ici, toi et… et…"],
   ['narr',"Plume te regarde. Longtemps. Comme on regarde quelqu'un dont on a oublié le prénom."],
   ['plume',"Pardon. Tu t'appelles comment, déjà ?"],
   ['corvin2',"Il t'efface de sa mémoire, Porteur. Elle d'abord, parce que c'est elle qui te connaît le mieux. Puis tous les autres."],
   ['narr',"Au bout de la rue, un grand chevalier d'encre lève une gomme aussi grande qu'une porte."],
   {ch:[["💗 Prendre l'aile de Plume et lui rappeler vos aventures",'cmp',"Plume, c'est moi. On a sauvé le royaume ensemble. Trois fois. Tu te souviens ?"],["⚔️ Arrêter les scribes d'encre",'brv',"Ils ne toucheront plus à un seul souvenir !"]]}],
  outro:[['narr',"L'Effaceur éclate en taches noires. Les enseignes réapparaissent, les chansons reviennent. Mais pas tout."],
   ['plume',"Je… je me souviens de ta voix. Et de ton sourire. Mais pas de ton nom. C'est comme un trou dans ma tête, Porteur."],
   ['lumen',"Hou… Por… teur !"],
   ['plume',"Lumen… Elle a dit ton nom. Elle, elle s'en souvient !"],
   ['corvin2',"Les bébés hiboux ne peuvent pas être effacés : ils ne sont pas encore écrits dans le Livre. C'est pour ça qu'il veut sa chanson. C'est la seule plume qu'il ne contrôle pas."]]},
 {t:"L'Encrier du Monde",ic:'🌊',req:92,place:"L'Encrier du Monde",bg:['#4a3a7a','#140e2a','#020104'],mus:'corvin',
  mins:["Larme d'Encre","Larme d'Encre"],boss:"Léviathan d'Encre",bh:262,bsk:"Marée d'encre",
  intro:[['narr',"Tout ce que le Scribe efface finit quelque part. Corvin connaît l'endroit : l'Encrier du Monde, une mer noire sous les racines du royaume."],
   ['narr',"Sur l'encre flottent des choses effacées : une berceuse, une enseigne, le nom d'un village. Et des pages entières des trois premiers livres."],
   ['corvin2',"Là ! Le premier livre. Le jour où tu m'as tendu la main, Porteur. La page est presque blanche."],
   ['plume',"Tu… tu as été méchant, avant, Corvin ? Je ne m'en souviens plus."],
   ['corvin2',"Oui, petite sœur. Très méchant. Et tu m'as pardonné. C'est le plus beau jour de ma vie. Je ne laisserai personne l'effacer."],
   ['narr',"Une voix résonne sur la mer. Le Scribe marche sur l'encre comme sur un parquet ciré."],
   ['scribe',"Tu tiens tant que ça à ta page, Corvin ? Alors je te fais une offre. Je rends à Plume tous ses souvenirs du Porteur. Contre une seule page. La tienne. Entière."],
   ['corvin2',"…"],
   ['plume',"Ne l'écoute pas, Corvin !"],
   [62,"C'est un piège. Les ombres le sentent. Il ne rend jamais rien, il prend."],
   ['narr',"Le Scribe sourit et frappe la mer de sa plume. Un léviathan noir sort des profondeurs."],
   {ch:[["💗 Rester près de Corvin",'cmp',"Corvin, on trouvera une autre solution. Ensemble."],["⚔️ Plonger sur le léviathan",'brv',"Retourne dans ton encrier !"]]}],
  outro:[['narr',"Le léviathan se dissout dans la mer. Le Scribe, lui, s'est envolé avec un rire grinçant."],
   ['corvin2',"Il disait vrai, tu sais. On peut réécrire une page… si quelqu'un donne la sienne à la place."],
   ['plume',"Corvin, promets-moi que tu ne feras pas de bêtise."],
   ['corvin2',"Hou… Je n'ai jamais tenu une seule promesse de ma vie, petite sœur. Ce n'est pas maintenant que je vais commencer."],
   ['narr',"Il rit. Mais il ne promet pas."]]},
 {t:'La Première Chanson',ic:'🎶',req:96,place:'Bibliothèque des Hiboux',bg:['#fff0c8','#8a6a3a','#1a120a'],mus:'dungeon',
  mins:['Plume Tranchante','Plume Tranchante'],boss:'Chevalier de Papier',bh:42,bsk:'Tempête de pages',
  intro:[['narr',"Cette nuit-là, la bibliothèque tremble. Les livres s'envolent des étagères et tournent dans les airs comme une tempête de papier."],
   ['scribe',"La petite va chanter. Ce soir. Pour moi."],
   ['narr',"Une main d'encre traverse le toit et attrape le nid. Lumen disparaît entre les pages du grand livre du Scribe."],
   ['plume',"LUMEN !"],
   ['plume',"Je ne sais plus qui tu es, Porteur. Mais mon cœur, lui, s'en souvient. Et mon cœur dit que tu es mon ami. Alors aide-moi !"],
   ['corvin2',"Il faut l'empêcher de la faire chanter avant que sa page soit prête !"],
   [61,"Des chevaliers de papier. Leurs plumes coupent comme des épées. Restez derrière moi !"],
   {ch:[["💗 Combattre aux côtés de Plume, même si elle a oublié",'cmp',"Pas besoin de te souvenir de moi, Plume. Moi, je me souviens pour deux."],["⚔️ Foncer vers le livre du Scribe",'brv',"Rends-nous Lumen !"]]}],
  outro:[['narr',"Les chevaliers tombent en confettis. Le Scribe recule, son grand livre serré contre lui."],
   ['scribe',"Trop tard. Elle a chanté. Une seule note, toute petite. Mais une note suffit pour ouvrir la Dernière Page."],
   ['narr',"Le sol de la bibliothèque s'ouvre comme la couverture d'un livre. En dessous, il n'y a rien. Seulement du blanc. Une page immense, vide, qui attend qu'on l'écrive."],
   ['corvin2',"La Dernière Page. Tout ce qui y sera écrit deviendra vrai. Pour toujours."]]},
 {t:'La Dernière Page',ic:'📜',req:100,fin4:1,place:'La Dernière Page',bg:['#ffffff','#e8e0d0','#b8a888'],mus:'umbra',
  mins:["Scribe d'Encre","Scribe d'Encre"],boss:'Le Scribe sans Nom',bh:258,bsk:'Rature',
  intro:[['narr',"Sur la Dernière Page, tout est blanc. Le ciel, le sol, l'horizon. Au milieu, le Scribe écrit à toute vitesse, et chaque mot devient un morceau de monde."],
   ['scribe',"« Et le Scribe sauva le royaume. Et tout le monde se souvint de son nom. » Vous voyez ? C'est si simple."],
   ['plume',"Ton nom ? Mais tu n'en as pas, de nom. Tu ne l'as jamais écrit nulle part."],
   ['scribe',"…"],
   ['corvin2',"Il a écrit mille ans d'histoires, et il a oublié d'écrire la sienne. Il ne veut pas être un héros, Porteur. Il veut juste que quelqu'un se souvienne de lui. Je connais ça."],
   ['scribe',"TAISEZ-VOUS ! Tout le monde oublie ceux qui écrivent ! TOUT LE MONDE !"],
   ['narr',"Dans le livre du Scribe, Lumen se débat. Sa petite lumière clignote comme une bougie dans le vent."],
   {ch:[["💗 Lui demander son nom",'cmp',"Dis-nous ton nom. On l'écrira. Mais pas à la place de celui des autres."],["⚔️ Briser sa plume d'encre",'brv',"L'histoire appartient à tout le monde. Pas seulement à toi !"]]},
   ['scribe',"Assez ! Je vais vous rayer de l'histoire !"]],
  outroA:[['narr',"La plume du Scribe se brise. L'encre qui le forme coule sur la page blanche, et ses mains deviennent transparentes."],
   ['scribe',"Mon nom… Personne ne me l'a jamais demandé. En mille ans. Personne."],
   ['elio2',"Je m'appelais Élio. J'avais douze ans quand je suis entré dans la tour. J'aimais les histoires des autres. Je voulais juste… en faire partie."],
   ['plume',"Élio. Voilà. Maintenant, tu en fais partie."],
   ['narr',"Élio sourit. Puis l'encre se retire, et il s'en va pour de bon, comme une page qu'on tourne. Le grand livre tombe, et Lumen en sort en piaillant."]],
  outroB:[['narr',"La plume du Scribe éclate. Il hurle, et l'encre qui le forme se répand sur la page blanche."],
   ['scribe',"Non… non ! Je n'ai pas fini mon histoire ! Je n'ai même pas écrit mon nom !"],
   ['narr',"Il essaie d'écrire encore, avec ses doigts. Mais il n'y a plus d'encre. Le Scribe sans Nom se dissout, sans que personne ne sache jamais comment il s'appelait."],
   ['narr',"Le grand livre tombe, et Lumen en sort en piaillant."]],
  end:[['plume',"Lumen ! … Et toi… Je ne sais toujours pas qui tu es. Ça fait tellement mal, de ne pas savoir."],
   ['corvin2',"Moi, je sais comment réparer ça."],
   ['narr',"Corvin ramasse la plume brisée du Scribe. Sur la Dernière Page, il reste juste assez d'encre pour une phrase."],
   ['corvin2',"Une page contre une page. C'était le prix, tu te souviens ? La mienne, contre les souvenirs de Plume."],
   ['plume',"Corvin, non ! Si tu donnes ta page, plus personne ne se souviendra de toi !"],
   ['corvin2',"Toute ma vie, j'ai eu peur d'être oublié. C'est pour ça que j'étais devenu méchant, avant. Tu ne t'en souviens plus, mais c'est vrai."],
   ['corvin2',"Et puis tu m'as pardonné. J'ai eu une sœur, des amis, un Porteur. J'ai déjà eu tout ce que je voulais. Maintenant, c'est ton tour."],
   ['narr',"Il écrit : « Plume se souvient du Porteur. De tout. Pour toujours. »"],
   ['corvin2',"Porteur… toi, tu te souviendras. Les Porteurs ne s'effacent pas. Raconte-lui, de temps en temps. Que son frère chantait faux."],
   ['narr',"Et Corvin, le vieux hibou gris, disparaît de la page. Puis du monde. Puis de toutes les mémoires du royaume. Sauf une."],
   ['plume',"Porteur ! Porteur, c'est toi ! Je me souviens de tout ! Le Cœur d'Éther, Aléa, Éryndel… Tout est revenu !"],
   ['plume',"… Mais pourquoi tu pleures ?"],
   ['narr',"Plume ne sait pas. Personne ne sait. Dans la mémoire du royaume, il n'y a jamais eu de Corvin. Il n'y en a plus que dans la tienne."],
   ['narr',"Quelques semaines plus tard, dans la Bibliothèque des Hiboux…"],
   ['plume',"Porteur, écoute ! Lumen a appris à chanter ! … Bon. Elle chante complètement faux."],
   ['lumen',"Hou hou houuu !"],
   ['plume',"C'est bizarre. Ça me rend triste et heureuse en même temps. Comme si quelqu'un, avant, chantait faux exactement comme ça."],
   ['narr',"Dans le nid, sous Lumen, il y a une plume grise. Plume ne sait pas à qui elle appartient. Mais elle refuse de la jeter."],
   ['narr',"Fin du quatrième livre. Merci, Porteur."]]}];
const N4=L4.length,BK4SYM=L4.map(c=>c.ic);
const dc=L=>(L||[]).map(x=>Array.isArray(x)?x.slice():Object.assign({},x,x.ch?{ch:x.ch.map(c=>c.slice())}:{}));
L4.forEach(c=>SAGA.push({t:c.t,ic:c.ic,req:c.req,ashc:1,l4:1,mus:c.mus,fin4:c.fin4||0,bg:c.bg,place:c.place,boss:{n:c.boss,h:c.bh,st:100},intro:dc(c.intro),outro:dc(c.outro||c.end)}));
const S4=()=>{if(!S.sg4||typeof S.sg4!=='object')S.sg4={};if(!S.sg4.d||typeof S.sg4.d!=='object')S.sg4.d={};if(!S.sg4.ch||typeof S.sg4.ch!=='object')S.sg4.ch={};return S.sg4};
const in4=c=>c>=L40&&c<L40+N4;
const b3done=()=>{try{return!!SG().done[19]}catch(e){return false}};
const done4=k=>!!S4().d[k];
const un4=k=>done4(k)||(b3done()&&(S.nmax||0)>=L4[k].req&&(k===0||done4(k-1)));
const next4=()=>{for(let k=0;k<N4;k++)if(!done4(k))return k;return-1};
const cnt4=()=>L4.filter((_,k)=>done4(k)).length;
window.l4State=()=>({done:cnt4(),next:next4(),b3:b3done(),nmax:S.nmax||0});
{const su=sagaUnlocked;sagaUnlocked=function(i){if(in4(i))return un4(i-L40);return su.apply(this,arguments)}}
{const sp=sagaPick;sagaPick=function(k){try{const c=SAGA[SGP.ch];if(c&&c.l4){const L=SGP.lines[SGP.i];if(L&&L.ch&&L.ch[k])S4().ch[SGP.ch-L40]=L.ch[k][1]}}catch(e){}return sp.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){if(!in4(c))return so.apply(this,arguments);const k=c-L40,C=L4[k],cfg=SAGA[c];cfg.intro=dc(C.intro);
  cfg.outro=C.fin4?dc((S4().ch[k]==='brv'?C.outroB:C.outroA).concat(C.end)):dc(C.outro);const r=so.apply(this,arguments);
  try{const o=document.getElementById('sgov');if(o){o.classList.remove('bk3','fbmode');o.classList.add('bk4');const chip=o.querySelector('.sgchip');if(chip){chip.setAttribute('data-noi18n','');chip.textContent=`${C.ic} ${LANG==='en'?'Book IV':'Livre IV'} · ${k+1}/${N4} · ${typeof trS==='function'?trS(C.t):C.t}`}}musicWant(C.mus)}catch(e){}return r}}
/* après un souvenir, la musique du chapitre revient (et pas celle du Roi de Cendre) */
{const ss=sagaShow;sagaShow=function(){const c=SAGA[SGP.ch],L=SGP.lines&&SGP.lines[SGP.i],back=c&&c.mus&&L&&!Array.isArray(L)&&L.fb!==undefined&&!L.fb;const r=ss.apply(this,arguments);if(back)try{musicWant(c.mus)}catch(e){}return r}}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(in4(c))return sgBg4(c-L40);return sb.apply(this,arguments)}}
{const sf=sagaFig;sagaFig=function(w){try{
  if(w==='lumen')return`<div class="sgfig plumef lumenf">${plumeSVG('happy')}${eggCap}</div>`;
  if(w==='scribe')return`<div class="sgfig vil">${'<svg viewBox="0 0 100 100">'+MONS['Le Scribe sans Nom']()+'</svg>'}</div>`;
  if(w==='elio'||w==='elio2')return`<div class="sgfig lore ${w==='elio2'?'eliog':''}">${elioBody()}</div>`}catch(e){}return sf.apply(this,arguments)}}
/* combats : calés sur le mode Normal, comme le Livre III */
const port=(nm,h,b)=>NMAP[nm]&&typeof nmonArt==='function'?nmonArt(nm,h,b):monArt(nm,h,b);
function l4Foes(k){const C=L4[k],ns=Math.min(100,C.req+6),m=nRec(ns)/recPow(100),g=Math.pow(GROW,99)*2.1,fin=!!C.fin4;
  const mins=C.mins.map((nm,i)=>foeUnit(i,{name:nm,max:Math.round(380*g*m*1.08*(.95+i*.1)),atk:Math.round(41*g*Math.pow(m,.85)),def:Math.round(18*g*Math.pow(m,.8)),spd:94+i*8,port:port(nm,C.bh,false),sk:i?{n:"Trait d'encre",tg:'one',fx:{dmg:170}}:{n:"Éclaboussure",tg:'all',fx:{dmg:80}}}));
  const f=4.8+k*.16,b=foeUnit(9,{name:C.boss,boss:1,max:Math.round(380*g*f*m*(fin?1.25:1)),atk:Math.round(42*g*1.5*Math.pow(m,.9)),def:Math.round(18*g*1.38*Math.pow(m,.8)),spd:107+k*2,port:port(C.boss,C.bh,true),sk:{n:C.bsk,tg:'all',fx:Object.assign({dmg:124+k*5,weak:1},fin?{stun:20}:{})}});
  return[...mins,b]}
window.l4Foes=l4Foes;
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(in4(c)&&r){const k=c-L40;r.foes=l4Foes(k);r.title=`${L4[k].ic} ${L4[k].t}`;r.sub=`Mode histoire · Livre IV · chapitre ${21+k}${L4[k].fin4?' · Combat final':''}`;r.maxR=L4[k].fin4?32:30;r.wc=L4[k].bh}}catch(e){console.warn('livre IV',e)}return r}}
/* récompenses */
const SAGA_RW4=[[320,2,2,0],[340,3,0,2],[360,3,2,0],[380,3,0,3],[400,4,3,0],[900,6,6,6]];
try{TITLES.push({k:'page4',n:'Celui qui se souvient',c:'#c8b8ff',d:'Terminer le Livre IV du mode histoire',ok:()=>!!(S.sg4&&S.sg4.d&&S.sg4.d[5])})}catch(e){}
{const sr=sagaReward;sagaReward=function(c){if(!in4(c))return sr.apply(this,arguments);const k=c-L40,G=S4();if(G.d[k]){render();return}G.d[k]=Date.now();const [gm,sh,tk,us]=SAGA_RW4[k];S.gems+=gm;S.shards+=sh;if(tk)INV().pt+=tk;if(us)S.ush=(S.ush||0)+us;
  const fin=!!L4[k].fin4;if(fin)try{news(Date.now(),`${S.name||'Voyageur'} a terminé le Livre IV du mode histoire.`)}catch(e){}save();
  modal(`<div class="sgrw bk4"><div class="sgfrag">${fin?'🪶':BK4SYM[k]}</div><div class="h">${fin?'La Dernière Page est écrite':'Chapitre '+(21+k)+' terminé'}</div><p class="sub">${fin?(G.ch[k]==='brv'?'Fin de la Plume brisée : le Scribe disparaît sans nom.':"Fin du Nom retrouvé : Élio a enfin sa page."):'« '+esc(L4[k].t)+' »'}</p>
   <div class="sgfrags bk4">${BK4SYM.map((x,i)=>`<i class="${done4(i)?'on':''}">${x}</i>`).join('')}</div><div class="xrw"><div>${GEM}${gm} gemmes</div><div>${SHARD}${sh} éclats légendaires</div>${tk?`<div>${SIC.ticket}${tk} tickets d'invocation</div>`:''}${us?`<div>🌟 ${us} éclats d'ultra-évolution</div>`:''}${fin?'<div>🏷️ Titre « Celui qui se souvient »</div>':''}</div>
   ${fin?`<p class="muted" style="font-size:12.5px;margin:8px 4px 0">Toi, tu te souviens de lui.</p>`:''}<button class="btn p" data-a="close" style="width:100%;margin-top:10px">${fin?'Hou… 🪶':"Continuer l'aventure"}</button></div>`);try{ttCheck()}catch(e){}render()}}
/* le Livre de l'Histoire : un quatrième tome */
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="l4play"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=+b.dataset.v;if(!un4(k))return;try{closeModal()}catch(er){}sagaOpen(L40+k,'intro')},true);
{const sc=sagaCard;sagaCard=function(){if(!b3done())return sc.apply(this,arguments);if(UI.sgBook===undefined||UI.sgBook===null)UI.sgBook=4;
  if(UI.sgBook!==4){const h=sc.apply(this,arguments);return h.replace(/(<div class="chips sgbk">[\s\S]*?)(<\/div>)/,`$1<button class="chip" data-a="sgbook" data-v="4">📜 Livre IV</button>$2`)}
  const n=next4(),done=cnt4();
  const items=L4.map((c,k)=>{const ok=done4(k),un=un4(k);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="l4play" data-v="${k}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${21+k}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Étape ${c.req} du mode Normal`}</small></button>`}).join('');
  let main;if(n>=0&&un4(n))main=`<button class="btn p sgbig bk4b" data-a="l4play" data-v="${n}">▶️ ${L4[n].ic} Chapitre ${21+n} : ${esc(L4[n].t)}</button>`;
  else if(n>=0)main=`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Prochain chapitre à l'étape ${L4[n].req} du mode <b>Normal</b> (tu en es à ${S.nmax||0}).</p>`;
  else main=`<p style="margin:8px 0 0;font-size:13px">🪶 Plume se souvient de tout. Et toi, tu te souviens de lui.</p>`;
  const mine=`<div class="card sgcard bk4"><div class="chips sgbk"><button class="chip" data-a="sgbook" data-v="1">📕 Livre I</button><button class="chip" data-a="sgbook" data-v="2">🃏 Livre II</button><button class="chip" data-a="sgbook" data-v="3">🦉 Livre III</button><button class="chip on" data-a="sgbook" data-v="4">📜 Livre IV</button></div>
   <div class="sghd"><div class="sgpl bk4pl">${plumeSVG('happy')}</div><div style="min-width:0;flex:1"><div class="h3" style="margin:0">📜 Livre IV · La Dernière Page</div><div class="muted" style="font-size:12.5px">Lumen est née… et quelqu'un réécrit l'histoire · ${done}/${N4} chapitres</div>
   <div class="sgfrags sm bk4">${BK4SYM.map((x,i)=>`<i class="${done4(i)?'on':''}">${x}</i>`).join('')}</div></div></div>${main}
   <details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${items}</div></details></div>`;
  /* on garde ce que les autres modules ajoutent autour (chroniques, bannières) et on remplace seulement la carte du Livre III */
  let h='';try{UI.sgBook=3;h=sc.apply(this,arguments)}finally{UI.sgBook=4}
  const i=h.indexOf('<div class="card sgcard bk3">'),E='</div></details></div>',j=i<0?-1:h.indexOf(E,i);
  return j<0?mine+h:h.slice(0,i)+mine+h.slice(j+E.length)}}
/* annonce + notes de version */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(Date.now()<Date.UTC(2026,11,10)&&!L.some(a=>a.k==='livre4'))L.unshift({k:'livre4',ac:'#c8b8ff',tag:'MODE HISTOIRE',t:'Livre IV : La Dernière Page 📜',
  x:"L'œuf trouvé sous la statue d'Aldric est sur le point d'éclore… et quelqu'un réécrit le Livre de l'Histoire, page après page. <b>6 nouveaux chapitres</b> (21 à 26), après le Livre III, avec le mode Normal. Prépare les mouchoirs.",
  art:()=>`<div class="skann l4ann"><svg viewBox="0 0 100 100">${MONS['Le Scribe sans Nom']()}</svg></div>`,go:'📜 Lire le Livre IV',fn:()=>{TAB='adv';UI.sgBook=4;try{scrollTo(0,0)}catch(e){}}})}catch(e){}return L}}catch(e){}
try{const it=["📜 <b>Nouveau : le Livre IV du mode histoire</b>, « La Dernière Page » : 6 chapitres (21 à 26), après le Livre III, débloqués avec le <b>mode Normal</b> (étapes 80, 84, 88, 92, 96 et 100).","🥚 L'œuf d'Aldric éclot enfin. Mais un mystérieux scribe efface le royaume, mot après mot… à commencer par les souvenirs de Plume.","🎞️ Des souvenirs en vieux film, 6 nouveaux boss, deux fins selon tes choix, et le titre « Celui qui se souvient »."];
 PATCH.unshift({v:47,d:'10 novembre 2026',t:'Livre IV : La Dernière Page',items:it});
 const E=["📜 <b>New: Book IV of story mode</b>, “The Last Page”: 6 chapters (21 to 26), after Book III, unlocked with <b>Normal mode</b> (stages 80, 84, 88, 92, 96 and 100).","🥚 Aldric's egg finally hatches. But a mysterious scribe is erasing the kingdom, word by word… starting with Plume's memories.","🎞️ Memories shown as old film, 6 new bosses, two endings depending on your choices, and the title “The One Who Remembers”."];
 it.forEach((x,i)=>{I18N_EN[x]=E[i]});I18N_EN['Livre IV : La Dernière Page']='Book IV: The Last Page'}catch(e){}

/* ---------- décors ---------- */
function sgBg4(k){const C=L4[k],[a,b,d]=C.bg,R=rng(k*577+41),f=n=>(+n).toFixed(0),id='l4b'+k,A=(at,v,du)=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite"/>`;
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="${id}g"><stop offset="0" stop-color="#fff6c0" stop-opacity=".85"/><stop offset="1" stop-color="#ffd86a" stop-opacity="0"/></radialGradient><radialGradient id="${id}i"><stop offset="0" stop-color="#2a1a5a" stop-opacity=".9"/><stop offset="1" stop-color="#2a1a5a" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#${id})"/>`;
  const pages=(n,c)=>{let o='';for(let i=0;i<n;i++)o+=`<g opacity=".8"><path d="M0 0h14v18h-14Z" fill="${c||'#f4e8c8'}" stroke="#8a6a3a" stroke-width=".8"/><path d="M3 5h8M3 9h8M3 13h6" stroke="#8a6a3a" stroke-width=".6"/><animateMotion dur="${(8+R()*7).toFixed(1)}s" begin="${(-R()*9).toFixed(1)}s" repeatCount="indefinite" rotate="auto" path="M${f(R()*400)} 720Q${f(R()*400)} 360 ${f(R()*400)} -40"/></g>`;return o};
  const drips=(n,y0)=>{let o='';for(let i=0;i<n;i++){const x=f(R()*400),h=f(30+R()*90);o+=`<path d="M${x-3} ${y0}V${+y0+ +h}Q${x} ${+y0+ +h+8} ${+x+3} ${+y0+ +h}V${y0}Z" fill="#140e28"/><circle cx="${x}" r="2.6" fill="#140e28"><animate attributeName="cy" values="${+y0+ +h+4};${+y0+ +h+90}" dur="${(2+R()*2).toFixed(1)}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="${(2+R()*2).toFixed(1)}s" repeatCount="indefinite"/></circle>`}return o};
  const birds=n=>{let o='';for(let i=0;i<n;i++)o+=`<path d="M-10 0Q-5 -6 0 0Q5 -6 10 0Q5 -2 0 3Q-5 -2 -10 0Z" fill="#140e28"><animateMotion dur="${(6+R()*5).toFixed(1)}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M-20 ${f(80+R()*300)}Q200 ${f(R()*400)} 420 ${f(80+R()*300)}"/></path>`;return o};
  const shelves=(op,c)=>{let o='';for(let i=0;i<5;i++){const x=i*90-10;o+=`<path d="M${x} 700V${f(120+R()*80)}Q${x+40} ${f(60+R()*40)} ${x+80} ${f(120+R()*80)}V700Z" fill="${c}" opacity="${op}"/>`;for(let r=0;r<9;r++){o+=`<rect x="${x+8}" y="${200+r*52}" width="64" height="4" fill="#5a4220" opacity="${op}"/>`;for(let q=0;q<7;q++)o+=`<rect x="${x+10+q*9}" y="${f(172+r*52+R()*6)}" width="7" height="${f(22+R()*6)}" fill="${['#8a3a2a','#3a5a3a','#6a4a1a','#4a3a6a','#8a6a2a'][Math.floor(R()*5)]}" opacity="${op}"/>`}}return o};
  if(k===0){/* la bibliothèque, le nid et l'œuf qui brille */
    s+=shelves(.9,'#3a2a14');s+=`<path d="M0 640Q100 560 200 620T400 600V700H0Z" fill="#2a1a0a"/>`;
    s+=`<circle cx="200" cy="520" r="90" fill="url(#${id}g)">${A('r','80;100;80',2.4)}</circle><ellipse cx="200" cy="560" rx="70" ry="22" fill="#6a4a24"/><path d="M134 556Q200 590 266 556" stroke="#8a6a3a" stroke-width="6" fill="none"/>${[...Array(7)].map((_,i)=>`<path d="M${140+i*20} 548l8 -14l6 12Z" fill="#f4e8c8"/>`).join('')}<ellipse cx="200" cy="534" rx="20" ry="26" fill="#fff6dc" stroke="#e8c88a" stroke-width="2"/><path d="M190 524L198 534L192 542" stroke="#c8a860" stroke-width="1.6" fill="none"/>`;
    s+=`<path d="M300 400L360 380L366 470L306 480Z" fill="#e8dcc0" stroke="#5a4220" stroke-width="3"/><path d="M333 390V476" stroke="#5a4220" stroke-width="2"/>`+drips(4,'470').replace(/fill="#140e28"/g,'fill="#1a1030"')+birds(5)}
  else if(k===1){/* les archives oubliées, la bougie noire */
    s+=shelves(.75,'#1e1638');s+=`<rect width="400" height="700" fill="url(#${id}i)" opacity=".6"/>`;
    s+=`<g transform="translate(200 470)"><rect x="-70" y="0" width="140" height="10" fill="#2a1a3a"/><path d="M-60 10V90M60 10V90" stroke="#2a1a3a" stroke-width="8"/><rect x="-36" y="-10" width="50" height="10" fill="#e8dcc0"/><rect x="34" y="-34" width="8" height="34" fill="#140e28"/><path d="M38 -34q-6 -10 0 -20q6 10 0 20Z" fill="#8a6aff">${A('opacity','.6;1;.6',1)}</path><circle cx="38" cy="-44" r="30" fill="#8a6aff" opacity=".12"/></g>`;
    s+=pages(8,'#d8d0e8')}
  else if(k===2){/* la Capitale effacée */
    s+=`<path d="M0 560L30 500V420L50 400L70 420V480L110 440L130 460V330L160 300L190 260L200 240L210 260L240 300L270 330V460L290 440L330 480V420L350 400L370 420V500L400 560V700H0Z" fill="#3a2e54"/>`;
    for(let i=0;i<6;i++)s+=`<path d="M${f(R()*400)} ${f(300+R()*260)}l${f(60+R()*80)} ${f(R()*20-10)}" stroke="#f4f0ff" stroke-width="${f(10+R()*14)}" stroke-linecap="round" opacity=".55">${A('opacity','.35;.7;.35',(3+R()*3).toFixed(1))}</path>`;
    s+=`<g transform="translate(200 560)"><rect x="-30" y="0" width="60" height="70" fill="#5a4e70"/><path d="M-18 0V-70Q-18 -96 0 -100Q18 -96 18 -70V0Z" fill="#8a80a0"/><ellipse cx="0" cy="-112" rx="16" ry="18" fill="#a8a0c0"/></g>`;
    for(let i=0;i<8;i++)s+=`<path d="M${f(20+R()*360)} ${f(40+R()*200)}q${f(R()*40-20)} -20 ${f(R()*60-30)} 10t${f(R()*40-20)} 14" stroke="#140e28" stroke-width="2.2" fill="none" opacity=".55"/>`;s+=birds(3)}
  else if(k===3){/* l'Encrier du Monde */
    for(let i=0;i<7;i++)s+=`<path d="M${f(R()*400)} -10Q${f(R()*400)} ${f(100+R()*100)} ${f(R()*400)} ${f(160+R()*120)}" stroke="#3a2a1a" stroke-width="${f(6+R()*10)}" fill="none" opacity=".7"/>`;
    s+=`<path d="M0 360Q100 340 200 360T400 356V700H0Z" fill="#0a0618"/><path d="M0 380Q120 364 240 384T400 376" stroke="#6a5aaa" stroke-width="2" fill="none" opacity=".6">${A('opacity','.3;.8;.3',3)}</path>`;
    for(let i=0;i<9;i++)s+=`<g transform="translate(${f(30+R()*340)} ${f(400+R()*260)}) rotate(${f(R()*40-20)})"><path d="M0 0h22v28h-22Z" fill="#e8dcc0" opacity=".75"/><path d="M4 6h14M4 11h14M4 16h10" stroke="#6a5a4a" stroke-width=".8" opacity=".7"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="${(3+R()*2).toFixed(1)}s" repeatCount="indefinite" additive="sum"/></g>`;
    s+=`<circle cx="200" cy="200" r="120" fill="#8a6aff" opacity=".08"/>`}
  else if(k===4){/* la tempête de pages */
    s+=shelves(.6,'#3a2a14');
    s+=`<g transform="translate(200 330)">${[0,1,2].map(i=>`<ellipse rx="${170-i*40}" ry="${70-i*14}" fill="none" stroke="#f4e8c8" stroke-width="${8-i*2}" stroke-dasharray="20 16" opacity=".5"><animateTransform attributeName="transform" type="rotate" from="${i%2?360:0}" to="${i%2?0:360}" dur="${6+i*3}s" repeatCount="indefinite"/></ellipse>`).join('')}</g>`;
    s+=`<path d="M170 0Q160 120 190 210Q200 236 220 230Q232 200 224 120Q220 60 240 0Z" fill="#140e28" opacity=".9"/>`+pages(18)}
  else{/* la Dernière Page */
    for(let i=0;i<14;i++)s+=`<path d="M0 ${80+i*44}H400" stroke="#9ab0d8" stroke-width="1" opacity=".35"/>`;s+=`<path d="M60 0V700" stroke="#e8a0a0" stroke-width="1.4" opacity=".45"/>`;
    s+=`<g transform="translate(200 300)"><path d="M90 -140L-30 120Q-10 60 30 0Q70 -80 90 -140Z" fill="#fffaf0" stroke="#3a2a5a" stroke-width="3"/><path d="M90 -140L-20 100" stroke="#b8a888" stroke-width="1.4"/><path d="M-30 120L-40 150" stroke="#140e28" stroke-width="5" stroke-linecap="round"/></g>`;
    for(let i=0;i<7;i++)s+=`<circle cx="${f(R()*400)}" cy="${f(R()*700)}" r="${f(6+R()*16)}" fill="#140e28" opacity=".85"><animate attributeName="r" values="${f(4+R()*6)};${f(10+R()*14)};${f(4+R()*6)}" dur="${(4+R()*3).toFixed(1)}s" repeatCount="indefinite"/></circle>`;
    s+=`<text x="40" y="620" font-family="serif" font-style="italic" font-size="18" fill="#3a2a5a" opacity=".6">Il était une fois…</text>`}
  return s+'</svg>'}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.sgfig.lumenf{height:30%;position:relative;filter:hue-rotate(150deg) saturate(1.35) brightness(1.12) drop-shadow(0 0 14px rgba(255,216,106,.7))}
.sgfig.lumenf .eggcap{position:absolute;left:50%;top:-4%;width:46%;height:auto;transform:translateX(-50%) rotate(-8deg);filter:none}
.sgfig.eliog{opacity:.82;filter:drop-shadow(0 0 14px rgba(184,168,255,.7))}
#sgov.bk4 .sgchip{background:rgba(42,26,90,.85);color:#efe6ff}
#sgov.bk4:not(.fbmode) .sgbox{border-color:rgba(200,184,255,.6)!important;box-shadow:0 0 0 2px rgba(200,184,255,.22),0 10px 30px rgba(0,0,0,.5)}
.sgcard.bk4{background:radial-gradient(120% 140% at 85% 0%,rgba(200,184,255,.22),transparent 60%),var(--panel)!important;border-color:rgba(200,184,255,.5)!important}
.bk4b{background:linear-gradient(180deg,#c8b8ff,#5a3ab0)!important;color:#fff!important}
.sgfrags.bk4 i.on{background:#3a2a6a;border-color:#efe6ff}
.sgrw.bk4 .sgfrag{filter:drop-shadow(0 0 14px rgba(200,184,255,.8))}
.l4ann svg{height:100%;width:auto}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{Object.assign(I18N_EN,{'Le Scribe sans Nom':'The Nameless Scribe','Un jeune scribe':'A young scribe','Livre IV : La Dernière Page 📜':'Book IV: The Last Page 📜','MODE HISTOIRE':'STORY MODE','📜 Lire le Livre IV':'📜 Read Book IV',
 "L'Œuf qui chante":'The Singing Egg',"Ceux qu'on efface":'The Erased',"L'Encrier du Monde":'The Inkwell of the World','La Première Chanson':'The First Song','La Dernière Page':'The Last Page',
 'Bibliothèque des Hiboux':'Owl Library','Les archives oubliées':'The Forgotten Archives',
 "Oiseau d'Encre":'Ink Bird',"Corbeau d'Encre":'Ink Crow','Page Errante':'Wandering Page','Gardien des Archives':'Archive Warden',"Scribe d'Encre":'Ink Scribe','Effaceur':'Eraser',"Larme d'Encre":'Ink Tear',"Léviathan d'Encre":'Ink Leviathan','Plume Tranchante':'Razor Quill','Chevalier de Papier':'Paper Knight',
 "Nuée d'encre":'Ink Swarm','Avalanche de livres':'Book Avalanche','Grand coup de gomme':'Great Eraser Swing',"Marée d'encre":'Ink Tide','Tempête de pages':'Page Storm','Rature':'Strike-Through',"Trait d'encre":'Ink Stroke','Éclaboussure':'Splatter',
 'Celui qui se souvient':'The One Who Remembers','Terminer le Livre IV du mode histoire':'Finish Book IV of story mode','La Dernière Page est écrite':'The Last Page is written',
 'Fin de la Plume brisée : le Scribe disparaît sans nom.':'Broken Quill ending: the Scribe vanishes without a name.',"Fin du Nom retrouvé : Élio a enfin sa page.":'Found Name ending: Élio finally has his page.','Toi, tu te souviens de lui.':'You remember him.','Hou… 🪶':'Hoo… 🪶',
 '📜 Livre IV · La Dernière Page':'📜 Book IV · The Last Page','🪶 Plume se souvient de tout. Et toi, tu te souviens de lui.':'🪶 Plume remembers everything. And you remember him.',
 "L'œuf trouvé sous la statue d'Aldric est sur le point d'éclore… et quelqu'un réécrit le Livre de l'Histoire, page après page. <b>6 nouveaux chapitres</b> (21 à 26), après le Livre III, avec le mode Normal. Prépare les mouchoirs.":"The egg found under Aldric's statue is about to hatch… and someone is rewriting the Book of History, page after page. <b>6 new chapters</b> (21 to 26), after Book III, with Normal mode. Get the tissues ready.",
 'Il y a mille ans…':'A thousand years ago…',
 "Depuis la fin du troisième livre, Plume n'a pas quitté la Bibliothèque des Hiboux. Elle a construit un nid dans les ruines, avec des pages et des plumes, et elle couve l'œuf jour et nuit.":"Since the end of the third book, Plume hasn't left the Owl Library. She built a nest in the ruins out of pages and feathers, and she keeps the egg warm day and night.",
 "Chut, Porteur ! Écoute… Il chante. L'œuf chante, la nuit. Tout doucement.":"Shh, Bearer! Listen… It's singing. The egg sings at night. Very softly.",
 "Hou… Il chante aussi faux que moi. C'est bon signe : c'est un vrai hibou.":"Hoo… It sings as off-key as I do. Good sign: it's a real owl.",
 "Corvin ! Ne dis pas ça devant le bébé !":"Corvin! Don't say that in front of the baby!",
 "Crac. Une fissure. Puis deux. Et un tout petit bec doré sort de la coquille.":"Crack. One crack. Then two. And a tiny golden beak pokes out of the shell.",
 "Hou ?":"Hoo?",
 "Elle est née ! Porteur, c'est une fille ! Ses plumes brillent comme une bougie !":"She's born! Bearer, it's a girl! Her feathers glow like a candle!",
 "Et on l'appelle comment, cette petite lumière ?":"And what do we call this little light?",
 "Lumen. Parce qu'elle vient d'allumer toute la bibliothèque.":"Lumen. Because she just lit up the whole library.",
 "Mais au même moment, sur le grand pupitre, le Livre de l'Histoire s'ouvre tout seul. Une encre noire coule sur ses pages et efface des mots, un par un.":"But at that very moment, on the great lectern, the Book of History opens by itself. Black ink runs down its pages and erases words, one by one.",
 "Mon nom… Regarde, Plume. Dans le premier livre. Mon nom est en train de disparaître.":"My name… Look, Plume. In the first book. My name is disappearing.",
 "Par les fenêtres brisées entrent des oiseaux faits d'encre. Ils plongent droit vers le nid.":"Birds made of ink fly in through the broken windows. They dive straight for the nest.",
 "💗 Protéger le nid de Lumen":"💗 Protect Lumen's nest","Personne ne touche à Lumen ! Plume, reste avec elle !":"Nobody touches Lumen! Plume, stay with her!",
 "⚔️ Chasser les oiseaux d'encre":'⚔️ Chase off the ink birds',"Dehors, les gribouillis !":"Out, you scribbles!",
 "Le dernier oiseau d'encre éclate en une grosse tache sur le sol. Dans la tache, des mots apparaissent, écrits à l'envers.":"The last ink bird bursts into a big blot on the floor. In the blot, words appear, written backwards.",
 "« Rendez-moi la première chanson. » Qu'est-ce que ça veut dire ?":"“Give me the first song.” What does that mean?",
 "Les vieux hiboux racontaient que la première chanson d'un Gardien-Hibou peut écrire dans le Livre de l'Histoire. Une seule fois. Et tout ce qu'elle écrit devient vrai.":"The old owls used to say that an Owl Guardian's first song can write in the Book of History. Just once. And whatever it writes comes true.",
 "Alors quelqu'un veut la chanson de Lumen… pour réécrire l'histoire.":"So someone wants Lumen's song… to rewrite history.",
 "Hou… hou ?":"Hoo… hoo?",
 "Dans le livre, une nouvelle phrase s'écrit toute seule, d'une écriture fine et penchée : « Il était une fois un scribe dont personne ne connaissait le nom. »":"In the book, a new sentence writes itself, in thin slanted handwriting: “Once upon a time there was a scribe whose name nobody knew.”",
 "Sous la bibliothèque, il y a des archives que même Plume n'a jamais visitées. Des kilomètres d'étagères, et des livres sans titre.":"Beneath the library are archives even Plume has never visited. Miles of shelves, and books with no titles.",
 "Ici, on rangeait les histoires que personne ne lisait. Les histoires oubliées.":"This is where they kept the stories nobody read. The forgotten stories.",
 "Comme toi, autrefois. Comme la Seconde Étoile. Comme Éryndel. Le royaume oublie beaucoup de monde…":"Like you, once. Like the Second Star. Like Éryndel. The kingdom forgets a lot of people…",
 "Tout au fond, une silhouette écrit à la lumière d'une bougie noire. Sa plume grince sur le papier. Elle ne lève pas la tête.":"At the very back, a figure writes by the light of a black candle. Its quill scratches the paper. It doesn't look up.",
 "Je vous attendais. Enfin, non. Je vous ai écrits. Ce n'est pas pareil.":"I was expecting you. Well, no. I wrote you. It's not the same thing.",
 "Dans la tour blanche, un jeune garçon range des parchemins. Les hiboux le croisent tous les jours. Pourtant, aucun ne se souvient de son prénom.":"In the white tower, a young boy tidies scrolls. The owls pass him every day. Yet none of them remembers his name.",
 "Merci, euh… mon garçon. Pose ça là. Et note bien l'histoire d'Éryndel, elle est importante.":"Thank you, er… my boy. Put that there. And write down Éryndel's story carefully, it's important.",
 "J'ai écrit toutes les histoires du royaume, Maître Aldric. Toutes. Mais personne n'a jamais écrit la mienne.":"I've written every story in the kingdom, Master Aldric. Every one. But nobody has ever written mine.",
 "Ton histoire ? Mais… quelle histoire, mon garçon ?":"Your story? But… what story, my boy?",
 "Mille ans à écrire les héros des autres. Ce soir, j'écris le mien. Avec la première chanson de votre petite chouette, j'écrirai un nouveau Livre de l'Histoire. Et dans ce livre-là, le héros, ce sera moi.":"A thousand years writing other people's heroes. Tonight, I write mine. With your little owl's first song, I'll write a new Book of History. And in that book, the hero will be me.",
 "Et nous ? Et le Porteur ?":"And us? And the Bearer?",
 "Vous ? Vous serez des notes en bas de page. Ou rien du tout.":"You? You'll be footnotes. Or nothing at all.",
 "Il souffle sur sa page. Les étagères grondent, et un géant fait de livres se dresse entre vous et lui.":"He blows on his page. The shelves rumble, and a giant made of books rises between you and him.",
 "💗 Rester devant Plume et Lumen":'💗 Stand in front of Plume and Lumen',"Plume, garde Lumen contre toi. Je m'occupe du géant.":"Plume, keep Lumen close. I'll handle the giant.",
 '⚔️ Foncer vers le Scribe':'⚔️ Rush the Scribe',"Pose cette plume, tout de suite !":"Put that quill down, right now!",
 "Le géant s'effondre en une pluie de pages. Mais le Scribe a disparu. Sur son bureau, il ne reste qu'une seule feuille.":"The giant collapses in a rain of pages. But the Scribe is gone. On his desk, there's only one sheet left.",
 "C'est… une liste. Des noms. Corvin. Aléa. Astrée. Éryndel… et… et le tien, Porteur.":"It's… a list. Names. Corvin. Aléa. Astrée. Éryndel… and… and yours, Bearer.",
 "Il y a une petite case à côté de chaque nom. Comme une liste de courses.":"There's a little box next to each name. Like a shopping list.",
 "Une seule case est déjà cochée. Celle de Corvin.":"Only one box is already ticked. Corvin's.",
 "Le lendemain, la Capitale a changé. Sur la grande place, la statue du Porteur n'a plus de visage. Juste une pierre lisse.":"The next day, the Capital has changed. On the great square, the Bearer's statue has no face anymore. Just smooth stone.",
 "Les gens passent devant nous sans nous saluer. Comme s'ils ne nous avaient jamais vus de leur vie.":"People walk past us without a greeting. As if they'd never seen us in their lives.",
 "Dans les rues marchent des scribes d'encre, armés de grandes plumes. Partout où ils écrivent, quelque chose s'efface : une enseigne, une chanson, un souvenir.":"Ink scribes walk the streets, armed with great quills. Wherever they write, something is erased: a shop sign, a song, a memory.",
 "Porteur, il faut… il faut… Pardon. Qu'est-ce qu'on faisait, déjà ?":"Bearer, we have to… we have to… Sorry. What were we doing again?",
 "Plume ?":"Plume?",
 "Je sais que c'était important. Je le sais. Mais je ne sais plus pourquoi on est ici, toi et… et…":"I know it was important. I know it. But I don't remember why we're here, you and… and…",
 "Plume te regarde. Longtemps. Comme on regarde quelqu'un dont on a oublié le prénom.":"Plume looks at you. For a long time. The way you look at someone whose name you've forgotten.",
 "Pardon. Tu t'appelles comment, déjà ?":"Sorry. What's your name again?",
 "Il t'efface de sa mémoire, Porteur. Elle d'abord, parce que c'est elle qui te connaît le mieux. Puis tous les autres.":"He's erasing you from her memory, Bearer. Her first, because she knows you best. Then everyone else.",
 "Au bout de la rue, un grand chevalier d'encre lève une gomme aussi grande qu'une porte.":"At the end of the street, a tall ink knight raises an eraser as big as a door.",
 "💗 Prendre l'aile de Plume et lui rappeler vos aventures":"💗 Take Plume's wing and remind her of your adventures","Plume, c'est moi. On a sauvé le royaume ensemble. Trois fois. Tu te souviens ?":"Plume, it's me. We saved the kingdom together. Three times. Remember?",
 "⚔️ Arrêter les scribes d'encre":'⚔️ Stop the ink scribes',"Ils ne toucheront plus à un seul souvenir !":"They won't touch a single memory ever again!",
 "L'Effaceur éclate en taches noires. Les enseignes réapparaissent, les chansons reviennent. Mais pas tout.":"The Eraser bursts into black blots. The signs reappear, the songs come back. But not everything.",
 "Je… je me souviens de ta voix. Et de ton sourire. Mais pas de ton nom. C'est comme un trou dans ma tête, Porteur.":"I… I remember your voice. And your smile. But not your name. It's like a hole in my head, Bearer.",
 "Hou… Por… teur !":"Hoo… Bear… er!",
 "Lumen… Elle a dit ton nom. Elle, elle s'en souvient !":"Lumen… She said your name. She remembers it!",
 "Les bébés hiboux ne peuvent pas être effacés : ils ne sont pas encore écrits dans le Livre. C'est pour ça qu'il veut sa chanson. C'est la seule plume qu'il ne contrôle pas.":"Baby owls can't be erased: they aren't written in the Book yet. That's why he wants her song. It's the only quill he doesn't control.",
 "Tout ce que le Scribe efface finit quelque part. Corvin connaît l'endroit : l'Encrier du Monde, une mer noire sous les racines du royaume.":"Everything the Scribe erases ends up somewhere. Corvin knows the place: the Inkwell of the World, a black sea beneath the roots of the kingdom.",
 "Sur l'encre flottent des choses effacées : une berceuse, une enseigne, le nom d'un village. Et des pages entières des trois premiers livres.":"Erased things float on the ink: a lullaby, a shop sign, a village's name. And whole pages from the first three books.",
 "Là ! Le premier livre. Le jour où tu m'as tendu la main, Porteur. La page est presque blanche.":"There! The first book. The day you held out your hand to me, Bearer. The page is almost blank.",
 "Tu… tu as été méchant, avant, Corvin ? Je ne m'en souviens plus.":"You… you were bad, before, Corvin? I don't remember anymore.",
 "Oui, petite sœur. Très méchant. Et tu m'as pardonné. C'est le plus beau jour de ma vie. Je ne laisserai personne l'effacer.":"Yes, little sister. Very bad. And you forgave me. It's the best day of my life. I won't let anyone erase it.",
 "Une voix résonne sur la mer. Le Scribe marche sur l'encre comme sur un parquet ciré.":"A voice echoes over the sea. The Scribe walks on the ink like a polished floor.",
 "Tu tiens tant que ça à ta page, Corvin ? Alors je te fais une offre. Je rends à Plume tous ses souvenirs du Porteur. Contre une seule page. La tienne. Entière.":"You care that much about your page, Corvin? Then here's an offer. I give Plume back all her memories of the Bearer. For a single page. Yours. All of it.",
 "…":"…",
 "Ne l'écoute pas, Corvin !":"Don't listen to him, Corvin!",
 "C'est un piège. Les ombres le sentent. Il ne rend jamais rien, il prend.":"It's a trap. The shadows can feel it. He never gives anything back. He takes.",
 "Le Scribe sourit et frappe la mer de sa plume. Un léviathan noir sort des profondeurs.":"The Scribe smiles and strikes the sea with his quill. A black leviathan rises from the depths.",
 '💗 Rester près de Corvin':'💗 Stay close to Corvin',"Corvin, on trouvera une autre solution. Ensemble.":"Corvin, we'll find another way. Together.",
 '⚔️ Plonger sur le léviathan':'⚔️ Dive at the leviathan',"Retourne dans ton encrier !":"Back in your inkwell!",
 "Le léviathan se dissout dans la mer. Le Scribe, lui, s'est envolé avec un rire grinçant.":"The leviathan dissolves into the sea. The Scribe has flown off with a creaking laugh.",
 "Il disait vrai, tu sais. On peut réécrire une page… si quelqu'un donne la sienne à la place.":"He was telling the truth, you know. A page can be rewritten… if someone gives their own in exchange.",
 "Corvin, promets-moi que tu ne feras pas de bêtise.":"Corvin, promise me you won't do anything stupid.",
 "Hou… Je n'ai jamais tenu une seule promesse de ma vie, petite sœur. Ce n'est pas maintenant que je vais commencer.":"Hoo… I've never kept a single promise in my life, little sister. I'm not about to start now.",
 "Il rit. Mais il ne promet pas.":"He laughs. But he doesn't promise.",
 "Cette nuit-là, la bibliothèque tremble. Les livres s'envolent des étagères et tournent dans les airs comme une tempête de papier.":"That night, the library shakes. Books fly off the shelves and whirl through the air like a paper storm.",
 "La petite va chanter. Ce soir. Pour moi.":"The little one will sing. Tonight. For me.",
 "Une main d'encre traverse le toit et attrape le nid. Lumen disparaît entre les pages du grand livre du Scribe.":"A hand of ink bursts through the roof and grabs the nest. Lumen vanishes between the pages of the Scribe's great book.",
 "LUMEN !":"LUMEN!",
 "Je ne sais plus qui tu es, Porteur. Mais mon cœur, lui, s'en souvient. Et mon cœur dit que tu es mon ami. Alors aide-moi !":"I don't know who you are anymore, Bearer. But my heart remembers. And my heart says you're my friend. So help me!",
 "Il faut l'empêcher de la faire chanter avant que sa page soit prête !":"We have to stop him from making her sing before his page is ready!",
 "Des chevaliers de papier. Leurs plumes coupent comme des épées. Restez derrière moi !":"Paper knights. Their quills cut like swords. Stay behind me!",
 "💗 Combattre aux côtés de Plume, même si elle a oublié":"💗 Fight beside Plume, even if she's forgotten","Pas besoin de te souvenir de moi, Plume. Moi, je me souviens pour deux.":"You don't need to remember me, Plume. I'll remember for both of us.",
 '⚔️ Foncer vers le livre du Scribe':"⚔️ Rush the Scribe's book","Rends-nous Lumen !":"Give Lumen back!",
 "Les chevaliers tombent en confettis. Le Scribe recule, son grand livre serré contre lui.":"The knights fall as confetti. The Scribe backs away, clutching his great book.",
 "Trop tard. Elle a chanté. Une seule note, toute petite. Mais une note suffit pour ouvrir la Dernière Page.":"Too late. She sang. One single, tiny note. But one note is enough to open the Last Page.",
 "Le sol de la bibliothèque s'ouvre comme la couverture d'un livre. En dessous, il n'y a rien. Seulement du blanc. Une page immense, vide, qui attend qu'on l'écrive.":"The library floor opens like a book cover. Beneath it, there's nothing. Only white. A vast, empty page, waiting to be written.",
 "La Dernière Page. Tout ce qui y sera écrit deviendra vrai. Pour toujours.":"The Last Page. Whatever is written on it will come true. Forever.",
 "Sur la Dernière Page, tout est blanc. Le ciel, le sol, l'horizon. Au milieu, le Scribe écrit à toute vitesse, et chaque mot devient un morceau de monde.":"On the Last Page, everything is white. The sky, the ground, the horizon. In the middle, the Scribe writes at full speed, and every word becomes a piece of the world.",
 "« Et le Scribe sauva le royaume. Et tout le monde se souvint de son nom. » Vous voyez ? C'est si simple.":"“And the Scribe saved the kingdom. And everyone remembered his name.” You see? It's so simple.",
 "Ton nom ? Mais tu n'en as pas, de nom. Tu ne l'as jamais écrit nulle part.":"Your name? But you don't have a name. You've never written it anywhere.",
 "Il a écrit mille ans d'histoires, et il a oublié d'écrire la sienne. Il ne veut pas être un héros, Porteur. Il veut juste que quelqu'un se souvienne de lui. Je connais ça.":"He wrote a thousand years of stories, and he forgot to write his own. He doesn't want to be a hero, Bearer. He just wants someone to remember him. I know that feeling.",
 "TAISEZ-VOUS ! Tout le monde oublie ceux qui écrivent ! TOUT LE MONDE !":"BE QUIET! Everyone forgets the ones who write! EVERYONE!",
 "Dans le livre du Scribe, Lumen se débat. Sa petite lumière clignote comme une bougie dans le vent.":"Inside the Scribe's book, Lumen struggles. Her little light flickers like a candle in the wind.",
 "💗 Lui demander son nom":'💗 Ask him his name',"Dis-nous ton nom. On l'écrira. Mais pas à la place de celui des autres.":"Tell us your name. We'll write it. But not in place of everyone else's.",
 "⚔️ Briser sa plume d'encre":'⚔️ Break his ink quill',"L'histoire appartient à tout le monde. Pas seulement à toi !":"History belongs to everyone. Not just you!",
 "Assez ! Je vais vous rayer de l'histoire !":"Enough! I'll strike you out of history!",
 "La plume du Scribe se brise. L'encre qui le forme coule sur la page blanche, et ses mains deviennent transparentes.":"The Scribe's quill breaks. The ink he's made of runs onto the white page, and his hands turn transparent.",
 "Mon nom… Personne ne me l'a jamais demandé. En mille ans. Personne.":"My name… Nobody has ever asked me. In a thousand years. Nobody.",
 "Je m'appelais Élio. J'avais douze ans quand je suis entré dans la tour. J'aimais les histoires des autres. Je voulais juste… en faire partie.":"My name was Élio. I was twelve when I entered the tower. I loved other people's stories. I just wanted… to be part of them.",
 "Élio. Voilà. Maintenant, tu en fais partie.":"Élio. There. Now you are.",
 "Élio sourit. Puis l'encre se retire, et il s'en va pour de bon, comme une page qu'on tourne. Le grand livre tombe, et Lumen en sort en piaillant.":"Élio smiles. Then the ink recedes, and he leaves for good, like a page being turned. The great book falls, and Lumen tumbles out, chirping.",
 "La plume du Scribe éclate. Il hurle, et l'encre qui le forme se répand sur la page blanche.":"The Scribe's quill shatters. He screams, and the ink he's made of spills across the white page.",
 "Non… non ! Je n'ai pas fini mon histoire ! Je n'ai même pas écrit mon nom !":"No… no! I haven't finished my story! I haven't even written my name!",
 "Il essaie d'écrire encore, avec ses doigts. Mais il n'y a plus d'encre. Le Scribe sans Nom se dissout, sans que personne ne sache jamais comment il s'appelait.":"He tries to keep writing, with his fingers. But there's no ink left. The Nameless Scribe dissolves, and no one will ever know what his name was.",
 "Le grand livre tombe, et Lumen en sort en piaillant.":"The great book falls, and Lumen tumbles out, chirping.",
 "Lumen ! … Et toi… Je ne sais toujours pas qui tu es. Ça fait tellement mal, de ne pas savoir.":"Lumen! … And you… I still don't know who you are. It hurts so much, not knowing.",
 "Moi, je sais comment réparer ça.":"I know how to fix that.",
 "Corvin ramasse la plume brisée du Scribe. Sur la Dernière Page, il reste juste assez d'encre pour une phrase.":"Corvin picks up the Scribe's broken quill. On the Last Page, there's just enough ink left for one sentence.",
 "Une page contre une page. C'était le prix, tu te souviens ? La mienne, contre les souvenirs de Plume.":"A page for a page. That was the price, remember? Mine, for Plume's memories.",
 "Corvin, non ! Si tu donnes ta page, plus personne ne se souviendra de toi !":"Corvin, no! If you give your page, nobody will remember you anymore!",
 "Toute ma vie, j'ai eu peur d'être oublié. C'est pour ça que j'étais devenu méchant, avant. Tu ne t'en souviens plus, mais c'est vrai.":"All my life, I was afraid of being forgotten. That's why I turned bad, before. You don't remember, but it's true.",
 "Et puis tu m'as pardonné. J'ai eu une sœur, des amis, un Porteur. J'ai déjà eu tout ce que je voulais. Maintenant, c'est ton tour.":"And then you forgave me. I had a sister, friends, a Bearer. I've already had everything I wanted. Now it's your turn.",
 "Il écrit : « Plume se souvient du Porteur. De tout. Pour toujours. »":"He writes: “Plume remembers the Bearer. Everything. Forever.”",
 "Porteur… toi, tu te souviendras. Les Porteurs ne s'effacent pas. Raconte-lui, de temps en temps. Que son frère chantait faux.":"Bearer… you'll remember. Bearers can't be erased. Tell her, now and then. That her brother sang off-key.",
 "Et Corvin, le vieux hibou gris, disparaît de la page. Puis du monde. Puis de toutes les mémoires du royaume. Sauf une.":"And Corvin, the old grey owl, vanishes from the page. Then from the world. Then from every memory in the kingdom. All but one.",
 "Porteur ! Porteur, c'est toi ! Je me souviens de tout ! Le Cœur d'Éther, Aléa, Éryndel… Tout est revenu !":"Bearer! Bearer, it's you! I remember everything! The Ether Heart, Aléa, Éryndel… It's all come back!",
 "… Mais pourquoi tu pleures ?":"… But why are you crying?",
 "Plume ne sait pas. Personne ne sait. Dans la mémoire du royaume, il n'y a jamais eu de Corvin. Il n'y en a plus que dans la tienne.":"Plume doesn't know. Nobody knows. In the kingdom's memory, there was never any Corvin. He only lives on in yours.",
 "Quelques semaines plus tard, dans la Bibliothèque des Hiboux…":"A few weeks later, in the Owl Library…",
 "Porteur, écoute ! Lumen a appris à chanter ! … Bon. Elle chante complètement faux.":"Bearer, listen! Lumen has learned to sing! … Well. She sings completely off-key.",
 "Hou hou houuu !":"Hoo hoo hooo!",
 "C'est bizarre. Ça me rend triste et heureuse en même temps. Comme si quelqu'un, avant, chantait faux exactement comme ça.":"It's strange. It makes me sad and happy at the same time. As if someone, before, used to sing off-key exactly like that.",
 "Dans le nid, sous Lumen, il y a une plume grise. Plume ne sait pas à qui elle appartient. Mais elle refuse de la jeter.":"In the nest, under Lumen, there's a grey feather. Plume doesn't know whose it is. But she refuses to throw it away.",
 "Fin du quatrième livre. Merci, Porteur.":"End of the fourth book. Thank you, Bearer."})}catch(e){}
}catch(e){console.warn('livre IV',e)}})();
