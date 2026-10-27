/* ================= V37.7 : histoire, cartes et textes animés en anglais, sans lag ================= */
/* 1) mode histoire : chaque réplique est traduite AVANT d'être écrite lettre par lettre (plus de bulle vide ni de lag) */
function trS(t){if(LANG==='fr'||typeof t!=='string'||!t)return t;try{const {k,nums}=i18nNorm(t.trim());const x=trK(k);return x!=null?i18nFill(x,nums):t}catch(e){return t}}
{const sh=sagaShow;sagaShow=function(){try{if(LANG!=='fr'&&SGP&&Array.isArray(SGP.lines)&&SGP.lines._tr!==LANG){SGP.lines.forEach((L,i)=>{if(!L)return;if(L.ch){L.ch=L.ch.map(c=>[trS(c[0]),c[1],trS(c[2])]);return}if(Array.isArray(L)&&typeof L[1]==='string')L[1]=trS(L[1]);else if(L&&typeof L.t==='string')L.t=trS(L.t)});SGP.lines._tr=LANG}
  const o=document.getElementById('sgov');if(o)o.querySelectorAll('.sgtext,.sgname').forEach(e=>e.setAttribute('data-noi18n',''))}catch(e){}
  const r=sh.apply(this,arguments);try{const nm=document.querySelector('#sgov .sgname');if(nm&&LANG!=='fr'){const t=trS(nm.textContent);if(t!==nm.textContent)nm.textContent=t}}catch(e){}return r}}
/* 2) les textes dans les dessins (cartes, lieux) se traduisent aussi */
{const nd=i18nNode;i18nNode=function(n){const r=nd.apply(this,arguments);try{if(LANG!=='fr'){const p=n.parentElement;if(p&&p.closest&&p.closest('svg')&&p.closest('text,tspan')){const v=n.nodeValue;if(v&&/[A-Za-zÀ-ÿ]{2}/.test(v)&&I18N.done.get(n)!==v){const t=tr(v);if(t!==v){I18N.done.set(n,t);n.nodeValue=t}}}}}catch(e){}return r}}
/* 3) un texte qui change très vite (écriture lettre par lettre, compteurs) n'est plus envoyé au traducteur à chaque lettre */
{const q=i18nQueue;const seen=new Map();i18nQueue=function(k){try{if(/^«/.test(k)&&!/»$/.test(k))return;const n=Date.now();for(const [kk,t] of seen){if(n-t>3000)seen.delete(kk)}
  for(const kk of seen.keys()){if(kk.length>=4&&k.length>kk.length&&k.startsWith(kk))return}seen.set(k,n)}catch(e){}return q.apply(this,arguments)}}
/* 4) le masquage anti-clignotement ne masque jamais deux fois la même phrase */
{const hidden=new Set();const nd=i18nNode;i18nNode=function(n){const r=nd.apply(this,arguments);try{const p=n.parentElement;if(p&&p.classList.contains('i18w')){const {k}=i18nNorm((n.nodeValue||'').trim());if(hidden.has(k)){p.classList.remove('i18w')}else hidden.add(k)}}catch(e){}return r}}

/* 5) noms des héros et des guildes du royaume traduits partout (même dans les listes de noms) */
const I18N_PROPER=new Set([...HEROES.map(h=>h&&h.n).filter(Boolean),"Ordre du Phénix","Garde d'Obsidienne","Crocs de Givre","Les Lames d'Azur","Les Fous du Roi","Cercle Arcanique","Les Insomniaques","Taverne du Dé Pipé","Les Gardiens d'Éther"]);
{const nd=i18nNode;i18nNode=function(n){const r=nd.apply(this,arguments);try{if(LANG==='en'){const v=n.nodeValue||'';const c=v.trim();if(I18N_PROPER.has(c)&&I18N_EN[c]){n.nodeValue=v.replace(c,I18N_EN[c]);I18N.done.set(n,n.nodeValue)}}}catch(e){}return r}}
