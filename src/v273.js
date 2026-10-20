/* ================= V26.6+ : atelier lisible sur téléphone, plus de remontée, améliorations Max ================= */
/* garder la position de la fiche du héros APRÈS l'ajout de l'atelier */
{const hm=heroModal;heroModal=function(id){const same=UI.hmId===id&&$('#ovl .modal');const ov=$('#ovl .ov'),md=$('#ovl .modal');const so=same&&ov?ov.scrollTop:0,sm=same&&md?md.scrollTop:0,wy=window.scrollY;
  hm.apply(this,arguments);UI.hmId=id;if(!same)return;const put=()=>{const o2=$('#ovl .ov'),m2=$('#ovl .modal');if(o2)o2.scrollTop=so;if(m2)m2.scrollTop=sm;if(Math.abs(window.scrollY-wy)>2)window.scrollTo(0,wy)};put();requestAnimationFrame(put);setTimeout(put,60)}}
{const cm=closeModal;closeModal=function(){UI.hmId=null;return cm.apply(this,arguments)}}
/* boutons Max (héros et équipement) */
function lvlMaxN(o){let n=0,g=0,l=o.l;while(l<100&&g+lvlCost(l)<=S.gold){g+=lvlCost(l);l++;n++}return{n,g}}
function itMaxN(it){let n=0,g=0;const t={...it};while(t.l<itemMax(t)&&g+upCost(t)<=S.gold){g+=upCost(t);t.l++;n++}return{n,g}}
{const hm=heroModal;heroModal=function(id){hm.apply(this,arguments);try{const m=$('#ovl .modal'),o=S.heroes[id];if(!m||!o)return;
  const b10=m.querySelector('[data-a="lvl"][data-n="10"]');if(b10&&!m.querySelector('[data-a="lvl"][data-n="max"]')){const r=lvlMaxN(o);if(r.n>10){const l0=o.l;b10.insertAdjacentHTML('afterend',`<button class="btn g" data-a="lvl" data-v="${id}" data-n="max">Max +${r.n} · ${GOLD}${fmt(r.g)}${gainTag(()=>{o.l=l0+r.n},()=>{o.l=l0},id)}</button>`)}}
  m.querySelectorAll('.hfi').forEach(row=>{const b=row.querySelector('[data-a="hfup"][data-n="10"]');if(!b||row.querySelector('[data-n="max"]'))return;const it=S.items.find(x=>x.id==b.dataset.v);if(!it)return;const r=itMaxN(it);if(r.n>10){const l0=it.l;b.insertAdjacentHTML('afterend',`<button class="btn sm g" data-a="hfup" data-v="${it.id}" data-n="${r.n}" data-h="${id}">Max +${r.n}${gainTag(()=>{it.l=l0+r.n},()=>{it.l=l0},id)}</button>`)}})}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="lvl"][data-n="max"]');if(!t)return;e.preventDefault();e.stopPropagation();const id=+t.dataset.v,o=S.heroes[id];let c=0;while(o.l<100&&S.gold>=lvlCost(o.l)){S.gold-=lvlCost(o.l);o.l++;c++}if(c){try{q('lvl')}catch(e){}toast(HEROES[id].n+' passe niveau '+o.l)}save();render();heroModal(id)},true);
