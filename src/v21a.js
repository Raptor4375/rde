
/* ================= V21 : BOTS BAVARDS, MESSAGES PRIVÉS ================= */
/* ---- anti-répétition ---- */
const V21={rec:[],recK:'royaumes-v21-rec'};
try{V21.rec=JSON.parse(localStorage.getItem(V21.recK)||'[]')||[]}catch(e){V21.rec=[]}
function nrmX(x){return String(x||'').toLowerCase().replace(/œ/g,'oe').normalize('NFD').replace(/[̀-ͯ]/g,'').replace(/[^a-z0-9]+/g,' ').trim()}
function coreX(x){return nrmX(x).replace(/^(hey|coucou|alors|bon|bon ok|serieux|info|mdr|breaking news|alors ecoutez|les amis|rappel|equipe|franchement|pff|bref|encore une fois|perso|tiens|dites|au fait|ah|oh|bon bah|bah|yo|euh|hmm|ok)\s+/,'').replace(/\s+(lol|mdr|serieux|go farm|merci a tous)$/,'')}
function recSet(){const s=new Set(V21.rec);const add=a=>{(a||[]).slice(-40).forEach(m=>{if(m&&m.x)s.add(coreX(m.x))})};try{add(NET.msgs);add(NET.wmsgs)}catch(e){}add(S.chat);return s}
function recAdd(x){const c=coreX(x);if(!c)return;V21.rec.push(c);if(V21.rec.length>220)V21.rec.splice(0,V21.rec.length-220);try{localStorage.setItem(V21.recK,JSON.stringify(V21.rec))}catch(e){}}
function pickFresh(arr,fill){if(!arr||!arr.length)return'';const R=recSet();let best=null;for(let k=0;k<12;k++){const x=pick(arr),y=fill?fill(x):x;if(!R.has(coreX(y)))return y;best=best||y}return best}
const VARY={
 sympa:{o:["Hey ! ","Coucou, ","Alors, ","Tiens, ","Au fait, "],c:[" 😊"," !"," ❤️"," 🙂"," 😄"]},
 tryhard:{o:["Bon. ","Sérieux, ","Info : ","Perso, ","Rappel : "],c:[" 💪"," 🔥",", go farm."," 📈"," ⚔️"]},
 farceur:{o:["Bon ok, ","Breaking news : ","Mdr ","Alors écoutez : ","Petite annonce : "],c:[" 😂"," 🤡"," lol"," 🤣"," 🐸"]},
 timide:{o:["euh ","hmm ","",""],c:[" ..."," 😶",""," 🙈"]},
 leader:{o:["Les amis, ","Équipe, ","Écoutez-moi, ","Rappel : "],c:[" 👑"," 💪",", merci à tous."," 🛡️"]},
 'râleur':{o:["Franchement, ","Pff, ","Bref, ","Encore une fois, ","Évidemment, "],c:[" 🙄"," 😤",", sérieux..."," 😒"]}};
const SYNO=[[/\btrop\b/i,['super','vraiment','hyper','grave']],[/\bSalut\b/,['Yo','Hello','Coucou','Wesh']],[/\bmerci\b/i,['merci bien','thanks','merci beaucoup']],[/\bfranchement\b/i,['honnêtement','sincèrement']],[/\bcontent\b/i,['heureux','ravi']],[/\bboss\b/,['boss','monstre']]];
function vary(x,pers){x=String(x);if(/^::\w+::$/.test(x))return x;const V=VARY[pers]||VARY.sympa;let y=x;
  if(Math.random()<.5){const [re,alt]=pick(SYNO);if(re.test(y))y=y.replace(re,m=>{const a=pick(alt);return m[0]===m[0].toUpperCase()?a[0].toUpperCase()+a.slice(1):a})}
  if(Math.random()<.6){const o=pick(V.o);if(o)y=o+(/^[A-ZÀ-Ý][a-zà-ÿ]/.test(y)&&!/^(I|Je )/.test(y)?y[0].toLowerCase()+y.slice(1):y)}
  if(Math.random()<.6){const c=pick(V.c);y=y.replace(/\s*[!.]?\s*$/,'')+c}
  if(pers==='timide')y=y.toLowerCase();return y.slice(0,160)}
function antiRep(x,pers){if(/^::\w+::$/.test(x))return x;const R=recSet();if(!R.has(coreX(x))&&!R.has(nrmX(x)))return Math.random()<.22&&x.length>24?vary(x,pers):x;if(x.length<24)return null;
  for(let k=0;k<6;k++){const y=vary(x,pers);if(!R.has(nrmX(y)))return y}return null}
function persOfBid(bid){try{const f=findBot(bid);return f&&f.b.pers||'sympa'}catch(e){return'sympa'}}
{const pb=postBotMsg;postBotMsg=function(gid,b,x,t){const y=antiRep(String(x),persOfBid(b.id));if(y==null)return Promise.resolve();if(!/^::\w+::$/.test(y))recAdd(y);return pb(gid,b,y,t)}}
{const ch=chat;chat=function(t,w,x,live){if(w&&w!=='sys'&&w!=='me'&&typeof x==='string'){const p=PL(w);const y=antiRep(x,p&&p.pers);if(y==null)return;x=y;recAdd(y)}return ch(t,w,x,live)}}

/* ---- palette de messages beaucoup plus large ---- */
TPL.sympa.push("Qui veut un cœur ? J'en envoie à tout le monde ❤️","On progresse bien cette semaine, fier de vous","N'hésitez pas à poser vos questions, on est là pour ça","Petit rappel : buvez de l'eau entre deux raids 😄","Je viens de finir mes quêtes, il me reste des tickets si besoin d'aide","Bravo à {me} pour sa progression !","J'adore cette guilde, vraiment","Bonne chance pour vos invocations du jour 🍀","Vous êtes trop forts, le Golem n'a aucune chance","Si quelqu'un est bloqué, je peux lui montrer ma compo","Bon appétit à ceux qui mangent 🍝","Ça fait plaisir de voir tout le monde actif","On va finir dans le top, je le sens","Je vous souhaite une super soirée","Qui a besoin d'un conseil d'équipement ?");
TPL.tryhard.push("J'ai refait mes calculs, 2 Mages de zone c'est +25 % en aventure","Étape {stage} en 3 tours. Qui dit mieux ?","Je farme la Tour ce soir, objectif 10 étages de plus","Ceux qui n'ont pas pointé : faites-le maintenant","Ma compo arène est à 98 % d'efficacité, je vise le top 10","Je ne dors pas tant que le Golem n'est pas tombé","Optimisez vos équipes par mode, c'est là que se joue la différence","J'ai fusionné 12 objets ce matin, +{n} de puissance","Record personnel sur Ignir : {dmg}","Si vous voulez monter vite : quêtes, coffre, raids, arène. Tous les jours.","Les légendaires ★★★ c'est la vraie méta, gardez vos éclats","Qui a regardé la tier list arène ? Elle a changé","On a perdu une place au classement, faut réagir","Je teste 3 Assassins contre le Golem, résultat demain","Le classement du lundi, je le veux");
TPL.farceur.push("Mon héros préféré ? Celui qui ne meurt pas en premier, donc aucun","J'ai invoqué 10 fois et j'ai eu 10 fois de la déception 🎉","Le Golem m'a regardé, j'ai fermé l'appli","Je crois que mon tank a peur du noir","Fortuna m'a fait 7-7-crâne. Le crâne m'a souri.","Je donne des cours de malchance, premier cours gratuit","Mon équipe s'appelle « On verra bien »","Je vends un plastron usé, état neuf, jamais porté (il est nul)","Le hibou de la musique de nuit me juge, je le sens 🦉","J'ai perdu au blackjack contre moi-même","Si le boss avait des sentiments, on serait des monstres","Ma stratégie : cliquer très fort sur Attaquer","Quelqu'un a vu mes gemmes ? Elles sont parties au casino","Breaking news : un commun a survécu 3 tours","J'ai mis un Soutien en tank. Il a démissionné.");
TPL.timide.push("salut","merci beaucoup","je suis là","bonne soirée","je tape le boss","j'ai eu un épique","coucou tout le monde","je débute encore","ok merci","bravo","gg à vous","bonne nuit à tous","je reviens plus tard","j'ai fait mes quêtes","je comprends pas trop l'arène");
TPL.leader.push("Objectif ce soir : finir le Golem avant minuit","Je compte sur chacun, même 1 attaque ça aide","Belle semaine, la guilde progresse bien 💪","Les nouveaux, présentez-vous dans le tchat !","Je publierai une annonce dans vos boîtes aux lettres cette semaine","Restez actifs, on vise le top 3 des guildes","On a besoin de Tanks solides, montez-les","Merci aux plus actifs, je vous vois","Pas d'inactifs ici, mais on aide ceux qui débutent","Prochaine étape : guilde niveau {bl2}, on peut le faire","Pensez à vérifier vos annonces dans la boîte aux lettres 📮","La boutique de guilde a de bons échanges, profitez-en","Si un membre a besoin d'aide, répondez-lui","Le boss est à {pct}%, je veux voir des dégâts","Soyez fiers de notre bannière");
TPL['râleur'].push("Encore des bottes. Je collectionne les bottes maintenant.","Le casino m'a ruiné, et en plus il se moque de moi","Pourquoi le Golem a autant de PV ?","10 tickets et pas un légendaire, normal","Le classement est rempli de monstres, c'est pas juste","J'ai raté le marché de nuit, encore","Mon soigneur soigne tout le monde sauf moi","La Tour étage {stage} c'est du vol","Les bots de l'arène tapent trop fort","Je dis ça, je dis rien, mais le taux est bas","Il pleut des communs aujourd'hui","Le pass premium me fait de l'œil, je résiste","J'ai perdu 3 fois contre le même gars en arène","Mes gants sont usés depuis 3 semaines","Et après on me dit que c'est la chance");
TPL.advice.push("{me}, les synergies : 2 héros de la même classe donnent un bonus","Fais une équipe par mode, ça change tout {me}","Récolte ton coffre d'expédition souvent {me}","{me}, la Tour donne de bons éclats, monte-la petit à petit","Pense au pointage de guilde chaque jour {me}","Le marché de nuit ouvre à 19 h, il y a des affaires","Contre Ignir, des Tireurs ; contre Sylphéa, des Mages","{me}, garde 1 Soutien en arène mais pas 3, les soins y sont réduits","Équipe auto après chaque fusion {me}, on oublie souvent");
WORLD_TPL.push(
 "Qui farme la Tour ce soir ?","Le marché de nuit a des offres de fou aujourd'hui 🌙","Quelqu'un a déjà fait 7-7-7 à Fortuna ?","Je cherche une guilde active, des idées ?","Qui veut s'ajouter en ami ? J'envoie des cœurs tous les jours","Le blackjack m'a coûté 10 000 or, je ne joue plus (jusqu'à demain)","Les nouveaux bâtiments sont trop beaux 😍","Le Golem du Néant m'a fait un one-shot 😭","Astuce : fusionnez vos doublons d'équipement","Ma team arène est enfin au point 💪","Vous jouez avec quelle musique ? Moi celle de nuit, le hibou 🦉","Quelqu'un a lu l'annonce royale dans la boîte aux lettres ?","Gros merci à ceux qui m'ont aidé hier","Je viens de passer l'étape {stage} !!","Mon record sur Gorgath : {dmg}, qui fait mieux ?","{g} est la meilleure guilde, je dis ça je dis rien 😏","Quelqu'un pour comparer nos équipes ?","Qui veut faire un duel en arène ?","J'ai enfin un légendaire ★★★ !!","Le pass vaut le coup ou pas ?","Ma guilde a reçu une lettre du chef, trop stylé le sceau 📜","Vous pensez qu'il y aura un nouveau héros bientôt ?","Je vais dormir, bon farm à tous 🌙","Bonjour le royaume ☀️","Qui est le plus fort en arène en ce moment ?","Ça vous arrive de jouer juste pour le casino ? 😂","Je suis à 2 étages de mon record à la Tour","J'ai donné 50 cœurs cette semaine, je suis un ange 😇","Les ultras holographiques c'est magnifique","Je viens d'envoyer un message privé à mon rival 😈","Le pigeonnier marche bien, j'ai reçu 3 messages 🕊️","Qui a des conseils pour le raid d'Ignir ?","Les bots de l'arène sont devenus trop forts 😳","Je recrute pour {g}, venez en MP !","Mon chat dort sur mon clavier, il veut farmer aussi 🐱","Le classement du lundi approche, préparez-vous","On dit que Fortuna sourit aux audacieux","Quelqu'un pour un raid ce soir ?","Je viens de rater 3 tirages de suite au ×10","Le royaume est calme ce soir 🌙","Combien de gemmes vous avez de côté ?","Je trouve que les Tanks sont sous-côtés","Les Assassins contre le Golem, c'est du +30 %, profitez","Bravo aux guildes du top 3, vous êtes chauds","Qui a eu la lettre royale avec les gemmes ?","Les Mages de zone en aventure, c'est le meilleur conseil qu'on m'ait donné","Je me lance dans l'arène, souhaitez-moi bonne chance ⚔️","Les gars, les synergies ça change vraiment tout","Coucou à tous ceux qui lisent 👋","Il me manque 200 gemmes pour mon ×10 😩","Le manoir hanté fait peur la nuit 🎃","La fontaine de la Grand-Place est trop belle de nuit ✨");
const DLG=[
 ["Quelqu'un sait quand les tickets de raid se rechargent ?",["À minuit pile !","Minuit, et t'en as 3 par jour","À minuit, et tu peux en acheter à la boutique de guilde"]],
 ["Vous montez qui en priorité, le tank ou le DPS ?",["Le tank d'abord, sinon tout le monde meurt","Le DPS, plus vite le boss tombe moins t'as besoin de tank 😏","Les deux, mais le soigneur avant tout"]],
 ["Ça vaut le coup le pass premium ?",["Oui, le légendaire au choix est énorme","Si tu joues tous les jours oui","Le cadre exclusif à lui seul vaut le coup 😍"]],
 ["Qui a déjà gagné à la roulette ?",["Moi une fois, sur le 17 🎰","Jamais, la roulette me déteste","Mise sur rouge et prie 🙏"]],
 ["Vous êtes à quel étage de la Tour ?",["Étage {n}, et toi ?","Je suis bloqué à {n} 😭","{n}, les malédictions me tuent"]],
 ["C'est quoi le mieux, fusionner ou vendre l'équipement ?",["Fusionner, toujours","Fusionne d'abord, vends le reste au marché","Fusionne, les objets rares valent de l'or"]],
 ["Quelqu'un a une guilde qui recrute ?",["Viens chez {g} !","{g} cherche du monde je crois","Regarde le classement des guildes, certaines sont ouvertes"]],
 ["Les communs ça sert à quelque chose ?",["Au début oui, après moins","À fusionner ou à remplir l'équipe","Pas trop, garde-les pour les quêtes"]],
 ["Vous jouez la nuit vous ?",["Toujours, la musique de nuit est trop calme 🦉","Oui, le marché de nuit est ouvert","Non je dors moi 😴"]],
 ["Le Golem est à combien chez vous ?",["Niveau {n} chez nous","On l'a tué ce matin 💪","Il est à 30 %, on le finit ce soir"]],
 ["Comment on gagne des éclats d'ultra ?",["La Tour, le pass Pro et le casino","Monte la Tour, c'est le plus simple","Le casino si t'es chanceux 😂"]],
 ["Il est bien le casino de Fortuna ?",["Fun mais dangereux pour ton or 😅","Le blackjack c'est le meilleur","La machine à sous m'a ruiné"]],
 ["Qui a eu le cadre citrouille ?",["Moi ! Il est trop beau 🎃","Pas encore, il me manque des bonbons","Je farme le manoir pour l'avoir"]],
 ["Vous faites quoi avec vos gemmes ?",["×10 direct","J'économise pour un légendaire","Le pass, toujours"]],
 ["L'arène c'est pas trop dur ?",["Au début si, après ça va","Fais une équipe dédiée, ça aide","Les soins y sont réduits, pense à ça"]],
 ["Quelqu'un a reçu un MP d'un inconnu ?",["Oui, un gars qui voulait me recruter 😂","Moi un rival qui me provoque 😤","Non, personne m'écrit 😢"]],
 ["C'est qui le meilleur soigneur ?",["Ça dépend du mode, mais les légendaires bien sûr","Celui qui purifie, contre Gorgath c'est vital","Celui que t'as monté au max 😄"]],
 ["Vous avez vu la nouvelle Grand-Place ?",["Oui le bureau de poste est trop mignon 📮","Le pigeonnier 🕊️ j'adore","Les bâtiments sont beaucoup plus jolis"]],
 ["Je fais quoi de mon or ?",["Monte tes héros","Monte ta meilleure équipe, pas toutes","Achète des tickets à la boutique"]],
 ["Ça sert à quoi les cœurs ?",["100 points = une invocation amitié","Envoie-les tous les jours, c'est gratuit","À se faire des amis ❤️"]],
 ["Quelqu'un a déjà battu le top 1 en arène ?",["Jamais, il est intouchable","Une fois, avec de la chance","Faut une team dédiée arène"]],
 ["Vos héros préférés ?",["Mes Mages, pour les dégâts de zone","Mon tank, il m'a sauvé 100 fois","Fortuna, pour le fun 🎲"]]];
const DLG_END=["Merci !","Ah ok merci 👍","Parfait","Je note 📝","Bien vu","Ça marche !","Ok je teste","Top, merci 🙏"];
const DYN={
 nuit:["Qui est encore debout ? 🦉","La musique de nuit avec le hibou, trop apaisante 😌","Je farme en silence, tout le royaume dort 🌙","Les insomniaques sont là ?","Le marché de nuit est ouvert, allez voir 🌙"],
 aube:["Bon matin le royaume ☀️","Premier café, premières invocations ☕","Qui est déjà réveillé ?","L'aube sur la Grand-Place, c'est beau"],
 jour:["Pause déj = raid 🍝","Qui joue au boulot ? 👀","Bonne journée à tous !","Le soleil brille sur le royaume ☀️"],
 coucher:["Le coucher de soleil sur la fête foraine 😍","Fin de journée, on tape le Golem ?","Qui finit ses quêtes avant ce soir ?"],
 'crépuscule':["Le crépuscule tombe, les lanternes s'allument ✨","Dernière ligne droite avant minuit","Ce soir on farme la Tour"]};
function dynLine(b){
  const o=[];const ph=dayPhase();o.push(pick(DYN[ph]||DYN.jour));
  try{const t=rankList('pw')[0];if(t)o.push(t.me?pick([`${S.name||'Le premier'} est n°1 du royaume, qui va le détrôner ?`,`Quelqu'un peut battre ${S.name||'le n°1'} ? Il est trop fort 😳`]):t.bid===b.bid?pick(["Toujours n°1 😎","Le trône est à moi 👑"]):pick([`${t.n} est intouchable au classement 😳`,`${t.n} avec ${fmt(t.pw)} de puissance, c'est quoi ce monstre`,`Un jour je battrai ${t.n} 😤`]))}catch(e){}
  try{const gs=Object.values(NET.guilds).sort((a,c)=>(c.lvl||1)-(a.lvl||1));if(gs[0])o.push(pick([`${gs[0].n} niveau ${gs[0].lvl||1}, ils sont fous`,`Qui peut rivaliser avec ${gs[0].n} ?`]))}catch(e){}
  try{if(nmOpen())o.push(pick(["Le marché de nuit est ouvert !","Allez au marché de nuit, il y a des pépites 🌙"]))}catch(e){}
  try{const f=flashNow();if(f)o.push(pick([`Événement flash : ${f.n} ! Profitez-en ⚡`,`${f.n} en ce moment, foncez ⚡`]))}catch(e){}
  try{if(hwOn())o.push(pick(["Le manoir hanté m'a fait peur 🎃","Qui farme les bonbons ? 🍬"]))}catch(e){}
  o.push(pick([`Je viens de passer ${fmt(b.pw||1000)} de puissance !`,`Étape ${b.st||1} enfin passée 💪`,`Ma team : ${(b.team||[]).slice(0,3).map(i=>HEROES[i]?HEROES[i].n:'').filter(Boolean).join(', ')||'secret'} 😎`]));
  return pickFresh(o)}
function botDialog(pool){
  const a=pick(pool),bs=pool.filter(x=>x.bid!==a.bid);if(!bs.length)return;const b=pick(bs);
  const gname=b.gidr&&NET.guilds[b.gidr]?NET.guilds[b.gidr].n:'ma guilde';const r=Math.random();let q,ans;
  if(r<.18){const h=pick(HEROES.filter(x=>x.r>=2));q=pick([`Vous pensez quoi de ${h.n} ?`,`${h.n}, ça vaut le coup de le monter ?`,`Quelqu'un joue ${h.n} ?`]);try{ans=heroLine(h)}catch(e){ans='Il est bien je trouve'}}
  else if(r<.32){const mk=pick(['pvp','pve','raid2','guild']);q=pick([`C'est quoi la méta ${MODES[mk].lab} en ce moment ?`,`Une compo pour ${MODES[mk].lab} ?`]);try{ans=metaLine(mk)}catch(e){ans='Regarde la bibliothèque, tout y est'}}
  else{const d=pickFresh(DLG.map(x=>x[0]));const D=DLG.find(x=>x[0]===d)||pick(DLG);q=D[0];ans=pick(D[1]).replace('{n}',ri(4,60)).replace('{g}',gname)}
  if(recSet().has(coreX(q)))return false;
  postBotMsg('world',{id:a.bid,n:a.n},q);
  setTimeout(()=>postBotMsg('world',{id:b.bid,n:b.n},ans),4000+Math.random()*5000);
  if(Math.random()<.4)setTimeout(()=>postBotMsg('world',{id:a.bid,n:a.n},pick(DLG_END)),10000+Math.random()*6000);
  return true}
function worldChatter(){
  if(!sharedOn()||!NET.canWrite||Math.random()>.4)return;
  const pool=[...botRows(),...freeRows()].filter(b=>Date.now()-b.last<36e5*6);if(!pool.length)return;const b=pick(pool);
  const r=Math.random();
  if(r<.26&&pool.length>2&&botDialog(pool)!==false)return;
  if(r<.5){const x=dynLine(b);if(x)return postBotMsg('world',{id:b.bid,n:b.n},x)}
  const g=b.gidr&&NET.guilds[b.gidr]?NET.guilds[b.gidr].n:pick(Object.values(NET.guilds).filter(x=>x.npc).map(x=>x.n).concat(['ma guilde']));
  const src=Math.random()<.3&&TPL[b.pers]?TPL[b.pers]:WORLD_TPL;
  const x=pickFresh(src,t=>fillT(t,{st:b.st||1,raid:b.raid||[0],team:b.team&&b.team.length?b.team:[0]},{g,stage:b.st||1}));
  postBotMsg('world',{id:b.bid,n:b.n},x);
}

/* ---- réponses plus variées ---- */
const EXT={
 hi:["Salut {me} ! Ça farme ?","Yo {me} 👋","Coucou {me}, bien ou quoi ?","Hello {me} ! Bienvenue","Wesh {me} 😄","Bonjour {me} ☀️","Salut ! Content de te voir","Hey {me}, t'arrives pile pour le boss","Re {me} ! T'étais passé où ?","Salutations, noble {me} 🙇","Ah {me} est là, la fête peut commencer 🎉","Coucou ! Ça faisait longtemps"],
 cavaQ:["Ça va super, je viens de passer l'étape {st} ! Et toi ?","Bof, le casino m'a vidé les poches 😅 Et toi ?","Tranquille, je monte {h}. Et toi ça va ?","Ça va bien ! Grosse session de Tour ce soir","Nickel, j'ai eu un épique ce matin 😄 Toi ?","Fatigué mais motivé 💪 Et toi {me} ?","Ça roule ! Et de ton côté ?","Très bien, la guilde avance bien. Et toi ?"],
 cavaA:["Ah tant mieux 😊","Top !","Content pour toi {me}","Génial 😄","Ça fait plaisir","Super, on farme alors ?"],
 ettoi:["Ça va aussi, merci 😊","Bien, je farme tranquille","Pas mal, j'ai eu de la chance aux invocations","Ça va ! Un peu fatigué","Au top 💪"],
 thx:["De rien {me} !","Avec plaisir 😉","C'est normal entre nous","Pas de quoi !","Quand tu veux 👍","Toujours là pour aider","Tranquille {me} 😎","::love::"],
 gg:["GG {me} ! 🔥","Bien joué !","Énorme {me} 👏","T'es une machine 😳","Bravo, mérité","GG, on est les meilleurs","::gg::","Classe {me} !"],
 laugh:["😂😂","Mdrrr","Ptdr t'es fou","Je suis mort 💀","Hahaha","Trop drôle 😂","::lol::","Jpp 😂"],
 bye:["À plus {me} !","Bonne nuit 🌙","Ciao 👋","À demain {me}","Repose-toi bien","Bonne soirée !","Salut salut 👋","Reviens vite {me} !","Dors bien, le Golem t'attendra 😄"],
 love:["Merci {me} ❤️","Toi aussi t'es top","Oh c'est gentil 😊","Arrête je rougis 😳","On t'aime aussi {me}","::love::"],
 rude:["Calme {me} 😅","On reste cool, c'est qu'un jeu","Doucement, on est entre amis ici","Hé, respire 😮‍💨","Pas besoin d'être méchant","Ça arrive d'être énervé, mais reste sympa"],
 doing:["Je farme l'étape {st}","Je monte {h} au niveau max","Je suis à la Tour, ça pique 😵","Je teste une compo arène","J'attends le marché de nuit 🌙","Je joue au blackjack (je perds) 😂","Je tape le Golem 💪","Je fusionne mon équipement","Je range mon inventaire, il déborde","Je fais mes quêtes du jour","J'écris une annonce pour la guilde 📜","Je regarde la méta dans la bibliothèque"],
 who:["Présent ! 🙋","Moi !","Ici 👋","Toujours là 😎","Yes, dispo","Je suis là, qu'est-ce qu'il y a ?"],
 bot:["Un bot ? Moi ? 😂 Je joue juste beaucoup","Si j'étais un bot je serais premier 🤖","Bip boup… nan je rigole","Mdr non, j'ai juste pas de vie sociale 😅","Les bots ne font pas de fautes d'ortographe 😏","Je suis aussi humain que toi {me} 😄","Un bot qui perd au casino ? Peu probable 😂"],
 talk:["Grave","Je suis d'accord","Ah ouais ?","Pas faux 🤔","Intéressant","C'est clair","Haha c'est vrai","Bien vu {me}","Totalement","Je vois ce que tu veux dire","Ça se tente","Pourquoi pas !","J'avoue","Carrément","Exactement ce que je pensais","Hmm, je sais pas trop","T'as raison","Ça me parle","Ah bon ? Raconte","Moi aussi !"],
 q:["Bonne question, je dirais oui","Je crois, mais vérifie dans la bibliothèque","Aucune idée, demande au chef 😅","Ça dépend de ta puissance","Je pense que non","Teste et dis-nous 😄","Hmm, je me suis posé la même question"]};
const EXTP={hi:.7,cavaQ:.55,cavaA:.65,ettoi:.6,thx:.6,gg:.6,laugh:.6,bye:.6,love:.6,rude:.6,doing:.65,who:.6,bot:.6,talk:.55,q:.25};
{const sl=smartLine;smartLine=function(txt,b,ctx={}){const I=ctx.I||detectIntent(txt,ctx.scope);ctx.I=I;
  if(EXT[I.k]&&Math.random()<(EXTP[I.k]||0)){const h=(b.team||[]).filter(i=>HEROES[i]);const fill=x=>x.replace(/\{me\}/g,S.name||'toi').replace('{st}',b.st||stFor(b.pw||1000)).replace('{h}',h.length?HEROES[pick(h)].n:'mes héros');
    const y=pickFresh(EXT[I.k],fill);if(y)return y}
  return sl(txt,b,ctx)}}

/* ================= MESSAGES PRIVÉS ================= */
const DMMAX=60,DMCONV=30;
function DMS(){if(!S.dm||typeof S.dm!=='object')S.dm={};return S.dm}
const DMT={},DMFU={};
function dmUnread(){let n=0;for(const c of Object.values(DMS()))n+=c.u||0;return n}
function dmConv(key,n){const D=DMS();if(!D[key]){D[key]={n:n||'Inconnu',msgs:[],u:0,lt:Date.now()};const ks=Object.keys(D);if(ks.length>DMCONV){ks.sort((a,b)=>(D[a].lt||0)-(D[b].lt||0));delete D[ks[0]]}}if(n)D[key].n=n;return D[key]}
function dmPush(key,m,n){const c=dmConv(key,n);c.msgs.push(m);if(c.msgs.length>DMMAX)c.msgs.splice(0,c.msgs.length-DMMAX);c.lt=m.t;if(!m.m&&!(TAB==='top'&&UI.lz&&UI.lz.top==='mp'&&UI.dmk===key&&!document.hidden))c.u=(c.u||0)+1;save();return c}
function dmWho(key){try{return frResolve(key)}catch(e){return null}}
function dmBotOf(p){return{id:p.bid||p.id,n:p.n,pw:p.pw,team:p.team||[],st:p.st||stFor(p.pw||1000),raid:p.raid||[0,0,0],pers:p.pers||'sympa',gid:p.gidr,last:p.last}}
function dmRefresh(){
  try{if(TAB==='top'&&UI.lz&&UI.lz.top==='mp'&&!B&&!$('#ovl').innerHTML){const th=$('#dmth');if(th&&UI.dmk){const c=DMS()[UI.dmk];if(c)c.u=0;th.innerHTML=dmThreadHTML(UI.dmk);th.scrollTop=th.scrollHeight;renderTop();renderTabs();return}render();return}
    renderTop();renderTabs();if(TAB==='top'&&!inZone('top')&&!B&&!$('#ovl').innerHTML)render()}catch(e){}}
function dmNotify(key,x){const c=DMS()[key];if(!c)return;if(TAB==='top'&&UI.lz&&UI.lz.top==='mp'&&UI.dmk===key)return;toast(`✉️ ${esc(c.n)} : ${esc(String(x).slice(0,60))}`);try{SND&&SND.pop&&SND.pop()}catch(e){}}
const YES=/\b(oui|ouais|ok|okay|grave|carrement|d ?accord|dac|vas[- ]?y|go|pourquoi pas|avec plaisir|volontiers|yes)\b/;
const NO=/\b(non|nan|pas int[eé]ress|deja une guilde|merci mais|plus tard|nope)\b/;
function dmSpecial(t,p,c){
  const me=S.name||'toi';
  if(c.inv&&YES.test(t)){const g=NET.guilds[c.inv]||(GU&&GU(c.inv));const gn=g?g.n:'notre guilde';c.inv=null;return pick([`Génial !! Va dans l'onglet Guilde et rejoins ${gn}, je préviens les autres 🎉`,`Super ${me} ! Cherche ${gn} dans la liste des guildes et clique Rejoindre 😄`])}
  if(c.inv&&NO.test(t)){c.inv=null;return pick(["Pas de souci, la porte reste ouverte 😉","Ok, bonne chance avec ta guilde !","Dommage, mais je comprends 👍"])}
  if(/\b(quel age|habites?|ou tu vis|ton vrai (nom|prenom)|ton adresse|ton (num|numero|insta|snap|tel))\b/.test(t))return pick(["Je préfère garder ça pour moi 😄 On parle du jeu ?","Secret ! Mais je peux te parler de ma team 😎","Haha, mystère. Par contre si t'as besoin d'aide sur le jeu, je suis là"]);
  if(/\b(gemme|gemmes|donne moi|cadeau|prete)\b/.test(t)&&/\b(donne|envoie|prete|file|cadeau)\b/.test(t))return pick(["Haha on peut pas s'échanger de gemmes 😅 Mais je t'envoie un cœur ❤️","J'aimerais bien, mais c'est impossible dans le jeu 😄","Si je pouvais, je t'en donnerais 💎"]);
  if(/\b(coeur|coeurs)\b/.test(t))return pick(["Je t'en envoie un tous les jours si tu veux ❤️","Ajoute-moi en ami et on s'échange des cœurs !","Cœur envoyé ❤️ (enfin, je vais le faire 😄)"]);
  if(/\b(duel|1v1|affronte|defie|arene)\b/.test(t))return pick([`Quand tu veux ${me} ! Défie-moi depuis mon profil ⚔️`,"Ok mais je te préviens, ma team arène est solide 😏",`Viens en arène, on verra qui est le plus fort ${me} 😤`]);
  if(/\b(presente toi|qui es tu|tu es qui|t es qui|parle moi de toi)\b/.test(t)){const h=(p.team||[]).filter(i=>HEROES[i]);return fit(`Moi c'est ${p.n}, ${fmt(p.pw||1000)} de puissance, étape ${p.st||1}. ${PERS_N[p.pers]?'On dit que je suis plutôt '+PERS_N[p.pers].toLowerCase()+'. ':''}Ma team : ${h.slice(0,3).map(i=>HEROES[i].n).join(', ')||'secret'}.`)}
  if(/\b(ami|amis|ajoute)\b/.test(t)&&/\b(ajoute|devenir|on est|sois)\b/.test(t))return pick(["Avec plaisir ! Ajoute-moi depuis mon profil 😊","Ok ! On sera amis 🤝","Bien sûr, ajoute-moi 👍"]);
  if(/\b(guilde|rejoindre|recrute)\b/.test(t)&&/\b(ta|quelle|tu es dans|t es dans|recrute)\b/.test(t)){const g=p.gidr&&NET.guilds[p.gidr];return g?fit(`Je suis dans ${g.n}, niveau ${g.lvl||1}. ${gTotal(p.gidr)<20?'Il reste de la place si tu veux 😉':'On est complets par contre 😅'}`):"Je n'ai pas de guilde en ce moment, tu recrutes ? 👀"}
  return null}
const DMFOLLOW={sympa:["Et toi, tu joues quoi comme team ?","Tu veux qu'on s'ajoute en amis ?","T'en es à quelle étape ?","Bonne chance pour la suite 😊"],tryhard:["T'as combien de puissance là ?","Tu fais la Tour ?","T'as optimisé tes équipes par mode ?","Ton record de raid c'est combien ?"],farceur:["Au fait, t'as déjà perdu au casino ? 😂","Question sérieuse : t'aimes les frites ? 🍟","Ton héros préféré c'est lequel ?"],timide:["et toi ?","tu joues souvent ?"],leader:["Ta guilde est active ?","Tu as pensé au boss aujourd'hui ?","Tu cherches une guilde ?"],'râleur':["Toi aussi t'as que des bottes ?","T'as eu de la chance aux invocations, toi ?","Le casino t'a ruiné aussi ?"]};
function dmReply(key,txt){
  const p=dmWho(key);if(!p||p.real)return;const c=DMS()[key];if(!c)return;const pers=p.pers||'sympa';
  if(Math.random()<(pers==='timide'?.15:.05))return;
  const t=nrmX(txt);const b=dmBotOf(p);let line=dmSpecial(t,p,c);
  const used=new Set(c.msgs.slice(-24).filter(m=>!m.m).map(m=>coreX(m.x)));
  if(!line){for(let k=0;k<5;k++){const y=smartLine(txt,b,{scope:'dm'});if(y&&!used.has(coreX(y))){line=y;break}line=line||y}}
  if(!line||used.has(coreX(line)))line=vary(line||pick(EXT.talk).replace('{me}',S.name||'toi'),pers);
  if(/^::(\w+)::$/.test(line))line=({love:'❤️',gg:'GG 🏆',lol:'😂',go:"Let's go ! 🚀"})[line.slice(2,-2)]||'👍';
  const delay=1500+Math.min(5000,line.length*45)+Math.random()*2500;DMT[key]=1;
  setTimeout(()=>{dmRefresh()},500);
  setTimeout(()=>{delete DMT[key];dmPush(key,{m:0,x:line,t:Date.now()},p.n);dmNotify(key,line);dmRefresh();
    if(Math.random()<.22){const fl=(DMFOLLOW[pers]||DMFOLLOW.sympa).filter(x=>!used.has(coreX(x))&&!c.msgs.slice(-12).some(m=>m.x===x));if(fl.length){DMFU[key]=setTimeout(()=>{DMT[key]=1;dmRefresh();DMFU[key]=setTimeout(()=>{delete DMT[key];delete DMFU[key];const f=pick(fl);dmPush(key,{m:0,x:f,t:Date.now()},p.n);dmNotify(key,f);dmRefresh()},2200+Math.random()*2000)},600)}}},delay)}
function dmSend(key,x){x=String(x||'').trim().slice(0,240);if(!x)return;if(DMFU[key]){clearTimeout(DMFU[key]);delete DMFU[key];delete DMT[key]}const p=dmWho(key);const c=dmPush(key,{m:1,x,t:Date.now()},p?p.n:null);
  if(key.startsWith('real:')){if(!NET.on||!NET.canWrite)return toast("Les messages aux joueurs réels ne partent que dans Claude.");NET.db.collection('dms').add({to:key.slice(5),from:NET.pid,n:S.name||'Voyageur',x,t:Date.now()}).catch(()=>toast("Le message n'a pas pu être envoyé."))}
  else dmReply(key,x);
  dmRefresh()}
const DMSEEN=new Set();
function dmSub(){if(NET.dmUnsub||!NET.on||!NET.pid)return;try{NET.dmUnsub=NET.db.collection('dms').where('to','==',NET.pid).onSnapshot(s=>{for(const d of s.docs){if(DMSEEN.has(d.id))continue;DMSEEN.add(d.id);const m=d.data();if(m&&m.from&&m.x){dmPush('real:'+m.from,{m:0,x:String(m.x).slice(0,240),t:m.t||Date.now()},m.n||'Joueur');dmNotify('real:'+m.from,m.x)}NET.db.doc('dms/'+d.id).delete().catch(()=>{})}dmRefresh()},()=>{})}catch(e){}}
setInterval(dmSub,4000);
/* les bots écrivent aussi en premier */
const DMOPEN={
 friend:{sympa:["Coucou {me} ! Merci d'être mon ami 😊","Hey {me}, tu fais quoi de beau ?","Salut ! T'as vu les nouveaux bâtiments ? Trop beaux","Coucou, t'as passé une bonne journée ?"],tryhard:["Yo {me}, t'as fait ta Tour aujourd'hui ?","Hey, t'en es à combien de puissance ?","Je viens de faire mon record, tu fais mieux ? 😏"],farceur:["{me} ! Urgence : j'ai encore perdu au casino 😂","Psst {me}… t'as pas vu mes gemmes ? Elles ont disparu 🤡","Salut ! Question existentielle : le Golem dort-il ? 🤔"],timide:["coucou {me}","salut, merci pour le cœur","hey, ça va ?"],leader:["Salut {me}, toujours actif ? 💪","Hey {me}, besoin d'aide pour ta progression ?"],'râleur':["{me}, toi aussi t'as que des bottes ?","Salut. Le casino m'a encore volé. Ça va toi ?"]},
 mate:["Hey {me}, t'as tapé le Golem aujourd'hui ?","Merci pour ton aide sur le boss 💪","Salut {me} ! T'as lu l'annonce dans la boîte aux lettres ?","Coucou ! On finit le boss ce soir ?","{me}, si t'as besoin de conseils pour ta team, je suis là"],
 rival:["Je t'ai vu monter au classement 👀 Pas mal, mais tu me rattraperas pas 😏","{me}… on se fait un duel en arène ?","Ta progression est impressionnante, respect. Mais je reste devant 😤","Salut rival. Prépare-toi, je farme toute la nuit 🔥"],
 recruit:["Salut {me} ! Tu cherches une guilde ? On recrute chez {g} ({tag}) 😊 Ça te tente ?","Hey {me} ! {g} recherche des joueurs actifs comme toi. Tu viens ?","Bonjour {me}, je suis de {g}. On a de la place et on tape le boss chaque jour. Intéressé ?"],
 newbie:["Salut, t'as l'air fort ! T'as un conseil pour un débutant ?","Coucou {me}, comment tu as fait pour monter si vite ?","Hey, tu me conseilles quel héros à monter en premier ?"]};
function dmBotTick(){
  try{if(document.hidden||B)return;const dk=today();S.dmDay=S.dmDay&&S.dmDay.d===dk?S.dmDay:{d:dk,n:0};if(S.dmDay.n>=4)return;if(Math.random()>.18)return;
    if(Date.now()-(S.dmLastBot||0)<9*60000)return;
    const tp=teamPower(),me=S.name||'toi',opts=[];
    for(const f of(S.friends||[])){if(f.k.startsWith('real:'))continue;const p=dmWho(f.k);if(p)opts.push({k:'friend',p,w:3})}
    if(S.rgid)for(const r of botRows().filter(r=>r.gidr===S.rgid))opts.push({k:'mate',p:r,w:1});
    else if(S.gid)for(const p of mates())opts.push({k:'mate',p,w:1});
    const all=rankList('pw').filter(x=>!x.me&&!x.real);const i=all.findIndex(x=>x.pw<tp);const above=all.filter(x=>x.pw>=tp&&x.pw<tp*1.4).slice(-3);above.forEach(p=>opts.push({k:'rival',p,w:1}));
    if(!S.rgid&&!S.gid){for(const r of botRows().filter(r=>{const g=NET.guilds[r.gidr];return g&&g.npc&&(g.req||0)<=tp&&gTotal(r.gidr)<20}).slice(0,6))opts.push({k:'recruit',p:r,w:2});
      for(const p of S.world.players.filter(p=>p.g&&GU(p.g)&&(GU(p.g).req||0)<=tp).slice(0,4))opts.push({k:'recruit',p,w:1})}
    all.filter(x=>x.pw<tp*.6).slice(0,4).forEach(p=>opts.push({k:'newbie',p,w:1}));
    const fresh=opts.filter(o=>{const c=DMS()[frKey(o.p)];return!c||Date.now()-(c.lt||0)>6*36e5});if(!fresh.length)return;
    const W=fresh.reduce((a,o)=>a+o.w,0);let r=Math.random()*W,o=fresh[0];for(const x of fresh){if((r-=x.w)<0){o=x;break}}
    const p=o.p,key=frKey(p),pers=p.pers||'sympa';let pool=DMOPEN[o.k];if(!Array.isArray(pool))pool=pool[pers]||pool.sympa;
    let gn='',tag='',gid=null;if(o.k==='recruit'){if(p.gidr){gid=p.gidr;gn=NET.guilds[gid].n;tag=gTag('r:'+gid)}else{gid=p.g;const g=GU(gid);gn=g.n;tag=g.tag||gn.slice(0,3).toUpperCase()}}
    const x=pick(pool).replace(/\{me\}/g,me).replace('{g}',gn).replace('{tag}',tag);
    const c=dmPush(key,{m:0,x,t:Date.now()},p.n);if(o.k==='recruit')c.inv=gid;S.dmDay.n++;S.dmLastBot=Date.now();dmNotify(key,x);dmRefresh()}catch(e){}}
setInterval(dmBotTick,60000);

/* ---- interface ---- */
function dmThreadHTML(key){const c=DMS()[key];if(!c)return'';const p=dmWho(key);
  let h='',lastD='';for(const m of c.msgs){const d=new Date(m.t).toDateString();if(d!==lastD){h+=`<div class="dmday">${d===new Date().toDateString()?"Aujourd'hui":ago(m.t)}</div>`;lastD=d}
    h+=`<div class="dmb ${m.m?'me':''}"><span>${esc(m.x)}</span><time>${hm(m.t)}</time></div>`}
  if(DMT[key])h+=`<div class="dmb typing"><span><i></i><i></i><i></i></span></div>`;
  return h||`<p class="muted" style="text-align:center">Écris le premier message à ${esc(c.n)} !</p>`}
function pMP(){const D=DMS();
  if(UI.dmk&&D[UI.dmk]){const key=UI.dmk,c=D[key],p=dmWho(key);c.u=0;
    const on=p&&(p.real||p.bot?Date.now()-(p.last||0)<30*60000:(typeof online==='function'&&p.last?online(p):false));
    const pid=p?(p.real?p.id:p.bot?p.id:p.id):null;
    return`<div class="card dmcard"><div class="dmhd"><button class="btn sm" data-a="dmback" aria-label="Retour aux conversations">←</button><div class="dmav fav frm-${p?frameOf(p):'none'}">${avatarOf(p)}</div><div style="min-width:0;flex:1"><b>${esc(p?p.n:c.n)}</b>${p&&p.real?' <i class="rtag">JOUEUR</i>':''}<div class="muted" style="font-size:12px"><span class="ol ${on?'':'off'}"></span>${DMT[key]?'écrit…':on?'En ligne':p?'Vu '+ago(p.last||Date.now()):'Hors ligne'}</div></div>${pid?`<button class="btn sm" data-a="prof" data-v="${esc(pid)}">Profil</button>`:''}</div>
    <div class="dmth" id="dmth">${dmThreadHTML(key)}</div>
    <div class="chips" style="margin:8px 0">${["Salut !","Ça va ?","T'as quoi comme team ?","Un conseil ?","On fait un duel ?","Tu cherches une guilde ?"].map(x=>`<button class="chip" data-a="dmq" data-v="${esc(x)}">${esc(x)}</button>`).join('')}</div>
    <form class="row chatf" data-f="dmsay"><label for="dmsay" class="vh">Message privé</label><input class="tx" id="dmsay" maxlength="240" placeholder="Message à ${esc(p?p.n:c.n)}…" autocomplete="off"><button class="btn g" type="submit">Envoyer</button></form></div>`}
  UI.dmk=null;const ks=Object.keys(D).sort((a,b)=>(D[b].lt||0)-(D[a].lt||0));
  const rows=ks.map(k=>{const c=D[k],p=dmWho(k),last=c.msgs[c.msgs.length-1];return`<button class="dmrow ${c.u?'unr':''}" data-a="dmto" data-v="${esc(k)}"><span class="dmav fav frm-${p?frameOf(p):'none'}">${avatarOf(p)}</span><span class="who"><b>${esc(p?p.n:c.n)}</b><small>${last?(last.m?'Toi : ':'')+esc(String(last.x).slice(0,70)):'…'}</small></span><span class="dmt">${last?hm(last.t):''}${c.u?`<i class="pdot">${c.u}</i>`:''}</span></button>`}).join('');
  return`<div class="card"><div class="row" style="justify-content:space-between"><div><div class="h3" style="margin:0">🕊️ Pigeonnier</div><div class="muted" style="font-size:12.5px">Messages privés avec tes amis, ta guilde et tous les joueurs du royaume. Ouvre un profil puis « Message privé », ou :</div></div><button class="btn p" data-a="dmnew">✉️ Nouveau</button></div></div>
  <div class="list dml">${rows||'<div class="card muted">Aucune conversation pour le moment. Les autres joueurs t\'écriront peut-être… ou lance-toi !</div>'}</div>`}
function dmNewModal(){const seen=new Set(),L=[];const add=(p,tag)=>{if(!p||p.me)return;const k=frKey(p);if(seen.has(k))return;seen.add(k);L.push({p,k,tag})};
  for(const f of(S.friends||[]))add(dmWho(f.k),'Ami');
  if(S.rgid)botRows().filter(r=>r.gidr===S.rgid).forEach(r=>add(r,'Guilde'));else if(S.gid)mates().forEach(p=>add(p,'Guilde'));
  realRows().forEach(r=>add(r,'Joueur'));rankList('pw').slice(0,15).forEach(p=>add(p,'Top'));
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h" style="margin-top:0">Nouveau message</div><p class="sub">À qui veux-tu écrire ?</p><div class="list" style="max-height:60vh;overflow:auto">${L.slice(0,40).map(({p,k,tag})=>`<button class="dmrow" data-a="dmto" data-v="${esc(k)}"><span class="dmav fav frm-${frameOf(p)}">${avatarOf(p)}</span><span class="who"><b>${esc(p.n)}</b><small>${fmt(p.pw||0)} de puissance</small></span><i class="rtag">${tag}</i></button>`).join('')||'<p class="muted">Personne pour le moment.</p>'}</div>`)}
function dmOpen(key){const p=dmWho(key);dmConv(key,p?p.n:null);closeModal();TAB='top';UI.lz=UI.lz||{};UI.lz.top='mp';UI.soc='mp';try{LZ.prev.top='mp'}catch(e){}UI.dmk=key;render();window.scrollTo(0,0);setTimeout(()=>{const i=$('#dmsay');if(i)i.focus()},60)}
/* bouton dans le profil */
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{if(id==='me')return;const p=rowById(id);if(!p)return;const k=frKey(p);const box=$('#ovl .modal');if(!box)return;
  let row=[...box.querySelectorAll(':scope > .row')].pop();const btn=`<button class="btn g" data-a="dmto" data-v="${esc(k)}">✉️ Message privé</button>`;
  if(row&&row.querySelector('.btn'))row.insertAdjacentHTML('afterbegin',btn);else box.insertAdjacentHTML('beforeend',`<div class="row" style="margin-top:12px">${btn}</div>`)}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='dmto')dmOpen(v);
  else if(a==='dmback'){UI.dmk=null;render();window.scrollTo(0,0)}
  else if(a==='dmnew')dmNewModal();
  else if(a==='dmq'&&UI.dmk)dmSend(UI.dmk,v)});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-f="dmsay"]');if(!f)return;e.preventDefault();const i=$('#dmsay');if(!i||!UI.dmk)return;const x=i.value;i.value='';dmSend(UI.dmk,x);setTimeout(()=>{const j=$('#dmsay');if(j)j.focus()},30)});
{const r0=render;render=function(){const i=$('#dmsay'),v=i?i.value:'',f=i&&document.activeElement===i;r0();const j=$('#dmsay');if(j){if(v)j.value=v;if(f)j.focus()}const th=$('#dmth');if(th)th.scrollTop=th.scrollHeight}}
