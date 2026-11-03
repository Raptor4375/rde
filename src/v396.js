
/* ================= ÉQUILIBRAGE : Fortuna et Aléa =================
   Fortuna : -30 % de dégâts sur sa Roulette (machine à sous, jackpots, pluie de jetons) et moins de 7 sur les rouleaux
   (son évolution n'ajoute plus de 7). Aléa : -18 % de dégâts sur sa main de poker et sa carte cachée. */
(function(){try{
const FN=.7,AN=.82;
{const d0=deal;deal=function(s,t,pct,o){try{if(s&&o&&(o.sk||o.ub||o.al)){if(s.hid===FORTUNA)pct*=FN;else if(typeof ALEA!=='undefined'&&s.hid===ALEA)pct*=AN}}catch(e){}return o===undefined?d0.call(this,s,t,pct):d0.call(this,s,t,pct,o)}}
/* moins de jackpots : pendant la roulette, l'évolution ne compte plus dans les chances de 7 */
{const c0=casino;casino=async function(u){if(!u||u.hid!==FORTUNA)return c0.apply(this,arguments);const e=u.evo;u.evo=0;try{return await c0.apply(this,arguments)}finally{u.evo=e}}}
try{const P=PATCH.find(x=>x.v===42);const I=["⚖️ <b>Équilibrage</b> : Fortuna fait 30 % de dégâts en moins avec sa Roulette et tombe moins souvent sur le jackpot. Aléa fait 18 % de dégâts en moins avec ses mains de poker.","🎨 Les bras d'Orion, de Séraphine et de Léviathane sont enfin finis (et leurs apparences avec)."];
  if(P)P.items.push(...I);
  I18N_EN[I[0]]="⚖️ <b>Balance</b>: Fortuna deals 30% less damage with her Roulette and hits the jackpot less often. Aléa deals 18% less damage with his poker hands.";
  I18N_EN[I[1]]="🎨 Orion's, Séraphine's and Léviathane's arms are finally finished (and so are their skins).";}catch(e){}
}catch(e){console.warn('équilibrage',e)}})();
