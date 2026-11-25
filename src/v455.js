
/* ================= V455 : L'AFFICHAGE TIENT EN PLACE =================
   Corrections vues sur les vidéos de Raptor :
   · un réaffichage qui n'a pas été demandé par un geste (données en ligne, minuteur…) attend maintenant que le doigt
     s'arrête de faire défiler, au lieu de redessiner la page sous le doigt ;
   · l'onglet Aventure pesait 350 ko de texte à chaque affichage (les portraits des Chroniques des Héros
     étaient recopiés dedans à chaque fois) : ils sont maintenant des images partagées, la page pèse ~45 ko ;
   · en combat, les gros chiffres (« CRIT 671,9 k ») sortaient de l'écran sur les côtés : ils restent dedans. */
(function(){try{
/* ---------- 1. la page ne saute plus quand elle se réaffiche pendant qu'on fait défiler ---------- */
const SB={t:0,u:0,pend:null};
addEventListener('scroll',()=>{SB.t=performance.now()},{passive:true,capture:true});
/* un vrai geste (toucher un bouton, taper au clavier) : pas le doigt qui fait défiler */
for(const ev of ['click','keydown','input','change'])addEventListener(ev,()=>{SB.u=performance.now()},{passive:true,capture:true});
const inBattle=()=>{try{return typeof B!=='undefined'&&!!B}catch(e){return false}};
const r0=render;
render=function(){
  const now=performance.now();
  /* un réaffichage « de fond » (données en ligne, minuteur…) pendant qu'on fait défiler : on attend la fin du geste */
  if(now-SB.t<900&&now-SB.u>900&&!inBattle()){
    if(!SB.pend)SB.pend=setTimeout(function go(){if(performance.now()-SB.t<700){SB.pend=setTimeout(go,300);return}SB.pend=null;try{render()}catch(e){}},300);
    return}
  if(SB.pend){clearTimeout(SB.pend);SB.pend=null}
  return r0.apply(this,arguments)};
window.RDEscrollDefer=SB;

/* ---------- 2. les grandes images de l'Aventure ne sont plus recopiées dans la page à chaque affichage ---------- */
try{const st0=window.RDEstill;if(typeof st0==='function'){const BU=new Map();
  window.RDEstill=function(k,fn){const u=st0.apply(this,arguments);if(typeof u!=='string'||!u.startsWith('data:image/svg+xml'))return u;
    const kk=k+'|'+u.length;let b=BU.get(kk);if(b)return b;
    try{const i=u.indexOf(',');const head=u.slice(0,i);const txt=/;base64/.test(head)?atob(u.slice(i+1)):decodeURIComponent(u.slice(i+1));
      b=URL.createObjectURL(new Blob([txt],{type:'image/svg+xml'}));BU.set(kk,b);return b}catch(e){return u}}}}catch(e){}

/* ---------- 3. en combat, les chiffres restent dans l'écran ---------- */
try{const fn0=floatNow;const RC=new WeakMap();
  const FS=c=>/crit/.test(c)?(/sk/.test(c)?30:25):/sk/.test(c)?24:/heal/.test(c)?20:/info/.test(c)?13:/dot/.test(c)?15:18;
  floatNow=function(u,t,c){const r=fn0.apply(this,arguments);
    try{if(!B||B.skip)return r;const el=document.getElementById('u-'+u.key);if(!el)return r;const f=el.lastElementChild;if(!f||!f.classList||!f.classList.contains('fl'))return r;
      /* « CRIT » en petit devant le nombre : le chiffre prend moins de place en largeur */
      if(/^CRIT /.test(t)&&f.textContent===t){const num=t.slice(5),sm=document.createElement('small');sm.className='flc';sm.textContent='CRIT';f.textContent='';f.append(sm,document.createTextNode(num));t='CRI'+num}
      const now=performance.now();let q=RC.get(el);
      if(!q||now-q.t>2500){const a=el.getBoundingClientRect(),bt=document.getElementById('battle'),bb=bt?bt.getBoundingClientRect():{left:0,right:innerWidth};
        q={l:a.left,w:a.width,min:Math.max(0,bb.left)+6,max:Math.min(innerWidth,bb.right)-6,t:now};RC.set(el,q)}
      const w=String(t).length*FS(c)*.48*1.3,L=parseFloat(f.style.left)||50,cx=q.l+L/100*q.w;let dx=0;
      if(w>=q.max-q.min)dx=(q.min+q.max)/2-cx;else if(cx-w/2<q.min)dx=q.min-(cx-w/2);else if(cx+w/2>q.max)dx=q.max-(cx+w/2);
      if(Math.abs(dx)>1)f.style.left=`calc(${L.toFixed(1)}% + ${Math.round(dx)}px)`}catch(e){}
    return r}}catch(e){}

try{const st=document.createElement('style');st.id='v455css';st.textContent='.fl small.flc{font-size:.48em;letter-spacing:.05em;vertical-align:.62em;margin-right:3px;line-height:1}';document.head.appendChild(st)}catch(e){}

/* ---------- notes de version ---------- */
try{const it=[
  "🎯 Le point du mode <b>Difficile</b> s'affiche enfin sous le sélecteur de mode, « Cauchemar » ne dépasse plus de sa flèche, et un mode terminé affiche « Terminé » (le texte ne passe plus sur deux lignes).",
  "📜 La page ne <b>saute</b> plus quand elle se met à jour pendant que tu fais défiler (Arène, Grand-Place, guilde…) : elle attend que ton doigt s'arrête, et garde ta position.",
  "⚡ L'onglet <b>Aventure</b> est bien plus léger (les portraits des Chroniques des Héros ne sont plus recopiés à chaque affichage) : changer de mode est plus rapide.",
  "💥 En combat, les gros chiffres de dégâts restent dans l'écran au lieu de dépasser sur les côtés."];
 PATCH.unshift({v:79,d:'25 novembre 2026',t:"L'affichage tient en place",items:it});
 const E=[
  "🎯 The <b>Hard</b> mode dot finally shows under the mode selector, “Nightmare” no longer sticks out of its arrow, and a finished mode shows “Done” (the text no longer wraps onto two lines).",
  "📜 The page no longer <b>jumps</b> when it updates while you scroll (Arena, Grand Square, guild…): it waits for your finger to stop, and keeps your position.",
  "⚡ The <b>Adventure</b> tab is much lighter (the Hero Chronicles portraits are no longer copied on every display): switching modes is faster.",
  "💥 In battle, big damage numbers stay on screen instead of sticking out on the sides."];
 const sp=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));
 const put=(fr,en)=>{const f=sp(fr),g=sp(en);if(f.length!==g.length)return;f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})};
 it.forEach((x,i)=>{I18N_EN[x]=E[i];put(x,E[i])});
 if(!("L'affichage tient en place" in I18N_EN))I18N_EN["L'affichage tient en place"]='The display stays put'}catch(e){}
}catch(e){console.warn('v455',e)}})();
