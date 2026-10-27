src=open('royaumes_v263pub.html').read()
css=open('v263.css').read()+open('v267.css').read()+open('v268.css').read()+open('v271.css').read()+open('v272.css').read()+open('v273.css').read()+open('v278.css').read()+open('v279.css').read()+open('v280.css').read()+open('v281.css').read()+open('v282.css').read()+open('v283.css').read()+open('v286.css').read()+open('v290.css').read()+open('v298.css').read()+open('v300.css').read()+open('v301.css').read()+open('v302.css').read()+open('v303.css').read()+open('v304.css').read()+open('v305.css').read()+open('v309.css').read()+open('v311.css').read()+open('v322.css').read()+open('v323.css').read()+open('v330.css').read()+open('v331.css').read()+open('v332.css').read()+open('v333.css').read()+open('v336.css').read()+open('v337.css').read()+open('v339.css').read()+open('v340.css').read()+open('v342.css').read();js=open('v263.js').read()+open('v264.js').read()+open('v265.js').read()+open('v266.js').read()+open('v267.js').read()+open('v267b.js').read()+open('v268.js').read()+open('v269.js').read()+open('v270.js').read()+open('v271.js').read()+open('v272.js').read()+open('v273.js').read()+open('v274.js').read()+open('v275.js').read()+open('v276.js').read()+open('v277.js').read()+open('v278.js').read()+open('v279.js').read()+open('v280.js').read()+open('v281.js').read()+open('v282.js').read()+open('v283.js').read()+open('v284.js').read()+open('v285.js').read()+open('v286.js').read()+open('v287.js').read()+open('v288.js').read()+open('v289.js').read()+open('v293.js').read()+open('v290.js').read()+open('v291.js').read()+open('v292.js').read()+open('v295.js').read()+open('v296.js').read()+open('v297.js').read()+open('v298.js').read()+open('v299.js').read()+open('v294.js').read()+open('v300.js').read()+open('v301.js').read()+open('v302.js').read()+open('v303.js').read()+open('v304.js').read()+open('v305.js').read()+open('v306.js').read()+open('v307.js').read()+open('v308.js').read()+open('v309.js').read()+open('v310.js').read()+open('v311d.js').read()+open('v311.js').read()+open('v312.js').read()+open('v313.js').read()+open('v314.js').read()+open('v315.js').read()+open('v316.js').read()+open('v317.js').read()+open('v318.js').read()+open('v319.js').read()+open('v320.js').read()+open('v321.js').read()+open('v322.js').read()+open('v323.js').read()+open('v324.js').read()+open('v325.js').read()+open('v326.js').read()+open('v327.js').read()+open('v328.js').read()+open('v329.js').read()+open('v330.js').read()+open('v331.js').read()+open('v333.js').read()+open('v334.js').read()+open('v335.js').read()+open('v336.js').read()+open('v337.js').read()+open('v338.js').read()+open('v339.js').read()+open('v340.js').read()+open('v341.js').read()+open('v342.js').read()+open('v343.js').read()+open('v344.js').read()+open('v345.js').read()
i=src.index('</style>',src.index('/* Concept'));src=src[:i]+css+src[i:]
assert src.count('const GAME_V=26;')==1;src=src.replace('const GAME_V=26;','const GAME_V=36;')
for a,b in [('const passIdx=','let passIdx='),('const passSeason=','let passSeason='),('const passLvl=','let passLvl='),('const passBonusN=','let passBonusN='),('const passEndAt=','let passStartAt=i=>PASS_EPOCH+(i-1)*PASS_LEN;let passEndAt=')]:
  assert src.count(a)==1,a;src=src.replace(a,b)
assert src.count('st=PASS_EPOCH+(i-1)*PASS_LEN')==2;src=src.replace('st=PASS_EPOCH+(i-1)*PASS_LEN','st=passStartAt(i)')
a="(function(){let n=0,g=null;const tick=()=>{if(BOOT.done)return;try{"
assert src.count(a)==1;src=src.replace(a,"(function(){let n=0,g=null;const tick=()=>{if(true)return;try{")
m='/* ================= DÉMARRAGE ================= */';assert src.count(m)==1;src=src.replace(m,js+'\n'+m)
x='écris @pseudo pour mentionner</span></div>';assert src.count(x)==1;src=src.replace(x,x+'<div class="clban">🤖 <b>Claude</b>, une IA, joue aussi dans le royaume. Écris <b>@Claude</b> pour lui poser une question !</div>')
a='AV_END=new Date(2026,9,22,13,0).getTime()';assert src.count(a)==1;src=src.replace(a,'AV_END=new Date(2026,9,18,13,0).getTime()')
a='AV_HIDE=new Date(2026,9,26,0,0).getTime()';assert src.count(a)==1;src=src.replace(a,'AV_HIDE=new Date(2099,0,1,0,0).getTime()')
print('7j',src.count('7 jours'));src=src.replace('7 jours','3 jours')
a='{p:10000,t:"2 éclats';assert src.count(a)==1;src=src.replace(a,'{p:8000,t:"2 éclats')
a='const k=.5+.045*n,foes=stageFoes(s)';assert src.count(a)==1;src=src.replace(a,'const k=.8+.06*n,foes=stageFoes(s)')
a="p.pw>me*.6&&p.pw<me*1.35&&avRowFac(p)===AVF[f].foe);return cand.length?pick(cand.slice(0,30)):null}"
assert src.count(a)==1;src=src.replace(a,"p.pw>me*.9&&p.pw<me*1.5&&avRowFac(p)===AVF[f].foe);if(cand.length)return pick(cand.slice(0,30));const c2=rankList('pw').filter(p=>!p.me&&!p.real&&p.pw>me*.6&&avRowFac(p)===AVF[f].foe);return c2.length?c2[c2.length-1]:null}")
a="fx=clamp(o.pw/base*(isCap?1.2:1),.6,3)";assert src.count(a)==1;src=src.replace(a,"fx=clamp(o.pw/base*(isCap?1.4:1.15),.8,3.5)")
a='const k=.8+.06*n,foes';assert src.count(a)==1;src=src.replace(a,'const k=1+.08*n,foes')
a="(isCap?1.4:1.15),.8,3.5)";assert src.count(a)==1;src=src.replace(a,"(isCap?1.7:1.4),1,4.5)")
RP=[("render();window.scrollTo(0,0);setTimeout(()=>{const i=$('#dmsay');if(i)i.focus()},60)}","render();window.scrollTo(0,0)}",1),
 ("if(n&&TAB!=='guilde'&&!B&&!$('#ovl').innerHTML)render()","if(n&&TAB!=='guilde'&&!B&&!$('#ovl').innerHTML&&!chatBusy())render()",1),
 ("if(ni&&sf)ni.focus()","if(ni&&sf&&recentType())ni.focus()",1),("if(nw&&wf)nw.focus()","if(nw&&wf&&recentType())nw.focus()",1),("if(v)j.value=v;if(f)j.focus()","if(v)j.value=v;if(f&&recentType())j.focus()",1),
 ('aria-label="Profil de ${esc(p.n)}">${portrait(h)}','aria-label="Profil de ${esc(p.n)}">${portraitFor(p,h)}',1),
 ('crit:c.crit,port:portrait(h),dmg:0}}','crit:c.crit,port:portraitAt(h,t.u||0),dmg:0}}',1),
 ('aria-label="Profil">${portrait(h)}','aria-label="Profil">${portraitFor(o,h)}',1),
 ('${portrait(HEROES[t.id])}<i>${t.l}</i>','${portraitAt(HEROES[t.id],t.u||0)}<i>${t.l}</i>',1),
 ('!isBot?realAv(m.w,hid):portrait(HEROES[hid])','!isBot?realAv(m.w,hid):portraitFor(rowOfBid(m.w.slice(2)),HEROES[hid])',2),
 ('return portrait(HEROES[teamHid(p)]||HEROES[0])}','return portraitFor(p,HEROES[teamHid(p)]||HEROES[0])}',1),
 ('portrait(h||HEROES[teamHid(p)]||HEROES[0','portraitFor(p,h||HEROES[teamHid(p)]||HEROES[0',1),
 ('<div class="pt">${portrait(h)}</div><div class="pl">Nv ${t.l}','<div class="pt">${portraitFor(me?{me:1}:p,h,t)}</div><div class="pl">Nv ${t.l}',2)]
RP+=[("function avSkyBattle(){const fig=","function avSkyBattleWar(){const fig=",1),
 ("const BT_CEL=[[64,0],[61,0],[50,0]],BT_OBS=[[62,0],[48,0],[43,0]];","const BT_CEL=(()=>{const P=[64,61,50,45,57,59,63,44,54,41,46,52].sort(()=>Math.random()-.5).slice(0,3);return P.map(i=>[i,i>=56&&i<=66&&Math.random()<.5?1+Math.floor(Math.random()*3):0])})(),BT_OBS=(()=>{const P=[62,48,43,42,47,58,65,66,51,55,60,53].sort(()=>Math.random()-.5).slice(0,3);return P.map(i=>[i,i>=56&&i<=66&&Math.random()<.5?1+Math.floor(Math.random()*3):0])})();",1),
 ('<div class="b2div"></div>','<svg class="b2cap" viewBox="-60 -110 120 130" aria-hidden="true"><path d="M-52 14Q-40 30 0 34Q40 30 52 14Z" fill="#8a7a9a"/><rect x="-48" y="2" width="96" height="14" fill="#efe6f8"/><rect x="-39" y="-24" width="10" height="30" fill="#efe6f8"/><path d="M-41 -24L-34 -36L-27 -24Z" fill="#ffd84a"/><rect x="29" y="-24" width="10" height="30" fill="#efe6f8"/><path d="M27 -24L34 -36L41 -24Z" fill="#ffd84a"/><rect x="-24" y="-42" width="12" height="44" fill="#efe6f8"/><path d="M-26 -42L-18 -58L-10 -42Z" fill="#c03aff"/><rect x="12" y="-42" width="12" height="44" fill="#efe6f8"/><path d="M10 -42L18 -58L26 -42Z" fill="#c03aff"/><rect x="-8" y="-64" width="16" height="66" fill="#fff8f0"/><path d="M-10 -64L0 -86L10 -64Z" fill="#ffd84a"/><path d="M0 -86v-10l9 3l-9 3" fill="#ffd84a"/><ellipse cx="-40" cy="22" rx="24" ry="7" fill="#fff"/><ellipse cx="38" cy="24" rx="26" ry="7" fill="#fff"/></svg><div class="b2div"></div>',1),
 ('Les Célestes défendent les portes du royaume…',"La Capitale d’Éther attend ses héros…",2)]
RP+=[("H('Gaïa Mère-Racine','Soutien',4,'Renaissance','team',{revive:1,healall:150});","H('Gaïa Mère-Racine','Soutien',4,'Renaissance','team',{revive:1,healall:240,shield:60});",1)]
RP+=[("${best>=4?'g':best>=3?'p':''}","${best>=5?'g m':best>=4?'g':best>=3?'p':''}",1),
 ("if(r===4)smSnd('rumble');await smSleep(r===4?850:420)","if(r>=4)smSnd('rumble');await smSleep(r>=4?850:420)",1),
 ("if(r===4){await smLegend(el,c,x)}","if(r===5){await smMythic(el,c,x)}else if(r===4){await smLegend(el,c,x)}",1),
 ("['all',0,1,2,3,4].map(r=>","['all',0,1,2,3,4,5].map(r=>",2),
 ("[79,83,86,88,91][r]","[79,83,86,88,91,96][r]",1)]
for a,c,n in RP:
  assert src.count(a)==n,(a,src.count(a));src=src.replace(a,c)
import re
n1=len(re.findall(r'(?<!filter\(h=>)\bh\.r===4',src));src=re.sub(r'(?<!filter\(h=>)\bh\.r===4','h.r>=4',src)
n2=src.count('].r===4');src=src.replace('].r===4','].r>=4');n3=src.count('h.r!==4');src=src.replace('h.r!==4','h.r<4');print('rar',n1,n2,n3)
open('royaumes.html','w').write(src)
open('chk.js','w').write(src[src.index('<script>')+8:src.rindex('</script>')])
a=src.index('<style>');b=src.index('</style>')+8;open('prod.html','w').write(src[:a]+src[b:])
