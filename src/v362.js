
/* ================= V38.3 : légendaires — des visages bien à eux (détails propres à chaque héros) ================= */
(function(){
const G=(c,o)=>`opacity="${o}"`;
const star=(x,y,r,c,x2='')=>Pa(`M${x} ${y-r}L${x+r*.28} ${y-r*.28}L${x+r} ${y}L${x+r*.28} ${y+r*.28}L${x} ${y+r}L${x-r*.28} ${y+r*.28}L${x-r} ${y}L${x-r*.28} ${y-r*.28}Z`,c,x2);
Object.assign(FX,{
 /* Fortuna : rouge à lèvres, grain de beauté en cœur, eye-liner, boucles d'oreilles losange */
 lg56:L=>MIR(SL('M40.2 45.2L37.6 43.6',"#1a0c10",1.1))+Pa('M45.5 59.6Q48 58.2 50 59.2Q52 58.2 54.5 59.6Q52.6 62.4 50 62.6Q47.4 62.4 45.5 59.6Z','#c8203a')+SL('M46.5 60.2Q50 61.2 53.5 60.2','#7a0c1c',.5)
   +Pa('M40.6 54.2c-.9-1.2-2.6-.4-1.6.9l1.6 1.5 1.6-1.5c1-1.3-.7-2.1-1.6-.9z','#2a0a12')
   +MIR(SL('M33.6 54.5V57.5','#e8c050',.6)+Pa('M33.6 57.4L35.4 60.2L33.6 63L31.8 60.2Z','#d1263b','stroke="#ffe08a" stroke-width=".5"')),
 /* Solaris : soleil gravé sur le front, barbe dorée, rayons sur les joues */
 lg57:L=>MIR(CI(33.4,56.5,1.5,'#ffcf4a','stroke="#b8781a" stroke-width=".4"')+CI(33.4,56.5,2.6,'#ffe06a','opacity=".3"'))+Pa('M39.5 60Q41 70 50 73.5Q59 70 60.5 60Q57 66 50 66.5Q43 66 39.5 60Z','#e0a020','stroke="#b07010" stroke-width=".5"')+MIR(SL('M41 63Q44 67.5 47.5 68.5','#fff0a0',.5,'opacity=".7"'))
   +MIR(SL('M36.8 51.5L39.6 52.6M37 54.4L39.8 54.6','#ffcf4a',.8,'opacity=".85"')),
 /* Kaïros : sablier au front, chiffres romains sous l'œil, rides du temps */
 lg58:L=>''+`<text x="41.3" y="54.6" font-size="2.6" font-family="serif" font-weight="700" fill="#6a5a8a" opacity=".85" text-anchor="middle">XII</text>`
   +MIR(SL('M38.4 49.8Q40 50.8 41.6 50.4','#8a7a6a',.45,'opacity=".7"')+SL('M38 51.4Q39.6 52.4 41.2 52','#8a7a6a',.45,'opacity=".6"'))+SL('M45 38.4Q50 37 55 38.4','#8a7a6a',.45,'opacity=".6"'),
 /* Gaïa : fleur derrière l'oreille, taches de pollen, fissures d'écorce, feuille sur la joue */
 lg59:L=>{const fl=(x,y,c)=>[0,1,2,3,4].map(k=>{const a=k*72*Math.PI/180;return CI(+(x+Math.cos(a)*1.6).toFixed(2),+(y+Math.sin(a)*1.6).toFixed(2),1.3,c)}).join('')+CI(x,y,.9,'#ffe06a');
   return fl(66.5,40.5,'#ffb0d0')+fl(63.5,37.5,'#ffd0e8')+MIR(CI(41,53.5,.5,'#ffe06a',G(0,.85))+CI(43,54.6,.45,'#ffe06a',G(0,.8))+CI(39.6,55.2,.4,'#ffe06a',G(0,.75)))
    +SL('M57.5 30Q56 33 57.6 35.6M57.6 35.6L59.6 37','#3a2a1a',.6,'opacity=".7"')+Pa('M38 57Q40.5 53.6 44 55Q41.4 58.6 38 57Z','#7ad04a','stroke="#3a7a2a" stroke-width=".4"')+SL('M38.6 56.8L43 55.4','#3a7a2a',.3)},
 /* Titanor : fissures de cristal lumineuses, rune au front, arête de montagne */
 lg60:L=>SL('M40 30L43 36L41 40M60 33L57.5 37.5L59.5 41.5M45 64L47.5 60L52 61.5L55 58','#6ae0ff',.9,'opacity=".9"')+SL('M40 30L43 36L41 40M60 33L57.5 37.5L59.5 41.5M45 64L47.5 60L52 61.5L55 58','#e8ffff',.35)
   +SL('M47 28.5L50 25.5L53 28.5M50 25.5V31','#6ae0ff',.9)+Pa('M34 41L40 38.4L46 41L50 39L54 41L60 38.4L66 41L66 42.6L34 42.6Z','#5a5048','opacity=".95"'),
 /* Valkyr : peintures de guerre bleues, cicatrice au sourcil, taches de rousseur */
 lg61:L=>MIR(SL('M38.6 51.2L46 52.8','#4a8aff',1.3,'opacity=".9"')+SL('M39.4 53.8L45.4 55','#4a8aff',.9,'opacity=".8"'))+SL('M57.6 39.4L60.4 45.2','#c86a5a',.8)+SL('M58.6 41.5L59.9 41','#c86a5a',.5)
   +MIR(CI(43,56.4,.42,'#c8806a')+CI(44.6,57.2,.38,'#c8806a')+CI(41.6,57,.34,'#c8806a')),
 /* Nyx : croissant de lune au front, larmes d'argent, lèvres sombres, cils */
 lg62:L=>''
   +MIR(Pa('M43.6 50.2Q44.6 52.6 43.6 54.2Q42.6 52.6 43.6 50.2Z','#e0e8ff','opacity=".9"')+SL('M39.8 45.6L38.4 44.4M40.8 44.6L39.8 43.2','#0a0418',.6))
   +Pa('M46 60Q50 58.4 54 60Q52 62.6 50 62.8Q48 62.6 46 60Z','#3a1a5a'),
 /* Orion : étoile-cicatrice sur l'œil, étoile brillante sur la joue, plume à l'oreille */
 lg63:L=>SL('M55 40.6L57.6 53.4','#a0c0ff',.7,'opacity=".9"')+star(56.3,47,2.2,'#ffffff','opacity=".25"')+star(41,56,1.6,'#ffffff')+star(41,56,3,'#a0c0ff','opacity=".25"')
   +SL('M33.4 52.4L31.6 62','#e8e0d0',.5)+Pa('M31.6 62Q29.4 57.6 31.4 53.6Q33 57.8 31.6 62Z','#a0c0ff','stroke="#3a5aa0" stroke-width=".3"'),
 /* Séraphine : runes dorées sur le bandeau, larme de lumière, lèvres douces */
 lg64:L=>`<g fill="#c89a2a">${[38,42.5,47,53,57.5,62].map((x,k)=>`<path d="M${x} 44.4l.9 2.1-.9 2.1-.9-2.1z" opacity=".95"/>`).join('')}</g>`+CI(50,46.5,1.4,'#ffffff','stroke="#f0d070" stroke-width=".5"')
   +Pa('M57.6 51Q58.8 54 57.6 56Q56.4 54 57.6 51Z','#fff6c0')+CI(57.6,55.4,1.6,'#fff6c0','opacity=".3"')+Pa('M46.5 59.8Q50 58.8 53.5 59.8Q51.8 61.8 50 62Q48.2 61.8 46.5 59.8Z','#e88aa0','opacity=".85"'),
 /* Léviathane : ouïes, écailles près des yeux, perles, points lumineux des abysses */
 lg66:L=>MIR(SL('M36.2 55L38.6 54.2M36.4 57.4L38.8 56.6M36.8 59.8L39 59','#0a3a4a',.7)
   +[[39.5,42.5],[41.2,41.2],[38.2,40.6]].map(([x,y])=>Pa(`M${x-1} ${y}Q${x} ${y-1.4} ${x+1} ${y}Q${x} ${y+.8} ${x-1} ${y}Z`,'#2a8aa0','stroke="#6affe0" stroke-width=".25"')).join('')
   +CI(33.6,58,1.2,'#f4f0ff','stroke="#c0d0e0" stroke-width=".3"')+CI(33.3,57.6,.4,'#ffffff'))
   +[[44,33],[56,31.5],[50,35]].map(([x,y],k)=>CI(x,y,.7,'#6affe0',`opacity=".9"`)).join('')
});
['lg57','lg58','lg60','lg61','lg66'].forEach(k=>FX_UNDER.add(k));
for(let i=56;i<=66;i++){if(i===65)continue;const L=LOOKS[i];if(!L)continue;const t=String(L[6]);const m=/(^| )face:([^ ]*)/.exec(t);LOOKS[i]=[...L.slice(0,6),m?t.replace(m[0],`${m[1]}face:${m[2]},lg${i}`):t+` face:lg${i}`];try{delete PCACHE[i];skRefresh(i)}catch(e){}}
})();
