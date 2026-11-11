/* ================= V432 : AFFINITÉS DES NOUVEAUX HÉROS =================
   Jusqu'ici, Marn, Garance, Orgemme, Perrin et Corvin n'avaient aucune affinité : le calculateur
   d'équipes de la Méta préférait toujours les vieux duos. Leurs histoires leur en donnent. */
(function(){try{
const has=v=>typeof v==='number'&&HEROES[v];
const add=(name,id)=>{try{const a=AFF.find(x=>x.n===name);if(a&&has(id)&&!a.ids.includes(id))a.ids.push(id)}catch(e){}};
const neu=a=>{try{if(a.ids.every(has)&&!AFF.some(x=>x.n===a.n))AFF.push(a)}catch(e){}};
const apply=()=>{try{
 /* Perrin rejoint la Garde d'Éther, Sorën les archers, Éryndel les cœurs de braise */
 add("La Garde d'Éther",PRN);add("Œil de l'aigle",SOR);add('Cœurs de braise',ERY);
 neu({n:'Le Silence et le Temps',ic:'🤐',ids:[MARN,58],need:2,fx:{en:25},d:'+25 énergie au départ',q:"Kaïros : « Je sais ce qu'ils vont dire. » — Marn ne répond pas. Il n'a pas besoin."});
 neu({n:'Les Effacés',ic:'📜',ids:[MARN,CRV],need:2,fx:{skm:.12,hp:.05},d:'+12 % puissance des ultimes, +5 % PV',q:"Corvin : « On t'a pris ta voix. À moi, on a pris mon histoire. » Marn hoche la tête."});
 neu({n:'Duellistes',ic:'⚔️',ids:[GAR,61,51],need:2,fx:{atk:.10,crit:.05},d:'+10 % ATQ, +5 % critique',q:"Garance : « Valkyr. Un jour, toi et moi, sans témoins. » — Valkyr : « Quand tu veux. »"});
 neu({n:'Lumière du Vitrail',ic:'🪟',ids:[ORG,64,57],need:2,fx:{tm:.08,hm:.10},d:'−8 % dégâts subis, +10 % soins',q:"Orgemme : « La lumière passe à travers moi. Elle ressort en couleurs. »"});
 neu({n:'Le Commandant et le Gamin',ic:'🛡️',ids:[AEG,PRN],need:2,fx:{tm:.08,en:15},d:'−8 % dégâts subis, +15 énergie au départ',q:"Aegis : « Rentre chez toi, Perrin. » — Perrin : « Après vous, commandant. »"});
 neu({n:'La Chronique',ic:'🖋️',ids:[CRV,LYR,SOR],need:2,fx:{en:15,hm:.08},d:'+15 énergie au départ, +8 % soins',q:"Lyra : « Tu écris, je chante, Sorën regarde. Il nous faut juste une fin. »"});
}catch(e){console.warn('affinités',e)}};
apply();
{const rd=render;render=function(){apply();return rd.apply(this,arguments)}}
{const sb=startBattle;startBattle=function(){apply();return sb.apply(this,arguments)}}
}catch(e){console.warn('v432',e)}})();
