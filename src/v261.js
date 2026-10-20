
/* ================= V26.1 : royaumes neutres, capitale à conquérir, villes dessinées ================= */
const AVSTY={aurore:'zenithsp',nuees:'bridge',dore:'bastion',cendre:'chasm',soufre:'marsh',crypte:'crypt',argent:'forest',zenith:'temple'};
const AVSIM={t:-1,res:null};
function avSim(){const t=avNow(),key=Math.floor(t/60000);if(AVSIM.t===key)return AVSIM.res;
  const hrs=t<AV_START?0:Math.min((Math.min(t,AV_END)-AV_START)/36e5,168),H=Math.floor(hrs);const net={},bias={};let cap=0;
  AVTER.forEach(T=>{net[T.k]=0;bias[T.k]=(avH('b'+T.k)-.5)*.3});
  for(let i=0;i<H;i++){let na=0,nd=0;for(const T of AVTER){const k=T.k;net[k]=clamp(net[k]+((avH(k+'s'+i)-.5)+bias[k])*34,-140,140);if(net[k]>=100)na++;else if(net[k]<=-100)nd++}
    if(na>=5)cap=Math.min(140,cap+10+avH('c'+i)*14);else if(nd>=5)cap=Math.max(-140,cap-10-avH('c'+i)*14);else cap*=.97}
  AVSIM.t=key;AVSIM.res={net,cap};return AVSIM.res}
function avNet(k){const s=avSim();return clamp(Math.round(s.net[k]+(AVS().tc[k]||0)),-150,150)}
function avOwner(k){const v=avNet(k);return v>=100?'ange':v<=-100?'demon':null}
function avCount(){const r={ange:0,demon:0};for(const T of AVTER){const o=avOwner(T.k);if(o)r[o]++}return r}
function avCapNet(){return clamp(Math.round(avSim().cap+(AVS().capc||0)),-150,150)}
function avCapOwner(){const v=avCapNet();return v>=100?'ange':v<=-100?'demon':null}
function avWinner(){const c=avCapOwner();if(c)return c;const n=avCount();if(n.ange!==n.demon)return n.ange>n.demon?'ange':'demon';const T=avTotals();return T.ange>=T.demon?'ange':'demon'}
function avAddPts(n,terr,capw){const A=AVS(),s=avMyFac()==='ange'?1:-1;A.pts+=n;if(terr)A.tc[terr]=clamp((A.tc[terr]||0)+s*25,-250,250);if(capw)A.capc=clamp((A.capc||0)+s*30,-250,250);save();avShare(n)}
/* ---- emblèmes ---- */
function avEmblem(o,x,y,s=1){if(o==='ange')return`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-3 0Q-14 -10 -22 -4Q-17 -2 -19 2Q-13 0 -14 5Q-8 1 -3 4Z" fill="#fff" stroke="#c89a1a" stroke-width="1.2" stroke-linejoin="round"/><path d="M3 0Q14 -10 22 -4Q17 -2 19 2Q13 0 14 5Q8 1 3 4Z" fill="#fff" stroke="#c89a1a" stroke-width="1.2" stroke-linejoin="round"/><circle r="6.5" fill="#ffd84a" stroke="#8a6a0a" stroke-width="1.4"/><ellipse cy="-9.5" rx="6" ry="2" fill="none" stroke="#fff3a0" stroke-width="1.8"/><path d="M0 -3.5L1.1 -1.1L3.6 -.8L1.7 .9L2.2 3.4L0 2.2L-2.2 3.4L-1.7 .9L-3.6 -.8L-1.1 -1.1Z" fill="#fff"/></g>`;
  if(o==='demon')return`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-6 -4Q-14 -10 -12 -20Q-9 -12 -3 -8Z" fill="#2a0a1a" stroke="#ff3a5a" stroke-width="1"/><path d="M6 -4Q14 -10 12 -20Q9 -12 3 -8Z" fill="#2a0a1a" stroke="#ff3a5a" stroke-width="1"/><path d="M0 -10L8 -6L8 3Q8 9 0 12Q-8 9 -8 3L-8 -6Z" fill="#3a0a4a" stroke="#c03aff" stroke-width="1.4"/><path d="M-4.5 -1L-1.5 0.5M4.5 -1L1.5 0.5" stroke="#ff3a3a" stroke-width="1.8" stroke-linecap="round"/><path d="M-3 5Q0 2 3 5Q0 8 -3 5Z" fill="#ff7a1a"/><circle r="13" fill="#c03aff" opacity=".18"/></g>`;
  return`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -9L7 -6V1Q7 7 0 10Q-7 7 -7 1V-6Z" fill="#8a8494" stroke="#3a3444" stroke-width="1.3"/><path d="M-3 0H3" stroke="#d8d0e0" stroke-width="1.6" stroke-linecap="round"/></g>`}
/* ---- petites villes ---- */
function avTown(T,o){const P=o==='ange'?{w:'#f4efe4',w2:'#d8cfbc',r:'#e8b830',r2:'#fff3c0',win:'#7ad0ff',fl:'#ffd84a',g:'#e8f0c8'}:o==='demon'?{w:'#4a3a4e',w2:'#2a1e2e',r:'#8a1a3a',r2:'#5a1a8a',win:'#ff4a3a',fl:'#c03aff',g:'#3a2a30'}:{w:'#c8c0b0',w2:'#9a9284',r:'#8a6a50',r2:'#6a5a4a',win:'#ffd86a',fl:'#9a94a4',g:'#a8b08a'};
  const st=AVSTY[T.k];const OL='stroke="#1a1020" stroke-width="1" stroke-linejoin="round"';
  const house=(x,y,w,h,rc)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${P.w}" ${OL}/><path d="M${x-w/2-1.5} ${y-h}L${x} ${y-h-w*.6}L${x+w/2+1.5} ${y-h}Z" fill="${rc||P.r}" ${OL}/><rect x="${x-1.2}" y="${y-h*.55}" width="2.4" height="2.8" fill="${P.win}"/>`;
  const tower=(x,y,h,w=7,rc)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${P.w2}" ${OL}/><path d="M${x-w/2-2} ${y-h}L${x} ${y-h-11}L${x+w/2+2} ${y-h}Z" fill="${rc||P.r2}" ${OL}/><rect x="${x-1.2}" y="${y-h+4}" width="2.4" height="3.4" fill="${P.win}"/><path d="M${x} ${y-h-11}V${y-h-18}" stroke="#1a1020" stroke-width=".8"/><path d="M${x} ${y-h-18}l6 2l-6 2Z" fill="${P.fl}"/>`;
  const wall=(w)=>{let d=`M${-w} 4V-3`;for(let i=-w;i<w;i+=4)d+=`h2v-2h2v2`;return`<path d="${d}V4Z" fill="${P.w2}" ${OL}/>`};
  let s=`<ellipse cx="0" cy="6" rx="30" ry="9" fill="${P.g}" stroke="#1a1020" stroke-width="1"/>`;
  if(st==='chasm')s+=`<path d="M-18 6L-6 2L0 9L8 3L20 7" stroke="#ff5a1a" stroke-width="2.2" fill="none"/><path d="M-18 6L-6 2L0 9L8 3L20 7" stroke="#ffd06a" stroke-width=".8" fill="none"/>`;
  if(st==='marsh')s+=`<ellipse cx="0" cy="7" rx="22" ry="5" fill="${o==='demon'?'#4a6a2a':'#6a8a5a'}" opacity=".8"/>`;
  if(st==='forest')s+=[[-22,2],[22,3],[-14,-2],[16,-1]].map(([x,y])=>`<path d="M${x} ${y-16}L${x-6} ${y}L${x+6} ${y}Z" fill="${o==='demon'?'#3a2a3a':'#3a8a4a'}" ${OL}/>`).join('');
  s+=wall(st==='bastion'?24:20);
  if(st==='temple'||st==='zenithsp'){s+=`<rect x="-14" y="-12" width="28" height="13" fill="${P.w}" ${OL}/>`+[-10,-4,2,8].map(x=>`<rect x="${x}" y="-11" width="2.2" height="11" fill="${P.w2}"/>`).join('')+`<path d="M-16 -12L0 -22L16 -12Z" fill="${P.r}" ${OL}/>`+(st==='zenithsp'?`<path d="M-3 -22L0 -38L3 -22Z" fill="${P.r2}" ${OL}/><circle cx="0" cy="-40" r="2.4" fill="${P.fl}"/>`:`<path d="M-7 -22Q0 -32 7 -22Z" fill="${P.r2}" ${OL}/>`)}
  else if(st==='bridge')s+=`<path d="M-26 0Q0 -14 26 0V3Q0 -10 -26 3Z" fill="${P.w2}" ${OL}/>`+tower(-16,0,22)+tower(16,0,22)+house(0,-6,9,7);
  else if(st==='bastion')s+=tower(-18,0,18,9)+tower(18,0,18,9)+`<rect x="-10" y="-20" width="20" height="20" fill="${P.w2}" ${OL}/><path d="M-10 -20h3v-3h3v3h4v-3h3v3h4v-3h3v3" fill="none" stroke="#1a1020" stroke-width="1"/><path d="M-3 0v-7q3 -4 6 0v7Z" fill="#2a1a20"/>`;
  else if(st==='crypt')s+=`<rect x="-12" y="-14" width="24" height="15" fill="${P.w2}" ${OL}/><path d="M-14 -14Q0 -28 14 -14Z" fill="${P.r2}" ${OL}/><path d="M-3 1v-8q3 -4 6 0v8Z" fill="#1a0a10"/><path d="M0 -24V-32M-3 -29H3" stroke="#1a1020" stroke-width="1.4"/>`+house(-20,2,7,6)+house(20,2,7,6);
  else if(st==='marsh')s+=[[-14,0],[0,-3],[14,0]].map(([x,y])=>`<path d="M${x-4} ${y+3}v4M${x+4} ${y+3}v4" stroke="#5a3a20" stroke-width="1.2"/>`+house(x,y+3,10,7,P.r)).join('')+tower(0,-8,10,5);
  else if(st==='chasm')s+=tower(-14,0,24,8)+tower(12,-2,30,9)+house(-2,2,8,7);
  else s+=house(-14,1,9,8)+house(14,1,9,8)+tower(0,-2,22,8)+house(-6,4,7,6,P.r2)+house(7,4,7,6,P.r2);
  if(o)s+=`<ellipse cx="0" cy="-8" rx="30" ry="24" fill="${o==='ange'?'#fff3a0':'#c03aff'}" opacity=".12"/>`;
  return s}
/* ---- la capitale ---- */
function avCitadel(o){const P=o==='ange'?{a:'#f8f4ea',b:'#e2d8c4',c:'#c8b898',r:'#f0c040',r2:'#fff6c0',g:'#fff3a0',win:'#7ad0ff',fl:'#ffd84a'}:o==='demon'?{a:'#4a3a52',b:'#34243c',c:'#22162a',r:'#7a1aaa',r2:'#c03aff',g:'#c03aff',win:'#ff4a3a',fl:'#c03aff'}:{a:'#eeeaf4',b:'#d0c8dc',c:'#b0a8c0',r:'#5a7ad0',r2:'#9ab0ff',g:'#cfe0ff',win:'#ffe07a',fl:'#e8e8f0'};
  const OL='stroke="#140c24" stroke-width="1.4" stroke-linejoin="round"';
  const spire=(x,y,w,h,rh,rc)=>`<rect x="${x-w/2}" y="${y-h}" width="${w}" height="${h}" fill="${P.b}" ${OL}/><path d="M${x-w/2-3} ${y-h}L${x} ${y-h-rh}L${x+w/2+3} ${y-h}Z" fill="${rc||P.r}" ${OL}/><path d="M${x} ${y-h-rh}V${y-h-rh-8}" stroke="#140c24" stroke-width="1"/><path d="M${x} ${y-h-rh-8}l9 3l-9 3Z" fill="${P.fl}" stroke="#140c24" stroke-width=".8"/>${[0,1].map(i=>`<rect x="${x-1.6}" y="${y-h+6+i*10}" width="3.2" height="5" rx="1.6" fill="${P.win}"/>`).join('')}`;
  const crenel=(x1,x2,y)=>{let d=`M${x1} ${y}`;for(let x=x1;x<x2;x+=6)d+=`h3v-3h3v3`;return`<path d="${d}" fill="none" stroke="#140c24" stroke-width="1.2"/>`};
  let s=`<ellipse cx="0" cy="34" rx="78" ry="16" fill="#1a1020" opacity=".35"/><path d="M-70 34Q-60 14 -40 16L40 16Q60 14 70 34Q0 46 -70 34Z" fill="${P.c}" ${OL}/>`;
  /* rempart extérieur */
  s+=`<rect x="-62" y="2" width="124" height="22" fill="${P.b}" ${OL}/>${crenel(-62,62,2)}`+spire(-62,26,14,34,18)+spire(62,26,14,34,18)+`<path d="M-9 24v-14q9 -10 18 0v14Z" fill="#2a1a30" ${OL}/><path d="M-9 14h18M-9 18h18M-4 10v14M0 9v15M4 10v14" stroke="${P.c}" stroke-width=".8"/>`;
  /* second niveau */
  s+=`<rect x="-44" y="-22" width="88" height="26" fill="${P.a}" ${OL}/>${crenel(-44,44,-22)}`+spire(-40,4,11,42,16,P.r2)+spire(40,4,11,42,16,P.r2)+[-26,-14,14,26].map(x=>`<rect x="${x-2}" y="-14" width="4" height="7" rx="2" fill="${P.win}"/>`).join('');
  /* donjon central et dôme */
  s+=`<rect x="-20" y="-58" width="40" height="40" fill="${P.a}" ${OL}/>${crenel(-20,20,-58)}<path d="M-20 -58Q0 -90 20 -58Z" fill="${P.r}" ${OL}/><path d="M-12 -62Q0 -84 12 -62" fill="none" stroke="${P.r2}" stroke-width="2" opacity=".8"/>`+spire(0,-80,8,18,22,P.r2)+`<rect x="-6" y="-48" width="12" height="16" rx="6" fill="${P.win}" ${OL}/><path d="M0 -48V-32M-6 -40H6" stroke="${P.c}" stroke-width="1"/>`;
  /* cristal et halo */
  s+=`<g class="avcrys"><circle cx="0" cy="-132" r="12" fill="${P.g}" opacity=".35"/><path d="M0 -144L6 -132L0 -120L-6 -132Z" fill="${P.g}" stroke="#140c24" stroke-width="1"/><path d="M0 -144L0 -120L-6 -132Z" fill="#fff" opacity=".6"/></g><ellipse cx="0" cy="-132" rx="20" ry="5" fill="none" stroke="${P.g}" stroke-width="1.2" opacity=".7" class="avring"/>`;
  /* bannières */
  s+=[-30,30].map(x=>`<path d="M${x-5} -20h10v18l-5 -4l-5 4Z" fill="${o==='ange'?'#ffd84a':o==='demon'?'#7a1aaa':'#5a7ad0'}" ${OL}/>`).join('')+avEmblem(o||null,-30,-12,.38)+avEmblem(o||null,30,-12,.38);
  return s}
function avMap(){const T=avTotals(),ph=avPhase(),me=avMyFac(),cnt=avCount(),cap=avCapOwner(),capN=avCapNet();
  let s=`<svg class="avmap" viewBox="0 0 340 360" role="img" aria-label="Champ de bataille"><defs><linearGradient id="avbg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2c8"/><stop offset=".42" stop-color="#c8a8e8"/><stop offset=".58" stop-color="#4a1a6a"/><stop offset="1" stop-color="#14041e"/></linearGradient><radialGradient id="avcap"><stop offset="0" stop-color="#fff" stop-opacity=".9"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs><rect width="340" height="360" rx="22" fill="url(#avbg)"/>`;
  s+=[[60,40,1.2],[120,18,.8],[26,130,.9]].map(([x,y,k])=>`<g opacity=".65" transform="translate(${x} ${y}) scale(${k})"><ellipse cx="0" cy="0" rx="22" ry="8" fill="#fff"/><circle cx="-8" cy="-4" r="8" fill="#fff"/><circle cx="5" cy="-7" r="10" fill="#fff"/></g>`).join('')+`<path d="M230 360Q250 310 280 320Q300 270 340 290V360Z" fill="#0c0214" opacity=".8"/><path d="M296 30l-8 20h7l-6 18l16 -24h-8l6 -14z" fill="#c070ff" opacity=".8"/>`;
  const C=[170,182];for(const t of AVTER)s+=`<path d="M${C[0]} ${C[1]}L${t.x} ${t.y+8}" stroke="#d8c8a0" stroke-width="6" stroke-linecap="round" opacity=".45"/><path d="M${C[0]} ${C[1]}L${t.x} ${t.y+8}" stroke="#8a7a5a" stroke-width="1.4" stroke-dasharray="3 5" opacity=".7"/>`;
  s+=`<circle cx="${C[0]}" cy="${C[1]-20}" r="70" fill="url(#avcap)" opacity=".5"/><g transform="translate(${C[0]} ${C[1]+16}) scale(.74)">${avCitadel(cap)}</g>`;
  for(const t of AVTER){const o=avOwner(t.k),v=avNet(t.k),can=ph==='war'&&me,p=Math.min(1,Math.abs(v)/100),L=2*Math.PI*30;
    s+=`<g class="avter ${can?'go':''}" ${can?`data-a="avatk" data-v="${t.k}" role="button" tabindex="0"`:''} aria-label="${t.n}"><g transform="translate(${t.x} ${t.y+10})">${avTown(t,o)}</g>`;
    if(ph==='war'||ph==='end')s+=`<circle cx="${t.x}" cy="${t.y+2}" r="30" fill="none" stroke="${v>0?'#ffd84a':'#c03aff'}" stroke-width="3" stroke-dasharray="${(L*p).toFixed(1)} ${L.toFixed(1)}" transform="rotate(-90 ${t.x} ${t.y+2})" opacity="${o?1:.7}"/>`;
    s+=avEmblem(o,t.x,t.y-26,.62)+`<text x="${t.x}" y="${t.y+30}" text-anchor="middle" font-size="9.5" font-weight="900" fill="#fff" stroke="#140c24" stroke-width="2.6" paint-order="stroke" font-family="Nunito,sans-serif">${t.n}</text></g>`}
  const hc=cap==='ange'?'#ffd84a':cap==='demon'?'#e090ff':'#fff';
  s+=`<text x="${C[0]}" y="${C[1]+58}" text-anchor="middle" font-size="11" font-weight="900" fill="#fff" stroke="#140c24" stroke-width="3" paint-order="stroke" font-family="Nunito,sans-serif">CAPITALE D'ÉTHER</text><text x="${C[0]}" y="${C[1]+71}" text-anchor="middle" font-size="9.5" font-weight="900" fill="${hc}" stroke="#140c24" stroke-width="2.6" paint-order="stroke" font-family="Nunito,sans-serif">${cap?(ph==='end'?'Prise par les ':'Tenue par les ')+AVF[cap].n:ph==='war'&&Math.abs(capN)>0?`Siège ${AVF[capN>0?'ange':'demon'].n} : ${Math.min(99,Math.abs(capN))} %`:'Neutre · 5 royaumes requis'}</text>`;
  s+=`<g transform="translate(14 344)"><text font-size="10.5" font-weight="900" font-family="Nunito,sans-serif" fill="#fff" stroke="#140c24" stroke-width="2.6" paint-order="stroke">😇 ${cnt.ange}/8 royaumes</text></g><g transform="translate(326 344)"><text text-anchor="end" font-size="10.5" font-weight="900" font-family="Nunito,sans-serif" fill="#fff" stroke="#140c24" stroke-width="2.6" paint-order="stroke">${cnt.demon}/8 royaumes 😈</text></g></svg>`;
  return s}
/* ---- assauts : royaumes et capitale ---- */
function avAssault(terr){const f=avMyFac(),A=AVS();if(avPhase()!=='war'||!f)return;const d=today();if(A.ad.d!==d)A.ad={d,n:0};if(A.ad.n>=5)return toast("Plus d'assaut aujourd'hui (5 par jour). Reviens demain !");
  const isCap=terr==='capitale';if(isCap&&avCount()[f]<5)return toast(`Il faut au moins 5 royaumes sur 8 pour assiéger la capitale (vous en avez ${avCount()[f]}).`);
  const o=avOpp();if(!o)return toast('Aucun ennemi à ta portée pour le moment.');const tm=teamOfRow(o);if(!tm.length)return;A.ad.n++;save();
  const base=tm.reduce((a,t)=>a+basePow(HEROES[t.id],t.l,t.e),0)||1,fx=clamp(o.pw/base*(isCap?1.2:1),.6,3);const foes=tm.map((t,k)=>arenaUnit(t,k,fx));
  const T=isCap?{k:'capitale',n:"Capitale d'Éther"}:(AVTER.find(x=>x.k===terr)||AVTER[0]);
  avStart({foes,title:`${isCap?'Siège':'Assaut'} · ${T.n}`,sub:`${AVF[AVF[f].foe].ic} ${esc(o.n)} défend (${AVF[AVF[f].foe].n})`,maxR:20,wc:f==='ange'?48:290},f==='ange'?85:75,{k:'atk',terr:T.k,f,opw:o.pw*(isCap?1.2:1),on:o.n,cap:isCap})}
function avFinish(win,rw){const A=AVS(),t=B.av,f=t.f;let title;
  if(t.k==='lv'){if(win){title='Victoire !';if(t.n>A.lv){A.lv=t.n;const R=AVRW[t.n-1];R.g(f);rw.push('🎁 '+R.t);const p=avLvPts(t.n);avAddPts(p);rw.push(`${AVF[f].ic} +${fmt(p)} points de faction`)}else rw.push('Niveau déjà terminé : pas de nouvelle récompense.')}else{title='Défaite';rw.push('Renforce ton équipe et retente ta chance !')}}
  else{const tp=teamPower(),before=t.cap?avCapOwner():avOwner(t.terr);const p=win?Math.round((120+Math.min(2.2,t.opw/Math.max(1,tp))*140)*(t.cap?1.6:1)):15;
    if(win)avAddPts(p,t.cap?null:t.terr,t.cap);else avAddPts(p);title=win?(t.cap?'Brèche dans la capitale !':'Assaut réussi !'):(t.cap?'Siège repoussé':'Assaut repoussé');rw.push(`${AVF[f].ic} +${fmt(p)} points de faction`);
    if(win){S.gold+=3000;rw.push(GOLD+'3 000 or');const now=t.cap?avCapOwner():avOwner(t.terr),nm=t.cap?"la Capitale d'Éther":(AVTER.find(x=>x.k===t.terr)||{}).n;
      if(now===f&&before!==f){rw.push(`🏰 ${nm} passe aux ${AVF[f].n} !`);try{news(Date.now(),`${S.name||'Voyageur'} a fait tomber ${nm} pour les ${AVF[f].n} !`)}catch(e){}}
      else if(!t.cap){const v=Math.abs(avNet(t.terr));rw.push(`⚑ ${nm} : ${now?'tenu par les '+AVF[now].n:'contrôle '+Math.min(99,v)+' %'}`)}else rw.push(`⚑ Siège : ${Math.min(99,Math.abs(avCapNet()))} %`)}}
  avCheckMs();save();return title}
/* ---- cartes de guerre : bouton de siège et règles à jour ---- */
{const wc=avWarCards;avWarCards=function(){let h=wc.apply(this,arguments);const f=avMyFac(),c=avCount(),can=c[f]>=5;
  const sieg=`<div class="avsiege ${can?'ok':''}"><div><b>🏰 Capitale d'Éther</b><small>${can?`Vos ${c[f]} royaumes vous ouvrent la capitale : assiégez-la pour la prendre !`:`Il faut au moins 5 royaumes sur 8 pour l'assiéger (vous en avez ${c[f]}).`}</small></div><button class="btn ${can?'p':''}" data-a="avatk" data-v="capitale" ${can?'':'disabled'}>⚔️ Assiéger</button></div>`;
  h=h.replace(/Touche un territoire pour lancer un assaut[^<]*/,`Les 8 royaumes commencent neutres. Touche un royaume pour lancer un assaut contre un joueur ${AVF[AVF[f].foe].n.toLowerCase()} : chaque victoire fait avancer le contrôle de ta faction (anneau de couleur). À 100 %, le royaume passe sous votre bannière. Avec 5 royaumes sur 8, vous pouvez assiéger la capitale.`);
  return h.replace('</svg></div>','</svg>'+sieg+'</div>')}}
window.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;if(t.dataset.a!=='avcap')return;e.stopImmediatePropagation();e.preventDefault();
  const A=AVS(),f=avMyFac();if(A.cap||avPhase()!=='end'||!f)return;A.cap=true;const won=avWinner()===f;if(won){avFrame('capitale');S.gems+=500;S.ush=(S.ush||0)+3;toast("👑 La capitale est à vous ! +500 gemmes, 3 éclats d'ultra et le cadre « Conquérant de la Capitale »")}else{S.gems+=150;S.shards+=1;toast('Récompense de participation : +150 gemmes et 1 éclat légendaire')}save();render()},true);
{const ap=avPage;avPage=function(){let h=ap.apply(this,arguments);
  h=h.replace(/<li><b>Dès 13 h et pendant 7 jours<\/b>[\s\S]*?<\/li><li><b>À la fin<\/b>[\s\S]*?<\/li>/,`<li><b>Dès 13 h et pendant 7 jours</b> : les 8 royaumes autour de la capitale sont <b>neutres</b>. Lance des assauts (5 par jour, PvP contre l'autre faction) pour faire avancer le contrôle de ta faction : à 100 %, le royaume est à vous.</li><li><b>Avec 5 royaumes sur 8</b>, ta faction peut <b>assiéger la Capitale d'Éther</b>. À 100 % de siège, la capitale tombe.</li><li><b>À la fin</b> : la faction qui tient la capitale gagne. Si personne ne la tient, c'est celle qui a le plus de royaumes, puis le plus de points.</li><li>En plus : 15 niveaux exclusifs à ta faction et des paliers de points personnels.</li>`);
  if(avPhase()==='end'){const w=avWinner(),T=avTotals();h=h.replace(/<div class="h" style="margin:0">👑 Les [^<]*<\/div>/,`<div class="h" style="margin:0">👑 Les ${AVF[w].n} ${avCapOwner()?'ont pris la capitale':'remportent la guerre'} !</div>`)}
  h=h.replace("8 territoires entourent la Capitale d'Éther. Ils s'ouvriront aux assauts demain à 13 h.","8 royaumes neutres entourent la Capitale d'Éther. Ils s'ouvriront aux assauts demain à 13 h : il en faudra 5 pour pouvoir assiéger la capitale.");
  return h}}
/* ---- chargement : musique automatique (si le téléphone l'autorise) et bruits de bataille discrets ---- */
(function(){try{if(BOOT.done)return;if(auInit()&&AU.ctx){const go=()=>{if(AU.ctx.state==='running'&&!AU.started){AU.started=true;musicWant(pageTheme())}if(AU.ctx.state==='running'){const s=document.getElementById('b2snd');if(s)s.hidden=true}};
    const p=AU.ctx.resume();if(p&&p.then)p.then(go).catch(()=>{});setTimeout(go,300);AU.ctx.onstatechange=go}}catch(e){}})();
(function(){let n=0,g=null;const tick=()=>{if(BOOT.done)return;try{if(AU.ok&&AU.started&&AU.ctx.state==='running'&&!(S.opt&&S.opt.mute)){const c=AU.ctx;if(!g){g=c.createGain();g.gain.value=.22;g.connect(AU.F.v)}const t=c.currentTime+.02;n++;
      if(n%2){SND.slash(g,t);SND.thud(g,t+.08,.35)}else{SND.zap(g,t);try{SND.chime(g,t+.12)}catch(e){}}if(n%3===0)try{SND.boom(g,t+.25)}catch(e){}}}catch(e){}
    let wait=2400;try{const el=document.querySelector('.b2clash i');const an=el&&el.getAnimations&&el.getAnimations()[0];if(an&&an.currentTime!=null){const ph=an.currentTime%2400;wait=(1200-ph+2400)%2400||2400}}catch(e){}setTimeout(tick,Math.max(300,wait))};setTimeout(tick,1200)})();
