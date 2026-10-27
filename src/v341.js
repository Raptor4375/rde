/* ================= Rivaux crédibles : on peut te dépasser, mais il y a toujours une raison visible ================= */
/* 1) La chance est plus réaliste : la plupart entre 0,95 et 1,05, quelques chanceux jusqu'à 1,15.
   2) Plafond : personne ne dépasse le meilleur VRAI joueur au même nombre de jours, sauf la part due à sa chance.
   3) La chance se VOIT : un bot chanceux a plus de légendaires ultra-évolués, et son profil l'explique. */
botLuck=function(id){const a=hash01(id,'l1'),c=hash01(id,'l2'),z=(a+c+hash01(id,'l3')-1.5)/.5;let L=1+z*.035;if(hash01(id,'jack')>.95)L+=.06+hash01(id,'j2')*.06;return clamp(L,.92,1.15)};
const BOT_TOPX=1.0;
function realBest(D){try{const g=ghostAt(D,1);if(g!=null)return g}catch(e){}return null}
{const bc=botCareer;botCareer=function(b,t){const r=bc.apply(this,arguments);try{const id=b.n||b.id||'';const L=botLuck(id),q=botU(b);
  const quit=q<.45?Math.min(1,.4+hash01(id,'q')*.9):1,dq=r.d*quit;
  let cap=realBest(dq);if(cap==null)cap=PF2P(dq)*.82;           /* sans données : un peu sous le maximum théorique */
  cap*=BOT_TOPX*Math.max(1,L);if(r.tgt>cap)r.tgt=cap}catch(e){}return r}}
/* l'équipe affichée explique la puissance : les chanceux ont des ultras */
{const nt=npcTeam;npcTeam=function(p){const T=nt.apply(this,arguments);try{if(!p||p.real||p.me)return T;const L=botLuck(p.n||p.id||'');const want=L>=1.09?3:L>=1.05?2:L>=1.02?1:0;
  if(want>0&&(p.pw||0)>=30000){const legs=T.map((x,j)=>j).filter(j=>HEROES[T[j].id]&&HEROES[T[j].id].r>=4);let have=T.filter(x=>x.u>0).length;
    for(const j of legs){if(have>=want)break;if(!T[j].u){T[j].u=L>=1.09&&have===0?2:1;T[j].e=3;have++}}
    /* on recalcule les niveaux avec ces ultras : ils sont plus bas, c'est la chance qui fait la différence */
    let lo=1,hi=100;for(let k=0;k<20;k++){const mid=(lo+hi)/2;const tot=T.reduce((a,x)=>a+basePow(HEROES[x.id],mid,x.e)*(1+.35*(x.u||0))*1.15,0);if(tot<p.pw)lo=mid;else hi=mid}
    const R=rng(roseH(String(p.id||p.n))%100000+11);T.forEach(x=>{x.l=clamp(Math.round(lo+(R()*6-3)),1,100)})}}catch(e){}return T}}
function botWhy(p){try{if(!p||p.real||p.me)return'';const id=p.n||p.id||'',L=botLuck(id),sv=hash01(id,'sv')<.22,u=botU(p);const o=[];
  if(L>=1.05)o.push(`🍀 <b>Très chanceux aux invocations</b> : plusieurs légendaires et ultra-évolutions tôt`);else if(L>=1.02)o.push('🍀 Un peu de chance aux invocations');
  if(sv)o.push('💎 <b>Économe</b> : garde ses gemmes et invoque d\'un coup');
  if(u>=.985)o.push('🏆 Joueur légende : joue tous les jours depuis le début');else if(u>=.92)o.push('🔥 Joueur acharné');else if(u>=.75)o.push('⚔️ Joueur investi');else if(u<.45)o.push('🌙 Joueur occasionnel');
  return o.length?`<div class="botwhy">${o.map(x=>`<div>${x}</div>`).join('')}</div>`:''}catch(e){return''}}
{const pm=profileModal;profileModal=function(id){const r=pm.apply(this,arguments);try{if(!String(id).startsWith('b:')&&!/^p\d/.test(String(id)))return r;const p=rowById(id);const h=botWhy(p);if(!h)return r;const m=document.querySelector('#ovl .modal');if(!m||m.querySelector('.botwhy'))return r;
  const tg=[...m.querySelectorAll('.h3')].find(x=>/Équipe/.test(x.textContent));(tg||m.lastElementChild).insertAdjacentHTML(tg?'beforebegin':'beforeend',h)}catch(e){}return r}}
/* le monde local se recale tout de suite */
setTimeout(()=>{try{GH.t=0;const t=Date.now();if(S.world&&Array.isArray(S.world.players)){for(const p of S.world.players){p.pw=growPw(p,t)}save()}}catch(e){}},3500);
