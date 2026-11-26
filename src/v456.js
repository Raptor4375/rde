
/* ================= V456 : DES CHIFFRES DE COMBAT RANGÉS, DES DÉBUTS DE COMBAT PLUS FLUIDES =================
   Vu sur la vidéo de Raptor (arène, ultime « Éternité blanche » de Kaïros) :
   · les chiffres d'une même carte s'empilaient au-dessus de la carte, jusque sur « ENNEMIS », et se chevauchaient
     (chaque nouveau chiffre montait de 17 px alors qu'un chiffre en fait 25 à 30) ;
   · la retouche de la v79 (garder les gros chiffres dans l'écran) mesurait la carte pendant les secousses et les zooms
     de caméra : sur la carte du bord, tous les chiffres se collaient au même endroit ;
   · au début d'un combat contre une équipe jamais vue, le téléphone « photographiait » les portraits pendant les
     animations (c'est ce qui saccadait).
   Maintenant :
   · les chiffres vivent dans un calque au-dessus des cartes (ils ne s'assombrissent plus avec la carte vaincue) ;
   · chaque carte a sa petite pile : le plus récent en bas, les précédents poussés vers le haut et plus petits, 3 au plus ;
   · les mots (« Riposte », « Étourdi », « Bouclier »…) ont leur place à eux, en bas de la carte ;
   · la place de chaque carte est lue une seule fois par combat, sans les secousses ni les zooms ;
   · les portraits jamais vus sont photographiés juste avant la première action, écran encore immobile ;
     plus aucune photo pendant les animations (s'il en reste, elles se font après le combat, au calme). */
(function(){try{
/* ---------- 1. les chiffres du combat ---------- */
const FS=c=>/\binfo\b/.test(c)?12:/crit/.test(c)?(/\bsk\b/.test(c)?30:25):/\bsk\b/.test(c)?24:/heal/.test(c)?20:/dot/.test(c)?15:18;
const offs=e=>{let x=0,y=0;while(e){x+=e.offsetLeft;y+=e.offsetTop;e=e.offsetParent}return{x,y}};
let GK=null,GEO=new WeakMap();
/* la place des cartes (sans les transformations : secousses, zooms, cartes qui bondissent) ; relue si l'écran change */
/* (les cartes d'un combat ne bougent pas : elles sont toutes posées au début ; seule la taille de l'écran peut changer) */
function geo(card,bw){
  if(!GK||GK.bw!==bw||GK.w!==innerWidth||GK.h!==innerHeight){GK={bw,w:innerWidth,h:innerHeight,o:null,vw:0};GEO=new WeakMap()}
  let g=GEO.get(card);if(g)return g;
  /* toutes les cartes d'un coup : une seule mesure pour tout le combat */
  GK.o=offs(bw);GK.vw=document.documentElement.clientWidth||innerWidth;
  const cnt=new Map();
  for(const c of bw.querySelectorAll('[id^="u-"]')){const p=c.parentElement,o=offs(c),i=cnt.get(p)||0;cnt.set(p,i+1);
    GEO.set(c,{x:o.x-GK.o.x,y:o.y-GK.o.y,w:c.offsetWidth,h:c.offsetHeight,i,min:6-GK.o.x,max:GK.vw-6-GK.o.x})}
  g=GEO.get(card);if(!g){g={x:0,y:0,w:0,h:0,i:0,min:0,max:0};GEO.set(card,g)}
  return g}
const STK=new WeakMap(),LIVE=new Set();
const SC=[1,.82,.68],OP=['','.9','.72'];
function drop(it){if(it.dead)return false;it.dead=true;LIVE.delete(it);const k=it.arr.indexOf(it);if(k>=0)it.arr.splice(k,1);return true}
function kill(it){if(drop(it)){it.w.classList.add('out');setTimeout(()=>it.w.remove(),190)}}
const box=it=>({l:it.x-it.wd*it.s/2,r:it.x+it.wd*it.s/2,t:it.bot-it.h*it.s,b:it.bot});
const cross=(p,q)=>Math.min(p.r,q.r)-Math.max(p.l,q.l)>6&&Math.min(p.b,q.b)-Math.max(p.t,q.t)>4;
/* le plus récent en bas ; chaque ancien monte d'une hauteur de chiffre et rapetisse */
function stack(arr,g,by){let off=0;const gone=[];
  for(let k=arr.length-1,a=0;k>=0;k--,a++){const it=arr[k],s=SC[Math.min(a,2)];
    if(a&&by-off-it.h*s<g.y-24){gone.push(it);continue}
    it.a=a;it.s=s;it.bot=by-off;
    it.w.style.transform=`translate(-50%,-100%) translateY(${(-off).toFixed(1)}px) scale(${s})`;it.w.style.opacity=OP[Math.min(a,2)];
    off+=it.h*s+2}
  for(const it of gone)kill(it)}
/* deux cartes voisines touchées ensemble : le chiffre le plus récent de chaque carte passe d'abord,
   un ancien chiffre qui croiserait celui d'une autre carte s'efface au lieu de se superposer */
function tidy(card,arr){
  const nw=arr[arr.length-1],rn=nw&&box(nw);
  for(const o of [...LIVE]){if(o.card===card||o.dead||!o.a)continue;if(rn&&cross(rn,box(o)))kill(o)}
  for(const it of arr.slice()){if(!it.a||it.dead)continue;const r=box(it);
    for(const o of LIVE){if(o.card===card||o.dead)continue;if(cross(r,box(o))){kill(it);break}}}}
const fl0=floatNow;
floatNow=function(u,t,c){
  try{
    if(typeof B==='undefined'||!B||B.skip||!u)return;
    const card=document.getElementById('u-'+u.key);if(!card||!card.isConnected)return;
    const bw=card.closest('.bw');if(!bw)return fl0.apply(this,arguments);
    const g=geo(card,bw);if(!g||!g.w)return;
    let L=bw.querySelector(':scope>.flay');if(!L){L=document.createElement('div');L.className='flay';L.setAttribute('aria-hidden','true');bw.appendChild(L)}
    c=String(c||'dmg');t=String(t);
    const info=/\binfo\b/.test(c),crit=/^CRIT /.test(t),fs=FS(c);
    const w=document.createElement('div');w.className='flw'+(info?' inf':'');
    const f=document.createElement('div');f.className='fl '+c;
    /* « CRIT » en petit devant le nombre : le chiffre prend moins de place en largeur */
    if(crit){const sm=document.createElement('small');sm.className='flc';sm.textContent='CRIT';f.append(sm,document.createTextNode(t.slice(5)))}else f.textContent=t;
    w.appendChild(f);
    /* largeur estimée (sans mesurer) : assez pour rester dans l'écran, même au moment où le chiffre grossit */
    const W0=(crit?t.length-5+2.4:t.length)*fs*(info?.58:.62)+(info?18:0),W=W0*1.22;
    const cx=g.x+g.w/2,X=(g.max-g.min<=W)?(g.min+g.max)/2:Math.min(g.max-W/2,Math.max(g.min+W/2,cx));
    /* cartes étroites (téléphone, 5 par rangée) : une carte sur deux affiche ses chiffres plus haut,
       pour que les chiffres de deux cartes voisines touchées en même temps ne se croisent pas */
    const by=g.y+g.h*(info?.9:(g.w<96&&g.i%2===1)?.36:.64);
    w.style.left=X.toFixed(1)+'px';w.style.top=by.toFixed(1)+'px';
    let s=STK.get(card);if(!s){s={n:[],i:[]};STK.set(card,s)}
    const arr=info?s.i:s.n,it={w,card,arr,x:X,wd:W0,h:info?20:Math.round(fs*1.06),a:0,s:1,bot:by,dead:false};
    arr.push(it);while(arr.length>(info?1:3))kill(arr[0]);
    if(info)w.style.transform='translate(-50%,-100%)';else{LIVE.add(it);stack(arr,g,by);tidy(card,arr)}
    L.appendChild(w);
    setTimeout(()=>{if(drop(it))w.remove()},info?1200:1150);
  }catch(e){}};

/* ---------- 2. portraits : jamais de « photo » pendant les animations d'un combat ---------- */
try{if(typeof avSwap==='function'&&typeof AVR!=='undefined'&&typeof avKey==='function'&&window.RDEIMG){
  const IMG=window.RDEIMG,prev=avSwap;
  const SEL='#main .fav>svg,#ovl .fav>svg,#top .fav>svg,#main .pt>svg,#ovl .pt>svg,#battle .pt>svg';
  const HK=new WeakMap(),LATER=new Map();
  /* empreinte bon marché d'un dessin : s'il change sur place, on le relit */
  const fp=sv=>{const a=sv.firstElementChild;return sv.childElementCount+'|'+(sv.getAttribute('aria-label')||'')+'|'+((a&&a.getAttribute('href'))||'').length};
  let dirty=true,lastC=-1;
  /* on ne relit la page que si un dessin vient d'y entrer (les chiffres et les effets n'en contiennent pas) */
  new MutationObserver(recs=>{if(dirty)return;for(const r of recs)for(const n of r.addedNodes)if(n.nodeType===1&&(n.tagName==='svg'||(n.querySelector&&n.querySelector('svg')))){dirty=true;return}})
    .observe(document.body,{childList:true,subtree:true});
  const swap=(sv,u)=>{const i=document.createElement('img');i.src=u;i.alt=sv.getAttribute('aria-label')||'';i.className='avimg';i.draggable=false;i.decoding='async';sv.replaceWith(i)};
  const inFight=root=>{if(!dirty&&AVR.c.size===lastC)return;dirty=false;lastC=AVR.c.size;
    for(const sv of root.querySelectorAll(SEL)){
      const f=fp(sv);let m=HK.get(sv);
      if(!m||m.f!==f){const h=sv.outerHTML;m={f,h,k:h.length<1500?null:avKey(h),ik:null};HK.set(sv,m)}
      if(!m.k)continue;
      let u=AVR.c.get(m.k);
      if(u===undefined){
        /* déjà photographié lors d'une partie précédente : tout de suite ; sinon, après le combat */
        if(!m.ik)m.ik='a'+IMG.hash(m.h);
        const hit=IMG.get(m.ik);
        if(hit){AVR.c.set(m.k,hit);lastC=AVR.c.size;u=hit}
        else{if(!AVR.busy.has(m.k)&&LATER.size<80)LATER.set(m.k,m.h);continue}}
      if(u)swap(sv,u)}};
  /* après le combat : une photo à la fois, quand le téléphone ne fait rien d'autre (ni combat, ni défilement) */
  let drT=0,drBusy=false;
  const later=ms=>{if(drT||drBusy||!LATER.size)return;drT=setTimeout(()=>{drT=0;drBusy=true;
    const go=()=>{const next=d=>{drBusy=false;later(d)};
      if(document.getElementById('battle')||!LATER.size){drBusy=false;return}
      const sb=window.RDEscrollDefer;if(sb&&performance.now()-sb.t<900){next(700);return}
      const [k,h]=LATER.entries().next().value;LATER.delete(k);
      try{if(!AVR.c.has(k)&&!AVR.busy.has(k))avRaster(h)}catch(e){}
      const p=AVR.busy.get(k);if(p&&p.then)p.then(()=>next(250),()=>next(250));else next(250)};
    if(window.requestIdleCallback)requestIdleCallback(go,{timeout:2500});else go()},ms)};
  avSwap=function(root){
    if(document.getElementById('battle')){try{inFight(root&&root.querySelectorAll?root:document)}catch(e){}return}
    dirty=true;if(LATER.size)later(900);
    return prev.apply(this,arguments)};
  window.RDEavLater=LATER;
  /* début de combat : les portraits jamais vus (et l'image de l'ultime de tes héros) sont photographiés
     AVANT la première action, pendant que l'écran est encore immobile ; ensuite le combat ne tourne
     qu'avec des photos (un dessin gardé tout le combat coûtait plus cher à chaque coup reçu). */
  const prep=async my=>{const t0=performance.now(),CAP=1500,ps=[];
    for(const sv of document.querySelectorAll('#battle .pt>svg')){const h=sv.outerHTML;if(h.length<1500)continue;const k=avKey(h);
      if(AVR.c.has(k))continue;try{avRaster(h)}catch(e){}const p=AVR.busy.get(k);if(p)ps.push(p)}
    const ux=[];try{if(typeof uxPrep==='function'&&typeof UXB!=='undefined')for(const u of my.units)if(u.side===0&&u.ux&&u.hid!=null){ux.push(u.hid);uxPrep(u.hid)}}catch(e){}
    let all=!ps.length;if(ps.length)Promise.all(ps).then(()=>{all=true},()=>{all=true});
    while(performance.now()-t0<CAP&&!my.skip&&B===my&&!(all&&ux.every(h=>UXB[h]||!UXB['p'+h])))await new Promise(r=>setTimeout(r,40));
    try{avSwap(document)}catch(e){}};
  /* au calme, quelques secondes après l'ouverture du jeu : les portraits de combat de tes équipes et les images
     de leurs ultimes sont préparés d'avance (une seule fois : ensuite ils restent dans le téléphone) */
  const nap=ms=>new Promise(r=>setTimeout(r,ms));
  const quiet=()=>{const sb=window.RDEscrollDefer;return!document.getElementById('battle')&&!(sb&&performance.now()-sb.t<900)&&!document.hidden};
  const calm=async()=>{for(let i=0;i<240&&!quiet();i++)await nap(500);
    if(window.requestIdleCallback)await new Promise(r=>requestIdleCallback(r,{timeout:2000}));else await nap(60);
    return quiet()};
  const warm=async()=>{try{await IMG.ready}catch(e){}
    const ids=new Set();try{for(const t of (S.teams||[]))for(const i of ((t&&t.ids)||[]))ids.add(i)}catch(e){}try{for(const i of (S.team||[]))ids.add(i)}catch(e){}
    for(const id of ids){
      try{if(!HEROES[id]||!S.heroes||!S.heroes[id])continue;if(!await calm())return;
        const un=heroUnit(id,0),d=document.createElement('div');d.innerHTML=un.port;const sv=d.firstElementChild;
        if(sv){const h=sv.outerHTML,k=h.length<1500?null:avKey(h);
          if(k&&!AVR.c.has(k)&&!AVR.busy.has(k)){avRaster(h);const p=AVR.busy.get(k);if(p)await p;await nap(150)}}
        if(un.ux&&typeof uxPrep==='function'&&typeof UXB!=='undefined'&&!UXB[id]&&!UXB['p'+id]){if(!await calm())return;uxPrep(id);
          for(let i=0;i<60&&!UXB[id];i++)await nap(50);await nap(150)}
      }catch(e){}}};
  setTimeout(()=>{warm().catch(()=>{})},4500);
  if(typeof act==='function'){const a0=act;act=async function(u){
    const my=typeof B!=='undefined'?B:null;
    if(my&&!my.prep){my.prep=1;if(!my.skip){try{await prep(my)}catch(e){}if(B!==my||my.done)return}}
    return a0.apply(this,arguments)}}
}}catch(e){console.warn('v456 av',e)}

/* ---------- styles ---------- */
try{const st=document.createElement('style');st.id='v456css';st.textContent=`
#battle .flay{position:absolute;left:0;top:0;width:0;height:0;overflow:visible;z-index:8;pointer-events:none}
#battle .flw{position:absolute;left:0;top:0;white-space:nowrap;pointer-events:none;line-height:1.05;transform-origin:50% 100%;transition:transform .2s cubic-bezier(.2,.8,.3,1),opacity .18s linear}
#battle .flw.out{opacity:0!important}
#battle .flw>.fl{position:relative;left:auto;top:auto;display:block;transform:none;transform-origin:50% 100%;z-index:auto;animation:flv 1.1s cubic-bezier(.2,.9,.3,1) forwards}
@keyframes flv{0%{opacity:0;transform:translateY(5px) scale(.45)}12%{opacity:1;transform:translateY(-2px) scale(1.2)}24%{transform:none}80%{opacity:1;transform:translateY(-4px)}100%{opacity:0;transform:translateY(-11px) scale(.96)}}
#battle .flay .fl{font-size:18px}
#battle .flay .fl.sk{font-size:24px}
#battle .flay .fl.crit{font-size:25px}
#battle .flay .fl.crit.sk{font-size:30px}
#battle .flay .fl.heal{font-size:20px}
#battle .flay .fl.dot{font-size:15px}
#battle .flw.inf>.fl{font-size:12px;line-height:1.2;padding:2px 8px 3px;border-radius:999px;background:rgba(12,9,30,.84);box-shadow:0 0 0 1px rgba(255,255,255,.16),0 3px 8px rgba(0,0,0,.45);text-shadow:none!important;animation:flinf 1.2s ease-out forwards}
@keyframes flinf{0%{opacity:0;transform:scale(.55)}14%{opacity:1;transform:scale(1.08)}26%{transform:none}82%{opacity:1;transform:none}100%{opacity:0;transform:translateY(-5px)}}
.fl small.flc{font-size:.48em;letter-spacing:.05em;vertical-align:.62em;margin-right:3px;line-height:1}
@media (prefers-reduced-motion:reduce){#battle .flw{transition:none}}`;document.head.appendChild(st)}catch(e){}

/* ---------- notes de version ---------- */
try{const it=[
  "💥 Les <b>chiffres de dégâts</b> ne s'entassent plus au-dessus des cartes : chaque carte a sa petite pile (le plus récent en bas, 3 au plus), et ils restent dans l'écran même pendant les secousses et les zooms.",
  "🏷️ Les mots comme <b>Riposte</b>, <b>Étourdi</b> ou <b>Bouclier</b> ont leur place à eux, en bas de la carte, au lieu de passer sur les chiffres.",
  "⚡ Début de combat plus fluide : les portraits que ton téléphone n'a encore jamais vus sont « photographiés » juste avant la première attaque, au lieu de pendant les animations (c'est ce qui faisait saccader l'ultime).",
  "💀 Le coup fatal reste bien visible : son chiffre ne s'assombrit plus avec la carte vaincue."];
 PATCH.unshift({v:80,d:'26 novembre 2026',t:'Des combats plus lisibles',items:it});
 const E=[
  "💥 The <b>damage numbers</b> no longer pile up above the cards: each card has its own small stack (newest at the bottom, 3 at most), and they stay on screen even during shakes and zooms.",
  "🏷️ Words like <b>Riposte</b>, <b>Stunned</b> or <b>Shield</b> have their own spot at the bottom of the card instead of covering the numbers.",
  "⚡ Smoother battle start: portraits your phone has never seen before are now “photographed” just before the first attack, instead of during the animations (that is what made the ultimate stutter).",
  "💀 The finishing blow stays visible: its number no longer fades with the defeated card."];
 const sp=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));
 const put=(fr,en)=>{const f=sp(fr),g=sp(en);if(f.length!==g.length)return;f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})};
 it.forEach((x,i)=>{I18N_EN[x]=E[i];put(x,E[i])});
 if(!('Des combats plus lisibles' in I18N_EN))I18N_EN['Des combats plus lisibles']='Easier-to-read battles'}catch(e){}
}catch(e){console.warn('v456',e)}})();
