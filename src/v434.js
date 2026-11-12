/* ================= V434 : FLUIDITÉ — L'ÉCRAN N'EST PLUS REDESSINÉ EN ENTIER À CHAQUE TOUCHER =================
   Avant, chaque action (et plein de petits minuteurs) remplaçait TOUT le contenu de l'écran : tous les portraits
   (SVG et images) étaient re-créés, re-décodés, et toutes leurs animations relancées. Sur téléphone, ça lague.
   Maintenant on compare l'ancien et le nouvel écran et on ne touche qu'à ce qui a changé. */
(function(){try{
const PD=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');
if(!PD||!PD.set||!document.createElement('template').content)return;
const SVGNS='http://www.w3.org/2000/svg';
const sameNode=(a,b)=>a.nodeType===b.nodeType&&a.nodeName===b.nodeName&&(a.nodeType!==1||((a.id||'')===(b.id||'')&&a.nodeName!=='CANVAS'&&a.nodeName!=='canvas'&&a.nodeName!=='IFRAME'&&a.nodeName!=='VIDEO'));
const ser=n=>{try{return n.outerHTML}catch(e){return null}};
function syncAttrs(a,b){
  const ba=b.attributes,aa=a.attributes;
  for(let i=aa.length-1;i>=0;i--){const at=aa[i];if(!b.hasAttributeNS(at.namespaceURI,at.localName))a.removeAttributeNS(at.namespaceURI,at.localName)}
  for(let i=0;i<ba.length;i++){const at=ba[i];if(a.getAttributeNS(at.namespaceURI,at.localName)!==at.value)a.setAttributeNS(at.namespaceURI,at.name,at.value)}}
function patch(a,b){
  if(a.nodeType===3||a.nodeType===8){if(a.nodeValue!==b.nodeValue)a.nodeValue=b.nodeValue;return a}
  /* un SVG est gardé tel quel s'il n'a pas changé (ses animations continuent), sinon remplacé d'un bloc */
  if(a.namespaceURI===SVGNS&&a.nodeName.toLowerCase()==='svg'){if(!a.isEqualNode(b)){a.replaceWith(b);return b}return a}
  const tag=a.nodeName;
  /* champs de saisie : comme un écran tout neuf, sauf celui qu'on est en train d'utiliser */
  if(tag==='INPUT'||tag==='TEXTAREA'||tag==='SELECT'){const foc=document.activeElement===a,v=a.value;
    let want=null;if(tag==='SELECT'){const op=[...b.querySelectorAll('option')];const so=op.find(o=>o.hasAttribute('selected'))||op[0];want=so?(so.hasAttribute('value')?so.getAttribute('value'):so.textContent):null}
    else if(tag==='TEXTAREA')want=b.textContent;else want=b.hasAttribute('value')?b.getAttribute('value'):'';
    syncAttrs(a,b);morphKids(a,b);
    try{if(foc)a.value=v;else if(want!=null&&a.value!==want)a.value=want}catch(e){}
    if(tag==='INPUT'&&(a.type==='checkbox'||a.type==='radio'))a.checked=b.hasAttribute('checked');return a}
  syncAttrs(a,b);morphKids(a,b);return a}
function morphKids(from,to){
  let a=from.firstChild,b=to.firstChild;
  while(b){const nb=b.nextSibling;
    if(!a){from.appendChild(b);b=nb;continue}
    const na=a.nextSibling;
    if(sameNode(a,b))patch(a,b);else from.replaceChild(b,a);
    a=na;b=nb}
  while(a){const na=a.nextSibling;from.removeChild(a);a=na}}
const LAST=new WeakMap();let OFF=false;
function morph(el,html){html=html==null?'':String(html);
  let pend=0;try{pend=el.__obs?el.__obs.takeRecords().length:0}catch(e){}if(pend)LAST.delete(el);
  if(OFF||!el.isConnected||!el.firstChild||html===''){PD.set.call(el,html)}
  else if(LAST.get(el)===html&&el.childNodes.length){return}     /* rien n'a changé et personne n'y a touché : rien à faire */
  else{const t=document.createElement('template');PD.set.call(t,html);
    try{morphKids(el,t.content)}catch(e){console.warn('morph',e);PD.set.call(el,html)}}
  LAST.set(el,html);try{el.__obs&&el.__obs.takeRecords()}catch(e){}}
window.RDEmorph={off:v=>{OFF=!!v},morph};
const hook=el=>{if(!el||el.__mo)return;el.__mo=1;
  Object.defineProperty(el,'innerHTML',{configurable:true,get(){return PD.get.call(this)},set(v){morph(this,v)}});
  /* si un autre code retouche l'écran après nous, le raccourci « rien n'a changé » ne vaut plus */
  try{el.__obs=new MutationObserver(()=>LAST.delete(el));el.__obs.observe(el,{childList:true,subtree:true,characterData:true,attributes:true})}catch(e){}};
/* --- les photos des décors (version figée pendant le défilement) : plus petites, et faites quand le téléphone ne fait rien --- */
try{if(typeof lbStatic==='function'&&typeof LBST!=='undefined'){
  const ric=window.requestIdleCallback?f=>requestIdleCallback(f,{timeout:4000}):f=>setTimeout(f,600);
  const calm=f=>{const go=()=>{try{if(typeof scrollBusy==='function'&&scrollBusy())return setTimeout(()=>ric(go),1500)}catch(e){}f()};ric(go)};
  lbStatic=function(u){LBST.set(u,null);calm(()=>{const im=new Image();im.onload=()=>calm(()=>{try{const c=document.createElement('canvas');c.width=900;c.height=540;c.getContext('2d').drawImage(im,0,0,900,540);
    c.toBlob(b=>{if(!b)return;const p=URL.createObjectURL(b);LBST.set(u,p);document.querySelectorAll('.lobby>img.lbanim').forEach(a=>{if(a.getAttribute('src')===u&&!(a.previousElementSibling&&a.previousElementSibling.classList.contains('lbst')))a.insertAdjacentHTML('beforebegin',`<img class="lbimg lbst" src="${p}" alt="" aria-hidden="true" draggable="false">`)})},'image/webp',.85)}catch(e){}});im.src=u})}}}catch(e){}
/* --- pendant qu'on fait défiler, les animations décoratives se mettent en pause ; les cadres des petits avatars dans les listes ne tournent plus --- */
{const st=document.createElement('style');st.textContent=`html.scrl #app *,html.scrl #app *::before,html.scrl #app *::after{animation-play-state:paused!important}
.rk .fav::before,.rk .fav::after,.list .fav::before,.list .fav::after,.rk .av::before,.rk .av::after{animation:none!important}`;document.head.appendChild(st)}
const ids=['main','av'];
const install=()=>{for(const id of ids)hook(document.getElementById(id))};
install();document.addEventListener('DOMContentLoaded',install);setTimeout(install,1500);
try{PATCH.unshift({v:'v59',d:Date.now(),t:'Fluidité',items:[
 "⚡ L'écran n'est plus entièrement redessiné à chaque toucher : seules les parties qui changent sont mises à jour. Les menus réagissent 2 à 3 fois plus vite (Héros, Équipement, Event, Combats, Social…).",
 "🖼️ Les portraits et les décors ne sont plus re-décodés à chaque action, et leurs animations ne redémarrent plus.",
 "🏞️ Les photos des décors (utilisées pendant le défilement) sont préparées quand le téléphone ne fait rien, en plus léger.",
 "📜 Défilement plus fluide : les animations décoratives se mettent en pause pendant qu'on fait défiler, les cadres des petits avatars dans les listes ne tournent plus, et la préparation des décors en arrière-plan attend que tu aies fini de toucher l'écran."]})}catch(e){}
}catch(e){console.warn('v434',e)}})();
