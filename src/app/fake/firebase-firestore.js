const D=window.__FD||(window.__FD=new Map());const L=new Set();const fire=()=>setTimeout(()=>L.forEach(f=>{try{f()}catch(e){}}),10);
const clone=o=>JSON.parse(JSON.stringify(o));let auto=0;
export function initializeFirestore(){return{}};export function getFirestore(){return{}};export function persistentLocalCache(){return{}};export function persistentMultipleTabManager(){return{}};
export function doc(fs,p){return{p,id:p.split('/').pop()}}
export function collection(fs,c){return{c}}
const ds=r=>({id:r.id,exists:()=>D.has(r.p),data:()=>D.has(r.p)?clone(D.get(r.p)):undefined,metadata:{fromCache:false}});
export async function getDoc(r){return ds(r)}
const chk=o=>{const w=v=>{if(Array.isArray(v)){v.forEach(x=>{if(Array.isArray(x))throw{code:'invalid-argument',message:'nested arrays'};w(x)})}else if(v&&typeof v==='object')Object.values(v).forEach(w);else if(v===undefined)throw{code:'invalid-argument',message:'undefined'}};w(o)};
export async function setDoc(r,o){chk(o);D.set(r.p,clone(o));fire()}
export async function updateDoc(r,o){chk(o);if(!D.has(r.p))throw{code:'not-found'};D.set(r.p,{...D.get(r.p),...clone(o)});fire()}
export async function deleteDoc(r){D.delete(r.p);fire()}
export async function addDoc(c,o){chk(o);const id='a'+(++auto);D.set(c.c+'/'+id,clone(o));fire();return{id}}
export function where(f,op,v){return{t:'w',f,op,v}};export function orderBy(f,d){return{t:'o',f,d}};export function limit(n){return{t:'l',n}}
export function query(c,...cons){return{c:c.c,cons}}
const run=q=>{let docs=[...D.keys()].filter(p=>{const a=p.split('/');return a.length===2&&a[0]===q.c}).map(p=>({id:p.split('/')[1],d:D.get(p)}));
  for(const k of q.cons){if(k.t==='w'){docs=docs.filter(x=>{const v=x.d[k.f];return k.op==='=='?v===k.v:k.op==='>='?v>=k.v:k.op==='<'?v<k.v:true})}}
  const o=q.cons.find(k=>k.t==='o');if(o)docs.sort((a,b)=>(a.d[o.f]>b.d[o.f]?1:-1)*(o.d==='desc'?-1:1));const l=q.cons.find(k=>k.t==='l');if(l)docs=docs.slice(0,l.n);
  return{size:docs.length,empty:!docs.length,docs:docs.map(x=>({id:x.id,data:()=>clone(x.d)})),metadata:{fromCache:false}}};
export async function getDocs(q){return run(q)}
export function onSnapshot(r,cb,eb){const f=()=>cb(r.cons?run(r):ds(r));L.add(f);setTimeout(f,5);return()=>L.delete(f)}
export async function runTransaction(fs,fn){return fn({get:async r=>ds(r),set:(r,o)=>{D.set(r.p,clone(o));fire()}})}
