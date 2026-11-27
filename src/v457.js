
/* ================= V457 : LA TREMPE, UN CAUCHEMAR JOUABLE, ADIEU LES CHRONIQUES DES HÉROS =================
   Demandé par Raptor :
   · le mode Cauchemar était impossible dès l'étape 1 (il fallait ~1,6× la puissance qui suffit pour finir le Difficile) :
     la courbe est refaite dans v454 (étape 1 ≈ fin du Difficile) et chaque défaite donne du Courage (+3 %, 10 fois max) ;
   · un nouveau moyen de gagner en puissance : la Trempe. Un objet au niveau maximum peut être trempé de +1 à +10 ;
     chaque palier donne +0,4 % de PV, d'ATQ et de DÉF au héros qui le porte (jusqu'à +20 % avec 5 objets à +10).
     Elle coûte de l'or et des Larmes de Lune 🌙, gagnées en Difficile, en Cauchemar et au Donjon des Échos ;
   · les Chroniques des Héros sont retirées (v414/v427) : les récompenses déjà gagnées restent,
     une chronique commencée et pas finie est remboursée en gemmes. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG&&LANG!=='fr')?en:fr;
const LUNE='🌙';
/* ---------- 1. la Trempe ---------- */
const TP_MAX=10,TP_PCT=.004,TP_L=[4,6,8,10,12,15,18,22,26,30];
const tpOf=it=>Math.max(0,Math.min(TP_MAX,(it&&it.tp)|0));
const tpOk=it=>!!it&&it.r>=3&&it.l>=itemMax(it);
const tpCost=it=>{const k=tpOf(it)+1;return{g:Math.round(40000*k*(it.r>=4?1.5:1)),l:TP_L[k-1]||0}};
const lunes=()=>S.lunes|0;
window.RDEtrempe={tpOf,tpOk,tpCost,TP_MAX,TP_PCT};
/* le héros qui porte des objets trempés */
const tpSum=id=>{let n=0;for(const it of S.items)if(it.eq===id)n+=tpOf(it);return n};
{const hs=heroStats;heroStats=function(id){const st=hs.apply(this,arguments);try{if(st&&S.heroes&&S.heroes[id]){const n=tpSum(id);if(n){const m=1+TP_PCT*n;st.hp=Math.round(st.hp*m);st.atk=Math.round(st.atk*m);st.def=Math.round(st.def*m)}}}catch(e){}return st}}
/* le petit « +N » sur l'objet */
{const ic=itemCard;itemCard=function(it){let h=ic.apply(this,arguments);try{const n=tpOf(it);if(n)h=h.replace('<span class="in">',`<span class="in"><b class="tpb">🔨+${n}</b> `)}catch(e){}return h}}
/* un objet trempé ne part pas dans la forge de fusion */
{const fg=fuseGroups;fuseGroups=function(){const hid=S.items.filter(x=>tpOf(x)&&x.eq==null);hid.forEach(x=>x.eq=-7);try{return fg.apply(this,arguments)}finally{hid.forEach(x=>x.eq=null)}}}
{const fu=fuse;fuse=function(){const hid=S.items.filter(x=>tpOf(x)&&x.eq==null);hid.forEach(x=>x.eq=-7);try{return fu.apply(this,arguments)}finally{hid.forEach(x=>{if(x.eq===-7)x.eq=null})}}}
function tpCard(it){const n=tpOf(it),mx=n>=TP_MAX,c=tpCost(it),okG=S.gold>=c.g,okL=lunes()>=c.l;
  const pips=[...Array(TP_MAX)].map((_,k)=>`<i class="${k<n?'on':''}"></i>`).join('');
  const who=it.eq!=null&&HEROES[it.eq]?esc(HEROES[it.eq].n.split(/[ ,]/)[0]):'';
  return`<div class="card tpcard"><div class="tphd"><span class="tpic">🔨</span><div style="min-width:0;flex:1"><div class="h3" style="margin:0">${T('Trempe','Tempering')} <b class="num">+${n}</b><small> / ${TP_MAX}</small></div>
    <p class="muted">${T("Chaque palier donne <b>+0,4 %</b> de PV, d'ATQ et de DÉF au héros qui porte l'objet.","Each level gives <b>+0.4%</b> HP, ATK and DEF to the hero wearing the item.")}${n?` ${T('Ici','Here')} : <b>+${(n*TP_PCT*100).toFixed(1).replace('.',T(',','.'))} %</b>${who?` ${T('pour','for')} ${who}`:''}.`:''}</p></div></div>
    <div class="tppips">${pips}</div>
    ${mx?`<p class="tpmax">✨ ${T('Trempe maximale !','Fully tempered!')}</p>`:`<button class="btn p tpgo" data-a="tremper" data-v="${it.id}" ${okG&&okL?'':'disabled'}>🔨 ${T('Tremper','Temper')} (+${n+1}) · ${GOLD}${fmt(c.g)} · ${LUNE} ${c.l}</button>`}
    <p class="tpsrc">${LUNE} <b>${fmt(lunes())}</b> ${T('Larmes de Lune','Moon Tears')} · ${T('à gagner en Difficile et en Cauchemar (victoires) et au Donjon des Échos.','earned from Hard and Nightmare wins and the Echo Dungeon.')}</p></div>`}
function tpHint(it){return`<div class="card tpcard tpoff"><span class="tpic">🔨</span><p class="muted">${it.r<3
  ?T('La <b>Trempe</b> se fait sur les objets épiques et célestes au niveau maximum.','<b>Tempering</b> works on Epic and Celestial items at max level.')
  :T(`Monte cet objet au niveau ${itemMax(it)} pour débloquer sa <b>Trempe</b> (jusqu'à +10).`,`Level this item to ${itemMax(it)} to unlock its <b>Tempering</b> (up to +10).`)}</p></div>`}
{const pe=pEquip;pEquip=function(){let h=pe.apply(this,arguments);try{const it=S.items.find(x=>x.id===UI.sel);
  if(it&&h.indexOf(`data-a="upitem" data-v="${it.id}"`)>=0){const i=h.indexOf('<div class="chips">');if(i>0)h=h.slice(0,i)+(tpOk(it)?tpCard(it):tpHint(it))+'\n  '+h.slice(i)}}catch(e){}return h}}
document.addEventListener('click',e=>{const b=e.target.closest&&e.target.closest('[data-a="tremper"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();
  const it=S.items.find(x=>x.id==b.dataset.v);if(!it||!tpOk(it)||tpOf(it)>=TP_MAX)return;const c=tpCost(it);
  if(S.gold<c.g){toast(T("Pas assez d'or.",'Not enough gold.'));return}if(lunes()<c.l){toast(T('Pas assez de Larmes de Lune 🌙 : gagne des combats en Difficile, en Cauchemar ou au Donjon des Échos.','Not enough Moon Tears 🌙: win Hard or Nightmare battles, or run the Echo Dungeon.'));return}
  S.gold-=c.g;S.lunes=lunes()-c.l;it.tp=tpOf(it)+1;try{TPX={t:0,v:0}}catch(er){}save();
  toast(`🔨 ${itemName(it)} +${it.tp} !`);try{q('up')}catch(er){}render()},true);

/* ---------- 2. les Larmes de Lune ---------- */
const DAYCAP=60;
const dayK=()=>{const d=new Date();return d.getFullYear()+'-'+(d.getMonth()+1)+'-'+d.getDate()};
/* les victoires rejouées sont plafonnées à 60 Larmes par jour ; les premières victoires en Cauchemar et le donjon ne le sont pas */
function giveL(n,capped){n=Math.max(0,Math.round(n));if(!n)return 0;if(capped){const d=dayK();if(!S.lmd||S.lmd.d!==d)S.lmd={d,n:0};n=Math.min(n,DAYCAP-S.lmd.n);if(n<=0)return 0;S.lmd.n+=n}
  S.lunes=lunes()+n;return n}
window.RDElunes={give:giveL,get:lunes};
const addRw=txt=>{try{const rw=document.querySelector('#battle .result .rw');if(rw)rw.insertAdjacentHTML('beforeend',`<span class="tplw">${txt}</span>`)}catch(e){}};
{const fi=finish;finish=function(res){
  let hd=0,cm=0,c0=0;try{if(typeof B!=='undefined'&&B&&!B.done){hd=+B.hard||0;cm=+B.cauch||0;c0=S.cmax||0}}catch(e){}
  const r=fi.apply(this,arguments);
  try{if(res===true&&(hd||cm)){let n=0;
      if(cm){n+=giveL(cm%10===0?15:5,true);if((S.cmax||0)>c0)n+=giveL(cm%10===0?30:10,false)}
      else n+=giveL(hd%10===0?6:2,true);
      if(n){save();addRw(`${LUNE} ${n} ${T('Larmes de Lune','Moon Tears')}`)}
      else if(S.lmd&&S.lmd.n>=DAYCAP)addRw(`${LUNE} ${T("Larmes de Lune : plafond du jour atteint (60)","Moon Tears: daily cap reached (60)")}`)}}catch(e){}
  return r}}
if(typeof dgEnd==='function'){const de=dgEnd;dgEnd=function(win,rw){let depth=0,had=false;try{const R=DG().run;if(R){had=true;depth=R.fl*DG_ROWS+(R.pos?R.pos[0]+1:0)}}catch(e){}
  const out=de.apply(this,arguments);
  try{if(!had)return out;const n=giveL(Math.min(25,2+Math.floor(depth/2))+(win?10:0),false);if(n){save();const t=`${LUNE} ${n} ${T('Larmes de Lune','Moon Tears')}`;if(Array.isArray(out))out.push(t);else if(Array.isArray(rw)&&rw!==out)rw.push(t)}}catch(e){}
  return out}}

/* ---------- 3. les Chroniques des Héros s'en vont ---------- */
setTimeout(()=>{try{if(S.hcGone||!window.RDEhc)return;const L=RDEhc.list();let gm=0;const names=[];
  L.forEach((C,ci)=>{try{const N=C.ch.length;let k=0;for(let i=0;i<N;i++)if(RDEhc.done(ci,i))k++;if(k>0&&k<N){gm+=150;names.push(C.n)}}catch(e){}});
  S.hcGone=1;if(gm){S.gems+=gm;save();
    try{modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">📖 ${T('Les Chroniques des Héros se terminent','Hero Chronicles are ending')}</div>
      <p class="sub">${T("Les nouveaux héros arriveront désormais avec un <b>événement de saison</b> (monnaie et boutique exclusives). Tu avais commencé","New heroes will now arrive with a <b>seasonal event</b> (exclusive currency and shop). You had started")} ${names.map(x=>'« '+esc(x)+' »').join(', ')} : ${T('voici','here are')} <b>${GEM}${gm} ${T('gemmes','gems')}</b> ${T("pour ce que tu n'as pas pu finir. Tout ce que tu as déjà gagné (héros, titres, cadres, ×10 offerts) reste à toi.","for what you could not finish. Everything you already earned (heroes, titles, frames, free ×10) stays yours.")}</p>
      <button class="btn p" data-a="close" style="width:100%;margin-top:10px">${T('Merci !','Thanks!')}</button>`)}catch(e){}}
  else save()}catch(e){}},5000);

/* ---------- styles ---------- */
try{const st=document.createElement('style');st.id='v457css';st.textContent=`
.tpcard{border-color:#b98a3e!important;background:radial-gradient(120% 140% at 0% 0%,rgba(255,170,80,.16),transparent 55%),var(--panel)!important}
.tpcard .tphd{display:flex;gap:10px;align-items:flex-start}.tpcard .tpic{font-size:26px;line-height:1;filter:drop-shadow(0 2px 6px rgba(255,150,60,.5))}
.tpcard .h3 small{font-size:12px;opacity:.7}.tpcard .muted{margin:4px 0 0;font-size:12.5px}
.tppips{display:grid;grid-template-columns:repeat(10,1fr);gap:4px;margin:10px 0}.tppips i{height:7px;border-radius:4px;background:rgba(255,255,255,.12)}
.tppips i.on{background:linear-gradient(90deg,#ffb347,#ffd98a);box-shadow:0 0 8px rgba(255,180,80,.6)}
.tpcard .tpgo{width:100%}.tpcard .tpmax{margin:4px 0;font-weight:800;color:#ffd98a;text-align:center}
.tpcard .tpsrc{margin:8px 0 0;font-size:12px;color:var(--muted)}.tpcard.tpoff{display:flex;gap:10px;align-items:center}.tpcard.tpoff p{margin:0}
.it .in b.tpb{display:inline-block;font-size:10.5px;padding:0 5px;border-radius:7px;background:linear-gradient(90deg,#b8661c,#e8a13a);color:#fff;margin-right:3px;vertical-align:1px}
.cmcour{margin:2px 0 8px;padding:8px 10px;border-radius:12px;background:rgba(255,106,138,.12);border:1px solid rgba(255,106,138,.35);font-size:13px}
.cmcour span{color:var(--muted)}`;document.head.appendChild(st)}catch(e){}

/* ---------- notes de version ---------- */
try{const it=[
  "🌙 Le mode <b>Cauchemar</b> est jouable : l'étape 1 demande à peu près la puissance de la fin du Difficile, et la difficulté monte doucement jusqu'à l'étape 100.",
  "💪 <b>Courage</b> : chaque défaite sur une étape du Cauchemar donne +3 % de PV, d'ATQ et de DÉF pour le prochain essai (jusqu'à +30 %). Il repart à zéro quand tu gagnes.",
  "🔨 Nouveau : la <b>Trempe</b>. Un objet épique ou céleste au niveau max peut être trempé de +1 à +10 : chaque palier donne +0,4 % de PV, d'ATQ et de DÉF au héros qui le porte (jusqu'à +20 % avec 5 objets à +10).",
  "🌙 Les <b>Larmes de Lune</b> paient la Trempe : victoires en Difficile et en Cauchemar (60 par jour), premières victoires en Cauchemar et Donjon des Échos (sans limite).",
  "📖 Les <b>Chroniques des Héros</b> se terminent : les nouveaux héros arriveront avec un événement de saison. Tout ce que tu as gagné reste à toi, et une chronique commencée est remboursée en gemmes."];
 PATCH.unshift({v:81,d:'27 novembre 2026',t:'La Trempe et un Cauchemar jouable',items:it});
 const E=[
  "🌙 The <b>Nightmare</b> mode is playable: stage 1 asks for about the power you have at the end of Hard, and the difficulty rises gently up to stage 100.",
  "💪 <b>Courage</b>: each defeat on a Nightmare stage gives +3% HP, ATK and DEF for the next try (up to +30%). It resets when you win.",
  "🔨 New: <b>Tempering</b>. An Epic or Celestial item at max level can be tempered from +1 to +10: each level gives +0.4% HP, ATK and DEF to the hero wearing it (up to +20% with 5 items at +10).",
  "🌙 The <b>Moon Tears</b> pay for Tempering: Hard and Nightmare wins (60 per day), first Nightmare wins and the Echo Dungeon (no limit).",
  "📖 The <b>Hero Chronicles</b> are ending: new heroes will arrive with a seasonal event. Everything you earned stays yours, and a started chronicle is refunded in gems."];
 const sp=x=>String(x).split(/<[^>]+>/).map(y=>y.trim()).filter(y=>/[A-Za-zÀ-ÿ]/.test(y));
 const put=(fr,en)=>{const f=sp(fr),g=sp(en);if(f.length!==g.length)return;f.forEach((x,i)=>{if(!/[A-Za-zÀ-ÿ]{2}/.test(x))return;const k=x.replace(NUMRX,'#');if(!(k in I18N_EN))I18N_EN[k]=g[i].replace(NUMRX,'#')})};
 it.forEach((x,i)=>{I18N_EN[x]=E[i];put(x,E[i])});
 const X={'La Trempe et un Cauchemar jouable':'Tempering and a playable Nightmare'};
 for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
}catch(e){console.warn('v457',e)}})();
