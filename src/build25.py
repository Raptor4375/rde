src=open('royaumes_v243.html').read()
main=src.index('</style>',src.index('/* Concept'))
src=src[:main]+open('v25.css').read()+src[main:]
assert src.count('const GAME_V=24.3;')==1
src=src.replace('const GAME_V=24.3;','const GAME_V=25;')
x="c:450,cur:'m',lim:1,give:()=>{S.ush"
assert src.count(x)==1
src=src.replace(x,"c:900,cur:'m',lim:1,give:()=>{S.ush")
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v25.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
