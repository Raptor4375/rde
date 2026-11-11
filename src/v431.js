/* ================= V431 : ÉQUILIBRAGE DES NOUVEAUX HÉROS (d'après ~4 000 combats simulés) =================
   Éryndel (mythique) était sous le niveau d'un légendaire, Lyra s'effondrait en Aventure (pas assez de soin),
   Sorën ne servait à rien en raid, Garance était juste en dessous en arène.
   Les réglages sont dans window.RDEBAL pour pouvoir les re-simuler. */
window.RDEBAL=Object.assign({eryAura:.25,eryD:250,eryDot:75,eryBurn:.3,lyH:180,lySh:100,sorRef:2,sorBoss:.25,garX:1.3,garWin:60,garLs:.4,garD:370},window.RDEBAL||{});
(function(){try{
const BAL=window.RDEBAL;
const H=i=>{try{return HEROES[i]}catch(e){return null}};
const fixFx=()=>{try{
  const e=typeof ERY!=='undefined'&&H(ERY);if(e){e.sk.fx.dmg=BAL.eryD;e.sk.fx.dot=BAL.eryDot}
  const g=typeof GAR!=='undefined'&&H(GAR);if(g)g.sk.fx.dmg=BAL.garD;
  const l=typeof LYR!=='undefined'&&H(LYR);if(l){l.sk.fx.healall=BAL.lyH;if(BAL.lySh)l.sk.fx.shield=BAL.lySh;else delete l.sk.fx.shield}
 }catch(e){}};
window.RDEbalFix=fixFx;fixFx();
{const sb=startBattle;startBattle=function(){fixFx();return sb.apply(this,arguments)}}
{const hm=heroModal;heroModal=function(){fixFx();return hm.apply(this,arguments)}}
{const rd=render;render=function(){fixFx();return rd.apply(this,arguments)}}
const vis=()=>typeof B!=='undefined'&&B&&!B.skip&&!(typeof REDUCED!=='undefined'&&REDUCED);
/* --- Éryndel : les cendres. Un ennemi qui brûle subit plus de dégâts d'Éryndel --- */
{const d0=deal;deal=function(s,t,pct,o){o=o||{};let p=pct;
  try{if(BAL.eryBurn&&typeof ERY!=='undefined'&&s&&s.hid===ERY&&t&&t.dot)p*=1+BAL.eryBurn}catch(e){}
  try{const D=B&&B.duel;if(BAL.garX!==1&&D&&s===D.u&&t===D.t&&t.hp>0&&B.round<=D.until)p*=BAL.garX}catch(e){}
  const hp0=t?t.hp:0;const r=d0.call(this,s,t,p,o);
  /* Garance : vol de vie pendant son duel */
  try{const D=B&&B.duel;if(BAL.garLs&&D&&s===D.u&&s.hid===GAR&&r>0&&s.hp>0)s.hp=Math.min(s.max,s.hp+Math.round(r*BAL.garLs))}catch(e){}
  /* Sorën : ses attaques normales gardent la cible marquée */
  try{if(BAL.sorRef&&typeof SOR!=='undefined'&&s&&s.hid===SOR&&t&&t.hp>0&&!o.sk&&!o.ub&&!o.ct&&(t.markT>0||t.boss))t.markT=Math.max(t.markT||0,BAL.sorRef)}catch(e){}
  return r}}
/* Sorën : la marque vaut plus sur un boss */
{const h3=hurt;hurt=function(t,d,c){try{if(BAL.sorBoss&&t&&t.boss&&t.markT>0&&d>0)d=Math.round(d*(1+BAL.sorBoss))}catch(e){}return h3.call(this,t,d,c)}}
/* Éryndel : « Roi de Cendre », ses alliés frappent plus fort tant qu'il est là */
{const am=applyMeta;applyMeta=function(units,mk){const r=am.apply(this,arguments);
  try{if(BAL.eryAura&&typeof ERY!=='undefined'){const k=units.find(u=>u.hid===ERY);if(k)for(const u of units)if(u!==k&&u.side===k.side)u.atk=Math.round(u.atk*(1+BAL.eryAura))}}catch(e){}return r}}
/* --- raids et boss de guilde : on compte les VRAIS dégâts ---
   Avant, les dégâts sur la durée (brûlure, poison…) et les bonus de marque n'étaient comptés pour personne. */
{const hu=hurt;hurt=function(t,d,c){const h0=t?t.hp:0;const r=hu.apply(this,arguments);
  try{if(B&&t&&t.side===1&&t.raid&&h0>t.hp)B.realDmg=(B.realDmg||0)+(h0-t.hp)}catch(e){}return r}}
{const f0=finish;finish=function(res){try{if(B&&!B.done&&B.realDmg>0&&B.units.some(u=>u.side===1&&u.raid)){const al=B.units.filter(u=>u.side===0),c=al.reduce((a,u)=>a+(u.dmg||0),0);
   if(c>0&&B.realDmg>c){const k=B.realDmg/c;for(const u of al)u.dmg=Math.round((u.dmg||0)*k)}}}catch(e){}return f0.apply(this,arguments)}}
/* Garance : gagner le duel lui rend des forces */
{const r0=refreshUnits;refreshUnits=function(){const r=r0.apply(this,arguments);
  try{const D=B&&B.duel;if(BAL.garWin&&D&&D.won&&!D.rew&&D.u&&D.u.hp>0){D.rew=1;const u=D.u;u.en=Math.min(100,(u.en||0)+BAL.garWin);u.hp=Math.min(u.max,u.hp+Math.round(u.max*.2));
    log(`⚔️ Victoire en duel : <b>${u.name}</b> récupère 20 % de ses PV et ${BAL.garWin} énergie.`,'sk');if(vis())try{float(u,'+'+BAL.garWin+' ⚡','heal')}catch(e){}}}catch(e){}
  return r}}
/* --- les nouveaux passifs sur les fiches --- */
const PB=(ic,n,t)=>`<div class="skill balpas"><div class="sn">${ic} ${n}</div><div class="muted" style="font-size:11px;font-weight:800;letter-spacing:.05em">PASSIF</div><div style="margin-top:4px">${t}</div></div>`;
const PX=()=>{const o={};try{o[ERY]=PB('🔥','Roi de Cendre',`Tant qu'Éryndel est dans l'équipe, ses alliés ont <b>+${Math.round(BAL.eryAura*100)} % ATQ</b>. Les ennemis qui brûlent subissent <b>+${Math.round(BAL.eryBurn*100)} %</b> de ses dégâts.`)}catch(e){}
  try{o[SOR]=PB('🎯','Marque tenace',`Ses attaques normales <b>gardent la cible marquée</b> (et marquent toujours les boss). Sur un boss, la marque fait <b>+${Math.round(BAL.sorBoss*100)} %</b> de dégâts en plus.`)}catch(e){}
  try{o[GAR]=PB('🩸','Duelliste',`Contre son adversaire de duel : <b>+${Math.round((BAL.garX-1)*100)} % de dégâts</b> et <b>${Math.round(BAL.garLs*100)} % de vol de vie</b>. Gagner le duel lui rend <b>20 % PV et ${BAL.garWin} énergie</b>.`)}catch(e){}
  return o};
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{const x=PX()[+id];const m=document.querySelector('#ovl .modal');
  if(x&&m&&!m.querySelector('.balpas')){const L=[...m.querySelectorAll('.skill')];let a=L.find(e=>/ULTIME/.test(e.textContent))||L[0];if(a){while(a.nextElementSibling&&a.nextElementSibling.classList.contains('skill')&&/PASSI/.test(a.nextElementSibling.textContent))a=a.nextElementSibling;a.insertAdjacentHTML('afterend',x)}}}catch(e){}return r}}
}catch(e){console.warn('v431',e)}})();
