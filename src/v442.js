/* ================= V442 : INTERFACE « NUIT D'ÉTHER » =================
   Le plus beau possible sans rien ralentir :
   · chaque quartier s'ouvre sur son décor, d'un bord à l'autre de l'écran, qui se fond dans la nuit ;
     le nom du lieu s'inscrit en lettres d'or au pied du décor, comme une arrivée dans le quartier ;
   · chaque lieu a sa pierre (rubis pour l'arène, émeraude pour les raids, saphir pour la caserne…) :
     médaillon serti d'or et lueur de la même couleur, jusque dans l'en-tête de la page du lieu ;
   · invocation : le héros en vedette en grand, dans un halo de rayons ;
   · marges plus fines sur téléphone (le corps de page gardait 8 px de marge du navigateur en plus des 16 px) ;
   · boutons en relief qui s'enfoncent sous le doigt.
   Que du CSS fixe (aucun flou d'arrière-plan) ; une seule animation ajoutée : les rayons de la bannière. */
(function(){try{
const MOB='not all and (min-width:900px) and (min-aspect-ratio:5/4)';
/* ---------- pierres des lieux : une couleur par lieu, la même sur la tuile, l'étiquette du décor et l'en-tête de la page ---------- */
const JW={'#ff6178':['arena','teams','pass','poste'],'#ffa24a':['sboss','inv','tower','vil','forgeg'],'#ffd257':['flash','rank','ach','chat'],'#4fe3a1':['raid','mk','meta','shop'],
 '#6fe8ff':['eth','mp','wb','hall'],'#73a0ff':['col','av','monde','boss'],'#b48cff':['cas','nm','dg','hw'],'#ff8ad8':['dress','amis','rose']};
const JWCSS='.lpl,.lbh,#main .lzbar{--jw:#b48cff}\n'+Object.entries(JW).map(([c,ids])=>ids.map(v=>`.lpl[data-v="${v}"],.lbh[data-v="${v}"],body[data-lz="${v}"] #main .lzbar`).join(',')+`{--jw:${c}}`).join('\n');
const BAN='#main .banner:not(.alban)';
const css=`
:root{--nx-gold:#ffd257;--nx-ivory:#f8f2ff;--nx-lav:#bdb1e3}
${JWCSS}

/* ---------- lieux : plaques émaillées ---------- */
.lpl{border:1px solid transparent!important;
 background:linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,0) 46%) padding-box,
  linear-gradient(180deg,#2c2165,#1c1546) padding-box,
  linear-gradient(180deg,rgba(255,226,150,.38),rgba(160,130,255,.16) 40%,rgba(255,255,255,.05)) border-box!important;
 box-shadow:0 10px 22px -14px #000,inset 0 1px 0 rgba(255,255,255,.07)!important;
 transition:transform .12s ease-out,filter .12s ease-out}
.lpl:active{transform:scale(.982);filter:brightness(1.12)}
.lpl .li{position:relative;box-shadow:0 0 0 2px #e6b64a,0 0 0 3.5px rgba(20,12,48,.95),0 0 0 4.5px rgba(255,230,160,.35),0 8px 14px -6px #000,inset 0 2px 0 rgba(255,255,255,.3),inset 0 -6px 10px rgba(0,0,0,.35)!important;filter:none!important}
.lpl .li::after{content:'';position:absolute;inset:3px 8px auto;height:38%;border-radius:50% 50% 45% 45%;background:linear-gradient(180deg,rgba(255,255,255,.38),rgba(255,255,255,0));pointer-events:none}
.lpl b{font-weight:900;font-size:15px!important;letter-spacing:.005em;color:var(--nx-ivory)}
.lpl small{color:var(--nx-lav)}
.lpl::after{border-color:var(--nx-gold)!important;filter:drop-shadow(0 0 4px rgba(255,210,87,.55))}
@supports (color:color-mix(in srgb,red,blue)){
 .lpl{background:radial-gradient(90px 64px at 30px 50%,color-mix(in srgb,var(--jw) 30%,transparent),transparent 72%) padding-box,
  linear-gradient(180deg,rgba(255,255,255,.075),rgba(255,255,255,0) 46%) padding-box,
  linear-gradient(180deg,#2c2165,#1c1546) padding-box,
  linear-gradient(180deg,color-mix(in srgb,var(--jw) 55%,#ffe39a),rgba(160,130,255,.16) 42%,rgba(255,255,255,.05)) border-box!important}
 .lpl .li{background:radial-gradient(circle at 50% 30%,color-mix(in srgb,var(--jw) 78%,#fff),color-mix(in srgb,var(--jw) 55%,#1a0f3a) 58%,color-mix(in srgb,var(--jw) 22%,#120a2c) 100%)!important}
 .lbh .lbl{box-shadow:0 0 0 1px color-mix(in srgb,var(--jw) 60%,transparent),0 4px 12px rgba(0,0,0,.55),inset 0 1px 0 rgba(255,255,255,.18)!important}
}

/* ---------- étiquettes sur les décors ---------- */
.lbh .lbl{background:linear-gradient(180deg,rgba(40,28,92,.92),rgba(16,10,40,.92))!important;border:1.5px solid rgba(255,214,110,.75)!important;color:#fff8e6!important;letter-spacing:.01em}

/* ---------- en-tête des quartiers ---------- */
.evh .lphase{background:linear-gradient(180deg,rgba(255,255,255,.1),rgba(255,255,255,.03))!important;border:1px solid rgba(255,255,255,.16)!important;color:#ece6ff!important;
 box-shadow:inset 0 1px 0 rgba(255,255,255,.12),0 3px 8px -4px rgba(0,0,0,.6)}
.evh .lphase.tubtn{background:linear-gradient(180deg,rgba(255,214,110,.22),rgba(255,214,110,.06))!important;border-color:rgba(255,214,110,.6)!important;color:#ffe9a8!important}

/* ---------- en-tête des pages d'un lieu : la pierre du lieu ---------- */
#main .lzbar{position:relative;overflow:hidden}
@supports (color:color-mix(in srgb,red,blue)){
 #main .lzbar{background:radial-gradient(190px 110px at 100% 0%,color-mix(in srgb,var(--jw) 30%,transparent),transparent 72%),linear-gradient(180deg,rgba(54,40,112,.94),rgba(26,18,56,.96))!important;
  border-color:color-mix(in srgb,var(--jw) 50%,rgba(255,216,74,.25))!important}
 #main .lzbar .lzt small{color:color-mix(in srgb,var(--jw) 50%,#e2d8ff)!important}
}

/* ---------- boutons en relief ---------- */
.btn.p,.btn.g{box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -3px 0 rgba(0,0,0,.16),0 7px 16px -9px rgba(0,0,0,.8)!important}
.btn.p:not(:disabled){box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -3px 0 rgba(120,60,0,.28),0 7px 18px -9px rgba(255,180,40,.75)!important}
.btn.g:not(:disabled){box-shadow:inset 0 1px 0 rgba(255,255,255,.65),inset 0 -3px 0 rgba(0,70,60,.3),0 7px 18px -9px rgba(60,230,200,.6)!important}
.btn{transition:transform .1s ease-out,filter .1s ease-out}
.btn:not(:disabled):active{transform:translateY(1.5px) scale(.985);filter:brightness(1.08)}

/* ---------- nom du quartier : lettres d'or cerclées de nuit (ombres de texte : rien à recalculer à chaque image) ---------- */
#main .stack:has(>.lobby)>div:first-child .h{color:#ffe39a!important;background:none!important;filter:none!important;
 text-shadow:0 2px 0 #241044,0 -1px 0 #241044,1.5px 0 0 #241044,-1.5px 0 0 #241044,1.5px 1.5px 0 #241044,-1.5px 1.5px 0 #241044,0 0 16px rgba(255,196,80,.32),0 7px 12px rgba(0,0,0,.55)!important}
#main .stack:has(>.lobby)>div:first-child .h>*{text-shadow:none!important}

/* ---------- couleur de chaque bannière d'invocation ---------- */
${BAN}{--bnr:#ffd84a}${BAN}.bwk{--bnr:#58e4d3}${BAN}.garban{--bnr:#ff5a6e}${BAN}.orgban{--bnr:#f0c457}${BAN}.evban:not(.garban):not(.orgban){--bnr:#ff9a3c}

/* =================== ordinateur : bannière en vedette et titres dorés =================== */
@media (min-width:900px) and (min-aspect-ratio:5/4){
 ${BAN}{grid-template-columns:minmax(0,1fr) 340px!important;position:relative;isolation:isolate;
  background:radial-gradient(70% 130% at 84% 50%,rgba(70,50,140,.95),#150f33 72%)!important}
 ${BAN}>.pt{height:330px!important;min-height:0!important;position:relative;display:grid;place-items:center}
 ${BAN}>.pt>:is(img,svg){width:272px!important;height:272px!important;max-height:none!important;border-radius:26px;object-fit:cover;
  box-shadow:0 0 0 2px var(--bnr),0 0 0 5px rgba(12,6,32,.85),0 0 0 6px rgba(255,255,255,.14),0 20px 38px -12px rgba(0,0,0,.8)}
 ${BAN}.stdban>.pt{width:230px;height:300px!important;justify-self:center;overflow:visible!important}
 ${BAN}>.pt::before{content:'';position:absolute;left:50%;top:50%;width:720px;height:720px;margin:-360px 0 0 -360px;z-index:-1;pointer-events:none;
  background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 9deg,rgba(255,255,255,.08) 9deg 12deg);
  -webkit-mask-image:radial-gradient(closest-side,#000 16%,rgba(0,0,0,.55) 42%,transparent 70%);mask-image:radial-gradient(closest-side,#000 16%,rgba(0,0,0,.55) 42%,transparent 70%);
  animation:nxrays 90s linear infinite}
 ${BAN}>.pt::after{content:'';position:absolute;left:50%;top:50%;width:340px;height:340px;margin:-170px 0 0 -170px;border-radius:50%;z-index:-1;pointer-events:none;
  background:radial-gradient(closest-side,rgba(255,236,170,.4),rgba(255,236,170,0))}
 ${BAN} .h{font-size:38px!important;line-height:1.04!important;color:transparent!important;
  background-image:linear-gradient(180deg,#fff 18%,var(--bnr) 78%)!important;-webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 2px 0 rgba(10,4,30,.9)) drop-shadow(0 0 1px rgba(10,4,30,.9))}
 @supports (color:color-mix(in srgb,red,blue)){
  ${BAN}{background:radial-gradient(70% 130% at 84% 50%,color-mix(in srgb,var(--bnr) 30%,#2a1d63),#140e30 72%)!important}
  ${BAN}>.pt::before{background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 9deg,color-mix(in srgb,var(--bnr) 30%,transparent) 9deg 12deg)}
  ${BAN}>.pt::after{background:radial-gradient(closest-side,color-mix(in srgb,var(--bnr) 55%,transparent),transparent)}
 }
 #main .stack:has(>.lobby)>div:first-child .h{font-size:32px!important}
}

/* =================== téléphone (et tablette en portrait) =================== */
@media ${MOB}{
 body{margin:0!important}
 #app{padding-inline:14px!important}

 /* le décor d'abord, d'un bord à l'autre, puis le nom du lieu */
 #main .stack:has(>.lobby)>.lobby{order:-1;margin:-6px -14px 0;border:0!important;border-radius:0!important;background:transparent!important;box-shadow:none!important;overflow:visible}
 #main .stack:has(>.lobby)>.lobby::after{display:none!important}
 #main .stack:has(>.lobby)>.lobby>img.lbimg,#main .stack:has(>.lobby)>.lobby>svg{
  -webkit-mask-image:linear-gradient(180deg,transparent 0,#000 11%,#000 70%,transparent 100%);mask-image:linear-gradient(180deg,transparent 0,#000 11%,#000 70%,transparent 100%)}
 #main .stack:has(>.lobby)>div:first-child{position:relative;z-index:3;margin-top:-58px;pointer-events:none}
 #main .stack:has(>.lobby)>div:first-child :is(button,a,.lphase){pointer-events:auto}
 #main .stack:has(>.lobby)>div:first-child .evh{display:block}
 #main .stack:has(>.lobby)>div:first-child .h{display:flex!important;flex-wrap:wrap;align-items:center;margin:0!important;font-size:30px!important;line-height:1.08!important;letter-spacing:.01em}
 #main .stack:has(>.lobby)>div:first-child .h::after{content:''!important;display:block!important;flex-basis:100%;order:1;height:0!important;width:auto!important;margin:0!important;background:none!important}
 #main .stack:has(>.lobby)>div:first-child .h .lphase{order:2}
 #main .stack:has(>.lobby)>div:first-child .plumeb{width:40px;height:40px;margin-right:4px;vertical-align:-8px}
 #main .stack:has(>.lobby)>div:first-child .lphase{margin:8px 6px 0 0!important;font-size:11.5px;padding:3px 10px}
 #main .stack:has(>.lobby)>div:first-child .h .lphase:first-of-type{margin-left:0!important}
 #main .stack:has(>.lobby)>div:first-child .sub{margin:8px 0 2px!important;color:var(--nx-lav)}

 /* invocation : le héros en vedette, en grand, dans un halo */
 ${BAN}{grid-template-columns:minmax(0,1fr)!important;position:relative;isolation:isolate;text-align:center;
  background:radial-gradient(130% 62% at 50% 24%,rgba(70,50,140,.95),#150f33 72%)!important}
 ${BAN}>.pt{order:-1;height:auto!important;min-height:0!important;position:relative;display:grid;place-items:center;padding:18px 0 14px}
 ${BAN}.stdban>.pt{width:196px;height:232px!important;justify-self:center;padding:0;margin:20px 0 10px;overflow:visible!important}
 ${BAN}.stdban .stdp{border-radius:16px}
 ${BAN}>.pt>:is(img,svg){width:226px!important;height:226px!important;max-height:none!important;border-radius:24px;object-fit:cover;
  box-shadow:0 0 0 2px var(--bnr),0 0 0 5px rgba(12,6,32,.85),0 0 0 6px rgba(255,255,255,.14),0 18px 34px -10px rgba(0,0,0,.8)}
 ${BAN}>.pt::before{content:'';position:absolute;left:50%;top:50%;width:600px;height:600px;margin:-300px 0 0 -300px;z-index:-1;pointer-events:none;
  background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 9deg,rgba(255,255,255,.09) 9deg 12deg);
  -webkit-mask-image:radial-gradient(closest-side,#000 16%,rgba(0,0,0,.55) 42%,transparent 70%);mask-image:radial-gradient(closest-side,#000 16%,rgba(0,0,0,.55) 42%,transparent 70%);
  animation:nxrays 90s linear infinite}
 ${BAN}>.pt::after{content:'';position:absolute;left:50%;top:50%;width:300px;height:300px;margin:-150px 0 0 -150px;border-radius:50%;z-index:-1;pointer-events:none;
  background:radial-gradient(closest-side,rgba(255,236,170,.42),rgba(255,236,170,0))}
 ${BAN}>.tx{padding:4px 16px 18px!important}
 ${BAN} .tag{position:static!important;transform:none!important;display:inline-block;margin:0 auto 9px;white-space:nowrap;max-width:100%;overflow:hidden;text-overflow:ellipsis;vertical-align:top;
  font-size:10.5px;letter-spacing:.06em;padding:4px 11px;border-radius:99px;background:rgba(10,6,28,.72)!important;border:1px solid rgba(255,255,255,.2)!important}
 ${BAN} .h{display:block;font-size:31px!important;line-height:1.04!important;margin:0 0 6px!important;color:transparent!important;text-wrap:balance;
  background-image:linear-gradient(180deg,#fff 18%,var(--bnr) 78%)!important;-webkit-background-clip:text;background-clip:text;
  filter:drop-shadow(0 2px 0 rgba(10,4,30,.9)) drop-shadow(0 0 1px rgba(10,4,30,.9))}
 ${BAN} .sub{margin:0 auto 12px!important;max-width:34ch}
 ${BAN} .row{justify-content:center;flex-wrap:wrap;gap:8px}
 ${BAN} .row>.btn{flex:1 1 0;min-width:0;padding-block:11px}
 ${BAN} .row>.btn:first-child:nth-last-child(3){flex-basis:100%}
 ${BAN} .muted{margin-top:10px}
 @supports (color:color-mix(in srgb,red,blue)){
  ${BAN}{background:radial-gradient(130% 62% at 50% 24%,color-mix(in srgb,var(--bnr) 34%,#2a1d63),#140e30 72%)!important}
  ${BAN}>.pt::before{background:repeating-conic-gradient(from 0deg,rgba(255,255,255,0) 0deg 9deg,color-mix(in srgb,var(--bnr) 34%,transparent) 9deg 12deg)}
  ${BAN}>.pt::after{background:radial-gradient(closest-side,color-mix(in srgb,var(--bnr) 60%,transparent),transparent)}
 }
}
@media (max-width:345px){
 #main .stack:has(>.lobby)>div:first-child .h{font-size:24.5px!important}
 #main .stack:has(>.lobby)>div:first-child .plumeb{width:32px;height:32px;margin-right:2px}
 ${BAN} .h{font-size:27px!important}
 ${BAN}>.pt>:is(img,svg){width:200px!important;height:200px!important}
}
@keyframes nxrays{to{transform:rotate(360deg)}}
@media (prefers-reduced-motion:reduce){${BAN}>.pt::before{animation:none}}
body.rdlite ${BAN}>.pt::before{animation:none}
`;
const st=document.createElement('style');st.id='v442css';st.textContent=css;document.head.appendChild(st);

/* ---------- notes de version ---------- */
try{const it=[
 "🏞️ <b>Nouvelle interface « Nuit d'Éther »</b> : chaque quartier s'ouvre sur son décor, d'un bord à l'autre de l'écran, qui se fond dans la nuit, et le nom du lieu s'écrit en lettres d'or au pied du décor.",
 "💎 Chaque lieu a sa pierre : rubis pour l'Arène, émeraude pour les raids, saphir pour la Caserne, ambre pour la Forge… Médaillons sertis d'or, et la même couleur dans l'en-tête de la page du lieu.",
 "✨ Invocation : le héros en vedette s'affiche en grand, net, dans un halo de rayons, avec les boutons d'invocation côte à côte.",
 "📱 Sur téléphone, l'écran gagne de la place (marges plus fines) et les boutons s'enfoncent sous le doigt. Le nom des quartiers ne se redessine plus à chaque image : encore un peu plus fluide."];
 PATCH.unshift({v:'v68',d:Date.now(),t:"Interface « Nuit d'Éther »",items:it});
 if(typeof I18N_EN!=='undefined'){I18N_EN["Interface « Nuit d'Éther »"]='“Aether Night” interface';
  I18N_EN[it[0]]="🏞️ <b>New “Aether Night” interface</b>: every district opens on its scenery, edge to edge, fading into the night, with the place's name written in gold at the foot of the scene.";
  I18N_EN[it[1]]="💎 Every place has its gem: ruby for the Arena, emerald for raids, sapphire for the Barracks, amber for the Forge… Gold-set medallions, and the same colour in the place's page header.";
  I18N_EN[it[2]]="✨ Summon: the featured hero is shown big and sharp in a halo of light rays, with the summon buttons side by side.";
  I18N_EN[it[3]]="📱 On phones the screen gets more room (thinner margins) and buttons press in under your finger. District names no longer redraw on every frame: a little smoother still."}}catch(e){}

/* ---------- l'en-tête d'une page de lieu connaît son lieu (pour sa couleur) ---------- */
const markPlace=()=>{try{const v=(typeof UI!=='undefined'&&UI.lz&&typeof TAB!=='undefined'&&UI.lz[TAB])||'';if(document.body.dataset.lz!==v)document.body.dataset.lz=v}catch(e){}};
try{const r0=render;render=function(){const x=r0.apply(this,arguments);markPlace();return x}}catch(e){}
markPlace();

/* ---------- invocation : le portrait en vedette est rendu en grand (768 px) au lieu de la vignette de 256 px ---------- */
try{if(typeof avSwap==='function'&&window.RDEIMG){
  const IMG=window.RDEIMG,BB=new Map();
  const put=(sv,u)=>{const i=document.createElement('img');i.src=u;i.alt=sv.getAttribute('aria-label')||'';i.className='avimg nxbig';i.draggable=false;i.decoding='async';sv.replaceWith(i)};
  const big=()=>{for(const sv of document.querySelectorAll('#main .banner>.pt>svg')){const h=sv.outerHTML;if(h.length<1500)continue;const k='B'+IMG.hash(h),u=IMG.get(k)||BB.get(k);
    if(u){put(sv,u);continue}if(BB.has(k))continue;BB.set(k,null);
    const im=new Image();im.onload=()=>{try{const c=document.createElement('canvas');c.width=c.height=768;c.getContext('2d').drawImage(im,0,0,768,768);
      c.toBlob(b=>{if(!b)return;const url=IMG.put(k,b);BB.set(k,url);
        /* la vignette provisoire déjà affichée est remplacée sur place */
        const cur=document.querySelector('#main .banner>.pt>img.avimg:not(.nxbig)');if(cur){cur.src=url;cur.classList.add('nxbig')}},'image/png')}catch(e){}};
    let s=h;if(!/xmlns=/.test(s))s=s.replace('<svg','<svg xmlns="http://www.w3.org/2000/svg"');s=s.replace(/<svg([^>]*?)>/,(m,a)=>/\bwidth=/.test(a)?m:'<svg'+a+' width="768" height="768">');
    try{if(window.RDEnoanim)s=RDEnoanim(s)}catch(e){}
    im.src=URL.createObjectURL(new Blob([s],{type:'image/svg+xml'}))}};
  const s0=avSwap;avSwap=function(root){try{big()}catch(e){}return s0.apply(this,arguments)};
}}catch(e){console.warn('v442 big',e)}
}catch(e){console.warn('v442',e)}})();
