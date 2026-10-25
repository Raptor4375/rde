
/* ================= Ultra-évolutions : une forme unique par légendaire ================= */
/* Avant, les légendaires se partageaient 4 formes (Céleste, Abyssale, Solaire, Astrale) : ailes d'ange,
   yeux bleus… tout le monde se ressemblait. Chaque légendaire a maintenant SA forme, dans ses couleurs,
   avec des accessoires qui lui ressemblent (et pas d'ailes d'ange pour ceux qui n'en ont pas besoin).
   w : ce qu'on ajoute dans le dos (null = rien de plus), hat : le couvre-chef en forme II et III (null = on garde le sien),
   h3 : la couleur des cheveux en forme III. */
const UTH_H={
 56:{n:'Grande Croupière',m:'#150a10',s:'#ffd84a',a:'#d1263b',e:'#ffd84a',bg:'cards',w:null,hat:null,fx:'stars',c:'#ffd84a',c2:'#d1263b',h3:'#ff4a3a'},
 57:{n:'Astre Suprême',m:'#ff6a10',s:'#fff2a0',a:'#ff2a10',e:'#fff6c0',bg:'sun',w:null,hat:'suncrown',fx:'embers',c:'#ffd84a',c2:'#ff5a1a',h3:'#fff6c0'},
 58:{n:'Seigneur des Âges',m:'#2a1240',s:'#c9a24a',a:'#ffd84a',e:'#ffd84a',bg:'clock',w:null,hat:null,fx:'clockeye',c:'#ffd84a',c2:'#8a5aff',h3:'#f0e8ff'},
 59:{n:'Forêt Éternelle',m:'#24501a',s:'#a8e04a',a:'#ff8ac0',e:'#c8ff6a',bg:'flowers',w:'vines',hat:'antlers',fx:'vines',c:'#a8e04a',c2:'#ff8ac0',h3:'#7ad04a'},
 60:{n:'Cœur de Lave',m:'#3a302a',s:'#d0a050',a:'#ff6a1a',e:'#ffb21a',bg:'ember',w:'heavy-spike',hat:'crystals',fx:'embers',c:'#ff8a2a',c2:'#ffd84a',h3:'#ff6a1a'},
 61:{n:'Reine du Valhalla',m:'#2a2c3a',s:'#ffd84a',a:'#d1263b',e:'#ffd84a',bg:'storm',w:null,hat:null,fx:null,c:'#ffd84a',c2:'#d1263b',h3:'#fff0a0'},
 62:{n:"Impératrice de l'Éclipse",m:'#120820',s:'#b07aff',a:'#ff3a8a',e:'#ff4a8a',bg:'shadow',w:'wings-black',hat:'crown-black',fx:'stars',c:'#b07aff',c2:'#ff3a8a',h3:'#d8c0ff'},
 63:{n:'Chasseur Céleste',m:'#151a36',s:'#ffd84a',a:'#fff6dc',e:'#ffd84a',bg:'star',w:'cape',hat:null,fx:'constellation',c:'#ffd84a',c2:'#ff9a5a',h3:'#ffe9a0'},
 64:{n:'Aurore Sacrée',m:'#fff6ea',s:'#ffd84a',a:'#ff8ac0',e:'#ffd84a',bg:'dawn',w:null,hat:'halo',fx:'runes',c:'#ffd84a',c2:'#ff8ac0',h3:'#ffd8f0'},
 65:{n:'Wyrm Ancestral',m:'#2a0606',s:'#ff6a1a',a:'#ffd84a',e:'#ffd84a',bg:'flame',w:null,hat:'horns',fx:'embers',c:'#ff6a1a',c2:'#ffd84a',h3:'#ff6a1a'},
 66:{n:'Reine des Abysses',m:'#06302c',s:'#12a088',a:'#ffd84a',e:'#ffd84a',bg:'wave',w:null,hat:'shells',fx:'scales',c:'#2ad0b0',c2:'#ffd84a',h3:'#2ad0b0'}};
{const ut=uthOf;uthOf=function(h){if(h&&UTH_H[h.i])return UTH_H[h.i];return ut.apply(this,arguments)}}
{const ul=ultraLook;ultraLook=function(a,u,h){const T=h&&UTH_H[h.i];if(!T)return ul.apply(this,arguments);
  const o={};a[6].split(' ').forEach(t=>{const i=t.indexOf(':');if(i>0)o[t.slice(0,i)]=t.slice(i+1)});
  o.bg=T.bg;let back=o.back?o.back.split('+'):[];if(T.w){if(/^wings/.test(T.w))back=back.filter(x=>!/^wings/.test(x));if(!back.includes(T.w))back.unshift(T.w)}if(back.length)o.back=back.join('+');
  const face=o.face?o.face.split(','):[];const head=o.head||'human';
  if((head==='human'||head==='orc'||head==='spirit')&&!face.includes('blindfold')&&o.eyes!=='slit')o.eyes='glow';
  if(u>=2){if(T.fx&&!face.includes(T.fx))face.push(T.fx);if(T.hat&&!/helm/.test(o.hat||''))o.hat=T.hat}
  if(face.length)o.face=face.join(',');
  return[a[0],u>=3?(T.h3||T.s):a[1],T.m,T.s,T.a,T.e,Object.entries(o).map(([k,v])=>k+':'+v).join(' ')]}}
/* on vide les dessins et portraits ultra déjà en cache */
(function(){try{for(const C of [window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)Object.keys(C).forEach(k=>{const [i,u]=k.split('_');if(UTH_H[+i]&&+u>0)delete C[k]});
  for(const k of Object.keys(PCACHE))if(/^U\d+_(\d+)$/.test(k)&&UTH_H[+k.split('_')[1]])delete PCACHE[k]}catch(e){}})();
