/* ================= CASINO : le Poker d'Aléa (vidéo-poker, 5 cartes) ================= */
const PKT=[['rf','Quinte flush royale',250],['sf','Quinte flush',50],['p4','Carré',25],['fh','Full',9],['fl','Couleur',6],['st','Quinte',4],['p3','Brelan',3],['p2','Double paire',2],['jb','Paire de Valets ou mieux',1]];
const PKQ={idle:["Assieds-toi, Porteur. Ici, c'est moi qui distribue.","Une main, cinq cartes, un seul échange. Simple. Cruel. Magnifique.","Fortuna dit que je triche. Je dis que j'ai du style."],
 win:["Joli coup ! Le destin t'aime bien aujourd'hui.","Hé hé… tu apprends vite.","Ça, c'est une main digne de ma table !"],
 big:["Quoi ?! Même moi, je n'aurais pas réécrit mieux !","Fortuna va être jalouse. Très jalouse.","Ça… c'est du grand art."],
 lose:["La maison gagne… cette fois.","Le hasard est capricieux. Comme moi.","Garde tes cartes fortes, jette les faibles. C'est tout l'art."]};
function pkS(){const C=CAS();if(!C.pk||typeof C.pk!=='object')C.pk={st:'idle',bet:0,h:[],hold:[],res:'',pay:0,q:PKQ.idle[0]};if(C.st&&C.st.pk==null)C.st.pk=0;return C.pk}
function pkV(c){return c.r===0?14:c.r+1}
function pkEval(h){const v=h.map(pkV).sort((a,b)=>a-b),fl=h.every(c=>c.s===h[0].s);const uniq=[...new Set(v)];
  let st=uniq.length===5&&(v[4]-v[0]===4||v.join()==='2,3,4,5,14');const cnt={};v.forEach(x=>cnt[x]=(cnt[x]||0)+1);const g=Object.values(cnt).sort((a,b)=>b-a);
  if(st&&fl)return v[0]===10?'rf':'sf';if(g[0]===4)return'p4';if(g[0]===3&&g[1]===2)return'fh';if(fl)return'fl';if(st)return'st';if(g[0]===3)return'p3';if(g[0]===2&&g[1]===2)return'p2';
  if(g[0]===2){const pv=+Object.keys(cnt).find(k=>cnt[k]===2);if(pv>=11)return'jb'}return''}
function pkDeck(ex){const d=[];for(let s=0;s<4;s++)for(let r=0;r<13;r++)if(!ex.some(c=>c.r===r&&c.s===s))d.push({r,s});for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]]}return d}
function pkHint(h){const k=pkEval(h);return k?PKT.find(x=>x[0]===k):null}
function pkDealHand(){const C=CAS(),P=pkS();if(!casOn()||P.st==='hold')return;const bet=C.bet;if(C.j<bet)return toast('Pas assez de jetons.');
  C.j-=bet;casWag(bet);const d=pkDeck([]);P.bet=bet;P.h=d.slice(0,5);P.hold=[0,0,0,0,0];P.st='hold';P.res='';P.pay=0;P.q="Choisis les cartes à garder, puis tire.";UI.pkA=[0,1,2,3,4];
  try{cSnd.chips();[0,1,2,3,4].forEach(i=>cSnd.card(i))}catch(e){}save();render()}
function pkToggle(i){const P=pkS();if(P.st!=='hold'||i<0||i>4)return;P.hold[i]=P.hold[i]?0:1;UI.pkA=[];try{cSnd.card(0)}catch(e){}render()}
function pkDraw(){const C=CAS(),P=pkS();if(P.st!=='hold')return;const d=pkDeck(P.h);const nw=[];P.h=P.h.map((c,i)=>{if(P.hold[i])return c;nw.push(i);return d.pop()});UI.pkA=nw;
  const k=pkEval(P.h),row=PKT.find(x=>x[0]===k),m=row?row[2]:0,pay=P.bet*m;C.j+=pay;P.pay=pay;P.res=k||'none';P.st='done';C.st.pk=(C.st.pk||0)+1;casQ('pkp');if(m>=1)casQ('pkw');if(pay>P.bet)C.won+=pay-P.bet;
  if(k==='rf'){C.st.jack=(C.st.jack||0)+1;S.stats.royal=(S.stats.royal||0)+1}
  P.q=pick(m>=9?PKQ.big:m>=1?PKQ.win:PKQ.lose);save();
  try{nw.forEach((i,j)=>cSnd.card(j))}catch(e){}
  setTimeout(()=>{try{if(m>=50){cSnd.jack();toast(`🃏 ${row[1]} ! +${fmt(pay)} jetons`)}else if(m>=9){cSnd.big();toast(`🃏 ${row[1]} ! +${fmt(pay)} jetons`)}else if(m>=1)cSnd.win();else cSnd.lose()}catch(e){}},420);render()}
function pkView(){const C=CAS(),P=pkS(),hold=P.st==='hold',A=UI.pkA||[];UI.pkA=[];
  const cards=P.h.length?P.h.map((c,i)=>{const red=c.s===1||c.s===2,an=A.includes(i);return`<button class="pc pkcard ${red?'red':''} ${an?'in':''} ${P.hold[i]?'held':''}" style="--i:${A.indexOf(i)}" data-a="pkh" data-v="${i}" ${hold?'':'disabled'} aria-pressed="${!!P.hold[i]}" aria-label="${RK[c.r]} ${['pique','cœur','carreau','trèfle'][c.s]}"><b>${RK[c.r]}</b><i>${SU[c.s]}</i><em>${SU[c.s]}</em>${P.hold[i]?'<span class="pkhold">GARDÉE</span>':''}</button>`}).join('')
   :[0,1,2,3,4].map(()=>'<span class="pc back pkcard"></span>').join('');
  const cur=hold?pkHint(P.h):null,row=P.st==='done'?PKT.find(x=>x[0]===P.res):null;
  const res=P.st==='done'?(row?`<div class="cres win">${row[1]} !<small>+${fmt(P.pay)} jetons (×${row[2]})</small></div>`:`<div class="cres lose">Perdu<small>−${fmt(P.bet)} jetons</small></div>`):`<div class="cres">${hold?(cur?`Tu as déjà : ${cur[1]}`:'Garde tes meilleures cartes'):'Faites vos jeux'}</div>`;
  const btn=hold?`<button class="btn pro big" data-a="pkdraw">🃏 Tirer${P.hold.some(x=>x)?'':' 5 nouvelles cartes'}</button>`:`<button class="btn p big" data-a="pkdeal" ${C.j<C.bet?'disabled':''}>${C.j<C.bet?'Pas assez de jetons':`${P.st==='done'?'Rejouer':'Distribuer'} · ${fmt(C.bet)}`}</button>`;
  const hi=row?row[0]:cur?cur[0]:'';
  return`<div class="ctable pktable"><div class="pkdealer"><div class="pkal">${aleaSVG()}</div><div class="pkbub"><b>Aléa</b>${esc(P.q||PKQ.idle[0])}</div></div>
   <div class="pkhand">${cards}</div>${res}<div class="cbtns">${btn}</div>${hold?'<p class="pktip">Touche une carte pour la garder. Les autres sont remplacées au tirage.</p>':''}</div>${hold?'':betBar()}
   <div class="card pkpay"><div class="h3" style="margin:0 0 4px">Table des gains</div>${PKT.map(([k,n,m])=>`<div class="pkrow ${hi===k?'on':''}"><span>${n}</span><b>×${m}</b>${P.bet||C.bet?`<em>${fmt(m*(P.st==='idle'?C.bet:(P.bet||C.bet)))}</em>`:''}</div>`).join('')}
   <p class="muted" style="font-size:12px;margin:6px 0 0">Vidéo-poker à 5 cartes : une distribution, un seul échange. Tu récupères ta mise avec une paire de Valets (ou de Dames, Rois, As). Mains jouées : <b>${fmt(C.st.pk||0)}</b>.</p></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="pkdeal"],[data-a="pkdraw"],[data-a="pkh"]');if(!b)return;e.preventDefault();e.stopPropagation();try{casQuiet()}catch(x){}
  const a=b.dataset.a;if(a==='pkdeal')pkDealHand();else if(a==='pkdraw')pkDraw();else pkToggle(+b.dataset.v)},true);
try{CQ.push({k:'pkw',n:'Gagner 3 mains de poker',g:3,rw:500})}catch(e){}
/* l'onglet Poker dans le casino */
{const cp=casPage;casPage=function(){const pk=UI.csub==='pk'&&casOn();if(UI.csub==='pk'&&!casOn())UI.csub='shop';if(pk)UI.csub='sl';let h;try{h=cp.apply(this,arguments)}finally{if(pk)UI.csub='pk'}
  if(!casOn())return h;const chip=`<button class="chip ${pk?'on':''}" data-a="csub" data-v="pk">🂡 Poker</button>`;
  const i=h.indexOf('data-a="csub" data-v="shop"');if(i>=0){const j=h.lastIndexOf('<button',i);h=h.slice(0,j)+chip+h.slice(j)}
  if(!pk)return h;h=h.replace('class="chip on" data-a="csub" data-v="sl"','class="chip " data-a="csub" data-v="sl"');const k=h.indexOf('<div class="ctable">');return k>=0?h.slice(0,k)+pkView():h}}

/* les règles du poker, expliquées simplement */
const PK_RULES=`<details class="card pkrules" ${'open'}><summary>📖 Comment jouer ? (règles simples)</summary>
 <ol class="pkr"><li><b>Choisis ta mise</b> avec les jetons en bas, puis touche <b>Distribuer</b> : tu reçois 5 cartes.</li>
 <li><b>Garde les bonnes cartes</b> : touche celles qui t'aident (elles montent et affichent GARDÉE). Les autres seront changées.</li>
 <li>Touche <b>Tirer</b> : les cartes non gardées sont remplacées. Tu n'as droit qu'à <b>un seul échange</b>.</li>
 <li>On regarde ta main finale : si elle est dans la table des gains, tu gagnes ta mise multipliée. Sinon, tu perds ta mise.</li></ol>
 <div class="h3 h4" style="margin:8px 0 4px">Les mains, de la plus faible à la plus forte</div>
 <div class="pkex">${[['Paire de Valets ou mieux','V♠ V♥ 3♣ 7♦ 9♠','2 cartes pareilles, Valet, Dame, Roi ou As (une paire de 2 à 10 ne paie pas).','×1 (mise rendue)'],
  ['Double paire','4♠ 4♥ 9♣ 9♦ R♠','2 paires différentes.','×2'],['Brelan','7♠ 7♥ 7♦ 2♣ D♠','3 cartes pareilles.','×3'],
  ['Quinte','5♦ 6♠ 7♥ 8♣ 9♠','5 cartes qui se suivent, couleurs mélangées.','×4'],['Couleur','2♥ 6♥ 9♥ V♥ R♥','5 cartes du même symbole (♥, ♠, ♦ ou ♣), dans n\'importe quel ordre.','×6'],
  ['Full','D♠ D♥ D♦ 5♣ 5♠','Un brelan + une paire.','×9'],['Carré','A♠ A♥ A♦ A♣ 3♥','4 cartes pareilles.','×25'],
  ['Quinte flush','5♣ 6♣ 7♣ 8♣ 9♣','Une quinte, toute du même symbole.','×50'],['Quinte flush royale','10♥ V♥ D♥ R♥ A♥','10, Valet, Dame, Roi, As du même symbole : la main parfaite !','×250']]
  .map(([n,c,d,m])=>`<div class="pkexr"><div><b>${n}</b><small>${d}</small></div><span class="pkexc">${c.split(' ').map(x=>`<i class="${/[♥♦]/.test(x)?'r':''}">${x}</i>`).join('')}</span><em>${m}</em></div>`).join('')}</div>
 <p class="muted" style="font-size:12px;margin:8px 0 0">V = Valet, D = Dame, R = Roi, A = As. 💡 Astuce : garde toujours une paire (même petite), 4 cartes du même symbole ou 4 cartes qui se suivent. Si tu n'as rien, garde tes Valets, Dames, Rois et As. La ligne de ta main en cours s'allume dans la table des gains.</p></details>`;
{const pv=pkView;pkView=function(){const h=pv.apply(this,arguments);const seen=(CAS().st.pk||0)>=5;return h.replace('<div class="card pkpay">',(seen?PK_RULES.replace("${'open'}",'').replace(' open>','>'):PK_RULES)+'<div class="card pkpay">')}}
