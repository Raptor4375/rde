
/* ================= LIVRE V : les dessins (mites, cocon, Mitranne, les petits hiboux du souvenir) ================= */
(function(){try{
if(typeof MONS==='undefined')return;
let MID=0;
const A=(v,d,b)=>`<animate attributeName="opacity" values="${v}" dur="${d}s"${b?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
const f1=n=>(+n).toFixed(1);
/* une antenne plumeuse, de (x0,y0) vers (x1,y1) en passant par (cx,cy) */
function plumeAnt(x0,y0,cx,cy,x1,y1,c,n,w){let o=`<path d="M${x0} ${y0}Q${cx} ${cy} ${x1} ${y1}" stroke="${c}" stroke-width="${w||1.1}" fill="none" stroke-linecap="round"/>`;
  for(let i=2;i<=n;i++){const t=i/(n+1),u=1-t,x=u*u*x0+2*u*t*cx+t*t*x1,y=u*u*y0+2*u*t*cy+t*t*y1,dx=2*u*(cx-x0)+2*t*(x1-cx),dy=2*u*(cy-y0)+2*t*(y1-cy),L=Math.hypot(dx,dy)||1,nx=-dy/L,ny=dx/L,len=2.6*(1-Math.abs(t-.55)*1.2);
    o+=`<path d="M${f1(x-nx*len)} ${f1(y-ny*len)}L${f1(x)} ${f1(y)}L${f1(x+nx*len)} ${f1(y+ny*len)}" stroke="${c}" stroke-width=".55" fill="none" stroke-linecap="round"/>`}
  return o}
/* des grains de poussière d'argent qui tombent */
const dust=(n,x0,x1,y0,c)=>[...Array(n)].map((_,i)=>{const x=x0+((i*37)%Math.max(1,x1-x0)),d=(3.2+(i%4)*.8).toFixed(1);return`<circle r="${(.7+(i%3)*.35).toFixed(2)}" fill="${c||'#efe8ff'}"><animateMotion dur="${d}s" begin="${(-i*.6).toFixed(1)}s" repeatCount="indefinite" path="M${x} ${y0}q${i%2?5:-5} 30 ${i%2?-2:2} ${100-y0}"/>${A('0;.9;0',d)}</circle>`}).join('');

/* ---------- Mite d'Oubli : une mite grise, des yeux dessinés sur les ailes, les bords rongés comme du vieux papier ---------- */
MONS["Mite d'Oubli"]=()=>{const q='mto'+(MID++),O='#1a1424',s=`stroke="${O}" stroke-width="1.4" stroke-linejoin="round"`;
 const wing=sx=>`<g transform="translate(50 50) scale(${sx} 1)"><g><animateTransform attributeName="transform" type="scale" values="1 1;.78 1;1 1" dur="${sx>0?1.3:1.3}s" repeatCount="indefinite"/>
   <path d="M-3 -6Q-14 -36 -42 -34Q-50 -20 -44 -6Q-30 6 -3 2Z" fill="url(#${q}a)" ${s}/>
   <path d="M-40 -28Q-46 -18 -42 -8" stroke="#3a2e4a" stroke-width="3.2" fill="none" opacity=".55" stroke-linecap="round"/>
   <path d="M-44 -6l2.4 -2.6l1.2 3.4l2.4 -2.8l1.4 3.2l2.6 -2.4" stroke="${O}" stroke-width=".8" fill="none"/>
   <path d="M-5 -3Q-20 -24 -38 -28M-5 -1Q-24 -12 -44 -16M-5 1Q-22 -2 -42 -6" stroke="#5a4e6a" stroke-width=".6" fill="none" opacity=".75"/>
   <circle cx="-27" cy="-15" r="6.4" fill="#f2ead6" stroke="#3a2a4a" stroke-width="1.1"/><circle cx="-27" cy="-15" r="3.4" fill="#22162e"/><circle cx="-25.8" cy="-16.2" r="1.1" fill="#fff"/>
   <path d="M-3 3Q-28 6 -38 22Q-30 36 -14 28Q-5 18 -3 8Z" fill="url(#${q}b)" ${s}/>
   <circle cx="-22" cy="17" r="3.2" fill="#efe6d0" stroke="#3a2a4a" stroke-width=".7"/><circle cx="-22" cy="17" r="1.4" fill="#3a2a4a"/>
   <path d="M-30 26l2 -2.4l1 2.8l2 -2.4" stroke="${O}" stroke-width=".7" fill="none"/></g></g>`;
 return`<defs><linearGradient id="${q}a" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#c8bcd8"/><stop offset=".7" stop-color="#8e80a2"/><stop offset="1" stop-color="#6a5c80"/></linearGradient>
  <linearGradient id="${q}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ddd2e8"/><stop offset="1" stop-color="#9a8cb0"/></linearGradient><radialGradient id="${q}g"><stop offset="0" stop-color="#e8dcff" stop-opacity=".5"/><stop offset="1" stop-color="#e8dcff" stop-opacity="0"/></radialGradient></defs>
  <circle cx="50" cy="48" r="40" fill="url(#${q}g)"/>${wing(-1)}${wing(1)}
  <path d="M50 46Q56 52 55 64Q53 76 50 80Q47 76 45 64Q44 52 50 46Z" fill="#cfc4b0" ${s}/>
  <path d="M45.6 56Q50 58 54.4 56M45 62Q50 64 55 62M45.4 68Q50 70 54.6 68M46.6 74Q50 75.6 53.4 74" stroke="#8a7e68" stroke-width=".8" fill="none"/>
  <circle cx="50" cy="45" r="7.4" fill="#e8e0d0" ${s}/><path d="M43.4 44q2 -2.6 4 0q2 -2.6 4.6 0q2 -2.6 4 0" stroke="#b8ac98" stroke-width=".9" fill="none"/>
  <circle cx="50" cy="36.6" r="5.6" fill="#d8ccbc" ${s}/>
  <ellipse cx="47.2" cy="36" rx="2.4" ry="2.8" fill="#1a1028"/><ellipse cx="52.8" cy="36" rx="2.4" ry="2.8" fill="#1a1028"/><circle cx="47.8" cy="35.2" r=".8" fill="#d8c8ff">${A('.4;1;.4',1.8)}</circle><circle cx="53.4" cy="35.2" r=".8" fill="#d8c8ff">${A('.4;1;.4',1.8)}</circle>
  ${plumeAnt(48,32,42,22,34,16,'#4a3e58',7,1.2)}${plumeAnt(52,32,58,22,66,16,'#4a3e58',7,1.2)}${dust(5,22,78,60)}`};

/* ---------- Essaim de Mites : un nuage de mites qui forme un visage ---------- */
MONS['Essaim de Mites']=()=>{const q='ess'+(MID++),O='#140e1e';
 const P=[[50,14,0],[38,18,-20],[62,18,20],[27,26,-35],[73,26,35],[20,38,-50],[80,38,50],[18,52,-70],[82,52,70],[22,66,-100],[78,66,100],[30,78,-130],[70,78,130],[42,86,-160],[58,86,160],[50,90,180],[34,30,-10],[66,30,10],[28,46,-30],[72,46,30],[32,60,-80],[68,60,80],[40,72,-120],[60,72,120],[50,24,0],[44,40,-15],[56,40,15]];
 const moth=(x,y,r,i)=>{const k=.72+(i%3)*.16,d=(1.4+(i%5)*.3).toFixed(1);return`<g transform="translate(${x} ${y}) rotate(${r}) scale(${k})"><g><animateTransform attributeName="transform" type="translate" values="0 0;${i%2?1.6:-1.6} ${i%3?-1.2:1.2};0 0" dur="${d}s" repeatCount="indefinite"/>
   <path d="M0 0Q-5 -8 -10 -6Q-11 0 -1 2Z" fill="#a698b8" stroke="${O}" stroke-width=".7"/><path d="M0 0Q5 -8 10 -6Q11 0 1 2Z" fill="#a698b8" stroke="${O}" stroke-width=".7"/>
   <path d="M-1 2Q-6 4 -7 8Q-3 9 0 4ZM1 2Q6 4 7 8Q3 9 0 4Z" fill="#c8bcd8" stroke="${O}" stroke-width=".6"/><circle cx="-5" cy="-3.6" r="1.2" fill="#efe6d0"/><circle cx="5" cy="-3.6" r="1.2" fill="#efe6d0"/>
   <ellipse rx="1.3" ry="4" cy="2" fill="#3a2e44"/><path d="M-.6 -2L-3 -7M.6 -2L3 -7" stroke="${O}" stroke-width=".5"/></g></g>`};
 return`<defs><radialGradient id="${q}g" cx="50%" cy="50%" r="55%"><stop offset="0" stop-color="#2a2238" stop-opacity=".95"/><stop offset=".7" stop-color="#3a3048" stop-opacity=".6"/><stop offset="1" stop-color="#3a3048" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}e"><stop offset="0" stop-color="#fffaf0"/><stop offset=".5" stop-color="#e8dcff"/><stop offset="1" stop-color="#e8dcff" stop-opacity="0"/></radialGradient></defs>
  <ellipse cx="50" cy="52" rx="44" ry="44" fill="url(#${q}g)"/>
  ${P.map(([x,y,r],i)=>moth(x,y,r,i)).join('')}
  <ellipse cx="38" cy="48" rx="9" ry="7" fill="url(#${q}e)">${A('.7;1;.7',2.2)}</ellipse><ellipse cx="62" cy="48" rx="9" ry="7" fill="url(#${q}e)">${A('.7;1;.7',2.2)}</ellipse>
  <ellipse cx="38" cy="48" rx="2.6" ry="3.4" fill="#140e1e"/><ellipse cx="62" cy="48" rx="2.6" ry="3.4" fill="#140e1e"/>
  <path d="M38 66Q50 72 62 66Q58 76 50 77Q42 76 38 66Z" fill="#0a0612" opacity=".85"/>${dust(6,20,80,70,'#c8bcd8')}`};

/* ---------- Cocon d'Oubli : un cocon de soie suspendu, et dedans, deux yeux de hibou qui brillent à peine ---------- */
MONS["Cocon d'Oubli"]=()=>{const q='coc'+(MID++),O='#1a1428',s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`;
 return`<defs><linearGradient id="${q}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#a8a0b8"/><stop offset=".45" stop-color="#f2eef6"/><stop offset="1" stop-color="#9890a8"/></linearGradient>
  <radialGradient id="${q}i" cx="50%" cy="45%" r="50%"><stop offset="0" stop-color="#ffe8b0" stop-opacity=".55"/><stop offset="1" stop-color="#ffe8b0" stop-opacity="0"/></radialGradient></defs>
  <path d="M50 0V16" stroke="#e8e4f0" stroke-width="1.2"/><path d="M50 0V16" stroke="#fff" stroke-width=".4" opacity=".8"/>
  <g><animateTransform attributeName="transform" type="rotate" values="-4 50 0;4 50 0;-4 50 0" dur="5.5s" repeatCount="indefinite"/>
  <path d="M50 14Q66 18 72 40Q76 64 64 84Q56 96 50 97Q44 96 36 84Q24 64 28 40Q34 18 50 14Z" fill="url(#${q}s)" ${s}/>
  <ellipse cx="50" cy="52" rx="18" ry="22" fill="url(#${q}i)">${A('.5;1;.5',2.8)}</ellipse>
  <g opacity=".42"><path d="M38 44L40 32L45 40Q50 38 55 40L60 32L62 44Q64 56 58 64Q50 70 42 64Q36 56 38 44Z" fill="#4a3e62"/></g>
  <circle cx="44.6" cy="47" r="3.2" fill="#ffe8b0">${A('.25;.75;.25',3.2)}</circle><circle cx="55.4" cy="47" r="3.2" fill="#ffe8b0">${A('.25;.75;.25',3.2)}</circle>
  <circle cx="44.6" cy="47" r="1.3" fill="#3a2a10" opacity=".6"/><circle cx="55.4" cy="47" r="1.3" fill="#3a2a10" opacity=".6"/>
  ${[22,30,38,56,64,72,80].map((y,i)=>`<path d="M${i%2?30:31} ${y}Q50 ${y+(i%2?7:-5)} ${i%2?70:69} ${y+(i%2?-3:4)}" stroke="#fff" stroke-width="${i%3?1:1.6}" fill="none" opacity=".7"/>`).join('')}
  ${[26,46,68].map((y,i)=>`<path d="M${i%2?66:34} ${y}Q50 ${y+10} ${i%2?36:64} ${y+18}" stroke="#7a7090" stroke-width=".8" fill="none" opacity=".7"/>`).join('')}
  <g transform="translate(62 70) rotate(18)"><path d="M0 0h11v13h-11Z" fill="#f4ecd8" stroke="#6a5a4a" stroke-width=".7"/><path d="M2 3h7M2 6h7M2 9h5" stroke="#8a7a62" stroke-width=".5"/></g>
  <g transform="translate(30 30) rotate(-22)"><path d="M0 0h9v11h-9Z" fill="#efe6d0" stroke="#6a5a4a" stroke-width=".7"/><path d="M2 3h5M2 6h5" stroke="#8a7a62" stroke-width=".5"/></g>
  ${[[40,82,-30],[60,28,40],[34,60,-80]].map(([x,y,r],i)=>`<g transform="translate(${x} ${y}) rotate(${r}) scale(.6)"><g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2;0 0" dur="${1.6+i*.4}s" repeatCount="indefinite"/><path d="M0 0Q-5 -8 -10 -6Q-11 0 -1 2ZM0 0Q5 -8 10 -6Q11 0 1 2Z" fill="#8a7c9c" stroke="${O}" stroke-width=".8"/><ellipse rx="1.4" ry="4" cy="2" fill="#2a2036"/></g></g>`).join('')}
  </g>${dust(4,30,70,80,'#efe8ff')}`};

/* ---------- Mitranne, la Reine des Mites ---------- */
MONS['Mitranne, la Reine des Mites']=()=>{const q='mit'+(MID++),O='#140c22',s=`stroke="${O}" stroke-width="1.3" stroke-linejoin="round"`;
 const ruff=(cx,cy,rx,ry,n,c)=>{let d='';for(let i=0;i<=n;i++){const t=Math.PI*(1+i/n),x=cx+Math.cos(t)*rx,y=cy-Math.sin(t)*ry*.3+ (i%2?0:0);const t0=Math.PI*(1+(i-1)/n);if(!i){d+=`M${f1(x)} ${f1(cy)}`;continue}const mx=cx+Math.cos((t+t0)/2)*rx*1.18,my=cy+Math.sin(-(t+t0)/2)*ry*1.25+ry*.9;d+=`Q${f1(mx)} ${f1(my)} ${f1(x)} ${f1(cy+Math.sin(-t)*ry*.2)}`}return`<path d="${d}Q${cx} ${f1(cy-ry*1.6)} ${f1(cx-rx)} ${f1(cy)}Z" fill="${c}" stroke="${O}" stroke-width="1" stroke-linejoin="round"/>`};
 const scal=(pts)=>pts.map(([x,y],i)=>i?`Q${f1((x+pts[i-1][0])/2+(y-pts[i-1][1])*.35)} ${f1((y+pts[i-1][1])/2-(x-pts[i-1][0])*.35)} ${x} ${y}`:`M${x} ${y}`).join('');
 const wingL=`<path d="M47 46Q36 16 8 6Q-2 20 3 34Q6 44 2 50Q14 56 46 52Z" fill="url(#${q}f)" ${s}/>
   <path d="M9 9Q2 22 5 34Q7 42 3.6 49" stroke="#3a2858" stroke-width="3.4" fill="none" opacity=".6" stroke-linecap="round"/>
   <path d="M14 14L22 22L16 26Z" fill="#fbf8ff" opacity=".75"/><path d="M10 26L17 30L11 33Z" fill="#fbf8ff" opacity=".6"/>
   <path d="M44 48Q28 30 12 20M44 50Q24 42 6 40M44 51Q26 50 6 49" stroke="#5a4878" stroke-width=".6" fill="none" opacity=".7"/>
   <circle cx="26" cy="33" r="7.4" fill="#e0a83a" stroke="${O}" stroke-width="1"/><circle cx="26" cy="33" r="5" fill="#f4ecd8"/><circle cx="26" cy="33" r="3" fill="#140c22"/><circle cx="27.2" cy="31.8" r="1" fill="#fff"/>
   <path d="M46 54Q24 56 12 72Q10 84 22 90Q32 92 38 84Q46 70 47 60Z" fill="url(#${q}h)" ${s}/>
   <circle cx="26" cy="74" r="4.4" fill="#e0a83a" stroke="${O}" stroke-width=".8"/><circle cx="26" cy="74" r="2.2" fill="#140c22"/>
   <path d="M14 82Q12 92 18 96Q22 92 20 86" fill="#a898c4" ${s}/>
   <path d="${scal([[3,50],[6,52],[10,53],[15,54],[20,55]])}" stroke="${O}" stroke-width=".7" fill="none"/>`;
 const wing=(sx)=>`<g transform="translate(50 50)"><g><animateTransform attributeName="transform" type="scale" values="1 1;.9 1.02;1 1" dur="3.4s" repeatCount="indefinite"/><g transform="scale(${sx} 1) translate(-50 -50)">${wingL}</g></g></g>`;
 const pages=[[34,66,-9,'#efe6d0'],[41,64,-4,'#e4d8c0'],[48,64,-1,'#f4ecd8'],[55,64,3,'#e8dcc4'],[62,66,8,'#efe6d0'],[37,78,-6,'#f0e6d2'],[45,78,-2,'#e6dac4'],[53,78,2,'#f4ecd8'],[61,78,6,'#e4d8c0']].map(([x,y,r,c])=>`<g transform="translate(${x} ${y}) rotate(${r})"><path d="M-4 0h8v26l-2 -2l-2 3l-2 -3l-2 2Z" fill="${c}" stroke="${O}" stroke-width=".9" stroke-linejoin="round"/><path d="M-2.4 4h4.8M-2.4 7h4.8M-2.4 10h3.6M-2.4 14h4.8M-2.4 17h3" stroke="#a89878" stroke-width=".45"/></g>`).join('');
 return`<defs><radialGradient id="${q}f" cx="85%" cy="80%" r="95%"><stop offset="0" stop-color="#e8def4"/><stop offset=".55" stop-color="#b8a8d8"/><stop offset="1" stop-color="#6a5494"/></radialGradient>
  <radialGradient id="${q}h" cx="90%" cy="10%" r="100%"><stop offset="0" stop-color="#ddd0ee"/><stop offset="1" stop-color="#8a74b4"/></radialGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="#d8c8ff" stop-opacity=".35"/><stop offset="1" stop-color="#d8c8ff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}k" cx="45%" cy="35%" r="70%"><stop offset="0" stop-color="#f6f2fa"/><stop offset="1" stop-color="#cfc4dc"/></radialGradient></defs>
  <circle cx="50" cy="48" r="48" fill="url(#${q}g)"/>
  ${wing(1)}${wing(-1)}
  <path d="M38 56Q50 51 62 56L73 100H27Z" fill="#3a2a58" ${s}/>${pages}
  <path d="M39 57Q32 64 38 72Q42 75 46 72M61 57Q68 64 62 72Q58 75 54 72" stroke="${O}" stroke-width="5.2" fill="none" stroke-linecap="round"/><path d="M39 57Q32 64 38 72Q42 75 46 72M61 57Q68 64 62 72Q58 75 54 72" stroke="#cfc0e4" stroke-width="3.4" fill="none" stroke-linecap="round"/>
  <g transform="translate(50 71) rotate(-4)"><path d="M-8 -6h16v13h-16Z" fill="#f4ecd8" stroke="${O}" stroke-width="1"/><path d="M8 -6a3.6 3.6 0 0 1 0 7.2Z" fill="#3a2a58"/><path d="M8 2.4a2.4 2.4 0 0 1 0 4.6Z" fill="#3a2a58"/><path d="M-5.6 -2.6h9M-5.6 .2h8M-5.6 3h6" stroke="#a89878" stroke-width=".5"/>
   <path d="M-9.6 -2.6q2.6 -1 3 1.4q-.4 1.6 -3 1.2M-9.6 .6q2.6 -1 3 1.4q-.4 1.6 -3 1.2" fill="#ece4f4" stroke="#5a4878" stroke-width=".7"/><path d="M9.6 -3.2q-2.6 -1 -3 1.4q.4 1.6 3 1.2M9.6 0q-2.6 -1 -3 1.4q.4 1.6 3 1.2" fill="#ece4f4" stroke="#5a4878" stroke-width=".7"/></g>
  <path d="M35 53Q36 47.4 42.6 48.6Q46 45.4 50 47.4Q54 45.4 57.4 48.6Q64 47.4 65 53Q66.4 58 61 59.6Q58 62.4 54 60.6Q50 63.4 46 60.6Q42 62.4 39 59.6Q33.6 58 35 53Z" fill="#f2eef8" stroke="${O}" stroke-width="1.1" stroke-linejoin="round"/>
  <path d="M40 55.4Q42.4 57.6 45 56M48 57.4Q50 59 52 57.4M55 56Q57.6 57.6 60 55.4" stroke="#c8bcd8" stroke-width=".8" fill="none" stroke-linecap="round"/>
  <path d="M39.4 38Q39 26 50 25Q61 26 60.6 38Q60 48 50 50.4Q40 48 39.4 38Z" fill="#ece4f2" ${s}/>
  <path d="M41 30q2 -5 4.4 -1.4q1.6 -5 3.6 -1.4q1.6 -5 3.6 -1.2q2.4 -4 4.4 1.4" stroke="#c8bcd8" stroke-width="1.1" fill="none"/>
  <path d="M41.6 38.6Q43 32.6 47.6 35.6Q48.4 41 45 43Q42 42.4 41.6 38.6ZM58.4 38.6Q57 32.6 52.4 35.6Q51.6 41 55 43Q58 42.4 58.4 38.6Z" fill="#0c0616"/>
  <circle cx="45.8" cy="37" r="1.3" fill="#efe8ff"/><circle cx="54.2" cy="37" r="1.3" fill="#efe8ff"/><circle cx="44.2" cy="40" r=".6" fill="#a898c8"/><circle cx="55.8" cy="40" r=".6" fill="#a898c8"/>
  <path d="M47.2 46Q50 47.8 52.8 46" stroke="#5a3a6a" stroke-width="1" fill="none" stroke-linecap="round"/><ellipse cx="42.8" cy="44.4" rx="2" ry="1" fill="#c8a8e0" opacity=".65"/><ellipse cx="57.2" cy="44.4" rx="2" ry="1" fill="#c8a8e0" opacity=".65"/>
  <g opacity=".5">${plumeAnt(47.4,27.6,39,12,29,5,'#fff',8,3.4)}${plumeAnt(52.6,27.6,61,12,71,5,'#fff',8,3.4)}</g>
  ${plumeAnt(47.4,27.6,39,12,29,5,'#5a4878',8,1.5)}${plumeAnt(52.6,27.6,61,12,71,5,'#5a4878',8,1.5)}
  <path d="M50 26.4L52.2 29.6L50 32.8L47.8 29.6Z" fill="#e0a83a" stroke="${O}" stroke-width=".7"/><circle cx="50" cy="29.6" r="4" fill="#ffe8a0" opacity=".35">${A('.2;.6;.2',2.2)}</circle>
  ${dust(8,8,92,40)}`};

/* ---------- les petits hiboux du souvenir (Corvin enfant, Plume bébé) ---------- */
const OWC={};
function owletSVG(k){if(OWC[k])return OWC[k];const O='#1a1228',s=`stroke="${O}" stroke-width="1.6" stroke-linejoin="round"`,pl=k==='plumeb';
 const c=pl?['#a890ff','#7c5cff','#e8e0ff']:['#a8a2b4','#6e687c','#e8e4ee'],R=pl?.82:1;
 let o=`<svg viewBox="0 0 100 100" class="owl5" aria-hidden="true"><ellipse cx="50" cy="95" rx="${22*R}" ry="3.6" fill="#000" opacity=".25"/><g transform="translate(50 ${pl?60:58}) scale(${R}) translate(-50 -58)">`;
 o+=`<path d="M24 64Q14 60 14 46Q22 52 28 52Z" fill="${c[1]}" ${s}/><path d="M76 64Q86 60 86 46Q78 52 72 52Z" fill="${c[1]}" ${s}/>`;
 o+=`<path d="M30 30L34 16L42 28Q50 24 58 28L66 16L70 30Q80 44 78 62Q76 84 50 88Q24 84 22 62Q20 44 30 30Z" fill="${c[0]}" ${s}/>`;
 o+=`<ellipse cx="50" cy="68" rx="16" ry="16" fill="${c[2]}" opacity=".9"/>${[[44,62],[52,64],[47,70],[55,71],[50,77]].map(([x,y])=>`<path d="M${x-2} ${y}l2 2l2 -2" stroke="${c[1]}" stroke-width=".9" fill="none"/>`).join('')}`;
 o+=`<circle cx="40" cy="46" r="11" fill="${c[2]}" ${s}/><circle cx="60" cy="46" r="11" fill="${c[2]}" ${s}/>`;
 if(pl)o+=`<circle cx="40" cy="47" r="6.4" fill="#1a1228"/><circle cx="60" cy="47" r="6.4" fill="#1a1228"/><circle cx="42.4" cy="44.6" r="2.4" fill="#fff"/><circle cx="62.4" cy="44.6" r="2.4" fill="#fff"/><circle cx="38.4" cy="49.6" r="1.1" fill="#fff"/><circle cx="58.4" cy="49.6" r="1.1" fill="#fff"/><path d="M33 56q2 2 4 0M63 56q2 2 4 0" stroke="#7aa8ff" stroke-width="1.4" fill="none" stroke-linecap="round" opacity=".8"/>`;
 else o+=`<path d="M34.6 47Q40 41.6 45.4 47" stroke="#1a1228" stroke-width="2.2" fill="none" stroke-linecap="round"/><path d="M54.6 47Q60 41.6 65.4 47" stroke="#1a1228" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
 o+=pl?`<path d="M47 55L53 55L50 60Z" fill="#ffd84a" ${s}/>`:`<path d="M46.4 54L53.6 54L50 58Z" fill="#ffd84a" ${s}/><path d="M47 58.6Q50 63 53 58.6Z" fill="#7a2a3a" ${s}/>`;
 if(pl)o+=`<path d="M46 24q4 -8 8 -2q-4 -2 -4 4Z" fill="${c[0]}" ${s}/><path d="M18 78L26 72L32 80L40 72L46 80L54 72L60 80L68 72L74 80L82 72V90Q50 100 18 90Z" fill="#fff8ea" stroke="#3a2a14" stroke-width="1.3" stroke-linejoin="round"/>`;
 else o+=`<path d="M30 60Q50 70 70 60L71 66Q50 76 29 66Z" fill="#c83a4a" ${s}/><path d="M62 66L68 80L74 76L68 64Z" fill="#c83a4a" ${s}/><path d="M40 88v5M46 88v5M54 88v5M60 88v5" stroke="#e8a03a" stroke-width="2.4" stroke-linecap="round"/>`;
 o+='</g>';
 if(!pl)o+=['♪','♫','♪'].map((n,i)=>`<text x="${70+i*8}" y="${30-i*6}" font-size="${11-i}" fill="#efe6ff" font-family="serif" transform="rotate(${i%2?14:-12} ${70+i*8} ${30-i*6})">${n}<animate attributeName="y" values="${30-i*6};${22-i*6};${30-i*6}" dur="${1.6+i*.3}s" repeatCount="indefinite"/></text>`).join('');
 return OWC[k]=o+'</svg>'}
window.owletSVG=owletSVG;
}catch(e){console.warn('livre V art',e)}})();
