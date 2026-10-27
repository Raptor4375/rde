/* ================= V36.7 : classement plus fluide + Tour réaliste ================= */
/* 1) la liste des bots n'est recalculée qu'une fois toutes les 1,5 s (avant : 4 fois par affichage) */
{const br=botRows;let c=null,ct=0,cg=null,cp=null;botRows=function(){const n=Date.now();if(!c||cg!==NET.guilds||cp!==NET.players||n-ct>1500){c=br.apply(this,arguments);cg=NET.guilds;cp=NET.players;ct=n}return c.map(r=>Object.assign({},r))}}
{const fr=freeRows;let c=null,ct=0,cp=null;freeRows=function(){const n=Date.now();if(!c||cp!==NET.players||n-ct>1500){c=fr.apply(this,arguments);cp=NET.players;ct=n}return c.map(r=>Object.assign({},r))}}
