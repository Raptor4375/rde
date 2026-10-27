/* ================= V37.2 : plus de français qui clignote avant la traduction ================= */
try{Object.assign(I18N_EN,{"🔑 J'ai déjà un compte (code de compte)":"🔑 I already have an account (account code)","En jouant, tu acceptes notre":"By playing, you accept our","politique de confidentialité":"privacy policy","Touche pour continuer ▸":"Tap to continue ▸","Touche pour continuer":"Tap to continue"})}catch(e){}
/* un texte pas encore traduit reste invisible le temps que la traduction arrive (1,5 s max), au lieu d'apparaître en français */
const I18W=new Set();
function i18wClear(all){for(const el of [...I18W]){if(all||!el.isConnected||Date.now()-(el._i18w||0)>1500){el.classList.remove('i18w');I18W.delete(el)}}}
{const nd=i18nNode;i18nNode=function(n){const r=nd.apply(this,arguments);try{if(LANG!=='fr'){const p=n.parentElement;const v=(n.nodeValue||'').trim();if(p&&v&&/[A-Za-zÀ-ÿ]{2}/.test(v)&&!p.closest(I18N_SKIP)){const {k}=i18nNorm(v);if(I18N.q.has(k)&&!p.classList.contains('i18w')){p.classList.add('i18w');p._i18w=Date.now();I18W.add(p)}}}}catch(e){}return r}}
{const fl=i18nFlush;i18nFlush=async function(){try{return await fl.apply(this,arguments)}finally{try{i18nPass(document.body)}catch(e){}i18wClear(true)}}}
setInterval(()=>i18wClear(false),500);
