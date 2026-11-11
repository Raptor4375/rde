/* ================= V406 : Le Scribe sans Nom — vrai design + animations d'encre =================
   · un personnage entier (comme Éryndel ou Corvin) au lieu d'une silhouette : robe d'encre couverte d'écriture,
     visage de parchemin raturé, plume géante, grimoire flottant et lettres en orbite ;
   · toutes les créatures d'encre du Livre IV ont leurs propres animations de combat :
     traits de plume, éclaboussures, lettres qui volent, et pour le Scribe une rature géante. */
(function(){try{

/* ---------- l'art ---------- */
const LETT=['A','e','L','r','m','o','N','i','s','u'];
function scribeArt(q,o){o=o||{};const O='stroke="#07040f" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round"',
 P2='#e2d6ba',ink='#141028',ink2='#241a44',vio='#b89aff';
 const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
 /* petites lignes d'écriture manuscrite */
 const wr=(x,y,w,n,op,col)=>{let s='';for(let i=0;i<n;i++){const yy=(y+i*4.6).toFixed(1),ww=w*(.6+((i*53)%11)/14),u=(ww/4).toFixed(1);
   s+=`<path d="M${x} ${yy}q${u} -1.6 ${(ww/2).toFixed(1)} 0t${(ww/2).toFixed(1)} 0" stroke="${col||'#b4a2e4'}" stroke-width=".85" fill="none" opacity="${op||.3}"/>`}return s};
 let s=`<defs>
  <linearGradient id="${q}r" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#2c2152"/><stop offset=".5" stop-color="${ink}"/><stop offset="1" stop-color="#07040f"/></linearGradient>
  <linearGradient id="${q}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${ink2}"/><stop offset="1" stop-color="#0b0718"/></linearGradient>
  <linearGradient id="${q}p" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fffaf0"/><stop offset="1" stop-color="${P2}"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="#8a6aff" stop-opacity=".5"/><stop offset="1" stop-color="#8a6aff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}e"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="${vio}"/><stop offset="1" stop-color="#3e1f96"/></radialGradient></defs>`;
 s+=`<ellipse cx="80" cy="104" rx="76" ry="100" fill="url(#${q}g)"/>`;
 /* lettres en orbite */
 s+=LETT.slice(0,o.bust?4:6).map((c,i)=>`<text font-family="Georgia,serif" font-style="italic" font-size="${11+(i%3)*4}" fill="${i%2?'#cfbcff':'#9a7aff'}" opacity=".7">${c}<animateMotion dur="${14+i*2.4}s" begin="${-i*2.3}s" repeatCount="indefinite" path="M80 104m-64 0a64 86 0 1 ${i%2?0:1} 128 0a64 86 0 1 ${i%2?0:1} -128 0"/>${A('opacity','.15;.8;.15',7+i,-i)}</text>`).join('');
 /* flaque d'encre au sol */
 if(!o.bust)s+=`<ellipse cx="80" cy="212" rx="42" ry="8" fill="#07040f" opacity=".8"/><ellipse cx="50" cy="216" rx="8" ry="2.6" fill="#07040f" opacity=".55"/><ellipse cx="112" cy="214" rx="10" ry="3" fill="#07040f" opacity=".55"/>`;
 /* robe */
 s+=`<path d="M60 72Q80 63 100 72L108 130Q116 178 119 201Q80 212 41 201Q44 178 52 130Z" fill="url(#${q}r)" ${O}/>`;
 s+=`<path d="M80 70V206" stroke="#352864" stroke-width="1.1" opacity=".7"/>`;
 s+=wr(52,104,22,6,.26)+wr(92,120,20,5,.22)+wr(58,152,18,4,.2)+wr(92,166,16,3,.18);
 /* l'ourlet se dissout en encre */
 s+=`<path d="M41 198q39 13 78 0l0 6q-5 10-10 1t-9 4-8-4-9 6-9-6-8 5-9-4-8 3-8-5Z" fill="#07040f"/>`;
 s+=[[53,210,5],[68,214,4],[94,213,4.5],[109,209,5]].map(([x,y,h],i)=>`<g><path d="M${x-1.6} ${y}q1.6 ${h} 3.2 0q-1.6 ${(h*.45).toFixed(1)} -3.2 0Z" fill="#07040f"/><animateTransform attributeName="transform" type="translate" values="0 0;0 ${h+4};0 0" dur="${(2.6+i*.55).toFixed(1)}s" repeatCount="indefinite"/>${A('opacity','1;0;1',2.6+i*.55)}</g>`).join('');
 /* bras gauche : manche large, main ouverte, grimoire qui flotte */
 s+=`<path d="M62 74Q49 88 44 110Q41 123 48 129L62 124Q54 114 58 102Q62 88 71 80Z" fill="url(#${q}s)" ${O}/>`;
 s+=`<ellipse cx="52" cy="128" rx="5.2" ry="4.4" fill="url(#${q}p)" ${O}/>`;
 s+=`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -5;0 0" dur="4.8s" repeatCount="indefinite"/>
   <g transform="translate(37 146) rotate(-8)"><ellipse rx="27" ry="15" fill="url(#${q}g)"/>
   <path d="M-21 -2Q-10.5 -9 0 -3.5Q10.5 -9 21 -2L19 13Q9.5 7.5 0 13Q-9.5 7.5 -19 13Z" fill="url(#${q}p)" ${O}/><path d="M0 -3.5V13" stroke="#a89878" stroke-width="1.1"/>
   ${wr(-17,1.5,13,3,.8,'#6a5a8a')}${wr(3.5,.5,13,3,.8,'#6a5a8a')}</g></g>`;
 s+=`<g><path d="M50 132q2.2 5.4 0 9.6q-2.2-4.2 0-9.6Z" fill="#07040f"/><animateTransform attributeName="transform" type="translate" values="0 0;0 12;0 0" dur="3.4s" repeatCount="indefinite"/>${A('opacity','1;0;1',3.4)}</g>`;
 /* bras droit levé + plume géante */
 s+=`<path d="M98 74Q113 79 121 93Q127 103 122 110L110 105Q115 98 110 91Q104 82 92 79Z" fill="url(#${q}s)" ${O}/>`;
 s+=`<ellipse cx="118" cy="107" rx="5.6" ry="4.8" fill="url(#${q}p)" ${O}/>`;
 s+=`<g transform="translate(118 107)"><g><animateTransform attributeName="transform" type="rotate" values="14;8;14" dur="5.2s" repeatCount="indefinite"/>
   <path d="M1 3L3 -2L0 -10" stroke="#07040f" stroke-width="2.8" fill="none"/>
   <path d="M0 -10Q-15 -42 -7 -82Q11 -61 13 -32Q13 -17 0 -10Z" fill="url(#${q}p)" ${O}/>
   <path d="M0 -10Q-4 -46 -7 -82" stroke="#b8a888" stroke-width="1.2" fill="none"/>
   ${[...Array(10)].map((_,i)=>`<path d="M${(-2.6-i*.38).toFixed(1)} ${(-20-i*6).toFixed(0)}L${(3.4+i*.75).toFixed(1)} ${(-25-i*6).toFixed(0)}" stroke="#c8b8a0" stroke-width=".7"/>`).join('')}</g>
   <g><circle cx="1" cy="6" r="2.1" fill="#07040f"/><animateTransform attributeName="transform" type="translate" values="0 0;0 18;0 0" dur="2.9s" repeatCount="indefinite"/>${A('opacity','1;0;1',2.9)}</g></g>`;
 /* col de papier déchiré */
 s+=`<path d="M63 66Q80 75 97 66L100 77L95.4 73L91.6 80L87.4 73.4L83 81L79 73.6L74.6 80L70.8 73L67 78Z" fill="url(#${q}p)" ${O}/>`;
 /* capuche */
 s+=`<path d="M57 64Q45 20 80 7Q115 20 103 64Q92 74 80 75Q68 74 57 64Z" fill="url(#${q}r)" ${O}/>`;
 s+=`<path d="M80 7q7-11 17-12q-9 8-10 18Z" fill="${ink}" ${O}/>`;
 s+=`<path d="M62 60Q53 27 80 17Q107 27 98 60Q91 51 80 50.4Q69 51 62 60Z" fill="#0a0620" opacity=".85"/>`;
 /* visage de parchemin raturé */
 s+=`<ellipse cx="80" cy="49" rx="13.4" ry="14.8" fill="url(#${q}p)" ${O}/>`;
 s+=`<path d="M69.6 38.6H90.4M69 42.6H91M69.6 56H90.4M70.6 59.8H89.4" stroke="#a294b8" stroke-width=".8" opacity=".6"/>`;
 s+=`<path d="M67.6 41.4L92.8 37.4M68.4 58.8L92.2 54.6" stroke="#2e2448" stroke-width="1.5"/>`;
 /* ombre de la capuche */
 s+=`<path d="M67 42Q80 32 93 42Q80 37.5 67 42Z" fill="#0a0620" opacity=".4"/>`;
 /* yeux */
 s+=`<path d="M69.6 49.6q4.6-5.4 9.2 0q-4.6 5.4-9.2 0ZM81.2 49.6q4.6-5.4 9.2 0q-4.6 5.4-9.2 0Z" fill="#0d0620"/>`;
 s+=`<circle cx="74.2" cy="49.6" r="6" fill="url(#${q}g)"/><circle cx="85.8" cy="49.6" r="6" fill="url(#${q}g)"/>`;
 s+=`<circle cx="74.2" cy="49.6" r="2.3" fill="url(#${q}e)">${A('r','1.6;2.5;1.6',2.4)}</circle><circle cx="85.8" cy="49.6" r="2.3" fill="url(#${q}e)">${A('r','1.6;2.5;1.6',2.4,-.5)}</circle>`;
 /* taches d'encre */
 s+=`<circle cx="89.4" cy="52.6" r="1.4" fill="#352a52" opacity=".5"/><circle cx="71" cy="54" r=".95" fill="#352a52" opacity=".42"/>`;
 return s}
const SBC={};
function scribeBody(){if(SBC.b)return SBC.b;return SBC.b=`<svg class="loresvg hb" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Le Scribe sans Nom">${scribeArt('sb')}</svg>`}
window.scribeBody=scribeBody;
try{MONS['Le Scribe sans Nom']=()=>`<g transform="translate(-10.4 4.5) scale(.746)">${scribeArt('sm',{bust:1})}</g>`}catch(e){}
/* le Scribe apparaît en pied dans l'histoire */
try{const sf=sagaFig;sagaFig=function(w){if(w==='scribe')return`<div class="sgfig lore scribef">${scribeBody()}</div>`;return sf.apply(this,arguments)}}catch(e){}
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{const a=L.find(x=>x.k==='livre4');if(a)a.art=()=>`<div class="skann l4ann">${scribeBody()}</div>`}catch(e){}return L}}catch(e){}

/* ---------- animations d'encre ---------- */
const MONFX={};window.MONFX=MONFX;
const IK='#141028',IK2='#3a2a6a',VI='#b89aff',PAP='#f4ecd8';
const fxOK=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const F=(ms,fn)=>setTimeout(()=>{if(fxOK())try{fn()}catch(e){}},ms/((typeof S!=='undefined'&&S.speed)||1));
/* une éclaboussure d'encre */
function splat(x,y,k,col){k=k||1;const n=Math.round(7*k),c0=col||IK;
  fxItem(420,(c,p)=>{const g=Math.min(1,p*4),al=p>.6?(1-p)/.4:1;c.translate(x,y);
    const blob=(r0,r1)=>{c.beginPath();c.arc(0,0,r0,0,7);c.fill();for(let i=0;i<6;i++){const a=i*1.047+x*.01,r=(13+(i%3)*7)*k*g;c.beginPath();c.arc(Math.cos(a)*r,Math.sin(a)*r*.8,r1-(i%3)*.5*k,0,7);c.fill()}};
    c.globalCompositeOperation='lighter';c.globalAlpha=al*.45;c.fillStyle=VI;blob(12.4*k*g,3.8*k);
    c.globalCompositeOperation='source-over';c.globalAlpha=al;c.fillStyle=c0;blob(10*k*g,2.6*k)});
  emit(n,i=>({k:'shape',sh:'drop',x,y,vx:rnd(-3.4,3.4)*k,vy:rnd(-4.2,1)*k,g:.28,drag:.95,life:34,max:34,s:rnd(2.4,4.6)*k,c:i%3?c0:VI,rot:rnd(0,6),vr:rnd(-.2,.2),fade:1.6}))}
/* des lettres qui s'envolent */
function letters(x,y,n,col,sp){const ctx=FXS.ctx;if(!ctx)return;
  for(let i=0;i<(n||6);i++){const ch=LETT[(i*3+((x|0)%7))%LETT.length],a=-1.6+rnd(-1.1,1.1),v=(sp||2.6)*rnd(.6,1.3),vx=Math.cos(a)*v,vy=Math.sin(a)*v,sz=rnd(10,17),ro=rnd(-.5,.5);
    fxItem(700,(c,p)=>{c.globalAlpha=(1-p)*.95;c.translate(x+vx*p*46,y+vy*p*46+p*p*22);c.rotate(ro+p*1.4);c.font=`italic ${sz}px Georgia,serif`;c.textAlign='center';c.fillStyle=col||VI;c.fillText(ch,0,0)})}}
/* un grand trait de plume qui s'écrit */
function stroke(pts,col,w,dur,delay,noGlow){fxItem(dur||420,(c,p)=>{const g=Math.min(1,p*1.5),al=p>.72?(1-p)/.28:1,n=pts.length;
  const path=()=>{c.beginPath();for(let i=0;i<n;i++){const t=i/(n-1);if(t>g){const q=pts[i-1],r=pts[i],u=(g-(i-1)/(n-1))*(n-1);c.lineTo(q[0]+(r[0]-q[0])*u,q[1]+(r[1]-q[1])*u);break}i?c.lineTo(pts[i][0],pts[i][1]):c.moveTo(pts[i][0],pts[i][1])}c.stroke()};
  c.lineCap='round';c.lineJoin='round';
  if(!noGlow){c.globalCompositeOperation='lighter';c.globalAlpha=al*.4;c.strokeStyle=VI;c.lineWidth=(w||7)*2.1;path()}
  c.globalCompositeOperation='source-over';c.globalAlpha=al;c.strokeStyle=col||IK;c.lineWidth=w||7;path()},delay)}
/* une phrase qui s'écrit à la plume */
function cursive(x0,x1,y,col,w,dur,delay,seed){const n=54,pts=[];let h=(seed||1)*9301;
  const R=()=>{h=(h*9301+49297)%233280;return h/233280};
  for(let i=0;i<=n;i++){const t=i/n,x=x0+(x1-x0)*t,lo=i%6;
    pts.push([x,y+Math.sin(i*1.35)*5.2-(lo===0?4:0)+(lo===3?3:0)+(R()-.5)*1.6])}
  fxItem(dur||620,(c,p)=>{const g=Math.min(1,p*1.25),al=p>.8?(1-p)/.2:1;c.globalAlpha=al;c.strokeStyle=col||IK;c.lineWidth=w||2.6;c.lineCap='round';c.lineJoin='round';
    let hx=pts[0][0],hy=pts[0][1];c.beginPath();c.moveTo(hx,hy);
    for(let i=1;i<=n;i++){const t=i/n;if(t>g){const q=pts[i-1],r=pts[i],u=(g-(i-1)/n)*n;hx=q[0]+(r[0]-q[0])*u;hy=q[1]+(r[1]-q[1])*u;c.lineTo(hx,hy);break}c.lineTo(pts[i][0],pts[i][1]);hx=pts[i][0];hy=pts[i][1]}
    c.stroke();
    if(g<1){c.globalAlpha=al;c.translate(hx,hy);c.rotate(-.45);c.fillStyle='#fffaf0';c.strokeStyle='#6a5a4a';c.lineWidth=1;
      c.beginPath();c.moveTo(0,0);c.quadraticCurveTo(-5,-13,-2,-26);c.quadraticCurveTo(5,-18,5,-9);c.quadraticCurveTo(5,-3,0,0);c.closePath();c.fill();c.stroke()}},delay)}
/* la page blanche : le décor devient du papier réglé */
function pageVeil(dur){fxItem(dur||1500,(c,p)=>{const al=(p<.12?p/.12:p>.8?(1-p)/.2:1)*.84;c.globalAlpha=al;c.fillStyle='#f6efdd';c.fillRect(0,0,FXS.w,FXS.h);
  c.globalAlpha=al*.5;c.strokeStyle='#9ab0d8';c.lineWidth=1;for(let y=18;y<FXS.h;y+=22){c.beginPath();c.moveTo(0,y);c.lineTo(FXS.w,y);c.stroke()}
  c.strokeStyle='#e08a8a';c.beginPath();c.moveTo(FXS.w*.12,0);c.lineTo(FXS.w*.12,FXS.h);c.stroke()})}
function inkSnd(k){try{if(typeof SND==='undefined'||!AU||!AU.ctx)return;SND.slash(AU.F.v,NOW(),.7*(k||1))}catch(e){}}
function splashSnd(k){try{if(typeof SND==='undefined'||!AU||!AU.ctx)return;SND.thud(AU.F.v,NOW(),.8*(k||1))}catch(e){}}

/* -- le Scribe sans Nom -- */
MONFX['Le Scribe sans Nom']={
 basic(s,t,crit){const a=uc(s),b=uc(t),k=crit?1.35:1;inkSnd(k);
   stroke([[a.x,a.y],[(a.x+b.x)/2,(a.y+b.y)/2-b.s*.5],[b.x+b.s*.5,b.y-b.s*.3],[b.x-b.s*.5,b.y+b.s*.3]],IK,5*k,300);
   F(170,()=>{splat(b.x,b.y,.9*k);letters(b.x,b.y-b.s*.2,crit?7:4);sparks(b.x,b.y,VI,7,4,1.6,18)});
   if(crit)F(200,()=>{camPunch(b,1.05,240);stroke([[b.x-b.s*.6,b.y-b.s*.4],[b.x+b.s*.6,b.y+b.s*.4]],IK,7,260)})},
 async ult(u,tg){const a=uc(u),m=rowMid(1-u.side),W=FXS.w,H=FXS.h;
   /* il lève sa plume : le décor devient une page blanche */
   vignette('#2a1a5a',900,.5);glowPulse(a.x,a.y-a.s*.3,VI,600,a.s*.6);await fxWait(220);if(!fxOK())return;
   flash('#f6efdd',260,.7);pageVeil(1600);inkSnd(1.2);
   /* il écrit votre fin sur la page */
   const y0=m.y-m.s*.95;
   cursive(W*.16,W*.9,y0,'#241a46',2.8,700,0,3);
   cursive(W*.16,W*.72,y0+26,'#241a46',2.8,620,340,7);
   await fxWait(760);if(!fxOK())return;
   /* la grande rature */
   letters(W*.5,y0,9,'#3a2a6a',3.4);
   stroke([[W*.04,m.y-m.s*.55],[W*.38,m.y+m.s*.18],[W*.62,m.y-m.s*.3],[W*.98,m.y+m.s*.42]],'#0a0618',17,520);
   stroke([[W*.05,m.y-m.s*.42],[W*.4,m.y+m.s*.3],[W*.64,m.y-m.s*.18],[W*.97,m.y+m.s*.52]],'#1a1038',9,520,70);
   await fxWait(280);if(!fxOK())return;
   stroke([[W*.97,m.y-m.s*.4],[W*.04,m.y+m.s*.38]],'#0a0618',14,460);
   shake(3);splashSnd(1.3);
   for(const t of tg){const b=uc(t);splat(b.x,b.y,1.5);letters(b.x,b.y-b.s*.3,6,'#2a1a4a');cardFlash(t,true);flushFor(t);refreshOne(t);if(t.hp<=0)deathFx(t)}
   await fxWait(360);if(!fxOK())return;
   /* la page se referme : tout retombe en encre */
   for(let i=0;i<10;i++)F(i*55,()=>{const x=rnd(0,W),y=rnd(H*.2,H*.8);splat(x,y,rnd(.4,.9))});
   emit(16,()=>({k:'shape',sh:'drop',x:rnd(0,W),y:rnd(-40,-6),vx:rnd(-.4,.4),vy:rnd(3,5.2),g:.1,life:70,max:70,s:rnd(5,9),c:'#0a0618',rot:0,fade:.8}));
   await fxWait(420)}};
/* -- les autres créatures d'encre et de papier -- */
const INKM={
 "Oiseau d'Encre":{c:IK,w:'aile'},"Corbeau d'Encre":{c:IK,w:'aile'},"Scribe d'Encre":{c:IK,w:'plume'},
 'Effaceur':{c:'#2a2440',w:'gomme'},"Larme d'Encre":{c:'#1a1238',w:'goutte'},"Léviathan d'Encre":{c:'#0e0a24',w:'goutte'},
 'Page Errante':{c:'#c8b88a',w:'papier'},'Plume Tranchante':{c:'#d8c8a8',w:'papier'},'Chevalier de Papier':{c:'#c8b89a',w:'papier'},
 'Gardien des Archives':{c:'#8a6a3a',w:'papier'}};
for(const nm of Object.keys(INKM)){const D=INKM[nm],pap=D.w==='papier';
 MONFX[nm]={
  basic(s,t,crit){const a=uc(s),b=uc(t),k=crit?1.3:1;inkSnd(.8*k);
    if(pap){for(let i=0;i<3;i++)slashLine(b.x+(i-1)*b.s*.16,b.y,b.s*.95*k,i%2?1.25:-1.15,[D.c,'#fffaf0'],220,4,i*45);
      F(120,()=>{shapes(b.x,b.y,'card',[PAP,D.c,'#fffaf0'],Math.round(6*k),4.4,3.4,32,.22,{});letters(b.x,b.y-b.s*.2,3,'#6a5a3a')})}
    else{stroke([[a.x,a.y],[b.x,b.y-b.s*.35],[b.x,b.y+b.s*.1]],D.c,4.4*k,260);
      F(150,()=>{splat(b.x,b.y,.75*k,D.c);letters(b.x,b.y-b.s*.2,3)})}},
  async ult(u,tg){const a=uc(u);vignette(pap?'#6a5a3a':'#1a1038',900,.45);
    await cardMove(u,0,u.side?22:-22,300);if(!fxOK())return;
    ringFx(a.x,a.y,pap?'#e8d8b0':VI,FXS.w*.45,520,6,.45);splashSnd();
    if(!pap)for(let i=0;i<5;i++)F(i*60,()=>{const b=uc(tg[i%tg.length]);stroke([[a.x,a.y],[b.x+rnd(-20,20),b.y+rnd(-20,20)]],D.c,5,280)});
    for(const t of tg){const b=uc(t);
      if(pap){for(let i=0;i<3;i++)slashLine(b.x+(i-1)*b.s*.2,b.y,b.s*1.05,i%2?1.2:-1.2,[D.c,'#fffaf0'],260,5,i*50);shapes(b.x,b.y,'card',[PAP,'#fffaf0',D.c],9,5.4,3.6,34,.24,{})}
      else{splat(b.x,b.y,1.15,D.c);letters(b.x,b.y-b.s*.25,5)}
      cardFlash(t,!!u.boss);flushFor(t);refreshOne(t);if(t.hp<=0)deathFx(t)}
    shake(u.boss?3:2);await fxWait(380)}}}

/* ---------- branchement ---------- */
{const b0=basicFx;basicFx=function(s,t,crit){const A=s&&s.hid==null&&MONFX[s.name];if(!A||!A.basic||!t||!fxOK())return b0.apply(this,arguments);
  try{fxSetup();if(!FXS.ctx)return;A.basic(s,t,!!crit)}catch(e){return b0.apply(this,arguments)}}}
{const m0=monsterUlt;monsterUlt=async function(u,seq){const A=u&&MONFX[u.name];if(!A||!A.ult||!fxOK())return m0.apply(this,arguments);
  const tg=[...new Set(seq)];if(!tg.length)return m0.apply(this,arguments);
  try{await A.ult(u,tg)}catch(e){console.warn('encre',e)}}}

try{window.INKFX={splat,letters,stroke,cursive,pageVeil,ok:fxOK,later:F}}catch(e){}
/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.sgfig.scribef{filter:drop-shadow(0 0 16px rgba(138,106,255,.7))}
.l4ann svg{height:100%;width:auto}`;document.head.appendChild(st);
}catch(e){console.warn('scribe',e)}})();
