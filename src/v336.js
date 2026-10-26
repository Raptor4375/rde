
/* ================= Tuto interactif avec Plume : le joueur FAIT au lieu de lire ================= */
/* 1) Invocation → 2) ×10 offert → 3) équipe auto → 4) Aventure → 5) premier combat → 6) bravo.
   L'ancienne visite guidée reste disponible avec le bouton 📖 Tuto. */
const ITU={on:false,i:0,iv:null,p0:0,b0:false};
const ITS=[
 {t:"Salut, moi c'est <b>Plume</b> ! 🦉",x:"Je te montre comment jouer en <b>3 gestes</b>. Prêt ?",btn:"C'est parti !"},
 {sel:'[data-a="tab"][data-v="invoc"]',t:"⭐ Tes premiers héros",x:"Touche <b>Invocation</b>.",done:()=>TAB==='invoc'},
 {sel:'[data-a="pull"][data-v="10"]',enter:()=>{if(!S.itg){S.itg=1;S.gems=Math.max(S.gems,0)+900;save();try{renderTop()}catch(e){}}},t:"🎁 Cadeau : 900 💎",x:"Lance une <b>invocation ×10</b> !",free:()=>!!document.getElementById('summ'),done:()=>S.pulls>ITU.p0&&!document.getElementById('summ')},
 {enter:()=>{try{const own=Object.keys(S.heroes).map(Number).filter(i=>HEROES[i]);const P=i=>{try{return power(heroStats(i))}catch(e){return 0}};S.team=own.sort((a,b)=>P(b)-P(a)).slice(0,5);tSync();TPX.t=0;save();renderTop()}catch(e){}},
  t:"💪 Équipe prête",x:"J'ai mis tes <b>5 meilleurs héros</b> dans ton équipe. Allons combattre !",btn:"Suivant"},
 {sel:'[data-a="tab"][data-v="adv"]',t:"⚔️ L'Aventure",x:"Touche <b>Aventure</b>.",done:()=>TAB==='adv'},
 {sel:'.node.now[data-a="stage"],[data-a="stage"]:not([disabled])',t:"🗡️ Ton premier combat",x:"Touche l'<b>étape</b> pour lancer le combat. Il se joue tout seul !",free:()=>!!B,done:()=>ITU.b0&&!B},
 {t:"🎉 Bravo !",x:"<div class='tuloop'><span>⚔️ Combats</span><i>→</i><span>💰 Or</span><i>→</i><span>🧙 Monte tes héros</span><i>→</i><span>⭐ Invoque</span></div>Le reste du royaume se débloque petit à petit. Besoin d'aide ? Bouton <b>📖 Tuto</b> en haut de chaque lieu.",btn:"À toi de jouer ! 🚀",end:1}];
function itEl(){const st=ITS[ITU.i];if(!st||!st.sel)return null;return[...document.querySelectorAll(st.sel)].find(e=>{const r=e.getBoundingClientRect();return r.width>0&&r.height>0})||null}
function itStart(){if(ITU.on)return;ITU.on=true;ITU.i=0;try{closeModal()}catch(e){}itShow();clearInterval(ITU.iv);ITU.iv=setInterval(itTick,250)}
function itEnd(done){ITU.on=false;clearInterval(ITU.iv);S.tuto=done?2:1;save();const o=document.getElementById('itov');if(o)o.remove();if(done)try{toast('🦉 À toi de jouer !')}catch(e){}}
function itNext(){ITU.i++;if(ITU.i>=ITS.length)return itEnd(true);itShow()}
function itShow(){const st=ITS[ITU.i];if(!st)return itEnd(true);try{st.enter&&st.enter()}catch(e){}
  if(ITU.i===2)ITU.p0=S.pulls||0;if(ITU.i===5)ITU.b0=false;
  if(st.done&&st.done()){return itNext()}
  if(st.sel){const el=itEl();if(el)try{el.scrollIntoView({block:'center',behavior:'smooth'})}catch(e){}}
  let o=document.getElementById('itov');if(!o){o=document.createElement('div');o.id='itov';document.body.appendChild(o)}
  const n=ITS.length;o.innerHTML=`<div class="ithole"></div><div class="itarr">👆</div><div class="itbox"><div class="itmasc">${plumeSVG(st.end?'happy':'happy')}</div><div class="itbub"><div class="itt">${st.t}</div><div class="itx">${st.x}</div>
   <div class="itbt">${st.btn?`<button class="btn p" data-it="next">${st.btn}</button>`:''}${st.end?'':'<button class="itskip" data-it="skip">Passer</button>'}<span class="itn">${ITU.i+1}/${n}</span></div></div></div>`;
  o.classList.toggle('free',!st.sel);itPlace()}
function itPlace(){const o=document.getElementById('itov');if(!o)return;const st=ITS[ITU.i];if(!st)return;const hole=o.querySelector('.ithole'),arr=o.querySelector('.itarr'),box=o.querySelector('.itbox');
  const hidden=st.free&&st.free();o.classList.toggle('hid',!!hidden);if(hidden)return;
  const el=st.sel?itEl():null;
  if(!el){hole.style.cssText='left:50%;top:50%;width:0;height:0';arr.style.display='none';box.className='itbox mid';return}
  const r=el.getBoundingClientRect(),pad=6;hole.style.cssText=`left:${r.left-pad}px;top:${r.top-pad}px;width:${r.width+pad*2}px;height:${r.height+pad*2}px`;
  const low=r.top+r.height/2>innerHeight*.55;arr.style.display='';arr.className='itarr '+(low?'dn':'up');arr.style.left=Math.min(innerWidth-30,Math.max(30,r.left+r.width/2))+'px';arr.style.top=(low?r.top-56:r.bottom+8)+'px';
  box.className='itbox '+(low?'top':'bot')}
function itTick(){if(!ITU.on)return;const st=ITS[ITU.i];if(!st)return;if(ITU.i===5&&B)ITU.b0=true;
  if(st.done&&st.done())return itNext();itPlace()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-it]');if(!b||!ITU.on)return;e.preventDefault();e.stopPropagation();
  if(b.dataset.it==='next')return itNext();if(b.dataset.it==='skip')return itEnd(false)},true);
/* seuls la cible (et la bulle) sont cliquables pendant une étape « touche ici » */
['click','pointerdown','touchstart'].forEach(ev=>document.addEventListener(ev,e=>{if(!ITU.on)return;const st=ITS[ITU.i];if(!st||!st.sel)return;if(st.free&&st.free())return;
  if(e.target.closest('#itov .itbox')||document.getElementById('summ')&&e.target.closest('#summ'))return;const el=itEl();if(el&&el.contains(e.target))return;
  if(e.target.closest('#ovl'))return;e.preventDefault();e.stopPropagation()},true));
window.addEventListener('resize',()=>{if(ITU.on)itPlace()});
/* le tuto automatique des nouveaux joueurs devient le tuto interactif ; 📖 Tuto garde la visite complète */
{const ts=tuStart;tuStart=function(force){if(force)return ts.apply(this,arguments);if(ITU.on||S.tuto)return;return itStart()}}
/* pendant le tuto, les fenêtres (connexion du jour, annonces…) attendent la fin pour ne pas cacher ce qu'il faut toucher */
ITU.q=[];
{const m0=modal;modal=function(){if(ITU.on){ITU.q.push(['m',arguments]);return}return m0.apply(this,arguments)};
 const cm=closeModal;closeModal=function(){const r=cm.apply(this,arguments);if(!ITU.on&&ITU.q.length)setTimeout(itFlush,350);return r};
 window.itFlush=function(){if(ITU.on||$('#ovl').innerHTML)return;const x=ITU.q.shift();if(!x)return;try{if(x[0]==='m')m0.apply(null,x[1]);else $('#ovl').innerHTML=x[1]}catch(e){}}}
{const st=itStart;itStart=function(){const o=$('#ovl');if(o&&o.innerHTML){ITU.q.push(['h',o.innerHTML]);o.innerHTML=''}return st.apply(this,arguments)}}
{const en=itEnd;itEnd=function(){const r=en.apply(this,arguments);setTimeout(itFlush,600);return r}}
