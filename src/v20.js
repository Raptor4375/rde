
/* ================= V20 : musique du casino, nuits calmes avec hibou, bots et guildes bien plus compétitifs ================= */

/* ---------- musiques ---------- */
SONGS.casino={g:1.05,bpm:108,spb:4,bar:16,bars:16,prog:'Dm7 G7 C Am7 Dm7 G7 E7 Am7 Dm7 G7 C A7 Dm7 G7 C C',parts:[
  {i:'sbass',f:'bass',lo:36,v:.55,pat:[[0,4,0],[4,4,7],[8,4,12],[12,4,9]]},
  {i:'organ',f:'stab',lo:55,v:1.3,at:[0,6],len:3},
  {i:'organ',f:'stab',lo:55,v:.9,at:[10],len:2,from:9},
  {i:'brass',f:'mel',v:.75,from:3,mel:'A5:3 F5:1 D5:4 C5:4 D5:4|F5:6 E5:2 D5:4 B4:4|C5:4 E5:4 G5:4 A5:4|G5:12 r:4|r:4 A5:2 C6:2 A5:4 F5:4|G5:3 F5:1 D5:4 B4:4 G4:4|G#4:4 B4:4 D5:4 E5:4|C5:12 r:4|D5:2 F5:2 A5:2 C6:2 B5:4 A5:4|G5:4 F5:4 D5:4 B4:4|E5:6 G5:2 C6:8|C#6:4 A5:4 G5:4 E5:4|F5:4 A5:4 D6:8|D6:3 C6:1 B5:4 G5:4 F5:4'},
  {i:'cel',f:'mel',v:.5,mel:'r:16|r:16|r:12 G6:1 C7:1 E7:2|r:16|r:16|r:16|r:16|r:12 G6:1 C7:1 E7:2|r:16|r:16|r:16|r:16|r:16|r:16|r:16|r:8 C7:2 E7:2 G7:4'},
  {i:'hat',f:'drum',v:.75,pat:'x...x..xx...x..x'},
  {i:'ohat',f:'drum',v:.35,pat:'..........x.....',from:9},
  {i:'snare',f:'drum',v:.3,pat:'....x.......x...',alt:{8:'....x.......x.xx',16:'....x...x.x.x.xx'}},
  {i:'kick',f:'drum',v:.32,pat:'x.......x.......'},
  {i:'shaker',f:'drum',v:.5,pat:'..x...x...x...x.',from:5},
  {i:'crash',f:'drum',v:.35,pat:'',alt:{1:'x',9:'x'}}]};
SONGS.night={g:.95,bpm:66,spb:2,bar:8,bars:16,prog:'Am F C G Am F G E Dm Am F C Dm F E E',parts:[
  {i:'pad',f:'chord',lo:52,v:.85},
  {i:'sbass',f:'bass',lo:33,v:.28,pat:[[0,8,0]]},
  {i:'harp',f:'arp',lo:57,v:.42,pat:[0,2,4,2,1,3,4,3]},
  {i:'cel',f:'mel',v:.5,mel:'r:4 E5:2 A5:2|C6:4 A5:4|G5:3 E5:1 C5:4|D5:6 r:2|E5:2 A5:2 B5:2 C6:2|A5:6 F5:2|G5:2 B5:2 D6:2 B5:2|G#5:6 r:2|F5:4 A5:2 D6:2|C6:4 E5:4|A5:3 G5:1 F5:4|E5:4 G5:4|F5:2 A5:2 C6:2 D6:2|C6:4 A5:4|B5:4 G#5:4|E5:8'},
  {i:'flute',f:'mel',v:.38,from:9,mel:'D5:8|E5:8|C5:8|G4:8|A4:8|C5:8|B4:8|G#4:8'},
  {i:'bell',f:'mel',v:.22,mel:'A6:8|r:8|r:8|r:8|r:8|r:8|r:8|r:8|D6:8'}]};
delete SONGC.casino;delete SONGC.night;
SND.owl=function(d,t,k=1){const c=AU.ctx;
  const hoot=(x,f0,f1,dur,v)=>{const s=c.createOscillator(),g=c.createGain(),lp=c.createBiquadFilter(),lfo=c.createOscillator(),lg=c.createGain();s.type='sine';s.frequency.setValueAtTime(f0,x);s.frequency.linearRampToValueAtTime(f1,x+dur);
    lfo.frequency.value=6.5;lg.gain.value=f0*.012;lfo.connect(lg);lg.connect(s.frequency);lp.type='lowpass';lp.frequency.value=950;s.connect(lp);lp.connect(g);g.connect(d);
    g.gain.setValueAtTime(.0001,x);g.gain.linearRampToValueAtTime(v,x+dur*.22);g.gain.setValueAtTime(v,x+dur*.62);g.gain.linearRampToValueAtTime(.0001,x+dur);s.start(x);lfo.start(x);s.stop(x+dur+.05);lfo.stop(x+dur+.05);
    nT(d,{t:x,f:f0*1.05,q:5,a:dur*.25,d:dur*.75,v:v*.1})};
  const f=k*(.9+Math.random()*.2);
  hoot(t,410*f,378*f,.42,.1);hoot(t+.95,402*f,372*f,.17,.06);hoot(t+1.17,418*f,388*f,.17,.06);hoot(t+1.4,430*f,355*f,.95,.09)};
SND.crickets=function(d,t){const f=4300+Math.random()*700;for(let g=0;g<2;g++)for(let i=0;i<3;i++)oT(d,{t:t+g*.42+i*.055,f,d:.028,v:.007,a:.004})};
function nightMusic(){try{return skyNow().dark>.5}catch(e){return false}}
function pageTheme(){if(B)return B.done?null:battleTheme();
  if(TAB==='event'){const z=UI.lz&&UI.lz.event;
    if(z==='cas'&&typeof casOn==='function'&&(casOn()||casEnded()))return'casino';
    if(z==='hw'&&typeof hwOn==='function'&&hwOn())return'spooky'}
  return nightMusic()?'night':'menu'}
{const mw=musicWant;musicWant=function(k){const prev=AU.song&&AU.song.k;mw(k);try{if(k==='night'&&prev!=='night')AU.owlT=performance.now()+3500+Math.random()*4000}catch(e){}}}
setInterval(()=>{try{if(!AU.ok||!AU.started||B||!AU.song||AU.song.k!=='night'||AU.ctx.state!=='running'||document.hidden)return;const n=performance.now();
  if(n>(AU.owlT||0)){AU.owlT=n+(20000+Math.random()*28000);SND.owl(AU.M.v,NOW(.15),Math.random()<.3?.88:1)}
  if(Math.random()<.22)SND.crickets(AU.M.v,NOW(.05))}catch(e){}},2500);
setInterval(()=>{try{if(AU.started&&!B)musicWant(pageTheme())}catch(e){}},20000);
try{SETR[0][3]='Accueil, nuit, casino, combats, boss et événements'}catch(e){}

/* ---------- élite des bots ---------- */
function botU(b){const s=String((b&&(b.n||b.id))||'');let h=2166136261;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)}return((h>>>0)%10007)/10007}
/* ~4,5 % d'élites loin devant le meilleur joueur, ~7,5 % au coude à coude, le reste derrière */
function eliteF(u){return u>.955?1.2+(u-.955)/.045*.9:u>.88?.8+(u-.88)/.075*.32:null}
const TOPR={t:0,v:[0,0,0]},TOPA={t:0,v:1000};
function topRaid(i){const n=Date.now();if(n-TOPR.t>15000){TOPR.t=n;const v=[0,1,2].map(k=>(S.raidBest&&S.raidBest[k])||0);try{const P=NET.players||{};for(const k in P){const d=P[k];if(d&&Array.isArray(d.raid)&&(!d.t||n-d.t<21*864e5))d.raid.forEach((x,j)=>{if(j<3&&+x>v[j])v[j]=+x})}}catch(e){}TOPR.v=v}return TOPR.v[i]||0}
function topAr(){const n=Date.now();if(n-TOPA.t>15000){TOPA.t=n;let v=1000;try{const a=NET.arena&&NET.arena[NET.pid];v=a?a.ar:(S.ar??1000);for(const k in(NET.arena||{})){const x=NET.arena[k];if(x&&x.ar>v&&(!x.t||n-x.t<21*864e5))v=x.ar}}catch(e){}TOPA.v=v}return TOPA.v}
function arTgt(b){const def=arDef(b.pw),u=botU(b),ef=eliteF(u);if(ef==null)return def;const ta=topAr();return Math.max(def,Math.round(u>.955?ta+40+(u-.955)/.045*380:ta-150+(u-.88)/.075*200))}
function arDrift(b){if(Math.random()<.07){const cur=b.ar??arDef(b.pw),tg=arTgt(b);b.ar=Math.round(cur+(tg-cur)*.14+ri(-12,14))}}

/* ---------- équipes méta mais variées ---------- */
const MKW=['pvp','pvp','pvp','pve','pve','guild','raid0','raid1','raid2'];
function genTeam2(pw,b){
  const t=clamp(Math.log(Math.max(1100,pw)/1100)/Math.log(160),0,1);
  const wts=[Math.max(0,1-2.2*t)*6,Math.max(.2,3*(1-t)),2+t*2,.4+t*4,t*t*4+(pw>150000?2.5:0)];
  const tot=wts.reduce((a,c)=>a+c,0),roll=()=>{let r=Math.random()*tot;for(let k=0;k<5;k++){if((r-=wts[k])<0)return k}return 1};
  const pool=new Set(),n=Math.round(9+t*13);let g=0;
  while(pool.size<n&&g++<300){const r=roll();pool.add(pick(HEROES.filter(h=>h.r===r)).i)}
  if(b&&Array.isArray(b.team))for(const id of b.team)if(HEROES[id]&&HEROES[id].r>=3)pool.add(id);
  if(pool.size<5)HEROES.slice(0,8).forEach(h=>pool.add(h.i));
  const mk=pick(MKW);if(b)b.mk=mk;
  let ids;try{ids=bestTeam([...pool],mk,refVal(mk))}catch(e){ids=[...pool].slice(0,5)}
  return ids.slice(0,5).sort((a,c)=>HEROES[c].r-HEROES[a].r)}
function genTeam(pw){return genTeam2(pw,null)}
function npcTeam(p){
  const R=rng(roseH(String(p.id||p.n))%100000+3),pw=p.pw||1000;
  const lg=Math.log(Math.max(1,pw/18000))/Math.log(2.3);
  const evs=(p.team||[]).map(id=>HEROES[id]&&HEROES[id].r===4?clamp(Math.floor(lg+R()),0,3):0);
  const us=(p.team||[]).map((id,j)=>HEROES[id]&&HEROES[id].r===4&&evs[j]>=3?clamp(Math.floor(Math.log(Math.max(1,pw/320000))/Math.log(2.2)+R()*.9),0,3):0);
  let lo=1,hi=100;
  for(let k=0;k<20;k++){const mid=(lo+hi)/2;const tot=(p.team||[]).reduce((a,id,j)=>a+basePow(HEROES[id],mid,evs[j])*(1+.35*us[j])*1.15,0);if(tot<pw)lo=mid;else hi=mid}
  return(p.team||[]).map((id,j)=>({id,l:clamp(Math.round(lo+(R()*6-3)),1,100),e:evs[j],u:us[j]}))}
const UPI={};
function uImg(h,u){const k=h.i+'_'+u;return UPI[k]||(UPI[k]=svgToImg(portraitU(h,u)))}
/* combats d'arène : vraie puissance (plafond relevé), évolutions et formes ultra des bots */
const ARX={p:null,tm:null};
{const t0=teamOfRow;teamOfRow=function(p){const r=t0(p);ARX.p=p;ARX.tm=r;return r}}
function arenaUnit(t,k,f){
  if(ARX.tm&&ARX.tm.includes(t)&&ARX.p&&!ARX.p.me){const base=ARX.tm.reduce((a,x)=>a+basePow(HEROES[x.id],x.l,x.e),0)||1;f=clamp((ARX.p.pw||1000)/base,.6,3.6)}
  const h=HEROES[t.id],c=CLS[h.c],u=t.u||0,g=(1+.08*(t.l-1))*(1+.4*t.e)*(1+.35*u)*RAR[h.r].m*f;const hp=Math.round(500*c.hp*g);
  return{key:'b'+k,side:1,name:h.n,cls:h.c,r:h.r,hid:t.id,max:hp,hp,atk:Math.round(60*c.atk*g),def:Math.round(25*c.def*g),spd:c.spd+h.r*2+t.e*3+u*4,en:0,sh:0,stun:0,dot:null,weak:0,taunt:0,buff:0,buffT:0,sk:h.sk,scale:1+.25*t.e+.2*u,evo:t.e,ux:u,crit:c.crit,port:u?uImg(h,u):(PIMG['B'+h.i]||(PIMG['B'+h.i]=svgToImg(P0(h)))),dmg:0}}

/* ---------- équipement des bots ---------- */
function botGear(p){const h=roseH('gear'+(p.n||p.id)),pw=p.pw||1000,u=botU(p),lv=Math.log10(Math.max(1000,pw));
  const base=pw<2500?0:pw<9000?1:pw<30000?2:3,celP=pw<110000?0:Math.min(.95,.15+Math.log2(pw/110000)*.22+(u>.955?.25:0));
  return[0,1,2,3,4].map(s=>{const x=ih(h+s*977);let r=base;if(r<3&&x%100<35)r++;if(r===3&&((x>>>8)%100)/100<celP)r=4;if(u>.955&&r<3)r++;
    const mx=10+r*5;return{s,r,l:clamp(Math.round(mx*Math.min(1,(lv-3)/3.2)*(.75+((x>>>16)%26)/100)),1,mx)}})}
function gearSum(p){const c=[0,0,0,0,0];botGear(p).forEach(g=>c[g.r]++);const N=['commun','rare','super rare','épique','céleste'];return[4,3,2,1,0].filter(r=>c[r]).map(r=>`${c[r]} ${N[r]}${c[r]>1&&r!==2?'s':''}`).join(' · ')}
function gearMini(p){if(!p||p.real||p.me)return'';return`<div class="ogear">${botGear(p).map(g=>`<span class="ieq mini r${g.r}" style="${rv(g.r)}">${itemArt(g.s,g.r)}</span>`).join('')}<small>${gearSum(p)}</small></div>`}
{const pa=pArena;pArena=function(){const h=pa();try{const opps=(UI.arOpp||[]).map(rowById).filter(Boolean);const parts=h.split('<div class="oteam">');if(parts.length-1!==opps.length)return h;
  let o=parts[0];for(let i=0;i<opps.length;i++)o+='<div class="oteam">'+parts[i+1].replace(/^([\s\S]*?<\/div>)/,'$1'+gearMini(opps[i]));return o}catch(e){return h}}}
{const pm2=profileModal;profileModal=function(id){pm2(id);try{if(id==='me')return;const p=rowById(id);if(!p||p.real||p.me)return;const m=document.querySelector('#ovl .modal');if(!m)return;
  const tm=teamOfRow(p);m.querySelectorAll('.pteam .ptile').forEach((el,i)=>{const t=tm[i];if(!t||!t.u)return;const pl=el.querySelector('.pl');if(pl&&!pl.querySelector('.ust'))pl.insertAdjacentHTML('beforeend',` <b class="ust">${'✦'.repeat(t.u)}</b>`);const pt=el.querySelector('.pt');if(pt)pt.innerHTML=uImg(HEROES[t.id],t.u)});
  const pt=m.querySelector('.pteam');if(pt&&!m.querySelector('.pgear'))pt.insertAdjacentHTML('afterend',`<div class="h3" style="margin-top:14px">Équipement</div><div class="pgear">${botGear(p).map(g=>`<span class="ieq r${g.r}" style="${rv(g.r)}" title="${esc(itemName(g))}">${itemArt(g.s,g.r)}<b class="ilv">Nv ${g.l}</b></span>`).join('')}</div><div class="pgsum">${gearSum(p)}</div>`);
  const ef=eliteF(botU(p));if(ef!=null&&ef>=1.2){const hh=m.querySelector('.phd .h');if(hh&&!hh.querySelector('.elb'))hh.insertAdjacentHTML('beforeend',' <i class="elb">ÉLITE</i>')}}catch(e){}}}

/* ---------- progression des bots : rapide, et l'élite reste devant ---------- */
function growPw(b,t){
  const dk=dayKey(t);if(b.dk!==dk){b.dk=dk;b.pwY=b.pw}
  const u=botU(b),k=.3+Math.pow(u,2.2),ef=eliteF(u),boost=1+Math.max(0,(t-GROW_T0)/864e5)*.006;
  const capT=(b.cap||120000)*boost*(.15+.75*Math.pow(Math.min(1,k),2)),top=topPw();
  const tgt=Math.max(capT,top*(ef!=null?ef:k*.78));
  if(!b.v20){b.v20=1;if(ef!=null&&b.pw<tgt*.8)b.pw=Math.round(b.pw+(tgt*.86-b.pw)*(.6+Math.random()*.3));try{b.team=genTeam2(b.pw,b);b.tb=Math.floor(Math.log2(Math.max(1000,b.pw)))}catch(e){}}
  let pw=b.pw;const a=Math.max(.05,b.act||.2),sp=Math.min(3,.25/a);
  if(pw<tgt)pw+=(tgt-pw)*(.016+.028*Math.random())*sp*(ef!=null?1.5:1)+pw*.0015;
  else pw*=1+(.0005+Math.random()*.0012)*sp;
  pw=Math.round(pw);
  try{
    /* records de raid : l'élite bat les meilleurs records des joueurs */
    if(!Array.isArray(b.raid))b.raid=[0,0,0];
    if(Math.random()<.12){const i=ri(0,2);let tg=Math.round(pw*effK(pw,K_RAID)*(b.skill||1)*1.18*(.9+Math.random()*.2));const tr=topRaid(i);if(ef!=null&&tr>0)tg=Math.max(tg,Math.round(tr*ef*(.94+Math.random()*.1)));
      if(b.raid[i]<tg)b.raid[i]=Math.round(b.raid[i]+(tg-b.raid[i])*(.3+Math.random()*.35))}
    /* nouvelle équipe quand la puissance double */
    const bk=Math.floor(Math.log2(Math.max(1000,pw)));if(b.tb==null)b.tb=bk;else if(bk>b.tb){b.tb=bk;if(Math.random()<.7)b.team=genTeam2(pw,b)}
  }catch(e){}
  return pw}

/* ---------- monde local (hors ligne) ---------- */
function simTick(T){
  const W=S.world,dk=dayKey(T);
  if(W.week!==weekKey(T))weeklyReset(T);
  for(const p of W.players){
    if(Math.random()>p.act)continue;
    p.last=T;const mate=S.gid&&p.g===S.gid;arDrift(p);
    {const _b0=p.pw;p.pw=growPw(p,T);if(Math.floor(p.pw/10000)>Math.floor(_b0/10000)&&p.pw>=30000&&Math.random()<.7)news(T,`${p.n} a dépassé ${fmt(Math.floor(p.pw/10000)*10000)} de puissance !`)}
    const st=stFor(p.pw);
    if(st>p.st){
      if(Math.floor(st/10)>Math.floor(p.st/10)){const w=Math.floor(st/10);if(Math.random()<.6)news(T,`${p.n} a vaincu ${WORLDS[w-1].b} (étape ${w*10}).`)}
      p.st=st;if(mate&&Math.random()<.18)chat(T,p.id,fillT(pick(TPL.stage),p));
    }
    if(Math.random()<.016){const h=npcPull(p);if(h&&h.r>=3)p.pw=Math.round(p.pw*(h.r===4?1.07:1.03));if(h&&h.r===4){news(T,`${p.n} a invoqué ${h.n} !`);if(mate)chat(T,p.id,fillT(pick(TPL.legend),p,{hero:h.n}))}}
    if(p.g&&p.gd!==dk&&Math.random()<.65){p.gd=dk;const g=GU(p.g);const d=Math.round(p.pw*effK(p.pw,K_G)*p.skill*(.85+Math.random()*.3)*2.6);p.gw+=d;guildXp(g,mate?15:25);hitGuildBoss(g,d,T);if(mate&&Math.random()<.12)chat(T,'sys',`${p.n} a infligé ${fmt(d)} au boss.`)}
    if(mate&&Math.random()<.03)chat(T,p.id,npcLine(p));
    if(p.g&&Math.random()<.0005){const g=GU(p.g);if(g.leader!==p.id){if(mate)chat(T,'sys',`${p.n} a quitté la guilde.`);p.g=null;p.gw=0}}
    else if(!p.g&&Math.random()<.03){
      const opts=W.guilds.filter(g=>g.req<=p.pw&&gSize(g.id)<20&&g.open!==false);
      if(opts.length){const tot=opts.reduce((a,g)=>a+g.lvl+(g.mine?4:0),0);let r=Math.random()*tot,gg=opts[0];for(const g of opts){if((r-=g.lvl+(g.mine?4:0))<0){gg=g;break}}
        p.g=gg.id;p.gd=null;if(gg.id===S.gid){chat(T,'sys',`${p.n} a rejoint la guilde !`);chat(T+2000,p.id,pick(["Salut tout le monde !","Bonjour, content d'être là","Merci de m'accepter !","Yo la guilde"]))}}
    }
  }
  const g=myGuild();
  if(g&&!g.mine){
    const away=T-S.lastActive;
    if(away>3*864e5&&!S.warned){S.warned=1;const L=PL(g.leader);if(L)chat(T,L.id,fillT(pick(TPL.inactive),L))}
    if(away>10*864e5){mail({x:`Tu as été exclu de ${g.n} pour inactivité (10 jours sans connexion).`});S.gid=null;S.chat=[];S.gw=0}
  }
}

/* ---------- guildes partagées : les guildes du royaume tapent plus fort et montent plus vite ---------- */
async function botSimGuild(gid,live){
  if(!NET.on||!gid||!NET.canWrite||NET.busy[gid])return;
  NET.busy[gid]=1;const nws=[];
  try{
    const lk=await NET.db.doc('glock/'+gid).acquire({holder:NET.pid,ttlMs:60000});if(!lk.acquired)return;
    const ref=NET.db.doc('guilds/'+gid);const snap=await ref.get();if(!snap.exists)return;
    const d=snap.data();if(!d.bots||!d.bots.length)return;
    const npc=!!d.npc,atkP=npc?.75:.55,atkM=npc?2.8:2.2,xpH=npc?24:15;
    const bots=d.bots.map(b=>({...b,team:[...(b.team||[])],raid:[...(b.raid||[0,0,0])]}));
    const now=Date.now(),simT=d.simT||now,n0=Math.floor((now-simT)/TICK),n=Math.min(n0,14*96);
    const msgs=[];let dmg=0,hits=0;let t=simT+(n0-n)*TICK;
    const realN=realMembers(gid).length+(S.rgid===gid?1:0);
    for(let k=0;k<n;k++){
      t+=TICK;const dk=dayKey(t),wk=weekKey(t);
      for(const b of bots){
        if(b.wk!==wk){b.wk=wk;b.gw=0}
        if(b.leaving||Math.random()>b.act)continue;b.last=t;arDrift(b);
        if(Math.random()<.0004&&'bot:'+b.id!==d.leader&&bots.length>3){b.leaving=1;msgs.push({t,sys:1,x:`${b.n} a quitté la guilde.`});continue}
        {const _b0=b.pw;b.pw=growPw(b,t);if(Math.floor(b.pw/10000)>Math.floor(_b0/10000)&&b.pw>=30000&&Math.random()<.7)nws.push({t,x:`${b.n} a dépassé ${fmt(Math.floor(b.pw/10000)*10000)} de puissance !`})}
        const st=stFor(b.pw);if(st>(b.st||0)){if(Math.floor(st/10)>Math.floor((b.st||0)/10)&&Math.random()<.5)nws.push({t,x:`${b.n} a vaincu ${WORLDS[Math.floor(st/10)-1].b} (étape ${Math.floor(st/10)*10}).`});if(Math.random()<.12)msgs.push({t,b,x:fillT(pick(TPL.stage),{...b,st})});b.st=st}
        if(Math.random()<.016){const h=npcPull(b);if(h&&h.r>=3)b.pw=Math.round(b.pw*(h.r===4?1.07:1.03));if(h&&h.r===4){nws.push({t,x:`${b.n} a invoqué ${h.n} !`});msgs.push({t,b,x:fillT(pick(TPL.legend),b,{hero:h.n})})}}
        if(Math.random()<.06){const i=ri(0,2),dd=Math.round(b.pw*effK(b.pw,K_RAID)*b.skill*(.85+Math.random()*.3));if(dd>b.raid[i])b.raid[i]=dd}
        if(b.gd!==dk&&Math.random()<atkP){b.gd=dk;const dd=Math.round(b.pw*effK(b.pw,K_G)*b.skill*(.85+Math.random()*.3)*atkM);b.gw+=dd;dmg+=dd;hits++}
        if(Math.random()<.025)msgs.push({t,b,x:npcLine(b)});
      }
      if(!d.npc&&d.open!==false&&bots.length+realN<20&&Math.random()<.0012){const nb=makeBot(guildAvgPow(gid),bots.map(x=>x.n));nb.last=t;bots.push(nb);msgs.push({t,sys:1,x:`${nb.n} a rejoint la guilde !`})}
    }
    if(live&&Math.random()<.3){
      const tot=bots.reduce((a,b)=>a+b.act,0);let r=Math.random()*tot,b=bots[0];for(const x of bots){if((r-=x.act)<0){b=x;break}}
      b.last=now;const roll=Math.random();
      if(roll<.72)msgs.push({t:now,b,x:npcLine(b)});
      else if(roll<.9){const dd=Math.round(b.pw*effK(b.pw,K_G)*b.skill*(.5+Math.random()*.3));b.gw=(b.wk===weekKey(now)?b.gw:0)+dd;b.wk=weekKey(now);dmg+=dd;msgs.push({t:now,sys:1,x:`${b.n} a infligé ${fmt(dd)} au boss.`})}
      else{const h=npcPull(b);msgs.push({t:now,b,x:h&&h.r>=3?fillT(pick(TPL.legend),b,{hero:h.n}):pick(TPL['râleur'])})}
    }
    if(live&&S.rgid===gid&&Math.random()<.07){const st=bots.filter(b=>!b.leaving&&b.pw>teamPower()*1.1);if(st.length){const b=pick(st);msgs.push({t:now,b,x:`@${S.name||'toi'} ${pick(tipFor().slice(0,4))}`})}}
    let roles=Array.isArray(d.roles)?[...d.roles]:[],rolesCh=false;
    if(String(d.leader||'').startsWith('bot')&&Math.random()<.5){const reals=[...realMembers(gid),...(S.rgid===gid?[{...meRow(),pid:NET.pid,real:1,gw:S.gw}]:[])];const avg=bots.reduce((a,b)=>a+(b.gw||0),0)/Math.max(1,bots.length);for(const r of reals){if(gRoleOf({...d,roles},r.pid)==='mem'&&r.gw>Math.max(15000,avg*1.3)&&roles.filter(x=>x.r==='cmd').length<4){roles.push({k:r.pid,r:'cmd'});rolesCh=true;const lb=bots.find(b=>'bot:'+b.id===d.leader)||bots[0];msgs.push({t:now,b:lb,x:`J'ai nommé ${r.n} commandant, merci pour ton aide sur le boss 💪`});msgs.push({t:now,sys:1,x:`${r.n} est nommé commandant.`});break}}}
    const leavers=bots.filter(b=>b.leaving);
    if(n0<=0&&!msgs.length&&!dmg&&!rolesCh)return;
    const fresh2=(await ref.get()).data()||d;
    let bhp=fresh2.bhp-dmg,bl=fresh2.bl,bmax=fresh2.bmax,xp=(fresh2.xp||0)+hits*xpH,lvl=fresh2.lvl||1,kills=0;
    while(bhp<=0){kills++;xp+=120;bl++;bmax=gBossMax(bl);bhp+=bmax}
    while(lvl<30&&xp>=lvl*100){xp-=lvl*100;lvl++}
    /* les bots arrivés entre-temps (recrutement) ne sont pas écrasés */
    const known=new Set(d.bots.map(b=>b.id)),extra=(fresh2.bots||[]).filter(b=>!known.has(b.id)),gone=new Set((d.bots||[]).filter(b=>!(fresh2.bots||[]).some(x=>x.id===b.id)).map(b=>b.id));
    const upd={bots:[...bots.filter(b=>!b.leaving&&!gone.has(b.id)),...extra],simT:n0>0?t:simT,bhp:Math.round(bhp),bl,bmax,xp,lvl};if(rolesCh)upd.roles=roles;
    if(kills){upd.lastKill={bl:bl-1,t:now,by:'bots',n:kills};msgs.push({t:now,b:pick(bots),x:pick(TPL.kill)});if(d.npc&&Math.floor((bl-1)/5)>Math.floor((bl-1-kills)/5))nws.push({t:now,x:`${d.n} a vaincu son boss de guilde niveau ${bl-1}.`})}
    await ref.update(upd);NET.guilds[gid]={...fresh2,...upd};
    if(leavers.length){try{const fr=NET.db.doc('world/free');const fs=await fr.get();if(fs.exists)await fr.update({bots:[...(fs.data().bots||[]),...leavers.map(b=>{const x={...b};delete x.leaving;x.gw=0;return x})]})}catch(e){}}
    const hasReal=realMembers(gid).length>0||S.rgid===gid;
    if(hasReal)for(const m of msgs.slice(-8)){if(m.sys)await postMsg(m.x,true,gid);else await postBotMsg(gid,m.b,m.x,m.t)}
    if(nws.length)appendNews(nws.slice(-6));
    onNet();
  }catch(e){console.warn('bots',e&&e.code)}
  finally{delete NET.busy[gid]}
}

/* ---------- recrutement des guildes dans le tchat monde ---------- */
const GREC=["📣 {g} ({tag}) recrute ! Niveau {lvl}, Golem Nv {bl}. Minimum {req} de puissance, actifs uniquement 💪",
 "Recrutement {tag} : on tape le boss tous les jours, il reste {slots} places ! Répondez ici 👇",
 "Qui veut rejoindre {g} ? Niveau {lvl}, grosse progression et bonne ambiance 🔥",
 "{tag} cherche des tryhards ⚔️ {req}+ de puissance, objectif 1re guilde du royaume",
 "{g} ({tag}) ouvre {slots} places ! Bonus de guilde +{lvl} % PV et ATQ pour tous 😎",
 "On recrute chez {g} : boss Nv {bl}, membres actifs, conseils pour les débutants motivés 🙌"];
const GREC_Y=["Moi ! J'ai {pw} de puissance 🙋","Je postule, étape {st} pour moi","Ça m'intéresse, il reste de la place ?","Je viens si vous êtes vraiment actifs 👀","Partant ! Je tape le boss tous les jours"];
const GREC_P=["Ma guilde {old} est morte, je peux venir ?","Je quitte {old} pour vous 👀","{old} c'est calme en ce moment… je tente !"];
const GREC_N=["Finalement je reste où je suis, GL !","Ah j'ai trouvé une autre guilde, désolé","Bon je vais réfléchir 🤔"];
const GREC_W=["Bienvenue {n} ! 🎉","Accepté {n}, rendez-vous au Golem 💪","Welcome {n} 😎","Bienvenue chez nous {n} !"];
const gAvg=gid=>{const b=(NET.guilds[gid]&&NET.guilds[gid].bots)||[];return b.length?b.reduce((a,x)=>a+(x.pw||0),0)/b.length:0};
async function botMove(c,gid){
  if(gTotal(gid)>=20)return null;
  try{let b;
    if(c.free){const fr=NET.db.doc('world/free');const fs=await fr.get();if(!fs.exists)return null;const fd=fs.data();b=(fd.bots||[]).find(x=>x.id===c.bid);if(!b)return null;await fr.update({bots:fd.bots.filter(x=>x.id!==b.id)})}
    else{const or=NET.db.doc('guilds/'+c.ogid);const os=await or.get();if(!os.exists)return null;const od=os.data();b=(od.bots||[]).find(x=>x.id===c.bid);if(!b||od.leader==='bot:'+b.id)return null;
      await or.update({bots:od.bots.filter(x=>x.id!==b.id),roles:(Array.isArray(od.roles)?od.roles:[]).filter(x=>x.k!=='b:'+b.id)});
      if(realMembers(c.ogid).length||S.rgid===c.ogid)postMsg(`${b.n} a quitté la guilde pour rejoindre ${NET.guilds[gid]?NET.guilds[gid].n:'une autre guilde'}.`,true,c.ogid)}
    const gr=NET.db.doc('guilds/'+gid);const gs=await gr.get();if(!gs.exists)return null;const gd=gs.data();
    await gr.update({bots:[...(gd.bots||[]).filter(x=>x.id!==b.id),{...b,gw:0,wk:weekKey(Date.now()),last:Date.now()}],simT:gd.simT||Date.now()});
    NET.guilds[gid]={...gd,bots:[...(gd.bots||[]),b]};
    if(realMembers(gid).length||S.rgid===gid){await postMsg(`${b.n} a rejoint la guilde grâce à l'annonce du tchat monde !`,true,gid);setTimeout(()=>postBotMsg(gid,b,pick(["Salut la guilde ! J'ai vu l'annonce 👋","Merci de m'accepter, on tape le Golem quand ?","Content d'être là, je suis actif tous les jours 💪"])),2500)}
    onNet();return b}catch(e){return null}}
async function guildRecruitTick(){
  if(!sharedOn()||!NET.canWrite||document.hidden)return;
  const now=Date.now();if(now<(NET.grecN||0))return;NET.grecN=now+(3+Math.random()*4)*60000;
  let lk;try{lk=await NET.db.doc('glock/grec').acquire({holder:NET.pid,ttlMs:170000})}catch(e){return}if(!lk||!lk.acquired)return;
  const gs=Object.entries(NET.guilds).filter(([id,g])=>g&&g.npc&&g.open!==false&&(g.bots||[]).length>=2&&gTotal(id)<20);if(!gs.length)return;
  const w=gs.map(([,g])=>Math.pow((g.lvl||1)+2,1.4));let r=Math.random()*w.reduce((a,c)=>a+c,0),ix=0;for(;ix<gs.length-1;ix++){if((r-=w[ix])<0)break}
  const [gid,g]=gs[ix],bots=g.bots||[],lb=bots.find(b=>'bot:'+b.id===g.leader)||[...bots].sort((a,c)=>(c.pw||0)-(a.pw||0))[0];if(!lb)return;
  const tag=gTag('r:'+gid)||'',space=20-gTotal(gid),req=g.req||0,say=(who,x,dl)=>setTimeout(()=>postBotMsg('world',{id:who.id,n:who.n},fit(x)),dl);
  const fill=s=>s.replace(/\{g\}/g,g.n).replace(/\{tag\}/g,tag).replace(/\{lvl\}/g,g.lvl||1).replace(/\{bl\}/g,g.bl||1).replace(/\{req\}/g,fmt(req)).replace(/\{slots\}/g,space);
  say(lb,fill(pick(GREC)),0);
  if(!S.rgid&&S.name&&teamPower()>=req&&Math.random()<.35)say(lb,`@${S.name} t'as ${fmt(teamPower())} de puissance, rejoins ${g.n} (${tag}) depuis l'onglet Guilde 😉`,4500);
  const cand=[];
  for(const x of freeRows())if(now-x.last<36e5*30&&x.pw>=req*.85)cand.push({free:1,bid:x.bid,n:x.n,pw:x.pw,st:x.st});
  for(const [oid,og] of Object.entries(NET.guilds)){if(oid===gid||!og||!og.npc||(og.lvl||1)>=(g.lvl||1)||(og.bots||[]).length<=4)continue;const av=gAvg(oid);
    for(const b of og.bots||[])if('bot:'+b.id!==og.leader&&b.pw>=req&&b.pw>=av*1.1)cand.push({free:0,bid:b.id,n:b.n,pw:b.pw,st:b.st,ogid:oid,old:og.n})}
  if(!cand.length)return;
  cand.forEach(c=>c.key=c.pw*(.5+Math.random())*(c.free?1.2:1));cand.sort((a,c)=>c.key-a.key);
  cand.slice(0,Math.min(space,ri(1,3))).forEach((c,i)=>{const dl=3800+i*3200+Math.random()*2000,who={id:c.bid,n:c.n};
    say(who,(c.free?pick(GREC_Y):pick(GREC_P)).replace('{pw}',fmt(c.pw)).replace('{st}',c.st||1).replace('{old}',c.old||''),dl);
    setTimeout(async()=>{if(Math.random()>(c.free?.85:.72)){say(who,pick(GREC_N),0);return}
      const b=await botMove(c,gid);if(!b)return;say(lb,pick(GREC_W).replace('{n}',c.n),0);
      appendNews([{t:Date.now(),x:`${c.n} a rejoint ${g.n}${c.old?' (quitte '+c.old+')':''} après une annonce de recrutement.`}])},dl+5000+Math.random()*4000)})}
/* les meilleurs bots se vantent un peu dans le tchat monde */
function botBrag(){
  if(!sharedOn()||!NET.canWrite||Math.random()>.1)return;
  const pool=[...botRows(),...freeRows()].filter(b=>Date.now()-b.last<36e5*8&&eliteF(botU(b))!=null&&b.pw>teamPower());if(!pool.length)return;
  const b=pick(pool),me=S.name||'',i=ri(0,2);
  const L=[`Je viens de passer ${fmt(b.pw)} de puissance 😎`,`Nouveau record sur ${RAIDS[i].n.split(/[ ,]/)[0]} : ${fmt(b.raid[i]||0)} 🔥`,`${arOf(b)} points d'arène, qui vient me défier ? ⚔️`,`Étape ${b.st} validée, la suite !`,"Équipe 100 % céleste enfin ✨","J'ai encore changé de compo pour coller à la méta 🧠"];
  if(me&&Math.random()<.25)L.push(`@${me} je suis devant toi au classement, accroche-toi 😏`,`@${me} on se voit en arène ? 😈`);
  postBotMsg('world',{id:b.bid,n:b.n},fit(pick(L)))}
{const wc=worldChatter;worldChatter=function(){wc();try{guildRecruitTick()}catch(e){}try{botBrag()}catch(e){}}}
WORLD_TPL.push("Les meilleurs du royaume sont devenus intouchables 😭","Quelqu'un a vu les records de raid ? C'est abusé","Ma guilde vient de passer niveau 15 💪","On cherche encore des membres actifs, MP… enfin répondez ici 😂");

/* ---------- notes de mise à jour ---------- */
PATCH.unshift({v:20,d:'14 octobre 2026',t:'Casino en musique et royaume plus coriace',items:[
 "🎰 <b>Musique du casino</b> : un thème jazzy (orgue, contrebasse, cuivres feutrés) quand tu entres au Casino de Fortuna.",
 "🌙 <b>Musique de nuit</b> : à la tombée de la nuit, l'accueil passe sur une mélodie douce et calme (harpe, célesta, flûte), avec un <b>hibou</b> qui hulule de temps en temps et des grillons au loin.",
 "📈 <b>Joueurs du royaume bien plus forts</b> : ils progressent beaucoup plus vite, et une élite reste devant les meilleurs joueurs en puissance, en étapes, en arène, à la tour et dans les <b>records de raid</b>.",
 "🧠 <b>Équipes méta mais variées</b> : chaque bot compose sa meilleure équipe pour son mode préféré (arène, aventure, raids, Golem), avec plus de légendaires, des évolutions ★ et même des formes ultra ✦. Leur <b>équipement</b> (jusqu'au céleste) est visible sur leur profil et en arène.",
 "⚔️ Arène plus dure : les adversaires se battent avec leur vraie puissance.",
 "🛡️ <b>Guildes compétitives</b> : les guildes du royaume tapent le Golem plus souvent et montent de niveau plus vite, et elles <b>recrutent dans le tchat monde</b> : les joueurs répondent et la plupart rejoignent vraiment la guilde."]});
