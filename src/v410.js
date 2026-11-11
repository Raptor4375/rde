/* ================= V410 : CORVIN, LA PAGE BLANCHE — héros MYTHIQUE =================
   Le vieux hibou gris du Livre IV, celui qui a donné sa page pour rendre à Plume ses souvenirs.
   Le royaume l'a oublié : seul le Porteur se souvient de lui, alors seul le Porteur peut l'invoquer,
   une fois le Livre IV terminé. La moitié de son corps est encore effacée : elle se réécrit à mesure
   qu'il s'ultra-évolue. */
const CRV=72;
(function(){try{
if(HEROES[CRV]||HEROES.length!==CRV)return;
HEROES.push({i:CRV,n:'Corvin, la Page Blanche',c:'Soutien',r:5,
  exd:"Termine le Livre IV du mode histoire : tu seras le seul à te souvenir de lui, et le seul à pouvoir l'invoquer.",
  sk:{n:'La Dernière Page',tg:'team',fx:{healall:150,shield:190,cleanse:1,energy:35,revive:1}}});
/* il n'entre dans les invocations qu'une fois le Livre IV terminé */
const b4=()=>{try{return!!(S.sg4&&S.sg4.d&&S.sg4.d[5])}catch(e){return false}};
try{Object.defineProperty(HEROES[CRV],'ex',{configurable:true,get(){return(b4()||(S.heroes&&S.heroes[CRV]))?0:1}})}catch(e){HEROES[CRV].ex=1}
try{LOOKS[CRV]=['#8a8496','#3a3450','#d8d2e4','#2a2a52','#ffc24a','#6a6480','bg:void back:cape hair:short eyes:glow mouth:neutral body:slim ear:human']}catch(e){}
}catch(e){console.warn('corvin hero',e)}})();

/* ---------- le dessin ---------- */
(function(){try{
if(!HEROES[CRV])return;
const CC={},O='stroke="#141026" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"',
 GR='#8a8496',GR2='#5e586e',CRM='#efe8da',CRM2='#d8cfbe',IND='#2a2a52',IND2='#16163a',AMB='#ffc24a',GOLD='#ffd84a';
const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
const LT=['e','s','o','r','a','n','i','m'];
const wr=(x,y,w,n,op,col)=>{let s='';for(let i=0;i<n;i++){const yy=(y+i*5.2).toFixed(1),ww=w*(.6+((i*53)%11)/14);
  s+=`<path d="M${x} ${yy}q${(ww/4).toFixed(1)} -1.5 ${(ww/2).toFixed(1)} 0t${(ww/2).toFixed(1)} 0" stroke="${col||'#a89c86'}" stroke-width=".8" fill="none" opacity="${op||.4}"/>`}return s};
const BODY='M80 84Q120 92 126 140Q132 186 108 204Q80 212 52 204Q28 186 34 140Q40 92 80 84Z';
const HEAD='M80 16Q123 21 123 61Q123 97 80 101Q37 97 37 61Q37 21 80 16Z';
function crvArt(q,u,o){u=Math.max(0,Math.min(3,u|0));o=o||{};
 const X1=[.36,.5,.68,1.3][u],X2=[.74,.86,1.02,1.7][u],full=u>=3;
 let s=`<defs>
  <linearGradient id="${q}b" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#9a93a8"/><stop offset=".55" stop-color="${GR}"/><stop offset="1" stop-color="${GR2}"/></linearGradient>
  <linearGradient id="${q}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a3a6e"/><stop offset="1" stop-color="${IND2}"/></linearGradient>
  <linearGradient id="${q}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="${CRM2}"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${full?'#ffe9a0':'#cfc6e8'}" stop-opacity=".5"/><stop offset="1" stop-color="${full?'#ffd84a':'#9a8ad8'}" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}e"><stop offset="0" stop-color="#fff6d0"/><stop offset=".45" stop-color="${AMB}"/><stop offset="1" stop-color="#b06a10"/></radialGradient>
  <linearGradient id="${q}m" x1="0" y1="0" x2="1" y2="0"><stop offset="${X1}" stop-color="#fff"/><stop offset="${X2}" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${q}k2"><rect x="-10" y="-20" width="190" height="280" fill="url(#${q}m)"/></mask></defs>`;
 s+=`<ellipse cx="80" cy="104" rx="78" ry="104" fill="url(#${q}g)"/>`;
 /* les lettres qui se sont envolées de lui */
 s+=LT.slice(0,o.bust?4:6).map((c,i)=>`<text font-family="Georgia,serif" font-style="italic" font-size="${10+(i%3)*4}" fill="${full?'#ffe9a0':'#cfc6e8'}" opacity=".7">${c}<animateMotion dur="${11+i*2.2}s" begin="${-i*1.9}s" repeatCount="indefinite" path="M${104+i*3} ${172-i*20}q${16+i*4} -${26+i*6} ${34+i*6} -${54+i*8}"/>${A('opacity','0;.85;0',11+i*2.2,-i*1.9)}</text>`).join('');
 /* le contour effacé, en pointillés */
 if(!full)s+=`<g opacity=".5"><path d="${BODY}" fill="none" stroke="#cfc6e8" stroke-width="1.3" stroke-dasharray="3 5"/><path d="${HEAD}" fill="none" stroke="#cfc6e8" stroke-width="1.3" stroke-dasharray="3 5"/></g>`;
 let g='';
 if(!o.bust)g+=`<ellipse cx="80" cy="214" rx="36" ry="6" fill="#000" opacity=".4"/>`;
 /* les pattes */
 /* la cape du vieux savant */
 g+=`<path d="M54 88Q80 76 106 88L128 196Q80 208 32 196Z" fill="url(#${q}c)" ${O}/>`;
 g+=`<path d="M32 196q24 8 48 8t48-8l-1 6q-5 7-9 .6t-8 3.4-8-3.4-8 4-8-4-8 3.4-8-3.4-9-.6Z" fill="${IND2}"/>`;
 g+=wr(34,130,22,7,.32,'#8a84c0')+wr(108,152,18,5,.28,'#8a84c0');
 g+=`<path d="M68 190V202M92 190V202" stroke="#c8a24a" stroke-width="5" stroke-linecap="round"/>`;
 g+=[68,92].map(x=>`<path d="M${x-7} 206q7-5 7 0q0-5 7 0q-4 4.4-7 4.4t-7-4.4Z" fill="#e8c060" ${O}/>`).join('');
 /* le corps */
 g+=`<path d="${BODY}" fill="url(#${q}b)" ${O}/>`;
 g+=`<path d="M80 102Q106 112 108 152Q110 184 92 196Q80 200 68 196Q50 184 52 152Q54 112 80 102Z" fill="url(#${q}k)" ${O}/>`;
 g+=wr(60,124,40,9,.4);
 /* les ailes repliées */
 g+=`<path d="M44 106Q26 144 36 184Q46 196 58 188Q44 150 56 110Z" fill="${GR2}" ${O}/>`;
 g+=`<path d="M116 106Q134 144 124 184Q114 196 102 188Q116 150 104 110Z" fill="${GR2}" ${O}/>`;
 g+=[0,1,2,3].map(i=>`<path d="M${(42-i*1.2).toFixed(1)} ${(124+i*17)}q10 6 15 0" stroke="#7a7490" stroke-width="1.3" fill="none"/><path d="M${(118+i*1.2).toFixed(1)} ${(124+i*17)}q-10 6-15 0" stroke="#7a7490" stroke-width="1.3" fill="none"/>`).join('');
 /* le mantelet du vieux savant, par-dessus les épaules */
 g+=`<path d="M44 98Q80 80 116 98L120 130Q80 118 40 130Z" fill="url(#${q}c)" ${O}/>`;
 g+=`<path d="M40 130q40 12 80 0l0 3.4${[...Array(10)].map(()=>'l-4 -2.6l-4 2.6').join('')}Z" fill="${IND2}"/>`;
 g+=`<path d="M66 90Q80 85 94 90L92 97Q80 93 68 97Z" fill="${CRM}" opacity=".9"/>`;
 /* la plume brisée du Scribe, qu'il a gardée */
 g+=`<path d="M44 178q-8 5-5 11t12 3" stroke="${GR2}" stroke-width="5.4" fill="none" stroke-linecap="round"/>`;
 g+=`<g transform="translate(47 192) rotate(-30)"><path d="M0 4L1 -2L-2 -8" stroke="#141026" stroke-width="2.2" fill="none"/>
   <path d="M-2 -8Q-13 -34 -7 -62Q8 -46 10 -26Q10 -14 -2 -8Z" fill="url(#${q}k)" ${O}/><path d="M-2 -8Q-5 -36 -7 -62" stroke="#b8ac96" stroke-width="1" fill="none"/>
   <path d="M-9 -40L4 -44M-8 -50L2 -54" stroke="#9a8e78" stroke-width=".9"/><path d="M-10 -36L6 -31" stroke="#141026" stroke-width="1.4" opacity=".8"/></g>`;
 /* la tête */
 g+=`<path d="${HEAD}" fill="url(#${q}b)" ${O}/>`;
 g+=`<path d="M50 30L43 8L60 23ZM110 30L117 8L100 23Z" fill="url(#${q}b)" ${O}/>`;
 /* le disque facial */
 g+=`<circle cx="63" cy="58" r="20" fill="#a39cb2" opacity=".85"/><circle cx="97" cy="58" r="20" fill="#a39cb2" opacity=".85"/>`;
 g+=`<circle cx="63" cy="58" r="20" fill="none" stroke="${GR2}" stroke-width="1.1" opacity=".7"/><circle cx="97" cy="58" r="20" fill="none" stroke="${GR2}" stroke-width="1.1" opacity=".7"/>`;
 /* les sourcils blancs du vieux hibou */
 g+=`<path d="M46 40q16-11 32-2M114 40q-16-11-32-2" stroke="${CRM}" stroke-width="4.4" fill="none" stroke-linecap="round"/>`;
 /* les yeux */
 g+=`<circle cx="63" cy="59" r="12" fill="url(#${q}e)" ${O}/><circle cx="97" cy="59" r="12" fill="url(#${q}e)" ${O}/>`;
 g+=`<circle cx="63" cy="59" r="5.6" fill="#140e22"/><circle cx="97" cy="59" r="5.6" fill="#140e22"/>`;
 g+=`<circle cx="60.4" cy="56.2" r="2.1" fill="#fff"/><circle cx="94.4" cy="56.2" r="2.1" fill="#fff"/>`;
 g+=`<circle cx="63" cy="59" r="14" fill="url(#${q}g)">${A('r','11;16;11',3.2)}</circle><circle cx="97" cy="59" r="14" fill="url(#${q}g)">${A('r','11;16;11',3.2,-.6)}</circle>`;
 /* le bec */
 g+=`<path d="M80 62L88 77Q80 85 72 77Z" fill="#e8c060" ${O}/><path d="M80 66V80" stroke="#b8902a" stroke-width=".9"/>`;
 s+=`<g mask="url(#${q}k2)">${g}</g>`;
 /* la moitié effacée se réécrit à l'encre d'or */
 if(u>=1&&!full)s+=`<g opacity="${.3+u*.2}"><path d="M118 96q10 18 8 44M122 150q2 24-6 42M108 60q12 4 14 12" stroke="${GOLD}" stroke-width="1.5" fill="none" stroke-dasharray="4 6">${A('stroke-dashoffset','0;-40',2.6)}</path></g>`;
 if(full)s+=`<g opacity=".55"><path d="${BODY}" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="5 7">${A('stroke-dashoffset','0;-48',3.4)}</path></g>`;
 /* la page qui tourne autour de lui, à partir de l'ultra-évolution */
 if(u>=1)s+=`<g transform="translate(80 170)">`+[...Array(u+1)].map((_,i)=>`<g><animateTransform attributeName="transform" type="rotate" from="${i*(360/(u+1))}" to="${i*(360/(u+1))+360}" dur="${9+i}s" repeatCount="indefinite"/>
   <g transform="translate(54 0)"><g><path d="M-8 -11h16v22h-16Z" fill="${full?'#fff6dc':'#efe8da'}" stroke="#8a8070" stroke-width="1"/><path d="M-4.5 -5h9M-4.5 0h9M-4.5 5h6" stroke="#a89c86" stroke-width=".8"/>
   <animateTransform attributeName="transform" type="rotate" values="-16;14;-16" dur="${3.4+i*.7}s" repeatCount="indefinite"/></g></g></g>`).join('')+`</g>`;
 return s}
function crvBody(u){const k='b'+(u|0);if(CC[k])return CC[k];
 return CC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corvin, la Page Blanche en pied">${crvArt('cb'+(u|0)+'_',u)}</svg>`}
function crvPortrait(u){const k='p'+(u|0);if(CC[k])return CC[k];const q='cp'+(u|0)+'_';
 const bg=`<radialGradient id="${q}bg" cx="50%" cy="36%" r="76%"><stop offset="0" stop-color="#efe8da"/><stop offset=".2" stop-color="#9a93b8"/><stop offset=".55" stop-color="#3a3568"/><stop offset="1" stop-color="#0e0b20"/></radialGradient>`;
 return CC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corvin, la Page Blanche"><defs>${bg}</defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-28 -2) scale(.95)">${crvArt(q,u,{bust:1})}</g></svg>`}
window.crvBody=crvBody;window.crvPortrait=crvPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===CRV)return crvPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===CRV)return crvBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='corvinp')return`<div class="sgfig lore">${crvBody(0)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('corvin art',e)}})();
