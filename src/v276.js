
/* ================= saisons : hiver, printemps, été, automne ================= */
function seasonNow(d=new Date()){try{if(window.SEASON_TEST)return window.SEASON_TEST}catch(e){}const m=d.getMonth()+1,dd=d.getDate(),v=m*100+dd;return v>=1221||v<320?'hiver':v<621?'printemps':v<922?'ete':'automne'}
function isAutumn(){return seasonNow()==='automne'}
const SEAS={hiver:{ic:'❄️',n:'hiver'},printemps:{ic:'🌸',n:'printemps'},ete:{ic:'☀️',n:'été'},automne:{ic:'🍂',n:'automne'}};
const LTH0=JSON.parse(JSON.stringify(LTH));
const SPAL={
 hiver:{all:{hill:'#dfe8f4',tree:'#3a6a5a',g1:'#eef4fb',g2:'#f8fbff',g3:'#c8d4e4',mtn:'#9aa8cc',snow:'#ffffff'},trees:['#2e5e50','#3a6a5a','#456e60'],flower:['#e8f4ff','#ffffff','#d8e8ff']},
 printemps:{all:{hill:'#6ac060',tree:'#4a9a4a',g1:'#7cd06a',g2:'#8ee07a',g3:'#4a9a44'},trees:['#ffb0d0','#ff9ac0','#5aaa4a','#ffc8e0','#6ab85a'],flower:['#ff8ac0','#ffd84a','#ffffff','#b77dff','#8ad0ff']},
 ete:{all:{hill:'#5aa848',tree:'#2e8a3a',g1:'#72c050',g2:'#86d05e',g3:'#3e8a34',mtn:'#7a90c8'},trees:['#2e8a3a','#3a9a40','#28803a'],flower:['#ffd84a','#ff6a3a','#ffffff','#ff8ac0']}};
(function seasonPalette(){const se=seasonNow();if(se==='automne')return;const P=SPAL[se];if(!P)return;for(const t of Object.keys(LTH)){const base=LTH0[t]||LTH0.def;Object.assign(LTH[t],base);if(t==='top')Object.assign(LTH[t],{hill:P.all.hill,tree:P.all.tree,mtn:P.all.mtn||base.mtn});else Object.assign(LTH[t],P.all)}
  if(se==='hiver'&&LTH.top)Object.assign(LTH.top,{g1:'#e4e8f0',g2:'#eef2f8',g3:'#b8c0d0'})})();
function seasonDeco(se,tab,places){const R=rng(tab.length*91+se.length);let o='';const free=x=>places.every(p=>Math.abs(p.x-x)>(p.bw||70)*(p.s||1)/2+8);
  const snowman=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-6" r="6" fill="#fff" stroke="#140c24" stroke-width="1"/><circle cx="0" cy="-15" r="4.4" fill="#fff" stroke="#140c24" stroke-width="1"/><path d="M0 -15l4 1l-4 1z" fill="#ff8a1a"/><circle cx="-1.5" cy="-16.5" r=".7" fill="#140c24"/><circle cx="1.5" cy="-16.5" r=".7" fill="#140c24"/><path d="M-4 -11h8" stroke="#d1263b" stroke-width="1.6"/></g>`;
  const sunflower=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 0V-14" stroke="#3a7a2a" stroke-width="1.4"/>${[...Array(8)].map((_,i)=>`<ellipse cx="0" cy="-18" rx="1.6" ry="3.4" fill="#ffd84a" transform="rotate(${i*45} 0 -14)"/>`).join('')}<circle cx="0" cy="-14" r="2.4" fill="#6a3a1a"/></g>`;
  const tulip=(x,y,c)=>`<path d="M${x} ${y}V${y-7}" stroke="#3a7a2a" stroke-width="1"/><path d="M${x-2.2} ${y-9}Q${x} ${y-5} ${x+2.2} ${y-9}L${x+1} ${y-7}L${x} ${y-9}L${x-1} ${y-7}Z" fill="${c}"/>`;
  for(let k=0;k<14;k++){const x=Math.round(R()*390+5),y=Math.round(198+R()*38);if(!free(x))continue;const r=R();
    if(se==='hiver')o+=r<.3?snowman(x,y,.9):`<ellipse cx="${x}" cy="${y}" rx="${(6+R()*8).toFixed(1)}" ry="2.4" fill="#fff" opacity=".9"/>`;
    else if(se==='printemps')o+=tulip(x,y,SPAL.printemps.flower[k%5])+tulip(x+4,y+1,SPAL.printemps.flower[(k+2)%5]);
    else if(se==='ete')o+=r<.45?sunflower(x,y,.9):tulip(x,y,'#ff6a3a')}
  /* particules saisonnières */
  for(let i=0;i<(se==='hiver'?16:se==='printemps'?10:0);i++){const x=Math.round(R()*400),b=(R()*8).toFixed(1),d=(6+R()*5).toFixed(1);
    if(se==='hiver')o+=`<circle r="${(1+R()*1.3).toFixed(1)}" fill="#fff" opacity=".9"><animateMotion dur="${d}s" begin="${b}s" repeatCount="indefinite" path="M${x} -10q14 60 -8 120t8 130"/></circle>`;
    else o+=`<ellipse rx="2.2" ry="1.2" fill="#ffb0d0"><animateMotion dur="${d}s" begin="${b}s" repeatCount="indefinite" path="M${x} -10q24 40 -10 90t14 90t-10 80"/><animateTransform attributeName="transform" type="rotate" values="0;360" dur="2s" repeatCount="indefinite"/></ellipse>`}
  if(se==='ete')for(let i=0;i<6;i++){const x=Math.round(R()*400),y=Math.round(150+R()*70);o+=`<circle cx="${x}" cy="${y}" r="1.4" fill="#fff6a0" opacity="0">${AN('opacity','0;.9;0','3',`begin="${(R()*3).toFixed(1)}s"`)}</circle>`}
  return`<g class="lbseason">${o}</g>`}
{const l4=lbScene2;lbScene2=function(tab,places,E){let v=l4.apply(this,arguments);const se=seasonNow();if(se==='automne')return v;const P=SPAL[se];if(!P)return v;try{let n=0;
  const tc=thOf(tab).tree;v=v.split(`fill="${tc}"`).map((x,i,a)=>i<a.length-1?x+`fill="${P.trees[(n++)%P.trees.length]}"`:x).join('');
  v=v.replace(/<circle cx="([\d.]+)" cy="([\d.]+)" r="1\.8" fill="(#ff6a8a|#ffd84a|#ffffff|#b77dff)"\/>/g,(m,x,y)=>`<circle cx="${x}" cy="${y}" r="1.8" fill="${P.flower[(n++)%P.flower.length]}"/>`);
  if(se==='hiver')v=v.replace(/fill="#8ad07a"/g,'fill="#ffffff"').replace(/#4a9a4a/g,'#dfe8f4').replace(/stroke="#3a7a3a"/g,'stroke="#9aa8b8"');
  v=v.replace(/<\/svg>\s*$/,seasonDeco(se,tab,places.filter(p=>!p.sky))+'</svg>')}catch(e){}return v}}
{const lp=lobbyPage;lobbyPage=function(tab,extra){const h=lp.apply(this,arguments);const s=SEAS[seasonNow()];return s?h.replace('<span class="lphase">',`<span class="lphase">${s.ic} ${s.n}</span><span class="lphase">`):h}}
try{LSC2.clear()}catch(e){}
{const lb=lobbyBlock;lobbyBlock=function(tab){const h=lb.apply(this,arguments);return seasonNow()==='automne'?h:h.replace(/<i class="leaf"[^>]*><\/i>/g,'')}}
