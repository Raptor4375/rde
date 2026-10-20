
/* ================= lobbys vivants : fontaine qui coule, fumées, oiseaux, nuages, papillons… ================= */
const AN=(a,v,d,ex='')=>`<animate attributeName="${a}" values="${v}" dur="${d}s" repeatCount="indefinite" ${ex}/>`;
const LBA={
 fountain(){let o='';
  for(const [d,dl] of [['M0 -42Q-11 -62 -17 -42',0],['M0 -42Q11 -62 17 -42',.2],['M0 -42L0 -64',.1]])o+=`<path d="${d}" fill="none" stroke="#e8fdff" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="3 5" opacity=".9">${AN('stroke-dashoffset','16;0','.55',`begin="${dl}s"`)}</path>`;
  for(let i=0;i<6;i++){const x=i%2?17:-17,b=(i*.27).toFixed(2);o+=`<circle cx="${x}" cy="-42" r="1.3" fill="#c8f8ff">${AN('cy','-42;-12','.7',`begin="${b}s"`)}${AN('opacity','1;0','.7',`begin="${b}s"`)}</circle>`}
  for(let i=0;i<5;i++){const b=(i*.18).toFixed(2),a=(i/5*6.28);o+=`<circle cx="0" cy="-64" r="1.2" fill="#fff">${AN('cx',`0;${(Math.cos(a)*9).toFixed(1)}`,'.9',`begin="${b}s"`)}${AN('cy',`-64;${(-60+Math.abs(Math.sin(a))*6).toFixed(1)}`,'.9',`begin="${b}s"`)}${AN('opacity','1;0','.9',`begin="${b}s"`)}</circle>`}
  for(const [x,b] of [[-17,0],[17,.6],[0,1.1],[-28,1.6],[26,2.1]])o+=`<ellipse cx="${x}" cy="-8.5" rx="2" ry=".8" fill="none" stroke="#e8fdff" stroke-width=".8">${AN('rx','2;12','1.6',`begin="${b}s"`)}${AN('ry','.8;3.2','1.6',`begin="${b}s"`)}${AN('opacity','.9;0','1.6',`begin="${b}s"`)}</ellipse>`;
  o+=`<ellipse cx="-10" cy="-9.5" rx="10" ry="1.6" fill="#fff" opacity=".3">${AN('opacity','.15;.45;.15','2.4')}${AN('cx','-14;8;-14','6')}</ellipse>`;return o},
 smoke(x,y,c='#d8d0e0'){let o='';for(let i=0;i<4;i++){const b=(i*.9).toFixed(1);o+=`<circle cx="${x}" cy="${y}" r="3" fill="${c}" opacity="0">${AN('cy',`${y};${y-34}`,'3.6',`begin="${b}s"`)}${AN('cx',`${x};${x+8};${x+3}`,'3.6',`begin="${b}s"`)}${AN('r','3;9','3.6',`begin="${b}s"`)}${AN('opacity','0;.55;0','3.6',`begin="${b}s"`)}</circle>`}return o},
 embers(x,y){let o='';for(let i=0;i<6;i++){const b=(i*.45).toFixed(2),dx=(Math.random()*16-8).toFixed(1);o+=`<circle cx="${x}" cy="${y}" r="1.1" fill="#ffb03a">${AN('cy',`${y};${y-30}`,'1.8',`begin="${b}s"`)}${AN('cx',`${x};${x+ +dx}`,'1.8',`begin="${b}s"`)}${AN('opacity','1;0','1.8',`begin="${b}s"`)}</circle>`}return o},
 clock(){return`<circle cx="0" cy="-74" r="10.4" fill="#fff6e0"/><g><path d="M0 -74L0 -82" stroke="#140c24" stroke-width="1.8" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0 0 -74" to="360 0 -74" dur="60s" repeatCount="indefinite"/></g><g><path d="M0 -74L0 -84" stroke="#d1263b" stroke-width="1" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0 0 -74" to="360 0 -74" dur="4s" repeatCount="indefinite"/></g><circle cx="0" cy="-74" r="1.4" fill="#140c24"/>`},
 flags(pts,c='#ff5d6c'){return pts.map(([x,y])=>`<path d="M${x} ${y}L${x+12} ${y+4}L${x} ${y+8}Z" fill="${c}" stroke="#140c24" stroke-width=".8">${AN('d',`M${x} ${y}L${x+12} ${y+4}L${x} ${y+8}Z;M${x} ${y}Q${x+6} ${y+3} ${x+12} ${y+2}Q${x+7} ${y+6} ${x} ${y+8}Z;M${x} ${y}Q${x+6} ${y+1} ${x+12} ${y+6}Q${x+5} ${y+5} ${x} ${y+8}Z;M${x} ${y}L${x+12} ${y+4}L${x} ${y+8}Z`,'1.4')}</path>`).join('')},
 glints(w,h,n=3){let o='';for(let i=0;i<n;i++){const x=((i+.5)/n*w-w/2).toFixed(0),y=(-h*.3-i*h*.2).toFixed(0),b=(i*1.1).toFixed(1);o+=`<path d="M${x} ${y-4}L${+x+1} ${y-1}L${+x+4} ${y}L${+x+1} ${+y+1}L${x} ${+y+4}L${x-1} ${+y+1}L${x-4} ${y}L${x-1} ${y-1}Z" fill="#fff" opacity="0">${AN('opacity','0;1;0','2.4',`begin="${b}s"`)}</path>`}return o},
 eyes(){return`<g opacity="0">${AN('opacity','0;0;1;0;0','4',`keyTimes="0;.9;.93;.96;1"`)}<ellipse cx="-8" cy="-24" rx="4.6" ry="3" fill="#120818"/><ellipse cx="8" cy="-24" rx="4.6" ry="3" fill="#120818"/></g><circle cx="0" cy="-22" r="28" fill="#ff3a1a" opacity=".1">${AN('opacity','.06;.2;.06','2.2')}</circle>`},
 pigeons(h){let o='';for(let i=0;i<3;i++){const r=18+i*6,b=(i*1.3).toFixed(1);o+=`<path d="M-3 0q1.5 -2 3 0q1.5 -2 3 0" fill="none" stroke="#f4f0ff" stroke-width="1.3"><animateMotion dur="${5+i}s" begin="${b}s" repeatCount="indefinite" path="M0 ${-h-10}a${r} ${r*.45} 0 1 1 0.1 0"/></path>`}return o}};
function lbAnimFor(p,E){const k=p.k,s=p.s||1,bw=p.bw||70,bh=p.bh||60;let a='';
  if(k==='monde')a=LBA.fountain();
  else if(k==='inv')a=LBA.smoke(24,-90,'#9a9098')+LBA.embers(22,-86);
  else if(k==='flash')a=LBA.clock();
  else if(k==='arena')a=LBA.flags([[-40,-72],[0,-76],[40,-72]]);
  else if(k==='raid')a=LBA.eyes()+LBA.embers(-22,-12)+LBA.embers(22,-12);
  else if(k==='mp')a=LBA.pigeons(bh);
  else if(['amis','chat','shop','poste','col','teams'].includes(k))a=LBA.smoke(bw*.22,-bh-4);
  else if(['hall','ach','meta','rank','mk'].includes(k))a=LBA.glints(bw,bh,3);
  if(!a)return'';return`<g transform="translate(${p.x} ${p.y}) scale(${s})" class="lban">${a}</g>`}
function lbSkyAnim(E){const night=E&&E.dark>.5;let o='';
  /* nuages qui dérivent */
  for(let i=0;i<3;i++){const y=22+i*20,d=70+i*25,b=-(i*30);o+=`<g opacity="${night?.25:.75}"><ellipse cx="0" cy="${y}" rx="${22+i*4}" ry="7" fill="#fff"/><ellipse cx="${10+i}" cy="${y-5}" rx="13" ry="7" fill="#fff"/><ellipse cx="-10" cy="${y-3}" rx="10" ry="5" fill="#fff"/><animateTransform attributeName="transform" type="translate" values="-60 0;460 0" dur="${d}s" begin="${b}s" repeatCount="indefinite"/></g>`}
  /* oiseaux (le jour) ou chauves-souris (la nuit) qui passent de temps en temps */
  const fl=(x,y,sc,dl)=>night?`<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-6 0q3 -4 6 0q3 -4 6 0q-3 2 -6 1q-3 1 -6 -1Z" fill="#140a1e">${AN('d','M-6 0q3 -4 6 0q3 -4 6 0q-3 2 -6 1q-3 1 -6 -1Z;M-6 -2q3 2 6 2q3 0 6 -2q-3 3 -6 3q-3 0 -6 -3Z;M-6 0q3 -4 6 0q3 -4 6 0q-3 2 -6 1q-3 1 -6 -1Z','.3')}</path></g>`
    :`<g transform="translate(${x} ${y}) scale(${sc})"><path d="M-6 0q3 -4 6 0q3 -4 6 0" fill="none" stroke="#2a2a4a" stroke-width="1.4" stroke-linecap="round">${AN('d','M-6 0q3 -4 6 0q3 -4 6 0;M-6 -1q3 3 6 1q3 2 6 -1;M-6 0q3 -4 6 0q3 -4 6 0','.45')}</path></g>`;
  o+=`<g><animateMotion dur="22s" repeatCount="indefinite" path="M-60 50Q120 20 220 46T480 30" begin="2s"/>${fl(0,0,1,0)}${fl(-14,6,.8,0)}${fl(-12,-7,.75,0)}${fl(-26,2,.7,0)}${fl(-24,-10,.65,0)}</g>`;
  o+=`<g><animateMotion dur="30s" repeatCount="indefinite" path="M470 70Q300 40 180 66T-80 54" begin="9s"/>${fl(0,0,.9,0)}${fl(12,5,.75,0)}${fl(11,-6,.7,0)}</g>`;
  /* papillons dans l'herbe le jour */
  if(!night)for(let i=0;i<3;i++){const cx=60+i*130,c=['#ff8ac0','#ffd84a','#8ad0ff'][i];o+=`<g><animateMotion dur="${9+i*2}s" repeatCount="indefinite" path="M${cx} 205q20 -18 40 0t-40 10q-24 -8 -20 -24t20 14z"/><path d="M0 0q-4 -4 -5 0q1 3 5 0q4 -4 5 0q-1 3 -5 0" fill="${c}"><animateTransform attributeName="transform" type="scale" values="1 1;.3 1;1 1" dur=".25s" repeatCount="indefinite"/></path></g>`}
  return`<g class="lbsky">${o}</g>`}
{const l2=lbScene2;lbScene2=function(tab,places,E){const v=l2.apply(this,arguments);try{const anim=places.filter(p=>!p.sky).map(p=>lbAnimFor(p,E)).join('');let out=v.replace(/<\/svg>\s*$/,anim+'</svg>');const sk=lbSkyAnim(E),i=out.indexOf('fill="url(#zsky'+tab+')"/>');if(i>0){const j=i+('fill="url(#zsky'+tab+')"/>').length;out=out.slice(0,j)+sk+out.slice(j)}return out}catch(e){return v}}}
try{LSC2.clear()}catch(e){}
