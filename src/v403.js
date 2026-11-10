
/* ================= CHRONIQUE « L'HIVER IMMOBILE » (saison « Givre éternel », 10 → 24 novembre 2026) =================
   6 chapitres débloqués au fil de la saison (jours 1, 1, 3, 5, 8 et 11).
   Toutes les horloges du royaume se sont arrêtées : Kaïros a figé le temps une seconde avant que le givre
   n'atteigne le cœur de son apprentie, Ilyane. Morhiver, l'hiver qui ne finit pas, s'est installé dans cette seconde.
   Les souvenirs s'affichent en vieux film (comme le Livre III). La fin n'est pas heureuse. */
(function(){try{
if(typeof SAGA==='undefined'||typeof sagaOpen!=='function')return;
const GC0=SAGA.length;window.GC0=GC0;
const GV0=Date.UTC(2026,10,10,7,10),GV1=GV0+14*864e5;
const gvOpen=()=>{const t=Date.now();return t>=GV0&&t<GV1};
const gvDay=()=>Math.floor((Date.now()-GV0)/864e5)+1;
Object.assign(SAGA_WHO,{ilyane:{n:"Ilyane, l'apprentie horlogère",c:'#ffb08a'},ilyg:{n:'Ilyane, sous la glace',c:'#8ad8ff'},ilyf:{n:'Ilyane',c:'#dff4ff'},morhiver:{n:'Morhiver, le Givre-Sans-Fin',c:'#bfe6ff'}});
try{Object.assign(NMAP,{'Rouage Gelé':{base:'Golem Runique',o:{to:205,sat:.55,light:1.05},ov:['gears','frost']},'Gardien des Engrenages':{base:'Sentinelle Céleste',o:{to:205,sat:.8},ov:['gears','frost','eye3']},
  'Écho de Morhiver':{base:'Spectre Noyé',o:{to:212,sat:1.1,light:.9},ov:['frost','spectral','crown']},'Main de Morhiver':{base:'Golem du Néant',o:{to:210,sat:1.2,light:.95},ov:['frost','crystal']},
  'Cœur de Morhiver':{base:'Golem de Magma',o:{to:205,sat:1.4,light:1},ov:['crystal','frost','crown']}})}catch(e){}

/* ---------- Morhiver ---------- */
MONS['Morhiver, le Givre-Sans-Fin']=()=>{const O='#0a1430',s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`,A=(v,d)=>`<animate attributeName="opacity" values="${v}" dur="${d}s" repeatCount="indefinite"/>`;
 let g='';for(let i=0;i<12;i++){const a=i*Math.PI/6;g+=`<path d="M${(50+Math.sin(a)*33).toFixed(1)} ${(40-Math.cos(a)*33).toFixed(1)}L${(50+Math.sin(a)*39).toFixed(1)} ${(40-Math.cos(a)*39).toFixed(1)}" stroke="#bfe6ff" stroke-width="3" opacity=".35"/>`}
 return`<circle cx="50" cy="40" r="42" fill="#bfe6ff" opacity=".1"/><circle cx="50" cy="40" r="35" fill="none" stroke="#bfe6ff" stroke-width="2" opacity=".3"/>${g}
 <path d="M28 60Q14 66 7 80L13 83Q20 73 32 68Z" fill="#14305e" ${s}/><path d="M72 60Q86 66 93 80L87 83Q80 73 68 68Z" fill="#14305e" ${s}/>
 <path d="M7 80L2 89M9.6 82L6.6 92M12.6 83L12.4 93M93 80L98 89M90.4 82L93.4 92M87.4 83L87.6 93" stroke="#dff4ff" stroke-width="1.7" stroke-linecap="round"/>
 <path d="M18 100L26 58Q36 46 50 44Q64 46 74 58L82 100Z" fill="#14305e" ${s}/><path d="M32 100L37 66Q50 58 63 66L68 100Z" fill="#24548e" opacity=".7"/>
 <path d="M18 100L22 92L26 98L31 90L36 97L41 89L46 96L50 88L54 96L59 89L64 97L69 90L74 98L78 92L82 100Z" fill="#e8f6ff" opacity=".9"/>
 <circle cx="50" cy="71" r="8.6" fill="#dff4ff" ${s}/><circle cx="50" cy="71" r="6.6" fill="none" stroke="#6a98c0" stroke-width=".7" stroke-dasharray=".8 2.66"/><path d="M50 71V65.6M50 71L53.6 72.6" stroke="${O}" stroke-width="1.2" stroke-linecap="round"/><path d="M43.4 67L47 69.6L45.2 73.4L48.6 76.4" stroke="${O}" stroke-width=".7" fill="none"/>
 <path d="M32 44Q32 14 50 10Q68 14 68 44Q62 54 50 56Q38 54 32 44Z" fill="#0e2246" ${s}/>
 <path d="M34 21L36.4 6L40.4 17L44.4 2L48 15L50 0L52 15L55.6 2L59.6 17L63.6 6L66 21Q50 15 34 21Z" fill="#cfeeff" ${s}/><path d="M44.4 2L45.4 12M55.6 2L54.6 12M50 0V12" stroke="#ffffff" stroke-width=".8"/>
 <path d="M39 28Q39 20 50 19Q61 20 61 28V40Q56 49 50 50Q44 49 39 40Z" fill="#e6f6ff" ${s}/>
 <path d="M42 31Q45.5 27.6 49 31Q45.5 34.4 42 31ZM51 31Q54.5 27.6 58 31Q54.5 34.4 51 31Z" fill="#06102a"/>
 <circle cx="45.5" cy="31" r="1.5" fill="#8af4ff">${A('.5;1;.5',2.2)}</circle><circle cx="54.5" cy="31" r="1.5" fill="#8af4ff">${A('.5;1;.5',2.2)}</circle>
 <path d="M50 19.4L48.6 25L51 28M57.6 37.6L59.6 41.4M41 36L43 38.6" stroke="#8ab8d8" stroke-width=".8" fill="none"/><path d="M46 42.4H54" stroke="#6a98c0" stroke-width=".9"/>
 <path d="M42.6 46L45 57L47 47.4L49 61L51 47.4L53 57.6L55 46.6L57 53L57.6 44.6Q50 50.6 42.6 46Z" fill="#dff4ff" stroke="#8ac8f0" stroke-width=".5"/>
 ${[0,1,2,3].map(i=>`<circle r="${(1+i%2*.6).toFixed(1)}" fill="#fff"><animateMotion dur="${4+i}s" begin="${-i*1.3}s" repeatCount="indefinite" path="M${14+i*24} 0q${i%2?6:-6} 50 ${i%2?-4:4} 100"/></circle>`).join('')}`};

/* ---------- Ilyane : 0 = l'apprentie, 1 = figée dans la glace, 2 = elle devient neige ---------- */
const ILC={};
function ilyBody(m){m=m|0;if(ILC[m])return ILC[m];const q='ily'+m+'_',O='stroke="#1a1430" stroke-width="1.3" stroke-linejoin="round"',sk='#f6d2b4';
 let s=`<svg class="loresvg hb" viewBox="0 -8 160 244" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Ilyane"><defs>
  <linearGradient id="${q}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#3e64a8"/><stop offset="1" stop-color="#1a2c5c"/></linearGradient>
  <linearGradient id="${q}h" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#c4dcf2"/></linearGradient>
  <radialGradient id="${q}g"><stop offset="0" stop-color="${m===0?'#ffd8a8':'#bfe6ff'}" stop-opacity=".5"/><stop offset="1" stop-color="#bfe6ff" stop-opacity="0"/></radialGradient>
  <linearGradient id="${q}i" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffffff" stop-opacity=".55"/><stop offset=".5" stop-color="#8ad8ff" stop-opacity=".22"/><stop offset="1" stop-color="#e8f8ff" stop-opacity=".5"/></linearGradient>
  <linearGradient id="${q}m" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff"/><stop offset=".55" stop-color="#fff"/><stop offset=".95" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="${q}k"><rect x="0" y="-8" width="160" height="244" fill="url(#${q}m)"/></mask>
  <filter id="${q}f"><feColorMatrix type="matrix" values=".3 .35 .3 0 .06  .32 .42 .34 0 .14  .36 .44 .5 0 .28  0 0 0 1 0"/></filter></defs>`;
 s+=`<ellipse cx="80" cy="74" rx="62" ry="70" fill="url(#${q}g)"/>`+(m===2?'':`<ellipse cx="80" cy="212" rx="30" ry="5" fill="#000" opacity=".35"/>`);
 let f=`<path d="M65 44Q58 60 63 76L69 74Q65 60 70 46Z" fill="url(#${q}h)" ${O}/>`;
 f+=`<path d="M71 176V203M89 176V203" stroke="#2a2440" stroke-width="7.5" stroke-linecap="round"/>`;
 f+=`<path d="M64.6 199Q63.6 210.6 70 210.6H76.6Q77.6 204 75.6 198.4Z" fill="#6a4426" ${O}/><path d="M95.4 199Q96.4 210.6 90 210.6H83.4Q82.4 204 84.4 198.4Z" fill="#6a4426" ${O}/>`;
 f+=`<path d="M64 70Q80 64 96 70L104 120Q109 160 112 188Q96 196 80 192Q64 196 48 188Q51 160 56 120Z" fill="url(#${q}c)" ${O}/>`;
 f+=`<path d="M80 94L72.6 190Q80 193 87.4 190Z" fill="#d4e2f4" ${O}/><path d="M76 120Q80 150 76.6 188M84 120Q80 150 83.4 188" stroke="#a8bcd8" stroke-width=".8" fill="none"/>`;
 f+=`<path d="M70 70L80 94L74.4 97L66 74Z" fill="#2a4a8a" ${O}/><path d="M90 70L80 94L85.6 97L94 74Z" fill="#2a4a8a" ${O}/>`;
 f+=[[73,128],[87,128],[72,144],[88,144],[71,160],[89,160]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.7" fill="#e8c060" stroke="#8a6020" stroke-width=".5"/>`).join('');
 f+=`<path d="M57 118Q80 124 103 118L104 125.4Q80 131 56 125.4Z" fill="#6a4426" ${O}/><rect x="77" y="118.6" width="6" height="7" rx="1" fill="#e8c060" stroke="#8a6020" stroke-width=".6"/>`;
 f+=`<g transform="translate(62 134)"><path d="M0 -6V6M-6 0H6M-4.2 -4.2L4.2 4.2M-4.2 4.2L4.2 -4.2" stroke="#e8c060" stroke-width="2.6" stroke-linecap="round"/><circle r="4" fill="#e8c060" stroke="#8a6020" stroke-width=".6"/><circle r="1.6" fill="#1a2c5c"/><path d="M0 -4V-10" stroke="#8a6020" stroke-width=".7"/></g>`;
 f+=`<path d="M48 188Q64 196 80 192Q96 196 112 188" stroke="#e8c060" stroke-width="1.4" fill="none"/><path d="M50.6 182Q65 189 80 186Q95 189 109.4 182" stroke="#e8c060" stroke-width=".6" fill="none" stroke-dasharray="1 2"/>`;
 f+=`<path d="M64 72Q53 90 59 107Q67 113 76 108.6L74.6 100.6Q66.6 100 66.4 92Z" fill="url(#${q}c)" ${O}/><path d="M96 72Q107 90 101 107Q93 113 84 108.6L85.4 100.6Q93.4 100 93.6 92Z" fill="url(#${q}c)" ${O}/>`;
 f+=`<path d="M59.6 104Q66 108.6 74.8 104.8M100.4 104Q94 108.6 85.2 104.8" stroke="#e8c060" stroke-width="1" fill="none"/>`;
 f+=`<path d="M80 91.6Q89 85 93 76" stroke="#e8c060" stroke-width=".9" fill="none" stroke-dasharray="1.2 .8"/><circle cx="80" cy="100" r="7.2" fill="#e8c060" ${O}/><circle cx="80" cy="100" r="5.6" fill="#fffaf0"/>`;
 f+=`<path d="M80 100V96.2M80 100L82.8 101.2" stroke="#1a1430" stroke-width=".9" stroke-linecap="round"/><path d="M80 92.8V90.8" stroke="#e8c060" stroke-width="1.8"/><circle cx="80" cy="90.2" r="1.3" fill="none" stroke="#e8c060" stroke-width=".8"/>`;
 f+=`<ellipse cx="75.6" cy="105.4" rx="3.6" ry="3.2" fill="${sk}" ${O}/><ellipse cx="84.4" cy="105.4" rx="3.6" ry="3.2" fill="${sk}" ${O}/>`;
 f+=`<path d="M76 58H84V67H76Z" fill="#e8bc9a"/><path d="M66 64Q80 72 94 64L96 72.6Q80 80.6 64 72.6Z" fill="#d8503a" ${O}/><path d="M87.6 72.6L94 97L88.4 95L86.4 99.4L84 74.6Z" fill="#d8503a" ${O}/>`;
 f+=`<path d="M68.4 67.4L70 72.6M74 69.4L75 74.6M80 70.4V75.6M86 69.4L85 74.6M91.6 67.4L90 72.6M86.4 84L91.6 83M87.4 91L92.6 90" stroke="#a83020" stroke-width=".8"/><path d="M88.8 95.4L88 99M91 96L91.6 99.4M93.4 96.6L94.6 99" stroke="#d8503a" stroke-width="1.1" stroke-linecap="round"/>`;
 f+=`<ellipse cx="80" cy="44" rx="15" ry="16.4" fill="${sk}" ${O}/>`;
 f+=`<path d="M64.4 47Q62 24 80 21.6Q98 24 95.6 47Q95 54 92.4 58.4Q93.2 46 90 38.6Q84 34.4 76.6 36.4Q72 40 66.6 38.6Q66 50 68 58.4Q64.6 54 64.4 47Z" fill="url(#${q}h)" ${O}/>`;
 f+=[0,1,2,3,4].map(i=>`<ellipse cx="${(66.4-i*.5).toFixed(1)}" cy="${(57+i*5).toFixed(1)}" rx="3.2" ry="3.4" fill="url(#${q}h)" ${O}/>`).join('')+`<path d="M62.6 80.6L60.4 85.4L64 83.6L66.6 87L66.4 81.4Z" fill="#d8503a" ${O}/>`;
 f+=`<path d="M64.6 34.4Q80 28 95.4 34.4" stroke="#6a4426" stroke-width="2.4" fill="none"/><circle cx="73" cy="31.6" r="4.6" fill="#8ad8ff" stroke="#e8c060" stroke-width="1.6"/><circle cx="87" cy="31.6" r="4.6" fill="#8ad8ff" stroke="#e8c060" stroke-width="1.6"/><circle cx="71.6" cy="30.2" r="1.3" fill="#fff"/><circle cx="85.6" cy="30.2" r="1.3" fill="#fff"/>`;
 f+=m===2?`<path d="M71.6 46.6Q74.4 49 77.2 46.6M82.8 46.6Q85.6 49 88.4 46.6" stroke="#2a3a6a" stroke-width="1.2" fill="none" stroke-linecap="round"/>`
   :`<ellipse cx="74.4" cy="46.4" rx="2.3" ry="2.9" fill="#2a3a6a"/><ellipse cx="85.6" cy="46.4" rx="2.3" ry="2.9" fill="#2a3a6a"/><circle cx="75.2" cy="45.3" r=".85" fill="#fff"/><circle cx="86.4" cy="45.3" r=".85" fill="#fff"/>`;
 f+=`<path d="M71 41.4Q74 40 77 41.2M83 41.2Q86 40 89 41.4" stroke="#9ab0c8" stroke-width=".9" fill="none" stroke-linecap="round"/><ellipse cx="70.6" cy="51.4" rx="2.6" ry="1.4" fill="#ff9a9a" opacity=".55"/><ellipse cx="89.4" cy="51.4" rx="2.6" ry="1.4" fill="#ff9a9a" opacity=".55"/>`;
 f+=m===1?`<ellipse cx="80" cy="54.4" rx="1.8" ry="1.4" fill="#8a3a3a"/>`:`<path d="M76.8 53.4Q80 56.4 83.2 53.4" stroke="#8a3a3a" stroke-width="1.1" fill="none" stroke-linecap="round"/>`;
 if(m===0)s+=f;
 else if(m===1){s+=`<g filter="url(#${q}f)">${f}</g>`;
   s+=`<path d="M42 14L96 4L122 40L118 206L80 214L40 206L36 80Z" fill="url(#${q}i)" stroke="#ffffff" stroke-width="1.6" stroke-opacity=".85"/><path d="M42 14L72 92L40 206M72 92L122 40M72 92L118 206M72 92L80 214" stroke="#ffffff" stroke-width=".9" opacity=".45" fill="none"/>`;
   s+=`<path d="M56 30L60 150" stroke="#ffffff" stroke-width="5" opacity=".28" stroke-linecap="round"/>`+[[44,206,12],[58,210,8],[104,208,10],[118,204,14]].map(([x,y,h])=>`<path d="M${x-5} ${y}L${x} ${y-h}L${x+5} ${y}Z" fill="#e8f8ff" stroke="#8ac8f0" stroke-width=".6"/>`).join('')}
 else{s+=`<g mask="url(#${q}k)" opacity=".86">${f}</g>`;
   s+=[...Array(14)].map((_,i)=>{const x=50+((i*37)%60),d=(3+(i%4)*.8).toFixed(1);return`<circle r="${(1+i%3*.6).toFixed(1)}" fill="#ffffff"><animateMotion dur="${d}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite" path="M${x} 206q${i%2?8:-8} -90 ${i%2?-6:6} -200"/><animate attributeName="opacity" values="0;1;0" dur="${d}s" begin="${(-i*.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`}).join('')}
 return ILC[m]=s+'</svg>'}
window.ilyBody=ilyBody;

/* ---------- les chapitres ---------- */
const GCH=[
 {t:'Les horloges arrêtées',ic:'⏸️',day:1,place:"Capitale d'Éther",bg:['#dff2ff','#7aa8d8','#14284a'],mus:'dungeon',rw:[100,120],
  mins:[['Loup du Blizzard',205],['Loup du Blizzard',205]],boss:{n:'Sentinelle de Givre',h:205},bsk:{n:'Regard gelé',fx:{dmg:100,stun:25}},
  intro:[['narr',"Ce matin-là, à huit heures et dix minutes, toutes les horloges de la Capitale se sont arrêtées en même temps."],
   ['narr',"Puis la neige est tombée. Pas une neige qui danse : une neige qui reste suspendue dans l'air, immobile, comme si quelqu'un avait mis le monde sur pause."],
   ['plume',"Hou… Porteur, regarde le boulanger. Il ne bouge plus. Sa main est restée en l'air, au-dessus de son pain."],
   [61,"Ce n'est pas du sommeil. Il est gelé. Pas dans la glace… dans le temps."],
   ['plume',"Il n'y a qu'une personne au royaume capable de toucher au temps. Kaïros, le Maître du Temps."],
   ['narr',"Mais Kaïros n'est pas venu au conseil depuis une semaine. Sa place est vide, et sa tasse de thé est couverte de givre."],
   [62,"Même les ombres se sont figées. Écoutez… Pas un oiseau, pas une cloche. Rien."],
   ['narr',"Au bout de la grande avenue, pourtant, quelque chose bouge : des loups blancs aux yeux bleus, et derrière eux, une sentinelle de glace qui monte la garde devant la grande horloge."],
   ['plume',"Ils protègent l'horloge. Comme si quelqu'un voulait être sûr qu'elle ne reparte jamais."],
   {ch:[["🛡️ Mettre les habitants gelés à l'abri d'abord",'cmp',"On protège les habitants d'abord. Personne ne doit être brisé pendant le combat."],["⚔️ Foncer sur la Sentinelle",'brv',"Si c'est elle qui garde l'horloge, c'est elle qu'on fait tomber !"]]},
   [61,"Le froid, c'est mon royaume. Il ne me fait pas peur."]],
  outro:[['narr',"La Sentinelle se brise en mille éclats. Mais l'horloge ne repart pas. Ses aiguilles restent plantées sur huit heures dix."],
   ['plume',"Regarde, Porteur ! Sur le cadran, il y a une marque gravée. Un sablier dans un cercle."],
   [61,"Le sceau de Kaïros. C'est lui qui a arrêté les horloges."],
   ['plume',"Non… Kaïros ne ferait jamais ça. Il dit toujours : « Le temps n'appartient à personne. »"],
   ['narr',"Au loin, vers le nord, une lumière bleue clignote au sommet des montagnes. Une seule. Comme un cœur qui bat encore."],
   ['plume',"La Tour de l'Horloger. C'est là qu'il vit. On y va, et on lui demande pourquoi."]]},
 {t:"La Tour de l'Horloger",ic:'🕰️',day:1,place:'Les cimes du Nord',bg:['#0a1a3a','#2a4a7a','#0a1024'],mus:'dungeon',rw:[110,120],
  mins:[['Rouage Gelé',205],['Rouage Gelé',205]],boss:{n:'Gardien des Engrenages',h:205},bsk:{n:'Engrenage broyeur',fx:{dmg:115,weak:1}},
  intro:[['narr',"La Tour de l'Horloger se dresse seule au sommet des cimes. Ses murs sont couverts d'horloges : des petites, des grandes, des centaines. Toutes arrêtées."],
   ['plume',"Avant, quand on passait ici, on entendait des milliers de tic-tac. Kaïros disait que c'était sa musique préférée."],
   ['narr',"Dans le grand atelier, au milieu des engrenages gelés, un vieil homme est assis devant une horloge géante prise dans la glace."],
   [58,"Vous n'auriez pas dû venir. Repartez, s'il vous plaît. Ici, rien ne doit bouger."],
   ['plume',"Kaïros ! Tout le royaume est en train de geler ! Les gens ne bougent plus ! Qu'est-ce que tu as fait ?"],
   [58,"Ce que n'importe qui aurait fait à ma place."],
   {fb:1,t:'Il y a sept jours…'},
   ['narr',"L'atelier est chaud et bruyant. Une jeune fille aux cheveux blancs court entre les établis, les poches pleines d'outils."],
   ['ilyane',"Maître ! Maître ! J'ai réussi ! Elle a fait cent tours sans s'arrêter !"],
   [58,"Ilyane, combien de fois t'ai-je dit de ne pas courir dans l'atelier ? … Montre-moi ça."],
   ['ilyane',"Une montre qui ne s'arrête jamais. Comme ça, quand je serai vieille, elle battra encore pour vous."],
   [58,"Quand tu seras vieille, je serai poussière, petite effrontée. Mais… elle est magnifique."],
   {fb:0},
   [58,"C'était il y a sept jours. Depuis, il n'y a plus eu de « depuis »."],
   ['narr',"Un grincement. Les engrenages de la tour se mettent à bouger tout seuls, comme des bras de métal couverts de givre."],
   ['plume',"Les engrenages ! Quelque chose les contrôle… et ce n'est pas Kaïros !"],
   {ch:[["💗 Protéger Kaïros, qui ne se défend pas",'cmp',"Kaïros, reste derrière nous. On ne te laissera pas seul."],["⚔️ Briser les engrenages",'brv',"Ces machines ne toucheront pas à l'atelier !"]]},
   [58,"… Ce froid-là ne vient pas de moi."]],
  outro:[['narr',"Le Gardien des Engrenages s'effondre dans un fracas de métal gelé."],
   [58,"Ces machines m'obéissent depuis quarante ans. Quelqu'un d'autre leur parle, maintenant. Quelqu'un qui a très froid au cœur."],
   ['plume',"Kaïros… Où est Ilyane ?"],
   ['narr',"Le vieil homme ne répond pas. Il pose sa main sur la glace de l'horloge géante, très doucement, comme on caresse une joue."],
   [58,"Elle est là. Elle est juste là."]]},
 {t:"L'instant figé",ic:'❄️',day:3,place:"Le cœur de l'horloge",bg:['#1a3a6a','#0e2246','#040a1a'],mus:'dungeon',rw:[120,150],
  mins:[['Âme Gelée',200],['Âme Gelée',200]],boss:{n:'Écho de Morhiver',h:210},bsk:{n:'Murmure glacé',fx:{dmg:105,dot:18}},
  intro:[['narr',"Sous la glace de l'horloge géante, on devine une silhouette. Une jeune fille, la main tendue, figée au milieu d'un pas."],
   ['ilyg',"…"],
   ['plume',"Ilyane… Elle est… dans le temps arrêté."],
   [58,"Ce soir-là, nous étions sur le lac Miroir. Elle voulait tester sa montre dans le grand froid. Et quelque chose est sorti de la glace."],
   {fb:1,t:'Le soir du lac Miroir…'},
   ['narr',"La lune est pleine. Ilyane glisse sur le lac gelé en riant. Sous ses pieds, la glace devient noire."],
   ['ilyane',"Maître ? La glace… on dirait qu'elle me regarde."],
   ['narr',"Une main de givre jaillit et lui touche la poitrine. Le givre se met à monter, à monter, vers son cœur."],
   [58,"ILYANE !"],
   ['narr',"Alors Kaïros fait la seule chose qu'il sait faire. Il arrête le temps. Une seconde avant que le froid n'atteigne son cœur."],
   {fb:0},
   [58,"Si le temps repart, le givre finira son chemin. Et elle… Alors je le garde arrêté. Une seconde de plus. Et encore une. Et encore une."],
   [61,"Kaïros… ta seconde dure depuis sept jours. Et pendant ce temps, l'hiver dévore le royaume."],
   ['narr',"Une voix glisse entre les murs. Douce, très douce, et plus froide que la neige."],
   ['morhiver',"Laisse-le tranquille, Walkyrie. Il a raison. Pourquoi laisser partir ce qu'on aime, quand on peut le garder pour toujours ?"],
   ['plume',"Cette voix… elle vient de la glace !"],
   {ch:[["💗 Rester près de Kaïros",'cmp',"Kaïros, ne l'écoute pas. On est là."],["⚔️ Faire taire la voix",'brv',"Montre-toi, au lieu de murmurer !"]]}],
  outro:[['narr',"L'Écho se disperse en poudre de neige. Mais la voix, elle, continue de rire doucement."],
   ['morhiver',"Je m'appelle Morhiver. Je suis l'hiver qui ne finit pas. Et ce vieil homme m'a ouvert la porte."],
   [58,"Non. Je n'ai ouvert aucune porte. J'ai seulement…"],
   ['morhiver',"Tu as arrêté le temps. Et un temps arrêté, c'est un hiver éternel. C'est ma maison. Merci, horloger."],
   ['narr',"Kaïros baisse la tête. Pour la première fois, ses mains tremblent."]]},
 {t:'Ce que murmure la glace',ic:'🌨️',day:5,place:'Le royaume gelé',bg:['#c8dcf0','#5a7aa8','#101c34'],mus:'umbra',rw:[140,150],
  mins:[['Yéti Primordial',210],['Yéti Primordial',210]],boss:{n:'Main de Morhiver',h:210},bsk:{n:"Étreinte de l'hiver",fx:{dmg:110,stun:30}},
  intro:[['narr',"L'hiver s'étend. Les rivières sont devenues des routes de verre. Les villages sont des tableaux blancs, avec des gens figés au milieu de leur vie."],
   [62,"Dans le village du col, une maman tient la main de son fils. Ils sont figés tous les deux. Ils sourient."],
   ['morhiver',"Tu vois, Ombre-Lune ? Ils ne souffrent pas. Ils n'auront plus jamais peur. Plus jamais froid. Ils ne perdront plus jamais personne."],
   ['plume',"Ils n'auront plus jamais RIEN ! Pas de demain, pas de printemps, pas de goûter !"],
   ['morhiver',"Et toi, petite chouette ? Tu as perdu ton maître Aldric, il y a mille ans. Imagine… s'il était resté là. Immobile. Pour toujours avec toi."],
   ['narr',"Plume ne répond pas. Le givre commence à monter le long de ses plumes."],
   [57,"PLUME ! Ne l'écoute pas ! Reviens vers la lumière !"],
   ['plume',"Je… je le voudrais tellement… Mais Aldric n'aurait jamais voulu ça. Il m'a appris à voler. Pas à rester sur une branche pour toujours."],
   ['narr',"La neige se soulève et forme une main gigantesque, aux doigts de glace, qui se referme sur le chemin."],
   {ch:[["💗 Réchauffer Plume",'cmp',"Plume, viens contre moi. Tu n'es pas seule."],["⚔️ Briser la main de l'hiver",'brv',"Personne ne gèlera mes amis !"]]}],
  outro:[['narr',"La Main de Morhiver se fend en deux et retombe en neige. Le givre quitte les plumes de Plume."],
   ['plume',"Hou… Merci. Il a trouvé exactement ce qui me faisait mal. C'est comme ça qu'il a eu Kaïros."],
   [61,"Il ne prend pas les gens par la force. Il leur promet que rien ne changera jamais."],
   [58,"… Et c'est exactement ce que j'ai voulu. Que rien ne change jamais."],
   ['narr',"Kaïros regarde le royaume gelé, toutes ces vies arrêtées à cause de sa seconde à lui. Il ferme les yeux."]]},
 {t:"L'horloge qui bat encore",ic:'💙',day:8,place:"La Tour de l'Horloger",bg:['#2a5a9a','#122a56','#040a1a'],mus:'dungeon',rw:[160,180],
  mins:[['Loup du Blizzard',205],['Ogre de Glace',205]],boss:{n:'Cœur de Morhiver',h:205},bsk:{n:'Pouls glacial',fx:{dmg:120,weak:1}},
  intro:[['narr',"De retour à la tour, l'horloge géante est devenue un énorme cœur de glace, qui bat lentement. Boum… … … boum."],
   ['plume',"Morhiver est dedans. Il s'est installé dans la seconde de Kaïros, comme dans un nid."],
   [58,"Il n'y a qu'un moyen de le chasser : rendre le temps au royaume. Et si je le rends…"],
   [61,"… le givre finira son chemin. Je sais."],
   [58,"Alors dites-moi comment on fait. Comment on laisse partir quelqu'un ?"],
   ['narr',"Personne ne répond. Puis, sous la glace, une toute petite lumière s'allume. Une voix, faible, très faible."],
   ['ilyg',"Maître… je vous entends. Depuis le début, je vous entends."],
   [58,"Ilyane ?!"],
   ['ilyg',"Vous parlez tout seul, la nuit. Vous me racontez le royaume. Mais le royaume est en train de mourir, maître. Je l'entends aussi."],
   ['ilyg',"Laissez le temps repartir. Je n'ai pas peur. Vous m'avez appris que tout ce qui est beau finit par s'arrêter. Que c'est pour ça que c'est beau."],
   [58,"Je t'ai appris ça pour les horloges, petite sotte. Pas pour toi."],
   ['narr',"Le cœur de glace se met à battre plus fort. Morhiver a entendu. Et il ne veut pas partir."],
   ['morhiver',"Personne ne repart. Personne ne finit. Personne ne me quitte !"],
   {ch:[["💗 Tenir la main de Kaïros",'cmp',"On le fait ensemble, Kaïros. Tu ne seras pas seul."],["⚔️ Attaquer le cœur de Morhiver",'brv',"Ilyane a choisi. On respecte son choix !"]]}],
  outro:[['narr',"Le Cœur de Morhiver se fissure de partout. L'hiver hurle à travers les montagnes."],
   ['morhiver',"Tu vas vraiment la laisser partir, horloger ? Pour des inconnus ? Pour des boulangers et des loups ?"],
   [58,"Ce n'est pas moi qui l'ai touchée. C'est toi. Moi, j'ai juste été lâche pendant sept jours."],
   ['ilyg',"Maître… vous n'avez pas été lâche. Vous avez été triste. Ce n'est pas pareil."],
   ['narr',"Le cœur explose dans une tempête blanche. La tempête file vers le sud, vers le lac Miroir. Là où tout a commencé."]]},
 {t:"L'Hiver Immobile",ic:'⏳',day:11,place:'Le lac Miroir',bg:['#1a2a5a','#0a1838','#02060e'],mus:'roi',rw:[300,250],fin:1,
  mins:[['Âme Gelée',210],['Yéti Primordial',210]],boss:{n:'Morhiver, le Givre-Sans-Fin',h:212},bsk:{n:'Éternité blanche',fx:{dmg:130,stun:30}},
  intro:[['narr',"Morhiver a tout emporté sur le lac Miroir : la glace, la nuit, et la seconde de Kaïros. Au centre du lac, Ilyane est toujours figée, la main tendue."],
   ['morhiver',"Regardez-la. Parfaite. Elle ne vieillira jamais. Elle ne souffrira jamais. Et vous voulez la briser ?"],
   ['plume',"On veut lui rendre sa vie. Même si elle est courte. C'est la sienne, pas la tienne !"],
   [58,"Morhiver. Il y a quarante ans, j'ai juré de veiller sur le temps. Pas de l'enfermer. J'ai oublié ma promesse pendant sept jours. C'est terminé."],
   ['narr',"Kaïros lève sa canne. Très loin, toutes les horloges du royaume se mettent à trembler."],
   [58,"Ilyane… quand je dirai « maintenant »…"],
   ['ilyg',"Je sais, maître. Je suis prête. Mais gagnez d'abord."],
   {ch:[["💗 Protéger Ilyane jusqu'au bout",'cmp',"Personne ne touche à Ilyane. Ni le givre, ni toi."],["⚔️ Frapper Morhiver de toutes nos forces",'brv',"L'hiver éternel, c'est fini !"]]},
   ['morhiver',"Alors gelez avec elle !"]],
  outro:[['narr',"Le dernier coup traverse Morhiver. Sa couronne de glace se fend. Il ne crie pas. Il fond, simplement, comme la neige au soleil."],
   ['morhiver',"Alors… tout… finit… vraiment…"],
   ['narr',"Il n'en reste qu'une flaque d'eau claire. Morhiver ne reviendra jamais."],
   [58,"Maintenant."],
   ['narr',"Kaïros relâche le temps. Dans tout le royaume, les horloges reprennent leur tic-tac. Le boulanger finit son geste. La maman et son fils éclatent de rire."],
   ['narr',"Et sur le lac, la seconde se termine. Le givre atteint le cœur d'Ilyane."],
   ['ilyf',"Oh… Ça ne fait pas mal du tout. C'est juste… froid. Et doux."],
   [58,"Ilyane, pardonne-moi. Pardonne-moi…"],
   ['ilyf',"Il n'y a rien à pardonner. Tenez. Ma montre. Celle qui ne s'arrête jamais."],
   ['narr',"Elle pose la petite montre dans la main du vieil homme. Puis elle sourit, et elle devient neige. Des milliers de flocons qui montent doucement vers le ciel."],
   ['plume',"… Hou… Au revoir, Ilyane."],
   ['narr',"Le printemps revient dans le royaume. La neige fond partout. Partout, sauf au milieu du lac Miroir, où un petit tas de neige ne fond jamais."],
   ['narr',"Toutes les horloges du royaume battent de nouveau. Toutes, sauf une : la petite montre d'Ilyane, arrêtée à huit heures dix, que Kaïros porte contre son cœur."],
   [58,"Elle disait qu'elle ne s'arrêterait jamais. Elle avait tort, ma petite. Mais moi, je ne m'arrêterai jamais de me souvenir."],
   ['narr',"Depuis ce jour, au royaume, on l'appelle Kaïros, l'Hiver Immobile."]]}];
const N=GCH.length;
const dc=L=>L.map(x=>Array.isArray(x)?x.slice():Object.assign({},x,x.ch?{ch:x.ch.map(c=>c.slice())}:{}));
GCH.forEach(c=>SAGA.push({t:c.t,ic:c.ic,req:1,ashc:1,gvc:1,bg:c.bg,place:c.place,boss:{n:c.boss.n,h:c.boss.h,st:50},intro:dc(c.intro),outro:dc(c.outro)}));
const GVS=()=>{if(!S.gvc||typeof S.gvc!=='object')S.gvc={};if(!S.gvc.d||typeof S.gvc.d!=='object')S.gvc.d={};if(!S.gvc.l||typeof S.gvc.l!=='object')S.gvc.l={};return S.gvc};
const gvDone=k=>!!GVS().d[k];
const gvUnlocked=k=>gvDone(k)||(gvOpen()&&gvDay()>=GCH[k].day&&(k===0||gvDone(k-1)));
const gvNext=()=>{for(let k=0;k<N;k++)if(!gvDone(k))return k;return-1};
const gvCount=()=>GCH.filter((_,k)=>gvDone(k)).length;
window.gvState=()=>({done:gvCount(),next:gvNext(),day:gvDay()});
const inGv=c=>c>=GC0&&c<GC0+N;
{const su=sagaUnlocked;sagaUnlocked=function(i){if(inGv(i))return gvUnlocked(i-GC0);return su.apply(this,arguments)}}
{const so=sagaOpen;sagaOpen=function(c,part){if(!inGv(c))return so.apply(this,arguments);const k=c-GC0,cfg=SAGA[c];cfg.intro=dc(GCH[k].intro);cfg.outro=dc(GCH[k].outro);const r=so.apply(this,arguments);
  try{const o=document.getElementById('sgov');if(o){o.classList.remove('bk3');o.classList.add('gvcr');const chip=o.querySelector('.sgchip');if(chip){chip.setAttribute('data-noi18n','');chip.textContent=`${GCH[k].ic} ${LANG==='en'?'The Still Winter':"L'Hiver Immobile"} ${k+1}/${N} · ${typeof trS==='function'?trS(GCH[k].t):GCH[k].t}`}}musicWant(GCH[k].mus)}catch(e){}return r}}
{const sb=sagaBgSVG;sagaBgSVG=function(c){if(inGv(c))return gvBg(c-GC0);return sb.apply(this,arguments)}}
{const sf=sagaFig;sagaFig=function(w){try{
  if(w==='ilyane')return`<div class="sgfig lore">${ilyBody(0)}</div>`;
  if(w==='ilyg')return`<div class="sgfig lore">${ilyBody(1)}</div>`;
  if(w==='ilyf')return`<div class="sgfig lore">${ilyBody(2)}</div>`;
  if(w==='morhiver')return`<div class="sgfig vil"><svg viewBox="0 0 100 100">${MONS['Morhiver, le Givre-Sans-Fin']()}</svg></div>`}catch(e){}return sf.apply(this,arguments)}}
/* combats : même adaptation à la force de l'équipe que les autres chroniques ; chaque défaite affaiblit un peu l'hiver */
const GK=[{f:.97,bh:1,ba:1},{f:.98,bh:1.02,ba:1},{f:.99,bh:1.04,ba:1.01},{f:1,bh:1.06,ba:1.02},{f:1,bh:1.08,ba:1.03},{f:.97,bh:1.12,ba:1.05}];
function gvFoes(k){const ids=teamIdsFor('pve').filter(i=>HEROES[i]&&(S.heroes[i]||(window.PICK&&PICK.on&&PICK.trial[i])));const P=Math.max(1150,(window.pkPow||idsPower)(ids)),K=GK[k],C=GCH[k];
  const L=GVS().l[k]||0,fb=.86+.14*Math.min(1,Math.max(0,(Math.log10(P)-4)/.477)),dda=Math.max(.55,Math.pow(.9,L));
  const e=Math.max(0,Math.log(P*fb*K.f*dda/1150)/Math.log(GROW)),g=Math.pow(GROW,e)*(1+1.1*e/99),hm=.85,am=1.08;
  const port=(nm,h,b)=>NMAP[nm]&&typeof nmonArt==='function'?nmonArt(nm,h,b):monArt(nm,h,b);
  const mins=C.mins.map((x,i)=>foeUnit(i,{name:x[0],max:Math.round(380*g*hm*(.95+i*.1)),atk:Math.round(41*g*am),def:Math.round(18*g),spd:94+i*8,port:port(x[0],x[1],false),sk:i?{n:'Morsure de givre',tg:'one',fx:{dmg:170}}:{n:'Souffle glacé',tg:'all',fx:{dmg:80}}}));
  const b=foeUnit(9,{name:C.boss.n,boss:1,max:Math.round(380*g*4.5*hm*K.bh),atk:Math.round(42*g*1.55*am*K.ba),def:Math.round(18*g*1.4),spd:104+k*2,port:port(C.boss.n,C.boss.h,true),sk:{n:C.bsk.n,tg:'all',fx:C.bsk.fx}});
  return[...mins,b]}
window.gvFoes=gvFoes;
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(inGv(c)&&r){const k=c-GC0;r.foes=gvFoes(k);r.title=`${GCH[k].ic} ${GCH[k].t}`;r.sub=`L'Hiver Immobile · chapitre ${k+1}/${N}`;r.maxR=30;r.wc=GCH[k].boss.h}}catch(e){console.warn('hiver immobile',e)}return r}}
{const ef=evFinish;evFinish=function(dmg,rw){const on=SGX.active,c=SGX.ch;const r=ef.apply(this,arguments);try{if(on&&inGv(c)&&r!=='Victoire !'){const G=GVS(),k=c-GC0;G.l[k]=(G.l[k]||0)+1;save();
  rw.push("⏳ Kaïros : « Pour une fois, le temps est de notre côté. Le givre faiblit : le prochain essai sera un peu plus facile. »")}}catch(e){}return r}}
/* récompenses : gemmes et XP du pass de la saison */
const BAN=i=>`<div class="acsteps gvsteps">${GCH.map((c,k)=>`<i class="${gvDone(k)?'on':''}${k===i?' cur':''}">${gvDone(k)?'✓':c.ic}</i>`).join('')}</div>`;
{const sr=sagaReward;sagaReward=function(c){if(!inGv(c))return sr.apply(this,arguments);const k=c-GC0,G=GVS();if(G.d[k]){render();return}G.d[k]=Date.now();
  const [gm,xp]=GCH[k].rw;S.gems+=gm;try{if(gvOpen())passAdd(xp)}catch(e){}const fin=k===N-1;let fr=false;
  if(fin&&S.heroes[58]){S.heroes[58].f=(S.heroes[58].f||0)+10;fr=true}
  if(fin)try{news(Date.now(),`${S.name||'Voyageur'} a terminé la chronique « L'Hiver Immobile ».`)}catch(e){}
  save();try{ttCheck()}catch(e){}
  const nx=gvNext(),nxt=nx<0?'':gvUnlocked(nx)?`<p class="muted" style="font-size:12.5px;margin:8px 0 0">▶️ Le chapitre ${nx+1} t'attend déjà !</p>`:`<p class="muted" style="font-size:12.5px;margin:8px 0 0">🔒 Chapitre ${nx+1} : jour ${GCH[nx].day} de la saison.</p>`;
  const rw=`<div class="xrw"><div>${GEM}${gm} gemmes</div>${gvOpen()?`<div>🎟️ ${xp} XP de pass</div>`:''}${fin?(fr?'<div>⏳ 10 fragments de Kaïros</div>':'')+"<div>🏷️ Titre « Gardien de l'Hiver »</div>":''}</div>`;
  if(fin)modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="urev gvrev" style="--uc:#8ad8ff"><div class="big gvbig">${ilyBody(2)}</div><div class="h">CHRONIQUE TERMINÉE</div><div style="font-weight:900">L'Hiver Immobile</div><p class="muted" style="font-size:13px;margin:0 8px">« Toutes les horloges du royaume battent de nouveau. Toutes, sauf une. »</p>${rw}<button class="btn p" data-a="close" style="width:100%">Continuer</button></div>`);
  else modal(`<div class="sgrw acrw"><div class="sgfrag">${GCH[k].ic}</div><div class="h">Chapitre ${k+1} terminé</div><p class="sub">« ${esc(GCH[k].t)} »</p>${BAN(k)}${rw}${nxt}<button class="btn p" data-a="close" style="width:100%;margin-top:10px">Continuer</button></div>`);
  render()}}
try{TITLES.push({k:'hivimm',n:"Gardien de l'Hiver",c:'#8ad8ff',d:"Terminer la chronique « L'Hiver Immobile »",ok:()=>!!(S.gvc&&S.gvc.d&&S.gvc.d[N-1])})}catch(e){}
/* la carte de la chronique, en haut de l'onglet Aventure */
function gvCard(){if(!gvOpen()&&!gvCount())return'';const nx=gvNext(),n=gvCount();
  let main;if(nx<0)main=`<div class="acgot gvgot">⏳ Chronique terminée. <button class="btn sm" data-a="hero" data-v="58">Voir Kaïros</button></div>`;
  else if(gvUnlocked(nx))main=`<button class="btn pro acgo gvgo" data-a="gvplay" data-v="${nx}">▶️ ${GCH[nx].ic} Chapitre ${nx+1} : ${esc(GCH[nx].t)}</button>`;
  else if(!gvOpen())main=`<p class="muted" style="font-size:12.5px;margin:0">La saison est terminée : la chronique est refermée.</p>`;
  else{const t=GV0+(GCH[nx].day-1)*864e5-Date.now();main=`<button class="btn" disabled style="width:100%">🔒 <span>Chapitre ${nx+1}</span> · <span>${dur(Math.max(0,t))}</span></button>`}
  const list=GCH.map((c,k)=>{const ok=gvDone(k),un=gvUnlocked(k);return`<button class="sgch ${ok?'ok':un?'un':'lock'}" data-a="gvplay" data-v="${k}" ${un||ok?'':'disabled'}><span class="sgci">${ok?'✅':un?c.ic:'🔒'}</span><b>${k+1}. ${esc(c.t)}</b><small>${ok?'Terminé · rejouer':un?'Disponible !':`Jour ${c.day} de la saison`}</small></button>`}).join('');
  return`<div class="card acard gvcard"><div class="acrow"><button class="acpt gvpt" data-a="hero" data-v="58" aria-label="Kaïros">${ilyBody(1)}</button><div style="min-width:0;flex:1"><span class="tag" style="--rc:#8ad8ff">CHRONIQUE DE SAISON · ${n}/${N}</span><div class="h3" style="margin:4px 0 2px">⏳ L'Hiver Immobile</div>
   <p class="muted" style="font-size:12.5px;margin:0">Toutes les horloges du royaume se sont arrêtées à huit heures dix. Kaïros sait pourquoi. Un nouveau chapitre au fil de la saison : <b>gemmes et XP de pass</b> à chaque chapitre.</p></div></div>
   ${BAN(-1)}${main}<details class="sgdet"><summary>Tous les chapitres</summary><div class="sglist">${list}</div></details></div>`}
window.gvCard=gvCard;
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="gvplay"]');if(!b)return;e.preventDefault();e.stopImmediatePropagation();const k=+b.dataset.v;if(!gvUnlocked(k))return;try{closeModal()}catch(er){}sagaOpen(GC0+k,'intro')},true);
{const sc=sagaCard;sagaCard=function(){const h=sc.apply(this,arguments);try{const c=gvCard();if(c)return c+h}catch(e){}return h}}
/* annonce + notes de version */
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(gvOpen()&&!L.some(a=>a.k==='givre2')){const i=L.findIndex(a=>a.k==='givre1');L.splice(i>=0?i+1:0,0,{k:'givre2',ac:'#8ad8ff',tag:'NOUVELLE CHRONIQUE',t:"L'Hiver Immobile ⏳",
  x:"Toutes les horloges du royaume se sont arrêtées à huit heures dix, et la neige reste suspendue dans l'air. Kaïros sait pourquoi… et il ne veut pas en parler. <b>6 chapitres</b> au fil de la saison, dans l'onglet Aventure. Attention : cette histoire-là ne finit pas forcément bien.",
  art:()=>`<div class="skann gvann">${ilyBody(1)}</div>`,go:'⏳ Lire la chronique',fn:()=>{TAB='adv';try{scrollTo(0,0)}catch(e){}}})}}catch(e){}return L}}catch(e){}
try{const P=PATCH.find(p=>p.v===46);const it="⏳ <b>Chronique de saison « L'Hiver Immobile »</b> : 6 chapitres au fil de la saison (onglet Aventure). Pourquoi toutes les horloges se sont-elles arrêtées ? Qui est Ilyane, l'apprentie de Kaïros ? Et qui murmure sous la glace ? Gemmes et XP de pass à chaque chapitre.";
  if(P)P.items.splice(2,0,it);I18N_EN[it]="⏳ <b>Season chronicle “The Still Winter”</b>: 6 chapters over the season (Adventure tab). Why did every clock stop? Who is Ilyane, Kairos's apprentice? And who is whispering under the ice? Gems and pass XP for each chapter."}catch(e){}

/* ---------- décors ---------- */
function gvBg(k){const C=GCH[k],[a,b,d]=C.bg,R=rng(k*733+29),f=n=>(+n).toFixed(0),id='gvb'+k,A=(at,v,du)=>`<animate attributeName="${at}" values="${v}" dur="${du}s" repeatCount="indefinite"/>`;
  let s=`<svg class="sgbg" viewBox="0 0 400 700" preserveAspectRatio="xMidYMid slice"><defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/><stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${d}"/></linearGradient><radialGradient id="${id}g"><stop offset="0" stop-color="#e8f8ff" stop-opacity=".85"/><stop offset="1" stop-color="#8ad8ff" stop-opacity="0"/></radialGradient></defs><rect width="400" height="700" fill="url(#${id})"/>`;
  const stars=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle cx="${f(R()*400)}" cy="${f(R()*260)}" r="${(.6+R()*1.2).toFixed(1)}" fill="#fff" opacity="${(.3+R()*.6).toFixed(2)}"/>`;return o};
  const snow=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle r="${(1+R()*2.2).toFixed(1)}" fill="#fff" opacity="${(.5+R()*.4).toFixed(2)}"><animateMotion dur="${(8+R()*7).toFixed(1)}s" begin="${(-R()*10).toFixed(1)}s" repeatCount="indefinite" path="M${f(R()*400)} -20q${f(R()*80-40)} 360 ${f(R()*100-50)} 740"/></circle>`;return o};
  const still=n=>{let o='';for(let i=0;i<n;i++)o+=`<circle cx="${f(R()*400)}" cy="${f(R()*600)}" r="${(1+R()*2).toFixed(1)}" fill="#fff" opacity="${(.45+R()*.45).toFixed(2)}"/>`;return o};
  const aurora=`<path d="M0 120Q100 60 200 110T400 90V190Q300 150 200 180T0 200Z" fill="#6affc8" opacity=".16">${A('opacity','.08;.22;.08',7)}</path><path d="M0 160Q120 110 240 150T400 130V220Q280 190 160 214T0 230Z" fill="#b48aff" opacity=".12"/>`;
  const mtn=(y,c,o)=>`<path d="M0 ${y}L50 ${y-60}L95 ${y-20}L150 ${y-90}L210 ${y-30}L270 ${y-80}L330 ${y-25}L400 ${y-70}V700H0Z" fill="${c}" opacity="${o||1}"/><path d="M150 ${y-90}L164 ${y-70}L156 ${y-66}L142 ${y-72}ZM270 ${y-80}L282 ${y-62}L272 ${y-60}L260 ${y-64}ZM50 ${y-60}L60 ${y-46}L52 ${y-44}L42 ${y-48}Z" fill="#fff" opacity=".9"/>`;
  const HH=(8+10/60)*Math.PI/6,MM=Math.PI/3;
  const face=(cx,cy,r,op)=>{let o=`<g opacity="${op||1}"><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f4fbff" stroke="#2a3a5a" stroke-width="${(r*.08).toFixed(1)}"/>`;
    for(let i=0;i<12;i++){const t=i*Math.PI/6;o+=`<path d="M${(cx+Math.sin(t)*r*.72).toFixed(1)} ${(cy-Math.cos(t)*r*.72).toFixed(1)}L${(cx+Math.sin(t)*r*.86).toFixed(1)} ${(cy-Math.cos(t)*r*.86).toFixed(1)}" stroke="#2a3a5a" stroke-width="${(r*(i%3?.04:.08)).toFixed(1)}"/>`}
    return o+`<path d="M${cx} ${cy}L${(cx+Math.sin(HH)*r*.45).toFixed(1)} ${(cy-Math.cos(HH)*r*.45).toFixed(1)}" stroke="#1a2440" stroke-width="${(r*.09).toFixed(1)}" stroke-linecap="round"/><path d="M${cx} ${cy}L${(cx+Math.sin(MM)*r*.68).toFixed(1)} ${(cy-Math.cos(MM)*r*.68).toFixed(1)}" stroke="#1a2440" stroke-width="${(r*.05).toFixed(1)}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${(r*.07).toFixed(1)}" fill="#1a2440"/></g>`};
  const gear=(cx,cy,r,c,op)=>{let o='';for(let i=0;i<10;i++){const t=i*Math.PI/5;o+=`<rect x="${(cx-r*.14).toFixed(1)}" y="${(cy-r*1.16).toFixed(1)}" width="${(r*.28).toFixed(1)}" height="${(r*.3).toFixed(1)}" fill="${c}" transform="rotate(${(t*180/Math.PI).toFixed(0)} ${cx} ${cy})"/>`}return`<g opacity="${op||1}">${o}<circle cx="${cx}" cy="${cy}" r="${r}" fill="${c}"/><circle cx="${cx}" cy="${cy}" r="${(r*.42).toFixed(1)}" fill="${d}"/></g>`};
  const house=(x,y,w,h,c)=>`<path d="M${x} ${y}V${y-h}L${x+w/2} ${y-h-w*.45}L${x+w} ${y-h}V${y}Z" fill="${c}"/><path d="M${x-3} ${y-h+2}L${x+w/2} ${y-h-w*.45-3}L${x+w+3} ${y-h+2}L${x+w-4} ${y-h+4}L${x+w/2} ${y-h-w*.45+3}L${x+4} ${y-h+4}Z" fill="#fff"/><rect x="${x+w*.3}" y="${y-h*.6}" width="${(w*.18).toFixed(0)}" height="${(w*.2).toFixed(0)}" fill="#ffd890" opacity=".7"/>`;
  const ice=(x,y,h)=>`<path d="M${x-h*.22} ${y}L${x} ${y-h}L${x+h*.22} ${y}Z" fill="#dff4ff" opacity=".9"/><path d="M${x} ${y-h}L${x+h*.22} ${y}L${x+h*.05} ${y}Z" fill="#8ac8f0" opacity=".6"/>`;
  if(k===0){/* la Capitale au matin, la neige suspendue, la grande horloge arrêtée sur huit heures dix */
    s+=mtn(430,'#9ab8d8',.6)+`<path d="M170 520V250L200 214L230 250V520Z" fill="#3a4a6a"/><path d="M162 252L200 206L238 252Z" fill="#2a3450"/><path d="M164 250L200 208L236 250L230 254L200 218L170 254Z" fill="#fff"/>`+face(200,300,32);
    for(const [x,w,h] of [[10,60,70],[76,56,90],[250,58,84],[316,70,66]])s+=house(x,520,w,h,'#4a5a7a');
    s+=`<path d="M0 520Q200 500 400 520V700H0Z" fill="#e8f2fc"/><path d="M0 560Q200 540 400 562V700H0Z" fill="#d0e0f0"/>`+still(46)}
  else if(k===1){/* la tour sur le pic, une seule lumière bleue qui bat */
    s+=stars(40)+aurora+mtn(520,'#24385e')+`<path d="M182 470V210L200 180L218 210V470Z" fill="#141e36"/><path d="M174 214L200 168L226 214Z" fill="#0e1628"/>`;
    s+=`<circle cx="200" cy="240" r="40" fill="url(#${id}g)">${A('r','30;46;30',2.4)}</circle>`+face(200,240,15);
    for(let i=0;i<7;i++)s+=face(188+(i%2)*24,290+i*24,5,.7);
    s+=`<path d="M0 600Q200 560 400 600V700H0Z" fill="#c8d8ec"/>`+snow(22)}
  else if(k===2){/* le cœur de l'horloge : une silhouette dans la glace */
    for(const [x,y,r] of [[60,140,46],[350,200,58],[40,560,52],[360,600,44]])s+=gear(x,y,r,'#1e3a6a',.6);
    s+=face(200,320,130,.55)+`<path d="M110 200L292 190L320 350L280 470L120 480L84 340Z" fill="#bfe6ff" opacity=".22" stroke="#e8f8ff" stroke-width="2" stroke-opacity=".6"/>`;
    s+=`<g opacity=".55" transform="translate(200 370)"><circle cy="-60" r="13" fill="#e8f8ff"/><path d="M-16 -44Q0 -50 16 -44L22 30H-22Z" fill="#e8f8ff"/><path d="M14 -34L44 -60" stroke="#e8f8ff" stroke-width="8" stroke-linecap="round"/></g>`+still(30)}
  else if(k===3){/* le royaume gelé, un masque immense dans les nuages */
    s+=`<g opacity=".18"><path d="M150 60Q150 20 200 16Q250 20 250 60V120Q228 160 200 162Q172 160 150 120Z" fill="#ffffff"/><path d="M164 80Q180 70 194 80Q180 90 164 80ZM206 80Q220 70 236 80Q220 90 206 80Z" fill="#0a1838"/></g>`;
    s+=mtn(440,'#7a98c0',.7);for(const [x,w,h] of [[20,52,60],[90,64,74],[230,56,70],[300,72,58]])s+=house(x,530,w,h,'#6a7a98');
    s+=`<path d="M0 530Q200 506 400 530V700H0Z" fill="#e8f2fc"/><path d="M0 600Q120 580 260 600T400 596V700H0Z" fill="#a8c4e4" opacity=".7"/>`+still(40)+snow(10)}
  else if(k===4){/* la tour : le cœur de glace qui bat */
    for(const [x,y,r] of [[50,180,40],[350,140,52],[60,520,46],[340,560,40]])s+=gear(x,y,r,'#16305a',.7);
    s+=`<g transform="translate(200 330)"><g>${'<animateTransform attributeName="transform" type="scale" values="1;1.06;1;1;1" dur="2.6s" repeatCount="indefinite"/>'}<path d="M0 110L-96 10Q-130 -30 -100 -70Q-60 -104 0 -60Q60 -104 100 -70Q130 -30 96 10Z" fill="#8ad8ff" opacity=".35" stroke="#e8f8ff" stroke-width="3"/><path d="M0 -60L-40 0L0 110M0 -60L40 0L0 110M-100 -70L-40 0L96 10M100 -70L40 0L-96 10" stroke="#e8f8ff" stroke-width="1.2" opacity=".5" fill="none"/></g></g>`+face(200,320,30,.8)+snow(16)}
  else{/* le lac Miroir, la nuit */
    s+=stars(60)+`<circle cx="300" cy="130" r="48" fill="#f4fbff"/><circle cx="300" cy="130" r="80" fill="url(#${id}g)" opacity=".5"/>`+mtn(430,'#16264a');
    s+=`<ellipse cx="200" cy="560" rx="260" ry="110" fill="#bfe6ff" opacity=".35"/><ellipse cx="200" cy="560" rx="200" ry="70" fill="#e8f8ff" opacity=".25"/><ellipse cx="300" cy="580" rx="30" ry="8" fill="#ffffff" opacity=".5"/>`;
    s+=`<circle cx="200" cy="520" r="40" fill="url(#${id}g)">${A('r','34;44;34',3)}</circle><g transform="translate(200 528)" opacity=".85"><circle cy="-34" r="7" fill="#e8f8ff"/><path d="M-9 -26Q0 -29 9 -26L12 10H-12Z" fill="#e8f8ff"/><path d="M8 -20L24 -34" stroke="#e8f8ff" stroke-width="4.4" stroke-linecap="round"/></g>`;
    for(const [x,y,h] of [[40,520,50],[78,540,30],[330,530,46],[366,548,28],[120,640,36],[290,650,40]])s+=ice(x,y,h);
    s+=snow(24)}
  return s+'</svg>'}

/* ---------- styles ---------- */
const st=document.createElement('style');st.textContent=`
.gvcard{background:radial-gradient(120% 140% at 85% 0%,rgba(138,216,255,.24),transparent 60%),var(--panel)!important;border-color:rgba(138,216,255,.55)!important}
.gvcard .gvpt{background:radial-gradient(circle at 50% 30%,#2a5a9a,#0a1a3a)!important;box-shadow:0 0 16px -4px #8ad8ff;overflow:hidden}.gvcard .gvpt svg{width:150%;height:150%;margin:-6% 0 0 -25%}
.gvsteps i{border-color:rgba(138,216,255,.45)}.gvsteps i.on{background:#123a6a;border-color:#dff4ff}.gvgo{background:linear-gradient(180deg,#8ad8ff,#2a6aaa)!important;color:#fff!important}.gvgot{background:linear-gradient(135deg,#123a6a,#0a1a3a)!important;border-color:#8ad8ff!important}
.gvrev .gvbig{background:radial-gradient(circle at 50% 35%,#2a5a9a,#06142e)!important}.gvrev .gvbig svg{width:100%;height:100%}
#sgov.gvcr .sgchip{background:rgba(18,58,106,.85);color:#e8f8ff}
#sgov.gvcr:not(.fbmode) .sgbox{border-color:rgba(138,216,255,.6)!important;box-shadow:0 0 0 2px rgba(138,216,255,.25),0 10px 30px rgba(0,0,0,.5)}
.gvann svg{height:100%}`;document.head.appendChild(st);

/* ---------- anglais ---------- */
try{Object.assign(I18N_EN,{"Ilyane, l'apprentie horlogère":'Ilyane, the apprentice clockmaker','Ilyane, sous la glace':'Ilyane, under the ice','Morhiver, le Givre-Sans-Fin':'Morhiver, the Endless Frost',
 'Les horloges arrêtées':'The Stopped Clocks',"La Tour de l'Horloger":"The Clockmaker's Tower","L'instant figé":'The Frozen Moment','Ce que murmure la glace':'What the Ice Whispers',"L'horloge qui bat encore":'The Clock That Still Ticks',
 "Capitale d'Éther":'Ether Capital','Les cimes du Nord':'The Northern Peaks',"Le cœur de l'horloge":'The Heart of the Clock','Le royaume gelé':'The Frozen Kingdom','Le lac Miroir':'Mirror Lake',
 'Rouage Gelé':'Frozen Cog','Gardien des Engrenages':'Gear Warden','Écho de Morhiver':'Echo of Morhiver','Main de Morhiver':'Hand of Morhiver','Cœur de Morhiver':'Heart of Morhiver',
 'Regard gelé':'Frozen Gaze','Engrenage broyeur':'Grinding Gear','Murmure glacé':'Icy Whisper',"Étreinte de l'hiver":"Winter's Embrace",'Pouls glacial':'Glacial Pulse','Éternité blanche':'White Eternity','Morsure de givre':'Frost Bite','Souffle glacé':'Icy Breath',
 "Gardien de l'Hiver":'Winter Warden',"Terminer la chronique « L'Hiver Immobile »":'Finish the chronicle “The Still Winter”','NOUVELLE CHRONIQUE':'NEW CHRONICLE',"L'Hiver Immobile ⏳":'The Still Winter ⏳','⏳ Lire la chronique':'⏳ Read the chronicle',
 "Toutes les horloges du royaume se sont arrêtées à huit heures dix, et la neige reste suspendue dans l'air. Kaïros sait pourquoi… et il ne veut pas en parler. <b>6 chapitres</b> au fil de la saison, dans l'onglet Aventure. Attention : cette histoire-là ne finit pas forcément bien.":"Every clock in the kingdom stopped at ten past eight, and the snow hangs still in the air. Kairos knows why… and he won't talk about it. <b>6 chapters</b> over the season, in the Adventure tab. Careful: this story doesn't necessarily end well.",
 "« Toutes les horloges du royaume battent de nouveau. Toutes, sauf une. »":'“Every clock in the kingdom is ticking again. All but one.”','CHRONIQUE TERMINÉE':'CHRONICLE COMPLETE',
 "⏳ Kaïros : « Pour une fois, le temps est de notre côté. Le givre faiblit : le prochain essai sera un peu plus facile. »":'⏳ Kairos: “For once, time is on our side. The frost is weakening: the next try will be a little easier.”',
 'Il y a sept jours…':'Seven days ago…','Le soir du lac Miroir…':'The night at Mirror Lake…',
 /* chapitre 1 */
 "Ce matin-là, à huit heures et dix minutes, toutes les horloges de la Capitale se sont arrêtées en même temps.":"That morning, at ten past eight, every clock in the Capital stopped at the same moment.",
 "Puis la neige est tombée. Pas une neige qui danse : une neige qui reste suspendue dans l'air, immobile, comme si quelqu'un avait mis le monde sur pause.":"Then the snow fell. Not dancing snow: snow that hangs in the air, motionless, as if someone had paused the world.",
 "Hou… Porteur, regarde le boulanger. Il ne bouge plus. Sa main est restée en l'air, au-dessus de son pain.":"Hoo… Bearer, look at the baker. He isn't moving. His hand is stuck in the air, above his bread.",
 "Ce n'est pas du sommeil. Il est gelé. Pas dans la glace… dans le temps.":"He isn't asleep. He's frozen. Not in ice… in time.",
 "Il n'y a qu'une personne au royaume capable de toucher au temps. Kaïros, le Maître du Temps.":"There's only one person in the kingdom who can touch time. Kairos, the Master of Time.",
 "Mais Kaïros n'est pas venu au conseil depuis une semaine. Sa place est vide, et sa tasse de thé est couverte de givre.":"But Kairos hasn't come to the council for a week. His seat is empty, and his teacup is covered in frost.",
 "Même les ombres se sont figées. Écoutez… Pas un oiseau, pas une cloche. Rien.":"Even the shadows have frozen. Listen… Not a bird, not a bell. Nothing.",
 "Au bout de la grande avenue, pourtant, quelque chose bouge : des loups blancs aux yeux bleus, et derrière eux, une sentinelle de glace qui monte la garde devant la grande horloge.":"Yet at the end of the great avenue, something moves: white wolves with blue eyes, and behind them, an ice sentinel standing guard before the great clock.",
 "Ils protègent l'horloge. Comme si quelqu'un voulait être sûr qu'elle ne reparte jamais.":"They're guarding the clock. As if someone wanted to make sure it never starts again.",
 "🛡️ Mettre les habitants gelés à l'abri d'abord":'🛡️ Get the frozen townsfolk to safety first',"On protège les habitants d'abord. Personne ne doit être brisé pendant le combat.":"We protect the townsfolk first. Nobody gets shattered during the fight.",
 '⚔️ Foncer sur la Sentinelle':'⚔️ Charge the Sentinel',"Si c'est elle qui garde l'horloge, c'est elle qu'on fait tomber !":"If she's guarding the clock, she's the one going down!",
 "Le froid, c'est mon royaume. Il ne me fait pas peur.":"The cold is my kingdom. It doesn't scare me.",
 "La Sentinelle se brise en mille éclats. Mais l'horloge ne repart pas. Ses aiguilles restent plantées sur huit heures dix.":"The Sentinel shatters into a thousand shards. But the clock doesn't start again. Its hands stay stuck at ten past eight.",
 "Regarde, Porteur ! Sur le cadran, il y a une marque gravée. Un sablier dans un cercle.":"Look, Bearer! There's a mark engraved on the dial. An hourglass in a circle.",
 "Le sceau de Kaïros. C'est lui qui a arrêté les horloges.":"Kairos's seal. He's the one who stopped the clocks.",
 "Non… Kaïros ne ferait jamais ça. Il dit toujours : « Le temps n'appartient à personne. »":"No… Kairos would never do that. He always says: “Time belongs to no one.”",
 "Au loin, vers le nord, une lumière bleue clignote au sommet des montagnes. Une seule. Comme un cœur qui bat encore.":"Far to the north, a blue light blinks on top of the mountains. Just one. Like a heart that still beats.",
 "La Tour de l'Horloger. C'est là qu'il vit. On y va, et on lui demande pourquoi.":"The Clockmaker's Tower. That's where he lives. We go there, and we ask him why.",
 /* chapitre 2 */
 "La Tour de l'Horloger se dresse seule au sommet des cimes. Ses murs sont couverts d'horloges : des petites, des grandes, des centaines. Toutes arrêtées.":"The Clockmaker's Tower stands alone at the top of the peaks. Its walls are covered with clocks: small ones, big ones, hundreds. All stopped.",
 "Avant, quand on passait ici, on entendait des milliers de tic-tac. Kaïros disait que c'était sa musique préférée.":"Before, when you came by, you could hear thousands of tick-tocks. Kairos said it was his favourite music.",
 "Dans le grand atelier, au milieu des engrenages gelés, un vieil homme est assis devant une horloge géante prise dans la glace.":"In the great workshop, among frozen gears, an old man sits before a giant clock trapped in ice.",
 "Vous n'auriez pas dû venir. Repartez, s'il vous plaît. Ici, rien ne doit bouger.":"You shouldn't have come. Leave, please. Here, nothing must move.",
 "Kaïros ! Tout le royaume est en train de geler ! Les gens ne bougent plus ! Qu'est-ce que tu as fait ?":"Kairos! The whole kingdom is freezing! People can't move! What have you done?",
 "Ce que n'importe qui aurait fait à ma place.":"What anyone would have done in my place.",
 "L'atelier est chaud et bruyant. Une jeune fille aux cheveux blancs court entre les établis, les poches pleines d'outils.":"The workshop is warm and noisy. A white-haired girl runs between the workbenches, her pockets full of tools.",
 "Maître ! Maître ! J'ai réussi ! Elle a fait cent tours sans s'arrêter !":"Master! Master! I did it! It ran a hundred turns without stopping!",
 "Ilyane, combien de fois t'ai-je dit de ne pas courir dans l'atelier ? … Montre-moi ça.":"Ilyane, how many times have I told you not to run in the workshop? … Show me.",
 "Une montre qui ne s'arrête jamais. Comme ça, quand je serai vieille, elle battra encore pour vous.":"A watch that never stops. That way, when I'm old, it'll still be ticking for you.",
 "Quand tu seras vieille, je serai poussière, petite effrontée. Mais… elle est magnifique.":"When you're old, I'll be dust, you cheeky thing. But… it's beautiful.",
 "C'était il y a sept jours. Depuis, il n'y a plus eu de « depuis ».":"That was seven days ago. Since then, there hasn't been any “since”.",
 "Un grincement. Les engrenages de la tour se mettent à bouger tout seuls, comme des bras de métal couverts de givre.":"A creak. The tower's gears start moving on their own, like metal arms covered in frost.",
 "Les engrenages ! Quelque chose les contrôle… et ce n'est pas Kaïros !":"The gears! Something is controlling them… and it isn't Kairos!",
 '💗 Protéger Kaïros, qui ne se défend pas':"💗 Protect Kairos, who won't defend himself","Kaïros, reste derrière nous. On ne te laissera pas seul.":"Kairos, stay behind us. We won't leave you alone.",
 '⚔️ Briser les engrenages':'⚔️ Smash the gears',"Ces machines ne toucheront pas à l'atelier !":"These machines won't touch the workshop!",
 "… Ce froid-là ne vient pas de moi.":"… That cold isn't coming from me.",
 "Le Gardien des Engrenages s'effondre dans un fracas de métal gelé.":"The Gear Warden collapses in a crash of frozen metal.",
 "Ces machines m'obéissent depuis quarante ans. Quelqu'un d'autre leur parle, maintenant. Quelqu'un qui a très froid au cœur.":"These machines have obeyed me for forty years. Someone else is talking to them now. Someone with a very cold heart.",
 "Kaïros… Où est Ilyane ?":"Kairos… Where is Ilyane?",
 "Le vieil homme ne répond pas. Il pose sa main sur la glace de l'horloge géante, très doucement, comme on caresse une joue.":"The old man doesn't answer. He lays his hand on the ice of the giant clock, very gently, the way you'd touch a cheek.",
 "Elle est là. Elle est juste là.":"She's here. She's right here.",
 /* chapitre 3 */
 "Sous la glace de l'horloge géante, on devine une silhouette. Une jeune fille, la main tendue, figée au milieu d'un pas.":"Under the ice of the giant clock, a silhouette can be made out. A girl, her hand reaching out, frozen mid-step.",
 "Ilyane… Elle est… dans le temps arrêté.":"Ilyane… She's… inside stopped time.",
 "Ce soir-là, nous étions sur le lac Miroir. Elle voulait tester sa montre dans le grand froid. Et quelque chose est sorti de la glace.":"That night, we were on Mirror Lake. She wanted to test her watch in the deep cold. And something came out of the ice.",
 "La lune est pleine. Ilyane glisse sur le lac gelé en riant. Sous ses pieds, la glace devient noire.":"The moon is full. Ilyane slides across the frozen lake, laughing. Under her feet, the ice turns black.",
 "Maître ? La glace… on dirait qu'elle me regarde.":"Master? The ice… it's like it's looking at me.",
 "Une main de givre jaillit et lui touche la poitrine. Le givre se met à monter, à monter, vers son cœur.":"A hand of frost bursts out and touches her chest. The frost begins to climb, and climb, toward her heart.",
 "ILYANE !":"ILYANE!",
 "Alors Kaïros fait la seule chose qu'il sait faire. Il arrête le temps. Une seconde avant que le froid n'atteigne son cœur.":"So Kairos does the only thing he knows how to do. He stops time. One second before the cold reaches her heart.",
 "Si le temps repart, le givre finira son chemin. Et elle… Alors je le garde arrêté. Une seconde de plus. Et encore une. Et encore une.":"If time starts again, the frost will finish its path. And she… So I keep it stopped. One more second. And another. And another.",
 "Kaïros… ta seconde dure depuis sept jours. Et pendant ce temps, l'hiver dévore le royaume.":"Kairos… your second has lasted seven days. And all that time, winter has been devouring the kingdom.",
 "Une voix glisse entre les murs. Douce, très douce, et plus froide que la neige.":"A voice slides between the walls. Soft, so soft, and colder than snow.",
 "Laisse-le tranquille, Walkyrie. Il a raison. Pourquoi laisser partir ce qu'on aime, quand on peut le garder pour toujours ?":"Leave him be, Valkyrie. He's right. Why let go of what you love, when you can keep it forever?",
 "Cette voix… elle vient de la glace !":"That voice… it's coming from the ice!",
 '💗 Rester près de Kaïros':'💗 Stay close to Kairos',"Kaïros, ne l'écoute pas. On est là.":"Kairos, don't listen to it. We're here.",
 '⚔️ Faire taire la voix':'⚔️ Silence the voice',"Montre-toi, au lieu de murmurer !":"Show yourself instead of whispering!",
 "L'Écho se disperse en poudre de neige. Mais la voix, elle, continue de rire doucement.":"The Echo scatters into powdered snow. But the voice keeps laughing softly.",
 "Je m'appelle Morhiver. Je suis l'hiver qui ne finit pas. Et ce vieil homme m'a ouvert la porte.":"My name is Morhiver. I am the winter that never ends. And this old man opened the door for me.",
 "Non. Je n'ai ouvert aucune porte. J'ai seulement…":"No. I opened no door. I only…",
 "Tu as arrêté le temps. Et un temps arrêté, c'est un hiver éternel. C'est ma maison. Merci, horloger.":"You stopped time. And stopped time is an eternal winter. It's my home. Thank you, clockmaker.",
 "Kaïros baisse la tête. Pour la première fois, ses mains tremblent.":"Kairos lowers his head. For the first time, his hands are shaking.",
 /* chapitre 4 */
 "L'hiver s'étend. Les rivières sont devenues des routes de verre. Les villages sont des tableaux blancs, avec des gens figés au milieu de leur vie.":"The winter spreads. Rivers have become roads of glass. Villages are white paintings, with people frozen in the middle of their lives.",
 "Dans le village du col, une maman tient la main de son fils. Ils sont figés tous les deux. Ils sourient.":"In the mountain-pass village, a mother holds her son's hand. They're both frozen. They're smiling.",
 "Tu vois, Ombre-Lune ? Ils ne souffrent pas. Ils n'auront plus jamais peur. Plus jamais froid. Ils ne perdront plus jamais personne.":"You see, Moonshade? They don't suffer. They'll never be afraid again. Never cold again. They'll never lose anyone again.",
 "Ils n'auront plus jamais RIEN ! Pas de demain, pas de printemps, pas de goûter !":"They'll never have ANYTHING again! No tomorrow, no spring, no afternoon snack!",
 "Et toi, petite chouette ? Tu as perdu ton maître Aldric, il y a mille ans. Imagine… s'il était resté là. Immobile. Pour toujours avec toi.":"And you, little owl? You lost your master Aldric a thousand years ago. Imagine… if he had stayed. Still. Forever with you.",
 "Plume ne répond pas. Le givre commence à monter le long de ses plumes.":"Plume doesn't answer. Frost begins to climb along her feathers.",
 "PLUME ! Ne l'écoute pas ! Reviens vers la lumière !":"PLUME! Don't listen to him! Come back to the light!",
 "Je… je le voudrais tellement… Mais Aldric n'aurait jamais voulu ça. Il m'a appris à voler. Pas à rester sur une branche pour toujours.":"I… I want it so much… But Aldric would never have wanted that. He taught me to fly. Not to sit on a branch forever.",
 "La neige se soulève et forme une main gigantesque, aux doigts de glace, qui se referme sur le chemin.":"The snow rises and forms a gigantic hand with fingers of ice, closing over the path.",
 '💗 Réchauffer Plume':'💗 Warm Plume up',"Plume, viens contre moi. Tu n'es pas seule.":"Plume, come here. You're not alone.",
 "⚔️ Briser la main de l'hiver":"⚔️ Shatter winter's hand","Personne ne gèlera mes amis !":"Nobody freezes my friends!",
 "La Main de Morhiver se fend en deux et retombe en neige. Le givre quitte les plumes de Plume.":"The Hand of Morhiver splits in two and falls as snow. The frost leaves Plume's feathers.",
 "Hou… Merci. Il a trouvé exactement ce qui me faisait mal. C'est comme ça qu'il a eu Kaïros.":"Hoo… Thank you. He found exactly what hurt me. That's how he got Kairos.",
 "Il ne prend pas les gens par la force. Il leur promet que rien ne changera jamais.":"He doesn't take people by force. He promises them that nothing will ever change.",
 "… Et c'est exactement ce que j'ai voulu. Que rien ne change jamais.":"… And that's exactly what I wanted. For nothing to ever change.",
 "Kaïros regarde le royaume gelé, toutes ces vies arrêtées à cause de sa seconde à lui. Il ferme les yeux.":"Kairos looks at the frozen kingdom, all those lives stopped because of his one second. He closes his eyes.",
 /* chapitre 5 */
 "De retour à la tour, l'horloge géante est devenue un énorme cœur de glace, qui bat lentement. Boum… … … boum.":"Back at the tower, the giant clock has become an enormous heart of ice, beating slowly. Thump… … … thump.",
 "Morhiver est dedans. Il s'est installé dans la seconde de Kaïros, comme dans un nid.":"Morhiver is inside. He's settled into Kairos's second, like a nest.",
 "Il n'y a qu'un moyen de le chasser : rendre le temps au royaume. Et si je le rends…":"There's only one way to drive him out: give time back to the kingdom. And if I do…",
 "… le givre finira son chemin. Je sais.":"… the frost will finish its path. I know.",
 "Alors dites-moi comment on fait. Comment on laisse partir quelqu'un ?":"Then tell me how it's done. How do you let someone go?",
 "Personne ne répond. Puis, sous la glace, une toute petite lumière s'allume. Une voix, faible, très faible.":"No one answers. Then, under the ice, a tiny light flickers on. A voice, faint, so faint.",
 "Maître… je vous entends. Depuis le début, je vous entends.":"Master… I can hear you. I've heard you from the start.",
 "Ilyane ?!":"Ilyane?!",
 "Vous parlez tout seul, la nuit. Vous me racontez le royaume. Mais le royaume est en train de mourir, maître. Je l'entends aussi.":"You talk to yourself at night. You tell me about the kingdom. But the kingdom is dying, master. I can hear that too.",
 "Laissez le temps repartir. Je n'ai pas peur. Vous m'avez appris que tout ce qui est beau finit par s'arrêter. Que c'est pour ça que c'est beau.":"Let time start again. I'm not afraid. You taught me that every beautiful thing stops one day. That's why it's beautiful.",
 "Je t'ai appris ça pour les horloges, petite sotte. Pas pour toi.":"I taught you that about clocks, you silly girl. Not about you.",
 "Le cœur de glace se met à battre plus fort. Morhiver a entendu. Et il ne veut pas partir.":"The heart of ice starts beating harder. Morhiver heard. And he doesn't want to leave.",
 "Personne ne repart. Personne ne finit. Personne ne me quitte !":"No one leaves. No one ends. No one leaves ME!",
 '💗 Tenir la main de Kaïros':"💗 Hold Kairos's hand","On le fait ensemble, Kaïros. Tu ne seras pas seul.":"We do it together, Kairos. You won't be alone.",
 '⚔️ Attaquer le cœur de Morhiver':"⚔️ Attack Morhiver's heart","Ilyane a choisi. On respecte son choix !":"Ilyane has chosen. We respect her choice!",
 "Le Cœur de Morhiver se fissure de partout. L'hiver hurle à travers les montagnes.":"The Heart of Morhiver cracks all over. Winter howls across the mountains.",
 "Tu vas vraiment la laisser partir, horloger ? Pour des inconnus ? Pour des boulangers et des loups ?":"Will you really let her go, clockmaker? For strangers? For bakers and wolves?",
 "Ce n'est pas moi qui l'ai touchée. C'est toi. Moi, j'ai juste été lâche pendant sept jours.":"I'm not the one who touched her. You are. All I did was be a coward for seven days.",
 "Maître… vous n'avez pas été lâche. Vous avez été triste. Ce n'est pas pareil.":"Master… you weren't a coward. You were sad. It's not the same.",
 "Le cœur explose dans une tempête blanche. La tempête file vers le sud, vers le lac Miroir. Là où tout a commencé.":"The heart bursts into a white storm. The storm rushes south, toward Mirror Lake. Where it all began.",
 /* chapitre 6 */
 "Morhiver a tout emporté sur le lac Miroir : la glace, la nuit, et la seconde de Kaïros. Au centre du lac, Ilyane est toujours figée, la main tendue.":"Morhiver has carried everything onto Mirror Lake: the ice, the night, and Kairos's second. In the middle of the lake, Ilyane is still frozen, her hand reaching out.",
 "Regardez-la. Parfaite. Elle ne vieillira jamais. Elle ne souffrira jamais. Et vous voulez la briser ?":"Look at her. Perfect. She'll never grow old. She'll never suffer. And you want to break her?",
 "On veut lui rendre sa vie. Même si elle est courte. C'est la sienne, pas la tienne !":"We want to give her life back. Even if it's short. It's hers, not yours!",
 "Morhiver. Il y a quarante ans, j'ai juré de veiller sur le temps. Pas de l'enfermer. J'ai oublié ma promesse pendant sept jours. C'est terminé.":"Morhiver. Forty years ago, I swore to watch over time. Not to lock it away. I forgot my promise for seven days. That's over.",
 "Kaïros lève sa canne. Très loin, toutes les horloges du royaume se mettent à trembler.":"Kairos raises his cane. Far away, every clock in the kingdom begins to tremble.",
 "Ilyane… quand je dirai « maintenant »…":"Ilyane… when I say “now”…",
 "Je sais, maître. Je suis prête. Mais gagnez d'abord.":"I know, master. I'm ready. But win first.",
 "💗 Protéger Ilyane jusqu'au bout":'💗 Protect Ilyane to the very end',"Personne ne touche à Ilyane. Ni le givre, ni toi.":"No one touches Ilyane. Not the frost, not you.",
 '⚔️ Frapper Morhiver de toutes nos forces':'⚔️ Strike Morhiver with everything we have',"L'hiver éternel, c'est fini !":"Eternal winter is over!",
 "Alors gelez avec elle !":"Then freeze with her!",
 "Le dernier coup traverse Morhiver. Sa couronne de glace se fend. Il ne crie pas. Il fond, simplement, comme la neige au soleil.":"The last blow goes right through Morhiver. His crown of ice splits. He doesn't scream. He simply melts, like snow in the sun.",
 "Alors… tout… finit… vraiment…":"So… everything… really… ends…",
 "Il n'en reste qu'une flaque d'eau claire. Morhiver ne reviendra jamais.":"All that's left is a puddle of clear water. Morhiver will never return.",
 "Maintenant.":"Now.",
 "Kaïros relâche le temps. Dans tout le royaume, les horloges reprennent leur tic-tac. Le boulanger finit son geste. La maman et son fils éclatent de rire.":"Kairos lets time go. All over the kingdom, the clocks start ticking again. The baker finishes his motion. The mother and her son burst out laughing.",
 "Et sur le lac, la seconde se termine. Le givre atteint le cœur d'Ilyane.":"And on the lake, the second comes to its end. The frost reaches Ilyane's heart.",
 "Oh… Ça ne fait pas mal du tout. C'est juste… froid. Et doux.":"Oh… It doesn't hurt at all. It's just… cold. And soft.",
 "Ilyane, pardonne-moi. Pardonne-moi…":"Ilyane, forgive me. Forgive me…",
 "Il n'y a rien à pardonner. Tenez. Ma montre. Celle qui ne s'arrête jamais.":"There's nothing to forgive. Here. My watch. The one that never stops.",
 "Elle pose la petite montre dans la main du vieil homme. Puis elle sourit, et elle devient neige. Des milliers de flocons qui montent doucement vers le ciel.":"She places the little watch in the old man's hand. Then she smiles, and she becomes snow. Thousands of flakes rising gently into the sky.",
 "… Hou… Au revoir, Ilyane.":"… Hoo… Goodbye, Ilyane.",
 "Le printemps revient dans le royaume. La neige fond partout. Partout, sauf au milieu du lac Miroir, où un petit tas de neige ne fond jamais.":"Spring returns to the kingdom. The snow melts everywhere. Everywhere except the middle of Mirror Lake, where a small patch of snow never melts.",
 "Toutes les horloges du royaume battent de nouveau. Toutes, sauf une : la petite montre d'Ilyane, arrêtée à huit heures dix, que Kaïros porte contre son cœur.":"Every clock in the kingdom is ticking again. All but one: Ilyane's little watch, stopped at ten past eight, which Kairos wears against his heart.",
 "Elle disait qu'elle ne s'arrêterait jamais. Elle avait tort, ma petite. Mais moi, je ne m'arrêterai jamais de me souvenir.":"She said it would never stop. She was wrong, my little one. But I will never stop remembering.",
 "Depuis ce jour, au royaume, on l'appelle Kaïros, l'Hiver Immobile.":"Since that day, in the kingdom, they call him Kairos, the Still Winter."})}catch(e){}
}catch(e){console.warn('chronique hiver immobile',e)}})();
