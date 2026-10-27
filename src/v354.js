/* ================= V37.1 : les menus se débloquent petit à petit (nouveaux joueurs) ================= */
const ULK={equip:2,quetes:3,top:5,boss:6,guilde:8,event:10};
const ulkOk=k=>!ULK[k]||(S.max||0)>=ULK[k]||(S.nmax||0)>0;
function ulkName(k){try{const t=TABS.find(x=>x[0]===k);return t?tr(t[1]):k}catch(e){return k}}
{const rt=renderTabs;renderTabs=function(){const r=rt.apply(this,arguments);try{
  if(!Array.isArray(S.ulkDone)){S.ulkDone=Object.keys(ULK).filter(ulkOk);save()}
  for(const k of Object.keys(ULK))if(ulkOk(k)&&!S.ulkDone.includes(k)){S.ulkDone.push(k);(S.ulkNew=S.ulkNew||[]).push(k);save();setTimeout(()=>{try{toast((LANG==='fr'?'🔓 Nouveau : ':'🔓 New: ')+ulkName(k)+' !')}catch(e){}},400)}
  document.querySelectorAll('#tabs [data-a="tab"]').forEach(b=>{const k=b.dataset.v;
    if(!ulkOk(k)){b.classList.add('tlock');const d=b.querySelector('.dot');if(d)d.remove();if(!b.querySelector('.tlk'))b.insertAdjacentHTML('beforeend','<span class="tlk">🔒</span>')}
    else if((S.ulkNew||[]).includes(k)&&!b.querySelector('.tnew'))b.insertAdjacentHTML('beforeend',`<span class="tnew">${LANG==='fr'?'NOUVEAU':'NEW'}</span>`)})}catch(e){}return r}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="tab"]');if(!b)return;const k=b.dataset.v;
  if(!ulkOk(k)){e.preventDefault();e.stopImmediatePropagation();toast(LANG==='fr'?`🔒 ${ulkName(k)} : se débloque après l'étape ${ULK[k]} de l'Aventure.`:`🔒 ${ulkName(k)}: unlocks after Adventure stage ${ULK[k]}.`);return}
  if((S.ulkNew||[]).includes(k)){S.ulkNew=S.ulkNew.filter(x=>x!==k);save()}},true);
/* si on était resté sur un onglet verrouillé, on revient à l'aventure */
setTimeout(()=>{try{if(!ulkOk(TAB)){TAB='adv';render()}}catch(e){}},1500);
