
/* ================= Claude joue : son compte est piloté par de vraies sessions de Claude (doc claude/state) ================= */
const CLST={d:null,t:0};
async function clstLoad(){try{if(!NET.on||!NET.db)return;const s=await NET.db.doc('claude/state').get();CLST.d=s&&s.exists?s.data():null;CLST.t=Date.now()}catch(e){}}
setTimeout(clstLoad,6000);setInterval(clstLoad,90000);
{const br=botRows;botRows=function(){const out=br.apply(this,arguments);const d=CLST.d;if(!d)return out;for(const r of out)if(r.bid==='claude'&&r.gidr===CLAUDE_GID){if(d.pw)r.pw=d.pw;if(d.st)r.st=d.st;if(Array.isArray(d.team)&&d.team.length)r.team=d.team.filter(i=>HEROES[i]);if(Array.isArray(d.raid))r.raid=d.raid;r.last=d.last||r.last;r.act=1}return out}}
function clFac(){const d=CLST.d;return d&&(d.fac==='ange'||d.fac==='demon')?d.fac:avGuildFac(CLAUDE_GID)}
{const ad=avDmg;avDmg=function(k){const x=ad.apply(this,arguments);const d=CLST.d;const v=d&&d.dm&&+d.dm[k]||0;if(v>0){const f=clFac();if(f==='ange')x.a+=Math.round(v);else if(f==='demon')x.d+=Math.round(v)}return x}}
{const cd=avCapDmg;avCapDmg=function(){const x=cd.apply(this,arguments);const d=CLST.d;const v=d&&+d.dmc||0;if(v>0){const f=clFac();if(f==='ange')x.a+=Math.round(v);else if(f==='demon')x.d+=Math.round(v)}return x}}
function clAgo(t){const m=Math.round((Date.now()-t)/60000);return m<1?"à l'instant":m<60?`il y a ${m} min`:m<1440?`il y a ${Math.round(m/60)} h`:`il y a ${Math.round(m/1440)} j`}
{const pm=profileModal;profileModal=function(id){pm.apply(this,arguments);try{const p=rowById(id);if(!isClaude(p))return;const d=CLST.d,m=$('#ovl .modal');if(!m||m.querySelector('.cljr'))return;const n=m.querySelector('.clnote');if(!n)return;
  const L=d&&Array.isArray(d.log)?d.log.slice(-4).reverse():[];
  n.insertAdjacentHTML('afterend',`<div class="cljr"><div class="h3" style="margin:0 0 6px">📓 Journal de Claude</div>${L.length?L.map(e=>`<div class="cle"><time>${clAgo(e.t||0)}</time><p>${esc(String(e.x||'').slice(0,300))}</p></div>`).join(''):`<p class="muted" style="margin:0;font-size:12.5px">Claude n'a pas encore joué sa première session.</p>`}<p class="muted" style="margin:6px 0 0;font-size:11.5px">Claude joue par sessions de quelques minutes, plusieurs fois par jour : il choisit son équipe, ses combats et les royaumes à attaquer, puis répond aux questions du tchat.${d&&d.sessions?` ${d.sessions} session${d.sessions>1?'s':''} jouée${d.sessions>1?'s':''}.`:''}</p></div>`)}catch(e){}}}
