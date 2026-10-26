
/* ================= Progression des bots comme de vrais joueurs ================= */
/* Avant : l'élite visait 1,2 à 2,1 fois la puissance du meilleur vrai joueur, et tout le monde continuait
   de grimper de 2 à 3 % par jour pour toujours. Maintenant chaque bot est un « joueur » avec :
   - un niveau d'investissement fixe (occasionnel, régulier, investi, acharné, légende) = un plafond,
   - une carrière : il progresse vite au début, puis de plus en plus lentement, et finit par plafonner,
   - rien n'est calculé à partir de TA puissance. Les bots déjà trop hauts ne redescendent pas : ils arrêtent de monter. */
function botCeil(u){
  if(u<.45)return 6000+Math.pow(u/.45,1.3)*39000;          // occasionnels : 6 k à 45 k
  if(u<.75)return 45000+(u-.45)/.30*65000;                  // réguliers : 45 k à 110 k
  if(u<.92)return 110000+(u-.75)/.17*80000;                 // investis : 110 k à 190 k
  if(u<.985)return 190000+(u-.92)/.065*50000;               // acharnés : 190 k à 240 k
  return 240000+(u-.985)/.015*35000}                        // légendes : 240 k à 275 k
const BOT_P0=1100;
function botCareer(b,t){const u=botU(b);const c=b.c34||(b.c34=Math.round(botCeil(u)));
  if(!b.tau34){const a=clamp(b.act||.2,.04,.5),v=((Math.floor(u*1e6)%97)/97-.5)*14;b.tau34=Math.max(12,Math.round(18+(.45-a)*120+v))}
  if(!b.j34){const pw=Math.max(BOT_P0,b.pw||BOT_P0);
    if(pw<c*.985){const days=-b.tau34*Math.log(1-(pw-BOT_P0)/(c-BOT_P0));b.j34=Math.round(t-days*864e5)}
    else{b.j34=Math.round(t-b.tau34*10*864e5);if(pw>c)b.fz34=Math.round(pw)}}
  const d=Math.max(0,(t-b.j34)/864e5);return{c,tgt:BOT_P0+(c-BOT_P0)*(1-Math.exp(-d/b.tau34))}}
growPw=function(b,t){
  const dk=dayKey(t);if(b.dk!==dk){b.dk=dk;b.pwY=b.pw}
  const {tgt}=botCareer(b,t),allow=Math.max(tgt,b.fz34||0);
  let pw=b.pw||BOT_P0;
  if(pw<tgt)pw+=(tgt-pw)*(.12+.2*Math.random());
  if(pw>allow)pw=allow;                                      /* absorbe les « coups de chance » d'invocation au-delà de la carrière */
  pw=Math.round(pw);
  try{
    if(!Array.isArray(b.raid))b.raid=[0,0,0];
    if(Math.random()<.12){const i=ri(0,2),tg=Math.round(pw*effK(pw,K_RAID)*(b.skill||1)*(.9+Math.random()*.2));if(b.raid[i]<tg)b.raid[i]=Math.round(b.raid[i]+(tg-b.raid[i])*(.3+Math.random()*.35))}
    const bk=Math.floor(Math.log2(Math.max(1000,pw)));if(b.tb==null)b.tb=bk;else if(bk>b.tb){b.tb=bk;if(Math.random()<.7)b.team=genTeam2(pw,b)}
  }catch(e){}
  return pw};
/* arène : le classement d'un bot dépend de SA puissance et de son talent, plus du meilleur joueur */
arTgt=function(b){const u=botU(b);return clamp(Math.round(arDef(b.pw)+(u-.5)*160+((b.skill||1)-1)*200),600,2400)};
try{PATCH.unshift({v:35.1,d:'26 octobre 2026',t:'Des rivaux qui progressent comme de vrais joueurs',items:["📈 <b>Les autres joueurs du royaume progressent maintenant comme de vrais joueurs</b> : vite au début, puis de plus en plus lentement, jusqu'à leur plafond. Fini la montée à l'infini.","🏆 Chacun a son niveau : occasionnels, réguliers, investis, acharnés… et quelques légendes. Leur puissance ne dépend plus de la tienne.","⚔️ Pareil pour l'arène et les records de raid : plus de rivaux qui se calent toujours juste au-dessus de toi."]})}catch(e){}
