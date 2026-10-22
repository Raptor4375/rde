
/* ================= Kaïros, Maître du Temps : horloges, sablier et grande aiguille ================= */
const KAI=HEROES.findIndex(h=>h&&/^Kaïros/.test(h.n));
function kaiGRemove(s,key){const i=s.indexOf(key);if(i<0)return[s,false];const st=s.lastIndexOf('<g',i);const re=/<g\b|<\/g>/g;re.lastIndex=st;let d=0,m,end=-1;while((m=re.exec(s))){if(m[0]==='<g')d++;else{d--;if(!d){end=m.index+4;break}}}if(end<0)return[s,false];return[s.slice(0,st)+'@@W@@'+s.slice(end),true]}
function kaiClock(cx,cy,r,id,c,dur,op=1,num=true){
  const ticks=[...Array(12)].map((_,k)=>{const a=k*30*Math.PI/180,x1=cx+Math.sin(a)*r*.78,y1=cy-Math.cos(a)*r*.78,x2=cx+Math.sin(a)*r*.9,y2=cy-Math.cos(a)*r*.9;return`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="${c.t}" stroke-width="${k%3?r*.03:r*.065}" stroke-linecap="round"/>`}).join('');
  const nums=num?['XII','III','VI','IX'].map((t,k)=>{const a=k*90*Math.PI/180;return`<text x="${(cx+Math.sin(a)*r*.6).toFixed(1)}" y="${(cy-Math.cos(a)*r*.6+r*.08).toFixed(1)}" font-size="${(r*.2).toFixed(1)}" font-family="Georgia,serif" font-weight="700" text-anchor="middle" fill="${c.t}">${t}</text>`}).join(''):'';
  return`<g opacity="${op}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#${id}f)" stroke="${c.rim}" stroke-width="${r*.09}"/><circle cx="${cx}" cy="${cy}" r="${r*.94}" fill="none" stroke="${c.t}" stroke-width="${r*.02}" opacity=".7"/>${ticks}${nums}
   <g><line x1="${cx}" y1="${cy}" x2="${cx}" y2="${cy-r*.5}" stroke="${c.h}" stroke-width="${r*.07}" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur*12}s" repeatCount="indefinite"/></g>
   <g><line x1="${cx}" y1="${cy+r*.1}" x2="${cx}" y2="${cy-r*.75}" stroke="${c.h}" stroke-width="${r*.045}" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0 ${cx} ${cy}" to="360 ${cx} ${cy}" dur="${dur}s" repeatCount="indefinite"/></g>
   <circle cx="${cx}" cy="${cy}" r="${r*.07}" fill="${c.rim}"/></g>`}
function kaiHand(id,len){/* la grande aiguille d'horloge, tenue comme une lance (repère local : pointe vers le haut) */
  return`<g class="kaiw"><rect x="-1.7" y="-4" width="3.4" height="16" rx="1.4" fill="#3a2414"/><circle cx="0" cy="13" r="2.6" fill="url(#${id}g)" stroke="#5a3a08" stroke-width=".6"/>
   <rect x="-6" y="-6.5" width="12" height="3" rx="1.4" fill="url(#${id}g)" stroke="#5a3a08" stroke-width=".5"/>
   <path d="M-1.6 -6L-1.2 -${len*.55}L1.2 -${len*.55}L1.6 -6Z" fill="url(#${id}g)" stroke="#5a3a08" stroke-width=".5"/>
   <circle cx="0" cy="-${len*.62}" r="${len*.09}" fill="none" stroke="url(#${id}g)" stroke-width="2.4"/><circle cx="0" cy="-${len*.62}" r="${len*.09}" fill="none" stroke="#5a3a08" stroke-width=".4"/>
   <path d="M0 -${len*.53}L${len*.05} -${len*.62}L0 -${len*.71}L-${len*.05} -${len*.62}Z" fill="#6affe0" opacity=".9"/>
   <path d="M-1.2 -${len*.7}L-1 -${len*.82}L-${len*.085} -${len*.84}L0 -${len}L${len*.085} -${len*.84}L1 -${len*.82}L1.2 -${len*.7}Z" fill="url(#${id}g)" stroke="#5a3a08" stroke-width=".6"/>
   <path d="M0 -${len*.97}L0 -${len*.56}" stroke="#fff" stroke-width=".6" opacity=".6"/>
   <circle cx="0" cy="-${len}" r="1.6" fill="#fff"><animate attributeName="opacity" values=".2;1;.2" dur="2.4s" repeatCount="indefinite"/></circle></g>`}
function kaiWatch(id){/* montre à gousset dans l'autre main */
  return`<g class="kaiw"><path d="M0 0Q-3 -8 0 -14" stroke="#e8c24a" stroke-width="1" fill="none" stroke-dasharray="1.6 1"/><g transform="translate(0 6)"><animateTransform attributeName="transform" type="rotate" values="-14 0 -14;14 0 -14;-14 0 -14" dur="2s" repeatCount="indefinite" additive="sum"/>
   <circle cx="0" cy="0" r="7.2" fill="url(#${id}g)" stroke="#5a3a08" stroke-width=".7"/><circle cx="0" cy="0" r="5.6" fill="#fff8e0"/><circle cx="0" cy="-8" r="1.5" fill="url(#${id}g)"/>
   <g><line x1="0" y1="0" x2="0" y2="-4.4" stroke="#3a2414" stroke-width=".8" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="4s" repeatCount="indefinite"/></g><line x1="0" y1="0" x2="2.6" y2="0" stroke="#3a2414" stroke-width="1" stroke-linecap="round"/></g></g>`}
function kaiDecor(u){const id='kx'+u,gold=u?'#ffd84a':'#e8c24a';
  const C={rim:u?'#ffd84a':'#c9a24a',t:u?'#fff3c0':'#bfeee6',h:u?'#fff':'#6affe0'};
  const defs=`<defs><radialGradient id="${id}f" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="${u?'#fff1c0':'#2a6a72'}" stop-opacity="${u?.5:.55}"/><stop offset="1" stop-color="${u?'#7a2a10':'#140c3a'}" stop-opacity=".25"/></radialGradient>
   <linearGradient id="${id}g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff2b0"/><stop offset=".45" stop-color="${gold}"/><stop offset="1" stop-color="#9a6a14"/></linearGradient>
   <linearGradient id="${id}s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe9a0"/><stop offset="1" stop-color="#d08a2a"/></linearGradient></defs>`;
  /* la grande horloge derrière lui */
  const back=`<g class="kaibk">${kaiClock(80,84,u>=2?66:58,id,C,u>=3?20:40,u?.55:.5)}${u>=2?`<circle cx="80" cy="84" r="${u>=3?76:70}" fill="none" stroke="${gold}" stroke-width=".8" stroke-dasharray="2 5" opacity=".7"><animateTransform attributeName="transform" type="rotate" from="360 80 84" to="0 80 84" dur="30s" repeatCount="indefinite"/></circle>`:''}</g>`;
  /* petites horloges et sablier qui flottent autour */
  const sm=[[18,40,9,7],[142,52,8,9],[14,150,7,6],[146,150,9,11]].slice(0,u>=1?4:3).map(([x,y,r,d],k)=>`<g><animateTransform attributeName="transform" type="translate" values="0 0;0 -4;0 0" dur="${3+k*.7}s" repeatCount="indefinite"/>${kaiClock(x,y,r,id,C,d,.95,false)}</g>`).join('');
  const hg=`<g transform="translate(130 104)"><animateTransform attributeName="transform" type="rotate" values="0 130 104;180 130 104;180 130 104;360 130 104" keyTimes="0;.15;.85;1" dur="8s" repeatCount="indefinite" additive="sum"/>
    <path d="M-6 -9H6M-6 9H6" stroke="${gold}" stroke-width="1.6" stroke-linecap="round"/><path d="M-5 -8Q-5 -2 0 0Q-5 2 -5 8H5Q5 2 0 0Q5 -2 5 -8Z" fill="rgba(200,240,255,.35)" stroke="${gold}" stroke-width=".8"/>
    <path d="M-3.4 -6.6H3.4Q3 -2 0 -.6Q-3 -2 -3.4 -6.6Z" fill="url(#${id}s)"><animate attributeName="opacity" values="1;0;0;1" keyTimes="0;.15;.85;1" dur="8s" repeatCount="indefinite"/></path>
    <path d="M-3.8 7.4H3.8Q2 3 0 2.4Q-2 3 -3.8 7.4Z" fill="url(#${id}s)"/></g>`;
  const front=`<g class="kaifr">${sm}${hg}</g>`;
  return{defs,back,front,id}}
{const hb=heroBody;heroBody=function(h,u=0){const s=hb.apply(this,arguments);try{if(!h||h.i!==KAI||typeof s!=='string'||s.indexOf('kaibk')>=0)return s;
   const D=kaiDecor(u||0);let t=s;let ok1,ok2;
   [t,ok1]=kaiGRemove(t,'translate(108.0 117.0) rotate(');if(ok1)t=t.replace('@@W@@',`<g transform="translate(110 117) rotate(16)">${kaiHand(D.id,u>=2?92:82)}</g>`);
   [t,ok2]=kaiGRemove(t,'translate(55.0 119.0) rotate(');if(ok2)t=t.replace('@@W@@',`<g transform="translate(55 121)">${kaiWatch(D.id)}</g>`);
   const a=t.indexOf('</defs>');if(a<0)return s;t=t.slice(0,a+7)+D.defs.replace(/^<defs>|<\/defs>$/g,'')+t.slice(a+7);
   const a2=t.indexOf('</defs>')+7;t=t.slice(0,a2)+D.back+t.slice(a2);
   const z=t.lastIndexOf('</svg>');t=t.slice(0,z)+D.front+t.slice(z);return t}catch(e){return s}}}
/* on vide les anciens dessins et portraits de Kaïros en cache */
(function(){try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)Object.keys(C).forEach(k=>{if(k.startsWith(KAI+'_'))delete C[k]})}catch(e){}})();
try{const P=PATCH.find(x=>x.v===30);if(P)P.items.push("⏳ <b>Kaïros, Maître du Temps</b> a un nouveau look : une grande horloge dans le dos, des horloges et un sablier qui flottent autour de lui, une montre à gousset, et une <b>grande aiguille d'horloge</b> comme arme.")}catch(e){}
