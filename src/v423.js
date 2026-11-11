/* ================= V423 : ROUGE-GARANCE, redessinée dans le style maison ================= */
(function(){try{
if(typeof GAR==='undefined'||!HEROES[GAR]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP}=HA;
const GC={};
const defs=(q,u)=>HA.lin(q+'sk','#f8e0cc','#ecc6aa','#cc9a7e')+HA.lin(q+'hr','#a8402c','#7a2418','#4a120c',1)
 +HA.lin(q+'cr',u>=2?'#e8405a':'#cc2c46','#a01c34','#6a0c1e',1)+HA.lin(q+'wi','#6a1424','#4a0c18','#2a0610',1)
 +HA.lin(q+'wh','#ffffff','#f4ece2','#d8ccbc',1)+HA.lin(q+'au','#fff2b0','#ffd84a','#c8901a')
 +HA.lin(q+'dy','#e05068','#b02840','#7a1428',1)+HA.lin(q+'bl','#ffffff','#e2e6ee','#9aa2b4')
 +HA.lin(q+'bo','#3a2430','#24161e','#140c12',1);
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,CR=q=>`url(#${q}cr)`,WI=q=>`url(#${q}wi)`,WH=q=>`url(#${q}wh)`,AU=q=>`url(#${q}au)`,DY=q=>`url(#${q}dy)`,BL=q=>`url(#${q}bl)`,BO=q=>`url(#${q}bo)`;
/* ---------- la tête ---------- */
function hairBack(q,len=1){/* la queue-de-cheval haute qui retombe dans le dos */
  return P('M36 44Q34 30 42 24.6Q50 20.6 58 24.6Q66 30 64 44Z',HR(q))
   +P(`M58 26Q70 22 73 34Q75 46 70 ${r1(62*len)}Q67 ${r1(74*len)} 69 ${r1(86*len)}Q61 ${r1(76*len)} 62 ${r1(62*len)}Q64 46 60 36Z`,HR(q))
   +L_(`M62 30Q70 30 70.6 42Q71 52 67.6 ${r1(64*len)}M60.6 34Q66 38 66 48`,'#c8604a',.5,'opacity=".7"')}
function face(q,u){
  let s=`<rect x="45.6" y="55" width="8.8" height="13" fill="${SK(q)}"/>`+P('M45.6 59.6Q50 62.8 54.4 59.6L54.4 64.4Q50 66.2 45.6 64.4Z','#c08a70','opacity=".55"');
  s+=MI(P('M36.8 44.6Q33.6 44.2 34 48Q34.6 51.4 37.4 51.2Z','#e6b898'));
  s+=C_(35.2,51.8,.9,AU(q))+C_(64.8,51.8,.9,AU(q));
  s+=P('M37 44.4Q37 30.6 50 30.6Q63 30.6 63 44.4Q63 52.6 59.6 58.2Q55.4 63.8 50 64.4Q44.6 63.8 40.4 58.2Q37 52.6 37 44.4Z',SK(q));
  s+=P('M58.4 46Q61.6 52 59 57.4Q56.6 61 53 62.8Q57.6 58.4 59 52.4Z','#c88a6c','opacity=".4"');
  /* regard de duelliste : ambre, un peu plissé, un trait de cil */
  const eo={w:3.5,h:2.3,iris:u>=3?'#ffb02a':'#c8642a',iris2:'#7a3214',pupil:'#1a0a06',lid:'#3a1210',lidW:1.15,lash:1,ir:1.75,look:.4,glow:u>=1?'#ff8a5a':null};
  s+=HA.eye(44,47,eo)+HA.eye(56,47,eo);
  /* sourcils arqués, le droit un peu relevé : elle te jauge */
  s+=L_('M39.8 42Q43.4 39.6 47.4 41.2','#5a1a12',1.15)+L_('M52.6 40.6Q56.6 38.8 60.4 41','#5a1a12',1.15);
  s+=L_('M50.4 48.6L49.7 52.8Q50.4 53.6 51.6 53.1','#c08a70',.65);
  /* le sourire en coin */
  s+=P('M46.6 57.6Q50 58.4 53.8 56.8Q52.8 59.8 50 60.2Q47.6 60 46.6 57.6Z','#a83040')+L_('M46.2 57.6Q50 58.6 54.2 56.6','#7a1a28',.6)+P('M47.6 59Q50 60.6 52.6 58.8Q50 59.8 47.6 59Z','#e07a84','opacity=".8"')
    +L_('M54.2 56.6Q55 56 55.4 55.2','#a87060',.4,'opacity=".7"');
  s+=MI(E_(41.6,53.4,2.8,1.3,'#ff7a7a','opacity=".2"'));
  /* la cicatrice, sur la joue */
  s+=L_('M57.6 50.2L60.2 55.8','#d8968a',.75)+L_('M57.6 50.2L60.2 55.8','#f6d0c4',.3)+L_('M58 51.8L59.2 51.4M58.6 53.4L59.8 53M59.2 55L60.4 54.6','#d8968a',.35);
  /* cheveux tirés en arrière, raie de côté, quelques mèches libres */
  s+=P('M36.4 44Q35.4 30.4 43.6 25.6Q51.6 22 59.4 25.8Q65.4 29.8 64 43.6Q62.4 35.6 57.4 32.4Q51 34 45 33.4Q40 35.6 36.4 44Z',HR(q))
    +L_('M44 27.2Q49 25.4 54.4 26.2M41 31.4Q46 28.6 52 28.8M53.6 29.6Q58.6 30.6 61.6 34.4','#d0705a',.5,'opacity=".85"');
  s+=P('M38.4 38Q36 46 37.8 54Q38.6 47 41 41Z',HR(q))+P('M61.2 37.4Q64 44 62.6 50.6Q61.6 45 59.4 40.4Z',HR(q));
  /* le ruban rouge qui noue la queue */
  s+=P('M60 25.4Q63.4 22 66.2 24.6Q64.4 27.4 61.4 28Z',CR(q))+P('M61.6 26.4Q66 27.4 67.6 31.8Q64.6 30.6 61.2 29Z',CR(q))+C_(61.4,26.8,1.1,'#7a0c1c');
  return s}
/* ---------- buste ---------- */
function jabot(q,x,y,s=1){let o='';for(let i=0;i<4;i++){const yy=y+i*3.4*s;o+=P(`M${r1(x-3.8*s+i*.3*s)} ${r1(yy)}Q${x} ${r1(yy+3.2*s)} ${r1(x+3.8*s-i*.3*s)} ${r1(yy)}Q${x} ${r1(yy+5*s)} ${r1(x-3.8*s+i*.3*s)} ${r1(yy)}Z`,WH(q),`stroke="#c8bcac" stroke-width="${r1(.25*s)}"`)}return o}
function bust(q,u){
  let s=P('M8 100Q10 82 22 74L78 74Q90 82 92 100Z',CR(q))+P('M12 100Q14 86 24 78L28 100Z','#3a0610','opacity=".45"');
  /* demi-cape sur l'épaule gauche, bordée d'or */
  s+=P('M58 72Q78 70 88 80Q96 90 96 100H60Z',WI(q))+L_('M58 72Q78 70 88 80Q96 90 96 100',AU(q),.9)+L_('M62 76Q78 75 86 84','#8a2a3a',.5,'opacity=".7"');
  /* col de chemise et jabot */
  s+=P('M40.6 62.4Q50 67.4 59.4 62.4L62 71.4Q50 76.4 38 71.4Z',WH(q))+L_('M41 64Q50 68.6 59 64','#c8bcac',.4);
  s+=jabot(q,50,70,1.05)+L_('M38 71.4L50 84M62 71.4L50 84',AU(q),.6,'opacity=".9"');
  /* pourpoint : boutons et galons d'or */
  s+=MI(P('M22 74Q30 70 40 70L44 76L36 100H24Z',CR(q))+L_('M40 70L44 76L36 100',AU(q),.8)+L_('M13 94Q18 81 28 76.4',AU(q),.7,'opacity=".8"'));
  s+=[84,90,96].map(y=>MI(C_(40.4,y,1.05,AU(q),'stroke="#8a5a1a" stroke-width=".25"'))).join('');
  return s}
/* ---------- portrait ---------- */
const PO={name:'Rouge-Garance la Duelliste',cls:'Guerrier',r:4,TC:'#ff6a7e',
  bg:['#fff4ec','#ffb4a8','#a82a3e','#3a0a16','#120307'],glow:['#ffffff','#ffd0c8','#ff7a8a'],halo:'#ffd8a0',halo2:'#ffb8a8',
  frame:['#ffe08a','#ff8a9a'],parts:['#fff0e8','#ffb0b8'],rayCol:'#fff4ec'};
const petal=(x,y,a,sc,c)=>`<path transform="translate(${x} ${y}) rotate(${a}) scale(${sc})" d="M0 0Q2.6 -3.4 0 -6.4Q-2.6 -3.4 0 0Z" fill="${c}" opacity=".85"/>`;
function blades(cx,cy,R,op){return`<g opacity="${op}">${L_(`M${r1(cx-R)} ${r1(cy+R*.7)}L${r1(cx+R)} ${r1(cy-R*.7)}`,'#fff4ec',.7)}${L_(`M${r1(cx-R)} ${r1(cy-R*.7)}L${r1(cx+R)} ${r1(cy+R*.7)}`,'#fff4ec',.7)}</g>`}
function garPortrait(u){u=Math.max(0,Math.min(3,u|0));if(GC['p'+u])return GC['p'+u];const q='grp'+u+'_';
  return GC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>blades(50,36,40,.16+u*.05)+[[14,26,20,.9],[86,30,-30,.8],[20,62,60,.7],[82,64,-40,.8],[30,12,10,.6],[70,10,-20,.6]].slice(0,2+u).map(([x,y,a,s],k)=>petal(x,y,a,s,k%2?'#ff8a9a':'#e8405a')).join(''),
    content:(q,u)=>hairBack(q)+bust(q,u)+face(q,u)+(u>=3?E_(50,20.8,11,2.8,'none','stroke="#ffd8a0" stroke-width="1.4"')+E_(50,20.8,11,2.8,'none','stroke="#ffffff" stroke-width=".5"'):'')}))}
/* ---------- corps entier ---------- */
function rapier(q,u){return`<g transform="translate(55.4 132) rotate(32)">`
   +`<rect x="-1.3" y="-9" width="2.6" height="9.6" rx=".8" fill="#2a1820"/>`+L_('M-1.3 -7L1.3 -6M-1.3 -4.4L1.3 -3.4','#6a4a4a',.4)+C_(0,-10.2,1.7,AU(q),'stroke="#8a5a1a" stroke-width=".3"')
   +L_('M-6.4 0H6.4',AU(q),1.7)+L_('M-6.4 .4Q-7.4 4.4 -3.8 7M6.4 .4Q7.4 4.4 3.8 7',AU(q),.8)+L_('M-4.4 -.6Q-6.8 -4.4 -2.8 -8',AU(q),.75)
   +P('M-1.15 .8H1.15L.5 78Q0 80.6 -.5 78Z',BL(q),'stroke="#6a7488" stroke-width=".25"')+L_('M0 2V76','#ffffff',.35,'opacity=".8"')
   +(u>=2?L_('M0 2V76','#ff8a9a',.8,`opacity="${.15+u*.12}"`):'')+'</g>'}
function garBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(GC[ck])return GC[ck];const q='grb'+u+(bare?'s':'')+'_';
  return GC[ck]=HA.body({u,q,bare,r:4,name:'Rouge-Garance la Duelliste',defs:defs(q,u),glow:['#ffffff','#ffd0c8','#ff7a8a'],bb:['#ffc0b8','#8a1c30','#160409'],
   halo:'#ffd8a0',halo2:'#ffb8a8',parts:['#fff0e8','#ffb0b8'],ring:['#ffd8a0','#ff7a8a','#ffb0b8'],
   back:(q,u)=>blades(80,40,46,.12+u*.04)+[...Array(2+u)].map((_,k)=>`<g opacity=".8"><animateMotion dur="${(5+k*.9).toFixed(1)}s" begin="${-k*1.3}s" repeatCount="indefinite" path="M${30+k*30} -6q${k%2?10:-10} 90 ${k%2?-6:6} 200"/>${petal(0,0,k*40,1.1,k%2?'#ff8a9a':'#e8405a')}</g>`).join(''),
   content:(q,u)=>{let s='';
    /* la queue-de-cheval dans le dos */
    s+=HG(hairBack(q,1.18));
    /* demi-cape derrière l'épaule gauche */
    s+=P('M90 63Q114 68 119 104Q121 136 113 166Q102 161 93 163L96 104Z',WI(q))+L_('M113 166Q102 161 93 163','#ffd84a',1.1)+L_('M91 65Q112 71 116.6 104Q118.4 134 111.4 162',AU(q),.7,'opacity=".85"')+P('M96 104L93 163Q99 161.6 104 162L104 108Z','#1a0408','opacity=".35"');
    /* jambes : culotte sombre, bottes à revers rouges */
    const legL=P('M68.4 128L77.6 128L76.4 178L69 178Z',BO(q))+P('M66.6 172L78.2 172L78.6 205L64.6 208Q64 196 66.6 172Z','#120a10')+P('M66.2 170.6L78.6 170.6L78.8 177.4Q72.6 179 66 177.4Z',CR(q))+L_('M66 177.4Q72.6 179 78.8 177.4',AU(q),.6)
      +P('M64.2 205L78.8 203.4L79 210.6L61 212Q61.2 207.6 64.2 205Z','#0a060a');
    const legR=P('M82.4 128L91.6 128L92.4 178L84 178Z',BO(q))+P('M82 172L93.6 172L96.6 205L82.4 208Z','#120a10')+P('M81.6 170.6L94 170.6L94.4 177.4Q88 179 81.6 177.4Z',CR(q))+L_('M81.6 177.4Q88 179 94.4 177.4',AU(q),.6)
      +P('M82.4 205L96.4 203.6L99.6 210.4L82 212Z','#0a060a');
    s+=legL+legR;
    /* basques du pourpoint et ceinture d'étoffe nouée */
    s+=P('M62 112Q80 118 98 112L101 132Q80 138 59 132Z',CR(q))+L_('M59 132Q80 138 101 132',AU(q),.9)+L_('M80 116V135','#6a0c1e',.6);
    s+=P('M61 108Q80 114.6 99 108L99.6 116.4Q80 123 60.4 116.4Z','#e8405a')+L_('M61 110Q80 116.6 99 110','#ff8a9a',.5,'opacity=".7"')+L_('M60.6 114.4Q80 121 99.4 114.4','#8a1428',.5);
    s+=P('M93 113Q98 120 97 134L93 133Q94 122 90 116Z','#d0304a')+P('M95 114Q102 122 103 136L99.6 136.6Q98.6 124 93.6 117Z','#b02840')+C_(93,113.4,2.2,'#c8243e','stroke="#8a1428" stroke-width=".4"');
    /* le pourpoint cramoisi */
    s+=P('M62 64Q80 58.6 98 64L99.6 96Q97 108 80 110Q63 108 60.4 96Z',CR(q));
    s+=P('M72.6 64.2L80 74L87.4 64.2Q80 61.4 72.6 64.2Z',WH(q))+jabot(q,80,70,1.1)+L_('M72 64.6L80 76L88 64.6',AU(q),.7);
    s+=L_('M80 78V108',AU(q),.7)+[84,92,100].map(y=>C_(80,y,1.15,AU(q),'stroke="#8a5a1a" stroke-width=".3"')).join('')
      +L_('M64.6 72Q66 92 63.2 104M95.4 72Q94 92 96.8 104','#6a0c1e',.6,'opacity=".8"')+L_('M63.2 70Q65.4 88 63.4 100','#ff8a9a',.5,'opacity=".4"');
    /* épaules à galons d'or */
    s+=MB(P('M53.6 84Q53.4 73 61.6 67Q67 63.6 71 65.6L67 78Q60 80 53.6 84Z',CR(q))+L_('M54.4 82.4Q55.4 73.4 61.6 68.4',AU(q),.8)+L_('M56.4 84.4Q58 76.6 63.4 72.4',AU(q),.5,'stroke-dasharray=".8 1.4" opacity=".9"'));
    /* bras droit : manche blanche bouffante, la main sur la garde, lame basse */
    s+=P('M52.8 78Q47 96 48.6 114L58.2 114.6Q58 96 61.6 82Z',WH(q))+L_('M50 96L58.6 97','#c8bcac',.5)+L_('M49.4 104Q53 102 58.4 104','#c8bcac',.4)
      +P('M48 112.6L58.8 113.2L58.6 119.6L48.2 119Z',CR(q))+L_('M48 112.6L58.8 113.2',AU(q),.6);
    s+=rapier(q,u)+E_(53.4,123,4.4,3.8,SK(q))+L_('M50.2 124.2Q53.4 126.2 56.6 124.2','#c08a70',.45);
    /* bras gauche : la main sur la hanche, l'avant-bras teint de garance jusqu'au coude */
    s+=P('M103.6 75Q112 86 114.6 98L106.4 101Q103.4 90 97 82Z',WH(q))+L_('M111.6 88L103.4 91','#c8bcac',.5)+P('M105.6 98.6L114.8 96L116.2 101.4L107.2 104Z','#f4ece2')+L_('M105.8 101.6L115.4 99','#c8bcac',.4);
    s+=P('M107.2 103.6L116 101Q117.2 110 108.6 119.4L102.6 116Q108 110 107.2 103.6Z',DY(q))+L_('M107.2 103.6L116 101','#5a0a18',.8)
      +L_('M110.6 106Q111 110 109 113.6M113.6 105Q113.6 108.6 112 111.6','#ff8a9a',.45,'opacity=".6"');
    s+=P('M102.6 116L108.6 119.4Q106 123.6 101.4 123.4Q98.6 122 99.6 119Z',DY(q))+L_('M100.4 120.4Q103.2 121.6 106 120','#5a0a18',.45);
    /* la tête */
    s+=HG(face(q,u));
    if(u>=3)s+=E_(80,15.4,10,2.6,'none','stroke="#ffd8a0" stroke-width="1.4"')+E_(80,15.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
    return s}})}
window.garPortrait=garPortrait;window.garBody=garBody;
HA.install(GAR,garPortrait,garBody,{garance:()=>garBody(0,1)});
try{LOOKS[GAR]=['#f6dcc6','#7a2418','#a01c34','#f4ece2','#ffd84a','#c8642a','bg:blood back:cape hb:pony hair:side eyes:fierce mouth:smirk body:tunic ear:human prop:dagger']}catch(e){}
try{UTH_H[GAR]={n:'La Botte Rouge',m:'#a01c34',s:'#f4ece2',a:'#ff6a7e',e:'#ffb02a',bg:'blood',w:'wings-gold',hat:'halo',fx:'embers',c:'#ff6a7e',c2:'#ffd8a0',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('garance maison',e)}})();
