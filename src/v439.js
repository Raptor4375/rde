/* ================= V439 : LES MÊMES RÈGLES POUR TOUT LE MONDE =================
   Contre des héros (arène, tournoi, Guerre des Cieux, guerre de guildes), le camp adverse ne suivait pas
   toutes les règles de ton camp. Test : ton équipe contre une copie exacte d'elle-même.
   · Aegis adverse n'avait pas son Serment prêté au départ, Corvin adverse pouvait être visé dès le 1er tour ;
   · hors arène : ni synergies, ni affinités, ni aura d'Éryndel, ni règles du mode pour l'adversaire ;
   · la météo et la forge de guilde ne comptaient que pour toi, et les bottes des bots ne donnaient pas de vitesse ;
   · à l'inverse, les formes ultra des bots étaient comptées deux fois (un bot affiché 111 k se battait comme un 178 k) ;
   · et un combat qui arrivait à la limite de tours était toujours perdu pour l'attaquant.
   Maintenant les deux camps jouent avec exactement les mêmes règles. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const PEND=[];                       /* héros adverses créés pour le combat qui démarre */
const FL={parts:null};               /* ce que l'adversaire a reçu, pour le journal du combat */
const isHeroU=u=>!!(u&&u.hid!=null&&HEROES[u.hid]&&!u.boss&&!u.raid);

/* ---------- effets de départ propres à un héros : appliqués dans les deux camps ---------- */
const HINIT=window.RDEheroInit=window.RDEheroInit||[];
if(typeof AEG!=='undefined'&&HEROES[AEG])HINIT.push(u=>{if(u.hid===AEG){u.guard=Math.max(u.guard||0,3);u.en=Math.max(u.en||0,50)}});
const initHero=u=>{for(const f of HINIT)try{f(u)}catch(e){}};

/* ---------- on garde la trace des héros adverses (bots et vrais joueurs) ---------- */
{const au=arenaUnit;arenaUnit=function(t,k,f){const u=au.apply(this,arguments);
  try{if(u&&t){let fe=f,row=null,team=null;
    if(typeof ARX!=='undefined'&&ARX.tm&&ARX.tm.includes(t)&&ARX.p&&!ARX.p.me){team=ARX.tm;row=ARX.p;
      const b0=team.reduce((a,x)=>a+basePow(HEROES[x.id],x.l,x.e),0)||1;fe=clamp((row.pw||1000)/b0,.6,3.6)}
    u.fq={id:t.id,l:t.l,e:t.e||0,u:t.u||0,f:fe||1,row,team,at:Date.now()};PEND.push(u)}}catch(e){}
  return u}}

/* ---------- 1. la vraie puissance : l'ultra n'est plus compté deux fois ---------- */
/* P : la puissance affichée de l'adversaire quand on la connaît, avec les mêmes bornes que le calcul d'origine */
function trueScale(foes,P){try{
  if(foes.some(u=>!u.fq))return 1;
  const bp=u=>basePow(HEROES[u.hid],u.fq.l,u.fq.e);
  const b0=foes.reduce((a,u)=>a+bp(u),0)||1,b1=foes.reduce((a,u)=>a+bp(u)*(1+.35*(u.fq.u||0)),0)||1,avg=b1/b0;
  if(avg<1.002)return 1;
  for(const u of foes){const f0=u.fq.f||1;
    const f1=P&&P.pw?clamp(P.pw/b1,.6,P.hi)*(P.m||1):Math.max(.6,f0/avg);
    const c=f1/f0;if(Math.abs(c-1)<.002)continue;
    u.max=Math.max(1,Math.round(u.max*c));u.hp=u.max;u.atk=Math.max(1,Math.round(u.atk*c));u.def=Math.max(0,Math.round(u.def*c))}
  return avg}catch(e){return 1}}

/* ---------- 2. leur équipement : la vitesse des bottes (PV/ATQ/DÉF sont déjà dans leur puissance) ---------- */
function gwDefender(){try{if(typeof GWBT==='undefined'||!GWBT||typeof GCH==='undefined'||!GCH.k)return null;
  const L=gwAlive(GWD.m[GCH.k]).sort((a,b)=>a[1].pw-b[1].pw);return L[0]?L[0][1]:null}catch(e){return null}}
function heroGear(row,u){try{const t={id:u.hid,l:u.fq?u.fq.l:1,e:u.fq?u.fq.e:0};
  let g=row?gearOfRow(row,t):null;
  if(!g&&row)g=npcHeroGear({n:row.n,id:row.id||row.pid,pw:row.pw||1000},t);
  return(g||[]).filter(Boolean)}catch(e){return[]}}
const gearSpd=items=>{let s=0;for(const it of items){try{s+=itemStats(it).spd||0}catch(e){}}return Math.round(s)};

/* ---------- 3. la forge de guilde de leur guilde ---------- */
function forgeOf(gid){try{if(!gid)return 0;let g=String(gid);if(g.startsWith('r:'))g=g.slice(2);
  const d=typeof NET!=='undefined'&&NET.guilds&&NET.guilds[g];if(d){const v=d.vil&&d.vil.lv;return clamp((v&&v.forge)||0,0,5)}
  if(S.gvil&&S.gvil[g]&&S.gvil[g].lv)return clamp(S.gvil[g].lv.forge||0,0,5);
  const G=GU(g);return G?clamp(Math.floor((G.lvl||1)/3),0,5):0}catch(e){return 0}}

/* ---------- 4. la météo ---------- */
function weatherOn(foes){try{if(typeof WXK==='undefined'||typeof wxK!=='function')return 0;const W=WXK[wxK()];if(!W)return 0;let n=0;
  for(const u of foes){let el='neutral';try{el=heroEl(u).el}catch(e){}if(el===W.el){u.atk=Math.round(u.atk*1.12);n++}}return n}catch(e){return 0}}

/* ---------- le passage « mêmes règles » pour le camp adverse ---------- */
function fairPass(foes,mk,am,ctx){
  const parts=[];
  /* d'où viennent ces héros (bot, vrai joueur, défenseur de guerre de guildes) */
  let row=null,P=null;for(const u of foes)if(u.fq&&u.fq.row&&u.fq.team&&u.fq.team.length===foes.length){row=u.fq.row;P={pw:row.pw||1000,hi:3.6};break}
  if(!row){const tr=gwDefender();if(tr){row={real:1,pid:tr.p,n:tr.n,id:tr.p,pw:tr.pw,g:tr.g};let m=1;try{m=gwActMul(tr)}catch(e){}P={pw:tr.pw||1000,hi:4,m}}}
  const avg=trueScale(foes,P);
  /* équipement : vitesse des bottes (avant les synergies, comme pour toi) */
  let spdMax=0;for(const u of foes){const s=gearSpd(heroGear(row,u));if(s>0){u.spd+=s;spdMax=Math.max(spdMax,s)}}
  /* effets de départ des héros (Aegis…) */
  foes.forEach(initHero);
  /* synergies, affinités, aura d'Éryndel, règles du mode : exactement l'appel fait pour ton équipe */
  am.call(ctx,foes,mk);foes.forEach(u=>{u.fqm=1});
  /* météo et forge de guilde */
  const nW=weatherOn(foes);
  const fl=forgeOf(row&&row.g);
  if(fl>0)for(const u of foes){u.atk=Math.round(u.atk*(1+.02*fl));const full=u.hp>=u.max;u.max=Math.round(u.max*(1+.02*fl));if(full)u.hp=u.max}
  /* journal */
  try{const ids=foes.map(u=>u.hid);const sy=synergies(ids);if(sy.length)parts.push(sy.map(x=>x.ic+' '+x.n).join(', '))}catch(e){}
  try{if(typeof affActive==='function'){const af=affActive(foes.map(u=>u.hid));if(af.length)parts.push(af.map(a=>a.ic+' '+a.n).join(', '))}}catch(e){}
  if(foes.some(u=>u.hid===(typeof AEG!=='undefined'?AEG:-1)))parts.push(T('🛡️ Serment prêté','🛡️ Oath sworn'));
  if(nW){try{const W=WXK[wxK()];parts.push(`${W.ic} ${T('météo','weather')} : ${nW} ${T('héros','hero'+(nW>1?'es':''))} +12 % ${T('ATQ','ATK')}`)}catch(e){}}
  if(fl>0)parts.push(`⚒️ ${T('forge de guilde','guild forge')} +${2*fl} %`);
  if(spdMax>0)parts.push(`👢 ${T('bottes','boots')} +${spdMax} ${T('VIT','SPD')}`);
  FL.parts=parts;FL.avg=avg;
}

/* ---------- branchement : au moment où ton équipe reçoit ses bonus, l'adversaire reçoit les siens ---------- */
{const am=applyMeta;applyMeta=function(units,mk){
  try{if(units&&units.length&&units.every(u=>u&&u.fqm))return[]}catch(e){}   /* déjà fait (arène : 2e appel) */
  try{for(const u of units||[])if(u&&u.side===0&&isHeroU(u))initHero(u)}catch(e){}
  const r=am.apply(this,arguments);
  try{if(PEND.length&&(units||[]).some(u=>u&&u.side===0&&u.hid!=null)){
    const now=Date.now(),foes=PEND.splice(0).filter(u=>isHeroU(u)&&u.side===1&&!u.fqm&&now-u.fq.at<5000);
    if(foes.length)fairPass(foes,mk,am,this)}}catch(e){console.warn('v439',e)}
  return r}}
{const sb=startBattle;startBattle=function(){FL.parts=null;try{return sb.apply(this,arguments)}finally{PEND.length=0}}}
{const ml=metaLog;metaLog=function(){const r=ml.apply(this,arguments);
  try{if(B&&FL.parts){const p=FL.parts;FL.parts=null;
    log(`⚖️ ${T("L'adversaire joue avec les mêmes règles que toi","Your opponent plays by the same rules as you")}${p.length?' : '+p.join(' · '):''}`,'sk')}}catch(e){}
  return r}}

/* ---------- Corvin « Oublié de tous » : vrai aussi quand c'est l'adversaire qui l'a ---------- */
{const pt=pickT;pickT=function(u){const t=pt.apply(this,arguments);
  try{if(B&&u&&t&&typeof CRV!=='undefined'&&t.hid===CRV&&t.side!==u.side&&t.hp>0&&!(t.taunt>0)&&(B.round||1)<=2){
    const D=B.duel;const inDuel=D&&D.u&&D.t&&D.t.hp>0&&D.u.hp>0&&B.round<=D.until&&(D.u===u||D.t===u);
    if(!inDuel){const f=alive(t.side).filter(x=>x!==t);if(f.length){const tt=f.filter(x=>x.taunt>0);return pick(tt.length?tt:f)}}}}catch(e){}
  return t}}

/* ---------- fin du temps entre deux équipes de héros : décision aux PV restants ---------- */
const hvh=()=>{try{const F=B.units.filter(u=>u.side===1);return F.length>0&&F.every(u=>u.fq&&isHeroU(u))}catch(e){return false}};
{const f0=finish;finish=function(res){let j=null;
  try{if(B&&!B.done&&res===false&&B.round>B.maxR&&hvh()){
    /* PV restants en % (au dixième près, plafonnés au max) ; égalité = l'attaquant n'a pas percé, le défenseur garde la place */
    const pct=s=>{const L=B.units.filter(u=>u.side===s);const m=L.reduce((a,u)=>a+(u.max||0),0)||1;return Math.round(1000*L.reduce((a,u)=>a+Math.min(u.max||0,Math.max(0,u.hp||0)),0)/m)/1000};
    const dm=s=>Math.round(B.units.filter(u=>u.side===s).reduce((a,u)=>a+(u.dmg||0),0));
    j={a:pct(0),b:pct(1),da:dm(0),db:dm(1)};j.tie=j.a===j.b;B.judge=j;
    log(`⏱️ ${T('Temps écoulé : décision aux PV restants','Time is up: decided on remaining HP')} — ${T('toi','you')} ${Math.round(j.a*100)} %, ${T('adversaire','opponent')} ${Math.round(j.b*100)} %`+
      (j.tie?` · ${T('égalité, départagés aux dégâts infligés','tie, decided on damage dealt')} : ${fmt(j.da)} ${T('contre','vs')} ${fmt(j.db)}`:''),'sk');
    if(j.a>j.b||(j.tie&&j.da>j.db))res=true}}catch(e){}
  const r=f0.call(this,res);
  try{if(j)setTimeout(()=>{const m=document.querySelector('#battle .result .modal');if(!m||m.querySelector('.rjudge'))return;const h=m.querySelector('.h');
    if(h)h.insertAdjacentHTML('afterend',`<div class="rjudge" style="text-align:center;font-size:12.5px;color:var(--muted);margin:-2px 0 8px">⏱️ ${T('Au temps','On time')} : ${T('toi','you')} <b>${Math.round(j.a*100)} %</b> ${T('de PV','HP')} · ${T('adversaire','opponent')} <b>${Math.round(j.b*100)} %</b>${j.tie?`<br>${T('Égalité : départagés aux dégâts infligés','Tie: decided on damage dealt')} (<b>${fmt(j.da)}</b> ${T('contre','vs')} <b>${fmt(j.db)}</b>)`:''}</div>`)},40)}catch(e){}
  return r}}

/* ---------- notes de version ---------- */
try{const it=[
 "⚖️ <b>Les mêmes règles pour tout le monde</b> : en arène, au tournoi, en Guerre des Cieux et en guerre de guildes, les héros adverses suivent maintenant exactement les mêmes règles que les tiens : Serment d'Aegis prêté au départ, Corvin intouchable les 2 premiers tours, synergies, affinités, aura d'Éryndel, météo, forge de guilde et vitesse des bottes.",
 "🧮 <b>Puissance des bots corrigée</b> : leurs formes ultra étaient comptées deux fois (un bot affiché à 111 k se battait comme un 178 k). Maintenant, la puissance affichée est leur vraie force.",
 "⏱️ <b>Fin du temps</b> : entre deux équipes de héros, un combat qui arrive à la limite de tours n'est plus perdu d'office pour l'attaquant. Celui qui a le plus de PV restants (en %) gagne, et en cas d'égalité, celui qui a infligé le plus de dégâts."];
 PATCH.unshift({v:'v65',d:Date.now(),t:'Les mêmes règles pour tout le monde',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['Les mêmes règles pour tout le monde']='The same rules for everyone';
  I18N_EN[it[0]]="⚖️ <b>The same rules for everyone</b>: in the arena, the tournament, the War of the Skies and guild wars, enemy heroes now follow exactly the same rules as yours: Aegis's Oath sworn at the start, Corvin untargetable for the first 2 turns, synergies, affinities, Éryndel's aura, weather, guild forge and boot speed.";
  I18N_EN[it[1]]="🧮 <b>Bot power fixed</b>: their ultra forms were counted twice (a bot showing 111 k fought like a 178 k). Now the displayed power is their real strength.";
  I18N_EN[it[2]]="⏱️ <b>Time limit</b>: between two hero teams, a fight that reaches the turn limit is no longer an automatic loss for the attacker. Whoever has the most HP left (in %) wins, and on a tie, whoever dealt the most damage."}}catch(e){}
}catch(e){console.warn('v439',e)}})();
