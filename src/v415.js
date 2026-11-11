/* ================= V415 : ROUGE-GARANCE, LA DUELLISTE =================
   Fille de teinturiers : le rouge sur ses bras, c'est de la garance, pas du sang.
   Elle laisse croire ce qu'on veut. Elle ne se bat qu'en duel, et elle contre tout. */
const GAR=74;
(function(){try{
if(HEROES[GAR]||HEROES.length!==GAR)return;
HEROES.push({i:GAR,n:'Rouge-Garance la Duelliste',c:'Guerrier',r:4,
  sk:{n:'Mise en Garde',tg:'one',fx:{dmg:300,duel:2,crit:25}}});
try{LOOKS[GAR]=['#b5243a','#2a1220','#d8dce8','#5a2018','#f4ece0','#e8c6a8','bg:blood back:cape hair:tail eyes:sharp mouth:smirk body:slim ear:human']}catch(e){}
}catch(e){console.warn('garance hero',e)}})();

/* ---------- le dessin ---------- */
(function(){try{
if(!HEROES[GAR])return;
const GC={},O='stroke="#160a12" stroke-width="1.6" stroke-linejoin="round" stroke-linecap="round"',
 RG='#b5243a',RG2='#e04a5c',RG3='#7a1428',CH='#2a1220',WH='#f4ece0',WH2='#ded2c2',ST='#d8dce8',ST2='#8a90a4',
 HR='#5a2018',HR2='#8a3020',SK='#e8c6a8',SK2='#c79a78',GLD='#e8b84a';
const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
function garArt(q,u,o){u=Math.max(0,Math.min(3,u|0));o=o||{};
 const lim=(d,w,c)=>`<path d="${d}" fill="none" stroke="#160a12" stroke-width="${w+3.2}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 let s=`<defs>
  <linearGradient id="${q}c" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="${RG}"/><stop offset=".5" stop-color="${RG3}"/><stop offset="1" stop-color="#520c1a"/></linearGradient>
  <linearGradient id="${q}s" x1=".15" y1="0" x2=".85" y2="1"><stop offset="0" stop-color="${RG2}"/><stop offset=".6" stop-color="${RG}"/><stop offset="1" stop-color="${RG3}"/></linearGradient>
  <linearGradient id="${q}d" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#46203a"/><stop offset=".6" stop-color="#32162a"/><stop offset="1" stop-color="${CH}"/></linearGradient>
  <linearGradient id="${q}bl" x1="0" y1="1" x2="1" y2="0"><stop offset="0" stop-color="${ST2}"/><stop offset=".5" stop-color="#ffffff"/><stop offset="1" stop-color="${ST}"/></linearGradient>
  <linearGradient id="${q}ar" x1=".1" y1="1" x2=".6" y2="0"><stop offset="0" stop-color="${RG3}"/><stop offset=".5" stop-color="${RG}"/><stop offset="1" stop-color="#d0566a"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${RG2}" stop-opacity=".5"/><stop offset="1" stop-color="${RG}" stop-opacity="0"/></radialGradient></defs>`;
 s+=`<ellipse cx="80" cy="104" rx="76" ry="102" fill="url(#${q}g)"/>`;
 if(u>=1)s+=[...Array(3+u*3)].map((_,i)=>{const x=16+((i*53)%128),y=46+((i*71)%146);
   return`<path d="M${x} ${y}q4.5-6.5 9 0q-4.5 7.5-9 0Z" fill="${i%2?RG2:RG}" opacity="0"><animateTransform attributeName="transform" type="translate" values="0 12;0 -18" dur="${4+i%3}s" begin="${-i*.7}s" repeatCount="indefinite"/>${A('opacity','0;.7;0',4+i%3,-i*.7)}</path>`}).join('');
 if(!o.bust)s+=`<ellipse cx="80" cy="214" rx="40" ry="6" fill="#000" opacity=".45"/>`;
 /* la demi-cape, drapée dans le dos */
 s+=`<g><path d="M66 60Q36 78 28 128Q24 156 12 174L30 182L38 166L46 180L54 162L62 176L70 152Q62 102 88 70Z" fill="url(#${q}c)" ${O}/>
   <path d="M64 66Q40 86 34 126Q31 150 24 166" fill="none" stroke="${RG3}" stroke-width="1.8" opacity=".75"/>
   <animateTransform attributeName="transform" type="rotate" values="-2.5 70 64;3.5 70 64;-2.5 70 64" dur="4.6s" repeatCount="indefinite"/></g>`;
 /* jambes : fente d'escrime, jambe avant pliée */
 s+=lim('M92 128L112 160L122 192',15,`url(#${q}d)`);
 s+=lim('M70 128L56 158L56 192',15,`url(#${q}d)`);
 s+=`<path d="M44 190h25q4 0 4 4v9q0 4-4 4H48q-4 0-4-4Z" fill="#120a10" ${O}/>`;
 s+=`<path d="M112 186l21 11q4 2 2 6l-4 7q-2 4-6 2l-21-11Z" fill="#120a10" ${O}/>`;
 s+=`<path d="M45 193q13-6 26 0M111 189q11 5 21 11" stroke="${RG}" stroke-width="3.2" fill="none" stroke-linecap="round"/>`;
 /* buste */
 s+=`<path d="M80 56Q58 61 54 80L50 122Q65 136 80 136T110 122L106 80Q102 61 80 56Z" fill="url(#${q}d)" ${O}/>`;
 /* chemise blanche : col et plastron */
 s+=`<path d="M80 56L67 70L74 100L80 110L86 100L93 70Z" fill="${WH}" ${O}/>`;
 s+=`<path d="M80 110L76 98h8Z" fill="${WH2}"/>`;
 s+=`<path d="M68 58q6 9 12 9t12-9l3 7q-7 11-15 11t-15-11Z" fill="${WH}" ${O}/>`;
 s+=[0,1,2].map(i=>`<circle cx="80" cy="${80+i*11}" r="2" fill="${GLD}" stroke="#160a12" stroke-width=".9"/>`).join('');
 /* écharpe de garance à la taille */
 s+=`<path d="M52 118q28 15 56 0l3.4 15q-30 16-62 0Z" fill="url(#${q}s)" ${O}/>`;
 s+=`<path d="M55 131q-7 18-4 33l11-4q-3-15 2-26Z" fill="${RG3}" ${O}/>`;
 s+=`<path d="M60 125q20 9 38 0" stroke="${RG3}" stroke-width="1.5" fill="none" opacity=".85"/>`;
 /* bras gauche : main sur la hanche, avant-bras teint de garance jusqu'au coude */
 s+=lim('M60 74L45 94',14,`url(#${q}d)`);
 s+=`<path d="M41 90q6-3 10 2l-5 7q-5-3-10-2Z" fill="${WH}" ${O}/>`;
 s+=lim('M45 96L60 116',12.4,`url(#${q}ar)`);
 s+=`<path d="M44.6 99.4q4.6-2.2 8.4.6" stroke="${RG3}" stroke-width="1.5" fill="none" opacity=".8"/>`;
 s+=`<path d="M49.6 104q2.6 3.6 2.6 7.4M54.6 108q2 3 2 5.6" stroke="${RG3}" stroke-width="1.3" fill="none" stroke-linecap="round" opacity=".55"/>`;
 s+=`<path d="M57 112q8 2 9.6 9q1 5-4 6q-6 1-9.6-4Z" fill="${RG}" ${O}/>`;
 s+=`<path d="M58.6 118.6q4.4-1.6 7.4 1M58 123q4-1.4 7 .6" stroke="${RG3}" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
 /* bras droit : la rapière haute */
 s+=lim('M100 72L114 64',14,`url(#${q}d)`);
 s+=`<path d="M108 58q6-3 10 2l-4 8q-5-3-10-2Z" fill="${WH}" ${O}/>`;
 s+=`<circle cx="115" cy="63" r="5.8" fill="${SK}" ${O}/>`;
 s+=`<g transform="translate(115 63) rotate(24)">
   <path d="M-2.2 0h4.4v14h-4.4Z" fill="${CH}" ${O}/><circle cx="0" cy="15.6" r="3.2" fill="${GLD}" ${O}/>
   <path d="M-9 -2h18" stroke="${ST}" stroke-width="3.4" stroke-linecap="round"/>
   <path d="M0 -4q-9 2-9 9t9 7.6q9-.6 9-7.6T0 -4Z" fill="none" stroke="${ST}" stroke-width="2.4"/>
   <path d="M-7 -3q7-6 14 0" fill="none" stroke="${ST2}" stroke-width="1.6"/>
   <path d="M-2.6 -4.4h5.2L1.6 -76q-.6-6-1.6-6t-1.6 6Z" fill="url(#${q}bl)" stroke="#160a12" stroke-width="1.2"/>
   <path d="M0 -8V-72" stroke="#ffffff" stroke-width=".9" opacity=".85"/>
   ${u>=2?`<path d="M-2.6 -4.4h5.2L1.6 -76q-.6-6-1.6-6t-1.6 6Z" fill="${RG2}" opacity="0">${A('opacity','0;.6;0',2.2)}</path>`:''}</g>`;
 /* queue-de-cheval, derrière */
 s+=`<g><path d="M67 25Q46 20 38 36Q31 52 41 65L50 58Q43 47 47 37Q53 27 68 32Z" fill="${HR}" ${O}/>
   <path d="M41 61q-8 6-7 15l9-2q-1-6 5-9Z" fill="${HR2}" ${O}/>
   <animateTransform attributeName="transform" type="rotate" values="-3 67 27;4 67 27;-3 67 27" dur="4s" repeatCount="indefinite"/></g>`;
 /* tête */
 s+=`<ellipse cx="80" cy="40" rx="14.6" ry="16.4" fill="${SK}" ${O}/>`;
 s+=`<path d="M65.4 41Q61 18 80 15Q99 18 94.6 41Q92 29 84 26Q80 31 72 26Q67 29 65.4 41Z" fill="${HR}" ${O}/>`;
 s+=`<path d="M88 17q10 4 12 13l-5.4 2q-2.4-8-9-10Z" fill="${HR2}" ${O}/>`;
 s+=`<path d="M66 28q-5 4-5.4 11l5 1.4q.4-7 4-10Z" fill="${HR}" ${O}/>`;
 s+=`<path d="M63 30q8-4 10 2l-9 5Z" fill="${RG}" ${O}/>`;
 /* visage : regard tranchant, cicatrice, sourire en coin */
 s+=`<path d="M68.6 40.6q3.4-5.2 9.4-2.2q-2.6 5-9.4 2.2ZM91.4 40.6q-3.4-5.2-9.4-2.2q2.6 5 9.4 2.2Z" fill="#1a0f18"/>`;
 s+=`<ellipse cx="73" cy="39.4" rx="1.9" ry="2.2" fill="#8e1a2e"/><ellipse cx="87" cy="39.4" rx="1.9" ry="2.2" fill="#8e1a2e"/>`;
 s+=`<circle cx="72.4" cy="38.6" r=".9" fill="#fff"/><circle cx="86.4" cy="38.6" r=".9" fill="#fff"/>`;
 s+=`<path d="M66.6 33.6q6.4-4.4 12-1.4M93.4 33.6q-6.4-4.4-12-1.4" stroke="${HR}" stroke-width="2.5" fill="none" stroke-linecap="round"/>`;
 s+=`<path d="M91.4 35.4l-1.6 9.6" stroke="${SK2}" stroke-width="1.6" stroke-linecap="round"/><path d="M90.6 38.2l2.6 1M89.9 42l2.6 1" stroke="${SK2}" stroke-width="1.1" stroke-linecap="round"/>`;
 s+=`<path d="M75.6 49.8q5 2.6 9.4-3.2" stroke="#8a3a44" stroke-width="2.1" fill="none" stroke-linecap="round"/>`;
 if(u>=3)s+=`<g opacity=".65"><circle cx="60" cy="118" r="12" fill="none" stroke="${RG2}" stroke-width="1.6">${A('r','8;22;8',2.6)}${A('opacity','.7;0;.7',2.6)}</circle></g>`;
 return s}
function garBody(u){const k='b'+(u|0);if(GC[k])return GC[k];
 return GC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rouge-Garance la Duelliste en pied">${garArt('gb'+(u|0)+'_',u)}</svg>`}
function garPortrait(u){const k='p'+(u|0);if(GC[k])return GC[k];const q='gp'+(u|0)+'_';
 return GC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Rouge-Garance la Duelliste"><defs><radialGradient id="${q}bg" cx="52%" cy="34%" r="76%"><stop offset="0" stop-color="#6a2436"/><stop offset=".45" stop-color="#36121f"/><stop offset="1" stop-color="#140810"/></radialGradient></defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-70 -22) scale(1.5)">${garArt(q,u,{bust:1})}</g></svg>`}
window.garBody=garBody;window.garPortrait=garPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===GAR)return garPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===GAR)return garBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='garance')return`<div class="sgfig lore garf">${garBody(0)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('garance art',e)}})();

/* ---------- riposte et duel ---------- */
(function(){try{
if(!HEROES[GAR])return;
const RG='#b5243a',RG2='#e04a5c',WH='#fff0e8',GLD='#e8b84a',RIP=70;
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
/* registre partagé : « quelqu'un vient d'en frapper un autre » (sert aussi au renvoi d'Orgemme) */
const HITH=[];try{window.RDEonHit=f=>{if(typeof f==='function')HITH.push(f)}}catch(e){}
const duel=()=>{try{const D=B&&B.duel;if(D&&D.t&&D.u&&D.t.hp>0&&D.u.hp>0&&B.round<=D.until)return D}catch(e){}return null};
window.RDEduel=duel;
let CAST=null;

/* les dégâts passent tous par là : bonus de duel, puis les contre-attaques */
{const d0=deal;deal=function(s,t,pct,o){o=o||{};let p=pct;
  try{const D=duel();if(D){if(s===D.u&&t===D.t)p=pct*1.4;else if(s===D.t&&t===D.u)p=pct*.8}}catch(e){}
  const d=d0.call(this,s,t,p,o);
  try{if(B&&d>0&&s&&t&&s.side!==t.side&&!o.ct)for(const f of HITH)f(s,t,d,o)}catch(e){}
  return d}}

/* passif : elle contre toutes les attaques normales, et tout ce qui vient de son adversaire en duel */
function riposte(g,s){if(!B||g.hp<=0||s.hp<=0)return;
  const e0=s.en;const d=deal(g,s,RIP,{ct:1});try{s.en=Math.min(100,e0)}catch(e){}
  log(`⚔️ <b>${g.name}</b> riposte sur ${s.name} : ${fmt(d)}`,'ba');
  if(ok())try{const b=uc(s);float(g,'⚔️ Riposte','info');slashLine(b.x,b.y,b.s*1.05,-.6,[WH,RG2],220,4);sparks(b.x,b.y,RG2,8,5,1.6,18);refreshOne(s);if(s.hp<=0)deathFx(s)}catch(e){}
  else{try{refreshOne(s)}catch(e){}}}
try{window.RDEonHit((s,t,d,o)=>{if(!t||t.hid!==GAR||t.hp<=0||!s||s.hp<=0)return;
  const D=duel();if(o&&o.sk&&!(D&&s===D.t))return;riposte(t,s)})}catch(e){}

/* l'ultime ouvre le duel : elle choisit le plus dangereux */
{const sk0=skill;skill=function(u,sk,sc){
  try{if(B&&u&&sk&&sk.fx&&sk.fx.duel){const f=alive(1-u.side);
    if(f.length){const t=f.reduce((a,b)=>((b.boss?1.6:1)*b.atk>(a.boss?1.6:1)*a.atk?b:a));
      B.duel={u,t,until:B.round+sk.fx.duel,won:0};
      log(`⚔️ <b>${u.name}</b> provoque <b>${t.name}</b> en duel. Plus personne d'autre ne s'en mêle pendant <b>${sk.fx.duel} tours</b>.`,'sk')}}}catch(e){}
  const D=duel();let s0=null;
  try{if(D&&D.t&&u&&u.side===D.t.side&&u!==D.t)s0=D.t.sh}catch(e){}
  CAST=u;let r;try{r=sk0.apply(this,arguments)}finally{CAST=null}
  try{if(s0!==null&&D.t.sh>s0){D.t.sh=s0;float(D.t,'🚫 duel','info')}}catch(e){}
  try{markDuel()}catch(e){}
  return r}}
/* pendant le duel, les deux adversaires n'existent plus que l'un pour l'autre */
{const p0=pickT;pickT=function(u){try{const D=duel();if(D){
   if(u===D.u)return D.t;if(u===D.t)return D.u;
   const ex=u.side===D.u.side?D.t:u.side===D.t.side?D.u:null;
   if(ex){const f=alive(1-u.side).filter(x=>x!==ex);if(f.length){const tt=f.filter(x=>x.taunt>0);return pick(tt.length?tt:f)}}}}catch(e){}
  return p0.apply(this,arguments)}}
/* ses alliés ne peuvent plus le soigner */
{const h0=heal;heal=function(t,v){try{const D=duel();if(D&&t===D.t&&CAST&&CAST!==D.t){float(t,'🚫 duel','info');return}}catch(e){}return h0.apply(this,arguments)}}

function markDuel(){try{document.querySelectorAll('#battle .u.duelon').forEach(e=>e.classList.remove('duelon'));
  const D=duel();if(!D)return;for(const x of[D.u,D.t]){const el=cardEl(x);if(el)el.classList.add('duelon')}}catch(e){}}
{const r0=refreshUnits;refreshUnits=function(){const r=r0.apply(this,arguments);
  try{const D=B&&B.duel;if(D&&D.t&&D.t.hp<=0&&!D.won&&D.u&&D.u.hp>0){D.won=1;log(`⚔️ <b>${D.u.name}</b> remporte le duel.`,'sk');
    if(ok()){const a=uc(D.u);textPop(a.x,a.y-a.s*.5,'DUEL REMPORTÉ',RG2,16,900);ringFx(a.x,a.y,RG2,a.s*.8,500,4)}}
   markDuel()}catch(e){}return r}}

/* ---------- l'ultime : Mise en Garde ---------- */
function thread(x1,y1,x2,y2,dur,delay){fxItem(dur,(c,p)=>{const g=Math.min(1,p*2.4),al=p>.7?(1-p)/.3:1;
  c.globalAlpha=al*.9;c.strokeStyle=RG2;c.lineWidth=2.2;c.setLineDash([7,6]);c.lineDashOffset=-p*60;
  c.beginPath();c.moveTo(x1,y1);c.lineTo(x1+(x2-x1)*g,y1+(y2-y1)*g);c.stroke();c.setLineDash([]);
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.3;c.lineWidth=7;c.stroke()},delay)}
function lunge(y,dur,delay){fxItem(dur||280,(c,p)=>{const g=ease(Math.min(1,p*1.8)),al=p>.5?(1-p)/.5:1;
  c.globalAlpha=al;c.strokeStyle='#ffffff';c.lineWidth=3.4;c.lineCap='round';
  c.beginPath();c.moveTo(0,y);c.lineTo(FXS.w*g,y);c.stroke();
  c.globalCompositeOperation='lighter';c.globalAlpha=al*.45;c.lineWidth=14;c.strokeStyle=RG2;c.stroke()},delay)}
LEG2[GAR]=async X=>{const {u,tg}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,t=tg[0]||(B.duel&&B.duel.t);if(!t)return;const b=uc(t);
  /* le monde se referme sur eux deux */
  vignette('#2a0810',1700,.66);try{dimOn(.6)}catch(e){}
  glowPulse(a.x,a.y,RG2,520,a.s*.5);glowPulse(b.x,b.y,RG2,520,b.s*.5);
  thread(a.x,a.y,b.x,b.y,760);
  try{cSnd&&cSnd.ok&&cSnd.ok()}catch(e){}
  await fxWait(360);if(!B)return;
  /* elle part */
  await cardMove(u,(b.x-a.x)*.45,(b.y-a.y)*.45,240);if(!B)return;
  for(let i=0;i<3;i++){const dx=(b.x-a.x)*(i+1)/4,dy=(b.y-a.y)*(i+1)/4;
    fxItem(380,(c,p)=>{c.globalAlpha=(1-p)*.4;c.fillStyle=i%2?RG:'#3a1424';c.beginPath();c.ellipse(a.x+dx,a.y+dy,a.s*.2,a.s*.3,0,0,7);c.fill()},i*50)}
  /* cinq touches, très vite */
  const ang=[-1.15,-.35,.45,1.2,0];
  for(let k=0;k<5;k++){slashLine(b.x+(k%2?6:-6),b.y+(k-2)*4,b.s*(k===4?1.5:1.05),ang[k],[WH,RG2],200,k===4?5:3.2,k*72);
    if(k<4)fxItem(160,(c,p)=>{c.globalAlpha=1-p;c.fillStyle=WH;c.beginPath();c.arc(b.x+Math.cos(ang[k])*b.s*.4,b.y+Math.sin(ang[k])*b.s*.4,3.4*(1-p),0,7);c.fill()},k*72+60)}
  try{for(let k=0;k<4;k++)setTimeout(()=>{try{SND&&SND.slash&&SND.slash()}catch(e){}},k*72/((S&&S.speed)||1))}catch(e){}
  await fxWait(430);if(!B)return;
  /* la botte */
  lunge(b.y,320);flash('#ffffff',200,.72);shake(3);camPunch(b,1.09,420);
  sparks(b.x,b.y,RG2,16,8,2.2,26);ringFx(b.x,b.y,RG2,b.s*.7,460,5);
  shapes(b.x,b.y,'petal',[RG2,RG,'#ffd0d8'],16,5,5,44,.15,{});
  hit(X,t,1.45);
  await fxWait(300);if(!B)return;
  ringFx(a.x,a.y,GLD,a.s*.7,520,3);thread(a.x,a.y,b.x,b.y,620);
  textPop(W/2,Math.min(a.y,b.y)-b.s*.3,'EN GARDE',RG2,Math.max(16,Math.min(26,W*.9/8)),950);
  try{markDuel()}catch(e){}
  await fxWait(420)};

/* ---------- textes et habillage ---------- */
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.duel)r+=` Elle provoque l'ennemi le plus dangereux en <b>duel pendant ${sk.fx.duel} tours</b> : eux deux ne peuvent plus cibler personne d'autre, personne d'autre ne peut les cibler, et <b>ses alliés ne peuvent plus le soigner ni le protéger</b>. Elle lui inflige +40 % de dégâts et en subit 20 % de moins.`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill garpas"><div class="sn">⚔️ Riposte</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Chaque <b>attaque normale</b> reçue est contrée aussitôt pour <b>${RIP} % de son ATQ</b>. Pendant un duel, elle contre aussi les <b>ultimes</b> de son adversaire.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===GAR){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`
#battle .u.duelon{box-shadow:0 0 0 2px ${RG2},0 0 20px rgba(224,74,92,.55)!important;border-radius:14px}
#battle .u.duelon::after{content:"⚔️";position:absolute;top:-8px;right:-6px;font-size:15px;filter:drop-shadow(0 1px 3px #000);z-index:3}
.sgfig.garf{filter:drop-shadow(0 0 14px rgba(224,74,92,.55))}
.skill.garpas{border-color:rgba(224,74,92,.5)!important;background:linear-gradient(135deg,rgba(224,74,92,.14),transparent 70%),var(--panel)!important}`;document.head.appendChild(st);
try{Object.assign(I18N_EN,{'Rouge-Garance la Duelliste':'Rouge-Garance the Duellist','Mise en Garde':'On Guard','EN GARDE':'ON GUARD','DUEL REMPORTÉ':'DUEL WON','⚔️ Riposte':'⚔️ Riposte','🚫 duel':'🚫 duel',
 'Chaque <b>attaque normale</b> reçue est contrée aussitôt pour <b>70 % de son ATQ</b>. Pendant un duel, elle contre aussi les <b>ultimes</b> de son adversaire.':'Every <b>normal attack</b> she takes is countered at once for <b>70 % of her ATK</b>. During a duel, she also counters her opponent’s <b>ultimates</b>.'})}catch(e){}
}catch(e){console.warn('garance duel',e)}})();
