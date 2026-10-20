
/* ================= V24 : VOIX DES HÉROS, MUSIQUE DU PODIUM, ACCÈS AUX MP ================= */
/* g : f/m · v : normal, deep (grave), old (âgé), young (jeune), eerie (étrange) · l : présentation, réplique, cri de guerre */
const VOXD=[
 ['m','normal',["Bram, garde du royaume. Reste derrière mon bouclier.","Tant que je tiens debout, personne ne passe.","Bouclier en avant !"]],
 ['f','normal',["Lysa Lame-Vive. Mes deux lames n'attendent que toi.","On m'a dit que j'étais rapide. Ils n'ont rien vu.","Taille croisée !"]],
 ['m','young',["Salut ! Moi c'est Pip, le meilleur archer du village !","Une pomme sur ta tête ? Non ? Dommage.","Double flèche !"]],
 ['f','normal',["Mira, herboriste. J'ai une plante pour chaque blessure.","Bois ça. Oui, ça a mauvais goût. Ça marche.","Cataplasme !"]],
 ['m','deep',["Torv. Je tape. Fort.","Réfléchir ? Pourquoi faire, j'ai une hache.","Chaaarge !"]],
 ['f','young',["Nell Étincelle ! Attention, ça brûle un peu.","J'ai encore mis le feu à mes sourcils…","Boule de feu !"]],
 ['m','normal',["Kito… Tu ne m'as pas entendu arriver, hein ?","Les ombres sont mes meilleures amies.","Coup sournois."]],
 ['m','deep',["Gorm Peau-Dure ! Frappe-moi, pour voir.","Ma peau est plus dure que ton armure.","Venez vous battre !"]],
 ['f','normal',["Sela Vent-Rapide. Le vent guide mes flèches.","Je suis déjà partie avant que tu me voies.","Rafale !"]],
 ['m','deep',["Dorn Brise-Roc. Les montagnes tremblent quand je marche.","Une pierre, c'est juste un rocher qui n'a pas encore rencontré mon marteau.","Que la terre tremble !"]],
 ['f','normal',["Ivy Ronce. La forêt me prête sa force.","Les ronces protègent ceux que j'aime.","Écorce, protège-les !"]],
 ['m','eerie',["Kael… Je ne suis qu'une fumée qui passe.","Tu respires ? Respire bien, c'est peut-être la dernière fois.","Baiser de l'ombre."]],
 ['m','normal',["Oren Givre. Le froid ne me fait plus rien.","Garde ton sang-froid. Moi, j'ai tout gelé.","Lance de givre !"]],
 ['f','normal',["Hilda Rempart. Je suis un mur, et les murs ne reculent pas.","Mon bouclier a connu cent batailles.","Mur de fer !"]],
 ['m','old',["Fen Écorce… Les arbres m'ont tout appris, petit.","La sève coule lentement, mais elle guérit toujours.","Pluie de sève !"]],
 ['m','normal',["Rook Carreau. Un carreau, une cible.","Mon arbalète ne rate jamais. Moi, parfois.","Carreau perforant !"]],
 ['f','eerie',["Zara Dague-Noire. Une égratignure suffit.","Le poison, c'est de l'art. Lent, mais certain.","Lame empoisonnée."]],
 ['m','young',["Milo Tisseflamme, apprenti… enfin, presque maître !","Je tisse les flammes comme d'autres tissent la laine.","Vague de flammes !"]],
 ['m','normal',["Bastien Fer-de-Lance, chevalier du roi.","L'honneur avant tout. Et la lance juste après.","Double estoc !"]],
 ['f','normal',["Una Marée. La mer m'obéit… la plupart du temps.","Écoute les vagues, elles disent ton nom.","Marée vorace !"]],
 ['m','deep',["Grumm… protéger… les petits.","Grumm… solide. Grumm… pas bouger.","Grumm écrase !"]],
 ['f','young',["Tess Lanterne ! Je garde toujours une petite lumière pour vous.","Même dans la nuit la plus noire, une flamme suffit.","Lueur vaillante !"]],
 ['m','normal',["Vex Griffe. Je chasse la nuit.","Mes griffes sentent la peur.","Griffe fatale !"]],
 ['m','normal',["Jorah Fronde. Une pierre bien lancée vaut une épée.","On se moque de ma fronde. Plus après.","Pierre étourdissante !"]],
 ['m','normal',["Aurel d'Argent, paladin de la lumière.","La justice est lente, mais ma lame est rapide.","Jugement d'argent !"]],
 ['f','normal',["Selene Arc-de-Lune. La lune veille sur moi.","Mes flèches brillent comme des rayons de lune.","Pluie lunaire !"]],
 ['f','eerie',["Morgane Venin… Approche, n'aie pas peur.","Mille piqûres, et pas une seule douleur… au début.","Mille piqûres !"]],
 ['m','deep',["Thalos le Colosse. Je suis la montagne qui marche.","Tes coups me chatouillent.","Onde de choc !"]],
 ['f','normal',["Elyra Chant-d'Aube. Ma voix réveille le soleil.","Chaque matin, je chante pour ceux qui se battent.","Hymne de l'aube !"]],
 ['m','normal',["Riven Fendeur. L'orage est mon compagnon de route.","Je fends la pluie, le vent et les boucliers.","Fendoir !"]],
 ['m','normal',["Kaze Lame-Fantôme. Mes lames dansent seules.","Le silence avant la tempête… c'est moi.","Danse des lames !"]],
 ['f','normal',["Pyra l'Ardente ! Mon cœur est un brasier.","Je n'ai jamais froid. Jamais.","Brasier !"]],
 ['m','deep',["Bors l'Enclume. Forgé dans le feu, trempé dans la bataille.","Frappe autant que tu veux, je suis une enclume.","Bastion !"]],
 ['f','normal',["Nimue la Source. L'eau pure lave toutes les blessures.","Calme-toi. Respire. La source est là.","Source purificatrice !"]],
 ['m','normal',["Cassian Fusilier. Poudre sèche, œil vif.","Un coup de fusil, et le silence revient.","Salve brisante !"]],
 ['f','eerie',["Ombrelle… Je vous couvre de mon ombre.","Le soleil brûle. Mon ombre protège.","Voile d'ombre."]],
 ['m','deep',["Grak Hache-Rouge ! Grak veut la bagarre !","Ma hache a soif. Toujours soif.","Frénésie !"]],
 ['f','eerie',["Vespera… J'étais vivante, il y a longtemps…","Entends-tu les murmures ? Ce sont les miens.","Hurlement spectral !"]],
 ['m','deep',["Hask Brise-Glace. Le Nord m'a forgé.","La glace ne se brise que si je le décide.","Prison de glace !"]],
 ['m','normal',["Lio Œil-de-Faucon. Je vois tout, de très loin.","Mon faucon et moi, on ne rate rien.","Tir du faucon !"]],
 ['m','normal',["Seth Sable. Le désert ne pardonne pas, moi non plus.","Le sable efface toutes les traces.","Morsure du désert !"]],
 ['m','deep',["Ragnar Tempête ! Le tonnerre répond à mon marteau !","Quand je lève mon marteau, le ciel gronde.","Marteau orageux !"]],
 ['f','normal',["Isolde Rose-Sang. M'accorderez-vous cette valse ?","Une rose, des épines… et beaucoup de sang.","Valse sanglante !"]],
 ['m','old',["Morrow… Les âmes perdues me suivent partout.","La mort n'est qu'un début, mon ami.","Moisson d'âmes !"]],
 ['f','normal',["Freya Bouclier-Vif. Mon bouclier brille pour vous protéger.","Restez derrière moi, je m'occupe du reste.","Égide !"]],
 ['m','old',["Calix l'Astrologue. Les étoiles m'ont parlé de toi.","Les astres sont alignés… pour ta victoire.","Alignement astral !"]],
 ['m','normal',["Zephyr Ouragan ! Accroche-toi bien !","Je suis le vent qui arrache les toits.","Ouragan de flèches !"]],
 ['f','normal',["Ashka, Reine-Cendre. Inclinez-vous.","De mes cendres, je renais toujours plus forte.","Pluie de cendres !"]],
 ['m','eerie',["Talon le Corbeau. Quand je passe, il ne reste que des plumes.","Le corbeau annonce la fin. Je suis le corbeau.","Exécution."]],
 ['f','deep',["Brunhild Forteresse. Je suis le dernier rempart.","Aucune armée n'a jamais franchi mes murs.","Forteresse !"]],
 ['m','old',["Lumen, prêtre de la lumière sacrée. Que la paix soit avec toi.","La lumière trouve toujours son chemin.","Lumière sacrée !"]],
 ['m','deep',["Draven Lance-Sanglante. Ma lance ne connaît pas la pitié.","Une lance, un ennemi. Toujours.","Empalement !"]],
 ['f','normal',["Kiara la Sniper. Respire… vise… tire.","Je t'ai dans ma lunette depuis trois minutes.","Balle céleste !"]],
 ['f','normal',["Yuki Neige-Éternelle. L'hiver ne finit jamais avec moi.","Chaque flocon est une promesse de silence.","Blizzard !"]],
 ['m','old',["Oberon, roi des Sylves. La forêt entière m'écoute.","Les fées dansent quand je bénis la terre.","Bénédiction sylvestre !"]],
 ['m','deep',["Mordak Brute-Runique ! Mes runes brûlent de colère !","Chaque rune sur ma peau est une victoire.","Rune brisée !"]],
 ['f','normal',["Fortuna, croupière du destin. Faites vos jeux !","Rien ne va plus… sauf pour moi.","Sept, sept, sept ! Jackpot !"]],
 ['m','deep',["Solaris, l'Astre-Roi. Le soleil se lève quand je le décide.","Contemplez ma lumière… et brûlez.","Météore solaire !"]],
 ['m','old',["Kaïros, Maître du Temps. Nous nous sommes déjà rencontrés… demain.","Le temps est une rivière. Je tiens le barrage.","Arrêt du temps !"]],
 ['f','old',["Gaïa, Mère-Racine. Tout ce qui pousse est mon enfant.","Même après l'hiver, la vie revient toujours.","Renaissance !"]],
 ['m','deep',["Titanor… le Mont-Vivant. Je suis… la montagne.","Mille ans… à dormir. Maintenant… je me réveille.","Colère de la montagne !"]],
 ['f','normal',["Valkyr, la Walkyrie. Je conduis les braves au paradis des héros.","Les cieux chantent quand je charge.","Charge céleste !"]],
 ['f','eerie',["Nyx, Ombre-Lune. La nuit m'appartient.","Quand la lune s'éteint, je frappe.","Éclipse."]],
 ['m','normal',["Orion, Chasse-Étoiles. Je chasse parmi les constellations.","Chaque étoile du ciel est une de mes flèches.","Constellation !"]],
 ['f','normal',["Séraphine aux Six Ailes. Que la grâce vous enveloppe.","Mes ailes couvrent ceux qui souffrent.","Grâce séraphique !"]],
 ['m','deep',["Drakhar, le Wyrm. Des siècles de feu dorment en moi.","Les rois tremblent quand je déploie mes ailes.","Souffle du Wyrm !"]],
 ['f','eerie',["Léviathane des Abysses. Les profondeurs t'appellent.","L'océan n'a pas de fond. Ma colère non plus.","Raz-de-marée !"]]];
const VOX={i:{},voices:[],on(){return!S.opt||S.opt.vox!==false},ok:typeof speechSynthesis!=='undefined'&&typeof SpeechSynthesisUtterance!=='undefined'};
function voxLoad(){try{VOX.voices=speechSynthesis.getVoices().filter(v=>/^fr/i.test(v.lang))}catch(e){}}
if(VOX.ok){voxLoad();try{speechSynthesis.onvoiceschanged=voxLoad}catch(e){}}
function voxPick(g){const V=VOX.voices;if(!V.length)return null;const F=/(amelie|amélie|audrey|aurelie|aurélie|marie|julie|celine|céline|denise|hortense|virginie|female|femme|chantal|eloise|léa|lea|vivienne|brigitte|coralie|jacqueline|sylvie)/i,M=/(thomas|nicolas|paul|henri|claude|male|homme|daniel|jean|remy|rémy|antoine|guillaume|mathieu|yves|gerard|gérard|fabrice|alain|henri)/i;
  return V.find(v=>(g==='f'?F:M).test(v.name))||V.find(v=>/google/i.test(v.name))||V[0]}
function heroSay(h,k,quiet){const d=VOXD[h.i];if(!d)return'';const line=d[2][k%3];if(!VOX.ok||!VOX.on())return line;
  try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(line);u.lang='fr-FR';const v=voxPick(d[0]);if(v)u.voice=v;
    const P={normal:[1,1],deep:[.45,.88],old:[.7,.86],young:[1.45,1.12],eerie:[.8,.82]}[d[1]]||[1,1];u.pitch=Math.max(.1,Math.min(2,P[0]*(d[0]==='f'?1.18:.95)));u.rate=P[1]*(k===2?1.08:1);
    u.volume=Math.max(.2,Math.min(1,(S.opt&&S.opt.sfx!=null?S.opt.sfx:.8)+.2));if(!(S.opt&&S.opt.mute))speechSynthesis.speak(u)}catch(e){}return line}
function voxBubble(h){const d=VOXD[h.i];if(!d)return'';return`<div class="hvbub" data-a="hsay" data-v="${h.i}"><span id="hvq">« ${esc(d[2][0])} »</span><button class="hvsp" data-a="hsay" data-v="${h.i}" aria-label="Faire parler ${esc(h.n)}">${VOX.ok?'🔊':'💬'}</button></div>`}
{const hs1=heroStage;heroStage=function(h){const out=hs1.apply(this,arguments);return out.replace('<div class="hvbody">',voxBubble(h)+'<div class="hvbody">')}}
function voxOpen(id){VOX.i[id]=0;setTimeout(()=>{if($('#hvq'))heroSay(HEROES[id],0)},350)}
{const hm2=heroModal;heroModal=function(id){hm2.apply(this,arguments);try{const m=$('#ovl .modal');if(m&&m.querySelector('.hvstage')){addVoxToggle(m);voxOpen(id)}}catch(e){}}}
{const hv2=hvModal;hvModal=function(pid,j){hv2.apply(this,arguments);try{const m=$('#ovl .modal');const p=pid==='me'?meRow():rowById(pid);const t=rowTeamFull(p)[j];if(m&&t){addVoxToggle(m);voxOpen(t.id)}}catch(e){}}}
function addVoxToggle(m){if(m.querySelector('.voxtg'))return;const on=VOX.on();m.querySelector('.hvstage').insertAdjacentHTML('beforeend',`<button class="voxtg" data-a="voxtg" aria-label="${on?'Couper':'Activer'} les voix">${on?'🔊 Voix':'🔇 Voix'}</button>`)}
{const cm=closeModal;closeModal=function(){try{if(VOX.ok)speechSynthesis.cancel()}catch(e){}return cm.apply(this,arguments)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a;
  if(a==='hsay'){e.stopPropagation();const id=+t.dataset.v,h=HEROES[id];VOX.i[id]=((VOX.i[id]||0)+1)%3;const line=heroSay(h,VOX.i[id]);const q=$('#hvq');if(q){q.textContent='« '+line+' »';const b=q.closest('.hvbub');if(b){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}}}
  else if(a==='voxtg'){const o=OPT();o.vox=o.vox===false?true:false;save();t.textContent=o.vox===false?'🔇 Voix':'🔊 Voix';if(o.vox===false&&VOX.ok)speechSynthesis.cancel();toast(o.vox===false?'Voix des héros coupées':'Voix des héros activées')}});
/* cri de guerre à l'ultime (tes héros seulement) */
{const ci=cutIn;cutIn=async function(u){try{if(B&&!B.skip&&u&&u.hid!=null&&u.side===0&&S.speed<=2&&VOX.on())heroSay(HEROES[u.hid],2)}catch(e){}return ci.apply(this,arguments)}}

/* ---------- musique du podium ---------- */
SONGS.podium={g:1,bpm:112,spb:4,bar:16,bars:8,prog:'C F G C Am F G7 C',parts:[
 {i:'pad',f:'chord',lo:55,v:.8},
 {i:'choir',f:'chord',lo:60,v:.42,from:5},
 {i:'sbass',f:'bass',lo:36,v:.45,pat:[[0,4,0],[4,4,7],[8,4,12],[12,4,7]]},
 {i:'brass',f:'mel',v:.9,mel:'C5:2 E5:2 G5:4 G5:2 A5:2 G5:4|A5:4 F5:4 C6:6 A5:2|G5:2 F5:2 E5:2 D5:2 B4:4 G4:4|C5:2 E5:2 G5:2 C6:2 E6:8|A5:2 C6:2 E6:4 D6:2 C6:2 A5:4|F5:2 A5:2 C6:4 B5:2 A5:2 F5:4|G5:4 B5:4 D6:4 F6:4|E6:12 r:4'},
 {i:'bell',f:'mel',v:.35,mel:'C7:16|r:16|r:16|G6:16|r:16|r:16|r:16|C7:16'},
 {i:'timp',f:'bass',lo:36,v:.6,pat:[[0,2,0],[8,2,7],[14,1,7],[15,1,7]]},
 {i:'snare',f:'drum',v:.35,pat:'x..x..x.x..x.xxx'},
 {i:'kick',f:'drum',v:.3,pat:'x.......x.......'},
 {i:'crash',f:'drum',v:.4,pat:'',alt:{1:'x',5:'x'}},
 {i:'harp',f:'arp',lo:60,v:.35,from:5,pat:[0,1,2,3,4,3,2,1,0,1,2,3,4,3,2,1]}]};
try{delete SONGC.podium}catch(e){}
{const pt=pageTheme;pageTheme=function(){if(!B&&TAB==='top'&&UI.lz&&UI.lz.top==='rank')return'podium';return pt.apply(this,arguments)}}
try{SETR[0][3]='Accueil, nuit, casino, podium, combats, boss et événements'}catch(e){}

/* ---------- messages privés accessibles depuis la boîte aux lettres ---------- */
function mpCard(){const n=dmUnread(),D=DMS(),ks=Object.keys(D).sort((a,b)=>(D[b].lt||0)-(D[a].lt||0)).filter(k=>D[k].u).slice(0,3);
  return`<button class="card mpcard ${n?'unr':''}" data-a="gomp"><span class="mpic">🕊️</span><span class="who"><b>Messages privés${n?` · ${n} non lu${n>1?'s':''}`:''}</b><small>${ks.length?ks.map(k=>esc(D[k].n)).join(', ')+' t\''+(ks.length>1?'ont':'a')+' écrit':'Ouvre le Pigeonnier pour discuter avec les autres joueurs'}</small></span><span class="mpgo">${n?`<i class="pdot">${n}</i>`:''}›</span></button>`}
{const pp=pPoste;pPoste=function(){return mpCard()+pp.apply(this,arguments)}}
function goMP(){closeModal();TAB='top';UI.lz=UI.lz||{};UI.lz.top='mp';UI.soc='mp';try{LZ.prev.top='mp'}catch(e){}const D=DMS(),k=Object.keys(D).filter(x=>D[x].u).sort((a,b)=>(D[b].lt||0)-(D[a].lt||0))[0];UI.dmk=k||null;render();window.scrollTo(0,0)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a;
  if(a==='gomp'){e.stopImmediatePropagation();goMP()}
  else if(a==='gomail'&&t.id==='mailb'&&letUnread()===0&&(S.mail||[]).length===0&&dmUnread()>0){e.stopImmediatePropagation();goMP()}},true);
/* la bulle de notification d'un MP ouvre directement la conversation */
{const dn=dmNotify;dmNotify=function(key,x){dn.apply(this,arguments);try{const ts=document.querySelectorAll('#toast div');const el=ts[ts.length-1];if(el&&/✉️/.test(el.textContent)){el.classList.add('tdm');el.onclick=()=>{dmOpen(key)}}}catch(e){}}}

PATCH.unshift({v:24,d:'14 octobre 2026',t:'Les héros prennent la parole',items:[
 "🗣️ <b>Chaque héros a sa voix et ses répliques</b> : quand tu touches un héros, il se présente avec une bulle de dialogue et sa propre voix (grave, âgée, jeune, étrange…). Touche la bulle pour entendre ses autres répliques et son cri de guerre. Bouton 🔊/🔇 pour couper les voix.",
 "⚔️ En combat, tes héros lancent leur cri de guerre quand ils déclenchent leur ultime.",
 "🏆 <b>Musique du podium</b> : une fanfare de victoire avec cuivres, timbales et chœurs quand tu vas sur le Podium.",
 "🕊️ Les messages privés sont accessibles depuis la boîte aux lettres, le bouton 📮 t'emmène droit aux MP quand il n'y a qu'eux, et la notification d'un MP ouvre la conversation.",
 "↩️ Le bouton pour fermer la fiche d'un héros était caché derrière le décor : il est de nouveau visible."]});
