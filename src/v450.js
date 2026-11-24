
/* ================= CHRONIQUE « LA NUIT DE MIDI » (saison « L'Éclipse », 24 novembre → 8 décembre 2026) =================
   6 chapitres débloqués au fil de la saison (jours 1, 1, 3, 5, 8 et 11).
   À midi pile, le soleil s'éteint : Morrhal, le Loup-Éclipse, né de la première ombre du premier jour, le tient entre ses dents.
   Il mange la lumière, puis les ombres des gens, et il veut la dernière étoile qui vit en bas : Mira, l'étoile qu'Orion a cueillie
   quand il était petit, en lui promettant de la ramener un jour au ciel. Une seule flèche peut percer le loup : une flèche d'étoile.
   Morrhal est vaincu pour de bon. Mira, elle, retourne au ciel : depuis, on voit une étoile en plein jour, juste à côté du soleil.
   Les souvenirs s'affichent en vieux film. La fin n'est pas heureuse pour tout le monde. */
(function(){try{
if(typeof SAGA==='undefined'||typeof sagaOpen!=='function')return;
const EC0n=SAGA.length;window.EC0n=EC0n;
const E0=Date.UTC(2026,10,24,7,10),E1=E0+14*864e5;
const ecOpen=()=>{const t=Date.now();return t>=E0&&t<E1};
const ecDay=()=>Math.floor((Date.now()-E0)/864e5)+1;
const EN={};const tr=(fr,en)=>{if(en)EN[fr]=en;return fr};
Object.assign(SAGA_WHO,{mira:{n:tr("Mira, l'étoile tombée",'Mira, the fallen star'),c:'#ffe8b0'},miraf:{n:tr('Mira, qui pâlit','Mira, fading'),c:'#e8e0f0'},mirae:{n:tr("Mira, la flèche d'aube",'Mira, the dawn arrow'),c:'#ffffff'},morrhal:{n:tr('Morrhal, le Loup-Éclipse','Morrhal, the Eclipse Wolf'),c:'#c890ff'}});
try{Object.assign(NMAP,{
  [tr("Louveteau d'Éclipse",'Eclipse Cub')]:{base:'Loup de Givre',o:{to:268,sat:.55,light:.5},ov:['eye3','spectral']},
  [tr('Meneur de la Meute','Pack Leader')]:{base:'Cerbère',o:{to:270,sat:.7,light:.48},ov:['eye3','crown','aura']},
  [tr('Éteint','Snuffed One')]:{base:'Spectre Noyé',o:{to:262,sat:.22,light:.5},ov:['spectral']},
  [tr('Ombre-Portée','Cast Shadow')]:{base:'Ombre Vorace',o:{to:275,sat:.6,light:.42},ov:['spectral','eye3']},
  [tr('Gardien du Cadran','Sundial Warden')]:{base:'Golem Runique',o:{to:45,sat:.85,light:.85},ov:['runes','gears']},
  [tr('Croc de Morrhal',"Morrhal's Fang")]:{base:'Rôdeur du Vide',o:{to:268,sat:1,light:.6},ov:['crystal','spectral','eye3']},
  [tr("Ombre d'Orion","Orion's Shadow")]:{base:'Chevalier Déchu',o:{to:265,sat:.5,light:.38},ov:['spectral','stars']}})}catch(e){}

/* ---------- Morrhal, le Loup-Éclipse : une tête de loup de nuit, le soleil éteint entre les dents ---------- */
MONS['Morrhal, le Loup-Éclipse']=()=>{const O='#05020c',s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`,A=(v,d)=>`<animate attributeName="opacity" values="${v}" dur="${d}s" repeatCount="indefinite"/>`;
 let r='';for(let i=0;i<16;i++){const a=i*Math.PI/8,L=i%2?34:40;r+=`<path d="M${(50+Math.sin(a-.06)*26).toFixed(1)} ${(66-Math.cos(a-.06)*26).toFixed(1)}L${(50+Math.sin(a)*L).toFixed(1)} ${(66-Math.cos(a)*L).toFixed(1)}L${(50+Math.sin(a+.06)*26).toFixed(1)} ${(66-Math.cos(a+.06)*26).toFixed(1)}Z" fill="${i%2?'#e0ccff':'#fff4d8'}" opacity="${i%2?.35:.55}"/>`}
 return`<circle cx="50" cy="50" r="46" fill="#c890ff" opacity=".1"/>${r}
 <path d="M8 40L4 6L30 24Q40 18 50 18Q60 18 70 24L96 6L92 40Q98 56 90 70Q80 92 50 96Q20 92 10 70Q2 56 8 40Z" fill="#1a0b3a" ${s}/>
 <path d="M10 12L28 26L18 34ZM90 12L72 26L82 34Z" fill="#3c1e70" opacity=".9"/>
 <path d="M18 36Q30 28 42 34L36 44Q26 44 18 36ZM82 36Q70 28 58 34L64 44Q74 44 82 36Z" fill="#05020c"/>
 <path d="M22 37Q31 33 38 37Q31 41 22 37ZM78 37Q69 33 62 37Q69 41 78 37Z" fill="#ffd84a">${A('.7;1;.7',2.4)}</path><circle cx="31" cy="37" r="1.6" fill="#05020c"/><circle cx="69" cy="37" r="1.6" fill="#05020c"/>
 <path d="M40 48Q50 44 60 48L56 56Q50 58 44 56Z" fill="#05020c"/><path d="M20 58Q50 50 80 58L76 82Q50 92 24 82Z" fill="#0a0518" ${s}/>
 <circle cx="50" cy="70" r="12" fill="#07040f" stroke="#fff2c8" stroke-width="1.6"/><circle cx="50" cy="70" r="14.5" fill="none" stroke="#c890ff" stroke-width=".8" opacity=".7"/>
 <g>${A('.6;1;.6',3)}<path d="M58.6 61.2Q58.6 63.6 61 63.6Q58.6 63.6 58.6 66Q58.6 63.6 56.2 63.6Q58.6 63.6 58.6 61.2Z" fill="#ffffff"/></g>
 <path d="M24 60L28 70L32 61L36 72L40 62L42 68L44 60M76 60L72 70L68 61L64 72L60 62L58 68L56 60" fill="#f4ecff" stroke="#9a88c8" stroke-width=".5"/>
 <path d="M26 82L30 74L34 83L38 76L42 85M74 82L70 74L66 83L62 76L58 85" fill="#f4ecff" stroke="#9a88c8" stroke-width=".5"/>
 ${[0,1,2,3,4].map(i=>`<circle r="${(1+i%2*.5).toFixed(1)}" fill="#e0ccff"><animateMotion dur="${4+i}s" begin="${-i*1.1}s" repeatCount="indefinite" path="M${12+i*19} 100q${i%2?6:-6} -50 ${i%2?-4:4} -100"/>${A('0;.9;0',4+i)}</circle>`).join('')}`};

/* ---------- Mira : 0 = l'étoile tombée (petite fille de lumière), 1 = elle pâlit, 2 = elle redevient étoile ---------- */
const MRC={};
function miraBody(m){m=m|0;if(MRC[m])return MRC[m];const q='mira'+m+'_',O='stroke="#3a2a5a" stroke-width="1.2" stroke-linejoin="round"',sk='#fff3e4';
 let s=`<svg class="loresvg hb" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Mira"><defs>
  <linearGradient id="${q}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3a2a7a"/><stop offset=".6" stop-color="#1e1452"/><stop offset="1" stop-color="#140c3a"/></linearGradient>
  <linearGradient id="${q}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset=".6" stop-color="#fff2c8"/><stop offset="1" stop-color="#ffd884"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="#fff6dc" stop-opacity="${m===1?.35:.75}"/><stop offset=".5" stop-color="#ffe8b0" stop-opacity="${m===1?.15:.3}"/><stop offset="1" stop-color="#c890ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${q}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".5" stop-color="#fff"/><stop offset=".92" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="${q}k"><rect x="0" y="-8" width="160" height="244" fill="url(#${q}m)"/></mask>
  <filter id="${q}f"><feColorMatrix type="matrix" values=".45 .3 .25 0 .1  .3 .45 .25 0 .1  .3 .3 .5 0 .16  0 0 0 .82 0"/></filter></defs>`;
 s+=`<ellipse cx="80" cy="84" rx="66" ry="80" fill="url(#${q}g)"/>`+(m===2?'':`<ellipse cx="80" cy="212" rx="26" ry="5" fill="#000" opacity=".3"/>`);
 /* cheveux de lumière, longs et flottants (derrière) */
 let f=`<path d="M62 38Q50 70 56 104Q60 118 52 132Q66 126 70 108Q72 80 70 56ZM98 38Q110 70 104 104Q100 118 108 132Q94 126 90 108Q88 80 90 56Z" fill="url(#${q}h)" ${O}/>`;
 f+=`<path d="M73 176V202M87 176V202" stroke="${sk}" stroke-width="6" stroke-linecap="round"/><path d="M67 200Q66 209 72 209H78Q79 203 77.6 198.6Z" fill="#ffd884" ${O}/><path d="M93 200Q94 209 88 209H82Q81 203 82.4 198.6Z" fill="#ffd884" ${O}/>`;
 /* robe de nuit étoilée, ourlet d'or */
 f+=`<path d="M66 72Q80 66 94 72L101 120Q106 158 110 186Q96 194 80 190Q64 194 50 186Q54 158 59 120Z" fill="url(#${q}c)" ${O}/>`;
 f+=[[68,110,1.2],[90,104,1],[74,140,1.4],[88,152,1.1],[62,166,1],[98,170,1.3],[80,124,.9],[70,182,.9],[92,184,1]].map(([x,y,r])=>`<path d="M${x} ${y-r*2}Q${x} ${y} ${x+r*2} ${y}Q${x} ${y} ${x} ${y+r*2}Q${x} ${y} ${x-r*2} ${y}Q${x} ${y} ${x} ${y-r*2}Z" fill="#fff2c8" opacity=".9"/>`).join('');
 f+=`<path d="M50 186Q64 194 80 190Q96 194 110 186" stroke="#ffd884" stroke-width="1.6" fill="none"/><path d="M52.6 180Q66 187 80 184Q94 187 107.4 180" stroke="#ffd884" stroke-width=".6" fill="none" stroke-dasharray="1 2"/>`;
 f+=`<path d="M60 118Q80 124 100 118L101 124Q80 130 59 124Z" fill="#ffd884" ${O}/><path d="M80 116.4L82.6 121L80 125.6L77.4 121Z" fill="#ffffff" stroke="#c8902a" stroke-width=".5"/>`;
 /* bras : les mains jointes devant elle, une petite lueur entre les doigts */
 f+=`<path d="M66 74Q55 92 61 108Q68 113 76 108.6L74.6 100.6Q67.6 100 67.4 92Z" fill="url(#${q}c)" ${O}/><path d="M94 74Q105 92 99 108Q92 113 84 108.6L85.4 100.6Q92.4 100 92.6 92Z" fill="url(#${q}c)" ${O}/>`;
 f+=`<ellipse cx="76.6" cy="106.4" rx="3.3" ry="2.9" fill="${sk}" ${O}/><ellipse cx="83.4" cy="106.4" rx="3.3" ry="2.9" fill="${sk}" ${O}/><circle cx="80" cy="98.6" r="6.4" fill="#fff6dc" opacity=".35"/><path d="M80 92.6Q80.8 97.8 85.4 98.6Q80.8 99.4 80 104.4Q79.2 99.4 74.6 98.6Q79.2 97.8 80 92.6Z" fill="#ffe08a" stroke="#c8902a" stroke-width=".5"/>`;
 /* col et petite cape de lumière */
 f+=`<path d="M76 58H84V67H76Z" fill="#f6e2cc"/><path d="M66 66Q80 74 94 66L96 74Q80 82 64 74Z" fill="#ffd884" ${O}/>`;
 /* visage */
 f+=`<ellipse cx="80" cy="44" rx="14.4" ry="15.8" fill="${sk}" ${O}/>`;
 f+=`<path d="M65 47Q62.6 24 80 21.6Q97.4 24 95 47Q94.4 53 92 57Q92.6 46 89.6 39Q84 35 77 37Q72 40 67 39Q66.4 50 68 57Q65.4 53 65 47Z" fill="url(#${q}h)" ${O}/>`;
 /* l'étoile sur le front */
 f+=`<path d="M80 26Q80.6 30.6 85 31.2Q80.6 31.8 80 36.4Q79.4 31.8 75 31.2Q79.4 30.6 80 26Z" fill="#ffffff" stroke="#e0a83a" stroke-width=".6"/><circle cx="80" cy="31.2" r="5.4" fill="#fff6dc" opacity=".35"/>`;
 f+=m===2?`<path d="M71.6 46.6Q74.4 49 77.2 46.6M82.8 46.6Q85.6 49 88.4 46.6" stroke="#5a4a8a" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
   :`<ellipse cx="74.6" cy="46.4" rx="2.4" ry="3" fill="#e0a83a"/><ellipse cx="85.4" cy="46.4" rx="2.4" ry="3" fill="#e0a83a"/><circle cx="74.6" cy="46.8" r="1.2" fill="#5a3a10"/><circle cx="85.4" cy="46.8" r="1.2" fill="#5a3a10"/><circle cx="75.4" cy="45.3" r=".85" fill="#fff"/><circle cx="86.2" cy="45.3" r=".85" fill="#fff"/>`;
 f+=`<path d="M71 41.4Q74 40 77 41.2M83 41.2Q86 40 89 41.4" stroke="#e0b860" stroke-width=".9" fill="none" stroke-linecap="round"/><ellipse cx="70.8" cy="51.4" rx="2.6" ry="1.4" fill="#ffb88a" opacity=".55"/><ellipse cx="89.2" cy="51.4" rx="2.6" ry="1.4" fill="#ffb88a" opacity=".55"/>`;
 f+=m===1?`<path d="M77 54.6Q80 53.4 83 54.6" stroke="#8a4a3a" stroke-width="1.1" fill="none" stroke-linecap="round"/>`:`<path d="M76.8 53.4Q80 56.4 83.2 53.4" stroke="#8a4a3a" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
 /* petites étincelles qui tournent autour d'elle */
 const sp=n=>[...Array(n)].map((_,i)=>{const d=(3.6+(i%3)*.9).toFixed(1);return`<circle r="${(1+(i%2)*.6).toFixed(1)}" fill="#fff6dc"><animateMotion dur="${d}s" begin="${(-i*.7).toFixed(1)}s" repeatCount="indefinite" path="M80 ${70+(i%3)*30}m-${40+(i%2)*10} 0a${40+(i%2)*10} 14 0 1 0 ${80+(i%2)*20} 0a${40+(i%2)*10} 14 0 1 0 -${80+(i%2)*20} 0"/></circle>`}).join('');
 if(m===0)s+=f+sp(6);
 else if(m===1)s+=`<g filter="url(#${q}f)" opacity=".92">${f}</g>`+sp(2);
 else{s+=`<g mask="url(#${q}k)" opacity=".8">${f}</g>`;
   s+=`<g><path d="M80 -2Q83 26 108 30Q83 34 80 62Q77 34 52 30Q77 26 80 -2Z" fill="#ffffff" opacity=".95"/><circle cx="80" cy="30" r="16" fill="#fff6dc" opacity=".45"/><animate attributeName="opacity" values=".7;1;.7" dur="2s" repeatCount="indefinite"/></g>`;
   s+=[...Array(14)].map((_,i)=>{const x=50+((i*37)%60),d=(3+(i%4)*.8).toFixed(1);return`<circle r="${(1+i%3*.6).toFixed(1)}" fill="#fff6dc"><animateMotion dur="${d}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite" path="M${x} 206q${i%2?8:-8} -90 ${i%2?-6:6} -200"/><animate attributeName="opacity" values="0;1;0" dur="${d}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`}).join('')}
 return MRC[m]=s+'</svg>'}
window.miraBody=miraBody;

/* ---------- les chapitres (français + anglais) ---------- */
const L=(who,fr,en)=>[who,tr(fr,en)];
const CH=(o)=>({ch:o.map(([a,t,b,ae,be])=>[tr(a,ae),t,tr(b,be)])});
const FB=(fr,en)=>({fb:1,t:tr(fr,en)});
const ECH=[
 {t:tr('Midi pile','High Noon'),ic:'🌑',day:1,place:tr("Capitale d'Éther",'Ether Capital'),bg:['#2a1a5a','#140a33','#05030f'],mus:'dungeon',rw:[100,120],
  mins:[['Éteint',262],['Éteint',262]],boss:{n:'Ombre-Portée',h:275},bsk:{n:tr('Ombre avalante','Swallowing Shadow'),fx:{dmg:100,stun:25}},
  intro:[L('narr',"Ce jour-là, à midi pile, toutes les cloches de la Capitale ont sonné… et le soleil s'est éteint.","That day, at high noon, every bell in the Capital rang… and the sun went out."),
   L('narr',"Pas comme un nuage qui passe. Comme une bougie qu'on souffle. Un disque noir, entouré d'une couronne de lumière blanche, au milieu d'un ciel violet.","Not like a passing cloud. Like a candle being blown out. A black disc, ringed with a crown of white light, in the middle of a violet sky."),
   L('plume',"Hou… Porteur, il fait nuit. À midi. Est-ce que… est-ce que j'ai dormi trop longtemps ?","Hoo… Bearer, it's night. At noon. Did… did I sleep too long?"),
   L(57,"Non, petite plume. C'est moi qui ai froid. Pour la première fois de ma vie… je ne sens plus le soleil.","No, little feather. I'm the one who's cold. For the first time in my life… I can't feel the sun."),
   L('narr',"Sur la grande place, les gens lèvent les yeux. Et à leurs pieds, leurs ombres se décollent du sol, doucement, comme des draps qu'on soulève.","In the great square, people look up. And at their feet, their shadows peel off the ground, gently, like sheets being lifted."),
   L('mira',"Ne les laissez pas partir ! Une ombre qui s'en va, c'est quelqu'un qui s'endort pour toujours !","Don't let them go! A shadow that leaves is someone who falls asleep forever!"),
   L('narr',"Celle qui a crié est une petite fille. Elle brille. Vraiment : sa peau, ses cheveux, ses yeux, tout en elle luit comme une lanterne.","The one who shouted is a little girl. She glows. Really: her skin, her hair, her eyes, everything about her shines like a lantern."),
   L(63,"Mira, reste derrière moi. … Porteur, je te présente Mira. C'est une longue histoire. Disons qu'elle est… tombée du ciel.","Mira, stay behind me. … Bearer, meet Mira. It's a long story. Let's say she… fell from the sky."),
   CH([["🛡️ Protéger les habitants et leurs ombres",'cmp',"On ramène chaque ombre à son propriétaire. Personne ne s'endort aujourd'hui !","🛡️ Protect the townsfolk and their shadows","We bring every shadow back to its owner. Nobody falls asleep today!"],
       ["⚔️ Foncer sur la grande ombre qui mène les autres",'brv',"Si on fait tomber la plus grande, les autres rentreront chez elles !","⚔️ Charge the big shadow leading the others","If we take down the biggest one, the others will go home!"]]),
   L(63,"Les ombres craignent la lumière. Mira, brille aussi fort que tu peux.","Shadows fear the light. Mira, shine as bright as you can.")],
  outro:[L('narr',"L'Ombre-Portée se déchire comme un vieux drap. Les ombres des habitants retombent à leurs pieds, et les gens se réveillent en clignant des yeux.","The Cast Shadow tears like an old sheet. The townsfolk's shadows fall back to their feet, and people wake up, blinking."),
   L('mira',"Ça a marché ! … Orion ? Pourquoi tu regardes le ciel comme ça ?","It worked! … Orion? Why are you looking at the sky like that?"),
   L('narr',"Là-haut, la couronne de lumière autour du soleil noir bouge. Elle se resserre, puis se relâche. Lentement. Comme une respiration.","Up there, the crown of light around the black sun moves. It tightens, then loosens. Slowly. Like breathing."),
   L(63,"Une éclipse, ça ne respire pas.","An eclipse doesn't breathe."),
   L('plume',"Alors… qu'est-ce qu'il y a devant le soleil ?","Then… what's in front of the sun?"),
   L(63,"Il n'y a qu'un endroit d'où on peut le voir de près. L'Observatoire des Cimes. On y va.","There's only one place you can see it up close from. The Summit Observatory. Let's go.")]},
 {t:tr("L'Observatoire",'The Observatory'),ic:'🔭',day:1,place:tr('Les cimes du Sud','The Southern Peaks'),bg:['#140a33','#2a1a5a','#07040f'],mus:'dungeon',rw:[110,120],
  mins:[["Louveteau d'Éclipse",268],["Louveteau d'Éclipse",268]],boss:{n:'Meneur de la Meute',h:270},bsk:{n:tr('Hurlement noir','Black Howl'),fx:{dmg:115,weak:1}},
  intro:[L('narr',"L'Observatoire des Cimes est une tour de pierre blanche, avec une coupole qui s'ouvre comme une fleur. Orion y a grandi.","The Summit Observatory is a white stone tower, with a dome that opens like a flower. Orion grew up there."),
   L(63,"Quand j'étais petit, je montais ici toutes les nuits. Je comptais les étoiles. Je les connaissais toutes par leur nom.","When I was little, I came up here every night. I counted the stars. I knew every one of them by name."),
   L('mira',"Raconte comment tu m'as trouvée ! S'il te plaît ! Le Porteur ne connaît pas l'histoire !","Tell how you found me! Please! The Bearer doesn't know the story!"),
   FB('Il y a dix ans…','Ten years ago…'),
   L('narr',"Une nuit d'été, sur le toit de l'Observatoire. Un garçon aux cheveux bleus, un filet à papillons à la main.","A summer night, on the Observatory roof. A blue-haired boy, a butterfly net in his hand."),
   L(63,"Une étoile filante ! Elle tombe… elle tombe vers moi !","A shooting star! It's falling… it's falling toward me!"),
   L('narr',"L'étoile ne s'est pas écrasée. Elle s'est posée dans son filet, toute petite, toute tremblante. Et elle a ouvert les yeux.","The star didn't crash. It landed in his net, tiny and trembling. And it opened its eyes."),
   L('mira',"… Il fait froid, ici-bas. Tu peux me garder un peu au chaud ?","… It's cold down here. Can you keep me warm for a while?"),
   L(63,"Je te garde. Et un jour, je te le promets, je te ramènerai au ciel.","I'll keep you. And one day, I promise, I'll take you back to the sky."),
   {fb:0},
   L('mira',"Dix ans qu'il me le promet. Et dix ans que je fais semblant de ne pas vouloir y retourner.","Ten years he's been promising. And ten years I've been pretending I don't want to go back."),
   L('narr',"Un hurlement monte de la forêt, sous la tour. Puis un deuxième. Puis cent.","A howl rises from the forest below the tower. Then a second. Then a hundred."),
   L(63,"Des loups. Faits de nuit. Ils grimpent vers la coupole.","Wolves. Made of night. They're climbing toward the dome."),
   CH([["💗 Protéger Mira : les loups ne regardent qu'elle",'cmp',"Mira, au centre. Personne ne te touchera.","💗 Protect Mira: the wolves only look at her","Mira, in the middle. Nobody will touch you."],
       ["⚔️ Tenir la porte de l'Observatoire",'brv',"Personne n'entre dans ma tour !","⚔️ Hold the Observatory door","Nobody gets into my tower!"]]),
   L(63,"À mon signal. Une flèche par loup.","On my signal. One arrow per wolf.")],
  outro:[L('narr',"Le Meneur de la Meute s'effondre en fumée noire. Les autres loups reculent dans la forêt, sans un bruit.","The Pack Leader collapses into black smoke. The other wolves back away into the forest, without a sound."),
   L('narr',"Orion grimpe à la grande lunette et la tourne vers le soleil noir. Il reste longtemps sans rien dire.","Orion climbs up to the great telescope and turns it toward the black sun. He stays silent for a long time."),
   L('plume',"Orion ? Qu'est-ce que tu vois ?","Orion? What do you see?"),
   L(63,"Ce n'est pas la lune devant le soleil. C'est une tête. Une tête de loup, plus grande qu'une montagne. Et le soleil… il le tient entre ses dents.","That's not the moon in front of the sun. It's a head. A wolf's head, bigger than a mountain. And the sun… he's holding it in his teeth."),
   L('mira',"Morrhal. … Je connais ce nom. Toutes les étoiles le connaissent. On le chuchote, là-haut, pour se faire peur.","Morrhal. … I know that name. Every star knows it. Up there, we whisper it to scare each other.")]},
 {t:tr('Le Cadran sans ombre','The Shadowless Sundial'),ic:'🕛',day:3,place:tr('Place du Grand Cadran','Great Sundial Square'),bg:['#3a2a6a','#1a0b3a','#05030f'],mus:'dungeon',rw:[120,150],
  mins:[['Ombre-Portée',275],['Éteint',262]],boss:{n:'Gardien du Cadran',h:45},bsk:{n:tr('Aiguille de midi','Noon Needle'),fx:{dmg:105,dot:18}},
  intro:[L('narr',"Trois jours ont passé. Il fait toujours nuit. Sur la Place du Grand Cadran, l'aiguille de pierre qui donne l'heure au soleil ne fait plus d'ombre du tout.","Three days have passed. It's still night. In Great Sundial Square, the stone needle that tells the time by the sun casts no shadow at all."),
   L(57,"Ce cadran, c'est moi qui l'ai béni il y a mille ans. Tant que le soleil existe, il donne l'heure. Regardez : il ne donne plus rien.","I blessed this sundial a thousand years ago. As long as the sun exists, it tells the time. Look: it tells nothing anymore."),
   L('mira',"Les gens dorment de plus en plus. Ceux qui ont perdu leur ombre ne se réveillent plus, même quand on la leur rend.","People are sleeping more and more. Those who lost their shadow don't wake up anymore, even when we give it back."),
   L(62,"Les ombres ne partent pas au hasard. Elles marchent toutes vers le même endroit : vers le soleil. Elles montent dans le ciel, comme une rivière à l'envers.","The shadows don't wander off at random. They all walk toward the same place: toward the sun. They climb into the sky, like an upside-down river."),
   L(63,"Il les mange aussi. Le soleil d'abord, puis les ombres. Et après ?","He eats them too. The sun first, then the shadows. And after that?"),
   L('narr',"Un grondement. Le grand cadran se lève sur ses pieds de pierre. Ses chiffres d'or brillent d'une lumière violette.","A rumble. The great sundial rises on its stone feet. Its golden numerals glow with a violet light."),
   L('plume',"Le cadran ! Il est vivant ! Et il n'a pas l'air content !","The sundial! It's alive! And it doesn't look happy!"),
   CH([["🛡️ Abriter les dormeurs de la place",'cmp',"Mettez les dormeurs à l'abri ! On s'occupe du cadran.","🛡️ Shelter the sleepers in the square","Get the sleepers to safety! We'll handle the sundial."],
       ["⚔️ Viser le cœur du cadran",'brv',"Une flèche au centre, et il s'arrête !","⚔️ Aim for the sundial's heart","One arrow in the center, and it stops!"]]),
   L(57,"Sans soleil, je ne peux pas t'aider beaucoup, Porteur. Mais je peux encore me battre.","Without the sun, I can't help you much, Bearer. But I can still fight.")],
  outro:[L('narr',"Le Gardien du Cadran s'effondre, et ses pierres retombent en cercle. Au centre, gravé dans la pierre, un très vieux dessin apparaît : un loup qui court après le soleil, et un chasseur qui court après le loup.","The Sundial Warden collapses, and its stones fall back in a circle. In the center, carved in the stone, a very old drawing appears: a wolf chasing the sun, and a hunter chasing the wolf."),
   L(63,"Un chasseur…","A hunter…"),
   L('mira',"Regarde, il y a autre chose. Une étoile, dans la main du chasseur. Il l'a… il l'a mise sur son arc.","Look, there's something else. A star, in the hunter's hand. He… he put it on his bow."),
   L('narr',"Orion ne répond pas. Il passe très doucement la main sur le dessin, puis il se relève sans regarder Mira.","Orion doesn't answer. He runs his hand very gently over the drawing, then stands up without looking at Mira.")]},
 {t:tr('Ce que mange le loup','What the Wolf Eats'),ic:'🐺',day:5,place:tr('Le ciel noir','The Black Sky'),bg:['#05030f','#1a0b3a','#2a1656'],mus:'dungeon',rw:[140,150],
  mins:[["Louveteau d'Éclipse",268],['Ombre-Portée',275]],boss:{n:'Croc de Morrhal',h:268},bsk:{n:tr('Morsure du vide','Void Bite'),fx:{dmg:120,weak:1}},
  intro:[L('narr',"Le cinquième jour, Morrhal parle. Sa voix ne vient pas du ciel : elle vient de toutes les ombres à la fois.","On the fifth day, Morrhal speaks. His voice doesn't come from the sky: it comes from every shadow at once."),
   L('morrhal',"Petit chasseur. Tu me regardes depuis ta tour depuis trois jours. Tu as de bons yeux.","Little hunter. You've been watching me from your tower for three days. You have good eyes."),
   L(63,"Rends le soleil, Morrhal.","Give back the sun, Morrhal."),
   L('morrhal',"Je ne rends jamais rien. Je suis né de la première ombre du premier jour. J'ai toujours eu faim. Le soleil, c'était le plat. Maintenant, je veux le dessert.","I never give anything back. I was born from the first shadow of the first day. I've always been hungry. The sun was the main course. Now I want dessert."),
   L('morrhal',"Vos mythiques ont des légendes. Moi, j'ai mangé leurs légendes. Je suis ce qui vient après les mythes.","Your mythics have legends. I ate their legends. I am what comes after myths."),
   L('miraf',"Il parle de moi. … Les étoiles sont les seules lumières qui restent. Et je suis la seule étoile qui vit en bas.","He's talking about me. … Stars are the only lights left. And I'm the only star who lives down here."),
   L('morrhal',"La petite lanterne a compris. Donne-la-moi, chasseur, et je recrache le soleil. Peut-être.","The little lantern understands. Give her to me, hunter, and I'll spit out the sun. Maybe."),
   L(63,"Jamais.","Never."),
   L('narr',"Un croc immense, noir comme l'encre, descend du ciel et se plante dans la terre devant eux. Il se lève. Il marche.","A huge fang, black as ink, comes down from the sky and plants itself in the ground before them. It rises. It walks."),
   CH([["💗 Cacher Mira loin du croc",'cmp',"Mira, cache-toi dans l'Observatoire ! On le retient !","💗 Hide Mira away from the fang","Mira, hide in the Observatory! We'll hold it back!"],
       ["⚔️ Briser le croc de Morrhal",'brv',"Il veut mordre ? On va lui casser une dent.","⚔️ Shatter Morrhal's fang","He wants to bite? We'll break one of his teeth."]]),
   L('miraf',"Je ne me cacherai pas. Pas cette fois.","I won't hide. Not this time.")],
  outro:[L('narr',"Le Croc de Morrhal éclate en mille éclats noirs. Dans le ciel, le loup grogne, et toute la terre tremble.","Morrhal's Fang bursts into a thousand black shards. In the sky, the wolf growls, and the whole earth shakes."),
   L('morrhal',"Une dent. J'en ai mille. Et toi, chasseur, tu n'as qu'une étoile.","One tooth. I have a thousand. And you, hunter, have only one star."),
   L('narr',"Plus tard, sur le toit de l'Observatoire, Mira s'assoit à côté d'Orion. Elle brille moins fort qu'avant.","Later, on the Observatory roof, Mira sits down next to Orion. She shines less brightly than before."),
   L('miraf',"J'ai compris le dessin, sur le cadran. Il n'existe qu'une flèche capable de percer Morrhal : une flèche faite de lumière d'étoile.","I understood the drawing on the sundial. There's only one arrow that can pierce Morrhal: an arrow made of starlight."),
   L(63,"Je sais. Je l'ai toujours su. Et la réponse est non.","I know. I've always known. And the answer is no.")]},
 {t:tr("La flèche d'aube",'The Dawn Arrow'),ic:'🏹',day:8,place:tr("L'Observatoire des Cimes",'The Summit Observatory'),bg:['#1a0b3a','#2a1656','#0a0518'],mus:'dungeon',rw:[160,180],
  mins:[['Éteint',262],["Louveteau d'Éclipse",268]],boss:{n:"Ombre d'Orion",h:265},bsk:{n:tr('Tir sans lumière','Lightless Shot'),fx:{dmg:125,stun:20}},
  intro:[L('narr',"Le huitième jour, presque toute la Capitale dort. Les ombres montent vers le ciel par milliers, et la couronne du soleil devient de plus en plus mince.","On the eighth day, almost the whole Capital is asleep. Shadows climb into the sky by the thousands, and the sun's crown grows thinner and thinner."),
   L('miraf',"Orion. Regarde-moi. Tu me l'as promis, il y a dix ans. Tu as dit : « Je te ramènerai au ciel. »","Orion. Look at me. You promised, ten years ago. You said: “I'll take you back to the sky.”"),
   L(63,"Je voulais dire : un jour. Quand tu serais prête. Pas… pas comme une flèche.","I meant: one day. When you'd be ready. Not… not as an arrow."),
   L('miraf',"Je suis une étoile. Les étoiles sont faites pour éclairer. Je n'ai jamais été aussi prête.","I'm a star. Stars are made to shine. I've never been more ready."),
   FB('Il y a dix ans, la nuit suivante…','Ten years ago, the next night…'),
   L('narr',"Le petit garçon a construit une boîte en bois, tapissée de coton. Il a percé des trous dans le couvercle, pour que la lumière puisse sortir.","The little boy built a wooden box, lined with cotton. He poked holes in the lid, so the light could get out."),
   L(63,"Comme ça, tu ne seras jamais toute seule dans le noir.","That way, you'll never be alone in the dark."),
   L('mira',"Et toi ? Qui te tiendra compagnie, dans le noir ?","And you? Who'll keep you company in the dark?"),
   L(63,"Toi. Tu brilles assez pour deux.","You. You shine enough for two."),
   {fb:0},
   L('narr',"Soudain, l'ombre d'Orion se détache de ses pieds. Elle se lève, elle tend un arc noir… et elle le vise, lui.","Suddenly, Orion's shadow peels away from his feet. It stands up, draws a black bow… and aims at him."),
   L(62,"Ton ombre a peur à ta place, Orion. Elle préfère que tout s'éteigne plutôt que de la laisser partir.","Your shadow is afraid for you, Orion. It would rather everything go dark than let her go."),
   CH([["💗 Laisser Mira parler à l'ombre",'cmp',"Mira… dis-lui, toi. Moi, je n'y arrive pas.","💗 Let Mira talk to the shadow","Mira… you tell it. I can't."],
       ["⚔️ Combattre sa propre peur",'brv',"Si c'est ma peur, c'est à moi de l'abattre.","⚔️ Fight his own fear","If it's my fear, it's mine to bring down."]]),
   L(63,"Pardon, Mira. Je crois que je t'ai gardée pour moi.","I'm sorry, Mira. I think I kept you for myself.")],
  outro:[L('narr',"L'Ombre d'Orion baisse son arc. Elle redevient une ombre ordinaire, et retourne doucement à ses pieds.","Orion's Shadow lowers its bow. It becomes an ordinary shadow again, and gently returns to his feet."),
   L('miraf',"Tu m'as cueillie pour me protéger. Laisse-moi te protéger à mon tour.","You picked me to protect me. Let me protect you in return."),
   L('narr',"Orion ne répond rien. Il ouvre la vieille boîte en bois, celle aux petits trous. Elle est vide depuis longtemps. Il la referme, et il prend son arc.","Orion says nothing. He opens the old wooden box, the one with the little holes. It's been empty for a long time. He closes it, and he picks up his bow."),
   L(63,"Demain, on monte dans le ciel.","Tomorrow, we climb into the sky.")]},
 {t:tr('Totalité','Totality'),ic:'☀️',day:11,place:tr('Sur le dos du loup',"On the Wolf's Back"),bg:['#05030f','#140a33','#3a1a6e'],mus:'dungeon',rw:[300,250],
  mins:[['Croc de Morrhal',268],['Meneur de la Meute',270]],boss:{n:'Morrhal, le Loup-Éclipse',h:268},bsk:{n:tr('Gueule de la nuit','Maw of Night'),fx:{dmg:130,stun:30}},
  intro:[L('narr',"Le onzième jour, Lyra chante. Toute la Capitale l'écoute en rêve. Et les ombres qui montaient vers le ciel s'arrêtent pour l'écouter, elles aussi.","On the eleventh day, Lyra sings. The whole Capital listens in its dreams. And the shadows climbing to the sky stop to listen too."),
   L(70,"Je retiens les ombres. Je ne pourrai pas chanter longtemps. Allez-y.","I'm holding the shadows back. I can't sing for long. Go."),
   L('narr',"Séraphine porte Orion, Mira et le Porteur sur ses six ailes, jusqu'au ciel noir. Jusqu'à la fourrure de Morrhal, épaisse comme une forêt de nuit.","Seraphine carries Orion, Mira and the Bearer on her six wings, up into the black sky. Up to Morrhal's fur, thick as a forest of night."),
   L('morrhal',"Tu m'apportes la lanterne, chasseur ? Comme c'est gentil. Je savais que tu étais raisonnable.","You're bringing me the lantern, hunter? How kind. I knew you were sensible."),
   L(63,"Je t'apporte une étoile. Ce n'est pas la même chose.","I'm bringing you a star. It's not the same thing."),
   L('miraf',"Porteur ? Merci d'être venu. Et quand ce sera fini… veille sur lui. Il fait semblant d'être grand, mais il a peur du noir.","Bearer? Thank you for coming. And when it's over… look after him. He pretends to be grown-up, but he's afraid of the dark."),
   CH([["💗 Rester aux côtés d'Orion jusqu'au bout",'cmp',"On tire ensemble. Tu n'es pas seul, Orion.","💗 Stay by Orion's side to the end","We shoot together. You're not alone, Orion."],
       ["⚔️ Ouvrir le chemin jusqu'à la gueule du loup",'brv',"Je vous ouvre la route. Visez juste !","⚔️ Clear the way to the wolf's maw","I'll clear the way. Aim true!"]]),
   L('morrhal',"Viens, petite lanterne. Viens. J'ai si faim.","Come, little lantern. Come. I'm so hungry.")],
  outro:[L('narr',"Morrhal vacille. Mira se pose sur l'arc d'Orion. Elle n'est plus une petite fille : elle est une flèche de lumière blanche, si brillante qu'on ne peut pas la regarder.","Morrhal staggers. Mira settles on Orion's bow. She's no longer a little girl: she's an arrow of white light, so bright no one can look at it."),
   L('mirae',"N'aie pas peur. Je ne vais pas loin. Je serai juste au-dessus.","Don't be afraid. I'm not going far. I'll be right above you."),
   L(63,"… Je t'ai promis le ciel.","… I promised you the sky."),
   L('narr',"La flèche part. Elle traverse la nuit, elle traverse le loup, et Morrhal pousse un cri qui fait trembler toutes les étoiles. Puis il se défait, poil par poil, en fumée noire, jusqu'à ce qu'il ne reste plus rien. Plus rien du tout. Il ne reviendra pas.","The arrow flies. It crosses the night, it crosses the wolf, and Morrhal lets out a cry that shakes every star. Then he comes apart, hair by hair, in black smoke, until nothing is left. Nothing at all. He won't be back."),
   L('narr',"Le soleil retombe de ses mâchoires. Il est là. Il brille. Il fait jour.","The sun falls from his jaws. It's there. It shines. It's day."),
   L('narr',"En bas, toute la Capitale se réveille. Les ombres reviennent à leurs pieds. Solaris pleure de soulagement, et Lyra s'endort en souriant.","Down below, the whole Capital wakes up. The shadows come back to their feet. Solaris weeps with relief, and Lyra falls asleep smiling."),
   L('plume',"Porteur… regarde. Là, juste à côté du soleil.","Bearer… look. There, right next to the sun."),
   L('narr',"Une petite étoile brille en plein jour. Personne n'avait jamais vu une étoile en plein jour. Elle est minuscule, et elle clignote un peu, comme quelqu'un qui fait coucou.","A little star is shining in broad daylight. No one had ever seen a star in broad daylight. It's tiny, and it twinkles a little, like someone waving hello."),
   L(63,"Bonjour, Mira.","Hello, Mira."),
   L('narr',"Depuis ce jour, Orion ne chasse plus les étoiles. Chaque midi, il monte sur le toit de l'Observatoire, et il en regarde une. Rien qu'une.","Since that day, Orion no longer hunts stars. Every noon, he climbs onto the Observatory roof and looks at one. Just one.")]}];
const N=ECH.length;
const dc=Lx=>Lx.map(x=>Array.isArray(x)?x.slice():Object.assign({},x,x.ch?{ch:x.ch.map(c=>c.slice())}:{}));
ECH.forEach(c=>SAGA.push({t:c.t,ic:c.ic,req:1,ashc:1,ecc:1,mus:c.mus,bg:c.bg,place:c.place,boss:{n:c.boss.n,h:c.boss.h,st:50},intro:dc(c.intro),outro:dc(c.outro)}));
const ES=()=>{if(!S.ecc||typeof S.ecc!=='object')S.ecc={};if(!S.ecc.d||typeof S.ecc.d!=='object')S.ecc.d={};if(!S.ecc.l||typeof S.ecc.l!=='object')S.ecc.l={};return S.ecc};
const ecDone=k=>!!ES().d[k];
const ecUnlocked=k=>ecDone(k)||(ecOpen()&&ecDay()>=ECH[k].day&&(k===0||ecDone(k-1)));
const ecNext=()=>{for(let k=0;k<N;k++)if(!ecDone(k))return k;return-1};
const ecCount=()=>ECH.filter((_,k)=>ecDone(k)).length;
window.ecState=()=>({done:ecCount(),next:ecNext(),day:ecDay()});
const inEc=c=>c>=EC0n&&c<EC0n+N;
{const su=sagaUnlocked;sagaUnlocked=function(i){if(inEc(i))return ecUnlocked(i-EC0n);return su.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){if(!inEc(c))return so.apply(this,arguments);const k=c-EC0n,cfg=SAGA[c];cfg.intro=dc(ECH[k].intro);cfg.outro=dc(ECH[k].outro);const r=so.apply(this,arguments);
  try{const o=document.getElementById('sgov');if(o){o.classList.remove('bk3','gvcr');o.classList.add('eccr');const chip=o.querySelector('.sgchip');if(chip){chip.setAttribute('data-noi18n','');chip.textContent=`${ECH[k].ic} ${LANG==='en'?'The Noon Night':'La Nuit de Midi'} ${k+1}/${N} · ${typeof trS==='function'?trS(ECH[k].t):ECH[k].t}`}}musicWant(ECH[k].mus)}catch(e){}return r}}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(inEc(c))return ecBg(c-EC0n);return sb.apply(this,arguments)}}
{const sf=sagaFig;sagaFig=function(w){try{
  if(w==='mira')return`<div class="sgfig lore">${miraBody(0)}</div>`;
  if(w==='miraf')return`<div class="sgfig lore">${miraBody(1)}</div>`;
  if(w==='mirae')return`<div class="sgfig lore">${miraBody(2)}</div>`;
  if(w==='morrhal')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS['Morrhal, le Loup-Éclipse']()}</svg></div>`}catch(e){}return sf.apply(this,arguments)}}
/* combats : la même adaptation à la force de l'équipe que les autres chroniques ; chaque défaite affaiblit un peu le loup */
const GK=[{f:.97,bh:1,ba:1},{f:.98,bh:1.02,ba:1},{f:.99,bh:1.04,ba:1.01},{f:1,bh:1.06,ba:1.02},{f:1,bh:1.08,ba:1.03},{f:.97,bh:1.12,ba:1.05}];
const port=(nm,h,b)=>NMAP[nm]&&typeof nmonArt==='function'?nmonArt(nm,h,b):monArt(nm,h,b);
function ecFoes(k){const ids=teamIdsFor('pve').filter(i=>HEROES[i]&&(S.heroes[i]||(window.PICK&&PICK.on&&PICK.trial[i])));const P=Math.max(1150,(window.pkPow||idsPower)(ids)),K=GK[k],C=ECH[k];
  const Lk=ES().l[k]||0,fb=.86+.14*Math.min(1,Math.max(0,(Math.log10(P)-4)/.477)),dda=Math.max(.55,Math.pow(.9,Lk));
  const e=Math.max(0,Math.log(P*fb*K.f*dda/1150)/Math.log(GROW)),g=Math.pow(GROW,e)*(1+1.1*e/99),hm=.85,am=1.08;
  const mins=C.mins.map((x,i)=>foeUnit(i,{name:x[0],max:Math.round(380*g*hm*(.95+i*.1)),atk:Math.round(41*g*am),def:Math.round(18*g),spd:94+i*8,port:port(x[0],x[1],false),sk:i?{n:tr("Morsure d'ombre",'Shadow Bite'),tg:'one',fx:{dmg:170}}:{n:tr('Souffle de nuit','Night Breath'),tg:'all',fx:{dmg:80}}}));
  const b=foeUnit(9,{name:C.boss.n,boss:1,max:Math.round(380*g*4.5*hm*K.bh),atk:Math.round(42*g*1.55*am*K.ba),def:Math.round(18*g*1.4),spd:104+k*2,port:port(C.boss.n,C.boss.h,true),sk:{n:C.bsk.n,tg:'all',fx:C.bsk.fx}});
  return[...mins,b]}
window.ecFoes=ecFoes;
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(inEc(c)&&r){const k=c-EC0n;r.foes=ecFoes(k);r.title=`${ECH[k].ic} ${ECH[k].t}`;r.sub=`La Nuit de Midi · chapitre ${k+1}/${N}`;r.maxR=30;r.wc=ECH[k].boss.h}}catch(e){console.warn('nuit de midi',e)}return r}}
{const ef=evFinish;evFinish=function(dmg,rw){const on=SGX.active,c=SGX.ch;const r=ef.apply(this,arguments);try{if(on&&inEc(c)&&r!=='Victoire !'){const G=ES(),k=c-EC0n;G.l[k]=(G.l[k]||0)+1;save();
  rw.push(tr("🌟 Mira : « Ne t'en fais pas. La nuit s'use aussi : le prochain essai sera un peu plus facile. »","🌟 Mira: “Don't worry. The night wears out too: the next try will be a little easier.”"))}}catch(e){}return r}}
/* récompenses : gemmes et XP du pass de la saison ; à la fin, 10 fragments d'Orion et un titre */
const BAN=i=>`<div class="acsteps ecsteps">${ECH.map((c,k)=>`<i class="${ecDone(k)?'on':''}${k===i?' cur':''}">${ecDone(k)?'✓':c.ic}</i>`).join('')}</div>`;
{const sr=sagaReward;sagaReward=function(c){if(!inEc(c))return sr.apply(this,arguments);const k=c-EC0n,G=ES();if(G.d[k]){render();return}G.d[k]=Date.now();
  const [gm,xp]=ECH[k].rw;S.gems+=gm;try{if(ecOpen())passAdd(xp)}catch(e){}const fin=k===N-1;let fr=false;
  if(fin&&S.heroes[63]){S.heroes[63].f=(S.heroes[63].f||0)+10;fr=true}
  if(fin)try{news(Date.now(),`${S.name||'Voyageur'} a terminé la chronique « La Nuit de Midi ».`)}catch(e){}
  save();try{ttCheck()}catch(e){}
  const nx=ecNext(),nxt=nx<0?'':ecUnlocked(nx)?`<p class="muted" style="font-size:12.5px;margin:8px 0 0">▶️ Le chapitre ${nx+1} t'attend déjà !</p>`:`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Chapitre ${nx+1} : jour ${ECH[nx].day} de la saison.</p>`;
  const rw=`<div class="xrw"><div>${GEM}${gm} gemmes</div>${ecOpen()?`<div>🎟️ ${xp} XP de pass</div>`:''}${fin?(fr?"<div>🏹 10 fragments d'Orion</div>":'')+"<div>🏷️ Titre « Chasseur de l'Aube »</div>":''}</div>`;
  if(fin)modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="urev ecrev" style="--uc:#ffe8b0"><div class="big ecbig">${miraBody(2)}</div><div class="h">${tr('CHRONIQUE TERMINÉE','CHRONICLE COMPLETE')}</div><div style="font-weight:900">La Nuit de Midi</div><p class="muted" style="font-size:13px;margin:0 8px">${tr("« Il y a une étoile qu'on voit même en plein jour. »",'“There is a star you can see even in broad daylight.”')}</p>${rw}<button class="btn p" data-a="close" style="width:100%">Continuer</button></div>`);
  else modal(`<div class="sgrw acrw"><div class="sgfrag">${ECH[k].ic}</div><div class="h">Chapitre ${k+1} terminé</div><p class="sub">« ${esc(ECH[k].t)} »</p>${BAN(k)}${rw}${nxt}<button class="btn p" data-a="close" style="width:100%;margin-top:10px">Continuer</button></div>`);
  render()}}
try{TITLES.push({k:'nuitmidi',n:tr("Chasseur de l'Aube",'Dawn Hunter'),c:'#ffe8b0',d:tr("Terminer la chronique « La Nuit de Midi »",'Finish the chronicle “The Noon Night”'),ok:()=>!!(S.ecc&&S.ecc.d&&S.ecc.d[N-1])})}catch(e){}
/* la carte de la chronique, en haut de l'onglet Aventure */
function ecCard(){if(!ecOpen()&&!ecCount())return'';const nx=ecNext(),n=ecCount();
  let main;if(nx<0)main=`<div class="acgot ecgot">🌟 ${tr('Chronique terminée.','Chronicle complete.')} <button class="btn sm" data-a="hero" data-v="63">${tr('Voir Orion','See Orion')}</button></div>`;
  else if(ecUnlocked(nx))main=`<button class="btn pro acgo ecgo" data-a="ecplay" data-v="${nx}">▶️ ${ECH[nx].ic} Chapitre ${nx+1} : ${esc(ECH[nx].t)}</button>`;
  else if(!ecOpen())main=`<p class="muted" style="font-size:12.5px;margin:0">${tr('La saison est terminée : la chronique est refermée.','The season is over: the chronicle is closed.')}</p>`;
  else{const t=E0+(ECH[nx].day-1)*864e5-Date.now();main=`<button class="btn" disabled style="width:100%">🔒 <span>Chapitre ${nx+1}</span> · <span>${dur(Math.max(0,t))}</span></button>`}
  const list=ECH.map((c,k)=>{const ok=ecDone(k),un=ecUnlocked(k);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="ecplay" data-v="${k}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${k+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Jour ${c.day} de la saison`}</small></button>`}).join('');
  return`<div class="card acard eccard"><div class="acrow"><button class="acpt ecpt" data-a="hero" data-v="63" aria-label="Orion">${miraBody(nx<0?2:0)}</button><div style="min-width:0;flex:1"><span class="tag" style="--rc:#ffe8b0">${tr('CHRONIQUE DE SAISON','SEASON CHRONICLE')} · ${n}/${N}</span><div class="h3" style="margin:4px 0 2px">🌑 La Nuit de Midi</div>
   <p class="muted" style="font-size:12.5px;margin:0">${tr("À midi pile, le soleil s'est éteint. Orion sait ce qui le cache… et ce qu'il faudra pour le rallumer. Un nouveau chapitre au fil de la saison : <b>gemmes et XP de pass</b> à chaque chapitre.","At high noon, the sun went out. Orion knows what's hiding it… and what it will take to light it again. A new chapter over the season: <b>gems and pass XP</b> for each chapter.")}</p></div></div>
   ${BAN(-1)}${main}<details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${list}</div></details></div>`}
window.ecCard=ecCard;
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="ecplay"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=+b.dataset.v;if(!ecUnlocked(k))return;try{closeModal()}catch(er){}sagaOpen(EC0n+k,'intro')},true);
{const sc=sagaCard;sagaCard=function(){const h=sc.apply(this,arguments);try{const c=ecCard();if(c)return c+h}catch(e){}return h}}
/* annonce + notes de version */
try{const al=annList;annList=function(){const Lx=al.apply(this,arguments);try{if(ecOpen()&&!Lx.some(a=>a.k==='eclipse2')){const i=Lx.findIndex(a=>a.k==='eclipse1');Lx.splice(i>=0?i+1:0,0,{k:'eclipse2',ac:'#ffe8b0',tag:'NOUVELLE CHRONIQUE',t:'La Nuit de Midi 🌑',
  x:tr("À midi pile, le soleil s'est éteint, et les ombres des gens s'en vont vers le ciel. Orion sait ce qui se cache devant le soleil… et ce qu'il faudra pour le rallumer. <b>6 chapitres</b> au fil de la saison, dans l'onglet Aventure. Attention : cette histoire-là ne finit pas forcément bien.","At high noon, the sun went out, and people's shadows are drifting off to the sky. Orion knows what's hiding in front of the sun… and what it will take to light it again. <b>6 chapters</b> over the season, in the Adventure tab. Careful: this story doesn't necessarily end well."),
  art:()=>`<div class="skann ecann">${miraBody(0)}</div>`,go:'🌑 Lire la chronique',fn:()=>{TAB='adv';try{UI.lz=UI.lz||{};UI.lz.adv=null;scrollTo(0,0)}catch(e){}}})}}catch(e){}return Lx}}catch(e){}

/* ---------- décors ---------- */
function ecBg(k){const C=ECH[k],[a,b,d]=C.bg,R=rng(k*811+57),f=n=>(+n).toFixed(0),id='ecb'+k,A=(at,v,du)=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite"/>`;
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="${id}g"><stop offset="0" stop-color="#fff6dc" stop-opacity=".9"/><stop offset=".45" stop-color="#ffe8b0" stop-opacity=".35"/><stop offset="1" stop-color="#c890ff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#${id})"/>`;
  const stars=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle cx="${f(R()*400)}" cy="${f(R()*330)}" r="${(.6+R()*1.2).toFixed(1)}" fill="#fff" opacity="${(.3+R()*.6).toFixed(2)}"/>`;return o};
  const ecl=(cx,cy,r,op=1)=>{let o=`<g opacity="${op}"><circle cx="${cx}" cy="${cy}" r="${r*2.4}" fill="url(#${id}g)"/>`;for(let i=0;i<20;i++){const t=i*Math.PI/10+(i%2?.08:0),L=r*(i%4===0?2.3:i%2?1.45:1.8),w=i%4===0?.05:.03;
      o+=`<path d="M${(cx+Math.sin(t-w)*r*.96).toFixed(1)} ${(cy-Math.cos(t-w)*r*.96).toFixed(1)}L${(cx+Math.sin(t)*L).toFixed(1)} ${(cy-Math.cos(t)*L).toFixed(1)}L${(cx+Math.sin(t+w)*r*.96).toFixed(1)} ${(cy-Math.cos(t+w)*r*.96).toFixed(1)}Z" fill="${i%4===0?'#fff4d8':'#e0ccff'}" opacity="${i%4===0?.8:.5}"/>`}
    return o+`<circle cx="${cx}" cy="${cy}" r="${r}" fill="#07040f"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#fff2c8" stroke-width="${(r*.07).toFixed(1)}"/></g>`};
  const house=(x,y,w,h,c)=>`<path d="M${x} ${y}V${y-h}L${x+w/2} ${y-h-w*.45}L${x+w} ${y-h}V${y}Z" fill="${c}"/><rect x="${x+w*.3}" y="${y-h*.6}" width="${(w*.18).toFixed(0)}" height="${(w*.2).toFixed(0)}" fill="#ffd884" opacity=".75"/>`;
  const wisps=n=>{let o='';for(let i=0;i<n;i++){const x=R()*400,du=(6+R()*6).toFixed(1);o+=`<path d="M0 0q-6 -14 0 -28q6 -14 0 -28" stroke="#140a33" stroke-width="${(5+R()*5).toFixed(1)}" stroke-linecap="round" fill="none" opacity=".7"><animateMotion dur="${du}s" begin="${(-R()*8).toFixed(1)}s" repeatCount="indefinite" path="M${f(x)} 640q${f(R()*60-30)} -320 ${f(R()*80-40)} -680"/></path>`}return o};
  const pines=(y,c)=>{let o='';for(let i=0;i<14;i++){const x=i*30+R()*12;o+=`<path d="M${f(x)} ${y}L${f(x+12)} ${f(y-40-R()*20)}L${f(x+24)} ${y}Z" fill="${c}"/>`}return o};
  const eyes=n=>{let o='';for(let i=0;i<n;i++){const x=20+R()*360,y=560+R()*90;o+=`<g opacity=".9"><circle cx="${f(x)}" cy="${f(y)}" r="1.8" fill="#ffd84a"/><circle cx="${f(x+7)}" cy="${f(y)}" r="1.8" fill="#ffd84a"/>${A('opacity','.2;1;.2',(2+R()*2).toFixed(1))}</g>`}return o};
  if(k===0){/* la Capitale à midi : le soleil noir, les maisons, les ombres qui se décollent du sol */
    s+=stars(40)+ecl(200,140,34)+`<path d="M0 470L60 430L120 452L190 400L260 446L330 418L400 440V700H0Z" fill="#2a1a5a"/>`;
    for(const [x,w,h] of [[8,58,70],[72,54,92],[250,60,84],[318,70,66],[150,44,60]])s+=house(x,540,w,h,'#1a0b3a');
    s+=`<path d="M0 540Q200 520 400 540V700H0Z" fill="#140a33"/>`+wisps(10)}
  else if(k===1){/* l'Observatoire sur son pic, la coupole ouverte, la forêt pleine d'yeux */
    s+=stars(70)+ecl(310,110,26)+`<path d="M0 500L80 380L150 430L210 330L290 420L360 370L400 400V700H0Z" fill="#1a0b3a"/>`;
    s+=`<path d="M186 360V200H234V360Z" fill="#e8e0f4"/><path d="M180 206Q210 150 240 206Z" fill="#c8bce4"/><path d="M210 168L262 128" stroke="#5a4a8a" stroke-width="6" stroke-linecap="round"/><circle cx="264" cy="127" r="5" fill="#ffd884"/><rect x="200" y="240" width="20" height="26" rx="10" fill="#ffd884" opacity=".8"/>`;
    s+=pines(600,'#0a0518')+`<path d="M0 600Q200 580 400 600V700H0Z" fill="#0a0518"/>`+eyes(12)}
  else if(k===2){/* la place du Grand Cadran, sans ombre, les ombres qui montent comme une rivière à l'envers */
    s+=stars(36)+ecl(200,110,28)+wisps(14);
    s+=`<ellipse cx="200" cy="520" rx="170" ry="54" fill="#2a1a5a" stroke="#ffd884" stroke-width="2" opacity=".95"/><ellipse cx="200" cy="520" rx="140" ry="42" fill="none" stroke="#ffd884" stroke-width=".8" stroke-dasharray="2 6"/>`;
    for(let i=0;i<12;i++){const t=i*Math.PI/6;s+=`<circle cx="${(200+Math.sin(t)*150).toFixed(1)}" cy="${(520-Math.cos(t)*47).toFixed(1)}" r="3" fill="#ffd884"/>`}
    s+=`<path d="M200 520L188 380L212 380Z" fill="#c8bce4"/><path d="M200 520L212 380" stroke="#8a7ab8" stroke-width="2"/>`+`<path d="M0 600Q200 584 400 600V700H0Z" fill="#140a33"/>`}
  else if(k===3){/* le ciel noir : la tête du loup tout autour du soleil */
    s+=stars(80)+`<g opacity=".9"><path d="M40 300L30 120L110 190Q160 160 200 160Q240 160 290 190L370 120L360 300Q380 360 340 410Q290 470 200 476Q110 470 60 410Q20 360 40 300Z" fill="#0a0518" stroke="#2a1656" stroke-width="3"/>
      <path d="M96 262Q130 240 166 258Q130 278 96 262ZM304 262Q270 240 234 258Q270 278 304 262Z" fill="#ffd84a">${A('opacity','.6;1;.6',2.6)}</path></g>`+ecl(200,360,42);
    s+=`<path d="M0 620Q200 600 400 620V700H0Z" fill="#07030f"/>`}
  else if(k===4){/* le toit de l'Observatoire : la vieille boîte aux petits trous */
    s+=stars(60)+ecl(90,120,22,.9)+`<path d="M0 470H400V700H0Z" fill="#1a0b3a"/><path d="M0 470H400" stroke="#ffd884" stroke-width="2" opacity=".6"/>`;
    s+=`<g transform="translate(250 500)"><rect x="-40" y="-24" width="80" height="44" rx="4" fill="#6a4426" stroke="#2a1a0a" stroke-width="2"/><path d="M-44 -24H44L38 -38H-38Z" fill="#8a5a30" stroke="#2a1a0a" stroke-width="2"/>${[-26,-12,2,16,30].map(x=>`<circle cx="${x}" cy="-31" r="2" fill="#ffe8b0" opacity=".85"/>`).join('')}</g>`;
    s+=`<path d="M60 470L120 360" stroke="#5a4a8a" stroke-width="10" stroke-linecap="round"/><circle cx="122" cy="356" r="9" fill="#ffd884"/>`}
  else{/* sur le dos du loup : une forêt de fourrure noire, le soleil entre les crocs */
    s+=stars(50)+ecl(200,170,46)+`<path d="M0 420Q100 360 200 400T400 380V700H0Z" fill="#0a0518"/>`;
    for(let i=0;i<26;i++){const x=i*16+R()*8,y=400+Math.sin(i*.7)*16;s+=`<path d="M${f(x)} ${f(y+40)}L${f(x+6)} ${f(y-10-R()*20)}L${f(x+12)} ${f(y+40)}Z" fill="#140a33"/>`}
    s+=`<path d="M200 700L210 260" stroke="#ffffff" stroke-width="3" opacity=".7">${A('opacity','.3;.9;.3',1.6)}</path>`}
  return s+'</svg>'}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.eccard{background:radial-gradient(120% 140% at 85% 0%,rgba(255,232,176,.2),transparent 60%),radial-gradient(90% 120% at 0% 100%,rgba(200,144,255,.18),transparent 60%),var(--panel)!important;border-color:rgba(255,232,176,.5)!important}
.eccard .ecpt{background:radial-gradient(circle at 50% 30%,#3a2470,#0a0518)!important;box-shadow:0 0 16px -4px #ffe8b0;overflow:hidden}.eccard .ecpt svg{width:150%;height:150%;margin:-6% 0 0 -25%}
.ecsteps i{border-color:rgba(255,232,176,.45)}.ecsteps i.on{background:#2a1656;border-color:#ffe8b0}.ecgo{background:linear-gradient(180deg,#ffe8b0,#c890ff 60%,#5a2a9a)!important;color:#1a0b3a!important}.ecgot{background:linear-gradient(135deg,#2a1656,#0a0518)!important;border-color:#ffe8b0!important}
.ecrev .ecbig{background:radial-gradient(circle at 50% 35%,#3a2470,#05030f)!important}.ecrev .ecbig svg{width:100%;height:100%}
#sgov.eccr .sgchip{background:rgba(42,22,86,.88);color:#fff6dc}
#sgov.eccr:not(.fbmode) .sgbox{border-color:rgba(255,232,176,.55)!important;box-shadow:0 0 0 2px rgba(200,144,255,.25),0 10px 30px rgba(0,0,0,.5)}
.ecann svg{height:100%}`;document.head.appendChild(st);

/* ---------- anglais + notes de version ---------- */
try{Object.assign(I18N_EN,EN,{'La Nuit de Midi':'The Noon Night','La Nuit de Midi 🌑':'The Noon Night 🌑','🌑 Lire la chronique':'🌑 Read the chronicle','NOUVELLE CHRONIQUE':'NEW CHRONICLE',
  'Morrhal, le Loup-Éclipse':'Morrhal, the Eclipse Wolf',"Il y a dix ans…":'Ten years ago…'})}catch(e){}
try{const it=["🌑 <b>Chronique de saison « La Nuit de Midi »</b> : 6 chapitres au fil de la saison (onglet Aventure). Qui tient le soleil entre ses dents ? Qui est Mira, la petite fille qui brille ? Et que promet un chasseur à une étoile ? Gemmes et XP de pass à chaque chapitre, et à la fin : 10 fragments d'Orion et le titre « Chasseur de l'Aube »."];
 PATCH.unshift({v:'v75',d:Date.now(),t:'Chronique : La Nuit de Midi',items:it});
 I18N_EN[it[0]]="🌑 <b>Season chronicle “The Noon Night”</b>: 6 chapters over the season (Adventure tab). Who is holding the sun in his teeth? Who is Mira, the little girl who glows? And what does a hunter promise a star? Gems and pass XP for each chapter, and at the end: 10 Orion fragments and the title “Dawn Hunter”.";
 I18N_EN['Chronique : La Nuit de Midi']='Chronicle: The Noon Night'}catch(e){}
}catch(e){console.warn('nuit de midi',e)}})();
