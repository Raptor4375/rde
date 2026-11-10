
/* ================= V405 : plus d'écran noir sur les décors des lieux =================
   Les décors (Grand-Place, caserne, village…) sont transformés en image (v314). Quand le décor change
   (nouvel onglet, heure du jour, météo, neige de saison), la nouvelle image met un instant à se décoder
   sur téléphone : on voyait le fond noir clignoter. Désormais :
   · on garde la dernière photo du même lieu affichée en dessous tant que la nouvelle n'est pas prête ;
   · on prépare en avance, tranquillement, les décors de tous les lieux (après le chargement, puis toutes les 3 minutes). */
(function(){try{
if(typeof lbScene!=='function'||typeof LBST==='undefined'||typeof LOBS==='undefined')return;
const LAST={},U2T=new Map();
{const ls=lbScene;lbScene=function(tab){const h=ls.apply(this,arguments);try{if(typeof h!=='string')return h;
  const a=h.match(/class="lbimg lbanim" src="([^"]+)"/);if(a)U2T.set(a[1],tab);
  const m=h.match(/class="lbimg lbst" src="([^"]+)"/);if(m){LAST[tab]=m[1];return h}
  if(LAST[tab])return`<img class="lbimg lbst" src="${LAST[tab]}" alt="" aria-hidden="true" draggable="false">`+h}catch(e){}return h}}
/* quand la vraie photo du nouveau décor est prête, elle remplace la photo provisoire */
{const os=LBST.set.bind(LBST);LBST.set=function(u,p){const r=os(u,p);if(p)try{const t=U2T.get(u);if(t)LAST[t]=p;
  document.querySelectorAll('.lobby>img.lbanim').forEach(a=>{if(a.getAttribute('src')!==u)return;const pv=a.previousElementSibling;if(pv&&pv.classList.contains('lbst'))pv.src=p})}catch(e){}return r}}
/* préparation en avance */
let busy=false;
function warm(){if(busy||document.hidden)return;try{if((typeof B!=='undefined'&&B)||(typeof scrollBusy==='function'&&scrollBusy())||(typeof SGP!=='undefined'&&SGP.on))return}catch(e){}
  busy=true;const tabs=Object.keys(LOBS);let i=0;
  const step=()=>{if(i>=tabs.length||document.hidden){busy=false;return}const t=tabs[i++];
    try{if(!(typeof B!=='undefined'&&B)){const h=lobbyBlock(t);const m=h.match(/class="lbimg lbanim" src="([^"]+)"/);if(m){const im=new Image();im.src=m[1];if(im.decode)im.decode().catch(()=>{})}}}catch(e){}
    setTimeout(step,900)};
  step()}
const iv=setInterval(()=>{try{if(BOOT.done){clearInterval(iv);setTimeout(warm,3000)}}catch(e){clearInterval(iv)}},1000);
setInterval(warm,180000);
document.addEventListener('visibilitychange',()=>{if(!document.hidden)setTimeout(warm,1500)});
}catch(e){console.warn('décors sans écran noir',e)}})();
