
/* ================= Récompenses exclusives du Pass Pro + Dressing + Catalogue ================= */
window.RDE_SKTEST=window.RDE_SKTEST||/[?&]sktest\b/.test(location.search)||/\/test\/?$/.test(location.pathname);
const skinOn2=()=>!window.RDE_APP||window.RDE_SKTEST||Date.now()>=SKIN_GO;
skinOn=skinOn2;
/* --- les cosmétiques de saison --- */
const NFX={cendres:{n:'Pseudo de braise',season:'p_cendres',how:"Pass Pro « Les Cendres du Premier Porteur » : palier 45"}};
const PBG={cendres:{n:'Fond « Cendres »',season:'p_cendres',art:()=>NART.p_cendres(),how:"Pass Pro « Les Cendres du Premier Porteur » : palier 15"}};
if(skinOn())AVX.dk_cendres_av={n:'Drakhar des Cendres',how:"Pass Pro « Les Cendres du Premier Porteur » : palier 30",art:()=>{try{const v=vHero('dk_cendres');return portraitU(v,2)}catch(e){return''}},hide:()=>!skinOn()};
const SEASON_COS={p_cendres:{bg:[15,'cendres'],av:[30,'dk_cendres_av'],nfx:[45,'cendres'],skin:[60,'dk_cendres']}};
function cosGive(t,k){if(t==='bg'){S.pbgs=S.pbgs||[];if(!S.pbgs.includes(k)){S.pbgs.push(k);toast(`🖼️ Nouveau fond de profil : ${PBG[k].n}`)}}
  else if(t==='av')avGive(k);else if(t==='nfx'){S.nfxs=S.nfxs||[];if(!S.nfxs.includes(k)){S.nfxs.push(k);toast(`✨ Nouvel effet de pseudo : ${NFX[k].n}`)}}else if(t==='skin')skGive(k)}
const COSN={bg:k=>PBG[k].n,av:k=>'Avatar « '+(AVX[k]?AVX[k].n:'')+' »',nfx:k=>NFX[k].n,skin:k=>'Apparence « '+SKINS[k].n+' »'};
const COSIC={bg:'🖼️',av:'🧑‍🎤',nfx:'✨',skin:'👗'};
{const pr0=proRw;proRw=function(L,si){const r=pr0.apply(this,arguments);if(!skinOn())return r;try{const s=passSeason(si),C=SEASON_COS[s&&s.k];if(!C)return r;
  for(const t in C){const [lv,k]=C[t];if(lv===L){const base=r.g;const nm=COSN[t](k);
    const art=t==='skin'?`<span class="pskin">${portraitU(vHero(k),3)}</span>`:t==='av'?`<span class="pskin">${AVX[k].art()}</span>`:t==='bg'?`<span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG[k].art()}</svg></span>`:`<span class="pnfx nfx-${k}">Abc</span>`;
    return Object.assign({},r,{ic:art,n:`${nm} + ${r.n}`,cos:[t,k],g:()=>{cosGive(t,k);return base()}})}}}catch(e){}return r}}
/* ce qui a déjà été récupéré avant l'ouverture des exclusivités est rattrapé */
function cosRetro(){if(!skinOn())return;try{const P=S.pass;if(!P||!P.pro)return;const s=passSeason(P.s),C=SEASON_COS[s&&s.k];if(!C)return;for(const t in C){const [lv,k]=C[t];if((P.cr||{})[lv])cosGive(t,k)}}catch(e){}}
setTimeout(cosRetro,4000);setInterval(cosRetro,60000);
/* --- effet de pseudo et fond de profil : partagés avec les autres joueurs --- */
{const pm=pushMe;pushMe=async function(){const db=NET&&NET.db;if(!db||typeof db.doc!=='function')return pm.apply(this,arguments);const od=db.doc;
  db.doc=function(p){const r=od.apply(db,arguments);try{if(p==='players/'+NET.pid&&r&&r.set){const os=r.set;r.set=o=>os.call(r,Object.assign({},o,{nfx:S.nfx||'',pbg:S.pbg||''}))}}catch(e){}return r};
  try{return await pm.apply(this,arguments)}finally{db.doc=od}}}
function nfxOf(v){if(!skinOn())return'';if(v==='me')return(S.nfxs||[]).includes(S.nfx)?S.nfx:'';try{const d=NET.players&&NET.players[v];return d&&NFX[d.nfx]?d.nfx:''}catch(e){return''}}
function nfxPaint(){try{document.querySelectorAll('[data-a="prof"]').forEach(b=>{const k=nfxOf(b.dataset.v);const cur=b.dataset.nfx||'';if(k===cur)return;if(cur)b.classList.remove('nfx-'+cur,'nfxn');if(k)b.classList.add('nfx-'+k,'nfxn');b.dataset.nfx=k});
  const pw=document.getElementById('pw');if(pw){const k=nfxOf('me');pw.classList.toggle('nfxn',!!k);pw.className=pw.className.replace(/\bnfx-\w+/g,'').trim()+(k?' nfx-'+k:'')}}catch(e){}}
{let t=0;new MutationObserver(()=>{if(t)return;t=setTimeout(()=>{t=0;nfxPaint()},120)}).observe(document.documentElement,{childList:true,subtree:true})}
{const pm=profileModal;profileModal=function(id){const r=pm.apply(this,arguments);try{if(!skinOn())return r;const k=id==='me'?((S.pbgs||[]).includes(S.pbg)?S.pbg:''):(NET.players&&NET.players[String(id).replace(/^r:/,'')]||{}).pbg;
  if(k&&PBG[k]){const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('.pbgart')){m.classList.add('haspbg');m.insertAdjacentHTML('afterbegin',`<div class="pbgart"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${PBG[k].art()}</svg></div>`)}}}catch(e){}return r}}
/* --- DRESSING (Caserne) --- */
{const pl=LOBS.heros.places;LOBS.heros.places=function(){const P=pl.apply(this,arguments);if(!skinOn())return P;
  const pos={col:[66,206,.86],teams:[166,202,.92],meta:[350,206,.76]};for(const p of P)if(pos[p.k]){[p.x,p.y,p.s]=pos[p.k]}
  P.splice(2,0,{k:'dress',ic:'👗',n:'Dressing',sn:'Dressing',d:'Apparences, avatars et exclusivités',b:()=>LB.house({wall:'#f0d0e8',roof:'#8a3a8a',w:62}),x:262,y:208,s:.9,bw:80,bh:68,badge:()=>{const n=(S.skins||[]).filter(k=>!(S.skinSeen||[]).includes(k)).length;return n||0}});return P}}
UI.dv=UI.dv||'dress';
function cosCard(art,name,sub,btn){return`<div class="dcard">${art}<div class="dct"><b>${name}</b><small>${sub}</small></div>${btn||''}</div>`}
function dressPage(){const dv=UI.dv||'dress';const seg=`<div class="seg" role="tablist">${[['dress','👗 Dressing'],['cat','📖 Catalogue']].map(([k,n])=>`<button role="tab" aria-selected="${dv===k}" class="${dv===k?'on':''}" data-a="dv" data-v="${k}">${n}</button>`).join('')}</div>`;
  S.skinSeen=[...(S.skins||[])];return`${seg}${dv==='cat'?catPage():wardrobe()}`}
function wardrobe(){const own=(S.skins||[]).filter(k=>SKINS[k]);
  const skins=own.length?own.map(k=>{const s=SKINS[k],hid=s.hero,on=skEq(hid)===k,u=skU(hid),has=!!S.heroes[hid];
    return`<div class="dskin ${on?'on':''}"><div class="dsfig">${heroBody(vHero(k),u)}</div><div class="dsinfo"><span class="tag" style="--rc:#ff6a1a">APPARENCE EXCLUSIVE</span><div class="h3" style="margin:4px 0 2px">${esc(s.n)}</div><div class="muted" style="font-size:12.5px">${esc(HEROES[hid].n)} · forme ultra ${u?['','I','II','III'][u]+' : '+esc(s.forms[u]):'de base'}</div><p style="font-size:12.5px;margin:6px 0 8px">${esc(s.d)}</p>
     ${has?`<div class="row" style="gap:6px">${on?`<button class="btn sm" data-a="skwear" data-v="${hid}" data-k="">Remettre l'original</button><span class="tag" style="--rc:#7ad07a">✓ PORTÉE</span>`:`<button class="btn p sm" data-a="skwear" data-v="${hid}" data-k="${k}">👗 Porter</button>`}</div>`:`<div class="muted" style="font-size:12px">🔒 Il te faut ${esc(HEROES[hid].n)} pour la porter.</div>`}
     <div class="dsforms">${[0,1,2,3].map(x=>`<div class="${x===u?'on':''}"><span>${x?portraitU(vHero(k),x):portrait(vHero(k))}</span><small>${x?'Ultra '+['','I','II','III'][x]:'Base'}</small></div>`).join('')}</div></div></div>`}).join(''):`<div class="card"><p class="muted" style="margin:0">Tu n'as pas encore d'apparence. Les apparences exclusives s'obtiennent dans le <b>Pass Pro</b> (palier 60). Regarde le catalogue 📖.</p></div>`;
  const bgs=(S.pbgs||[]).filter(k=>PBG[k]),fx=(S.nfxs||[]).filter(k=>NFX[k]);
  const bgsH=`<div class="card"><div class="h3">🖼️ Fond de profil</div><div class="dgrid"><button class="dopt ${!S.pbg?'on':''}" data-a="pbgset" data-v=""><span class="pbgmini none"></span><small>Aucun</small></button>${bgs.map(k=>`<button class="dopt ${S.pbg===k?'on':''}" data-a="pbgset" data-v="${k}"><span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG[k].art()}</svg></span><small>${esc(PBG[k].n)}</small></button>`).join('')}</div></div>`;
  const fxH=`<div class="card"><div class="h3">✨ Effet de pseudo</div><div class="dgrid"><button class="dopt ${!S.nfx?'on':''}" data-a="nfxset" data-v=""><span class="pnfx">${esc(S.name||'Voyageur')}</span><small>Normal</small></button>${fx.map(k=>`<button class="dopt ${S.nfx===k?'on':''}" data-a="nfxset" data-v="${k}"><span class="pnfx nfx-${k} nfxn">${esc(S.name||'Voyageur')}</span><small>${esc(NFX[k].n)}</small></button>`).join('')}</div><p class="muted" style="font-size:12px;margin:6px 0 0">Visible par les autres joueurs dans le tchat et les classements.</p></div>`;
  const avH=`<div class="card row" style="justify-content:space-between"><div><div class="h3" style="margin:0">🧑‍🎤 Avatar</div><div class="muted" style="font-size:12.5px">Les avatars exclusifs se choisissent avec ta photo de profil.</div></div><button class="btn sm" data-a="dravs">Choisir</button></div>`;
  return`<div class="stack">${skins}${avH}${bgsH}${fxH}</div>`}
function catPage(){const seasons=NSEAS.map((s,i)=>({s,i:i+2}));
  const ok=v=>v?'<i class="cok">✓</i>':'<i class="clk">🔒</i>';
  const rows=seasons.map(({s,i})=>{const C=SEASON_COS[s.k]||{},fr=(S.evFrames||[]).includes(s.k),tt=(S.ptit||[]).includes(s.tk),cur=passIdx()===i,st=passStartAt(i),fut=Date.now()<st;
    const items=[[`<span class="fav frm-${s.k} cfr" style="${rv(4)}">${myAv()}</span>`,`Cadre « ${esc(s.n)} »`,'Pass Premium · palier 30',fr],[`<span class="cttl" style="--tc:${s.tc}">${esc(s.tn)}</span>`,'Titre de saison','Pass gratuit · palier 60',tt]];
    if(C.bg)items.push([`<span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG[C.bg[1]].art()}</svg></span>`,PBG[C.bg[1]].n,'Pass Pro · palier '+C.bg[0],(S.pbgs||[]).includes(C.bg[1])]);
    if(C.av&&AVX[C.av[1]])items.push([`<span class="cav">${AVX[C.av[1]].art()}</span>`,'Avatar « '+esc(AVX[C.av[1]].n)+' »','Pass Pro · palier '+C.av[0],(S.avs||[]).includes(C.av[1])]);
    if(C.nfx)items.push([`<span class="pnfx nfx-${C.nfx[1]} nfxn">${esc(S.name||'Pseudo')}</span>`,NFX[C.nfx[1]].n,'Pass Pro · palier '+C.nfx[0],(S.nfxs||[]).includes(C.nfx[1])]);
    if(C.skin)items.push([`<span class="cav big">${portraitU(vHero(C.skin[1]),3)}</span>`,'Apparence « '+esc(SKINS[C.skin[1]].n)+' »','Pass Pro · palier '+C.skin[0],skOwned(C.skin[1])]);
    return`<div class="card catsea" style="--pc:${s.c};--pc2:${s.c2}"><div class="catbg">${seasonArt(s)}</div><div class="cathd"><b>${s.ic} ${esc(s.n)}</b><small>${cur?'🟢 En cours':fut?'Du '+new Date(st).toLocaleDateString('fr-FR',{day:'numeric',month:'short'})+' au '+new Date(passEndAt(i)).toLocaleDateString('fr-FR',{day:'numeric',month:'short'}):'Terminé · ne revient pas'}</small></div>
     <div class="catl">${items.map(([a,n,h,o])=>`<div class="cati ${o?'own':''}"><div class="catart">${a}</div><div class="catt"><b>${n}</b><small>${h}</small></div>${ok(o)}</div>`).join('')}${C.skin?'':'<div class="muted" style="font-size:12px;padding:4px 2px">Exclusivités Pro de cette saison : bientôt dévoilées.</div>'}</div></div>`}).join('');
  const test=SKTEST()||window.RDE_SKTEST?`<div class="card" style="border-style:dashed"><div class="h3" style="margin:0 0 4px">🧪 Mode test</div><p class="muted" style="font-size:12.5px;margin:0 0 8px">Uniquement dans la version de test : débloque toutes les exclusivités pour les essayer.</p><div class="row" style="gap:6px"><button class="btn p sm" data-a="sktestall">Tout débloquer</button><button class="btn sm" data-a="sktestreset">Tout retirer</button></div></div>`:'';
  return`<div class="stack"><div><div class="h">📖 Catalogue des exclusivités</div><p class="sub">Tout ce qu'on ne peut avoir que pendant une saison. Une fois la saison finie, ça ne revient pas.</p></div>${test}${rows}</div>`}
{const ph=pHeros;pHeros=function(){if(skinOn()&&inZone('heros')&&UI.lz.heros==='dress')return`<div class="stack">${zoneBar('heros','dress')}${dressPage()}</div>`;return ph.apply(this,arguments)}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v;
  if(!['dv','skwear','pbgset','nfxset','dravs','sktestall','sktestreset','skhero'].includes(a))return;e.preventDefault();e.stopPropagation();
  if(a==='dv'){UI.dv=v;render();return}
  if(a==='skwear'){skWear(+v,b.dataset.k||null);try{UIS.evolve()}catch(er){}if(b.closest('#ovl'))heroModal(+v);return}
  if(a==='pbgset'){S.pbg=v||'';save();render();return}
  if(a==='nfxset'){S.nfx=v||'';save();render();return}
  if(a==='dravs'){try{avModal()}catch(er){}return}
  if(a==='skhero'){TAB='heros';UI.lz.heros='dress';UI.hv='dress';UI.dv='dress';closeModal();render();scrollTo(0,0);return}
  if(a==='sktestall'){for(const s of NSEAS){unlockFrameQ(s.k);ptGive(s.tk)}for(const sk in SEASON_COS)for(const t in SEASON_COS[sk])cosGive(t,SEASON_COS[sk][t][1]);S.heroes[65]=S.heroes[65]||{l:1,e:0,f:0};save();render();return}
  if(a==='sktestreset'){S.skins=[];S.skinEq={};S.pbgs=[];S.pbg='';S.nfxs=[];S.nfx='';S.avs=(S.avs||[]).filter(k=>!AVX[k]||!/_av$/.test(k));S.ptit=[];S.evFrames=(S.evFrames||[]).filter(f=>!NSEAS.some(s=>s.k===f));skRefresh(65);save();render();return}},true);
function unlockFrameQ(f){S.evFrames=S.evFrames||[];if(!S.evFrames.includes(f))S.evFrames.push(f)}
/* --- la fiche du héros : bloc « Apparence » --- */
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(!skinOn())return r;const L=Object.keys(SKINS).filter(k=>SKINS[k].hero===+id);if(!L.length)return r;const m=document.querySelector('#ovl .modal');if(!m||m.querySelector('.skblk'))return r;
  const items=L.map(k=>{const s=SKINS[k],own=skOwned(k),on=skEq(+id)===k;return`<div class="skrow"><span class="skp">${portraitU(vHero(k),Math.max(1,skU(+id)))}</span><div style="flex:1;min-width:0"><b>${esc(s.n)}</b><small>${own?(on?'✓ Portée':'Dans ton dressing'):'🔒 '+esc(s.how)}</small></div>${own?(on?`<button class="btn sm" data-a="skwear" data-v="${id}" data-k="">Original</button>`:`<button class="btn p sm" data-a="skwear" data-v="${id}" data-k="${k}">Porter</button>`):`<button class="btn sm" data-a="skhero">Voir</button>`}</div>`}).join('');
  const hd=m.querySelector('.hd');(hd||m.firstElementChild).insertAdjacentHTML('afterend',`<div class="skill skblk"><div class="sn">👗 Apparences</div>${items}</div>`)}catch(e){}return r}}
/* --- PATCH --- */
try{const P=PATCH.find(x=>x.v===36);if(P&&skinOn())P.items.splice(4,0,"💎 <b>Exclusivités du Pass Pro</b> : un fond de profil (palier 15), un avatar (palier 30), un <b>effet de pseudo</b> en braise (palier 45) et l'apparence <b>« Drakhar des Cendres »</b> (palier 60), avec ses 4 formes ultra.","👗 <b>Nouveau : le Dressing</b> dans la Caserne : porte tes apparences, choisis ton fond de profil et l'effet de ton pseudo. Le <b>Catalogue</b> montre toutes les exclusivités de chaque saison.")}catch(e){}
