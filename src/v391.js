
/* ================= TITANOR LE MONT-VIVANT : nouveau style graphique =================
   Même golem : tête et corps de pierre, couronne de cristaux, yeux et fissures lumineux, mousse, marteau de pierre, bouclier runique.
   Nouveau : tête taillée en facettes, arcade de pierre, cristaux à facettes, épaulières-rochers couvertes de mousse,
   runes gravées qui brillent, cœur de cristal ; en ultra II/III la lumière devient lave (« Cœur de Lave ») et des cristaux poussent dans son dos. */
(function(){try{
const TIT=60;if(!HEROES[TIT]||!window.LK)return;
const {r1,P,L_,C_,E_,MI,MB,HG,lin,rad,U,STARP,starN,rays,frame,sigilRing,footRing,risers,halo,pOpen,pClose,bOpen,bStars,register,rune}=LK;
const G=u=>u>=2?{c:'#ffb030',c2:'#ff5a1a',w:'#fff0c0'}:{c:'#6ae0ff',c2:'#2a9ad8',w:'#e8fcff'};
const defs=(q,u)=>{const g=G(u);return rad(q+'bg',[[0,u>=3?'#fffbe8':(u>=2?'#fff0d8':'#eaf6ff')],[.15,u>=2?'#ffc890':'#9ad0e8'],[.4,u>=2?'#8a5a4a':'#4a6a8a'],[.7,'#1e2838'],[1,'#080a10']],'50%','32%','78%')
 +rad(q+'gl',[[0,'#ffffff',.95],[.5,g.w,.42],[1,g.c,0]])
 +lin(q+'au',[[0,'#fff2b0'],[.5,'#ffd84a'],[1,'#c8901a']],1,1)
 +lin(q+'st',[[0,'#a8a29a'],[.5,'#7a746c'],[1,'#4a4640']],1,1)
 +lin(q+'s2',[[0,'#8a847c'],[1,'#3a3630']],1,1)
 +lin(q+'s3',[[0,'#c8c2b8'],[1,'#8a847a']],1,1)
 +lin(q+'ms',[[0,'#8ad04a'],[1,'#3a7a2a']])
 +lin(q+'cr',[[0,'#ffffff'],[.4,g.w],[1,g.c2]],1,1)
 +rad(q+'cg',[[0,'#ffffff',1],[.35,g.c,.8],[1,g.c2,0]])};
const AU=q=>U(q,'au'),ST=q=>U(q,'st'),S2=q=>U(q,'s2'),S3=q=>U(q,'s3'),MS=q=>U(q,'ms'),CR=q=>U(q,'cr'),CG=q=>U(q,'cg');
/* un cristal à facettes */
const crystal=(q,x,y,h,w,a=0)=>`<g transform="translate(${x} ${y}) rotate(${a})">${P(`M${-w} 0L${-w} ${r1(-h*.75)}L0 ${-h}L${w} ${r1(-h*.75)}L${w} 0Z`,CR(q),'stroke="#1a3a5a" stroke-width=".3"')}${L_(`M0 ${-h}V0M${-w} ${r1(-h*.75)}L0 ${r1(-h*.6)}L${w} ${r1(-h*.75)}`,'#ffffff',.3,'opacity=".7"')}</g>`;
/* une pierre qui flotte */
const rock=(q,x,y,s)=>P(`M${x-3*s} ${y}L${x-1.6*s} ${y-2.6*s}L${x+1.8*s} ${y-2.2*s}L${x+3*s} ${y+.4*s}L${x+1*s} ${y+2.4*s}L${x-2*s} ${y+2*s}Z`,S2(q),'stroke="#2a2620" stroke-width=".3"');
/* le sceau : anneau de pierre aux runes lumineuses, un cristal au sommet */
function sigil(q,cx,cy,R,u,op){const g=G(u);op=op==null?.6+u*.1:op;let s=C_(cx,cy,R,'none',`stroke="#5a5650" stroke-width="${r1(R*.12)}" opacity="${r1(op*.8)}"`)+C_(cx,cy,R,'none',`stroke="#8a847c" stroke-width="${r1(R*.03)}" opacity="${r1(op)}"`);
  let d='';for(let k=0;k<16;k++){if(k===0)continue;const a=(k*22.5-90)*Math.PI/180;d+=rune(r1(cx+R*Math.cos(a)),r1(cy+R*Math.sin(a)),k)}
  s+=`<path d="${d}" stroke="${g.c}" stroke-width="${r1(R*.022)}" fill="none" opacity="${r1(Math.min(1,op+.2))}"/>`+sigilRing(cx,cy,r1(R*1.16),op*.6,g.c,g.w,24);
  return s+crystal(q,cx,r1(cy-R*.9),r1(R*.26),r1(R*.07))}
/* ---------- la tête de pierre (100×100) ---------- */
function head(q,u){const g=G(u);
  let s=P('M42 58L58 58L60 80L40 80Z',S2(q))+L_('M44 64L56 64M43.4 72L56.6 72','#2a2620',.5);
  s+=P('M35.4 37L41.6 26L58.4 26L64.6 37L65.4 50L60.4 61.6L50 66.4L39.6 61.6L34.6 50Z',ST(q),'stroke="#2a2620" stroke-width=".6"');
  s+=P('M41.6 26L50 24.4L58.4 26L56 33L44 33Z',S3(q))+P('M58.4 26L64.6 37L65.4 50L60 46L58.6 36Z',S2(q),'opacity=".8"')+P('M35.4 37L41.6 26L44 33L40.6 40Z',S3(q),'opacity=".7"')+P('M39.6 61.6L50 66.4L60.4 61.6L57 56.4L50 59.4L43 56.4Z',S2(q),'opacity=".8"');
  /* arcade de pierre et yeux-fentes lumineux */
  s+=P('M36.4 41L63.6 41L62.6 45.4L37.4 45.4Z','#5a5650','stroke="#2a2620" stroke-width=".4"')+L_('M37 41.4H63','#c8c2b8',.5,'opacity=".7"');
  s+=MI(C_(44,48,5,CG(q),'opacity=".55"')+P('M39.6 48Q44 46 48.4 47.6Q44 50 39.6 48Z',g.w)+L_('M40 48Q44 46.4 48 47.8',g.c,.6));
  /* fissures qui brillent, et une bouche taillée */
  s+=L_('M56 27L53.6 32L55.6 35.4L53 39M38 52L41.6 55L40.4 58.6M61 52L58.4 56',g.c,.7,'opacity=".95"')+L_('M56 27L53.6 32L55.6 35.4L53 39',g.w,.25);
  s+=L_('M44.6 58.6L50 60.2L55.4 58.6',g.c,.8)+L_('M44.6 58.6L50 60.2L55.4 58.6','#2a2620',.3);
  /* la mousse sur le crâne */
  s+=P('M38 31Q40 26 46 26Q44 29 40.6 32Z',MS(q))+P('M54 25.6Q60 25.4 62.6 31Q58.6 29.6 56 28.6Z',MS(q))+[[41,28.6],[45,27],[57,26.6],[60,28.6]].map(([x,y])=>C_(x,y,.8,'#a8e86a')).join('');
  /* la couronne de cristaux */
  s+=C_(50,22,10,CG(q),'opacity=".45"')+crystal(q,50,27,12,2.4)+crystal(q,44,27.6,8.4,1.8,-14)+crystal(q,56,27.6,8.4,1.8,14)+crystal(q,39.6,30,5.6,1.4,-28)+crystal(q,60.4,30,5.6,1.4,28);
  if(u>=3)s+=crystal(q,47,26,9,1.4,-6)+crystal(q,53,26,9,1.4,6);
  return s}
/* ---------- le buste ---------- */
function bust(q,u){const g=G(u);
  let s=P('M6 100Q8 78 24 72L76 72Q92 78 94 100Z',S2(q));
  /* torse de pierre, runes gravées et cœur de cristal */
  s+=P('M26 100L28 82Q34 72 50 71Q66 72 72 82L74 100Z',ST(q),'stroke="#2a2620" stroke-width=".5"')+L_('M28.4 84L71.6 84M30 92H70','#4a4640',.6)+L_('M40 74L38 100M60 74L62 100','#4a4640',.5);
  s+=L_('M34 88L38 84L42 88M58 88L62 84L66 88M46 94L50 90L54 94',g.c,.7)+C_(50,86,6,CG(q),`opacity="${.55+u*.1}"`)+crystal(q,50,90,7,2.4);
  /* épaulières-rochers couvertes de mousse, cristaux */
  const sh=P('M38 74Q30 66 18 68Q8 72 6 84Q8 92 16 94Q28 92 34 86Q40 80 38 74Z',ST(q),'stroke="#2a2620" stroke-width=".5"')+P('M16 70Q22 66 30 68Q26 72 18 74Z',S3(q),'opacity=".8"')
    +P('M10 76Q14 68 24 68Q30 69 34 72Q24 72 16 78Z',MS(q))+[[14,74],[20,70],[27,70]].map(([x,y])=>C_(x,y,.9,'#a8e86a')).join('')+L_('M14 86L20 84L24 88',g.c,.7)+crystal(q,12,72,8,1.8,-30)+crystal(q,18,69,6,1.4,-14);
  s+=MI(sh);
  return s}
/* ultra II et III : des cristaux qui poussent dans le dos */
function spikes(q,u){let w='';[[-150,30,3.4],[-132,36,3.8],[-114,32,3.4],[-165,22,2.8],[-98,24,2.8]].forEach(([a,h,wd])=>{w+=crystal(q,36,62,h,wd,a+90)});return`<g opacity="${u>=3?.97:.92}">${MI(w)}</g>`}
/* ---------- portrait ---------- */
function tPortrait(u){const q='tp'+u+'_';const g=G(u);
  let s=pOpen(q,'Titanor le Mont-Vivant',defs(q,u));
  s+=rays(50,34,12,80,.07,'#ffffff')+C_(50,34,30+u*2,U(q,'gl'))+sigil(q,50,36,26,u);
  s+=rock(q,12,22,1.2)+rock(q,88,18,1)+rock(q,90,48,.8)+rock(q,10,52,.9)+[[20,12],[80,10],[72,30]].map(([x,y])=>C_(x,y,.8,g.w,'opacity=".9"')).join('');
  if(u>=1)s+=C_(50,36,32.4,'none',`stroke="${g.c}" stroke-width=".7" stroke-dasharray="1.2 2.6" opacity="${.45+u*.15}"`);
  if(u>=2)s+=spikes(q,u);
  s+=bust(q,u)+head(q,u);
  if(u>=3)s+=halo(50,9.6,11,2.8);
  s+=frame(g.c);
  return s+pClose('Tank',u,[[16,40,2],[84,40,1.8],[20,64,1.3],[80,62,1.5]])}
/* ---------- corps entier ---------- */
function tBody(u,bare){const q='tb'+u+(bare?'s':'')+'_';const g=G(u);
  let s=bOpen(q,'Titanor le Mont-Vivant',defs(q,u)+rad(q+'bb',[[0,g.w,.32+u*.08],[.55,'#3a4a5a',.3],[1,'#080a10',0]],'50%','40%','60%'));
  if(bare)s+=`<g class="lgbk">${C_(80,36,40,U(q,'gl'),'opacity=".45"')}${sigil(q,80,35,30,u,.42)}</g>`;
  else{s+=`<g class="lgbk">${E_(80,96,80,116,U(q,'bb'))}${rays(80,36,14,120,.05,'#ffffff')}${C_(80,36,42+u*3,U(q,'gl'),'opacity=".7"')}${sigil(q,80,35,32,u)}`;
    s+=rock(q,20,50,2)+rock(q,142,64,1.8)+rock(q,26,150,1.6)+rock(q,138,150,1.7);
    if(u>=1)s+=C_(80,35,46+u*3,'none',`stroke="${g.c}" stroke-width="1.1" stroke-dasharray="2 6" opacity=".6"`);
    s+=risers([g.c,g.w],(c,k)=>k%2?`<path d="M-1.2 0L0 -1.8L1.2 0L0 1.8Z" fill="${c}"/>`:`<circle r="1" fill="${c}"/>`)+`</g>`+footRing(80,212,52,10.4,.9,'#8a847c',g.c,rune)}
  s+=E_(80,219,44,6.4,'#000','opacity=".5"');
  if(u>=2)s+=`<g transform="translate(12.5 -14) scale(1.35)">${spikes(q,u)}</g>`;
  /* jambes-piliers et pieds de roc */
  const leg=P('M62 124L78 124L77 196L63 196Z',ST(q),'stroke="#2a2620" stroke-width=".5"')+L_('M63 144L77 145M63 166L77 167M63 184L77 185','#4a4640',.6)+L_('M66 150L70 156L68 162',g.c,.7)
    +P('M58 194L80 194L82 210L56 212Z',S2(q),'stroke="#2a2620" stroke-width=".5"')+P('M66 128Q72 124 76 130Q70 132 66 128Z',MS(q));
  s+=MB(leg);
  /* bassin de pierre */
  s+=P('M58 110Q80 118 102 110L104 132Q80 140 56 132Z',S2(q),'stroke="#2a2620" stroke-width=".5"')+L_('M58 120Q80 128 102 120','#2a2620',.5)+L_('M76 128L80 132L84 128',g.c,.8);
  /* torse massif : runes gravées et cœur de cristal */
  s+=P('M56 62Q80 54 104 62L106 100Q98 116 80 118Q62 116 54 100Z',ST(q),'stroke="#2a2620" stroke-width=".6"')+P('M58 64Q80 57 102 64L100 72Q80 66 60 72Z',S3(q),'opacity=".7"')
    +L_('M58 84L102 84M60 98L100 98M80 64V116','#4a4640',.7)+L_('M64 92L70 86L76 92M84 92L90 86L96 92M74 106L80 100L86 106',g.c,.8);
  s+=C_(80,80,10,CG(q),`opacity="${.55+u*.1}"`)+crystal(q,80,86,11,3.4);
  /* bras droit : le grand bouclier runique */
  s+=P('M56 66Q46 76 44 96L54 98Q56 84 62 76Z',ST(q),'stroke="#2a2620" stroke-width=".5"');
  s+=C_(44,124,22,S2(q),'stroke="#2a2620" stroke-width=".8"')+C_(44,124,22,'none','stroke="#8a847c" stroke-width="1.4"')+C_(44,124,15,'none',`stroke="${g.c}" stroke-width="1.6" opacity=".95"`)+C_(44,124,15,'none',`stroke="${g.w}" stroke-width=".5"`)
    +C_(44,124,9,CG(q),'opacity=".7"')+P(starN(44,124,4,7,2),g.w,'opacity=".95"')+[0,90,180,270].map(a=>{const t=a*Math.PI/180;return rune(r1(44+18.6*Math.cos(t)),r1(124+18.6*Math.sin(t)),a/90)}).map(d=>`<path d="${d}" stroke="${g.c}" stroke-width=".8" fill="none"/>`).join('');
  /* bras gauche : le marteau de pierre cerclé d'or */
  s+=P('M104 66Q114 76 116 96L106 98Q104 84 98 76Z',ST(q),'stroke="#2a2620" stroke-width=".5"')+P('M106 98L116 96L120 116L110 118Z',S2(q),'stroke="#2a2620" stroke-width=".5"');
  s+=L_('M124 46L118 200','#5a3a1a',3)+L_('M124.2 47L118.2 199','#8a6a3a',.8,'opacity=".7"')+P('M110 28L138 28L140 50L108 50Z',ST(q),'stroke="#2a2620" stroke-width=".7"')+P('M110 28L138 28L136 34L112 34Z',S3(q),'opacity=".8"')
    +P('M108.6 36H139.4V40H108.6Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+P('M108.4 44H139.6V47H108.4Z',AU(q),'stroke="#8a5a1a" stroke-width=".3"')+L_('M118 30L122 34L120 38',g.c,.8)+C_(124,42,2.4,CG(q))+C_(124,42,1.2,g.w);
  s+=E_(115,118,6,5,ST(q),'stroke="#2a2620" stroke-width=".5"');
  /* épaulières-rochers moussues */
  const pa=P('M70 62Q60 52 48 56Q40 60 40 72Q44 80 52 80Q62 78 68 72Z',ST(q),'stroke="#2a2620" stroke-width=".5"')+P('M44 62Q50 54 60 55Q66 57 69 61Q58 60 48 66Z',MS(q))+[[48,60],[54,57],[61,57]].map(([x,y])=>C_(x,y,1,'#a8e86a')).join('')+crystal(q,46,60,9,2,-30)+crystal(q,53,56,7,1.6,-12)+L_('M46 72L52 70L56 74',g.c,.7);
  s+=MB(pa);
  s+=HG(head(q,u));
  if(u>=3)s+=halo(80,6.6,10,2.6);
  s+=bStars(u,bare);
  return s+'</svg>'}
register(TIT,tPortrait,tBody);
}catch(e){console.warn('titanor art',e)}})();
/* ---------- note de mise à jour ---------- */
(function(){try{
const T="Nouveau style pour les légendaires",I=["🎨 Les 11 légendaires du jeu (Fortuna, Solaris, Kaïros, Gaïa, Titanor, Valkyr, Nyx, Orion, Séraphine, Drakhar et Léviathane) sont redessinés dans le style des nouveaux héros : visage détaillé, galons d'or, sceau derrière la tête, cercle magique sous les pieds et cadre doré.","✦ Leurs formes Ultra I, II et III sont redessinées aussi : ailes, auréoles et couronnes propres à chaque héros.","🧔 Retouches : Léviathane est bien le <b>Roi des Abysses</b> (barbe et carrure de guerrier), Orion et Kaïros ont un visage d'homme plus marqué, Drakhar montre les crocs et Nyx a un regard bien plus sournois.","👗 L'apparence <b>« Drakhar des Cendres »</b> est redessinée dans le nouveau style (obsidienne, veines de lave, hache de cendre) et s'affiche enfin partout quand elle est équipée. Solaris a un gorgerin et de vraies jambières, Fortuna de vraies bottines, et Drakhar, Solaris et Valkyr ont une silhouette plus élancée."];
PATCH.unshift({v:41,d:'3 novembre 2026',t:T,items:I});
const X={[T]:"New style for the legendaries",[I[0]]:"🎨 The game's 11 legendaries (Fortuna, Solaris, Kaïros, Gaïa, Titanor, Valkyr, Nyx, Orion, Séraphine, Drakhar and Léviathane) are redrawn in the style of the new heroes: detailed faces, gold trims, a seal behind the head, a magic circle under their feet and a golden frame.",[I[1]]:"✦ Their Ultra I, II and III forms are redrawn too: wings, halos and crowns unique to each hero.",[I[2]]:"🧔 Touch-ups: Léviathane is indeed the <b>King of the Abyss</b> (beard and a warrior's build), Orion and Kaïros have more masculine faces, Drakhar bares his fangs and Nyx has a much slyer look.",[I[3]]:"👗 The <b>“Ashen Drakhar”</b> skin is redrawn in the new style (obsidian, lava veins, ash axe) and finally shows everywhere when equipped. Solaris has a gorget and real leg armor, Fortuna real ankle boots, and Drakhar, Solaris and Valkyr have a slimmer silhouette."};
for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}})();
