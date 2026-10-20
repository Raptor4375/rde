
/* ===== V26.2 : héros bien plus détaillés ===== */
function EMB(c,x,y,k,col){const t=`transform="translate(${f1(x)} ${f1(y)}) scale(${k})"`;
  const m={Tank:`<path d="M-6 -7h12v6q0 7-6 9q-6-2-6-9z" fill="${col}"/><path d="M0 -5v11M-4 -1h8" stroke="#000" stroke-opacity=".35" stroke-width="1.4"/>`,
   Guerrier:`<path d="M-6 -7L6 7M6 -7L-6 7" stroke="${col}" stroke-width="2.4" stroke-linecap="round"/><path d="M-7.5 3.5l4 4M7.5 3.5l-4 4" stroke="${col}" stroke-width="2"/>`,
   Mage:`<path d="M0 -8L2 -2L8 0L2 2L0 8L-2 2L-8 0L-2 -2Z" fill="${col}"/><circle r="2" fill="#fff" opacity=".8"/>`,
   Soutien:`<path d="M-2.2 -7h4.4v4.8h4.8v4.4h-4.8v4.8h-4.4v-4.8h-4.8v-4.4h4.8z" fill="${col}"/>`,
   Assassin:`<path d="M2 -7.5a7.5 7.5 0 1 0 0 15a5.6 5.6 0 1 1 0-15z" fill="${col}"/>`,
   Tireur:`<circle r="6.6" fill="none" stroke="${col}" stroke-width="1.6"/><circle r="2.4" fill="${col}"/><path d="M-8 8L6 -6M6 -6l-3.6 .4M6 -6l-.4 3.6" stroke="${col}" stroke-width="1.4"/>`};
  return`<g ${t}>${m[c]||m.Mage}</g>`}
function HGROUND(h,acc){const c=(CLS[h.c]||{}).c||acc;let o=`<ellipse cx="80" cy="221" rx="58" ry="11" fill="none" stroke="${c}" stroke-width="1.2" opacity=".55"/><ellipse cx="80" cy="221" rx="50" ry="8.6" fill="none" stroke="${c}" stroke-width=".8" stroke-dasharray="3 3" opacity=".6"/>`;
  for(let k=0;k<12;k++){const q=k/12*Math.PI*2;o+=`<path d="M${f1(80+54*Math.cos(q))} ${f1(221+9.8*Math.sin(q))}l0 -2.2" stroke="${c}" stroke-width="1.2" opacity=".7"/>`}
  for(let k=0;k<5;k++){const x=40+ih(h.i*7+k)%80;o+=`<path d="M${x} 224q1 -4 2 0M${x+3} 224q1 -5 2 0" stroke="#5a8a4a" stroke-width="1" opacity=".55" fill="none"/>`}
  return o}
function HPART(h,R,acc){let o='';const kind={Guerrier:'ember',Tank:'ember',Mage:'spark',Soutien:'leaf',Assassin:'smoke',Tireur:'spark'}[h.c]||'spark';const n=h.r>=4?11:h.r>=3?8:5;
  for(let k=0;k<n;k++){const x=f1(14+R()*132),y=f1(10+R()*190),s=.6+R()*1.2;
    if(kind==='ember')o+=`<circle cx="${x}" cy="${y}" r="${f1(s*1.1)}" fill="#ffb03a" opacity="${f1(.35+R()*.5)}"/>`;
    else if(kind==='leaf')o+=`<ellipse cx="${x}" cy="${y}" rx="${f1(s*2)}" ry="${f1(s)}" fill="#8ad07a" opacity=".6" transform="rotate(${Math.round(R()*180)} ${x} ${y})"/>`;
    else if(kind==='smoke')o+=`<circle cx="${x}" cy="${y}" r="${f1(s*3)}" fill="#6a4a9a" opacity=".16"/>`;
    else o+=STAR(+x,+y,s*1.4,k%3?acc:'#fff','opacity=".8"')}
  if(h.r>=3)for(let k=0;k<3;k++){const x=f1(20+R()*120),y=f1(30+R()*120);o+=`<g opacity=".5" transform="translate(${x} ${y}) rotate(${Math.round(R()*40-20)})"><path d="M0 -4.5L3 0L0 4.5L-3 0Z" fill="none" stroke="${acc}" stroke-width=".9"/><circle r=".9" fill="${acc}"/></g>`}
  return o}
function heroBody(h,u=0){const BC=(window.BODYC3||(window.BODYC3={}));const key=h.i+'_'+u;if(BC[key])return BC[key];const DR=rng(h.i*977+u*13+5);
  const raw=u>0&&h.r===4?ultraLook(LOOKS[h.i],u,h):LOOKS[h.i];const L=parseLook(raw),pose=poseOf(h),head=L.head||'human',T=u?uthOf(h):null;
  const pf='hb'+h.i+'u'+u+'_';let defs='';const GD={};
  const G=(c,v)=>{const k=c+(v||'');if(!GD[k]){const id=pf+Object.keys(GD).length;GD[k]=id;defs+=`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}"><stop offset="0" stop-color="${shade(c,.2)}"/><stop offset=".42" stop-color="${c}"/><stop offset="1" stop-color="${shade(c,-.32)}"/></linearGradient>`}return`url(#${GD[k]})`};
  const RG=(c,id)=>{defs+=`<radialGradient id="${pf+id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".35" stop-color="${c}" stop-opacity=".9"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;return`url(#${pf+id})`};
  const back=[...L.back];const take=re=>{const b=back.find(x=>re.test(x));if(b)back.splice(back.indexOf(b),1);return b};
  const shieldB=pose==='guard'?take(/^shield/):null,bowB=pose==='aim'?take(/bow/):null,gunB=pose==='aim'&&!bowB?take(/musket|rifle/):null,melee=(pose==='strike'||pose==='guard')?take(/sword|katana|axe|hammer|spear|scythe/):null,staffB=pose==='cast'?take(/^staff$/):null,capeB=take(/^cape$/);
  const bt=L.body||'tunic',robe=/robe|dress|kimono|cloak/.test(bt),bare=/bare|rocky|bark|fur/.test(bt),plate=/armor|heavy|scale/.test(bt),rocky=bt==='rocky';
  const skin=L.sk,cloth=bare?skin:L.m,sec=L.s,acc=L.a;
  const pants=robe?shade(L.m,-.25):bare?(rocky?shade(L.s,-.1):shade(L.s,-.15)):bt==='suit'?'#2a2430':plate?shade(L.m,-.2):shade(L.s,-.2);
  const boot=plate?L.s:bt==='suit'?'#1a1418':bare&&!rocky?shade(L.s,-.45):'#4a3222',bootT=plate?shade(L.s,-.2):shade(boot,.25);
  const sleeve=bare?skin:L.m,glove=plate?L.s:skin;
  const A=ARM2[pose],LG=HLEG2[POSEL2[pose]];let s='';
  /* aura, ombre, cape */
  if(T)s+=`<ellipse cx="80" cy="120" rx="${70+u*5}" ry="${112+u*5}" fill="${RG(T.c,'au')}" opacity=".55"/>`;
  else if(h.r===4)s+=`<ellipse cx="80" cy="118" rx="70" ry="110" fill="${RG(RCOL[4],'au')}" opacity=".22"/>`;
  if(capeB){s+=Pa('M60 66Q36 140 34 216Q80 230 126 216Q124 140 100 66Z',G(acc))+SL('M52 110Q46 160 48 214M108 110Q114 160 112 214M80 90L80 220',shade(acc,-.35),1.4,'opacity=".5"')+Pa('M34 216Q80 230 126 216L125 210Q80 223 35 210Z',shade(acc,-.4))+Pa('M44 206Q80 218 116 206',`none`,`stroke="${sec}" stroke-width="1.6" stroke-dasharray="2 3" opacity=".8"`)+[0,1,2,3,4,5,6].map(k=>STAR(46+k*11.3,212+Math.sin(k/6*Math.PI)*4,1.4,sec,'opacity=".9"')).join('')+`<g opacity=".55">${EMB(h.c,80,160,1.7,shade(acc,.35))}</g>`}
  if(bt==='cloak'&&!capeB)s+=Pa('M60 64Q40 140 40 214Q80 226 120 214Q120 140 100 64Z',G(shade(L.m,-.1)))+SL('M54 120Q50 170 52 212M106 120Q110 170 108 212',shade(L.m,-.4),1.3,'opacity=".6"');
  if(bt==='suit')s+=Pa('M64 112Q60 150 54 178L72 168L80 140L88 168L106 178Q100 150 96 112Z',G(L.m));
  /* arrière de la tête (armes dans le dos, cheveux longs) */
  let bk='';for(const b of back)if(BACK[b])bk+=BACK[b](L);if(L.hb&&HAIRB[L.hb])bk+=HAIRB[L.hb](L);
  s+=`<g transform="translate(${HX} ${HY}) scale(${KH})">${bk}</g>`;
  /* jambes */
  LG.forEach((g,i)=>{const d=i===0?-1:1;const R=[10,7.4,5.6];s+=`<path d="${limbPath(g,R)}" fill="${G(pants)}"/>`;
    s+=SL(`M${f1(g[1][0]-2)} ${f1(g[1][1]-2)}q2 3 4 0`,shade(pants,-.35),1,'opacity=".6"');
    const b0=lrp(g[1],g[2],.28),bmid=lrp(b0,g[2],.5);s+=`<path d="${limbPath([b0,bmid,g[2]],[7.6,6.6,6])}" fill="${G(boot)}"/>`+`<ellipse cx="${f1(b0[0])}" cy="${f1(b0[1])}" rx="8.6" ry="3.2" fill="${bootT}"/>`+(plate?CI(b0[0],b0[1]+6,1.3,acc):'');
    {const k=g[1];if(plate){s+=CI(k[0],k[1],5.4,G(sec))+CI(k[0],k[1],2.4,G(shade(sec,-.2)))+CI(k[0],k[1]-.6,1.1,acc)+SL(`M${f1(k[0]-4)} ${f1(k[1]+3)}q4 2.4 8 0`,shade(sec,-.45),.9)}else{s+=SL(`M${f1(k[0]-5)} ${f1(k[1]-1)}q5 3 10 0`,shade(pants,-.4),1,'opacity=".7"')+SL(`M${f1(g[0][0]-3)} ${f1(g[0][1]+8)}L${f1(k[0]-3)} ${f1(k[1]-6)}`,shade(pants,.25),.9,'stroke-dasharray="1.6 2.2" opacity=".7"')}
     for(const t of [.3,.68]){const q=lrp(b0,g[2],t);s+=`<rect x="${f1(q[0]-7.4)}" y="${f1(q[1]-1.3)}" width="14.8" height="2.6" rx="1.2" fill="${shade(boot,-.38)}"/>`+`<rect x="${f1(q[0]+d*3-1.6)}" y="${f1(q[1]-1.8)}" width="3.2" height="3.6" rx=".6" fill="${G(acc)}"/>`}
     s+=SL(`M${f1(b0[0]-8)} ${f1(b0[1]+.6)}h16`,acc,1,'opacity=".75"')}
    const [x,y]=g[2];s+=Pa(`M${x-d*6.5} ${y-3}L${x-d*6.8} ${y+9}Q${x-d*6.8} ${y+12.5} ${x-d*3} ${y+12.5}L${x+d*14} ${y+12.5}Q${x+d*20} ${y+12.5} ${x+d*19} ${y+7}Q${x+d*16} ${y+2} ${x+d*6} ${y}L${x+d*6} ${y-3}Z`,G(boot))+Pa(`M${x-d*6.8} ${y+10.5}L${x+d*19.4} ${y+10.5}L${x+d*18.6} ${y+12.5}L${x-d*6.8} ${y+12.5}Z`,shade(boot,-.5))+`<ellipse cx="${x+d*13}" cy="${y+5.5}" rx="3.4" ry="1.6" fill="#fff" opacity=".22"/>`});
  /* bassin */
  s+=Pa('M63 114L97 114Q101 125 99 138Q90 142 80 136Q70 142 61 138Q59 125 63 114Z',G(pants));
  /* jupe / robe */
  if(robe&&bt!=='cloak'){const w=pose==='crouch'||POSEL2[pose]==='wide'?8:0;const hem=bt==='kimono'?acc:sec;
    s+=Pa(`M63 112Q50 160 ${42-w} 208Q80 220 ${118+w} 208Q110 160 97 112Z`,G(L.m))+SL(`M70 122Q64 166 ${58-w*.6} 210M90 122Q96 166 ${102+w*.6} 210M80 124L80 214`,shade(L.m,-.35),1.3,'opacity=".55"')+Pa(`M${42-w} 208Q80 220 ${118+w} 208L${117+w} 201Q80 213 ${43-w} 201Z`,hem);
    if(bt==='dress')for(let k=0;k<9;k++)s+=CI(46-w+k*(68+2*w)/8,206+Math.sin(k/8*Math.PI)*5,2.2,sec);
    if(bt==='robe')s+=Pa('M76 116L84 116L86 214L74 214Z',acc,'opacity=".9"')+SL('M78 130h4M78 150h4M78 170h4M78 190h4',shade(acc,-.4),1)}
  if(bt==='cloak'){s+=Pa('M66 110L94 110L96 150L64 150Z',G(sec))}
  if(bt==='tunic'||bt==='uniform'||bt==='leather'||bt==='apron')s+=Pa('M62 110L98 110L103 142Q80 150 57 142Z',G(L.m))+Pa('M57 142Q80 150 103 142L102 137Q80 145 58 137Z',bt==='leather'?shade(L.m,-.3):sec);
  if(bt==='apron')s+=Pa('M66 98L94 98L98 168Q80 174 62 168Z',G(sec))+Pa('M72 128L88 128L88 140L72 140Z',shade(sec,-.2))+SL('M68 98L62 76M92 98L98 76',sec,2);
  /* torse */
  const TOR='M72 60Q60 61 55 69Q50 76 53 92Q56 108 63 118L97 118Q104 108 107 92Q110 76 105 69Q100 61 88 60Z';
  s+=Pa(TOR,G(cloth))+Pa('M60 86Q80 96 100 86Q98 98 94 104Q80 108 66 104Q62 98 60 86Z',shade(cloth,-.25),'opacity=".28"');
  s+=SL('M58 70Q52 80 55 94Q58 108 64 116','#fff',1.6,'opacity=".22"')+SL('M103 72Q108 84 105 96Q102 108 96 116','#000',2,'opacity=".18"');
  if(!bare)s+=SL('M57 76Q80 70 103 76',shade(cloth,.3),.8,'stroke-dasharray="1.5 2" opacity=".6"')+SL('M63 114Q80 119 97 114',shade(cloth,-.45),.8,'stroke-dasharray="1.5 2" opacity=".7"');
  if(bare){const fem=typeof VOXD!=='undefined'&&VOXD[h.i]&&VOXD[h.i][0]==='f';if(!fem)s+=SL('M66 82Q73 88 79 85M94 82Q87 88 81 85',shade(skin,-.3),1.2)+SL('M80 90L80 112M73 98Q76 100 79 99M81 99Q84 100 87 98M73 106Q76 108 79 107M81 107Q84 108 87 106',shade(skin,-.28),1,'opacity=".8"');
    else{const tc=bt==='bark'?'#4a8a3a':bt==='fur'?sec:bt==='rocky'?shade(sec,-.1):L.m;s+=Pa('M57 72Q80 64 103 72L101 113Q80 120 59 113Z',G(tc))+Pa('M57 72Q68 80 80 76Q92 80 103 72L103 76Q92 85 80 81Q68 85 57 76Z',G(shade(tc,.2)))+SL('M60 94Q80 100 100 94M61 104Q80 110 99 104',shade(tc,-.35),1,'opacity=".6"');
      s+=Pa('M60 110Q50 148 45 174Q80 186 115 174Q110 148 100 110Z',G(shade(tc,-.08)))+SL('M70 120Q66 150 62 178M90 120Q94 150 98 178M80 122L80 182',shade(tc,-.4),1.1,'opacity=".5"')+[...Array(9)].map((_,k)=>EL(47+k*8.4,176+Math.sin(k/8*Math.PI)*4,4.4,2.2,bt==='bark'?'#7ac05a':acc,`transform="rotate(${k%2?25:-25} ${47+k*8.4} ${176+Math.sin(k/8*Math.PI)*4})"`)).join('');
      if(bt==='bark')for(let k=0;k<7;k++){const x=59+k*7,y=74+Math.sin(k)*2;s+=EL(x,y,4,2,'#7ac05a',`transform="rotate(${k%2?30:-30} ${x} ${y})"`)}else s+=[64,72,80,88,96].map(x=>CI(x,77+Math.abs(x-80)*.08,1.4,acc)).join('')+CI(80,80,2.6,G(acc))}
    if(bt==='fur')s+=Pa('M52 76Q56 60 68 64Q74 54 80 62Q86 54 92 64Q104 60 108 76Q100 72 96 78Q90 70 84 76Q80 70 76 76Q70 70 64 78Q60 72 52 76Z',G(sec));
    if(rocky)s+=Pa('M60 74L72 68L78 80L70 92L58 86Z',G(sec))+Pa('M88 72L100 70L104 86L92 90Z',G(sec))+Pa('M70 98L84 96L88 110L72 112Z',G(sec),'opacity=".9"')+SL('M64 78L68 84M94 76L96 82',shade(sec,-.4),1);
    if(bt==='bark')s+=SL('M62 74Q66 90 64 112M74 70Q76 92 72 116M86 70Q84 92 88 116M98 74Q94 90 96 112',shade(skin,-.4),1.3)+EL(66,72,3.4,1.6,'#7ac05a','transform="rotate(-30 66 72)"')+EL(96,74,3.4,1.6,'#7ac05a','transform="rotate(30 96 74)"');
    if(bt==='bare')s+=SL('M58 72Q80 84 102 72',"#5a3a20",1.4)+[64,72,80,88,96].map(x=>Pa(`M${x-1.4} ${74+(Math.abs(x-80)<10?4:0)}L${x} ${81+(Math.abs(x-80)<10?4:0)}L${x+1.4} ${74+(Math.abs(x-80)<10?4:0)}Z`,'#f4ecd0')).join('')}
  else if(plate){const pl=bt==='scale'?L.m:sec;s+=Pa('M60 68Q80 62 100 68Q104 90 95 110Q80 116 65 110Q56 90 60 68Z',G(pl))+SL('M80 66L80 112',shade(pl,-.35),1.2)+SL('M64 92Q80 98 96 92M66 101Q80 107 94 101',shade(pl,-.35),1.3)+Pa('M66 72Q80 68 94 72Q92 80 80 82Q68 80 66 72Z','#fff','opacity=".16"')+CI(80,86,3,acc)+CI(80,86,1.2,'#fff','opacity=".6"');
    if(bt==='scale')for(let r=0;r<5;r++)for(let k=0;k<6;k++){const x=63+k*6.6+(r%2?3.3:0),y=74+r*7.5;if(x<96)s+=SL(`M${f1(x-3.3)} ${y}q3.3 4.5 6.6 0`,sec,1)}}
  else if(bt==='leather')s+=Pa('M56 74L100 112L94 116L54 80Z',G(sec))+CI(70,88,2.2,acc)+CI(86,102,2.2,acc)+Pa('M72 61L80 72L88 61Z',shade(L.m,.2))+SL('M77 66L83 66M78 70L82 70',acc,.8);
  else if(bt==='tunic')s+=Pa('M70 61L80 78L90 61Z',G(sec))+SL('M76 66L84 66M77 70L83 70M78 74L82 74',acc,1)+SL('M60 100Q80 104 100 100',shade(L.m,-.3),1,'opacity=".5"');
  else if(bt==='robe')s+=Pa('M68 61L80 84L92 61L88 61L80 76L72 61Z',acc)+Pa('M72 61L80 76L88 61Z',sec);
  else if(bt==='dress')s+=Pa('M62 74Q80 84 98 74L96 112Q80 118 64 112Z',G(sec))+Pa('M74 86L80 92L86 86L80 80Z',acc)+[66,72,78,84,90].map(x=>CI(x+2,77+Math.sin((x-62)/30*Math.PI)*4,1.6,shade(sec,.3))).join('');
  else if(bt==='kimono')s+=Pa('M68 61L92 112L84 112L68 70Z',G(sec))+Pa('M92 61L68 112L76 112L92 70Z',G(shade(sec,-.1)))+Pa('M60 104L100 104L101 118L59 118Z',G(acc))+Pa('M84 106L96 102L94 116Z',shade(acc,-.25));
  else if(bt==='cloak')s+=Pa('M56 64Q80 82 104 64L106 76Q80 94 54 76Z',G(shade(L.m,.12)))+CI(80,80,3.4,acc)+Pa('M70 84L90 84L94 116L66 116Z',G(sec),'opacity=".9"');
  else if(bt==='suit')s+=Pa('M72 60L80 112L88 60Z','#f4f0e8')+Pa('M70 60L64 96L80 112L74 74Z',G(shade(L.m,.12)))+Pa('M90 60L96 96L80 112L86 74Z',G(shade(L.m,.12)))+Pa('M75 64L80 67L85 64L85 69L80 67L75 69Z',acc)+CI(80,84,1.2,'#1a1418')+CI(80,94,1.2,'#1a1418');
  else if(bt==='uniform')s+=[0,1,2,3].map(k=>CI(74,74+k*9,1.6,sec)+CI(86,74+k*9,1.6,sec)).join('')+Pa('M72 60L80 68L88 60L88 64L80 72L72 64Z',sec)+Pa('M56 70L100 108L96 112L54 74Z',sec,'opacity=".85"');
  else if(bt==='apron')s+=Pa('M72 61L80 72L88 61Z',sec);
  /* détails de poitrine */
  if(!bare&&!plate&&bt!=='suit'){s+=`<g>${CI(80,90,6.4,G(shade(sec,-.15)))}${CI(80,90,6.4,'none',`stroke="${acc}" stroke-width="1.2"`)}${EMB(h.c,80,90,.62,acc)}</g>`;
    s+=Pa('M62 64Q80 74 98 64L100 70Q80 82 60 70Z',G(sec))+Pa('M60 70Q80 82 100 70L100 72Q80 84 60 72Z',acc,'opacity=".9"')+CI(66,70,1.8,G(acc))+CI(94,70,1.8,G(acc))+CI(65.4,69.4,.6,'#fff','opacity=".8"')+CI(93.4,69.4,.6,'#fff','opacity=".8"')}
  if(plate)s+=SL('M66 76Q72 80 72 88M94 76Q88 80 88 88M68 104q12 5 24 0',acc,.9,'opacity=".75"')+[0,1,2,3].map(k=>CI(62+k*12,108-Math.abs(1.5-k)*1.5,1.1,shade(acc,.2))).join('');
  if(h.r>=4&&!bare)s+=SL('M60 70Q56 92 64 116M100 70Q104 92 96 116','#ffe58a',.9,'opacity=".75" stroke-dasharray="3 1.5 .8 1.5"');
  /* ceinture */
  if(bt!=='kimono'&&bt!=='dress'){s+=Pa('M62 110Q80 116 98 110L99 119Q80 125 61 119Z',G(robe?acc:shade(sec,-.4),1))+`<rect x="75" y="109.5" width="10" height="11" rx="2.4" fill="${G(acc)}"/><rect x="77.6" y="112" width="4.8" height="6" rx="1" fill="${shade(acc,-.45)}"/>`;if(!robe)s+=`<rect x="88" y="114" width="9" height="10" rx="2" fill="${G(shade(sec,-.25))}"/>`+SL('M88 118h9',shade(sec,-.5),.8)+CI(92.5,121,1,acc)+`<rect x="63" y="115" width="8" height="9" rx="2" fill="${G(shade(L.m,-.3))}"/>`+SL('M63 118.5h8',shade(L.m,-.55),.8);
    s+=SL('M77 120L75 132M83 120L85 132',acc,1.1)+STAR(75,134,2,acc)+CI(85,133.5,1.8,G(shade(acc,.25)))+CI(80,115,1.3,'#fff','opacity=".85"')}
  /* bras */
  const armL=(P,isBack)=>{let o='';const wide=robe&&bt!=='cloak';const R=[7.6,6.2,wide?8.6:5.2];const c=isBack?shade(sleeve,-.12):sleeve;o+=`<path d="${limbPath(P,R)}" fill="${G(c)}"/>`;
    if(plate){const f0=lrp(P[1],P[2],.15);o+=`<path d="${limbPath([f0,lrp(f0,P[2],.5),P[2]],[6.8,6,5.8])}" fill="${G(sec)}"/>`+CI(P[1][0],P[1][1],5.6,G(sec))}
    else if(bare)o+=`<path d="${limbPath([lrp(P[1],P[2],.6),lrp(P[1],P[2],.8),P[2]],[5.8,5.6,5.6])}" fill="${G(sec)}"/>`;
    else if(wide)o+=`<path d="M${f1(P[2][0]-9)} ${f1(P[2][1]-3)}Q${f1(P[2][0])} ${f1(P[2][1]+6)} ${f1(P[2][0]+9)} ${f1(P[2][1]-3)}" stroke="${acc}" stroke-width="2.2" fill="none" stroke-linecap="round"/>`;
    else o+=`<ellipse cx="${f1(P[2][0])}" cy="${f1(P[2][1])}" rx="5.8" ry="2.6" fill="${sec}" transform="rotate(${f1(Math.atan2(P[2][1]-P[1][1],P[2][0]-P[1][0])*180/Math.PI+90)} ${f1(P[2][0])} ${f1(P[2][1])})"/>`;
    if(!wide){const q1=lrp(P[1],P[2],.52),q2=lrp(P[1],P[2],.86);o+=`<path d="${limbPath([q1,lrp(q1,q2,.5),q2],[5.6,5.4,5.3])}" fill="${G(plate?shade(sec,-.15):shade(sec,-.05))}"/>`+SL(`M${f1(q1[0])} ${f1(q1[1])}L${f1(q2[0])} ${f1(q2[1])}`,acc,.9,'opacity=".8" stroke-dasharray="2 1.6"')+CI(lrp(q1,q2,.5)[0],lrp(q1,q2,.5)[1],1.2,G(acc))}
    else{const q=lrp(P[1],P[2],.45);o+=SL(`M${f1(q[0]-6)} ${f1(q[1])}q6 2.4 12 0`,acc,1,'opacity=".7"')}
    return o};
  const hand=(P,open)=>{const W=P[2],E=P[1];const dx=W[0]-E[0],dy=W[1]-E[1],l=Math.hypot(dx,dy)||1,ux=dx/l,uy=dy/l,cx=W[0]+ux*4.5,cy=W[1]+uy*4.5,ang=Math.atan2(uy,ux)*180/Math.PI-90;const c=glove;
    let o=`<g transform="rotate(${f1(ang)} ${f1(cx)} ${f1(cy)})"><ellipse cx="${f1(cx)}" cy="${f1(cy)}" rx="5" ry="${open?6.4:5.4}" fill="${G(c)}"/>`;
    o+=open?`<path d="M${f1(cx-3)} ${f1(cy+3)}v4M${f1(cx-1)} ${f1(cy+4)}v4.5M${f1(cx+1)} ${f1(cy+4)}v4.5M${f1(cx+3)} ${f1(cy+3)}v4" stroke="${G(c)}" stroke-width="2" stroke-linecap="round"/>`:SL(`M${f1(cx-3)} ${f1(cy+1.5)}h6`,shade(c,-.35),.8);
    o+=`<ellipse cx="${f1(cx+4.4)}" cy="${f1(cy-1)}" rx="1.9" ry="3.2" fill="${shade(c,-.08)}" transform="rotate(-25 ${f1(cx+4.4)} ${f1(cy-1)})"/></g>`;return o};
  const [a1,a2]=A;let items='',front='';
  const H2=a2[2],H1=a1[2];
  const sword=(x,y,ang,type)=>{const len=type==='greatsword'?66:type==='katana'?56:50,w=type==='greatsword'?4.4:type==='katana'?2.2:3.2,bl=type==='katana'?'#eef3f8':METAL;
    return`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${ang})"><path d="M${-w} -5L${-w} ${-len+9}L0 ${-len}L${w} ${-len+9}L${w} -5Z" fill="${G(bl)}"/><path d="M0 -6L0 ${-len+8}" stroke="#fff" stroke-width=".9" opacity=".7"/>${[.3,.48,.66].map(t=>`<path d="M-1.4 ${f1(-len*t)}l1.4 -2.2l1.4 2.2l-1.4 2.2z" fill="${acc}" opacity=".85"/>`).join('')}<path d="M${-w} -5L${-w} ${-len+9}L0 ${-len}Z" fill="#fff" opacity=".18"/>
     <rect x="-12" y="-7.5" width="24" height="4" rx="2" fill="${G(acc)}"/><circle cx="-12" cy="-5.5" r="2.3" fill="${acc}"/><circle cx="12" cy="-5.5" r="2.3" fill="${acc}"/><rect x="-2.3" y="-4" width="4.6" height="12" rx="1.4" fill="#5a3418"/><path d="M-2.3 -1l4.6 2.4M-2.3 3l4.6 2.4" stroke="#8a5a2a" stroke-width="1"/><circle cx="0" cy="9.5" r="3" fill="${G(acc)}"/><circle cx="-.9" cy="8.6" r=".9" fill="#fff" opacity=".85"/><circle cx="0" cy="-5.5" r="1.6" fill="#fff" opacity=".6"/></g>`};
  const pole=(x,y,ang,type)=>{let o=`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${ang})"><rect x="-1.9" y="-62" width="3.8" height="92" rx="1.9" fill="${G(type==='scythe'?'#3a3a42':WOOD)}"/>`+[-6,-2,2,6].map(y=>`<path d="M-2 ${y}l4 2" stroke="${acc}" stroke-width="1.2"/>`).join('')+`<rect x="-2.6" y="-50" width="5.2" height="3" rx="1" fill="${G(acc)}"/><rect x="-2.6" y="26" width="5.2" height="3" rx="1" fill="${G(acc)}"/>`;
    if(/spear/.test(type))o+=`<path d="M-4.5 -60L0 -80L4.5 -60L0 -56Z" fill="${G(type==='spear-blood'?acc:METAL)}"/><path d="M-3 -56Q0 -50 3 -56" stroke="${acc}" stroke-width="2.4" fill="none"/>`;
    else if(type==='scythe')o+=`<path d="M0 -60Q-34 -70 -48 -44Q-30 -58 0 -52Z" fill="${G('#d8e0d8')}"/><path d="M-2 -59Q-30 -66 -44 -47" stroke="${acc}" stroke-width=".9" fill="none" opacity=".8"/>`;
    else if(/hammer/.test(type))o+=`<rect x="-14" y="-70" width="28" height="15" rx="3" fill="${G('#8a8f98')}"/><rect x="-3" y="-70" width="6" height="15" fill="${acc}"/>`;
    else if(/axe/.test(type))o+=`<path d="M1 -64Q22 -74 24 -48Q16 -54 1 -50Z" fill="${G(METAL)}"/>`+(type==='axe-double'?`<path d="M-1 -64Q-22 -74 -24 -48Q-16 -54 -1 -50Z" fill="${G(METAL)}"/>`:'');
    return o+'</g>'};
  if(pose==='strike'||pose==='guard'){const b=melee||(pose==='strike'?(h.c==='Assassin'?'katana':'sword'):null);if(b){const up=pose==='strike';
      if(/spear|scythe|axe|hammer/.test(b))items+=pole(H2[0],H2[1],up?-12:16,b);else items+=sword(H2[0],H2[1],up?-14:168,b);
      if(up)items+=`<path d="M${f1(H2[0]-26)} ${f1(H2[1]-40)}Q${f1(H2[0]-40)} ${f1(H2[1]-6)} ${f1(H2[0]-22)} ${f1(H2[1]+18)}" stroke="#fff" stroke-width="2.4" fill="none" opacity=".35" stroke-linecap="round"/>`}}
  if(pose==='guard'){front+=`<g transform="translate(${f1(H1[0]-22*.95)} ${f1(H1[1]-62*.95)}) scale(.95)">${shieldB&&BACK[shieldB]?BACK[shieldB](L):CI(22,62,18,G(sec))+CI(22,62,18,'none',`stroke="${acc}" stroke-width="2.6"`)+CI(22,62,11,'none',`stroke="${shade(sec,-.3)}" stroke-width="1"`)+STAR(22,62,2.4,acc)}</g>`}
  if(pose==='aim'){if(gunB)items+=`<g transform="translate(${f1(H2[0])} ${f1(H2[1])}) rotate(-2)"><rect x="-58" y="-2.4" width="56" height="4.8" rx="2" fill="${G('#2e332e',1)}"/><path d="M-2 -3L14 -1L18 8L4 8L0 2Z" fill="${G(WOOD)}"/><rect x="-61" y="-3" width="4" height="6" rx="1" fill="${acc}"/><rect x="-30" y="-5" width="10" height="2.4" fill="#1a1a1a"/></g>`;
    else{const bc=bowB==='longbow'?sec:bowB==='bow-star'?acc:WOOD,bx=H1[0]+2,by=H1[1];items+=`<path d="M${bx+6} ${by-48}Q${bx-4} ${by-44} ${bx-10} ${by-22}Q${bx-14} ${by} ${bx-10} ${by+22}Q${bx-4} ${by+44} ${bx+6} ${by+48}" stroke="${shade(bc,-.3)}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M${bx+6} ${by-48}Q${bx-4} ${by-44} ${bx-10} ${by-22}Q${bx-14} ${by} ${bx-10} ${by+22}Q${bx-4} ${by+44} ${bx+6} ${by+48}" stroke="${bc}" stroke-width="3.2" fill="none" stroke-linecap="round"/><rect x="${bx-15}" y="${by-6}" width="7" height="12" rx="2" fill="${acc}"/>`+SL(`M${bx+6} ${by-48}L${H2[0]} ${H2[1]}L${bx+6} ${by+48}`,'#f4f0e4',.8)+`<path d="M${H2[0]+4} ${H2[1]}L${bx-24} ${by}" stroke="#d8c8a0" stroke-width="1.6"/><path d="M${bx-30} ${by}L${bx-22} ${by-3.4}L${bx-22} ${by+3.4}Z" fill="${G(METAL)}"/><path d="M${H2[0]+3} ${H2[1]}l5 -4M${H2[0]+3} ${H2[1]}l5 4" stroke="${acc}" stroke-width="2"/>`}}
  if(pose==='cast'){const cx=80,cy=112;if(staffB)items+=`<g><rect x="${H2[0]-1}" y="${H2[1]-70}" width="4" height="110" rx="2" fill="${G(WOOD)}"/><circle cx="${H2[0]+1}" cy="${H2[1]-72}" r="12" fill="${RG(acc,'sg')}"/><circle cx="${H2[0]+1}" cy="${H2[1]-72}" r="5" fill="${acc}"/></g>`;
    items+=`<circle cx="${cx}" cy="${cy}" r="22" fill="${RG(acc,'orb')}"/><circle cx="${cx}" cy="${cy}" r="7" fill="${acc}"/><circle cx="${cx-2.4}" cy="${cy-2.4}" r="2.6" fill="#fff" opacity=".9"/>`+[0,1,2,3,4,5].map(k=>{const q=k*60*Math.PI/180;return STAR(cx+24*Math.cos(q),cy-4+18*Math.sin(q),1.1+(k%2)*.5,'#fff','opacity=".9"')}).join('')+`<ellipse cx="${cx}" cy="${cy}" rx="26" ry="8" fill="none" stroke="${acc}" stroke-width="1" opacity=".6" transform="rotate(-18 ${cx} ${cy})"/>`}
  if(pose==='pray')items+=`<circle cx="80" cy="86" r="26" fill="${RG('#fff3b0','pr')}" opacity=".7"/>`;
  if(pose==='crouch'){const dg=(x,y,r)=>`<g transform="translate(${f1(x)} ${f1(y)}) rotate(${r})"><path d="M-2 -4L0 -26L2 -4Z" fill="${G(METAL)}"/><path d="M0 -6L0 -24" stroke="#fff" stroke-width=".6" opacity=".7"/><rect x="-6.5" y="-5" width="13" height="2.8" rx="1.3" fill="${acc}"/><rect x="-1.6" y="-2.4" width="3.2" height="9" rx="1" fill="#3a2414"/></g>`;items+=dg(H1[0],H1[1],-120)+dg(H2[0],H2[1],125)}
  if(pose==='wave')items+=SL(`M${H2[0]+12} ${H2[1]-8}q5 8 0 16M${H2[0]+17} ${H2[1]-13}q8 13 0 26`,'#fff',1.4,'opacity=".55"');
  const openH={wave:[0,1],cast:[1,1],pray:[1,1],hips:[0,0]}[pose]||[0,0];
  if(pose==='cross'){s+=armL(a2,1)+hand(a2,0)+armL(a1)+hand(a1,0)}
  else{s+=armL(a1,1)+armL(a2)+items+hand(a1,openH[0])+hand(a2,openH[1])}
  /* épaulettes */
  if(plate){const big=/heavy/.test(bt);for(const [x,d] of [[56,-1],[104,1]]){s+=`<ellipse cx="${x}" cy="75" rx="${big?14:11}" ry="${big?10:8}" fill="${G(sec)}"/><ellipse cx="${x+d*1}" cy="81" rx="${big?12:9.5}" ry="${big?6:5}" fill="${G(shade(sec,-.12))}"/><circle cx="${x}" cy="71" r="1.6" fill="${acc}"/>`+SL(`M${x-(big?11:8.5)} 77Q${x} ${big?70:72} ${x+(big?11:8.5)} 77`,acc,.9,'opacity=".8"')+[-1,0,1].map(k=>CI(x+k*(big?7:5.5),79.5-Math.abs(k),.9,shade(acc,.3))).join('');if(bt==='heavy-spike')s+=Pa(`M${x+d*6} 70L${x+d*16} 56L${x+d*12} 72Z`,G(shade(sec,-.15)))+Pa(`M${x-d*2} 67L${x+d*2} 52L${x+d*5} 67Z`,G(shade(sec,-.15)))}}
  else if(bt==='uniform')for(const [x,d] of [[57,-1],[103,1]])s+=`<rect x="${x-8}" y="68" width="16" height="6" rx="3" fill="${G(sec)}"/>`+[0,1,2,3].map(k=>`<path d="M${x-6+k*4} 74v6" stroke="${sec}" stroke-width="1.4"/>`).join('');
  /* cou + tête */
  let hd=`<rect x="44" y="56" width="12" height="16" fill="${skin}"/>`+Pa('M44 62Q50 66 56 62L56 67Q50 70 44 67Z',shade(skin,-.22));
  if(L.ear&&L.ear!=='cat'&&EARS[L.ear])hd+=EARS[L.ear](L);
  hd+=(HEAD[head]||HEAD.human)(L);const hidden=L.face.includes('raven');
  if((head==='human'||head==='orc'||head==='spirit')&&!hidden)hd+=SL('M50 49L48.8 53.2L51 53.4',shade(skin,-.3),1);
  L.face.filter(f=>FX_UNDER.has(f)&&FX[f]).forEach(f=>hd+=FX[f](L));
  if(L.hat!=='helm-visor'&&!hidden&&!L.face.includes('blindfold'))hd+=EYES(L.eyes||'normal',L);
  if(L.hat!=='helm-visor'&&!hidden)hd+=(MOUTH[L.mouth]||MOUTH.none)();
  L.face.filter(f=>!FX_UNDER.has(f)&&FX[f]).forEach(f=>hd+=FX[f](L));
  if(L.hair&&HAIRF[L.hair]&&L.hat!=='helm-visor')hd+=HAIRF[L.hair](L);
  if(L.ear==='cat'&&!/hood/.test(L.hat||''))hd+=EARS.cat(L);
  if(L.hat&&HAT[L.hat])hd+=HAT[L.hat](L);
  s+=Pa('M70 60Q80 66 90 60L90 64Q80 70 70 64Z',shade(cloth,-.35),'opacity=".5"');
  s+=`<g transform="translate(${HX} ${HY}) scale(${KH})">${hd}</g>`;
  s+=front;
  if(L.prop&&PROP[L.prop]&&pose!=='cross'&&pose!=='pray'){const hx=pose==='guard'||pose==='aim'||pose==='cast'?H2:H1;if(!(pose==='cast'&&staffB))s+=`<g transform="translate(${f1(hx[0]-20*.85)} ${f1(hx[1]-82*.85+4)}) scale(.85)">${PROP[L.prop](L)}</g>`}
  if(T)[[22,60,2.4],[140,80,2],[26,170,1.8],[136,180,2],[80,6,1.8]].slice(0,2+u).forEach(([x,y,r])=>{s+=STAR(x,y,r,'#fff','opacity=".9"')});
  s+=HPART(h,DR,acc);
  const tilt=[-2.5,-1,0,1,2.5][ih(h.i*53+7)%5];
  const svg=`<svg class="hbsvg" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${h.n.replace(/"/g,'')} en pied"><defs>${defs}</defs>${HGROUND(h,acc)}<ellipse cx="80" cy="221" rx="46" ry="8" fill="#000" opacity=".38"/><ellipse cx="80" cy="221" rx="30" ry="5" fill="#000" opacity=".25"/><g transform="rotate(${tilt} 80 220)">${s}</g></svg>`;
  return BC[key]=svg}
