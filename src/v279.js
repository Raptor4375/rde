
/* ================= V26.7 : fin de la Guerre des Cieux, Capitale et expéditions, boss de saison, nouveau chargement ================= */
/* ---------- chargement : un royaume paisible au lever du jour, avec des héros ---------- */
function btPick5(){const sh=a=>a.sort(()=>Math.random()-.5);const rg=(a,b)=>[...Array(b-a+1)].map((_,i)=>a+i);
  const L=sh(rg(56,66))[0],E=sh(rg(41,55)).slice(0,2),O=sh(rg(10,40)).slice(0,2);const u=Math.random()<.45?1+Math.floor(Math.random()*3):0;
  return[[O[0],0],[E[0],0],[L,u],[E[1],0],[O[1],0]]}
function btScene3(){const se=(function(){try{return seasonNow()}catch(e){return'automne'}})();
  const HC={automne:['#c8762a','#a85a1e','#8a4a1a'],hiver:['#e8eef8','#cfd9ea','#b4c2da'],printemps:['#7ccf6a','#5cb050','#3e8e3a'],ete:['#8ad05a','#6ab84a','#4a983a']}[se]||['#7ccf6a','#5cb050','#3e8e3a'];
  const T=btPick5();const hs=T.map(([id,u],i)=>`<div class="b3h q${i}"><i class="b3glow"></i><img src="${btImg(id,u)}" alt=""></div>`).join('');
  let motes='';for(let k=0;k<22;k++)motes+=`<i style="left:${(Math.random()*100).toFixed(1)}%;top:${(25+Math.random()*65).toFixed(1)}%;animation-delay:${(Math.random()*6).toFixed(1)}s;animation-duration:${(5+Math.random()*5).toFixed(1)}s"></i>`;
  const fx=se==='hiver'?'snow':se==='automne'?'leaf':se==='printemps'?'petal':'spark';let fall='';for(let k=0;k<14;k++)fall+=`<i class="${fx}" style="left:${(Math.random()*100).toFixed(1)}%;animation-delay:${(Math.random()*8).toFixed(1)}s;animation-duration:${(7+Math.random()*6).toFixed(1)}s"></i>`;
  const castle=`<svg class="b3castle" viewBox="-60 -110 120 130" aria-hidden="true"><path d="M-52 14Q-40 30 0 34Q40 30 52 14Z" fill="#8a7a9a"/><rect x="-48" y="2" width="96" height="14" fill="#f4ecf8"/><rect x="-39" y="-24" width="10" height="30" fill="#f4ecf8"/><path d="M-41 -24L-34 -36L-27 -24Z" fill="#ffd84a"/><rect x="29" y="-24" width="10" height="30" fill="#f4ecf8"/><path d="M27 -24L34 -36L41 -24Z" fill="#ffd84a"/><rect x="-24" y="-42" width="12" height="44" fill="#f4ecf8"/><path d="M-26 -42L-18 -58L-10 -42Z" fill="#7c5cff"/><rect x="12" y="-42" width="12" height="44" fill="#f4ecf8"/><path d="M10 -42L18 -58L26 -42Z" fill="#7c5cff"/><rect x="-8" y="-64" width="16" height="66" fill="#fffaf2"/><path d="M-10 -64L0 -86L10 -64Z" fill="#ffd84a"/><path d="M0 -86v-10l9 3l-9 3" fill="#ff5d6c"/><rect x="-3" y="-50" width="6" height="8" rx="3" fill="#ffd36a"/><ellipse cx="-40" cy="22" rx="24" ry="7" fill="#fff"/><ellipse cx="38" cy="24" rx="26" ry="7" fill="#fff"/></svg>`;
  const birds=`<svg class="b3birds" viewBox="0 0 60 20" aria-hidden="true"><path d="M2 8q4 -5 8 0q4 -5 8 0M24 4q3 -4 6 0q3 -4 6 0M40 12q3 -4 6 0q3 -4 6 0" fill="none" stroke="#3a2a5a" stroke-width="1.6" stroke-linecap="round"/></svg>`;
  return`<div class="b2 b3 se-${se}">
   <div class="b3sky"></div><div class="b3sun"><i></i></div><div class="b3rays"></div>
   <svg class="b3cloud c1" viewBox="-40 -30 80 40">${btCloud(0,0,1,'#fff')}</svg><svg class="b3cloud c2" viewBox="-40 -30 80 40">${btCloud(0,0,1,'#fff6ea')}</svg><svg class="b3cloud c3" viewBox="-40 -30 80 40">${btCloud(0,0,1,'#ffffff')}</svg>
   ${castle}${birds}
   <svg class="b3hills" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 70Q60 30 130 60T260 50T400 60V200H0Z" fill="#8a7ab8" opacity=".55"/><path d="M0 110Q80 70 170 100T330 90T400 96V200H0Z" fill="${HC[2]}"/><path d="M0 140Q100 104 200 128T400 120V200H0Z" fill="${HC[1]}"/><path d="M0 170Q120 140 220 160T400 152V200H0Z" fill="${HC[0]}"/></svg>
   <div class="b2motes b3motes">${motes}</div><div class="b3fall">${fall}</div>
   <div class="b3party">${hs}</div>
   <div class="b2top"><div class="b2title">Royaumes<span>d'Éther</span></div><div class="b3sub">✦ Ton aventure t'attend ✦</div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">Le royaume se réveille…</div><div class="b2tap" id="b2tap" hidden>Touche pour entrer dans le royaume</div><div class="b2snd" id="b2snd">🔊 Touche l'écran pour le son</div></div>
  </div>`}
try{BTIPS.length=0;BTIPS.push('Le royaume se réveille…','Les héros se rassemblent…','Astuce : envoie tes héros en expédition depuis la Capitale.','Astuce : le boss de saison change à chaque saison.','Astuce : fais une équipe par mode de jeu.','Astuce : fusionne tes doublons pour monter en étoiles.','Les ultra-évolutions sont réservées aux plus patients…')}catch(e){}
(function(){try{const b=document.getElementById('boot');if(!b||BOOT.done||!b.classList.contains('v2'))return;const r=b.querySelector('.b2');if(!r)return;const st=r.querySelector('#b2start');
  const tmp=document.createElement('div');tmp.innerHTML=btScene3();const n=tmp.firstElementChild;
  if(st){n.appendChild(st);st.setAttribute('aria-label','Entrer dans le royaume');const bb=st.querySelector('b');if(bb)bb.textContent='Touche pour entrer dans le royaume';const sw=st.querySelector('.b2sw');if(sw)sw.textContent='✨'}
  r.replaceWith(n)}catch(e){}})();
try{SONGS.boot=SONGS.menu;delete SONGC.boot}catch(e){}

/* ---------- la Guerre des Cieux est terminée : la Capitale reste, avec sa table d'expéditions ---------- */
{const et=evTabs;evTabs=function(){const a=et();const i=a.findIndex(x=>x[0]==='av');const ph=avPhase();if(i>=0&&(ph==='end'||ph==='off'))a[i]=['av','🏰 Capitale',expReadyN()||0];
  const s=sbDef();if(s){const j=a.findIndex(x=>x[0]==='pass');a.splice(j>=0?j+1:a.length,0,['sboss',s.ic+' Boss de saison',sbAttempts()||0])}return a}}
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);const a=P.find(p=>p.k==='av');const ph=avPhase();if(a&&(ph==='end'||ph==='off')){a.d="Table d'expéditions et salle du trône"}return P}}
{const ap=avPage;avPage=function(){const ph=avPhase();if((ph==='end'||ph==='off')&&!UI.capHall)return capitalPage();const h=ap.apply(this,arguments);return UI.capHall?h.replace('← Bilan de la guerre','← Capitale'):h}}
{const pt=pageTheme;pageTheme=function(){const t=pt.apply(this,arguments);if(t==='avwar'){const ph=avPhase();if(ph==='end'||ph==='off')return'menu'}return t}}

/* ---------- expéditions ---------- */
const EXPK=[{n:"Pic de l'Aurore",ic:'🏔️'},{n:'Pont des Nuées',ic:'☁️'},{n:'Bastion Doré',ic:'🛡️'},{n:'Gouffre Cendré',ic:'🌋'},{n:'Marais de Soufre',ic:'🐸'},{n:'Crypte Écarlate',ic:'⚰️'},{n:"Forêt d'Argent",ic:'🌲'},{n:'Temple du Zénith',ic:'⛩️'}];
const EXPV=[['Explorer les ruines','🧭'],['Escorter une caravane','🐎'],['Chasser les monstres','⚔️'],['Cartographier les environs','🗺️'],['Retrouver un trésor perdu','💰'],['Sauver des villageois','🏡'],['Récolter des cristaux','💎']];
const EXPD=[[30,'30 min'],[60,'1 h'],[120,'2 h'],[240,'4 h'],[480,'8 h']];
const EXPDF=[['Facile',.7,'#58e4a0'],['Moyenne',1,'#ffd84a'],['Difficile',1.35,'#ff6a5a']];
const EXPEL={fire:'🔥 Feu',ice:'❄️ Glace',water:'🌊 Eau',nature:'🌿 Nature',poison:'☠️ Poison',astral:'✨ Astral',holy:'☀️ Sacré',storm:'⚡ Orage',shadow:'🌑 Ombre',earth:'🪨 Terre',wind:'🌪️ Vent',blood:'🩸 Sang',spirit:'👻 Esprit'};
function expSlots(){try{return capMine()?4:3}catch(e){return 3}}
function EXPS(){if(!S.exp||typeof S.exp!=='object')S.exp={act:[],done:{}};const X=S.exp;X.act=Array.isArray(X.act)?X.act:[];X.done=X.done||{};const d=today();for(const k of Object.keys(X.done))if(k!==d)delete X.done[k];return X}
function expHeroEl(id){try{return heroEl({hid:id}).el}catch(e){return'neutral'}}
function expTopAvg(n){const p=Object.keys(S.heroes||{}).map(id=>heroPw(+id)).sort((a,b)=>b-a).slice(0,n);return p.length?p.reduce((a,b)=>a+b,0)/p.length:1000}
function expMissions(){const d=today(),R=rng([...d].reduce((a,c)=>a*31+c.charCodeAt(0),7)%1e7);const out=[];const used=new Set();
  for(let i=0;i<5;i++){let k;do{k=Math.floor(R()*8)}while(used.has(k)&&used.size<8);used.add(k);
    const v=EXPV[Math.floor(R()*EXPV.length)],du=i,df=Math.floor(R()*3),size=du>=3?3:du>=1?2:1;
    const cls=Object.keys(CLS)[Math.floor(R()*6)],els=Object.keys(EXPEL),el=els[Math.floor(R()*els.length)],bonus=R()<.5?{t:'c',v:cls}:{t:'e',v:el};
    out.push({id:d+'-'+i,k,v:v[0],vic:v[1],du,df,size,bonus})}
  return out}
function expRec(m){return Math.round(expTopAvg(m.size)*m.size*EXPDF[m.df][1]*(.75+.08*m.du))}
function expBonusOk(m,id){const h=HEROES[id];if(!h)return false;return m.bonus.t==='c'?h.c===m.bonus.v:expHeroEl(id)===m.bonus.v}
function expChance(m,ids){if(!ids.length)return 0;const pw=ids.reduce((a,id)=>a+heroPw(id),0),r=pw/Math.max(1,expRec(m));let c=.12+.72*Math.min(1.25,r);const nb=ids.filter(id=>expBonusOk(m,id)).length;c+=Math.min(.3,nb*.12);return Math.max(.05,Math.min(.98,c))}
function expRew(m){const h=EXPD[m.du][0]/60,f=EXPDF[m.df][1];return{gold:Math.round((700+140*(S.max||1))*Math.pow(h,.8)*f),gems:m.du>=2?Math.round(8*Math.pow(h,.7)*f):m.du===1?4:0,item:m.du>=2,shard:m.du===4&&m.df===2?.3:m.du===4?.12:0}}
function expBusy(){const s=new Set();for(const a of EXPS().act)for(const id of a.ids)s.add(id);return s}
function expReadyN(){try{const t=Date.now();return EXPS().act.filter(a=>a.t1<=t).length}catch(e){return 0}}
function expBonusTxt(m){return m.bonus.t==='c'?`<span style="color:${CLS[m.bonus.v].c}">${m.bonus.v}</span>`:EXPEL[m.bonus.v]||m.bonus.v}
function expLeft(ms){ms=Math.max(0,ms);const m=Math.ceil(ms/60000);return m>=60?`${Math.floor(m/60)} h ${String(m%60).padStart(2,'0')}`:ms>=60000?`${m} min`:`${Math.ceil(ms/1000)} s`}
function expSkipCost(a){return Math.max(5,Math.ceil((a.t1-Date.now())/60000/6))}
function expTableSVG(){const X=EXPS(),M=expMissions(),t=Date.now();const P=EXPK.map((_,i)=>{const a=i/8*Math.PI*2-Math.PI/2;return[200+Math.cos(a)*118,128+Math.sin(a)*62]});
  const act=new Map(X.act.map(a=>[a.m.k,a]));const offer=new Set(M.map(m=>m.k));
  let s=`<svg class="exptab-svg" viewBox="0 0 400 250" role="img" aria-label="Table d'expéditions"><defs><linearGradient id="xwood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8a5a32"/><stop offset="1" stop-color="#5a3418"/></linearGradient><radialGradient id="xpap" cx="50%" cy="45%" r="65%"><stop offset="0" stop-color="#fbf0d4"/><stop offset=".8" stop-color="#ead2a0"/><stop offset="1" stop-color="#c9a46a"/></radialGradient><radialGradient id="xcand" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffd36a" stop-opacity=".55"/><stop offset="1" stop-color="#ffd36a" stop-opacity="0"/></radialGradient></defs>`;
  s+=`<path d="M10 236L36 30H364L390 236Z" fill="url(#xwood)" stroke="#140c24" stroke-width="2"/><path d="M10 236H390V248H10Z" fill="#4a2a12" stroke="#140c24" stroke-width="2"/>`;
  for(let i=0;i<6;i++)s+=`<path d="M${40+i*64} 34L${20+i*72} 234" stroke="#4a2a12" stroke-width="1" opacity=".35"/>`;
  s+=`<path d="M52 52Q200 40 348 52L362 210Q200 222 38 210Z" fill="url(#xpap)" stroke="#8a6a3a" stroke-width="2"/>`;
  s+=`<path d="M70 196Q90 150 60 120M330 70Q300 100 340 140" stroke="#8ab0d0" stroke-width="5" fill="none" opacity=".5" stroke-linecap="round"/>`;
  for(const [x,y] of [[110,90],[290,170],[96,170],[300,90],[200,70]])s+=`<path d="M${x-6} ${y}l6 -9l6 9z" fill="#9a8a6a" opacity=".55"/>`;
  P.forEach(([x,y],i)=>{const a=act.get(i);s+=`<path d="M200 128L${x.toFixed(0)} ${y.toFixed(0)}" stroke="${a?'#c03a2a':'#8a6a3a'}" stroke-width="${a?2:1.2}" stroke-dasharray="4 4" fill="none" opacity="${a?.9:.45}">${a?'<animate attributeName="stroke-dashoffset" values="16;0" dur="1s" repeatCount="indefinite"/>':''}</path>`});
  P.forEach(([x,y],i)=>{const a=act.get(i),o=offer.has(i),k=EXPK[i];s+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)})"><circle r="${a?11:9}" fill="${a?(a.t1<=t?'#3fbf6b':'#ff8a3a'):o?'#fff6dc':'#e2cfa8'}" stroke="#140c24" stroke-width="1.4"/>${a?`<circle r="11" fill="none" stroke="${a.t1<=t?'#3fbf6b':'#ff8a3a'}" stroke-width="2"><animate attributeName="r" values="11;18" dur="1.6s" repeatCount="indefinite"/><animate attributeName="opacity" values=".9;0" dur="1.6s" repeatCount="indefinite"/></circle>`:''}<text y="4" text-anchor="middle" font-size="11">${k.ic}</text><text y="${y>128?22:-14}" text-anchor="middle" font-size="8.5" font-weight="800" fill="#4a2a12">${k.n}</text>${a?`<path d="M6 -10V-26l12 4l-12 4" fill="#d1263b" stroke="#140c24" stroke-width="1"/>`:''}</g>`});
  s+=`<g transform="translate(200 128)"><circle r="16" fill="#efe6f8" stroke="#140c24" stroke-width="1.6"/><path d="M-9 4V-6l4 -5l5 5l5 -5l4 5V4Z" fill="#7c5cff" stroke="#140c24" stroke-width="1"/><path d="M-3 4V-1h6V4Z" fill="#ffd84a"/><text y="30" text-anchor="middle" font-size="9" font-weight="900" fill="#4a2a12">Capitale</text></g>`;
  s+=`<g transform="translate(330 196)"><circle r="17" fill="#f4e6c4" stroke="#8a6a3a" stroke-width="1.5"/><g><path d="M0 -14L3 0L0 14L-3 0Z" fill="#d1263b"/><path d="M-14 0L0 3L14 0L0 -3Z" fill="#4a2a12"/><animateTransform attributeName="transform" type="rotate" values="-8;8;-8" dur="5s" repeatCount="indefinite"/></g><text y="-19" text-anchor="middle" font-size="7" font-weight="900" fill="#4a2a12">N</text></g>`;
  s+=`<g transform="translate(64 64)"><circle r="26" fill="url(#xcand)"><animate attributeName="r" values="24;29;24" dur="1.4s" repeatCount="indefinite"/></circle><rect x="-5" y="-4" width="10" height="20" rx="2" fill="#fff8e8" stroke="#140c24" stroke-width="1"/><path d="M0 -4Q-4 -10 0 -18Q4 -10 0 -4Z" fill="#ffb03a"><animate attributeName="d" values="M0 -4Q-4 -10 0 -18Q4 -10 0 -4Z;M0 -4Q-5 -11 1 -19Q4 -11 0 -4Z;M0 -4Q-4 -10 0 -18Q4 -10 0 -4Z" dur=".7s" repeatCount="indefinite"/></path><ellipse cx="0" cy="17" rx="10" ry="3" fill="#c8a04a" stroke="#140c24" stroke-width="1"/></g>`;
  s+=`<g transform="translate(346 68) rotate(18)"><rect x="-4" y="-22" width="8" height="40" rx="3" fill="#f4ecd8" stroke="#140c24" stroke-width="1"/><path d="M-4 -22Q0 -30 4 -22" fill="#d1263b" stroke="#140c24" stroke-width="1"/></g>`;
  return s+`</svg>`}
function capitalPage(){const o=capOwner();
  const head=`<div class="card caphd2"><div class="row" style="justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap"><div style="min-width:0"><div class="h" style="margin:0">🏰 Capitale d'Éther</div><div class="muted" style="font-size:12.5px">${o?`Tenue par <b>${esc(o.n)}</b>${capMine()?' · ta guilde : <b>+25 % d\'or</b> et <b>+25 % d\'XP de pass</b>':''}`:'La Guerre des Cieux est terminée. Merci à tous les combattants !'}</div></div><button class="btn sm" data-a="caphall">👑 Salle du trône</button></div></div>`;
  return`<div class="stack">${head}${expBlock()}</div>`}
function expBlock(where){const X=EXPS(),M=expMissions(),t=Date.now(),free=expSlots()-X.act.length,doneT=X.done[today()]||[];
  const slots=X.act.map((a,i)=>{const k=EXPK[a.m.k],ready=a.t1<=t,p=Math.min(100,(t-a.t0)/(a.t1-a.t0)*100);return`<div class="xslot ${ready?'rdy':''}"><div class="xsh"><b>${k.ic} ${esc(a.m.v)}</b><span class="muted">${esc(k.n)}</span></div>
    <div class="xteam">${a.ids.map(id=>`<span class="xmini">${portrait(HEROES[id])}</span>`).join('')}</div>
    <div class="bar xbar"><i style="width:${p.toFixed(1)}%" data-xt0="${a.t0}" data-xt1="${a.t1}"></i></div>
    <div class="row" style="justify-content:space-between;align-items:center;gap:6px"><span class="xleft" data-xl="${a.t1}">${ready?'✅ De retour !':'⏳ '+expLeft(a.t1-t)}</span>${ready?`<button class="btn sm g" data-a="xclaim" data-v="${i}">Récupérer</button>`:`<button class="btn sm" data-a="xskip" data-v="${i}">Finir ${GEM}${expSkipCost(a)}</button>`}</div></div>`}).join('')+[...Array(Math.max(0,free))].map(()=>`<div class="xslot empty"><span>🪑 Place libre</span><small class="muted">Choisis une mission plus bas</small></div>`).join('');
  const list=M.map(m=>{const k=EXPK[m.k],r=expRew(m),df=EXPDF[m.df],done=doneT.includes(m.id),on=X.act.some(a=>a.m.id===m.id);
    return`<div class="xmis ${done||on?'off':''}"><div class="xmi">${k.ic}</div><div style="min-width:0;flex:1"><div class="xmt">${m.vic} ${esc(m.v)}</div><div class="muted" style="font-size:12px">${esc(k.n)} · ⏱️ ${EXPD[m.du][1]} · <b style="color:${df[2]}">${df[0]}</b> · ${m.size} héros</div>
      <div class="xmr"><span class="xr">${GOLD}${fmt(r.gold)}</span>${r.gems?`<span class="xr">${GEM}${r.gems}</span>`:''}${r.item?'<span class="xr">🎁 équipement</span>':''}${r.shard?`<span class="xr">${SHARD}${Math.round(r.shard*100)} %</span>`:''}<span class="xr xb">🎯 ${expBonusTxt(m)}</span></div></div>
      ${done?'<span class="xtag">✔ Faite</span>':on?'<span class="xtag">En cours</span>':`<button class="btn sm p" data-a="xprep" data-v="${m.id}" ${free>0?'':'disabled'}>Préparer</button>`}</div>`}).join('');
  const cap=(()=>{try{return capMine()}catch(e){return false}})();
  return`<div class="card exptab"><div class="h3" style="margin:0 0 6px">🗺️ Table d'expéditions${where==='guild'?' de la guilde':''}</div>${expTableSVG()}<div class="muted" style="font-size:12px;margin-top:6px;text-align:center">${cap?'👑 Privilège de la Capitale : 4 expéditions en même temps':'3 expéditions en même temps · la guilde qui tient la Capitale en a 4'} · tes missions sont les mêmes ici, dans le hall de guilde et dans la Capitale</div><div class="xslots">${slots}</div></div>
   <div class="card"><div class="h3" style="margin:0">📜 Missions du jour</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Envoie tes héros en mission : ils continuent de combattre avec toi pendant ce temps. Plus ils sont forts, et plus ils collent au bonus, plus la mission a de chances de réussir. Nouvelles missions chaque jour à minuit.</p><div class="list" style="gap:8px">${list}</div></div>`}
function expPick(mid){const m=expMissions().find(x=>x.id===mid);if(!m)return;UI.xsel=UI.xsel&&UI.xsel.mid===mid?UI.xsel:{mid,ids:[]};const sel=UI.xsel.ids,busy=expBusy();
  const ids=Object.keys(S.heroes||{}).map(Number).filter(id=>HEROES[id]).sort((a,b)=>(expBonusOk(m,b)-expBonusOk(m,a))||heroPw(b)-heroPw(a));const ch=expChance(m,sel),k=EXPK[m.k];
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">${m.vic} ${esc(m.v)}</div><p class="sub">${k.ic} ${esc(k.n)} · ⏱️ ${EXPD[m.du][1]} · Choisis ${m.size} héros. Bonus : ${expBonusTxt(m)} · Puissance conseillée : <b>${fmt(expRec(m))}</b></p>
   <div class="xch"><div class="row" style="justify-content:space-between"><b>Chances de réussite</b><b style="color:${ch>=.75?'#58e4a0':ch>=.45?'#ffd84a':'#ff6a5a'}">${Math.round(ch*100)} %</b></div><div class="bar"><i style="width:${ch*100}%;background:${ch>=.75?'#3fbf6b':ch>=.45?'#e8b83a':'#e0553d'}"></i></div></div>
   <div class="xpick">${ids.map(id=>{const h=HEROES[id],b=busy.has(id),on=sel.includes(id),bo=expBonusOk(m,id);return`<button class="xph ${on?'on':''} ${b?'busy':''}" data-a="xtog" data-v="${id}" ${b?'disabled':''}><span class="xpp">${portrait(h)}</span><span class="xpn">${esc(h.n)}</span><span class="xpw">⚡${fmt(heroPw(id))}</span>${bo?'<i class="xbo">BONUS</i>':''}${b?'<i class="xbo bz">EN MISSION</i>':''}</button>`}).join('')}</div>
   <div class="row" style="margin-top:10px;gap:8px"><button class="btn p" data-a="xsend" ${sel.length===m.size?'':'disabled'}>🚩 Envoyer (${sel.length}/${m.size})</button><button class="btn" data-a="close">Annuler</button></div>`);
  const mo=$('.modal');if(mo&&UI.xscroll){const p=mo.querySelector('.xpick');if(p)p.scrollTop=UI.xscroll}}
function expSend(){const s=UI.xsel;if(!s)return;const X=EXPS(),m=expMissions().find(x=>x.id===s.mid);if(!m||s.ids.length!==m.size||X.act.length>=expSlots())return;const busy=expBusy();if(s.ids.some(id=>busy.has(id)))return;
  const ch=expChance(m,s.ids),t=Date.now();X.act.push({m,ids:s.ids.slice(),t0:t,t1:t+EXPD[m.du][0]*60000,ch,ok:Math.random()<ch});UI.xsel=null;save();closeModal();render();toast(`🚩 Tes héros partent vers ${EXPK[m.k].n} !`)}
function expClaim(i){const X=EXPS(),a=X.act[i];if(!a||a.t1>Date.now())return;X.act.splice(i,1);const d=today();(X.done[d]=X.done[d]||[]).push(a.m.id);const r=expRew(a.m),rw=[];
  if(a.ok){const g=Math.round(r.gold*goldMul());S.gold+=g;rw.push(GOLD+fmt(g)+' or');if(r.gems){S.gems+=r.gems;rw.push(GEM+r.gems+' gemmes')}if(r.item){const it=dropItem(Math.max(1,rollRarity(Math.ceil((S.max||1)/10)||1,a.m.df+1)));rw.push(itemChip(it))}if(r.shard&&Math.random()<r.shard){S.shards++;rw.push(SHARD+'1 éclat légendaire')}}
  else{const g=Math.round(r.gold*.3);S.gold+=g;rw.push(GOLD+fmt(g)+' or (récompense de consolation)')}
  S.stats=S.stats||{};S.stats.exp=(S.stats.exp||0)+1;save();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="xres ${a.ok?'ok':'ko'}"><div class="xresi">${a.ok?'🏆':'🌧️'}</div><div class="h">${a.ok?'Mission réussie !':'Mission ratée…'}</div><p class="sub">${a.ok?`Tes héros reviennent de ${esc(EXPK[a.m.k].n)} les bras chargés.`:`Tes héros reviennent bredouilles de ${esc(EXPK[a.m.k].n)}. Envoie des héros plus forts ou qui collent au bonus.`}</p><div class="xteam" style="justify-content:center">${a.ids.map(id=>`<span class="xmini big">${portrait(HEROES[id])}</span>`).join('')}</div><div class="xrw">${rw.map(x=>`<div>${x}</div>`).join('')}</div><button class="btn p" data-a="close" style="margin-top:10px;width:100%">Super !</button></div>`);render()}
function expSkip(i){const X=EXPS(),a=X.act[i];if(!a)return;const c=expSkipCost(a);if(S.gems<c)return toast("Pas assez de gemmes.");S.gems-=c;a.t1=Date.now();save();render();toast('⚡ Expédition terminée !')}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="xprep"],[data-a="xtog"],[data-a="xsend"],[data-a="xclaim"],[data-a="xskip"]');if(!t)return;e.preventDefault();e.stopPropagation();const a=t.dataset.a,v=t.dataset.v;
  if(a==='xprep'){UI.xsel=null;UI.xscroll=0;expPick(v)}
  else if(a==='xtog'){const s=UI.xsel;if(!s)return;const m=expMissions().find(x=>x.id===s.mid);const id=+v;const i=s.ids.indexOf(id);if(i>=0)s.ids.splice(i,1);else if(m&&s.ids.length<m.size)s.ids.push(id);else if(m){s.ids.shift();s.ids.push(id)}const p=$('.modal .xpick');UI.xscroll=p?p.scrollTop:0;expPick(s.mid)}
  else if(a==='xsend')expSend();else if(a==='xclaim')expClaim(+v);else if(a==='xskip')expSkip(+v)},true);
setInterval(()=>{try{if(B||(TAB!=='event'&&TAB!=='guilde'))return;const t=Date.now();let flip=false;document.querySelectorAll('[data-xt1]').forEach(el=>{const t0=+el.dataset.xt0,t1=+el.dataset.xt1;el.style.width=Math.min(100,(t-t0)/(t1-t0)*100).toFixed(1)+'%'});
  document.querySelectorAll('[data-xl]').forEach(el=>{const t1=+el.dataset.xl;if(t1<=t){if(!el.dataset.fl){el.dataset.fl=1;flip=true}}else el.textContent='⏳ '+expLeft(t1-t)});if(flip&&!$('#ovl').innerHTML)render()}catch(e){}},1000);

/* ---------- boss de saison ---------- */
const SBOSS={
 automne:{n:'Sylvaroc, Ent des Feuilles Mortes',sh:'Sylvaroc',ic:'🍂',h:24,sk:{n:'Tempête de Feuilles',tg:'all',fx:{dmg:110,dot:22}},d:"Un vieil arbre géant réveillé par le vent d'automne. Ses feuilles empoisonnées tombent sur toute ton équipe."},
 hiver:{n:'Givrelle, Reine du Blizzard',sh:'Givrelle',ic:'❄️',h:205,sk:{n:'Blizzard Éternel',tg:'all',fx:{dmg:100,stun:25}},d:'La reine des glaces souffle un blizzard qui peut geler tes héros sur place.'},
 printemps:{n:'Floraë, la Ronce Éternelle',sh:'Floraë',ic:'🌸',h:320,sk:{n:'Étreinte des Ronces',tg:'all',fx:{dmg:105,drain:30,weak:1}},d:'Une fleur géante dont les ronces affaiblissent tes héros et la soignent.'},
 ete:{n:'Solarion, Phénix du Solstice',sh:'Solarion',ic:'☀️',h:38,sk:{n:'Éruption Solaire',tg:'all',fx:{dmg:125,weak:1}},d:"L'oiseau de feu de l'été. Ses flammes brûlent fort et brisent les défenses."}};
const SB_MILE=[[1,'1re victoire',()=>({gems:100})],[3,'3 victoires',()=>({gems:150,shard:1})],[5,'5 victoires',()=>({gems:250,shard:1})],[10,'10 victoires',()=>({gems:500,shard:2})]];
function sbDef(){try{return SBOSS[seasonNow()]||null}catch(e){return null}}
function sbHp(L){let p=0;try{p=idsPower(teamIdsFor('pve'))}catch(e){}if(!isFinite(p))p=0;return Math.max(10000,Math.round(Math.max(1500,p)*(3+1.5*L)))}
function SB(){const se=seasonNow();if(!S.sb||S.sb.se!==se)S.sb={se,l:1,hp:0,max:0,at:3,d:'',dmg:0,kills:0,mile:{}};const X=S.sb;if(!X.max||!isFinite(X.max)||!isFinite(X.hp)){X.max=sbHp(X.l);X.hp=X.max}const d=today();if(X.d!==d){X.d=d;X.at=3}X.mile=X.mile||{};return X}
function sbAttempts(){try{return SB().at}catch(e){return 0}}
const SBX={go:false,active:false};
{const eb=evBattle;evBattle=function(){if(!SBX.go)return eb.apply(this,arguments);SBX.go=false;const s=sbDef(),X=SB();if(!s)return null;if(X.at<=0){toast(`Plus de tentative contre ${s.sh} aujourd'hui (3 par jour, recharge à minuit).`);return null}
  X.at--;SBX.active=true;const g=Math.pow(GROW,S.max);const f=[foeUnit(0,{name:s.sh,boss:1,raid:1,max:X.max,atk:Math.round(52*g),def:42,spd:99,port:monArt(s.sh,s.h,true),sk:s.sk})];f[0].hp=X.hp;
  return{foes:f,title:s.sh+' · Nv '+X.l,sub:'Boss de saison · 12 tours',maxR:12,wc:s.h}}}
{const ef=evFinish;evFinish=function(dmg,rw){if(!SBX.active)return ef.apply(this,arguments);SBX.active=false;return sbFinish(dmg,rw)}}
function sbFinish(dmg,rw){const s=sbDef(),X=SB();q('boss');X.dmg+=dmg;
  const g=Math.round(Math.min(dmg/4,18000*(1+(S.max||1)/10))*goldMul());S.gold+=g;rw.push(GOLD+fmt(g)+' or');const gm=10+Math.round(20*Math.min(1,3*dmg/X.max));S.gems+=gm;rw.push(GEM+gm+' gemmes');
  X.hp=Math.max(0,X.hp-dmg);let title='Attaque terminée';
  if(X.hp<=0){title=s.sh+' vaincu !';X.kills++;const bg=60+20*X.l;S.gems+=bg;rw.push(GEM+bg+' gemmes de victoire');const it=dropItem(Math.max(2,rollRarity(Math.ceil((S.max||1)/10)||1,2)));rw.push(itemChip(it));if(Math.random()<.4){S.shards++;rw.push(SHARD+'1 éclat légendaire')}
    for(const [n,lab,f] of SB_MILE)if(X.kills>=n&&!X.mile[n]){X.mile[n]=1;const r=f();if(r.gems){S.gems+=r.gems;rw.push(`🏅 Palier « ${lab} » : ${GEM}${r.gems}`)}if(r.shard){S.shards+=r.shard;rw.push(`🏅 ${SHARD}${r.shard} éclat${r.shard>1?'s':''} légendaire${r.shard>1?'s':''}`)}}
    try{news(Date.now(),`${S.name||'Voyageur'} a vaincu ${s.sh} niveau ${X.l} !`)}catch(e){}X.l++;X.max=sbHp(X.l);X.hp=X.max;rw.push(`${s.sh} revient au niveau ${X.l}`)}
  else rw.push(`Il lui reste ${fmt(X.hp)} PV (${Math.max(1,Math.round(X.hp/X.max*100))} %)`);NET.lastPush='';return title}
function sbPage(){const s=sbDef();if(!s)return'';const X=SB(),se=SEAS[seasonNow()]||{n:''},p=X.hp/X.max*100;
  const miles=SB_MILE.map(([n,lab,f])=>{const r=f(),ok=X.mile[n];return`<div class="sbm ${ok?'ok':X.kills>=n?'ok':''}"><b>${ok?'✅':'🏅'} ${lab}</b><span>${r.gems?GEM+r.gems:''}${r.shard?' '+SHARD+r.shard:''}</span></div>`}).join('');
  return`<div class="card sbcard se-${seasonNow()}"><div class="sbart">${monArt(s.sh,s.h,true)}</div><div class="sbtt"><div class="h" style="margin:0">${s.ic} ${esc(s.n)}</div><div class="muted" style="font-size:12.5px">Boss de saison · ${se.n} · niveau ${X.l}</div></div>
   <p style="font-size:13.5px;margin:8px 0">${esc(s.d)}</p>
   <div class="bar sbhp"><i style="width:${p.toFixed(1)}%"></i></div><div class="muted" style="font-size:12px;margin-top:3px">${fmt(X.hp)} / ${fmt(X.max)} PV · ${s.sk.n}</div>
   <div class="row" style="margin-top:10px;gap:8px;align-items:center"><button class="btn p" data-a="sbgo" ${X.at>0?'':'disabled'}>⚔️ Attaquer (${X.at}/3)</button><span class="muted" style="font-size:12px">Recharge à minuit · équipe Aventure</span></div></div>
   <div class="card"><div class="h3" style="margin:0">🏆 Paliers de la saison</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">${X.kills} victoire${X.kills>1?'s':''} · le boss change à chaque saison et les paliers repartent à zéro.</p><div class="sbms">${miles}</div></div>`}
{const pe=pEvents;pEvents=function(){if(UI.lz&&UI.lz.event==='sboss'&&sbDef())return`<div class="stack">${zoneBar('event','sboss')}${sbPage()}</div>`;return pe.apply(this,arguments)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="sbgo"]');if(!t)return;e.preventDefault();e.stopPropagation();SBX.go=true;SBX.active=false;try{startBattle('event')}finally{SBX.go=false}},true);
/* le bâtiment : un portail de pierre aux couleurs de la saison */
const SBCOL={automne:['#ff8a2a','#c8401a'],hiver:['#8ad8ff','#3a7ad8'],printemps:['#ff9ad0','#c050a0'],ete:['#ffd84a','#ff6a1a']};
function sbBuilding(){const c=SBCOL[seasonNow()]||SBCOL.automne,O='stroke="#140c24" stroke-width="1.4"';
  return`<path d="M-40 0V-44Q-40 -76 0 -78Q40 -76 40 -44V0H26V-42Q26 -62 0 -63Q-26 -62 -26 -42V0Z" fill="#8a8098" ${O}/><path d="M-40 -20H-26M26 -20H40M-38 -44H-26M26 -44H38M-24 -66L-18 -58M24 -66L18 -58" stroke="#5a5068" stroke-width="1.2"/>
   <path d="M-26 0V-42Q-26 -62 0 -63Q26 -62 26 -42V0Z" fill="${c[1]}" opacity=".9"/><g><path d="M0 -32m-18 0a18 18 0 1 0 36 0a18 18 0 1 0 -36 0" fill="none" stroke="${c[0]}" stroke-width="3" stroke-dasharray="8 6"/><path d="M0 -32m-10 0a10 10 0 1 0 20 0a10 10 0 1 0 -20 0" fill="none" stroke="#fff" stroke-width="2" stroke-dasharray="5 5" opacity=".8"/><animateTransform attributeName="transform" type="rotate" from="0 0 -32" to="360 0 -32" dur="6s" repeatCount="indefinite"/></g>
   <ellipse cx="-6" cy="-36" rx="3" ry="2" fill="#fff"><animate attributeName="opacity" values="1;1;0;1" dur="4s" repeatCount="indefinite"/></ellipse><ellipse cx="6" cy="-36" rx="3" ry="2" fill="#fff"><animate attributeName="opacity" values="1;1;0;1" dur="4s" repeatCount="indefinite"/></ellipse>
   <path d="M-48 0V-30" stroke="#5a3a1a" stroke-width="3"/><path d="M-48 -30Q-53 -38 -48 -46Q-43 -38 -48 -30Z" fill="${c[0]}"><animate attributeName="d" values="M-48 -30Q-53 -38 -48 -46Q-43 -38 -48 -30Z;M-48 -30Q-54 -39 -47 -48Q-43 -39 -48 -30Z;M-48 -30Q-53 -38 -48 -46Q-43 -38 -48 -30Z" dur=".6s" repeatCount="indefinite"/></path>
   <path d="M48 0V-30" stroke="#5a3a1a" stroke-width="3"/><path d="M48 -30Q43 -38 48 -46Q53 -38 48 -30Z" fill="${c[0]}"><animate attributeName="d" values="M48 -30Q43 -38 48 -46Q53 -38 48 -30Z;M48 -30Q42 -39 49 -48Q53 -39 48 -30Z;M48 -30Q43 -38 48 -46Q53 -38 48 -30Z" dur=".7s" repeatCount="indefinite"/></path>
   <path d="M-46 0H46" stroke="#140c24" stroke-width="2"/>`}
try{const s=sbDef();if(s)evB.sboss={b:sbBuilding,sn:'Boss',ic:s.ic,n:'Antre du boss de saison',d:s.sh+' t\'attend',bh:80}}catch(e){}
/* les illustrations des 4 boss */
MONS['Sylvaroc']=()=>{const O='#170f2a';return`<path d="M18 100Q22 70 30 58Q40 46 50 46Q60 46 70 58Q78 70 82 100Z" fill="#6a4426" stroke="${O}" stroke-width="1.8"/><path d="M36 100Q38 80 42 70M64 100Q62 80 58 70M50 100V74" stroke="#4a2a14" stroke-width="2" fill="none"/>
 <path d="M30 60Q10 54 8 34Q16 40 22 38Q14 26 20 14Q28 26 34 30Q34 16 44 8Q46 22 50 26Q54 22 56 8Q66 16 66 30Q72 26 80 14Q86 26 78 38Q84 40 92 34Q90 54 70 60Z" fill="#d8641e" stroke="${O}" stroke-width="1.8"/><path d="M22 38Q36 40 40 30M78 38Q64 40 60 30M50 26V40" stroke="#a83a12" stroke-width="1.6" fill="none"/>
 <circle cx="20" cy="26" r="5" fill="#ffb03a" stroke="${O}"/><circle cx="82" cy="24" r="5" fill="#c8401a" stroke="${O}"/><circle cx="50" cy="14" r="4" fill="#ffd84a" stroke="${O}"/>
 <path d="M38 62Q44 58 46 64Q42 66 38 62ZM62 62Q56 58 54 64Q58 66 62 62Z" fill="#ffe14a" stroke="${O}" stroke-width="1.2"/><path d="M40 78Q50 84 60 78Q56 74 50 76Q44 74 40 78Z" fill="#2a140a" stroke="${O}"/>
 <path d="M30 66Q16 72 12 86M70 66Q84 72 88 86" stroke="#6a4426" stroke-width="6" stroke-linecap="round" fill="none"/><path d="M30 66Q16 72 12 86M70 66Q84 72 88 86" stroke="${O}" stroke-width="1" fill="none" opacity=".5"/>
 <path d="M6 40l4 -4l3 5zM92 48l3 -5l3 4zM14 70l4 -3l2 5z" fill="#ff8a2a" stroke="${O}" stroke-width=".8"/>`};
MONS['Givrelle']=()=>{const O='#170f2a';return`<path d="M16 100Q24 60 50 54Q76 60 84 100Z" fill="#8ac8f0" stroke="${O}" stroke-width="1.8"/><path d="M50 56L42 100M50 56L58 100" stroke="#e8f6ff" stroke-width="2"/>
 <path d="M28 62Q10 70 6 92L18 86L16 98Q30 82 32 68Z" fill="#c8ecff" stroke="${O}" stroke-width="1.4"/><path d="M72 62Q90 70 94 92L82 86L84 98Q70 82 68 68Z" fill="#c8ecff" stroke="${O}" stroke-width="1.4"/>
 <ellipse cx="50" cy="38" rx="15" ry="17" fill="#eef6ff" stroke="${O}" stroke-width="1.6"/><path d="M34 34Q32 14 50 12Q68 14 66 34Q60 24 50 24Q40 24 34 34Z" fill="#f4fbff" stroke="${O}" stroke-width="1.4"/>
 <path d="M34 22L30 4L40 16L44 0L50 14L56 0L60 16L70 4L66 22Q50 16 34 22Z" fill="#8ad8ff" stroke="${O}" stroke-width="1.4"/><circle cx="50" cy="12" r="2.6" fill="#fff"/>
 <path d="M42 38q3 -3 6 0M52 38q3 -3 6 0" stroke="#3a7ad8" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M46 47q4 2 8 0" stroke="#3a5a9a" stroke-width="1.4" fill="none"/>
 <g fill="#fff" stroke="#8ad8ff" stroke-width=".8"><path d="M14 20l2 -6l2 6l6 2l-6 2l-2 6l-2 -6l-6 -2z"/><path d="M84 30l1.5 -4l1.5 4l4 1.5l-4 1.5l-1.5 4l-1.5 -4l-4 -1.5z"/><path d="M80 8l1 -3l1 3l3 1l-3 1l-1 3l-1 -3l-3 -1z"/></g>`};
MONS['Floraë']=()=>{const O='#170f2a';return`<path d="M50 100V60" stroke="#3a7a2a" stroke-width="7"/><path d="M50 100V60" stroke="${O}" stroke-width="1" opacity=".4"/>
 <path d="M50 86Q24 90 10 76Q30 70 50 80ZM50 76Q76 80 90 66Q70 62 50 70Z" fill="#4aa040" stroke="${O}" stroke-width="1.4"/>
 <path d="M14 98Q6 80 18 66M86 98Q94 80 82 66" stroke="#2a6a2a" stroke-width="3" fill="none"/><path d="M14 80l-4 -2M16 72l-4 -3M86 80l4 -2M84 72l4 -3" stroke="${O}" stroke-width="1.4"/>
 ${[0,45,90,135,180,225,270,315].map(a=>`<ellipse cx="50" cy="20" rx="10" ry="17" fill="${a%90?'#ff6ab0':'#ff9ad0'}" stroke="${O}" stroke-width="1.4" transform="rotate(${a} 50 38)"/>`).join('')}
 <circle cx="50" cy="38" r="14" fill="#ffd84a" stroke="${O}" stroke-width="1.6"/><path d="M43 36l4 2l-4 2zM57 36l-4 2l4 2z" fill="#c8401a"/><path d="M43 45Q50 50 57 45L54 47L52 45L50 48L48 45L46 47Z" fill="#7a1a3a" stroke="${O}" stroke-width="1"/>`};
MONS['Solarion']=()=>{const O='#170f2a';return`<circle cx="50" cy="44" r="40" fill="#ffd84a" opacity=".18"/>
 <path d="M50 52Q20 30 4 40Q14 46 10 54Q22 50 26 58Q14 64 16 72Q30 64 44 64Z" fill="#ff6a1a" stroke="${O}" stroke-width="1.6"/><path d="M50 52Q80 30 96 40Q86 46 90 54Q78 50 74 58Q86 64 84 72Q70 64 56 64Z" fill="#ff6a1a" stroke="${O}" stroke-width="1.6"/>
 <path d="M50 52Q26 40 12 44M50 52Q74 40 88 44" stroke="#ffd84a" stroke-width="2" fill="none"/>
 <path d="M50 100Q40 86 44 74Q36 82 34 92Q30 80 40 66L60 66Q70 80 66 92Q64 82 56 74Q60 86 50 100Z" fill="#ffb03a" stroke="${O}" stroke-width="1.4"/>
 <ellipse cx="50" cy="56" rx="11" ry="15" fill="#ff8a2a" stroke="${O}" stroke-width="1.6"/><circle cx="50" cy="32" r="10" fill="#ffb03a" stroke="${O}" stroke-width="1.6"/>
 <path d="M44 24Q42 8 50 2Q48 14 54 10Q52 18 58 16Q54 24 56 26Z" fill="#ffd84a" stroke="${O}" stroke-width="1.2"/><path d="M58 32L68 35L58 37Z" fill="#ffe14a" stroke="${O}"/><circle cx="53" cy="30" r="2" fill="#140c24"/><circle cx="53.6" cy="29.4" r=".7" fill="#fff"/>`};

/* ---------- notes de mise à jour ---------- */
PATCH.unshift({v:26.7,d:'19 octobre 2026',t:'Expéditions et boss de saison',items:[
 "🗺️ <b>Table d'expéditions</b> pour tout le monde, dans le <b>Grand hall de ta guilde</b> et au centre de la Capitale d'Éther : envoie tes héros en mission dans les 8 royaumes, jusqu'à 3 en même temps (4 pour la guilde qui tient la Capitale). Or, gemmes, équipement et parfois un éclat légendaire au retour.",
 "🎯 Chaque mission a un bonus (classe ou élément) : les héros qui collent au bonus augmentent les chances de réussite. Nouvelles missions chaque jour.",
 "🍂 <b>Boss de saison</b> : un boss qui change à chaque saison. Cet automne, affronte Sylvaroc, l'Ent des Feuilles Mortes ! 3 attaques par jour, des niveaux sans fin et des paliers de récompenses.",
 "🍻 Le Grand hall de guilde devient une <b>salle des banquets</b> : tes compagnons de guilde autour de la table, leurs derniers messages en bulles, et un bouton « Trinquer » chaque jour (+20 pièces de guilde).",
 "🕊️ La Guerre des Cieux est terminée : la Capitale reste à la guilde gagnante, avec sa salle du trône.",
 "🦉 <b>Tutoriel avec Plume</b>, la mascotte du royaume : le but du jeu et l'essentiel pour avancer, flèches à l'appui. Revois-le quand tu veux avec 📖 Tuto.",
 "🌅 Nouvel écran de chargement : le royaume au lever du jour, avec 5 héros différents à chaque fois."]});
