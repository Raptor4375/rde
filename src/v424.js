/* ================= V424 : ORGEMME, redessiné dans le style maison =================
   Pierre claire, verres éclairés de l'intérieur, plombs fins couleur d'ardoise, fêlures recousues à l'or. */
(function(){try{
if(typeof ORG==='undefined'||!HEROES[ORG]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP}=HA;
const OC={};
const GL={bl:['#7ab4ff','#2e6ad0','#163a80'],rd:['#ff8a9a','#c8344a','#7a1426'],am:['#ffe08a','#e0a83a','#9a6418'],em:['#8af0c8','#2a9a74','#105a44']};
const K=['bl','rd','am','em'];
const defs=(q,u)=>HA.lin(q+'st','#f4ece0','#d6c8b2','#9e8e78')+HA.lin(q+'sv','#efe6d6','#cbbda6','#8c7c66',1)+HA.lin(q+'au','#fff2b0','#ffd84a','#c8901a')
 +K.map(k=>HA.lin(q+k,GL[k][0],GL[k][1],GL[k][2],1)).join('')
 +HA.rad(q+'ey',[[0,'#ffffff'],[.45,'#fff0b8'],[1,'#ffb02a']])
 +HA.lin(q+'ray','#fff0b8','#ffe08a','#ffe08a',1).replace('<stop offset="1" stop-color="#ffe08a"/>','<stop offset="1" stop-color="#ffe08a" stop-opacity="0"/>');
const ST=q=>`url(#${q}st)`,SV=q=>`url(#${q}sv)`,AU=q=>`url(#${q}au)`,G=(q,k)=>`url(#${q}${k})`;
const LEAD='#3e3644';
/* une vitre : le verre, le reflet du haut, la lumière qui passe */
const pane=(q,d,k,u,gone)=>gone?P(d,'#0e0c16')+P(d,'#fff0b8',`opacity=".28"`):P(d,G(q,k))+P(d,'#ffffff','opacity=".12"');
/* une lancette (ogive vitrée) */
function lancet(q,x,w,yt,yb,k0,u,gone){const ya=yt+w*.62,d=`M${x} ${yb}V${r1(ya)}Q${r1(x+w/2)} ${yt} ${r1(x+w)} ${r1(ya)}V${yb}Z`;
  let s=pane(q,d,K[k0%4],u,gone);
  if(!gone){const n=4;for(let i=0;i<n;i++){const y0=ya+(yb-ya)*i/n,y1=ya+(yb-ya)*(i+1)/n;s+=P(`M${x} ${r1(y0)}H${r1(x+w)}V${r1(y1)}H${x}Z`,G(q,K[(k0+i+1)%4]),`opacity="${i%2?.0:.55}"`)}
    s+=L_(`M${r1(x+w/2)} ${r1(yt+w*.2)}V${yb}`,LEAD,.6)+[1,2,3].map(i=>L_(`M${x} ${r1(ya+(yb-ya)*i/4)}H${r1(x+w)}`,LEAD,.55)).join('')}
  return s+L_(d,LEAD,.9)+L_(`M${r1(x+.6)} ${yb}V${r1(ya)}Q${r1(x+w/2)} ${r1(yt+.6)} ${r1(x+w-.6)} ${r1(ya)}`,'#fff6d8',.35,'opacity=".7"')}
/* la rosace */
function rose(q,cx,cy,R,u,miss){let s=C_(cx,cy,r1(R+3.2),ST(q))+C_(cx,cy,r1(R+3.2),'none',`stroke="#8c7c66" stroke-width=".5"`)+C_(cx,cy,r1(R+.8),LEAD);
  const n=12,r0=R*.42;
  for(let k=0;k<n;k++){const a0=k*2*Math.PI/n-Math.PI/2,a1=(k+1)*2*Math.PI/n-Math.PI/2,am=(a0+a1)/2;
    const pt=(r,a)=>r1(cx+Math.cos(a)*r)+' '+r1(cy+Math.sin(a)*r);
    const d=`M${pt(r0,a0)}L${pt(R,a0)}A${R} ${R} 0 0 1 ${pt(R,a1)}L${pt(r0,a1)}Z`;
    s+=pane(q,d,K[k%4],u,miss&&miss.includes(k))+L_(d,LEAD,.5);
    s+=C_(r1(cx+Math.cos(am)*R*.74),r1(cy+Math.sin(am)*R*.74),r1(R*.09),'#fff6d8','opacity=".55"')}
  s+=C_(cx,cy,r1(r0+.9),LEAD)+C_(cx,cy,r0,`url(#${q}ey)`)+C_(cx,cy,r1(r0*.48),'#ffffff')+C_(r1(cx-r0*.3),r1(cy-r0*.3),r1(r0*.18),'#ffffff');
  if(u>=1)s+=C_(cx,cy,r1(r0*1.6),'#ffe9a0',`opacity="${.18+u*.07}"`);
  return s}
/* ---------- la tête : un gâble de pierre, la rosace pour visage ---------- */
function head(q,u){
  let s=P('M37 68V41Q37 22 50 11.6Q63 22 63 41V68Z',ST(q))+P('M58.4 30Q63 36 63 44V68H59Z','#8c7c66','opacity=".35"');
  s+=L_('M37.4 41Q37.4 22.6 50 12.4Q62.6 22.6 62.6 41','#fff8ea',.55,'opacity=".8"');
  /* crochets le long du gâble, et le fleuron */
  s+=[[39.2,30],[42.2,23],[46,17.4],[54,17.4],[57.8,23],[60.8,30]].map(([x,y],k)=>P(`M${x} ${y}q${k<3?-2.6:2.6} -1.2 ${k<3?-1.8:1.8} -3.2q${k<3?1.6:-1.6} 1 ${k<3?1.4:-1.4} 2.6Z`,SV(q))).join('');
  s+=P('M50 3.6Q52.4 6.6 50.8 9.4Q53.6 8.4 54.6 10.6Q52 11.4 50 11.8Q48 11.4 45.4 10.6Q46.4 8.4 49.2 9.4Q47.6 6.6 50 3.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"');
  s+=rose(q,50,40.4,11.4,u,u>=3?[2,9]:u>=2?[9]:null);
  /* l'arcature sous la rosace */
  s+=[0,1,2,3].map(i=>{const x=40.4+i*5.1;return lancet(q,x,4.1,55.4,65.4,i+1,u,false)}).join('');
  s+=L_('M38.6 54.2H61.4M38.6 66.4H61.4','#8c7c66',.6);
  /* fêlures recousues à l'or */
  s+=L_('M40.4 33Q42.6 36 41.4 39.6M59.6 47Q58 50 59.4 53',AU(q),.6,'opacity=".9"');
  if(u>=1)s+=L_('M38.6 58Q40 61.6 38.8 64.6M61.4 26.4Q59.4 29 60.4 32.2',AU(q),.55);
  return s}
/* ---------- buste ---------- */
function bust(q,u){
  let s=P('M4 100Q6 80 20 70L80 70Q94 80 96 100Z',ST(q))+P('M8 100Q10 84 20 76L24 100Z','#8c7c66','opacity=".4"')+P('M92 100Q90 84 80 76L76 100Z','#8c7c66','opacity=".4"');
  /* les trois lancettes du torse, éclairées */
  s+=lancet(q,31.4,10.8,74,100,0,u,u>=2)+lancet(q,44.6,10.8,70,100,2,u,false)+lancet(q,57.8,10.8,74,100,1,u,false);
  s+=L_('M30 72.4H70','#fff8ea',.5,'opacity=".6"');
  /* épaulières à pinacles */
  s+=MI(P('M4 86Q6 70 20 64Q28 62 33 66L30 80Q18 80 4 86Z',SV(q))+L_('M5 84Q8 72 20 66.4','#fff8ea',.5,'opacity=".7"')
    +P('M14 64L15.6 54L17.2 64Z',SV(q))+P('M22 62.4L23.4 55.4L24.8 62.4Z',SV(q))
    +C_(18,73,2.6,G(q,'bl'),`stroke="${LEAD}" stroke-width=".5"`)+C_(18,73,1.2,'#ffffff','opacity=".3"'));
  s+=L_('M24 86Q28 92 26 98',AU(q),.6,'opacity=".85"');
  return s}
const PO={name:'Orgemme le Colosse de Vitrail',cls:'Tank',r:4,TC:'#ffd070',hy:40,
  bg:['#fffbe8','#ffe6a8','#4a7ac8','#1a2850','#080c1c'],glow:['#ffffff','#fff0c0','#ffd070'],halo:'#ffe08a',halo2:'#bfd8ff',
  frame:['#ffe08a','#7ab0ff'],parts:['#fff6c8','#bfe2ff','#ffb0b8'],rayCol:'#fff6d8'};
/* des faisceaux de lumière colorée, comme sous une verrière */
function shafts(cx,y0,w,h,u,op){const C=['#7ab4ff','#ff8a9a','#ffe08a','#8af0c8'];let s='';
  for(let k=0;k<4;k++){const x=cx-w*.75+k*w*.5;s+=P(`M${r1(x)} ${y0}L${r1(x+w*.2)} ${y0}L${r1(x+w*.62)} ${r1(y0+h)}L${r1(x+w*.28)} ${r1(y0+h)}Z`,C[k],`opacity="${r1(op+u*.02)}"`)}return s}
function orgPortrait(u){u=Math.max(0,Math.min(3,u|0));if(OC['p'+u])return OC['p'+u];const q='ogp'+u+'_';
  return OC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>shafts(50,0,36,100,u,.07),
    content:(q,u)=>bust(q,u)+`<g transform="translate(50 42) scale(1.1) translate(-50 -42)">${head(q,u)}</g>`+(u>=3?E_(50,3,12,2.8,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(50,3,12,2.8,'none','stroke="#ffffff" stroke-width=".5"'):'')}))}
/* ---------- corps entier ---------- */
function orgBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(OC[ck])return OC[ck];const q='ogb'+u+(bare?'s':'')+'_';
  return OC[ck]=HA.body({u,q,bare,r:4,name:'Orgemme le Colosse de Vitrail',defs:defs(q,u),glow:['#ffffff','#fff0c0','#ffd070'],bb:['#ffe6a8','#2a4a90','#080c1c'],
   halo:'#ffe08a',halo2:'#bfd8ff',parts:['#fff6c8','#bfe2ff','#ffb0b8'],ring:['#ffe08a','#7ab4ff','#ff8a9a'],shadowW:44,
   back:(q,u)=>shafts(80,0,70,212,u,.06),
   content:(q,u)=>{let s='';
    /* la lumière qui le traverse, posée au sol en taches colorées */
    if(!bare)s+=[[-30,'#7ab4ff'],[-8,'#ffe08a'],[14,'#ff8a9a'],[34,'#8af0c8']].map(([dx,c],k)=>E_(80+dx,214+(k%2)*2,14,3.6,c,`opacity="${.22+u*.04}"`)).join('');
    /* jambes : colonnes à bases moulurées, incrustées de verre */
    const leg=P('M56.6 130H79L78 200H58Z',ST(q))+P('M73.6 132L78.6 132L77.8 198L72.8 198Z','#8c7c66','opacity=".35"')
      +lancet(q,62.6,10.4,146,178,1,u,false)+L_('M57.2 140H78.6M58 186H78',`#8c7c66`,.6)
      +P('M55 198H82Q84 198 84 200.4V206H53V200.4Q53 198 55 198Z',SV(q))+P('M51 205H86Q88 205 88 207.4V212H49V207.4Q49 205 51 205Z',ST(q))+L_('M49.6 207.6H87.4','#fff8ea',.5,'opacity=".7"');
    s+=MB(leg);
    /* ceinture de pierre et petite rose */
    s+=P('M54 120Q80 127 106 120L107 134Q80 141 53 134Z',SV(q))+L_('M54 123Q80 130 106 123','#fff8ea',.5,'opacity=".6"')+rose(q,80,129.6,4.6,u,null);
    /* le torse : une façade, trois lancettes qui brillent */
    s+=P('M52 62Q80 55 108 62L110 122Q80 130 50 122Z',ST(q))+P('M100 66L108 66L109.6 120Q105 122 101 122.6Z','#8c7c66','opacity=".35"');
    s+=lancet(q,57.4,12.4,78,118,0,u,u>=2)+lancet(q,73.8,12.4,70,120,2,u,false)+lancet(q,90.2,12.4,78,118,1,u,u>=3);
    s+=[[63.6,73.4],[96.4,73.4]].map(([x,y],k)=>C_(x,y,2.8,G(q,K[k?3:0]),`stroke="${LEAD}" stroke-width=".5"`)+C_(x,y-.8,1.1,'#ffffff','opacity=".35"')).join('');
    s+=L_('M53 64Q80 57.6 107 64','#fff8ea',.6,'opacity=".7"');
    /* fêlures recousues à l'or */
    s+=L_('M54.4 88L60 94L56 101L61 108',AU(q),.8,'opacity=".95"')+L_('M106 84L101.6 90L105 98',AU(q),.7,'opacity=".9"');
    if(u>=1)s+=L_('M66 64L70 70L67.4 74M95 104L99 110L96 116',AU(q),.7);
    if(u>=2)s+=L_('M80 122L83 128L79.4 134',AU(q),.7);
    /* bras : pierre et quadrilobes de verre, poings massifs */
    const arm=P('M48 70Q38.6 86 37 104L49 106.4Q49 90 56.4 76Z',ST(q))+P('M38.4 96Q37.4 100 37 104L41.6 104.8Q41.6 100 42.6 95Z','#8c7c66','opacity=".35"')
      +P('M43.4 92.4Q46.4 89.4 49.4 92.4Q46.4 95.4 43.4 92.4ZM46.4 89.4Q49.4 92.4 46.4 95.4Q43.4 92.4 46.4 89.4Z',G(q,'rd'),`stroke="${LEAD}" stroke-width=".5"`)+C_(46.4,92.4,.9,'#fff6d8','opacity=".6"')
      +C_(42.6,106,4.4,SV(q))+C_(42.6,106,2.2,G(q,'bl'),`stroke="${LEAD}" stroke-width=".5"`)+C_(42,105.2,.8,'#ffffff','opacity=".4"')
      +P('M37.2 107Q35 120 35.6 133L48 133.6Q47.4 120 49.4 108Z',ST(q))+P('M36.6 118Q35.6 126 36 133L40 133.2Q39.6 126 40.6 118Z','#8c7c66','opacity=".35"')
      +lancet(q,40,4.6,113,128,3,u,false)
      +P('M33 131.6Q31.2 138 32.8 144.6Q35.4 151 42 151Q48.6 151 50.4 144.6Q51.8 138 49.8 131.6Z',SV(q))
      +L_('M36.4 139.6Q36.6 145 39 148.4M40.6 140Q40.8 145.6 42.6 149.4M44.8 140Q45 145.4 46.4 148.8','#8c7c66',.6)
      +L_('M33.6 132.6Q33 136 33.6 139','#fff8ea',.5,'opacity=".7"')+C_(41.6,135.6,1.6,G(q,'am'),`stroke="${LEAD}" stroke-width=".45"`);
    s+=MB(arm);
    /* épaulières à pinacles */
    s+=MB(P('M36 82Q38 66 52 60Q60 57.6 66 62L62 76Q50 76 36 82Z',SV(q))+L_('M37.4 80Q40 68 52 62.6','#fff8ea',.55,'opacity=".75"')
      +P('M44 61L45.8 49L47.6 61Z',SV(q))+P('M52.6 58.6L54.2 49.6L55.8 58.6Z',SV(q))+C_(50,69,2.8,G(q,'bl'),`stroke="${LEAD}" stroke-width=".55"`)+C_(50,68.2,1,'#ffffff','opacity=".3"'));
    /* la tête-gâble */
    s+=HG(head(q,u));
    /* éclats de verre en orbite (ultra II et III) */
    if(u>=2)s+=[...Array(u*3)].map((_,k)=>{const C=['#7ab4ff','#ff8a9a','#ffe08a','#8af0c8'][k%4],a=k*360/(u*3);
      return`<g transform="rotate(${r1(a)} 80 36)"><path transform="translate(${k%2?118:120} 36) rotate(${k*37})" d="M0 -2.6L1.8 1.6L-1.6 1.4Z" fill="${C}" stroke="${LEAD}" stroke-width=".3"><animateTransform attributeName="transform" type="rotate" additive="sum" values="0;360" dur="${7+k%3}s" repeatCount="indefinite"/></path></g>`}).join('');
    if(u>=3)s+=E_(80,0,10,2.6,'none','stroke="#ffe08a" stroke-width="1.4"')+E_(80,0,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
    return s}})}
window.orgPortrait=orgPortrait;window.orgBody=orgBody;
HA.install(ORG,orgPortrait,orgBody,{orgemme:()=>orgBody(0,1)});
try{LOOKS[ORG]=['#d6c8b2','#3e3644','#d6c8b2','#2e6ad0','#ffd070','#fff0b8','bg:holy head:golem hat:crystals face:runes eyes:glow mouth:none body:rocky ear:none']}catch(e){}
try{UTH_H[ORG]={n:'La Grande Rose',m:'#d6c8b2',s:'#2e6ad0',a:'#ffd070',e:'#fff0b8',bg:'holy',w:'wings-gold',hat:'halo',fx:'stars',c:'#ffd070',c2:'#7ab4ff',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('orgemme maison',e)}})();
