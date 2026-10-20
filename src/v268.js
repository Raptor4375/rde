
/* ================= V26.3 : la Capitale d'Éther, bilan de guerre, Fortuna ultra, foudre ultra, portraits détaillés ================= */
/* ---------- portraits plus détaillés ---------- */
function portraitDeco(h,svg,tag){if(typeof svg!=='string'||svg.indexOf('</svg>')<0||svg.indexOf('data-deco')>=0)return svg;
  const R=rng(h.i*313+(tag||0)*7+11),c=(CLS[h.c]||{}).c||'#8a7aff',rc=RCOL[h.r]||'#ffd84a',id='pdc'+h.i+'_'+(tag||0);
  let L=parseLook(LOOKS[h.i]);const acc=L.a||rc;
  let d=`<g data-deco="1"><defs><radialGradient id="${id}v" cx="50%" cy="42%" r="70%"><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".42"/></radialGradient><linearGradient id="${id}l" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".2"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/></linearGradient></defs>`;
  d+=`<path d="M10 99Q14 75 50 71Q86 75 90 99" fill="none" stroke="${acc}" stroke-width="1.4" opacity=".7"/><path d="M14 99Q18 79 50 75Q82 79 86 99" fill="none" stroke="${acc}" stroke-width=".8" stroke-dasharray="1.4 2" opacity=".6"/>`;
  d+=`<circle cx="50" cy="73" r="2.6" fill="${acc}" stroke="#140c24" stroke-width=".8"/><circle cx="49.3" cy="72.3" r=".8" fill="#fff" opacity=".9"/>`;
  for(let k=0;k<(h.r>=4?9:h.r>=3?7:4);k++){const side=k%2?1:-1,x=50+side*(30+R()*16),y=8+R()*58,s=.7+R()*1.1;d+=`<path d="M${x.toFixed(1)} ${(y-s*2.4).toFixed(1)}L${(x+s*.6).toFixed(1)} ${(y-s*.6).toFixed(1)}L${(x+s*2.4).toFixed(1)} ${y.toFixed(1)}L${(x+s*.6).toFixed(1)} ${(y+s*.6).toFixed(1)}L${x.toFixed(1)} ${(y+s*2.4).toFixed(1)}L${(x-s*.6).toFixed(1)} ${(y+s*.6).toFixed(1)}L${(x-s*2.4).toFixed(1)} ${y.toFixed(1)}L${(x-s*.6).toFixed(1)} ${(y-s*.6).toFixed(1)}Z" fill="${k%3?c:'#fff'}" opacity="${(.45+R()*.45).toFixed(2)}"/>`}
  d+=`<rect width="100" height="100" fill="url(#${id}l)"/><rect width="100" height="100" fill="url(#${id}v)"/>`;
  if(h.r>=3){const col=h.r>=4?'#ffd84a':'#c8a0ff';for(const [x,y,sx,sy] of [[3,3,1,1],[97,3,-1,1],[3,97,1,-1],[97,97,-1,-1]])d+=`<path d="M${x} ${y+sy*12}L${x} ${y}L${x+sx*12} ${y}M${x+sx*3} ${y+sy*7}Q${x+sx*3} ${y+sy*3} ${x+sx*7} ${y+sy*3}" fill="none" stroke="${col}" stroke-width="1.3" opacity=".85"/><circle cx="${x+sx*3}" cy="${y+sy*3}" r="1.3" fill="${col}"/>`;
    if(h.r>=4)d+=`<rect x="2" y="2" width="96" height="96" rx="3" fill="none" stroke="#ffd84a" stroke-width=".7" opacity=".55"/>`}
  d+='</g>';const k=svg.lastIndexOf('<circle cx="86" cy="84" r="11"');return k>0?svg.slice(0,k)+d+svg.slice(k):svg.replace(/<\/svg>\s*$/,d+'</svg>')}
try{for(const h of HEROES){const b=P0(h);PCACHE[h.i]=portraitDeco(h,b,0);if(h.r===4)for(const u of[1,2,3]){try{const s=portraitU(h,u);PCACHE['U'+u+'_'+h.i]=portraitDeco(h,s,u)}catch(e){}}}
  for(const k of Object.keys(PIMG))if(/^[PB]/.test(k))delete PIMG[k];for(const k of Object.keys(UPI))delete UPI[k]}catch(e){console.warn('deco',e)}
/* ---------- foudre ultra : les effets qui touchent les ennemis font de vrais dégâts ---------- */
/* ---------- Fortuna ultra : la Roulette Céleste ---------- */
async function ultraCasino(u){const ux=Math.min(3,u.ux||1);
  const w=[18,18,16,14+ux*6+(u.evo||0)*3,8+ux*2,Math.max(2,10-ux*3)],tw=w.reduce((a,b)=>a+b,0);
  const roll=()=>{let r=Math.random()*tw;for(let k=0;k<6;k++){if((r-=w[k])<0)return SYM[k]}return SYM[0]};
  const R=[roll(),roll(),roll(),roll(),roll()],jok=R.filter(x=>x==='🃏').length;
  let best=null,bc=0;for(const s of['7','💎','🔔','🍒','💀']){const c=R.filter(x=>x===s).length;if(!c)continue;if(c+jok>bc){bc=c+jok;best=s}}if(!best){best='7';bc=5}
  let label;if(best==='7'&&bc>=4)label='MÉGA JACKPOT !';else if(best==='7'&&bc===3)label='JACKPOT !';else if(best==='💀'&&bc>=3)label='BANQUEROUTE…';else if(bc>=4)label='CARRÉ !';else if(bc===3)label='TRIPLÉ !';else if(bc===2&&best!=='💀')label='PAIRE';else label='MAUVAISE MAIN';
  const mul=1+.25*ux,sc=u.scale*mul;
  if(!B.skip)await showSlotU(R,label,u);
  log(`🎰✦ ${R.join(' ')} — <b>${label}</b> (Roulette Céleste ×${mul.toFixed(2).replace('.',',')})`,'cs');
  B.pend=B.skip?null:[];const foes=alive(1-u.side);
  if(label==='MÉGA JACKPOT !'){if(u.side===0)S.stats.jack=(S.stats.jack||0)+1;foes.forEach(t=>{deal(u,t,1200*sc,{sk:1});if(t.hp>0)t.stun=1});alive(u.side).forEach(a=>{a.buff=Math.max(a.buff,70);a.buffT=3;a.en=Math.min(100,a.en+30)})}
  else if(label==='JACKPOT !'){if(u.side===0)S.stats.jack=(S.stats.jack||0)+1;foes.forEach(t=>{deal(u,t,800*sc,{sk:1});if(t.hp>0)t.stun=1});alive(u.side).forEach(a=>{a.buff=Math.max(a.buff,50);a.buffT=2})}
  else if(label==='BANQUEROUTE…'){const l=Math.round(u.max*.15);u.hp=Math.max(1,u.hp-l);float(u,'−'+fmt(l),'dmg');alive(u.side).forEach(a=>{if(a!==u)a.en=Math.min(100,a.en+60)});log('La maison gagne… mais la forme ultra amortit la perte.')}
  else if(label==='CARRÉ !')foes.forEach(t=>deal(u,t,600*sc,{sk:1}));
  else if(label==='TRIPLÉ !')foes.forEach(t=>deal(u,t,400*sc,{sk:1}));
  else if(label==='PAIRE')foes.forEach(t=>deal(u,t,220*sc,{sk:1}));
  else{deal(u,pickT(u),160*sc,{sk:1});u.en=50}
  /* pluie de jetons dorés : chaque jeton qui explose sur un ennemi fait des dégâts */
  let rain=0;if(label!=='BANQUEROUTE…'){const pct=[0,60,85,110][ux];for(const t of alive(1-u.side))rain+=deal(u,t,pct*u.scale,{sk:1,ub:1});log(`🪙 Pluie de jetons célestes : +${fmt(rain)} dégâts`,'sk')}
  if(!B.skip&&!REDUCED){fxSetup();const T=uxT(u),a=uc(u),hit=alive(1-u.side);const big=/JACKPOT/.test(label);
    if(big){fxTint('#ffd84a',800,.45);burst(a.x,a.y,['#ffd84a','#fff6c0','#ff8f3f'],70,6,3.6,64,.12);flash('#fff6c0',300,.55)}
    for(let k=0;k<(big?40:22);k++)setTimeout(()=>{if(!B||!FXS.ctx)return;shapes(rnd(0,FXS.w),-10,'coin',['#ffd84a','#ffe58a'],1,2,6,70,.32,{ang:Math.PI/2,spread:.3})},k*25);
    await fxWait(380);for(const t of hit){const b=uc(t);boltFx({x:b.x+rnd(-30,30),y:-10},b,'#ffd84a',420,5);boltFx({x:b.x+rnd(-30,30),y:-10},b,T.c,420,3);setTimeout(()=>{if(!B||!FXS.ctx)return;burst(b.x,b.y,['#ffd84a','#ffffff',T.c],24,4.5,3,40,.1);shapes(b.x,b.y,'coin',['#ffd84a'],10,5,5,40,.25);ringFx(b.x,b.y,'#ffd84a',b.s*.7,420,4)},200)}
    await fxWait(420);const m=rowMid(1-u.side);textPop(m.x,m.y-m.s*.3,big?label.replace(' !',''):'ULTRA !','#ffd84a',big?44:36,1100);shake(big?3:2)}
  if(!B)return;flushFloats()}
function showSlotU(R,label,u){return new Promise(res=>{const host=document.querySelector('#battle .bw');if(!host)return res();const T=uxT(u),sp=S.speed||1;const m=document.createElement('div');m.className='slotu';m.style.cssText=`--c1:${T.c};--c2:${T.c2}`;
  let coins='';for(let k=0;k<26;k++)coins+=`<i style="left:${(Math.random()*100).toFixed(1)}%;animation-delay:${(Math.random()*1.6).toFixed(2)}s;animation-duration:${(1.2+Math.random()*1.2).toFixed(2)}s">🪙</i>`;
  m.innerHTML=`<div class="su-rays"></div><div class="su-coins">${coins}</div><div class="su-box"><div class="su-crown">♛</div><div class="su-tt">✦ Roulette Céleste ✦</div><div class="su-sub">Fortuna · forme ultra ${ROM[Math.min(3,u.ux||1)]}</div><div class="su-reels">${R.map(()=>'<div class="su-reel"><span>?</span></div>').join('')}</div><div class="su-res"></div><div class="su-bulbs">${'<b></b>'.repeat(14)}</div></div>`;
  host.appendChild(m);const reels=[...m.querySelectorAll('.su-reel span')],stop=R.map(()=>0);
  const iv=setInterval(()=>reels.forEach((r,k)=>{if(!stop[k])r.textContent=pick(SYM)}),55);
  R.forEach((v,k)=>setTimeout(()=>{stop[k]=1;reels[k].textContent=v;reels[k].parentNode.classList.add('stop',v==='7'?'seven':'nx');try{SND.thud(AU.F.dry,NOW(),.6)}catch(e){}},(420+k*260)/sp));
  const end=(420+R.length*260)/sp;
  setTimeout(()=>{clearInterval(iv);const r=m.querySelector('.su-res');r.textContent=label;m.classList.add(/JACKPOT/.test(label)?'jack':label==='BANQUEROUTE…'?'bust':'win');try{sfxSlot(/JACKPOT/.test(label)?'JACKPOT !':label==='BANQUEROUTE…'?'BANQUEROUTE…':label==='PAIRE'?'PAIRE':'TRIPLÉ !',sp)}catch(e){}},end);
  setTimeout(()=>{m.classList.add('out');setTimeout(()=>{m.remove();res()},260)},end+1200/sp)})}
{const c0=casino;casino=async function(u){if(u&&u.ux>0)return ultraCasino(u);return c0.apply(this,arguments)}}
/* ---------- fin de guerre : résultat figé, partagé par tous ---------- */
const AVFIN={d:null,t:0,busy:0};
async function avFinalLoad(){try{if(!NET.on||!NET.db)return;const s=await NET.db.doc('avwar/final').get();if(s.exists){AVFIN.d=s.data();AVFIN.t=Date.now();return}
  if(avPhase()!=='end'||!NET.canWrite||!AVPD.t||!Object.keys(NET.guilds||{}).length||AVFIN.busy)return;AVFIN.busy=1;
  const T=avTotals(),f=T.ange===T.demon?'ange':T.ange>T.demon?'ange':'demon',L=avGuildDmgList(),cg=L.filter(g=>g.f===f)[0]||L[0]||null,n=avCount();
  const d={f,pa:Math.round(T.ange),pd:Math.round(T.demon),ka:n.ange,kd:n.demon,gid:cg?cg.gid:null,gn:cg?cg.n:null,gdmg:cg?Math.round(cg.dmg):0,top:L.slice(0,5).map(g=>({gid:g.gid,n:g.n,f:g.f,dmg:Math.round(g.dmg)})),t:Date.now()};
  const s2=await NET.db.doc('avwar/final').get();if(!s2.exists){await NET.db.doc('avwar/final').set(d);AVFIN.d=d}else AVFIN.d=s2.data();AVFIN.t=Date.now()}catch(e){}finally{AVFIN.busy=0}}
setTimeout(avFinalLoad,15000);setInterval(()=>{if(avPhase()!=='vote'&&avPhase()!=='prep'&&avPhase()!=='war')avFinalLoad()},120000);
function capOwner(){const d=AVFIN.d;if(d&&d.gid)return{gid:d.gid,n:d.gn||(NET.guilds[d.gid]||{}).n||'Guilde',f:d.f};if(avPhase()==='end'||avPhase()==='off'){const g=avCapGuild();return g?{gid:g.gid,n:g.n,f:g.f}:null}return null}
function capMine(){const o=capOwner();return!!(o&&S.rgid&&o.gid===S.rgid)}
/* bonus de la capitale : +25 % d'or et d'XP de pass pour la guilde qui la tient */
{const gm=goldMul;goldMul=function(){return gm.apply(this,arguments)*(capMine()?1.25:1)}}
{const pa=passAdd;passAdd=function(x){return pa.call(this,capMine()?Math.round(x*1.25):x)}}
/* ---------- bilan de la guerre ---------- */
function avRecap(){const d=AVFIN.d,T=avTotals(),A=AVS(),f=avMyFac(),o=capOwner();const w=d?d.f:(T.ange>=T.demon?'ange':'demon');const n=avCount();
  const pa=d?d.pa:Math.round(T.ange),pd=d?d.pd:Math.round(T.demon),ka=d?d.ka:n.ange,kd=d?d.kd:n.demon;
  const L=d&&d.top&&d.top.length?d.top:avGuildDmgList().slice(0,5);const mine=Object.values(A.dm||{}).reduce((a,b)=>a+b,0)+(A.dmc||0);
  const P=[];try{const B0=avBotSim();for(const p of Object.values(B0.P))P.push(p);for(const p of AVPD.docs){const v=Object.values(p.dm||{}).reduce((a,b)=>a+(+b||0),0)+(+p.dmc||0);if(v)P.push({n:p.n,f:p.f,dmg:v,real:1})}if(mine)P.push({n:S.name||'Toi',f,dmg:mine,me:1});const c=CLST.d;if(c){const v=Object.values(c.dm||{}).reduce((a,b)=>a+(+b||0),0);if(v)P.push({n:'Claude',f:clFac(),dmg:v,cl:1})}}catch(e){}
  P.sort((a,b)=>b.dmg-a.dmg);const myR=P.findIndex(p=>p.me)+1;const tot=Math.max(1,pa+pd);
  return`<div class="card avrecap ${w}"><div class="avrc-hd"><span class="avrc-cr">👑</span><div><div class="h" style="margin:0">Bilan de la Guerre des Cieux</div><div class="muted" style="font-size:12.5px">15 → 18 octobre 2026 · ${AVF[w].ic} victoire des ${AVF[w].n}</div></div></div>
   <div class="avrc-score"><div class="a"><b>😇 ${fmt(pa)}</b><small>${ka} royaume${ka>1?'s':''}</small></div><div class="avtally big"><i class="a" style="width:${pa/tot*100}%"></i><i class="d" style="width:${pd/tot*100}%"></i></div><div class="d"><b>${fmt(pd)} 😈</b><small>${kd} royaume${kd>1?'s':''}</small></div></div>
   ${o?`<div class="avrc-cap">🏰 La Capitale d'Éther revient à <b>${esc(o.n)}</b> ${AVF[o.f]?AVF[o.f].ic:''}, guilde n°1 en dégâts du camp vainqueur. Ses membres gagnent <b>+25 % d'or</b> et <b>+25 % d'XP de pass</b> jusqu'à la prochaine guerre.${capMine()?' <b>C\'est ta guilde, bravo !</b>':''}</div>`:''}
   <div class="avrc-cols"><div><div class="avlt">Guildes</div>${L.map((g,i)=>`<div class="avlr ${g.gid===S.rgid?'me':''}"><b class="avlp">${i+1}</b><span class="avln">${AVF[g.f]?AVF[g.f].ic:''} ${esc(g.n||'Guilde')}${o&&o.gid===g.gid?' 👑':''}</span><span class="avlv">${fmt(g.dmg)}</span></div>`).join('')}</div>
   <div><div class="avlt">Combattants</div>${P.slice(0,5).map((p,i)=>`<div class="avlr ${p.me?'me':''}"><b class="avlp">${i+1}</b><span class="avln">${AVF[p.f]?AVF[p.f].ic:''} ${esc(p.n)}${p.cl?' <i class="cltag">🤖 IA</i>':''}</span><span class="avlv">${fmt(p.dmg)}</span></div>`).join('')}</div></div>
   ${f?`<div class="avrc-me">Toi : ${AVF[f].ic} ${AVF[f].n} · <b>${fmt(A.pts)}</b> points · <b>${fmt(mine)}</b> dégâts${myR?` · ${myR}e combattant`:''} · niveaux ${A.lv}/15</div>`:''}
   <button class="btn p avrc-go" data-a="caphall">🏰 Entrer dans la Capitale</button></div>`}
{const ap=avPage;avPage=function(){const ph=avPhase();if((ph==='end'||ph==='off')&&UI.capHall)return capHallPage();const h=ap.apply(this,arguments);if(ph!=='end')return h;const i=h.indexOf('<div class="card avend');const rc=avRecap();return i>0?h.slice(0,i)+rc+h.slice(i):h+rc}}
/* ---------- la fête foraine : la capitale au loin remplace la bataille ---------- */
function avSkyBattle(){const ph=avPhase();return ph==='end'||ph==='off'?avSkyCapital():avSkyBattleWar()}
function avSkyCapital(){const o=capOwner(),fc=o&&o.f==='demon'?'#c03aff':'#ffd84a',fc2=o&&o.f==='demon'?'#3a0a4a':'#fff3c0';const OL='stroke="#140c24" stroke-width="1"';
  let t='';const tower=(x,y,w,hh,cap)=>`<rect x="${x-w/2}" y="${y-hh}" width="${w}" height="${hh}" fill="url(#avcpw)" ${OL}/><path d="M${x-w/2-2} ${y-hh}L${x} ${y-hh-cap}L${x+w/2+2} ${y-hh}Z" fill="url(#avcpr)" ${OL}/><rect x="${x-1.2}" y="${y-hh*.6}" width="2.4" height="4" rx="1" fill="#ffe680"/><path d="M${x} ${y-hh-cap}v-7" stroke="#140c24" stroke-width=".8"/><path d="M${x} ${y-hh-cap-7}l7 2.2l-7 2.2Z" fill="${fc}"/>`;
  t+=tower(-34,6,10,30,12)+tower(34,6,10,30,12)+tower(-18,2,12,44,16)+tower(18,2,12,44,16)+tower(0,-2,16,62,22);
  return`<g class="lbcap" transform="translate(200 78)"><defs><linearGradient id="avcpw" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#fff8e8"/><stop offset="1" stop-color="#c8bce0"/></linearGradient><linearGradient id="avcpr" x1="0" x2="1"><stop offset="0" stop-color="${fc}"/><stop offset="1" stop-color="${fc2}"/></linearGradient><radialGradient id="avcpg"><stop offset="0" stop-color="${fc}" stop-opacity=".55"/><stop offset="1" stop-color="${fc}" stop-opacity="0"/></radialGradient></defs>
   <ellipse class="lbcapg" cx="0" cy="-20" rx="80" ry="60" fill="url(#avcpg)"/>
   <g class="lbcapf"><path d="M-52 14Q-40 30 0 34Q40 30 52 14Z" fill="#8a7a9a" ${OL}/><path d="M-30 30L-22 46L-12 32M6 34L12 52L18 34" fill="#6a5a7a" ${OL}/>
   <rect x="-48" y="2" width="96" height="14" fill="url(#avcpw)" ${OL}/>${[...Array(12)].map((_,k)=>`<rect x="${-48+k*8}" y="-1" width="5" height="4" fill="#f4ecf8" ${OL}/>`).join('')}
   ${t}<path d="M-8 16v-10q8 -8 16 0v10Z" fill="#3a2a5a" ${OL}/>
   <ellipse cx="-40" cy="22" rx="24" ry="7" fill="#fff" opacity=".9"/><ellipse cx="38" cy="24" rx="26" ry="7" fill="#fff" opacity=".9"/><ellipse cx="0" cy="30" rx="30" ry="6" fill="#f4f0ff" opacity=".85"/></g>
   ${[...Array(7)].map((_,k)=>`<circle class="lbcaps" cx="${-60+k*20}" cy="${-50+(k%3)*14}" r="1.4" fill="#fff" style="animation-delay:${k*.4}s"/>`).join('')}</g>`}
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);const ph=avPhase();if(ph==='end'||ph==='off'){const a=P.find(p=>p.k==='av');if(a){a.n="Capitale d'Éther";a.sn='Capitale';a.ic='🏰';a.d='Bilan de la guerre et salle du trône'}}return P}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="lzg"][data-t="event"][data-v="av"],[data-a="caphall"]');if(!t)return;const ph=avPhase();if(t.dataset.a==='caphall'){e.preventDefault();e.stopPropagation();UI.capHall=true;TAB='event';UI.lz=UI.lz||{};UI.lz.event='av';UI.evt='av';render();window.scrollTo(0,0);return}if(ph==='end'||ph==='off')UI.capHall=false},true);
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="capback"]');if(!t)return;e.preventDefault();e.stopPropagation();UI.capHall=false;render();window.scrollTo(0,0)},true);
/* ---------- la salle du trône ---------- */
const CAPH={docs:[],t:0};
async function capHallLoad(){try{if(!NET.on||!NET.db)return;const s=await NET.db.collection('caphall').get();CAPH.docs=s.docs.map(x=>({id:x.id,...x.data()}));CAPH.t=Date.now()}catch(e){}}
setTimeout(capHallLoad,7000);setInterval(()=>{if(UI.capHall&&TAB==='event')capHallLoad().then(()=>{if(UI.capHall&&TAB==='event'&&!B&&!$('#ovl').innerHTML&&!chatBusy())render()})},90000);
const CAP_LINES=["Bienvenue dans NOTRE capitale 👑","On l'a méritée celle-là 💪","Qui veut visiter le trésor ? 😏","Prochaine guerre, on garde la capitale !","Le trône est confortable ? 😄","Gloire à la guilde !","J'ai fait 3 assauts sur le Gouffre Cendré, ça valait le coup","Bonus d'or activé, je farm 💰","Silence, le chef médite sur son trône 🤫","Faut qu'on décore le hall un peu plus","On fait un raid après ?","Merci à tous pour la guerre ❤️"];
function capEntry(pid){return CAPH.docs.find(d=>d.id===pid)||null}
function capFig(o){const h=HEROES[o.h]||HEROES[0];return`<img alt="" src="${btImg(h.i,o.u||0)}">`}
function capHallPage(){const o=capOwner();const back=`<button class="btn sm" data-a="capback">← Bilan de la guerre</button>`;
  if(!o)return`<div class="stack">${back}<div class="card"><div class="h3" style="margin:0">🏰 La capitale n'a pas encore de maître</div><p class="muted">Le résultat de la guerre arrive dans quelques instants…</p></div></div>`;
  const d=NET.guilds[o.gid]||{},blk=Math.floor(Date.now()/(20*60000)),R=rng(blk*31+7);
  const bots=(d.bots||[]).map(b=>({k:'b:'+b.id,n:b.n,h:(b.team&&b.team[0]!=null?b.team[0]:0),u:0,bot:b}));
  bots.forEach(x=>{try{const r=botRows().find(r=>r.bid===x.bot.id&&r.gidr===o.gid);if(r){const tm=teamOfRow(r);x.u=(tm[0]&&tm[0].u)||0}}catch(e){}});
  const reals=[];try{for(const r of realMembers(o.gid)){const e=capEntry(r.pid);reals.push({k:r.pid,n:r.n,h:e&&HEROES[e.h]?e.h:teamHid(r),u:e?e.u||0:0,msg:e&&e.msg})}}catch(e){}
  if(S.rgid===o.gid&&NET.pid){const e=capEntry(NET.pid);reals.push({k:NET.pid,n:S.name||'Toi',h:e&&HEROES[e.h]?e.h:(S.team[0]??0),u:e?e.u||0:((S.heroes[e&&e.h!=null?e.h:(S.team[0]??0)]||{}).u||0),msg:e&&e.msg,me:1})}
  const all=[...reals,...bots];const lk=d.leader||'';const isLead=x=>x.k===lk||('bot:'+String(x.k).slice(2))===lk;
  let king=all.find(isLead)||reals[0]||bots[0];const rest=all.filter(x=>x!==king);
  const mine=rest.find(x=>x.me);let pool=rest.filter(x=>!x.me);for(let i=pool.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[pool[i],pool[j]]=[pool[j],pool[i]]}
  const shown=[...(mine?[mine]:[]),...pool].slice(0,6);shown.forEach(x=>{if(x.bot&&!x.msg&&R()<.5)x.msg=CAP_LINES[Math.floor(R()*CAP_LINES.length)]});
  const SP=[[18,80],[82,80],[31,66],[69,66],[12,97],[88,97]];
  const figs=shown.map((x,i)=>{const [l,t]=SP[i];return`<div class="chf ${i%2?'r':'l'}" style="left:${l}%;top:${t}%;z-index:${t}">${x.msg?`<div class="chb2">${esc(String(x.msg).slice(0,60))}</div>`:''}${capFig(x)}<span class="chn">${esc(x.n)}${x.me?' (toi)':''}</span></div>`}).join('');
  const kingH=king?`<div class="chking">${king.msg?`<div class="chb2 k">${esc(String(king.msg).slice(0,60))}</div>`:''}<div class="chcrown">👑</div>${capFig(king)}<span class="chn k">${esc(king.n)}${king.me?' (toi)':''} · ${king.me||String(king.k)===NET.pid?'Ta Majesté':'Souverain'}</span></div>`:'';
  const member=S.rgid===o.gid&&NET.on;
  return`<div class="stack">${back}
   <div class="card chhd"><div class="h" style="margin:0">🏰 Salle du trône</div><div class="muted" style="font-size:12.5px">Capitale d'Éther · tenue par <b>${esc(o.n)}</b> ${AVF[o.f]?AVF[o.f].ic:''} · les membres présents changent toutes les 20 minutes</div></div>
   <div class="chall ${o.f||'ange'}">${capHallSVG(o)}${kingH}${figs}</div>
   <div class="card capbuff">👑 <b>Bonus de la capitale</b> : +25 % d'or et +25 % d'XP de pass pour tous les membres de <b>${esc(o.n)}</b>.${capMine()?' <b>Actif pour toi !</b>':''}</div>
   ${member?capMyCard():`<div class="card muted" style="font-size:13px">Tu visites la capitale. Seuls les membres de ${esc(o.n)} peuvent choisir leur héros et laisser un message dans le hall.</div>`}</div>`}
function capMyCard(){const e=capEntry(NET.pid)||{};const cur=e.h!=null&&HEROES[e.h]?e.h:(S.team[0]??0);const owned=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]).sort((a,b)=>HEROES[b].r-HEROES[a].r||S.heroes[b].l-S.heroes[a].l);
  return`<div class="card"><div class="h3" style="margin:0">✨ Ma place dans le hall</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Choisis le héros qui te représente dans la salle du trône et laisse un petit message si tu veux (60 caractères max).</p>
   <div class="chpick">${owned.map(i=>`<button class="chp ${i===cur?'on':''}" data-a="cappick" data-v="${i}" style="${rv(HEROES[i].r)}" title="${esc(HEROES[i].n)}">${portraitAt(HEROES[i],HEROES[i].r===4?Math.min(3,(S.heroes[i]||{}).u||0):0)}</button>`).join('')}</div>
   <form class="row chatf" data-f="capmsg" style="margin-top:10px"><input class="tx" id="capmsg" maxlength="60" placeholder="Ton message dans le hall (facultatif)" value="${esc(e.msg||'')}" autocomplete="off"><button class="btn p" type="submit">Enregistrer</button></form></div>`}
async function capSave(patch){if(!NET.on||!NET.canWrite||!NET.pid)return toast("Impossible d'enregistrer pour le moment.");const e=capEntry(NET.pid)||{};const d={n:S.name||'Voyageur',g:S.rgid||null,h:e.h!=null?e.h:(S.team[0]??0),msg:e.msg||'',t:Date.now(),...patch};d.u=HEROES[d.h]&&HEROES[d.h].r===4?Math.min(3,(S.heroes[d.h]||{}).u||0):0;
  try{await NET.db.doc('caphall/'+NET.pid).set(d);const i=CAPH.docs.findIndex(x=>x.id===NET.pid);if(i>=0)CAPH.docs[i]={id:NET.pid,...d};else CAPH.docs.push({id:NET.pid,...d});render();toast('Hall mis à jour ✨')}catch(e){toast("Le hall n'a pas pu être mis à jour.")}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="cappick"]');if(!t)return;e.preventDefault();e.stopPropagation();capSave({h:+t.dataset.v})},true);
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-f="capmsg"]');if(!f)return;e.preventDefault();const i=$('#capmsg');capSave({msg:String(i?i.value:'').trim().slice(0,60)})});
function capHallSVG(o){const fc=o.f==='demon'?'#c03aff':'#ffd84a',fc2=o.f==='demon'?'#5a1a8a':'#c8901a',tag=(()=>{try{return gTag('r:'+o.gid)||''}catch(e){return''}})();
  let pil='';for(const x of [40,110,290,360])pil+=`<rect x="${x-9}" y="40" width="18" height="190" fill="url(#chpl)"/><rect x="${x-13}" y="34" width="26" height="10" rx="2" fill="${fc2}"/><rect x="${x-13}" y="226" width="26" height="10" rx="2" fill="${fc2}"/>${[0,1,2,3].map(k=>`<path d="M${x-5+k*3.3} 46v178" stroke="#000" stroke-opacity=".08" stroke-width="1"/>`).join('')}`;
  let ban='';for(const x of [75,325])ban+=`<path d="M${x-16} 50h32v70l-16 -10l-16 10Z" fill="${fc}" stroke="#140c24" stroke-width="1.2"/><path d="M${x-12} 56h24v54l-12 -7l-12 7Z" fill="none" stroke="#fff" stroke-opacity=".5" stroke-width=".8"/><text x="${x}" y="88" text-anchor="middle" font-size="12" font-weight="900" fill="#140c24" font-family="Arial,sans-serif">${esc(tag.slice(0,4))}</text>`;
  let win='';for(const x of [160,240])win+=`<path d="M${x-14} 120V70q14 -20 28 0V120Z" fill="url(#chwin)" stroke="${fc2}" stroke-width="2"/><path d="M${x} 52v68M${x-14} 92h28" stroke="${fc2}" stroke-width="1.2"/>`;
  let can='';for(const [x,y] of [[130,40],[270,40]])can+=`<g class="chcand"><path d="M${x-22} ${y}h44" stroke="#c8901a" stroke-width="1.6"/>${[-18,-6,6,18].map(d=>`<rect x="${x+d-1.5}" y="${y-8}" width="3" height="8" fill="#fff6e0"/><ellipse cx="${x+d}" cy="${y-11}" rx="1.8" ry="3" fill="#ffd36a"/>`).join('')}<circle cx="${x}" cy="${y-6}" r="20" fill="url(#chglw)"/></g>`;
  return`<svg class="chbg" viewBox="0 0 400 300" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>
   <linearGradient id="chwall" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#2a1e4a"/><stop offset="1" stop-color="#4a3a6a"/></linearGradient>
   <linearGradient id="chpl" x1="0" x2="1"><stop offset="0" stop-color="#d8d0e8"/><stop offset=".5" stop-color="#fff8f0"/><stop offset="1" stop-color="#a89cc0"/></linearGradient>
   <linearGradient id="chfl" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#cfc4e0"/><stop offset="1" stop-color="#7a6a9a"/></linearGradient>
   <linearGradient id="chwin" x1="0" x2="1" y1="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset=".5" stop-color="${fc}"/><stop offset="1" stop-color="#6ad0ff"/></linearGradient>
   <radialGradient id="chglw"><stop offset="0" stop-color="#ffe9a0" stop-opacity=".7"/><stop offset="1" stop-color="#ffe9a0" stop-opacity="0"/></radialGradient>
   <linearGradient id="chcar" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#a01a3a"/><stop offset="1" stop-color="#d0304a"/></linearGradient></defs>
   <rect width="400" height="300" fill="url(#chwall)"/>${win}${ban}
   <path d="M0 230L400 230L400 300L0 300Z" fill="url(#chfl)"/>${[...Array(9)].map((_,k)=>`<path d="M${k*50} 230L${-100+k*75} 300" stroke="#fff" stroke-opacity=".15"/>`).join('')}<path d="M0 252H400M0 276H400" stroke="#fff" stroke-opacity=".12"/>
   <path d="M170 230L230 230L270 300L130 300Z" fill="url(#chcar)"/><path d="M172 232L228 232M168 238L232 238" stroke="#ffd84a" stroke-width="1" opacity=".7"/>
   <path d="M140 180h120l10 50h-140Z" fill="#6a5a8a" stroke="#140c24" stroke-width="1"/><path d="M150 168h100l6 12h-112Z" fill="#8a7aaa" stroke="#140c24" stroke-width="1"/>
   <g><path d="M172 168V96q28 -34 56 0V168Z" fill="${fc2}" stroke="#140c24" stroke-width="1.4"/><path d="M178 166V100q22 -26 44 0V166Z" fill="#7a1a2a"/><path d="M182 160V104q18 -20 36 0V160Z" fill="#a0243a"/><circle cx="200" cy="82" r="7" fill="${fc}" stroke="#140c24" stroke-width="1"/><path d="M200 70l3 7h-6Z" fill="${fc}"/>
   <rect x="166" y="140" width="12" height="28" rx="3" fill="${fc2}" stroke="#140c24" stroke-width="1"/><rect x="222" y="140" width="12" height="28" rx="3" fill="${fc2}" stroke="#140c24" stroke-width="1"/><circle cx="172" cy="138" r="4" fill="${fc}"/><circle cx="228" cy="138" r="4" fill="${fc}"/></g>
   ${pil}${can}</svg>`}
/* ---------- chargement : des héros différents à chaque ouverture, et la capitale au loin ---------- */
{const bi=btImg;btImg=function(id,u){let s='';try{s=heroBody(HEROES[id],u)}catch(e){return bi(id,u)}try{if(typeof svgXmlOk==='function'&&!svgXmlOk(s))s=svgDedupe(s)}catch(e){}return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)}}
PATCH.unshift({v:26.3,d:'18 octobre 2026',t:"La Capitale d'Éther",items:[
 "🏰 <b>La guerre est finie !</b> Sur la fête foraine, la bataille laisse place à la <b>Capitale d'Éther</b> qui flotte au loin. Touche-la pour entrer.",
 "📜 <b>Bilan de la guerre</b> : score final des deux camps, royaumes tenus, classement des guildes et des combattants, et ton propre bilan.",
 "👑 <b>Salle du trône</b> : le chef de la guilde qui tient la capitale siège sur le trône, entouré de membres de sa guilde qui changent toutes les 20 minutes. Les membres choisissent le héros qui les représente et peuvent laisser un petit message dans le hall.",
 "💰 La guilde qui tient la capitale gagne <b>+25 % d'or</b> et <b>+25 % d'XP de pass</b> jusqu'à la prochaine guerre.",
 "🎰 <b>Fortuna ultra-évoluée : la Roulette Céleste</b> ! 5 rouleaux dorés, Méga Jackpot, meilleures chances, dégâts ×1,25 à ×1,75, et une pluie de jetons qui explosent sur chaque ennemi avec de vrais dégâts.",
 "🖼️ Portraits des héros plus détaillés : col brodé et broche, éclats lumineux, reflets, ombrage et ornements dorés aux coins pour les épiques et légendaires.",
 "🌅 Nouveau chargement : des héros différents à chaque ouverture (parfois en forme ultra), avec la capitale au loin. Les personnages invisibles du chargement sont réparés."]});
