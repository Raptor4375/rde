
/* ================= Aléa : un Coup de Poker qui monte en puissance avec ses ultra-évolutions ================= */
/* Forme I « Croupier Étoilé »   : DOUBLE DONNE, 7 cartes distribuées, elle garde les 5 meilleures. Dégâts +15 %.
   Forme II « Maître du Destin » : + JOKER, 40 % de chances qu'un Joker améliore la main d'un rang. Dégâts +30 %.
   Forme III « Le Hasard Incarné » : + ALL-IN, jamais moins qu'un Brelan, et un coup final « ALL-IN » sur tous les ennemis. Dégâts +50 %. */
const PK_ORD=['hc','p1','p2','p3','st','fl','fh','p4','rf'];
const ALU={x:0,MUL:[1,1.15,1.3,1.5],T:['','DOUBLE DONNE','JOKER DU DESTIN','ALL-IN'],D:['','7 cartes, elle garde les 5 meilleures','le Joker améliore la main','tapis ! jamais moins qu\'un brelan']};
function pkNamed(k){const H=pkMake(k);H.name=PK_H[k].n;H.tier=PK_H[k].t;return H}
{const pd=pkDeal;pkDeal=function(u){const x=(u&&u.hid===ALEA&&u.ux)||0;let H=pd.apply(this,arguments);if(!x)return H;
  if(x>=1){const H2=pd.apply(this,arguments);if(PK_ORD.indexOf(H2.k)>PK_ORD.indexOf(H.k))H=H2;
    H.burn=[0,1].map(()=>({v:ri(2,14),s:pick(PK_SU)}))}
  if(x>=3&&PK_ORD.indexOf(H.k)<PK_ORD.indexOf('p3')){const b=H.burn;H=pkNamed('p3');H.burn=b;H.floor=1}
  if(x>=2&&H.k!=='rf'&&Math.random()<.4){const b=H.burn,from=H.name;H=pkNamed(PK_ORD[PK_ORD.indexOf(H.k)+1]);H.burn=b;H.jk=Math.floor(Math.random()*5);H.from=from}
  if(x>=3)H.allin=1;H.ux=x;return H}}
/* --- l'écran des cartes en forme ultra --- */
function pkShowU(H){return new Promise(res=>{const host=document.querySelector('#battle .bw');if(!host)return res();const sp=S.speed||1,x=H.ux||1,T=t=>t/sp;
  const disp=H.cards.map((c,i)=>({c,i})),all=[...disp];if(H.burn)H.burn.forEach((c,j)=>all.splice(j?6:2,0,{c,burn:1}));
  const m=document.createElement('div');m.className=`pkm ux ux${x} t${H.tier}`;m.style.setProperty('--sp',sp);
  m.innerHTML=`<div class="pkbox"><div class="pktt">🃏 Coup de Poker · <span>${esc(ALEA_UN[x]||'')}</span></div><div class="pksub">${ALU.T.slice(1,x+1).join(' · ')}</div>
   <div class="pkcards">${all.map((d,i)=>{const jk=!d.burn&&H.jk===d.i;return`<div class="pkc${d.burn?' brn':''}${jk?' jkc':''}" style="--i:${i}"><div class="pkin"><div class="pkb"></div><div class="pkf ${jk?'jk':PK_RED(d.c.s)?'red':''}">${jk?'<b>★</b><i>🃏</i><em>★</em>':pkFace(d.c)}</div></div></div>`}).join('')}</div>
   <div class="pkrw">✦ ${x>=2&&H.jk!=null?'JOKER !':'DOUBLE DONNE'} ✦</div><div class="pkres"></div><div class="pkallin">ALL-IN</div></div>`;
  host.style.position='relative';host.appendChild(m);const el=[...m.querySelectorAll('.pkc')];
  el.forEach((c,i)=>{setTimeout(()=>{c.classList.add('pkfl');try{cSnd.card()}catch(e){}},T(380+i*140));setTimeout(()=>c.classList.add('pkup'),T(380+i*140+160))});
  let t=380+el.length*140+200;
  if(H.burn){setTimeout(()=>{el.forEach(c=>{if(c.classList.contains('brn'))c.classList.add('burn')});m.classList.add('rwon');try{UIS.coin(true)}catch(e){}},T(t));t+=650;
    setTimeout(()=>{el.forEach(c=>{if(c.classList.contains('brn'))c.style.display='none'})},T(t));m.classList.remove('rwon')}
  if(H.jk!=null){const jc=m.querySelector('.jkc');setTimeout(()=>{m.querySelector('.pkrw').textContent='✦ JOKER ! ✦';m.classList.remove('rwon');void m.offsetWidth;m.classList.add('rwon');if(jc)jc.classList.add('jkgo');try{cSnd.jack()}catch(e){}},T(t+80));
    setTimeout(()=>{if(!jc)return;const f=jc.querySelector('.pkf'),real=H.cards[H.jk];f.className='pkf '+(PK_RED(real.s)?'red':'');f.innerHTML=pkFace(real)},T(t+620));t+=1000}
  setTimeout(()=>{const keep=el.filter(c=>!c.classList.contains('brn'));H.hl.forEach(i=>keep[i]&&keep[i].classList.add('pkhl'));const r=m.querySelector('.pkres');r.innerHTML=esc(H.name)+(H.from?`<small>${esc(H.from)} → ${esc(H.name)}</small>`:'');r.classList.add('on');if(H.tier>=3){try{cSnd.jack()}catch(e){}}},T(t));
  if(H.allin){setTimeout(()=>{m.classList.add('allon');try{cSnd.jack()}catch(e){}},T(t+700));t+=700}
  setTimeout(()=>{m.classList.add('out');setTimeout(()=>{m.remove();res()},T(260))},T(t+(H.tier>=3||H.allin?1300:1000)))})}
{const ps=pkShow;pkShow=function(H){if(H&&H.ux)return pkShowU(H);return ps.apply(this,arguments)}}
/* --- l'entrée en scène (cut-in) en forme ultra --- */
{const ac=alCutIn;alCutIn=async function(u){const x=(u&&u.ux)||0;if(!x)return ac.apply(this,arguments);
  const bt=document.getElementById('battle');if(!bt||B.skip||(typeof REDUCED!=='undefined'&&REDUCED))return;const sp=S.speed||1;
  const d=document.createElement('div');d.className='alcut alux alux'+x+(u.side===1?' foe':'');d.style.setProperty('--sp',sp);
  const n=x>=1?7:5,fan=[...Array(n)].map((_,i)=>`<span style="--k:${i};--n:${n}">${['A','R','D','V','10','🃏','A'][i]}<i>${['♠','♠','♠','♠','♠','★','♥'][i]}</i></span>`).join('');
  let fig='';try{fig=heroBody(HEROES[ALEA],x)}catch(e){fig=aleaSVG()}
  d.innerHTML=`<div class="alw"></div><div class="alb"></div>${x>=3?'<div class="alstars"></div>':''}<div class="alline"></div><div class="alfan">${fan}</div><div class="alfig">${fig}</div>
   <div class="altxt"><small>✦ ULTIME MYTHIQUE · FORME ${['','I','II','III'][x]} ✦</small><b>${x>=3?'ALL-IN':x>=2?'JOKER<br>DU DESTIN':'DOUBLE<br>DONNE'}</b><em>${esc(ALU.D[x])}</em></div>`;
  bt.appendChild(d);try{smSnd('rumble')}catch(e){}await wait((x>=3?1650:1450)/sp);d.classList.add('out');await wait(220/sp);d.remove()}}
/* --- dégâts renforcés et coup final ALL-IN --- */
{const ap=aleaPoker;aleaPoker=async function(u){const x=(u&&u.ux)||0;if(!x)return ap.apply(this,arguments);
  const sc0=u.scale;u.scale=(sc0||1)*ALU.MUL[x];let r;try{r=await ap.apply(this,arguments)}finally{u.scale=sc0}
  if(x>=3&&B&&!B.done){const foes=alive(1-u.side);if(foes.length){B.pend=B.skip?null:[];const sc=(sc0||1)*ALU.MUL[x];
    log(`💰 <b>ALL-IN !</b> ${u.name} pousse tous ses jetons : coup final sur tous les ennemis.`,'cs');
    if(!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED)){try{fxSetup();const W=FXS.w||innerWidth,Hh=FXS.h||innerHeight;textPop(W/2,Hh*.32,'💰 ALL-IN !','#ffd84a',34,1100);
      for(let i=0;i<30;i++)fxWait(i*22).then(()=>shapes(Math.random()*W,-10,'coin',['#ffd84a','#fff6c0'],1,2,7,90,.3));await fxWait(380)}catch(e){}}
    foes.forEach(t=>deal(u,t,180*sc,{sk:1}));if(!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED)){try{foes.forEach(t=>{const b=uc(t);pillarFx(b.x,b.y,'#ffd84a',600,44,170);shapes(b.x,b.y,'coin',['#ffd84a'],10,6,6,70,.25)});flash('#ffd84a',220,.5);shake(2);await fxWait(420)}catch(e){}}
    flushFloats()}}
  return r}}
{const pf=pkFx;pkFx=async function(u,H){const x=(u&&u.ux)||0;if(x>=1&&!(typeof REDUCED!=='undefined'&&REDUCED)){try{const a=uc(u);magicCircle(a.x,a.y,x>=3?['#ffd84a','#ff5ad8','#fff']:['#ffd84a','#c07aff'],70+x*12,900);if(x>=2)glowPulse(a.x,a.y,'#ffd84a',600,50)}catch(e){}}return pf.apply(this,arguments)}}
/* la fiche d'Aléa explique ce que change chaque forme */
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(+id===ALEA){const m=$('#ovl .modal');const sk=m&&m.querySelector('.alpas');if(sk&&!m.querySelector('.alux3d'))sk.insertAdjacentHTML('afterend',`<div class="skill alux3d"><div class="sn">🃏 Le Coup de Poker en ultra-évolution</div><div style="margin-top:4px;font-size:12.5px;line-height:1.45">✦ <b>Croupier Étoilé</b> : Double donne (7 cartes, les 5 meilleures gardées), dégâts +15 %.<br>✦✦ <b>Maître du Destin</b> : + Joker (40 % de chances d'améliorer la main d'un rang), dégâts +30 %.<br>✦✦✦ <b>Le Hasard Incarné</b> : + All-in (jamais moins qu'un Brelan, puis coup final sur tous les ennemis), dégâts +50 %.</div></div>`)}}catch(e){}return r}}
try{PATCH.unshift({v:31,d:'25 octobre 2026',t:'Les ultra-évolutions se réveillent',items:["👑 <b>Chaque légendaire a sa propre ultra-évolution</b> : ses couleurs, sa couronne, ses accessoires (bois de cerf pour Gaïa, cornes pour Drakhar, couronne noire pour Nyx, coquillages pour Léviathane…). Fini les ailes d'ange et les yeux bleus pour tout le monde.","🎨 <b>Décors refaits</b> pour tous les légendaires, et ils grandissent à chaque forme ultra : la roulette de Fortuna gagne des cases, Solaris gagne des planètes, le volcan de Titanor entre en éruption, l'éclipse de Nyx devient rouge sang, le Bifröst apparaît derrière Valkyr…","🃏 <b>Aléa a enfin son décor</b> (la Table du Destin) et sa roulette devient la Roue du Destin, un cercle de cartes.","🃏 <b>Le Coup de Poker d'Aléa évolue</b> : Croupier Étoilé = <b>Double donne</b> (7 cartes, les 5 meilleures gardées, +15 %), Maître du Destin = <b>Joker</b> qui améliore la main (+30 %), Le Hasard Incarné = <b>All-in</b> (jamais moins qu'un Brelan + coup final sur tous les ennemis, +50 %). Nouvelle entrée en scène pour chaque forme."]})}catch(e){}
