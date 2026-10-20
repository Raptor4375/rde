src=open('royaumes_v25.html').read()
main=src.index('</style>',src.index('/* Concept'))
src=src[:main]+open('v26.css').read()+src[main:]
assert src.count('const GAME_V=25;')==1
src=src.replace('const GAME_V=25;','const GAME_V=26;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v26.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
