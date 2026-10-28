import re,os,zipfile
src=open('/home/claude/rde/index.html').read()
cg=open('/home/claude/w/cg/cg.js').read()
out=src
out=re.sub(r'<link rel="manifest"[^>]*>','',out,count=1)
out=re.sub(r"<script>window\.RDE_V='(\d+)';if\('serviceWorker'[^<]*</script>",r"",out,count=1)
assert 'serviceWorker' not in out[:20000]
out=out.replace('</head>','<script>window.RDE_CG=true;try{if(!localStorage.getItem(\'rde-lang\'))localStorage.setItem(\'rde-lang\',\'en\')}catch(e){}try{if(window.top===window&&!/[?&]cgdev\\b/.test(location.search))location.replace(\'../\')}catch(e){}</script><script src="https://sdk.crazygames.com/crazygames-sdk-v3.js"></script>\n</head>',1)
assert out.rstrip().endswith('</html>') or '</body>' in out
i=out.rfind('</body>')
out=(out[:i]+'<script>'+cg+'</script>'+out[i:]) if i>0 else out+'<script>'+cg+'</script>'
os.makedirs('/home/claude/w/cg/build',exist_ok=True)
open('/home/claude/w/cg/build/index.html','w').write(out)
with zipfile.ZipFile('/home/claude/w/cg/rde-crazygames.zip','w',zipfile.ZIP_DEFLATED) as z:z.write('/home/claude/w/cg/build/index.html','index.html');z.write('/home/claude/rde/version.json','version.json')
os.makedirs('/home/claude/rde/cg',exist_ok=True);open('/home/claude/rde/cg/index.html','w').write(out)
import shutil;shutil.copy('/home/claude/rde/version.json','/home/claude/rde/cg/version.json')
print('cg ok',len(out),os.path.getsize('/home/claude/w/cg/rde-crazygames.zip'))
