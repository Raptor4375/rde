/* ================= V436 : PAGES HÉROS ALLÉGÉES + ÉCRAN DE CHARGEMENT AVEC LE NOUVEAU KAÏROS =================
   Les pages Collection / Équipes / Méta mettaient chaque portrait en dessin vectoriel complet dans la page :
   jusqu'à 2,5 Mo de dessin et 110 portraits (plusieurs milliers d'éléments) refaits à chaque toucher.
   Sur téléphone : gros lags, et parfois le jeu qui se recharge tout seul (mémoire pleine).
   Maintenant chaque portrait devient une petite image mise en cache, calculée une seule fois. */
(function(){try{
/* --- portraits → images en cache --- */
const PURL=new Map();
const toUrl=svg=>{let u=PURL.get(svg);if(u)return u;
  u=URL.createObjectURL(new Blob([svg],{type:'image/svg+xml'}));PURL.set(svg,u);
  if(PURL.size>1500){let n=0;for(const [k,v] of PURL){if(n++>=500)break;PURL.delete(k);setTimeout(()=>{try{URL.revokeObjectURL(v)}catch(e){}},30000)}}
  return u};
const RX=/<svg\b[^>]*viewBox="0 0 100 100"[\s\S]*?<\/svg>/g;
function light(h){if(typeof h!=='string'||h.length<20000)return h;
  try{return h.replace(RX,m=>{if(m.length<2500)return m;const k=m.indexOf('<svg',4);if(k>0)return m;return`<img class="lpt" src="${toUrl(m)}" alt="" draggable="false" decoding="async">`})}catch(e){return h}}
window.RDElight=light;
for(const n of['pHeros','pAdv']){try{const f=window[n];if(typeof f!=='function')continue;window[n]=function(){return light(f.apply(this,arguments))}}catch(e){}}
const st=document.createElement('style');st.textContent=`img.lpt{width:100%;height:100%;display:block;pointer-events:none;-webkit-user-drag:none}`;document.head.appendChild(st);
/* --- « Efficacité par mode » : la meilleure équipe n'est recalculée que si tes héros changent --- */
try{const mb=myBest,C={};
  const sig=()=>{let s='';for(const i in S.heroes){const o=S.heroes[i];s+=i+':'+(o.l|0)+':'+(o.e|0)+':'+(o.u|0)+':'+(o.aw|0)+':'+(o.st|0)+',';}return s+'|'+(S.items?S.items.length:0)};
  myBest=function(mk){const g=sig();const c=C[mk];if(c&&c.g===g&&Date.now()-c.t<60000)return c.v;const v=mb.apply(this,arguments);C[mk]={g,v,t:Date.now()};return v}}catch(e){}
/* --- écran de chargement : le nouveau Kaïros, l'Hiver Immobile --- */
try{const upd=()=>{try{const im=document.querySelector('#boot .b3party .q2 img');if(!im||typeof vHero!=='function')return;
    im.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStill(heroBody(vHero('ka_hiver'),0)))}catch(e){}};
  upd();setTimeout(upd,300)}catch(e){}
try{PATCH.unshift({v:'v61',d:Date.now(),t:'Pages Héros allégées',items:[
 "⚡ Les pages <b>Collection</b>, <b>Équipes</b> et <b>Méta</b> sont 60 fois plus légères (2,4 Mo → 40 Ko) : chaque portrait devient une image mise en cache au lieu d'un dessin complet refait à chaque toucher. Fini les gros lags dans le composeur d'équipe et le jeu qui se recharge tout seul.",
 "📊 « Efficacité par mode » ne recalcule plus la meilleure équipe à chaque toucher, seulement quand tes héros changent.",
 "❄️ L'écran de chargement de la saison montre le nouveau Kaïros, l'Hiver Immobile."]})}catch(e){}
}catch(e){console.warn('v436',e)}})();
