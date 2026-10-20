
/* ================= V26.2 : cadres visibles, récompenses illustrées, carte sublimée, musiques ================= */
/* ---- correctif : l'état de l'événement écrasait la photo de profil (S.av) ---- */
function AVS(){if(S.av&&typeof S.av==='object'&&('pts' in S.av||'vote' in S.av)){S.avw=Object.assign(S.avw||{},S.av);delete S.av}
  if(!S.avw||typeof S.avw!=='object')S.avw={vote:null,fac:null,pts:0,lv:0,ms:{},tc:{},ad:{d:'',n:0},cap:false};const A=S.avw;A.ms=A.ms||{};A.tc=A.tc||{};A.ad=A.ad||{d:'',n:0};return A}
try{AVS();save()}catch(e){}
/* ---- les cadres exclusifs, dans le vrai système de cadres ---- */
(function(){const ring=([k,c])=>k==='m'?`linear-gradient(110deg,transparent 40%,rgba(255,255,255,.95) 50%,transparent 60%) 0 0/300% 100% no-repeat,linear-gradient(135deg,${c[0]},${c[1]} 22%,${c[2]} 42%,${c[1]} 58%,${c[3]} 78%,${c[0]})`:`linear-gradient(160deg,rgba(255,255,255,.4),transparent 42%,rgba(0,0,0,.28)),conic-gradient(from var(--fa),${c.join(',')})`;
  const D={aureole:['m',['#8a6a10','#ffe680','#ffffff','#ffd84a'],'#3a2a00','rgba(255,240,170,.95)','p'],ailesor:['c',['#ffffff','#ffe680','#fff6d8','#ffd84a','#ffffff'],'#3a2a00','rgba(255,255,255,.95)','p'],
    infernal:['c',['#ff3a1a','#2a0006','#ff8a1a','#5a0010','#ff3a1a'],'#1a0004','#ff3a1a','f'],abyssal:['c',['#c03aff','#14041e','#ff3a8a','#3a0a5a','#c03aff'],'#0c0214','#c03aff','f'],
    capitale:['c',['#ffd84a','#ffffff','#c03aff','#ffd84a','#fff6c0','#c03aff','#ffd84a'],'#140a24','#ffd84a','p']};
  const W=(c,s)=>`<path d="M30 46Q14 30 4 36Q10 40 6 44Q14 44 10 50Q18 48 16 54Q24 50 30 56Z" fill="${c}" stroke="${s}" stroke-width="1.4" stroke-linejoin="round"/>`;const MR=x=>x+`<g transform="matrix(-1 0 0 1 100 0)">${x}</g>`;
  const O={aureole:()=>`<ellipse cx="50" cy="12" rx="17" ry="5" fill="none" stroke="#fff3a0" stroke-width="3.5"/><ellipse cx="50" cy="12" rx="17" ry="5" fill="none" stroke="#ffd84a" stroke-width="1.4"/>`+MR(`<g transform="translate(0 -6) scale(.8)">${W('#fff','#d1a01a')}</g>`)+`<path d="M86 84l1.6 4 4 1.6-4 1.6-1.6 4-1.6-4-4-1.6 4-1.6z" fill="#fff6c0"/><path d="M14 84l1.2 3 3 1.2-3 1.2-1.2 3-1.2-3-3-1.2 3-1.2z" fill="#fff6c0"/>`,
    ailesor:()=>MR(`<g transform="translate(-2 4)">${W('#fffdf4','#c89a1a')}<path d="M24 50Q10 44 2 52Q12 52 8 58Q18 56 22 62Z" fill="#ffe9a0" stroke="#c89a1a" stroke-width="1.2"/></g>`)+`<circle cx="50" cy="10" r="5" fill="#ffd84a" stroke="#8a6a0a" stroke-width="1.2"/>`,
    infernal:()=>MR(`<path d="M28 22Q14 14 16 0Q22 12 34 16Z" fill="#2a0408" stroke="#ff3a1a" stroke-width="1.6" stroke-linejoin="round"/>`)+[20,35,50,65,80].map((x,i)=>`<path d="M${x-6} 98Q${x-8} 88 ${x-2} ${82-i%2*4}Q${x} 90 ${x+3} 86Q${x+8} 92 ${x+6} 98Z" fill="#ff5a1a"/><path d="M${x-3} 98Q${x-3} 92 ${x} 89Q${x+3} 93 ${x+3} 98Z" fill="#ffd84a"/>`).join(''),
    abyssal:()=>[12,88].map(x=>`<path d="M${x-7} 92Q${x-10} 70 ${x} 50Q${x+2} 66 ${x+6} 60Q${x+10} 76 ${x+6} 92Z" fill="#9a20d0" opacity=".9"/><path d="M${x-3} 90Q${x-4} 76 ${x} 66Q${x+3} 76 ${x+3} 90Z" fill="#ff7ae0"/>`).join('')+`<circle cx="44" cy="8" r="2.4" fill="#ff3a6a"/><circle cx="56" cy="8" r="2.4" fill="#ff3a6a"/><path d="M38 6Q50 -2 62 6" stroke="#c03aff" stroke-width="2" fill="none"/>`,
    capitale:()=>`<path d="M30 16V6h5v4h5V2h6v8h8V2h6v8h5V6h5v10Z" fill="#ffd84a" stroke="#5a3a06" stroke-width="1.4" stroke-linejoin="round"/><path d="M48 2V-6" stroke="#5a3a06" stroke-width="1"/><path d="M48 -6l8 3-8 3Z" fill="#c03aff"/><circle cx="50" cy="12" r="2" fill="#c03aff"/>`};
  let css='';for(const k in D){const d=D[k];css+=`.fav.frm-${k}{--fd:${d[2]};--gc:${d[3]};animation:${d[4]==='p'?'fpulse 2.6s ease-in-out infinite':'fflk 1.7s ease-in-out infinite'}}\n.fav.frm-${k}::before{background:${ring(d)};animation:${d[0]==='m'?'fshine 4.2s ease-in-out infinite':'fspin 5.5s linear infinite'}}\n.fav.frm-${k}::after{background-image:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible">${O[k]()}</svg>`)}")}\n`}
  const st=document.createElement('style');st.id='frv26';st.textContent=css;document.head.appendChild(st)})();
/* ---- récompenses illustrées ---- */
const AVTK='<span class="avtk">🎫</span>';
const AVRWI=[[['g',5000]],[['m',30]],[['t',2]],[['s',1]],[['m',80],['e',3]],[['g',15000]],[['m',50]],[['s',2]],[['t',3]],[['u',1],['e',4]],[['g',30000]],[['m',80]],[['s',3]],[['m',120]],[['f',1],['u',2],['m',200]]];
const AVMSI=[[['m',100]],[['f',2]],[['u',1]],[['u',2],['m',300]]];
function avIco(t,q,f){const fk=f==='demon'?(q===2?'abyssal':'infernal'):(q===2?'ailesor':'aureole');
  if(t==='f')return`<span class="avrwi fr"><span class="fav frm-${fk} avfp2">${myAv()}</span><b>Cadre</b></span>`;
  if(t==='c')return`<span class="avrwi fr"><span class="fav frm-capitale avfp2">${myAv()}</span><b>Cadre</b></span>`;
  if(t==='e')return`<span class="avrwi"><span class="ieq r${q}" style="${rv(q)};width:34px;height:34px">${itemArt(ri(0,4),q)}</span><b>${q===4?'Céleste':'Épique'}</b></span>`;
  const I={g:GOLD,m:GEM,s:SHARD,u:USH,t:AVTK}[t];return`<span class="avrwi"><span class="avic">${I}</span><b>${q>=1000?fmt(q):'×'+q}</b></span>`}
function avRewardsCard(){const f=(UI.avr||avMyFac()||AVS().vote)==='demon'?'demon':'ange',F=AVF[f],fr1=f==='ange'?'aureole':'infernal',fr2=f==='ange'?'ailesor':'abyssal';
  return`<div class="card avrw ${f}"><div class="row" style="justify-content:space-between;align-items:center"><div class="h3" style="margin:0">🎁 Récompenses exclusives</div><div class="seg avseg"><button class="${f==='ange'?'on':''}" data-a="avrw" data-v="ange">😇 Anges</button><button class="${f==='demon'?'on':''}" data-a="avrw" data-v="demon">😈 Démons</button></div></div>
  <div class="avfrs">${[[fr1,'Niveau 15'],[fr2,'2 500 points'],['capitale','Prise de la capitale']].map(([k,w])=>`<div class="avfrc"><span class="fav frm-${k} avfpb">${myAv()}</span><b>${FRAMES[k]}</b><small>${w}</small></div>`).join('')}</div>
  <div class="h4" style="margin-top:12px">${F.ic} ${F.lv} : 15 niveaux exclusifs</div>
  <div class="avlvg">${AVRWI.map((R,i)=>`<div class="avlvc ${i%5===4?'boss':''}"><div class="avlvh"><span class="avlvm">${nmonArt(AVMON[f][i][0],f==='ange'?350:48,i%5===4)}</span><span><b>Niveau ${i+1}</b><small>${AVMON[f][i][0]}</small></span></div><div class="avrwr">${R.map(([t,q])=>avIco(t,q,f)).join('')}</div></div>`).join('')}</div>
  <div class="h4" style="margin-top:12px">🏅 Paliers de points personnels</div><div class="avlvg">${AVMSI.map((R,i)=>`<div class="avlvc"><div class="avlvh"><span class="avpt">${AVMS[i].p.toLocaleString('fr-FR')}</span><span><b>points</b><small>de faction</small></span></div><div class="avrwr">${R.map(([t,q])=>avIco(t,q,f)).join('')}</div></div>`).join('')}</div>
  <div class="h4" style="margin-top:12px">👑 Prise de la capitale</div><div class="avlvg"><div class="avlvc boss"><div class="avlvh"><span class="avpt">🏆</span><span><b>Faction gagnante</b><small>tient la capitale à la fin</small></span></div><div class="avrwr">${avIco('c',1,f)+avIco('m',500)+avIco('u',3)}</div></div><div class="avlvc"><div class="avlvh"><span class="avpt">🎖️</span><span><b>Faction perdante</b><small>participation</small></span></div><div class="avrwr">${avIco('m',150)+avIco('s',1)}</div></div></div></div>`}
/* ---- capitale et royaumes : version luxe ---- */
function avDefs(){return`<linearGradient id="avst" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".35"/><stop offset=".5" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".28"/></linearGradient><linearGradient id="avbeam" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff" stop-opacity=".0"/><stop offset=".4" stop-color="#fff" stop-opacity=".55"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><radialGradient id="avglow"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient><linearGradient id="avwater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bfeaff"/><stop offset="1" stop-color="#5ab0ff" stop-opacity=".2"/></linearGradient>`}
function avCitadel(o){const P=o==='ange'?{a:'#fbf8f0',b:'#e8dfcc',c:'#c8b898',d:'#9a8a6a',r:'#f0c040',r2:'#fff3b0',g:'#fff3a0',win:'#8ad8ff',fl:'#ffd84a',tr:'#d1a01a'}:o==='demon'?{a:'#52405a',b:'#3a2a44',c:'#26182e',d:'#140a1a',r:'#8a1aba',r2:'#d050ff',g:'#c03aff',win:'#ff5a3a',fl:'#c03aff',tr:'#ff3a6a'}:{a:'#f4f2fa',b:'#dcd6e8',c:'#b8b0cc',d:'#8a82a0',r:'#4a6ad8',r2:'#a8c0ff',g:'#d8e8ff',win:'#ffe07a',fl:'#e8e8f0',tr:'#c8a040'};
  const OL='stroke="#140c24" stroke-width="1.4" stroke-linejoin="round"';const SH='fill="url(#avst)"';
  const block=(x,y,w,h,col)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${col}" ${OL}/><rect x="${x}" y="${y}" width="${w}" height="${h}" ${SH}/>`;
  const crenel=(x1,x2,y,col)=>{let d=`M${x1} ${y}`;for(let x=x1;x<x2-.1;x+=6)d+=`v-3.5h3v3.5h3`;return`<path d="${d}V${y+1}H${x1}Z" fill="${col}" stroke="#140c24" stroke-width="1.1"/>`};
  const spire=(x,y,w,h,rh,rc,big)=>`${block(x-w/2,y-h,w,h,P.b)}<path d="M${x-w/2} ${y-h}h${w}" stroke="${P.tr}" stroke-width="2"/><path d="M${x-w/2-3} ${y-h}L${x} ${y-h-rh}L${x+w/2+3} ${y-h}Z" fill="${rc||P.r}" ${OL}/><path d="M${x} ${y-h-rh}L${x+w/2+3} ${y-h}H${x+1}Z" fill="#000" opacity=".18"/><circle cx="${x}" cy="${y-h-rh}" r="1.8" fill="${P.tr}"/><path d="M${x} ${y-h-rh}V${y-h-rh-9}" stroke="#140c24" stroke-width="1"/><path class="avflag" d="M${x} ${y-h-rh-9}q5 -1 10 2q-5 2 -10 3Z" fill="${P.fl}" stroke="#140c24" stroke-width=".8"/>${[0,1,2].slice(0,big?3:2).map(i=>`<rect class="avwin" x="${x-1.8}" y="${y-h+6+i*10}" width="3.6" height="5.4" rx="1.8" fill="${P.win}"/>`).join('')}`;
  let s=`<ellipse cx="0" cy="52" rx="96" ry="18" fill="#140c24" opacity=".35"/>`;
  /* île rocheuse flottante + cascades */
  s+=`<path d="M-86 30Q-80 50 -60 58Q-30 92 0 96Q30 92 60 58Q80 50 86 30Z" fill="${P.d}" ${OL}/><path d="M-60 58Q-30 92 0 96L0 62Q-40 62 -60 58Z" fill="#000" opacity=".2"/><path d="M-30 70l-4 18M10 78l-2 16M40 66l-3 14" stroke="#000" stroke-width="1" opacity=".3"/>`;
  s+=[-46,46].map(x=>`<path class="avfall" d="M${x-4} 34V${78-Math.abs(x)/6}h8V34Z" fill="url(#avwater)"/>`).join('');
  s+=`<path d="M-88 30Q-70 14 -40 18H40Q70 14 88 30Q0 40 -88 30Z" fill="${P.c}" ${OL}/><path d="M-80 30Q0 38 80 30" stroke="#7ac06a" stroke-width="3" opacity=".7" fill="none"/>`;
  /* remparts extérieurs */
  s+=block(-74,4,148,24,P.b)+crenel(-74,74,4,P.b)+spire(-74,30,16,40,20)+spire(74,30,16,40,20)+spire(-52,28,12,30,16,P.r2)+spire(52,28,12,30,16,P.r2);
  s+=`<path d="M-11 28v-16q11 -12 22 0v16Z" fill="#1a0e22" ${OL}/><path d="M-11 15h22M-11 19h22M-11 23h22M-6 8v20M0 7v21M6 8v20" stroke="${P.c}" stroke-width=".9"/><path d="M-13 12q13 -14 26 0" stroke="${P.tr}" stroke-width="2" fill="none"/>`;
  /* second niveau */
  s+=block(-54,-24,108,28,P.a)+crenel(-54,54,-24,P.a)+spire(-46,4,13,46,18,P.r,1)+spire(46,4,13,46,18,P.r,1)+[-32,-20,20,32].map(x=>`<rect class="avwin" x="${x-2.4}" y="-15" width="4.8" height="9" rx="2.4" fill="${P.win}"/>`).join('');
  s+=`<path d="M-54 -10H54" stroke="${P.tr}" stroke-width="1.6" opacity=".9"/>`;
  /* palais central */
  s+=block(-28,-66,56,44,P.a)+crenel(-28,28,-66,P.a)+spire(-30,-22,10,56,18,P.r2,1)+spire(30,-22,10,56,18,P.r2,1);
  s+=`<path d="M-24 -66Q0 -108 24 -66Z" fill="${P.r}" ${OL}/><path d="M0 -102Q16 -86 24 -66H0Z" fill="#000" opacity=".16"/><path d="M-16 -70Q0 -98 16 -70" fill="none" stroke="${P.r2}" stroke-width="2.4" opacity=".85"/><path d="M-24 -66H24" stroke="${P.tr}" stroke-width="2.4"/>`;
  s+=spire(0,-100,9,14,26,P.r2)+`<path d="M-8 -36v-16q8 -10 16 0v16Z" fill="${P.win}" ${OL}/><path d="M0 -50V-36M-8 -44H8" stroke="${P.c}" stroke-width="1"/><circle cx="0" cy="-58" r="4" fill="${P.tr}" ${OL}/>`;
  /* rayon de lumière + cristal + anneaux */
  s+=`<path class="avbeam" d="M-7 -150L-26 -290H26L7 -150Z" fill="url(#avbeam)" opacity=".5"/><circle cx="0" cy="-150" r="26" fill="url(#avglow)" opacity=".7"/><g class="avcrys"><path d="M0 -168L8 -150L0 -132L-8 -150Z" fill="${P.g}" stroke="#140c24" stroke-width="1.2"/><path d="M0 -168L0 -132L-8 -150Z" fill="#fff" opacity=".65"/></g><ellipse class="avring" cx="0" cy="-150" rx="26" ry="6" fill="none" stroke="${P.g}" stroke-width="1.6"/><ellipse class="avring r2" cx="0" cy="-150" rx="18" ry="4" fill="none" stroke="#fff" stroke-width="1" opacity=".8"/>`;
  /* bannières et blasons */
  s+=[-34,34].map(x=>`<path class="avflag" d="M${x-6} -20h12v22l-6 -5l-6 5Z" fill="${o==='ange'?'#ffd84a':o==='demon'?'#7a1aaa':'#4a6ad8'}" ${OL}/>`).join('')+avEmblem(o||null,-34,-10,.42)+avEmblem(o||null,34,-10,.42);
  /* îlots flottants */
  s+=[[-102,-40,.7],[104,-56,.6]].map(([x,y,k])=>`<g class="avisl" transform="translate(${x} ${y}) scale(${k})"><path d="M-16 0Q-12 14 0 18Q12 14 16 0Z" fill="${P.d}" ${OL}/><path d="M-18 0Q0 -6 18 0Q0 4 -18 0Z" fill="#7ac06a" ${OL}/>${spire(0,0,7,12,10,P.r)}</g>`).join('');
  return s}
function avTown(T,o){const P=o==='ange'?{w:'#fbf6ea',w2:'#e2d6bc',r:'#efb42a',r2:'#fff0b0',win:'#8ad8ff',fl:'#ffd84a',g:'#d8e8b0',st:'#cbbf9f'}:o==='demon'?{w:'#54405a',w2:'#34243c',r:'#9a1a40',r2:'#6a1aa0',win:'#ff5a3a',fl:'#c03aff',g:'#2e2230',st:'#3a2a40'}:{w:'#d8d0c0',w2:'#a8a090',r:'#9a6a48',r2:'#6e5a4a',win:'#ffd86a',fl:'#9a94a4',g:'#9aa87a',st:'#8a8478'};
  const st=AVSTY[T.k];const OL='stroke="#1a1020" stroke-width="1" stroke-linejoin="round"';
  const house=(x,y,w,h,rc)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${P.w}" ${OL}/><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="url(#avst)"/><path d="M${x-w/2-1.6} ${y-h}L${x} ${y-h-w*.62}L${x+w/2+1.6} ${y-h}Z" fill="${rc||P.r}" ${OL}/><path d="M${x} ${y-h-w*.62}L${x+w/2+1.6} ${y-h}H${x}Z" fill="#000" opacity=".18"/><rect class="avwin" x="${x-1.3}" y="${y-h*.6}" width="2.6" height="3" fill="${P.win}"/><rect x="${x+w/2-3}" y="${y-h-w*.5}" width="2" height="4" fill="${P.w2}" ${OL}/>`;
  const tower=(x,y,h,w=7,rc)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${P.w2}" ${OL}/><rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="url(#avst)"/><path d="M${x-w/2-2} ${y-h}L${x} ${y-h-12}L${x+w/2+2} ${y-h}Z" fill="${rc||P.r2}" ${OL}/><rect class="avwin" x="${x-1.2}" y="${y-h+4}" width="2.4" height="3.6" fill="${P.win}"/><path d="M${x} ${y-h-12}V${y-h-19}" stroke="#1a1020" stroke-width=".8"/><path class="avflag" d="M${x} ${y-h-19}q4 -1 7 1.5q-3.5 1.5 -7 2.5Z" fill="${P.fl}"/>`;
  const wall=w=>{let d=`M${-w} 5V-3`;for(let i=-w;i<w-.1;i+=4)d+=`h2v-2.2h2v2.2`;return`<path d="${d}V5Z" fill="${P.w2}" ${OL}/><path d="M${-w} 1H${w}" stroke="#000" stroke-width=".6" opacity=".25"/>`+tower(-w,5,14,6)+tower(w,5,14,6)};
  let s=`<ellipse cx="0" cy="10" rx="36" ry="10" fill="#140c24" opacity=".35"/><path d="M-34 4Q-30 16 0 18Q30 16 34 4Z" fill="${P.st}" ${OL}/><ellipse cx="0" cy="4" rx="34" ry="9" fill="${P.g}" ${OL}/>`;
  if(st==='chasm')s+=`<path class="avlava" d="M-22 6L-8 2L0 10L9 3L24 8" stroke="#ff5a1a" stroke-width="2.6" fill="none"/><path d="M-22 6L-8 2L0 10L9 3L24 8" stroke="#ffe06a" stroke-width=".9" fill="none"/>`;
  if(st==='marsh')s+=`<ellipse cx="0" cy="6" rx="26" ry="5.5" fill="${o==='demon'?'#4a6a2a':'#6a9a6a'}" opacity=".85"/><circle class="avbub" cx="-12" cy="6" r="1.2" fill="#d8ffb0"/><circle class="avbub b2" cx="10" cy="5" r="1" fill="#d8ffb0"/>`;
  if(st==='forest')s+=[[-28,3],[28,4],[-18,-2],[20,-1],[0,-6]].map(([x,y],i)=>`<path d="M${x} ${y-19}L${x-7} ${y}L${x+7} ${y}Z" fill="${o==='demon'?'#3a2440':i%2?'#2f7a3e':'#3e9a4e'}" ${OL}/><path d="M${x} ${y-19}L${x+7} ${y}H${x}Z" fill="#000" opacity=".15"/>`).join('');
  s+=wall(st==='bastion'?26:22);
  if(st==='temple'||st==='zenithsp'){s+=`<rect x="-16" y="-14" width="32" height="15" fill="${P.w}" ${OL}/>`+[-12,-6,0,6,12].map(x=>`<rect x="${x-1.1}" y="-13" width="2.2" height="13" fill="${P.w2}"/>`).join('')+`<path d="M-18 -14L0 -26L18 -14Z" fill="${P.r}" ${OL}/><path d="M-18 -14H18" stroke="${P.r2}" stroke-width="1.4"/>`+(st==='zenithsp'?`<path d="M-4 -26L0 -46L4 -26Z" fill="${P.r2}" ${OL}/><circle class="avwin" cx="0" cy="-48" r="2.8" fill="${P.fl}"/>`:`<path d="M-8 -26Q0 -38 8 -26Z" fill="${P.r2}" ${OL}/><circle cx="0" cy="-36" r="1.6" fill="${P.fl}"/>`)+house(-24,3,7,6)+house(24,3,7,6)}
  else if(st==='bridge')s+=`<path d="M-30 -2Q0 -18 30 -2V2Q0 -13 -30 2Z" fill="${P.w2}" ${OL}/><path d="M-20 -1Q-14 -8 -8 -4M8 -4Q14 -8 20 -1" stroke="#1a1020" stroke-width=".8" fill="none"/>`+tower(-18,-2,24,8)+tower(18,-2,24,8)+house(0,-8,10,8)+house(-8,4,7,6)+house(9,4,7,6);
  else if(st==='bastion')s+=tower(-17,2,22,10)+tower(17,2,22,10)+`<rect x="-11" y="-22" width="22" height="24" fill="${P.w2}" ${OL}/><rect x="-11" y="-22" width="22" height="24" fill="url(#avst)"/><path d="M-11 -22h3v-3h3v3h4v-3h3v3h4v-3h3v3" fill="none" stroke="#1a1020" stroke-width="1"/><path d="M-3.5 2v-8q3.5 -5 7 0v8Z" fill="#2a1a20"/>`+tower(0,-22,8,6,P.r);
  else if(st==='crypt')s+=`<rect x="-13" y="-16" width="26" height="17" fill="${P.w2}" ${OL}/><path d="M-15 -16Q0 -31 15 -16Z" fill="${P.r2}" ${OL}/><path d="M-3.5 1v-9q3.5 -5 7 0v9Z" fill="#1a0a10"/><path d="M0 -27V-37M-3.5 -33H3.5" stroke="#1a1020" stroke-width="1.6"/>`+[-24,24].map(x=>`<path d="M${x-3} 4v-6q3 -4 6 0v6Z" fill="${P.w2}" ${OL}/>`).join('')+house(-17,3,7,6)+house(17,3,7,6);
  else if(st==='marsh')s+=[[-17,-1],[0,-5],[17,-1]].map(([x,y])=>`<path d="M${x-4} ${y+3}v5M${x+4} ${y+3}v5" stroke="#5a3a20" stroke-width="1.3"/>`+house(x,y+3,11,7,P.r)).join('')+tower(0,-11,12,5)+`<path class="avsmk" d="M-13 -14q-2 -4 1 -7q3 -3 0 -7" stroke="#e8e0f0" stroke-width="1.6" fill="none" opacity=".6"/>`;
  else if(st==='chasm')s+=tower(-15,1,28,9)+tower(13,-1,34,10)+house(-2,3,9,8)+house(22,4,7,6)+`<path class="avsmk" d="M-2 -10q-2 -4 1 -7q3 -3 0 -7" stroke="#bbb" stroke-width="1.6" fill="none" opacity=".55"/>`;
  else s+=house(-15,2,10,9)+house(15,2,10,9)+tower(0,-3,26,9)+house(-7,5,8,7,P.r2)+house(8,5,8,7,P.r2)+`<path class="avsmk" d="M-13 -14q-2 -4 1 -7q3 -3 0 -7" stroke="#e8e0f0" stroke-width="1.6" fill="none" opacity=".6"/>`;
  if(o)s+=`<ellipse cx="0" cy="-10" rx="34" ry="28" fill="${o==='ange'?'#fff3a0':'#c03aff'}" opacity=".13"/>`;
  return s}
try{AVTER.find(t=>t.k==='soufre').y=336}catch(e){}
{const am=avMap;avMap=function(){let h=am.apply(this,arguments);h=h.replace('viewBox="0 0 340 360"','viewBox="0 0 340 392"').replace('<rect width="340" height="360" rx="22"','<rect width="340" height="392" rx="22"').replace('translate(14 344)','translate(14 380)').replace('translate(326 344)','translate(326 380)').replace('translate(170 198) scale(.74)','translate(170 204) scale(.68)').replace('y="240" text-anchor','y="258" text-anchor').replace('y="253" text-anchor','y="270" text-anchor');return h.replace('<defs>','<defs>'+avDefs()).replace(/<g transform="translate\(([\d.]+) ([\d.]+)\)">(?=<ellipse cx="0" cy="10")/g,(m,x,y)=>`<g transform="translate(${x} ${y}) scale(1.08)">`)}}
/* ---- musiques : bataille au chargement (au premier toucher) et thème mystique de la guerre ---- */
SONGS.avwar={g:.95,bpm:78,spb:4,bar:16,bars:8,prog:'Dm Eb Dm C Bb Eb Dm A',parts:[
 {i:'choir',f:'chord',lo:55,v:.6},
 {i:'pad',f:'chord',lo:48,v:.55},
 {i:'sbass',f:'bass',lo:38,v:.4,pat:[[0,8,0],[8,8,7]]},
 {i:'harp',f:'arp',lo:62,v:.38,pat:[0,1,2,3,4,3,2,1,0,2,4,5,4,2,1,0]},
 {i:'flute',f:'mel',v:.7,from:3,mel:'D5:4 Eb5:4 F5:4 A5:4|Bb5:8 A5:4 G5:4|A5:6 F5:2 D5:8|C5:4 E5:4 G5:8|D5:4 F5:4 Bb5:8|Eb6:8 D6:4 Bb5:4|A5:4 F5:4 D5:4 F5:4|E5:8 C#5:8'},
 {i:'bell',f:'mel',v:.32,mel:'D6:16|Eb6:16|r:16|G6:16|r:16|Bb6:16|A6:16|r:16'},
 {i:'timp',f:'bass',lo:38,v:.55,pat:[[0,4,0],[12,2,7],[14,2,7]]},
 {i:'kick',f:'drum',v:.22,pat:'x.......x.....x.'},
 {i:'crash',f:'drum',v:.3,pat:'',alt:{1:'x',5:'x'}}]};
try{delete SONGC.avwar}catch(e){}
{const pt=pageTheme;pageTheme=function(){if(BOOT.done&&!B&&TAB==='event'&&UI.lz&&UI.lz.event==='av')return'avwar';return pt.apply(this,arguments)}}
/* écran de démarrage : la bataille (et sa musique) commence au premier toucher */
BT2.go=false;
function btMaybe(){if(BOOT.done||!BT2.ready||!BT2.go2||BT2.shown)return;const b=document.getElementById('boot');if(!b||!b.classList.contains('v2'))return btEnter();
  BT2.shown=true;b.classList.add('done');clearInterval(BOOT.iv);const s=document.getElementById('bts');if(s)s.textContent='Le royaume est prêt !';const t=document.getElementById('b2tap');if(t)t.hidden=false;setTimeout(()=>{if(!BOOT.done)btEnter()},30000)}
function btGo(){if(BT2.go)return;BT2.go=true;const b=document.getElementById('boot');if(b){b.classList.remove('b2wait');const w=document.getElementById('b2start');if(w)w.remove();const sn=document.getElementById('b2snd');if(sn)sn.hidden=true}
  try{auUnlock();musicWant('boot')}catch(e){}setTimeout(()=>{BT2.go2=true;btMaybe()},5600)}
(function(){try{const b=document.getElementById('boot');if(!b||!b.classList.contains('v2')||BOOT.done)return;
  if(AU.ok&&AU.ctx&&AU.ctx.state==='running'&&AU.started){btGo();return}
  b.classList.add('b2wait');const sn=document.getElementById('b2snd');if(sn)sn.hidden=true;
  b.querySelector('.b2').insertAdjacentHTML('beforeend',`<button class="b2start" id="b2start" aria-label="Lancer la bataille"><span class="b2sw">⚔️</span><b>Touche pour lancer la bataille</b><small>🔊 avec la musique</small></button>`);
  b.addEventListener('pointerdown',()=>btGo(),{capture:true});}catch(e){BT2.go2=true}})();
