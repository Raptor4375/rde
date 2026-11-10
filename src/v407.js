/* ================= V407 : des musiques différentes selon l'endroit et le moment =================
   Avant, c'était presque toujours le même thème. Maintenant chaque quartier du royaume a son ambiance,
   l'écran d'équipe a sa musique d'aventure, les combats alternent entre trois thèmes,
   et la fin d'un combat a sa fanfare de victoire ou son thème triste de défaite. */
(function(){try{
if(typeof SONGS==='undefined'||typeof pageTheme!=='function')return;

/* ---------- l'aventure : chaleureux, plein d'espoir (onglet Aventure, choix de l'équipe) ---------- */
SONGS.aventure={g:1,bpm:104,spb:4,bar:16,bars:8,prog:'G D Em C G D C D',parts:[
 {i:'pad',f:'chord',lo:55,v:.5},
 {i:'sbass',f:'bass',lo:38,v:.34,pat:[[0,4,0],[4,2,7],[8,4,0],[12,2,7],[14,2,12]]},
 {i:'harp',f:'arp',lo:57,v:.4,pat:[0,1,2,3,4,3,2,1,0,1,2,3,4,5,4,3]},
 {i:'flute',f:'mel',v:.9,mel:'D5:2 G5:2 B5:4 A5:4 G5:4|A5:4 F#5:4 D5:6 r:2|E5:2 G5:2 B5:4 D6:4 B5:4|C6:4 A5:4 G5:8|B5:2 A5:2 G5:4 D5:4 G5:4|F#5:4 A5:4 D6:6 r:2|E5:2 G5:2 C6:4 B5:4 A5:4|A5:4 F#5:4 D5:8'},
 {i:'bell',f:'mel',v:.25,mel:'G6:16|r:16|r:16|C6:16|r:16|r:16|r:16|D6:16'},
 {i:'shaker',f:'drum',v:.8,pat:'oxoxoxoxoxoxoxox'},
 {i:'kick',f:'drum',v:.3,pat:'x.......x.......',from:3},
 {i:'snare',f:'drum',v:.26,pat:'....x.......x...',from:5}]};
/* ---------- les héros et l'équipement : fier et posé ---------- */
SONGS.heros={g:.95,bpm:86,spb:4,bar:16,bars:8,prog:'C G Am F C Em F G',parts:[
 {i:'pad',f:'chord',lo:52,v:.55},
 {i:'choir',f:'chord',lo:59,v:.3,from:5},
 {i:'sbass',f:'bass',lo:36,v:.34,pat:[[0,8,0],[8,8,7]]},
 {i:'harp',f:'arp',lo:55,v:.32,pat:[0,2,4,2,1,3,4,3,0,2,4,5,4,2,1,0]},
 {i:'brass',f:'mel',v:.72,mel:'E5:4 G5:4 C6:6 B5:2|D6:4 B5:4 G5:8|A5:4 C6:4 E6:6 D6:2|C6:4 A5:4 F5:8|G5:2 A5:2 B5:4 C6:4 E6:4|D6:4 B5:4 G5:8|A5:4 C6:4 F6:6 E6:2|D6:4 B5:4 G5:8'},
 {i:'bell',f:'mel',v:.22,mel:'C6:16|r:16|r:16|F5:16|r:16|r:16|r:16|G5:16'},
 {i:'timp',f:'bass',lo:36,v:.3,pat:[[0,4,0]],every:2}]};
/* ---------- l'invocation : magique, scintillant ---------- */
SONGS.invoc={g:1,bpm:98,spb:4,bar:16,bars:8,prog:'Am C F G Am Em F E',parts:[
 {i:'pad',f:'chord',lo:55,v:.5},
 {i:'sbass',f:'bass',lo:38,v:.3,pat:[[0,8,0],[8,8,0]]},
 {i:'harp',f:'arp',lo:57,v:.5,pat:[0,1,2,3,4,5,4,3,2,3,4,5,6,5,4,3]},
 {i:'cel',f:'mel',v:.8,mel:'A4:2 C5:2 E5:4 A5:4 G5:4|E5:2 G5:2 C6:4 B5:4 G5:4|F5:2 A5:2 C6:4 A5:4 F5:4|G5:4 B5:4 D6:8|E5:2 A5:2 C6:4 E6:4 C6:4|B5:4 G5:4 E5:8|A5:2 C6:2 F6:4 E6:4 C6:4|B5:4 G#5:4 E5:8'},
 {i:'ther',f:'mel',v:.45,mel:'A5:16|r:16|E6:16|r:16|r:16|B5:16|r:16|G#5:16'},
 {i:'bell',f:'mel',v:.3,mel:'A6:16|r:16|r:16|D6:16|r:16|r:16|r:16|E6:16'},
 {i:'shaker',f:'drum',v:.45,pat:'..x...x...x...x.',from:3}]};
/* ---------- les quêtes : joyeux et sautillant ---------- */
SONGS.quetes={g:1,bpm:120,spb:4,bar:16,bars:8,prog:'D A Bm G D A G A',parts:[
 {i:'pizz',f:'bass',lo:38,v:.95,pat:[[0,2,0],[4,2,7],[8,2,0],[12,2,7]]},
 {i:'pad',f:'chord',lo:52,v:.3,from:3},
 {i:'harp',f:'arp',lo:57,v:.4,pat:[0,1,2,1,0,1,2,3,0,1,2,1,2,3,4,3]},
 {i:'flute',f:'mel',v:.9,mel:'A4:2 D5:2 F#5:2 A5:2 D6:4 A5:4|C#6:2 A5:2 E5:4 A5:4 C#6:4|D6:2 B5:2 F#5:4 B5:4 D6:4|B5:4 G5:4 D5:8|F#5:2 A5:2 D6:4 C#6:2 B5:2 A5:4|E5:2 A5:2 C#6:4 E6:4 C#6:4|B5:2 D6:2 G6:4 F#6:4 D6:4|E6:4 C#6:4 A5:8'},
 {i:'shaker',f:'drum',v:.9,pat:'oxoxoxoxoxoxoxox'},
 {i:'wood',f:'drum',v:.45,m:76,pat:'....x.......x...'},
 {i:'kick',f:'drum',v:.3,pat:'x.......x...x...',from:5}]};
/* ---------- le quartier social : chaleureux, comme une taverne ---------- */
SONGS.social={g:.95,bpm:92,spb:4,bar:16,bars:8,prog:'F C Dm Bb F Am Bb C',parts:[
 {i:'pad',f:'chord',lo:50,v:.4},
 {i:'pizz',f:'bass',lo:36,v:.85,pat:[[0,2,0],[6,2,7],[8,2,0],[12,2,4]]},
 {i:'harp',f:'arp',lo:53,v:.45,pat:[0,1,2,3,2,1,0,1,2,3,4,3,2,1,0,1]},
 {i:'flute',f:'mel',v:.8,mel:'C5:2 F5:2 A5:4 C6:4 A5:4|G5:4 E5:4 C5:8|D5:2 F5:2 A5:4 D6:4 C6:4|A5:4 F5:4 D5:8|F5:2 A5:2 C6:4 A5:4 F5:4|E5:4 A5:4 C6:8|D5:2 F5:2 Bb5:4 A5:4 F5:4|G5:4 E5:4 C5:8'},
 {i:'bell',f:'mel',v:.2,mel:'F6:16|r:16|r:16|Bb5:16|r:16|r:16|r:16|C6:16'},
 {i:'shaker',f:'drum',v:.55,pat:'..x...x...x...x.'}]};
/* ---------- le quartier des combats : déterminé, un peu tendu ---------- */
SONGS.arene={g:1,bpm:112,spb:4,bar:16,bars:8,prog:'Em C G D Em Am B Em',parts:[
 {i:'pad',f:'chord',lo:52,v:.4},
 {i:'abass',f:'bass',lo:40,v:.5,pat:[[0,4,0],[8,4,7]]},
 {i:'lead',f:'mel',v:.78,mel:'E5:4 B5:4 G5:6 E5:2|C6:4 G5:4 E5:8|D5:2 G5:2 B5:4 D6:4 B5:4|A5:4 F#5:4 D5:8|G5:2 B5:2 E6:4 D6:4 B5:4|C6:4 A5:4 E5:8|F#5:2 D#5:2 B4:4 F#5:4 B5:4|E5:4 G5:4 B5:8'},
 {i:'timp',f:'bass',lo:36,v:.3,pat:[[0,2,0]],every:2},
 {i:'hat',f:'drum',v:.5,pat:'x.x.x.x.x.x.x.x.'},
 {i:'kick',f:'drum',v:.4,pat:'x.......x...x...'},
 {i:'snare',f:'drum',v:.32,pat:'....x.......x...',from:3}]};
/* ---------- deux autres thèmes de combat ---------- */
SONGS.battle2={g:1.12,bpm:150,spb:4,bar:16,bars:8,prog:'Dm Bb F C Dm Gm A A',parts:[
 {i:'abass',f:'bass',lo:38,v:.8,pat:[[0,2,0],[2,2,0],[4,2,12],[6,2,0],[8,2,0],[10,2,12],[12,2,0],[14,2,7]]},
 {i:'stab',f:'stab',lo:57,v:.9,at:[2,6,10,14],len:1},
 {i:'pad',f:'chord',lo:50,v:.28,from:5},
 {i:'lead',f:'mel',v:1,mel:'D5:2 A5:2 F5:2 D5:2 A5:4 D6:4|C6:4 A5:2 F5:2 Bb5:4 D6:4|C6:2 A5:2 F5:4 A5:4 C6:4|G5:4 E5:4 C6:8|D6:2 A5:2 F5:2 A5:2 D6:4 F6:4|D6:4 Bb5:4 G5:8|E5:2 A5:2 C#6:4 E6:4 A5:4|C#6:4 E6:4 A5:8'},
 {i:'kick',f:'drum',v:.8,pat:'x.......x.x.....'},
 {i:'snare',f:'drum',v:.9,pat:'....x.......x...',alt:{4:'....x.......xxxx',8:'....x...x.x.xxxx'}},
 {i:'hat',f:'drum',v:.9,pat:'x.x.x.x.x.x.x.x.'},
 {i:'crash',f:'drum',v:.5,pat:'',alt:{1:'x',5:'x'}}]};
SONGS.battle3={g:1.1,bpm:138,spb:4,bar:16,bars:8,prog:'Am F C G Am Dm E E',parts:[
 {i:'abass',f:'bass',lo:40,v:.75,pat:[[0,2,0],[4,2,7],[6,2,12],[8,2,0],[12,2,7],[14,2,0]]},
 {i:'choir',f:'chord',lo:57,v:.35,from:5},
 {i:'brass',f:'mel',v:1,mel:'A4:4 E5:4 A5:4 C6:4|C6:2 A5:2 F5:4 A5:8|G5:4 C6:4 E6:4 G5:4|D6:4 B5:4 G5:8|E5:2 A5:2 C6:4 E6:4 C6:4|D6:4 A5:4 F5:8|B5:2 G#5:2 E5:4 B5:4 E6:4|G#5:4 B5:4 E6:8'},
 {i:'timp',f:'bass',lo:36,v:.4,pat:[[0,2,0],[8,2,7]]},
 {i:'kick',f:'drum',v:.7,pat:'x...x...x.......'},
 {i:'snare',f:'drum',v:.85,pat:'....x.......x...',alt:{6:'....x...x.x.x.x.'}},
 {i:'hat',f:'drum',v:.85,pat:'xoxoxoxoxoxoxoxo'},
 {i:'crash',f:'drum',v:.45,pat:'',alt:{1:'x'}}]};
/* ---------- fin de combat : fanfare ou thème triste ---------- */
SONGS.victoire={g:1.15,bpm:126,spb:4,bar:16,bars:4,prog:'C F G C',parts:[
 {i:'pad',f:'chord',lo:52,v:.5},
 {i:'choir',f:'chord',lo:59,v:.4,from:3},
 {i:'abass',f:'bass',lo:36,v:.6,pat:[[0,2,0],[4,2,7],[8,2,0],[12,2,7]]},
 {i:'brass',f:'mel',v:1.1,mel:'G4:2 C5:2 E5:2 G5:2 C6:8|A5:4 F5:4 A5:8|B5:4 G5:4 D6:8|C6:16'},
 {i:'bell',f:'mel',v:.35,mel:'C6:16|r:16|r:16|C6:16'},
 {i:'timp',f:'bass',lo:36,v:.5,pat:[[0,2,0],[8,2,0]]},
 {i:'snare',f:'drum',v:.55,pat:'....x.......x...'},
 {i:'crash',f:'drum',v:.5,pat:'',alt:{1:'x',4:'x'}}]};
SONGS.defaite={g:.85,bpm:62,spb:2,bar:8,bars:4,prog:'Dm Bb Gm A',parts:[
 {i:'pad',f:'chord',lo:50,v:.5},
 {i:'sbass',f:'bass',lo:38,v:.3,pat:[[0,8,0]]},
 {i:'harp',f:'arp',lo:53,v:.22,pat:[0,1,2,1,0,1,2,3]},
 {i:'cel',f:'mel',v:.7,mel:'D5:4 F5:4|Bb4:4 D5:4|G4:4 Bb4:4|A4:6 r:2'},
 {i:'ther',f:'mel',v:.32,mel:'A5:8|r:8|r:8|A4:8'}]};
try{for(const k of['aventure','heros','invoc','quetes','social','arene','battle2','battle3','victoire','defaite'])delete SONGC[k]}catch(e){}

/* ---------- qui joue quoi ---------- */
const SEED=(()=>{try{const n=String(S.name||'')+String(S.acct||'');let h=7;for(let i=0;i<n.length;i++)h=(h*31+n.charCodeAt(i))|0;return Math.abs(h)}catch(e){return 3}})();
/* l'onglet Aventure alterne entre deux ambiances au fil de la journée */
const TABMUS={adv:null,heros:'heros',equip:'heros',invoc:'invoc',quetes:'quetes',top:'social',boss:'arene'};
function advMus(){return['aventure','menu'][(Math.floor(Date.now()/36e5)+SEED)%2]}
{const pt=pageTheme;pageTheme=function(){const t=pt.apply(this,arguments);
  try{if(t!=='menu'||(typeof B!=='undefined'&&B)||!BOOT.done)return t;
    if(TAB==='adv')return advMus();
    const m=TABMUS[TAB];if(m)return m}catch(e){}
  return t}}
/* les combats alternent entre trois thèmes */
{const bt=battleTheme;battleTheme=function(){const t=bt.apply(this,arguments);
  try{if(t!=='battle'||!B)return t;const s=String(B.mode)+'|'+String(B.arg&&B.arg.id||B.arg||'');let h=SEED;for(let i=0;i<s.length;i++)h=(h*33+s.charCodeAt(i))|0;
    return['battle','battle2','battle3'][Math.abs(h)%3]}catch(e){}
  return t}}
/* victoire et défaite */
{const f0=finish;finish=function(res){const was=typeof B!=='undefined'&&B&&B.done;const r=f0.apply(this,arguments);
  try{if(B&&B.done&&!was){B.res=res===true?1:0;musicWant(res===true?'victoire':'defaite')}}catch(e){}return r}}
{const c0=closeBattle;closeBattle=function(){const r=c0.apply(this,arguments);try{if(AU.started)musicWant(pageTheme())}catch(e){}return r}}
{const pt2=pageTheme;pageTheme=function(){try{if(typeof B!=='undefined'&&B&&B.done&&B.res!=null)return B.res?'victoire':'defaite'}catch(e){}return pt2.apply(this,arguments)}}
/* la musique suit tout de suite le changement d'onglet */
document.addEventListener('click',()=>setTimeout(()=>{try{if(AU.started&&!B&&BOOT.done)musicWant(pageTheme())}catch(e){}},90),true);
try{SETR[0][3]="Une musique par quartier, par moment de la journée et par combat"}catch(e){}

/* ---------- notes de version ---------- */
try{const it=["🎼 <b>Beaucoup plus de musiques</b> : l'aventure, les héros, l'invocation, les quêtes et le quartier social ont chacun leur ambiance, et l'onglet Aventure change de thème au fil de la journée.",
 "⚔️ <b>Trois thèmes de combat</b> qui alternent selon l'adversaire, une <b>fanfare de victoire</b> et un thème plus triste quand ça tourne mal.",
 "🖋️ <b>Le Scribe sans Nom a enfin son vrai visage</b> : robe d'encre couverte d'écriture, plume géante, grimoire flottant… et ses propres animations de combat. Toutes les créatures d'encre et de papier du Livre IV ont aussi les leurs."];
 PATCH.unshift({v:48,d:'10 novembre 2026',t:'Musiques et encre',items:it});
 const E=["🎼 <b>Many more music tracks</b>: adventure, heroes, summoning, quests and the social district each have their own mood, and the Adventure tab changes theme over the course of the day.",
 "⚔️ <b>Three battle themes</b> that alternate depending on the enemy, a <b>victory fanfare</b> and a sadder theme when things go wrong.",
 "🖋️ <b>The Nameless Scribe finally has a real face</b>: an ink robe covered in writing, a giant quill, a floating grimoire… and his own battle animations. Every ink and paper creature in Book IV has theirs too."];
 it.forEach((x,i)=>{I18N_EN[x]=E[i]});I18N_EN['Musiques et encre']='Music and ink';
 I18N_EN["Une musique par quartier, par moment de la journée et par combat"]='A track per district, per time of day and per battle'}catch(e){}
}catch(e){console.warn('musiques',e)}})();
