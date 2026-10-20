
/* ================= tutoriel guidé avec Plume, la mascotte ================= */
function plumeSVG(mood){const O='#140c24';const happy=mood!=='think';
  return`<svg viewBox="0 0 100 100" class="plume" aria-hidden="true"><defs><radialGradient id="plb" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#b8a4ff"/><stop offset=".7" stop-color="#7c5cff"/><stop offset="1" stop-color="#4a2ab8"/></radialGradient><radialGradient id="plg" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".9"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient></defs>
   <ellipse cx="50" cy="95" rx="22" ry="4" fill="#000" opacity=".25"/>
   <path d="M50 90Q60 96 70 88Q62 86 58 80Z" fill="#ffd84a" stroke="${O}" stroke-width="1.6"/><circle cx="70" cy="88" r="5" fill="url(#plg)"/>
   <path d="M20 58Q6 54 6 40Q16 46 24 46Z" fill="#9a84ff" stroke="${O}" stroke-width="1.8" class="plw l"/><path d="M80 58Q94 54 94 40Q84 46 76 46Z" fill="#9a84ff" stroke="${O}" stroke-width="1.8" class="plw r"/>
   <ellipse cx="50" cy="60" rx="30" ry="28" fill="url(#plb)" stroke="${O}" stroke-width="2"/>
   <ellipse cx="50" cy="70" rx="17" ry="14" fill="#efe8ff" stroke="${O}" stroke-width="1.4"/><path d="M42 66q3 2 6 0M52 66q3 2 6 0M46 73q3 2 6 0" stroke="#c8b8f0" stroke-width="1.4" fill="none"/>
   <circle cx="39" cy="54" r="10" fill="#fff" stroke="${O}" stroke-width="1.6"/><circle cx="61" cy="54" r="10" fill="#fff" stroke="${O}" stroke-width="1.6"/>
   ${happy?`<circle cx="40" cy="55" r="5" fill="${O}"/><circle cx="62" cy="55" r="5" fill="${O}"/><circle cx="42" cy="53" r="1.8" fill="#fff"/><circle cx="64" cy="53" r="1.8" fill="#fff"/>`:`<path d="M34 56q5 -4 10 0M56 56q5 -4 10 0" stroke="${O}" stroke-width="2.4" fill="none" stroke-linecap="round"/>`}
   <path d="M47 61L50 66L53 61Z" fill="#ffb03a" stroke="${O}" stroke-width="1.2"/>
   <ellipse cx="31" cy="64" rx="4" ry="2.4" fill="#ff8ac0" opacity=".7"/><ellipse cx="69" cy="64" rx="4" ry="2.4" fill="#ff8ac0" opacity=".7"/>
   <path d="M28 38Q30 30 50 30Q70 30 72 38Q60 35 50 35Q40 35 28 38Z" fill="#3a2a8a" stroke="${O}" stroke-width="1.6"/>
   <path d="M36 35Q42 6 62 4Q54 14 60 34Z" fill="#4a3aa8" stroke="${O}" stroke-width="1.8"/><path d="M62 4l2 -3" stroke="${O}"/><circle cx="62" cy="4" r="3" fill="#ffd84a" stroke="${O}" stroke-width="1.2"/>
   <path d="M48 20l1.6 3.4l3.6 .4l-2.7 2.4l.8 3.6l-3.3 -1.9l-3.3 1.9l.8 -3.6l-2.7 -2.4l3.6 -.4z" fill="#ffd84a" stroke="${O}" stroke-width=".8"/>
   <circle cx="18" cy="24" r="2" fill="#fff6c0" class="pls"/><circle cx="84" cy="20" r="1.6" fill="#fff6c0" class="pls d"/><circle cx="88" cy="70" r="1.4" fill="#fff6c0" class="pls"/></svg>`}
const TUTO=[
 {t:"Salut, moi c'est <b>Plume</b> ! 🦉✨",x:"Je suis le gardien de ce royaume et je vais te montrer l'essentiel en 1 minute.<br><br>🎯 <b>Le but du jeu :</b> rassembler une équipe de héros, devenir de plus en plus fort et terminer les <b>100 étapes de l'Aventure</b>, battre les boss et grimper au classement !",tab:'adv'},
 {sel:'[data-a="tab"][data-v="adv"]',tab:'adv',t:'⚔️ Aventure',x:"C'est ici que tout commence. Lance les étapes une par une : chaque victoire te donne de l'<b>or</b>, des <b>gemmes</b> et de l'<b>équipement</b>. Tous les 10 niveaux, un boss t'attend.<br><br>Bloqué ? Pas de panique, il faut juste rendre tes héros plus forts 👇"},
 {sel:'[data-a="tab"][data-v="heros"]',tab:'heros',t:'🧙 Héros',x:"Ta collection. Touche un héros pour <b>monter son niveau</b> avec de l'or, l'<b>équiper</b>, le faire <b>évoluer</b> avec ses doublons et, pour les légendaires, l'<b>éveiller</b>.<br><br>Ici aussi : les <b>équipes</b> (une par mode de jeu). Mets tes héros les plus forts dedans !"},
 {sel:'[data-a="tab"][data-v="invoc"]',tab:'invoc',t:'⭐ Invocations',x:"Dépense tes <b>gemmes</b> et tes tickets pour obtenir de nouveaux héros. Plus la rareté est haute (Épique, Légendaire…), plus le héros est puissant.<br><br>Les doublons ne sont jamais perdus : ils servent à faire évoluer tes héros."},
 {sel:'[data-a="tab"][data-v="equip"]',tab:'equip',t:'🛡️ Équipement',x:"Armes, armures, bijoux… Équipe-les sur tes héros, améliore-les à la <b>forge</b> et fusionne ceux dont tu ne veux plus. Un héros bien équipé peut doubler de puissance !"},
 {sel:'[data-a="tab"][data-v="quetes"]',tab:'quetes',t:'📜 Quêtes',x:"Chaque jour, des quêtes faciles qui rapportent beaucoup de <b>gemmes</b>. Fais-les tous les jours : c'est le meilleur moyen d'invoquer plus souvent.<br><br>Pense aussi au calendrier 📅 en haut : un cadeau chaque jour de connexion."},
 {sel:'[data-a="tab"][data-v="boss"]',tab:'boss',t:'🐉 Combats',x:"Quand ton équipe est prête : l'<b>arène</b> contre les autres joueurs, les <b>raids</b> contre des boss géants et la <b>Tour de l'Infini</b>. Plein de récompenses et un classement."},
 {sel:'[data-a="tab"][data-v="guilde"]',tab:'guilde',t:'🛡️ Guilde',x:"Rejoins une guilde ! Avec elle tu attaques le <b>Golem</b>, tu discutes à la taverne et, dans le <b>Grand hall</b>, tu envoies tes héros en <b>expédition</b> pour ramener du butin pendant que tu fais autre chose."},
 {sel:'[data-a="tab"][data-v="event"]',tab:'event',t:'🎪 Fête foraine',x:"Tous les événements du moment : le <b>pass</b>, le <b>boss de saison</b>, le casino, la Capitale d'Éther… Passe y faire un tour régulièrement, ça change souvent !"},
 {sel:'[data-a="tab"][data-v="top"]',tab:'top',t:'💬 Social',x:"Le tchat du royaume, tes amis, tes messages privés, le courrier et les classements. Écris <b>@Claude</b> si tu as une question sur le jeu !"},
 {sel:'.cur.curb',tab:'adv',t:'💎 Tes ressources',x:"En haut : tes <b>gemmes</b> (pour invoquer) et ton <b>or</b> (pour monter tes héros). Touche-les pour ouvrir la boutique."},
 {tab:'adv',t:'🔁 La recette pour avancer',x:"<div class='tuloop'><span>⚔️ Combats</span><i>→</i><span>💰 Or & objets</span><i>→</i><span>🧙 Monte tes héros</span><i>→</i><span>⭐ Invoque</span><i>→</i><span>💪 Plus fort !</span></div>Recommence cette boucle et tu verras ton équipe exploser 🚀<br><br>Tu peux revoir ce tuto quand tu veux avec le petit bouton <b>📖 Tuto</b> en haut de chaque lieu, ou dans les ⚙️ paramètres. Bonne aventure !",end:1}];
const TU={on:false,i:0};
function tuStart(force){if(TU.on)return;if(!force&&S.tuto)return;TU.on=true;TU.i=0;try{closeModal()}catch(e){}tuShow()}
function tuEnd(done){TU.on=false;S.tuto=done?2:1;save();const o=document.getElementById('tuov');if(o)o.remove();try{TAB='adv';UI.lz=UI.lz||{};render();window.scrollTo(0,0)}catch(e){}if(done)toast('🦉 Tuto terminé : à toi de jouer !')}
function tuShow(){const st=TUTO[TU.i];if(!st)return tuEnd(true);
  try{if(st.tab&&TAB!==st.tab){TAB=st.tab;UI.lz=UI.lz||{};UI.lz[st.tab]=null;render();window.scrollTo(0,0)}else{UI.lz=UI.lz||{};if(UI.lz[TAB]){UI.lz[TAB]=null;render()}}}catch(e){}
  let o=document.getElementById('tuov');if(!o){o=document.createElement('div');o.id='tuov';o.setAttribute('role','dialog');o.setAttribute('aria-modal','true');document.body.appendChild(o)}
  const el=st.sel?[...document.querySelectorAll(st.sel)].find(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0}):null;
  const n=TUTO.length,dots=TUTO.map((_,k)=>`<i class="${k===TU.i?'on':k<TU.i?'ok':''}"></i>`).join('');
  let hole='',arrow='',pos='mid';
  if(el){const r=el.getBoundingClientRect(),pad=6,x=r.left-pad,y=r.top-pad,w=r.width+pad*2,h=r.height+pad*2;const low=r.top>innerHeight/2;pos=low?'top':'bot';
    hole=`<div class="tuhole" style="left:${x}px;top:${y}px;width:${w}px;height:${h}px"></div>`;
    const ax=Math.min(innerWidth-30,Math.max(30,r.left+r.width/2));arrow=`<div class="tuarr ${low?'dn':'up'}" style="left:${ax}px;top:${low?y-58:y+h+6}px">${low?'⬇️':'⬆️'}</div>`}
  else hole='<div class="tudim"></div>';
  o.innerHTML=`${hole}${arrow}<div class="tubox ${pos}"><div class="tumasc">${plumeSVG(st.end?'happy':TU.i%3===2?'think':'happy')}</div><div class="tubub"><div class="tut">${st.t}</div><div class="tux">${st.x}</div>
    <div class="tudots">${dots}</div><div class="tubtns">${TU.i>0?'<button class="btn sm" data-tu="prev">←</button>':''}<button class="btn sm tuskip" data-tu="skip">Passer le tuto</button><button class="btn p" data-tu="next">${st.end?'C\'est parti ! 🚀':TU.i===0?'Montre-moi !':'Suivant →'}</button></div><div class="tustep">${TU.i+1} / ${n}</div></div></div>`}
document.addEventListener('click',e=>{const o=document.getElementById('tuov');if(!o||!TU.on)return;if(!o.contains(e.target)){e.preventDefault();e.stopPropagation();return}
  const b=e.target.closest('[data-tu]');e.preventDefault();e.stopPropagation();if(!b)return;const a=b.dataset.tu;
  if(a==='next'){TU.i++;if(TU.i>=TUTO.length)tuEnd(true);else tuShow()}
  else if(a==='prev'){TU.i=Math.max(0,TU.i-1);tuShow()}
  else if(a==='skip'){if(o.querySelector('.tuconf'))return;o.querySelector('.tubub').insertAdjacentHTML('beforeend',`<div class="tuconf"><b>Tu es sûr ?</b> Le tuto est fortement conseillé pour bien démarrer. Tu pourras le revoir avec 📖 Tuto.<div class="row" style="gap:8px;margin-top:8px"><button class="btn sm" data-tu="skipok">Oui, passer</button><button class="btn sm p" data-tu="skipno">Non, je continue</button></div></div>`)}
  else if(a==='skipok')tuEnd(false);else if(a==='skipno'){const c=o.querySelector('.tuconf');if(c)c.remove()}},true);
['pointerdown','touchstart'].forEach(ev=>document.addEventListener(ev,e=>{if(TU.on&&!e.target.closest('#tuov')){e.stopPropagation()}},true));
window.addEventListener('resize',()=>{if(TU.on)tuShow()});
/* lancement automatique : une fois le chargement passé et les fenêtres fermées */
setInterval(()=>{try{if(window.TUTO_OFF||TU.on||S.tuto||!BOOT.done||B||$('#ovl').innerHTML)return;tuStart()}catch(e){}},1200);
/* revoir le tuto : petit bouton en haut de chaque lieu + paramètres */
{const lp=lobbyPage;lobbyPage=function(){const h=lp.apply(this,arguments);return h.replace('<span class="lphase">','<button class="lphase tubtn" data-a="tuto">📖 Tuto</button><span class="lphase">')}}
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=tuto]'))m.insertAdjacentHTML('beforeend','<button class="btn" data-a="tuto" style="width:100%;margin-top:8px">📖 Revoir le tutoriel avec Plume</button>')}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="tuto"]');if(!t)return;e.preventDefault();e.stopPropagation();try{closeModal()}catch(er){}tuStart(true)},true);
