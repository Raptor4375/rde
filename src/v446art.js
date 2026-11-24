/* ================= V446a : DESSINS DES FAMILIERS (viewBox 0 0 120 120, trait épais comme le reste du jeu) ================= */
window.RDEPETART=(function(){
const PO='#1d1233';
const PA={
 eye:(x,y,r,c)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${(r*1.14).toFixed(2)}" fill="${c||PO}"/><circle cx="${(x-r*.34).toFixed(2)}" cy="${(y-r*.42).toFixed(2)}" r="${(r*.4).toFixed(2)}" fill="#fff"/><circle cx="${(x+r*.36).toFixed(2)}" cy="${(y+r*.38).toFixed(2)}" r="${(r*.17).toFixed(2)}" fill="#fff" opacity=".85"/>`,
 smile:(x,y,w)=>`<path d="M${x-w} ${y}Q${x} ${y+w*.9} ${x+w} ${y}" fill="none" stroke="${PO}" stroke-width="2.4" stroke-linecap="round"/>`,
 blush:(x,y,s=1)=>`<ellipse cx="${x}" cy="${y}" rx="${6*s}" ry="${3.4*s}" fill="#ff6fa3" opacity=".5"/>`,
 spk:(x,y,s,c)=>`<path d="M${x} ${y-s}Q${x+s*.18} ${y-s*.18} ${x+s} ${y}Q${x+s*.18} ${y+s*.18} ${x} ${y+s}Q${x-s*.18} ${y+s*.18} ${x-s} ${y}Q${x-s*.18} ${y-s*.18} ${x} ${y-s}Z" fill="${c||'#fff'}"/>`,
 shadow:(w=30)=>`<ellipse cx="60" cy="110" rx="${w}" ry="5.5" fill="#000" opacity=".22"/>`,
 aura:(id,c)=>`<defs><radialGradient id="pa${id}"><stop offset="0" stop-color="${c}" stop-opacity=".75"/><stop offset=".55" stop-color="${c}" stop-opacity=".22"/><stop offset="1" stop-color="${c}" stop-opacity="0"/></radialGradient></defs><circle cx="60" cy="62" r="58" fill="url(#pa${id})"/>`,
 g:(st,inner)=>{const s=[.84,.93,1][st-1];return`<g transform="translate(60 112) scale(${s}) translate(-60 -112)">${inner}</g>`}
};
const S3=`stroke="${PO}" stroke-width="3" stroke-linejoin="round" stroke-linecap="round"`;
const S2=`stroke="${PO}" stroke-width="2.2" stroke-linejoin="round" stroke-linecap="round"`;

const PETART={
/* 🦎 Pépite, salamandre dorée */
pepite(st){const gold=st===3?'#ffd84a':'#ffcd3c',sh=st===3?'#f2a313':'#eea21c';
 let b='';
 if(st===3)b+=PA.aura('pe','#ffd84a')+[0,1,2,3,4,5,6,7].map(i=>{const a=i*Math.PI/4;return`<circle cx="${(60+Math.cos(a)*48).toFixed(1)}" cy="${(64+Math.sin(a)*44).toFixed(1)}" r="5" fill="#ffe27a" ${S2}/><circle cx="${(60+Math.cos(a)*48).toFixed(1)}" cy="${(64+Math.sin(a)*44).toFixed(1)}" r="2.2" fill="none" stroke="#c8820e" stroke-width="1.2"/>`}).join('');
 b+=PA.shadow(32);
 /* queue en spirale */
 b+=`<path d="M78 96Q104 98 104 78Q104 62 90 64Q80 66 84 76Q87 82 93 78" fill="none" stroke="${PO}" stroke-width="13" stroke-linecap="round"/><path d="M78 96Q104 98 104 78Q104 62 90 64Q80 66 84 76Q87 82 93 78" fill="none" stroke="${gold}" stroke-width="7.5" stroke-linecap="round"/>`;
 /* pattes */
 b+=[[40,104],[80,104]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="5.5" fill="${sh}" ${S2}/><path d="M${x-5} ${y-1}l0 3M${x} ${y-1}l0 3.5M${x+5} ${y-1}l0 3" stroke="${PO}" stroke-width="1.4" stroke-linecap="round"/>`).join('');
 /* corps */
 b+=`<ellipse cx="60" cy="86" rx="25" ry="20" fill="${gold}" ${S3}/><ellipse cx="60" cy="91" rx="15" ry="12" fill="#fff3b8"/>`;
 b+=`<path d="M36 84Q30 92 34 98" fill="none" ${S2}/><path d="M84 84Q90 92 86 98" fill="none" ${S2}/>`;
 /* tête */
 b+=`<ellipse cx="60" cy="52" rx="34" ry="27" fill="${gold}" ${S3}/><path d="M30 60Q60 82 90 60Q86 76 60 78Q34 76 30 60Z" fill="${sh}" opacity=".55"/>`;
 b+=[[44,34,4],[76,33,3.4],[60,30,2.6],[86,48,2.6],[34,48,2.8]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ff8a2a" opacity=".85"/>`).join('');
 if(st>=2)b+=`<path d="M48 27Q50 14 56 24Q60 10 64 24Q70 14 72 27Z" fill="${st===3?'#ff5a5a':'#ff8a2a'}" ${S2}/>`;
 if(st===3)b+=`<path d="M46 28L50 14L56 23L60 9L64 23L70 14L74 28Z" fill="#ffd84a" ${S2}/><circle cx="60" cy="22" r="3.2" fill="#ff3a6a" ${S2}/>`;
 b+=PA.eye(45,51,8.2)+PA.eye(75,51,8.2)+PA.blush(36,62)+PA.blush(84,62)+PA.smile(60,64,7);
 b+=`<circle cx="55" cy="58" r="1.2" fill="${PO}"/><circle cx="65" cy="58" r="1.2" fill="${PO}"/>`;
 if(st>=2)b+=PA.spk(98,30,5,'#fff6c0')+PA.spk(20,72,3.6,'#fff6c0');
 if(st===3)b+=PA.spk(24,26,6,'#fff')+PA.spk(100,90,4,'#fff');
 return PA.g(st,b)},

/* 🐢 Mousse, tortue-jardin */
mousse(st){let b='';
 if(st===3)b+=PA.aura('mo','#9cff7a');
 b+=PA.shadow(38);
 if(st===3)b+=`<path d="M60 40L60 16" stroke="#7a4a22" stroke-width="5" stroke-linecap="round"/><path d="M60 40L60 16" ${S2} fill="none" stroke-width="1.6"/><circle cx="60" cy="14" r="17" fill="#5cc45a" ${S3}/><circle cx="46" cy="22" r="10" fill="#5cc45a" ${S3}/><circle cx="74" cy="22" r="10" fill="#5cc45a" ${S3}/><circle cx="60" cy="16" r="12" fill="#5cc45a"/><circle cx="54" cy="10" r="2.4" fill="#ff7aa8"/><circle cx="68" cy="18" r="2.4" fill="#ffd84a"/><circle cx="48" cy="22" r="2.2" fill="#fff"/>`;
 /* pattes */
 b+=[[34,104],[86,104]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="11" ry="7" fill="#a8d878" ${S2}/>`).join('');
 /* carapace */
 b+=`<path d="M18 80Q18 38 60 36Q102 38 102 80Z" fill="#4f9a4a" ${S3}/>`;
 b+=`<path d="M42 44L50 56L70 56L78 44M50 56L44 74M70 56L76 74M30 64L44 74L76 74L90 64" fill="none" stroke="#3a7a38" stroke-width="2.4" stroke-linejoin="round"/>`;
 b+=`<path d="M26 54Q34 40 52 40Q40 46 38 54Q32 52 26 54Z" fill="#8fd46a"/><path d="M70 40Q90 42 94 56Q86 50 76 50Z" fill="#8fd46a"/>`;
 b+=`<path d="M16 80Q60 90 104 80Q104 86 96 88Q60 96 24 88Q16 86 16 80Z" fill="#c9a86a" ${S3}/>`;
 if(st<3)b+=`<path d="M60 37Q58 26 60 22" fill="none" stroke="#3a7a38" stroke-width="2.6" stroke-linecap="round"/><path d="M60 26Q50 18 46 24Q52 30 60 26Z" fill="#7fd45a" ${S2}/><path d="M60 24Q70 14 75 20Q69 28 60 24Z" fill="#7fd45a" ${S2}/>`;
 if(st>=2)b+=`<g transform="translate(36 46)"><circle r="5.4" fill="#ff8ab8" ${S2}/><circle r="2" fill="#ffe27a"/></g><g transform="translate(84 52)"><path d="M-6 0Q-6 -8 0 -8Q6 -8 6 0Z" fill="#e8443a" ${S2}/><rect x="-2" y="0" width="4" height="5" fill="#fff4dc" ${S2}/><circle cx="-2" cy="-4" r="1.2" fill="#fff"/></g>`;
 /* tête */
 b+=`<circle cx="60" cy="80" r="18" fill="#b8e08a" ${S3}/>`;
 b+=`<path d="M48 77Q52 72 56 77" fill="none" stroke="${PO}" stroke-width="2.6" stroke-linecap="round"/><path d="M64 77Q68 72 72 77" fill="none" stroke="${PO}" stroke-width="2.6" stroke-linecap="round"/>`;
 b+=PA.blush(46,85,.8)+PA.blush(74,85,.8)+PA.smile(60,86,5);
 if(st===3)b+=PA.spk(20,40,4.5,'#eaffc0')+PA.spk(102,30,5,'#eaffc0')+PA.spk(96,66,3,'#fff');
 return PA.g(st,b)},

/* 🦊 Braise, renardeau de feu */
braise(st){const fur=st===3?'#ff6a2a':'#ff7a2e',sh='#d9501a';let b='';
 if(st===3)b+=PA.aura('br','#ff9a3a');
 b+=PA.shadow(30);
 const flame=(tx,ty,rot,sc)=>`<g transform="translate(${tx} ${ty}) rotate(${rot}) scale(${sc})"><path d="M0 0Q-16 -10 -10 -30Q-4 -22 0 -26Q2 -40 10 -46Q8 -32 16 -24Q20 -12 0 0Z" fill="#ffb21a" ${S2}/><path d="M2 -6Q-6 -12 -3 -22Q2 -18 4 -22Q6 -30 10 -32Q10 -22 13 -18Q14 -10 2 -6Z" fill="#fff0a0"/></g>`;
 const tail=(rot)=>`<g transform="rotate(${rot} 72 96)"><path d="M72 96Q98 96 100 70Q101 56 92 50Q86 70 72 80Z" fill="${fur}" ${S3}/></g>`;
 if(st===3){b+=tail(-26)+tail(0)+tail(26);b+=flame(96,52,-30,.62)+flame(102,74,0,.62)+flame(88,96,40,.58)}
 else if(st===2){b+=tail(-14)+tail(14);b+=flame(98,58,-20,.6)+flame(96,86,20,.58)}
 else{b+=tail(0);b+=flame(100,72,0,.62)}
 b+=[[46,104],[74,104]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="8" ry="5.5" fill="#fff0d8" ${S2}/>`).join('');
 b+=`<ellipse cx="60" cy="88" rx="20" ry="18" fill="${fur}" ${S3}/><path d="M50 78Q60 104 70 78Q66 96 60 98Q54 96 50 78Z" fill="#fff0d8"/>`;
 /* oreilles */
 b+=`<path d="M30 46L26 12L52 30Z" fill="${fur}" ${S3}/><path d="M33 38L31 18L45 30Z" fill="#fff0d8"/><path d="M26 12L30 22L36 18Z" fill="#4a2414"/>`;
 b+=`<path d="M90 46L94 12L68 30Z" fill="${fur}" ${S3}/><path d="M87 38L89 18L75 30Z" fill="#fff0d8"/><path d="M94 12L90 22L84 18Z" fill="#4a2414"/>`;
 /* tête */
 b+=`<path d="M60 26Q90 26 92 52Q92 66 80 72Q70 78 60 78Q50 78 40 72Q28 66 28 52Q30 26 60 26Z" fill="${fur}" ${S3}/>`;
 b+=`<path d="M28 56Q34 76 60 78Q46 70 42 60Q36 64 28 56Z" fill="#fff0d8"/><path d="M92 56Q86 76 60 78Q74 70 78 60Q84 64 92 56Z" fill="#fff0d8"/>`;
 if(st>=2)b+=`<path d="M54 30Q52 18 60 10Q62 20 66 18Q68 26 64 30Z" fill="#ffb21a" ${S2}/>`;
 if(st===3)b+=`<path d="M52 38L56 44L60 38L64 44L68 38" fill="none" stroke="#ff3a2a" stroke-width="2.4" stroke-linejoin="round"/>`;
 b+=PA.eye(47,52,7)+PA.eye(73,52,7);
 b+=`<path d="M56 62L64 62L60 67Z" fill="${PO}" stroke="${PO}" stroke-width="1.6" stroke-linejoin="round"/>`;
 b+=`<path d="M55 69Q58 72 60 69Q62 72 65 69" fill="none" stroke="${PO}" stroke-width="2" stroke-linecap="round"/>`;
 b+=PA.blush(40,64,.8)+PA.blush(80,64,.8);
 if(st===3)b+=`<g opacity=".95">${flame(18,44,-10,.4)+flame(24,92,10,.36)}</g>`;
 return PA.g(st,b)},

/* 🐰 Givrelle, lapin des neiges */
givrelle(st){let b='';const fur='#f6fbff',sh='#cfe3f5';
 if(st===3)b+=PA.aura('gi','#8fe9ff');
 b+=PA.shadow(30);
 const ear=(x,rot)=>`<g transform="rotate(${rot} ${x} 42)"><ellipse cx="${x}" cy="27" rx="9.5" ry="21" fill="${fur}" ${S3}/><ellipse cx="${x}" cy="29" rx="5" ry="15" fill="#bfe6ff"/></g>`;
 b+=ear(46,-12)+ear(74,12);
 if(st>=2)b+=`<path d="M46 3L50 11L42 11Z" fill="#9fe6ff" ${S2} transform="rotate(-12 46 42)"/><path d="M74 3L78 11L70 11Z" fill="#9fe6ff" ${S2} transform="rotate(12 74 42)"/>`;
 b+=[[44,105],[76,105]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="10" ry="5.5" fill="${fur}" ${S2}/>`).join('');
 b+=`<ellipse cx="60" cy="86" rx="27" ry="22" fill="${fur}" ${S3}/><path d="M36 90Q60 112 84 90Q80 104 60 106Q40 104 36 90Z" fill="${sh}" opacity=".7"/>`;
 b+=`<circle cx="90" cy="96" r="8" fill="#fff" ${S2}/>`;
 if(st>=2)b+=`<path d="M38 72Q60 82 82 72L84 80Q60 90 36 80Z" fill="#4da3ff" ${S2}/><path d="M74 78L80 96L70 92Z" fill="#4da3ff" ${S2}/><path d="M44 77L48 79M56 80L60 81M68 79L72 78" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`;
 /* tête */
 b+=`<ellipse cx="60" cy="54" rx="26" ry="23" fill="${fur}" ${S3}/>`;
 b+=`<path d="M34 58Q30 66 38 70M86 58Q90 66 82 70" fill="none" ${S2}/>`;
 const flake=(x,y,s,c)=>`<g transform="translate(${x} ${y})" stroke="${c}" stroke-width="${s*.36}" stroke-linecap="round">${[0,60,120].map(a=>`<path d="M0 ${-s}L0 ${s}" transform="rotate(${a})"/>`).join('')}</g>`;
 b+=flake(60,37,4.4,'#7cc8ff');
 if(st===3)b+=`<path d="M40 36L44 22L50 32L56 14L60 30L64 14L70 32L76 22L80 36Z" fill="#c9f4ff" ${S2}/><path d="M56 16L60 30L64 16" fill="#ffffff" opacity=".7"/><circle cx="60" cy="27" r="2.4" fill="#4da3ff"/>`;
 b+=PA.eye(49,54,6.8,'#1d2a5a')+PA.eye(71,54,6.8,'#1d2a5a');
 b+=`<path d="M57 63Q60 66 63 63Q60 61 57 63Z" fill="#ff8ab8" stroke="${PO}" stroke-width="1.4"/><path d="M60 65L60 68M56 70Q58 71 60 68Q62 71 64 70" fill="none" stroke="${PO}" stroke-width="1.8" stroke-linecap="round"/>`;
 b+=PA.blush(42,64,.8)+PA.blush(78,64,.8);
 if(st>=2)b+=flake(98,40,5,'#bfe6ff')+flake(20,86,4,'#bfe6ff');
 if(st===3)b+=flake(18,30,6,'#e8fbff')+flake(102,78,4.5,'#e8fbff')+PA.spk(96,18,4,'#fff');
 return PA.g(st,b)},

/* ✨ Lumi, luciole d'éther */
lumi(st){let b='';
 b+=`<defs><radialGradient id="lmg${st}" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ffffff"/><stop offset=".35" stop-color="#b8fbff"/><stop offset="1" stop-color="#2ec7e0"/></radialGradient><radialGradient id="lmh${st}"><stop offset="0" stop-color="#9ff6ff" stop-opacity=".9"/><stop offset="1" stop-color="#9ff6ff" stop-opacity="0"/></radialGradient></defs>`;
 b+=`<circle cx="60" cy="82" r="${[34,42,52][st-1]}" fill="url(#lmh${st})"/>`;
 if(st===3)b+=`<circle cx="60" cy="72" r="46" fill="none" stroke="#9ff6ff" stroke-width="2" stroke-dasharray="3 6" opacity=".9"/><circle cx="60" cy="72" r="38" fill="none" stroke="#e8fdff" stroke-width="1.2" opacity=".7"/>`;
 b+=PA.shadow(22);
 /* ailes */
 const wing=(x,y,rx,ry,rot)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" transform="rotate(${rot} ${x} ${y})" fill="#e8fdff" fill-opacity=".62" stroke="#3a2f7a" stroke-width="2.4"/>`;
 b+=wing(34,58,18,10,-24)+wing(86,58,18,10,24);
 if(st>=2)b+=wing(36,72,14,7,14)+wing(84,72,14,7,-14);
 /* abdomen lumineux */
 b+=`<ellipse cx="60" cy="86" rx="21" ry="22" fill="url(#lmg${st})" ${S3}/><path d="M42 80Q60 86 78 80M41 90Q60 96 79 90" fill="none" stroke="#2a9ab0" stroke-width="1.8" opacity=".6"/>`;
 b+=[[50,104],[60,107],[70,104]].map(([x,y])=>`<path d="M${x} ${y-6}L${x} ${y}" stroke="${PO}" stroke-width="2.6" stroke-linecap="round"/>`).join('');
 /* tête */
 b+=`<path d="M48 30Q42 14 34 12" fill="none" stroke="${PO}" stroke-width="2.6" stroke-linecap="round"/><path d="M72 30Q78 14 86 12" fill="none" stroke="${PO}" stroke-width="2.6" stroke-linecap="round"/>`;
 b+=`<circle cx="34" cy="12" r="5" fill="#9ff6ff" ${S2}/><circle cx="86" cy="12" r="5" fill="#9ff6ff" ${S2}/>`;
 b+=`<circle cx="60" cy="50" r="22" fill="#3a2f7a" ${S3}/><path d="M42 44Q48 32 60 30Q50 36 48 46Z" fill="#6a5ab8"/>`;
 b+=PA.eye(51,52,7,'#0e0820')+PA.eye(69,52,7,'#0e0820');
 b+=`<circle cx="49" cy="49" r="1.4" fill="#9ff6ff"/><circle cx="67" cy="49" r="1.4" fill="#9ff6ff"/>`;
 b+=PA.smile(60,61,4)+PA.blush(44,60,.7)+PA.blush(76,60,.7);
 if(st>=2)b+=PA.spk(20,36,4,'#c8fbff')+PA.spk(100,40,4.4,'#c8fbff');
 if(st===3)b+=PA.spk(18,92,5,'#ffffff')+PA.spk(104,96,3.6,'#ffffff')+PA.spk(60,8,3,'#ffffff');
 return PA.g(st,b)},

/* 🐱 Jeton, chat d'Aléa */
jeton(st){let b='';const fur='#2e2348',hi='#54447e',mag='#ff5fb4';
 if(st===3)b+=PA.aura('je','#ff5fb4');
 if(st===3)b+=`<g transform="translate(18 40) rotate(-18)"><rect x="-9" y="-12" width="18" height="24" rx="3" fill="#fff8ee" ${S2}/><path d="M0 -5Q-6 -1 0 6Q6 -1 0 -5Z" fill="#e8304a"/></g><g transform="translate(102 44) rotate(16)"><rect x="-9" y="-12" width="18" height="24" rx="3" fill="#fff8ee" ${S2}/><path d="M0 -6L5 0L0 6L-5 0Z" fill="${mag}"/></g>`;
 b+=PA.shadow(30);
 b+=`<path d="M80 98Q104 96 100 74Q98 62 106 56" fill="none" stroke="${PO}" stroke-width="12" stroke-linecap="round"/><path d="M80 98Q104 96 100 74Q98 62 106 56" fill="none" stroke="${fur}" stroke-width="6.5" stroke-linecap="round"/>`;
 b+=`<path d="M106 50L111 56L106 62L101 56Z" fill="${mag}" ${S2}/>`;
 b+=[[47,105],[73,105]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="8.5" ry="5.2" fill="${hi}" ${S2}/>`).join('');
 b+=`<path d="M38 104Q34 76 60 72Q86 76 82 104Z" fill="${fur}" ${S3}/><path d="M52 86Q60 100 68 86Q66 98 60 100Q54 98 52 86Z" fill="${hi}"/>`;
 /* oreilles */
 b+=`<path d="M34 44L30 12L56 28Z" fill="${fur}" ${S3}/><path d="M36 36L34 20L48 28Z" fill="${mag}" opacity=".85"/>`;
 b+=`<path d="M86 44L90 12L64 28Z" fill="${fur}" ${S3}/><path d="M84 36L86 20L72 28Z" fill="${mag}" opacity=".85"/>`;
 if(st===3)b+=`<path d="M38 34Q40 12 22 10Q34 18 32 30Z" fill="#7c3cff" ${S2}/><path d="M82 34Q80 12 98 10Q86 18 88 30Z" fill="${mag}" ${S2}/><circle cx="22" cy="10" r="4.4" fill="#ffd84a" ${S2}/><circle cx="98" cy="10" r="4.4" fill="#ffd84a" ${S2}/><path d="M30 34Q60 22 90 34L88 40Q60 30 32 40Z" fill="#ffd84a" ${S2}/>`;
 /* tête */
 b+=`<ellipse cx="60" cy="52" rx="29" ry="25" fill="${fur}" ${S3}/><path d="M38 40Q46 30 58 29Q46 36 44 46Z" fill="${hi}"/>`;
 b+=`<path d="M60 33L63.5 37L60 41L56.5 37Z" fill="${mag}"/>`;
 const ceye=(x)=>`<ellipse cx="${x}" cy="52" rx="7.2" ry="8.2" fill="#ffd84a" stroke="${PO}" stroke-width="2"/><ellipse cx="${x}" cy="52.5" rx="2.2" ry="6.2" fill="${PO}"/><circle cx="${x-2.6}" cy="48.6" r="2" fill="#fff"/>`;
 b+=ceye(48)+ceye(72);
 b+=`<path d="M57.5 61L62.5 61L60 64Z" fill="${mag}" stroke="${PO}" stroke-width="1.2" stroke-linejoin="round"/><path d="M55 66Q57.5 69 60 66Q62.5 69 65 66" fill="none" stroke="#e8e0ff" stroke-width="1.8" stroke-linecap="round"/>`;
 b+=`<path d="M30 58L42 60M30 64L42 63M90 58L78 60M90 64L78 63" stroke="#e8e0ff" stroke-width="1.4" stroke-linecap="round" opacity=".8"/>`;
 b+=PA.blush(40,66,.75)+PA.blush(80,66,.75);
 /* collier et pièce */
 b+=`<path d="M40 74Q60 82 80 74" fill="none" stroke="${st>=2?'#7c3cff':'#e8304a'}" stroke-width="5" stroke-linecap="round"/>`;
 if(st>=2)b+=[44,52,68,76].map((x,i)=>`<path d="M${x-4} ${75+(i%3===0?0:2)}L${x} ${84+(i%3===0?0:2)}L${x+4} ${75+(i%3===0?0:2)}Z" fill="${i%2?mag:'#7c3cff'}" ${S2}/>`).join('');
 b+=`<circle cx="60" cy="84" r="7.2" fill="#ffd84a" ${S2}/><circle cx="60" cy="84" r="4.4" fill="none" stroke="#b07a10" stroke-width="1.3"/><path d="M60 81.5L61 84L60 86.5L59 84Z" fill="#b07a10"/>`;
 if(st>=2)b+=PA.spk(98,24,4,'#ffd84a');
 return PA.g(st,b)},

/* 🦉 Plumet, petit-duc d'éther */
plumet(st){let b='';const f='#2f9ea8',d='#1f6f7c',face='#bdf3ee';
 if(st===3){b+=PA.aura('pl','#8f7cff');b+=`<path d="M86 14A20 20 0 1 0 104 40A16 16 0 1 1 86 14Z" fill="#ffe9a8" ${S2}/>`;}
 b+=PA.shadow(28);
 /* ailes */
 if(st===3){const W=(sx)=>`<g transform="translate(60 74) scale(${sx} 1)"><path d="M14 -10Q40 -34 64 -18Q62 -9 56 -7Q58 0 50 2Q52 9 42 9Q42 16 32 13Q28 18 18 10Z" fill="${d}" ${S3}/><path d="M50 2Q44 -2 40 -8M42 9Q36 4 32 -2M32 13Q26 8 24 2" fill="none" stroke="#5fd6d6" stroke-width="1.6" stroke-linecap="round"/><g stroke="#e8f6ff" stroke-width="1.2" fill="none"><path d="M30 -12L42 -18L54 -12"/></g>${[[30,-12],[42,-18],[54,-12]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2" fill="#fff"/>`).join('')}</g>`;b+=W(1)+W(-1)}
 else b+=`<path d="M36 70Q22 82 30 102Q38 94 44 92Z" fill="${d}" ${S3}/><path d="M84 70Q98 82 90 102Q82 94 76 92Z" fill="${d}" ${S3}/>`;
 b+=[[50,106],[70,106]].map(([x,y])=>`<path d="M${x-5} ${y}L${x-3} ${y-5}M${x} ${y+1}L${x} ${y-5}M${x+5} ${y}L${x+3} ${y-5}" stroke="#ffb21a" stroke-width="3" stroke-linecap="round"/>`).join('');
 /* corps */
 b+=`<ellipse cx="60" cy="80" rx="26" ry="26" fill="${f}" ${S3}/><ellipse cx="60" cy="86" rx="16" ry="17" fill="${face}" opacity=".9"/>`;
 b+=[[54,80],[66,80],[60,88],[54,96],[66,96]].map(([x,y])=>`<path d="M${x-3} ${y}L${x} ${y+3}L${x+3} ${y}" fill="none" stroke="${d}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
 if(st>=2&&st<3)b+=`<path d="M36 64Q60 74 84 64L88 80Q60 70 32 80Z" fill="#3a2f7a" ${S2}/>${PA.spk(46,72,2.4,'#ffe9a8')}${PA.spk(70,72,2.4,'#ffe9a8')}`;
 /* tête + aigrettes */
 b+=`<path d="M36 40L28 10L50 30Z" fill="${f}" ${S3}/><path d="M84 40L92 10L70 30Z" fill="${f}" ${S3}/>`;
 if(st>=2)b+=PA.spk(28,10,5.5,'#ffe9a8')+PA.spk(92,10,5.5,'#ffe9a8');
 b+=`<ellipse cx="60" cy="48" rx="30" ry="25" fill="${f}" ${S3}/>`;
 b+=`<path d="M60 34Q74 32 82 42Q86 58 72 64Q66 66 60 58Q54 66 48 64Q34 58 38 42Q46 32 60 34Z" fill="${face}" ${S2}/>`;
 b+=[[44,30],[52,26],[70,27],[78,32]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="1.5" fill="#e8fdff"/>`).join('');
 const oeye=(x)=>`<circle cx="${x}" cy="48" r="9" fill="#ffa21a" stroke="${PO}" stroke-width="2.2"/><circle cx="${x}" cy="48" r="5" fill="${PO}"/><circle cx="${x-2.4}" cy="45.4" r="2.2" fill="#fff"/>`;
 b+=oeye(49)+oeye(71);
 b+=`<path d="M56 56L64 56L60 64Z" fill="#ffb21a" stroke="${PO}" stroke-width="1.8" stroke-linejoin="round"/>`;
 b+=PA.blush(40,58,.7)+PA.blush(80,58,.7);
 if(st===3)b+=PA.spk(16,60,4,'#fff')+PA.spk(104,64,4,'#fff')+PA.spk(24,22,3,'#e8f6ff');
 return PA.g(st,b)},

/* 🐉 Fumerolle, bébé dragon */
fumerolle(st){let b='';const sk=st===3?'#c42a3c':'#ff5a4e',sh=st===3?'#8a1830':'#d63a3a',bel='#ffe0a0',mem=st===3?'#ff8a3a':'#ff9a7a';
 if(st===3)b+=PA.aura('fu','#ff7a2a');
 b+=PA.shadow(32);
 /* ailes */
 const wing=(sx,sc)=>`<g transform="translate(60 70) scale(${sx*sc} ${sc})"><path d="M14 -2Q30 -36 52 -30Q46 -22 50 -14Q42 -14 42 -6Q34 -8 30 2Z" fill="${mem}" ${S3}/><path d="M18 -6Q32 -26 46 -26M22 -4Q34 -16 42 -10" fill="none" stroke="${sh}" stroke-width="1.6" opacity=".7"/></g>`;
 b+=wing(1,[.8,1,1.18][st-1])+wing(-1,[.8,1,1.18][st-1]);
 /* queue */
 b+=`<path d="M78 98Q102 100 100 82" fill="none" stroke="${PO}" stroke-width="12" stroke-linecap="round"/><path d="M78 98Q102 100 100 82" fill="none" stroke="${sk}" stroke-width="6.5" stroke-linecap="round"/><path d="M100 70L108 84L94 82Z" fill="${sh}" ${S2}/>`;
 b+=[[46,105],[74,105]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="9" ry="5.6" fill="${sk}" ${S2}/><path d="M${x-4} ${y-2}l0 3M${x} ${y-2}l0 3.4M${x+4} ${y-2}l0 3" stroke="#fff4d6" stroke-width="1.6" stroke-linecap="round"/>`).join('');
 /* corps */
 b+=`<ellipse cx="60" cy="86" rx="23" ry="21" fill="${sk}" ${S3}/><path d="M48 74Q60 70 72 74L70 102Q60 106 50 102Z" fill="${bel}" ${S2}/><path d="M49 82L71 82M49 90L71 90M50 97L70 97" stroke="#e0a860" stroke-width="1.6"/>`;
 if(st>=2)b+=`<path d="M36 72L30 66L38 66Z M84 72L90 66L82 66Z" fill="${sh}" ${S2}/>`;
 /* cornes */
 const hl=[10,14,20][st-1];
 b+=`<path d="M44 30Q38 ${26-hl} 30 ${22-hl}Q42 ${22-hl*.4} 50 28Z" fill="#fff0c8" ${S2}/><path d="M76 30Q82 ${26-hl} 90 ${22-hl}Q78 ${22-hl*.4} 70 28Z" fill="#fff0c8" ${S2}/>`;
 /* tête */
 b+=`<ellipse cx="60" cy="50" rx="30" ry="25" fill="${sk}" ${S3}/><ellipse cx="60" cy="64" rx="13.5" ry="8.6" fill="${bel}" ${S2}/>`;
 b+=`<ellipse cx="55.5" cy="62" rx="1.6" ry="1.1" fill="${PO}"/><ellipse cx="64.5" cy="62" rx="1.6" ry="1.1" fill="${PO}"/>`;
 b+=`<path d="M53 67.5Q60 72 67 67.5" fill="none" stroke="${PO}" stroke-width="2.2" stroke-linecap="round"/><path d="M56 68.6L57.4 71.4L58.8 69.2" fill="#fff" stroke="${PO}" stroke-width="1"/>`;
 if(st===3)b+=`<path d="M34 46Q40 40 44 46M76 46Q80 40 86 46M42 38L48 42M78 42L84 38" stroke="#ffb02a" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M50 28Q52 16 56 24Q60 10 64 24Q68 16 70 28Z" fill="#ffb21a" ${S2}/>`;
 b+=PA.eye(47,47,7.4)+PA.eye(73,47,7.4)+PA.blush(36,58,.8)+PA.blush(84,58,.8);
 /* fumée */
 b+=`<g opacity=".85"><circle cx="${st===3?30:34}" cy="70" r="5" fill="#e8e0f0" ${S2}/><circle cx="${st===3?22:26}" cy="64" r="3.6" fill="#e8e0f0" ${S2}/><circle cx="${st===3?17:20}" cy="57" r="2.4" fill="#e8e0f0" ${S2}/></g>`;
 if(st>=2)b+=PA.spk(100,26,4,'#ffd27a')+PA.spk(16,90,3,'#ffd27a');
 if(st===3)b+=PA.spk(104,56,5,'#fff');
 return PA.g(st,b)},

/* 🦉 Grand-Duc des Neiges */
grandduc(st){let b='';const w='#fbfdff',sh='#d4e2f2',ice='#9fe6ff';
 if(st===3){b+=`<defs><linearGradient id="gdau" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#7cf2c8" stop-opacity=".0"/><stop offset=".5" stop-color="#7cf2c8" stop-opacity=".55"/><stop offset="1" stop-color="#b48cff" stop-opacity=".0"/></linearGradient></defs><path d="M4 40Q30 10 60 26Q90 40 116 14L116 34Q90 58 60 44Q30 30 4 60Z" fill="url(#gdau)"/>`+PA.aura('gd','#bfe8ff')}
 b+=PA.shadow(34);
 if(st===3){const W=(sx)=>`<g transform="translate(60 74) scale(${sx} 1)"><path d="M16 -10Q42 -36 66 -18Q64 -9 58 -7Q60 0 52 2Q54 9 44 9Q44 16 34 13Q30 18 20 10Z" fill="${w}" ${S3}/><path d="M52 2Q46 -2 42 -8M44 9Q38 4 34 -2M34 13Q28 8 26 2" fill="none" stroke="#a8c4e0" stroke-width="1.6" stroke-linecap="round"/>${[[36,-20],[48,-22],[58,-16]].map(([x,y])=>`<path d="M${x} ${y}l3 -7l3 7z" fill="${ice}" stroke="${PO}" stroke-width="1.4" stroke-linejoin="round"/>`).join('')}</g>`;b+=W(1)+W(-1)}
 else b+=`<path d="M34 66Q18 80 26 104Q36 96 44 92Z" fill="${st===2?'#e8f4ff':w}" ${S3}/><path d="M86 66Q102 80 94 104Q84 96 76 92Z" fill="${st===2?'#e8f4ff':w}" ${S3}/>${st===2?`<path d="M26 98L30 92L33 100Z M94 98L90 92L87 100Z" fill="${ice}" ${S2}/>`:''}`;
 b+=[[50,106],[70,106]].map(([x,y])=>`<ellipse cx="${x}" cy="${y}" rx="7" ry="4.6" fill="#fff" ${S2}/><path d="M${x-4} ${y+1}l-1 3M${x} ${y+2}l0 3M${x+4} ${y+1}l1 3" stroke="${PO}" stroke-width="1.6" stroke-linecap="round"/>`).join('');
 /* corps duveteux */
 const r=st===1?29:27;
 b+=`<path d="M${60-r} 82Q${60-r} ${82-r} 60 ${82-r}Q${60+r} ${82-r} ${60+r} 82Q${60+r} 98 ${60+r*.7} 104Q${60+r*.35} 100 60 106Q${60-r*.35} 100 ${60-r*.7} 104Q${60-r} 98 ${60-r} 82Z" fill="${w}" ${S3}/>`;
 b+=[[50,80],[64,78],[56,90],[70,90],[48,96],[62,100]].map(([x,y])=>`<path d="M${x-3} ${y}L${x} ${y+2.4}L${x+3} ${y}" fill="none" stroke="#7a8aa8" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`).join('');
 if(st===2)b+=`<path d="M36 66Q60 76 84 66L86 74Q60 84 34 74Z" fill="#bfe6ff" ${S2}/><path d="M42 72L46 70M56 75L60 74M72 72L76 71" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`;
 /* tête */
 b+=`<path d="M40 30L36 18L50 26Z" fill="${w}" ${S2}/><path d="M80 30L84 18L70 26Z" fill="${w}" ${S2}/>`;
 b+=`<ellipse cx="60" cy="46" rx="30" ry="24" fill="${w}" ${S3}/><path d="M34 54Q60 70 86 54Q80 66 60 68Q40 66 34 54Z" fill="${sh}" opacity=".6"/>`;
 if(st===3)b+=`<path d="M38 28L42 10L50 22L56 4L60 20L64 4L70 22L78 10L82 28Z" fill="#d8f6ff" ${S2}/><path d="M56 6L60 20L64 6" fill="#fff" opacity=".8"/><circle cx="60" cy="22" r="2.6" fill="#7cf2ff" stroke="${PO}" stroke-width="1"/>`;
 b+=[[44,36],[76,36],[60,30]].map(([x,y])=>`<path d="M${x-2} ${y}L${x} ${y+2}L${x+2} ${y}" fill="none" stroke="#7a8aa8" stroke-width="1.6" stroke-linecap="round"/>`).join('');
 const yeye=(x)=>`<circle cx="${x}" cy="47" r="8.6" fill="#ffd23a" stroke="${PO}" stroke-width="2.2"/><circle cx="${x}" cy="47" r="4.8" fill="${PO}"/><circle cx="${x-2.4}" cy="44.4" r="2.2" fill="#fff"/>`;
 b+=yeye(48)+yeye(72);
 b+=`<path d="M56 54L64 54L60 61Z" fill="#3a3550" stroke="${PO}" stroke-width="1.6" stroke-linejoin="round"/>`;
 b+=PA.blush(38,58,.7)+PA.blush(82,58,.7);
 const flake=(x,y,s)=>`<g transform="translate(${x} ${y})" stroke="#e8fbff" stroke-width="${s*.34}" stroke-linecap="round">${[0,60,120].map(a=>`<path d="M0 ${-s}L0 ${s}" transform="rotate(${a})"/>`).join('')}</g>`;
 if(st>=2)b+=flake(18,30,4.6)+flake(102,84,4);
 if(st===3)b+=flake(104,30,5.4)+flake(14,88,4.2);
 return PA.g(st,b)},
/* 🦇 Écho, chauve-souris du Donjon des Échos (exclusif à la Boutique des Échos) */
echo(st){let b='';const fur=['#7f62d0','#5e40b0','#3e2680'][st-1],sh=['#5e44a8','#432c88','#2a185e'][st-1],mem=['#a68cec','#8a6ae0','#6a48c8'][st-1],bel='#e2d8ff',ear='#ff9ac8';
 if(st===3)b+=PA.aura('ech','#b48aff');
 b+=PA.shadow(30);
 /* les ondes d'écho */
 if(st>=2)b+=[0,1,2].map(i=>`<path d="M${22-i*7} ${44-i*4}Q${14-i*8} ${58} ${22-i*7} ${72+i*4}" fill="none" stroke="#e0d0ff" stroke-width="${2.6-i*.5}" stroke-linecap="round" opacity="${.85-i*.22}"/><path d="M${98+i*7} ${44-i*4}Q${106+i*8} ${58} ${98+i*7} ${72+i*4}" fill="none" stroke="#e0d0ff" stroke-width="${2.6-i*.5}" stroke-linecap="round" opacity="${.85-i*.22}"/>`).join('');
 /* ailes */
 const ws=[.78,.98,1.14][st-1];
 const wing=sx=>`<g transform="translate(60 74) scale(${(sx*ws).toFixed(2)} ${ws.toFixed(2)})"><path d="M12 -6Q22 -34 50 -38Q50 -28 46 -22Q52 -18 50 -10Q42 -12 38 -4Q34 -8 26 -2Q20 -6 12 4Z" fill="${mem}" ${S3}/><path d="M16 -6L48 -36M20 -4L48 -12M24 -2L37 -5" fill="none" stroke="${st===3?'#f0e0ff':sh}" stroke-width="${st===3?1.8:1.5}" stroke-linecap="round" opacity="${st===3?.95:.7}"/></g>`;
 b+=wing(1)+wing(-1);
 /* pattes */
 b+=[[50,103],[70,103]].map(([x,y])=>`<path d="M${x-5} ${y}Q${x} ${y-6} ${x+5} ${y}" fill="${sh}" ${S2}/><path d="M${x-3} ${y}l-1 3M${x} ${y}l0 3.4M${x+3} ${y}l1 3" stroke="${PO}" stroke-width="1.4" stroke-linecap="round"/>`).join('');
 /* corps */
 b+=`<ellipse cx="60" cy="84" rx="20" ry="19" fill="${fur}" ${S3}/><ellipse cx="60" cy="88" rx="12.5" ry="12" fill="${bel}"/><path d="M53 80q3 3 0 6M60 82q3 3 0 6M67 80q3 3 0 6" stroke="#b8a8e8" stroke-width="1.4" fill="none" stroke-linecap="round"/>`;
 /* oreilles */
 b+=`<path d="M41 44L30 ${[12,8,4][st-1]}L54 34Z" fill="${fur}" ${S3}/><path d="M42 40L35 ${[20,16,12][st-1]}L50 35Z" fill="${ear}"/><path d="M79 44L90 ${[12,8,4][st-1]}L66 34Z" fill="${fur}" ${S3}/><path d="M78 40L85 ${[20,16,12][st-1]}L70 35Z" fill="${ear}"/>`;
 /* tête */
 b+=`<ellipse cx="60" cy="55" rx="28" ry="24" fill="${fur}" ${S3}/><path d="M34 60Q60 82 86 60Q82 75 60 77Q38 75 34 60Z" fill="${sh}" opacity=".5"/><ellipse cx="60" cy="61" rx="15" ry="11" fill="${bel}" opacity=".9"/>`;
 if(st>=2)b+=`<path d="M56 36Q60 30 64 36Q60 33 56 36Z" fill="#ffe8a0" ${S2}/>`;
 if(st===3)b+=`<path d="M48 34L46 22L52 28L56 14L60 26L64 14L68 28L74 22L72 34Z" fill="#c89aff" ${S2}/><circle cx="60" cy="27" r="2.6" fill="#fff4b0"/><circle cx="51" cy="29" r="1.6" fill="#ffe0ff"/><circle cx="69" cy="29" r="1.6" fill="#ffe0ff"/>`;
 b+=PA.eye(49,54,7.6)+PA.eye(71,54,7.6);
 b+=`<path d="M57.4 61.4Q60 59.4 62.6 61.4Q60 64.6 57.4 61.4Z" fill="#ff7aa8" stroke="${PO}" stroke-width="1.2"/>`;
 b+=`<path d="M53.5 66.5Q60 71 66.5 66.5" fill="none" stroke="${PO}" stroke-width="2.2" stroke-linecap="round"/><path d="M55.6 67.8L56.8 71L58.2 68.6Z M64.4 67.8L63.2 71L61.8 68.6Z" fill="#fff" stroke="${PO}" stroke-width=".9" stroke-linejoin="round"/>`;
 b+=PA.blush(39,64,.75)+PA.blush(81,64,.75);
 if(st>=2)b+=PA.spk(104,24,4,'#e0d0ff')+PA.spk(14,92,3,'#e0d0ff');
 if(st===3)b+=PA.spk(18,26,5,'#fff')+PA.spk(102,96,4,'#ffe8a0');
 return PA.g(st,b)}
};

/* œufs */
function eggArt(r,crack){const C=[['#f6efd9','#9bc46a','#6a9a4a'],['#d9ecff','#4da3ff','#2a6ac0'],['#ffe1c8','#ff8f3f','#d0601a'],['#ffeaa0','#ffb21a','#c8820e']][r];
 let b='';
 if(r===3)b+=PA.aura('eg'+r,'#ffd84a');
 if(r===2)b+=PA.aura('eg'+r,'#ff9a4a');
 b+=PA.shadow(26);
 const egg='M60 16C83 16 96 52 96 74C96 98 80 110 60 110C40 110 24 98 24 74C24 52 37 16 60 16Z';
 b+=`<defs><clipPath id="egc${r}"><path d="${egg}"/></clipPath></defs><path d="${egg}" fill="${C[0]}" ${S3}/>`;
 let pat='';
 if(r===0)pat=[[44,40,5],[70,34,4],[80,60,6],[50,70,4.4],[66,84,5.6],[38,92,4],[84,92,3.6],[58,52,3]].map(([x,y,s])=>`<ellipse cx="${x}" cy="${y}" rx="${s}" ry="${s*.8}" fill="${C[1]}"/>`).join('');
 if(r===1)pat=`<path d="M20 56Q40 44 60 56T100 56L100 66Q80 54 60 66T20 66Z" fill="${C[1]}"/><path d="M20 84Q40 72 60 84T100 84L100 92Q80 80 60 92T20 92Z" fill="${C[1]}" opacity=".7"/>`;
 if(r===2)pat=`<path d="M20 50L32 60L44 50L56 60L68 50L80 60L92 50L100 56L100 64L92 58L80 68L68 58L56 68L44 58L32 68L20 58Z" fill="${C[1]}"/><path d="M20 80L32 90L44 80L56 90L68 80L80 90L92 80L100 86L100 92L92 86L80 96L68 86L56 96L44 86L32 96L20 86Z" fill="#e8304a" opacity=".8"/>`;
 if(r===3)pat=PA.spk(60,64,15,'#fff6c0')+PA.spk(40,40,6,'#fff6c0')+PA.spk(82,88,7,'#fff6c0')+PA.spk(80,40,4,'#ffffff')+`<circle cx="60" cy="64" r="22" fill="none" stroke="${C[1]}" stroke-width="3" opacity=".7"/>`;
 b+=`<g clip-path="url(#egc${r})">${pat}<path d="M28 60Q36 28 56 20Q42 34 38 62Z" fill="#fff" opacity=".55"/></g><path d="${egg}" fill="none" ${S3}/>`;
 if(crack)b+=`<path d="M34 62L44 56L50 66L60 54L68 66L76 58L88 64" fill="none" stroke="${PO}" stroke-width="2.6" stroke-linejoin="round" stroke-linecap="round"/>`;
 return b}
return{PETART,eggArt,PA};
})();
