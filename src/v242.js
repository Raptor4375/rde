
/* ================= V24.2 : CRIS ET ONOMATOPÉES À LA ZELDA ================= */
/* chaque réplique déclenche de petits cris (« Hyah ! », « Hmm ? », « Heh heh »…) au lieu d'un babillage */
const GRVOW={a:[800,1250],e:[500,1850],i:[320,2300],o:[500,880],u:[340,800],m:[260,900]};
function gruntOne(c,dst,t,f0,o){/* o: {v1,v2,dur,up,down,breath,nasal,amp,hold} */
  const dur=o.dur,out=c.createGain();out.connect(dst);out.gain.setValueAtTime(.0001,t);
  if(o.breath){const n=c.createBufferSource();n.buffer=AU.nb;const bp=c.createBiquadFilter();bp.type='bandpass';bp.frequency.value=o.nasal?900:1700;bp.Q.value=.9;const ng=c.createGain();n.connect(bp);bp.connect(ng);ng.connect(dst);
    ng.gain.setValueAtTime(.0001,t);ng.gain.linearRampToValueAtTime(.16*o.breath,t+.02);ng.gain.exponentialRampToValueAtTime(.0001,t+.09+dur*.25);n.start(t,Math.random()*1.5);n.stop(t+.12+dur*.3)}
  const vt=t+(o.breath?.035:0);const s=c.createOscillator();s.type='sawtooth';
  s.frequency.setValueAtTime(f0*(o.start||1),vt);s.frequency.linearRampToValueAtTime(f0*(o.up||1),vt+dur*.3);s.frequency.exponentialRampToValueAtTime(f0*(o.down||.8),vt+dur);
  const vib=c.createOscillator(),vg=c.createGain();vib.frequency.value=o.vib||6;vg.gain.value=f0*(o.vibA||.012);vib.connect(vg);vg.connect(s.frequency);
  const mix=c.createGain();
  if(o.nasal){const lp=c.createBiquadFilter();lp.type='lowpass';lp.frequency.value=650;lp.Q.value=4;s.connect(lp);lp.connect(mix)}
  else{const V1=GRVOW[o.v1||'a'],V2=GRVOW[o.v2||o.v1||'a'];for(const [k,q,g] of [[0,6,1],[1,8,.6]]){const bp=c.createBiquadFilter();bp.type='bandpass';bp.Q.value=q;bp.frequency.setValueAtTime(V1[k]*(o.fs||1),vt);bp.frequency.linearRampToValueAtTime(V2[k]*(o.fs||1),vt+dur*.35);const bg=c.createGain();bg.gain.value=g*2.4;s.connect(bp);bp.connect(bg);bg.connect(mix)}}
  const ws=c.createWaveShaper();const cv=new Float32Array(256);const dr=o.grit||0;for(let i=0;i<256;i++){const x=i/128-1;cv[i]=dr?Math.tanh(x*(1+dr*4))/Math.tanh(1+dr*4):x}ws.curve=cv;mix.connect(ws);ws.connect(out);
  const A=o.amp||.32;out.gain.setValueAtTime(.0001,vt);out.gain.linearRampToValueAtTime(A,vt+.025);out.gain.setValueAtTime(A*.9,vt+dur*(o.hold||.45));out.gain.exponentialRampToValueAtTime(.0001,vt+dur);
  if(o.sub){const sb=c.createOscillator();sb.type='sine';sb.frequency.setValueAtTime(f0/2,vt);sb.frequency.exponentialRampToValueAtTime(f0/2*(o.down||.8),vt+dur);const sg=c.createGain();sg.gain.setValueAtTime(.0001,vt);sg.gain.linearRampToValueAtTime(.18,vt+.03);sg.gain.exponentialRampToValueAtTime(.0001,vt+dur);sb.connect(sg);sg.connect(dst);sb.start(vt);sb.stop(vt+dur+.05)}
  s.start(vt);vib.start(vt);s.stop(vt+dur+.05);vib.stop(vt+dur+.05);return vt+dur-t}
/* répertoire de cris */
const GRUNTS={
 hyah:[{breath:1,v1:'i',v2:'a',dur:.34,start:1.05,up:1.35,down:.82,amp:.38,grit:.35}],
 hup:[{breath:.8,v1:'u',v2:'a',dur:.14,up:1.2,down:1,amp:.32}],
 hah:[{breath:1,v1:'a',dur:.26,up:1.15,down:.75,amp:.34,grit:.2}],
 hmm:[{nasal:1,dur:.42,up:1.03,down:.92,amp:.36,vib:4,vibA:.008}],
 hmmq:[{nasal:1,dur:.36,start:.95,up:1,down:1.3,amp:.36}],
 heh:[{breath:.9,v1:'e',dur:.11,up:1.1,down:.95,amp:.3},{gap:.07,breath:.9,v1:'e',dur:.1,up:1.05,down:.9,amp:.27},{gap:.07,breath:.7,v1:'e',dur:.12,up:1,down:.8,amp:.22}],
 oh:[{breath:.5,v1:'o',dur:.3,start:.95,up:1.25,down:1.1,amp:.32}],
 hey:[{breath:.9,v1:'e',v2:'i',dur:.28,up:1.2,down:.95,amp:.34}],
 haa:[{breath:1.2,v1:'a',dur:.6,up:1,down:.7,amp:.3,hold:.3}],
 ugh:[{breath:.6,v1:'u',v2:'o',dur:.22,up:1,down:.72,amp:.36,grit:.5}],
 roar:[{breath:1.3,v1:'o',v2:'a',dur:.75,start:.9,up:1.2,down:.6,amp:.42,grit:.8,sub:1}],
 laugh:[{nasal:1,dur:.12,up:1.1,down:1,amp:.3},{gap:.05,breath:.8,v1:'a',dur:.1,up:1.15,down:1,amp:.3},{gap:.05,breath:.8,v1:'a',dur:.12,up:1.1,down:.85,amp:.26}],
 sigh:[{breath:1.4,v1:'a',v2:'o',dur:.7,up:1,down:.75,amp:.22,hold:.2}]};
function gruntsFor(h,d,k,line){const q=/\?\s*»?$/.test(line),ex=/!/.test(line),kind=d[1];
  if(k===2)return kind==='deep'&&(h.i===65||h.i===60||h.i===20)?['roar']:kind==='eerie'?['haa']:h.c==='Soutien'?['hah']:['hyah'];
  if(q)return['hmmq'];
  if(/(heh|haha|mdr|😂|…sauf|frites|sourcils|chatouill|dommage)/i.test(line)||(k===1&&(h.i%3===0)))return['laugh'];
  if(kind==='old')return k===0?['hmm']:['sigh'];
  if(kind==='eerie')return k===0?['haa']:['hmm'];
  if(kind==='deep')return k===0?['ugh']:['hmm'];
  if(kind==='young')return k===0?['hey']:['heh'];
  return k===0?(ex?['hey']:['hmm']):(ex?['hah']:['oh'])}
function gruntPlay(h,d,k,line){if(!auInit())return 0;const c=AU.ctx;if(c.state==='suspended')try{c.resume()}catch(e){}
  const g0=c.createGain();g0.gain.value=Math.max(.4,Math.min(3.2,(S.opt&&S.opt.sfx!=null?S.opt.sfx:.8)*3.2));g0.connect(AU.F.v);
  const base=VBASE[d[0]][d[1]]||150;const pf=1+((h.i*37)%11-5)*.025;let t=c.currentTime+.05;const t0=t;
  for(const name of gruntsFor(h,d,k,line))for(const p of GRUNTS[name]){t+=p.gap||0;t+=gruntOne(c,g0,t,base*pf*(name==='roar'?.8:1),{...p,fs:d[0]==='f'?1.12:d[1]==='deep'?.86:1,grit:(p.grit||0)+(d[1]==='deep'?.3:0)})}
  try{if(typeof duck==='function')duck(.45,Math.min(3,t-t0+.4))}catch(e){}
  setTimeout(()=>{try{g0.disconnect()}catch(e){}},(t-c.currentTime+1.2)*1000);return t-t0}
function heroSay(h,k,quiet){const d=VOXD[h.i];if(!d)return'';const line=d[2][k%3];const m=voxMode();
  if(m==='babble'&&!(S.opt&&S.opt.mute))gruntPlay(h,d,k%3,line);
  else if(m==='tts'&&VOX.ok&&!(S.opt&&S.opt.mute)){try{speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(line);u.lang='fr-FR';const v=voxPick(d[0]);if(v)u.voice=v;speechSynthesis.speak(u)}catch(e){}}
  const q=$('#hvq');if(q&&!quiet)typeLine(q,line,Math.min(1.2,line.length*.022));return line}
/* lettre royale sans gemmes quand la mise à jour le précise */
function updLetterCheck(){if((S.updGift||0)>=GAME_V)return;S.updGift=GAME_V;const P=PATCH[0],gm=P.nogem?0:UPD_GEMS;
  addLetter({id:'upd'+GAME_V,k:'upd',from:"Le Grand Héraut d'Éther",role:'au nom de Sa Majesté',title:`Proclamation royale · mise à jour ${P.v}`,head:"Oyez, oyez, braves sujets du Royaume d'Éther !",
    body:`Par la présente, Sa Majesté fait savoir à tous ses sujets que le royaume s'est enrichi de nouvelles merveilles, sous le titre de « ${P.t} ».\nQue chacun en prenne connaissance et en fasse bon usage :`,
    items:P.items.map(x=>x.replace(/<[^>]+>/g,'')),end:gm?`En gage de sa bienveillance et pour saluer votre fidélité, la Couronne vous fait don de ${gm} gemmes, scellées en ce pli.`:"Le trésor royal reste fermé pour cette petite mise à jour : la Couronne compte sur votre vaillance pour gagner vos gemmes au combat.",gems:gm});
  save()}
PATCH.unshift({v:24.2,d:'14 octobre 2026',t:'Hyah ! Les cris des héros',nogem:1,items:[
 "🗡️ <b>Nouvelles voix façon Zelda</b> : fini le babillage, chaque héros pousse maintenant de vrais petits cris selon sa réplique et son caractère : « Hyah ! » à l'attaque, « Hmm ? » quand il s'interroge, petits rires, soupirs des sages, grognements des colosses, rugissement du dragon et des géants.",
 "⚔️ En combat, le cri de guerre à l'ultime devient un vrai « Hyah ! ».",
 "💎 Petite mise à jour : pas de gemmes royales cette fois."]});
