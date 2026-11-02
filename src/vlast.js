/* ================= toujours en dernier : l'écran de chargement reprend les dessins à jour ================= */
(function(){try{
  /* Livre III : le Roi de Cendre (nouveau design) au premier rang, et le souvenir du jeune Éryndel au-dessus de la couronne */
  const b3=document.querySelector('#boot .bs3');
  if(b3){if(typeof ERY!=='undefined'&&HEROES[ERY]){const q=b3.querySelector('.b3h.q2 img');if(q)q.dataset.h=ERY+'_0'}
    /* pendant l'événement : Aegis, le Commandant de la Garde d'Éther, rejoint la troupe */
    if(typeof AEG!=='undefined'&&HEROES[AEG]){const q=b3.querySelector('.b3h.q3 img');if(q)q.dataset.h=AEG+'_0'}
    const m=b3.querySelector('.bsmem');if(m&&typeof eryBody==='function'){const s=eryBody('eryndel');if(s)m.innerHTML=s.replace('<svg','<svg class="loresvg hb"')}}
  /* tous les héros présents : dessins à jour (visages détaillés, formes ultra, Éryndel…) */
  document.querySelectorAll('#boot img[data-h]').forEach(im=>{const [id,u]=im.dataset.h.split('_').map(Number);const s=btImg(id,u);if(s)im.src=s});
}catch(e){}})();
