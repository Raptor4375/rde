
/* ================= V37.8 : portails (CrazyGames, Newgrounds) — pas de question « ancienne version » pour un nouveau joueur ================= */
try{Object.assign(I18N_EN,{"Je suis nouveau":"I'm new","🆕 Je suis nouveau":"🆕 I'm new","Bienvenue dans RDE !":"Welcome to RDE!","Le royaume est prêt !":"The kingdom is ready!","Le royaume est prêt":"The kingdom is ready","Éryndel en pied":"Éryndel, full body"})}catch(e){}
if(window.RDE_CG){const nm=nameModal;nameModal=function(){try{if(!S.xferAsk){S.xferAsk=1;save()}}catch(e){}return nm.apply(this,arguments)}}
try{I18N_RULES.push([/^(🏆 )?Succès débloqué : (.+)$/,(m)=>(m[1]||'')+'Achievement unlocked: '+tr(m[2])])}catch(e){}
