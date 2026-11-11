/* ================= V411 : Corvin — ses pouvoirs et son ultime =================
   « Oublié de tous » : les deux premiers tours, les ennemis n'arrivent pas à le viser.
   « Il se réécrit » : la première fois qu'il tombe, il revient à la moitié de ses PV.
   « La Dernière Page » : il réécrit l'équipe — soins, boucliers de papier, purification,
   énergie pour tout le monde, et un allié tombé revient à 70 %. */
(function(){try{
if(!HEROES[CRV])return;
const GOLD='#ffd84a',CRM='#fff6dc',VIO='#cfc6e8';
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const later=(ms,fn)=>setTimeout(()=>{if(ok())try{fn()}catch(e){}},ms/((typeof S!=='undefined'&&S.speed)||1));

/* ---------- « Oublié de tous » : on ne peut pas le viser au début ---------- */
{const pt=pickT;pickT=function(u){try{if(B&&u&&u.side===1&&(B.round||1)<=2){const f=alive(0).filter(x=>!(x.hid===CRV&&x.hp>0)||x.taunt>0);
  if(f.length&&alive(0).some(x=>x.hid===CRV&&x.hp>0)){const t=f.filter(x=>x.taunt>0);return pick(t.length?t:f)}}}catch(e){}return pt.apply(this,arguments)}}
/* ---------- « Il se réécrit » : il revient une fois ---------- */
{const h0=hurt;hurt=function(t,d,c){const r=h0.apply(this,arguments);
  try{if(B&&t&&t.hid===CRV&&t.hp<=0&&!t.rewr){t.rewr=1;t.hp=Math.max(1,Math.round(t.max*.5));t.stun=0;t.dot=null;
    log(`🪶 <b>${t.name}</b> se réécrit : la page n'était pas finie.`,'cs');float(t,'RÉÉCRIT','heal');
    if(ok())try{rewriteFx(t)}catch(e){}
    try{refreshOne(t)}catch(e){try{refreshUnits()}catch(e2){}}}}catch(e){}
  return r}}
function rewriteFx(u){const a=uc(u);fxItem(900,(c,p)=>{const g=Math.min(1,p*1.6),al=p>.7?(1-p)/.3:1;c.translate(a.x,a.y);c.globalAlpha=al;
  c.strokeStyle=GOLD;c.lineWidth=3;c.setLineDash([7,9]);c.lineDashOffset=-p*90;c.beginPath();c.ellipse(0,0,a.s*.46*g,a.s*.62*g,0,0,7);c.stroke();c.setLineDash([]);
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.5;c.drawImage(spr(GOLD),-a.s*.9,-a.s*.9,a.s*1.8,a.s*1.8)});
  ringFx(a.x,a.y,GOLD,a.s*.7,620,5);shapes(a.x,a.y,'card',[CRM,'#ffe9a0',GOLD],9,5,3.4,36,.2,{});textPop(a.x,a.y-a.s*.6,'RÉÉCRIT',GOLD,18,900)}

/* ---------- l'ultime : un allié tombé revient à 70 %, sinon le plus mal en point est réécrit ---------- */
{const sk0=skill;skill=function(u,sk,sc){const dead=(()=>{try{return B&&u&&u.hid===CRV?B.units.filter(x=>x.side===u.side&&x.hp<=0):null}catch(e){return null}})();
  const r=sk0.apply(this,arguments);
  try{if(B&&u&&u.hid===CRV){
    if(dead&&dead.length){const back=dead.find(x=>x.hp>0);if(back){back.hp=Math.max(back.hp,Math.round(back.max*.7));if(ok())later(1500,()=>rewriteFx(back));try{refreshOne(back)}catch(e){}}}
    else{const L=alive(u.side).filter(x=>x!==u).sort((a,b)=>a.hp/a.max-b.hp/b.max)[0]||u;
      if(L&&L.hp<L.max){heal(L,L.max-L.hp);log(`🪶 <b>${u.name}</b> réécrit <b>${L.name}</b> : la page revient comme avant.`,'sk');if(ok())later(1500,()=>rewriteFx(L))}}
  }}catch(e){}
  return r}}

/* ---------- l'animation d'ultime ---------- */
function orbit(X,cx,cy,r,n,col){for(let i=0;i<n;i++){const a0=i/n*6.283;
  fxItem(1600,(c,p)=>{const a=a0+p*4.2,rr=r*(.5+p*.6),al=p<.15?p/.15:p>.8?(1-p)/.2:1;
    c.translate(cx+Math.cos(a)*rr,cy+Math.sin(a)*rr*.42);c.rotate(Math.sin(a*2)*.5);c.globalAlpha=al*.95;
    c.fillStyle=col;c.strokeStyle='#8a8070';c.lineWidth=1;c.fillRect(-6,-8,12,16);c.strokeRect(-6,-8,12,16);
    c.strokeStyle='#a89c86';c.lineWidth=.8;for(let k=0;k<3;k++){c.beginPath();c.moveTo(-3.6,-4+k*4);c.lineTo(3.6,-4+k*4);c.stroke()}})}}
function pageSky(dur){fxItem(dur,(c,p)=>{const al=(p<.08?p/.08:p>.86?(1-p)/.14:1)*.8;c.globalAlpha=al;c.fillStyle='#f8f1de';c.fillRect(0,0,FXS.w,FXS.h);
  c.globalAlpha=al*.75;c.strokeStyle='#8aa0cc';c.lineWidth=1.1;for(let y=16;y<FXS.h;y+=22){c.beginPath();c.moveTo(0,y);c.lineTo(FXS.w,y);c.stroke()}
  c.strokeStyle='#e0a0a0';c.beginPath();c.moveTo(FXS.w*.1,0);c.lineTo(FXS.w*.1,FXS.h);c.stroke()})}
LEG_FX[CRV]=async(u,seq,th)=>{const a=uc(u),W=FXS.w,H=FXS.h,m=rowMid(u.side),IF=window.INKFX;
  vignette('#1a1430',1400,.5);glowPulse(a.x,a.y,VIO,700,a.s*.7);
  /* il ouvre la Dernière Page */
  shapes(a.x,a.y,'card',[CRM,'#efe8da'],8,5,3,34,.18,{});
  await fxWait(240);if(!ok())return;
  flash(CRM,300,.6);pageSky(2400);
  /* la plume brisée écrit la phrase qui ramène tout le monde */
  const y0=Math.max(40,H*.2);
  if(IF&&IF.cursive){IF.cursive(W*.12,W*.9,y0,'#2e2110',4.4,1000,0,11);IF.cursive(W*.12,W*.7,y0+34,'#2e2110',4.4,900,520,5)}
  orbit({},W/2,H*.52,Math.min(W,H)*.42,10,CRM);
  try{if(AU&&AU.ctx&&cSnd.ok())SND.owl(AU.F.v,NOW())}catch(e){}
  for(let i=0;i<6;i++)later(180+i*95,()=>{try{if(AU&&AU.ctx&&cSnd.ok())SND.chime(AU.F.v,NOW(),.7)}catch(e){}});
  await fxWait(1180);if(!ok())return;
  /* l'encre d'or coule de la page vers chaque allié */
  const al2=alive(u.side);
  al2.forEach((t,i)=>later(i*90,()=>{const b=uc(t);
    if(IF&&IF.letters)IF.letters(W*.5,y0+16,5,GOLD,3.2);
    if(IF&&IF.stroke)IF.stroke([[W*.5,y0+16],[(W*.5+b.x)/2,(y0+b.y)/2],[b.x,b.y-b.s*.2]],GOLD,3.4,520,0,true);
    fxItem(620,(c,p)=>{const g=ease(Math.min(1,p*1.3)),al=p>.7?(1-p)/.3:1;c.translate(b.x,b.y);c.globalAlpha=al;
      c.strokeStyle=GOLD;c.lineWidth=2.6;c.setLineDash([6,8]);c.lineDashOffset=-p*80;c.beginPath();c.ellipse(0,0,b.s*.46*g,b.s*.6*g,0,0,7);c.stroke()});
    shapes(b.x,b.y,'card',[CRM,'#ffe9a0',GOLD],7,4.6,3.2,32,.18,{});sparks(b.x,b.y,GOLD,8,5,1.6,18);ringFx(b.x,b.y,GOLD,b.s*.55,460,4)}));
  await fxWait(260+al2.length*90);if(!ok())return;
  /* finale : la page se referme, une volée de plumes d'or */
  flash('#fff6dc',320,.7);camPunch(a,1.06,420);shake(2);
  emit(30,()=>({k:'shape',sh:'feather',x:rnd(0,W),y:H+rnd(6,60),vx:rnd(-1,1),vy:rnd(-3.4,-1.8),g:-.02,drag:.99,life:80,max:80,s:rnd(5,10),c:Math.random()<.4?GOLD:CRM,rot:rnd(0,6),vr:rnd(-.08,.08),fade:1,add:0}));
  orbit({},W/2,H*.5,Math.min(W,H)*.5,8,'#ffe9a0');
  textPop(W/2,m.y-m.s*.25,'LA DERNIÈRE PAGE',GOLD,Math.max(15,Math.min(24,W*.9/11)),1200);
  await fxWait(560)};

/* ---------- textes ---------- */
try{const PASS=`<div class="skill crvpas"><div class="sn">🪶 Oublié de tous</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Plus personne au royaume ne se souvient de lui : pendant les <b>2 premiers tours</b>, les ennemis n'arrivent pas à le viser. Et la première fois qu'il tombe, il <b>se réécrit</b> et revient avec la moitié de ses PV.</p></div>`;
 const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===CRV){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);try{if(sk&&sk.n==='La Dernière Page')r+=" Si un allié est tombé, il le réécrit et le ramène à 70 % de ses PV ; sinon l'allié le plus mal en point est soigné à fond.";}catch(e){}return r}}catch(e){}
}catch(e){console.warn('corvin skill',e)}})();

/* ---------- l'invocation et l'annonce ---------- */
(function(){try{
if(!HEROES[CRV])return;
const b4=()=>{try{return!!(S.sg4&&S.sg4.d&&S.sg4.d[5])}catch(e){return false}};
try{const ps=pSummonStd;pSummonStd=function(){let h=ps.apply(this,arguments);try{if(b4()&&!S.heroes[CRV])
  h=h.replace('<div class="card"><div class="h3">Taux',`<div class="card crvcard"><div class="acrow"><span class="crvpt">${(()=>{try{const u=window.RDEstill&&RDEstill('crvp0',()=>crvPortrait(0));return u?`<img src="${u}" alt="" style="width:100%;height:100%;display:block">`:crvPortrait(0)}catch(e){return crvPortrait(0)}})()}</span><div style="min-width:0;flex:1"><span class="tag" style="--rc:#cfc6e8">✦ MYTHIQUE · TOI SEUL T'EN SOUVIENS ✦</span><div class="h3" style="margin:4px 0 2px">Corvin, la Page Blanche</div><p class="muted" style="font-size:12.5px;margin:0">Le royaume l'a effacé. Tu es le seul à te souvenir de lui, alors tu es le seul à pouvoir l'appeler : il peut sortir de l'<b>Invocation standard</b> comme les autres mythiques.</p></div></div></div><div class="card"><div class="h3">Taux`)}catch(e){}return h}}catch(e){}
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(b4()&&!L.some(a=>a.k==='corvin4'))L.unshift({k:'corvin4',ac:'#cfc6e8',tag:'NOUVEAU MYTHIQUE',t:'Corvin, la Page Blanche 🪶',
  x:"Tu es le seul à te souvenir de lui. Le vieux hibou gris qui a donné sa page pour rendre à Plume ses souvenirs revient comme héros <b>MYTHIQUE</b> : la moitié de son corps est encore effacée, et elle se réécrit à chaque ultra-évolution. Son ultime <b>La Dernière Page</b> réécrit toute l'équipe, et ramène un allié tombé. Il sort de l'<b>Invocation standard</b>.",
  art:()=>`<div class="skann crvann">${crvBody(1)}</div>`,go:'🪶 Aller l’invoquer',fn:()=>{TAB='invoc';UI.ban='std';UI.iv='invoc'}})}catch(e){}return L}}catch(e){}
const st=document.createElement('style');st.textContent=`
.crvcard{background:radial-gradient(120% 140% at 85% 0%,rgba(207,198,232,.22),transparent 60%),var(--panel)!important;border-color:rgba(207,198,232,.55)!important}
.crvpt{width:84px;height:84px;border-radius:16px;overflow:hidden;flex:0 0 auto;box-shadow:0 0 18px -4px #cfc6e8}.crvpt svg{width:100%;height:100%;display:block}
.crvann svg{height:100%;width:auto}
.skill.crvpas{border-color:rgba(207,198,232,.5)!important;background:linear-gradient(135deg,rgba(207,198,232,.14),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{TITLES.push({k:'souvenir',n:'Le Seul à se souvenir',c:'#cfc6e8',d:'Invoquer Corvin, la Page Blanche',ok:()=>!!S.heroes[CRV]})}catch(e){}
try{const it=["🪶 <b>Nouveau héros MYTHIQUE : Corvin, la Page Blanche.</b> Le vieux hibou effacé du Livre IV revient. Pendant les 2 premiers tours les ennemis n'arrivent pas à le viser, la première fois qu'il tombe il se réécrit, et son ultime <b>La Dernière Page</b> soigne, purifie, protège et redonne de l'énergie à toute l'équipe — et ramène un allié tombé à 70 % de ses PV.",
 "✒️ La moitié de son corps est effacée : elle se réécrit à l'encre d'or à chaque ultra-évolution, jusqu'à être entière.",
 "🔒 Il n'apparaît dans l'<b>Invocation standard</b> qu'une fois le <b>Livre IV</b> terminé : tu es le seul à te souvenir de lui."];
 PATCH.unshift({v:51,d:'11 novembre 2026',t:'Corvin, la Page Blanche',items:it});
 const E=["🪶 <b>New MYTHIC hero: Corvin, the Blank Page.</b> The erased old owl from Book IV returns. For the first 2 rounds enemies can't manage to target him, the first time he falls he rewrites himself, and his ultimate <b>The Last Page</b> heals, cleanses, shields and restores energy to the whole team — and brings a fallen ally back at 70 % HP.",
 "✒️ Half of his body is erased: it rewrites itself in gold ink with every ultra-evolution, until he is whole again.",
 "🔒 He only appears in the <b>Standard Summon</b> once <b>Book IV</b> is finished: you are the only one who remembers him."];
 it.forEach((x,i)=>{I18N_EN[x]=E[i]});
 Object.assign(I18N_EN,{'Corvin, la Page Blanche':'Corvin, the Blank Page','Corvin, la Page Blanche 🪶':'Corvin, the Blank Page 🪶','La Dernière Page':'The Last Page','Oublié de tous':'Forgotten by all','NOUVEAU MYTHIQUE':'NEW MYTHIC','🪶 Aller l’invoquer':'🪶 Go summon him','Le Seul à se souvenir':'The Only One Who Remembers','Invoquer Corvin, la Page Blanche':'Summon Corvin, the Blank Page','RÉÉCRIT':'REWRITTEN','LA DERNIÈRE PAGE':'THE LAST PAGE'})}catch(e){}
}catch(e){console.warn('corvin invoc',e)}})();
