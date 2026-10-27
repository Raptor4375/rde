import json,re,time,os
src=open('/home/claude/w/prod.html').read()
shim=open('/home/claude/w/app/shim.js').read()
head0='<!doctype html><html><head><meta charset=utf8><meta name=viewport content="width=device-width,initial-scale=1,viewport-fit=cover"></head><body>'
assert src.startswith(head0),src[:200]
V=time.strftime('%Y%m%d%H%M%S')
head=f'''<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="theme-color" content="#1a0a3a"><meta name="apple-mobile-web-app-capable" content="yes"><meta name="mobile-web-app-capable" content="yes"><meta name="apple-mobile-web-app-status-bar-style" content="black-translucent"><meta name="apple-mobile-web-app-title" content="RDE">
<meta name="description" content="Royaumes d'Éther : le jeu d'aventure et d'invocation, avec tes amis.">
<meta property="og:type" content="website"><meta property="og:site_name" content="Royaumes d'Éther"><meta property="og:title" content="Royaumes d'Éther · Invoque, combats, guildes">
<meta property="og:description" content="Un jeu d'invocation gratuit à jouer avec tes amis : plus de 60 héros, un héros mythique, un mode histoire, des guildes, un casino et un boss mondial. Sur téléphone et ordinateur, sans téléchargement.">
<meta property="og:image" content="https://raptor4375.github.io/rde/og.png"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:url" content="https://raptor4375.github.io/rde/">
<meta name="twitter:card" content="summary_large_image"><meta name="twitter:image" content="https://raptor4375.github.io/rde/og.png">
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

import subprocess;subprocess.run(['python3','/home/claude/w/app/buildcg.py'])
subprocess.run(['python3','/home/claude/w/app/buildng.py'])

# version de test (hors ligne, sauvegarde séparée) : /rde/test/
t=open('/home/claude/w/royaumes.html').read()
assert t.count("const KEY='royaumes-ether-v1'")==1
t=t.replace("const KEY='royaumes-ether-v1'","const KEY='royaumes-ether-TEST'").replace('<head>','<head><script>window.RDE_SKTEST=true;window.TUTO_OFF=false;</script>',1)
TU=r'''<script>setTimeout(function(){try{const P=PASS();if(!P.pro||P.xp<PCUM[60]){P.pro=true;P.prem=true;P.xp=Math.max(P.xp,NEWP(P.s)?PCUM[60]:pLV(P.s)*pXPL(P.s));save()}}catch(e){}try{if(S.tstAll)return;S.tstAll=1;
for(const h of HEROES){if(h.i>=200)continue;S.heroes[h.i]={l:100,e:3,f:0,u:h.r>=4?3:0,aw:h.r===4?10:0}}
S.gems=999999;S.gold=99999999;S.shards=999;S.ush=999;INV().pt=500;
for(const s of NSEAS){unlockFrameQ(s.k);ptGive(s.tk)}for(const sk in SEASON_COS)for(const t in SEASON_COS[sk])cosGive(t,SEASON_COS[sk][t][1]);
S.skinEq={65:'dk_cendres'};S.nfx='cendres';S.pbg='cendres';skRefresh(65);
try{const P=PASS();P.pro=true;P.prem=true;P.xp=Math.max(P.xp,PCUM[60])}catch(e){}
S.tuto=S.tuto||2;S.team=[65,56,61,62,67].filter(i=>S.heroes[i]);TPX.t=0;save();render();toast('🧪 Tout est débloqué (version de test)')}catch(e){console.warn(e)}},2500)</script>'''
t=t.replace('</body>',TU+'</body>',1)
os.makedirs(D+'/test',exist_ok=True);open(D+'/test/index.html','w').write(t);print('test ok')
