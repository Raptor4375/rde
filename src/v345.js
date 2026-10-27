
/* ================= V36.2 : les cadres ne se perdent plus + comptes de test cachés ================= */
/* 1) coffre des cosmétiques : tout ce qu'on a débloqué est gardé à part sur l'appareil et ne fait que grandir */
const COSK=['evFrames','ptit','skins','pbgs','nfxs','avs','titles'];
function cosVaultKey(){return KEY+'-vault'}
function cosMerge(dst,src){let n=0;if(!dst||!src)return 0;for(const k of COSK){const a=src[k];if(!Array.isArray(a)||!a.length)continue;
  if(!Array.isArray(dst[k]))dst[k]=[];for(const x of a)if(x!=null&&!dst[k].includes(x)){dst[k].push(x);n++}}return n}
function cosVault(){if(window.RDE_SKTEST)return 0;let V={};try{V=JSON.parse(localStorage.getItem(cosVaultKey())||'{}')||{}}catch(e){V={}}
  const got=cosMerge(S,V);cosMerge(V,S);try{localStorage.setItem(cosVaultKey(),JSON.stringify(V))}catch(e){}return got}
/* 2) preuves : on redonne les cadres de la Guerre des Cieux à ceux qui les ont gagnés */
function avProof(){let n=0;const give=k=>{S.evFrames=S.evFrames||[];if(FRAMES[k]&&!S.evFrames.includes(k)){S.evFrames.push(k);n++}};
  try{const A=S.avw||{},f=A.fac;if(f==='ange'||f==='demon'){if((A.lv||0)>=15)give(f==='ange'?'aureole':'infernal');if(A.ms&&A.ms[2500]==='ok')give(f==='ange'?'ailesor':'abyssal');
    if(A.cap){try{if(avWinner()===f)give('capitale')}catch(e){}}}}catch(e){}
  /* le cadre porté par mes anciennes fiches (autres appareils) */
  try{const ids=[...(Array.isArray(S.pids)?S.pids:[]),S.opid,NET.pid,NET.uid].filter(Boolean);for(const id of ids){const d=NET.players&&NET.players[id];if(d&&d.frm&&FRAMES[d.frm]&&(AVFR[d.frm]||/^p_/.test(d.frm)||['citrouille','roicitrouille','rose','rose_or','tableroyale','mecene'].includes(d.frm)))give(d.frm)}}catch(e){}
  return n}
function cosFix(){try{const a=cosVault(),b=avProof();if(a+b>0){cosVault();save();try{render()}catch(e){}toast(`🖼️ ${a+b} cadre${a+b>1?'s':''} / cosmétique${a+b>1?'s':''} retrouvé${a+b>1?'s':''} !`)}}catch(e){}}
setTimeout(cosFix,4000);setTimeout(cosFix,15000);setInterval(()=>{try{cosVault()}catch(e){}},30000);
/* 3) quand une partie arrive d'un autre appareil, on garde les cosmétiques des deux */
if(typeof accApply==='function'){const aa=accApply;accApply=function(id,r,msg){try{if(r&&r.S)cosMerge(r.S,S)}catch(e){}return aa.apply(this,arguments)}}
/* 4) code de restauration (donné à la main, une seule utilisation) */
const CADRE_H={'f3ab8e026bd1a76f461cf2ada2cad6ca':['infernal','abyssal']};
window.addEventListener('click',async e=>{const b=e.target.closest('[data-a="mecok"]');if(!b)return;
  const c=String(($('#meccode')||{}).value||'').trim().toUpperCase().replace(/\s+/g,'');if(!/^CADRE-/.test(c))return;
  e.preventDefault();e.stopImmediatePropagation();
  try{const h=await mecHash(c),L=CADRE_H[h];if(!L){toast("Ce code n'est pas valide.");return}
    if(!NET.on||!NET.db){toast('Connecte-toi à internet pour valider ton code.');return}
    const ref=NET.db.doc('mecene/'+h);const s=await ref.get();if(s.exists){const d=s.data();if(d&&d.pid!==NET.pid){toast('Ce code a déjà été utilisé.');return}}else await ref.set({pid:NET.pid,n:S.name||'',t:Date.now()});
    S.evFrames=S.evFrames||[];const nw=L.filter(k=>!S.evFrames.includes(k));for(const k of nw)S.evFrames.push(k);cosVault();save();closeModal();
    toast(nw.length?`🖼️ Cadres restaurés : ${nw.map(k=>FRAMES[k]).join(', ')}`:'Tu as déjà ces cadres 🙂');try{render()}catch(er){}}
  catch(er){toast('Erreur, réessaie dans un instant.')}},true);
/* 5) les comptes de test (« test », « testeur »…) n'apparaissent ni dans les suggestions ni dans les classements */
const isTestAcc=d=>!!d&&/^\s*test(eur|euse|s)?\s*\d*\s*$/i.test(String(d.n||''))&&!d.rg;
{const rr=realRows;realRows=function(){return rr.apply(this,arguments).filter(r=>!isTestAcc(NET.players[r.pid]))}}
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("🛡️ Tes cadres et cosmétiques sont maintenant protégés : ils ne peuvent plus disparaître quand ta partie se synchronise entre deux appareils.")}catch(e){}
