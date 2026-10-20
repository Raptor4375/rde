/* ================= mode arrière-plan : quand une fenêtre de l'appli passe devant (partage, clavier…), le jeu se met en pause ================= */
const BGP={on:false,pend:false};
function bgpPause(){if(BGP.on)return;BGP.on=true;document.documentElement.classList.add('bgpause');try{document.querySelectorAll('svg').forEach(s=>{try{s.pauseAnimations()}catch(e){}})}catch(e){}}
function bgpResume(){if(!BGP.on)return;BGP.on=false;document.documentElement.classList.remove('bgpause');try{document.querySelectorAll('svg').forEach(s=>{try{s.unpauseAnimations()}catch(e){}})}catch(e){}if(BGP.pend){BGP.pend=false;try{render()}catch(e){}}}
window.addEventListener('blur',()=>{setTimeout(()=>{if(!document.hasFocus())bgpPause()},60)});
window.addEventListener('focus',bgpResume);
['pointerdown','touchstart','keydown'].forEach(ev=>window.addEventListener(ev,()=>{BGP.ever=true;bgpResume()},{capture:true,passive:true}));
setInterval(()=>{try{const f=document.hasFocus();if(f)BGP.had=true;else if(BGP.ever&&BGP.had&&!BGP.on)bgpPause()}catch(e){}},400);
document.addEventListener('visibilitychange',()=>{if(document.visibilityState==='visible'&&document.hasFocus())bgpResume()});
{const r1=render;render=function(){if(BGP.on&&!B){BGP.pend=true;return}return r1.apply(this,arguments)}}
{const st=window.scrollTo.bind(window);window.scrollTo=function(){if(BGP.on)return;return st.apply(null,arguments)}}
{const rt=renderTabs;renderTabs=function(){if(BGP.on)return;return rt.apply(this,arguments)}}
