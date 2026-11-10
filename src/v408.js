/* ================= V408 : les héros de l'événement rejoignent les invocations =================
   L'événement « L'Éveil du Roi de Cendre » est terminé : ses trois chroniques quittent le mode histoire,
   et ses héros exclusifs (Éryndel, Aegis, Lyra, Sorën) deviennent invocables comme les autres. */
(function(){try{
const IDS=[];
try{for(const i of[typeof ERY!=='undefined'?ERY:68,typeof AEG!=='undefined'?AEG:69,typeof LYR!=='undefined'?LYR:70,typeof SOR!=='undefined'?SOR:71]){
  const h=HEROES[i];if(!h||!h.ex)continue;delete h.ex;delete h.exd;IDS.push(i)}}catch(e){}
/* les cartes des chroniques de l'événement quittent l'onglet Aventure */
try{const sc=sagaCard;sagaCard=function(){let h=sc.apply(this,arguments);try{h=h.replace(/<button class="card acban[^"]*"[\s\S]*?<\/button>/g,'')}catch(e){}return h}}catch(e){}
/* annonce */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(Date.now()<Date.UTC(2026,11,1)&&!L.some(a=>a.k==='exinv'))L.splice(Math.min(1,L.length),0,{k:'exinv',ac:'#ffd84a',tag:'INVOCATIONS',t:'Les héros du Roi de Cendre arrivent ✨',
  x:"L'événement « L'Éveil du Roi de Cendre » est terminé, mais ses héros restent : <b>Aegis le Paladin Juré</b>, <b>Lyra la Voix du Royaume</b> et <b>Sorën l'Œil de la Tour</b> rejoignent les légendaires de l'<b>Invocation standard</b> et peuvent devenir héros de la semaine. <b>Éryndel le Roi de Cendre</b>, lui, rejoint les <b>mythiques</b>. Leurs trois chroniques quittent le mode histoire.",
  art:()=>{try{return`<div class="skann">${heroBody(HEROES[typeof AEG!=='undefined'?AEG:69],0)}</div>`}catch(e){return''}},go:'✨ Voir les invocations',fn:()=>{TAB='invoc';UI.ban='std';UI.iv='invoc'}})}catch(e){}return L}}catch(e){}
/* notes de version */
try{const it=["✨ <b>Les héros exclusifs du Roi de Cendre deviennent invocables</b> : Aegis, Lyra et Sorën rejoignent les légendaires de l'Invocation standard (et la rotation du héros de la semaine), et <b>Éryndel le Roi de Cendre</b> rejoint les mythiques, aux côtés d'Aléa.",
 "📖 Les trois chroniques de l'événement quittent l'onglet Aventure : l'événement est terminé, leurs héros s'obtiennent maintenant par invocation."];
 PATCH.unshift({v:49,d:'10 novembre 2026',t:'Les héros du Roi de Cendre en invocation',items:it});
 const E=["✨ <b>The Ash King's exclusive heroes become summonable</b>: Aegis, Lyra and Sorën join the legendaries of the Standard Summon (and the hero-of-the-week rotation), and <b>Éryndel the Ash King</b> joins the mythics, alongside Aléa.",
 "📖 The event's three chronicles leave the Adventure tab: the event is over, and their heroes are now obtained through summoning."];
 it.forEach((x,i)=>{I18N_EN[x]=E[i]});
 Object.assign(I18N_EN,{'Les héros du Roi de Cendre en invocation':"The Ash King's heroes in summons",'Les héros du Roi de Cendre arrivent ✨':"The Ash King's heroes are here ✨",'INVOCATIONS':'SUMMONS','✨ Voir les invocations':'✨ See the summons'})}catch(e){}
window.RDE_EXFREE=IDS;
}catch(e){console.warn('héros exclusifs',e)}})();
