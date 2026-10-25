
/* ================= Éryndel et le Roi de Cendre : un vrai design à eux ================= */
/* Le jeune Éryndel : tunique ivoire et or, cape de plumes de hibou, pendentif du Cœur, épée d'argent.
   Le Roi de Cendre : armure d'obsidienne veinée de lave, ailes de plumes de hibou calcinées (les plumes des
   Gardiens qu'il a trahis), couronne de cendre en flammes, halo de runes, cape brûlée et l'épée de la Flamme volée. */
Object.assign(ERY_LOOK,['#f2d2b6','#e8c060','#f4ead8','#d8a830','#c89a40','#7a4a20','bg:dawn back:cape+sword hair:bangs hat:circlet eyes:normal mouth:smile body:tunic ear:human']);
Object.assign(ROI_LOOK,['#a8a09a','#2a2624','#1a1614','#3a302a','#4a1a0e','#ff6a1a','bg:ember back:cape+greatsword hb:long hair:wild hat:ashcrown face:soot eyes:glow mouth:neutral body:armor ear:human']);
HAT.ashcrown=L=>`<path d="M35 34L36 15L41.5 25L46 10L50 22L54 10L58.5 25L64 15L65 34Q50 37 35 34Z" fill="#14100e" stroke="#ff6a1a" stroke-width="1.1" stroke-linejoin="round"/><circle cx="50" cy="29" r="2.2" fill="#ff6a1a"><animate attributeName="fill" values="#ff6a1a;#fff2d0;#ff6a1a" dur="1.6s" repeatCount="indefinite"/></circle>`+
  [[36,15],[46,10],[54,10],[64,15],[50,22]].map(([x,y],i)=>`<path d="M${x} ${y+1}q${i%2?2.6:-2.6} -6 0 -10q${i%2?-3.4:3.4} 5 0 10Z" fill="${i%2?'#ffb21a':'#ff6a1a'}"><animate attributeName="opacity" values=".45;1;.45" dur="${.8+i*.18}s" repeatCount="indefinite"/></path>`).join('');
const ERYX={};try{for(const k of Object.keys(window.BODYC3||{}))if(/^20[12]_/.test(k))delete BODYC3[k];delete ERYC.eryndel;delete ERYC.roi}catch(e){}
function eryFeathers(side,col,tip,burn){/* une aile de plumes de hibou, ancrée à l'épaule */
  const sx=side<0?(burn?48:52):(burn?112:108),dir=side;let s='';
  for(let i=0;i<8;i++){const a=(burn?-108+i*12:-78+i*13)*dir,len=burn?84-i*5:62-i*4,w=burn?13-i*.6:12-i*.7;const rad=(a-90*dir)*Math.PI/180;
    s+=`<g transform="translate(${sx} 66) rotate(${(a).toFixed(1)})"><path d="M0 0Q${w} ${-len*.45} 0 ${-len}Q${-w} ${-len*.45} 0 0Z" fill="${col}" stroke="${burn?'#7a2a0a':'#0a0604'}" stroke-width="${burn?1.3:1}"/><path d="M0 -4V${-len+4}" stroke="${burn?'#2a1a10':'#c8b48a'}" stroke-width=".8"/>
     ${burn?`<path d="M${-w*.55} ${-len*.82}Q0 ${-len*1.02} ${w*.55} ${-len*.82}Q0 ${-len*.9} ${-w*.55} ${-len*.82}Z" fill="${tip}"><animate attributeName="opacity" values=".4;1;.4" dur="${1.2+i*.17}s" repeatCount="indefinite"/></path>`:`<path d="M${-w*.4} ${-len*.7}H${w*.4}M${-w*.45} ${-len*.5}H${w*.45}" stroke="${tip}" stroke-width=".8" opacity=".7"/>`}</g>`}
  return`<g>${s}<animateTransform attributeName="transform" type="rotate" values="0 ${sx} 66;${-3*dir} ${sx} 66;0 ${sx} 66" dur="4s" repeatCount="indefinite"/></g>`}
function roiBlade(){/* l'épée de la Flamme volée : lame d'obsidienne, cœur de lave, garde en ailes de hibou */
  return`<g><defs><linearGradient id="rbL" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#1a1210"/><stop offset=".5" stop-color="#3a2a24"/><stop offset="1" stop-color="#0a0604"/></linearGradient>
   <linearGradient id="rbC" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#fff2d0"/><stop offset=".4" stop-color="#ffb21a"/><stop offset="1" stop-color="#ff4a10"/></linearGradient></defs>
   <rect x="-1.8" y="-2" width="3.6" height="13" rx="1.4" fill="#2a1a10"/><circle cx="0" cy="12.5" r="3" fill="#ff6a1a" stroke="#1a0a04" stroke-width=".8"><animate attributeName="r" values="2.6;3.4;2.6" dur="1.4s" repeatCount="indefinite"/></circle>
   <path d="M-2 -4Q-12 -10 -15 -2Q-10 -4 -3 -2Z M2 -4Q12 -10 15 -2Q10 -4 3 -2Z" fill="#3a2a24" stroke="#ff6a1a" stroke-width=".8"/>
   <path d="M-4.6 -5L-4 -40L0 -50L4 -40L4.6 -5Z" fill="url(#rbL)" stroke="#0a0604" stroke-width=".8"/>
   <path d="M0 -6L-1 -38L0 -46L1 -38Z" fill="url(#rbC)"><animate attributeName="opacity" values=".7;1;.7" dur="1.1s" repeatCount="indefinite"/></path>
   <path d="M-4 -14l-2.5 -3M4 -22l2.5 -3M-4 -30l-2.5 -3" stroke="#ff8a3a" stroke-width=".9" opacity=".8"/>
   ${[0,1,2,3].map(i=>`<path d="M${i%2?3.8:-3.8} ${-12-i*8}q${i%2?5:-5} -5 ${i%2?2:-2} -11q${i%2?-1:1} 5 ${i%2?-2:2} 11Z" fill="${i%2?'#ffb21a':'#ff6a1a'}" opacity=".85"><animate attributeName="opacity" values=".3;.95;.3" dur="${.9+i*.25}s" repeatCount="indefinite"/></path>`).join('')}</g>`}
function eryxBuild(k,base){let s=base;if(!s)return s;
  if(k==='roi'){
    /* l'épée */
    try{let ok;[s,ok]=kaiGRemove(s,'translate(116.0 35.0) rotate(');if(ok)s=s.replace('@@W@@',`<g transform="translate(116 35) rotate(-14)">${roiBlade()}</g>`)}catch(e){}
    const back=`<g class="roibk"><defs><radialGradient id="rxH"><stop offset="0" stop-color="#ff8a3a" stop-opacity=".55"/><stop offset=".6" stop-color="#ff4a10" stop-opacity=".2"/><stop offset="1" stop-color="#ff4a10" stop-opacity="0"/></radialGradient></defs>
      <circle cx="80" cy="70" r="74" fill="url(#rxH)"><animate attributeName="r" values="68;78;68" dur="3.4s" repeatCount="indefinite"/></circle>
      <g><circle cx="80" cy="38" r="30" fill="none" stroke="#ff6a1a" stroke-width="1.4" stroke-dasharray="3 4" opacity=".8"/>${'ᚠᚱᚲᚷᚹᚺᚾᛁ'.split('').map((r,i)=>{const q=(i*45-90)*Math.PI/180;return`<text x="${(80+Math.cos(q)*30).toFixed(1)}" y="${(40.5+Math.sin(q)*30).toFixed(1)}" font-size="6" text-anchor="middle" fill="#ffb21a">${r}</text>`}).join('')}<animateTransform attributeName="transform" type="rotate" from="0 80 38" to="360 80 38" dur="18s" repeatCount="indefinite"/></g>
      ${eryFeathers(-1,'#2a2420','#ff6a1a',1)}${eryFeathers(1,'#2a2420','#ff6a1a',1)}
      <path d="M46 210Q40 150 54 90L106 90Q120 150 114 210Z" fill="#1a1210" opacity=".55"/></g>`;
    /* la couronne de cendre, les veines de lave, la cape qui brûle, les braises */
    const veins=`<g class="roiveins" fill="none" stroke-linecap="round"><path d="M80 74L76 86L82 96L78 108M70 80L64 92L68 104M90 80L96 92L92 104M74 118L80 126L86 118" stroke="#ff6a1a" stroke-width="1.3"><animate attributeName="stroke" values="#ff6a1a;#ffb21a;#ff6a1a" dur="1.8s" repeatCount="indefinite"/><animate attributeName="opacity" values=".55;1;.55" dur="1.8s" repeatCount="indefinite"/></path></g>`;
    const hem=`<g class="roihem">${[...Array(9)].map((_,i)=>`<path d="M${46+i*8.6} 206q${i%2?3:-3} -9 0 -16q${i%2?-4:4} 8 0 16Z" fill="${i%2?'#ffb21a':'#ff6a1a'}" opacity=".8"><animate attributeName="opacity" values=".3;.9;.3" dur="${.9+i*.13}s" repeatCount="indefinite"/></path>`).join('')}</g>`;
    const emb=[...Array(12)].map((_,i)=>`<circle r="${(1+i%3*.5).toFixed(1)}" fill="${i%3?'#ffb21a':'#ff6a1a'}"><animateMotion dur="${(3+i%4*.7).toFixed(1)}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite" path="M${30+i*9} 220Q${40+(i*13)%80} 120 ${20+(i*17)%120} -8"/><animate attributeName="opacity" values="0;1;0" dur="${(3+i%4*.7).toFixed(1)}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('');
    const a=s.indexOf('</defs>');if(a>=0)s=s.slice(0,a+7)+back+s.slice(a+7);
    s=s.replace(/<\/svg>\s*$/,veins+hem+emb+'</svg>')}
  else{
    /* Éryndel jeune : cape de plumes blanches, pendentif du Cœur, lumière d'aube */
    const back=`<g class="erybk"><defs><radialGradient id="exH"><stop offset="0" stop-color="#fff2c0" stop-opacity=".6"/><stop offset="1" stop-color="#fff2c0" stop-opacity="0"/></radialGradient></defs><circle cx="80" cy="60" r="70" fill="url(#exH)"/>
      ${eryFeathers(-1,'#f4ead8','#c8a860',0)}${eryFeathers(1,'#f4ead8','#c8a860',0)}</g>`;
    const pend=`<g class="erypend"><path d="M74 62Q80 70 86 62" stroke="#d8a830" stroke-width=".9" fill="none"/><g transform="translate(80 72)"><path d="M0 5C-6 1 -6 -4 -3 -5C-1.5 -5.6 -.4 -4.8 0 -3.6C.4 -4.8 1.5 -5.6 3 -5C6 -4 6 1 0 5Z" fill="#ff9ad0" stroke="#fff" stroke-width=".7"/><circle r="7" fill="#ffd0e8" opacity=".3"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/></circle></g></g>`;
    const a=s.indexOf('</defs>');if(a>=0)s=s.slice(0,a+7)+back+s.slice(a+7);
    s=s.replace(/<\/svg>\s*$/,pend+'</svg>')}
  return s}
{const eb=eryBody;eryBody=function(k){if(ERYX[k])return ERYX[k];try{delete ERYC[k]}catch(e){}const s=eb.apply(this,arguments);return ERYX[k]=eryxBuild(k,s)}}
/* le portrait du boss en combat : un vrai portrait, cadré sur le buste */
MONS['Éryndel, le Roi de Cendre']=()=>{let b='';try{b=eryBody('roi')}catch(e){}const inner=b.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  return`<rect width="100" height="100" fill="#1a0a04"/><svg x="0" y="0" width="100" height="100" viewBox="22 -8 116 116" preserveAspectRatio="xMidYMin slice">${inner}</svg>`};
MONS['Éryndel, le Porteur Brûlé']=()=>{let b='';try{b=eryBody('eryndel')}catch(e){}const inner=b.replace(/^<svg[^>]*>/,'').replace(/<\/svg>\s*$/,'');
  return`<rect width="100" height="100" fill="#3a2a14"/><svg x="0" y="0" width="100" height="100" viewBox="22 -8 116 116" preserveAspectRatio="xMidYMin slice">${inner}</svg><circle cx="50" cy="96" r="14" fill="#ffb03a" opacity=".5"><animate attributeName="r" values="10;16;10" dur="1.6s" repeatCount="indefinite"/></circle>`};
try{for(const k of Object.keys(PCACHE||{}))if(/Éryndel/.test(k))delete PCACHE[k]}catch(e){}
try{const P=PATCH.find(x=>x.v===32);if(P)P.items.push("👑 <b>Le Premier Porteur a un tout nouveau design</b> : le jeune Éryndel avec sa cape de plumes de hibou, et le Roi de Cendre avec ses ailes de plumes calcinées, son armure veinée de lave, sa couronne en feu et l'épée de la Flamme volée.")}catch(e){}

/* l'écran de chargement a été dessiné avant ce nouveau look : on le redessine */
(function(){try{if(BOOT.done)return;const b=document.getElementById('boot');const rr=b&&b.querySelector('.b2.bs3');if(!rr)return;const m=rr.querySelector('.bsmem');if(m)m.innerHTML=(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"')}catch(e){}})();
