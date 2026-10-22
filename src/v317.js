
/* ================= Marché d'Halloween : renouvelé chaque jour + éclats d'ultra ================= */
HWS.push({k:'ush',n:"25 éclats d'ultra-évolution",d:"De quoi ultra-évoluer un légendaire ★★★.",c:40000,lim:1,ic:'🌟',give:()=>{S.ush=(S.ush||0)+25}});
{const it=HWS.find(x=>x.k==='leg');if(it)it.ic='👑'}
{const ev=EV;EV=function(){const E=ev.apply(this,arguments);try{const d=today();if(E.shopD!==d){const keep={};if(E.shop&&E.shop.frame)keep.frame=E.shop.frame;E.shop=keep;E.shopD=d}}catch(e){}return E}}
{const hs=hwShop;hwShop=function(){return hs.apply(this,arguments)+`<p class="muted" style="font-size:12.5px;margin:8px 0 0;text-align:center">🔄 Le marché se renouvelle <b>chaque jour à minuit</b> (sauf le cadre).</p>`}}
try{const P=PATCH.find(x=>x.v===30);if(P)P.items.push("🎃 <b>Marché d'Halloween</b> : il se renouvelle maintenant chaque jour à minuit, et propose un pack de <b>25 éclats d'ultra-évolution</b> (40 000 bonbons).")}catch(e){}
