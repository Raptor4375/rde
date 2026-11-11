/* ================= V420 : les héros dessinés à la main gardent leur dessin partout =================
   portrait() est le générateur procédural ; les bannières et quelques listes l'appellent en direct,
   et nos héros ressortaient avec le visage automatique au lieu du vrai. */
(function(){try{
const MAP={};
const add=(i,fn)=>{if(typeof i==='number'&&typeof fn==='function')MAP[i]=fn};
try{add(typeof MARN!=='undefined'?MARN:-1,window.marnPortrait)}catch(e){}
try{add(typeof CRV!=='undefined'?CRV:-1,window.crvPortrait)}catch(e){}
try{add(typeof GAR!=='undefined'?GAR:-1,window.garPortrait)}catch(e){}
try{add(typeof ORG!=='undefined'?ORG:-1,window.orgPortrait)}catch(e){}
try{add(typeof PRN!=='undefined'?PRN:-1,window.prnPortrait)}catch(e){}
if(!Object.keys(MAP).length)return;
{const p0=portrait;portrait=function(h){try{if(h&&MAP[h.i])return MAP[h.i](0)}catch(e){}return p0.apply(this,arguments)}}
}catch(e){console.warn('portraits maison',e)}})();
