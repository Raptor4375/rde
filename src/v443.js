/* ================= V443 : « NUIT D'ÉTHER », PARTOUT =================
   Le style des quartiers étendu à tout le jeu :
   · titres de page en ivoire cerclé de nuit (ombres de texte, plus de filtre : moins de travail à chaque image) ;
   · titres de section : une petite pierre taillée sertie d'or au lieu du trait ;
   · quêtes : un médaillon par type de quête, récompense en écrin turquoise ;
   · combat : halo de rayons derrière la victoire, en-tête et pièce « VS » dorés ;
   · navigation : socle doré sous l'onglet actif.
   Et deux défauts d'affichage corrigés : la promo de la boutique d'apparences et l'en-tête du Marché
   (des portraits devenus images prenaient toute la largeur et cachaient le texte). */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;

/* ---------- 1. portraits devenus images (v436) : ils retrouvent la taille prévue pour leur dessin ----------
   Une règle « .x svg {width:40px} » ne s'appliquait plus à l'image qui remplace le dessin. On la recopie pour l'image. */
function lptSizes(){try{const out=[];const keep=['width','height','max-width','max-height','min-width','flex','aspect-ratio','margin-left','border-radius','border'];
  const take=(r,wrap)=>{const s=r.selectorText;if(!s)return;const parts=s.split(',').map(p=>p.trim()).filter(p=>/(^|[\s>+~])svg$/.test(p)&&!/^svg$/.test(p));if(!parts.length)return;
    const st=r.style;const decl=keep.filter(p=>st.getPropertyValue(p)).map(p=>`${p}:${st.getPropertyValue(p)}${st.getPropertyPriority(p)?'!important':''}`);
    if(!decl.length)return;const w=st.getPropertyValue('width'),h=st.getPropertyValue('height');if(w==='100%'&&h==='100%'&&decl.length===2)return;
    const sel=parts.map(p=>p.replace(/svg$/,'img.lpt')).join(',');out.push(wrap?`${wrap}{${sel}{${decl.join(';')}}}`:`${sel}{${decl.join(';')}}`)};
  for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}
    for(const r of rs){if(r.selectorText)take(r,'');else if(r.media&&r.cssRules)for(const q of r.cssRules)take(q,'@media '+r.media.mediaText)}}
  const el=document.getElementById('v443lpt')||document.head.appendChild(Object.assign(document.createElement('style'),{id:'v443lpt'}));el.textContent=out.join('\n')}catch(e){}}

/* ---------- 2. titres de page : on liste les cartes qui ont leur propre titre (bannières, résultats…) pour ne pas y toucher ---------- */
function ownTitles(){const ctx=new Set(['.ffban','.result','.banner','.wbanner','.hwtx','.pban','.rban','.anntx','.cban','.urev','.tban','.avbtx','.alban','.evh']);
  try{for(const sh of document.styleSheets){let rs;try{rs=sh.cssRules}catch(e){continue}const walk=rs=>{for(const r of rs){if(r.cssRules&&!r.selectorText){walk(r.cssRules);continue}
    const s=r.selectorText||'';for(const p of s.split(',')){const m=/^(\.[\w-]+)(?:[.:][\w-]+)*\s+(?:>\s*)?\.h$/.exec(p.trim());if(m)ctx.add(m[1])}}};walk(rs)}}catch(e){}
  return [...ctx].join(',')}

const QI={win:['⚔️','#ff6178'],pull:['✨','#b48cff'],lvl:['⭐','#ffd257'],up:['🔨','#ffa24a'],fuse:['⚗️','#6fe8ff'],boss:['🐉','#4fe3a1'],guild:['🏰','#73a0ff']};
const QCSS=Object.entries(QI).map(([k,[ic,c]])=>`#main .card.q:has([data-v="${k}"]){--jw:${c}}#main .card.q:has([data-v="${k}"])::before{content:'${ic}'}`).join('\n')
 +`\n#main .card.q:has([data-a="bonus"]){--jw:#ffd257}#main .card.q:has([data-a="bonus"])::before{content:'🎁'}`;

const css=()=>`
/* ---------- titres de section : pierre taillée ---------- */
.h3{padding-left:20px!important}
.h3::before{width:9px!important;height:9px!important;top:calc(.6em - 4.5px)!important;bottom:auto!important;left:3px!important;border-radius:2px!important;transform:rotate(45deg);
 background:linear-gradient(135deg,#fff7d2 0%,var(--h3g,#ffd257) 46%,#9a5c14 100%)!important;box-shadow:0 0 0 1.5px rgba(20,12,48,.9),0 0 9px rgba(255,210,87,.5)!important}
.card.hccard2{--h3g:#ffd257}.card.gvcard{--h3g:#8fe9ff}.card.sgcard{--h3g:#c9a2ff}

/* ---------- titres de page : ivoire cerclé de nuit ---------- */
:is(#main,#ovl) .h:not(:is(${ownTitles()}) .h){color:#fff6e4;background:none!important;filter:none!important;
 text-shadow:0 2px 0 rgba(22,10,48,.95),0 0 1.5px rgba(22,10,48,.95),0 0 18px rgba(255,205,120,.16)!important}

/* ---------- quêtes : médaillon par type, récompense en écrin ---------- */
#main .card.q{position:relative;padding-left:66px!important;min-height:76px}
#main .card.q::before{position:absolute;left:12px;top:50%;width:42px;height:42px;margin-top:-21px;border-radius:50%;display:grid;place-items:center;font-size:21px;line-height:1;
 background:radial-gradient(circle at 50% 30%,#8a74d8,#2a1d63 72%);
 box-shadow:0 0 0 2px #e6b64a,0 0 0 3.5px rgba(20,12,48,.95),0 0 0 4.5px rgba(255,230,160,.3),0 6px 12px -5px #000,inset 0 2px 0 rgba(255,255,255,.3),inset 0 -6px 10px rgba(0,0,0,.35)}
#main .card.q .r{display:inline-flex;align-items:center;gap:3px;padding:2px 9px 2px 6px;border-radius:99px;font-weight:900;color:#b8fff2;
 background:linear-gradient(180deg,rgba(88,228,211,.18),rgba(88,228,211,.06));border:1px solid rgba(88,228,211,.4);box-shadow:inset 0 1px 0 rgba(255,255,255,.12)}
#main .card.q .bar>i{background:linear-gradient(90deg,#ffe58a,#f4b73a)!important}
#main .card.q:has(.btn:disabled):has(.bar>i[style*="width:100%"]){opacity:.62}
${QCSS}
@supports (color:color-mix(in srgb,red,blue)){
 #main .card.q::before{background:radial-gradient(circle at 50% 30%,color-mix(in srgb,var(--jw,#b48cff) 78%,#fff),color-mix(in srgb,var(--jw,#b48cff) 55%,#1a0f3a) 58%,color-mix(in srgb,var(--jw,#b48cff) 22%,#120a2c) 100%)}
}

/* ---------- combat ---------- */
#battle .bh .t{color:#ffe9b0!important;text-shadow:0 2px 0 rgba(22,10,48,.95),0 0 1.5px rgba(22,10,48,.95)!important}
#battle .vs::after{border-radius:99px!important;box-shadow:0 0 0 2px rgba(20,12,48,.9),0 0 0 3px rgba(255,230,160,.5),0 0 16px rgba(255,190,60,.55),inset 0 1px 0 rgba(255,255,255,.6)!important}
#battle .result:not(.rlose)::before{content:'';position:absolute;left:50%;top:44%;width:900px;height:900px;margin:-450px 0 0 -450px;pointer-events:none;
 background:repeating-conic-gradient(from 0deg,rgba(255,216,74,0) 0deg 8deg,rgba(255,216,74,.13) 8deg 12deg);
 -webkit-mask-image:radial-gradient(closest-side,#000 10%,rgba(0,0,0,.5) 40%,transparent 68%);mask-image:radial-gradient(closest-side,#000 10%,rgba(0,0,0,.5) 40%,transparent 68%);
 animation:nxrays 70s linear infinite}
@media (prefers-reduced-motion:reduce){#battle .result::before{animation:none}}

/* ---------- navigation : socle doré sous l'onglet actif ---------- */
nav.tabs{box-shadow:inset 0 1px 0 rgba(255,214,110,.22),0 -8px 22px -12px rgba(0,0,0,.8)}
nav.tabs .tab.on::after{border-color:rgba(255,216,74,.6)!important;
 background:radial-gradient(110% 90% at 50% 0%,rgba(255,216,74,.34),rgba(138,90,255,.2) 62%,rgba(30,20,70,.4))!important;
 box-shadow:0 0 18px -5px rgba(255,216,74,.75),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 rgba(255,216,74,.45)!important}
`;
const st=document.createElement('style');st.id='v443css';document.head.appendChild(st);
const apply=()=>{try{st.textContent=css();lptSizes()}catch(e){console.warn('v443 css',e)}};
apply();
/* les autres modules ajoutent encore quelques règles juste après le chargement : on refait la liste une fois */
setTimeout(apply,1500);

/* ---------- notes de version ---------- */
try{const it=[
 "🌙 <b>« Nuit d'Éther » partout</b> : titres de page en ivoire cerclé de nuit, titres de section marqués d'une petite pierre taillée sertie d'or, socle doré sous l'onglet actif.",
 "📜 Quêtes : chaque quête a son médaillon (épées pour les combats, étincelles pour les invocations, marteau pour l'équipement…) et sa récompense dans un écrin turquoise.",
 "⚔️ Combat : un halo de rayons dorés derrière la victoire, l'en-tête et la pièce « VS » en or.",
 "🛠️ Corrigé : la promo de la boutique d'apparences et l'en-tête du Marché affichaient un portrait géant qui cachait le texte."];
 PATCH.unshift({v:'v69',d:Date.now(),t:"« Nuit d'Éther » partout",items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN["« Nuit d'Éther » partout"]='“Aether Night” everywhere';
  I18N_EN[it[0]]="🌙 <b>“Aether Night” everywhere</b>: page titles in ivory ringed with night, section titles marked with a small gold-set cut gem, a gold base under the active tab.";
  I18N_EN[it[1]]="📜 Quests: each quest has its own medallion (swords for battles, sparkles for summons, hammer for gear…) and its reward in a turquoise case.";
  I18N_EN[it[2]]="⚔️ Battle: a halo of golden rays behind victory, gold header and “VS” coin.";
  I18N_EN[it[3]]="🛠️ Fixed: the skin shop promo and the Market header showed a giant portrait that hid the text."}}catch(e){}
}catch(e){console.warn('v443',e)}})();
