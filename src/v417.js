/* ================= V417 : PERRIN, LE DERNIER DE LA GARDE =================
   Dix-sept ans. On lui a dit de rendre son bouclier et de rentrer chez lui.
   Il n'est pas rentré. Plus il reste seul, plus il tient. */
const PRN=76;
(function(){try{
if(HEROES[PRN]||HEROES.length!==PRN)return;
HEROES.push({i:PRN,n:'Perrin le Dernier de la Garde',c:'Tank',r:3,
  exd:"Termine la chronique « Le Mur qui Reste » (Aegis) dans les Chroniques des Héros.",
  sk:{n:'Je tiens',tg:'team',fx:{shield:150,shieldself:200,taunt:2,wall:1}}});
const done=()=>{try{return!!(S.hchr&&S.hchr.d&&S.hchr.d['1_2'])}catch(e){return false}};
try{Object.defineProperty(HEROES[PRN],'ex',{configurable:true,get(){return(done()||(S.heroes&&S.heroes[PRN]))?0:1}})}catch(e){HEROES[PRN].ex=1}
try{LOOKS[PRN]=['#2a5aa8','#e8c05a','#c0c6d4','#c8872a','#f0cdaa','#5a4030','bg:star back:none hair:short eyes:round mouth:set body:small ear:human']}catch(e){}
}catch(e){console.warn('perrin hero',e)}})();

/* ---------- le dessin ---------- */
(function(){try{
if(!HEROES[PRN])return;
const PC={},O='stroke="#141020" stroke-width="1.7" stroke-linejoin="round" stroke-linecap="round"',
 BL='#2a5aa8',BL2='#4a86d8',BL3='#1a3a70',GD='#e8c05a',GD2='#fff0b8',ST='#c0c6d4',ST2='#8a90a2',ST3='#5e6478',
 LE='#5a4030',SK='#f0cdaa',SK2='#cfa47e',HR='#c8872a',HR2='#e8aa4a';
const A=(at,v,d,b)=>`<animate attributeName="${at}" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
function prnArt(q,u,o){u=Math.max(0,Math.min(3,u|0));o=o||{};
 const lim=(d,w,c)=>`<path d="${d}" fill="none" stroke="#141020" stroke-width="${w+3}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
 let s=`<defs>
  <linearGradient id="${q}b" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="${BL2}"/><stop offset=".55" stop-color="${BL}"/><stop offset="1" stop-color="${BL3}"/></linearGradient>
  <linearGradient id="${q}m" x1=".2" y1="0" x2=".8" y2="1"><stop offset="0" stop-color="#e6ebf6"/><stop offset=".5" stop-color="${ST}"/><stop offset="1" stop-color="${ST3}"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${GD2}" stop-opacity=".4"/><stop offset=".6" stop-color="${BL2}" stop-opacity=".2"/><stop offset="1" stop-color="${BL}" stop-opacity="0"/></radialGradient></defs>`;
 s+=`<ellipse cx="80" cy="104" rx="74" ry="100" fill="url(#${q}g)"/>`;
 if(!o.bust)s+=`<ellipse cx="80" cy="214" rx="34" ry="6" fill="#000" opacity=".45"/>`;
 /* jambes trop grandes pour lui */
 s+=lim('M70 150L66 186L64 200',13,`url(#${q}m)`);
 s+=lim('M92 150L98 186L100 200',13,`url(#${q}m)`);
 s+=`<path d="M52 196h26q4 0 4 4v9q0 4-4 4H56q-4 0-4-4Z" fill="${LE}" ${O}/>`;
 s+=`<path d="M86 196h26q4 0 4 4v9q0 4-4 4H90q-4 0-4-4Z" fill="${LE}" ${O}/>`;
 /* la cotte et le surcot */
 s+=`<path d="M80 64Q58 68 54 86L50 132Q66 146 80 146T110 132L106 86Q102 68 80 64Z" fill="url(#${q}m)" ${O}/>`;
 s+=`<path d="M80 66Q64 70 61 86L58 132Q68 142 80 142T102 132L99 86Q96 70 80 66Z" fill="url(#${q}b)" ${O}/>`;
 s+=`<path d="M80 86l6 10-6 10-6-10Z" fill="${GD}" ${O}/>`;
 s+=`<path d="M74 104h12v20H74Z" fill="${GD}" opacity=".9" stroke="#141020" stroke-width="1.4"/>`;
 s+=`<path d="M80 104v20M74 112h12" stroke="${BL3}" stroke-width="1.4"/>`;
 /* épaulière dépareillée : une seule, trop grande */
 s+=`<path d="M52 78q14-8 24 2l-4 12q-10-8-22-2Z" fill="url(#${q}m)" ${O}/>`;
 s+=`<path d="M50 88q12-6 22 1l-3 9q-9-6-20-1Z" fill="url(#${q}m)" ${O}/>`;
 s+=`<path d="M106 76q8 2 10 10l-10 4q-1-6-6-8Z" fill="${LE}" ${O}/>`;
 /* bras droit : la main serrée sur l'épée, encore au fourreau */
 s+=lim('M104 88L116 112L112 136',11.5,`url(#${q}m)`);
 s+=`<circle cx="112" cy="140" r="6" fill="${SK}" ${O}/>`;
 s+=`<path d="M116 128l10 36q1 4-3 5l-4 1q-4 1-5-3l-9-36Z" fill="${LE}" ${O}/>`;
 s+=`<path d="M112 120h10l2 8h-12Z" fill="${GD}" ${O}/>`;
 /* bras gauche : accroché à l'énarme du bouclier */
 s+=lim('M58 88L48 112L56 130',11.5,`url(#${q}m)`);
 /* tête */
 s+=`<ellipse cx="80" cy="44" rx="13.4" ry="15" fill="${SK}" ${O}/>`;
 s+=`<path d="M67 44Q64 26 80 24Q96 26 93 44Q91 34 86 32Q80 36 74 32Q69 34 67 44Z" fill="${HR}" ${O}/>`;
 s+=`<path d="M86 26q6 3 7 10l-4 1q-1-6-5-8Z" fill="${HR2}" ${O}/>`;
 /* le heaume, trop grand, repoussé en arrière, cabossé */
 s+=`<path d="M62 36q0-20 18-21t18 21l-2 6q-4-14-16-14T64 42Z" fill="url(#${q}m)" ${O}/>`;
 s+=`<path d="M62 36h36l1.6 6H60.4Z" fill="${ST2}" ${O}/>`;
 s+=`<path d="M80 15v-5" stroke="${ST2}" stroke-width="2.4" stroke-linecap="round"/><circle cx="80" cy="9" r="2.6" fill="${GD}" ${O}/>`;
 s+=`<path d="M86 20q5 4 5.6 10" stroke="${ST3}" stroke-width="1.6" fill="none"/>`;
 s+=`<path d="M70 24q-3 5-2.6 10" stroke="${ST3}" stroke-width="1.6" fill="none"/>`;
 /* visage : dix-sept ans, et il reste quand même */
 s+=`<ellipse cx="74.6" cy="44.4" rx="2.3" ry="2.6" fill="#2a2440"/><ellipse cx="85.4" cy="44.4" rx="2.3" ry="2.6" fill="#2a2440"/>`;
 s+=`<circle cx="74" cy="43.6" r="1" fill="#fff"/><circle cx="84.8" cy="43.6" r="1" fill="#fff"/>`;
 s+=`<path d="M70.6 39.4q4.4-2.4 8.4-.4M89.4 39.4q-4.4-2.4-8.4-.4" stroke="${HR}" stroke-width="2.1" fill="none" stroke-linecap="round"/>`;
 s+=`<path d="M75.4 52.4h9.2" stroke="#b07a5a" stroke-width="2" stroke-linecap="round"/>`;
 s+=[[70,48],[73,50.6],[88,47.6],[90.6,50]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r=".9" fill="${SK2}"/>`).join('');
 /* le bouclier, plus grand que lui */
 s+=`<g transform="translate(-14 5) scale(.94)"><g><path d="M30 92Q80 78 130 92L128 148Q80 204 32 148Z" fill="url(#${q}b)" ${O} stroke-width="2.4"/>
  <path d="M34 96Q80 84 126 96L124 146Q80 196 36 146Z" fill="none" stroke="${GD}" stroke-width="2.2" opacity=".9"/>
  <path d="M80 88V196" stroke="${BL3}" stroke-width="2" opacity=".55"/>
  <path d="M80 104l10 16-10 16-10-16Z" fill="${GD}" ${O}/>
  <path d="M80 112l5 8-5 8-5-8Z" fill="${GD2}"/>
  <path d="M56 100l6 10M104 100l-6 10" stroke="${GD}" stroke-width="2" opacity=".75"/>
  <path d="M46 118q6 8 2 16M114 118q-6 8-2 16" stroke="${BL3}" stroke-width="2.4" opacity=".6"/>
  <path d="M100 140l12 6-11 3Z" fill="#141020" opacity=".7"/>
  <path d="M52 158l10 3-8 5Z" fill="#141020" opacity=".7"/>
  <circle cx="64" cy="132" r="2.6" fill="#141020" opacity=".65"/><circle cx="98" cy="156" r="2.2" fill="#141020" opacity=".6"/>
  ${u>=1?`<path d="M30 92Q80 78 130 92L128 148Q80 204 32 148Z" fill="none" stroke="${GD2}" stroke-width="2" opacity="0">${A('opacity','0;.85;0',2.8)}</path>`:''}
  ${u>=2?`<path d="M36 112q44-10 88 0" fill="none" stroke="${GD2}" stroke-width="1.6" opacity=".7"/><path d="M40 132q40-9 80 0" fill="none" stroke="${GD2}" stroke-width="1.6" opacity=".55"/>`:''}
  <animateTransform attributeName="transform" type="translate" values="0 0;0 -2.4;0 0" dur="3.6s" repeatCount="indefinite"/></g></g>`;
 if(u>=3)s+=`<g opacity=".7"><ellipse cx="80" cy="130" rx="60" ry="62" fill="none" stroke="${GD2}" stroke-width="1.6">${A('rx','52;70;52',3)}${A('opacity','.65;0;.65',3)}</ellipse></g>`;
 return s}
function prnBody(u){const k='b'+(u|0);if(PC[k])return PC[k];
 return PC[k]=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Perrin le Dernier de la Garde en pied">${prnArt('pb'+(u|0)+'_',u)}</svg>`}
function prnPortrait(u){const k='p'+(u|0);if(PC[k])return PC[k];const q='pp'+(u|0)+'_';
 return PC[k]=`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Perrin le Dernier de la Garde"><defs><radialGradient id="${q}bg" cx="50%" cy="34%" r="76%"><stop offset="0" stop-color="#3a5e9a"/><stop offset=".45" stop-color="#1a2846"/><stop offset="1" stop-color="#0a0e1a"/></radialGradient></defs><rect width="100" height="100" fill="url(#${q}bg)"/><g transform="translate(-66 -17) scale(1.45)">${prnArt(q,u,{bust:1})}</g></svg>`}
window.prnBody=prnBody;window.prnPortrait=prnPortrait;
{const pu=portraitU;portraitU=function(h,u){if(h&&h.i===PRN)return prnPortrait(u);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===PRN)return prnBody(u);return hb.apply(this,arguments)}}
try{const sf=sagaFig;sagaFig=function(w){if(w==='perrin')return`<div class="sgfig lore prnf">${prnBody(0)}</div>`;return sf.apply(this,arguments)}}catch(e){}
}catch(e){console.warn('perrin art',e)}})();

/* ---------- le mur qui reste ---------- */
(function(){try{
if(!HEROES[PRN])return;
const GD='#e8c05a',GD2='#fff0b8',BL='#4a86d8',WH='#ffffff';
const ok=()=>typeof B!=='undefined'&&B&&!B.skip&&typeof FXS!=='undefined'&&FXS.ctx&&!(typeof REDUCED!=='undefined'&&REDUCED);
const fallen=u=>{try{return B.units.filter(x=>x.side===u.side&&x!==u&&x.hp<=0).length}catch(e){return 0}};
/* chaque allié tombé le rend plus dur */
{const r0=refreshUnits;refreshUnits=function(){const r=r0.apply(this,arguments);
  try{if(B)for(const u of B.units){if(u.hid!==PRN||u.hp<=0)continue;
    if(u.dm0===undefined)u.dm0=u.dm||1;if(u.tm0===undefined)u.tm0=u.tm||1;
    const n=fallen(u);if(n===u.wallN)continue;
    const up=n>(u.wallN||0);u.wallN=n;
    u.dm=u.dm0*(1+.18*n);u.tm=u.tm0*Math.max(.45,1-.12*n);
    if(up){u.en=Math.min(100,(u.en||0)+20);
      log(`🛡️ <b>${u.name}</b> ne recule pas : +${Math.round(18*n)} % de dégâts, −${Math.round(12*n)} % de dégâts subis.`,'sk');
      if(ok())try{const b=uc(u);float(u,'🛡️ Je tiens','info');ringFx(b.x,b.y,GD,b.s*.7,520,4);glowPulse(b.x,b.y,GD2,480,b.s*.45)}catch(e){}}}}catch(e){}
  return r}}
/* son bouclier grandit avec ce qu'il a perdu */
{const sk0=skill;skill=function(u,sk,sc){
  if(!(B&&u&&u.hid===PRN&&sk&&sk.fx&&sk.fx.wall))return sk0.apply(this,arguments);
  const f=sk.fx,s0=f.shieldself,sh0=f.shield,n=fallen(u);
  f.shieldself=Math.round(s0*(1+.5*n));f.shield=Math.round(sh0*(1+.25*n));
  try{return sk0.apply(this,arguments)}finally{f.shieldself=s0;f.shield=sh0;
    try{if(n)log(`🛡️ Pour chaque compagnon tombé, Perrin tient un peu mieux : bouclier +${Math.round(50*n)} % sur lui.`,'sk')}catch(e){}}}}
/* l'animation : un mur qui monte devant l'équipe */
function wallFx(y,dur,col){fxItem(dur,(c,p)=>{const g=ease(Math.min(1,p*1.7)),al=p>.72?(1-p)/.28:1,H=FXS.h*.5*g;
  c.globalAlpha=al*.5;const gr=c.createLinearGradient(0,y,0,y-H);gr.addColorStop(0,hexA(col,.85));gr.addColorStop(1,hexA(col,0));
  c.fillStyle=gr;c.fillRect(0,y-H,FXS.w,H);
  c.globalAlpha=al*.9;c.strokeStyle=col;c.lineWidth=3;c.beginPath();c.moveTo(0,y-H);c.lineTo(FXS.w,y-H);c.stroke();
  for(let k=0;k<7;k++){c.globalAlpha=al*.3;c.lineWidth=1.6;c.beginPath();c.moveTo(FXS.w*k/7,y);c.lineTo(FXS.w*k/7,y-H);c.stroke()}})}
LEG2[PRN]=async X=>{const {u}=X;fxSetup();if(!FXS.ctx)return;
  const a=uc(u),W=FXS.w,H=FXS.h,m=rowMid(u.side),n=fallen(u);
  vignette('#101a32',1400,.5);
  glowPulse(a.x,a.y,GD2,560,a.s*.6);ringFx(a.x,a.y,GD,a.s*.8,520,4);
  await fxWait(260);if(!B)return;
  wallFx(m.y+m.s*.5,900,GD);
  shapes(a.x,a.y,'plus',[GD2,GD,WH],10,3,4,40,-.05,{add:1,ang:-Math.PI/2,spread:1});
  try{SND&&SND.thud&&SND.thud()}catch(e){}
  shake(2);camPunch(m,1.05,380);
  await fxWait(360);if(!B)return;
  for(const t of alive(u.side)){const b=uc(t);domeFx(b.x,b.y,GD,b.s*.55,760);await fxWait(45)}
  if(n>0)textPop(W/2,m.y-m.s*.45,n>=3?'PERSONNE NE PASSE':'JE TIENS',GD2,Math.max(15,Math.min(23,W*.9/11)),900);
  await fxWait(420)};
try{const sd=skillDesc;skillDesc=function(sk){let r=sd.apply(this,arguments);
  try{if(sk&&sk.fx&&sk.fx.wall)r+=` Le bouclier qu'il se donne augmente de <b>+50 % par allié tombé</b> (et celui de l'équipe de +25 %).`}catch(e){}return r}}catch(e){}
const PASS=`<div class="skill prnpas"><div class="sn">🛡️ Le mur qui reste</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.4px">CAPACITÉ · PASSIVE</div><p style="margin:6px 0 0;font-size:13px">Pour <b>chaque allié tombé</b> : <b>+18 % de dégâts</b>, <b>−12 % de dégâts subis</b> et <b>+20 énergie</b> immédiatement. Plus il reste seul, plus il tient.</p></div>`;
try{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===PRN){const mo=$('#ovl .modal'),sk=mo&&mo.querySelector('.skill');if(sk)sk.insertAdjacentHTML('afterend',PASS)}}catch(e){}return r}}catch(e){}
const st=document.createElement('style');st.textContent=`
.sgfig.prnf{filter:drop-shadow(0 0 13px rgba(232,192,90,.5))}
.skill.prnpas{border-color:rgba(232,192,90,.5)!important;background:linear-gradient(135deg,rgba(232,192,90,.13),rgba(74,134,216,.1) 60%,transparent 80%),var(--panel)!important}`;document.head.appendChild(st);
try{Object.assign(I18N_EN,{'Perrin le Dernier de la Garde':'Perrin the Last of the Guard','Je tiens':'I Hold','JE TIENS':'I HOLD','PERSONNE NE PASSE':'NOBODY GETS THROUGH','🛡️ Le mur qui reste':'🛡️ The Wall That Stays',
 "Pour <b>chaque allié tombé</b> : <b>+18 % de dégâts</b>, <b>−12 % de dégâts subis</b> et <b>+20 énergie</b> immédiatement. Plus il reste seul, plus il tient.":"For <b>every fallen ally</b>: <b>+18 % damage</b>, <b>−12 % damage taken</b> and <b>+20 energy</b> at once. The more alone he is, the harder he holds."})}catch(e){}
}catch(e){console.warn('perrin mur',e)}})();
