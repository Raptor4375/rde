
/* ================= V400 : le casino de Fortuna devient « Les Attractions de Fortuna » =================
   Plus aucune mise ni jeu de hasard payant : des jeux d'adresse (stand de tir, memory, marteau de force)
   et un tour de grande roue gratuit par jour rapportent des tickets, à échanger au même comptoir.
   Les anciens jetons deviennent des tickets (1 pour 1). Mêmes dates : du 13 au 20 de chaque mois. */
(function(){try{
const FF_MAX=5,FFN="Les Attractions de Fortuna";
const TKI=(c='#ff5d8f')=>`<svg class="chipic tkic" viewBox="0 0 24 24" aria-hidden="true"><g transform="rotate(-14 12 12)"><path d="M2.5 7.6Q2.5 6.2 3.9 6.2H20.1Q21.5 6.2 21.5 7.6V9.7A2.3 2.3 0 0 0 21.5 14.3V16.4Q21.5 17.8 20.1 17.8H3.9Q2.5 17.8 2.5 16.4V14.3A2.3 2.3 0 0 0 2.5 9.7Z" fill="${c}" stroke="#140c24" stroke-width="1.3"/><path d="M7.6 7V17" stroke="#fff" stroke-width="1.1" stroke-dasharray="1.6 1.3" opacity=".85"/><path d="M14.6 8.6l1.05 2.1 2.3.33-1.67 1.62.4 2.3-2.08-1.1-2.06 1.1.39-2.3-1.67-1.62 2.3-.33z" fill="#fff6c0" stroke="#140c24" stroke-width=".6"/></g></svg>`;
window.TKI=TKI;

/* ---------- état : conversion des jetons, compteurs du jour ---------- */
{const C0=CAS;CAS=function(){const C=C0.apply(this,arguments);try{
  if(!C.ff){C.ff=1;C.oldWag=C.wag||0;C.oldMc=C.mc||{};C.wag=0;C.mc={};C.bj=null;C.ffNew=1}
  if(!C.fp||C.fp.d!==today())C.fp={d:today(),t:0,m:0,f:0};if(!C.best)C.best={t:0,m:0,f:0}}catch(e){}return C}}
casAdd=function(n,why){if(!casOn())return;const C=CAS();C.j+=n;C.wag+=n;if(why)toast(`🎟️ +${fmt(n)} tickets de fête (${why})`)};
{const q0=q;q=function(k,n=1){q0.apply(this,arguments);try{if(casOn()&&k==='pull')CAS().wag+=25*(n||1)}catch(e){}}}
function ffEarn(n,src){const C=CAS();n=Math.max(0,Math.round(n));C.j+=n;C.wag+=n;if(src)casQ('tk',n);return n}

/* défis du jour et paliers : plus rien ne dépend d'une mise */
CQ.length=0;CQ.push({k:'tir',n:'Jouer 3 parties au stand de tir',g:3,rw:400},{k:'mem',n:'Terminer 2 parties de Memory',g:2,rw:400},{k:'frp',n:'Jouer 3 parties au marteau de force',g:3,rw:400},
  {k:'tk',n:'Gagner 1 500 tickets dans les attractions',g:1500,rw:500},{k:'win',n:'Gagner 5 combats',g:5,rw:500},{k:'pull',n:'Faire 3 invocations',g:3,rw:300});
CM.length=0;CM.push([3000,'150 gemmes',()=>{S.gems+=150}],[10000,'Coffre épique',()=>dropItem(3)],[25000,'3 éclats légendaires',()=>{S.shards+=3}],
  [50000,'Photo de profil « Fortuna VIP »',()=>{if(avHas('fortuna_vip')){S.gems+=300;toast('Photo déjà obtenue : +300 gemmes à la place')}else avGive('fortuna_vip')}],
  [90000,"500 gemmes + 5 tickets d'invocation",()=>{S.gems+=500;INV().pt+=5}],[150000,'Coffre céleste',()=>dropItem(4)]);
try{const f=CSHOP.find(x=>x.k==='fo');if(f)f.n=(HEROES[FORTUNA].n||'Fortuna');const a=CSHOP.find(x=>x.k==='avg');if(a)a.n='Photo « Fortuna Dorée »'}catch(e){}
try{AVX.fortuna_vip.how=FFN+' : 50 000 tickets gagnés';AVX.fortuna_gold.n='Fortuna Dorée';AVX.fortuna_gold.how=FFN+' : comptoir'}catch(e){}
casShopBuy=function(k){const C=CAS(),x=CSHOP.find(y=>y.k===k);if(!x||!casOn())return;const n=C.shop[k]||0;if(n>=x.lim||(x.own&&x.own()))return;if(C.j<x.c)return toast('Pas assez de tickets.');
  C.j-=x.c;C.shop[k]=n+1;x.give();save();render();try{UIS.buy()}catch(e){}if(!x.own)toast('Échangé : '+x.n)};

/* ---------- dessins ---------- */
function wheelSvgArt(cx,cy,r,o={}){const n=o.n||8,cols=o.cols||['#ff5d8f','#ffd84a','#58e4d3','#b77dff','#ff8f3f','#4da3ff','#9ae05a','#ff6a6a'];let s='';
  s+=`<path d="M${cx} ${cy}L${cx-r*.62} ${cy+r+14}M${cx} ${cy}L${cx+r*.62} ${cy+r+14}" stroke="#6a4a8a" stroke-width="${o.leg||5}" stroke-linecap="round"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e8d8ff" stroke-width="${o.rim||3}"/><circle cx="${cx}" cy="${cy}" r="${r*.86}" fill="none" stroke="#b8a0e0" stroke-width="1.2"/>`;
  for(let i=0;i<n*2;i++){const a=i*Math.PI/n;s+=`<path d="M${cx} ${cy}L${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}" stroke="#cbb8f0" stroke-width="1"/>`}
  if(o.bulbs!==false)for(let i=0;i<24;i++){const a=i*Math.PI/12;s+=`<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="${o.br||1.8}" fill="${i%2?'#ffd84a':'#fff6c0'}"/>`}
  for(let i=0;i<n;i++){const a=-Math.PI/2+i*2*Math.PI/n,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a),w=o.cw||14,h=o.ch||11;
    s+=`<path d="M${x.toFixed(1)} ${y.toFixed(1)}v3" stroke="#e8d8ff" stroke-width="1.2"/><rect x="${(x-w/2).toFixed(1)}" y="${(y+3).toFixed(1)}" width="${w}" height="${h}" rx="3" fill="${cols[i%cols.length]}" stroke="#140c24" stroke-width="1.1"/><rect x="${(x-w/2+2).toFixed(1)}" y="${(y+5).toFixed(1)}" width="${w-4}" height="${(h*.4).toFixed(1)}" rx="1.5" fill="#fff" opacity=".45"/>`}
  s+=`<circle cx="${cx}" cy="${cy}" r="${r*.12}" fill="#ffd84a" stroke="#140c24" stroke-width="1.2"/>`;return s}
function ffArt(){const R=rng(913);let st='';for(let k=0;k<30;k++)st+=`<circle cx="${(R()*400).toFixed(0)}" cy="${(R()*110).toFixed(0)}" r="${(R()*1.3+.4).toFixed(1)}" fill="#fff6e0" opacity="${(R()*.5+.25).toFixed(2)}"/>`;
  let gar='';for(let x=6;x<400;x+=20){gar+=`<circle cx="${x}" cy="${(9+Math.sin(x/32)*3).toFixed(1)}" r="3" fill="${['#ff5d8f','#ffd84a','#58e4d3','#fff6c0'][(x/20|0)%4]}" stroke="#3a1050" stroke-width=".8"/>`}
  const P=nestSvg(portrait(HEROES[FORTUNA]),262,26,112,112);
  const tent=(x,w,c1,c2)=>{let s=`<path d="M${x} 176V${150}H${x+w}V176Z" fill="${c2}" stroke="#140c24" stroke-width="1.2"/>`;for(let i=0;i<w;i+=w/6)s+=i/(w/6)%2<1?`<path d="M${x+i} 176V150H${(x+i+w/12).toFixed(1)}V176Z" fill="${c1}"/>`:'';
    s+=`<path d="M${x-6} 152L${x+w/2} 118L${x+w+6} 152Z" fill="${c1}" stroke="#140c24" stroke-width="1.2"/><path d="M${x+w/2} 118L${x+w*.2} 152M${x+w/2} 118L${x+w*.8} 152" stroke="${c2}" stroke-width="5"/><path d="M${x+w/2} 118V108" stroke="#140c24" stroke-width="1.2"/><path d="M${x+w/2} 108l9 3-9 3z" fill="#ffd84a" stroke="#140c24" stroke-width=".8"/>`;return s};
  return`<svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><defs><linearGradient id="ffag" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1e0a3e"/><stop offset=".6" stop-color="#6a1a6a"/><stop offset="1" stop-color="#ff7a5a"/></linearGradient><radialGradient id="ffap" cx=".8" cy=".35" r=".55"><stop offset="0" stop-color="#ff9ac8" stop-opacity=".5"/><stop offset="1" stop-color="#ff9ac8" stop-opacity="0"/></radialGradient><clipPath id="ffcl"><circle cx="318" cy="82" r="54"/></clipPath><linearGradient id="ffvg" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#140820" stop-opacity=".7"/><stop offset=".55" stop-color="#140820" stop-opacity="0"/></linearGradient><linearGradient id="ffgr" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a1a4a"/><stop offset="1" stop-color="#140820"/></linearGradient></defs>
  <rect width="400" height="200" fill="url(#ffag)"/>${st}<rect width="400" height="200" fill="url(#ffap)"/>
  <g opacity=".6">${wheelSvgArt(222,104,60,{cw:13,ch:10})}</g><g opacity=".75">${tent(150,44,'#d1263b','#fff6e0')}</g><rect width="400" height="200" fill="url(#ffvg)"/>
  <path d="M0 176Q200 160 400 176L400 200L0 200Z" fill="url(#ffgr)" stroke="#ffd84a" stroke-width="1.5"/>
  <circle cx="318" cy="82" r="58" fill="#ff9ac8" opacity=".25"/><g clip-path="url(#ffcl)">${P}</g><circle cx="318" cy="82" r="54" fill="none" stroke="#ffd84a" stroke-width="4"/><circle cx="318" cy="82" r="58.5" fill="none" stroke="#3a1050" stroke-width="1.5"/>
  ${[[218,186,'#ff5d8f'],[352,184,'#58e4d3'],[384,172,'#ffd84a']].map(([x,y,c])=>`<g transform="translate(${x} ${y})"><path d="M0 0V-18" stroke="#fff" stroke-width=".8"/><ellipse cx="0" cy="-24" rx="7" ry="8.5" fill="${c}" stroke="#140c24" stroke-width="1"/><ellipse cx="-2.2" cy="-27" rx="1.8" ry="2.6" fill="#fff" opacity=".6"/></g>`).join('')}
  <g transform="translate(318 22) scale(.8)">${FRV2.A.crownL('#ffd84a','#ff5d8f','#58e4d3')}</g>${gar}</svg>`}
window.ffArt=ffArt;
/* le bâtiment de la Fête foraine */
try{LB.fete=()=>{let s='';const cx=0,cy=-56,r=30;
  s+=`<path d="M${cx} ${cy}L-20 -14M${cx} ${cy}L20 -14" stroke="${LBO}" stroke-width="4.6" stroke-linecap="round"/><path d="M${cx} ${cy}L-20 -14M${cx} ${cy}L20 -14" stroke="#8a6ab8" stroke-width="2.8" stroke-linecap="round"/>`;
  s+=`<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${LBO}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e8d8ff" stroke-width="2.2"/>`;
  for(let i=0;i<8;i++){const a=i*Math.PI/4;s+=`<path d="M${cx} ${cy}L${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}" stroke="#cbb8f0" stroke-width="1"/>`}
  for(let i=0;i<16;i++){const a=i*Math.PI/8;s+=`<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="1.3" fill="${i%2?'#ffd84a':'#fff6c0'}"/>`}
  const cols=['#ff5d8f','#ffd84a','#58e4d3','#b77dff','#ff8f3f','#4da3ff','#9ae05a','#ff6a6a'];
  for(let i=0;i<8;i++){const a=-Math.PI/2+i*Math.PI/4,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);s+=`<rect x="${(x-4.5).toFixed(1)}" y="${(y+1).toFixed(1)}" width="9" height="7" rx="2" fill="${cols[i]}" stroke="${LBO}" stroke-width=".9"/>`}
  s+=`<circle cx="${cx}" cy="${cy}" r="3.4" fill="url(#lzGold)" ${OL}/>`;
  s+=zF(`M-40 0V-22H40V0Z`,'#fff6e0')+[-40,-24,-8,8,24].map(x=>`<path d="M${x} 0V-22H${x+8}V0Z" fill="#d1263b"/>`).join('')+zO(`M-40 0V-22H40V0Z`,'url(#lzSh)');
  s+=zF(`M-44 -22H44V-31Q0 -35 -44 -31Z`,'#3a1050');let b='';for(let x=-40;x<=40;x+=8)b+=`<circle cx="${x}" cy="-32" r="1.7" fill="${Math.round(x/8)%2?'#ffd84a':'#fff6c0'}"/>`;s+=b;
  s+=`<text x="0" y="-24.4" text-anchor="middle" font-family="'Lilita One',sans-serif" font-size="7.4" fill="#ffd84a" stroke="${LBO}" stroke-width=".45">FORTUNA</text>`;
  s+=`<path d="M-9 0V-13A9 9 0 0 1 9 -13V0Z" fill="#2a1030" ${OL}/><path d="M-9 0V-13A9 9 0 0 1 9 -13" fill="none" stroke="url(#lzGold)" stroke-width="1.5"/>`;
  for(const [x,c] of[[-48,'#ff5d8f'],[48,'#58e4d3']])s+=`<path d="M${x} 0V-14" stroke="${LBO}" stroke-width=".8"/><ellipse cx="${x}" cy="-19" rx="5" ry="6" fill="${c}" ${OL}/>`;
  return s};
 Object.assign(evB.cas,{b:LB.fete,sn:'Attractions',ic:'🎡',n:FFN,d:'Tir, memory, marteau, grande roue',bh:92})}catch(e){console.warn('ff lobby',e)}
try{const o=lbAnimFor;lbAnimFor=function(p,E){if(p&&p.k==='cas')return LBA.glints(76,80,3);return o.apply(this,arguments)}}catch(e){}

/* ---------- la page de l'événement ---------- */
const FFG={t:{ic:'🎯',n:'Stand de tir',d:'Touche les canards qui défilent, les dorés valent triple. Attention aux chats noirs de Fortuna !',bg:'linear-gradient(135deg,#2a7ad1,#14306a)'},
  m:{ic:'🧩',n:'Memory',d:'Retrouve les 8 paires le plus vite possible, avec le moins de coups.',bg:'linear-gradient(135deg,#9a3ad1,#3a1060)'},
  f:{ic:'🔨',n:'Marteau de force',d:'Frappe quand l\'aiguille est au centre. 5 coups : fais sonner la cloche !',bg:'linear-gradient(135deg,#e0402a,#6a1010)'}};
function ffLeft(g){const C=CAS();return Math.max(0,FF_MAX-(C.fp[g]||0))}
function ffGames(){const C=CAS(),spun=C.gift===today();
  const wheel=`<div class="ffa ffw0"><div class="ffai" style="background:linear-gradient(135deg,#ffb21a,#c0306a)"><svg viewBox="0 0 100 100" aria-hidden="true">${wheelSvgArt(50,44,32,{cw:10,ch:8,br:1.3,leg:3.4})}</svg></div><div class="ffat"><b>🎡 Grande roue</b><small>Un tour gratuit par jour : la cabine qui s'arrête en bas t'offre son cadeau.</small><button class="btn sm ${spun?'':'p'}" data-a="ffopen" data-v="w">${spun?'✓ Revenez demain':'Faire mon tour gratuit'}</button></div></div>`;
  return`<div class="ffgrid">${wheel}${['t','m','f'].map(g=>{const x=FFG[g],l=ffLeft(g);return`<div class="ffa"><div class="ffai" style="background:${x.bg}"><span>${x.ic}</span></div><div class="ffat"><b>${x.ic} ${x.n}</b><small>${x.d}</small><small class="ffmeta">${l>0?`Parties avec tickets : <b>${l}/${FF_MAX}</b> aujourd'hui`:'Plus de tickets aujourd\'hui : tu peux jouer pour le plaisir'}${C.best[g]?` · Record : ${TKI()} ${fmt(C.best[g])}`:''}</small><button class="btn sm ${l>0?'p':''}" data-a="ffopen" data-v="${g}">Jouer</button></div></div>`}).join('')}</div>
   <p class="muted" style="font-size:12px;margin:0">Tu gagnes aussi des tickets en jouant au reste du jeu : +60 par victoire de combat, +120 par boss attaqué, +25 par invocation.</p>`}
casPage=function(){const C=CAS(),on=casOn();let sub=UI.csub;if(!['jeux','shop','q'].includes(sub))sub=UI.csub='jeux';
  if(C.ffNew&&on){C.ffNew=0;setTimeout(()=>{try{toast('🎟️ Tes jetons sont devenus des tickets de fête !');save()}catch(e){}},400)}
  const ban=`<div class="cban ffban">${ffArt()}<div class="ctx"><span class="tag" style="--rc:#ff9ac8;background:rgba(0,0,0,.5)">ÉVÉNEMENT</span><div class="h">🎡 ${FFN}</div><p>Fortuna a troqué ses tables de jeu contre des stands de fête ! Gagne des tickets grâce à ton adresse et échange-les contre des récompenses exclusives.</p><div class="row" style="gap:8px;flex-wrap:wrap"><span class="cur">${TKI()}<span>${fmt(C.j)}</span></span><span style="font-size:12.5px;text-shadow:0 1px 2px #000">${on?'Ferme dans '+dur(CAS_END-Date.now()):'Fermé'}</span></div></div></div>`;
  const tabs=[['jeux','🎡 Attractions',C.gift!==today()?1:0],['shop','🎁 Comptoir',casShopN()],['q','📜 Défis',casQN()]];
  const chips=`<div class="chips">${tabs.map(([k,n,b])=>`<button class="chip ${sub===k?'on':''}" data-a="csub" data-v="${k}">${n}${b?` <span class="pdot">${b}</span>`:''}</button>`).join('')}</div>`;
  let body='';
  if(sub==='jeux')body=ffGames();
  else if(sub==='shop')body=`<div class="card"><div class="h3" style="margin:0">Comptoir de Fortuna</div><p class="muted" style="margin:4px 0 0;font-size:12.5px">Échange tes tickets contre des récompenses. Les objets marqués EXCLU ne s'obtiennent qu'ici.</p></div><div class="cshop">${CSHOP.map(x=>{const n=C.shop[x.k]||0,own=x.own&&x.own(),full=n>=x.lim||own,can=!full&&C.j>=x.c;
      const art=x.fav?`<div class="art" style="overflow:visible;background:none"><span class="fav frm-tableroyale" style="display:block;width:50px;height:50px;border-radius:12px;position:relative;overflow:visible">${myAv()}</span></div>`:`<div class="art">${x.art()}</div>`;
      return`<div class="csi ${x.ex?'ex':''}">${x.ex?'<span class="exb">EXCLU</span>':''}${art}<b>${x.n}</b>${x.d?`<small>${x.d}</small>`:''}<small>${own?'Déjà obtenu':`Limite ${n}/${x.lim}`}</small><button class="btn sm ${can?'p':''}" data-a="cshop" data-v="${x.k}" ${can?'':'disabled'}>${full?(own?'Obtenu':'Épuisé'):`${TKI()} ${fmt(x.c)}`}</button></div>`}).join('')}</div>`;
  else{const qd=`<div class="h3" style="margin:0">Défis du jour</div><div class="list">${CQ.map(x=>{const p=Math.min(x.g,C.q.p[x.k]||0),c=C.q.c[x.k],ok=p>=x.g;return`<div class="card q"><div><b>${x.n}</b> <span class="muted" style="font-size:12.5px">${fmt(p)}/${fmt(x.g)}</span></div><span class="r">${TKI()} ${fmt(x.rw)}</span><div class="bar"><i style="width:${p/x.g*100}%;background:linear-gradient(90deg,#ff5d8f,#ffd84a)"></i></div><button class="btn sm ${ok&&!c?'p':''}" data-a="ffq" data-v="${x.k}" ${ok&&!c?'':'disabled'}>${c?'✓ Réclamé':ok?'Réclamer':'En cours'}</button></div>`}).join('')}</div>`;
    body=`${qd}<div class="h3" style="margin:4px 0 0">Paliers de tickets</div><p class="muted" style="font-size:12.5px;margin:0">Tickets gagnés depuis le début : <b style="color:var(--fg)">${fmt(C.wag)}</b>. Dépenser tes tickets au comptoir ne fait pas reculer ce compteur.</p><div class="list">${CM.map(([n,lab],i)=>{const ok=C.wag>=n,c=C.mc[i];return`<div class="card q"><div><b>${fmt(n)} tickets gagnés</b> <span class="muted" style="font-size:12.5px">· ${lab}</span></div><span class="r">${ok?'✅':'🔒'}</span><div class="bar"><i style="width:${Math.min(100,C.wag/n*100)}%;background:linear-gradient(90deg,#ffd84a,#fff6c0)"></i></div><button class="btn sm ${ok&&!c?'p':''}" data-a="cm" data-v="${i}" ${ok&&!c?'':'disabled'}>${c?'✓ Réclamé':ok?'Réclamer':'En cours'}</button></div>`}).join('')}</div>`}
  return`${ban}${chips}${body}`};
{const et=evTabs;evTabs=function(){return et.apply(this,arguments).map(x=>x&&x[0]==='cas'?['cas','🎡 Attractions',x[2]]:x)}}

/* ---------- les jeux ---------- */
let G=null;const BOX=()=>document.getElementById('ffbox'),ST=t=>{const e=document.getElementById('ffst');if(e)e.innerHTML=t};
const sfx=(k,a)=>{try{if(!cSnd.ok())return;if(k==='pop')SND.wood(AU.F.v,NOW(),a||2400);else if(k==='win')UIS.coin(true);else if(k==='big')UIS.ach();else if(k==='bad')UIS.nope();else if(k==='flip')cSnd.card(0)}catch(e){}};
function ffShell(g,inner){const x=FFG[g];return`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="ffm"><div class="ffhd"><b>${x.ic} ${x.n}</b><span class="ffst" id="ffst"></span></div><div class="ffbox ff-${g}" id="ffbox">${inner||''}</div><p class="muted ffinfo" style="font-size:12px;margin:8px 0 0">${ffLeft(g)>0?`Parties avec tickets aujourd'hui : ${ffLeft(g)}/${FF_MAX}`:"Plus de tickets pour ce jeu aujourd'hui : cette partie est pour le plaisir (les défis avancent quand même)."}</p></div>`}
function ffIntro(g){const x=FFG[g];return`<div class="ffov"><div class="ffbig">${x.ic}</div><p>${x.d}</p><button class="btn p" data-a="ffgo" data-v="${g}">C'est parti !</button></div>`}
function ffOpen(g){G=null;if(!casOn())return toast('Les attractions sont fermées.');if(g==='w')return ffWheel();modal(ffShell(g,ffIntro(g)));ST('')}
function ffEnd(g,score,raw,lab){const C=CAS();const ok=ffLeft(g)>0;let tk=0;if(ok){C.fp[g]=(C.fp[g]||0)+1;tk=ffEarn(raw,1)}
  const rec=raw>(C.best[g]||0);if(rec)C.best[g]=Math.round(raw);casQ({t:'tir',m:'mem',f:'frp'}[g]);save();UI.ffDirty=1;G=null;
  if(tk>0)sfx(tk>=600?'big':'win');
  const b=BOX();if(!b)return;b.insertAdjacentHTML('beforeend',`<div class="ffov ffres"><div class="ffbig">${tk>=600?'🏆':tk>=300?'🎉':'👏'}</div><div class="h3" style="margin:0">${lab}</div>${ok?`<div class="ffwin">${TKI()} +${fmt(tk)} tickets</div>`:`<div class="muted">Partie pour le plaisir (valeur : ${fmt(Math.round(raw))} tickets)</div>`}${rec?'<div class="ffrec">✨ Nouveau record !</div>':''}<div class="row" style="gap:8px;justify-content:center"><button class="btn p" data-a="ffopen" data-v="${g}">Rejouer</button><button class="btn" data-a="close">Fermer</button></div></div>`);
  const i=document.querySelector('.ffinfo');if(i)i.textContent=ffLeft(g)>0?`Parties avec tickets aujourd'hui : ${ffLeft(g)}/${FF_MAX}`:"Plus de tickets pour ce jeu aujourd'hui.";}

/* --- stand de tir --- */
const DUCK=(c,k)=>`<svg viewBox="0 0 60 56" aria-hidden="true"><path d="M30 40V56" stroke="#5a3a1a" stroke-width="4"/>${k==='c'?
  `<path d="M12 38Q8 18 14 6L22 16Q30 13 38 16L46 6Q52 18 48 38Q30 48 12 38Z" fill="#1a1426" stroke="#000" stroke-width="1.6"/><ellipse cx="23" cy="26" rx="4" ry="5" fill="#ffd84a"/><ellipse cx="37" cy="26" rx="4" ry="5" fill="#ffd84a"/><path d="M23 23v6M37 23v6" stroke="#000" stroke-width="1.6"/><path d="M27 33l3 2.4 3-2.4" fill="#ff8aa8" stroke="#000" stroke-width="1"/><path d="M8 30h10M8 35h10M42 30h10M42 35h10" stroke="#8a80a0" stroke-width=".9"/>`:
  `<ellipse cx="28" cy="31" rx="20" ry="11" fill="${c}" stroke="#140c24" stroke-width="1.6"/><path d="M14 28Q22 22 32 28" fill="none" stroke="#140c24" stroke-width="1.1" opacity=".5"/><circle cx="43" cy="16" r="9" fill="${c}" stroke="#140c24" stroke-width="1.6"/><path d="M50 15L59 18L50 21Z" fill="#ff8f3f" stroke="#140c24" stroke-width="1.1"/><circle cx="45" cy="14" r="2" fill="#140c24"/><circle cx="45.6" cy="13.4" r=".7" fill="#fff"/>${k==='g'?'<path d="M24 26l2 4 4.4.6-3.2 3 .8 4.4-4-2.1-4 2.1.8-4.4-3.2-3 4.4-.6z" fill="#fff6c0" stroke="#8a5a06" stroke-width=".8"/>':''}`}</svg>`;
function tirGo(){const b=BOX();if(!b)return;b.innerHTML=`<div class="fflane" style="top:22%"></div><div class="fflane" style="top:52%"></div><div class="fflane" style="top:82%"></div><div class="ffcurt"></div>`;
  const W=b.clientWidth,T0=performance.now(),D=20000;G={g:'t',sc:0,hit:0,next:0,last:0,live:new Set()};const g=G;ST(`⏱️ 20,0 · 🎯 0`);
  const spawn=(el)=>{const p=Math.min(1,(performance.now()-T0)/D),ln=ri(0,2),dir=ln===1?-1:1,r=Math.random(),k=r<.13?'g':r<.32?'c':'d';
    const e=document.createElement('button');e.className='ffd ffd-'+k;e.type='button';e.style.top=[6,36,66][ln]+'%';e.innerHTML=DUCK(k==='g'?'#ffd84a':['#fff','#9ae05a','#ff9ac8','#8ac8ff'][ri(0,3)],k);e.setAttribute('aria-label',k==='c'?'Chat noir':'Canard');
    el.appendChild(e);const dd=(3300-1500*p)*(k==='g'?.72:1)*(.9+Math.random()*.25);const a=e.animate([{transform:`translateX(${dir>0?-70:W+10}px)`},{transform:`translateX(${dir>0?W+10:-70}px)`}],{duration:dd,easing:'linear'});
    a.onfinish=()=>{e.remove();g.live.delete(e)};g.live.add(e);
    e.addEventListener('pointerdown',ev=>{ev.preventDefault();ev.stopPropagation();if(G!==g||e.dataset.h)return;e.dataset.h=1;a.pause();const v=k==='g'?3:k==='c'?-3:1;g.sc=Math.max(0,g.sc+v);if(v>0)g.hit++;
      e.classList.add('hit');sfx(v>0?'pop':'bad',v>2?3200:2400);const f=document.createElement('span');f.className='fffl '+(v>0?'':'neg');f.textContent=(v>0?'+':'')+v;const r1=e.getBoundingClientRect(),r0=el.getBoundingClientRect();f.style.left=(r1.left-r0.left+20)+'px';f.style.top=(r1.top-r0.top)+'px';el.appendChild(f);setTimeout(()=>f.remove(),700);setTimeout(()=>{e.remove();g.live.delete(e)},260)},{passive:false})};
  const tick=t=>{if(G!==g)return;const el=BOX();if(!el){G=null;return}const dt=t-T0;
    if(dt>=D){g.live.forEach(e=>{try{e.getAnimations().forEach(a=>a.pause())}catch(x){}});ST(`⏱️ 0,0 · 🎯 ${g.sc}`);return ffEnd('t',g.sc,Math.min(800,g.sc*20),`${g.sc} points · ${g.hit} canards touchés`)}
    if(t>=g.next){spawn(el);g.next=t+(560-220*Math.min(1,dt/D))*(.75+Math.random()*.5)}
    if(t-g.last>100){g.last=t;ST(`⏱️ ${((D-dt)/1000).toFixed(1).replace('.',',')} · 🎯 ${g.sc}`)}requestAnimationFrame(tick)};requestAnimationFrame(tick)}

/* --- memory --- */
const MEMS=['🎈','🍭','🎠','🧸','🍿','🎪','🌟','🍬'];
function memGo(){const b=BOX();if(!b)return;const deck=[...MEMS,...MEMS].map(v=>({v,r:Math.random()})).sort((a,c)=>a.r-c.r).map(x=>x.v);
  G={g:'m',deck,open:[],done:new Set(),mv:0,t0:0,lock:false};b.innerHTML=`<div class="ffmem">${deck.map((v,i)=>`<button class="ffc" data-a="ffc" data-v="${i}" aria-label="Carte"><span class="b">✦</span><span class="f">${v}</span></button>`).join('')}</div>`;ST('Coups : 0 · ⏱️ 0 s');
  const g=G;const tk=()=>{if(G!==g||!BOX())return;if(g.t0)ST(`Coups : ${g.mv} · ⏱️ ${Math.floor((performance.now()-g.t0)/1000)} s`);setTimeout(tk,500)};tk()}
function memFlip(i){const g=G;if(!g||g.g!=='m'||g.lock||g.done.has(i)||g.open.includes(i))return;const el=document.querySelectorAll('#ffbox .ffc')[i];if(!el)return;if(!g.t0)g.t0=performance.now();
  el.classList.add('on');sfx('flip');g.open.push(i);if(g.open.length<2)return;g.mv++;const [a,c]=g.open;const els=document.querySelectorAll('#ffbox .ffc');
  if(g.deck[a]===g.deck[c]){g.done.add(a);g.done.add(c);g.open=[];setTimeout(()=>{els[a].classList.add('ok');els[c].classList.add('ok');sfx('pop',3000)},180);
    if(g.done.size===16){const s=(performance.now()-g.t0)/1000;const raw=Math.max(150,Math.min(800,800-Math.max(0,g.mv-8)*30-Math.max(0,s-25)*4));ST(`Coups : ${g.mv} · ⏱️ ${Math.floor(s)} s`);G={g:'x'};setTimeout(()=>ffEnd('m',g.mv,raw,`${g.mv} coups en ${Math.floor(s)} s`),650)}}
  else{g.lock=true;setTimeout(()=>{if(G!==g)return;els[a].classList.remove('on');els[c].classList.remove('on');g.open=[];g.lock=false},780)}
  ST(`Coups : ${g.mv} · ⏱️ ${Math.floor((performance.now()-g.t0)/1000)} s`)}

/* --- marteau de force --- */
function frpGo(){const b=BOX();if(!b)return;
  b.innerHTML=`<div class="ffhm"><div class="fftw"><div class="ffbell">🔔</div><div class="ffsc">${[75,50,25].map(v=>`<i style="bottom:${v}%"><em>${v}</em></i>`).join('')}</div><div class="ffpk" id="ffpk"></div></div>
   <div class="ffhr"><div class="ffgg"><div class="ffgz"></div><div class="ffgp"></div><div class="ffcur" id="ffcur"></div></div><button class="btn p ffhit" data-a="ffhit">🔨 FRAPPE !</button><div class="ffhl" id="ffhl"></div></div></div>`;
  G={g:'f',n:0,tot:0,ph:Math.random()*6,lock:false,last:performance.now(),res:[]};const g=G;ST('Coup 1/5 · Total 0');
  const tick=t=>{if(G!==g)return;const c=document.getElementById('ffcur');if(!c){G=null;return}if(!g.lock){g.ph+=(t-g.last)/1000*(2.6+g.n*.75)}g.last=t;g.p=(1-Math.cos(g.ph))/2;c.style.left=(g.p*100).toFixed(2)+'%';requestAnimationFrame(tick)};requestAnimationFrame(tick)}
function frpHit(){const g=G;if(!g||g.g!=='f'||g.lock)return;g.lock=true;const d=Math.abs(g.p-.5);let f=d<.03?100:Math.round(100*Math.max(0,1-d*2.3));g.n++;g.tot+=f;g.res.push(f);
  const pk=document.getElementById('ffpk'),hl=document.getElementById('ffhl');if(pk){pk.style.bottom=`calc(${f}% - ${(f*.2).toFixed(1)}px)`}
  const lab=f>=100?'PARFAIT ! 🔔':f>=80?'Très fort !':f>=55?'Pas mal !':f>=25?'Un peu mou…':'Raté !';
  setTimeout(()=>{if(G!==g)return;if(hl)hl.innerHTML=`<b>${f}</b> · ${lab}`;if(f>=100){const bl=document.querySelector('.ffbell');if(bl){bl.classList.remove('ring');void bl.offsetWidth;bl.classList.add('ring')}sfx('big')}else sfx(f>=55?'pop':'bad',1600+f*15)},420);
  ST(`Coup ${Math.min(5,g.n+1)}/5 · Total ${g.tot}`);
  setTimeout(()=>{if(G!==g)return;if(pk)pk.style.bottom='0%';if(g.n>=5){ST(`5 coups · Total ${g.tot}`);G={g:'x'};setTimeout(()=>ffEnd('f',g.tot,Math.min(800,g.tot*1.6),`Total : ${g.tot} / 500`),500);return}g.lock=false},1150)}

/* --- grande roue (gratuite, une fois par jour) --- */
const FFW=[{t:'tk',v:500,w:24},{t:'tk',v:800,w:20},{t:'gm',v:60,w:12},{t:'tk',v:1200,w:15},{t:'pt',v:1,w:8},{t:'tk',v:2000,w:9},{t:'gm',v:120,w:8},{t:'tk',v:3000,w:4}];
const FWC=['#ff5d8f','#ffb21a','#4da3ff','#58e4d3','#b77dff','#9ae05a','#4da3ff','#ffd84a'];
const fwLab=p=>p.t==='tk'?`🎟️${p.v}`:p.t==='gm'?`💎${p.v}`:`🎫${p.v}`;
const fwTxt=p=>p.t==='tk'?`${fmt(p.v)} tickets de fête`:p.t==='gm'?`${p.v} gemmes`:"1 ticket d'invocation";
function fwSvg(){const cx=150,cy=140,r=100;let sp='',cab='';
  for(let i=0;i<16;i++){const a=i*Math.PI/8;sp+=`<path d="M${cx} ${cy}L${(cx+r*Math.cos(a)).toFixed(1)} ${(cy+r*Math.sin(a)).toFixed(1)}" stroke="#cbb8f0" stroke-width="1.6"/>`}
  for(let i=0;i<32;i++){const a=i*Math.PI/16;sp+=`<circle cx="${(cx+r*Math.cos(a)).toFixed(1)}" cy="${(cy+r*Math.sin(a)).toFixed(1)}" r="2.6" fill="${i%2?'#ffd84a':'#fff6c0'}"/>`}
  FFW.forEach((p,i)=>{const a=-Math.PI/2+i*Math.PI/4,x=cx+r*Math.cos(a),y=cy+r*Math.sin(a);
    cab+=`<g class="fwc" data-i="${i}" data-x="${x.toFixed(1)}" data-y="${y.toFixed(1)}"><path d="M${x.toFixed(1)} ${y.toFixed(1)}v6" stroke="#e8d8ff" stroke-width="2"/><rect x="${(x-27).toFixed(1)}" y="${(y+6).toFixed(1)}" width="54" height="30" rx="8" fill="${FWC[i]}" stroke="#140c24" stroke-width="2"/><rect x="${(x-23).toFixed(1)}" y="${(y+9).toFixed(1)}" width="46" height="9" rx="3" fill="#fff" opacity=".4"/><text x="${x.toFixed(1)}" y="${(y+30).toFixed(1)}" text-anchor="middle" font-size="12" font-weight="900" letter-spacing="-.3" fill="#140c24">${fwLab(p)}</text></g>`});
  return`<svg class="fwsvg" viewBox="0 0 300 300" aria-hidden="true"><path d="M${cx} ${cy}L70 290M${cx} ${cy}L230 290" stroke="#140c24" stroke-width="11" stroke-linecap="round"/><path d="M${cx} ${cy}L70 290M${cx} ${cy}L230 290" stroke="#8a6ab8" stroke-width="7" stroke-linecap="round"/>
   <rect x="96" y="276" width="108" height="14" rx="4" fill="#3a1050" stroke="#140c24" stroke-width="2"/><g id="fwr"><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#140c24" stroke-width="8"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#e8d8ff" stroke-width="5"/><circle cx="${cx}" cy="${cy}" r="${r*.8}" fill="none" stroke="#b8a0e0" stroke-width="2"/>${sp}${cab}</g>
   <circle cx="${cx}" cy="${cy}" r="13" fill="#ffd84a" stroke="#140c24" stroke-width="2.4"/><path d="M${cx} ${cy}m-5 0h10M${cx} ${cy}m0 -5v10" stroke="#8a5a06" stroke-width="2"/></svg>`}
function fwRot(a){const w=document.getElementById('fwr');if(!w)return false;w.setAttribute('transform',`rotate(${a.toFixed(2)} 150 140)`);w.querySelectorAll('.fwc').forEach(c=>c.setAttribute('transform',`rotate(${(-a).toFixed(2)} ${c.dataset.x} ${c.dataset.y})`));return true}
function ffWheel(){const C=CAS(),spun=C.gift===today();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="ffm"><div class="ffhd"><b>🎡 Grande roue de Fortuna</b><span class="ffst"></span></div><div class="ffbox ff-w">${fwSvg()}</div><div class="ffwres" id="fwres">${spun?"<p class='muted'>Tu as déjà fait ton tour aujourd'hui. La grande roue t'attend demain !</p>":"<p class='muted'>Un tour gratuit par jour, sans rien miser : la cabine qui arrive en bas, devant le quai, t'offre son cadeau.</p>"}</div><div class="row" style="justify-content:center;margin-top:8px">${spun?'<button class="btn" data-a="close">Fermer</button>':'<button class="btn p" data-a="ffspin">🎡 Monter dans la grande roue</button>'}</div></div>`);fwRot(0)}
function ffSpin(){const C=CAS();if(!casOn()||C.gift===today()||G)return;const tot=FFW.reduce((a,p)=>a+p.w,0);let r=Math.random()*tot,i=0;for(;i<FFW.length;i++){if((r-=FFW[i].w)<0)break}i=Math.min(i,FFW.length-1);
  const p=FFW[i];C.gift=today();if(p.t==='tk')ffEarn(p.v);else if(p.t==='gm')S.gems+=p.v;else INV().pt+=p.v;save();UI.ffDirty=1;
  const bt=document.querySelector('[data-a="ffspin"]');if(bt){bt.disabled=true;bt.textContent='La roue tourne…'}
  const target=720+((180-i*45)%360+360)%360,D=4200,t0=performance.now();G={g:'w'};const g=G;
  const step=t=>{const k=Math.min(1,(t-t0)/D),e=1-Math.pow(1-k,3);if(!fwRot(target*e)){G=null;return}if(k<1)return requestAnimationFrame(step);G=null;
    const c=document.querySelector(`#fwr .fwc[data-i="${i}"] rect`);if(c){c.setAttribute('stroke','#fff');c.setAttribute('stroke-width','4')}sfx(p.v>=2000||p.t==='gm'&&p.v>=120?'big':'win');
    const res=document.getElementById('fwres');if(res)res.innerHTML=`<div class="ffwin">🎁 ${fwTxt(p)} !</div><p class="muted" style="margin:4px 0 0">Reviens demain pour un nouveau tour gratuit.</p>`;
    if(bt){bt.outerHTML='<button class="btn" data-a="close">Fermer</button>'}toast('🎡 Grande roue : '+fwTxt(p))};requestAnimationFrame(step)}

/* ---------- clics ---------- */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='bg'&&G&&e.target===t){e.preventDefault();e.stopImmediatePropagation();return}
  if(!/^ff/.test(a))return;e.preventDefault();e.stopImmediatePropagation();
  try{if(a==='ffopen')ffOpen(v);else if(a==='ffgo'){if(v==='t')tirGo();else if(v==='m')memGo();else frpGo()}else if(a==='ffc')memFlip(+v);else if(a==='ffhit')frpHit();else if(a==='ffspin')ffSpin();
   else if(a==='ffq'){const C=CAS(),x=CQ.find(y=>y.k===v);if(!x||C.q.c[v]||(C.q.p[v]||0)<x.g)return;C.q.c[v]=1;C.j+=x.rw;C.wag+=x.rw;sfx('win');toast(`🎟️ +${fmt(x.rw)} tickets de fête`);save();render()}}catch(x){console.warn('ff',x)}},true);
/* le marteau : on peut aussi frapper en touchant la zone de jeu */
document.addEventListener('pointerdown',e=>{if(G&&G.g==='f'&&e.target.closest('.ff-f')&&!e.target.closest('[data-a]')){e.preventDefault();frpHit()}},true);
{const cm=closeModal;closeModal=function(){G=null;cm.apply(this,arguments);if(UI.ffDirty){UI.ffDirty=0;try{render()}catch(e){}}}}

/* ---------- annonces, réglages, discussions ---------- */
{const al=annList;annList=function(){const L=al.apply(this,arguments);try{for(let i=0;i<L.length;i++)if(L[i]&&L[i].k==='cas')L[i]={k:'ff1',ac:'#ff9ac8',tag:'ÉVÉNEMENT',t:FFN+' 🎡',x:`Fortuna a remplacé son casino par une <b>fête foraine</b> : stand de tir, Memory, marteau de force et un <b>tour de grande roue gratuit</b> chaque jour. Gagne des tickets grâce à ton adresse et échange-les contre des photos de profil, le cadre <b>Table Royale</b>, des éclats d'ultra et Fortuna elle-même. Fin dans ${dur(CAS_END-Date.now())}.`,art:ffArt,go:'🎡 Y aller',fn:()=>{TAB='event';UI.evt='cas';UI.csub='jeux'}}}catch(e){}return L}}
try{SETR[0][3]=String(SETR[0][3]).replace('casino','fête foraine')}catch(e){}
try{const FL=["La grande roue m'a donné 3000 tickets ce matin 🎡","Qui a battu son record au stand de tir ?","Le Memory de Fortuna j'y arrive en 12 coups 😎","Le marteau de force, j'ai fait sonner la cloche 3 fois !","Vous échangez vos tickets contre quoi au comptoir ?","Je farme les attractions pour avoir Fortuna"];
  const BAD=/casino|machine à sous|blackjack|roulette|7-7-7|ruin|jackpot|misé|mise\b/i;
  const fix=A=>{if(Array.isArray(A))for(let i=0;i<A.length;i++){if(typeof A[i]==='string'&&BAD.test(A[i]))A[i]=pick(FL);else if(Array.isArray(A[i]))fix(A[i])}};
  for(const k in TPL)fix(TPL[k]);if(typeof WORLD_TPL!=='undefined')fix(WORLD_TPL);
  const pb=postBotMsg;postBotMsg=function(gid,b,x,t){try{if(typeof x==='string'&&BAD.test(x))x=pick(FL)}catch(e){}return pb.call(this,gid,b,x,t)}}catch(e){}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.ffban{border-color:#ff9ac8;box-shadow:0 0 26px -10px #ff9ac8;background:#2a0a3e}.ffban .h{text-shadow:0 2px 0 #3a1050}.ffban .cur{border-color:#ff9ac8}
.tkic{width:18px;height:18px}.cur .tkic{width:20px;height:20px}
.ffgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(250px,1fr));gap:10px}
.ffa{display:flex;gap:12px;align-items:stretch;background:var(--surf);border:1px solid var(--edge);border-radius:16px;padding:10px}
.ffa.ffw0{border-color:rgba(255,178,26,.6);background:linear-gradient(160deg,rgba(255,178,26,.14),rgba(255,255,255,.02))}
.ffai{width:84px;min-height:84px;flex:none;border-radius:14px;display:grid;place-items:center;border:2px solid rgba(255,255,255,.18);box-shadow:inset 0 -10px 18px rgba(0,0,0,.25)}
.ffai span{font-size:44px;filter:drop-shadow(0 3px 0 rgba(0,0,0,.35))}.ffai svg{width:84px;height:84px}
.ffat{display:flex;flex-direction:column;gap:4px;min-width:0;flex:1}.ffat b{font-size:15px}.ffat small{color:var(--muted);font-size:12px;line-height:1.35}.ffat .btn{margin-top:auto;align-self:flex-start}
.ffmeta b{color:var(--fg)}
.ffm{display:flex;flex-direction:column;gap:8px;width:min(440px,calc(100vw - 64px));max-width:100%}
.ffhd{display:flex;align-items:center;justify-content:space-between;gap:8px;padding-right:50px;flex-wrap:wrap}.ffhd b{font-family:var(--fd);font-size:19px}
.ffst{font-weight:900;font-variant-numeric:tabular-nums;font-size:14px;color:#ffd84a}
.ffbox{position:relative;height:320px;border-radius:16px;overflow:hidden;border:2px solid #ffd84a;background:linear-gradient(#1e0a3e,#3a1050);touch-action:manipulation;user-select:none;-webkit-user-select:none}
.ffov{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px;text-align:center;padding:18px;background:rgba(14,6,28,.82);z-index:5}
.ffov p{margin:0;max-width:320px;font-size:14px}.ffbig{font-size:54px;line-height:1}
.ffres{animation:ffin .35s ease-out;background:rgba(14,6,28,.94)}@keyframes ffin{from{opacity:0;transform:scale(.92)}}
.ffwin{font-family:var(--fd);font-size:24px;color:#ffd84a;display:flex;align-items:center;gap:6px;justify-content:center}.ffwin .tkic{width:26px;height:26px}
.ffrec{color:#9ae05a;font-weight:900}
.ff-t{background:linear-gradient(#2a5a9a 0,#14306a 100%)}
.ff-t .fflane{position:absolute;left:0;right:0;height:10px;background:repeating-linear-gradient(90deg,#8a5a2a 0 18px,#6a4018 18px 36px);border-top:2px solid #140c24;border-bottom:2px solid #140c24}
.ff-t .ffcurt{position:absolute;inset:0 0 auto 0;height:16px;background:repeating-linear-gradient(90deg,#d1263b 0 22px,#fff6e0 22px 44px);border-bottom:2px solid #140c24;border-radius:0 0 50% 50%/0 0 100% 100%}
.ffd{position:absolute;left:0;width:62px;height:58px;padding:0;margin:0;border:0;background:none;cursor:crosshair;touch-action:none;will-change:transform;-webkit-tap-highlight-color:transparent}
.ffd svg{width:100%;height:100%;display:block;pointer-events:none}.ffd.hit svg{animation:ffhit .26s ease-in forwards}
@keyframes ffhit{to{transform:rotateX(85deg) scale(.8);opacity:.2}}
.fffl{position:absolute;font-family:var(--fd);font-size:22px;color:#ffd84a;text-shadow:0 2px 0 #140c24;pointer-events:none;animation:fffl .7s ease-out forwards;z-index:4}.fffl.neg{color:#ff6a6a}
@keyframes fffl{to{transform:translateY(-34px);opacity:0}}
.ff-m{height:auto;min-height:320px;padding:10px;background:linear-gradient(#3a1060,#1e0a3e)}
.ffmem{display:grid;grid-template-columns:repeat(4,1fr);gap:8px}
.ffc{position:relative;aspect-ratio:1;border:0;padding:0;border-radius:12px;background:none;perspective:500px;cursor:pointer;-webkit-tap-highlight-color:transparent}
.ffc span{position:absolute;inset:0;display:grid;place-items:center;border-radius:12px;backface-visibility:hidden;-webkit-backface-visibility:hidden;transition:transform .3s ease;border:2px solid #140c24}
.ffc .b{background:repeating-linear-gradient(45deg,#d1263b 0 8px,#b01a30 8px 16px);color:#ffd84a;font-size:22px;box-shadow:inset 0 0 0 3px #ffd84a}
.ffc .f{background:#fff6e0;font-size:clamp(26px,9vw,40px);transform:rotateY(180deg)}
.ffc.on .b{transform:rotateY(180deg)}.ffc.on .f{transform:rotateY(0)}.ffc.ok .f{background:#d8ffc8;box-shadow:0 0 0 3px #9ae05a}
.ff-f{background:linear-gradient(#2a0a1e,#4a1020)}
.ffhm{position:absolute;inset:0;display:flex;gap:12px;padding:12px}
.fftw{position:relative;width:64px;flex:none;border-radius:12px;background:linear-gradient(90deg,#3a1a10,#6a3a1a,#3a1a10);border:2px solid #140c24;margin-top:36px}
.ffbell{position:absolute;top:-38px;left:50%;transform:translateX(-50%);font-size:32px;transform-origin:50% 10%}.ffbell.ring{animation:ffring .7s ease-in-out}
@keyframes ffring{20%{transform:translateX(-50%) rotate(22deg) scale(1.2)}40%{transform:translateX(-50%) rotate(-18deg) scale(1.2)}60%{transform:translateX(-50%) rotate(12deg)}80%{transform:translateX(-50%) rotate(-6deg)}}
.ffsc i{position:absolute;left:0;right:0;height:2px;background:rgba(255,216,74,.5)}.ffsc em{position:absolute;right:3px;top:-14px;font-size:10px;font-style:normal;font-weight:900;color:#ffd84a}
.ffpk{position:absolute;left:50%;bottom:0;width:30px;height:16px;margin-left:-15px;border-radius:8px;background:linear-gradient(#fff6c0,#ffb21a);border:2px solid #140c24;transition:bottom .42s cubic-bezier(.2,.9,.3,1)}
.ffhr{flex:1;display:flex;flex-direction:column;justify-content:center;gap:14px;min-width:0}
.ffgg{position:relative;height:34px;border-radius:17px;background:linear-gradient(90deg,#c8102e,#ff8f3f 30%,#ffd84a 42%,#9ae05a 47%,#9ae05a 53%,#ffd84a 58%,#ff8f3f 70%,#c8102e);border:2px solid #140c24;overflow:hidden}
.ffgz{position:absolute;left:47%;width:6%;top:0;bottom:0;background:rgba(255,255,255,.55)}
.ffcur{position:absolute;top:-2px;bottom:-2px;width:6px;margin-left:-3px;background:#fff;border:2px solid #140c24;border-radius:3px}
.ffhit{font-size:20px;padding:14px}.ffhl{text-align:center;min-height:24px;font-size:15px}.ffhl b{font-family:var(--fd);font-size:24px;color:#ffd84a}
.ff-w{height:auto;padding:6px;background:linear-gradient(#1e0a3e,#6a1a6a 70%,#ff7a5a)}.fwsvg{display:block;width:100%;max-width:340px;margin:0 auto}
.ffwres{text-align:center;min-height:44px}.ffwres p{margin:0}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{const X={"Les Attractions de Fortuna":"Fortuna's Fairground","🎡 Les Attractions de Fortuna":"🎡 Fortuna's Fairground","🎡 Attractions":"🎡 Attractions","Attractions":"Attractions","Les Attractions de Fortuna 🎡":"Fortuna's Fairground 🎡",
 "Fortuna a troqué ses tables de jeu contre des stands de fête ! Gagne des tickets grâce à ton adresse et échange-les contre des récompenses exclusives.":"Fortuna swapped her game tables for fair stalls! Earn tickets with your skill and trade them for exclusive rewards.",
 "Comptoir de Fortuna":"Fortuna's counter","Échange tes tickets contre des récompenses. Les objets marqués EXCLU ne s'obtiennent qu'ici.":"Trade your tickets for rewards. Items marked EXCLU can only be found here.",
 "Défis du jour":"Daily challenges","Paliers de tickets":"Ticket milestones","Tickets gagnés depuis le début :":"Tickets earned so far:","Dépenser tes tickets au comptoir ne fait pas reculer ce compteur.":"Spending tickets at the counter doesn't lower this counter.","# tickets gagnés":"# tickets earned",
 "Jouer 3 parties au stand de tir":"Play 3 shooting gallery games","Terminer 2 parties de Memory":"Finish 2 Memory games","Jouer 3 parties au marteau de force":"Play 3 strength tester games","Gagner 1 500 tickets dans les attractions":"Earn 1,500 tickets in the attractions",
 "🎡 Grande roue":"🎡 Ferris wheel","Un tour gratuit par jour : la cabine qui s'arrête en bas t'offre son cadeau.":"One free ride per day: the cabin that stops at the bottom gives you its gift.","Faire mon tour gratuit":"Take my free ride","✓ Revenez demain":"✓ Come back tomorrow",
 "🎯 Stand de tir":"🎯 Shooting gallery","Stand de tir":"Shooting gallery","🧩 Memory":"🧩 Memory","🔨 Marteau de force":"🔨 Strength tester","Marteau de force":"Strength tester","Jouer":"Play","C'est parti !":"Let's go!","Rejouer":"Play again","Fermer":"Close",
 "Touche les canards qui défilent, les dorés valent triple. Attention aux chats noirs de Fortuna !":"Tap the passing ducks, golden ones are worth triple. Watch out for Fortuna's black cats!",
 "Retrouve les 8 paires le plus vite possible, avec le moins de coups.":"Find the 8 pairs as fast as possible, in as few moves as you can.","Frappe quand l'aiguille est au centre. 5 coups : fais sonner la cloche !":"Strike when the needle is in the middle. 5 strikes: ring the bell!",
 "Parties avec tickets : # aujourd'hui":"Games with tickets: # today","Parties avec tickets aujourd'hui : #":"Games with tickets today: #","Plus de tickets aujourd'hui : tu peux jouer pour le plaisir":"No more tickets today: you can play for fun","Record :":"Best:","✨ Nouveau record !":"✨ New record!",
 "Plus de tickets pour ce jeu aujourd'hui : cette partie est pour le plaisir (les défis avancent quand même).":"No more tickets for this game today: this one is just for fun (challenges still count).","Plus de tickets pour ce jeu aujourd'hui.":"No more tickets for this game today.",
 "Tu gagnes aussi des tickets en jouant au reste du jeu : +60 par victoire de combat, +120 par boss attaqué, +25 par invocation.":"You also earn tickets by playing the rest of the game: +60 per battle won, +120 per boss attack, +25 per summon.",
 "🔨 FRAPPE !":"🔨 STRIKE!","PARFAIT ! 🔔":"PERFECT! 🔔","Très fort !":"Very strong!","Pas mal !":"Not bad!","Un peu mou…":"A bit soft…","Raté !":"Missed!","Total : # / #":"Total: # / #",
 "🎡 Grande roue de Fortuna":"🎡 Fortuna's Ferris wheel","🎡 Monter dans la grande roue":"🎡 Get on the Ferris wheel","La roue tourne…":"The wheel is turning…","Reviens demain pour un nouveau tour gratuit.":"Come back tomorrow for another free ride.",
 "Un tour gratuit par jour, sans rien miser : la cabine qui arrive en bas, devant le quai, t'offre son cadeau.":"One free ride per day, nothing to bet: the cabin that arrives at the bottom, by the platform, gives you its gift.","Tu as déjà fait ton tour aujourd'hui. La grande roue t'attend demain !":"You've already had your ride today. The Ferris wheel awaits you tomorrow!",
 "🎟️ Tes jetons sont devenus des tickets de fête !":"🎟️ Your chips have become fair tickets!","Pas assez de tickets.":"Not enough tickets.","Les attractions sont fermées.":"The attractions are closed.","🎡 Y aller":"🎡 Go there","Tir, memory, marteau, grande roue":"Shooting, memory, hammer, Ferris wheel",
 "Photo « Fortuna Dorée »":"“Golden Fortuna” picture","Fortuna Dorée":"Golden Fortuna","Partie pour le plaisir (valeur : # tickets)":"Game for fun (worth: # tickets)","# tickets de fête":"# fair tickets"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}

/* ---------- notes de version ---------- */
try{const I=["🎡 <b>Le casino de Fortuna devient « Les Attractions de Fortuna »</b> : fini les mises et les jeux de hasard, place aux jeux d'adresse ! Stand de tir, Memory, Marteau de force, et un tour de <b>grande roue gratuit</b> chaque jour.","🎟️ Les attractions rapportent des <b>tickets de fête</b>, à échanger au comptoir contre les mêmes récompenses qu'avant (Fortuna, cadre Table Royale, photos, éclats d'ultra…). Tes anciens jetons ont été transformés en tickets, 1 pour 1.","📅 Prochaine ouverture : <b>vendredi 13 novembre</b>, jusqu'au 20. Ensuite, toujours du 13 au 20 de chaque mois."];
 PATCH.unshift({v:44,d:'10 novembre 2026',t:FFN,items:I});
 I18N_EN[I[0]]="🎡 <b>Fortuna's casino becomes “Fortuna's Fairground”</b>: no more bets or games of chance, skill games instead! Shooting gallery, Memory, Strength tester, and a <b>free Ferris wheel ride</b> every day.";
 I18N_EN[I[1]]="🎟️ The attractions give <b>fair tickets</b>, to trade at the counter for the same rewards as before (Fortuna, Royal Table frame, pictures, ultra shards…). Your old chips were turned into tickets, 1 for 1.";
 I18N_EN[I[2]]="📅 Next opening: <b>Friday, November 13</b>, until the 20th. After that, always from the 13th to the 20th of each month."}catch(e){}
window.FFX={open:ffOpen,G:()=>G};
}catch(e){console.warn('attractions',e)}})();
