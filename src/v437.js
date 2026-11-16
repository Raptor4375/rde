/* ================= V437 : INTERFACE — UN VRAI « STEP UP » =================
   Même esprit (violet nuit + or), finition plus pro : barre du haut en verre, menu du bas avec onglet actif
   en relief, et un écran de combat retravaillé (en-tête, camps, VS, cartes, barres, journal, victoire). */
(function(){try{
const css=`
/* ---------- barre du haut ---------- */
@media (max-width:899px),(max-aspect-ratio:5/4){
header.top{padding:8px 10px!important;gap:6px!important;background:transparent!important}
header.top::before{content:'';position:absolute;inset:5px 4px 3px;border-radius:20px;z-index:-1;
 background:linear-gradient(180deg,rgba(50,36,104,.94),rgba(24,16,52,.96));border:1px solid rgba(255,216,74,.22);
 box-shadow:0 12px 26px -14px rgba(0,0,0,.85),inset 0 1px 0 rgba(255,255,255,.10),inset 0 -1px 0 rgba(0,0,0,.35)}
header.top .lav{width:34px!important;height:34px!important;border-radius:12px!important;border:2px solid #ffd84a!important;box-shadow:0 0 0 2px #1a1236,0 0 14px -3px #ffd84a}
header.top .cur{height:34px;padding:3px 6px 3px 4px!important;border-radius:999px!important;font-size:12.5px!important;min-width:0;
 background:linear-gradient(180deg,rgba(8,5,20,.72),rgba(36,24,72,.72))!important;border:1px solid rgba(255,255,255,.12)!important;
 box-shadow:inset 0 2px 5px rgba(0,0,0,.55),0 1px 0 rgba(255,255,255,.06)!important}
header.top .cur svg{filter:drop-shadow(0 1px 3px rgba(0,0,0,.5))}
header.top .logo{margin-right:auto;flex:none}
header.top .logo>span:last-child{display:none!important}
header.top .cur span{overflow:visible}
header.top .cur{flex:0 0 auto!important;width:auto!important;max-width:none!important}
header.top{justify-content:flex-end}
header.top .cur .plus{display:grid!important;width:16px;height:16px;font-size:12px;flex:none;background:linear-gradient(180deg,#ffe58a,#f0a020)!important;color:#3a1e00!important;box-shadow:0 2px 6px rgba(240,160,32,.45);margin-left:2px}
header.top .gear{width:34px!important;height:34px!important;border-radius:13px!important;
 background:linear-gradient(180deg,#43337f,#271c55)!important;border:1px solid rgba(255,255,255,.14)!important;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.14),0 4px 10px -5px rgba(0,0,0,.7)!important;font-size:17px}
header.top .gear:active,header.top .cur:active{transform:translateY(1px)}
header.top .mbdg{position:absolute;top:-4px;right:-4px;min-width:17px;height:17px;border-radius:9px;font-size:10px;font-style:normal;font-weight:900;display:grid;place-items:center;padding:0 4px;background:linear-gradient(180deg,#ff6a7a,#e0243c);color:#fff;box-shadow:0 0 0 2px #1a1236}
/* ---------- menu du bas ---------- */
nav.tabs{background:linear-gradient(180deg,#281c56,#0e0a20)!important;border-top:1px solid rgba(255,216,74,.22)!important;
 box-shadow:0 -12px 30px -12px rgba(0,0,0,.8),inset 0 1px 0 rgba(255,255,255,.07)!important}
nav.tabs .tab{padding:8px 0 9px!important;gap:3px;color:#a99ed6;transition:color .2s}
nav.tabs .tab svg{width:22px!important;height:22px!important;transition:transform .25s cubic-bezier(.3,1.6,.5,1)}
nav.tabs .tab.on::before{display:none!important}
nav.tabs .tab.on{color:#ffe58a!important}
nav.tabs .tab.on::after{content:'';position:absolute;inset:4px 0 4px;border-radius:15px;z-index:-1;
 background:radial-gradient(120% 100% at 50% 0%,rgba(255,216,74,.30),rgba(138,90,255,.20) 60%,rgba(138,90,255,.06));
 border:1px solid rgba(255,216,74,.38);box-shadow:0 0 16px -5px rgba(255,216,74,.7),inset 0 1px 0 rgba(255,255,255,.12)}
nav.tabs .tab.on svg{transform:translateY(-2px) scale(1.1)}
nav.tabs .tab .tnew{font-size:0!important;padding:0!important;width:8px;height:8px;border-radius:50%;top:6px!important;right:auto!important;left:calc(50% - 17px);
 background:#ffd84a!important;box-shadow:0 0 0 2px #1a1236,0 0 8px #ffd84a!important;animation:tnewp 1.6s ease-in-out infinite}
@keyframes tnewp{50%{transform:scale(1.3)}}
nav.tabs .tab .dot{border-color:#1a1236!important;box-shadow:0 0 6px rgba(255,77,106,.7)}
}
@media (max-width:419px){header.top .cur .plus{display:none!important}}
@media (max-width:379px){header.top .cur{font-size:11.5px!important;padding-right:8px!important}header.top .cur svg{width:16px!important;height:16px!important}header.top{gap:4px!important}header.top .gear{width:32px!important;height:32px!important}}
@media (max-width:339px){header.top::before{left:0!important;right:0!important}header.top .cur svg{width:14px!important;height:14px!important}header.top{gap:3px!important;padding-left:8px!important;padding-right:8px!important}header.top .gear{width:28px!important;height:28px!important;border-radius:10px!important}header.top .gear svg,header.top .gear img{width:16px!important;height:16px!important}header.top .logo .lav{width:30px!important;height:30px!important;flex:none}header.top .cur{height:30px;font-size:11px!important;padding:2px 7px 2px 3px!important}}
/* ---------- combat ---------- */
#battle .bh{padding:8px 10px;border-radius:16px;background:linear-gradient(180deg,rgba(44,32,92,.88),rgba(18,12,40,.88));
 border:1px solid rgba(255,216,74,.22);box-shadow:0 10px 24px -14px #000,inset 0 1px 0 rgba(255,255,255,.08)}
#battle .bh .t{font-size:18px;color:#fff3c4;text-shadow:0 2px 0 rgba(0,0,0,.45)}
#battle .bh .t small{color:#bdb2e8;font-size:11px;margin-top:2px}
#battle .bh .bboss{display:inline-block;margin-left:6px;font-family:var(--fb);font-size:10px;font-weight:900;letter-spacing:.12em;padding:2px 7px;border-radius:7px;vertical-align:3px;
 background:linear-gradient(135deg,#ff5a6a,#b0122a);color:#fff;box-shadow:0 0 12px -2px #ff4a5a;text-shadow:none}
#battle .bh .btn.sm{height:32px;padding:0 11px;border-radius:11px;font-size:12px;background:linear-gradient(180deg,#43337f,#271c55);
 border:1px solid rgba(255,255,255,.16);box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 3px 8px -4px #000;color:#f2ecff}
#battle .bh [data-a=skip]{background:linear-gradient(180deg,#ffe58a,#e8a21a)!important;color:#3a1e00!important;border-color:#ffd84a!important;box-shadow:0 0 12px -4px #ffd84a!important}
#battle .bh{position:relative;padding-bottom:12px!important}
#battle .bprog{position:absolute;left:14px;right:14px;bottom:4px;height:4px;border-radius:4px;background:rgba(0,0,0,.45);overflow:hidden;margin:0;box-shadow:inset 0 1px 2px rgba(0,0,0,.6)}
#battle .bprog i{display:block;height:100%;width:0;border-radius:4px;background:linear-gradient(90deg,#8a5aff,#ffd84a);box-shadow:0 0 8px #ffd84a;transition:width .5s}
#battle .side{position:relative;padding:30px 8px 10px;border-radius:18px;display:flex!important;justify-content:center;gap:7px}
#battle .side>.u{flex:0 1 calc((100% - 28px)/5);min-width:0}
#battle .side.one>.u{flex:0 1 200px}
#battle .side.foe{background:linear-gradient(180deg,rgba(255,60,90,.13),rgba(255,60,90,.02) 80%);border:1px solid rgba(255,100,120,.2)}
#battle .side:not(.foe){background:linear-gradient(0deg,rgba(255,216,74,.12),rgba(255,216,74,.02) 80%);border:1px solid rgba(255,216,74,.2)}
#battle .side::before{content:'ENNEMIS';position:absolute;top:5px;left:12px;font-size:9px;font-weight:900;letter-spacing:.16em;color:rgba(255,150,160,.9)}
#battle .side:not(.foe)::before{content:'TON ÉQUIPE';color:rgba(255,226,140,.95)}
#battle .side.one{grid-template-columns:minmax(0,200px)}
@media (min-width:900px) and (min-aspect-ratio:5/4){#battle .side>.u{flex:0 1 calc((100vh - 270px) / 3.4)}#battle .side.one>.u{flex:0 1 min(200px,calc((100vh - 270px) / 3.4))}#battle .side{padding-top:24px}#battle .bw>.blogh{grid-column:2;grid-row:2;align-self:start;margin:0;position:relative;z-index:3;border-bottom:1px solid rgba(255,255,255,.08);border-radius:16px 16px 0 0}#battle .bw>.log{padding-top:30px}}
#battle .vs{position:relative;font-size:0!important;height:20px;margin:-2px 0}
#battle .vs::before{content:'';position:absolute;left:6%;right:6%;top:50%;height:1px;background:linear-gradient(90deg,transparent,rgba(255,216,74,.55),transparent)}
#battle .vs::after{content:'VS';position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) rotate(-5deg);font-family:var(--fd);font-size:14px;letter-spacing:.04em;
 color:#2a1600;background:linear-gradient(135deg,#fff0a8,#f0a020);padding:1px 11px;border-radius:9px;box-shadow:0 0 16px -2px #ffd84a,0 0 0 2px #1a1236}
#battle .u .un{text-align:center;font-size:10px;letter-spacing:0;text-shadow:none!important;filter:drop-shadow(0 1px 0 rgba(0,0,0,.55));hyphens:manual!important;-webkit-hyphens:manual!important;overflow-wrap:break-word}
#battle .u .bar.hp{height:7px!important;border:1px solid rgba(0,0,0,.5)}
#battle .u .hp>i{background:linear-gradient(180deg,#9affc0,#1fb463)!important}
#battle .u .hp>i.lo{background:linear-gradient(180deg,#ff9a9a,#d1253a)!important;animation:hplo .8s ease-in-out infinite alternate}
@keyframes hplo{to{filter:brightness(1.35)}}
#battle .u .bar.en{height:5px!important;margin-top:3px}
#battle .u .en>i{background:linear-gradient(90deg,#2ab8ff,#9aeaff)!important}
#battle .u .en::before{content:'';position:absolute;inset:0;z-index:2;pointer-events:none;background:repeating-linear-gradient(90deg,transparent 0 calc(25% - 1px),rgba(8,5,20,.95) calc(25% - 1px) 25%)}
#battle .u.ulti .en>i{background:linear-gradient(90deg,#ffe58a,#ffb21a)!important;box-shadow:0 0 8px #ffd84a}
#battle .u.ulti:not(.dead){box-shadow:0 0 0 1.5px #ffd84a,0 0 18px -3px #ffd84a,0 8px 18px -10px #000!important}
#battle .u.ulti:not(.dead) .pt{animation:ultip 1.1s ease-in-out infinite alternate}
@keyframes ultip{to{filter:brightness(1.18) saturate(1.15)}}
#battle .u.dead{opacity:.32!important;filter:grayscale(1) brightness(.8)!important}
#battle .log{border-radius:0 0 16px 16px!important;padding:6px 8px 8px!important;position:relative;border-top:0!important;
 background:linear-gradient(180deg,rgba(24,16,52,.82),rgba(10,6,24,.82))!important;border:1px solid rgba(255,255,255,.1)!important;
 -webkit-mask-image:linear-gradient(180deg,#000 85%,transparent);mask-image:linear-gradient(180deg,#000 85%,transparent);gap:3px!important;font-size:12px!important}
#battle .blogh{margin:0 0 -10px;padding:6px 12px 4px;border-radius:16px 16px 0 0;font-size:9px;font-weight:900;letter-spacing:.16em;color:#b9aee8;background:rgba(24,16,52,.9);border:1px solid rgba(255,255,255,.1);border-bottom:0}
#battle .log>div{padding:4px 8px;border-radius:9px;background:rgba(255,255,255,.035);border-left:2px solid rgba(255,255,255,.12);line-height:1.35}
#battle .log>div.sk{border-left-color:#ffd84a;background:linear-gradient(90deg,rgba(255,216,74,.12),rgba(255,216,74,.02))}
#battle .log>div.cs{border-left-color:var(--r4)}
#battle .log>div.ba{border-left-color:rgba(138,90,255,.45)}
/* fin de combat */
#battle .result .modal{position:relative;overflow:hidden;border-radius:22px!important;border:1px solid rgba(255,216,74,.35)!important;
 background:radial-gradient(120% 80% at 50% 0%,rgba(255,216,74,.18),transparent 60%),linear-gradient(180deg,#2c2060,#140e2e)!important;box-shadow:0 24px 60px -20px #000,0 0 40px -12px rgba(255,216,74,.5)!important}
#battle .result.rlose .modal{border-color:rgba(255,100,120,.35)!important;background:radial-gradient(120% 80% at 50% 0%,rgba(255,80,100,.16),transparent 60%),linear-gradient(180deg,#2a1838,#120a1e)!important;box-shadow:0 24px 60px -20px #000!important}
#battle .result .modal::before{content:'';position:absolute;left:50%;top:-60px;width:320px;height:320px;transform:translateX(-50%);pointer-events:none;opacity:.5;
 background:repeating-conic-gradient(from 0deg,rgba(255,216,74,.22) 0 8deg,transparent 8deg 22deg);-webkit-mask-image:radial-gradient(circle,#000 20%,transparent 65%);mask-image:radial-gradient(circle,#000 20%,transparent 65%);animation:rrays 14s linear infinite}
#battle .result.rlose .modal::before{display:none}
@keyframes rrays{to{transform:translateX(-50%) rotate(360deg)}}
#battle .result .modal>*{position:relative}
#battle .result .modal .h{font-size:34px!important;letter-spacing:.02em;background:linear-gradient(180deg,#fff6c8,#ffd84a 55%,#e08a10);-webkit-background-clip:text;background-clip:text;color:transparent!important;filter:drop-shadow(0 3px 0 rgba(0,0,0,.45))}
#battle .result.rlose .modal .h{background:linear-gradient(180deg,#ffd0d6,#ff6a7a 60%,#b0122a);-webkit-background-clip:text;background-clip:text}
#battle .result .modal .rw>span{background:linear-gradient(180deg,rgba(255,255,255,.08),rgba(0,0,0,.25))!important;border:1px solid rgba(255,255,255,.14)!important;border-radius:14px!important;box-shadow:inset 0 1px 0 rgba(255,255,255,.1)}
#battle .result .rstars{display:flex;justify-content:center;gap:6px;margin:-4px 0 8px;font-size:22px}
#battle .result .rstars i{font-style:normal;color:#ffd84a;filter:drop-shadow(0 0 8px #ffd84a);animation:rstar .5s cubic-bezier(.3,1.8,.5,1) both}
#battle .result .rstars i:nth-child(2){animation-delay:.12s;font-size:28px}#battle .result .rstars i:nth-child(3){animation-delay:.24s}
@keyframes rstar{from{transform:scale(0) rotate(-40deg);opacity:0}}
`;
const st=document.createElement('style');st.id='v437css';st.textContent=css;document.head.appendChild(st);
/* --- combat : chip « BOSS », barre de progression des tours --- */
const upTitle=()=>{try{const t=document.querySelector('#battle .bh .t');if(!t||t.querySelector('.bboss'))return;const n=t.firstChild;
  if(n&&n.nodeType===3&&/·\s*Boss\s*$/i.test(n.nodeValue)){n.nodeValue=n.nodeValue.replace(/\s*·\s*Boss\s*$/i,'');t.insertBefore(Object.assign(document.createElement('span'),{className:'bboss',textContent:'BOSS'}),n.nextSibling)}}catch(e){}};
const upProg=()=>{try{const r=document.getElementById('rnd'),bh=document.querySelector('#battle .bh');if(!r||!bh)return;let p=document.querySelector('#battle .bprog');
  if(!p){bh.insertAdjacentHTML('beforeend','<div class="bprog" aria-hidden="true"><i></i></div>');p=document.querySelector('#battle .bprog')}
  const m=/(\d+)\s*\/\s*(\d+)/.exec(r.textContent);if(m)p.firstChild.style.width=Math.min(100,(+m[1])/(+m[2])*100)+'%'}catch(e){}};
let mo=null;
const hook=()=>{upTitle();upProg();try{const l=document.getElementById('log');if(l&&!document.querySelector('#battle .blogh'))l.insertAdjacentHTML('beforebegin','<div class="blogh">📜 JOURNAL DU COMBAT</div>')}catch(e){}try{const r=document.getElementById('rnd');if(r){if(mo)mo.disconnect();mo=new MutationObserver(upProg);mo.observe(r,{childList:true,characterData:true,subtree:true})}}catch(e){}};
{const sb=startBattle;startBattle=function(){const r=sb.apply(this,arguments);try{hook()}catch(e){}return r}}
/* --- l'ultime prêt fait briller la carte --- */
{const ru=refreshUnits;refreshUnits=function(){const r=ru.apply(this,arguments);try{if(B)for(const u of B.units){const el=document.getElementById('u-'+u.key);if(el)el.classList.toggle('ulti',u.hp>0&&(u.en||0)>=100)}}catch(e){}return r}}
/* --- écran de fin : victoire / défaite --- */
{const f0=finish;finish=function(res){const r=f0.apply(this,arguments);try{setTimeout(()=>{const x=document.querySelector('#battle .result');if(!x)return;x.classList.add(res===true?'rwin':'rlose');
  const m=x.querySelector('.modal');if(m&&res===true&&!m.querySelector('.rstars')){const h=m.querySelector('.h');if(h)h.insertAdjacentHTML('afterend','<div class="rstars" aria-hidden="true"><i>★</i><i>★</i><i>★</i></div>')}},0)}catch(e){}return r}}
try{PATCH.unshift({v:'v63',d:Date.now(),t:'Interface : step up',items:[
 "✨ Nouvelle barre du haut (en verre, ressources en relief) et nouveau menu du bas (onglet actif mis en avant, petits points dorés pour les nouveautés au lieu des étiquettes NOUVEAU).",
 "⚔️ Écran de combat retravaillé : en-tête avec badge BOSS et barre des tours, camps « Ennemis » / « Ton équipe », grand VS, barres de vie et d'énergie plus lisibles, carte qui brille quand l'ultime est prêt, journal du combat plus compact, et un écran de victoire qui en jette."]})}catch(e){}
}catch(e){console.warn('v437',e)}})();
