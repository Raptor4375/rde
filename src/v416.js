/* ================= V416 : ORGEMME, LE COLOSSE DE VITRAIL =================
   Une rosace de cathédrale à qui on a donné des jambes. La lumière le traverse.
   Plus on le casse, plus il renvoie. */
const ORG=75;
(function(){try{
if(HEROES[ORG]||HEROES.length!==ORG)return;
HEROES.push({i:ORG,n:'Orgemme le Colosse de Vitrail',c:'Tank',r:4,
  sk:{n:'Rose Éclatée',tg:'all',fx:{dmg:110,rose:1,reflect:3,shield:200,taunt:2}}});
try{LOOKS[ORG]=['#4a9ae0','#b02a3a','#e0a83a','#1a1626','#fff6e0','#3a8a6a','bg:holy back:none hair:none eyes:glow mouth:none body:huge ear:none']}catch(e){}
}catch(e){console.warn('orgemme hero',e)}})();

/* ---------- le dessin ---------- */
(function(){try{
if(!HEROES[ORG])return;
const OC={},O='stroke="#120f1c" stroke-width="2" stroke-linejoin="round" stroke-linecap="round"',
 LD='#1a1626',LD2='#2e2a3e',BL='#2e6ab0',BL2='#4a9ae0',RD='#b02a3a',RD2='#e04a4a',GD='#e0a83a',GD2='#ffd87a',GR='#3a8a6a',GR2='#5ac0a0',WL='#fff6e0';
const COLS=[BL,RD,GD,GR,BL2,RD2];
const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
function orgArt(q,u,o){u=Math.max(0,Math.min(3,u|0));o=o||{};
 const CO={bl:['#1e4a92','#3f7fd0'],rd:['#8e1e32','#c8394a'],am:['#c08a22','#f0c457'],em:['#1f6b54','#39a07e']};
 const K=['bl','rd','am','em'];
 const pane=(x,y,w,h,c,op)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${CO[c][0]}" opacity="${op||1}"/><rect x="${x}" y="${y}" width="${w}" height="${(h*.44).toFixed(1)}" fill="${CO[c][1]}" opacity="${(op||1)*.75}"/>`;
 /* une lancette : ogive + barlotières */
 const lanc=(x,w,yt,yb,c,dark)=>{const d=`M${x} ${yb}L${x} ${yt+w*.55}Q${x+w/2} ${yt} ${x+w} ${yt+w*.55}L${x+w} ${yb}Z`;
   let p=`<path d="${d}" fill="${dark?'#07060c':CO[c][0]}" stroke="${LD}" stroke-width="2.4" stroke-linejoin="round"/>`;
   if(!dark){p+=`<path d="${d}" fill="${CO[c][1]}" opacity=".45" transform="translate(0 0)" clip-path="none" style="clip-path:none"/>`;
     p=`<path d="${d}" fill="${CO[c][0]}" stroke="${LD}" stroke-width="2.4" stroke-linejoin="round"/><path d="M${x+1} ${yt+w*.5}Q${x+w/2} ${yt+1.6} ${x+w-1} ${yt+w*.5}L${x+w-1} ${yt+w*1.5}L${x+1} ${yt+w*1.5}Z" fill="${CO[c][1]}" opacity=".7"/>`;
     for(let i=1;i<4;i++)p+=`<path d="M${x} ${yt+w*.55+(yb-yt-w*.55)*i/4}h${w}" stroke="${LD}" stroke-width="2"/>`;
     p+=`<path d="M${x+w/2} ${yt+w*.3}V${yb}" stroke="${LD}" stroke-width="2"/>`}
   else{p+=`<path d="${d}" fill="#ffd87a" opacity=".16">${A('opacity','.05;.4;.05',2.8)}</path>`;
     p+=[0,1,2].map(i=>`<path d="M${x+3+i*(w-6)/2} ${yt+w*.7}V${yb-4}" stroke="#ffe9a8" stroke-width="1.6" opacity=".3"><animate attributeName="opacity" values="0;.55;0" dur="${2.4+i*.5}s" begin="${-i*.6}s" repeatCount="indefinite"/></path>`).join('')}
   return p};
 /* la rosace */
 const rose=(cx,cy,R,miss)=>{let p=`<circle cx="${cx}" cy="${cy}" r="${R+4}" fill="${LD}"/><circle cx="${cx}" cy="${cy}" r="${R+1.6}" fill="#0a0812"/>`;
   const n=12,r0=R*.42;
   for(let k=0;k<n;k++){const a0=k*2*Math.PI/n-Math.PI/2,a1=(k+1)*2*Math.PI/n-Math.PI/2;
     const x0=(cx+Math.cos(a0)*r0).toFixed(1),y0=(cy+Math.sin(a0)*r0).toFixed(1),x1=(cx+Math.cos(a0)*R).toFixed(1),y1=(cy+Math.sin(a0)*R).toFixed(1),x2=(cx+Math.cos(a1)*R).toFixed(1),y2=(cy+Math.sin(a1)*R).toFixed(1),x3=(cx+Math.cos(a1)*r0).toFixed(1),y3=(cy+Math.sin(a1)*r0).toFixed(1);
     const c=K[k%4],gone=miss&&miss.includes(k);
     p+=`<path d="M${x0} ${y0}L${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}L${x3} ${y3}Z" fill="${gone?'#07060c':CO[c][0]}" stroke="${LD}" stroke-width="1.8" stroke-linejoin="round"/>`;
     if(!gone)p+=`<path d="M${x0} ${y0}L${x1} ${y1}A${R} ${R} 0 0 1 ${x2} ${y2}Z" fill="${CO[c][1]}" opacity=".55"/>`}
   p+=`<circle cx="${cx}" cy="${cy}" r="${r0+1.4}" fill="${LD}"/><circle cx="${cx}" cy="${cy}" r="${r0*.9}" fill="url(#${q}e)"/>`;
   p+=`<circle cx="${cx}" cy="${cy}" r="${(r0*.5).toFixed(1)}" fill="${WL}">${A('r',`${(r0*.4).toFixed(1)};${(r0*.62).toFixed(1)};${(r0*.4).toFixed(1)}`,3)}</circle>`;
   p+=`<circle cx="${(cx-r0*.22).toFixed(1)}" cy="${(cy-r0*.22).toFixed(1)}" r="1.5" fill="#fff"/>`;
   return p};
 let s=`<defs>
  <linearGradient id="${q}l" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#2e2840"/><stop offset=".55" stop-color="#241f33"/><stop offset="1" stop-color="${LD}"/></linearGradient>
  <radialGradient id="${q}e" cx="50%" cy="48%" r="52%"><stop offset="0" stop-color="#ffffff"/><stop offset=".4" stop-color="#ffeaa8"/><stop offset="1" stop-color="#e0a83a"/></radialGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="#ffd87a" stop-opacity=".45"/><stop offset=".55" stop-color="#3f7fd0" stop-opacity=".2"/><stop offset="1" stop-color="#1e4a92" stop-opacity="0"/></radialGradient>
  <linearGradient id="${q}ray" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd87a" stop-opacity=".5"/><stop offset="1" stop-color="#ffd87a" stop-opacity="0"/></linearGradient></defs>`;
 s+=`<ellipse cx="80" cy="96" rx="78" ry="106" fill="url(#${q}g)"/>`;
 if(!o.bust){s+=[[-36,'#3f7fd0'],[-6,'#f0c457'],[26,'#c8394a'],[46,'#39a07e']].map(([dx,c],i)=>`<ellipse cx="${80+dx}" cy="${214+(i%2)*3}" rx="${18-Math.abs(dx)/6}" ry="5" fill="${c}" opacity=".3">${A('opacity','.15;.4;.15',3.4+i,-i*.8)}</ellipse>`).join('');
  s+=`<ellipse cx="80" cy="216" rx="46" ry="7" fill="#000" opacity=".42"/>`;
  s+=`<path d="M62 50L36 216H124L98 50Z" fill="url(#${q}ray)" opacity=".38">${A('opacity','.2;.46;.2',4.4)}</path>`}
 /* jambes : colonnes trapues */
 const col=(x,w)=>`<path d="M${x} 158h${w}v46h${-w}Z" fill="url(#${q}l)" ${O}/>`+
   [0,1,2].map(i=>`<path d="M${x+4.5+i*(w-9)/2} 164V200" stroke="#0e0b16" stroke-width="2.4" opacity=".75"/>`).join('')+
   `<path d="M${x-7} 200h${w+14}q3 0 3 3v9q0 3-3 3h${-(w+14)}q-3 0-3-3v-9q0-3 3-3Z" fill="url(#${q}l)" ${O}/>`;
 s+=col(44,30)+col(86,30);
 /* bras : lourds, détachés du corps */
 const arm=(x0,y0,x1,y1,fx2,fy,sd)=>{const d=`M${x0} ${y0}L${x1} ${y1}L${fx2} ${fy}`;
   let p=`<path d="${d}" fill="none" stroke="${LD}" stroke-width="27" stroke-linecap="round" stroke-linejoin="round"/>`;
   p+=`<path d="${d}" fill="none" stroke="url(#${q}l)" stroke-width="21" stroke-linecap="round" stroke-linejoin="round"/>`;
   for(let i=0;i<4;i++){const t=(i+.5)/4,ax=t<.5?x0+(x1-x0)*t*2:x1+(fx2-x1)*(t-.5)*2,ay=t<.5?y0+(y1-y0)*t*2:y1+(fy-y1)*(t-.5)*2;
     p+=`<rect x="${(ax-6.5).toFixed(1)}" y="${(ay-5.5).toFixed(1)}" width="13" height="11" rx="2.4" fill="${CO[K[(i+sd)%4]][0]}" stroke="${LD}" stroke-width="1.8"/>`;
     p+=`<rect x="${(ax-6.5).toFixed(1)}" y="${(ay-5.5).toFixed(1)}" width="13" height="4.8" rx="2.4" fill="${CO[K[(i+sd)%4]][1]}" opacity=".75"/>`}
   return p};
 s+=arm(28,104,18,138,22,172,1)+arm(132,104,142,138,138,172,3);
 s+=`<path d="M8 168h30q4 0 4 4v12q0 5-5 5H9q-5 0-5-5v-12q0-4 4-4Z" fill="url(#${q}l)" ${O}/>`;
 s+=`<path d="M122 168h30q4 0 4 4v12q0 5-5 5h-29q-5 0-5-5v-12q0-4 4-4Z" fill="url(#${q}l)" ${O}/>`;
 s+=`<circle cx="23" cy="177" r="5.4" fill="${CO.rd[0]}" stroke="${LD}" stroke-width="1.8"/><circle cx="137" cy="177" r="5.4" fill="${CO.bl[0]}" stroke="${LD}" stroke-width="1.8"/>`;
 /* la façade : large, et surtout pleine de verre */
 s+=`<ellipse cx="80" cy="134" rx="50" ry="44" fill="#ffd87a" opacity=".18"/>`;
 s+=`<path d="M32 166V112Q34 100 44 96H116Q126 100 128 112V166Q80 180 32 166Z" fill="url(#${q}l)" ${O}/>`;
 s+=lanc(37,27,106,158,'bl',u>=2)+lanc(67,27,100,164,'am',false)+lanc(97,27,106,158,'rd',u>=1);
 /* la corniche des épaules */
 s+=`<path d="M26 86h108q4 0 4 4v10q0 4-4 4H26q-4 0-4-4V90q0-4 4-4Z" fill="url(#${q}l)" ${O}/>`;
 s+=[0,1,2,3,4,5,6].map(i=>`<path d="M${30+i*15} 104l4-6h7l4 6Z" fill="#0e0b16" opacity=".6"/>`).join('');
 /* remplages et fêlures recousues à l'or */
 s+=[[48,116],[80,110],[112,116]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="5.4" fill="${CO[K[i%4]][0]}" stroke="${LD}" stroke-width="1.8"/><circle cx="${x}" cy="${y-1.4}" r="3.1" fill="${CO[K[i%4]][1]}" opacity=".75"/>`).join('');
 s+=`<path d="M38 128L56 140L46 156L64 168" fill="none" stroke="#ffd87a" stroke-width="2.4" stroke-linejoin="round" opacity=".92"/>`;
 s+=`<path d="M124 122L110 134L118 152" fill="none" stroke="#ffd87a" stroke-width="2.2" stroke-linejoin="round" opacity=".85"/>`;
 /* arcs-boutants */
 s+=`<path d="M24 120Q26 96 44 88L46 100Q34 104 34 126Z" fill="url(#${q}l)" ${O}/>`;
 s+=`<path d="M136 120Q134 96 116 88L114 100Q126 104 126 126Z" fill="url(#${q}l)" ${O}/>`;
 /* la tête : un gâble, la rosace dedans, et une petite arcature */
 s+=`<path d="M54 90V46Q54 16 80 5Q106 16 106 46V90Z" fill="url(#${q}l)" ${O}/>`;
 s+=`<path d="M80 5L56 46M80 5l24 41" stroke="#0e0b16" stroke-width="2.2" opacity=".55"/>`;
 s+=rose(80,42,18,u>=3?[2,9]:null);
 s+=[0,1,2,3].map(i=>{const x=59+i*11.4;return`<path d="M${x} 86V76q0-4.4 4.4-4.4T${x+8.8} 76v10Z" fill="${CO[K[(i+1)%4]][0]}" stroke="${LD}" stroke-width="1.6"/><path d="M${x} 80V76q0-4.4 4.4-4.4T${x+8.8} 76v4Z" fill="${CO[K[(i+1)%4]][1]}" opacity=".7"/>`}).join('');
  if(u>=3)s+=`<g opacity=".75"><circle cx="80" cy="40" r="28" fill="none" stroke="#ffd87a" stroke-width="1.8">${A('r','24;46;24',3.2)}${A('opacity','.7;0;.7',3.2)}</circle></g>`;
 return s}
function orgBody(u){const k='b'+(u|0);if(OC[k])return OC[k];
 return OC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Orgemme le Colosse de Vitrail en pied">${orgArt('ob'+(u|0)+'_',u)}</svg>`}
function orgPortrait(u){const k='p'+(u|0);if(OC[k])return OC[k];const q='op'+(u|0)+'_';
 return OC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Orgemme le Colosse de Vitrail"><defs><radialGradient id="${q}bg" cx="50%" cy="32%" r="78%"><stop offset="0" stop-color="#2a4a7a"/><stop offset=".45" stop-color="#141a30"/><stop offset="1" stop-color="#080a14"/></radialGradient></defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-56 -4) scale(1.32)">${orgArt(q,u,{bust:1})}</g></svg>`}
window.orgBody=orgBody;window.orgPortrait=orgPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===ORG)return orgPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===ORG)return orgBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='orgemme')return`<div class="sgfig lore orgf">${orgBody(0)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('orgemme art',e)}})();

/* ---------- le renvoi, et la rose qui éclate ---------- */
(function(){try{
if(!HEROES[ORG])return;
const BL='#3f7fd0',RD='#c8394a',AM='#f0c457',EM='#39a07e',WL='#fff8e4',LD='#120f1c',COLS=['#1e4a92','#8e1e32','#c08a22','#1f6b54'];
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const reflOf=u=>{const base=u.hp/u.max<.5?.5:.35,bo=(B&&B.round<=(u.reflT||0))?(u.refl||0):0;return base+bo};

/* passif : la lumière repart d'où elle vient */
try{window.RDEonHit&&window.RDEonHit((s,t,d,o)=>{
  if(!B||!t||t.hid!==ORG||t.hp<=0||!s||s.hp<=0||!d)return;
  t.stored=(t.stored||0)+d;
  const back=Math.max(1,Math.round(d*reflOf(t)));
  hurt(s,back,'dmg');t.dmg=(t.dmg||0)+back;
  if(ok())try{const a=uc(t),b=uc(s);float(t,'🪟 Renvoi','info');
    fxItem(300,(c,p)=>{const g=ease(p),al=1-p;c.globalAlpha=al*.95;c.strokeStyle=[BL,RD,AM,EM][(back+d)%4];c.lineWidth=3;c.lineCap='round';
      c.beginPath();c.moveTo(a.x,a.y);c.lineTo(a.x+(b.x-a.x)*g,a.y+(b.y-a.y)*g);c.stroke();
      c.globalCompositeOperation='lighter';c.globalAlpha=al*.4;c.lineWidth=9;c.stroke()});
    sparks(b.x,b.y,AM,6,4,1.5,16)}catch(e){}
  try{refreshOne(s);if(s.hp<=0)deathFx(s)}catch(e){}})}catch(e){}

/* l'ultime : il se brise exprès, et tout ce qu'il a encaissé repart en éclats */
{const sk0=skill;skill=function(u,sk,sc){
  if(!(B&&u&&u.hid===ORG&&sk&&sk.fx&&sk.fx.rose))return sk0.apply(this,arguments);
  const f=sk.fx,d0=f.dmg,k=Math.min(2.4,(u.stored||0)/Math.max(1,u.max));
  f.dmg=Math.round(d0*(1+k));u.roseK=k;
  try{return sk0.apply(this,arguments)}
  finally{f.dmg=d0;u.refl=.35;u.reflT=B.round+(f.reflect||3);u.stored=0;
    u.hp=Math.max(1,u.hp-Math.round(u.hp*.25));
    log(`🪟 <b>${u.name}</b> se brise : <b>+${Math.round(k*100)} %</b> de dégâts pour tout ce qu'il a encaissé, et son Renvoi monte à <b>70 %</b> pendant ${f.reflect||3} tours.`,'sk');
    try{float(u,'🪟 +'+Math.round(k*100)+'%','info');refreshOne(u)}catch(e){}}}}

/* ---------- l'animation ---------- */
function roseCv(cx,cy,R,dur,delay){fxItem(dur,(c,p)=>{const g=ease(Math.min(1,p*1.5)),al=p>.84?(1-p)/.16:Math.min(1,p*4);
  c.globalAlpha=al*.46;
  for(let ring=0;ring<3;ring++){const r0=R*ring/3*g,r1=R*(ring+1)/3*g,n=8+ring*8;
    for(let k=0;k<n;k++){const a0=k/n*6.2832+ring*.25,a1=(k+1)/n*6.2832+ring*.25;
      c.beginPath();c.arc(cx,cy,r1,a0,a1);c.arc(cx,cy,r0,a1,a0,true);c.closePath();
      c.fillStyle=COLS[(k+ring)%4];c.fill();c.lineWidth=2.6;c.strokeStyle=LD;c.stroke()}}
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.5;c.drawImage(spr('#ffe9a8'),cx-R*.32*g,cy-R*.32*g,R*.64*g,R*.64*g)},delay)}
function shardFx(cx,cy,R,dur){const sh=[...Array(26)].map(()=>{const a=rnd(0,6.2832),v=rnd(.55,1.25);
   return{a,v,s:rnd(5,13),c:COLS[(Math.random()*4)|0],rot:rnd(0,6.2832),vr:rnd(-.2,.2)}});
 fxItem(dur,(c,p)=>{const al=1-p*p;
  for(const q of sh){const d=R*q.v*ease(p),x=cx+Math.cos(q.a)*d,y=cy+Math.sin(q.a)*d+p*p*34;
    c.globalAlpha=al;c.save();c.translate(x,y);c.rotate(q.rot+q.vr*p*10);
    c.fillStyle=q.c;c.strokeStyle=LD;c.lineWidth=1.6;
    c.beginPath();c.moveTo(0,-q.s);c.lineTo(q.s*.6,q.s*.4);c.lineTo(-q.s*.55,q.s*.5);c.closePath();c.fill();c.stroke();
    c.globalCompositeOperation='lighter';c.globalAlpha=al*.35;c.fillStyle='#ffe9a8';c.fill();c.restore();c.globalCompositeOperation='source-over'}})}
LEG2[ORG]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,R=Math.max(W,H)*.62,rx=W/2,ry=H*.44;
  vignette('#0a1024',1800,.6);try{dimOn(.45)}catch(e){}
  glowPulse(a.x,a.y,AM,620,a.s*.7);
  roseCv(rx,ry,R,1400);
  try{cSnd&&cSnd.ok&&cSnd.ok()}catch(e){}
  await fxWait(520);if(!B)return;
  /* la lumière monte */
  fxItem(420,(c,p)=>{c.globalCompositeOperation='lighter';c.globalAlpha=p*.5;c.drawImage(spr('#ffe9a8'),rx-R*.45*p,ry-R*.45*p,R*.9*p,R*.9*p)});
  await fxWait(300);if(!B)return;
  /* il se brise */
  flash('#ffffff',260,.85);shake(4);camPunch(a,1.1,460);
  shardFx(rx,ry,R*1.15,950);
  ringFx(a.x,a.y,AM,W*.6,700,7,.5);ringFx(a.x,a.y,BL,W*.44,700,4,.5,110);
  try{SND&&SND.thud&&SND.thud()}catch(e){}
  for(let i=0;i<tg.length;i++){const t=tg[i],b=uc(t);
    pillarFx(b.x,b.y,[BL,RD,AM,EM][i%4],680,b.s*.62,i*55);
    slashLine(b.x,b.y,b.s*1.25,.6,['#ffffff',AM],230,4,i*55);
    shapes(b.x,b.y,'tri',[COLS[i%4],'#ffe9a8',WL],11,6,4.2,34,.2,{});
    sparks(b.x,b.y,'#ffe9a8',10,6,1.8,22);hit(X,t,1.15);await fxWait(55)}
  await fxWait(360);if(!B)return;
  /* il se recompose */
  ringFx(a.x,a.y,'#ffe9a8',a.s*.9,620,4);glowPulse(a.x,a.y,AM,620,a.s*.6);
  textPop(W/2,a.y-a.s*.55,'ROSE ÉCLATÉE',AM,Math.max(16,Math.min(25,W*.9/10)),1000);
  await fxWait(430)};

/* ---------- textes ---------- */
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.rose)r+=` Les dégâts augmentent avec <b>tout ce qu'Orgemme a encaissé depuis le début du combat</b> (jusqu'à +240 %). Il y laisse 25 % de ses PV, et son <b>Renvoi monte à 70 % pendant ${sk.fx.reflect||3} tours</b>.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill orgpas"><div class="sn">🪟 Renvoi</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Chaque coup reçu lui renvoie <b>35 % des dégâts</b> dans la figure de l'attaquant. <b>Sous 50 % de PV, ça passe à 50 %.</b> Tout ce qu'il encaisse est aussi mis de côté pour son ultime.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===ORG){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`
.sgfig.orgf{filter:drop-shadow(0 0 16px rgba(240,196,87,.5))}
.skill.orgpas{border-color:rgba(240,196,87,.5)!important;background:linear-gradient(135deg,rgba(240,196,87,.13),rgba(63,127,208,.1) 60%,transparent 80%),var(--panel)!important}`;document.head.appendChild(st);
try{Object.assign(I18N_EN,{'Orgemme le Colosse de Vitrail':'Orgemme the Stained-Glass Colossus','Rose Éclatée':'Shattered Rose','ROSE ÉCLATÉE':'SHATTERED ROSE','🪟 Renvoi':'🪟 Backlash',
 "Chaque coup reçu lui renvoie <b>35 % des dégâts</b> dans la figure de l'attaquant. <b>Sous 50 % de PV, ça passe à 50 %.</b> Tout ce qu'il encaisse est aussi mis de côté pour son ultime.":"Every hit he takes sends <b>35 % of the damage</b> straight back at the attacker. <b>Below 50 % HP it becomes 50 %.</b> Everything he absorbs is also stored up for his ultimate."})}catch(e){}
}catch(e){console.warn('orgemme renvoi',e)}})();
