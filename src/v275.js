
/* ================= fête foraine animée, animation automatique des bâtiments, décor d'automne ================= */
LBA.bulbs=()=>{let o='';for(let x=-34,i=0;x<=34;x+=8.5,i++)o+=`<circle cx="${x}" cy="-56" r="2.6" fill="${i%2?'#ffd84a':'#fff6c0'}">${AN('opacity',i%2?'1;.15;1':'.15;1;.15','.8')}</circle>`;return o+`<circle cx="0" cy="-30" r="22" fill="#ffd84a" opacity=".08">${AN('opacity','.04;.16;.04','1.6')}</circle>`};
LBA.ghost=()=>`<g opacity=".85"><path d="M-6 0Q-6 -12 0 -12Q6 -12 6 0L4 -2L2 0L0 -2L-2 0L-4 -2Z" fill="#f4f0ff"/><circle cx="-2" cy="-7" r="1" fill="#140c24"/><circle cx="2" cy="-7" r="1" fill="#140c24"/><animateMotion dur="7s" repeatCount="indefinite" path="M-40 -60q20 -20 40 -6t40 -10q-10 20 -40 14t-40 2z"/>${AN('opacity','.2;.9;.2','3.5')}</g>`;
LBA.winFlick=(pts,c='#ff9a2a')=>pts.map(([x,y,w,h],i)=>`<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="2" fill="${c}" opacity=".0">${AN('opacity','0;.55;.1;.7;0','2.6',`begin="${i*.7}s"`)}</rect>`).join('');
LBA.petals=(w,h)=>{let o='';for(let i=0;i<6;i++){const x=(Math.random()*w-w/2).toFixed(0),b=(i*.8).toFixed(1);o+=`<ellipse cx="${x}" cy="${-h}" rx="2" ry="1.2" fill="#ff8ac0">${AN('cy',`${-h};2`,'4',`begin="${b}s"`)}${AN('cx',`${x};${+x+10};${+x-6}`,'4',`begin="${b}s"`)}${AN('opacity','0;1;0','4',`begin="${b}s"`)}</ellipse>`}return o};
LBA.sway=(w,h)=>`<g opacity=".0">${AN('opacity','0;.35;0','3')}<ellipse cx="0" cy="${-h*.5}" rx="${w*.45}" ry="${h*.5}" fill="#fff6c0"/></g>`;
/* chaque bâtiment a son animation ; un bâtiment inconnu (nouveau) en reçoit une automatiquement */
function lbAnimFor(p,E){const k=p.k,s=p.s||1,bw=p.bw||70,bh=p.bh||60;let a='';
  if(k==='monde')a=LBA.fountain();
  else if(k==='inv')a=LBA.smoke(24,-90,'#9a9098')+LBA.embers(22,-86);
  else if(k==='flash')a=LBA.clock();
  else if(k==='arena')a=LBA.flags([[-40,-72],[0,-76],[40,-72]]);
  else if(k==='raid')a=LBA.eyes()+LBA.embers(-22,-12)+LBA.embers(22,-12);
  else if(k==='mp')a=LBA.pigeons(bh);
  else if(k==='pass')a=LBA.flags([[0,-80]],'#ffd84a')+LBA.glints(80,62,3);
  else if(k==='cas')a=LBA.bulbs()+LBA.glints(76,52,2);
  else if(k==='hw')a=LBA.winFlick([[-26,-38,10,12],[16,-38,10,12]])+LBA.ghost()+LBA.smoke(22,-84,'#6a5a8a');
  else if(k==='rose')a=LBA.petals(80,64)+LBA.glints(80,48,2);
  else if(k==='av')a='';
  else if(k==='boss')a=LBA.flags([[-44,-110],[44,-110]],'#ffd84a')+LBA.glints(bw,bh,2);
  else if(['amis','chat','shop','poste','col','teams'].includes(k))a=LBA.smoke(bw*.22,-bh-4);
  else if(['hall','ach','meta','rank','mk'].includes(k))a=LBA.glints(bw,bh,3);
  else a=LBA.glints(bw,bh,3)+LBA.sway(bw*.6,bh);
  if(!a)return'';return`<g transform="translate(${p.x} ${p.y}) scale(${s})" class="lban">${a}</g>`}
/* ---------- automne ---------- */
function isAutumn(d=new Date()){const m=d.getMonth(),dd=d.getDate();return(m===8&&dd>=22)||m===9||m===10||(m===11&&dd<21)}
if(isAutumn()){try{
  Object.assign(LTH.def,{hill:'#a8763a',tree:'#c8601e',g1:'#b8a050',g2:'#c8ac5c',g3:'#8a6a30',mtn:'#8a80a8'});
  Object.assign(LTH.boss,{hill:'#9a6a34',tree:'#b84a1a',g1:'#aa9048',g2:'#bca058',g3:'#7a5a2a'});
  Object.assign(LTH.event,{hill:'#a06a34',tree:'#c8501a',g1:'#b09a48',g2:'#c2aa58',g3:'#86642a',mtn:'#7a70a8'});
  Object.assign(LTH.top,{hill:'#a8763a',tree:'#c8601e'});
  for(const t of Object.keys(LTH))if(!['def','boss','event','top'].includes(t))Object.assign(LTH[t],{hill:'#a8763a',tree:'#c8601e',g1:'#b8a050',g2:'#c8ac5c',g3:'#8a6a30'})}catch(e){}}
const AUT_TREES=['#c8501a','#e08a2a','#b8302a','#d8a83a','#a8401a'];
function autumnDeco(tab,places){const R=rng(tab.length*71+5);let o='';const free=x=>places.every(p=>Math.abs(p.x-x)>(p.bw||70)*(p.s||1)/2+8);
  const pump=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="-5" rx="7" ry="5.5" fill="#ff8a1a" stroke="#140c24" stroke-width="1"/><path d="M-3 -10Q-3 -2 -3 0M3 -10Q3 -2 3 0" stroke="#c85a0a" stroke-width="1"/><path d="M0 -10L1 -14" stroke="#4a7a2a" stroke-width="1.6"/></g>`;
  const hay=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-12" width="20" height="12" rx="3" fill="#e8c060" stroke="#140c24" stroke-width="1"/><path d="M-10 -8H10M-10 -4H10" stroke="#c89a3a" stroke-width="1"/></g>`;
  const mush=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><rect x="-1.4" y="-5" width="2.8" height="5" fill="#f4ecd8"/><path d="M-5 -5Q0 -11 5 -5Z" fill="#d1263b" stroke="#140c24" stroke-width=".8"/><circle cx="-1.5" cy="-7" r=".8" fill="#fff"/><circle cx="2" cy="-6.5" r=".7" fill="#fff"/></g>`;
  const pile=(x,y)=>[...Array(7)].map((_,i)=>`<ellipse cx="${(x+R()*14-7).toFixed(1)}" cy="${(y-R()*3).toFixed(1)}" rx="2.6" ry="1.3" fill="${AUT_TREES[i%5]}" transform="rotate(${Math.round(R()*180)} ${x} ${y})"/>`).join('');
  for(let k=0;k<14;k++){const x=Math.round(R()*390+5),y=Math.round(196+R()*40);if(!free(x))continue;const r=R();o+=r<.3?pump(x,y,.8+R()*.4):r<.45?hay(x,y,.8):r<.65?mush(x,y,.9):pile(x,y)}
  /* feuilles qui tombent */
  for(let i=0;i<9;i++){const x=Math.round(R()*400),b=(R()*8).toFixed(1),d=(7+R()*5).toFixed(1),c=AUT_TREES[i%5];o+=`<path d="M0 -3Q3 0 0 3Q-3 0 0 -3Z" fill="${c}"><animateMotion dur="${d}s" begin="${b}s" repeatCount="indefinite" path="M${x} -10q20 40 -10 80t10 90t-6 70"/><animateTransform attributeName="transform" type="rotate" values="0;360" dur="2.4s" repeatCount="indefinite"/></path>`}
  return`<g class="lbaut">${o}</g>`}
{const l3=lbScene2;lbScene2=function(tab,places,E){let v=l3.apply(this,arguments);if(!isAutumn())return v;try{let n=0;v=v.replace(/fill="#8ad07a"/g,'fill="#ffd36a"').replace(/#4a9a4a/g,'#b8701e');const tc=thOf(tab).tree;v=v.split(`fill="${tc}"`).map((x,i,a)=>i<a.length-1?x+`fill="${AUT_TREES[(n++)%AUT_TREES.length]}"`:x).join('');
  v=v.replace(/<circle cx="([\d.]+)" cy="([\d.]+)" r="1\.8" fill="(#ff6a8a|#ffd84a|#ffffff|#b77dff)"\/>/g,(m,x,y)=>`<ellipse cx="${x}" cy="${y}" rx="2.4" ry="1.3" fill="${AUT_TREES[(n++)%5]}"/>`).replace(/stroke="#3a7a3a"/g,'stroke="#8a6a2a"');
  v=v.replace(/<\/svg>\s*$/,autumnDeco(tab,places.filter(p=>!p.sky))+'</svg>')}catch(e){}return v}}
try{LSC2.clear()}catch(e){}
