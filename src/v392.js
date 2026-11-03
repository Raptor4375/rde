
/* ================= BOUTIQUE D'APPARENCES · CATALOGUE PAR RARETÉ · BONUS DE STATS =================
   Des apparences pour tous les légendaires et les deux mythiques, de la commune à la légendaire.
   · Commune    : un nouveau jeu de couleurs. Aucun bonus.
   · Rare       : couleurs + petits effets. +2 % de PV, ATQ et DÉF quand elle est portée.
   · Épique     : couleurs, décor et effets animés. +5 % de PV, ATQ et DÉF.
   · Légendaire : un dessin entièrement refait. +10 % de PV, ATQ et DÉF, et +3 VIT.
   Les apparences du Pass restent des exclusivités : elles ne sont jamais vendues en boutique.
   Le dessin d'une apparence part du dessin du héros (toutes ses formes ultra) : ses dégradés sont renommés
   pour ne pas se mélanger avec ceux du héros, puis ses couleurs sont changées teinte par teinte (la peau est protégée),
   et les effets (particules, décor) sont posés devant ou derrière. Les légendaires ont leur propre dessin (v393+). */
(function(){try{
if(typeof SKINS==='undefined'||typeof HEROES==='undefined'||!window.LK)return;
const R1=v=>Math.round(v*10)/10;
/* ---------- raretés : nom, couleur, prix, bonus ---------- */
const SKR={c:{n:'Commune',t:'COMMUNE',c:'#aab3bb',p:300,b:0},r:{n:'Rare',t:'RARE',c:'#4da3ff',p:1000,b:.02},e:{n:'Épique',t:'ÉPIQUE',c:'#ff8f3f',p:2500,b:.05},l:{n:'Légendaire',t:'LÉGENDAIRE',c:'#ffd84a',p:8000,b:.10,spd:3}};
const RORD=['l','e','r','c'];
/* ---------- couleurs ---------- */
const hx6=c=>{c=c.slice(1).toLowerCase();return c.length===3?c[0]+c[0]+c[1]+c[1]+c[2]+c[2]:c};
function toHsl(c){const r=parseInt(c.slice(0,2),16)/255,g=parseInt(c.slice(2,4),16)/255,b=parseInt(c.slice(4,6),16)/255;const mx=Math.max(r,g,b),mn=Math.min(r,g,b),l=(mx+mn)/2;let h=0,s=0;
  if(mx!==mn){const d=mx-mn;s=l>.5?d/(2-mx-mn):d/(mx+mn);h=(mx===r?(g-b)/d+(g<b?6:0):mx===g?(b-r)/d+2:(r-g)/d+4)*60}return[h,s,l]}
/* sortie en MAJUSCULES : le dessin de base n'en a aucune, donc une couleur déjà changée n'est jamais rechangée */
function toHex(h,s,l){h=((h%360)+360)%360;s=s<0?0:s>1?1:s;l=l<0?0:l>1?1:l;const c=(1-Math.abs(2*l-1))*s,x=c*(1-Math.abs((h/60)%2-1)),m=l-c/2;
  const[r,g,b]=h<60?[c,x,0]:h<120?[x,c,0]:h<180?[0,c,x]:h<240?[0,x,c]:h<300?[x,0,c]:[c,0,x];const t=v=>Math.round((v+m)*255).toString(16).padStart(2,'0');return('#'+t(r)+t(g)+t(b)).toUpperCase()}
const isSkin=(h,s,l)=>h>=8&&h<=34&&s>=.15&&s<=.9&&l>=.5&&l<=.94;
const isLip=(h,s,l)=>(h>=340||h<=12)&&s>=.3&&s<=.6&&l>=.4&&l<=.75;
const inW=(h,a,b)=>a<=b?h>=a&&h<=b:(h>=a||h<=b);
const wMid=(a,b)=>a<=b?(a+b)/2:((a+b+360)/2)%360;
const dH=(h,c)=>{let d=h-c;while(d>180)d-=360;while(d<-180)d+=360;return d};
function mkMap(rules){const memo={};return c6=>{if(c6 in memo)return memo[c6];const[h,s,l]=toHsl(c6);let out=null;
  for(const R of rules){
    if(R.hex){if(!R.hex.includes(c6))continue}
    else{if(R.w&&!inW(h,R.w[0],R.w[1]))continue;const smin=R.smin!=null?R.smin:.1;if(s<smin)continue;if(R.smax!=null&&s>R.smax)continue;
      if(R.lmin!=null&&l<R.lmin)continue;if(R.lmax!=null&&l>R.lmax)continue;if(!R.skin&&(isSkin(h,s,l)||isLip(h,s,l)))continue}
    if(R.keep)break;
    const T=R.to||{};let H=h,Sx=s,Lx=l;
    if(T.h!=null)H=T.h+(R.w?dH(h,wMid(R.w[0],R.w[1])):0)*(T.k!=null?T.k:.6);else if(T.dh)H=h+T.dh;
    if(T.s!=null)Sx=T.s;else{if(T.sm!=null)Sx=s*T.sm;if(T.sa)Sx+=T.sa}
    if(T.lf)Lx=T.lf[0]+l*T.lf[1];else if(T.l!=null)Lx=T.l;else{if(T.lm!=null)Lx=l*T.lm;if(T.la)Lx+=T.la}
    out=toHex(H,Sx,Lx);break}
  return memo[c6]=out}}
const w=(a,b,to,x)=>Object.assign({w:[a,b],to},x||{});
const hex=(list,to,x)=>Object.assign({hex:list.split(' '),to},x||{});
const keep=list=>({hex:list.split(' '),keep:true});
const grey=(to,x)=>Object.assign({smin:0,smax:.16,lmin:.08,lmax:.9,to},x||{});
function recolor(s,map){return s.replace(/#([0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-zA-Z_-])/g,(m,g,o,str)=>{if(str.charCodeAt(o-1)===40||str.slice(o-6,o)==='href="')return m;const r=map(hx6(m));return r||m})}
/* dégradés remplacés par nom (bg, hr, rb…) */
function grRep(s,G){return s.replace(/<(linear|radial)Gradient id="([^"]+)"([^>]*)>([\s\S]*?)<\/\1Gradient>/g,(m,t,id,at,body)=>{
  const suf=Object.keys(G).find(k=>id.endsWith('_'+k)||id.endsWith(k)&&/[0-9_]$/.test(id.slice(0,id.length-k.length)));if(!suf)return m;const C=G[suf];let i=0;const n=(body.match(/<stop\b/g)||[]).length;
  return`<${t}Gradient id="${id}"${at}>`+body.replace(/stop-color="[^"]*"/g,()=>{const c=C[Math.min(C.length-1,Math.round(i++*(C.length-1)/Math.max(1,n-1)))];return`stop-color="${c}"`})+`</${t}Gradient>`})}
/* règles par élément : {has:[…], fill:{ancienne:nouvelle}, set:{attribut:valeur}} */
function elRep(s,E){return s.replace(/<(path|circle|ellipse|rect|polygon)\b[^>]*>/g,tag=>{for(const R of E){if(!R.has.some(x=>tag.includes(x)))continue;
  let t=tag;if(R.fill){const m=/\sfill="(#[0-9a-f]{3,6})"/.exec(t);if(!m||!R.fill[m[1]])continue;t=t.replace(m[0],` fill="${R.fill[m[1]]}"`)}
  if(R.set)for(const a in R.set){const re=new RegExp('\\s'+a+'="[^"]*"');t=re.test(t)?t.replace(re,` ${a}="${R.set[a]}"`):t.replace(/\s*(\/?)>$/,` ${a}="${R.set[a]}"$1>`)}return t}return tag})}
/* identifiants : préfixés pour ne pas se mélanger avec ceux du dessin du héros sur la même page */
function reId(s,tag){const ids=new Set();s.replace(/\sid="([^"]+)"/g,(m,i)=>{ids.add(i);return m});if(!ids.size)return s;
  return s.replace(/(\s)id="([^"]+)"/g,(m,a,i)=>`${a}id="${tag}${i}"`).replace(/url\(#([^)]+)\)/g,(m,i)=>ids.has(i)?`url(#${tag}${i})`:m).replace(/href="#([^"]+)"/g,(m,i)=>ids.has(i)?`href="#${tag}${i}"`:m)}
/* le cadre et les badges du portrait ne changent pas de couleur */
function tailAt(s){let t=s.length-6;for(const k of ['<g transform="rotate(0 50 50)">','<rect x="3" y="3"','<g transform="translate(13 13)">','<circle cx="86" cy="84" r="11"']){const j=s.lastIndexOf(k);if(j>0&&j<t)t=j}return t}
function afterBg(s){const d=s.indexOf('</defs>');if(d<0){const o=s.indexOf('>');return o+1}let i=d+7;if(s.startsWith('<rect',i)){const e=s.indexOf('/>',i);if(e>0)i=e+2}return i}
function grpEnd(s,i){let d=0;const re=/<g\b[^>]*?(\/?)>|<\/g>/g;re.lastIndex=i;let m;while((m=re.exec(s))){if(m[0]==='</g>'){d--;if(d===0)return re.lastIndex}else if(!m[1])d++}return -1}
/* ---------- petits dessins pour les effets (repère portrait 100×100, corps 160×244) ---------- */
const sp4=(x,y,r,c,op)=>`<path d="M${x} ${R1(y-r)}Q${x} ${y} ${R1(x+r)} ${y}Q${x} ${y} ${x} ${R1(y+r)}Q${x} ${y} ${R1(x-r)} ${y}Q${x} ${y} ${x} ${R1(y-r)}Z" fill="${c}" opacity="${op==null?.9:op}"/>`;
const SH={
  dot:(r,c)=>`<circle r="${r}" fill="${c}"/>`,
  star:(r,c)=>sp4(0,0,r,c,1),
  flake:(r,c)=>`<path d="M0 ${-r}V${r}M${R1(-r*.87)} ${R1(-r*.5)}L${R1(r*.87)} ${R1(r*.5)}M${R1(-r*.87)} ${R1(r*.5)}L${R1(r*.87)} ${R1(-r*.5)}M${R1(-r*.3)} ${R1(-r*.8)}L0 ${R1(-r*.55)}L${R1(r*.3)} ${R1(-r*.8)}M${R1(-r*.3)} ${R1(r*.8)}L0 ${R1(r*.55)}L${R1(r*.3)} ${R1(r*.8)}" stroke="${c}" stroke-width="${R1(Math.max(.3,r*.18))}" stroke-linecap="round" fill="none"/>`,
  petal:(r,c,k)=>`<path transform="rotate(${(k*67)%360})" d="M0 ${-r}Q${R1(r*.95)} ${R1(-r*.2)} 0 ${r}Q${R1(-r*.95)} ${R1(-r*.2)} 0 ${-r}Z" fill="${c}"/><path transform="rotate(${(k*67)%360})" d="M0 ${R1(-r*.7)}V${R1(r*.6)}" stroke="#ffffff" stroke-width="${R1(r*.12)}" opacity=".5"/>`,
  feather:(r,c,k,e)=>`<g transform="rotate(${-30+(k*41)%60})"><path d="M0 ${-r}Q${R1(r*.5)} ${R1(-r*.2)} ${R1(r*.12)} ${r}L${R1(-r*.12)} ${r}Q${R1(-r*.5)} ${R1(-r*.2)} 0 ${-r}Z" fill="${c}"/><path d="M0 ${R1(-r*.9)}V${r}" stroke="${e||'#c02040'}" stroke-width="${R1(r*.1)}"/></g>`,
  note:(r,c,k)=>k%2?`<ellipse rx="${R1(r*.55)}" ry="${R1(r*.4)}" transform="rotate(-22)" fill="${c}"/><path d="M${R1(r*.48)} ${R1(-r*.1)}V${R1(-r*1.6)}Q${R1(r*1.25)} ${R1(-r*1.25)} ${R1(r*1.15)} ${R1(-r*.55)}" fill="none" stroke="${c}" stroke-width="${R1(r*.22)}" stroke-linecap="round"/>`
    :`<ellipse cx="${R1(-r*.7)}" rx="${R1(r*.5)}" ry="${R1(r*.36)}" transform="rotate(-22)" fill="${c}"/><ellipse cx="${R1(r*.7)}" cy="${R1(-r*.3)}" rx="${R1(r*.5)}" ry="${R1(r*.36)}" transform="rotate(-22)" fill="${c}"/><path d="M${R1(-r*.25)} ${R1(-r*.1)}V${R1(-r*1.5)}L${R1(r*1.15)} ${R1(-r*1.8)}V${R1(-r*.4)}" fill="none" stroke="${c}" stroke-width="${R1(r*.2)}" stroke-linejoin="round"/>`,
  suit:(r,c,k)=>{const d=[`M0 ${R1(r*.8)}C${R1(-r*1.2)} 0 ${R1(-r*.7)} ${R1(-r*1)} 0 ${R1(-r*.35)}C${R1(r*.7)} ${R1(-r*1)} ${R1(r*1.2)} 0 0 ${R1(r*.8)}Z`,`M0 ${-r}L${R1(r*.7)} 0L0 ${r}L${R1(-r*.7)} 0Z`,
    `M0 ${-r}C${R1(r*1.2)} ${R1(-r*.1)} ${R1(r*.6)} ${R1(r*.7)} 0 ${R1(r*.25)}C${R1(-r*.6)} ${R1(r*.7)} ${R1(-r*1.2)} ${R1(-r*.1)} 0 ${-r}ZM0 ${R1(r*.15)}L${R1(r*.32)} ${r}H${R1(-r*.32)}Z`,
    `M0 ${R1(r*.1)}L${R1(r*.3)} ${r}H${R1(-r*.3)}Z`][k%4];return k%4===3?`<circle cy="${R1(-r*.5)}" r="${R1(r*.42)}" fill="${c}"/><circle cx="${R1(-r*.45)}" cy="${R1(r*.05)}" r="${R1(r*.42)}" fill="${c}"/><circle cx="${R1(r*.45)}" cy="${R1(r*.05)}" r="${R1(r*.42)}" fill="${c}"/><path d="${d}" fill="${c}"/>`:`<path d="${d}" fill="${c}"/>`},
  wisp:(r,c)=>`<path d="M0 ${r}Q${R1(r*.9)} ${R1(r*.2)} ${R1(r*.2)} ${R1(-r*.4)}Q${R1(r*.3)} ${R1(-r)} 0 ${R1(-r*1.6)}Q${R1(-r*.2)} ${R1(-r*.8)} ${R1(-r*.5)} ${R1(-r*.3)}Q${R1(-r*.9)} ${R1(r*.3)} 0 ${r}Z" fill="${c}"/><circle r="${R1(r*.35)}" cy="${R1(r*.2)}" fill="#ffffff" opacity=".7"/>`,
  ember:(r,c)=>`<path d="M0 ${-r}L${R1(r*.45)} 0L0 ${r}L${R1(-r*.45)} 0Z" fill="${c}"/>`,
  grain:(r,c)=>`<circle r="${r}" fill="${c}"/><circle cx="${R1(r*1.8)}" cy="${R1(r*1.2)}" r="${R1(r*.6)}" fill="${c}" opacity=".8"/>`,
  bubble:(r,c)=>`<circle r="${r}" fill="none" stroke="${c}" stroke-width="${R1(r*.22)}"/><circle cx="${R1(-r*.35)}" cy="${R1(-r*.35)}" r="${R1(r*.22)}" fill="#ffffff" opacity=".8"/>`};
/* des particules qui traversent le corps (une seule animation par particule ; image fixe : hors du cadre) */
function drift(n,shape,o){let s='';const sd=o.seed||0;for(let k=0;k<n;k++){const f=((k*.618+sd)%1),x=R1(o.x0+(o.x1-o.x0)*f),d=R1(o.d0+(o.d1-o.d0)*((k*.37+.2)%1)),sw=(k%2?1:-1)*(o.sw==null?8:o.sw);
  const c=o.c[k%o.c.length],r=o.r[k%o.r.length];
  s+=`<g transform="translate(${x} ${o.y})"><g opacity="${o.op||.9}"><animateMotion dur="${d}s" begin="${R1(-(k+.5)*d/n)}s" repeatCount="indefinite" path="M0 0q${sw} ${R1(o.dy/2)} ${R1(sw*.3)} ${o.dy}"/>${shape(r,c,k,o.e)}</g></g>`}return s}
/* les mêmes, posées (portraits) */
const place=(pts,shape,cs,e)=>pts.map(([x,y,r,op],k)=>`<g transform="translate(${x} ${y})" opacity="${op==null?.85:op}">${shape(r,cs[k%cs.length],k,e)}</g>`).join('');
/* les éclairs */
const bolt=(pts,c,wd,dur,beg)=>{const d='M'+pts.map(p=>p.join(' ')).join('L');return`<g opacity="0"><path d="${d}" stroke="${c}" stroke-width="${R1(wd*2.6)}" fill="none" opacity=".35" stroke-linejoin="round"/><path d="${d}" stroke="#ffffff" stroke-width="${wd}" fill="none" stroke-linejoin="round"/>${dur?`<animate attributeName="opacity" values="0;0;1;.2;1;0;0" keyTimes="0;.62;.66;.7;.74;.8;1" dur="${dur}s" begin="${beg||0}s" repeatCount="indefinite"/>`:''}</g>`};
const boltS=(pts,c,wd,op)=>{const d='M'+pts.map(p=>p.join(' ')).join('L');return`<g opacity="${op}"><path d="${d}" stroke="${c}" stroke-width="${R1(wd*2.6)}" fill="none" opacity=".35" stroke-linejoin="round"/><path d="${d}" stroke="#ffffff" stroke-width="${wd}" fill="none" stroke-linejoin="round"/></g>`};
const HGs=s=>`<g transform="translate(38 -1) scale(.84)">${s}</g>`;

/* ================= LE CATALOGUE ================= */
/* fx : p (portrait, devant), pb (portrait, derrière le héros), b (corps, devant), bb (corps, tout derrière), ba (corps, après le décor) */
const DEF=[
/* --- Fortuna (56) --- */
{k:'fo_trefle',hero:56,rar:'c',n:'Fortuna Trèfle',d:"Le trèfle à quatre feuilles, c'est elle qui l'a trouvé. Depuis, la chance s'habille en vert.",
  map:[w(336,17,{h:140,k:.6}),w(138,162,{h:352,k:.5})]},
{k:'fo_minuit',hero:56,rar:'r',n:'Fortuna, Reine de Minuit',d:"Quand la dernière table ferme, Fortuna joue seule contre les étoiles. Et elle gagne.",
  map:[w(336,17,{h:228,k:.5,sm:.8,lm:.9}),w(36,56,{s:.14,la:.04},{smin:.3}),w(138,162,{h:46,k:.4})],
  gr:{bg:['#F2F6FF','#8AA0E0','#24306A','#0C1230','#04060E'],gl:['#FFFFFF','#DCE6FF','#8AA0FF'],bb:['#C8D6FF','#2A3A8A','#04060E']},
  fx:{pb:u=>`<path d="M80 10A9 9 0 1 0 89 22A7 7 0 1 1 80 10Z" fill="#E8EEFF" opacity=".85"/>`+[[12,18,1.4],[24,8,1],[70,30,.9],[90,48,1.1],[8,44,.8]].map(([x,y,r])=>sp4(x,y,r,'#FFFFFF',.9)).join(''),
    bb:u=>`<path d="M128 12A15 15 0 1 0 143 32A12 12 0 1 1 128 12Z" fill="#E8EEFF" opacity=".8"/>`+[[18,24,2],[34,8,1.4],[150,70,1.6],[12,96,1.2],[146,118,1.3],[26,150,1]].map(([x,y,r],k)=>k<3?`<g>${sp4(x,y,r,'#FFFFFF',.9)}<animate attributeName="opacity" values=".2;1;.2" dur="${2+k*.7}s" repeatCount="indefinite"/></g>`:sp4(x,y,r,'#FFFFFF',.8)).join('')}},
/* --- Solaris (57) --- */
{k:'so_aube',hero:57,rar:'c',n:'Solaris, Aube Rose',d:"Le premier rayon du matin n'est pas doré : il est rose. Solaris le porte comme une cape.",
  map:[w(0,33,{h:338,k:.5})]},
{k:'so_noir',hero:57,rar:'l',n:'Solaris, Astre Noir',d:"Le jour où le soleil s'est éteint, Solaris ne s'est pas éteint avec lui. Il a appris à briller dans le noir : une couronne d'éclipse, une armure d'obsidienne et un feu violet que rien n'arrête.",
  map:[w(0,33,{h:275,k:.5,lm:.8}),w(34,56,{sm:.9},{smin:.3})],forms:['Astre Noir','Éclipse Naissante','Couronne d\'Ombre','Nuit Éternelle']},
/* --- Kaïros (58) --- */
{k:'ka_azur',hero:58,rar:'c',n:'Kaïros Azur',d:"Une robe couleur de ciel pour le gardien des heures. Le temps, lui, n'a pas changé.",
  map:[w(236,292,{h:212,k:.6})]},
{k:'ka_sables',hero:58,rar:'r',n:'Kaïros des Sables',d:"Dans le désert des heures perdues, chaque grain de sable est une seconde qu'il a rattrapée.",
  map:[w(236,292,{h:34,k:.3,sm:.55}),w(160,182,{h:46,k:.3,sm:.9})],
  gr:{bg:['#FFF6E0','#F0C878','#A8702A','#3A240C','#120A04'],gl:['#FFFFFF','#FFE8B0','#E0A83A'],bb:['#FFE8B0','#8A5A1A','#120A04']},
  fx:{pb:u=>`<path d="M0 86Q20 76 40 84T80 80T100 82V100H0Z" fill="#C8902A" opacity=".35"/>`+place([[14,30,.9],[86,22,.8],[22,62,.7],[80,58,.8],[10,48,.6]],SH.grain,['#FFE08A','#F0B850']),
    bb:u=>`<path d="M0 204Q30 190 62 200T120 195T160 198V236H0Z" fill="#C8902A" opacity=".2"/><path d="M0 216Q40 206 80 214T160 211V236H0Z" fill="#8A5A1A" opacity=".22"/>`,
    b:u=>drift(7,SH.grain,{x0:14,x1:146,y:-14,dy:260,d0:5,d1:8,sw:10,c:['#FFE08A','#F0B850','#FFF2C0'],r:[1.5,1.1,1.8],op:.9})}},
/* --- Gaïa (59) --- */
{k:'ga_automne',hero:59,rar:'c',n:"Gaïa d'Automne",d:"Chaque automne, la Mère-Racine prend les couleurs du feu avant de s'endormir.",
  map:[w(58,160,{h:14,k:-.72,sm:1.3,lm:1.08})],gr:{bg:['#FFF4D8','#FFC060','#C0501A','#4A1A08','#140804'],gl:['#FFFFFF','#FFE0A0','#FF9A3A'],bb:['#FFD8A0','#8A3A10','#140804']}},
{k:'ga_cerisiers',hero:59,rar:'e',n:'Gaïa des Cerisiers',d:"Une nuit par an, le Premier Arbre fleurit. Gaïa danse sous ses branches, et chaque pétale qui tombe devient une graine d'étoile.",
  map:[w(58,160,{h:336,k:-.15,sm:.82,la:.03}),w(325,350,{s:.15,la:.06},{smin:.3}),hex('fff0f6',{s:.2})],
  gr:{bg:['#FFF4FA','#F8C0DC','#9A5AA8','#2A1440','#0C0618'],gl:['#FFFFFF','#FFE0F0','#FF9AC8'],bb:['#FFE0F0','#8A3A7A','#0C0618']},
  fx:{pb:u=>{const br=`<path d="M-2 14Q14 18 24 10Q32 4 42 6M14 16Q16 24 10 30M26 10Q28 2 34 -2" stroke="#4A2A2A" stroke-width="1.6" fill="none" stroke-linecap="round"/>`+place([[24,10,1.8],[34,-1,1.6],[42,6,1.7],[10,30,1.6],[16,18,1.4],[30,6,1.2]],(r,c)=>`<circle r="${r}" fill="${c}"/><circle r="${R1(r*.4)}" fill="#FFF6C0"/>`,['#FFC0DC','#FFE0F0','#FF9AC8'],null);
      return`<circle cx="80" cy="20" r="11" fill="#FFF4F8" opacity=".9"/><circle cx="80" cy="20" r="16" fill="#FFE0F0" opacity=".25"/>`+br+`<g transform="matrix(-1 0 0 1 100 52)">${br}</g>`},
    p:u=>place([[20,52,1.8,.85],[84,40,1.6,.8],[12,76,1.4,.75]],SH.petal,['#FFB0D4','#FFD0E6']),
    bb:u=>{const br=`<path d="M-4 30Q24 36 42 22Q56 12 72 14M24 34Q28 48 20 58M44 20Q48 6 58 0M8 32Q4 44 10 52" stroke="#3A2024" stroke-width="2.6" fill="none" stroke-linecap="round"/>`+place([[42,22,2.6],[58,0,2.4],[72,14,2.5],[20,58,2.4],[28,40,2],[52,12,2],[10,52,2.2],[34,30,1.8],[64,8,1.8]],(r,c)=>`<circle r="${r}" fill="${c}"/><circle r="${R1(r*.38)}" fill="#FFF6C0"/>`,['#FFC0DC','#FFE0F0','#FF9AC8']);
      return`<circle cx="124" cy="34" r="20" fill="#FFF4F8" opacity=".85"/><circle cx="124" cy="34" r="28" fill="#FFE0F0" opacity=".22"/>`+br+`<g transform="matrix(-1 0 0 1 160 92)">${br}</g>`},
    b:u=>drift(7+u,SH.petal,{x0:8,x1:152,y:-16,dy:262,d0:6,d1:10,sw:16,c:['#FFB0D4','#FFD0E6','#FF8AC0'],r:[3.4,2.8,4],op:.92})},
  forms:['Gaïa des Cerisiers','Premier Bourgeon','Floraison','Printemps Éternel']},
/* --- Titanor (60) --- */
{k:'ti_bronze',hero:60,rar:'c',n:'Titanor de Bronze',d:"Coulé dans le bronze des anciens rois, avec la patine vert-de-gris des siècles.",
  map:[grey({h:28,s:.42,lm:1.02}),w(80,112,{h:168,k:.5,sm:.75})]},
{k:'ti_lave',hero:60,rar:'r',n:'Titanor, Cœur de Lave',d:"Le Mont-Vivant s'est réveillé volcan. Sa pierre est noire, et dans ses fissures coule le feu.",
  map:[grey({h:14,s:.1,lf:[.03,.48]}),w(178,216,{h:22,k:.4,s:1}),w(80,112,{h:14,k:.3,s:.95}),w(216,232,{h:8,k:.3,lm:.8},{smin:.2})],
  gr:{bg:['#FFF0C0','#FF9A3A','#A8260E','#2A0806','#0A0202'],gl:['#FFFFFF','#FFD8A0','#FF6A1A'],bb:['#FFB070','#8A1A10','#0A0202']},
  fx:{p:u=>place([[16,30,1.2],[86,26,1],[22,66,.9],[80,60,1.1]],SH.ember,['#FFB21A','#FF6A1A']),
    b:u=>drift(7,SH.ember,{x0:16,x1:144,y:250,dy:-268,d0:3.6,d1:6,sw:9,c:['#FFD84A','#FF6A1A','#FF9A3A'],r:[2.3,1.8,2.9],op:.95})}},
/* --- Valkyr (61) --- */
{k:'va_pourpre',hero:61,rar:'c',n:'Valkyr Pourpre',d:"La cape des walkyries royales, teinte dans la pourpre des rois du Nord.",
  map:[keep('8a2a30 b8464a e88a8a'),w(338,14,{h:286,k:.6})]},
{k:'va_givre',hero:61,rar:'l',n:'Valkyr, Reine du Givre',d:"Au bout du monde, là où l'aurore danse sur la glace, Valkyr a été couronnée Reine du Givre. Ses ailes sont de cristal, sa lance ne fond jamais, et l'hiver la suit partout.",
  map:[w(338,14,{h:205,k:.5}),w(34,56,{h:200,k:.3,s:.35,la:.08},{smin:.3})],forms:['Reine du Givre','Aurore Glacée','Couronne de Cristal','Hiver Éternel']},
/* --- Nyx (62) --- */
{k:'ny_spectre',hero:62,rar:'c',n:'Nyx Spectrale',d:"On dit qu'elle n'a plus d'ombre. C'est faux : c'est son ombre qui n'a plus de Nyx.",
  map:[w(232,278,{h:182,k:.6},{skin:true}),w(300,345,{h:148,k:.5})]},
{k:'ny_ecarlate',hero:62,rar:'l',n:'Nyx, Comtesse Écarlate',d:"La Comtesse ne sort qu'à la lune de sang. Ses ailes de chauve-souris, ses roses noires et ses yeux rouges : personne ne l'a jamais vue deux fois.",
  map:[w(232,278,{h:350,k:.3,sm:.6,lm:.8},{skin:true}),w(300,345,{h:352,k:.4})],forms:['Comtesse Écarlate','Lune de Sang','Rose Noire','Nuit Pourpre']},
/* --- Orion (63) --- */
{k:'or_jade',hero:63,rar:'c',n:'Orion de Jade',d:"Le chasseur des étoiles a troqué le bleu de la nuit pour le vert des forêts profondes.",
  map:[w(195,240,{h:152,k:.6,sm:.9})]},
{k:'or_filante',hero:63,rar:'r',n:"Orion, Étoile Filante",d:"Il ne chasse plus les étoiles : il court avec elles. Fais un vœu quand il passe.",
  map:[w(195,240,{h:266,k:.5,sm:.9})],
  gr:{bg:['#F6EEFF','#B89AFF','#4A2A9A','#160A40','#06021A'],gl:['#FFFFFF','#E8D8FF','#B08AFF'],bb:['#D8C8FF','#3A1A8A','#06021A']},
  fx:{pb:u=>[[10,22,30,10],[66,6,88,-4]].map(([x,y,x2,y2])=>`<path d="M${x} ${y}L${x2} ${y2}" stroke="#FFF6C0" stroke-width=".9" stroke-linecap="round" opacity=".8"/>`+sp4(x2,y2,1.6,'#FFFFFF',1)).join('')+[[86,40,1],[14,50,.9],[80,22,.8]].map(([x,y,r])=>sp4(x,y,r,'#FFFFFF',.9)).join(''),
    bb:u=>[[0,-6,7],[1,-3.4,9],[2,-1,11]].map(([k,b,d])=>{const x=[70,176,130][k],y=[-24,-10,-40][k];return`<g transform="translate(${x} ${y})"><g><animateMotion dur="${d}s" begin="${b}s" repeatCount="indefinite" keyPoints="0;1;1" keyTimes="0;.2;1" calcMode="linear" path="M0 0L-230 230"/><path d="M0 0L22 -22" stroke="#FFF6C0" stroke-width="1.2" stroke-linecap="round" opacity=".75"/>${sp4(0,0,2.2,'#FFFFFF',1)}</g></g>`}).join('')+[[20,40,1.6],[140,90,1.4],[14,130,1.2],[146,30,1.2]].map(([x,y,r])=>sp4(x,y,r,'#FFFFFF',.85)).join('')}},
/* --- Séraphine (64) --- */
{k:'se_azur',hero:64,rar:'c',n:'Séraphine Azur',d:"Les six ailes, la même grâce, et le bleu du ciel juste avant l'aube.",
  map:[w(318,350,{h:206,k:.6}),w(258,282,{h:232,k:.6},{smin:.25})]},
{k:'se_dechue',hero:64,rar:'e',n:'Séraphine Déchue',d:"Elle est tombée du ciel pour sauver un royaume qui ne l'a jamais remerciée. Ses ailes ont noirci, son auréole s'est brisée… mais elle protège toujours.",
  els:[{has:['stroke="#d8c08a"','stroke="#e0a83a"'],fill:{'#ffffff':'#2A1E30','#f6f0ff':'#3C2A46','#ffe9a8':'#5A1A30'},set:{stroke:'#C02040'}}],
  map:[w(318,352,{h:350,k:.4,sm:.9,lm:.85}),w(36,56,{sm:.7,lm:.82},{smin:.3}),w(258,282,{h:350,k:.3,lm:.8},{smin:.2})],
  gr:{rb:['#3C2C48','#241A2E','#120A18'],hr:['#5A4A6A','#2A2034','#0E0A14'],hl:['#FF6A7A','#C0203A','#3A0A14'],bg:['#FFB0B8','#C0304A','#4A0A24','#1A0610','#070205'],gl:['#FFC0C8','#E0405A','#6A0A1A'],bb:['#FF8A9A','#6A0A24','#070205']},
  fx:{p:u=>`<g stroke="#120A18" stroke-width="1.5" stroke-linecap="round"><path d="M43.4 14.6L45.4 18.2L43.8 21.4"/><path d="M57.8 15L56 18.4L57.4 21.2"/></g>`+place([[16,30,2.6],[86,52,2.2],[10,70,2]],SH.feather,['#2A1E30','#3C2A46'],'#C02040'),
    b:u=>HGs(`<g stroke="#120A18" stroke-width="1.5" stroke-linecap="round"><path d="M43.4 14.6L45.4 18.2L43.8 21.4"/><path d="M57.8 15L56 18.4L57.4 21.2"/></g>`)+drift(6,SH.feather,{x0:10,x1:150,y:-20,dy:266,d0:7,d1:11,sw:18,c:['#2A1E30','#3C2A46','#4A2A3A'],r:[6,5,7],op:.95,e:'#C02040'})
      +drift(3,SH.ember,{x0:30,x1:130,y:246,dy:-260,d0:4,d1:6,sw:7,c:['#FF4A5A','#FF8A9A'],r:[2,1.5],seed:.3})},
  forms:['Séraphine Déchue','Ailes de Cendre','Auréole Brisée','Ange de la Nuit']},
/* --- Drakhar (65) --- */
{k:'dk_emeraude',hero:65,rar:'c',n:'Drakhar Émeraude',d:"Le wyrm des forêts anciennes, aux écailles vert émeraude et au ventre d'or.",
  map:[w(338,21,{h:128,k:.5})]},
/* --- Léviathane (66) --- */
{k:'le_amethyste',hero:66,rar:'c',n:'Léviathane Améthyste',d:"Dans les fosses les plus profondes, les écailles du Roi des Abysses prennent la couleur des améthystes.",
  map:[w(150,202,{h:282,k:.6},{skin:true})]},
{k:'le_maelstrom',hero:66,rar:'e',n:'Léviathane du Maelström',d:"Quand le Roi des Abysses est en colère, la mer tourne sur elle-même. Au cœur du maelström, l'éclair tombe, et il sourit.",
  map:[hex('a8604a c8806a e08a6a fff6e0 ffd8a8',{s:.1}),w(150,202,{h:214,k:.5,sm:.85},{skin:true}),w(205,232,{lm:.72},{smin:.3})],
  gr:{lbg:['#E8F4FF','#6A8AC8','#1A2A5A','#0A1030','#02040C'],lgl:['#FFFFFF','#C8E0FF','#4A8AFF'],lbb:['#9AC8FF','#1A3A8A','#02040C']},
  fx:{pb:u=>`<g fill="none" stroke="#9AC8FF" stroke-linecap="round" opacity=".45"><path d="M50 96Q20 90 22 70Q26 52 50 54Q68 58 64 72Q60 82 50 80" stroke-width="1.4"/><path d="M50 96Q82 92 80 70Q76 48 50 50" stroke-width="1"/></g>`+boltS([[14,0],[20,14],[15,16],[23,32]],'#9AE0FF',.8,.85)+boltS([[90,4],[84,16],[89,18],[80,30]],'#9AE0FF',.6,.6),
    bb:u=>`<g transform="translate(80 150)"><g fill="none" stroke-linecap="round"><path d="M0 74Q-74 66 -70 0Q-64 -56 0 -54Q52 -48 46 4Q40 40 0 38Q-26 34 -24 8" stroke="#6AA8FF" stroke-width="3" opacity=".35"/><path d="M0 -74Q74 -66 70 0Q64 56 0 54Q-52 48 -46 -4Q-40 -40 0 -38Q26 -34 24 -8" stroke="#9AE0FF" stroke-width="2" opacity=".3"/><animateTransform attributeName="transform" type="rotate" from="0" to="-360" dur="16s" repeatCount="indefinite"/></g></g>`
      +bolt([[20,-8],[30,22],[22,26],[36,64]],'#9AE0FF',1.2,3.4,0)+bolt([[146,0],[134,30],[142,34],[126,70]],'#9AE0FF',1,4.6,-1.8),
    b:u=>drift(4,SH.bubble,{x0:24,x1:136,y:246,dy:-258,d0:5,d1:8,sw:6,c:['#C8E8FF','#9AE0FF'],r:[3.4,2.4,4.2],op:.8})},
  forms:['Seigneur du Maelström','Œil du Cyclone','Mer Déchaînée','Tempête Éternelle']},
/* --- Aléa (67) --- */
{k:'al_carreau',hero:67,rar:'c',n:'Aléa Carreau Bleu',d:"Même masque, même sourire, mais cette fois la carte gagnante est bleue.",
  map:[w(298,346,{h:214,k:.6}),w(256,292,{h:226,k:.5},{smin:.3})]},
{k:'al_joker',hero:67,rar:'r',n:'Aléa, Joker Noir',d:"Il reste toujours une carte dans le paquet que personne n'a jamais vue. C'est celle-ci.",
  map:[w(298,346,{h:96,k:.4,sm:.95}),w(256,292,{h:130,k:.3,lm:.55},{smin:.25}),w(215,245,{lm:.6},{smin:.05,smax:.35}),w(36,56,{s:.06,lm:.82},{smin:.3})],
  fx:{p:u=>place([[14,30,2.4],[86,24,2.2],[12,70,2],[88,60,2]],SH.suit,['#9AFF4A','#FFFFFF','#9AFF4A','#E8FFD0']),
    b:u=>drift(6,SH.suit,{x0:12,x1:148,y:250,dy:-266,d0:6,d1:9,sw:12,c:['#9AFF4A','#FFFFFF','#C8FF8A'],r:[4.6,4,5.2],op:.85})}},
/* --- Éryndel (68) --- */
{k:'er_glace',hero:68,rar:'c',n:'Éryndel, Roi des Glaces',d:"Sa flamme de cendre a gelé pendant le Long Hiver. Elle brûle encore, mais elle brûle froid.",
  map:[w(0,42,{h:200,k:.5},{smin:.35})]},
{k:'er_spectre',hero:68,rar:'e',n:'Éryndel, Roi Spectral',d:"Mort une fois, revenu deux fois. Le Roi de Cendre règne maintenant sur les âmes, et sa couronne brille de leur lumière froide.",
  map:[hex('ebe1d8 d9cdc3 b2a398',{h:226,s:.16}),w(0,40,{h:274,k:.5},{smin:.35}),w(40,58,{h:186,k:.4},{smin:.35}),grey({h:252,s:.22},{lmax:.45})],
  fx:{p:u=>place([[14,40,2.2,.75],[86,32,2,.7],[20,72,1.8,.6]],SH.wisp,['#9AF0FF','#C8A0FF']),
    bb:u=>`<ellipse cx="80" cy="120" rx="60" ry="96" fill="#8A6AFF" opacity=".12"/><ellipse cx="80" cy="120" rx="40" ry="70" fill="#9AF0FF" opacity=".08"/>`,
    b:u=>drift(6+u,SH.wisp,{x0:14,x1:146,y:250,dy:-262,d0:4.4,d1:7,sw:10,c:['#9AF0FF','#C8A0FF','#E0D0FF'],r:[4.4,3.6,5],op:.7})},
  forms:['Roi Spectral','Âme Errante','Couronne des Âmes','Règne Éternel']},
/* --- Aegis (69) --- */
{k:'ae_ecarlate',hero:69,rar:'c',n:'Aegis Écarlate',d:"Le tabard rouge des Paladins du Serment, ceux qui ne reculent jamais.",
  map:[w(200,236,{h:356,k:.5},{smin:.4})]},
{k:'ae_aube',hero:69,rar:'r',n:"Aegis, Paladin de l'Aube",d:"Il a monté la garde toute la nuit. Quand le soleil s'est levé, sa lumière s'est posée sur lui, et elle n'est jamais repartie.",
  map:[w(200,236,{h:40,k:.4,sm:.9},{smin:.4}),w(200,236,{h:42,s:.26},{smin:.05,smax:.4})],
  fx:{pb:u=>LK.rays(50,30,10,80,.12,'#FFF2C0'),
    bb:u=>LK.rays(80,40,12,140,.08,'#FFF2C0'),
    b:u=>drift(6,SH.star,{x0:16,x1:144,y:250,dy:-264,d0:4.6,d1:7.4,sw:8,c:['#FFF2C0','#FFD84A','#FFFFFF'],r:[2.8,2.2,3.4],op:.9})}},
/* --- Lyra (70) --- */
{k:'ly_rose',hero:70,rar:'c',n:'Lyra Rose',d:"La robe de sa toute première chanson, celle qui a fait pleurer un dragon.",
  map:[w(150,202,{h:334,k:.6})]},
{k:'ly_nocturne',hero:70,rar:'r',n:'Lyra Nocturne',d:"Elle chante pour la lune quand tout le royaume dort. Les notes montent jusqu'aux étoiles et y restent accrochées.",
  map:[w(150,202,{h:262,k:.5,lm:.92})],
  gr:{bg:['#F0E8FF','#A88AF0','#3A2A8A','#140A40','#06031A'],gl:['#FFFFFF','#E0D0FF','#9A7AFF'],bb:['#D0C0FF','#2A1A7A','#06031A']},
  fx:{p:u=>place([[14,32,2.4],[86,26,2.2],[88,62,2]],SH.note,['#E0D0FF','#FFF2C0'])+[[22,12,1],[78,10,.9],[10,56,.8]].map(([x,y,r])=>sp4(x,y,r,'#FFFFFF',.9)).join(''),
    b:u=>drift(6,SH.note,{x0:14,x1:146,y:250,dy:-264,d0:5,d1:8,sw:12,c:['#E0D0FF','#FFF2C0','#C8B8FF'],r:[4.6,4,5.2],op:.9})+[[20,30,1.6],[140,50,1.4],[16,120,1.2],[146,140,1.2]].map(([x,y,r])=>sp4(x,y,r,'#FFFFFF',.85)).join('')}},
/* --- Sorën (71) --- */
{k:'sr_sables',hero:71,rar:'c',n:'Sorën des Sables',d:"Une capuche couleur de dune pour guetter le désert du haut de sa tour.",
  map:[w(100,172,{h:36,k:.3,sm:.55,lf:[.18,.95]})]},
{k:'sr_neiges',hero:71,rar:'r',n:'Sorën, Sentinelle des Neiges',d:"Sur les remparts du Nord, il ne bouge pas pendant des heures. La neige le recouvre, et personne ne le voit venir.",
  map:[w(100,172,{h:210,k:.3,s:.12,lf:[.3,.7]}),w(10,40,{h:214,k:.3,sm:.5},{smin:.3,lmax:.48})],
  gr:{bg:['#F4FAFF','#B8D4F0','#5A7898','#1E2A40','#0A1222'],gl:['#FFFFFF','#E0F0FF','#9AC8FF'],bb:['#D8E8FF','#3A5A80','#0A1222']},
  fx:{p:u=>place([[14,30,2],[86,24,1.8],[10,64,1.5],[90,58,1.6],[30,10,1.2]],SH.flake,['#FFFFFF','#E0F0FF']),
    b:u=>drift(8,SH.flake,{x0:8,x1:152,y:-16,dy:262,d0:6,d1:10,sw:12,c:['#FFFFFF','#E0F0FF','#C8E0FF'],r:[3.8,3,4.6],op:.92})}}
];
/* ---------- enregistrement ---------- */
const SK2={},VK={},SKL=[];let vid=401;
for(const D of DEF){if(!HEROES[D.hero])continue;D.vid=vid++;D.mapF=D.map?mkMap(D.map):null;D.forms=D.forms||[D.n,D.n,D.n,D.n];D.how=`Boutique du Dressing · ${SKR[D.rar].p.toLocaleString('fr-FR')} gemmes`;
  SK2[D.k]=D;VK[D.vid]=D.k;SKL.push(D.k);
  SKINS[D.k]={n:D.n,hero:D.hero,vid:D.vid,rar:D.rar,shop:1,how:D.how,d:D.d,forms:D.forms};SKV[D.vid]=D.k;
  try{LOOKS[D.vid]=LOOKS[D.hero];UTH_H[D.vid]=UTH_H[D.hero]}catch(e){}}
/* l'apparence du Pass Pro est une exclusivité de rang légendaire */
for(const k in SKINS)if(!SKINS[k].rar){SKINS[k].rar='l';SKINS[k].ex=1}
/* ---------- le dessin d'une apparence ---------- */
const PU0=portraitU,HB0=heroBody;let BYP=0;
{const se=skEq;skEq=function(hid){if(BYP)return null;return se.apply(this,arguments)}}
function baseP(hid,u){BYP++;try{return u>0?PU0(HEROES[hid],u):P0(HEROES[hid])}finally{BYP--}}
function baseB(hid,u){BYP++;try{return HB0(HEROES[hid],u)}finally{BYP--}}
const SKC={};
function skinArt(k,u,body){u=Math.max(0,Math.min(3,u|0));const ck=k+(body?'b':'p')+u;if(SKC[ck])return SKC[ck];const D=SK2[k];let s;
  try{if(D.art){s=body?D.art.b(u):D.art.p(u)}
    else{s=body?baseB(D.hero,u):baseP(D.hero,u);s=reId(s,'k'+D.vid+(body?'b':'p')+u+'_');
      let t=body?s.length-6:tailAt(s);let head=s.slice(0,t),tail=s.slice(t);
      if(D.gr)head=grRep(head,D.gr);if(D.els)head=elRep(head,D.els);if(D.mapF)head=recolor(head,D.mapF);
      const F=D.fx||{};
      if(!body){if(F.pb){const i=afterBg(head);head=head.slice(0,i)+`<g class="skfx">${F.pb(u)}</g>`+head.slice(i)}if(F.p)head+=`<g class="skfx">${F.p(u)}</g>`}
      else{if(F.ba){const g=head.indexOf('<g class="lgbk">'),e=g>=0?grpEnd(head,g):-1;const i=e>0?e:afterBg(head);head=head.slice(0,i)+`<g class="skfx">${F.ba(u)}</g>`+head.slice(i)}
        if(F.bb){const i=afterBg(head);head=head.slice(0,i)+`<g class="skfx">${F.bb(u)}</g>`+head.slice(i)}if(F.b)head+=`<g class="skfx">${F.b(u)}</g>`}
      s=head+tail}
    s=s.replace(/aria-label="[^"]*"/,`aria-label="${D.n.replace(/"/g,'')}${body?' en pied':''}"`)}catch(e){console.warn('skin',k,e);s=body?baseB(D.hero,u):baseP(D.hero,u)}
  return SKC[ck]=s}
/* ---------- branchements : partout où le héros est dessiné ---------- */
const vk=h=>{if(!h)return null;const k=VK[h.i];if(k)return k;if(!HSK[h.i])return null;const e=skEq(h.i);return e&&SK2[e]?e:null};
const HSK={};for(const k of SKL)HSK[SK2[k].hero]=1;
{const pu=portraitU;portraitU=function(h,u){const k=vk(h);if(k)return skinArt(k,u,false);return pu.apply(this,arguments)}}
{const hb=heroBody;heroBody=function(h,u=0){const k=vk(h);if(k)return skinArt(k,u,true);return hb.apply(this,arguments)}}
const PCG={};
function pcHook(id,fn){const d=Object.getOwnPropertyDescriptor(PCACHE,id);if(d&&d.get&&d.get===PCG[id])return;let val=d&&!d.get?d.value:undefined;const g0=d&&d.get?d.get:null,s0=d&&d.set?d.set:null;
  const g=function(){const r=fn();if(r!=null)return r;return g0?g0.call(PCACHE):val};PCG[id]=g;
  try{Object.defineProperty(PCACHE,id,{get:g,set(v){if(s0)s0.call(PCACHE,v);else val=v},configurable:true,enumerable:false})}catch(e){}}
function hooks(){for(const hid in HSK)pcHook(+hid,()=>{if(BYP)return null;const e=skEq(+hid);return e&&SK2[e]?skinArt(e,0,false):null});for(const k of SKL)pcHook(SK2[k].vid,()=>skinArt(k,0,false))}
hooks();
function clrHero(hid){try{const ids=[hid,...SKL.filter(k=>SK2[k].hero===hid).map(k=>SK2[k].vid)];const re=new RegExp('(^|[^0-9])('+ids.join('|')+')(_|$)');
  for(const C of [typeof UPI!=='undefined'?UPI:null,typeof PIMG!=='undefined'?PIMG:null,window.BODYC3,typeof BODYC!=='undefined'?BODYC:null,typeof BODYC2!=='undefined'?BODYC2:null])if(C)for(const key of Object.keys(C))if(re.test(key))delete C[key];
  if(typeof BTIC!=='undefined')for(const key of [...BTIC.keys()])if(ids.some(i=>key.startsWith(i+'_')))BTIC.delete(key);for(const k in IMGC)if(re.test(k))delete IMGC[k]}catch(e){}hooks()}
{const sr=skRefresh;skRefresh=function(hid){sr.apply(this,arguments);clrHero(+hid)}}
/* au chargement : les caches d'images des héros qui portent une apparence de la boutique */
setTimeout(()=>{try{for(const hid in HSK){const e=S.skinEq&&S.skinEq[hid];if(e&&SK2[e])clrHero(+hid)}}catch(e){}},0);
/* ---------- le bonus de stats (quand l'apparence est portée) ---------- */
function skBon(id){const k=skEq(id),s=k&&SKINS[k];return s&&s.rar?SKR[s.rar]:null}
{const hs=heroStats;heroStats=function(id){const st=hs.apply(this,arguments);try{const R=skBon(id);if(R&&R.b&&st){const m=1+R.b;st.hp=Math.round(st.hp*m);st.atk=Math.round(st.atk*m);st.def=Math.round(st.def*m);if(R.spd)st.spd+=R.spd}}catch(e){}return st}}
const bonTxt=r=>{const R=SKR[r];return R.b?`+${Math.round(R.b*100)} % PV, ATQ et DÉF${R.spd?` · +${R.spd} VIT`:''}`:'Aucun bonus (juste pour le style)'};
/* ---------- API pour les dessins des légendaires ---------- */
window.SKX={def:k=>SK2[k],art:(k,A)=>{const D=SK2[k];if(!D)return;D.art=A;for(const c in SKC)if(c.startsWith(k))delete SKC[c];clrHero(D.hero)},R:SKR};

/* ================= LA BOUTIQUE, LE CATALOGUE, LE DRESSING ================= */
const IMGC={};
const sImg=(k,u)=>{const kk=SKINS[k].vid+'_'+u;return IMGC[kk]||(IMGC[kk]=svgToImg(portraitU(vHero(k),u)))};
const own=k=>skOwned(k),price=k=>SKR[SKINS[k].rar].p;
const rTag=r=>`<span class="skrt r-${r}">${SKR[r].t}</span>`;
const exTag=`<span class="skrt r-x">EXCLUSIVE · PASS</span>`;
const fU=hid=>{const o=S.heroes&&S.heroes[hid];return o&&HEROES[hid].r>=4?Math.min(3,o.u||0):0};
function shopList(){const L=SKL.filter(k=>{const s=SKINS[k];if(UI.skr&&UI.skr!=='all'&&s.rar!==UI.skr)return false;if(UI.skmine&&!S.heroes[s.hero])return false;return true});
  return L.sort((a,b)=>RORD.indexOf(SKINS[a].rar)-RORD.indexOf(SKINS[b].rar)||SKINS[a].hero-SKINS[b].hero)}
function skCard(k){const s=SKINS[k],o=own(k),on=skEq(s.hero)===k,u=fU(s.hero),h=HEROES[s.hero];
  return`<button class="skc r-${s.rar} ${o?'own':''} ${on?'on':''}" data-a="skview" data-v="${k}"><span class="skca">${sImg(k,u)}</span><span class="skcb">${s.ex?exTag:rTag(s.rar)}<b>${esc(s.n)}</b><small>${esc(h.n)}</small>
    <em class="skbn">${SKR[s.rar].b?'⚡ '+bonTxt(s.rar):'✨ Juste pour le style'}</em>${on?'<span class="skst on">✓ Portée</span>':o?'<span class="skst">✓ Possédée</span>':s.ex?`<span class="skst">🎟️ Pass Pro</span>`:`<span class="skpr">${GEM}${price(k).toLocaleString('fr-FR')}</span>`}</span></button>`}
function shopPage(){const r=UI.skr||'all';if(!S.skShopSeen){S.skShopSeen=1;try{save()}catch(e){}}
  const chips=[['all','Toutes'],['l','★ Légendaires'],['e','Épiques'],['r','Rares'],['c','Communes']].map(([k,n])=>`<button class="skchip ${r===k?'on':''} ${k!=='all'?'r-'+k:''}" data-a="skflt" data-v="${k}">${n}</button>`).join('')
    +`<button class="skchip ${UI.skmine?'on':''}" data-a="skmine">${UI.skmine?'☑':'☐'} Mes héros</button>`;
  const L=shopList();const leg=r==='all'&&!UI.skmine?SKL.filter(k=>SKINS[k].rar==='l'):[];
  const feat=leg.length?`<div class="skfeat">${leg.map(k=>{const s=SKINS[k],o=own(k);return`<button class="skft" data-a="skview" data-v="${k}"><span class="skftf">${svgStill(heroBody(vHero(k),fU(s.hero)))}</span><span class="skftt">${rTag('l')}<b>${esc(s.n)}</b><small>${esc(HEROES[s.hero].n)}</small><em class="skbn">⚡ ${bonTxt('l')}</em>${o?'<span class="skst">✓ Possédée</span>':`<span class="skpr">${GEM}${price(k).toLocaleString('fr-FR')}</span>`}</span></button>`}).join('')}</div>`:'';
  const rest=leg.length?L.filter(k=>SKINS[k].rar!=='l'):L;
  return`<div class="stack"><div class="card skhd"><div><div class="h3" style="margin:0">🛍️ Boutique d'apparences</div><p class="muted" style="margin:2px 0 0;font-size:12.5px">Les rares, épiques et légendaires donnent un bonus de stats quand elles sont portées. Les exclusivités du Pass ne sont jamais vendues ici.</p></div><span class="skbal">${GEM}<b class="num">${fmt(S.gems)}</b></span></div>
   <div class="skchips">${chips}</div>${feat}<div class="skgrid">${rest.map(skCard).join('')||'<p class="muted">Aucune apparence ici pour l\'instant.</p>'}</div>
   <div class="card skleg"><b>Bonus des apparences portées</b>${RORD.slice().reverse().map(x=>`<div>${rTag(x)} <span>${bonTxt(x)}</span> <small>${GEM}${SKR[x].p.toLocaleString('fr-FR')}</small></div>`).join('')}</div></div>`}
function allPage(){const all=Object.keys(SKINS);const n=all.filter(own).length;
  const sec=(r,title,L)=>{if(!L.length)return'';const o=L.filter(own).length;return`<div class="card skcat r-${r}"><div class="skcath"><b>${title}</b><small>${o} / ${L.length}</small></div><div class="skcatl">${L.map(k=>{const s=SKINS[k],ok=own(k);return`<button class="skci ${ok?'own':''}" data-a="skview" data-v="${k}"><span class="skcia">${sImg(k,0)}</span><span class="skcit"><b>${esc(s.n)}</b><small><span>${esc(HEROES[s.hero].n)}</span> · ${s.ex?'<span>Pass Pro</span>':GEM+price(k).toLocaleString('fr-FR')}</small></span>${ok?'<i class="cok">✓</i>':'<i class="clk">🔒</i>'}</button>`}).join('')}</div></div>`};
  const by=r=>all.filter(k=>!SKINS[k].ex&&SKINS[k].rar===r).sort((a,b)=>SKINS[a].hero-SKINS[b].hero);
  const test=SKTEST()||window.RDE_SKTEST?`<div class="card" style="border-style:dashed"><div class="h3" style="margin:0 0 4px">🧪 Mode test</div><p class="muted" style="font-size:12.5px;margin:0 0 8px">Uniquement dans la version de test : donne toutes les apparences de la boutique pour les essayer.</p><div class="row" style="gap:6px"><button class="btn p sm" data-a="skall">Tout débloquer</button><button class="btn sm" data-a="sknone">Tout retirer</button></div></div>`:'';
  return`<div class="stack"><div><div class="h">📖 Catalogue des apparences</div><p class="sub">Toutes les apparences du jeu, rangées par rareté : ${n} / ${all.length} dans ton dressing.</p></div>${test}
   ${sec('l','★ Légendaires',by('l'))}${sec('e','Épiques',by('e'))}${sec('r','Rares',by('r'))}${sec('c','Communes',by('c'))}${sec('x','🎟️ Exclusivités du Pass',all.filter(k=>SKINS[k].ex))}</div>`}
/* la fiche d'une apparence */
function skView(k){const s=SKINS[k];if(!s)return;UI.skvk=k;const h=HEROES[s.hero],hid=s.hero,o=own(k),on=skEq(hid)===k,has=!!S.heroes[hid],u=fU(hid),p=price(k),R=SKR[s.rar];
  let act;
  if(o)act=has?(on?`<button class="btn" data-a="skwear2" data-v="${hid}" data-k="">Remettre l'original</button><span class="tag" style="--rc:#7ad07a">✓ PORTÉE</span>`:`<button class="btn p" data-a="skwear2" data-v="${hid}" data-k="${k}">👗 Porter</button>`):`<div class="muted">🔒 Il te faut ${esc(h.n)} pour la porter.</div>`;
  else if(s.ex)act=`<div class="muted">🎟️ ${esc(s.how||'Exclusivité du Pass')}</div><div class="muted" style="font-size:12px">Les exclusivités ne sont jamais vendues en boutique.</div>`;
  else if(!has)act=`<button class="btn" disabled>${GEM}${p.toLocaleString('fr-FR')}</button><div class="muted" style="font-size:12.5px">🔒 Recrute d'abord ${esc(h.n)} pour acheter son apparence.</div>`;
  else if((S.gems||0)<p)act=`<button class="btn" disabled>${GEM}${p.toLocaleString('fr-FR')}</button><div class="muted" style="font-size:12.5px">Il te manque ${(p-(S.gems||0)).toLocaleString('fr-FR')} gemmes.</div>`;
  else if(UI.skcf===k)act=`<button class="btn p skbuy" data-a="skbuy" data-v="${k}">Confirmer l'achat · ${GEM}${p.toLocaleString('fr-FR')}</button><button class="btn sm" data-a="skview" data-v="${k}">Annuler</button>`;
  else act=`<button class="btn p skbuy" data-a="skbuy" data-v="${k}">Acheter · ${GEM}${p.toLocaleString('fr-FR')}</button>`;
  const back=UI.skback?`<button class="btn sm skback" data-a="hero" data-v="${UI.skback}">← ${esc(HEROES[UI.skback].n)}</button>`:'';
  modal(`<button class="x" data-a="close" aria-label="Fermer">×</button>${back}<div class="skpv r-${s.rar}"><div class="skpvf">${heroBody(vHero(k),u)}</div><div class="skpvi">${s.ex?exTag:rTag(s.rar)}<div class="h" style="margin:6px 0 2px">${esc(s.n)}</div><div class="muted" style="font-size:13px">${esc(h.n)}</div>
    <p style="font-size:13px;margin:8px 0">${esc(s.d||'')}</p><div class="skpvb ${R.b?'':'none'}">${R.b?'⚡ <b>Bonus quand elle est portée :</b> '+bonTxt(s.rar):'✨ Une apparence pour le style : elle ne change pas les stats.'}</div>
    <div class="dsforms skpvforms">${[0,1,2,3].map(x=>`<div class="${x===u?'on':''}"><span>${sImg(k,x)}</span><small>${x?'Ultra '+['','I','II','III'][x]:'Base'}</small></div>`).join('')}</div>
    <div class="skact">${act}</div></div></div>`)}
function skBuy(k){const s=SKINS[k];if(!s||s.ex||own(k))return;const p=price(k);if(!S.heroes[s.hero])return toast(`Recrute d'abord ${HEROES[s.hero].n}.`);if((S.gems||0)<p)return toast('Pas assez de gemmes.');
  if((s.rar==='e'||s.rar==='l')&&UI.skcf!==k){UI.skcf=k;return skView(k)}
  UI.skcf=null;S.gems-=p;skGive(k);S.skBuys=(S.skBuys||0)+1;try{news(Date.now(),`${S.name||'Voyageur'} s'offre l'apparence « ${s.n} »${s.rar==='l'?' ✨':''}`)}catch(e){}save();skView(k);try{render()}catch(e){}}
/* le dressing : tes apparences (dessins fixes : l'animation est dans la fiche) */
function wardrobe2(){const mine=(S.skins||[]).filter(k=>SKINS[k]).sort((a,b)=>RORD.indexOf(SKINS[a].rar)-RORD.indexOf(SKINS[b].rar)||SKINS[a].hero-SKINS[b].hero);
  const skins=mine.length?`<div class="skwl">${mine.map(k=>{const s=SKINS[k],hid=s.hero,on=skEq(hid)===k,u=fU(hid),has=!!S.heroes[hid];
    return`<div class="dskin skw r-${s.rar} ${on?'on':''}"><button class="dsfig" data-a="skview" data-v="${k}" aria-label="${esc(s.n)}">${svgStill(heroBody(vHero(k),u))}</button><div class="dsinfo">${s.ex?exTag:rTag(s.rar)}<div class="h3" style="margin:4px 0 2px">${esc(s.n)}</div><div class="muted" style="font-size:12.5px"><span>${esc(HEROES[hid].n)}</span> · <span>${u?'forme Ultra '+['','I','II','III'][u]:'forme de base'}</span></div>
      <div class="skbn" style="margin:5px 0 7px">${SKR[s.rar].b?'⚡ '+bonTxt(s.rar):'✨ Juste pour le style'}</div>
      ${has?`<div class="row" style="gap:6px">${on?`<button class="btn sm" data-a="skwear" data-v="${hid}" data-k="">Remettre l'original</button><span class="tag" style="--rc:#7ad07a">✓ PORTÉE</span>`:`<button class="btn p sm" data-a="skwear" data-v="${hid}" data-k="${k}">👗 Porter</button>`}</div>`:`<div class="muted" style="font-size:12px">🔒 Il te faut ${esc(HEROES[hid].n)} pour la porter.</div>`}</div></div>`}).join('')}</div>`
    :`<div class="card"><p class="muted" style="margin:0 0 8px">Tu n'as pas encore d'apparence. La boutique en a pour tous les légendaires et les mythiques, et le Pass Pro a ses exclusivités.</p><button class="btn p sm" data-a="dv" data-v="shop">🛍️ Voir la boutique</button></div>`;
  const bgs=(S.pbgs||[]).filter(k=>PBG[k]),fx=(S.nfxs||[]).filter(k=>NFX[k]);
  const bgsH=`<div class="card"><div class="h3">🖼️ Fond de profil</div><div class="dgrid"><button class="dopt ${!S.pbg?'on':''}" data-a="pbgset" data-v=""><span class="pbgmini none"></span><small>Aucun</small></button>${bgs.map(k=>`<button class="dopt ${S.pbg===k?'on':''}" data-a="pbgset" data-v="${k}"><span class="pbgmini"><svg viewBox="0 0 400 200" preserveAspectRatio="xMidYMid slice">${PBG[k].art()}</svg></span><small>${esc(PBG[k].n)}</small></button>`).join('')}</div></div>`;
  const fxH=`<div class="card"><div class="h3">✨ Effet de pseudo</div><div class="dgrid"><button class="dopt ${!S.nfx?'on':''}" data-a="nfxset" data-v=""><span class="pnfx">${esc(S.name||'Voyageur')}</span><small>Normal</small></button>${fx.map(k=>`<button class="dopt ${S.nfx===k?'on':''}" data-a="nfxset" data-v="${k}"><span class="pnfx nfx-${k} nfxn">${esc(S.name||'Voyageur')}</span><small>${esc(NFX[k].n)}</small></button>`).join('')}</div><p class="muted" style="font-size:12px;margin:6px 0 0">Visible par les autres joueurs dans le tchat et les classements.</p></div>`;
  const avH=`<div class="card row" style="justify-content:space-between"><div><div class="h3" style="margin:0">🧑‍🎤 Avatar</div><div class="muted" style="font-size:12.5px">Les avatars exclusifs se choisissent avec ta photo de profil.</div></div><button class="btn sm" data-a="dravs">Choisir</button></div>`;
  return`<div class="stack">${skins}${avH}${bgsH}${fxH}</div>`}
wardrobe=wardrobe2;
dressPage=function(){const dv=UI.dv||'dress';const T=[['dress','👗 Dressing'],['shop','🛍️ Boutique'],['all','📖 Catalogue'],['cat','🎟️ Pass']];
  const seg=`<div class="seg skseg" role="tablist">${T.map(([k,n])=>`<button role="tab" aria-selected="${dv===k}" class="${dv===k?'on':''}" data-a="dv" data-v="${k}">${n}</button>`).join('')}</div>`;
  S.skinSeen=[...(S.skins||[])];return seg+(dv==='shop'?shopPage():dv==='all'?allPage():dv==='cat'?catPage():wardrobe2())};
/* la fiche du héros : toutes ses apparences, avec leur rareté et leur bonus */
{const hm=heroModal;heroModal=function(id){const r=hm.apply(this,arguments);try{if(!skinOn())return r;id=+id;const L=Object.keys(SKINS).filter(k=>SKINS[k].hero===id);if(!L.length)return r;const m=document.querySelector('#ovl .modal');if(!m)return r;
  L.sort((a,b)=>(own(b)-own(a))||RORD.indexOf(SKINS[a].rar)-RORD.indexOf(SKINS[b].rar));
  const items=L.map(k=>{const s=SKINS[k],o=own(k),on=skEq(id)===k;return`<div class="skrow"><button class="skp" data-a="skview2" data-v="${k}" data-h="${id}">${sImg(k,Math.max(1,fU(id)))}</button><div style="flex:1;min-width:0">${s.ex?exTag:rTag(s.rar)}<b>${esc(s.n)}</b><small><span>${o?(on?'✓ Portée':'Dans ton dressing'):s.ex?'🔒 '+esc(s.how||''):GEM+price(k).toLocaleString('fr-FR')+' · <span>Boutique du Dressing</span>'}</span>${SKR[s.rar].b?`<span class="skbn"> · ⚡ ${bonTxt(s.rar)}</span>`:''}</small></div>${o?(on?`<button class="btn sm" data-a="skwear" data-v="${id}" data-k="">Original</button>`:`<button class="btn p sm" data-a="skwear" data-v="${id}" data-k="${k}">Porter</button>`):`<button class="btn sm" data-a="skview2" data-v="${k}" data-h="${id}">Voir</button>`}</div>`}).join('');
  const html=`<div class="skill skblk skblk2"><div class="sn">👗 Apparences <small>${L.filter(own).length}/${L.length}</small></div>${items}</div>`;
  const old=m.querySelector('.skblk');if(old)old.outerHTML=html;else{const hd=m.querySelector('.hd');(hd||m.firstElementChild).insertAdjacentHTML('afterend',html)}}catch(e){console.warn('skblk',e)}return r}}
/* la boutique de gemmes : un lien vers les apparences */
try{const ps=pShop;pShop=function(){const r=ps.apply(this,arguments);if(!skinOn())return r;return`<button class="card skpromo" data-a="skgo"><span class="skpra">${sImg('va_givre',0)}${sImg('ny_ecarlate',0)}${sImg('so_noir',0)}</span><span><b>🛍️ Nouveau : la boutique d'apparences</b><small>Des apparences pour tous les légendaires et les mythiques, de la commune à la légendaire, avec des bonus de stats.</small></span><span class="skprg">Voir ›</span></button>`+r}}catch(e){}
/* ---------- clics ---------- */
document.addEventListener('click',e=>{const b=e.target.closest('[data-a]');if(!b)return;const a=b.dataset.a,v=b.dataset.v;
  if(!['skview','skview2','skbuy','skflt','skmine','skwear2','skgo','skall','sknone'].includes(a))return;e.preventDefault();e.stopPropagation();
  if(a==='skview'){if(!b.closest('#ovl'))UI.skback=null;UI.skcf=null;return skView(v)}
  if(a==='skview2'){UI.skback=+b.dataset.h||null;UI.skcf=null;return skView(v)}
  if(a==='skbuy')return skBuy(v);
  if(a==='skflt'){UI.skr=v;return render()}
  if(a==='skmine'){UI.skmine=!UI.skmine;return render()}
  if(a==='skwear2'){const k=b.dataset.k||null;skWear(+v,k);try{UIS.evolve()}catch(er){}return skView(UI.skvk||k)}
  if(a==='skgo'){TAB='heros';UI.lz=UI.lz||{};UI.lz.heros='dress';UI.hv='dress';UI.dv='shop';try{closeModal()}catch(er){}render();scrollTo(0,0);return}
  if(a==='skall'&&(SKTEST()||window.RDE_SKTEST)){for(const k of SKL)skGive(k);for(const k of SKL)S.heroes[SK2[k].hero]=S.heroes[SK2[k].hero]||{l:1,e:0,f:0};save();render();return}
  if(a==='sknone'&&(SKTEST()||window.RDE_SKTEST)){S.skins=(S.skins||[]).filter(k=>!SK2[k]);for(const hid in HSK)if(S.skinEq&&SK2[S.skinEq[hid]]){delete S.skinEq[hid];skRefresh(+hid)}save();render();return}},true);

/* ---------- textes en anglais ---------- */
try{const X={"🛍️ Boutique d'apparences":"🛍️ Skin shop","Les rares, épiques et légendaires donnent un bonus de stats quand elles sont portées. Les exclusivités du Pass ne sont jamais vendues ici.":"Rare, epic and legendary skins give a stat bonus while worn. Pass exclusives are never sold here.",
 "Toutes":"All","★ Légendaires":"★ Legendary","Épiques":"Epic","Rares":"Rare","Communes":"Common","☐ Mes héros":"☐ My heroes","☑ Mes héros":"☑ My heroes",
 "COMMUNE":"COMMON","RARE":"RARE","ÉPIQUE":"EPIC","LÉGENDAIRE":"LEGENDARY","EXCLUSIVE · PASS":"EXCLUSIVE · PASS","✨ Juste pour le style":"✨ Just for style",
 "⚡ +# % PV, ATQ et DÉF":"⚡ +#% HP, ATK and DEF","⚡ +# % PV, ATQ et DÉF · +# VIT":"⚡ +#% HP, ATK and DEF · +# SPD","+# % PV, ATQ et DÉF":"+#% HP, ATK and DEF","+# % PV, ATQ et DÉF · +# VIT":"+#% HP, ATK and DEF · +# SPD","· ⚡ +# % PV, ATQ et DÉF":"· ⚡ +#% HP, ATK and DEF","· ⚡ +# % PV, ATQ et DÉF · +# VIT":"· ⚡ +#% HP, ATK and DEF · +# SPD",
 "Aucun bonus (juste pour le style)":"No bonus (just for style)","✓ Portée":"✓ Worn","✓ Possédée":"✓ Owned","🎟️ Pass Pro":"🎟️ Pro Pass","Pass Pro":"Pro Pass","Aucune apparence ici pour l'instant.":"No skin here yet.","Bonus des apparences portées":"Bonus of worn skins",
 "📖 Catalogue des apparences":"📖 Skin catalogue","Toutes les apparences du jeu, rangées par rareté : # / # dans ton dressing.":"Every skin in the game, sorted by rarity: # / # in your wardrobe.","🎟️ Exclusivités du Pass":"🎟️ Pass exclusives",
 "Uniquement dans la version de test : donne toutes les apparences de la boutique pour les essayer.":"Test version only: gives every shop skin so you can try them.",
 "Bonus quand elle est portée :":"Bonus while worn:","✨ Une apparence pour le style : elle ne change pas les stats.":"✨ A skin for style: it doesn't change stats.","Les exclusivités ne sont jamais vendues en boutique.":"Exclusives are never sold in the shop.",
 "Il te manque # gemmes.":"You're # gems short.","Confirmer l'achat ·":"Confirm purchase ·","Acheter ·":"Buy ·","forme de base":"base form","forme Ultra I":"Ultra I form","forme Ultra II":"Ultra II form","forme Ultra III":"Ultra III form",
 "Tu n'as pas encore d'apparence. La boutique en a pour tous les légendaires et les mythiques, et le Pass Pro a ses exclusivités.":"You don't have any skins yet. The shop has some for every legendary and mythic hero, and the Pro Pass has its exclusives.",
 "🛍️ Voir la boutique":"🛍️ See the shop","🛍️ Boutique":"🛍️ Shop","🎟️ Pass":"🎟️ Pass","Dans ton dressing":"In your wardrobe","Boutique du Dressing":"Wardrobe shop","Boutique du Dressing · # gemmes":"Wardrobe shop · # gems",
 "🛍️ Nouveau : la boutique d'apparences":"🛍️ New: the skin shop","Des apparences pour tous les légendaires et les mythiques, de la commune à la légendaire, avec des bonus de stats.":"Skins for every legendary and mythic hero, from common to legendary, with stat bonuses.","Voir ›":"See ›",
 "La boutique d'apparences 👗":"The skin shop 👗","🛍️ Aller à la boutique":"🛍️ Go to the shop",
 "Fortuna Trèfle":"Clover Fortuna","Fortuna, Reine de Minuit":"Fortuna, Midnight Queen","Solaris, Aube Rose":"Solaris, Rose Dawn","Solaris, Astre Noir":"Solaris, Black Star","Kaïros Azur":"Azure Kaïros","Kaïros des Sables":"Kaïros of the Sands",
 "Gaïa d'Automne":"Autumn Gaïa","Gaïa des Cerisiers":"Cherry Blossom Gaïa","Titanor de Bronze":"Bronze Titanor","Titanor, Cœur de Lave":"Titanor, Lava Heart","Valkyr Pourpre":"Purple Valkyr","Valkyr, Reine du Givre":"Valkyr, Frost Queen",
 "Nyx Spectrale":"Spectral Nyx","Nyx, Comtesse Écarlate":"Nyx, Scarlet Countess","Orion de Jade":"Jade Orion","Orion, Étoile Filante":"Orion, Shooting Star","Séraphine Azur":"Azure Séraphine","Séraphine Déchue":"Fallen Séraphine",
 "Drakhar Émeraude":"Emerald Drakhar","Léviathane Améthyste":"Amethyst Léviathane","Léviathane du Maelström":"Maelstrom Léviathane","Aléa Carreau Bleu":"Blue Diamond Aléa","Aléa, Joker Noir":"Aléa, Black Joker",
 "Éryndel, Roi des Glaces":"Éryndel, Ice King","Éryndel, Roi Spectral":"Éryndel, Spectral King","Aegis Écarlate":"Scarlet Aegis","Aegis, Paladin de l'Aube":"Aegis, Dawn Paladin","Lyra Rose":"Rose Lyra","Lyra Nocturne":"Nocturne Lyra",
 "Sorën des Sables":"Desert Sorën","Sorën, Sentinelle des Neiges":"Sorën, Snow Sentinel",
 "Le trèfle à quatre feuilles, c'est elle qui l'a trouvé. Depuis, la chance s'habille en vert.":"She's the one who found the four-leaf clover. Ever since, luck has worn green.",
 "Quand la dernière table ferme, Fortuna joue seule contre les étoiles. Et elle gagne.":"When the last table closes, Fortuna plays alone against the stars. And she wins.",
 "Le premier rayon du matin n'est pas doré : il est rose. Solaris le porte comme une cape.":"The first ray of morning isn't golden: it's pink. Solaris wears it like a cape.",
 "Le jour où le soleil s'est éteint, Solaris ne s'est pas éteint avec lui. Il a appris à briller dans le noir : une couronne d'éclipse, une armure d'obsidienne et un feu violet que rien n'arrête.":"The day the sun went out, Solaris didn't go out with it. He learned to shine in the dark: an eclipse crown, obsidian armour and a violet fire nothing can stop.",
 "Une robe couleur de ciel pour le gardien des heures. Le temps, lui, n'a pas changé.":"A sky-coloured robe for the keeper of the hours. Time itself hasn't changed.",
 "Dans le désert des heures perdues, chaque grain de sable est une seconde qu'il a rattrapée.":"In the desert of lost hours, every grain of sand is a second he caught back.",
 "Chaque automne, la Mère-Racine prend les couleurs du feu avant de s'endormir.":"Every autumn, the Root-Mother takes on the colours of fire before falling asleep.",
 "Une nuit par an, le Premier Arbre fleurit. Gaïa danse sous ses branches, et chaque pétale qui tombe devient une graine d'étoile.":"One night a year, the First Tree blossoms. Gaïa dances under its branches, and every falling petal becomes a star seed.",
 "Coulé dans le bronze des anciens rois, avec la patine vert-de-gris des siècles.":"Cast in the bronze of the ancient kings, with the verdigris of the centuries.",
 "Le Mont-Vivant s'est réveillé volcan. Sa pierre est noire, et dans ses fissures coule le feu.":"The Living Mountain woke up a volcano. Its stone is black, and fire flows through its cracks.",
 "La cape des walkyries royales, teinte dans la pourpre des rois du Nord.":"The cape of the royal valkyries, dyed in the purple of the northern kings.",
 "Au bout du monde, là où l'aurore danse sur la glace, Valkyr a été couronnée Reine du Givre. Ses ailes sont de cristal, sa lance ne fond jamais, et l'hiver la suit partout.":"At the end of the world, where the aurora dances on the ice, Valkyr was crowned Frost Queen. Her wings are crystal, her spear never melts, and winter follows her everywhere.",
 "On dit qu'elle n'a plus d'ombre. C'est faux : c'est son ombre qui n'a plus de Nyx.":"They say she has no shadow anymore. Wrong: it's her shadow that has no Nyx anymore.",
 "La Comtesse ne sort qu'à la lune de sang. Ses ailes de chauve-souris, ses roses noires et ses yeux rouges : personne ne l'a jamais vue deux fois.":"The Countess only comes out under the blood moon. Her bat wings, her black roses and her red eyes: no one has ever seen her twice.",
 "Le chasseur des étoiles a troqué le bleu de la nuit pour le vert des forêts profondes.":"The star hunter traded the blue of the night for the green of the deep forests.",
 "Il ne chasse plus les étoiles : il court avec elles. Fais un vœu quand il passe.":"He no longer hunts the stars: he runs with them. Make a wish when he goes by.",
 "Les six ailes, la même grâce, et le bleu du ciel juste avant l'aube.":"The six wings, the same grace, and the blue of the sky just before dawn.",
 "Elle est tombée du ciel pour sauver un royaume qui ne l'a jamais remerciée. Ses ailes ont noirci, son auréole s'est brisée… mais elle protège toujours.":"She fell from the sky to save a kingdom that never thanked her. Her wings turned black, her halo broke… but she still protects.",
 "Le wyrm des forêts anciennes, aux écailles vert émeraude et au ventre d'or.":"The wyrm of the ancient forests, with emerald scales and a golden belly.",
 "Dans les fosses les plus profondes, les écailles du Roi des Abysses prennent la couleur des améthystes.":"In the deepest trenches, the King of the Abyss's scales take on the colour of amethysts.",
 "Quand le Roi des Abysses est en colère, la mer tourne sur elle-même. Au cœur du maelström, l'éclair tombe, et il sourit.":"When the King of the Abyss is angry, the sea spins on itself. At the heart of the maelstrom, lightning strikes, and he smiles.",
 "Même masque, même sourire, mais cette fois la carte gagnante est bleue.":"Same mask, same smile, but this time the winning card is blue.",
 "Il reste toujours une carte dans le paquet que personne n'a jamais vue. C'est celle-ci.":"There's always one card left in the deck that no one has ever seen. This is it.",
 "Sa flamme de cendre a gelé pendant le Long Hiver. Elle brûle encore, mais elle brûle froid.":"His ash flame froze during the Long Winter. It still burns, but it burns cold.",
 "Mort une fois, revenu deux fois. Le Roi de Cendre règne maintenant sur les âmes, et sa couronne brille de leur lumière froide.":"Dead once, back twice. The Ash King now rules over souls, and his crown shines with their cold light.",
 "Le tabard rouge des Paladins du Serment, ceux qui ne reculent jamais.":"The red tabard of the Paladins of the Oath, the ones who never step back.",
 "Il a monté la garde toute la nuit. Quand le soleil s'est levé, sa lumière s'est posée sur lui, et elle n'est jamais repartie.":"He kept watch all night. When the sun rose, its light settled on him, and it never left.",
 "La robe de sa toute première chanson, celle qui a fait pleurer un dragon.":"The dress from her very first song, the one that made a dragon cry.",
 "Elle chante pour la lune quand tout le royaume dort. Les notes montent jusqu'aux étoiles et y restent accrochées.":"She sings to the moon while the whole kingdom sleeps. The notes rise up to the stars and stay there.",
 "Une capuche couleur de dune pour guetter le désert du haut de sa tour.":"A dune-coloured hood to watch the desert from the top of his tower.",
 "Sur les remparts du Nord, il ne bouge pas pendant des heures. La neige le recouvre, et personne ne le voit venir.":"On the northern ramparts, he doesn't move for hours. The snow covers him, and no one sees him coming."};
 for(const k in X)if(!(k in I18N_EN))I18N_EN[k]=X[k]}catch(e){}
/* ---------- notes de mise à jour et annonce ---------- */
try{const I=["👗 <b>Nouveau : la boutique d'apparences</b>, dans le Dressing de la Caserne : 31 apparences pour les 14 légendaires et les 2 mythiques, de la commune à la légendaire. Elles s'achètent avec des gemmes : 300 (commune), 1 000 (rare), 2 500 (épique) et 8 000 (légendaire).",
  "⚡ <b>Bonus de stats</b> quand l'apparence est portée : aucun pour les communes (juste pour le style), +2 % de PV, ATQ et DÉF pour les rares, +5 % pour les épiques, et +10 % avec +3 VIT pour les légendaires (Drakhar des Cendres, l'exclusivité du Pass Pro, compte comme une légendaire).",
  "✨ <b>Trois apparences légendaires dessinées de zéro</b> : Valkyr, Reine du Givre · Nyx, Comtesse Écarlate · Solaris, Astre Noir. Et quatre épiques avec leur décor et leurs effets animés : Gaïa des Cerisiers, Séraphine Déchue, Léviathane du Maelström et Éryndel, Roi Spectral.",
  "📖 <b>Le catalogue des apparences</b>, rangé par rareté, montre tout ce qui existe et ce que tu as déjà. Les exclusivités du Pass ne sont jamais vendues en boutique."];
 PATCH.unshift({v:42,d:'3 novembre 2026',t:"La boutique d'apparences",items:I});
 const E={"La boutique d'apparences":"The skin shop"};E[I[0]]="👗 <b>New: the skin shop</b>, in the Barracks Wardrobe: 31 skins for the 14 legendary and 2 mythic heroes, from common to legendary. They cost gems: 300 (common), 1,000 (rare), 2,500 (epic) and 8,000 (legendary).";
 E[I[1]]="⚡ <b>Stat bonus</b> while the skin is worn: none for commons (just for style), +2% HP, ATK and DEF for rares, +5% for epics, and +10% with +3 SPD for legendaries (Ashen Drakhar, the Pro Pass exclusive, counts as a legendary).";
 E[I[2]]="✨ <b>Three legendary skins drawn from scratch</b>: Valkyr, Frost Queen · Nyx, Scarlet Countess · Solaris, Black Star. And four epics with their own scenery and animated effects: Cherry Blossom Gaïa, Fallen Séraphine, Maelstrom Léviathane and Éryndel, Spectral King.";
 E[I[3]]="📖 <b>The skin catalogue</b>, sorted by rarity, shows everything that exists and what you already own. Pass exclusives are never sold in the shop.";
 for(const k in E)if(!(k in I18N_EN))I18N_EN[k]=E[k]}catch(e){}
try{const al=annList;annList=function(){const L=al.apply(this,arguments);try{if(skinOn()&&!S.skShopSeen&&Date.now()<Date.parse('2026-11-17T00:00:00+01:00')&&!L.some(a=>a.k==='skins1')){L.splice(Math.min(1,L.length),0,{k:'skins1',ac:'#ffd84a',tag:'NOUVEAU',t:"La boutique d'apparences 👗",
  x:"Des apparences pour <b>tous les légendaires et les mythiques</b>, de la commune à la légendaire. Les rares, épiques et légendaires donnent un <b>bonus de stats</b> quand elles sont portées (jusqu'à +10 %). Trois légendaires dessinées de zéro : <b>Valkyr, Reine du Givre</b>, <b>Nyx, Comtesse Écarlate</b> et <b>Solaris, Astre Noir</b> !",
  art:()=>`<div class="skann">${sImg('va_givre',0)}${sImg('ny_ecarlate',0)}${sImg('so_noir',0)}</div>`,go:"🛍️ Aller à la boutique",fn:()=>{TAB='heros';UI.lz=UI.lz||{};UI.lz.heros='dress';UI.hv='dress';UI.dv='shop'}})}}catch(e){}return L}}catch(e){}
try{I18N_EN["Des apparences pour <b>tous les légendaires et les mythiques</b>, de la commune à la légendaire. Les rares, épiques et légendaires donnent un <b>bonus de stats</b> quand elles sont portées (jusqu'à +10 %). Trois légendaires dessinées de zéro : <b>Valkyr, Reine du Givre</b>, <b>Nyx, Comtesse Écarlate</b> et <b>Solaris, Astre Noir</b> !"]="Skins for <b>every legendary and mythic hero</b>, from common to legendary. Rare, epic and legendary skins give a <b>stat bonus</b> while worn (up to +10%). Three legendaries drawn from scratch: <b>Valkyr, Frost Queen</b>, <b>Nyx, Scarlet Countess</b> and <b>Solaris, Black Star</b>!"}catch(e){}
/* ---------- style ---------- */
const st=document.createElement('style');st.textContent=`
.skrt{display:inline-block;font-size:10.5px;font-weight:900;letter-spacing:.05em;padding:2px 7px;border-radius:6px;color:#140c24;background:var(--skc,#aab3bb);align-self:flex-start;line-height:1.3}
.r-c{--skc:#aab3bb}.r-r{--skc:#4da3ff}.r-e{--skc:#ff8f3f}.r-l{--skc:#ffd84a}.r-x{--skc:#ff6a1a}
.skrt.r-l{background:linear-gradient(90deg,#fff2b0,#ffd84a,#ffb21a)}.skrt.r-x{background:linear-gradient(90deg,#ffb21a,#ff6a1a);color:#1a0806}
.skseg button{font-size:12.5px;padding:8px 4px}
.skhd{display:flex;gap:10px;align-items:center;justify-content:space-between}
.skbal{display:inline-flex;align-items:center;gap:4px;font-weight:900;font-size:15px;background:rgba(0,0,0,.35);border:1px solid var(--line);border-radius:10px;padding:6px 10px;flex:none}
.skchips{display:flex;flex-wrap:wrap;gap:6px}
.skchip{font:inherit;font-weight:800;font-size:12.5px;color:var(--fg);background:var(--panel2);border:1px solid var(--line);border-radius:999px;padding:6px 11px;cursor:pointer}
.skchip.on{background:var(--skc,#ffd84a);color:#140c24;border-color:transparent}.skchip:not([class*="r-"]).on{background:#e8e0ff}
.skfeat{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.skft{position:relative;display:flex;flex-direction:column;align-items:stretch;padding:0;border:2px solid #ffd84a;border-radius:16px;overflow:hidden;cursor:pointer;color:var(--fg);font:inherit;text-align:left;background:linear-gradient(160deg,#3a2a08,#140c24 55%);box-shadow:0 0 0 1px rgba(255,216,74,.25),0 10px 26px -12px rgba(255,190,40,.6)}
.skft::after{content:'';position:absolute;inset:0;background:linear-gradient(115deg,transparent 30%,rgba(255,255,255,.16) 45%,transparent 60%);transform:translateX(-120%);animation:skshine 4.5s ease-in-out infinite;pointer-events:none}
@keyframes skshine{0%,55%{transform:translateX(-120%)}80%,100%{transform:translateX(120%)}}
.skftf{display:block;aspect-ratio:160/244;max-height:260px}.skftf svg{width:100%;height:100%;display:block}
.skftt{display:flex;flex-direction:column;gap:3px;padding:8px 10px 10px;background:linear-gradient(transparent,rgba(0,0,0,.55) 30%)}
.skftt b{font-size:14px;line-height:1.15}.skftt small{color:var(--muted);font-size:11.5px}
.skgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:10px}
.skc{display:flex;flex-direction:column;padding:0;border:2px solid var(--skc);border-radius:14px;overflow:hidden;cursor:pointer;background:#1a1230;background:linear-gradient(170deg,color-mix(in srgb,var(--skc) 22%,#140c24),#140c24 60%);color:var(--fg);font:inherit;text-align:left}
.skc.on{box-shadow:0 0 0 2px #7ad07a}.skc .skca{display:block;aspect-ratio:1}.skc .skca img,.skc .skca svg{width:100%;height:100%;display:block}
.skcb{display:flex;flex-direction:column;gap:3px;padding:7px 9px 9px}.skcb b{font-size:13.5px;line-height:1.15}.skcb small{color:var(--muted);font-size:11.5px}
.skbn{font-style:normal;font-size:11px;color:#ffe08a;font-weight:700;line-height:1.25}
.skpr{display:inline-flex;align-items:center;gap:3px;font-weight:900;font-size:13px;margin-top:2px}.skst{font-size:12px;font-weight:900;color:#9ae09a;margin-top:2px}.skst.on{color:#7ad07a}
.skleg{display:flex;flex-direction:column;gap:6px;font-size:12.5px}.skleg>div{display:flex;align-items:center;gap:8px}.skleg small{margin-left:auto;display:inline-flex;align-items:center;gap:3px;font-weight:800}
.skcat{border-color:var(--skc)}.skcat.r-x{--skc:#ff6a1a}.skcath{display:flex;justify-content:space-between;align-items:baseline;margin-bottom:8px}.skcath b{font-size:15px;color:var(--skc)}.skcath small{color:var(--muted);font-weight:800}
.skcatl{display:grid;grid-template-columns:repeat(auto-fill,minmax(210px,1fr));gap:7px}
.skci{display:flex;align-items:center;gap:9px;background:rgba(10,6,24,.72);border:1px solid rgba(255,255,255,.08);border-radius:12px;padding:6px 8px;cursor:pointer;color:var(--fg);font:inherit;text-align:left}
.skci.own{border-color:rgba(122,208,122,.55)}.skcia{width:46px;height:46px;flex:none;border-radius:9px;overflow:hidden}.skcia img,.skcia svg{width:100%;height:100%;display:block}
.skcit{flex:1;min-width:0;display:flex;flex-direction:column}.skcit b{font-size:12.5px;line-height:1.2}.skcit small{color:var(--muted);font-size:11px;display:inline-flex;align-items:center;gap:2px;flex-wrap:wrap}
.skpv{display:grid;grid-template-columns:minmax(0,190px) minmax(0,1fr);gap:14px;align-items:start}
@media (max-width:520px){.skpv{grid-template-columns:1fr}.skpvf{max-width:230px;margin:0 auto}}
.skpvf{aspect-ratio:160/244;border-radius:16px;overflow:hidden;background:#140c24;background:radial-gradient(circle at 50% 35%,color-mix(in srgb,var(--skc) 30%,#1e1438),#0b0819 70%);border:2px solid var(--skc)}.skpvf svg{width:100%;height:100%;display:block}
.skpv.r-l .skpvf{box-shadow:0 0 22px -4px rgba(255,216,74,.65)}
.skpvb{font-size:12.5px;background:rgba(255,216,74,.1);border:1px solid rgba(255,216,74,.35);border-radius:10px;padding:7px 9px;color:#ffe9a8}.skpvb.none{background:rgba(255,255,255,.05);border-color:var(--line);color:var(--muted)}
.skpvforms{margin:10px 0}.skpvforms>div{width:25%}.skpvforms span{display:block;width:100%;aspect-ratio:1;border-radius:9px;overflow:hidden}.skpvforms img,.skpvforms svg{width:100%;height:100%;display:block}
.skact{display:flex;flex-direction:column;gap:6px;align-items:flex-start}.skact .btn{align-self:stretch}.skbuy{font-size:15px}
.skback{margin-bottom:8px}
.skwl{display:flex;flex-direction:column;gap:10px}.dskin.skw{border-color:var(--skc);background:#140c24;background:linear-gradient(135deg,color-mix(in srgb,var(--skc) 18%,#140c24),#120a14 60%)}.dskin.skw.on{border-color:#7ad07a;box-shadow:0 0 0 1px #7ad07a}
.dskin.skw .dsfig{padding:0;border:0;background:none;cursor:pointer}.dskin.skw .dsfig svg{width:100%;height:auto;display:block}
.skblk2 .sn small{color:var(--muted);font-weight:800;margin-left:4px}.skblk2 .skrow{align-items:center}.skblk2 .skrow b{display:block;font-size:13px;margin-top:2px}.skblk2 .skrow small{display:block;color:var(--muted);font-size:11.5px}
.skblk2 .skp{width:46px;height:46px;flex:none;border-radius:10px;overflow:hidden;padding:0;border:1px solid var(--line);background:none;cursor:pointer}.skblk2 .skp img,.skblk2 .skp svg{width:100%;height:100%;display:block}
.skpromo{display:flex;align-items:center;gap:10px;width:100%;text-align:left;cursor:pointer;color:var(--fg);font:inherit;border-color:#ffd84a;background:linear-gradient(120deg,rgba(255,216,74,.16),rgba(180,138,255,.1)),var(--surf,#1e1838)}
.skpromo>span:nth-child(2){flex:1;min-width:0;display:flex;flex-direction:column;gap:2px}.skpromo small{color:var(--muted);font-size:12px}
.skpra{display:flex;flex:none}.skpra img,.skpra svg{width:40px;height:40px;border-radius:9px;margin-left:-10px;border:2px solid #140c24;display:block}.skpra img:first-child,.skpra svg:first-child{margin-left:0}
.skprg{font-weight:900;color:#ffd84a;flex:none}
.skann{display:flex;justify-content:center;gap:6px}.skann img,.skann svg{width:84px;height:84px;border-radius:14px;display:block;box-shadow:0 0 22px -6px #ffd84a}
@media (prefers-reduced-motion:reduce){.skft::after{animation:none}}`;
document.head.appendChild(st);
window.SKSHOP={shopPage,allPage,skView,skBuy,SK2,SKL,skinArt};
}catch(e){console.warn('boutique apparences',e)}})();
