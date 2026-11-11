/* ================= V420 : les héros dessinés à la main gardent leur dessin partout =================
   portrait() est le générateur procédural ; les bannières et quelques listes l'appellent en direct.
   On va chercher le dessin au moment de l'appel (pas au chargement), pour suivre les retouches. */
(function(){try{
const MAP={};
try{if(typeof MARN!=='undefined')MAP[MARN]='marnPortrait'}catch(e){}
try{if(typeof CRV!=='undefined')MAP[CRV]='crvPortrait'}catch(e){}
try{if(typeof GAR!=='undefined')MAP[GAR]='garPortrait'}catch(e){}
try{if(typeof ORG!=='undefined')MAP[ORG]='orgPortrait'}catch(e){}
try{if(typeof PRN!=='undefined')MAP[PRN]='prnPortrait'}catch(e){}
{const p0=portrait;portrait=function(h){try{if(h&&MAP[h.i]&&typeof window[MAP[h.i]]==='function'){const o=S&&S.heroes&&S.heroes[h.i],u=o&&o.u>0&&h.r>=4?Math.min(3,o.u):0;return window[MAP[h.i]](u)}}catch(e){}return p0.apply(this,arguments)}}
}catch(e){console.warn('portraits maison',e)}})();
