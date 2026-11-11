/* ================= V429 : GARANCE ET ORGEMME NE SONT PLUS OFFERTES PAR LEUR CHRONIQUE =================
   Leur chronique sert à les essayer. À la fin : un ×10 offert sur leur bannière (gardé tant
   qu'elle est fermée), un cadre de profil à leur thème et le titre. 15 fragments si on les a déjà. */
(function(){try{
if(!window.RDEhc||typeof GAR==='undefined'||typeof ORG==='undefined')return;
const L=RDEhc.list();
const CFG={};
for(const [hid,ban,fr,frn,bn] of [[GAR,'ev_garance','botterouge','Botte Rouge','Le Dernier Duel'],[ORG,'ev_orgemme','vitrail','Grande Rose','La Rose Brisée']]){
  const ci=L.findIndex(C=>C.hero===hid);if(ci<0)continue;const C=L[ci];
  C.gift=null;CFG[ci]={hid,ban,fr,frn,bn};
  C.rwFin=()=>[S.heroes[hid]?['🧩',`15 fragments de ${HEROES[hid].n.split(/[ ,]/)[0]}`]:['🎟️',`Un ×10 offert sur la bannière « ${bn} »`],['🖼️',`Cadre « ${frn} »`]]}
/* --- les cadres --- */
try{FRAMES.botterouge='Botte Rouge';FHINT.botterouge='Chronique « Le Dernier Duel »';FRAMES.vitrail='Grande Rose';FHINT.vitrail='Chronique « La Rose Brisée »'}catch(e){}
const SV=x=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible">${x}</svg>`)}")`;
const blades=`<g stroke-linecap="round"><path d="M28 2L60 24" stroke="#f4e6c8" stroke-width="2.6"/><path d="M72 2L40 24" stroke="#f4e6c8" stroke-width="2.6"/><path d="M57 18l6 6M43 18l-6 6" stroke="#ffd84a" stroke-width="4"/><circle cx="62" cy="25.5" r="2.6" fill="#c81e3a"/><circle cx="38" cy="25.5" r="2.6" fill="#c81e3a"/></g><path d="M50 92l-7 8 7-3 7 3z" fill="#c81e3a"/>`;
const rose=(()=>{const C=['#1e4a92','#8e1e32','#c08a22','#1f6b54','#3f7fd0','#8e1e32','#c08a22','#1f6b54'];let p='';
  for(let i=0;i<8;i++){const a=i*Math.PI/4,a2=a+Math.PI/4,r=11,x1=50+r*Math.sin(a),y1=8-r*Math.cos(a),x2=50+r*Math.sin(a2),y2=8-r*Math.cos(a2);p+=`<path d="M50 8L${x1.toFixed(1)} ${y1.toFixed(1)}A${r} ${r} 0 0 1 ${x2.toFixed(1)} ${y2.toFixed(1)}Z" fill="${C[i]}" stroke="#f4ecd8" stroke-width="1.1"/>`}
  return p+`<circle cx="50" cy="8" r="3.4" fill="#ffd84a" stroke="#f4ecd8" stroke-width="1"/><circle cx="50" cy="8" r="11.6" fill="none" stroke="#f4ecd8" stroke-width="1.6"/>`})();
const st=document.createElement('style');st.textContent=`
.fav.frm-botterouge{--fd:#1a0610;--gc:#ff3a5a;box-shadow:none}
.fav.frm-botterouge::before{background:linear-gradient(160deg,rgba(255,255,255,.35),transparent 40%,rgba(0,0,0,.35)),conic-gradient(from var(--fa),#5a0a1a,#e04a5c,#ffd84a,#c81e3a,#f4e6c8,#5a0a1a);animation:fspin 6s linear infinite}
.fav.frm-botterouge::after{content:'';background-color:transparent;font-size:0;background-image:${SV(blades)}}
.fav.frm-vitrail{--fd:#0a1022;--gc:#7fb0ff;box-shadow:none}
.fav.frm-vitrail::before{background:linear-gradient(160deg,rgba(255,255,255,.4),transparent 40%,rgba(0,0,0,.3)),conic-gradient(from var(--fa),#1e4a92,#8e1e32,#c08a22,#1f6b54,#3f7fd0,#8e1e32,#c08a22,#1e4a92);animation:fspin 9s linear infinite}
.fav.frm-vitrail::after{content:'';background-color:transparent;font-size:0;background-image:${SV(rose)}}
.evtix{width:100%;margin:0 0 8px;font-weight:900;background:linear-gradient(135deg,#ffd84a,#ff9a3a)!important;color:#2a1400!important;box-shadow:0 0 16px -4px #ffd84a}`;
document.head.appendChild(st);
/* --- la récompense finale --- */
const BT=()=>{if(!S.btix||typeof S.btix!=='object')S.btix={};return S.btix};
{const sr=sagaReward;sagaReward=function(c){let X=null;
  try{const f=RDEhc.fi(c);if(f&&CFG[f[0]]&&f[1]===L[f[0]].ch.length-1&&!RDEhc.done(f[0],f[1]))X=Object.assign({own:!!S.heroes[CFG[f[0]].hid]},CFG[f[0]])}catch(e){}
  const r=sr.apply(this,arguments);
  if(X)try{if(!X.own){BT()[X.ban]=(BT()[X.ban]||0)+10}
    S.evFrames=S.evFrames||[];if(!S.evFrames.includes(X.fr))S.evFrames.push(X.fr);save();
    const rw=document.querySelector('#ovl .xrw');
    if(rw)rw.insertAdjacentHTML('beforeend',(X.own?'':`<div>🎟️ Un ×10 offert sur la bannière « ${esc(X.bn)} »</div>`)+`<div>🖼️ Cadre « ${esc(X.frn)} »</div>`);
    if(!X.own){const ov=document.querySelector('#ovl .hcrev');if(ov&&!ov.querySelector('.evtix'))ov.insertAdjacentHTML('beforeend',`<button class="btn evtix" data-a="evtixgo" data-v="${X.ban}" style="margin-top:8px">🎟️ Utiliser mon ×10 maintenant</button>`)}}catch(e){console.warn('récompense chronique',e)}
  return r}}
/* --- le ×10 offert sur la bannière --- */
const NM={ev_garance:'Le Dernier Duel',ev_orgemme:'La Rose Brisée'};
{const ps=pSummon;pSummon=function(){let h=ps.apply(this,arguments);
  try{const k=UI.ban,n=(BT()[k]||0);
    if(NM[k]&&n>=10&&banOpen(k)&&h.indexOf('data-a="evtix"')<0){const b=`<button class="btn evtix" data-a="evtix" data-v="${k}">🎟️ ×10 offert${n>=20?` (${Math.floor(n/10)})`:''} · cadeau de la chronique</button>`;
      const i=h.indexOf('<div class="evperk">');h=i>=0?h.slice(0,i)+b+h.slice(i):h}
    for(const kk in NM){const m=BT()[kk]||0;if(m>=10&&!banOpen(kk))h=h.split(`<b>${esc(NM[kk])}</b><small>`).join(`<b>${esc(NM[kk])}</b><small>🎟️ ×10 offert qui t'attend · `)}}catch(e){}
  return h}}
const use=k=>{const T=BT();if((T[k]||0)<10||!banOpen(k)){toast("La bannière n'est pas ouverte : ton ×10 t'attend jusqu'à son retour.");return}
  T[k]-=10;save();UI.ban=k;const before=UI.last;
  try{pullX(10,{pay:'evt',ban:k})}catch(e){console.warn(e)}
  if(UI.last===before){T[k]+=10;save();try{render()}catch(e){}}};
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="evtix"],[data-a="evtixgo"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=b.dataset.v;
  if(b.dataset.a==='evtixgo'){try{closeModal()}catch(er){}TAB='invoc';UI.iv='invoc';UI.ban=k;try{render();scrollTo(0,0)}catch(er){}if(!banOpen(k)){toast("Sa bannière revient bientôt : ton ×10 t'attend.");return}}
  setTimeout(()=>use(k),b.dataset.a==='evtixgo'?250:0)},true);
try{PATCH.unshift({v:'v56',d:Date.now(),t:'Chroniques : nouvel affichage',items:[
 "📖 Les Chroniques des Héros ont un nouvel affichage : portraits, progression, la chronique à continuer en premier, et une vraie page pour chaque histoire.",
 "⚔️🪟 Rouge-Garance et Orgemme ne sont plus offertes à la fin de leur chronique (elles ont leur bannière) : tu peux les <b>essayer gratuitement</b> dedans, puis tu gagnes un <b>×10 offert sur leur bannière</b> (gardé si elle est fermée), un <b>cadre de profil</b> (« Botte Rouge » et « Grande Rose ») et le titre. 15 fragments si tu les as déjà.",
 "🗺️ Le mode histoire s'affiche aussi en Normal et en Difficile."]})}catch(e){}
}catch(e){console.warn('v429',e)}})();
