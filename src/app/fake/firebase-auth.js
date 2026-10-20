export function getAuth(){return{}}
const uid=(window.FAKE_UID||'fakeuid1');
export function onAuthStateChanged(a,cb){setTimeout(()=>cb({uid}),20);return()=>{}}
export async function signInAnonymously(){return{user:{uid}}}
