/* ================= V36.9 : l'effet de pseudo ne s'applique plus à toute la ligne ================= */
nfxPaint=function(){try{document.querySelectorAll('[data-a="prof"]').forEach(b=>{const k=nfxOf(b.dataset.v);
    const big=b.children.length>1||b.classList.contains('rk');const t=big?(b.querySelector('.who b')||b.querySelector('b')):b;
    if(big&&b.classList.contains('nfxn')){b.className=b.className.replace(/\bnfx-\w+/g,'').replace(/\bnfxn\b/g,'').trim()}
    if(!t)return;const cur=t.dataset.nfx||'';if(k===cur)return;if(cur)t.classList.remove('nfx-'+cur,'nfxn');if(k)t.classList.add('nfx-'+k,'nfxn');t.dataset.nfx=k});
  const pw=document.getElementById('pw');if(pw){const k=nfxOf('me');pw.classList.toggle('nfxn',!!k);pw.className=pw.className.replace(/\bnfx-\w+/g,'').trim()+(k?' nfx-'+k:'')}}catch(e){}};
try{nfxPaint()}catch(e){}
