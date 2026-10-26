/* ================= Version CrazyGames ================= */
(function(){
window.RDE_CG=true;
/* --- SDK CrazyGames : on prévient quand le joueur est en jeu --- */
let sdk=null,ready=null,inGame=false;
ready=(async()=>{try{if(window.CrazyGames&&window.CrazyGames.SDK){await window.CrazyGames.SDK.init();sdk=window.CrazyGames.SDK}}catch(e){sdk=null}return sdk})();
const gStart=()=>{if(inGame)return;inGame=true;ready.then(s=>{try{if(s&&loading){loading=false;s.game.loadingStop()}}catch(e){}try{s&&s.game.gameplayStart()}catch(e){}})};
const gStop=()=>{if(!inGame)return;inGame=false;ready.then(s=>{try{s&&s.game.gameplayStop()}catch(e){}})};
let loading=false;try{ready.then(s=>{try{if(s&&!inGame&&s.game.loadingStart){s.game.loadingStart();loading=true}}catch(e){}})}catch(e){}
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
/* --- sauvegarde liée au compte CrazyGames (module Data du SDK) --- */
(function(){const DK='rde-save',TK=KEY+'-cgT';let last=0,pend=null;
  const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,String(v))}catch(e){return null}};
  function put(){try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(!sdk||!sdk.data||!S||!S.name)return;const t=Date.now();
    sdk.data.setItem(DK,JSON.stringify({t,s:JSON.stringify(typeof xferSlim==='function'?xferSlim(S):S)}));ls(TK,t);last=t}catch(e){}}
  const sv=save;save=function(){const r=sv.apply(this,arguments);if(Date.now()-last>20000)put();else if(!pend)pend=setTimeout(()=>{pend=null;put()},20000);return r};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)put()});
  setTimeout(async()=>{try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(!sdk)return;try{await sdk.init()}catch(e){}if(!sdk.data)return;
    const raw=sdk.data.getItem(DK);if(!raw){put();return}const o=JSON.parse(raw);if(!o||!o.s)return;const mine=+ls(TK)||0;
    const local=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}})();
    if(!local||!local.name||o.t>mine+60000){const N=JSON.parse(o.s);if(N&&N.heroes){localStorage.setItem(KEY,JSON.stringify(N));ls(TK,o.t);location.reload()}}else put()}catch(e){}},2500);
})();
