
/* ================= V37.9 : « don » → Pack Mécène (achat d'un pack de contenu), rien de tout ça sur les portails ================= */
function supportModal(){const has=(S.evFrames||[]).includes('mecene');setTimeout(mecWall,50);modal(`<button class="x" data-a="close" aria-label="Fermer">×</button><div class="h">💜 Pack Mécène</div>
  <p class="muted" style="font-size:13.5px;margin:4px 0 10px;line-height:1.4">Le jeu est gratuit et le restera. Le Pack Mécène est un pack de contenu à prix libre, dès 1 € : il aide à financer les mises à jour 💜</p>
  <div class="mecbox"><div class="fav frm-mecene mecav">${myAv()}</div><div><b>Contenu du pack</b><br><span class="muted" style="font-size:12.5px">Après ton achat, tu reçois un <b>code Mécène</b>. Entre-le ici pour débloquer :</span></div></div>
  <div class="mecgift">${MEC_GIFTS.map(g=>'<span>'+g+'</span>').join('')}</div><div id="mecwall" class="mecwall"></div>
  <a class="btn pro" href="${ITCH_DON}" target="_blank" rel="noopener" style="width:100%;margin-top:10px;display:flex;justify-content:center;text-decoration:none">💜 Obtenir le Pack Mécène</a>
  ${has?'<p class="sub" style="text-align:center;margin-top:10px">✅ Tu es Mécène du royaume. Merci !</p>':`<div class="row" style="gap:6px;margin-top:10px"><input id="meccode" class="tx" data-noi18n placeholder="MECENE-XXXX-XXXX-XXXX" maxlength="30" style="flex:1;min-width:0;text-transform:uppercase"><button class="btn" data-a="mecok">Valider</button></div>`}
  <p class="muted" style="font-size:11.5px;margin-top:10px">Prix libre, dès 1 €. Paiement sécurisé géré par itch.io. Si tu es mineur, demande à un parent avant d'acheter.</p>`)}
try{FHINT.mecene='Pack Mécène (code Mécène)';const T=TITLES.find(t=>t.k==='mecene');if(T)T.d='Pack Mécène (code Mécène)'}catch(e){}
try{Object.assign(I18N_EN,{"💜 Pack Mécène":"💜 Patron Pack","Pack Mécène":"Patron Pack","Contenu du pack":"Pack contents",
 "Le jeu est gratuit et le restera. Le Pack Mécène est un pack de contenu à prix libre, dès # € : il aide à financer les mises à jour 💜":"The game is free and will stay that way. The Patron Pack is a pay-what-you-want content pack, from # €: it helps fund the updates 💜",
 "Après ton achat, tu reçois un":"After your purchase, you get a","code Mécène":"Patron code",". Entre-le ici pour débloquer :":". Enter it here to unlock:",
 "💜 Obtenir le Pack Mécène":"💜 Get the Patron Pack","Prix libre, dès # €. Paiement sécurisé géré par itch.io. Si tu es mineur, demande à un parent avant d'acheter.":"Pay what you want, from # €. Secure payment handled by itch.io. If you're a minor, ask a parent before buying.",
 "💜 Pack Mécène · soutiens le jeu":"💜 Patron Pack · support the game","Pack Mécène (code Mécène)":"Patron Pack (Patron code)","Tu es Mécène du royaume. Merci !":"You're a Patron of the kingdom. Thank you!"})}catch(e){}
/* bouton des paramètres */
{const sm=settingsModal;settingsModal=function(){const r=sm.apply(this,arguments);try{const b=document.querySelector('#ovl .supbtn');if(b)b.textContent='💜 Pack Mécène · soutiens le jeu'}catch(e){}return r}}
/* Newgrounds (comme CrazyGames) : pas de bouton d'achat, pas de lien vers d'autres sites */
if(window.RDE_NG){try{const st=document.createElement('style');st.textContent='[data-a="support"],[data-a="invite"],.supbtn{display:none!important}';document.head.appendChild(st);
  const bad=/itch|github|appli RDE|nouvelle appli|déménag|version Claude|ancienne version|Soutenir le jeu|Mécène|installer/i;
  for(const P of PATCH){if(Array.isArray(P.items))P.items=P.items.filter(x=>!bad.test(String(x)))}
  for(let i=PATCH.length-1;i>=0;i--)if(!PATCH[i].items||!PATCH[i].items.length)PATCH.splice(i,1)}catch(e){}}
/* traductions manquantes repérées dans les onglets */
try{Object.assign(I18N_EN,{"Coffre lunaire":"Lunar chest","Céleste Nv # · −# %":"Celestial Lv # · −# %","Épique Nv # · −# %":"Epic Lv # · −# %","Ferme dans # h #":"Closes in # h #",
 "Les marchands de la nuit déballent leurs trésors. Les offres changent chaque soir.":"The night merchants unpack their treasures. Offers change every evening.",
 "Nuit claire":"Clear night","🌙 Nuit claire":"🌙 Clear night","🌙 nuit":"🌙 night","Photo « Marchande de la Lune »":"\"Moon Merchant\" photo","Super rare, épique ou céleste (# %)":"Super rare, epic or celestial (# %)",
 "Une hydre aux trois têtes venue d'une autre dimension. Son souffle empoisonne tout.":"A three-headed hydra from another dimension. Its breath poisons everything.","🐲 Hydre du Néant":"🐲 Void Hydra","Hydre du Néant":"Void Hydra",
 "Une seule par nuit":"Only one per night","« Approchez, approchez ! Tout est frais, même les épées ! »":"“Step right up! Everything's fresh, even the swords!”",
 "« Le secret d'une bonne arme ? Taper fort, taper juste, et ne jamais laisser refroidir. »":"“The secret of a good weapon? Strike hard, strike true, and never let it cool down.”",
 "✨ Astral":"✨ Astral","💰 Événement flash : Pluie d'or pendant # h # !":"💰 Flash event: Gold rain for # h #!","Vu il y a # h":"Seen # h ago","Vu il y a # min":"Seen # min ago","Vu il y a # j":"Seen # d ago",
 "Coucou Raptor, comment tu as fait pour monter si vite ?":"Hey Raptor, how did you climb so fast?","VIP":"VIP","II":"II","III":"III","Abc":"Abc"})}catch(e){}
try{I18N_RULES.push([/^Message à (.+)…$/,(m)=>'Message '+m[1]+'…'])}catch(e){}
/* le texte caché pendant la traduction réapparaît plus vite */
try{i18wClear=function(all){for(const el of [...I18W]){if(all||!el.isConnected||Date.now()-(el._i18w||0)>600){el.classList.remove('i18w');I18W.delete(el)}}}}catch(e){}
