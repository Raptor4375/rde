
/* ================= V447 : LE CALENDRIER DES PIONNIERS (testeurs de l'appli Android) =================
   Seulement dans l'appli Android (RDE_AND), et seulement pour ceux qui l'ont ouverte avant la sortie
   officielle (PIO_CUT). 14 cadeaux, un par jour de connexion (pas besoin que les jours se suivent).
   Jour 7 : titre « Pionnier d'Éther ». Jour 14 : cadre animé « Pionnier » (jamais redonné) + œuf légendaire.
   Sur le site web, rien ne s'affiche et rien ne peut être récupéré. */
(function(){try{
const T=(fr,en)=>(typeof LANG!=='undefined'&&LANG==='en')?en:fr;
const PIO_CUT=Date.UTC(2027,1,1); // on peut commencer le calendrier jusqu'au 1er février 2027
const dk=()=>{const d=new Date();return d.getFullYear()*1e4+(d.getMonth()+1)*100+d.getDate()};
const EGGN=['commun','rare','épique','légendaire'];
const R=[
 {i:'💎',n:'300',g:{gems:300}},
 {i:'🫐',n:'20 baies',g:{ber:20}},
 {i:'💰',n:'500 k',g:{gold:5e5}},
 {i:'💎',n:'500',g:{gems:500}},
 {i:'✦',n:'3 éclats',g:{shards:3}},
 {i:'🥚',n:'Œuf rare',g:{egg:1},c:'#4da3ff'},
 {i:'🏷️',n:'Titre + 💎800',g:{gems:800,title:1},big:1,c:'#5ef0c0'},
 {i:'💰',n:'1 M',g:{gold:1e6}},
 {i:'🫐',n:'40 baies',g:{ber:40}},
 {i:'✦',n:'5 éclats',g:{shards:5}},
 {i:'🥚',n:'Œuf épique',g:{egg:2},c:'#ff8f3f'},
 {i:'💎',n:'1 000',g:{gems:1000}},
 {i:'🌟',n:'Éclat ultra',g:{ush:1},c:'#ff5ad8'},
 {i:'🖼️',n:'Cadre Pionnier + 🥚 légendaire',g:{frame:1,egg:3,gems:1500,tix:10},big:1,c:'#ffd84a'}];
const P=()=>S.pio;
function eligible(){if(!window.RDE_AND)return false;if(S.pio)return true;return Date.now()<PIO_CUT}
function st(){if(!eligible())return null;if(!S.pio){S.pio={n:0,last:0,t0:Date.now()};try{save()}catch(e){}}return S.pio}
function canClaim(){const p=st();return !!p&&p.n<14&&p.last!==dk()}
function done(){const p=P();return !!p&&p.n>=14}

FRAMES.pionnier=T('Pionnier','Pioneer');try{FHINT.pionnier=T("Calendrier des Pionniers (testeurs de l'appli)",'Pioneer calendar (app testers)')}catch(e){}
{const fl=frameList;frameList=function(){const L=fl.apply(this,arguments).filter(f=>f!=='pionnier'||frameUnlocked(f));if(!L.includes('pionnier')&&frameUnlocked('pionnier'))L.push('pionnier');return L}}
try{TITLES.push({k:'pionnier',n:"Pionnier d'Éther",c:'#5ef0c0',d:"Tester le jeu sur Android avant sa sortie",ok:()=>!!(S.pio&&S.pio.n>=7)})}catch(e){}

function give(g){const out=[];
  if(g.gems){S.gems+=g.gems;out.push('💎 '+fmt(g.gems))}
  if(g.gold){S.gold+=g.gold;out.push('💰 '+fmt(g.gold))}
  if(g.shards){S.shards=(S.shards||0)+g.shards;out.push('✦ '+g.shards)}
  if(g.ush){S.ush=(S.ush||0)+g.ush;out.push('🌟 '+g.ush)}
  if(g.tix){try{INV().pt+=g.tix;out.push('🎟️ '+g.tix)}catch(e){}}
  if(g.ber||g.egg!=null){try{const p=window.RDEpetState();if(g.ber){p.b+=g.ber;out.push('🫐 '+g.ber)}if(g.egg!=null){p.eggs.push({id:p.nid++,r:g.egg});out.push('🥚 '+T('Œuf ','Egg ')+EGGN[g.egg])}}catch(e){}}
  if(g.title){S.titles=S.titles||[];if(!S.titles.includes('pionnier'))S.titles.push('pionnier');out.push("🏷️ « Pionnier d'Éther »")}
  if(g.frame){S.evFrames=S.evFrames||[];if(!S.evFrames.includes('pionnier'))S.evFrames.push('pionnier');S.frame='pionnier';out.push('🖼️ '+T('Cadre « Pionnier »','“Pioneer” frame'))}
  return out}

function tiles(){const p=P()||{n:0,last:0},can=canClaim();
  return R.map((r,i)=>{const got=i<p.n,now=can&&i===p.n,cls=got?'got':now?'now':'lock';
   return`<div class="piot ${cls} ${r.big?'big':''}" style="--pc:${r.c||'#8fd8ff'}"><span class="pd">${T('Jour','Day')} ${i+1}</span><span class="pi">${r.g.frame?`<span class="fav frm-pionnier piomini">${myAv()}</span>`:r.i}</span><span class="pn">${r.n}</span>${got?'<span class="pok">✓</span>':''}</div>`}).join('')}

function pioModal(){const p=st();if(!p)return;const can=canClaim(),fin=done();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button>
  <div class="piohd"><div class="piofr fav frm-pionnier">${myAv()}</div><div><div class="h">🎁 ${T('Calendrier des Pionniers','Pioneer Calendar')}</div>
  </div></div><div class="piosub">${T("Merci de tester le jeu sur Android avant tout le monde 💚 Un cadeau par jour de connexion (pas besoin que ce soit d'affilée). Au bout de 14, le <b>cadre Pionnier</b> : personne d'autre ne pourra jamais l'avoir.","Thanks for testing the game on Android before everyone else 💚 One gift per day you log in (no need for a streak). After 14, the <b>Pioneer frame</b>: nobody else will ever get it.")}</div>
  <div class="piobar"><i style="width:${Math.round(p.n/14*100)}%"></i><b>${p.n}/14</b></div>
  <div class="piogrid">${tiles()}</div>
  ${fin?`<p class="sub" style="text-align:center;margin-top:10px">🏆 ${T('Calendrier terminé ! Tu es un vrai Pionnier du royaume.','Calendar complete! You are a true Pioneer of the realm.')}</p>`
   :can?`<button class="btn pro piogo" data-a="pioclaim">🎁 ${T('Récupérer le cadeau du jour','Claim today\'s gift')}</button>`
   :`<p class="sub" style="text-align:center;margin-top:10px">✅ ${T('Cadeau du jour récupéré. Reviens demain !','Today\'s gift claimed. Come back tomorrow!')}</p>`}
  <button class="btn sm piobug" data-a="bugrep">🐞 ${T('Un bug pendant le test ? Signale-le','Found a bug? Report it')}</button>`)}

function claim(){if(!canClaim())return;const p=P(),r=R[p.n];const out=give(r.g);p.n++;p.last=dk();save();
  try{ttCheck()}catch(e){}try{renderTop()}catch(e){}try{render()}catch(e){}pioModal();
  const m=document.querySelector('#ovl .modal');if(m){const conf=[...Array(28)].map((_,i)=>`<i style="left:${(i*37)%100}%;animation-delay:${(i%9)*.09}s;background:${['#5ef0c0','#ffd84a','#8fd8ff','#ff8ac0','#fff'][i%5]}"></i>`).join('');
   m.insertAdjacentHTML('beforeend',`<div class="pioconf">${conf}</div>`);const g=m.querySelector('.piogrid');if(g)g.insertAdjacentHTML('afterend',`<div class="piowon">${T('Reçu','Received')} : ${out.join(' · ')}</div>`);
   const t=m.querySelectorAll('.piot.got');const last=t[t.length-1];if(last)last.classList.add('pop')}
  if(p.n===14)try{postMsg(`🖼️ ${S.name||'Un joueur'} a terminé le Calendrier des Pionniers !`,true)}catch(e){}
  try{NET.lastPush='';schedulePush()}catch(e){}}

function btnInit(){const b=document.getElementById('piob');if(!st()||done()){if(b)b.remove();return}
  if(!b){const m=document.getElementById('mailb')||document.getElementById('gearb');if(!m)return;m.insertAdjacentHTML('beforebegin',`<button class="gear piob" id="piob" data-a="piocal" aria-label="${T('Calendrier des Pionniers','Pioneer calendar')}" title="${T('Calendrier des Pionniers','Pioneer calendar')}"><span aria-hidden="true">🎁</span><i class="mbdg" hidden>!</i></button>`)}
  const d=document.querySelector('#piob .mbdg');const c=canClaim();if(d)d.hidden=!c;const bb=document.getElementById('piob');if(bb)bb.classList.toggle('on',c)}
{const rt=renderTop;renderTop=function(){rt.apply(this,arguments);try{btnInit()}catch(e){}}}

document.addEventListener('click',e=>{const b=e.target.closest('[data-a="piocal"],[data-a="pioclaim"]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.dataset.a==='piocal')pioModal();else claim()},true);

/* ouverture automatique une fois par jour, quand un cadeau attend */
setTimeout(()=>{try{btnInit();if(!canClaim())return;let k='';try{k=localStorage.getItem('rde-pio-auto')}catch(e){}if(k===String(dk()))return;
  const tryOpen=(n)=>{if(document.querySelector('#ovl .modal')||document.body.classList.contains('inbattle')){if(n<20)setTimeout(()=>tryOpen(n+1),3000);return}
    try{localStorage.setItem('rde-pio-auto',String(dk()))}catch(e){}pioModal()};tryOpen(0)}catch(e){}},3500);

const st0=document.createElement('style');st0.id='v447css';st0.textContent=`
.piob.on{animation:piopulse 1.6s ease-in-out infinite}
@keyframes piopulse{0%,100%{box-shadow:0 0 0 0 rgba(94,240,192,.0)}50%{box-shadow:0 0 0 5px rgba(94,240,192,.45)}}
.fav.frm-pionnier{--fd:#03201a;--gc:#5ef0c0;animation:fpulse 2.8s ease-in-out infinite}
.fav.frm-pionnier::before{background:linear-gradient(160deg,rgba(255,255,255,.45),transparent 42%,rgba(0,0,0,.28)),conic-gradient(from var(--fa),#5ef0c0,#0a6a52,#e8fff6,#ffd84a,#5ef0c0,#0b4a5a,#8fd8ff,#5ef0c0);animation:fspin 6s linear infinite}
.piohd{display:flex;gap:12px;align-items:center;margin-bottom:10px}
.piosub{font-size:13px;line-height:1.4;opacity:.92;margin:0 0 8px}
.piot .piomini{display:inline-block!important;width:40px!important;height:40px!important;min-width:0!important;vertical-align:middle}
.piot .piomini>*{width:100%!important;height:100%!important}
.piot .pi:has(.piomini){margin:6px 0 10px;line-height:0}
.piofr{width:62px;height:62px;flex:0 0 62px}
.piobar{position:relative;height:16px;border-radius:9px;background:rgba(0,0,0,.35);border:1px solid rgba(94,240,192,.35);overflow:hidden;margin:4px 0 10px}
.piobar i{position:absolute;inset:0 auto 0 0;background:linear-gradient(90deg,#1aa880,#5ef0c0);border-radius:9px;transition:width .6s}
.piobar b{position:relative;display:block;text-align:center;font-size:11px;line-height:16px;color:#fff;text-shadow:0 1px 2px #000}
.piogrid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:6px}
@media(min-width:560px){.piogrid{grid-template-columns:repeat(7,minmax(0,1fr))}}
.piot{position:relative;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:1px;padding:6px 2px 7px;border-radius:12px;min-height:74px;
 background:linear-gradient(180deg,rgba(255,255,255,.07),rgba(0,0,0,.25));border:1.5px solid color-mix(in srgb,var(--pc) 45%,transparent);text-align:center}
.piot.big{grid-column:span 2;background:linear-gradient(180deg,color-mix(in srgb,var(--pc) 22%,transparent),rgba(0,0,0,.3));border-width:2px}
.piot .pd{font-size:10px;font-weight:800;opacity:.75;letter-spacing:.02em}
.piot .pi{font-size:24px;line-height:1.15}.piot.big .pi{font-size:30px}
.piot .pn{font-size:10.5px;font-weight:700;line-height:1.15}
.piot.lock{opacity:.55;filter:saturate(.6)}
.piot.got{opacity:.75}.piot.got .pi{opacity:.45}
.piot .pok{position:absolute;inset:0;display:grid;place-items:center;font-size:30px;color:#5ef0c0;font-weight:900;text-shadow:0 2px 4px #000}
.piot.now{border-color:var(--pc);box-shadow:0 0 0 2px color-mix(in srgb,var(--pc) 60%,transparent),0 0 16px color-mix(in srgb,var(--pc) 55%,transparent);animation:piobob 1.4s ease-in-out infinite}
@keyframes piobob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
.piot.pop{animation:piopop .7s cubic-bezier(.3,1.6,.5,1)}
@keyframes piopop{0%{transform:scale(.6)}100%{transform:scale(1)}}
.piogo{width:100%;margin-top:12px;display:flex;justify-content:center}
.piobug{display:flex!important;width:fit-content;margin:12px auto 0!important;background:transparent!important;border:1px dashed rgba(94,240,192,.45)!important;color:#bff5e4!important}
.piowon{margin-top:10px;text-align:center;font-weight:800;color:#5ef0c0;font-size:13.5px}
.pioconf{position:absolute;inset:0;pointer-events:none;overflow:hidden;border-radius:inherit}
.pioconf i{position:absolute;top:-10px;width:7px;height:11px;border-radius:2px;animation:piofall 1.6s ease-in forwards}
@keyframes piofall{to{transform:translateY(520px) rotate(540deg);opacity:0}}
`;document.head.appendChild(st0);
window.RDEpio={open:pioModal,can:canClaim};

/* ================= NOTES DE VERSION ================= */
try{const it=[
 "🎁 <b>Calendrier des Pionniers</b> : réservé aux testeurs de l'<b>appli Android</b> (Google Play). Un cadeau par jour de connexion pendant 14 jours : gemmes, baies, œufs, le titre « Pionnier d'Éther », et au bout le <b>cadre animé Pionnier</b>, qui ne sera jamais redonné. Merci de tester le jeu 💚"];
 PATCH.unshift({v:'v72',d:Date.now(),t:'Calendrier des Pionniers',items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN['Calendrier des Pionniers']='Pioneer Calendar';
  I18N_EN[it[0]]="🎁 <b>Pioneer Calendar</b>: for testers of the <b>Android app</b> (Google Play) only. One gift per day you log in for 14 days: gems, berries, eggs, the “Pioneer of Ether” title, and at the end the animated <b>Pioneer frame</b>, which will never be given again. Thanks for testing the game 💚"}}catch(e){}
}catch(e){console.warn('v447',e)}})();
