
/* ================= SOUTENIR LE JEU (itch.io) + cadre Mécène ================= */
const ITCH_URL='https://royaume-d-ether.itch.io/rde',ITCH_DON=ITCH_URL+'/purchase';
const MEC_H=["28667037308d02a312b066e764896e41", "fc6b5387e678463649ed40857212d5a3", "5c623682191bf12fdec578fee63096e5", "737d4da38dd2003f6195f1a6872c9f4c", "d6e8592d475f637da7bbd3a184f3742d", "83c811391a5357658a22616ac6399b9d", "f74214f792eb6a97ba6c3de28d365e34", "abc83a38c0dff1d57375e0108c9a2550", "88c4a9d8c6447eb299ba89bcd5f512d8", "8cf5fb795b4ab0189df8c2207792a14f", "8acdd1cf1ab6ceb9a63dfca0e7238e33", "ee7949e76babb00e059cb87549c98be0", "e7c322af1ff8ae1de79a536cb7bc25e3", "219efebc38aaa7216b03fac65c5540a1", "208d94d0e2dadc0ce53ae3f8f8b91b78", "132aaf7938eeb4b3e75191511cd1ab4d", "8ba04cb1d636b3e289b1162e56e84510", "24adfe80d7d774333d5eeb748986dacc", "db351452b64e66916fd3e48819207a8b", "21af5b69419133e68ca0f5829acfb60e", "5d56b0d79d09ff166b2226504e8f93e7", "4dfecddbaabd0ac2f186f261a4cde0c6", "bec118b9f0f95f71f17c6a14f6f7afc6", "ff7686c2a24a72ad840a704dac103c98", "b5b2b18d77a245876a9fb5e7b7a03827", "4e408b8c8602a50015306d8ec8803845", "3728406bc71ef2fc5e48549864b00938", "15672d7ac77fa7e00fb486264106cccf", "1201d572fb6ec2abc3e97a271b8ed04b", "65e377a3e339217ffbbdb84a35c7a7aa", "31810c6510c2fc6dfa933f525d4b0e81", "75c681e02e6f04f4261271a1598c93b7", "e5e541d2fc72d9078798dfa4bbb8cfa0", "0548a5991026d9acf6ef429bee6b2725", "3f0033b45aa0b4669a95174f087ee132", "36c4f0b7c6aa146cd299932a4debc36a", "df09ce46e29254d545a31722226f010a", "7b3203a3d0982c704b59a1c39bb0616c", "27d4ae5e893092981e4b753e2e2c37de", "db349e42f07fa0176700d5457d3d5711", "c4fa1330dc394e16f827f8ccc70563db", "74471e017d00504e671c957ad855c099", "124a6b10cbb1843de0e9cb29992abcbe", "13bf961046bb6bfa1029991561d73b7e", "aea1f61cfd6b0bdce8780ae32d263f59", "465da7a7dac505d52c695891e982a9cd", "1e23ff4d6459579872638d4f577b59fb", "55a293b511d60d0df91363452e954f83", "48493cb86064dba059b04f23f82fc698", "97bd442c5dc1a779a7c5f819d1fa6e49"];
FRAMES.mecene='Mécène';try{FHINT.mecene='Soutenir le jeu (code Mécène)'}catch(e){}
(function(){const st=document.createElement('style');st.textContent=`.fav.frm-mecene{--fd:#1a0a02;--gc:#ffb84a;animation:fpulse 2.6s ease-in-out infinite}
.fav.frm-mecene::before{background:linear-gradient(160deg,rgba(255,255,255,.4),transparent 42%,rgba(0,0,0,.28)),conic-gradient(from var(--fa),#ffd84a,#8a4a1a,#fff0c0,#ff8ac0,#ffd84a,#6a3a12,#ffd84a);animation:fspin 5.5s linear infinite}`;document.head.appendChild(st)})();
async function mecHash(c){const b=await crypto.subtle.digest('SHA-256',new TextEncoder().encode(c));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,'0')).join('').slice(0,32)}
function supportModal(){const has=(S.evFrames||[]).includes('mecene');setTimeout(mecWall,50);modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">☕ Soutenir le jeu</div>
  <p class="sub">Royaumes d'Éther est <b>gratuit</b> et le restera. Si tu aimes le jeu, tu peux faire un petit don sur itch.io : ça aide à continuer les mises à jour 💜</p>
  <div class="mecbox"><div class="fav frm-mecene mecav">${myAv()}</div><div><b>Pack Mécène</b><br><span class="muted" style="font-size:12.5px">Après ton don, tu reçois un <b>code Mécène</b> par e-mail. Entre-le ici pour débloquer :</span></div></div>
  <div class="mecgift">${MEC_GIFTS.map(g=>'<span>'+g+'</span>').join('')}</div><div id="mecwall" class="mecwall"></div>
  <a class="btn pro" href="${ITCH_DON}" target="_blank" rel="noopener" style="width:100%;margin-top:10px;display:flex;justify-content:center;text-decoration:none">☕ Faire un don sur itch.io</a>
  ${has?'<p class="sub" style="text-align:center;margin-top:10px">✅ Tu es Mécène du royaume. Merci !</p>':`<div class="row" style="gap:6px;margin-top:10px"><input id="meccode" class="tx" data-noi18n placeholder="MECENE-XXXX-XXXX-XXXX" maxlength="30" style="flex:1;min-width:0;text-transform:uppercase"><button class="btn" data-a="mecok">Valider</button></div>`}
  <p class="muted" style="font-size:11.5px;margin-top:10px">Le don est libre, même 1 € débloque tout le pack. Paiement géré par itch.io. Si tu es mineur, demande à un parent.</p>`)}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="support"],[data-a="mecok"]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.dataset.a==='support'){supportModal();return}
  const c=String(($('#meccode')||{}).value||'').trim().toUpperCase().replace(/\s+/g,'');if(!c)return;b.disabled=true;
  try{const h=await mecHash(c);if(!MEC_H.includes(h)){toast("Ce code n'est pas valide.");b.disabled=false;return}
    if(!NET.on||!NET.db){toast('Connecte-toi à internet pour valider ton code.');b.disabled=false;return}
    const ref=NET.db.doc('mecene/'+h);const s=await ref.get();if(s.exists){const d=s.data();if(d&&d.pid!==NET.pid){toast('Ce code a déjà été utilisé.');b.disabled=false;return}}
    else await ref.set({pid:NET.pid,n:S.name||'',t:Date.now()});
    mecReward()}
  catch(er){toast('Erreur, réessaie dans un instant.');b.disabled=false}},true);
{const fl=frameList;frameList=function(){const L=fl.apply(this,arguments);return L.filter(f=>f!=='mecene'||frameUnlocked(f)).concat(!L.includes('mecene')&&frameUnlocked('mecene')?['mecene']:[])}}
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=support]')){const lb=m.querySelector('.langbox');const h='<button class="btn supbtn" data-a="support" style="width:100%;margin:0 0 10px">☕ Soutenir le jeu · cadre Mécène</button>';if(lb)lb.insertAdjacentHTML('afterend',h);else m.insertAdjacentHTML('afterbegin',h)}}catch(e){}}}
try{const P=PATCH.find(x=>x.v===30);if(P)P.items.push("☕ <b>Soutenir le jeu</b> : le jeu est maintenant sur itch.io ! Dans ⚙️ Paramètres, tu peux faire un petit don (totalement libre) et recevoir le cadre exclusif « Mécène » 💜")}catch(e){}

/* --- le Pack Mécène --- */
const MEC_GIFTS=['🖼️ Cadre animé « Mécène »','🏷️ Titre « Mécène du Royaume »','💎 3 000 gemmes','✦ 10 éclats légendaires',"🌟 3 éclats d'ultra-évolution",'🎟️ 10 tickets d\'invocation','💰 5 M d\'or','💜 Ton nom sur le Mur des Mécènes'];
TITLES.push({k:'mecene',n:'Mécène du Royaume',c:'#ffb84a',d:'Soutenir le jeu (code Mécène)',ok:()=>frameUnlocked('mecene')});
{const tc=ttChip;ttChip=function(k){const h=tc(k);return k==='mecene'?h.replace('class="ttchip"','class="ttchip ttmec"'):h}}
function mecReward(){unlockFrame('mecene');S.frame='mecene';
  if(!S.mecGift){S.mecGift=Date.now();mail({x:"💜 Merci, Mécène du Royaume ! Grâce à toi, le royaume continue de grandir. Voici ton cadeau.",gems:3000,shards:10,gold:5e6});S.ush=(S.ush||0)+3;INV().pt+=10}
  S.titles=S.titles||[];if(!S.titles.includes('mecene'))S.titles.push('mecene');S.title='mecene';
  NET.lastPush='';try{schedulePush()}catch(er){}save();try{renderTop()}catch(e){}
  try{news(Date.now(),`💜 ${S.name||'Un joueur'} est devenu Mécène du Royaume !`)}catch(e){}
  try{if(NET.on&&NET.db)postMsg(`💜 ${S.name||'Un joueur'} est devenu Mécène du Royaume ! Merci pour ton soutien !`,true)}catch(e){}
  const conf=[...Array(40)].map((_,i)=>`<i style="left:${(i*37)%100}%;animation-delay:${(i%10)*.12}s;background:${['#ffd84a','#ff8ac0','#b07aff','#58e4ff','#fff'][i%5]}"></i>`).join('');
  modal(`<div class="mecwin"><div class="mecconf">${conf}</div><div class="mecstar">💜</div><div class="mecttl">MERCI, MÉCÈNE !</div>
   <div class="mecava"><div class="fav frm-mecene mecav">${myAv()}</div></div><div style="margin:6px 0 2px">${ttChip('mecene')}</div>
   <p class="sub" style="text-align:center">Grâce à toi, Royaumes d'Éther peut continuer à grandir. Voici ton pack :</p>
   <div class="mecgift">${MEC_GIFTS.map((g,i)=>`<span style="animation-delay:${.3+i*.12}s">${g}</span>`).join('')}</div>
   <p class="muted" style="font-size:12px;text-align:center;margin-top:8px">Les gemmes, éclats et l'or t'attendent dans ta 📮 boîte aux lettres.</p>
   <button class="btn pro" data-a="close" style="width:100%;margin-top:10px">Merci ! 💜</button></div>`);
  try{UIS.legend&&UIS.legend()}catch(e){}}
async function mecWall(){const el=$('#mecwall');if(!el)return;try{if(!NET.on||!NET.db||!NET.db.collection)return;const sn=await NET.db.collection('mecene').limit(60).get();const N=[...new Set(sn.docs.map(d=>d.data().n).filter(Boolean))];
  if(!N.length){el.innerHTML='<div class="mwh">💜 Mur des Mécènes</div><span class="muted">Sois le premier !</span>';return}
  el.innerHTML=`<div class="mwh">💜 Mur des Mécènes · ${N.length}</div>`+N.map(n=>`<b>${esc(n)}</b>`).join('')}catch(e){}}
