/* ================= V36.4 : méta des raids corrigée, carte de guerre à la bonne taille, codes cadeaux ================= */
/* 1) l'affinité « Le Temps et la Chance » (+30 énergie) comptait comme +3000 % dans le calcul de la méta */
affGain=function(a){const f=a.fx||{};let g=0;for(const k in f){const v=+f[k]||0;g+=(k==='energy'||k==='en')?v/300:v}return g};
try{for(const k in METAC)delete METAC[k];MYB.t=0}catch(e){}
/* 2) codes cadeaux : un bouton dans les paramètres */
function giftModal(){modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">🎁 Code cadeau</div>
  <p class="sub">Tu as reçu un code ? Tape-le ici.</p>
  <input id="giftcode" class="tx" data-noi18n placeholder="XXXXX-XXXX-XXXX" maxlength="30" autocomplete="off" autocapitalize="characters" spellcheck="false" style="width:100%;text-transform:uppercase;box-sizing:border-box">
  <button class="btn p" data-a="giftok" style="width:100%;margin-top:10px">Valider</button>`);setTimeout(()=>{const i=$('#giftcode');i&&i.focus()},100)}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="giftopen"],[data-a="giftok"]');if(!b)return;e.preventDefault();e.stopPropagation();
  if(b.dataset.a==='giftopen')return giftModal();
  const c=String(($('#giftcode')||{}).value||'').trim().toUpperCase().replace(/\s+/g,'');if(!c)return;
  b.disabled=true;try{if(/^CADRE-/.test(c)){const h=await mecHash(c);let L=CADRE_H[h];if(L==='AV')L=((S.avw||{}).fac==='ange')?['aureole','ailesor']:['infernal','abyssal'];if(!L){toast("Ce code n'est pas valide.");return}
      if(!NET.on||!NET.db){toast('Connecte-toi à internet pour valider ton code.');return}
      const ref=NET.db.doc('mecene/'+h);const s=await ref.get();if(s.exists){const d=s.data();if(d&&d.pid!==NET.pid){toast('Ce code a déjà été utilisé.');return}}else await ref.set({pid:NET.pid,n:S.name||'',t:Date.now()});
      S.evFrames=S.evFrames||[];const nw=L.filter(k=>!S.evFrames.includes(k));for(const k of nw)S.evFrames.push(k);try{cosVault()}catch(er){}save();closeModal();
      toast(nw.length?`🖼️ Cadres restaurés : ${nw.map(k=>FRAMES[k]).join(', ')}`:'Tu as déjà ces cadres 🙂');try{render()}catch(er){}return}
    /* code Mécène : on passe par la fenêtre de soutien */
    if((S.evFrames||[]).includes('mecene')){toast('Tu es déjà Mécène 💜');return}
    closeModal();supportModal();setTimeout(()=>{const i=$('#meccode');if(i){i.value=c;const k=document.querySelector('[data-a="mecok"]');k&&k.click()}},60)}
  catch(er){toast('Erreur, réessaie dans un instant.')}finally{b.disabled=false}},true);
{const sm=settingsModal;settingsModal=function(){const r=sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('[data-a=giftopen]')){const h='<button class="btn" data-a="giftopen" style="width:100%;margin:0 0 10px">🎁 Code cadeau</button>';const s=m.querySelector('[data-a=support]');if(s)s.insertAdjacentHTML('afterend',h);else{const hh=m.querySelector('.h');(hh||m).insertAdjacentHTML(hh?'afterend':'afterbegin',h)}}}catch(e){}return r}}
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("🧠 La <b>méta des raids</b> est corrigée : une affinité était comptée beaucoup trop fort et faussait l'efficacité de toutes les autres équipes.","🎁 Nouveau bouton <b>Code cadeau</b> dans ⚙️ Paramètres.")}catch(e){}
