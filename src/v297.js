
/* ================= mode histoire : stabilité, musique de Corvin, attaque spéciale de Corvin, Aléa style héros jouable ================= */
/* --- Aléa dessiné comme un vrai héros jouable (même moteur que les héros) --- */
const ALEA_LOOK=['#ece2f4','#2a1a3a','#3a1252','#f4ecf8','#6a2a9a','#c07aff','bg:cards back:cape+cards hb:long hair:side hat:cavalier eyes:glow mouth:smirk body:suit ear:human prop:dice'];
let ALEA_BODY=null;
function aleaHeroBody(){if(ALEA_BODY)return ALEA_BODY;let s='';try{const n=LOOKS.length;LOOKS[200]=ALEA_LOOK;s=heroBody({i:200,n:'Aléa',c:'Assassin',r:4,sk:{n:'Coup de Poker',tg:'one',fx:{dmg:100}}},0);delete LOOKS[200];LOOKS.length=n}catch(e){s=''}
  if(!s)return'';const O='#140c24';
  const mask=`<g class="almask"><path d="M80 30Q69 30 67 40Q68 48 80 51Z" fill="#fbf6ff" stroke="${O}" stroke-width="1.2"/><path d="M80 30Q91 30 93 40Q92 48 80 51Z" fill="#140c24" stroke="${O}" stroke-width="1.2"/><path d="M80 30V51" stroke="#ffd84a" stroke-width="1.3"/>
   <path d="M70 39Q73.5 36.5 77 39Q73.5 41 70 39Z" fill="#140c24"/><circle cx="73.5" cy="39" r="1" fill="#c07aff"/><path d="M83 39Q86.5 36.5 90 39Q86.5 41 83 39Z" fill="#c07aff"><animate attributeName="fill" values="#c07aff;#ffffff;#c07aff" dur="2s" repeatCount="indefinite"/></path>
   <path d="M88 42Q89 46 88 49" stroke="#d1263b" stroke-width="1.1" fill="none"/><path d="M70 34q3 -2 6 0" stroke="#ffd84a" stroke-width=".8" fill="none"/></g>`;
  const orbit=[0,1,2].map(i=>`<g><rect x="-5" y="-7" width="10" height="14" rx="1.5" fill="#fff" stroke="${O}" stroke-width=".9"/><text y="3" font-size="8" text-anchor="middle" fill="${i===1?'#d1263b':O}">${['♣','♥','♠'][i]}</text><animateMotion dur="6s" begin="${-i*2}s" repeatCount="indefinite" path="M80 120m-62 0a62 20 0 1 0 124 0a62 20 0 1 0 -124 0"/></g>`).join('');
  ALEA_BODY=s.replace(/<\/svg>\s*$/,mask+orbit+'</svg>');return ALEA_BODY}
function aleaSVG(){const b=aleaHeroBody();if(b)return b.replace('<svg','<svg class="loresvg hb"');return''}
/* --- musique sombre et épique contre Corvin --- */
SONGS.corvin={g:1.12,bpm:104,spb:4,bar:16,bars:8,prog:'Cm Ab Eb Bb Cm Ab Fm G',parts:[
 {i:'choir',f:'chord',lo:55,v:.62},
 {i:'organ',f:'chord',lo:43,v:.42},
 {i:'abass',f:'bass',lo:31,v:.7,pat:[[0,1,0],[2,1,0],[3,1,0],[6,1,0],[8,1,0],[10,1,0],[11,1,0],[14,1,7]]},
 {i:'brass',f:'mel',v:.95,mel:'C5:6 D5:2 Eb5:4 G5:4|Ab5:8 G5:4 F5:4|G5:6 Bb5:2 G5:4 Eb5:4|D5:12 r:4|C5:2 Eb5:2 G5:4 C6:4 Bb5:4|Ab5:4 C6:4 Eb6:8|D6:4 C6:4 Ab5:4 F5:4|G5:8 B5:4 D6:4'},
 {i:'bell',f:'mel',v:.3,mel:'C6:16|Eb6:16|G6:16|Bb5:16|C6:16|Ab6:16|F6:16|B5:16'},
 {i:'timp',f:'bass',lo:31,v:.7,pat:[[0,2,0],[4,2,0],[8,2,0],[12,1,7],[14,2,7]]},
 {i:'kick',f:'drum',v:.55,pat:'x..x..x.x..x..x.'},
 {i:'snare',f:'drum',v:.45,pat:'....x.......x..x'},
 {i:'hat',f:'drum',v:.4,pat:'x.x.x.x.x.x.x.x.'},
 {i:'crash',f:'drum',v:.4,pat:'',alt:{1:'x',3:'x',5:'x',7:'x'}}]};
try{delete SONGC.corvin}catch(e){}
{const bt=battleTheme;battleTheme=function(){if(B&&B.mode==='event'&&/Combat final/.test(B.sub||''))return'corvin';if(B&&B.mode==='event'&&/Mode histoire/.test(B.sub||''))return'boss';return bt.apply(this,arguments)}}
/* --- l'attaque spéciale de Corvin : « Éclipse du Néant » --- */
function corvinCutIn(){const bt=document.getElementById('battle');if(!bt)return;const d=document.createElement('div');d.className='cvcut';d.innerHTML=`<div class="cvstripes"></div><div class="cvfig">${corvinUltSVG()}</div><div class="cvtxt"><small>ATTAQUE SPÉCIALE</small><b>ÉCLIPSE<br>DU NÉANT</b></div><div class="cvfeathers">${[...Array(10)].map((_,i)=>`<i style="left:${(i*10+Math.random()*8).toFixed(0)}%;animation-delay:${(Math.random()*.5).toFixed(2)}s"></i>`).join('')}</div>`;bt.appendChild(d);setTimeout(()=>d.remove(),1500)}
async function corvinUltFx(u){fxSetup();const W=FXS.w||innerWidth,H=FXS.h||innerHeight,a=uc(u);const P='#ff5a8a',V='#8a3aff';const sun={x:W/2,y:H*.3};
  corvinCutIn();try{const g=sfxBus(.4,5000);if(g){const t=AU.ctx.currentTime;try{SND.boom(g,t+.05)}catch(e){}try{SND.zap(g,t+1.5)}catch(e){}try{SND.boom(g,t+2.6)}catch(e){}}}catch(e){}
  await fxWait(1150);if(!B||B.skip)return;
  vignette('#12001e',3000,.88);fxTint('#2a0040',2800,.5);magicCircle(a.x,a.y+a.s*.45,[P,V],a.s*1.25,1800,.36);chargeUp(a,[P,V,'#ffffff'],800,true);
  fxItem(3000,(g,p)=>{const r=Math.min(1,p*2.2)*Math.min(W,H)*.13,rot=p*6;g.save();g.translate(sun.x,sun.y);
    g.globalCompositeOperation='lighter';for(let i=0;i<16;i++){g.rotate(Math.PI/8);g.globalAlpha=.25*Math.sin(p*Math.PI);g.fillStyle=i%2?P:V;g.beginPath();g.moveTo(r*.9,-4);g.lineTo(r*(2.2+.4*Math.sin(rot+i)),0);g.lineTo(r*.9,4);g.fill()}
    g.globalCompositeOperation='source-over';g.globalAlpha=Math.min(1,p*3)*(1-Math.max(0,p-.9)*10);const gr=g.createRadialGradient(0,0,r*.6,0,0,r*1.35);gr.addColorStop(0,'#05020a');gr.addColorStop(.75,'#05020a');gr.addColorStop(.85,P);gr.addColorStop(1,'rgba(138,58,255,0)');g.fillStyle=gr;g.beginPath();g.arc(0,0,r*1.35,0,7);g.fill();
    g.strokeStyle='#ffd0e0';g.lineWidth=2;g.globalAlpha*=.8;g.beginPath();g.arc(0,0,r*.98,rot,rot+4.2);g.stroke();g.restore()});
  fxItem(2400,(g,p)=>{const k=Math.sin(Math.min(1,p*1.6)*Math.PI/2);const fade=p<.75?1:1-(p-.75)/.25;g.save();g.globalAlpha=.6*fade;for(const sd of [-1,1]){const ex=a.x+sd*W*.6*k,ey=a.y-H*.12*k;g.fillStyle='#0a0414';g.beginPath();g.moveTo(a.x,a.y);g.quadraticCurveTo(a.x+sd*W*.25*k,a.y-H*.42*k,ex,ey);
    for(let i=1;i<=5;i++){const t=i/5,x=ex+(a.x-ex)*t,y=ey+(a.y+8-ey)*t;g.quadraticCurveTo(x-sd*10,y+22*k,x,y)}g.closePath();g.fill();g.strokeStyle=sd>0?P:V;g.lineWidth=2;g.globalAlpha=.5*fade;g.stroke();g.globalAlpha=.6*fade}g.restore()},200);
  for(let i=0;i<22;i++){const x=Math.random()*W,dl=Math.random()*1200,sz=6+Math.random()*7,sp=(1.2+Math.random())*H;fxItem(1600,(g,p)=>{g.save();g.translate(x+Math.sin(p*6+i)*30,-20+p*sp);g.rotate(p*4+i);g.globalAlpha=.9*(1-p);g.fillStyle=i%3?'#1a0a2a':P;g.beginPath();g.ellipse(0,0,sz*.35,sz,0,0,7);g.fill();g.strokeStyle=V;g.lineWidth=1;g.stroke();g.restore()},dl)}
  await fxWait(1100);if(!B||B.skip)return;
  const T=alive(0);for(const t of T){const b=uc(t);beamFx(sun,b,P,14,620);boltFx(sun,b,'#c070ff',620,3,true);glowPulse(b.x,b.y,V,500,b.s*.6)}
  textPop(W/2,H*.18,'ÉCLIPSE DU NÉANT',P,34,1600);await fxWait(560);if(!B||B.skip)return;
  flash('#ffffff',300,.85);shake(5);camPunch({x:W/2,y:H*.55,s:90},1.09,420);ringFx(sun.x,sun.y,V,W*.6,900,9,.6);ringFx(sun.x,sun.y,P,W*.4,700,6,.6,120);
  for(const t of T){const b=uc(t);crackFx(b.x,b.y+b.s*.35,P,8,b.s*1.1,1000);ringFx(b.x,b.y,P,b.s*.9,620,6);glows(b.x,b.y,[P,V,'#ffffff'],22,6,6,42);smoke(b.x,b.y,6,'#1a0a2a',22,60);pillarFx(b.x,b.y,V,700,b.s*.5,H*.5)}
  await fxWait(700)}
{const pf=playFx;playFx=async function(u,info){if(!u||u.side!==1||!/^Corvin/.test(u.name||'')||!B||B.skip||REDUCED)return pf.apply(this,arguments);try{await corvinUltFx(u)}catch(e){}if(!B||B.skip)return;return pf.apply(this,arguments)}}
/* --- stabilité du mode histoire --- */
function sagaMode(on){document.body.classList.toggle('sgmode',!!on)}
{const so=sagaOpen;sagaOpen=function(c,part){try{const old=document.getElementById('sgov');if(old)old.remove();clearInterval(SGP.typing)}catch(e){}if(B)return;sagaMode(true);return so.apply(this,arguments)}}
{const sc=sagaClose;sagaClose=function(){const r=sc.apply(this,arguments);sagaMode(!!document.getElementById('sgcine'));return r}}
{const ci=sagaCinematic;sagaCinematic=function(done){if(B)return;sagaMode(true);try{musicWant('corvin')}catch(e){}ci.call(this,()=>{sagaMode(false);done&&done()});setTimeout(()=>{try{musicWant('corvin')}catch(e){}},60)}}
const SAGA_SCENE=[1,2,11,7,8,6,8,9];
function sagaBattle(c){if(B)return;SGX.ch=c;SGX.go=true;SGX.active=false;try{closeModal();startBattle('event')}catch(e){SGX.active=false}finally{SGX.go=false}
  if(!B){SGX.active=false;toast("Ajoute des héros à ton équipe Aventure !");return}
  try{const bt=document.getElementById('battle');const sc=bt&&bt.firstElementChild;if(sc&&!sc.classList.contains('bw')){const tmp=document.createElement('div');tmp.innerHTML=sceneHTML(SAGA_SCENE[c]||1);const n=tmp.firstElementChild;if(n)sc.replaceWith(n)}}catch(e){}}
