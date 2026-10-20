src=open('royaumes_v24.html').read()
assert src.count('const GAME_V=24;')==1
src=src.replace('const GAME_V=24;','const GAME_V=24.1;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v241.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
