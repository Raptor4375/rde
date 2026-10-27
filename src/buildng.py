import re,os,zipfile,shutil
src=open('/home/claude/rde/index.html').read()
out=re.sub(r'<link rel="manifest"[^>]*>','',src,count=1)
out=re.sub(r"<script>window\.RDE_V='(\d+)';if\('serviceWorker'[^<]*</script>",r"",out,count=1)
assert 'serviceWorker' not in out[:20000]
out=out.replace('</head>','<script>window.RDE_CG=true;window.RDE_NG=true;</script>\n</head>',1)
d='/home/claude/w/ng/build';os.makedirs(d,exist_ok=True)
open(d+'/index.html','w').write(out);shutil.copy('/home/claude/rde/version.json',d+'/version.json')
z='/home/claude/w/ng/realms-newgrounds.zip'
with zipfile.ZipFile(z,'w',zipfile.ZIP_DEFLATED) as f:f.write(d+'/index.html','index.html');f.write(d+'/version.json','version.json')
print('ng ok',len(out),os.path.getsize(z))
