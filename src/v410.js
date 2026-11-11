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
 const X1=[.38,.52,.7,1.3][u],X2=[.76,.88,1.04,1.7][u],full=u>=3;
 let s=`<defs>
  <linearGradient id="${q}b" x1="0" y1="0" x2=".3" y2="1"><stop offset="0" stop-color="#a49cb6"/><stop offset=".5" stop-color="${GR}"/><stop offset="1" stop-color="${GR2}"/></linearGradient>
  <linearGradient id="${q}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e3e78"/><stop offset="1" stop-color="${IND2}"/></linearGradient>
  <linearGradient id="${q}k" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="${CRM2}"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${full?'#ffe9a0':'#cfc6e8'}" stop-opacity=".5"/><stop offset="1" stop-color="${full?'#ffd84a':'#9a8ad8'}" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}e"><stop offset="0" stop-color="#fff6d0"/><stop offset=".45" stop-color="${AMB}"/><stop offset="1" stop-color="#b06a10"/></radialGradient>
  <linearGradient id="${q}m" x1="0" y1="0" x2="1" y2="0"><stop offset="${X1}" stop-color="#fff"/><stop offset="${X2}" stop-color="#fff" stop-opacity="0"/></linearGradient>
  <mask id="${q}k2"><rect x="-10" y="-20" width="190" height="280" fill="url(#${q}m)"/></mask></defs>`;
 s+=`<ellipse cx="80" cy="108" rx="78" ry="104" fill="url(#${q}g)"/>`;
 s+=LT.slice(0,o.bust?4:6).map((c,i)=>`<text font-family="Georgia,serif" font-style="italic" font-size="${10+(i%3)*4}" fill="${full?'#ffe9a0':'#cfc6e8'}" opacity=".7">${c}<animateMotion dur="${11+i*2.2}s" begin="${-i*1.9}s" repeatCount="indefinite" path="M${106+i*3} ${176-i*20}q${16+i*4} -${26+i*6} ${34+i*6} -${54+i*8}"/>${A('opacity','0;.85;0',11+i*2.2,-i*1.9)}</text>`).join('');
 const BOD='M80 92Q114 98 120 142Q126 186 104 202Q80 210 56 202Q34 186 40 142Q46 98 80 92Z';
 const HD='M80 20Q120 25 120 63Q120 97 80 101Q40 97 40 63Q40 25 80 20Z';
 if(!full)s+=`<g opacity=".5"><path d="${BOD}" fill="none" stroke="#cfc6e8" stroke-width="1.3" stroke-dasharray="3 5"/><g transform="rotate(-6 80 62)"><path d="${HD}" fill="none" stroke="#cfc6e8" stroke-width="1.3" stroke-dasharray="3 5"/></g></g>`;
 let g='';
 if(!o.bust)g+=`<ellipse cx="80" cy="214" rx="34" ry="6" fill="#000" opacity=".4"/>`;
 /* la cape, derrière */
 g+=`<path d="M52 94Q80 81 108 94L128 198Q80 211 32 198Z" fill="url(#${q}c)" ${O}/>`;
 g+=`<path d="M32 198q24 9 48 9t48-9l0 5${[...Array(9)].map(()=>'l-4.4 -3l-4.4 3').join('')}Z" fill="${IND2}"/>`;
 /* les pattes */
 g+=`<path d="M70 192V202M90 192V202" stroke="#c8a24a" stroke-width="5" stroke-linecap="round"/>`;
 g+=[70,90].map(x=>`<path d="M${x-7} 206q7-5 7 0q0-5 7 0q-4 4.4-7 4.4t-7-4.4Z" fill="#e8c060" ${O}/>`).join('');
 /* l'aile droite, repliée, à moitié effacée — elle tient le grimoire */
 g+=`<path d="M114 110Q130 144 122 180Q113 192 102 185Q115 150 104 114Z" fill="${GR2}" ${O}/>`;
 g+=[0,1,2].map(i=>`<path d="M${(118+i).toFixed(0)} ${(130+i*18)}q-10 6-15 0" stroke="#7a7490" stroke-width="1.3" fill="none"/>`).join('');
 g+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="5s" repeatCount="indefinite"/>
   <g transform="translate(128 158) rotate(9)"><ellipse rx="22" ry="13" fill="url(#${q}g)"/>
   <path d="M-17 -2Q-8.5 -8 0 -3Q8.5 -8 17 -2L15 11Q7.5 6 0 11Q-7.5 6-15 11Z" fill="url(#${q}k)" ${O}/><path d="M0 -3V11" stroke="#a89878" stroke-width="1"/>
   ${wr(-13.5,1,10,3,.8,'#6a5a8a')}${wr(3,.5,10,3,.8,'#6a5a8a')}</g></g>`;
 /* le corps, un peu voûté */
 g+=`<path d="${BOD}" fill="url(#${q}b)" ${O}/>`;
 /* le plastron, en écailles de plumes */
 g+=`<path d="M80 108Q104 116 106 150Q108 182 92 194Q80 198 68 194Q52 182 54 150Q56 116 80 108Z" fill="url(#${q}k)" ${O}/>`;
 g+=[0,1,2,3].map(i=>{const y=126+i*17,w=22-i*1.5;let d='';for(let k=-2;k<=1;k++)d+=`M${(80+k*w/2).toFixed(1)} ${y}q${(w/4).toFixed(1)} 7 ${(w/2).toFixed(1)} 0`;
   return`<path d="${d}" stroke="#c6b9a2" stroke-width="1.2" fill="none" opacity=".8"/>`}).join('');
 /* l'écharpe de savant, en travers */
 g+=`<path d="M58 100Q72 114 67 136L60 178L46 174L54 134Q58 116 48 104Z" fill="url(#${q}k)" ${O}/>`;
 g+=`<path d="M46 174l14 4l-1 7l-5-3l-4 4l-4-4l-3 3Z" fill="${CRM2}" ${O}/>`;
 g+=wr(49,124,13,6,.55,'#9a8e78');
 /* l'aile gauche levée : il brandit la plume brisée du Scribe */
 g+=`<path d="M52 118Q30 110 21 86Q17 73 27 68L44 78Q36 92 52 102Z" fill="${GR2}" ${O}/>`;
 g+=[0,1,2].map(i=>`<path d="M${(33-i*2.4).toFixed(0)} ${(98-i*8)}q8-8 15-5" stroke="#7a7490" stroke-width="1.3" fill="none"/>`).join('');
 g+=`<path d="M22 82q-5-4-3-9M27 76q-5-5-2-10" stroke="${GR2}" stroke-width="3.4" fill="none" stroke-linecap="round"/>`;
 g+=`<g transform="translate(25 71) rotate(-24)"><g><animateTransform attributeName="transform" type="rotate" values="-5;6;-5" dur="4.4s" repeatCount="indefinite"/>
   <path d="M1 4L2 -3L-1 -10" stroke="#141026" stroke-width="2.4" fill="none"/>
   <path d="M-1 -10Q-13 -38 -7 -68Q9 -50 11 -28Q11 -16 -1 -10Z" fill="url(#${q}k)" ${O}/><path d="M-1 -10Q-5 -40 -7 -68" stroke="#b8ac96" stroke-width="1.1" fill="none"/>
   <path d="M-9 -44L5 -48M-8 -54L3 -58" stroke="#9a8e78" stroke-width=".9"/><path d="M-11 -40L7 -34" stroke="#141026" stroke-width="1.5" opacity=".85"/></g></g>`;
 /* la tête, penchée */
 g+=`<g transform="rotate(-6 80 62)">`;
 g+=`<path d="${HD}" fill="url(#${q}b)" ${O}/>`;
 g+=`<path d="M52 34L40 7L64 27ZM108 35L120 16L100 29Z" fill="url(#${q}b)" ${O}/>`;
 g+=`<circle cx="64" cy="60" r="19.5" fill="#a9a2b8" opacity=".9"/><circle cx="96" cy="60" r="19.5" fill="#a9a2b8" opacity=".9"/>`;
 g+=`<circle cx="64" cy="60" r="19.5" fill="none" stroke="${GR2}" stroke-width="1.1" opacity=".65"/><circle cx="96" cy="60" r="19.5" fill="none" stroke="${GR2}" stroke-width="1.1" opacity=".65"/>`;
 /* les sourcils : l'un levé, l'autre froncé — c'est là que tout se joue */
 g+=`<path d="M46 36q16-13 33-3" stroke="${CRM}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
 g+=`<path d="M113 44q-14-10-30-4" stroke="${CRM}" stroke-width="4.6" fill="none" stroke-linecap="round"/>`;
 /* les yeux */
 g+=`<circle cx="64" cy="61" r="12" fill="url(#${q}e)" ${O}/><circle cx="96" cy="61" r="12" fill="url(#${q}e)" ${O}/>`;
 g+=`<circle cx="64" cy="61" r="5.6" fill="#140e22"/><circle cx="96" cy="62" r="5" fill="#140e22"/>`;
 g+=`<circle cx="61.2" cy="58" r="2.2" fill="#fff"/><circle cx="93.4" cy="59.4" r="1.8" fill="#fff"/>`;
 /* l'œil droit à moitié fermé : le vieux hibou fatigué */
 g+=`<path d="M84 61q12-9 24-2q-2-6-12-6t-12 8Z" fill="url(#${q}b)" ${O}/>`;
 g+=`<circle cx="64" cy="61" r="14" fill="url(#${q}g)">${A('r','11;16;11',3.2)}</circle>`;
 /* les lunettes rondes de savant : à droite, le verre a été effacé */
 g+=`<circle cx="64" cy="61" r="15.6" fill="rgba(230,240,255,.12)" stroke="${GOLD}" stroke-width="2.4"/>`;
 g+=`<circle cx="96" cy="61" r="15.6" fill="none" stroke="${GOLD}" stroke-width="2.4" stroke-dasharray="${full?'0':'7 5'}"/>`;
 g+=`<path d="M79.6 57.4q.4-3.6 1-.2" stroke="${GOLD}" stroke-width="2.2" fill="none"/><path d="M48.4 57L39 53M111.6 57L121 53" stroke="${GOLD}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
 g+=`<path d="M54 54q8-5 16-2" stroke="#fff" stroke-width="1.6" opacity=".55" fill="none"/>`;
 /* le bec */
 g+=`<path d="M80 66L88.5 83Q80 91 71.5 83Z" fill="#e8c060" ${O}/><path d="M80 70V86" stroke="#b8902a" stroke-width=".9"/>`;
 g+=`</g>`;
 s+=`<g mask="url(#${q}k2)">${g}</g>`;
 if(u>=1&&!full)s+=`<g opacity="${.3+u*.2}"><path d="M114 100q10 18 8 44M120 152q2 24-6 40M106 62q12 4 14 12" stroke="${GOLD}" stroke-width="1.5" fill="none" stroke-dasharray="4 6">${A('stroke-dashoffset','0;-40',2.6)}</path></g>`;
 if(full)s+=`<g opacity=".5"><path d="${BOD}" fill="none" stroke="${GOLD}" stroke-width="1.6" stroke-dasharray="5 7">${A('stroke-dashoffset','0;-48',3.4)}</path></g>`;
 if(u>=1)s+=`<g transform="translate(80 176)">`+[...Array(u+1)].map((_,i)=>`<g><animateTransform attributeName="transform" type="rotate" from="${i*(360/(u+1))}" to="${i*(360/(u+1))+360}" dur="${9+i}s" repeatCount="indefinite"/>
   <g transform="translate(56 0)"><g><path d="M-8 -11h16v22h-16Z" fill="${full?'#fff6dc':'#efe8da'}" stroke="#8a8070" stroke-width="1"/><path d="M-4.5 -5h9M-4.5 0h9M-4.5 5h6" stroke="#a89c86" stroke-width=".8"/>
   <animateTransform attributeName="transform" type="rotate" values="-16;14;-16" dur="${3.4+i*.7}s" repeatCount="indefinite"/></g></g></g>`).join('')+`</g>`;
 return s}
function crvBody(u){const k='b'+(u|0);if(CC[k])return CC[k];
 return CC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corvin, la Page Blanche en pied">${crvArt('cb'+(u|0)+'_',u)}</svg>`}
function crvPortrait(u){const k='p'+(u|0);if(CC[k])return CC[k];const q='cp'+(u|0)+'_';
 const bg=`<radialGradient id="${q}bg" cx="50%" cy="36%" r="76%"><stop offset="0" stop-color="#efe8da"/><stop offset=".2" stop-color="#9a93b8"/><stop offset=".55" stop-color="#3a3568"/><stop offset="1" stop-color="#0e0b20"/></radialGradient>`;
 return CC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Corvin, la Page Blanche"><defs>${bg}</defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-26 1) scale(.92)">${crvArt(q,u,{bust:1})}</g></svg>`}
window.crvBody=crvBody;window.crvPortrait=crvPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===CRV)return crvPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===CRV)return crvBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='corvinp')return`<div class="sgfig lore">${crvBody(0)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('corvin art',e)}})();
