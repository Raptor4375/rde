/* ================= Classement logique + éveil affiché (+1, +2…) ================= */
/* 1) Aucun bot ne dépasse le meilleur VRAI joueur, sauf les très chanceux (3 ultras visibles dans leur équipe), et de 3 % au plus. */
function realTopPw(){let v=0;try{v=teamPower()}catch(e){}try{const n=Date.now(),P=NET.players||{};for(const k in P){const d=P[k];if(d&&d.pw>v&&(!d.t||n-d.t<21*864e5))v=d.pw}}catch(e){}return v||0}
{const bc=botCareer;botCareer=function(b,t){const r=bc.apply(this,arguments);try{const top=realTopPw();if(top>0){const L=botLuck(b.n||b.id||'');const cap=top*(L>=1.09?1.03:L>=1.05?.985:.96);if(r.tgt>cap)r.tgt=cap}}catch(e){}return r}}
setTimeout(()=>{try{GH.t=0;const t=Date.now();if(S.world&&Array.isArray(S.world.players)){for(const p of S.world.players)p.pw=growPw(p,t);save()}}catch(e){}},4500);
/* 2) l'éveil (doublons fusionnés) s'affiche en petit sur les héros : +1, +2… */
{const ht=heroTile;heroTile=function(h){let s=ht.apply(this,arguments);try{const o=h&&S.heroes[h.i];const a=o&&o.aw||0;if(a>0)s=s.replace(/(<span class="lv">Nv \d+)(<\/span>)/,`$1<b class="awp">+${Math.min(10,a)}</b>$2`)}catch(e){}return s}}
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{const a=(S.heroes[id]||{}).aw||0;if(a>0){const m=document.querySelector('#ovl .modal');const hh=m&&m.querySelector('.hd .h, .hd h2, .h');if(hh&&!hh.querySelector('.awp'))hh.insertAdjacentHTML('beforeend',` <b class="awp big">+${Math.min(10,a)}</b>`)}}catch(e){}return r}}
