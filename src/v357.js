
/* ================= V37.8 : portails (CrazyGames, Newgrounds) — pas de question « ancienne version » pour un nouveau joueur ================= */
try{Object.assign(I18N_EN,{"Je suis nouveau":"I'm new","🆕 Je suis nouveau":"🆕 I'm new","Bienvenue dans RDE !":"Welcome to RDE!","Le royaume est prêt !":"The kingdom is ready!","Le royaume est prêt":"The kingdom is ready","Éryndel en pied":"Éryndel, full body"})}catch(e){}
if(window.RDE_CG){const nm=nameModal;nameModal=function(){try{if(!S.xferAsk){S.xferAsk=1;save()}}catch(e){}return nm.apply(this,arguments)}}
try{I18N_RULES.push([/^(🏆 )?Succès débloqué : (.+)$/,(m)=>(m[1]||'')+'Achievement unlocked: '+tr(m[2])])}catch(e){}
/* rangs : 1e en français, 1st en anglais… */
function ordE(n){n=Number(n);if(!(n>0))return '—';if(typeof LANG==='undefined'||LANG==='fr')return n+'e';if(LANG==='en'){const t=n%100;return n+((t>10&&t<14)?'th':(['th','st','nd','rd'][n%10]||'th'))}return '#'+n}
try{I18N_RULES.push([/^🏷️ Nouveau titre : « (.+) » !$/,(m)=>'🏷️ New title: “'+tr(m[1])+'”!'])}catch(e){}
/* profil et salle des trophées : beaucoup moins d'animations en même temps (ça faisait ramer les téléphones) */
(function(){const st=document.createElement('style');st.id='v357css';st.textContent=`
.frames .frm-pick:not(.sel) .fav,.frames .frm-pick:not(.sel) .fav::before,.frames .frm-pick:not(.sel) .fav::after{animation:none!important}
body:has(#ovl .modal) #main *,body:has(#ovl .modal) #main *::before,body:has(#ovl .modal) #main *::after{animation-play-state:paused!important}
#ovl .modal{overscroll-behavior:contain;-webkit-overflow-scrolling:touch;touch-action:pan-y}
#ovl .modal.haspbg{overflow-x:hidden!important;overflow-y:auto!important}
.frames .frm-pick{content-visibility:auto;contain-intrinsic-size:auto 120px}
.list>.card.q{content-visibility:auto;contain-intrinsic-size:auto 96px}
.list>.card.q .bar *,.list>.card.q .bar *::before,.list>.card.q .bar *::after,.list>.card.q .bar::after{animation:none!important}
.ttpage .ttlist{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}
`;document.head.appendChild(st)})();

/* titres : un onglet à part dans la Salle des trophées (comme Succès), plus dans le profil */
try{Object.assign(I18N_EN,{"Titres":"Titles","🏷️ Titres":"🏷️ Titles","Choisis le titre affiché sous ton pseudo (profil, classements, tchat).":"Choose the title shown under your name (profile, rankings, chat).","Titre affiché":"Displayed title"})}catch(e){}
function ttPage(){try{ttCheck()}catch(e){}const own=S.titles||['voyageur'];
  return`<div class="card ttpage"><div class="h3" style="margin:0 0 4px">🏷️ Titres · ${own.length}/${TITLES.length}</div><div class="muted" style="font-size:12.5px;margin-bottom:10px">Choisis le titre affiché sous ton pseudo (profil, classements, tchat).</div><div class="ttlist">${TITLES.map(t=>{const ok=own.includes(t.k);return`<button class="ttb ${S.title===t.k?'on':''}" style="--tc:${t.c}" data-a="ttpick" data-v="${t.k}" ${ok?'':'disabled'}><b>${ok?esc(t.n):'🔒 '+esc(t.n)}</b><small>${esc(t.d)}</small></button>`}).join('')}</div></div>`}
{const ps=pSocial;pSocial=function(){const soc=UI.soc;let h;
  if(soc==='tt'){UI.soc='ach';try{h=ps.apply(this,arguments)}finally{UI.soc='tt'}
    const a=h.indexOf('class="seg"'),e=h.indexOf('</div>',a)+6;h=h.slice(0,e)+ttPage()+'</div>';
    h=h.replace(/aria-selected="true" class="on"/g,'aria-selected="false" class=""')}
  else h=ps.apply(this,arguments);
  const a=h.indexOf('class="seg"');if(a>=0){const e=h.indexOf('</div>',a);h=h.slice(0,e)+`<button role="tab" aria-selected="${soc==='tt'}" class="${soc==='tt'?'on':''}" data-a="soc" data-v="tt">Titres</button>`+h.slice(e)}
  return h}}
window.addEventListener('click',e=>{const t=e.target.closest('[data-a="ttpick"],[data-a="gott"]');if(!t)return;
  if(t.dataset.a==='gott'){e.preventDefault();e.stopImmediatePropagation();closeModal();TAB='top';UI.soc='tt';UI.lz=UI.lz||{};UI.lz.top='ach';render();window.scrollTo(0,0);return}
  if(!t.closest('#main'))return;e.preventDefault();e.stopImmediatePropagation();S.title=t.dataset.v;save();NET.lastPush='';try{schedulePush()}catch(er){}
  toast((LANG==='fr'?'🏷️ Titre affiché : ':'🏷️ Displayed title: ')+'« '+tr(ttOf(S.title).n)+' »');render()},true);
