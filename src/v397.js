
/* ================= FLUIDITÉ =================
   1) Les dessins animés (SVG) s'arrêtent quand on ne les voit pas : hors de l'écran, ou cachés derrière une fenêtre ouverte.
   2) Les effets coûteux à redessiner sont remplacés par des équivalents légers (ombres portées, flou des nuages).
   3) Sur un appareil qui peine (images par seconde trop basses), le jeu passe tout seul en mode léger :
      les petites animations de décor (lucioles, nuages, particules) s'arrêtent. */
(function(){try{
const st=document.createElement('style');st.textContent=`
.lpl .li{filter:none!important;text-shadow:0 2px 4px rgba(0,0,0,.65)}
.cld{filter:none!important;background:radial-gradient(closest-side,rgba(255,255,255,.6),rgba(255,255,255,.3) 65%,rgba(255,255,255,0))!important;will-change:transform}
.hvbody svg,.tumasc svg{filter:none!important}
.hvbody svg{will-change:transform}
.ffly{width:12px!important;height:12px!important;box-shadow:none!important;background:radial-gradient(circle,#f4ffb0 0,#e8ff7a 22%,rgba(220,255,90,.45) 40%,rgba(220,255,90,0) 70%)!important}
.ffly,.pp{will-change:transform,opacity}
.lobby>img.lbst+img.lbanim{display:none!important}
.bar i::after{animation:none!important;display:none!important}
body.rdmodal #main,body.rdmodal #main *,body.rdmodal .nav,body.rdmodal .nav *{animation-play-state:paused!important}
.hvscene .sfloat:nth-of-type(2n){display:none}
body.rdlite .hvscene .sfloat,body.rdlite .hvscene .sleaf,body.rdlite .hvscene .sbat{display:none!important}
body.rdlite .ffly,body.rdlite .cld,body.rdlite .pp{animation:none!important;display:none!important}
body.rdlite .hvbody svg{animation:none!important}
body.rdlite .skc,body.rdlite .card{box-shadow:none}`;
document.head.appendChild(st);
/* ---------- les animations des dessins : en pause quand on ne les voit pas ---------- */
const AN='animate,animateTransform,animateMotion';const VIS=new WeakMap();let io=null;
try{io=new IntersectionObserver(es=>{for(const e of es)VIS.set(e.target,e.isIntersecting);sync()},{rootMargin:'60px'})}catch(e){}
const seen=new WeakSet();const PAUSED=new Set();let pend=0;
function sync(){pend=0;try{const ov=document.getElementById('ovl');const open=!!(ov&&ov.firstElementChild&&ov.innerHTML.length>20);const lite=document.body.classList.contains('rdlite');document.body.classList.toggle('rdmodal',open);
  /* fenêtre ouverte : les animations de la page derrière s'arrêtent (on ne les voit pas) */
  try{if(open){for(const a of document.getAnimations()){const t=a.effect&&a.effect.target;if(t&&!(ov.contains(t))&&a.playState==='running'){a.pause();PAUSED.add(a)}}}
    else if(PAUSED.size){for(const a of PAUSED)try{a.play()}catch(e){}PAUSED.clear()}}catch(e){}
  for(const s of document.querySelectorAll('svg')){if(s.ownerSVGElement||typeof s.pauseAnimations!=='function')continue;
    if(!seen.has(s)){seen.add(s);const na=s.querySelectorAll(AN).length;if(!na){s.__na=1;continue}const nn=s.getElementsByTagName('*').length;s.__big=na>12||nn>450;s.__mid=nn>150;if(io)io.observe(s)}if(s.__na)continue;
    const inOv=!!(ov&&ov.contains(s));const vis=VIS.has(s)?VIS.get(s):true;
    /* les grands dessins de la page (illustrations d'histoire, bannières) restent figés : chaque petite animation
       obligeait le téléphone à redessiner tout le dessin. Dans une fenêtre ouverte (fiche d'un héros…), ils bougent. */
    /* dans une fenêtre, un grand dessin bouge 6 secondes puis se fige (la respiration du héros continue) */
    if(inOv&&(s.__big||s.__mid)&&!s.__t0){s.__t0=Date.now();setTimeout(sync,6200)}
    const ovRun=inOv&&(!(s.__big||s.__mid)||Date.now()-s.__t0<6000);
    const run=!document.hidden&&vis&&(ovRun||(!open&&!s.__big))&&(!lite||ovRun||!!s.closest('.btl,.battle,#bt,.arena'));
    if(run!==s.__run){s.__run=run;try{run?s.unpauseAnimations():s.pauseAnimations()}catch(e){}}}}catch(e){}}
const later=()=>{if(!pend)pend=setTimeout(sync,120)};
try{new MutationObserver(later).observe(document.body,{childList:true,subtree:true})}catch(e){}
document.addEventListener('visibilitychange',sync);
/* ---------- mode léger automatique ---------- */
function probe(){let n=0,t0=0,slow=0;const f=t=>{if(!t0)t0=t;n++;if(t-t0<3000)return requestAnimationFrame(f);const fps=n*1000/(t-t0);
  try{if(fps<40){slow=1;document.body.classList.add('rdlite');later()}window.RDE_FPS=Math.round(fps)}catch(e){}};requestAnimationFrame(f)}
setTimeout(()=>{const go=()=>{if(typeof BOOT!=='undefined'&&!BOOT.done)return setTimeout(go,1500);setTimeout(probe,2500)};go()},3000);
later();
try{const I=["🚀 <b>Le jeu est beaucoup plus fluide</b> : les décors des lieux s'affichent en image fixe (au lieu d'un gros dessin qui se redessinait sans arrêt), les grandes illustrations s'animent seulement quand c'est utile, et tout ce qui est caché derrière une fenêtre se met en pause.","🔋 Sur les téléphones qui peinent, le jeu passe tout seul en <b>mode léger</b> (moins de petites animations de décor) : moins de saccades et moins de batterie."];
 PATCH.unshift({v:43,d:'9 novembre 2026',t:'Plus fluide',items:I});
 I18N_EN['Plus fluide']='Smoother';I18N_EN[I[0]]="🚀 <b>The game is much smoother</b>: place backgrounds are shown as still images (instead of a big drawing that kept redrawing itself), large illustrations only animate when it's useful, and everything hidden behind a window is paused.";
 I18N_EN[I[1]]="🔋 On phones that struggle, the game automatically switches to <b>light mode</b> (fewer small background animations): less stutter and less battery drain."}catch(e){}
}catch(e){console.warn('fluidité',e)}})();
