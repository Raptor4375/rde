/* ================= V428 : LE MODE HISTOIRE DANS TOUS LES MODES DE L'AVENTURE =================
   En Normal et en Difficile, l'Aventure était dessinée sans la carte du mode histoire
   (ni les Chroniques des Héros). On la remet en haut, comme en Facile. */
(function(){try{
const pa=pAdv;pAdv=function(){const h=pa.apply(this,arguments);
  try{if(typeof h!=='string'||h.indexOf('hccard')>=0||h.indexOf('sgcard')>=0)return h;
    const sc=sagaCard();if(!sc)return h;const i=h.indexOf('<div class="card');
    return i>=0?h.slice(0,i)+sc+h.slice(i):sc+h}catch(e){console.warn('histoire avent.',e)}
  return h};
}catch(e){console.warn('v428',e)}})();
