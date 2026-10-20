src=open('royaumes_v241.html').read()
assert src.count('const GAME_V=24.1;')==1
src=src.replace('const GAME_V=24.1;','const GAME_V=24.2;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v242.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
