/* ================= V36.5 : méta sans épiques quand on a mieux + bouton « appliquer la méta » ================= */
/* la méta perso ne prend que tes légendaires et plus si tu en as au moins 5 */
myBest=function(mk){if(Date.now()-MYB.t>800){MYB.t=Date.now();MYB.m={}}if(MYB.m[mk])return MYB.m[mk];
  let pool=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]);const hi=pool.filter(i=>HEROES[i].r>=4);if(hi.length>=5)pool=hi;
  return MYB.m[mk]=bestTeam(pool,mk,ownVal(mk))};
/* sous l'équipe : si elle n'est pas la méta, un bouton pour la mettre en un clic */
{const tp=teamPick;teamPick=function(mk){let h=tp.apply(this,arguments);try{if(teamEff(teamIdsFor(mk),mk)<97)h=h.replace(/(<button class="lnk" data-a="gometa")/,`<button class="chip on" data-a="tmeta" data-v="${mk}" style="padding:2px 10px;font-size:12px">⚡ Mettre la méta</button> · $1`)}catch(e){}return h}}
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("⚡ Bouton <b>Mettre la méta</b> sous chaque équipe qui n'est pas optimale ; la méta perso utilise tes légendaires et mythiques en priorité.")}catch(e){}
/* la méta du royaume (page Méta) : seulement légendaires et mythiques */
metaTeam=function(mk,noLeg){const k=mk+(noLeg?'n':'')+'h';if(METAC[k])return METAC[k];return METAC[k]=bestTeam(HEROES.filter(h=>noLeg?h.r<4:h.r>=4).map(h=>h.i),mk,refVal(mk))};
