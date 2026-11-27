
/* ================= V417b : LES HÉROS DE LA RÉSERVE (événements de saison) =================
   Un nouveau héros par saison du pass. Chaque héros n'existe dans le jeu qu'à partir de sa date :
   avant, personne ne le voit (ni la collection, ni les bots, ni la méta). Les dates servent aussi
   à l'événement (v458). Les données sont posées ici, tôt, pour que tout le reste du jeu les connaisse. */
(function(){try{
const HEVD=window.RDEHEVD={
 77:{s:Date.UTC(2026,10,26,20,0),e:Date.UTC(2026,11,8,7,10)},
 78:{s:Date.UTC(2026,11,8,7,10),e:Date.UTC(2026,11,22,7,10)},
 79:{s:Date.UTC(2026,11,22,7,10),e:Date.UTC(2027,0,5,7,10)}};
const now=()=>window.__HEVNOW||Date.now();
const own=i=>{try{return!!(S&&S.heroes&&S.heroes[i])}catch(e){return false}};
const rel=i=>!!HEVD[i]&&(now()>=HEVD[i].s||own(i)||rel(i+1));
window.RDEhevRel=i=>rel(i);
const DEF={
 77:{i:77,n:'Lucan le Loup de Brume',c:'Assassin',r:4,ex:1,sk:{n:'Hurlement',tg:'low',fx:{dmg:300,exec:1,crit:15,howl:1}}},
 78:{i:78,n:'Veyra aux Mille Clés',c:'Guerrier',r:4,ex:1,sk:{n:"Toutes les portes s'ouvrent",tg:'all',fx:{dmg:180,unlock:1,cleanse:1}}},
 79:{i:79,n:'Ossian le Juge aux Yeux Bandés',c:'Mage',r:5,ex:1,sk:{n:'Verdict',tg:'all',fx:{dmg:180,verdict:1}}}};
const LK={
 77:['#e2c6aa','#c8ccd8','#2a3a68','#6a6e80','#9fb0d8','#e8b84a','bg:smoke back:cape hair:messy eyes:sharp mouth:set body:slim ear:human prop:dagger'],
 78:['#f2d6c0','#2a2030','#1e4a5a','#5a6478','#7fd8ff','#7fd8ff','bg:spirit back:none hair:bob eyes:sharp mouth:set body:tunic ear:human prop:chain'],
 79:['#e6ccb0','#e8e4ea','#1a1420','#8a1a2a','#ffd77a','#ffd77a','bg:holy back:cape hair:long eyes:closed mouth:set body:robe ear:human prop:gavel']};
for(const id of[77,78,79]){if(HEROES[id]||HEROES.length!==id||!rel(id))break;
  const h=DEF[id];if(now()>=HEVD[id].e)delete h.ex;HEROES.push(h);try{LOOKS[id]=LK[id]}catch(e){}}
}catch(e){console.warn('réserve de héros',e)}})();
