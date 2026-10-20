src=open('royaumes_v242.html').read()
assert src.count('const GAME_V=24.2;')==1
src=src.replace('const GAME_V=24.2;','const GAME_V=24.3;')
x='a vaincu ${WORLDS[w-1].b} en mode Normal'
assert src.count(x)==1
src=src.replace(x,'a vaincu ${(typeof NWORLDS!=="undefined"?NWORLDS[w-1].b[0]:WORLDS[w-1].b)} en mode Normal')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v243.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
