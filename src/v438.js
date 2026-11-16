/* ================= V438 : INTERFACE — STEP UP, LA SUITE (tous les écrans) =================
   Même esprit que v437 (violet nuit + or) appliqué aux composants communs : titres, cartes, en-têtes de
   sous-page, onglets, puces, boutons, tuiles des quartiers, panoramas, barres, quêtes, fiches de héros,
   fenêtres. Que du CSS léger (pas de flou d'arrière-plan, pas d'animation en boucle sur les listes). */
(function(){try{
const css=`
/* ---------- fond : le dégradé couvre tout l'écran (plus de rectangle plus clair qui s'arrête) ---------- */
html{background:radial-gradient(120% 60% at 50% -10%,#3a2a7a 0%,transparent 60%),radial-gradient(80% 50% at 100% 100%,rgba(192,58,255,.14),transparent 60%),radial-gradient(70% 40% at 0% 70%,rgba(88,228,211,.08),transparent 60%),var(--bg)!important;background-attachment:fixed!important;min-height:100%}
body{background:transparent!important}

/* ---------- titres ---------- */
.h{background-image:linear-gradient(180deg,#fff 30%,#ffe4a8)}
.h3{color:#fff}
.h3::before{box-shadow:0 0 8px rgba(244,195,79,.55)}

/* ---------- cartes : liseré doré en haut, verre sombre ---------- */
.card{border:1px solid transparent!important;
 background:linear-gradient(160deg,rgba(255,255,255,.065),rgba(255,255,255,.012) 45%) padding-box,
  linear-gradient(var(--panel),var(--panel)) padding-box,
  linear-gradient(180deg,rgba(255,222,140,.34),rgba(170,140,255,.16) 28%,rgba(255,255,255,.05) 62%,rgba(255,255,255,.09)) border-box!important;
 box-shadow:0 12px 26px -18px #000,inset 0 1px 0 rgba(255,255,255,.05)!important}

/* ---------- en-tête de sous-page (← Retour + titre) ---------- */
#main .lzbar{padding:7px 12px 7px 7px;border-radius:18px;flex-wrap:nowrap;gap:10px;
 background:linear-gradient(180deg,rgba(54,40,112,.94),rgba(26,18,56,.96));border:1px solid rgba(255,216,74,.2);
 box-shadow:0 12px 24px -16px #000,inset 0 1px 0 rgba(255,255,255,.08)}
#main .lzbar>.btn{flex:none;border-radius:12px!important;padding:8px 11px;font-size:12px;color:#ffe3a0;
 background:rgba(255,255,255,.07)!important;border:1px solid rgba(255,255,255,.14)!important;box-shadow:none!important;white-space:nowrap}
#main .lzbar .lzt{min-width:0;font-size:19px;color:#fff;text-shadow:0 2px 0 rgba(0,0,0,.4)}
#main .lzbar .lzt small{margin-top:2px;font-size:10px;letter-spacing:.07em;text-transform:uppercase;color:#bfb3ee;text-shadow:none}

/* ---------- onglets segmentés : soulignement doré sur l'actif ---------- */
.seg button{color:#cfc6f2}
.seg button.on,.seg button[aria-selected="true"]{box-shadow:0 0 14px rgba(138,122,255,.45),inset 0 1px 0 rgba(255,255,255,.3),inset 0 -2px 0 #ffd84a!important}

/* ---------- puces / filtres ---------- */
.chip{background:rgba(255,255,255,.05);border-color:rgba(255,255,255,.13);color:#d6cef6}
.chip.on{background:linear-gradient(180deg,#ffe58a,#f4c34f 55%,#e0a22a);color:#2b1a00;border-color:#ffe9a8;
 box-shadow:0 0 12px rgba(244,195,79,.42),inset 0 1px 0 rgba(255,255,255,.55)}

/* ---------- boutons « normaux » (ni or ni turquoise) ---------- */
.btn:where(:not(.p):not(.g):not(.pro)){background:linear-gradient(180deg,#3e3283,#2a2159);border-color:rgba(255,255,255,.15)}

/* ---------- tuiles des quartiers : médaillon + flèche ---------- */
.lpl{position:relative;grid-template-columns:42px minmax(0,1fr)!important;grid-template-rows:auto auto;align-content:center;column-gap:9px!important;row-gap:3px!important;padding:11px 24px 11px 9px!important;min-height:74px}
.lpl b{align-self:end}.lpl small{align-self:start}
.lpl .li{width:42px;height:42px;border-radius:50%;display:grid;place-items:center;font-size:24px!important;
 background:radial-gradient(circle at 50% 28%,rgba(150,120,255,.5),rgba(42,28,92,.96) 70%);
 box-shadow:0 0 0 1.5px rgba(255,216,74,.5),0 6px 12px -5px #000,inset 0 2px 0 rgba(255,255,255,.18)}
.lpl b{color:#fff;font-size:14px}
.lpl::after{content:'';position:absolute;right:11px;top:50%;width:7px;height:7px;margin-top:-4px;
 border:solid rgba(255,216,74,.75);border-width:2.5px 2.5px 0 0;transform:rotate(45deg);border-radius:1px}
.lpl .pdot{top:6px;right:6px}

/* ---------- en-tête des quartiers ---------- */
.evh .lphase{background:rgba(255,255,255,.06);border-color:rgba(255,255,255,.14);color:#e2dbff}
.evh .lphase.tubtn{border-color:rgba(255,216,74,.55);color:#ffe3a0}

/* ---------- panoramas : cadre doré ---------- */
#main .lobby{border:2px solid rgba(255,216,74,.4);
 box-shadow:0 18px 40px -18px #000,0 0 0 1px rgba(0,0,0,.45),0 0 26px -8px rgba(255,216,74,.3)}

/* ---------- barres de progression & quêtes ---------- */
.bar>i{box-shadow:inset 0 1px 0 rgba(255,255,255,.35)}
.list>.card.q .bar{height:7px}
.card.q:has(.btn.p:not(:disabled)),.card.q:has(.btn.g:not(:disabled)){
 box-shadow:inset 3px 0 0 #ffd84a,0 0 18px -6px rgba(255,216,74,.55)!important}

/* ---------- fiche de héros : stats colorées ---------- */
.stats .stat{position:relative;overflow:hidden;border:1px solid rgba(255,255,255,.08)}
.stats .stat::before{content:'';position:absolute;left:0;top:9px;bottom:9px;width:3px;border-radius:0 3px 3px 0;background:var(--sc,#ffd84a);box-shadow:0 0 8px var(--sc,#ffd84a)}
.stats .stat:nth-child(1){--sc:#5ee08f}.stats .stat:nth-child(2){--sc:#ff8a5a}
.stats .stat:nth-child(3){--sc:#6aa8ff}.stats .stat:nth-child(4){--sc:#4fe0d0}
.stats .stat span{color:var(--sc);font-weight:900;letter-spacing:.05em}

/* ---------- menu latéral (PC) : point doré au lieu de l'étiquette NOUVEAU ---------- */
@media (min-width:900px) and (min-aspect-ratio:5/4){
nav.tabs .tab{position:relative}
nav.tabs .tab .tnew{font-size:0!important;padding:0!important;width:9px;height:9px;border-radius:50%;top:8px!important;right:auto!important;left:calc(50% + 10px)!important;bottom:auto!important;transform:none;
 background:#ffd84a!important;box-shadow:0 0 0 2px #1a1236,0 0 8px #ffd84a!important;animation:tnewp 1.6s ease-in-out infinite}}

/* ---------- fenêtres ---------- */
.modal{border:1px solid transparent;
 background:linear-gradient(170deg,#2a2152,#191433 60%) padding-box,
  linear-gradient(180deg,rgba(255,222,140,.42),rgba(170,140,255,.18) 26%,rgba(255,255,255,.06) 70%) border-box}
`;
const st=document.createElement('style');st.id='v438css';st.textContent=css;document.head.appendChild(st);
try{PATCH.unshift({v:'v64',d:Date.now(),t:'Interface : step up, la suite',items:[
 "✨ Tous les écrans passent au nouveau style : titres dorés, cartes avec liseré doré, en-têtes de lieux en relief, onglets soulignés d'or, filtres et boutons plus nets.",
 "🏘️ Quartiers : tuiles avec médaillon et flèche, panoramas encadrés d'or. Quêtes prêtes à réclamer mises en avant, stats des héros en couleur."]})}catch(e){}
}catch(e){console.warn('v438',e)}})();
