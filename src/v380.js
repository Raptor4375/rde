
/* ================= KIT DES LÉGENDAIRES : le style graphique des nouveaux héros, pour tous les légendaires =================
   Outils communs (aucun filtre SVG, très peu d'animations) : dégradés, yeux détaillés, sceau derrière la tête,
   cercle au sol, ailes en plumes, cadre doré, badges d'ultra et de classe, et branchement dans le jeu (caches). */
window.LK=(function(){
const r1=v=>Math.round(v*10)/10;
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const L_=(d,c,w,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${x}/>`;
const C_=(x,y,r,f,e='')=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${f}" ${e}/>`;
const E_=(x,y,rx,ry,f,e='')=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${f}" ${e}/>`;
const MI=s=>s+`<g transform="matrix(-1 0 0 1 100 0)">${s}</g>`;
const MB=s=>s+`<g transform="matrix(-1 0 0 1 160 0)">${s}</g>`;
const HG=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;
const st=a=>a.map(([o,c,op])=>`<stop offset="${o}" stop-color="${c}"${op!=null?` stop-opacity="${op}"`:''}/>`).join('');
const lin=(id,a,x2=0,y2=1)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${x2}" y2="${y2}">${st(a)}</linearGradient>`;
const rad=(id,a,cx='50%',cy='50%',r='50%')=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r="${r}">${st(a)}</radialGradient>`;
const U=(q,k)=>`url(#${q}${k})`;
const STARP=(x,y,r,c='#fff')=>P(`M${x} ${r1(y-r*2)}L${r1(x+r*.5)} ${r1(y-r*.5)}L${r1(x+r*2)} ${y}L${r1(x+r*.5)} ${r1(y+r*.5)}L${x} ${r1(y+r*2)}L${r1(x-r*.5)} ${r1(y+r*.5)}L${r1(x-r*2)} ${y}L${r1(x-r*.5)} ${r1(y-r*.5)}Z`,c,'opacity=".9"');
const star8=(cx,cy,Ro,Rm,Ri)=>{let d='';for(let k=0;k<16;k++){const a=(k*22.5-90)*Math.PI/180,r=k%2?Ri:(k%4?Rm:Ro);d+=(k?'L':'M')+r1(cx+r*Math.cos(a))+' '+r1(cy+r*Math.sin(a))}return d+'Z'};
const starN=(cx,cy,n,Ro,Ri,rot=-90)=>{let d='';for(let k=0;k<n*2;k++){const a=(k*180/n+rot)*Math.PI/180,r=k%2?Ri:Ro;d+=(k?'L':'M')+r1(cx+r*Math.cos(a))+' '+r1(cy+r*Math.sin(a))}return d+'Z'};
function rays(cx,cy,n,len,op,col){let s='';for(let k=0;k<n;k++){const a=(k*360/n+8)*Math.PI/180,b=(k*360/n+16)*Math.PI/180;s+=P(`M${cx} ${cy}L${r1(cx+len*Math.cos(a))} ${r1(cy+len*Math.sin(a))}L${r1(cx+len*Math.cos(b))} ${r1(cy+len*Math.sin(b))}Z`,col,`opacity="${op}"`)}return s}
function frame(inner='#ffd84a'){const c=L_('M2.6 17V5.6Q2.6 2.6 5.6 2.6H17','#ffe08a',1,'opacity=".95"')+L_('M5.4 13.4V7Q5.4 5.4 7 5.4H13.4',inner,.5,'opacity=".85"')+P('M1.4 1.4h3.2v3.2z','#fff6c8','opacity=".9"');
  return[0,90,180,270].map(a=>`<g transform="rotate(${a} 50 50)">${c}</g>`).join('')}
const ROMN=['','I','II','III'];
function ultraBadge(u){if(!u)return'';return`<g transform="translate(13 13)"><path d="M0 -9L7 0L0 9L-7 0Z" fill="#ffd84a" stroke="#140c24" stroke-width="1.4"/><text y="3.4" text-anchor="middle" font-size="${u===3?6.5:8}" font-weight="900" font-family="Arial,sans-serif" fill="#140c24">${ROMN[u]}</text></g>`}
function classBadge(cls,u){const c=(typeof CLS!=='undefined'&&CLS[cls]&&CLS[cls].c)||'#ffd84a',rc=(typeof RCOL!=='undefined'&&RCOL[4])||'#ffd84a';
  const ic={Tank:`<path d="M86 77L93 80Q93 88 86 92Q79 88 79 80Z" fill="${c}"/>`,
    Guerrier:`<path d="M86 75L88 86L86 88L84 86Z M81 86L91 86L91 87.6L81 87.6Z M85.2 88h1.6v4h-1.6z" fill="${c}"/>`,
    Assassin:`<path d="M81 91L90 76L91.5 78L83.5 92Z" fill="${c}"/>`,
    Mage:`<path d="M86 76L88 82L94 84L88 86L86 92L84 86L78 84L84 82Z" fill="${c}"/>`,
    Tireur:`<path d="M81 76Q94 84 81 92" fill="none" stroke="${c}" stroke-width="2"/><path d="M80 84H93" stroke="${c}" stroke-width="1.4"/>`,
    Soutien:`<path d="M84.5 77h3v5.5h5.5v3h-5.5v5.5h-3v-5.5h-5.5v-3h5.5z" fill="${c}"/>`}[cls]||'';
  return`<circle cx="86" cy="84" r="11" fill="rgba(11,8,25,.85)" stroke="${u?'#ffd84a':rc}" stroke-width="${u?2.2:1.5}"/>${ic}`}
/* un œil détaillé (portrait 100×100) : o.ir iris, o.ir2 iris foncé, o.lid trait, o.open ouverture, o.y, o.w, o.fierce */
function eye(x,o={}){const y=o.y||47,d=x<50?1:-1,w=o.w||3.6,op=o.open||1,ix=r1(x+.2*d),ty=o.fierce?-.8:0;
  let s=P(`M${r1(x-w*d)} ${r1(y+.2)}Q${x} ${r1(y-3.3*op)} ${r1(x+w*d)} ${r1(y-.4+ty)}Q${r1(x+.4*d)} ${r1(y+2.8*op)} ${r1(x-w*d)} ${r1(y+.2)}Z`,o.white||'#fdfaf4');
  s+=C_(ix,y,o.irr||1.95,o.ir||'#4a8aff')+C_(ix,r1(y+.3),r1((o.irr||1.95)*.62),o.ir2||'#1a3a8a')+C_(ix,r1(y+.1),r1((o.irr||1.95)*.38),o.pu||'#0e1420');
  if(o.glow)s+=C_(ix,y,r1((o.irr||1.95)*1.6),o.glow,'opacity=".35"');
  s+=C_(r1(x-.5*d),r1(y-.9),.6,'#fff')+C_(r1(x+.6*d),r1(y+.9),.3,'#fff','opacity=".8"');
  s+=L_(`M${r1(x-(w+.3)*d)} ${r1(y+.3)}Q${x} ${r1(y-3.6*op)} ${r1(x+(w+.2)*d)} ${r1(y-.6+ty)}`,o.lid||'#2a1a10',o.lw||1.15);
  if(o.lash)s+=L_(`M${r1(x-(w+.1)*d)} ${r1(y+.2)}Q${r1(x-(w+1.3)*d)} ${r1(y-1)} ${r1(x-(w+1.8)*d)} ${r1(y-1.6)}`,o.lid||'#2a1a10',.8);
  s+=L_(`M${r1(x-2.6*d)} ${r1(y+2)}Q${x} ${r1(y+2.9)} ${r1(x+2.8*d)} ${r1(y+1.6)}`,o.low||'#c08a70',.4,'opacity=".6"');
  return s}
/* un sceau derrière la tête : anneau, anneau intérieur, graduations ; le motif du sommet est donné par le héros */
function sigilRing(cx,cy,R,op,col='#ffe08a',col2='#fff2c0',ticks=36){let s=C_(cx,cy,R,'none',`stroke="${col}" stroke-width="${r1(R*.036)}" opacity="${r1(op)}"`)+C_(cx,cy,r1(R*.85),'none',`stroke="${col2}" stroke-width="${r1(R*.018)}" opacity="${r1(op*.85)}"`);
  let d='';for(let k=0;k<ticks;k++){if(k%(ticks/4)===0)continue;const a=(k*360/ticks-90)*Math.PI/180,c=Math.cos(a),sn=Math.sin(a),ra=R*.87,rb=R*(k%3?.93:.98);d+=`M${r1(cx+ra*c)} ${r1(cy+ra*sn)}L${r1(cx+rb*c)} ${r1(cy+rb*sn)}`}
  return s+`<path d="${d}" stroke="${col}" stroke-width="${r1(R*.018)}" opacity="${r1(op)}"/>`}
/* un cercle magique au sol (corps 160×244) ; glyph(x,y,k) dessine un petit signe */
function footRing(cx,cy,rx,ry,op,c1,c2,glyph,n=18){let s=E_(cx,cy,r1(rx*1.08),r1(ry*1.14),'none',`stroke="${c2}" stroke-width=".6" stroke-dasharray="1.4 3.2" opacity="${r1(op*.7)}"`)
    +E_(cx,cy,rx,ry,'none',`stroke="${c1}" stroke-width="1.2" opacity="${op}"`)+E_(cx,cy,r1(rx*.8),r1(ry*.76),'none',`stroke="${c2}" stroke-width=".7" opacity="${op}"`);
  let d='';for(let k=0;k<n;k++){const a=k*360/n*Math.PI/180;d+=glyph(r1(cx+rx*.9*Math.cos(a)),r1(cy+ry*.88*Math.sin(a)),k)}
  return s+`<path d="${d}" stroke="${c2}" stroke-width=".55" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${op}"/>`}
const RUNES=[(x,y)=>`M${r1(x-1.1)} ${r1(y+.8)}L${x} ${r1(y-.8)}L${r1(x+1.1)} ${r1(y+.8)}`,(x,y)=>`M${x} ${r1(y-.9)}V${r1(y+.9)}M${x} ${r1(y-.1)}L${r1(x+1)} ${r1(y-.9)}`,
  (x,y)=>`M${r1(x-1)} ${r1(y-.8)}L${r1(x+1)} ${r1(y+.8)}M${r1(x+1)} ${r1(y-.8)}L${r1(x-1)} ${r1(y+.8)}`,(x,y)=>`M${r1(x-.9)} ${r1(y+.9)}V${r1(y-.9)}L${r1(x+.9)} ${r1(y-.1)}L${r1(x-.9)} ${r1(y+.3)}`];
const rune=(x,y,k)=>RUNES[k%4](x,y);
/* plumes d'ailes */
function feather(R,a,len,wd,fill,edge,ew){const t=a*Math.PI/180,c=Math.cos(t),sn=Math.sin(t),nx=-sn,ny=c,tx=R[0]+len*c,ty=R[1]+len*sn,mx=R[0]+len*.58*c,my=R[1]+len*.58*sn;
  return P(`M${r1(R[0]+nx*1.6)} ${r1(R[1]+ny*1.6)}Q${r1(mx+nx*wd)} ${r1(my+ny*wd)} ${r1(tx)} ${r1(ty)}Q${r1(mx-nx*wd*.5)} ${r1(my-ny*wd*.5)} ${r1(R[0]-nx*1.6)} ${r1(R[1]-ny*1.6)}Z`,fill,`stroke="${edge}" stroke-width="${ew}" stroke-linejoin="round"`)}
/* une paire d'ailes : rangées [[angle,longueur],…], couleurs par rangée */
function wingPair(R,rows,op=1){let w='';for(const r of rows)r.f.forEach(([a,l],k)=>{w+=feather(R,a,l,r.wd||6,Array.isArray(r.fill)?r.fill[k%r.fill.length]:r.fill,r.edge,r.ew||.5)});return`<g opacity="${op}">${MI(w)}</g>`}
/* braises / particules qui montent dans le fond du corps (5 animations) */
function risers(cols,shape){return[...Array(5)].map((_,k)=>{const x=28+k*26,d=3.6+(k%3)*.9,c=cols[k%cols.length];const sh=shape?shape(c,k):`<circle r="${(.9+(k%3)*.4).toFixed(1)}" fill="${c}" opacity=".9"/>`;
  return`<g><animateMotion dur="${d}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${x} 212q${k%2?7:-7} -70 ${k%2?-5:5} -160"/>${sh}</g>`}).join('')}
/* un halo d'ultra III */
const halo=(cx,cy,rx,ry)=>E_(cx,cy,rx,ry,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(cx,cy,rx,ry,'none','stroke="#ffffff" stroke-width=".5"');
/* l'ouverture et la fermeture d'un portrait / d'un corps */
const pOpen=(q,label,defs)=>`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label}"><defs>${defs}</defs><rect width="100" height="100" fill="url(#${q}bg)"/>`;
function pClose(cls,u,starsAt){let s='';if(u){(starsAt||[[16,30,2],[84,26,1.8],[20,58,1.3],[80,52,1.5]]).slice(0,1+u).forEach(([x,y,r])=>{s+=STARP(x,y,r)});s+=ultraBadge(u)}return s+classBadge(cls,u)+'</svg>'}
const bOpen=(q,label,defs)=>`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label} en pied"><defs>${defs}</defs>`;
function bStars(u,bare){if(!u||bare)return'';return[[14,40,2],[146,56,1.8],[16,140,1.6],[144,150,1.8],[24,186,1.5]].slice(0,2+u).map(([x,y,r])=>STARP(x,y,r)).join('')}
/* branchement : portrait de base, portraits d'ultra, corps, et nettoyage des anciens caches */
function register(id,pFn,bFn){const C={};const pf=u=>{u=Math.max(0,Math.min(3,u|0));return C['p'+u]||(C['p'+u]=pFn(u))};const bf=(u,bare)=>{u=Math.max(0,Math.min(3,u|0));const k='b'+u+(bare?'s':'');return C[k]||(C[k]=bFn(u,!!bare))};
  try{Object.defineProperty(PCACHE,id,{get:()=>pf(0),set(){},configurable:true,enumerable:false})}catch(e){}
  {const pu=portraitU;portraitU=function(h,u){if(h&&h.i===id)return pf(u);return pu.apply(this,arguments)}}
  {const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===id)return bf(u);return hb.apply(this,arguments)}}
  try{for(const K of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PIMG!=='undefined'?PIMG:null,typeof UPI!=='undefined'?UPI:null,typeof PCACHE!=='undefined'?PCACHE:null])if(K)for(const k of Object.keys(K))if(new RegExp('(^|[^0-9])'+id+'(_|$)').test(k))delete K[k]}catch(e){}
  return{p:pf,b:bf}}
return{r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,star8,starN,rays,frame,ultraBadge,classBadge,eye,sigilRing,footRing,rune,feather,wingPair,risers,halo,pOpen,pClose,bOpen,bStars,register}})();
