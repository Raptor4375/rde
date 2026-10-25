
/* ================= chargement aux couleurs du Livre III (prioritaire) ================= */
function btSceneSaga3(){const R=rng(Date.now()%7919);const r=(a,b)=>a+R()*(b-a);
  let stars='';for(let k=0;k<18;k++)stars+=`<i style="left:${r(0,100).toFixed(1)}%;top:${r(0,40).toFixed(1)}%;animation-delay:${r(0,4).toFixed(1)}s;width:${r(1.5,3).toFixed(1)}px;height:${r(1.5,3).toFixed(1)}px"></i>`;
  let fall='';for(let k=0;k<12;k++)fall+=`<i class="${k%3?'ash':'emb'}" style="left:${r(2,96).toFixed(1)}%;animation-delay:${r(0,9).toFixed(1)}s;animation-duration:${r(7,12).toFixed(1)}s"></i>`;
  const T=[[65,0],[57,0],[58,0],[47,0],[59,0]];const party=T.map(([id,u],i)=>`<div class="b3h q${i}"><i class="b3glow"></i><img src="${btImg(id,u)}" alt=""></div>`).join('');
  let mem='';try{mem=(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"')}catch(e){}
  const owls=[0,1,2].map(i=>`<svg class="bsowl o${i}" viewBox="0 0 40 20" aria-hidden="true"><path d="M20 12Q14 2 2 6Q10 8 14 14Q17 12 20 14Q23 12 26 14Q30 8 38 6Q26 2 20 12Z" fill="#3a2a1a"/></svg>`).join('');
  const sky=`<div class="bsmem">${mem}</div><svg class="bscrown" viewBox="-60 -50 120 70" aria-hidden="true"><defs><radialGradient id="bscg"><stop offset="0" stop-color="#ffd8a0" stop-opacity=".9"/><stop offset="1" stop-color="#ff6a1a" stop-opacity="0"/></radialGradient></defs><circle r="44" cy="-6" fill="url(#bscg)"><animate attributeName="r" values="38;48;38" dur="3.6s" repeatCount="indefinite"/></circle>
    ${[-28,-14,0,14,28].map((x,i)=>`<path d="M${x} -8q${i%2?5:-5} -18 0 -30q${i%2?-7:7} 14 0 30Z" fill="${i%2?'#ffb21a':'#ff6a1a'}"><animate attributeName="opacity" values=".5;1;.5" dur="${1+i*.2}s" repeatCount="indefinite"/></path>`).join('')}
    <path d="M-34 4L-30 -12L-20 -2L-10 -16L0 -4L10 -16L20 -2L30 -12L34 4Z" fill="#1a1410" stroke="#ff6a1a" stroke-width="1.6"/></svg>
    <svg class="bstower" viewBox="0 0 60 160" aria-hidden="true"><path d="M18 160V40L30 18L42 40V160Z" fill="#e8dcc0" opacity=".85"/><path d="M14 44H46L30 14Z" fill="#c8b48a"/><rect x="26" y="60" width="8" height="12" rx="4" fill="#ffd8a0"><animate attributeName="opacity" values=".5;1;.5" dur="2.4s" repeatCount="indefinite"/></rect><rect x="26" y="96" width="8" height="12" rx="4" fill="#ffd8a0" opacity=".7"/></svg>${owls}`;
  return`<div class="b2 b3 bs bs3"><div class="bssky"></div><div class="bsstars">${stars}</div>${sky}
   <svg class="b3hills" viewBox="0 0 400 200" preserveAspectRatio="none" aria-hidden="true"><path d="M0 120Q100 92 200 114T400 108V200H0Z" fill="#4a2a1a"/><path d="M0 160Q120 134 220 152T400 146V200H0Z" fill="#2a1410"/></svg>
   <div class="bsfall bs3fall">${fall}</div><div class="b3party">${party}</div><div class="bsplume">${plumeSVG('happy')}</div><div class="bsfilm"></div>
   <div class="b2top"><div class="b2title">Royaumes<span>d'Éther</span></div><div class="b3sub bsbook">🦉 Livre III · L'Écho du Premier Porteur</div><div class="bssub">Il y a mille ans, une flamme a été volée…</div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">Le Cœur d'Éther se souvient…</div><div class="b2tap" id="b2tap" hidden>Touche pour entrer dans le royaume</div><div class="b2snd" id="b2snd">🔊 Touche l'écran pour le son</div></div></div>`}
{const bs=btSceneSaga;btSceneSaga=function(bk){if(bk===3)return btSceneSaga3();return bs.apply(this,arguments)}}
try{BTIPS.length=0;["Le Cœur d'Éther se souvient…","Une plume noircie tombe du ciel…","Plume : « Hou… Ce rythme, je le connais. »","Quelque part, une couronne de cendre s'allume…","Le Grand Aldric veille sur la bibliothèque…","Astuce : le Livre III se débloque avec le mode Normal.","Astuce : certains chapitres se passent il y a mille ans !"].forEach(t=>BTIPS.push(t))}catch(e){}
(function(){try{if(BOOT.done)return;const b=document.getElementById('boot');const rr=b&&b.querySelector('.b2');if(!rr)return;
  const st=rr.querySelector('#b2start'),bar=rr.querySelector('.bt-bar i');const w=bar?bar.style.width:'';
  const tmp=document.createElement('div');tmp.innerHTML=btSceneSaga3();const n=tmp.firstElementChild;if(!n)return;if(st)n.appendChild(st);const nbar=n.querySelector('.bt-bar i');if(nbar&&w)nbar.style.width=w;rr.replaceWith(n)}catch(e){console.warn('boot3',e)}})();
try{SONGS.boot=SONGS.menu;delete SONGC.boot}catch(e){}
try{const P=PATCH.find(x=>x.v===32);if(P)P.items.push("🌅 <b>Nouvel écran de chargement</b> aux couleurs du Livre III : le souvenir d'Éryndel, la couronne de cendre, la tour des hiboux et les cendres qui tombent.")}catch(e){}
