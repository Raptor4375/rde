src=open('royaumes_v262.html').read()
a="(function(){try{if(BOOT.done)return;if(auInit()&&AU.ctx){"
assert src.count(a)==1
src=src.replace(a,"(function(){try{if(true)return;if(auInit()&&AU.ctx){")
b="b.addEventListener('pointerdown',()=>btGo(),{capture:true});"
assert src.count(b)==1
src=src.replace(b,"['click','touchend','pointerup'].forEach(ev=>b.addEventListener(ev,()=>btGo(),{capture:true}));")
c='<small>🔊 avec la musique</small>'
assert src.count(c)==1
src=src.replace(c,'')
d="try{auUnlock();musicWant('boot')}catch(e){}"
assert src.count(d)==1
src=src.replace(d,"try{auUnlock();musicWant('boot');const c=AU.ctx;if(c){const kick=()=>{if(c.state==='running'){const P=AU.song;if(!P||P.k!=='boot'){AU.song=null;musicWant('boot')}}};if(c.state!=='running'){c.resume().then(kick).catch(()=>{});c.addEventListener('statechange',kick)}}}catch(e){}")
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
