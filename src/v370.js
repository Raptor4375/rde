
/* ================= V38.8 : correctifs de fluidité =================
   1) Pendant un combat, la page cachée derrière (Aventure, scènes animées…) continuait de s'animer :
      sur téléphone, le combat ramait (≈ 12 images/s au lieu de 30 en test). On la retire de l'affichage
      pendant le combat, et on remet la page à la même hauteur en sortant. */
(function(){try{
 const st=document.createElement('style');st.textContent='body.inb #app,body.inb nav.tabs{display:none!important}';document.head.appendChild(st);
 const BSY={y:null};
 {const sb=startBattle;startBattle=function(){const y=window.scrollY||0,had=!!B;const r=sb.apply(this,arguments);try{if(!had&&B&&document.getElementById('battle'))BSY.y=y}catch(e){}return r}}
 {const cb=closeBattle;closeBattle=function(){const y=BSY.y;BSY.y=null;const r=cb.apply(this,arguments);try{if(y)window.scrollTo(0,y)}catch(e){}return r}}
}catch(e){console.warn('fluidité',e)}})();
