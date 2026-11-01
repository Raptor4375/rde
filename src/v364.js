
/* ================= V38.4 : légendaires — des yeux bien à eux + vraie barbe pour Solaris ================= */
(function(){
const star4=(x,y,r,c)=>Pa(`M${x} ${y-r}L${x+r*.3} ${y-r*.3}L${x+r} ${y}L${x+r*.3} ${y+r*.3}L${x} ${y+r}L${x-r*.3} ${y+r*.3}L${x-r} ${y}L${x-r*.3} ${y-r*.3}Z`,c);
const brow=(L,a,b,w=1.4)=>{const bc=shade(L.hr,-.1);return SL(a,bc,w)+SL(b,bc,w)};
const EYX={
 /* Fortuna : yeux en amande, longs cils, iris vert émeraude */
 lg56:L=>{const one=x=>Pa(`M${x-3.6} 47.2Q${x} 43.6 ${x+3.6} 47.2Q${x} 50 ${x-3.6} 47.2Z`,'#fff')+CI(x+.2,47.1,1.7,L.e)+CI(x+.2,47.1,.75,'#0c1a12')+CI(x-.5,46.4,.5,'#fff');
   return one(44)+one(56)+SL('M40.4 46.8Q44 43.2 47.8 46.4','#1a0c10',.9)+SL('M52.2 46.4Q56 43.2 59.6 46.8','#1a0c10',.9)+brow(L,'M40 42.4Q44 39.6 47.6 41.8','M60 42.4Q56 39.6 52.4 41.8',1.2)},
 /* Solaris : iris solaire, rayons dorés autour de la pupille */
 lg57:L=>{const one=x=>EL(x,47,4.3,3.5,L.e,'opacity=".3"')+EL(x,47,3.1,2.5,'#fff8e0')+CI(x,47,1.9,L.e)+[...Array(8)].map((_,k)=>{const a=k*Math.PI/4;return SL(`M${(x+Math.cos(a)*1.2).toFixed(2)} ${(47+Math.sin(a)*1.2).toFixed(2)}L${(x+Math.cos(a)*2.4).toFixed(2)} ${(47+Math.sin(a)*2.4).toFixed(2)}`,'#b86a10',.35)}).join('')+CI(x,47,.75,'#7a3a08')+CI(x-.6,46.3,.5,'#fff');
   return one(44)+one(56)+brow(L,'M39.6 42.8Q44 40.6 48 42.4','M60.4 42.8Q56 40.6 52 42.4',1.7)},
 /* Kaïros : pupille en sablier */
 lg58:L=>{const one=x=>EL(x,47,3,2.4,'#fff')+CI(x+.2,47.1,1.9,L.e)+Pa(`M${x-.7} 45.9H${x+1.1}L${x+.2} 47.1L${x+1.1} 48.3H${x-.7}L${x+.2} 47.1Z`,'#1a1030')+CI(x-.5,46.3,.45,'#fff');
   return one(44)+one(56)+brow(L,'M40 43Q44 41.6 47.5 42.6','M60 43Q56 41.6 52.5 42.6',1.2)},
 /* Gaïa : yeux en feuille, nervure verticale */
 lg59:L=>{const one=x=>Pa(`M${x-4} 47Q${x} 42.6 ${x+4} 47Q${x} 51.4 ${x-4} 47Z`,L.e,'opacity=".35"')+Pa(`M${x-3.2} 47Q${x} 43.8 ${x+3.2} 47Q${x} 50.2 ${x-3.2} 47Z`,L.e)+SL(`M${x} 44.6L${x} 49.4`,'#1a3a10',.7)+SL(`M${x} 46.4L${x-1.3} 45.6M${x} 47.8L${x+1.3} 47`,'#1a3a10',.4)+CI(x-1,46,.45,'#fff');
   return one(44)+one(56)+brow(L,'M40 43Q44 41.3 47.5 42.8','M60 43Q56 41.3 52.5 42.8',1.3)},
 /* Titanor : yeux de cristal à facettes */
 lg60:L=>{const one=x=>Pa(`M${x-3.6} 47L${x-1.8} 44.2H${x+1.8}L${x+3.6} 47L${x+1.8} 49.8H${x-1.8}Z`,L.e,'opacity=".4"')+Pa(`M${x-2.6} 47L${x-1.3} 45H${x+1.3}L${x+2.6} 47L${x+1.3} 49H${x-1.3}Z`,L.e)+SL(`M${x-1.3} 45L${x} 47L${x+1.3} 45M${x} 47V49`,'#e8ffff',.4)+CI(x,47,.6,'#fff');
   return one(44)+one(56)},
 /* Valkyr : regard perçant, iris bleu glacier cerclé */
 lg61:L=>{const one=(x,d)=>Pa(`M${x-3.6} 47.4Q${x-d} 44.2 ${x+3.6} 46.4Q${x} 49.6 ${x-3.6} 47.4Z`,'#fff')+CI(x+.1,47,1.8,L.e)+CI(x+.1,47,1.8,'none','stroke="#1a3a8a" stroke-width=".4"')+CI(x+.1,47,.75,'#0a1430')+CI(x-.5,46.3,.5,'#fff');
   return one(44,1)+`<g transform="matrix(-1 0 0 1 100 0)">${one(44,1)}</g>`+brow(L,'M39.4 42L47.4 44.2','M60.6 42L52.6 44.2',1.8)},
 /* Nyx : yeux lunaires, pupille en croissant */
 lg62:L=>{const one=x=>EL(x,47,4.2,3.4,L.e,'opacity=".3"')+EL(x,47,3,2.4,L.e)+Pa(`M${x+.6} 45.3A1.8 1.8 0 1 0 ${x+.6} 48.7A1.35 1.35 0 1 1 ${x+.6} 45.3Z`,'#1a0a2a')+CI(x-1,46.2,.45,'#fff');
   return one(44)+one(56)},
 /* Orion : pupilles en étoile */
 lg63:L=>{const one=x=>EL(x,47,4.2,3.4,L.e,'opacity=".3"')+EL(x,47,3,2.4,'#eef4ff')+CI(x,47,1.9,L.e)+star4(x,47,1.5,'#0a1430')+CI(x-.7,46.2,.45,'#fff');
   return one(44)+one(56)+brow(L,'M40 43Q44 41.3 47.5 42.8','M60 43Q56 41.3 52.5 42.8',1.3)},
 /* Léviathane : grands yeux des abysses, fente verticale, anneau lumineux */
 lg66:L=>{const one=x=>CI(x,47,3.6,L.e,'opacity=".28"')+CI(x,47,2.9,'#0a2a3a')+CI(x,47,2.9,'none',`stroke="${L.e}" stroke-width=".7"`)+EL(x,47,.55,2.2,L.e)+CI(x-1,45.9,.5,'#fff');
   return one(44)+one(56)}};
{const ey=EYES;EYES=function(t,L){if(EYX[t])return EYX[t](L);return ey.apply(this,arguments)}}
/* Solaris : une vraie barbe dorée qui suit la mâchoire, avec moustache */
FX.lg57=L=>{const c='#e0a020',d='#a8700a';
  return Pa('M36.6 47.5Q36 62 42 69Q50 76 58 69Q64 62 63.4 47.5L61.2 50.5Q60.6 58.2 56.2 61.2Q50 64.2 43.8 61.2Q39.4 58.2 38.8 50.5Z',c,`stroke="${d}" stroke-width=".5"`)
   +SL('M40 56Q41.5 63 45.5 66M60 56Q58.5 63 54.5 66M50 64.6V71','#fff0a0',.5,'opacity=".6"')
   +Pa('M44.6 55.1Q47.6 52.9 50 54.3Q52.4 52.9 55.4 55.1Q52.8 55.7 50 55.3Q47.2 55.7 44.6 55.1Z',c,`stroke="${d}" stroke-width=".4"`)
   +MIR(CI(33.4,56.5,1.5,'#ffcf4a','stroke="#b8781a" stroke-width=".4"'))};
FX_UNDER.delete('lg57');
const EYK={60:'lg60',63:'lg63',66:'lg66'};/* les autres gardent leurs yeux d'origine */
for(const i in EYK){const L=LOOKS[i];if(!L)continue;let t=String(L[6]);t=/(^| )eyes:[^ ]*/.test(t)?t.replace(/(^| )eyes:[^ ]*/,`$1eyes:${EYK[i]}`):t+` eyes:${EYK[i]}`;LOOKS[i]=[...L.slice(0,6),t];try{delete PCACHE[i];skRefresh(+i)}catch(e){}}
})();
