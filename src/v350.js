/* ================= V36.7 : classement plus fluide + Tour réaliste ================= */
/* 1) la liste des bots n'est recalculée qu'une fois toutes les 1,5 s (avant : 4 fois par affichage) */
{const br=botRows;let c=null,ct=0,cg=null,cp=null;botRows=function(){const n=Date.now();if(!c||cg!==NET.guilds||cp!==NET.players||n-ct>1500){c=br.apply(this,arguments);cg=NET.guilds;cp=NET.players;ct=n}return c.map(r=>Object.assign({},r))}}
{const fr=freeRows;let c=null,ct=0,cp=null;freeRows=function(){const n=Date.now();if(!c||cp!==NET.players||n-ct>1500){c=fr.apply(this,arguments);cp=NET.players;ct=n}return c.map(r=>Object.assign({},r))}}
/* 2) Tour de l'Infini : après l'étage 80, la difficulté monte doucement (≈ +2 % par étage) au lieu d'exploser */
{const g0=twG;twG=function(f){return f<=80?g0(f):g0(80)*Math.pow(1.019,f-80)}}
/* puissance conseillée = mesurée sur de vrais combats simulés (≈ 80 % de victoires) */
const lerpT=(T,x)=>{if(x<=T[0][0])return T[0][1];for(let i=1;i<T.length;i++)if(x<=T[i][0]){const [a,va]=T[i-1],[b,vb]=T[i];return va*Math.pow(vb/va,(x-a)/(b-a))}const [a,va]=T[T.length-2],[b,vb]=T[T.length-1];return vb*Math.pow(vb/va,(x-b)/(b-a))};
const TWT=[[1,900],[20,5000],[40,11000],[60,22000],[70,42000],[80,72000],[90,76000],[100,86000],[110,118000],[120,140000],[135,165000],[150,213000],[175,328000],[200,580000]];
const twRecOld=twRec;TWE.clear();twEst=function(p){const k=(p.id||p.n)+':'+Math.round(p.pw/400);if(TWE.has(k))return TWE.get(k);const h=(roseH(p.id||p.n)%1000)/1000,target=p.pw*(.7+.55*h);let lo=0,hi=400;while(lo<hi){const m=(lo+hi+1)>>1;if(twRecOld(m)<=target)lo=m;else hi=m-1}TWE.set(k,lo);return lo};
twRec=function(f){return Math.round(lerpT(TWT,f)*1.25/1000)*1000};
const NMT=[[1,24000],[25,45000],[50,80000],[75,92000],[90,118000],[100,128000]];
function nRecD(n){return Math.round(lerpT(NMT,n)*1.25/1000)*1000}
try{const P=PATCH.find(x=>x.v===36.1)||PATCH[0];if(P)P.items.push("🗼 <b>Tour de l'Infini</b> : après l'étage 80, la difficulté monte doucement au lieu d'exploser. La <b>puissance conseillée</b> (Tour et mode Normal) est maintenant mesurée sur de vrais combats : elle correspond enfin à ce qu'il faut vraiment.","⚡ Le classement s'ouvre plus vite.")}catch(e){}
