src=open('royaumes_v231.html').read()
main=src.index('</style>',src.index('/* Concept'))
src=src[:main]+open('v24.css').read()+src[main:]
assert src.count('const GAME_V=23.1;')==1
src=src.replace('const GAME_V=23.1;','const GAME_V=24;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v24.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
