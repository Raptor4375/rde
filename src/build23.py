src=open('royaumes_v22.html').read()
css=open('v23.css').read();js=open('v23.js').read()
i=src.index('</style>');src=src[:i]+css+src[i:]
assert src.count('const GAME_V=22;')==1
src=src.replace('const GAME_V=22;','const GAME_V=23;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,js+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
