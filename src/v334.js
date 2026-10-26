
/* ================= Progression des bots comme de vrais joueurs (sans payer) ================= */
/* La puissance d'un bot dépend de ce qu'un vrai joueur GRATUIT peut gagner :
   - le jeu a ouvert le 1er octobre 2026, personne ne peut avoir joué plus longtemps que ça,
   - PF2P(jours) = ce qu'un joueur qui fait TOUT chaque jour peut atteindre :
       vite au début (niveaux, étapes, évolutions, équipement), puis très lentement
       (ultra-évolutions, éveil avec les doublons, 5e héros : il faut des mois de gemmes et d'éclats),
   - chaque bot a un profil (occasionnel → légende) = la part de ce maximum qu'il atteint,
   - chaque bot a commencé à jouer à une date différente (les nouveaux arrivent encore).
   Les bots qui avaient une puissance impossible redescendent à un niveau logique. */
const BOT_P0=1100;
const RDE_LAUNCH=Date.UTC(2026,9,1);
const PF2P=d=>1100+76000*(1-Math.exp(-d/10))+220000*(1-Math.exp(-d/365));
const hash01=(s,salt)=>{s=String(s)+'#'+salt;let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%10007)/10007};
function botEff(u){                                    /* part du maximum gratuit atteinte selon le profil */
  if(u<.45)return .18+u/.45*.32;                       // occasionnels : 18 à 50 %
  if(u<.75)return .50+(u-.45)/.30*.25;                 // réguliers : 50 à 75 %
  if(u<.92)return .75+(u-.75)/.17*.15;                 // investis : 75 à 90 %
  if(u<.985)return .90+(u-.92)/.065*.08;               // acharnés : 90 à 98 %
  return .98+(u-.985)/.015*.04}                        // légendes : 98 à 102 % (le meilleur possible sans payer)
function botCareer(b,t){const id=b.n||b.id||'';
  if(b.e35==null)b.e35=+botEff(botU(b)).toFixed(3);
  if(!b.j35){const lim=Math.max(RDE_LAUNCH,t-1);const j=b.joined&&b.joined>RDE_LAUNCH&&b.joined<=t?b.joined:RDE_LAUNCH+hash01(id,'start')*.85*(lim-RDE_LAUNCH);b.j35=Math.round(Math.min(j,t))}
  const d=Math.max(0,(t-b.j35)/864e5);
  /* les occasionnels finissent par lâcher (ils jouent de moins en moins) */
  const quit=b.e35<.5?Math.min(1,.4+hash01(id,'q')*.9):1;
  /* la chance aux invocations (doublons, légendaires tôt) et les économes qui gardent leurs gemmes puis invoquent d'un coup */
  const L=botLuck(id),dq=d*quit,sv=hash01(id,'sv')<.22,per=8+Math.floor(hash01(id,'per')*10);
  const ds=sv?Math.floor(dq/per)*per+(dq%per>per-1?dq%per:0):dq;
  const fast=1100+76000*(1-Math.exp(-dq/10)),slow=220000*(1-Math.exp(-ds/365));
  return{tgt:Math.max(BOT_P0,(fast*(1+(L-1)*.35)+slow*L*(sv?1.08:1))*b.e35),d}}
/* chance : la plupart entre 0,9 et 1,1, quelques chanceux jusqu'à 1,45 */
function botLuck(id){const a=hash01(id,'l1'),c=hash01(id,'l2'),z=(a+c+hash01(id,'l3')-1.5)/.5;let L=1+z*.07;if(hash01(id,'jack')>.94)L+=.15+hash01(id,'j2')*.25;return clamp(L,.85,1.45)}
growPw=function(b,t){
  const dk=dayKey(t);if(b.dk!==dk){b.dk=dk;b.pwY=b.pw}
  const {tgt}=botCareer(b,t);
  let pw=b.pw||BOT_P0;
  if(pw>tgt*1.04){pw=tgt*(1+Math.random()*.03);if(b.pwY&&b.pwY>pw)b.pwY=pw}   /* puissance impossible : retour à un niveau logique */
  else if(pw<tgt)pw+=(tgt-pw)*(.12+.2*Math.random());
  pw=Math.round(pw);
  try{
    if(!Array.isArray(b.raid))b.raid=[0,0,0];
    const rmax=Math.round(pw*effK(pw,K_RAID)*(b.skill||1)*1.1);
    for(let i=0;i<3;i++)if(b.raid[i]>rmax*1.15)b.raid[i]=Math.round(rmax*(.95+Math.random()*.1));
    if(Math.random()<.12){const i=ri(0,2),tg=Math.round(pw*effK(pw,K_RAID)*(b.skill||1)*(.9+Math.random()*.2));if(b.raid[i]<tg)b.raid[i]=Math.round(b.raid[i]+(tg-b.raid[i])*(.3+Math.random()*.35))}
    const bk=Math.floor(Math.log2(Math.max(1000,pw)));if(b.tb==null||bk<b.tb-1){b.tb=bk;b.team=genTeam2(pw,b)}else if(bk>b.tb){b.tb=bk;if(Math.random()<.7)b.team=genTeam2(pw,b)}
    if(b.st!=null){const st=stFor(pw);if(st<b.st)b.st=st}
  }catch(e){}
  return pw};
/* arène : le classement d'un bot dépend de SA puissance et de son talent, plus du meilleur joueur */
arTgt=function(b){const u=botU(b);return clamp(Math.round(arDef(b.pw)+(u-.5)*160+((b.skill||1)-1)*200),600,2400)};
{const ad=arDrift;arDrift=function(b){const r=ad.apply(this,arguments);try{const tg=arTgt(b);if(b.ar!=null&&b.ar>tg+150)b.ar=tg+ri(0,60)}catch(e){}return r}}
/* le monde local (hors ligne) se remet à niveau tout de suite au chargement */
setTimeout(()=>{try{const t=Date.now();if(S.world&&Array.isArray(S.world.players)){for(const p of S.world.players){p.pw=growPw(p,t);arDrift(p)}save()}}catch(e){}},3000);
try{PATCH.unshift({v:35.1,d:'26 octobre 2026',t:'Des rivaux logiques',items:["📈 <b>Les autres joueurs du royaume progressent comme de vrais joueurs gratuits</b> : ils ne peuvent pas avoir plus que ce que le jeu donne depuis son ouverture. Vite au début, puis lentement (ultras, éveils et 5e héros demandent des mois).","📉 Les joueurs qui avaient une puissance impossible sont <b>redescendus à un niveau logique</b>.","🏆 Chacun a son profil (occasionnel, régulier, investi, acharné, légende) et sa date d'arrivée. Leur puissance ne dépend plus de la tienne, ni en arène ni en raid."]})}catch(e){}
/* le classement en ligne affiche tout de suite la puissance logique (les données partagées se corrigent ensuite à la prochaine simulation) */
function botCapNow(b){try{const c={n:b.n,id:b.id,joined:b.joined,j35:b.j35,e35:b.e35};return botCareer(c,Date.now()).tgt*1.04}catch(e){return Infinity}}
function rowFix(r,b){if(!b)return r;const cap=botCapNow(b);if(r.pw>cap){const k=cap/r.pw;r.pw=Math.round(cap);r.st=Math.min(r.st||999,stFor(r.pw));if(Array.isArray(r.raid))r.raid=r.raid.map(x=>Math.round(x*k))}
  try{const at=arTgt({n:b.n,id:b.id,pw:r.pw,skill:r.skill});if(r.ar!=null&&r.ar>at+150)r.ar=at+60}catch(e){}return r}
{const br=botRows;botRows=function(){const L=br.apply(this,arguments);try{const M=new Map();for(const [gid,d] of Object.entries(NET.guilds||{}))for(const b of(d.bots||[]))M.set(gid+':'+b.id,b);return L.map(r=>rowFix(r,M.get(r.gidr+':'+r.bid)))}catch(e){return L}}}
{const fr=freeRows;freeRows=function(){const L=fr.apply(this,arguments);try{const M=new Map((NET.free&&NET.free.bots||[]).map(b=>[b.id,b]));return L.map(r=>rowFix(r,M.get(r.bid)))}catch(e){return L}}}
