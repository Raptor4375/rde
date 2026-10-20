
/* ================= V26.5 : héros et équipement améliorés au même endroit, la page ne remonte plus ================= */
/* la page garde sa position quand elle se redessine (sauf changement de page) */
{const r0=render;render=function(){const y=window.scrollY,k=TAB+'|'+JSON.stringify(UI.lz||{})+'|'+(UI.soc||'')+'|'+(UI.capHall?1:0);r0.apply(this,arguments);try{const k2=TAB+'|'+JSON.stringify(UI.lz||{})+'|'+(UI.soc||'')+'|'+(UI.capHall?1:0);if(k===k2&&Math.abs(window.scrollY-y)>2)window.scrollTo(0,y)}catch(e){}}}
/* une fenêtre qui se réaffiche (même héros) garde aussi sa position */
{const m0=modal;modal=function(html){const ov=$('#ovl .ov'),md=$('#ovl .modal');const key=(String(html).match(/class="h"[^>]*>([^<]{2,60})/)||[])[1]||null;const old=md&&md.dataset.mk;const so=ov?ov.scrollTop:0,sm=md?md.scrollTop:0;m0.apply(this,arguments);
  try{const m2=$('#ovl .modal'),o2=$('#ovl .ov');if(m2&&key)m2.dataset.mk=key;if(key&&old===key){if(o2)o2.scrollTop=so;if(m2)m2.scrollTop=sm}}catch(e){}}}
/* atelier du héros : améliorer son équipement sans changer de page */
function eqUpN(it,n){let c=0,g=0;while(n-->0&&it.l<itemMax(it)&&S.gold>=upCost(it)){const k=upCost(it);S.gold-=k;g+=k;it.l++;c++}if(c)try{q('up')}catch(e){}return{c,g}}
function heroForgeHTML(id){const its=[0,1,2,3,4].map(k=>S.items.find(x=>x.eq===id&&x.s===k)).filter(Boolean);
  if(!its.length)return`<div class="hfg"><div class="h3" style="margin:0 0 4px">⚒️ Atelier</div><p class="muted" style="font-size:12.5px;margin:0">Équipe ce héros (cases ci-dessus ou « Équiper auto ») pour améliorer son équipement ici.</p></div>`;
  let tot=0;for(const it of its){let l=it.l,g=0;const t={...it};while(t.l<itemMax(t)&&g+upCost(t)<=S.gold){g+=upCost(t);t.l++}tot+=t.l-it.l}
  return`<div class="hfg"><div class="row" style="justify-content:space-between;align-items:center"><div class="h3" style="margin:0">⚒️ Atelier · améliorer l'équipement</div><button class="btn sm g" data-a="hfup" data-v="all" data-h="${id}" ${tot?'':'disabled'}>Tout améliorer${tot?` (+${tot})`:''}</button></div>
   <div class="hfl">${its.map(it=>{const st=itemStats(it),c=upCost(it),mx=it.l>=itemMax(it);const s=Object.entries(st).filter(([k,v])=>v).map(([k,v])=>`${({hp:'PV',atk:'ATQ',def:'DÉF',spd:'VIT'})[k]||k} +${fmt(v)}`).join(' · ');
     return`<div class="hfi" style="${rv(it.r)}"><span class="ieq r${it.r}">${itemArt(it.s,it.r)}</span><div class="hfn"><b>${esc(itemName(it))}</b><small>Nv ${it.l}/${itemMax(it)} · ${s}</small></div>
      <div class="hfb"><button class="btn sm p" data-a="hfup" data-v="${it.id}" data-n="1" data-h="${id}" ${mx||S.gold<c?'disabled':''}>${mx?'MAX':'+1 '+GOLD+fmt(c)}</button>${mx?'':`<button class="btn sm" data-a="hfup" data-v="${it.id}" data-n="10" data-h="${id}" ${S.gold<c?'disabled':''}>+10</button>`}</div></div>`}).join('')}</div></div>`}
{const hm=heroModal;heroModal=function(id){hm.apply(this,arguments);try{const m=$('#ovl .modal');if(!m||!S.heroes[id]||m.querySelector('.hfg'))return;const sl=m.querySelector('.slots');const html=heroForgeHTML(id);if(sl)sl.insertAdjacentHTML('afterend',html);else m.insertAdjacentHTML('beforeend',html)}catch(e){}}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="hfup"]');if(!t)return;e.preventDefault();e.stopPropagation();const h=+t.dataset.h;let c=0,g=0;
  if(t.dataset.v==='all'){let go=true;while(go){go=false;const its=S.items.filter(x=>x.eq===h).sort((a,b)=>a.l-b.l);for(const it of its){const r=eqUpN(it,1);if(r.c){c+=r.c;g+=r.g;go=true}}}}
  else{const it=S.items.find(x=>x.id==t.dataset.v);if(it){const r=eqUpN(it,+t.dataset.n||1);c=r.c;g=r.g}}
  if(c){toast(`⚒️ +${c} niveau${c>1?'x':''} d'équipement · ${fmt(g)} or`);try{UIS.buy()}catch(e){}}save();render();heroModal(h)},true);
/* forge : améliorations multiples aussi */
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="upitem10"],[data-a="upitemmax"]');if(!t)return;e.preventDefault();e.stopPropagation();const it=S.items.find(x=>x.id==t.dataset.v);if(!it)return;const r=eqUpN(it,t.dataset.a==='upitemmax'?999:10);if(r.c)toast(`⚒️ +${r.c} niveau${r.c>1?'x':''} · ${fmt(r.g)} or`);save();render()},true);
{const pe=pEquip;pEquip=function(){let h=pe.apply(this,arguments);try{const it=S.items.find(x=>x.id===UI.sel);if(it&&it.l<itemMax(it)){h=h.replace(/(<button[^>]*data-a="upitem"[^>]*>[\s\S]*?<\/button>)/,`$1<button class="btn sm" data-a="upitem10" data-v="${it.id}" ${S.gold<upCost(it)?'disabled':''}>+10</button><button class="btn sm" data-a="upitemmax" data-v="${it.id}" ${S.gold<upCost(it)?'disabled':''}>Max</button>`)}
  if(it&&it.eq!=null&&HEROES[it.eq])h=h.replace(/(<button[^>]*data-a="upitem"[^>]*>)/,`<button class="btn sm" data-a="hero" data-v="${it.eq}">👤 ${esc(HEROES[it.eq].n.split(' ')[0])}</button>$1`)}catch(e){}return h}}
PATCH.unshift({v:26.5,d:'18 octobre 2026',t:"L'atelier du héros",nogem:1,items:[
 "⚒️ <b>Améliore l'équipement directement depuis la fiche du héros</b> : un atelier liste ses 5 objets avec +1, +10 et un bouton « Tout améliorer » qui répartit ton or entre eux. Plus besoin d'aller-retour entre les héros et la forge.",
 "🔨 Dans la forge, l'objet sélectionné a maintenant +10 et Max, et un bouton pour ouvrir le héros qui le porte.",
 "📌 Fini les remontées en haut de page : la page et la fiche du héros restent là où tu étais après chaque amélioration, évolution ou changement d'objet.",
 "💎 Petite mise à jour : pas de gemmes royales cette fois."]});
