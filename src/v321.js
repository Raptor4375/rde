
/* ================= Décors des légendaires (et d'Aléa), version soignée ================= */
/* Chaque décor est unique et grandit avec les ultra-évolutions (comme la roulette de Fortuna qui gagne des cases). */
const BX={
 P:(cx,cy,r,deg)=>[cx+Math.cos(deg*Math.PI/180)*r,cy+Math.sin(deg*Math.PI/180)*r],
 f:n=>(+n).toFixed(1),
 spin:(cx,cy,dur,rev)=>`<animateTransform attributeName="transform" type="rotate" from="${rev?360:0} ${cx} ${cy}" to="${rev?0:360} ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/>`,
 bob:(dy,dur,b=0)=>`<animateTransform attributeName="transform" type="translate" values="0 0;0 ${-dy};0 0" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/>`,
 tw:(dur,b=0,lo=.25)=>`<animate attributeName="opacity" values="${lo};1;${lo}" dur="${dur}s" begin="${b}s" repeatCount="indefinite"/>`,
 star4:(x,y,r,c)=>`<path d="M${x} ${y-r}L${x+r*.28} ${y-r*.28}L${x+r} ${y}L${x+r*.28} ${y+r*.28}L${x} ${y+r}L${x-r*.28} ${y+r*.28}L${x-r} ${y}L${x-r*.28} ${y-r*.28}Z" fill="${c}"/>`,
 glow:(id,c,o=.7)=>`<radialGradient id="${id}"><stop offset="0" stop-color="${c}" stop-opacity="${o}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`};
const LGB2={
/* ---------- Fortuna : la roulette qui gagne des cases à chaque forme ---------- */
56:u=>{const n=[18,24,30,37][u],R=60,cx=80,cy=84,f=BX.f,id='lb56'+u;let w='';
  for(let k=0;k<n;k++){const a0=k*360/n-90,a1=(k+1)*360/n-90,[x0,y0]=BX.P(cx,cy,R,a0),[x1,y1]=BX.P(cx,cy,R,a1),[xi0,yi0]=BX.P(cx,cy,R*.62,a0),[xi1,yi1]=BX.P(cx,cy,R*.62,a1);
    const col=k===0?'#1f8a4a':k%2?'#c01f34':'#151015';w+=`<path d="M${f(xi0)} ${f(yi0)}L${f(x0)} ${f(y0)}A${R} ${R} 0 0 1 ${f(x1)} ${f(y1)}L${f(xi1)} ${f(yi1)}A${R*.62} ${R*.62} 0 0 0 ${f(xi0)} ${f(yi0)}Z" fill="${col}" stroke="#ffd84a" stroke-width=".5"/>`;
    const [tx,ty]=BX.P(cx,cy,R*.82,(a0+a1)/2);w+=`<text x="${f(tx)}" y="${f(ty+1.6)}" font-size="${n>30?3.6:4.4}" font-weight="700" text-anchor="middle" fill="#fff" transform="rotate(${f((a0+a1)/2+90)} ${f(tx)} ${f(ty)})">${k}</text>`}
  const studs=[...Array(u>=2?24:16)].map((_,k)=>{const [x,y]=BX.P(cx,cy,R+5,k*360/(u>=2?24:16));return`<circle cx="${f(x)}" cy="${f(y)}" r="1.5" fill="#fff6c0">${u>=3?BX.tw(1.2,k*.05):''}</circle>`}).join('');
  const cone=[...Array(8)].map((_,k)=>{const [x,y]=BX.P(cx,cy,R*.5,k*45);return`<path d="M${cx} ${cy}L${f(x)} ${f(y)}" stroke="#ffd84a" stroke-width="1.4"/>`}).join('');
  return`<defs><radialGradient id="${id}h"><stop offset="0" stop-color="#e8b84a"/><stop offset="1" stop-color="#7a4a10"/></radialGradient></defs><g opacity=".62">
   <circle cx="${cx}" cy="${cy}" r="${R+9}" fill="#3a1a0a" stroke="#ffd84a" stroke-width="2.2"/>${u>=2?`<circle cx="${cx}" cy="${cy}" r="${R+14}" fill="none" stroke="#ffd84a" stroke-width="1" stroke-dasharray="3 3">${BX.spin(cx,cy,20,1)}</circle>`:''}${studs}
   <g>${w}<circle cx="${cx}" cy="${cy}" r="${R*.62}" fill="url(#${id}h)" stroke="#ffd84a" stroke-width="1.6"/>${cone}<circle cx="${cx}" cy="${cy}" r="5" fill="#ffd84a" stroke="#7a4a10"/>${BX.spin(cx,cy,[26,20,15,11][u])}</g>
   <g><circle cx="${cx}" cy="${cy-R+3}" r="2.6" fill="#fff"/>${BX.spin(cx,cy,[3,2.6,2.2,1.8][u],1)}</g></g>`},
/* ---------- Solaris : le soleil, sa couronne et ses planètes ---------- */
57:u=>{const cx=80,cy=74,id='lb57'+u,f=BX.f;const fl=[...Array(12)].map((_,k)=>{const a=k*30,[x1,y1]=BX.P(cx,cy,30,a-8),[x2,y2]=BX.P(cx,cy,48+(k%3)*6+u*4,a),[x3,y3]=BX.P(cx,cy,30,a+8);return`<path d="M${f(x1)} ${f(y1)}Q${f(x2)} ${f(y2)} ${f(x3)} ${f(y3)}" fill="url(#${id}f)"><animate attributeName="opacity" values=".55;1;.55" dur="${2+k%4*.5}s" repeatCount="indefinite"/></path>`}).join('');
  const orb=(rx,ry,dur,r,c,b)=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="#ffd84a" stroke-width=".5" opacity=".6"/><g><circle r="${r}" fill="${c}" stroke="#fff6c0" stroke-width=".6"/><animateMotion dur="${dur}s" begin="${b}s" repeatCount="indefinite" path="M${cx-rx} ${cy}a${rx} ${ry} 0 1 0 ${rx*2} 0a${rx} ${ry} 0 1 0 -${rx*2} 0"/></g>`;
  const planets=[[64,18,9,3.4,'#ff8a3a',0],[72,24,13,2.6,'#5ad0ff',-4],[58,30,7,2.2,'#d0a0ff',-2],[78,14,16,3,'#ffd84a',-7]].slice(0,u+1).map(p=>orb(...p)).join('');
  return`<defs><radialGradient id="${id}c"><stop offset="0" stop-color="#fff"/><stop offset=".35" stop-color="#fff2a0"/><stop offset=".75" stop-color="#ffb21a"/><stop offset="1" stop-color="#ff5a10"/></radialGradient>
   <linearGradient id="${id}f" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffd84a"/><stop offset="1" stop-color="#ff5a10"/></linearGradient>${BX.glow(id+'g','#ffb21a',.8)}</defs>
   <g opacity=".72"><circle cx="${cx}" cy="${cy}" r="${84+u*6}" fill="url(#${id}g)"/>${planets}<g>${fl}${BX.spin(cx,cy,40)}</g>
   <circle cx="${cx}" cy="${cy}" r="32" fill="url(#${id}c)"><animate attributeName="r" values="31;34;31" dur="3s" repeatCount="indefinite"/></circle>${u>=3?`<circle cx="${cx}" cy="${cy}" r="40" fill="none" stroke="#fff6c0" stroke-width="1.2" stroke-dasharray="1 4">${BX.spin(cx,cy,12,1)}</circle>`:''}</g>`},
/* ---------- Gaïa : l'arbre de vie ---------- */
59:u=>{const id='lb59'+u;const canopy=[[80,30,34],[48,44,24],[112,44,24],[60,22,20],[100,22,20],[30,66,16],[130,66,16]];
  const blos=[[44,40],[118,38],[70,16],[96,30],[30,62],[132,60],[58,58],[104,60],[80,8],[20,80],[140,82]].slice(0,4+u*2);
  const petals=[...Array(3+u*2)].map((_,k)=>`<g><path d="M0 0Q3 -3 6 0Q3 3 0 0Z" fill="#ff9ad0"/><animateMotion dur="${6+k}s" begin="${-k*1.7}s" repeatCount="indefinite" path="M${20+k*23%120} -6Q${40+k*17%100} 60 ${10+k*31%140} 150"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="3s" repeatCount="indefinite" additive="sum"/></g>`).join('');
  return`<defs><linearGradient id="${id}t" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3a2410"/><stop offset=".5" stop-color="#6a4420"/><stop offset="1" stop-color="#3a2410"/></linearGradient>
   <radialGradient id="${id}l" cx="40%" cy="35%"><stop offset="0" stop-color="#9ae06a"/><stop offset="1" stop-color="#2a6a2a"/></radialGradient>${BX.glow(id+'g','#c8ff6a',.5)}</defs>
   <g opacity=".72"><circle cx="80" cy="60" r="${70+u*8}" fill="url(#${id}g)"/>
   <path d="M66 236Q70 150 72 110Q60 84 38 64M94 236Q90 150 88 110Q100 84 122 64M76 120Q78 80 80 40M84 110Q96 90 104 60M76 110Q64 90 58 58" stroke="url(#${id}t)" stroke-width="7" fill="none" stroke-linecap="round"/>
   <path d="M66 226Q40 222 22 234M94 226Q120 222 140 234M72 230Q60 236 46 236" stroke="#4a2c14" stroke-width="4" fill="none" stroke-linecap="round"/>
   ${canopy.map(([x,y,r],k)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${id}l)" opacity="${.85-k*.05}"/>`).join('')}
   ${[[38,64,40],[122,64,40],[58,58,30],[104,60,30]].map(([x,y,l],k)=>`<path d="M${x} ${y}q${k%2?3:-3} ${l/2} 0 ${l}" stroke="#4a9a3a" stroke-width="1.6" fill="none"><animateTransform attributeName="transform" type="rotate" values="-4 ${x} ${y};4 ${x} ${y};-4 ${x} ${y}" dur="${3+k}s" repeatCount="indefinite"/></path>`).join('')}
   ${blos.map(([x,y],k)=>`<g>${[0,72,144,216,288].map(a=>`<ellipse cx="${x}" cy="${y-3}" rx="1.8" ry="3.2" fill="${u>=3&&k%2?'#ffd84a':'#ff9ad0'}" transform="rotate(${a} ${x} ${y})"/>`).join('')}<circle cx="${x}" cy="${y}" r="1.6" fill="#fff6c0"/>${BX.tw(2.4,k*.3,.6)}</g>`).join('')}
   ${u>=2?`<g opacity=".8">${[...Array(10)].map((_,k)=>{const [x,y]=BX.P(80,84,78,k*36);return`<path d="M${BX.f(x)} ${BX.f(y)}q4 -6 0 -12q-4 6 0 12Z" fill="#9ae06a"/>`}).join('')}${BX.spin(80,84,40)}</g>`:''}
   ${u>=3?[...Array(8)].map((_,k)=>`<circle r="1.4" fill="#e8ff7a"><animateMotion dur="${4+k%3}s" begin="${-k}s" repeatCount="indefinite" path="M${20+k*16} ${40+k%3*30}q10 -10 20 0t20 0"/>${BX.tw(1.5,k*.2,.2)}</circle>`).join(''):''}${petals}</g>`},
/* ---------- Titanor : le volcan et les rochers flottants ---------- */
60:u=>{const id='lb60'+u;const rocks=[[22,110,7],[140,100,8],[34,40,5],[128,34,6],[150,160,5],[10,170,6]].slice(0,3+u);
  return`<defs><linearGradient id="${id}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a625a"/><stop offset=".75" stop-color="#3a3430" stop-opacity=".8"/><stop offset="1" stop-color="#2a2420" stop-opacity="0"/></linearGradient>
   <linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4a4038"/><stop offset=".7" stop-color="#2a2420" stop-opacity=".7"/><stop offset="1" stop-color="#1a1410" stop-opacity="0"/></linearGradient>${BX.glow(id+'l','#ff6a1a',.8)}</defs>
   <g opacity=".75"><path d="M-4 200L20 120L38 140L56 96L70 110L80 70L90 108L104 92L122 138L140 112L164 200Z" fill="url(#${id}b)"/>
   <path d="M30 210L64 90L80 52L96 90L130 210Z" fill="url(#${id}m)" stroke="#8a8278" stroke-width="1"/>
   <path d="M72 70L80 52L88 70L84 66L80 72L76 66Z" fill="${u>=1?'#ff8a2a':'#f4f0ea'}"/>
   ${u>=1?`<circle cx="80" cy="50" r="${18+u*6}" fill="url(#${id}l)"><animate attributeName="r" values="${16+u*6};${22+u*6};${16+u*6}" dur="2.4s" repeatCount="indefinite"/></circle>
     <path d="M80 70Q76 100 72 130Q70 150 66 170M80 70Q86 104 90 140" stroke="#ff6a1a" stroke-width="${1.4+u*.6}" fill="none" stroke-linecap="round"><animate attributeName="stroke-opacity" values=".5;1;.5" dur="1.8s" repeatCount="indefinite"/></path>`:''}
   ${u>=2?[...Array(6)].map((_,k)=>`<circle r="${1.6+k%2}" fill="#ff9a3a"><animateMotion dur="${2+k*.4}s" begin="${-k*.5}s" repeatCount="indefinite" path="M${80+(k-3)*3} 52q${(k-3)*6} -30 ${(k-3)*14} -10"/>${BX.tw(1,k*.2,0)}</circle>`).join(''):''}
   ${rocks.map(([x,y,r],k)=>`<g>${BX.bob(5,3+k*.6,-k)}<path d="M${x-r} ${y}L${x-r*.4} ${y-r}L${x+r*.7} ${y-r*.7}L${x+r} ${y+r*.2}L${x+r*.2} ${y+r}L${x-r*.7} ${y+r*.7}Z" fill="#7a7068" stroke="${u>=2?'#ff8a2a':'#5a5048'}" stroke-width=".9"/>${u>=3?`<path d="M${x-r*.4} ${y-r*.2}L${x+r*.3} ${y+r*.3}" stroke="#ffd84a" stroke-width=".8"/>`:''}</g>`).join('')}
   ${u>=3?`<circle cx="80" cy="96" r="76" fill="none" stroke="#ff8a2a" stroke-width="1" stroke-dasharray="6 4" opacity=".7">${BX.spin(80,96,30)}</circle>`:''}</g>`},
/* ---------- Valkyr : le bouclier viking, l'orage et le Bifröst ---------- */
61:u=>{const id='lb61'+u,cx=80,cy=74,R=50,f=BX.f;
  const planks=[-40,-24,-8,8,24,40].map(x=>`<rect x="${cx+x-8}" y="${cy-R}" width="16" height="${R*2}" fill="${(x/16)%2?'#7a4a24':'#8a5a2c'}"/>`).join('');
  const runes='ᚠᚢᚦᚨᚱᚲᚷᚹᚺᚾᛁᛃ'.split('').map((r,k)=>{const [x,y]=BX.P(cx,cy,R-5,k*30-90);return`<text x="${f(x)}" y="${f(y+2.4)}" font-size="6.5" text-anchor="middle" fill="#ffd84a">${r}</text>`}).join('');
  const bolt=(x,b)=>`<path d="M${x} 0L${x-6} 18L${x+2} 18L${x-5} 40" stroke="#fff6c0" stroke-width="1.6" fill="none" opacity="0"><animate attributeName="opacity" values="0;0;1;0;1;0" keyTimes="0;.8;.84;.88;.92;1" dur="5s" begin="${b}s" repeatCount="indefinite"/></path>`;
  return`<defs><clipPath id="${id}c"><circle cx="${cx}" cy="${cy}" r="${R}"/></clipPath>${BX.glow(id+'g','#9ab0ff',.45)}<radialGradient id="${id}s"><stop offset="0" stop-color="#e8e8e8"/><stop offset="1" stop-color="#6a6a70"/></radialGradient></defs>
   <g opacity=".72">${u>=3?`<g opacity=".55"><path d="M-4 150A84 84 0 0 1 164 150" stroke-width="6" fill="none" stroke="#ff5a5a"/><path d="M2 150A78 78 0 0 1 158 150" stroke-width="6" fill="none" stroke="#ffd84a"/><path d="M8 150A72 72 0 0 1 152 150" stroke-width="6" fill="none" stroke="#5ad07a"/><path d="M14 150A66 66 0 0 1 146 150" stroke-width="6" fill="none" stroke="#5aa0ff"/></g>`:''}
   <ellipse cx="34" cy="22" rx="30" ry="12" fill="#3a4050"/><ellipse cx="126" cy="18" rx="32" ry="12" fill="#3a4050"/><ellipse cx="80" cy="10" rx="26" ry="10" fill="#4a5060"/>${bolt(30,0)}${bolt(132,2.4)}${u>=1?bolt(84,1.2):''}
   <circle cx="${cx}" cy="${cy}" r="${R+8}" fill="url(#${id}g)"/>
   ${[[-1,0],[1,0]].map(([s])=>`<g transform="rotate(${s*38} ${cx} ${cy})"><rect x="${cx-1.4}" y="${cy-R-26}" width="2.8" height="${R*2+52}" fill="#5a3a1a"/><path d="M${cx} ${cy-R-36}L${cx+5} ${cy-R-24}L${cx} ${cy-R-20}L${cx-5} ${cy-R-24}Z" fill="#d8dce8"/></g>`).join('')}
   <g clip-path="url(#${id}c)">${planks}</g><circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#5a5a62" stroke-width="5"/>${[...Array(16)].map((_,k)=>{const [x,y]=BX.P(cx,cy,R,k*22.5);return`<circle cx="${f(x)}" cy="${f(y)}" r="1.3" fill="#d8d8e0"/>`}).join('')}
   ${runes}<circle cx="${cx}" cy="${cy}" r="11" fill="url(#${id}s)" stroke="#3a3a40" stroke-width="1.4"/>
   ${u>=2?`<g transform="translate(${cx} ${cy}) scale(.32)" fill="none" stroke="#ffd84a" stroke-width="5">${[0,120,240].map(a=>`<path d="M0 -40L34 20L-34 20Z" transform="rotate(${a}) translate(0 10)"/>`).join('')}<animate attributeName="opacity" values=".5;1;.5" dur="2.6s" repeatCount="indefinite"/></g>`:''}</g>`},
/* ---------- Nyx : l'éclipse ---------- */
62:u=>{const id='lb62'+u,cx=80,cy=70,blood=u>=3;const bats=[...Array(2+u)].map((_,k)=>`<g><path d="M0 0Q-4 -4 -8 -1Q-6 0 -6 2Q-3 0 0 2Q3 0 6 2Q6 0 8 -1Q4 -4 0 0Z" fill="#0a0614"/><animateMotion dur="${7+k*2}s" begin="${-k*2}s" repeatCount="indefinite" path="M-10 ${30+k*24}Q80 ${k*20} 170 ${40+k*18}"/></g>`).join('');
  const phases=u>=2?[...Array(8)].map((_,k)=>{const [x,y]=BX.P(cx,cy,64,k*45-90);const s=k/8;return`<g><circle cx="${BX.f(x)}" cy="${BX.f(y)}" r="5" fill="#d8d0ff"/><circle cx="${BX.f(x+(s<.5?-1:1)*10*(1-Math.abs(s*2-1)))}" cy="${BX.f(y)}" r="5" fill="#0a0614"/></g>`}).join(''):'';
  return`<defs><radialGradient id="${id}k"><stop offset=".6" stop-color="${blood?'#ff2a4a':'#d8c8ff'}" stop-opacity=".9"/><stop offset=".75" stop-color="${blood?'#ff6a3a':'#b07aff'}" stop-opacity=".55"/><stop offset="1" stop-color="${blood?'#7a0a1a':'#3a1a7a'}" stop-opacity="0"/></radialGradient>${BX.glow(id+'g','#4a2a8a',.6)}</defs>
   <g opacity=".78"><circle cx="${cx}" cy="${cy}" r="90" fill="url(#${id}g)"/>
   ${[[18,20],[140,30],[24,120],[146,128],[60,8],[110,12],[8,70],[154,80]].map(([x,y],k)=>BX.star4(x,y,1.6+k%2,'#fff').replace('/>',`>${BX.tw(2+k%3*.6,k*.3)}</path>`)).join('')}
   <circle cx="${cx}" cy="${cy}" r="${46+u*3}" fill="url(#${id}k)"><animate attributeName="r" values="${45+u*3};${50+u*3};${45+u*3}" dur="4s" repeatCount="indefinite"/></circle>
   <circle cx="${cx}" cy="${cy}" r="30" fill="#07040e"/><path d="M${cx-30} ${cy}A30 30 0 0 1 ${cx+30} ${cy}" stroke="${blood?'#ff8a8a':'#fff'}" stroke-width="1.2" fill="none" opacity=".6"/>
   ${phases?`<g>${phases}${BX.spin(cx,cy,60)}</g>`:''}${bats}</g>`},
/* ---------- Orion : la constellation d'Orion dans une nébuleuse ---------- */
63:u=>{const id='lb63'+u;const S=[[44,22,'#ffb07a',3.4],[116,26,'#fff',2.6],[70,74,'#fff',2.2],[80,70,'#fff',2.2],[90,66,'#fff',2.2],[50,128,'#fff',2.4],[118,124,'#a8d0ff',3.6],[80,8,'#fff',1.8]];
  const L=[[0,2],[1,4],[2,3],[3,4],[2,5],[4,6],[0,7],[1,7]];
  return`<defs><radialGradient id="${id}n" cx="40%" cy="40%"><stop offset="0" stop-color="#7a3a9a" stop-opacity=".7"/><stop offset=".5" stop-color="#2a3a8a" stop-opacity=".45"/><stop offset="1" stop-color="#0a0a2a" stop-opacity="0"/></radialGradient>
   <radialGradient id="${id}n2" cx="70%" cy="60%"><stop offset="0" stop-color="#ff7a9a" stop-opacity=".4"/><stop offset="1" stop-color="#ff7a9a" stop-opacity="0"/></radialGradient></defs>
   <g opacity=".8"><ellipse cx="72" cy="70" rx="86" ry="70" fill="url(#${id}n)"/><ellipse cx="100" cy="96" rx="50" ry="40" fill="url(#${id}n2)"/>
   ${[...Array(24)].map((_,k)=>`<circle cx="${(k*41)%160}" cy="${(k*67)%170}" r="${.5+k%3*.3}" fill="#fff">${BX.tw(2+k%4,k*.2,.2)}</circle>`).join('')}
   ${L.map(([a,b])=>`<line x1="${S[a][0]}" y1="${S[a][1]}" x2="${S[b][0]}" y2="${S[b][1]}" stroke="#c8d8ff" stroke-width=".7" stroke-dasharray="2 2" opacity=".8"/>`).join('')}
   ${S.map(([x,y,c,r],k)=>`<g>${BX.star4(x,y,r*1.9,c)}<circle cx="${x}" cy="${y}" r="${r*.6}" fill="#fff"/>${BX.tw(2.2+k%3*.5,k*.25,.5)}</g>`).join('')}
   <g opacity="0"><path d="M150 10L110 40" stroke="#fff" stroke-width="1.2" stroke-linecap="round"/><animate attributeName="opacity" values="0;0;1;0" keyTimes="0;.85;.9;1" dur="6s" repeatCount="indefinite"/><animateTransform attributeName="transform" type="translate" values="0 0;0 0;-30 22" keyTimes="0;.85;1" dur="6s" repeatCount="indefinite"/></g>
   ${u>=2?`<g fill="none" stroke="#ffd84a" stroke-width=".9" opacity=".75"><ellipse cx="80" cy="84" rx="74" ry="22"/><ellipse cx="80" cy="84" rx="74" ry="22" transform="rotate(60 80 84)"/><ellipse cx="80" cy="84" rx="74" ry="22" transform="rotate(-60 80 84)"/>${BX.spin(80,84,50)}</g>`:''}
   ${u>=3?`<circle cx="80" cy="84" r="78" fill="none" stroke="#ffd84a" stroke-width="2"/>${[...Array(12)].map((_,k)=>{const [x,y]=BX.P(80,84,78,k*30);return`<circle cx="${BX.f(x)}" cy="${BX.f(y)}" r="2" fill="#ffd84a"/>`}).join('')}`:''}</g>`},
/* ---------- Séraphine : la rosace de cathédrale ---------- */
64:u=>{const id='lb64'+u,cx=80,cy=74,f=BX.f;const cols=['#ff5a7a','#ffd84a','#5ad0a0','#7a8aff','#ff9ad0','#ffb21a'];
  const ring=(r1,r2,n,off,op)=>[...Array(n)].map((_,k)=>{const a0=k*360/n+off,a1=(k+1)*360/n+off,am=(a0+a1)/2,[x0,y0]=BX.P(cx,cy,r1,a0),[x1,y1]=BX.P(cx,cy,r1,a1),[xm,ym]=BX.P(cx,cy,r2,am);
    return`<path d="M${f(x0)} ${f(y0)}Q${f(BX.P(cx,cy,r2,a0)[0])} ${f(BX.P(cx,cy,r2,a0)[1])} ${f(xm)} ${f(ym)}Q${f(BX.P(cx,cy,r2,a1)[0])} ${f(BX.P(cx,cy,r2,a1)[1])} ${f(x1)} ${f(y1)}Z" fill="${cols[k%cols.length]}" opacity="${op}" stroke="#3a2a1a" stroke-width="1.6"/>`}).join('');
  return`<defs>${BX.glow(id+'g','#fff2c0',.8)}<linearGradient id="${id}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff6d0" stop-opacity=".7"/><stop offset="1" stop-color="#fff6d0" stop-opacity="0"/></linearGradient></defs>
   <g opacity=".7"><path d="M14 236V70Q14 6 80 -6Q146 6 146 70V236" fill="#2a2030" stroke="#c8a860" stroke-width="2.4"/><circle cx="${cx}" cy="${cy}" r="58" fill="url(#${id}g)"/>
   <circle cx="${cx}" cy="${cy}" r="${u>=2?56:50}" fill="#3a2a1a"/>${u>=2?ring(44,56,24,0,.85):''}${ring(18,48,12,15,.9)}${ring(6,20,6,0,.95)}<circle cx="${cx}" cy="${cy}" r="6" fill="#ffd84a" stroke="#3a2a1a" stroke-width="1.4"/>
   ${[...Array(5)].map((_,k)=>`<path d="M${cx-30+k*15} ${cy+30}L${cx-50+k*25} 236L${cx-34+k*25} 236Z" fill="url(#${id}b)">${BX.tw(3+k*.4,k*.5,.3)}</path>`).join('')}
   ${u>=3?`<circle cx="${cx}" cy="${cy}" r="62" fill="none" stroke="#ffd84a" stroke-width="2.4"><animate attributeName="stroke-opacity" values=".4;1;.4" dur="2s" repeatCount="indefinite"/></circle>`:''}</g>`},
/* ---------- Drakhar : l'œil du dragon ---------- */
65:u=>{const id='lb65'+u,cx=80,cy=66,gold=u>=3;const scales=[...Array(7)].map((_,r)=>[...Array(10)].map((_,c)=>`<path d="M${c*18-4+(r%2)*9} ${120+r*14}q9 -10 18 0" fill="none" stroke="#5a1408" stroke-width="2"/>`).join('')).join('');
  const embers=[...Array(6+u*3)].map((_,k)=>`<circle r="${1+k%3*.5}" fill="${k%2?'#ffd84a':'#ff6a1a'}"><animateMotion dur="${3+k%4}s" begin="${-k*.6}s" repeatCount="indefinite" path="M${(k*29)%160} 236Q${(k*47)%160} 140 ${(k*13)%160} 20"/>${BX.tw(1.4,k*.2,0)}</circle>`).join('');
  return`<defs><radialGradient id="${id}i"><stop offset="0" stop-color="${gold?'#fff6c0':'#ffe08a'}"/><stop offset=".6" stop-color="${gold?'#ffd84a':'#ff8a1a'}"/><stop offset="1" stop-color="${gold?'#c87a10':'#a01a08'}"/></radialGradient>${BX.glow(id+'g','#ff4a1a',.6)}</defs>
   <mask id="${id}m"><ellipse cx="80" cy="150" rx="84" ry="70" fill="url(#${id}mg)"/></mask><radialGradient id="${id}mg"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#000"/></radialGradient>
   <g opacity=".75"><g mask="url(#${id}m)"><rect x="-4" y="80" width="168" height="160" fill="#2a0804"/>${scales}</g><circle cx="${cx}" cy="${cy}" r="86" fill="url(#${id}g)"/>
   <path d="M${cx-74} ${cy}Q${cx} ${cy-58} ${cx+74} ${cy}Q${cx} ${cy+58} ${cx-74} ${cy}Z" fill="#1a0402" stroke="#5a1408" stroke-width="4"/>
   <g><ellipse cx="${cx}" cy="${cy}" rx="40" ry="40" fill="url(#${id}i)"/>${[...Array(16)].map((_,k)=>{const [x,y]=BX.P(cx,cy,38,k*22.5);return`<line x1="${cx}" y1="${cy}" x2="${BX.f(x)}" y2="${BX.f(y)}" stroke="#7a2a08" stroke-width=".7" opacity=".6"/>`}).join('')}
    <ellipse cx="${cx}" cy="${cy}" rx="7" ry="34" fill="#0a0200"><animate attributeName="rx" values="7;3;7;7" keyTimes="0;.3;.6;1" dur="5s" repeatCount="indefinite"/></ellipse><ellipse cx="${cx-12}" cy="${cy-14}" rx="5" ry="3" fill="#fff" opacity=".6"/>
    <animateTransform attributeName="transform" type="translate" values="0 0;-6 0;-6 0;5 0;0 0" keyTimes="0;.2;.5;.7;1" dur="7s" repeatCount="indefinite"/></g>
   <path d="M${cx-74} ${cy}Q${cx} ${cy-58} ${cx+74} ${cy}" fill="none" stroke="#3a0a04" stroke-width="7"/>
   ${u>=2?`<circle cx="${cx}" cy="${cy}" r="${64+u*4}" fill="none" stroke="#ff6a1a" stroke-width="3" stroke-dasharray="10 6">${BX.spin(cx,cy,14)}</circle>`:''}${embers}</g>`},
/* ---------- Léviathane : les abysses et le serpent de mer ---------- */
66:u=>{const id='lb66'+u;const bub=[...Array(6+u*2)].map((_,k)=>`<circle r="${1+k%3}" fill="none" stroke="#a8fff0" stroke-width=".6"><animateMotion dur="${4+k%3}s" begin="${-k*.7}s" repeatCount="indefinite" path="M${(k*37)%160} 236Q${(k*23)%160+10} 120 ${(k*37)%160} -10"/></circle>`).join('');
  return`<defs><linearGradient id="${id}w" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a8a8a" stop-opacity=".7"/><stop offset=".6" stop-color="#063a40" stop-opacity=".8"/><stop offset="1" stop-color="#021418" stop-opacity=".9"/></linearGradient>
   <radialGradient id="${id}v" cx="50%" cy="45%"><stop offset="0" stop-color="#1a8a8a" stop-opacity=".75"/><stop offset=".65" stop-color="#063a40" stop-opacity=".7"/><stop offset="1" stop-color="#021418" stop-opacity="0"/></radialGradient>
   <linearGradient id="${id}r" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#c8fff6" stop-opacity=".45"/><stop offset="1" stop-color="#c8fff6" stop-opacity="0"/></linearGradient>
   <linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#0a4a4a"/><stop offset=".5" stop-color="#1a8a7a"/><stop offset="1" stop-color="#0a4a4a"/></linearGradient></defs>
   <g opacity=".78"><ellipse cx="80" cy="100" rx="86" ry="120" fill="url(#${id}v)"/>
   ${[[30,0],[70,8],[118,-4]].map(([x,o],k)=>`<path d="M${x} -8L${x+o-14} 180L${x+o+14} 180Z" fill="url(#${id}r)">${BX.tw(4+k,k,.3)}</path>`).join('')}
   <path d="M-6 150Q20 100 50 130Q80 160 110 120Q130 92 150 60Q160 44 172 50" stroke="url(#${id}s)" stroke-width="16" fill="none" stroke-linecap="round" opacity=".85"/>
   <path d="M-6 150Q20 100 50 130Q80 160 110 120Q130 92 150 60Q160 44 172 50" stroke="#2ad0b0" stroke-width="2" fill="none" stroke-dasharray="3 5" opacity=".7"/>
   ${[[44,122],[78,150],[112,116],[140,74]].map(([x,y])=>`<path d="M${x} ${y-6}l-5 -8l9 3Z" fill="#12a088"/>`).join('')}
   ${[0,1,2].map(k=>`<ellipse cx="80" cy="96" rx="${70-k*18}" ry="${18-k*4}" fill="none" stroke="#58e4d3" stroke-width="1.4" stroke-dasharray="14 8" opacity=".6">${BX.spin(80,96,6+k*3,k%2)}</ellipse>`).join('')}
   ${u>=2?[[24,60],[136,140],[30,190]].map(([x,y],k)=>`<g><path d="M${x} ${y}q6 -10 10 -14" stroke="#58e4d3" stroke-width=".8" fill="none"/><circle cx="${x+10}" cy="${y-14}" r="2.4" fill="#ffd84a">${BX.tw(1.6,k*.4,.3)}</circle></g>`).join(''):''}
   ${u>=3?`<g transform="translate(80 40)" opacity=".85"><path d="M0 -22V18M-10 -12V-20M10 -12V-20M-10 -12Q0 -2 10 -12" stroke="#ffd84a" stroke-width="2.4" fill="none" stroke-linecap="round"/>${BX.tw(2.2)}</g>`:''}${bub}</g>`}};
for(const k in LGB2)LGB[k]=LGB2[k];
/* ---------- Aléa (mythique) : la table du destin ---------- */
function aleaBG(u){const G='#ffd84a',P='#ff5ad8',id='lbal'+u,f=BX.f;
  const card=(x,y,rot,v,s,red,sc=1)=>`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})"><rect x="-10" y="-14" width="20" height="28" rx="2.6" fill="#fbf6ff" stroke="${G}" stroke-width="1.2"/><text x="-6.5" y="-6" font-size="6" font-weight="700" fill="${red?'#d1263b':'#140c24'}">${v}</text><text y="6" font-size="11" text-anchor="middle" fill="${red?'#d1263b':'#140c24'}">${s}</text></g>`;
  const fanN=u>=1?7:5,fan=[...Array(fanN)].map((_,k)=>{const a=-60+k*120/(fanN-1);const [x,y]=BX.P(80,98,62,a-90);return card(f(x),f(y),f(a),['10','V','D','R','A','A','R'][k],['♠','♠','♠','♠','♠','♥','♥'][k],k>=5,1.25)}).join('');
  const threads=[...Array(5+u*2)].map((_,k)=>`<path d="M80 98Q${(k*53)%160} ${(k*37)%80} ${(k*71)%170-5} ${k%2?-8:236}" stroke="${G}" stroke-width=".6" fill="none" stroke-dasharray="2 4" opacity=".7"><animate attributeName="stroke-dashoffset" values="0;-24" dur="${2+k%3}s" repeatCount="indefinite"/></path>`).join('');
  const suits=['♠','♥','♣','♦'].map((s,k)=>{const [x,y]=BX.P(80,90,u>=2?84:74,k*90-45);return`<text x="${f(x)}" y="${f(y+5)}" font-size="16" text-anchor="middle" fill="${k%2?P:G}" opacity=".8">${s}</text>`}).join('');
  return`<defs><radialGradient id="${id}g"><stop offset="0" stop-color="${u>=3?'#ff5ad8':'#7a3aff'}" stop-opacity=".55"/><stop offset="1" stop-color="#1a0a3a" stop-opacity="0"/></radialGradient></defs>
   <g class="albg" opacity=".8"><circle cx="80" cy="92" r="92" fill="url(#${id}g)"/>${threads}<g>${suits}${BX.spin(80,90,40)}</g>${u>=2?'':`<g>${fan}${BX.bob(2,4)}</g>`}
   ${u>=1&&u<2?`<ellipse cx="80" cy="214" rx="70" ry="14" fill="#0a4a2a" stroke="${G}" stroke-width="2"/>`:''}</g>`}
/* sur Aléa ultra II et III, la roulette (trop proche de Fortuna) devient la Roue du Destin : un cercle de cartes */
function aleaWheel(u){const G='#ffd84a';const n=u>=3?16:12;return`<g transform="translate(80 92)" opacity=".75"><g>${[...Array(n)].map((_,k)=>`<g transform="rotate(${k*360/n}) translate(0 -60)"><rect x="-7" y="-10" width="14" height="20" rx="2" fill="#2a0a4a" stroke="${G}" stroke-width="1"/><path d="M0 -6L3 0L0 6L-3 0Z" fill="${k%2?'#ff5ad8':G}"/></g>`).join('')}<circle r="46" fill="none" stroke="${G}" stroke-width="1.4" stroke-dasharray="2 3"/><circle r="22" fill="#140c24" stroke="${G}" stroke-width="2"/><text y="6" font-size="18" text-anchor="middle" fill="${G}">🂠</text><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="24s" repeatCount="indefinite"/></g></g>`}
{const hb=heroBody;heroBody=function(h,u=0){const s=hb.apply(this,arguments);try{if(!h||h.i!==ALEA||typeof s!=='string'||s.indexOf('albg')>=0)return s;let t=s;
   if(u>=2){const key='<g transform="translate(80 92)" opacity=".6">';if(t.indexOf(key)>=0){let ok;[t,ok]=kaiGRemove(t,key);if(ok)t=t.replace('@@W@@',aleaWheel(u))}}
   const a=t.indexOf('</defs>');if(a<0)return s;return t.slice(0,a+7)+aleaBG(u||0)+t.slice(a+7)}catch(e){return s}}}
(function(){try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)Object.keys(C).forEach(k=>{const i=+k.split('_')[0];if(LGB2[i]||i===ALEA)delete C[k]})}catch(e){}})();
