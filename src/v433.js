/* ================= V433 : LA PAGE MÉTA COLLE AUX VRAIS COMBATS =================
   La formule de la Méta ne voyait pas les capacités spéciales des nouveaux héros (protection d'Aegis,
   énergie de Lyra, marque de Sorën, duel de Garance, renvoi d'Orgemme…). On l'a recalée sur des
   simulations : chaque nouveau héros a remplacé un ancien de sa classe dans ~200 combats par mode. */
(function(){try{
const COR={68:{pve:.939,pvp:1.002,guild:.822,raid0:.921,raid1:.921,raid2:.921},69:{pve:1.8,pvp:1.8,guild:1.017,raid0:1.017,raid1:.908,raid2:.908},
 70:{pve:.964,pvp:1.295,guild:1.203,raid0:1.258,raid1:1.094,raid2:1.094},71:{pve:.989,pvp:1.401,guild:1.8,raid0:1.631,raid1:1.631,raid2:1.254},
 72:{pve:1.062,pvp:1.052,guild:.963,raid0:.875,raid1:.875,raid2:.875},73:{pve:.818,pvp:1.042,guild:.926,raid0:.968,raid1:.968,raid2:.968},
 74:{pve:1.254,pvp:1.026,guild:.844,raid0:.888,raid1:.888,raid2:.888},75:{pve:1.045,pvp:1.211,guild:.989,raid0:.989,raid1:.883,raid2:.883}};
const RCOR={56:{raid0:2.325,raid1:1.656,raid2:1.833,guild:1.938},57:{raid0:0.904,raid1:0.762,raid2:0.819,guild:0.828},58:{raid0:0.72,raid1:0.604,raid2:0.718,guild:0.681},59:{raid0:0.1,raid1:0.159,raid2:0.106,guild:0.122},60:{raid0:0.332,raid1:0.528,raid2:0.519,guild:0.46},61:{raid0:1.208,raid1:1.409,raid2:1.278,guild:1.298},62:{raid0:0.812,raid1:0.964,raid2:0.818,guild:0.865},63:{raid0:1.485,raid1:1.681,raid2:1.544,guild:1.57},64:{raid0:0.411,raid1:0.39,raid2:0.305,guild:0.369},65:{raid0:0.726,raid1:0.844,raid2:0.724,guild:0.765},66:{raid0:0.944,raid1:0.973,raid2:0.975,guild:0.964},67:{raid0:1.697,raid1:1.671,raid2:2.175,guild:1.848},68:{raid0:1.123,raid1:1.272,raid2:1.268,guild:1.221},69:{raid0:0.425,raid1:0.403,raid2:0.452,guild:0.427},70:{raid0:0.332,raid1:0.271,raid2:0.278,guild:0.294},71:{raid0:2.122,raid1:2.352,raid2:1.905,guild:2.126},72:{raid0:0.295,raid1:0.179,raid2:0.163,guild:0.212},73:{raid0:0.686,raid1:0.559,raid2:0.522,guild:0.589},74:{raid0:1.236,raid1:1.251,raid2:1.151,guild:1.213},75:{raid0:0.425,raid1:0.443,raid2:0.413,guild:0.427}};
/* raids et boss de guilde : la valeur de chaque légendaire / mythique = les dégâts qu'il ajoute vraiment à une équipe
   (simulé sur les 3 raids). Avant, la formule aimait les étourdissements et les soins, qui ne servent à rien contre un boss. */
const BOSSM=mk=>mk==='guild'||/^raid\d$/.test(mk);
{const mm=modeMult;modeMult=function(h,mk){let m=mm.apply(this,arguments);try{if(h){if(BOSSM(mk)&&RCOR[h.i]&&RCOR[h.i][mk])m*=RCOR[h.i][mk];else{const c=COR[h.i];if(c&&c[mk])m*=c[mk]}}}catch(e){}return m}}
try{for(const k in METAC)delete METAC[k]}catch(e){}
try{PATCH.unshift({v:'v58',d:Date.now(),t:'Équilibrage des nouveaux héros',items:[
 "📊 On a simulé ~5 000 combats (tous les héros au même niveau) pour voir qui sert vraiment à quoi. Résultat : quelques corrections.",
 "🔥 <b>Éryndel</b> (il était sous le niveau d'un légendaire) : « Requiem » 170 % → <b>250 %</b>, brûlure 40 → <b>75</b>. Nouveau passif <b>Roi de Cendre</b> : ses alliés ont <b>+25 % ATQ</b>, et les ennemis qui brûlent subissent <b>+30 %</b> de ses dégâts.",
 "🎶 <b>Lyra</b> (elle s'effondrait en Aventure) : soin 110 → <b>180 %</b> et un <b>bouclier de 100 %</b> pour toute l'équipe.",
 "🏹 <b>Sorën</b> : ses attaques normales <b>gardent la cible marquée</b>, et la marque fait <b>+25 % de plus sur les boss</b>. C'est désormais le meilleur tireur de raid.",
 "⚔️ <b>Rouge-Garance</b> : « Mise en Garde » 300 → <b>370 %</b>, <b>+30 % de dégâts</b> et <b>40 % de vol de vie</b> sur son adversaire de duel. Gagner un duel lui rend <b>20 % PV et 60 énergie</b>.",
 "🩸 Raids et boss de guilde : les dégâts sur la durée (brûlure, poison) et les bonus de marque sont enfin <b>comptés dans ton score</b>.",
 "🤝 Nouvelles affinités : <b>Le Silence et le Temps</b> (Marn + Kaïros), <b>Les Effacés</b> (Marn + Corvin), <b>Duellistes</b> (Garance + Valkyr / Draven), <b>Lumière du Vitrail</b> (Orgemme + Séraphine / Solaris), <b>Le Commandant et le Gamin</b> (Aegis + Perrin), <b>La Chronique</b> (Corvin + Lyra / Sorën). Perrin rejoint la Garde d'Éther, Sorën l'Œil de l'aigle, Éryndel les Cœurs de braise.",
 "📚 La page <b>Méta</b> tient enfin compte des capacités des nouveaux héros.",
 "🐉 Raids et boss de guilde : « Ta meilleure équipe » ne conseille plus des soigneurs et des étourdisseurs (inutiles contre un boss), mais les héros qui font <b>vraiment le plus de dégâts</b>."]})}catch(e){}
}catch(e){console.warn('v433',e)}})();
