
/* ================= fluidité : images de héros figées, vieux film plus léger, orchestre plus léger ================= */
/* 1) Les héros dessinés en image (chargement, dialogues) : on retire leurs petites animations internes,
      invisibles à cette taille mais coûteuses (décors des légendaires, horloges, braises…). */
const BTIC=new Map();
function svgStill(s){return String(s).replace(/<animate(Transform|Motion)?\b[^>]*\/>/g,'').replace(/<animate(Transform|Motion)?\b[^>]*>[\s\S]*?<\/animate(Transform|Motion)?>/g,'')}
btImg=function(id,u){const k=id+'_'+(u||0);let v=BTIC.get(k);if(v)return v;try{v='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svgStill(heroBody(HEROES[id],u)))}catch(e){v=''}BTIC.set(k,v);return v};
/* 2) Vieux film : pendant un souvenir, le décor et les personnages s'arrêtent de bouger (le filtre sépia n'a plus à
      être recalculé à chaque image), et le grain ne se mélange plus avec un mode coûteux. */
{const ss=sagaShow;sagaShow=function(){const r=ss.apply(this,arguments);try{const o=document.getElementById('sgov');if(o){const fb=o.classList.contains('fbmode');o.querySelectorAll('svg').forEach(s=>{try{if(fb)s.pauseAnimations();else s.unpauseAnimations()}catch(e){}})}}catch(e){}return r}}
/* 3) Orchestre plus léger pour les téléphones (moins d'oscillateurs par note, même son général). */
INS.strings=function(o,t,m,d,v){const c=AU.ctx,f=mtof(m),g=c.createGain(),lp=c.createBiquadFilter(),end=t+d+.6;lp.type='lowpass';lp.Q.value=.5;lp.frequency.setValueAtTime(1000,t);lp.frequency.linearRampToValueAtTime(2200,t+Math.min(.6,d));
  for(const dt of[-10,10]){const s=c.createOscillator();s.type='sawtooth';s.frequency.value=f;s.detune.value=dt;s.connect(lp);s.start(t);s.stop(end)}
  lp.connect(g);g.connect(o);const a=Math.min(.35,d*.4),pk=v*.075;g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(pk,t+a);g.gain.setValueAtTime(pk,t+Math.max(a,d-.05));g.gain.linearRampToValueAtTime(.0001,end)};
INS.spicc=function(o,t,m,d,v){const c=AU.ctx,f=mtof(m),g=c.createGain(),lp=c.createBiquadFilter(),s=c.createOscillator();lp.type='lowpass';lp.Q.value=1.2;lp.frequency.setValueAtTime(3200,t);lp.frequency.exponentialRampToValueAtTime(900,t+.15);
  s.type='sawtooth';s.frequency.value=f;s.connect(lp);s.start(t);s.stop(t+.22);lp.connect(g);g.connect(o);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(v*.15,t+.008);g.gain.exponentialRampToValueAtTime(.0003,t+.2)};
try{delete SONGC.roi}catch(e){}
/* le chargement avait été dessiné avec les anciennes images animées : on le redessine avec les images figées */
(function(){try{if(BOOT.done)return;const b=document.getElementById('boot');const rr=b&&b.querySelector('.b2.bs3');if(!rr)return;const st=rr.querySelector('#b2start'),bar=rr.querySelector('.bt-bar i'),w=bar?bar.style.width:'';
  const tmp=document.createElement('div');tmp.innerHTML=btSceneSaga3();const n=tmp.firstElementChild;if(!n)return;if(st)n.appendChild(st);const nb=n.querySelector('.bt-bar i');if(nb&&w)nb.style.width=w;rr.replaceWith(n)}catch(e){}})();
