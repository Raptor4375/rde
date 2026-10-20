src=open('royaumes_v26.html').read()
main=src.index('</style>',src.index('/* Concept'))
src=src[:main]+open('v261.css').read()+src[main:]
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,open('v261.js').read()+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
