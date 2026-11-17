/* ================= V445 : PLUS AUCUNE IMAGE VIDE =================
   Certains portraits (Livre de l'Histoire, personnages du Livre II, fête foraine…) sont transformés en images SVG.
   Quand le dessin ne déclarait pas son espace de noms (xmlns), le navigateur refusait de l'afficher : case vide.
   Filet de sécurité pour tout le jeu : une image SVG qui échoue est réparée (espace de noms, attributs en double) et rechargée. */
(function(){try{
const NS='http://www.w3.org/2000/svg',XL='http://www.w3.org/1999/xlink';
const fix=t=>{let s=String(t||'');const i=s.indexOf('<svg');if(i<0)return null;let o=s;
  if(!/<svg[^>]*\sxmlns=/.test(o))o=o.replace('<svg','<svg xmlns="'+NS+'"');
  if(/xlink:/.test(o)&&!/xmlns:xlink=/.test(o))o=o.replace('<svg','<svg xmlns:xlink="'+XL+'"');
  /* attributs en double sur une balise (ex. deux « class » sur le <svg>) : on les fusionne */
  o=o.replace(/<([a-zA-Z][\w:-]*)(\s[^<>]*?)(\/?)>/g,(m,tag,attrs,sl)=>{const seen=new Map();const re=/([\w:-]+)\s*=\s*("[^"]*"|'[^']*')/g;let x,dup=false;
    while((x=re.exec(attrs))){const k=x[1],v=x[2].slice(1,-1);if(seen.has(k)){dup=true;if(k==='class')seen.set(k,seen.get(k)+' '+v)}else seen.set(k,v)}
    if(!dup)return m;return'<'+tag+[...seen].map(([k,v])=>' '+k+'="'+v.replace(/"/g,'&quot;')+'"').join('')+sl+'>'});
  try{if(typeof svgXmlOk==='function'&&!svgXmlOk(o)&&typeof svgDedupe==='function')o=svgDedupe(o)}catch(e){}
  return o===s?null:o};
const FIXED=new Map(),OUT=new Set();
document.addEventListener('error',async e=>{const im=e.target;if(!im||im.tagName!=='IMG')return;const src=im.getAttribute('src')||'';if(!src||OUT.has(src))return;
  if(FIXED.has(src)){const f=FIXED.get(src);if(f)im.src=f;return}FIXED.set(src,null);
  try{let txt=null;
    if(src.startsWith('data:image/svg+xml')){const k=src.indexOf(',');const body=src.slice(k+1);txt=/;base64/.test(src.slice(0,k))?atob(body):decodeURIComponent(body)}
    else if(src.startsWith('blob:')){const r=await fetch(src);const ty=r.headers.get('content-type')||'';if(!/svg/.test(ty))return;txt=await r.text()}
    else return;
    const f=fix(txt);if(!f)return;
    const u=src.startsWith('blob:')?URL.createObjectURL(new Blob([f],{type:'image/svg+xml'})):'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(f);FIXED.set(src,u);OUT.add(u);im.src=u}catch(err){}},true);

/* à la source : les portraits « en pied » recevaient une 2e classe sur leur <svg> (Aléa, Eryndel, le Roi…) */
const dd=h=>typeof h==='string'&&/<svg[^>]*\sclass="[^"]*"[^>]*\sclass=/.test(h)?h.replace(/<svg([^>]*)>/g,(m,a)=>{const c=[];const r=a.replace(/\sclass="([^"]*)"/g,(x,v)=>{c.push(v);return''});return c.length>1?'<svg class="'+c.join(' ')+'"'+r+'>':m}):h;
for(const n of ['aleaSVG','loreFig','sagaFig','vesperaxSVG','astreeSVG']){try{const f0=window[n]||eval(n);if(typeof f0!=='function')continue;const w=function(){return dd(f0.apply(this,arguments))};eval(n+'=w')}catch(e){}}
/* images déjà en échec au chargement */
setTimeout(()=>{for(const im of document.querySelectorAll('img'))if(im.complete&&im.naturalWidth===0&&im.getAttribute('src'))im.dispatchEvent(new Event('error'))},1500);
}catch(e){console.warn('v445',e)}})();
