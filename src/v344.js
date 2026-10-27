/* ================= Messages de motivation : la guilde se met à jouer plus ================= */
/* Un message d'encouragement dans le tchat de guilde (« allez on se bouge », « motivez-vous »…) motive les membres pendant 24 h :
   ils jouent plus, donc ils progressent plus vite (+6 % par jour au lieu de +4 %) et visent un peu plus haut (+4 % par jour de motivation, jusqu'à 3 jours d'affilée).
   Ils peuvent dépasser les vrais joueurs (jusqu'à +2 % par jour de motivation), mais toujours au rythme d'un vrai joueur (+6 %/jour max). */
const MOTRX=/\b(allez|go+|motiv|on se bouge|bougez|on lâche rien|on lache rien|courage|on y va|faut monter|on monte|à fond|a fond|let'?s go|on peut le faire|grind|farm(ez|ons)?|donnez tout|on va les|on remonte|réveillez|reveillez|bossez|jouez)/i;
function motOf(gid){try{const m=(NET.guilds[gid]||{}).mot;if(!m||!m.t)return null;const age=Date.now()-m.t;return age<24*36e5?{lv:clamp(m.lv||1,1,3),t:m.t}:null}catch(e){return null}}
async function motSend(x){const gid=S.rgid;if(!gid||!NET.on||!NET.canWrite)return;const d=today();if(S.motD===d)return;S.motD=d;save();
  try{const now=Date.now();const upd=await realGuildUpdate(g=>{const m=g.mot||{};const cont=m.t&&now-m.t<48*36e5&&dayKey(m.t)!==dayKey(now);const lv=m.t&&dayKey(m.t)===dayKey(now)?(m.lv||1):cont?Math.min(3,(m.lv||1)+1):1;return{mot:{t:now,lv,by:S.name||'Voyageur'}}});
    const lv=upd&&upd.mot?upd.mot.lv:1;toast(`💪 Ta guilde est motivée${lv>1?` (jour ${lv} d'affilée)`:''} ! Les membres vont jouer plus pendant 24 h.`);
    const bots=((NET.guilds[gid]||{}).bots||[]).filter(b=>b&&b.n);const L=["Allez on y va ! 💪","Message reçu chef, je farm ce soir 🔥","T'as raison, on remonte au classement !","Ok je fais mes raids et l'arène tout de suite ⚔️","On lâche rien la team !","Motivé à fond 😤","Je monte mes héros, promis 🙏"];
    bots.sort(()=>Math.random()-.5).slice(0,Math.min(3,bots.length)).forEach((b,i)=>setTimeout(()=>{try{NET.db.collection('msgs').add({g:gid,w:'b:'+b.id,n:b.n,x:L[(i+Math.floor(Math.random()*L.length))%L.length],t:Date.now()})}catch(e){}},2500+i*3500+Math.random()*2000))}catch(e){}}
{const pm=postMsg;postMsg=function(x,sys,gid=S.rgid){const r=pm.apply(this,arguments);try{if(!sys&&gid&&gid===S.rgid&&MOTRX.test(String(x)))motSend(String(x))}catch(e){}return r}}
/* l'effet sur la progression des membres de la guilde */
let MOTG=null;
{const bs=botSimGuild;botSimGuild=async function(gid){const m=motOf(gid);MOTG=m;try{return await bs.apply(this,arguments)}finally{MOTG=null}}}
{const bc=botCareer;botCareer=function(b,t){const r=bc.apply(this,arguments);try{if(MOTG){const top=realTopPw();const boost=1+.04*MOTG.lv;const cap=top>0?top*(1+.02*MOTG.lv):Infinity;r.tgt=Math.min(cap,Math.max(r.tgt,r.tgt*boost))}}catch(e){}return r}}
{const gp=growPw;growPw=function(b,t){if(!MOTG)return gp.apply(this,arguments);const y=b.pwY;const r=gp.apply(this,arguments);try{const base=b.pwY||y||b.pw;const cap=Math.round(base*1.06);return Math.min(r,cap)}catch(e){return r}}}
/* le badge sur la page de la guilde */
{const pg=typeof pGuild==='function'?pGuild:null;if(pg)pGuild=function(){const h=pg.apply(this,arguments);try{const m=motOf(S.rgid);if(m)return h.replace('<div class="stack">',`<div class="stack"><div class="card motc">💪 <b>Guilde motivée</b>${m.lv>1?` · jour ${m.lv}`:''} : les membres jouent plus jusqu'à ${new Date(m.t+24*36e5).toLocaleTimeString('fr-FR',{hour:'2-digit',minute:'2-digit'})}. Encourage-les chaque jour pour garder la série !</div>`)}catch(e){}return h}}
