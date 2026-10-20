
/* ================= V22 : MODE NORMAL, HÉROS EN PIED, HÉROS DES AUTRES JOUEURS ================= */
/* ---------- mode Normal : 100 nouvelles étapes ---------- */
let NMODE=0;
const NGROW=1.036;
const nRec=n=>Math.round(recPow(100)*(.95+.6*Math.pow((n-1)/99,1.1))*(n%10===0?1.1:1));
const NMON={};
function nInit(){if(S.nmax==null)S.nmax=0;S.nstage=Math.min(100,(S.nmax||0)+1)}
const nOpen=()=>S.max>=100;
{const sf=stageFoes;stageFoes=function(s){const f=sf(s);if(!NMODE)return f;const k=nRec(s)/recPow(s),boss=s%10===0;
  for(const u of f){u.max=Math.round(u.max*k);u.hp=u.max;u.atk=Math.round(u.atk*k);u.def=Math.round(u.def*k*.9);u.spd=(u.spd||100)+8;if(u.boss){u.sk={...u.sk,fx:{...(u.sk.fx||{}),dmg:Math.round(((u.sk.fx||{}).dmg||120)*1.15)}}}}
  if(!boss&&f.length<5&&s>40){const x=f[f.length-1];f.push({...x,key:'f'+f.length,hp:x.max})}
  return f}}
function nBattle(n){nInit();if(!nOpen())return toast('Termine les 100 étapes faciles pour débloquer le mode Normal.');if(n>S.nstage)return;NMODE=n;try{startBattle('stage',n)}finally{NMODE=0}
  if(B&&B.mode==='stage'){B.normal=n;const t=$('#battle .bh .t');if(t&&t.firstChild)t.firstChild.textContent='⚔️ Normal · Étape '+n+(n%10===0?' · Boss':'');const bt=$('#battle');if(bt)bt.classList.add('nmode')}}
{const fi=finish;finish=function(res){if(!B||!B.normal||B.done)return fi.apply(this,arguments);const n=B.normal,m0=S.max,s0=S.stage;nInit();S.max=1e9;
  try{fi.apply(this,arguments)}finally{S.max=m0;S.stage=s0}
  const extra=[];const w=Math.ceil(n/10),boss=n%10===0;
  if(res===true){const g=Math.round((1500+40*n)*(boss?3:1)*goldMul());S.gold+=g;extra.push(GOLD+fmt(g)+' or (bonus Normal)');
    if(n>S.nmax){S.nmax=n;S.nstage=Math.min(100,n+1);const gm=boss?150:30;S.gems+=gm;extra.push(GEM+gm+' gemmes (1re victoire Normal)');if(boss){S.shards+=2;extra.push(SHARD+'2 éclats légendaires');try{news(Date.now(),`${S.name||'Voyageur'} a vaincu ${WORLDS[w-1].b} en mode Normal (étape ${n}).`);react('gg',{},2)}catch(e){}}}
    const it=dropItem(rollRarity(Math.min(10,w+3),boss?2.5:1.4));extra.push(itemChip(it));
    if(n===100)extra.push('👑 Mode Normal terminé ! Tu es une légende du royaume.')}
  else extra.push(`Puissance conseillée en Normal : ${fmt(nRec(n))}.`);
  save();
  try{const rw=$('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend',extra.map(x=>`<span>${x}</span>`).join(''));const ns=$('#battle .result [data-a="nextstage"]');if(ns&&(res!==true||n>=100))ns.remove();const h=$('#battle .result .h');if(h)h.insertAdjacentHTML('beforeend','<small class="nmtag">MODE NORMAL</small>')}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||!B||!B.normal)return;const a=t.dataset.a;
  if(a==='nextstage'||a==='retry'){e.stopImmediatePropagation();e.preventDefault();const n=a==='retry'?B.normal:B.normal+1;closeBattle();nBattle(n)}},true);
function diffSw(d){const o=d==='n'?'e':'n';const lk=!nOpen();
  return`<div class="diffsw ${d==='n'?'dn':'de'}" id="diffsw"><button class="dfa" data-a="diff" data-v="${o}" aria-label="Changer de difficulté">‹</button>
  <div class="dft"><b>${d==='n'?'⚔️ Mode Normal':'🌱 Mode Facile'}</b><small>${d==='n'?(lk?'🔒 Termine le mode Facile pour débloquer':`Étape ${Math.min(100,(S.nmax||0)+1)} / 100 · monstres bien plus coriaces`):`Étape ${Math.min(100,S.stage)} / 100${nOpen()?' · Normal débloqué !':''}`}</small><span class="dfd"><i class="${d==='e'?'on':''}"></i><i class="${d==='n'?'on':''}"></i></span></div>
  <button class="dfa" data-a="diff" data-v="${o}" aria-label="Changer de difficulté">›</button></div>`}
function pAdvN(sw){nInit();const lock=!nOpen();const cw=Math.max(1,Math.min(10,Math.ceil(S.nstage/10)));const w=Math.min(UI.nworld??cw,cw);const Wd=WORLDS[w-1];
  let nodes='';for(let k=1;k<=10;k++){const s=(w-1)*10+k,done=s<=S.nmax,cur=s===S.nstage&&S.nmax<100,lk=lock||s>S.nstage;nodes+=`<button class="node ${done?'done':''} ${cur?'now':''} ${lk?'lock':''} ${k===10?'boss':''}" data-a="nstage" data-v="${s}" ${lk?'disabled':''} aria-label="Étape ${s} normale">${s}</button>`}
  const tp=idsPower(teamIdsFor('pve')),rp=nRec(S.nstage),fin=S.nmax>=100;
  return`<div class="stack nmpage">
  <div class="card row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Coffre d'expédition</div><div class="muted">Tes héros rapportent ${idleRate()} or/min, même hors ligne (8 h max).</div></div><button class="btn p" data-a="idle">${GOLD} Récolter ${fmt(idleGold())}</button></div>
  ${sw}
  <div class="worlds">${WORLDS.map((x,i)=>`<button class="chip ${w===i+1?'on':''}" data-a="nworld" data-v="${i+1}" ${i+1>cw||lock?'disabled':''}>${i+1}. ${x.n}</button>`).join('')}</div>
  <div class="wbanner sc nmban">${sceneHTML(w,12)}<div class="wtx"><span class="nmbadge">NORMAL</span>
    <div class="h">Monde ${w} · ${Wd.n}</div>
    <p>Étapes ${(w-1)*10+1} à ${w*10} en Normal. Le boss <b>${Wd.b}</b> est enragé. Puissance conseillée de ${fmt(nRec((w-1)*10+1))} à ${fmt(nRec(w*10))}.</p>
    <div class="bestiary">${[...Wd.m,Wd.b].map((n,i)=>`<span class="bst ${i===5?'boss':''}" title="${esc(n)}">${monArt(n,Wd.h,i===5)}</span>`).join('')}</div></div>${lock?`<div class="nmlock"><b>🔒 Mode Normal verrouillé</b><span>Termine les 100 étapes du mode Facile (tu es à l'étape ${Math.min(100,S.stage)}).</span></div>`:''}</div>
  <div class="path">${nodes}</div>
  <div class="card stack"><div class="row" style="justify-content:space-between"><div><div class="h3" style="margin:0">Ton équipe d'aventure</div><div class="muted">Puissance ${fmt(tp)}</div></div>${teamStrip(teamIdsFor('pve'))}</div>${teamPick('pve')}
  ${lock?'':fin?`<div class="muted">Les 100 étapes du mode Normal sont terminées, bravo ! Rejoue-les pour l'équipement.</div>`:`<div class="row"><span class="${tp<rp*.85?'warn':'muted'}">Puissance conseillée : <b class="num">${fmt(rp)}</b>${tp<rp*.85?' · ton équipe est trop faible, renforce-la !':''}</span></div><button class="btn p big nmgo" data-a="nstage" data-v="${S.nstage}">⚔️ Combattre l'étape ${S.nstage} Normal${S.nstage%10===0?' · BOSS':''}</button>`}
  <div class="muted" style="font-size:12.5px">Récompenses du mode Normal : plus d'or, 30 gemmes par 1re victoire (150 sur les boss), 2 éclats légendaires par boss et du meilleur équipement.</div></div></div>`}
{const pa=pAdv;pAdv=function(){let d='e';try{d=localStorage.getItem('royaumes-diff')||'e'}catch(e){}UI.diff=UI.diff||d;const sw=diffSw(UI.diff);if(UI.diff==='n')return pAdvN(sw);const h=pa.apply(this,arguments);return h.replace('<div class="worlds">',sw+'<div class="worlds">')}}
function setDiff(d){UI.diff=d;try{localStorage.setItem('royaumes-diff',d)}catch(e){}const m=$('#main');render();const s=$('#diffsw');if(s){s.classList.add(d==='n'?'swl':'swr')}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='diff')setDiff(v);else if(a==='nstage')nBattle(+v);else if(a==='nworld'){UI.nworld=+v;render()}});
{let sx=null,sy=null;document.addEventListener('touchstart',e=>{if(TAB!=='adv'||B)return;const el=e.target.closest('#diffsw,.wbanner');if(!el){sx=null;return}sx=e.touches[0].clientX;sy=e.touches[0].clientY},{passive:true});
  document.addEventListener('touchend',e=>{if(sx==null||TAB!=='adv'||B)return;const dx=e.changedTouches[0].clientX-sx,dy=e.changedTouches[0].clientY-sy;sx=null;if(Math.abs(dx)>55&&Math.abs(dx)>Math.abs(dy)*1.5)setDiff(UI.diff==='n'?'e':'n')},{passive:true})}

/* ---------- héros en pied ---------- */
const BODYC={};
const ROBEB=new Set(['robe','dress','kimono','cloak']),BAREB=new Set(['bare','rocky','bark','fur']);
const POSES={Tank:['guard','hips','cross','guard','idle'],Guerrier:['strike','guard','hips','strike','idle'],Assassin:['crouch','cross','strike','crouch','hips'],Mage:['cast','wave','cast','hips','idle'],Tireur:['aim','hips','aim','wave','idle'],Soutien:['pray','cast','wave','pray','idle']};
const POSEN={guard:'En garde',hips:'Fier',cross:'Bras croisés',idle:'Au repos',strike:"À l'assaut",crouch:"À l'affût",cast:'Incantation',wave:'Salut',aim:'En joue',pray:'Prière'};
function poseOf(h){const P=POSES[h.c]||POSES.Guerrier;return P[ih(h.i*97+13)%P.length]}
const ARMS={
 idle:[[21,86,13,110,16,132],[79,86,87,110,84,132]],
 hips:[[21,86,6,106,30,124],[79,86,94,106,70,124]],
 cross:[[21,86,24,114,64,106],[79,86,76,112,36,102]],
 wave:[[21,86,13,110,17,132],[79,86,95,72,92,48]],
 cast:[[21,86,8,104,32,116],[79,86,92,104,68,116]],
 pray:[[21,86,24,114,47,102],[79,86,76,114,53,102]],
 guard:[[21,86,16,108,30,116],[79,86,88,110,86,132]],
 strike:[[21,86,6,106,30,124],[79,86,94,70,90,46]],
 aim:[[21,86,4,94,-8,96],[79,86,58,102,34,98]],
 crouch:[[21,86,6,108,16,126],[79,86,94,106,88,122]]};
const HLEGS={idle:[[40,134,38,160,37,184],[60,134,62,160,63,184]],wide:[[40,134,31,158,25,184],[60,134,69,158,75,184]],lunge:[[40,134,28,154,22,184],[60,134,66,160,76,184]],crouch:[[40,134,26,152,32,182],[60,134,74,152,68,182]]};
const POSEL={idle:'idle',hips:'idle',cross:'idle',wave:'idle',cast:'wide',pray:'idle',guard:'wide',strike:'lunge',aim:'lunge',crouch:'crouch'};
const LINE=(p,c,w)=>`<path d="M${p[0]} ${p[1]}Q${p[2]} ${p[3]} ${p[4]} ${p[5]}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
const LINE2=(p,c,w)=>`<path d="M${p[0]} ${p[1]}L${p[2]} ${p[3]}L${p[4]} ${p[5]}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
function heroBody(h,u=0){const key=h.i+'_'+u;if(BODYC[key])return BODYC[key];
  const raw=u>0&&h.r===4?ultraLook(LOOKS[h.i],u,h):LOOKS[h.i];const L=parseLook(raw),pose=poseOf(h),head=L.head||'human',T=u?uthOf(h):null;
  const back=[...L.back];const has=re=>back.find(b=>re.test(b));const take=re=>{const b=has(re);if(b)back.splice(back.indexOf(b),1);return b};
  const shieldB=pose==='guard'?take(/^shield/):null,bowB=pose==='aim'?take(/bow/):null,gunB=pose==='aim'&&!bowB?take(/musket|rifle/):null,melee=pose==='strike'?take(/sword|katana|axe|hammer|spear|scythe/):null;
  const robe=ROBEB.has(L.body),bare=BAREB.has(L.body),armor=/armor|heavy|scale|rocky/.test(L.body);
  const cloth=bare?L.sk:L.m,dark=shade(cloth,-.28),pants=robe?L.m:bare?L.s:shade(L.s,-.15),boot=armor?shade(L.s,-.25):'#3a2a1e',glove=armor?L.s:L.sk,sleeve=bare?L.sk:L.m;
  const A=ARMS[pose],LG=HLEGS[POSEL[pose]];let s='';
  /* aura et dos */
  if(T)s+=`<ellipse cx="50" cy="104" rx="${54+u*4}" ry="${92+u*4}" fill="${T.c}" opacity=".13"/><ellipse cx="50" cy="104" rx="${40+u*4}" ry="${78+u*4}" fill="${T.c2}" opacity=".12"/>`;
  if(h.r===4)s+=`<ellipse cx="50" cy="96" rx="58" ry="88" fill="${RCOL[4]}" opacity=".07"/>`;
  if(back.includes('cape'))s+=Pa('M14 88Q4 140 10 182Q50 192 90 182Q96 140 86 88Z',shade(L.a,-.3))+Pa('M20 88Q12 140 18 178Q50 186 82 178Q88 140 80 88Z',L.a);
  for(const b of back)if(b!=='cape'&&BACK[b])s+=BACK[b](L);
  if(L.hb&&HAIRB[L.hb])s+=HAIRB[L.hb](L);
  /* jambes */
  const legC=robe?shade(L.m,-.2):pants;
  for(const g of LG){s+=LINE(g,shade(legC,-.25),15.5)+LINE(g,legC,13);const fx=g[4],fy=g[5],dir=fx<50?-1:1;s+=`<path d="M${g[2]+(g[4]-g[2])*.55} ${g[3]+(g[5]-g[3])*.55}L${fx} ${fy}" stroke="${boot}" stroke-width="14" stroke-linecap="round"/>`+EL(fx+dir*4,fy+5,10,5,boot)+EL(fx+dir*2,fy+3,5,1.6,shade(boot,.25),'opacity=".6"')}
  /* torse */
  s+=Pa('M24 90Q22 112 29 133L71 133Q78 112 76 90Z',cloth)+Pa('M60 92Q70 112 66 133L71 133Q78 112 76 90Z',dark,'opacity=".55"');
  if(robe){s+=Pa(`M29 128Q20 160 ${pose==='crouch'?8:14} 186Q50 196 ${pose==='crouch'?92:86} 186Q80 160 71 128Z`,L.m)+Pa(`M${pose==='crouch'?8:14} 186Q50 196 ${pose==='crouch'?92:86} 186L${pose==='crouch'?90:85} 180Q50 190 ${pose==='crouch'?10:15} 180Z`,L.s)+Pa('M60 130Q72 160 80 184L86 186Q80 160 71 128Z',dark,'opacity=".5"')+SL('M50 134L50 186',shade(L.m,-.2),1.2,'opacity=".6"')}
  if(L.body==='bare'||L.body==='fur')s+=SL('M36 104Q50 110 64 104M40 116Q50 120 60 116',shade(L.sk,-.25),1.2);
  if(armor)s+=Pa('M32 96L68 96L66 122Q50 128 34 122Z',L.s,'opacity=".9"')+SL('M36 104Q50 108 64 104M37 113Q50 117 63 113',shade(L.s,-.3),1.2)+CI(50,108,2.6,L.a);
  else if(L.body==='suit')s+=Pa('M44 92L50 128L56 92Z','#f4f0e8')+CI(50,108,1.2,'#1a1418')+CI(50,116,1.2,'#1a1418');
  else if(L.body==='leather')s+=Pa('M28 98L72 124L70 130L26 104Z',L.s);
  else if(L.body==='apron')s+=Pa('M34 100L66 100L68 150L32 150Z',L.s);
  s+=Pa('M28 124L72 124L72 132L28 132Z',robe?L.a:shade(L.s,-.35))+`<rect x="45.5" y="122.5" width="9" height="11" rx="2" fill="${L.a}"/><rect x="48" y="125" width="4" height="6" rx="1" fill="${shade(L.a,-.4)}"/>`;
  /* buste du portrait (épaules) */
  s+=(BODY[L.body]||BODY.tunic)(L);
  /* bras */
  const arm=(p,back)=>{const c=back?shade(sleeve,-.18):sleeve;return LINE(p,shade(c,-.3),13.5)+LINE(p,c,11)+(armor?CI(p[0],p[1]+2,8,L.s)+CI(p[0]-2,p[1],2,L.a,'opacity=".8"'):'')+`<path d="M${(p[2]+(p[4]-p[2])*.7).toFixed(1)} ${(p[3]+(p[5]-p[3])*.7).toFixed(1)}L${p[4]} ${p[5]}" stroke="${bare?L.sk:shade(L.s,-.1)}" stroke-width="10" stroke-linecap="round"/>`};
  const hand=(x,y,c)=>CI(x,y,6,shade(c||glove,-.25))+CI(x-.6,y-.6,5,c||glove)+CI(x-2,y-2,1.4,'#fff','opacity=".35"');
  const [a1,a2]=A;let items='',front='';
  /* objets tenus */
  const HB={x:a2[4],y:a2[5]},HA={x:a1[4],y:a1[5]};
  if(pose==='strike'){const b=melee||'sword';const tipx=HB.x-6,tipy=HB.y-46;
    if(/spear|scythe/.test(b))items+=SL(`M${HB.x+4} ${HB.y+30}L${HB.x-8} ${HB.y-52}`,b==='scythe'?'#2a2a2a':WOOD,3)+(b==='scythe'?Pa(`M${HB.x-8} ${HB.y-52}Q${HB.x-38} ${HB.y-54} ${HB.x-50} ${HB.y-30}Q${HB.x-34} ${HB.y-46} ${HB.x-9} ${HB.y-44}Z`,'#c8d0c8'):Pa(`M${HB.x-11} ${HB.y-48}L${HB.x-10} ${HB.y-64}L${HB.x-5} ${HB.y-49}Z`,b==='spear-blood'?L.a:METAL));
    else if(/axe|hammer/.test(b))items+=SL(`M${HB.x+2} ${HB.y+12}L${HB.x-6} ${HB.y-40}`,WOOD,3.4)+(/hammer/.test(b)?`<rect x="${HB.x-18}" y="${HB.y-50}" width="24" height="13" rx="2" fill="#8a8f98" transform="rotate(-8 ${HB.x-6} ${HB.y-44})"/><rect x="${HB.x-8}" y="${HB.y-50}" width="5" height="13" fill="${L.a}" transform="rotate(-8 ${HB.x-6} ${HB.y-44})"/>`:Pa(`M${HB.x-6} ${HB.y-44}Q${HB.x+12} ${HB.y-54} ${HB.x+14} ${HB.y-30}Q${HB.x+6} ${HB.y-36} ${HB.x-4} ${HB.y-32}Z`,METAL)+(b==='axe-double'?Pa(`M${HB.x-6} ${HB.y-44}Q${HB.x-24} ${HB.y-50} ${HB.x-24} ${HB.y-28}Q${HB.x-16} ${HB.y-34} ${HB.x-7} ${HB.y-32}Z`,METAL):''));
    else{const wd=b==='greatsword'?6:b==='katana'?3:4.4;items+=`<path d="M${HB.x-1} ${HB.y-4}L${tipx} ${tipy}" stroke="${shade(METAL,-.25)}" stroke-width="${wd+1.6}" stroke-linecap="round"/><path d="M${HB.x-1} ${HB.y-4}L${tipx} ${tipy}" stroke="${b==='katana'?'#e8eef4':METAL}" stroke-width="${wd}" stroke-linecap="round"/>`+SL(`M${HB.x-1} ${HB.y-8}L${tipx+1} ${tipy+4}`,'#fff',.8,'opacity=".7"')+SL(`M${HB.x-10} ${HB.y-3}L${HB.x+9} ${HB.y-7}`,L.a,3.2)+SL(`M${HB.x} ${HB.y+2}L${HB.x+1} ${HB.y+9}`,WOOD,3)}
    items+=`<g opacity=".55">${SL(`M${tipx-10} ${tipy+6}Q${tipx-18} ${tipy+30} ${HB.x-20} ${HB.y+6}`,'#fff',1.4)}</g>`}
  if(pose==='guard'){const sh=shieldB;front+=`<g transform="translate(${HA.x-22} ${HA.y-62})">${sh&&BACK[sh]?BACK[sh](L):CI(22,62,17,L.s)+CI(22,62,17,'none',`stroke="${L.a}" stroke-width="2.4"`)+STAR(22,62,2.2,L.a)}</g>`}
  if(pose==='aim'){if(gunB)items+=`<path d="M${HB.x+6} ${HB.y+6}L${HA.x-14} ${HA.y-2}" stroke="#2a2f2a" stroke-width="4" stroke-linecap="round"/><path d="M${HB.x+6} ${HB.y+6}L${HB.x-10} ${HB.y+2}" stroke="${WOOD}" stroke-width="6.5" stroke-linecap="round"/>`+CI(HA.x-14,HA.y-2,1.6,L.a);
    else{const bc=bowB==='longbow'?L.s:bowB==='bow-star'?L.a:WOOD;items+=SL(`M${HA.x+4} ${HA.y-40}Q${HA.x-16} ${HA.y} ${HA.x+4} ${HA.y+40}`,bc,3.2)+SL(`M${HA.x+4} ${HA.y-40}L${HB.x} ${HB.y}L${HA.x+4} ${HA.y+40}`,'#f0f0f0',.7)+SL(`M${HB.x} ${HB.y}L${HA.x-14} ${HA.y}`,'#e8e0d0',1.2)+Pa(`M${HA.x-14} ${HA.y}L${HA.x-9} ${HA.y-2.6}L${HA.x-9} ${HA.y+2.6}Z`,L.a)}}
  if(pose==='cast'){const cx=50,cy=114;items+=CI(cx,cy,15,L.a,'opacity=".18"')+CI(cx,cy,10,L.a,'opacity=".35"')+CI(cx,cy,6,L.a)+CI(cx-2,cy-2,2,'#fff','opacity=".9"')+[0,1,2,3,4].map(k=>{const q=k*72*Math.PI/180;return STAR(cx+20*Math.cos(q),cy-6+14*Math.sin(q),1.1,'#fff','opacity=".85"')}).join('')}
  if(pose==='pray')items+=CI(50,100,16,'#fff6c0','opacity=".18"')+CI(50,100,9,'#fff6c0','opacity=".25"');
  if(pose==='crouch'){const dg=(x,y,r)=>`<g transform="rotate(${r} ${x} ${y})"><path d="M${x-1.6} ${y-2}L${x} ${y-18}L${x+1.6} ${y-2}Z" fill="${L.a==='#ffffff'?METAL:METAL}"/><rect x="${x-5}" y="${y-2.4}" width="10" height="2.4" rx="1" fill="${L.a}"/></g>`;items+=dg(HA.x,HA.y,-70)+dg(HB.x,HB.y,60)}
  if(pose==='wave')items+=SL(`M${HB.x+9} ${HB.y-6}Q${HB.x+13} ${HB.y} ${HB.x+9} ${HB.y+6}M${HB.x+13} ${HB.y-10}Q${HB.x+19} ${HB.y} ${HB.x+13} ${HB.y+10}`,'#fff',1.2,'opacity=".6"');
  /* ordre : bras arrière, objets, bras avant */
  if(pose==='cross'){s+=arm(a2,1)+hand(a2[4],a2[5])+arm(a1)+hand(a1[4],a1[5])}
  else{s+=arm(a1,1)+arm(a2)+items+hand(a1[4],a1[5])+hand(a2[4],a2[5])}
  /* tête (comme le portrait) */
  s+=`<rect x="44" y="56" width="12" height="16" fill="${L.sk}"/>`+Pa('M44 62Q50 66 56 62L56 67Q50 70 44 67Z',shade(L.sk,-.22));
  if(L.ear&&L.ear!=='cat'&&EARS[L.ear])s+=EARS[L.ear](L);
  s+=(HEAD[head]||HEAD.human)(L);
  const hidden=L.face.includes('raven');
  if((head==='human'||head==='orc'||head==='spirit')&&!hidden)s+=SL('M50 49L48.8 53.2L51 53.4',shade(L.sk,-.3),1);
  L.face.filter(f=>FX_UNDER.has(f)&&FX[f]).forEach(f=>s+=FX[f](L));
  if(L.hat!=='helm-visor'&&!hidden&&!L.face.includes('blindfold'))s+=EYES(L.eyes||'normal',L);
  if(L.hat!=='helm-visor'&&!hidden)s+=(MOUTH[L.mouth]||MOUTH.none)();
  L.face.filter(f=>!FX_UNDER.has(f)&&FX[f]).forEach(f=>s+=FX[f](L));
  if(L.hair&&HAIRF[L.hair]&&L.hat!=='helm-visor')s+=HAIRF[L.hair](L);
  if(L.ear==='cat'&&!/hood/.test(L.hat||''))s+=EARS.cat(L);
  if(L.hat&&HAT[L.hat])s+=HAT[L.hat](L);
  s+=front;
  if(L.prop&&PROP[L.prop]){const hx=pose==='guard'||pose==='aim'?HB:HA;if(pose!=='cross'&&pose!=='pray')s+=`<g transform="translate(${(hx.x-20).toFixed(1)} ${(hx.y-84).toFixed(1)})">${PROP[L.prop](L)}</g>`}
  if(T)[[6,40,2.2],[94,60,1.8],[10,140,1.6],[92,150,1.8],[50,-2,1.6]].slice(0,2+u).forEach(([x,y,r])=>{s+=STAR(x,y,r,'#fff','opacity=".9"')});
  const tilt=[-3,-1.5,0,1.5,3][ih(h.i*53+7)%5];
  const svg=`<svg class="hbsvg" viewBox="-22 -14 144 214" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${h.n.replace(/"/g,'')} en pied"><ellipse cx="50" cy="191" rx="40" ry="7" fill="#000" opacity=".35"/><g transform="rotate(${tilt} 50 190)">${s}</g></svg>`;
  return BODYC[key]=svg}
function slotBox(it,k){return it?`<span class="hvsl has r${it.r}" style="${rv(it.r)}" title="${esc(itemName(it))} · Nv ${it.l}">${itemArt(it.s,it.r)}<b>Nv ${it.l}</b></span>`:`<span class="hvsl" title="${SLOTS[k].n} : vide"><svg viewBox="0 0 24 24"><path d="${SLOTS[k].p}" fill="currentColor"/></svg></span>`}
function heroStage(h,u,gear,lvl,stars){const L=parseLook(LOOKS[h.i]),bg=BGS[L.bg]||[CLS[h.c].c,'#0b0819'];const g=gear||[];
  return`<div class="hvstage" style="--hb1:${bg[0]};--hb2:${bg[1]};${rv(h.r)}"><div class="hvrays"></div>
   <div class="hvcol">${[0,1,2].map(k=>slotBox(g[k],k)).join('')}</div>
   <div class="hvbody">${heroBody(h,u)}</div>
   <div class="hvcol">${[3,4].map(k=>slotBox(g[k],k)).join('')}<span class="hvpose">${POSEN[poseOf(h)]}</span></div>
   <div class="hvtag"><span class="tag" style="${rv(h.r)}">${RAR[h.r].n.toUpperCase()}</span> <span class="tag" style="--rc:${CLS[h.c].c}">${h.c.toUpperCase()}</span>${lvl?` <b class="hvlv">Nv ${lvl}</b>`:''}${stars?` <b class="hvst">${'★'.repeat(stars)}</b>`:''}${u?` <b class="ust">${'✦'.repeat(u)}</b>`:''}</div></div>`}
/* ma fiche héros : le héros en pied tout en haut */
{const hm=heroModal;heroModal=function(id){hm.apply(this,arguments);try{const m=$('#ovl .modal');if(!m||m.querySelector('.hvstage'))return;const h=HEROES[id],o=S.heroes[id];
  const gear=[0,1,2,3,4].map(k=>S.items.find(x=>x.eq===id&&x.s===k));const st=heroStage(h,o&&h.r===4?Math.min(3,o.u||0):0,o?gear:[],o?o.l:0,o&&h.r===4?o.e:0);
  const hd=m.querySelector('.hd');if(hd)hd.insertAdjacentHTML('beforebegin',st);else m.insertAdjacentHTML('afterbegin',st);m.classList.add('hvm')}catch(e){}}}
/* héros des autres joueurs, avec leur équipement */
function npcHeroGear(p,t){const h=roseH('gear'+(p.n||p.id)+':'+t.id),pw=p.pw||1000;let u=0;try{u=botU(p)}catch(e){}const lv=Math.log10(Math.max(1000,pw));
  const base=pw<2500?0:pw<9000?1:pw<30000?2:3,celP=pw<110000?0:Math.min(.95,.15+Math.log2(pw/110000)*.22+(u>.955?.25:0));
  return[0,1,2,3,4].map(s=>{const x=ih(h+s*977);if(pw<3000&&x%100<25)return null;let r=base;if(r<3&&x%100<35)r++;if(r===3&&((x>>>8)%100)/100<celP)r=4;if(u>.955&&r<3)r++;const mx=10+r*5;return{s,r,l:clamp(Math.round(mx*Math.min(1,(lv-3)/3.2)*(.75+((x>>>16)%26)/100)),1,mx)}})}
function gearOfRow(p,t){if(p.me)return[0,1,2,3,4].map(k=>S.items.find(x=>x.eq===t.id&&x.s===k)||null);
  if(p.real){const d=NET.players[p.pid];const g=d&&d.gear&&d.gear[t.id];return Array.isArray(g)?[0,1,2,3,4].map(k=>{const x=g.find(y=>y[0]===k);return x?{s:x[0],r:x[1],l:x[2]}:null}):null}
  return npcHeroGear(p,t)}
function rowTeamFull(p){const tm=teamOfRow(p).map(t=>({...t}));if(p.me)tm.forEach(t=>{t.u=(S.heroes[t.id]||{}).u||0});return tm}
function hvModal(pid,j){const p=pid==='me'?meRow():rowById(pid);if(!p)return;const tm=rowTeamFull(p),t=tm[j];if(!t)return;const h=HEROES[t.id];const u=h.r===4?Math.min(3,t.u||0):0;
  const gear=gearOfRow(p,t);const c=CLS[h.c],g=(1+.08*(t.l-1))*(1+.4*(t.e||0))*(1+.35*u)*RAR[h.r].m;let hp=500*c.hp*g,atk=60*c.atk*g,def=25*c.def*g,spd=c.spd+h.r*2+(t.e||0)*3+u*4;
  for(const it of gear||[])if(it){const st=itemStats(it);hp+=st.hp||0;atk+=st.atk||0;def+=st.def||0;spd+=st.spd||0}const ST={hp:Math.round(hp),atk:Math.round(atk),def:Math.round(def),spd:Math.round(spd)};
  const nav=tm.length>1?`<div class="hvnav"><button class="btn sm" data-a="hview" data-v="${esc(pid)}" data-j="${(j-1+tm.length)%tm.length}" aria-label="Héros précédent">‹</button><span>${j+1} / ${tm.length}</span><button class="btn sm" data-a="hview" data-v="${esc(pid)}" data-j="${(j+1)%tm.length}" aria-label="Héros suivant">›</button></div>`:'';
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button>
  <div class="hvhd"><button class="btn sm" data-a="prof" data-v="${esc(pid)}">← ${esc(p.n)}</button>${nav}</div>
  ${heroStage(h,u,gear||[],t.l,h.r===4?t.e:0)}
  <div class="h" style="margin:10px 0 2px;text-align:center">${h.n}</div><div class="muted" style="text-align:center;font-size:12.5px">Héros de ${esc(p.n)} · puissance ${fmt(power(ST))}</div>
  <div class="stats" style="margin-top:10px"><div class="stat"><span>PV</span><b>${fmt(ST.hp)}</b></div><div class="stat"><span>ATQ</span><b>${fmt(ST.atk)}</b></div><div class="stat"><span>DÉF</span><b>${fmt(ST.def)}</b></div><div class="stat"><span>VIT</span><b>${ST.spd}</b></div></div>
  <div class="h3" style="margin-top:12px">Équipement</div>${gear?`<div class="list" style="gap:4px">${[0,1,2,3,4].map(k=>{const it=gear[k];return`<div class="mrow" style="cursor:default"><span class="hvsl sm ${it?'has r'+it.r:''}" style="${it?rv(it.r):''}">${it?itemArt(it.s,it.r):`<svg viewBox="0 0 24 24"><path d="${SLOTS[k].p}" fill="currentColor"/></svg>`}</span><span>${it?esc(itemName(it)):SLOTS[k].n+' · <i class="muted">vide</i>'}</span><b class="num">${it?'Nv '+it.l:''}</b></div>`}).join('')}</div>`:'<p class="muted">Ce joueur n\'a pas encore partagé son équipement.</p>'}
  <div class="skill" style="margin-top:10px"><div class="sn">${h.sk.n}</div><div style="margin-top:4px">${skillDesc(h.sk,1+.25*(t.e||0))}</div></div>`);
  const m=$('#ovl .modal');if(m)m.classList.add('hvm')}
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{const m=$('#ovl .modal');if(!m)return;m.querySelectorAll('.pteam .ptile').forEach((el,i)=>{el.setAttribute('data-a','hview');el.setAttribute('data-v',id);el.setAttribute('data-j',i);el.setAttribute('role','button');el.setAttribute('tabindex','0');el.setAttribute('aria-label','Voir ce héros en détail');el.classList.add('hvt')});
  const h3=[...m.querySelectorAll('.h3')].find(x=>x.textContent.trim()==='Équipe');if(h3&&!h3.querySelector('small'))h3.insertAdjacentHTML('beforeend',' <small class="muted" style="font-size:11.5px;font-weight:700">· touche un héros pour le voir</small>')}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="hview"]');if(!t)return;hvModal(t.dataset.v,+t.dataset.j||0)});
/* équipement partagé pour les vrais joueurs */
let gearPushK='';
setInterval(()=>{try{if(!NET.on||!NET.canWrite||!NET.pid||!S.name)return;const ids=teamIdsFor('pvp');const gear={};for(const id of ids)gear[id]=S.items.filter(x=>x.eq===id).map(x=>[x.s,x.r,x.l]);const k=JSON.stringify(gear);if(k===gearPushK)return;gearPushK=k;NET.db.doc('players/'+NET.pid).update({gear}).catch(()=>{gearPushK=''})}catch(e){}},20000);

PATCH.unshift({v:22,d:'14 octobre 2026',t:'Mode Normal et héros en pied',items:[
 "⚔️ <b>Mode Normal</b> : 100 nouvelles étapes, bien plus dures, débloquées après les 100 étapes du mode Facile. Change de difficulté avec les petites flèches ‹ › au-dessus des mondes (ou en glissant le doigt sur la bannière).",
 "💎 Récompenses du Normal : plus d'or, 30 gemmes par 1re victoire (150 sur les boss), 2 éclats légendaires par boss et du meilleur équipement.",
 "🧍 <b>Héros en pied</b> : touche un héros pour le voir en entier, avec sa propre pose (en garde, à l'assaut, incantation, en joue, prière, à l'affût…) et son équipement autour de lui. Les formes ultra ont leur aura.",
 "👀 <b>Héros des autres joueurs</b> : dans le profil d'un joueur, touche un héros de son équipe pour le voir en pied avec son niveau, ses étoiles, ses stats et tout son équipement. Flèches pour passer d'un héros à l'autre."]});
