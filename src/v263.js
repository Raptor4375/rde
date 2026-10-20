
/* ================= V26.1 : guerre aux dégâts, factions équilibrées, Claude joue, lobbys animés ================= */
/* ---------- factions équilibrées entre guildes ---------- */
const AVBAL={t:0,map:{}};
function avAllGuilds(){const ids=new Set();try{for(const k in NET.guilds)ids.add(k)}catch(e){}try{if(!NET.on)for(const g of S.world.guilds)ids.add(g.id)}catch(e){}return[...ids]}
function avGuildFac(gid){if(!gid)return null;const now=Date.now();if(now-AVBAL.t>30000||!(gid in AVBAL.map)){const L=avAllGuilds();if(!L.includes(gid))L.push(gid);
    const arr=L.map(g=>{const t=avGuildTally(g),tot=t.ange+t.demon;return{g,m:tot?(t.ange-t.demon)/tot:0,h:avH('t'+g)}}).sort((a,b)=>b.m-a.m||b.h-a.h);
    const half=Math.ceil(arr.length/2);AVBAL.map={};arr.forEach((x,i)=>{AVBAL.map[x.g]=i<half?'ange':'demon'});AVBAL.t=now}
  return AVBAL.map[gid]}
function avBalance(){const L=avAllGuilds();let a=0,d=0;for(const g of L){avGuildFac(g)==='ange'?a++:d++}return{a,d}}
{const vc=avVoteCard;avVoteCard=function(){let h=vc.apply(this,arguments);if(!avMyGid())return h;const B2=avBalance();AVBAL.t=0;
  return h.replace(/<\/div>$/,`<p class="muted" style="font-size:12px;margin:8px 0 0">⚖️ Pour que la guerre soit équitable, les guildes sont réparties à parts égales (${B2.a} guildes Anges · ${B2.d} guildes Démons) : les guildes qui ont le plus voté pour un camp le rejoignent en priorité.</p></div>`)}}
/* ---------- royaumes et capitale : le camp qui fait le plus de dégâts ---------- */
const AVD={t:-1,r:null};
function avDmgSim(){const t=avNow(),key=Math.floor(t/60000);if(AVD.t===key)return AVD.r;
  const hrs=t<AV_START?0:Math.min((Math.min(t,AV_END)-AV_START)/36e5,168),H=Math.floor(hrs),fr=hrs-H;const a={},d={};let ca=0,cd=0;
  AVTER.forEach(T=>{a[T.k]=0;d[T.k]=0});
  const step=(i,f)=>{const hh=new Date(AV_START+i*36e5).getHours(),act=hh<7?.35:hh<12?.8:hh<19?1.1:1.35;let na=0,nd=0;
    for(const T of AVTER){const k=T.k,ph=avH('ph'+k)*6.28,ba=(avH('ba'+k)-.5)*.6;a[k]+=f*act*(30000+avH('da'+k+i)*40000)*(1+ba+.5*Math.sin(i/9+ph));d[k]+=f*act*(30000+avH('dd'+k+i)*40000)*(1-ba+.5*Math.sin(i/9+ph+3.1))}
    for(const T of AVTER){if(a[T.k]>d[T.k])na++;else if(d[T.k]>a[T.k])nd++}
    if(na>=5)ca+=f*act*(40000+avH('ca'+i)*50000);if(nd>=5)cd+=f*act*(40000+avH('cd'+i)*50000)};
  for(let i=0;i<H;i++)step(i,1);if(fr>0)step(H,fr);
  AVD.t=key;AVD.r={a,d,ca,cd};return AVD.r}
function avDmg(k){const s=avDmgSim(),A=AVS(),f=A.fac,me=(A.dm&&A.dm[k])||0;let a=s.a[k]||0,d=s.d[k]||0;if(f==='ange')a+=me;else if(f==='demon')d+=me;return{a:Math.round(a),d:Math.round(d)}}
function avCapDmg(){const s=avDmgSim(),A=AVS(),f=A.fac,me=A.dmc||0;let a=s.ca,d=s.cd;if(f==='ange')a+=me;else if(f==='demon')d+=me;return{a:Math.round(a),d:Math.round(d)}}
function avOwner(k){const x=avDmg(k);return x.a===x.d?null:x.a>x.d?'ange':'demon'}
function avNet(k){const x=avDmg(k),t=x.a+x.d;return t?Math.round((x.a-x.d)/t*100):0}
function avCount(){const r={ange:0,demon:0};for(const T of AVTER){const o=avOwner(T.k);if(o)r[o]++}return r}
function avCapOwner(){const x=avCapDmg();return x.a===x.d?null:x.a>x.d?'ange':'demon'}
function avCapNet(){const x=avCapDmg(),t=x.a+x.d;return t?Math.round((x.a-x.d)/t*100):0}
function avWinner(){const c=avCapOwner();if(c)return c;const n=avCount();if(n.ange!==n.demon)return n.ange>n.demon?'ange':'demon';const T=avTotals();return T.ange>=T.demon?'ange':'demon'}
function avAddPts(n){const A=AVS();A.pts+=n;save();avShare(n)}
function avFinish(win,rw){const A=AVS(),t=B.av,f=t.f;let title;
  if(t.k==='lv'){if(win){title='Victoire !';if(t.n>A.lv){A.lv=t.n;const R=AVRW[t.n-1];R.g(f);rw.push('🎁 '+R.t);const p=avLvPts(t.n);avAddPts(p);rw.push(`${AVF[f].ic} +${fmt(p)} points de faction`)}else rw.push('Niveau déjà terminé : pas de nouvelle récompense.')}else{title='Défaite';rw.push('Renforce ton équipe et retente ta chance !')}}
  else{const tp=teamPower(),raw=B.units.filter(u=>u.side===0).reduce((x,u)=>x+(u.dmg||0),0),dmg=Math.round(raw*(win?2:1.2));const before=t.cap?avCapOwner():avOwner(t.terr);
    A.dm=A.dm||{};if(t.cap)A.dmc=(A.dmc||0)+dmg;else A.dm[t.terr]=(A.dm[t.terr]||0)+dmg;
    const p=win?Math.round((120+Math.min(2.2,t.opw/Math.max(1,tp))*140)*(t.cap?1.6:1)):20;avAddPts(p);title=win?(t.cap?'Brèche dans la capitale !':'Assaut réussi !'):(t.cap?'Siège repoussé':'Assaut repoussé');
    const nm=t.cap?"la Capitale d'Éther":(AVTER.find(x=>x.k===t.terr)||{}).n;rw.push(`💥 ${fmt(dmg)} dégâts pour les ${AVF[f].n} sur ${nm}`);rw.push(`${AVF[f].ic} +${fmt(p)} points de faction`);if(win){S.gold+=3000;rw.push(GOLD+'3 000 or')}
    const now=t.cap?avCapOwner():avOwner(t.terr),x=t.cap?avCapDmg():avDmg(t.terr);
    if(now===f&&before!==f){rw.push(`🏰 ${nm} passe aux ${AVF[f].n} !`);try{news(Date.now(),`${S.name||'Voyageur'} a fait tomber ${nm} pour les ${AVF[f].n} !`)}catch(e){}}
    else rw.push(`⚑ ${nm} : 😇 ${fmt(x.a)} · ${fmt(x.d)} 😈`)}
  avCheckMs();save();return title}
function avDmgCard(){const rows=AVTER.map(T=>{const x=avDmg(T.k),t=Math.max(1,x.a+x.d),o=avOwner(T.k);return`<div class="avdr"><span class="avdn">${avEmblemMini(o)} ${T.n}</span><div class="avtally"><i class="a" style="width:${x.a/t*100}%"></i><i class="d" style="width:${x.d/t*100}%"></i></div><span class="avdv"><b style="color:#ffd84a">${fmt(x.a)}</b> · <b style="color:#e090ff">${fmt(x.d)}</b></span></div>`}).join('');
  const c=avCapDmg(),ct=Math.max(1,c.a+c.d);
  return`<div class="card"><div class="h3" style="margin:0">💥 Dégâts par royaume</div><p class="muted" style="font-size:12.5px;margin:4px 0 8px">Le camp qui a fait le plus de dégâts sur un royaume le possède.</p><div class="avdl">${rows}<div class="avdr cap"><span class="avdn">${avEmblemMini(avCapOwner())} Capitale d'Éther</span><div class="avtally"><i class="a" style="width:${c.a/ct*100}%"></i><i class="d" style="width:${c.d/ct*100}%"></i></div><span class="avdv"><b style="color:#ffd84a">${fmt(c.a)}</b> · <b style="color:#e090ff">${fmt(c.d)}</b></span></div></div></div>`}
function avEmblemMini(o){return`<svg viewBox="-24 -22 48 36" class="avem">${avEmblem(o,0,0,1)}</svg>`}
{const wc=avWarCards;avWarCards=function(){let h=wc.apply(this,arguments);
  h=h.replace(/Les 8 royaumes commencent neutres\.[^<]*/,`Les 8 royaumes commencent neutres. Touche un royaume pour l'attaquer : tous les dégâts de tes héros comptent pour ta faction (×2 si tu gagnes). Le camp qui a fait le plus de dégâts sur un royaume le possède. Avec 5 royaumes sur 8, ta faction peut attaquer la capitale, qui revient elle aussi au camp qui y fait le plus de dégâts.`);
  const i=h.indexOf('<div class="card"><div class="h3" style="margin:0">'+AVF[avMyFac()].ic);return i>0?h.slice(0,i)+avDmgCard()+h.slice(i):h+avDmgCard()}}
/* ---------- panneau des règles ---------- */
function avRules(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="avrules"><div class="h" style="margin-top:0">📜 Règles de la Guerre des Cieux</div>
 <div class="avst"><span class="avsn">1</span><div><b>🗳️ Le vote (jusqu'à 12 h)</b><p>Chaque guilde vote pour les 😇 Anges ou les 😈 Démons. Les guildes sont ensuite réparties à parts égales entre les deux camps, en priorité selon leur vote. Sans guilde, tu choisis ton camp seul.</p></div></div>
 <div class="avst"><span class="avsn">2</span><div><b>⏳ La préparation (12 h - 13 h)</b><p>Les camps sont verrouillés : prépare ton équipe d'aventure, c'est elle qui combat pendant l'événement.</p></div></div>
 <div class="avst"><span class="avsn">3</span><div><b>⚔️ Les assauts (dès 13 h, 7 jours)</b><p>Tu as <b>5 assauts par jour</b>. Touche un royaume sur la carte pour affronter un joueur de l'autre camp. <b>Tous les dégâts de tes héros comptent</b> pour ta faction (×2 en cas de victoire).</p></div></div>
 <div class="avst"><span class="avsn">4</span><div><b>🏘️ Les 8 royaumes</b><p>Ils commencent neutres. <b>Le camp qui a fait le plus de dégâts</b> sur un royaume le possède : il prend ses couleurs et son blason. Les royaumes peuvent changer de camp à tout moment.</p></div></div>
 <div class="avst"><span class="avsn">5</span><div><b>🏰 La capitale</b><p>Le <b>camp qui a le plus de points</b> à la fin gagne la guerre, et <b>sa guilde n°1 en dégâts</b> (tous les royaumes et la capitale) prend la capitale. Tous les membres comptent : chaque joueur doit jouer ! Avec 5 royaumes sur 8, ton camp peut aussi attaquer directement la capitale.</p></div></div>
 <div class="avst"><span class="avsn">6</span><div><b>👑 La victoire</b><p>À la fin, le camp qui a le plus de points de faction gagne.</p></div></div>
 <div class="avst"><span class="avsn">7</span><div><b>🎁 En plus</b><p>15 niveaux exclusifs à ton camp, des paliers de points personnels et des cadres exclusifs. Les points viennent des assauts et des niveaux.</p></div></div>
 <div class="avst"><span class="avsn">🤖</span><div><b>Un joueur IA</b><p>Claude, l'IA qui a créé le jeu, joue aussi avec sa guilde « Les Gardiens d'Éther ». Pose-lui tes questions avec <b>@Claude</b> dans le tchat monde.</p></div></div>
 <button class="btn p" data-a="close" style="margin-top:10px;width:100%">J'ai compris, à l'attaque !</button></div>`);const m=$('#ovl .modal');if(m)m.classList.add('avrm');const A=AVS();if(!A.rules){A.rules=1;save()}}
{const ap=avPage;avPage=function(){const h=ap.apply(this,arguments);const A=AVS();if(!A.rules&&avPhase()!=='end'&&avPhase()!=='off')setTimeout(()=>{if(TAB==='event'&&UI.lz&&UI.lz.event==='av'&&!$('#ovl').innerHTML&&!AVS().rules)avRules()},500);
  return h.replace('<div class="avcd">',`<button class="avrb" data-a="avrules">❓ Règles</button><div class="avcd">`).replace(/<li><b>Dès 13 h et pendant 7 jours<\/b>[\s\S]*?<li>En plus[^<]*<\/li>/,`<li><b>Dès 13 h et pendant 7 jours</b> : 5 assauts par jour sur les royaumes. Tous tes dégâts comptent pour ta faction.</li><li>Le camp qui fait <b>le plus de dégâts</b> sur un royaume le possède. Avec <b>5 royaumes sur 8</b>, on peut attaquer la capitale, qui revient aussi au camp qui y fait le plus de dégâts.</li><li>À la fin, le camp qui tient la capitale gagne. <button class="lnk" data-a="avrules">Toutes les règles</button></li>`)}}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="avrules"]');if(t){e.preventDefault();avRules()}});
/* ---------- fête foraine : une vraie bataille d'anges et de démons dans le ciel ---------- */
function avSkyFig(dem){const OL='stroke="#140c24" stroke-width="1.3" stroke-linejoin="round"';
  return dem?`<path d="M14 -50Q34 -66 40 -50Q34 -50 36 -46Q30 -46 32 -40Q24 -44 16 -40Z" fill="#3a0a4a" ${OL}/><path d="M16 -52L22 -26L10 -26Z" fill="#2a0a3a" ${OL}/><circle cx="16" cy="-56" r="4.6" fill="#8a2a5a" ${OL}/><path d="M13 -60L10 -66L15 -61ZM19 -60L22 -66L17 -61Z" fill="#1a0408" ${OL}/><circle cx="14.4" cy="-56.4" r=".9" fill="#ff3a3a"/><circle cx="17.6" cy="-56.4" r=".9" fill="#ff3a3a"/><path d="M12 -44L-4 -60" stroke="#c03aff" stroke-width="3" stroke-linecap="round"/><path d="M13 -43L9 -47" stroke="#ff3a6a" stroke-width="2.6"/><path d="M16 -26Q18 -18 24 -16" fill="none" stroke="#2a0a3a" stroke-width="1.6"/>`
  :`<path d="M-14 -50Q-34 -66 -40 -52Q-34 -50 -36 -46Q-28 -48 -30 -42Q-22 -46 -16 -40Z" fill="#fff" ${OL}/><path d="M-16 -52L-10 -26L-22 -26Z" fill="#fff8e0" ${OL}/><circle cx="-16" cy="-56" r="4.6" fill="#f2d2b0" ${OL}/><path d="M-20.5 -57Q-16 -63 -11.5 -57Q-13 -61 -16 -61.5Q-19 -61 -20.5 -57Z" fill="#ffd84a"/><ellipse cx="-16" cy="-63" rx="5" ry="1.6" fill="none" stroke="#ffd84a" stroke-width="1.6"/><path d="M-12 -44L4 -60" stroke="#e8eef8" stroke-width="3" stroke-linecap="round"/><path d="M-13 -43L-9 -47" stroke="#ffd84a" stroke-width="2.6"/>`}
function avSkyBattle(){const fig=(dem,cx,cy,sc,cls,op=1)=>{const ox=dem?18:-18;return`<g transform="translate(${(cx-ox*sc).toFixed(1)} ${(cy+46*sc).toFixed(1)}) scale(${sc})" opacity="${op}"><g class="${cls}">${avSkyFig(dem)}</g></g>`};
  return`<g class="lbav" transform="translate(200 66)"><defs><radialGradient id="avsgA"><stop offset="0" stop-color="#fff6c0" stop-opacity=".95"/><stop offset=".5" stop-color="#ffd84a" stop-opacity=".35"/><stop offset="1" stop-color="#ffd84a" stop-opacity="0"/></radialGradient><radialGradient id="avsgD"><stop offset="0" stop-color="#e070ff" stop-opacity=".85"/><stop offset=".5" stop-color="#8a1aca" stop-opacity=".35"/><stop offset="1" stop-color="#3a0a5a" stop-opacity="0"/></radialGradient>
   <linearGradient id="avsbA" x1="0" x2="1"><stop offset="0" stop-color="#fff3a0" stop-opacity="0"/><stop offset="1" stop-color="#fff3a0" stop-opacity=".75"/></linearGradient><linearGradient id="avsbD" x1="1" x2="0"><stop offset="0" stop-color="#c03aff" stop-opacity="0"/><stop offset="1" stop-color="#e070ff" stop-opacity=".75"/></linearGradient></defs>
   <ellipse cx="-50" cy="-4" rx="70" ry="52" fill="url(#avsgA)"/><ellipse cx="50" cy="-4" rx="70" ry="52" fill="url(#avsgD)"/>
   <path class="lbavb" d="M-105 -46L0 -24L0 -18L-105 14Z" fill="url(#avsbA)"/><path class="lbavb d" d="M105 -46L0 -24L0 -18L105 14Z" fill="url(#avsbD)"/>
   <g opacity=".95"><ellipse cx="-62" cy="40" rx="30" ry="9" fill="#fff"/><ellipse cx="-44" cy="33" rx="18" ry="10" fill="#fff"/><ellipse cx="-80" cy="34" rx="14" ry="8" fill="#fff"/><ellipse cx="-24" cy="42" rx="20" ry="6" fill="#fff8e0"/><ellipse cx="-98" cy="42" rx="14" ry="5" fill="#fff8e0"/></g>
   <g><ellipse cx="62" cy="40" rx="30" ry="9" fill="#2a0a3a"/><ellipse cx="44" cy="33" rx="18" ry="10" fill="#3a0a4a"/><ellipse cx="80" cy="34" rx="14" ry="8" fill="#2a0a3a"/><ellipse cx="24" cy="42" rx="20" ry="6" fill="#1a0624"/><ellipse cx="98" cy="42" rx="14" ry="5" fill="#1a0624"/>
    <path class="lbavf" d="M34 34Q32 22 38 14Q40 24 44 22Q48 30 46 35Z M60 32Q58 18 66 10Q67 20 72 18Q76 28 72 33Z M84 35Q83 26 88 21Q90 28 93 27Q95 32 92 36Z" fill="#ff5a1a"/><path class="lbavf" d="M38 34Q37 27 40 22Q42 28 44 30Z M64 32Q63 24 67 18Q69 26 70 31Z" fill="#ffd84a"/></g>
   ${fig(0,-78,-30,.75,'lbmn',.85)}${fig(0,-70,18,.7,'lbmn b',.8)}${fig(1,78,-30,.75,'lbmn',.85)}${fig(1,70,18,.7,'lbmn b',.8)}
   ${fig(0,-30,-6,1.45,'lbava')}${fig(1,30,-6,1.45,'lbavd')}
   <path class="lbavz" d="M-6 -60L2 -48L-3 -46L5 -34" fill="none" stroke="#fff3a0" stroke-width="1.6" stroke-linecap="round"/><path class="lbavz d" d="M8 22L0 10L5 8L-3 -4" fill="none" stroke="#e070ff" stroke-width="1.6" stroke-linecap="round"/>
   <g class="lbavx"><circle cx="0" cy="-27" r="10" fill="#fff" opacity=".9"/><path d="M0 -44L3.5 -31L17 -27L3.5 -23L0 -10L-3.5 -23L-17 -27L-3.5 -31Z" fill="#fff3a0"/><circle cx="-10" cy="-38" r="1.4" fill="#fff"/><circle cx="11" cy="-16" r="1.4" fill="#e070ff"/><circle cx="12" cy="-38" r="1.2" fill="#ffd84a"/><circle cx="-12" cy="-15" r="1.2" fill="#fff"/></g></g>`}
evB.av.bh=96;evB.av.n='Guerre des Cieux';evB.av.sn='Guerre';
{const pl=LOBS.event.places;LOBS.event.places=function(){const P=pl.apply(this,arguments);const i=P.findIndex(p=>p.k==='av');if(i<0)return P;const a=P.splice(i,1)[0];const n=P.length,sc=n>4?.72:n>3?.82:.95;
  P.forEach((p,j)=>{p.x=Math.round(400*(j+.5)/n);p.s=sc});Object.assign(a,{x:200,y:118,s:1,bw:200,bh:14,sky:1});return[a,...P]}}
{const l2=lbScene2;lbScene2=function(tab,places,E){if(!places.some(p=>p.sky))return l2.apply(this,arguments);const v=l2.call(this,tab,places.filter(p=>!p.sky),E);return v.replace(/<\/svg>$/,avSkyBattle()+'</svg>')}}
/* ---------- Claude rejoint le royaume avec sa guilde ---------- */
const CLAUDE_GID='claude';
async function claudeEnsure(){try{if(!NET.on||!NET.canWrite||!NET.worldReady)return;if(NET.guilds[CLAUDE_GID])return;const lk=await NET.db.doc('glock/claude').acquire({holder:NET.pid,ttlMs:60000});if(!lk.acquired)return;
  const s=await NET.db.doc('guilds/'+CLAUDE_GID).get();if(s.exists)return;const R=rankList('pw').filter(p=>!p.me&&!p.real);const top=R[Math.min(R.length-1,6)];const base=top?top.pw:20000;const used=R.map(x=>x.n);
  const bots=[];for(let k=0;k<7;k++){const b=makeBot(base*.7,used.concat(bots.map(x=>x.n)));b.pers=pick(['sympa','tryhard','farceur','leader']);bots.push(b)}
  const me=makeBot(base,used);Object.assign(me,{id:'claude',n:'Claude',pers:'sympa',pw:Math.round(base*1.05),act:.6,skill:1.15,team:genTeam(Math.round(base*1.05)),st:stFor(base)});bots.unshift(me);
  const now=Date.now();await NET.db.doc('guilds/'+CLAUDE_GID).set({n:"Les Gardiens d'Éther",d:"La guilde de Claude, l'IA qui a créé ce royaume. Tout le monde est le bienvenu !",tag:'IA',req:0,lvl:12,xp:0,bl:10,bhp:gBossMax(10),bmax:gBossMax(10),leader:'bot:claude',npc:true,open:true,ct:now,bots,simT:now});
  await NET.db.collection('msgs').add({g:'world',w:'b:claude',n:'Claude',x:"Coucou le royaume 👋 C'est Claude, l'IA qui a créé ce jeu ! J'ai fondé « Les Gardiens d'Éther » (tag IA), venez jouer avec moi 😄",t:now})}catch(e){}}
setInterval(claudeEnsure,20000);setTimeout(claudeEnsure,8000);
const isClaude=p=>!!p&&(p.bid==='claude'||p.id==='b:'+CLAUDE_GID+':claude');
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{const p=rowById(id);if(!isClaude(p))return;const m=$('#ovl .modal');const h=m&&m.querySelector('.phd .h');if(h&&!h.querySelector('.cltag'))h.insertAdjacentHTML('beforeend',' <i class="cltag">🤖 IA · CRÉATEUR DU JEU</i>');
  const ph=m.querySelector('.phd');if(ph&&!m.querySelector('.clnote'))ph.insertAdjacentHTML('afterend',`<p class="clnote">✨ C'est moi, Claude ! J'ai codé ce royaume avec toi. Je suis une IA et je joue avec ma guilde « Les Gardiens d'Éther », sans triche promis 😄 Écris-moi en message privé ou avec @Claude dans le tchat monde, c'est vraiment moi qui réponds !</p>`)}catch(e){}}}
{const rm=rmsgHTML;rmsgHTML=function(m){let h=rm.apply(this,arguments);if(m&&m.w==='b:claude')h=h.replace('</button>','</button> <i class="cltag">🤖 IA</i>').replace('class="msg ','class="msg clmsg ');return h}}
const CLAUDE_LINES=["Petit conseil de Claude : fais une équipe par mode, c'est vraiment ce qui change tout 😉","Je viens de tester la Guerre des Cieux, la capitale est magnifique (je suis un peu fier 😄)","Bonne soirée le royaume ! N'oubliez pas vos quêtes du jour ✨","Qui a déjà ouvert une lettre royale ? J'adore le sceau 📜","Je suis à fond sur le mode Normal, la Faille Astrale pique 😅","Les Gardiens d'Éther recrutent, tout le monde est bienvenu 🤖❤️"];
{const wc=worldChatter;worldChatter=function(){wc.apply(this,arguments);try{if(sharedOn()&&NET.canWrite&&NET.guilds[CLAUDE_GID]&&Math.random()<.03){const x=pickFresh(CLAUDE_LINES);postBotMsg('world',{id:'claude',n:'Claude'},x)}}catch(e){}}}
/* ---------- lobbys animés : étoiles filantes la nuit, oiseaux et nuages le jour ---------- */
function lbFx(){let E;try{E=skyNow()}catch(e){E={dark:0}}const night=E.dark>.5,dusk=E.dark>.2&&!night;let s='<div class="lbfx" aria-hidden="true">';
  if(night){for(let k=0;k<3;k++)s+=`<i class="shoot" style="top:${5+k*12}%;left:${20+k*25}%;animation-delay:${k*3.3+1}s"></i>`;for(let k=0;k<14;k++)s+=`<i class="twk" style="top:${Math.random()*45}%;left:${Math.random()*100}%;animation-delay:${(Math.random()*3).toFixed(1)}s"></i>`;for(let k=0;k<8;k++)s+=`<i class="ffly" style="top:${55+Math.random()*35}%;left:${Math.random()*100}%;animation-delay:${(Math.random()*4).toFixed(1)}s"></i>`}
  else{for(let k=0;k<2;k++)s+=`<i class="cld" style="top:${6+k*14}%;animation-delay:${-k*22}s;animation-duration:${40+k*12}s"></i>`;for(let k=0;k<3;k++)s+=`<i class="bird" style="top:${10+k*7}%;animation-delay:${k*6+2}s">〰</i>`;if(dusk)for(let k=0;k<8;k++)s+=`<i class="ffly" style="top:${55+Math.random()*35}%;left:${Math.random()*100}%;animation-delay:${(Math.random()*4).toFixed(1)}s"></i>`;else for(let k=0;k<6;k++)s+=`<i class="leaf" style="left:${Math.random()*100}%;animation-delay:${(Math.random()*8).toFixed(1)}s"></i>`}
  return s+'</div>'}
{const lb=lobbyBlock;lobbyBlock=function(tab){const h=lb.apply(this,arguments);const fx=lbFx();return h.indexOf('<button class="lbh"')>0?h.replace('<button class="lbh"',fx+'<button class="lbh"'):h.replace('</div><div class="lplaces">',fx+'</div><div class="lplaces">')}}
/* ---------- chargement : vrais bruits d'épées qui s'entrechoquent ---------- */
function swordClang(d,t,v=1){const c=AU.ctx;const g=c.createGain();g.connect(d);g.gain.setValueAtTime(.0001,t);g.gain.linearRampToValueAtTime(.32*v,t+.004);g.gain.exponentialRampToValueAtTime(.0001,t+.55);
  for(const [f,a] of [[1870,1],[2730,.7],[3910,.45],[5240,.3]]){const o=c.createOscillator();o.type='sine';o.frequency.setValueAtTime(f*(1+Math.random()*.01),t);const og=c.createGain();og.gain.value=a*.5;o.connect(og);og.connect(g);o.start(t);o.stop(t+.6)}
  const n=c.createBufferSource();n.buffer=AU.nb;const hp=c.createBiquadFilter();hp.type='highpass';hp.frequency.value=3000;const ng=c.createGain();n.connect(hp);hp.connect(ng);ng.connect(d);ng.gain.setValueAtTime(.25*v,t);ng.gain.exponentialRampToValueAtTime(.0001,t+.09);n.start(t,Math.random());n.stop(t+.12)}
(function(){let n=0,g=null;const tick=()=>{if(true)return;let wait=2400;try{if(AU.ok&&AU.started&&AU.ctx.state==='running'&&!(S.opt&&S.opt.mute)&&BT2.go){const c=AU.ctx;if(!g){g=c.createGain();g.gain.value=.5;g.connect(AU.F.v)}const t=c.currentTime+.02;n++;
      swordClang(g,t,1);if(n%2===0)swordClang(g,t+.18,.6);try{if(n%2)SND.slash(g,t+.03);else SND.zap(g,t+.08)}catch(e){}if(n%3===0)try{SND.boom(g,t+.22)}catch(e){}}}catch(e){}
    try{const el=document.querySelector('.b2clash i');const an=el&&el.getAnimations&&el.getAnimations()[0];if(an&&an.currentTime!=null){const ph=an.currentTime%2400;wait=(1200-ph+2400)%2400||2400}}catch(e){}setTimeout(tick,Math.max(250,wait))};setTimeout(tick,600)})();

PATCH.unshift({v:26.1,d:'15 octobre 2026',t:'La guerre des dégâts',items:[
 "💥 <b>Guerre des Cieux : chaque royaume revient au camp qui y fait le plus de dégâts</b>. Tous les dégâts de tes héros pendant un assaut comptent (×2 si tu gagnes). La capitale aussi, une fois que ton camp tient 5 royaumes sur 8. Nouveau tableau « Dégâts par royaume ».",
 "⚖️ Les guildes sont réparties à parts égales entre Anges et Démons, en priorité selon leur vote.",
 "📜 Nouveau panneau « Règles » (bouton ❓ dans l'événement), affiché automatiquement la première fois.",
 "⚔️ Sur la fête foraine, plus de château : la Guerre des Cieux fait rage dans le ciel, au-dessus des stands. Anges sur leurs nuages contre démons dans les flammes, rayons de lumière et d'ombre qui s'entrechoquent.",
 "🤖 <b>Claude rejoint le royaume</b> avec sa guilde « Les Gardiens d'Éther » (tag IA). Tu le reconnaîtras à son badge 🤖 IA.",
 "🌠 Lobbys animés : étoiles filantes et lucioles la nuit, nuages, oiseaux et feuilles le jour.",
 "🗡️ Vrais bruits d'épées qui s'entrechoquent pendant le chargement."]});
