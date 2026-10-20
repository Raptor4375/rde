
/* ================= V21 : BOÎTE AUX LETTRES, LETTRES ROYALES, ANNONCES DE GUILDE ================= */
function LETS(){if(!Array.isArray(S.letters))S.letters=[];return S.letters}
const UPD_GEMS=500;
const ORDJ=['premier','deuxième','troisième','quatrième','cinquième','sixième','septième','huitième','neuvième','dixième','onzième','douzième','treizième','quatorzième','quinzième','seizième','dix-septième','dix-huitième','dix-neuvième','vingtième','vingt et unième','vingt-deuxième','vingt-troisième','vingt-quatrième','vingt-cinquième','vingt-sixième','vingt-septième','vingt-huitième','vingt-neuvième','trentième','trente et unième'];
const MOISF=['de janvier','de février','de mars',"d'avril",'de mai','de juin','de juillet',"d'août",'de septembre',"d'octobre",'de novembre','de décembre'];
function roman(n){const T=[[1000,'M'],[900,'CM'],[500,'D'],[400,'CD'],[100,'C'],[90,'XC'],[50,'L'],[40,'XL'],[10,'X'],[9,'IX'],[5,'V'],[4,'IV'],[1,'I']];let s='';for(const [v,r] of T)while(n>=v){s+=r;n-=v}return s}
function medDate(t){const d=new Date(t);return`Le ${ORDJ[d.getDate()-1]} jour du mois ${MOISF[d.getMonth()]}, an de grâce ${roman(d.getFullYear())}`}
const JAG=(()=>{const R=rng(777),p=[];const n=26;for(let i=0;i<=n;i++)p.push(`${(i/n*100).toFixed(1)}% ${(R()*1.6).toFixed(2)}%`);for(let i=1;i<=n;i++)p.push(`${(100-R()*1.4).toFixed(2)}% ${(i/n*100).toFixed(1)}%`);for(let i=n-1;i>=0;i--)p.push(`${(i/n*100).toFixed(1)}% ${(100-R()*1.6).toFixed(2)}%`);for(let i=n-1;i>0;i--)p.push(`${(R()*1.4).toFixed(2)}% ${(i/n*100).toFixed(1)}%`);return p.join(',')})();
let SEALN=0;
function sealSVG(kind,txt,col){const id='sl'+(++SEALN);col=col||(kind==='upd'?'#a8141f':kind==='guild'?'#7c1236':'#7a2a10');
  let d='';const N=28;for(let i=0;i<=N;i++){const a=i/N*Math.PI*2,r=43+(i%2?3.2:-1.5)+Math.sin(i*2.3)*1.6;d+=(i?'L':'M')+(50+Math.cos(a)*r).toFixed(1)+' '+(50+Math.sin(a)*r).toFixed(1)}
  let inner='';
  if(kind==='upd')inner=`<path d="M30 60L27 38L38 48L50 32L62 48L73 38L70 60Z" fill="#7a0c12" opacity=".9"/><path d="M30 60H70V66H30Z" fill="#7a0c12" opacity=".9"/><circle cx="50" cy="31" r="3" fill="#7a0c12"/><circle cx="27" cy="37" r="2.4" fill="#7a0c12"/><circle cx="73" cy="37" r="2.4" fill="#7a0c12"/><path d="M31 59L28.5 40L38.5 49.5L50 34.5L61.5 49.5L71.5 40L69 59Z" fill="none" stroke="#ff9a8a" stroke-width=".8" opacity=".55"/>`;
  else if(kind==='guild')inner=`<path d="M24 62Q20 46 30 32M76 62Q80 46 70 32" stroke="#4a0820" stroke-width="2.4" fill="none" stroke-linecap="round"/>${[0,1,2,3].map(i=>`<ellipse cx="${25+i*1.5}" cy="${56-i*7}" rx="3.2" ry="1.6" transform="rotate(-50 ${25+i*1.5} ${56-i*7})" fill="#4a0820"/><ellipse cx="${75-i*1.5}" cy="${56-i*7}" rx="3.2" ry="1.6" transform="rotate(50 ${75-i*1.5} ${56-i*7})" fill="#4a0820"/>`).join('')}<text x="50" y="${String(txt).length>3?55:57}" text-anchor="middle" font-family="MedievalSharp,serif" font-size="${String(txt).length>3?15:19}" fill="#4a0820" font-weight="700">${esc(String(txt||'').slice(0,4))}</text>`;
  else inner=`<text x="50" y="62" text-anchor="middle" font-size="34" fill="#4a0a08">⚜</text>`;
  return`<svg class="sealsv" viewBox="0 0 100 100" aria-hidden="true"><defs><radialGradient id="${id}" cx=".36" cy=".3" r=".8"><stop offset="0" stop-color="#e85a5a"/><stop offset=".45" stop-color="${col}"/><stop offset="1" stop-color="#3a0408"/></radialGradient></defs><path d="${d}Z" fill="url(#${id})"/><path d="${d}Z" fill="none" stroke="#2a0204" stroke-width="1" opacity=".5"/><circle cx="50" cy="50" r="31" fill="none" stroke="#3a0408" stroke-width="2.6" opacity=".55"/><circle cx="50" cy="50" r="28.5" fill="none" stroke="#ff8a7a" stroke-width=".8" opacity=".35"/>${inner}<ellipse cx="38" cy="30" rx="10" ry="5" fill="#fff" opacity=".18" transform="rotate(-30 38 30)"/></svg>`}
function addLetter(L){const A=LETS();if(L.id&&A.some(x=>x.id===L.id))return null;L=Object.assign({id:'l'+Date.now().toString(36)+Math.random().toString(36).slice(2,5),t:Date.now(),read:false,claimed:!L.gems},L);A.unshift(L);if(A.length>40){const i=A.map((x,k)=>[x,k]).reverse().find(([x])=>x.read&&(x.claimed||!x.gems));if(i)A.splice(i[1],1);else A.length=40}save();return L}
function letUnread(){return LETS().filter(l=>!l.read||(l.gems&&!l.claimed)).length}
function mailCount(){return letUnread()+(S.mail||[]).length}
/* ---- lettre royale à chaque mise à jour ---- */
function updLetterCheck(){if((S.updGift||0)>=GAME_V)return;S.updGift=GAME_V;const P=PATCH[0];
  addLetter({id:'upd'+GAME_V,k:'upd',from:"Le Grand Héraut d'Éther",role:'au nom de Sa Majesté',title:`Proclamation royale · mise à jour ${P.v}`,head:"Oyez, oyez, braves sujets du Royaume d'Éther !",
    body:`Par la présente, Sa Majesté fait savoir à tous ses sujets que le royaume s'est enrichi de nouvelles merveilles, sous le titre de « ${P.t} ».\nQue chacun en prenne connaissance et en fasse bon usage :`,
    items:P.items.map(x=>x.replace(/<[^>]+>/g,'')),end:`En gage de sa bienveillance et pour saluer votre fidélité, la Couronne vous fait don de ${UPD_GEMS} gemmes, scellées en ce pli.`,gems:UPD_GEMS});
  save()}
/* ---- annonces de guilde ---- */
function canAnn(){if(S.rgid){const d=NET.guilds[S.rgid];return!!d&&NET.canWrite&&ROLE_RANK[gRoleOf(d,NET.pid)]>=2}const g=S.gid&&GU(S.gid);return!!g&&g.leader==='me'}
function myRoleName(){if(S.rgid){const d=NET.guilds[S.rgid];return ROLE_N[gRoleOf(d,NET.pid)]||'Membre'}return'Chef'}
function guildInfo(){const g=myGuild();if(!g)return null;let tag='';try{tag=gTag(myTagKey())||''}catch(e){}if(!tag)tag=(g.tag||g.n.slice(0,3)).toUpperCase();return{g,tag}}
function annModal(){if(!canAnn())return toast("Seuls le chef et les sous-chefs peuvent écrire une annonce.");const gi=guildInfo();
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h" style="margin-top:0">📜 Rédiger une annonce</div><p class="sub">Ta lettre sera scellée du sceau de ${esc(gi.g.n)} et déposée dans la boîte aux lettres de chaque membre.</p>
  <form data-f="annw" class="stack" style="gap:10px"><label class="muted" for="annt" style="font-size:12.5px;font-weight:800">Titre</label><input class="tx" id="annt" maxlength="60" placeholder="Ex. : Assemblée de la semaine" required>
  <label class="muted" for="annb" style="font-size:12.5px;font-weight:800">Ta lettre</label><textarea class="tx anntx" id="annb" maxlength="600" rows="6" placeholder="Mes braves compagnons, …" required></textarea>
  <div class="row" style="justify-content:space-between;align-items:center"><span class="muted" style="font-size:12px">Signée : <b>${esc(S.name||'Voyageur')}</b>, ${esc(myRoleName())} · max 600 caractères</span><span class="annseal">${sealSVG('guild',gi.tag)}</span></div>
  <div class="row"><button type="button" class="btn" data-a="annprev">Aperçu</button><button class="btn p" type="submit">🕯️ Sceller et envoyer</button></div></form>`)}
function annDraft(){const t=($('#annt')||{}).value||'',b=($('#annb')||{}).value||'';return{title:t.trim().slice(0,60),body:b.trim().slice(0,600)}}
async function annSend(){const {title,body}=annDraft();if(!title||!body)return toast("Il faut un titre et un texte.");if(!canAnn())return;const gi=guildInfo(),now=Date.now();
  const a={id:'a'+now.toString(36),t:now,from:S.name||'Voyageur',role:myRoleName(),title,body,by:S.rgid?NET.pid:'me'};
  if(S.rgid){try{await realGuildUpdate(d=>({anns:[...(Array.isArray(d.anns)?d.anns:[]),a].slice(-8)}));postMsg(`📜 ${a.from} a envoyé une annonce : « ${title} ». Regardez vos boîtes aux lettres !`,true);
      const bs=[...gBots(S.rgid)].sort((x,y)=>(y.last||0)-(x.last||0)).slice(0,4);const n=Math.min(bs.length,ri(1,3));for(let k=0;k<n;k++){const b=bs[k];setTimeout(()=>postBotMsg(S.rgid,b,pick(ANNREACT).replace('{me}',a.from)),3000+k*3500+Math.random()*2500)}}
    catch(e){return toast("L'annonce n'a pas pu être envoyée.")}}
  else{const g=GU(S.gid);g.anns=[...(g.anns||[]),a].slice(-8);chat(now,'sys',`📜 Tu as envoyé une annonce : « ${title} ».`,false);const m=mates().filter(online).slice(0,3);m.forEach((p,k)=>setTimeout(()=>{chat(Date.now(),p.id,pick(ANNREACT).replace('{me}',S.name||'chef'),true);save()},2500+k*3000))}
  S.annSeen=[...(S.annSeen||[]),a.id].slice(-80);
  addLetter({id:'m'+a.id,k:'guild',mine:1,from:a.from,role:a.role,gname:gi.g.n,gtag:gi.tag,title,body,read:false});
  closeModal();toast('📜 Annonce scellée et envoyée à toute la guilde !');try{SND&&SND.chest&&SND.chest()}catch(e){}render()}
const ANNREACT=["Bien reçu chef 👍","Lettre reçue, le sceau est magnifique 📜","À vos ordres {me} !","Message reçu, on s'y met 💪","Oyez oyez 😄 bien reçu","Merci pour l'annonce {me} !","Compris, je serai là","Je l'ai lue, on va tout casser 🔥"];
const BOTLET=[
 {t:"Ordre de bataille",b:"Mes braves compagnons,\nLe Golem du Néant se dresse encore devant nos portes, au niveau {bl}. Que chacun y porte ses coups avant la tombée de la nuit, car la gloire de {g} en dépend.\nQue vos lames soient affûtées et vos soigneurs vigilants."},
 {t:"Assemblée de la semaine",b:"Membres de {g},\nNotre guilde a atteint le niveau {lvl}, et c'est grâce à chacun de vous. Cette semaine, je vous demande trois choses : pointer chaque jour, frapper le Golem et aider les nouveaux venus.\nEnsemble, nous irons plus haut."},
 {t:"Appel aux recrues",b:"À tous nos membres,\nNous avons encore de la place sous notre bannière. Si vous croisez un aventurier sans guilde, parlez-lui de {g} dans le tchat du monde ou par pigeon voyageur.\nUne guilde forte est une guilde nombreuse."},
 {t:"Du pointage quotidien",b:"Chers compagnons,\nIl m'a été rapporté que certains oublient le pointage. Qu'il soit su que chaque pointage fait grandir notre guilde et remplit vos bourses de pièces.\nNul ne sera blâmé, mais tous seront remerciés."},
 {t:"Festin à la taverne",b:"Oyez, compagnons !\nPour célébrer nos victoires, la taverne de {g} ouvre ses portes ce soir. Hydromel pour tous, et une chope offerte à celui qui portera le plus gros coup au Golem.\nVenez nombreux, et apportez vos histoires."},
 {t:"Conseil de guerre",b:"Membres de {g},\nNos érudits ont étudié les forces du royaume. Retenez ceci : deux héros d'une même classe s'épaulent, et chaque boss craint une classe. Contre le Golem, ce sont les Assassins qui frappent le plus fort.\nFaites une équipe pour chaque combat."},
 {t:"Avertissement aux absents",b:"À qui de droit,\nLes membres qui ne se présentent plus depuis dix jours seront priés de céder leur place. Ce n'est point de la méchanceté : {g} a besoin de bras actifs.\nCeux qui reviennent seront toujours accueillis."},
 {t:"Le marché de nuit",b:"Compagnons,\nUn marchand m'a soufflé que le marché de nuit ouvrira ses étals dès dix-neuf heures. On y trouve des pièces rares à bon prix.\nNe dépensez point toutes vos gemmes au casino de Fortuna."},
 {t:"Fierté de la bannière",b:"Mes chers membres,\nJe voulais simplement vous dire ma fierté. {g} n'est pas seulement une guilde, c'est une famille. Continuez ainsi, et que le royaume entier connaisse notre nom.\nMerci à chacun."}];
function botLetterTick(){
  try{const gi=guildInfo();if(!gi)return;const g=gi.g;let L=null,lid;const now=Date.now();
    if(S.rgid){const d=NET.guilds[S.rgid];if(!d)return;
      for(const a of(Array.isArray(d.anns)?d.anns:[])){if(a.by===NET.pid||(S.annSeen||[]).includes(a.id))continue;if(a.t<(S.rgJoined||0)-3*864e5||now-a.t>14*864e5){S.annSeen=[...(S.annSeen||[]),a.id].slice(-80);continue}
        S.annSeen=[...(S.annSeen||[]),a.id].slice(-80);addLetter({id:'r'+a.id,k:'guild',from:a.from,role:a.role,gname:g.n,gtag:gi.tag,title:a.title,body:a.body,t:a.t});toast('📮 Nouvelle annonce de guilde : '+esc(a.title));renderTop();renderTabs()}}
    let leader=null;if(S.rgid){const d=NET.guilds[S.rgid];if(d&&String(d.leader).startsWith('bot:')){const b=gBots(S.rgid).find(x=>'bot:'+x.id===d.leader);if(b)leader={n:b.n,pers:b.pers}}}
    else if(S.gid&&g.leader&&g.leader!=='me'){const p=PL(g.leader);if(p)leader={n:p.n,pers:p.pers}}
    if(!leader)return;const gid=S.rgid||S.gid;
    if(!(S.annSeen||[]).includes('wel:'+gid)){S.annSeen=[...(S.annSeen||[]),'wel:'+gid].slice(-80);
      L={id:'wel:'+gid,title:`Bienvenue en nos murs`,body:`Cher ${S.name||'Voyageur'},\nC'est avec grande joie que je t'accueille au sein de ${g.n}. Ici, nous frappons le Golem chaque jour, nous pointons fidèlement et nous nous entraidons.\nN'hésite pas à prendre la parole à la taverne, et que la fortune guide tes invocations.`}}
    else{const di=Math.floor(now/864e5),h=ih(String(gid).length*97+di);if(h%5>=2)return;lid='bl:'+gid+':'+di;if((S.annSeen||[]).includes(lid))return;if(now-(S.rgJoined||S.gJoined||0)<6*36e5&&S.rgid)return;
      S.annSeen=[...(S.annSeen||[]),lid].slice(-80);const T=BOTLET[(h>>>3)%BOTLET.length];L={id:lid,title:T.t,body:T.b.replace(/\{g\}/g,g.n).replace('{bl}',g.bl||1).replace('{lvl}',g.lvl||1)}}
    addLetter({id:L.id,k:'guild',from:leader.n,role:'Chef de la guilde',gname:g.n,gtag:gi.tag,title:L.title,body:L.body});toast('📮 Une lettre scellée de '+esc(leader.n)+' t\'attend !');renderTop();renderTabs()}catch(e){}}
setInterval(botLetterTick,25000);
{const on0=onNet;onNet=function(){on0.apply(this,arguments);try{botLetterTick()}catch(e){}}}
/* ---- rendu des lettres ---- */
function letterBodyHTML(L){const paras=String(L.body||'').split(/\n+/).filter(Boolean);
  return paras.map((p,i)=>`<p class="${i===0?'dc':''}">${esc(p)}</p>`).join('')+(L.items&&L.items.length?`<ul class="pitems">${L.items.map(x=>`<li>${esc(x)}</li>`).join('')}</ul>`:'')+(L.end?`<p>${esc(L.end)}</p>`:'')}
function letterHTML(L,anim){const kind=L.k==='upd'?'upd':L.k==='guild'?'guild':'sys';
  const head=L.head||(L.k==='guild'?`Oyez, oyez, fidèles de la guilde ${L.gname} !`:'Oyez, oyez !');
  const sig=L.k==='guild'?`Par ordre de <b>${esc(L.from)}</b>,<br>${esc(L.role||'Chef')} de la guilde ${esc(L.gname)}`:`Par ordre de Sa Majesté,<br><b>${esc(L.from)}</b>`;
  const gift=L.gems?`<div class="pgift">${L.claimed?`💎 ${fmt(L.gems)} gemmes reçues`:`<span>Ci-joint, scellées en ce pli : <b>💎 ${fmt(L.gems)} gemmes</b></span><button class="btn p" data-a="lclaim" data-v="${esc(L.id)}">Recevoir le don</button>`}</div>`:'';
  return`<div class="lmod"><button class="x" data-a="close" aria-label="Fermer">×</button><div class="pwrap ${anim?'unroll':''}"><div class="rod rtop"></div><div class="parch" style="clip-path:polygon(${JAG})">
    <div class="pdate">${medDate(L.t)}</div><div class="pohd">${esc(head)}</div><h3 class="ptitle">${esc(L.title)}</h3><div class="pbody">${letterBodyHTML(L)}</div>
    <div class="pfoot"><div class="psig">${sig}<div class="pdone">Fait ${L.k==='guild'?'en notre forteresse':'au palais royal'}, ce jour.</div></div><div class="pseal">${sealSVG(kind,L.gtag||'')}<span class="ribbon"></span></div></div>${gift}</div><div class="rod rbot"></div></div>
    <div class="row" style="justify-content:center;margin-top:10px"><button class="btn" data-a="gomail">📮 Boîte aux lettres</button>${L.read&&(L.claimed||!L.gems)?`<button class="btn sm" data-a="ldel" data-v="${esc(L.id)}">Brûler la lettre 🔥</button>`:''}</div></div>`}
function envHTML(L){const kind=L.k==='upd'?'upd':L.k==='guild'?'guild':'sys';
  return`<div class="lmod"><button class="x" data-a="close" aria-label="Fermer">×</button><div class="envw"><div class="env"><div class="envflap"></div><div class="envaddr"><small>De la part de</small><b>${esc(L.from)}</b><small>${L.k==='guild'?esc(L.gname):"Palais royal d'Éther"}</small></div><div class="envto">À l'attention de<br><b>${esc(S.name||'Voyageur')}</b></div><button class="envseal" data-a="lbreak" data-v="${esc(L.id)}" aria-label="Briser le sceau">${sealSVG(kind,L.gtag||'')}</button></div>
  <p class="envhint">${L.gems?'💎 Ce pli contient un présent. ':''}Touche le sceau de cire pour le briser.</p><div class="row" style="justify-content:center"><button class="btn p" data-a="lbreak" data-v="${esc(L.id)}">🗡️ Briser le sceau</button></div></div></div>`}
function openLetter(id){const L=LETS().find(x=>x.id===id);if(!L)return;modal(L.read?letterHTML(L):envHTML(L))}
function claimLetter(L){if(!L||!L.gems||L.claimed)return 0;L.claimed=true;S.gems+=L.gems;return L.gems}
/* ---- bureau de poste ---- */
function pPoste(){const A=LETS(),M=S.mail||[];const can=canAnn();const gemsW=A.filter(l=>l.gems&&!l.claimed).reduce((a,l)=>a+l.gems,0);
  const rows=A.map(L=>{const kind=L.k==='upd'?'upd':L.k==='guild'?'guild':'sys';return`<button class="lrow ${L.read?'':'unr'}" data-a="lopen" data-v="${esc(L.id)}"><span class="lenv ${L.read?'open':''}">${L.read?'':`<span class="lsl">${sealSVG(kind,L.gtag||'')}</span>`}</span><span class="who"><b>${esc(L.title)}</b><small>${L.mine?'Envoyée par toi':'De '+esc(L.from)}${L.k==='guild'?' · '+esc(L.gname||''):''} · ${ago(L.t)}</small></span>${L.gems&&!L.claimed?`<i class="lgem">💎 ${fmt(L.gems)}</i>`:''}${!L.read?'<i class="pdot">!</i>':''}</button>`}).join('');
  return`<div class="card postcard"><div class="row" style="justify-content:space-between;align-items:flex-start"><div style="min-width:0"><div class="h3" style="margin:0">📮 Bureau de poste</div><div class="muted" style="font-size:12.5px">Lettres royales (un don de gemmes à chaque mise à jour), annonces de ta guilde et colis de récompenses.</div></div>
   ${gemsW+M.length?`<button class="btn g sm" data-a="lclaimall">Tout récupérer</button>`:''}</div>
   ${can?`<div class="row" style="margin-top:10px"><button class="btn p" data-a="annw">📜 Rédiger une annonce de guilde</button></div>`:(S.rgid||S.gid)?`<p class="muted" style="font-size:12px;margin:8px 0 0">Seuls le chef et les sous-chefs peuvent envoyer des annonces à la guilde.</p>`:''}</div>
  <div class="h3" style="margin:4px 0 0">✉️ Lettres · ${A.length}</div><div class="list" style="gap:6px">${rows||'<div class="card muted">Ta boîte est vide pour le moment.</div>'}</div>
  <div class="h3" style="margin:4px 0 0">📦 Colis · ${M.length}</div>${M.length?`<div class="list" style="gap:6px">${M.slice(0,30).map(m=>`<div class="mrow" style="cursor:default"><span>📦</span><span style="min-width:0">${esc(m.x||'Récompense')}<small class="muted" style="display:block">${[m.gems?m.gems+' gemmes':'',m.coins?m.coins+' pièces':'',m.shards?m.shards+' éclats':'',m.gold?fmt(m.gold)+' or':''].filter(Boolean).join(' · ')}</small></span><span></span></div>`).join('')}</div>`:'<div class="card muted">Aucun colis en attente.</div>'}`}
/* ---- Grand-Place : poste et pigeonnier ---- */
LOBS.top.d='Classements, amis, tchat, courrier et succès.';
LOBS.top.places=()=>[
 {k:'rank',ic:'🏆',n:'Podium',sn:'Podium',d:'Classements du royaume',b:LB.podium,x:42,y:214,s:.8,bw:90,bh:44},
 {k:'amis',ic:'💌',n:'Maison des amis',sn:'Amis',d:'Amis, cœurs et demandes',b:()=>LB.house({wall:'#ffd0e4',roof:'#d0507a',w:60}),x:108,y:208,s:.78,bw:78,bh:66,badge:()=>{try{return heartsPending()+frRequests().length}catch(e){return 0}}},
 {k:'monde',ic:'📢',n:'Fontaine',sn:'Fontaine',d:'Tchat du monde',b:LB.fountain,x:174,y:218,s:.82,bw:92,bh:62},
 {k:'poste',ic:'📮',n:'Bureau de poste',sn:'Poste',d:'Lettres royales, annonces et colis',b:()=>LB.postoffice(),x:242,y:208,s:.8,bw:96,bh:72,badge:()=>mailCount()},
 {k:'mp',ic:'🕊️',n:'Pigeonnier',sn:'MP',d:'Messages privés',b:()=>LB.dovecote(),x:306,y:212,s:.8,bw:44,bh:80,badge:()=>dmUnread()},
 {k:'ach',ic:'🏅',n:'Salle des trophées',sn:'Trophées',d:'Succès et cadres',b:()=>LB.temple('#fff0c0','#c8901a'),x:364,y:212,s:.62,bw:100,bh:76,badge:()=>{try{return achPending()}catch(e){return 0}}}];
{const ps=pSocial;pSocial=function(){const z=UI.lz&&UI.lz.top;if(z==='poste'||z==='mp')return`<div class="stack">${zoneBar('top',z)}${z==='poste'?pPoste():pMP()}</div>`;return ps.apply(this,arguments)}}
/* ---- annonces dans le grand hall ---- */
function annCard(){const g=myGuild();if(!g)return'';let L=[];if(S.rgid){const d=NET.guilds[S.rgid];L=Array.isArray(d&&d.anns)?d.anns:[]}else{const lg=GU(S.gid);L=(lg&&lg.anns)||[]}
  const gi=guildInfo();
  return`<div class="card anncard"><div class="row" style="justify-content:space-between;align-items:center"><div style="min-width:0"><div class="h3" style="margin:0">📜 Annonces de la guilde</div><div class="muted" style="font-size:12.5px">Lettres scellées envoyées dans la boîte aux lettres de chaque membre.</div></div><span class="annseal">${sealSVG('guild',gi?gi.tag:'')}</span></div>
  ${L.length?`<div class="list" style="gap:6px;margin-top:8px">${L.slice().reverse().slice(0,4).map(a=>`<div class="annit"><b>${esc(a.title)}</b><small>${esc(a.from)} · ${ago(a.t)}</small><p>${esc(String(a.body).slice(0,140))}${String(a.body).length>140?'…':''}</p></div>`).join('')}</div>`:'<p class="muted" style="margin:8px 0 0">Aucune annonce pour le moment.</p>'}
  <div class="row" style="margin-top:10px">${canAnn()?'<button class="btn p" data-a="annw">✒️ Rédiger une annonce</button>':''}<button class="btn" data-a="gomail">📮 Ma boîte aux lettres</button></div></div>`}
{const pg=pGuilde;pGuilde=function(){const h=pg.apply(this,arguments);try{if(UI.lz&&UI.lz.guilde==='hall'&&myGuild()){const i=h.lastIndexOf('</div>');if(i>0)return h.slice(0,i)+annCard()+h.slice(i)}}catch(e){}return h}}
/* ---- barre du haut, onglets, actions ---- */
function mailBtnInit(){if($('#mailb'))return;const g=$('#gearb');if(!g)return;g.insertAdjacentHTML('beforebegin',`<button class="gear mailb" id="mailb" data-a="gomail" aria-label="Boîte aux lettres" title="Boîte aux lettres"><span aria-hidden="true">📮</span><i class="mbdg" hidden></i></button>`)}
{const rt=renderTop;renderTop=function(){rt.apply(this,arguments);try{mailBtnInit();updLetterCheck();const n=mailCount()+dmUnread(),b=$('#mailb .mbdg');if(b){b.hidden=!n;b.textContent=n>9?'9+':n}}catch(e){}}}
{const rtb=renderTabs;renderTabs=function(){rtb.apply(this,arguments);try{if(mailCount()+dmUnread()>0){const t=$('#tabs [data-v="top"]');if(t&&!t.querySelector('.dot'))t.insertAdjacentHTML('beforeend','<span class="dot"></span>')}}catch(e){}}}
function goMail(){closeModal();TAB='top';UI.lz=UI.lz||{};UI.lz.top='poste';UI.soc='poste';try{LZ.prev.top='poste'}catch(e){}render();window.scrollTo(0,0)}
document.addEventListener('click',e=>{const t=e.target.closest('[data-a]');if(!t||t.disabled)return;const a=t.dataset.a,v=t.dataset.v;
  if(a==='gomail'){if(TAB==='top'&&UI.lz&&UI.lz.top==='poste'&&!$('#ovl').innerHTML)return;goMail()}
  else if(a==='lopen')openLetter(v);
  else if(a==='lbreak'){const L=LETS().find(x=>x.id===v);if(!L)return;L.read=true;save();try{SND&&SND.chest&&SND.chest()}catch(er){}modal(letterHTML(L,true));renderTop();renderTabs();if(TAB==='top'&&UI.lz&&UI.lz.top==='poste')render()}
  else if(a==='lclaim'){const L=LETS().find(x=>x.id===v);const g=claimLetter(L);if(g){toast(`+${fmt(g)} gemmes ! 💎`);try{SND&&SND.coin&&SND.coin()}catch(er){}save();modal(letterHTML(L));renderTop();renderTabs()}}
  else if(a==='lclaimall'){let gm=0;for(const L of LETS())gm+=claimLetter(L);if((S.mail||[]).length)mailAll();else if(gm)toast(`+${fmt(gm)} gemmes ! 💎`);if(gm&&(S.mail||[]).length)toast(`+${fmt(gm)} gemmes des lettres 💎`);save();render()}
  else if(a==='ldel'){const A=LETS(),i=A.findIndex(x=>x.id===v);if(i>=0){A.splice(i,1);save()}closeModal();render();toast('La lettre part en fumée 🔥')}
  else if(a==='annw')annModal();
  else if(a==='annprev'){const d=annDraft();if(!d.title||!d.body)return toast("Écris un titre et un texte d'abord.");const gi=guildInfo();const keep={t:d.title,b:d.body};
    modal(letterHTML({k:'guild',t:Date.now(),from:S.name||'Voyageur',role:myRoleName(),gname:gi.g.n,gtag:gi.tag,title:d.title,body:d.body,read:false}).replace('<button class="btn" data-a="gomail">📮 Boîte aux lettres</button>',`<button class="btn" data-a="annback">← Modifier</button><button class="btn p" data-a="annsend">🕯️ Sceller et envoyer</button>`));UI.annDraft=keep}
  else if(a==='annback'){const k=UI.annDraft;annModal();if(k){$('#annt').value=k.t;$('#annb').value=k.b}}
  else if(a==='annsend'){const k=UI.annDraft;if(!k)return;annModal();$('#annt').value=k.t;$('#annb').value=k.b;annSend()}});
document.addEventListener('submit',e=>{const f=e.target.closest('form[data-f="annw"]');if(!f)return;e.preventDefault();annSend()});
setTimeout(()=>{try{mailBtnInit();updLetterCheck();renderTop();renderTabs()}catch(e){}},1200);

PATCH.unshift({v:21,d:'14 octobre 2026',t:'Lettres scellées et pigeons voyageurs',items:[
 "📮 <b>Boîte aux lettres</b> : nouveau bureau de poste sur la Grand-Place et bouton 📮 en haut de l'écran. Les colis de récompenses y sont aussi.",
 "👑 <b>Lettre royale à chaque mise à jour</b> : un pli scellé du Grand Héraut avec les nouveautés et <b>500 gemmes</b> offertes. Brise le sceau pour la lire !",
 "📜 <b>Annonces de guilde</b> : le chef et les sous-chefs rédigent une lettre façon parchemin médiéval (date en ancien français, lettrine enluminée, sceau de cire aux couleurs du tag), envoyée dans la boîte de chaque membre. Les chefs bots en envoient aussi.",
 "🕊️ <b>Messages privés</b> : le Pigeonnier de la Grand-Place et le bouton « Message privé » sur chaque profil. Les bots répondent selon leur caractère, te proposent des duels, te recrutent… et t'écrivent parfois les premiers.",
 "💬 <b>Bots bien plus bavards</b> : des centaines de nouvelles phrases, des discussions entre bots dans le tchat monde, des réactions à l'heure, au classement et aux événements, et un système anti-répétition.",
 "🏰 <b>Bâtiments redessinés</b> : toits arrondis en tuiles, colombages, pierres, ombres et lumières, fumée des cheminées, drapeaux. Nouvelles taverne, boutique, poste et pigeonnier."]});
