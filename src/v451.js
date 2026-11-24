
/* ================= LIVRE V : « La Plume Grise » =================
   6 chapitres (27 à 32), après le Livre IV, débloqués avec le mode Difficile (étapes 1, 4, 8, 12, 16 et 20).
   Lumen chante tous les soirs la berceuse de Corvin, avec les mêmes fausses notes : les bébés hiboux ne peuvent pas être effacés,
   elle se souvient de lui. La plume grise du nid ouvre une porte vers les Marges, là où va tout ce que le monde oublie.
   Corvin y est, à moitié effacé, et Mitranne, la Reine des Mites, le mange page après page. Elle veut la lumière de Lumen.
   La première chanson de Lumen (dont une seule note avait été chantée) réécrit la page de Corvin. Mitranne est vaincue pour de bon,
   brûlée par la lumière qu'elle attendait depuis mille ans. Deux fins : tout le royaume se souvient de Corvin, ou seulement Plume, Lumen et le Porteur.
   La progression est rangée à part (S.sg5). */
(function(){try{
if(typeof SAGA==='undefined'||typeof sagaOpen!=='function')return;
const L50=SAGA.length;window.L50=L50;
const EN={};const tr=(fr,en)=>{if(en)EN[fr]=en;return fr};
const L=(who,fr,en)=>[who,tr(fr,en)];
const CH=o=>({ch:o.map(([a,t,b,ae,be])=>[tr(a,ae),t,tr(b,be)])});
const FB=(fr,en)=>({fb:1,t:tr(fr,en)});
Object.assign(SAGA_WHO,{corvinf:{n:tr('Le hibou effacé','The erased owl'),c:'#d6d0e4'},corvin5:{n:'Corvin',c:'#e8e2f4'},corvinp:{n:tr('Le petit Corvin','Little Corvin'),c:'#c8c2d4'},
  plumeb:{n:tr('Bébé Plume','Baby Plume'),c:'#b8a4ff'},gardm:{n:tr('Le Gardien des Marges','The Margin Keeper'),c:'#efe6d0'},mitranne:{n:tr('Mitranne, la Reine des Mites','Mitranne, Queen of the Moths'),c:'#d8c8ff'}});
try{Object.assign(NMAP,{
  [tr('Mite du Silence','Moth of Silence')]:{base:"Mite d'Oubli",o:{to:262,sat:.45,light:.55},ov:['spectral']},
  [tr('Souvenir Fané','Faded Memory')]:{base:'Feu Follet',o:{to:38,sat:.3,light:1.2},ov:['spectral']},
  [tr('Ver des Reliures','Binding Worm')]:{base:'Ver des Sables',o:{to:36,sat:.42,light:1.12},ov:['runes']},
  [tr('Le Gardien des Marges','The Margin Keeper')]:{base:'Sentinelle Céleste',o:{to:40,sat:.18,light:1.12},ov:['runes']},
  [tr('Fileuse de Silence','Silence Spinner')]:{base:'Araignée Stellaire',o:{to:265,sat:.28,light:.82},ov:['spectral']}})}catch(e){}
tr("Mite d'Oubli",'Oblivion Moth');tr('Essaim de Mites','Moth Swarm');tr("Cocon d'Oubli",'Cocoon of Oblivion');

/* ---------- les chapitres (français + anglais) ---------- */
const L5=[
 {t:tr('La plume grise','The Grey Feather'),ic:'🪶',req:1,place:tr('Bibliothèque des Hiboux','Owl Library'),bg:['#e8dcc8','#6a5a4a','#140e0a'],mus:'marges',
  mins:["Mite d'Oubli","Mite d'Oubli"],boss:'Ver des Reliures',bh:40,bsk:tr('Grignotage','Nibbling'),
  intro:[L('narr',"Un mois a passé depuis la Dernière Page. Dans la Bibliothèque des Hiboux, la vie a repris : Lumen apprend à voler, Plume range les livres, et le soir, tout le monde écoute Lumen chanter.","A month has passed since the Last Page. In the Owl Library, life has gone back to normal: Lumen is learning to fly, Plume tidies the books, and in the evening, everyone listens to Lumen sing."),
   L('plume',"Elle chante toujours aussi faux, hein ? Mais je l'adore. Chaque soir, la même chanson. Je ne sais même pas où elle l'a apprise.","She still sings just as off-key, huh? But I love it. Every evening, the same song. I don't even know where she learned it."),
   L('lumen',"Hou hou… houuu… hou !","Hoo hoo… hooo… hoo!"),
   L('narr',"Toi, tu le sais. C'est la berceuse que chantait Corvin. Exactement la même. Avec les mêmes fausses notes.","You know. It's the lullaby Corvin used to sing. Exactly the same. With the same wrong notes."),
   L('narr',"Les bébés hiboux ne peuvent pas être effacés : ils ne sont pas encore écrits dans le Livre. Lumen était née quand Corvin a donné sa page. Elle, elle se souvient de lui.","Baby owls can't be erased: they aren't written in the Book yet. Lumen had hatched when Corvin gave his page. She remembers him."),
   L('plume',"Porteur ? Tu fais encore cette tête. La tête de quelqu'un qui se souvient d'une chose que personne d'autre ne connaît.","Bearer? You're making that face again. The face of someone who remembers something nobody else knows."),
   CH([["💗 Lui parler de Corvin",'cmp',"Plume… Tu avais un grand frère. Il s'appelait Corvin. Il chantait exactement comme ça.","💗 Tell her about Corvin","Plume… You had a big brother. His name was Corvin. He sang exactly like that."],
       ["🪶 Lui montrer la plume grise",'brv',"Tu vois cette plume grise, dans le nid ? Elle appartient à quelqu'un. Quelqu'un d'important.","🪶 Show her the grey feather","See that grey feather in the nest? It belongs to someone. Someone important."]]),
   L('plume',"Un frère ? Moi ? … Corvin.","A brother? Me? … Corvin."),
   L('narr',"Plume répète le nom tout bas, comme on goûte un mot dans une langue étrangère. Puis elle secoue la tête.","Plume repeats the name very softly, the way you taste a word in a foreign language. Then she shakes her head."),
   L('plume',"Je ne m'en souviens pas. Pardon, Porteur. Mais quand tu dis ce nom… j'ai envie de pleurer. C'est bizarre, non ?","I don't remember him. Sorry, Bearer. But when you say that name… I feel like crying. Strange, isn't it?"),
   L('narr',"À ce moment-là, la plume grise se soulève toute seule du nid. Elle flotte, tremble, et pointe vers le fond de la bibliothèque, comme l'aiguille d'une boussole.","Just then, the grey feather lifts out of the nest on its own. It floats, trembles, and points to the back of the library, like a compass needle."),
   L('narr',"Et du fond de la bibliothèque arrive un bruit très doux. Des milliers de petites ailes. Des mites, grises comme de la poussière, qui sortent des vieux livres en grignotant les pages.","And from the back of the library comes a very soft sound. Thousands of little wings. Moths, grey as dust, crawling out of the old books and nibbling the pages."),
   L('plume',"Elles mangent les livres ! Non, attends… elles ne mangent que les marges. Le blanc autour des mots. Et… elles volent vers Lumen !","They're eating the books! No, wait… they only eat the margins. The white around the words. And… they're flying toward Lumen!"),
   CH([["💗 Cacher Lumen dans le chapeau de Plume",'cmp',"Lumen, dans le chapeau, vite ! On s'occupe des mites.","💗 Hide Lumen in Plume's hat","Lumen, into the hat, quick! We'll handle the moths."],
       ["⚔️ Chasser les mites",'brv',"Ouste ! Allez grignoter ailleurs !","⚔️ Chase the moths away","Shoo! Go nibble somewhere else!"]])],
  outro:[L('narr',"Le Ver des Reliures se recroqueville comme un vieux parchemin. Les mites s'enfuient… toutes dans la même direction. Vers la plume grise.","The Binding Worm curls up like an old parchment. The moths flee… all in the same direction. Toward the grey feather."),
   L('narr',"La plume s'est posée contre une étagère, tout au fond. Derrière, il y a une porte. Une petite porte en bois, sans poignée, que personne n'a jamais vue.","The feather has come to rest against a shelf at the very back. Behind it, there's a door. A small wooden door with no handle, one nobody has ever seen."),
   L('plume',"Il y a quelque chose d'écrit dessus, tout petit, dans le coin. « Pour ceux qu'on a oubliés. »","Something is written on it, very small, in the corner. “For those who have been forgotten.”"),
   L('narr',"Plume pousse la porte. Elle ne bouge pas. Tu poses la main dessus… et elle s'ouvre toute seule, en grinçant.","Plume pushes the door. It doesn't move. You put your hand on it… and it swings open on its own, creaking."),
   L('plume',"Elle s'ouvre pour toi. Parce que toi, tu te souviens de quelqu'un qu'on a oublié.","It opens for you. Because you remember someone who's been forgotten.")]},
 {t:tr('Les Marges','The Margins'),ic:'🌫️',req:4,place:tr('Les Marges','The Margins'),bg:['#f4f0e8','#c8c0b0','#6a6458'],mus:'marges',
  mins:['Souvenir Fané','Souvenir Fané'],boss:'Le Gardien des Marges',bh:45,bsk:tr('Question sans réponse','Unanswered Question'),
  intro:[L('narr',"De l'autre côté de la porte, il n'y a ni ciel ni sol. Seulement du blanc, à perte de vue, comme le bord d'une page immense. Ici et là flottent des mots barrés, des dessins à moitié effacés, des notes griffonnées.","On the other side of the door, there's no sky and no ground. Only white, as far as the eye can see, like the edge of an immense page. Here and there float crossed-out words, half-erased drawings, scribbled notes."),
   L('plume',"Les Marges… Les vieux hiboux en parlaient. C'est là que va tout ce que le monde oublie. Les jouets perdus. Les chansons qu'on ne chante plus. Les gens dont plus personne ne dit le nom.","The Margins… The old owls used to talk about them. That's where everything the world forgets ends up. Lost toys. Songs nobody sings anymore. People whose names nobody says anymore."),
   L('lumen',"Hou…","Hoo…"),
   L('narr',"Dans le chapeau de Plume, Lumen brille. C'est la seule lumière des Marges. Et partout autour, dans le blanc, des petites ailes grises la regardent.","In Plume's hat, Lumen glows. She's the only light in the Margins. And all around, in the white, little grey wings are watching her."),
   L('narr',"Une page passe en flottant, toute jaunie, comme une vieille photo. Plume l'attrape. Sur la page, quelque chose bouge.","A page drifts by, all yellowed, like an old photo. Plume catches it. On the page, something is moving."),
   FB('Il y a très longtemps…','A long, long time ago…'),
   L('narr',"Une nuit d'orage, au sommet de la Bibliothèque des Hiboux. Dans un nid de pages, un tout petit hibou violet tremble à chaque coup de tonnerre.","A stormy night, at the top of the Owl Library. In a nest of pages, a tiny purple owlet trembles at every clap of thunder."),
   L('plumeb',"Piou… piou…","Peep… peep…"),
   L('corvinp',"N'aie pas peur, petite plume. Le tonnerre, c'est juste le ciel qui ronfle. Écoute, je vais te chanter un truc.","Don't be scared, little feather. Thunder is just the sky snoring. Listen, I'll sing you something."),
   L('corvinp',"♪ Dors, petite plume, le vent ne te prendra pas… ♪ … Bon, je chante faux. Mais je chante fort, ça compte aussi.","♪ Sleep, little feather, the wind won't take you away… ♪ … Okay, I sing off-key. But I sing loud, that counts too."),
   L('narr',"Le petit hibou violet arrête de trembler. Il se blottit contre son grand frère gris, et il s'endort.","The little purple owlet stops trembling. It snuggles up against its big grey brother, and falls asleep."),
   {fb:0},
   L('plume',"C'est moi. Ce bébé, c'est moi. Et lui… lui, c'est…","That's me. That baby is me. And him… he's…"),
   L('plume',"Je ne me souviens pas de lui. Mais je connais cette chanson. Je la connais par cœur, Porteur. C'est la chanson de Lumen.","I don't remember him. But I know that song. I know it by heart, Bearer. It's Lumen's song."),
   L('narr',"Devant vous, une forme se lève dans le blanc. Un gardien de papier, couvert de mots barrés, avec un seul œil qui ne cligne jamais.","Before you, a shape rises out of the white. A paper guardian, covered in crossed-out words, with a single eye that never blinks."),
   L('gardm',"Qui cherchez-vous ? Ici, on ne passe qu'avec un nom.","Whom do you seek? Here, no one passes without a name."),
   L('plume',"Corvin. On cherche Corvin.","Corvin. We're looking for Corvin."),
   L('gardm',"Ce nom n'est plus écrit nulle part. Ce qui n'est écrit nulle part n'existe pas. Et ce qui n'existe pas… ne se cherche pas.","That name is no longer written anywhere. What is written nowhere doesn't exist. And what doesn't exist… cannot be sought."),
   CH([["💗 « Il existe. Je me souviens de lui. »",'cmp',"Il existe. Moi, je me souviens de lui. Ça suffit.","💗 “He exists. I remember him.”","He exists. I remember him. That's enough."],
       ["⚔️ Forcer le passage",'brv',"On passe. Avec ou sans ta permission.","⚔️ Force your way through","We're going through. With or without your permission."]])],
  outro:[L('narr',"Le Gardien des Marges s'effondre en une pluie de papier blanc. Avant de disparaître, son œil se tourne vers toi.","The Margin Keeper collapses into a rain of white paper. Before it vanishes, its eye turns toward you."),
   L('gardm',"Celui qui se souvient peut passer. Mais faites vite. Dans les Marges, on oublie tout. Même soi-même.","The one who remembers may pass. But hurry. In the Margins, everything is forgotten. Even yourself."),
   L('plume',"Porteur… Tu ne vas pas m'oublier, hein ? Promets.","Bearer… You won't forget me, will you? Promise."),
   L('narr',"Tu promets. Et cette promesse-là, tu la tiendras.","You promise. And this promise, you will keep.")]},
 {t:tr("Ceux qui s'effacent",'Those Who Fade'),ic:'👤',req:8,place:tr('Le Fleuve Blanc','The White River'),bg:['#dcd8e8','#8a84a0','#2a2638'],mus:'marges',
  mins:["Mite d'Oubli",'Souvenir Fané'],boss:'Essaim de Mites',bh:270,bsk:tr('Nuée grise','Grey Cloud'),
  intro:[L('narr',"Plus loin, les Marges deviennent une rivière. Une rivière de pages blanches qui coule sans bruit. Sur ses rives, des silhouettes sont assises. Elles ne bougent presque pas.","Further on, the Margins become a river. A river of blank pages flowing without a sound. On its banks, figures are sitting. They barely move."),
   L('plume',"Ce sont des gens. Des gens oubliés. Regarde, Porteur : on voit à travers eux.","They're people. Forgotten people. Look, Bearer: you can see right through them."),
   L('narr',"Un vieux marchand qui ne sait plus ce qu'il vendait. Une petite fille qui ne se rappelle plus son prénom. Un chevalier qui garde un pont qui n'existe plus. Ils s'effacent doucement, comme de la craie sous la pluie.","An old merchant who no longer knows what he sold. A little girl who can't recall her own name. A knight guarding a bridge that no longer exists. They fade slowly, like chalk in the rain."),
   L('narr',"Et au bord de l'eau, sur une pile de pages blanches, un vieux hibou gris fredonne. Faux. Très faux.","And at the water's edge, on a pile of blank pages, an old grey owl is humming. Off-key. Very off-key."),
   L('lumen',"Hou ! Hou hou !","Hoo! Hoo hoo!"),
   L('corvinf',"Oh. De la lumière. Ça faisait longtemps. … Bonjour. Vous êtes perdus ? Moi aussi, je crois. Depuis… je ne sais plus depuis quand.","Oh. Light. It's been a while. … Hello. Are you lost? Me too, I think. Since… I don't remember since when."),
   L('narr',"La moitié de son corps est blanche comme une page vide. Des mites grises sont posées sur ses ailes, et elles mâchonnent doucement.","Half of his body is white as a blank page. Grey moths are perched on his wings, chewing softly."),
   L('plume',"Vous… vous vous appelez comment ?","What… what's your name?"),
   L('corvinf',"Mon nom ? Il y avait un nom. Je le sais, il était là. Mais les mites l'ont mangé. Elles mangent tout, ici. D'abord les noms, puis les visages, puis les chansons.","My name? There was a name. I know it was there. But the moths ate it. They eat everything here. First the names, then the faces, then the songs."),
   L('corvinf',"Il me reste une chanson. Une seule. Je la chantais à quelqu'un. Quelqu'un de tout petit, qui avait peur de l'orage. … Vous avez ses yeux, mademoiselle. C'est drôle.","I have one song left. Just one. I used to sing it to someone. Someone very small, who was afraid of storms. … You have her eyes, miss. Funny."),
   L('narr',"Plume ne répond pas. Elle ne peut pas. Toi, tu sais qui il est. Tu es le seul, avec Lumen.","Plume doesn't answer. She can't. You know who he is. You're the only one, along with Lumen."),
   L('narr',"Soudain, toutes les mites des Marges s'envolent en même temps. Elles se rassemblent en un nuage gris, avec deux grands yeux pâles. Et elles foncent sur le vieux hibou.","Suddenly, every moth in the Margins takes off at once. They gather into a grey cloud with two huge pale eyes. And they swoop down on the old owl."),
   CH([["💗 Protéger le vieux hibou",'cmp',"Pas lui ! Vous ne le mangerez pas !","💗 Protect the old owl","Not him! You won't eat him!"],
       ["⚔️ Disperser l'essaim",'brv',"Lumen, brille ! On va voir si elles aiment la lumière !","⚔️ Scatter the swarm","Lumen, shine! Let's see if they like the light!"]])],
  outro:[L('narr',"L'essaim éclate en mille petites ailes. Mais quand la poussière retombe, le vieux hibou n'est plus là. À sa place, il y a un fil d'argent qui monte tout en haut des Marges.","The swarm bursts into a thousand little wings. But when the dust settles, the old owl is gone. In his place, there's a silver thread rising to the very top of the Margins."),
   L('mitranne',"Merci de me l'avoir trouvé. Il est délicieux, vous savez. Une page donnée par amour… ça a le goût du miel.","Thank you for finding him for me. He's delicious, you know. A page given out of love… it tastes like honey."),
   L('plume',"Qui a dit ça ? Qui êtes-vous ?!","Who said that? Who are you?!"),
   L('mitranne',"Venez voir. Et amenez la petite lumière. J'ai tellement envie de la voir de près.","Come and see. And bring the little light. I so want to see her up close.")]},
 {t:tr('La Reine des Mites','The Moth Queen'),ic:'🕯️',req:12,place:tr('Le Palais de la Lampe','The Lamp Palace'),bg:['#3a3050','#1a1428','#07050c'],mus:'dungeon',
  mins:["Mite d'Oubli","Mite d'Oubli"],boss:"Cocon d'Oubli",bh:270,bsk:tr("Fil d'oubli",'Thread of Oblivion'),
  intro:[L('narr',"Le fil d'argent mène tout en haut des Marges, là où le blanc devient gris, puis noir. Au milieu du noir pend une immense lampe de fer. Éteinte. Et tout autour, des milliers de cocons.","The silver thread leads to the very top of the Margins, where white turns grey, then black. In the middle of the black hangs an enormous iron lamp. Unlit. And all around it, thousands of cocoons."),
   L('plume',"Dans les cocons… il y a des choses. Une poupée. Un bateau. Le nom d'un village. Elle garde tout ce qu'on oublie, comme des bonbons dans une boîte.","Inside the cocoons… there are things. A doll. A boat. A village's name. She keeps everything that gets forgotten, like sweets in a box."),
   L('narr',"Sur la lampe éteinte, quelque chose déplie ses ailes. Des ailes immenses, couleur de poussière, avec deux grands yeux dorés dessinés dessus.","On the unlit lamp, something unfolds its wings. Enormous wings, the color of dust, with two big golden eyes painted on them."),
   L('mitranne',"Bienvenue chez moi. Je suis Mitranne, la Reine des Mites. Tout ce que le monde jette, oublie, abandonne… finit ici. Et moi, je le garde.","Welcome to my home. I am Mitranne, Queen of the Moths. Everything the world throws away, forgets, abandons… ends up here. And I keep it."),
   L('plume',"Vous ne le gardez pas. Vous le mangez !","You don't keep it. You eat it!"),
   L('mitranne',"C'est pareil, petite chouette. Quand je mange un souvenir, il ne fait plus jamais de peine à personne. Plus personne ne peut le chercher. C'est gentil, non ?","It's the same thing, little owl. When I eat a memory, it never hurts anyone again. No one can ever look for it again. That's kind, isn't it?"),
   L('mitranne',"Autrefois, j'étais une petite mite de rien du tout. Je vivais dans la lampe de la grande tour, là-haut, dans votre monde. Je l'aimais. C'était ma lune à moi.","Once, I was a tiny nothing of a moth. I lived in the lamp of the great tower, up there, in your world. I loved it. It was my very own moon."),
   L('mitranne',"Et un jour, quelqu'un l'a oubliée. On l'a jetée ici. Je l'ai suivie. Mille ans que j'attends qu'elle se rallume. Mille ans dans le noir, à manger pour ne pas avoir froid.","And one day, someone forgot it. It was thrown away here. I followed it. A thousand years I've been waiting for it to light up again. A thousand years in the dark, eating so as not to be cold."),
   L('mitranne',"Alors voilà ce que je vous propose. Donnez-moi la petite lumière. Juste elle. Et je vous rends votre vieux hibou. Ce qu'il en reste.","So here's my offer. Give me the little light. Just her. And I'll give you back your old owl. What's left of him."),
   L('narr',"Au-dessus de la lampe pend un cocon plus gros que les autres. À travers la soie, on devine deux aigrettes pointues et deux yeux ronds qui brillent à peine.","Above the lamp hangs a cocoon bigger than the others. Through the silk, you can make out two pointed ear tufts and two round eyes, barely glowing."),
   L('lumen',"Cor… vin ! COR-VIN !","Cor… vin! COR-VIN!"),
   L('plume',"Elle a dit son nom. Lumen le connaît ! Elle se souvient de lui, elle aussi !","She said his name. Lumen knows him! She remembers him too!"),
   CH([["💗 « Lumen n'est pas à vendre. »",'cmp',"Lumen n'est pas à vendre. Et lui non plus. On les ramène tous les deux.","💗 “Lumen isn't for sale.”","Lumen isn't for sale. And neither is he. We're taking them both home."],
       ["⚔️ Trancher le fil du cocon",'brv',"Si je coupe ce fil, le cocon tombe. On va le chercher nous-mêmes !","⚔️ Cut the cocoon's thread","If I cut this thread, the cocoon falls. We'll get him ourselves!"]]),
   L('mitranne',"Dommage. Mes petites, gardez le cocon. Personne n'y touche.","Pity. My little ones, guard the cocoon. Nobody touches it.")],
  outro:[L('narr',"Le Cocon d'Oubli se déchire. Le vieux hibou gris tombe dans tes bras, léger comme une feuille de papier.","The Cocoon of Oblivion tears open. The old grey owl falls into your arms, light as a sheet of paper."),
   L('narr',"Mitranne pousse un cri aigu et s'envole dans le noir, avec toutes ses mites. Mais elle ne s'enfuit pas. Elle a vu la lumière de Lumen de près. Elle reviendra.","Mitranne lets out a shrill cry and flies off into the dark, with all her moths. But she isn't running away. She has seen Lumen's light up close. She'll be back."),
   L('corvinf',"Il y a des trous en moi. Je les sens. Là où il y avait des mots… il n'y a plus rien.","There are holes in me. I can feel them. Where there were words… there's nothing anymore."),
   L('narr',"C'est vrai. Sa page est pleine de trous, comme une vieille dentelle. Les mites ont mangé la moitié de ses mots.","It's true. His page is full of holes, like old lace. The moths have eaten half of his words."),
   L('plume',"Il faut réécrire ce qui manque. Mais avec quoi ? On n'a pas de plume magique, pas de Dernière Page…","We have to rewrite what's missing. But with what? We don't have a magic quill, or a Last Page…"),
   L('plume',"… Attends. La première chanson d'un Gardien-Hibou peut écrire dans le Livre de l'Histoire. Une seule fois. Et la nuit du Scribe, Lumen n'a chanté qu'une note. Une seule ! Sa première chanson n'est pas finie !","… Wait. An Owl Guardian's first song can write in the Book of History. Just once. And the night of the Scribe, Lumen only sang one note. Just one! Her first song isn't finished!")]},
 {t:tr('La chanson fausse','The Off-Key Song'),ic:'🎵',req:16,place:tr("Le nid d'en haut",'The Top Nest'),bg:['#2a2a4a','#4a4060','#140e1e'],mus:'marges',
  mins:['Mite du Silence','Mite du Silence'],boss:'Fileuse de Silence',bh:265,bsk:tr('Toile muette','Mute Web'),
  intro:[L('narr',"De retour à la Bibliothèque des Hiboux. Tout en haut de la tour, il y a un vieux nid de pages, abandonné depuis longtemps. Dehors, un orage gronde.","Back at the Owl Library. At the very top of the tower, there's an old nest of pages, abandoned long ago. Outside, a storm is rumbling."),
   L('plume',"C'est le nid de la page jaunie. Le nid de l'orage. C'est ici qu'il chantait pour moi… même si je ne m'en souviens pas.","It's the nest from the yellowed page. The storm nest. This is where he sang to me… even if I don't remember it."),
   L('corvinf',"Je connais cet endroit. Je ne sais pas pourquoi. Mais ici, j'ai moins froid.","I know this place. I don't know why. But here, I'm less cold."),
   L('narr',"Lumen se pose au bord du nid. Elle gonfle ses plumes, ferme les yeux, et elle commence à chanter. Sa première vraie chanson.","Lumen lands on the edge of the nest. She puffs up her feathers, closes her eyes, and begins to sing. Her first real song."),
   L('lumen',"♪ Hou… hou hou… houuu… ♪","♪ Hoo… hoo hoo… hooo… ♪"),
   L('narr',"C'est la berceuse. Faux, comme toujours. Et pendant qu'elle chante, sur la page trouée du vieux hibou, des lettres dorées apparaissent. Une par une.","It's the lullaby. Off-key, as always. And as she sings, on the old owl's holey page, golden letters appear. One by one."),
   L('plume',"Ça marche ! Mais il manque les paroles… Lumen ne connaît que l'air. Porteur, toi, tu connais son histoire. Raconte-la-lui !","It's working! But the words are missing… Lumen only knows the tune. Bearer, you know his story. Tell it to him!"),
   CH([["💗 Raconter le jour où il a été pardonné",'cmp',"Il s'appelait Corvin. Un jour, il est devenu méchant, parce qu'il avait peur d'être oublié. Et sa petite sœur lui a pardonné.","💗 Tell of the day he was forgiven","His name was Corvin. Once, he turned bad, because he was afraid of being forgotten. And his little sister forgave him."],
       ["✨ Raconter le jour où il a tout donné",'brv',"Il s'appelait Corvin. Sur la Dernière Page, il a donné tout ce qu'il était pour que sa sœur se souvienne. Sans hésiter.","✨ Tell of the day he gave everything","His name was Corvin. On the Last Page, he gave everything he was so his sister would remember. Without hesitating."]]),
   L('narr',"À chaque phrase, un mot revient sur sa page. « Corvin. » « Frère. » « Chantait faux. »","With each sentence, a word returns to his page. “Corvin.” “Brother.” “Sang off-key.”"),
   L('corvinf',"Corvin… C'est joli, comme nom. Je crois que je l'aimais bien.","Corvin… That's a nice name. I think I used to like it."),
   L('narr',"Mais la chanson attire autre chose. Les vitres se couvrent de toiles blanches. Les mites du silence entrent par toutes les fentes, et partout où elles passent, les sons disparaissent. Plus de tonnerre. Plus de vent. Bientôt, plus de chanson.","But the song draws something else. The windows fill with white webs. The moths of silence creep in through every crack, and wherever they go, sounds vanish. No more thunder. No more wind. Soon, no more song."),
   L('plume',"Elles mangent la chanson ! Lumen, continue ! Surtout, ne t'arrête pas !","They're eating the song! Lumen, keep going! Whatever you do, don't stop!")],
  outro:[L('narr',"La Fileuse de Silence s'effondre, empêtrée dans ses propres fils. Le bruit revient d'un coup : le tonnerre, le vent… et la petite voix fausse de Lumen, qui n'a jamais arrêté de chanter.","The Silence Spinner collapses, tangled in its own threads. Sound comes back all at once: the thunder, the wind… and Lumen's off-key little voice, which never stopped singing."),
   L('corvinf',"Plume… Je m'appelle Corvin. Et tu es ma petite sœur. Tu avais peur de l'orage.","Plume… My name is Corvin. And you're my little sister. You used to be afraid of storms."),
   L('plume',"Je… je n'ai toujours pas de souvenirs. Mais j'ai l'impression de te connaître depuis toujours. Est-ce que ça compte ?","I… I still don't have any memories. But I feel like I've known you forever. Does that count?"),
   L('corvinf',"Ça compte énormément.","It counts enormously."),
   L('narr',"La chanson arrive au dernier couplet. Il ne manque plus qu'un mot sur la page de Corvin. Le plus important. Celui qui fera que tout le royaume se souviendra de lui.","The song reaches its last verse. Only one word is missing from Corvin's page. The most important one. The one that will make the whole kingdom remember him."),
   L('narr',"Et c'est là que toutes les vitres de la tour explosent.","And that's when every window in the tower shatters."),
   L('mitranne',"LA LUMIÈRE ! Elle brille si fort… Elle est à MOI !","THE LIGHT! It shines so bright… It's MINE!")]},
 {t:tr('Le dernier mot','The Last Word'),ic:'✨',req:20,fin5:1,place:tr('Le ciel de la Bibliothèque','The Sky above the Library'),bg:['#1a1430','#3a2a58','#0a0814'],mus:'umbra',mus2:'marges',
  mins:['Mite du Silence',"Mite d'Oubli"],boss:'Mitranne, la Reine des Mites',bh:275,bsk:tr("Poussière d'oubli",'Dust of Oblivion'),
  intro:[L('narr',"Mitranne entre dans la tour, immense. Ses ailes couvrent tout le ciel d'orage. Des milliers de mites tourbillonnent autour d'elle, et ses yeux ne quittent pas Lumen.","Mitranne bursts into the tower, immense. Her wings cover the whole stormy sky. Thousands of moths swirl around her, and her eyes never leave Lumen."),
   L('mitranne',"Mille ans dans le noir. Mille ans. Et elle est là. Une lumière qui chante. Donnez-la-moi. Je la mettrai dans ma lampe, je la garderai pour toujours, et je n'aurai plus jamais froid.","A thousand years in the dark. A thousand years. And there she is. A light that sings. Give her to me. I'll put her in my lamp, I'll keep her forever, and I'll never be cold again."),
   L('corvinf',"Ce n'est pas une lampe. C'est une petite chouette qui chante faux. Comme moi.","She isn't a lamp. She's a little owl who sings off-key. Like me."),
   L('plume',"Lumen, ne t'arrête pas. Il ne manque qu'un mot. Un seul !","Lumen, don't stop. Only one word is missing. Just one!"),
   L('mitranne',"Si elle finit sa chanson, sa lumière ne sera plus jamais aussi forte. Une première chanson, ça ne se chante qu'une fois. Je ne la laisserai pas la gaspiller pour un vieux hibou !","If she finishes her song, her light will never be this strong again. A first song can only be sung once. I won't let her waste it on an old owl!"),
   CH([["💗 Protéger la chanson jusqu'au bout",'cmp',"Chante, Lumen. On s'occupe de tout le reste. Personne ne t'interrompra.","💗 Protect the song to the very end","Sing, Lumen. We'll handle everything else. Nobody will interrupt you."],
       ["⚔️ Frapper Mitranne avant qu'elle n'attrape Lumen",'brv',"Elle ne touchera pas à Lumen. On attaque, maintenant !","⚔️ Strike Mitranne before she grabs Lumen","She won't touch Lumen. We attack, now!"]]),
   L('mitranne',"Alors je vais tout manger. Vos noms, vos visages, vos chansons !","Then I'll eat everything. Your names, your faces, your songs!")],
  outroA:[L('narr',"Mitranne tombe. Ses ailes déchirées tremblent dans le vent. Mais elle ne regarde plus que Lumen, qui chante toujours, et qui brille de plus en plus fort.","Mitranne falls. Her torn wings tremble in the wind. But she only has eyes for Lumen, who is still singing, and shining brighter and brighter."),
   L('mitranne',"Elle est si belle… C'est comme ma lampe. Comme avant.","She's so beautiful… It's like my lamp. Like before."),
   L('narr',"Alors la Reine des Mites fait ce que font toutes les mites. Elle vole vers la lumière. Doucement. Sans peur.","So the Queen of the Moths does what all moths do. She flies toward the light. Gently. Without fear."),
   L('mitranne',"C'est… chaud.","It's… warm."),
   L('narr',"Et elle disparaît dans une pluie de poussière d'argent. Pour toujours. Avec elle s'éteignent toutes les mites des Marges.","And she vanishes in a rain of silver dust. Forever. With her, every moth in the Margins goes out."),
   L('narr',"Lumen n'a pas raté une seule note. Elle chante le dernier mot de sa première chanson. Un nom.","Lumen didn't miss a single note. She sings the last word of her first song. A name."),
   L('lumen',"♪ COR-VIN ! ♪","♪ COR-VIN! ♪"),
   L('narr',"En bas de la tour, dans le Livre de l'Histoire, une ligne s'écrit en lettres d'or. Et partout dans le royaume, au même moment, des gens lèvent la tête.","Down in the tower, in the Book of History, a line writes itself in golden letters. And all across the kingdom, at the same moment, people look up."),
   L('narr',"Sur la grande place, une vieille dame se met à fredonner une chanson fausse. Un garde se souvient d'un hibou gris qui lui volait son goûter. Aléa éclate de rire sans savoir pourquoi. Le royaume se souvient.","In the great square, an old woman starts humming an off-key song. A guard remembers a grey owl who used to steal his snack. Aléa bursts out laughing without knowing why. The kingdom remembers."),
   L('plume',"Corvin… CORVIN ! Grand frère ! Je me souviens ! L'orage, la berceuse, le jour où tu es revenu… Je me souviens de TOUT !","Corvin… CORVIN! Big brother! I remember! The storm, the lullaby, the day you came back… I remember EVERYTHING!"),
   L('corvin5',"Hou… Doucement, petite sœur, tu m'étouffes. … Non. Ne t'arrête pas. Serre plus fort.","Hoo… Easy, little sister, you're squishing me. … No. Don't stop. Squeeze harder.")],
  outroB:[L('narr',"Mitranne tombe, mais elle se relève une dernière fois. D'un battement d'ailes, elle avale la dernière note de Lumen. Le mot ne sera jamais chanté.","Mitranne falls, but she rises one last time. With a beat of her wings, she swallows Lumen's last note. The word will never be sung."),
   L('mitranne',"Ha… Elle est à moi. Sa chanson, sa lumière… Elle est en moi…","Ha… It's mine. Her song, her light… It's inside me…"),
   L('narr',"Mais une note de lumière, ça brûle. Mitranne s'illumine de l'intérieur, comme une lanterne. Pour la première fois depuis mille ans, elle n'a plus froid.","But a note of light burns. Mitranne lights up from the inside, like a lantern. For the first time in a thousand years, she isn't cold."),
   L('mitranne',"C'est… chaud…","It's… warm…"),
   L('narr',"Puis elle se défait en poussière d'argent. Pour toujours. Avec elle s'éteignent toutes les mites des Marges.","Then she crumbles into silver dust. Forever. With her, every moth in the Margins goes out."),
   L('narr',"La première chanson de Lumen est finie. Il lui manquait un mot. Dans le Livre de l'Histoire, le nom de Corvin ne s'écrit pas.","Lumen's first song is over. It was missing a word. In the Book of History, Corvin's name doesn't get written."),
   L('plume',"Corvin… Le Livre ne se souvient pas de toi. Le royaume non plus. Mais moi, je t'ai entendu. Toute la chanson. Toute ton histoire. Et ça, personne ne peut me l'enlever.","Corvin… The Book doesn't remember you. Neither does the kingdom. But I heard you. The whole song. Your whole story. And nobody can take that away from me."),
   L('corvin5',"Deux personnes qui se souviennent de moi. Plus une petite chouette. … La semaine dernière, il n'y en avait qu'une. Tu sais quoi ? C'est déjà énorme.","Two people who remember me. Plus one little owl. … Last week, there was only one. You know what? That's already huge.")],
  end:[L('narr',"Quelques jours plus tard, dans le nid d'en haut…","A few days later, in the top nest…"),
   L('lumen',"Hou hou houuu !","Hoo hoo hooo!"),
   L('corvin5',"♪ Dors, petite plume, le vent ne te prendra pas… ♪","♪ Sleep, little feather, the wind won't take you away… ♪"),
   L('plume',"Vous chantez faux tous les deux. C'est insupportable. … Recommencez.","You both sing off-key. It's unbearable. … Do it again."),
   L('narr',"Lumen ne brille plus autant qu'avant. Juste un peu, comme une veilleuse. Juste assez pour ne jamais avoir peur du noir. Elle s'en fiche : elle a deux hiboux qui chantent faux avec elle.","Lumen doesn't glow as much as before. Just a little, like a night-light. Just enough never to be afraid of the dark. She doesn't mind: she has two owls who sing off-key with her."),
   L('corvin5',"Porteur. Merci de t'être souvenu de moi. Quand tout le monde m'avait oublié, il restait toi. Parfois, une seule personne suffit pour tout recommencer.","Bearer. Thank you for remembering me. When everyone had forgotten me, there was still you. Sometimes, one single person is enough to start everything over."),
   L('narr',"Corvin rend la plume grise à Plume. Elle la plante dans son chapeau, juste à côté de l'étoile.","Corvin gives the grey feather back to Plume. She tucks it into her hat, right next to the star."),
   L('plume',"Je la garde. Au cas où tu repartirais. Comme ça, je saurai toujours où te retrouver.","I'm keeping it. In case you ever leave again. That way, I'll always know where to find you."),
   L('narr',"Dans les Marges, il reste beaucoup de gens qu'on a oubliés. Un marchand, une petite fille, un chevalier sur son pont. Mais maintenant, il y a une porte. Et quelqu'un qui sait l'ouvrir.","In the Margins, there are still many forgotten people. A merchant, a little girl, a knight on his bridge. But now there's a door. And someone who knows how to open it."),
   L('narr',"Fin du cinquième livre. Merci, Porteur.","End of the fifth book. Thank you, Bearer.")]}];
const N5=L5.length,BK5SYM=L5.map(c=>c.ic);
const dc=Lx=>(Lx||[]).map(x=>Array.isArray(x)?x.slice():Object.assign({},x,x.ch?{ch:x.ch.map(c=>c.slice())}:{}));
L5.forEach(c=>SAGA.push({t:c.t,ic:c.ic,req:c.req,ashc:1,l5:1,mus:c.mus,fin5:c.fin5||0,bg:c.bg,place:c.place,boss:{n:c.boss,h:c.bh,st:100},intro:dc(c.intro),outro:dc(c.outro||c.end)}));
const S5=()=>{if(!S.sg5||typeof S.sg5!=='object')S.sg5={};if(!S.sg5.d||typeof S.sg5.d!=='object')S.sg5.d={};if(!S.sg5.ch||typeof S.sg5.ch!=='object')S.sg5.ch={};return S.sg5};
const in5=c=>c>=L50&&c<L50+N5;
const b4done=()=>{try{return!!(S.sg4&&S.sg4.d&&S.sg4.d[5])}catch(e){return false}};
const hmx=()=>{try{return S.hmax||0}catch(e){return 0}};
const done5=k=>!!S5().d[k];
const un5=k=>done5(k)||(b4done()&&hmx()>=L5[k].req&&(k===0||done5(k-1)));
const next5=()=>{for(let k=0;k<N5;k++)if(!done5(k))return k;return-1};
const cnt5=()=>L5.filter((_,k)=>done5(k)).length;
window.l5State=()=>({done:cnt5(),next:next5(),b4:b4done(),hmax:hmx()});
{const su=sagaUnlocked;sagaUnlocked=function(i){if(in5(i))return un5(i-L50);return su.apply(this,arguments)}}
{const sp=sagaPick;sagaPick=function(k){try{const c=SAGA[SGP.ch];if(c&&c.l5){const Lx=SGP.lines[SGP.i];if(Lx&&Lx.ch&&Lx.ch[k])S5().ch[SGP.ch-L50]=Lx.ch[k][1]}}catch(e){}return sp.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){if(!in5(c))return so.apply(this,arguments);const k=c-L50,C=L5[k],cfg=SAGA[c];cfg.intro=dc(C.intro);
  cfg.outro=C.fin5?dc((S5().ch[k]==='brv'?C.outroB:C.outroA).concat(C.end)):dc(C.outro);cfg.mus=part==='outro'&&C.mus2?C.mus2:C.mus;const r=so.apply(this,arguments);
  try{const o=document.getElementById('sgov');if(o){o.classList.remove('bk3','bk4','fbmode','eccr','gvcr');o.classList.add('bk5');const chip=o.querySelector('.sgchip');if(chip){chip.setAttribute('data-noi18n','');chip.textContent=`${C.ic} ${LANG==='en'?'Book V':'Livre V'} · ${k+1}/${N5} · ${typeof trS==='function'?trS(C.t):C.t}`}}musicWant(cfg.mus)}catch(e){}return r}}
/* le petit Corvin du souvenir parle à gauche (Plume bébé reste à droite) */
const LEFT5={corvinp:1};
{const ss=sagaShow;sagaShow=function(){const r=ss.apply(this,arguments);try{const c=SAGA[SGP.ch],Lx=SGP.lines&&SGP.lines[SGP.i];if(c&&c.l5&&Array.isArray(Lx)&&LEFT5[Lx[0]]){const o=document.getElementById('sgov');if(o){const w=String(Lx[0]),sl=o.querySelector('.sgl'),sr=o.querySelector('.sgr');
  if(sl&&sl.dataset.w!==w){sl.dataset.w=w;sl.innerHTML=sagaFig(Lx[0])}if(sr&&sr.dataset.w===w){sr.innerHTML='';delete sr.dataset.w}if(sl)sl.classList.remove('dim');if(sr)sr.classList.add('dim')}}}catch(e){}return r}}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(in5(c))return sgBg5(c-L50);return sb.apply(this,arguments)}}
const FTH=`<svg class="l5fth" viewBox="0 0 30 60" aria-hidden="true"><path d="M15 58Q14.4 40 15 6" stroke="#5a5468" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M15 5Q3 16 4.6 34Q7.6 46 15 51Q22.4 46 25.4 34Q27 16 15 5Z" fill="#c4bed0" stroke="#3a3448" stroke-width="1.3" stroke-linejoin="round"/><path d="M15 12L8 19M15 18L6.4 26.6M15 25L6.4 33M15 32L8.4 39.6M15 12L22 19M15 18L23.6 26.6M15 25L23.6 33M15 32L21.6 39.6" stroke="#8a849a" stroke-width=".9"/><path d="M7 30l-3 2M23 22l3 -1" stroke="#3a3448" stroke-width="1"/></svg>`;
const stripBg=s=>String(s).replace(/<rect width="100" height="100"[^>]*\/>/,'').replace(/<circle cx="50" cy="46" r="42"[^>]*\/>/,'').replace(/<ellipse cx="50" cy="97"[^>]*\/>/,'');
{const sf=sagaFig;sagaFig=function(w){try{
  if(w==='corvinf')return`<div class="sgfig lore crvf">${crvBody(0)}</div>`;
  if(w==='corvin5')return`<div class="sgfig lore crv5">${crvBody(3)}</div>`;
  if(w==='corvinp'||w==='plumeb')return`<div class="sgfig plumef owlf ${w}">${owletSVG(w)}</div>`;
  if(w==='gardm')return`<div class="sgfig vil">${stripBg(port('Le Gardien des Marges',45,true))}</div>`;
  if(w==='mitranne')return`<div class="sgfig vil mitf"><svg viewBox="0 0 100 100">${MONS['Mitranne, la Reine des Mites']()}</svg></div>`}catch(e){}return sf.apply(this,arguments)}}
/* combats : calés sur les étapes de boss du mode Difficile (le chapitre k ressemble à un boss de l'étape « déblocage + 6 », un peu plus coriace ; le dernier est un mur) */
const port=(nm,h,b)=>NMAP[nm]&&typeof nmonArt==='function'?nmonArt(nm,h,b):monArt(nm,h,b);
function hTemplate(t){let F=[];const h0=HMODE,n0=NMODE;try{HMODE=t;NMODE=t;F=stageFoes(t)}catch(e){F=[]}finally{HMODE=h0;NMODE=n0}return F}
function l5Foes(k){const C=L5[k],fin=!!C.fin5,sT=Math.min(100,C.req+6),t=Math.min(100,10*Math.ceil(sT/10)),sc=hRecRaw(sT)/hRecRaw(t);
  const F=hTemplate(t),B=F.find(u=>u.boss)||{max:480000,atk:18000,def:6400,spd:118},M=F.filter(u=>u!==B&&!u.boss);
  const mins=C.mins.map((nm,i)=>{const m=M[i]||M[0]||{max:B.max*.25,atk:B.atk*.62,def:B.def*.72};return foeUnit(i,{name:nm,max:Math.round(m.max*sc*1.05*(.95+i*.1)),atk:Math.round(m.atk*Math.pow(sc,.9)*1.02),def:Math.round(m.def*Math.pow(sc,.8)),spd:98+i*8,port:port(nm,C.bh,false),
    sk:i?{n:tr('Morsure de mite','Moth Bite'),tg:'one',fx:{dmg:170}}:{n:tr('Battement poudreux','Dusty Flutter'),tg:'all',fx:{dmg:80}}})});
  const hb=(fin?1.4:1.12)*(1+k*.025),ab=fin?1.08:1.03;
  const b=foeUnit(9,{name:C.boss,boss:1,max:Math.round(B.max*sc*hb),atk:Math.round(B.atk*Math.pow(sc,.9)*ab),def:Math.round(B.def*Math.pow(sc,.8)),spd:Math.max(110+k*2,(B.spd||110)),port:port(C.boss,C.bh,true),
    sk:{n:C.bsk,tg:'all',fx:Object.assign({dmg:140+k*5,weak:1},fin?{stun:20}:k===3?{stun:15}:{})}});
  return[...mins,b]}
window.l5Foes=l5Foes;
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(in5(c)&&r){const k=c-L50;r.foes=l5Foes(k);r.title=`${L5[k].ic} ${L5[k].t}`;r.sub=`Mode histoire · Livre V · chapitre ${27+k}${L5[k].fin5?' · Combat final':''}`;r.maxR=L5[k].fin5?32:30;r.wc=L5[k].bh}}catch(e){console.warn('livre V',e)}return r}}
/* récompenses */
const SAGA_RW5=[[340,3,2,0],[360,3,0,2],[380,4,2,0],[400,4,0,3],[420,5,3,0],[1000,7,7,7]];
try{TITLES.push({k:'faux5',n:tr('Celui qui chante faux','The Off-Key Singer'),c:'#d6d0e4',d:tr('Terminer le Livre V du mode histoire','Finish Book V of story mode'),ok:()=>!!(S.sg5&&S.sg5.d&&S.sg5.d[5])})}catch(e){}
try{FRAMES.plumegrise=tr('Plume Grise','Grey Feather');try{FHINT.plumegrise=tr('Livre V du mode histoire : dernier chapitre','Book V of story mode: last chapter')}catch(e){}
  {const fl=frameList;frameList=function(){const Lx=fl.apply(this,arguments).filter(f=>f!=='plumegrise'||frameUnlocked(f));if(!Lx.includes('plumegrise')&&frameUnlocked('plumegrise'))Lx.push('plumegrise');return Lx}}}catch(e){}
{const sr=sagaReward;sagaReward=function(c){if(!in5(c))return sr.apply(this,arguments);const k=c-L50,G=S5();if(G.d[k]){render();return}G.d[k]=Date.now();const [gm,sh,tk,us]=SAGA_RW5[k];S.gems+=gm;S.shards+=sh;if(tk)INV().pt+=tk;if(us)S.ush=(S.ush||0)+us;
  const fin=!!L5[k].fin5;if(fin){try{news(Date.now(),`${S.name||'Voyageur'} a terminé le Livre V du mode histoire.`)}catch(e){}try{S.evFrames=S.evFrames||[];if(!S.evFrames.includes('plumegrise'))S.evFrames.push('plumegrise')}catch(e){}}save();
  const brv=G.ch[k]==='brv';
  modal(`<div class="sgrw bk5">${fin?`<div class="l5big">${crvBody(3)}</div>`:`<div class="sgfrag">${BK5SYM[k]}</div>`}<div class="h">${fin?'La chanson est finie':'Chapitre '+(27+k)+' terminé'}</div><p class="sub">${fin?(brv?'Fin de la Note avalée : seuls Plume, Lumen et toi vous souvenez de Corvin.':'Fin du Royaume qui se souvient : tout le royaume se souvient de Corvin.'):'« '+esc(L5[k].t)+' »'}</p>
   <div class="sgfrags bk5">${BK5SYM.map((x,i)=>`<i class="${done5(i)?'on':''}">${x}</i>`).join('')}</div><div class="xrw"><div>${GEM}${gm} gemmes</div><div>${SHARD}${sh} éclats légendaires</div>${tk?`<div>${SIC.ticket}${tk} tickets d'invocation</div>`:''}${us?`<div>🌟 ${us} éclats d'ultra-évolution</div>`:''}${fin?'<div>🏷️ Titre « Celui qui chante faux »</div><div>🖼️ Cadre « Plume Grise »</div>':''}</div>
   ${fin?`<p class="muted" style="font-size:12.5px;margin:8px 4px 0">♪ Dors, petite plume, le vent ne te prendra pas… ♪</p>`:''}<button class="btn p" data-a="close" style="width:100%;margin-top:10px">${fin?'Hou hou houuu ! 🪶':"Continuer l'aventure"}</button></div>`);try{ttCheck()}catch(e){}render()}}
/* le Livre de l'Histoire : un cinquième tome */
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="l5play"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=+b.dataset.v;if(!un5(k))return;try{closeModal()}catch(er){}sagaOpen(L50+k,'intro')},true);
{const sc=sagaCard;sagaCard=function(){if(!b4done())return sc.apply(this,arguments);if(UI.sgBook===undefined||UI.sgBook===null)UI.sgBook=5;
  if(UI.sgBook!==5){const h=sc.apply(this,arguments);return h.replace(/(<div class="chips sgbk">[\s\S]*?)(<\/div>)/,`$1<button class="chip" data-a="sgbook" data-v="5">🪶 Livre V</button>$2`)}
  const n=next5(),done=cnt5();
  const items=L5.map((c,k)=>{const ok=done5(k),un=un5(k);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="l5play" data-v="${k}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${27+k}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Étape ${c.req} du mode Difficile`}</small></button>`}).join('');
  let main;if(n>=0&&un5(n))main=`<button class="btn p sgbig bk5b" data-a="l5play" data-v="${n}">▶️ ${L5[n].ic} Chapitre ${27+n} : ${esc(L5[n].t)}</button>`;
  else if(n>=0)main=`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Prochain chapitre à l'étape ${L5[n].req} du mode <b>Difficile</b> (tu en es à ${hmx()}).</p>`;
  else main=`<p style="margin:8px 0 0;font-size:13px">🪶 La plume grise est dans le chapeau de Plume. Et le soir, deux hiboux chantent faux.</p>`;
  const mine=`<div class="card sgcard bk5"><div class="chips sgbk"><button class="chip" data-a="sgbook" data-v="1">📕 Livre I</button><button class="chip" data-a="sgbook" data-v="2">🃏 Livre II</button><button class="chip" data-a="sgbook" data-v="3">🦉 Livre III</button><button class="chip" data-a="sgbook" data-v="4">📜 Livre IV</button><button class="chip on" data-a="sgbook" data-v="5">🪶 Livre V</button></div>
   <div class="sghd"><div class="sgpl bk5pl">${plumeSVG('happy')}${FTH}</div><div style="min-width:0;flex:1"><div class="h3" style="margin:0">🪶 Livre V · La Plume Grise</div><div class="muted" style="font-size:12.5px">Quelqu'un fredonne faux dans les Marges · ${done}/${N5} chapitres</div>
   <div class="sgfrags sm bk5">${BK5SYM.map((x,i)=>`<i class="${done5(i)?'on':''}">${x}</i>`).join('')}</div></div></div>${main}
   <details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${items}</div></details></div>`;
  /* on garde ce que les autres modules ajoutent autour (chroniques, bannières) et on remplace seulement la carte du Livre IV */
  let h='';try{UI.sgBook=4;h=sc.apply(this,arguments)}finally{UI.sgBook=5}
  const i=h.indexOf('<div class="card sgcard bk4">'),E='</div></details></div>',j=i<0?-1:h.indexOf(E,i);
  return j<0?mine+h:h.slice(0,i)+mine+h.slice(j+E.length)}}
/* annonce + notes de version */
try{const al=annList;annList=function(){const Lx=al.apply(this,arguments);try{if(Date.now()<Date.UTC(2026,11,22)&&!Lx.some(a=>a.k==='livre5')){const i=Lx.findIndex(a=>a.k==='eclipse2');Lx.splice(i>=0?i+1:0,0,{k:'livre5',ac:'#d6d0e4',tag:'MODE HISTOIRE',t:'Livre V : La Plume Grise 🪶',
  x:tr("Chaque soir, Lumen chante une berceuse… celle que chantait Corvin, avec les mêmes fausses notes. Et la plume grise du nid se met à bouger toute seule. <b>6 nouveaux chapitres</b> (27 à 32), après le Livre IV, avec le <b>mode Difficile</b>. Une nouvelle musique, une reine qui a très faim, et deux fins.","Every evening, Lumen sings a lullaby… the one Corvin used to sing, with the same wrong notes. And the grey feather in the nest starts moving on its own. <b>6 new chapters</b> (27 to 32), after Book IV, with <b>Hard mode</b>. New music, a very hungry queen, and two endings."),
  art:()=>`<div class="skann l5ann"><svg viewBox="0 0 100 100">${MONS['Mitranne, la Reine des Mites']()}</svg></div>`,go:'🪶 Lire le Livre V',fn:()=>{TAB='adv';UI.sgBook=5;try{UI.lz=UI.lz||{};UI.lz.adv=null;scrollTo(0,0)}catch(e){}}})}}catch(e){}return Lx}}catch(e){}
try{const it=[tr("🪶 <b>Nouveau : le Livre V du mode histoire</b>, « La Plume Grise » : 6 chapitres (27 à 32), après le Livre IV, débloqués avec le <b>mode Difficile</b> (étapes 1, 4, 8, 12, 16 et 20).","🪶 <b>New: Book V of story mode</b>, “The Grey Feather”: 6 chapters (27 to 32), after Book IV, unlocked with <b>Hard mode</b> (stages 1, 4, 8, 12, 16 and 20)."),
  tr("🌫️ La plume grise de Corvin ouvre une porte vers les Marges, là où va tout ce que le monde oublie… et où quelqu'un a très faim.","🌫️ Corvin's grey feather opens a door to the Margins, where everything the world forgets ends up… and where someone is very hungry."),
  tr("🎵 Une nouvelle musique (la berceuse de Corvin, qui chante faux), des souvenirs en vieux film, 6 nouveaux boss, deux fins, le titre « Celui qui chante faux » et le cadre « Plume Grise ».","🎵 New music (Corvin's lullaby, sung off-key), memories shown as old film, 6 new bosses, two endings, the title “The Off-Key Singer” and the “Grey Feather” frame.")];
 PATCH.unshift({v:'v76',d:Date.now(),t:tr('Livre V : La Plume Grise','Book V: The Grey Feather'),items:it})}catch(e){}

/* ---------- la berceuse de Corvin (elle chante faux, exprès) ---------- */
try{SONGS.marges={g:1,bpm:92,spb:2,bar:6,bars:16,prog:'Am F C G Am F E E Am Dm G C F Dm E Am',parts:[
  {i:'pad',f:'chord',lo:52,v:.7},
  {i:'sbass',f:'bass',lo:33,v:.3,pat:[[0,6,0]]},
  {i:'harp',f:'arp',lo:57,v:.4,pat:[0,2,4,3,2,1]},
  {i:'cel',f:'mel',v:.62,mel:'A4:2 C5:2 E5:2|F5:4 E5:2|E5:2 D5:2 C5:2|D5:6|A4:2 C5:2 E5:2|A5:4 G5:2|G#5:2 F5:2 D5:2|E5:6|C6:3 B5:1 A5:2|F5:4 A5:2|G5:3 F5:1 D5:2|E5:6|F5:2 A5:2 C6:2|D6:3 C6:1 Bb5:2|G#5:2 B5:2 D6:2|A5:6'},
  {i:'flute',f:'mel',v:.3,from:9,mel:'E5:6|D5:6|B4:6|C5:6|A4:6|A4:6|B4:6|C5:6'},
  {i:'bell',f:'mel',v:.2,mel:'A6:6|r:6|r:6|r:6|r:6|r:6|r:6|r:6|E6:6'}]};try{delete SONGC.marges}catch(e){}}catch(e){}

/* ---------- décors ---------- */
function sgBg5(k){const C=L5[k],[a,b,d]=C.bg,R=rng(k*631+29),f=n=>(+n).toFixed(0),id='l5b'+k,A=(at,v,du,ex)=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite"${ex||''}/>`;
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient>
   <radialGradient id="${id}g"><stop offset="0" stop-color="#fff6c0" stop-opacity=".9"/><stop offset=".5" stop-color="#ffd86a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd86a" stop-opacity="0"/></radialGradient>
   <radialGradient id="${id}s"><stop offset="0" stop-color="#f4f0ff" stop-opacity=".8"/><stop offset="1" stop-color="#f4f0ff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#${id})"/>`;
  const moths=(n,c,y0,y1)=>{let o='';for(let i=0;i<n;i++){const du=(5+R()*5).toFixed(1),x0=f(R()*400),x1=f(R()*400),ya=f(y0+R()*(y1-y0)),yb=f(y0+R()*(y1-y0));o+=`<g opacity=".85"><path d="M0 0Q-5 -6 -9 -4Q-9 1 -1 2ZM0 0Q5 -6 9 -4Q9 1 1 2Z" fill="${c||'#b8aec8'}"><animateTransform attributeName="transform" type="scale" values="1 1;.45 1;1 1" dur=".5s" repeatCount="indefinite"/></path><ellipse rx="1.2" ry="3.4" cy="1" fill="#3a3046"/><animateMotion dur="${du}s" begin="${(-R()*9).toFixed(1)}s" repeatCount="indefinite" path="M${x0} ${ya}Q${f(R()*400)} ${f(R()*700)} ${x1} ${yb}T${x0} ${ya}"/></g>`}return o};
  const shelves=(op,c)=>{let o='';for(let i=0;i<5;i++){const x=i*90-10;o+=`<path d="M${x} 700V${f(120+R()*80)}Q${x+40} ${f(60+R()*40)} ${x+80} ${f(120+R()*80)}V700Z" fill="${c}" opacity="${op}"/>`;for(let r=0;r<9;r++){o+=`<rect x="${x+8}" y="${200+r*52}" width="64" height="4" fill="#4a3a28" opacity="${op}"/>`;for(let q=0;q<7;q++)o+=`<rect x="${x+10+q*9}" y="${f(172+r*52+R()*6)}" width="7" height="${f(22+R()*6)}" fill="${['#7a4a3a','#4a5a4a','#6a5a3a','#4a4a6a','#7a6a4a'][Math.floor(R()*5)]}" opacity="${op}"/>`}}return o};
  const feather=(x,y,sc,rot)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})"><path d="M0 40Q-.6 20 0 -26" stroke="#5a5468" stroke-width="2" fill="none"/><path d="M0 -28Q-12 -16 -10.4 4Q-7 16 0 21Q7 16 10.4 4Q12 -16 0 -28Z" fill="#cfc9da" stroke="#3a3448" stroke-width="1.4"/><path d="M0 -20L-7 -13M0 -13L-8.6 -4.6M0 -5L-8.6 3M0 3L-7 9M0 -20L7 -13M0 -13L8.6 -4.6M0 -5L8.6 3M0 3L7 9" stroke="#8a849a" stroke-width="1"/></g>`;
  const words=(n,c,op)=>{let o='';const W=['souvenir','prénom','berceuse','maison','ami','jouet','chanson','hier','merci','toujours','village','Corvin'];for(let i=0;i<n;i++){const x=f(20+R()*330),y=f(60+R()*560),w=W[Math.floor(R()*W.length)],fs=f(12+R()*12);o+=`<g opacity="${op||.5}"><text x="${x}" y="${y}" font-family="serif" font-style="italic" font-size="${fs}" fill="${c}">${w}</text><path d="M${+x-2} ${+y-+fs*.3}h${f(w.length*+fs*.5)}" stroke="${c}" stroke-width="1.6"/>${A('opacity',`${op||.5};${(op||.5)*.3};${op||.5}`,(5+R()*5).toFixed(1))}</g>`}return o};
  if(k===0){/* la bibliothèque au crépuscule : le nid, Lumen qui brille, la plume grise qui pointe vers la petite porte */
    s+=shelves(.85,'#3a2a1a')+`<path d="M0 640Q100 580 200 620T400 600V700H0Z" fill="#241a10"/>`;
    s+=`<g transform="translate(330 560)"><rect x="-26" y="-64" width="52" height="64" rx="4" fill="#4a3424" stroke="#1a120a" stroke-width="3"/><path d="M-26 -64Q0 -86 26 -64" fill="#4a3424" stroke="#1a120a" stroke-width="3"/><rect x="-18" y="-56" width="36" height="52" fill="#fff6dc" opacity=".14">${A('opacity','.06;.22;.06',3)}</rect></g>`;
    s+=`<circle cx="110" cy="540" r="70" fill="url(#${id}g)">${A('r','62;78;62',2.6)}</circle><ellipse cx="110" cy="566" rx="56" ry="18" fill="#5a4024"/><path d="M58 562Q110 590 162 562" stroke="#7a5a34" stroke-width="5" fill="none"/>${[...Array(6)].map((_,i)=>`<path d="M${64+i*18} 556l8 -12l6 11Z" fill="#f4e8c8"/>`).join('')}<circle cx="110" cy="546" r="11" fill="#ffd86a"/><circle cx="106" cy="543" r="2" fill="#2a1a0a"/><circle cx="114" cy="543" r="2" fill="#2a1a0a"/>`;
    s+=`<g>${feather(220,420,1.3,58)}<animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" dur="3s" repeatCount="indefinite"/></g><path d="M240 430Q290 470 316 520" stroke="#f4f0ff" stroke-width="2" stroke-dasharray="3 7" fill="none" opacity=".6">${A('stroke-dashoffset','0;-20',1.2)}</path>`+moths(9,'#a89cb8',150,620)}
  else if(k===1){/* les Marges : du blanc, des lignes de cahier qui s'effacent, des mots barrés, une vieille photo qui flotte */
    for(let i=0;i<14;i++)s+=`<path d="M0 ${70+i*46}H400" stroke="#9ab0d8" stroke-width="1" opacity="${(.32-i*.018).toFixed(2)}"/>`;s+=`<path d="M48 0V700" stroke="#e8a0a0" stroke-width="1.4" opacity=".35"/>`;
    s+=words(12,'#5a5468',.45);
    for(let i=0;i<6;i++)s+=`<path d="M${f(30+R()*340)} ${f(80+R()*540)}q${f(R()*40-20)} -24 ${f(R()*60-30)} 6t${f(R()*40-20)} 18q-14 10 -30 2" stroke="#7a7488" stroke-width="1.4" fill="none" opacity=".35"/>`;
    s+=`<g transform="translate(250 230) rotate(8)"><rect x="-56" y="-44" width="112" height="88" fill="#e8d4a8" stroke="#8a6a3a" stroke-width="3"/><rect x="-46" y="-34" width="92" height="62" fill="#5a4630"/><circle cx="-14" cy="6" r="12" fill="#a8a2b4"/><circle cx="12" cy="14" r="8" fill="#a890ff"/><path d="M-30 -24l6 10l-10 2Z" fill="#fff6c0" opacity=".8">${A('opacity','0;.9;0',2.2)}</path><animateTransform attributeName="transform" type="translate" values="0 0;0 -10;0 0" dur="5s" repeatCount="indefinite" additive="sum"/></g>`;
    s+=moths(5,'#8a8098',80,600)}
  else if(k===2){/* le Fleuve Blanc : une rivière de pages, des gens qu'on voit à travers */
    s+=words(6,'#4a4458',.3);
    s+=`<path d="M0 420Q200 380 400 420V560Q200 520 0 560Z" fill="#f4f2f8" opacity=".85"/>`;
    for(let i=0;i<12;i++){const y=f(420+R()*110),du=(8+R()*6).toFixed(1);s+=`<g opacity=".9"><path d="M0 0h20v14h-20Z" fill="#ffffff" stroke="#b8b2c8" stroke-width="1"/><animateMotion dur="${du}s" begin="${(-R()*12).toFixed(1)}s" repeatCount="indefinite" path="M-30 ${y}Q200 ${+y-20} 430 ${y}"/></g>`}
    const ghost=(x,y,sc)=>`<g transform="translate(${x} ${y}) scale(${sc})" opacity=".26"><circle cx="0" cy="-58" r="12" fill="#e8e4f4"/><path d="M-16 0V-36Q0 -48 16 -36V0Z" fill="#e8e4f4"/>${A('opacity','.3;.12;.3',(4+R()*3).toFixed(1))}</g>`;
    s+=ghost(60,410,1)+ghost(110,404,.7)+ghost(330,412,1.1)+ghost(270,600,.9)+ghost(90,640,.8);
    s+=`<g transform="translate(200 640)"><path d="M-40 0h80l-6 -18h-68Z" fill="#ffffff" stroke="#b8b2c8"/><path d="M-30 -18h60l-4 -14h-52Z" fill="#f4f2f8" stroke="#b8b2c8"/><circle cx="0" cy="-48" r="15" fill="#a8a2b4" opacity=".75"/><path d="M-10 -60l3 -10l5 8M10 -60l-3 -10l-5 8" fill="#a8a2b4" opacity=".75"/></g>`+moths(8,'#8a8098',300,680)}
  else if(k===3){/* le Palais de la Lampe : une lampe de fer éteinte, des cocons partout */
    s+=`<path d="M200 0V120" stroke="#5a5068" stroke-width="4"/><g transform="translate(200 150)"><path d="M-40 -30H40L52 30H-52Z" fill="#2a2434" stroke="#5a5068" stroke-width="3"/><path d="M-30 -30V30M0 -30V30M30 -30V30" stroke="#5a5068" stroke-width="2"/><path d="M-54 30H54L40 44H-40Z" fill="#3a3448"/><path d="M-30 -30Q0 -56 30 -30" fill="#3a3448"/></g>`;
    for(let i=0;i<16;i++){const x=f(20+R()*360),y=f(60+R()*420),l=f(20+R()*90),sc=(.5+R()*.8).toFixed(2);s+=`<path d="M${x} 0V${y}" stroke="#cfc9da" stroke-width=".8" opacity=".5"/><g transform="translate(${x} ${y}) scale(${sc})"><path d="M0 0Q12 6 13 28Q12 50 0 56Q-12 50 -13 28Q-12 6 0 0Z" fill="#d8d2e4" opacity=".85"/><path d="M-11 18Q0 24 11 16M-12 34Q0 40 12 32" stroke="#ffffff" stroke-width="1.2" fill="none" opacity=".6"/><animateTransform attributeName="transform" type="rotate" values="-3;3;-3" dur="${(4+R()*3).toFixed(1)}s" repeatCount="indefinite" additive="sum"/></g>`}
    for(let i=0;i<10;i++){const x=f(20+R()*360),y=f(520+R()*160);s+=`<g opacity=".9"><circle cx="${x}" cy="${y}" r="2" fill="#e0a83a"/><circle cx="${+x+8}" cy="${y}" r="2" fill="#e0a83a"/>${A('opacity','.15;.9;.15',(2+R()*3).toFixed(1))}</g>`}
    s+=`<path d="M0 640Q200 610 400 640V700H0Z" fill="#05040a"/>`+moths(10,'#6a6078',100,640)}
  else if(k===4){/* le nid d'en haut : l'orage par la grande fenêtre ronde, les lettres d'or qui montent */
    s+=`<rect width="400" height="700" fill="#fff" opacity="0">${A('opacity','0;0;0;.55;0;0;0;0;.35;0;0;0',6)}</rect>`;
    s+=`<circle cx="200" cy="250" r="150" fill="#1a1a34" stroke="#4a3a28" stroke-width="14"/><path d="M200 100V400M50 250H350" stroke="#4a3a28" stroke-width="8"/>`;
    s+=`<path d="M150 120L130 190L160 190L136 260" stroke="#e8e4ff" stroke-width="3" fill="none" opacity="0">${A('opacity','0;0;0;1;0;0;0;0;.7;0;0;0',6)}</path>`;
    for(let i=0;i<4;i++)s+=`<path d="M${i%2?350:50} ${i<2?110:390}L${i%2?300:100} ${i<2?160:340}M${i%2?350:50} ${i<2?150:350}Q${i%2?320:80} ${i<2?140:360} ${i%2?310:90} ${i<2?110:390}" stroke="#efeaf8" stroke-width="1.4" fill="none" opacity=".7"/>`;
    s+=`<path d="M0 520Q200 480 400 520V700H0Z" fill="#2a2030"/><ellipse cx="200" cy="560" rx="110" ry="30" fill="#5a4024"/><path d="M96 556Q200 596 304 556" stroke="#7a5a34" stroke-width="6" fill="none"/>${[...Array(9)].map((_,i)=>`<path d="M${108+i*22} 548l9 -14l7 13Z" fill="#f4e8c8"/>`).join('')}`;
    s+=`<circle cx="200" cy="520" r="64" fill="url(#${id}g)">${A('r','56;70;56',1.8)}</circle>`;
    const LT='CORVINFRÈRE♪';for(let i=0;i<12;i++){const x=f(140+R()*120),du=(4+R()*3).toFixed(1);s+=`<text font-family="serif" font-size="${f(14+R()*8)}" fill="#ffd86a" opacity="0">${LT[i]}<animateMotion dur="${du}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M${x} 520Q${f(R()*400)} 300 ${f(100+R()*200)} 60"/>${A('opacity','0;1;0',du)}</text>`}
    s+=moths(6,'#e8e4f0',100,500)}
  else{/* le ciel de la bibliothèque : les ailes de la Reine couvrent l'orage, la lumière de Lumen au centre */
    s+=`<g opacity=".9"><path d="M200 330Q120 120 0 80V420Q100 400 200 360Z" fill="#2a2240"/><path d="M200 330Q280 120 400 80V420Q300 400 200 360Z" fill="#2a2240"/>
     <circle cx="90" cy="220" r="34" fill="#e0a83a" opacity=".85"/><circle cx="90" cy="220" r="22" fill="#f4ecd8"/><circle cx="90" cy="220" r="13" fill="#0c0616">${A('r','13;15;13',3)}</circle>
     <circle cx="310" cy="220" r="34" fill="#e0a83a" opacity=".85"/><circle cx="310" cy="220" r="22" fill="#f4ecd8"/><circle cx="310" cy="220" r="13" fill="#0c0616">${A('r','13;15;13',3)}</circle></g>`;
    s+=`<path d="M120 700V470L200 400L280 470V700Z" fill="#1a1428"/><path d="M150 700V500H250V700Z" fill="#241c34"/><rect x="186" y="520" width="28" height="44" rx="14" fill="#ffd86a" opacity=".6"/>`;
    s+=`<circle cx="200" cy="430" r="120" fill="url(#${id}g)">${A('r','100;140;100',2.4)}</circle>`;
    for(let i=0;i<12;i++){const t=i*Math.PI/6;s+=`<path d="M200 430L${f(200+Math.cos(t)*220)} ${f(430+Math.sin(t)*220)}" stroke="#fff6c0" stroke-width="${i%2?2:4}" opacity=".25">${A('opacity','.08;.35;.08',(2+i%3).toFixed(1))}</path>`}
    for(let i=0;i<24;i++){const x=f(R()*400),du=(3+R()*3).toFixed(1);s+=`<circle r="${(1+R()*1.6).toFixed(1)}" fill="#efe8ff"><animateMotion dur="${du}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M${x} -10q${f(R()*40-20)} 360 ${f(R()*60-30)} 720"/>${A('opacity','0;.9;0',du)}</circle>`}
    s+=moths(12,'#b8aec8',60,600)}
  return s+'</svg>'}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
#sgov .sgfig.owlf{width:100%!important;height:44%!important;position:relative;filter:drop-shadow(0 4px 10px rgba(0,0,0,.4))}
#sgov .sgfig.owlf svg.owl5{width:100%!important;height:100%!important}
.sgfig.crvf{filter:grayscale(.6) drop-shadow(0 0 14px rgba(220,214,240,.5))}
.sgfig.crvf>svg{animation:crv5fade 3.4s ease-in-out infinite}
@keyframes crv5fade{0%,100%{opacity:.9}50%{opacity:.6}}
.sgfig.crv5{filter:drop-shadow(0 0 18px rgba(255,232,176,.65))}
.sgfig.mitf{filter:drop-shadow(0 0 18px rgba(216,200,255,.45))}
#sgov.bk5 .sgchip{background:rgba(54,46,78,.9);color:#f4f0ff}
#sgov.bk5:not(.fbmode) .sgbox{border-color:rgba(214,206,232,.6)!important;box-shadow:0 0 0 2px rgba(255,232,160,.18),0 10px 30px rgba(0,0,0,.5)}
.sgcard.bk5{background:radial-gradient(120% 140% at 85% 0%,rgba(214,206,232,.22),transparent 60%),radial-gradient(80% 100% at 0% 100%,rgba(255,216,106,.12),transparent 60%),var(--panel)!important;border-color:rgba(214,206,232,.55)!important}
.bk5b{background:linear-gradient(180deg,#e8e2f4,#8a82a8 55%,#4a4266)!important;color:#fff!important;text-shadow:0 1px 2px rgba(0,0,0,.45)}
.sgfrags.bk5 i.on{background:#4a4266;border-color:#f4f0ff}
.sgrw.bk5 .sgfrag{filter:drop-shadow(0 0 14px rgba(255,232,160,.8))}
.sgrw.bk5 .l5big{width:150px;height:170px;margin:0 auto 4px;border-radius:18px;overflow:hidden;background:radial-gradient(circle at 50% 35%,#4a4266,#14101e);box-shadow:0 0 22px -6px #ffe8b0}
.sgrw.bk5 .l5big svg{width:100%;height:100%}
.bk5pl{position:relative;overflow:visible!important}.bk5pl .l5fth{position:absolute;right:-8%;top:-10%;width:34%;height:auto;transform:rotate(22deg);filter:drop-shadow(0 1px 2px rgba(0,0,0,.4))}
.l5ann svg{height:100%;width:auto}
.sgcard .chips.sgbk{flex-wrap:wrap!important;overflow:visible!important;row-gap:6px}
.fav.frm-plumegrise{--fd:#1a1626;--gc:#d6d0e4;animation:fpulse 3.2s ease-in-out infinite}
.fav.frm-plumegrise::before{background:linear-gradient(160deg,rgba(255,255,255,.5),transparent 42%,rgba(0,0,0,.3)),conic-gradient(from var(--fa),#d6d0e4,#6e687c,#f4f0ff,#ffd86a,#d6d0e4,#4a4266,#b8b2c4,#d6d0e4);animation:fspin 7s linear infinite}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{const E2={'Livre V : La Plume Grise 🪶':'Book V: The Grey Feather 🪶','🪶 Lire le Livre V':'🪶 Read Book V','🪶 Livre V':'🪶 Book V','📜 Livre IV':'📜 Book IV','🦉 Livre III':'🦉 Book III','🃏 Livre II':'🃏 Book II',
  '🪶 Livre V · La Plume Grise':'🪶 Book V · The Grey Feather',"Quelqu'un fredonne faux dans les Marges · # chapitres":'Someone is humming off-key in the Margins · # chapters',"Quelqu'un fredonne faux dans les Marges · #/# chapitres":'Someone is humming off-key in the Margins · #/# chapters',
  'Étape # du mode Difficile':'Hard mode stage #',"🔒 Prochain chapitre à l'étape # du mode <b>Difficile</b> (tu en es à #).":'🔒 Next chapter at <b>Hard</b> mode stage # (you are at #).',
  '🪶 La plume grise est dans le chapeau de Plume. Et le soir, deux hiboux chantent faux.':"🪶 The grey feather is in Plume's hat. And in the evening, two owls sing off-key.",
  'Mode histoire · Livre V · chapitre #':'Story mode · Book V · chapter #','Mode histoire · Livre V · chapitre # · Combat final':'Story mode · Book V · chapter # · Final battle',
  'La chanson est finie':'The song is over','Fin de la Note avalée : seuls Plume, Lumen et toi vous souvenez de Corvin.':'Swallowed Note ending: only Plume, Lumen and you remember Corvin.',
  'Fin du Royaume qui se souvient : tout le royaume se souvient de Corvin.':'Remembering Kingdom ending: the whole kingdom remembers Corvin.','🏷️ Titre « Celui qui chante faux »':'🏷️ Title “The Off-Key Singer”','🖼️ Cadre « Plume Grise »':'🖼️ “Grey Feather” frame',
  '♪ Dors, petite plume, le vent ne te prendra pas… ♪':"♪ Sleep, little feather, the wind won't take you away… ♪",'Hou hou houuu ! 🪶':'Hoo hoo hooo! 🪶',"Continuer l'aventure":'Continue the adventure','MODE HISTOIRE':'STORY MODE',
  'Mitranne, la Reine des Mites':'Mitranne, Queen of the Moths'};
 L5.forEach((c,k)=>{const en=EN[c.t]||c.t;E2[`${c.ic} ${c.t}`]=`${c.ic} ${en}`;E2[`#. ${c.t}`]=`#. ${en}`;E2[`▶️ ${c.ic} Chapitre # : ${c.t}`]=`▶️ ${c.ic} Chapter #: ${en}`;E2[`« ${c.t} »`]=`“${en}”`});
 Object.assign(I18N_EN,EN,E2)}catch(e){}
}catch(e){console.warn('livre V',e)}})();
