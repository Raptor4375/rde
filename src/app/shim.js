/* RDE : branche le jeu sur Firebase (remplace la base de données de Claude) */
window.RDE_APP=true;
(function(){
const CFG={apiKey:"AIzaSyAFIM0mUyMwFDouGVVODghOfZhT13rxrAg",authDomain:"royaume-d-ether.firebaseapp.com",projectId:"royaume-d-ether",storageBucket:"royaume-d-ether.firebasestorage.app",messagingSenderId:"122398855091",appId:"1:122398855091:web:57e41983f663daee0b85c6"};
const V='13.0.0',U=m=>`https://www.gstatic.com/firebasejs/${V}/firebase-${m}.js`;
/* Firestore n'accepte pas les tableaux dans des tableaux ni les valeurs undefined : on encode */
function enc(v){if(Array.isArray(v))return v.map(x=>Array.isArray(x)?{__a:enc(x)}:enc(x));if(v&&typeof v==='object'){const o={};for(const k in v){const x=v[k];if(x!==undefined&&typeof x!=='function')o[k]=enc(x)}return o}if(typeof v==='number'&&!isFinite(v))return null;return v}
function dec(v){if(Array.isArray(v))return v.map(dec);if(v&&typeof v==='object'){const ks=Object.keys(v);if(ks.length===1&&ks[0]==='__a'&&Array.isArray(v.__a))return dec(v.__a);const o={};for(const k of ks)o[k]=dec(v[k]);return o}return v}
const GT=(g,t)=>String(g)+'|'+String(Math.floor(+t||0)).padStart(15,'0');
function prep(path,o){const d=enc(JSON.parse(JSON.stringify(o===undefined?{}:o)));if(/^msgs(\/|$)/.test(path)&&d&&d.g!=null&&d.t!=null)d.gt=GT(d.g,d.t);return d}
let P=null;
window.RDEF=function(){if(P)return P;P=(async()=>{const [A,F,Au]=await Promise.all([import(U('app')),import(U('firestore')),import(U('auth'))]);
  const app=A.initializeApp(CFG);let fs;try{fs=F.initializeFirestore(app,{localCache:F.persistentLocalCache({tabManager:F.persistentMultipleTabManager()})})}catch(e){fs=F.getFirestore(app)}
  const auth=Au.getAuth(app);
  const uid=await new Promise((res,rej)=>{let done=false;const off=Au.onAuthStateChanged(auth,u=>{if(u&&!done){done=true;off();res(u.uid)}});Au.signInAnonymously(auth).catch(e=>{if(!done){done=true;rej(e)}})});
  const wrapDoc=s=>{const x=s.exists()?dec(s.data()):undefined;return{exists:s.exists(),id:s.id,data:()=>x===undefined?undefined:JSON.parse(JSON.stringify(x)),metadata:{fromCache:!!(s.metadata&&s.metadata.fromCache)}}};
  const wrapQ=s=>({size:s.size,empty:s.empty,docs:s.docs.map(d=>{const x=dec(d.data());return{id:d.id,data:()=>JSON.parse(JSON.stringify(x))}}),metadata:{fromCache:!!(s.metadata&&s.metadata.fromCache)}});
  const err=e=>{const c=String(e&&e.code||'').replace(/-/g,'_');const o=new Error(e&&e.message||c);o.code=c;return o};
  function doc(p){const r=F.doc(fs,p);return{
    get:async()=>{try{return wrapDoc(await F.getDoc(r))}catch(e){throw err(e)}},
    set:async o=>{try{await F.setDoc(r,prep(p,o))}catch(e){throw err(e)}},
    update:async o=>{try{await F.updateDoc(r,prep(p,o))}catch(e){throw err(e)}},
    delete:async()=>{try{await F.deleteDoc(r)}catch(e){throw err(e)}},
    acquire:async({holder,ttlMs})=>{const L=F.doc(fs,'locks/'+p.replace(/\//g,'~'));try{return await F.runTransaction(fs,async tx=>{const s=await tx.get(L),now=Date.now();if(s.exists()){const d=s.data();if(d.h!==holder&&d.t>now)return{acquired:false}}tx.set(L,{h:holder,t:now+(ttlMs||30000)});return{acquired:true}})}catch(e){return{acquired:false}}},
    onSnapshot:(cb,eb)=>F.onSnapshot(r,s=>{try{cb(wrapDoc(s))}catch(e){console.warn(e)}},e=>eb&&eb(err(e)))}}
  function col(c,q={w:[],o:null,l:0}){const build=()=>{const cons=[];let o=q.o;const gw=c==='msgs'&&o&&o[0]==='t'&&q.w.find(w=>w[0]==='g'&&w[1]==='==');
      for(const w of q.w){if(gw&&w===gw)continue;cons.push(F.where(w[0],w[1],w[2]))}
      if(gw){cons.push(F.where('gt','>=',String(gw[2])+'|'),F.where('gt','<',String(gw[2])+'|~'),F.orderBy('gt',o[1]||'asc'))}else if(o)cons.push(F.orderBy(o[0],o[1]||'asc'));
      if(q.l)cons.push(F.limit(q.l));return F.query(F.collection(fs,c),...cons)};
    return{where:(f,op,v)=>col(c,{...q,w:[...q.w,[f,op,v]]}),orderBy:(f,d='asc')=>col(c,{...q,o:[f,d]}),limit:n=>col(c,{...q,l:n}),
      get:async()=>{try{return wrapQ(await F.getDocs(build()))}catch(e){throw err(e)}},
      add:async o=>{try{const r=await F.addDoc(F.collection(fs,c),prep(c,o));return{id:r.id}}catch(e){throw err(e)}},
      onSnapshot:(cb,eb)=>F.onSnapshot(build(),s=>{try{cb(wrapQ(s))}catch(e){console.warn(e)}},e=>eb&&eb(err(e)))}}
  const db={doc,collection:c=>col(c)};
  const user={id:async()=>uid,can:async()=>true};
  return{db,user,uid}})();P.catch(e=>console.warn('RDE firebase',e));return P};
window.claude={use:async k=>{if(k==='db'||k==='user'){try{const F=await window.RDEF();return k==='db'?F.db:F.user}catch(e){return null}}return null}};
window.RDEF();
})();
