/* ================= Version CrazyGames ================= */
(function(){
window.RDE_CG=true;
/* --- SDK CrazyGames : on prévient quand le joueur est en jeu --- */
let sdk=null,ready=null,inGame=false;
ready=(async()=>{try{if(window.CrazyGames&&window.CrazyGames.SDK){await window.CrazyGames.SDK.init();sdk=window.CrazyGames.SDK}}catch(e){sdk=null}return sdk})();
const gStart=()=>{try{ldStop()}catch(e){}if(inGame)return;inGame=true;ready.then(s=>{try{s&&s.game.gameplayStart()}catch(e){}})};
const gStop=()=>{if(!inGame)return;inGame=false;ready.then(s=>{try{s&&s.game.gameplayStop()}catch(e){}})};
window.__cgReady=ready;
/* chargement : on prévient CrazyGames du début et de la fin du chargement */
let ldOn=false;ready.then(s=>{try{if(s&&!(typeof BOOT!=='undefined'&&BOOT.done)){s.game.loadingStart();ldOn=true}}catch(e){}});
const ldStop=()=>{if(!ldOn)return;ldOn=false;ready.then(s=>{try{s&&s.game.loadingStop()}catch(e){}})};
/* son : on respecte le bouton « couper le son » de CrazyGames */
window.CGMUTE=false;
let cgPrev=null;const cgMuteApply=()=>{try{if(typeof AU!=='undefined'&&AU.master&&AU.ctx){const t=AU.ctx.currentTime,g=AU.master.gain;if(window.CGMUTE){if(cgPrev==null&&g.value>0)cgPrev=g.value;g.cancelScheduledValues(t);g.setValueAtTime(0,t)}else{g.cancelScheduledValues(t);g.setValueAtTime(cgPrev==null?(g.value||1):cgPrev,t);cgPrev=null}}}catch(e){}};
try{const aa=auApply;auApply=function(){const r=aa.apply(this,arguments);try{if(window.CGMUTE&&AU.master){AU.master.gain.cancelScheduledValues(AU.ctx.currentTime);AU.master.gain.setValueAtTime(0,AU.ctx.currentTime)}}catch(e){}return r}}catch(e){}
ready.then(s=>{try{if(!s)return;const st=s.game.settings||{};window.CGMUTE=!!st.muteAudio;cgMuteApply();s.game.addSettingsChangeListener(n=>{try{window.CGMUTE=!!(n&&n.muteAudio);cgMuteApply()}catch(e){}})}catch(e){}});
setInterval(()=>{if(window.CGMUTE)cgMuteApply()},2000);
try{if(typeof btEnter==='function'){const be=btEnter;btEnter=function(){const r=be.apply(this,arguments);gStart();return r}}}catch(e){}
/* sur CrazyGames : pas d'écran « touche pour entrer », on entre dès que le jeu est prêt */
{const t0=Date.now();const iv=setInterval(()=>{try{if(typeof BOOT==='undefined'){return}if(BOOT.done){clearInterval(iv);gStart();return}if((typeof BT2!=='undefined'&&BT2.ready)||Date.now()-t0>12000){clearInterval(iv);btEnter()}}catch(e){}},150)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)gStop();else if(!document.getElementById('boot')||document.getElementById('boot').style.display==='none')gStart()});
setTimeout(()=>{try{if(!document.querySelector('#boot:not([style*="none"])'))gStart()}catch(e){}},15000);
/* --- pas de liens vers d'autres sites ni de dons --- */
const st=document.createElement('style');st.textContent='[data-a="support"],[data-a="invite"],[data-a="xfimp"],[data-a="xfexp"],.supbtn{display:none!important}body{-webkit-user-select:none;user-select:none;-webkit-touch-callout:none}input,textarea,[contenteditable]{-webkit-user-select:text;user-select:text}';document.head.appendChild(st);
try{const bad=/itch|github|appli RDE|nouvelle appli|déménag|version Claude|ancienne version|Soutenir le jeu|Mécène|installer/i;
  for(const P of PATCH){if(Array.isArray(P.items))P.items=P.items.filter(x=>!bad.test(String(x)))}
  for(let i=PATCH.length-1;i>=0;i--)if(!PATCH[i].items||!PATCH[i].items.length)PATCH.splice(i,1)}catch(e){}
/* politique de confidentialité aussi dans les paramètres */
try{const sm2=settingsModal;settingsModal=function(){const r=sm2.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('.cgpriv'))m.insertAdjacentHTML('beforeend','<p class="muted cgpriv" style="font-size:12px;text-align:center;margin-top:10px"><a href="https://raptor4375.github.io/rde/legal/privacy.html" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">Politique de confidentialité</a></p>')}catch(e){}return r}}catch(e){}
/* le tuto attend que le pseudo soit choisi */
try{const ts=tuStart;tuStart=function(force){if(!force&&!S.name)return;return ts.apply(this,arguments)}}catch(e){}
/* --- compte : texte sans lien externe --- */
try{const am=accModal;accModal=function(){const r=am.apply(this,arguments);try{const li=document.querySelector('#ovl .modal .xfol li');if(li)li.innerHTML="Sur ton autre appareil, ouvre <b>Royaumes d'Éther</b>."}catch(e){}return r}}catch(e){}
/* --- premier lancement : choix du pseudo + « j'ai un code de compte » --- */
try{const nm=nameModal;nameModal=function(){if(!S.xferAsk){S.xferAsk=1;try{save()}catch(e){}}const r=nm.apply(this,arguments);
  try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=accfind]'))m.insertAdjacentHTML('beforeend','<button class="btn" data-a="accfind" style="width:100%;margin-top:10px">🔑 J\'ai déjà un compte (code de compte)</button><p class="muted" style="font-size:11.5px;margin:10px 0 0;text-align:center">En jouant, tu acceptes notre <a href="https://raptor4375.github.io/rde/legal/privacy.html" target="_blank" rel="noopener" style="color:inherit;text-decoration:underline">politique de confidentialité</a>.</p>')}catch(e){}return r}}catch(e){}
})();
/* --- sauvegarde liée au compte CrazyGames (module Data du SDK) --- */
(function(){const DK='rde-save',TK=KEY+'-cgT';let last=0,pend=null;
  const ls=(k,v)=>{try{if(v===undefined)return localStorage.getItem(k);localStorage.setItem(k,String(v))}catch(e){return null}};
  function put(){try{const sdk=window.CrazyGames&&window.CrazyGames.SDK;if(!sdk||!sdk.data||!S||!S.name)return;const t=Date.now();
    sdk.data.setItem(DK,JSON.stringify({t,s:JSON.stringify(typeof xferSlim==='function'?xferSlim(S):S)}));ls(TK,t);last=t}catch(e){}}
  const sv=save;save=function(){const r=sv.apply(this,arguments);if(Date.now()-last>20000)put();else if(!pend)pend=setTimeout(()=>{pend=null;put()},20000);return r};
  document.addEventListener('visibilitychange',()=>{if(document.hidden)put()});
  setTimeout(async()=>{try{const sdk=window.__cgReady?await window.__cgReady:null;if(!sdk||!sdk.data)return;
    const raw=sdk.data.getItem(DK);if(!raw){put();return}const o=JSON.parse(raw);if(!o||!o.s)return;const mine=+ls(TK)||0;
    const local=(()=>{try{return JSON.parse(localStorage.getItem(KEY)||'null')}catch(e){return null}})();
    if(!local||!local.name||o.t>mine+60000){const N=JSON.parse(o.s);if(N&&N.heroes){localStorage.setItem(KEY,JSON.stringify(N));ls(TK,o.t);location.reload()}}else put()}catch(e){}},2500);
})();
/* --- réglage CrazyGames « désactiver le tchat » : on cache tous les tchats --- */
(function(){const st=document.createElement('style');st.id='cgnochat';
  const apply=on=>{st.textContent=on?'.chat,.chatf,.emobar,form[data-f="say"],form[data-f="wsay"],form[data-f="dmsay"],.clban,[data-a="chub"],[data-v="monde"][data-a="soc"],[data-a="dmnew"],.msgs,#wchat,#chat{display:none!important}':'';if(!st.isConnected)document.head.appendChild(st)};
  (window.__cgReady||Promise.resolve(null)).then(s=>{try{if(!s)return;apply(!!(s.game.settings||{}).disableChat);s.game.addSettingsChangeListener(n=>{try{apply(!!(n&&n.disableChat))}catch(e){}})}catch(e){}});
})();
