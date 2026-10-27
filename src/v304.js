
/* ================= chargement aux couleurs du mode histoire (Livre I / Livre II) ================= */
function btBook(){try{const G=SG();if(!G.done[7])return 1;if(!G.done[13])return 2;return Math.random()<.5?1:2}catch(e){return 1}}
function btSceneSaga(bk){const R=rng(Date.now()%9973);const r=(a,b)=>a+R()*(b-a);
  let stars='';for(let k=0;k<26;k++)stars+=`<i style="left:${r(0,100).toFixed(1)}%;top:${r(0,55).toFixed(1)}%;animation-delay:${r(0,4).toFixed(1)}s;width:${r(1.5,3.2).toFixed(1)}px;height:${r(1.5,3.2).toFixed(1)}px"></i>`;
  let fall='';for(let k=0;k<12;k++){const cls=bk===1?(k%3?'fw':'fb'):'cd';const sym=bk===2?['♠','♥','♦','♣'][k%4]:'';fall+=`<i class="${cls}" style="left:${r(2,96).toFixed(1)}%;animation-delay:${r(0,9).toFixed(1)}s;animation-duration:${r(8,13).toFixed(1)}s">${sym}</i>`}
  const pl=`<div class="bsplume">${plumeSVG('happy')}</div>`;
  let sky,party,title,sub;
  if(bk===1){
    const L=pick([56,58,59,65,66,63,64,61]),E=pick([47,45,54,43]);
    const T=[[2,0],[0,0],[L,0],[1,0],[E,0]];party=T.map(([id,u],i)=>`<div class="b3h q${i}"><i class="b3glow"></i><img src="${btImg(id,u)}" alt=""></div>`).join('');
    const frag=[0,1,2,3,4,5,6].map(i=>`<g transform="rotate(${i*51.4})"><g transform="translate(0 -52)"><path d="M0 -7L5 0L0 7L-5 0Z" fill="${['#ff9ae8','#9ad8ff','#ffd84a','#b8a4ff','#9af0c0','#ffb38a','#fff'][i]}" stroke="#fff" stroke-width=".8"/></g></g>`).join('');
    sky=`<svg class="bsheart" viewBox="-70 -70 140 140" aria-hidden="true"><defs><radialGradient id="bshg"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#ff9ae8"/><stop offset=".7" stop-color="#7c5cff" stop-opacity=".5"/><stop offset="1" stop-color="#7c5cff" stop-opacity="0"/></radialGradient></defs>
      <circle r="44" fill="url(#bshg)"><animate attributeName="r" values="38;46;38" dur="4s" repeatCount="indefinite"/></circle>
      <path d="M0 18C-22 2 -24 -14 -12 -20C-6 -23 -2 -20 0 -15C2 -20 6 -23 12 -20C24 -14 22 2 0 18Z" fill="#ffd6f4" stroke="#fff" stroke-width="1.6"/><path d="M0 -15L-3 -6L3 0L-2 8L1 17M-12 -20L-6 -10L-14 -4M12 -20L8 -8L15 -2" stroke="#5a2a9a" stroke-width="1.6" fill="none"/>
      <g>${frag}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite"/></g></svg>
      <div class="bscorvin"><svg viewBox="0 0 100 100">${MONS['Corvin']()}</svg></div>`;
    title=`📖 Livre I · Les Fragments d'Éther`;sub=`Rassemble les 7 fragments du Cœur d'Éther`}
  else{
    const T=[[63,0],[56,0],[ALEA,0],[58,0],[62,0]];party=T.map(([id,u],i)=>`<div class="b3h q${i}"><i class="b3glow"></i><img src="${btImg(id,u)}" alt=""></div>`).join('');
    const thr=[...Array(6)].map((_,i)=>`<path d="M${-10+i*80} 0Q${60+i*60} ${120+i*14} ${420-i*40} ${60+i*30}" stroke="#ffe9a0" stroke-width=".8" fill="none" opacity=".45" stroke-dasharray="3 6"><animate attributeName="stroke-dashoffset" values="0;-36" dur="${3+i}s" repeatCount="indefinite"/></path>`).join('');
    const eyes=[[-14,-6,3],[14,-6,3],[0,-18,2.2],[-24,6,1.6],[24,6,1.6]].map(([x,y,s],i)=>`<circle cx="${x}" cy="${y}" r="${s}" fill="#fff6c0"><animate attributeName="opacity" values="0;1;.2;1;0" dur="${5+i*.6}s" begin="${i*.4}s" repeatCount="indefinite"/></circle>`).join('');
    sky=`<svg class="bsthreads" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true">${thr}</svg>
      <svg class="bsmoon" viewBox="-60 -60 120 120" aria-hidden="true"><circle r="50" fill="#ffd84a" opacity=".22"><animate attributeName="r" values="46;54;46" dur="5s" repeatCount="indefinite"/></circle><circle r="40" fill="#120828" stroke="#ffd84a" stroke-width="2"/>${eyes}<path d="M-16 14Q0 24 16 14" stroke="#9a6aff" stroke-width="1.6" fill="none" opacity=".7"/></svg>
      <svg class="bscity" viewBox="0 0 400 120" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120V70h24v-26h14v26h22V40l14 -20l14 20v30h26V52h18v18h22V30l18 -26l18 26v40h20V56h20v14h24V44h16v26h24V60h20v60Z" fill="#2a0e4a"/>${[...Array(18)].map(()=>`<rect x="${r(6,390).toFixed(0)}" y="${r(50,104).toFixed(0)}" width="4" height="6" fill="#ffd84a" opacity="${r(.4,1).toFixed(2)}"/>`).join('')}</svg>`;
    title=`🃏 Livre II · Le Destin d'Aléa`;sub=`Aléa a encore une carte à jouer…`}
  return`<div class="b2 b3 bs bs${bk}"><div class="bssky"></div><div class="bsstars">${stars}</div>${sky}
   <svg class="b3hills" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true">${bk===1?`<path d="M0 90Q80 50 170 82T330 72T400 80V200H0Z" fill="#3a2a7a" opacity=".85"/><path d="M0 130Q100 96 200 120T400 112V200H0Z" fill="#2a1a5a"/><path d="M0 165Q120 136 220 156T400 148V200H0Z" fill="#1a0e3a"/>`:`<path d="M0 130Q100 100 200 122T400 116V200H0Z" fill="#3a0e4a"/><path d="M0 165Q120 140 220 158T400 150V200H0Z" fill="#1e0628"/>`}</svg>
   <div class="bsfall">${fall}</div><div class="b3party">${party}</div>${pl}
   <div class="b2top"><div class="b2title">${(function(){try{return String(localStorage.getItem('rde-lang')||navigator.language||'fr').slice(0,2).toLowerCase()}catch(e){return'fr'}})()==='fr'?"Royaumes<span>d'Éther</span>":'Realms<span>of Ether</span>'}</div><div class="b3sub bsbook">${title}</div><div class="bssub">${sub}</div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">${bk===1?'Plume ouvre le livre…':'Aléa bat les cartes…'}</div><div class="b2tap" id="b2tap" hidden>Touche pour entrer dans le royaume</div><div class="b2snd" id="b2snd">🔊 Touche l'écran pour le son</div></div></div>`}
const BT_BOOK=btBook();
try{BTIPS.length=0;(BT_BOOK===1?["Plume ouvre le livre…","Les fragments d'Éther brillent dans le noir…","Plume : « Hou hou ! Le Porteur est de retour ! »","Quelque part, un masque sourit…","Le Roi Sans Visage attend sur son trône…","Astuce : le mode histoire est en haut de l'Aventure.","Astuce : tes choix (💗 ou ⚔️) changent la fin de l'histoire."]
  :["Aléa bat les cartes…","Les étoiles s'éteignent une à une…","Aléa : « Le destin ? Je le redistribue. »","Umbra a faim…","Astrée retisse le ciel…","Astuce : la Table d'Aléa t'attend au casino.","Astuce : le Livre II se débloque de l'étape 75 à 100."]).forEach(t=>BTIPS.push(t))}catch(e){}
(function(){try{const b=document.getElementById('boot');if(!b||BOOT.done)return;const r=b.querySelector('.b2');if(!r)return;const st=r.querySelector('#b2start');
  const tmp=document.createElement('div');tmp.innerHTML=btSceneSaga(BT_BOOK);const n=tmp.firstElementChild;if(st)n.appendChild(st);r.replaceWith(n)}catch(e){console.warn('boot',e)}})();
try{SONGS.boot=BT_BOOK===2&&SONGS.alea?SONGS.alea:SONGS.menu;delete SONGC.boot}catch(e){}
try{const P=PATCH.find(x=>x.v===29);if(P)P.items.push("🌙 <b>Nouveau chargement</b> aux couleurs du mode histoire : le Cœur d'Éther brisé et Plume pour le Livre I, Aléa et la lune d'Umbra pour le Livre II (selon où tu en es).")}catch(e){}
