
/* ================= V37.8 : portails (CrazyGames, Newgrounds) — pas de question « ancienne version » pour un nouveau joueur ================= */
try{Object.assign(I18N_EN,{"Je suis nouveau":"I'm new","🆕 Je suis nouveau":"🆕 I'm new","Bienvenue dans RDE !":"Welcome to RDE!","Le royaume est prêt !":"The kingdom is ready!","Le royaume est prêt":"The kingdom is ready","Éryndel en pied":"Éryndel, full body"})}catch(e){}
if(window.RDE_CG){const nm=nameModal;nameModal=function(){try{if(!S.xferAsk){S.xferAsk=1;save()}}catch(e){}return nm.apply(this,arguments)}}
try{I18N_RULES.push([/^(🏆 )?Succès débloqué : (.+)$/,(m)=>(m[1]||'')+'Achievement unlocked: '+tr(m[2])])}catch(e){}
/* rangs : 1e en français, 1st en anglais… */
function ordE(n){n=Number(n);if(!(n>0))return '—';if(typeof LANG==='undefined'||LANG==='fr')return n+'e';if(LANG==='en'){const t=n%100;return n+((t>10&&t<14)?'th':(['th','st','nd','rd'][n%10]||'th'))}return '#'+n}
try{I18N_RULES.push([/^🏷️ Nouveau titre : « (.+) » !$/,(m)=>'🏷️ New title: “'+tr(m[1])+'”!'])}catch(e){}
/* profil et salle des trophées : beaucoup moins d'animations en même temps (ça faisait ramer les téléphones) */
(function(){const st=document.createElement('style');st.id='v357css';st.textContent=`
.frames .frm-pick:not(.sel) .fav,.frames .frm-pick:not(.sel) .fav::before,.frames .frm-pick:not(.sel) .fav::after{animation:none!important}
body:has(#ovl .modal) #main *,body:has(#ovl .modal) #main *::before,body:has(#ovl .modal) #main *::after{animation-play-state:paused!important}
#ovl .modal{overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y}
`;document.head.appendChild(st)})();
