
/* ================= Drakhar le Wyrm : visage détaillé comme les autres légendaires =================
   cornes d'ivoire striées, plaques sur les sourcils, collerettes épineuses aux joues (avec un anneau d'or),
   écailles sur le museau, braises aux naseaux et filets de fumée, deux crocs. Les yeux ne changent pas. */
(function(){try{
const D=65;if(!LOOKS[D])return;
FX.lg65=L=>{const sk=L.sk,dk=shade(sk,-.35),lt=shade(sk,.25);
  const horn=Pa('M40 30.6Q31.4 22.4 30.4 9.6Q34.6 18.4 42.4 25.4Z','#efe2c4','stroke="#3a1a10" stroke-width=".6" stroke-linejoin="round"')
    +SL('M38.6 27.6L36.6 28.4M36.4 24.4L34.4 25M34.2 20.4L32.6 20.8',`#b49a72`,.6)+Pa('M30.4 9.6Q31.6 14 33.2 16.4L32.4 13.6Z','#7a5a3a','opacity=".7"');
  const frill=Pa('M37.2 53.6L30.6 55.6L35.8 57.6L31.2 61.4L37.4 60.6L35.4 64.6L39.4 61.8Z',shade(L.s,-.12),'stroke="#2a0a0a" stroke-width=".5" stroke-linejoin="round"')
    +SL('M36.4 55.6L33.4 56.2M36.6 59.2L33.8 60.6',dk,.45);
  const brow=Pa('M38.6 43.4Q42.6 41 47.6 43.2L47 44.2Q42.8 42.4 39.2 44.4Z',dk,'opacity=".75"');
  const smoke=SL('M46.4 64.4Q44.6 62.4 45.6 60.4',`#e8dcd4`,.6,'opacity=".28"');
  const fang=Pa('M46.2 69.4L47 72.4L48 69.8Z','#f6eedc','stroke="#3a1a10" stroke-width=".3"');
  return MIR((/horn/.test(L.hat||'')?'':horn)+frill+brow+smoke+fang)
    +CI(33.6,58.6,1,'#ffcf4a','stroke="#9a6a14" stroke-width=".35"')
    +SL('M45 60.4Q47 59.2 49 60.4M51 60.4Q53 59.2 55 60.4M47 63.2Q50 62 53 63.2',dk,.5,'opacity=".55"')
    +MIR(CI(47,66,.75,'#ff9a3a','opacity=".9"'))
    +Pa('M50 30.6L52 33.2L50 35L48 33.2Z',dk)+Pa('M50 35.6L51.6 37.6L50 39L48.4 37.6Z',dk,'opacity=".85"')+SL('M48.6 32.6L50 31.4L51.4 32.6',lt,.4,'opacity=".7"')};
const L=LOOKS[D];let t=String(L[6]);const m=/(^| )face:([^ ]*)/.exec(t);LOOKS[D]=[...L.slice(0,6),m?t.replace(m[0],`${m[1]}face:${m[2]},lg65`):t+' face:lg65'];
try{delete PCACHE[D];skRefresh(D)}catch(e){}
}catch(e){console.warn('drakhar',e)}})();
