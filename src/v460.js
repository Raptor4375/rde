
/* ================= V460 : VEYRA AUX MILLE CLÉS (héroïne de l'événement de saison) =================
   Geôlière du Tribunal des Lames. Le soir où le Tribunal est tombé, elle a ouvert toutes les cellules.
   Elle ramène les évadés un par un. Sa chaîne ouvre les protections ; ses clés finissent par tout fermer. */
const VEY=78;
(function(){try{
if(!HEROES[VEY]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG}=HA;
const GC={};
const defs=(q,u)=>HA.lin(q+'sk','#f8e0cc','#ecc6aa','#cc9a7e')+HA.lin(q+'hr','#4e3e58','#2a2032','#120c18',1)
 +HA.lin(q+'co',u>=2?'#3a7e92':'#30707f','#1e4a5a','#0c2a34',1)+HA.lin(q+'ru','#c8784a','#a0603a','#6a3a1e',1)
 +HA.lin(q+'ir','#e4e8f0','#9aa2b4','#555d70')+HA.lin(q+'br','#fff2b8','#d8b04a','#8a6a1a')
 +HA.lin(q+'bo','#2e2834','#1e1a24','#0e0c12',1)+HA.rad(q+'kg',[[0,'#ffffff',.9],[.4,'#7fd8ff',.55],[1,'#7fd8ff',0]]);
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,CO=q=>`url(#${q}co)`,RU=q=>`url(#${q}ru)`,IR=q=>`url(#${q}ir)`,BR=q=>`url(#${q}br)`,BO=q=>`url(#${q}bo)`,KG=q=>`url(#${q}kg)`;
/* une clé : anneau, tige, panneton */
function key(x,y,s,a,col,w){return`<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">`
  +C_(0,0,2.6,'none',`stroke="${col}" stroke-width="${w||1.3}"`)+L_('M0 2.6V11.6',col,w||1.3)+L_('M0 8.6H2.4M0 10.8H3',col,(w||1.3)*.85)+'</g>'}
/* une chaîne : maillons alternés le long d'une ligne */
function chain(q,x1,y1,x2,y2,n,w=1){const a=Math.atan2(y2-y1,x2-x1)*180/Math.PI;let s='';
  for(let i=0;i<=n;i++){const x=r1(x1+(x2-x1)*i/n),y=r1(y1+(y2-y1)*i/n);
    s+=`<ellipse cx="${x}" cy="${y}" rx="${r1(2.3*w)}" ry="${r1((i%2?.7:1.3)*w)}" transform="rotate(${r1(a)} ${x} ${y})" fill="none" stroke="${IR(q)}" stroke-width="${r1(.8*w)}"/>`}
  return s}
function chainPath(q,pts,w=1){let s='';for(let k=0;k<pts.length-1;k++){const [x1,y1]=pts[k],[x2,y2]=pts[k+1];s+=chain(q,x1,y1,x2,y2,Math.max(1,Math.round(Math.hypot(x2-x1,y2-y1)/(3.6*w))),w)}return s}
function padlock(q,x,y,s){return`<g transform="translate(${x} ${y}) scale(${s})">`+`<path d="M-3.4 -1V-4.4Q-3.4 -8 0 -8Q3.4 -8 3.4 -4.4V-1" fill="none" stroke="${IR(q)}" stroke-width="1.5"/>`
  +P('M-5 -1.4H5Q6 -1.4 6 -.4V6Q6 7.2 4.8 7.2H-4.8Q-6 7.2 -6 6V-.4Q-6 -1.4 -5 -1.4Z',IR(q))+C_(0,2.2,1.1,'#2a2a34')+L_('M0 2.8V4.8','#2a2a34',.9)+'</g>'}
/* ---------- la tête ---------- */
function hairBack(q){return P('M34.6 46Q33 30 42.4 24Q50 20 57.6 24Q67 30 65.4 46Q66 54 64.8 60.6L35.2 60.6Q34 54 34.6 46Z',HR(q))+L_('M36 60.4H64','#0c0810',.8)}
function face(q,u){
  let s=`<rect x="45.6" y="55" width="8.8" height="13" fill="${SK(q)}"/>`+P('M45.6 59.6Q50 62.8 54.4 59.6L54.4 64.4Q50 66.2 45.6 64.4Z','#c08a70','opacity=".55"');
  s+=MI(P('M36.8 44.6Q33.6 44.2 34 48Q34.6 51.4 37.4 51.2Z','#e6b898'));
  s+=P('M37 44.4Q37 30.6 50 30.6Q63 30.6 63 44.4Q63 52.6 59.6 58.2Q55.4 63.8 50 64.4Q44.6 63.8 40.4 58.2Q37 52.6 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#c88a6c','opacity=".4"');
  /* yeux d'eau glacée, un peu plissés : elle te compte parmi les évadés */
  const eo={w:3.5,h:2.2,iris:u>=3?'#c8f6ff':'#78c4e4',iris2:'#24607e',pupil:'#08141c',lid:'#16101c',lidW:1.2,lash:1,ir:1.7,look:.25,narrow:1,glow:u>=1?'#7fd8ff':null};
  s+=HA.eye(44,47,eo)+HA.eye(56,47,eo);
  s+=L_('M39.8 42.4Q43.4 41 47.4 42','#221a2a',1.2)+L_('M52.6 42Q56.6 41 60.2 42.4','#221a2a',1.2);
  s+=L_('M50.4 48.6L49.7 52.8Q50.4 53.6 51.6 53.1','#c08a70',.65);
  s+=P('M47 58.2Q50 58.2 53 58.2Q52.2 59.6 50 59.7Q47.8 59.6 47 58.2Z','#a84e56')+L_('M46.6 58.3Q50 58.1 53.4 58.3','#6a2430',.6)+P('M48 59.1Q50 59.9 52 59.1Q50 59.5 48 59.1Z','#e08a8a','opacity=".6"');
  s+=MI(E_(41.6,53.4,2.8,1.3,'#ff7a7a','opacity=".14"'));
  /* un petit anneau de fer à chaque oreille */
  s+=C_(35,52.4,1.1,'none',`stroke="${IR(q)}" stroke-width=".55"`)+C_(65,52.4,1.1,'none',`stroke="${IR(q)}" stroke-width=".55"`);
  /* carré noir, frange de côté */
  s+=P('M36 46Q34.4 30.4 43.6 25.4Q51.6 21.6 59.6 25.6Q66 30 64.4 46Q62.6 37 57.6 33.6Q52 37.2 44.6 36.4Q39.6 39 36 46Z',HR(q));
  s+=P('M59.4 29.6Q50 31.6 42.4 38.6Q39.6 41.4 38.4 45Q40.6 35.6 48.2 30.8Q54 27.6 59.4 29.6Z',HR(q));
  s+=P('M36.6 40Q34.6 50 36.4 58.8L40.8 57.6Q39.4 49 40.6 42.6Z',HR(q))+P('M63.4 40Q65.4 50 63.6 58.8L59.2 57.6Q60.6 49 59.4 42.6Z',HR(q));
  s+=L_('M44 27.4Q50 25.2 56 27M41.6 32.6Q47 29 54.4 29.8M60.6 34Q62.6 40 62.4 46','#8a7aa0',.5,'opacity=".8"');
  return s}
/* ---------- buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 82 22 74L78 74Q90 82 92 100Z',CO(q))+P('M12 100Q14 86 24 78L28 100Z','#06161c','opacity=".45"');
  s+=P('M43 68L57 68L60 100H40Z','#1a1420');
  /* le haut col, doublé de rouille */
  s+=P('M40.4 64.4Q38.6 71 39.8 78L45.4 76Q44 71 45 65.8Z',RU(q))+P('M59.6 64.4Q61.4 71 60.2 78L54.6 76Q56 71 55 65.8Z',RU(q));
  s+=P('M38.4 63.4Q35.8 71 37.6 80L40.2 79.4Q38.8 71 40.6 64.2Z',CO(q))+P('M61.6 63.4Q64.2 71 62.4 80L59.8 79.4Q61.2 71 59.4 64.2Z',CO(q));
  s+=MI(L_('M40 80L36.4 100','#0a242e',.7)+C_(38.4,86,.95,IR(q))+C_(37.6,93,.95,IR(q)));
  /* la chaîne en bandoulière */
  s+=chainPath(q,[[16,80],[40,88],[64,98],[70,101]],1);
  /* la clé bleue, au bout d'un cordon */
  s+=L_('M45.6 64.6Q50 75 54.4 64.6','#3a2a20',.6);
  s+=C_(50,80,7,KG(q),`opacity="${.5+u*.15}"`)+key(50,77,1.05,0,'#7fd8ff',1.4)+C_(50,77,1,'#ffffff');
  return s}
/* ---------- portrait ---------- */
const PO={name:'Veyra aux Mille Clés',cls:'Guerrier',r:4,TC:'#7fd8ff',
  bg:['#f0fcff','#b4e8f6','#2a6a86','#0e2434','#06101a'],glow:['#ffffff','#c8f0ff','#7fd8ff'],halo:'#d4f6ff',halo2:'#a8e8ff',
  frame:['#e4f8ff','#7fd8ff'],parts:['#e8fbff','#ffd77a'],rayCol:'#e8fbff'};
const bars=(x0,x1,y0,y1,n,op)=>{let s='';for(let i=0;i<n;i++){const x=r1(x0+(x1-x0)*i/(n-1));s+=`<rect x="${r1(x-1.1)}" y="${y0}" width="2.2" height="${y1-y0}" fill="#0a1a24" opacity="${op}"/>`+L_(`M${r1(x-.4)} ${y0}V${y1}`,'#9ad8f0',.3,`opacity="${r1(op*.8)}"`)}
  return s+`<rect x="${x0-2}" y="${y0+4}" width="${x1-x0+4}" height="2" fill="#0a1a24" opacity="${op}"/>`};
const floatKeys=(pts,u)=>pts.slice(0,u+1).map(([x,y,a],k)=>`<g opacity=".85"><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="${(3+k*.6).toFixed(1)}s" repeatCount="indefinite"/>${key(x,y,1,a,k%2?'#ffd77a':'#bff0ff',1.2)}</g>`).join('');
function veyPortrait(u){u=Math.max(0,Math.min(3,u|0));if(GC['p'+u])return GC['p'+u];const q='vyp'+u+'_';
  return GC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>bars(8,92,6,98,9,.22)+floatKeys([[14,30,-20],[86,26,25],[18,62,10],[84,60,-15]],u)+(u>=3?`<circle cx="50" cy="36" r="33" fill="none" stroke="#7fd8ff" stroke-width=".6" stroke-dasharray="1 3" opacity=".8"/>`:''),
    content:(q,u)=>hairBack(q)+bust(q,u)+face(q,u)}))}
/* ---------- corps entier ---------- */
function ring(q,cx,cy,u){let s=C_(cx,cy,6.4,'none',`stroke="${IR(q)}" stroke-width="1.5"`);
  const K=[[-60,'#c8ced8'],[-25,'#d8b04a'],[5,'#c8ced8'],[35,'#d8b04a'],[65,'#c8ced8'],[95,'#9aa2b4']];
  K.forEach(([a,c],k)=>{const r=a*Math.PI/180,x=r1(cx+Math.sin(r)*6.4),y=r1(cy+Math.cos(r)*6.4);s+=key(x,y,.85,-a,c,1.2)});
  return s}
function veyBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(GC[ck])return GC[ck];const q='vyb'+u+(bare?'s':'')+'_';
  return GC[ck]=HA.body({u,q,bare,r:4,name:'Veyra aux Mille Clés',defs:defs(q,u),glow:['#ffffff','#c8f0ff','#7fd8ff'],bb:['#b8ecfa','#1e4a5a','#06101a'],
   halo:'#d4f6ff',halo2:'#a8e8ff',parts:['#e8fbff','#ffd77a'],ring:['#d4f6ff','#7fd8ff','#ffd77a'],
   back:(q,u)=>bars(18,142,20,206,9,.18)+floatKeys([[20,60,-20],[140,52,25],[24,120,10],[136,112,-15]],u)
     +(u>=2?`<g opacity=".5">${chainPath(q,[[10,10],[22,60],[18,110]],1.1)}${chainPath(q,[[150,14],[138,64],[142,112]],1.1)}</g>`:'')
     +(u>=3?`<g opacity=".55"><circle cx="80" cy="36" r="30" fill="none" stroke="#7fd8ff" stroke-width="1"/><path d="M76 30a4 4 0 1 1 8 0l-1.6 3 2 9h-8.8l2-9z" fill="#7fd8ff" opacity=".5"/></g>`:''),
   content:(q,u)=>{let s='';
    s+=HG(hairBack(q));
    /* les pans du long manteau, doublés de rouille */
    s+=P('M58.6 64Q44 104 45 184L66.4 190L72.6 122H87.4L93.6 190L115 184Q116 104 101.4 64Z',CO(q));
    s+=P('M72.6 122L66.4 190L72.6 188.4L77.4 126Z',RU(q))+P('M87.4 122L93.6 190L87.4 188.4L82.6 126Z',RU(q));
    s+=L_('M50 120Q48 150 49 182M110 120Q112 150 111 182','#0a242e',.6,'opacity=".8"')+L_('M45 184L66.4 190M115 184L93.6 190',RU(q),1);
    /* jambes : pantalon sombre, hautes bottes à bout de fer */
    s+=P('M68.4 128L77.6 128L76.6 176L69.2 176Z',BO(q))+P('M82.4 128L91.6 128L90.8 176L83.4 176Z',BO(q));
    s+=P('M66.8 168L78.4 168L78.8 205L64.6 208Q64 196 66.8 168Z','#100c14')+P('M81.6 168L93.4 168L96.6 205L82.4 208Z','#100c14');
    s+=L_('M67 172H78.2M81.8 172H93.2','#3a3442',.8)+[178,186,194].map(y=>C_(77.2,y,.7,IR(q))+C_(92.6,y,.7,IR(q))).join('');
    s+=P('M64.2 205L78.8 203.4L79 210.6L61 212Q61.2 207.6 64.2 205Z',IR(q))+P('M82.4 205L96.4 203.6L99.6 210.4L82 212Z',IR(q));
    /* ceinture et trousseau */
    s+=P('M61 108Q80 114.6 99 108L99.6 116.4Q80 123 60.4 116.4Z','#2a1e1a')+L_('M61 110Q80 116.6 99 110','#5a4438',.5)+`<rect x="76.6" y="110.6" width="6.8" height="6" rx="1" fill="none" stroke="${IR(q)}" stroke-width="1.2"/>`;
    s+=ring(q,104,126,u);
    /* le manteau fermé sur la poitrine */
    s+=P('M62 64Q80 58.6 98 64L99.6 96Q97 108 80 110Q63 108 60.4 96Z',CO(q));
    s+=P('M74 64L86 64L84 108L80 110L76 108Z','#1a1420')+L_('M74 64L76 108M86 64L84 108',RU(q),.8);
    s+=[76,84,92,100].map(y=>C_(72.6,y,.9,IR(q))+C_(87.4,y,.9,IR(q))).join('');
    /* le haut col */
    s+=P('M70 58Q67.6 64 69.6 72L74.6 70Q73.4 64 74.6 60Z',RU(q))+P('M90 58Q92.4 64 90.4 72L85.4 70Q86.6 64 85.4 60Z',RU(q));
    s+=P('M68 56.6Q64.6 64 67.6 74L70.6 73Q68.6 64 70.6 57.4Z',CO(q))+P('M92 56.6Q95.4 64 92.4 74L89.4 73Q91.4 64 89.4 57.4Z',CO(q));
    /* la clé bleue */
    s+=C_(80,82,7,KG(q),`opacity="${.5+u*.15}"`)+L_('M76 64Q80 76 84 64','#3a2a20',.6)+key(80,79,1.1,0,'#7fd8ff',1.4)+C_(80,79,1,'#ffffff');
    /* la chaîne en bandoulière */
    s+=chainPath(q,[[64,68],[80,90],[97,110]],.9);
    /* épaules */
    s+=MB(P('M53.6 84Q53.4 73 61.6 67Q67 63.6 71 65.6L67 78Q60 80 53.6 84Z',CO(q))+L_('M54.4 82.4Q55.4 73.4 61.6 68.4',IR(q),.7,'opacity=".8"'));
    /* bras droit : la chaîne tombe de sa main jusqu'au cadenas */
    s+=P('M52.8 78Q47 96 48.6 114L58.2 114.6Q58 96 61.6 82Z',CO(q))+P('M48 110.6L58.8 111.2L58.6 118L48.2 117.4Z',RU(q));
    s+=chainPath(q,[[53,124],[46,146],[40,170],[38,192]],1)+padlock(q,38,198,1.15);
    s+=E_(53.4,123,4.4,3.8,SK(q))+L_('M50.2 124.2Q53.4 126.2 56.6 124.2','#c08a70',.45)+chain(q,50,121,57,125,2,1);
    /* bras gauche : la main sur le trousseau */
    s+=P('M103.6 75Q112 86 114.6 98L106.4 101Q103.4 90 97 82Z',CO(q))+P('M105.4 98.6L114.8 96L116.2 101.4L107.2 104Z',RU(q));
    s+=P('M107.2 103.6L116 101Q117.2 110 110 118L104 115Q108.6 110 107.2 103.6Z',CO(q))+E_(106.6,118.4,4.2,3.6,SK(q));
    s+=HG(face(q,u));
    if(u>=3)s+=`<circle cx="80" cy="36" r="31" fill="none" stroke="#7fd8ff" stroke-width=".8" stroke-dasharray="1.6 3.4" opacity=".8"/>`;
    return s}})}
window.veyPortrait=veyPortrait;window.veyBody=veyBody;
HA.install(VEY,veyPortrait,veyBody,{veyra:()=>veyBody(0,1)});
try{UTH_H[VEY]={n:'Gardienne des Mille Portes',m:'#1e4a5a',s:'#d8b04a',a:'#7fd8ff',e:'#bff0ff',bg:'spirit',w:null,hat:null,fx:'stars',c:'#7fd8ff',c2:'#ffd77a',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('veyra art',e)}})();

/* ---------- Trousseau, Cadenas, et l'ultime qui ouvre tout ---------- */
(function(){try{
if(!HEROES[VEY])return;
const CY='#7fd8ff',CY2='#bff0ff',GLD='#ffd77a',IRN='#c8ced8',WH='#f2fbff';
const KMAX=5,KPCT=12,CAD=200,FREE=20;
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const isV=u=>!!u&&u.hid===VEY;
const snd=(k,d,v)=>{try{if(typeof AU!=='undefined'&&AU&&AU.ctx&&cSnd.ok()&&SND[k])SND[k](AU.F.v,NOW(d||0),v||1)}catch(e){}};
let CAST=null;
function keyC(c,x,y,s,a,col){c.save();c.translate(x,y);c.rotate(a);c.scale(s,s);c.strokeStyle=col;c.lineWidth=1.4;c.beginPath();c.arc(0,0,2.6,0,6.283);c.moveTo(0,2.6);c.lineTo(0,11.6);c.moveTo(0,8.6);c.lineTo(2.6,8.6);c.moveTo(0,10.8);c.lineTo(3.2,10.8);c.stroke();c.restore()}
function lockC(c,x,y,s,col,open){c.save();c.translate(x,y);c.scale(s,s);c.strokeStyle=col;c.lineWidth=1.6;c.beginPath();if(open){c.moveTo(-3.4,-1);c.lineTo(-3.4,-4.4);c.quadraticCurveTo(-3.4,-8,0,-8);c.quadraticCurveTo(3.4,-8,3.4,-5.6)}else{c.moveTo(-3.4,-1);c.lineTo(-3.4,-4.4);c.quadraticCurveTo(-3.4,-8,0,-8);c.quadraticCurveTo(3.4,-8,3.4,-4.4);c.lineTo(3.4,-1)}c.stroke();
  c.fillStyle=col;c.beginPath();c.moveTo(-5,-1.4);c.lineTo(5,-1.4);c.lineTo(5,6.4);c.lineTo(-5,6.4);c.closePath();c.fill();c.fillStyle='#1a2230';c.beginPath();c.arc(0,2.2,1.1,0,6.283);c.fill();c.restore()}
/* les clés et le Cadenas passent par les attaques normales ; l'ultime profite des clés */
{const d0=deal;deal=function(s,t,pct,o){o=o||{};
  const vb=isV(s)&&t&&t.hp>0&&s.side!==t.side&&!o.sk&&!o.ct&&!o.ub&&('force' in o)&&pct===100;
  let p=pct,cad=false;
  try{if(vb&&(s.keys||0)>=KMAX){cad=true;p=CAD}if(CAST&&s===CAST&&o.sk)p=p*(1+KPCT/100*Math.min(KMAX,s.keys||0))}catch(e){}
  const d=d0.call(this,s,t,p,o);
  try{if(vb){if(cad){s.keys=0;let held=false;if(t.hp>0&&(!t.boss||Math.random()<.5)){t.stun=Math.max(t.stun||0,1);held=true}
      log(`🔒 <b>${s.name}</b> referme le <b>Cadenas</b> sur ${t.name}${held?' : enchaîné, il passe son prochain tour':''} (${fmt(d)}).`,'sk');
      if(ok()){const a=uc(s),b=uc(t);fxItem(420,(c,p)=>{const g=Math.min(1,p*2.2),al=p>.7?(1-p)/.3:1;c.globalAlpha=al;c.strokeStyle=IRN;c.lineWidth=2.6;c.setLineDash([5,3]);c.beginPath();c.moveTo(a.x,a.y);c.lineTo(a.x+(b.x-a.x)*g,a.y+(b.y-a.y)*g);c.stroke();c.setLineDash([]);c.globalCompositeOperation='lighter';c.globalAlpha=al*.35;c.strokeStyle=CY;c.lineWidth=7;c.stroke()});
        fxItem(700,(c,p)=>{c.globalAlpha=p>.7?(1-p)/.3:1;lockC(c,b.x,b.y-b.s*.1,b.s*.045*(p<.2?.6+p*2:1),GLD,false)},180);snd('bonk',.18,1);ringFx(b.x,b.y,CY,b.s*.6,420,4,1,180);if(held)float(t,'🔒 Enchaîné','info')}}
    else s.keys=Math.min(KMAX,(s.keys||0)+1)}}catch(e){}
  return d}}
{const sk0=skill;skill=function(u,sk,sc){if(!(isV(u)&&sk&&sk.fx&&sk.fx.unlock&&B))return sk0.apply(this,arguments);
  const br=[];try{for(const t of alive(1-u.side)){let x=0;if(t.sh>0){t.sh=0;x|=1}if(t.taunt>0){t.taunt=0;x|=2}if(t.guard>0){t.guard=0;x|=4}if(x){br.push(t);if(!B.skip)float(t,'🔓 Ouvert','info')}}}catch(e){}
  B.vyBr=br;CAST=u;let r;try{r=sk0.apply(this,arguments)}finally{CAST=null}
  try{const k=u.keys||0;if(br.length)log(`🔓 <b>${u.name}</b> ouvre toutes les portes : ${br.map(t=>t.name).join(', ')} ${br.length>1?'perdent':'perd'} leurs protections (boucliers, provocation, serment).`,'sk');
    if(k)log(`🔑 ${k} clé${k>1?'s':''} au trousseau : +${k*KPCT} % de dégâts.`,'sk');u.keys=Math.min(KMAX,k+1);
    for(const a of alive(u.side))if(a!==u)a.en=Math.min(100,(a.en||0)+FREE);log(`🗝️ Libérés, ses alliés gagnent <b>+${FREE} énergie</b>.`,'sk')}catch(e){}
  return r}}
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B)for(const u of B.units){if(!isV(u))continue;const el=document.getElementById('u-'+u.key);if(!el)continue;
  const k=u.keys||0;el.classList.toggle('vyfull',k>=KMAX&&u.hp>0);if(k&&u.hp>0){const sx=el.querySelector('.sx');if(sx&&!sx.querySelector('.vytg'))sx.insertAdjacentHTML('beforeend',`<span class="vytg" style="color:${k>=KMAX?'#ffd77a':'#9fe4ff'}">${k>=KMAX?'🔒 CADENAS':'🔑'+k}</span>`)}}}catch(e){}return r}}

/* ---------- l'ultime : Toutes les portes s'ouvrent ---------- */
LEG2[VEY]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,fm=rowMid(1-u.side),am=rowMid(u.side),br=(B&&B.vyBr)||[];
  vignette('#03101a',2000,.66);try{dimOn(.62)}catch(e){}
  /* le trousseau tinte */
  for(let i=0;i<3;i++)snd('chime',i*.09,.7);
  fxItem(900,(c,p)=>{const al=p<.2?p/.2:p>.8?(1-p)/.2:1;c.globalAlpha=al;for(let k=0;k<5;k++){const an=p*5+k*1.257;keyC(c,a.x+Math.cos(an)*a.s*.55,a.y-a.s*.1+Math.sin(an)*a.s*.3,a.s*.05,an,k%2?GLD:CY2)}});
  /* le mur de la prison descend sur eux */
  const bx0=Math.max(8,fm.x-W*.46),bx1=Math.min(W-8,fm.x+W*.46),by0=fm.y-fm.s*.95,by1=fm.y+fm.s*.75,N=Math.max(7,Math.round((bx1-bx0)/34));
  let open=0;
  fxItem(2100,(c,p)=>{const al=Math.min(1,p/.18)*(open?Math.max(0,1-open):1),dy=open?-open*(by1-by0)*1.1:0;if(al<=0)return;c.globalAlpha=al*.8;
    for(let i=0;i<N;i++){const x=bx0+(bx1-bx0)*i/(N-1);const g=c.createLinearGradient(x-4,0,x+4,0);g.addColorStop(0,'#2a3644');g.addColorStop(.5,'#c8d4e4');g.addColorStop(1,'#1a2430');c.fillStyle=g;c.fillRect(x-3.4,by0+dy,6.8,by1-by0)}
    c.fillStyle='#2a3644';c.fillRect(bx0-6,by0+dy+6,bx1-bx0+12,7);c.fillRect(bx0-6,by1+dy-14,bx1-bx0+12,7)});
  await fxWait(560);if(!B)return;
  /* la chaîne tournoie, traînée bleue */
  fxItem(520,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=Math.sin(p*Math.PI);c.strokeStyle=CY;c.lineWidth=4;c.setLineDash([6,4]);c.lineDashOffset=-p*80;c.beginPath();c.ellipse(a.x,a.y-a.s*.2,a.s*.75,a.s*.32,0,p*6,p*6+5);c.stroke();c.setLineDash([])});
  snd('slash',.1,.8);await fxWait(420);if(!B)return;
  /* elle fouette toute la ligne : un éclair bleu et un « clac » par ennemi */
  const T=tg.slice().sort((p1,p2)=>uc(p1).x-uc(p2).x);
  T.forEach((t,i)=>{const b=uc(t),dl=i*110;
    fxItem(260,(c,p)=>{const g=Math.min(1,p*1.6);c.globalAlpha=p>.6?(1-p)/.4:1;c.strokeStyle=IRN;c.lineWidth=3;c.setLineDash([5,3]);c.beginPath();const mx=(a.x+b.x)/2,my=Math.min(a.y,b.y)-H*.12;c.moveTo(a.x,a.y);
      const ex=a.x+(b.x-a.x)*g,ey=a.y+(b.y-a.y)*g;c.quadraticCurveTo(mx,my,ex,ey);c.stroke();c.setLineDash([]);c.globalCompositeOperation='lighter';c.globalAlpha*=.4;c.strokeStyle=CY;c.lineWidth=8;c.stroke()},dl);
    setTimeout(()=>{if(!B||!FXS.ctx)return;flash(CY,120,.25);ringFx(b.x,b.y,CY,b.s*.6,400,4);sparks(b.x,b.y,CY2,10,6,2,20);snd('bonk',0,.9);
      fxItem(520,(c,p)=>{c.globalAlpha=p>.6?(1-p)/.4:1;lockC(c,b.x,b.y-b.s*.45,b.s*.04,GLD,p>.35)});
      if(br.includes(t))shapes(b.x,b.y,'tri',[CY,CY2,'#ffffff'],14,6,4,40,.2,{});
      hit(X,t,1.25)},(dl+200)/S.speed)});
  await fxWait(T.length*110+420);if(!B)return;
  /* toutes les portes s'ouvrent */
  fxItem(700,(c,p)=>{open=ease(p)});flash('#e8f8ff',220,.5);shake(2);camPunch(fm,1.05,380);snd('boom',0,.7);
  /* la pluie de clés d'or sur l'équipe ; les chaînes des alliés tombent */
  for(const al of alive(u.side)){const b=uc(al);for(let k=0;k<3;k++){const x0=b.x+rnd(-b.s*.4,b.s*.4),rot=rnd(-1,1);fxItem(800,(c,p)=>{c.globalAlpha=p>.75?(1-p)/.25:1;keyC(c,x0,b.y-b.s*1.1+p*b.s*1.1,b.s*.042,rot+p*2,GLD)},k*120+rnd(0,120))}
    glows(b.x,b.y,[GLD,CY2],10,3,4,30)}
  await fxWait(520);if(!B)return;
  /* la clé bleue s'allume */
  glowPulse(a.x,a.y-a.s*.05,CY,640,a.s*.5);ringFx(a.x,a.y,CY,a.s*.9,600,4);
  await fxWait(420)};

/* ---------- textes ---------- */
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.unlock)r+=` Avant de frapper, elle <b>ouvre toutes les portes</b> : les ennemis perdent leurs <b>boucliers</b>, leur <b>provocation</b> et leur <b>serment</b>. Chaque clé de son trousseau ajoute <b>+${KPCT} % de dégâts</b>. Libérés, ses alliés gagnent <b>+${FREE} énergie</b>.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill vypas"><div class="sn">🔑 Trousseau</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Chaque attaque normale et chaque ultime lui donne <b>une clé</b> (5 au maximum). À 5 clés, sa prochaine attaque normale devient le <b>Cadenas</b> : ${CAD} % de son ATQ, et la cible est <b>enchaînée</b> (elle passe son tour ; une chance sur deux contre un boss). Le Cadenas utilise les 5 clés.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===VEY){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk&&!mo.querySelector('.vypas'))sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`
#battle .u.vyfull .pt{box-shadow:0 0 0 2px #ffd77a,0 0 14px rgba(255,215,122,.55)}
.skill.vypas{border-color:rgba(127,216,255,.5)!important;background:linear-gradient(135deg,rgba(127,216,255,.14),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{if(typeof STL!=='undefined')STL[VEY]=["Veyra était la geôlière de la prison du Tribunal des Lames. Mille cellules, mille clés, et elle savait laquelle ouvrait quoi les yeux fermés.",
  "Le soir où le Tribunal est tombé, un prisonnier lui a dit, en pleurant : « Ouvre, je suis innocent, ils vont nous laisser mourir ici. » Elle a ouvert toutes les portes. Les innocents et les monstres sont partis ensemble dans la nuit.",
  "Depuis, elle les ramène un par un. Le dernier, c'était celui qui pleurait. Il n'avait jamais été innocent : c'est lui qui avait tout préparé. Elle l'a enfermé pour de bon, et elle garde la clé bleue autour du cou pour ne jamais oublier qu'elle l'avait cru."]}catch(e){}
try{if(typeof VOXD!=='undefined')VOXD[VEY]=['f','normal',["Veyra. J'ai mille clés, et je sais où va chacune.","Toutes les portes finissent par se refermer.","Toutes les portes s'ouvrent !"]]}catch(e){}
try{const X={'Veyra aux Mille Clés':'Veyra of the Thousand Keys',"Toutes les portes s'ouvrent":'Every Door Opens','Gardienne des Mille Portes':'Keeper of a Thousand Doors','🔑 Trousseau':'🔑 Key Ring','🔓 Ouvert':'🔓 Opened','🔒 Enchaîné':'🔒 Chained','🔒 CADENAS':'🔒 PADLOCK',
  [`Avant de frapper, elle <b>ouvre toutes les portes</b> : les ennemis perdent leurs <b>boucliers</b>, leur <b>provocation</b> et leur <b>serment</b>. Chaque clé de son trousseau ajoute <b>+${KPCT} % de dégâts</b>. Libérés, ses alliés gagnent <b>+${FREE} énergie</b>.`]:`Before striking, she <b>opens every door</b>: enemies lose their <b>shields</b>, their <b>taunt</b> and their <b>oath</b>. Each key on her ring adds <b>+${KPCT} % damage</b>. Set free, her allies gain <b>+${FREE} energy</b>.`,
  [`Chaque attaque normale et chaque ultime lui donne <b>une clé</b> (5 au maximum). À 5 clés, sa prochaine attaque normale devient le <b>Cadenas</b> : ${CAD} % de son ATQ, et la cible est <b>enchaînée</b> (elle passe son tour ; une chance sur deux contre un boss). Le Cadenas utilise les 5 clés.`]:`Each normal attack and each ultimate gives her <b>a key</b> (5 at most). At 5 keys, her next normal attack becomes the <b>Padlock</b>: ${CAD} % of her ATK, and the target is <b>chained</b> (it skips its turn; one chance in two against a boss). The Padlock uses all 5 keys.`,
  "Veyra était la geôlière de la prison du Tribunal des Lames. Mille cellules, mille clés, et elle savait laquelle ouvrait quoi les yeux fermés.":"Veyra was the jailer of the Court of Blades prison. A thousand cells, a thousand keys, and she knew which opened what with her eyes closed.",
  "Le soir où le Tribunal est tombé, un prisonnier lui a dit, en pleurant : « Ouvre, je suis innocent, ils vont nous laisser mourir ici. » Elle a ouvert toutes les portes. Les innocents et les monstres sont partis ensemble dans la nuit.":"The night the Court fell, a prisoner told her, in tears: “Open up, I'm innocent, they'll leave us here to die.” She opened every door. The innocent and the monsters fled together into the night.",
  "Depuis, elle les ramène un par un. Le dernier, c'était celui qui pleurait. Il n'avait jamais été innocent : c'est lui qui avait tout préparé. Elle l'a enfermé pour de bon, et elle garde la clé bleue autour du cou pour ne jamais oublier qu'elle l'avait cru.":"Since then she has brought them back one by one. The last one was the one who cried. He had never been innocent: he was the one who planned it all. She locked him away for good, and she wears the blue key around her neck so she never forgets she believed him.",
  "Veyra. J'ai mille clés, et je sais où va chacune.":"Veyra. I have a thousand keys, and I know where each one goes.","Toutes les portes finissent par se refermer.":"Every door closes in the end.","Toutes les portes s'ouvrent !":"Every door opens!"};Object.assign(I18N_EN,X);for(const k in X)if(k.includes('<')&&window.RDEput)RDEput(k,X[k])}catch(e){}
}catch(e){console.warn('veyra kit',e)}})();
