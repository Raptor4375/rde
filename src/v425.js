/* ================= V425 : PERRIN, redessiné dans le style maison (épique) =================
   Les couleurs et l'étoile de la Garde d'Éther, comme son commandant ; tout est un peu trop grand pour lui. */
(function(){try{
if(typeof PRN==='undefined'||!HEROES[PRN]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP,star8}=HA;
const PC={};
const defs=(q,u)=>HA.lin(q+'sk','#fae2cc','#f0c8aa','#d29e80')+HA.lin(q+'hr','#e8944a','#c8702a','#8a4414',1)
 +HA.lin(q+'pl','#ffffff','#d6dce8','#8a96aa',1)+HA.lin(q+'ml','#c8d0dc','#9aa4b6','#6a7488',1)
 +HA.lin(q+'az','#4a8af0','#2a5ab8','#16306e',1)+HA.lin(q+'au','#fff2b0','#ffd84a','#c8901a')
 +HA.lin(q+'le','#8a6448','#64442e','#3e2a1c',1)+HA.lin(q+'bl','#ffffff','#e2e6ee','#9aa2b4');
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,PL=q=>`url(#${q}pl)`,ML=q=>`url(#${q}ml)`,AZ=q=>`url(#${q}az)`,AU=q=>`url(#${q}au)`,LE=q=>`url(#${q}le)`;
const emblem=(q,x,y,R)=>C_(x,y,r1(R*1.25),'#16306e',`stroke="${AU(q)}" stroke-width="${r1(R*.16)}"`)+P(star8(x,y,R,R*.4),AU(q))+C_(x,y,r1(R*.28),'#ffffff');
/* ---------- la tête ---------- */
function hairBack(q){return P('M35 46Q33.4 31 42 26Q50 22 58 26Q66.6 31 65 46Q64 41 61.6 38H38.4Q36 41 35 46Z',HR(q))}
function face(q,u){
  let s=`<rect x="45.2" y="55" width="9.6" height="12" fill="${SK(q)}"/>`+P('M45.2 59.6Q50 62.6 54.8 59.6L54.8 64.4Q50 66.4 45.2 64.4Z','#c89272','opacity=".55"');
  s+=MI(P('M36.4 44.4Q32.6 44 33 48.2Q33.6 52 37 51.8Z','#ecb898')+L_('M35.6 45.8Q34.4 47.2 35.2 49.4','#b8826a',.45));
  /* un visage encore rond : dix-sept ans */
  s+=P('M36.4 44.4Q36.4 30.4 50 30.4Q63.6 30.4 63.6 44.4Q63.6 53.4 60 58.8Q55.6 64.6 50 65Q44.4 64.6 40 58.8Q36.4 53.4 36.4 44.4Z',SK(q));
  s+=P('M58.6 46Q62 52 59.6 57.6Q57 61.4 53.4 63.2Q58 58.8 59.4 52.6Z','#c89272','opacity=".38"');
  const eo={w:3.5,h:2.4,iris:'#5a8ac8',iris2:'#2a5aa0',pupil:'#0e1a2e',lid:'#5a3a1e',lidW:1,ir:1.75,look:.1};
  s+=HA.eye(44,47,eo)+HA.eye(56,47,eo);
  /* sourcils froncés : il a peur, il reste */
  s+=L_('M39.6 42.6Q43.4 40.6 47.6 42.4','#a8581e',1.2)+L_('M52.4 42.4Q56.6 40.6 60.4 42.6','#a8581e',1.2)+L_('M47.6 42.4L48.4 43.4M52.4 42.4L51.6 43.4','#a8581e',.6);
  s+=L_('M57.2 40.4L58.2 42.6','#fae2cc',.7);
  s+=L_('M50.4 48.6L49.6 52.8Q50.4 53.6 51.8 53','#c89272',.65);
  s+=L_('M46.6 58.2Q50 57.4 53.4 58.2','#a8584a',.85)+L_('M47.6 59.6Q50 60.2 52.4 59.6','#e0a090',.4,'opacity=".7"');
  /* taches de rousseur et un pansement sur la joue */
  s+=[[40.8,51.4],[42.4,52.6],[41.2,53.4],[43.8,51.6],[59.2,51.4],[57.6,52.6],[58.8,53.4],[56.2,51.6],[48.6,51],[51.4,51.2],[50,50.4]].map(([x,y])=>C_(x,y,.38,'#c0703a','opacity=".75"')).join('');
  s+=`<g transform="rotate(-22 58.4 55)"><rect x="55.6" y="53.8" width="5.6" height="2.4" rx=".8" fill="#f4e4cc" stroke="#d0b896" stroke-width=".25"/>${C_(57.4,55,.22,'#d0b896')}${C_(59.4,55,.22,'#d0b896')}</g>`;
  /* cheveux roux en bataille sous le casque */
  s+=P('M36.4 44Q35.6 34 41 30L59 30Q64.4 34 63.6 44Q62 38.6 58.6 37.4L56.4 40.4L54.6 37L51.6 40.6L49.6 37L46.6 40.2L44.8 37.4L42.2 40.2L41.2 37.6Q38 39.6 36.4 44Z',HR(q))
    +L_('M42.2 40.2L43.6 36.6M46.6 40.2L47.4 36.4M51.6 40.6L52 36.6M56.4 40.4L56 36.8','#ffb46a',.45,'opacity=".9"');
  /* le casque, trop grand, repoussé en arrière, cabossé */
  s+=P('M33 33.6Q33.4 18 50 16.6Q66.6 18 67 33.6Q58 30.6 50 30.6Q42 30.6 33 33.6Z',PL(q))+P('M30.6 34.6Q50 28.6 69.4 34.6L68.6 37.6Q50 32 31.4 37.6Z',PL(q),'stroke="#6a7488" stroke-width=".35"');
  s+=L_('M50 16.8V30.4','#8a96aa',.8)+L_('M36 30Q37.4 22 44 19.2','#ffffff',.8,'opacity=".75"')+P('M58 21.6Q61.6 24 62.2 27.6Q59.6 25.6 57.4 25Z','#8a96aa','opacity=".6"')
    +L_('M31.4 36.4Q50 30.8 68.6 36.4',AU(q),.5,'opacity=".8"')+[38,44,56,62].map(x=>C_(x,r1(34.6-Math.abs(50-x)*.02),.45,'#8a96aa')).join('');
  return s}
/* ---------- buste ---------- */
function bust(q,u){
  /* cotte de mailles sous le tabard */
  let s=P('M8 100Q10 82 22 74L78 74Q90 82 92 100Z',ML(q));
  for(let y=78;y<100;y+=3)s+=L_(`M${r1(12+(100-y)*.3)} ${y}H${r1(88-(100-y)*.3)}`,'#5e6878',.35,'stroke-dasharray=".9 .9" opacity=".7"');
  /* le tabard bleu de la Garde, trop large */
  s+=P('M30 74Q50 70 70 74L74 100H26Z',AZ(q))+L_('M30 74L26 100M70 74L74 100',AU(q),.75)+emblem(q,50,88,5.6);
  s+=P('M40.4 62.4Q50 67.4 59.6 62.4L62 70.4Q50 75.6 38 70.4Z',ML(q))+L_('M40.8 65Q50 69.6 59.2 65M39 68.4Q50 73 61 68.4','#5e6878',.35,'stroke-dasharray=".9 .9"');
  /* une seule épaulière, en cuir, l'autre manque */
  s+=P('M10 90Q11 78 22 73Q32 70 38 75L34 84Q22 84 10 90Z',LE(q))+L_('M11 88Q14 79 22 75','#a88060',.5,'opacity=".8"')+C_(20,79,.9,AU(q))+C_(28,76.6,.9,AU(q));
  return s}
const PO={name:'Perrin le Dernier de la Garde',cls:'Tank',r:3,TC:'#ffd84a',rays:1,rayOp:.06,
  bg:['#eef6ff','#a8ccff','#3a68c0','#16285a','#080e22'],glow:['#ffffff','#d8e8ff','#8ab4ff'],parts:['#fff6c8','#bfe2ff']};
function prnPortrait(u){u=0;if(PC.p)return PC.p;const q='prp_';
  return PC.p=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),content:(q,u)=>hairBack(q)+bust(q,u)+face(q,u)}))}
/* ---------- corps entier ---------- */
function prnBody(u,bare){const ck='b'+(bare?'s':'');if(PC[ck])return PC[ck];const q='prb'+(bare?'s':'')+'_';
  return PC[ck]=HA.body({u:0,q,bare,r:3,name:'Perrin le Dernier de la Garde',defs:defs(q,0),glow:['#ffffff','#d8e8ff','#8ab4ff'],bb:['#bfdcff','#2a4a9a','#080e22'],
   parts:['#fff6c8','#bfe2ff'],ring:['#ffd84a','#8ab4ff','#bfe2ff'],
   content:(q,u)=>{let s='';
    s+=HG(hairBack(q));
    /* jambes : mailles et bottes trop grandes */
    const leg=P('M68.6 128L77.6 128L76.8 178L69.4 178Z',ML(q))+L_('M69 136H77.4M69 144H77.2M69.2 152H77M69.2 160H77M69.4 168H76.8','#5e6878',.35,'stroke-dasharray=".9 .9"')
      +P('M66 170L79 170L79.6 205L63.4 208Q63 196 66 170Z',LE(q))+P('M65.4 168.6L79.6 168.6L79.8 175Q72.6 177 65.2 175Z','#8a6448')+L_('M65.2 175Q72.6 177 79.8 175','#3e2a1c',.6)
      +P('M63 205L79.8 203.4L80 210.8L59.6 212.4Q59.8 207.6 63 205Z','#2e2016');
    s+=MB(leg);
    /* cotte de mailles et tabard trop long */
    s+=P('M62 66Q80 60 98 66L100 128Q80 134 60 128Z',ML(q));
    for(let y=72;y<128;y+=4)s+=L_(`M62.4 ${y}H97.6`,'#5e6878',.35,'stroke-dasharray=".9 .9" opacity=".7"');
    s+=P('M68 64Q80 61 92 64L94 168Q80 172 66 168Z',AZ(q))+L_('M68 64L66 168M92 64L94 168',AU(q),.75)+L_('M66 168Q80 172 94 168',AU(q),.9)+emblem(q,80,92,7);
    s+=P('M70 120L80 166L90 120','none',`stroke="#16306e" stroke-width=".6" opacity=".6"`);
    /* ceinture de cuir, et l'épée encore au fourreau */
    s+=P('M61 116Q80 122 99 116L99.4 121.6Q80 127.6 60.6 121.6Z',LE(q))+`<rect x="76.4" y="117.4" width="7.2" height="6" rx="1.2" fill="none" stroke="${AU(q)}" stroke-width="1"/>`;
    s+=P('M58.4 120L62.6 121L57 166L52.6 165Z',LE(q),'stroke="#2e2016" stroke-width=".4"')+P('M52.6 165L57 166L55.6 170L52 169Z',AU(q))
      +P('M56.6 114L63.4 115.6L62.8 117.8L56 116.2Z',AU(q))+`<rect x="58.4" y="107.6" width="3" height="7" rx=".6" fill="#3e2a1c" transform="rotate(10 59.9 111)"/>`+C_(60.6,106.6,1.5,AU(q));
    /* une épaulière de cuir, l'autre épaule à nu sous les mailles */
    s+=P('M50.6 86Q51 74 60.6 68Q66.6 64.6 71 67L67 80Q58.6 81 50.6 86Z',LE(q))+L_('M51.6 84Q53 75 60.4 70','#a88060',.55,'opacity=".8"')+C_(56.6,76,.9,AU(q))+C_(62.6,72,.9,AU(q));
    s+=P('M89 67Q95 65 101 70L103.6 80Q98 77 92.6 78Z',ML(q));
    /* bras droit : la main sur la poignée de l'épée */
    s+=P('M53.4 80Q48.6 96 50 110L58 110.6Q58 96 61 84Z',ML(q))+L_('M50.6 90H58.6M50.2 96H58.4M50.2 102H58.2','#5e6878',.35,'stroke-dasharray=".9 .9"')
      +P('M49.4 108.4L58.6 109L58.4 113.4L49.4 112.8Z',LE(q))+E_(56.4,113.6,4.2,3.6,LE(q))+L_('M53.2 114.6Q56.4 116.6 59.6 114.6','#3e2a1c',.4);
    /* bras gauche, derrière le bouclier */
    s+=P('M101 72Q108 86 108 102L100 103Q100 90 96 80Z',ML(q));
    /* le bouclier : plus grand que lui, cabossé, l'étoile de la Garde */
    const so='M90 94Q112 86 134 94L133 166Q125 192 112 206Q99 192 91 166Z',si='M93 97Q112 90.4 131 97L130.2 164.6Q122.8 188.4 112 200.4Q101.2 188.4 93.8 164.6Z';
    s+=P(so,PL(q),'stroke="#4a556a" stroke-width=".7"')+P(si,AZ(q))+L_(si,AU(q),.9)+emblem(q,112,140,10.4)
      +L_('M95 104L106 95','#ffffff',1.2,'opacity=".45"')
      +P('M118 112Q122 115 121 120Q118 117 115.6 117.6Z','#0e1a3a','opacity=".55"')+L_('M118 112Q121.6 115.4 121 120','#8ab4ff',.4,'opacity=".6"')
      +C_(100,160,1.4,'#0e1a3a')+C_(124,170,1.2,'#0e1a3a')+L_('M99 159L95.4 155.6M123 169.4L127 166','#5a3a24',.9)
      +[[93,99],[131,99],[93,164],[131,164],[112,197]].map(([x,y])=>C_(x,y,.9,AU(q))).join('');
    s+=HG(face(q,0));
    return s}})}
window.prnPortrait=prnPortrait;window.prnBody=prnBody;
HA.install(PRN,prnPortrait,prnBody,{perrin:()=>prnBody(0,1)});
try{LOOKS[PRN]=['#f6d4b8','#c8702a','#2a5ab8','#9aa4b6','#ffd84a','#5a8ac8','bg:holy back:shield hair:short hat:helm eyes:normal mouth:neutral body:heavy ear:human']}catch(e){}
}catch(e){console.warn('perrin maison',e)}})();
