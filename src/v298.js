
/* ================= performances et son ================= */
/* --- son : le séquenceur anticipe plus loin (fini les notes qui sautent quand le téléphone rame) --- */
function musTick(){const P=AU.song;if(!P||!AU.ok||!AU.ctx||AU.ctx.state!=='running')return;const c=AU.ctx,C=P.C,now=c.currentTime;
  if(P.next<now-.02){const miss=Math.ceil((now-P.next)/C.sd);P.pos=(P.pos+miss)%C.len;P.next+=miss*C.sd;if(P.next<now)P.next=now+.03}
  let n=0;while(P.next<now+.75&&n<64){const evs=C.ev[P.pos];for(const e of evs){try{INS[e[0]](DRYI.has(e[0])?P.dout:P.out,P.next,e[1],e[2]*C.sd,e[3])}catch(er){}}P.next+=C.sd;P.pos=(P.pos+1)%C.len;n++}}
document.addEventListener('visibilitychange',()=>{try{if(!AU.ok||!AU.ctx)return;if(document.hidden){AU.ctx.suspend&&AU.ctx.suspend()}else if(AU.started){AU.ctx.resume&&AU.ctx.resume().then(()=>{const P=AU.song;if(P)P.next=AU.ctx.currentTime+.1})}}catch(e){}});
/* --- rendu : on ne remplace plus tout l'écran, seulement ce qui a changé --- */
const PFX={morph:true,coarse:!!(window.matchMedia&&matchMedia('(pointer:coarse)').matches),renders:0};
function pfPatch(a,b){if(a.nodeType!==b.nodeType||a.nodeName!==b.nodeName){a.replaceWith(b);return}
  if(a.nodeType===3||a.nodeType===8){if(a.nodeValue!==b.nodeValue)a.nodeValue=b.nodeValue;return}if(a.nodeType!==1)return;if(a.isEqualNode(b))return;
  const tag=a.nodeName.toLowerCase(),foc=document.activeElement===a;
  for(const at of [...a.attributes]){if(!b.hasAttribute(at.name)){if(tag==='details'&&at.name==='open')continue;if((tag==='input'||tag==='textarea')&&at.name==='value')continue;a.removeAttribute(at.name)}}
  for(const at of [...b.attributes]){if(a.getAttribute(at.name)!==at.value){if((tag==='input'||tag==='textarea')&&at.name==='value'&&foc)continue;a.setAttribute(at.name,at.value)}}
  if(tag==='textarea'){if(!foc&&a.value!==b.value)a.value=b.value;return}
  pfMorph(a,b)}
function pfMorph(o,n){const oc=[...o.childNodes],nc=[...n.childNodes];for(let i=0;i<nc.length;i++){if(i>=oc.length)o.appendChild(nc[i]);else pfPatch(oc[i],nc[i])}for(let i=nc.length;i<oc.length;i++)oc[i].remove()}
(function(){const m=document.getElementById('main');if(!m)return;const d=Object.getOwnPropertyDescriptor(Element.prototype,'innerHTML');if(!d||!d.set)return;
  Object.defineProperty(m,'innerHTML',{configurable:true,get(){return d.get.call(this)},set(v){PFX.renders++;if(!PFX.morph||!this.firstChild){d.set.call(this,v);return}try{const t=document.createElement('template');t.innerHTML=v;pfMorph(this,t.content)}catch(e){d.set.call(this,v)}}})})();
/* un changement d'onglet repart d'un écran neuf (pas de reste de l'ancien lieu) */
{const r4=render;let lastKey='';render=function(){const k=TAB+'|'+JSON.stringify(UI.lz&&UI.lz[TAB]||null)+'|'+(UI.iv||'')+'|'+(UI.cb||'');if(k!==lastKey){PFX.morph=false;lastKey=k}try{return r4.apply(this,arguments)}finally{PFX.morph=true}}}
/* --- les animations des lieux se mettent en pause quand elles ne sont pas à l'écran --- */
setInterval(()=>{try{if(document.hidden)return;const H=innerHeight;document.querySelectorAll('#main svg').forEach(s=>{if(!s.pauseAnimations||!s.querySelector('animate,animateTransform,animateMotion'))return;const r=s.getBoundingClientRect();const vis=r.bottom>-40&&r.top<H+40&&r.width>0;if(vis&&s.animationsPaused&&s.animationsPaused()&&!document.documentElement.classList.contains('bgpause'))s.unpauseAnimations();else if(!vis&&!s.animationsPaused())s.pauseAnimations()})}catch(e){}},900);
/* --- mode léger automatique sur téléphone --- */
if(PFX.coarse)document.documentElement.classList.add('perf');
