/* ================= V413 : MARN LE SANS-VOIX — héros légendaire =================
   Un duelliste masqué qui a troqué sa voix contre le silence des autres.
   Son ultime « Point Final » coupe la parole aux ennemis : plus d'ultime pendant 2 tours.
   Et pendant qu'il frappe, le jeu se tait vraiment. */
const MARN=73;
(function(){try{
if(HEROES[MARN]||HEROES.length!==MARN)return;
HEROES.push({i:MARN,n:'Marn le Sans-Voix',c:'Assassin',r:4,ex:1,
  exd:"Termine la chronique « Le Silence de Marn » dans l'onglet Aventure pour qu'il rejoigne ton équipe.",
  sk:{n:'Point Final',tg:'all',fx:{dmg:155,silence:2}}});
try{LOOKS[MARN]=['#23203a','#8a1a2a','#c8ccd8','#1a1626','#9fe8c8','#e8cdb4','bg:smoke back:cape hair:short eyes:glow mouth:neutral body:slim ear:human']}catch(e){}
}catch(e){console.warn('marn hero',e)}})();

/* ---------- le dessin ---------- */
(function(){try{
if(!HEROES[MARN])return;
const MC={},O='stroke="#0b0a14" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"',
 CO='#23203a',CO2='#14121f',RED='#8a1a2a',RED2='#c23a44',SIL='#c8ccd8',SIL2='#8a90a4',SK='#e8cdb4',SK2='#c9a888',HAIR='#1a1626',EYE='#9fe8c8',LEA='#3a2a22';
const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
function marnArt(q,u,o){u=Math.max(0,Math.min(3,u|0));o=o||{};const cut=u>=3;
 const lim=(d,w,c,o2)=>`<path d="${d}" fill="none" stroke="#0b0a14" stroke-width="${w+3.2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o2||''}/>`;
 let s=`<defs>
  <linearGradient id="${q}c" x1=".1" y1="0" x2=".9" y2="1"><stop offset="0" stop-color="#36315a"/><stop offset=".5" stop-color="${CO}"/><stop offset="1" stop-color="${CO2}"/></linearGradient>
  <linearGradient id="${q}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${RED2}"/><stop offset="1" stop-color="${RED}"/></linearGradient>
  <linearGradient id="${q}bl" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${SIL2}"/><stop offset=".45" stop-color="#ffffff"/><stop offset="1" stop-color="${SIL}"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${EYE}" stop-opacity=".5"/><stop offset="1" stop-color="${EYE}" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}rg"><stop offset="0" stop-color="${RED2}" stop-opacity=".45"/><stop offset="1" stop-color="${RED}" stop-opacity="0"/></radialGradient></defs>`;
 s+=`<ellipse cx="80" cy="104" rx="76" ry="102" fill="url(#${q}${u>=2?'rg':'g'})"/>`;
 if(u>=1)s+=[...Array(u)].map((_,i)=>`<circle cx="80" cy="46" r="${22+i*12}" fill="none" stroke="${SIL}" stroke-width="1.2" opacity="0">${A('opacity','0;.4;0',3+i*.6,-i*.9)}${A('r',`${18+i*10};${40+i*14}`,3+i*.6,-i*.9)}</circle>`).join('');
 if(!o.bust)s+=`<ellipse cx="82" cy="214" rx="34" ry="6" fill="#000" opacity=".45"/>`;
 /* l'echarpe qui vole derriere lui */
 s+=`<g><path d="M70 70Q42 76 28 96Q20 109 6 111L4 101Q16 99 22 89Q34 70 66 60Z" fill="url(#${q}r)" ${O}/>
  <animateTransform attributeName="transform" type="rotate" values="-3 68 72;4 68 72;-3 68 72" dur="4.4s" repeatCount="indefinite"/></g>`;
 /* jambes, bottes hautes */
 s+=`<path d="M72 158L68 192L66 206H78L80 192L82 164Z" fill="#17131c" ${O}/><path d="M92 158L98 192L100 206H88L86 192L84 164Z" fill="#17131c" ${O}/>`;
 s+=`<path d="M63 190h17v14q0 4-4 4h-9q-4 0-4-4Z" fill="#0f0c14" ${O}/><path d="M86 190h17v14q0 4-4 4h-9q-4 0-4-4Z" fill="#0f0c14" ${O}/>`;
 s+=`<path d="M63 196h17M86 196h17" stroke="${SIL2}" stroke-width="1.6"/>`;
 /* le manteau, ourlet en pointes */
 s+=`<path d="M80 64Q54 68 48 88L38 150Q36 170 42 178L50 160L56 180L68 166L74 184L80 168L86 184L92 166L104 180L110 160L118 178Q124 170 122 150L112 88Q106 68 80 64Z" fill="url(#${q}c)" ${O}/>`;
 /* ouverture, gilet et ceinture rouge */
 s+=`<path d="M80 68L69 102L75 152L80 164L85 152L91 102Z" fill="#100e1a" ${O}/>`;
 s+=`<path d="M80 68L60 80L70 120L80 90Z" fill="url(#${q}r)" ${O}/>`;
 s+=`<path d="M80 68L100 80L90 116L80 90Z" fill="#171427" ${O}/>`;
 s+=`<path d="M66 120q14 7 28 0l2 10q-16 8-32 0Z" fill="url(#${q}r)" ${O}/>`;
 s+=`<path d="M56 126q24 9 48 0l1.6 9.6q-25 10-50 0Z" fill="${LEA}" ${O}/><rect x="74" y="126" width="12" height="11" rx="2" fill="${SIL}" ${O}/><path d="M80 129v5" stroke="${CO2}" stroke-width="1.6"/>`;
 /* les cloches sans battant */
 s+=[0,1,2].map(i=>{const x=56+i*5.2,y=142+i*8.6;return`<g><path d="M${x} ${y}v-6" stroke="${SIL2}" stroke-width="1"/><path d="M${x-5.2} ${y+5.2}q0-7 5.2-7t5.2 7Z" fill="${SIL}" stroke="#0b0a14" stroke-width="1.3"/><path d="M${x-6.5} ${y+5.2}h13" stroke="#0b0a14" stroke-width="1.3"/>
   <animateTransform attributeName="transform" type="rotate" values="-8 ${x} ${y-6};8 ${x} ${y-6};-8 ${x} ${y-6}" dur="${2.8+i*.6}s" repeatCount="indefinite"/></g>`}).join('');
 /* bras droit : la rapiere en diagonale */
 s+=lim('M104 82L120 104L114 128',12.4,`url(#${q}c)`);
 s+=`<g transform="translate(114 130) rotate(44)">
   <path d="M-1.9 -4h3.8v16h-3.8Z" fill="${LEA}" ${O}/>
   <path d="M-8 -5h16" stroke="${SIL}" stroke-width="3.6" stroke-linecap="round"/>
   <path d="M0 -7q-8 2-8 8.4t8 7.2q8-.8 8-7.2T0 -7Z" fill="none" stroke="${SIL}" stroke-width="2.4"/>
   <path d="M-2.4 -7.4h4.8L1.5 -84q-.6-6-1.5-6t-1.5 6Z" fill="url(#${q}bl)" stroke="#0b0a14" stroke-width="1.2"/>
   <path d="M0 -11V-80" stroke="#ffffff" stroke-width=".9" opacity=".85"/>
   ${u>=2?`<path d="M-2.4 -7.4h4.8L1.5 -84q-.6-6-1.5-6t-1.5 6Z" fill="${EYE}" opacity=".0">${A('opacity','0;.5;0',2.4)}</path>`:''}</g>`;
 /* col montant en pointes */
 s+=`<path d="M58 82L46 42L66 60L80 53L94 60L114 42L102 82Q80 92 58 82Z" fill="url(#${q}r)" ${O}/>`;
 s+=`<path d="M62 79L53 51L67 63L80 57L93 63L107 51L98 79Q80 87 62 79Z" fill="url(#${q}c)" ${O}/>`;
 /* tete */
 s+=`<ellipse cx="80" cy="42" rx="15.4" ry="17.4" fill="${SK}" ${O}/>`;
 s+=`<path d="M64.6 44Q60 21 80 18Q100 21 95.4 44Q93 32 85 29Q80 34 72 29Q67 32 64.6 44Z" fill="${HAIR}" ${O}/>`;
 s+=`<path d="M89 19.4q9 6 7.4 18l-4.4-1.2q1-9.6-5.6-14.4Z" fill="#e8e4f0" ${O}/>`;
 s+=`<path d="M66.6 27q-4.4 11-2 20.4l-4.6-1.4q-2.4-11.4 2-21.2Z" fill="${HAIR}" ${O}/>`;
 /* yeux etroits, lueur froide */
 s+=`<circle cx="73.2" cy="41.6" r="6.6" fill="url(#${q}g)"/><circle cx="86.8" cy="41.6" r="6.6" fill="url(#${q}g)"/>`;
 s+=`<path d="M68.2 43.4q2.4-5.6 9.4-3.4q-2.6 5-9.4 3.4ZM91.8 43.4q-2.4-5.6-9.4-3.4q2.6 5 9.4 3.4Z" fill="#0d1018"/>`;
 s+=`<path d="M70.6 41.6q1.8-2.8 5.2-1.4q-1.8 2.6-5.2 1.4ZM89.4 41.6q-1.8-2.8-5.2-1.4q1.8 2.6 5.2 1.4Z" fill="${EYE}">${A('opacity','.8;1;.8',2.6)}</path>`;
 s+=`<path d="M66.4 35.8q6-4.2 12-1M93.6 35.8q-6-4.2-12-1" stroke="${HAIR}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`;
 /* la museliere */
 if(cut){s+=`<path d="M65 49q7 5 15 5t15-5l2 5q-9 7-17 7t-17-7Z" fill="${LEA}" ${O} opacity=".5"/>`;
   s+=`<path d="M66 51l-9 11M94 51l9 11" stroke="${LEA}" stroke-width="3.6" stroke-linecap="round"/>`;
   s+=`<path d="M73 57q7 3.4 14 0" stroke="${SK2}" stroke-width="1.4" fill="none"/>`}
 else{s+=`<path d="M64.6 48.4q8 7.2 15.4 7.2t15.4-7.2l2.4 7.2q-9.6 8-17.8 8t-17.8-8Z" fill="${LEA}" ${O}/>`;
   s+=`<path d="M65 50.4L58.6 46M95 50.4L101.4 46" stroke="${LEA}" stroke-width="3.8" stroke-linecap="round"/>`;
   s+=`<path d="M71 55q9 4.4 18 0" stroke="#2a1c16" stroke-width="1.2" fill="none"/>`;
   s+=`<rect x="76.4" y="53.4" width="7.2" height="7" rx="1.6" fill="${SIL}" ${O}/><path d="M78 53.4v-2.2q0-2 2-2t2 2v2.2" stroke="${SIL2}" stroke-width="1.3" fill="none"/><circle cx="80" cy="56.8" r="1.1" fill="${CO2}"/>`}
 /* bras gauche : chut. */
 s+=lim('M57 86L42 83L60 66',12.2,`url(#${q}c)`);
 s+=`<path d="M63.4 59.6L72.4 53.6" stroke="#0b0a14" stroke-width="7" stroke-linecap="round"/><path d="M63.4 59.6L72.4 53.6" stroke="${SK}" stroke-width="4.4" stroke-linecap="round"/>`;
 s+=`<circle cx="60.6" cy="65.4" r="6.8" fill="${SK}" ${O}/><path d="M56.8 63q3.6-2.2 7.2 0M57 67.2q3.6-2.2 7.2 0M57.8 71q3.2-2 6.4 0" stroke="${SK2}" stroke-width="1.3" fill="none"/>`;
 if(u>=1)s+=`<circle cx="73.6" cy="52.6" r="3" fill="${EYE}" opacity="0">${A('opacity','0;.75;0',2.2)}${A('r','1.4;5.4;1.4',2.2)}</circle>`;
 if(cut)s+=`<g opacity=".65"><circle cx="80" cy="44" r="26" fill="none" stroke="${EYE}" stroke-width="1.5">${A('r','20;36;20',3)}${A('opacity','.6;0;.6',3)}</circle></g>`;
 return s}
function marnBody(u){const k='b'+(u|0);if(MC[k])return MC[k];
 return MC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marn le Sans-Voix en pied">${marnArt('mb'+(u|0)+'_',u)}</svg>`}
function marnPortrait(u){const k='p'+(u|0);if(MC[k])return MC[k];const q='mp'+(u|0)+'_';
 return MC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Marn le Sans-Voix"><defs><radialGradient id="${q}bg" cx="50%" cy="34%" r="76%"><stop offset="0" stop-color="#4a4470"/><stop offset=".45" stop-color="#231f3c"/><stop offset="1" stop-color="#0b0a14"/></radialGradient></defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-54 -15) scale(1.3)">${marnArt(q,u,{bust:1})}</g></svg>`}
window.marnBody=marnBody;window.marnPortrait=marnPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===MARN)return marnPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===MARN)return marnBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='marn')return`<div class="sgfig lore marnf">${marnBody(0)}</div>`;if(w==='marnc')return`<div class="sgfig lore marnf">${marnBody(3)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('marn art',e)}})();

/* ---------- le silence : plus d'ultime pendant quelques tours ---------- */
(function(){try{
if(!HEROES[MARN])return;
const EYE='#9fe8c8',SIL='#c8ccd8';
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const later=(ms,fn)=>setTimeout(()=>{if(ok())try{fn()}catch(e){}},ms/((typeof S!=='undefined'&&S.speed)||1));
/* on applique le silence */
{const sk0=skill;skill=function(u,sk,sc){const r=sk0.apply(this,arguments);
  try{if(B&&u&&sk&&sk.fx&&sk.fx.silence){const n=sk.fx.silence;for(const t of alive(1-u.side)){t.sil=Math.max(t.sil||0,n);float(t,'🤐 silence','info')}
    log(`🤐 <b>${u.name}</b> coupe la parole : plus d'ultime pendant <b>${n} tours</b>.`,'sk')}}catch(e){}
  return r}}
/* tant qu'on est réduit au silence, l'ultime ne part pas */
{const a0=act;act=async function(u){try{if(B&&u&&u.hp>0&&u.sil>0){u.sil--;const keep=u.en;u.en=Math.min(u.en,99);
  if(keep>=100&&ok()){const b=uc(u);float(u,'🤐','info');ringFx(b.x,b.y,SIL,b.s*.6,420,3,.6)}
  const r=await a0.apply(this,arguments);try{u.en=Math.min(100,Math.max(u.en,Math.min(99,keep)))}catch(e){}
  try{refreshOne(u)}catch(e){}return r}}catch(e){}
  return a0.apply(this,arguments)}}
/* passif : chaque attaque normale lui vole des mots */
{const b0=basicFx;basicFx=function(s,t,crit){const r=b0.apply(this,arguments);
  /* (v430 : le vol d'énergie est passé dans deal, pour marcher aussi en ultra et en combat rapide) */
  return r}}
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);try{if(sk&&sk.fx&&sk.fx.silence)r+=` Les ennemis ne peuvent plus lancer leur ultime pendant <b>${sk.fx.silence} tours</b> : leur énergie reste bloquée.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill marnpas"><div class="sn">🤐 Celui qui n'a plus de voix</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Chacune de ses attaques normales <b>vole 15 énergie</b> à sa cible et <b>la garde pour lui</b>. Et un ennemi réduit au silence subit <b>+20 % de dégâts</b> de sa part. Il prend les mots des autres, un par un.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===MARN){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}

/* ---------- l'ultime : le jeu se tait vraiment ---------- */
function hush(ms){try{if(!AU.ok||!AU.M)return;const t=AU.ctx.currentTime;AU.M.v.gain.setTargetAtTime(.0001,t,.03);AU.M.dry.gain.setTargetAtTime(.0001,t,.03);
  setTimeout(()=>{try{auApply()}catch(e){}},ms)}catch(e){}}
function greyVeil(dur){fxItem(dur,(c,p)=>{const al=(p<.12?p/.12:p>.78?(1-p)/.22:1)*.52;c.globalAlpha=al;c.fillStyle='#0b0a14';c.fillRect(0,0,FXS.w,FXS.h)})}
function silentRing(x,y,r0,r1,dur,col,w,delay){fxItem(dur,(c,p)=>{const g=ease(p),al=1-p;c.globalAlpha=al*.9;c.strokeStyle=col||SIL;c.lineWidth=(w||3)*(1-p*.6);c.beginPath();c.arc(x,y,r0+(r1-r0)*g,0,7);c.stroke()},delay)}
function holdCuts(cuts,dur){fxItem(dur,(c,p)=>{c.lineCap='round';cuts.forEach((q,i)=>{const t0=i*.045,g=Math.max(0,Math.min(1,(p-t0)*7));if(g<=0)return;
  const x=q[0]+(q[2]-q[0])*g,y=q[1]+(q[3]-q[1])*g,al=p>.88?(1-p)/.12:1;
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.35;c.strokeStyle=EYE;c.lineWidth=7;c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(x,y);c.stroke();
  c.globalCompositeOperation='source-over';c.globalAlpha=al;c.strokeStyle='#eef4ff';c.lineWidth=2.4;c.beginPath();c.moveTo(q[0],q[1]);c.lineTo(x,y);c.stroke()})})}
function period(x,y,dur){fxItem(dur||760,(c,p)=>{const g=ease(Math.min(1,p*2.6)),al=p>.6?(1-p)/.4:1;
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.55;c.drawImage(spr(EYE),x-34*g,y-34*g,68*g,68*g);
  c.globalCompositeOperation='source-over';c.globalAlpha=al;c.fillStyle='#ffffff';c.beginPath();c.arc(x,y,7.5*g,0,7);c.fill()})}
LEG2[MARN]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,fm=rowMid(1-u.side);
  /* il lève la main : le monde se tait */
  hush(2400);greyVeil(2100);vignette('#0b0a14',1700,.62);try{dimOn(.5)}catch(e){}
  glowPulse(a.x,a.y-a.s*.3,EYE,520,a.s*.55);
  silentRing(a.x,a.y,a.s*.25,Math.max(W,H)*.8,640,SIL,4.4);
  silentRing(a.x,a.y,a.s*.25,Math.max(W,H)*.6,640,EYE,2,90);
  try{cSnd&&cSnd.ok&&cSnd.ok()}catch(e){}
  await fxWait(320);if(!B)return;
  /* il disparaît */
  await cardMove(u,0,u.side?24:-24,200);if(!B)return;
  for(let i=0;i<4;i++){const b=uc(u),dx=(fm.x-b.x)*(i+1)/5,dy=(fm.y-b.y)*(i+1)/5;
    fxItem(420,(c,p)=>{c.globalAlpha=(1-p)*.42;c.fillStyle=i%2?SIL:'#2a2640';c.beginPath();c.ellipse(b.x+dx,b.y+dy,b.s*.2,b.s*.3,0,0,7);c.fill()},i*55)}
  /* trois estocades, nettes, sans un bruit */
  const cuts=[];
  tg.forEach((t,i)=>{const b=uc(t);for(let k=0;k<3;k++){const an=-1+k*.9+(i%2?.25:-.25),L=b.s*1.6;
    cuts.push([b.x-Math.cos(an)*L/2,b.y-Math.sin(an)*L/2,b.x+Math.cos(an)*L/2,b.y+Math.sin(an)*L/2])}});
  holdCuts(cuts,1500);
  await fxWait(620);if(!B)return;
  /* le point final : tout tombe en même temps */
  period(W/2,H*.44,820);
  await fxWait(240);if(!B)return;
  flash('#ffffff',220,.8);shake(3);camPunch(fm,1.08,440);
  silentRing(W/2,H*.44,10,Math.max(W,H)*.95,760,'#ffffff',5);
  silentRing(W/2,H*.44,10,Math.max(W,H)*.7,760,EYE,2.4,70);
  for(const t of tg){const b=uc(t);
    for(let k=0;k<3;k++){const an=-1+k*.9,L=b.s*1.6;slashLine(b.x,b.y,L,an,['#ffffff',EYE],240,3.4,k*40)}
    sparks(b.x,b.y,'#c23a44',12,7,2,22);shapes(b.x,b.y,'tri',['#c23a44','#eef4ff',SIL],9,6,3.6,34,.2,{add:1});
    ringFx(b.x,b.y,SIL,b.s*.6,420,4);hit(X,t,1.25);await fxWait(45)}
  await fxWait(340);if(!B)return;
  textPop(W/2,fm.y-fm.s*.34,'POINT FINAL',SIL,Math.max(16,Math.min(26,W*.9/9)),1000);
  await fxWait(420)};
const st=document.createElement('style');st.textContent=`
.sgfig.marnf{filter:drop-shadow(0 0 14px rgba(159,232,200,.6))}
.skill.marnpas{border-color:rgba(159,232,200,.5)!important;background:linear-gradient(135deg,rgba(159,232,200,.12),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{Object.assign(I18N_EN,{'Marn le Sans-Voix':'Marn the Voiceless','Point Final':'Full Stop',"Celui qui n'a plus de voix":'The one with no voice left','POINT FINAL':'FULL STOP',
 "Termine la chronique « Le Silence de Marn » dans l'onglet Aventure pour qu'il rejoigne ton équipe.":'Finish the chronicle “Marn’s Silence” in the Adventure tab for him to join your team.',
 "Chacune de ses attaques normales <b>vole 15 énergie</b> à sa cible et <b>la garde pour lui</b>. Et un ennemi réduit au silence subit <b>+20 % de dégâts</b> de sa part. Il prend les mots des autres, un par un.":'Each of his normal attacks <b>steals 15 energy</b> from its target and <b>keeps it</b>. Silenced enemies take <b>+20% damage</b> from him. He takes other people’s words, one at a time.'})}catch(e){}
}catch(e){console.warn('marn skill',e)}})();
