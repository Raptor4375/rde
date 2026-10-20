/* ================= doublons de joueurs (plusieurs fiches pour la même personne) ================= */
/* Chaque appareil (ou navigateur) reçoit sa propre identité en ligne. Après un transfert de compte ou une
   installation de l'appli, une même personne pouvait donc avoir plusieurs fiches dans le classement.
   On n'affiche plus qu'une fiche par pseudo (la plus récente), et jamais une copie de soi-même. */
{const rr=realRows;realRows=function(){const L=rr.apply(this,arguments);try{const me=String(S.name||'').trim().toLowerCase();const best=new Map();
  for(const r of L){const k=String(r.n||'').trim().toLowerCase();if(!k)continue;if(me&&k===me)continue;const o=best.get(k);if(!o||(r.last||0)>(o.last||0)||((r.last||0)===(o.last||0)&&(r.pw||0)>(o.pw||0)))best.set(k,r)}
  return L.filter(r=>{const k=String(r.n||'').trim().toLowerCase();return k&&best.get(k)===r})}catch(e){return L}}}
/* ménage : si on joue avec l'identité transférée, on supprime la vieille fiche créée sous l'identité de l'appareil */
setTimeout(async()=>{try{if(!NET.on||!NET.db||!NET.uid||!NET.pid||NET.uid===NET.pid)return;const d=NET.players&&NET.players[NET.uid];if(d)await NET.db.doc('players/'+NET.uid).delete()}catch(e){}},15000);
