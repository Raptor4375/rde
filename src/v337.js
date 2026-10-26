
/* ================= PASS DE COMBAT v2 : 14 jours, 60 paliers, quêtes de la semaine ================= */
/* Saisons à thème, programmées à l'avance (heure de Paris) :
   S2 « Les Cendres du Premier Porteur » 27/10 8h10 → 10/11 · S3 « Givre éternel » → 24/11 · S4 « L'Éclipse » → 8/12 · S5 « Les Lanternes de l'Hiver » → 22/12 */
const NP0=Date.UTC(2026,9,27,7,10),NPL=14*864e5,NPM=60;
const NSEAS=[
 {k:'p_cendres',n:'Les Cendres du Premier Porteur',ic:'🔥',c:'#ff7a2a',c2:'#5a0e04',d:"Les braises de la flamme volée retombent sur le royaume. Le passé brûle encore.",tk:'ps_cendres',tn:'Celui qui a vu brûler le passé',tc:'#ff9a4a'},
 {k:'p_givre2',n:'Givre éternel',ic:'❄️',c:'#8ad8ff',c2:'#123a6a',d:"Un hiver sans fin fige le royaume sous la glace. Même le vent s'est arrêté.",tk:'ps_givre',tn:'Cœur de glace',tc:'#bfeaff'},
 {k:'p_eclipse',n:"L'Éclipse",ic:'🌑',c:'#b48aff',c2:'#140a3a',d:"Le soleil s'éteint en plein jour… et quelque chose s'éveille, au-delà des mythiques.",tk:'ps_eclipse',tn:"Témoin de l'Éclipse",tc:'#c8a8ff'},
 {k:'p_lanternes',n:"Les Lanternes de l'Hiver",ic:'🏮',c:'#ffb84a',c2:'#1a2a5a',d:"Mille lanternes illuminent la plus longue nuit de l'année. Un cadeau t'attend à chaque lanterne.",tk:'ps_lanternes',tn:'Porteur de Lanterne',tc:'#ffd07a'}];
passIdx=(t=Date.now())=>t<NP0?Math.max(1,Math.floor((t-PASS_EPOCH)/PASS_LEN)+1):2+Math.floor((t-NP0)/NPL);
passStartAt=i=>i<=1?PASS_EPOCH:NP0+(i-2)*NPL;
passEndAt=(i=passIdx())=>i<=1?NP0:NP0+(i-1)*NPL;
passSeason=(i=passIdx())=>i<=1?PSEAS[0]:(NSEAS[i-2]||PSEAS[(i-2)%PSEAS.length]);
const NEWP=s=>s>=2;
/* paliers de plus en plus chers : 200 XP au début, 450 au palier 60 (≈ 19 500 XP au total) */
const PXC=l=>Math.round(200+(l-1)*250/(NPM-1));
const PCUM=[0];for(let l=1;l<=NPM;l++)PCUM[l]=PCUM[l-1]+PXC(l);
{const pl0=pLV;pLV=function(s){return NEWP(s)?NPM:pl0.apply(this,arguments)}}
{const pf0=pFR;pFR=function(s){return NEWP(s)?30:pf0.apply(this,arguments)}}
{const lv0=passLvl;passLvl=P=>{if(!NEWP(P.s))return lv0(P);let L=0;while(L<NPM&&PCUM[L+1]<=P.xp)L++;return L}}
const PBON2=1000;
{const bn0=passBonusN;passBonusN=P=>NEWP(P.s)?Math.max(0,Math.floor((P.xp-PCUM[NPM])/PBON2)-(P.cb||0)):bn0(P)}
{const sk0=passSkip;passSkip=function(){const P=PASS();if(!NEWP(P.s))return sk0.apply(this,arguments);const L=passLvl(P);if(L>=NPM)return;if(S.gems<PASS_SKIP)return toast('Pas assez de gemmes.');
  S.gems-=PASS_SKIP;P.xp=Math.max(P.xp,PCUM[L+1]);toast(`🎟️ Niveau ${L+1} atteint !`);save();render()}}
/* --- titres de saison --- */
function ptGive(k){S.ptit=S.ptit||[];if(!S.ptit.includes(k))S.ptit.push(k)}
for(const s of NSEAS)TITLES.push({k:s.tk,n:s.tn,c:s.tc,d:`Palier ${NPM} du pass « ${s.n} »`,ok:()=>(S.ptit||[]).includes(s.tk)});
const TTLIC='<svg class="ic" viewBox="0 0 24 24"><path d="M3 7h12l6 5-6 5H3z" fill="#ffd84a" stroke="#a87412" stroke-width="1.2" stroke-linejoin="round"/><circle cx="15.5" cy="12" r="1.6" fill="#7a4a08"/><path d="M6 10.5h6M6 13.5h4" stroke="#7a4a08" stroke-width="1.4" stroke-linecap="round"/></svg>';
/* --- récompenses des 60 paliers --- */
{const rw0=passRw;passRw=function(L,prem,si){if(!NEWP(si))return rw0.apply(this,arguments);const s=passSeason(si);
  if(!prem){
    if(L===NPM)return{ic:TTLIC,n:`Titre « ${s.tn} » + éclat d'ultra`,g:()=>{ptGive(s.tk);S.ush=(S.ush||0)+1;return'titre exclusif débloqué'}};
    if(L===20||L===50)return{ic:SIC.chest4,n:'Coffre légendaire',g:()=>dropItem(4)};
    if(L%10===0)return{ic:USH,n:"2 éclats d'ultra",g:()=>{S.ush=(S.ush||0)+2}};
    if(L%5===0)return{ic:SIC.ticket,n:"Ticket d'invocation",g:()=>{INV().pt++}};
    if(L%3===0)return{ic:GEM,n:'40 gemmes',g:()=>{S.gems+=40}};
    if(L%4===0)return{ic:SHARD,n:'Éclat légendaire',g:()=>{S.shards++}};
    const go=8000+L*700;return{ic:GOLD,n:fmt(go)+' or',g:()=>{S.gold+=go}}}
  if(L===NPM)return{ic:LEGIC,n:'Légendaire au choix',leg:1,g:()=>legRandom()};
  if(L===30)return{fr:s.k,n:`Cadre « ${s.n} »`,g:()=>unlockFrame(s.k)};
  if(L===10||L===25||L===45||L===55)return{ic:SIC.chest4,n:'Coffre légendaire',g:()=>dropItem(4)};
  if(L%10===5)return{ic:USH,n:"2 éclats d'ultra",g:()=>{S.ush=(S.ush||0)+2}};
  if(L%5===0)return{ic:SIC.ticket,n:"3 tickets d'invocation",g:()=>{INV().pt+=3}};
  if(L%2===0)return{ic:GEM,n:'60 gemmes',g:()=>{S.gems+=60}};
  if(L%3===0)return{ic:SIC.chest3,n:'Coffre épique',g:()=>dropItem(3)};
  return{ic:SHARD,n:'Éclat légendaire',g:()=>{S.shards++}}}}
/* --- limite quotidienne des victoires d'aventure + quêtes de la semaine --- */
const PWIN_MAX=30;
const PWQ=[{k:'boss',ic:'🐉',n:'Attaque 8 boss (raid, guilde, événement)',g:8,xp:600},{k:'win',ic:'⚔️',n:"Gagne 25 combats d'aventure",g:25,xp:500},{k:'ar',ic:'🏟️',n:"Fais 10 combats d'arène",g:10,xp:500},{k:'pull',ic:'✨',n:'Fais 20 invocations',g:20,xp:400}];
function pWeek(P){return Math.max(0,Math.floor((Date.now()-passStartAt(P.s))/(7*864e5)))}
function pWQ(P){const w=pWeek(P);if(!P.wq||P.wq.w!==w)P.wq={w,p:{},c:{}};return P.wq}
{const pq0=passQ;passQ=function(k,n=1){const P=PASS();if(!NEWP(P.s))return pq0.apply(this,arguments);
  try{const Q=pWQ(P);if(PWQ.some(q=>q.k===k))Q.p[k]=(Q.p[k]||0)+n}catch(e){}
  if(k==='win'){const d=today();if(!P.wd||P.wd.d!==d)P.wd={d,n:0};const room=Math.max(0,PWIN_MAX-P.wd.n),m=Math.min(room,n);P.wd.n+=m;if(m>0)passAdd(PXP.win*m);return}
  return pq0.apply(this,arguments)}}
function pwqClaim(k){const P=PASS(),Q=pWQ(P),q=PWQ.find(x=>x.k===k);if(!q||Q.c[k]||(Q.p[k]||0)<q.g)return;Q.c[k]=1;passAdd(q.xp);toast(`🎯 Quête de la semaine : +${q.xp} XP de pass !`);save();render()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="pwq"]');if(!b)return;e.preventDefault();e.stopPropagation();pwqClaim(b.dataset.v)},true);
/* --- décors des saisons --- */
const NART={
 p_cendres:()=>{const R=rng(71);let o=`<defs><linearGradient id="nc1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a0402"/><stop offset=".55" stop-color="#4a0e04"/><stop offset="1" stop-color="#ff6a1a"/></linearGradient><radialGradient id="nc2" cx=".72" cy=".42" r=".42"><stop offset="0" stop-color="#ffb84a" stop-opacity=".9"/><stop offset=".45" stop-color="#ff5a1a" stop-opacity=".35"/><stop offset="1" stop-color="#ff5a1a" stop-opacity="0"/></radialGradient></defs><rect width="400" height="200" fill="url(#nc1)"/><rect width="400" height="200" fill="url(#nc2)"/>`;
  o+=`<path d="M0 200V150Q40 132 80 146T170 140T260 150T340 136T400 146V200Z" fill="#160302"/><path d="M0 200V170Q60 158 120 168T240 164T400 170V200Z" fill="#0a0101"/>`;
  o+=`<g transform="translate(288 88)"><circle r="44" fill="#ff8a2a" opacity=".18"/><path d="M-34 14L-26 -18L-14 2L0 -28L14 2L26 -18L34 14Z" fill="#1a0806" stroke="#ff8a3a" stroke-width="2.4" stroke-linejoin="round"/><path d="M-34 14H34V22H-34Z" fill="#1a0806" stroke="#ff8a3a" stroke-width="2.4"/>${[-26,0,26].map((x,i)=>`<path d="M${x} ${i===1?-30:-20}q-7 -12 0 -26q7 14 0 26z" fill="#ffd84a" opacity=".95"/><path d="M${x} ${i===1?-30:-20}q-4 -8 0 -16q4 9 0 16z" fill="#fff6c0"/>`).join('')}</g>`;
  for(let k=0;k<26;k++){const x=R()*400,y=R()*200,r=.8+R()*2.2;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="${k%3?'#ffb84a':'#c8bcb0'}" opacity="${(.35+R()*.6).toFixed(2)}"/>`}
  for(let k=0;k<6;k++){const x=30+R()*340;o+=`<path d="M${x.toFixed(0)} 200q${(R()*20-10).toFixed(0)} -40 ${(R()*10-5).toFixed(0)} -70" stroke="#ff8a3a" stroke-width="1.2" fill="none" opacity=".25"/>`}
  return o},
 p_givre2:()=>{const R=rng(53);let o=`<defs><linearGradient id="ng1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#06142e"/><stop offset=".6" stop-color="#14406e"/><stop offset="1" stop-color="#bfeaff"/></linearGradient><linearGradient id="ng2" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#58e4c0" stop-opacity="0"/><stop offset=".5" stop-color="#58e4c0" stop-opacity=".55"/><stop offset="1" stop-color="#8a6aff" stop-opacity="0"/></linearGradient></defs><rect width="400" height="200" fill="url(#ng1)"/>`;
  o+=`<path d="M0 60Q100 20 200 54T400 40" stroke="url(#ng2)" stroke-width="22" fill="none" opacity=".7"/><path d="M0 84Q120 50 230 80T400 70" stroke="url(#ng2)" stroke-width="12" fill="none" opacity=".45"/>`;
  o+=`<path d="M0 200V140L40 96L70 128L110 70L150 124L190 90L230 132L270 78L310 120L350 92L400 136V200Z" fill="#dff6ff" opacity=".9"/><path d="M110 70L96 104L118 96L124 120L150 124ZM270 78L256 112L276 104L284 128ZM40 96L30 124L48 116Z" fill="#9adfff" opacity=".8"/><path d="M0 200V166Q100 150 200 164T400 158V200Z" fill="#f4fcff"/>`;
  for(let k=0;k<30;k++){const x=R()*400,y=R()*170,r=.6+R()*1.8;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(.4+R()*.6).toFixed(2)}"/>`}
  o+=`<g transform="translate(300 42)" stroke="#e8faff" stroke-width="2.2" stroke-linecap="round" opacity=".9">${[0,60,120].map(a=>`<path transform="rotate(${a})" d="M-18 0H18M-12 -5L-16 0L-12 5M12 -5L16 0L12 5"/>`).join('')}</g>`;return o},
 p_eclipse:()=>{const R=rng(97);let o=`<defs><radialGradient id="ne1" cx=".7" cy=".42" r=".7"><stop offset="0" stop-color="#3a1a7a"/><stop offset=".5" stop-color="#140a3a"/><stop offset="1" stop-color="#05030f"/></radialGradient><radialGradient id="ne2" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="#ffffff" stop-opacity="0"/><stop offset=".62" stop-color="#ffe8b0" stop-opacity=".95"/><stop offset=".75" stop-color="#c890ff" stop-opacity=".5"/><stop offset="1" stop-color="#8a5aff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="200" fill="url(#ne1)"/>`;
  for(let k=0;k<60;k++){const x=R()*400,y=R()*200,r=.3+R()*1.3;o+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${r.toFixed(1)}" fill="#fff" opacity="${(.3+R()*.7).toFixed(2)}"/>`}
  o+=`<g transform="translate(282 86)"><circle r="78" fill="url(#ne2)"/>${[...Array(16)].map((_,i)=>`<path transform="rotate(${i*22.5})" d="M0 -44L3 -66L0 -${58+(i%3)*10}L-3 -66Z" fill="#ffe8b0" opacity=".55"/>`).join('')}<circle r="44" fill="#05030f"/><circle r="44" fill="none" stroke="#fff6dc" stroke-width="1.6" opacity=".8"/></g>`;
  o+=`<path d="M0 200V164Q80 150 160 162T320 156T400 162V200Z" fill="#0a0620"/><path d="M60 162l6 -26l6 26M150 160l8 -34l8 34" stroke="#2a1a5a" stroke-width="3" fill="none"/>`;return o},
 p_lanternes:()=>{const R=rng(131);let o=`<defs><linearGradient id="nl1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a0f2e"/><stop offset=".7" stop-color="#1a2a5a"/><stop offset="1" stop-color="#3a3a7a"/></linearGradient><radialGradient id="nl2"><stop offset="0" stop-color="#ffd84a" stop-opacity=".75"/><stop offset="1" stop-color="#ff8a2a" stop-opacity="0"/></radialGradient></defs><rect width="400" height="200" fill="url(#nl1)"/>`;
  for(let k=0;k<26;k++)o+=`<circle cx="${(R()*400).toFixed(0)}" cy="${(R()*120).toFixed(0)}" r="${(.4+R()).toFixed(1)}" fill="#fff" opacity="${(.3+R()*.5).toFixed(2)}"/>`;
  const lan=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="18" fill="url(#nl2)"/><path d="M-7 -9Q-10 0 -7 9H7Q10 0 7 -9Z" fill="#ff7a2a" stroke="#ffd84a" stroke-width="1"/><path d="M-4 -9V9M0 -9V9M4 -9V9" stroke="#ffb84a" stroke-width=".7" opacity=".8"/><rect x="-5" y="-11" width="10" height="2.4" rx="1" fill="#5a1a08"/><rect x="-5" y="8.6" width="10" height="2.4" rx="1" fill="#5a1a08"/><path d="M0 11v5" stroke="#ffd84a" stroke-width=".8"/></g>`;
  for(let k=0;k<14;k++)o+=lan((R()*380+10).toFixed(0),(20+R()*110).toFixed(0),(.5+R()*.9).toFixed(2));
  o+=`<path d="M0 200V158Q100 146 200 156T400 150V200Z" fill="#e8f0ff"/>${[30,70,330,370].map((x,i)=>`<path d="M${x} ${150-i%2*6}l-16 30h32zM${x} ${136-i%2*6}l-12 24h24zM${x} ${124-i%2*6}l-8 18h16z" fill="#123a2a"/>`).join('')}`;
  for(let k=0;k<20;k++)o+=`<circle cx="${(R()*400).toFixed(0)}" cy="${(R()*200).toFixed(0)}" r="${(.8+R()*1.4).toFixed(1)}" fill="#fff" opacity=".8"/>`;return o}};
{const sa0=seasonArt;seasonArt=function(s){if(s&&NART[s.k])return`<svg class="bgart" viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${NART[s.k]()}<defs><linearGradient id="nshd" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#05030f" stop-opacity=".78"/><stop offset=".5" stop-color="#05030f" stop-opacity=".45"/><stop offset=".72" stop-color="#05030f" stop-opacity="0"/></linearGradient></defs><rect width="400" height="200" fill="url(#nshd)"/></svg>`;return sa0.apply(this,arguments)}}
/* --- cadres exclusifs des saisons --- */
(function(){const A=FRV2.A,{G,P,spkL,flameL,snowL,starL,moonL}=A;
  const DEF={p_cendres:['c',['#ff3a1a','#2a0806','#ffb84a','#5a0e04','#ff8a2a','#2a0806','#ff3a1a'],'#1a0402','#ff6a1a','f'],
   p_givre2:['m',['#2a6aaa','#dff6ff','#ffffff','#8ad8ff'],'#06142e','rgba(160,225,255,.8)','p'],
   p_eclipse:['c',['#1a0a3a','#ffe8b0','#8a5aff','#05030f','#c890ff','#1a0a3a'],'#05030f','#b48aff','p'],
   p_lanternes:['c',['#ff8a2a','#1a2a5a','#ffd84a','#c0303a','#ffd84a','#1a2a5a','#ff8a2a'],'#0a0f2e','rgba(255,184,74,.8)','p']};
  const lan=(s)=>`<g transform="scale(${s})"><path d="M-6 -8Q-9 0 -6 8H6Q9 0 6 -8Z" fill="#ff7a2a" stroke="#ffd84a" stroke-width="1"/><rect x="-4.5" y="-10" width="9" height="2.2" fill="#5a1a08"/><rect x="-4.5" y="7.8" width="9" height="2.2" fill="#5a1a08"/></g>`;
  const OR={p_cendres:()=>G(50,10,.9,`<path d="M-14 6L-10 -6L-5 2L0 -10L5 2L10 -6L14 6Z" fill="#1a0806" stroke="#ff8a3a" stroke-width="1.6"/>`,'bob',0)+[[24,94,5,11,0],[50,96,6,14,.2],[76,94,5,11,.4]].map(([x,y,w,h,d])=>G(x,y,1,flameL(w,h,'#ff5a1a','#ffd84a'),'fk',d)).join('')+spk(88,22,3,'#ffb84a',.5)+spk(12,30,2.6,'#ffd84a',1.2),
   p_givre2:()=>G(13,13,1,snowL(9,'#e8faff'),'sp',0)+G(87,87,1,snowL(7,'#bfeaff'),'sp',2)+G(87,14,.8,snowL(5,'#fff'),'sp',1)+spk(12,86,3,'#fff',.6),
   p_eclipse:()=>G(50,10,1,`<circle r="8" fill="#ffe8b0" opacity=".9"/><circle r="6.4" fill="#05030f"/>`,'gl',0)+G(14,86,1,starL(4,'#c8a8ff'),'tw',.3)+G(86,86,1,starL(3.4,'#fff'),'tw',1.1)+spk(88,20,3,'#ffe8b0',.8),
   p_lanternes:()=>G(14,16,1,lan(1),'bob',0)+G(86,20,1,lan(.85),'bob',.7)+G(84,86,1,lan(1.05),'bob',1.4)+spk(14,84,3,'#ffd84a',.5)};
  function spk(x,y,s,c,d){try{return G(x,y,1,spkL(s,c),'tw',d)}catch(e){return''}}
  const ring=([k,c])=>k==='m'?`linear-gradient(110deg,transparent 40%,rgba(255,255,255,.95) 50%,transparent 60%) 0 0/300% 100% no-repeat,linear-gradient(135deg,${c[0]},${c[1]} 22%,${c[2]} 42%,${c[1]} 58%,${c[3]} 78%,${c[0]})`:`linear-gradient(160deg,rgba(255,255,255,.4),transparent 42%,rgba(0,0,0,.28)),conic-gradient(from var(--fa),${c.join(',')})`;
  let css='';for(const k in DEF){const d=DEF[k];FRV2.OR[k]=OR[k];FRV2.FD[k]=d;
    css+=`.fav.frm-${k}{--fd:${d[2]};--gc:${d[3]};animation:${d[4]==='p'?'fpulse 2.6s ease-in-out infinite':d[4]==='f'?'fflk 1.7s ease-in-out infinite':'none'}}\n.fav.frm-${k}::before{background:${ring(d)};animation:${d[0]==='m'?'fshine 4.2s ease-in-out infinite':'fspin 5.5s linear infinite'}}\n`;
    try{css+=`.fav.frm-${k}::after{background-image:url("data:image/svg+xml,${encodeURIComponent(FRV2.svg(k))}")}\n`}catch(e){}}
  const st=document.createElement('style');st.id='frv3';st.textContent=css;document.head.appendChild(st);
  for(const s of NSEAS){FRAMES[s.k]=s.n;FHINT[s.k]=`Pass « ${s.n} » : palier 30 premium`}})();
/* --- la page du pass (saisons v2) --- */
{const pp0=passPage;passPage=function(){const P=PASS();if(!NEWP(P.s))return pp0.apply(this,arguments);
  const s=passSeason(P.s),M=NPM,L=passLvl(P),mx=L>=M,X=mx?PXC(M):PXC(L+1),inL=mx?X:P.xp-PCUM[L],cl=passClaimable(P).length+passBonusN(P),h0=HEROES[S.team[0]??0];
  const cell=(l,tr)=>{const r=tr===2?proRw(l,P.s):passRw(l,tr===1,P.s),got=(tr===2?(P.cr||{}):tr===1?P.cp:P.cf)[l],lock=(tr===1&&!P.prem)||(tr===2&&!P.pro),ok=!got&&!lock&&l<=L;
    const ic=r.fr?`<span class="fav frm-${r.fr} pfr" style="${rv(4)}">${myAv()}</span>`:r.ic;
    return`<button class="pcell ${tr===1?'pr':tr===2?'px':''} ${ok?'ok':''} ${got?'done':''} ${lock?'lk':''}" data-a="${tr===2?'pclaimx':'pclaim'}" data-v="${l}" data-p="${tr}" ${ok?'':'disabled'} aria-label="${esc(r.n)}">${ic}<span class="pn">${r.n}</span>${got?'<i class="pck">✓</i>':lock?'<i class="plk">🔒</i>':''}</button>`};
  const rows=Array.from({length:M},(_,i)=>i+1).map(l=>`<div class="prow ${l<=L?'reach':''} ${l===L+1?'next':''} ${l===30||l===M||l%10===0?'big':''}">${cell(l,0)}<span class="plvb">${l}</span>${cell(l,1)}${cell(l,2)}</div>`).join('');
  const bn=passBonusN(P),ps=proSum(P.s),Q=pWQ(P),wEnd=Math.min(passEndAt(P.s),passStartAt(P.s)+(Q.w+1)*7*864e5),wd=P.wd&&P.wd.d===today()?P.wd.n:0;
  const tt=TITLES.find(t=>t.k===s.tk);
  return`<div class="pban v2" style="--pc:${s.c};--pc2:${s.c2}">${seasonArt(s)}<div class="ptx"><span class="tag" style="--rc:${s.c}">PASS DE COMBAT · SAISON ${P.s}</span><div class="h">${s.ic} ${s.n}</div><p>${s.d}</p><div style="font-size:12.5px">${M} paliers · fin dans <b>${dur(Math.max(0,passEndAt(P.s)-Date.now()))}</b></div></div>
   <div class="pshow"><span class="pav fav frm-${s.k}" style="${rv(h0.r)}">${myAv()}</span><span class="pexl">Cadre exclusif</span><span class="pttl2" style="--tc:${s.tc}">« ${esc(s.tn)} »</span></div></div>
  <div class="card plv" style="--pc:${s.c};--pc2:${s.c2}"><div class="pnum"><small>NIV</small>${L}</div><div style="flex:1;min-width:0"><div class="row" style="justify-content:space-between;gap:6px"><b>${mx?'Niveau maximum atteint !':`Vers le niveau ${L+1} · ${inL} / ${X} XP`}</b>${P.pro?'<span class="tag" style="--rc:#ff9ae8">💎 PRO</span>':P.prem?'<span class="tag" style="--rc:#ffd84a">👑 PREMIUM</span>':''}</div>
   <div class="bar" style="height:10px;margin:6px 0 8px"><i style="width:${mx?100:inL/X*100}%;background:linear-gradient(90deg,${s.c},${s.c2})"></i></div>
   <div class="row" style="gap:6px">${cl?`<button class="btn p sm" data-a="pall">Tout récupérer (${cl})</button>`:''}${mx?`<span class="muted" style="font-size:12px">Coffre bonus : 50 gemmes tous les ${fmt(PBON2)} XP en plus${bn?` · ${bn} prêt${bn>1?'s':''}`:''}</span>`:`<button class="btn sm" data-a="pskip" ${S.gems<PASS_SKIP?'disabled':''}>+1 niveau · ${GEM}${PASS_SKIP}</button>`}</div></div></div>
  <div class="card pwq" style="--pc:${s.c}"><div class="row" style="justify-content:space-between;gap:6px"><div class="h3" style="margin:0">🎯 Quêtes de la semaine</div><span class="muted" style="font-size:12px">Nouvelles dans ${dur(Math.max(0,wEnd-Date.now()))}</span></div>
   ${PWQ.map(q=>{const n=Math.min(q.g,Q.p[q.k]||0),done=Q.c[q.k],ok=!done&&n>=q.g;return`<div class="pwqi ${done?'done':''}"><span class="pwqic">${q.ic}</span><div style="flex:1;min-width:0"><div class="pwqn">${q.n}</div><div class="bar" style="height:6px;margin-top:4px"><i style="width:${n/q.g*100}%;background:${s.c}"></i></div></div><button class="btn sm ${ok?'p':''}" data-a="pwq" data-v="${q.k}" ${ok?'':'disabled'}>${done?'✓':`${n}/${q.g}`} · +${q.xp} XP</button></div>`}).join('')}</div>
  ${P.pro?'':`<div class="card ppro"><div class="row" style="flex-wrap:nowrap;gap:12px;align-items:flex-start"><div class="pcrown">💎</div><div style="min-width:0"><div class="h3" style="margin:0 0 2px">Pass Pro</div><div style="font-size:13px">Une 3<sup>e</sup> piste de récompenses énormes à chaque palier, <b>Premium inclus</b>.</div>
   <div class="pprol"><span>${USH}<b>${ps.u}</b> éclats d'ultra</span><span>${LEGIC}<b>${ps.l}</b> légendaires</span><span>${SIC.chest4}<b>${ps.c}</b> coffres célestes</span><span>${SHARD}<b>${ps.s}</b> éclats légendaires</span><span>${GEM}<b>${fmt(ps.g)}</b> gemmes</span><span>👑 + toute la piste Premium</span></div></div></div>
   <button class="btn pro" data-a="probuy" style="margin-top:10px;width:100%" ${S.gems<proCost(P)?'disabled':''}>Débloquer le Pass Pro · ${GEM} ${fmt(proCost(P))}${P.prem?' (Premium déduit)':''}</button></div>`}
  ${P.prem?'':`<div class="card ppre"><div class="row" style="flex-wrap:nowrap;gap:12px;align-items:flex-start"><div class="pcrown">👑</div><div style="min-width:0"><div class="h3" style="margin:0 0 2px">Pass Premium</div><div style="font-size:13px">Débloque la piste premium : <b>le cadre exclusif « ${s.n} »</b> (palier 30), <b>un légendaire au choix</b> (palier ${M}), 4 coffres légendaires, des éclats d'ultra, des tickets, des gemmes et des éclats.</div><div class="muted" style="font-size:12px;margin-top:4px">Les paliers déjà atteints deviennent récupérables tout de suite.</div></div></div><button class="btn p" data-a="pbuy" style="margin-top:10px;width:100%" ${S.gems<pPREM(P.s)?'disabled':''}>Débloquer le Premium · ${GEM} ${fmt(pPREM(P.s))}</button></div>`}
  <div class="ptrack pro3" style="--pc:${s.c};--pc2:${s.c2}"><div class="phead"><span>Gratuit</span><span></span><span>Premium${P.prem?' 👑':' 🔒'}</span><span class="pro">Pro${P.pro?' 💎':' 🔒'}</span></div>${rows}</div>
  <div class="card"><div class="h3">Gagner de l'XP de pass</div><div class="pxp">${[['📅','Connexion du jour',80],['⚔️',`Victoire d'aventure (${PWIN_MAX} par jour · ${wd}/${PWIN_MAX} aujourd'hui)`,25],['🐉','Attaque de boss (raid, guilde, event)',45],['🗼','Nouvel étage de la tour (gardien : +70)',25],['🛡️','Pointage de guilde',40],['🏟️',"Combat d'arène",20],['✨','Invocation (par tirage)',12],['🔨',"Fusion d'équipement",15],['📈','Niveau de héros ou amélioration',4],['🎯','Quêtes de la semaine','400 à 600']].map(([i,n,x])=>`<div><span>${i} ${n}</span><b>+${x}</b></div>`).join('')}</div>
   <p class="muted" style="font-size:12px;margin:8px 0 0">Les paliers coûtent de plus en plus cher : ${PXC(1)} XP au début, ${PXC(M)} XP à la fin. Un nouveau pass tous les 14 jours, avec son thème, son cadre et son titre.</p></div>`}}
try{PATCH.unshift({v:36,d:'27 octobre 2026',t:'Le nouveau Pass de combat',items:["🎟️ <b>Nouveau pass dès le 27 octobre à 8h10</b> : « 🔥 Les Cendres du Premier Porteur ». Un nouveau pass à thème <b>tous les 14 jours</b>.","📈 <b>60 paliers</b> au lieu de 30, de plus en plus chers : il faut jouer toute la saison pour aller au bout.","🎯 <b>Quêtes de la semaine</b> : 4 grosses quêtes (boss, aventure, arène, invocations) qui donnent jusqu'à 600 XP chacune.","🏷️ Au palier 60 : un <b>titre exclusif</b> à la saison (gratuit) et un <b>légendaire au choix</b> (Premium). Le <b>cadre exclusif</b> est au palier 30 Premium.","⚔️ Les victoires d'aventure donnent de l'XP de pass jusqu'à 30 par jour.","⏰ Le pass actuel se termine le 27 octobre à 8h10 : les récompenses non récupérées te seront envoyées automatiquement."]})}catch(e){}
