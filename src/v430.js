/* ================= V430 : MARN PLUS FORT =================
   · Point Final : 135 % → 155 % à tous les ennemis (toujours 2 tours de silence).
   · Passif : il vole 15 énergie par attaque normale (au lieu de 10) et la GARDE pour lui,
     donc il relance son silence beaucoup plus souvent. Marche aussi en ultra et en combat rapide
     (avant, en ultra-évolution, le vol ne se déclenchait pas du tout).
   · Un ennemi réduit au silence subit +20 % de dégâts de Marn.
   · La page Méta comptait le silence pour rien : il est maintenant pris en compte. */
(function(){try{
if(typeof MARN==='undefined'||!HEROES[MARN])return;
const vis=()=>typeof B!=='undefined'&&B&&!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED);
{const d0=deal;deal=function(s,t,pct,o){o=o||{};let p=pct;
  try{if(s&&s.hid===MARN&&t&&t.sil>0)p=pct*1.2}catch(e){}
  const alive0=!!(t&&t.hp>0);const r=d0.call(this,s,t,p,o);
  try{if(B&&!B.track&&s&&s.hid===MARN&&alive0&&t.hp>0&&!o.sk&&!o.ub&&!o.ct&&!o.al&&t.en>0){const v=Math.min(t.en,15);t.en-=v;s.en=Math.min(100,(s.en||0)+v);
    if(vis()){try{float(t,'♪ −'+v,'info')}catch(e){}}try{refreshOne(t);refreshOne(s)}catch(e){}}}catch(e){}
  return r}}
{const mm=modeMult;modeMult=function(h,mk){let m=mm.apply(this,arguments);try{const sl=h&&h.sk&&h.sk.fx&&h.sk.fx.silence;
  if(sl){m*=mk==='pvp'?1.16:mk==='pve'?1.08:String(mk).startsWith('raid')?1.1:1.08}}catch(e){}return m}}
try{PATCH.unshift({v:'v57',d:Date.now(),t:'Marn plus fort',items:[
 "🤐 <b>Marn</b> : « Point Final » passe de 135 % à <b>155 %</b> à tous les ennemis (toujours 2 tours de silence).",
 "Son passif vole maintenant <b>15 énergie</b> par attaque normale et <b>la garde pour lui</b> : il relance son silence bien plus souvent. Les ennemis réduits au silence subissent <b>+20 % de dégâts</b> de sa part.",
 "Correctif : en ultra-évolution, son vol d'énergie ne marchait pas du tout.",
 "La page Méta compte enfin le silence dans la valeur de Marn."]})}catch(e){}
}catch(e){console.warn('v430',e)}})();
