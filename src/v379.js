
/* ================= Calendrier des événements ================= */
/* 1) Halloween est terminé : plus d'onglet, plus de manoir hanté, plus de classement Halloween.
   2) Le casino de Fortuna revient une semaine par mois : du 13 au 20 (minuit) de chaque mois.
      Entre deux éditions, il disparaît complètement. Les jetons restent dans ta poche d'une édition à l'autre ;
      les limites de la boutique repartent à zéro à chaque nouvelle édition (les objets uniques déjà obtenus restent obtenus). */
(function(){try{
/* ---------- Halloween ---------- */
try{hwEnded=()=>false}catch(e){}
{const et=evTabs;evTabs=function(){return et.apply(this,arguments).filter(x=>x&&x[0]!=='hw')}}
/* ---------- Octobre Rose est terminé ---------- */
try{roseEnded=()=>false}catch(e){}
{const et=evTabs;evTabs=function(){return et.apply(this,arguments).filter(x=>x&&x[0]!=='rose')}}
try{if(UI.evt==='rose')UI.evt='pass';if(UI.lz&&UI.lz.event==='rose')UI.lz.event=null}catch(e){}
try{if(UI.evt==='hw')UI.evt='pass';if(UI.lz&&UI.lz.event==='hw')UI.lz.event=null}catch(e){}

/* ---------- Casino : une semaine par mois ---------- */
const CAS_DAY=13,CAS_LEN=7;
function casWin(t=Date.now()){const d=new Date(t);let a=new Date(d.getFullYear(),d.getMonth(),CAS_DAY).getTime(),b=new Date(d.getFullYear(),d.getMonth(),CAS_DAY+CAS_LEN).getTime();
  if(t>=b){a=new Date(d.getFullYear(),d.getMonth()+1,CAS_DAY).getTime();b=new Date(d.getFullYear(),d.getMonth()+1,CAS_DAY+CAS_LEN).getTime()}return[a,b]}
window.casWin=casWin;
function casSync(){try{const[a,b]=casWin();CAS_START=a;CAS_END=b}catch(e){}}
casSync();
{const co=casOn;casOn=function(){casSync();return co.apply(this,arguments)}}
casEnded=function(){casSync();return false};
/* nouvelle édition : les limites de la boutique et les records de l'édition repartent à zéro */
{const C0=CAS;CAS=function(){const C=C0.apply(this,arguments);try{if(casOn()){const ed=new Date(CAS_START).toISOString().slice(0,7);if(C.ed!==ed){if(C.ed!=null||Object.keys(C.shop||{}).length){C.shop={}}C.ed=ed}}}catch(e){}return C}}
try{if(UI.evt==='cas'&&!casOn())UI.evt='pass';if(UI.lz&&UI.lz.event==='cas'&&!casOn())UI.lz.event=null}catch(e){}
try{const P=PATCH.find(x=>x.v===40);if(P)P.items.push("🎰 <b>Le casino de Fortuna</b> revient maintenant <b>une semaine par mois</b> (du 13 au 20). Tes jetons t'attendent d'une édition à l'autre, et la boutique se remplit à nouveau à chaque édition.","🎃 Halloween est terminé : merci à tous pour la Nuit des Citrouilles !")}catch(e){}
}catch(e){console.warn('calendrier',e)}})();
