/* ================= Aléa : nouveau chara design (plus du tout comme Fortuna) ================= */
/* cheveux argentés en queue de cheval, croissant de lune, uniforme bleu nuit, cape rose mythique, orbe du destin.
   On garde le masque blanc et noir et les cartes qui tournent autour. */
const ALEA_LOOK2=['#ece2f4','#eef0ff','#1a2250','#cfd6ff','#d0409e','#8ad8ff','bg:star back:cape hb:pony hair:bangs hat:crescent eyes:glow mouth:smirk body:uniform ear:human prop:orb'];
{const mk=aleaHeroBody;aleaHeroBody=function(){if(ALEA_BODY)return ALEA_BODY;const keep=ALEA_LOOK.slice();try{ALEA_LOOK.splice(0,ALEA_LOOK.length,...ALEA_LOOK2);Object.keys(window.BODYC3||{}).forEach(k=>{if(k.startsWith('200_'))delete BODYC3[k]});return mk.apply(this,arguments)}finally{ALEA_LOOK.splice(0,ALEA_LOOK.length,...keep)}}}
LOOKS[ALEA]=ALEA_LOOK2;
(function(){try{ALEA_BODY=null;for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)Object.keys(C).forEach(k=>{if(k.startsWith(ALEA+'_')||k.startsWith('200_'))delete C[k]});
  for(const C of [PCACHE,typeof PIMG!=='undefined'?PIMG:null,typeof UPI!=='undefined'?UPI:null])if(C)Object.keys(C).forEach(k=>{if(k===String(ALEA)||k.endsWith('_'+ALEA)||k.startsWith(ALEA+'_')||k==='B'+ALEA||k.startsWith('P'+ALEA+'_'))delete C[k]});
  const p=alPortrait();if(p)PCACHE[ALEA]=p}catch(e){console.warn('alea',e)}})();
