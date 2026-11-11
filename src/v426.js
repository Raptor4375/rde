/* ================= V426 : CORVIN, redessiné dans le style maison (mythique) =================
   Un hibou érudit, debout comme un homme ; le bas de sa robe s'efface en page blanche. */
(function(){try{
if(typeof CRV==='undefined'||!HEROES[CRV]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP}=HA;
const CC={};
const defs=(q,u)=>HA.lin(q+'pf','#efe6da','#c8bcae','#8a7e72')+HA.lin(q+'pv','#e8ded0','#b8ac9e','#7a6e62',1)
 +HA.rad(q+'dk',[[0,'#fffaf0'],[.7,'#f0e6d6'],[1,'#cbbca8']])
 +HA.rad(q+'ir',[[0,'#fff0b0'],[.55,'#ffb83a'],[1,'#c06a10']])
 +HA.lin(q+'rb','#4a4270','#302a50','#1c1830',1)+HA.lin(q+'rs','#3e3862','#2a2446','#18142a')
 +HA.lin(q+'iv','#fffaf0','#f0e6d2','#cbbca2',1)+HA.lin(q+'au','#fff2b0','#ffd84a','#c8901a')+HA.lin(q+'bk','#7a6a56','#5a4a3a','#3a2e24',1)
 +`<linearGradient id="${q}erg" gradientUnits="userSpaceOnUse" x1="0" y1="140" x2="0" y2="206"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient><mask id="${q}er"><rect x="-10" y="-10" width="180" height="250" fill="url(#${q}erg)"/></mask>`;
const PF=q=>`url(#${q}pf)`,PV=q=>`url(#${q}pv)`,DK=q=>`url(#${q}dk)`,IR=q=>`url(#${q}ir)`,RB=q=>`url(#${q}rb)`,RS=q=>`url(#${q}rs)`,IV=q=>`url(#${q}iv)`,AU=q=>`url(#${q}au)`,BK=q=>`url(#${q}bk)`;
/* ---------- la tête de hibou (repère du portrait) ---------- */
function head(q,u){
  let s=P('M33.4 47Q32.2 30.6 40.4 24.4Q50 18.4 59.6 24.4Q67.8 30.6 66.6 47Q65.6 58.6 58 64.2Q50 68.4 42 64.2Q34.4 58.6 33.4 47Z',PF(q));
  /* aigrettes, l'une un peu plus haute */
  s+=P('M37.4 31Q32.6 21 35 13.6Q40.2 20 42.8 26.4Z',PV(q))+L_('M36.6 26Q35.6 20 36.4 16','#f6efe4',.45,'opacity=".8"');
  s+=P('M62.6 31.4Q67 22.6 65.2 16.4Q60.6 21.4 57.6 26.8Z',PV(q))+L_('M63.6 26.6Q64.6 21.4 64.4 18.4','#f6efe4',.45,'opacity=".8"');
  /* plumes du front, barrées */
  s+=L_('M41 28Q44 26.6 47 27.4M53 27.4Q56 26.6 59 28M44.4 31.4Q47 30 50 30.4Q53 30 55.6 31.4','#6a5e54',.5,'opacity=".75"');
  /* les deux disques faciaux */
  s+=C_(43.4,46,9.6,DK(q))+C_(56.6,46,9.6,DK(q));
  for(let k=0;k<14;k++){const a=k*Math.PI/7;s+=L_(`M${r1(43.4+Math.cos(a)*5.6)} ${r1(46+Math.sin(a)*5.6)}L${r1(43.4+Math.cos(a)*9)} ${r1(46+Math.sin(a)*9)}`,'#d0c2ae',.3,'opacity=".7"')+L_(`M${r1(56.6+Math.cos(a)*5.6)} ${r1(46+Math.sin(a)*5.6)}L${r1(56.6+Math.cos(a)*9)} ${r1(46+Math.sin(a)*9)}`,'#d0c2ae',.3,'opacity=".7"')}
  s+=`<path d="M34.6 50A9.6 9.6 0 0 1 43.4 36.4" fill="none" stroke="#8a7c70" stroke-width=".7"/><path d="M65.4 50A9.6 9.6 0 0 0 56.6 36.4" fill="none" stroke="#8a7c70" stroke-width=".7"/>`;
  /* sourcils blancs, asymétriques : il doute de toi, gentiment */
  s+=P('M35.6 38.4Q41.6 33.4 48.8 37.6Q42.6 36 35.6 38.4Z','#ffffff')+P('M51.2 37Q58.4 33.6 64.4 36.8Q58 35.2 51.2 37Z','#ffffff');
  /* les yeux d'ambre, le droit à demi fermé */
  const ey=(x,half)=>{let o=C_(x,46.2,4.4,IR(q))+C_(x,46.4,2.5,'#140c08')+C_(r1(x-1.4),44.8,1,'#ffffff')+C_(r1(x+1.2),47.6,.45,'#ffffff','opacity=".8"')+C_(x,46.2,4.4,'none','stroke="#5a3a14" stroke-width=".45"');
    if(half)o+=P(`M${r1(x-4.8)} 45.8Q${x} 40.4 ${r1(x+4.8)} 45.8Q${x} 44.2 ${r1(x-4.8)} 45.8Z`,PV(q))+L_(`M${r1(x-4.6)} 45.8Q${x} 44.2 ${r1(x+4.6)} 45.8`,'#5a4a3a',.7);
    return o};
  s+=ey(43.6,false)+ey(56.4,true);
  /* les lunettes d'or ; le verre droit s'efface (ultra III : réécrit à l'or) */
  s+=C_(43.6,46.2,6.2,'#ffffff','opacity=".1"')+L_('M40 42.4Q41.6 41.4 43.4 41.6','#ffffff',.6,'opacity=".7"');
  s+=C_(43.6,46.2,6.2,'none',`stroke="${AU(q)}" stroke-width="1.1"`);
  s+=u>=3?C_(56.4,46.2,6.2,'none',`stroke="${AU(q)}" stroke-width="1.1"`)+C_(56.4,46.2,7.4,'none','stroke="#fff2b0" stroke-width=".4" opacity=".7"')
        :C_(56.4,46.2,6.2,'none',`stroke="${AU(q)}" stroke-width="1.1" stroke-dasharray="4.6 3.4"`);
  s+=L_('M49.6 45.2Q50 43.6 50.4 45.2',AU(q),.9)+L_('M37.4 45.6L33.6 44.2M62.6 45.6L66.4 44.2',AU(q),.6);
  /* le bec */
  s+=P('M48.4 50.4Q50 48.2 51.6 50.4Q52 54.6 50 57.4Q48 54.6 48.4 50.4Z',BK(q))+L_('M49.2 50.6Q50 49.6 50.8 50.6','#c8b8a0',.4,'opacity=".8"');
  return s}
/* ---------- buste ---------- */
function bust(q,u){
  let s=P('M8 100Q10 82 22 74L78 74Q90 82 92 100Z',RB(q))+P('M12 100Q14 86 24 78L28 100Z','#100c1c','opacity=".5"')+P('M88 100Q86 86 76 78L72 100Z','#100c1c','opacity=".5"');
  /* plastron de plumes, en écailles */
  s+=P('M36 66Q50 72 64 66L62 100H38Z',DK(q))+P('M36 66Q50 72 64 66L62 100H38Z','#c8b49a','opacity=".22"');
  for(let r=0;r<5;r++)for(let k=0;k<5-(r%2);k++){const x=39.6+k*5.2+(r%2)*2.6,y=72+r*5.4;s+=P(`M${r1(x-2.6)} ${y}Q${x} ${r1(y+3.6)} ${r1(x+2.6)} ${y}`,'none',`stroke="#9a8874" stroke-width=".5"`)+L_(`M${r1(x-.8)} ${r1(y+1.4)}L${r1(x+.8)} ${r1(y+1.4)}`,'#8a7864',.4,'opacity=".6"')}
  /* l'étole d'ivoire, couverte d'écriture pâlie */
  const stole=(x,d)=>P(`M${x} 73L${r1(x+6.4*d)} 73L${r1(x+8*d)} 100L${r1(x+1*d)} 100Z`,IV(q))+[0,1,2,3,4].map(i=>L_(`M${r1(x+1.4*d+i*.2*d)} ${78+i*4.6}q${r1(1*d)} -1 ${r1(1.8*d)} 0t${r1(1.8*d)} 0`,u>=1?'#c8901a':'#a8a0b0',.4,`opacity="${u>=1?.85:.6}"`)).join('');
  s+=stole(24,1)+stole(76,-1);
  s+=L_('M24 73L25 100M30.4 73L32 100M76 73L75 100M69.6 73L68 100',AU(q),.6,'opacity=".9"');
  /* col haut de la robe */
  s+=MI(P('M30 74Q31.6 64 37 58L42.6 66L40 76Z',RS(q)));
  /* l'agrafe en forme de plume */
  s+=P('M50 68.6Q53 72 50 78Q47 72 50 68.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+L_('M50 69.6V77.4','#8a5a1a',.35);
  return s}
const PO={name:'Corvin, la Page Blanche',cls:'Soutien',r:5,TC:'#ffe8b0',hy:38,
  bg:['#fffdf6','#f0e4c8','#9a88b8','#2e2648','#0c0a18'],glow:['#ffffff','#fff2d0','#e8d4a0'],halo:'#ffe8b0',halo2:'#d8c8ff',
  frame:['#ffe08a','#d8c8ff'],parts:['#fffaf0','#d8c8ff'],rayCol:'#fffaf0'};
const GLY=['a','é','r','n','l','o','u','s','t','i'];
function letters(n,box,seed,col,op){let s='';for(let k=0;k<n;k++){const x=r1(box[0]+((k*37+seed*13)%100)/100*box[2]),y=r1(box[1]+((k*53+seed*29)%100)/100*box[3]),a=((k*47)%60)-30;
  s+=`<text x="${x}" y="${y}" font-family="Georgia,serif" font-style="italic" font-size="${(4+(k%3)*1.4).toFixed(1)}" fill="${col}" opacity="${op}" transform="rotate(${a} ${x} ${y})">${GLY[(k+seed)%GLY.length]}</text>`}return s}
function crvPortrait(u){u=Math.max(0,Math.min(3,u|0));if(CC['p'+u])return CC['p'+u];const q='cvp'+u+'_';
  return CC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>letters(6+u*2,[6,6,88,60],3,'#fffaf0',.5),
    content:(q,u)=>bust(q,u)+head(q,u)+(u>=3?E_(50,13,11,2.8,'none','stroke="#ffe8b0" stroke-width="1.4"')+E_(50,13,11,2.8,'none','stroke="#ffffff" stroke-width=".5"'):'')}))}
/* ---------- corps entier ---------- */
function quill(q,u){/* la plume brisée, tenue haute */
  return`<g transform="translate(46 92) rotate(-28)">${P('M0 0Q-4 -12 -1.4 -30Q2.6 -16 2.4 -4Z','#fffaf0','stroke="#c8bca8" stroke-width=".35"')}${L_('M.6 0Q-.4 -14 -1 -28','#a89884',.4)}`
   +`${P('M-1.6 -10Q-5 -14 -4.6 -20','none','stroke="#e8dcc8" stroke-width=".4"')}<g transform="translate(.8 2) rotate(26)">${P('M-.7 0H.7L.3 7Q0 8.4 -.3 7Z',AU(q))}</g>${u>=2?C_(-1,-30,2.4,'#fff2b0','opacity=".5"'):''}</g>`}
function book(q,u){return`<g transform="translate(98 100) rotate(8)">${P('M-12 -15H12Q14 -15 14 -13V13Q14 15 12 15H-12Q-14 15 -14 13V-13Q-14 -15 -12 -15Z','#3a2a4a','stroke="#1c1428" stroke-width=".5"')}`
   +`${P('M-11 -13H11V13H-11Z',IV(q))}${L_('M0 -13V13','#cbbca2',.5)}${u>=1?[0,1,2].map(i=>L_(`M-9 ${-8+i*5}q2 -1 4 0t4 0`,'#c8901a',.4,'opacity=".8"')).join(''):''}`
   +`${[[-14,-15],[14,-15],[-14,15],[14,15]].map(([x,y])=>C_(x,y,1.2,AU(q))).join('')}</g>`}
function crvBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(CC[ck])return CC[ck];const q='cvb'+u+(bare?'s':'')+'_';
  return CC[ck]=HA.body({u,q,bare,r:5,name:'Corvin, la Page Blanche',defs:defs(q,u),glow:['#ffffff','#fff2d0','#e8d4a0'],bb:['#f0e4c8','#4a3e78','#0c0a18'],
   halo:'#ffe8b0',halo2:'#d8c8ff',parts:['#fffaf0','#d8c8ff'],ring:['#ffe8b0','#d8c8ff','#fffaf0'],
   back:(q,u)=>letters(10+u*3,[8,4,144,200],7,'#fffaf0',.4)
     +(u>=2?[...Array(u*2)].map((_,k)=>`<g><animateTransform attributeName="transform" type="rotate" values="${k*60} 80 120;${k*60+360} 80 120" dur="${14+k*2}s" repeatCount="indefinite"/><g transform="translate(${80+52} 120) rotate(${k*23})"><rect x="-4" y="-5" width="8" height="10" rx=".8" fill="#fffaf0" opacity=".75"/></g></g>`).join(''):''),
   content:(q,u)=>{let s='';
    /* les serres, sur l'anneau */
    s+=MB(P('M66 204L70 198L74 204L78 199L80 206L74 208H66Z','#b8ac9e')+L_('M66 204L64.4 209M70 198.6L69.6 206M74 204L74.4 209.6M78 199.4L80.6 206.4','#5a4a3a',.7));
    /* la robe, qui s'efface en page blanche */
    s+=`<g mask="url(#${q}er)">`;
    s+=P('M60 64Q80 58 100 64L106 132Q112 170 114 206Q80 214 46 206Q48 170 54 132Z',RB(q));
    s+=P('M54 132Q48 170 46 206Q54 209 62 209L66 136Z','#100c1c','opacity=".4"')+P('M106 132Q112 170 114 206Q106 209 98 209L94 136Z','#100c1c','opacity=".4"');
    s+=L_('M46 206Q80 214 114 206',AU(q),1)+L_('M47.6 200Q80 208 112.4 200',AU(q),.4,'stroke-dasharray="1 2" opacity=".8"');
    /* l'étole d'ivoire couverte d'écriture */
    const st=(x0,d)=>P(`M${x0} 66L${r1(x0+6*d)} 66L${r1(x0+9*d)} 190L${r1(x0+3*d)} 190Z`,IV(q))+[...Array(12)].map((_,i)=>L_(`M${r1(x0+1.6*d+i*.25*d)} ${78+i*9.4}q${r1(.9*d)} -1 ${r1(1.6*d)} 0t${r1(1.6*d)} 0`,u>=1?'#c8901a':'#a8a0b0',.4,`opacity="${u>=1?.85:.55}"`)).join('')
      +L_(`M${x0} 66L${r1(x0+3*d)} 190M${r1(x0+6*d)} 66L${r1(x0+9*d)} 190`,AU(q),.6,'opacity=".9"');
    s+=st(66,1)+st(94,-1);
    s+='</g>';
    s+=letters(8,[50,180,60,30],5,'#fffaf0',.7);
    /* plastron de plumes au col */
    s+=P('M70 62Q80 66 90 62L88.6 82Q80 86 71.4 82Z',DK(q));
    for(let r=0;r<3;r++)for(let k=0;k<3;k++){const x=74.4+k*5.6,y=67+r*5.2;s+=P(`M${r1(x-2.6)} ${y}Q${x} ${r1(y+3.4)} ${r1(x+2.6)} ${y}`,'none','stroke="#a89884" stroke-width=".45"')}
    s+=P('M80 80Q82.6 83 80 88Q77.4 83 80 80Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"');
    /* épaules de la robe, col haut */
    s+=MB(P('M52.4 86Q53 72 62 66Q67.4 62.6 71.6 64.6L68 78Q60 80 52.4 86Z',RB(q))+L_('M53.4 84Q55 74 62 68.6',AU(q),.6,'opacity=".8"')+P('M66 64Q66 56 70.4 51L74.4 57L73 65Z',RS(q)));
    /* aile droite : la plume brisée */
    s+=P('M53.6 80Q47.4 92 46.4 104L54.8 106.6Q56 94 61 84Z',RB(q))+P('M44.6 100Q42 92 45.4 86Q48 92 49.6 100ZM46.6 104Q43.4 98 45 92Q48.6 97 50.6 103Z',PV(q))+P('M44.4 103Q46 108 52.4 108.6Q54.6 104 53 100Z',PF(q));
    s+=quill(q,u);
    /* aile gauche : le livre blanc serré contre lui */
    s+=P('M106.4 80Q113 94 111 108L103 107Q104.4 94 99 84Z',RB(q))+book(q,u)+P('M104.6 108Q110 112 112.6 106Q112 100 108.6 98Q105 102 104.6 108Z',PF(q))+L_('M106 107Q109 108.6 111 105','#8a7e72',.4);
    /* la tête */
    s+=HG(head(q,u));
    if(u>=3)s+=E_(80,9.4,10,2.6,'none','stroke="#ffe8b0" stroke-width="1.4"')+E_(80,9.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
    return s}})}
window.crvPortrait=crvPortrait;window.crvBody=crvBody;
HA.install(CRV,crvPortrait,crvBody,{corvin:()=>crvBody(0,1)});
try{LOOKS[CRV]=['#c8bcae','#efe6da','#302a50','#f0e6d2','#ffd84a','#ffb83a','bg:void back:cape hat:none face:none eyes:glow mouth:none body:robe ear:none head:owl prop:book']}catch(e){}
try{UTH_H[CRV]={n:'La Page Réécrite',m:'#302a50',s:'#f0e6d2',a:'#ffe8b0',e:'#ffb83a',bg:'void',w:'wings-gold',hat:'halo',fx:'stars',c:'#ffe8b0',c2:'#d8c8ff',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('corvin maison',e)}})();
