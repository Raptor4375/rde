
/* ================= Livre III : correctifs + nouvelle transition du Roi de Cendre ================= */
/* 1) Le retour dans le passé ne change plus la musique (la musique du chapitre continue). */
{const ss=sagaShow;sagaShow=function(){const L=SGP.lines&&SGP.lines[SGP.i];if(L&&!Array.isArray(L)&&L.fb!==undefined){const mw=musicWant;musicWant=function(){};try{return ss.apply(this,arguments)}finally{musicWant=mw}}return ss.apply(this,arguments)}}
/* 2) Écran vide après le combat final : on ressort toujours du mode « histoire plein écran » quand il n'y a plus rien à afficher. */
{const cb=closeBattle;closeBattle=function(){const r=cb.apply(this,arguments);try{if(!document.getElementById('sgov')&&!document.getElementById('sgcine'))sagaMode(false)}catch(e){}return r}}
setInterval(()=>{try{if(document.body.classList.contains('sgmode')&&!B&&!document.getElementById('sgov')&&!document.getElementById('sgcine')&&!document.querySelector('#battle'))sagaMode(false)}catch(e){}},1500);
/* 3) La transition : le souvenir du jeune Éryndel (en vieux film) prend feu et se consume,
      et derrière, il y a le Roi de Cendre. Ce n'est pas une transformation : c'est le passé qui brûle. */
roiCinematic=function(done){let o=document.getElementById('sgcine');if(o)o.remove();o=document.createElement('div');o.id='sgcine';o.className='roiburn';o.setAttribute('role','dialog');o.setAttribute('aria-label','Cinématique');
  const y=(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"'),k=(eryBody('roi')||'').replace('<svg','<svg class="loresvg hb"');
  const R=rng(31);const emb=[...Array(34)].map(()=>{const a=R()*6.283,d=18+R()*40;return`<i style="--dx:${(Math.cos(a)*d).toFixed(0)}vmin;--dy:${(Math.sin(a)*d-20).toFixed(0)}vmin;--dl:${(1.3+R()*1.6).toFixed(2)}s;--sz:${(2+R()*4).toFixed(1)}px"></i>`}).join('');
  o.innerHTML=`<div class="rb-now"><div class="rb-sky"></div><div class="rb-fig">${k}</div><div class="rb-eyes"><i></i><i></i></div></div>
   <div class="rb-past"><div class="rb-paper"></div><div class="rb-fig">${y}</div><div class="rb-cap">Il y a mille ans…</div><div class="rb-scr"></div></div><div class="rb-edge"></div>
   <div class="rb-emb">${emb}</div><div class="rb-ash">${[...Array(26)].map((_,i)=>`<i style="--x:${(i*37)%100}%;--d:${(2+(i%5)*.5).toFixed(1)}s;--l:${(-(i%7)*.5).toFixed(1)}s"></i>`).join('')}</div><div class="rb-shock"></div>
   <div class="rb-title"><small>LE PASSÉ PART EN CENDRES</small><b>ÉRYNDEL</b><span>le Roi de Cendre</span><em>« Le Premier Porteur contre le dernier ! »</em></div>
   <button class="btn p cn-go">⚔️ Affronter le Roi de Cendre</button><button class="cn-skip">Passer ⏭</button>`;
  document.body.appendChild(o);try{const g=sfxBus(.35,6000);if(g){const t=AU.ctx.currentTime;try{SND.zap(g,t+1.2)}catch(e){}[2.9,3.3].forEach(d=>{try{SND.boom(g,t+d,1.3)}catch(e){}})}}catch(e){}
  const fin=()=>{o.remove();sagaMode(false);done&&done()};o.querySelector('.cn-go').onclick=e=>{e.stopPropagation();fin()};o.querySelector('.cn-skip').onclick=e=>{e.stopPropagation();fin()}};
