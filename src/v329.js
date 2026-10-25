
/* ================= Bannières limitées : 2 semaines maximum ================= */
/* Règle : une bannière de nouveau personnage dure au maximum 14 jours, puis elle disparaît.
   Pour en ajouter une : BANS.cle={n:'Nom',start:'AAAA-MM-JJ'} (la fin est calculée toute seule). */
const BAN_DAYS=14;
const BANS={fo:{n:'Casino de Fortuna',start:'2026-10-01',end:'2026-10-25'},al:{n:"Table d'Aléa",start:'2026-10-20',end:'2026-10-25'}};
function banEnd(k){const b=BANS[k];if(!b)return null;if(b.end)return new Date(b.end+'T00:00:00').getTime();return new Date(b.start+'T00:00:00').getTime()+BAN_DAYS*864e5}
function banOpen(k){const b=BANS[k];if(!b)return true;const e=banEnd(k);return Date.now()<e&&Date.now()>=new Date(b.start+'T00:00:00').getTime()}
function banLeft(k){const e=banEnd(k);if(!e)return'';const d=Math.ceil((e-Date.now())/864e5);return d>1?`Encore ${d} jours`:d===1?'Dernier jour !':''}
const stripBan=(h,k)=>h.replace(new RegExp(`<button class="chip[^"]*" data-a="(ban|csub)" data-v="${k}">[\\s\\S]*?<\\/button>`,'g'),'');
{const ps=pSummon;pSummon=function(){if(UI.ban&&BANS[UI.ban]&&!banOpen(UI.ban))UI.ban='wk';let h=ps.apply(this,arguments);for(const k in BANS)if(!banOpen(k))h=stripBan(h,k);
  try{if(UI.ban&&BANS[UI.ban]&&banOpen(UI.ban)){const L=banLeft(UI.ban);if(L)h=h.replace(/(<span class="tag"[^>]*>)/,`$1⏳ ${L} · `)}}catch(e){}return h}}
{const cp=casPage;casPage=function(){if(UI.csub==='al'&&!banOpen('al'))UI.csub='shop';let h=cp.apply(this,arguments);if(!banOpen('al'))h=stripBan(h,'al');return h}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="algo"]');if(!t||banOpen('al'))return;e.preventDefault();e.stopPropagation();closeModal();toast("🃏 La Table d'Aléa est fermée : les bannières de personnage ne durent que 2 semaines.")},true);
try{PATCH.unshift({v:33,d:'26 octobre 2026',t:'Bannières limitées',items:["⏳ <b>Les bannières de personnage sont maintenant limitées</b> : 2 semaines maximum, avec un compte à rebours sur la bannière.","🎰 La bannière du <b>Casino de Fortuna</b> et la <b>Table d'Aléa</b> sont terminées. Merci à tous ceux qui ont tenté leur chance ! Le Héros de la semaine reste disponible."]})}catch(e){}
