
/* ================= V24.1 : VOIX JOUÉES PAR LE JEU, SON PLUS STABLE ================= */
/* ---- son plus stable : tampon plus grand, notes programmées plus tôt, pas de rafale après un ralentissement ---- */
function auInit(){
  if(AU.ok)return true;if(AU.na)return false;
  const AC=window.AudioContext||window.webkitAudioContext;if(!AC){AU.na=true;return false}
  let c;try{c=new AC({latencyHint:'balanced'})}catch(e){try{c=new AC()}catch(e2){AU.na=true;return false}}
  auBuild(c);try{AU.master.gain.value=.78}catch(e){}AU.ok=true;auApply();return true}
function musTick(){const P=AU.song;if(!P||!AU.ok||AU.ctx.state!=='running')return;const c=AU.ctx,C=P.C,now=c.currentTime;
  if(P.next<now-.02){const miss=Math.ceil((now+.06-P.next)/C.sd);P.pos=(P.pos+miss)%C.len;P.next+=miss*C.sd}
  let n=0;while(P.next<now+.5&&n<64){const evs=C.ev[P.pos];for(const e of evs){try{INS[e[0]](DRYI.has(e[0])?P.dout:P.out,P.next,e[1],e[2]*C.sd,e[3])}catch(er){}}P.next+=C.sd;P.pos=(P.pos+1)%C.len;n++}}
document.addEventListener('visibilitychange',()=>{try{if(!document.hidden&&AU.ok&&AU.song){const c=AU.ctx;AU.song.next=c.currentTime+.1}}catch(e){}});

/* ---- voix des héros : synthèse « babillage » jouée directement par le jeu ---- */
const VFORM={a:[780,1250],e:[480,1850],i:[310,2250],o:[480,880],u:[330,780],y:[300,1950],é:[430,2050],è:[560,1800],ou:[320,760],on:[500,900],an:[700,1150],in:[450,1700]};
const VBASE={m:{normal:128,deep:82,old:112,young:205,eerie:150},f:{normal:228,deep:175,old:195,young:300,eerie:205}};
function voxMode(){const v=S.opt&&S.opt.vox;return v===false?'off':v==='tts'?'tts':'babble'}
VOX.on=function(){return voxMode()!=='off'};
function babble(line,h,d){if(!auInit())return 0;const c=AU.ctx;if(c.state==='suspended')try{c.resume()}catch(e){}
  const out=AU.F.v,g0=c.createGain();g0.gain.value=Math.max(.4,Math.min(3.5,(S.opt&&S.opt.sfx!=null?S.opt.sfx:.8)*3.6));g0.connect(out);
  const kind=d[1],f0=VBASE[d[0]][kind]||150,R=rng(h.i*31+line.length),rate=kind==='deep'?.85:kind==='old'?.8:kind==='young'?1.18:kind==='eerie'?.78:1;
  const txt=line.toLowerCase().replace(/œ/g,'oe');let t=c.currentTime+.06;const t0=t;let syl=0;
  const words=txt.split(/(\s+|[,.!?…;:])/).filter(Boolean);const total=(txt.match(/[aeiouyéèêàâîïôûù]+/g)||[]).length||1;
  for(const w of words){if(/^\s+$/.test(w)){t+=.035/rate;continue}if(/^[,;:]$/.test(w)){t+=.13/rate;continue}if(/^[.!?…]$/.test(w)){t+=.24/rate;continue}
    const parts=w.match(/[^aeiouyéèêàâîïôûù]*[aeiouyéèêàâîïôûù]+/g)||[];for(const p of parts){if(syl>34)break;
      const cons=p.replace(/[aeiouyéèêàâîïôûù]+$/,''),vw=p.slice(cons.length);
      let key=vw.normalize('NFD').replace(/[̀-ͯ]/g,'');if(/é|ê/.test(vw))key='é';else if(/è/.test(vw))key='è';if(/ou/.test(key))key='ou';key=VFORM[key]?key:key[0];if(!VFORM[key])key='a';
      const F=VFORM[key],prog=syl/total,q=/\?/.test(line)&&prog>.75?1.25:/!/.test(line)?1.08:1,ff=f0*(1+.12*Math.sin(syl*1.7)+(R()-.5)*.08)*q*(prog>.85&&!/\?/.test(line)?.9:1);
      const dur=(.075+R()*.035)/rate;
      if(cons){const last=cons[cons.length-1];if(/[sfzxjç]|ch/.test(cons)){const n=c.createBufferSource();n.buffer=AU.nb;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=/[sz]/.test(last)?5000:2600;const ng=c.createGain();n.connect(hp);hp.connect(ng);ng.connect(g0);ng.gain.setValueAtTime(.0001,t);ng.gain.linearRampToValueAtTime(.05,t+.012);ng.gain.linearRampToValueAtTime(.0001,t+.05/rate);n.start(t,R()*1.5);n.stop(t+.06/rate);t+=.035/rate}
        else if(/[ptkbdgq]/.test(last)){const n=c.createBufferSource();n.buffer=AU.nb;const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=/[pb]/.test(last)?900:/[td]/.test(last)?3200:1800;bp.Q.value=1.2;const ng=c.createGain();n.connect(bp);bp.connect(ng);ng.connect(g0);ng.gain.setValueAtTime(.09,t);ng.gain.exponentialRampToValueAtTime(.0001,t+.02);n.start(t,R()*1.5);n.stop(t+.03);t+=.015/rate}}
      const o=c.createOscillator();o.type=kind==='eerie'?'triangle':'sawtooth';o.frequency.setValueAtTime(ff,t);o.frequency.linearRampToValueAtTime(ff*(1+(R()-.5)*.1),t+dur);
      if(kind==='old'||kind==='eerie'){const l=c.createOscillator(),lg=c.createGain();l.frequency.value=kind==='old'?5.5:7;lg.gain.value=ff*(kind==='old'?.025:.05);l.connect(lg);lg.connect(o.frequency);l.start(t);l.stop(t+dur+.02)}
      const mix=c.createGain();mix.gain.setValueAtTime(.0001,t);mix.gain.linearRampToValueAtTime(kind==='deep'?.22:.17,t+.012);mix.gain.setValueAtTime(kind==='deep'?.2:.15,t+dur*.6);mix.gain.exponentialRampToValueAtTime(.0001,t+dur);mix.connect(g0);
      for(const [fr,qv,gv] of [[F[0]*(kind==='deep'?.85:d[0]==='f'?1.12:1),7,1],[F[1]*(kind==='deep'?.85:d[0]==='f'?1.15:1),9,.7]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=fr;bp.Q.value=qv;const bg=c.createGain();bg.gain.value=gv*2.2;o.connect(bp);bp.connect(bg);bg.connect(mix)}
      if(kind==='deep'){const sub=c.createOscillator();sub.type='sine';sub.frequency.value=ff/2;const sg=c.createGain();sg.gain.setValueAtTime(.0001,t);sg.gain.linearRampToValueAtTime(.1,t+.015);sg.gain.exponentialRampToValueAtTime(.0001,t+dur);sub.connect(sg);sg.connect(g0);sub.start(t);sub.stop(t+dur+.02)}
      o.start(t);o.stop(t+dur+.02);t+=dur*.92;syl++}}
  try{if(typeof duck==='function')duck(.4,Math.min(4,t-t0+.4))}catch(e){}
  setTimeout(()=>{try{g0.disconnect()}catch(e){}},(t-c.currentTime+1)*1000);
  return t-t0}
function typeLine(el,line,dur){if(!el)return;clearInterval(el._ty);const full='« '+line+' »';if(!dur||REDUCED){el.textContent=full;return}let i=2;el.textContent='« ';const step=Math.max(12,dur*1000/line.length);el._ty=setInterval(()=>{i++;el.textContent=full.slice(0,i)+(i<full.length-2?'':'');if(i>=full.length){clearInterval(el._ty);el.textContent=full}},step)}
function heroSay(h,k,quiet){const d=VOXD[h.i];if(!d)return'';const line=d[2][k%3];const m=voxMode();let dur=0;
  if(m==='babble'&&!(S.opt&&S.opt.mute))dur=babble(line,h,d);
  else if(m==='tts'&&VOX.ok&&!(S.opt&&S.opt.mute)){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(line);u.lang='fr-FR';const v=voxPick(d[0]);if(v)u.voice=v;const P={normal:[1,1],deep:[.45,.88],old:[.7,.86],young:[1.45,1.12],eerie:[.8,.82]}[d[1]]||[1,1];u.pitch=Math.max(.1,Math.min(2,P[0]*(d[0]==='f'?1.18:.95)));u.rate=P[1];speechSynthesis.speak(u)}catch(e){}}
  const q=$('#hvq');if(q&&!quiet)typeLine(q,line,dur);return line}
/* bouton : Voix du jeu → Synthèse du téléphone → Muet */
function voxLabel(){const m=voxMode();return m==='off'?'🔇 Voix':m==='tts'?'🗣️ Synthèse':'🔊 Voix'}
function addVoxToggle(m){if(m.querySelector('.voxtg'))return;m.querySelector('.hvstage').insertAdjacentHTML('beforeend',`<button class="voxtg" data-a="voxtg2" aria-label="Changer le type de voix">${voxLabel()}</button>`)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t)return;const a=t.dataset.a;
  if(a==='hsay'){e.stopImmediatePropagation();const id=+t.dataset.v,h=HEROES[id];VOX.i[id]=((VOX.i[id]||0)+1)%3;heroSay(h,VOX.i[id]);const b=t.closest('.hvbub')||document.querySelector('.hvbub');if(b){b.classList.remove('pop');void b.offsetWidth;b.classList.add('pop')}}
  else if(a==='voxtg2'){e.stopImmediatePropagation();const o=OPT(),m=voxMode();o.vox=m==='babble'?'tts':m==='tts'?false:true;save();try{if(VOX.ok)speechSynthesis.cancel()}catch(er){}
    if(o.vox==='tts'&&(!VOX.ok||!VOX.voices.length))toast("La synthèse vocale n'est pas disponible sur cet appareil, la voix du jeu reste active.");if(o.vox==='tts'&&(!VOX.ok||!VOX.voices.length))o.vox=false;
    t.textContent=voxLabel();toast(voxMode()==='off'?'Voix des héros coupées':voxMode()==='tts'?'Voix : synthèse du téléphone':'Voix : voix du jeu');const id=+(($('.hvbub')||{}).dataset||{}).v;if(!isNaN(id)&&voxMode()!=='off')heroSay(HEROES[id],VOX.i[id]||0)}},true);
PATCH.unshift({v:24.1,d:'14 octobre 2026',t:'Les héros parlent pour de vrai',items:[
 "🗣️ <b>Voix des héros réparées</b> : la synthèse vocale du téléphone ne marchait pas dans l'appli. Les héros parlent maintenant avec une voix créée par le jeu lui-même (comme dans les jeux d'aventure), différente pour chacun : grave et lente pour les colosses, vibrante pour les sages, aiguë et rapide pour les jeunes, étrange pour les spectres. La réplique s'écrit au rythme de la voix.",
 "🔊 Le bouton de la fiche passe de « Voix du jeu » à « Synthèse » (si ton téléphone la gère) puis « Muet ».",
 "🎧 <b>Son plus stable</b> : tampon audio plus grand, notes programmées plus tôt et plus de rafale de notes après un ralentissement. Les petits craquements et décalages devraient disparaître."]});
