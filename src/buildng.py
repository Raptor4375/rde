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
# copie en ligne (se met à jour à chaque déploiement) : /rde/ng/
os.makedirs('/home/claude/rde/ng',exist_ok=True);shutil.copy(d+'/index.html','/home/claude/rde/ng/index.html');shutil.copy(d+'/version.json','/home/claude/rde/ng/version.json')
L='''<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><title>Realms of Ether</title>
<style>html,body{margin:0;height:100%;background:#0b0819;overflow:hidden}iframe{border:0;width:100%;height:100%;display:block}</style></head>
<body><iframe src="https://raptor4375.github.io/rde/ng/" allow="autoplay; fullscreen; clipboard-write; web-share" allowfullscreen></iframe></body></html>'''
z2='/home/claude/w/ng/realms-newgrounds-auto.zip'
with zipfile.ZipFile(z2,'w',zipfile.ZIP_DEFLATED) as f:f.writestr('index.html',L)
print('ng auto ok')
