
/* ================= V459 : LUCAN LE LOUP DE BRUME (héros de l'événement de saison) =================
   Ancien capitaine de la Garde d'Éther. Une nuit, il a ouvert la porte qu'il devait garder.
   Depuis, il vit dans la brume avec les loups, et il chasse comme eux : il attend que la proie saigne. */
const LUC=77;
(function(){try{
if(!HEROES[LUC]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG}=HA;
const GC={};
const defs=(q,u)=>HA.lin(q+'sk','#f2d6be','#e0bc9e','#b8906f')+HA.lin(q+'hr','#f6f8fc','#c6cad6','#868a9c',1)
 +HA.lin(q+'fu',u>=2?'#b4b8c8':'#a2a6b6','#707486','#3e4254',1)+HA.lin(q+'le','#4e3e38','#34292a','#1c1416',1)
 +HA.lin(q+'bl','#4068b4','#2c4c8c','#1a2c58',1)+HA.lin(q+'au','#fff2b0','#e8c05a','#a07418')
 +HA.lin(q+'st','#ffffff','#dce0ea','#868ca0')+HA.rad(q+'mi',[[0,'#eef2ff',.6],[.6,'#dde4f8',.25],[1,'#dde4f8',0]]);
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,FU=q=>`url(#${q}fu)`,LE=q=>`url(#${q}le)`,BL=q=>`url(#${q}bl)`,AU=q=>`url(#${q}au)`,ST=q=>`url(#${q}st)`;
/* ---------- la tête (repère du portrait) ---------- */
function hood(q){/* la peau de loup, rabattue derrière la tête, oreilles dressées */
  let s=P('M29.6 52Q27.4 30 38.6 19.8Q44 15.4 50 15.4Q56 15.4 61.4 19.8Q72.6 30 70.4 52Q70 62 65.6 68L61.4 61Q64.6 52 62.6 42L37.4 42Q35.4 52 38.6 61L34.4 68Q30 62 29.6 52Z',FU(q));
  s+=P('M36.4 24L30.4 3.6L46.4 16.4Z',FU(q))+P('M63.6 24L69.6 3.6L53.6 16.4Z',FU(q));
  s+=P('M37.2 20.6L33.4 8.4L42.8 16.6Z','#2e3038')+P('M62.8 20.6L66.6 8.4L57.2 16.6Z','#2e3038');
  s+=L_('M31.6 7.6L33 11.4M30.8 4.6L32 9M68.4 7.6L67 11.4M69.2 4.6L68 9','#e2e6ee',.5,'opacity=".8"');
  s+=L_('M33 34Q31.4 42 32.4 50M67 34Q68.6 42 67.6 50M40 18.6Q45 16.2 50 16.4Q55 16.2 60 18.6','#d8dce6',.5,'opacity=".7"');
  s+=L_('M31.2 56Q32.4 62 34.6 66M68.8 56Q67.6 62 65.4 66','#d8dce6',.45,'opacity=".6"');
  return s}
function hairBack(q){return P('M35 46Q33.2 31 41.2 24.4Q50 19.6 58.8 24.4Q66.8 31 65 46Q65.6 55 62.6 60.6L60.4 52Q61 47 60.6 44L39.4 44Q39 47 39.6 52L37.4 60.6Q34.4 55 35 46Z',HR(q))}
function face(q,u){
  let s=`<rect x="45.2" y="55" width="9.6" height="13" fill="${SK(q)}"/>`+P('M45.2 59.6Q50 63 54.8 59.6L54.8 64.6Q50 66.4 45.2 64.6Z','#b88a70','opacity=".55"');
  s+=MI(P('M36.8 44.6Q33.4 44.2 33.8 48.2Q34.4 51.8 37.4 51.4Z','#dcb294'));
  s+=P('M37 44.2Q37 30.6 50 30.6Q63 30.6 63 44.2Q63 53.4 60.2 58.6Q56.4 64.2 50 64.8Q43.6 64.2 39.8 58.6Q37 53.4 37 44.2Z',SK(q));
  s+=P('M58.4 46Q61.8 52.6 59.2 57.8Q56.6 61.6 52.6 63.4Q57.6 58.8 59 52.6Z','#b08068','opacity=".4"');
  /* barbe de trois jours */
  s+=P('M39.8 54.6Q42.2 62.6 50 64.8Q57.8 62.6 60.2 54.6Q59 60 55 62Q50 63.4 45 62Q41 60 39.8 54.6Z','#8a8696','opacity=".26"');
  s+=P('M46.4 56.9Q50 56 53.6 56.9Q52.6 57.5 50 57.4Q47.4 57.5 46.4 56.9Z','#8a8696','opacity=".3"');
  /* les yeux du loup : or pâle, plissés */
  const eo={w:3.4,h:2.1,iris:u>=3?'#ffe890':'#e8b84a',iris2:'#9a6414',pupil:'#160c04',lid:'#2a2430',lidW:1.25,ir:1.55,look:.35,narrow:1,glow:u>=1?'#ffe07a':null,low:'#b0806a'};
  s+=HA.eye(44,47.2,eo)+HA.eye(56,47.2,eo);
  /* sourcils lourds, froncés */
  s+=L_('M39.2 42.8Q43.2 40.4 47.8 42','#8a8ea0',1.7)+L_('M52.2 42Q56.8 40.4 60.8 42.8','#8a8ea0',1.7)+L_('M48.8 41.8L49.6 43.4M51.2 41.8L50.4 43.4','#b08068',.4,'opacity=".7"');
  s+=L_('M50.4 47.8L49.3 53.2Q50.2 54.2 52 53.6','#b08068',.75);
  s+=L_('M46.2 58.4Q50 59.3 53.8 58.2','#6a3a34',.9)+L_('M47.4 60Q50 60.9 52.6 60','#c08a7a',.45,'opacity=".7"');
  /* trois griffures sur la joue */
  s+=L_('M55.2 50.4L58.4 57.6M57.4 49.6L60.4 56.4M59.4 50L61.6 54.8','#c88a7c',.7)+L_('M55.2 50.4L58.4 57.6M57.4 49.6L60.4 56.4','#f6d6ca',.25);
  /* cheveux d'argent, en arrière, mèches en dents de loup */
  s+=P('M36.2 44.4Q34.8 30 43 25Q50.6 21.2 58.8 24.8Q66 29.4 64.2 44Q62.8 37 59 33.6Q56 36.4 52.4 34.4Q49.6 37.4 46 35Q42.8 38 40.2 36.4Q37.8 39.6 36.2 44.4Z',HR(q));
  s+=P('M44.4 34.6L46.4 40.4L48.6 34.8Z',HR(q))+P('M52 34.4L53.4 39.4L55.8 34Z',HR(q));
  s+=P('M36.4 41.8Q34.8 50 38 56.6Q38.4 49.4 40.4 44.4Z',HR(q))+P('M63.6 41.8Q65.2 50 62 56.6Q61.6 49.4 59.6 44.4Z',HR(q));
  s+=L_('M42 27.6Q47 25 53 25.6M39.4 32Q44 28.6 50 28.6M53.6 28.4Q59 29.4 62.2 33.6','#ffffff',.5,'opacity=".8"');
  return s}
/* le museau du loup, posé sur son front */
function snout(q,u){return P('M43.6 19.6Q50 16.6 56.4 19.6L54.2 27.6Q50 30.4 45.8 27.6Z',FU(q))+L_('M45 21Q50 19 55 21','#e2e6ee',.5,'opacity=".8"')
  +P('M47.6 28.6L48.4 31.6L49.2 28.8Z','#f4f2ea')+P('M52.4 28.6L51.6 31.6L50.8 28.8Z','#f4f2ea')
  +E_(50,28.2,2.4,1.5,'#16171e')+E_(49.4,27.7,.8,.4,'#8a8ea0')
  +P('M41.4 21.8Q43.8 20.2 46.2 21.8Q43.8 22.8 41.4 21.8Z','#16171e')+P('M53.8 21.8Q56.2 20.2 58.6 21.8Q56.2 22.8 53.8 21.8Z','#16171e')
  +(u>=2?C_(43.8,21.6,.7,'#ffe07a',`opacity="${.4+u*.15}"`)+C_(56.2,21.6,.7,'#ffe07a',`opacity="${.4+u*.15}"`):'')}
/* ---------- buste ---------- */
function ruff(q,cx,y,w){/* la fourrure en dents de scie sur les épaules */
  const k=w/40,X=v=>r1(cx+v*k),Y=v=>r1(y+v);
  return P(`M${X(-40)} ${Y(22)}Q${X(-34)} ${Y(6)} ${X(-14)} ${Y(0)}L${X(0)} ${Y(4)}L${X(14)} ${Y(0)}Q${X(34)} ${Y(6)} ${X(40)} ${Y(22)}L${X(34)} ${Y(18)}L${X(30)} ${Y(24)}L${X(24)} ${Y(15)}L${X(18)} ${Y(21)}L${X(12)} ${Y(13)}L${X(6)} ${Y(19)}L${X(0)} ${Y(13)}L${X(-6)} ${Y(19)}L${X(-12)} ${Y(13)}L${X(-18)} ${Y(21)}L${X(-24)} ${Y(15)}L${X(-30)} ${Y(24)}L${X(-34)} ${Y(18)}Z`,FU(q))
   +L_(`M${X(-34)} ${Y(18)}Q${X(-30)} ${Y(10)} ${X(-20)} ${Y(6)}M${X(34)} ${Y(18)}Q${X(30)} ${Y(10)} ${X(20)} ${Y(6)}M${X(-12)} ${Y(4)}Q${X(0)} ${Y(7)} ${X(12)} ${Y(4)}`,'#dfe2ea',.6,'opacity=".75"')}
function emblem(q,x,y,s){return P(`M${x} ${r1(y-7.4*s)}L${r1(x+5*s)} ${y}L${x} ${r1(y+7.4*s)}L${r1(x-5*s)} ${y}Z`,AU(q),'opacity=".85"')+P(`M${x} ${r1(y-4*s)}L${r1(x+2.6*s)} ${y}L${x} ${r1(y+4*s)}L${r1(x-2.6*s)} ${y}Z`,'#2a4a8a','opacity=".6"')
  +L_(`M${r1(x-6.6*s)} ${r1(y-8*s)}L${r1(x+7.2*s)} ${r1(y+8.6*s)}`,'#141c36',r1(1.3*s))+L_(`M${r1(x-6.6*s)} ${r1(y-8*s)}L${r1(x+7.2*s)} ${r1(y+8.6*s)}`,'#6a86c8',r1(.35*s),'opacity=".7"')}
function bust(q,u){
  let s=P('M6 100Q8 82 20 74L80 74Q92 82 94 100Z',LE(q));
  s+=P('M36 72L64 72L66 100H34Z',BL(q))+L_('M36 72L34 100M64 72L66 100',AU(q),.7,'opacity=".8"');
  s+=emblem(q,50,87.4,1);
  s+=L_('M24 76L70 100','#22181a',3.2)+L_('M24 76L70 100','#5a4438',1.1,'opacity=".8"');
  s+=`<g transform="translate(22.4 73) rotate(-28)">`+P('M-1.6 0H1.6V-12H-1.6Z','#22181a')+L_('M-1.6 -3H1.6M-1.6 -6H1.6M-1.6 -9H1.6','#6a5446',.4)+P('M-4.6 .6H4.6V2.6H-4.6Z',AU(q))+C_(0,-13.2,1.8,AU(q))+'</g>';
  s+=ruff(q,50,66,40);
  return s}
/* ---------- portrait ---------- */
const PO={name:'Lucan le Loup de Brume',cls:'Assassin',r:4,TC:'#b8c8ff',
  bg:['#f6f8fe','#c4cce4','#5a6690','#1c2038','#0a0c16'],glow:['#ffffff','#d4dcf2','#8a9ac8'],halo:'#e4eaff',halo2:'#c8d2f4',
  frame:['#eef2fc','#9fb0d8'],parts:['#eef2fc','#ffe07a'],rayCol:'#eef2ff'};
const mist=(q,cx,cy,w,op)=>`<g opacity="${op}">${[[-.55,0,.6],[0,-.12,.7],[.55,0,.6]].map(([x,y,r])=>E_(r1(cx+x*w),r1(cy+y*w*.4),r1(r*w),r1(r*w*.4),`url(#${q}mi)`)).join('')}</g>`;
const wolfSil=(x,y,s,dir,eyes)=>{const k=v=>r1(v*s);return`<g transform="translate(${x} ${y}) scale(${dir} 1)"><path d="M${k(-9)} ${k(3.5)}L${k(-6)} ${k(-2)}L${k(-5.5)} ${k(-9.5)}L${k(-2.5)} ${k(-4.5)}L${k(-.5)} ${k(-9)}L${k(1)} ${k(-3.5)}Q${k(4)} ${k(-3)} ${k(9.5)} ${k(-.5)}L${k(10)} ${k(.8)}L${k(6)} ${k(2.2)}Q${k(2)} ${k(4)} ${k(-1)} ${k(5.5)}Z" fill="#141828" opacity=".75"/>${eyes?`<circle cx="${k(2.6)}" cy="${k(-1.8)}" r="${k(.9)}" fill="#ffe07a"/>`:''}</g>`};
function lucPortrait(u){u=Math.max(0,Math.min(3,u|0));if(GC['p'+u])return GC['p'+u];const q='lcp'+u+'_';
  return GC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>mist(q,16,84,26,.8)+mist(q,84,82,26,.8)+(u>=1?wolfSil(14,70,1.1,1,u>=2)+wolfSil(86,68,1.1,-1,u>=2):'')+(u>=3?`<circle cx="50" cy="36" r="34" fill="none" stroke="#ffe07a" stroke-width=".6" stroke-dasharray="1 3" opacity=".8"/>`:''),
    content:(q,u)=>hood(q)+hairBack(q)+bust(q,u)+face(q,u)+snout(q,u)}))}
/* ---------- corps entier ---------- */
function knife(q,x,y,a,len,u){return`<g transform="translate(${x} ${y}) rotate(${a})">`
  +P('M-1.5 -7H1.5V0H-1.5Z','#22181a')+L_('M-1.5 -5H1.5M-1.5 -2.6H1.5','#6a5446',.4)+P('M-4.2 0H4.2V1.8H-4.2Z',AU(q))
  +P(`M-1.6 1.8H1.8Q3.6 ${r1(len*.45)} .4 ${len}Q-1.2 ${r1(len*.5)} -1.6 1.8Z`,ST(q),'stroke="#6a7084" stroke-width=".3"')+L_(`M0 3Q1.4 ${r1(len*.45)} .2 ${r1(len*.92)}`,'#ffffff',.35,'opacity=".85"')
  +(u>=2?L_(`M0 3Q1.4 ${r1(len*.45)} .2 ${r1(len*.92)}`,'#b8c8ff',.9,`opacity="${.2+u*.12}"`):'')+'</g>'}
function lucBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(GC[ck])return GC[ck];const q='lcb'+u+(bare?'s':'')+'_';
  return GC[ck]=HA.body({u,q,bare,r:4,name:'Lucan le Loup de Brume',defs:defs(q,u),glow:['#ffffff','#d4dcf2','#8a9ac8'],bb:['#c8d2f0','#2a3460','#0a0c16'],
   halo:'#e4eaff',halo2:'#c8d2f4',parts:['#eef2fc','#ffe07a'],ring:['#e4eaff','#8a9ac8','#ffe07a'],
   back:(q,u)=>mist(q,30,200,34,1)+mist(q,130,196,34,1)+(u>=1?wolfSil(26,150,1.9,1,u>=2)+wolfSil(134,146,1.9,-1,u>=2):'')
     +(u>=3?`<g opacity=".35">${wolfSil(80,26,5.4,1,1)}</g>`:'')
     +[...Array(3)].map((_,k)=>`<ellipse cx="${30+k*50}" cy="210" rx="30" ry="8" fill="url(#${q}mi)" opacity="0"><animate attributeName="opacity" values="0;.35;0" dur="${(5+k).toFixed(1)}s" begin="${-k*1.7}s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="-8 0;8 -6;-8 0" dur="${(6+k).toFixed(1)}s" repeatCount="indefinite"/></ellipse>`).join(''),
   content:(q,u)=>{let s='';
    /* la peau de loup en cape, jusqu'aux genoux */
    s+=P('M58 66Q40 80 36 120Q33 150 38 176L44 170L48 180L54 170L60 178L64 166L70 174L74 160L86 160L90 174L96 166L100 178L106 170L112 180L116 170L122 176Q127 150 124 120Q120 80 102 66Z',FU(q));
    s+=L_('M44 100Q42 130 44 160M116 100Q118 130 116 160M60 92Q56 122 58 150M100 92Q104 122 102 150','#d0d4de',.55,'opacity=".5"');
    s+=HG(hood(q)+hairBack(q));
    /* jambes : pantalon de cuir, bottes bandées, revers de fourrure */
    const boot=(x0,x1,x2,x3)=>P(`M${x0} 170L${x1} 170L${x2} 205L${x3} 208Q${x0-1} 196 ${x0} 170Z`,'#1c1416')+L_(`M${x0+.4} 180L${x1-.4} 184M${x0+.6} 188L${x1} 192M${x0+.8} 196L${x2-.6} 200`,'#5a4a42',.7)
      +P(`M${x0-1.6} 166Q${(x0+x1)/2} 162 ${x1+1.6} 166L${x1+1.2} 173Q${(x0+x1)/2} 176 ${x0-1.2} 173Z`,FU(q))+L_(`M${x0-1} 170Q${(x0+x1)/2} 172 ${x1+1} 170`,'#dfe2ea',.5,'opacity=".7"');
    s+=P('M67.4 126L77.8 126L76.8 172L68.6 172Z',LE(q))+P('M82.2 126L92.6 126L91.4 172L83.2 172Z',LE(q));
    s+=boot(66.4,78.4,79,64.4)+boot(81.8,93.6,96.6,82.2);
    s+=P('M64 205L79 203.6L79.2 210.6L61 212Q61.2 207.6 64 205Z','#0a0608')+P('M82.2 205L96.6 203.6L99.8 210.4L82 212Z','#0a0608');
    /* les pans du manteau de cuir, fendus au milieu */
    s+=P('M60 108Q80 114 100 108L104.6 142Q93 147 84.6 140L80 130L75.4 140Q67 147 55.4 142Z',LE(q))+L_('M80 116V130','#120c0c',.8)+L_('M57 140Q67 145 75 138M103 140Q93 145 85 138','#6a5446',.5,'opacity=".8"');
    /* ceinture, boucle, fourreau sur la hanche */
    s+=P('M59.6 104Q80 110 100.4 104L101 112.4Q80 118.6 59 112.4Z','#22181a')+L_('M59.8 106Q80 112 100.2 106','#5a4438',.5)+`<rect x="76.4" y="107.2" width="7.2" height="6.2" rx="1" fill="none" stroke="${AU(q)}" stroke-width="1.2"/>`;
    s+=P('M95.6 110L101.6 108.6L106 136L101.4 137.4Z','#2a1e1a')+L_('M97 116L102.6 115M98 124L103.6 123','#6a5446',.45);
    /* le justaucorps de cuir et le tabard bleu de la Garde, déchiré */
    s+=P('M60 64Q80 58 100 64L101.6 98Q99 110 80 112Q61 110 58.4 98Z',LE(q));
    s+=P('M68.4 62L91.6 62L93.4 108L88 112L85 106.4L80 113L75.6 106L72 112L66.6 108Z',BL(q))+L_('M68.4 62L66.6 108M91.6 62L93.4 108',AU(q),.6,'opacity=".75"');
    s+=emblem(q,80,84,1.1);
    s+=L_('M70 100Q80 103 90 100','#1a2c58',.6,'opacity=".8"');
    /* fourrure sur les épaules */
    s+=MB(P('M51.6 84Q51 72 60 66Q66 62.6 71 64.6L67 78Q59 80 51.6 84Z',LE(q)));
    s+=ruff(q,80,58,30);
    /* bras droit : pendant, le long couteau tenu à l'envers */
    s+=P('M52 78Q47 96 48.4 114L58 114.6Q58 96 61.4 82Z',LE(q))+L_('M50 94L58.4 95','#120c0c',.5)+P('M47.6 109.6L58.8 110.2L58.6 119.6L48 119Z','#22181a')+L_('M48 113L58.6 113.6M48 116.4L58.6 117','#6a5446',.45);
    s+=knife(q,53.4,124,168,40,u)+E_(53.4,123,4.4,3.8,SK(q))+L_('M50.2 124.2Q53.4 126.2 56.6 124.2','#b08068',.45);
    /* bras gauche : plié, la seconde lame pointée vers l'avant */
    s+=P('M103.6 75Q112 88 113.4 102L105.4 104Q103 92 97.6 82Z',LE(q))+P('M105 100L114 98.4L114.6 106L106 107.4Z','#22181a');
    s+=knife(q,108.6,113,-130,30,u)+E_(109.4,111.4,4.2,3.6,SK(q));
    s+=P('M105.4 104L113.4 102.4Q114.6 108 110.6 112.6L106 110Q107.4 107 105.4 104Z',LE(q));
    /* la tête */
    s+=HG(face(q,u)+snout(q,u));
    if(u>=3)s+=`<circle cx="80" cy="36" r="31" fill="none" stroke="#ffe07a" stroke-width=".8" stroke-dasharray="1.6 3.4" opacity=".8"/>`;
    return s}})}
window.lucPortrait=lucPortrait;window.lucBody=lucBody;
HA.install(LUC,lucPortrait,lucBody,{lucan:()=>lucBody(0,1)});
try{UTH_H[LUC]={n:'Roi de la Meute',m:'#2a3a68',s:'#c8ccd8',a:'#9fb0d8',e:'#ffe07a',bg:'smoke',w:null,hat:null,fx:'stars',c:'#b8c8ff',c2:'#ffe07a',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('lucan art',e)}})();

/* ---------- Instinct de meute, Brume et Curée ---------- */
(function(){try{
if(!HEROES[LUC])return;
const MI2='#b8c8ff',GY='#ffe07a',WH='#f2f6ff',FOG='#c0c8e0';
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const isL=u=>!!u&&u.hid===LUC;
const snd=(k,d,v)=>{try{if(typeof AU!=='undefined'&&AU&&AU.ctx&&cSnd.ok()&&SND[k])SND[k](AU.F.v,NOW(d||0),v||1)}catch(e){}};
const PACK=1.3,BONUS=180,FEAR=20;
let CAST=null,KILL=0;
{const d0=deal;deal=function(s,t,pct,o){o=o||{};
  try{if(t&&t.hp>0&&isL(t)&&t.mist>0&&s&&s.side!==t.side&&B){t.mist=0;float(t,'💨 Brume','info');log(`💨 <b>${t.name}</b> se fond dans la brume : le coup de ${s.name} ne le touche pas.`,'ba');
    if(ok())try{const b=uc(t);smoke(b.x,b.y,10,FOG,16,46);glowPulse(b.x,b.y,MI2,320,b.s*.4)}catch(e){}
    try{refreshUnits()}catch(e){}return 0}}catch(e){}
  let p=pct;try{if(isL(s)&&t&&t.side!==s.side&&t.max<1e12&&t.hp>0&&t.hp/t.max<.5)p=pct*PACK}catch(e){}
  const h0=t?t.hp:0;const d=d0.call(this,s,t,p,o);
  try{if(isL(s)&&t&&h0>0&&t.hp<=0&&s.hp>0){s.mist=1;if(CAST===s)KILL=1}}catch(e){}
  return d}}
{const sk0=skill;skill=function(u,sk,sc){if(!(isL(u)&&sk&&sk.fx&&sk.fx.howl))return sk0.apply(this,arguments);
  try{if(B){for(const t of alive(1-u.side)){t.en=Math.max(0,(t.en||0)-FEAR);if(!B.skip)float(t,'😱 −'+FEAR,'info')}log(`😱 Le hurlement glace le sang des ennemis : <b>−${FEAR} énergie</b> pour tous.`,'sk')}}catch(e){}
  CAST=u;KILL=0;let r;try{r=sk0.apply(this,arguments)}finally{CAST=null}
  try{if(KILL&&B&&alive(1-u.side).length){u.lcGo=1;log(`🐺 <b>${u.name}</b> a goûté le sang : il va rejouer.`,'sk')}}catch(e){}
  return r}}
/* la Curée : s'il achève sa cible avec Hurlement, il rejoue tout de suite sur le plus affaibli */
{const a0=act;act=async function(u){const r=await a0.apply(this,arguments);
  try{if(B&&!B.done&&isL(u)&&u.lcGo&&u.hp>0){u.lcGo=0;const f=alive(1-u.side);if(f.length){
    const t=f.reduce((a,b)=>a.hp/a.max<b.hp/b.max?a:b);
    if(ok()){try{fxSetup();const a=uc(u),b=uc(t);glowPulse(a.x-a.s*.1,a.y-a.s*.32,GY,300,8);glowPulse(a.x+a.s*.1,a.y-a.s*.32,GY,300,8);
      textPop(a.x,a.y-a.s*.6,'CURÉE',GY,18,700);snd('growl',0,1.1);await cardMove(u,(b.x-a.x)*.55,(b.y-a.y)*.55,200);
      slashLine(b.x,b.y,b.s*1.1,-.75,[WH,MI2],200,5);slashLine(b.x,b.y,b.s*1.1,.75,[WH,MI2],200,5,70);sparks(b.x,b.y,MI2,12,6,2,22);snd('claw',.02,1)}catch(e){}}
    const d=deal(u,t,BONUS,{});log(`🐺 <b>${u.name}</b> rejoue et déchire ${t.name} : ${fmt(d)}`,'sk');u.en=Math.min(100,u.en+34);
    refreshUnits();await wait(420)}}}catch(e){}
  return r}}
/* l'étiquette sur la carte */
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B)for(const u of B.units){if(!isL(u))continue;const el=document.getElementById('u-'+u.key);if(!el)continue;
  const on=u.mist>0&&u.hp>0;el.classList.toggle('lcmist',on);if(on){const sx=el.querySelector('.sx');if(sx&&!sx.querySelector('.lctg'))sx.insertAdjacentHTML('beforeend','<span class="lctg" style="color:#c8d4ff">BRUME</span>')}}}catch(e){}return r}}

/* ---------- l'ultime : Hurlement ---------- */
function wolfC(c,x,y,s,dir,al,eye){c.save();c.translate(x,y);c.scale(dir*s,s);c.globalAlpha=al;c.fillStyle='#0a0d18';c.beginPath();
  c.moveTo(-9,3.5);c.lineTo(-6,-2);c.lineTo(-5.5,-9.5);c.lineTo(-2.5,-4.5);c.lineTo(-.5,-9);c.lineTo(1,-3.5);c.quadraticCurveTo(4,-3,9.5,-.5);c.lineTo(10,.8);c.lineTo(6,2.2);c.quadraticCurveTo(2,4,-1,5.5);c.closePath();c.fill();
  if(eye){c.globalCompositeOperation='lighter';c.globalAlpha=al*eye;c.drawImage(spr(GY),2.6-2.4,-1.8-2.4,4.8,4.8)}c.restore()}
LEG2[LUC]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,t=tg[0];if(!t)return;const b=uc(t),fm=rowMid(1-u.side);
  /* la brume monte */
  vignette('#060814',1900,.68);try{dimOn(.62)}catch(e){}
  fxItem(1700,(c,p)=>{const al=Math.sin(p*Math.PI)*.5;c.globalAlpha=al;for(let k=0;k<9;k++){const x=((k*97+p*60)%(W+160))-80,y=H*(.95-p*.45)-((k*53)%90);const g=c.createRadialGradient(x,y,4,x,y,90);g.addColorStop(0,'rgba(200,210,235,.55)');g.addColorStop(1,'rgba(200,210,235,0)');c.fillStyle=g;c.fillRect(x-90,y-90,180,180)}});
  /* les loups dans la brume, autour de la proie */
  const pos=[[-1.15,.05,1],[1.15,-.05,-1],[-.55,.55,1],[.6,.55,-1]];
  pos.forEach(([dx,dy,dir],i)=>fxItem(1300,(c,p)=>{const al=p<.25?p/.25:p>.8?(1-p)/.2:1;wolfC(c,fm.x+dx*fm.s*1.4,fm.y+dy*fm.s,fm.s*.07,dir,al*.85,p>.3?1:0)},120+i*90));
  await fxWait(520);if(!B)return;
  /* le hurlement */
  snd('growl',0,1.4);snd('growl',.18,1);
  for(let i=0;i<3;i++)ringFx(a.x,a.y-a.s*.3,i%2?MI2:WH,a.s*(1+i*.45),620,4,1,i*140);
  shake(2);glowPulse(a.x,a.y-a.s*.3,MI2,600,a.s*.6);
  await fxWait(420);if(!B)return;
  /* il disparaît, et réapparaît derrière la proie */
  smoke(a.x,a.y,12,FOG,18,50);const el=cardEl(u);try{if(el&&el.animate)el.animate([{opacity:1},{opacity:.15},{opacity:.15},{opacity:1}],{duration:700/S.speed})}catch(e){}
  await fxWait(260);if(!B)return;
  smoke(b.x,b.y-b.s*.5,10,FOG,16,44);glowPulse(b.x,b.y-b.s*.45,GY,260,10);
  await fxWait(160);if(!B)return;
  /* la croix */
  slashLine(b.x,b.y,b.s*1.5,-.8,[WH,MI2],260,6);slashLine(b.x,b.y,b.s*1.5,.8,[WH,MI2],260,6,90);snd('claw',0,1.2);snd('slash',.09,1);
  await fxWait(200);if(!B)return;
  flash('#e8eeff',180,.6);camPunch(b,1.1,420);sparks(b.x,b.y,MI2,18,8,2.2,26);ringFx(b.x,b.y,WH,b.s*.75,480,5);
  hit(X,t,1.5);
  await fxWait(320);if(!B)return;
  if(t.hp<=0&&alive(1-u.side).length){glowPulse(a.x-a.s*.1,a.y-a.s*.32,GY,500,9);glowPulse(a.x+a.s*.1,a.y-a.s*.32,GY,500,9);textPop(a.x,a.y-a.s*.55,'LA MEUTE A FAIM',GY,Math.max(14,Math.min(20,W*.9/14)),900);await fxWait(380)}
  else await fxWait(200)};

/* ---------- textes ---------- */
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.howl)r+=` Son hurlement glace le sang : <b>tous les ennemis perdent ${FEAR} énergie</b>. S'il <b>achève sa cible</b>, il <b>rejoue aussitôt</b> : il déchire l'ennemi le plus affaibli pour ${BONUS} % de son ATQ.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill lcpas"><div class="sn">🐺 Instinct de meute</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Il inflige <b>+30 % de dégâts</b> aux ennemis sous 50 % de PV. Quand il achève un ennemi, la <b>brume</b> le cache : le prochain coup qui le vise ne lui fait <b>aucun dégât</b>.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===LUC){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk&&!mo.querySelector('.lcpas'))sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`
#battle .u.lcmist .pt{filter:saturate(.6) brightness(1.08) drop-shadow(0 0 8px rgba(200,212,255,.8))}
.skill.lcpas{border-color:rgba(184,200,255,.5)!important;background:linear-gradient(135deg,rgba(184,200,255,.14),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{if(typeof STL!=='undefined')STL[LUC]=["Lucan était le capitaine de la Garde d'Éther, celui qu'on mettait à la porte nord parce qu'il ne dormait jamais. Une nuit d'hiver, il l'a ouverte lui-même.",
  "Cette nuit-là, la Garde est tombée. Lucan s'est enfui dans la brume des montagnes, où une meute de loups l'a accepté avant les hommes. Il a appris à chasser comme eux : il attend que la proie saigne.",
  "Perrin lui a demandé un jour pourquoi il avait ouvert la porte. Lucan a répondu : « On m'avait dit que ma sœur était de l'autre côté. » Elle n'y était pas. Elle n'y a jamais été."]}catch(e){}
try{if(typeof VOXD!=='undefined')VOXD[LUC]=['m','deep',["Lucan. Ne me demande pas pourquoi j'ai ouvert la porte.","La meute attend que tu saignes. Moi aussi.","Hurlement !"]]}catch(e){}
try{const X={'Lucan le Loup de Brume':'Lucan the Mist Wolf','Hurlement':'Howl','CURÉE':'THE KILL','LA MEUTE A FAIM':'THE PACK IS HUNGRY','💨 Brume':'💨 Mist','BRUME':'MIST','Roi de la Meute':'King of the Pack','🐺 Instinct de meute':'🐺 Pack Instinct',
  "Il inflige <b>+30 % de dégâts</b> aux ennemis sous 50 % de PV. Quand il achève un ennemi, la <b>brume</b> le cache : le prochain coup qui le vise ne lui fait <b>aucun dégât</b>.":"He deals <b>+30 % damage</b> to enemies under 50 % HP. When he finishes off an enemy, the <b>mist</b> hides him: the next hit aimed at him deals <b>no damage</b>.",
  [`Son hurlement glace le sang : <b>tous les ennemis perdent ${FEAR} énergie</b>. S'il <b>achève sa cible</b>, il <b>rejoue aussitôt</b> : il déchire l'ennemi le plus affaibli pour ${BONUS} % de son ATQ.`]:`His howl chills the blood: <b>every enemy loses ${FEAR} energy</b>. If he <b>finishes off his target</b>, he <b>acts again at once</b>: he tears into the weakest enemy for ${BONUS} % of his ATK.`,
  "Lucan était le capitaine de la Garde d'Éther, celui qu'on mettait à la porte nord parce qu'il ne dormait jamais. Une nuit d'hiver, il l'a ouverte lui-même.":"Lucan was the captain of the Aether Guard, the one they put at the north gate because he never slept. One winter night, he opened it himself.",
  "Cette nuit-là, la Garde est tombée. Lucan s'est enfui dans la brume des montagnes, où une meute de loups l'a accepté avant les hommes. Il a appris à chasser comme eux : il attend que la proie saigne.":"That night, the Guard fell. Lucan fled into the mountain mist, where a wolf pack accepted him before men ever did. He learned to hunt like them: he waits for the prey to bleed.",
  "Perrin lui a demandé un jour pourquoi il avait ouvert la porte. Lucan a répondu : « On m'avait dit que ma sœur était de l'autre côté. » Elle n'y était pas. Elle n'y a jamais été.":"One day Perrin asked him why he had opened the gate. Lucan answered: “They told me my sister was on the other side.” She wasn't. She never had been.",
  "Lucan. Ne me demande pas pourquoi j'ai ouvert la porte.":"Lucan. Don't ask me why I opened the gate.","La meute attend que tu saignes. Moi aussi.":"The pack is waiting for you to bleed. So am I.","Hurlement !":"Howl!"};Object.assign(I18N_EN,X);for(const k in X)if(k.includes('<')&&window.RDEput)RDEput(k,X[k])}catch(e){}
}catch(e){console.warn('lucan kit',e)}})();
