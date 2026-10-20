import os
src=open('royaumes_v20.html').read()
css=open('v21.css').read() if os.path.exists('v21.css') else ''
js=''.join(open(f).read()+'\n' for f in ['v21a.js','v21c.js','v21b.js'] if os.path.exists(f))
i=src.index('</style>');src=src[:i]+css+src[i:]
fl='<link href="https://fonts.googleapis.com/css2?family=Lilita+One&family=Nunito:wght@400;600;700;800;900&display=swap" rel="stylesheet">'
assert src.count(fl)==1
src=src.replace(fl,fl+'\n<link href="https://fonts.googleapis.com/css2?family=IM+Fell+French+Canon:ital@0;1&family=MedievalSharp&display=swap" rel="stylesheet">')
assert src.count('const GAME_V=20;')==1
src=src.replace('const GAME_V=20;','const GAME_V=21;')
m='/* ================= DÉMARRAGE ================= */'
assert src.count(m)==1
src=src.replace(m,js+'\n'+m)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
