/* ================= V422 : MARN, redessiné dans le style maison ================= */
(function(){try{
if(typeof MARN==='undefined'||!HEROES[MARN]||!window.HA)return;
const {r1,P,L_,C_,E_,MI,MB,HG,STARP}=HA;
const MC={};
/* les matières */
const defs=(q,u)=>HA.lin(q+'sk','#f4e0d0','#e4c8b2','#c4a088')+HA.lin(q+'hr','#33304a','#211e32','#141220',1)
 +HA.lin(q+'co','#3a3654','#262338','#16141f',1)+HA.lin(q+'cs','#2e2a44','#1f1c2e','#121019')
 +HA.lin(q+'rd',u>=2?'#d8445a':'#b42e44','#8a1a2a','#560c18',1)+HA.lin(q+'le','#8a6c56','#5e4636','#3a2a22',1)
 +HA.lin(q+'ag','#ffffff','#d6dbe6','#8a92a6')+HA.lin(q+'bl','#ffffff','#dfe4ee','#97a0b4')
 +HA.lin(q+'st','#f8faff','#dfe6f0','#b8c2d4');
const SK=q=>`url(#${q}sk)`,HR=q=>`url(#${q}hr)`,CO=q=>`url(#${q}co)`,CS=q=>`url(#${q}cs)`,RD=q=>`url(#${q}rd)`,LE=q=>`url(#${q}le)`,AG=q=>`url(#${q}ag)`,BL=q=>`url(#${q}bl)`,ST=q=>`url(#${q}st)`;
const EYE='#7fd6b8',EYE2='#3a9a80';
/* ---------- la tête (repère du portrait) ---------- */
function hairBack(q){return P('M34.6 47Q32.4 30 41.6 24.8Q50 20.8 58.4 24.8Q67.6 30 65.4 47Q66.4 54 64.6 58L62.6 50Q62.4 41 60 37.4H40Q37.6 41 37.4 50L35.4 58Q33.6 54 34.6 47Z',HR(q))}
function lock(q,x,y,s=1){return L_(`M${r1(x-1.5*s)} ${r1(y-.6*s)}V${r1(y-2.2*s)}Q${r1(x-1.5*s)} ${r1(y-4*s)} ${x} ${r1(y-4*s)}Q${r1(x+1.5*s)} ${r1(y-4*s)} ${r1(x+1.5*s)} ${r1(y-2.2*s)}V${r1(y-.6*s)}`,'#9aa2b4',r1(.85*s))
  +`<rect x="${r1(x-2.4*s)}" y="${r1(y-.8*s)}" width="${r1(4.8*s)}" height="${r1(4*s)}" rx="${r1(.9*s)}" fill="${AG(q)}" stroke="#5a6274" stroke-width="${r1(.3*s)}"/>`
  +C_(x,r1(y+.8*s),r1(.48*s),'#2a2a3a')+P(`M${r1(x-.25*s)} ${r1(y+.9*s)}h${r1(.5*s)}l${r1(.2*s)} ${r1(1.4*s)}h${r1(-.9*s)}Z`,'#2a2a3a')+L_(`M${r1(x-1.9*s)} ${r1(y-.3*s)}H${r1(x-.6*s)}`,'#ffffff',r1(.35*s),'opacity=".8"')}
function face(q,u){const cut=u>=3;
  let s=`<rect x="45.4" y="55" width="9.2" height="12" fill="${SK(q)}"/>`+P('M45.4 59.6Q50 62.6 54.6 59.6L54.6 64.4Q50 66.4 45.4 64.4Z','#b08a74','opacity=".65"');
  s+=MI(P('M36.4 44Q32.8 43.6 33.2 47.8Q33.8 51.4 37 51.2Z','#e0bea6')+L_('M35.6 45.4Q34.4 46.8 35.2 49','#a88068',.45));
  s+=P('M36.6 44Q36.6 30.2 50 30.2Q63.4 30.2 63.4 44Q63.4 52.4 60 58.2Q55.6 64.6 50 65.4Q44.4 64.6 40 58.2Q36.6 52.4 36.6 44Z',SK(q));
  s+=P('M58.6 46Q62 52 59.4 58Q56.8 62 53.2 64.2Q58 59.4 59.4 52.6Z','#b08a74','opacity=".42"');
  /* pommettes creusées : un visage qui ne parle plus */
  s+=MI(L_('M38.6 51.6Q40.6 55 43.4 56.6','#b89078',.5,'opacity=".55"'));
  /* les yeux : étroits, d'un vert d'eau très pâle — c'est tout ce qui parle chez lui */
  const eo={w:3.3,h:2,narrow:1,iris:u>=2?'#b6f4e0':EYE,iris2:EYE2,pupil:'#0c1816',lid:'#16141f',lidW:1.1,ir:1.45,glow:u>=1?'#9fe8c8':null};
  s+=HA.eye(44,47,eo)+HA.eye(56,47,eo);
  s+=MI(L_('M40.6 49.8Q44 50.8 47 50','#a88470',.4,'opacity=".55"'));
  s+=MI(L_('M39.4 42.4Q43.4 41.2 47.8 42.2','#1a1826',1.35));
  s+=L_('M50.6 47.8L49.7 53.2Q50.4 54 51.8 53.4','#a88068',.7);
  /* la muselière de cuir, cousue, et le petit cadenas */
  if(!cut){s+=P('M37 51.8Q42.4 56.8 50 56.4Q57.6 56.8 63 51.8L63.4 55Q58.2 60.6 50 60.4Q41.8 60.6 36.6 55Z',LE(q))
     +L_('M37.4 52.2Q42.6 57.2 50 56.8Q57.4 57.2 62.6 52.2','#c0a088',.45,'opacity=".8"')
     +L_('M38.2 53.6Q43 58 50 57.8Q57 58 61.8 53.6M37.8 54.8Q42.8 59.4 50 59.2Q57.2 59.4 62.2 54.8','#d8c0a8',.25,'stroke-dasharray=".6 .8" opacity=".75"')
     +MI(C_(38.8,54,.62,AG(q),'stroke="#5a6274" stroke-width=".2"'))+lock(q,50,58.4,1)}
  else{/* ultra III : la sangle est tranchée, elle pend ; on voit enfin sa bouche, close */
     s+=L_('M47 58.8Q50 59.6 53 58.8','#8a5a52',.85)+L_('M47.8 60.4Q50 60.8 52.2 60.4','#c8a090',.4,'opacity=".7"');
     s+=P('M36.8 50.4Q38.6 53.2 41.4 54.6L40.4 57.8Q37.6 56 36.4 54.6Z',LE(q))+P('M63.2 50.4Q61.4 53.2 58.6 54.6L59.6 57.8Q62.4 56 63.6 54.6Z',LE(q))
       +P('M41.4 54.6L43.4 63.4L41.4 64L39.6 57.6Z',LE(q))+lock(q,42.4,66.8,.8)}
  /* cheveux : frange balayée, et la mèche blanche */
  s+=MI(P('M36.2 46.4Q36 50.6 37.8 54L39 52.6Q37.6 50 37.4 46.6Z',HR(q)));
  s+=P('M35.8 43Q35 30 42.4 25.6Q50.4 21.8 58.4 25.6Q65 30 64.2 43Q62.6 36.8 59 34.6Q55.4 38.8 49.4 40.2Q52.6 36.6 52.8 33.8Q46.6 38.6 39.6 40Q37 41 35.8 43Z',HR(q))
    +L_('M42.4 27.6Q47.4 25.6 52.6 26.6M39.6 33Q44 29.2 49.4 29M46.2 35.6Q49.6 32.4 52 30','#4a4664',.5,'opacity=".9"');
  s+=P('M55.6 25.4Q61.6 27.4 63.6 34.6Q64.6 39 64.2 43.4Q62.8 39.8 61 37.4Q59.6 31 55.6 25.4Z',u>=2?'#ffffff':'#e6e9f2')+L_('M57 26.8Q61.2 30 62.4 36.4','#b8bed0',.45,'opacity=".9"');
  if(u>=2)s+=P('M55.6 25.4Q61.6 27.4 63.6 34.6Q64.6 39 64.2 43.4Q62.8 39.8 61 37.4Q59.6 31 55.6 25.4Z','#bff6e6','opacity=".35"');
  return s}
/* la main levée : « chut » (repère du portrait) */
function shh(q){return P('M39.6 67.4Q39.4 62.4 42.4 61.6Q45.6 61 46.6 63.6Q47.4 67 45.8 69.6Q42.6 71.2 39.6 67.4Z',SK(q))
  +P('M44.6 63.4L45.4 54.6Q46.1 53.6 47.1 54.2L47.3 63.4Z',SK(q))+L_('M45.2 56.8Q46.1 56.4 47 56.8','#b08a74',.35)
  +L_('M40.6 64.4Q42.8 63.4 44.8 64.4M40.4 66.6Q42.6 65.6 45 66.6','#b08a74',.45)+L_('M45.9 54.4L46.1 59','#ffffff',.4,'opacity=".45"')}
/* ---------- buste ---------- */
function bust(q,u){
  let s=P('M6 100Q8 80 22 72L78 72Q92 80 94 100Z',CO(q))+P('M10 100Q12 86 22 78L26 100Z','#0c0b12','opacity=".5"')+P('M90 100Q88 86 78 78L74 100Z','#0c0b12','opacity=".5"');
  s+=P('M42.4 72Q50 79 57.6 72L55 100H45Z','#101018')+L_('M42.6 72.4L45.2 100M57.4 72.4L54.8 100',RD(q),1.4)+C_(50,75.6,1.6,AG(q),'stroke="#6a7286" stroke-width=".3"')+C_(50,82,1.1,AG(q))+C_(50,88,1.1,AG(q));
  /* le col montant, doublé de rouge */
  s+=MI(P('M27 78Q28.6 62 36 52.4L44.6 61.4L42.8 76Z',CS(q))+L_('M36 52.6L44.2 61.2','#4a4664',.5)+P('M36.6 54.4L42 60.6L41.2 63.4L35.2 57.2Z',RD(q),'opacity=".9"'));
  /* l'écharpe rouge au cou */
  s+=P('M40.4 62.4Q50 67.4 59.6 62.4L62 70Q50 75.6 38 70Z',RD(q))+L_('M41.4 65.8Q50 70.4 58.6 65.8M40.6 68.6Q50 73.2 59.4 68.6','#3a0610',.5,'opacity=".7"')+L_('M41 63.6Q50 68.2 59 63.6','#e8687a',.45,'opacity=".6"');
  /* épaules du manteau, piqûres d'argent */
  s+=MI(L_('M10.6 92Q16 80 28 75.6','#4a4664',.6,'opacity=".9"')+L_('M14 96Q19 84 30 79.4','#9aa2b4',.35,'stroke-dasharray=".6 1.2" opacity=".7"'));
  /* le bras levé (manche) */
  s+=P('M10 100Q16 86 28 76.4L38.8 68.6L43.4 72.4L35.4 80.6Q26.6 90 24 100Z',CO(q))+L_('M12.8 99Q18.6 87 29.4 78','#4a4664',.5,'opacity=".9"')
    +P('M37.8 67.6L43.6 72.4L44.8 70.6L39 66Z',RD(q));
  return s}
/* ---------- portrait ---------- */
const PO={name:'Marn le Sans-Voix',cls:'Assassin',r:4,TC:'#9fe8c8',
  bg:['#f2fbf6','#a8e4d2','#3e6e80','#1c1f3c','#090a16'],glow:['#ffffff','#c4f2e4','#7ad8c0'],halo:'#d8f0e8',halo2:'#bfe6dc',
  frame:['#ffe08a','#9fe8c8'],parts:['#e8fff6','#c8d0e8'],rayCol:'#e8fff6'};
function waves(cx,cy,R,u,op){let s='';for(let i=0;i<2+u;i++){const r=R+i*4.4;s+=`<path d="M${r1(cx-r)} ${cy}A${r} ${r} 0 0 1 ${r1(cx+r)} ${cy}" fill="none" stroke="#d8f0e8" stroke-width=".6" stroke-dasharray="${r1(2+i)} ${r1(3+i*1.5)}" opacity="${r1(op-i*.12)}"/>`}return s}
function marnPortrait(u){u=Math.max(0,Math.min(3,u|0));if(MC['p'+u])return MC['p'+u];const q='mnp'+u+'_';
  return MC['p'+u]=HA.portrait(Object.assign({},PO,{u,q,defs:defs(q,u),
    back:(q,u)=>u?waves(50,36,33,u,.7):'',
    content:(q,u)=>hairBack(q)+bust(q,u)+face(q,u)+shh(q)+(u>=3?E_(50,20.8,11,2.8,'none','stroke="#d8f0e8" stroke-width="1.4"')+E_(50,20.8,11,2.8,'none','stroke="#ffffff" stroke-width=".5"'):'')}))}
/* ---------- corps entier (160×244) ---------- */
function bells(q,u){let s='';[[90.6,124.6],[95.2,128.8],[99.4,124.2]].forEach(([x,y],k)=>{
  s+=L_(`M${x} ${r1(y-5)}V${r1(y-1.6)}`,'#8a92a6',.45)+P(`M${r1(x-2.6)} ${r1(y+2.4)}Q${r1(x-2.6)} ${r1(y-2.2)} ${x} ${r1(y-2.2)}Q${r1(x+2.6)} ${r1(y-2.2)} ${r1(x+2.6)} ${r1(y+2.4)}Z`,AG(q),'stroke="#6a7286" stroke-width=".3"')
    +L_(`M${r1(x-3.1)} ${r1(y+2.4)}H${r1(x+3.1)}`,'#6a7286',.6)+L_(`M${r1(x-1.4)} ${r1(y-1)}Q${r1(x-1.8)} ${r1(y+.4)} ${r1(x-1.7)} ${r1(y+1.8)}`,'#ffffff',.4,'opacity=".8"')});
  return s}
function rapier(q,u){/* tenue basse, la pointe vers le sol */
  let s=`<g transform="translate(52.6 128) rotate(24)">`
   +`<rect x="-1.3" y="-8" width="2.6" height="8.6" rx=".8" fill="#2a2030"/>`+L_('M-1.3 -6L1.3 -5M-1.3 -3.6L1.3 -2.6','#5a4a5a',.4)
   +C_(0,-9.2,1.6,AG(q))
   +L_('M-6 0H6',AG(q),1.6)+L_('M-6 .4Q-7 4 -3.6 6.4M6 .4Q7 4 3.6 6.4','#c8ced8',.8)+L_('M-4.2 -.6Q-6.4 -4 -2.6 -7.4','#c8ced8',.7)
   +P('M-1.1 .8H1.1L.5 82Q0 84.6 -.5 82Z',BL(q),'stroke="#6a7488" stroke-width=".25"')+L_('M0 2V80','#ffffff',.35,'opacity=".8"')
   +(u>=1?L_('M0 2V80','#9fe8c8',.7,`opacity="${.2+u*.12}"`):'')+'</g>';
  return s}
function marnBody(u,bare){u=Math.max(0,Math.min(3,u|0));const ck='b'+u+(bare?'s':'');if(MC[ck])return MC[ck];const q='mnb'+u+(bare?'s':'')+'_';
  return MC[ck]=HA.body({u,q,bare,r:4,name:'Marn le Sans-Voix',defs:defs(q,u),glow:['#ffffff','#c4f2e4','#7ad8c0'],bb:['#bff2e4','#2e5a6e','#090a16'],
   halo:'#d8f0e8',halo2:'#bfe6dc',parts:['#e8fff6','#c8d0e8'],ring:['#d8f0e8','#7ad8c0','#c8d0e8'],
   back:(q,u)=>u?waves(80,36,40,u,.6):'',
   content:(q,u)=>{let s='';
    s+=HG(hairBack(q));
    /* le pan d'écharpe qui flotte derrière l'épaule */
    s+=`<g>${P('M90 64Q108 70 116 92Q122 108 132 116L126 120Q114 110 108 96Q102 80 88 72Z',RD(q))}${L_('M92 68Q106 76 112 94Q118 106 128 116','#3a0610',.5,'opacity=".6"')}<animateTransform attributeName="transform" type="rotate" values="-2 90 66;3 90 66;-2 90 66" dur="5s" repeatCount="indefinite"/></g>`;
    /* les pans arrière du manteau, doublure rouge */
    s+=P('M62 70Q54 130 48 192Q60 197 70 194L74 132Z',RD(q))+P('M98 70Q106 130 112 192Q100 197 90 194L86 132Z',RD(q));
    s+=P('M62 70Q55 130 50 190L56 191Q60 132 67 76Z','#3a0610','opacity=".45"')+P('M98 70Q105 130 110 190L104 191Q100 132 93 76Z','#3a0610','opacity=".45"');
    /* jambes, bottes hautes à boucles d'argent */
    const leg=P('M68.6 124L77.6 124L76.6 176L68.8 176Z',CS(q))+L_('M71 128L70.8 174','#3a3654',.6)
      +P('M67 172L78 172L78.6 204L65 207Q64.6 196 67 172Z','#14121c')+P('M66.8 172L78.2 172L78.4 177.4Q72.6 179 66.6 177.4Z','#24202e')
      +`<rect x="69.6" y="183" width="5.2" height="3" rx=".6" fill="none" stroke="${AG(q)}" stroke-width=".7"/>`+L_('M66.6 186.6Q72 188 78.4 186.6','#3a3448',.8)
      +P('M64.6 204.4L78.8 203L79 210L61.6 211.6Q61.8 207 64.6 204.4Z','#0e0c14')+L_('M62 211L79 209.6','#9aa2b4',.5,'opacity=".7"');
    s+=MB(leg);
    /* le manteau, ouvert sous la taille */
    s+=P('M62 64Q80 58.6 98 64L101 118L106 190Q96 194 88 192L84 132L80 126L76 132L72 192Q64 194 54 190L59 118Z',CO(q));
    s+=P('M59 118L54 190Q60 192.6 66 192.6L71 128Z','#0c0b12','opacity=".35"')+P('M101 118L106 190Q100 192.6 94 192.6L89 128Z','#0c0b12','opacity=".35"');
    s+=L_('M76 132L72 192M84 132L88 192',RD(q),1.6)+L_('M54 190Q63 194 72 192M88 192Q97 194 106 190','#4a4664',.7);
    s+=L_('M80 66V126','#0c0b12',.8,'opacity=".7"')+[78,88,98,108].map(y=>C_(80,y,1.1,AG(q),'stroke="#6a7286" stroke-width=".25"')).join('');
    s+=L_('M64.6 72Q66 100 63.2 116','#4a4664',.6,'opacity=".9"')+L_('M95.4 72Q94 100 96.8 116','#4a4664',.6,'opacity=".9"');
    /* ceinture, boucle, et les cloches sans battant */
    s+=P('M60.4 114Q80 120.6 99.6 114L100 119.6Q80 126.4 60 119.6Z',LE(q))+`<rect x="76" y="115.8" width="8" height="6.4" rx="1.2" fill="none" stroke="${AG(q)}" stroke-width="1.1"/>`+L_('M80 116.4V121.6',AG(q),.8);
    s+=bells(q,u);
    /* col montant et écharpe */
    s+=MB(P('M64 66Q63 56 67.6 48.4L73.6 55L72.4 66Z',CS(q))+P('M67.6 50L72.4 55.2L71.8 58L66.8 53Z',RD(q),'opacity=".9"'));
    s+=P('M68.8 53.4Q80 58.8 91.2 53.4L93.2 61.4Q80 67.6 66.8 61.4Z',RD(q))+L_('M69.6 56.8Q80 62 90.4 56.8','#3a0610',.5,'opacity=".7"')+L_('M69 54.6Q80 59.8 91 54.6','#e8687a',.45,'opacity=".6"');
    /* épaules du manteau */
    s+=MB(P('M54.4 84Q54.6 74 61.4 67.6Q66 64 70 65.6L67 77.6Q60.6 79.6 54.4 84Z',CO(q))+L_('M55.4 82Q56.6 74 61.8 69','#4a4664',.6)+L_('M57 84.6Q58.8 77 63.4 72.6','#9aa2b4',.3,'stroke-dasharray=".6 1.2" opacity=".7"'));
    /* bras droit, tendu le long du corps, la rapière en main */
    s+=P('M52.2 78Q47.8 98 49 118L57.6 118.6Q57.6 98 61 82Z',CO(q))+L_('M50.6 96L58.6 97','#4a4664',.5)+P('M48.6 114.6L58 115.2L57.8 120.4L48.6 119.8Z',RD(q));
    s+=rapier(q,u)+E_(52.8,123.4,4.4,3.8,SK(q))+L_('M49.6 124.6Q52.8 126.6 56 124.6','#b08a74',.45);
    /* bras gauche, replié : la main monte vers le visage */
    s+=P('M104 76Q110 92 106.4 106L98.6 103.6Q100.6 92 96 82Z',CO(q))+L_('M108 90L99.6 92','#4a4664',.5);
    s+=P('M106.4 106Q100 98 92 84Q86.2 72 76.6 58.2L80.4 55.8Q90 68 97 80Q104 92 98.6 103.6Z',CO(q))+L_('M100.6 98Q94 86 86 72','#4a4664',.5,'opacity=".8"')
      +P('M76 58.6L80.8 55.4L82.2 57.6L77.6 61Z',RD(q));
    /* la tête, et la main contre la muselière */
    s+=HG(face(q,u)+shh(q));
    if(u>=3)s+=E_(80,15.4,10,2.6,'none','stroke="#d8f0e8" stroke-width="1.4"')+E_(80,15.4,10,2.6,'none','stroke="#ffffff" stroke-width=".5"');
    return s}})}
/* ---------- branchements ---------- */
window.marnPortrait=marnPortrait;window.marnBody=marnBody;
HA.install(MARN,marnPortrait,marnBody,{marn:()=>marnBody(0,1),marnc:()=>marnBody(3,1)});
try{LOOKS[MARN]=['#eed8c6','#1c1a2c','#262338','#8a1a2a','#9fe8c8','#7fd6b8','bg:smoke back:cape hair:side eyes:normal mouth:none body:cloak ear:human prop:dagger']}catch(e){}
try{UTH_H[MARN]={n:'Le Point Final',m:'#262338',s:'#8a1a2a',a:'#9fe8c8',e:'#7fd6b8',bg:'smoke',w:'wings-black',hat:'halo',fx:'stars',c:'#9fe8c8',c2:'#c8d0e8',h3:'#ffffff'}}catch(e){}
}catch(e){console.warn('marn maison',e)}})();
