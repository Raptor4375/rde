src=open('royaumes_v21.html').read()
css=open('v22.css').read();js=open('v22.js').read()
i=src.index('</style>');src=src[:i]+css+src[i:]
assert src.count('const GAME_V=21;')==1
src=src.replace('const GAME_V=21;','const GAME_V=22;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,js+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
