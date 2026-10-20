
/* ================= V28 : ALÉA, LE HÉROS MYTHIQUE · TABLE D'ALÉA · LIVRE II ================= */
/* --- nouvelle rareté : Mythique --- */
RAR.push({n:'Mythique',m:3.6});RCOL.push('#ff5ad8');
H('Aléa le Joueur Masqué','Assassin',5,'Coup de Poker','all',{slot:1,poker:1});
const ALEA=HEROES.length-1;LOOKS[ALEA]=ALEA_LOOK;
const ALB={inner:0};
{const hb=heroBody;heroBody=function(h,u=0){if(h&&h.i===ALEA&&!u&&!ALB.inner){const s=aleaHeroBody();if(s)return s}return hb.apply(this,arguments)}}
function aleaSVG(){const b=aleaHeroBody();if(b)return b.replace('<svg','<svg class="loresvg hb"');return''}
STL[ALEA]=["Il y a deux cents ans, un jeune joueur de Vénétia, la Cité des Masques, s'est assis face à une ombre immense : Umbra, la Mangeuse d'Étoiles. Elle dévorait sa ville.","Il a misé son avenir et gagné la main. En échange, Umbra a gardé la moitié de son visage. Depuis, il porte un masque blanc et noir… et il peut réécrire le destin, une fois par combat.","On l'appelle Aléa. Kaïros ne le voit dans aucun futur, Fortuna n'a perdu qu'une seule partie : contre lui. Aujourd'hui, il a enfin trouvé une table où jouer en équipe : la tienne."];
AFF.push({n:'La Maison gagne toujours',ic:'🎰',ids:[56,ALEA],need:2,fx:{crit:.12},d:'+12 % critique',q:"Fortuna : « Toi, à ma table ? Cette fois, on triche ensemble. »"},
 {n:'Les fils du hasard',ic:'⏳',ids:[58,ALEA],need:2,fx:{spd:.12},d:'+12 % vitesse',q:"Kaïros : « Je ne te vois dans aucun futur… alors je te suis. »"});
TITLES.push({k:'mythe',n:'Main Mythique',c:'#ff5ad8',d:'Invoquer Aléa le Joueur Masqué',ok:()=>!!S.heroes[ALEA]},{k:'destin',n:'Briseur de Destin',c:'#ff5ad8',d:'Terminer le Livre II du mode histoire',ok:()=>!!SG().done[13]});
try{const c=LORE_CHARS.find(x=>x.k==='alea');if(c){c.r='Mythique · jouable';c.d+=" Il t'attend maintenant à la Table d'Aléa, au casino et dans les invocations."}}catch(e){}

/* --- description de l'ultime --- */
const POKER_DESC=`Tire <b>5 cartes</b>. La main décide de l'effet : <b>Carte haute</b> 200 % ATQ à un ennemi et garde 50 énergie · <b>Paire</b> 240 % ATQ à tous · <b>Double paire</b> 300 % · <b>Brelan</b> 360 % et affaiblit · <b>Quinte</b> 5 cartes de 170 % · <b>Couleur</b> 400 % à tous + bonus de couleur (♥ soin, ♦ énergie, ♣ étourdit, ♠ coup de grâce) · <b>Full</b> 480 % et étourdit tout le monde · <b>Carré</b> 650 %, +50 énergie et +40 % ATQ à l'équipe · <b>Quinte flush royale</b> 1000 %, étourdit, ranime et soigne l'équipe. Parfois Aléa <b>réécrit une carte</b> pour améliorer sa main. Chaque évolution rend les grandes mains plus fréquentes.`;
{const sd=skillDesc;skillDesc=function(sk){if(sk&&sk.fx&&sk.fx.poker)return POKER_DESC;return sd.apply(this,arguments)}}
const AL_PAS=`<div class="skill alpas"><div class="sn">🃏 Réécrire le destin</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.05em">PASSIF MYTHIQUE · 1 FOIS PAR COMBAT</div><div style="margin-top:4px">Le premier coup qui devrait mettre K.O. un allié (ou Aléa lui-même) est <b>annulé</b>. Les fils du destin se réécrivent.</div></div>
 <div class="skill alpas"><div class="sn">🂠 Carte cachée</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.05em">PASSIF</div><div style="margin-top:4px">25 % de chances, à chaque attaque normale, de lancer une deuxième carte (60 % ATQ) sur un ennemi au hasard.</div></div>`;
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===ALEA){const m=$('#ovl .modal');const sk=m&&m.querySelector('.skill');if(sk&&!m.querySelector('.alpas'))sk.insertAdjacentHTML('afterend',AL_PAS);if(m)m.classList.add('mythm')}}catch(e){}return r}}

/* ================= le Coup de Poker ================= */
const PK_SU=['♠','♥','♦','♣'],PK_VN={11:'V',12:'D',13:'R',14:'A'},PK_RED=s=>s==='♥'||s==='♦';
const PK_H={hc:{n:'CARTE HAUTE',t:0},p1:{n:'PAIRE',t:0},p2:{n:'DOUBLE PAIRE',t:1},p3:{n:'BRELAN',t:1},st:{n:'QUINTE',t:2},fl:{n:'COULEUR',t:2},fh:{n:'FULL',t:3},p4:{n:'CARRÉ',t:3},rf:{n:'QUINTE FLUSH ROYALE',t:4}};
function pkShuf(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function pkDistinct(n){const o=[];while(o.length<n){const v=ri(2,14);if(!o.includes(v))o.push(v)}return o}
function pkStraight(vs){const s=[...vs].sort((a,b)=>a-b);return s.every((v,i)=>!i||v===s[i-1]+1)}
function pkMake(k){let C=[];const sd=()=>pick(PK_SU);
  if(k==='rf'){const s=sd();C=[10,11,12,13,14].map(v=>({v,s}))}
  else if(k==='p4'){const [a,b]=pkDistinct(2);C=PK_SU.map(s=>({v:a,s})).concat([{v:b,s:sd()}])}
  else if(k==='fh'){const [a,b]=pkDistinct(2);C=[...pkShuf(PK_SU).slice(0,3).map(s=>({v:a,s})),...pkShuf(PK_SU).slice(0,2).map(s=>({v:b,s}))]}
  else if(k==='fl'){const s=sd();let vs;do{vs=pkDistinct(5)}while(pkStraight(vs));C=vs.map(v=>({v,s}))}
  else if(k==='st'){const lo=ri(2,9),su=pkShuf(PK_SU);C=[0,1,2,3,4].map(i=>({v:lo+i,s:su[i%4]}))}
  else if(k==='p3'){const [a,...x]=pkDistinct(3);C=[...pkShuf(PK_SU).slice(0,3).map(s=>({v:a,s})),...x.map(v=>({v,s:sd()}))]}
  else if(k==='p2'){const [a,b,c]=pkDistinct(3);C=[...pkShuf(PK_SU).slice(0,2).map(s=>({v:a,s})),...pkShuf(PK_SU).slice(0,2).map(s=>({v:b,s})),{v:c,s:sd()}]}
  else if(k==='p1'){const [a,...x]=pkDistinct(4);C=[...pkShuf(PK_SU).slice(0,2).map(s=>({v:a,s})),...x.map(v=>({v,s:sd()}))]}
  else{let vs;do{vs=pkDistinct(5)}while(pkStraight(vs));const su=pkShuf(PK_SU);C=vs.map((v,i)=>({v,s:su[i%4]}))}
  C.sort((a,b)=>a.v-b.v);
  const cnt={};C.forEach(c=>cnt[c.v]=(cnt[c.v]||0)+1);const grp=C.map((c,i)=>cnt[c.v]>=2?i:-1).filter(i=>i>=0);
  const hl=['st','fl','rf'].includes(k)?[0,1,2,3,4]:grp;return{k,cards:C,hl}}
function pkDeal(u){const e=u.evo||0,x=u.ux||0;
  const W=[['hc',12],['p1',24],['p2',20],['p3',15],['st',10],['fl',8],['fh',6],['p4',3+e],['rf',1.2+e*.8+x*.6]];const tw=W.reduce((a,b)=>a+b[1],0);
  let r=Math.random()*tw,k='hc';for(const [n,w] of W){if((r-=w)<0){k=n;break}}
  const H=pkMake(k);H.name=PK_H[k].n;H.tier=PK_H[k].t;
  if(k!=='hc'&&Math.random()<.4&&H.hl.length){const i=pick(H.hl);const used=new Set(H.cards.map(c=>c.v));let v;do{v=ri(2,14)}while(used.has(v));const real=H.cards[i];const s=PK_SU.find(z=>z!==real.s);H.rw={i,fake:{v,s}}}
  return H}
const pkFace=c=>`<b>${PK_VN[c.v]||c.v}</b><i>${c.s}</i><em>${c.s}</em>`;
function pkShow(H){return new Promise(res=>{const host=document.querySelector('#battle .bw');if(!host)return res();const sp=S.speed||1;
  const m=document.createElement('div');m.className='pkm t'+H.tier;m.style.setProperty('--sp',sp);
  m.innerHTML=`<div class="pkbox"><div class="pktt">🃏 Coup de Poker</div><div class="pkcards">${H.cards.map((c,i)=>{const sh=H.rw&&H.rw.i===i?H.rw.fake:c;return`<div class="pkc" style="--i:${i}"><div class="pkin"><div class="pkb"></div><div class="pkf ${PK_RED(sh.s)?'red':''}">${pkFace(sh)}</div></div></div>`}).join('')}</div><div class="pkrw">✦ DESTIN RÉÉCRIT ✦</div><div class="pkres"></div></div>`;
  host.style.position='relative';host.appendChild(m);const el=[...m.querySelectorAll('.pkc')];const T=x=>x/sp;
  el.forEach((c,i)=>{setTimeout(()=>{c.classList.add('pkfl');try{cSnd.card()}catch(e){}},T(380+i*170));setTimeout(()=>c.classList.add('pkup'),T(380+i*170+160))});
  let t=380+5*170+120;
  if(H.rw){const c=el[H.rw.i];setTimeout(()=>{c.classList.add('pkrwc');m.classList.add('rwon');try{UIS.coin(true)}catch(e){}},T(t));
    setTimeout(()=>{const f=c.querySelector('.pkf');const real=H.cards[H.rw.i];f.className='pkf '+(PK_RED(real.s)?'red':'');f.innerHTML=pkFace(real)},T(t+420));t+=820}
  setTimeout(()=>{H.hl.forEach(i=>el[i]&&el[i].classList.add('pkhl'));const r=m.querySelector('.pkres');r.textContent=H.name;r.classList.add('on');if(H.tier>=3){try{cSnd.jack()}catch(e){}}},T(t));
  setTimeout(()=>{m.classList.add('out');setTimeout(()=>{m.remove();res()},T(260))},T(t+(H.tier>=3?1250:900)))})}
async function alCutIn(u){const bt=document.getElementById('battle');if(!bt||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return;const sp=S.speed||1;
  const d=document.createElement('div');d.className='alcut'+(u.side===1?' foe':'');d.style.setProperty('--sp',sp);
  d.innerHTML=`<div class="alw"></div><div class="alb"></div><div class="alline"></div><div class="alfan">${[0,1,2,3,4].map(i=>`<span style="--k:${i}">${['A','R','D','V','10'][i]}<i>${['♠','♥','♠','♦','♣'][i]}</i></span>`).join('')}</div><div class="alfig">${aleaSVG()}</div><div class="altxt"><small>✦ ULTIME MYTHIQUE ✦</small><b>COUP<br>DE POKER</b></div>`;
  bt.appendChild(d);try{smSnd('rumble')}catch(e){}await wait(1350/sp);d.classList.add('out');await wait(220/sp);d.remove()}
{const ci=cutIn;cutIn=async function(u){if(u&&u.hid===ALEA&&u.sk&&u.sk.fx.poker)return alCutIn(u);return ci.apply(this,arguments)}}
{const c0=casino;casino=async function(u){if(u&&u.sk&&u.sk.fx&&u.sk.fx.poker)return aleaPoker(u);return c0.apply(this,arguments)}}
async function aleaPoker(u){const H=pkDeal(u);
  if(!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED))await pkShow(H);if(!B||B.done)return;
  log(`🃏 ${H.cards.map(c=>(PK_VN[c.v]||c.v)+c.s).join(' ')} — <b>${H.name.toLowerCase().replace(/^./,x=>x.toUpperCase())}</b>${H.rw?' (destin réécrit)':''}`,'cs');
  B.pend=B.skip?null:[];const sc=u.scale||1,foes=alive(1-u.side),al=alive(u.side),k=H.k;let suit=null;
  if(k==='hc'){deal(u,pickT(u),200*sc,{sk:1});u.en=50}
  else if(k==='p1')foes.forEach(t=>deal(u,t,240*sc,{sk:1}));
  else if(k==='p2')foes.forEach(t=>deal(u,t,300*sc,{sk:1}));
  else if(k==='p3')foes.forEach(t=>{deal(u,t,360*sc,{sk:1});if(t.hp>0)t.weak=Math.max(t.weak||0,2)});
  else if(k==='st'){for(let i=0;i<5;i++){const L=alive(1-u.side);if(!L.length)break;deal(u,pick(L),170*sc,{sk:1,crit:25})}}
  else if(k==='fl'){suit=H.cards[0].s;foes.forEach(t=>deal(u,t,400*sc,{sk:1}));
    if(suit==='♥')al.forEach(a=>{const h=Math.round(a.max*.2*(B.healMul||1));a.hp=Math.min(a.max,a.hp+h);float(a,'+'+fmt(h),'heal')});
    else if(suit==='♦')al.forEach(a=>{if(a!==u)a.en=Math.min(100,a.en+40)});
    else if(suit==='♣')alive(1-u.side).forEach(t=>{if(Math.random()<.6)t.stun=1});
    else{const L=alive(1-u.side).sort((a,b)=>a.hp/a.max-b.hp/b.max)[0];if(L)deal(u,L,200*sc,{sk:1,exec:1})}}
  else if(k==='fh')foes.forEach(t=>{deal(u,t,480*sc,{sk:1});if(t.hp>0)t.stun=1});
  else if(k==='p4'){foes.forEach(t=>deal(u,t,650*sc,{sk:1}));al.forEach(a=>{if(a!==u)a.en=Math.min(100,a.en+50);a.buff=Math.max(a.buff,40);a.buffT=2})}
  else if(k==='rf'){if(u.side===0)S.stats.royal=(S.stats.royal||0)+1;foes.forEach(t=>{deal(u,t,1000*sc,{sk:1});if(t.hp>0)t.stun=1});
    B.units.filter(x=>x.side===u.side).forEach(a=>{if(a.hp<=0){a.hp=Math.round(a.max*.3);float(a,'RANIMÉ','heal')}else{const h=Math.round(a.max*.3*(B.healMul||1));a.hp=Math.min(a.max,a.hp+h);float(a,'+'+fmt(h),'heal')}a.buff=Math.max(a.buff,60);a.buffT=2})}
  if(!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED)){try{await pkFx(u,H,[...new Set((B.track||{seq:[]}).seq)],suit)}catch(e){}}
  if(!B)return;flushFloats()}
async function pkFx(u,H,hit,suit){fxSetup();const a=uc(u),W=FXS.w||innerWidth,Hh=FXS.h||innerHeight,t=H.tier;const V='#c07aff',P='#ff5ad8',G='#ffd84a';
  if(!hit.length)hit=alive(1-u.side);
  const bigCard=(x,y,sym,col,dl,sz)=>fxItem(700,(g,p)=>{if(p<0)return;const e=p<.3?p/.3:1,f=p>.7?(1-p)/.3:1;g.globalAlpha=f;g.translate(x,y-(1-e)*120);g.rotate((1-e)*.8);const w=sz*.7,h=sz;g.fillStyle='#fbf6ff';g.strokeStyle=G;g.lineWidth=3;g.beginPath();g.roundRect?g.roundRect(-w/2,-h/2,w,h,8):g.rect(-w/2,-h/2,w,h);g.fill();g.stroke();g.fillStyle=col;g.font=`${sz*.55}px serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(sym,0,4)},dl);
  if(t>=3){fxTint(t>=4?G:'#5a1a8a',900,.38);vignette(V,1100,.5)}
  if(t>=2)magicCircle(a.x,a.y,[P,G,V],60,900);
  if(t===0){await Promise.all(hit.map((x,i)=>fxWait(i*80).then(()=>fxProjectile(a,uc(x),[P,G],300,8,'card'))));hit.forEach(x=>{const b=uc(x);sparks(b.x,b.y,G,10,5)});return}
  if(t===1){for(let i=0;i<3;i++)hit.forEach((x,j)=>fxWait(i*90+j*40).then(()=>fxProjectile(a,uc(x),[i%2?'#d1263b':'#140c24',G],280,8,'card')));await fxWait(420);
    hit.forEach(x=>{const b=uc(x);ringFx(b.x,b.y,P,60,420,4,.4);shapes(b.x,b.y,'card',['#fbf6ff','#d1263b'],8,4.5,5,40,.2)});shake(1);return}
  if(t===2){hit.forEach((x,i)=>{const b=uc(x);bigCard(b.x,b.y-30,suit||pick(PK_SU),PK_RED(suit||'♥')?'#d1263b':'#140c24',i*120,70)});await fxWait(380);
    hit.forEach(x=>{const b=uc(x);ringFx(b.x,b.y,G,80,480,5,.4);glows(b.x,b.y,[P,G,'#fff'],14,3,5,40);sparks(b.x,b.y,'#fff',12,6)});shake(1);flash(P,200,.3);await fxWait(200);return}
  /* grandes mains : pluie de cartes géantes, faisceaux et pièces d'or */
  const sym=t>=4?'♠':'♥';fxItem(1300,(g,p)=>{if(p<0)return;const s=Math.min(W,Hh)*.62,al=p<.25?p/.25:p>.75?(1-p)/.25:1;g.globalAlpha=al*.28;g.translate(W/2,Hh*.42);g.scale(1+p*.15,1+p*.15);g.fillStyle=t>=4?G:P;g.font=`${s}px serif`;g.textAlign='center';g.textBaseline='middle';g.fillText(sym,0,0)});
  chargeUp(a,[P,G,'#fff'],520,true);await fxWait(420);
  hit.forEach((x,i)=>{const b=uc(x);fxWait(i*90).then(()=>{beamFx(a,b,i%2?G:P,t>=4?16:11,420);bigCard(b.x,b.y-40,PK_SU[i%4],i%4===1||i%4===2?'#d1263b':'#140c24',0,80)})});
  await fxWait(460);camPunch(a,1.08,320);
  hit.forEach(x=>{const b=uc(x);pillarFx(b.x,b.y,t>=4?G:V,700,50,190);crackFx(b.x,b.y+10,P,7,60,800);shapes(b.x,b.y,'coin',[G],12,6,6,70,.25);shapes(b.x,b.y,'card',['#fbf6ff','#d1263b','#140c24'],12,6,6,60,.2);ringFx(b.x,b.y,'#fff',110,520,6,.4)});
  flash(t>=4?G:'#fff',260,.55);shake(t>=4?3:2);
  if(t>=4){for(let i=0;i<26;i++)fxWait(i*25).then(()=>shapes(Math.random()*W,-10,'coin',[G,'#fff6c0'],1,2,7,90,.3));alive(u.side).forEach(x=>{const b=uc(x);glowPulse(b.x,b.y,G,600,46);ringFx(b.x,b.y,G,70,600,4,.4)});textPop(W/2,Hh*.3,'👑 QUINTE FLUSH ROYALE',G,30,1300)}
  await fxWait(500)}
/* --- passif : Réécrire le destin --- */
{const h1=hurt;hurt=function(t,d,c){try{if(B&&t&&t.hp>0&&d>0){const eff=d-Math.min(t.sh>0?t.sh:0,d);if(t.hp-eff<=0){const A=B.units.find(x=>x.hid===ALEA&&x.side===t.side&&x.hp>0&&!x.fateUsed);
  if(A){A.fateUsed=1;log(`🃏 <b>${A.name}</b> réécrit le destin : le coup fatal sur ${t.name} n'a jamais existé !`,'cs');float(t,'✦ DESTIN RÉÉCRIT','heal');if(!B.skip)try{fateFx(A,t)}catch(e){}return}}}}catch(e){}return h1.apply(this,arguments)}}
function fateFx(A,t){if(typeof REDUCED!=='undefined'&&REDUCED)return;fxSetup();const a=uc(A),b=uc(t);beamFx(a,b,'#c07aff',4,520);magicCircle(b.x,b.y,['#c07aff','#ffd84a','#fff'],42,800);glowPulse(b.x,b.y,'#ffd84a',500,36);textPop(b.x,b.y-50,'DESTIN RÉÉCRIT','#ffd84a',20,900);
  const el=document.getElementById('u-'+t.key);if(el){el.classList.add('alfate');setTimeout(()=>el.classList.remove('alfate'),900)}}
/* --- passif : Carte cachée --- */
{const d2=deal;deal=function(s,t,pct,o={}){const r=d2.apply(this,arguments);try{if(s&&s.hid===ALEA&&B&&!o.sk&&!o.al&&!B.track&&t&&Math.random()<.25){const L=alive(1-s.side);if(L.length){const t2=pick(L);const d=deal(s,t2,60,{al:1});log(`🂠 Carte cachée ! ${s.name} touche ${t2.name} : ${fmt(d)}`,'ba');if(!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED)){fxSetup();fxProjectile(uc(s),uc(t2),['#ff5ad8','#ffd84a'],260,7,'card')}}}}catch(e){}return r}}

/* ================= la Table d'Aléa : bannière mythique ================= */
const MY_RATE=.5,MY_PITY=90;
function ALMB(){if(!S.myb||typeof S.myb!=='object')S.myb={p:0,n:0};return S.myb}
{const px=pullX;pullX=function(n,o={}){const ban=o.ban||UI.ban||'wk';if(ban!=='al')return px.apply(this,arguments);ensureDaily();
  if(o.pay==='free'&&!S.daily.free)return;if(o.pay==='pt'&&INV().pt<n)return px.apply(this,arguments);if(o.pay==='gems'&&S.gems<o.cost)return px.apply(this,arguments);
  const M=ALMB();let m=0;for(let k=0;k<n;k++){M.p++;if(Math.random()*100<MY_RATE||M.p>=MY_PITY){m++;M.p=0}}
  const before=UI.last;const o2=Object.assign({},o,{minR:o.minR!=null?o.minR:(n===10?2:0)});const r=px.call(this,n-m,o2);
  if(!m)return r;if(UI.last===before||!Array.isArray(UI.last))UI.last=[];
  for(let k=0;k<m;k++){const ow=S.heroes[ALEA];let it;if(!ow){S.heroes[ALEA]={l:1,e:0,f:0};it={i:ALEA,isNew:true}}else{ow.f+=3;it={i:ALEA,note:'Aléa : +3 fragments'}}UI.last.splice(Math.floor(Math.random()*(UI.last.length+1)),0,it)}
  M.n+=m;S.pulls+=m;try{q('pull',m)}catch(e){}
  toast('🃏 Un héros MYTHIQUE s\'assoit à ta table !');try{news(Date.now(),`${S.name||'Voyageur'} a invoqué Aléa le Joueur Masqué, un héros MYTHIQUE !`)}catch(e){}try{react('envy',{hero:'Aléa le Joueur Masqué'},3)}catch(e){}
  save();render();return r}}
function alBanner(inCas){const I=INV(),M=ALMB();
  return`<div class="banner alban"><div class="alsuits">${[...Array(10)].map((_,i)=>`<i style="--x:${(i*10+3)}%;--d:${(i*.7).toFixed(1)}s;--t:${(6+i%4*1.5).toFixed(1)}s">${PK_SU[i%4]}</i>`).join('')}</div><div class="tx"><span class="tag mytag">✦ BANNIÈRE MYTHIQUE · PERMANENTE ✦</span>
    <div class="h">Aléa le Joueur Masqué</div><p class="sub" style="margin:4px 0 12px">Le seul joueur à avoir battu Fortuna… et Umbra. Son ultime tire une main de poker, et une fois par combat il <b>réécrit le destin</b> pour sauver un allié. Taux mythique : <b>${String(MY_RATE).replace('.',',')} %</b>.</p>
    <div class="row">${S.daily.free?`<button class="btn g" data-a="alpull" data-v="1" data-f="1">Invocation gratuite du jour</button>`:''}<button class="btn g" data-a="alpull" data-v="1">×1 · ${GEM}100</button><button class="btn pro" data-a="alpull" data-v="10">×10 · ${GEM}900</button></div>
    ${I.pt?`<div class="row" style="margin-top:8px"><button class="btn" data-a="alpullt" data-v="1">×1 · ${SIC.ticket}1</button><button class="btn" data-a="alpullt" data-v="10" ${I.pt<10?'disabled':''}>×10 · ${SIC.ticket}10</button><span class="muted" style="font-size:12.5px">Tu as ${I.pt} ticket${I.pt>1?'s':''}.</span></div>`:''}
    <div class="alpity"><div><b class="num">${MY_PITY-M.p}</b><span>avant le mythique garanti</span></div><div><b class="num">${60-S.pity}</b><span>avant un légendaire garanti</span></div></div>
    <div class="muted" style="font-size:12px;margin-top:6px">Le compteur mythique est propre à cette table. Doublon d'Aléa : +3 fragments d'évolution.</div></div><div class="pt alpt">${aleaSVG()}</div></div>
  <div class="card alkit"><div class="h3" style="margin:0 0 6px">🃏 Le kit d'Aléa</div>
   <div class="alhands">${[['hc','A♠'],['p1','7♥7♣'],['p2','2♦2♠9♥9♣'],['p3','D♠D♥D♦'],['st','5·6·7·8·9'],['fl','♥♥♥♥♥'],['fh','RRR·44'],['p4','AAAA'],['rf','10·V·D·R·A♠']].map(([k,s])=>`<div class="alh t${PK_H[k].t}"><b>${PK_H[k].n.toLowerCase().replace(/^./,x=>x.toUpperCase())}</b><span>${s}</span></div>`).join('')}</div>
   <p class="muted" style="font-size:12.5px;margin:8px 0 0">${POKER_DESC}</p>${AL_PAS}</div>
  ${pullRes()}
  <div class="card"><div class="h3">Taux d'apparition</div><div class="rates"><div style="${rv(5)}"><b class="rc">${String(MY_RATE).replace('.',',')} %</b><span>Mythique</span></div>${RATES.map((r,k)=>`<div style="${rv(k)}"><b class="rc">${String(r).replace('.',',')} %</b><span>${RAR[k].n}</span></div>`).join('')}</div></div>`}
function pSummonAl(){const ban='al';
  return`<div class="chips"><button class="chip on mychip" data-a="ban" data-v="al">🃏 Table d'Aléa</button><button class="chip" data-a="ban" data-v="wk">★ Héros de la semaine</button><button class="chip" data-a="ban" data-v="fo">🎰 Casino de Fortuna</button></div>${alBanner(0)}`}
{const ps=pSummon;pSummon=function(){if(UI.ban==='al')return pSummonAl();return ps.apply(this,arguments).replace('<div class="chips">','<div class="chips"><button class="chip mychip" data-a="ban" data-v="al">🃏 Table d\'Aléa <span class="pdot">✦</span></button>')}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="alpull"],[data-a="alpullt"]');if(!b)return;e.preventDefault();e.stopPropagation();UI.ban='al';const n=+b.dataset.v;
  if(b.dataset.a==='alpullt')pullX(n,{pay:'pt',ban:'al'});else if(b.dataset.f)pullX(1,{pay:'free',ban:'al'});else pullX(n,{pay:'gems',cost:n===10?900:100*n,ban:'al'});
  if(TAB==='event'){UI.iv='invoc'}},true);
/* au casino : un onglet « Table d'Aléa » */
{const cp=casPage;casPage=function(){const al=UI.csub==='al';if(al)UI.csub='shop';let h;try{h=cp.apply(this,arguments)}finally{if(al)UI.csub='al'}
  const i=h.indexOf('<div class="chips">');if(i<0)return h;const j=h.indexOf('</div>',i);let chips=h.slice(i,j);if(al)chips=chips.replace(/chip on/g,'chip');chips+=`<button class="chip mychip ${al?'on':''}" data-a="csub" data-v="al">🃏 Table d'Aléa</button>`;
  if(!al)return h.slice(0,i)+chips+h.slice(j);const ban=h.slice(0,i);return ban+chips+'</div>'+alBanner(1)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="csub"]');if(!b)return;if(b.dataset.v==='al'){UI.ban='al';UI.last=null}},true);
/* l'invocation animée : écran MYTHIQUE exclusif */
async function smMythic(el,c,x){const h=HEROES[x.i];c.classList.remove('tease');c.classList.add('mythflip');try{smSnd('rumble');setTimeout(()=>smSnd('leg'),500)}catch(e){}
  el.classList.add('flashm');setTimeout(()=>el.classList.remove('flashm'),1100);await smSleep(1000);if(SM.skip)return;
  const L=el.querySelector('.sm-leg');
  L.innerHTML=`<div class="smm"><div class="smm-c0"><span>🂠</span></div><div class="smm-split"><i class="w"></i><i class="b"></i></div><div class="smm-rays"></div>
   <div class="smm-cards">${[...Array(12)].map((_,i)=>`<span style="--k:${i}">${PK_SU[i%4]}</span>`).join('')}</div>
   <div class="smm-fig">${aleaSVG()}</div><div class="smm-chips">${[...Array(18)].map((_,i)=>`<b style="--x:${(Math.random()*100).toFixed(0)}%;--d:${(1.4+Math.random()*1.8).toFixed(2)}s"></b>`).join('')}</div>
   <div class="smm-t"><i>✦ MYTHIQUE ✦</i><b>${esc(h.n)}</b><span>« Le destin ? Je le redistribue. »</span><small>${x.isNew?'NOUVEAU HÉROS':'+3 fragments'}</small></div><div class="sml-tap">Touche pour continuer</div></div>`;
  L.classList.add('on','myth');setTimeout(()=>{try{cSnd.jack()}catch(e){}},1300);
  await new Promise(r=>{SM.wait=r;setTimeout(r,SM.skip?0:7000)});SM.wait=null;L.classList.remove('on','myth');c.classList.add('flip');await smSleep(250)}

/* ================= LIVRE II : « Le Destin d'Aléa » ================= */
Object.assign(SAGA_WHO,{alea:{n:'Aléa, le Joueur Masqué',c:'#ff5ad8'},umbra:{n:"Umbra, la Mangeuse d'Étoiles",c:'#9a6aff'},corvin2:{n:'Corvin',c:'#c8b8e8'}});
SAGA.push(
 {t:'La Main du Masqué',ic:'🃏',req:75,b2:1,bg:['#ffd84a','#6a1a5a','#0a0414'],place:'Casino de Fortuna',
  intro:[['narr',"Trois lunes après la renaissance du Cœur d'Éther, une carte est glissée sous la porte de la Capitale. Un as de pique, avec un seul mot : « Casino »."],
   ['plume',"Hou… Cette carte sent le Néant. Et le parfum de quelqu'un que je connais."],
   [56,"Le Porteur ! Et Plume ! Vous tombez bien : ma table VIP est occupée par un client qui ne paie jamais."],
   ['alea',"Bonsoir, Porteur. Je t'avais dit qu'on se reverrait. Assieds-toi. Une partie, une seule."],
   ['alea',"Si tu gagnes, je te dis qui a senti battre le Cœur d'Éther. Si tu perds… tu m'aides quand même. Hé hé."],
   ['plume',"Ce n'est pas un pari, ça, c'est un piège !"],
   ['alea',"Tout est un piège, petite chouette. La vraie question, c'est qui tient les cartes. Ma Reine va jouer pour moi."],
   {ch:[["🤝 Accepter la partie avec le sourire",'cmp',"D'accord, Aléa. Mais on joue loyalement."],["🔥 Exiger des réponses tout de suite",'brv',"Assez de mystères. Parle, ou c'est moi qui retourne la table !"]]},
   [56,"Hé hé, j'adore ce gamin. Attention, la Reine de Pique triche autant que son maître !"]],
  boss:{n:'Reine de Pique',h:320,st:76},
  outro:[['alea',"Bravo. Tu as battu ma Reine… Tu sais ce que ça me fait, de perdre ? Rien. Je ne perds jamais vraiment. Je réécris."],
   ['alea',"Alors voici ta réponse. Celle qui a senti le Cœur s'appelle Umbra. La Mangeuse d'Étoiles."],
   ['plume',"Umbra… C'est une berceuse que chantait ma mère. « Ferme les yeux, sinon Umbra mangera ta lumière. » Ce n'est pas réel !"],
   ['alea',"Les berceuses sont des avertissements qu'on a oubliés. Umbra a dévoré la Première Étoile, il y a très, très longtemps."],
   [56,"Et toi, Aléa, comment tu sais tout ça ?"],
   ['alea',"Parce que j'ai joué contre elle. Et j'ai gagné. Enfin… à moitié. Allez au Désert des Sabliers. Kaïros vous expliquera ce qu'il ne peut pas voir."]]},
 {t:'Les Sabliers brisés',ic:'⏳',req:80,b2:1,bg:['#ffd59a','#c0763a','#3a1a0a'],place:'Désert des Sabliers',
  intro:[['narr',"Au cœur du Désert de Cendre, des milliers de sabliers géants sortent du sable. Certains coulent vers le haut."],
   [40,"Le temps est malade ici. Hier, j'ai mangé mon déjeuner avant d'avoir faim. Deux fois."],
   [58,"Bonjour, Porteur. Ou plutôt : rebonjour. Pour moi, nous sommes déjà venus ici onze fois."],
   ['plume',"Kaïros, Aléa dit que tu sais quelque chose sur lui."],
   [58,"Je sais qu'il n'existe dans aucun futur. Parce qu'il a vendu son avenir à Umbra. Contre un seul pouvoir : changer le destin, une fois par combat."],
   [58,"Le Sphinx des Sabliers garde le souvenir de ce pari. Il ne le rendra qu'à celui qui le bat."],
   {ch:[["⏳ Écouter l'énigme du Sphinx",'cmp',"On peut parler d'abord. Pose ton énigme, Sphinx !"],["🗡️ Briser les sabliers qui le protègent",'brv',"On casse ses sabliers, il n'aura plus de temps pour nous !"]]},
   [40,"Le voilà ! Il a des griffes grandes comme des barques !"]],
  boss:{n:'Sphinx des Sabliers',h:38,st:81},
  outro:[['narr',"Le Sphinx se couche dans le sable. Dans ses yeux, un vieux souvenir se met à briller…"],
   ['narr',"On y voit un jeune joueur, sans masque, assis face à une ombre immense. Sur la table : sa ville natale, Vénétia, qui s'efface."],
   ['alea',"…Oui. C'était moi. Umbra mangeait ma ville. J'ai parié mon avenir pour la sauver. J'ai gagné la main. Mais elle a gardé la moitié de mon visage."],
   ['alea',"Le blanc, c'est ce qui me reste. Le noir… c'est à elle. Voilà pourquoi je porte ce masque."],
   ['plume',"Alors tu n'es pas un tricheur. Tu es… un survivant."],
   [58,"Et maintenant que le Cœur bat de nouveau, Umbra a faim. Elle commencera par Vénétia. Elle finit toujours ce qu'elle commence."]]},
 {t:'Le Bal des Masques',ic:'🎭',req:85,b2:1,bg:['#ff8ad8','#3a1a6a','#0a0420'],place:'Vénétia, la Cité des Masques',
  intro:[['narr',"Vénétia flotte sur un lac de brume. Chaque nuit, ses habitants dansent masqués… pour que le Néant ne les reconnaisse pas."],
   ['alea',"Ma ville. Je n'étais pas revenu depuis deux cents ans. Elle n'a pas changé. Moi si."],
   [42,"Un bal ? Enfin une mission à mon goût. Je danse aussi bien que je me bats."],
   [37,"Les masques murmurent… Certains invités n'ont rien sous leur masque. Juste du vide."],
   ['alea',"Les Arlequins d'Umbra. Ils volent les visages des danseurs. Si on ne les arrête pas avant minuit, toute la ville sera oubliée."],
   {ch:[["💃 Danser parmi eux pour protéger les invités",'cmp',"On se mêle au bal et on garde les invités à l'abri !"],["🎭 Arracher le masque du chef",'brv',"Je vais lui arracher son masque devant tout le monde !"]]},
   ['alea',"Minuit sonne. Que le spectacle commence !"]],
  boss:{n:'Arlequin du Néant',h:300,st:86},
  outro:[['narr',"L'Arlequin éclate en confettis noirs. Les danseurs retrouvent leurs visages, un à un, en riant et en pleurant."],
   ['alea',"Merci, Porteur. Tu as sauvé ma ville. Ça fait deux fois en deux cents ans… et la tienne compte plus que la mienne."],
   ['plume',"Tu l'as sauvée le premier, Aléa. Sans toi, il n'y aurait plus personne à sauver."],
   ['alea',"…Tu es gentille, petite chouette. Ne le répète à personne, ça abîmerait ma réputation."],
   [42,"Regardez le ciel ! Les étoiles… elles s'éteignent, une par une !"],
   ['alea',"Umbra s'attaque au Pont des Étoiles. Il faut prévenir Astrée."]]},
 {t:'Le Pont des Étoiles',ic:'🌉',req:90,b2:1,bg:['#c8d8ff','#3a3aa8','#05061a'],place:'Pont des Étoiles',
  intro:[['astree',"Porteur, te voilà ! Mes fils se cassent. Quelque chose les mord, juste au bord du ciel."],
   [63,"J'ai tiré cent flèches de lumière. Elles disparaissent dans le noir sans un bruit."],
   [45,"Les constellations dessinent une araignée… Elle tisse une toile à l'envers, avec des étoiles mortes."],
   ['alea',"C'est la tisseuse d'Umbra. Elle prépare le chemin de sa maîtresse. Si la toile se ferme, Umbra pourra marcher jusqu'au Cœur d'Éther."],
   ['astree',"Aléa… Je me souviens de toi. Le jeune joueur qui a fait trembler Umbra. Ma sœur t'aurait beaucoup aimé."],
   {ch:[["🌟 Protéger les fils d'Astrée pendant le combat",'cmp',"Astrée, je protège tes fils, retisse le ciel !"],["🏹 Viser le cœur de la toile avec Orion",'brv',"Orion, une flèche, une seule, au centre de la toile !"]]},
   [63,"Je l'ai en vue. À toi de jouer, Porteur !"]],
  boss:{n:'Araignée Stellaire',h:240,st:91},
  outro:[['astree',"Le pont tient. Merci. Mais Umbra est déjà passée. Je l'ai sentie traverser… vers le Trône du Néant."],
   ['plume',"Le Trône ? Mais c'est là que… Corvin !"],
   ['alea',"Ton frère est le seul à connaître les portes du Néant. Umbra va s'en servir. Ou le dévorer."],
   ['astree',"Prends ceci, Porteur : un fil de ma propre lumière. Quand tout sera noir, il te montrera le chemin."]]},
 {t:'Le Retour du Corbeau',ic:'🪶',req:95,b2:1,bg:['#c03aff','#2a0a4a','#05020a'],place:'Trône du Néant',
  intro:[['narr',"Le Trône du Néant est silencieux. Puis une voix fatiguée s'élève de l'ombre."],
   ['corvin2',"Plume… Je savais que tu viendrais. Tu viens toujours, même quand il ne faut pas."],
   ['plume',"Corvin ! Tu… tu vas bien ?"],
   ['corvin2',"Umbra m'a trouvé. Elle veut que j'ouvre la Grande Porte, celle qui mène au Cœur d'Éther. J'ai refusé. Alors elle a envoyé son Héraut."],
   ['vesperax',"Mon roi ne s'agenouillera plus devant personne. Porteur, cette fois, mon épée est à tes côtés."],
   ['alea',"Un corbeau, un chevalier, une chouette et un tricheur. La meilleure main que j'aie jamais eue."],
   {ch:[["🛡️ Protéger Corvin à tout prix",'cmp',"Personne ne touche au frère de Plume !"],["⚔️ Charger le Héraut avec Vesperax",'brv',"Vesperax, avec moi ! On frappe ensemble !"]]},
   ['corvin2',"Il arrive. Ne le regardez pas dans les yeux : il n'en a pas."]],
  boss:{n:"Héraut d'Umbra",h:275,st:96},
  outro:[['corvin2',"Merci, Porteur. Encore une fois, tu me ramènes vers la lumière."],
   ['corvin2',"Écoute-moi bien. Umbra n'est pas un monstre comme les autres. Elle est faite de tout ce qui a été oublié. Plus on l'oublie, plus elle grandit."],
   ['alea',"Et moi, je lui dois encore une partie. La dernière main. Celle que j'ai laissée en suspens il y a deux cents ans."],
   ['plume',"Aléa, tu ne vas pas y aller seul !"],
   ['alea',"Seul ? Non. J'ai enfin une équipe. Porteur… tu me prêtes tes cartes ?"]]},
 {t:'La Dernière Main',ic:'♠️',req:100,b2:1,fin2:1,bg:['#ff5ad8','#2a0a5a','#000008'],place:'La Table au bout du monde',
  intro:[['narr',"Au-delà du Néant, il y a une table. Une seule. Et assise derrière, une ombre plus grande que le ciel."],
   ['umbra',"Aléa. Le petit joueur. Tu reviens me rendre ce qui reste de ton visage ?"],
   ['alea',"Je reviens finir la partie, Umbra. Et cette fois, je ne joue pas seul."],
   ['umbra',"Une chouette, un corbeau, une étoile et ce… Porteur. Je vous ai tous déjà mangés, dans un autre futur."],
   [58,"C'est faux. Dans ce futur-ci, je ne vois plus rien. Ça veut dire qu'Aléa a déjà commencé à le réécrire."],
   ['astree',"Pour ma sœur. Pour la Première Étoile. Porteur, toutes mes étoiles sont à toi !"],
   {ch:[["💖 Rappeler à Umbra tout ce qu'elle a oublié",'cmp',"Umbra, tu es faite d'oublis. Alors on va se souvenir, tous ensemble !"],["♠️ Tout miser sur une seule attaque",'brv',"Aléa, on mise tout. Tapis !"]]},
   ['alea',"Tapis, Porteur. Le destin est sur la table."]],
  boss:{n:"Umbra, Mangeuse d'Étoiles",h:265,st:100},
  outroA:[['umbra',"Qu'est-ce que… vous… vous vous SOUVENEZ de moi ?"],
   ['plume',"Oui. De la berceuse. De la peur. Et de la petite étoile que tu étais, avant qu'on t'oublie."],
   ['narr',"Umbra se met à briller faiblement. Sous l'ombre immense, il n'y a qu'une toute petite étoile, toute seule, qui avait froid."],
   ['astree',"…Ma sœur cadette. La Seconde Étoile. Tout le monde l'avait oubliée. C'est l'oubli qui l'a rendue affamée."],
   ['astree',"Viens, petite. Il y a de la place dans le ciel pour toi."],
   ['alea',"Bien joué, Porteur. Tu viens de gagner une partie qu'on ne pouvait pas gagner : celle où personne ne perd."],
   ['narr',"Le masque d'Aléa se fissure. La moitié noire tombe en poussière d'étoiles… et dessous, il y a un sourire."],
   ['alea',"Mon visage… Elle me l'a rendu. Hé hé. Je crois que je vais garder le masque quand même. Pour le style."]],
  outroB:[['narr',"La dernière carte d'Aléa s'envole. Un as de cœur, qui brille plus fort que mille soleils."],
   ['alea',"Réécrire le destin. Une fois par combat. Et j'ai gardé la mienne pour ce moment-là !"],
   ['umbra',"NON ! Ce futur n'existait pas ! Il n'existait PAS !"],
   ['alea',"Il existe maintenant."],
   ['narr',"Umbra s'effondre en milliers d'éclats noirs. Ils se dispersent au-delà du monde, là où plus rien ne peut les nourrir."],
   ['narr',"Le masque d'Aléa se fissure. La moitié noire tombe en poussière d'étoiles… et dessous, il y a un sourire."],
   ['alea',"Mon visage. Mon avenir. Je les ai récupérés. Hé hé… Porteur, je te dois une fière chandelle."]]});
(function(){const C=SAGA[13];const epi=[['plume',"Alors, Aléa ? Tu vas repartir jouer seul dans ton coin ?"],['alea',"Pas cette fois. J'ai une nouvelle table de jeu : la tienne, Porteur. Tu me trouveras au casino. Viens me chercher… si tu as de la chance."],['narr',"Aléa, le Joueur Masqué, attend désormais les héros à la Table d'Aléa, au Casino de Fortuna."],['narr',"Fin du deuxième livre. Merci, Porteur !"]];C.outroA=C.outroA.concat(epi);C.outroB=C.outroB.concat(epi)})();
SAGA_SCENE.push(11,3,6,8,9,10);
LORE_CHARS.push({k:'umbra',n:"Umbra, la Mangeuse d'Étoiles",r:'Ombre originelle',ch:8,d:"Une ombre faite de tout ce qui a été oublié. Elle a dévoré la Première Étoile et gardé la moitié du visage d'Aléa."});
const BK2SYM=['♠','♥','♦','♣','🪶','👑'];
/* --- les boss du Livre II --- */
MONS['Reine de Pique']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="42" fill="#ff5ad8" opacity=".1"/><g transform="rotate(-7 50 60)"><rect x="22" y="16" width="56" height="80" rx="6" fill="#f8f0ff" ${s}/><rect x="26" y="20" width="48" height="72" rx="4" fill="none" stroke="#ffd84a" stroke-width="1.2"/><text x="30" y="31" font-size="9" font-weight="900" fill="${O}">D</text><text x="30" y="40" font-size="8" fill="${O}">♠</text></g>
 <path d="M28 40Q16 62 24 90L34 70Z M72 40Q84 62 76 90L66 70Z" fill="#2a1a4a" ${s}/><path d="M28 100L34 66Q50 58 66 66L72 100Z" fill="#2a1a4a" ${s}/><path d="M34 66L50 98L66 66" fill="#d1263b" ${s}/><path d="M42 70L50 86L58 70" fill="#ffd84a" opacity=".7"/>
 <ellipse cx="50" cy="48" rx="12.5" ry="14.5" fill="#f4e4f0" ${s}/><path d="M50 34Q38 36 37.6 48Q38 60 50 62.5Z" fill="#140c24" opacity=".88"/><circle cx="45" cy="47" r="1.8" fill="#ff5ad8"><animate attributeName="opacity" values="1;.3;1" dur="1.6s" repeatCount="indefinite"/></circle><path d="M53 46.5q2.5 -2 5 0" stroke="${O}" stroke-width="1.6" fill="none"/><path d="M46 55Q50 58.5 54 55" stroke="#d1263b" stroke-width="1.6" fill="none"/>
 <path d="M36 37L39 22L45 31L50 16L55 31L61 22L64 37Z" fill="#ffd84a" ${s}/><circle cx="50" cy="24" r="2.2" fill="#ff5ad8"/><circle cx="39" cy="22" r="1.4" fill="#d1263b"/><circle cx="61" cy="22" r="1.4" fill="#d1263b"/>
 <path d="M80 30V96" stroke="#ffd84a" stroke-width="3"/><path d="M80 14Q70 26 80 33Q90 26 80 14Z" fill="#140c24" stroke="#ffd84a" stroke-width="1.2"/><path d="M77.5 33h5l1.5 4h-8Z" fill="#140c24"/>`};
MONS['Sphinx des Sabliers']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="44" r="42" fill="#ffd59a" opacity=".14"/><path d="M8 96Q10 70 30 66L70 66Q90 70 92 96Z" fill="#d8a050" ${s}/><path d="M14 96Q16 84 26 84Q32 88 30 96Z M70 96Q68 88 74 84Q84 84 86 96Z" fill="#c08a3a" ${s}/>
 <path d="M30 70Q24 40 34 26Q50 14 66 26Q76 40 70 70Z" fill="#2a5ab8" ${s}/>${[0,1,2,3,4].map(i=>`<path d="M${33+i*.4} ${34+i*8}H${67-i*.4}" stroke="#ffd84a" stroke-width="3"/>`).join('')}
 <path d="M38 36Q38 24 50 22Q62 24 62 36L62 54Q50 62 38 54Z" fill="#e8b870" ${s}/><path d="M42 41h6M52 41h6" stroke="${O}" stroke-width="2"/><circle cx="45" cy="44" r="1.8" fill="#8ad8ff"/><circle cx="55" cy="44" r="1.8" fill="#8ad8ff"/><path d="M45 52Q50 55 55 52" stroke="${O}" stroke-width="1.4" fill="none"/><path d="M48 55V64H52V55" fill="#2a5ab8" ${s}/>
 <g transform="translate(50 82)"><path d="M-8 -10H8L1 0L8 10H-8L-1 0Z" fill="#fff6dc" fill-opacity=".85" ${s}/><path d="M-5 -8H5L0 -2Z" fill="#ffd84a"><animate attributeName="opacity" values="1;.2;1" dur="2s" repeatCount="indefinite"/></path><path d="M-5 8H5L0 3Z" fill="#ffd84a"/><rect x="-10" y="-12" width="20" height="2.5" fill="#8a5a2a"/><rect x="-10" y="9.5" width="20" height="2.5" fill="#8a5a2a"/></g>`};
MONS['Arlequin du Néant']=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="46" r="42" fill="#ff8ad8" opacity=".12"/><path d="M24 100L30 62Q50 52 70 62L76 100Z" fill="#d1263b" ${s}/>${[[34,70],[50,66],[66,70],[42,84],[58,84],[30,94],[50,96],[70,94]].map(([x,y],i)=>`<path d="M${x} ${y-7}L${x+6} ${y}L${x} ${y+7}L${x-6} ${y}Z" fill="${i%2?'#140c24':'#ffd84a'}"/>`).join('')}
 <path d="M34 62Q50 72 66 62L64 58Q50 66 36 58Z" fill="#f8f0ff" ${s}/>${[38,44,50,56,62].map(x=>`<circle cx="${x}" cy="62" r="2.2" fill="#f8f0ff" ${s}/>`).join('')}
 <ellipse cx="50" cy="42" rx="14" ry="16" fill="#fbf6ff" ${s}/><path d="M41 38Q44 34 47 38Q44 41 41 38Z M53 38Q56 34 59 38Q56 41 53 38Z" fill="#05020a"/><circle cx="44" cy="38" r=".9" fill="#c07aff"><animate attributeName="r" values=".6;1.6;.6" dur="1.4s" repeatCount="indefinite"/></circle><circle cx="56" cy="38" r=".9" fill="#c07aff"><animate attributeName="r" values=".6;1.6;.6" dur="1.4s" repeatCount="indefinite"/></circle>
 <path d="M41 48Q50 56 59 48Q50 52 41 48Z" fill="#05020a"/><path d="M44 44l1 3M56 44l-1 3" stroke="#d1263b" stroke-width="1"/>
 <path d="M36 32Q22 12 12 22Q24 22 30 30Z" fill="#140c24" ${s}/><path d="M64 32Q78 12 88 22Q76 22 70 30Z" fill="#d1263b" ${s}/><path d="M40 28Q50 4 60 28Z" fill="#ffd84a" ${s}/><circle cx="12" cy="22" r="3.5" fill="#ffd84a" ${s}/><circle cx="88" cy="22" r="3.5" fill="#ffd84a" ${s}/><circle cx="50" cy="8" r="3.5" fill="#d1263b" ${s}/>`};
MONS['Araignée Stellaire']=()=>{const O='#170f2a';const st=[[50,52],[42,46],[58,46],[46,60],[54,60]];return`<circle cx="50" cy="50" r="44" fill="#8ab8ff" opacity=".12"/>${[0,1,2,3,4,5].map(i=>`<path d="M50 50L${50+48*Math.cos(i*1.047)} ${50+48*Math.sin(i*1.047)}" stroke="#cfe6ff" stroke-width=".6" opacity=".5"/>`).join('')}${[18,30,42].map(r=>`<circle cx="50" cy="50" r="${r}" fill="none" stroke="#cfe6ff" stroke-width=".6" opacity=".4" stroke-dasharray="4 3"/>`).join('')}
 ${[-1,1].map(sd=>[0,1,2,3].map(i=>{const y=40+i*8,kx=50+sd*(22+i*3),fx=50+sd*(36+i*2);return`<path d="M${50+sd*10} ${y+6}Q${kx} ${y-14+i*4} ${fx} ${y+18+i*6}" stroke="#1a1a5a" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M${50+sd*10} ${y+6}Q${kx} ${y-14+i*4} ${fx} ${y+18+i*6}" stroke="#8ab8ff" stroke-width="1" fill="none" stroke-dasharray="1 4"/>`}).join('')).join('')}
 <ellipse cx="50" cy="62" rx="15" ry="17" fill="#1a1a5a" stroke="${O}" stroke-width="1.8"/><ellipse cx="50" cy="40" rx="10" ry="9" fill="#2a2a8a" stroke="${O}" stroke-width="1.8"/>${st.map(([x,y])=>`<circle cx="${x}" cy="${y+8}" r="1.6" fill="#fff6c0"><animate attributeName="opacity" values="1;.3;1" dur="${(1.2+x%5*.3).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}<path d="M42 54L46 68L54 68L58 54" stroke="#fff6c0" stroke-width=".6" fill="none"/>
 ${[[45,38],[55,38],[47,43],[53,43]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.7" fill="#ff5ad8"/>`).join('')}`};
MONS["Héraut d'Umbra"]=()=>{const O='#170f2a',s=`stroke="${O}" stroke-width="1.8" stroke-linejoin="round"`;return`<circle cx="50" cy="40" r="42" fill="#9a6aff" opacity=".12"/><path d="M18 100Q22 50 50 14Q78 50 82 100Z" fill="#140a24" ${s}/><path d="M30 100Q32 64 50 40Q68 64 70 100" fill="#2a1a4a" opacity=".8"/>
 <path d="M36 44Q50 18 64 44Q62 58 50 62Q38 58 36 44Z" fill="#05020a" ${s}/><circle cx="50" cy="44" r="7" fill="none" stroke="#9a6aff" stroke-width="1.6"><animate attributeName="r" values="5;9;5" dur="2.4s" repeatCount="indefinite"/></circle><circle cx="50" cy="44" r="2" fill="#fff"/>
 <path d="M70 60Q90 50 94 30L90 28Q86 46 68 54Z" fill="#ffd84a" ${s}/><circle cx="93" cy="27" r="5" fill="#05020a" stroke="#ffd84a" stroke-width="1.6"/><path d="M28 64Q10 74 8 92" stroke="#140a24" stroke-width="7" fill="none"/>
 ${[0,1,2].map(i=>`<path d="M${36+i*14} 100V80" stroke="#9a6aff" stroke-width="1" opacity=".6"><animate attributeName="opacity" values=".1;.8;.1" dur="${1.5+i*.5}s" repeatCount="indefinite"/></path>`).join('')}`};
MONS["Umbra, Mangeuse d'Étoiles"]=()=>{const O='#170f2a';return`<circle cx="50" cy="50" r="48" fill="#05020a"/><circle cx="50" cy="50" r="46" fill="none" stroke="#9a6aff" stroke-width="2" opacity=".5"><animate attributeName="r" values="40;48;40" dur="3s" repeatCount="indefinite"/></circle>
 ${[...Array(9)].map((_,i)=>{const a=i*.698;return`<path d="M50 50L${(50+60*Math.cos(a)).toFixed(1)} ${(50+60*Math.sin(a)).toFixed(1)}" stroke="#2a1a4a" stroke-width="${6+i%3*3}" stroke-linecap="round"/>`}).join('')}
 <path d="M14 60Q16 22 50 16Q84 22 86 60Q80 92 50 96Q20 92 14 60Z" fill="#140a24" stroke="${O}" stroke-width="2"/>
 ${[[34,40,4],[66,40,4],[50,30,3],[26,54,2.4],[74,54,2.4],[40,52,2],[60,52,2]].map(([x,y,r],i)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#fff6c0"><animate attributeName="opacity" values="1;.25;1" dur="${(1.4+i*.3).toFixed(1)}s" repeatCount="indefinite"/></circle><circle cx="${x}" cy="${y}" r="${r*2.2}" fill="#c07aff" opacity=".18"/>`).join('')}
 <path d="M30 70Q50 90 70 70Q60 78 50 78Q40 78 30 70Z" fill="#05020a" stroke="#9a6aff" stroke-width="1.2"/>${[36,44,52,60].map(x=>`<path d="M${x} 72l3 6l3 -6" fill="#e8dcf0"/>`).join('')}
 <circle cx="50" cy="84" r="1.6" fill="#ffd84a"><animate attributeName="r" values="1;2.6;1" dur="2s" repeatCount="indefinite"/></circle>`};
{const sf=sagaFig;sagaFig=function(w){try{if(w==='umbra')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS["Umbra, Mangeuse d'Étoiles"]()}</svg></div>`;if(w==='corvin2')return`<div class="sgfig lore">${corvinUltSVG()}</div>`}catch(e){}return sf.apply(this,arguments)}}
/* --- fonds animés du Livre II --- */
function sgBg2(c){const cfg=SAGA[c];const [a,b,d]=cfg.bg;const R=rng(c*91+3);const A=(at,v,du,ex='')=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite" ${ex}/>`;const f=n=>n.toFixed(0);
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="sgb${c}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="sgl${c}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff6c0" stop-opacity=".75"/><stop offset="1" stop-color="#fff6c0" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#sgb${c})"/>`;
  const card=(x,y,sym,col,du,dl,sc)=>`<g opacity=".55"><g transform="scale(${sc})"><rect x="-12" y="-17" width="24" height="34" rx="3" fill="#fbf6ff" stroke="#ffd84a" stroke-width="1.2"/><text y="6" font-size="16" text-anchor="middle" fill="${col}">${sym}</text></g><animateMotion dur="${du}s" begin="${dl}s" repeatCount="indefinite" rotate="auto" path="M${f(x)} 760Q${f(x+60)} ${f(y)} ${f(x-40)} -60"/></g>`;
  if(c===8){for(let i=0;i<3;i++)s+=`<path d="M${120+i*80} -10L${60+i*120} 700L${180+i*120} 700Z" fill="#fff6c0" opacity=".06">${A('opacity','.03;.12;.03',4+i)}<animateTransform attributeName="transform" type="rotate" values="-6 ${120+i*80} 0;6 ${120+i*80} 0;-6 ${120+i*80} 0" dur="${7+i*2}s" repeatCount="indefinite"/></path>`;
    s+=`<circle cx="200" cy="90" r="70" fill="url(#sgl${c})">${A('r','62;78;62',3)}</circle>${[...Array(9)].map((_,i)=>`<circle cx="${140+i*15}" cy="${110+Math.abs(4-i)*6}" r="3" fill="#ffd84a">${A('opacity','.4;1;.4',1+i%3*.4)}</circle>`).join('')}`;
    for(let i=0;i<8;i++)s+=card(R()*400,200+R()*300,PK_SU[i%4],i%4===1||i%4===2?'#d1263b':'#140c24',9+R()*6,-R()*9,.9+R()*.6);
    s+=`<ellipse cx="200" cy="620" rx="260" ry="90" fill="#0a4a2a" stroke="#ffd84a" stroke-width="6"/><ellipse cx="200" cy="620" rx="230" ry="70" fill="#0e6a3a"/>${[0,1,2,3,4].map(i=>`<g transform="translate(${130+i*35} ${600+(i%2)*10})"><ellipse rx="12" ry="5" fill="${['#d1263b','#ffd84a','#140c24','#8a3aff','#fff'][i]}" stroke="#140c24"/><ellipse cy="-4" rx="12" ry="5" fill="${['#d1263b','#ffd84a','#140c24','#8a3aff','#fff'][i]}" stroke="#140c24"/></g>`).join('')}`}
  else if(c===9){s+=`<circle cx="300" cy="160" r="90" fill="url(#sgl${c})">${A('opacity','.6;1;.6',5)}</circle><circle cx="300" cy="160" r="44" fill="#fff0c8"/>`;
    s+=`<path d="M0 500Q90 430 200 470T400 450V700H0Z" fill="#d8a050"/><path d="M0 560Q120 510 260 550T400 540V700H0Z" fill="#c08a3a"/>`;
    for(let i=0;i<5;i++){const x=40+i*80+R()*20,y=380+R()*120,sc=.6+R()*.7,up=i%2;s+=`<g transform="translate(${f(x)} ${f(y)}) scale(${sc.toFixed(2)})"><rect x="-30" y="-74" width="60" height="8" fill="#8a5a2a"/><rect x="-30" y="66" width="60" height="8" fill="#8a5a2a"/><path d="M-24 -66H24L4 0L24 66H-24L-4 0Z" fill="#fff6dc" fill-opacity=".35" stroke="#5a3a1a" stroke-width="2"/><rect x="-1.5" y="-60" width="3" height="120" fill="#ffd84a" opacity=".8">${A('y',up?'60;-60':'-60;60',2+i*.4)}${A('height','0;120;0',2+i*.4)}</rect></g>`}
    for(let i=0;i<14;i++)s+=`<circle r="${(1+R()*2).toFixed(1)}" fill="#ffe8b0" opacity=".7"><animateMotion dur="${(5+R()*5).toFixed(1)}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M-20 ${f(400+R()*250)}q200 -${f(60+R()*80)} 440 -${f(R()*40)}"/></circle>`}
  else if(c===10){for(let i=0;i<30;i++)s+=`<circle cx="${f(R()*400)}" cy="${f(R()*300)}" r="${(.6+R()*1.4).toFixed(1)}" fill="#fff">${A('opacity','.2;1;.2',(1.5+R()*3).toFixed(1))}</circle>`;
    for(let i=0;i<4;i++){const x=60+i*90;s+=`<g><circle cx="${x}" cy="${120+i*30}" r="2" fill="${['#ff5ad8','#ffd84a','#8ad8ff','#c07aff'][i]}">${A('r','0;40;0',3+i*.6,`begin="${-i}s"`)}${A('opacity','1;0;0',3+i*.6,`begin="${-i}s"`)}</circle></g>`}
    s+=`<path d="M0 470V330h30v-40h20v40h30v-70l20 -30l20 30v70h40v-50h30v50h20v-110l25 -40l25 40v110h30v-60h30v60h30v-40h20v40h30V470Z" fill="#1a0a3a"/>`;for(let i=0;i<22;i++)s+=`<rect x="${f(10+R()*380)}" y="${f(300+R()*150)}" width="5" height="8" fill="#ffd84a">${A('opacity','.3;1;.3',(1+R()*3).toFixed(1))}</rect>`;
    s+=`<rect y="470" width="400" height="230" fill="#2a1a5a"/>${[0,1,2,3].map(i=>`<path d="M0 ${500+i*45}Q100 ${490+i*45} 200 ${500+i*45}T400 ${500+i*45}" stroke="#ff8ad8" stroke-width="1.5" opacity=".35" fill="none">${A('d',`M0 ${500+i*45}Q100 ${490+i*45} 200 ${500+i*45}T400 ${500+i*45};M0 ${500+i*45}Q100 ${510+i*45} 200 ${500+i*45}T400 ${500+i*45};M0 ${500+i*45}Q100 ${490+i*45} 200 ${500+i*45}T400 ${500+i*45}`,4+i)}</path>`).join('')}`;
    for(let i=0;i<5;i++){const x=40+R()*320;s+=`<g opacity=".8"><path d="M-14 0Q-14 -9 0 -9Q14 -9 14 0Q10 7 0 4Q-10 7 -14 0Z" fill="${i%2?'#fbf6ff':'#140c24'}" stroke="#ffd84a" stroke-width="1"/><path d="M-9 -3Q-6 -6 -3 -3Q-6 -1 -9 -3ZM3 -3Q6 -6 9 -3Q6 -1 3 -3Z" fill="${i%2?'#140c24':'#ff5ad8'}"/><animateMotion dur="${(8+R()*5).toFixed(1)}s" begin="${(-R()*8).toFixed(1)}s" repeatCount="indefinite" path="M${f(x)} 600q${f(R()*60-30)} -150 ${f(R()*80-40)} -320t${f(R()*60-30)} -320"/></g>`}}
  else if(c===11){for(let i=0;i<50;i++)s+=`<circle cx="${f(R()*400)}" cy="${f(R()*520)}" r="${(.5+R()*1.6).toFixed(1)}" fill="#fff">${A('opacity','.15;1;.15',(1.2+R()*3).toFixed(1))}</circle>`;
    s+=`<path d="M-20 560Q200 260 420 560" stroke="#fff6c0" stroke-width="10" fill="none" opacity=".3"/><path d="M-20 560Q200 260 420 560" stroke="#cfe6ff" stroke-width="3" fill="none" stroke-dasharray="2 10">${A('stroke-dashoffset','0;-48',2)}</path>`;
    for(let i=0;i<8;i++){const x=20+i*50;s+=`<path d="M${x} 0L${x+20-R()*40} ${f(200+R()*200)}" stroke="#cfe6ff" stroke-width=".8" opacity=".5"/><circle cx="${x}" cy="0" r="1" fill="#fff"/>`}
    s+=`<g opacity=".5"><path d="M200 40L250 120L200 200L150 120Z M200 40V200 M150 120H250" stroke="#ff5ad8" stroke-width="1" fill="none">${A('opacity','.2;.8;.2',3)}</path></g><circle cx="200" cy="120" r="50" fill="url(#sgl${c})">${A('opacity','.3;.8;.3',4)}</circle>`;
    for(let i=0;i<6;i++)s+=`<circle r="2.2" fill="#fff6c0"><animateMotion dur="${(3+R()*3).toFixed(1)}s" begin="${(-R()*4).toFixed(1)}s" repeatCount="indefinite" path="M${f(R()*400)} -10L${f(R()*400)} 720"/>${A('opacity','0;1;0',2)}</circle>`;
    s+=`<rect y="560" width="400" height="140" fill="#05061a" opacity=".7"/>`}
  else if(c===12){s+=`<circle cx="200" cy="220" r="150" fill="#c03aff" opacity=".15">${A('r','130;170;130',5)}</circle>`;
    for(let i=0;i<6;i++){const x=R()*400;s+=`<path d="M${f(x)} ${f(100+R()*300)}l${f(R()*40-20)} 30l${f(R()*30-15)} 40" stroke="#c03aff" stroke-width="2" fill="none" opacity=".6">${A('opacity','.1;.9;.1',(1.5+R()*2).toFixed(1))}</path>`}
    s+=`<path d="M140 520V330Q140 260 200 240Q260 260 260 330V520Z" fill="#140a24" stroke="#5a3a8a" stroke-width="3"/><path d="M160 520V350Q160 290 200 276Q240 290 240 350V520Z" fill="#2a1a4a"/><path d="M120 260L140 330M280 260L260 330M200 200V240" stroke="#5a3a8a" stroke-width="5"/>`;
    for(let i=0;i<12;i++)s+=`<path d="M0 -8Q4 0 0 8Q-4 0 0 -8Z" fill="#c8b8e8" opacity=".75"><animateMotion dur="${(7+R()*6).toFixed(1)}s" begin="${(-R()*8).toFixed(1)}s" repeatCount="indefinite" rotate="auto" path="M${f(R()*400)} -20q${f(R()*80-40)} 200 ${f(R()*60-30)} 380t${f(R()*60-30)} 380"/></path>`;
    s+=`<path d="M0 520Q200 480 400 520V700H0Z" fill="#0a0414"/>`}
  else{s+=`<circle cx="200" cy="260" r="200" fill="#05020a"/>`;
    for(let i=0;i<40;i++){const ang=R()*6.283,rr=200+R()*160;s+=`<circle r="${(.8+R()*1.6).toFixed(1)}" fill="#fff6c0"><animateMotion dur="${(4+R()*5).toFixed(1)}s" begin="${(-R()*6).toFixed(1)}s" repeatCount="indefinite" path="M${f(200+rr*Math.cos(ang))} ${f(260+rr*Math.sin(ang))}L200 260"/>${A('opacity','1;1;0',3)}</circle>`}
    s+=`<g>${[[160,230],[240,230],[200,190],[130,270],[270,270]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${7-i%3}" fill="#c07aff">${A('opacity','.2;1;.2',(1.5+i*.4).toFixed(1))}</circle>`).join('')}</g>`;
    for(let i=0;i<6;i++)s+=`<g><g transform="rotate(${i*60} 200 470)"><rect x="186" y="300" width="28" height="40" rx="4" fill="#fbf6ff" stroke="#ffd84a" stroke-width="1.6"/><text x="200" y="326" font-size="18" text-anchor="middle" fill="${i%2?'#d1263b':'#140c24'}">${PK_SU[i%4]}</text></g><animateTransform attributeName="transform" type="rotate" from="0 200 470" to="360 200 470" dur="24s" repeatCount="indefinite"/></g>`;
    s+=`<ellipse cx="200" cy="600" rx="280" ry="100" fill="#140a24" stroke="#ff5ad8" stroke-width="4">${A('stroke-opacity','.4;1;.4',3)}</ellipse><ellipse cx="200" cy="600" rx="250" ry="80" fill="#2a0a3a"/>`}
  return s+`<rect y="460" width="400" height="240" fill="#000" opacity=".25"/></svg>`}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(c>=8&&SAGA[c])return sgBg2(c);return sb.apply(this,arguments)}}
/* --- le combat : la difficulté monte doucement (base mode Facile) --- */
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(c>=8&&r&&r.foes){const cfg=SAGA[c],st=cfg.boss.st,g=Math.pow(GROW,st-1)*(1+1.1*(st-1)/99);const bs=r.foes[r.foes.length-1];
   const f=4.4+(c-8)*.12;bs.max=Math.round(380*g*f*(cfg.fin2?1.15:1));bs.hp=bs.max;bs.atk=Math.round(42*g*(1.42+(c-8)*.03));bs.def=Math.round(18*g*1.3);bs.spd=104+(c-8)*2;
   bs.sk={n:['Main truquée','Tempête de sable','Valse sans visage','Toile inversée','Trompe du Néant','Dévoreuse d\'étoiles'][c-8],tg:'all',fx:{dmg:118+(c-8)*4,weak:1}};if(cfg.fin2)bs.sk.fx.stun=20;
   r.sub=`Mode histoire · Livre II · chapitre ${c+1}${cfg.fin2?' · Combat final':''}`;r.maxR=cfg.fin2?32:30}}catch(e){}return r}}
/* --- les choix de la fin, la musique --- */
{const so=sagaOpen;sagaOpen=function(c,part){try{const cfg=SAGA[c];if(cfg&&cfg.fin2&&part==='outro')cfg.outro=SG().ch[c]==='brv'?cfg.outroB:cfg.outroA}catch(e){}const r=so.apply(this,arguments);try{if(c>=8)musicWant(c===8||c===10||c===13?'alea':'dungeon')}catch(e){}return r}}
/* --- récompenses du Livre II --- */
const SAGA_RW2=[[250,1,0],[260,1,0],[280,1,2],[300,2,0],[320,2,3],[600,4,5]];
{const sr=sagaReward;sagaReward=function(c){if(c<8)return sr.apply(this,arguments);const G=SG();if(G.done[c]){render();return}G.done[c]=Date.now();const [gm,sh,tk]=SAGA_RW2[c-8];S.gems+=gm;S.shards+=sh;if(tk)INV().pt+=tk;save();const cfg=SAGA[c],fin=!!cfg.fin2;
  modal(`<div class="sgrw bk2"><div class="sgfrag">${fin?'👑':BK2SYM[c-8]}</div><div class="h">${fin?'Le destin est réécrit !':'Chapitre '+(c+1)+' terminé'}</div><p class="sub">${fin?(G.ch[c]==='brv'?'Fin du Tapis : Umbra est vaincue.':'Fin de la Mémoire : Umbra retrouve sa lumière.'):'« '+esc(cfg.t)+' »'}</p>
   <div class="sgfrags bk2">${BK2SYM.map((x,i)=>`<i class="${G.done[8+i]?'on':''}">${x}</i>`).join('')}</div><div class="xrw"><div>${GEM}${gm} gemmes</div><div>${SHARD}${sh} éclat${sh>1?'s':''} légendaire${sh>1?'s':''}</div>${tk?`<div>${SIC.ticket}${tk} tickets d'invocation</div>`:''}${fin?'<div>🏷️ Titre « Briseur de Destin »</div>':''}</div>
   ${fin?`<button class="btn pro" data-a="algo" style="width:100%;margin-top:10px">🃏 Aller à la Table d'Aléa</button>`:''}<button class="btn p" data-a="close" style="width:100%;margin-top:8px">${fin?'Merci, Aléa 🃏':'Continuer l\'aventure'}</button></div>`);render()}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="algo"]');if(!t)return;e.preventDefault();e.stopPropagation();closeModal();TAB='invoc';UI.iv='invoc';UI.ban='al';UI.last=null;render();window.scrollTo(0,0)},true);
/* --- le Livre de l'Histoire, avec ses deux tomes --- */
function loreFig(k){try{if(k==='plume')return plumeSVG('happy');if(k==='alea')return aleaSVG();if(k==='astree')return astreeSVG();if(k==='brann')return npcSVG('forgeron');if(k==='vesperax'&&typeof vesperaxSVG==='function')return vesperaxSVG();if(k==='umbra')return`<svg viewBox="0 0 100 100">${MONS["Umbra, Mangeuse d'Étoiles"]()}</svg>`;return`<svg viewBox="0 0 100 100">${MONS[k==='corvin'?'Corvin':'Vesperax']()}</svg>`}catch(e){return''}}
function loreCharsHTML(){const G=SG();const seen=c=>Object.keys(G.done).some(i=>+i>=c)||(c===0);return`<div class="lorechars">${LORE_CHARS.map(c=>{const ok=seen(c.ch);return`<button class="lorec ${ok?'':'lock'}" data-a="lorechar2" data-v="${c.k}" ${ok?'':'disabled'}><span class="lorecf">${ok?loreFig(c.k):'❔'}</span><b>${ok?esc(c.n):'???'}</b></button>`}).join('')}</div>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="lorechar2"]');if(!t)return;e.preventDefault();e.stopPropagation();const c=LORE_CHARS.find(x=>x.k===t.dataset.v);if(!c)return;
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="lorem"><div class="loremf">${loreFig(c.k)}</div><div class="h">${esc(c.n)}</div><div class="lorer">${esc(c.r)}</div><p class="sub">${esc(c.d)}</p>${c.k==='alea'?`<button class="btn pro" data-a="algo" style="width:100%;margin-top:8px">🃏 Table d'Aléa</button>`:''}</div>`)},true);
function sagaCard(){const G=SG(),b1=!!G.done[7];let bk=b1?(UI.sgBook||2):1;const R=bk===1?[0,8]:[8,14];const n=sagaNext();const nIn=n>=R[0]&&n<R[1];
  const done=Object.keys(G.done).filter(i=>+i>=R[0]&&+i<R[1]).length;
  const items=SAGA.slice(R[0],R[1]).map((c,j)=>{const i=R[0]+j,ok=!!G.done[i],un=sagaUnlocked(i);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="sgplay" data-v="${i}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${i+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Étape ${c.req} du mode Facile`}</small></button>`}).join('');
  const marks=bk===1?[1,2,3,4,5,6,7].map(i=>`<i class="${done>=i?'on':''}">✦</i>`).join(''):BK2SYM.map((x,i)=>`<i class="${G.done[8+i]?'on':''}">${x}</i>`).join('');
  const tabs=b1?`<div class="chips sgbk"><button class="chip ${bk===1?'on':''}" data-a="sgbook" data-v="1">📕 Livre I</button><button class="chip mychip ${bk===2?'on':''}" data-a="sgbook" data-v="2">🃏 Livre II${!G.done[13]&&nIn===false&&bk===1&&n>=8&&sagaUnlocked(n)?' <span class="pdot">1</span>':''}</button></div>`:'';
  let main;if(nIn&&sagaUnlocked(n))main=`<button class="btn ${bk===2?'pro':'p'} sgbig" data-a="sgplay" data-v="${n}">▶️ ${SAGA[n].ic} Chapitre ${n+1} : ${esc(SAGA[n].t)}</button>`;
  else if(nIn)main=`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Prochain chapitre à l'étape ${SAGA[n].req} du mode Facile.</p>`;
  else if(bk===1)main=`<p style="margin:8px 0 0;font-size:13px">💖 Tu as sauvé le Cœur d'Éther. Merci, Porteur !${b1?' Le Livre II t\'attend…':''}</p>`;
  else main=`<p style="margin:8px 0 0;font-size:13px">👑 Tu as réécrit le destin et battu Umbra. Aléa t'attend à sa table !</p>`;
  const head=bk===1?`<div class="sgpl">${plumeSVG('happy')}</div>`:`<div class="sgpl sgal">${aleaSVG()}</div>`;
  return`<div class="card sgcard ${bk===2?'bk2':''}">${tabs}<div class="sghd">${head}<div style="min-width:0;flex:1"><div class="h3" style="margin:0">${bk===1?"📖 Les Fragments d'Éther":"🃏 Livre II · Le Destin d'Aléa"}</div><div class="muted" style="font-size:12.5px">${bk===1?`Mode histoire avec Plume · ${done}/8 chapitres`:`Avec Plume et Aléa · ${done}/6 chapitres`} · ${G.cmp+G.brv?`💗 ${G.cmp} · ⚔️ ${G.brv}`:'tes choix comptent'}</div>
   <div class="sgfrags sm ${bk===2?'bk2':''}">${marks}</div></div></div>${main}
   <details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${items}</div></details></div>`}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="sgbook"]');if(!t)return;e.preventDefault();e.stopPropagation();UI.sgBook=+t.dataset.v;render()},true);

/* ================= musique : « Tango du Destin » ================= */
SONGS.alea={g:1.05,bpm:116,spb:4,bar:16,bars:8,prog:'Am Am Dm E7 Am F E7 Am',parts:[
 {i:'pad',f:'chord',lo:52,v:.5},
 {i:'sbass',f:'bass',lo:33,v:.62,pat:[[0,3,0],[3,1,0],[4,2,7],[8,3,0],[11,1,7],[12,2,0],[14,2,7]]},
 {i:'pizz',f:'stab',lo:57,v:1,at:[0,3,6,10,12],len:1},
 {i:'brass',f:'mel',v:.8,mel:'E5:3 F5:1 E5:4 C5:4 A4:4|B4:2 C5:2 D5:2 E5:2 F5:4 E5:4|D5:3 E5:1 F5:4 A5:4 F5:4|E5:6 D5:2 C5:4 B4:4|A5:3 G#5:1 A5:4 E5:4 C5:4|F5:4 A5:4 C6:4 A5:4|G#5:3 A5:1 B5:4 D6:4 B5:4|A5:12 r:4'},
 {i:'cel',f:'mel',v:.35,mel:'r:16|r:12 E6:2 A6:2|r:16|r:12 G#6:2 B6:2|r:16|r:12 A6:2 C7:2|r:16|r:8 E7:2 C7:2 A6:4'},
 {i:'kick',f:'drum',v:.5,pat:'x...x...x...x...'},
 {i:'snare',f:'drum',v:.35,pat:'...x.......x..x.'},
 {i:'shaker',f:'drum',v:.45,pat:'x.xxx.xxx.xxx.xx'},
 {i:'crash',f:'drum',v:.35,pat:'',alt:{1:'x',5:'x'}}]};
try{delete SONGC.alea}catch(e){}
{const pt=pageTheme;pageTheme=function(){try{if(!B&&BOOT.done&&((TAB==='invoc'&&UI.ban==='al'&&(UI.iv||'invoc')==='invoc')||(TAB==='event'&&UI.evt==='cas'&&UI.csub==='al')))return'alea'}catch(e){}return pt.apply(this,arguments)}}
{const bt=battleTheme;battleTheme=function(){try{if(B&&B.mode==='event'&&/Livre II/.test(B.sub||'')&&!/Combat final/.test(B.sub||''))return'alea'}catch(e){}return bt.apply(this,arguments)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="ban"],[data-a="csub"]');if(!t)return;setTimeout(()=>{try{musicWant(pageTheme())}catch(e){}},60)});

/* ================= notes de mise à jour ================= */
PATCH.unshift({v:28,d:'20 octobre 2026',t:'Le Destin d\'Aléa',items:[
 "🃏 <b>Nouveau héros MYTHIQUE : Aléa le Joueur Masqué</b> ! Une rareté au-dessus de Légendaire (stats ×3,6). Son ultime <b>Coup de Poker</b> tire 5 cartes : de la simple paire à la <b>Quinte flush royale</b> (1000 % à tous, étourdit, ranime et soigne l'équipe). Parfois, il <b>réécrit une carte</b> sous tes yeux pour améliorer sa main.",
 "✦ Passifs d'Aléa : <b>Réécrire le destin</b> (une fois par combat, le coup qui aurait mis K.O. un allié est annulé) et <b>Carte cachée</b> (25 % de chances de lancer une 2ᵉ carte).",
 "🎬 <b>Animations exclusives</b> : écran d'ultime coupé en blanc et noir, table de poker avec cartes qui se retournent, pluie de cartes géantes et de pièces d'or pour les grosses mains. Et une invocation MYTHIQUE rien qu'à lui.",
 "🎰 <b>Nouvelle bannière : la Table d'Aléa</b>, au Casino de Fortuna et dans les Invocations. Mythique à 0,5 %, garanti en 90 invocations (compteur propre à la table), mêmes prix que les autres bannières.",
 "📖 <b>Mode histoire, Livre II : « Le Destin d'Aléa »</b> : 6 nouveaux chapitres (étapes 75 à 100 du mode Facile), avec des fonds animés, 6 nouveaux boss et la Mangeuse d'Étoiles, Umbra. La difficulté monte petit à petit, mais reste battable. Deux fins possibles !",
 "🎵 Nouvelle musique : le « Tango du Destin » (Table d'Aléa et Livre II).",
 "🏷️ Nouveaux titres : « Main Mythique » et « Briseur de Destin ». Nouvelles affinités : Fortuna + Aléa, Kaïros + Aléa."]});
/* --- portrait carré d'Aléa : son vrai visage masqué (et pas un portrait générique) --- */
function alPortrait(){const b=aleaHeroBody();if(!b)return null;const inner=b.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  return`<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Aléa le Joueur Masqué"><defs><radialGradient id="alpg" cx="50%" cy="40%" r="75%"><stop offset="0" stop-color="#9a4aff"/><stop offset=".55" stop-color="#3a0a5a"/><stop offset="1" stop-color="#0b0819"/></radialGradient></defs><rect width="100" height="100" fill="url(#alpg)"/>${[0,1,2,3,4,5,6,7].map(k=>{const q=k*.785,q2=q+.2;return`<path d="M50 40L${(50+80*Math.cos(q)).toFixed(1)} ${(40+80*Math.sin(q)).toFixed(1)}L${(50+80*Math.cos(q2)).toFixed(1)} ${(40+80*Math.sin(q2)).toFixed(1)}Z" fill="#ff5ad8" opacity=".14"/>`}).join('')}${[[12,18,'♠'],[86,22,'♥'],[10,84,'♦'],[90,86,'♣']].map(([x,y,c])=>`<text x="${x}" y="${y}" font-size="11" text-anchor="middle" fill="${c==='♥'||c==='♦'?'#ff5a7a':'#ffd84a'}" opacity=".55">${c}</text>`).join('')}<svg x="0" y="0" width="100" height="100" viewBox="${ALPV}">${inner}</svg><rect x="3" y="3" width="94" height="94" rx="5" fill="none" stroke="#ff5ad8" stroke-width="1.6"/><rect x="5.5" y="5.5" width="89" height="89" rx="4" fill="none" stroke="#ffd84a" stroke-width=".7" opacity=".8"/>${[[3,3,1,1],[97,3,-1,1],[3,97,1,-1],[97,97,-1,-1]].map(([x,y,a,b])=>`<path d="M${x} ${y+b*12}V${y}H${x+a*12}" stroke="#ffd84a" stroke-width="2.4" fill="none"/>`).join("")}</svg>`}
const ALPV='33 -13 94 94';
try{const p=alPortrait();if(p)PCACHE[ALEA]=p}catch(e){}
