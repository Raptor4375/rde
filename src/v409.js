/* ================= V409 : Aegis tient enfin son serment =================
   Avant, le Serment du Bouclier arrivait trop tard et ne durait pas : le temps qu'Aegis charge son ultime,
   l'équipe avait déjà pris cher. Maintenant il entre en jeu avec le serment déjà prêté, il encaisse une part
   de tous les coups à la place des siens, et chaque protection lui rend de l'énergie. */
(function(){try{
if(typeof AEG==='undefined'||!HEROES[AEG]||!HEROES[AEG].sk)return;
const F=HEROES[AEG].sk.fx;F.shield=260;F.guard=3;F.taunt=3;
/* il entre au combat le serment déjà prêté, et à moitié chargé */
{const hu=heroUnit;heroUnit=function(id,k){const un=hu.apply(this,arguments);try{if(id===AEG&&un){un.guard=3;un.en=50}}catch(e){}return un}}
/* tant que le serment tient : l'équipe encaisse moins, et Aegis prend une part des coups à sa place */
const grd=t=>{try{return B&&B.units.find(x=>x.hid===AEG&&x.side===t.side&&x!==t&&x.hp>0&&x.guard>0)}catch(e){return null}};
{const h0=hurt;hurt=function(t,d,c){let dd=d;
  try{if(B&&t&&t.hp>0&&d>2&&t.hid!==AEG&&(c==='dmg'||c==='crit')){const A=grd(t);
    if(A){dd=Math.max(1,Math.round(d*.88));const part=Math.round(dd*.25);
      if(part>0){dd-=part;h0.call(this,A,Math.max(1,Math.round(part*.6)),'dmg');A.en=Math.min(100,(A.en||0)+5)}}}}catch(e){}
  return h0.call(this,t,dd,c)}}
/* chaque fois qu'il sauve un allié d'un coup fatal, son serment se recharge */
{const ru=refreshUnits;refreshUnits=function(){try{if(B)for(const u of B.units){if(u.hid!==AEG)continue;const n=u.gsave||0;if(n>(u.gsv0||0)){u.gsv0=n;u.en=Math.min(100,(u.en||0)+25)}}}catch(e){}return ru.apply(this,arguments)}}
/* le texte de la compétence */
try{const gd=skillDesc;skillDesc=function(sk){let r=gd.apply(this,arguments);try{if(sk&&sk.fx&&sk.fx.guard)r+=" Le serment est déjà prêté au début du combat, l'équipe encaisse 12 % de dégâts en moins et Aegis prend un quart des coups à sa place.";}catch(e){}return r}}catch(e){}
try{const it=["🛡️ <b>Aegis protège enfin pour de vrai</b> : il arrive au combat avec le <b>Serment déjà prêté</b> et à moitié chargé, le serment dure plus longtemps, l'équipe encaisse <b>12 % de dégâts en moins</b> et il prend <b>un quart des coups</b> à la place de ses alliés. Chaque protection lui rend de l'énergie, et son bouclier passe de 20 % à 26 % des PV."];
 PATCH.unshift({v:50,d:'11 novembre 2026',t:'Aegis renforcé',items:it});
 I18N_EN[it[0]]="🛡️ <b>Aegis finally protects for real</b>: he enters battle with the <b>Oath already sworn</b> and half charged, the oath lasts longer, the team takes <b>12 % less damage</b> and he soaks <b>a quarter of every hit</b> for his allies. Each save gives him energy back, and his shield goes from 20 % to 26 % of max HP.";
 I18N_EN['Aegis renforcé']='Aegis buffed';
 I18N_EN["Le serment est déjà prêté au début du combat, l'équipe encaisse 12 % de dégâts en moins et Aegis prend un quart des coups à sa place."]='The oath is already sworn when the battle starts, the team takes 12 % less damage and Aegis soaks a quarter of every hit for them.'}catch(e){}
}catch(e){console.warn('aegis buff',e)}})();
