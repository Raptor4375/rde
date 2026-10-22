
/* ================= les bots arrêtent de donner des conseils qu'on ne leur a pas demandés ================= */
/* 1) Les phrases spontanées des bots ne sont plus des leçons (« Fusionne tes doublons… », « Pensez à… ») */
{const ADV=/^\{me\},? (monte|fusionne|garde|mets|fais|pense|récolte|la tour|les synergies|n'oublie)|^(pensez|n'oubliez|fusionne|monte|fais une|garde|mets|récolte|ceux qui n'ont pas)/i;
 for(const k of Object.keys(TPL)){if(k==='advice'||!Array.isArray(TPL[k]))continue;const keep=TPL[k].filter(x=>!ADV.test(String(x)));if(keep.length>=3){TPL[k].length=0;keep.forEach(x=>TPL[k].push(x))}}
 TPL.advice.length=0;TPL.advice.push("Bon courage pour la suite {me} 💪","Ça monte vite chez toi {me} 👀","Belle progression {me} !","On se fait un raid plus tard ?","Quelqu'un a vu le nouveau boss de saison ?","Je farme tranquille ce soir 😌","Trop bien cette semaine 💪","Qui est chaud pour l'arène ?")}
/* 2) Les vrais conseils ne sortent que quand on en demande (« un conseil ? », « je suis bloqué », « comment je monte ? »…) */
let TIP_OK=false;
{const tf=tipFor;tipFor=function(){if(TIP_OK)return tf.apply(this,arguments);return["bon courage pour la suite 💪","tu progresses vite 👀","bien joué cette semaine","on compte sur toi pour le boss 🔥"]}}
{const sl=smartLine;smartLine=function(txt,b,ctx){const I=(ctx&&ctx.I)||null;TIP_OK=!!(I&&I.k==='help');try{return sl.apply(this,arguments)}finally{TIP_OK=false}}}
/* 3) Parler d'un héros, de sa team ou d'un mode sans poser de question ne déclenche plus un cours de méta */
const ASKRX=/\?|\b(comment|pourquoi|quel|quelle|quels|quelles|lequel|laquelle|c'?est qui|qui est|tu (penses|conseilles|ferais)|vous (pensez|conseillez)|conseil|aide|help|astuce|bloqu)/i;
{const di=detectIntent;detectIntent=function(txt,scope){const o=di.apply(this,arguments);try{if(['meta','best','cmp','hero','myteam','syn','weak','stage','modeq','teams','tix'].includes(o.k)&&!ASKRX.test(String(txt)))o.k='talk'}catch(e){}return o}}
/* 4) Les bots répondent moins souvent aux simples discussions (ils laissent parler les vrais joueurs) */
{const sr=smartRespond;smartRespond=function(txt,scope){try{const I=detectIntent(txt,scope);if(I.k==='talk'&&Math.random()<.6)return}catch(e){}return sr.apply(this,arguments)}}
/* en message privé, dire « je suis bloqué » ou « je galère » reste une vraie demande d'aide */
{const db=dmBrain;dmBrain=function(raw){TIP_OK=/(galer|bloqu|conseil|aide|help|astuce)/i.test(String(raw||''));try{return db.apply(this,arguments)}finally{TIP_OK=false}}}
