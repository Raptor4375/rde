
/* ================= toujours en dernier : l'écran de chargement reprend les dessins à jour ================= */
(function(){try{const imgs=document.querySelectorAll('#boot img[data-h]');imgs.forEach(im=>{const [id,u]=im.dataset.h.split('_').map(Number);const s=btImg(id,u);if(s)im.src=s})}catch(e){}})();
