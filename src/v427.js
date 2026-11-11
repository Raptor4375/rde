/* ================= V427 : ESSAI DES NOUVEAUX HÉROS + LA CHRONIQUE DE PERRIN =================
   Comme pendant l'événement du Roi de Cendre : dans le mode histoire (chroniques comprises),
   les nouveaux héros que tu n'as pas encore te sont prêtés pour les essayer.
   Dans sa propre chronique, le héros est déjà placé dans l'équipe. */
(function(){try{
if(typeof window.RDEaddChron!=='function'||typeof PRN==='undefined')return;
/* ---------- la chronique de Perrin ---------- */
try{Object.assign(NMAP,{
 'Pillard du Gué':{base:'Chevalier Déchu',o:{to:32,sat:.4,light:.85},ov:['armor']},
 'Chien des Marais':{base:'Cerbère',o:{to:88,sat:.32,light:.72},ov:['spectral']},
 'Chef des Pillards':{base:'Troll des Neiges',o:{to:28,sat:.5,light:.85},ov:['armor','crown']},
 'Noyé du Gué':{base:'Spectre Noyé',o:{to:188,sat:.38,light:.82},ov:['spectral']},
 'Lancier Noyé':{base:'Chevalier Déchu',o:{to:190,sat:.36,light:.76},ov:['spectral','frost']},
 'Le Capitaine Noyé':{base:'Liche',o:{to:194,sat:.46,light:.86},ov:['spectral','crown']},
 'Soldre, le Commandant Noyé':{base:'Chevalier Déchu',o:{to:198,sat:.58,light:.8},ov:['crown','armor','spectral']}})}catch(e){}
try{if(!SAGA_WHO.perrin)SAGA_WHO.perrin={n:'Perrin',c:'#8ab4ff'}}catch(e){}
const aegisDone=()=>{try{return!!(S.hchr&&S.hchr.d&&S.hchr.d['1_2'])}catch(e){return false}};
window.RDEaddChron({id:'perrin',hero:PRN,ic:'🛡️',n:'Le Gué du Commandant',col:'#8ab4ff',gift:()=>PRN,
 req:aegisDone,reqTxt:"Termine d'abord « Le Mur qui Reste » (Aegis)",
 tag:"Six mois après la chute du pont, quelqu'un garde encore le gué de Varne. Personne ne lui a dit d'arrêter.",
 ttl:{k:'gueduc',n:'Ici, un garçon a tenu',d:'Terminer la chronique « Le Gué du Commandant »'},
 end:"« Ici, un garçon a tenu. »",
 ch:[
 {t:"Personne ne lui a dit d'arrêter",ic:'🪧',place:'Gué de Varne',bg:['#d8e4f0','#6a8aa8','#141c28'],mus:'dungeon',rw:120,
  mins:[['Pillard du Gué',32],['Chien des Marais',88]],boss:{n:'Chef des Pillards',h:28},bsk:{n:'Taxe du gué',fx:{dmg:100,weak:1}},
  intro:[['narr',"Six mois après la chute du pont de Varne, la rivière a changé de lit. Là où il y avait un pont, il y a maintenant un gué : de l'eau jusqu'aux genoux, des pierres glissantes, et une pancarte."],
   ['plume',"« GARDE D'ÉTHER — PASSAGE SURVEILLÉ. » Hou… La Garde n'a pas été dissoute ?"],
   [69,"Si. Depuis six mois."],
   ['narr',"Au milieu du gué, sur une pierre plate, un garçon est assis avec un casque trop grand et un bouclier qui lui arrive au menton. Il se lève d'un bond en nous voyant."],
   ['perrin',"Halte ! Qui va là ? Le passage est surveillé !"],
   [69,"…Perrin ?"],
   ['perrin',"Com… Commandant ?!"],
   ['narr',"Il fait un salut si raide qu'il manque de tomber dans la rivière."],
   [69,"Qu'est-ce que tu fais là, petit ? Je t'ai dit de rentrer chez toi."],
   ['perrin',"Vous m'avez dit que ce n'était pas le bouclier qui tenait le mur. Alors j'ai gardé le bouclier pour rien, et je suis resté pour le gué."],
   ['plume',"Depuis six mois ?! Tout seul ?!"],
   ['perrin',"Il y a des gens qui traversent tous les jours. Des marchands, des familles. Et il y a d'autres gens, qui ne veulent pas qu'ils traversent."],
   ['narr',"Sur l'autre rive, une dizaine d'hommes sortent des roseaux, des gourdins à la main. Ils n'ont pas l'air surpris de voir Perrin. Ils ont l'air d'avoir l'habitude."],
   {ch:[["🛡️ Laisser Perrin tenir le gué, et le couvrir",'cmp',"C'est son poste. On l'aide, on ne le remplace pas."],["⚔️ Charger les pillards tous ensemble",'brv',"Six mois, c'est assez pour un seul garçon."]]},
   ['perrin',"Ils viennent tous les mardis. Je crois qu'aujourd'hui, c'est mardi."]],
  outro:[['narr',"Les pillards repartent dans les roseaux en tirant leur chef par les pieds. Perrin s'assoit sur sa pierre plate, les jambes qui tremblent."],
   ['perrin',"D'habitude, j'en arrête deux ou trois, et les autres passent quand même. C'est la première fois qu'ils reculent tous."],
   [69,"Perrin. Tu as mangé quand, la dernière fois ?"],
   ['perrin',"Hier. Ou avant-hier. Les marchands me donnent du pain quand ils passent."],
   ['narr',"Dans sa besace, sous le pain sec, il y a une lettre. Le cachet n'est pas brisé."],
   ['plume',"Hou… C'est de ta maman, ça ? Tu ne l'as pas ouverte ?"],
   ['perrin',"Si je l'ouvre, elle va me demander de rentrer. Et si elle me demande de rentrer, je vais rentrer."]]},
 {t:'Ce qui remonte la nuit',ic:'🏮',place:'Le gué, à minuit',bg:['#1a2a3a','#2a4a5a','#06101a'],mus:'dungeon',rw:135,
  mins:[['Noyé du Gué',188],['Lancier Noyé',190]],boss:{n:'Le Capitaine Noyé',h:194},bsk:{n:'Eau froide',fx:{dmg:110,stun:20}},
  intro:[['narr',"On a voulu repartir avant la nuit. Perrin nous a demandé de rester. Il n'a pas dit pourquoi : il a juste allumé trois lanternes au bord de l'eau, et il a attendu."],
   ['perrin',"Vous vous souvenez de l'armée de Soldre ? Celle qui était sur le pont quand il est tombé ?"],
   [69,"…Trois cents hommes."],
   ['perrin',"Ils sont toujours là. Dans la rivière. Et la nuit, ils essaient de finir de traverser."],
   ['narr',"À minuit, l'eau du gué devient immobile. Puis des casques remontent à la surface, un par un, rangés en colonne, avec de l'algue dans les visières."],
   ['plume',"HOU. HOU. HOU."],
   [71,"Depuis combien de temps tu fais ça, Perrin ?"],
   ['perrin',"Depuis la première nuit. Je ne l'ai dit à personne. Qui m'aurait cru ?"],
   [69,"Moi."],
   ['perrin',"…Vous n'étiez pas là, commandant."],
   ['narr',"Aegis ne répond pas. Il dégaine, et il vient se placer à côté du garçon, au bord de l'eau, exactement comme on se place à côté de quelqu'un."],
   {ch:[["🕯️ Garder les lanternes allumées",'cmp',"La lumière les ralentit. Si elle s'éteint, ils passent tous."],["⚔️ Les repousser dans la rivière",'brv',"Chaque nuit, ils remontent un peu plus nombreux."]]},
   ['perrin',"Ne les regardez pas dans les yeux. Ils ont l'air de gens qu'on connaît."]],
  outro:[['narr',"Le capitaine noyé retombe dans l'eau, et sa colonne avec lui. Les lanternes tremblent, mais elles tiennent."],
   [69,"Ils reviendront demain."],
   ['perrin',"Oui. Et après-demain. Tant qu'ils n'auront pas traversé, ils reviendront."],
   ['narr',"Au fond du gué, quelque chose de rouge brille sous l'eau. Une armure. Une couronne de fer tordue. Elle ne bouge pas encore."],
   [69,"…Soldre."],
   ['perrin',"C'est lui qui les commande. Il ne sort jamais. Il attend que je sois assez fatigué."],
   ['plume',"Et tu es fatigué ?"],
   ['perrin',"Depuis cinq mois."]]},
 {t:'Rentre chez toi',ic:'🏠',place:"Le gué, avant l'aube",bg:['#3a4a6a','#8a9ac8','#0e1424'],mus:'dungeon',rw:170,
  mins:[['Lancier Noyé',190],['Noyé du Gué',188]],boss:{n:'Soldre, le Commandant Noyé',h:198},bsk:{n:"L'exemple",fx:{dmg:122,dot:38,weak:1}},
  intro:[['narr',"La troisième nuit, Perrin s'endort contre son bouclier une heure avant minuit. Aegis le laisse dormir."],
   ['narr',"Quand l'eau s'immobilise, ce n'est pas une colonne qui remonte. C'est une armée entière, en rangs serrés. Et devant elle, une armure rouge qui marche sur le fond de la rivière comme on marche dans une rue."],
   ['narr',"« Commandant Aegis », dit l'eau, avec la voix de Soldre. « Je t'avais dit qu'on ne tient pas un royaume sans exemples. Le gamin, là. C'est ton exemple. Il est en train de mourir de toi. »"],
   [69,"Il est en train de vivre de moi. Ce n'est pas pareil."],
   ['narr',"Perrin se réveille en sursaut et attrape son bouclier à l'envers."],
   ['perrin',"Commandant ! Vous auriez dû me réveiller !"],
   [69,"Non. Cette nuit, c'est mon tour. Toi, tu vas rentrer chez toi."],
   ['perrin',"Mais—"],
   [69,"C'est un ordre, Perrin. Le dernier. Après celui-là, tu n'en recevras plus jamais de personne."],
   {ch:[["🛡️ Tenir le gué tous ensemble",'cmp',"Personne ne tient un gué seul. Pas même le commandant."],["⚔️ Aller chercher Soldre au fond de l'eau",'brv',"Tant qu'il est là-dessous, ils remonteront toutes les nuits."]]},
   ['perrin',"…Je désobéis, commandant. Juste cette fois. Après, je rentre. Promis."]],
  outro:[['narr',"Soldre tombe à genoux au milieu du gué, et cette fois, il ne remonte pas. La rivière l'emporte vers l'aval avec ses trois cents hommes, très lentement, comme on raccompagne quelqu'un."],
   ['narr',"À l'aube, l'eau n'est plus que de l'eau. Un héron se pose sur la pierre plate de Perrin, et personne ne le chasse."],
   ['perrin',"Ils ont traversé. Enfin."],
   ['narr',"Il sort la lettre de sa besace et brise le cachet. Ses mains tremblent encore."],
   ['perrin',"« Mon petit, ta sœur se marie dans deux semaines. Reviens si tu peux. Si tu ne peux pas, on comprendra. On est fiers de toi. »"],
   ['plume',"C'est… c'est quand, deux semaines ?"],
   ['perrin',"Elle date de quatre mois."],
   ['narr',"Il rit. Puis il pleure. Puis il fait les deux en même temps, comme on fait à dix-sept ans quand on a tenu trop longtemps."],
   [69,"Rentre chez toi, Perrin."],
   ['perrin',"Oui, commandant. Pour une fois, je rentre."],
   ['narr',"Il est rentré. Sa sœur lui a pardonné en trois minutes, sa mère en trois secondes. Au gué de Varne, on a remplacé la pancarte par une pierre gravée : « Ici, un garçon a tenu. »"]]}]});
}catch(e){console.warn('chronique perrin',e)}})();

/* ---------- l'essai gratuit des nouveaux héros ---------- */
(function(){try{
const NEWS=()=>{const L=[];for(const f of[()=>ERY,()=>AEG,()=>LYR,()=>SOR,()=>CRV,()=>MARN,()=>GAR,()=>ORG,()=>PRN])try{const i=f();if(typeof i==='number'&&HEROES[i])L.push(i)}catch(e){}return L};
/* l'écran « Choisir ses héros » (v372) les prête tous dans le mode histoire… */
window.RDEtrialMore=NEWS;
/* …et, dans sa propre chronique, place déjà le héros dans l'équipe */
window.RDEtrialFav=ctx=>{try{if(ctx&&ctx.kind==='story'&&window.RDEhc){const h=RDEhc.heroOfChapter(ctx.c);if(h!=null)return h}}catch(e){}return null};
/* sur la fiche d'un nouveau héros qu'on n'a pas encore : « L'essayer » */
const chronOf=id=>{try{return window.RDEhc?RDEhc.heroChron(id):-1}catch(e){return-1}};
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);
  try{id=+id;if(!S.heroes[id]&&NEWS().includes(id)){const ci=chronOf(id),mo=document.querySelector('#ovl .modal');
    if(mo&&!mo.querySelector('.hctry')){const btn=ci>=0
        ?`<button class="btn g hctry" data-a="hctry" data-v="${ci}">🎁 L'essayer gratuitement dans sa chronique</button>`
        :`<div class="pkinfo hctry">🎁 <b>Essai gratuit</b> : il t'est prêté dans les combats du mode histoire.</div>`;
      const sk=mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('beforebegin',`<div style="margin:8px 0">${btn}</div>`);
      /* et on dit qu'on peut aussi le gagner au bout de sa chronique */
      if(ci>=0){const C=RDEhc.list()[ci];let g=null;try{g=typeof C.gift==='function'?C.gift():C.gift}catch(er){}
        if(g===id)for(const el of mo.querySelectorAll('.muted'))if(el.textContent.trim()==='Pas encore débloqué. Obtiens-le par invocation.'){el.innerHTML=`Pas encore débloqué. Obtiens-le par invocation, ou en terminant sa chronique <b>« ${esc(C.n)} »</b>.`;break}}}}}catch(e){}
  return r}}
/* sur les bannières de Garance et d'Orgemme : « L'essayer d'abord » */
{const ps=pSummon;pSummon=function(){let h=ps.apply(this,arguments);
  try{const k=UI.ban,hid=k==='ev_garance'?GAR:k==='ev_orgemme'?ORG:null;
    if(hid!=null&&!S.heroes[hid]){const ci=chronOf(hid);if(ci>=0)h=h.replace('<div class="evperk">',`<button class="btn sm hctry bn" data-a="hctry" data-v="${ci}">🎁 L'essayer d'abord, gratuitement</button><div class="evperk">`)}}catch(e){}
  return h}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="hctry"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
  try{closeModal()}catch(er){}setTimeout(()=>{try{RDEhc.open(+b.dataset.v)}catch(er){}},60)},true);
const st=document.createElement('style');st.textContent=`.hctry.btn{width:100%}.pkinfo.hctrial{margin:0 0 8px}.hctry.bn{margin:0 0 8px;background:rgba(255,216,74,.12);border:1px solid rgba(255,216,74,.55);color:#ffe9a8;box-shadow:none;font-weight:900}`;document.head.appendChild(st);
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(!L.some(a=>a.k==='v55'))L.unshift({k:'v55',ac:'#8ab4ff',tag:'NOUVEAU',t:'Essaie les nouveaux héros 🎁',
  x:"Comme pendant l'événement du Roi de Cendre : dans le <b>mode histoire</b> et les <b>Chroniques des Héros</b>, les nouveaux héros que tu n'as pas encore te sont <b>prêtés gratuitement</b> pour les essayer.<br><br>Dans sa propre chronique, le héros est <b>déjà placé dans ton équipe</b>. Sur sa fiche et sur sa bannière, un bouton <b>« L'essayer »</b> t'y emmène directement.<br><br>Et Perrin a enfin sa chronique à lui : <b>Le Gué du Commandant</b>, juste après celle d'Aegis.",
  art:()=>`<div class="skann v55ann">${typeof prnBody==='function'?prnBody(0):''}</div>`,go:'📖 Voir les chroniques',fn:()=>{TAB='adv';try{scrollTo(0,0)}catch(e){}}})}catch(e){}return L}}catch(e){}
const st2=document.createElement('style');st2.textContent=`.skann.v55ann{display:flex;justify-content:center}.skann.v55ann svg,.skann.v55ann img{height:160px;width:auto}`;document.head.appendChild(st2);
try{PATCH.unshift({v:'v55',d:Date.now(),t:'Essai des nouveaux héros',items:[
 "🎁 <b>Essai gratuit</b> : dans le mode histoire et les Chroniques des Héros, Éryndel, Aegis, Lyra, Sorën, Corvin, Marn, Garance, Orgemme et Perrin te sont prêtés tant que tu ne les as pas.",
 "Dans sa propre chronique, le héros est déjà placé dans ton équipe. Bouton « L'essayer » sur sa fiche et sur sa bannière.",
 "🛡️ Nouvelle chronique : <b>Le Gué du Commandant</b> (Perrin), après « Le Mur qui Reste ».",
 "🎨 Marn, Rouge-Garance, Orgemme, Perrin et Corvin redessinés dans le style des autres héros."]})}catch(e){}
}catch(e){console.warn('essai v427',e)}})();
