
/* ================= Le Roi de Cendre : « Requiem des Mille Ans » + musique orchestrale ================= */
/* --- de nouveaux instruments pour sonner comme un orchestre --- */
Object.assign(INS,{
 strings(o,t,m,d,v){const c=AU.ctx,f=mtof(m),g=c.createGain(),lp=c.createBiquadFilter(),lfo=c.createOscillator(),lg=c.createGain(),end=t+d+.7;lp.type='lowpass';lp.Q.value=.5;lp.frequency.setValueAtTime(900,t);lp.frequency.linearRampToValueAtTime(2200,t+Math.min(.6,d));
  lfo.frequency.value=5.4;lg.gain.setValueAtTime(0,t);lg.gain.linearRampToValueAtTime(f*.004,t+.5);lfo.connect(lg);
  for(const dt of[-14,-5,5,14]){const s=c.createOscillator();s.type='sawtooth';s.frequency.value=f;s.detune.value=dt;lg.connect(s.frequency);s.connect(lp);s.start(t);s.stop(end)}
  lp.connect(g);g.connect(o);const a=Math.min(.35,d*.4),pk=v*.055;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(pk,t+a);g.gain.setValueAtTime(pk,t+Math.max(a,d-.05));g.gain.linearRampToValueAtTime(.0001,end);lfo.start(t);lfo.stop(end)},
 spicc(o,t,m,d,v){const c=AU.ctx,f=mtof(m),g=c.createGain(),lp=c.createBiquadFilter();lp.type='lowpass';lp.Q.value=1.2;lp.frequency.setValueAtTime(3400,t);lp.frequency.exponentialRampToValueAtTime(900,t+.15);
  for(const dt of[-8,8]){const s=c.createOscillator();s.type='sawtooth';s.frequency.value=f;s.detune.value=dt;s.connect(lp);s.start(t);s.stop(t+.24)}
  lp.connect(g);g.connect(o);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*.11,t+.008);g.gain.exponentialRampToValueAtTime(.0003,t+.2)},
 horn(o,t,m,d,v){const c=AU.ctx,f=mtof(m),g=c.createGain(),lp=c.createBiquadFilter(),end=t+d+.3;lp.type='lowpass';lp.Q.value=.8;lp.frequency.setValueAtTime(380,t);lp.frequency.linearRampToValueAtTime(1300,t+.12);lp.frequency.linearRampToValueAtTime(950,t+Math.max(.15,d));
  const s=c.createOscillator(),s2=c.createOscillator(),g2=c.createGain();s.type='sawtooth';s2.type='triangle';s.frequency.value=f;s2.frequency.value=f/2;g2.gain.value=.6;s.connect(lp);s2.connect(g2);g2.connect(lp);lp.connect(g);g.connect(o);
  const pk=v*.16;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(pk,t+.09);g.gain.linearRampToValueAtTime(pk*.85,t+Math.max(.1,d));g.gain.linearRampToValueAtTime(.0001,end);s.start(t);s2.start(t);s.stop(end);s2.stop(end)},
 taiko(o,t,m,d,v){oT(o,{t,f:105,f2:44,ft:.16,d:.55,v:v*1.05,a:.002});nT(o,{t,fl:'lowpass',f:420,q:.7,d:.18,v:v*.5,a:.002});oT(o,{t:t+.004,w:'triangle',f:210,f2:120,d:.12,v:v*.25,a:.002})},
 swell(o,t,m,d,v){nT(o,{t,fl:'highpass',f:3800,q:.4,d:Math.max(.6,d),v:v*.2,a:Math.max(.5,d*.9)})}});
/* --- « Requiem des Mille Ans » : cordes, cors, chœur, cuivres, timbales et tambours --- */
SONGS.roi={g:.92,bpm:118,spb:4,bar:16,bars:16,prog:'Dm Dm Bb Bb Gm Gm A A Dm F C Bb Gm Bb A A',parts:[
 {i:'strings',f:'chord',lo:50,v:.75},
 {i:'spicc',f:'arp',lo:50,v:.9,pat:[0,0,2,0,1,0,2,0,0,0,2,0,1,2,3,2]},
 {i:'spicc',f:'bass',lo:38,v:.9,pat:[[0,1,0],[2,1,0],[4,1,0],[6,1,0],[8,1,0],[10,1,0],[12,1,0],[14,1,7]]},
 {i:'abass',f:'bass',lo:26,v:.55,pat:[[0,6,0],[8,6,0],[14,2,7]]},
 {i:'horn',f:'mel',v:1,to:8,mel:'D4:6 A4:2 F4:4 E4:2 D4:2|C4:4 D4:4 F4:4 A4:4|Bb4:8 A4:4 G4:4|F4:12 r:4|G4:6 Bb4:2 D5:4 C5:2 Bb4:2|A4:4 Bb4:4 G4:8|A4:6 C#5:2 E5:4 G5:4|F5:4 E5:4 C#5:4 A4:4'},
 {i:'choir',f:'chord',lo:55,v:.62,from:9},
 {i:'brass',f:'mel',v:1.05,from:9,mel:'D5:4 A5:8 F5:2 E5:2|F5:4 C6:8 A5:4|G5:4 E5:4 C5:4 G5:4|F5:6 D5:2 Bb4:8|G5:4 Bb5:4 D6:8|C6:4 Bb5:4 A5:4 G5:4|A5:8 C#6:4 E6:4|D6:12 r:4'},
 {i:'horn',f:'mel',v:.7,from:9,mel:'D4:8 F4:8|F4:8 A4:8|E4:8 G4:8|D4:8 F4:8|D4:8 G4:8|F4:8 D4:8|E4:8 A4:8|A4:16'},
 {i:'bell',f:'mel',v:.3,from:9,mel:'A6:4 D7:4 F6:4 A6:4|C7:4 A6:4 F6:8|C7:4 G6:4 E6:8|Bb6:4 F6:4 D6:8|D7:4 Bb6:4 G6:8|F6:4 D6:4 Bb5:8|C#7:4 A6:4 E6:8|D7:16'},
 {i:'timp',f:'bass',lo:31,v:.75,pat:[[0,2,0],[6,1,0],[8,2,0],[12,1,7],[14,1,7],[15,1,7]]},
 {i:'taiko',f:'drum',v:.85,pat:'x..x..x...x.x...',alt:{8:'x.x.x.x.x.xxxxxx',16:'x.x.x.x.xxxxxxxx'}},
 {i:'snare',f:'drum',v:.3,pat:'....x.......x...',alt:{8:'....x...x.x.xxxx',16:'x.x.x.x.xxxxxxxx'}},
 {i:'swell',f:'drum',v:.6,pat:'',alt:{8:'........x.......',16:'........x.......'}},
 {i:'crash',f:'drum',v:.32,pat:'',alt:{1:'x',5:'x',9:'x',13:'x'}}]};
try{delete SONGC.roi}catch(e){}
{const bt=battleTheme;battleTheme=function(){try{if(B&&B.mode==='event'&&/Livre III/.test(B.sub||'')&&/Combat final/.test(B.sub||''))return'roi'}catch(e){}return bt.apply(this,arguments)}}
{const eb=evBattle;evBattle=function(){const c=SGX.go?SGX.ch:-1;const r=eb.apply(this,arguments);try{if(c>=0&&SAGA[c]&&SAGA[c].fin3&&r&&r.foes){const bs=r.foes[r.foes.length-1];bs.sk={n:'Requiem des Mille Ans',tg:'all',fx:{dmg:142,weak:1,stun:18}};bs.spd=112;r.title='👑 Éryndel, le Roi de Cendre'}}catch(e){}return r}}
/* --- l'attaque spéciale --- */
const isRoi=u=>u&&u.side===1&&/^Éryndel, le Roi de Cendre/.test(u.name||'');
function roiCutIn(){const bt=document.getElementById('battle');if(!bt)return;const sp=S.speed||1;const d=document.createElement('div');d.className='roicut';d.style.setProperty('--sp',sp);
  let young='',king='';try{young=(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"');king=(eryBody('roi')||'').replace('<svg','<svg class="loresvg hb"')}catch(e){}
  d.innerHTML=`<div class="rcu-l"><div class="rcu-fig">${young}</div><div class="rcu-film"></div><span class="rcu-era">IL Y A MILLE ANS</span></div><div class="rcu-r"><div class="rcu-fig">${king}</div><span class="rcu-era now">AUJOURD'HUI</span></div>
   <div class="rcu-split"></div><div class="rcu-ash">${[...Array(16)].map((_,i)=>`<i style="--x:${(i*6.3+3).toFixed(0)}%;--l:${(-(i%5)*.15).toFixed(2)}s"></i>`).join('')}</div>
   <div class="rcu-txt"><small>ATTAQUE DU PREMIER PORTEUR</small><b>REQUIEM<br>DES MILLE ANS</b></div>`;
  bt.appendChild(d);setTimeout(()=>d.remove(),2100/sp)}
function roiMemory(){const bt=document.getElementById('battle');if(!bt)return;const d=document.createElement('div');d.className='roimem';let y='';try{y=(eryBody('eryndel')||'').replace('<svg','<svg class="loresvg hb"')}catch(e){}
  d.innerHTML=`<div class="rm-fig">${y}</div><div class="rm-film"></div><b>« Je voulais juste qu'on se souvienne de moi… »</b>`;bt.appendChild(d);setTimeout(()=>d.remove(),1300)}
async function roiUltFx(u){fxSetup();const W=FXS.w||innerWidth,H=FXS.h||innerHeight,a=uc(u),O='#ff6a1a',Y='#ffb21a',WH='#fff2d0',A='#b8aca4';const sky={x:W/2,y:H*.14};
  roiCutIn();try{const g=sfxBus(.42,5200);if(g){const t=AU.ctx.currentTime;try{SND.boom(g,t+.05)}catch(e){}try{SND.zap(g,t+1.9)}catch(e){}try{SND.boom(g,t+3.3,1.3)}catch(e){}try{SND.boom(g,t+4.6,1.5)}catch(e){}}}catch(e){}
  await fxWait(1950);if(!B||B.skip)return;
  /* 1. la couronne s'embrase et aspire les cendres du champ de bataille */
  vignette('#0a0402',4200,.85);fxTint('#2a0e04',3800,.5);magicCircle(a.x,a.y+a.s*.45,[O,Y,A],a.s*1.35,2000,.4);chargeUp(a,[O,Y,WH],900,true);
  fxItem(1500,(g,p)=>{g.save();g.globalCompositeOperation='lighter';for(let i=0;i<48;i++){const q=i*.39+p*7,r=(1-p)*Math.max(W,H)*.6*(.4+((i*37)%60)/100);const x=sky.x+Math.cos(q)*r,y=sky.y+Math.sin(q)*r*.55;g.globalAlpha=.7*Math.min(1,p*3);g.fillStyle=i%3?A:O;g.beginPath();g.arc(x,y,2+(i%3),0,7);g.fill()}
    const rr=18+p*34;const gr=g.createRadialGradient(sky.x,sky.y,0,sky.x,sky.y,rr*2.4);gr.addColorStop(0,'rgba(255,242,208,.95)');gr.addColorStop(.4,'rgba(255,140,40,.7)');gr.addColorStop(1,'rgba(255,90,20,0)');g.fillStyle=gr;g.beginPath();g.arc(sky.x,sky.y,rr*2.4,0,7);g.fill();g.restore()});
  await fxWait(900);if(!B||B.skip)return;
  /* 2. un souvenir en vieux film traverse l'écran */
  roiMemory();flash('#f4e8c8',240,.5);await fxWait(1150);if(!B||B.skip)return;
  /* 3. l'horloge des mille ans : douze flammes s'allument autour des héros */
  const m=rowMid(0),R0=Math.min(W*.46,m.s*2.6);
  for(let i=0;i<12;i++){const q=-Math.PI/2+i*Math.PI/6,x=m.x+Math.cos(q)*R0,y=m.y+Math.sin(q)*R0*.42;fxItem(1500,(g,p)=>{if(p<0)return;const h=(16+Math.sin(p*30+i)*3)*(p<.15?p/.15:1),al=p>.85?(1-p)/.15:1;g.save();g.globalCompositeOperation='lighter';g.globalAlpha=al;
      const gr=g.createLinearGradient(x,y-h,x,y);gr.addColorStop(0,'rgba(255,242,208,.9)');gr.addColorStop(.5,'rgba(255,178,26,.9)');gr.addColorStop(1,'rgba(255,90,20,.6)');g.fillStyle=gr;g.beginPath();g.moveTo(x,y-h*1.6);g.quadraticCurveTo(x+h*.55,y-h*.3,x,y);g.quadraticCurveTo(x-h*.55,y-h*.3,x,y-h*1.6);g.fill();g.restore()},i*70)}
  fxItem(1500,(g,p)=>{g.save();g.globalAlpha=Math.min(1,p*4)*(p>.85?(1-p)/.15:1)*.7;g.strokeStyle=Y;g.lineWidth=2;g.setLineDash([6,8]);g.lineDashOffset=-p*80;g.beginPath();g.ellipse(m.x,m.y,R0,R0*.42,0,0,7);g.stroke();g.restore()});
  textPop(W/2,H*.12,'MILLE ANS DE CENDRE…',A,22,1100);
  await fxWait(1150);if(!B||B.skip)return;
  /* 4. l'épée de flammes tombe du ciel */
  const sw=Math.min(W,H)*.15,sl=H*.66;
  fxItem(1050,(g,p)=>{const hov=H*.34,e=p<.5?0:p<.8?Math.pow((p-.5)/.3,2.2):1,tipY=hov+(m.y+m.s*.2-hov)*e+(p<.5?Math.sin(p*20)*4:0);g.save();g.translate(m.x,tipY);g.globalCompositeOperation='lighter';if(p<.5)g.globalAlpha=Math.min(1,p*4);
    const gr=g.createLinearGradient(0,-sl,0,0);gr.addColorStop(0,'rgba(255,90,20,.2)');gr.addColorStop(.6,'rgba(255,178,26,.9)');gr.addColorStop(1,'rgba(255,250,230,1)');g.fillStyle=gr;
    g.beginPath();g.moveTo(0,0);g.lineTo(sw*.5,-sw*.9);g.lineTo(sw*.38,-sl*.82);g.lineTo(-sw*.38,-sl*.82);g.lineTo(-sw*.5,-sw*.9);g.closePath();g.fill();
    g.fillStyle='rgba(255,242,208,.95)';g.fillRect(-sw*1.3,-sl*.84,sw*2.6,sw*.32);g.fillStyle='rgba(255,106,26,.9)';g.fillRect(-sw*.16,-sl,sw*.32,sl*.17);
    g.globalAlpha=.5;for(let i=0;i<6;i++){g.fillStyle=i%2?'rgba(255,106,26,.7)':'rgba(255,178,26,.7)';g.beginPath();g.ellipse((i-2.5)*sw*.18,-sl*(.2+i*.1),sw*.12,sw*.5,0,0,7);g.fill()}g.restore()});
  await fxWait(840);if(!B||B.skip)return;
  /* 5. l'impact */
  flash(WH,320,.95);camPunch({x:m.x,y:m.y,s:90},1.12,480);shake(7);ringFx(m.x,m.y,Y,W*.85,950,10,.6);ringFx(m.x,m.y,O,W*.55,800,7,.6,140);ringFx(m.x,m.y,WH,W*.3,600,5,.7,60);
  crackFx(m.x,m.y+m.s*.3,O,12,W*.45,1300);
  fxItem(1400,(g,p)=>{g.save();g.globalCompositeOperation='lighter';g.translate(m.x,m.y);g.globalAlpha=.75*(1-p);for(let i=0;i<20;i++){g.rotate(Math.PI/10);g.fillStyle=i%2?Y:WH;g.beginPath();g.moveTo(0,-4);g.lineTo(Math.max(W,H)*(.2+p*.8),0);g.lineTo(0,4);g.fill()}g.restore()});
  alive(0).forEach((t,i)=>{const b=uc(t);fxWait(80+i*70).then(()=>{if(!B||B.skip)return;pillarFx(b.x,b.y,O,900,b.s*.6,H*.6);glows(b.x,b.y,[O,Y,WH],24,6,6,44);sparks(b.x,b.y,WH,18,8);ringFx(b.x,b.y,Y,b.s*1.1,620,6)})});
  textPop(W/2,H*.2,'REQUIEM DES MILLE ANS',Y,25,1900);
  await fxWait(750);if(!B||B.skip)return;
  /* 6. il ne reste que la cendre qui tombe */
  for(let i=0;i<40;i++)fxWait(i*24).then(()=>{try{shapes(Math.random()*W,-10,'star',[A,O,Y],1,2,5,90,.3)}catch(e){}});
  fxItem(1500,(g,p)=>{g.save();g.globalAlpha=(1-p)*.8;for(let i=0;i<60;i++){const x=((i*97)%W)+Math.sin(p*6+i)*12,y=((i*53)%H)*.3+p*H*.8;g.fillStyle=i%4?A:O;g.beginPath();g.arc(x,y,1.6+(i%3),0,7);g.fill()}g.restore()});
  shake(3);await fxWait(800)}
{const ci=cutIn;cutIn=async function(u){if(isRoi(u)&&!(B&&B.skip))return;return ci.apply(this,arguments)}}
{const pf=playFx;playFx=async function(u,info){if(!isRoi(u)||!B||B.skip||REDUCED)return pf.apply(this,arguments);try{await roiUltFx(u)}catch(e){console.warn('roi',e)}if(!B||B.skip)return;return pf.apply(this,arguments)}}
try{const P=PATCH.find(x=>x.v===32);if(P)P.items.push("🎻 Le combat final du Livre III a sa <b>musique orchestrale</b> (cordes, cors, chœur, cuivres, timbales, tambours) et le Roi de Cendre a son attaque spéciale, le <b>Requiem des Mille Ans</b>.")}catch(e){}
