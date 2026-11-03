
/* ================= Les bots aussi passent à la Forge d'Éther ================= */
/* Comme les vrais joueurs, les bots gagnent des éclats légendaires en jouant. Une fois leurs légendaires ★★★, ils les dépensent
   en étoiles d'éther (10, 15, 20, 25, 30 éclats). Ça monte leur puissance cible, sans casser les règles existantes :
   - toujours plafonnés par les vrais meilleurs joueurs (sauf les très chanceux, comme avant),
   - toujours au rythme d'un vrai joueur (+2 à +4 % par jour au maximum),
   - et ça se VOIT : leurs légendaires portent des étoiles d'éther ✦ dans leur profil et en arène. */
(function(){try{
const ESP=.05,CUM=[0,10,25,45,70,100];
/* étoiles moyennes sur ses légendaires ★★★, selon ses jours de jeu et son assiduité */
function botESf(b,t){try{const id=b.n||b.id||'';if(b.j35==null&&b.e35==null)return null;
  const e=b.e35!=null?b.e35:botEff(botU(b)),j=b.j35||RDE_LAUNCH,d=Math.max(0,(t-j)/864e5);
  const quit=e<.5?Math.min(1,.4+hash01(id,'q')*.9):1,dq=d*quit;
  /* éclats « libres » (une fois les légendaires montés ★★★) : ~4,5 par jour pour un joueur assidu (quêtes, boss, raids, guilde, événements), répartis sur 3 légendaires */
  const per=Math.max(0,dq-14)*4.5*e/3;let s=0;while(s<5&&per>=CUM[s+1])s++;
  return s<5?s+(per-CUM[s])/(CUM[s+1]-CUM[s]):5}catch(e){return null}}
/* sans historique (bots de guilde, lignes du classement) : on déduit d'après la puissance */
function pwESf(pw){return clamp((Math.log(Math.max(1,pw/70000))/Math.log(1.45)),0,4.2)}
window.botESf=botESf;
const legShare=pw=>clamp((Math.log(Math.max(1,pw/18000))/Math.log(2.3))/3,0,1)*.75;

/* 1) la puissance cible du bot tient compte de ses étoiles */
{const bc=botCareer;botCareer=function(b,t){const r=bc.apply(this,arguments);try{const s=botESf(b,t);if(s>0){
  let tg=r.tgt*(1+ESP*s*legShare(r.tgt));const top=realTopPw();
  if(top>0){const L=botLuck(b.n||b.id||'');const cap=(typeof MOTG!=='undefined'&&MOTG)?top*(L>=1.05?1+.02*MOTG.lv:.99):top*(L>=1.09?1.03:L>=1.05?.985:.96);if(tg>cap)tg=Math.max(r.tgt,cap)}
  r.tgt=tg;r.es=s}}catch(e){}return r}}

/* 2) l'équipe affichée : étoiles d'éther sur les légendaires ★★★, et niveaux recalculés (un peu plus bas : ce sont les étoiles qui font la différence) */
function rowES(p){try{const b=(S.world&&Array.isArray(S.world.players)&&S.world.players.find(x=>x&&(x.id===p.id||(p.n&&x.n===p.n))))||p;const s=botESf(b,Date.now());return s!=null?s:pwESf(p.pw||0)}catch(e){return pwESf(p.pw||0)}}
{const nt=npcTeam;npcTeam=function(p){const T=nt.apply(this,arguments);try{if(!p||p.real||p.me||!Array.isArray(T)||!T.length)return T;const avg=rowES(p);if(avg<.35)return T;
  const R=rng(roseH(String(p.id||p.n))%100000+77);let any=0;
  for(const x of T){const h=HEROES[x.id];if(!h||h.r<4||(x.e||0)<3){x.es=0;continue}x.es=clamp(Math.round(avg+R()*1.4-.7),0,5);if(x.es)any=1}
  if(any&&(p.pw||0)>0){let lo=1,hi=100;for(let k=0;k<20;k++){const mid=(lo+hi)/2;const tot=T.reduce((a,x)=>a+basePow(HEROES[x.id],mid,x.e||0)*(1+.35*(x.u||0))*(1+ESP*(x.es||0))*1.15,0);if(tot<p.pw)lo=mid;else hi=mid}
    T.forEach(x=>{x.l=clamp(Math.round(lo+(R()*6-3)),1,100)})}}catch(e){}return T}}
try{UROW.clear()}catch(e){}

/* 3) ça se voit : profil, fiche du héros, arène, et l'explication du profil */
const chip=n=>`<b class="esp">✦${n}</b>`;
{const pm=profileModal;profileModal=function(id){const r=pm.apply(this,arguments);try{if(id==='me')return r;const p=rowById(id);if(!p||p.real||p.me)return r;const m=document.querySelector('#ovl .modal');if(!m)return r;
  const tm=teamOfRow(p);m.querySelectorAll('.pteam .ptile').forEach((el,i)=>{const t=tm[i];if(!t||!t.es)return;const pl=el.querySelector('.pl');if(pl){pl.innerHTML=`Nv ${t.l}${t.e?' '+'★'.repeat(t.e):''}${t.u?` <b class="ust">${'✦'.repeat(t.u)}</b>`:''}`;if(!pl.querySelector('.esp'))pl.insertAdjacentHTML('beforeend',' '+chip(t.es))}});
  const s=tm.reduce((a,t)=>a+(t.es||0),0);if(s>0){const w=m.querySelector('.botwhy');const line=`<div>✦ <b>Habitué de la Forge d'Éther</b> : ${s} étoile${s>1?'s':''} d'éther sur ses légendaires</div>`;if(w&&!/Forge d'Éther/.test(w.innerHTML))w.insertAdjacentHTML('beforeend',line)}}catch(e){}return r}}
{const hv=hvModal;hvModal=function(pid,j){const r=hv.apply(this,arguments);try{if(pid==='me')return r;const p=rowById(pid);if(!p||p.real||p.me)return r;const t=teamOfRow(p)[j];if(!t||!t.es)return r;const m=document.querySelector('#ovl .modal');if(!m||m.querySelector('.hves'))return r;
  const stg=m.querySelector('.hvhd');const html=`<div class="hves">${'✦'.repeat(t.es)}${'✧'.repeat(5-t.es)} <b>${t.es} étoile${t.es>1?'s':''} d'éther</b> · +${Math.round(ESP*t.es*100)} % de PV, ATQ et DÉF</div>`;
  const tgt=m.querySelector('.hvhd')&&m.querySelector('.hvhd').nextElementSibling;if(tgt)tgt.insertAdjacentHTML('afterend',html);else if(stg)stg.insertAdjacentHTML('afterend',html)}catch(e){}return r}}
{const pa=pArena;pArena=function(){let h=pa.apply(this,arguments);try{const opps=(UI.arOpp||[]).map(rowById).filter(Boolean);const parts=h.split('<div class="oteam">');if(parts.length-1!==opps.length)return h;
  let o=parts[0];for(let i=0;i<opps.length;i++){const p=opps[i];let s=0;try{if(!p.real&&!p.me)s=teamOfRow(p).reduce((a,t)=>a+(t.es||0),0)}catch(e){}o+='<div class="oteam">'+(s?parts[i+1].replace(/^([\s\S]*?<\/div>)/,`$1<small class="oes">✦ ${s} étoile${s>1?'s':''} d'éther</small>`):parts[i+1])}return o}catch(e){return h}}}

const st=document.createElement('style');st.textContent=`.pteam .esp,.esp{display:inline-block;font-size:10px;font-weight:900;color:#2a1a00;background:linear-gradient(90deg,#fff3b0,#ffd84a);border-radius:5px;padding:0 4px;box-shadow:0 0 5px rgba(180,138,255,.8);vertical-align:1px}
.hves{margin:8px 0;padding:7px 10px;border-radius:10px;font-size:13px;color:#ffe9a0;background:linear-gradient(90deg,rgba(255,216,74,.14),rgba(180,138,255,.14));border:1px solid rgba(255,216,74,.5)}.hves b{color:#fff}
.oes{display:block;font-size:11px;font-weight:800;color:#ffe08a;margin-top:2px}`;document.head.appendChild(st);
try{const X={"✦ Habitué de la Forge d'Éther":"✦ Ether Forge regular","Habitué de la Forge d'Éther":"Ether Forge regular",": # étoiles d'éther sur ses légendaires":": # ether stars on their legendaries",": # étoile d'éther sur ses légendaires":": # ether star on their legendaries",
  "# étoiles d'éther":"# ether stars","# étoile d'éther":"# ether star","· +# % de PV, ATQ et DÉF":"· +#% HP, ATK and DEF","✦ # étoiles d'éther":"✦ # ether stars","✦ # étoile d'éther":"✦ # ether star"};for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
try{const P=PATCH.find(x=>x.v===40);if(P)P.items.push("🤖 Les autres joueurs passent aussi à la Forge d'Éther : leurs légendaires reçoivent des étoiles d'éther au fil des jours, selon leur assiduité. Tu les vois dans leur profil et en arène.")}catch(e){}
/* le monde local se recale doucement (toujours +2 à +4 % par jour au maximum) */
setTimeout(()=>{try{GH.t=0;const t=Date.now();if(S.world&&Array.isArray(S.world.players)){for(const p of S.world.players)p.pw=growPw(p,t);save()}}catch(e){}},5200);
}catch(e){console.warn('bots ether',e)}})();
