import json,re,time,os
src=open('/home/claude/w/prod.html').read()
shim=open('/home/claude/w/app/shim.js').read()
head0='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'
assert src.startswith(head0),src[:200]
V=time.strftime('%Y%m%d%H%M%S')
head=f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1a0a3a"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="RDE">
<meta name="description" content="Royaumes d'Éther : le jeu d'aventure et d'invocation, avec tes amis.">
<link rel="manifest" href="manifest.webmanifest"><link rel="icon" href="icons/icon-192.png"><link rel="apple-touch-icon" href="icons/icon-180.png">
<style>html,body{{background:#0b0819}}</style>
<script>{shim}</script>
<script>window.RDE_V='{V}';if('serviceWorker' in navigator)addEventListener('load',()=>navigator.serviceWorker.register('sw.js').catch(()=>{{}}));</script>
</head><body>'''
out=head+src[len(head0):]
a='NET.pid=NET.uid||localPid();';assert out.count(a)==1;out=out.replace(a,'NET.pid=(S.opid)||NET.uid||localPid();')
out=out.replace('<title>Royaumes d\'Éther</title>','<title>RDE · Royaumes d\'Éther</title>',1)
out=re.sub(r'<div class="clban">.*?</div>','',out,count=1)
D='/home/claude/rde'
open(D+'/index.html','w').write(out)
json.dump({"name":"Royaumes d'Éther","short_name":"RDE","description":"Le jeu d'aventure et d'invocation, avec tes amis.","start_url":"./","scope":"./","display":"standalone","orientation":"portrait","background_color":"#0b0819","theme_color":"#1a0a3a","lang":"fr",
 "icons":[{"src":"icons/icon-192.png","sizes":"192x192","type":"image/png"},{"src":"icons/icon-512.png","sizes":"512x512","type":"image/png"},{"src":"icons/icon-512.png","sizes":"512x512","type":"image/png","purpose":"maskable"}]},open(D+'/manifest.webmanifest','w'),ensure_ascii=False,indent=1)
open(D+'/sw.js','w').write(f"""// RDE : mode hors-ligne. Version {V}
const C='rde-{V}';
self.addEventListener('install',e=>{{self.skipWaiting();e.waitUntil(caches.open(C).then(c=>c.addAll(['./','index.html','manifest.webmanifest','icons/icon-192.png','icons/icon-512.png'])).catch(()=>{{}}))}});
self.addEventListener('activate',e=>{{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))}});
self.addEventListener('fetch',e=>{{const r=e.request;if(r.method!=='GET')return;const u=new URL(r.url);if(u.origin!==location.origin)return;
  e.respondWith(fetch(r,{{cache:'no-cache'}}).then(res=>{{const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{{}});return res}}).catch(()=>caches.match(r).then(m=>m||caches.match('index.html'))))}});
""")
open(D+'/version.json','w').write(json.dumps({'v':V}))
print('app ok',len(out),V)
