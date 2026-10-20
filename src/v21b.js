
/* ================= V21 : bâtiments redessinés (formes arrondies, lumières, matières) ================= */
const LZD=`<defs><linearGradient id="lzSh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffffff" stop-opacity=".22"/><stop offset=".45" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".3"/></linearGradient>
<linearGradient id="lzShV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".28"/><stop offset=".5" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".25"/></linearGradient>
<linearGradient id="lzCyl" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000000" stop-opacity=".35"/><stop offset=".3" stop-color="#ffffff" stop-opacity=".28"/><stop offset=".55" stop-color="#ffffff" stop-opacity="0"/><stop offset="1" stop-color="#000000" stop-opacity=".42"/></linearGradient>
<radialGradient id="lzGlow" cx=".5" cy=".6" r=".65"><stop offset="0" stop-color="#fff6c0"/><stop offset=".55" stop-color="#ffd84a"/><stop offset="1" stop-color="#ff9a2a"/></radialGradient>
<radialGradient id="lzHalo"><stop offset="0" stop-color="#ffe680" stop-opacity=".6"/><stop offset="1" stop-color="#ffe680" stop-opacity="0"/></radialGradient>
<radialGradient id="lzFire" cx=".5" cy=".8" r=".8"><stop offset="0" stop-color="#fff6c0"/><stop offset=".35" stop-color="#ffb03a"/><stop offset=".75" stop-color="#ff6a1a"/><stop offset="1" stop-color="#3a0a06"/></radialGradient>
<radialGradient id="lzMouth" cx=".5" cy=".75" r=".7"><stop offset="0" stop-color="#5a1010"/><stop offset="1" stop-color="#0a0410"/></radialGradient>
<linearGradient id="lzGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff3b0"/><stop offset=".45" stop-color="#ffd84a"/><stop offset="1" stop-color="#b8780a"/></linearGradient>
<linearGradient id="lzSilver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#d0d8e4"/><stop offset="1" stop-color="#7a8698"/></linearGradient>
<linearGradient id="lzBronze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffd8a8"/><stop offset=".5" stop-color="#d08a4a"/><stop offset="1" stop-color="#7a4418"/></linearGradient>
<linearGradient id="lzWood" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#b07a48"/><stop offset="1" stop-color="#5e3a1c"/></linearGradient>
<linearGradient id="lzWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#bff6ff"/><stop offset="1" stop-color="#3a8ad8"/></linearGradient>
<linearGradient id="lzCrys" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".5" stop-color="#9af0ff"/><stop offset="1" stop-color="#5a6aff"/></linearGradient>
<pattern id="lzTile" width="8" height="6" patternUnits="userSpaceOnUse"><path d="M0 6Q2 2 4 6Q6 2 8 6" fill="none" stroke="#000000" stroke-opacity=".22" stroke-width="1"/></pattern>
<pattern id="lzBrick" width="12" height="8" patternUnits="userSpaceOnUse"><path d="M0 .5H12M0 4.5H12M3 .5V4.5M9 4.5V8.5" fill="none" stroke="#000000" stroke-opacity=".16" stroke-width=".8"/></pattern>
<pattern id="lzPlank" width="5" height="10" patternUnits="userSpaceOnUse"><path d="M.5 0V10" stroke="#000000" stroke-opacity=".22" stroke-width=".7"/></pattern></defs>`;
const OL=`stroke="${LBO}" stroke-width="1.3" stroke-linejoin="round" stroke-linecap="round"`;
const zF=(d,f,x='')=>`<path d="${d}" fill="${f}" ${OL} ${x}/>`;
const zO=(d,f)=>`<path d="${d}" fill="${f}"/>`;
const zMat=(d,f,pat,shade='lzSh')=>zF(d,f)+(pat?zO(d,`url(#${pat})`):'')+(shade?zO(d,`url(#${shade})`):'');
const zWin=(x,y,w,h,c='url(#lzGlow)')=>`<path d="M${x} ${y+h}V${y+w/2}A${w/2} ${w/2} 0 0 1 ${x+w} ${y+w/2}V${y+h}Z" fill="${c}" stroke="#4a2e1a" stroke-width="1.5"/><path d="M${x+w/2} ${y+1.5}V${y+h}M${x+.5} ${y+h*.62}H${x+w-.5}" stroke="#4a2e1a" stroke-width=".9"/><rect x="${x-1.6}" y="${y+h-.4}" width="${w+3.2}" height="2.6" rx="1.2" fill="#ece0c8" stroke="${LBO}" stroke-width=".8"/>`;
const zRound=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#lzGlow)" stroke="#4a2e1a" stroke-width="1.4"/><path d="M${x-r} ${y}H${x+r}M${x} ${y-r}V${y+r}" stroke="#4a2e1a" stroke-width=".9"/>`;
const zDoor=(x,w,h,c='url(#lzWood)')=>{const L=x-w/2,R=x+w/2;return`<path d="M${L} 0V${-h+w/2}A${w/2} ${w/2} 0 0 1 ${R} ${-h+w/2}V0Z" fill="${c}" ${OL}/><path d="M${L} 0V${-h+w/2}A${w/2} ${w/2} 0 0 1 ${R} ${-h+w/2}V0Z" fill="url(#lzPlank)"/><circle cx="${R-3}" cy="${-h*.42}" r="1.3" fill="#ffd84a" stroke="${LBO}" stroke-width=".5"/><path d="M${L-2} 0H${R+2}" stroke="#8a8090" stroke-width="2.4"/>`};
const zFlow=(x,y,w)=>{let s=`<rect x="${x}" y="${y}" width="${w}" height="3.4" rx="1" fill="#8a5a2a" stroke="${LBO}" stroke-width=".7"/>`;for(let i=0;i<4;i++)s+=`<circle cx="${(x+1.5+i*(w-3)/3).toFixed(1)}" cy="${y-.6}" r="1.8" fill="${['#ff6a8a','#ffd84a','#ff8ac0','#b77dff'][i]}"/>`;return s+`<path d="M${x+1} ${y}q1 -2 2 0M${x+w-3} ${y}q1 -2 2 0" stroke="#3a8a3a" stroke-width="1" fill="none"/>`};
const zSmoke=(x,y)=>[[0,0,3.2,.55],[3,-6,4.2,.45],[7,-13,5.4,.32],[12,-21,6.4,.2]].map(([dx,dy,r,o])=>`<circle cx="${x+dx}" cy="${y+dy}" r="${r}" fill="#d8d4e4" opacity="${o}"/>`).join('');
const zFlag=(x,y,c,h=12)=>`<path d="M${x} ${y}V${y-h}" stroke="${LBO}" stroke-width="1.4"/><path d="M${x} ${y-h}Q${x+6} ${y-h-2} ${x+11} ${y-h+1}Q${x+8} ${y-h+3} ${x+11} ${y-h+6}Q${x+6} ${y-h+4} ${x} ${y-h+5}Z" fill="${c}" stroke="${LBO}" stroke-width=".9"/><circle cx="${x}" cy="${y-h-1}" r="1.4" fill="#ffd84a"/>`;
const zLantern=(x,y,c='#ffb03a')=>`<circle cx="${x}" cy="${y}" r="7" fill="url(#lzHalo)"/><path d="M${x} ${y-5}V${y-3}" stroke="${LBO}" stroke-width=".8"/><ellipse cx="${x}" cy="${y}" rx="2.6" ry="3.4" fill="${c}" stroke="${LBO}" stroke-width=".8"/>`;
const zRoof=(L,R,y,rh,f,over=8)=>{const c=(L+R)/2,d=`M${L-over} ${y+3}Q${L-over*.25} ${y-rh*.42} ${c-3} ${y-rh}Q${c} ${y-rh-2} ${c+3} ${y-rh}Q${R+over*.25} ${y-rh*.42} ${R+over} ${y+3}Q${c} ${y-4} ${L-over} ${y+3}Z`;return zMat(d,f,'lzTile')+`<path d="M${L-over+2} ${y+1.5}Q${c} ${y-5} ${R+over-2} ${y+1.5}" fill="none" stroke="#ffffff" stroke-opacity=".3" stroke-width="1.4"/>`};
const zCone=(x,y,w,rh,f)=>{const L=x-w/2-4,R=x+w/2+4,d=`M${L} ${y+1}Q${x-w*.12} ${y-rh*.45} ${x} ${y-rh}Q${x+w*.12} ${y-rh*.45} ${R} ${y+1}Q${x} ${y-3} ${L} ${y+1}Z`;return zMat(d,f,'lzTile','lzCyl')};

LB.house=(o={})=>{const w=o.w||64,h=o.h||40,W=o.wall||'#efdcb4',Rf=o.roof||'#c0503c',rh=w*.42,L=-w/2,R=w/2;let s='';
  if(!o.noChim)s+=zMat(`M${R-17} ${-h-rh*.3}V${-h-rh*.95}h10V${-h-rh*.2}Z`,'#a89c9c','lzBrick')+`<rect x="${R-18.5}" y="${-h-rh*.95-3}" width="13" height="4" rx="1.6" fill="#7a6e72" ${OL}/>`+zSmoke(R-12,-h-rh*.95-7);
  s+=zF(`M${L} 0V${-h}H${R}V0Z`,W);
  s+=`<path d="M${L+2} ${-h+1}V-6M${R-2} ${-h+1}V-6M${L+2} ${(-h*.56).toFixed(1)}H${R-2}M${L+2} ${-h+2}L${(L+w*.2).toFixed(1)} ${(-h*.56).toFixed(1)}M${R-2} ${-h+2}L${(R-w*.2).toFixed(1)} ${(-h*.56).toFixed(1)}" stroke="#6a4428" stroke-width="2.2" stroke-linecap="round" fill="none"/>`;
  s+=zMat(`M${L} 0V-6.5H${R}V0Z`,'#b4aab8','lzBrick',null)+zO(`M${L} 0V${-h}H${R}V0Z`,'url(#lzSh)');
  s+=zWin(L+6.5,-h+7,10,12)+zWin(R-16.5,-h+7,10,12)+zFlow(L+5.5,-h+19.6,12)+zFlow(R-17.5,-h+19.6,12)+zDoor(o.doorX||0,14,22);
  s+=zRoof(L,R,-h,rh,Rf)+zRound(0,(-h-rh*.42).toFixed(1),4);
  return s+(o.extra||'')};
LB.tavern=()=>LB.house({w:72,wall:'#e8cfa0',roof:'#8a3a2a',extra:`<path d="M-44 -30H-30" stroke="#5a3a1a" stroke-width="2"/><path d="M-40 -30V-26M-34 -30V-26" stroke="${LBO}" stroke-width=".8"/><rect x="-45" y="-26" width="16" height="12" rx="2" fill="url(#lzWood)" ${OL}/><path d="M-41 -23h6v6h-6zM-35 -22q2.5 0 2.5 2.5t-2.5 2.5" fill="#ffd84a" stroke="${LBO}" stroke-width=".8"/><rect x="-41" y="-24" width="6" height="2" fill="#ffffff"/>${[[27,-3],[36,-3]].map(([x,y])=>`<g transform="translate(${x} ${y})"><path d="M-4 0Q-5 -5 -4 -10H4Q5 -5 4 0Z" fill="url(#lzWood)" ${OL}/><path d="M-4.6 -3H4.6M-4.6 -7H4.6" stroke="#4a4a5a" stroke-width="1.1"/></g>`).join('')}`});
LB.shop=()=>LB.house({w:64,wall:'#f4e2b8',roof:'#2a8a7a',extra:`<path d="M-26 -28H26L22 -20Q17 -16 13 -20Q8.7 -16 4.3 -20Q0 -16 -4.3 -20Q-8.7 -16 -13 -20Q-17 -16 -22 -20Z" fill="#d1263b" ${OL}/>${[-17.4,-4.3,8.7].map(x=>`<path d="M${x} -28H${x+6.5}L${x+5} -19.5Q${x+3} -17.5 ${x+1} -19.5Z" fill="#fff6e0"/>`).join('')}<g transform="translate(0 -46)"><circle r="7.5" fill="url(#lzGold)" ${OL}/><text y="3.4" text-anchor="middle" font-size="9" font-weight="900" font-family="Arial,sans-serif" fill="#7a4a06">$</text></g>`});
LB.castle=(c='#c4bfd8')=>{let s='';
  const tower=(x,top,w=22,roof='#4a5aa8',fl=true)=>{const L=x-w/2,R=x+w/2;let t=zMat(`M${L} 0V${top}H${R}V0Z`,c,'lzBrick','lzCyl');
    t+=zMat(`M${L-2} ${top+4}H${R+2}V${top}H${L-2}Z`,'#a8a2c0',null,'lzCyl');
    t+=zCone(x,top,w,w*1.05,roof)+(fl?zFlag(x,top-w*1.05+1,'#d1263b',11):`<circle cx="${x}" cy="${top-w*1.05}" r="2.4" fill="url(#lzGold)" ${OL}/>`);
    return t+zWin(x-3,top+11,6,10)+zWin(x-3,top+30,6,10)};
  let mer='';for(let i=0;i<7;i++){const x=-34+i*11.33;mer+=`M${x.toFixed(1)} -44V-49Q${(x+2.8).toFixed(1)} -51.5 ${(x+5.6).toFixed(1)} -49V-44`}
  s+=zMat(`M-34 0V-44H34V0Z`,c,'lzBrick')+zF(`${mer}Z`,c)+zO(`M-34 0V-44H34V0Z`,'url(#lzShV)');
  s+=tower(-42,-58)+tower(42,-58);
  s+=zMat(`M-15 -38V-62H15V-38Z`,'#d0cce2','lzBrick','lzCyl')+zCone(0,-62,30,27,'#3a4a9a')+`<circle cx="0" cy="-90" r="3" fill="url(#lzGold)" ${OL}/>`+zWin(-4,-58,8,12);
  for(const x of[-24,24])s+=`<path d="M${x-5} -40H${x+5}V-22L${x} -26L${x-5} -22Z" fill="#b8243a" ${OL}/><circle cx="${x}" cy="-33" r="2.6" fill="url(#lzGold)" stroke="${LBO}" stroke-width=".6"/>`;
  s+=`<path d="M-12 0V-17A12 12 0 0 1 12 -17V0Z" fill="#1e1428" ${OL}/>`+[-7,-2.5,2,6.5].map(x=>`<path d="M${x} -1V${-17-Math.sqrt(Math.max(0,144-x*x))+12}" stroke="#7a7488" stroke-width="1.2"/>`).join('')+`<path d="M-11 -9H11M-11 -15H11" stroke="#7a7488" stroke-width="1"/><path d="M-14 0V-18A14 14 0 0 1 14 -18V0" fill="none" stroke="#9a94b0" stroke-width="2.6"/>`;
  s+=[[-52,-6,4],[-46,-12,3.4],[-50,-18,3],[-31,-4,3.2]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#4a9a4a" stroke="${LBO}" stroke-width=".7"/>`).join('');
  return s};
LB.coliseum=()=>{let s='';const out=`M-62 -2L-62 -44Q0 -62 62 -44L62 -2Q0 8 -62 -2Z`;
  s+=zMat(out,'#e6c896','lzBrick','lzCyl');
  for(let r=0;r<2;r++)for(let k=0;k<9;k++){const x=-56+k*14,b=5*(1-Math.pow(x/62,2)),y=-8-r*17+b-(r?2.5*(1-Math.pow(x/62,2)):0);
    s+=`<path d="M${(x-4.5).toFixed(1)} ${y.toFixed(1)}V${(y-7).toFixed(1)}A4.5 4.5 0 0 1 ${(x+4.5).toFixed(1)} ${(y-7).toFixed(1)}V${y.toFixed(1)}Z" fill="#5a3418" stroke="${LBO}" stroke-width=".9"/><path d="M${(x-3).toFixed(1)} ${(y-7).toFixed(1)}A3 3 0 0 1 ${(x+1).toFixed(1)} ${(y-9.5).toFixed(1)}" stroke="#ffd08a" stroke-opacity=".5" stroke-width=".9" fill="none"/>`}
  s+=zMat(`M-63 -44Q0 -62 63 -44L63 -40Q0 -57 -63 -40Z`,'#c8a070',null,'lzCyl');
  for(const [x,c] of[[-46,'#ff5d6c'],[-16,'#ffd84a'],[16,'#58e4d3'],[46,'#ff5d6c']]){const y=-47-15*(1-Math.pow(x/62,2));s+=zFlag(x,y.toFixed(1),c,12)}
  s+=`<path d="M-12 4V-14A12 12 0 0 1 12 -14V4Q0 6 -12 4Z" fill="#2a1408" ${OL}/><path d="M-9 4V-13A9 9 0 0 1 9 -13V4" fill="none" stroke="url(#lzGold)" stroke-width="2"/>`;
  return s};
LB.cave=()=>{let s='';const m=`M-74 0Q-66 -30 -48 -50Q-40 -60 -30 -50Q-18 -76 0 -84Q14 -80 22 -58Q32 -68 44 -60Q62 -40 74 0Z`;
  s+=zMat(m,'#6e6490',null,'lzSh')+`<path d="M0 -84Q-8 -78 -12 -68Q-4 -72 2 -66Q8 -74 14 -76Q8 -82 0 -84Z" fill="#f4f0ff" opacity=".9"/><path d="M-30 -50Q-36 -46 -38 -40Q-32 -44 -28 -42Z" fill="#f4f0ff" opacity=".8"/>`;
  s+=[[-54,-24,7],[-42,-36,5],[46,-30,6],[56,-16,7]].map(([x,y,r])=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.55}" fill="#5a8a4a" opacity=".85"/>`).join('');
  s+=`<path d="M-30 0Q-32 -38 0 -44Q32 -38 30 0Z" fill="url(#lzMouth)" ${OL}/>`+[-18,-9,0,9,18].map((x,i)=>`<path d="M${x-3.5} ${-38+Math.abs(x)*.2}L${x} ${-28+(i%2)*4+Math.abs(x)*.2}L${x+3.5} ${-38+Math.abs(x)*.2}Z" fill="#c8c0d8" stroke="${LBO}" stroke-width=".7"/>`).join('');
  s+=`<ellipse cx="-8" cy="-20" rx="4.2" ry="2.4" fill="#ff3a3a"/><ellipse cx="8" cy="-20" rx="4.2" ry="2.4" fill="#ff3a3a"/><ellipse cx="0" cy="-18" rx="22" ry="12" fill="#ff3a1a" opacity=".12"/>`;
  for(const x of[-38,38])s+=`<path d="M${x} 0V-16" stroke="#5a3a1a" stroke-width="2.4"/><circle cx="${x}" cy="-20" r="10" fill="url(#lzHalo)"/><path d="M${x-3.5} -16Q${x-4} -22 ${x} -27Q${x+4} -22 ${x+3.5} -16Z" fill="url(#lzFire)" stroke="${LBO}" stroke-width=".7"/>`;
  s+=[[-58,-2,8],[60,-2,7],[-24,1,4]].map(([x,y,r])=>`<path d="M${x-r} ${y}Q${x-r} ${y-r} ${x} ${y-r*1.1}Q${x+r} ${y-r} ${x+r} ${y}Z" fill="#8a80a4" ${OL}/>`).join('');
  return s};
LB.tower=()=>{let s='';const body=`M-20 0L-12 -126H12L20 0Z`;s+=zMat(body,'#3a2c80','lzBrick','lzCyl');
  for(let i=1;i<7;i++){const y=-i*18,w=20-i*1.14;s+=`<path d="M${-w-1} ${y}Q0 ${y+3} ${w+1} ${y}" fill="none" stroke="url(#lzGold)" stroke-width="2"/>`}
  for(let i=0;i<6;i++){const y=-12-i*18,c=i%2?'#9af0ff':'url(#lzGlow)';s+=zWin(-2.6,y-6,5.2,9,c)}
  let d='M-17 -6';for(let i=1;i<=40;i++){const t=i/40,y=-6-t*118,w=17-t*8;d+=`L${(Math.sin(t*Math.PI*6)*w).toFixed(1)} ${y.toFixed(1)}`}
  s+=`<path d="${d}" fill="none" stroke="#9af0ff" stroke-width="2.4" opacity=".55"/><path d="${d}" fill="none" stroke="#ffffff" stroke-width=".7" opacity=".85"/>`;
  s+=zMat(`M-16 -126H16L13 -120H-13Z`,'#5a4ab0',null,'lzCyl')+`<circle cx="0" cy="-138" r="15" fill="url(#lzHalo)"/><path d="M0 -150L7 -138L0 -126L-7 -138Z" fill="url(#lzCrys)" ${OL}/><path d="M0 -150L2.5 -138L0 -130Z" fill="#ffffff" opacity=".8"/>`;
  s+=`<path d="M-9 -138C-9 -144 -2 -144 0 -138C2 -132 9 -132 9 -138C9 -144 2 -144 0 -138C-2 -132 -9 -132 -9 -138Z" fill="none" stroke="#ffe680" stroke-width="1.6" transform="translate(0 -1) scale(1.25 .5) translate(0 -138)"/>`;
  return s+zDoor(0,10,15)};
LB.tent=(c1='#d1263b',c2='#fff6e0')=>{let s='';
  s+=zF(`M-38 0V-24H38V0Z`,c2)+[-30,-15,0,15].map((x,i)=>`<path d="M${x-.5} 0V-24H${x+8}V0Z" fill="${c1}"/>`).join('')+zO(`M-38 0V-24H38V0Z`,'url(#lzSh)');
  const can=`M-46 -22Q-26 -40 -2 -68Q0 -71 2 -68Q26 -40 46 -22Q38 -16 30.7 -22Q23 -16 15.3 -22Q7.7 -16 0 -22Q-7.7 -16 -15.3 -22Q-23 -16 -30.7 -22Q-38 -16 -46 -22Z`;
  s+=zF(can,c2);for(const x of[-38.3,-23,-7.7,7.6,23])s+=`<path d="M0 -68Q${(x*.3).toFixed(1)} -44 ${x.toFixed(1)} -20Q${(x+3.8).toFixed(1)} -16 ${(x+7.7).toFixed(1)} -22Q${((x+7.7)*.3).toFixed(1)} -44 0 -68Z" fill="${c1}"/>`;
  s+=zO(can,'url(#lzSh)')+`<path d="M-9 0Q-9 -16 0 -22Q9 -16 9 0Z" fill="#2a1030" ${OL}/><path d="M-9 0Q-9 -16 0 -22Q9 -16 9 0" fill="none" stroke="url(#lzGold)" stroke-width="1.6"/>`;
  s+=zFlag(0,-68,'#ffd84a',14)+`<path d="M-46 -22L-56 0M46 -22L56 0" stroke="${LBO}" stroke-width="1"/>`+[-52,52].map(x=>[0,1,2].map(k=>`<path d="M${x+(x<0?k*3:-k*3)} ${-17+k*6}l2 4l2 -4z" fill="${['#ffd84a','#58e4d3','#ff5d6c'][k]}"/>`).join('')).join('');
  return s};
LB.casino=()=>{let s='';
  s+=zMat(`M-40 0V-44H40V0Z`,'#6a0a22',null,'lzShV');
  s+=`<path d="M-14 -44Q-14 -64 0 -66Q14 -64 14 -44Z" fill="url(#lzGold)" ${OL}/>`+[-7,0,7].map(x=>`<path d="M${x} -45Q${x*.6} -58 0 -65" fill="none" stroke="#b8780a" stroke-width=".9"/>`).join('')+`<path d="M0 -66V-72" stroke="${LBO}" stroke-width="1.2"/><path d="M0 -77l1.6 3.2 3.5.4-2.6 2.4.7 3.4-3.2-1.8-3.2 1.8.7-3.4-2.6-2.4 3.5-.4z" fill="#ffd84a" stroke="${LBO}" stroke-width=".6"/>`;
  s+=zF(`M-44 -44H44V-54Q0 -58 -44 -54Z`,'#2a0612');let b='';for(let x=-40;x<=40;x+=8)b+=`<circle cx="${x}" cy="-55" r="1.9" fill="${Math.round(x/8)%2?'#ffd84a':'#fff6c0'}"/>`;s+=b;
  s+=`<text x="0" y="-46.5" text-anchor="middle" font-family="'Lilita One',sans-serif" font-size="9" fill="#ffd84a" stroke="${LBO}" stroke-width=".5">CASINO</text>`;
  for(const x of[-32,-18,18,32])s+=zMat(`M${x-2.6} -1V-42H${x+2.6}V-1Z`,'url(#lzGold)',null,'lzCyl')+`<rect x="${x-4}" y="-44" width="8" height="2.8" rx="1" fill="url(#lzGold)" ${OL}/>`;
  s+=zWin(-28,-34,7,13,'#ff6a8a')+zWin(21,-34,7,13,'#58e4d3')+`<path d="M-10 0V-20A10 10 0 0 1 10 -20V0Z" fill="url(#lzGold)" ${OL}/><path d="M0 0V-30" stroke="#b8780a" stroke-width="1"/><path d="M-14 4L-10 0H10L14 4Z" fill="#c8102e" ${OL}/>`;
  return s};
LB.manor=()=>{let s='';
  s+=zMat(`M-36 0V-46H36V0Z`,'#3e2c62','lzBrick');
  for(const x of[-24,24])s+=zF(`M${x-14} -44L${x} -76L${x+14} -44Z`,'#241a3a')+zO(`M${x-14} -44L${x} -76L${x+14} -44Z`,'url(#lzTile)')+zRound(x,-56,4.6);
  s+=zMat(`M-7 -46V-70H7V-46Z`,'#4a3878',null,'lzCyl')+zF(`M-10 -70L0 -94L10 -70Z`,'#1e1430')+`<circle cx="0" cy="-60" r="5" fill="#ff9a2a" ${OL}/><path d="M-5 -60H5M0 -65V-55" stroke="#4a1a10" stroke-width=".8"/>`;
  s+=zO(`M-36 0V-46H36V0Z`,'url(#lzSh)')+zWin(-30,-36,9,13,'#ff9a2a')+zWin(21,-36,9,13,'#ff9a2a')+zDoor(0,13,22,'#2a1a3a');
  for(const x of[-46,46])s+=`<g transform="translate(${x} -7)"><ellipse rx="10" ry="7.5" fill="#ff8a1a" ${OL}/><path d="M-4 -7Q0 -9 4 -7" stroke="#b8520a" fill="none"/><path d="M-5 -1l2 -3 2 3zM1 -1l2 -3 2 3zM-5 3Q0 6 5 3" fill="#ffe14a"/><rect x="-1" y="-11" width="2" height="4" fill="#3a6a2a"/></g>`;
  s+=[[-30,-86],[22,-92],[34,-80]].map(([x,y])=>`<path d="M${x} ${y}q-4 -4 -8 -1q3 0 4 2q1 -2 4 -1q3 -1 4 1q1 -2 4 -2q-4 -3 -8 1z" fill="#140c24"/>`).join('');
  return s};
LB.pavilion=()=>{let s='';
  s+=`<path d="M-40 0H40V-5Q0 -8 -40 -5Z" fill="#f4e8f0" ${OL}/>`;
  for(const x of[-32,-11,11,32])s+=zMat(`M${x-2.6} -4V-44H${x+2.6}V-4Z`,'#fff4f8',null,'lzCyl');
  s+=`<path d="M-36 -18H36" stroke="#e0a0c0" stroke-width="1.6"/>${[-28,-20,-4,4,20,28].map(x=>`<path d="M${x} -18V-6" stroke="#e0a0c0" stroke-width="1"/>`).join('')}`;
  const dome=`M-44 -44Q-40 -56 -22 -62Q-6 -66 0 -78Q6 -66 22 -62Q40 -56 44 -44Q0 -50 -44 -44Z`;s+=zMat(dome,'#ff8ac0','lzTile','lzCyl');
  s+=`<path d="M-44 -44Q-33 -38 -22 -44Q-11 -38 0 -44Q11 -38 22 -44Q33 -38 44 -44" fill="#ffd0e4" ${OL}/>${[-33,-11,11,33].map(x=>`<circle cx="${x}" cy="-40.5" r="2" fill="#ff5a90"/>`).join('')}<path d="M0 -78V-84" stroke="${LBO}"/><g transform="translate(0 -86) scale(.5)">${FRV2.A.heartL(5,'#ff4a7a')}</g><g transform="translate(0 -22) scale(.55)">${FRV2.A.ribbonL('#ff6aa8','#ffd0e4')}</g>`;
  return s};
LB.clock=()=>{let s='';s+=zMat(`M-16 0V-92H16V0Z`,'#9aa8c4','lzBrick','lzCyl')+zMat(`M-19 -88H19V-94H-19Z`,'#7a88a8',null,'lzCyl');
  s+=`<circle cx="0" cy="-72" r="13" fill="url(#lzGold)" ${OL}/><circle cx="0" cy="-72" r="10.4" fill="#fff8e6" stroke="${LBO}" stroke-width=".8"/>`+[...Array(12)].map((_,i)=>{const a=i/12*Math.PI*2;return`<path d="M${(Math.sin(a)*8.4).toFixed(1)} ${(-72-Math.cos(a)*8.4).toFixed(1)}L${(Math.sin(a)*9.8).toFixed(1)} ${(-72-Math.cos(a)*9.8).toFixed(1)}" stroke="${LBO}" stroke-width="${i%3?.8:1.6}"/>`}).join('')+`<path d="M0 -72V-79M0 -72L5 -69" stroke="${LBO}" stroke-width="1.6" stroke-linecap="round"/><circle cx="0" cy="-72" r="1.2" fill="#b8780a"/>`;
  s+=zF(`M-20 -94Q-14 -104 -6 -112Q-2 -122 0 -130Q2 -122 6 -112Q14 -104 20 -94Z`,'#3a4a8a')+zO(`M-20 -94Q-14 -104 -6 -112Q-2 -122 0 -130Q2 -122 6 -112Q14 -104 20 -94Z`,'url(#lzTile)')+zO(`M-20 -94Q-14 -104 -6 -112Q-2 -122 0 -130Q2 -122 6 -112Q14 -104 20 -94Z`,'url(#lzCyl)')+`<circle cx="0" cy="-131" r="2.6" fill="url(#lzGold)" ${OL}/>`;
  s+=zWin(-4,-50,8,12,'#58e4d3')+zWin(-4,-30,8,10)+zDoor(0,11,16)+`<path d="M8 -116l-4 6h3l-3 6 6 -8h-3l3 -4z" fill="#ffe04a" stroke="${LBO}" stroke-width=".6"/>`;
  return s};
LB.forge=()=>{let s='';
  s+=zMat(`M24 -30V-92H38V-30Z`,'#8a7e86','lzBrick','lzCyl')+`<rect x="22" y="-96" width="18" height="5" rx="2" fill="#6a5e66" ${OL}/><ellipse cx="31" cy="-96" rx="6" ry="2" fill="#ff8a1a"/>`+zSmoke(31,-102)+[[26,-104],[34,-110],[29,-116]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1" fill="#ffd84a"/>`).join('');
  s+=zMat(`M-34 0V-38H28V0Z`,'#9a8e90','lzBrick')+zRoof(-34,28,-38,24,'#4a3a3a',7);
  s+=`<circle cx="-14" cy="-14" r="18" fill="url(#lzHalo)"/><path d="M-26 0V-14A12 12 0 0 1 -2 -14V0Z" fill="url(#lzFire)" ${OL}/><path d="M-26 0V-14A12 12 0 0 1 -2 -14" fill="none" stroke="#5a4a4a" stroke-width="3"/>`+zWin(10,-30,9,12);
  s+=`<g transform="translate(-48 0)"><path d="M-10 0L10 0L7 -5L3 -5L3 -9L11 -11L12 -15L-13 -15L-9 -9L-3 -9L-3 -5L-7 -5Z" fill="#4a4a5a" ${OL}/><path d="M-12 -14H11" stroke="#9a9ab0" stroke-width="1"/></g><g transform="translate(16 0)"><path d="M-4 0Q-5 -5 -4 -11H4Q5 -5 4 0Z" fill="url(#lzWood)" ${OL}/><path d="M-4.7 -3H4.7M-4.7 -8H4.7" stroke="#4a4a5a" stroke-width="1.1"/></g>`;
  return s};
LB.market=()=>{let s='';
  const stall=(x,c1,goods)=>{let t=`<path d="M${x-22} 0V-30M${x+22} 0V-30" stroke="url(#lzWood)" stroke-width="3.2"/><path d="M${x-22} 0V-30M${x+22} 0V-30" stroke="${LBO}" stroke-width=".6" opacity=".6"/>`;
    const aw=`M${x-27} -30Q${x} -46 ${x+27} -30L${x+24} -24Q${x+18} -20 ${x+12} -24Q${x+6} -20 ${x} -24Q${x-6} -20 ${x-12} -24Q${x-18} -20 ${x-24} -24Z`;
    t+=zF(aw,'#fff6e0');for(const k of[-24,-12,0,12])t+=`<path d="M${x+k} -24Q${x+k+3} -20 ${x+k+6} -24L${x+k*.7+4} -38Q${x+k*.7+1} -39 ${x+k*.7-1} -38Z" fill="${c1}" opacity=".95"/>`;t+=zO(aw,'url(#lzSh)');
    t+=zMat(`M${x-24} 0V-12H${x+24}V0Z`,'url(#lzWood)','lzPlank')+zF(`M${x-25} -12H${x+25}V-15H${x-25}Z`,'#c8945a');
    return t+goods(x)};
  s+=stall(-28,'#d1263b',x=>[[-14,'#58e4d3'],[-6,'#ff5d6c'],[2,'#b77dff'],[10,'#ffd84a']].map(([d,c])=>`<path d="M${x+d} -15l3 -4l3 4l-3 4z" fill="${c}" stroke="${LBO}" stroke-width=".6"/>`).join(''));
  s+=stall(28,'#3a6ad0',x=>[[-12,'#ff6a8a'],[-2,'#7affb0'],[8,'#9ad0ff']].map(([d,c])=>`<circle cx="${x+d}" cy="-18.5" r="3.4" fill="${c}" stroke="${LBO}" stroke-width=".7"/><rect x="${x+d-1}" y="-23.5" width="2" height="2.4" fill="#8a5a2a"/>`).join(''));
  s+=`<path d="M-56 -46Q0 -30 56 -46" fill="none" stroke="#3a2a1a" stroke-width=".9"/>`+[-40,-20,0,20,40].map(x=>zLantern(x,(-41.5+Math.abs(x)*.05-6*(1-Math.pow(x/56,2))).toFixed(1),x%40?'#ffb03a':'#ff6a8a')).join('');
  s+=`<g transform="translate(0 -6)"><rect x="-6" y="-6" width="12" height="9" rx="1" fill="url(#lzWood)" ${OL}/><path d="M-6 -2H6" stroke="${LBO}" stroke-width=".6"/></g>`;
  return s};
LB.barracks=()=>LB.house({w:96,h:38,wall:'#d8c098',roof:'#3a5aa0',extra:[-36,36].map(x=>zFlag(x,-38,'#58e4d3',22)).join('')+`<g transform="translate(-60 0)"><path d="M0 0V-20" stroke="#7a5230" stroke-width="2.4"/><path d="M-8 -16H8" stroke="#7a5230" stroke-width="2"/><ellipse cx="0" cy="-21" rx="4.6" ry="5" fill="#d8b878" ${OL}/><path d="M-5 -14H5L4 -6H-4Z" fill="#c8a868" ${OL}/><circle cx="0" cy="-10" r="2" fill="none" stroke="#d1263b" stroke-width="1"/></g>`});
LB.armory=()=>LB.house({w:66,h:42,wall:'#a8acc0',roof:'#5a3a6a',extra:`<g transform="translate(0 -34)"><path d="M-8 -8L8 8M8 -8L-8 8" stroke="#e8eef8" stroke-width="2.6" stroke-linecap="round"/><path d="M-9.5 -9.5l3 1.5M9.5 -9.5l-3 1.5" stroke="url(#lzGold)" stroke-width="2"/><path d="M0 -7L6 -4.6V1Q6 5 0 8Q-6 5 -6 1V-4.6Z" fill="#c0283a" ${OL}/><path d="M0 -4L2 -1L0 4L-2 -1Z" fill="url(#lzGold)"/></g>`});
LB.temple=(c='#ece6f2',roof='#7a5aa0')=>{let s='';
  s+=zF(`M-48 0H48V-4H-48Z`,'#d8d0e0')+zF(`M-45 -4H45V-8H-45Z`,c);
  for(const x of[-34,-17,0,17,34])s+=zMat(`M${x-4} -8V-44H${x+4}V-8Z`,c,null,'lzCyl')+`<path d="M${x-1.5} -10V-42M${x+1.5} -10V-42" stroke="#000000" stroke-opacity=".12" stroke-width=".8"/><rect x="${x-5.5}" y="-47" width="11" height="3.4" rx="1.4" fill="${c}" ${OL}/>`;
  s+=zMat(`M-48 -47H48V-53H-48Z`,c,null,'lzShV');
  const ped=`M-51 -53Q0 -84 51 -53Z`;s+=zMat(ped,roof,'lzTile');
  s+=`<circle cx="0" cy="-62" r="5" fill="url(#lzGold)" ${OL}/><path d="M-3 -62H3M0 -65V-59" stroke="#b8780a" stroke-width=".9"/>`+[-52,52].map(x=>`<circle cx="${x}" cy="-54" r="2.4" fill="url(#lzGold)" stroke="${LBO}" stroke-width=".6"/>`).join('');
  return s};
LB.podium=()=>{let s='';
  const blk=(x,w,h,g,n)=>zMat(`M${x-w/2} 0V${-h+4}Q${x-w/2} ${-h} ${x-w/2+4} ${-h}H${x+w/2-4}Q${x+w/2} ${-h} ${x+w/2} ${-h+4}V0Z`,`url(#${g})`,null,'lzSh')+`<text x="${x}" y="${-h+15}" text-anchor="middle" font-family="'Lilita One',sans-serif" font-size="${n===1?15:12}" fill="#3a2410">${n}</text>`;
  s+=blk(-28,28,26,'lzSilver',2)+blk(28,28,18,'lzBronze',3)+blk(0,28,36,'lzGold',1);
  s+=`<g transform="translate(0 -36)"><path d="M-7 -14H7Q7 -5 0 -3Q-7 -5 -7 -14Z" fill="url(#lzGold)" ${OL}/><path d="M-7 -12Q-12 -12 -10 -7Q-9 -5 -5 -5M7 -12Q12 -12 10 -7Q9 -5 5 -5" fill="none" stroke="#b8780a" stroke-width="1.4"/><path d="M-1.5 -3V0H1.5V-3Z" fill="#b8780a"/><rect x="-5" y="0" width="10" height="2.4" rx="1" fill="#7a4a06"/></g>`;
  s+=[[-40,-40,'#ffd84a'],[36,-34,'#58e4d3'],[-16,-50,'#ff5d6c'],[20,-52,'#b77dff']].map(([x,y,c])=>`<rect x="${x}" y="${y}" width="3" height="5" fill="${c}" transform="rotate(${x} ${x} ${y})"/>`).join('');
  return s};
LB.fountain=()=>{let s='';
  s+=zMat(`M-46 -4Q-46 -14 0 -16Q46 -14 46 -4Q46 6 0 7Q-46 6 -46 -4Z`,'#a8b4cc','lzBrick','lzShV')+`<ellipse cx="0" cy="-10" rx="40" ry="6.5" fill="url(#lzWater)" stroke="${LBO}" stroke-width=".8"/><path d="M-26 -10Q-20 -12 -14 -10M10 -9Q16 -11 22 -9" stroke="#ffffff" stroke-opacity=".7" stroke-width="1" fill="none"/>`;
  s+=zMat(`M-5 -10V-36H5V-10Z`,'#b8c4d8',null,'lzCyl')+`<ellipse cx="0" cy="-37" rx="17" ry="4.4" fill="#a8b4cc" ${OL}/><ellipse cx="0" cy="-38" rx="14" ry="2.6" fill="url(#lzWater)"/>`;
  s+=`<path d="M0 -40Q-2 -54 0 -58Q2 -54 0 -40" fill="#9af0ff"/><path d="M0 -50Q-13 -64 -19 -38M0 -50Q13 -64 19 -38M-14 -37Q-26 -30 -30 -12M14 -37Q26 -30 30 -12" fill="none" stroke="#9af0ff" stroke-width="2.2" stroke-linecap="round" opacity=".9"/><path d="M0 -50Q-13 -64 -19 -38M0 -50Q13 -64 19 -38" fill="none" stroke="#ffffff" stroke-width=".7" opacity=".9"/>`+[[-30,-14],[30,-14],[-19,-40],[19,-40],[-24,-20],[24,-20]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.2" fill="#ffffff"/>`).join('');
  return s};
LB.postoffice=()=>LB.house({w:66,h:40,wall:'#f0e2c0',roof:'#2a5ab0',extra:`<g transform="translate(-44 0)"><path d="M-1.5 0V-12H1.5V0Z" fill="#5a3a1a"/><path d="M-7 -12V-20Q-7 -25 0 -25Q7 -25 7 -20V-12Z" fill="#d1263b" ${OL}/><path d="M-4 -18H4" stroke="${LBO}" stroke-width="1.2"/><path d="M7 -22V-28L12 -26V-24Z" fill="#ffd84a" stroke="${LBO}" stroke-width=".6"/></g><g transform="translate(0 -46)"><rect x="-9" y="-6" width="18" height="12" rx="1.6" fill="#fff8e6" ${OL}/><path d="M-9 -6L0 1L9 -6" fill="none" stroke="${LBO}" stroke-width="1"/><circle cx="0" cy="2" r="2.6" fill="#b01a2a" stroke="${LBO}" stroke-width=".5"/></g>`});
LB.dovecote=()=>{let s='';s+=`<path d="M0 0V-6" stroke="#5a3a1a" stroke-width="4"/>`+zMat(`M-15 -4V-46H15V-4Z`,'#efe2c8','lzBrick','lzCyl');
  for(let r=0;r<3;r++)for(let k=0;k<3;k++){const x=-8+k*8,y=-14-r*11;s+=`<path d="M${x-2.4} ${y}V${y-3}A2.4 2.4 0 0 1 ${x+2.4} ${y-3}V${y}Z" fill="#2a1a10"/><path d="M${x-3.4} ${y}H${x+3.4}" stroke="#8a6a4a" stroke-width="1.2"/>`}
  s+=zCone(0,-46,30,28,'#7a3a2a')+`<circle cx="0" cy="-74" r="2.4" fill="url(#lzGold)" ${OL}/>`;
  const bird=(x,y,f)=>`<g transform="translate(${x} ${y}) scale(${f} 1)"><path d="M-5 0Q-2 -3 0 -1Q3 -4 6 -1Q3 0 0 1Q-3 1 -5 0Z" fill="#ffffff" stroke="${LBO}" stroke-width=".6"/><circle cx="3.6" cy="-1.6" r=".5" fill="#140c24"/></g>`;
  return s+bird(-20,-60,1)+bird(22,-70,-1)+bird(14,-52,1)+`<g transform="translate(-6 -78)"><rect x="-4" y="-3" width="8" height="5.4" rx=".8" fill="#fff8e6" stroke="${LBO}" stroke-width=".6"/></g>`};
evB.pass.b=()=>LB.tent();evB.cas.b=LB.casino;evB.hw.b=LB.manor;evB.rose.b=LB.pavilion;evB.flash.b=LB.clock;
LOBS.guilde.places=()=>[
  {k:'boss',ic:'🏰',n:'Château',sn:'Château',d:'Boss de guilde : le Golem du Néant',b:()=>LB.castle(),x:200,y:142,s:1.05,bw:110,bh:94,badge:()=>tkHave('guild')||0},
  {k:'shop',ic:'🛒',n:'Boutique',sn:'Boutique',d:'Échange tes pièces de guilde',b:LB.shop,x:72,y:206,s:.95,bw:80,bh:68},
  {k:'chat',ic:'🍺',n:'Taverne',sn:'Taverne',d:'Discussion de la guilde',b:LB.tavern,x:328,y:206,s:.95,bw:88,bh:70,badge:()=>S.rgid?(typeof rUnread==='function'?rUnread():0):(S.unread||0)},
  {k:'hall',ic:'🏛️',n:'Grand hall',sn:'Hall',d:'Membres, annonces, pointage',b:()=>LB.temple(),x:200,y:232,s:.62,bw:100,bh:76,badge:()=>S.daily&&!S.daily.ci?'!':0}];
/* médaillon des enseignes + matières partagées injectées dans la scène */
const LZC=new Map();
{const ls=lbScene;lbScene=function(tab,places){const v=ls(tab,places);let o=LZC.get(v);if(o)return o;
  let defs=LZD;try{defs=relight(LZD,skyNow())}catch(e){}
  o=v.replace(/(<svg[^>]*>)/,'$1'+defs).replace(/<circle r="11" fill="#fff6e0" stroke="#[0-9a-f]{6}" stroke-width="1\.8"\/>/g,`<circle r="12.6" fill="url(#lzGold)" stroke="${LBO}" stroke-width="1"/><circle r="10.2" fill="#fff6e0" stroke="#9a6a14" stroke-width="1"/>`);
  if(LZC.size>40)LZC.clear();LZC.set(v,o);return o}}
LSC2.clear();
