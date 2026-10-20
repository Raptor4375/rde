/* ================= chargement : Aléa avec son nouveau chara design ================= */
/* l'écran de chargement était dessiné avant le nouveau look d'Aléa : on le redessine une fois tout chargé */
(function(){try{if(typeof BT_BOOK==='undefined'||BOOT.done)return;const b=document.getElementById('boot');const r=b&&b.querySelector('.b2.bs');if(!r)return;
  const st=r.querySelector('#b2start'),bts=r.querySelector('#bts'),bar=r.querySelector('.bt-bar i');const txt=bts?bts.textContent:'',w=bar?bar.style.width:'';
  const tmp=document.createElement('div');tmp.innerHTML=btSceneSaga(BT_BOOK);const n=tmp.firstElementChild;if(!n)return;
  if(st)n.appendChild(st);const nb=n.querySelector('#bts');if(nb&&txt)nb.textContent=txt;const nbar=n.querySelector('.bt-bar i');if(nbar&&w)nbar.style.width=w;r.replaceWith(n)}catch(e){console.warn('boot',e)}})();
