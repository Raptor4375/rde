
/* ================= V36.3 : cadres de saison d'arène visibles + moins de calculs (lags) ================= */
/* 1) les 3 cadres de la saison d'arène (Diamant, Maître, Légende) passent au nouveau style */
(function(){try{
  const D={sdiamant:[['#8ad8ff','#ffffff','#3a6ad8','#bff0ff','#8ad8ff'],'#06142e','#8ad8ff','p'],
    smaitre:[['#d07aff','#2a0a4a','#ffb0ff','#7a2ac8','#d07aff'],'#12041e','#d07aff','p'],
    slegende:[['#ff7a5a','#ffd84a','#ffffff','#ff3a1a','#ffd84a','#ff7a5a'],'#2a0a04','#ffb84a','f']};
  const gem=(c1,c2)=>`<path d="M40 8L46 2H54L60 8L50 20Z" fill="${c1}" stroke="${c2}" stroke-width="1.4" stroke-linejoin="round"/><path d="M40 8H60M46 2L50 8L54 2M50 8V20" stroke="${c2}" stroke-width=".8" fill="none"/>`;
  const spk=(x,y,s,c)=>`<path d="M${x} ${y-s}L${x+s*.3} ${y-s*.3}L${x+s} ${y}L${x+s*.3} ${y+s*.3}L${x} ${y+s}L${x-s*.3} ${y+s*.3}L${x-s} ${y}L${x-s*.3} ${y-s*.3}Z" fill="${c}"/>`;
  const O={sdiamant:()=>gem('#bff0ff','#3a6ad8')+spk(88,86,4,'#ffffff')+spk(12,84,3,'#bff0ff'),
    smaitre:()=>`<circle cx="50" cy="9" r="7" fill="#a04ae8" stroke="#f0c8ff" stroke-width="1.6"/><circle cx="47.5" cy="6.5" r="2.2" fill="#fff" opacity=".85"/>`+spk(88,86,4,'#ffb0ff')+spk(12,84,3,'#d07aff')+spk(86,16,2.6,'#fff'),
    slegende:()=>`<path d="M32 16L30 2L40 9L50 -2L60 9L70 2L68 16Z" fill="#ffd84a" stroke="#8a3a06" stroke-width="1.5" stroke-linejoin="round"/><circle cx="50" cy="10" r="2.4" fill="#ff3a1a"/>`+[24,50,76].map(x=>`<path d="M${x-5} 98Q${x-7} 89 ${x-1} 84Q${x} 91 ${x+3} 88Q${x+7} 93 ${x+5} 98Z" fill="#ff5a1a"/><path d="M${x-2} 98Q${x-2} 93 ${x} 91Q${x+2} 94 ${x+2} 98Z" fill="#ffd84a"/>`).join('')};
  let css='';for(const k in D){const d=D[k];
    css+=`.fav.frm-${k}{--fd:${d[1]};--gc:${d[2]};animation:${d[3]==='p'?'fpulse 2.6s ease-in-out infinite':'fflk 1.7s ease-in-out infinite'};box-shadow:none}\n.fav.frm-${k}::before{background:linear-gradient(160deg,rgba(255,255,255,.4),transparent 42%,rgba(0,0,0,.28)),conic-gradient(from var(--fa),${d[0].join(',')});animation:fspin 5.5s linear infinite}\n.fav.frm-${k}::after{content:'';background-color:transparent;font-size:0;background-image:url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" overflow="visible">${O[k]()}</svg>`)}")}\n`}
  const st=document.createElement('style');st.id='frv346';st.textContent=css;document.head.appendChild(st);
  Object.assign(FHINT,{sdiamant:"Arène : atteindre le rang Diamant en une saison",smaitre:"Arène : atteindre le rang Maître en une saison",slegende:"Arène : atteindre le rang Légende en une saison"});
}catch(e){console.warn('frv346',e)}})();
/* 2) moins de calculs à chaque affichage */
if(typeof realTopPw==='function'){const rt=realTopPw;let c=0,ct=0;realTopPw=function(){const n=Date.now();if(n-ct<4000)return c;c=rt.apply(this,arguments);ct=n;return c}}
{const rr=realRows;let c=null,ct=0,cp=null;realRows=function(){const n=Date.now();if(c&&cp===NET.players&&n-ct<2000)return c.map(r=>Object.assign({},r));c=rr.apply(this,arguments);cp=NET.players;ct=n;return c.map(r=>Object.assign({},r))}}
