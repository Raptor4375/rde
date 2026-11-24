
/* ================= MODE CAUCHEMAR : les dessins =================
   5 créatures inédites (Poupée Fêlée, Croque-Mitaine, Horloge Hurlante, Masque Rieur, Somnar le Dévoreur de Rêves)
   et 5 nouveaux calques « cauchemar » pour habiller les autres monstres (yeux rouges dans l'ombre, fumée, coutures, chaînes, couronne d'épines). */
(function(){try{
if(typeof MONS==='undefined')return;
let CID=0;
const A=(v,d,b)=>`<animate attributeName="opacity" values="${v}" dur="${d}s"${b!=null?` begin="${b}s"`:''} repeatCount="indefinite"/>`;
const O='#140c22';

/* ---------- les calques ---------- */
try{if(typeof OVL!=='undefined')Object.assign(OVL,{
 nmeyes:c=>[[13,24,1],[87,30,1.1],[12,80,.9],[88,76,1]].map(([x,y,s],i)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="7" fill="${c||'#ff2a4a'}" opacity=".18"/><ellipse cx="-2.6" cy="0" rx="1.9" ry="1.2" fill="${c||'#ff3a5a'}"/><ellipse cx="2.6" cy="0" rx="1.9" ry="1.2" fill="${c||'#ff3a5a'}"/>${A('1;1;.1;1',(3.2+i*.7).toFixed(1))}</g>`).join(''),
 nmsmoke:c=>`<g opacity=".62">`+[[6,100,-1],[94,100,1],[26,100,-1],[74,100,1]].map(([x,y,d],i)=>`<path d="M${x} ${y}Q${x+d*10} ${y-16} ${x} ${y-28}Q${x-d*8} ${y-40} ${x+d*4} ${y-52}Q${x+d*10} ${y-40} ${x+d*6} ${y-28}Q${x+d*16} ${y-14} ${x+d*8} ${y}Z" fill="${c||'#1c0a30'}"><animate attributeName="opacity" values=".5;.95;.5" dur="${(3+i*.6).toFixed(1)}s" repeatCount="indefinite"/></path>`).join('')+`</g>`,
 nmstitch:c=>`<path d="M30 30L37 38L33 44L41 52L37 58" fill="none" stroke="${O}" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M30 30L37 38L33 44L41 52L37 58" fill="none" stroke="${c||'#e8dcd0'}" stroke-width=".9" stroke-linecap="round"/>`+[[32,33],[35,41],[37,48],[39,55]].map(([x,y])=>`<path d="M${x-3.4} ${y-1.6}L${x+3.4} ${y+1.6}" stroke="${c||'#b8222a'}" stroke-width="1.5" stroke-linecap="round"/>`).join('')+`<path d="M62 64L70 70M64 70L70 64" stroke="${c||'#b8222a'}" stroke-width="1.6" stroke-linecap="round"/>`,
 nmchain:c=>`<g fill="none" stroke="${O}" stroke-width="3.2">`+[...Array(9)].map((_,i)=>`<ellipse cx="${8+i*10.5}" cy="${88-i*5}" rx="5" ry="3" transform="rotate(${i%2?-28:-28+90} ${8+i*10.5} ${88-i*5})"/>`).join('')+`</g><g fill="none" stroke="${c||'#a8a2b8'}" stroke-width="1.6">`+[...Array(9)].map((_,i)=>`<ellipse cx="${8+i*10.5}" cy="${88-i*5}" rx="5" ry="3" transform="rotate(${i%2?-28:-28+90} ${8+i*10.5} ${88-i*5})"/>`).join('')+`</g>`,
 nmcrown:c=>`<path d="M33 24L30 8L38 17L42 2L48 15L50 0L52 15L58 2L62 17L70 8L67 24Z" fill="${c||'#1a0a1e'}" stroke="#5a1a3a" stroke-width="1.4" stroke-linejoin="round"/><path d="M36 20L64 20" stroke="#5a1a3a" stroke-width="1"/><circle cx="50" cy="18.5" r="2.6" fill="#ff2a4a"><animate attributeName="r" values="2.2;3;2.2" dur="2s" repeatCount="indefinite"/></circle><circle cx="50" cy="18.5" r="6" fill="#ff2a4a" opacity=".25"/>`})}catch(e){}

/* les calques restent immobiles : ils sont dessinés dans la page (pas en image), et chaque petite animation y coûtait cher au téléphone */
try{const still=x=>String(x).replace(/<(animate|animateMotion|animateTransform|set)\b[^>]*\/>/g,'').replace(/<(animate|animateTransform)\b[^>]*>[\s\S]*?<\/(animate|animateTransform)>/g,'');
  for(const k of ['nmeyes','nmsmoke','nmstitch','nmchain','nmcrown']){const f=OVL[k];if(typeof f==='function')OVL[k]=c=>still(f(c))}}catch(e){}

/* ---------- Poupée Fêlée ---------- */
MONS['Poupée Fêlée']=()=>{const q='pp'+(CID++),s=`stroke="${O}" stroke-width="1.4" stroke-linejoin="round"`;
 return`<defs><radialGradient id="${q}f" cx="45%" cy="40%" r="65%"><stop offset="0" stop-color="#fbf6ee"/><stop offset="1" stop-color="#d8ccc4"/></radialGradient><linearGradient id="${q}d" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a5a8a"/><stop offset="1" stop-color="#3a2c52"/></linearGradient></defs>
 <ellipse cx="50" cy="95" rx="20" ry="3.5" fill="#000" opacity=".3"/>
 <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -2.5;0 0" dur="3.2s" repeatCount="indefinite"/>
 <path d="M50 54Q34 58 28 86Q38 92 50 91Q62 92 72 86Q66 58 50 54Z" fill="url(#${q}d)" ${s}/>
 <path d="M29 84Q33 80 37 85Q41 80 45 85Q49 80 53 85Q57 80 61 85Q65 80 71 85" fill="none" stroke="#efe6ff" stroke-width="2" stroke-linecap="round"/>
 <path d="M44 58L50 66L56 58" fill="#efe6ff" ${s}/><circle cx="50" cy="70" r="1.6" fill="#efe6ff"/><circle cx="50" cy="76" r="1.6" fill="#efe6ff"/>
 <path d="M36 62Q26 70 30 80" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M36 62Q26 70 30 80" fill="none" stroke="#efe6dc" stroke-width="3" stroke-linecap="round"/>
 <path d="M64 62Q72 66 74 72" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M64 62Q72 66 74 72" fill="none" stroke="#efe6dc" stroke-width="3" stroke-linecap="round"/>
 <path d="M74 72L76 82" stroke="#e8dcd0" stroke-width=".6" stroke-dasharray="1.4 1.2"/><g transform="translate(77 86)"><circle r="3" fill="#efe6dc" ${s}/></g>
 <g><animateTransform attributeName="transform" type="rotate" values="-6 50 54;5 50 54;-6 50 54" dur="4.6s" repeatCount="indefinite"/>
 <path d="M28 30Q22 20 30 14Q26 26 36 26Z" fill="#2a1a24" ${s}/><path d="M72 30Q78 20 70 14Q74 26 64 26Z" fill="#2a1a24" ${s}/>
 <path d="M24 34Q18 46 26 52Q24 42 30 38Z" fill="#2a1a24" ${s}/><path d="M76 34Q82 46 74 52Q76 42 70 38Z" fill="#2a1a24" ${s}/>
 <ellipse cx="50" cy="36" rx="22" ry="20" fill="url(#${q}f)" ${s}/>
 <path d="M30 26Q50 6 70 26Q62 18 50 18Q38 18 30 26Z" fill="#2a1a24" ${s}/>
 <path d="M28 22L22 16L28 14L30 18Z M72 22L78 16L72 14L70 18Z" fill="#a8223a" ${s}/>
 ${[[42,35],[58,35]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="5" fill="#140c22" ${s}/><circle cx="${x-1.6}" cy="${y-1.6}" r=".9" fill="#5a4a6a"/><circle cx="${x+1.6}" cy="${y-1.6}" r=".9" fill="#5a4a6a"/><circle cx="${x-1.6}" cy="${y+1.6}" r=".9" fill="#5a4a6a"/><circle cx="${x+1.6}" cy="${y+1.6}" r=".9" fill="#5a4a6a"/><path d="M${x-2.4} ${y-2.4}L${x+2.4} ${y+2.4}M${x+2.4} ${y-2.4}L${x-2.4} ${y+2.4}" stroke="#a8223a" stroke-width=".9"/>`).join('')}
 <circle cx="58" cy="35" r="7" fill="#ff2a4a" opacity="0">${A('0;0;.35;0',5,1)}</circle>
 <ellipse cx="38" cy="45" rx="4" ry="2.2" fill="#e88a9a" opacity=".45"/><ellipse cx="62" cy="45" rx="4" ry="2.2" fill="#e88a9a" opacity=".45"/>
 <path d="M42 47Q50 52 58 47" fill="none" stroke="#a8223a" stroke-width="1.3"/>${[44,47,50,53,56].map(x=>`<path d="M${x} ${46.6+Math.abs(x-50)*-.06}v3" stroke="#a8223a" stroke-width=".9"/>`).join('')}
 <path d="M47 17L49 24L45 29L48 33L44 39" fill="none" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/><path d="M45 29L40 30" fill="none" stroke="${O}" stroke-width=".9"/>
 </g></g>`};

/* ---------- Croque-Mitaine ---------- */
MONS['Croque-Mitaine']=()=>{const q='cm'+(CID++),s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`;
 return`<defs><radialGradient id="${q}g" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#5a2a8a" stop-opacity=".55"/><stop offset="1" stop-color="#5a2a8a" stop-opacity="0"/></radialGradient><linearGradient id="${q}b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1640"/><stop offset="1" stop-color="#0a0612"/></linearGradient></defs>
 <circle cx="50" cy="46" r="46" fill="url(#${q}g)"/>
 <path d="M24 98Q18 62 30 44Q38 30 50 30Q62 30 70 44Q82 62 76 98Z" fill="url(#${q}b)" ${s}/>
 ${[30,40,50,60,70].map((x,i)=>`<path d="M${x-5} 98Q${x} ${88-i%2*4} ${x+5} 98" fill="#0a0612" ${s}/>`).join('')}
 <g><animateTransform attributeName="transform" type="rotate" values="0 32 58;-6 32 58;0 32 58" dur="2.6s" repeatCount="indefinite"/>
 <path d="M32 56Q14 58 8 72" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M32 56Q14 58 8 72" fill="none" stroke="#2a1640" stroke-width="3" stroke-linecap="round"/>
 ${[[8,72,-30],[8,72,-5],[8,72,20],[8,72,45]].map(([x,y,a])=>`<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}Q${x-3} ${y+8} ${x-1} ${y+16}" fill="none" stroke="#d8d0e0" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>
 <g><animateTransform attributeName="transform" type="rotate" values="0 68 58;6 68 58;0 68 58" dur="2.9s" repeatCount="indefinite"/>
 <path d="M68 56Q86 58 92 72" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M68 56Q86 58 92 72" fill="none" stroke="#2a1640" stroke-width="3" stroke-linecap="round"/>
 ${[[92,72,30],[92,72,5],[92,72,-20],[92,72,-45]].map(([x,y,a])=>`<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}Q${x+3} ${y+8} ${x+1} ${y+16}" fill="none" stroke="#d8d0e0" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>
 <path d="M32 26L36 6Q50 2 62 6L68 26Z" fill="#160c22" ${s} transform="rotate(-8 50 16)"/><path d="M28 27Q50 22 72 27L70 31Q50 27 30 31Z" fill="#160c22" ${s} transform="rotate(-8 50 28)"/><path d="M34 22Q50 18 66 22" fill="none" stroke="#6a2a4a" stroke-width="2.2" transform="rotate(-8 50 20)"/>
 <ellipse cx="41" cy="40" rx="5" ry="3.4" fill="#ffd84a"/><ellipse cx="59" cy="40" rx="5" ry="3.4" fill="#ffd84a"/><ellipse cx="41" cy="40" rx="1.4" ry="3" fill="#140c22"/><ellipse cx="59" cy="40" rx="1.4" ry="3" fill="#140c22"/>
 <ellipse cx="50" cy="40" rx="14" ry="4" fill="#ffd84a" opacity="0">${A('0;0;0;.3;0',4)}</ellipse>
 <rect x="34" y="36" width="32" height="8" fill="#2a1640" opacity="0"><animate attributeName="opacity" values="0;0;0;0;0;0;0;0;1;0" dur="4.4s" repeatCount="indefinite"/></rect>
 <path d="M32 48Q50 64 68 48Q62 58 50 59Q38 58 32 48Z" fill="#f4ecf8" ${s}/>${[36,40,44,48,52,56,60,64].map((x,i)=>`<path d="M${x} ${49+Math.abs(x-50)*-.08+ (i%2?1:0)}L${x+2} ${53+ (x>44&&x<56?3:1)}L${x+4} ${49+Math.abs(x-48)*-.08}" fill="none" stroke="${O}" stroke-width=".9"/>`).join('')}
 ${[[16,24],[84,20],[20,90],[82,92]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${1.2+i%2*.6}" fill="#c8a8ff">${A('.2;1;.2',(2+i*.5).toFixed(1))}</circle>`).join('')}`};

/* ---------- Horloge Hurlante ---------- */
MONS['Horloge Hurlante']=()=>{const q='hh'+(CID++),s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`;
 return`<defs><linearGradient id="${q}w" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#4a2a1a"/><stop offset=".5" stop-color="#7a4a2a"/><stop offset="1" stop-color="#3a1e12"/></linearGradient><radialGradient id="${q}d" cx="50%" cy="45%" r="60%"><stop offset="0" stop-color="#f4ecd8"/><stop offset="1" stop-color="#c8b898"/></radialGradient></defs>
 <ellipse cx="50" cy="96" rx="20" ry="3" fill="#000" opacity=".3"/>
 <g><animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0;0 0" dur="1.4s" repeatCount="indefinite"/>
 <path d="M30 20Q30 6 50 4Q70 6 70 20V92H30Z" fill="url(#${q}w)" ${s}/><path d="M30 20Q50 10 70 20" fill="none" stroke="#c8a060" stroke-width="1.6"/>
 <rect x="38" y="52" width="24" height="34" rx="3" fill="#1a0e08" ${s}/>
 <g><animateTransform attributeName="transform" type="rotate" values="-22 50 52;22 50 52;-22 50 52" dur="1.4s" repeatCount="indefinite"/><path d="M50 52V76" stroke="#c8a060" stroke-width="1.6"/><circle cx="50" cy="79" r="5" fill="#e0b860" ${s}/><circle cx="48.6" cy="77.6" r="1.4" fill="#fff6d0"/></g>
 <circle cx="50" cy="30" r="16" fill="url(#${q}d)" ${s}/>
 ${[...Array(12)].map((_,i)=>{const a=i*Math.PI/6;return`<path d="M${(50+Math.sin(a)*13.2).toFixed(1)} ${(30-Math.cos(a)*13.2).toFixed(1)}L${(50+Math.sin(a)*15).toFixed(1)} ${(30-Math.cos(a)*15).toFixed(1)}" stroke="${O}" stroke-width="${i%3?1:1.8}"/>`}).join('')}
 <ellipse cx="44" cy="26" rx="3.4" ry="4" fill="#140c22"/><ellipse cx="56" cy="26" rx="3.4" ry="4" fill="#140c22"/><circle cx="44" cy="26.6" r="1.2" fill="#ff2a4a"/><circle cx="56" cy="26.6" r="1.2" fill="#ff2a4a"/>
 <path d="M39 20L47 23M61 20L53 23" stroke="${O}" stroke-width="1.8" stroke-linecap="round"/>
 <ellipse cx="50" cy="37" rx="5" ry="6" fill="#2a0a12" ${s}><animate attributeName="ry" values="5;7;5" dur="1.4s" repeatCount="indefinite"/></ellipse><path d="M47 34L48 36L49 34M51 34L52 36L53 34" stroke="#f4ecd8" stroke-width=".7" fill="none"/>
 <path d="M50 30L50 18" stroke="${O}" stroke-width="1.8" stroke-linecap="round"><animateTransform attributeName="transform" type="rotate" from="0 50 30" to="360 50 30" dur="2s" repeatCount="indefinite"/></path><circle cx="50" cy="30" r="1.6" fill="${O}"/>
 <path d="M58 44L62 50L59 56" fill="none" stroke="${O}" stroke-width="1.1"/><path d="M34 60L37 66" stroke="${O}" stroke-width="1.1"/></g>
 ${[[14,30,1],[86,44,-1],[18,70,1]].map(([x,y,d],i)=>`<path d="M${x} ${y}q${d*4} -3 ${d*6} -9" fill="none" stroke="#f4ecd8" stroke-width="1.4" stroke-linecap="round" opacity=".7">${A('0;.9;0',1.4,i*.3)}</path>`).join('')}
 ${[[12,14,6],[88,84,7]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="#a07a3a" stroke-width="3" stroke-dasharray="2.6 2"><animateTransform attributeName="transform" type="rotate" from="0 ${x} ${y}" to="360 ${x} ${y}" dur="6s" repeatCount="indefinite"/></circle>`).join('')}`};

/* ---------- Masque Rieur ---------- */
MONS['Masque Rieur']=()=>{const q='mr'+(CID++),s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`;
 return`<defs><radialGradient id="${q}m" cx="40%" cy="35%" r="70%"><stop offset="0" stop-color="#ffffff"/><stop offset="1" stop-color="#d4ccd8"/></radialGradient></defs>
 <ellipse cx="50" cy="95" rx="18" ry="3" fill="#000" opacity=".28"/>
 <g><animateTransform attributeName="transform" type="rotate" values="-8 50 50;8 50 50;-8 50 50" dur="3s" repeatCount="indefinite"/>
 <path d="M30 60Q16 74 22 92Q28 80 34 72Z" fill="#a8223a" ${s}/><path d="M70 60Q84 74 78 92Q72 80 66 72Z" fill="#1a0a1e" ${s}/>
 <path d="M36 66Q30 80 40 90Q38 80 42 72Z" fill="#1a0a1e" ${s}/><path d="M64 66Q70 80 60 90Q62 80 58 72Z" fill="#a8223a" ${s}/>
 <circle cx="22" cy="92" r="2.6" fill="#ffd84a" ${s}/><circle cx="78" cy="92" r="2.6" fill="#ffd84a" ${s}/>
 <path d="M18 36Q18 12 50 10Q82 12 82 36Q82 62 50 74Q18 62 18 36Z" fill="url(#${q}m)" ${s}/>
 <path d="M22 30Q50 4 78 30" fill="none" stroke="#e0b84a" stroke-width="2.2"/><path d="M50 10V16" stroke="#e0b84a" stroke-width="2"/><circle cx="50" cy="18" r="2.4" fill="#ff2a4a" ${s}/>
 <path d="M28 34Q35 25 42 34Q35 31 28 34Z" fill="#0a0612" ${s}/><path d="M58 34Q65 25 72 34Q65 31 58 34Z" fill="#0a0612" ${s}/>
 <circle cx="35" cy="32" r="1.3" fill="#ff2a4a">${A('.2;1;.2',1.6)}</circle><circle cx="65" cy="32" r="1.3" fill="#ff2a4a">${A('.2;1;.2',1.6)}</circle>
 <path d="M28 46Q50 72 72 46Q66 54 50 56Q34 54 28 46Z" fill="#0a0612" ${s}/>${[34,40,46,52,58,64].map(x=>`<path d="M${x} ${48+Math.abs(x-50)*-.12+3}l2.4 3.6l2.4 -3.4" fill="#f4ecf8" stroke="${O}" stroke-width=".6"/>`).join('')}
 <path d="M30 42Q34 44 36 48M70 42Q66 44 64 48" fill="none" stroke="#c8a8b8" stroke-width="1.2"/>
 <path d="M60 14L56 24L62 30L57 40" fill="none" stroke="${O}" stroke-width="1.3" stroke-linejoin="round"/>
 <ellipse cx="26" cy="44" rx="3.6" ry="2" fill="#ff8aa8" opacity=".5"/><ellipse cx="74" cy="44" rx="3.6" ry="2" fill="#ff8aa8" opacity=".5"/></g>
 ${[[12,18],[88,16],[90,60],[10,58]].map(([x,y],i)=>`<text x="${x}" y="${y}" font-size="7" font-family="serif" fill="#e8d8ff" text-anchor="middle" opacity=".8">${['ha','HA','hi','ha'][i]}${A('0;.9;0',(1.8+i*.4).toFixed(1),(i*.5).toFixed(1))}</text>`).join('')}`};

/* ---------- Somnar, le Dévoreur de Rêves ---------- */
MONS['Somnar, le Dévoreur de Rêves']=()=>{const q='so'+(CID++),s=`stroke="${O}" stroke-width="1.5" stroke-linejoin="round"`;
 const stars=[[30,62],[38,74],[46,58],[56,70],[64,80],[36,88],[60,92],[44,84],[70,64],[28,78]].map(([x,y],i)=>`<circle cx="${x}" cy="${y}" r="${(.7+i%3*.35).toFixed(2)}" fill="#fff">${A('.3;1;.3',(1.6+i%4*.5).toFixed(1))}</circle>`).join('');
 return`<defs><linearGradient id="${q}c" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a5a"/><stop offset=".6" stop-color="#140a34"/><stop offset="1" stop-color="#06040e"/></linearGradient>
  <radialGradient id="${q}m" cx="35%" cy="40%" r="70%"><stop offset="0" stop-color="#fffbe8"/><stop offset="1" stop-color="#d8cca0"/></radialGradient>
  <radialGradient id="${q}a"><stop offset="0" stop-color="#7a5aff" stop-opacity=".55"/><stop offset="1" stop-color="#7a5aff" stop-opacity="0"/></radialGradient>
  <radialGradient id="${q}d" cx="40%" cy="35%" r="65%"><stop offset="0" stop-color="#ffffff" stop-opacity=".95"/><stop offset=".6" stop-color="#bfe8ff" stop-opacity=".55"/><stop offset="1" stop-color="#8ab8ff" stop-opacity=".25"/></radialGradient></defs>
 <circle cx="50" cy="50" r="50" fill="url(#${q}a)"/>
 <path d="M16 100Q12 60 26 42Q36 28 50 26Q66 28 76 44Q90 64 86 100Z" fill="url(#${q}c)" ${s}/>${stars}
 <path d="M20 100Q26 90 32 100Q38 90 44 100Q50 90 56 100Q62 90 68 100Q74 90 80 100" fill="#06040e"/>
 <path d="M26 44Q18 20 36 8Q34 22 44 28Z" fill="url(#${q}c)" ${s}/><circle cx="36" cy="8" r="3.6" fill="#ffd84a" ${s}><animate attributeName="r" values="3.2;4.2;3.2" dur="2.4s" repeatCount="indefinite"/></circle>
 <g><animateTransform attributeName="transform" type="rotate" values="-3 54 40;3 54 40;-3 54 40" dur="4s" repeatCount="indefinite"/>
 <path d="M42 18Q70 14 76 40Q74 64 50 66Q66 56 66 40Q64 24 42 18Z" fill="url(#${q}m)" ${s}/>
 <path d="M66 40Q64 24 42 18Q56 28 56 42Q56 54 50 66Q66 56 66 40Z" fill="#c8bc90" opacity=".35"/>
 <ellipse cx="62" cy="32" rx="3.4" ry="4.2" fill="#140c22"/><circle cx="62.6" cy="31" r="1.4" fill="#ff3a5a">${A('.4;1;.4',1.8)}</circle>
 <path d="M54 46Q60 52 66 46" fill="none" stroke="${O}" stroke-width="1.6"/>${[55,58,61,64].map((x,i)=>`<path d="M${x} ${46.6+(i%2?.8:0)}l1.4 3l1.4 -3" fill="#fff" stroke="${O}" stroke-width=".6"/>`).join('')}</g>
 <path d="M76 66Q90 58 92 46" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M76 66Q90 58 92 46" fill="none" stroke="#2a1a5a" stroke-width="3" stroke-linecap="round"/>
 ${[[92,46,-60],[92,46,-30],[92,46,0]].map(([x,y,a])=>`<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}Q${x+2} ${y-6} ${x} ${y-11}" fill="none" stroke="#d8d0f0" stroke-width="1.5" stroke-linecap="round"/>`).join('')}
 <g><animateTransform attributeName="transform" type="translate" values="0 0;-1.5 -2;0 0" dur="3s" repeatCount="indefinite"/><circle cx="86" cy="30" r="9" fill="url(#${q}d)" stroke="#e8f6ff" stroke-width="1"/><path d="M82 32Q86 26 90 32Q86 30 82 32Z" fill="#7a5aff"/><circle cx="83" cy="27" r="1.6" fill="#fff"/></g>
 ${[[72,16,3],[80,8,2],[64,10,2.4]].map(([x,y,r],i)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="url(#${q}d)" stroke="#e8f6ff" stroke-width=".6"><animate attributeName="cy" values="${y};${y+4};${y}" dur="${(2.6+i*.6).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('')}
 <path d="M24 66Q12 70 8 82" fill="none" stroke="${O}" stroke-width="5" stroke-linecap="round"/><path d="M24 66Q12 70 8 82" fill="none" stroke="#2a1a5a" stroke-width="3" stroke-linecap="round"/>
 ${[[8,82,20],[8,82,-10],[8,82,45]].map(([x,y,a])=>`<path transform="rotate(${a} ${x} ${y})" d="M${x} ${y}Q${x-2} ${y+6} ${x} ${y+11}" fill="none" stroke="#d8d0f0" stroke-width="1.5" stroke-linecap="round"/>`).join('')}`};
}catch(e){console.warn('cauchemar art',e)}})();

/* ---------- les 10 décors du mode Cauchemar (600×600, comme les autres décors de combat) ---------- */
(function(){try{
const SC={};let SID=0;
const f1=v=>(+v).toFixed(1);
const lg=(id,st,v)=>`<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="${v?1:0}">${st.map(([o,c,a])=>`<stop offset="${o}" stop-color="${c}"${a!=null?` stop-opacity="${a}"`:''}/>`).join('')}</linearGradient>`;
const rg=(id,c,a=.9,cx=.5,cy=.5)=>`<radialGradient id="${id}" cx="${cx}" cy="${cy}" r=".5"><stop offset="0" stop-color="${c}" stop-opacity="${a}"/><stop offset=".45" stop-color="${c}" stop-opacity="${(a*.35).toFixed(2)}"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient>`;
const rnd=s=>()=>{s=(s*16807)%2147483647;return(s-1)/2147483646};
const stars=(R,n,y0,y1,c='#fff')=>{let o='';for(let i=0;i<n;i++)o+=`<circle cx="${f1(R()*600)}" cy="${f1(y0+R()*(y1-y0))}" r="${f1(.6+R()*1.6)}" fill="${c}" opacity="${(.3+R()*.6).toFixed(2)}"/>`;return o};
const blink=(d,b)=>`<animate attributeName="opacity" values="1;1;.05;1;1" keyTimes="0;.86;.9;.94;1" dur="${d}s" begin="${b||0}s" repeatCount="indefinite"/>`;
const eyes=(x,y,s,c='#ff2a4a',d=4,b=0)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle r="16" fill="${c}" opacity=".16"/><path d="M-11 0Q-7 -4 -3 0Q-7 3 -11 0ZM3 0Q7 -4 11 0Q7 3 3 0Z" fill="${c}">${blink(d,b)}</path></g>`;
const fog=(R,y,c,n=5,op=.12)=>{let o='';for(let i=0;i<n;i++)o+=`<ellipse cx="${f1(R()*600)}" cy="${f1(y+R()*40)}" rx="${f1(120+R()*140)}" ry="${f1(14+R()*14)}" fill="${c}" opacity="${op}"/>`;return o};
const tree=(x,y,h,s,c)=>`<path d="M${x-10*s} ${y}C${x-6*s} ${y-h*.4} ${x-16*s} ${y-h*.7} ${x-4*s} ${y-h}L${x+3*s} ${y-h}C${x-4*s} ${y-h*.7} ${x+9*s} ${y-h*.4} ${x+10*s} ${y}Z" fill="${c}"/><path d="M${x-6*s} ${y-h*.55}Q${x-34*s} ${y-h*.7} ${x-52*s} ${y-h*.62}M${x-38*s} ${y-h*.68}Q${x-46*s} ${y-h*.82} ${x-40*s} ${y-h*.92}M${x+1*s} ${y-h*.78}Q${x+28*s} ${y-h*.94} ${x+46*s} ${y-h*1.04}M${x+30*s} ${y-h*.95}Q${x+44*s} ${y-h*.9} ${x+52*s} ${y-h*.8}M${x-2*s} ${y-h*.98}Q${x-12*s} ${y-h*1.12} ${x-6*s} ${y-h*1.22}" fill="none" stroke="${c}" stroke-width="${f1(5*s)}" stroke-linecap="round"/>`;
const gear=(cx,cy,r,n,t,c,op=1)=>{let d='';const N=n*4;for(let i=0;i<N;i++){const a=i/N*Math.PI*2,rr=(i%4<2)?r+t:r;d+=(i?'L':'M')+f1(cx+rr*Math.cos(a))+' '+f1(cy+rr*Math.sin(a))}return`<path d="${d}Z" fill="${c}" opacity="${op}"/><circle cx="${cx}" cy="${cy}" r="${f1(r*.42)}" fill="#0c0604" opacity="${op}"/>`};
const spin=(cx,cy,d,rev)=>`<animateTransform attributeName="transform" type="rotate" from="${rev?360:0} ${cx} ${cy}" to="${rev?0:360} ${cx} ${cy}" dur="${d}s" repeatCount="indefinite"/>`;
const B={
/* 1 · La Chambre Sans Fin */
1:q=>{const R=rnd(11);let d=lg(q+'w',[[0,'#140a26'],[.55,'#2a1646'],[1,'#0c0616']],1)+rg(q+'m','#cbb8ff',.8)+rg(q+'v','#000',1);
 let s=`<rect width="600" height="600" fill="url(#${q}w)"/>`;for(let i=0;i<15;i++)s+=`<rect x="${i*42}" y="0" width="14" height="430" fill="#3a2260" opacity=".2"/>`;
 for(let i=0;i<15;i++)for(let j=0;j<5;j++)s+=`<path d="M${i*42+28} ${40+j*80}l5 7l-5 7l-5 -7z" fill="#4a2a78" opacity=".35"/>`;
 s+=`<g transform="translate(46 140)"><circle cx="64" cy="76" r="130" fill="url(#${q}m)"/><path d="M0 160V64Q0 0 64 0Q128 0 128 64V160Z" fill="#0a0a26"/>${stars(R,10,10,150).replace(/cx="(\d+(\.\d)?)"/g,(m,x)=>`cx="${f1(8+(+x)/600*112)}"`)}<circle cx="84" cy="52" r="24" fill="#efe6ff"/><circle cx="95" cy="45" r="21" fill="#0a0a26"/><path d="M0 160V64Q0 0 64 0Q128 0 128 64V160ZM64 0V160M0 86H128" fill="none" stroke="#4a3070" stroke-width="7"/></g>`;
 const fy=[430,418,408,400,394,390];
 for(let i=0;i<6;i++){const k=1-i*.16,w=220*k,h=300*k,x=300-w/2,y=fy[i]-h;s+=`<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${i===5?'#05020a':'#1a0e30'}" stroke="#6a4a9a" stroke-opacity="${(.85-i*.12).toFixed(2)}" stroke-width="${f1(9*k)}"/>`}
 s+=`<rect x="262" y="300" width="76" height="90" fill="url(#${q}v)" opacity=".9"/>`+eyes(300,336,.9,'#ff3a5a',5);
 s+=`<path d="M0 600V430H600V600Z" fill="#120a20"/>`;for(let i=-7;i<=7;i++)s+=`<path d="M${300+i*16} 430L${300+i*120} 600" stroke="#2c1a48" stroke-width="2"/>`;for(const y of [446,468,498,540,596])s+=`<path d="M0 ${y}H600" stroke="#2c1a48" stroke-width="2"/>`;
 s+=`<g fill="#07040e"><path d="M408 520V452Q408 432 428 432H560Q584 432 590 452L600 470V520Z"/><rect x="416" y="410" width="12" height="112" rx="5"/><rect x="420" y="470" width="180" height="20" fill="#1c1032"/><path d="M432 470Q446 444 478 452Q500 458 500 470Z" fill="#2a1a44"/></g>`;
 s+=`<g fill="#07040e" transform="translate(80 470)"><path d="M-46 52Q0 70 46 52" fill="none" stroke="#07040e" stroke-width="7" stroke-linecap="round"/><path d="M-22 50L-18 12M22 50L18 12" stroke="#07040e" stroke-width="6"/><path d="M-30 14Q-26 -8 0 -6Q14 -6 22 2L40 -4L36 10Q30 18 22 14L-30 18Z"/><path d="M30 -2L40 -26L46 -4Z"/><circle cx="34" cy="-2" r="2" fill="#ff3a5a"/></g>`;
 s+=fog(R,520,'#8a6aff',4,.07);return{d,s}},
/* 2 · Le Bois des Murmures */
2:q=>{const R=rnd(22);let d=lg(q+'k',[[0,'#04120e'],[.55,'#0e2a22'],[1,'#06100c']],1)+rg(q+'m','#d8ffe8',.75);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/>`+stars(R,22,0,220,'#d8ffe8')+`<circle cx="430" cy="150" r="140" fill="url(#${q}m)"/><circle cx="430" cy="150" r="42" fill="#e8fff2"/><circle cx="416" cy="140" r="7" fill="#c8e8d8" opacity=".6"/><circle cx="444" cy="166" r="5" fill="#c8e8d8" opacity=".5"/>`;
 s+=`<path d="M0 420Q150 380 300 400T600 380V600H0Z" fill="#0a1e18"/>`;
 for(const [x,h,sc] of [[60,330,1.3],[180,260,1],[420,280,1.05],[540,340,1.35]])s+=tree(x,440,h,sc,'#061410');
 for(const [x,h,sc] of [[120,200,.8],[300,230,.9],[480,190,.75]])s+=tree(x,430,h,sc,'#0c2620');
 s+=`<g fill="#ccff6a">${[[60,250],[540,240],[180,300]].map(([x,y],i)=>`<g transform="translate(${x} ${y})"><path d="M-9 0Q-6 -4 -2 0Q-6 3 -9 0ZM2 0Q6 -4 9 0Q6 3 2 0Z">${blink(4+i,i)}</path><path d="M-7 14Q0 24 7 14Q0 18 -7 14Z" fill="#020604"/></g>`).join('')}</g>`;
 s+=`<path d="M0 600V470Q150 440 300 462T600 450V600Z" fill="#030a08"/>`+fog(R,400,'#bfffe0',6,.09)+fog(R,470,'#bfffe0',5,.08);return{d,s}},
/* 3 · Le Carnaval Brisé */
3:q=>{const R=rnd(33);let d=lg(q+'k',[[0,'#16040e'],[.6,'#3a0a26'],[1,'#10040a']],1)+rg(q+'g','#ff6a9a',.55);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/>`+stars(R,30,0,260)+`<path d="M470 70A40 40 0 1 0 500 140A32 32 0 1 1 470 70Z" fill="#ffe8f0"/>`;
 s+=`<g transform="translate(110 300)" fill="none" stroke="#2a0818" stroke-width="5"><circle r="110"/><circle r="12" fill="#2a0818"/>${[...Array(12)].map((_,i)=>{const a=i*30*Math.PI/180;return i===4||i===5?'':`<path d="M0 0L${f1(110*Math.cos(a))} ${f1(110*Math.sin(a))}"/><rect x="${f1(110*Math.cos(a)-9)}" y="${f1(110*Math.sin(a))}" width="18" height="14" fill="#2a0818"/>`}).join('')}<path d="M-40 230L0 0L40 230"/></g>`;
 s+=`<circle cx="330" cy="330" r="240" fill="url(#${q}g)"/>`;
 let tent='';for(let i=0;i<10;i++){const x0=190+i*30,x1=x0+30;tent+=`<path d="M330 150L${x0} 300L${x1} 300Z" fill="${i%2?'#e8d8c8':'#a8142e'}" opacity="${i%2?.55:.85}"/>`}
 s+=tent+`<path d="M190 300Q215 318 240 300Q265 318 290 300Q315 318 340 300Q365 318 390 300Q415 318 440 300Q465 318 490 300" fill="#6a0a1e"/><rect x="200" y="300" width="260" height="140" fill="#3a0814"/><path d="M300 440V330Q330 300 360 330V440Z" fill="#0a0206"/>${eyes(330,370,.8,'#ffd84a',3.6)}<path d="M330 150V112" stroke="#2a0818" stroke-width="4"/><path d="M330 112L364 120L342 130L360 140L330 134Z" fill="#a8142e"/>`;
 s+=`<path d="M0 150Q150 230 300 160T600 170" fill="none" stroke="#2a0818" stroke-width="2"/>`;for(let i=0;i<14;i++){const t=i/13,x=t*600,y=150+(t<.5?Math.sin(t*2*Math.PI)*45:-Math.sin((t-.5)*2*Math.PI)*-8)+((t<.5)?20:0);s+=`<circle cx="${f1(x)}" cy="${f1(165+Math.sin(t*6.28)*30)}" r="5" fill="${['#ffd84a','#ff5a8a','#8affd8','#c08aff'][i%4]}" opacity=".85">${i%3===0?`<animate attributeName="opacity" values=".9;.2;.9" dur="${1.4+i%4*.3}s" repeatCount="indefinite"/>`:''}</circle>`}
 s+=`<path d="M0 600V440H600V600Z" fill="#14040c"/>`;for(let i=0;i<18;i++)s+=`<rect x="${f1(R()*600)}" y="${f1(450+R()*140)}" width="10" height="6" transform="rotate(${f1(R()*90)})" fill="${['#ffd84a','#ff5a8a','#c08aff'][i%3]}" opacity=".5"/>`;return{d,s}},
/* 4 · L'Horlogerie Folle */
4:q=>{const R=rnd(44);let d=lg(q+'k',[[0,'#120802'],[.55,'#2e1a08'],[1,'#0c0602']],1)+rg(q+'g','#ffb84a',.5)+`<radialGradient id="${q}f" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#e8dcc0"/><stop offset=".85" stop-color="#b8a07a"/><stop offset="1" stop-color="#6a4a24"/></radialGradient>`;
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/><circle cx="300" cy="270" r="260" fill="url(#${q}g)"/>`;
 s+=`<g>${spin(90,140,40)}${gear(90,140,70,10,16,'#3a2410')}</g><g>${spin(520,120,30,1)}${gear(520,120,54,8,14,'#3a2410')}</g><g>${spin(540,330,50)}${gear(540,330,80,12,16,'#2a1a0a')}</g><g>${spin(60,360,36,1)}${gear(60,360,56,9,14,'#2a1a0a')}</g>`;
 s+=`<circle cx="300" cy="260" r="150" fill="#5a3a14"/><circle cx="300" cy="260" r="136" fill="url(#${q}f)"/>`;
 for(let i=0;i<60;i++){const a=i*6*Math.PI/180,r0=i%5?126:116;s+=`<path d="M${f1(300+r0*Math.sin(a))} ${f1(260-r0*Math.cos(a))}L${f1(300+130*Math.sin(a))} ${f1(260-130*Math.cos(a))}" stroke="#3a2410" stroke-width="${i%5?2:5}"/>`}
 s+=`<g stroke="#2a1608" stroke-linecap="round"><path d="M300 260L300 160" stroke-width="7"><animateTransform attributeName="transform" type="rotate" values="0 300 260;-30 300 260;10 300 260;0 300 260" dur="2.4s" repeatCount="indefinite"/></path><path d="M300 260L376 300" stroke-width="5">${spin(300,260,6,1)}</path></g><circle cx="300" cy="260" r="9" fill="#2a1608"/>`;
 s+=`<path d="M232 190L262 226L248 250L286 284M352 330L330 306L346 290" fill="none" stroke="#fff" stroke-width="1.6" opacity=".55"/>`;
 s+=`<g><animateTransform attributeName="transform" type="rotate" values="-18 300 412;18 300 412;-18 300 412" dur="2.8s" repeatCount="indefinite"/><path d="M300 412V540" stroke="#3a2410" stroke-width="5"/><circle cx="300" cy="548" r="22" fill="#a87a2a" stroke="#3a2410" stroke-width="4"/></g><rect x="250" y="400" width="100" height="18" rx="6" fill="#3a2410"/>`;
 s+=`<path d="M0 600V560H600V600Z" fill="#0c0602"/>`;return{d,s}},
/* 5 · Le Lac des Reflets */
5:q=>{const R=rnd(55);let d=lg(q+'k',[[0,'#020a16'],[1,'#0e2a3e']],1)+lg(q+'w',[[0,'#0c2a3c'],[1,'#02060c']],1)+rg(q+'m','#bfe8ff',.75);
 let s=`<rect width="600" height="340" fill="url(#${q}k)"/>`+stars(R,40,0,300,'#dff4ff');
 const tl=[[50,250,1.2],[150,200,.9],[470,230,1],[560,260,1.25]];s+=`<circle cx="300" cy="170" r="150" fill="url(#${q}m)"/><circle cx="300" cy="170" r="44" fill="#eaf8ff"/>`;
 s+=`<path d="M0 340V300Q100 270 200 296T400 288T600 292V340Z" fill="#06141e"/>`;for(const [x,h,k] of tl)s+=tree(x,340,h,k,'#040e16');
 s+=`<rect y="340" width="600" height="260" fill="url(#${q}w)"/><g opacity=".32" transform="matrix(1 0 0 -1 0 680)"><path d="M0 340V300Q100 270 200 296T400 288T600 292V340Z" fill="#06141e"/>${tl.map(([x,h,k])=>tree(x,340,h,k,'#040e16')).join('')}<circle cx="300" cy="170" r="44" fill="#eaf8ff"/></g>`;
 for(let i=0;i<12;i++){const y=360+i*20,w=40+i*14;s+=`<path d="M${300-w} ${y}H${300+w}" stroke="#bfe8ff" stroke-width="2" opacity="${(.4-i*.025).toFixed(2)}"><animate attributeName="opacity" values="${(.4-i*.025).toFixed(2)};.05;${(.4-i*.025).toFixed(2)}" dur="${(2.4+i*.2).toFixed(1)}s" repeatCount="indefinite"/></path>`}
 s+=`<path d="M0 340H600" stroke="#bfe8ff" stroke-width="1.5" opacity=".35"/>`+eyes(150,420,.8,'#7affe8',5)+eyes(470,452,.7,'#7affe8',6,2)+fog(R,320,'#bfe8ff',6,.08);return{d,s}},
/* 6 · Le Manoir des Pas Perdus */
6:q=>{const R=rnd(66);let d=lg(q+'k',[[0,'#14040a'],[.6,'#2e0c1a'],[1,'#0c0206']],1)+rg(q+'c','#ffc86a',.7);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/>`;for(let i=0;i<10;i++)s+=`<rect x="${i*64}" y="0" width="30" height="460" fill="#3a1222" opacity=".25"/>`;
 for(const [x,y,w,h] of [[40,150,90,120],[470,140,96,130],[150,110,64,84],[392,104,60,80]])s+=`<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#1a0610" stroke="#8a6a2a" stroke-width="6"/><circle cx="${x+w/2}" cy="${y+h*.42}" r="${w*.26}" fill="#3a1a24"/><path d="M${x+w*.2} ${y+h}Q${x+w/2} ${y+h*.55} ${x+w*.8} ${y+h}Z" fill="#3a1a24"/>${eyes(x+w/2,y+h*.42,w/110,'#ff4a5a',4+(x%3),x%2)}`;
 let st='';for(let i=0;i<9;i++){const y=600-i*28,w=380-i*30;st+=`<rect x="${300-w/2}" y="${y-28}" width="${w}" height="28" fill="${i%2?'#24081a':'#2e0c20'}"/>`}
 s+=st+`<path d="M110 600L245 348M490 600L355 348" stroke="#5a3a1a" stroke-width="8"/>${[...Array(8)].map((_,i)=>{const t=i/7;return`<path d="M${f1(110+135*t)} ${f1(600-252*t)}v-40M${f1(490-135*t)} ${f1(600-252*t)}v-40" stroke="#5a3a1a" stroke-width="4"/>`}).join('')}<path d="M110 560L245 308M490 560L355 308" stroke="#7a5a2a" stroke-width="5"/>`;
 s+=`<rect x="250" y="250" width="100" height="98" fill="#07020a"/>`+eyes(300,300,.7,'#ff4a5a',5,1);
 s+=`<circle cx="300" cy="120" r="140" fill="url(#${q}c)"/><path d="M300 0V70" stroke="#3a2410" stroke-width="3"/><path d="M220 96Q300 140 380 96M240 80Q300 112 360 80" fill="none" stroke="#8a6a2a" stroke-width="5"/>${[220,250,280,320,350,380].map((x,i)=>`<rect x="${x-3}" y="${i%5?84:90}" width="6" height="14" fill="#efe0c0"/><path d="M${x} ${i%5?84:90}q-4 -8 0 -14q4 6 0 14z" fill="#ffc84a"><animate attributeName="opacity" values="1;.6;1" dur="${(.5+i*.1).toFixed(1)}s" repeatCount="indefinite"/></path>`).join('')}`;return{d,s}},
/* 7 · Le Théâtre des Masques */
7:q=>{const R=rnd(77);let d=lg(q+'k',[[0,'#0a0206'],[1,'#1e0610']],1)+lg(q+'c',[[0,'#6a0a1a'],[.5,'#a8142e'],[1,'#4a0612']])+`<linearGradient id="${q}l" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff2c8" stop-opacity=".55"/><stop offset="1" stop-color="#fff2c8" stop-opacity="0"/></linearGradient>`;
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/><path d="M300 0L170 470H430Z" fill="url(#${q}l)"/><ellipse cx="300" cy="470" rx="140" ry="22" fill="#fff2c8" opacity=".2"/>`;
 s+=`<path d="M0 0H170Q150 120 168 260Q140 400 160 520H0Z" fill="url(#${q}c)"/><path d="M600 0H430Q450 120 432 260Q460 400 440 520H600Z" fill="url(#${q}c)"/>`;
 for(let i=0;i<6;i++)s+=`<path d="M${i*28+10} 0Q${i*28+20} 260 ${i*28+8} 520M${590-i*28} 0Q${580-i*28} 260 ${592-i*28} 520" stroke="#3a0410" stroke-width="3" fill="none" opacity=".6"/>`;
 s+=`<path d="M0 0H600V60Q540 90 480 60Q420 90 360 60Q300 90 240 60Q180 90 120 60Q60 90 0 60Z" fill="#8a0a22"/><path d="M0 60Q60 90 120 60Q180 90 240 60Q300 90 360 60Q420 90 480 60Q540 90 600 60" fill="none" stroke="#ffd84a" stroke-width="3"/>`;
 const mask=(x,y,sad)=>`<g transform="translate(${x} ${y})"><path d="M0 -60V-30" stroke="#2a0a10" stroke-width="2"/><path d="M-26 -30Q0 -40 26 -30Q30 0 0 30Q-30 0 -26 -30Z" fill="#efe6d8"/><path d="M-16 -16q6 ${sad?-6:6} 12 0M4 -16q6 ${sad?-6:6} 12 0" fill="none" stroke="#1a0a10" stroke-width="3" stroke-linecap="round"/><path d="${sad?'M-12 14Q0 2 12 14':'M-12 6Q0 20 12 6'}" fill="none" stroke="#1a0a10" stroke-width="3" stroke-linecap="round"/><animateTransform attributeName="transform" type="rotate" values="-6;6;-6" additive="sum" dur="${sad?3.4:2.8}s" repeatCount="indefinite"/></g>`;
 s+=mask(240,180,0)+mask(360,170,1);
 s+=`<path d="M0 520H600V600H0Z" fill="#0c0204"/>`;for(let r=0;r<3;r++)for(let i=0;i<14;i++)s+=`<circle cx="${i*46+(r%2)*23}" cy="${560+r*26}" r="20" fill="#05010a"/>`;
 s+=eyes(160,560,.7,'#ffd84a',4)+eyes(436,578,.6,'#ffd84a',5,1.5);return{d,s}},
/* 8 · La Forge des Peurs */
8:q=>{const R=rnd(88);let d=lg(q+'k',[[0,'#0e0202'],[.6,'#2a0806'],[1,'#140302']],1)+rg(q+'g','#ff4a12',.8)+lg(q+'f',[[0,'#2a0603'],[.45,'#a8260a'],[.8,'#ff7a1a'],[1,'#ffc84a']],1);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/><circle cx="300" cy="430" r="300" fill="url(#${q}g)"><animate attributeName="opacity" values=".75;1;.75" dur="2.2s" repeatCount="indefinite"/></circle>`;
 s+=`<path d="M150 470V260Q150 150 300 150Q450 150 450 260V470Z" fill="#1a0604"/><path d="M190 470V280Q190 200 300 200Q410 200 410 280V470Z" fill="url(#${q}f)"/>`;
 for(let i=0;i<7;i++){const x=205+i*32,h=60+((i*37)%5)*18;s+=`<path d="M${x-16} 470Q${x-14} ${470-h*.6} ${x} ${470-h}Q${x+14} ${470-h*.6} ${x+16} 470Z" fill="${i%2?'#ffd84a':'#ff8a2a'}" opacity=".75"><animateTransform attributeName="transform" type="scale" values="1 1;1 1.18;1 .9;1 1" additive="sum" dur="${(1.1+i%3*.3).toFixed(1)}s" repeatCount="indefinite"/></path>`}
 for(let i=0;i<9;i++)s+=`<rect x="${150+i*34}" y="${150-((i%2)*10)}" width="30" height="18" fill="#2a0a06" opacity=".9"/>`;
 const chain=(x,len,o)=>{let c='';for(let i=0;i<len;i++)c+=`<ellipse cx="${x}" cy="${i*22+8}" rx="${i%2?3:8}" ry="11" fill="none" stroke="#0a0202" stroke-width="5"/>`;return`<g opacity="${o}">${c}<animateTransform attributeName="transform" type="rotate" values="-3 ${x} 0;3 ${x} 0;-3 ${x} 0" dur="${3+len*.1}s" repeatCount="indefinite"/></g>`};
 s+=chain(60,12,1)+chain(110,8,.8)+chain(500,10,1)+chain(552,14,.9);
 s+=`<ellipse cx="300" cy="470" rx="150" ry="16" fill="#ffb03a" opacity=".35"/><path d="M200 520H400L380 490H440V470H160V490H220Z" fill="#0a0202"/><path d="M250 520L240 580H360L350 520Z" fill="#0a0202"/><path d="M430 470L470 400L480 406L444 474Z" fill="#0a0202"/><rect x="452" y="384" width="44" height="26" rx="4" transform="rotate(30 474 397)" fill="#0a0202"/>`;
 s+=`<path d="M0 600V540H600V600Z" fill="#070101"/>`+eyes(90,520,.8,'#ff3a1a',4.4)+eyes(520,540,.7,'#ff3a1a',5.2,1.6);return{d,s}},
/* 9 · Le Ciel Renversé */
9:q=>{const R=rnd(99);let d=lg(q+'k',[[0,'#6a5aff'],[.25,'#2a1a7a'],[.7,'#0a0628'],[1,'#03020c']],1)+rg(q+'m','#e8e0ff',.7);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/>`+stars(R,70,200,600,'#efe8ff');
 s+=`<g transform="matrix(1 0 0 -1 0 260)"><path d="M0 0V60Q80 30 150 70T300 50T450 80T600 40V0Z" fill="#140c3a"/>${[[60,60,.8],[200,70,.9],[400,74,.85],[540,52,.7]].map(([x,y,k])=>tree(x,y+60,120*k,k*.9,'#140c3a')).join('')}</g>`;
 s+=`<path d="M0 0H600V40Q520 70 440 50Q380 110 300 80Q220 120 150 70Q80 90 0 60Z" fill="#0c0628"/>`;
 for(let i=0;i<6;i++){const x=60+i*96;s+=`<path d="M${x} 70V${110+i%3*30}" stroke="#2a1a6a" stroke-width="3"/><path d="M${x-12} ${110+i%3*30}h24l-12 22z" fill="#2a1a6a"/>`}
 s+=`<circle cx="300" cy="470" r="180" fill="url(#${q}m)"/><circle cx="300" cy="470" r="70" fill="#efe8ff"/><circle cx="324" cy="452" r="62" fill="#0a0628"/>`;
 s+=`<g fill="#d8ccff" opacity=".8">${[[120,300],[460,330],[250,250]].map(([x,y],i)=>`<g transform="translate(${x} ${y}) rotate(180)"><path d="M-8 -14Q0 -20 8 -14L10 6Q0 12 -10 6Z"/><path d="M-10 -4L-22 4M10 -4L22 4" stroke="#d8ccff" stroke-width="3"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -8;0 0" additive="sum" dur="${3+i}s" repeatCount="indefinite"/></g>`).join('')}</g>`;return{d,s}},
/* 10 · Le Trône de Somnar */
10:q=>{const R=rnd(101);let d=`<radialGradient id="${q}k" cx=".5" cy=".4" r=".8"><stop offset="0" stop-color="#3a1a6a"/><stop offset=".5" stop-color="#140828"/><stop offset="1" stop-color="#030108"/></radialGradient>`+rg(q+'m','#c8b0ff',.7)+rg(q+'b','#9ad8ff',.8,.35,.35);
 let s=`<rect width="600" height="600" fill="url(#${q}k)"/>`+stars(R,40,0,600,'#e0d4ff');
 s+=`<g fill="none" stroke="#6a4aaa" opacity=".35">${[80,140,200,260].map((r,i)=>`<path d="M${300+r} 250A${r} ${r*.6} 0 1 1 ${300-r*.6} ${250+r*.5}" stroke-width="${4-i*.6}"/>`).join('')}${spin(300,250,60)}</g>`;
 s+=`<mask id="${q}cm"><rect width="600" height="600" fill="#000"/><circle cx="300" cy="200" r="118" fill="#fff"/><circle cx="352" cy="168" r="108" fill="#000"/></mask><circle cx="300" cy="200" r="200" fill="url(#${q}m)"/><circle cx="300" cy="200" r="118" fill="#efe6ff" mask="url(#${q}cm)"/>`;
 s+=`<path d="M220 480V240L240 200L254 250L270 170L286 236L300 140L314 236L330 170L346 250L360 200L380 240V480Z" fill="#0c0418"/><path d="M200 480V380H400V480Z" fill="#140828"/><path d="M230 380V330H370V380Z" fill="#1c0c34"/><circle cx="300" cy="200" r="6" fill="#ff2a5a"><animate attributeName="r" values="5;8;5" dur="2s" repeatCount="indefinite"/></circle>`;
 for(let i=0;i<5;i++)s+=`<rect x="${150-i*30}" y="${480+i*24}" width="${300+i*60}" height="24" fill="${i%2?'#100620':'#180a2e'}"/>`;
 for(const [x,y,r,dd] of [[90,150,26,5],[510,190,32,6],[140,330,18,4],[470,360,22,5.5],[60,420,14,4.5],[540,460,16,5]])s+=`<g><circle cx="${x}" cy="${y}" r="${r}" fill="url(#${q}b)" stroke="#e8f6ff" stroke-width="1.2" opacity=".85"/><path d="M${x-r*.5} ${y-r*.2}Q${x-r*.3} ${y-r*.6} ${x} ${y-r*.6}" stroke="#fff" stroke-width="2" fill="none" opacity=".8"/><animateTransform attributeName="transform" type="translate" values="0 0;0 -14;0 0" dur="${dd}s" repeatCount="indefinite"/></g>`;
 s+=eyes(300,250,1.1,'#ff2a5a',5);return{d,s}}};
window.RDEcmScene=function(w){if(SC[w])return SC[w];const f=B[w]||B[1];const q='cms'+w+'_'+(SID++);const o=f(q);return SC[w]=`<svg class="scsvg" viewBox="0 0 600 600" preserveAspectRatio="xMidYMid slice" aria-hidden="true"><defs>${o.d}</defs>${o.s}</svg>`};
}catch(e){console.warn('cauchemar décors',e)}})();
