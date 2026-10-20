
/* ================= titres ================= */
const TITLES=[
 {k:'voyageur',n:'Voyageur',c:'#b8c0d0',d:"Commencer l'aventure",ok:()=>true},
 {k:'porteur',n:"Porteur d'Éther",c:'#ffd84a',d:'Terminer le mode histoire',ok:()=>!!SG().done[7]},
 {k:'lumiere',n:'Cœur de Lumière',c:'#ffe9a0',d:"Finir l'histoire en sauvant Corvin",ok:()=>!!SG().done[7]&&SG().cmp>=SG().brv},
 {k:'courage',n:'Lame du Courage',c:'#ff7a5a',d:"Finir l'histoire en bannissant le Néant",ok:()=>!!SG().done[7]&&SG().cmp<SG().brv},
 {k:'neant',n:'Conquérant du Néant',c:'#c07aff',d:'Conquérir le Donjon des Échos',ok:()=>(DG().wins||0)>=1},
 {k:'echos',n:'Maître des Échos',c:'#8a3aff',d:'Conquérir le donjon 10 fois',ok:()=>(DG().wins||0)>=10},
 {k:'diamant',n:'Gladiateur de diamant',c:'#8ad8ff',d:'Atteindre le rang Diamant en arène',ok:()=>arsRankOf(ARS().peak||0)>=4},
 {k:'legende',n:"Légende de l'arène",c:'#ff7a5a',d:'Atteindre le rang Légende',ok:()=>arsRankOf(ARS().peak||0)>=6},
 {k:'champion',n:'Champion du tournoi',c:'#ffd84a',d:'Gagner un tournoi de la semaine',ok:()=>(S.tnW||0)>=1},
 {k:'batisseur',n:'Bâtisseur',c:'#e8b83a',d:'Faire 20 dons au village de guilde',ok:()=>(S.stats&&S.stats.gvd||0)>=20},
 {k:'explorateur',n:'Explorateur',c:'#58e4a0',d:'Terminer 25 expéditions',ok:()=>(S.stats&&S.stats.exp||0)>=25},
 {k:'fleau',n:'Fléau des boss',c:'#ff5a5a',d:'Vaincre le boss de saison 5 fois',ok:()=>(S.sb&&S.sb.kills||0)>=5},
 {k:'rempart',n:'Rempart du monde',c:'#8a90ff',d:'Finir dans le top 10 du boss mondial',ok:()=>!!S.wbTop},
 {k:'aventurier',n:'Aventurier',c:'#7ad06a',d:"Atteindre l'étape 50",ok:()=>(S.max||0)>=50},
 {k:'heros',n:'Héros du royaume',c:'#ffd84a',d:'Terminer les 100 étapes',ok:()=>(S.max||0)>=100},
 {k:'collection',n:'Collectionneur',c:'#58e4d3',d:'Posséder 40 héros',ok:()=>Object.keys(S.heroes||{}).length>=40},
 {k:'conteur',n:'Conteur',c:'#ffb0d0',d:"Lire 20 chapitres d'histoires de héros",ok:()=>Object.values(S.story||{}).reduce((a,b)=>a+b,0)>=20},
 {k:'fetard',n:'Fêtard',c:'#ff9a3a',d:'Trinquer 10 fois avec ta guilde',ok:()=>(S.stats&&S.stats.toast||0)>=10},
 {k:'cresus',n:'Crésus',c:'#ffd84a',d:"Posséder 10 millions d'or",ok:()=>(S.gold||0)>=1e7}];
function ttOf(k){return TITLES.find(t=>t.k===k)}
function ttCheck(){try{S.titles=S.titles||[];let nw=null;for(const t of TITLES)if(!S.titles.includes(t.k)&&t.ok()){S.titles.push(t.k);if(t.k!=='voyageur')nw=t}if(!S.title)S.title='voyageur';if(nw){save();toast(`🏷️ Nouveau titre : « ${nw.n} » !`)}}catch(e){}}
setInterval(ttCheck,6000);setTimeout(ttCheck,4000);
{const gd=gvDonate;gvDonate=async function(k){const n0=(S.gvd&&S.gvd.n)||0;const r=await gd.apply(this,arguments);if(((S.gvd&&S.gvd.n)||0)>n0){S.stats=S.stats||{};S.stats.gvd=(S.stats.gvd||0)+1;save()}return r}}
{const gt=ghToast;ghToast=async function(){const was=ghToastDone();const r=await gt.apply(this,arguments);if(!was&&ghToastDone()){S.stats=S.stats||{};S.stats.toast=(S.stats.toast||0)+1;save()}return r}}
{const wc=wbClaim;wbClaim=function(){try{const T=wbTotals();const i=T.rows.findIndex(r=>r.me);if(T.dead&&i>=0&&i<10)S.wbTop=1}catch(e){}return wc.apply(this,arguments)}}
{const pm=pushMe;pushMe=async function(){const r=await pm.apply(this,arguments);try{if(NET.on&&NET.canWrite&&NET.pid&&S.title&&NET.ttPushed!==S.title+NET.lastPushT){NET.ttPushed=S.title+NET.lastPushT;await NET.db.doc('players/'+NET.pid).update({tt:S.title})}}catch(e){}return r}}
function ttFor(w){try{if(!w)return null;if(w==='me'||w===NET.pid)return S.title&&S.title!=='voyageur'?S.title:null;const p=NET.players&&NET.players[w];if(p)return p.tt&&p.tt!=='voyageur'?p.tt:null;
  if(String(w).startsWith('b:')){let h=0;for(const c of String(w))h=(h*31+c.charCodeAt(0))%9973;if(h%100<35){const pool=['aventurier','explorateur','fetard','batisseur','conteur','fleau','diamant','neant','collection'];return pool[h%pool.length]}}}catch(e){}return null}
function ttChip(k){const t=ttOf(k);return t?`<i class="ttchip" style="--tc:${t.c}">${esc(t.n)}</i>`:''}
for(const nm of ['msgHTML','rmsgHTML']){try{const f=window[nm];if(typeof f!=='function')continue;const w=function(m){let h=f.apply(this,arguments);try{const k=m&&m.w?ttFor(m.w===NET.pid?'me':m.w):(m&&m.me?ttFor('me'):null);if(k){const i=h.indexOf('</button>');if(i>0)h=h.slice(0,i+9)+ttChip(k)+h.slice(i+9)}}catch(e){}return h};if(nm==='msgHTML')msgHTML=w;else rmsgHTML=w}catch(e){}}
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{const m=$('#ovl .modal');if(!m)return;const h=m.querySelector('.phd .h')||m.querySelector('.h');let k=null;const me=id==='me';
   if(me)k=S.title&&S.title!=='voyageur'?S.title:null;else{const p=rowById(id);if(p)k=ttFor(p.real?p.pid:(p.bid?'b:'+p.bid:p.id))}
   if(k&&h&&!m.querySelector('.ttchip'))h.insertAdjacentHTML('afterend',`<div style="margin:2px 0 6px">${ttChip(k)}</div>`);
   if(me&&!m.querySelector('.ttsel')){ttCheck();const own=S.titles||['voyageur'];m.insertAdjacentHTML('beforeend',`<div class="ttsel"><div class="h3" style="margin:0 0 6px">🏷️ Mes titres · ${own.length}/${TITLES.length}</div><div class="ttlist">${TITLES.map(t=>{const ok=own.includes(t.k);return`<button class="ttb ${S.title===t.k?'on':''}" style="--tc:${t.c}" data-a="ttpick" data-v="${t.k}" ${ok?'':'disabled'}><b>${ok?esc(t.n):'🔒 '+esc(t.n)}</b><small>${esc(t.d)}</small></button>`}).join('')}</div></div>`)}}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="ttpick"]');if(!t)return;e.preventDefault();e.stopPropagation();S.title=t.dataset.v;save();NET.lastPush='';try{schedulePush()}catch(er){}toast(`🏷️ Titre affiché : « ${ttOf(S.title).n} »`);profileModal('me')},true);

/* ================= tournoi de la semaine ================= */
const TN_RW=[[40,0],[80,0],[150,0],[250,1],[500,2]],TN_RN=['Huitièmes','Quarts','Demi-finales','Finale'];
function tnDay(){return(new Date().getDay()+6)%7}
function tnRowPw(r){return Math.max(1,r&&r.pw||1)}
function TN(){const wk=String(weekKey(Date.now()));if(S.tn&&S.tn.wk===wk)return S.tn;let pool=[];try{pool=[...realRows(),...botRows()].filter(r=>r&&r.pw>0&&r.id)}catch(e){}
  const me=Math.max(1,teamPower());const R=rng([...String(wk)].reduce((a,c)=>a*31+c.charCodeAt(0),3)%1e7);pool.forEach(r=>r._d=Math.abs(Math.log(tnRowPw(r)/me))+R()*.35);pool.sort((a,b)=>a._d-b._d);
  const pick=pool.slice(0,15).map(r=>({id:r.id,n:r.n||'Rival',pw:Math.round(r.pw),h:teamHid(r),real:!!r.real}));while(pick.length<15)pick.push({id:'x'+pick.length,n:['Ombrelame','Tisseciel','Krog','Myrtille','Sablor'][pick.length%5],pw:Math.round(me*(.7+R()*.6)),h:Math.floor(R()*56)});
  const P=[{id:'me',n:S.name||'Toi',pw:me,h:S.team[0]??0,me:1},...pick];for(let i=P.length-1;i>0;i--){const j=Math.floor(R()*(i+1));[P[i],P[j]]=[P[j],P[i]]}
  S.tn={wk,P,w:[Array(8).fill(null),Array(4).fill(null),Array(2).fill(null),[null]],bets:{},cl:0};save();return S.tn}
function tnMatch(r,m){const T=TN();if(r===0)return[2*m,2*m+1];const a=T.w[r-1][2*m],b=T.w[r-1][2*m+1];return[a,b]}
function tnSim(r,m){const T=TN();const [a,b]=tnMatch(r,m);if(a==null||b==null)return null;const pa=Math.pow(T.P[a].pw,2),pb=Math.pow(T.P[b].pw,2);const R=rng([...String(T.wk)].reduce((x,c)=>x*31+c.charCodeAt(0),r*97+m*13+1)%1e7);return R()<pa/(pa+pb)?a:b}
function tnChance(a,b){const T=TN();const pa=Math.pow(T.P[a].pw,2),pb=Math.pow(T.P[b].pw,2);return pa/(pa+pb)}
function tnMeIdx(){return TN().P.findIndex(p=>p.me)}
function tnUpdate(){const T=TN(),d=tnDay();let ch=false;for(let r=0;r<4;r++){if(d<=r)break;for(let m=0;m<T.w[r].length;m++)if(T.w[r][m]==null){const w=tnSim(r,m);if(w!=null){T.w[r][m]=w;ch=true}}}
  for(const [key,b] of Object.entries(T.bets)){if(b.done)continue;const [r,m]=key.split('-').map(Number);const w=T.w[r][m];if(w!=null){b.done=1;if(w===b.on){const g=Math.round(b.st*b.od);S.gold+=g;b.win=g;toast(`🎟️ Pari gagné : +${fmt(g)} or !`)}ch=true}}if(ch)save();return T}
function tnMyRound(){const T=tnUpdate(),me=tnMeIdx(),d=tnDay();for(let r=0;r<4;r++){const m=T.w[r].findIndex((_,k)=>tnMatch(r,k).includes(me));if(m<0)return{r,out:true};if(T.w[r][m]==null)return{r,m,open:d===r};if(T.w[r][m]!==me)return{r,m,lost:true}}return{r:4,champ:true}}
function tnBest(){const T=tnUpdate(),me=tnMeIdx();let best=0;for(let r=0;r<4;r++){const m=T.w[r].findIndex((_,k)=>tnMatch(r,k).includes(me));if(m<0||T.w[r][m]==null)break;if(T.w[r][m]===me)best=r+1;else break}return best}
const TNX={go:false,active:false,r:0,m:0};
{const eb=evBattle;evBattle=function(){if(!TNX.go)return eb.apply(this,arguments);TNX.go=false;const T=TN(),[a,b]=tnMatch(TNX.r,TNX.m),me=tnMeIdx(),op=T.P[a===me?b:a];let foes=null;
  try{const o=op.id&&!String(op.id).startsWith('x')?rowById(op.id):null;if(o){const tm=teamOfRow(o);const base=tm.reduce((s,t)=>s+basePow(HEROES[t.id],t.l,t.e),0)||1;const f=clamp(o.pw/base,.6,2.5);foes=tm.map((t,k)=>arenaUnit(t,k,f))}}catch(e){}
  if(!foes||!foes.length){const st=Math.max(1,Math.min(100,(S.max||1)+2));foes=stageFoes(st%10?st:st-1)}
  TNX.active=true;return{foes,title:`🏆 ${TN_RN[TNX.r]} · ${esc(op.n)}`,sub:'Tournoi de la semaine',maxR:20,wc:45}}}
{const ef=evFinish;evFinish=function(dmg,rw){if(!TNX.active)return ef.apply(this,arguments);TNX.active=false;const T=TN(),[a,b]=tnMatch(TNX.r,TNX.m),me=tnMeIdx();const win=!B.units.some(u=>u.side===1&&u.hp>0);
  T.w[TNX.r][TNX.m]=win?me:(a===me?b:a);save();if(win){rw.push(TNX.r===3?'🏆 Tu remportes le tournoi de la semaine !':`➡️ Qualifié pour : ${TN_RN[TNX.r+1]} (demain)`);if(TNX.r===3){S.tnW=(S.tnW||0)+1;save()}}else rw.push('Éliminé… Tu peux encore parier sur les autres matchs !');return win?'Victoire au tournoi !':'Défaite au tournoi'}}
function tnFight(){const M=tnMyRound();if(!M.open)return;TNX.r=M.r;TNX.m=M.m;TNX.go=true;TNX.active=false;try{startBattle('event')}finally{TNX.go=false}}
function tnBet(r,m,on){const T=TN(),key=r+'-'+m;if(T.bets[key]||tnDay()!==r||T.w[r][m]!=null)return;if(Object.values(T.bets).filter(b=>b.r===r).length>=2)return toast('2 paris maximum par tour.');const st=Math.round(15000*(1+(S.max||1)/10));if(S.gold<st)return toast("Pas assez d'or.");
  const [a,b]=tnMatch(r,m);const p=tnChance(on,on===a?b:a);const od=Math.max(1.15,Math.min(4,+(0.92/p).toFixed(2)));S.gold-=st;T.bets[key]={r,m,on,st,od};save();toast(`🎟️ Pari placé sur ${T.P[on].n} (cote ×${od})`);render()}
function tnClaim(){const T=TN();if(T.cl||tnDay()<4)return;const b=tnBest();const [gm,sh]=TN_RW[b];S.gems+=gm;S.shards+=sh;T.cl=1;save();modal(`<div class="arspromo"><div class="xresi">${b===4?'🏆':'🎖️'}</div><div class="h">${b===4?'Champion du tournoi !':'Fin du tournoi'}</div><p class="sub">${['Éliminé en huitièmes','Éliminé en quarts','Éliminé en demi-finale','Finaliste','Vainqueur'][b]}</p><div class="xrw"><div>${GEM}${gm} gemmes</div>${sh?`<div>${SHARD}${sh} éclat${sh>1?'s':''} légendaire${sh>1?'s':''}</div>`:''}${b===4?'<div>🏷️ Titre « Champion du tournoi »</div>':''}</div><button class="btn p" data-a="close" style="width:100%;margin-top:10px">Super !</button></div>`);render()}
function tnCard(){const T=tnUpdate(),me=tnMeIdx(),d=tnDay(),M=tnMyRound();
  const who=i=>{if(i==null)return`<span class="tnp tbd">…</span>`;const p=T.P[i];return`<span class="tnp ${p.me?'me':''}"><span class="tnav">${portrait(HEROES[p.h]||HEROES[0])}</span><span class="tnn">${esc(p.n)}</span></span>`};
  const cols=[0,1,2,3].map(r=>`<div class="tncol"><div class="tnrh ${d===r?'on':''}">${TN_RN[r]}<small>${['lundi','mardi','mercredi','jeudi'][r]}</small></div>${T.w[r].map((w,m)=>{const [a,b]=tnMatch(r,m);const mine=a===me||b===me;const bet=T.bets[r+'-'+m];
    return`<div class="tnm ${mine?'mine':''}"><div class="${w!=null&&w===a?'win':w!=null?'lose':''}">${who(a)}</div><div class="${w!=null&&w===b?'win':w!=null?'lose':''}">${who(b)}</div>${bet?`<i class="tnbet">🎟️ ${esc(T.P[bet.on].n)} ×${bet.od}${bet.done?(bet.win?' ✅':' ❌'):''}</i>`:''}</div>`}).join('')}</div>`).join('');
  let main='';if(d>=4){const b=tnBest();main=`<div class="tnmain"><b>${b===4?'🏆 Tu as gagné le tournoi !':'Le tournoi est terminé.'}</b><span class="muted">Un nouveau tableau lundi.</span>${T.cl?'<span class="muted">Récompense récupérée ✔</span>':`<button class="btn g" data-a="tnclaim">🎁 Récupérer ta récompense</button>`}</div>`}
  else if(M.open){const [a,b]=tnMatch(M.r,M.m),op=a===me?b:a,c=tnChance(me,op);main=`<div class="tnmain vs"><div class="tnvs">${who(me)}<em>VS</em>${who(op)}</div><span class="muted">${TN_RN[M.r]} · puissance ${fmt(T.P[op].pw)} · tes chances ≈ ${Math.round(c*100)} %</span><button class="btn p" data-a="tnfight">⚔️ Jouer mon match</button><small class="muted">Si tu ne joues pas avant minuit, le match se décide à la puissance.</small></div>`}
  else if(M.lost||M.out)main=`<div class="tnmain"><b>Éliminé en ${TN_RN[M.r].toLowerCase()}.</b><span class="muted">Parie sur les autres matchs pour te refaire !</span></div>`;else if(M.champ)main=`<div class="tnmain"><b>🏆 Champion !</b></div>`;else main=`<div class="tnmain"><b>Qualifié !</b><span class="muted">Ton prochain match : ${TN_RN[M.r]} (${['lundi','mardi','mercredi','jeudi'][M.r]}).</span></div>`;
  let bets='';if(d<4){const r=d;const open=T.w[r].map((w,m)=>({m,ab:tnMatch(r,m),w})).filter(x=>x.w==null&&!x.ab.includes(me)&&x.ab[0]!=null&&x.ab[1]!=null&&!T.bets[r+'-'+x.m]);
    if(open.length)bets=`<details class="arsdet"><summary>🎟️ Parier sur les matchs du jour (2 max)</summary><div class="tnbets">${open.slice(0,4).map(x=>{const [a,b]=x.ab,ca=tnChance(a,b);return`<div class="tnbr"><button class="btn sm" data-a="tnbet" data-v="${r},${x.m},${a}">${esc(T.P[a].n)} ×${Math.max(1.15,Math.min(4,(0.92/ca))).toFixed(2)}</button><span>vs</span><button class="btn sm" data-a="tnbet" data-v="${r},${x.m},${b}">${esc(T.P[b].n)} ×${Math.max(1.15,Math.min(4,(0.92/(1-ca)))).toFixed(2)}</button></div>`}).join('')}</div><p class="muted" style="font-size:11.5px;margin:6px 0 0">Mise : ${GOLD}${fmt(Math.round(15000*(1+(S.max||1)/10)))} par pari. Les gains tombent à la fin du tour.</p></details>`}
  return`<div class="card tncard"><div class="row" style="justify-content:space-between;align-items:center"><div class="h3" style="margin:0">🏆 Tournoi de la semaine</div><span class="muted" style="font-size:12px">16 combattants</span></div>${main}<div class="tnbr0"><div class="tnbrk">${cols}</div></div>${bets}
   <p class="muted" style="font-size:11.5px;margin:8px 0 0">Récompenses : huitièmes ${GEM}40 · quarts ${GEM}80 · demies ${GEM}150 · finale ${GEM}250 + ${SHARD}1 · vainqueur ${GEM}500 + ${SHARD}2 + titre.</p></div>`}
{const pc=pCombat;pCombat=function(){const h=pc.apply(this,arguments);try{if(UI.lz&&UI.lz.boss==='arena'){const i=h.indexOf('<div class="card arscard"');const j=i>=0?h.indexOf('</details></div>',i):-1;if(j>0){const k=j+'</details></div>'.length;return h.slice(0,k)+tnCard()+h.slice(k)}}}catch(e){}return h}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="tnfight"],[data-a="tnbet"],[data-a="tnclaim"]');if(!t)return;e.preventDefault();e.stopPropagation();const a=t.dataset.a;if(a==='tnfight')tnFight();else if(a==='tnclaim')tnClaim();else{const [r,m,on]=t.dataset.v.split(',').map(Number);tnBet(r,m,on)}},true);
{const pl=LOBS.boss.places;LOBS.boss.places=function(){const P=pl.apply(this,arguments);const a=P.find(p=>p.k==='arena');if(a){const ob=a.badge;a.badge=()=>{try{if(!S.tn)return ob?ob():0;const M=tnMyRound();if(M.open)return'!';if(tnDay()>=4&&!TN().cl)return'!'}catch(e){}return ob?ob():0}}return P}}
