
/* ================= fluidité : décors en image + moins de rafraîchissements pendant qu'on fait défiler ================= */
/* Les décors des lieux (Grand-Place, caserne, village…) sont de gros dessins animés (plus de 800 éléments).
   Affichés tels quels, le téléphone les redessine pendant le défilement : ça saccade. On les transforme en image
   (les petites animations continuent de tourner à l'intérieur) et on garde l'image en mémoire. */
const LBIMG=new Map();
{const ls=lbScene;lbScene=function(tab,places){const v=ls.apply(this,arguments);try{if(typeof v!=='string'||v.indexOf('<svg')!==0)return v;let u=LBIMG.get(v);
   if(!u){u=URL.createObjectURL(new Blob([v],{type:'image/svg+xml'}));LBIMG.set(v,u);if(LBIMG.size>24){const k=LBIMG.keys().next().value;const old=LBIMG.get(k);LBIMG.delete(k);setTimeout(()=>{try{URL.revokeObjectURL(old)}catch(e){}},5000)}}
   const st=LBST.get(u);if(!st&&!LBST.has(u))lbStatic(u);
   return(st?`<img class="lbimg lbst" src="${st}" alt="" aria-hidden="true" draggable="false">`:'')+`<img class="lbimg lbanim" src="${u}" alt="" aria-hidden="true" decoding="async" draggable="false">`}catch(e){return v}}}
/* version figée (photo) du décor, affichée pendant le défilement à la place de la version animée */
const LBST=new Map();
function lbStatic(u){LBST.set(u,null);const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=800;c.height=480;const x=c.getContext('2d');x.drawImage(im,0,0,800,480);
  c.toBlob(b=>{if(!b)return;const p=URL.createObjectURL(b);LBST.set(u,p);document.querySelectorAll('.lobby>img.lbanim').forEach(a=>{if(a.getAttribute('src')===u&&!(a.previousElementSibling&&a.previousElementSibling.classList.contains('lbst')))a.insertAdjacentHTML('beforebegin',`<img class="lbimg lbst" src="${p}" alt="" aria-hidden="true" draggable="false">`)})},'image/webp',.9)}catch(e){}};im.src=u}
{let tm=0;const on=()=>{document.documentElement.classList.add('scrl');clearTimeout(tm);tm=setTimeout(()=>document.documentElement.classList.remove('scrl'),450)};window.addEventListener('scroll',on,{passive:true,capture:true})}
/* Pendant qu'on fait défiler, on ne reconstruit plus la page à chaque mise à jour d'un joueur en ligne :
   on attend que le doigt se pose, et pas plus d'une fois toutes les 8 secondes, en gardant la position. */
const SCR={t:0,last:0,pend:0};
['scroll','touchmove','wheel','touchstart'].forEach(ev=>window.addEventListener(ev,()=>{SCR.t=Date.now()},{passive:true,capture:true}));
function scrollBusy(){return Date.now()-SCR.t<2500}
{
 onNet=(function(on0){return function(){if(!(TAB==='top'||TAB==='guilde'))return on0.apply(this,arguments);
   clearTimeout(SCR.pend);const go=()=>{if(scrollBusy()||Date.now()-SCR.last<8000){SCR.pend=setTimeout(go,1500);return}SCR.last=Date.now();
     try{if(B||$('#ovl').innerHTML){renderTop();renderTabs();return}if(chatBusy&&chatBusy()){renderTop();renderTabs();return}const y=window.scrollY;render();if(Math.abs(window.scrollY-y)>2)window.scrollTo(0,y)}catch(e){}};
   try{mkSubscribe()}catch(e){}try{botLetterTick()}catch(e){}try{renderTop();renderTabs()}catch(e){}SCR.pend=setTimeout(go,400)}})(onNet)}
