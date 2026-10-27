
/* ================= V25 : CHARGEMENT ÉPIQUE, ULTRAS PLUS RARES, LETTRE À 200 GEMMES ================= */
/* ---------- écran de chargement : la bataille du Ciel contre l'Ombre ---------- */
const BT2={ready:false,min:false,shown:false};
const BT_CEL=[[64,0],[61,0],[50,0]],BT_OBS=[[62,0],[48,0],[43,0]];
const BTIPS=['Les Célestes défendent les portes du royaume…','Les Obscurs montent des abysses…','Le choc des deux armées secoue le ciel…','Astuce : fais une équipe par mode de jeu.','Astuce : le mode Normal a ses propres mondes.','Les ultra-évolutions sont réservées aux plus patients…'];
function btImg(id,u){try{return'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(heroBody(HEROES[id],u))}catch(e){return''}}
function btCloud(x,y,s,c){return`<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="0" rx="34" ry="12" fill="${c}"/><circle cx="-16" cy="-6" r="13" fill="${c}"/><circle cx="4" cy="-12" r="17" fill="${c}"/><circle cx="22" cy="-5" r="12" fill="${c}"/></g>`}
function btScene(){
  const cel=BT_CEL.map(([id,u],i)=>`<div class="b2h cel p${i}"><div class="b2plat"><svg viewBox="-40 -30 80 40">${btCloud(0,0,1,'#ffffff')}${btCloud(-6,4,.7,'#e8f0ff')}</svg></div><img src="${btImg(id,u)}" alt=""></div>`).join('');
  const obs=BT_OBS.map(([id,u],i)=>`<div class="b2h obs p${i}"><div class="b2plat dark"><svg viewBox="-40 -30 80 40"><ellipse cx="0" cy="0" rx="34" ry="10" fill="#1a0a24"/><path d="M-30 0Q-20 -16 -10 -4Q-2 -20 8 -5Q18 -18 28 0Z" fill="#2a0a3a"/><circle cx="-12" cy="-2" r="1.6" fill="#ff3a5a"/><circle cx="-7" cy="-2" r="1.6" fill="#ff3a5a"/><circle cx="14" cy="-3" r="1.4" fill="#c03aff"/><circle cx="18" cy="-3" r="1.4" fill="#c03aff"/></svg></div><img src="${btImg(id,u)}" alt=""></div>`).join('');
  let stars='';for(let k=0;k<26;k++)stars+=`<i style="left:${50+Math.random()*50}%;top:${Math.random()*70}%;animation-delay:${(Math.random()*3).toFixed(1)}s"></i>`;
  let motes='';for(let k=0;k<16;k++)motes+=`<i style="left:${Math.random()*48}%;top:${20+Math.random()*70}%;animation-delay:${(Math.random()*5).toFixed(1)}s;animation-duration:${(4+Math.random()*4).toFixed(1)}s"></i>`;
  let embers='';for(let k=0;k<16;k++)embers+=`<i style="left:${52+Math.random()*48}%;top:${30+Math.random()*65}%;animation-delay:${(Math.random()*5).toFixed(1)}s;animation-duration:${(3+Math.random()*4).toFixed(1)}s"></i>`;
  return`<div class="b2">
   <div class="b2sky"></div><div class="b2rays"></div><div class="b2void"></div>
   <div class="b2stars">${stars}</div><div class="b2motes">${motes}</div><div class="b2embers">${embers}</div>
   <svg class="b2clouds" viewBox="0 0 400 300" preserveAspectRatio="xMinYMid slice">${btCloud(40,60,1.4,'rgba(255,255,255,.55)')}${btCloud(150,30,1,'rgba(255,248,220,.45)')}${btCloud(90,250,2,'rgba(255,255,255,.35)')}</svg>
   <svg class="b2smoke" viewBox="0 0 400 300" preserveAspectRatio="xMaxYMid slice"><path d="M240 300Q260 200 300 220Q320 140 360 180Q380 110 410 140V300Z" fill="#12061c" opacity=".85"/><path d="M270 300Q290 240 320 250Q345 200 380 230Q395 200 410 210V300Z" fill="#1e0a2c"/><path class="b2bolt" d="M330 20l-14 40h12l-10 36l30 -50h-14l10 -26z" fill="#c070ff"/></svg>
   <div class="b2div"></div>
   <div class="b2army cel">${cel}</div><div class="b2army obs">${obs}</div>
   <div class="b2orb l"></div><div class="b2orb d"></div><div class="b2orb l l2"></div><div class="b2orb d d2"></div>
   <div class="b2clash"><i></i><b></b></div>
   <div class="b2top"><div class="b2title">${(function(){try{return String(localStorage.getItem('rde-lang')||navigator.language||'fr').slice(0,2).toLowerCase()}catch(e){return'fr'}})()==='fr'?"Royaumes<span>d'Éther</span>":'Realms<span>of Ether</span>'}</div><div class="b2vs"><b class="c">CÉLESTES</b><em>⚔</em><b class="o">OBSCURS</b></div></div>
   <div class="b2bot"><div class="bt-bar"><i></i></div><div class="bt-s" id="bts">Les Célestes défendent les portes du royaume…</div><div class="b2tap" id="b2tap" hidden>Touche pour entrer dans la bataille</div><div class="b2snd" id="b2snd">🔊 Touche l'écran pour le son</div></div>
  </div>`}
(function(){try{const b=document.getElementById('boot');if(!b||BOOT.done)return;b.classList.add('v2');b.innerHTML=btScene();clearInterval(BOOT.iv);let i=0;BOOT.iv=setInterval(()=>{i=(i+1)%BTIPS.length;const el=document.getElementById('bts');if(el&&!BT2.ready)el.textContent=BTIPS[i]},1500);
  setTimeout(()=>{BT2.min=true;btMaybe()},5600);
  b.addEventListener('pointerup',e=>{const s=document.getElementById('b2snd');if(s)s.hidden=true;if(BT2.shown){e.stopPropagation();btEnter()}});}catch(e){}})();
function bootHide(){BT2.ready=true;btMaybe()}
function btMaybe(){if(BOOT.done||!BT2.ready||!BT2.min||BT2.shown)return;const b=document.getElementById('boot');if(!b||!b.classList.contains('v2')){return btEnter()}
  BT2.shown=true;b.classList.add('done');clearInterval(BOOT.iv);const s=document.getElementById('bts');if(s)s.textContent='Le royaume est prêt !';const t=document.getElementById('b2tap');if(t)t.hidden=false;setTimeout(()=>{if(!BOOT.done)btEnter()},30000)}
function btEnter(){if(BOOT.done)return;BOOT.done=true;clearInterval(BOOT.iv);const b=document.getElementById('boot');if(!b)return;b.classList.add('done','hide');setTimeout(()=>{b.remove();try{if(AU.started)musicWant(pageTheme())}catch(e){}},700);try{if(AU.started)musicWant(pageTheme())}catch(e){}}
/* musique de la bataille */
SONGS.boot={g:1,bpm:132,spb:4,bar:16,bars:8,prog:'Dm Bb C Dm Dm Bb Gm A',parts:[
 {i:'choir',f:'chord',lo:57,v:.55},
 {i:'pad',f:'chord',lo:50,v:.6},
 {i:'sbass',f:'bass',lo:38,v:.5,pat:[[0,2,0],[2,2,0],[4,2,12],[6,2,0],[8,2,0],[10,2,7],[12,2,12],[14,2,7]]},
 {i:'brass',f:'mel',v:.95,mel:'D5:2 D5:2 F5:2 A5:2 G5:4 F5:4|Bb4:4 D5:4 F5:4 Bb5:4|C5:2 E5:2 G5:2 C6:2 Bb5:4 A5:4|A5:12 r:4|D6:2 C6:2 A5:4 F5:4 D5:4|F5:2 G5:2 Bb5:4 A5:4 G5:4|G5:4 Bb5:4 D6:4 C6:4|C#6:8 E6:8'},
 {i:'timp',f:'bass',lo:38,v:.65,pat:[[0,2,0],[6,1,0],[8,2,7],[12,1,0],[14,1,0]]},
 {i:'kick',f:'drum',v:.4,pat:'x.....x.x.......'},
 {i:'snare',f:'drum',v:.38,pat:'....x.......x..x',alt:{4:'....x.......xxxx',8:'....x...x.x.xxxx'}},
 {i:'hat',f:'drum',v:.5,pat:'x.x.x.x.x.x.x.x.'},
 {i:'crash',f:'drum',v:.42,pat:'',alt:{1:'x',5:'x'}},
 {i:'bell',f:'mel',v:.3,mel:'D6:16|r:16|r:16|A6:16|D6:16|r:16|r:16|A6:16'}]};
try{delete SONGC.boot}catch(e){}
{const pt=pageTheme;pageTheme=function(){if(!BOOT.done)return'boot';return pt.apply(this,arguments)}}
/* ---------- ultra-évolutions beaucoup plus rares ---------- */
UCOST[0].s=30;UCOST[0].g=150000;UCOST[1].s=60;UCOST[1].g=450000;UCOST[2].s=100;UCOST[2].g=1200000;
try{const c=CSHOP.find(x=>x.k==='ush');if(c){c.c=20000;c.lim=2}}catch(e){}
/* ---------- lettre royale : 200 gemmes ---------- */
const UPD_GEMS2=200;
function updLetterCheck(){if((S.updGift||0)>=GAME_V)return;S.updGift=GAME_V;const P=PATCH[0],gm=P.nogem?0:UPD_GEMS2;
  addLetter({id:'upd'+GAME_V,k:'upd',from:"Le Grand Héraut d'Éther",role:'au nom de Sa Majesté',title:`Proclamation royale · mise à jour ${P.v}`,head:"Oyez, oyez, braves sujets du Royaume d'Éther !",
    body:`Par la présente, Sa Majesté fait savoir à tous ses sujets que le royaume s'est enrichi de nouvelles merveilles, sous le titre de « ${P.t} ».\nQue chacun en prenne connaissance et en fasse bon usage :`,
    items:P.items.map(x=>x.replace(/<[^>]+>/g,'')),end:gm?`En gage de sa bienveillance et pour saluer votre fidélité, la Couronne vous fait don de ${gm} gemmes, scellées en ce pli.`:"Le trésor royal reste fermé pour cette petite mise à jour : la Couronne compte sur votre vaillance pour gagner vos gemmes au combat.",gems:gm});
  save()}
PATCH.unshift({v:25,d:'14 octobre 2026',t:"La bataille du Ciel et de l'Ombre",items:[
 "⚔️ <b>Nouvel écran de chargement</b> : les Célestes (Séraphine, Valkyr et Lumen, sur leurs nuages, sous les rayons de lumière) affrontent les Obscurs (Nyx, Talon et Morrow, sur leurs fumées noires aux yeux rouges). Orbes de lumière contre orbes d'ombre, chocs au centre, éclairs, plumes et braises.",
 "🎺 <b>Musique de bataille</b> au chargement : chœurs, cuivres, timbales et percussions. Touche l'écran pour l'entendre, puis « Touche pour entrer ».",
 "✦ <b>Ultra-évolutions bien plus rares</b> : forme I = 30 éclats + 150 000 or, forme II = 60 éclats + 450 000 or, forme III = 100 éclats + 1 200 000 or (190 éclats au total au lieu de 65).",
 "💠 Les éclats d'ultra coûtent plus cher : 20 000 jetons au casino (2 max), 900 lunes au marché nocturne.",
 "📮 La lettre royale des mises à jour offre désormais <b>200 gemmes</b>."]});
