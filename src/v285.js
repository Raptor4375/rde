/* ================= tchat : le brouillon n'est plus effacé (emojis, clavier, mises à jour du jeu) ================= */
const DRAFT={},DFR={p:false,ua:0,lt:0};
function chatIn(el){return!!(el&&el.tagName==='INPUT'&&el.type==='text'||el&&el.tagName==='INPUT'&&!el.type)&&!!el.closest('form.chatf,form[data-f="say"],form[data-f="wsay"],form[data-f="dmsay"],form[data-f="capmsg"]')}
function dKey(el){const f=el.closest('form');return(f&&f.dataset.f||'')+'|'+(el.id||'')+'|'+(f&&f.dataset.f==='dmsay'?UI.dmk||'':'')}
function chatInputs(){return[...document.querySelectorAll('form input')].filter(chatIn)}
document.addEventListener('input',e=>{const el=e.target;if(chatIn(el)){DRAFT[dKey(el)]=el.value;DFR.lt=Date.now()}},true);
document.addEventListener('compositionupdate',e=>{if(chatIn(e.target))DFR.lt=Date.now()},true);
window.addEventListener('submit',e=>{const f=e.target;if(!f||!f.querySelectorAll)return;f.querySelectorAll('input').forEach(el=>{if(chatIn(el))delete DRAFT[dKey(el)]});DFR.ua=Date.now()},true);
window.addEventListener('pointerdown',()=>{DFR.ua=Date.now()},true);
window.addEventListener('keydown',e=>{if(e.key==='Enter')DFR.ua=Date.now()},true);
document.addEventListener('click',e=>{const t=e.target.closest('[data-a="emo"]');if(!t)return;setTimeout(()=>{const i=document.getElementById(t.dataset.f);if(i&&chatIn(i)){DRAFT[dKey(i)]=i.value;DFR.lt=Date.now()}},0)},false);
function draftBusy(){if(B)return false;if(Date.now()-DFR.ua<700)return false;const a=document.activeElement;if(chatIn(a))return true;
  if([...document.querySelectorAll('.emobar')].some(x=>!x.hidden))return true;
  if(Date.now()-DFR.lt<25000&&chatInputs().some(i=>i.value.trim()))return true;return false}
function draftRestore(){for(const el of chatInputs()){const v=DRAFT[dKey(el)];if(v&&!el.value)el.value=v}}
{const r3=render;render=function(){if(draftBusy()){DFR.p=true;return}DFR.p=false;const out=r3.apply(this,arguments);try{draftRestore()}catch(e){}return out}}
setInterval(()=>{try{if(DFR.p&&!draftBusy()){render()}}catch(e){}},1500);
document.addEventListener('focusout',e=>{if(chatIn(e.target))setTimeout(()=>{try{if(DFR.p&&!draftBusy())render()}catch(er){}},150)},true);
