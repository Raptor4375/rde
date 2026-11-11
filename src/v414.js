/* ================= V414 : CHRONIQUES DES HÉROS =================
   Une histoire en 3 chapitres pour chacun des héros arrivés après le Roi de Cendre.
   Toujours disponibles, jouables dans l'ordre qu'on veut, et elles ne finissent pas toutes bien. */
(function(){try{
if(typeof SAGA==='undefined'||typeof sagaOpen!=='function'||typeof MARN==='undefined')return;
const HC0=SAGA.length;window.HC0=HC0;
const AEG2=typeof AEG!=='undefined'?AEG:69,LYR2=typeof LYR!=='undefined'?LYR:70,SOR2=typeof SOR!=='undefined'?SOR:71,CRV2=typeof CRV!=='undefined'?CRV:72;

/* ---------- les créatures de ces histoires ---------- */
try{Object.assign(NMAP,{
 'Sonneur Muet':{base:'Chevalier Déchu',o:{to:258,sat:.22,light:.82},ov:['mask']},
 'Cloche Vivante':{base:'Golem Runique',o:{to:45,sat:.5,metal:1},ov:['gears']},
 'Enfant de Chœur':{base:'Spectre Noyé',o:{to:250,sat:.14,light:1.05},ov:['mask']},
 'Voix Volée':{base:'Spectre Noyé',o:{to:160,sat:.2,light:.95},ov:['spectral']},
 'Chœur Gris':{base:'Archange Brisé',o:{to:252,sat:.2,light:.85},ov:['mask','spectral']},
 'Acolyte du Chantre':{base:'Sorcière des Brumes',o:{to:262,sat:.3,light:.8},ov:['mask']},
 'Le Chantre aux Mille Voix':{base:'Liche',o:{to:266,sat:.42,light:.95},ov:['crown','mask','spectral']},
 "Huissier d'Acier":{base:'Chevalier Déchu',o:{to:28,sat:.12,light:.92},ov:['armor']},
 'Garde Scellé':{base:'Gargouille',o:{to:220,sat:.18,light:.9},ov:['armor']},
 'Juge de Fer':{base:'Sentinelle Céleste',o:{to:28,sat:.16,light:.84},ov:['armor','crown']},
 'Pillard de Varne':{base:'Cerbère',o:{to:18,sat:.5,light:.85},ov:['flame']},
 'Bélier de Varne':{base:'Troll des Neiges',o:{to:20,sat:.45,light:.85},ov:['armor']},
 'Lancier Soldre':{base:'Chevalier Déchu',o:{to:355,sat:.6,light:.85},ov:['flame']},
 'Commandant Soldre':{base:'Chevalier Déchu',o:{to:0,sat:.95,light:.8},ov:['crown','armor','flame']},
 'Automate Chantant':{base:'Golem Runique',o:{to:200,sat:.5,metal:1},ov:['gears']},
 'Public Figé':{base:'Spectre Noyé',o:{to:212,sat:.1,light:1.08},ov:['mask']},
 'Boîte à Musique':{base:'Golem Runique',o:{to:322,sat:.62},ov:['gears','crown']},
 'Crieur de Foire':{base:'Diablotin',o:{to:300,sat:.7},ov:['mask']},
 "Orvel le Marchand d'Airs":{base:'Sorcière des Brumes',o:{to:292,sat:.55},ov:['mask','runes']},
 'Tuyau Hurleur':{base:'Golem Runique',o:{to:285,sat:.45},ov:['runes']},
 'Le Grand Orgue':{base:'Sentinelle Céleste',o:{to:286,sat:.5},ov:['gears','runes','aura']},
 'Braise Menteuse':{base:'Diablotin',o:{to:22,sat:.85},ov:['flame']},
 'Corbeau de Guet':{base:'Harpie des Cimes',o:{to:210,sat:.2,light:.72},ov:['spectral']},
 'Rôdeur du Faux-Feu':{base:'Rôdeur du Vide',o:{to:26,sat:.7},ov:['flame','eye3']},
 'Chien de la Tour':{base:'Cerbère',o:{to:208,sat:.22,light:.82},ov:['frost']},
 'Ombre de Halvar':{base:'Spectre Noyé',o:{to:202,sat:.18,light:.88},ov:['spectral']},
 'Halvar, le Guetteur Menteur':{base:'Chevalier Déchu',o:{to:202,sat:.28,light:.95},ov:['mask','frost']},
 'Rature Vivante':{base:'Ombre Vorace',o:{to:258,sat:.32,light:.5},ov:['runes']},
 'Page Déchirée':{base:'Spectre Noyé',o:{to:42,sat:.16,light:1.12},ov:['runes']},
 'Marge Noire':{base:'Horreur Rampante',o:{to:258,sat:.36,light:.5},ov:['runes','eye3']},
 'Index Aveugle':{base:'Gargouille',o:{to:42,sat:.2,light:.95},ov:['mask']},
 'Bibliothécaire sans Yeux':{base:'Liche',o:{to:42,sat:.22,light:.98},ov:['mask','runes']},
 "L'Encre qui Réclame":{base:'Seigneur du Néant',o:{to:265,sat:.48,light:.62},ov:['runes','spectral','aura']}
})}catch(e){console.warn('hchr mons',e)}

/* ---------- les chroniques ---------- */
const HCH=[
{id:'marn',hero:MARN,ic:'🤐',n:'Le Silence de Marn',col:'#9fe8c8',gift:()=>MARN,
 tag:"Un enfant a vendu sa voix pour sauver sa sœur. Il revient chercher la monnaie.",
 ttl:{k:'sansvoix',n:'Sans-Voix',d:"Terminer la chronique « Le Silence de Marn »"},
 ch:[
 {t:'Les cloches sans battant',ic:'🔔',place:'Val-des-Cloches',bg:['#d8dce8','#6a6a8a','#14121f'],mus:'dungeon',rw:120,
  mins:[['Sonneur Muet',258],['Cloche Vivante',45]],boss:{n:'Chœur Gris',h:252},bsk:{n:'Note tenue',fx:{dmg:95,stun:20}},
  intro:[['narr',"Val-des-Cloches est un village construit autour d'un clocher. Quarante maisons, deux cents habitants, et dix-sept cloches."],
   ['plume',"Hou… Porteur. Il y a quelque chose qui ne va pas. Tu entends ?"],
   ['narr',"Non. C'est exactement le problème. Les cloches se balancent. Elles bougent, elles oscillent dans le vent — et elles ne font aucun bruit."],
   ['plume',"On leur a enlevé le battant. À toutes. Même la grosse, là-haut."],
   ['narr',"Sur la place, les villageois s'arrêtent de travailler pour regarder passer les étrangers. Personne ne dit bonjour. Personne ne dit rien."],
   [62,"Ils ouvrent la bouche. Regarde celle-là, près du puits. Elle parle. Il n'en sort rien."],
   ['plume',"Ils n'ont plus de voix ! Tous !"],
   ['narr',"Une main se pose sur l'épaule de Plume. Un homme grand et maigre, manteau sombre, écharpe rouge, un cadenas minuscule accroché à la sangle de cuir qui lui barre la bouche."],
   ['marn',"…"],
   ['plume',"AAAH ! Hou-hou — pardon. Bonjour ? Vous… vous habitez ici ?"],
   ['narr',"L'homme secoue la tête. Il montre le clocher, puis fait un geste : trois doigts, puis un poing fermé. Trois jours. Puis plus rien."],
   [62,"Il dit qu'on a trois jours avant que ce village devienne définitivement muet."],
   ['plume',"Comment tu sais ça, toi ?"],
   [62,"Parce que moi aussi, on m'a appris à parler sans faire de bruit."],
   ['narr',"Au pied du clocher, des silhouettes en robe grise forment un demi-cercle. Elles chantent. Et le chant, lui, s'entend très bien."],
   {ch:[["🔔 Monter au clocher avant qu'ils finissent",'brv',"Si leur chant monte des cloches, on coupe la source."],["💗 Évacuer les villageois d'abord",'cmp',"Les habitants d'abord. On ne combat pas au milieu des gens."]]},
   ['marn',"…"],
   ['plume',"Il a hoché la tête. Je crois que ça veut dire « bon choix »."]],
  outro:[['narr',"Le Chœur Gris se défait comme une nappe de brouillard. Dans le clocher, dix-sept battants sont alignés sur une table, bien rangés, chacun avec une étiquette."],
   ['plume',"Il y a des noms dessus. Des noms de gens du village…"],
   ['narr',"L'homme à l'écharpe rouge prend une étiquette, la lit, et la repose doucement. Puis il sort un carnet et écrit une seule ligne, qu'il tend à Plume."],
   ['plume',"« Je m'appelle Marn. Ils ne volent pas les cloches. Ils volent ce qui fait du bruit dedans. »"],
   [62,"Et toi, Marn ? Qu'est-ce qu'on t'a pris ?"],
   ['narr',"Marn remet le carnet dans sa poche sans répondre. Dehors, très loin vers le nord, une cloche sonne. Une seule. Elle, elle a encore son battant."]]},
 {t:'Ce qu’il a vendu',ic:'⚖️',place:'Abbaye des Cloches',bg:['#2a2440','#4a4068','#0e0c18'],mus:'dungeon',rw:130,
  mins:[['Enfant de Chœur',250],['Voix Volée',160]],boss:{n:'Acolyte du Chantre',h:262},bsk:{n:'Prends ma place',fx:{dmg:105,weak:1}},
  intro:[['narr',"L'Abbaye des Cloches est posée sur un éperon de roche, au bout d'un escalier de mille marches. On y monte en silence. De toute façon, on n'a pas le choix : plus on approche, moins les mots sortent."],
   ['marn',"…"],
   ['plume',"Il a écrit : « Ne parlez pas en haut. Ce qu'on dit, Il le garde. »"],
   {fb:1,t:'Il y a dix-neuf ans…'},
   ['narr',"Un garçon de neuf ans monte le même escalier. Il porte sa petite sœur sur le dos parce qu'elle ne peut plus marcher. Elle tousse, et chaque toux fait un bruit mouillé."],
   ['narr',"En haut, un homme très grand l'attend, assis devant un orgue. Il a mille petites bouches cousues sur son manteau, et chacune chuchote un mot différent."],
   ['narr',"« Tu veux qu'elle vive », dit l'homme. Ce n'est pas une question. « Je peux faire ça. Les miracles coûtent. Qu'est-ce que tu as ? »"],
   ['narr',"Le garçon vide ses poches. Trois noisettes, un bouton, une bille bleue. L'homme sourit avec toutes ses bouches à la fois."],
   ['narr',"« Donne-moi ta voix. Tu es jeune : la tienne durera longtemps. »"],
   ['narr',"Le garçon a dit oui. C'est la dernière chose qu'il a dite."],
   {fb:0},
   ['plume',"…Marn. C'était toi."],
   ['marn',"…"],
   ['narr',"Dans la nef, des silhouettes d'enfants en robe blanche se tournent vers nous. Ils n'ont pas de visage : juste une bouche, ouverte, qui chante une note parfaite."],
   [70,"Cette note… c'est une note humaine. Ils chantent avec des voix qui ne leur appartiennent pas."],
   {ch:[["🎶 Chanter plus fort qu'eux",'brv',"S'ils volent des voix, on leur en donne une qu'ils ne peuvent pas tenir."],["🤫 Avancer sans un bruit jusqu'à l'autel",'cmp',"On ne joue pas à leur jeu. On va droit à celui qui les commande."]]},
   ['marn',"…"]],
  outro:[['narr',"L'acolyte tombe. Sous sa robe, il n'y a rien : juste de l'air, et une étiquette au nom d'un garçon mort il y a quarante ans."],
   ['plume',"Marn… ta sœur. Elle a guéri, hein ? Il a tenu parole ?"],
   ['narr',"Marn ouvre son carnet. La page est déjà écrite, depuis longtemps, à l'encre pâlie."],
   ['plume',"« Nille. Guérie en trois jours. Morte dix-neuf ans plus tard, l'hiver dernier. Elle n'a jamais su pourquoi je ne lui parlais pas. »"],
   [62,"…"],
   ['plume',"Oh. Oh, Marn."],
   ['narr',"Au fond de l'abbaye, une porte en bronze s'ouvre toute seule. Derrière, quelqu'un joue de l'orgue avec mille voix à la fois."]]},
 {t:'Point final',ic:'🤐',place:'Le Grand Chœur',bg:['#1a1626','#3a3458','#08070d'],mus:'dungeon',rw:160,
  mins:[['Voix Volée',160],['Chœur Gris',252]],boss:{n:'Le Chantre aux Mille Voix',h:266},bsk:{n:'Mille bouches',fx:{dmg:118,drain:30}},
  intro:[['narr',"Le Grand Chœur est une salle ronde sans fenêtre. Au centre, l'orgue. Sur l'orgue, l'homme aux mille bouches. Il n'a pas vieilli d'un jour."],
   ['narr',"« Marn », disent toutes ses bouches en même temps, avec mille timbres différents. « Mon meilleur achat. Tu as grandi. »"],
   ['marn',"…"],
   ['narr',"« Tu viens la reprendre ? Je te la rends. Tiens. » Il détache une bouche de son manteau et la tend, comme on tend une pièce."],
   ['narr',"« Il suffit que tu me donnes autre chose à la place. N'importe qui dans cette pièce fera l'affaire. Choisis. »"],
   ['plume',"Hou ! Ne l'écoute pas, Marn !"],
   [62,"C'est ce qu'il a fait à tout un village. À une abbaye entière. Il ne s'arrêtera pas."],
   ['narr',"Marn regarde la petite bouche cousue au creux de la main du Chantre. Sa voix. Celle qui aurait dit « bonjour » à sa sœur pendant dix-neuf ans."],
   ['narr',"Il écrit quelque chose sur son carnet, arrache la page, et la pose sur l'orgue. Puis il dégaine."],
   ['plume',"Il a écrit… « Garde-la. Moi je garde ça. » Et il a dessiné un point. Juste un point."],
   {ch:[["⚔️ Frapper avec Marn, maintenant",'brv',"Il a attendu dix-neuf ans. Pas une seconde de plus."],["🛡️ Couvrir Marn pendant qu'il avance",'cmp',"C'est son combat. Nous, on écarte tout ce qui se met entre eux."]]},
   ['narr',"Les mille bouches se mettent à hurler ensemble. Pour la première fois depuis dix-neuf ans, Marn sourit — on le voit à ses yeux."]],
  outro:[['narr',"Le Chantre tombe à genoux. Les bouches de son manteau se taisent une par une, et chaque fois qu'il s'en tait une, très loin, quelqu'un se réveille en criant son propre nom."],
   ['narr',"« Rends-la-moi », chuchote la dernière bouche. « Rends-moi le silence. Je ne sais pas vivre dedans. »"],
   ['narr',"Marn s'accroupit devant lui. Il ouvre son carnet à la page de sa sœur, la lui montre longuement, et referme le carnet."],
   ['narr',"Puis il pose un doigt sur ses propres lèvres."],
   ['plume',"…Chut."],
   ['narr',"Le Grand Chœur devient silencieux pour de bon. Dans tout le royaume, ce soir-là, dix-sept cloches retrouvent leur battant et deux cents personnes retrouvent leur voix."],
   ['narr',"Une seule ne revient pas. Marn remet son écharpe en place, range son carnet, et nous fait signe que la route continue."],
   ['plume',"Tu aurais pu la reprendre. Tu le sais, ça ?"],
   ['marn',"…"],
   ['plume',"« Je l'ai vendue pour elle. Elle est morte. La vendre deux fois, ça l'effacerait. » … Hou. D'accord, Marn. D'accord."]]}]},

{id:'aegis',hero:AEG2,ic:'🛡️',n:'Le Mur qui Reste',col:'#8ac8ff',gift:()=>(typeof PRN!=='undefined'?PRN:null),
 tag:"La guerre est finie. On dissout la Garde d'Éther. Aegis n'a pas reçu l'ordre à temps.",
 ttl:{k:'murreste',n:'Le Mur qui Reste',d:'Terminer la chronique « Le Mur qui Reste »'},
 ch:[
 {t:"L'ordre de dissolution",ic:'📜',place:"Capitale d'Éther",bg:['#dfe8ff','#5a78b8','#141a2e'],mus:'dungeon',rw:120,
  mins:[["Huissier d'Acier",28],['Garde Scellé',220]],boss:{n:'Juge de Fer',h:28},bsk:{n:'Sentence',fx:{dmg:100,weak:1}},
  intro:[['narr',"La guerre du Roi de Cendre est finie depuis six mois. On a reconstruit, on a fait des discours, et on a commencé à compter ce que tout ça avait coûté."],
   ['narr',"Ce matin, un huissier est monté sur les marches de la caserne avec un parchemin scellé de rouge."],
   [69,"Lisez fort. Mes hommes ont le droit d'entendre."],
   ['narr',"« Par décret : la Garde d'Éther, corps d'exception levé pour une menace d'exception, est dissoute. Les serments sont levés. Les boucliers seront rendus à l'arsenal avant la fin du mois. »"],
   ['plume',"Hou… Ils ne peuvent pas faire ça. Ce sont eux qui ont tenu le mur !"],
   [71,"Si. Ils peuvent. Un corps d'exception coûte cher, et il n'y a plus d'exception."],
   [69,"…Rendez vos boucliers. C'est un ordre. Le dernier."],
   ['narr',"Les chevaliers sortent en file. L'un d'eux, un gamin de dix-sept ans, pose son bouclier et reste planté là, parce qu'il n'a jamais rien fait d'autre de sa vie."],
   [69,"Toi. Comment tu t'appelles ?"],
   ['narr',"« Perrin, commandant. »"],
   [69,"Perrin. Ce n'est pas le bouclier qui tenait le mur. Rentre chez toi."],
   ['narr',"L'huissier tousse. « Commandant, votre bouclier aussi. »"],
   ['narr',"Et les gardes scellés, derrière lui, posent la main sur leurs armes."],
   {ch:[["🛡️ Refuser et tenir la cour",'brv',"On ne désarme pas un homme devant ses soldats."],["💗 Rendre le bouclier sans un mot",'cmp',"Pas de sang sur les marches. Aegis vaut mieux que ça."]]},
   [69,"Quoi qu'il arrive aujourd'hui : personne ne frappe le premier."]],
  outro:[['narr',"Le Juge de Fer s'écroule dans un bruit de ferraille. Sous son armure, il n'y avait personne depuis longtemps : juste un ordre qui continuait à marcher."],
   [69,"Voilà pourquoi j'ai demandé qu'on lise le décret à voix haute. Quelqu'un l'a écrit. Mais ce n'est pas la Capitale."],
   [71,"Le sceau est faux. Un rouge trop clair. Je l'ai vu dès le début."],
   [69,"Et tu n'as rien dit ?"],
   [71,"Je voulais savoir qui viendrait ramasser les boucliers."],
   ['narr',"Au nord, sur la route de Varne, une colonne de fumée monte. La Garde est dissoute depuis une heure, et quelqu'un a déjà commencé à brûler des villages."]]},
 {t:'Le pont de Varne',ic:'🌉',place:'Pont de Varne',bg:['#3a2a28','#8a5a3a','#140e10'],mus:'dungeon',rw:135,
  mins:[['Pillard de Varne',18],['Lancier Soldre',355]],boss:{n:'Bélier de Varne',h:20},bsk:{n:'Charge',fx:{dmg:125}},
  intro:[['narr',"Varne est de l'autre côté de la rivière. Un seul pont, en pierre, assez large pour trois hommes de front. Sur le pont, deux cents villageois qui traversent avec ce qu'ils ont pu porter."],
   ['narr',"Derrière eux, la colonne de Soldre avance au pas, sans se presser, comme on marche vers un travail qu'on a déjà fait cent fois."],
   [69,"Combien de temps pour que tout le monde passe ?"],
   [71,"Une heure. Peut-être cinquante minutes si les vieux ne tombent pas."],
   [69,"Alors je tiens une heure."],
   ['plume',"Tout seul ?! Hou — non, pas tout seul, on est là ! Mais quand même !"],
   [70,"Aegis. Tu n'as plus de serment. Plus de corps. Plus d'ordre. Tu n'es obligé à rien."],
   [69,"C'est exactement pour ça que ça compte."],
   ['narr',"Il plante son bouclier au milieu du pont, fait un pas en avant, et attend. De l'autre côté, un homme énorme avec un bélier d'assaut sur l'épaule éclate de rire."],
   {ch:[["🛡️ Tenir la ligne avec Aegis",'cmp',"Trois de front, pas plus. On ne recule pas d'un pas."],["⚔️ Charger avant qu'ils s'organisent",'brv',"Un bélier, ça s'arrête avant de prendre de la vitesse."]]},
   [69,"Soixante minutes. Comptez-les à voix haute, ça m'aide."]],
  outro:[['narr',"Le bélier finit dans la rivière. Quand le dernier villageois atteint l'autre rive, Aegis a quatre flèches dans le bouclier et il n'a pas bougé d'une dalle."],
   [69,"Combien ?"],
   [71,"Cinquante-trois minutes. Tu as gagné sept minutes sur ton propre délai."],
   [69,"Je rouille."],
   ['narr',"Mais sur la route, derrière la colonne brisée, une deuxième colonne arrive. Puis une troisième. Et devant elles, à cheval, un homme en armure rouge lève la main pour les arrêter."],
   ['narr',"« Commandant Aegis ! » crie-t-il. « Je suis venu discuter du pont ! »"]]},
 {t:'Le bouclier brisé',ic:'💔',place:'Pont de Varne',bg:['#2a1416','#7a2a2a','#0e0810'],mus:'dungeon',rw:170,
  mins:[['Lancier Soldre',355],['Pillard de Varne',18]],boss:{n:'Commandant Soldre',h:0},bsk:{n:'Ordre de brûler',fx:{dmg:122,dot:40}},
  intro:[['narr',"L'homme en armure rouge s'appelle Soldre. Il a servi dans la Garde d'Éther. C'est lui qui a écrit le faux décret."],
   ['narr',"« Tu as tenu le mur pendant que la Capitale discutait du budget », dit-il. « Et ils t'ont renvoyé chez toi. Moi je te propose une armée. »"],
   [69,"Pour faire quoi ?"],
   ['narr',"« Pour qu'on ne nous dissolve plus jamais. »"],
   [69,"Et les villages derrière toi ?"],
   ['narr',"« Des exemples. On ne tient pas un royaume sans exemples. Tu le sais. »"],
   [69,"…Non. Je ne le savais pas."],
   ['plume',"Hou. Il y a encore des gens sur l'autre rive, Aegis. Si cette armée passe le pont…"],
   [71,"Elle ne doit pas passer le pont."],
   [69,"Sorën. Le pont est en pierre d'Éther, non ?"],
   [71,"…Oui. Comme ton bouclier. Aegis, non."],
   [69,"Combien de temps pour évacuer la rive ?"],
   [70,"Dix minutes. Aegis, regarde-moi. Dix minutes, et on trouve une autre idée."],
   [69,"Je n'en ai pas d'autre."],
   {ch:[["💗 Le supplier de trouver autre chose",'cmp',"Il doit exister un autre moyen. Il en existe toujours un."],["⚔️ Ouvrir le chemin jusqu'à Soldre",'brv',"S'il doit le faire, qu'il le fasse debout, pas sous une pluie de lances."]]},
   [69,"Merci. Pour tout. Maintenant, laissez-moi passer devant."]],
  outro:[['narr',"Soldre tombe au milieu du pont. Aegis lui retire son casque et lui ferme les yeux, parce qu'on fait ça même pour ceux-là."],
   ['narr',"Puis il se relève, lève son bouclier au-dessus de sa tête, et frappe la pierre d'Éther de toutes ses forces."],
   ['narr',"Le bouclier se fend. Le pont aussi. La pierre d'Éther ne se brise qu'avec de la pierre d'Éther : c'est écrit dans tous les manuels, à la page que personne ne lit jamais."],
   ['narr',"Le pont de Varne tombe dans la rivière avec trois cents hommes dessus. Aegis reste sur la rive, deux moitiés de bouclier dans les mains."],
   [70,"Aegis… ton bouclier."],
   [69,"Ce n'était pas le bouclier qui tenait le mur."],
   ['narr',"On ne lui a jamais rendu son titre. On n'a jamais reconstruit le pont non plus. À Varne, on l'appelle encore « le gué du Commandant », et les enfants y jettent des pièces."]]}]},

{id:'lyra',hero:LYR2,ic:'🎶',n:'La Chanson Volée',col:'#ffd0e8',
 tag:"Quelqu'un a mis sa chanson dans une boîte et l'a vendue. Les gens qui l'écoutent ne pleurent plus.",
 ttl:{k:'chanvol',n:'La Chanson Volée',d:'Terminer la chronique « La Chanson Volée »'},
 ch:[
 {t:'La boîte qui chante',ic:'🎼',place:'Marché de Vaupré',bg:['#f0dcea','#b07ac0','#1a1020'],mus:'dungeon',rw:120,
  mins:[['Automate Chantant',200],['Public Figé',212]],boss:{n:'Boîte à Musique',h:322},bsk:{n:'Refrain forcé',fx:{dmg:95,stun:22}},
  intro:[['narr',"Au marché de Vaupré, tout le monde est calme. Trop calme. Les marchands sourient en vendant à perte, les enfants ne courent pas, et un homme vient de se faire voler sa bourse en disant « ce n'est pas grave »."],
   ['plume',"Hou. Ça, c'est joyeux ou c'est horrible ? Je n'arrive pas à décider."],
   [70,"Écoutez."],
   ['narr',"Au centre de la place, sur un présentoir de velours, une petite boîte en laiton tourne sur elle-même et joue une mélodie. Trois notes qui montent, deux qui redescendent."],
   [70,"…C'est la mienne. C'est le Chant de l'Aube."],
   ['narr',"Sauf que ce n'est pas tout à fait ça. Il manque quelque chose au milieu : la respiration. La vraie chanson a un trou dedans, un endroit où on reprend son souffle et où on a le droit d'avoir mal. Là, le trou a été rebouché."],
   [70,"Ma chanson sert à se relever après avoir pleuré. Celle-ci sert à ne plus jamais pleurer. Ce n'est pas la même."],
   ['plume',"Et ça marche ?"],
   ['narr',"Au bout de la place, une femme regarde brûler sa propre maison. Elle sourit. Elle fredonne."],
   [70,"…Cassez-moi cette boîte."],
   {ch:[["🎶 Chanter la vraie version par-dessus",'cmp',"On ne casse rien. On remet la respiration dedans."],["⚔️ Détruire la boîte tout de suite",'brv',"Chaque minute qu'elle joue, quelqu'un arrête de ressentir."]]},
   ['narr',"Les automates du présentoir se redressent d'un coup, et la place entière se tourne vers nous, en souriant."]],
  outro:[['narr',"La boîte éclate. Sur la place, deux cents personnes clignent des yeux en même temps — puis la femme devant sa maison en cendres se met à hurler, enfin."],
   ['plume',"C'est… c'est bien, ça ? Elle a l'air de souffrir."],
   [70,"Oui. C'est bien."],
   ['narr',"Dans les débris de laiton, un petit cylindre gravé porte une marque de fabrique : un O entouré de portées musicales, et une adresse."],
   [70,"« Orvel, Airs & Curiosités. Fournisseur des maisons calmes. » Les maisons calmes ?"],
   ['plume',"Hou… Il y en a combien, des boîtes comme celle-là, dehors ?"]]},
 {t:"L'homme qui la vend",ic:'💰',place:'Comptoir Orvel',bg:['#2a1a2e','#7a4a7a','#120a16'],mus:'dungeon',rw:135,
  mins:[['Crieur de Foire',300],['Automate Chantant',200]],boss:{n:"Orvel le Marchand d'Airs",h:292},bsk:{n:'Prix du silence',fx:{dmg:108,drain:25}},
  intro:[['narr',"Le comptoir d'Orvel occupe trois étages. Au rez-de-chaussée, les boîtes à musique. Au premier, les cylindres. Au deuxième, des cages."],
   ['plume',"Il y a des gens dans les cages."],
   ['narr',"« Des chanteurs », corrige une voix douce. Orvel descend l'escalier, petit, rond, souriant, un carnet de commandes sous le bras. « Ils sont nourris. Ils sont payés. Demandez-leur. »"],
   ['narr',"Les chanteurs ne disent rien. Ils ont tous la même expression polie et vide."],
   [70,"Où est-ce que vous avez pris ma chanson ?"],
   ['narr',"« À Val-Rouge. Vous l'avez chantée sur la place, un soir de deuil. Quarante personnes qui pleuraient, et vous les avez remises debout. J'étais au fond. J'ai pleuré aussi. »"],
   ['narr',"« Et en rentrant chez moi, j'ai pensé : quel gâchis. Tant d'émotion pour quarante personnes. »"],
   [70,"Ce n'est pas un gâchis. C'est le but."],
   ['narr',"« Le but, madame, c'est que les gens aillent bien. J'ai enlevé la partie qui fait mal. Les clients préfèrent. »"],
   [62,"Et les quatre-vingts personnes dans les cages ?"],
   ['narr',"« Elles préfèrent aussi. Je leur ai demandé après, pas avant. »"],
   {ch:[["🔓 Ouvrir les cages d'abord",'cmp',"Les chanteurs d'abord. Orvel ne va nulle part."],["⚔️ Attraper Orvel avant qu'il fuie",'brv',"Si on le perd, il rouvre boutique ailleurs demain."]]},
   [70,"Orvel. Vous allez m'écouter chanter la vraie, maintenant. En entier."]],
  outro:[['narr',"Orvel finit assis par terre au milieu de ses cylindres brisés. Pour la première fois depuis des années, il pleure, et il a l'air surpris de savoir encore faire ça."],
   ['narr',"« Vous ne comprenez pas », répète-t-il. « Elles sont déjà vendues. Deux mille. Partout. »"],
   [70,"Deux mille ?"],
   ['narr',"« Et le Grand Orgue de la Chambre Calme les joue toutes à la fois. Vous ne pouvez pas casser deux mille boîtes, madame. »"],
   [71,"Non. Mais on peut casser l'orgue."],
   ['narr',"« Vous ne comprenez toujours pas. L'orgue ne joue pas ma version. Il joue la vôtre. Celle que vous lui avez apprise quand vous avez chanté à Val-Rouge. Il l'a retenue mieux que moi. »"]]},
 {t:'Taire sa propre chanson',ic:'🤍',place:'La Chambre Calme',bg:['#1e1a2a','#5a4a7a','#0a0810'],mus:'dungeon',rw:170,
  mins:[['Tuyau Hurleur',285],['Public Figé',212]],boss:{n:'Le Grand Orgue',h:286},bsk:{n:'Deux mille voix',fx:{dmg:112,weak:1,drain:20}},
  intro:[['narr',"La Chambre Calme est une salle sans angle, couverte de tuyaux de cuivre qui montent jusqu'au plafond et redescendent. Au milieu, un clavier que personne ne touche."],
   ['narr',"L'orgue joue tout seul. Trois notes qui montent, deux qui redescendent. En boucle. Depuis six mois."],
   ['plume',"Hou… Lyra ? Pourquoi tu t'arrêtes ?"],
   [70,"Parce que je la reconnais. Vraiment, cette fois. Ce n'est pas la version d'Orvel. C'est la mienne. Note pour note. Avec la respiration."],
   [62,"Alors pourquoi est-ce que les gens d'ici sont comme ça ?"],
   ['narr',"Dans la salle, une centaine de personnes sont assises et écoutent, les mains sur les genoux. Elles n'ont pas l'air malheureuses. Elles n'ont pas l'air de rien."],
   [70,"Parce qu'une chanson qui console, si on l'écoute deux mille fois sans jamais s'arrêter… ce n'est plus une consolation. C'est un oreiller sur le visage."],
   ['plume',"Alors on casse l'orgue !"],
   [70,"L'orgue la connaît par cœur. Si je casse les tuyaux, deux mille boîtes la jouent encore dehors. Il faut qu'elle s'arrête partout en même temps."],
   [71,"Comment on arrête une chanson partout en même temps ?"],
   [70,"…En arrêtant de la connaître. Elles la tiennent de moi. Si je l'oublie à la source, elles l'oublient aussi."],
   ['plume',"Tu veux dire — pour toujours ? Tu ne pourras plus jamais la chanter ?"],
   [70,"Plus jamais."],
   {ch:[["💗 Lui dire qu'il y a sûrement une autre solution",'cmp',"Cette chanson, c'est elle. On ne lui demande pas ça."],["🎶 Chanter avec elle jusqu'au bout",'brv',"Si elle doit la perdre, qu'elle ne la perde pas toute seule."]]},
   [70,"Tenez les tuyaux pendant que je joue. Ça va être long, et je ne dois pas m'interrompre."]],
  outro:[['narr',"Lyra joue le Chant de l'Aube en entier, lentement, pour la dernière fois. Et à chaque mesure, elle enlève une note — pas de la salle : d'elle."],
   ['narr',"Le Grand Orgue la suit, parce qu'il ne sait faire que ça. Quand elle arrive à la dernière note, il n'y a plus rien à suivre."],
   ['narr',"Les deux mille boîtes à musique du royaume s'arrêtent à la même seconde. Dans la Chambre Calme, cent personnes se réveillent en sursaut, et la moitié se met à pleurer."],
   [70,"…Bien. C'est bien."],
   ['plume',"Lyra ? Tu te souviens de comment ça commençait ?"],
   [70,"Non. Je me souviens de ce que ça faisait aux gens. C'est l'essentiel."],
   ['narr',"Elle a écrit d'autres chansons depuis. Elles sont très belles. Aucune ne ressemble à celle-là, et elle en est soulagée."]]}]},

{id:'soren',hero:SOR2,ic:'🏹',n:'Le Feu qui Ment',col:'#ffb86a',
 tag:"Un feu d'alarme s'allume au nord. Il n'y a aucun ennemi. Sorën sait qui l'a allumé.",
 ttl:{k:'deuxfl',n:'Deux Flèches',d:'Terminer la chronique « Le Feu qui Ment »'},
 ch:[
 {t:'Le signal',ic:'🔥',place:'Plaine du Nord',bg:['#2a1e14','#c87a3a','#120c0a'],mus:'dungeon',rw:120,
  mins:[['Braise Menteuse',22],['Corbeau de Guet',210]],boss:{n:'Rôdeur du Faux-Feu',h:26},bsk:{n:'Fausse alerte',fx:{dmg:98,weak:1}},
  intro:[['narr',"À onze heures du soir, le feu d'alarme de la Tour du Nord s'est allumé. Ça veut dire : une armée arrive, venez tous, vite."],
   [71,"Ce n'est pas le bon feu."],
   ['plume',"Comment ça, pas le bon ? C'est du feu !"],
   [71,"Il y a trois feux à la Tour du Nord. Un feu haut pour une armée. Un feu bas pour une bête. Et un feu double pour « je suis blessé, venez me chercher ». Là, c'est le feu haut. Mais il est trop orange."],
   [71,"Le feu haut se fait avec du pin résineux. Il brûle blanc. Celui-là, c'est du bois de grange. Quelqu'un a allumé un feu d'alarme avec ce qu'il avait sous la main."],
   [69,"Donc soit c'est une urgence réelle et le guetteur n'avait plus de pin…"],
   [71,"…soit ce n'est pas un guetteur qui l'a allumé."],
   ['narr',"La Garde est en route. Deux cents cavaliers lancés vers le nord en pleine nuit, sur la foi d'un feu."],
   ['plume',"Hou. Et s'il n'y a rien là-bas ?"],
   [71,"Alors la route derrière eux est vide. Et c'est là qu'il y a quelque chose."],
   ['narr',"Dans la plaine, entre nous et la tour, des braises se lèvent du sol et prennent forme. Elles ne brûlent pas l'herbe."],
   {ch:[["🔭 Suivre la piste des braises jusqu'à la source",'cmp',"Ces feux mènent quelque part. On remonte."],["⚔️ Les éteindre avant qu'elles préviennent quelqu'un",'brv',"Si ça parle, ça nous a déjà vus."]]},
   [71,"Visez les yeux. Ce sont des guetteurs, eux aussi."]],
  outro:[['narr',"Le dernier rôdeur s'éteint dans un sifflement. Sorën s'accroupit, ramasse une poignée de cendre, la sent, et la laisse couler."],
   [71,"Bois de grange. Et de la poix de la Tour du Nord. C'est notre poix. Nos réserves."],
   [69,"Quelqu'un de la tour, alors."],
   [71,"Il n'y a qu'un homme à la Tour du Nord cette saison. Il s'appelle Halvar. Il m'a appris à reconnaître les trois feux."]]},
 {t:'La tour vide',ic:'🗼',place:'Tour du Nord',bg:['#1a2438','#4a6a9a','#0a0e18'],mus:'dungeon',rw:135,
  mins:[['Corbeau de Guet',210],['Ombre de Halvar',202]],boss:{n:'Chien de la Tour',h:208},bsk:{n:'Morsure du froid',fx:{dmg:112,dot:35}},
  intro:[['narr',"La Tour du Nord est vide. Le feu brûle encore en haut, mais il n'y a personne pour l'alimenter."],
   ['narr',"Dans la salle du guetteur, tout est en ordre : le lit fait, la soupe encore tiède, le registre ouvert à la bonne page."],
   [71,"Il a écrit toutes les nuits pendant trois ans. « Rien à signaler. Rien à signaler. Rien à signaler. » Regardez la dernière ligne."],
   ['plume',"« Je suis désolé, petit. »"],
   [71,"…Il savait que ce serait moi qui lirais."],
   ['narr',"Sous le registre, une bourse. Lourde. Des pièces de la Capitale, neuves, jamais circulées."],
   [69,"Combien ?"],
   [71,"De quoi vivre vingt ans. Ou de quoi payer un médecin très cher pendant deux."],
   ['plume',"Hou… Tu crois que quelqu'un dans sa famille est malade ?"],
   [71,"Sa fille. Elle a huit ans. Elle tousse depuis l'hiver dernier."],
   ['narr',"En bas, le grand chien de la tour gratte la porte. Il connaît Sorën depuis qu'il est chiot. Il grogne quand même."],
   [71,"On lui a dit de garder la porte. Il garde la porte."],
   {ch:[["💗 Essayer de le calmer sans le blesser",'cmp',"Ce n'est pas lui le coupable. Il obéit."],["⚔️ Passer en force, le temps presse",'brv',"Deux cents cavaliers sont sur la route. Chaque minute compte."]]},
   [71,"Pardon, le gros. Vraiment."]],
  outro:[['narr',"Le chien s'effondre contre la porte. Sorën reste accroupi à côté un moment, la main sur son flanc, jusqu'à ce que ça s'arrête."],
   [69,"Sorën."],
   [71,"Je sais. Je viens."],
   ['narr',"Du haut de la tour, on voit toute la plaine. La colonne de la Garde file vers le nord, deux cents torches en ligne."],
   ['narr',"Et à l'est, dans le défilé de Cerne, par où elle doit passer dans une heure : trois mille torches qui attendent, rangées, immobiles."],
   [71,"…Voilà pourquoi il a allumé le feu."]]},
 {t:'Deux flèches',ic:'🏹',place:'Défilé de Cerne',bg:['#201a24','#6a5a7a','#0c0a10'],mus:'dungeon',rw:170,
  mins:[['Ombre de Halvar',202],['Braise Menteuse',22]],boss:{n:'Halvar, le Guetteur Menteur',h:202},bsk:{n:'Je suis désolé',fx:{dmg:120,stun:18}},
  intro:[['narr',"Halvar est assis sur un rocher au-dessus du défilé, avec un cor dans les mains. Un seul coup, et trois mille hommes tombent sur la Garde d'Éther."],
   ['narr',"Il n'a pas l'air surpris de nous voir."],
   ['narr',"« Tu as vu que le feu était faux », dit-il. « Bien sûr que tu as vu. C'est moi qui t'ai appris. »"],
   [71,"Halvar. Pose le cor."],
   ['narr',"« Je le pose, et ils tuent Mira ce soir. Tu veux que je te montre la lettre ? Je l'ai gardée. »"],
   [71,"Montre-la-moi."],
   ['narr',"Il la sort. C'est une vraie lettre, avec un vrai sceau, et une vraie mèche de cheveux d'enfant dedans."],
   [69,"Il y a deux cents hommes dans ce défilé dans dix minutes."],
   ['narr',"« Et il y a une petite fille de huit ans à Vaupré. Fais le calcul, commandant. Tu l'as déjà fait, je le vois sur ta figure. »"],
   [71,"Halvar. Je peux partir pour Vaupré ce soir. Je monte mieux que personne. Je peux la sortir de là avant demain matin."],
   ['narr',"« Tu peux. Tu peux vraiment. Mais tu ne peux pas me le promettre. »"],
   [71,"Non. Je ne peux pas te le promettre."],
   ['narr',"Halvar hoche la tête, très lentement, comme un homme qui vient d'entendre la seule réponse honnête de sa vie. Puis il lève le cor vers sa bouche."],
   {ch:[["🏹 Tirer",'brv',"Il n'y a plus de temps. Il n'y en a jamais eu."],["🛡️ Se jeter sur lui pour l'en empêcher",'cmp',"Pas une flèche. Pas lui. On l'attrape."]]},
   [71,"…"]],
  outro:[['narr',"Sorën tire deux flèches. La première brise le cor. La seconde est pour l'homme qui le tenait, parce qu'il a continué à souffler dedans même brisé."],
   ['narr',"Dans le défilé, la Garde passe sans rien remarquer. Deux cents cavaliers, deux cents torches, et personne ne saura jamais."],
   [69,"Sorën. Vaupré."],
   [71,"Je pars maintenant."],
   ['narr',"Il est arrivé à Vaupré à l'aube. Mira était vivante : personne n'était venu. La lettre était un bluff. Les cheveux venaient d'une poupée."],
   ['narr',"Sorën a ramené la petite chez sa tante, et il a payé le médecin avec la bourse trouvée dans la tour. Elle va mieux, maintenant. Elle demande souvent quand son père rentre."],
   ['plume',"Qu'est-ce que tu lui as dit ?"],
   [71,"Qu'il a allumé le bon feu, à la fin. Ce n'est pas tout à fait faux."]]}]},

{id:'corvin',hero:CRV2,ic:'📄',n:'Ce qui reste écrit',col:'#f0e6c8',
 tag:"Corvin n'existe dans aucun livre. Il a trouvé un endroit où il pourrait s'écrire. Il y a un prix.",
 ttl:{k:'souvient',n:'Celui qui se souvient',d:'Terminer la chronique « Ce qui reste écrit »'},
 ch:[
 {t:'Le nom manquant',ic:'🕳️',place:'Archives du Royaume',bg:['#e8e0cc','#8a7a5a','#16120c'],mus:'dungeon',rw:120,
  mins:[['Page Déchirée',42],['Rature Vivante',258]],boss:{n:'Marge Noire',h:258},bsk:{n:'Trait tiré',fx:{dmg:100,weak:1}},
  intro:[['narr',"Les Archives du Royaume conservent tout : les naissances, les dettes, les guerres, et les recettes de soupe des cuisines royales depuis quatre cents ans."],
   [72,"Tout sauf moi. J'ai vérifié trois fois. Il n'y a pas de trou à ma place. Il n'y a pas de place du tout."],
   ['plume',"Hou… mais moi je me souviens de toi. Et le Porteur aussi."],
   [72,"Vous deux. Et c'est tout. Et le jour où vous arrêterez, je n'aurai jamais existé."],
   ['narr',"Corvin ouvre le registre des naissances de son année. Les noms défilent. Entre « Corbeaux, Martin » et « Corvisart, Jeanne », il n'y a rien. Pas une ligne vide : les deux noms se touchent."],
   [72,"Le papier s'est refermé."],
   ['narr',"Au bout de la travée, quelque chose bouge entre les étagères : une bande d'encre noire, longue comme un bras, qui glisse le long des dos de livres en effaçant les titres au passage."],
   ['plume',"Elle mange les mots !"],
   [72,"Non. Elle fait de la place. C'est pire."],
   {ch:[["📖 Protéger les registres",'cmp',"Ces noms sont tout ce qui reste de milliers de gens."],["⚔️ Détruire les ratures",'brv',"Tant qu'elles bougent, elles effacent. On les arrête."]]},
   [72,"Merci. Pour l'avoir dit à voix haute. Ça compte plus que vous croyez."]],
  outro:[['narr',"La Marge Noire se replie sur elle-même et sèche d'un coup, comme une flaque d'encre au soleil."],
   ['narr',"Là où elle s'est tenue, le bois de l'étagère porte une inscription gravée que personne n'a jamais remarquée : une flèche vers le bas, et un mot. « Dessous. »"],
   [72,"Il y a un sous-sol dans les Archives ?"],
   ['plume',"Il n'y a pas de sous-sol dans les Archives. Je le sais, j'ai fait le plan moi-même."],
   [72,"Alors c'est exactement là qu'il faut aller."]]},
 {t:'La bibliothèque des oubliés',ic:'📚',place:'Sous les Archives',bg:['#161222','#4a3a6a','#08060e'],mus:'dungeon',rw:135,
  mins:[['Index Aveugle',42],['Page Déchirée',42]],boss:{n:'Bibliothécaire sans Yeux',h:42},bsk:{n:'Catalogage',fx:{dmg:110,stun:20}},
  intro:[['narr',"Sous les Archives, il y a une deuxième bibliothèque. Elle est plus grande que celle du dessus. Tous les livres y sont blancs."],
   [72,"Ils ne sont pas vides. Ils sont pleins. Regarde à contre-jour."],
   ['narr',"Il a raison : chaque page porte des lignes, mais l'encre est de la même couleur que le papier. Ce sont des vies entières, écrites en blanc sur blanc."],
   ['plume',"Qui est-ce qui range tout ça ?"],
   ['narr',"Une femme très droite, en robe de bibliothécaire, avance dans l'allée avec un chariot. Elle n'a pas d'yeux — juste deux bandes de papier collées sur le visage."],
   ['narr',"« Un retour ? » demande-t-elle poliment. « Ou un dépôt ? »"],
   [72,"Je cherche mon livre."],
   ['narr',"« Tout le monde cherche son livre. Nom ? »"],
   [72,"Corvin."],
   ['narr',"« Je n'ai pas de Corvin. » Un temps. « Mais j'ai une place pour un Corvin. Rayon quatre, troisième étagère, entre deux reliures qui se touchent. »"],
   ['narr',"« Il suffit d'écarter. Pour faire une place, on en prend une. C'est le règlement. »"],
   [72,"…Et le livre qui est à côté ?"],
   ['narr',"« Il recule d'une place. Et celui du bout tombe. »"],
   {ch:[["📄 Demander qui est le livre du bout",'cmp',"Avant tout : savoir qui on sacrifierait."],["⚔️ Refuser le marché tout de suite",'brv',"On n'écarte personne. Point."]]},
   [72,"Je veux voir le livre du bout. Maintenant."]],
  outro:[['narr',"La Bibliothécaire se défait en rubans de papier, et le chariot roule tout seul jusqu'au bout de l'allée avant de s'arrêter."],
   ['narr',"Le livre du bout est petit, et plus abîmé que les autres. Corvin le prend. À contre-jour, on arrive à lire la première ligne."],
   [72,"« Nille, neuf ans. Elle a une sœur. Elle n'a pas de voix. » …Non. Attendez. Ce n'est pas la bonne."],
   ['narr',"Il en prend un autre. Puis un autre. Ils sont tous comme ça : des gens que quelqu'un a payés pour qu'on les oublie."],
   [72,"Cette bibliothèque n'est pas un dépôt. C'est une liste de reçus."],
   ['plume',"Hou. Et il y a quelqu'un en bas de la liste, non ? Quelqu'un qui encaisse ?"]]},
 {t:'La ligne de trop',ic:'✒️',place:'Le Fond de l’Encrier',bg:['#0e0c18','#3a2a5a','#060509'],mus:'dungeon',rw:170,
  mins:[['Rature Vivante',258],['Index Aveugle',42]],boss:{n:"L'Encre qui Réclame",h:265},bsk:{n:'Dernière ligne',fx:{dmg:118,drain:28}},
  intro:[['narr',"Au bout du sous-sol, il y a une salle ronde et un encrier posé par terre. Il fait trois mètres de haut."],
   ['narr',"Ce qui en sort n'a pas de forme fixe. Ça parle avec la voix de tous les gens qu'il a effacés, en même temps, et ça les imite très bien."],
   ['narr',"« Corvin », dit l'encre, et c'est la voix de sa mère — qu'il n'a jamais entendue, mais il la reconnaît quand même. « J'ai gardé ta page. Elle est intacte. »"],
   [72,"Montre."],
   ['narr',"Une page blanche monte à la surface de l'encrier. Elle porte un nom, une date, une ville, et le début d'une vie. C'est la sienne."],
   ['narr',"« Signe en bas. Tu seras né. Les gens se souviendront de toi sans effort. Tu auras une tombe un jour, avec ton nom dessus. »"],
   [72,"Et qui s'efface ?"],
   ['narr',"« Une petite fille de Val-des-Cloches, morte l'hiver dernier. Personne ne la cherche. Sa sœur ne peut même pas dire son nom à voix haute. »"],
   [72,"…Nille."],
   ['plume',"Corvin. Corvin, regarde-moi."],
   [72,"Je sais ce que tu vas dire."],
   ['plume',"Non, tu ne sais pas. J'allais dire : si tu signes, je continuerai quand même à t'aimer. Je voulais juste que tu le saches avant de choisir."],
   {ch:[["🤍 Lui dire que nous, on se souviendra",'cmp',"Tu n'as pas besoin d'un livre. Tu as nous."],["⚔️ Renverser l'encrier",'brv',"Personne ne signe. On casse le comptoir."]]},
   [72,"Garde la page. Moi, je garde Nille."]],
  outro:[['narr',"L'Encre se répand sur le sol de la salle ronde et ne remonte pas. En séchant, elle laisse des milliers de mots lisibles, enfin : des noms, des âges, des villes."],
   ['narr',"Les livres blancs de la bibliothèque du dessous redeviennent noirs un par un, comme des fenêtres qui s'allument."],
   ['plume',"Hou ! Corvin ! Ils reviennent ! Tous !"],
   [72,"Pas tous."],
   ['narr',"Son étagère, rayon quatre, troisième rangée, est restée exactement comme elle était : deux reliures qui se touchent."],
   [72,"C'est très bien comme ça."],
   ['narr',"Quelques jours plus tard, à Val-des-Cloches, un homme muet a trouvé sur sa table un petit livre abîmé, avec le nom de sa sœur écrit en toutes lettres sur la première page."],
   ['narr',"Il ne saura jamais qui l'a posé là. C'est aussi très bien comme ça."]]}]}];

/* ---------- enregistrement ---------- */
const dc=L=>L.map(x=>Array.isArray(x)?x.slice():Object.assign({},x,x.ch?{ch:x.ch.map(c=>c.slice())}:{}));
const FLAT=[];
const reg=(C,ci)=>C.ch.forEach((c,ki)=>{FLAT.push([ci,ki]);
  SAGA.push({t:c.t,ic:c.ic,req:1,ashc:1,hchr:1,mus:c.mus,bg:c.bg,place:c.place,boss:{n:c.boss.n,h:c.boss.h,st:50},intro:dc(c.intro),outro:dc(c.outro)})});
HCH.forEach(reg);
const NT=()=>FLAT.length;
const HS=()=>{if(!S.hchr||typeof S.hchr!=='object')S.hchr={};const H=S.hchr;if(!H.d||typeof H.d!=='object')H.d={};if(!H.l||typeof H.l!=='object')H.l={};return H};
const kk=(ci,ki)=>ci+'_'+ki;
const hDone=(ci,ki)=>!!HS().d[kk(ci,ki)];
const hUn=(ci,ki)=>hDone(ci,ki)||ki===0||hDone(ci,ki-1);
const hCount=ci=>HCH[ci].ch.filter((_,k)=>hDone(ci,k)).length;
const hNext=ci=>{for(let k=0;k<HCH[ci].ch.length;k++)if(!hDone(ci,k))return k;return-1};
const hFin=ci=>hNext(ci)<0;
const inH=c=>c>=HC0&&c<HC0+FLAT.length;
const FI=c=>FLAT[c-HC0];
{const su=sagaUnlocked;sagaUnlocked=function(i){if(inH(i)){const f=FI(i);return hUn(f[0],f[1])}return su.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){if(!inH(c))return so.apply(this,arguments);const f=FI(c),C=HCH[f[0]],src=C.ch[f[1]],cfg=SAGA[c];
  cfg.intro=dc(src.intro);cfg.outro=dc(src.outro);const r=so.apply(this,arguments);
  try{const o=document.getElementById('sgov');if(o){o.classList.remove('bk3');o.classList.add('hccr');const chip=o.querySelector('.sgchip');
    if(chip){chip.setAttribute('data-noi18n','');chip.textContent=`${src.ic} ${C.n} ${f[1]+1}/${C.ch.length} · ${typeof trS==='function'?trS(src.t):src.t}`}}
   musicWant(src.mus)}catch(e){}return r}}

/* décor de chapitre */
function hBg(c){const f=FI(c),C=HCH[f[0]],ch=C.ch[f[1]],[a,b,d]=ch.bg;const q='hb'+f[0]+f[1];
 const star=(x,y,r,o)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" opacity="${o}"/>`;
 let deco='';for(let i=0;i<26;i++){const x=(i*73+f[1]*41)%320,y=(i*47+f[0]*29)%120;deco+=star(x,y,.6+(i%3)*.5,.1+(i%4)*.09)}
 const sil=[...Array(9)].map((_,i)=>{const x=i*40-10,h=40+((i*37+f[0]*13)%60);return`<path d="M${x} 180L${x} ${180-h}L${x+18} ${180-h-14}L${x+36} ${180-h}L${x+36} 180Z" fill="${d}" opacity=".9"/>`}).join('');
 return`<svg viewBox="0 0 320 180" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs><linearGradient id="${q}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".6" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient></defs><rect width="320" height="180" fill="url(#${q})"/>${deco}${sil}<rect width="320" height="180" fill="${d}" opacity=".18"/></svg>`}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(inH(c))try{return hBg(c)}catch(e){}return sb.apply(this,arguments)}}

/* ---------- les ennemis ---------- */
const HK=[{f:.96,bh:1,ba:1},{f:.99,bh:1.05,ba:1.02},{f:1.02,bh:1.12,ba:1.05}];
function hFoes(ci,ki){const C=HCH[ci].ch[ki];
 const ids=teamIdsFor('pve').filter(i=>HEROES[i]&&(S.heroes[i]||(window.PICK&&PICK.on&&PICK.trial[i])));
 const P=Math.max(1150,(window.pkPow||idsPower)(ids)),K=HK[ki];
 const L=HS().l[kk(ci,ki)]||0,fb=.86+.14*Math.min(1,Math.max(0,(Math.log10(P)-4)/.477)),dda=Math.max(.55,Math.pow(.9,L));
 const e=Math.max(0,Math.log(P*fb*K.f*dda/1150)/Math.log(GROW)),g=Math.pow(GROW,e)*(1+1.1*e/99),hm=.85,am=1.06;
 const port=(nm,h,b)=>NMAP[nm]&&typeof nmonArt==='function'?nmonArt(nm,h,b):monArt(nm,h,b);
 const mins=[0,1,2,3].map(i=>{const x=C.mins[i%2];return foeUnit(i,{name:x[0],max:Math.round(380*g*hm*(.95+i*.08)),atk:Math.round(41*g*am),def:Math.round(18*g),spd:93+i*7,port:port(x[0],x[1],false),
   sk:i%2?{n:'Frappe',tg:'one',fx:{dmg:165}}:{n:'Déferlante',tg:'all',fx:{dmg:78}}})});
 const b=foeUnit(9,{name:C.boss.n,boss:1,max:Math.round(380*g*4.4*hm*K.bh),atk:Math.round(42*g*1.55*am*K.ba),def:Math.round(18*g*1.4),spd:104+ki*3,port:port(C.boss.n,C.boss.h,true),sk:{n:C.bsk.n,tg:'all',fx:C.bsk.fx}});
 return[...mins,b]}
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);
  try{if(inH(c)&&r){const [ci,ki]=FI(c),C=HCH[ci];r.foes=hFoes(ci,ki);r.title=`${C.ch[ki].ic} ${C.ch[ki].t}`;r.sub=`${C.n} · chapitre ${ki+1}/${C.ch.length}`;r.maxR=30;r.wc=C.ch[ki].boss.h}}catch(e){console.warn('chroniques héros',e)}return r}}
{const ef=evFinish;evFinish=function(dmg,rw){const on=SGX.active,c=SGX.ch;const r=ef.apply(this,arguments);
  try{if(on&&inH(c)&&r!=='Victoire !'){const [ci,ki]=FI(c),H=HS();H.l[kk(ci,ki)]=(H.l[kk(ci,ki)]||0)+1;save();
    rw.push("📖 Tu connais mieux cette page, maintenant : le prochain essai sera un peu plus facile.")}}catch(e){}return r}}

/* ---------- récompenses ---------- */
const BAN=(ci,i)=>`<div class="acsteps hcsteps">${HCH[ci].ch.map((c,k)=>`<i class="${hDone(ci,k)?'on':''}${k===i?' cur':''}">${hDone(ci,k)?'✓':c.ic}</i>`).join('')}</div>`;
{const sr=sagaReward;sagaReward=function(c){if(!inH(c))return sr.apply(this,arguments);
  const [ci,ki]=FI(c),C=HCH[ci],H=HS();if(H.d[kk(ci,ki)]){render();return}H.d[kk(ci,ki)]=Date.now();
  const gm=C.ch[ki].rw;S.gems+=gm;const fin=ki===C.ch.length-1;let got=null,fr=false;
  let gi=null;try{gi=typeof C.gift==='function'?C.gift():(C.gift!=null?C.gift:null)}catch(e){}
  if(fin){if(gi!=null&&HEROES[gi]&&!S.heroes[gi]){S.heroes[gi]={l:1,e:0,f:0};got=gi;try{news(Date.now(),`${S.name||'Voyageur'} a été rejoint par ${HEROES[gi].n}.`)}catch(e){}}
    else if(S.heroes[C.hero]){S.heroes[C.hero].f=(S.heroes[C.hero].f||0)+15;fr=true}
    try{news(Date.now(),`${S.name||'Voyageur'} a terminé la chronique « ${C.n} ».`)}catch(e){}}
  save();try{ttCheck()}catch(e){}
  const rw=`<div class="xrw"><div>${GEM}${gm} gemmes</div>${fin?(got!=null?`<div>✨ ${esc(HEROES[got].n)} rejoint ton équipe</div>`:fr?`<div>${C.ic} 15 fragments de ${esc(HEROES[C.hero].n.split(' ')[0].replace(',',''))}</div>`:'')+`<div>🏷️ Titre « ${esc(C.ttl.n)} »</div>`:''}</div>`;
  if(fin){const fig=heroBody(HEROES[got!=null?got:C.hero],0);
    modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="urev hcrev" style="--uc:${C.col}"><div class="big hcbig">${fig}</div><div class="h">${got!=null?'NOUVEAU HÉROS !':'CHRONIQUE TERMINÉE'}</div><div style="font-weight:900">${C.ic} ${esc(C.n)}</div><p class="muted" style="font-size:13px;margin:0 8px">${esc(C.end||'')}</p>${rw}<button class="btn p" data-a="close" style="width:100%">Continuer</button></div>`)}
  else{const nx=hNext(ci);
    modal(`<div class="sgrw acrw"><div class="sgfrag">${C.ch[ki].ic}</div><div class="h">Chapitre ${ki+1} terminé</div><p class="sub">« ${esc(C.ch[ki].t)} »</p>${BAN(ci,ki)}${rw}<p class="muted" style="font-size:12.5px;margin:8px 0 0">▶️ Chapitre ${nx+1} : « ${esc(C.ch[nx].t)} »</p><button class="btn p" data-a="close" style="width:100%;margin-top:10px">Continuer</button></div>`)}
  render()}}
HCH[0].end="« Il a vendu sa voix une fois. Il ne la vendra pas deux. »";
HCH[1].end="« Ce n'était pas le bouclier qui tenait le mur. »";
HCH[2].end="« Elle a oublié sa plus belle chanson pour que deux mille personnes puissent pleurer de nouveau. »";
HCH[3].end="« Il a allumé le bon feu, à la fin. Ce n'est pas tout à fait faux. »";
HCH[4].end="« Deux reliures qui se touchent. C'est très bien comme ça. »";
const addTtl=(C,ci)=>{try{TITLES.push({k:C.ttl.k,n:C.ttl.n,c:C.col,d:C.ttl.d,ok:()=>hFin(ci)})}catch(e){}};
HCH.forEach(addTtl);
try{window.RDEaddChron=function(cfg){if(!cfg||!cfg.ch||!cfg.ch.length)return-1;const ci=HCH.length;HCH.push(cfg);reg(cfg,ci);addTtl(cfg,ci);return ci}}catch(e){}

/* ---------- l'écran des chroniques ---------- */
function hcRow(ci){const C=HCH[ci],n=hCount(ci),N=C.ch.length,fin=n>=N;
 return`<button class="hcrow${fin?' done':''}" data-a="hcopen" data-v="${ci}" style="--hc:${C.col}"><span class="hcic">${C.ic}</span><span class="hctx"><b>${esc(C.n)}</b><small>${fin?'Terminée · relire':`${n}/${N} chapitres`} · ${esc(HEROES[C.hero]?HEROES[C.hero].n:'')}</small></span><span class="acbg">${fin?'✓':'›'}</span></button>`}
function hcPic(){try{if(window.RDEstill&&typeof marnPortrait==='function'){const u=RDEstill('marnp0',()=>marnPortrait(0));if(u)return`<img src="${u}" alt="" draggable="false">`}}catch(e){}
 return typeof marnPortrait==='function'?marnPortrait(0):''}
function hcCard(){const tot=HCH.reduce((a,C,ci)=>a+hCount(ci),0);
 return`<div class="card acard hccard"><div class="acrow"><button class="acpt hcpt" data-a="hero" data-v="${MARN}" aria-label="Marn">${hcPic()}</button><div style="min-width:0;flex:1"><span class="tag" style="--rc:#9fe8c8">CHRONIQUES DES HÉROS · ${tot}/${NT()}</span><div class="h3" style="margin:4px 0 2px">📖 Chroniques des Héros</div>
  <p class="muted" style="font-size:12.5px;margin:0">Une histoire en 3 chapitres pour chacun des héros arrivés après le Roi de Cendre. Toujours ouvertes, dans l'ordre que tu veux. <b>Marn le Sans-Voix</b> rejoint ton équipe à la fin de la sienne.</p></div></div>
  <div class="hclist">${HCH.map((_,ci)=>hcRow(ci)).join('')}</div></div>`}
window.hcCard=hcCard;
function hcOpen(ci){const C=HCH[ci],N=C.ch.length,n=hCount(ci);
 const list=C.ch.map((c,k)=>{const ok=hDone(ci,k),un=hUn(ci,k);
   return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="hcplay" data-v="${ci}_${k}" ${un?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${k+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':'Termine le chapitre précédent'}</small></button>`}).join('');
 const nx=hNext(ci);
 const main=nx<0?`<div class="acgot">${C.ic} Chronique terminée. <button class="btn sm" data-a="hero" data-v="${C.hero}">Voir ${esc((HEROES[C.hero]||{}).n||'')}</button></div>`
   :`<button class="btn pro acgo" data-a="hcplay" data-v="${ci}_${nx}">▶️ ${C.ch[nx].ic} Chapitre ${nx+1} : ${esc(C.ch[nx].t)}</button>`;
 modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="hcmod" style="--hc:${C.col}">
  <div class="h3" style="margin:0 0 2px">${C.ic} ${esc(C.n)}</div><p class="muted" style="font-size:12.5px;margin:0 0 8px">${esc(C.tag)}</p>
  ${BAN(ci,-1)}${main}<div class="sglist" style="margin-top:10px">${list}</div>
  <p class="muted" style="font-size:12px;margin:10px 0 0">Récompense finale : ${(()=>{try{const g=typeof C.gift==='function'?C.gift():C.gift;if(g!=null&&HEROES[g])return`<b>${esc(HEROES[g].n)}</b> rejoint ton équipe (ou 15 fragments si tu l'as déjà)`}catch(e){}return"<b>15 fragments</b> du héros (si tu l'as déjà)"})()} et le titre « ${esc(C.ttl.n)} ».</p></div>`)}
document.addEventListener('click',e=>{const o=e.target.closest('[data-a="hcopen"]');
 if(o){e.preventDefault();e.stopImmediatePropagation();hcOpen(+o.dataset.v);return}
 const b=e.target.closest('[data-a="hcplay"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
 const [ci,ki]=b.dataset.v.split('_').map(Number);if(!hUn(ci,ki))return;try{closeModal()}catch(er){}
 const idx=HC0+HCH.slice(0,ci).reduce((a,C)=>a+C.ch.length,0)+ki;sagaOpen(idx,'intro')},true);
{const sc=sagaCard;sagaCard=function(){const h=sc.apply(this,arguments);try{return hcCard()+h}catch(e){}return h}}

const st=document.createElement('style');st.textContent=`
.hccard .acpt{width:66px;height:66px}
.hcpt img,.hcpt svg{width:100%;height:100%;display:block;border-radius:12px}
.hclist{display:flex;flex-direction:column;gap:6px;margin-top:10px}
.hcrow{display:flex;align-items:center;gap:10px;width:100%;text-align:left;cursor:pointer;color:var(--fg);padding:9px 11px;border-radius:14px;
 background:linear-gradient(135deg,color-mix(in srgb,var(--hc) 20%,transparent),transparent 72%),var(--panel);border:1px solid color-mix(in srgb,var(--hc) 46%,transparent)}
.hcrow.done{opacity:.72}.hcrow .hcic{font-size:22px;flex:none;width:30px;text-align:center}
.hcrow .hctx{display:flex;flex-direction:column;min-width:0;flex:1}.hcrow .hctx b{font-size:14px}.hcrow .hctx small{opacity:.78;font-size:11.5px}
.hcsteps i{border-color:color-mix(in srgb,var(--hc,#9fe8c8) 50%,transparent)}
.hcmod{display:flex;flex-direction:column}
.hcrev .hcbig{height:190px;display:flex;align-items:center;justify-content:center}
.marnann svg{height:170px;width:auto;display:block;margin:0 auto}
.hcrev .hcbig svg{height:100%;width:auto;filter:drop-shadow(0 6px 18px rgba(0,0,0,.5))}`;document.head.appendChild(st);

try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(!L.some(a=>a.k==='hchr'))L.unshift({k:'hchr',ac:'#9fe8c8',tag:'NOUVEAU',t:'Chroniques des Héros 📖',
  x:"Chaque héros arrivé après le Roi de Cendre a maintenant <b>sa propre histoire en 3 chapitres</b>, dans l'onglet Aventure : Aegis, Lyra, Sorën, Corvin… et un nouveau venu.<br><br><b>Marn le Sans-Voix</b>, Assassin légendaire, a vendu sa voix quand il avait neuf ans. Son ultime <b>« Point Final »</b> coupe la parole à tous les ennemis : plus aucun ultime pendant 2 tours. Termine sa chronique et il rejoint ton équipe.<br><br>⚠️ Elles ne finissent pas toutes bien.",
  art:()=>`<div class="skann marnann">${typeof marnBody==='function'?marnBody(0):''}</div>`,go:'📖 Ouvrir les chroniques',fn:()=>{TAB='adv';try{scrollTo(0,0)}catch(e){}}})}catch(e){}return L}}catch(e){}
try{PATCH.unshift({v:'v52',d:Date.now(),t:'Marn le Sans-Voix et les Chroniques des Héros',items:[
 "🤐 <b>Marn le Sans-Voix</b>, Assassin légendaire. Son ultime « Point Final » frappe tous les ennemis et les <b>réduit au silence 2 tours</b> : leur énergie est bloquée, aucun ultime ne part. Passif : chacune de ses attaques normales vole 10 énergie.",
 "📖 <b>Chroniques des Héros</b> : une histoire en 3 chapitres pour Marn, Aegis, Lyra, Sorën et Corvin, toujours disponibles dans l'onglet Aventure. Gemmes à chaque chapitre, fragments et titre à la fin.",
 "🏷️ 5 nouveaux titres : Sans-Voix, Le Mur qui Reste, La Chanson Volée, Deux Flèches, Celui qui se souvient.",
 "🎬 Les ultimes de Corvin et de Marn ont enfin leur vraie animation (elles passaient à côté)."]})}catch(e){}
}catch(e){console.warn('chroniques des héros',e)}})();
