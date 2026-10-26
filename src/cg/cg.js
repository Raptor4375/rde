/* ================= Version CrazyGames ================= */
(function(){
window.RDE_CG=true;
/* --- SDK CrazyGames : on prévient quand le joueur est en jeu --- */
let sdk=null,ready=null,inGame=false;
ready=(async()=>{try{if(window.CrazyGames&&window.CrazyGames.SDK){await window.CrazyGames.SDK.init();sdk=window.CrazyGames.SDK}}catch(e){sdk=null}return sdk})();
const gStart=()=>{if(inGame)return;inGame=true;ready.then(s=>{try{s&&s.game.gameplayStart()}catch(e){}})};
const gStop=()=>{if(!inGame)return;inGame=false;ready.then(s=>{try{s&&s.game.gameplayStop()}catch(e){}})};
try{ready.then(s=>{try{if(s&&s.game&&s.game.loadingStop)s.game.loadingStop()}catch(e){}})}catch(e){}
try{if(typeof btEnter==='function'){const be=btEnter;btEnter=function(){const r=be.apply(this,arguments);gStart();return r}}}catch(e){}
document.addEventListener('visibilitychange',()=>{if(document.hidden)gStop();else if(!document.getElementById('boot')||document.getElementById('boot').style.display==='none')gStart()});
setTimeout(()=>{try{if(!document.querySelector('#boot:not([style*="none"])'))gStart()}catch(e){}},15000);
/* --- pas de liens vers d'autres sites ni de dons --- */
const st=document.createElement('style');st.textContent='[data-a="support"],[data-a="invite"],[data-a="xfimp"],[data-a="xfexp"],.supbtn{display:none!important}body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}';document.head.appendChild(st);
try{const bad=/itch|github|appli RDE|nouvelle appli|déménag|version Claude|ancienne version|Soutenir le jeu|Mécène|installer/i;
  for(const P of PATCH){if(Array.isArray(P.items))P.items=P.items.filter(x=>!bad.test(String(x)))}
  for(let i=PATCH.length-1;i>=0;i--)if(!PATCH[i].items||!PATCH[i].items.length)PATCH.splice(i,1)}catch(e){}
/* --- compte : texte sans lien externe --- */
try{const am=accModal;accModal=function(){const r=am.apply(this,arguments);try{const li=document.querySelector('#ovl .modal .xfol li');if(li)li.innerHTML="Sur ton autre appareil, ouvre <b>Royaumes d'Éther</b>."}catch(e){}return r}}catch(e){}
/* --- premier lancement : choix du pseudo + « j'ai un code de compte » --- */
try{const nm=nameModal;nameModal=function(){if(!S.xferAsk){S.xferAsk=1;try{save()}catch(e){}}const r=nm.apply(this,arguments);
  try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=accfind]'))m.insertAdjacentHTML('beforeend','<button class="btn" data-a="accfind" style="width:100%;margin-top:10px">🔑 J\'ai déjà un compte (code de compte)</button>')}catch(e){}return r}}catch(e){}
})();
