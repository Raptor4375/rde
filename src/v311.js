
/* ================= LANGUES : interface traduite + traduction des messages ================= */
const LANGS=[['fr','🇫🇷','Français'],['en','🇬🇧','English'],['es','🇪🇸','Español'],['de','🇩🇪','Deutsch'],['it','🇮🇹','Italiano'],['pt','🇵🇹','Português'],['nl','🇳🇱','Nederlands'],['pl','🇵🇱','Polski'],['tr','🇹🇷','Türkçe'],['ar','🇸🇦','العربية']];
const LKEY='rde-lang';
function langGet(){try{const l=localStorage.getItem(LKEY);if(l&&LANGS.some(x=>x[0]===l))return l}catch(e){}return null}
function langAuto(){try{const n=String((navigator.languages&&navigator.languages[0])||navigator.language||'fr').toLowerCase().slice(0,2);if(n==='fr')return'fr';return LANGS.some(x=>x[0]===n)?n:'en'}catch(e){return'fr'}}
let LANG=langGet()||langAuto();
const I18N={on:false,mem:{},q:new Map(),busy:false,t:0,shown:new Set(),orig:new WeakMap(),done:new WeakMap(),names:new Set(),nt:0,fail:new Set()};
const NUMRX=/\d[\d\s .,]*\d|\d/g;
function i18nNorm(s){const nums=[];const k=s.replace(NUMRX,m=>{nums.push(m);return'#'});return{k,nums}}
function i18nFill(t,nums){let i=0;return t.replace(/#/g,()=>i<nums.length?nums[i++]:'#')}
function i18nLoad(){try{I18N.mem=JSON.parse(localStorage.getItem('rde-tr-'+LANG)||'{}')||{}}catch(e){I18N.mem={}}}
function i18nSave(){clearTimeout(I18N.st);I18N.st=setTimeout(()=>{try{let ks=Object.keys(I18N.mem);if(ks.length>6000){const o={};ks.slice(-4000).forEach(k=>o[k]=I18N.mem[k]);I18N.mem=o}localStorage.setItem('rde-tr-'+LANG,JSON.stringify(I18N.mem))}catch(e){}},800)}
/* traduction synchrone : dictionnaire, sinon cache, sinon on met en file d'attente */
function trK(k){if(LANG==='en'&&I18N_EN[k])return I18N_EN[k];const c=I18N.mem[k];if(c!=null)return c;return null}
function tr(s){if(LANG==='fr'||!s)return s;const str=String(s);const m=str.match(/^(\s*)([\s\S]*?)(\s*)$/);const core=m[2];if(!/[A-Za-zÀ-ÿ]{2}/.test(core))return str;const {k,nums}=i18nNorm(core);const t=trK(k);if(t!=null)return m[1]+i18nFill(t,nums)+m[3];if(!I18N_EN[k]&&/^[A-ZÀ-Ý][\wÀ-ÿ'’_-]{0,15}( ×#)?$/.test(k)&&!/[a-zà-ÿ]{3,}.* /.test(k))return str;i18nQueue(k);return str}
/* --- traducteur automatique (Google gratuit, puis traducteur intégré de Chrome) --- */
async function gtx(text,sl,tl){const u='https://translate.googleapis.com/translate_a/single?client=gtx&dt=t&sl='+sl+'&tl='+tl+'&q='+encodeURIComponent(text);const r=await fetch(u);if(!r.ok)throw new Error('gtx '+r.status);const j=await r.json();return{t:(j[0]||[]).map(x=>x&&x[0]||'').join(''),src:j[2]||sl}}
const CTR={};
async function chromeTr(text,sl,tl){if(!('Translator' in self))throw new Error('no');const key=sl+'>'+tl;if(!CTR[key]){const a=await Translator.availability({sourceLanguage:sl,targetLanguage:tl});if(a!=='available')throw new Error('na');CTR[key]=await Translator.create({sourceLanguage:sl,targetLanguage:tl})}return{t:await CTR[key].translate(text),src:sl}}
async function trText(text,sl,tl){try{return await gtx(text,sl,tl)}catch(e){if(sl==='auto')throw e;return await chromeTr(text,sl,tl)}}
function i18nQueue(k){if(I18N.q.has(k)||I18N.mem[k]!=null||I18N.fail.has(k))return;const en=I18N_EN[k];I18N.q.set(k,en?{x:en,sl:'en'}:{x:k,sl:'fr'});clearTimeout(I18N.t);I18N.t=setTimeout(i18nFlush,350)}
async function i18nFlush(){if(I18N.busy||!I18N.q.size||LANG==='fr')return;I18N.busy=true;const lang=LANG;let fails=0;
  try{while(I18N.q.size&&lang===LANG&&fails<3){const batch=[];let len=0,sl=null;for(const [k,o] of I18N.q){if(sl&&o.sl!==sl)continue;sl=o.sl;if(batch.length&&len+o.x.length>700)break;batch.push(k);len+=o.x.length+1}const src=batch.map(k=>I18N.q.get(k).x);
      batch.forEach(k=>I18N.q.delete(k));
      try{const {t}=await trText(src.join('\n'),sl,lang);let out=t.split('\n');
        if(out.length!==batch.length){out=[];for(const x of src){try{out.push((await trText(x,sl,lang)).t)}catch(e){out.push(null)}}}
        batch.forEach((k,i)=>{let v=out[i];if(v==null){I18N.fail.add(k);return}v=v.trim();if((v.match(/#/g)||[]).length!==(k.match(/#/g)||[]).length)v=k;I18N.mem[k]=v});i18nSave();i18nPass(document.body)}
      catch(e){fails++;batch.forEach(k=>I18N.fail.add(k));await new Promise(r=>setTimeout(r,1500))}}}
  finally{I18N.busy=false;if(I18N.q.size&&fails<3)setTimeout(i18nFlush,500)}}
/* --- ce qu'on ne traduit jamais : pseudos, messages des joueurs, champs de saisie --- */
const I18N_SKIP='script,style,textarea,input,select,svg,code,.nm,.msg .tx,.dmb,.xfcode,[data-noi18n],.trbtn';
function i18nNames(){const now=Date.now();if(now-I18N.nt<15000)return I18N.names;I18N.nt=now;const N=new Set();try{if(S.name)N.add(S.name);for(const p of Object.values(NET.players||{}))if(p&&p.n)N.add(p.n);for(const g of Object.values(NET.guilds||{}))if(g&&g.n)N.add(g.n);for(const r of (typeof realRows==='function'?realRows():[]))if(r&&r.n)N.add(r.n);for(const r of (typeof botRows==='function'?botRows():[]))if(r&&r.n)N.add(r.n)}catch(e){}I18N.names=N;return N}
function i18nNode(n){const p=n.parentElement;if(!p||p.closest(I18N_SKIP))return;const v=n.nodeValue;if(I18N.done.get(n)===v)return;
  if(!/[A-Za-zÀ-ÿ]{2}/.test(v)){return}
  const core=v.trim();if(i18nNames().has(core))return;
  const t=tr(v);if(t!==v){I18N.done.set(n,t);n.nodeValue=t}}
function i18nAttrs(el){for(const a of ['placeholder','aria-label','title']){const v=el.getAttribute&&el.getAttribute(a);if(!v||!/[A-Za-zÀ-ÿ]{2}/.test(v))continue;const k='i18n_'+a;if(el[k]===v)continue;const t=tr(v);if(t!==v){el[k]=t;el.setAttribute(a,t)}}}
function i18nPass(root){if(!root)return;if(LANG==='fr'){if(root.nodeType===1)i18nMsgBtns(root);return}try{
  if(root.nodeType===3){i18nNode(root);return}if(root.nodeType!==1)return;if(root.closest&&root.closest('svg,script,style'))return;
  const tw=document.createTreeWalker(root,NodeFilter.SHOW_TEXT);let n;const L=[];while(n=tw.nextNode())L.push(n);L.forEach(i18nNode);
  if(root.matches&&root.matches('[placeholder],[aria-label],[title]'))i18nAttrs(root);root.querySelectorAll&&root.querySelectorAll('[placeholder],[aria-label],[title]').forEach(i18nAttrs);
  i18nMsgBtns(root)}catch(e){console.warn('i18n',e)}}
let I18N_MO=null;
function i18nStart(){document.documentElement.lang=LANG;
  i18nLoad();i18nPass(document.body);
  if(!I18N_MO){I18N_MO=new MutationObserver(ms=>{for(const m of ms){if(LANG==='fr'){m.addedNodes.forEach(i18nPass);continue}if(m.type==='characterData')i18nNode(m.target);else if(m.type==='attributes')i18nAttrs(m.target);else m.addedNodes.forEach(i18nPass)}});
    I18N_MO.observe(document.body,{subtree:true,childList:true,characterData:true,attributes:true,attributeFilter:['placeholder','aria-label','title']})}}
/* boîtes de dialogue natives */
{const c=window.confirm.bind(window),a=window.alert.bind(window),p=window.prompt.bind(window);window.confirm=x=>c(tr(x));window.alert=x=>a(tr(x));window.prompt=(x,d)=>p(tr(x),d)}
/* --- bouton 🌐 pour traduire les messages des autres joueurs --- */
function i18nMsgBtns(root){if(!root||!root.querySelectorAll)return;
  root.querySelectorAll('.msg:not(.me):not(.sys) .tx, .dmb:not(.me):not(.typing) > span').forEach(el=>{if(el.dataset.trk)return;const x=el.textContent.trim();if(!x||!/\p{L}{2}/u.test(x))return;el.dataset.trk=x;
    const key=LANG+'|'+x;if(I18N.shown.has(key)&&I18N.mem['m:'+key]){el.dataset.tro=x;el.textContent=I18N.mem['m:'+key]}
    el.insertAdjacentHTML('afterend',`<button class="trbtn" data-a="trmsg" aria-label="Traduire">${I18N.shown.has(key)?'↩︎':'🌐'}</button>`)})}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-a="trmsg"]');if(!b)return;e.preventDefault();e.stopPropagation();const el=b.previousElementSibling;if(!el||!el.dataset.trk)return;
  const x=el.dataset.trk,key=LANG+'|'+x;
  if(el.dataset.tro){el.textContent=el.dataset.tro;delete el.dataset.tro;I18N.shown.delete(key);b.textContent='🌐';return}
  let t=I18N.mem['m:'+key];b.textContent='⏳';
  if(!t){try{const r=await trText(x,'auto',LANG);if(r.src===LANG){b.textContent='🌐';toast(tr('Ce message est déjà dans ta langue.'));return}t=r.t;I18N.mem['m:'+key]=t;i18nSave()}catch(er){b.textContent='🌐';toast(tr("La traduction n'est pas disponible pour le moment."));return}}
  el.dataset.tro=x;el.textContent=t;I18N.shown.add(key);b.textContent='↩︎'},true);
/* --- choix de la langue dans les paramètres --- */
function langPickHTML(){return`<div class="langbox" data-noi18n><div class="langh">🌐 Langue · Language</div><div class="langg">${LANGS.map(([c,f,n])=>`<button class="btn sm lgb${c===LANG?' on':''}" data-a="setlang" data-v="${c}">${f} ${n}</button>`).join('')}</div></div>`}
{const sm=settingsModal;settingsModal=function(){sm.apply(this,arguments);try{const m=document.querySelector('#ovl .modal');if(m&&!m.querySelector('.langbox')){const h=m.querySelector('.h');if(h)h.insertAdjacentHTML('afterend',langPickHTML());else m.insertAdjacentHTML('afterbegin',langPickHTML())}}catch(e){}}}
function langModal(){modal(`<div class="h">🌐 Choose your language</div>${langPickHTML()}`)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-a="setlang"]');if(!b)return;e.preventDefault();e.stopPropagation();const l=b.dataset.v;try{localStorage.setItem(LKEY,l)}catch(er){}
  if(l===LANG){closeModal();return}
  /* le plus simple et le plus propre : on sauvegarde et on recharge la page dans la nouvelle langue */
  try{save()}catch(er){}location.reload()},true);
/* premier lancement d'un joueur non francophone : on lui dit qu'il peut changer */
try{if(!langGet()){localStorage.setItem(LKEY,LANG);if(LANG!=='fr')setTimeout(()=>{try{const L=LANGS.find(x=>x[0]===LANG);toast(`🌐 ${L[1]} ${L[2]} · ⚙️`)}catch(e){}},4000)}}catch(e){}
i18nStart();
try{PATCH.unshift({v:30,d:'21 octobre 2026',t:'🌐 Le royaume parle toutes les langues',items:["🌐 <b>Choix de la langue</b> dans ⚙️ Paramètres : Français, English, Español, Deutsch, Italiano, Português, Nederlands, Polski, Türkçe, العربية. Le jeu choisit tout seul la langue de ton téléphone la première fois.","💬 <b>Traduire les messages</b> : touche 🌐 à côté d'un message du chat ou d'un message privé pour le lire dans ta langue (touche ↩︎ pour revenir au texte d'origine).","🤝 Le jeu s'ouvre aux joueurs du monde entier : invite tes amis étrangers !"]})}catch(e){}
