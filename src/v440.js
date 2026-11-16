/* ================= V440 : ARÈNE — FINI LES COMBATS SANS FIN =================
   Mesure : une équipe Aegis + Corvin + Lyra contre sa copie donnait 2,4 M de boucliers par combat et par camp ;
   après 20 tours, les deux camps étaient encore à 100 % de PV (1 combat sur 40 finissait par K.-O.).
   Entre deux équipes de héros (arène, tournoi, Guerre des Cieux, guerre de guildes), et seulement là :
   · un bouclier ne peut pas dépasser 50 % des PV max du héros qui le porte ;
   · à partir du 6e tour, la Fureur de l'arène monte : chaque tour, +20 % de dégâts et −15 % de soins et de boucliers.
   Résultat en simulation : ce même miroir finit par K.-O. 40 fois sur 40, en 10 tours en moyenne.
   Rien ne change en mode Aventure, raids, boss, événements contre des monstres. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const R={r0:6,a:.20,b:.15,cap:.5};
const lvl=()=>{try{return B&&B.fury?Math.max(0,(B.round||0)-R.r0+1):0}catch(e){return 0}};
const pvp=()=>{try{const F=B.units.filter(u=>u.side===1);return F.length>0&&F.every(u=>u.fq&&u.hid!=null&&!u.boss&&!u.raid)}catch(e){return false}};

/* les dégâts montent */
{const d0=deal;deal=function(s,t,pct,o){try{const n=lvl();if(n>0)pct*=1+R.a*n}catch(e){}return d0.call(this,s,t,pct,o)}}
/* les soins baissent */
{const h0=heal;heal=function(t,v){try{const n=lvl();if(n>0)v*=Math.max(0,1-R.b*n)}catch(e){}return h0.call(this,t,v)}}
/* les boucliers : baissent avec la Fureur et sont plafonnés (toutes les sources : ultimes, passifs, ultras…) */
function guardSh(u){if(!u||u.__shg)return;let s=+u.sh||0;
  Object.defineProperty(u,'sh',{configurable:true,enumerable:true,get(){return s},set(v){v=+v||0;
    try{if(v>s){const n=lvl();if(n>0)v=s+(v-s)*Math.max(0,1-R.b*n);const c=R.cap*(u.max||0);if(c>0&&v>c)v=Math.max(c,Math.min(s,v))}}catch(e){}
    s=v}});
  Object.defineProperty(u,'__shg',{value:1,enumerable:false})}

/* mise en place juste avant le premier tour */
{const ml=metaLog;metaLog=function(){const r=ml.apply(this,arguments);
  try{if(B&&pvp()){B.fury=1;B.furyR=0;for(const u of B.units)guardSh(u);
    log(`🔥 ${T("Règle de l'arène : à partir du 6e tour, la Fureur monte (+20 % de dégâts, −15 % de soins et de boucliers par tour). Un bouclier ne dépasse jamais 50 % des PV.","Arena rule: from turn 6, Fury rises (+20 % damage, −15 % healing and shields per turn). A shield never exceeds 50 % of max HP.")}`,'sk')}}catch(e){}
  return r}}

/* à chaque nouveau tour de Fureur : une ligne dans le journal et la pastille dans l'en-tête */
function furyChip(n){try{const t=document.querySelector('#battle .bh .t');if(!t)return;let c=t.querySelector('.bfury');
  if(!c){c=document.createElement('span');c.className='bfury';const sm=t.querySelector('small');t.insertBefore(c,sm||null)}
  c.textContent=`🔥 +${Math.round(R.a*n*100)} %`;c.title=T(`Fureur de l'arène : dégâts +${Math.round(R.a*n*100)} %, soins et boucliers −${Math.min(100,Math.round(R.b*n*100))} %`,`Arena Fury: damage +${Math.round(R.a*n*100)} %, healing and shields −${Math.min(100,Math.round(R.b*n*100))} %`);
  c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}catch(e){}}
{const a0=act;act=async function(u){try{if(B&&B.fury&&B.round!==B.furyR){B.furyR=B.round;const n=lvl();
    if(n>0){const hp=Math.min(100,Math.round(R.b*n*100));log(`🔥 ${T('Fureur de l\'arène','Arena Fury')} (${T('tour','turn')} ${B.round}) : ${T('dégâts','damage')} +${Math.round(R.a*n*100)} %, ${T('soins et boucliers','healing and shields')} −${hp} %`,'sk');if(!B.skip)furyChip(n)}}}catch(e){}
  return a0.apply(this,arguments)}}

const st=document.createElement('style');st.id='v440css';st.textContent=`
#battle .bh .bfury{display:inline-block;margin-left:6px;font-family:var(--fb);font-size:10.5px;font-weight:900;letter-spacing:.04em;padding:2px 7px;border-radius:7px;vertical-align:3px;
 color:#fff;background:linear-gradient(180deg,#ff8a3a,#e0442a);box-shadow:0 0 10px rgba(255,110,50,.55),inset 0 1px 0 rgba(255,255,255,.35)}
#battle .bh .bfury.bump{animation:bfury .5s ease-out}
@keyframes bfury{0%{transform:scale(1.35);filter:brightness(1.5)}100%{transform:none;filter:none}}`;
document.head.appendChild(st);

/* notes de version */
try{const it=[
 "🔥 <b>Arène : fini les combats sans fin.</b> Entre deux équipes de héros (arène, tournoi, Guerre des Cieux, guerre de guildes), la <b>Fureur de l'arène</b> monte à partir du 6e tour : chaque tour, <b>+20 % de dégâts</b> et <b>−15 % de soins et de boucliers</b>. Et un bouclier ne dépasse plus <b>50 % des PV</b> du héros.",
 "🛡️ Avant, une équipe Aegis + Corvin + Lyra contre sa copie finissait à 100 % de PV des deux côtés après 20 tours. Maintenant le combat se termine par K.-O., en 10 tours en moyenne. Rien ne change contre les monstres, les boss et les raids."];
 PATCH.unshift({v:'v66',d:Date.now(),t:"Arène : la Fureur",items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN["Arène : la Fureur"]='Arena: Fury';
  I18N_EN[it[0]]="🔥 <b>Arena: no more endless fights.</b> Between two hero teams (arena, tournament, War of the Skies, guild wars), <b>Arena Fury</b> rises from turn 6: every turn, <b>+20 % damage</b> and <b>−15 % healing and shields</b>. And a shield can no longer exceed <b>50 % of the hero's max HP</b>.";
  I18N_EN[it[1]]="🛡️ Before, an Aegis + Corvin + Lyra team against its own copy ended at 100 % HP on both sides after 20 turns. Now the fight ends by KO, in 10 turns on average. Nothing changes against monsters, bosses and raids."}}catch(e){}
}catch(e){console.warn('v440',e)}})();
