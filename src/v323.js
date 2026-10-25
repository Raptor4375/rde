
/* ================= LIVRE III : « L'Écho du Premier Porteur » ================= */
/* 6 chapitres (15 à 20), débloqués avec le mode Normal. Certains passages se déroulent dans le passé :
   ils s'affichent comme un vieux film (sépia, grain, rayures), avec les couleurs à peine visibles. */
Object.assign(SAGA_WHO,{eryndel:{n:'Éryndel, le Premier Porteur',c:'#ffb05a'},roi:{n:'Le Roi de Cendre',c:'#ff6a1a'},aldric:{n:'Grand Aldric, Gardien-Hibou',c:'#e8c88a'},cendre:{n:'Le Chevalier de Cendre',c:'#b8aca4'}});
SAGA.push(
 {t:'Le Cœur qui se souvient',ic:'🫀',req:5,b3:1,bg:['#ffb08a','#6a2a4a','#1a0a1a'],place:"Capitale d'Éther",
  intro:[['narr',"Depuis que de nouvelles étoiles brillent dans le ciel, le royaume vit en paix. Mais une nuit, le Cœur d'Éther se met à battre… à l'envers."],
   ['plume',"Hou… Porteur, tu entends ? Boum… boum… Ce n'est pas son rythme. On dirait qu'il se souvient de quelque chose."],
   [57,"Ma lumière tremble quand je m'approche de lui. Comme une bougie devant une très vieille porte qui s'ouvre."],
   [58,"Ce n'est pas un battement. C'est un écho. Le Cœur rejoue un moment très ancien… plus ancien que moi."],
   ['narr',"Une fissure dorée s'ouvre sur le cristal. Une lumière couleur de vieux papier envahit la salle…"],
   {fb:1,t:'Il y a mille ans…'},
   ['narr',"Le Cœur d'Éther brille au sommet d'une tour de pierre blanche. Autour de lui, des dizaines de hiboux gardiens veillent."],
   ['aldric',"Plume, ma petite. Aujourd'hui, le Cœur va choisir son tout premier Porteur. Tiens-toi droite !"],
   ['plume',"Oui, Grand Aldric ! Hou… j'ai le cœur qui bat aussi vite que le sien."],
   ['eryndel',"Je m'appelle Éryndel. Je n'ai ni épée, ni château. Seulement l'envie de protéger ceux que j'aime."],
   ['aldric',"C'est exactement ce que le Cœur cherchait. Éryndel, tu es le Premier Porteur."],
   {fb:0},
   ['plume',"Éryndel… Je l'avais oublié. Non… j'avais VOULU l'oublier."],
   ['narr',"Le souvenir se déchire. Des cendres tombent du plafond et prennent la forme d'une silhouette sans visage."],
   [47,"Ces cendres… je les reconnais. Elles brûlent froid. Ce sont les cendres d'une promesse trahie."],
   {ch:[["💗 Rassurer Plume avant tout",'cmp',"Plume, regarde-moi. Quoi qu'il se soit passé, on l'affronte ensemble."],["⚔️ Attaquer l'écho avant qu'il grandisse",'brv',"On ne le laisse pas toucher au Cœur ! En garde !"]]},
   [57,"Alors brûlons-le avec de la vraie lumière !"]],
  boss:{n:'Écho de Cendre',h:20,st:100},
  outro:[['narr',"L'Écho s'effondre en poussière grise. Au sol, il reste une plume. Une plume de hibou… noircie par le feu."],
   ['plume',"C'est… une plume du Grand Aldric. Mon maître."],
   [58,"Le Cœur ne fait pas que se souvenir. Il appelle à l'aide. Quelqu'un, quelque part, est en train de rallumer le passé."],
   ['plume',"Porteur… il faut que je te dise la vérité. Avant toi, il y a eu un autre Porteur. Et c'est à cause de lui que je suis la dernière Gardienne-Hibou."],
   ['plume',"Les réponses sont à la Bibliothèque des Hiboux. Ou dans ce qu'il en reste."]]},
 {t:'La Bibliothèque des Hiboux',ic:'📜',req:15,b3:1,bg:['#e8d8a8','#5a4a2a','#1a140a'],place:'Ruines de la Bibliothèque des Hiboux',
  intro:[['narr',"Au fond de la Forêt Sylvaine, sous des racines géantes, dort une bibliothèque. Ses étagères montent jusqu'aux nuages."],
   [59,"Mes racines ont gardé cet endroit pendant mille ans. Elles disaient qu'une petite chouette reviendrait un jour."],
   ['plume',"Rien n'a bougé… Mon nid est toujours là-haut. À côté du rayon des légendes."],
   [45,"Les livres parlent entre eux, ici. Celui-ci, la Chronique des Gardiens, refuse de s'ouvrir… sauf pour toi, Plume."],
   ['narr',"Plume pose sa patte sur la couverture. Le livre s'ouvre, et ses pages se mettent à défiler comme un vieux film."],
   {fb:1,t:'Il y a mille ans…'},
   ['narr',"Des années ont passé. Éryndel a protégé le royaume avec le Cœur. Les gens l'aiment. Ses cheveux sont devenus gris."],
   ['eryndel',"Aldric, le Cœur faiblit en moi. Bientôt, il choisira un nouveau Porteur. Et moi… je serai oublié."],
   ['aldric',"C'est la règle, Éryndel. Le Cœur passe de main en main, comme une flamme. Personne ne le garde pour toujours."],
   ['eryndel',"Et si je refusais ? Si je gardais la flamme… pour toujours ?"],
   ['plume',"Éryndel, non ! Tu nous as dit que tu voulais protéger les autres, pas te protéger toi !"],
   ['narr',"Cette nuit-là, Éryndel vola la flamme du Cœur. La tour brûla. Les hiboux gardiens se changèrent en statues de pierre pour retenir le feu."],
   {fb:0},
   ['plume',"Ils se sont tous sacrifiés. Tous… sauf moi. Aldric m'avait cachée sous son aile."],
   ['narr',"Un bruit de pierre qui craque. Au bout de l'allée, une statue de hibou géant ouvre des yeux rouges comme la braise."],
   [59,"La flamme volée a touché cette statue. Ce n'est plus vraiment Aldric… mais elle se souvient de lui."],
   {ch:[["💗 Parler au Grand Aldric",'cmp',"Grand Aldric ! C'est Plume, ta petite élève ! Réveille-toi !"],["⚔️ Briser la pierre pour libérer son âme",'brv',"On brise la pierre. Son âme sera enfin libre !"]]},
   [45,"Les étoiles disent qu'il entendra ta voix, Plume. Mais d'abord, il faut calmer la pierre !"]],
  boss:{n:'Hibou de Pierre',h:35,st:100},
  outro:[['narr',"La statue se fend. Une douce lumière s'en échappe, et une voix grave résonne dans la bibliothèque."],
   ['aldric',"Plume… ma petite. Tu as grandi. Et tu as trouvé un vrai Porteur, je le vois dans ses yeux."],
   ['plume',"Grand Aldric ! Pardon… j'aurais dû vous sauver…"],
   ['aldric',"Tu nous as sauvés, en vivant. Écoute-moi : Éryndel n'est pas mort. La flamme l'a gardé en vie, dans les Cendres de l'Aube. Il attend que le Cœur batte assez fort pour le reprendre."],
   ['aldric',"Et le Cœur bat fort, maintenant. Grâce à vous. Allez-y. Et… prends soin d'elle, Porteur."],
   ['narr',"La lumière s'envole. Sur l'étagère, la Chronique se referme toute seule sur une dernière page : une carte du Désert des Cendres."]]},
 {t:"Les Cendres de l'Aube",ic:'🔥',req:30,b3:1,bg:['#ff9a5a','#5a3a3a','#1a1010'],place:"Désert des Cendres de l'Aube",
  intro:[['narr',"Ici, le soleil ne se couche jamais vraiment. Il reste bloqué à l'horizon, rouge, comme s'il avait peur d'avancer."],
   [65,"Je connais cet endroit. Il y a mille ans, j'ai combattu un homme qui portait une flamme volée. Il m'a vaincu… et mon feu s'est éteint pendant un siècle."],
   [47,"Mon peuple est né de ces cendres. On nous racontait que le Roi de Cendre reviendrait le jour où le Cœur chanterait de nouveau."],
   [57,"Ce soleil… c'est le mien. Un morceau de moi, volé en même temps que la flamme. Je le sens qui pleure."],
   ['plume',"Il a pris tout ce qui brille. Même le soleil."],
   ['narr',"Une armée de silhouettes grises se lève du sable. À leur tête, un chevalier dont l'armure fume encore."],
   ['cendre',"Halte ! Le Roi dort. Le Roi rêve. Et quand il se réveillera, il aura besoin du Cœur. Donnez-le-nous."],
   ['plume',"Jamais ! Le Cœur n'appartient à personne !"],
   {ch:[["💗 Rendre son soleil à Solaris d'abord",'cmp',"Solaris, reprends ta lumière ! Sans elle, ils ne sont que des ombres !"],["⚔️ Charger le chevalier avec Drakhar",'brv',"Drakhar, c'est l'heure de ta revanche. On fonce !"]]},
   [65,"Mille ans que j'attends ce combat. Pour mon feu !"]],
  boss:{n:'Chevalier de Cendre',h:15,st:100},
  outro:[['narr',"L'armure du chevalier s'ouvre. Dedans, il n'y a qu'un vieux soldat épuisé, qui sourit pour la première fois depuis mille ans."],
   ['cendre',"Merci… J'étais le garde d'Éryndel. Je l'ai suivi par fidélité. Il n'était pas méchant, au début. Il avait juste… peur d'être oublié."],
   [57,"Mon soleil se remet à avancer. Regardez !"],
   ['narr',"Le soleil rouge glisse enfin derrière les dunes. Pour la première fois depuis mille ans, la nuit tombe sur le désert."],
   ['cendre',"Le Roi va le sentir. Pour l'arrêter, vous devez comprendre ce qu'il a perdu. Seul Kaïros peut vous montrer… la nuit où tout a basculé."],
   [58,"Il a raison. Il est temps d'ouvrir le Miroir du Passé."]]},
 {t:'Le Miroir du Passé',ic:'🪞',req:45,b3:1,fbBattle:1,bg:['#f4e8c8','#8a7a5a','#2a2418'],place:'La tour blanche, il y a mille ans',
  intro:[[58,"Ce miroir montre le passé. Mais attention : si on y entre, on y est vraiment. Et ce qu'on y fait… compte."],
   ['plume',"Alors on peut empêcher Éryndel de voler la flamme ?!"],
   [58,"Non. Le passé est déjà écrit. Mais on peut lui dire ce qu'il n'a jamais entendu."],
   {fb:1,t:'La nuit du vol, il y a mille ans…'},
   ['narr',"La tour blanche, sous la lune. Éryndel monte les marches, une main tendue vers le Cœur. Il tremble."],
   ['eryndel',"Qui êtes-vous ? Une chouette… Plume ? Non, tu es plus grande. Et lui… il porte la même lumière que moi."],
   ['plume',"Éryndel. Je viens du futur. Je suis Plume. Et lui, c'est le nouveau Porteur."],
   ['eryndel',"Un nouveau Porteur ? Alors c'est vrai. Je serai remplacé. Oublié. Comme tous les autres."],
   {ch:[["💗 Lui dire qu'on se souvient de lui",'cmp',"On ne t'a pas oublié, Éryndel. Plume a pensé à toi chaque jour pendant mille ans."],["⚔️ L'empêcher de toucher au Cœur",'brv',"Recule, Éryndel. Je ne te laisserai pas faire ça !"]]},
   ['eryndel',"Des mots… Ce ne sont que des mots ! La flamme, elle, ne ment pas !"],
   ['narr',"Éryndel saisit la flamme. Son ombre grandit sur le mur, immense, couronnée de cendres."]],
  boss:{n:'Éryndel, le Porteur Brûlé',h:30,st:100},
  outro:[['narr',"Éryndel tombe à genoux. La flamme flotte entre ses mains. Il hésite… puis il la serre contre lui."],
   ['eryndel',"Je ne peux pas… J'ai trop peur. Pardonne-moi, Plume."],
   ['plume',"…Je t'ai déjà pardonné. Je viens juste de le comprendre."],
   ['narr',"Le miroir se brise. Le Porteur et Plume retombent dans le présent, au milieu de la salle du Cœur."],
   {fb:0},
   [58,"Le passé n'a pas changé. Mais Éryndel a entendu tes mots. Ils ont traversé mille ans… jusqu'à lui."],
   ['narr',"Au même moment, très loin, une couronne de cendres s'allume. Le Roi de Cendre ouvre les yeux."]]},
 {t:'Le Siège de la Capitale',ic:'🏰',req:60,b3:1,bg:['#ff6a2a','#3a1a1a','#0a0404'],place:"Capitale d'Éther, sous la cendre",
  intro:[['narr',"Le ciel de la Capitale devient gris. Il pleut des cendres. Sur les remparts, les gardes ne voient plus à trois pas."],
   ['corvin2',"Plume ! Le Roi de Cendre marche sur la Capitale. Il veut le Cœur. Mes corbeaux l'ont vu : il est grand comme une tour."],
   ['vesperax',"Ses soldats de cendre se reforment quand on les frappe. Il faut trouver celui qui les commande."],
   ['alea',"Un siège, une capitale, un roi furieux… J'adore ce genre de partie. Porteur, je mise tout sur toi. Encore."],
   ['astree',"Mes étoiles ne passent pas à travers la cendre. Il faut ouvrir une brèche dans le ciel !"],
   ['plume',"Le Dragon de Cendre ! C'est lui qui souffle ces nuages. Si on l'abat, le ciel s'ouvrira."],
   {ch:[["💗 Protéger les habitants pendant l'attaque",'cmp',"D'abord les habitants ! On les met à l'abri, puis on s'occupe du dragon."],["⚔️ Monter sur les remparts et défier le dragon",'brv',"Sur les remparts ! Le dragon, c'est pour moi !"]]},
   [65,"Un dragon de cendre ? Laisse-moi lui apprendre ce qu'est un vrai dragon."]],
  boss:{n:'Dragon de Cendre',h:20,st:100},
  outro:[['narr',"Le Dragon de Cendre explose en une pluie grise. Le ciel s'ouvre, et les étoiles d'Astrée tombent comme une pluie de lumière."],
   ['astree',"Le chemin est libre ! Le Roi de Cendre est seul, maintenant, sur son trône au milieu des cendres."],
   ['plume',"Porteur… je veux lui parler une dernière fois. Avant de le combattre."],
   ['corvin2',"Je comprends, Plume. Moi aussi, j'ai eu besoin qu'on me tende la main."],
   ['alea',"Alors, dernière partie. Le Premier Porteur contre le dernier. Que le meilleur cœur gagne."]]},
 {t:'Le Premier Porteur',ic:'👑',req:75,b3:1,fin3:1,bg:['#ffb03a','#3a2a2a','#050303'],place:'Le Trône de Cendre',
  intro:[['narr',"Au centre d'un océan de cendres, un trône. Et sur le trône, un roi dont la couronne brûle sans jamais s'éteindre."],
   ['roi',"Plume. Tu as vieilli. Moi, non. La flamme m'a gardé jeune. Elle m'a gardé… vivant."],
   ['plume',"Elle t'a gardé seul, Éryndel. Mille ans tout seul. Ce n'est pas vivre."],
   ['roi',"Et toi, nouveau Porteur ? Tu crois qu'on se souviendra de toi ? Dans cent ans, ils auront oublié ton nom. Comme le mien."],
   {fb:1,t:'Un souvenir…'},
   ['narr',"Une tour blanche. Un jeune homme qui rit, entouré de hiboux. Il porte une petite chouette grise sur l'épaule."],
   ['eryndel',"Plume ! Quand je serai vieux, tu raconteras mes histoires aux autres Porteurs, d'accord ?"],
   ['plume',"Promis, Éryndel ! Je raconterai tout. Même les fois où tu es tombé de ton cheval !"],
   {fb:0},
   ['plume',"J'ai tenu ma promesse. Je raconte ton histoire, Éryndel. Là, maintenant."],
   ['roi',"Tais-toi ! TAIS-TOI ! Le Cœur est à moi !"],
   {ch:[["💗 Tenir la promesse de Plume : se souvenir de lui",'cmp',"Éryndel, on va se souvenir de toi. Pas du Roi de Cendre. De toi."],["⚔️ Briser la couronne de cendre",'brv',"Cette couronne t'a volé mille ans. Je vais la briser !"]]},
   ['roi',"Alors venez. Le Premier Porteur contre le dernier !"]],
  boss:{n:'Éryndel, le Roi de Cendre',h:25,st:100},
  outroA:[['roi',"Vous… vous vous souvenez de moi ? Du vrai moi ?"],
   ['plume',"Du garçon qui riait avec les hiboux. Du Porteur qui voulait protéger tout le monde. Oui, Éryndel."],
   ['narr',"La couronne de cendre se fend. La flamme volée s'échappe et rentre doucement dans le Cœur d'Éther, comme un oiseau qui rentre au nid."],
   ['eryndel',"Merci, Plume. Merci, Porteur. Je n'avais pas peur de mourir… j'avais peur d'être oublié."],
   ['narr',"Éryndel devient une lumière douce, qui monte vers le ciel. Une nouvelle étoile apparaît, juste à côté de la Seconde Étoile."]],
  outroB:[['narr',"La couronne de cendre éclate en mille morceaux. La flamme volée s'en échappe et file vers le Cœur d'Éther."],
   ['roi',"Ma flamme… Sans elle, je… je redeviens… moi."],
   ['eryndel',"Je suis désolé, Plume. Pour la tour. Pour Aldric. Pour tout."],
   ['plume',"Va en paix, Éryndel. Je raconterai ton histoire. C'était promis."],
   ['narr',"Éryndel s'efface comme une braise qui s'endort. Là où il était assis, il ne reste qu'une petite plume grise."]]});
(function(){const C=SAGA[19];const epi=[['narr',"Quelques jours plus tard, dans la Bibliothèque des Hiboux…"],['plume',"Porteur ! Viens vite ! Sous la statue du Grand Aldric… il y avait ÇA."],['narr',"Un œuf. Un œuf de hibou, tout chaud, gardé intact sous la pierre pendant mille ans."],['plume',"Je ne suis plus la dernière… Hou… Hou hou ! Je vais être une grande sœur !"],['narr',"Fin du troisième livre. Merci, Porteur !"]];C.outroA=C.outroA.concat(epi);C.outroB=C.outroB.concat(epi)})();
SAGA_SCENE.push(11,6,3,8,9,10);
LORE_CHARS.push({k:'eryndel',n:'Éryndel, le Premier Porteur',r:"Premier Porteur du Cœur d'Éther",ch:14,d:"Il y a mille ans, le Cœur l'a choisi parce qu'il voulait protéger les autres. Mais il a eu peur d'être oublié, et il a volé la flamme du Cœur."},
 {k:'aldric',n:'Grand Aldric',r:'Maître des Gardiens-Hiboux',ch:15,d:"Le maître de Plume. Il s'est changé en statue de pierre pour retenir le feu de la tour, et il a caché Plume sous son aile."},
 {k:'roi',n:'Le Roi de Cendre',r:'Éryndel, mille ans plus tard',ch:19,d:"La flamme volée a gardé Éryndel en vie pendant mille ans, seul sur un trône de cendres. Sa couronne brûle sans jamais s'éteindre."});
const BK3SYM=['🫀','📜','🔥','🪞','🏰','👑'];
/* --- les deux visages d'Éryndel (même moteur que les héros) --- */
const ERY_LOOK=['#f2d2b6','#d8b070','#7a3a2a','#e8c870','#ff9a3a','#8a5a2a','bg:dawn back:cape+sword hair:bangs hat:circlet eyes:normal mouth:smile body:tunic ear:human'];
const ROI_LOOK=['#b8aca4','#3a3430','#2a2420','#5a4a40','#ff6a1a','#ff6a1a','bg:ember back:cape+greatsword hb:long hair:wild hat:crown-black face:soot eyes:glow mouth:neutral body:armor ear:human'];
const ERYC={};
function eryBody(k){if(ERYC[k])return ERYC[k];let s='';try{const id=k==='roi'?202:201,n=LOOKS.length;LOOKS[id]=k==='roi'?ROI_LOOK:ERY_LOOK;s=heroBody({i:id,n:k==='roi'?'Le Roi de Cendre':'Éryndel',c:'Guerrier',r:3,sk:{n:'Flamme',tg:'one',fx:{dmg:100}}},0);delete LOOKS[id];LOOKS.length=n}catch(e){s=''}
  return ERYC[k]=s}
{const sf=sagaFig;sagaFig=function(w){try{if(w==='eryndel'||w==='roi'){const b=eryBody(w);if(b)return`<div class="sgfig lore">${b.replace('<svg','<svg class="loresvg hb"')}</div>`}
  if(w==='aldric')return`<div class="sgfig aldric">${aldricSVG()}</div>`;if(w==='cendre')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS['Chevalier de Cendre']()}</svg></div>`}catch(e){}return sf.apply(this,arguments)}}
{const lf=loreFig;loreFig=function(k){try{if(k==='eryndel'||k==='roi'){const b=eryBody(k);if(b)return b.replace('<svg','<svg class="loresvg hb"')}if(k==='aldric')return aldricSVG()}catch(e){}return lf.apply(this,arguments)}}
/* --- le Grand Aldric : un vieux hibou savant --- */
function aldricSVG(){const O='#2a1a0a',s=`stroke="${O}" stroke-width="2" stroke-linejoin="round"`;return`<svg class="loresvg" viewBox="0 0 120 130" xmlns="http://www.w3.org/2000/svg"><ellipse cx="60" cy="124" rx="34" ry="5" fill="#000" opacity=".25"/>
 <path d="M24 60Q22 112 60 120Q98 112 96 60Q92 30 60 28Q28 30 24 60Z" fill="#8a6a4a" ${s}/><path d="M38 70Q36 108 60 114Q84 108 82 70Q76 56 60 56Q44 56 38 70Z" fill="#f0dcb4" ${s}/>
 ${[[50,76],[60,74],[70,76],[46,88],[56,86],[66,86],[74,88],[52,100],[62,98],[70,100]].map(([x,y])=>`<path d="M${x-4} ${y}q4 5 8 0" stroke="#a88a5a" stroke-width="1.6" fill="none"/>`).join('')}
 <path d="M24 64Q8 84 18 108Q30 100 34 80Z" fill="#6a4e34" ${s}/><path d="M96 64Q112 84 102 108Q90 100 86 80Z" fill="#6a4e34" ${s}/>
 <g transform="translate(92 92) rotate(-14)"><rect x="-10" y="-13" width="20" height="26" rx="2" fill="#7a3a2a" ${s}/><path d="M-6 -8h12M-6 -3h12M-6 2h8" stroke="#e8c870" stroke-width="1.4"/></g>
 <path d="M32 34L26 10L44 26Z M88 34L94 10L76 26Z" fill="#6a4e34" ${s}/><path d="M30 30L28 16M90 30L92 16" stroke="#c8b090" stroke-width="1.4"/>
 <path d="M34 40Q48 32 58 42M86 40Q72 32 62 42" stroke="#fff6e0" stroke-width="5" stroke-linecap="round" fill="none"/>
 <circle cx="46" cy="50" r="11" fill="#fff6e0" ${s}/><circle cx="74" cy="50" r="11" fill="#fff6e0" ${s}/><circle cx="46" cy="50" r="5.5" fill="#e8a020"/><circle cx="74" cy="50" r="5.5" fill="#e8a020"/><circle cx="46" cy="50" r="2.6" fill="${O}"/><circle cx="74" cy="50" r="2.6" fill="${O}"/>
 <circle cx="46" cy="50" r="13" fill="none" stroke="#c8a040" stroke-width="2"/><circle cx="74" cy="50" r="13" fill="none" stroke="#c8a040" stroke-width="2"/><path d="M59 50h2" stroke="#c8a040" stroke-width="2"/>
 <path d="M55 58L60 68L65 58Z" fill="#e8b040" ${s}/><path d="M48 66Q60 80 72 66Q66 74 60 74Q54 74 48 66Z" fill="#fff6e0" opacity=".9"/>
 <g transform="translate(60 22)"><path d="M-16 4Q0 -10 16 4Z" fill="#3a2a5a" ${s}/><path d="M-20 4H20" stroke="${O}" stroke-width="2.4"/><circle cx="14" cy="-2" r="3" fill="#e8c870"/></g></svg>`}
/* --- les boss du Livre III --- */
MONS['Écho de Cendre']=()=>{const O='#170f2a';return`<circle cx="50" cy="48" r="44" fill="#ff8a5a" opacity=".1"/>${[...Array(10)].map((_,i)=>`<circle cx="${20+i*7}" cy="${90-(i*13)%60}" r="${1+i%3}" fill="#b8aca4" opacity=".6"><animate attributeName="cy" values="${96-(i*13)%60};${60-(i*13)%60}" dur="${2+i%3}s" repeatCount="indefinite"/></circle>`).join('')}
 <path d="M26 100Q22 60 34 40Q50 18 66 40Q78 60 74 100Q62 90 50 98Q38 90 26 100Z" fill="#6a625a" stroke="${O}" stroke-width="1.8"/><path d="M32 96Q30 66 40 50Q50 38 60 50Q70 66 68 96" fill="#8a8278" opacity=".7"/>
 <ellipse cx="50" cy="44" rx="13" ry="15" fill="#4a4440" stroke="${O}" stroke-width="1.8"/><path d="M42 42Q45 39 48 42M52 42Q55 39 58 42" stroke="#ff8a3a" stroke-width="2.4" fill="none"><animate attributeName="stroke-opacity" values="1;.3;1" dur="1.4s" repeatCount="indefinite"/></path>
 <path d="M44 52Q50 50 56 52" stroke="${O}" stroke-width="1.4" fill="none"/><path d="M38 30Q50 20 62 30" stroke="#ff6a1a" stroke-width="1.4" fill="none" stroke-dasharray="2 2"/>`};
MONS['Hibou de Pierre']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="48" r="44" fill="#e8d8a8" opacity=".14"/>
 <path d="M18 98Q14 60 26 40Q36 24 50 22Q64 24 74 40Q86 60 82 98Z" fill="#8a8580" ${s}/><path d="M24 70Q14 56 18 40Q30 50 32 70Z M76 70Q86 56 82 40Q70 50 68 70Z" fill="#6a6560" ${s}/>
 ${[[40,74],[50,80],[60,74],[45,88],[55,88]].map(([x,y])=>`<path d="M${x-5} ${y}q5 6 10 0" stroke="#5a5550" stroke-width="1.4" fill="none"/>`).join('')}
 <path d="M30 26L36 10L42 24Z M70 26L64 10L58 24Z" fill="#8a8580" ${s}/><circle cx="39" cy="42" r="10" fill="#d8d0c0" ${s}/><circle cx="61" cy="42" r="10" fill="#d8d0c0" ${s}/>
 <circle cx="39" cy="42" r="5" fill="#ff4a1a"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle><circle cx="61" cy="42" r="5" fill="#ff4a1a"><animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/></circle>
 <path d="M46 52L50 60L54 52Z" fill="#c8a050" ${s}/><path d="M30 30L40 50L34 64M70 32L62 48" stroke="#ff8a3a" stroke-width="1" fill="none" opacity=".8"/>`};
MONS['Chevalier de Cendre']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="44" fill="#ff9a5a" opacity=".1"/>
 <path d="M24 100L28 60Q50 50 72 60L76 100Z" fill="#4a4440" ${s}/><path d="M28 60Q22 70 22 90L30 88Z M72 60Q78 70 78 90L70 88Z" fill="#3a3430" ${s}/><path d="M40 64H60V96H40Z" fill="#5a524a" ${s}/><path d="M50 64V96" stroke="#ff6a1a" stroke-width="1.2"/>
 <path d="M34 26Q34 12 50 10Q66 12 66 26V48Q50 56 34 48Z" fill="#6a625a" ${s}/><path d="M38 34H62" stroke="${O}" stroke-width="3"/><path d="M40 34H60" stroke="#ff8a3a" stroke-width="1.4"><animate attributeName="stroke-opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></path>
 <path d="M50 10Q56 0 62 4Q56 6 54 12" fill="#ff6a1a" opacity=".8"/><path d="M82 30V96" stroke="#3a3430" stroke-width="3"/><path d="M76 30L82 10L88 30Z" fill="#8a8278" ${s}/>
 ${[0,1,2].map(i=>`<path d="M${44+i*6} 8q-2 -6 1 -10" stroke="#b8aca4" stroke-width="1.2" fill="none" opacity=".7"><animate attributeName="opacity" values="0;.8;0" dur="${2+i*.5}s" repeatCount="indefinite"/></path>`).join('')}`};
MONS['Éryndel, le Porteur Brûlé']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="44" fill="#ffd8a0" opacity=".14"/><path d="M14 100Q20 40 50 30Q80 40 86 100Z" fill="#2a2420" opacity=".35"/>
 <path d="M28 100L32 64Q50 56 68 64L72 100Z" fill="#7a3a2a" ${s}/><path d="M32 64Q22 74 20 98L30 96Z M68 64Q78 74 80 98L70 96Z" fill="#5a2a1a" ${s}/><path d="M44 64L50 80L56 64" fill="#e8c870" ${s}/>
 <ellipse cx="50" cy="44" rx="12" ry="14" fill="#f2d2b6" ${s}/><path d="M38 40Q38 26 50 26Q62 26 62 40Q56 32 50 34Q44 32 38 40Z" fill="#e8dcc0" ${s}/><path d="M39 32Q50 26 61 32" stroke="#e8c870" stroke-width="2" fill="none"/>
 <circle cx="45" cy="45" r="1.6" fill="${O}"/><circle cx="55" cy="45" r="1.6" fill="${O}"/><path d="M46 52Q50 50 54 52" stroke="${O}" stroke-width="1.3" fill="none"/>
 <g transform="translate(50 76)"><circle r="9" fill="#ffb03a" opacity=".5"><animate attributeName="r" values="7;11;7" dur="1.6s" repeatCount="indefinite"/></circle><path d="M0 -10Q6 -2 0 8Q-6 -2 0 -10Z" fill="#fff2c0"/></g>`};
MONS['Dragon de Cendre']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="44" fill="#ff6a2a" opacity=".1"/>
 <path d="M10 60Q6 30 24 20Q28 36 36 42Z M90 60Q94 30 76 20Q72 36 64 42Z" fill="#4a4440" ${s}/><path d="M14 56L24 26M86 56L76 26" stroke="#6a625a" stroke-width="1.2"/>
 <path d="M30 100Q26 66 40 52Q50 46 60 52Q74 66 70 100Z" fill="#5a524a" ${s}/>${[0,1,2,3].map(i=>`<path d="M${40+i*6} ${70+i%2*8}q3 4 6 0" stroke="#3a3430" stroke-width="1.2" fill="none"/>`).join('')}
 <path d="M36 50Q30 30 50 22Q70 30 64 50Q58 60 50 60Q42 60 36 50Z" fill="#6a625a" ${s}/><path d="M38 24L32 8L44 20Z M62 24L68 8L56 20Z" fill="#3a3430" ${s}/>
 <path d="M41 38L47 40M59 38L53 40" stroke="#ff6a1a" stroke-width="3" stroke-linecap="round"/><path d="M42 52Q50 58 58 52" stroke="${O}" stroke-width="1.6" fill="#2a2420"/>
 ${[0,1,2,3,4].map(i=>`<circle cx="${46+i*2}" cy="60" r="${2+i%2}" fill="#8a8278" opacity=".8"><animate attributeName="cy" values="60;96" dur="${1.4+i*.2}s" repeatCount="indefinite"/><animate attributeName="opacity" values=".8;0" dur="${1.4+i*.2}s" repeatCount="indefinite"/></circle>`).join('')}`};
MONS['Éryndel, le Roi de Cendre']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="46" fill="#ff6a1a" opacity=".12"/><path d="M8 100Q14 40 50 26Q86 40 92 100Z" fill="#1a1410" opacity=".6"/>
 <path d="M24 100L28 60Q50 50 72 60L76 100Z" fill="#2a2420" ${s}/><path d="M28 60Q16 72 14 100L26 98Z M72 60Q84 72 86 100L74 98Z" fill="#1a1410" ${s}/><path d="M50 60V100" stroke="#ff6a1a" stroke-width="1.6"/><path d="M38 70L50 64L62 70" stroke="#ffb21a" stroke-width="1.2" fill="none"/>
 <ellipse cx="50" cy="42" rx="12" ry="14" fill="#b8aca4" ${s}/><path d="M36 44Q34 22 50 22Q66 22 64 44Q60 30 50 30Q40 30 36 44Z" fill="#3a3430" ${s}/>
 <path d="M44 42L48 44M56 42L52 44" stroke="#ff6a1a" stroke-width="2.4" stroke-linecap="round"/><path d="M45 51Q50 49 55 51" stroke="${O}" stroke-width="1.3" fill="none"/>
 <path d="M36 26L38 10L43 20L50 6L57 20L62 10L64 26Z" fill="#1a1410" ${s}/>${[38,44,50,56,62].map((x,i)=>`<path d="M${x} ${i===2?6:i%2?18:10}q${i%2?2:-2} -8 0 -12q${i%2?-3:3} 6 0 12Z" fill="${i%2?'#ffb21a':'#ff6a1a'}"><animate attributeName="opacity" values=".5;1;.5" dur="${1+i*.2}s" repeatCount="indefinite"/></path>`).join('')}`};
/* --- fonds animés du Livre III --- */
function sgBg3(c){const cfg=SAGA[c],[a,b,d]=cfg.bg,R=rng(c*131+7),f=n=>(+n).toFixed(0),A=(at,v,du,ex='')=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite" ${ex}/>`;
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sgb${c}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="sgl${c}"><stop offset="0" stop-color="#fff6c0" stop-opacity=".8"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient><radialGradient id="sgf${c}"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".8"/><stop offset="1" stop-color="#ff8a3a" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#sgb${c})"/>`;
  const ash=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle r="${(1+R()*2.2).toFixed(1)}" fill="#c8bcb0" opacity="${(.3+R()*.5).toFixed(2)}"><animateMotion dur="${(6+R()*6).toFixed(1)}s" begin="${(-R()*8).toFixed(1)}s" repeatCount="indefinite" path="M${f(R()*400)} -20q${f(R()*80-40)} 360 ${f(R()*120-60)} 740"/></circle>`;return o};
  const embers=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle r="${(1+R()*1.8).toFixed(1)}" fill="${R()<.5?'#ffb21a':'#ff6a1a'}"><animateMotion dur="${(4+R()*4).toFixed(1)}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M${f(R()*400)} 720q${f(R()*80-40)} -380 ${f(R()*100-50)} -760"/>${A('opacity','0;1;0',(2+R()*2).toFixed(1))}</circle>`;return o};
  if(c===14){/* la Capitale au crépuscule et le Cœur fissuré */
    s+=`<circle cx="200" cy="230" r="140" fill="url(#sgl${c})">${A('r','120;150;120',4)}</circle><path d="M0 520L40 470L60 490V420L80 400L100 420V470L140 430L160 450V360L180 330L200 300L220 330L240 360V450L260 430L300 470V420L320 400L340 420V490L360 470L400 520V700H0Z" fill="#2a1022"/>`;
    s+=`<g transform="translate(200 230)"><g>${A('opacity','.85;1;.85',1.2)}<path d="M0 46C-58 8 -60 -36 -28 -48C-14 -54 -4 -46 0 -34C4 -46 14 -54 28 -48C60 -36 58 8 0 46Z" fill="#ffb8d8" stroke="#fff" stroke-width="3"/><path d="M0 -34L-8 -12L6 2L-6 22L2 44M-28 -48L-16 -26L-34 -10M28 -48L18 -20L36 -6" stroke="#ffd84a" stroke-width="3" fill="none">${A('stroke','#ffd84a;#fff;#ffd84a',.9)}</path></g><animateTransform attributeName="transform" type="scale" values="1;1.06;1;1.03;1" dur="1.4s" repeatCount="indefinite" additive="sum"/></g>`;
    for(let i=0;i<14;i++)s+=`<rect x="${f(40+R()*320)}" y="${f(430+R()*80)}" width="5" height="7" fill="#ffd84a" opacity="${(.4+R()*.6).toFixed(2)}"/>`;s+=ash(22)}
  else if(c===15){/* la bibliothèque des hiboux en ruines */
    for(let i=0;i<5;i++){const x=i*90-10;s+=`<path d="M${x} 700V${f(120+R()*80)}Q${x+40} ${f(60+R()*40)} ${x+80} ${f(120+R()*80)}V700Z" fill="#3a2a14" opacity=".9"/>`;for(let r=0;r<9;r++){s+=`<rect x="${x+8}" y="${200+r*52}" width="64" height="4" fill="#5a4220"/>`;for(let k=0;k<7;k++)s+=`<rect x="${x+10+k*9}" y="${172+r*52+R()*6}" width="7" height="${f(22+R()*6)}" fill="${['#8a3a2a','#3a5a3a','#6a4a1a','#4a3a6a','#8a6a2a'][Math.floor(R()*5)]}"/>`}}
    for(let i=0;i<3;i++)s+=`<path d="M${120+i*90} -10L${70+i*90} 700L${170+i*90} 700Z" fill="#fff6c0" opacity=".08">${A('opacity','.04;.14;.04',5+i)}</path>`;
    s+=`<path d="M0 640Q100 560 200 620T400 600V700H0Z" fill="#2a1a0a"/><path d="M-10 680Q60 600 120 650Q180 700 260 640Q320 600 410 660" stroke="#4a3a1a" stroke-width="14" fill="none"/>`;
    for(let i=0;i<9;i++)s+=`<g opacity=".8"><path d="M0 0h14v18h-14Z" fill="#f4e8c8" stroke="#8a6a3a" stroke-width=".8"/><path d="M3 5h8M3 9h8M3 13h6" stroke="#8a6a3a" stroke-width=".6"/><animateMotion dur="${(9+R()*6).toFixed(1)}s" begin="${(-R()*9).toFixed(1)}s" repeatCount="indefinite" rotate="auto" path="M${f(R()*400)} 720Q${f(R()*400)} 360 ${f(R()*400)} -40"/></g>`}
  else if(c===16){/* le désert de cendres et le soleil bloqué */
    s+=`<circle cx="200" cy="420" r="150" fill="url(#sgf${c})">${A('r','140;160;140',4)}</circle><circle cx="200" cy="430" r="70" fill="#ff5a2a"/><path d="M0 430Q100 400 200 430T400 420V700H0Z" fill="#4a3a3a"/><path d="M0 500Q120 460 260 500T400 490V700H0Z" fill="#3a2a2a"/><path d="M0 580Q150 540 300 580T400 570V700H0Z" fill="#2a1a1a"/>`;
    for(let i=0;i<4;i++){const x=50+i*100+R()*30;s+=`<g transform="translate(${f(x)} ${f(470+R()*60)})"><path d="M0 0V-70" stroke="#2a1a1a" stroke-width="3"/><path d="M0 -70L30 -62Q24 -54 30 -46L0 -40Z" fill="#6a2a1a" opacity=".85">${A('opacity','.6;.9;.6',2+i)}</path></g>`}
    s+=ash(30)+embers(10)}
  else if(c===17){/* le miroir du passé */
    s+=`<circle cx="200" cy="300" r="190" fill="url(#sgl${c})" opacity=".6"/><g transform="translate(200 300)"><ellipse rx="130" ry="180" fill="#f8f0d8" opacity=".35" stroke="#c8a860" stroke-width="10"/><ellipse rx="118" ry="168" fill="none" stroke="#8a6a3a" stroke-width="3"/>`;
    for(let i=0;i<12;i++){const q=i*30*Math.PI/180;s+=`<circle cx="${f(Math.cos(q)*136)}" cy="${f(Math.sin(q)*186)}" r="5" fill="#c8a860"/>`}
    s+=`<path d="M-40 140V-40L0 -100L40 -40V140Z" fill="#e8dcc0" opacity=".6"/><path d="M-12 -60h24v30h-24Z" fill="#fff6c0" opacity=".8">${A('opacity','.4;.9;.4',2)}</path><circle cx="0" cy="-130" r="18" fill="#fff" opacity=".7"/></g>`;
    for(let i=0;i<10;i++)s+=`<g><path d="M0 -10L8 4L-6 8Z" fill="#fff8e0" opacity=".7" stroke="#c8a860" stroke-width=".8"/><animateMotion dur="${(7+R()*5).toFixed(1)}s" begin="${(-R()*8).toFixed(1)}s" repeatCount="indefinite" rotate="auto" path="M${f(R()*400)} 720Q${f(R()*400)} 300 ${f(R()*400)} -30"/></g>`}
  else if(c===18){/* la Capitale assiégée */
    s+=`<path d="M0 0H400V260Q300 220 200 250T0 240Z" fill="#2a2420" opacity=".8">${A('opacity','.6;.9;.6',5)}</path><path d="M0 560L30 500V420L50 400L70 420V480L110 440L130 460V330L160 300L190 260L200 240L210 260L240 300L270 330V460L290 440L330 480V420L350 400L370 420V500L400 560V700H0Z" fill="#1a0a08"/>`;
    for(let i=0;i<6;i++)s+=`<path d="M${f(40+R()*320)} ${f(420+R()*100)}q${f(R()*10-5)} -40 0 -70q10 30 0 70Z" fill="#ff6a1a" opacity=".85">${A('opacity','.4;1;.4',(.8+R()).toFixed(1))}</path>`;
    s+=`<circle cx="200" cy="200" r="120" fill="url(#sgf${c})" opacity=".6"/>`+ash(34)+embers(16)}
  else{/* le trône de cendre */
    s+=`<circle cx="200" cy="230" r="170" fill="url(#sgf${c})">${A('r','160;185;160',3)}</circle>`;
    for(let i=0;i<4;i++)s+=`<ellipse cx="200" cy="250" rx="${190-i*36}" ry="${70-i*12}" fill="none" stroke="#5a4a40" stroke-width="${10-i*2}" stroke-dasharray="${30-i*4} ${14}" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="${i%2?360:0} 200 250" to="${i%2?0:360} 200 250" dur="${10+i*4}s" repeatCount="indefinite"/></ellipse>`;
    s+=`<path d="M140 520V330L160 300L180 330L200 280L220 330L240 300L260 330V520Z" fill="#1a1410" stroke="#3a2a20" stroke-width="3"/><path d="M120 520H280V560H120Z" fill="#2a2018"/>`;
    s+=`<g transform="translate(200 170)">${[0,1,2,3,4].map(i=>`<path d="M${-40+i*20} 0q${i%2?6:-6} -26 0 -44q${i%2?-8:8} 18 0 44Z" fill="${i%2?'#ffb21a':'#ff6a1a'}">${A('opacity','.5;1;.5',(1+i*.2).toFixed(1))}</path>`).join('')}<path d="M-46 0L-40 -20L-26 -6L-10 -26L0 -10L10 -26L26 -6L40 -20L46 0Z" fill="#1a1410" stroke="#ff6a1a" stroke-width="2"/></g>`;
    s+=`<path d="M0 620Q100 590 200 620T400 610V700H0Z" fill="#2a2018"/>${[...Array(6)].map((_,i)=>`<path d="M${40+i*60} 640q20 -10 40 0" stroke="#ff6a1a" stroke-width="2" fill="none">${A('opacity','.3;1;.3',(1.5+i*.3).toFixed(1))}</path>`).join('')}`+ash(26)+embers(14)}
  return s+'</svg>'}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(c>=14&&SAGA[c])return sgBg3(c);return sb.apply(this,arguments)}}
/* --- le vieux film (flash-back) --- */
{const ss=sagaShow;sagaShow=function(){const o=document.getElementById('sgov'),L=SGP.lines&&SGP.lines[SGP.i];
  if(o&&L&&!Array.isArray(L)&&L.fb!==undefined){o.classList.toggle('fbmode',!!L.fb);o.querySelectorAll('.sgl,.sgr').forEach(x=>{x.innerHTML='';delete x.dataset.w});if(L.fb&&L.t){const old=o.querySelector('.fbtitle');if(old)old.remove();o.insertAdjacentHTML('beforeend',`<div class="fbtitle"><span>${esc(L.t)}</span></div>`);setTimeout(()=>{const t=o.querySelector('.fbtitle');if(t)t.remove()},2600)}
    try{musicWant(L.fb?'menu':(SGP.ch>=19?'roi':'dungeon'))}catch(e){}SGP.i++;return sagaShow()}
  return ss.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){try{const cfg=SAGA[c];if(cfg&&cfg.fin3&&part==='outro')cfg.outro=SG().ch[c]==='brv'?cfg.outroB:cfg.outroA}catch(e){}
  const r=so.apply(this,arguments);try{const o=document.getElementById('sgov');if(o&&c>=14){o.classList.add('bk3');if(SAGA[c].fbBattle&&part==='outro')o.classList.add('fbmode')}if(c>=14)musicWant(c===19?'roi':'dungeon')}catch(e){}return r}}
/* --- combats du Livre III (calés sur le mode Normal) --- */
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(c>=14&&r&&r.foes){const cfg=SAGA[c],k=c-14,ns=Math.min(100,cfg.req+6),m=nRec(ns)/recPow(100);const g=Math.pow(GROW,99)*2.1;
   r.foes.forEach((u,i)=>{if(i===r.foes.length-1)return;u.max=Math.round(u.max*m*1.1);u.hp=u.max;u.atk=Math.round(u.atk*Math.pow(m,.85))});
   const bs=r.foes[r.foes.length-1];const f=4.6+k*.14;bs.max=Math.round(380*g*f*m*(cfg.fin3?1.2:1));bs.hp=bs.max;bs.atk=Math.round(42*g*1.45*Math.pow(m,.9));bs.def=Math.round(18*g*1.35*Math.pow(m,.8));bs.spd=106+k*2;
   bs.sk={n:['Souffle de cendre','Plumes de pierre','Lame des braises','Écho du passé','Pluie de cendres','Couronne de cendre'][k],tg:'all',fx:{dmg:122+k*5,weak:1}};if(cfg.fin3)bs.sk.fx.stun=20;
   r.sub=`Mode histoire · Livre III · chapitre ${c+1}${cfg.fin3?' · Combat final':''}`;r.maxR=cfg.fin3?32:30}}catch(e){}return r}}
{const sbt=sagaBattle;sagaBattle=function(c){const r=sbt.apply(this,arguments);try{if(SAGA[c]&&SAGA[c].fbBattle&&B)document.body.classList.add('fbbattle')}catch(e){}return r}}
{const cb=closeBattle;closeBattle=function(){document.body.classList.remove('fbbattle');return cb.apply(this,arguments)}}
/* --- déblocage : le Livre III suit le mode Normal --- */
{const su=sagaUnlocked;sagaUnlocked=function(i){if(i>=14&&SAGA[i])return(S.nmax||0)>=SAGA[i].req&&!!SG().done[i-1];return su.apply(this,arguments)}}
/* --- cinématique du combat final : la couronne s'embrase --- */
function roiCinematic(done){let o=document.getElementById('sgcine');if(o)o.remove();o=document.createElement('div');o.id='sgcine';o.className='roicine';o.setAttribute('role','dialog');o.setAttribute('aria-label','Cinématique');
  o.innerHTML=`<div class="rc-bg"></div><div class="rc-old">${(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"')}</div><div class="rc-flash"></div><div class="rc-new">${(eryBody('roi')||'').replace('<svg','<svg class="loresvg hb"')}</div><div class="rc-ash">${[...Array(24)].map((_,i)=>`<i style="--x:${(i*41)%100}%;--d:${(1.6+(i%5)*.4).toFixed(1)}s;--l:${(-(i%7)*.4).toFixed(1)}s"></i>`).join('')}</div>
   <div class="cn-title rc-title"><small>LE PREMIER PORTEUR SE RÉVEILLE</small><b>ÉRYNDEL</b><span>le Roi de Cendre</span><em>« Le Premier Porteur contre le dernier ! »</em></div>
   <button class="btn p cn-go">⚔️ Affronter le Roi de Cendre</button><button class="cn-skip">Passer ⏭</button>`;
  document.body.appendChild(o);try{const g=sfxBus(.35,6000);if(g){const t=AU.ctx.currentTime;[0,2.4,3.2].forEach(d=>{try{SND.boom(g,t+d)}catch(e){}})}}catch(e){}
  const fin=()=>{o.remove();done&&done()};o.querySelector('.cn-go').onclick=e=>{e.stopPropagation();fin()};o.querySelector('.cn-skip').onclick=e=>{e.stopPropagation();fin()}}
{const pe=sagaPartEnd;sagaPartEnd=function(){const c=SGP.ch;if(SGP.part==='intro'&&SAGA[c]&&SAGA[c].fin3&&!B){sagaClose();sagaMode(true);try{musicWant('roi')}catch(e){}roiCinematic(()=>sagaBattle(c));return}return pe.apply(this,arguments)}}
/* --- récompenses du Livre III --- */
const SAGA_RW3=[[300,2,0,0],[320,2,2,0],[340,2,0,2],[360,3,3,0],[380,3,0,3],[800,5,5,5]];
TITLES.push({k:'echos3',n:'Gardien des Échos',c:'#ffb05a',d:'Terminer le Livre III du mode histoire',ok:()=>!!SG().done[19]});
{const sr=sagaReward;sagaReward=function(c){if(c<14)return sr.apply(this,arguments);const G=SG();if(G.done[c]){render();return}G.done[c]=Date.now();const [gm,sh,tk,us]=SAGA_RW3[c-14];S.gems+=gm;S.shards+=sh;if(tk)INV().pt+=tk;if(us)S.ush=(S.ush||0)+us;save();const cfg=SAGA[c],fin=!!cfg.fin3;
  modal(`<div class="sgrw bk3"><div class="sgfrag">${fin?'🥚':BK3SYM[c-14]}</div><div class="h">${fin?'Le Premier Porteur repose en paix':'Chapitre '+(c+1)+' terminé'}</div><p class="sub">${fin?(G.ch[c]==='brv'?'Fin de la Couronne brisée : la flamme retourne au Cœur.':'Fin de la Promesse : Éryndel devient une étoile.'):'« '+esc(cfg.t)+' »'}</p>
   <div class="sgfrags bk3">${BK3SYM.map((x,i)=>`<i class="${G.done[14+i]?'on':''}">${x}</i>`).join('')}</div><div class="xrw"><div>${GEM}${gm} gemmes</div><div>${SHARD}${sh} éclats légendaires</div>${tk?`<div>${SIC.ticket}${tk} tickets d'invocation</div>`:''}${us?`<div>🌟 ${us} éclats d'ultra-évolution</div>`:''}${fin?'<div>🏷️ Titre « Gardien des Échos »</div>':''}</div>
   <button class="btn p" data-a="close" style="width:100%;margin-top:10px">${fin?'Hou hou ! Merci, Porteur 🦉':'Continuer l\'aventure'}</button></div>`);try{ttCheck()}catch(e){}render()}}
/* --- le Livre de l'Histoire : un troisième tome --- */
{const sc=sagaCard;sagaCard=function(){const G=SG();const b2=!!G.done[13];if(!b2)return sc.apply(this,arguments);
  if(UI.sgBook===undefined||UI.sgBook===null)UI.sgBook=3;
  if(UI.sgBook!==3){let h=sc.apply(this,arguments);return h.replace(/(<div class="chips sgbk">[\s\S]*?)(<\/div>)/,`$1<button class="chip ${''}" data-a="sgbook" data-v="3">🦉 Livre III</button>$2`)}
  const n=sagaNext(),nIn=n>=14&&n<20,done=[14,15,16,17,18,19].filter(i=>G.done[i]).length;
  const items=SAGA.slice(14,20).map((c,j)=>{const i=14+j,ok=!!G.done[i],un=sagaUnlocked(i);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="sgplay" data-v="${i}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${i+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Étape ${c.req} du mode Normal`}</small></button>`}).join('');
  let main;if(nIn&&sagaUnlocked(n))main=`<button class="btn p sgbig bk3b" data-a="sgplay" data-v="${n}">▶️ ${SAGA[n].ic} Chapitre ${n+1} : ${esc(SAGA[n].t)}</button>`;
  else if(nIn)main=`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Prochain chapitre à l'étape ${SAGA[n].req} du mode <b>Normal</b> (tu en es à ${S.nmax||0}).</p>`;
  else main=`<p style="margin:8px 0 0;font-size:13px">🥚 Tu as apaisé le Premier Porteur. Plume va bientôt être une grande sœur !</p>`;
  return`<div class="card sgcard bk3"><div class="chips sgbk"><button class="chip" data-a="sgbook" data-v="1">📕 Livre I</button><button class="chip mychip" data-a="sgbook" data-v="2">🃏 Livre II</button><button class="chip on" data-a="sgbook" data-v="3">🦉 Livre III</button></div>
   <div class="sghd"><div class="sgpl bk3pl">${plumeSVG('happy')}</div><div style="min-width:0;flex:1"><div class="h3" style="margin:0">🦉 Livre III · L'Écho du Premier Porteur</div><div class="muted" style="font-size:12.5px">Avec Plume, dans le présent… et dans le passé · ${done}/6 chapitres</div>
   <div class="sgfrags sm bk3">${BK3SYM.map((x,i)=>`<i class="${G.done[14+i]?'on':''}">${x}</i>`).join('')}</div></div></div>${main}
   <details class="sgdet"><summary>👥 Personnages rencontrés</summary>${loreCharsHTML()}</details><details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${items}</div></details></div>`}}
try{PATCH.unshift({v:32,d:'25 octobre 2026',t:"Livre III : l'Écho du Premier Porteur",items:["🦉 <b>Nouveau : le Livre III du mode histoire</b>, « L'Écho du Premier Porteur » : 6 chapitres (15 à 20), débloqués avec le <b>mode Normal</b> (étapes 5, 15, 30, 45, 60 et 75).","🎞️ Des <b>retours dans le passé</b>, il y a mille ans, qui s'affichent comme un vieux film animé (sépia, grain, rayures). Un chapitre entier, combat compris, se passe dans le passé !","👑 6 nouveaux boss, dont le <b>Roi de Cendre</b> avec sa cinématique, deux fins possibles, le secret de Plume… et une surprise à la fin.","🏷️ Récompenses : gemmes, éclats légendaires, tickets, <b>éclats d'ultra-évolution</b> et le titre « Gardien des Échos »."]})}catch(e){}
