src=open('royaumes_v23.html').read()
sk='[hidden]:not([hidden=until-found i]){display:none!important}'
a=src.index(sk)+len(sk);b=src.index('</style>',a)
moved=src[a:b];src=src[:a]+src[b:]
assert '/* ================= V20' in moved and len(moved)>15000
main=src.index('</style>',src.index('/* Concept'))
src=src[:main]+moved+open('v231.css').read()+src[main:]
assert src.count('const GAME_V=23;')==1
src=src.replace('const GAME_V=23;','const GAME_V=23.1;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
x="if(Math.random()<(pers==='timide'?.15:.05))return;"
assert src.count(x)==1
src=src.replace(x,'')
src=src.replace(m,open('v231.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
