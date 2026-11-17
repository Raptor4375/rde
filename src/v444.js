/* ================= V444 : COMBAT FLUIDE SUR TÉLÉPHONE =================
   Vidéo du combat Husky : l'image se figeait 100 à 200 ms pendant l'Arrêt du Temps, le Coup de Poker et les gros coups critiques.
   Mesuré sur le même combat (mêmes héros, téléphone simulé) :
   · le journal du combat n'y est pour rien (le cacher ne change rien : il garde déjà 40 lignes au plus) ;
   · le gros du travail vient du canvas des effets (étincelles, cercles, glaces) redessiné 60 fois par seconde,
     et des 34 petites animations décoratives sans fin (poussières du décor, auréoles ULTRA qui tournent sur les 10 cartes,
     neige de la saison) qui obligent le téléphone à découper l'écran en ~80 calques.
   Sur téléphone :
   · les effets du canvas sont dessinés 30 fois par seconde (les cartes, les chiffres et le reste bougent toujours à 60),
     avec 40 % de particules en moins et un canvas un peu moins fin ;
   · seule la carte qui agit garde son auréole ULTRA qui tourne, les autres gardent leur auréole immobile ;
   · pas de poussières ni de neige par-dessus le combat.
   Sur ordinateur, rien ne change, sauf si le jeu détecte qu'il rame : il passe alors tout seul au mode léger. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const PH=!!window.__RDE_PHONE||(matchMedia('(pointer:coarse)').matches&&Math.min(screen.width,screen.height)<760);
if(PH)document.documentElement.classList.add('rdphone');
const L=window.RDEFXL={on:PH,gap:20,emit:.6,cap:480,dpr:1.25,auto:false};
try{if(localStorage.getItem('rde-fxlite')==='1')L.on=true}catch(e){}
try{if(document.body.classList.contains('rdlite'))L.on=true}catch(e){}
const goLite=()=>{if(L.on)return;L.on=true;L.auto=true;try{localStorage.setItem('rde-fxlite','1')}catch(e){}};

/* moins de particules en mode léger */
{const e0=emit;emit=function(n,f){if(L.on&&n>2)n=Math.max(1,Math.round(n*L.emit));return e0.call(this,n,f)}}

/* la boucle des effets : identique, mais 30 images/s en mode léger, et elle repère seule un appareil qui rame */
let seq=0;
fxRun=function(){if(FXS.raf)return;let last=performance.now(),slow=0,seen=0;
  const loop=now=>{const c=FXS.ctx;if(!c){FXS.raf=0;FXS.parts=[];FXS.items=[];return}
    const gap=now-last;if(!L.on&&gap<250&&!document.hidden){seen++;if(gap>24)slow++;if(seen>=16){if(slow>=10)goLite();seen=0;slow=0}}
    const dt=Math.min(3,Math.max(0,gap/16.67))*S.speed;last=now;c.clearRect(0,0,FXS.w,FXS.h);
    FXS.items=FXS.items.filter(it=>{const p=(now-it.t0)/it.dur;if(p>=1)return false;if(p<0)return true;c.save();try{it.draw(c,p)}catch(e){}c.restore();return true});
    const keep=[];for(const p of FXS.parts){p.life-=dt;if(p.life<=0)continue;if(p.drag){const d=Math.pow(p.drag,dt);p.vx*=d;p.vy*=d}p.vy+=(p.g||0)*dt;p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.vr)p.rot=(p.rot||0)+p.vr*dt;if(p.wob)p.x+=Math.sin((p.max-p.life)*.12+p.wob)*.6*dt;keep.push(p);drawP(c,p)}
    const cap=L.on?L.cap:900;FXS.parts=keep.length>cap?keep.slice(-cap):keep;c.globalAlpha=1;c.globalCompositeOperation='source-over';
    if(FXS.items.length||FXS.parts.length){
      if(L.on){const tok=-(++seq);FXS.raf=tok;setTimeout(()=>{if(FXS.raf===tok)FXS.raf=requestAnimationFrame(loop)},L.gap)}
      else FXS.raf=requestAnimationFrame(loop)}
    else{FXS.raf=0;c.clearRect(0,0,FXS.w,FXS.h)}};
  FXS.raf=requestAnimationFrame(loop)};

const st=document.createElement('style');st.id='v444css';st.textContent=`
html.rdphone #battle .bpart{display:none!important}
html.rdphone body.inb #gvsnow{display:none!important}
html.rdphone #battle .u.ux:not(.act)::before{animation:none!important;will-change:auto!important}
html.rdphone #battle .u.ux:not(.act)::after{animation:none!important;opacity:0!important}`;
document.head.appendChild(st);

/* notes de version */
try{const it=[
 "⚡ <b>Combat plus fluide sur téléphone.</b> Sur ta vidéo, l'image se figeait pendant l'Arrêt du Temps, le Coup de Poker et les gros coups critiques. Ce n'était pas le journal du combat (il garde déjà 40 lignes au plus) : c'étaient les effets.",
 "✨ Sur téléphone, les étincelles et cercles magiques sont dessinés 30 fois par seconde au lieu de 60, avec moins de particules ; seule la carte qui agit garde son auréole ULTRA qui tourne ; plus de poussières ni de neige par-dessus le combat. Les cartes, les dégâts et les cut-ins restent à 60 images/s.",
 "💻 Sur ordinateur rien ne change, sauf si le jeu voit qu'il rame : il passe alors tout seul en mode léger."];
 PATCH.unshift({v:'v70',d:Date.now(),t:'Combat fluide',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['Combat fluide']='Smoother battles';
  I18N_EN[it[0]]="⚡ <b>Smoother battles on phones.</b> In your video the picture froze during Time Stop, Poker Strike and big critical hits. It wasn't the battle log (it already keeps 40 lines at most): it was the effects.";
  I18N_EN[it[1]]="✨ On phones, sparks and magic circles are drawn 30 times per second instead of 60, with fewer particles; only the acting card keeps its spinning ULTRA aura; no more dust or snow over the battle. Cards, damage and cut-ins stay at 60 fps.";
  I18N_EN[it[2]]="💻 Nothing changes on computers, unless the game sees it is struggling: it then switches to light mode by itself."}}catch(e){}
}catch(e){console.warn('v444',e)}})();
