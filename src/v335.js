
/* ================= Bots fantômes : ils imitent la progression des VRAIS joueurs ================= */
/* 1) Chaque joueur note sa puissance une fois par jour, selon son nombre de jours de jeu (pas de nom, juste [jour, puissance]).
   2) Ces historiques sont partagés avec le profil en ligne (players/…, champ ph).
   3) Le jeu en tire la vraie courbe : pour chaque jour de jeu, la puissance des joueurs du plus faible au plus fort.
   4) Chaque bot copie un « rang » dans cette courbe (botU = 0 → le plus faible, 1 → le meilleur), avec sa chance en plus.
   Tant qu'il y a peu de vrais joueurs, on mélange avec le modèle « joueur gratuit » (PF2P). */
function phStart(){let t0=0;try{t0=+(S.world&&S.world.t0)||0}catch(e){}if(!S.ph||typeof S.ph!=='object')S.ph={s:t0&&t0<Date.now()?t0:Date.now(),h:{}};return S.ph}
function phDay(t){const P=phStart();return Math.max(0,Math.floor(((t||Date.now())-P.s)/864e5))}
function phNote(){try{if(!S.name)return;const P=phStart(),d=phDay(),pw=teamPower();if(!(pw>0))return;if(!P.h[d]||P.h[d]<pw){P.h[d]=pw;const ks=Object.keys(P.h).map(Number).sort((a,b)=>a-b);if(ks.length>150)for(const k of ks.slice(0,ks.length-150))delete P.h[k];save()}}catch(e){}}
function phPack(){const P=phStart();return Object.keys(P.h).map(Number).sort((a,b)=>a-b).map(d=>[d,Math.round(P.h[d])])}
setInterval(phNote,5*60000);setTimeout(phNote,15000);
/* l'historique part avec le profil en ligne */
{const pm=pushMe;pushMe=async function(){const db=NET&&NET.db;if(!db||typeof db.doc!=='function')return pm.apply(this,arguments);const od=db.doc;
  db.doc=function(p){const r=od.apply(db,arguments);try{if(p==='players/'+NET.pid&&r&&r.set){const os=r.set;r.set=o=>os.call(r,Object.assign({},o,{ph:phPack()}))}}catch(e){}return r};
  try{return await pm.apply(this,arguments)}finally{db.doc=od}}}
/* --- la courbe des vrais joueurs --- */
const GH={t:0,tab:null,n:0,maxD:0};
function phCurve(pts,D){/* puissance d'un joueur au jour D, d'après ses points (forme PF2P avant son premier point) */
  if(!pts.length)return null;const f=pts[0],l=pts[pts.length-1];if(D>l[0])return null;
  if(D<=f[0])return f[1]*PF2P(D)/Math.max(1,PF2P(f[0]));
  for(let i=1;i<pts.length;i++){const a=pts[i-1],b=pts[i];if(D<=b[0]){const k=(D-a[0])/Math.max(1,b[0]-a[0]);return a[1]+(b[1]-a[1])*k}}return l[1]}
function ghostBuild(){const now=Date.now();if(GH.tab&&now-GH.t<10*60000)return GH;GH.t=now;
  const by=new Map();try{for(const k in (NET.players||{})){const d=NET.players[k];if(!d||!d.n||d.bot)continue;if(d.t&&now-d.t>45*864e5)continue;
    let pts=Array.isArray(d.ph)?d.ph.filter(x=>Array.isArray(x)&&x[1]>0).map(x=>[+x[0],+x[1]]).sort((a,b)=>a[0]-b[0]):[];if(!pts.length)continue;
    const o=by.get(d.n);if(!o||(d.t||0)>(o.t||0))by.set(d.n,{t:d.t||0,pts})}}catch(e){}
  const L=[...by.values()].map(x=>x.pts);GH.n=L.length;if(!L.length){GH.tab=null;return GH}
  const maxD=Math.max(...L.map(p=>p[p.length-1][0]));GH.maxD=maxD;const tab=[];
  for(let D=0;D<=maxD;D++){const v=L.map(p=>phCurve(p,D)).filter(x=>x!=null&&x>0).sort((a,b)=>a-b);tab.push(v)}
  GH.tab=tab;return GH}
function ghostAt(D,q){const G=ghostBuild();if(!G.tab||G.n<1)return null;let Dd=Math.min(D,G.maxD);let v=G.tab[Math.floor(Dd)];
  while((!v||v.length<Math.min(3,G.n))&&Dd>0){Dd--;v=G.tab[Math.floor(Dd)]}if(!v||!v.length)return null;
  const x=q*(v.length-1),i=Math.floor(x),k=x-i,val=v[i]+((v[Math.min(v.length-1,i+1)]-v[i])*k);
  return D>Dd?val*PF2P(D)/Math.max(1,PF2P(Dd)):val}
/* le bot suit le rang q de la vraie courbe, plus sa chance ; on mélange avec le modèle tant qu'il y a peu de vrais joueurs */
{const bc=botCareer;botCareer=function(b,t){const r=bc.apply(this,arguments);try{const id=b.n||b.id||'',q=botU(b);
  const quit=q<.45?Math.min(1,.4+hash01(id,'q')*.9):1,dq=r.d*quit;const g=ghostAt(dq,q);if(g==null)return r;
  const Lk=botLuck(id),sv=hash01(id,'sv')<.22,per=8+Math.floor(hash01(id,'per')*10);
  let gv=g*(1+(Lk-1)*.6);if(sv){const ds=Math.floor(dq/per)*per;const gs=ghostAt(ds,q);if(gs!=null)gv=Math.max(gs*(1+(Lk-1)*.6)*1.06,gv*.97)}
  const w=Math.min(1,GH.n/6);return{tgt:Math.max(BOT_P0,w*gv+(1-w)*r.tgt),d:r.d,ghost:1}}catch(e){return r}}}
