
/* ================= musiques : donjon, combats du donjon, village de guilde ================= */
SONGS.dungeon={g:.9,bpm:72,spb:4,bar:16,bars:8,prog:'Dm Bb Gm A Dm F C A',parts:[
 {i:'organ',f:'chord',lo:50,v:.5},
 {i:'choir',f:'chord',lo:57,v:.34,from:5},
 {i:'sbass',f:'bass',lo:38,v:.36,pat:[[0,8,0],[8,8,7]]},
 {i:'harp',f:'arp',lo:50,v:.3,pat:[0,2,4,2,1,3,4,3,0,2,4,5,4,2,1,0]},
 {i:'cel',f:'mel',v:.6,mel:'D5:4 F5:4 A5:6 G5:2|F5:4 D5:4 Bb4:8|G4:4 Bb4:4 D5:4 C5:4|C#5:12 r:4|D5:2 E5:2 F5:4 A5:4 D6:4|C6:4 A5:4 F5:8|E5:4 G5:4 C6:4 Bb5:4|A5:12 r:4'},
 {i:'bell',f:'mel',v:.26,mel:'D6:16|r:16|r:16|E6:16|r:16|F6:16|r:16|A5:16'},
 {i:'timp',f:'bass',lo:38,v:.4,pat:[[0,4,0]]},
 {i:'kick',f:'drum',v:.14,pat:'x...............'}]};
SONGS.dgfight={g:1.08,bpm:138,spb:4,bar:16,bars:8,prog:'Am F G E Am F Dm E',parts:[
 {i:'choir',f:'chord',lo:57,v:.42},
 {i:'organ',f:'chord',lo:48,v:.3},
 {i:'abass',f:'bass',lo:36,v:.72,pat:[[0,1,0],[2,1,0],[4,1,12],[6,1,0],[8,1,7],[10,1,0],[12,1,12],[14,1,7]]},
 {i:'lead',f:'mel',v:.9,mel:'A4:2 C5:2 E5:2 A5:2 G5:4 E5:4|F5:2 E5:2 C5:4 A4:4 C5:4|D5:2 G5:2 B5:4 A5:2 G5:2 D5:4|E5:4 G#5:4 B5:8|A5:2 B5:2 C6:4 B5:2 A5:2 E5:4|F5:2 A5:2 C6:4 A5:4 F5:4|D5:2 F5:2 A5:4 G5:2 F5:2 D5:4|E5:4 D5:4 G#4:8'},
 {i:'timp',f:'bass',lo:38,v:.5,pat:[[0,2,0],[8,2,0],[14,2,7]]},
 {i:'kick',f:'drum',v:.5,pat:'x.....x.x.......'},
 {i:'snare',f:'drum',v:.5,pat:'....x.......x...'},
 {i:'hat',f:'drum',v:.55,pat:'x.x.x.x.x.x.x.x.'},
 {i:'crash',f:'drum',v:.3,pat:'',alt:{1:'x',5:'x'}}]};
SONGS.gvillage={g:.95,bpm:100,spb:4,bar:16,bars:8,prog:'G C D G Em C D G',parts:[
 {i:'pad',f:'chord',lo:52,v:.55},
 {i:'sbass',f:'bass',lo:38,v:.34,pat:[[0,4,0],[4,2,7],[8,4,0],[12,2,7],[14,2,12]]},
 {i:'harp',f:'arp',lo:55,v:.42,pat:[0,1,2,1,0,1,2,3,0,1,2,1,0,2,3,4]},
 {i:'flute',f:'mel',v:.85,mel:'D5:4 G5:4 B5:4 A5:4|G5:4 E5:4 C5:8|D5:2 E5:2 F#5:4 A5:4 F#5:4|G5:12 r:4|B5:4 A5:4 G5:4 E5:4|C5:4 E5:4 G5:8|F#5:2 G5:2 A5:4 D5:4 F#5:4|G5:8 D5:4 B4:4'},
 {i:'bell',f:'mel',v:.22,mel:'G6:16|r:16|A6:16|r:16|r:16|E6:16|r:16|D6:16'},
 {i:'shaker',f:'drum',v:.85,pat:'oxoxoxoxoxoxoxox'},
 {i:'kick',f:'drum',v:.24,pat:'x.......x.......'}]};
try{delete SONGC.dungeon;delete SONGC.dgfight;delete SONGC.gvillage}catch(e){}
{const pt=pageTheme;pageTheme=function(){const t=pt.apply(this,arguments);try{if(BOOT.done&&!B){if(TAB==='boss'&&UI.lz&&UI.lz.boss==='dg')return'dungeon';if(TAB==='guilde'&&!(UI.lz&&UI.lz.guilde==='chat'))return'gvillage'}}catch(e){}return t}}
PATCH.unshift({v:26.9,d:'19 octobre 2026',t:'Le Donjon des Échos',items:[
 "🕯️ <b>Donjon des Échos</b> (Quartier des combats) : un roguelike de 3 étages qui change à chaque descente. Choisis ton chemin parmi les combats, élites, trésors, feux de camp, marchands et salles mystère, collectionne 22 reliques et affronte les gardiens. Les PV ne remontent pas entre les combats ! 2 clés par jour.",
 "⚔️ <b>Saisons d'arène</b> : 7 rangs de Bronze à Légende, des séries de victoires, une promotion récompensée à chaque rang et des récompenses de fin de saison (tous les 14 jours). Diamant, Maître et Légende débloquent des cadres exclusifs.",
 "🏗️ <b>Village de guilde</b> : un chantier pour améliorer le Château, le Grand hall, la Taverne, la Boutique et construire la Forge de guilde. Fais des dons au trésor, et regarde ton village grandir avec drapeaux, guirlandes et lumières.",
 "🎵 Trois nouvelles musiques : l'exploration du donjon, ses combats, et le village de guilde."]});
