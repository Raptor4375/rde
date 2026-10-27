
/* ================= APPARENCES (skins) · DRESSING · CATALOGUE DES EXCLUSIVITÉS ================= */
/* Un skin = un « héros virtuel » (identifiant 400+) avec son propre look, son ultra-thème, son décor et son arme.
   Équiper un skin remplace le dessin du héros partout (cartes, combat, ultra-évolutions).
   SKIN_GO : date d'ouverture dans la version publique. La version Claude (tests) l'a toujours. */
let SKIN_GO=Date.UTC(2026,9,27,7,10);
let skinOn=()=>!window.RDE_APP||Date.now()>=SKIN_GO;
const SKTEST=()=>!window.RDE_APP;
const SKINS={
 dk_cendres:{n:'Drakhar des Cendres',hero:65,vid:400,season:'p_cendres',how:"Pass Pro « Les Cendres du Premier Porteur » : palier 60",
  d:"Le dernier wyrm qui a vu brûler la flamme du Premier Porteur. Ses écailles sont devenues de l'obsidienne, et la braise coule encore dans ses veines.",
  look:['#3a3330','#120c0c','#0f0b0c','#2a201e','#ff6a1a','#fff2c0','bg:flame back:wings-dragon head:dragon eyes:slit mouth:none body:scale ear:none'],
  uth:{n:'Dragon de Cendre',m:'#0a0707',s:'#2a1c18',a:'#ff6a1a',e:'#ffffff',bg:'flame',w:null,hat:null,fx:'embers',hat:'ashcrown',c:'#ff6a1a',c2:'#c8bcb0',h3:'#ff4a10'},
  forms:['Drakhar des Cendres','Braise Éveillée','Couronne de Cendre','Inferno Ancestral']}};
const SKV={};for(const k in SKINS)SKV[SKINS[k].vid]=k;
/* --- pièces dessinées du skin (repère du corps : viewBox 0 -8 160 244, tête ≈ 80,32) --- */
function dkcBG(u){const id='dkc'+u;let o=`<defs><radialGradient id="${id}s" cx="50%" cy="30%" r="70%"><stop offset="0" stop-color="#ff7a2a" stop-opacity="${.32+u*.08}"/><stop offset=".55" stop-color="#5a0e04" stop-opacity=".3"/><stop offset="1" stop-color="#0a0202" stop-opacity="0"/></radialGradient></defs>`;
  o+=`<g opacity=".9"><ellipse cx="80" cy="96" rx="78" ry="110" fill="url(#${id}s)"/>`;
  /* le crâne du dragon ancien, en cendres, derrière */
  o+=`<g opacity="${.35+u*.12}" transform="translate(80 70)"><path d="M-70 -6Q-60 -46 -20 -50Q0 -64 20 -50Q60 -46 70 -6Q52 -18 38 -14Q30 6 0 10Q-30 6 -38 -14Q-52 -18 -70 -6Z" fill="#1a0806" stroke="#5a1a0a" stroke-width="2"/><path d="M-30 -24Q-20 -34 -10 -24Q-20 -18 -30 -24ZM30 -24Q20 -34 10 -24Q20 -18 30 -24Z" fill="#ff6a1a"><animate attributeName="opacity" values=".4;1;.4" dur="3s" repeatCount="indefinite"/></path><path d="M-56 -30L-74 -66L-44 -42ZM56 -30L74 -66L44 -42Z" fill="#1a0806" stroke="#5a1a0a" stroke-width="1.6"/></g>`;
  if(u>=1)o+=`<circle cx="80" cy="70" r="${70+u*6}" fill="none" stroke="#ff6a1a" stroke-width="1.6" stroke-dasharray="3 7" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="0 80 70" to="360 80 70" dur="26s" repeatCount="indefinite"/></circle>`;
  if(u>=2)o+=[...Array(10)].map((_,k)=>{const a=k*36*Math.PI/180,x=80+Math.cos(a)*86,y=70+Math.sin(a)*86;return`<path d="M${x.toFixed(1)} ${y.toFixed(1)}q-5 -9 0 -17q5 8 0 17z" fill="${k%2?'#ffb21a':'#ff5a14'}" opacity=".85"><animate attributeName="opacity" values=".3;.95;.3" dur="${1.2+k%3*.4}s" repeatCount="indefinite"/></path>`}).join('');
  o+=[...Array(12+u*6)].map((_,k)=>`<circle r="${(.8+k%3*.5).toFixed(1)}" fill="${k%3?'#ffb21a':'#c8bcb0'}" opacity=".85"><animateMotion dur="${3+k%5}s" begin="${-k*.45}s" repeatCount="indefinite" path="M${(k*23)%160} 236Q${(k*41)%160} 120 ${(k*17)%160} -8"/></circle>`).join('');
  return o+'</g>'}
function dkcFX(u){let o='';
  /* veines de lave sur l'armure */
  const VL='M70 76L73 88L68 98L72 112M63 86L67 96',VR='M90 76L87 88L92 98L88 112M97 86L93 96',VC='M80 84V106';
  const veins=`<g fill="none" stroke-linecap="round" stroke-linejoin="round"><path d="${VL}${VR}${VC}" stroke="#ff6a1a" stroke-width="${1.1+u*.2}" opacity=".9"><animate attributeName="stroke" values="#ff6a1a;#ffd84a;#ff6a1a" dur="${2.4-u*.35}s" repeatCount="indefinite"/></path><path d="${VL}${VR}${VC}" stroke="#fff2c0" stroke-width=".5" opacity=".75"/></g>`;;
  o+=`<g opacity=".95">${veins}</g>`;
  /* cœur de braise dans la poitrine */
  o+=`<circle cx="80" cy="92" r="${2.4+u*.5}" fill="#fff2c0" opacity=".95"><animate attributeName="opacity" values=".6;1;.6" dur="1.6s" repeatCount="indefinite"/></circle><circle cx="80" cy="92" r="${6+u}" fill="#ff6a1a" opacity=".22"/>`;
  /* ailes de feu (forme III) */
  if(u>=3)o=`<g opacity=".8">${[1,-1].map(sx=>`<path transform="translate(80 70) scale(${sx} 1)" d="M10 -4Q46 -52 78 -40Q64 -30 66 -16Q52 -22 50 -8Q40 -14 36 2Q26 -2 10 8Z" fill="#ff5a14" opacity=".4"><animate attributeName="opacity" values=".25;.55;.25" dur="1.4s" repeatCount="indefinite"/></path><path transform="translate(80 70) scale(${sx} 1)" d="M14 -2Q44 -38 70 -34Q58 -26 58 -16Q46 -18 44 -8Q36 -10 32 2Z" fill="#ffd84a" opacity=".3"/>`).join('')}</g>`+o;
  /* braises qui montent */
  o+=[...Array(6+u*3)].map((_,k)=>`<circle cx="${50+(k*19)%60}" cy="200" r="${(1+k%2*.6).toFixed(1)}" fill="${k%2?'#ffd84a':'#ff6a1a'}"><animate attributeName="cy" values="210;${40+k%4*10}" dur="${2.4+k%3*.7}s" begin="${-k*.5}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="${2.4+k%3*.7}s" begin="${-k*.5}s" repeatCount="indefinite"/></circle>`).join('');
  return`<g class="skfx">${o}</g>`}
LGW.ashaxe=L=>`<rect x="-1.9" y="-${L-4}" width="3.8" height="${L+6}" rx="1.4" fill="#120c0a" stroke="#3a2a24" stroke-width=".5"/>${[0,1,2].map(k=>`<rect x="-2.2" y="-${L-14-k*14}" width="4.4" height="2" fill="#ff6a1a" opacity=".8"/>`).join('')}<path d="M1 -${L+6}Q26 -${L+4} 28 -${L-16}Q16 -${L-9} 1 -${L-14}Z" fill="#1a1210" stroke="#ff6a1a" stroke-width="1.4"/><path d="M4 -${L+3}Q22 -${L+1} 24 -${L-12}" fill="none" stroke="#ffd84a" stroke-width="1.2"><animate attributeName="stroke-opacity" values=".4;1;.4" dur="1.4s" repeatCount="indefinite"/></path><path d="M-1 -${L+6}Q-16 -${L+1} -17 -${L-11}Q-9 -${L-8} -1 -${L-12}Z" fill="#14100e" stroke="#ff6a1a" stroke-width="1.1"/><circle cx="0" cy="-${L+7}" r="2.6" fill="#ffd84a"/>`;
/* enregistrement du héros virtuel */
for(const k in SKINS){const s=SKINS[k];LOOKS[s.vid]=s.look;try{UTH_H[s.vid]=s.uth}catch(e){}}
try{LGB[400]=u=>dkcBG(u);LGA[400]=['ashaxe',80]}catch(e){}
const SKFX={400:dkcFX};
function vHero(sk){const s=SKINS[sk],H=HEROES[s.hero];return Object.assign({},H,{i:s.vid,n:s.n})}
{const po=poseOf;poseOf=function(h){if(h&&SKV[h.i]!=null)return po(HEROES[SKINS[SKV[h.i]].hero]);return po.apply(this,arguments)}}
/* --- possession et équipement --- */
function skOwned(k){return(S.skins||[]).includes(k)}
function skEq(hid){const k=S.skinEq&&S.skinEq[hid];return k&&SKINS[k]&&skOwned(k)&&skinOn()?k:null}
function skRefresh(hid){try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null,typeof PCACHE!=='undefined'?PCACHE:null,typeof PIMG!=='undefined'?PIMG:null])if(C)for(const key of Object.keys(C))if(new RegExp('(^|[^0-9])'+hid+'(_|$)').test(key))delete C[key];if(typeof BTIC!=='undefined')for(const key of [...BTIC.keys()])if(key.startsWith(hid+'_'))BTIC.delete(key)}catch(e){}}
function skGive(k){S.skins=S.skins||[];if(!S.skins.includes(k)){S.skins.push(k);try{toast(`👗 Nouvelle apparence : ${SKINS[k].n}`)}catch(e){}}}
function skWear(hid,k){S.skinEq=S.skinEq||{};if(k&&(!SKINS[k]||SKINS[k].hero!==hid||!skOwned(k)))return;if(k)S.skinEq[hid]=k;else delete S.skinEq[hid];skRefresh(hid);save();render()}
/* --- le dessin : si un skin est porté, on dessine le héros virtuel --- */
{const hb=heroBody;heroBody=function(h,u=0){const k=h&&skEq(h.i);if(!k)return hb.apply(this,arguments);const v=vHero(k);let s=hb.call(this,v,u);
  try{const f=SKFX[v.i];if(f&&s.indexOf('skfx')<0){const z=s.lastIndexOf('</svg>');const rm=/<g transform="(rotate\([-\d.]+ 80 220\))"/.exec(s);s=s.slice(0,z)+(rm?`<g transform="${rm[1]}">${f(u||0)}</g>`:f(u||0))+s.slice(z)}}catch(e){}return s}}
const skU=hid=>{const o=S.heroes&&S.heroes[hid];return o&&HEROES[hid].r>=4?Math.min(3,o.u||0):0};
{const pr=portrait;portrait=function(h){const k=h&&skEq(h.i);if(!k)return pr.apply(this,arguments);const v=vHero(k);const had=S.heroes[v.i];S.heroes[v.i]=S.heroes[h.i];try{return pr.call(this,v)}finally{if(had)S.heroes[v.i]=had;else delete S.heroes[v.i]}}}
{const pu=portraitU;portraitU=function(h,u){const k=h&&skEq(h.i);if(!k)return pu.apply(this,arguments);return pu.call(this,vHero(k),u)}}
