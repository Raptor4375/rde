/* ================= V421 : ATELIER — le style maison, en commun =================
   Reprend exactement la technique des héros dessinés à la main du jeu (Aegis, Lyra, Sorën) :
   dégradés plutôt que contours noirs, traits fins dans la couleur de la matière, visage détaillé
   dans le repère du portrait (100×100) puis posé sur le corps (160×244) à l'échelle .84,
   fond radial, rayons, halo étoilé, particules, cadre légendaire, badges de classe et d'ultra. */
(function(){try{
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const MB=s=>s+`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
const star8=(cx,cy,R,r,rot=0)=>{let d='';for(let i=0;i<16;i++){const a=(i*22.5+rot-90)*Math.PI/180,k=i%2?r:R;d+=(i?'L':'M')+r1(cx+k*Math.cos(a))+' '+r1(cy+k*Math.sin(a))}return d+'Z'};
const rays=(cx,cy,n,len,op,col)=>{let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+16)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,col,`opacity="${op}"`)}return s};
const STARP=(x,y,r,c='#fff')=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,c,'opacity=".9"');
const ROMN=['','I','II','III'];
const lin=(id,a,b,c,v)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}"><stop offset="0" stop-color="${a}"/><stop offset=".5" stop-color="${b}"/><stop offset="1" stop-color="${c}"/></linearGradient>`;
const rad=(id,stops,cx='50%',cy='50%',r='50%')=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${stops.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('')}</radialGradient>`;
/* les cadres des légendaires et mythiques */
const frame=(c1,c2,c3)=>{const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17',c1,1,'opacity=".95"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4',c2,.5,'opacity=".85"')+P('M1.4 1.4h3.2v3.2z',c3||'#fff6c8','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')};
/* les badges du jeu, au pixel près */
const ICO=c=>({Tank:`<path d="M86 77L93 80Q93 88 86 92Q79 88 79 80Z" fill="${c}"/>`,
  Guerrier:`<path d="M86 75L88 86L86 88L84 86Z M81 86L91 86L91 87.6L81 87.6Z M85.2 88h1.6v4h-1.6z" fill="${c}"/>`,
  Assassin:`<path d="M81 91L90 76L91.5 78L83.5 92Z" fill="${c}"/>`,
  Mage:`<path d="M86 76L88 82L94 84L88 86L86 92L84 86L78 84L84 82Z" fill="${c}"/>`,
  Tireur:`<path d="M81 76Q94 84 81 92" fill="none" stroke="${c}" stroke-width="2"/><path d="M80 84H93" stroke="${c}" stroke-width="1.4"/>`,
  Soutien:`<path d="M84.5 77h3v5.5h5.5v3h-5.5v5.5h-3v-5.5h-5.5v-3h5.5z" fill="${c}"/>`});
const clsBadge=(cls,r,u,TC)=>{const rc=(typeof RCOL!=='undefined'&&(RCOL[r]||RCOL[Math.min(4,r)]))||'#ffd84a',cc=(typeof CLS!=='undefined'&&CLS[cls]&&CLS[cls].c)||'#ffffff';
  return`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?TC:rc}" stroke-width="${u?2.2:1.5}"/>${ICO(cc)[cls]||''}`};
const ultraBadge=(u,TC)=>u?`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="${TC}" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`:'';
/* l'œil maison : blanc, iris, iris intérieur, pupille, deux reflets, paupière, cils, paupière basse */
function eye(x,y,o){o=o||{};const d=x<50?1:-1,w=o.w||3.4,h=o.h||2.2,ix=r1(x+(o.look||.2)*d),iy=r1(y-.1);
  const top=o.narrow?h*.62:h;
  let s=P(`M${r1(x-w*d)} ${r1(y+.2)}Q${x} ${r1(y-top)} ${r1(x+w*d)} ${r1(y-.3)}Q${r1(x+.3*d)} ${r1(y+h*.9)} ${r1(x-w*d)} ${r1(y+.2)}Z`,o.white||'#f8f4ee');
  const ir=o.ir||1.6;
  s+=C_(ix,iy,ir,o.iris||'#4f74b0')+(o.iris2?C_(ix,r1(iy+.25),r1(ir*.62),o.iris2):'')+C_(ix,iy,r1(ir*.42),o.pupil||'#12182a');
  if(o.glow)s+=C_(ix,iy,r1(ir*1.5),o.glow,'opacity=".35"');
  s+=C_(r1(x-.4*d),r1(y-.7),r1(ir*.3),'#fff')+C_(r1(x+.6*d),r1(y+.7),r1(ir*.18),'#fff','opacity=".8"');
  if(o.lidHalf)s+=P(`M${r1(x-w*1.04*d)} ${r1(y+.1)}Q${x} ${r1(y-top*1.1)} ${r1(x+w*1.04*d)} ${r1(y-.4)}L${r1(x+w*d)} ${r1(y+.2)}Q${x} ${r1(y-.2)} ${r1(x-w*d)} ${r1(y+.5)}Z`,o.lidCol||'#c99a7c');
  s+=L_(`M${r1(x-(w+.2)*d)} ${r1(y+.1)}Q${x} ${r1(y-top-.4)} ${r1(x+(w+.2)*d)} ${r1(y-.4)}`,o.lid||'#2a1c16',o.lidW||1);
  if(o.lash)s+=L_(`M${r1(x-(w+.1)*d)} ${r1(y+.1)}Q${r1(x-(w+1.3)*d)} ${r1(y-1)} ${r1(x-(w+1.8)*d)} ${r1(y-1.7)}`,o.lid||'#2a1c16',.8);
  s+=L_(`M${r1(x-(w-.8)*d)} ${r1(y+h*.82)}Q${x} ${r1(y+h*1.15)} ${r1(x+(w-.6)*d)} ${r1(y+h*.72)}`,o.low||'#c08a6c',.4,'opacity=".6"');
  return s}
/* un portrait complet, comme Aegis/Lyra/Sorën */
function portrait(o){const u=Math.max(0,Math.min(3,o.u|0)),q=o.q,TC=o.TC||'#ffd84a',leg=o.r>=4;
  let s=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.name||''}"><defs>${o.defs||''}${rad(q+'bg',o.bg.map((c,k)=>[[0,.16,.42,.74,1][k],c]),'50%',o.bgcy||'34%','74%')}${rad(q+'gl',[[0,o.glow[0],.95],[.5,o.glow[1],.45],[1,o.glow[2],0]])}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
  const hx=50,hy=o.hy||36;
  if(leg||o.rays)s+=rays(hx,hy,12,80,o.rayOp||.08,o.rayCol||'#ffffff');
  s+=C_(hx,hy,30+u*2,`url(#${q}gl)`);
  if(leg){s+=P(star8(hx,hy,31,13,0),'none',`stroke="${o.halo||'#ffe08a'}" stroke-width=".8" opacity="${.45+u*.1}"`)+C_(hx,hy,22.8,'none',`stroke="${o.halo2||o.halo||'#ffe9a0'}" stroke-width=".9" opacity=".75"`);
    if(u>=3)s+=C_(hx,hy,26.4,'none',`stroke="#ffffff" stroke-width=".6" stroke-dasharray="1.4 2.6" opacity=".85"`)}
  if(o.back)s+=o.back(q,u);
  const PART=[[11,20,.7],[88,16,.6],[18,46,.5],[83,47,.6],[7,64,.5],[94,60,.55],[28,10,.45],[72,8,.5],[14,33,.4],[90,34,.45],[24,56,.4]];
  const pc=o.parts||['#fff6c8','#bfe2ff'];
  s+=PART.slice(0,(leg?7:4)+u).map(([x,y,r],k)=>C_(x,y,r,pc[k%pc.length],'opacity=".9"')).join('');
  s+=o.content(q,u);
  if(leg)s+=frame(o.frame?o.frame[0]:'#ffe08a',o.frame?o.frame[1]:'#8ac8ff',o.frame?o.frame[2]:null);
  if(u){[[16,30,2.2],[84,22,1.8],[22,70,1.4],[78,58,1.6],[50,6,1.2]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});s+=ultraBadge(u,TC)}
  s+=clsBadge(o.cls,o.r,u,TC)+'</svg>';
  return s}
/* un corps complet (cadre 160×244), comme Aegis/Lyra/Sorën */
function body(o){const u=Math.max(0,Math.min(3,o.u|0)),q=o.q,bare=!!o.bare,leg=o.r>=4;
  let s=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${o.name||''} en pied"><defs>${o.defs||''}${rad(q+'gl',[[0,o.glow[0],.95],[.5,o.glow[1],.45],[1,o.glow[2],0]])}${rad(q+'bb',[[0,o.bb[0],.38+u*.08],[.55,o.bb[1],.28],[1,o.bb[2],0]],'50%','40%','60%')}</defs>`;
  const hy=36;
  if(bare)s+=`<g class="lgbk">${C_(80,hy,40,`url(#${q}gl)`,'opacity=".5"')}${leg?P(star8(80,hy,34,14),'none',`stroke="${o.halo||'#ffe08a'}" stroke-width="1" opacity=".5"`):''}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,`url(#${q}bb)`)}${rays(80,hy,14,120,o.rayOp||.06,o.rayCol||'#ffffff')}${C_(80,hy,42+u*3,`url(#${q}gl)`,'opacity=".8"')}`;
    if(leg)s+=P(star8(80,hy,36,15),'none',`stroke="${o.halo||'#ffe08a'}" stroke-width="1.1" opacity="${.5+u*.1}"`)+C_(80,hy,27.5,'none',`stroke="${o.halo2||o.halo||'#ffe9a0'}" stroke-width="1.2" opacity=".75"`);
    if(u>=1)s+=C_(80,hy,46+u*4,'none',`stroke="${o.halo||'#ffe08a'}" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"`);
    if(o.back)s+=o.back(q,u);
    const pc=o.parts||['#fff6c8','#bfe2ff'];
    s+=[...Array(6)].map((_,k)=>{const x=24+k*22.4,d=3.6+(k%3)*.9;return`<circle r="${(.8+(k%3)*.4).toFixed(1)}" fill="${pc[k%pc.length]}" opacity=".85"><animateMotion dur="${d}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${r1(x)} 214q${k%2?6:-6} -60 ${k%2?-4:4} -150"/></circle>`}).join('')+`</g>`;
    if(o.ring)s+=ringAt(80,212,50,10,o.ring,.85)}
  s+=E_(80,219,o.shadowW||38,6,'#000','opacity=".42"');
  s+=o.content(q,u);
  if(u&&!bare)[[10,40,2.2],[150,58,1.8],[14,140,1.6],[146,150,1.8],[80,-4,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});
  return s+'</svg>'}
/* l'anneau magique sous les pieds */
function ringAt(cx,cy,rx,ry,cols,op){const [a,b,c]=cols;
  let s=E_(cx,cy,r1(rx*1.08),r1(ry*1.14),'none',`stroke="${c||b}" stroke-width=".6" stroke-dasharray="1.4 3.2" opacity="${r1(op*.7)}"`)+E_(cx,cy,rx,ry,'none',`stroke="${a}" stroke-width="1.2" opacity="${op}"`);
  for(let i=1;i<=3;i++)s+=E_(cx,cy,r1(rx-i*2.6),r1(ry-i*1.05),'none',`stroke="${b}" stroke-width=".4" opacity="${r1(op*.8)}"`);
  s+=E_(cx,cy,r1(rx-12.4),r1(ry-4.6),'none',`stroke="${a}" stroke-width=".7" opacity="${op}"`);
  for(let k=0;k<10;k++){const t=(k*36+18)*Math.PI/180;s+=C_(r1(cx+(rx-5.2)*Math.cos(t)),r1(cy+(ry-2.1)*Math.sin(t)+.4),.7,a,`opacity="${op}"`)}
  return s}
/* le branchement dans le jeu : portrait(), portraitU(), heroBody(), figures du mode histoire, caches */
function install(i,pf,bf,figs){
  try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null,typeof PCACHE!=='undefined'?PCACHE:null])if(C)for(const k of Object.keys(C))if(new RegExp('(^|[^0-9])'+i+'(_|$)').test(k))delete C[k]}catch(e){}
  try{Object.defineProperty(PCACHE,i,{get:()=>pf(0),set(){},configurable:true,enumerable:false})}catch(e){}
  {const pu=portraitU;portraitU=function(h,u){if(h&&h.i===i)return pf(u);return pu.apply(this,arguments)}}
  {const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===i)return bf(u);return hb.apply(this,arguments)}}
  if(figs)try{const sf=sagaFig;sagaFig=function(w){if(figs[w])return`<div class="sgfig lore">${figs[w]()}</div>`;return sf.apply(this,arguments)}}catch(e){}}
window.HA={r1,P,L_,C_,E_,MI,MB,HG,star8,rays,STARP,ROMN,lin,rad,frame,clsBadge,ultraBadge,eye,portrait,body,ringAt,install};
}catch(e){console.warn('atelier',e)}})();
