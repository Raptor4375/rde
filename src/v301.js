
/* ================= Livre II : Umbra se transforme en Astre Dévorant ================= */
function umbraUltBody(){const O='#140c24',S0=`stroke="${O}" stroke-width="1.6" stroke-linejoin="round"`,G='#ffd84a',V='#9a6aff',K='#e8dcf8';
 const star=(x,y,r,c=G)=>`<path d="M${x} ${y-r}Q${x+r*.18} ${y-r*.18} ${x+r} ${y}Q${x+r*.18} ${y+r*.18} ${x} ${y+r}Q${x-r*.18} ${y+r*.18} ${x-r} ${y}Q${x-r*.18} ${y-r*.18} ${x} ${y-r}Z" fill="${c}"/>`;
 const R=rng(4242);const dots=(n,x0,x1,y0,y1)=>[...Array(n)].map(()=>`<circle cx="${(x0+R()*(x1-x0)).toFixed(1)}" cy="${(y0+R()*(y1-y0)).toFixed(1)}" r="${(.5+R()*1.1).toFixed(1)}" fill="#fff6dc"><animate attributeName="opacity" values="1;.2;1" dur="${(1.2+R()*2.4).toFixed(1)}s" repeatCount="indefinite"/></circle>`).join('');
 return`<defs><linearGradient id="umD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#14082e"/><stop offset=".55" stop-color="#2e1470"/><stop offset=".85" stop-color="#7a4ae0"/><stop offset="1" stop-color="#c8a8ff" stop-opacity="0"/></linearGradient><linearGradient id="umH" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2a1a6a"/><stop offset=".7" stop-color="#0e0626"/><stop offset="1" stop-color="#4a2a9a" stop-opacity=".2"/></linearGradient><radialGradient id="umG" cx="50%" cy="45%" r="55%"><stop offset="0" stop-color="#ffd84a" stop-opacity=".5"/><stop offset=".5" stop-color="#9a6aff" stop-opacity=".28"/><stop offset="1" stop-color="#9a6aff" stop-opacity="0"/></radialGradient><radialGradient id="umS" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#ffd84a"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient><linearGradient id="umW" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#ffd84a" stop-opacity="0"/><stop offset="1" stop-color="#ffe9a0" stop-opacity=".55"/></linearGradient></defs>
 <circle cx="70" cy="92" r="80" fill="url(#umG)"><animate attributeName="r" values="74;86;74" dur="3.4s" repeatCount="indefinite"/></circle>
 <g><path d="M62 90Q34 46 4 34Q20 58 14 66Q34 70 56 100Z M60 104Q28 106 4 132Q28 124 32 132Q46 118 60 112Z" fill="url(#umW)" stroke="${G}" stroke-width=".9"/><path d="M78 90Q106 46 136 34Q120 58 126 66Q106 70 84 100Z M80 104Q112 106 136 132Q112 124 108 132Q94 118 80 112Z" fill="url(#umW)" transform="scale(-1 1) translate(-140 0)" stroke="${G}" stroke-width=".9"/>
  <path d="M60 92L12 46M58 100L10 72M60 108L12 126M80 92L128 46M82 100L130 72M80 108L128 126" stroke="#fff6dc" stroke-width=".6" opacity=".7"/>
  <animateTransform attributeName="transform" type="scale" values="1 1;1.04 .98;1 1" dur="3.8s" repeatCount="indefinite" additive="sum"/></g>
 <g transform="translate(70 50)"><g>${[...Array(12)].map((_,i)=>`<path d="M-3 -28L0 -${i%2?44:52}L3 -28Z" fill="${G}" opacity="${i%2?.55:.85}" transform="rotate(${i*30})"/>`).join('')}<animateTransform attributeName="transform" type="rotate" from="0" to="360" dur="18s" repeatCount="indefinite"/></g>
  <circle r="28" fill="none" stroke="${G}" stroke-width="2.6"/><circle r="24" fill="#05020a" opacity=".92"/><circle r="24" fill="none" stroke="${V}" stroke-width="1.2"><animate attributeName="r" values="22;26;22" dur="2.4s" repeatCount="indefinite"/></circle></g>
 <path d="M52 52Q40 96 34 150Q42 172 36 198Q56 184 70 192Q84 184 104 198Q98 172 106 150Q100 96 88 52Q70 40 52 52Z" fill="url(#umH)" ${S0}/>${dots(14,40,100,70,190)}
 <path d="M52 100Q44 150 28 202Q50 192 70 206Q90 192 112 202Q96 150 88 100Q70 94 52 100Z" fill="url(#umD)" ${S0}/>${dots(16,40,100,110,195)}
 <path d="M50 150L60 132L72 164L86 128L92 150" stroke="#fff6dc" stroke-width=".7" fill="none" opacity=".6"/><path d="M38 180Q70 170 102 180" stroke="${G}" stroke-width="1.6" fill="none" opacity=".8"/>
 <path d="M56 100Q54 86 62 80H78Q86 86 84 100Q70 106 56 100Z" fill="#2a1460" ${S0}/><path d="M62 80L70 96L78 80" stroke="${G}" stroke-width="1.6" fill="none"/><path d="M56 100Q70 106 84 100" stroke="${G}" stroke-width="2" fill="none"/>
 <circle cx="70" cy="92" r="4.5" fill="url(#umS)"><animate attributeName="r" values="3.5;6;3.5" dur="1.6s" repeatCount="indefinite"/></circle>${star(70,92,3,'#fff')}
 <rect x="66" y="68" width="8" height="13" fill="${K}" ${S0}/>
 <path d="M60 84Q46 70 36 54" stroke="#1e0e48" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M60 84Q46 70 36 54" stroke="${G}" stroke-width=".8" fill="none" stroke-dasharray="2 4"/><circle cx="35" cy="51" r="4.6" fill="${K}" ${S0}/>
 <g><circle cx="31" cy="38" r="9" fill="url(#umS)"><animate attributeName="r" values="7;11;7" dur="1.8s" repeatCount="indefinite"/></circle>${star(31,38,7,'#fff6dc')}<animateTransform attributeName="transform" type="translate" values="0 0;0 -3;0 0" dur="2.6s" repeatCount="indefinite"/></g>
 <path d="M80 84Q94 98 104 112" stroke="#1e0e48" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="106" cy="114" r="4.6" fill="${K}" ${S0}/>
 ${[0,1,2].map(i=>`<g>${star(0,0,2.6+i*.4,i===1?'#c8a8ff':G)}<animateMotion dur="${3+i}s" begin="${-i}s" repeatCount="indefinite" path="M106 114m-11 0a11 6 0 1 0 22 0a11 6 0 1 0 -22 0"/></g>`).join('')}
 <ellipse cx="70" cy="58" rx="12.5" ry="14" fill="${K}" ${S0}/>
 <path d="M61 57Q64.5 54 68 57Q64.5 59 61 57ZM72 57Q75.5 54 79 57Q75.5 59 72 57Z" fill="${G}"><animate attributeName="fill" values="#ffd84a;#ffffff;#ffd84a" dur="2s" repeatCount="indefinite"/></path><path d="M60 54.5q4 -2.6 8.5 0M71.5 54.5q4.5 -2.6 8.5 0" stroke="${O}" stroke-width="1" fill="none"/>
 <path d="M66.5 65Q70 67 73.5 65" stroke="#8a4a9a" stroke-width="1.2" fill="none"/><path d="M70 46l2 3.5l-2 3.5l-2 -3.5Z" fill="#05020a" stroke="${V}" stroke-width=".8"/>
 <path d="M57 58Q55 40 70 38Q85 40 83 58Q80 46 70 46Q60 46 57 58Z" fill="#2a1a6a" ${S0}/><path d="M57 56Q52 70 54 84M83 56Q88 70 86 84" stroke="#2a1a6a" stroke-width="4" fill="none" stroke-linecap="round"/>
 <path d="M58 42Q70 30 82 42Q76 38 70 38Q64 38 58 42Z" fill="${G}" ${S0}/>${star(70,30,5)}${star(60,35,2.4)}${star(80,35,2.4)}
 <path d="M70 26a6 6 0 1 0 6 6a4.6 4.6 0 1 1 -6 -6Z" fill="${G}" opacity=".9"/>
 ${[0,1,2,3,4,5].map(i=>`<g>${star(0,0,2+i%3,i%2?G:'#fff6dc')}<animateMotion dur="${6+i}s" begin="${-i*1.1}s" repeatCount="indefinite" path="M70 100m-${54+i*3} 0a${54+i*3} 22 0 1 0 ${108+i*6} 0a${54+i*3} 22 0 1 0 -${108+i*6} 0"/></g>`).join('')}
 ${[0,1,2,3,4].map(i=>`<circle cx="${50+i*10}" cy="206" r="1.4" fill="#ffe9a0"><animate attributeName="cy" values="206;170" dur="${2+i*.5}s" repeatCount="indefinite"/><animate attributeName="opacity" values="1;0" dur="${2+i*.5}s" repeatCount="indefinite"/></circle>`).join('')}`}
function umbraUltSVG(){return`<svg viewBox="0 0 140 210" class="loresvg" aria-hidden="true">${umbraUltBody()}</svg>`}
MONS['Umbra, Astre Dévorant']=()=>`<rect width="100" height="100" fill="#0a0418"/><g transform="translate(-20 -4)">${umbraUltBody()}</g>`;
SAGA_WHO.umbrau={n:"Umbra, l'Astre Dévorant",c:'#ffd84a'};
{const sf=sagaFig;sagaFig=function(w){if(w==='umbrau')return`<div class="sgfig lore">${umbraUltSVG()}</div>`;return sf.apply(this,arguments)}}
(function(){const C=SAGA[13];C.boss={n:'Umbra, Astre Dévorant',h:45,st:100};const i=C.intro.findIndex(l=>l&&l.ch);
 C.intro.splice(i+2,0,['umbra',"Vous souvenir de moi ? Personne ne s'est jamais souvenu de moi ! Alors regardez ce que je suis devenue…"],['narr',"Umbra ouvre la bouche. Toutes les étoiles qu'elle a dévorées depuis la nuit des temps remontent de son ventre… et l'enveloppent d'une lumière aveuglante."]);
 const sw=L=>L.map(l=>Array.isArray(l)&&l[0]==='umbra'?['umbrau',l[1]]:l);C.outroA=sw(C.outroA);C.outroB=sw(C.outroB);
 const lc=LORE_CHARS.find(x=>x.k==='umbra');if(lc)lc.d+=" Pour le dernier combat, elle libère toutes les étoiles qu'elle a dévorées et devient l'Astre Dévorant : un halo de soleil noir, une robe de nuit étoilée et des ailes de lumière.";})();
{const lf=loreFig;loreFig=function(k){if(k==='umbra'&&SG().done[13])return umbraUltSVG();return lf.apply(this,arguments)}}
/* --- la cinématique de transformation --- */
function umbraCinematic(done){let o=document.getElementById('sgcine');if(o)o.remove();o=document.createElement('div');o.id='sgcine';o.className='um';o.setAttribute('role','dialog');o.setAttribute('aria-label','Cinématique');
 const R=rng(77);o.innerHTML=`<div class="cn-bg"></div><div class="um-stars">${[...Array(26)].map((_,i)=>{const a=R()*6.283,d=60+R()*40;return`<i style="--x:${(Math.cos(a)*d).toFixed(0)}vmin;--y:${(Math.sin(a)*d).toFixed(0)}vmin;animation-delay:${(R()*1.6).toFixed(2)}s"></i>`}).join('')}</div>
  <div class="cn-vortex"><svg viewBox="-100 -100 200 200">${[...Array(8)].map((_,i)=>`<path d="M0 0Q${40+i*9} -${30+i*8} ${82+i*5} 0" stroke="${i%2?'#ffd84a':'#9a6aff'}" stroke-width="${7-i*.6}" fill="none" opacity="${.85-i*.08}" transform="rotate(${i*45})"/>`).join('')}<circle r="22" fill="#05020a"/></svg></div>
  <div class="cn-old"><svg viewBox="0 0 100 100">${MONS["Umbra, Mangeuse d'Étoiles"]()}</svg></div>
  <div class="cn-orb"><svg viewBox="-50 -50 100 100"><circle r="34" fill="#05020a" stroke="#ffd84a" stroke-width="3"/>${[0,1,2,3,4,5,6,7].map(i=>`<path class="cn-crack" d="M0 0L${(34*Math.cos(i*.785)).toFixed(1)} ${(34*Math.sin(i*.785)).toFixed(1)}" stroke="#fff6dc" stroke-width="2.4" style="animation-delay:${2.6+i*.09}s"/>`).join('')}</svg></div>
  <div class="cn-flash"></div><div class="um-halo"></div><div class="cn-new">${umbraUltSVG()}</div><div class="cn-bolts"><i></i><i></i><i></i></div>
  <div class="cn-title"><small>LA MANGEUSE D'ÉTOILES S'ÉVEILLE</small><b>UMBRA</b><span>L'Astre Dévorant</span><em>« Toutes les étoiles que j'ai dévorées brillent pour moi, maintenant ! »</em></div>
  <button class="btn pro cn-go">✨ Affronter l'Astre Dévorant</button><button class="cn-skip">Passer ⏭</button>`;
 document.body.appendChild(o);try{const g=sfxBus(.35,6000);if(g){const t=AU.ctx.currentTime;[0,2.6,3.4].forEach(d=>{try{SND.boom(g,t+d)}catch(e){}});try{SND.zap(g,t+1.2)}catch(e){}try{SND.chimes(g,t+3.6,8)}catch(e){}}}catch(e){}
 const fin=()=>{o.remove();sagaMode(false);done&&done()};o.querySelector('.cn-go').onclick=e=>{e.stopPropagation();fin()};o.querySelector('.cn-skip').onclick=e=>{e.stopPropagation();fin()}}
{const pe=sagaPartEnd;sagaPartEnd=function(){const c=SGP.ch;if(SGP.part==='intro'&&SAGA[c]&&SAGA[c].fin2&&!B){sagaClose();sagaMode(true);try{musicWant('umbra')}catch(e){}umbraCinematic(()=>sagaBattle(c));setTimeout(()=>{try{musicWant('umbra')}catch(e){}},60);return}return pe.apply(this,arguments)}}
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(c>=0&&SAGA[c]&&SAGA[c].fin2&&r&&r.foes){const bs=r.foes[r.foes.length-1];bs.sk={n:'Supernova Dévorante',tg:'all',fx:{dmg:140,weak:1,stun:15}};bs.spd=112;r.title='✨ Umbra, Astre Dévorant'}}catch(e){}return r}}
/* --- son attaque spéciale : « Supernova Dévorante » --- */
function umbraCutIn(){const bt=document.getElementById('battle');if(!bt)return;const d=document.createElement('div');d.className='cvcut umc';d.innerHTML=`<div class="cvstripes"></div><div class="cvfig">${umbraUltSVG()}</div><div class="cvtxt"><small>ATTAQUE DIVINE</small><b>SUPERNOVA<br>DÉVORANTE</b></div><div class="cvfeathers">${[...Array(12)].map((_,i)=>`<i style="left:${(i*8+Math.random()*8).toFixed(0)}%;animation-delay:${(Math.random()*.5).toFixed(2)}s"></i>`).join('')}</div>`;bt.appendChild(d);setTimeout(()=>d.remove(),1500)}
async function umbraUltFx(u){fxSetup();const W=FXS.w||innerWidth,H=FXS.h||innerHeight,a=uc(u);const G='#ffd84a',V='#9a6aff',hole={x:W/2,y:H*.28};
  umbraCutIn();try{const g=sfxBus(.4,5000);if(g){const t=AU.ctx.currentTime;try{SND.boom(g,t+.05)}catch(e){}try{SND.zap(g,t+1.4)}catch(e){}try{SND.boom(g,t+2.7)}catch(e){}try{SND.chimes(g,t+2.75,10)}catch(e){}}}catch(e){}
  await fxWait(1150);if(!B||B.skip)return;
  vignette('#04021a',3200,.9);fxTint('#0a0430',2900,.55);magicCircle(a.x,a.y+a.s*.45,[G,V],a.s*1.3,1800,.36);chargeUp(a,[G,V,'#ffffff'],800,true);
  /* le trou noir aspire la lumière des héros */
  fxItem(1500,(g,p)=>{const r=Math.min(1,p*2)*Math.min(W,H)*.11;g.save();g.translate(hole.x,hole.y);g.globalCompositeOperation='lighter';for(let i=0;i<3;i++){g.globalAlpha=.5*(1-p*.5);g.strokeStyle=i%2?V:G;g.lineWidth=3-i*.6;g.beginPath();g.ellipse(0,0,r*(1.6+i*.35),r*(.5+i*.12),p*4+i,0,7);g.stroke()}g.globalCompositeOperation='source-over';g.globalAlpha=1;g.fillStyle='#05020a';g.beginPath();g.arc(0,0,r,0,7);g.fill();g.strokeStyle=G;g.lineWidth=2;g.beginPath();g.arc(0,0,r,0,7);g.stroke();g.restore()});
  for(const t of alive(0)){const b=uc(t);for(let i=0;i<14;i++){const dl=i*60,ox=(Math.random()-.5)*b.s*.6,oy=(Math.random()-.5)*b.s*.6;fxItem(700,(g,p)=>{if(p<0)return;const e=p*p,x=b.x+ox+(hole.x-b.x-ox)*e,y=b.y+oy+(hole.y-b.y-oy)*e;g.globalCompositeOperation='lighter';g.globalAlpha=1-p*.6;g.fillStyle=i%2?G:'#fff6dc';g.beginPath();g.arc(x,y,3*(1-p*.5),0,7);g.fill()},dl)}}
  await fxWait(1250);if(!B||B.skip)return;
  /* la supernova */
  flash('#fff6dc',380,.9);fxItem(1500,(g,p)=>{const r=Math.min(W,H)*(.08+p*.9);g.save();g.globalCompositeOperation='lighter';const gr=g.createRadialGradient(hole.x,hole.y,0,hole.x,hole.y,r);gr.addColorStop(0,'rgba(255,255,255,'+(1-p)+')');gr.addColorStop(.3,'rgba(255,216,74,'+(.8*(1-p))+')');gr.addColorStop(.7,'rgba(154,106,255,'+(.5*(1-p))+')');gr.addColorStop(1,'rgba(154,106,255,0)');g.fillStyle=gr;g.beginPath();g.arc(hole.x,hole.y,r,0,7);g.fill();
    g.globalAlpha=.7*(1-p);g.translate(hole.x,hole.y);for(let i=0;i<16;i++){g.rotate(Math.PI/8);g.fillStyle=i%2?G:'#fff';g.beginPath();g.moveTo(0,-3);g.lineTo(r*1.1,0);g.lineTo(0,3);g.fill()}g.restore()});
  ringFx(hole.x,hole.y,G,W*.7,900,9,.6);ringFx(hole.x,hole.y,V,W*.45,700,6,.6,120);shake(5);textPop(W/2,H*.16,'SUPERNOVA DÉVORANTE',G,32,1700);
  const T=alive(0);T.forEach((t,i)=>{const b=uc(t);fxWait(120+i*90).then(()=>{if(!B||B.skip)return;fxItem(420,(g,p)=>{const x=hole.x+(b.x-hole.x)*p,y=hole.y+(b.y-hole.y)*p;g.save();g.globalCompositeOperation='lighter';g.strokeStyle=G;g.lineWidth=6;g.globalAlpha=.8;g.beginPath();g.moveTo(x-(b.x-hole.x)*.15,y-(b.y-hole.y)*.15);g.lineTo(x,y);g.stroke();g.fillStyle='#fff';g.beginPath();g.arc(x,y,7,0,7);g.fill();g.restore()});
    fxWait(400).then(()=>{if(!B||B.skip)return;pillarFx(b.x,b.y,G,800,b.s*.55,H*.55);crackFx(b.x,b.y+b.s*.35,V,8,b.s*1.1,1000);ringFx(b.x,b.y,G,b.s,620,6);glows(b.x,b.y,[G,V,'#ffffff'],22,6,6,42);sparks(b.x,b.y,'#fff6dc',16,7)})})});
  await fxWait(700);if(!B||B.skip)return;camPunch({x:W/2,y:H*.55,s:90},1.09,420);flash(G,260,.6);shake(4);
  for(let i=0;i<20;i++)fxWait(i*30).then(()=>{try{shapes(Math.random()*W,-10,'star',[G,'#fff6dc'],1,2,6,80,.3)}catch(e){}});
  await fxWait(700)}
{const pf=playFx;playFx=async function(u,info){if(!u||u.side!==1||!/^Umbra, Astre/.test(u.name||'')||!B||B.skip||REDUCED)return pf.apply(this,arguments);try{await umbraUltFx(u)}catch(e){}if(!B||B.skip)return;return pf.apply(this,arguments)}}
/* --- sa musique : « Hymne de l'Astre Dévorant » --- */
SONGS.umbra={g:1.12,bpm:108,spb:4,bar:16,bars:8,prog:'Dm Bb F C Gm Bb A A',parts:[
 {i:'choir',f:'chord',lo:55,v:.66},
 {i:'organ',f:'chord',lo:43,v:.4},
 {i:'abass',f:'bass',lo:31,v:.7,pat:[[0,1,0],[2,1,0],[3,1,0],[6,1,0],[8,1,0],[10,1,0],[11,1,0],[14,1,7]]},
 {i:'brass',f:'mel',v:.95,mel:'D5:6 E5:2 F5:4 A5:4|Bb5:8 A5:4 F5:4|C6:6 A5:2 F5:4 C5:4|E5:12 r:4|D5:2 F5:2 Bb5:4 D6:4 C6:4|Bb5:4 D6:4 F6:8|E6:4 C#6:4 A5:4 G5:4|A5:8 C#6:4 E6:4'},
 {i:'bell',f:'mel',v:.34,mel:'D6:4 A6:4 F6:4 A6:4|D6:4 F6:4 Bb6:8|C6:4 F6:4 A6:8|E6:4 G6:4 C7:8|D6:4 G6:4 Bb6:8|F6:4 Bb6:4 D7:8|E6:4 A6:4 C#7:8|A6:16'},
 {i:'timp',f:'bass',lo:31,v:.7,pat:[[0,2,0],[4,2,0],[8,2,0],[12,1,7],[14,2,7]]},
 {i:'kick',f:'drum',v:.55,pat:'x..x..x.x..x..x.'},
 {i:'snare',f:'drum',v:.45,pat:'....x.......x..x'},
 {i:'hat',f:'drum',v:.4,pat:'x.x.x.x.x.x.x.x.'},
 {i:'crash',f:'drum',v:.4,pat:'',alt:{1:'x',3:'x',5:'x',7:'x'}}]};
try{delete SONGC.umbra}catch(e){}
{const bt=battleTheme;battleTheme=function(){try{if(B&&B.mode==='event'&&/Livre II/.test(B.sub||'')&&/Combat final/.test(B.sub||''))return'umbra'}catch(e){}return bt.apply(this,arguments)}}
{const ci=cutIn;cutIn=async function(u){if(u&&u.side===1&&/^Umbra, Astre/.test(u.name||'')&&!(B&&B.skip))return;return ci.apply(this,arguments)}}
