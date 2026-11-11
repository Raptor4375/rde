/* ================= V412 : l'affichage respire =================
   L'onglet Aventure était devenu trois fois plus lourd que les autres : trop de grands dessins SVG
   reconstruits à chaque affichage, et toutes les cartes calculées même celles qu'on ne voit pas.
   · les illustrations décoratives des cartes deviennent des images toutes prêtes (rendues une seule fois) ;
   · les cartes hors de l'écran ne sont plus calculées tant qu'on n'y arrive pas ;
   · un peu moins de flocons, et plus de calque superflu. */
(function(){try{
const SC={};
function still(k,fn){if(SC[k]!==undefined)return SC[k];let s='';
  try{s=String(fn()||'').replace(/<(animate|animateMotion|animateTransform|set)\b[^>]*\/>/g,'').replace(/<(animate|animateMotion|animateTransform)\b[^>]*>[\s\S]*?<\/\1>/g,'')}catch(e){return SC[k]=''}
  if(!s)return SC[k]='';
  if(!/<svg\b[^>]*\bxmlns=/.test(s))s=s.replace(/<svg\b/,'<svg xmlns="http://www.w3.org/2000/svg"');
  return SC[k]='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}
const img=(src,cls)=>src?`<img class="${cls||''}" src="${src}" alt="" aria-hidden="true" draggable="false" style="width:100%;height:100%;display:block;object-fit:contain">`:'';
window.RDEstill=still;
/* les grandes illustrations des cartes : rendues une fois, puis réutilisées telles quelles */
function lighten(h){if(typeof h!=='string'||h.indexOf('<svg')<0)return h;
  try{
    h=h.replace(/<svg class="loresvg hb"[\s\S]*?<\/svg>/g,m=>img(still('ily'+m.length,()=>m),'loresvg hb'));
    h=h.replace(/<svg class="hbsvg"[\s\S]*?<\/svg>/g,m=>img(still('hb'+m.length,()=>m),'hbsvg'));
    h=h.replace(/<svg viewBox="0 0 100 100" class="plume"[\s\S]*?<\/svg>/g,m=>img(still('pl'+m.length,()=>m),'plume'));
  }catch(e){}
  return h}
for(const n of['gvCard','sagaCard','acCard','lyCard','soCard']){try{const f=window[n];if(typeof f!=='function')continue;
  window[n]=function(){return lighten(f.apply(this,arguments))};try{eval(n+'=window.'+n)}catch(e){}}catch(e){}}
try{const gc=gvCard;gvCard=function(){return lighten(gc.apply(this,arguments))}}catch(e){}
try{const sc=sagaCard;sagaCard=function(){return lighten(sc.apply(this,arguments))}}catch(e){}
try{const ps=pSummonStd;pSummonStd=function(){return lighten(ps.apply(this,arguments))}}catch(e){}
/* ---------- les cartes hors écran ne sont plus calculées ---------- */
const st=document.createElement('style');st.textContent=`
#app .card,#app .sgcard,#app .acard{content-visibility:auto;contain-intrinsic-size:auto 280px}
#app .lobby,#app .banner,#app .top,#app .chips,#ovl .card,#ovl *{content-visibility:visible!important}
#gvsnow i{will-change:auto}
#app img.loresvg,#app img.hbsvg,#app img.plume{pointer-events:none}`;document.head.appendChild(st);
/* un peu moins de flocons */
try{const d=document.getElementById('gvsnow');if(d)[...d.children].slice(7).forEach(e=>e.remove());
  const mo=new MutationObserver(()=>{const g=document.getElementById('gvsnow');if(g&&g.children.length>7){[...g.children].slice(7).forEach(e=>e.remove())}});
  mo.observe(document.body,{childList:true})}catch(e){}
}catch(e){console.warn('perf',e)}})();
