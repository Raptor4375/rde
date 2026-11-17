/* ================= V441 : FLUIDITÉ (d'après les vidéos du 16 novembre) =================
   Mesures faites sur le jeu (processeur ralenti ×4 pour imiter un téléphone) :
   · les portraits dans les listes étaient des dessins animés dans des images : tant qu'ils n'étaient pas
     « photographiés », le téléphone redessinait chaque portrait à chaque image (Classement, Arène…) ;
   · ces photos (portraits, avatars, décors, cut-in ultra) étaient refaites à CHAQUE lancement du jeu,
     souvent en plein combat ou pendant qu'on fait défiler ;
   · au début d'un combat, les portraits des cartes étaient convertis en PNG (encodage lent) ;
   · les grands voiles des ultimes (Kaïros, l'Hiver Immobile…) repeignaient tout le canvas à chaque image,
     et le canvas des effets couvrait aussi tout le journal du combat ;
   · le petit hibou des en-têtes battait des ailes en redessinant son dessin à chaque image, partout ;
   · faire défiler la page recalculait le style de TOUT l'écran au début et à la fin de chaque geste.
   Corrections ci-dessous. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const inBattle=()=>{try{return typeof B!=='undefined'&&!!B&&!B.done}catch(e){return false}};
const ric=window.requestIdleCallback?f=>requestIdleCallback(f,{timeout:4000}):f=>setTimeout(f,500);
const calm=f=>{const go=()=>{try{if((typeof scrollBusy==='function'&&scrollBusy())||inBattle())return setTimeout(()=>ric(go),1500)}catch(e){}f()};ric(go)};

/* ---------- 1. cache d'images permanent : chaque photo n'est faite qu'une seule fois, pour toujours ---------- */
const IMG=window.RDEIMG=(function(){
  const M=new Map();let db=null,n=0;
  const hash=str=>{let h1=0xdeadbeef,h2=0x41c6ce57;for(let i=0,ch;i<str.length;i++){ch=str.charCodeAt(i);h1=Math.imul(h1^ch,2654435761);h2=Math.imul(h2^ch,1597334677)}
    h1=Math.imul(h1^(h1>>>16),2246822507)^Math.imul(h2^(h2>>>13),3266489909);h2=Math.imul(h2^(h2>>>16),2246822507)^Math.imul(h1^(h1>>>13),3266489909);
    return(4294967296*(2097151&h2)+(h1>>>0)).toString(36)+'.'+str.length.toString(36)};
  const ready=new Promise(res=>{try{if(!window.indexedDB)return res();const rq=indexedDB.open('rde-img',1);
    rq.onupgradeneeded=()=>{try{rq.result.createObjectStore('i')}catch(e){}};
    rq.onsuccess=()=>{db=rq.result;try{const st=db.transaction('i','readonly').objectStore('i');const cur=st.openCursor();
      cur.onsuccess=()=>{const c=cur.result;if(c){try{if(c.value instanceof Blob&&!M.has(c.key)){M.set(c.key,URL.createObjectURL(c.value));n++}}catch(e){}c.continue()}else{
        /* trop d'anciennes photos (dessins qui ont changé depuis) : on repart de zéro */
        if(n>1600){try{db.transaction('i','readwrite').objectStore('i').clear();n=0}catch(e){}}res()}};
      cur.onerror=()=>res()}catch(e){res()}};
    rq.onerror=()=>res();rq.onblocked=()=>res()}catch(e){res()}});
  return{hash,ready,get:k=>M.get(k),has:k=>M.has(k),
    put(k,blob){if(!blob)return null;let u=M.get(k);if(u)return u;u=URL.createObjectURL(blob);M.set(k,u);
      try{if(db&&n<1800){db.transaction('i','readwrite').objectStore('i').put(blob,k);n++}}catch(e){}return u},
    size:()=>M.size}})();

/* ---------- 2. dessins figés pour les images (plus d'animation interne qui force à redessiner) ---------- */
const STILL='<style>*{animation:none!important;transition:none!important}</style>';
const still=window.RDEnoanim=s=>{try{s=String(s);if(typeof svgStill==='function')s=svgStill(s);return s.replace(/<svg\b[^>]*>/,m=>m+STILL)}catch(e){return s}};

/* ---------- 3. avatars et portraits des cartes de combat (v357) : photo WebP mise en cache pour toujours ---------- */
try{if(typeof avRaster==='function'&&typeof AVR!=='undefined'){
  avRaster=function(h){const k=avKey(h);if(AVR.c.has(k)||AVR.busy.has(k))return;
    const ik='a'+IMG.hash(h),hit=IMG.get(ik);
    if(hit){AVR.c.set(k,hit);requestAnimationFrame(()=>{try{avSwap(document)}catch(e){}});return}
    const p=new Promise(res=>{const im=new Image();
      im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=256;c.getContext('2d').drawImage(im,0,0,256,256);
        c.toBlob(b=>{AVR.c.set(k,b?IMG.put(ik,b):null);res()},'image/png')}catch(e){AVR.c.set(k,null);res()}};
      im.onerror=()=>{AVR.c.set(k,null);res()};
      let s=h;if(!/xmlns=/.test(s))s=s.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');s=s.replace(/<svg([^>]*?)>/,(m,a)=>/\bwidth=/.test(a)?m:'<svg'+a+' width="256" height="256">');
      im.src=URL.createObjectURL(new Blob([still(s)],{type:'image/svg+xml'}))});
    AVR.busy.set(k,p);p.then(()=>{AVR.busy.delete(k);try{avSwap(document)}catch(e){}})}}}catch(e){console.warn('v441 av',e)}

/* ---------- 4. photos des décors (v434) : cache permanent, jamais pendant un combat ---------- */
try{if(typeof lbStatic==='function'&&typeof LBST!=='undefined'){
  const apply=(u,p)=>{LBST.set(u,p);document.querySelectorAll('.lobby>img.lbanim').forEach(a=>{if(a.getAttribute('src')===u&&!(a.previousElementSibling&&a.previousElementSibling.classList.contains('lbst')))a.insertAdjacentHTML('beforebegin',`<img class="lbimg lbst" src="${p}" alt="" aria-hidden="true" draggable="false">`)})};
  lbStatic=function(u){LBST.set(u,null);
    fetch(u).then(r=>r.text()).then(txt=>{const k='l'+IMG.hash(txt),hit=IMG.get(k);if(hit){apply(u,hit);return}
      calm(()=>{const im=new Image();im.onload=()=>calm(()=>{try{const c=document.createElement('canvas');c.width=900;c.height=540;c.getContext('2d').drawImage(im,0,0,900,540);
        c.toBlob(b=>{if(b)apply(u,IMG.put(k,b))},'image/webp',.85)}catch(e){}});im.src=u})}).catch(()=>{})}}}catch(e){console.warn('v441 lb',e)}

/* ---------- 5. image du cut-in ultra : cache permanent (avant : refaite en PNG au début de chaque combat) ---------- */
try{if(typeof uxPrep==='function'&&typeof UXB!=='undefined'){
  uxPrep=function(hid){if(UXB[hid]||UXB['p'+hid])return;UXB['p'+hid]=1;
    try{const h=HEROES[hid],raw=portraitU(h,Math.min(3,(S.heroes[hid]||{}).u||1)),k='u'+IMG.hash(raw),hit=IMG.get(k);if(hit){UXB[hid]=hit;return}
      const im=new Image();im.decoding='async';
      im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=480;c.getContext('2d').drawImage(im,0,0,480,480);c.toBlob(b=>{if(b)UXB[hid]=IMG.put(k,b)},'image/png')}catch(e){}};
      im.src=URL.createObjectURL(new Blob([still(raw)],{type:'image/svg+xml'}))}catch(e){}}}}catch(e){console.warn('v441 ux',e)}

/* ---------- 6. combat : canvas des effets limité à la zone des cartes, voiles en calques HTML, positions mémorisées ---------- */
try{
  const SB={t:0,v:0,h:null};
  fxSetup=function(){const host=document.querySelector('#battle .bw');if(!host)return;host.style.position='relative';
    let cv=host.querySelector('#fxc');if(!cv){cv=document.createElement('canvas');cv.id='fxc';host.appendChild(cv)}
    const r=host.getBoundingClientRect(),dpr=(window.RDEFXL&&RDEFXL.on)?Math.min(RDEFXL.dpr,window.devicePixelRatio||1):Math.min(1.5,window.devicePixelRatio||1),W=Math.round(r.width);
    /* le journal du combat grandit à chaque action : avant, le canvas était refait à chaque nouvelle ligne */
    let H=Math.round(r.height);try{const now=performance.now();if(!SB.t||now-SB.t>1000||SB.h!==host){let bot=0;host.querySelectorAll('.side').forEach(s=>{const q=s.getBoundingClientRect();bot=Math.max(bot,q.bottom-r.top)});SB.v=bot;SB.t=now;SB.h=host}if(SB.v>200)H=Math.min(H,Math.round(SB.v+70))}catch(e){}
    if(FXS.cv!==cv||!FXS.ctx||FXS.dpr!==dpr||Math.abs((FXS.w||0)-W)>1||Math.abs((FXS.h||0)-H)>1){FXS.dpr=dpr;cv.width=Math.round(W*dpr);cv.height=Math.round(H*dpr);cv.style.width=W+'px';cv.style.height=H+'px';cv.style.bottom='auto';
      FXS.ctx=cv.getContext('2d');FXS.ctx.setTransform(dpr,0,0,dpr,0,0);host.style.setProperty('--fxh',H+'px')}
    FXS.cv=cv;FXS.box=r;FXS.w=W;FXS.h=H};
  const U=new WeakMap();
  uc=function(u){const el=document.getElementById('u-'+u.key);if(!el||!FXS.box)return{x:FXS.w/2,y:FXS.h/2,s:60};
    const now=performance.now(),c=U.get(el);if(c&&now-c.t<20&&c.b===FXS.box)return{x:c.x,y:c.y,s:c.s};
    const r=el.getBoundingClientRect(),v={x:r.left-FXS.box.left+r.width/2,y:r.top-FXS.box.top+r.width*.48,s:r.width};U.set(el,{t:now,b:FXS.box,...v});return v};
  /* un voile plein écran = un calque HTML que la carte graphique fond toute seule */
  const veilEl=(col)=>{const host=document.querySelector('#battle .bw');if(!host)return null;const d=document.createElement('div');d.className='fxveil';d.style.background=col;host.appendChild(d);
    const born=Date.now(),chk=setInterval(()=>{if(!document.contains(d)||!inBattle()||(B&&B.skip)||Date.now()-born>9000){clearInterval(chk);d.remove()}},400);return d};
  window.RDEveil=function(col,max){if(typeof B!=='undefined'&&B&&B.skip)return null;const d=veilEl(col);if(!d)return null;const sp=S.speed||1;let a=null;
    try{a=d.animate([{opacity:0},{opacity:max}],{duration:200/sp,fill:'forwards',easing:'ease-out'})}catch(e){d.style.opacity=max}
    let done=false;return{end(){if(done)return;done=true;const sp=S.speed||1;try{const cur=+getComputedStyle(d).opacity||0;if(a)a.cancel();d.style.opacity=cur;const b=d.animate([{opacity:cur},{opacity:0}],{duration:340/sp,fill:'forwards'});b.onfinish=()=>d.remove()}catch(e){d.remove()}setTimeout(()=>d.remove(),1600)}}};
  const pulse=(col,dur,max,delay,peak)=>{if(typeof B!=='undefined'&&B&&B.skip)return true;const d=veilEl(col);if(!d)return false;const sp=S.speed||1;
    try{const a=d.animate([{opacity:0},{opacity:max,offset:peak},{opacity:0}],{duration:Math.max(40,dur/sp),delay:(delay||0)/sp,fill:'both',easing:'linear'});a.onfinish=()=>d.remove()}catch(e){d.remove();return false}return true};
  {const f0=flash;flash=function(col='#ffffff',dur=220,max=.6,delay=0){if(!pulse(col,dur,max,delay,.25))return f0.apply(this,arguments)}}
  {const t0=fxTint;fxTint=function(col,dur=500,max=.45){if(!pulse(col,dur,max,0,.5))return t0.apply(this,arguments)}}
}catch(e){console.warn('v441 fx',e)}

/* ---------- 7. animations qui forçaient à redessiner ---------- */
const st=document.createElement('style');st.id='v441css';st.textContent=`
/* le hibou des en-têtes : ailes et yeux figés, un petit balancement calculé par la carte graphique */
.plumeb .plw,.plumeb .pls{animation:none!important}
.plumeb svg{animation:plbob 3.4s ease-in-out infinite;transform-origin:50% 85%}
@keyframes plbob{0%,100%{transform:none}50%{transform:translateY(-1.5px) rotate(-5deg)}}
/* chroniques : la case « en cours » pulse sans repeindre */
.hcpips i.cur{animation:none!important;position:relative;overflow:hidden}
.hcpips i.cur::after{content:'';position:absolute;inset:0;border-radius:inherit;background:var(--hc,#9fe8c8);opacity:0;animation:hcpu2 1.6s ease-in-out infinite}
@keyframes hcpu2{50%{opacity:1}}
/* combat : barre de vie basse — lueur fixe au lieu d'un filtre animé */
#battle .u .hp>i.lo{animation:none!important;box-shadow:0 0 7px rgba(255,90,100,.7)}
#battle .fxveil{position:absolute;left:0;top:0;width:100%;height:var(--fxh,100%);pointer-events:none;z-index:6;opacity:0;will-change:opacity;
 -webkit-mask-image:linear-gradient(#000 calc(100% - 64px),transparent);mask-image:linear-gradient(#000 calc(100% - 64px),transparent)}
`;document.head.appendChild(st);

/* ---------- 8. défilement : plus de recalcul de tout l'écran au début et à la fin de chaque geste ---------- */
const dropScrollPause=()=>{try{for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}
  for(let i=rs.length-1;i>=0;i--){const r=rs[i];if(r.selectorText&&/html\.scrl #app \*/.test(r.selectorText))sh.deleteRule(i)}}}catch(e){}};
dropScrollPause();setTimeout(dropScrollPause,2000);

/* ---------- notes de version ---------- */
try{const it=[
 "⚡ <b>Fluidité</b> : les portraits, avatars, décors et images des ultimes ne sont plus recalculés à chaque lancement du jeu. Ils sont gardés pour toujours dans le téléphone : listes, classement et arène s'affichent et défilent sans à-coups.",
 "🎞️ Les portraits dans les listes ne se redessinent plus à chaque image (ils étaient animés en cachette).",
 "⚔️ Combats plus fluides : les grands voiles des ultimes (Kaïros, l'Hiver Immobile et les autres apparences) sont calculés par la carte graphique, le canvas des effets ne couvre plus le journal, et le début du combat ne fige plus l'écran.",
 "🦉 Le petit hibou des en-têtes ne redessine plus tout son dessin à chaque image, et faire défiler ne recalcule plus tout l'écran."];
 PATCH.unshift({v:'v67',d:Date.now(),t:'Fluidité',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['Fluidité']='Smoothness';
  I18N_EN[it[0]]="⚡ <b>Smoothness</b>: portraits, avatars, scenery and ultimate images are no longer recomputed every time the game starts. They're kept on your phone for good: lists, rankings and the arena display and scroll without stutter.";
  I18N_EN[it[1]]="🎞️ Portraits in lists no longer redraw on every frame (they were secretly animated).";
  I18N_EN[it[2]]="⚔️ Smoother battles: big ultimate veils (Kairos, the Still Winter and other skins) are handled by the graphics chip, the effects canvas no longer covers the battle log, and the start of a battle no longer freezes the screen.";
  I18N_EN[it[3]]="🦉 The little owl in headers no longer redraws itself on every frame, and scrolling no longer recomputes the whole screen."}}catch(e){}
}catch(e){console.warn('v441',e)}})();
